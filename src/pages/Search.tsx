import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export const Search: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Поиск разработчика</h1>
        <p className="text-muted-foreground">Поиск и анализ загрузки разработчиков</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Поиск по разработчикам</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Функционал поиска будет реализован в следующих версиях.</p>
        </CardContent>
      </Card>
    </div>
  )
}
