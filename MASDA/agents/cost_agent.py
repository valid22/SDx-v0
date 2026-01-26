from typing import Type, Optional
from pydantic import BaseModel, Field
import json

from MASDA.agents.base import Agent
from MASDA.llm.base import LLMProvider
from MASDA.models.data.cost import CostSchema
from MASDA.models.output.infraedge import InfraGraphOutput
from MASDA.models.output.nodecost import CostOutput


class CostAgentInput(BaseModel):
    """Input for the Cost Agent."""

    infra_graph: InfraGraphOutput = Field(..., description="Infrastructure graph to analyze")
    cost_schema: CostSchema = Field(..., description="Cost constraints and preferences")
    iteration: int = Field(default=0, description="Current optimization iteration")


class CostAgentOutput(BaseModel):
    """Output from the Cost Agent."""

    cost_output: CostOutput = Field(..., description="Cost analysis results")
    optimization_suggestions: str = Field(
        default="", description="Suggestions for cost optimization"
    )
    requires_infra_changes: bool = Field(
        default=False, description="Whether infra changes are needed"
    )
    within_budget: bool = Field(
        default=True, description="Whether estimated cost is within budget"
    )


class CostAgent(Agent[CostAgentInput, CostAgentOutput]):
    """Analyzes infrastructure costs and provides optimization feedback.

    Input: CostAgentInput (infra graph + cost schema)
    Output: CostAgentOutput (costs + optimization suggestions)
    """

    def __init__(self, llm_provider: LLMProvider):
        super().__init__(llm_provider)

    @property
    def name(self) -> str:
        return "CostAgent"

    @property
    def input_type(self) -> Type[CostAgentInput]:
        return CostAgentInput

    @property
    def output_type(self) -> Type[CostAgentOutput]:
        return CostAgentOutput

    def get_system_prompt(self) -> str:
        return """You are an expert cloud cost analyst and FinOps specialist.
Your job is to analyze infrastructure costs and provide optimization recommendations.

CRITICAL RULES:
1. Use REALISTIC pricing based on current cloud provider rates.
2. Consider all cost drivers: compute, storage, network egress, data transfer.
3. Account for reserved instances, spot instances, and savings plans if applicable.
4. Provide per-node cost breakdowns.
5. Identify the top cost drivers.
6. Suggest optimizations that don't compromise requirements.

COST ESTIMATION GUIDELINES:
AWS:
- t3.micro: ~$7.50/month, t3.small: ~$15/month, t3.medium: ~$30/month
- m5.large: ~$70/month, m5.xlarge: ~$140/month
- RDS db.t3.micro: ~$12/month, db.t3.small: ~$25/month
- S3: ~$0.023/GB/month, egress: ~$0.09/GB

GCP:
- e2-micro: ~$6/month, e2-small: ~$12/month, e2-medium: ~$24/month
- n2-standard-2: ~$50/month, n2-standard-4: ~$100/month
- Cloud SQL: ~$7/month (f1-micro) to ~$70/month (db-n1-standard-1)
- Storage: ~$0.02/GB/month

Azure:
- B1s: ~$7/month, B1ms: ~$15/month, B2s: ~$30/month
- D2s_v3: ~$70/month, D4s_v3: ~$140/month
- SQL Database: Basic ~$5/month, Standard S0 ~$15/month

OPTIMIZATION STRATEGIES:
- Right-sizing instances
- Reserved instances for stable workloads
- Spot/preemptible for fault-tolerant workloads
- Storage tiering
- Egress optimization

Be conservative with estimates - slightly overestimate to avoid surprises."""

    def build_prompt(self, input_data: CostAgentInput) -> str:
        budget_info = ""
        if input_data.cost_schema.budget.monthly_budget_usd:
            budget_info = f"\nTarget budget: ${input_data.cost_schema.budget.monthly_budget_usd}/month"
        if input_data.cost_schema.budget.hard_limit_usd:
            budget_info += f"\nHard limit: ${input_data.cost_schema.budget.hard_limit_usd}/month"

        return f"""Analyze the costs for this infrastructure architecture.

INFRASTRUCTURE GRAPH:
Provider: {input_data.infra_graph.provider_selected}
Nodes: {json.dumps([n.model_dump() for n in input_data.infra_graph.nodes], indent=2)}

COST CONSTRAINTS:
{json.dumps(input_data.cost_schema.model_dump(), indent=2)}
{budget_info}

CURRENT ITERATION: {input_data.iteration}

Provide:
1. Per-node cost estimates with cost drivers
2. Total monthly cost summary
3. Budget compliance check
4. Sensitivity scenarios (2x traffic, 50% reduction, etc.)
5. Optimization suggestions

If the architecture exceeds budget, set requires_infra_changes=true and provide specific suggestions."""
