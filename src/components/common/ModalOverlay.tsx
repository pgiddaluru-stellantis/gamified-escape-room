import { useEffect, type ReactNode } from "react"

export function ModalOverlay({ children, onClose }: Readonly<{ children: ReactNode; onClose: () => void }>) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [onClose])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            {children}
        </div>
    )
}
