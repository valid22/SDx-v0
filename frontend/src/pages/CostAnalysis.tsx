import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../components'

interface CostRecommendationProps {
    provider: string
    asset: string
    region: string
    finding: string
    savings: string
    risk: 'low' | 'medium'
}

const CostRecommendation: React.FC<CostRecommendationProps> = ({
    provider, asset, region, finding, savings, risk
}) => (
    <tr className="hover:bg-white/5 transition-colors group">
        <td className="px-8 py-6">
            <div className="flex items-center gap-4">
                <div className="size-10 bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-black tracking-widest">
                    {provider}
                </div>
                <div>
                    <p className="text-xs font-bold tracking-tight uppercase">{asset}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Region: {region}</p>
                </div>
            </div>
        </td>
        <td className="px-8 py-6">
            <p className="text-xs text-slate-400 leading-relaxed uppercase tracking-tight max-w-sm"
                dangerouslySetInnerHTML={{ __html: finding }} />
        </td>
        <td className="px-8 py-6">
            <p className="text-sm font-black text-emerald-500 tabular-nums">{savings} <span className="text-[10px] opacity-70">/ MO</span></p>
        </td>
        <td className="px-8 py-6">
            <span className={`px-2 py-1 border ${risk === 'low' ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-500' : 'border-amber-500/30 bg-amber-500/5 text-amber-500'} text-[10px] font-black uppercase tracking-[0.1em]`}>
                {risk === 'low' ? 'Low_Risk' : 'Medium_Risk'}
            </span>
        </td>
        <td className="px-8 py-6 text-right">
            <button className="bg-primary hover:bg-white hover:text-primary border border-primary text-white px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                Deploy_Fix
            </button>
        </td>
    </tr>
)

export const CostAnalysis: React.FC = () => {
    const navigate = useNavigate()
    const [scalingFactor, setScalingFactor] = useState(3.5)

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
                            <h1 className="text-sm font-bold leading-none tracking-[0.2em] uppercase">MASDA AI</h1>
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
                            <span className="text-xs font-bold uppercase tracking-widest">Optimization</span>
                        </a>
                    </nav>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="bg-white/5 p-4 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-8 h-8 bg-primary/20 rotate-45 translate-x-4 -translate-y-4" />
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">System Status</p>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Operational</span>
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
                                <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Step 05</span>
                                <div className="h-px w-8 bg-primary/30" />
                            </div>
                            <h2 className="text-lg font-bold tracking-tight uppercase">Cost Optimization</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/blueprint')}
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
                            <h1 className="text-5xl font-black tracking-tighter uppercase">Budget & Sensitivity</h1>
                            <p className="text-slate-500 text-sm font-medium tracking-wide max-w-2xl leading-relaxed">
                                Precision analysis of multi-cloud expenditures. AI agents are currently simulating workload volatility
                                to optimize resource allocation across global nodes.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 text-[10px] font-bold tracking-[0.2em] border border-white/10 hover:bg-white/10 uppercase transition-all">
                                <Icon name="calendar_today" className="text-base" />
                                Current_Cycle
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-[10px] font-black tracking-[0.2em] border border-primary hover:brightness-125 uppercase shadow-[0_0_20px_rgba(19,109,236,0.3)] transition-all">
                                <Icon name="download" className="text-base" />
                                Export_Data
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-[#111827]/70 backdrop-blur-md border border-white/5 p-6 border-l-2 border-l-primary flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Total Monthly Est.</p>
                                <Icon name="payments" className="text-slate-600 text-lg" />
                            </div>
                            <p className="text-3xl font-black tracking-tight tabular-nums">$12,450.00</p>
                            <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black tracking-widest">
                                <Icon name="trending_up" className="text-sm" />
                                <span>+5.2% DELTA</span>
                            </div>
                        </div>
                        <div className="bg-[#111827]/70 backdrop-blur-md border border-white/5 p-6 border-l-2 border-l-slate-700 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Current Spend</p>
                                <Icon name="receipt_long" className="text-slate-600 text-lg" />
                            </div>
                            <p className="text-3xl font-black tracking-tight tabular-nums">$8,210.45</p>
                            <div className="flex items-center gap-2 text-primary text-[10px] font-black tracking-widest">
                                <Icon name="bolt" className="text-sm" />
                                <span>ON TRACK</span>
                            </div>
                        </div>
                        <div className="bg-[#111827]/70 backdrop-blur-md border border-white/5 p-6 border-l-2 border-l-cyan-500 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Projected Savings</p>
                                <Icon name="auto_awesome" className="text-cyan-500 text-lg" />
                            </div>
                            <p className="text-3xl font-black tracking-tight tabular-nums text-cyan-400">$2,100.00</p>
                            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black tracking-widest">
                                <span>12_AGENT_FIXES</span>
                            </div>
                        </div>
                        <div className="bg-[#111827]/70 backdrop-blur-md border border-white/5 p-6 flex items-center gap-6 relative overflow-hidden">
                            <div className="relative size-20 shrink-0">
                                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                    <circle className="stroke-slate-800" cx="18" cy="18" fill="none" r="16" strokeWidth="3" />
                                    <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="68, 100" strokeLinecap="square" strokeWidth="3" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-sm font-black">68%</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Compliance</p>
                                <p className="text-lg font-bold tabular-nums">$4,239.55</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">REMAINING_BAL</p>
                            </div>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Expenditure Chart */}
                        <div className="lg:col-span-2 bg-[#111827]/70 backdrop-blur-md border border-white/5 p-8 relative">
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-6 bg-primary" />
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em]">Expenditure Overview</h3>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex items-center gap-2">
                                        <span className="size-1.5 bg-primary" />
                                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">AWS</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="size-1.5 bg-cyan-500" />
                                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">GCP</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="size-1.5 bg-slate-600" />
                                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">AZURE</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-64 flex items-end justify-between gap-4 border-l border-b border-white/5 px-4 pt-4">
                                {['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'].map((month, i) => (
                                    <div key={month} className="flex-1 flex flex-col gap-0.5 h-full justify-end group cursor-crosshair z-10">
                                        <div className={`w-full bg-slate-600 h-[${10 + i * 2}%] opacity-40 hover:opacity-100 transition-opacity`} />
                                        <div className={`w-full bg-cyan-500 h-[${20 + i * 2}%] opacity-40 hover:opacity-100 transition-opacity`} />
                                        <div className={`w-full bg-primary h-[${45 + i * 1}%] ${i === 5 ? 'border-2 border-primary/50 relative shadow-[0_0_20px_rgba(19,109,236,0.2)]' : 'opacity-40 hover:opacity-100'} transition-opacity`} />
                                        <p className={`text-[10px] font-black text-center mt-3 ${i === 5 ? 'text-primary' : 'text-slate-600'} tracking-tighter`}>
                                            {i === 5 ? 'OCT_PROJ' : month}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sensitivity Analysis */}
                        <div className="bg-[#111827]/70 backdrop-blur-md border border-white/5 p-8 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Icon name="query_stats" className="text-6xl" />
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1 h-6 bg-cyan-500" />
                                <h3 className="text-sm font-black uppercase tracking-[0.2em]">Sensitivity Analysis</h3>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-10 leading-relaxed">
                                Simulating workload scaling vs cost impact
                            </p>
                            <div className="space-y-12 flex-1 flex flex-col justify-center">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Scaling_Factor</label>
                                        <span className="text-3xl font-black text-primary tracking-tighter">
                                            {scalingFactor}<span className="text-xs font-bold text-slate-500 ml-1">X</span>
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        step="0.5"
                                        value={scalingFactor}
                                        onChange={(e) => setScalingFactor(parseFloat(e.target.value))}
                                        className="w-full cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] font-black text-slate-600 tracking-widest uppercase px-1">
                                        <span>Current</span>
                                        <span>Max_Peak</span>
                                    </div>
                                </div>
                                <div className="p-5 bg-white/5 border border-white/10 relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Projected Impact</p>
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-bold text-slate-300 uppercase tracking-tight">Monthly Total</span>
                                        <span className="text-2xl font-black text-white tabular-nums tracking-tighter">
                                            ${(12450 * scalingFactor / 3.5).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommendations Table */}
                    <div className="bg-[#111827]/70 backdrop-blur-md overflow-hidden border border-white/5">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="size-10 bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <Icon name="smart_toy" className="text-primary text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em]">Agent Recommendations</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Scanned 1,429 instances in real-time</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black tracking-[0.2em] uppercase">
                                <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                Active_Scanner
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/[0.01]">
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Provider / Asset</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Heuristic_Finding</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Delta_Savings</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Risk_Index</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5 text-right">Protocol</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <CostRecommendation
                                        provider="AWS"
                                        asset="EC2 Instances (t3.medium)"
                                        region="US-EAST-1"
                                        finding="Underutilized assets detected. Migration to <span class='text-white font-bold'>Spot Instances</span> recommended for batch processing."
                                        savings="-$840.00"
                                        risk="medium"
                                    />
                                    <CostRecommendation
                                        provider="GCP"
                                        asset="Cloud SQL (RDS)"
                                        region="EU-WEST-3"
                                        finding="Idle capacity found. 12% CPU baseline. <span class='text-white font-bold'>Downsize SKU</span> to standard-2."
                                        savings="-$320.00"
                                        risk="low"
                                    />
                                    <CostRecommendation
                                        provider="AZR"
                                        asset="Blob Storage (Hot)"
                                        region="Archive_Containers"
                                        finding="Stale data violation. Move 2.4TB to <span class='text-white font-bold'>Archive Tier</span> storage."
                                        savings="-$145.50"
                                        risk="low"
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
