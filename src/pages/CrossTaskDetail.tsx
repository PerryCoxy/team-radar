
// Cross-team tasks detail page
import { ArrowLeft, ArrowRightLeft, Building, User } from "lucide-react"
import type React from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { useBacklogData } from "../contexts/BacklogContext"
import { getCrossTeamTasks } from "../utils/backlogUtils"

export const CrossTaskDetail: React.FC = () => {
  const navigate = useNavigate()
  const { data, isLoading, error } = useBacklogData()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data available</div>
  
  const crossTeamTasks = getCrossTeamTasks(data)

  const uniqueDevelopers = new Set(crossTeamTasks.map((task) => task.developer)).size
  const uniqueTeams = new Set(crossTeamTasks.map((task) => task.parentTeam)).size

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <ArrowRightLeft className="h-8 w-8 text-primary" />
            Кросс-командные задачи
          </h1>
          <p className="text-muted-foreground">Задачи, выполняемые разработчиками из разных команд</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Всего задач</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{crossTeamTasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Разработчиков</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{uniqueDevelopers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Команд</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{uniqueTeams}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Список кросс-командных задач ({crossTeamTasks.length})
        </h2>
        <div className="space-y-3">
          {crossTeamTasks.map((task) => (
            <Card key={task.taskId} className="border-enhanced card-gradient">
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-2">{task.taskTitle}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Родительская задача: {task.parentTitle}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Разработчик: {task.developer}</span>
                      <span>Команда разработчика: {task.developerTeam}</span>
                      <span>Команда проекта: {task.parentTeam}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge
                      variant="outline"
                      className="cursor-pointer badge-enhanced"
                      onClick={() => navigate(`/developer/${encodeURIComponent(task.developer)}`)}
                    >
                      {task.developer}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer badge-enhanced"
                      onClick={() => navigate(`/team/${encodeURIComponent(task.parentTeam)}`)}
                    >
                      {task.parentTeam}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
