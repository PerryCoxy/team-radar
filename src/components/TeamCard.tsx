
// Team card component displaying team statistics and workload
import { Clock, Target, TrendingUp } from "lucide-react"
import type React from "react"
import { useNavigate } from "react-router-dom"
import { TeamStats } from "../types"
import { formatSize, formatTime } from "../utils/formatUtils"
import { getOverloadVariant } from "../utils/overloadUtils"
import { OverloadProgressBar } from "./OverloadProgressBar"
import { StatsGrid } from "./StatsGrid"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface TeamCardProps {
  team: TeamStats
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/team/${encodeURIComponent(team.name)}`)
  }


  return (
    <Card
      className="cursor-pointer card-hover border-enhanced card-gradient card-gradient-hover"
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground text-balance">{team.name}</CardTitle>
          <Badge variant={getOverloadVariant(team.overloadIndicator)} className="font-medium badge-enhanced text-xs">
            {Math.round(team.overloadIndicator)}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Statistics Grid */}
        <StatsGrid 
          stats={[
            { label: "Задач", value: team.taskCount, icon: Target },
            { label: "Размер", value: formatSize(team.totalSize), icon: TrendingUp },
            { label: "Затрачено времени", value: formatTime(team.totalTimeTracking), icon: Clock }
          ]}
          columns={2}
        />

        {/* Overload Progress Bar */}
        <OverloadProgressBar 
          value={team.overloadIndicator}
          label="Индикатор перегруза"
        />
      </CardContent>
    </Card>
  )
}
