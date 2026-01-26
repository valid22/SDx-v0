import os
import json
from typing import Type, TypeVar, Optional, Dict, Any

from google import genai
from google.genai import types
from pydantic import BaseModel

from MASDA.llm.base import LLMProvider, LLMResponse

T = TypeVar("T", bound=BaseModel)


class GeminiAdapter(LLMProvider):
    """Gemini AI adapter using google-genai SDK."""

    def __init__(
        self,
        api_key: Optional[str] = None,
        model: str = "gemini-flash-latest",
    ):
        """Initialize Gemini adapter.

        Args:
            api_key: Google AI API key. Falls back to GOOGLE_API_KEY env var.
            model: Model name. Default is gemini-flash-latest.
        """
        self._api_key = api_key or os.environ.get("GOOGLE_API_KEY", "")
        self._model = model
        self._client = genai.Client(api_key=self._api_key)

    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.1,
        max_tokens: int = 4096,
    ) -> LLMResponse:
        """Generate a completion from Gemini.

        Args:
            prompt: The user prompt.
            system_prompt: Optional system prompt.
            temperature: Sampling temperature.
            max_tokens: Maximum tokens to generate.

        Returns:
            LLMResponse with the generated content.
        """
        config = types.GenerateContentConfig(
            temperature=temperature,
            max_output_tokens=max_tokens,
        )

        if system_prompt:
            config.system_instruction = system_prompt

        response = await self._client.aio.models.generate_content(
            model=self._model,
            contents=prompt,
            config=config,
        )

        # Build usage dict
        usage = {}
        if hasattr(response, 'usage_metadata') and response.usage_metadata:
            usage = {
                "prompt_tokens": response.usage_metadata.prompt_token_count or 0,
                "completion_tokens": response.usage_metadata.candidates_token_count or 0,
                "total_tokens": response.usage_metadata.total_token_count or 0,
            }

        return LLMResponse(
            content=response.text or "",
            model=self._model,
            usage=usage,
        )

    async def generate_structured(
        self,
        prompt: str,
        response_model: Type[T],
        system_prompt: Optional[str] = None,
        temperature: float = 0.1,
        max_tokens: int = 4096,
    ) -> T:
        """Generate a structured response from Gemini.

        Args:
            prompt: The user prompt.
            response_model: Pydantic model to parse the response into.
            system_prompt: Optional system prompt.
            temperature: Sampling temperature.
            max_tokens: Maximum tokens to generate.

        Returns:
            Parsed Pydantic model instance.
        """
        config = types.GenerateContentConfig(
            temperature=temperature,
            max_output_tokens=max_tokens,
            response_mime_type="application/json",
            response_schema=response_model,
        )

        if system_prompt:
            config.system_instruction = system_prompt

        response = await self._client.aio.models.generate_content(
            model=self._model,
            contents=prompt,
            config=config,
        )

        # Parse JSON to Pydantic model
        try:
            data = json.loads(response.text)
            return response_model.model_validate(data)
        except (json.JSONDecodeError, Exception) as e:
            raise ValueError(f"Failed to parse Gemini response: {e}")

    @property
    def model_name(self) -> str:
        """Get model name."""
        return self._model
