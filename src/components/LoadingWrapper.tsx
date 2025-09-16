import type React from "react"

interface LoadingWrapperProps {
  isLoading: boolean
  error: Error | null
  data: any
  children: React.ReactNode
  loadingComponent?: React.ReactNode
  errorComponent?: (error: Error) => React.ReactNode
  noDataComponent?: React.ReactNode
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  isLoading,
  error,
  data,
  children,
  loadingComponent = <div>Loading...</div>,
  errorComponent = (error) => <div>Error: {error.message}</div>,
  noDataComponent = <div>No data available</div>
}) => {
  if (isLoading) return <>{loadingComponent}</>
  if (error) return <>{errorComponent(error)}</>
  if (!data) return <>{noDataComponent}</>
  
  return <>{children}</>
}
