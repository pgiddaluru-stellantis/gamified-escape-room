import { useState } from "react"
import type { Submission } from "@/types"
import { Tag } from "@/components/common/Tag"
import { GlowBtn } from "@/components/common/GlowBtn"
import { Field } from "@/components/common/Field"
import { ModalOverlay } from "@/components/common/ModalOverlay"

export function VaultModal({
    onClose,
    onSubmit,
    defaultProblemStatement,
}: Readonly<{
    onClose: () => void
    onSubmit: (data: Submission) => void
    defaultProblemStatement: string
}>) {
    const [form, setForm] = useState({
        ideaName: "",
        problemStatement: defaultProblemStatement,
        pptFileName: "",
        videoFileName: "",
        value: "",
        aiTool: "",
    })
    const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

    const valid = form.ideaName && form.pptFileName

    const handleSubmit = () => {
        if (!valid) return
        onSubmit({
            ideaName: form.ideaName,
            problemStatement: form.problemStatement,
            pptFileName: form.pptFileName,
            videoFileName: form.videoFileName,
            valueStatement: form.value,
            aiTool: form.aiTool,
        })
    }

    return (
        <ModalOverlay onClose={onClose}>
            <div className="w-full max-w-[520px] bg-[#0a0d08] border border-amber-500/40 rounded-2xl p-7 shadow-[0_0_80px_#e0a84218] animate-fade-up">
                <Tag color="gold">INNOVATION VAULT</Tag>
                <h2 className="font-display text-3xl font-bold uppercase text-amber-400 mt-3 mb-1">Vault Submission</h2>
                <p className="text-slate-400 text-sm mb-6">Your final deliverables. Ensure all files are uploaded before submitting.</p>

                <div className="space-y-4">
                    <Field label="Idea Name" placeholder="Give your solution a name" value={form.ideaName} onChange={(v) => set("ideaName", v)} accent="gold" />

                    <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-1.5">Problem Statement</label>
                        <textarea
                            className="w-full bg-[#05090d] border border-[#1c2e38] rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60 resize-none transition-colors"
                            rows={3}
                            placeholder="The problem your idea solves..."
                            value={form.problemStatement}
                            onChange={(e) => set("problemStatement", e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-1.5">
                            Presentation (PDF / PPTX)
                        </label>
                        <div className="border border-dashed border-amber-500/30 rounded-lg p-4 text-center bg-[#05090d] cursor-pointer hover:border-amber-500/60 transition-colors">
                            <p className="text-amber-400/60 text-sm">{form.pptFileName || "Drop file or click to upload"}</p>
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.pptx,.ppt"
                                onChange={(e) => set("pptFileName", e.target.files?.[0]?.name ?? "")}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-1.5">
                            Demo Video (MP4 / MOV)
                        </label>
                        <div className="border border-dashed border-amber-500/30 rounded-lg p-4 text-center bg-[#05090d] cursor-pointer hover:border-amber-500/60 transition-colors">
                            <p className="text-amber-400/60 text-sm">{form.videoFileName || "Drop file or click to upload"}</p>
                            <input
                                type="file"
                                className="hidden"
                                accept="video/*"
                                onChange={(e) => set("videoFileName", e.target.files?.[0]?.name ?? "")}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-1.5">Value Statement</label>
                        <textarea
                            className="w-full bg-[#05090d] border border-[#1c2e38] rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60 resize-none transition-colors"
                            rows={3}
                            placeholder="Describe the business value created by your solution..."
                            value={form.value}
                            onChange={(e) => set("value", e.target.value)}
                        />
                    </div>

                    <Field label="AI Tool Used" placeholder="e.g. Claude, Copilot, Azure OpenAI..." value={form.aiTool} onChange={(v) => set("aiTool", v)} accent="gold" />
                </div>

                <div className="flex gap-3 mt-7 justify-end">
                    <GlowBtn onClick={onClose} variant="ghost">Cancel</GlowBtn>
                    <GlowBtn onClick={handleSubmit} variant="gold" disabled={!valid}>
                        <span>🔐</span> Submit to vault
                    </GlowBtn>
                </div>
            </div>
        </ModalOverlay>
    )
}
