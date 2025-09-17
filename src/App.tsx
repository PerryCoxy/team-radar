import { Route, Routes } from "react-router-dom"
import { CommandPalette } from "./components/CommandPalette"
import { Sidebar } from "./components/Sidebar"
import { Loader } from './components/ui/Loader'
import { BacklogProvider, useBacklogData } from './contexts/BacklogContext'
import { SprintProvider } from './contexts/SprintContext'
import { useCommandPalette } from './hooks/useCommandPalette'
import { useTheme } from './hooks/useTheme'
import { CrossTaskDetail } from "./pages/CrossTaskDetail"
import { Dashboard } from "./pages/Dashboard"
import { DeveloperDetail } from "./pages/DeveloperDetail"
import { NoTeamDetail } from "./pages/NoTeamDetail"
import { Reports } from "./pages/Reports"
import { Search } from "./pages/Search"
import { Settings } from "./pages/Settings"
import { TeamDetail } from "./pages/TeamDetail"

function AppContent() {
  const { isLoading, error } = useBacklogData();
  const { open, setOpen } = useCommandPalette();
  
  // Инициализируем систему тем
  useTheme();

  if (isLoading) return <Loader text="Инициализация приложения..." size="lg" fullScreen />;
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-destructive mb-2">Ошибка загрузки</h2>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    </div>
  );
  
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

      {/* Global Command Palette */}
      <CommandPalette open={open} onOpenChange={setOpen} />
    </div>
  )
}

function App() {
  return (
    <SprintProvider>
      <BacklogProvider>
        <AppContent />
      </BacklogProvider>
    </SprintProvider>
  )
}

export default App
