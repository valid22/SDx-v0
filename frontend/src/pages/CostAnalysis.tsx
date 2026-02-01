import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '../components'
import type { NormalizationResult } from '../services/gemini'

// Cost recommendation row component
interface CostRecommendationProps {
    nodeId: string
    cost: number
    drivers: string[]
    explanation: string
}

const CostRecommendation: React.FC<CostRecommendationProps> = ({
    nodeId, cost, drivers, explanation
}) => (
    <tr className="hover:bg-white/5 transition-colors group">
        <td className="px-8 py-6">
            <div className="flex items-center gap-4">
                <div className="size-10 bg-slate-800 border border-white/10 flex items-center justify-center">
                    <Icon name="memory" className="text-primary" />
                </div>
                <div>
                    <p className="text-xs font-bold tracking-tight uppercase">{nodeId}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Resource Node</p>
                </div>
            </div>
        </td>
        <td className="px-8 py-6">
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                {explanation.slice(0, 150)}{explanation.length > 150 ? '...' : ''}
            </p>
        </td>
        <td className="px-8 py-6">
            <p className="text-sm font-black text-emerald-500 tabular-nums">
                ${cost.toFixed(2)} <span className="text-[10px] opacity-70">/ MO</span>
            </p>
        </td>
        <td className="px-8 py-6">
            <div className="flex flex-wrap gap-1">
                {drivers.slice(0, 2).map((driver, i) => (
                    <span key={i} className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[9px] font-bold uppercase">
                        {driver.slice(0, 20)}
                    </span>
                ))}
            </div>
        </td>
    </tr>
)

export const CostAnalysis: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const architectureData = (location.state as { architectureData?: NormalizationResult })?.architectureData
    const [scalingFactor, setScalingFactor] = useState(1.0)

    // Extract cost data from AI output
    const costOutput = architectureData?.final_architecture?.cost
    const infraOutput = architectureData?.final_architecture?.infra
    const perNodeCosts = costOutput?.per_node_costs || []
    const summary = costOutput?.summary
    const optimizationNotes = costOutput?.optimization_notes || []

    const totalMonthlyCost = summary?.total_monthly_cost_usd || 0
    const withinBudget = summary?.within_budget ?? true
    const primaryDrivers = summary?.primary_cost_drivers || []
    const provider = infraOutput?.provider_selected || 'aws'

    // Calculate projected cost with scaling
    const projectedCost = totalMonthlyCost * scalingFactor

    // Sort per-node costs by amount
    const sortedCosts = [...perNodeCosts].sort((a, b) => b.monthly_cost_usd - a.monthly_cost_usd)

    return (
        <div className="bg-[#0a0f16] text-slate-200 min-h-screen overflow-hidden flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-[#1f2937] flex flex-col justify-between p-6 bg-[#0a0f16]/80">
                <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/20 border border-primary/40 rounded p-1.5">
                            <Icon name="deployed_code" className="text-primary text-xl" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-sm font-bold leading-none tracking-[0.2em] uppercase">MAADS AI</h1>
                            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Infrastructure Platform</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <a onClick={() => navigate('/')} className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all cursor-pointer">
                            <Icon name="dashboard" className="text-lg" />
                            <span className="text-xs font-bold uppercase tracking-widest">Dashboard</span>
                        </a>
                        <a onClick={() => navigate('/designer')} className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all cursor-pointer">
                            <Icon name="dns" className="text-lg" />
                            <span className="text-xs font-bold uppercase tracking-widest">Infrastructure</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2 bg-primary/10 border-l-2 border-primary text-primary">
                            <Icon name="bolt" className="text-lg" />
                            <span className="text-xs font-bold uppercase tracking-widest">Cost Analysis</span>
                        </a>
                    </nav>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="bg-white/5 p-4 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-8 h-8 bg-primary/20 rotate-45 translate-x-4 -translate-y-4" />
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Provider</p>
                        <div className="flex items-center gap-2 mb-4">
                            <Icon name="cloud" className="text-primary" />
                            <span className="text-sm font-bold uppercase">{provider}</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-y-auto bg-[#0a0f16]/30">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-[#1f2937] px-8 py-4 bg-[#0a0f16]/60 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Step 03</span>
                                <div className="h-px w-8 bg-primary/30" />
                            </div>
                            <h2 className="text-lg font-bold tracking-tight uppercase">Cost Analysis</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/blueprint', { state: { architectureData } })}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-[10px] font-black tracking-[0.2em] border border-primary hover:brightness-125 uppercase shadow-[0_0_20px_rgba(19,109,236,0.3)] transition-all"
                        >
                            Continue to Blueprint
                            <Icon name="arrow_forward" className="text-base" />
                        </button>
                    </div>
                </header>

                <div className="p-8 space-y-8 w-full max-w-[1600px] mx-auto">
                    {/* Title */}
                    <div className="flex flex-wrap justify-between items-start gap-6 border-b border-white/5 pb-8">
                        <div className="space-y-3">
                            <h1 className="text-5xl font-black tracking-tighter uppercase">Cost Overview</h1>
                            <p className="text-slate-500 text-sm font-medium tracking-wide max-w-2xl leading-relaxed">
                                AI-generated cost analysis for your {provider.toUpperCase()} infrastructure.
                                {withinBudget
                                    ? ' All resources are within budget constraints.'
                                    : ' Warning: Some resources may exceed budget limits.'}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <span className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-[0.2em] border uppercase ${withinBudget
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                }`}>
                                <Icon name={withinBudget ? 'check_circle' : 'warning'} className="text-base" />
                                {withinBudget ? 'Within Budget' : 'Budget Alert'}
                            </span>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-[#111827]/70 backdrop-blur-md border border-white/5 p-6 border-l-2 border-l-primary flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Total Monthly Est.</p>
                                <Icon name="payments" className="text-slate-600 text-lg" />
                            </div>
                            <p className="text-3xl font-black tracking-tight tabular-nums">${totalMonthlyCost.toFixed(2)}</p>
                            <div className="flex items-center gap-2 text-primary text-[10px] font-black tracking-widest">
                                <Icon name="bolt" className="text-sm" />
                                <span>AI OPTIMIZED</span>
                            </div>
                        </div>
                        <div className="bg-[#111827]/70 backdrop-blur-md border border-white/5 p-6 border-l-2 border-l-slate-700 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Resource Count</p>
                                <Icon name="dns" className="text-slate-600 text-lg" />
                            </div>
                            <p className="text-3xl font-black tracking-tight tabular-nums">{perNodeCosts.length}</p>
                            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black tracking-widest">
                                <span>INFRASTRUCTURE NODES</span>
                            </div>
                        </div>
                        <div className="bg-[#111827]/70 backdrop-blur-md border border-white/5 p-6 border-l-2 border-l-cyan-500 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Avg Cost/Node</p>
                                <Icon name="auto_awesome" className="text-cyan-500 text-lg" />
                            </div>
                            <p className="text-3xl font-black tracking-tight tabular-nums text-cyan-400">
                                ${perNodeCosts.length > 0 ? (totalMonthlyCost / perNodeCosts.length).toFixed(2) : '0.00'}
                            </p>
                            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black tracking-widest">
                                <span>PER RESOURCE</span>
                            </div>
                        </div>
                        <div className="bg-[#111827]/70 backdrop-blur-md border border-white/5 p-6 border-l-2 border-l-emerald-500 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Optimizations</p>
                                <Icon name="tips_and_updates" className="text-emerald-500 text-lg" />
                            </div>
                            <p className="text-3xl font-black tracking-tight tabular-nums text-emerald-400">{optimizationNotes.length}</p>
                            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black tracking-widest">
                                <span>RECOMMENDATIONS</span>
                            </div>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Cost Breakdown */}
                        <div className="lg:col-span-2 bg-[#111827]/70 backdrop-blur-md border border-white/5 p-8 relative">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-6 bg-primary" />
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em]">Primary Cost Drivers</h3>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {primaryDrivers.length > 0 ? (
                                    primaryDrivers.map((driver, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                                            <div className="size-10 bg-primary/10 flex items-center justify-center">
                                                <Icon name="trending_up" className="text-primary" />
                                            </div>
                                            <p className="text-sm text-slate-300 flex-1">{driver}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-500 text-sm">No cost drivers identified</p>
                                )}
                            </div>
                        </div>

                        {/* Sensitivity Analysis */}
                        <div className="bg-[#111827]/70 backdrop-blur-md border border-white/5 p-8 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Icon name="query_stats" className="text-6xl" />
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1 h-6 bg-cyan-500" />
                                <h3 className="text-sm font-black uppercase tracking-[0.2em]">Scaling Simulator</h3>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-10 leading-relaxed">
                                Project costs at different scale factors
                            </p>
                            <div className="space-y-12 flex-1 flex flex-col justify-center">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Scale Factor</label>
                                        <span className="text-3xl font-black text-primary tracking-tighter">
                                            {scalingFactor.toFixed(1)}<span className="text-xs font-bold text-slate-500 ml-1">X</span>
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="5"
                                        step="0.5"
                                        value={scalingFactor}
                                        onChange={(e) => setScalingFactor(parseFloat(e.target.value))}
                                        className="w-full cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] font-black text-slate-600 tracking-widest uppercase px-1">
                                        <span>0.5x</span>
                                        <span>5x</span>
                                    </div>
                                </div>
                                <div className="p-5 bg-white/5 border border-white/10 relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Projected Cost</p>
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-bold text-slate-300 uppercase tracking-tight">Monthly Total</span>
                                        <span className="text-2xl font-black text-white tabular-nums tracking-tighter">
                                            ${projectedCost.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Optimization Notes */}
                    {optimizationNotes.length > 0 && (
                        <div className="bg-[#111827]/70 backdrop-blur-md border border-white/5 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-1 h-6 bg-emerald-500" />
                                <h3 className="text-sm font-black uppercase tracking-[0.2em]">AI Optimization Notes</h3>
                            </div>
                            <div className="space-y-3">
                                {optimizationNotes.map((note, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 bg-emerald-500/5 border border-emerald-500/20">
                                        <Icon name="lightbulb" className="text-emerald-500 mt-0.5" />
                                        <p className="text-sm text-slate-300">{note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Per-Node Costs Table */}
                    <div className="bg-[#111827]/70 backdrop-blur-md overflow-hidden border border-white/5">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="size-10 bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <Icon name="receipt_long" className="text-primary text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em]">Per-Node Cost Breakdown</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                                        {perNodeCosts.length} resources analyzed
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/[0.01]">
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Resource</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Explanation</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Monthly Cost</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Cost Drivers</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {sortedCosts.length > 0 ? (
                                        sortedCosts.map((nodeCost) => (
                                            <CostRecommendation
                                                key={nodeCost.node_id}
                                                nodeId={nodeCost.node_id}
                                                cost={nodeCost.monthly_cost_usd}
                                                drivers={nodeCost.cost_drivers}
                                                explanation={nodeCost.explanation}
                                            />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-12 text-center text-slate-500">
                                                <Icon name="info" className="text-4xl mb-4" />
                                                <p>No cost data available. Generate an architecture first.</p>
                                                <button
                                                    onClick={() => navigate('/designer')}
                                                    className="mt-4 px-6 py-2 bg-primary text-white text-sm font-bold"
                                                >
                                                    Go to Designer
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
