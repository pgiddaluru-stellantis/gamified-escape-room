import type { UserData } from "@/types"
import { Tag } from "@/components/common/Tag"
import { GlowBtn } from "@/components/common/GlowBtn"
import { Card } from "@/components/common/Card"
import { EditableText } from "@/components/common/EditableText"

// Room 0 case file: shown right after registration, confirming the agent's captured details.
export function MissionControlScreen({
    userData,
    onNext,
    onBack,
}: Readonly<{
    userData: UserData
    onNext: () => void
    onBack: () => void
}>) {
    const details = [
        { label: "Agent Name", value: userData.name, icon: "◎" },
        { label: "Department", value: userData.department, icon: "⊞" },
        { label: "TID", value: userData.tid, icon: "⊛" },
        {
            label: "Contribution",
            value: userData.contributionType === "team" ? `Team · ${userData.teamName}` : "Individual Contributor",
            icon: "◈",
        },
    ]

    return (
        <div className="max-w-[720px] mx-auto animate-fade-up">
            {/* Case file header */}
            <div
                className="relative rounded-2xl border border-[#1c2e38] overflow-hidden p-10 text-center mb-5"
                style={{ background: "linear-gradient(135deg, #0a1319, #050d12)" }}
            >
                {/* Red stamp */}
                <div
                    className="absolute top-6 right-8 border-4 border-red-600 text-red-600 font-display font-black text-sm px-4 py-1.5 rounded tracking-widest uppercase animate-stamp opacity-0"
                    style={{ animationFillMode: "forwards", animationDelay: "0.3s" }}
                >
                    Case file opened
                </div>

                {/* Decorative lines */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    {[20, 40, 60, 80].map((pct) => (
                        <div key={pct} className="absolute w-full h-px bg-cyan-400/20" style={{ top: `${pct}%` }} />
                    ))}
                </div>

                <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full border-2 border-cyan-500/50 bg-cyan-500/10 flex items-center justify-center text-2xl mx-auto mb-5">
                        🔍
                    </div>
                    <Tag>CLASSIFIED</Tag>
                    <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-slate-100 mt-4 mb-2">
                        Room 0: Mission Control
                    </h1>
                    <p className="font-display text-4xl sm:text-5xl font-black uppercase text-cyan-400 mb-4">
                        Agent {userData.name.split(" ")[0]}.
                    </p>
                    <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                        <EditableText
                            id="mission-control-verified-text"
                            fallback="Your credentials have been verified. Your case file is unlocked and Mission Control is ready."
                        />
                    </p>
                </div>
            </div>

            {/* Evidence grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {details.map((d, i) => (
                    <Card
                        key={d.label}
                        className={`card-reveal-${i + 1} opacity-0`}
                        glow={i === 0}
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-cyan-400 text-xl font-display">{d.icon}</span>
                            <div>
                                <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-1">{d.label}</p>
                                <p className="text-slate-100 font-semibold">{d.value}</p>
                            </div>
                        </div>
                        {/* Dashed evidence marker */}
                        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-cyan-400 opacity-60 animate-pulse-glow" />
                    </Card>
                ))}
            </div>

            <div className="flex gap-3 justify-between">
                <GlowBtn onClick={onBack} variant="secondary">← Back</GlowBtn>
                <GlowBtn onClick={onNext} variant="primary">Next: Select your mission chamber →</GlowBtn>
            </div>
        </div>
    )
}
