import { BarChart3, Clock, Target, Users } from "lucide-react"
import type React from "react"
import { CrossTaskCard } from "../components/CrossTaskCard"
import { NoTeamCard } from "../components/NoTeamCard"
import { StatCard } from "../components/StatCard"
import { TeamCard } from "../components/TeamCard"
import { useBacklogData } from "../contexts/BacklogContext"
import { getCrossTeamTasks, getNoTeamTasks } from "../utils/backlogUtils"

export const Dashboard: React.FC = () => {
  const { data, isLoading, error, selectedSprint } = useBacklogData()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data available</div>

  // Используем готовые данные с бэка
  const { teamStats } = data
  const crossTeamTasks = getCrossTeamTasks(data)
  const noTeamTasks = getNoTeamTasks(data)

  // Общая статистика из готовых данных
  const totalTasks = teamStats.reduce((sum, team) => sum + team.taskCount, 0)
  const totalSize = teamStats.reduce((sum, team) => sum + team.totalSize, 0)
  const totalTimeTracking = teamStats.reduce((sum, team) => sum + team.totalTimeTracking, 0)
  const averageOverload = teamStats.length > 0 
    ? teamStats.reduce((sum, team) => sum + team.overloadIndicator, 0) / teamStats.length 
    : 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Дашборд загрузки команд</h1>
        <p className="text-muted-foreground">Обзор загрузки сотрудников по командам - Спринт #{selectedSprint}</p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Всего задач"
          value={totalTasks}
          icon={Target}
        />
        <StatCard
          title="Общий размер"
          value={totalSize}
          icon={BarChart3}
        />
        <StatCard
          title="Затрачено времени"
          value={`${totalTimeTracking.toFixed(1)}ч`}
          icon={Clock}
        />
        <StatCard
          title="Средняя перегрузка"
          value={`${Math.round(averageOverload)}%`}
          icon={Users}
        />
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
