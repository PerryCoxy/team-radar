import { ArrowRightLeft, Calendar, User } from "lucide-react"
import React from "react"
import { Badge } from "./badge"
import { Button } from "./button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog"

interface TransferHistoryItem {
  date: string
  fromSprint: number
  toSprint: number
  author: string
}

interface SprintTransferBadgeProps {
  transferCount: number
  transferHistory?: TransferHistoryItem[]
  cardTitle?: string
}

export const SprintTransferBadge: React.FC<SprintTransferBadgeProps> = ({
  transferCount,
  transferHistory = [],
  cardTitle = "Карточка"
}) => {
  if (transferCount === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-6 px-2 text-xs gap-1 hover:bg-accent"
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowRightLeft className="h-3 w-3" />
          {transferCount}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-primary" />
            История переносов спринтов
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {cardTitle}
          </p>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="secondary">
              Всего переносов: {transferCount}
            </Badge>
          </div>
          
          {transferHistory.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">История переносов:</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {transferHistory.map((transfer, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="font-mono">
                          {transfer.fromSprint}
                        </Badge>
                        <ArrowRightLeft className="h-3 w-3 text-muted-foreground" />
                        <Badge variant="outline" className="font-mono">
                          {transfer.toSprint}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {transfer.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(transfer.date)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
