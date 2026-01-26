from typing import List, Optional, Literal
from pydantic import BaseModel, Field

from MASDA.models.output.infra import InfraEdgeType
from MASDA.models.output.infranode import InfraNode


class InfraEdge(BaseModel):
    """An edge in the infrastructure graph representing a connection."""

    id: str = Field(..., description="Unique identifier for the edge")
    from_node: str = Field(..., description="Source node ID")
    to_node: str = Field(..., description="Target node ID")

    edge_type: InfraEdgeType = Field(..., description="Type of connection")
    encrypted: bool = Field(True, description="Whether connection is encrypted")
    public: bool = Field(False, description="Whether connection is public")

    explanation: Optional[str] = Field(
        None, description="Explanation for this connection"
    )


class InfraGraphOutput(BaseModel):
    """Complete infrastructure graph output from the Infra Agent."""

    schema_version: str = "v1"

    provider_selected: Literal["aws", "gcp", "azure"] = Field(
        ..., description="Selected cloud provider"
    )
    regions_used: List[str] = Field(
        default_factory=list, description="Regions used in the architecture"
    )

    nodes: List[InfraNode] = Field(
        default_factory=list, description="Infrastructure nodes"
    )
    edges: List[InfraEdge] = Field(
        default_factory=list, description="Connections between nodes"
    )

    high_level_summary: str = Field(
        ..., description="High-level summary of the architecture"
    )
    assumptions: List[str] = Field(
        default_factory=list, description="Assumptions made during design"
    )

    deployment_ready: bool = Field(
        True, description="Whether architecture is ready for deployment"
    )
