import type { ReactNode } from "react"

type TagColor = "cyan" | "gold" | "purple"

const COLOR_STYLES: Record<TagColor, string> = {
    cyan: "border-cyan-500/40 text-cyan-400",
    gold: "border-amber-500/40 text-amber-400",
    purple: "border-purple-500/40 text-purple-400",
}

export function Tag({ children, color = "cyan" }: Readonly<{ children: ReactNode; color?: TagColor }>) {
    return (
        <span className={`inline-block border rounded-full px-3 py-0.5 text-xs font-bold tracking-widest uppercase ${COLOR_STYLES[color]}`}>
            {children}
        </span>
    )
}
