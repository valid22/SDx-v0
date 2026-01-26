from typing import Optional, List
from pydantic import BaseModel, Field

from fastapi import APIRouter, HTTPException, BackgroundTasks

from MASDA.api.deps import get_state_repository, get_moderator
from MASDA.models.input.intent import IntentRequest
from MASDA.models.state.work_order import WorkOrderStatus
from MASDA.models.output.security import FinalArchitectureOutput


router = APIRouter(prefix="/api/v1", tags=["masda"])


# Response models
class IntentResponse(BaseModel):
    """Response from intent submission."""

    work_order_id: str
    status: WorkOrderStatus
    message: str


class StatusResponse(BaseModel):
    """Work order status response."""

    work_order_id: str
    status: WorkOrderStatus
    error_message: Optional[str] = None
    current_iteration: int
    decision_log: List[str] = Field(default_factory=list)


class OutputResponse(BaseModel):
    """Full output response."""

    work_order_id: str
    status: WorkOrderStatus
    final_output: Optional[FinalArchitectureOutput] = None
    error_message: Optional[str] = None


class DeployResponse(BaseModel):
    """Deployment response."""

    work_order_id: str
    deploy_commands: List[str]
    message: str


class HealthResponse(BaseModel):
    """Health check response."""

    status: str
    version: str


# Background task for async processing
async def process_intent_background(work_order_id: str, request: IntentRequest) -> None:
    """Process intent in background."""
    moderator = get_moderator()
    repo = get_state_repository()

    try:
        work_order = await moderator.process_intent(request)
        # Update with the actual work order (ID might change)
        await repo.save(work_order)
    except Exception as e:
        # Try to update the work order with error
        work_order = await repo.get(work_order_id)
        if work_order:
            work_order.update_status(WorkOrderStatus.failed, str(e))
            await repo.save(work_order)


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Health check endpoint."""
    return HealthResponse(status="healthy", version="0.1.0")


@router.post("/intent", response_model=IntentResponse)
async def submit_intent(
    request: IntentRequest,
    background_tasks: BackgroundTasks,
) -> IntentResponse:
    """Submit a user intent for architecture generation.

    This endpoint accepts a natural language description of infrastructure
    requirements and initiates the multi-agent pipeline to generate
    a complete architecture.

    The processing happens asynchronously. Use the /status endpoint
    to check progress and /output to get the final result.
    """
    from MASDA.models.state.work_order import WorkOrder

    repo = get_state_repository()

    # Create initial work order
    work_order = WorkOrder(raw_intent=request.intent)
    work_order.update_status(WorkOrderStatus.pending)
    await repo.save(work_order)

    # Process in background
    background_tasks.add_task(process_intent_background, work_order.id, request)

    return IntentResponse(
        work_order_id=work_order.id,
        status=WorkOrderStatus.pending,
        message="Intent submitted for processing. Use /status endpoint to check progress.",
    )


@router.post("/intent/sync", response_model=OutputResponse)
async def submit_intent_sync(request: IntentRequest) -> OutputResponse:
    """Submit intent and wait for completion (synchronous).

    This endpoint processes the intent synchronously and returns
    the final output. Use for smaller workloads or when immediate
    response is required.

    Warning: This may timeout for complex architectures.
    """
    moderator = get_moderator()
    repo = get_state_repository()

    work_order = await moderator.process_intent(request)
    await repo.save(work_order)

    return OutputResponse(
        work_order_id=work_order.id,
        status=work_order.status,
        final_output=work_order.final_output,
        error_message=work_order.error_message,
    )


@router.get("/status/{work_order_id}", response_model=StatusResponse)
async def get_status(work_order_id: str) -> StatusResponse:
    """Get the status of a work order.

    Returns the current processing status, iteration count,
    and decision log for transparency.
    """
    repo = get_state_repository()
    work_order = await repo.get(work_order_id)

    if not work_order:
        raise HTTPException(status_code=404, detail="Work order not found")

    return StatusResponse(
        work_order_id=work_order.id,
        status=work_order.status,
        error_message=work_order.error_message,
        current_iteration=work_order.current_iteration,
        decision_log=[f"{d.step}: {d.decision}" for d in work_order.decision_log],
    )


@router.get("/output/{work_order_id}", response_model=OutputResponse)
async def get_output(work_order_id: str) -> OutputResponse:
    """Get the final output of a completed work order.

    Returns the FinalArchitectureOutput containing:
    - Infrastructure graph (nodes and edges)
    - Cost analysis (per-node and total)
    - Security analysis (compliance and controls)
    - Deployment commands
    """
    repo = get_state_repository()
    work_order = await repo.get(work_order_id)

    if not work_order:
        raise HTTPException(status_code=404, detail="Work order not found")

    if work_order.status == WorkOrderStatus.failed:
        raise HTTPException(
            status_code=500,
            detail=work_order.error_message or "Processing failed",
        )

    if work_order.status != WorkOrderStatus.completed:
        raise HTTPException(
            status_code=202,
            detail=f"Processing in progress: {work_order.status.value}",
        )

    return OutputResponse(
        work_order_id=work_order.id,
        status=work_order.status,
        final_output=work_order.final_output,
    )


@router.post("/deploy/{work_order_id}", response_model=DeployResponse)
async def trigger_deploy(work_order_id: str) -> DeployResponse:
    """Get deployment commands for a completed work order.

    Returns the deployment commands that can be used to
    deploy the architecture to the selected cloud provider.
    """
    repo = get_state_repository()
    work_order = await repo.get(work_order_id)

    if not work_order:
        raise HTTPException(status_code=404, detail="Work order not found")

    if work_order.status != WorkOrderStatus.completed:
        raise HTTPException(
            status_code=400,
            detail="Work order not completed",
        )

    if not work_order.final_output:
        raise HTTPException(
            status_code=500,
            detail="No final output available",
        )

    return DeployResponse(
        work_order_id=work_order.id,
        deploy_commands=work_order.final_output.deploy_commands,
        message="Run these commands to deploy the architecture.",
    )


@router.get("/work-orders")
async def list_work_orders(
    status: Optional[WorkOrderStatus] = None,
    limit: int = 20,
) -> List[StatusResponse]:
    """List work orders with optional status filter."""
    repo = get_state_repository()
    work_orders = await repo.list_by_status(status=status, limit=limit)

    return [
        StatusResponse(
            work_order_id=wo.id,
            status=wo.status,
            error_message=wo.error_message,
            current_iteration=wo.current_iteration,
            decision_log=[f"{d.step}: {d.decision}" for d in wo.decision_log[-5:]],
        )
        for wo in work_orders
    ]


@router.delete("/work-orders/{work_order_id}")
async def delete_work_order(work_order_id: str) -> dict:
    """Delete a work order."""
    repo = get_state_repository()
    deleted = await repo.delete(work_order_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Work order not found")

    return {"message": "Work order deleted", "work_order_id": work_order_id}
