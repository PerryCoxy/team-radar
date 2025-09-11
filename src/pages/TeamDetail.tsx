"use client"

// Team detail page showing developers and their workload
import type React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Users, Target, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { DeveloperCard } from "../components/DeveloperCard"
import { getTeamByName, getProcessedData } from "../utils/dataProcessor"

export const TeamDetail: React.FC = () => {
  const { teamName } = useParams<{ teamName: string }>()
  const navigate = useNavigate()
  const { developerStats } = getProcessedData()

  if (!teamName) {
    return <div>Команда не найдена</div>
  }

  const decodedTeamName = decodeURIComponent(teamName)
  const team = getTeamByName(decodedTeamName)

  if (!team) {
    return <div>Команда не найдена</div>
  }

  // Get developers for this team
  const teamDevelopers = developerStats.filter((dev) => dev.team === decodedTeamName)

  const getOverloadVariant = (indicator: number) => {
    if (indicator <= 50) return "secondary"
    if (indicator <= 80) return "default"
    return "destructive"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            {team.name}
          </h1>
          <p className="text-muted-foreground">Детальная информация по команде и разработчикам</p>
        </div>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Всего задач</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{team.taskCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Общий размер</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{team.totalSize}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Затрачено времени</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{team.totalTimeTracking.toFixed(1)}ч</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Перегруз команды</CardTitle>
            <Badge variant={getOverloadVariant(team.overloadIndicator)}>{Math.round(team.overloadIndicator)}%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{teamDevelopers.length} разраб.</div>
          </CardContent>
        </Card>
      </div>

      {/* Developers List */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Разработчики команды ({teamDevelopers.length})</h2>
        {teamDevelopers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamDevelopers.map((developer) => (
              <DeveloperCard key={developer.name} developer={developer} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">
                В этой команде нет разработчиков с назначенными задачами
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
