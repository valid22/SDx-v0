from abc import ABC, abstractmethod
from typing import Optional, List, Dict
from datetime import datetime

from MASDA.models.state.work_order import WorkOrder, WorkOrderStatus


class StateRepository(ABC):
    """Abstract base class for state persistence."""

    @abstractmethod
    async def save(self, work_order: WorkOrder) -> None:
        """Save or update a work order.

        Args:
            work_order: Work order to save.
        """
        pass

    @abstractmethod
    async def get(self, work_order_id: str) -> Optional[WorkOrder]:
        """Get a work order by ID.

        Args:
            work_order_id: Work order ID.

        Returns:
            Work order if found, None otherwise.
        """
        pass

    @abstractmethod
    async def list_by_status(
        self,
        status: Optional[WorkOrderStatus] = None,
        limit: int = 100,
    ) -> List[WorkOrder]:
        """List work orders by status.

        Args:
            status: Filter by status. None returns all.
            limit: Maximum number to return.

        Returns:
            List of work orders.
        """
        pass

    @abstractmethod
    async def delete(self, work_order_id: str) -> bool:
        """Delete a work order.

        Args:
            work_order_id: Work order ID.

        Returns:
            True if deleted, False if not found.
        """
        pass


class InMemoryStateRepository(StateRepository):
    """In-memory state repository for development/serverless.

    Note: State is lost on process restart. For production,
    use Redis or Postgres implementations.
    """

    def __init__(self):
        self._store: Dict[str, WorkOrder] = {}

    async def save(self, work_order: WorkOrder) -> None:
        """Save or update a work order."""
        work_order.updated_at = datetime.utcnow()
        self._store[work_order.id] = work_order

    async def get(self, work_order_id: str) -> Optional[WorkOrder]:
        """Get a work order by ID."""
        return self._store.get(work_order_id)

    async def list_by_status(
        self,
        status: Optional[WorkOrderStatus] = None,
        limit: int = 100,
    ) -> List[WorkOrder]:
        """List work orders by status."""
        work_orders = list(self._store.values())

        if status is not None:
            work_orders = [wo for wo in work_orders if wo.status == status]

        # Sort by created_at descending
        work_orders.sort(key=lambda wo: wo.created_at, reverse=True)

        return work_orders[:limit]

    async def delete(self, work_order_id: str) -> bool:
        """Delete a work order."""
        if work_order_id in self._store:
            del self._store[work_order_id]
            return True
        return False

    def clear(self) -> None:
        """Clear all work orders (for testing)."""
        self._store.clear()
