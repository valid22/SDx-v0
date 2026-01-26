from typing import List, Optional, Dict, Literal
from pydantic import BaseModel, Field

from MASDA.constants import OptimizationPreference


class BudgetModel(BaseModel):
    """Budget constraints for infrastructure."""

    monthly_budget_usd: Optional[float] = Field(
        None, description="Target monthly budget in USD"
    )
    soft_limit_usd: Optional[float] = Field(
        None, description="Soft budget limit that triggers warnings"
    )
    hard_limit_usd: Optional[float] = Field(
        None, description="Hard budget limit that cannot be exceeded"
    )


class TrafficVariability(BaseModel):
    """Traffic pattern characteristics."""

    predictable: bool = Field(True, description="Whether traffic is predictable")
    burst_factor: Optional[float] = Field(
        None, description="Expected traffic spike multiplier (e.g., 2.0 = 2x peak)"
    )


class CostSensitivity(BaseModel):
    """Cost optimization preferences."""

    optimization_preference: OptimizationPreference = OptimizationPreference.balanced
    tolerate_spot_instances: bool = Field(
        False, description="Allow spot/preemptible instances"
    )
    tolerate_reserved_commitments: bool = Field(
        True, description="Allow reserved instance commitments"
    )


class CostSchema(BaseModel):
    """Cost requirements schema for infrastructure planning."""

    schema_version: str = "v1"

    budget: BudgetModel
    traffic_variability: TrafficVariability
    sensitivity: CostSensitivity

    egress_sensitive: bool = Field(
        False, description="Whether egress costs are a primary concern"
    )
    prefer_single_cloud: bool = Field(
        False, description="Prefer single cloud to avoid inter-cloud egress"
    )

    cost_breakdown_required: bool = Field(
        True, description="Require detailed cost breakdown"
    )
    per_node_cost_required: bool = Field(
        True, description="Require per-node cost attribution"
    )
