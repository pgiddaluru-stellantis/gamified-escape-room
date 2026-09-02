import { useState, useCallback, useRef } from "react"
import type { Screen, Modal, Chamber, UserData, Submission, RegisteredUser, Toast } from "@/types"
import { useEditMode } from "@/context/EditModeContext"
import { NavBar } from "@/components/layout/NavBar"
import { RegistrationModal } from "@/components/modals/RegistrationModal"
import { VaultModal } from "@/components/modals/VaultModal"
import { ToastStack } from "@/components/common/ToastStack"
import { EditBanner } from "@/components/common/EditBanner"
import { LandingScreen } from "@/screens/LandingScreen"
import { MissionControlScreen } from "@/screens/MissionControlScreen"
import { ChamberSelectScreen } from "@/screens/ChamberSelectScreen"
import { MissionChamberScreen } from "@/screens/MissionChamberScreen"
import { TimelineScreen } from "@/screens/TimelineScreen"
import { DashboardScreen } from "@/screens/DashboardScreen"
import { ManagerialDashboardScreen } from "@/screens/ManagerialDashboardScreen"
import { CHAMBERS } from "@/data/chambers"
import { MOCK_REGISTRATIONS } from "@/data/mockRegistrations"

const TOAST_DURATION_MS = 3200
// Dashboard + edit-mode access is restricted to these registered names (case-insensitive).
const ADMIN_NAMES = ["admin", "valerie"]

export default function App() {
  const [screen, setScreen] = useState<Screen>("home")
  const [modal, setModal] = useState<Modal>(null)
  const [xp, setXp] = useState(0)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [selectedChamber, setSelectedChamber] = useState<Chamber | null>(null)
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastId = useRef(0)
  const { editMode } = useEditMode()

  const showToast = useCallback((msg: string, badge?: string) => {
    const id = ++toastId.current
    setToasts((prev) => [...prev, { id, msg, badge }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), TOAST_DURATION_MS)
  }, [])

  const addXp = useCallback((n: number) => {
    setXp((prev) => prev + n)
  }, [])

  const openModal = (m: Modal) => setModal(m)
  const closeModal = () => setModal(null)

  const goTo = (s: Screen) => {
    setScreen(s)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRegister = (data: UserData) => {
    setUserData(data)
    closeModal()
    addXp(150)
    showToast("+150 XP — Case file opened!", "Case file opened")
    setScreen("dossier")
  }

  const handleChamberSelect = (c: Chamber) => {
    setSelectedChamber(c)
  }

  const handleEnterChamber = () => {
    if (!selectedChamber) return
    addXp(200)
    showToast(`+200 XP — Chamber ${selectedChamber} entered!`, "Chamber entered")
    setScreen("chamber-detail")
  }

  const handleVaultSubmit = (data: Submission) => {
    setSubmission(data)
    closeModal()
    addXp(500)
    showToast("+500 XP — Submission captured!", "Escape artist")
  }

  const dashboardRows: RegisteredUser[] = userData
    ? [
      {
        fullName: userData.name,
        department: userData.department,
        tid: userData.tid,
        contributionType: userData.contributionType,
        teamName: userData.teamName,
        chamber: selectedChamber,
        ideaName: submission?.ideaName ?? "",
        problemStatement: submission?.problemStatement ?? (selectedChamber ? CHAMBERS[selectedChamber].problem : ""),
        pptFileName: submission?.pptFileName ?? "",
        aiTool: submission?.aiTool ?? "",
        status: submission ? "Submitted" : "Registered",
      },
      ...MOCK_REGISTRATIONS,
    ]
    : MOCK_REGISTRATIONS

  const isAdmin = !!userData && ADMIN_NAMES.includes(userData.name.trim().toLowerCase())

  return (
    <div className="min-h-screen" style={{ background: "radial-gradient(circle at 75% 18%, #18313c 0, #071016 28%, #030608 65%)" }}>
      <NavBar
        registered={!!userData}
        isAdmin={isAdmin}
        onOpenDashboard={() => goTo("dashboard")}
        onNavigateHome={() => goTo("home")}
      />

      <main className="max-w-[1180px] mx-auto px-4 sm:px-6 py-8 pb-16 relative z-10">
        {screen === "home" && (
          <LandingScreen openModal={openModal} setScreen={goTo} registered={!!userData} />
        )}
        {screen === "dossier" && userData && (
          <MissionControlScreen
            userData={userData}
            onNext={handleEnterChamber}
            onBack={() => goTo("home")}
          />
        )}
        {screen === "chambers" && !userData && (
          <ChamberSelectScreen
            onSelect={handleChamberSelect}
            selected={selectedChamber}
            onBack={() => goTo("home")}
            onRegister={() => openModal("registration")}
          />
        )}
        {screen === "chamber-detail" && selectedChamber && (
          <MissionChamberScreen
            chamber={selectedChamber}
            addXp={addXp}
            onBack={() => goTo("dossier")}
            onNext={() => goTo("progress")}
            showToast={showToast}
          />
        )}
        {screen === "progress" && (
          <TimelineScreen openModal={openModal} onBack={() => goTo(selectedChamber ? "chamber-detail" : "home")} />
        )}
        {screen === "dashboard" && isAdmin && (
          <DashboardScreen
            rows={dashboardRows}
            onBack={() => goTo("dossier")}
            onOpenManagerialDashboard={() => goTo("managerial-dashboard")}
          />
        )}
        {screen === "managerial-dashboard" && isAdmin && (
          <ManagerialDashboardScreen rows={dashboardRows} onBack={() => goTo("dashboard")} />
        )}
      </main>

      <footer className="relative z-10 text-center text-slate-600 text-xs py-6 border-t border-[#1c2e38]">
        ICT Escape Room Hackathon · Interactive Portal · October 2025
      </footer>

      {/* Modals */}
      {modal === "registration" && (
        <RegistrationModal onClose={closeModal} onSubmit={handleRegister} />
      )}
      {modal === "vault" && (
        <VaultModal
          onClose={closeModal}
          onSubmit={handleVaultSubmit}
          defaultProblemStatement={selectedChamber ? CHAMBERS[selectedChamber].problem : ""}
        />
      )}

      {/* Edit mode banner */}
      {editMode && <EditBanner />}

      {/* Toasts */}
      <ToastStack toasts={toasts} />
    </div>
  )
}
