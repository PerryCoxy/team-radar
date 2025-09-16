// Developer detail page showing individual tasks and workload
import { Clock, Target, TrendingUp, User } from "lucide-react"
import type React from "react"
import { useParams } from "react-router-dom"
import { LoadingWrapper } from "../components/LoadingWrapper"
import { PageHeader } from "../components/PageHeader"
import { StatsCard } from "../components/StatsCard"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { UserList } from "../components/UserList"
import { useBacklogData } from "../contexts/BacklogContext"
import { getCrossTeamTasksByDeveloper } from "../utils/backlogUtils"
import { getOverloadProgressColor, getOverloadVariant } from "../utils/overloadUtils"

export const DeveloperDetail: React.FC = () => {
  const { developerName } = useParams<{ developerName: string }>()
  const { data, isLoading, error } = useBacklogData()

  return (
    <LoadingWrapper isLoading={isLoading} error={error} data={data}>
      <DeveloperDetailContent developerName={developerName} data={data} />
    </LoadingWrapper>
  )
}

interface DeveloperDetailContentProps {
  developerName: string | undefined
  data: any
}

const DeveloperDetailContent: React.FC<DeveloperDetailContentProps> = ({ developerName, data }) => {
  if (!developerName) {
    return <div>Разработчик не найден</div>
  }

  const decodedDeveloperName = decodeURIComponent(developerName)
  
  // Найти разработчика в готовых данных
  const developer = data.developerStats.find((d: any) => d.name === decodedDeveloperName)
  if (!developer) {
    return <div>Разработчик не найден</div>
  }
  
  const crossTeamTasks = getCrossTeamTasksByDeveloper(data, decodedDeveloperName)
  const crossTeamTasksGrouped = developer.crossTeamTasksByParent || []

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={developer.name}
        subtitle={`Команда: ${developer.team} • Детальная информация по задачам`}
        icon={<User className="h-8 w-8 text-primary" />}
        backTo="/"
      />

      {/* Developer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Всего задач"
          value={developer.taskCount + crossTeamTasks.length}
          subtitle={`+${crossTeamTasks.length} кросс-командных`}
          icon={Target}
        />

        <StatsCard
          title="Общий размер"
          value={developer.totalSize}
          icon={TrendingUp}
        />

        <StatsCard
          title="Затрачено времени"
          value={`${developer.totalTimeTracking.toFixed(1)}ч`}
          icon={Clock}
        />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Перегруз</CardTitle>
            <Badge variant={getOverloadVariant(developer.overloadIndicator)}>
              {Math.round(developer.overloadIndicator)}%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Progress value={Math.min(developer.overloadIndicator, 100)} className="h-2" />
              <div
                className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getOverloadProgressColor(developer.overloadIndicator)}`}
                style={{ width: `${Math.min(developer.overloadIndicator, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List with Accordion */}
      <div className="space-y-6">
        {/* Tasks grouped by Parent Task */}
        {developer.tasksByParent && developer.tasksByParent.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Задачи команды ({developer.tasks.length})
            </h2>
            <Accordion type="multiple" className="w-full">
              {/* Each parent task becomes an accordion item */}
              {developer.tasksByParent.map((parentGroup: any) => (
                <AccordionItem key={parentGroup.parentId} value={parentGroup.parentId.toString()}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-start gap-3 w-full">
                      <Badge variant={parentGroup.parentType === 'BUG' ? 'destructive' : parentGroup.parentType === 'EN' ? 'default' : 'secondary'}>
                        {parentGroup.parentType}
                      </Badge>
                      <div className="flex-1 text-left space-y-2">
                        <div className="font-medium">{parentGroup.parentTitle}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {parentGroup.parentId} • {parentGroup.tasks.length} подзадач
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
                      {/* Подзадачи разработчика */}
                      {parentGroup.tasks.map((task: any) => (
                        <Card key={task.id} className="border-l-4 border-l-primary/30">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground mb-2">{task.title}</h4>
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                  <span>Размер: {task.size}</span>
                                  <span>Затрачено: {task.time_tracking}ч</span>
                                  <span>ID: {task.id}</span>
                                </div>
                                {task.members && task.members.length > 0 && (
                                  <div className="mt-2 text-sm text-muted-foreground">
                                    Исполнители: {task.members.map((m: any) => m.full_name).join(', ')}
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-muted-foreground">Прогресс</div>
                                <div className="text-lg font-semibold text-foreground">
                                  {task.size > 0 ? Math.round((task.time_tracking / task.size) * 100) : 0}%
                                </div>
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
        )}

        {/* Cross-Team Tasks with Accordion */}
        {crossTeamTasksGrouped.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Кросс-командные задачи ({crossTeamTasks.length})
            </h2>
            <Accordion type="multiple" className="w-full">
              {crossTeamTasksGrouped.map((parentGroup: any) => (
                <AccordionItem key={`cross-${parentGroup.parentId}`} value={`cross-${parentGroup.parentId}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-start gap-3 w-full">
                      <Badge variant={parentGroup.parentType === 'BUG' ? 'destructive' : parentGroup.parentType === 'EN' ? 'default' : 'secondary'}>
                        {parentGroup.parentType}
                      </Badge>
                      <div className="flex-1 text-left space-y-2">
                        <div className="font-medium">{parentGroup.parentTitle}</div>
                        <div className="text-sm text-muted-foreground">
                          {parentGroup.parentTeam} • {parentGroup.tasks.length} задач
                        </div>
                        
                        {/* Дополнительная информация в заголовке */}
                        <div className="space-y-1">
                          {/* Эксперт для EN/US */}
                          {parentGroup.expert && parentGroup.expert.length > 0 && (
                            <UserList users={parentGroup.expert} type="expert" className="text-xs" />
                          )}
                          
                          {/* Тестировщик для BUG */}
                          {parentGroup.tester && parentGroup.tester.length > 0 && (
                            <UserList users={parentGroup.tester} type="tester" className="text-xs" />
                          )}
                          
                          {/* Внешние исполнители */}
                          {parentGroup.externalExecutors && parentGroup.externalExecutors.length > 0 && (
                            <UserList users={parentGroup.externalExecutors} type="external" className="text-xs" />
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2">Кросс-командная</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 ml-4">
                      {parentGroup.tasks.map((task: any) => (
                        <Card key={task.taskId} className="border-l-4 border-l-orange-400/50">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground mb-2">{task.taskTitle}</h4>
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                  <span>Команда проекта: {task.parentTeam}</span>
                                  <span>ID: {task.taskId}</span>
                                </div>
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
        )}
      </div>
    </div>
  )
}
