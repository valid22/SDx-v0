class SecurityControl(BaseModel):
    control_name: str
    description: str
    mandatory: bool
    enforced: bool


class NodeSecurityPosture(BaseModel):
    node_id: str

    encryption_at_rest: bool
    encryption_in_transit: bool
    public_exposure: bool

    controls_applied: List[SecurityControl]
    explanation: str


class ComplianceStatus(BaseModel):
    framework: str  # e.g. GDPR, PCI-DSS
    compliant: bool
    notes: Optional[str] = None


class SecurityOutput(BaseModel):
    schema_version: str = "v1"

    data_sensitivity: Literal[
        "public", "internal", "confidential", "restricted"
    ]

    compliance_status: List[ComplianceStatus]

    node_security: List[NodeSecurityPosture]

    global_controls: List[SecurityControl]

    residual_risks: List[str]
    security_summary: str


class FinalArchitectureOutput(BaseModel):
    schema_version: str = "v1"

    infra: InfraGraphOutput
    cost: CostOutput
    security: SecurityOutput

    decision_rationale: str
    confidence_score: float  # 0.0 – 1.0

    deploy_commands: List[str]
