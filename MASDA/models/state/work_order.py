from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field
import uuid

from MASDA.constants import CloudProvider
from MASDA.models.input.intent import ParsedIntent
from MASDA.models.output.infraedge import InfraGraphOutput
from MASDA.models.output.nodecost import CostOutput
from MASDA.models.output.security import SecurityOutput, FinalArchitectureOutput


class WorkOrderStatus(str, Enum):
    """Status of the work order lifecycle."""

    pending = "pending"
    parsing_intent = "parsing_intent"
    generating_infra = "generating_infra"
    analyzing_cost = "analyzing_cost"
    analyzing_security = "analyzing_security"
    optimizing = "optimizing"
    condensing = "condensing"
    completed = "completed"
    failed = "failed"


class ProviderCandidate(BaseModel):
    """Infrastructure candidate for a specific provider."""

    provider: CloudProvider
    infra_graph: Optional[InfraGraphOutput] = None
    cost_output: Optional[CostOutput] = None
    security_output: Optional[SecurityOutput] = None
    iteration_count: int = 0
    is_selected: bool = False


class DecisionLogEntry(BaseModel):
    """A decision log entry for auditability."""

    timestamp: datetime = Field(default_factory=datetime.utcnow)
    step: str = Field(..., description="Pipeline step name")
    decision: str = Field(..., description="Decision made")
    reasoning: str = Field(..., description="Reasoning behind the decision")
    data: Optional[Dict[str, Any]] = None


class WorkOrder(BaseModel):
    """Versioned work order persisted after each pipeline step."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    version: int = Field(default=1, description="Version number for optimistic locking")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Current status
    status: WorkOrderStatus = WorkOrderStatus.pending
    error_message: Optional[str] = None

    # Original input
    raw_intent: str = Field(..., description="Original user intent")

    # Parsed schemas
    parsed_intent: Optional[ParsedIntent] = None

    # Provider candidates (multi-cloud evaluation)
    candidates: Dict[str, ProviderCandidate] = Field(default_factory=dict)

    # Final output
    final_output: Optional[FinalArchitectureOutput] = None
    selected_provider: Optional[CloudProvider] = None

    # Loop governance
    max_iterations: int = Field(default=3, description="Maximum optimization iterations")
    current_iteration: int = 0
    converged: bool = False

    # Decision log
    decision_log: List[DecisionLogEntry] = Field(default_factory=list)

    # Policy settings
    policy_settings: Dict[str, Any] = Field(default_factory=dict)

    def add_decision(self, step: str, decision: str, reasoning: str, data: Optional[Dict[str, Any]] = None) -> None:
        """Add a decision to the log."""
        self.decision_log.append(
            DecisionLogEntry(step=step, decision=decision, reasoning=reasoning, data=data)
        )
        self.updated_at = datetime.utcnow()
        self.version += 1

    def update_status(self, status: WorkOrderStatus, error: Optional[str] = None) -> None:
        """Update the work order status."""
        self.status = status
        if error:
            self.error_message = error
        self.updated_at = datetime.utcnow()
        self.version += 1
