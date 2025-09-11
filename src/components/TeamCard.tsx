"use client"

// Team card component displaying team statistics and workload
import type React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import type { TeamStats } from "../types"
import { Clock, Target, TrendingUp } from "lucide-react"

interface TeamCardProps {
  team: TeamStats
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/team/${encodeURIComponent(team.name)}`)
  }

  const getOverloadColor = (indicator: number) => {
    if (indicator <= 50) return "bg-emerald-500"
    if (indicator <= 80) return "bg-amber-500"
    return "bg-red-500"
  }

  const getOverloadVariant = (indicator: number) => {
    if (indicator <= 50) return "secondary"
    if (indicator <= 80) return "default"
    return "destructive"
  }

  return (
    <Card
      className="cursor-pointer card-hover border-border bg-gradient-to-br from-card to-card/50"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground text-balance">{team.name}</CardTitle>
          <Badge variant={getOverloadVariant(team.overloadIndicator)} className="font-medium">
            {Math.round(team.overloadIndicator)}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Задач</div>
              <div className="text-lg font-semibold text-foreground">{team.taskCount}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Размер</div>
              <div className="text-lg font-semibold text-foreground">{team.totalSize}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 col-span-2">
            <Clock className="h-4 w-4 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Затрачено времени</div>
              <div className="text-lg font-semibold text-foreground">{team.totalTimeTracking.toFixed(1)}ч</div>
            </div>
          </div>
        </div>

        {/* Overload Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Индикатор перегруза</span>
            <span className="text-foreground font-medium">{Math.round(team.overloadIndicator)}%</span>
          </div>
          <div className="relative">
            <Progress value={Math.min(team.overloadIndicator, 100)} className="h-3 progress-enhanced" />
            <div
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getOverloadColor(team.overloadIndicator)}`}
              style={{ width: `${Math.min(team.overloadIndicator, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
