import type { RegisteredUser } from "@/types"
import { Tag } from "@/components/common/Tag"
import { GlowBtn } from "@/components/common/GlowBtn"
import { EditableText } from "@/components/common/EditableText"
import { DASHBOARD_COLUMNS, downloadSubmissionPpt, exportRegistrationsToExcel } from "@/utils/exportRegistrations"

// Registrations dashboard: table of every agent plus their Innovation Vault submission status.
export function DashboardScreen({
    rows,
    onBack,
    onOpenManagerialDashboard,
}: Readonly<{
    rows: RegisteredUser[]
    onBack: () => void
    onOpenManagerialDashboard: () => void
}>) {
    return (
        <div className="space-y-5 animate-fade-up">
            <div className="rounded-2xl border border-[#1c2e38] bg-[#0b1218] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Tag>MISSION CONTROL</Tag>
                        <h2 className="font-display text-3xl font-bold uppercase text-slate-100 mt-2 mb-1">Registrations Dashboard</h2>
                        <EditableText
                            id="dashboard-subtitle"
                            fallback="All agents registered for the hackathon and the deliverables submitted to the Innovation Vault."
                            as="p"
                            className="text-slate-400 text-sm leading-relaxed"
                        />
                    </div>
                    <div className="flex gap-3 shrink-0 flex-wrap">
                        <GlowBtn onClick={onOpenManagerialDashboard} variant="secondary">
                            <span aria-hidden="true">📊</span> Managerial Dashboard
                        </GlowBtn>
                        <GlowBtn onClick={() => exportRegistrationsToExcel(rows)} variant="gold">
                            <span aria-hidden="true">⭳</span> Export to Excel
                        </GlowBtn>
                    </div>
                </div>

                <div className="mt-6 overflow-x-auto rounded-xl border border-[#1c2e38]">
                    <table className="w-full text-left border-collapse min-w-[1180px]">
                        <thead>
                            <tr className="bg-[#081117]">
                                {DASHBOARD_COLUMNS.map((col) => (
                                    <th
                                        key={col.key}
                                        className="text-xs font-bold tracking-widest uppercase text-cyan-400 px-4 py-3 border-b border-[#1c2e38] whitespace-nowrap"
                                    >
                                        {col.label}
                                    </th>
                                ))}
                                <th className="text-xs font-bold tracking-widest uppercase text-cyan-400 px-4 py-3 border-b border-[#1c2e38] whitespace-nowrap">
                                    Download
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={`${row.tid}-${i}`} className="hover:bg-[#0e1922] transition-colors">
                                    <td className="px-4 py-3 text-sm text-slate-200 border-b border-[#1c2e38] whitespace-nowrap">{row.fullName}</td>
                                    <td className="px-4 py-3 text-sm text-slate-400 border-b border-[#1c2e38] whitespace-nowrap">{row.department}</td>
                                    <td className="px-4 py-3 text-sm text-slate-400 border-b border-[#1c2e38] whitespace-nowrap">{row.tid}</td>
                                    <td className="px-4 py-3 text-sm border-b border-[#1c2e38] whitespace-nowrap">
                                        <Tag color={row.contributionType === "team" ? "purple" : "cyan"}>
                                            {row.contributionType === "team" ? "Team" : "Individual"}
                                        </Tag>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-400 border-b border-[#1c2e38] whitespace-nowrap">{row.teamName || "—"}</td>
                                    <td className="px-4 py-3 text-sm text-slate-400 border-b border-[#1c2e38] whitespace-nowrap">{row.chamber ? `Chamber ${row.chamber}` : "—"}</td>
                                    <td className="px-4 py-3 text-sm text-slate-200 font-semibold border-b border-[#1c2e38] whitespace-nowrap">{row.ideaName || "—"}</td>
                                    <td className="px-4 py-3 text-sm text-slate-400 border-b border-[#1c2e38] max-w-[320px]">
                                        <span className="line-clamp-2">{row.problemStatement || "—"}</span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-400 border-b border-[#1c2e38] whitespace-nowrap">{row.pptFileName || "—"}</td>
                                    <td className="px-4 py-3 text-sm text-slate-400 border-b border-[#1c2e38] whitespace-nowrap">{row.aiTool || "—"}</td>
                                    <td className="px-4 py-3 text-sm border-b border-[#1c2e38] whitespace-nowrap">
                                        <Tag color={row.status === "Submitted" ? "gold" : "cyan"}>{row.status}</Tag>
                                    </td>
                                    <td className="px-4 py-3 text-sm border-b border-[#1c2e38] whitespace-nowrap">
                                        <GlowBtn
                                            variant="ghost"
                                            className="text-xs"
                                            disabled={!row.pptFileName || row.pptFileName === "—"}
                                            onClick={() => downloadSubmissionPpt(row)}
                                        >
                                            <span aria-hidden="true">⭳</span> Download
                                        </GlowBtn>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <GlowBtn onClick={onBack} variant="secondary">← Back</GlowBtn>
            </div>
        </div>
    )
}
