from typing import Optional, List
from datetime import datetime

from MASDA.constants import CloudProvider
from MASDA.llm.base import LLMProvider
from MASDA.llm.factory import get_llm_provider

from MASDA.models.input.intent import IntentRequest, ParsedIntent
from MASDA.models.state.work_order import (
    WorkOrder,
    WorkOrderStatus,
    ProviderCandidate,
)
from MASDA.models.output.security import FinalArchitectureOutput

from MASDA.agents.intent_parser import IntentParserAgent
from MASDA.agents.infra_agent import InfraAgent, InfraAgentInput
from MASDA.agents.cost_agent import CostAgent, CostAgentInput
from MASDA.agents.security_agent import SecurityAgent, SecurityAgentInput
from MASDA.agents.condenser import CondenserAgent, CondenserInput

from MASDA.orchestrator.policies import PolicyEngine, PolicySettings
from MASDA.orchestrator.convergence import ConvergenceChecker


class Moderator:
    """Orchestrates the multi-agent pipeline with bounded loops.

    The Moderator controls:
    - Agent execution order
    - Loop limits and convergence
    - Policy enforcement
    - Decision logging
    - Provider selection
    """

    def __init__(
        self,
        llm_provider: Optional[LLMProvider] = None,
        policy_settings: Optional[PolicySettings] = None,
    ):
        """Initialize the Moderator.

        Args:
            llm_provider: LLM provider for agents. Uses default if not provided.
            policy_settings: Policy settings. Uses defaults if not provided.
        """
        self._llm = llm_provider or get_llm_provider()
        self._policy = PolicyEngine(policy_settings)
        self._convergence = ConvergenceChecker()

        # Initialize agents
        self._intent_parser = IntentParserAgent(self._llm)
        self._infra_agent = InfraAgent(self._llm)
        self._cost_agent = CostAgent(self._llm)
        self._security_agent = SecurityAgent(self._llm)
        self._condenser = CondenserAgent(self._llm)

    async def process_intent(self, request: IntentRequest) -> WorkOrder:
        """Process a user intent through the full pipeline.

        Args:
            request: User intent request.

        Returns:
            Work order with final output or error.
        """
        # Create work order
        work_order = WorkOrder(raw_intent=request.intent)
        work_order.policy_settings = self._policy.settings.model_dump()
        work_order.max_iterations = self._policy.settings.max_iterations

        try:
            # Phase 1: Parse intent
            work_order = await self._parse_intent(work_order, request)

            # Phase 2: Generate infrastructure for each provider
            work_order = await self._generate_infrastructure(work_order)

            # Phase 3: Analyze costs and optimize
            work_order = await self._analyze_and_optimize(work_order)

            # Phase 4: Security validation
            work_order = await self._validate_security(work_order)

            # Phase 5: Select best candidate
            work_order = self._select_best_candidate(work_order)

            # Phase 6: Condense final output
            work_order = await self._condense_output(work_order)

            work_order.update_status(WorkOrderStatus.completed)

        except Exception as e:
            work_order.update_status(WorkOrderStatus.failed, str(e))
            work_order.add_decision(
                step="error",
                decision="Pipeline failed",
                reasoning=str(e),
            )

        return work_order

    async def _parse_intent(
        self,
        work_order: WorkOrder,
        request: IntentRequest,
    ) -> WorkOrder:
        """Parse user intent into structured schemas."""
        work_order.update_status(WorkOrderStatus.parsing_intent)

        parsed = await self._intent_parser.execute(request)
        work_order.parsed_intent = parsed

        work_order.add_decision(
            step="intent_parsing",
            decision=f"Parsed intent with confidence {parsed.confidence:.2f}",
            reasoning=f"Identified workload type: {parsed.infra_schema.workload_type}",
            data={
                "target_providers": [p.value for p in parsed.target_providers],
                "ambiguities": parsed.ambiguities,
                "assumptions": parsed.assumptions,
            },
        )

        # Initialize candidates for each target provider
        for provider in parsed.target_providers:
            work_order.candidates[provider.value] = ProviderCandidate(
                provider=provider
            )

        return work_order

    async def _generate_infrastructure(self, work_order: WorkOrder) -> WorkOrder:
        """Generate infrastructure graphs for each provider."""
        work_order.update_status(WorkOrderStatus.generating_infra)

        if not work_order.parsed_intent:
            raise ValueError("No parsed intent available")

        for provider_str, candidate in work_order.candidates.items():
            provider = CloudProvider(provider_str)

            infra_input = InfraAgentInput(
                provider=provider,
                infra_schema=work_order.parsed_intent.infra_schema,
                cost_schema=work_order.parsed_intent.cost_schema,
                security_schema=work_order.parsed_intent.security_schema,
            )

            infra_graph = await self._infra_agent.execute(infra_input)
            candidate.infra_graph = infra_graph
            candidate.iteration_count += 1

            work_order.add_decision(
                step="infra_generation",
                decision=f"Generated {provider.value} architecture",
                reasoning=infra_graph.high_level_summary,
                data={
                    "node_count": len(infra_graph.nodes),
                    "regions": infra_graph.regions_used,
                },
            )

        return work_order

    async def _analyze_and_optimize(self, work_order: WorkOrder) -> WorkOrder:
        """Analyze costs and run optimization loop."""
        work_order.update_status(WorkOrderStatus.analyzing_cost)

        if not work_order.parsed_intent:
            raise ValueError("No parsed intent available")

        for provider_str, candidate in work_order.candidates.items():
            if not candidate.infra_graph:
                continue

            self._convergence.reset()
            iteration = 0

            while True:
                # Analyze costs
                cost_input = CostAgentInput(
                    infra_graph=candidate.infra_graph,
                    cost_schema=work_order.parsed_intent.cost_schema,
                    iteration=iteration,
                )

                cost_result = await self._cost_agent.execute(cost_input)
                candidate.cost_output = cost_result.cost_output

                self._convergence.record_cost(
                    cost_result.cost_output.summary.total_monthly_cost_usd
                )

                # Check if we should continue
                should_continue = self._policy.should_continue_optimization(
                    iteration=iteration,
                    within_budget=cost_result.within_budget,
                    requires_changes=cost_result.requires_infra_changes,
                )

                if not should_continue or self._convergence.is_converged():
                    break

                # Re-generate infra with optimization feedback
                if cost_result.requires_infra_changes and self._policy.settings.require_cost_optimization:
                    infra_input = InfraAgentInput(
                        provider=candidate.provider,
                        infra_schema=work_order.parsed_intent.infra_schema,
                        cost_schema=work_order.parsed_intent.cost_schema,
                        security_schema=work_order.parsed_intent.security_schema,
                        optimization_feedback=cost_result.optimization_suggestions,
                    )
                    candidate.infra_graph = await self._infra_agent.execute(infra_input)

                iteration += 1
                candidate.iteration_count += 1

                if iteration >= work_order.max_iterations:
                    break

            work_order.add_decision(
                step="cost_optimization",
                decision=f"{provider_str}: ${cost_result.cost_output.summary.total_monthly_cost_usd:.2f}/month after {iteration + 1} iterations",
                reasoning=f"Within budget: {cost_result.within_budget}, Converged: {self._convergence.is_converged()}",
            )

        return work_order

    async def _validate_security(self, work_order: WorkOrder) -> WorkOrder:
        """Validate security for each candidate."""
        work_order.update_status(WorkOrderStatus.analyzing_security)

        if not work_order.parsed_intent:
            raise ValueError("No parsed intent available")

        for provider_str, candidate in work_order.candidates.items():
            if not candidate.infra_graph:
                continue

            security_input = SecurityAgentInput(
                infra_graph=candidate.infra_graph,
                security_schema=work_order.parsed_intent.security_schema,
            )

            security_result = await self._security_agent.execute(security_input)
            candidate.security_output = security_result.security_output

            work_order.add_decision(
                step="security_validation",
                decision=f"{provider_str}: Compliance met: {security_result.compliance_met}",
                reasoning=security_result.security_output.security_summary,
                data={
                    "residual_risks": security_result.security_output.residual_risks,
                    "remediations": security_result.remediations_required,
                },
            )

        return work_order

    def _select_best_candidate(self, work_order: WorkOrder) -> WorkOrder:
        """Select the best provider candidate."""
        work_order.update_status(WorkOrderStatus.optimizing)

        best_candidate = None
        best_score = -1.0

        for provider_str, candidate in work_order.candidates.items():
            if not candidate.cost_output or not candidate.security_output:
                continue

            # Simple scoring: prioritize within-budget and compliant
            score = 0.0

            # Budget compliance (40%)
            if candidate.cost_output.summary.within_budget:
                score += 0.4
            else:
                # Penalize based on how much over budget
                budget = candidate.cost_output.summary.budget_limit_usd
                cost = candidate.cost_output.summary.total_monthly_cost_usd
                if budget and budget > 0:
                    overrun = (cost - budget) / budget
                    score += max(0, 0.4 * (1 - overrun))

            # Security compliance (40%)
            compliant_count = sum(
                1 for c in candidate.security_output.compliance_status if c.compliant
            )
            total_compliance = len(candidate.security_output.compliance_status)
            if total_compliance > 0:
                score += 0.4 * (compliant_count / total_compliance)
            else:
                score += 0.4

            # Cost efficiency (20%) - lower is better
            cost = candidate.cost_output.summary.total_monthly_cost_usd
            # Normalize cost (assume $0-5000 range)
            normalized_cost = min(cost / 5000, 1.0)
            score += 0.2 * (1 - normalized_cost)

            if score > best_score:
                best_score = score
                best_candidate = candidate
                work_order.selected_provider = candidate.provider

        if best_candidate:
            best_candidate.is_selected = True
            work_order.add_decision(
                step="provider_selection",
                decision=f"Selected {work_order.selected_provider.value} with score {best_score:.2f}",
                reasoning="Best combination of cost, security, and compliance",
            )

        return work_order

    async def _condense_output(self, work_order: WorkOrder) -> WorkOrder:
        """Condense final output."""
        work_order.update_status(WorkOrderStatus.condensing)

        if not work_order.selected_provider:
            raise ValueError("No provider selected")

        candidate = work_order.candidates[work_order.selected_provider.value]

        if not candidate.infra_graph or not candidate.cost_output or not candidate.security_output:
            raise ValueError("Incomplete candidate data")

        condenser_input = CondenserInput(
            infra_graph=candidate.infra_graph,
            cost_output=candidate.cost_output,
            security_output=candidate.security_output,
            selected_provider=work_order.selected_provider,
            decision_log=[f"{d.step}: {d.decision}" for d in work_order.decision_log],
            original_intent=work_order.raw_intent,
        )

        final_output = await self._condenser.execute(condenser_input)
        work_order.final_output = final_output
        work_order.converged = True

        work_order.add_decision(
            step="condensation",
            decision=f"Final output generated with confidence {final_output.confidence_score:.2f}",
            reasoning=final_output.decision_rationale[:200] + "...",
        )

        return work_order
