from typing import Optional
from pydantic import BaseModel, Field


class PolicySettings(BaseModel):
    """Policy settings for the orchestrator."""

    max_iterations: int = Field(
        default=3, ge=1, le=10, description="Maximum optimization iterations per provider"
    )
    cost_tolerance_percentage: float = Field(
        default=10.0, ge=0.0, le=100.0, description="Acceptable cost overrun percentage"
    )
    security_strict_mode: bool = Field(
        default=True, description="Fail on any security non-compliance"
    )
    enable_multi_cloud: bool = Field(
        default=True, description="Evaluate multiple cloud providers"
    )
    require_cost_optimization: bool = Field(
        default=True, description="Run cost optimization loop"
    )
    require_security_validation: bool = Field(
        default=True, description="Run security validation"
    )
    fallback_on_failure: bool = Field(
        default=True, description="Allow fallback to simpler architecture on failure"
    )


class PolicyEngine:
    """Enforces policies during orchestration."""

    def __init__(self, settings: Optional[PolicySettings] = None):
        """Initialize policy engine.

        Args:
            settings: Policy settings. Uses defaults if not provided.
        """
        self.settings = settings or PolicySettings()

    def should_continue_optimization(
        self,
        iteration: int,
        within_budget: bool,
        requires_changes: bool,
    ) -> bool:
        """Determine if optimization loop should continue.

        Args:
            iteration: Current iteration number.
            within_budget: Whether current estimate is within budget.
            requires_changes: Whether changes are required.

        Returns:
            True if optimization should continue.
        """
        if iteration >= self.settings.max_iterations:
            return False

        if within_budget and not requires_changes:
            return False

        return True

    def should_fail_on_security(
        self,
        compliance_met: bool,
        critical_remediations: int,
    ) -> bool:
        """Determine if orchestration should fail on security issues.

        Args:
            compliance_met: Whether compliance requirements are met.
            critical_remediations: Number of critical remediations required.

        Returns:
            True if should fail.
        """
        if self.settings.security_strict_mode:
            return not compliance_met or critical_remediations > 0
        return critical_remediations > 0

    def should_evaluate_provider(self, provider: str) -> bool:
        """Determine if a provider should be evaluated.

        Args:
            provider: Cloud provider name.

        Returns:
            True if provider should be evaluated.
        """
        return self.settings.enable_multi_cloud

    def is_cost_acceptable(
        self,
        estimated_cost: float,
        budget_limit: Optional[float],
    ) -> bool:
        """Determine if cost is acceptable.

        Args:
            estimated_cost: Estimated monthly cost.
            budget_limit: Budget limit (if any).

        Returns:
            True if cost is acceptable.
        """
        if budget_limit is None:
            return True

        tolerance = budget_limit * (1 + self.settings.cost_tolerance_percentage / 100)
        return estimated_cost <= tolerance
