from typing import Optional
from functools import lru_cache

from MASDA.llm.base import LLMProvider
from MASDA.llm.factory import get_llm_provider
from MASDA.state.repository import StateRepository, InMemoryStateRepository
from MASDA.orchestrator.moderator import Moderator
from MASDA.orchestrator.policies import PolicySettings


# Global state repository (shared across requests in serverless)
_state_repository: Optional[StateRepository] = None
_moderator: Optional[Moderator] = None


def get_state_repository() -> StateRepository:
    """Get the shared state repository instance.

    Returns:
        State repository.
    """
    global _state_repository
    if _state_repository is None:
        _state_repository = InMemoryStateRepository()
    return _state_repository


def get_moderator() -> Moderator:
    """Get the shared moderator instance.

    Returns:
        Moderator instance.
    """
    global _moderator
    if _moderator is None:
        _moderator = Moderator()
    return _moderator


def reset_dependencies() -> None:
    """Reset all dependencies (for testing)."""
    global _state_repository, _moderator
    _state_repository = None
    _moderator = None
