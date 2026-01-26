from typing import Type, List
from pydantic import BaseModel, Field
import json

from MASDA.agents.base import Agent
from MASDA.llm.base import LLMProvider
from MASDA.models.data.security import SecuritySchema
from MASDA.models.output.infraedge import InfraGraphOutput
from MASDA.models.output.security import SecurityOutput


class SecurityAgentInput(BaseModel):
    """Input for the Security Agent."""

    infra_graph: InfraGraphOutput = Field(..., description="Infrastructure graph to analyze")
    security_schema: SecuritySchema = Field(..., description="Security requirements")
    iteration: int = Field(default=0, description="Current validation iteration")


class SecurityAgentOutput(BaseModel):
    """Output from the Security Agent."""

    security_output: SecurityOutput = Field(..., description="Security analysis results")
    remediations_required: List[str] = Field(
        default_factory=list, description="Required remediations for compliance"
    )
    requires_infra_changes: bool = Field(
        default=False, description="Whether infra changes are needed"
    )
    compliance_met: bool = Field(
        default=True, description="Whether compliance requirements are met"
    )


class SecurityAgent(Agent[SecurityAgentInput, SecurityAgentOutput]):
    """Validates infrastructure security and provides remediations.

    Input: SecurityAgentInput (infra graph + security schema)
    Output: SecurityAgentOutput (security posture + remediations)
    """

    def __init__(self, llm_provider: LLMProvider):
        super().__init__(llm_provider)

    @property
    def name(self) -> str:
        return "SecurityAgent"

    @property
    def input_type(self) -> Type[SecurityAgentInput]:
        return SecurityAgentInput

    @property
    def output_type(self) -> Type[SecurityAgentOutput]:
        return SecurityAgentOutput

    def get_system_prompt(self) -> str:
        return """You are an expert cloud security architect and compliance specialist.
Your job is to validate infrastructure security and identify compliance gaps.

CRITICAL RULES:
1. Evaluate EVERY node for security posture.
2. Check compliance against ALL required frameworks.
3. Identify residual risks that cannot be mitigated by architecture.
4. Be conservative - flag potential issues even if uncertain.
5. Provide actionable remediations.

SECURITY CONTROLS TO CHECK:
- Encryption at rest (storage, databases)
- Encryption in transit (TLS, HTTPS)
- Network isolation (VPCs, security groups)
- Identity and access (IAM, workload identity)
- Logging and monitoring (audit trails)
- Data classification (sensitivity handling)
- Public exposure (internet-facing services)

COMPLIANCE FRAMEWORK REQUIREMENTS:
GDPR:
- Data encryption, access controls, audit logging
- Data residency, right to erasure support
- Breach notification capability

HIPAA:
- End-to-end encryption, access controls
- Audit logging, BAA requirements
- Minimum necessary access

PCI-DSS:
- Network segmentation, encryption
- Access controls, logging
- Vulnerability management

SOC2:
- Access controls, encryption
- Monitoring, incident response
- Change management

Flag any architecture that doesn't meet mandatory requirements."""

    def build_prompt(self, input_data: SecurityAgentInput) -> str:
        compliance_list = ", ".join(
            [c.name for c in input_data.security_schema.compliance_requirements]
        )

        return f"""Analyze the security posture of this infrastructure.

INFRASTRUCTURE GRAPH:
Provider: {input_data.infra_graph.provider_selected}
Nodes: {json.dumps([n.model_dump() for n in input_data.infra_graph.nodes], indent=2)}
Edges: {json.dumps([e.model_dump() for e in input_data.infra_graph.edges], indent=2)}

SECURITY REQUIREMENTS:
{json.dumps(input_data.security_schema.model_dump(), indent=2)}

COMPLIANCE FRAMEWORKS TO VALIDATE: {compliance_list}

CURRENT ITERATION: {input_data.iteration}

Provide:
1. Per-node security posture with controls applied
2. Compliance status for each required framework
3. Global security controls applied
4. Residual risks that remain
5. Required remediations (if any)

If the architecture has compliance gaps, set requires_infra_changes=true and list specific remediations."""
