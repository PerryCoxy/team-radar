import { Loader2 } from "lucide-react"
import React from "react"
import { cn } from "../../lib/utils"

interface LoaderProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
  fullScreen?: boolean
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = "md", 
  text = "Загрузка...", 
  className,
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  }

  const content = (
    <div className={cn(
      "flex flex-col items-center justify-center gap-3",
      fullScreen ? "min-h-screen" : "py-8",
      className
    )}>
      <div className="relative">
        {/* Основной спиннер */}
        <Loader2 
          className={cn(
            "animate-spin text-primary",
            sizeClasses[size]
          )}
        />
        
        {/* Дополнительное кольцо для красоты */}
        <div 
          className={cn(
            "absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse",
            sizeClasses[size]
          )}
        />
      </div>
      
      {text && (
        <p className={cn(
          "text-muted-foreground animate-pulse font-medium",
          textSizeClasses[size]
        )}>
          {text}
        </p>
      )}
      
      {/* Декоративные точки */}
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    )
  }

  return content
}
