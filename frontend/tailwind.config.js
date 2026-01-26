/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
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
                "panel-dark": "#111418",
                "vpc-border": "#ff4d94",
                "subnet-border": "#f97316",
                "card-bg": "#1c2027",
                "border-dark": "#1f2937",
                "accent-cyan": "#0ea5e9",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"],
                "sans": ["Inter", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "md": "0.375rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "3xl": "1.5rem",
                "full": "9999px",
            },
        },
    },
    plugins: [],
}
