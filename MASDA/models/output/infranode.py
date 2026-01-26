from typing import List, Optional, Dict, Literal
from pydantic import BaseModel, Field

from MASDA.models.output.infra import InfraNodeType


class InfraNode(BaseModel):
    """A node in the infrastructure graph representing a cloud resource."""

    id: str = Field(..., description="Unique identifier for the node")
    label: str = Field(..., description="Display label for the node")
    provider: Literal["aws", "gcp", "azure"] = Field(
        ..., description="Cloud provider"
    )

    node_type: InfraNodeType = Field(..., description="Type of infrastructure node")
    service_name: str = Field(
        ..., description="Cloud service name (e.g., EKS, Cloud SQL, Application Gateway)"
    )

    region: Optional[str] = Field(None, description="Deployment region")
    availability_zone: Optional[str] = Field(
        None, description="Specific availability zone"
    )

    managed: bool = Field(True, description="Whether this is a managed service")
    size_class: Optional[str] = Field(
        None, description="Instance size, SKU, tier, or plan"
    )

    scaling_model: Optional[str] = Field(
        None, description="Scaling model: autoscaling, fixed, serverless, scheduled"
    )

    depends_on: List[str] = Field(
        default_factory=list, description="IDs of dependent nodes"
    )

    explanation: str = Field(
        ..., description="Why this node exists and was selected"
    )

    metadata: Dict[str, str] = Field(
        default_factory=dict, description="Provider-specific metadata"
    )
