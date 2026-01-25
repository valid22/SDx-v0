class ScaleModel(BaseModel):
    users: Optional[int] = Field(None, description="Estimated number of users")
    requests_per_second: Optional[int] = Field(None, description="Average RPS")
    peak_rps: Optional[int] = Field(None, description="Peak RPS")
    data_growth_gb_per_month: Optional[int] = None
    concurrency: Optional[int] = None


class PerformanceConstraints(BaseModel):
    p95_latency_ms: Optional[int] = None
    p99_latency_ms: Optional[int] = None
    max_cpu_utilization_pct: Optional[int] = Field(
        None, description="Upper bound for CPU utilization"
    )
    max_memory_utilization_pct: Optional[int] = None


class AvailabilityRequirements(BaseModel):
    sla_percentage: Optional[float] = Field(
        None, description="Target SLA (e.g., 99.9, 99.99)"
    )
    multi_az: bool = True
    multi_region: bool = False


class DeploymentPreferences(BaseModel):
    prefer_managed_services: bool = True
    allow_serverless: bool = True
    allow_kubernetes: bool = True
    allow_virtual_machines: bool = True


class InfraSchema(BaseModel):
    schema_version: str = "v1"

    workload_name: str
    workload_type: Literal[
        "web_app",
        "api_backend",
        "data_pipeline",
        "batch",
        "streaming",
        "ml_inference",
        "transactional"
    ]

    regions: Optional[List[str]] = Field(
        None, description="Allowed regions or region groups (e.g. eu-west)"
    )

    scale: ScaleModel
    performance: PerformanceConstraints
    availability: AvailabilityRequirements
    deployment_preferences: DeploymentPreferences

    bottlenecks: Optional[List[str]] = Field(
        None, description="User-identified bottlenecks"
    )

    thresholds: Optional[Dict[str, int]] = Field(
        None, description="Custom thresholds (queue_lag, db_connections, etc.)"
    )

    explanation_required: bool = True
