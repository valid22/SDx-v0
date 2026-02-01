< !DOCTYPE html >
    <html class="dark" lang="en"><head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>MAADS | Network Topology Map</title>
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
            "background-dark": "#0a0c10",
            "panel-bg": "#111418",
            "vpc-border": "#ff4d94",
            "subnet-border": "#f97316",
            "card-bg": "#1c2027",
            "border-muted": "#282f39",
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
                background - color: #0a0c10;
            background-image:
            linear-gradient(to right, rgba(40, 47, 57, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(40, 47, 57, 0.4) 1px, transparent 1px);
            background-size: 40px 40px;
        }
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
        }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: #111418;
        }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #282f39;
            border-radius: 10px;
        }
            .flow-line {
                stroke: #136dec;
            stroke-width: 1.5;
            stroke-dasharray: 6 4;
            fill: none;
            opacity: 0.6;
        }
            .flow-line-active {
                stroke: #136dec;
            stroke-width: 2;
            fill: none;
            filter: drop-shadow(0 0 4px #136dec);
        }
            .node-shadow {
                box - shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.5);
        }
        </style>
    </head>
        <body class="bg-background-dark text-white overflow-hidden h-screen flex flex-col">
            <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-muted px-6 py-3 bg-background-dark z-50">
                <div class="flex items-center gap-8">
                    <div class="flex items-center gap-4 text-white">
                        <div class="size-6 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 class="text-white text-xl font-bold leading-tight tracking-[-0.015em] font-display uppercase">MAADS</h2>
                    </div>
                    <div class="h-8 w-[1px] bg-border-muted"></div>
                    <div class="flex items-center gap-8">
                        <div class="flex flex-col">
                            <span class="text-[10px] text-[#9da8b9] uppercase tracking-wider font-bold">Step 03</span>
                            <span class="text-sm font-medium">Topology Validation</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-[10px] text-[#9da8b9] uppercase tracking-wider font-bold">Scope</span>
                            <span class="text-sm font-medium flex items-center gap-1.5">
                                Production Environment
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2 px-3 py-1.5 bg-card-bg rounded border border-border-muted">
                        <span class="material-symbols-outlined text-sm text-[#9da8b9]">lock_outline</span>
                        <span class="text-white text-sm font-bold">IAM: Compliant</span>
                    </div>
                    <div class="h-8 w-[1px] bg-border-muted mx-2"></div>
                    <div class="flex gap-3">
                        <button class="flex items-center justify-center rounded px-4 h-10 border border-border-muted bg-card-bg text-white text-sm font-bold hover:bg-border-muted transition-colors">
                            Regenerate Map
                        </button>
                        <button class="flex items-center justify-center rounded px-6 h-10 bg-primary text-white text-sm font-bold tracking-wide hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(19,109,236,0.3)]">
                            Confirm &amp; Deploy
                        </button>
                    </div>
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border border-border-muted ml-2" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBR5eoTQ0w2_TWAOg9mbtSnKXczK08gBIIZjDHtbeRDckrquJ5qghUPXU9PV0j7cX_KmPHHNav_czbgpFFVDDoFt144fHMyK9mhBCy1mzzoqTHW1-BkxFl0spfMC3oQN5K9Q2Ce5FGS0DBL9JbMLdvlZcN4VH9h2jVQzJqg1j3s5XcTdJCbwe-hk1HhEAJt5iXhWwM6fF5tQqPA_vyQMCVTsHlb_t5cxm8hkS9H5qyDS2ebSyRH90ZsR0F39JJ_fWwMl5FO92wPAJY");'></div>
                </div>
            </header>
            <main class="flex-1 flex overflow-hidden">
                <aside class="w-80 bg-panel-bg border-r border-border-muted flex flex-col shrink-0">
                    <div class="p-5 border-b border-border-muted">
                        <h3 class="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                            Discovery Queue
                            <span class="material-symbols-outlined text-sm text-primary">data_exploration</span>
                        </h3>
                        <div class="space-y-6">
                            <div class="relative pl-7 border-l-2 border-primary">
                                <div class="absolute -left-[7px] top-0 size-3 bg-primary rounded-sm shadow-[0_0_8px_rgba(19,109,236,0.5)]"></div>
                                <div class="flex flex-col">
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="text-white text-sm font-bold uppercase tracking-tight">VPC Mapping</span>
                                        <span class="text-primary text-[10px] font-bold">COMPLETED</span>
                                    </div>
                                    <p class="text-[#9da8b9] text-[11px] leading-relaxed">3 VPCs, 12 Subnets, 4 Peering Links successfully discovered.</p>
                                </div>
                            </div>
                            <div class="relative pl-7 border-l-2 border-primary/20">
                                <div class="absolute -left-[7px] top-0 size-3 bg-primary animate-pulse rounded-sm"></div>
                                <div class="flex flex-col">
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="text-white text-sm font-bold uppercase tracking-tight">Flow Analysis</span>
                                        <span class="text-primary text-[10px] font-bold flex items-center gap-1">
                                            <span class="material-symbols-outlined text-[12px] animate-spin">refresh</span>
                                            TRACING
                                        </span>
                                    </div>
                                    <p class="text-[#9da8b9] text-[11px] leading-relaxed">Analyzing ingress/egress patterns for 10.0.2.0/24 subnet...</p>
                                </div>
                            </div>
                            <div class="relative pl-7 border-l-2 border-border-muted">
                                <div class="absolute -left-[7px] top-0 size-3 bg-border-muted rounded-sm"></div>
                                <div class="flex flex-col opacity-40">
                                    <span class="text-white text-sm font-bold uppercase tracking-tight">Final Validation</span>
                                    <p class="text-[#9da8b9] text-[11px] leading-relaxed">Waiting for flow analysis completion.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col min-h-0 bg-[#0a0c10] p-5 font-mono text-[11px]">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-[#9da8b9] uppercase text-[10px] font-bold tracking-widest">Network Event Log</span>
                            <span class="flex items-center gap-1.5 text-[9px] text-green-500 font-bold">
                                <span class="size-1.5 rounded-full bg-green-500 animate-pulse"></span> LIVE
                            </span>
                        </div>
                        <div class="flex-1 overflow-y-auto custom-scrollbar space-y-2 text-[#7d8898]">
                            <p><span class="text-primary/70">[10:14:02]</span> <span class="text-white">SCAN:</span> Mapping AWS-Ireland-Region...</p>
                            <p><span class="text-primary/70">[10:14:05]</span> <span class="text-white">FOUND:</span> vpc-0a2b3c (10.0.0.0/16)</p>
                            <p><span class="text-primary/70">[10:14:08]</span> <span class="text-white">FOUND:</span> igw-98721 (Internet Gateway)</p>
                            <p><span class="text-primary/70">[10:14:12]</span> <span class="text-white">ROUTE:</span> 0.0.0.0/0 via igw-98721</p>
                            <p><span class="text-primary/70">[10:14:15]</span> <span class="text-yellow-500">WARN:</span> NACL-99 permissive for 22/tcp</p>
                            <p><span class="text-primary/70">[10:14:18]</span> <span class="text-white">SCAN:</span> Traversing Subnet associations...</p>
                            <p class="text-white border-l-2 border-white pl-2">_</p>
                        </div>
                    </div>
                </aside>
                <section class="flex-1 relative flex flex-col grid-bg">
                    <div class="absolute top-6 left-6 flex items-center gap-3 z-10">
                        <div class="flex items-center bg-card-bg border border-border-muted rounded-md p-1 node-shadow">
                            <button class="p-2 text-[#9da8b9] hover:text-white transition-all">
                                <span class="material-symbols-outlined text-[18px]">drag_pan</span>
                            </button>
                            <button class="p-2 text-primary bg-primary/10 rounded-sm transition-all">
                                <span class="material-symbols-outlined text-[18px]">near_me</span>
                            </button>
                            <div class="w-[1px] h-4 bg-border-muted mx-1"></div>
                            <button class="p-2 text-[#9da8b9] hover:text-white transition-all">
                                <span class="material-symbols-outlined text-[18px]">layers</span>
                            </button>
                        </div>
                        <div class="flex items-center h-10 bg-card-bg border border-border-muted rounded-md px-4 node-shadow min-w-[300px]">
                            <span class="material-symbols-outlined text-[#9da8b9] mr-2 text-lg">search</span>
                            <input class="bg-transparent border-none focus:ring-0 text-xs w-full placeholder:text-[#9da8b9]/50 font-medium" placeholder="Search VPC, CIDR, ENI..." />
                        </div>
                    </div>
                    <div class="flex-1 relative overflow-hidden flex items-center justify-center p-12">
                        <svg class="absolute inset-0 w-full h-full pointer-events-none">
                            <path class="flow-line-active" d="M250,450 Q350,450 450,450"></path>
                            <path class="flow-line" d="M650,400 L750,300"></path>
                            <path class="flow-line" d="M650,500 L750,600"></path>
                            <path class="flow-line" d="M950,450 L1050,450"></path>
                        </svg>
                        <div class="relative z-10 flex gap-12 items-center">
                            <div class="flex flex-col items-center gap-4">
                                <div class="bg-card-bg border border-border-muted p-5 rounded-lg node-shadow flex flex-col items-center gap-3 w-36 group cursor-pointer hover:border-primary transition-colors">
                                    <div class="size-12 bg-blue-500/10 text-blue-400 rounded flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <span class="material-symbols-outlined">public</span>
                                    </div>
                                    <div class="text-center">
                                        <span class="block text-[10px] font-bold uppercase tracking-widest">IGW-Edge-01</span>
                                        <span class="text-[9px] text-[#9da8b9]">Internet Gateway</span>
                                    </div>
                                </div>
                            </div>
                            <div class="border border-vpc-border/40 border-dashed rounded-xl p-16 bg-vpc-border/[0.03] relative backdrop-blur-[2px]">
                                <div class="absolute -top-3 left-10 bg-vpc-border text-white px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                                    Production VPC <span class="opacity-70 ml-2">10.0.0.0/16</span>
                                </div>
                                <div class="flex gap-16">
                                    <div class="border border-subnet-border/40 border-dashed rounded-lg p-8 bg-subnet-border/[0.03] relative">
                                        <div class="absolute -top-2.5 left-6 bg-subnet-border text-white px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider">
                                            Public Subnet
                                        </div>
                                        <div class="flex flex-col gap-8">
                                            <div class="bg-card-bg border border-border-muted p-4 rounded-md node-shadow w-44 group cursor-pointer hover:border-primary transition-all">
                                                <div class="flex items-center gap-4">
                                                    <div class="size-10 bg-primary/10 text-primary rounded flex items-center justify-center">
                                                        <span class="material-symbols-outlined text-lg">router</span>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-[11px] font-bold">ALB-External</h4>
                                                        <p class="text-[9px] text-[#9da8b9]">Load Balancer</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="bg-card-bg border border-border-muted p-4 rounded-md node-shadow w-44 group cursor-pointer hover:border-primary transition-all">
                                                <div class="flex items-center gap-4">
                                                    <div class="size-10 bg-blue-500/10 text-blue-500 rounded flex items-center justify-center">
                                                        <span class="material-symbols-outlined text-lg">format_list_bulleted</span>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-[11px] font-bold">RT-Edge</h4>
                                                        <p class="text-[9px] text-[#9da8b9]">0.0.0.0/0 → IGW</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="border border-white/20 border-dashed rounded-lg p-8 bg-white/[0.02] relative">
                                        <div class="absolute -top-2.5 left-6 bg-[#4a5568] text-white px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider">
                                            Private Subnet
                                        </div>
                                        <div class="flex flex-col gap-8">
                                            <div class="bg-card-bg border-2 border-primary p-4 rounded-md node-shadow w-44 ring-4 ring-primary/10 relative">
                                                <div class="absolute -top-2 -right-2 size-4 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                                                    <span class="material-symbols-outlined text-[10px]">check</span>
                                                </div>
                                                <div class="flex items-center gap-4">
                                                    <div class="size-10 bg-primary text-white rounded flex items-center justify-center">
                                                        <span class="material-symbols-outlined text-lg">memory</span>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-[11px] font-bold">App Tier Cluster</h4>
                                                        <p class="text-[9px] text-primary font-bold">v1.2.4 Active</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="bg-card-bg border border-border-muted p-4 rounded-md node-shadow w-44 group cursor-pointer hover:border-primary transition-all opacity-80">
                                                <div class="flex items-center gap-4">
                                                    <div class="size-10 bg-orange-500/10 text-orange-400 rounded flex items-center justify-center">
                                                        <span class="material-symbols-outlined text-lg">database</span>
                                                    </div>
                                                    <div>
                                                        <h4 class="text-[11px] font-bold">RDS Aurora</h4>
                                                        <p class="text-[9px] text-[#9da8b9]">Multi-AZ DB</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col items-center gap-4">
                                <div class="bg-card-bg border border-primary/40 border-dashed p-5 rounded-lg node-shadow flex flex-col items-center gap-3 w-36 bg-primary/5 group cursor-pointer hover:border-primary transition-colors">
                                    <div class="size-12 bg-primary/20 text-primary rounded flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                                        <span class="material-symbols-outlined">sync_alt</span>
                                    </div>
                                    <div class="text-center">
                                        <span class="block text-[10px] font-bold uppercase tracking-widest">Shared-PCX</span>
                                        <span class="text-[9px] text-primary/70">Peering Link</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="absolute top-6 right-6 flex items-center gap-6 bg-card-bg/90 backdrop-blur-lg px-6 py-3 rounded-md border border-border-muted node-shadow">
                        <div class="flex items-center gap-3">
                            <span class="size-2 rounded-sm bg-vpc-border shadow-[0_0_5px_rgba(255,77,148,0.5)]"></span>
                            <span class="text-[10px] font-bold uppercase tracking-wider text-[#9da8b9]">VPC</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="size-2 rounded-sm bg-subnet-border shadow-[0_0_5px_rgba(249,115,22,0.5)]"></span>
                            <span class="text-[10px] font-bold uppercase tracking-wider text-[#9da8b9]">Subnet</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="size-2 rounded-sm bg-primary shadow-[0_0_5px_rgba(19,109,236,0.5)]"></span>
                            <span class="text-[10px] font-bold uppercase tracking-wider text-[#9da8b9]">Traffic</span>
                        </div>
                    </div>
                    <div class="absolute bottom-6 left-6 z-10 flex flex-col gap-3">
                        <div class="bg-card-bg border border-border-muted rounded-md p-1 flex flex-col node-shadow">
                            <button class="p-2 text-[#9da8b9] hover:text-white hover:bg-border-muted rounded-sm transition-all"><span class="material-symbols-outlined text-[20px]">add</span></button>
                            <div class="h-[1px] w-full bg-border-muted"></div>
                            <button class="p-2 text-[#9da8b9] hover:text-white hover:bg-border-muted rounded-sm transition-all"><span class="material-symbols-outlined text-[20px]">remove</span></button>
                        </div>
                        <button class="p-2 bg-card-bg border border-border-muted text-[#9da8b9] rounded-md hover:text-white node-shadow transition-all">
                            <span class="material-symbols-outlined text-[20px]">center_focus_strong</span>
                        </button>
                    </div>
                </section>
                <aside class="w-96 bg-panel-bg border-l border-border-muted flex flex-col shrink-0 overflow-hidden">
                    <div class="flex border-b border-border-muted px-4">
                        <button class="flex-1 py-4 text-xs font-bold uppercase tracking-[0.15em] border-b-2 border-primary text-white">Selection Details</button>
                        <button class="flex-1 py-4 text-xs font-bold uppercase tracking-[0.15em] border-b-2 border-transparent text-[#9da8b9] hover:text-white transition-colors">Route Table</button>
                    </div>
                    <div class="flex-1 overflow-y-auto custom-scrollbar p-8">
                        <div class="space-y-8">
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <p class="text-[#9da8b9] text-[10px] font-bold uppercase tracking-widest">Selected Resource</p>
                                    <span class="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-bold rounded">SUB-0A1B</span>
                                </div>
                                <h2 class="text-2xl font-bold font-display uppercase tracking-tight">App Tier Subnet</h2>
                                <p class="text-sm text-[#9da8b9] mt-2 font-mono">10.0.2.0 / 24 • eu-west-1a</p>
                            </div>
                            <div class="space-y-4">
                                <p class="text-[#9da8b9] text-[10px] font-bold uppercase tracking-widest">Network Allocation</p>
                                <div class="bg-[#0a0c10] p-5 rounded-lg border border-border-muted">
                                    <div class="flex items-center justify-between mb-3">
                                        <span class="text-xs font-bold text-white uppercase">IP Usage</span>
                                        <span class="text-xs text-[#9da8b9] font-mono">251 Free / 256 Total</span>
                                    </div>
                                    <div class="w-full bg-border-muted h-1.5 rounded-full overflow-hidden">
                                        <div class="bg-primary w-[12%] h-full shadow-[0_0_10px_rgba(19,109,236,0.6)]"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-4">
                                <div class="flex items-center justify-between border-b border-border-muted pb-2">
                                    <h4 class="text-[#9da8b9] text-[10px] font-bold uppercase tracking-widest">Security Groups</h4>
                                    <span class="text-[10px] text-primary font-bold cursor-pointer hover:underline">Edit Rules</span>
                                </div>
                                <div class="space-y-3">
                                    <div class="flex items-start gap-4 p-4 bg-green-500/[0.03] border border-green-500/20 rounded-md">
                                        <span class="material-symbols-outlined text-green-500 text-xl">verified_user</span>
                                        <div class="flex-1">
                                            <p class="text-xs font-bold text-white uppercase tracking-tighter">Inbound Allow</p>
                                            <p class="text-[10px] text-[#9da8b9] mt-1">Ports: 80, 443, 8080</p>
                                            <p class="text-[10px] text-[#9da8b9]">Source: ALB Security Group</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-4 p-4 bg-red-500/[0.03] border border-red-500/20 rounded-md">
                                        <span class="material-symbols-outlined text-red-500 text-xl">block</span>
                                        <div class="flex-1">
                                            <p class="text-xs font-bold text-white uppercase tracking-tighter">Default Deny</p>
                                            <p class="text-[10px] text-[#9da8b9] mt-1">All other ingress traffic restricted</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-4">
                                <h4 class="text-[#9da8b9] text-[10px] font-bold uppercase tracking-widest border-b border-border-muted pb-2">Route Analysis</h4>
                                <div class="space-y-2 font-mono text-[11px]">
                                    <div class="flex justify-between items-center py-2 px-3 bg-[#0a0c10] rounded border border-border-muted/50">
                                        <span class="text-[#9da8b9]">10.0.0.0/16</span>
                                        <span class="text-green-500 font-bold uppercase text-[9px]">Local</span>
                                    </div>
                                    <div class="flex justify-between items-center py-2 px-3 bg-[#0a0c10] rounded border border-border-muted/50">
                                        <span class="text-[#9da8b9]">0.0.0.0/0</span>
                                        <span class="text-primary font-bold uppercase text-[9px]">NAT-GW-01</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-8 border-t border-border-muted bg-[#1c2027]/30 backdrop-blur-md">
                        <div class="flex gap-4">
                            <button class="flex-1 py-4 bg-border-muted rounded text-[11px] font-bold uppercase tracking-widest hover:bg-[#3b4554] transition-colors border border-white/5">
                                Config Sync
                            </button>
                            <button class="flex-1 py-4 bg-primary rounded text-[11px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(19,109,236,0.3)]">
                                Analyze Path
                            </button>
                        </div>
                    </div>
                </aside>
            </main>
            <footer class="h-10 bg-[#0a0c10] border-t border-border-muted px-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#5d6b7d]">
                <div class="flex items-center gap-8">
                    <div class="flex items-center gap-2">
                        <span class="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(19,109,236,0.5)]"></span>
                        <span>Interactive Mode</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-[14px]">history</span>
                        <span>Sync: 12.04s ago</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-[14px]">dns</span>
                        <span>Nodes: 24 active</span>
                    </div>
                </div>
                <div class="flex items-center gap-6">
                    <span class="text-green-500">System Validated • 0 Critical Security Risks</span>
                    <button class="text-primary hover:text-white transition-colors border-l border-border-muted pl-6 ml-2">Export Terraform Plan</button>
                </div>
            </footer>

        </body></html>