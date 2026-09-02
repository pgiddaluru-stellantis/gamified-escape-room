import type { Modal } from "@/types"
import { Tag } from "@/components/common/Tag"
import { GlowBtn } from "@/components/common/GlowBtn"
import { EditableText } from "@/components/common/EditableText"
import { CountdownTimer } from "@/components/common/CountdownTimer"
import { TIMELINE_STEPS, VAULT_OPENS_AT } from "@/data/timeline"

const TIMELINE_PINS = [
    { x: 80, y: 240 },
    { x: 280, y: 80 },
    { x: 480, y: 200 },
    { x: 680, y: 80 },
    { x: 820, y: 200 },
].map((pos, i) => ({ ...pos, step: TIMELINE_STEPS[i] }))

// Timeline of the five-day event, rendered as a winding path map plus phase cards.
export function TimelineScreen({
    openModal,
    onBack,
}: {
    openModal: (m: Modal) => void
    onBack: () => void
}) {
    return (
        <div className="animate-fade-up">
            <div className="mb-8">
                <Tag>MISSION TIMELINE</Tag>
                <h1 className="font-display text-5xl sm:text-6xl font-black uppercase text-slate-100 mt-3 mb-2">
                    Progress through the week
                </h1>
                <p className="text-slate-400 max-w-xl leading-relaxed">
                    <EditableText
                        id="timeline-subtitle"
                        fallback="Track the current phase and see where the mission stands each day across the five-day event."
                    />
                </p>
            </div>

            {/* Winding path map */}
            <div className="rounded-2xl border border-[#1c2e38] bg-[#0b1218] p-8 mb-5 relative overflow-hidden">
                {/* Background texture */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, #00f5ff08 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }}
                />

                {/* SVG Path */}
                <div className="relative">
                    <svg viewBox="0 0 900 320" className="w-full" style={{ height: "clamp(200px, 30vw, 320px)" }} aria-label="Progress timeline map">
                        {/* Trail path */}
                        <path
                            d="M 80 240 C 160 240 200 80 280 80 C 360 80 400 200 480 200 C 560 200 600 80 680 80 C 760 80 800 200 820 200"
                            fill="none"
                            stroke="#1c2e38"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray="8 6"
                        />
                        <path
                            d="M 80 240 C 160 240 200 80 280 80 C 360 80 400 200 480 200"
                            fill="none"
                            stroke="#00f5ff"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="path-draw"
                            style={{ filter: "drop-shadow(0 0 6px #00f5ff88)" }}
                        />

                        {/* Pins */}
                        {TIMELINE_PINS.map(({ x, y, step }, i) => {
                            const isCompleted = step.completed
                            const isCurrent = step.current
                            const color = isCompleted ? "#00f5ff" : isCurrent ? "#e0a842" : "#1c2e38"
                            const textColor = isCompleted ? "#00f5ff" : isCurrent ? "#e0a842" : "#4a6370"

                            return (
                                <g key={i}>
                                    {/* Outer glow ring for current */}
                                    {isCurrent && (
                                        <circle
                                            cx={x}
                                            cy={y}
                                            r="22"
                                            fill="none"
                                            stroke="#e0a842"
                                            strokeWidth="1"
                                            opacity="0.4"
                                            className="animate-pin-pulse"
                                        />
                                    )}
                                    {/* Pin circle */}
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r="14"
                                        fill={isCompleted ? "#00f5ff22" : isCurrent ? "#e0a84222" : "#0b1218"}
                                        stroke={color}
                                        strokeWidth="2"
                                    />
                                    {/* Pin icon */}
                                    <text x={x} y={y + 5} textAnchor="middle" fill={color} fontSize="12" fontWeight="bold">
                                        {isCompleted ? "✓" : isCurrent ? "◆" : String(i + 1)}
                                    </text>

                                    {/* Label box — alternating above/below */}
                                    <foreignObject
                                        x={x - 70}
                                        y={i % 2 === 0 ? y + 22 : y - 72}
                                        width="140"
                                        height="64"
                                    >
                                        <div
                                            style={{
                                                background: isCurrent ? "#1a1000" : "#081117",
                                                border: `1px solid ${color}44`,
                                                borderRadius: "8px",
                                                padding: "6px 8px",
                                                textAlign: "center",
                                            }}
                                        >
                                            <p style={{ color: textColor, fontSize: "11px", fontWeight: 700, margin: 0, fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                                                {step.date}
                                            </p>
                                            <p style={{ color: isCurrent ? "#e0a842" : isCompleted ? "#00f5ff" : "#4a6370", fontSize: "10px", fontWeight: 600, margin: "2px 0 0", fontFamily: "Inter,sans-serif" }}>
                                                {step.phase}
                                            </p>
                                        </div>
                                    </foreignObject>
                                </g>
                            )
                        })}
                    </svg>
                </div>

                {/* Phase descriptions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
                    {TIMELINE_STEPS.map((step, i) => (
                        <div
                            key={i}
                            className="rounded-xl p-3 border transition-all"
                            style={{
                                borderColor: step.current ? "#e0a84244" : step.completed ? "#00f5ff22" : "#1c2e38",
                                background: step.current ? "#1a100800" : "transparent",
                                borderTopWidth: step.current ? "3px" : "1px",
                                borderTopColor: step.current ? "#e0a842" : step.completed ? "#00f5ff" : "#1c2e38",
                            }}
                        >
                            <p
                                className="text-xs font-bold font-display uppercase tracking-widest mb-1"
                                style={{ color: step.current ? "#e0a842" : step.completed ? "#00f5ff" : "#4a6370" }}
                            >
                                {step.date}
                            </p>
                            <p className="text-slate-300 text-xs font-semibold mb-1">
                                <EditableText id={`timeline-step-${i}-phase`} fallback={step.phase} />
                            </p>
                            <p className="text-slate-500 text-xs leading-relaxed">
                                <EditableText id={`timeline-step-${i}-desc`} fallback={step.desc} />
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Countdown to the Innovation Vault opening */}
            <CountdownTimer target={VAULT_OPENS_AT} />

            {/* Innovation Vault card */}
            <div
                className="rounded-2xl border border-amber-500/30 p-7 relative overflow-hidden"
                style={{ background: "linear-gradient(130deg, #100e08, #081117)" }}
            >
                <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{ background: "radial-gradient(circle at 80% 50%, #e0a84222, transparent 50%)" }}
                />
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <Tag color="gold">FINAL SUBMISSION</Tag>
                        <h2 className="font-display text-4xl font-black uppercase text-amber-400 mt-2 mb-1">Innovation Vault</h2>
                        <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                            <EditableText
                                id="timeline-vault-desc"
                                fallback="Oct 8 — Finalise and upload your presentation, demo video, value statement and the AI tool used. The vault opens at 09:00."
                            />
                        </p>
                    </div>
                    <GlowBtn onClick={() => openModal("vault")} variant="gold" className="shrink-0 animate-pulse-gold">
                        Open submission
                    </GlowBtn>
                </div>
            </div>

            <div className="mt-5">
                <GlowBtn onClick={onBack} variant="secondary">← Back</GlowBtn>
            </div>
        </div>
    )
}
