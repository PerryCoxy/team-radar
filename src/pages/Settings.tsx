import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Настройки</h1>
        <p className="text-muted-foreground">Управление командами и составом разработчиков</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Управление командами</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Функционал добавления/удаления команд будет реализован в следующих версиях.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Управление разработчиками</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Функционал управления составом разработчиков будет реализован в следующих версиях.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
