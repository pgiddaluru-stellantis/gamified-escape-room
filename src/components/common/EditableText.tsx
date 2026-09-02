import type { ElementType, FocusEvent } from "react"
import { useEditMode } from "@/context/EditModeContext"

// Renders plain text normally; becomes an inline-editable field while global edit mode is on.
export function EditableText({
    id,
    fallback,
    as = "span",
    className = "",
}: Readonly<{
    id: string
    fallback: string
    as?: ElementType
    className?: string
}>) {
    const { editMode, getText, setText } = useEditMode()
    const value = getText(id, fallback)
    const Tag = as

    if (!editMode) {
        return <Tag className={className}>{value}</Tag>
    }

    return (
        <Tag
            className={`${className} outline-dashed outline-1 outline-amber-400/70 rounded px-1 cursor-text`}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e: FocusEvent<HTMLElement>) => setText(id, e.currentTarget.textContent ?? "")}
        >
            {value}
        </Tag>
    )
}
