import React from 'react'
import { Header, Icon } from '../components'

export const AuditLogs: React.FC = () => {
    return (
        <div className="bg-background-dark font-display text-slate-300 min-h-screen">
            <Header />
            <main className="max-w-[1400px] mx-auto px-8 py-8">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-2">
                            <Icon name="history_edu" className="text-sm" /> Transparency Layer
                        </div>
                        <h1 className="text-3xl font-black text-white mb-2">Agent Orchestration Audit</h1>
                        <p className="text-sm text-slate-500">
                            Session: <span className="font-mono text-slate-300">AX-9021-MAADS</span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors">
                            <Icon name="download" className="mr-2 text-lg" /> Export
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <aside className="lg:col-span-3">
                        <div className="bg-surface-dark rounded-xl border border-slate-800 p-4 space-y-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Event Chain
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shadow-[0_0_8px_rgba(19,109,236,0.6)]"></div>
                                    <span className="text-sm font-bold">Interpret Intent</span>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shadow-[0_0_8px_rgba(19,109,236,0.6)]"></div>
                                    <span className="text-sm font-bold">Architect Generation</span>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shadow-[0_0_8px_rgba(19,109,236,0.6)]"></div>
                                    <span className="text-sm font-bold">Cost Optimization</span>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
                                    <span className="text-sm font-bold text-amber-500">Security Alert</span>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></div>
                                    <span className="text-sm font-bold text-emerald-500">Deployment Success</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <section className="lg:col-span-9 space-y-6">
                        <div className="bg-surface-dark rounded-xl border border-slate-800 overflow-hidden shadow-sm">
                            <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/30">
                                <h4 className="text-sm font-bold">
                                    LLM Reasoning Chain:{' '}
                                    <span className="text-slate-500 font-normal">security_verifier_04</span>
                                </h4>
                            </div>
                            <div className="p-6">
                                <div className="bg-slate-950 rounded-lg p-5 border border-slate-800 font-mono text-sm leading-relaxed text-slate-300">
                                    <div className="flex gap-4 mb-2">
                                        <span className="text-slate-600">[09:41:20]</span>{' '}
                                        <span className="text-emerald-400">INFO</span> Analyzing AWS::VPC schema...
                                    </div>
                                    <div className="flex gap-4 mb-2">
                                        <span className="text-slate-600">[09:41:21]</span>{' '}
                                        <span className="text-amber-400">WARN</span> Violation of SEC-NET-004: Public DB
                                        found.
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-slate-600">[09:41:21]</span>{' '}
                                        <span className="text-rose-400">ACT</span> Emitting REJECTION_SIGNAL. Routing to
                                        private layer.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface-dark rounded-xl border border-slate-800 overflow-hidden shadow-sm">
                            <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/30">
                                <h4 className="text-sm font-bold">
                                    Agent Decision:{' '}
                                    <span className="text-slate-500 font-normal">cost_optimizer_02</span>
                                </h4>
                            </div>
                            <div className="p-6">
                                <div className="bg-slate-950 rounded-lg p-5 border border-slate-800 font-mono text-sm leading-relaxed text-slate-300">
                                    <div className="flex gap-4 mb-2">
                                        <span className="text-slate-600">[09:42:15]</span>{' '}
                                        <span className="text-emerald-400">INFO</span> Scanning for cost inefficiencies...
                                    </div>
                                    <div className="flex gap-4 mb-2">
                                        <span className="text-slate-600">[09:42:17]</span>{' '}
                                        <span className="text-blue-400">RECOM</span> EC2 instances underutilized. Suggesting
                                        m5.large → t3.xlarge
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-slate-600">[09:42:18]</span>{' '}
                                        <span className="text-emerald-400">SAVE</span> Estimated monthly savings: $840.00
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
