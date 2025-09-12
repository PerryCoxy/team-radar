"use client"

// No team tasks card component
import { AlertTriangle, FileX } from "lucide-react"
import type React from "react"
import { useNavigate } from "react-router-dom"
import type { NoTeamTask } from "../types"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface NoTeamCardProps {
  tasks: NoTeamTask[]
}

export const NoTeamCard: React.FC<NoTeamCardProps> = ({ tasks }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/no-team")
  }

  return (
    <Card
      className="cursor-pointer card-hover border-enhanced card-gradient card-gradient-hover"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Без команды
          </CardTitle>
          <Badge variant="destructive">{tasks.length}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <FileX className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-sm text-muted-foreground">Неназначенных задач</div>
            <div className="text-lg font-semibold text-foreground">{tasks.length}</div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">Задачи, не привязанные к конкретной команде</div>
      </CardContent>
    </Card>
  )
}
