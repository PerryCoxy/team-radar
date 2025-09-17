import { LucideIcon } from 'lucide-react'
import React from 'react'

interface StatItem {
  label: string
  value: string | number
  icon: LucideIcon
}

interface StatsGridProps {
  stats: StatItem[]
  columns?: 2 | 3 | 4
}

export const StatsGrid: React.FC<StatsGridProps> = ({ 
  stats, 
  columns = 2 
}) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3', 
    4: 'grid-cols-4'
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-lg font-semibold text-foreground">{stat.value}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}




