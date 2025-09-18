import Fuse from "fuse.js"
import { Keyboard, Search as SearchIcon, User, Users } from "lucide-react"
import type React from "react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DeveloperCard } from "../components/DeveloperCard"
import { LoadingWrapper } from "../components/LoadingWrapper"
import { PageHeader } from "../components/PageHeader"
import { TeamCard } from "../components/TeamCard"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { useBacklogData } from "../contexts/BacklogContext"
import type { DeveloperStats, TeamStats } from "../types"

export const Search: React.FC = () => {
  const { data, isLoading, error } = useBacklogData()
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  return (
    <LoadingWrapper isLoading={isLoading} error={error} data={data}>
      <SearchContent data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </LoadingWrapper>
  )
}

interface SearchContentProps {
  data: any
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const SearchContent: React.FC<SearchContentProps> = ({ data, searchTerm, setSearchTerm }) => {
  const [os, setOs] = useState<'mac' | 'windows' | 'other'>('other');

  useState(() => {
      const userAgent = navigator.userAgent;

      if (userAgent.includes('Mac')) {
        setOs('mac');
      } else if (userAgent.includes('Win')) {
        setOs('windows');
      } else {
        setOs('other');
      }
    });

    const getHintText = () => {
      switch (os) {
        case 'mac':
          return 'Нажмите Cmd+K для быстрого поиска';
        case 'windows':
          return 'Нажмите Ctrl+K для быстрого поиска';
        default:
          return 'Нажмите Ctrl/Cmd+K для быстрого поиска';
      }
    };
  // Настройка Fuse.js для мягкого поиска
  const developersFuse = useMemo(() => new Fuse(data.developerStats, {
    keys: ['name'],
    threshold: 0.4, // Мягкий поиск с учетом опечаток
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
    ? developersFuse.search(searchTerm).map(result => result.item)
    : []

  const filteredTeams = searchTerm
    ? teamsFuse.search(searchTerm).map(result => result.item)
    : []

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Поиск"
        subtitle="Поиск разработчиков и команд"
        icon={<SearchIcon className="h-8 w-8 text-primary" />}
        showBackButton={false}
        rightContent={
          <Badge variant="outline" className="gap-1">
            <Keyboard className="h-3 w-3" />
            Cmd+K
          </Badge>
        }
      />

      {/* Search Input */}
      <Card>
        <CardHeader>
          <CardTitle>Поиск по разработчикам и командам</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Введите имя разработчика или команды..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Results */}
      {searchTerm && (
        <div className="space-y-6">
          {/* Developers Results */}
          {filteredDevelopers.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Разработчики ({filteredDevelopers.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDevelopers.map((developer, index) => (
                  <DeveloperCard key={`dev-${index}`} developer={developer as DeveloperStats} />
                ))}
              </div>
            </div>
          )}

          {/* Teams Results */}
          {filteredTeams.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Команды ({filteredTeams.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeams.map((team, index) => (
                  <TeamCard key={`team-${index}`} team={team as TeamStats} />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredDevelopers.length === 0 && filteredTeams.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">
                  Попробуйте изменить поисковый запрос или используйте глобальный поиск (Cmd+K)
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Empty State */}
      {!searchTerm && (
        <Card>
          <CardContent className="p-8 text-center">
            <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Начните поиск</h3>
            <p className="text-muted-foreground mb-4">
              Введите имя разработчика или команды в поле выше, или используйте глобальный поиск
            </p>
            <Badge variant="outline" className="gap-1">
              <Keyboard className="h-3 w-3" />
              {getHintText()}
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
