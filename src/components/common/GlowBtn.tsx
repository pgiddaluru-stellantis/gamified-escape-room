import type { ReactNode } from "react"

type GlowBtnVariant = "primary" | "secondary" | "gold" | "ghost"

const BASE_CLASSES =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 border cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"

const VARIANT_CLASSES: Record<GlowBtnVariant, string> = {
    primary: "bg-cyan-400 text-slate-950 border-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_24px_#00f5ff55]",
    secondary: "bg-transparent text-slate-200 border-slate-600 hover:border-cyan-500 hover:shadow-[0_0_16px_#00f5ff22]",
    gold: "bg-transparent text-amber-400 border-amber-500/60 hover:border-amber-400 hover:shadow-[0_0_20px_#e0a84244]",
    ghost: "bg-transparent text-slate-400 border-slate-700/50 hover:text-slate-200 hover:border-slate-500",
}

export function GlowBtn({
    children,
    onClick,
    variant = "primary",
    className = "",
    disabled = false,
}: Readonly<{
    children: ReactNode
    onClick?: () => void
    variant?: GlowBtnVariant
    className?: string
    disabled?: boolean
}>) {
    return (
        <button type="button" className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}
