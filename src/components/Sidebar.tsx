import { FileText, Home, Search, Settings, Users } from "lucide-react"
import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import { SprintSelector } from "./SprintSelector"

interface SidebarProps {
  className?: string
}

const menuItems = [
  {
    title: "Главная",
    href: "/",
    icon: Home,
  },
  {
    title: "Настройки",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Отчёты",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Поиск разработчика",
    href: "/search",
    icon: Search,
  },
]

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation()

  return (
    <div className={cn("flex h-full w-64 flex-col bg-card/50 backdrop-blur-sm border-r border-border/50", className)}>
      {/* Header */}
      <div className="flex h-16 items-center border-b border-border/50 px-6 bg-gradient-to-r from-primary/10 to-transparent">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-foreground text-balance">Дашборд команд</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border/50 p-4 bg-gradient-to-r from-muted/20 to-transparent">
        <SprintSelector />
      </div>
    </div>
  )
}
