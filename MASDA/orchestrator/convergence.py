from typing import Optional, List
from MASDA.models.output.nodecost import CostOutput
from MASDA.models.output.infraedge import InfraGraphOutput


class ConvergenceChecker:
    """Detects convergence and infeasibility in optimization loops."""

    def __init__(self, tolerance_percentage: float = 5.0):
        """Initialize convergence checker.

        Args:
            tolerance_percentage: Cost change threshold for convergence.
        """
        self.tolerance = tolerance_percentage
        self._cost_history: List[float] = []

    def reset(self) -> None:
        """Reset convergence state for new work order."""
        self._cost_history = []

    def record_cost(self, cost: float) -> None:
        """Record a cost estimate for convergence tracking.

        Args:
            cost: Estimated monthly cost.
        """
        self._cost_history.append(cost)

    def is_converged(self) -> bool:
        """Check if optimization has converged.

        Convergence is detected when:
        - At least 2 iterations have run
        - Cost change is within tolerance

        Returns:
            True if converged.
        """
        if len(self._cost_history) < 2:
            return False

        prev_cost = self._cost_history[-2]
        curr_cost = self._cost_history[-1]

        if prev_cost == 0:
            return curr_cost == 0

        change_pct = abs(curr_cost - prev_cost) / prev_cost * 100
        return change_pct <= self.tolerance

    def is_infeasible(
        self,
        iteration: int,
        max_iterations: int,
        within_budget: bool,
        budget_limit: Optional[float],
        estimated_cost: Optional[float],
    ) -> bool:
        """Check if requirements are infeasible.

        Infeasibility is detected when:
        - Max iterations reached without convergence
        - Cost is significantly over budget with no improvement trend

        Args:
            iteration: Current iteration.
            max_iterations: Maximum allowed iterations.
            within_budget: Whether estimate is within budget.
            budget_limit: Budget limit if specified.
            estimated_cost: Current cost estimate.

        Returns:
            True if infeasible.
        """
        if iteration < max_iterations:
            return False

        if within_budget:
            return False

        # Check if we're making progress on cost reduction
        if len(self._cost_history) >= 2:
            # Cost is increasing or stagnant after max iterations
            if self._cost_history[-1] >= self._cost_history[-2]:
                return True

        return False

    def get_convergence_summary(self) -> dict:
        """Get summary of convergence state.

        Returns:
            Dict with convergence metrics.
        """
        return {
            "iterations": len(self._cost_history),
            "cost_history": self._cost_history,
            "is_converged": self.is_converged(),
            "latest_cost": self._cost_history[-1] if self._cost_history else None,
        }
