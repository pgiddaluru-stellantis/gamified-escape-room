import type { RegisteredUser } from "@/types"
import { Tag } from "@/components/common/Tag"
import { GlowBtn } from "@/components/common/GlowBtn"
import { EditableText } from "@/components/common/EditableText"
import { BarChart } from "@/components/common/BarChart"
import {
    aggregateByAiTool,
    aggregateByChamber,
    aggregateByContributionType,
    aggregateByDepartment,
} from "@/utils/aggregateRegistrations"

// Aggregate insights view for organisers: department, chamber, AI tool and contribution splits.
export function ManagerialDashboardScreen({
    rows,
    onBack,
}: Readonly<{
    rows: RegisteredUser[]
    onBack: () => void
}>) {
    return (
        <div className="space-y-5 animate-fade-up">
            <div className="rounded-2xl border border-[#1c2e38] bg-[#0b1218] p-6">
                <Tag color="gold">INSIGHTS</Tag>
                <h2 className="font-display text-3xl font-bold uppercase text-slate-100 mt-2 mb-1">Managerial Dashboard</h2>
                <EditableText
                    id="managerial-dashboard-subtitle"
                    fallback="Aggregate view of registrations across departments, chambers, AI tools and contribution types."
                    as="p"
                    className="text-slate-400 text-sm leading-relaxed"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <BarChart title="Registrations by Department" data={aggregateByDepartment(rows)} color="#00f5ff" />
                <BarChart title="Registrations by Chamber" data={aggregateByChamber(rows)} color="#e0a842" />
                <BarChart title="Preferred AI Tool" data={aggregateByAiTool(rows)} color="#b95dff" />
                <BarChart title="Individual vs Team" data={aggregateByContributionType(rows)} color="#5cf2a5" />
            </div>

            <div>
                <GlowBtn onClick={onBack} variant="secondary">← Back to Dashboard</GlowBtn>
            </div>
        </div>
    )
}
