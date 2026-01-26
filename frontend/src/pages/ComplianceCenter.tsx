import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../components'

interface ComplianceItemProps {
    title: string
    resource: string
    severity: 'critical' | 'warning' | 'resolved'
    control: string
    description: string
    provider: string
    onFix: () => void
}

const ComplianceItem: React.FC<ComplianceItemProps> = ({
    title, resource, severity, control, description, provider, onFix
}) => {
    const config = {
        critical: { color: 'red', icon: 'gpp_maybe', label: 'Critical Risk' },
        warning: { color: 'yellow', icon: 'warning', label: 'Medium Risk' },
        resolved: { color: 'green', icon: 'verified_user', label: 'Remediated' },
    }[severity]

    return (
        <div className={`bg-[#161b22]/70 backdrop-blur-md border border-[#30363d] rounded-2xl p-8 border-l-4 border-l-${config.color}-500 shadow-xl ${severity === 'resolved' ? 'opacity-60' : ''}`}>
            <div className="flex gap-8">
                <div className={`size-14 bg-${config.color}-500/10 text-${config.color}-500 rounded-2xl flex items-center justify-center shrink-0 border border-${config.color}-500/20`}>
                    <Icon name={config.icon} className="text-4xl" />
                </div>
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                {title} <span className="text-slate-500 font-medium ml-2">/ {resource}</span>
                            </h3>
                            <div className="flex items-center gap-4">
                                <span className={`text-${config.color}-400 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1`}>
                                    <span className={`size-1.5 rounded-full bg-${config.color}-500`}></span>
                                    {config.label}
                                </span>
                                <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">• {control}</span>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-[#161b22] text-slate-500 text-[10px] font-bold rounded-full border border-[#30363d] uppercase">{provider}</span>
                    </div>
                    <p className="text-[15px] text-slate-400 leading-relaxed mb-8 max-w-3xl">{description}</p>
                    {severity !== 'resolved' && (
                        <div className="flex items-center justify-between border-t border-[#30363d]/50 pt-6">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={onFix}
                                    className="px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                                >
                                    <Icon name="bolt" className="text-lg" />
                                    Fix Automatically
                                </button>
                                <button className="px-6 py-3 bg-[#161b22] text-white text-sm font-bold rounded-xl border border-[#30363d] hover:bg-[#30363d] transition-all">
                                    Manual Review
                                </button>
                            </div>
                            <button className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                                Ignore / False Positive
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

interface FrameworkCardProps {
    name: string
    compliance: number
    controls: { passed: number; total: number }
    selected: boolean
    onClick: () => void
}

const FrameworkCard: React.FC<FrameworkCardProps> = ({ name, compliance, controls, selected, onClick }) => {
    const getColor = () => {
        if (compliance >= 80) return 'primary'
        if (compliance >= 50) return 'yellow'
        return 'red'
    }

    return (
        <div
            onClick={onClick}
            className={`p-5 rounded-xl cursor-pointer transition-all ${selected
                    ? 'bg-primary/5 border border-primary/40 ring-1 ring-primary/20'
                    : 'bg-[#161b22]/40 border border-[#30363d] hover:border-slate-500/30'
                }`}
        >
            <div className="flex items-center justify-between mb-4">
                <span className={`font-bold text-sm ${selected ? 'text-white' : 'text-slate-400'}`}>{name}</span>
                <Icon
                    name={selected ? 'check_circle' : 'radio_button_unchecked'}
                    className={selected ? 'text-primary text-xl' : 'text-[#30363d]'}
                />
            </div>
            <div className="w-full bg-[#30363d] h-1 rounded-full mb-3">
                <div
                    className={`bg-${getColor()}-500 h-full rounded-full ${selected ? 'shadow-[0_0_8px_rgba(19,109,236,0.6)]' : ''}`}
                    style={{ width: `${compliance}%` }}
                />
            </div>
            <div className="flex justify-between text-[11px] font-bold">
                <span className={`text-${getColor()}-${selected ? '400' : '500/70'} uppercase tracking-tight`}>
                    {compliance}% Compliance
                </span>
                <span className="text-slate-500">{controls.passed}/{controls.total} Controls</span>
            </div>
        </div>
    )
}

export const ComplianceCenter: React.FC = () => {
    const navigate = useNavigate()
    const [selectedFramework, setSelectedFramework] = useState('soc2')

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
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Step 04</span>
                            <span className="text-sm font-semibold text-white/90">Security & Compliance Audit</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-4 py-1.5 bg-emerald-500/5 rounded-full border border-emerald-500/20">
                        <Icon name="verified" className="text-sm text-emerald-400" />
                        <span className="text-emerald-400 text-sm font-bold">84% Overall Health</span>
                    </div>
                    <button
                        onClick={() => navigate('/cost')}
                        className="flex items-center gap-2 rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20"
                    >
                        Continue to Cost Analysis
                        <Icon name="arrow_forward" className="text-lg" />
                    </button>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - Frameworks */}
                <aside className="w-80 bg-[#0a0c10] border-r border-[#30363d] flex flex-col shrink-0">
                    <div className="p-8">
                        <h3 className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">Compliance Frameworks</h3>
                        <div className="space-y-4">
                            <FrameworkCard
                                name="SOC2 Type II"
                                compliance={92}
                                controls={{ passed: 48, total: 52 }}
                                selected={selectedFramework === 'soc2'}
                                onClick={() => setSelectedFramework('soc2')}
                            />
                            <FrameworkCard
                                name="HIPAA"
                                compliance={65}
                                controls={{ passed: 32, total: 49 }}
                                selected={selectedFramework === 'hipaa'}
                                onClick={() => setSelectedFramework('hipaa')}
                            />
                            <FrameworkCard
                                name="ISO 27001"
                                compliance={15}
                                controls={{ passed: 18, total: 114 }}
                                selected={selectedFramework === 'iso'}
                                onClick={() => setSelectedFramework('iso')}
                            />
                        </div>
                    </div>
                    <div className="mt-auto p-8 border-t border-[#30363d]">
                        <div className="bg-[#161b22]/50 rounded-xl p-5 border border-[#30363d] space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Vulnerabilities</span>
                                <span className="text-red-400 font-bold text-xs">12 Critical</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Last Audit</span>
                                <span className="text-white font-bold text-xs">09m 14s ago</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content - Compliance Issues */}
                <section className="flex-1 flex flex-col bg-[#0a0c10] overflow-hidden relative">
                    <div className="p-10 border-b border-[#30363d] bg-[#0d1117]/50 relative z-10">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h1 className="text-4xl font-bold mb-3 tracking-tight">
                                    SOC2 Type II <span className="text-primary">Audit</span>
                                </h1>
                                <p className="text-slate-500 max-w-2xl leading-relaxed">
                                    Continuous monitoring and automated remediation for SOC2 compliance. Our AI agents identify risks and provide instantaneous patching instructions.
                                </p>
                            </div>
                            <div className="flex gap-10">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white">124</div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Passing</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-yellow-500">14</div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Warn</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-red-500">08</div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Critical</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex bg-[#161b22] p-1 rounded-lg border border-[#30363d]">
                                <button className="px-5 py-1.5 text-xs font-bold bg-[#30363d] text-white rounded-md shadow-sm">All Gaps</button>
                                <button className="px-5 py-1.5 text-xs font-bold text-slate-500 hover:text-white transition-colors">Critical Only</button>
                                <button className="px-5 py-1.5 text-xs font-bold text-slate-500 hover:text-white transition-colors">Auto-fixable</button>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] font-bold text-slate-500 uppercase">Sort By</span>
                                <select className="bg-[#161b22] border-[#30363d] text-xs font-bold rounded-lg px-4 py-2 text-white/80">
                                    <option>Severity: High to Low</option>
                                    <option>Resource Type</option>
                                    <option>Time Discovered</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
                        <div className="space-y-6 max-w-6xl mx-auto pb-20">
                            <h4 className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[#30363d]" />
                                Remediation Action Center
                            </h4>
                            <ComplianceItem
                                title="Unencrypted S3 Bucket"
                                resource="prod-user-assets-01"
                                severity="critical"
                                control="Control CC6.1"
                                description="Sensitive PII identified in non-encrypted storage. This violates SOC2 data protection requirements and HIPAA §164.312. Exposure duration: 14h 22m."
                                provider="AWS Cloud"
                                onFix={() => navigate('/blueprint')}
                            />
                            <ComplianceItem
                                title="Permissive Inbound Rules"
                                resource="API-Gateway-SG"
                                severity="warning"
                                control="Control CC6.6"
                                description="Port 22 (SSH) is open to 0.0.0.0/0 on the application tier. Increasing attack surface for brute-force attempts."
                                provider="Azure VNET"
                                onFix={() => navigate('/blueprint')}
                            />
                            <ComplianceItem
                                title="CloudTrail Logging Status"
                                resource="Global Trail"
                                severity="resolved"
                                control="Control CC7.2"
                                description="The Security Agent has enabled global trail logging and configured encryption via KMS across all regions."
                                provider="AWS Cloud"
                                onFix={() => { }}
                            />
                        </div>
                    </div>
                </section>

                {/* Right Sidebar - Framework Details */}
                <aside className="w-[400px] bg-[#0a0c10] border-l border-[#30363d] flex flex-col shrink-0 overflow-hidden">
                    <div className="p-8 border-b border-[#30363d] bg-[#0d1117]/30">
                        <h3 className="text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-8">Framework Readiness</h3>
                        <div className="flex flex-col items-center py-6 relative">
                            <div className="relative size-48 flex items-center justify-center">
                                <svg className="size-full transform -rotate-90">
                                    <circle cx="96" cy="96" fill="transparent" r="85" stroke="#30363d" strokeWidth="14" />
                                    <circle
                                        className="drop-shadow-[0_0_8px_rgba(19,109,236,0.4)]"
                                        cx="96" cy="96" fill="transparent" r="85" stroke="#136dec"
                                        strokeDasharray="534" strokeDashoffset="43" strokeLinecap="round" strokeWidth="14"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold tracking-tight">92%</span>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Audit Ready</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
                        <div>
                            <h4 className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] border-b border-[#30363d] pb-4 mb-6">Control Domains</h4>
                            <div className="space-y-6">
                                {[
                                    { name: 'Org & Management', pct: 100, color: 'emerald' },
                                    { name: 'Logical & Physical Access', pct: 84, color: 'primary' },
                                    { name: 'System Operations', pct: 91, color: 'primary' },
                                    { name: 'Change Management', pct: 62, color: 'yellow' },
                                ].map((domain) => (
                                    <div className="space-y-3" key={domain.name}>
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-white/90">{domain.name}</span>
                                            <span className={`text-${domain.color}-400`}>{domain.pct}%</span>
                                        </div>
                                        <div className="w-full bg-[#30363d] h-1.5 rounded-full overflow-hidden">
                                            <div className={`bg-${domain.color}-500 h-full`} style={{ width: `${domain.pct}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] border-b border-[#30363d] pb-4 mb-6">Security Agent Feed</h4>
                            <div className="space-y-5">
                                <div className="flex gap-4">
                                    <div className="size-2.5 rounded-full bg-primary mt-1.5 animate-pulse" />
                                    <div>
                                        <p className="text-xs text-white/90 font-semibold mb-1">Scanning multi-cloud assets...</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Azure West Europe · 2s ago</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="size-2.5 rounded-full bg-emerald-500 mt-1.5" />
                                    <div>
                                        <p className="text-xs text-white/90 font-semibold mb-1">Auto-remediation successful</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">IAM Policy 'readonly-eng' · 12m ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 border-t border-[#30363d] bg-[#0d1117]/50 backdrop-blur-sm space-y-4">
                        <button className="w-full py-4 bg-[#161b22] border border-[#30363d] rounded-xl text-sm font-bold hover:bg-[#30363d] transition-all text-white/90 flex items-center justify-center gap-2">
                            <Icon name="download" className="text-lg" />
                            Export Audit Report
                        </button>
                        <button className="w-full py-4 bg-primary rounded-xl text-sm font-bold hover:bg-blue-600 transition-all text-white shadow-lg shadow-primary/20">
                            Seal & Request Auditor Access
                        </button>
                    </div>
                </aside>
            </main>

            {/* Footer */}
            <footer className="h-10 bg-[#0a0c10] border-t border-[#30363d] px-8 flex items-center justify-between text-[10px] font-bold text-slate-500 tracking-widest uppercase shrink-0">
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
                        <span>Security Engine: Optimal</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon name="verified" className="text-[14px]" />
                        <span>Continuous Monitoring Active</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <span>Region: Global</span>
                    <span className="text-primary hover:text-white transition-colors cursor-pointer">Security Center Docs</span>
                </div>
            </footer>
        </div>
    )
}
