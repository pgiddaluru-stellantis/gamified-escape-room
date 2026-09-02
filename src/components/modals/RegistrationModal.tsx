import { useState } from "react"
import type { UserData } from "@/types"
import { Tag } from "@/components/common/Tag"
import { GlowBtn } from "@/components/common/GlowBtn"
import { Field } from "@/components/common/Field"
import { ModalOverlay } from "@/components/common/ModalOverlay"

function isValidEmail(email: string): boolean {
    const trimmed = email.trim()
    const at = trimmed.indexOf("@")
    if (at <= 0 || at !== trimmed.lastIndexOf("@")) return false
    const domain = trimmed.slice(at + 1)
    const dot = domain.indexOf(".")
    return dot > 0 && dot < domain.length - 1 && !trimmed.includes(" ")
}

export function RegistrationModal({
    onClose,
    onSubmit,
}: Readonly<{
    onClose: () => void
    onSubmit: (data: UserData) => void
}>) {
    const [form, setForm] = useState<UserData>({
        name: "",
        email: "",
        department: "",
        tid: "",
        contributionType: "individual",
        teamName: "",
    })
    const [emailTouched, setEmailTouched] = useState(false)

    const set = (k: keyof UserData, v: string) => setForm((f) => ({ ...f, [k]: v }))

    const emailValid = isValidEmail(form.email)
    const valid =
        form.name &&
        emailValid &&
        form.department &&
        form.tid &&
        (form.contributionType === "individual" || form.teamName)

    return (
        <ModalOverlay onClose={onClose}>
            <div className="w-full max-w-[520px] bg-[#0a1319] border border-cyan-500/40 rounded-2xl p-7 shadow-[0_0_80px_#00f5ff18] animate-fade-up">
                <Tag>CASE FILE UNLOCK</Tag>
                <h2 className="font-display text-3xl font-bold uppercase text-slate-100 mt-3 mb-1">Register Agent</h2>
                <p className="text-slate-400 text-sm mb-6">Enter your credentials to receive your mission case file.</p>

                <div className="space-y-4">
                    <Field label="Full Name" placeholder="Agent full name" value={form.name} onChange={(v) => set("name", v)} />
                    <div>
                        <Field
                            label="Email"
                            placeholder="agent@company.com"
                            value={form.email}
                            onChange={(v) => set("email", v)}
                            onBlur={() => setEmailTouched(true)}
                            type="email"
                        />
                        {emailTouched && !emailValid && (
                            <p className="text-xs text-red-400 mt-1.5">Enter a valid email address.</p>
                        )}
                    </div>
                    <Field label="Department" placeholder="e.g. Technology & Innovation" value={form.department} onChange={(v) => set("department", v)} />
                    <Field label="TID (Employee ID)" placeholder="e.g. T0012345" value={form.tid} onChange={(v) => set("tid", v)} />

                    {/* Contribution toggle */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Contribution Type
                        </label>
                        <div className="flex rounded-lg overflow-hidden border border-[#1c2e38]">
                            {(["individual", "team"] as const).map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => set("contributionType", t)}
                                    className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer capitalize ${form.contributionType === t
                                        ? "bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400"
                                        : "text-slate-400 hover:text-slate-200"
                                        }`}
                                >
                                    {t === "individual" ? "Individual Contributor" : "Team Contributor"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Conditional team name */}
                    {form.contributionType === "team" && (
                        <div className="animate-fade-up">
                            <Field label="Team Name" placeholder="e.g. The Cipher Squad" value={form.teamName} onChange={(v) => set("teamName", v)} />
                        </div>
                    )}
                </div>

                <div className="flex gap-3 mt-7 justify-end">
                    <GlowBtn onClick={onClose} variant="ghost">Cancel</GlowBtn>
                    <GlowBtn onClick={() => valid && onSubmit(form)} variant="primary" disabled={!valid}>
                        <span>🔓</span> Unlock case file
                    </GlowBtn>
                </div>
            </div>
        </ModalOverlay>
    )
}
