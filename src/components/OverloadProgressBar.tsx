import React from 'react'
import { getOverloadColor } from '../utils/overloadUtils'

interface OverloadProgressBarProps {
  value: number
  label: string
  showPercentage?: boolean
}

export const OverloadProgressBar: React.FC<OverloadProgressBarProps> = ({ 
  value, 
  label, 
  showPercentage = true 
}) => {
  const percentage = Math.min(value, 100)
  const colorClass = getOverloadColor(value)

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        {showPercentage && (
          <span className="text-foreground font-medium">{Math.round(value)}%</span>
        )}
      </div>
      <div className="relative h-3 bg-muted/60 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}


