import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  size?: "sm" | "md" | "lg"
}

export function Section({ children, className, id, size = "md" }: SectionProps) {
  const sizeClasses = {
    sm: "py-12 md:py-16",
    md: "py-16 md:py-24",
    lg: "py-20 md:py-28",
  }

  return (
    <section
      id={id}
      className={cn(sizeClasses[size], className)}
    >
      <div className="container mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  className?: string
  centered?: boolean
}

export function SectionHeader({ 
  badge, 
  title, 
  description, 
  className,
  centered = true 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-10 md:mb-12",
      centered && "text-center max-w-4xl mx-auto",
      className
    )}>
      {badge && (
        <span className="inline-flex items-center px-5 py-2 mb-5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 rounded-full border border-primary/30 backdrop-blur-sm">
          {badge}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 md:mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}
