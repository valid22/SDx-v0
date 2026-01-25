class NodeCost(BaseModel):
    node_id: str

    monthly_cost_usd: float
    cost_range_usd: Optional[List[float]] = Field(
        None, description="[min, max] expected range"
    )

    cost_drivers: List[str] = Field(
        ..., description="Compute hours, storage, IOPS, egress, etc."
    )

    explanation: str


class CostSummary(BaseModel):
    total_monthly_cost_usd: float
    min_monthly_cost_usd: Optional[float] = None
    max_monthly_cost_usd: Optional[float] = None

    budget_limit_usd: Optional[float] = None
    within_budget: bool

    primary_cost_drivers: List[str]


class CostSensitivityScenario(BaseModel):
    scenario_name: str  # e.g. "2x traffic", "50% less storage"
    estimated_monthly_cost_usd: float


class CostOutput(BaseModel):
    schema_version: str = "v1"

    provider: Literal["aws", "gcp", "azure"]

    summary: CostSummary
    per_node_costs: List[NodeCost]

    sensitivity_scenarios: Optional[List[CostSensitivityScenario]] = None

    optimization_notes: List[str]
