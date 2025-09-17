import { Palette } from "lucide-react"
import React from "react"
import { useTheme } from "../../hooks/useTheme"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
// Временно используем простой select, пока не исправим компонент Select
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./select"

export const ThemeSelector: React.FC = () => {
  const { currentTheme, changeTheme, availableThemes } = useTheme()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Palette className="h-5 w-5 text-primary" />
          Цветовая тема
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Выберите тему:
            </label>
            <select 
              value={currentTheme.name} 
              onChange={(e) => changeTheme(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {availableThemes.map((theme) => (
                <option key={theme.name} value={theme.name}>
                  {theme.displayName}
                </option>
              ))}
            </select>
          </div>
          
          {/* Превью цветов текущей темы */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Превью:</p>
            <div className="grid grid-cols-4 gap-2">
              <div 
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: `hsl(${currentTheme.colors.primary})` }}
                title="Primary"
              />
              <div 
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: `hsl(${currentTheme.colors.secondary})` }}
                title="Secondary"
              />
              <div 
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: `hsl(${currentTheme.colors.success})` }}
                title="Success"
              />
              <div 
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: `hsl(${currentTheme.colors.warning})` }}
                title="Warning"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
