"use client"

// No team tasks detail page
import { AlertTriangle, ArrowLeft, FileX } from "lucide-react"
import type React from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { useBacklogData } from "../contexts/BacklogContext"
import { getNoTeamTasks } from "../utils/backlogUtils"

export const NoTeamDetail: React.FC = () => {
  const navigate = useNavigate()
  const { data, isLoading, error } = useBacklogData()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data available</div>
  
  const noTeamTasks = getNoTeamTasks(data)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            Задачи без команды
          </h1>
          <p className="text-muted-foreground">Задачи, не привязанные к конкретной команде</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Всего задач</CardTitle>
            <FileX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{noTeamTasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Статус</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <Badge variant="destructive">Требует назначения</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Список неназначенных задач ({noTeamTasks.length})
        </h2>
        <div className="space-y-3">
          {noTeamTasks.map((task) => (
            <Card key={task.id} className="border-enhanced card-gradient">
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-2">{task.title}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>ID: {task.id}</span>
                      <span>Команда: {task.team}</span>
                    </div>
                  </div>
                  <Badge variant="destructive" className="badge-enhanced">Без команды</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
