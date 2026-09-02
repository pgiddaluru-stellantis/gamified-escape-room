import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

interface EditModeContextValue {
    editMode: boolean
    beginEdit: () => void
    saveEdits: () => void
    cancelEdits: () => void
    getText: (id: string, fallback: string) => string
    setText: (id: string, value: string) => void
}

const EditModeContext = createContext<EditModeContextValue | null>(null)

const STORAGE_KEY = "escapeRoomEdits"

function loadSaved(): Record<string, string> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : {}
    } catch {
        return {}
    }
}

// Provides a lightweight global "edit mode" so admins can tweak on-screen copy without a backend.
// Saved edits persist to localStorage, so they survive refreshes in the same browser.
export function EditModeProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [editMode, setEditMode] = useState(false)
    const [saved, setSaved] = useState<Record<string, string>>(loadSaved)
    const [draft, setDraft] = useState<Record<string, string>>({})

    const beginEdit = useCallback(() => setEditMode(true), [])

    const saveEdits = useCallback(() => {
        setSaved((prev) => {
            const next = { ...prev, ...draft }
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
            } catch {
                // Ignore storage failures (e.g. private browsing quota) — edits stay applied in-session.
            }
            return next
        })
        setDraft({})
        setEditMode(false)
    }, [draft])

    const cancelEdits = useCallback(() => {
        setDraft({})
        setEditMode(false)
    }, [])

    const getText = useCallback((id: string, fallback: string) => draft[id] ?? saved[id] ?? fallback, [draft, saved])

    const setText = useCallback((id: string, value: string) => {
        setDraft((prev) => ({ ...prev, [id]: value }))
    }, [])

    const value = useMemo(
        () => ({ editMode, beginEdit, saveEdits, cancelEdits, getText, setText }),
        [editMode, beginEdit, saveEdits, cancelEdits, getText, setText],
    )

    return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>
}

export function useEditMode(): EditModeContextValue {
    const ctx = useContext(EditModeContext)
    if (!ctx) throw new Error("useEditMode must be used within an EditModeProvider")
    return ctx
}
