// Базовые типы для участников команды
export interface Member {
  id: number
  uid: string
  full_name: string
}

// Тип для задач (подзадач)
export interface TaskDto {
  id: number
  title: string
  size: number
  time_tracking: number
  members: Member[]
}

// Тип для родительских задач (Epic/Story)
export interface ParentDto {
  id: number
  title: string
  team: string
  tasks?: TaskDto[]
}

// Тип для задач без команды
export interface NoTeamTask {
  id: number
  title: string
  team: string
}

// Тип для кросс-командных задач
export interface CrossTeamTaskDto {
  developer: string
  developerTeam: string
  taskId: number
  taskTitle: string
  parentId: number
  parentTitle: string
  parentTeam: string
}

// Группировка кросс-командных задач по родительской задаче
export interface CrossTeamParentGroup {
  parentId: number
  parentTitle: string
  parentType: 'EN' | 'US' | 'BUG'
  parentTeam: string
  tasks: CrossTeamTaskDto[]
  // Дополнительная информация о родительской задаче
  expert?: UserInfo[]
  tester?: UserInfo[]
  externalExecutors?: UserInfo[]
}

// Типы для категорий задач в команде
export interface TeamTasks {
  EN: ParentDto[]
  US: ParentDto[]
  BUG: ParentDto[]
}

// Основной ответ от API бэклога
export interface BacklogResponse {
  sprint_id: number
  groups: {
    teams: Record<string, TeamTasks>
    NO_TEAM: NoTeamTask[]
    CROSS_TEAM: CrossTeamTaskDto[] // оставляем для совместимости
    CROSS_TEAM_GROUPED: CrossTeamParentGroup[] // новая группированная структура
  }
  // Готовая статистика команд
  teamStats: TeamStats[]
  // Готовая статистика разработчиков
  developerStats: DeveloperStats[]
}

// Обработанные данные для UI - статистика команды
export interface TeamStats {
  name: string
  taskCount: number
  totalSize: number
  totalTimeTracking: number
  overloadIndicator: number // percentage
  tasks: ParentDto[]
  // Разбивка по категориям
  enTasks: ParentDto[]
  usTasks: ParentDto[]
  bugTasks: ParentDto[]
}

// Дополнительная информация о пользователе
export interface UserInfo {
  id: number
  uid: string
  full_name: string
  email: string
  username: string
}

// Группировка задач по родительской задаче
export interface ParentTaskGroup {
  parentId: number
  parentTitle: string
  parentType: 'EN' | 'US' | 'BUG'
  tasks: TaskDto[]
  // Дополнительная информация в зависимости от типа
  expert?: UserInfo[] // для EN/US - эксперт
  tester?: UserInfo[] // для BUG - тестировщик
  externalExecutors?: UserInfo[] // исполнители из других команд (без текущего разработчика)
}

// Обработанные данные для UI - статистика разработчика
export interface DeveloperStats {
  name: string
  team: string
  taskCount: number
  totalSize: number
  totalTimeTracking: number
  overloadIndicator: number
  tasks: TaskDto[] // оставляем для обратной совместимости
  // Новая группировка задач по родительским задачам с типами
  tasksByParent: ParentTaskGroup[]
  // Группированные кросс-командные задачи разработчика
  crossTeamTasksByParent: CrossTeamParentGroup[]
}

// Типы для фильтрации и поиска
export interface TaskFilter {
  team?: string
  category?: 'EN' | 'US' | 'BUG'
  developer?: string
  minSize?: number
  maxSize?: number
  hasTimeTracking?: boolean
}

// Типы для сортировки
export type SortField = 'title' | 'size' | 'time_tracking' | 'taskCount'
export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  field: SortField
  direction: SortDirection
}

// Типы для аналитики
export interface TeamAnalytics {
  teamName: string
  totalTasks: number
  totalSize: number
  totalTimeTracking: number
  averageTaskSize: number
  averageTimeTracking: number
  completionRate: number
  overloadedDevelopers: string[]
}

// Типы для экспорта данных
export interface ExportData {
  teams: TeamStats[]
  developers: DeveloperStats[]
  crossTeamTasks: CrossTeamTaskDto[]
  noTeamTasks: NoTeamTask[]
  sprintId: number
  exportDate: string
}

// Типы для API запросов
export interface BacklogRequest {
  sprintId?: number
  team?: string
  includeCompleted?: boolean
}

// Типы для уведомлений и алертов
export interface Alert {
  id: string
  type: 'warning' | 'error' | 'info' | 'success'
  message: string
  timestamp: Date
  team?: string
  developer?: string
}

// Типы для настроек приложения
export interface AppSettings {
  theme: 'light' | 'dark'
  defaultView: 'teams' | 'developers' | 'cross-team'
  autoRefresh: boolean
  refreshInterval: number
  showCompletedTasks: boolean
  groupBy: 'team' | 'category' | 'developer'
}
