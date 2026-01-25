class InfraNode(BaseModel):
    id: str
    label: str
    provider: Literal["aws", "gcp", "azure"]

    node_type: InfraNodeType
    service_name: str  # e.g. "EKS", "Cloud SQL", "Application Gateway"

    region: Optional[str] = None
    availability_zone: Optional[str] = None

    managed: bool = True
    size_class: Optional[str] = Field(
        None, description="Instance size, SKU, tier, or plan"
    )

    scaling_model: Optional[str] = Field(
        None, description="autoscaling, fixed, serverless, scheduled"
    )

    depends_on: List[str] = Field(
        default_factory=list, description="IDs of dependent nodes"
    )

    explanation: str = Field(
        ..., description="Why this node exists and was selected"
    )

    metadata: Dict[str, str] = Field(
        default_factory=dict, description="Provider-specific metadata"
    )
