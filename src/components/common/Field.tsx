import type { CSSProperties } from "react"
export function Field({
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    accent = "cyan",
    type = "text",
}: Readonly<{
    label: string
    placeholder: string
    value: string
    onChange: (v: string) => void
    onBlur?: () => void
    accent?: "cyan" | "gold"
    type?: string
}>) {
    return (
        <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-1.5">{label}</label>
            <input
                type={type}
                className="w-full bg-[#05090d] border border-[#1c2e38] rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-colors"
                style={{ "--focus-color": accent === "gold" ? "#e0a842" : "#00f5ff" } as CSSProperties}
                onFocus={(e) => (e.target.style.borderColor = accent === "gold" ? "#e0a84266" : "#00f5ff66")}
                onBlur={(e) => {
                    e.target.style.borderColor = "#1c2e38"
                    onBlur?.()
                }}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
