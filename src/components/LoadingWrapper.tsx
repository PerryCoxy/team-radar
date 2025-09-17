import { AlertCircle, Database } from "lucide-react"
import type React from "react"
import { Card, CardContent } from "./ui/card"
import { Loader } from "./ui/Loader"

interface LoadingWrapperProps {
  isLoading: boolean
  error: Error | null
  data: any
  children: React.ReactNode
  loadingComponent?: React.ReactNode
  errorComponent?: (error: Error) => React.ReactNode
  noDataComponent?: React.ReactNode
  loadingText?: string
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  isLoading,
  error,
  data,
  children,
  loadingComponent,
  errorComponent,
  noDataComponent,
  loadingText = "Загружаем данные..."
}) => {
  if (isLoading) {
    return loadingComponent || <Loader text={loadingText} size="lg" />
  }
  
  if (error) {
    return errorComponent ? (
      <>{errorComponent(error)}</>
    ) : (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ошибка загрузки
              </h3>
              <p className="text-muted-foreground text-sm">
                {error.message}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  if (!data) {
    return noDataComponent || (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <Database className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Нет данных
              </h3>
              <p className="text-muted-foreground text-sm">
                Данные пока не загружены
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return <>{children}</>
}
