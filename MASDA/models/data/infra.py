from typing import List, Optional, Dict, Literal
from pydantic import BaseModel, Field


class ScaleModel(BaseModel):
    """Infrastructure scaling requirements."""

    users: Optional[int] = Field(None, description="Estimated number of users")
    requests_per_second: Optional[int] = Field(
        None, description="Average requests per second"
    )
    peak_rps: Optional[int] = Field(None, description="Peak requests per second")
    data_growth_gb_per_month: Optional[int] = Field(
        None, description="Expected data growth in GB per month"
    )
    concurrency: Optional[int] = Field(
        None, description="Expected concurrent connections"
    )


class PerformanceConstraints(BaseModel):
    """Performance requirements for the infrastructure."""

    p95_latency_ms: Optional[int] = Field(None, description="P95 latency target in ms")
    p99_latency_ms: Optional[int] = Field(None, description="P99 latency target in ms")
    max_cpu_utilization_pct: Optional[int] = Field(
        None, description="Upper bound for CPU utilization percentage"
    )
    max_memory_utilization_pct: Optional[int] = Field(
        None, description="Upper bound for memory utilization percentage"
    )


class AvailabilityRequirements(BaseModel):
    """Availability and redundancy requirements."""

    sla_percentage: Optional[float] = Field(
        None, description="Target SLA percentage (e.g., 99.9, 99.99)"
    )
    multi_az: bool = Field(True, description="Deploy across multiple availability zones")
    multi_region: bool = Field(False, description="Deploy across multiple regions")


class DeploymentPreferences(BaseModel):
    """Deployment model preferences."""

    prefer_managed_services: bool = Field(
        True, description="Prefer managed/PaaS services over self-managed"
    )
    allow_serverless: bool = Field(True, description="Allow serverless compute")
    allow_kubernetes: bool = Field(True, description="Allow Kubernetes deployments")
    allow_virtual_machines: bool = Field(True, description="Allow VM-based deployments")


class InfraSchema(BaseModel):
    """Infrastructure requirements schema for workload planning."""

    schema_version: str = "v1"

    workload_name: str = Field(..., description="Name of the workload")
    workload_type: Literal[
        "web_app",
        "api_backend",
        "data_pipeline",
        "batch",
        "streaming",
        "ml_inference",
        "transactional",
    ] = Field(..., description="Type of workload")

    regions: Optional[List[str]] = Field(
        None, description="Allowed regions or region groups (e.g., eu-west)"
    )

    scale: ScaleModel
    performance: PerformanceConstraints
    availability: AvailabilityRequirements
    deployment_preferences: DeploymentPreferences

    bottlenecks: Optional[List[str]] = Field(
        None, description="User-identified bottlenecks or constraints"
    )

    thresholds: Optional[Dict[str, int]] = Field(
        None, description="Custom thresholds (queue_lag, db_connections, etc.)"
    )

    explanation_required: bool = Field(
        True, description="Require explanation for each decision"
    )
