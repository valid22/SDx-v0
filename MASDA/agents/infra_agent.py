from typing import Type
from pydantic import BaseModel, Field
import json

from MASDA.agents.base import Agent
from MASDA.llm.base import LLMProvider
from MASDA.constants import CloudProvider
from MASDA.models.data.infra import InfraSchema
from MASDA.models.data.cost import CostSchema
from MASDA.models.data.security import SecuritySchema
from MASDA.models.output.infraedge import InfraGraphOutput


class InfraAgentInput(BaseModel):
    """Input for the Infra Agent."""

    provider: CloudProvider = Field(..., description="Target cloud provider")
    infra_schema: InfraSchema = Field(..., description="Infrastructure requirements")
    cost_schema: CostSchema = Field(..., description="Cost constraints")
    security_schema: SecuritySchema = Field(..., description="Security requirements")
    optimization_feedback: str = Field(
        default="", description="Feedback from previous iteration"
    )


class InfraAgent(Agent[InfraAgentInput, InfraGraphOutput]):
    """Generates infrastructure graph for a specific cloud provider.

    Input: InfraAgentInput (schemas + provider)
    Output: InfraGraphOutput (nodes, edges, summary)
    """

    def __init__(self, llm_provider: LLMProvider):
        super().__init__(llm_provider)

    @property
    def name(self) -> str:
        return "InfraAgent"

    @property
    def input_type(self) -> Type[InfraAgentInput]:
        return InfraAgentInput

    @property
    def output_type(self) -> Type[InfraGraphOutput]:
        return InfraGraphOutput

    def get_system_prompt(self) -> str:
        return """You are an expert cloud infrastructure architect.
Your job is to design infrastructure graphs for specific cloud providers.

CRITICAL RULES:
1. Design for the SPECIFIC provider requested (AWS, GCP, or Azure).
2. Use REAL service names (e.g., "Amazon RDS" not "database service").
3. Every node MUST have an explanation of why it was selected.
4. Consider the cost schema when selecting instance sizes.
5. Apply security requirements (encryption, network isolation, etc.).
6. Design for availability requirements (multi-AZ, multi-region).
7. Include all necessary supporting infrastructure (VPCs, subnets, security groups, etc.).

NODE TYPES TO USE:
- compute: EC2, Cloud Run, Azure VMs, Kubernetes nodes
- storage: S3, GCS, Azure Blob
- database: RDS, Cloud SQL, Cosmos DB
- network: VPC, VNet, subnets, gateways
- security: WAF, Security Groups, IAM roles
- observability: CloudWatch, Cloud Monitoring
- messaging: SQS, Pub/Sub, Service Bus
- load_balancer: ALB, Cloud Load Balancer
- cache: ElastiCache, Memorystore
- serverless: Lambda, Cloud Functions

EDGE TYPES:
- network_flow: Data transfer between services
- data_flow: Data movement (ETL, streaming)
- dependency: Service dependency
- trust_boundary: Security trust boundary crossing

Be thorough and precise. Your output is used for cost estimation and security analysis."""

    def build_prompt(self, input_data: InfraAgentInput) -> str:
        feedback_section = ""
        if input_data.optimization_feedback:
            feedback_section = f"""

OPTIMIZATION FEEDBACK FROM PREVIOUS ITERATION:
{input_data.optimization_feedback}

Apply this feedback to improve the architecture."""

        return f"""Design a cloud infrastructure architecture for {input_data.provider.value.upper()}.

INFRASTRUCTURE REQUIREMENTS:
{json.dumps(input_data.infra_schema.model_dump(), indent=2)}

COST CONSTRAINTS:
{json.dumps(input_data.cost_schema.model_dump(), indent=2)}

SECURITY REQUIREMENTS:
{json.dumps(input_data.security_schema.model_dump(), indent=2)}
{feedback_section}

Generate a complete infrastructure graph with:
1. All necessary nodes (compute, storage, database, network, security, etc.)
2. All edges connecting the nodes
3. A high-level summary of the architecture
4. Any assumptions made

Use provider-specific service names and configurations."""
