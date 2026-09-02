// ─── Shared domain types ────────────────────────────────────────────────────

export type Screen = "home" | "dossier" | "chambers" | "chamber-detail" | "progress" | "dashboard" | "managerial-dashboard"
export type Modal = "registration" | "vault" | null
export type Chamber = "A" | "B" | "C"

export interface UserData {
    name: string
    email: string
    department: string
    tid: string
    contributionType: "individual" | "team"
    teamName: string
}

export interface Submission {
    ideaName: string
    problemStatement: string
    pptFileName: string
    videoFileName: string
    valueStatement: string
    aiTool: string
}

export interface RegisteredUser {
    fullName: string
    department: string
    tid: string
    contributionType: "individual" | "team"
    teamName: string
    chamber: Chamber | null
    ideaName: string
    problemStatement: string
    pptFileName: string
    aiTool: string
    status: "Registered" | "Submitted"
}

export interface Toast {
    id: number
    msg: string
    badge?: string
}
