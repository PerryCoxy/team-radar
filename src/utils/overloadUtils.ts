// Утилиты для работы с перегрузкой

export const getOverloadColor = (indicator: number): string => {
  if (indicator <= 50) return "bg-emerald-500"
  if (indicator <= 80) return "bg-amber-500"
  return "bg-red-500"
}

// Альтернативная версия для прогресс-баров (используется в DeveloperDetail)
export const getOverloadProgressColor = (indicator: number): string => {
  if (indicator <= 50) return "bg-green-500"
  if (indicator <= 80) return "bg-yellow-500"
  return "bg-red-500"
}

export const getOverloadVariant = (indicator: number): "secondary" | "default" | "destructive" => {
  if (indicator <= 50) return "secondary"
  if (indicator <= 80) return "default"
  return "destructive"
}

export const formatOverloadIndicator = (indicator: number): string => {
  return `${Math.round(indicator)}%`
}


