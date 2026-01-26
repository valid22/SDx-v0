from typing import Type
import json

from MASDA.agents.base import Agent
from MASDA.models.input.intent import IntentRequest, ParsedIntent
from MASDA.llm.base import LLMProvider


class IntentParserAgent(Agent[IntentRequest, ParsedIntent]):
    """Parses natural language intent into structured schemas.

    Input: IntentRequest (natural language description)
    Output: ParsedIntent (InfraSchema, CostSchema, SecuritySchema)
    """

    def __init__(self, llm_provider: LLMProvider):
        super().__init__(llm_provider)

    @property
    def name(self) -> str:
        return "IntentParser"

    @property
    def input_type(self) -> Type[IntentRequest]:
        return IntentRequest

    @property
    def output_type(self) -> Type[ParsedIntent]:
        return ParsedIntent

    def get_system_prompt(self) -> str:
        return """You are an expert infrastructure architect and requirements analyst.
Your job is to parse natural language infrastructure requirements into structured schemas.

CRITICAL RULES:
1. Extract ALL relevant requirements from the user's intent.
2. Make reasonable assumptions for unspecified requirements, but DOCUMENT THEM.
3. Be conservative with estimates - prefer higher resource estimates over underprovisioning.
4. Consider multi-cloud by default unless user specifies a single provider.
5. Always prioritize security and compliance requirements.

WORKLOAD TYPE MAPPING:
- Web applications, frontends, SPAs → "web_app"
- REST APIs, GraphQL, microservices → "api_backend"
- ETL, data warehousing, analytics → "data_pipeline"
- Scheduled jobs, cron tasks → "batch"
- Real-time data, Kafka, event streams → "streaming"
- AI/ML model serving → "ml_inference"
- OLTP databases, high-transaction systems → "transactional"

COMMON COMPLIANCE MAPPINGS:
- PII, user data, EU → GDPR
- Healthcare, medical → HIPAA
- Payments, financial → PCI-DSS
- Government, federal → FedRAMP
- General security → SOC2

Be thorough and precise. Your output directly affects infrastructure design."""

    def build_prompt(self, input_data: IntentRequest) -> str:
        providers_hint = ""
        if input_data.preferred_providers:
            providers_hint = f"\nPreferred providers: {', '.join([p.value for p in input_data.preferred_providers])}"

        budget_hint = ""
        if input_data.budget_hint_usd:
            budget_hint = f"\nBudget hint: ${input_data.budget_hint_usd}/month"

        context_hint = ""
        if input_data.context:
            context_hint = f"\nAdditional context: {input_data.context}"

        return f"""Parse the following infrastructure intent into structured schemas:

USER INTENT:
{input_data.intent}
{providers_hint}{budget_hint}{context_hint}

Extract and return:
1. InfraSchema - workload characteristics, scale, performance, availability
2. CostSchema - budget constraints, optimization preferences
3. SecuritySchema - data sensitivity, compliance, encryption requirements

Include the raw_intent field with the original intent text.
List any ambiguities you identified and assumptions you made."""
