export interface Member {
  id: number
  uid: string
  full_name: string
}

export interface TaskDto {
  id: number
  title: string
  size: number
  time_tracking: number
  members: Member[]
}

export interface ParentDto {
  id: number
  title: string
  team: string
  tasks?: TaskDto[]
}

export interface CrossTeamTaskDto {
  developer: string
  developerTeam: string
  taskId: number
  taskTitle: string
  parentId: number
  parentTitle: string
  parentTeam: string
}

export interface NoTeamTask {
  id: number
  title: string
  team: string
}

export interface BacklogResponse {
  sprint_id: number
  groups: {
    teams: Record<
      string,
      {
        EN: ParentDto[]
        US: ParentDto[]
      }
    >
    NO_TEAM: NoTeamTask[]
    CROSS_TEAM: CrossTeamTaskDto[]
  }
}

// Processed data types for UI
export interface TeamStats {
  name: string
  taskCount: number
  totalSize: number
  totalTimeTracking: number
  overloadIndicator: number // percentage
  tasks: ParentDto[]
}

export interface DeveloperStats {
  name: string
  team: string
  taskCount: number
  totalSize: number
  totalTimeTracking: number
  overloadIndicator: number
  tasks: TaskDto[]
}
