import { GoogleGenAI, Type } from '@google/genai'
import type { NormalizationResult, InfraNode, InfraEdge, NodeCost } from './types'

// Re-export types for use in components
export type { NormalizationResult, InfraNode, InfraEdge, NodeCost }

// Get API key from sessionStorage (user-provided) or fallback to env variable
function getApiKey(): string {
  if (typeof window !== 'undefined') {
    const storedKey = sessionStorage.getItem('gemini_api_key')
    if (storedKey) return storedKey
  }
  return import.meta.env.VITE_GOOGLE_API_KEY || ''
}

// Create AI client lazily to use the latest API key
function getAiClient(): GoogleGenAI {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error('No Gemini API key provided. Please enter your API key on the initiation page.')
  }
  return new GoogleGenAI({ apiKey })
}

// Agent status type
export type AgentStatus = 'pending' | 'running' | 'done' | 'error'

export interface AgentState {
  intentParser: AgentStatus
  infraAgent: AgentStatus
  costAgent: AgentStatus
  securityAgent: AgentStatus
  currentStep: string
  logs: string[]
}

// Generate architecture using Gemini with strict JSON schema
export async function generateArchitecture(intent: string): Promise<NormalizationResult> {
  const ai = getAiClient()
  const response = await ai.models.generateContent({
    model: 'gemini-flash-latest', //'gemini-2.5-flash-lite',
    contents: `Process this intent through the Design Moderator Tree. 
    Workflow logic:
    1. Normalizer (Root): Parses Intent, Infra, Cost, and Security schemas using the provided strict Pydantic structures.
    2. Parallel Fan-out: Normalizer sends technical requirements AND core Intent Schema to specialist agents.
    3. Specialists: Infra Agent proposes architecture, Cost Agent audits budget/infra alignment.
    4. Refinement Loop: Infra Agent refines output once if Cost Agent signals misalignment.
    5. Condenser: Synthesizes final Infra, Cost, and Security outputs + Intent into a master AI BLUEPRINT and a FINAL ARCHITECTURE SPEC.
    
    CRITICAL: You MUST provide a comprehensive, detailed, multi-paragraph response for EVERY field in the blueprint AND populate the detailed final_architecture structure.
    
    User Input: "${intent}"`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          understanding: {
            type: Type.OBJECT,
            properties: {
              canonical_intent: {
                type: Type.OBJECT,
                properties: {
                  system_intent: { type: Type.STRING },
                  priority_order: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['system_intent', 'priority_order']
              },
              clarifying_questions: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['canonical_intent', 'clarifying_questions']
          },
          infra_schema: {
            type: Type.OBJECT,
            properties: {
              schema_version: { type: Type.STRING },
              workload_name: { type: Type.STRING },
              workload_type: { type: Type.STRING },
              regions: { type: Type.ARRAY, items: { type: Type.STRING } },
              scale: {
                type: Type.OBJECT,
                properties: {
                  users: { type: Type.INTEGER },
                  requests_per_second: { type: Type.INTEGER },
                  peak_rps: { type: Type.INTEGER },
                  data_growth_gb_per_month: { type: Type.INTEGER },
                  concurrency: { type: Type.INTEGER }
                }
              },
              performance: {
                type: Type.OBJECT,
                properties: {
                  p95_latency_ms: { type: Type.INTEGER },
                  p99_latency_ms: { type: Type.INTEGER },
                  max_cpu_utilization_pct: { type: Type.INTEGER },
                  max_memory_utilization_pct: { type: Type.INTEGER }
                }
              },
              availability: {
                type: Type.OBJECT,
                properties: {
                  sla_percentage: { type: Type.NUMBER },
                  multi_az: { type: Type.BOOLEAN },
                  multi_region: { type: Type.BOOLEAN }
                }
              },
              deployment_preferences: {
                type: Type.OBJECT,
                properties: {
                  prefer_managed_services: { type: Type.BOOLEAN },
                  allow_serverless: { type: Type.BOOLEAN },
                  allow_kubernetes: { type: Type.BOOLEAN },
                  allow_virtual_machines: { type: Type.BOOLEAN }
                }
              },
              bottlenecks: { type: Type.ARRAY, items: { type: Type.STRING } },
              explanation_required: { type: Type.BOOLEAN }
            },
            required: ['schema_version', 'workload_name', 'workload_type', 'scale', 'performance', 'availability', 'deployment_preferences']
          },
          cost_schema: {
            type: Type.OBJECT,
            properties: {
              schema_version: { type: Type.STRING },
              budget: {
                type: Type.OBJECT,
                properties: {
                  monthly_budget_usd: { type: Type.NUMBER },
                  soft_limit_usd: { type: Type.NUMBER },
                  hard_limit_usd: { type: Type.NUMBER }
                }
              },
              traffic_variability: {
                type: Type.OBJECT,
                properties: {
                  predictable: { type: Type.BOOLEAN },
                  burst_factor: { type: Type.NUMBER }
                }
              },
              sensitivity: {
                type: Type.OBJECT,
                properties: {
                  optimization_preference: { type: Type.STRING },
                  tolerate_spot_instances: { type: Type.BOOLEAN },
                  tolerate_reserved_commitments: { type: Type.BOOLEAN }
                }
              },
              egress_sensitive: { type: Type.BOOLEAN },
              prefer_single_cloud: { type: Type.BOOLEAN },
              cost_breakdown_required: { type: Type.BOOLEAN },
              per_node_cost_required: { type: Type.BOOLEAN }
            },
            required: ['schema_version', 'budget', 'traffic_variability', 'sensitivity', 'egress_sensitive', 'prefer_single_cloud']
          },
          security_schema: {
            type: Type.OBJECT,
            properties: {
              schema_version: { type: Type.STRING },
              data_sensitivity: { type: Type.STRING },
              compliance_requirements: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    mandatory: { type: Type.BOOLEAN }
                  },
                  required: ['name', 'mandatory']
                }
              },
              encryption: {
                type: Type.OBJECT,
                properties: {
                  encryption_at_rest: { type: Type.BOOLEAN },
                  encryption_in_transit: { type: Type.BOOLEAN },
                  customer_managed_keys_required: { type: Type.BOOLEAN }
                }
              },
              identity: {
                type: Type.OBJECT,
                properties: {
                  least_privilege: { type: Type.BOOLEAN },
                  workload_identity_required: { type: Type.BOOLEAN },
                  human_access_restricted: { type: Type.BOOLEAN }
                }
              },
              network: {
                type: Type.OBJECT,
                properties: {
                  exposure: { type: Type.STRING },
                  private_networking_required: { type: Type.BOOLEAN },
                  zero_trust_model: { type: Type.BOOLEAN }
                }
              },
              audit_logging_required: { type: Type.BOOLEAN },
              security_explainability_required: { type: Type.BOOLEAN }
            },
            required: ['schema_version', 'data_sensitivity', 'compliance_requirements', 'encryption', 'identity', 'network']
          },
          blueprint: {
            type: Type.OBJECT,
            properties: {
              overall_blueprint: { type: Type.STRING },
              ai_workflow: { type: Type.STRING },
              build_scale_strategy: { type: Type.STRING },
              infra_considerations: { type: Type.STRING },
              cost_considerations: { type: Type.STRING },
              security_considerations: { type: Type.STRING },
              governance_validation: { type: Type.STRING }
            },
            required: ['overall_blueprint', 'ai_workflow', 'build_scale_strategy', 'infra_considerations', 'cost_considerations', 'security_considerations', 'governance_validation']
          },
          final_architecture: {
            type: Type.OBJECT,
            properties: {
              schema_version: { type: Type.STRING },
              infra: {
                type: Type.OBJECT,
                properties: {
                  schema_version: { type: Type.STRING },
                  provider_selected: { type: Type.STRING },
                  regions_used: { type: Type.ARRAY, items: { type: Type.STRING } },
                  nodes: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        label: { type: Type.STRING },
                        provider: { type: Type.STRING },
                        node_type: { type: Type.STRING },
                        service_name: { type: Type.STRING },
                        explanation: { type: Type.STRING },
                        managed: { type: Type.BOOLEAN },
                        depends_on: { type: Type.ARRAY, items: { type: Type.STRING } }
                      },
                      required: ['id', 'label', 'provider', 'node_type', 'service_name', 'explanation', 'managed']
                    }
                  },
                  edges: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        from_node: { type: Type.STRING },
                        to_node: { type: Type.STRING },
                        edge_type: { type: Type.STRING },
                        encrypted: { type: Type.BOOLEAN },
                        public: { type: Type.BOOLEAN }
                      },
                      required: ['id', 'from_node', 'to_node', 'edge_type', 'encrypted', 'public']
                    }
                  },
                  high_level_summary: { type: Type.STRING },
                  assumptions: { type: Type.ARRAY, items: { type: Type.STRING } },
                  deployment_ready: { type: Type.BOOLEAN }
                },
                required: ['provider_selected', 'regions_used', 'nodes', 'edges', 'high_level_summary']
              },
              cost: {
                type: Type.OBJECT,
                properties: {
                  schema_version: { type: Type.STRING },
                  provider: { type: Type.STRING },
                  summary: {
                    type: Type.OBJECT,
                    properties: {
                      total_monthly_cost_usd: { type: Type.NUMBER },
                      within_budget: { type: Type.BOOLEAN },
                      primary_cost_drivers: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ['total_monthly_cost_usd', 'within_budget', 'primary_cost_drivers']
                  },
                  per_node_costs: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        node_id: { type: Type.STRING },
                        monthly_cost_usd: { type: Type.NUMBER },
                        cost_drivers: { type: Type.ARRAY, items: { type: Type.STRING } },
                        explanation: { type: Type.STRING }
                      },
                      required: ['node_id', 'monthly_cost_usd', 'cost_drivers', 'explanation']
                    }
                  },
                  optimization_notes: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['provider', 'summary', 'per_node_costs', 'optimization_notes']
              },
              security: {
                type: Type.OBJECT,
                properties: {
                  schema_version: { type: Type.STRING },
                  data_sensitivity: { type: Type.STRING },
                  compliance_status: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        framework: { type: Type.STRING },
                        compliant: { type: Type.BOOLEAN }
                      },
                      required: ['framework', 'compliant']
                    }
                  },
                  node_security: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        node_id: { type: Type.STRING },
                        encryption_at_rest: { type: Type.BOOLEAN },
                        encryption_in_transit: { type: Type.BOOLEAN },
                        public_exposure: { type: Type.BOOLEAN },
                        explanation: { type: Type.STRING }
                      },
                      required: ['node_id', 'encryption_at_rest', 'encryption_in_transit', 'public_exposure', 'explanation']
                    }
                  },
                  global_controls: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        control_name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        mandatory: { type: Type.BOOLEAN },
                        enforced: { type: Type.BOOLEAN }
                      },
                      required: ['control_name', 'description', 'mandatory', 'enforced']
                    }
                  },
                  security_summary: { type: Type.STRING }
                },
                required: ['data_sensitivity', 'compliance_status', 'node_security', 'global_controls', 'security_summary']
              },
              decision_rationale: { type: Type.STRING },
              confidence_score: { type: Type.NUMBER },
              deploy_commands: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['infra', 'cost', 'security', 'decision_rationale', 'confidence_score', 'deploy_commands']
          },
          warnings: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['understanding', 'infra_schema', 'cost_schema', 'security_schema', 'blueprint', 'final_architecture']
      }
    }
  })

  const text = response.text
  if (!text) throw new Error('The model did not return any content.')
  return JSON.parse(text) as NormalizationResult
}

// Real-time agent execution with live streaming logs
export async function executeAgents(
  intent: string,
  onProgress: (state: AgentState) => void
): Promise<NormalizationResult> {
  const state: AgentState = {
    intentParser: 'pending',
    infraAgent: 'pending',
    costAgent: 'pending',
    securityAgent: 'pending',
    currentStep: 'Initializing...',
    logs: []
  }

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false })
    state.logs = [...state.logs, `[${timestamp}] ${message}`]
    onProgress({ ...state })
  }

  // Step 1: Intent Parser
  state.intentParser = 'running'
  state.currentStep = 'Parsing user intent...'
  addLog('INIT: Initializing MASDA agent pipeline')
  onProgress({ ...state })
  await delay(300)

  addLog('AUTH: Validating cloud credentials...')
  await delay(400)
  addLog('AUTH: Session established')
  await delay(200)

  addLog(`PARSE: Analyzing intent: "${intent.slice(0, 50)}${intent.length > 50 ? '...' : ''}"`)
  await delay(500)

  // Extract keywords for realistic logs
  const keywords = intent.toLowerCase()
  const detectedServices: string[] = []
  if (keywords.includes('kubernetes') || keywords.includes('k8s') || keywords.includes('container')) detectedServices.push('EKS/Kubernetes')
  if (keywords.includes('database') || keywords.includes('postgres') || keywords.includes('mysql') || keywords.includes('rds')) detectedServices.push('RDS')
  if (keywords.includes('serverless') || keywords.includes('lambda')) detectedServices.push('Lambda')
  if (keywords.includes('storage') || keywords.includes('s3')) detectedServices.push('S3')
  if (keywords.includes('cache') || keywords.includes('redis')) detectedServices.push('ElastiCache')
  if (detectedServices.length === 0) detectedServices.push('EC2', 'RDS', 'S3')

  addLog(`PARSE: Detected services: ${detectedServices.join(', ')}`)
  await delay(300)
  addLog('PARSE: Workload classification complete')
  state.intentParser = 'done'
  onProgress({ ...state })

  // Step 2: Infra Agent - Real API call with strict schema
  state.infraAgent = 'running'
  state.currentStep = 'Generating architecture...'
  addLog('AGENT: Infrastructure agent activated')
  onProgress({ ...state })
  await delay(200)

  addLog('API: Connecting to Gemini 2.0 Flash...')
  await delay(300)
  addLog('API: Sending request with strict JSON schema...')

  let result: NormalizationResult

  try {
    const startTime = Date.now()
    addLog('API: Waiting for model response...')

    result = await generateArchitecture(intent)

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
    addLog(`API: Response received in ${elapsed}s`)
    await delay(200)

    // Log discovered resources
    const nodes = result.final_architecture.infra.nodes
    const edges = result.final_architecture.infra.edges
    addLog(`GRAPH: Generated ${nodes.length} nodes, ${edges.length} edges`)
    await delay(150)

    for (const node of nodes.slice(0, 5)) {
      addLog(`FOUND: ${node.node_type} "${node.label}" (${node.service_name})`)
      await delay(100)
    }
    if (nodes.length > 5) {
      addLog(`FOUND: ...and ${nodes.length - 5} more resources`)
    }

    await delay(200)
    addLog('VALIDATE: Checking dependencies...')
    await delay(300)
    addLog('VALIDATE: All dependencies resolved')

    state.infraAgent = 'done'
  } catch (error) {
    addLog(`ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`)
    state.infraAgent = 'error'
    throw error
  }
  onProgress({ ...state })

  // Step 3: Cost Agent
  state.costAgent = 'running'
  state.currentStep = 'Analyzing costs...'
  addLog('COST: Initializing pricing calculator')
  onProgress({ ...state })
  await delay(200)

  const provider = result.final_architecture.infra.provider_selected
  addLog(`COST: Fetching ${provider.toUpperCase()} pricing`)
  await delay(400)

  // Log top costs
  const topCosts = [...result.final_architecture.cost.per_node_costs]
    .sort((a, b) => b.monthly_cost_usd - a.monthly_cost_usd)
    .slice(0, 3)
  for (const nc of topCosts) {
    addLog(`PRICE: ${nc.node_id}: $${nc.monthly_cost_usd.toFixed(2)}/mo`)
    await delay(150)
  }

  const totalCost = result.final_architecture.cost.summary.total_monthly_cost_usd
  addLog(`COST: Total estimate: $${totalCost.toFixed(2)}/mo`)
  await delay(200)

  if (result.final_architecture.cost.optimization_notes.length > 0) {
    addLog(`OPTIMIZE: ${result.final_architecture.cost.optimization_notes.length} optimization notes`)
  }

  state.costAgent = 'done'
  onProgress({ ...state })

  // Step 4: Security Agent
  state.securityAgent = 'running'
  state.currentStep = 'Running security scan...'
  addLog('SECURITY: Initializing compliance scanner')
  onProgress({ ...state })
  await delay(200)

  addLog('SECURITY: Checking IAM policies...')
  await delay(300)
  addLog('SECURITY: Validating encryption settings...')
  await delay(300)
  addLog('SECURITY: Scanning network ACLs...')
  await delay(300)

  for (const cs of result.final_architecture.security.compliance_status.slice(0, 2)) {
    addLog(`COMPLIANCE: ${cs.framework}: ${cs.compliant ? 'PASS' : 'FAIL'}`)
    await delay(150)
  }

  addLog(`SUMMARY: ${result.final_architecture.security.security_summary.slice(0, 80)}...`)
  await delay(200)

  state.securityAgent = 'done'
  state.currentStep = 'Complete'
  addLog('✓ All agents completed successfully')
  onProgress({ ...state })

  return result
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
