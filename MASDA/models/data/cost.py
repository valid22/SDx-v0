class BudgetModel(BaseModel):
    monthly_budget_usd: Optional[float] = None
    soft_limit_usd: Optional[float] = None
    hard_limit_usd: Optional[float] = None


class TrafficVariability(BaseModel):
    predictable: bool = True
    burst_factor: Optional[float] = Field(
        None, description="Expected traffic spike multiplier"
    )


class CostSensitivity(BaseModel):
    optimization_preference: OptimizationPreference = OptimizationPreference.balanced
    tolerate_spot_instances: bool = False
    tolerate_reserved_commitments: bool = True


class CostSchema(BaseModel):
    schema_version: str = "v1"

    budget: BudgetModel
    traffic_variability: TrafficVariability
    sensitivity: CostSensitivity

    egress_sensitive: bool = False
    prefer_single_cloud: bool = False

    cost_breakdown_required: bool = True
    per_node_cost_required: bool = True
