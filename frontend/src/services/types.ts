export enum AgentStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

// --- Specialist Shared Enums ---
export type OptimizationPreference = "cost" | "performance" | "balanced";
export type ExposureLevel = "public" | "private" | "restricted";
export type DataSensitivity = "low" | "medium" | "high" | "critical";

// --- Infra Graph Types ---
export type InfraNodeType = "compute" | "storage" | "database" | "network" | "security" | "observability" | "messaging" | "load_balancer" | "cache" | "serverless" | "other";
export type InfraEdgeType = "network_flow" | "data_flow" | "dependency" | "trust_boundary";

export interface InfraNode {
  id: string;
  label: string;
  provider: "aws" | "gcp" | "azure";
  node_type: InfraNodeType;
  service_name: string;
  region?: string;
  availability_zone?: string;
  managed: boolean;
  size_class?: string;
  scaling_model?: string;
  depends_on: string[];
  explanation: string;
  metadata: Record<string, string>;
}

export interface InfraEdge {
  id: string;
  from_node: string;
  to_node: string;
  edge_type: InfraEdgeType;
  encrypted: boolean;
  public: boolean;
  explanation?: string;
}

export interface InfraGraphOutput {
  schema_version: string;
  provider_selected: "aws" | "gcp" | "azure";
  regions_used: string[];
  nodes: InfraNode[];
  edges: InfraEdge[];
  high_level_summary: string;
  assumptions: string[];
  deployment_ready: boolean;
}

// --- Node Cost Types ---
export interface NodeCost {
  node_id: string;
  monthly_cost_usd: number;
  cost_range_usd?: [number, number];
  cost_drivers: string[];
  explanation: string;
}

export interface CostSummary {
  total_monthly_cost_usd: number;
  min_monthly_cost_usd?: number;
  max_monthly_cost_usd?: number;
  budget_limit_usd?: number;
  within_budget: boolean;
  primary_cost_drivers: string[];
}

export interface CostSensitivityScenario {
  scenario_name: string;
  estimated_monthly_cost_usd: number;
}

export interface CostOutput {
  schema_version: string;
  provider: "aws" | "gcp" | "azure";
  summary: CostSummary;
  per_node_costs: NodeCost[];
  sensitivity_scenarios?: CostSensitivityScenario[];
  optimization_notes: string[];
}

// --- Security Output Types ---
export interface SecurityControl {
  control_name: string;
  description: string;
  mandatory: boolean;
  enforced: boolean;
}

export interface NodeSecurityPosture {
  node_id: string;
  encryption_at_rest: boolean;
  encryption_in_transit: boolean;
  public_exposure: boolean;
  controls_applied: SecurityControl[];
  explanation: string;
}

export interface ComplianceStatus {
  framework: string;
  compliant: boolean;
  notes?: string;
}

export interface SecurityOutput {
  schema_version: string;
  data_sensitivity: "public" | "internal" | "confidential" | "restricted";
  compliance_status: ComplianceStatus[];
  node_security: NodeSecurityPosture[];
  global_controls: SecurityControl[];
  residual_risks: string[];
  security_summary: string;
}

// --- Final Combined Output ---
export interface FinalArchitectureOutput {
  schema_version: string;
  infra: InfraGraphOutput;
  cost: CostOutput;
  security: SecurityOutput;
  decision_rationale: string;
  confidence_score: number;
  deploy_commands: string[];
}

// --- Infra Schema (Initial extraction) ---
export interface ScaleModel {
  users: number | null;
  requests_per_second: number | null;
  peak_rps: number | null;
  data_growth_gb_per_month: number | null;
  concurrency: number | null;
}

export interface PerformanceConstraints {
  p95_latency_ms: number | null;
  p99_latency_ms: number | null;
  max_cpu_utilization_pct: number | null;
  max_memory_utilization_pct: number | null;
}

export interface AvailabilityRequirements {
  sla_percentage: number | null;
  multi_az: boolean;
  multi_region: boolean;
}

export interface DeploymentPreferences {
  prefer_managed_services: boolean;
  allow_serverless: boolean;
  allow_kubernetes: boolean;
  allow_virtual_machines: boolean;
}

export interface InfraSchema {
  schema_version: string;
  workload_name: string;
  workload_type: "web_app" | "api_backend" | "data_pipeline" | "batch" | "streaming" | "ml_inference" | "transactional";
  regions: string[] | null;
  scale: ScaleModel;
  performance: PerformanceConstraints;
  availability: AvailabilityRequirements;
  deployment_preferences: DeploymentPreferences;
  bottlenecks: string[] | null;
  thresholds: Record<string, number> | null;
  explanation_required: boolean;
}

// --- Cost Schema (Initial extraction) ---
export interface BudgetModel {
  monthly_budget_usd: number | null;
  soft_limit_usd: number | null;
  hard_limit_usd: number | null;
}

export interface TrafficVariability {
  predictable: boolean;
  burst_factor: number | null;
}

export interface CostSensitivity {
  optimization_preference: OptimizationPreference;
  tolerate_spot_instances: boolean;
  tolerate_reserved_commitments: boolean;
}

export interface CostSchema {
  schema_version: string;
  budget: BudgetModel;
  traffic_variability: TrafficVariability;
  sensitivity: CostSensitivity;
  egress_sensitive: boolean;
  prefer_single_cloud: boolean;
  cost_breakdown_required: boolean;
  per_node_cost_required: boolean;
}

// --- Security Schema (Initial extraction) ---
export interface ComplianceRequirement {
  name: string;
  mandatory: boolean;
}

export interface EncryptionRequirements {
  encryption_at_rest: boolean;
  encryption_in_transit: boolean;
  customer_managed_keys_required: boolean;
}

export interface IdentityRequirements {
  least_privilege: boolean;
  workload_identity_required: boolean;
  human_access_restricted: boolean;
}

export interface NetworkSecurityRequirements {
  exposure: ExposureLevel;
  private_networking_required: boolean;
  zero_trust_model: boolean;
}

export interface SecuritySchema {
  schema_version: string;
  data_sensitivity: DataSensitivity;
  compliance_requirements: ComplianceRequirement[];
  encryption: EncryptionRequirements;
  identity: IdentityRequirements;
  network: NetworkSecurityRequirements;
  audit_logging_required: boolean;
  security_explainability_required: boolean;
}

// --- Output Schemas ---
export interface CostFeedback {
  is_aligned: boolean;
  missing_drivers: string[];
  suggestions: string[];
  reasoning: string;
}

export interface BlueprintSchema {
  overall_blueprint: string;
  ai_workflow: string;
  build_scale_strategy: string;
  infra_considerations: string;
  cost_considerations: string;
  security_considerations: string;
  governance_validation: string;
}

export interface CandidateArchitecture {
  provider: 'aws' | 'azure' | 'gcp';
  total_monthly_cost: number;
  budget_status: 'under_budget' | 'at_risk' | 'over_budget';
  summary: string;
}

export interface NormalizationResult {
  understanding: {
    canonical_intent: {
      system_intent: string;
      priority_order: string[];
    };
    clarifying_questions: string[];
  };
  infra_schema: InfraSchema;
  cost_schema: CostSchema;
  security_schema: SecuritySchema;
  blueprint: BlueprintSchema;
  final_architecture: FinalArchitectureOutput;
  cost_feedback?: CostFeedback;
  cost_audit?: {
    reports: CandidateArchitecture[];
  };
  warnings: string[];
}
