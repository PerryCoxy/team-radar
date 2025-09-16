import React from 'react'
import { useSprint } from '../contexts/SprintContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export const SprintSelector: React.FC = () => {
  const { selectedSprint, setSelectedSprint, availableSprints } = useSprint()

  const handleSprintChange = (value: string) => {
    setSelectedSprint(parseInt(value))
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Спринт:</span>
      <Select value={selectedSprint.toString()} onValueChange={handleSprintChange}>
        <SelectTrigger className="w-20 h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {availableSprints.map((sprint) => (
            <SelectItem key={sprint} value={sprint.toString()}>
              {sprint}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}


