import type { RegisteredUser } from "@/types"

export interface ChartDatum {
    label: string
    value: number
}

function countBy(rows: RegisteredUser[], getKey: (row: RegisteredUser) => string): ChartDatum[] {
    const counts = new Map<string, number>()
    for (const row of rows) {
        const key = getKey(row)
        counts.set(key, (counts.get(key) ?? 0) + 1)
    }
    return Array.from(counts.entries()).map(([label, value]) => ({ label, value }))
}

export function aggregateByDepartment(rows: RegisteredUser[]): ChartDatum[] {
    return countBy(rows, (r) => r.department || "Unspecified")
}

export function aggregateByChamber(rows: RegisteredUser[]): ChartDatum[] {
    return countBy(rows, (r) => (r.chamber ? `Chamber ${r.chamber}` : "Unassigned"))
}

export function aggregateByAiTool(rows: RegisteredUser[]): ChartDatum[] {
    return countBy(rows, (r) => (r.aiTool && r.aiTool !== "—" ? r.aiTool : "Not selected"))
}

export function aggregateByContributionType(rows: RegisteredUser[]): ChartDatum[] {
    return countBy(rows, (r) => (r.contributionType === "team" ? "Team" : "Individual"))
}
