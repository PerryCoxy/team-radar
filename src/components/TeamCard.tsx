"use client"

// Team card component displaying team statistics and workload
import { Clock, Target, TrendingUp } from "lucide-react"
import type React from "react"
import { useNavigate } from "react-router-dom"
import { TeamStats } from "../types"
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
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground text-balance">{team.name}</CardTitle>
          <Badge variant={getOverloadVariant(team.overloadIndicator)} className="font-medium badge-enhanced">
            {Math.round(team.overloadIndicator)}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Statistics Grid */}
        <StatsGrid 
          stats={[
            { label: "Задач", value: team.taskCount, icon: Target },
            { label: "Размер", value: team.totalSize, icon: TrendingUp },
            { label: "Затрачено времени", value: `${team.totalTimeTracking.toFixed(1)}ч`, icon: Clock }
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
