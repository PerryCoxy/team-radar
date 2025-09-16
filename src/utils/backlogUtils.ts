import { BacklogResponse, CrossTeamTaskDto, NoTeamTask, ParentDto, TaskDto, TeamTasks } from '../types'

// Получить данные команды по имени
export const getTeamData = (data: BacklogResponse, teamName: string): TeamTasks | undefined => {
  return data.groups.teams[teamName]
}

// Получить список всех команд
export const getTeamNames = (data: BacklogResponse): string[] => {
  return Object.keys(data.groups.teams)
}

// Получить все задачи команды (EN + US + BUG)
export const getAllTeamTasks = (data: BacklogResponse, teamName: string): ParentDto[] => {
  const teamData = getTeamData(data, teamName)
  if (!teamData) return []
  
  return [...teamData.EN, ...teamData.US, ...teamData.BUG]
}

// Получить задачи по категории
export const getTasksByCategory = (data: BacklogResponse, teamName: string, category: 'EN' | 'US' | 'BUG'): ParentDto[] => {
  const teamData = getTeamData(data, teamName)
  if (!teamData) return []
  
  return teamData[category]
}

// Получить все подзадачи команды
export const getAllSubTasks = (data: BacklogResponse, teamName: string): TaskDto[] => {
  const allTasks = getAllTeamTasks(data, teamName)
  const subTasks: TaskDto[] = []
  
  allTasks.forEach(parent => {
    if (parent.tasks) {
      subTasks.push(...parent.tasks)
    }
  })
  
  return subTasks
}

// Получить задачи конкретного разработчика
export const getDeveloperTasks = (data: BacklogResponse, developerName: string): TaskDto[] => {
  const allSubTasks: TaskDto[] = []
  
  Object.values(data.groups.teams).forEach(teamData => {
    [...teamData.EN, ...teamData.US, ...teamData.BUG].forEach(parent => {
      if (parent.tasks) {
        parent.tasks.forEach(task => {
          if (task.members.some(member => member.full_name === developerName)) {
            allSubTasks.push(task)
          }
        })
      }
    })
  })
  
  return allSubTasks
}

// Получить кросс-командные задачи
export const getCrossTeamTasks = (data: BacklogResponse): CrossTeamTaskDto[] => {
  return data.groups.CROSS_TEAM
}

// Получить кросс-командные задачи разработчика
export const getCrossTeamTasksByDeveloper = (data: BacklogResponse, developerName: string): CrossTeamTaskDto[] => {
  return data.groups.CROSS_TEAM.filter(task => task.developer === developerName)
}

// Получить задачи без команды
export const getNoTeamTasks = (data: BacklogResponse): NoTeamTask[] => {
  return data.groups.NO_TEAM
}

// Получить sprint_id
export const getSprintId = (data: BacklogResponse): number => {
  return data.sprint_id
}

