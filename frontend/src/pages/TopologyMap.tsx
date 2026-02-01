import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../components'

interface DiscoveryStepProps {
    title: string
    description: string
    status: 'COMPLETED' | 'TRACING' | 'PENDING'
}

const DiscoveryStep: React.FC<DiscoveryStepProps> = ({ title, description, status }) => {
    const isCompleted = status === 'COMPLETED'
    const isTracing = status === 'TRACING'

    return (
        <div className={`relative pl-7 pb-6 border-l-2 ${isCompleted ? 'border-primary' : 'border-primary/20'}`}>
            <div className={`absolute -left-[7px] top-0 size-3 rounded-sm ${isTracing ? 'bg-primary animate-pulse' : isCompleted ? 'bg-primary shadow-[0_0_8px_rgba(19,109,236,0.5)]' : 'bg-[#30363d]'
                }`} />
            <div className={`flex flex-col ${!isTracing && !isCompleted ? 'opacity-40' : ''}`}>
                <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-bold uppercase tracking-tight">{title}</span>
                    <span className={`text-[10px] font-bold ${isTracing ? 'text-primary' : isCompleted ? 'text-primary' : 'text-slate-500'}`}>
                        {isTracing && <span className="material-symbols-outlined text-[12px] animate-spin mr-1">refresh</span>}
                        {status}
                    </span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">{description}</p>
            </div>
        </div>
    )
}

export const TopologyMap: React.FC = () => {
    const navigate = useNavigate()
    const [selectedResource, setSelectedResource] = useState<string | null>('app')

    return (
        <div className="bg-[#0a0c10] text-white overflow-hidden h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-[#282f39] px-6 py-3 bg-[#0a0c10] z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-white">
                        <div className="size-6 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor" />
                            </svg>
                        </div>
                        <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] uppercase">MAADS</h2>
                    </div>
                    <div className="h-8 w-[1px] bg-[#282f39]" />
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Step 03</span>
                            <span className="text-sm font-medium">Topology Validation</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Scope</span>
                            <span className="text-sm font-medium">Production Environment</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1c2027] rounded border border-[#282f39]">
                        <Icon name="lock_outline" className="text-sm text-slate-500" />
                        <span className="text-white text-sm font-bold">IAM: Compliant</span>
                    </div>
                    <div className="h-8 w-[1px] bg-[#282f39] mx-2" />
                    <div className="flex gap-3">
                        <button className="flex items-center justify-center rounded px-4 h-10 border border-[#282f39] bg-[#1c2027] text-white text-sm font-bold hover:bg-[#282f39] transition-colors">
                            Regenerate Map
                        </button>
                        <button
                            onClick={() => navigate('/compliance')}
                            className="flex items-center justify-center rounded px-6 h-10 bg-primary text-white text-sm font-bold hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(19,109,236,0.3)]"
                        >
                            Confirm & Continue
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - Discovery Queue */}
                <aside className="w-80 bg-[#111418] border-r border-[#282f39] flex flex-col shrink-0">
                    <div className="p-5 border-b border-[#282f39]">
                        <h3 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                            Discovery Queue
                            <Icon name="data_exploration" className="text-sm text-primary" />
                        </h3>
                        <div className="space-y-0">
                            <DiscoveryStep
                                title="VPC Mapping"
                                description="3 VPCs, 12 Subnets, 4 Peering Links successfully discovered."
                                status="COMPLETED"
                            />
                            <DiscoveryStep
                                title="Flow Analysis"
                                description="Analyzing ingress/egress patterns for 10.0.2.0/24 subnet..."
                                status="TRACING"
                            />
                            <DiscoveryStep
                                title="Final Validation"
                                description="Waiting for flow analysis completion."
                                status="PENDING"
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col min-h-0 bg-[#0a0c10] p-5 font-mono text-[11px]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-500 uppercase text-[10px] font-bold tracking-widest">Network Event Log</span>
                            <span className="flex items-center gap-1.5 text-[9px] text-emerald-500 font-bold">
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
                            </span>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 text-slate-500">
                            <p><span className="text-primary/70">[10:14:02]</span> <span className="text-white">SCAN:</span> Mapping AWS-Ireland-Region...</p>
                            <p><span className="text-primary/70">[10:14:05]</span> <span className="text-white">FOUND:</span> vpc-0a2b3c (10.0.0.0/16)</p>
                            <p><span className="text-primary/70">[10:14:08]</span> <span className="text-white">FOUND:</span> igw-98721 (Internet Gateway)</p>
                            <p><span className="text-primary/70">[10:14:12]</span> <span className="text-white">ROUTE:</span> 0.0.0.0/0 via igw-98721</p>
                            <p><span className="text-primary/70">[10:14:15]</span> <span className="text-yellow-500">WARN:</span> NACL-99 permissive for 22/tcp</p>
                            <p><span className="text-primary/70">[10:14:18]</span> <span className="text-white">SCAN:</span> Traversing Subnet associations...</p>
                            <p className="text-white border-l-2 border-white pl-2">_</p>
                        </div>
                    </div>
                </aside>

                {/* Center - Topology Canvas */}
                <section className="flex-1 relative flex flex-col" style={{
                    backgroundColor: '#0a0c10',
                    backgroundImage: `linear-gradient(to right, rgba(40, 47, 57, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(40, 47, 57, 0.4) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}>
                    {/* Toolbar */}
                    <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
                        <div className="flex items-center bg-[#1c2027] border border-[#282f39] rounded-md p-1 shadow-xl">
                            <button className="p-2 text-slate-500 hover:text-white transition-all">
                                <Icon name="drag_pan" className="text-[18px]" />
                            </button>
                            <button className="p-2 text-primary bg-primary/10 rounded-sm transition-all">
                                <Icon name="near_me" className="text-[18px]" />
                            </button>
                            <div className="w-[1px] h-4 bg-[#282f39] mx-1" />
                            <button className="p-2 text-slate-500 hover:text-white transition-all">
                                <Icon name="layers" className="text-[18px]" />
                            </button>
                        </div>
                        <div className="flex items-center h-10 bg-[#1c2027] border border-[#282f39] rounded-md px-4 shadow-xl min-w-[300px]">
                            <Icon name="search" className="text-slate-500 mr-2 text-lg" />
                            <input className="bg-transparent border-none focus:ring-0 text-xs w-full placeholder:text-slate-600 font-medium" placeholder="Search VPC, CIDR, ENI..." />
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="absolute top-6 right-6 flex items-center gap-6 bg-[#1c2027]/90 backdrop-blur-lg px-6 py-3 rounded-md border border-[#282f39] shadow-xl">
                        <div className="flex items-center gap-3">
                            <span className="size-2 rounded-sm bg-[#ff4d94] shadow-[0_0_5px_rgba(255,77,148,0.5)]" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">VPC</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="size-2 rounded-sm bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.5)]" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Subnet</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="size-2 rounded-sm bg-primary shadow-[0_0_5px_rgba(19,109,236,0.5)]" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Traffic</span>
                        </div>
                    </div>

                    {/* Topology Diagram */}
                    <div className="flex-1 relative overflow-hidden flex items-center justify-center p-12">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <path d="M250,250 Q350,250 450,250" fill="none" stroke="#136dec" strokeWidth="2" filter="url(#glow)" />
                            <path d="M650,200 L750,150" fill="none" stroke="#136dec" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
                            <path d="M650,300 L750,350" fill="none" stroke="#136dec" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
                            <defs>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                        </svg>

                        <div className="relative z-10 flex gap-12 items-center">
                            {/* Internet Gateway */}
                            <div
                                onClick={() => setSelectedResource('igw')}
                                className={`bg-[#1c2027] border ${selectedResource === 'igw' ? 'border-primary ring-4 ring-primary/10' : 'border-[#282f39]'} p-5 rounded-lg shadow-xl flex flex-col items-center gap-3 w-36 cursor-pointer hover:border-primary transition-colors`}
                            >
                                <div className="size-12 bg-blue-500/10 text-blue-400 rounded flex items-center justify-center">
                                    <Icon name="public" />
                                </div>
                                <div className="text-center">
                                    <span className="block text-[10px] font-bold uppercase tracking-widest">IGW-Edge-01</span>
                                    <span className="text-[9px] text-slate-500">Internet Gateway</span>
                                </div>
                            </div>

                            {/* VPC Container */}
                            <div className="border border-[#ff4d94]/40 border-dashed rounded-xl p-8 bg-[#ff4d94]/[0.03] relative">
                                <div className="absolute -top-3 left-10 bg-[#ff4d94] text-white px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                                    Production VPC <span className="opacity-70 ml-2">10.0.0.0/16</span>
                                </div>
                                <div className="flex gap-12">
                                    {/* Public Subnet */}
                                    <div className="border border-orange-500/40 border-dashed rounded-lg p-6 bg-orange-500/[0.03] relative">
                                        <div className="absolute -top-2.5 left-6 bg-orange-500 text-white px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider">
                                            Public Subnet
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div
                                                onClick={() => setSelectedResource('alb')}
                                                className={`bg-[#1c2027] border ${selectedResource === 'alb' ? 'border-primary' : 'border-[#282f39]'} p-4 rounded-md shadow-xl w-44 cursor-pointer hover:border-primary transition-all`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="size-10 bg-primary/10 text-primary rounded flex items-center justify-center">
                                                        <Icon name="router" className="text-lg" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[11px] font-bold">ALB-External</h4>
                                                        <p className="text-[9px] text-slate-500">Load Balancer</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Private Subnet */}
                                    <div className="border border-white/20 border-dashed rounded-lg p-6 bg-white/[0.02] relative">
                                        <div className="absolute -top-2.5 left-6 bg-slate-600 text-white px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider">
                                            Private Subnet
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div
                                                onClick={() => setSelectedResource('app')}
                                                className={`bg-[#1c2027] border-2 ${selectedResource === 'app' ? 'border-primary ring-4 ring-primary/10' : 'border-[#282f39]'} p-4 rounded-md shadow-xl w-44 relative cursor-pointer`}
                                            >
                                                {selectedResource === 'app' && (
                                                    <div className="absolute -top-2 -right-2 size-4 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                                                        <Icon name="check" className="text-[10px]" />
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-4">
                                                    <div className="size-10 bg-primary text-white rounded flex items-center justify-center">
                                                        <Icon name="memory" className="text-lg" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[11px] font-bold">App Tier Cluster</h4>
                                                        <p className="text-[9px] text-primary font-bold">v1.2.4 Active</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                onClick={() => setSelectedResource('rds')}
                                                className={`bg-[#1c2027] border ${selectedResource === 'rds' ? 'border-primary' : 'border-[#282f39]'} p-4 rounded-md shadow-xl w-44 cursor-pointer hover:border-primary transition-all opacity-80`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="size-10 bg-orange-500/10 text-orange-400 rounded flex items-center justify-center">
                                                        <Icon name="database" className="text-lg" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[11px] font-bold">RDS Aurora</h4>
                                                        <p className="text-[9px] text-slate-500">Multi-AZ DB</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Peering Link */}
                            <div
                                onClick={() => setSelectedResource('pcx')}
                                className={`bg-[#1c2027] border ${selectedResource === 'pcx' ? 'border-primary' : 'border-primary/40 border-dashed'} p-5 rounded-lg shadow-xl flex flex-col items-center gap-3 w-36 bg-primary/5 cursor-pointer hover:border-primary transition-colors`}
                            >
                                <div className="size-12 bg-primary/20 text-primary rounded flex items-center justify-center">
                                    <Icon name="sync_alt" />
                                </div>
                                <div className="text-center">
                                    <span className="block text-[10px] font-bold uppercase tracking-widest">Shared-PCX</span>
                                    <span className="text-[9px] text-primary/70">Peering Link</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Zoom Controls */}
                    <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-3">
                        <div className="bg-[#1c2027] border border-[#282f39] rounded-md p-1 flex flex-col shadow-xl">
                            <button className="p-2 text-slate-500 hover:text-white hover:bg-[#282f39] rounded-sm transition-all">
                                <Icon name="add" className="text-[20px]" />
                            </button>
                            <div className="h-[1px] w-full bg-[#282f39]" />
                            <button className="p-2 text-slate-500 hover:text-white hover:bg-[#282f39] rounded-sm transition-all">
                                <Icon name="remove" className="text-[20px]" />
                            </button>
                        </div>
                        <button className="p-2 bg-[#1c2027] border border-[#282f39] text-slate-500 rounded-md hover:text-white shadow-xl transition-all">
                            <Icon name="center_focus_strong" className="text-[20px]" />
                        </button>
                    </div>
                </section>

                {/* Right Sidebar - Resource Details */}
                <aside className="w-96 bg-[#111418] border-l border-[#282f39] flex flex-col shrink-0 overflow-hidden">
                    <div className="flex border-b border-[#282f39] px-4">
                        <button className="flex-1 py-4 text-xs font-bold uppercase tracking-[0.15em] border-b-2 border-primary text-white">Selection Details</button>
                        <button className="flex-1 py-4 text-xs font-bold uppercase tracking-[0.15em] border-b-2 border-transparent text-slate-500 hover:text-white transition-colors">Route Table</button>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                        <div className="space-y-8">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Selected Resource</p>
                                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-bold rounded">SUB-0A1B</span>
                                </div>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">App Tier Subnet</h2>
                                <p className="text-sm text-slate-500 mt-2 font-mono">10.0.2.0 / 24 • eu-west-1a</p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Network Allocation</p>
                                <div className="bg-[#0a0c10] p-5 rounded-lg border border-[#282f39]">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-white uppercase">IP Usage</span>
                                        <span className="text-xs text-slate-500 font-mono">251 Free / 256 Total</span>
                                    </div>
                                    <div className="w-full bg-[#282f39] h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-primary w-[12%] h-full shadow-[0_0_10px_rgba(19,109,236,0.6)]" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-[#282f39] pb-2">
                                    <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Security Groups</h4>
                                    <span className="text-[10px] text-primary font-bold cursor-pointer hover:underline">Edit Rules</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-4 p-4 bg-emerald-500/[0.03] border border-emerald-500/20 rounded-md">
                                        <Icon name="verified_user" className="text-emerald-500 text-xl" />
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-white uppercase tracking-tighter">Inbound Allow</p>
                                            <p className="text-[10px] text-slate-500 mt-1">Ports: 80, 443, 8080</p>
                                            <p className="text-[10px] text-slate-500">Source: ALB Security Group</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-red-500/[0.03] border border-red-500/20 rounded-md">
                                        <Icon name="block" className="text-red-500 text-xl" />
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-white uppercase tracking-tighter">Default Deny</p>
                                            <p className="text-[10px] text-slate-500 mt-1">All other ingress traffic restricted</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 border-t border-[#282f39] bg-[#1c2027]/30 backdrop-blur-md">
                        <div className="flex gap-4">
                            <button className="flex-1 py-4 bg-[#282f39] rounded text-[11px] font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors border border-white/5">
                                Config Sync
                            </button>
                            <button className="flex-1 py-4 bg-primary rounded text-[11px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(19,109,236,0.3)]">
                                Analyze Path
                            </button>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Footer */}
            <footer className="h-10 bg-[#0a0c10] border-t border-[#282f39] px-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 shrink-0">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(19,109,236,0.5)]" />
                        <span>Interactive Mode</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon name="history" className="text-[14px]" />
                        <span>Sync: 12.04s ago</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon name="dns" className="text-[14px]" />
                        <span>Nodes: 24 active</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <span className="text-emerald-500">System Validated • 0 Critical Security Risks</span>
                    <button className="text-primary hover:text-white transition-colors border-l border-[#282f39] pl-6 ml-2">Export Terraform Plan</button>
                </div>
            </footer>
        </div>
    )
}
