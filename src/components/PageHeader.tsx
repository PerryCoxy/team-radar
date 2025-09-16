import { ArrowLeft } from "lucide-react"
import type React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  showBackButton?: boolean
  backTo?: string
  onBack?: () => void
  rightContent?: React.ReactNode
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  showBackButton = true,
  backTo,
  onBack,
  rightContent
}) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else if (backTo) {
      navigate(backTo)
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            {icon}
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {rightContent && (
        <div>{rightContent}</div>
      )}
    </div>
  )
}
