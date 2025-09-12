import React, { createContext, ReactNode, useContext } from 'react'
import { useBacklog } from '../hooks/useBacklog'
import { BacklogResponse } from '../types'

interface BacklogContextType {
  data: BacklogResponse | undefined
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

const BacklogContext = createContext<BacklogContextType | undefined>(undefined)

interface BacklogProviderProps {
  children: ReactNode
}

export const BacklogProvider: React.FC<BacklogProviderProps> = ({ children }) => {
  const { data, isLoading, error, refetch } = useBacklog()

  const value: BacklogContextType = {
    data,
    isLoading,
    error,
    refetch
  }

  return (
    <BacklogContext.Provider value={value}>
      {children}
    </BacklogContext.Provider>
  )
}

export const useBacklogData = (): BacklogContextType => {
  const context = useContext(BacklogContext)
  if (context === undefined) {
    throw new Error('useBacklogData must be used within a BacklogProvider')
  }
  return context
}
