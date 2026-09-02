import { useState } from "react"
import { GlowBtn } from "@/components/common/GlowBtn"
import { ModalOverlay } from "@/components/common/ModalOverlay"

const CLUE_TYPES = ["Hint Card", "AI Prompt Suggestion", "Additional Context"] as const

export interface ClueRequestData {
    teamName: string
    clueType: (typeof CLUE_TYPES)[number]
    blocker: string
}

// Matches the reference "Request a clue" popup: team name, clue type and a blocker description.
export function ClueRequestModal({
    onClose,
    onSubmit,
}: Readonly<{
    onClose: () => void
    onSubmit: (data: ClueRequestData) => void
}>) {
    const [teamName, setTeamName] = useState("")
    const [clueType, setClueType] = useState<ClueRequestData["clueType"]>(CLUE_TYPES[0])
    const [blocker, setBlocker] = useState("")

    return (
        <ModalOverlay onClose={onClose}>
            <div className="w-full max-w-[520px] bg-[#0a1319] border border-cyan-500/30 rounded-2xl p-7 shadow-[0_0_80px_#00f5ff18] animate-fade-up">
                <h2 className="font-display text-2xl font-bold text-slate-100 mb-6">Request a clue</h2>

                <div className="space-y-5">
                    <div>
                        <label htmlFor="clue-team-name" className="block text-sm text-slate-300 mb-2">Team name</label>
                        <input
                            id="clue-team-name"
                            className="w-full bg-[#05090d] border border-[#1c2e38] rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 transition-colors"
                            placeholder="Enter team name"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="clue-type" className="block text-sm text-slate-300 mb-2">Clue type</label>
                        <select
                            id="clue-type"
                            className="w-full bg-[#05090d] border border-[#1c2e38] rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/60 cursor-pointer"
                            value={clueType}
                            onChange={(e) => setClueType(e.target.value as ClueRequestData["clueType"])}
                        >
                            {CLUE_TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="clue-blocker" className="block text-sm text-slate-300 mb-2">What are you stuck on?</label>
                        <textarea
                            id="clue-blocker"
                            className="w-full bg-[#05090d] border border-[#1c2e38] rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 font-mono focus:outline-none focus:border-cyan-500/60 resize-none transition-colors"
                            rows={4}
                            placeholder="Describe the blocker without sharing sensitive information"
                            value={blocker}
                            onChange={(e) => setBlocker(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-7 justify-end">
                    <GlowBtn onClick={onClose} variant="ghost">Cancel</GlowBtn>
                    <GlowBtn onClick={() => onSubmit({ teamName, clueType, blocker })} variant="primary">
                        Send request
                    </GlowBtn>
                </div>
            </div>
        </ModalOverlay>
    )
}
