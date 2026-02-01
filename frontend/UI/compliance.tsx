< !DOCTYPE html >
    <html class="dark" lang="en"><head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>MAADS | Compliance &amp; Remediation Center</title>
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
            "surface-dark": "#161b22",
            "border-muted": "#30363d",
                    },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"]
                    },
            borderRadius: {"DEFAULT": "0.375rem", "lg": "0.5rem", "xl": "1rem", "full": "9999px"},
                },
            },
        }
        </script>
        <style type="text/tailwindcss">
            body {
                font - family: 'Space Grotesk', sans-serif;
            background-color: #0a0c10;
        }
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
        }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: #0a0c10;
        }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #30363d;
            border-radius: 10px;
        }
            .compliance-grid-bg {
                background - image: radial-gradient(circle at 2px 2px, rgba(48, 54, 61, 0.4) 1px, transparent 0);
            background-size: 24px 24px;
        }
            .glass-panel {
                background: rgba(22, 27, 34, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(48, 54, 61, 0.8);
        }
        </style>
    </head>
        <body class="bg-background-dark text-white overflow-hidden h-screen flex flex-col">
            <header class="flex items-center justify-between border-b border-border-muted px-8 py-4 bg-background-dark/80 backdrop-blur-md z-50 shrink-0">
                <div class="flex items-center gap-10">
                    <div class="flex items-center gap-3">
                        <div class="size-7 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold font-display tracking-tight">MAADS</h2>
                    </div>
                    <div class="h-8 w-[1px] bg-border-muted"></div>
                    <div class="flex items-center gap-6">
                        <div class="flex flex-col">
                            <span class="text-[10px] text-[#8b949e] uppercase tracking-widest font-bold">Step 04</span>
                            <span class="text-sm font-semibold text-white/90">Security &amp; Compliance Audit</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-6">
                    <div class="flex items-center gap-3 px-4 py-1.5 bg-green-500/5 rounded-full border border-green-500/20">
                        <span class="material-symbols-outlined text-sm text-green-400">verified</span>
                        <span class="text-green-400 text-sm font-bold">84% Overall Health</span>
                    </div>
                    <button class="flex items-center gap-2 rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold tracking-wide hover:bg-blue-600 transition-all shadow-lg shadow-primary/20">
                        <span class="material-symbols-outlined text-lg">sync</span>
                        Full System Audit
                    </button>
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border-2 border-border-muted" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPQTHAvWk27jvVS5P0Q4fId2bfjsbMAkvOiqpzL2xqnn79PQGUU64n9ZTfmxP5Xb-3TFadoD_XE8a1A5tzB8b62RmkHm-CXLOVyVsOCJVjv5XGgESbRgMG_q1HCv20QdslF3g6DTvw8sviup_DX4Mv1DllCLGHnWhNGPNaBy455qO8es0245_F6HOUMWGOvif1dd68PizwdhLHtA9b3VgpyfvKC56-lAONK6msUh3eJxmqEwcEgJ6RmzLSMxT52YXl_Mx_RepV6UM");'></div>
                </div>
            </header>
            <main class="flex-1 flex overflow-hidden">
                <aside class="w-80 bg-background-dark border-r border-border-muted flex flex-col shrink-0">
                    <div class="p-8">
                        <h3 class="text-[#8b949e] text-[11px] font-bold uppercase tracking-[0.2em] mb-8">Compliance Frameworks</h3>
                        <div class="space-y-4">
                            <div class="p-5 bg-primary/5 border border-primary/40 rounded-xl cursor-pointer ring-1 ring-primary/20">
                                <div class="flex items-center justify-between mb-4">
                                    <span class="text-white font-bold text-sm">SOC2 Type II</span>
                                    <span class="material-symbols-outlined text-primary text-xl">check_circle</span>
                                </div>
                                <div class="w-full bg-border-muted h-1 rounded-full mb-3">
                                    <div class="bg-primary w-[92%] h-full rounded-full shadow-[0_0_8px_rgba(19,109,236,0.6)]"></div>
                                </div>
                                <div class="flex justify-between text-[11px] font-bold">
                                    <span class="text-primary uppercase tracking-tight">92% Compliance</span>
                                    <span class="text-[#8b949e]">48/52 Controls</span>
                                </div>
                            </div>
                            <div class="p-5 bg-surface-dark/40 border border-border-muted rounded-xl hover:border-[#8b949e]/30 cursor-pointer transition-all group">
                                <div class="flex items-center justify-between mb-4">
                                    <span class="text-[#8b949e] group-hover:text-white transition-colors font-bold text-sm">HIPAA</span>
                                    <span class="material-symbols-outlined text-[#30363d] group-hover:text-[#8b949e]">radio_button_unchecked</span>
                                </div>
                                <div class="w-full bg-border-muted h-1 rounded-full mb-3">
                                    <div class="bg-yellow-500/50 group-hover:bg-yellow-500 w-[65%] h-full rounded-full transition-all"></div>
                                </div>
                                <div class="flex justify-between text-[11px] font-bold">
                                    <span class="text-yellow-500/70 group-hover:text-yellow-500 uppercase tracking-tight">65% Compliance</span>
                                    <span class="text-[#8b949e]">32/49 Controls</span>
                                </div>
                            </div>
                            <div class="p-5 bg-surface-dark/40 border border-border-muted rounded-xl hover:border-[#8b949e]/30 cursor-pointer transition-all group">
                                <div class="flex items-center justify-between mb-4">
                                    <span class="text-[#8b949e] group-hover:text-white transition-colors font-bold text-sm">ISO 27001</span>
                                    <span class="material-symbols-outlined text-[#30363d] group-hover:text-[#8b949e]">radio_button_unchecked</span>
                                </div>
                                <div class="w-full bg-border-muted h-1 rounded-full mb-3">
                                    <div class="bg-red-500/30 group-hover:bg-red-500 w-[15%] h-full rounded-full transition-all"></div>
                                </div>
                                <div class="flex justify-between text-[11px] font-bold">
                                    <span class="text-red-500/70 group-hover:text-red-500 uppercase tracking-tight">15% Compliance</span>
                                    <span class="text-[#8b949e]">18/114 Controls</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-auto p-8 border-t border-border-muted">
                        <div class="bg-surface-dark/50 rounded-xl p-5 border border-border-muted space-y-4">
                            <div class="flex justify-between items-center">
                                <span class="text-[10px] text-[#8b949e] font-bold uppercase tracking-wider">Vulnerabilities</span>
                                <span class="text-red-400 font-bold text-xs">12 Critical</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-[10px] text-[#8b949e] font-bold uppercase tracking-wider">Last Audit</span>
                                <span class="text-white font-bold text-xs">09m 14s ago</span>
                            </div>
                        </div>
                    </div>
                </aside>
                <section class="flex-1 flex flex-col bg-[#0a0c10] overflow-hidden relative">
                    <div class="p-10 border-b border-border-muted bg-[#0d1117]/50 relative z-10">
                        <div class="flex justify-between items-start mb-10">
                            <div>
                                <h1 class="text-4xl font-bold font-display mb-3 tracking-tight">SOC2 Type II <span class="text-primary">Audit</span></h1>
                                <p class="text-[#8b949e] max-w-2xl leading-relaxed">Continuous monitoring and automated remediation for SOC2 compliance. Our AI agents identify risks and provide instantaneous patching instructions.</p>
                            </div>
                            <div class="flex gap-10">
                                <div class="text-center">
                                    <div class="text-3xl font-bold text-white">124</div>
                                    <div class="text-[10px] text-[#8b949e] font-bold uppercase tracking-widest mt-1">Passing</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-3xl font-bold text-yellow-500">14</div>
                                    <div class="text-[10px] text-[#8b949e] font-bold uppercase tracking-widest mt-1">Warn</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-3xl font-bold text-red-500">08</div>
                                    <div class="text-[10px] text-[#8b949e] font-bold uppercase tracking-widest mt-1">Critical</div>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="flex bg-surface-dark p-1 rounded-lg border border-border-muted">
                                    <button class="px-5 py-1.5 text-xs font-bold bg-[#30363d] text-white rounded-md shadow-sm">All Gaps</button>
                                    <button class="px-5 py-1.5 text-xs font-bold text-[#8b949e] hover:text-white transition-colors">Critical Only</button>
                                    <button class="px-5 py-1.5 text-xs font-bold text-[#8b949e] hover:text-white transition-colors">Auto-fixable</button>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="text-[11px] font-bold text-[#8b949e] uppercase">Sort By</span>
                                <select class="bg-surface-dark border-border-muted text-xs font-bold rounded-lg px-4 py-2 focus:ring-primary focus:border-primary text-white/80">
                                    <option>Severity: High to Low</option>
                                    <option>Resource Type</option>
                                    <option>Time Discovered</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 overflow-y-auto custom-scrollbar p-10 compliance-grid-bg">
                        <div class="space-y-6 max-w-6xl mx-auto pb-20">
                            <h4 class="text-[#8b949e] text-[11px] font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                                <span class="w-8 h-[1px] bg-border-muted"></span>
                                Remediation Action Center
                            </h4>
                            <div class="glass-panel rounded-2xl p-8 hover:bg-surface-dark/80 transition-all border-l-4 border-l-red-500 group shadow-2xl">
                                <div class="flex gap-8">
                                    <div class="size-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center shrink-0 border border-red-500/20">
                                        <span class="material-symbols-outlined text-4xl">gpp_maybe</span>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 class="text-xl font-bold text-white mb-1">Unencrypted S3 Bucket <span class="text-[#8b949e] font-medium ml-2">/ prod-user-assets-01</span></h3>
                                                <div class="flex items-center gap-4">
                                                    <span class="text-red-400 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                        <span class="size-1.5 rounded-full bg-red-500"></span> Critical Risk
                                                    </span>
                                                    <span class="text-[#8b949e] text-[11px] font-bold uppercase tracking-wider">• Control CC6.1</span>
                                                </div>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <span class="px-3 py-1 bg-[#161b22] text-[#8b949e] text-[10px] font-bold rounded-full border border-border-muted uppercase">AWS Cloud</span>
                                            </div>
                                        </div>
                                        <p class="text-[15px] text-[#8b949e] leading-relaxed mb-8 max-w-3xl">
                                            Sensitive PII identified in non-encrypted storage. This violates SOC2 data protection requirements and HIPAA §164.312. Exposure duration: <span class="text-white font-medium">14h 22m</span>.
                                        </p>
                                        <div class="flex items-center justify-between border-t border-border-muted/50 pt-6">
                                            <div class="flex items-center gap-4">
                                                <button class="px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                                                    <span class="material-symbols-outlined text-lg">bolt</span>
                                                    Fix Automatically
                                                </button>
                                                <button class="px-6 py-3 bg-surface-dark text-white text-sm font-bold rounded-xl border border-border-muted hover:bg-[#30363d] transition-all">
                                                    Manual Review
                                                </button>
                                            </div>
                                            <button class="text-[#8b949e] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Ignore / False Positive</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="glass-panel rounded-2xl p-8 hover:bg-surface-dark/80 transition-all border-l-4 border-l-yellow-500/50 shadow-xl">
                                <div class="flex gap-8">
                                    <div class="size-14 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center shrink-0 border border-yellow-500/20">
                                        <span class="material-symbols-outlined text-4xl">security</span>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 class="text-xl font-bold text-white mb-1">Permissive Inbound Rules <span class="text-[#8b949e] font-medium ml-2">/ API-Gateway-SG</span></h3>
                                                <div class="flex items-center gap-4">
                                                    <span class="text-yellow-500 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                        <span class="size-1.5 rounded-full bg-yellow-500"></span> Medium Risk
                                                    </span>
                                                    <span class="text-[#8b949e] text-[11px] font-bold uppercase tracking-wider">• Control CC6.6</span>
                                                </div>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <span class="px-3 py-1 bg-[#161b22] text-[#8b949e] text-[10px] font-bold rounded-full border border-border-muted uppercase">Azure VNET</span>
                                            </div>
                                        </div>
                                        <p class="text-[15px] text-[#8b949e] leading-relaxed mb-8 max-w-3xl">
                                            Port 22 (SSH) is open to 0.0.0.0/0 on the application tier. Increasing attack surface for brute-force attempts.
                                        </p>
                                        <div class="flex items-center gap-4">
                                            <button class="px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                                                <span class="material-symbols-outlined text-lg">bolt</span>
                                                Apply Shield Policy
                                            </button>
                                            <button class="px-6 py-3 bg-surface-dark text-white text-sm font-bold rounded-xl border border-border-muted hover:bg-[#30363d] transition-all">
                                                View Logs
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="glass-panel rounded-2xl p-8 border-l-4 border-l-green-500 opacity-60">
                                <div class="flex gap-8">
                                    <div class="size-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center shrink-0 border border-green-500/20">
                                        <span class="material-symbols-outlined text-4xl">verified_user</span>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-start justify-between mb-2">
                                            <h3 class="text-xl font-bold text-white">CloudTrail Logging Status</h3>
                                            <div class="flex items-center gap-2 text-green-500 text-[11px] font-bold uppercase tracking-widest">
                                                <span class="material-symbols-outlined text-sm">check_circle</span>
                                                Remediated
                                            </div>
                                        </div>
                                        <p class="text-[14px] text-[#8b949e]">The Security Agent has enabled global trail logging and configured encryption via KMS across all regions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <aside class="w-[420px] bg-background-dark border-l border-border-muted flex flex-col shrink-0 overflow-hidden">
                    <div class="p-8 border-b border-border-muted bg-[#0d1117]/30">
                        <h3 class="text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-8">Framework Readiness</h3>
                        <div class="flex flex-col items-center py-6 relative">
                            <div class="relative size-48 flex items-center justify-center">
                                <svg class="size-full transform -rotate-90">
                                    <circle cx="96" cy="96" fill="transparent" r="85" stroke="#30363d" stroke-width="14"></circle>
                                    <circle class="drop-shadow-[0_0_8px_rgba(19,109,236,0.4)]" cx="96" cy="96" fill="transparent" r="85" stroke="#136dec" stroke-dasharray="534" stroke-dashoffset="43" stroke-linecap="round" stroke-width="14"></circle>
                                </svg>
                                <div class="absolute inset-0 flex flex-col items-center justify-center">
                                    <span class="text-4xl font-bold font-display tracking-tight">92%</span>
                                    <span class="text-[10px] text-[#8b949e] font-bold uppercase tracking-widest mt-1">Audit Ready</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
                        <div>
                            <h4 class="text-[#8b949e] text-[11px] font-bold uppercase tracking-[0.2em] border-b border-border-muted pb-4 mb-6">Control Domains</h4>
                            <div class="space-y-6">
                                <div class="space-y-3">
                                    <div class="flex justify-between text-xs font-bold">
                                        <span class="text-white/90">Org &amp; Management</span>
                                        <span class="text-green-400">100%</span>
                                    </div>
                                    <div class="w-full bg-border-muted h-1.5 rounded-full overflow-hidden">
                                        <div class="bg-green-500 w-full h-full"></div>
                                    </div>
                                </div>
                                <div class="space-y-3">
                                    <div class="flex justify-between text-xs font-bold">
                                        <span class="text-white/90">Logical &amp; Physical Access</span>
                                        <span class="text-primary">84%</span>
                                    </div>
                                    <div class="w-full bg-border-muted h-1.5 rounded-full overflow-hidden">
                                        <div class="bg-primary w-[84%] h-full shadow-[0_0_8px_rgba(19,109,236,0.3)]"></div>
                                    </div>
                                </div>
                                <div class="space-y-3">
                                    <div class="flex justify-between text-xs font-bold">
                                        <span class="text-white/90">System Operations</span>
                                        <span class="text-primary">91%</span>
                                    </div>
                                    <div class="w-full bg-border-muted h-1.5 rounded-full overflow-hidden">
                                        <div class="bg-primary w-[91%] h-full shadow-[0_0_8px_rgba(19,109,236,0.3)]"></div>
                                    </div>
                                </div>
                                <div class="space-y-3">
                                    <div class="flex justify-between text-xs font-bold">
                                        <span class="text-white/90">Change Management</span>
                                        <span class="text-yellow-500">62%</span>
                                    </div>
                                    <div class="w-full bg-border-muted h-1.5 rounded-full overflow-hidden">
                                        <div class="bg-yellow-500 w-[62%] h-full shadow-[0_0_8px_rgba(234,179,8,0.3)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-[#8b949e] text-[11px] font-bold uppercase tracking-[0.2em] border-b border-border-muted pb-4 mb-6">Security Agent Feed</h4>
                            <div class="space-y-5">
                                <div class="flex gap-4">
                                    <div class="size-2.5 rounded-full bg-primary mt-1.5 animate-pulse"></div>
                                    <div>
                                        <p class="text-xs text-white/90 font-semibold mb-1">Scanning multi-cloud assets...</p>
                                        <p class="text-[10px] text-[#8b949e] uppercase font-bold tracking-tight">Azure West Europe · 2s ago</p>
                                    </div>
                                </div>
                                <div class="flex gap-4">
                                    <div class="size-2.5 rounded-full bg-green-500 mt-1.5"></div>
                                    <div>
                                        <p class="text-xs text-white/90 font-semibold mb-1">Auto-remediation successful</p>
                                        <p class="text-[10px] text-[#8b949e] uppercase font-bold tracking-tight">IAM Policy 'readonly-eng' · 12m ago</p>
                                    </div>
                                </div>
                                <div class="flex gap-4 opacity-50">
                                    <div class="size-2.5 rounded-full bg-border-muted mt-1.5"></div>
                                    <div>
                                        <p class="text-xs text-white/90 font-semibold mb-1">Audit Package Generated</p>
                                        <p class="text-[10px] text-[#8b949e] uppercase font-bold tracking-tight">SOC2 Snapshot #1204 · 1h ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-8 border-t border-border-muted bg-[#0d1117]/50 backdrop-blur-sm space-y-4">
                        <button class="w-full py-4 bg-surface-dark border border-border-muted rounded-xl text-sm font-bold hover:bg-[#30363d] transition-all text-white/90 flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-lg">download</span>
                            Export Audit Report
                        </button>
                        <button class="w-full py-4 bg-primary rounded-xl text-sm font-bold hover:bg-blue-600 transition-all text-white shadow-lg shadow-primary/20">
                            Seal &amp; Request Auditor Access
                        </button>
                    </div>
                </aside>
            </main>
            <footer class="h-10 bg-[#0a0c10] border-t border-border-muted px-8 flex items-center justify-between text-[10px] font-bold text-[#8b949e] tracking-widest uppercase shrink-0">
                <div class="flex items-center gap-10">
                    <div class="flex items-center gap-2">
                        <span class="size-2 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]"></span>
                        <span>Security Engine: Optimal</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-[14px]">verified</span>
                        <span>Continuous Monitoring Active</span>
                    </div>
                </div>
                <div class="flex items-center gap-6">
                    <span>Region: Global</span>
                    <span class="text-primary hover:text-white transition-colors cursor-pointer">Security Center Docs</span>
                </div>
            </footer>

        </body></html>