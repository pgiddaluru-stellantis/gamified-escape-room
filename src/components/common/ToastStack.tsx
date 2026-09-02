import type { Toast } from "@/types"

export function ToastStack({ toasts }: Readonly<{ toasts: Toast[] }>) {
    return (
        <div className="fixed bottom-6 left-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none" style={{ transform: "translateX(-50%)" }}>
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className="bg-[#10231b] border border-[#5cf2a5]/40 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#5cf2a5] shadow-[0_0_20px_#5cf2a520]"
                    style={{ animation: "toast-in 0.3s ease forwards" }}
                >
                    {t.badge && (
                        <span className="inline-block bg-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded mr-2">
                            {t.badge}
                        </span>
                    )}
                    {t.msg}
                </div>
            ))}
        </div>
    )
}
