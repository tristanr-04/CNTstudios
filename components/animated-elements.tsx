"use client"

import { cn } from "@/lib/utils"
import { ReactNode, useEffect, useRef, useState, useCallback } from "react"

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  duration?: number
}

export function FadeIn({ 
  children, 
  className, 
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 800
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)"
    switch (direction) {
      case "up": return `translate3d(0, ${distance}px, 0)`
      case "down": return `translate3d(0, -${distance}px, 0)`
      case "left": return `translate3d(${distance}px, 0, 0)`
      case "right": return `translate3d(-${distance}px, 0, 0)`
      default: return "translate3d(0, 0, 0)"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ children, className, staggerDelay = 100 }: StaggerContainerProps) {
  return (
    <div className={className}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <FadeIn key={index} delay={index * staggerDelay}>
              {child}
            </FadeIn>
          ))
        : children
      }
    </div>
  )
}

interface GlowOrbProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  color?: "primary" | "accent" | "mixed"
  intensity?: "low" | "medium" | "high"
  animated?: boolean
}

export function GlowOrb({ 
  className, 
  size = "md", 
  color = "primary",
  intensity = "medium",
  animated = true
}: GlowOrbProps) {
  const sizeClasses = {
    sm: "w-48 h-48",
    md: "w-80 h-80",
    lg: "w-[32rem] h-[32rem]",
    xl: "w-[48rem] h-[48rem]",
  }

  const colorClasses = {
    primary: "from-primary/40 via-primary/20 to-transparent",
    accent: "from-accent/40 via-accent/20 to-transparent",
    mixed: "from-primary/30 via-accent/20 to-transparent",
  }

  const intensityOpacity = {
    low: "opacity-30",
    medium: "opacity-50",
    high: "opacity-70",
  }

  return (
    <div
      className={cn(
        "absolute rounded-full bg-gradient-radial blur-[60px] pointer-events-none",
        sizeClasses[size],
        colorClasses[color],
        intensityOpacity[intensity],
        animated && "animate-float-slow",
        className
      )}
      aria-hidden="true"
    />
  )
}

interface GridBackgroundProps {
  className?: string
  variant?: "dots" | "lines" | "cross"
}

export function GridBackground({ className, variant = "lines" }: GridBackgroundProps) {
  const patterns = {
    dots: `radial-gradient(circle at center, rgba(255,255,255,0.15) 1px, transparent 1px)`,
    lines: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
    cross: `linear-gradient(rgba(255,255,255,0.06) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1.5px, transparent 1.5px)`,
  }

  const sizes = {
    dots: "24px 24px",
    lines: "80px 80px",
    cross: "60px 60px",
  }

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        className
      )}
      style={{
        backgroundImage: patterns[variant],
        backgroundSize: sizes[variant],
        maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  )
}

interface CountUpProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

export function CountUp({ 
  end, 
  suffix = "", 
  prefix = "", 
  duration = 2500,
  decimals = 0
}: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const animate = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            setCount(easeOutExpo * end)
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  )
}

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <span ref={ref} className={cn("inline-block overflow-hidden", className)}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block will-change-transform"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(100%)",
            transition: `opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
            transitionDelay: `${delay + index * 30}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className, strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const lastEvent = useRef<MouseEvent | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    lastEvent.current = e
    if (rafRef.current != null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const ev = lastEvent.current
      if (!ev || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = (ev.clientX - centerX) * strength
      const y = (ev.clientY - centerY) * strength
      setPosition({ x, y })
    })
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    setPosition({ x: 0, y: 0 })
  }, [])

  return (
    <div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={(e) => handleMouseMove(e.nativeEvent)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 
          ? "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" 
          : "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  )
}

interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
}

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const elementTop = rect.top + scrolled
      const relativeScroll = scrolled - elementTop + window.innerHeight
      setOffset(relativeScroll * speed * 0.1)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(0, ${offset}px, 0)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}

interface GlowLineProps {
  className?: string
  direction?: "horizontal" | "vertical"
}

export function GlowLine({ className, direction = "horizontal" }: GlowLineProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        direction === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          direction === "horizontal" 
            ? "bg-gradient-to-r from-transparent via-primary to-transparent"
            : "bg-gradient-to-b from-transparent via-primary to-transparent"
        )}
      />
      <div
        className={cn(
          "absolute",
          direction === "horizontal"
            ? "inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-shimmer"
            : "inset-x-0 h-32 bg-gradient-to-b from-transparent via-white/80 to-transparent animate-shimmer"
        )}
        style={{
          animation: "shimmer-move 3s ease-in-out infinite",
        }}
      />
    </div>
  )
}

interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    ref.current.style.setProperty("--mouse-x", `${x}%`)
    ref.current.style.setProperty("--mouse-y", `${y}%`)
  }, [])

  return (
    <div
      ref={ref}
      className={cn("spotlight", className)}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  )
}

interface AnimatedBorderProps {
  children: ReactNode
  className?: string
}

export function AnimatedBorder({ children, className }: AnimatedBorderProps) {
  return (
    <div className={cn("border-gradient", className)}>
      {children}
    </div>
  )
}
