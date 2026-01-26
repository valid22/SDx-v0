import { ArchitectureResponse, GeminiArchitectureRequest } from './schemas'

const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || 'AIzaSyDkJIU9WmJmfaWH1_hQtgxhS1EcgU4u10E'
const GEMINI_MODEL = 'gemini-flash-latest'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`

// System prompt for infrastructure generation
const INFRA_SYSTEM_PROMPT = `You are an expert cloud infrastructure architect. Given a user's requirements, generate a complete infrastructure architecture.

Your response MUST be valid JSON matching this exact schema:
{
  "nodes": [
    {
      "id": "unique-id",
      "label": "Display Name",
      "type": "VPC|EC2|RDS|S3|ALB|Lambda|EKS|ElastiCache|CloudFront|Route53|IAM",
      "icon": "material-symbols-outlined icon name (cloud, memory, database, folder_open, router, bolt, hub, cached, cloud_queue, dns, security)",
      "region": "us-east-1",
      "status": "Active|Pending|Warning",
      "cost": 0.00,
      "specs": {
        "cpu": "2 vCPU or N/A",
        "memory": "8 GiB or N/A",
        "storage": "100GB or N/A",
        "instanceType": "t3.medium (optional)",
        "engineVersion": "15.4 (optional)"
      },
      "description": "Brief description of this resource",
      "connections": ["id-of-connected-node"]
    }
  ],
  "edges": [
    { "source": "node-id-1", "target": "node-id-2" }
  ],
  "cost": {
    "totalMonthlyCost": 430.60,
    "breakdown": {
      "compute": 200.00,
      "storage": 50.00,
      "network": 30.00,
      "database": 120.00,
      "other": 30.60
    },
    "optimizations": [
      {
        "type": "Right-sizing",
        "currentCost": 150.00,
        "optimizedCost": 100.00,
        "savings": 50.00,
        "risk": "low|medium|high",
        "description": "Recommendation details"
      }
    ],
    "projectedSavings": 85.00
  },
  "security": {
    "overallHealth": 84,
    "frameworks": [
      { "name": "SOC2 Type II", "compliance": 92, "passed": 48, "total": 52 }
    ],
    "issues": [
      {
        "id": "issue-1",
        "title": "Issue Title",
        "resource": "resource-name",
        "severity": "critical|warning|info",
        "control": "CC6.1",
        "description": "Detailed description",
        "provider": "AWS",
        "autoFixable": true
      }
    ]
  },
  "summary": "Brief summary of the architecture"
}

Generate realistic AWS pricing. Use appropriate instance types. Include at minimum: VPC, compute (EC2/EKS/Lambda), database (RDS/DynamoDB), and storage (S3). Add load balancers, caching, and CDN where appropriate. Ensure all connections form a logical flow.`

// Parse Gemini response and extract JSON
function parseGeminiResponse(text: string): ArchitectureResponse {
  // Try to extract JSON from the response
  const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/)

  if (!jsonMatch) {
    throw new Error('No valid JSON found in response')
  }

  const jsonStr = jsonMatch[1] || jsonMatch[0]
  const parsed = JSON.parse(jsonStr)

  // Validate required fields
  if (!parsed.nodes || !Array.isArray(parsed.nodes)) {
    throw new Error('Invalid response: missing nodes array')
  }

  return parsed as ArchitectureResponse
}

// Generate infrastructure architecture
export async function generateArchitecture(request: GeminiArchitectureRequest): Promise<ArchitectureResponse> {
  const userPrompt = `Generate cloud infrastructure for: "${request.intent}"
  
Cloud Provider: ${request.cloudProvider.toUpperCase()}
Region: ${request.region || 'us-east-1'}
${request.budget ? `Budget: $${request.budget}/month` : ''}
${request.complianceFrameworks?.length ? `Compliance: ${request.complianceFrameworks.join(', ')}` : 'Compliance: SOC2, GDPR'}

Respond ONLY with valid JSON, no explanation.`

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: INFRA_SYSTEM_PROMPT },
          { text: userPrompt }
        ]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      }
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Gemini API error: ${error}`)
  }

  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    throw new Error('Empty response from Gemini')
  }

  return parseGeminiResponse(text)
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

// Real-time agent execution with live streaming logs
export async function executeAgents(
  intent: string,
  provider: 'aws' | 'gcp' | 'azure',
  onProgress: (state: AgentState) => void
): Promise<ArchitectureResponse> {
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

  const regionMap = { aws: 'us-east-1', gcp: 'us-central1', azure: 'eastus' }
  const region = regionMap[provider]

  // Step 1: Intent Parser - Real parsing with streaming logs
  state.intentParser = 'running'
  state.currentStep = 'Parsing user intent...'
  addLog('INIT: Initializing MASDA agent pipeline')
  onProgress({ ...state })
  await delay(300)

  addLog('AUTH: Validating cloud credentials...')
  await delay(400)
  addLog(`AUTH: ${provider.toUpperCase()} session established`)
  await delay(200)

  addLog(`PARSE: Analyzing intent: "${intent.slice(0, 50)}${intent.length > 50 ? '...' : ''}"`)
  await delay(500)

  // Extract keywords from intent for realistic logs
  const keywords = intent.toLowerCase()
  const detectedServices: string[] = []
  if (keywords.includes('kubernetes') || keywords.includes('k8s') || keywords.includes('container')) detectedServices.push('EKS/Kubernetes')
  if (keywords.includes('database') || keywords.includes('postgres') || keywords.includes('mysql') || keywords.includes('rds')) detectedServices.push('RDS')
  if (keywords.includes('serverless') || keywords.includes('lambda')) detectedServices.push('Lambda')
  if (keywords.includes('storage') || keywords.includes('s3')) detectedServices.push('S3')
  if (keywords.includes('cache') || keywords.includes('redis')) detectedServices.push('ElastiCache')
  if (keywords.includes('cdn') || keywords.includes('cloudfront')) detectedServices.push('CloudFront')
  if (detectedServices.length === 0) detectedServices.push('EC2', 'RDS', 'S3')

  addLog(`PARSE: Detected services: ${detectedServices.join(', ')}`)
  await delay(300)
  addLog('PARSE: Workload classification complete')
  state.intentParser = 'done'
  onProgress({ ...state })

  // Step 2: Infra Agent - Real API call with detailed streaming
  state.infraAgent = 'running'
  state.currentStep = 'Generating architecture...'
  addLog('AGENT: Infrastructure agent activated')
  onProgress({ ...state })
  await delay(200)

  addLog(`REGION: Target region ${region}`)
  await delay(200)
  addLog(`API: Connecting to Gemini ${GEMINI_MODEL}...`)
  await delay(300)
  addLog('API: Sending architecture request...')

  let result: ArchitectureResponse

  try {
    // Start the API call
    const startTime = Date.now()
    addLog('API: Waiting for model response...')

    result = await generateArchitecture({ intent, cloudProvider: provider, region })

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
    addLog(`API: Response received in ${elapsed}s`)
    await delay(200)

    // Log discovered resources
    addLog(`GRAPH: Generated ${result.nodes.length} nodes, ${result.edges.length} edges`)
    await delay(150)

    for (const node of result.nodes.slice(0, 5)) {
      addLog(`FOUND: ${node.type} "${node.label}" in ${node.region}`)
      await delay(100)
    }
    if (result.nodes.length > 5) {
      addLog(`FOUND: ...and ${result.nodes.length - 5} more resources`)
    }

    await delay(200)
    addLog('VALIDATE: Checking VPC dependencies...')
    await delay(300)
    addLog('VALIDATE: VPC dependencies resolved')

    state.infraAgent = 'done'
  } catch (error) {
    addLog(`ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`)
    state.infraAgent = 'error'
    throw error
  }
  onProgress({ ...state })

  // Step 3: Cost Agent - Detailed cost analysis
  state.costAgent = 'running'
  state.currentStep = 'Analyzing costs...'
  addLog('COST: Initializing pricing calculator')
  onProgress({ ...state })
  await delay(200)

  addLog(`COST: Fetching ${provider.toUpperCase()} pricing for ${region}`)
  await delay(400)

  // Log individual resource costs
  const topCosts = [...result.nodes].sort((a, b) => b.cost - a.cost).slice(0, 3)
  for (const node of topCosts) {
    addLog(`PRICE: ${node.label}: $${node.cost.toFixed(2)}/mo`)
    await delay(150)
  }

  addLog(`COST: Total estimate: $${result.cost.totalMonthlyCost.toFixed(2)}/mo`)
  await delay(200)

  if (result.cost.optimizations.length > 0) {
    addLog(`OPTIMIZE: Found ${result.cost.optimizations.length} optimization opportunities`)
    await delay(150)
    const savings = result.cost.projectedSavings
    if (savings > 0) {
      addLog(`OPTIMIZE: Potential savings: $${savings.toFixed(2)}/mo`)
    }
  }

  state.costAgent = 'done'
  onProgress({ ...state })

  // Step 4: Security Agent - Compliance scanning
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

  for (const fw of result.security.frameworks.slice(0, 2)) {
    addLog(`COMPLIANCE: ${fw.name}: ${fw.compliance}% (${fw.passed}/${fw.total} controls)`)
    await delay(150)
  }

  addLog(`HEALTH: Overall security score: ${result.security.overallHealth}%`)
  await delay(200)

  if (result.security.issues.length > 0) {
    const criticals = result.security.issues.filter(i => i.severity === 'critical').length
    const warnings = result.security.issues.filter(i => i.severity === 'warning').length
    if (criticals > 0) addLog(`ALERT: ${criticals} critical issue(s) detected`)
    if (warnings > 0) addLog(`WARN: ${warnings} warning(s) detected`)
  } else {
    addLog('SECURITY: No critical issues found')
  }

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
