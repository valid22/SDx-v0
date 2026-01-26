from typing import List, Optional, Literal
from pydantic import BaseModel, Field


class NodeCost(BaseModel):
    """Cost attribution for a single infrastructure node."""

    node_id: str = Field(..., description="ID of the infrastructure node")

    monthly_cost_usd: float = Field(
        ..., description="Estimated monthly cost in USD"
    )
    cost_range_usd: Optional[List[float]] = Field(
        None, description="[min, max] expected cost range"
    )

    cost_drivers: List[str] = Field(
        ..., description="Primary cost drivers (compute hours, storage, IOPS, egress)"
    )

    explanation: str = Field(..., description="Explanation of cost estimate")


class CostSummary(BaseModel):
    """Summary of total infrastructure costs."""

    total_monthly_cost_usd: float = Field(
        ..., description="Total estimated monthly cost"
    )
    min_monthly_cost_usd: Optional[float] = Field(
        None, description="Minimum expected monthly cost"
    )
    max_monthly_cost_usd: Optional[float] = Field(
        None, description="Maximum expected monthly cost"
    )

    budget_limit_usd: Optional[float] = Field(
        None, description="Budget limit if specified"
    )
    within_budget: bool = Field(
        ..., description="Whether estimate is within budget"
    )

    primary_cost_drivers: List[str] = Field(
        default_factory=list, description="Top cost drivers across all nodes"
    )


class CostSensitivityScenario(BaseModel):
    """A what-if cost scenario."""

    scenario_name: str = Field(
        ..., description="Scenario name (e.g., '2x traffic', '50% less storage')"
    )
    estimated_monthly_cost_usd: float = Field(
        ..., description="Estimated cost for this scenario"
    )


class CostOutput(BaseModel):
    """Complete cost analysis output from the Cost Agent."""

    schema_version: str = "v1"

    provider: Literal["aws", "gcp", "azure"] = Field(
        ..., description="Cloud provider for this cost analysis"
    )

    summary: CostSummary = Field(..., description="Cost summary")
    per_node_costs: List[NodeCost] = Field(
        default_factory=list, description="Per-node cost breakdown"
    )

    sensitivity_scenarios: Optional[List[CostSensitivityScenario]] = Field(
        None, description="What-if cost scenarios"
    )

    optimization_notes: List[str] = Field(
        default_factory=list, description="Cost optimization suggestions"
    )
