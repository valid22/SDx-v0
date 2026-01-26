from typing import List, Optional, Literal
from pydantic import BaseModel, Field

from MASDA.models.output.infraedge import InfraGraphOutput
from MASDA.models.output.nodecost import CostOutput


class SecurityControl(BaseModel):
    """A security control applied to infrastructure."""

    control_name: str = Field(..., description="Name of the security control")
    description: str = Field(..., description="Description of the control")
    mandatory: bool = Field(..., description="Whether control is mandatory")
    enforced: bool = Field(..., description="Whether control is currently enforced")


class NodeSecurityPosture(BaseModel):
    """Security posture for a single infrastructure node."""

    node_id: str = Field(..., description="ID of the infrastructure node")

    encryption_at_rest: bool = Field(
        ..., description="Whether encryption at rest is enabled"
    )
    encryption_in_transit: bool = Field(
        ..., description="Whether encryption in transit is enabled"
    )
    public_exposure: bool = Field(
        ..., description="Whether node is publicly exposed"
    )

    controls_applied: List[SecurityControl] = Field(
        default_factory=list, description="Security controls applied to this node"
    )
    explanation: str = Field(
        ..., description="Explanation of security posture"
    )


class ComplianceStatus(BaseModel):
    """Compliance status for a framework."""

    framework: str = Field(
        ..., description="Compliance framework (e.g., GDPR, PCI-DSS)"
    )
    compliant: bool = Field(..., description="Whether currently compliant")
    notes: Optional[str] = Field(None, description="Compliance notes")


class SecurityOutput(BaseModel):
    """Complete security analysis output from the Security Agent."""

    schema_version: str = "v1"

    data_sensitivity: Literal["public", "internal", "confidential", "restricted"] = (
        Field(..., description="Data sensitivity classification")
    )

    compliance_status: List[ComplianceStatus] = Field(
        default_factory=list, description="Compliance status per framework"
    )

    node_security: List[NodeSecurityPosture] = Field(
        default_factory=list, description="Per-node security posture"
    )

    global_controls: List[SecurityControl] = Field(
        default_factory=list, description="Global security controls"
    )

    residual_risks: List[str] = Field(
        default_factory=list, description="Residual risks that remain"
    )
    security_summary: str = Field(
        ..., description="Summary of overall security posture"
    )


class FinalArchitectureOutput(BaseModel):
    """Final architecture output combining all agent outputs for the frontend."""

    schema_version: str = "v1"

    infra: InfraGraphOutput = Field(..., description="Infrastructure graph")
    cost: CostOutput = Field(..., description="Cost analysis")
    security: SecurityOutput = Field(..., description="Security analysis")

    decision_rationale: str = Field(
        ..., description="Explanation of overall architecture decisions"
    )
    confidence_score: float = Field(
        ..., ge=0.0, le=1.0, description="Confidence score (0.0 - 1.0)"
    )

    deploy_commands: List[str] = Field(
        default_factory=list, description="One-click deployment commands"
    )
