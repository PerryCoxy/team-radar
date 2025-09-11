import { Routes, Route } from "react-router-dom"
import { Sidebar } from "./components/Sidebar"
import { Dashboard } from "./pages/Dashboard"
import { TeamDetail } from "./pages/TeamDetail"
import { DeveloperDetail } from "./pages/DeveloperDetail"
import { CrossTaskDetail } from "./pages/CrossTaskDetail"
import { NoTeamDetail } from "./pages/NoTeamDetail"
import { Settings } from "./pages/Settings"
import { Reports } from "./pages/Reports"
import { Search } from "./pages/Search"

function App() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/team/:teamName" element={<TeamDetail />} />
          <Route path="/developer/:developerName" element={<DeveloperDetail />} />
          <Route path="/cross-team" element={<CrossTaskDetail />} />
          <Route path="/no-team" element={<NoTeamDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
