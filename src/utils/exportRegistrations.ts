import type { RegisteredUser } from "@/types"

export const DASHBOARD_COLUMNS: { key: keyof RegisteredUser; label: string }[] = [
    { key: "fullName", label: "Full Name" },
    { key: "department", label: "Department" },
    { key: "tid", label: "TID" },
    { key: "contributionType", label: "Type" },
    { key: "teamName", label: "Team Name" },
    { key: "chamber", label: "Chamber" },
    { key: "ideaName", label: "Idea Name" },
    { key: "problemStatement", label: "Problem Statement" },
    { key: "pptFileName", label: "PPT Uploaded" },
    { key: "aiTool", label: "AI Tool" },
    { key: "status", label: "Status" },
]

function formatCell(row: RegisteredUser, key: keyof RegisteredUser): string {
    if (key === "contributionType") {
        return row.contributionType === "team" ? "Team" : "Individual"
    }
    return String(row[key] ?? "")
}

export function exportRegistrationsToExcel(rows: RegisteredUser[]) {
    const escapeCell = (value: string) => `"${value.replace(/"/g, '""')}"`
    const header = DASHBOARD_COLUMNS.map((c) => escapeCell(c.label)).join(",")
    const body = rows
        .map((row) => DASHBOARD_COLUMNS.map((c) => escapeCell(formatCell(row, c.key))).join(","))
        .join("\n")
    // BOM ensures Excel opens the CSV with correct character encoding.
    const csv = `\uFEFF${header}\n${body}`
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `ict-escape-room-registrations-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
}

// No real file storage backs this mockup, so downloads simulate the submitted PPT as a text stand-in.
export function downloadSubmissionPpt(row: RegisteredUser) {
    if (!row.pptFileName || row.pptFileName === "—") return
    const content = `Mock placeholder for submitted file: ${row.pptFileName}\nAgent: ${row.fullName}\nIdea: ${row.ideaName || "—"}`
    const blob = new Blob([content], { type: "application/octet-stream" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = row.pptFileName
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
}
