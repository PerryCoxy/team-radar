import backlogData from "../data/backlog_mock.json";
import type { BacklogResponse, DeveloperStats, ParentDto, TeamStats } from "../types";

export const processBacklogData = (data: BacklogResponse) => {
  const teamStats: TeamStats[] = []
  const developerStats: DeveloperStats[] = []

  // Process teams data
  Object.entries(data.groups.teams).forEach(([teamName, teamData]) => {
    const allTasks: ParentDto[] = [...teamData.EN, ...teamData.US]

    let totalSize = 0
    let totalTimeTracking = 0
    let taskCount = 0

    // Calculate team statistics
    allTasks.forEach((parent) => {
      if (parent.tasks) {
        parent.tasks.forEach((task) => {
          totalSize += task.size
          totalTimeTracking += task.time_tracking
          taskCount++

          // Process developer statistics
          task.members.forEach((member) => {
            const existingDev = developerStats.find((dev) => dev.name === member.full_name)
            if (existingDev) {
              existingDev.taskCount++
              existingDev.totalSize += task.size
              existingDev.totalTimeTracking += task.time_tracking
              existingDev.tasks.push(task)
            } else {
              developerStats.push({
                name: member.full_name,
                team: teamName,
                taskCount: 1,
                totalSize: task.size,
                totalTimeTracking: task.time_tracking,
                overloadIndicator: 0, // Will be calculated later
                tasks: [task],
              })
            }
          })
        })
      }
    })

    // Calculate overload indicator (time_tracking / size ratio as percentage)
    const overloadIndicator = totalSize > 0 ? Math.min((totalTimeTracking / totalSize) * 100, 150) : 0

    teamStats.push({
      name: teamName,
      taskCount,
      totalSize,
      totalTimeTracking,
      overloadIndicator,
      tasks: allTasks,
    })
  })

  // Calculate developer overload indicators
  developerStats.forEach((dev) => {
    dev.overloadIndicator = dev.totalSize > 0 ? Math.min((dev.totalTimeTracking / dev.totalSize) * 100, 150) : 0
  })

  return {
    teamStats,
    developerStats,
    noTeamTasks: data.groups.NO_TEAM,
    crossTeamTasks: data.groups.CROSS_TEAM,
  }
}

// Get processed data
export const getProcessedData = () => {
  return processBacklogData(backlogData as BacklogResponse)
}

// Helper functions
export const getTeamByName = (teamName: string) => {
  const { teamStats } = getProcessedData()
  return teamStats.find((team) => team.name === teamName)
}

export const getDeveloperByName = (developerName: string) => {
  const { developerStats } = getProcessedData()
  return developerStats.find((dev) => dev.name === developerName)
}

export const getCrossTeamTasksByDeveloper = (developerName: string) => {
  const { crossTeamTasks } = getProcessedData()
  return crossTeamTasks.filter((task) => task.developer === developerName)
}
