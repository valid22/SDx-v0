< !DOCTYPE html >
    <html class="dark" lang="en">
        <head>
            <meta charset="utf-8" />
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <title>MAADS | AI Cloud Infrastructure Orchestrator</title>
            <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">

                <script>
                    tailwind.config = {
                        darkMode: "class",
                    theme: {
                        extend: {
                        colors: {
                        "primary": "#136dec",
                    "accent": "#7000ff",
                    "background-light": "#f6f7f8",
                    "background-dark": "#0a0c10",
                    "surface-dark": "#161b22",
                    "border-muted": "#30363d",
                    "panel-bg": "#111418",
                    "vpc-border": "#ff4d94",
                    "subnet-border": "#f97316",
                    "card-bg": "#1c2027",
                    "border-dark": "#1f2937",
                    "accent-cyan": "#0ea5e9",
                    },
                    fontFamily: {
                        "display": ["Space Grotesk", "sans-serif"],
                    "sans": ["Inter", "sans-serif"],
                    "mono": ["JetBrains Mono", "monospace"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                    "md": "0.375rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "2xl": "1rem",
                    "full": "9999px"
                    },
                },
            },
        }
                </script>
                <style type="text/tailwindcss">
                    @layer base {
                        body {@apply font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white; }
        }
                    .intent-gradient {
                        background: linear-gradient(180deg, rgba(19, 109, 236, 0.05) 0%, rgba(16, 24, 34, 0) 100%);
        }
                    .grid-bg {
                        background - image: radial-gradient(circle at 2px 2px, #1a1a1a 1px, transparent 0);
                    background-size: 32px 32px;
        }
                    .custom-scrollbar::-webkit-scrollbar {width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track {background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb {background: #2d333b; border-radius: 10px; }

                    .flow-line {stroke: #136dec; stroke-width: 1.5; stroke-dasharray: 6 4; fill: none; opacity: 0.6; }
                    .flow-line-active {stroke: #136dec; stroke-width: 2; fill: none; filter: drop-shadow(0 0 4px #136dec); }

                    .glass-panel {
                        background: rgba(22, 27, 34, 0.7);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(48, 54, 61, 0.8);
        }
                    input[type=range] {-webkit - appearance: none; background: transparent; }
                    input[type=range]::-webkit-slider-runnable-track {width: 100%; height: 4px; background: #1f2937; border-radius: 2px; }
                    input[type=range]::-webkit-slider-thumb {
                        -webkit - appearance: none; height: 18px; width: 18px; border-radius: 2px;
                    background: #136dec; cursor: pointer; margin-top: -7px;
                    box-shadow: 0 0 15px rgba(19, 109, 236, 0.6); border: 2px solid white;
        }
                </style>
        </head>
        <body class="dark overflow-hidden">
            <div id="root"></div>

            <!-- Libraries -->
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/history@5/umd/history.development.js"></script>
            <script src="https://unpkg.com/react-router@6.3.0/umd/react-router.development.js"></script>
            <script src="https://unpkg.com/react-router-dom@6.3.0/umd/react-router-dom.development.js"></script>
            <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

            <script type="text/babel">
                const {useState, useEffect} = React;
                const {createRoot} = ReactDOM;
                const {MemoryRouter, Routes, Route, Link, useNavigate, useLocation} = ReactRouterDOM;

                // --- Common Components ---
                const Header = ({step, title, nextLabel, nextPath}) => {
            const navigate = useNavigate();
                return (
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#282f39] px-6 md:px-10 py-3 bg-background-light dark:bg-background-dark sticky top-0 z-50">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-3 text-primary">
                            <div className="size-8">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">MAADS</h2>
                        </Link>
                        {step && (
                            <div className="hidden md:flex items-center gap-4">
                                <div className="h-6 w-px bg-slate-700"></div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{step}</span>
                                    <span className="text-sm font-medium text-slate-300">{title}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-1 justify-end gap-4 items-center">
                        <div className="hidden lg:flex gap-4 mr-4">
                            <Link to="/audit" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">Audit Logs</Link>
                            <Link to="/cost" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">Pricing</Link>
                        </div>
                        {nextLabel && (
                            <button
                                onClick={() => navigate(nextPath)}
                                className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-2"
                            >
                                {nextLabel}
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        )}
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzVUymP31yDaFqALYByFfyBMRhx36E832lBl9b11Wn36DsO55TFh8lI0QGU4CKaZoj1oa4cZ9YxBEA5kGjJC64X-7doD2PuqyRmShHUnTV3RerEkQP9XOR31lpCeEiis8OKJpwDuAikJl1qo2uF82OU03VijBrv8KPbq_Hgm5t5AA5XHyIFclEc3HQ4oiTkzuxkESi_KIR6oBAypxmkFpfMxBsWXG1EyFhgQNCgPBStdz84DrxKF6WQpHfyP6zn1Jv-yK7d80lixU")' }}></div>
                    </div>
                </header>
                );
        };

        // --- Screen Components ---

        const Dashboard = () => {
            const navigate = useNavigate();
                return (
                <div className="flex h-screen flex-col">
                    <Header />
                    <main className="flex-1 overflow-y-auto pb-20">
                        <section className="intent-gradient pt-12 pb-16 px-6">
                            <div className="max-w-[840px] mx-auto flex flex-col items-center">
                                <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl md:text-4xl font-bold leading-tight text-center mb-8">
                                    What do you want to build today?
                                </h1>
                                <div className="w-full">
                                    <div className="flex flex-col w-full rounded-xl overflow-hidden border border-slate-200 dark:border-[#3b4554] bg-white dark:bg-[#1c2027] shadow-2xl focus-within:border-primary transition-all">
                                        <div className="flex items-start p-4 md:p-6 gap-4">
                                            <div className="bg-primary/10 rounded-full p-2 shrink-0 hidden sm:block">
                                                <span className="material-symbols-outlined text-primary text-[28px]">rocket_launch</span>
                                            </div>
                                            <textarea className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden bg-transparent border-none text-slate-900 dark:text-white focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-[#556377] text-lg font-normal leading-relaxed pt-1" placeholder="e.g., Deploy a scalable Kubernetes cluster on AWS with a managed RDS instance..." rows="3"></textarea>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-between px-4 pb-4 md:px-6 md:pb-6 pt-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"><span className="material-symbols-outlined">cloud_upload</span></button>
                                                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"><span className="material-symbols-outlined">shield</span></button>
                                                <div className="w-px h-6 bg-slate-700 mx-1"></div>
                                                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-primary font-bold">AWS</span>
                                            </div>
                                            <button
                                                onClick={() => navigate('/initiate')}
                                                className="min-w-[180px] inline-flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 shadow-lg"
                                            >
                                                <span>Generate Infrastructure</span>
                                                <span className="material-symbols-outlined ml-2 text-[20px]">auto_awesome</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-center gap-3 mt-6">
                                    <button className="flex h-8 items-center gap-x-2 rounded-full bg-slate-100 dark:bg-[#282f39] px-4 text-slate-600 dark:text-white text-xs font-medium hover:border-primary border border-transparent transition-all">
                                        <span className="material-symbols-outlined text-[14px]">call_split</span> Auto-scaling
                                    </button>
                                    <button className="flex h-8 items-center gap-x-2 rounded-full bg-slate-100 dark:bg-[#282f39] px-4 text-slate-600 dark:text-white text-xs font-medium hover:border-primary border border-transparent transition-all">
                                        <span className="material-symbols-outlined text-[14px]">lock</span> Secure VPC
                                    </button>
                                </div>
                            </div>
                        </section>
                        <div className="max-w-[960px] mx-auto px-6 space-y-12">
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-slate-900 dark:text-white text-2xl font-bold">Recent Projects</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <ProjectCard title="Alpha-API-Production" provider="AWS" status="Active" statusColor="green" />
                                    <ProjectCard title="Marketing-Data-Stack" provider="GCP" status="Draft" statusColor="slate" />
                                    <ProjectCard title="Internal-Auth-Service" provider="Azure" status="Error" statusColor="red" />
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
                );
        };

                const ProjectCard = ({title, provider, status, statusColor}) => (
                <div className="group flex flex-col bg-white dark:bg-[#1c2027] border border-slate-200 dark:border-[#282f39] rounded-xl p-5 hover:border-primary/50 transition-all cursor-pointer shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 bg-${statusColor}-500/10 rounded-lg`}>
                            <span className={`material-symbols-outlined text-${statusColor}-500`}>storage</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-${statusColor}-500/20 text-${statusColor}-500 uppercase`}>{status}</span>
                    </div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{provider} • us-east-1</p>
                    <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                        <span>Modified 2h ago</span>
                        <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                    </div>
                </div>
                );

        const ProjectInitiation = () => {
            const navigate = useNavigate();
                return (
                <div className="flex h-screen overflow-hidden">
                    <aside className="w-64 border-r border-border-dark bg-surface-dark flex flex-col z-50 shrink-0">
                        <div className="p-6 flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                                <span className="material-symbols-outlined text-black font-bold">terminal</span>
                            </div>
                            <h1 className="text-xl font-bold tracking-tighter uppercase font-mono">Masda</h1>
                        </div>
                        <nav className="flex-1 px-4 py-4 space-y-1">
                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-2">Navigation</div>
                            <a className="flex items-center gap-3 px-3 py-2 text-primary bg-primary/5 border border-primary/20 rounded-md"><span className="material-symbols-outlined text-[20px]">grid_view</span><span className="text-sm">Projects</span></a>
                            <a className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white"><span className="material-symbols-outlined text-[20px]">payments</span><span className="text-sm">Cost</span></a>
                            <a className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white"><span className="material-symbols-outlined text-[20px]">gpp_good</span><span className="text-sm">Security</span></a>
                        </nav>
                    </aside>
                    <main className="flex-1 flex flex-col relative overflow-hidden grid-bg">
                        <Header step="STEP 01" title="Project Initiation" nextLabel="Generate Plan" nextPath="/designer" />
                        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                            <div className="max-w-5xl mx-auto space-y-16">
                                <section>
                                    <div className="mb-10">
                                        <h2 className="text-4xl font-bold tracking-tight mb-3">Define Infrastructure Intent</h2>
                                        <p className="text-zinc-400 text-lg">Speak naturally to describe your target architecture.</p>
                                    </div>
                                    <div className="glass-panel rounded-xl overflow-hidden shadow-2xl border-border-dark">
                                        <div className="p-6">
                                            <textarea className="w-full bg-transparent border-none focus:ring-0 text-xl text-white placeholder:text-zinc-600 font-normal leading-relaxed resize-none h-32 font-mono" placeholder="Deploy a high-availability EKS cluster in AWS with managed RDS (PostgreSQL 14)..."></textarea>
                                        </div>
                                        <div className="px-6 py-4 bg-white/5 border-t border-border-dark flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <button className="text-zinc-500 hover:text-primary transition-colors flex items-center gap-1.5"><span className="material-symbols-outlined text-[20px]">description</span><span className="text-[10px] font-bold uppercase">Templates</span></button>
                                                <button className="text-zinc-500 hover:text-primary transition-colors flex items-center gap-1.5"><span className="material-symbols-outlined text-[20px]">shield_lock</span><span className="text-[10px] font-bold uppercase">Hardening</span></button>
                                                <div className="h-4 w-[1px] bg-zinc-800"></div>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-primary/10 text-primary border border-primary/20">AWS LATEST</span>
                                            </div>
                                            <button onClick={() => navigate('/designer')} className="bg-white hover:bg-primary text-black px-8 py-3 rounded text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2">
                                                Generate Plan <span className="material-symbols-outlined text-[18px]">bolt</span>
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </main>
                </div>
                );
        };

        const ArchitectureDesigner = () => {
            const navigate = useNavigate();
                return (
                <div className="bg-background-dark text-slate-200 overflow-hidden h-screen flex flex-col">
                    <Header step="STEP 02" title="Architecture Synthesis" nextLabel="Validate Topology" nextPath="/topology" />
                    <main className="flex-1 flex overflow-hidden">
                        <aside className="w-72 bg-background-dark border-r border-border-dark flex flex-col shrink-0">
                            <div className="p-4 border-b border-border-dark">
                                <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">AI Agent Execution</h3>
                                <div className="space-y-4">
                                    <ExecutionStep title="Intent Parser" status="DONE" active={false} done={true} />
                                    <ExecutionStep title="Infra Agent" status="RUNNING" active={true} />
                                    <ExecutionStep title="Cost Agent" status="PENDING" active={false} />
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col min-h-0 bg-[#070b10] p-4 font-mono text-[11px]">
                                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1 text-slate-500">
                                    <p><span className="text-primary">[14:20:01]</span> Fetching cloud credentials...</p>
                                    <p><span className="text-primary">[14:20:04]</span> Analyzing intent: "Secure 3-tier VPC"</p>
                                    <p><span className="text-primary">[14:20:09]</span> Graph generated (12 nodes, 18 edges)</p>
                                    <p className="animate-pulse text-white">_</p>
                                </div>
                            </div>
                        </aside>
                        <section className="flex-1 relative flex flex-col bg-background-dark grid-bg items-center justify-center p-20 overflow-hidden">
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                                <path d="M400,300 Q500,300 600,200" fill="none" stroke="#136dec" strokeDasharray="4 2" strokeWidth="2"></path>
                                <path d="M600,200 L800,200" fill="none" stroke="#136dec" strokeWidth="2"></path>
                            </svg>
                            <div className="grid grid-cols-3 gap-32 relative z-10">
                                <NodeBox title="Main VPC" icon="cloud" />
                                <NodeBox title="App Tier" icon="memory" highlight={true} />
                                <NodeBox title="Data Lake" icon="folder_open" />
                            </div>
                        </section>
                        <aside className="w-[400px] bg-background-dark border-l border-border-dark flex flex-col shrink-0">
                            <div className="p-6 border-b border-border-dark">
                                <h2 className="text-xl font-bold font-display text-white">AWS EC2 Instance</h2>
                                <p className="text-xs text-slate-500 mt-1 uppercase font-bold">Resource Details</p>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                <div className="p-3 bg-surface-dark rounded-lg border border-border-dark">
                                    <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Instance Type</p>
                                    <p className="text-sm font-medium text-slate-200">m5.large (2 vCPU, 8GB RAM)</p>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-border-dark pb-2">Compliance Mapping</h4>
                                    <div className="flex items-center gap-3 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                                        <span className="material-symbols-outlined text-green-500">verified_user</span>
                                        <div>
                                            <p className="text-xs font-bold text-slate-200">SOC2 Compliance</p>
                                            <p className="text-[10px] text-slate-500">Audit logging enabled</p>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => navigate('/compliance')} className="w-full py-3 bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase rounded-lg hover:bg-primary/20 transition-all">Remediate Issues</button>
                            </div>
                        </aside>
                    </main>
                </div>
                );
        };

                const ExecutionStep = ({title, status, active, done}) => (
                <div className={`relative pl-7 pb-4 border-l ${done ? 'border-primary/30' : 'border-border-dark'}`}>
                    <div className={`absolute -left-[5px] top-0 size-2.5 rounded-full ${active ? 'bg-primary animate-pulse shadow-[0_0_8px_rgba(19,109,236,0.5)]' : done ? 'bg-primary' : 'bg-border-dark'}`}></div>
                    <div className={`flex flex-col gap-0.5 ${!active && !done ? 'opacity-50' : ''}`}>
                        <div className="flex items-center justify-between">
                            <span className="text-white text-sm font-bold">{title}</span>
                            <span className="text-primary text-[10px] font-bold">{status}</span>
                        </div>
                    </div>
                </div>
                );

                const NodeBox = ({title, icon, highlight}) => (
                <div className={`relative bg-surface-dark/90 backdrop-blur-md border-2 ${highlight ? 'border-primary ring-4 ring-primary/10' : 'border-border-dark'} rounded-xl p-4 w-48 shadow-2xl`}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`size-8 ${highlight ? 'bg-primary' : 'bg-slate-700'} rounded-lg flex items-center justify-center`}>
                            <span className="material-symbols-outlined text-white text-lg">{icon}</span>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-tight text-white">{title}</h4>
                            <p className="text-[10px] text-slate-500">us-east-1</p>
                        </div>
                    </div>
                </div>
                );

        const TopologyMap = () => {
            const navigate = useNavigate();
                return (
                <div className="bg-background-dark text-white overflow-hidden h-screen flex flex-col">
                    <Header step="STEP 03" title="Topology Validation" nextLabel="Compliance Audit" nextPath="/compliance" />
                    <main className="flex-1 flex overflow-hidden">
                        <aside className="w-80 bg-panel-bg border-r border-border-muted flex flex-col shrink-0">
                            <div className="p-5 border-b border-border-muted font-mono text-[11px]">
                                <span className="text-[#9da8b9] uppercase text-[10px] font-bold tracking-widest">Network Event Log</span>
                                <div className="mt-4 space-y-2 text-[#7d8898]">
                                    <p><span className="text-primary/70">[10:14:02]</span> <span className="text-white">SCAN:</span> Mapping Region...</p>
                                    <p><span className="text-primary/70">[10:14:05]</span> <span className="text-white">FOUND:</span> vpc-0a2b3c</p>
                                    <p><span className="text-primary/70">[10:14:15]</span> <span className="text-yellow-500">WARN:</span> NACL-99 permissive</p>
                                </div>
                            </div>
                        </aside>
                        <section className="flex-1 relative flex flex-col bg-background-dark grid-bg items-center justify-center">
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                <path className="flow-line-active" d="M250,450 Q350,450 450,450"></path>
                                <path className="flow-line" d="M650,400 L750,300"></path>
                            </svg>
                            <div className="relative z-10 flex gap-12 items-center">
                                <div className="border border-vpc-border/40 border-dashed rounded-xl p-16 bg-vpc-border/[0.03] relative backdrop-blur-[2px]">
                                    <div className="absolute -top-3 left-10 bg-vpc-border text-white px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">Production VPC</div>
                                    <div className="flex gap-16">
                                        <div className="bg-card-bg border border-border-muted p-4 rounded-md w-44">
                                            <h4 className="text-[11px] font-bold">ALB-External</h4>
                                            <p className="text-[9px] text-[#9da8b9]">Load Balancer</p>
                                        </div>
                                        <div className="bg-card-bg border-2 border-primary p-4 rounded-md w-44 ring-4 ring-primary/10">
                                            <h4 className="text-[11px] font-bold">App Tier Cluster</h4>
                                            <p className="text-[9px] text-primary font-bold">v1.2.4 Active</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
                );
        };

        const ComplianceCenter = () => {
            const navigate = useNavigate();
                return (
                <div className="bg-background-dark text-white overflow-hidden h-screen flex flex-col">
                    <Header step="STEP 04" title="Security & Compliance Audit" nextLabel="Cost Optimization" nextPath="/cost" />
                    <main className="flex-1 flex overflow-hidden">
                        <aside className="w-80 bg-background-dark border-r border-border-muted flex flex-col p-8">
                            <h3 className="text-[#8b949e] text-[11px] font-bold uppercase tracking-[0.2em] mb-8">Framework Readiness</h3>
                            <div className="p-5 bg-primary/5 border border-primary/40 rounded-xl cursor-pointer ring-1 ring-primary/20">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-white font-bold text-sm">SOC2 Type II</span>
                                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                </div>
                                <div className="w-full bg-border-muted h-1 rounded-full mb-3">
                                    <div className="bg-primary w-[92%] h-full rounded-full"></div>
                                </div>
                            </div>
                        </aside>
                        <section className="flex-1 flex flex-col bg-[#0a0c10] overflow-hidden relative p-10">
                            <h1 className="text-4xl font-bold font-display mb-3 tracking-tight">SOC2 Type II <span className="text-primary">Audit</span></h1>
                            <div className="flex-1 overflow-y-auto mt-10 space-y-6 max-w-6xl">
                                <div className="glass-panel rounded-2xl p-8 border-l-4 border-l-red-500 group shadow-2xl">
                                    <div className="flex gap-8">
                                        <div className="size-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center shrink-0 border border-red-500/20">
                                            <span className="material-symbols-outlined text-4xl">gpp_maybe</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-1">Unencrypted S3 Bucket <span className="text-[#8b949e] font-medium ml-2">/ prod-user-assets-01</span></h3>
                                            <p className="text-[15px] text-[#8b949e] leading-relaxed mb-8">Sensitive PII identified in non-encrypted storage. Violates SOC2 requirements.</p>
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => navigate('/blueprint')} className="px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-lg">Fix Automatically</button>
                                                <button className="px-6 py-3 bg-surface-dark text-white text-sm font-bold rounded-xl border border-border-muted">Manual Review</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
                );
        };

        const CostAnalysis = () => {
            const navigate = useNavigate();
                return (
                <div className="flex h-screen overflow-hidden bg-background-dark/30 high-tech-grid">
                    <aside className="w-64 border-r border-border-dark flex flex-col p-6 bg-background-dark/80">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="bg-primary/20 border border-primary/40 rounded p-1.5"><span className="material-symbols-outlined text-primary">deployed_code</span></div>
                            <h1 className="text-sm font-bold uppercase tracking-widest">MAADS AI</h1>
                        </div>
                        <nav className="flex flex-col gap-2">
                            <a className="flex items-center gap-3 px-3 py-2 bg-primary/10 border-l-2 border-primary text-primary" href="#"><span className="material-symbols-outlined text-lg">bolt</span><span className="text-xs font-bold uppercase tracking-widest">Optimization</span></a>
                            <a className="flex items-center gap-3 px-3 py-2 text-slate-400" href="#"><span className="material-symbols-outlined text-lg">account_balance_wallet</span><span className="text-xs font-bold uppercase tracking-widest">Budgets</span></a>
                        </nav>
                    </aside>
                    <main className="flex-1 flex flex-col">
                        <Header step="STEP 05" title="Cost Optimization" nextLabel="Final Blueprint" nextPath="/blueprint" />
                        <div className="p-8 space-y-8 w-full max-w-[1600px] mx-auto">
                            <div className="flex flex-wrap justify-between items-start gap-6">
                                <h1 className="text-5xl font-black italic uppercase">Budget & Sensitivity</h1>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <StatCard label="Total Monthly Est." value="$12,450.00" delta="+5.2% DELTA" color="primary" />
                                <StatCard label="Current Spend" value="$8,210.45" delta="ON TRACK" color="slate" />
                                <StatCard label="Projected Savings" value="$2,100.00" delta="12_AGENT_FIXES" color="accent-cyan" />
                                <div className="glass-panel p-6 flex items-center gap-6"><div className="size-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div><p className="text-lg font-bold">$4,239.55 Bal</p></div>
                            </div>
                            <div className="glass-panel overflow-hidden border border-white/5">
                                <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em]">Agent Recommendations</h3>
                                </div>
                                <table className="w-full text-left">
                                    <thead className="bg-white/[0.01]">
                                        <tr>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase">Provider / Asset</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase">Heuristic_Finding</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase">Delta_Savings</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <TableRow provider="AWS" asset="EC2 Instances" finding="Underutilized assets detected. Migration to Spot instances recommended." savings="-$840.00 / MO" onFix={() => navigate('/blueprint')} />
                                        <TableRow provider="GCP" asset="Cloud SQL (RDS)" finding="Idle capacity found. Downsize SKU to standard-2." savings="-$320.00 / MO" onFix={() => navigate('/blueprint')} />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
                );
        };

                const StatCard = ({label, value, delta, color}) => (
                <div className={`glass-panel p-6 border-l-2 border-l-${color} flex flex-col gap-3`}>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
                    <p className="text-3xl font-black tabular-nums">{value}</p>
                    <div className={`text-${color} text-[10px] font-black tracking-widest uppercase`}>{delta}</div>
                </div>
                );

                const TableRow = ({provider, asset, finding, savings, onFix}) => (
                <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-black italic">{provider}</div>
                            <p className="text-xs font-bold uppercase">{asset}</p>
                        </div>
                    </td>
                    <td className="px-8 py-6 text-xs text-slate-400 uppercase tracking-tight max-w-sm">{finding}</td>
                    <td className="px-8 py-6 text-sm font-black text-emerald-500 tabular-nums">{savings}</td>
                    <td className="px-8 py-6 text-right">
                        <button onClick={onFix} className="bg-primary hover:bg-white hover:text-primary border border-primary text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all">Deploy_Fix</button>
                    </td>
                </tr>
                );

        const BlueprintApproval = () => {
            const navigate = useNavigate();
                return (
                <div className="bg-background-dark text-white overflow-hidden h-screen flex flex-col">
                    <Header step="STEP 06" title="Final Blueprint Approval" nextLabel="Approve & Provision" nextPath="/audit" />
                    <main className="flex-1 flex overflow-hidden">
                        <section className="flex-1 architecture-canvas grid-bg relative p-12">
                            <div className="relative w-full h-full border border-primary/20 rounded-[2rem] bg-primary/5 p-12 overflow-hidden">
                                <div className="absolute top-10 left-10 p-5 bg-panel-dark border border-border-muted rounded-xl flex items-center gap-4 shadow-2xl">
                                    <div className="size-10 bg-blue-500/10 rounded flex items-center justify-center text-blue-400">
                                        <span className="material-symbols-outlined text-2xl">cloud</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-[#9da8b9] uppercase tracking-tighter">AWS Production-01</span>
                                </div>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <path d="M140,180 L200,180" stroke="#4b5563" strokeWidth="1.5" fill="none" />
                                    <path className="active-path" d="M600,240 L600,320" stroke="#136dec" strokeWidth="2" fill="none" />
                                </svg>
                                <div className="flex items-center justify-center h-full">
                                    <div className="p-8 border border-primary/40 rounded-3xl bg-primary/5 relative">
                                        <div className="flex gap-10 items-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="size-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg"><span className="material-symbols-outlined text-white text-2xl">analytics</span></div>
                                                <span className="text-[9px] font-bold text-[#9da8b9] uppercase tracking-widest">Glue</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="size-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg"><span className="material-symbols-outlined text-white text-2xl">bolt</span></div>
                                                <span className="text-[9px] font-bold text-[#9da8b9] uppercase tracking-widest">Lambda</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <aside className="w-[440px] bg-panel-dark border-l border-border-muted flex flex-col p-8 space-y-10 overflow-y-auto">
                            <h3 className="text-3xl font-bold font-display tracking-tight leading-tight">Final Blueprint Approval</h3>
                            <div className="p-4 bg-background-dark/60 rounded-xl border border-border-muted">
                                <p className="text-[9px] text-[#9da8b9] uppercase font-bold tracking-widest mb-2">Total Monthly Est.</p>
                                <p className="text-2xl font-bold text-emerald-400">$3,420.50</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                    <span className="material-symbols-outlined text-emerald-500 text-xl">verified_user</span>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-white uppercase tracking-tight">IAM Least Privilege</p>
                                        <p className="text-[10px] text-[#9da8b9]">Zero-trust roles enforced</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => navigate('/audit')} className="w-full h-16 bg-primary text-white font-bold rounded-xl shadow-2xl flex items-center justify-center gap-4 uppercase tracking-widest text-sm">
                                <span>Deploy Production Infrastructure</span>
                                <span className="material-symbols-outlined">rocket_launch</span>
                            </button>
                        </aside>
                    </main>
                </div>
                );
        };

        const AuditLogs = () => {
            return (
                <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-300 min-h-screen">
                    <Header />
                    <main className="max-w-[1400px] mx-auto px-8 py-8">
                        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-2">
                                    <span className="material-symbols-outlined text-sm">history_edu</span> Transparency Layer
                                </div>
                                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Agent Orchestration Audit</h1>
                                <p className="text-sm text-slate-500">Session: <span className="font-mono text-slate-300">AX-9021-MAADS</span></p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-bold"><span className="material-symbols-outlined mr-2 text-lg">download</span> Export</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <aside className="lg:col-span-3">
                                <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-800 p-4 space-y-4">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Event Chain</h3>
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
                                            <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
                                            <span className="text-sm font-bold text-amber-500">Security Alert</span>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                            <section className="lg:col-span-9 space-y-6">
                                <div className="bg-surface-dark rounded-xl border border-slate-800 overflow-hidden shadow-sm">
                                    <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/30">
                                        <h4 className="text-sm font-bold">LLM Reasoning Chain: <span className="text-slate-500 font-normal">security_verifier_04</span></h4>
                                    </div>
                                    <div className="p-6">
                                        <div className="bg-slate-950 rounded-lg p-5 border border-slate-800 font-mono text-sm leading-relaxed text-slate-300">
                                            <div className="flex gap-4 mb-2"><span className="text-slate-600">[09:41:20]</span> <span className="text-emerald-400">INFO</span> Analyzing AWS::VPC schema...</div>
                                            <div className="flex gap-4 mb-2"><span className="text-slate-600">[09:41:21]</span> <span className="text-amber-400">WARN</span> Violation of SEC-NET-004: Public DB found.</div>
                                            <div className="flex gap-4"><span className="text-slate-600">[09:41:21]</span> <span className="text-rose-400">ACT</span> Emitting REJECTION_SIGNAL. Routing to private layer.</div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
                );
        };

        const App = () => {
            return (
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/initiate" element={<ProjectInitiation />} />
                        <Route path="/designer" element={<ArchitectureDesigner />} />
                        <Route path="/topology" element={<TopologyMap />} />
                        <Route path="/compliance" element={<ComplianceCenter />} />
                        <Route path="/cost" element={<CostAnalysis />} />
                        <Route path="/blueprint" element={<BlueprintApproval />} />
                        <Route path="/audit" element={<AuditLogs />} />
                    </Routes>
                </MemoryRouter>
                );
        };

                const container = document.getElementById('root');
                const root = createRoot(container);
                root.render(<App />);
            </script>
        </body>
    </html>