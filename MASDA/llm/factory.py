import os
from typing import Optional

from MASDA.llm.base import LLMProvider


def get_llm_provider(provider: Optional[str] = None) -> LLMProvider:
    """Factory function to get an LLM provider.

    Args:
        provider: Provider name ('gemini' or 'openai'). 
                  Falls back to LLM_PROVIDER env var, then defaults to 'gemini'.

    Returns:
        LLM provider instance.

    Raises:
        ValueError: If provider is not supported.
    """
    provider_name = provider or os.environ.get("LLM_PROVIDER", "gemini")
    provider_name = provider_name.lower()

    if provider_name == "gemini":
        from MASDA.llm.gemini_adapter import GeminiAdapter
        return GeminiAdapter()
    elif provider_name == "openai":
        from MASDA.llm.openai_adapter import OpenAIAdapter
        return OpenAIAdapter()
    else:
        raise ValueError(
            f"Unsupported LLM provider: {provider_name}. "
            "Supported: 'gemini', 'openai'"
        )
