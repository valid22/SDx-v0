from typing import List, Optional
from pydantic import BaseModel, Field

from MASDA.constants import CloudProvider
from MASDA.models.data.infra import InfraSchema
from MASDA.models.data.cost import CostSchema
from MASDA.models.data.security import SecuritySchema


class IntentRequest(BaseModel):
    """Raw user intent input for architecture generation."""

    intent: str = Field(
        ...,
        description="Natural language description of desired infrastructure",
        min_length=10,
        max_length=10000,
    )
    preferred_providers: Optional[List[CloudProvider]] = Field(
        None, description="Preferred cloud providers (if any)"
    )
    budget_hint_usd: Optional[float] = Field(
        None, description="Optional monthly budget hint in USD"
    )
    context: Optional[str] = Field(
        None, description="Additional context about the project or requirements"
    )


class ParsedIntent(BaseModel):
    """Parsed intent output from the Intent Parser agent."""

    schema_version: str = "v1"

    # Extracted schemas
    infra_schema: InfraSchema = Field(
        ..., description="Extracted infrastructure requirements"
    )
    cost_schema: CostSchema = Field(..., description="Extracted cost requirements")
    security_schema: SecuritySchema = Field(
        ..., description="Extracted security requirements"
    )

    # Providers to evaluate
    target_providers: List[CloudProvider] = Field(
        ..., description="Cloud providers to evaluate"
    )

    # Parsing metadata
    confidence: float = Field(
        ..., ge=0.0, le=1.0, description="Confidence in parsing accuracy"
    )
    ambiguities: List[str] = Field(
        default_factory=list, description="Identified ambiguities in the intent"
    )
    assumptions: List[str] = Field(
        default_factory=list, description="Assumptions made during parsing"
    )

    raw_intent: str = Field(..., description="Original intent for reference")
