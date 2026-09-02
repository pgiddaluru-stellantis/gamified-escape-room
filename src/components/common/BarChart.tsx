import type { ChartDatum } from "@/utils/aggregateRegistrations"

// Lightweight horizontal bar chart — no external charting dependency required.
export function BarChart({
    title,
    data,
    color = "#00f5ff",
}: Readonly<{
    title: string
    data: ChartDatum[]
    color?: string
}>) {
    const max = Math.max(1, ...data.map((d) => d.value))

    return (
        <div className="rounded-2xl border border-[#1c2e38] bg-[#0b1218] p-5">
            <h3 className="font-display text-lg font-bold uppercase text-slate-200 mb-4">{title}</h3>
            {data.length === 0 ? (
                <p className="text-slate-500 text-sm">No data yet.</p>
            ) : (
                <div className="space-y-3">
                    {data.map((d) => (
                        <div key={d.label}>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>{d.label}</span>
                                <span className="text-slate-200 font-semibold">{d.value}</span>
                            </div>
                            <div className="h-2.5 rounded-full bg-[#16232a] overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${(d.value / max) * 100}%`, background: color, boxShadow: `0 0 8px ${color}66` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
