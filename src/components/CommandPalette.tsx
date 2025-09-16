import Fuse from "fuse.js"
import { ArrowRightLeft, User, Users } from "lucide-react"
import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useBacklogData } from "../contexts/BacklogContext"
import type { DeveloperStats, TeamStats } from "../types"
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate()
  const { data } = useBacklogData()
  const [searchTerm, setSearchTerm] = useState("")

  // Сброс поискового запроса при закрытии
  useEffect(() => {
    if (!open) {
      setSearchTerm("")
    }
  }, [open])

  // Закрытие по Escape
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onOpenChange])

  const handleSelect = (path: string) => {
    onOpenChange(false)
    navigate(path)
  }

  if (!data) return null

  // Настройка Fuse.js для мягкого поиска
  const developersFuse = useMemo(() => new Fuse(data.developerStats, {
    keys: ['name'],
    threshold: 0.4, // 0 = точное совпадение, 1 = любое совпадение
    distance: 100,
    includeScore: true
  }), [data.developerStats])

  const teamsFuse = useMemo(() => new Fuse(data.teamStats, {
    keys: ['name'],
    threshold: 0.4,
    distance: 100,
    includeScore: true
  }), [data.teamStats])

  // Фильтрация данных с помощью Fuse.js
  const filteredDevelopers = searchTerm 
    ? developersFuse.search(searchTerm).slice(0, 8).map(result => result.item)
    : data.developerStats.slice(0, 10)

  const filteredTeams = searchTerm
    ? teamsFuse.search(searchTerm).slice(0, 6).map(result => result.item)
    : data.teamStats.slice(0, 6)

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Поиск разработчиков, команд..." 
        onValueChange={setSearchTerm}
      />
      <CommandList>
        <CommandEmpty>Ничего не найдено.</CommandEmpty>
        
        {/* Разработчики */}
        {filteredDevelopers.length > 0 && (
          <CommandGroup heading="Разработчики">
            {filteredDevelopers.slice(0, 8).map((developer: DeveloperStats) => (
                <CommandItem
                  key={developer.name}
                  value={developer.name} // Важно для работы поиска Command
                  onSelect={() => handleSelect(`/developer/${encodeURIComponent(developer.name)}`)}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span>{developer.name}</span>
                  <span className="text-muted-foreground text-sm ml-auto">
                    {developer.team} • {developer.taskCount} задач
                  </span>
                </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Команды */}
        {filteredTeams.length > 0 && (
          <CommandGroup heading="Команды">
            {filteredTeams.slice(0, 6).map((team: TeamStats) => (
              <CommandItem
                key={team.name}
                value={team.name} // Важно для работы поиска Command
                onSelect={() => handleSelect(`/team/${encodeURIComponent(team.name)}`)}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span>{team.name}</span>
                <span className="text-muted-foreground text-sm ml-auto">
                  {team.taskCount} задач
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Быстрые действия */}
        <CommandGroup heading="Навигация">
          <CommandItem onSelect={() => handleSelect("/cross-team")} className="flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4" />
            <span>Кросс-командные задачи</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/no-team")} className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Задачи без команды</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
