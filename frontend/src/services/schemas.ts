// Data schemas for infrastructure, cost, and compliance

// Infrastructure Node Schema
export interface InfraNodeSpec {
    cpu: string
    memory: string
    storage: string
    instanceType?: string
    engineVersion?: string
}

export interface InfraNode {
    id: string
    label: string
    type: 'VPC' | 'EC2' | 'RDS' | 'S3' | 'ALB' | 'Lambda' | 'EKS' | 'ElastiCache' | 'CloudFront' | 'Route53' | 'IAM'
    icon: string
    region: string
    status: 'Active' | 'Pending' | 'Warning'
    cost: number // Monthly cost in USD
    specs: InfraNodeSpec
    description: string
    connections: string[] // IDs of connected nodes
}

// Cost Analysis Schema
export interface CostBreakdown {
    compute: number
    storage: number
    network: number
    database: number
    other: number
}

export interface CostOptimization {
    type: string
    currentCost: number
    optimizedCost: number
    savings: number
    risk: 'low' | 'medium' | 'high'
    description: string
}

export interface CostAnalysisData {
    totalMonthlyCost: number
    breakdown: CostBreakdown
    optimizations: CostOptimization[]
    projectedSavings: number
}

// Security & Compliance Schema
export interface ComplianceIssue {
    id: string
    title: string
    resource: string
    severity: 'critical' | 'warning' | 'info'
    control: string
    description: string
    provider: string
    autoFixable: boolean
}

export interface ComplianceFramework {
    name: string
    compliance: number
    passed: number
    total: number
}

export interface SecurityData {
    overallHealth: number
    frameworks: ComplianceFramework[]
    issues: ComplianceIssue[]
}

// Complete Architecture Response
export interface ArchitectureResponse {
    nodes: InfraNode[]
    edges: Array<{ source: string; target: string }>
    cost: CostAnalysisData
    security: SecurityData
    summary: string
}

// Gemini Request Schema
export interface GeminiArchitectureRequest {
    intent: string
    cloudProvider: 'aws' | 'gcp' | 'azure'
    region?: string
    budget?: number
    complianceFrameworks?: string[]
}
