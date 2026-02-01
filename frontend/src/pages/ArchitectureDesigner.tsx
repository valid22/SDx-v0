import React, { useCallback, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    ReactFlow,
    Node,
    Edge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    BackgroundVariant,
    NodeProps,
    Handle,
    Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Icon } from '../components'
import { executeAgents, AgentState, NormalizationResult, InfraNode, NodeCost } from '../services/gemini'

// Icon mapping for node types
const nodeTypeIcons: Record<string, string> = {
    compute: 'memory',
    storage: 'folder_open',
    database: 'database',
    network: 'hub',
    security: 'security',
    observability: 'monitoring',
    messaging: 'message',
    load_balancer: 'router',
    cache: 'cached',
    serverless: 'bolt',
    other: 'widgets',
}

// Custom node component for architecture view
interface NodeDisplayData {
    infraNode: InfraNode
    cost?: NodeCost
}

const InfraNodeComponent: React.FC<NodeProps> = ({ data, selected }) => {
    const nodeData = data as unknown as NodeDisplayData
    const node = nodeData.infraNode
    const cost = nodeData.cost
    const icon = nodeTypeIcons[node.node_type] || 'widgets'

    return (
        <div
            className={`relative bg-[#161b22]/90 backdrop-blur-md border-2 ${selected ? 'border-primary ring-4 ring-primary/10' : 'border-[#30363d]'
                } rounded-xl p-4 w-52 shadow-2xl cursor-grab active:cursor-grabbing transition-all hover:border-primary/50`}
        >
            <Handle type="target" position={Position.Left} className="!bg-primary !w-2 !h-2" />
            <div className="flex items-center gap-3 mb-2">
                <div
                    className={`size-10 ${selected ? 'bg-primary' : 'bg-[#30363d]'} rounded-lg flex items-center justify-center transition-colors`}
                >
                    <Icon name={icon} className="text-white text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold uppercase tracking-tight text-white truncate">{node.label}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{node.service_name}</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-3 text-[10px] border-t border-[#30363d] pt-2">
                <span className="font-bold text-emerald-400">{node.managed ? 'Managed' : 'Self-hosted'}</span>
                <span className="text-primary font-bold">
                    {cost ? `$${cost.monthly_cost_usd.toFixed(2)}` : 'N/A'}
                </span>
            </div>
            <Handle type="source" position={Position.Right} className="!bg-primary !w-2 !h-2" />
        </div>
    )
}

const nodeTypes = { infraNode: InfraNodeComponent }

// Execution step component
interface ExecutionStepProps {
    title: string
    description: string
    status: 'done' | 'running' | 'pending' | 'error'
}

const ExecutionStep: React.FC<ExecutionStepProps> = ({ title, description, status }) => {
    const isDone = status === 'done'
    const isRunning = status === 'running'
    const isError = status === 'error'

    return (
        <div className={`relative pl-7 pb-6 border-l-2 ${isDone ? 'border-primary/30' : isError ? 'border-red-500/30' : 'border-[#30363d]'}`}>
            <div
                className={`absolute -left-[7px] top-0 size-3 rounded-sm ${isRunning
                    ? 'bg-primary animate-pulse shadow-[0_0_8px_rgba(19,109,236,0.5)]'
                    : isDone
                        ? 'bg-primary'
                        : isError
                            ? 'bg-red-500'
                            : 'bg-[#30363d]'
                    }`}
            />
            <div className={`flex flex-col ${!isRunning && !isDone && !isError ? 'opacity-40' : ''}`}>
                <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-bold uppercase tracking-tight">{title}</span>
                    <span className={`text-[10px] font-bold ${isRunning ? 'text-primary' : isDone ? 'text-emerald-400' : isError ? 'text-red-400' : 'text-slate-500'}`}>
                        {isRunning && <span className="material-symbols-outlined text-[12px] animate-spin mr-1">sync</span>}
                        {status.toUpperCase()}
                    </span>
                </div>
                <p className="text-slate-500 text-[11px]">{description}</p>
            </div>
        </div>
    )
}

// Convert API response to ReactFlow nodes
function createNodesFromResponse(result: NormalizationResult): Node[] {
    const infra = result.final_architecture.infra
    const costs = result.final_architecture.cost.per_node_costs
    const costMap = new Map(costs.map(c => [c.node_id, c]))

    return infra.nodes.map((node, index) => {
        const col = index % 3
        const row = Math.floor(index / 3)

        return {
            id: node.id,
            type: 'infraNode',
            position: {
                x: 100 + col * 280,
                y: 80 + row * 160
            },
            data: {
                infraNode: node,
                cost: costMap.get(node.id)
            } as unknown as Record<string, unknown>,
        }
    })
}

function createEdgesFromResponse(result: NormalizationResult): Edge[] {
    return result.final_architecture.infra.edges.map((edge) => ({
        id: edge.id,
        source: edge.from_node,
        target: edge.to_node,
        animated: edge.encrypted,
        style: { stroke: edge.encrypted ? '#136dec' : '#4b5563' },
    }))
}

export const ArchitectureDesigner: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const intent = (location.state as { intent?: string })?.intent || 'Secure 3-tier VPC with auto-scaling'

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
    const [selectedNode, setSelectedNode] = useState<Node | null>(null)
    const [isGenerating, setIsGenerating] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [architectureData, setArchitectureData] = useState<NormalizationResult | null>(null)

    const [agentState, setAgentState] = useState<AgentState>({
        intentParser: 'pending',
        infraAgent: 'pending',
        costAgent: 'pending',
        securityAgent: 'pending',
        currentStep: 'Initializing...',
        logs: []
    })

    // Execute agents on mount
    useEffect(() => {
        const runAgents = async () => {
            try {
                const result = await executeAgents(intent, (state) => {
                    setAgentState(state)
                })

                setArchitectureData(result)
                setNodes(createNodesFromResponse(result))
                setEdges(createEdgesFromResponse(result))
                setIsGenerating(false)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to generate architecture')
                setIsGenerating(false)
            }
        }

        runAgents()
    }, [intent, setNodes, setEdges])

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
        [setEdges]
    )

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        setSelectedNode(node)
    }, [])

    // Get selected node details
    const selectedData = selectedNode?.data as unknown as NodeDisplayData | undefined
    const selectedInfraNode = selectedData?.infraNode
    const selectedCost = selectedData?.cost

    const totalCost = architectureData?.final_architecture.cost.summary.total_monthly_cost_usd || 0
    const provider = architectureData?.final_architecture.infra.provider_selected || 'aws'

    return (
        <div className="bg-[#0a0c10] text-slate-200 overflow-hidden h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-[#30363d] px-6 py-3 bg-[#0a0c10] z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-white">
                        <div className="size-6 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-white text-lg font-bold leading-tight">MAADS</h2>
                            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Step 2: Architecture Synthesis</span>
                        </div>
                    </div>
                    <div className="h-8 w-[1px] bg-[#30363d]" />
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Status</span>
                            <span className="text-sm font-medium flex items-center gap-1.5 text-emerald-400">
                                <span className={`size-2 rounded-full ${isGenerating ? 'bg-primary animate-pulse' : error ? 'bg-red-500' : 'bg-emerald-500'}`} />
                                {isGenerating ? agentState.currentStep : error ? 'Error' : 'Optimized'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] rounded-lg border border-[#30363d]">
                        <Icon name="cloud" className="text-sm text-blue-400" />
                        <span className="text-white text-sm font-bold uppercase">{provider}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] rounded-lg border border-[#30363d]">
                        <Icon name="account_balance_wallet" className="text-sm text-slate-500" />
                        <span className="text-white text-sm font-bold">${totalCost.toFixed(2)}/mo</span>
                    </div>
                    <button
                        onClick={() => navigate('/cost', { state: { architectureData } })}
                        disabled={isGenerating}
                        className="flex items-center gap-2 rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold hover:bg-blue-600 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
                    >
                        Continue to Cost Analysis
                        <Icon name="arrow_forward" className="text-lg" />
                    </button>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - Agent Execution */}
                <aside className="w-72 bg-[#0a0c10] border-r border-[#30363d] flex flex-col shrink-0">
                    <div className="p-4 border-b border-[#30363d]">
                        <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">AI Agent Execution</h3>
                        <div className="space-y-0">
                            <ExecutionStep
                                title="Intent Parser"
                                description="Natural language processing"
                                status={agentState.intentParser}
                            />
                            <ExecutionStep
                                title="Infra Agent"
                                description="Generating architecture via Gemini"
                                status={agentState.infraAgent}
                            />
                            <ExecutionStep
                                title="Cost Agent"
                                description="Calculating resource pricing"
                                status={agentState.costAgent}
                            />
                            <ExecutionStep
                                title="Security Agent"
                                description="Compliance scan"
                                status={agentState.securityAgent}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col min-h-0 bg-[#070b10] p-4 font-mono text-[11px]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-500 uppercase text-[10px] font-bold">Live Status Stream</span>
                            <span className={`size-2 rounded-full ${isGenerating ? 'bg-primary animate-pulse' : 'bg-emerald-500'}`} />
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1 text-slate-500">
                            {agentState.logs.map((log, i) => (
                                <p key={i} className={log.includes('ERROR') ? 'text-red-400' : log.includes('✓') ? 'text-emerald-400' : ''}>
                                    <span className="text-primary">{log.split(']')[0]}]</span>
                                    {log.split(']').slice(1).join(']')}
                                </p>
                            ))}
                            {isGenerating && <p className="animate-pulse text-white">_</p>}
                        </div>
                    </div>
                </aside>

                {/* Center - Architecture Canvas */}
                <section className="flex-1 relative">
                    {isGenerating && (
                        <div className="absolute inset-0 bg-[#0a0c10]/80 backdrop-blur-sm z-20 flex items-center justify-center">
                            <div className="text-center">
                                <div className="size-16 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                <p className="text-white font-bold text-lg">{agentState.currentStep}</p>
                                <p className="text-slate-400 text-sm mt-2">AI agents are generating your infrastructure...</p>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="absolute inset-0 bg-[#0a0c10]/80 backdrop-blur-sm z-20 flex items-center justify-center">
                            <div className="text-center max-w-md p-8 bg-[#161b22] rounded-xl border border-red-500/30">
                                <Icon name="error" className="text-red-500 text-4xl mb-4" />
                                <p className="text-white font-bold text-lg mb-2">Generation Failed</p>
                                <p className="text-slate-400 text-sm mb-4">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-2 bg-primary text-white rounded-lg font-bold"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    )}
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        nodeTypes={nodeTypes}
                        fitView
                        className="bg-[#0a0c10]"
                    >
                        <Background variant={BackgroundVariant.Dots} gap={32} size={1} color="#1a1a1a" />
                        <Controls className="!bg-[#161b22] !border-[#30363d] !rounded-lg" />
                    </ReactFlow>
                </section>

                {/* Right Sidebar - Node Details */}
                <aside className="w-[380px] bg-[#0a0c10] border-l border-[#30363d] flex flex-col shrink-0 overflow-hidden">
                    <div className="flex border-b border-[#30363d] px-2">
                        <button className="flex-1 py-4 text-[10px] font-bold uppercase tracking-wider border-b-2 border-primary text-primary">Details</button>
                        <button className="flex-1 py-4 text-[10px] font-bold uppercase tracking-wider border-b-2 border-transparent text-slate-600 cursor-not-allowed" disabled>Cost</button>
                        <button className="flex-1 py-4 text-[10px] font-bold uppercase tracking-wider border-b-2 border-transparent text-slate-600 cursor-not-allowed" disabled>Security</button>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                        {selectedNode && selectedInfraNode ? (
                            <div className="space-y-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Resource</p>
                                        <h2 className="text-xl font-bold text-white">{selectedInfraNode.label}</h2>
                                    </div>
                                    <span className="px-2 py-1 rounded bg-primary/20 text-primary text-[10px] font-bold border border-primary/30 uppercase">
                                        {selectedInfraNode.node_type}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#161b22] p-3 rounded-lg border border-[#30363d]">
                                        <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Provider</p>
                                        <p className="text-sm font-medium text-slate-200 uppercase">{selectedInfraNode.provider}</p>
                                    </div>
                                    <div className="bg-[#161b22] p-3 rounded-lg border border-[#30363d]">
                                        <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Service</p>
                                        <p className="text-sm font-medium text-slate-200">{selectedInfraNode.service_name}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-[#30363d] pb-2">Configuration</h4>
                                    <div className="flex justify-between items-center text-sm py-1 border-b border-[#161b22]">
                                        <span className="text-slate-500">Managed</span>
                                        <span className={`font-medium ${selectedInfraNode.managed ? 'text-emerald-400' : 'text-yellow-400'}`}>
                                            {selectedInfraNode.managed ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                    {selectedInfraNode.region && (
                                        <div className="flex justify-between items-center text-sm py-1 border-b border-[#161b22]">
                                            <span className="text-slate-500">Region</span>
                                            <span className="text-slate-200 font-medium">{selectedInfraNode.region}</span>
                                        </div>
                                    )}
                                    {selectedInfraNode.size_class && (
                                        <div className="flex justify-between items-center text-sm py-1 border-b border-[#161b22]">
                                            <span className="text-slate-500">Size Class</span>
                                            <span className="text-slate-200 font-medium">{selectedInfraNode.size_class}</span>
                                        </div>
                                    )}
                                    {selectedInfraNode.scaling_model && (
                                        <div className="flex justify-between items-center text-sm py-1 border-b border-[#161b22]">
                                            <span className="text-slate-500">Scaling</span>
                                            <span className="text-slate-200 font-medium">{selectedInfraNode.scaling_model}</span>
                                        </div>
                                    )}
                                </div>

                                {selectedCost && (
                                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                                        <p className="text-[10px] font-bold text-primary uppercase mb-2">Monthly Cost</p>
                                        <p className="text-2xl font-bold text-white">${selectedCost.monthly_cost_usd.toFixed(2)}</p>
                                        {selectedCost.cost_drivers.length > 0 && (
                                            <div className="mt-3 space-y-1">
                                                <p className="text-[10px] text-slate-500 uppercase">Cost Drivers:</p>
                                                {selectedCost.cost_drivers.map((driver, i) => (
                                                    <p key={i} className="text-[11px] text-slate-400">• {driver}</p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-[#30363d] pb-2">Explanation</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">{selectedInfraNode.explanation}</p>
                                </div>

                                {selectedInfraNode.depends_on && selectedInfraNode.depends_on.length > 0 && (
                                    <div className="space-y-3">
                                        <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-[#30363d] pb-2">Dependencies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedInfraNode.depends_on.map((dep) => (
                                                <span key={dep} className="px-2 py-1 bg-[#161b22] border border-[#30363d] rounded text-[10px] text-slate-400">
                                                    {dep}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <Icon name="touch_app" className="text-4xl text-slate-600 mb-4" />
                                <p className="text-slate-400 font-medium">Click a node to view details</p>
                                <p className="text-slate-500 text-sm mt-2">Drag nodes to rearrange the architecture</p>
                            </div>
                        )}
                    </div>
                </aside>
            </main>
        </div>
    )
}
