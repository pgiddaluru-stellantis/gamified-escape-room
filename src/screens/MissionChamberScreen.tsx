import { useState } from "react"
import type { Chamber } from "@/types"
import { Tag } from "@/components/common/Tag"
import { GlowBtn } from "@/components/common/GlowBtn"
import { Card } from "@/components/common/Card"
import { EditableText } from "@/components/common/EditableText"
import { MagnifyIcon } from "@/components/icons/MagnifyIcon"
import { ClueRequestModal, type ClueRequestData } from "@/components/modals/ClueRequestModal"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { CHAMBERS, CHAMBER_COLORS, CHAMBER_TAG_COLORS } from "@/data/chambers"
import { PROGRESS_PHASES } from "@/data/timeline"

const CHAMBER_ROOM_NUMBER: Record<Chamber, string> = { A: "1", B: "2", C: "3" }
const CLUE_INVESTIGATE_COST = 75

const MISSION_RESOURCES = [
    { label: "Dataset", desc: "Approved dataset — download or query via the data API." },
    { label: "Supporting document", desc: "Background reading, process maps and reference files." },
    { label: "AI tool guide", desc: "Approved tool guidance, usage considerations and rate limits." },
]

// The active mission chamber: problem statement, resources, clue masters and clues.
export function MissionChamberScreen({
    chamber,
    addXp,
    onBack,
    onNext,
    showToast,
}: Readonly<{
    chamber: Chamber
    addXp: (n: number) => void
    onBack: () => void
    onNext: () => void
    showToast: (msg: string, badge?: string) => void
}>) {
    const data = CHAMBERS[chamber]
    const color = CHAMBER_COLORS[chamber]
    const [clueStates, setClueStates] = useState([false, false, false])
    const [pendingClueIndex, setPendingClueIndex] = useState<number | null>(null)
    const [showClueRequest, setShowClueRequest] = useState(false)
    const [chamberProgress, setChamberProgress] = useState(20)
    const [progressSaved, setProgressSaved] = useState(false)

    const revealClue = (i: number) => {
        if (clueStates[i]) return
        const next = [...clueStates]
        next[i] = true
        setClueStates(next)
        addXp(-CLUE_INVESTIGATE_COST)
        showToast(`-${CLUE_INVESTIGATE_COST} points — Clue investigated.`, "Clue used")
    }

    const confirmInvestigate = () => {
        if (pendingClueIndex !== null) revealClue(pendingClueIndex)
        setPendingClueIndex(null)
    }

    const handleClueRequestSubmit = (_data: ClueRequestData) => {
        setShowClueRequest(false)
        showToast("Clue request sent to your Clue Master.", "Request sent")
    }

    const handleProgress = (val: number) => {
        setChamberProgress(val)
        const phase = PROGRESS_PHASES.find((p) => p.value === val)
        setProgressSaved(true)
        setTimeout(() => setProgressSaved(false), 2000)
        showToast(`Progress updated: ${phase?.label}`)
    }

    return (
        <div className="animate-fade-up space-y-5">
            {/* Header */}
            <div
                className="rounded-2xl border p-7 relative overflow-hidden"
                style={{
                    borderColor: `${color}44`,
                    background: `linear-gradient(110deg, #0a141be8, #130d09d9), radial-gradient(circle at 85% 35%, ${color}22, transparent 25%)`,
                }}
            >
                <Tag color={CHAMBER_TAG_COLORS[chamber]}>USE CASE {data.useCase}</Tag>
                <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-slate-100 mt-2 mb-1">
                    Room {CHAMBER_ROOM_NUMBER[chamber]}: <span style={{ color }}>{data.title}</span>
                </h1>
                <p className="text-slate-400 leading-relaxed max-w-2xl">
                    <EditableText id={`chamber-${chamber}-tagline`} fallback={data.tagline} />
                </p>
                <div className="flex gap-3 mt-5 flex-wrap">
                    <GlowBtn variant="secondary" onClick={onBack}>← Mission Control</GlowBtn>
                    <GlowBtn variant="ghost" onClick={onNext}>Next: View progress →</GlowBtn>
                </div>
            </div>

            {/* Two column */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Left: problem + resources */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Problem statement */}
                    <Card>
                        <h2 className="font-display text-2xl font-bold uppercase text-slate-200 mb-3">Problem Statement</h2>
                        <div className="border border-dashed border-slate-600/50 rounded-xl p-4 text-slate-300 text-sm leading-relaxed bg-[#05090d]/60">
                            <EditableText id={`chamber-${chamber}-problem`} fallback={data.problem} as="p" />
                        </div>
                    </Card>

                    {/* Resources */}
                    <Card>
                        <h2 className="font-display text-2xl font-bold uppercase text-slate-200 mb-3">Mission Resources</h2>
                        {MISSION_RESOURCES.map((r, i) => (
                            <div
                                key={r.label}
                                className={`flex items-center justify-between gap-4 py-4 ${i < MISSION_RESOURCES.length - 1 ? "border-b border-[#1c2e38]" : ""}`}
                            >
                                <div>
                                    <p className="text-slate-200 font-semibold text-sm">
                                        <EditableText id={`mission-resource-${i}-label`} fallback={r.label} />
                                    </p>
                                    <p className="text-slate-500 text-xs mt-0.5">
                                        <EditableText id={`mission-resource-${i}-desc`} fallback={r.desc} />
                                    </p>
                                </div>
                                <GlowBtn variant="secondary" className="shrink-0 text-xs">Open</GlowBtn>
                            </div>
                        ))}
                    </Card>
                </div>

                {/* Right: clue master sidebar (supports one or more clue masters) */}
                <div className="space-y-5">
                    <Card className="text-center">
                        <Tag color={CHAMBER_TAG_COLORS[chamber]}>{data.clueMasters.length > 1 ? "Clue Masters" : "Clue Master"}</Tag>
                        <div className="space-y-5 mt-1">
                            {data.clueMasters.map((cm, i) => (
                                <div key={cm.name} className={i > 0 ? "pt-5 border-t border-[#1c2e38]" : ""}>
                                    <div
                                        className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-display font-black mx-auto mb-4 text-[#05090d]"
                                        style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
                                    >
                                        {cm.initials}
                                    </div>
                                    <h3 className="font-display text-xl font-bold uppercase" style={{ color }}>
                                        <EditableText id={`chamber-${chamber}-clue-master-${i}-name`} fallback={cm.name} />
                                    </h3>
                                    <p className="text-slate-500 text-xs mb-3">
                                        <EditableText id={`chamber-${chamber}-clue-master-${i}-role`} fallback={cm.role} />
                                    </p>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        <EditableText id={`chamber-${chamber}-clue-master-${i}-desc`} fallback={cm.description} />
                                    </p>
                                </div>
                            ))}
                        </div>
                        <GlowBtn
                            onClick={() => setShowClueRequest(true)}
                            variant={chamber === "B" ? "gold" : "primary"}
                            className="w-full justify-center mt-4"
                        >
                            Request a clue
                        </GlowBtn>
                    </Card>

                    {/* Team progress */}
                    <Card>
                        <h3 className="font-display text-lg font-bold uppercase text-slate-200 mb-3">Team Progress</h3>
                        <div className="h-2 rounded-full bg-[#16232a] overflow-hidden mb-3">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${chamberProgress}%`,
                                    background: `linear-gradient(90deg, ${color}, ${color}88)`,
                                    boxShadow: `0 0 10px ${color}66`,
                                }}
                            />
                        </div>
                        <select
                            className="w-full bg-[#05090d] border border-[#1c2e38] rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60 cursor-pointer"
                            value={chamberProgress}
                            onChange={(e) => handleProgress(Number(e.target.value))}
                        >
                            {PROGRESS_PHASES.map((p) => (
                                <option key={p.value} value={p.value}>{p.label}</option>
                            ))}
                        </select>
                        {progressSaved && <p className="text-xs text-cyan-400 mt-2">✓ Progress updated</p>}
                    </Card>
                </div>
            </div>

            {/* Case clues */}
            <div className="rounded-2xl border border-[#1c2e38] bg-[#0b1218] p-6">
                <h2 className="font-display text-2xl font-bold uppercase text-slate-100 mb-1">Case Clues</h2>
                <p className="text-slate-400 text-sm mb-5">
                    You have 3 clue requests available. Use them for Hint Cards, AI Prompt Suggestions or Additional Context.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.clues.map((clue, i) => (
                        <div
                            key={clue.title}
                            className={`rounded-xl border p-4 transition-all duration-300 ${clueStates[i]
                                ? "border-[#1c2e38] opacity-100"
                                : "border-dashed border-slate-600/60 hover:border-cyan-500/40 cursor-pointer"
                                }`}
                            style={clueStates[i] ? { background: `${color}08`, borderColor: `${color}44` } : {}}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <MagnifyIcon className={clueStates[i] ? "text-cyan-400" : "text-slate-500"} />
                                <span className="text-xs font-bold tracking-widest uppercase text-slate-500">{clue.title}</span>
                            </div>
                            {clueStates[i] ? (
                                <p className="text-slate-300 text-sm leading-relaxed">{clue.hint}</p>
                            ) : (
                                <>
                                    <p className="text-slate-500 text-sm mb-3">Status: Unsolved</p>
                                    <GlowBtn
                                        onClick={() => setPendingClueIndex(i)}
                                        variant="secondary"
                                        className="w-full justify-center text-xs"
                                    >
                                        Investigate
                                    </GlowBtn>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {pendingClueIndex !== null && (
                <ConfirmModal
                    title="Use this clue?"
                    message={`Using this clue will deduct ${CLUE_INVESTIGATE_COST} points. Do you want to continue?`}
                    onConfirm={confirmInvestigate}
                    onCancel={() => setPendingClueIndex(null)}
                />
            )}

            {showClueRequest && (
                <ClueRequestModal onClose={() => setShowClueRequest(false)} onSubmit={handleClueRequestSubmit} />
            )}
        </div>
    )
}
