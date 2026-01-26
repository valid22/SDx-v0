from typing import Type, List, Optional
from pydantic import BaseModel, Field
import json

from MASDA.agents.base import Agent
from MASDA.llm.base import LLMProvider
from MASDA.constants import CloudProvider
from MASDA.models.output.infraedge import InfraGraphOutput
from MASDA.models.output.nodecost import CostOutput
from MASDA.models.output.security import SecurityOutput, FinalArchitectureOutput


class CondenserInput(BaseModel):
    """Input for the Condenser Agent."""

    infra_graph: InfraGraphOutput = Field(..., description="Selected infrastructure graph")
    cost_output: CostOutput = Field(..., description="Cost analysis for selected graph")
    security_output: SecurityOutput = Field(..., description="Security analysis for selected graph")
    selected_provider: CloudProvider = Field(..., description="Selected cloud provider")
    decision_log: List[str] = Field(
        default_factory=list, description="Decision log entries for context"
    )
    original_intent: str = Field(..., description="Original user intent")


class CondenserAgent(Agent[CondenserInput, FinalArchitectureOutput]):
    """Merges all agent outputs into the final architecture output.

    Input: CondenserInput (all agent outputs)
    Output: FinalArchitectureOutput (unified output for frontend)
    """

    def __init__(self, llm_provider: LLMProvider):
        super().__init__(llm_provider)

    @property
    def name(self) -> str:
        return "Condenser"

    @property
    def input_type(self) -> Type[CondenserInput]:
        return CondenserInput

    @property
    def output_type(self) -> Type[FinalArchitectureOutput]:
        return FinalArchitectureOutput

    def get_system_prompt(self) -> str:
        return """You are an expert technical writer and solutions architect.
Your job is to produce the final architecture output that will be presented to users.

CRITICAL RULES:
1. Combine all agent outputs into a coherent final output.
2. Write a clear, actionable decision rationale.
3. Generate practical deployment commands.
4. Assign a confidence score based on:
   - How well requirements are met (0.3)
   - Budget compliance (0.2)
   - Security compliance (0.3)
   - Architecture completeness (0.2)
5. Keep explanations concise but informative.

DEPLOYMENT COMMAND FORMATS:
AWS:
- terraform init && terraform plan
- aws cloudformation deploy --stack-name <name> --template-file <template>

GCP:
- gcloud deployment-manager deployments create <name> --config <config>
- terraform init && terraform plan

Azure:
- az deployment group create --resource-group <rg> --template-file <template>
- terraform init && terraform plan

Always include Terraform commands as the primary option.
Include provider-specific CLI commands as alternatives."""

    def build_prompt(self, input_data: CondenserInput) -> str:
        decision_context = "\n".join(input_data.decision_log) if input_data.decision_log else "No decision log available."

        return f"""Produce the final architecture output for the user.

ORIGINAL USER INTENT:
{input_data.original_intent}

SELECTED PROVIDER: {input_data.selected_provider.value.upper()}

INFRASTRUCTURE GRAPH:
{json.dumps(input_data.infra_graph.model_dump(), indent=2)}

COST ANALYSIS:
{json.dumps(input_data.cost_output.model_dump(), indent=2)}

SECURITY ANALYSIS:
{json.dumps(input_data.security_output.model_dump(), indent=2)}

DECISION LOG:
{decision_context}

Produce:
1. The combined FinalArchitectureOutput
2. A clear decision rationale explaining why this architecture was chosen
3. A confidence score (0.0-1.0) with justification
4. Practical deployment commands for the selected provider

The infra, cost, and security fields should match the provided inputs.
Focus on writing a compelling decision_rationale and useful deploy_commands."""
