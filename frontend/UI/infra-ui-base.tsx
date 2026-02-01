
    < !DOCTYPE html >
    <html class="dark" lang="en"><head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>MAADS | 02 Multi-Agent Architecture Designer</title>
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
        <script id="tailwind-config">
            tailwind.config = {
                darkMode: "class",
            theme: {
                extend: {
                colors: {
                "primary": "#136dec",
            "background-light": "#f6f7f8",
            "background-dark": "#0a0f16",
            "surface-dark": "#161b22",
            "border-dark": "#2d333b"
                    },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"]
                    },
            borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
        </script>
        <style type="text/tailwindcss">
            body {
                font - family: 'Space Grotesk', sans-serif;
        }
            .grid-bg {
                background - image: radial-gradient(circle, #2d333b 1px, transparent 1px);
            background-size: 32px 32px;
        }
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
        }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: #0a0f16;
        }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #2d333b;
            border-radius: 10px;
        }
            .step-highlight {
                box - shadow: 0 0 15px rgba(19, 109, 236, 0.3);
        }
        </style>
    </head>
        <body class="bg-background-dark text-slate-200 overflow-hidden h-screen flex flex-col">
            <header class="flex items-center justify-between border-b border-border-dark px-6 py-3 bg-background-dark z-50">
                <div class="flex items-center gap-8">
                    <div class="flex items-center gap-4 text-white">
                        <div class="size-6 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <div class="flex flex-col">
                            <h2 class="text-white text-lg font-bold leading-tight font-display">MAADS</h2>
                            <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Step 2: Architecture Synthesis</span>
                        </div>
                    </div>
                    <div class="h-8 w-[1px] bg-border-dark"></div>
                    <div class="flex items-center gap-6">
                        <div class="flex flex-col">
                            <span class="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Project</span>
                            <span class="text-sm font-medium">Enterprise-MultiCloud-Mesh</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Status</span>
                            <span class="text-sm font-medium flex items-center gap-1.5 text-green-400">
                                <span class="size-2 rounded-full bg-green-500"></span>
                                Optimized
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2 px-3 py-1.5 bg-surface-dark rounded-lg border border-border-dark">
                        <span class="material-symbols-outlined text-sm text-slate-500">account_balance_wallet</span>
                        <span class="text-white text-sm font-bold">$1,240.50/mo</span>
                        <span class="text-green-400 text-[10px] font-bold">(-12%)</span>
                    </div>
                    <div class="h-8 w-[1px] bg-border-dark mx-2"></div>
                    <div class="flex gap-2">
                        <button class="flex items-center justify-center rounded-lg h-10 px-4 bg-surface-dark text-slate-300 border border-border-dark hover:text-white transition-colors">
                            <span class="material-symbols-outlined">share</span>
                        </button>
                        <button class="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold tracking-wide hover:bg-blue-600 transition-all step-highlight" onclick="window.location.href='#blueprint-preview'">
                            Deploy
                        </button>
                    </div>
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border border-border-dark" data-alt="User avatar" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPQTHAvWk27jvVS5P0Q4fId2bfjsbMAkvOiqpzL2xqnn79PQGUU64n9ZTfmxP5Xb-3TFadoD_XE8a1A5tzB8b62RmkHm-CXLOVyVsOCJVjv5XGgESbRgMG_q1HCv20QdslF3g6DTvw8sviup_DX4Mv1DllCLGHnWhNGPNaBy455qO8es0245_F6HOUMWGOvif1dd68PizwdhLHtA9b3VgpyfvKC56-lAONK6msUh3eJxmqEwcEgJ6RmzLSMxT52YXl_Mx_RepV6UM");'></div>
                </div>
            </header>
            <main class="flex-1 flex overflow-hidden">
                <aside class="w-72 bg-background-dark border-r border-border-dark flex flex-col shrink-0">
                    <div class="p-4 border-b border-border-dark">
                        <h3 class="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">AI Agent Execution</h3>
                        <div class="space-y-4">
                            <div class="relative pl-7 pb-4 border-l border-primary/30">
                                <div class="absolute -left-[5px] top-0 size-2.5 rounded-full bg-primary ring-4 ring-primary/10"></div>
                                <div class="flex flex-col gap-0.5">
                                    <div class="flex items-center justify-between">
                                        <span class="text-white text-sm font-bold">Intent Parser</span>
                                        <span class="text-primary text-[10px] font-bold">DONE</span>
                                    </div>
                                    <p class="text-slate-500 text-xs italic font-light">Natural language processing complete</p>
                                </div>
                            </div>
                            <div class="relative pl-7 pb-4 border-l border-primary/30">
                                <div class="absolute -left-[5px] top-0 size-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(19,109,236,0.5)]"></div>
                                <div class="flex flex-col gap-0.5">
                                    <div class="flex items-center justify-between">
                                        <span class="text-white text-sm font-bold">Infra Agent</span>
                                        <span class="text-primary text-[10px] font-bold flex items-center gap-1">
                                            <span class="material-symbols-outlined text-[12px] animate-spin">sync</span>
                                            RUNNING
                                        </span>
                                    </div>
                                    <p class="text-slate-500 text-xs">Resolving VPC dependencies...</p>
                                </div>
                            </div>
                            <div class="relative pl-7 pb-4 border-l border-border-dark">
                                <div class="absolute -left-[5px] top-0 size-2.5 rounded-full bg-border-dark"></div>
                                <div class="flex flex-col gap-0.5 opacity-50">
                                    <span class="text-white text-sm font-bold">Cost Agent</span>
                                    <p class="text-slate-500 text-xs">Awaiting architecture finalization</p>
                                </div>
                            </div>
                            <div class="relative pl-7 border-l border-border-dark">
                                <div class="absolute -left-[5px] top-0 size-2.5 rounded-full bg-border-dark"></div>
                                <div class="flex flex-col gap-0.5 opacity-50">
                                    <span class="text-white text-sm font-bold">Security Agent</span>
                                    <p class="text-slate-500 text-xs">Compliance scan pending</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col min-h-0 bg-[#070b10] p-4 font-mono text-[11px]">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-slate-500 uppercase text-[10px] font-bold">Live Status Stream</span>
                            <span class="size-2 rounded-full bg-green-500/50"></span>
                        </div>
                        <div class="flex-1 overflow-y-auto custom-scrollbar space-y-1 text-slate-500">
                            <p><span class="text-primary">[14:20:01]</span> Fetching cloud credentials...</p>
                            <p><span class="text-primary">[14:20:04]</span> Analyzing intent: "Secure 3-tier VPC"</p>
                            <p><span class="text-primary">[14:20:09]</span> Graph generated (12 nodes, 18 edges)</p>
                            <p><span class="text-primary">[14:20:12]</span> Validating AWS region 'us-east-1'</p>
                            <p><span class="text-primary">[14:20:15]</span> <span class="text-yellow-500">WARN:</span> S3 bucket name already exists</p>
                            <p><span class="text-primary">[14:20:18]</span> Retrying bucket generation...</p>
                            <p><span class="text-primary">[14:20:22]</span> Success. Node ID: aws_s3_001</p>
                            <p><span class="text-primary">[14:20:25]</span> Calculating egress costs...</p>
                            <p class="animate-pulse text-white">_</p>
                        </div>
                    </div>
                    <div class="p-4 border-t border-border-dark">
                        <button class="w-full flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-surface-dark border border-border-dark text-slate-300 text-sm font-bold hover:text-white transition-colors">
                            <span class="material-symbols-outlined text-lg">terminal</span>
                            <span>View Full Logs</span>
                        </button>
                    </div>
                </aside>
                <section class="flex-1 relative flex flex-col bg-background-dark grid-bg">
                    <div class="absolute top-6 left-6 flex items-center gap-2 z-10">
                        <div class="flex items-center bg-surface-dark border border-border-dark rounded-lg p-1 shadow-2xl">
                            <button class="p-2 text-slate-500 hover:text-white hover:bg-border-dark rounded-md transition-all">
                                <span class="material-symbols-outlined">pan_tool</span>
                            </button>
                            <button class="p-2 text-primary bg-primary/10 rounded-md transition-all">
                                <span class="material-symbols-outlined">near_me</span>
                            </button>
                            <button class="p-2 text-slate-500 hover:text-white hover:bg-border-dark rounded-md transition-all">
                                <span class="material-symbols-outlined">add_box</span>
                            </button>
                            <div class="w-[1px] h-4 bg-border-dark mx-1"></div>
                            <button class="p-2 text-slate-500 hover:text-white hover:bg-border-dark rounded-md transition-all">
                                <span class="material-symbols-outlined">auto_fix_high</span>
                            </button>
                            <button class="flex items-center gap-2 p-2 px-3 text-white bg-primary/20 hover:bg-primary/30 rounded-md transition-all ml-1 border border-primary/50 shadow-[0_0_10px_rgba(19,109,236,0.2)]">
                                <span class="material-symbols-outlined text-lg">hub</span>
                                <span class="text-[10px] font-bold uppercase tracking-wider">Network Map</span>
                            </button>
                        </div>
                        <label class="flex items-center min-w-64 h-10 bg-surface-dark border border-border-dark rounded-lg px-3 shadow-xl focus-within:border-primary/50">
                            <span class="material-symbols-outlined text-slate-500 mr-2 text-xl">search</span>
                            <input class="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-600" placeholder="Search resources (EC2, S3, VPC...)" />
                        </label>
                    </div>
                    <div class="absolute bottom-6 left-6 z-10 flex flex-col gap-2">
                        <div class="bg-surface-dark border border-border-dark rounded-lg p-1 flex flex-col shadow-xl">
                            <button class="p-2 text-slate-500 hover:text-white hover:bg-border-dark rounded-md transition-all"><span class="material-symbols-outlined">add</span></button>
                            <div class="h-[1px] w-full bg-border-dark"></div>
                            <button class="p-2 text-slate-500 hover:text-white hover:bg-border-dark rounded-md transition-all"><span class="material-symbols-outlined">remove</span></button>
                        </div>
                        <button class="p-2 bg-surface-dark border border-border-dark text-slate-500 rounded-lg hover:text-white shadow-xl transition-all">
                            <span class="material-symbols-outlined">center_focus_strong</span>
                        </button>
                    </div>
                    <div class="flex-1 flex items-center justify-center p-20 relative overflow-hidden">
                        <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                            <path d="M400,300 Q500,300 600,200" fill="none" stroke="#136dec" stroke-dasharray="4 2" stroke-width="2"></path>
                            <path d="M400,300 Q500,300 600,400" fill="none" stroke="#136dec" stroke-dasharray="4 2" stroke-width="2"></path>
                            <path d="M600,200 L800,200" fill="none" stroke="#136dec" stroke-width="2"></path>
                            <path d="M600,400 L800,400" fill="none" stroke="#136dec" stroke-width="2"></path>
                        </svg>
                        <div class="grid grid-cols-3 gap-32 items-center">
                            <div class="flex flex-col gap-12">
                                <div class="relative bg-surface-dark/90 backdrop-blur-md border-2 border-primary rounded-xl p-4 w-48 shadow-2xl ring-4 ring-primary/5">
                                    <div class="flex items-center gap-3 mb-2">
                                        <div class="size-8 bg-primary rounded-lg flex items-center justify-center">
                                            <span class="material-symbols-outlined text-white text-lg">cloud</span>
                                        </div>
                                        <div>
                                            <h4 class="text-xs font-bold uppercase tracking-tight text-white">Main VPC</h4>
                                            <p class="text-[10px] text-slate-500">us-east-1</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between mt-3 text-[10px] border-t border-border-dark pt-2">
                                        <span class="text-green-400 font-bold">ACTIVE</span>
                                        <span class="text-slate-400">10.0.0.0/16</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col gap-16">
                                <div class="relative bg-surface-dark/80 backdrop-blur-md border border-border-dark rounded-xl p-4 w-48 shadow-xl hover:border-primary/50 transition-all cursor-pointer group">
                                    <div class="flex items-center gap-3 mb-2">
                                        <div class="size-8 bg-orange-500/20 text-orange-500 rounded-lg flex items-center justify-center">
                                            <span class="material-symbols-outlined text-lg">dns</span>
                                        </div>
                                        <div>
                                            <h4 class="text-xs font-bold uppercase tracking-tight text-slate-300 group-hover:text-white transition-colors">Public SN</h4>
                                            <p class="text-[10px] text-slate-500">Subnet A</p>
                                        </div>
                                    </div>
                                    <div class="text-[9px] mt-2 space-y-1">
                                        <div class="flex justify-between text-slate-400"><span>Instances</span><span class="text-white">3</span></div>
                                        <div class="w-full bg-border-dark h-1 rounded-full overflow-hidden"><div class="bg-primary w-2/3 h-full"></div></div>
                                    </div>
                                </div>
                                <div class="relative bg-primary/10 backdrop-blur-md border-2 border-primary rounded-xl p-4 w-48 shadow-2xl ring-8 ring-primary/10">
                                    <div class="flex items-center gap-3 mb-2">
                                        <div class="size-8 bg-primary text-white rounded-lg flex items-center justify-center">
                                            <span class="material-symbols-outlined text-lg">memory</span>
                                        </div>
                                        <div>
                                            <h4 class="text-xs font-bold uppercase tracking-tight text-white">App Tier</h4>
                                            <p class="text-[10px] text-slate-300">m5.large</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-1 mt-2">
                                        <span class="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        <span class="text-[9px] text-slate-200">Running Auto-scale</span>
                                    </div>
                                    <div class="absolute -right-2 top-1/2 -translate-y-1/2 size-5 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-background-dark cursor-pointer hover:scale-110 transition-transform">
                                        <span class="material-symbols-outlined text-[10px] text-white">edit</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col gap-12">
                                <div class="relative bg-surface-dark/80 backdrop-blur-md border border-border-dark rounded-xl p-4 w-48 shadow-xl hover:border-primary/50 transition-all cursor-pointer">
                                    <div class="flex items-center gap-3 mb-2">
                                        <div class="size-8 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center">
                                            <span class="material-symbols-outlined text-lg">folder_open</span>
                                        </div>
                                        <div>
                                            <h4 class="text-xs font-bold uppercase tracking-tight text-slate-300">Data Lake</h4>
                                            <p class="text-[10px] text-slate-500">S3 Standard</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between mt-3 text-[10px] border-t border-border-dark pt-2">
                                        <span class="text-slate-400">Encrypted</span>
                                        <span class="material-symbols-outlined text-[14px] text-green-500">lock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="absolute top-6 right-6 flex items-center gap-4 bg-surface-dark/80 backdrop-blur-md px-4 py-2 rounded-lg border border-border-dark">
                        <div class="flex items-center gap-2">
                            <span class="size-2 rounded-full bg-orange-500"></span>
                            <span class="text-[10px] font-bold uppercase text-slate-400">AWS</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="size-2 rounded-full bg-blue-500"></span>
                            <span class="text-[10px] font-bold uppercase text-slate-400">Azure</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="size-2 rounded-full bg-primary"></span>
                            <span class="text-[10px] font-bold uppercase text-slate-400">GCP</span>
                        </div>
                    </div>
                </section>
                <aside class="w-[400px] bg-background-dark border-l border-border-dark flex flex-col shrink-0 overflow-hidden">
                    <div class="flex border-b border-border-dark px-2">
                        <button class="flex-1 py-4 text-[10px] font-bold uppercase tracking-wider border-b-2 border-transparent text-slate-500 hover:text-slate-300 transition-colors">Infra</button>
                        <button class="flex-1 py-4 text-[10px] font-bold uppercase tracking-wider border-b-2 border-transparent text-slate-500 hover:text-slate-300 transition-colors">Cost</button>
                        <button class="flex-1 py-4 text-[10px] font-bold uppercase tracking-wider border-b-2 border-transparent text-slate-500 hover:text-slate-300 transition-colors">Security</button>
                        <button class="flex-1 py-4 text-[10px] font-bold uppercase tracking-wider border-b-2 border-primary text-primary bg-primary/5 flex items-center justify-center gap-1 group shadow-[inset_0_-2px_0_rgba(19,109,236,1)] transition-all" onclick="window.location.href='#remediation-center'">
                            Compliance
                            <span class="material-symbols-outlined text-xs group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                    <div class="flex-1 overflow-y-auto custom-scrollbar p-6">
                        <div class="space-y-6">
                            <div class="flex items-start justify-between">
                                <div>
                                    <p class="text-slate-500 text-[10px] font-bold uppercase mb-1">Resource</p>
                                    <h2 class="text-xl font-bold font-display text-white">AWS EC2 Instance</h2>
                                </div>
                                <span class="px-2 py-1 rounded bg-primary/20 text-primary text-[10px] font-bold border border-primary/30">m5.large</span>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="bg-surface-dark p-3 rounded-lg border border-border-dark">
                                    <p class="text-slate-500 text-[10px] font-bold uppercase mb-1">Region</p>
                                    <p class="text-sm font-medium text-slate-200">us-east-1</p>
                                </div>
                                <div class="bg-surface-dark p-3 rounded-lg border border-border-dark">
                                    <p class="text-slate-500 text-[10px] font-bold uppercase mb-1">Platform</p>
                                    <p class="text-sm font-medium text-slate-200">Ubuntu 22.04 LTS</p>
                                </div>
                            </div>
                            <div class="space-y-3">
                                <h4 class="text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-border-dark pb-2">Configuration</h4>
                                <div class="flex justify-between items-center text-sm py-1 border-b border-surface-dark">
                                    <span class="text-slate-500">vCPUs</span>
                                    <span class="text-slate-200 font-medium">2 Cores</span>
                                </div>
                                <div class="flex justify-between items-center text-sm py-1 border-b border-surface-dark">
                                    <span class="text-slate-500">Memory</span>
                                    <span class="text-slate-200 font-medium">8.0 GiB</span>
                                </div>
                                <div class="flex justify-between items-center text-sm py-1 border-b border-surface-dark">
                                    <span class="text-slate-500">Storage</span>
                                    <span class="text-slate-200 font-medium">100GB gp3 SSD</span>
                                </div>
                            </div>
                            <div class="space-y-4">
                                <h4 class="text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-border-dark pb-2">Compliance Mapping</h4>
                                <div class="space-y-3">
                                    <div class="flex items-center gap-3 p-3 bg-green-500/5 border border-green-500/20 rounded-lg group hover:bg-green-500/10 transition-colors">
                                        <span class="material-symbols-outlined text-green-500">verified_user</span>
                                        <div class="flex-1">
                                            <p class="text-xs font-bold text-slate-200">SOC2 Compliance</p>
                                            <p class="text-[10px] text-slate-500">Audit logging enabled</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg group hover:bg-yellow-500/10 transition-colors">
                                        <span class="material-symbols-outlined text-yellow-500">warning</span>
                                        <div class="flex-1">
                                            <p class="text-xs font-bold text-slate-200">Public IP Exposure</p>
                                            <p class="text-[10px] text-slate-500">VPC endpoint recommended</p>
                                        </div>
                                        <span class="material-symbols-outlined text-xs text-slate-500 group-hover:text-primary cursor-pointer">open_in_new</span>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
                                <p class="text-[10px] font-bold text-primary uppercase">Recommended Actions</p>
                                <p class="text-xs text-slate-400">Review all <span class="text-white font-bold">12 compliance warnings</span> in the Remediation Center before deployment.</p>
                            </div>
                        </div>
                    </div>
                    <div class="p-6 border-t border-border-dark bg-surface-dark/50">
                        <div class="flex gap-2">
                            <button class="flex-1 py-3 bg-surface-dark border border-border-dark rounded-lg text-sm font-bold text-slate-300 hover:text-white hover:bg-border-dark transition-colors">Configure</button>
                            <button class="flex-1 py-3 bg-surface-dark border border-red-500/20 rounded-lg text-sm font-bold text-red-500/80 hover:text-red-500 hover:bg-red-500/10 transition-colors">Remove</button>
                        </div>
                    </div>
                </aside>
            </main>
            <footer class="h-8 bg-[#070b10] border-t border-border-dark px-6 flex items-center justify-between text-[10px] font-medium text-slate-500">
                <div class="flex items-center gap-6">
                    <div class="flex items-center gap-1.5">
                        <span class="size-2 rounded-full bg-primary"></span>
                        <span>AI Engine: v2.4.1-stable</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-[12px]">schedule</span>
                        <span>Optimized 4m ago</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-[12px]">public</span>
                        <span>Multi-region Sync: Active</span>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <span>Latency: 24ms</span>
                    <span class="text-primary hover:underline cursor-pointer">View Documentation</span>
                </div>
            </footer>

        </body></html>