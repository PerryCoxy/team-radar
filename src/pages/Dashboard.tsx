import type React from "react"
import { TeamCard } from "../components/TeamCard"
import { CrossTaskCard } from "../components/CrossTaskCard"
import { NoTeamCard } from "../components/NoTeamCard"
import { getProcessedData } from "../utils/dataProcessor"
import { BarChart3, Users, Clock, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export const Dashboard: React.FC = () => {
  const { teamStats, noTeamTasks, crossTeamTasks } = getProcessedData()

  // Calculate overall statistics
  const totalTasks = teamStats.reduce((sum, team) => sum + team.taskCount, 0)
  const totalSize = teamStats.reduce((sum, team) => sum + team.totalSize, 0)
  const totalTimeTracking = teamStats.reduce((sum, team) => sum + team.totalTimeTracking, 0)
  const averageOverload =
    teamStats.length > 0 ? teamStats.reduce((sum, team) => sum + team.overloadIndicator, 0) / teamStats.length : 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Дашборд загрузки команд</h1>
        <p className="text-muted-foreground">Обзор загрузки сотрудников по командам - Спринт #66</p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Всего задач</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalTasks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Общий размер</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalSize}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Затрачено времени</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalTimeTracking.toFixed(1)}ч</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Средняя перегрузка</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{Math.round(averageOverload)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Team Cards Grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Команды</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamStats.map((team) => (
            <TeamCard key={team.name} team={team} />
          ))}
        </div>
      </div>

      {/* Special Cards */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Специальные категории</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {crossTeamTasks.length > 0 && <CrossTaskCard tasks={crossTeamTasks} />}
          {noTeamTasks.length > 0 && <NoTeamCard tasks={noTeamTasks} />}
        </div>
      </div>
    </div>
  )
}
