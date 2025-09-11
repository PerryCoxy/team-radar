import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export const Reports: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Отчёты</h1>
        <p className="text-muted-foreground">Аналитика и отчёты по загрузке команд</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Отчёты по загрузке</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Функционал отчётов будет реализован в следующих версиях.</p>
        </CardContent>
      </Card>
    </div>
  )
}
