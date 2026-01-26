# SDx-v0
SDx - MASDA - AIaSS


# AIaSS — AI-driven Infrastructure as a Service

## Overview
AIaSS is a multi-agent, policy-governed platform that transforms user intent into a secure, cost-optimized, deployable multi-cloud infrastructure (AWS, GCP, Azure). The system uses deterministic orchestration with bounded AI optimization loops to produce an auditable, frontend-ready output including an infrastructure graph, per-node costs, security posture, and one-click deployment commands.

## Key Outcomes
- Intent → Architecture → Cost → Security → Deploy (end-to-end)
- Multi-cloud comparison and selection
- Graph-native output for rich UI visualization
- Per-node cost attribution and budget estimation
- Security-by-design with compliance mapping
- Deterministic orchestration with strict loop limits

## Architecture Summary
- **Frontend**: Graph-first UI with drill-down (infra, cost, security) and feedback.
- **API Gateway**: FastAPI endpoints for requests and streaming status.
- **Orchestrator/Moderator**: Deterministic controller governing loops and safety.
- **Agent Mesh**: Stateless AI agents (Intent, Infra, Cost, Security, Condenser).
- **State Store**: Versioned Work Orders (Postgres/Redis).
- **Artifact Store**: IaC bundles, graphs, decision logs (S3/GCS/Azure Blob).
- **Execution**: Terraform/OpenTofu, optional Kubernetes/Helm.

## Build Principles
1. LLMs never control flow.
2. All inter-agent communication uses typed schemas.
3. Loops are bounded and auditable.
4. Outputs are UI-first and explainable.
5. Provider-agnostic by default.

## Repository Structure
```
aiass/
├─ api/
│  ├─ main.py
│  ├─ routes/
│  └─ deps.py
├─ orchestrator/
│  ├─ moderator.py
│  ├─ convergence.py
│  └─ policies.py
├─ agents/
│  ├─ intent_parser.py
│  ├─ infra_agent.py
│  ├─ cost_agent.py
│  ├─ security_agent.py
│  └─ condenser.py
├─ schemas/
│  ├─ intent.py
│  ├─ infra_input.py
│  ├─ cost_input.py
│  ├─ security_input.py
│  ├─ infra_output.py
│  ├─ cost_output.py
│  └─ security_output.py
├─ state/
│  ├─ work_order.py
│  └─ repository.py
├─ iac/
│  ├─ terraform/
│  └─ mapping.py
├─ frontend/
│  └─ (React app)
├─ prompts/
│  └─ agent_prompts.md
└─ README.md
```

## Core Data Model
### WorkOrder
A versioned object persisted after each step:
- infra_schema, cost_schema, security_schema
- infra_candidates (per provider)
- cost_outputs, security_outputs
- final_output
- loop counters and status

## Execution Flow
1. User submits intent.
2. Intent Parser emits Infra/Cost/Security schemas.
3. Infra ↔ Cost loop runs per provider (bounded).
4. Moderator selects best candidate.
5. Security validation (optional bounded re-loop).
6. Condenser emits FinalArchitectureOutput.
7. Frontend renders graph, costs, security.
8. Optional IaC generation and deployment.

## Loop Governance
- User-configurable max iterations.
- Stop on convergence, infeasibility, or risk.
- Full decision logs retained.

## Agent Contracts
- **Intent Parser**: NL → typed schemas.
- **Infra Agent**: schemas → provider-specific infra graph.
- **Cost Agent**: infra → BOM, estimates, optimization feedback.
- **Security Agent**: infra → compliance validation and remediations.
- **Condenser**: merges final outputs for UI.

## Validation & Safety
- Pydantic validation after every agent.
- Token limits and retries.
- Schema version pinning.
- Explainability fields required.

## Frontend UX
- Graph-first with clickable nodes.
- Per-node infra/cost/security tabs.
- Budget and sensitivity views.
- User feedback routed back to agents (single bounded rerun).

## Deployment
- Terraform/OpenTofu generation.
- Optional Kubernetes/Helm.
- Commands:
```
aiass login
aiass plan
aiass deploy
aiass destroy
```

## Roadmap
- Live telemetry overlays.
- Carbon-aware optimization.
- Portfolio-level views.
- DR simulation.

## License
Apache-2.0
