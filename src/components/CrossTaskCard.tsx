"use client"

// Cross-team task card component
import { ArrowRightLeft, Building, User } from "lucide-react"
import type React from "react"
import { useNavigate } from "react-router-dom"
import type { CrossTeamTaskDto } from "../types"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface CrossTaskCardProps {
  tasks: CrossTeamTaskDto[]
}

export const CrossTaskCard: React.FC<CrossTaskCardProps> = ({ tasks }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/cross-team")
  }

  const uniqueDevelopers = new Set(tasks.map((task) => task.developer)).size
  const uniqueTeams = new Set(tasks.map((task) => task.parentTeam)).size

  return (
    <Card
      className="cursor-pointer card-hover border-enhanced card-gradient card-gradient-hover"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-primary" />
            Кросс-командные задачи
          </CardTitle>
          <Badge variant="outline">{tasks.length}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Разработчиков</div>
              <div className="text-lg font-semibold text-foreground">{uniqueDevelopers}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Команд</div>
              <div className="text-lg font-semibold text-foreground">{uniqueTeams}</div>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">Задачи, выполняемые разработчиками из разных команд</div>
      </CardContent>
    </Card>
  )
}
