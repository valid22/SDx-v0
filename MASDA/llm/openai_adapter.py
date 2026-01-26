import os
import json
from typing import Type, TypeVar, Optional, Dict, Any

from pydantic import BaseModel

from MASDA.llm.base import LLMProvider, LLMResponse

T = TypeVar("T", bound=BaseModel)


class OpenAIAdapter(LLMProvider):
    """OpenAI API adapter for LLM generation."""

    def __init__(
        self,
        api_key: Optional[str] = None,
        model: str = "gpt-4o",
        base_url: Optional[str] = None,
    ):
        """Initialize OpenAI adapter.

        Args:
            api_key: OpenAI API key. Defaults to OPENAI_API_KEY env var.
            model: Model to use for generation.
            base_url: Optional custom base URL (for Azure OpenAI, etc.)
        """
        self._api_key = api_key or os.getenv("OPENAI_API_KEY")
        if not self._api_key:
            raise ValueError(
                "OpenAI API key must be provided or set in OPENAI_API_KEY env var"
            )
        self._model = model
        self._base_url = base_url or "https://api.openai.com/v1"
        self._client: Optional[Any] = None

    def _get_client(self) -> Any:
        """Lazy initialization of OpenAI client."""
        if self._client is None:
            try:
                from openai import AsyncOpenAI
            except ImportError:
                raise ImportError(
                    "openai package not installed. Run: pip install openai"
                )
            self._client = AsyncOpenAI(
                api_key=self._api_key,
                base_url=self._base_url,
            )
        return self._client

    @property
    def model_name(self) -> str:
        """Return the model name being used."""
        return self._model

    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.1,
        max_tokens: int = 4096,
    ) -> LLMResponse:
        """Generate a completion from OpenAI."""
        client = self._get_client()

        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        response = await client.chat.completions.create(
            model=self._model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )

        return LLMResponse(
            content=response.choices[0].message.content or "",
            model=response.model,
            usage={
                "prompt_tokens": response.usage.prompt_tokens,
                "completion_tokens": response.usage.completion_tokens,
                "total_tokens": response.usage.total_tokens,
            },
            raw_response=response.model_dump(),
        )

    async def generate_structured(
        self,
        prompt: str,
        response_model: Type[T],
        system_prompt: Optional[str] = None,
        temperature: float = 0.1,
        max_tokens: int = 4096,
    ) -> T:
        """Generate a structured response from OpenAI using JSON mode."""
        client = self._get_client()

        # Build the schema description for the model
        schema_json = json.dumps(response_model.model_json_schema(), indent=2)

        enhanced_system_prompt = f"""You are a precise infrastructure architect AI.
You MUST respond with valid JSON that exactly matches this schema:

{schema_json}

{system_prompt or ''}

CRITICAL: Output ONLY valid JSON. No markdown, no explanations, just the JSON object."""

        messages = [
            {"role": "system", "content": enhanced_system_prompt},
            {"role": "user", "content": prompt},
        ]

        response = await client.chat.completions.create(
            model=self._model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
            response_format={"type": "json_object"},
        )

        content = response.choices[0].message.content or "{}"

        # Parse and validate with Pydantic
        try:
            data = json.loads(content)
            return response_model.model_validate(data)
        except json.JSONDecodeError as e:
            raise ValueError(f"LLM returned invalid JSON: {e}")
