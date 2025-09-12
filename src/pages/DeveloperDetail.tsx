"use client"

// Developer detail page showing individual tasks and workload
import { ArrowLeft, Clock, Target, TrendingUp, User } from "lucide-react"
import type React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { useBacklogData } from "../contexts/BacklogContext"
import { getCrossTeamTasksByDeveloper } from "../utils/backlogUtils"

export const DeveloperDetail: React.FC = () => {
  const { developerName } = useParams<{ developerName: string }>()
  const navigate = useNavigate()
  const { data, isLoading, error } = useBacklogData()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data available</div>

  if (!developerName) {
    return <div>Разработчик не найден</div>
  }

  const decodedDeveloperName = decodeURIComponent(developerName)
  
  // Найти разработчика в готовых данных
  const developer = data.developerStats.find(d => d.name === decodedDeveloperName)
  if (!developer) {
    return <div>Разработчик не найден</div>
  }
  
  const crossTeamTasks = getCrossTeamTasksByDeveloper(data, decodedDeveloperName)

  const getOverloadVariant = (indicator: number) => {
    if (indicator <= 50) return "secondary"
    if (indicator <= 80) return "default"
    return "destructive"
  }

  const getOverloadColor = (indicator: number) => {
    if (indicator <= 50) return "bg-green-500"
    if (indicator <= 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <User className="h-8 w-8 text-primary" />
            {developer.name}
          </h1>
          <p className="text-muted-foreground">Команда: {developer.team} • Детальная информация по задачам</p>
        </div>
      </div>

      {/* Developer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Всего задач</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{developer.taskCount + crossTeamTasks.length}</div>
            <p className="text-xs text-muted-foreground">+{crossTeamTasks.length} кросс-командных</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Общий размер</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{developer.totalSize}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Затрачено времени</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{developer.totalTimeTracking.toFixed(1)}ч</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Перегруз</CardTitle>
            <Badge variant={getOverloadVariant(developer.overloadIndicator)}>
              {Math.round(developer.overloadIndicator)}%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Progress value={Math.min(developer.overloadIndicator, 100)} className="h-2" />
              <div
                className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getOverloadColor(developer.overloadIndicator)}`}
                style={{ width: `${Math.min(developer.overloadIndicator, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="space-y-6">
        {/* Regular Tasks */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Задачи команды ({developer.tasks.length})</h2>
          <div className="space-y-3">
            {developer.tasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-2">{task.title}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>Размер: {task.size}</span>
                        <span>Затрачено: {task.time_tracking}ч</span>
                        <span>ID: {task.id}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Прогресс</div>
                      <div className="text-lg font-semibold text-foreground">
                        {task.size > 0 ? Math.round((task.time_tracking / task.size) * 100) : 0}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cross-Team Tasks */}
        {crossTeamTasks.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Кросс-командные задачи ({crossTeamTasks.length})
            </h2>
            <div className="space-y-3">
              {crossTeamTasks.map((task) => (
                <Card key={task.taskId} className="border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-2">{task.taskTitle}</h3>
                        <p className="text-sm text-muted-foreground mb-2">Родительская задача: {task.parentTitle}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Команда проекта: {task.parentTeam}</span>
                          <span>ID: {task.taskId}</span>
                        </div>
                      </div>
                      <Badge variant="outline">Кросс-командная</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
