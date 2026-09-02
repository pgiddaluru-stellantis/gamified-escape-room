import { useState } from "react"
import type { Chamber } from "@/types"
import { Tag } from "@/components/common/Tag"
import { GlowBtn } from "@/components/common/GlowBtn"
import { EditableText } from "@/components/common/EditableText"
import { VaultDoorIcon } from "@/components/icons/VaultDoorIcon"
import { CHAMBERS, CHAMBER_COLORS, CHAMBER_TAG_COLORS } from "@/data/chambers"

// Mission chamber picker: browse problem statements and Clue Masters, then register into one chamber.
export function ChamberSelectScreen({
    onSelect,
    selected,
    onBack,
    onRegister,
}: {
    onSelect: (c: Chamber) => void
    selected: Chamber | null
    onBack: () => void
    onRegister: () => void
}) {
    const [hovered, setHovered] = useState<Chamber | null>(null)

    return (
        <div className="animate-fade-up">
            <div className="mb-8 text-center">
                <Tag>CASE FILES</Tag>
                <h1 className="font-display text-5xl sm:text-6xl font-black uppercase text-slate-100 mt-3 mb-2">
                    Select your mission chamber
                </h1>
                <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
                    <EditableText
                        id="chamber-select-subtitle"
                        fallback="Each vault contains a problem statement, datasets, AI tool guide and a Clue Master standing by. Choose wisely — you cannot switch once registered."
                    />
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                {(["A", "B", "C"] as Chamber[]).map((ch) => {
                    const data = CHAMBERS[ch]
                    const color = CHAMBER_COLORS[ch]
                    const isSelected = selected === ch
                    const isHovered = hovered === ch

                    return (
                        <button
                            key={ch}
                            onClick={() => onSelect(ch)}
                            onMouseEnter={() => setHovered(ch)}
                            onMouseLeave={() => setHovered(null)}
                            className="text-left rounded-2xl border bg-[#081117] p-6 relative overflow-hidden transition-all duration-300 cursor-pointer"
                            style={{
                                borderColor: isSelected ? color : isHovered ? `${color}66` : "#1c2e38",
                                boxShadow: isSelected
                                    ? `0 0 50px ${color}30, inset 0 0 40px ${color}10`
                                    : isHovered
                                        ? `0 0 25px ${color}18`
                                        : "none",
                                transform: isHovered && !isSelected ? "translateY(-4px)" : isSelected ? "translateY(-6px) scale(1.01)" : "none",
                                animation: isSelected ? "shake 0.4s ease" : "none",
                            }}
                        >
                            {/* Glow overlay */}
                            <div
                                className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
                                style={{
                                    background: `radial-gradient(circle at 50% 0%, ${color}18, transparent 60%)`,
                                    opacity: isSelected ? 1 : isHovered ? 0.7 : 0,
                                }}
                            />

                            {/* Selected checkmark */}
                            {isSelected && (
                                <div
                                    className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                    style={{ background: color, color: "#05090d" }}
                                >
                                    ✓
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <Tag color={CHAMBER_TAG_COLORS[ch]}>USE CASE {data.useCase}</Tag>
                            </div>

                            <div className="flex justify-center my-4 relative z-10">
                                <VaultDoorIcon color={color} />
                            </div>

                            <h3
                                className="font-display text-2xl font-black uppercase mb-1 relative z-10"
                                style={{ color: isSelected || isHovered ? color : "#e2e8f0" }}
                            >
                                {data.title}
                            </h3>
                            <p className="text-xs font-semibold mb-2 relative z-10" style={{ color: `${color}aa` }}>
                                {data.tagline}
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed relative z-10">{data.description}</p>
                        </button>
                    )
                })}
            </div>

            {/* Selected chamber detail: problem statement + Clue Master(s) + register */}
            {selected && (
                <div
                    className="rounded-2xl border bg-[#0b1218] p-6 mb-8 animate-fade-up"
                    style={{ borderColor: `${CHAMBER_COLORS[selected]}44` }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <h2 className="font-display text-2xl font-bold uppercase text-slate-200 mb-3">Problem Statement</h2>
                            <div className="border border-dashed border-slate-600/50 rounded-xl p-4 text-slate-300 text-sm leading-relaxed bg-[#05090d]/60">
                                {CHAMBERS[selected].problem}
                            </div>
                        </div>
                        <div>
                            <h2 className="font-display text-2xl font-bold uppercase text-slate-200 mb-3">
                                {CHAMBERS[selected].clueMasters.length > 1 ? "Clue Masters" : "Clue Master"}
                            </h2>
                            <div className="space-y-4">
                                {CHAMBERS[selected].clueMasters.map((cm) => (
                                    <div key={cm.name} className="flex items-start gap-3">
                                        <div
                                            className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-sm font-display font-black text-[#05090d]"
                                            style={{ background: `linear-gradient(135deg, ${CHAMBER_COLORS[selected]}, ${CHAMBER_COLORS[selected]}88)` }}
                                        >
                                            {cm.initials}
                                        </div>
                                        <div>
                                            <p className="text-slate-200 font-semibold text-sm">{cm.name}</p>
                                            <p className="text-slate-500 text-xs">{cm.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <GlowBtn onClick={onRegister} variant="primary">
                            Register for Chamber {selected} →
                        </GlowBtn>
                    </div>
                </div>
            )}

            <div className="flex gap-3 justify-between">
                <GlowBtn onClick={onBack} variant="secondary">← Back</GlowBtn>
            </div>
        </div>
    )
}
