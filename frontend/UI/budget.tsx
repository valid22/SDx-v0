< !DOCTYPE html >
    <html class="dark" lang="en"><head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>05 Cost &amp; Sensitivity Analysis | MAADS AI</title>
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
            "accent-cyan": "#0ea5e9",
            "background-dark": "#0a0f16",
            "surface-dark": "#111827",
            "border-dark": "#1f2937",
                    },
            fontFamily: {
                "display": ["Space Grotesk"]
                    },
            borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "9999px"},
                },
            },
        }
        </script>
        <style type="text/tailwindcss">
            @layer base {
                body {
                font - family: 'Space Grotesk', sans-serif;
            }
        }
            input[type=range] {
                -webkit - appearance: none;
            background: transparent;
        }
            input[type=range]::-webkit-slider-runnable-track {
                width: 100%;
            height: 4px;
            background: #1f2937;
            border-radius: 2px;
        }
            input[type=range]::-webkit-slider-thumb {
                -webkit - appearance: none;
            height: 18px;
            width: 18px;
            border-radius: 2px;
            background: #136dec;
            cursor: pointer;
            margin-top: -7px;
            box-shadow: 0 0 15px rgba(19, 109, 236, 0.6);
            border: 2px solid white;
        }
            .high-tech-grid {
                background - image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0);
            background-size: 24px 24px;
        }
            .glass-panel {
                background: rgba(17, 24, 39, 0.7);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        </style>
    </head>
        <body class="bg-background-dark text-slate-200 min-h-screen overflow-hidden high-tech-grid">
            <div class="flex h-screen overflow-hidden">
                <aside class="w-64 border-r border-border-dark flex flex-col justify-between p-6 bg-background-dark/80">
                    <div class="flex flex-col gap-10">
                        <div class="flex items-center gap-3">
                            <div class="bg-primary/20 border border-primary/40 rounded p-1.5">
                                <span class="material-symbols-outlined text-primary text-xl">deployed_code</span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-sm font-bold leading-none tracking-[0.2em] uppercase">MAADS AI</h1>
                                <p class="text-[10px] text-slate-500 font-bold uppercase mt-1">Infrastructure Platform</p>
                            </div>
                        </div>
                        <nav class="flex flex-col gap-2">
                            <a class="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all group" href="#">
                                <span class="material-symbols-outlined text-lg">dashboard</span>
                                <span class="text-xs font-bold uppercase tracking-widest">Dashboard</span>
                            </a>
                            <a class="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all group" href="#">
                                <span class="material-symbols-outlined text-lg">dns</span>
                                <span class="text-xs font-bold uppercase tracking-widest">Infrastructure</span>
                            </a>
                            <a class="flex items-center gap-3 px-3 py-2 bg-primary/10 border-l-2 border-primary text-primary" href="#">
                                <span class="material-symbols-outlined text-lg">bolt</span>
                                <span class="text-xs font-bold uppercase tracking-widest">Optimization</span>
                            </a>
                            <a class="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all" href="#">
                                <span class="material-symbols-outlined text-lg">account_balance_wallet</span>
                                <span class="text-xs font-bold uppercase tracking-widest">Budgets</span>
                            </a>
                            <a class="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-all" href="#">
                                <span class="material-symbols-outlined text-lg">description</span>
                                <span class="text-xs font-bold uppercase tracking-widest">Reports</span>
                            </a>
                        </nav>
                    </div>
                    <div class="flex flex-col gap-6">
                        <div class="bg-white/5 p-4 border border-white/10 relative overflow-hidden">
                            <div class="absolute top-0 right-0 w-8 h-8 bg-primary/20 rotate-45 translate-x-4 -translate-y-4"></div>
                            <p class="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">System Status</p>
                            <div class="flex items-center gap-2 mb-4">
                                <span class="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span class="text-[10px] font-bold text-slate-400 uppercase">Operational</span>
                            </div>
                            <button class="w-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold py-2 uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                                Upgrade Tier
                            </button>
                        </div>
                        <div class="flex items-center gap-3 px-1">
                            <div class="size-9 border border-white/20 p-0.5">
                                <div class="size-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">JD</div>
                            </div>
                            <div class="flex flex-col">
                                <p class="text-xs font-bold leading-none tracking-wide">J. DOE</p>
                                <p class="text-[10px] text-slate-500 uppercase font-bold mt-1">Admin_ID: 802</p>
                            </div>
                        </div>
                    </div>
                </aside>
                <main class="flex-1 flex flex-col overflow-y-auto bg-background-dark/30">
                    <header class="flex items-center justify-between border-b border-border-dark px-8 py-4 bg-background-dark/60 backdrop-blur-md sticky top-0 z-20">
                        <div class="flex items-center gap-6">
                            <div class="flex flex-col">
                                <div class="flex items-center gap-2">
                                    <span class="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Step 05</span>
                                    <div class="h-px w-8 bg-primary/30"></div>
                                </div>
                                <h2 class="text-lg font-bold tracking-tight uppercase">Cost Optimization</h2>
                            </div>
                        </div>
                        <div class="flex items-center gap-6">
                            <div class="relative w-64 group">
                                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">search</span>
                                <input class="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest focus:ring-1 focus:ring-primary/50 outline-none transition-all" placeholder="SCAN_NODES..." type="text" />
                            </div>
                            <div class="flex items-center gap-1">
                                <button class="p-2 text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                                    <span class="material-symbols-outlined text-xl">notifications</span>
                                </button>
                                <button class="p-2 text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                                    <span class="material-symbols-outlined text-xl">settings</span>
                                </button>
                            </div>
                        </div>
                    </header>
                    <div class="p-8 space-y-8 w-full max-w-[1600px] mx-auto">
                        <div class="flex flex-wrap justify-between items-start gap-6 border-b border-white/5 pb-8">
                            <div class="space-y-3">
                                <h1 class="text-5xl font-black tracking-tighter uppercase italic">Budget &amp; Sensitivity</h1>
                                <p class="text-slate-500 text-sm font-medium tracking-wide max-w-2xl leading-relaxed">
                                    Precision analysis of multi-cloud expenditures. AI agents are currently simulating workload volatility
                                    to optimize resource allocation across global nodes.
                                </p>
                            </div>
                            <div class="flex gap-2">
                                <button class="flex items-center gap-2 px-5 py-2.5 bg-white/5 text-[10px] font-bold tracking-[0.2em] border border-white/10 hover:bg-white/10 uppercase transition-all">
                                    <span class="material-symbols-outlined text-base">calendar_today</span>
                                    Current_Cycle
                                </button>
                                <button class="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-[10px] font-black tracking-[0.2em] border border-primary hover:brightness-125 uppercase shadow-[0_0_20px_rgba(19,109,236,0.3)] transition-all">
                                    <span class="material-symbols-outlined text-base">download</span>
                                    Export_Data
                                </button>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div class="glass-panel p-6 border-l-2 border-l-primary flex flex-col gap-3">
                                <div class="flex justify-between items-start">
                                    <p class="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Total Monthly Est.</p>
                                    <span class="material-symbols-outlined text-slate-600 text-lg">payments</span>
                                </div>
                                <p class="text-3xl font-black tracking-tight tabular-nums">$12,450.00</p>
                                <div class="flex items-center gap-2 text-emerald-500 text-[10px] font-black tracking-widest">
                                    <span class="material-symbols-outlined text-sm">trending_up</span>
                                    <span>+5.2% DELTA</span>
                                </div>
                            </div>
                            <div class="glass-panel p-6 border-l-2 border-l-slate-700 flex flex-col gap-3">
                                <div class="flex justify-between items-start">
                                    <p class="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Current Spend</p>
                                    <span class="material-symbols-outlined text-slate-600 text-lg">receipt_long</span>
                                </div>
                                <p class="text-3xl font-black tracking-tight tabular-nums">$8,210.45</p>
                                <div class="flex items-center gap-2 text-primary text-[10px] font-black tracking-widest">
                                    <span class="material-symbols-outlined text-sm">bolt</span>
                                    <span>ON TRACK</span>
                                </div>
                            </div>
                            <div class="glass-panel p-6 border-l-2 border-l-accent-cyan flex flex-col gap-3">
                                <div class="flex justify-between items-start">
                                    <p class="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Projected Savings</p>
                                    <span class="material-symbols-outlined text-accent-cyan text-lg">auto_awesome</span>
                                </div>
                                <p class="text-3xl font-black tracking-tight tabular-nums text-accent-cyan">$2,100.00</p>
                                <div class="flex items-center gap-2 text-slate-400 text-[10px] font-black tracking-widest">
                                    <span>12_AGENT_FIXES</span>
                                </div>
                            </div>
                            <div class="glass-panel p-6 flex items-center gap-6 relative overflow-hidden">
                                <div class="relative size-20 shrink-0">
                                    <svg class="size-full -rotate-90" viewBox="0 0 36 36">
                                        <circle class="stroke-slate-800" cx="18" cy="18" fill="none" r="16" stroke-width="3"></circle>
                                        <circle class="stroke-primary" cx="18" cy="18" fill="none" r="16" stroke-dasharray="68, 100" stroke-linecap="square" stroke-width="3"></circle>
                                    </svg>
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <span class="text-sm font-black">68%</span>
                                    </div>
                                </div>
                                <div class="space-y-1">
                                    <p class="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Compliance</p>
                                    <p class="text-lg font-bold tabular-nums">$4,239.55</p>
                                    <p class="text-[10px] text-slate-500 font-bold uppercase tracking-tight">REMAINING_BAL</p>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div class="lg:col-span-2 glass-panel p-8 border border-white/5 relative">
                                <div class="flex justify-between items-center mb-10">
                                    <div class="flex items-center gap-3">
                                        <div class="w-1 h-6 bg-primary"></div>
                                        <h3 class="text-sm font-black uppercase tracking-[0.2em]">Expenditure Overview</h3>
                                    </div>
                                    <div class="flex gap-6">
                                        <div class="flex items-center gap-2">
                                            <span class="size-1.5 bg-primary"></span>
                                            <span class="text-[10px] text-slate-500 font-black uppercase tracking-tighter">AWS</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <span class="size-1.5 bg-accent-cyan"></span>
                                            <span class="text-[10px] text-slate-500 font-black uppercase tracking-tighter">GCP</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <span class="size-1.5 bg-slate-600"></span>
                                            <span class="text-[10px] text-slate-500 font-black uppercase tracking-tighter">AZURE</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="relative h-64 flex items-end justify-between gap-4 border-l border-b border-white/5 px-4 pt-4">
                                    <div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-4 pl-4">
                                        <div class="w-full h-px bg-white/10"></div>
                                        <div class="w-full h-px bg-white/10"></div>
                                        <div class="w-full h-px bg-white/10"></div>
                                        <div class="w-full h-px bg-white/10"></div>
                                    </div>
                                    <div class="flex-1 flex flex-col gap-0.5 h-full justify-end group cursor-crosshair z-10">
                                        <div class="w-full bg-slate-600 h-[10%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <div class="w-full bg-accent-cyan h-[20%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <div class="w-full bg-primary h-[45%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <p class="text-[10px] font-black text-center mt-3 text-slate-600 tracking-tighter">MAY</p>
                                    </div>
                                    <div class="flex-1 flex flex-col gap-0.5 h-full justify-end group cursor-crosshair z-10">
                                        <div class="w-full bg-slate-600 h-[12%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <div class="w-full bg-accent-cyan h-[22%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <div class="w-full bg-primary h-[50%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <p class="text-[10px] font-black text-center mt-3 text-slate-600 tracking-tighter">JUN</p>
                                    </div>
                                    <div class="flex-1 flex flex-col gap-0.5 h-full justify-end group cursor-crosshair z-10">
                                        <div class="w-full bg-slate-600 h-[15%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <div class="w-full bg-accent-cyan h-[25%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <div class="w-full bg-primary h-[48%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <p class="text-[10px] font-black text-center mt-3 text-slate-600 tracking-tighter">JUL</p>
                                    </div>
                                    <div class="flex-1 flex flex-col gap-0.5 h-full justify-end group cursor-crosshair z-10">
                                        <div class="w-full bg-slate-600 h-[14%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <div class="w-full bg-accent-cyan h-[28%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <div class="w-full bg-primary h-[52%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <p class="text-[10px] font-black text-center mt-3 text-slate-600 tracking-tighter">AUG</p>
                                    </div>
                                    <div class="flex-1 flex flex-col gap-0.5 h-full justify-end group cursor-crosshair z-10">
                                        <div class="w-full bg-slate-600 h-[18%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <div class="w-full bg-accent-cyan h-[30%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <div class="w-full bg-primary h-[42%] opacity-40 hover:opacity-100 transition-opacity"></div>
                                        <p class="text-[10px] font-black text-center mt-3 text-slate-600 tracking-tighter">SEP</p>
                                    </div>
                                    <div class="flex-1 flex flex-col gap-0.5 h-full justify-end group cursor-crosshair z-10">
                                        <div class="w-full bg-slate-600 h-[20%] border-t border-white/20"></div>
                                        <div class="w-full bg-accent-cyan h-[32%] border-t border-white/20"></div>
                                        <div class="w-full bg-primary h-[48%] border-2 border-primary/50 relative shadow-[0_0_20px_rgba(19,109,236,0.2)]">
                                            <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                                        </div>
                                        <p class="text-[10px] font-black text-center mt-3 text-primary tracking-tighter">OCT_PROJ</p>
                                    </div>
                                </div>
                            </div>
                            <div class="glass-panel p-8 flex flex-col border border-white/5 relative overflow-hidden">
                                <div class="absolute top-0 right-0 p-4 opacity-10">
                                    <span class="material-symbols-outlined text-6xl">query_stats</span>
                                </div>
                                <div class="flex items-center gap-3 mb-2">
                                    <div class="w-1 h-6 bg-accent-cyan"></div>
                                    <h3 class="text-sm font-black uppercase tracking-[0.2em]">Sensitivity Analysis</h3>
                                </div>
                                <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-10 leading-relaxed">
                                    Simulating workload scaling vs cost impact
                                </p>
                                <div class="space-y-12 flex-1 flex flex-col justify-center">
                                    <div class="space-y-6">
                                        <div class="flex justify-between items-end">
                                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Scaling_Factor</label>
                                            <span class="text-3xl font-black text-primary italic tracking-tighter">3.5<span class="text-xs font-bold text-slate-500 not-italic ml-1">X</span></span>
                                        </div>
                                        <div class="px-2">
                                            <input class="w-full cursor-pointer" max="10" min="1" step="0.5" type="range" value="3.5" />
                                        </div>
                                        <div class="flex justify-between text-[10px] font-black text-slate-600 tracking-widest uppercase px-1">
                                            <span>Current</span>
                                            <span>Max_Peak</span>
                                        </div>
                                    </div>
                                    <div class="p-5 bg-white/5 border border-white/10 relative">
                                        <div class="absolute top-0 left-0 w-1 h-full bg-accent-cyan"></div>
                                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Projected Impact</p>
                                        <div class="flex justify-between items-end">
                                            <span class="text-xs font-bold text-slate-300 uppercase tracking-tight">Monthly Total</span>
                                            <span class="text-2xl font-black text-white tabular-nums tracking-tighter">$21,490.50</span>
                                        </div>
                                        <div class="mt-4 flex items-start gap-2 pt-4 border-t border-white/5">
                                            <span class="material-symbols-outlined text-accent-cyan text-sm">info</span>
                                            <p class="text-[10px] text-slate-500 font-bold leading-relaxed uppercase">
                                                Agent recommends enabling <span class="text-white">Dynamic Resource Grouping</span> to mitigate 22% of this overhead.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="glass-panel overflow-hidden border border-white/5">
                            <div class="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <div class="flex items-center gap-4">
                                    <div class="size-10 bg-primary/10 flex items-center justify-center border border-primary/20">
                                        <span class="material-symbols-outlined text-primary text-2xl">smart_toy</span>
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-black uppercase tracking-[0.2em]">Agent Recommendations</h3>
                                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Scanned 1,429 instances in real-time</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black tracking-[0.2em] uppercase">
                                    <span class="size-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                    Active_Scanner
                                </div>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="w-full text-left border-collapse">
                                    <thead>
                                        <tr class="bg-white/[0.01]">
                                            <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Provider / Asset</th>
                                            <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Heuristic_Finding</th>
                                            <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Delta_Savings</th>
                                            <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">Risk_Index</th>
                                            <th class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5 text-right">Protocol</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-white/5">
                                        <tr class="hover:bg-white/5 transition-colors group">
                                            <td class="px-8 py-6">
                                                <div class="flex items-center gap-4">
                                                    <div class="size-10 bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-black tracking-widest italic">AWS</div>
                                                    <div>
                                                        <p class="text-xs font-bold tracking-tight uppercase">EC2 Instances (t3.medium)</p>
                                                        <p class="text-[10px] text-slate-500 font-bold uppercase mt-1">Region: US-EAST-1</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-8 py-6">
                                                <p class="text-xs text-slate-400 leading-relaxed uppercase tracking-tight max-w-sm">
                                                    Underutilized assets detected. Migration to <span class="text-white font-bold">Spot Instances</span> recommended for batch processing workloads.
                                                </p>
                                            </td>
                                            <td class="px-8 py-6">
                                                <p class="text-sm font-black text-emerald-500 tabular-nums">-$840.00 <span class="text-[10px] opacity-70">/ MO</span></p>
                                            </td>
                                            <td class="px-8 py-6">
                                                <span class="px-2 py-1 border border-amber-500/30 bg-amber-500/5 text-amber-500 text-[10px] font-black uppercase tracking-[0.1em]">Medium_Risk</span>
                                            </td>
                                            <td class="px-8 py-6 text-right">
                                                <button class="bg-primary hover:bg-white hover:text-primary border border-primary text-white px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                                                    Deploy_Fix
                                                </button>
                                            </td>
                                        </tr>
                                        <tr class="hover:bg-white/5 transition-colors group">
                                            <td class="px-8 py-6">
                                                <div class="flex items-center gap-4">
                                                    <div class="size-10 bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-black tracking-widest italic">GCP</div>
                                                    <div>
                                                        <p class="text-xs font-bold tracking-tight uppercase">Cloud SQL (RDS)</p>
                                                        <p class="text-[10px] text-slate-500 font-bold uppercase mt-1">Region: EU-WEST-3</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-8 py-6">
                                                <p class="text-xs text-slate-400 leading-relaxed uppercase tracking-tight max-w-sm">
                                                    Idle capacity found. Persistent 12% CPU baseline. <span class="text-white font-bold">Downsize SKU</span> to standard-2.
                                                </p>
                                            </td>
                                            <td class="px-8 py-6">
                                                <p class="text-sm font-black text-emerald-500 tabular-nums">-$320.00 <span class="text-[10px] opacity-70">/ MO</span></p>
                                            </td>
                                            <td class="px-8 py-6">
                                                <span class="px-2 py-1 border border-emerald-500/30 bg-emerald-500/5 text-emerald-500 text-[10px] font-black uppercase tracking-[0.1em]">Low_Risk</span>
                                            </td>
                                            <td class="px-8 py-6 text-right">
                                                <button class="bg-primary hover:bg-white hover:text-primary border border-primary text-white px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                                                    Deploy_Fix
                                                </button>
                                            </td>
                                        </tr>
                                        <tr class="hover:bg-white/5 transition-colors group">
                                            <td class="px-8 py-6">
                                                <div class="flex items-center gap-4">
                                                    <div class="size-10 bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-black tracking-widest italic">AZR</div>
                                                    <div>
                                                        <p class="text-xs font-bold tracking-tight uppercase">Blob Storage (Hot)</p>
                                                        <p class="text-[10px] text-slate-500 font-bold uppercase mt-1">Archive_Containers</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-8 py-6">
                                                <p class="text-xs text-slate-400 leading-relaxed uppercase tracking-tight max-w-sm">
                                                    Stale data policy violation. Move 2.4TB to <span class="text-white font-bold">Archive Tier</span> storage immediately.
                                                </p>
                                            </td>
                                            <td class="px-8 py-6">
                                                <p class="text-sm font-black text-emerald-500 tabular-nums">-$145.50 <span class="text-[10px] opacity-70">/ MO</span></p>
                                            </td>
                                            <td class="px-8 py-6">
                                                <span class="px-2 py-1 border border-emerald-500/30 bg-emerald-500/5 text-emerald-500 text-[10px] font-black uppercase tracking-[0.1em]">Low_Risk</span>
                                            </td>
                                            <td class="px-8 py-6 text-right">
                                                <button class="bg-primary hover:bg-white hover:text-primary border border-primary text-white px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                                                    Deploy_Fix
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </body></html>