/**
 * Форматирует время в часах в формат "Xч Yм"
 * @param hours - время в часах (может быть дробным)
 * @returns отформатированная строка
 */
export const formatTime = (hours: number): string => {
  if (hours === 0) return "0ч"
  
  const wholeHours = Math.floor(hours)
  const minutes = Math.round((hours - wholeHours) * 60)
  
  if (wholeHours === 0) {
    return `${minutes}м`
  }
  
  if (minutes === 0) {
    return `${wholeHours}ч`
  }
  
  return `${wholeHours}ч ${minutes}м`
}

/**
 * Форматирует размер задач в часах (то же что и время)
 * @param size - размер в часах (может быть дробным)
 * @returns отформатированная строка
 */
export const formatSize = (size: number): string => {
  // Размер задач тоже в часах, используем ту же логику что и для времени
  return formatTime(size)
}
