import { useEffect, useState } from "react"

function getRemaining(target: Date) {
    const diff = Math.max(0, target.getTime() - Date.now())
    const days = Math.floor(diff / 86_400_000)
    const hours = Math.floor((diff % 86_400_000) / 3_600_000)
    const minutes = Math.floor((diff % 3_600_000) / 60_000)
    const seconds = Math.floor((diff % 60_000) / 1000)
    return { days, hours, minutes, seconds, done: diff <= 0 }
}

const UNITS = [
    { key: "days", label: "Days" },
    { key: "hours", label: "Hrs" },
    { key: "minutes", label: "Min" },
    { key: "seconds", label: "Sec" },
] as const

// Live countdown to the Innovation Vault opening, shown ahead of every vault section.
export function CountdownTimer({ target, accent = "#e0a842" }: Readonly<{ target: Date; accent?: string }>) {
    const [remaining, setRemaining] = useState(() => getRemaining(target))

    useEffect(() => {
        const id = setInterval(() => setRemaining(getRemaining(target)), 1000)
        return () => clearInterval(id)
    }, [target])

    return (
        <div className="rounded-2xl border border-amber-500/30 bg-[#0b0d08] p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-amber-400/80 mb-3 text-center">
                {remaining.done ? "The vault is open" : "Vault opens in"}
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-5">
                {UNITS.map((u) => (
                    <div key={u.key} className="text-center min-w-[52px]">
                        <div
                            className="font-display text-2xl sm:text-3xl font-black tabular-nums"
                            style={{ color: accent }}
                        >
                            {String(remaining[u.key]).padStart(2, "0")}
                        </div>
                        <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-500 mt-0.5">
                            {u.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
