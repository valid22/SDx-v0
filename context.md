# MASDA on AGNTCY — Migration Context

## Objective
Refactor the existing MASDA codebase to be **AGNTCY-native**, using AGNTCY as the agent substrate while preserving MASDA’s orchestration, governance, and decision logic.

MASDA must operate **on top of AGNTCY**, not parallel to it.

---

## Definitions

### AGNTCY
AGNTCY provides:
- Agent identity (public-key based)
- Agent registry & discovery (OASF)
- Agent-to-agent messaging
- Observability / telemetry

AGNTCY does **not**:
- Define orchestration logic
- Define decision loops
- Enforce cost or security policy
- Choose or manage LLMs

---

### MASDA
MASDA provides:
- Domain-specific agents:
  - Infra Agent
  - Cost Agent
  - Security Agent
  - Loop Moderator
- Decision DAG and arbitration logic
- Cost, security, and infra governance
- Retry / escalation / termination logic

MASDA **must not** reimplement:
- Identity
- Messaging
- Discovery
- Telemetry

---

## Target Architecture

┌──────────────────────────────────────────┐
│ MASDA Control Plane │
│ - Loop Moderator (orchestration) │
│ - Policy enforcement │
│ - Decision arbitration │
└───────────────▲──────────────────────────┘
│
┌───────────────┴──────────────────────────┐
│ AGNTCY Substrate │
│ - Agent identity (pubkey-based) │
│ - Agent registry (OASF) │
│ - Messaging │
│ - Observability │
└──────────────────────────────────────────┘

---

## Required Refactor Outcomes

### 1. Agent Identity
Each MASDA agent must:
- Have a cryptographic identity (Ed25519 keypair)
- Register its **public key** with AGNTCY
- Sign outbound messages

No shared identities.

---

### 2. Agent Definitions (OASF)
Each MASDA agent must expose an **Open Agent Schema Framework (OASF)** descriptor defining:
- Agent name
- Version
- Capabilities
- Inputs / outputs

Agents to define:
- `masda.infra.agent`
- `masda.cost.agent`
- `masda.security.agent`
- `masda.loop.moderator`

---

### 3. Messaging
All inter-agent communication must:
- Go through AGNTCY messaging APIs
- Be asynchronous and stateless
- Avoid direct function calls between agents

No in-memory or direct RPC coupling.

---

### 4. Loop Moderator (Core MASDA Logic)
The Loop Moderator must:
- Be implemented as an AGNTCY agent
- Orchestrate Infra → Cost → Security agents
- Enforce policies:
  - Budget limits
  - Security hard blocks
  - Retry / escalation thresholds
- Decide:
  - Approve
  - Reject
  - Retry with constraints
  - Terminate loop

This logic remains MASDA-owned.

---

### 5. LLM Usage
- AGNTCY is LLM-agnostic
- Each MASDA agent may use:
  - OpenAI
  - Local LLM
  - Gemini
  - Or no LLM at all
- LLM calls occur **inside agent handlers only**

No LLM logic inside AGNTCY adapters.

---

### 6. Telemetry & Auditing
Each agent must emit via AGNTCY:
- Inputs
- Outputs
- Decisions
- Errors

This enables:
- Cost explainability
- Security audit trails
- Decision reconstruction

---

## Non-Goals
- Do NOT modify AGNTCY internals
- Do NOT build custom identity or messaging layers
- Do NOT centralize agent logic into one service

---

## Success Criteria
MASDA is considered successfully migrated if:
- All agents are AGNTCY-registered
- All communication uses AGNTCY messaging
- Loop Moderator fully governs agent interactions
- External AGNTCY agents can plug into MASDA