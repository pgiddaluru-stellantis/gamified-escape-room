import type { CSSProperties, ReactNode } from "react"

export function Card({
    children,
    className = "",
    glow = false,
    gold = false,
    style,
}: {
    children: ReactNode
    className?: string
    glow?: boolean
    gold?: boolean
    style?: CSSProperties
}) {
    return (
        <div
            className={`
        rounded-2xl border bg-[#081117] p-5 relative overflow-hidden
        transition-all duration-300
        ${glow ? "border-cyan-500/50 shadow-[0_0_30px_#00f5ff18]" : "border-[#1c2e38]"}
        ${gold ? "border-amber-500/40 shadow-[0_0_30px_#e0a84218]" : ""}
        ${className}
      `}
            style={style}
        >
            {children}
        </div>
    )
}
