import type { Chamber, Modal, Screen } from "@/types"
import { Tag } from "@/components/common/Tag"
import { GlowBtn } from "@/components/common/GlowBtn"
import { Card } from "@/components/common/Card"
import { EditableText } from "@/components/common/EditableText"
import { CountdownTimer } from "@/components/common/CountdownTimer"
import { KeyholeIcon } from "@/components/icons/KeyholeIcon"
import { VaultDoorIcon } from "@/components/icons/VaultDoorIcon"
import { CHAMBERS, CHAMBER_COLORS, CHAMBER_TAG_COLORS } from "@/data/chambers"
import { VAULT_OPENS_AT } from "@/data/timeline"

const MISSION_CONTROL_CARDS = [
    {
        tag: "START HERE",
        icon: "◎",
        title: "Mission Briefing",
        desc: "Review the challenge structure, understand what success looks like, and decide which mission your team will enter.",
    },
    {
        tag: "GUIDANCE",
        icon: "⊞",
        title: "Rules & FAQs",
        desc: "Participation rules, frequently asked questions, AI tool guidance, and boundaries for what's in scope.",
    },
    {
        tag: "SUPPORT",
        icon: "◈",
        title: "Meet the Clue Masters",
        desc: "Office hours schedules, mission walkthroughs, and the route for requesting a clue when you're stuck.",
    },
]

// Landing page: hero banner plus registered-only teasers for mission control, chambers and the vault.
export function LandingScreen({
    openModal,
    setScreen,
    registered,
}: Readonly<{
    openModal: (m: Modal) => void
    setScreen: (s: Screen) => void
    registered: boolean
}>) {
    return (
        <div className="space-y-5 animate-fade-up">
            {/* Hero */}
            <div
                className="relative overflow-hidden rounded-2xl border border-[#1c2e38] min-h-[460px] flex items-center p-8 sm:p-14"
                style={{
                    background:
                        "linear-gradient(90deg, #05090ef7 0% 46%, #051018cc), radial-gradient(circle at 80% 52%, #00f5ff28 0% 2%, transparent 18%), linear-gradient(135deg, #101a20, #030608)",
                }}
            >
                {/* Decorative keyhole */}
                <div className="absolute right-[6%] top-[8%] w-[180px] h-[260px] opacity-70 hidden sm:block pointer-events-none">
                    <KeyholeIcon />
                </div>

                {/* Scanline overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.04]"
                    style={{
                        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00f5ff 2px, #00f5ff 3px)",
                        backgroundSize: "100% 6px",
                    }}
                />

                <div className="relative z-10 max-w-[640px]">
                    <p className="text-cyan-400 font-bold tracking-[0.22em] text-xs uppercase mb-3">
                        Unlock the future with AI
                    </p>
                    <h1 className="font-display font-black text-[clamp(42px,7vw,76px)] leading-[0.92] uppercase text-slate-100 mb-4">
                        ICT Escape Room<br />
                        <span className="text-cyan-400">Hackathon</span>
                    </h1>
                    <EditableText
                        id="landing-hero-description"
                        fallback="Three critical missions are preventing the organisation from moving forward. Select and complete one mission to unlock the Innovation Vault and earn your place at the Showcase Escape Event."
                        as="p"
                        className="text-slate-400 text-lg leading-relaxed max-w-[560px]"
                    />
                    <div className="flex gap-3 flex-wrap mt-6">
                        <GlowBtn onClick={() => (registered ? setScreen("dossier") : setScreen("chambers"))} variant="primary">
                            {registered ? "View case file" : "View Case Files"}
                        </GlowBtn>
                        <GlowBtn onClick={() => setScreen("progress")} variant="gold">
                            View timeline
                        </GlowBtn>
                    </div>
                </div>
            </div>

            {/* Room 0: Mission Control */}
            {/* {registered && ( */}
            <div className="rounded-2xl border border-[#1c2e38] bg-[#0b1218] p-6">
                <h2 className="font-display text-3xl font-bold uppercase text-slate-100 mb-1">
                    Room 0: Mission Control
                </h2>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                    <EditableText
                        id="landing-mission-control-desc"
                        fallback="Your starting point for the keynote, rules, timeline, FAQs, AI tool guide and mission explanation."
                    />
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MISSION_CONTROL_CARDS.map((c, i) => (
                        <Card
                            key={c.title}
                            className="hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_0_20px_#00f5ff12] cursor-pointer min-h-[180px] group"
                        >
                            <Tag>{c.tag}</Tag>
                            <div className="absolute right-4 bottom-3 text-4xl text-cyan-400/10 group-hover:text-cyan-400/20 transition-colors font-display select-none">
                                {c.icon}
                            </div>
                            <h3 className="font-display text-xl font-bold uppercase text-slate-200 mt-2 mb-1">
                                <EditableText id={`landing-mission-control-card-${i}-title`} fallback={c.title} />
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                <EditableText id={`landing-mission-control-card-${i}-desc`} fallback={c.desc} />
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
            {/* )} */}

            {/* Chamber teasers */}
            {/* {registered && ( */}
            <div className="rounded-2xl border border-[#1c2e38] bg-[#0b1218] p-6">
                <h2 className="font-display text-3xl font-bold uppercase text-slate-100 mb-1">Select your mission chamber</h2>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                    <EditableText
                        id="landing-chambers-desc"
                        fallback="Each chamber has a problem statement, datasets, supporting documents and a dedicated Clue Master."
                    />
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(["A", "B", "C"] as Chamber[]).map((ch) => {
                        const data = CHAMBERS[ch]
                        return (
                            <Card
                                key={ch}
                                className="cursor-pointer hover:-translate-y-1 transition-all duration-200 min-h-[220px] group"
                                style={{ "--glow": CHAMBER_COLORS[ch] } as React.CSSProperties}
                            >
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{ boxShadow: `inset 0 0 40px ${CHAMBER_COLORS[ch]}12`, border: `1px solid ${CHAMBER_COLORS[ch]}44` }}
                                />
                                <div className="flex justify-between items-start">
                                    <Tag color={CHAMBER_TAG_COLORS[ch]}>USE CASE {data.useCase}</Tag>
                                    <VaultDoorIcon color={CHAMBER_COLORS[ch]} />
                                </div>
                                <h3 className="font-display text-xl font-bold uppercase text-slate-200 mt-1 mb-1">{data.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{data.description}</p>
                            </Card>
                        )
                    })}
                </div>
            </div>
            {/* )} */}

            {/* Countdown to the Innovation Vault opening */}
            <CountdownTimer target={VAULT_OPENS_AT} />

            {/* Innovation Vault teaser */}
            {/* {registered && ( */}
            <div
                className="rounded-2xl border border-amber-500/30 p-6"
                style={{ background: "linear-gradient(130deg, #100e08, #081117)" }}
            >
                <Tag color="gold">FINAL ROOM</Tag>
                <h2 className="font-display text-3xl font-bold uppercase text-amber-400 mt-2 mb-1">Innovation Vault</h2>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    <EditableText
                        id="landing-vault-desc"
                        fallback="The final room. Teams submit their presentation, demo video, value statement and the AI tool used."
                    />
                </p>
                <GlowBtn onClick={() => openModal("vault")} variant="gold">
                    Open submission
                </GlowBtn>
            </div>
            {/* )} */}
        </div>
    )
}
