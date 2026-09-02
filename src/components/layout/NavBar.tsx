import { useEditMode } from "@/context/EditModeContext"

export function NavBar({
    registered,
    isAdmin,
    onOpenDashboard,
    onNavigateHome,
}: Readonly<{
    registered: boolean
    isAdmin: boolean
    onOpenDashboard: () => void
    onNavigateHome: () => void
}>) {
    const { editMode, beginEdit, saveEdits, cancelEdits } = useEditMode()

    return (
        <header className="sticky top-0 z-30 bg-[#05090dec] border-b border-[#1c2e38] backdrop-blur-xl">
            <div className="max-w-[1180px] mx-auto px-4 sm:px-6 flex items-center gap-3 min-h-[68px] flex-wrap py-2">
                {/* Wordmark */}
                <button
                    type="button"
                    onClick={onNavigateHome}
                    className="font-display text-lg font-bold tracking-wider mr-auto select-none cursor-pointer bg-transparent border-0 p-0"
                >
                    <span className="text-slate-200">ICT</span>{" "}
                    <span className="text-cyan-400">ESCAPE ROOM</span>
                </button>

                {registered && (
                    <div className="flex items-center gap-3">
                        <span className="text-cyan-400 text-xs font-semibold">Agent access granted</span>
                        {isAdmin && (
                            <button
                                type="button"
                                onClick={onOpenDashboard}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-200 cursor-pointer"
                            >
                                <span aria-hidden="true">⊞</span> Dashboard
                            </button>
                        )}

                        {isAdmin && !editMode && (
                            <button
                                type="button"
                                onClick={beginEdit}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 transition-all duration-200 cursor-pointer"
                            >
                                <span aria-hidden="true">✎</span> Edit
                            </button>
                        )}

                        {isAdmin && editMode && (
                            <>
                                <button
                                    type="button"
                                    onClick={saveEdits}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-[#5cf2a5]/50 text-[#5cf2a5] hover:bg-[#5cf2a5]/10 transition-all duration-200 cursor-pointer"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelEdits}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-slate-600 text-slate-300 hover:border-slate-400 transition-all duration-200 cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}
