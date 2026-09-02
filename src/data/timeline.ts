export interface TimelineStep {
    date: string
    phase: string
    desc: string
    completed: boolean
    current?: boolean
}

export const TIMELINE_STEPS: TimelineStep[] = [
    { date: "Oct 5", phase: "Mission Briefing", desc: "Meet Clue Masters, review resources and enter your chamber.", completed: true },
    { date: "Oct 6", phase: "Discovery Day", desc: "Investigate AI-powered solutions and define your approach.", completed: true },
    { date: "Oct 7", phase: "Build Day", desc: "Experiment, collaborate, test and progress to prototype.", completed: false, current: true },
    { date: "Oct 8", phase: "Innovation Vault", desc: "Finalise the solution and upload your deliverables.", completed: false },
    { date: "Oct 9", phase: "Grand Escape", desc: "Present to judges and peers at the final showcase event.", completed: false },
]

// Innovation Vault opening — countdown target shown ahead of every Innovation Vault section.
export const VAULT_OPENS_AT = new Date("2026-10-08T09:00:00")

export interface ProgressPhase {
    label: string
    value: number
}

export const PROGRESS_PHASES: ProgressPhase[] = [
    { label: "Entered Mission", value: 20 },
    { label: "Investigation Phase", value: 40 },
    { label: "Build Phase", value: 60 },
    { label: "Reached Innovation Vault", value: 80 },
    { label: "Escape Completed", value: 100 },
]
