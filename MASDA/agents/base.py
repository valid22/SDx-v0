from abc import ABC, abstractmethod
from typing import Type, TypeVar, Generic, Optional
from pydantic import BaseModel

from MASDA.llm.base import LLMProvider

InputT = TypeVar("InputT", bound=BaseModel)
OutputT = TypeVar("OutputT", bound=BaseModel)


class Agent(ABC, Generic[InputT, OutputT]):
    """Abstract base class for all MASDA agents.

    All agents are stateless and follow the pattern:
    - Input: Typed Pydantic schema
    - Output: Typed Pydantic schema
    - No side effects, no flow control

    The Orchestrator/Moderator controls execution order.
    """

    def __init__(self, llm_provider: LLMProvider):
        """Initialize agent with an LLM provider.

        Args:
            llm_provider: The LLM provider to use for generation.
        """
        self._llm = llm_provider

    @property
    @abstractmethod
    def name(self) -> str:
        """Return the agent name for logging."""
        pass

    @property
    @abstractmethod
    def input_type(self) -> Type[InputT]:
        """Return the expected input type."""
        pass

    @property
    @abstractmethod
    def output_type(self) -> Type[OutputT]:
        """Return the output type."""
        pass

    @abstractmethod
    def get_system_prompt(self) -> str:
        """Return the system prompt for this agent."""
        pass

    @abstractmethod
    def build_prompt(self, input_data: InputT) -> str:
        """Build the user prompt from input data.

        Args:
            input_data: Validated input data.

        Returns:
            The user prompt string.
        """
        pass

    async def execute(
        self,
        input_data: InputT,
        temperature: float = 0.1,
        max_tokens: int = 8192,
    ) -> OutputT:
        """Execute the agent with validated input.

        Args:
            input_data: The input data (must match input_type).
            temperature: LLM sampling temperature.
            max_tokens: Maximum tokens for response.

        Returns:
            Validated output matching output_type.

        Raises:
            ValidationError: If output doesn't match schema.
        """
        # Build the prompt
        prompt = self.build_prompt(input_data)

        # Get structured response from LLM
        result = await self._llm.generate_structured(
            prompt=prompt,
            response_model=self.output_type,
            system_prompt=self.get_system_prompt(),
            temperature=temperature,
            max_tokens=max_tokens,
        )

        return result

    def validate_input(self, input_data: InputT) -> InputT:
        """Validate that input matches expected type.

        Args:
            input_data: Input to validate.

        Returns:
            Validated input.

        Raises:
            ValidationError: If input doesn't match schema.
        """
        return self.input_type.model_validate(input_data.model_dump())

    def validate_output(self, output_data: OutputT) -> OutputT:
        """Validate that output matches expected type.

        Args:
            output_data: Output to validate.

        Returns:
            Validated output.

        Raises:
            ValidationError: If output doesn't match schema.
        """
        return self.output_type.model_validate(output_data.model_dump())
