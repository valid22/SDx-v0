import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '../components'
import { ArchitectureResponse, InfraNode } from '../services/schemas'

// Resource card for blueprint view
const ResourceCard: React.FC<{ node: InfraNode }> = ({ node }) => {
    const colors: Record<string, string> = {
        VPC: 'blue',
        EC2: 'orange',
        RDS: 'purple',
        S3: 'cyan',
        ALB: 'green',
        Lambda: 'yellow',
        EKS: 'indigo',
        ElastiCache: 'red',
        CloudFront: 'pink',
        Route53: 'teal',
        IAM: 'gray',
    }
    const color = colors[node.type] || 'blue'

    return (
        <div className="flex flex-col items-center gap-3 p-4 bg-[#161b22] border border-[#30363d] rounded-xl shadow-lg hover:border-primary/50 transition-all">
            <div className={`size-14 bg-${color}-500/20 rounded-lg flex items-center justify-center`}>
                <Icon name={node.icon} className={`text-${color}-400 text-2xl`} />
            </div>
            <div className="text-center">
                <span className="text-xs font-bold text-white uppercase tracking-tight block">{node.label}</span>
                <span className="text-[9px] text-slate-500 uppercase">{node.type}</span>
            </div>
            <span className="text-[10px] text-primary font-bold">${node.cost.toFixed(2)}/mo</span>
        </div>
    )
}

export const BlueprintApproval: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const architectureData = (location.state as any)?.architectureData as ArchitectureResponse | undefined
    const [isDeploying, setIsDeploying] = useState(false)

    // Default data if none passed
    const nodes = architectureData?.nodes || []
    const cost = architectureData?.cost || { totalMonthlyCost: 0, projectedSavings: 0, breakdown: { compute: 0, storage: 0, network: 0, database: 0, other: 0 }, optimizations: [] }
    const security = architectureData?.security || { overallHealth: 100, frameworks: [], issues: [] }

    const handleDeploy = () => {
        setIsDeploying(true)
        setTimeout(() => {
            navigate('/audit', { state: { architectureData } })
        }, 2000)
    }

    return (
        <div className="bg-[#0a0c10] text-white overflow-hidden h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-[#30363d] px-8 py-4 bg-[#0a0c10]/80 backdrop-blur-md z-50 shrink-0">
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="size-7 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">MASDA</h2>
                    </div>
                    <div className="h-8 w-[1px] bg-[#30363d]" />
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Step 06</span>
                            <span className="text-sm font-semibold text-white/90">Final Blueprint Approval</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-4 py-1.5 bg-emerald-500/5 rounded-full border border-emerald-500/20">
                        <Icon name="verified" className="text-sm text-emerald-400" />
                        <span className="text-emerald-400 text-sm font-bold">All Checks Passed</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Main Canvas - Blueprint View */}
                <section className="flex-1 relative p-8 overflow-y-auto" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(48, 54, 61, 0.4) 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                }}>
                    <div className="max-w-5xl mx-auto">
                        {/* Title Section */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold mb-2">Infrastructure Blueprint</h1>
                            <p className="text-slate-500">Review the complete architecture before deployment</p>
                        </div>

                        {/* Provider Badge */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl flex items-center gap-4 shadow-lg">
                                <div className="size-10 bg-blue-500/10 rounded flex items-center justify-center text-blue-400">
                                    <Icon name="cloud" className="text-2xl" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter block">AWS Production</span>
                                    <span className="text-[10px] text-primary font-bold">us-east-1</span>
                                </div>
                            </div>
                            <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-white">{nodes.length}</div>
                                    <div className="text-[9px] text-slate-500 uppercase">Resources</div>
                                </div>
                                <div className="h-8 w-[1px] bg-[#30363d]" />
                                <div className="text-center">
                                    <div className="text-xl font-bold text-emerald-400">${cost.totalMonthlyCost.toFixed(2)}</div>
                                    <div className="text-[9px] text-slate-500 uppercase">Monthly</div>
                                </div>
                            </div>
                        </div>

                        {/* Resource Grid */}
                        <div className="border border-primary/20 rounded-2xl bg-primary/5 p-8 mb-8">
                            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Icon name="hub" className="text-primary" />
                                Infrastructure Resources
                            </h2>
                            {nodes.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {nodes.map((node) => (
                                        <ResourceCard key={node.id} node={node} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-slate-500">
                                    <Icon name="warning" className="text-4xl mb-4" />
                                    <p>No architecture data available. Please generate an architecture first.</p>
                                    <button
                                        onClick={() => navigate('/designer')}
                                        className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-bold"
                                    >
                                        Go to Designer
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Cost Breakdown */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d]">
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Icon name="payments" className="text-primary" />
                                    Cost Breakdown
                                </h3>
                                <div className="space-y-3">
                                    {Object.entries(cost.breakdown).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center">
                                            <span className="text-slate-400 capitalize text-sm">{key}</span>
                                            <span className="text-white font-bold">${value.toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div className="border-t border-[#30363d] pt-3 flex justify-between items-center">
                                        <span className="text-white font-bold">Total</span>
                                        <span className="text-primary font-bold text-lg">${cost.totalMonthlyCost.toFixed(2)}/mo</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d]">
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Icon name="security" className="text-emerald-500" />
                                    Security Summary
                                </h3>
                                <div className="flex items-center gap-6 mb-4">
                                    <div className="relative size-20">
                                        <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                            <circle className="stroke-[#30363d]" cx="18" cy="18" fill="none" r="16" strokeWidth="3" />
                                            <circle
                                                className="stroke-emerald-500"
                                                cx="18" cy="18" fill="none" r="16"
                                                strokeDasharray={`${security.overallHealth}, 100`}
                                                strokeLinecap="round" strokeWidth="3"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-sm font-bold">{security.overallHealth}%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">Overall Health</p>
                                        <p className="text-slate-500 text-sm">{security.issues.filter(i => i.severity === 'critical').length} critical issues</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {security.frameworks.slice(0, 3).map((fw) => (
                                        <div key={fw.name} className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400">{fw.name}</span>
                                            <span className={`font-bold ${fw.compliance >= 80 ? 'text-emerald-400' : fw.compliance >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                {fw.compliance}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Sidebar - Approval Panel */}
                <aside className="w-[380px] bg-[#0a0c10] border-l border-[#30363d] flex flex-col shrink-0 overflow-hidden">
                    <div className="flex-1 p-8 space-y-8 overflow-y-auto">
                        <h3 className="text-2xl font-bold tracking-tight leading-tight">
                            Final <span className="text-primary">Approval</span>
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Review the infrastructure blueprint. All security checks have passed and cost optimization has been applied.
                        </p>

                        {/* Cost Summary */}
                        <div className="p-5 bg-[#161b22] rounded-xl border border-[#30363d]">
                            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-2">
                                Total Monthly Estimate
                            </p>
                            <p className="text-3xl font-bold text-emerald-400">${cost.totalMonthlyCost.toFixed(2)}</p>
                            {cost.projectedSavings > 0 && (
                                <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-2">
                                    <Icon name="trending_down" className="text-emerald-400 text-sm" />
                                    ${cost.projectedSavings.toFixed(2)} savings from AI optimization
                                </p>
                            )}
                        </div>

                        {/* Security Checks */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] text-slate-500 uppercase font-bold tracking-widest border-b border-[#30363d] pb-2">
                                Security Checks
                            </h4>
                            <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                <Icon name="verified_user" className="text-emerald-500 text-xl" />
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-white uppercase tracking-tight">IAM Least Privilege</p>
                                    <p className="text-[10px] text-slate-500">Zero-trust roles enforced</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                <Icon name="lock" className="text-emerald-500 text-xl" />
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-white uppercase tracking-tight">Encryption at Rest</p>
                                    <p className="text-[10px] text-slate-500">AES-256 enabled on all storage</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                <Icon name="visibility" className="text-emerald-500 text-xl" />
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-white uppercase tracking-tight">Audit Logging</p>
                                    <p className="text-[10px] text-slate-500">CloudTrail & VPC Flow Logs active</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                <Icon name="gpp_good" className="text-emerald-500 text-xl" />
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-white uppercase tracking-tight">SOC2 Compliant</p>
                                    <p className="text-[10px] text-slate-500">All requirements satisfied</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Deploy Button */}
                    <div className="p-8 border-t border-[#30363d] bg-[#161b22]/50">
                        <button
                            onClick={handleDeploy}
                            disabled={isDeploying || nodes.length === 0}
                            className="w-full h-16 bg-primary text-white font-bold rounded-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 uppercase tracking-widest text-sm hover:bg-blue-600 transition-colors disabled:opacity-70"
                        >
                            {isDeploying ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin text-xl">sync</span>
                                    <span>Deploying Infrastructure...</span>
                                </>
                            ) : (
                                <>
                                    <span>Deploy Production Infrastructure</span>
                                    <Icon name="rocket_launch" />
                                </>
                            )}
                        </button>
                        <p className="text-center text-[10px] text-slate-500 mt-4">
                            Terraform plan will be executed upon approval
                        </p>
                    </div>
                </aside>
            </main>

            {/* Footer */}
            <footer className="h-10 bg-[#0a0c10] border-t border-[#30363d] px-8 flex items-center justify-between text-[10px] font-bold text-slate-500 tracking-widest uppercase shrink-0">
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
                        <span>Ready for Deployment</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon name="schedule" className="text-[14px]" />
                        <span>Est. Deploy Time: 4m 30s</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <span className="text-primary hover:text-white transition-colors cursor-pointer">View Terraform Plan</span>
                    <span className="text-primary hover:text-white transition-colors cursor-pointer">Export JSON</span>
                </div>
            </footer>
        </div>
    )
}
