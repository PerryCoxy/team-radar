// Team detail page showing developers and their workload
import { Clock, Target, TrendingUp, Users } from "lucide-react"
import type React from "react"
import { useParams } from "react-router-dom"
import { DeveloperCard } from "../components/DeveloperCard"
import { LoadingWrapper } from "../components/LoadingWrapper"
import { PageHeader } from "../components/PageHeader"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { useBacklogData } from "../contexts/BacklogContext"
import { getOverloadVariant } from "../utils/overloadUtils"

export const TeamDetail: React.FC = () => {
  const { teamName } = useParams<{ teamName: string }>()
  const { data, isLoading, error } = useBacklogData()

  return (
    <LoadingWrapper isLoading={isLoading} error={error} data={data}>
      <TeamDetailContent teamName={teamName} data={data} />
    </LoadingWrapper>
  )
}

interface TeamDetailContentProps {
  teamName: string | undefined
  data: any
}

const TeamDetailContent: React.FC<TeamDetailContentProps> = ({ teamName, data }) => {
  if (!teamName) {
    return <div>Команда не найдена</div>
  }

  const decodedTeamName = decodeURIComponent(teamName)
  
  // Найти команду в готовых данных
  const team = data.teamStats.find((t: any) => t.name === decodedTeamName)
  if (!team) {
    return <div>Команда не найдена</div>
  }

  // Найти разработчиков команды в готовых данных
  const teamDevelopers = data.developerStats.filter((dev: any) => dev.team === decodedTeamName)

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={team.name}
        subtitle={`Команда • ${teamDevelopers.length} разработчиков`}
        icon={<Users className="h-8 w-8 text-primary" />}
        backTo="/"
      />

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
            {teamDevelopers.map((developer: any) => (
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
