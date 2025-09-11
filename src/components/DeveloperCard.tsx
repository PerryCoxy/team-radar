"use client"

// Developer card component for team detail view
import type React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import type { DeveloperStats } from "../types"
import { User } from "lucide-react"

interface DeveloperCardProps {
  developer: DeveloperStats
}

export const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/developer/${encodeURIComponent(developer.name)}`)
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
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-lg font-semibold text-foreground text-balance">{developer.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{developer.team}</p>
            </div>
          </div>
          <Badge variant={getOverloadVariant(developer.overloadIndicator)} className="font-medium">
            {Math.round(developer.overloadIndicator)}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Задач</div>
            <div className="text-lg font-semibold text-foreground">{developer.taskCount}</div>
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground">Размер</div>
            <div className="text-lg font-semibold text-foreground">{developer.totalSize}</div>
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground">Время</div>
            <div className="text-lg font-semibold text-foreground">{developer.totalTimeTracking.toFixed(1)}ч</div>
          </div>
        </div>

        {/* Overload Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Перегруз</span>
            <span className="text-foreground font-medium">{Math.round(developer.overloadIndicator)}%</span>
          </div>
          <div className="relative">
            <Progress value={Math.min(developer.overloadIndicator, 100)} className="h-3 progress-enhanced" />
            <div
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getOverloadColor(developer.overloadIndicator)}`}
              style={{ width: `${Math.min(developer.overloadIndicator, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
