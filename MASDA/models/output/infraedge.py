class InfraEdge(BaseModel):
    id: str
    from_node: str
    to_node: str

    edge_type: InfraEdgeType
    encrypted: bool = True
    public: bool = False

    explanation: Optional[str] = None


class InfraGraphOutput(BaseModel):
    schema_version: str = "v1"

    provider_selected: Literal["aws", "gcp", "azure"]
    regions_used: List[str]

    nodes: List[InfraNode]
    edges: List[InfraEdge]

    high_level_summary: str
    assumptions: List[str]

    deployment_ready: bool = True
