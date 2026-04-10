"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/diensten", label: "Diensten" },
  { href: "/cases", label: "Ons werk" },
  { href: "/over-ons", label: "Over Ons" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "py-4 glass-strong border-b border-border/50 shadow-lg shadow-black/10"
          : "py-6 bg-transparent"
      )}
    >
      <nav className="container mx-auto px-6 lg:px-8 flex items-center justify-between relative z-[70]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="text-2xl font-bold tracking-tight transition-colors duration-300">
            CNT<span className="text-gradient-static group-hover:text-primary transition-colors duration-300">studios</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Button 
            asChild 
            className="glow-sm hover:glow-primary transition-all duration-500 rounded-xl px-6"
          >
            <Link href="/contact" className="flex items-center gap-2">
              Gratis Analyse
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Menu sluiten" : "Menu openen"}
        >
          <div className="relative w-5 h-5">
            <span 
              className={cn(
                "absolute left-0 w-5 h-0.5 bg-foreground transition-all duration-300",
                isMobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1"
              )}
            />
            <span 
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-foreground transition-all duration-300",
                isMobileMenuOpen && "opacity-0"
              )}
            />
            <span 
              className={cn(
                "absolute left-0 w-5 h-0.5 bg-foreground transition-all duration-300",
                isMobileMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-1"
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-all duration-500",
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div
          className={cn(
            "relative h-full flex flex-col pt-24 pb-12 px-6 transition-all duration-500 pointer-events-none",
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-8",
          )}
        >
          <div className="flex flex-col gap-2 pointer-events-auto">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-3xl font-bold py-4 transition-all duration-300",
                  pathname === link.href
                    ? "text-gradient-static"
                    : "text-muted-foreground hover:text-foreground",
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-20px)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pointer-events-auto">
            <Button 
              asChild 
              size="lg" 
              className="w-full glow-primary text-lg py-6 rounded-xl"
            >
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Gratis Analyse
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
