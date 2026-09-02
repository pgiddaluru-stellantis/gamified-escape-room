import type { Chamber } from "@/types"

export interface ClueMaster {
    name: string
    role: string
    initials: string
    color: string
    description: string
}

export interface Clue {
    title: string
    hint: string
}

export interface ChamberData {
    useCase: string
    title: string
    tagline: string
    description: string
    problem: string
    clueMasters: ClueMaster[]
    clues: Clue[]
}

export const CHAMBERS: Record<Chamber, ChamberData> = {
    A: {
        useCase: "#1",
        title: "Mission Chamber A",
        tagline: "AI-Powered Document Intelligence",
        description: "Automating internal audit reports using AI document analysis and pattern recognition.",
        problem:
            "The Internal Audit department processes over 2,000 documents quarterly. Manual review introduces bottlenecks and inconsistencies across regions. Your mission: design an AI-assisted solution that reduces review time by 60% while maintaining full compliance accuracy and an auditable decision trail.",
        clueMasters: [
            {
                name: "Sarah Chen",
                role: "Senior Data Analyst",
                initials: "SC",
                color: "#00f5ff",
                description: "Expert in NLP pipelines and enterprise document workflows. Available Mon–Wed, 10:00–12:00.",
            },
        ],
        clues: [
            { title: "Clue 01", hint: "Consider transformer-based models fine-tuned on compliance corpora for section extraction." },
            { title: "Clue 02", hint: "A hybrid retrieval approach (BM25 + dense embeddings) outperforms pure vector search on structured docs." },
            { title: "Clue 03", hint: "Human-in-the-loop checkpoints at flagged anomalies can maintain >95% accuracy with 40% less reviewer time." },
        ],
    },
    B: {
        useCase: "#2",
        title: "Mission Chamber B",
        tagline: "Predictive Maintenance Intelligence",
        description: "Building a predictive system that anticipates equipment failures before they disrupt operations.",
        problem:
            "Field operations face unexpected equipment failures causing 340+ hours of unplanned downtime annually. Sensor telemetry exists across 1,200 assets but is underutilized. Your mission: create an AI model that predicts failures 48 hours in advance with over 85% precision, integrated into the existing operations dashboard.",
        clueMasters: [
            {
                name: "Marcus Webb",
                role: "ML Engineering Lead",
                initials: "MW",
                color: "#e0a842",
                description: "Specialises in time-series anomaly detection and IoT data architectures. Tue–Thu, 14:00–16:00.",
            },
        ],
        clues: [
            { title: "Clue 01", hint: "LSTM and Temporal Fusion Transformers both handle multivariate sensor sequences — compare their lag sensitivity." },
            { title: "Clue 02", hint: "Feature engineering: rolling mean, spectral entropy, and cross-sensor correlation deltas carry strong predictive signal." },
            { title: "Clue 03", hint: "Class imbalance is critical here — fewer than 2% of sensor windows precede failures. SMOTE-ENN or focal loss are worth exploring." },
        ],
    },
    C: {
        useCase: "#3",
        title: "Mission Chamber C",
        tagline: "Institutional Knowledge at Scale",
        description: "Designing an intelligent knowledge assistant that surfaces institutional knowledge on demand.",
        problem:
            "New employees take 6–9 months to reach full productivity due to knowledge scattered across 14 siloed systems. Support tickets for internal process questions exceed 8,000 per quarter. Your mission: prototype an AI knowledge assistant that reduces onboarding time by 40% using retrieval-augmented generation over internal documents.",
        clueMasters: [
            {
                name: "Priya Nair",
                role: "AI Product Strategist",
                initials: "PN",
                color: "#b95dff",
                description: "Expert in RAG architectures and conversational UX for enterprise platforms. Mon/Wed/Fri, 09:00–11:00.",
            },
        ],
        clues: [
            { title: "Clue 01", hint: "Chunking strategy matters as much as the model — overlapping chunks with metadata tagging improve retrieval precision by 30%." },
            { title: "Clue 02", hint: "Guard against hallucination with a confidence threshold + source citation UI that lets users verify every answer." },
            { title: "Clue 03", hint: "Reranking retrieved passages with a cross-encoder before generation significantly reduces irrelevant context injection." },
        ],
    },
}

// Centralised per-chamber colour tokens so screens never hardcode their own copies.
export const CHAMBER_COLORS: Record<Chamber, string> = { A: "#00f5ff", B: "#e0a842", C: "#b95dff" }

export const CHAMBER_TAG_COLORS: Record<Chamber, "cyan" | "gold" | "purple"> = { A: "cyan", B: "gold", C: "purple" }
