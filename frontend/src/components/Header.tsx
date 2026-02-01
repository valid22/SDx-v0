import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from './Icon'

interface HeaderProps {
    step?: string
    title?: string
    nextLabel?: string
    nextPath?: string
}

export const Header: React.FC<HeaderProps> = ({ step, title, nextLabel, nextPath }) => {
    const navigate = useNavigate()

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-dark px-6 md:px-10 py-3 bg-background-dark sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-3 text-primary">
                    <div className="size-8">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <h2 className="text-white text-xl font-bold leading-tight tracking-tight">MAADS</h2>
                </Link>
                {step && (
                    <div className="hidden md:flex items-center gap-4">
                        <div className="h-6 w-px bg-slate-700"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
                                {step}
                            </span>
                            <span className="text-sm font-medium text-slate-300">{title}</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-1 justify-end gap-4 items-center">
                <div className="hidden lg:flex gap-4 mr-4">
                    <Link
                        to="/audit"
                        className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
                    >
                        Audit Logs
                    </Link>
                    <Link
                        to="/cost"
                        className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
                    >
                        Pricing
                    </Link>
                </div>
                {nextLabel && nextPath && (
                    <button
                        onClick={() => navigate(nextPath)}
                        className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-2"
                    >
                        {nextLabel}
                        <Icon name="arrow_forward" className="text-sm" />
                    </button>
                )}
                <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
                    style={{
                        backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzVUymP31yDaFqALYByFfyBMRhx36E832lBl9b11Wn36DsO55TFh8lI0QGU4CKaZoj1oa4cZ9YxBEA5kGjJC64X-7doD2PuqyRmShHUnTV3RerEkQP9XOR31lpCeEiis8OKJpwDuAikJl1qo2uF82OU03VijBrv8KPbq_Hgm5t5AA5XHyIFclEc3HQ4oiTkzuxkESi_KIR6oBAypxmkFpfMxBsWXG1EyFhgQNCgPBStdz84DrxKF6WQpHfyP6zn1Jv-yK7d80lixU")',
                    }}
                />
            </div>
        </header>
    )
}
