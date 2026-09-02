import { GlowBtn } from "@/components/common/GlowBtn"
import { ModalOverlay } from "@/components/common/ModalOverlay"

// Generic Yes/No confirmation dialog, used before point-costing actions like investigating a clue.
export function ConfirmModal({
    title,
    message,
    confirmLabel = "Yes",
    cancelLabel = "No",
    onConfirm,
    onCancel,
}: Readonly<{
    title: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    onConfirm: () => void
    onCancel: () => void
}>) {
    return (
        <ModalOverlay onClose={onCancel}>
            <div className="w-full max-w-[420px] bg-[#0a1319] border border-amber-500/40 rounded-2xl p-6 shadow-[0_0_60px_#e0a84218] animate-fade-up text-center">
                <h3 className="font-display text-xl font-bold text-slate-100 mb-2">{title}</h3>
                <p className="text-slate-400 text-sm mb-6">{message}</p>
                <div className="flex gap-3 justify-center">
                    <GlowBtn variant="secondary" onClick={onCancel}>{cancelLabel}</GlowBtn>
                    <GlowBtn variant="gold" onClick={onConfirm}>{confirmLabel}</GlowBtn>
                </div>
            </div>
        </ModalOverlay>
    )
}
