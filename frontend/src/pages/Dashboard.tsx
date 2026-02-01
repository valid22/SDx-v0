import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../components'

interface ProjectCardProps {
    title: string
    provider: string
    status: 'Active' | 'Draft' | 'Error'
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, provider, status }) => {
    const statusConfig = {
        Active: { color: 'emerald', icon: 'check_circle' },
        Draft: { color: 'slate', icon: 'edit' },
        Error: { color: 'red', icon: 'error' },
    }
    const config = statusConfig[status]

    return (
        <div className="group flex flex-col bg-[#161b22] border border-[#30363d] rounded-xl p-5 hover:border-primary/50 transition-all cursor-pointer shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 bg-${config.color}-500/10 rounded-lg`}>
                    <Icon name="storage" className={`text-${config.color}-500`} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-${config.color}-500/20 text-${config.color}-400 uppercase`}>
                    {status}
                </span>
            </div>
            <h3 className="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-slate-400 text-sm mb-4">{provider} • us-east-1</p>
            <div className="mt-auto pt-4 border-t border-[#30363d] flex justify-between items-center text-xs text-slate-400">
                <span>Modified 2h ago</span>
                <Icon name="more_horiz" className="text-[18px]" />
            </div>
        </div>
    )
}

export const Dashboard: React.FC = () => {
    const navigate = useNavigate()
    const [intent, setIntent] = useState('')
    const [apiKey, setApiKey] = useState(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('gemini_api_key') || ''
        }
        return ''
    })
    const [showApiKey, setShowApiKey] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = () => {
        if (intent.trim() && apiKey.trim()) {
            // Store API key in session storage
            sessionStorage.setItem('gemini_api_key', apiKey.trim())
            setIsLoading(true)
            setTimeout(() => {
                navigate('/designer', { state: { intent } })
            }, 1500)
        }
    }

    return (
        <div className="flex h-screen flex-col bg-[#0a0c10]">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-[#30363d] px-8 py-4 bg-[#0a0c10]/80 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="size-8 text-primary">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor" />
                        </svg>
                    </div>
                    <h2 className="text-white text-2xl font-bold tracking-tight">MAADS</h2>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-slate-400 hover:text-white transition-colors px-4 py-2 text-sm font-medium">
                        Docs
                    </button>
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#30363d]"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzVUymP31yDaFqALYByFfyBMRhx36E832lBl9b11Wn36DsO55TFh8lI0QGU4CKaZoj1oa4cZ9YxBEA5kGjJC64X-7doD2PuqyRmShHUnTV3RerEkQP9XOR31lpCeEiis8OKJpwDuAikJl1qo2uF82OU03VijBrv8KPbq_Hgm5t5AA5XHyIFclEc3HQ4oiTkzuxkESi_KIR6oBAypxmkFpfMxBsWXG1EyFhgQNCgPBStdz84DrxKF6WQpHfyP6zn1Jv-yK7d80lixU")' }}
                    />
                </div>
            </header>

            <main className="flex-1 overflow-y-auto">
                {/* Hero Section */}
                <section className="pt-20 pb-16 px-8 bg-gradient-to-b from-primary/5 to-transparent">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl font-bold tracking-tight mb-6 text-white">
                            What do you want to <span className="text-primary">build</span> today?
                        </h1>
                        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                            Describe your infrastructure in natural language. Our AI agents will design,
                            optimize, and secure your cloud architecture automatically.
                        </p>

                        {/* API Key Input */}
                        <div className="max-w-3xl mx-auto mb-6">
                            <div className="flex items-center gap-3 bg-[#161b22] border border-[#30363d] rounded-xl px-4 py-3">
                                <Icon name="key" className="text-primary text-xl" />
                                <input
                                    type={showApiKey ? 'text' : 'password'}
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="Enter your Gemini API key..."
                                    className="flex-1 bg-transparent text-white placeholder:text-slate-500 focus:outline-none font-mono text-sm"
                                />
                                <button
                                    onClick={() => setShowApiKey(!showApiKey)}
                                    className="text-slate-500 hover:text-white transition-colors"
                                >
                                    <Icon name={showApiKey ? 'visibility_off' : 'visibility'} className="text-xl" />
                                </button>
                                {apiKey && (
                                    <span className="text-emerald-500 text-[10px] font-bold uppercase flex items-center gap-1">
                                        <Icon name="check_circle" className="text-sm" />
                                        Ready
                                    </span>
                                )}
                                <a
                                    href="https://aistudio.google.com/apikey"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] text-primary hover:underline font-medium"
                                >
                                    Get Key
                                </a>
                            </div>
                        </div>

                        {/* Intent Input */}
                        <div className="relative max-w-3xl mx-auto">
                            <div className={`bg-[#161b22] border ${isLoading ? 'border-primary' : 'border-[#30363d]'} rounded-2xl overflow-hidden shadow-2xl transition-all ${isLoading ? 'ring-4 ring-primary/20' : ''}`}>
                                <div className="p-6">
                                    <textarea
                                        value={intent}
                                        onChange={(e) => setIntent(e.target.value)}
                                        disabled={isLoading}
                                        className="w-full bg-transparent border-none text-white text-lg placeholder:text-slate-500 focus:ring-0 focus:outline-none resize-none h-32 disabled:opacity-50"
                                        placeholder="Deploy a scalable Kubernetes cluster on AWS with a managed PostgreSQL database, auto-scaling, and SOC2 compliance..."
                                    />
                                </div>
                                <div className="flex items-center justify-between px-6 pb-6 pt-2 border-t border-[#30363d]">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold px-3 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                                            AWS
                                        </span>
                                        <span className="text-[10px] font-bold px-3 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                            GCP
                                        </span>
                                        <span className="text-[10px] font-bold px-3 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                            Azure
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!intent.trim() || !apiKey.trim() || isLoading}
                                        className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <span>Generate Infrastructure</span>
                                                <Icon name="auto_awesome" className="text-lg" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Loading overlay */}
                            {isLoading && (
                                <div className="absolute inset-0 bg-[#0a0c10]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="size-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                        <p className="text-white font-bold">Initializing AI Agents...</p>
                                        <p className="text-slate-400 text-sm mt-2">Parsing intent and generating architecture</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick actions */}
                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            <button
                                onClick={() => setIntent('Deploy a secure 3-tier VPC with auto-scaling EC2 instances')}
                                className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg text-sm text-slate-300 hover:border-primary/50 transition-all"
                            >
                                <Icon name="cloud" className="text-primary text-sm" />
                                3-Tier VPC
                            </button>
                            <button
                                onClick={() => setIntent('Set up a Kubernetes cluster with managed database and Redis cache')}
                                className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg text-sm text-slate-300 hover:border-primary/50 transition-all"
                            >
                                <Icon name="hub" className="text-primary text-sm" />
                                K8s Cluster
                            </button>
                            <button
                                onClick={() => setIntent('Create a serverless data pipeline with S3, Lambda, and DynamoDB')}
                                className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg text-sm text-slate-300 hover:border-primary/50 transition-all"
                            >
                                <Icon name="bolt" className="text-primary text-sm" />
                                Serverless Pipeline
                            </button>
                        </div>
                    </div>
                </section>

                {/* Recent Projects */}
                <section className="px-8 pb-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-white">Recent Projects</h2>
                            <button className="text-primary text-sm font-bold hover:underline">View All</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <ProjectCard title="Alpha-API-Production" provider="AWS" status="Active" />
                            <ProjectCard title="Marketing-Data-Stack" provider="GCP" status="Draft" />
                            <ProjectCard title="Internal-Auth-Service" provider="Azure" status="Error" />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
