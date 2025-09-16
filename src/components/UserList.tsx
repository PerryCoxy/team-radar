"use client"

import { TestTube, User, Users } from "lucide-react"
import type React from "react"
import type { UserInfo } from "../types"
import { Badge } from "./ui/badge"

interface UserListProps {
  users: UserInfo[]
  type: 'expert' | 'tester' | 'external'
  className?: string
}

export const UserList: React.FC<UserListProps> = ({ users, type, className = "" }) => {
  if (!users || users.length === 0) return null

  const getIcon = () => {
    switch (type) {
      case 'expert':
        return <User className="h-3 w-3" />
      case 'tester':
        return <TestTube className="h-3 w-3" />
      case 'external':
        return <Users className="h-3 w-3" />
    }
  }

  const getLabel = () => {
    switch (type) {
      case 'expert':
        return 'Эксперт'
      case 'tester':
        return 'Тестировщик'
      case 'external':
        return 'Внешние исполнители'
    }
  }

  const getVariant = () => {
    switch (type) {
      case 'expert':
        return 'default' as const
      case 'tester':
        return 'secondary' as const
      case 'external':
        return 'outline' as const
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-1 ${className}`}>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {getIcon()}
        <span>{getLabel()}:</span>
      </div>
      {users.map((user) => (
        <Badge key={user.id} variant={getVariant()} className="text-xs px-1.5 py-0.5 h-auto">
          {user.full_name}
        </Badge>
      ))}
    </div>
  )
}
