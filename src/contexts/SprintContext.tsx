import React, { createContext, ReactNode, useContext, useState } from 'react'

interface SprintContextType {
  selectedSprint: number
  setSelectedSprint: (sprint: number) => void
  availableSprints: number[]
}

const SprintContext = createContext<SprintContextType | undefined>(undefined)

interface SprintProviderProps {
  children: ReactNode
}

export const SprintProvider: React.FC<SprintProviderProps> = ({ children }) => {
  // Начальный спринт - 66, как сейчас
  const [selectedSprint, setSelectedSprint] = useState<number>(66)
  
  // Список доступных спринтов (можно расширить)
  const availableSprints = [66, 67, 68, 69, 70]

  const value: SprintContextType = {
    selectedSprint,
    setSelectedSprint,
    availableSprints
  }

  return (
    <SprintContext.Provider value={value}>
      {children}
    </SprintContext.Provider>
  )
}

export const useSprint = () => {
  const context = useContext(SprintContext)
  if (context === undefined) {
    throw new Error('useSprint must be used within a SprintProvider')
  }
  return context
}
