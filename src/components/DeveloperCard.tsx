
// Developer card component for team detail view
import { User } from "lucide-react"
import type React from "react"
import { useNavigate } from "react-router-dom"
import type { DeveloperStats } from "../types"
import { formatSize, formatTime } from "../utils/formatUtils"
import { getOverloadVariant } from "../utils/overloadUtils"
import { OverloadProgressBar } from "./OverloadProgressBar"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface DeveloperCardProps {
  developer: DeveloperStats
}

export const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/developer/${encodeURIComponent(developer.name)}`)
  }


  return (
    <Card
      className="cursor-pointer card-hover border-enhanced card-gradient card-gradient-hover"
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <div>
              <CardTitle className="text-base font-semibold text-foreground text-balance">{developer.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{developer.team}</p>
            </div>
          </div>
          <Badge variant={getOverloadVariant(developer.overloadIndicator)} className="font-medium badge-enhanced text-xs">
            {Math.round(developer.overloadIndicator)}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Задач</div>
            <div className="text-base font-semibold text-foreground">{developer.taskCount}</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-muted-foreground">Размер</div>
            <div className="text-base font-semibold text-foreground">{formatSize(developer.totalSize)}</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-muted-foreground">Время</div>
            <div className="text-base font-semibold text-foreground">{formatTime(developer.totalTimeTracking)}</div>
          </div>
        </div>

        {/* Overload Progress Bar */}
        <OverloadProgressBar 
          value={developer.overloadIndicator}
          label="Перегруз"
        />
      </CardContent>
    </Card>
  )
}
