"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { ReactNode, useCallback, useRef } from "react"
import { SpotlightCard } from "./animated-elements"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  spotlight?: boolean
}

export function GlassCard({ 
  children, 
  className, 
  hover = true,
  glow = false,
  spotlight = false
}: GlassCardProps) {
  const content = (
    <div
      className={cn(
        "relative glass rounded-2xl p-8 md:p-10 transition-all duration-500",
        hover && "hover:border-primary/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10",
        glow && "hover:glow-sm",
        className
      )}
    >
      {children}
    </div>
  )

  if (spotlight) {
    return <SpotlightCard>{content}</SpotlightCard>
  }

  return content
}

interface PremiumCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "gradient" | "glow"
}

export function PremiumCard({ children, className, variant = "default" }: PremiumCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current.style.setProperty("--mouse-x", `${x}px`)
    ref.current.style.setProperty("--mouse-y", `${y}px`)
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative rounded-2xl p-px transition-all duration-500",
        variant === "gradient" && "bg-gradient-to-br from-primary/50 via-transparent to-accent/50",
        variant === "glow" && "glow-card",
        className
      )}
    >
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(120, 80, 255, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative glass-strong rounded-2xl p-8 md:p-10 h-full">
        {children}
      </div>
    </div>
  )
}

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  features?: string[]
}

export function ServiceCard({ icon, title, description, features }: ServiceCardProps) {
  return (
    <PremiumCard variant="gradient" className="h-full">
      <div className="flex flex-col h-full">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">{description}</p>
        {features && features.length > 0 && (
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary group-hover:shadow-sm group-hover:shadow-primary transition-all duration-300" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </PremiumCard>
  )
}

interface StatCardProps {
  value: string
  label: string
  description?: string
}

export function StatCard({ value, label, description }: StatCardProps) {
  return (
    <PremiumCard className="text-center group">
      <div className="text-5xl md:text-6xl font-bold text-gradient mb-3 group-hover:scale-105 transition-transform duration-500">{value}</div>
      <div className="text-lg font-semibold mb-1 text-foreground/90">{label}</div>
      {description && (
        <div className="text-sm text-muted-foreground">{description}</div>
      )}
    </PremiumCard>
  )
}

interface TestimonialCardProps {
  quote: string
  author: string
  company: string
  role?: string
}

export function TestimonialCard({ quote, author, company, role }: TestimonialCardProps) {
  return (
    <PremiumCard variant="glow" className="h-full">
      {/* Quote mark */}
      <div className="absolute top-6 right-8 text-6xl font-serif text-primary/10 group-hover:text-primary/20 transition-colors duration-500">&ldquo;</div>
      
      <blockquote className="text-lg leading-relaxed mb-8 relative z-10">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow duration-500">
          {author.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-foreground">{author}</div>
          <div className="text-sm text-muted-foreground">
            {role && `${role}, `}{company}
          </div>
        </div>
      </div>
    </PremiumCard>
  )
}

interface CaseCardProps {
  title: string
  category: string
  results: { label: string; value: string }[]
  images?: string[]
  beforeImage?: string
  afterImage?: string
  href?: string
}

export function CaseCard({ title, category, results, images, beforeImage, href }: CaseCardProps) {
  const resolvedImages = images?.length ? images : beforeImage ? [beforeImage] : []

  const inner = (
    <PremiumCard variant="gradient">
      <div className="aspect-video rounded-xl mb-8 flex items-center justify-center overflow-hidden relative bg-muted">
        {resolvedImages.length > 0 ? (
          <>
            {resolvedImages.length === 1 ? (
              <Image
                src={resolvedImages[0]}
                alt={`Voorbeeld ${title}`}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                className="object-cover object-top"
                priority={false}
              />
            ) : (
              <Carousel
                opts={{ loop: true }}
                className="absolute inset-0 h-full"
                aria-label={`Screenshots van ${title}`}
              >
                <CarouselContent className="h-full" contentClassName="h-full ml-0">
                  {resolvedImages.map((src, i) => (
                    <CarouselItem key={`${title}-${i}-${src}`} className="h-full pl-0">
                      <div className="relative h-full w-full">
                        <Image
                          src={src}
                          alt={`Screenshot ${i + 1} van ${title}`}
                          fill
                          quality={100}
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                          className="object-cover object-top"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious
                  className="left-3 top-1/2 -translate-y-1/2 bg-background/40 backdrop-blur-sm border-border/50 hover:bg-background/60"
                />
                <CarouselNext
                  className="right-3 top-1/2 -translate-y-1/2 bg-background/40 backdrop-blur-sm border-border/50 hover:bg-background/60"
                />
              </Carousel>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent pointer-events-none" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
            <span className="text-muted-foreground text-sm relative z-10 font-medium">Voorbeeld</span>
          </>
        )}
      </div>

      <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
        {category}
      </span>
      <h3 className="text-xl font-semibold mb-6 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {results.map((result, index) => (
          <div
            key={index}
            className="px-4 py-2 bg-secondary/80 rounded-xl border border-border/50 group-hover:border-primary/30 group-hover:bg-secondary transition-all duration-300"
          >
            <span className="text-primary font-bold">{result.value}</span>
            <span className="text-muted-foreground text-sm ml-2">{result.label}</span>
          </div>
        ))}
      </div>
    </PremiumCard>
  )

  if (href) {
    return (
      <a href={href} className="group block cursor-pointer">
        {inner}
      </a>
    )
  }

  return <div className="group block">{inner}</div>
}

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  index?: number
}

export function FeatureCard({ icon, title, description, index = 0 }: FeatureCardProps) {
  return (
    <PremiumCard className="h-full relative overflow-hidden">
      {/* Subtle number indicator */}
      <span className="absolute top-4 right-4 text-8xl font-bold text-primary/5 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </PremiumCard>
  )
}
