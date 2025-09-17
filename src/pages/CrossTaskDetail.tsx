
// Cross-team tasks detail page
import { ArrowRightLeft, Building, User } from "lucide-react"
import type React from "react"
import { LoadingWrapper } from "../components/LoadingWrapper"
import { PageHeader } from "../components/PageHeader"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { SprintTransferBadge } from "../components/ui/SprintTransferBadge"
import { UserList } from "../components/UserList"
import { useBacklogData } from "../contexts/BacklogContext"
import { getCrossTeamTasksGrouped } from "../utils/backlogUtils"

export const CrossTaskDetail: React.FC = () => {
  const { data, isLoading, error } = useBacklogData()

  return (
    <LoadingWrapper isLoading={isLoading} error={error} data={data}>
      <CrossTaskDetailContent data={data} />
    </LoadingWrapper>
  )
}

interface CrossTaskDetailContentProps {
  data: any
}

const CrossTaskDetailContent: React.FC<CrossTaskDetailContentProps> = ({ data }) => {
  const crossTeamTasksGrouped = getCrossTeamTasksGrouped(data)
  
  // Вычисляем статистику из группированных данных
  const allTasks = crossTeamTasksGrouped.flatMap(group => group.tasks)
  const uniqueDevelopers = new Set(allTasks.map((task) => task.developer)).size
  const uniqueTeams = new Set(crossTeamTasksGrouped.map((group) => group.parentTeam)).size

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Кросс-командные задачи"
        subtitle="Задачи, выполняемые разработчиками из разных команд"
        icon={<ArrowRightLeft className="h-8 w-8 text-primary" />}
        backTo="/"
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Всего задач</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{allTasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Разработчиков</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{uniqueDevelopers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Команд</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{uniqueTeams}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List with Accordion */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Кросс-командные задачи по проектам ({allTasks.length})
        </h2>
        <Accordion type="multiple" className="w-full">
          {crossTeamTasksGrouped.map((parentGroup: any) => (
            <AccordionItem key={parentGroup.parentId} value={parentGroup.parentId.toString()}>
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3 w-full">
                  <Badge variant={parentGroup.parentType === 'BUG' ? 'destructive' : parentGroup.parentType === 'EN' ? 'default' : 'secondary'}>
                    {parentGroup.parentType}
                  </Badge>
                  <div className="flex-1 text-left space-y-2">
                    <div className="font-medium">{parentGroup.parentTitle}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{parentGroup.parentTeam} • {parentGroup.tasks.length} задач</span>
                      {parentGroup.sprintTransfers !== undefined && (
                        <SprintTransferBadge 
                          transferCount={parentGroup.sprintTransfers}
                          transferHistory={parentGroup.transferHistory}
                          cardTitle={parentGroup.parentTitle}
                        />
                      )}
                    </div>
                    
                    {/* Дополнительная информация в заголовке */}
                    <div className="space-y-1">
                      {/* Эксперт для EN/US */}
                      {parentGroup.expert && (
                        <UserList users={parentGroup.expert} type="expert" className="text-xs" />
                      )}
                      
                      {/* Тестировщик для BUG */}
                      {parentGroup.tester && (
                        <UserList users={parentGroup.tester} type="tester" className="text-xs" />
                      )}
                      
                      {/* Внешние исполнители */}
                      {parentGroup.externalExecutors && (
                        <UserList users={parentGroup.externalExecutors} type="external" className="text-xs" />
                      )}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 ml-4">
                  {parentGroup.tasks.map((task: any) => (
                    <Card key={task.taskId} className="border-l-4 border-l-primary/30">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground mb-2">{task.taskTitle}</h4>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span>Разработчик: {task.developer}</span>
                              <span>Команда разработчика: {task.developerTeam}</span>
                              <span>ID: {task.taskId}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge variant="outline">
                              {task.developer}
                            </Badge>
                            <Badge variant="secondary">
                              {task.developerTeam}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
