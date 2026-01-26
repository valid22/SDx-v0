import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from './Icon'

interface SidebarItem {
    icon: string
    label: string
    path: string
}

interface SidebarProps {
    items?: SidebarItem[]
    showLogo?: boolean
}

const defaultItems: SidebarItem[] = [
    { icon: 'grid_view', label: 'Projects', path: '/' },
    { icon: 'payments', label: 'Cost', path: '/cost' },
    { icon: 'gpp_good', label: 'Security', path: '/compliance' },
]

export const Sidebar: React.FC<SidebarProps> = ({ items = defaultItems, showLogo = true }) => {
    const location = useLocation()

    return (
        <aside className="w-64 border-r border-border-dark bg-surface-dark flex flex-col z-50 shrink-0">
            {showLogo && (
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                        <Icon name="terminal" className="text-black font-bold" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tighter uppercase font-mono">Masda</h1>
                </div>
            )}
            <nav className="flex-1 px-4 py-4 space-y-1">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-2">
                    Navigation
                </div>
                {items.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive
                                    ? 'text-primary bg-primary/5 border border-primary/20'
                                    : 'text-zinc-400 hover:text-white border border-transparent'
                                }`}
                        >
                            <Icon name={item.icon} className="text-[20px]" />
                            <span className="text-sm">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
