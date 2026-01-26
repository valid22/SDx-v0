import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Header, Icon, Sidebar } from '../components'

export const ProjectInitiation: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const initialIntent = (location.state as any)?.intent || ''
    const [intent, setIntent] = useState(initialIntent)

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col relative overflow-hidden grid-bg">
                <Header step="STEP 01" title="Project Initiation" nextLabel="Generate Plan" nextPath="/designer" />
                <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                    <div className="max-w-5xl mx-auto space-y-16">
                        <section>
                            <div className="mb-10">
                                <h2 className="text-4xl font-bold tracking-tight mb-3">Define Infrastructure Intent</h2>
                                <p className="text-zinc-400 text-lg">
                                    Speak naturally to describe your target architecture.
                                </p>
                            </div>
                            <div className="glass-panel rounded-xl overflow-hidden shadow-2xl">
                                <div className="p-6">
                                    <textarea
                                        value={intent}
                                        onChange={(e) => setIntent(e.target.value)}
                                        className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-xl text-white placeholder:text-zinc-600 font-normal leading-relaxed resize-none h-32 font-mono"
                                        placeholder="Deploy a high-availability EKS cluster in AWS with managed RDS (PostgreSQL 14)..."
                                    />
                                </div>
                                <div className="px-6 py-4 bg-white/5 border-t border-border-dark flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <button className="text-zinc-500 hover:text-primary transition-colors flex items-center gap-1.5">
                                            <Icon name="description" className="text-[20px]" />
                                            <span className="text-[10px] font-bold uppercase">Templates</span>
                                        </button>
                                        <button className="text-zinc-500 hover:text-primary transition-colors flex items-center gap-1.5">
                                            <Icon name="shield_lock" className="text-[20px]" />
                                            <span className="text-[10px] font-bold uppercase">Hardening</span>
                                        </button>
                                        <div className="h-4 w-[1px] bg-zinc-800"></div>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-primary/10 text-primary border border-primary/20">
                                            AWS LATEST
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => navigate('/designer', { state: { intent } })}
                                        className="bg-white hover:bg-primary text-black hover:text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2"
                                    >
                                        Generate Plan <Icon name="bolt" className="text-[18px]" />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
