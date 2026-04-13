"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ArrowRight, UserRound } from "lucide-react"
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

  /* iOS: overflow:hidden op body houdt scroll vaak niet tegen; fixed + scroll-positie wel. */
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const scrollY = window.scrollY
    const html = document.documentElement
    const prevHtmlOverflow = html.style.overflow
    const prevBodyPosition = document.body.style.position
    const prevBodyTop = document.body.style.top
    const prevBodyLeft = document.body.style.left
    const prevBodyRight = document.body.style.right
    const prevBodyWidth = document.body.style.width
    const prevBodyOverflow = document.body.style.overflow

    html.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = "0"
    document.body.style.right = "0"
    document.body.style.width = "100%"
    document.body.style.overflow = "hidden"

    return () => {
      html.style.overflow = prevHtmlOverflow
      document.body.style.position = prevBodyPosition
      document.body.style.top = prevBodyTop
      document.body.style.left = prevBodyLeft
      document.body.style.right = prevBodyRight
      document.body.style.width = prevBodyWidth
      document.body.style.overflow = prevBodyOverflow

      /* globals.css zet scroll-behavior: smooth op html → scrollTo zou dan animeren. Direct herstellen. */
      const prevScrollBehavior = html.style.scrollBehavior
      html.style.scrollBehavior = "auto"
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" })
      html.style.scrollBehavior = prevScrollBehavior
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 [-webkit-tap-highlight-color:transparent]",
        /* Geen transition-all bij open menu: voorkomt “eerst strookje, dan pas vol” door trage bg/padding-animatie */
        isMobileMenuOpen
          ? "z-[9990] bg-card py-4 border-b border-border/60 shadow-lg transition-none"
          : cn(
              "z-50 transition-all duration-500",
              isScrolled
                ? "py-4 glass-strong border-b border-border/50 shadow-lg shadow-black/10"
                : "py-6 bg-transparent",
            ),
      )}
    >
      {/* Bovenste balk altijd boven het mobiele menu-paneel (z-[100]) */}
      <nav className="relative z-[110] container mx-auto px-6 lg:px-8 flex items-center justify-between">
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

        {/* Desktop: klantenportaal + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors duration-300"
            aria-label="Inloggen klantenportaal"
          >
            <UserRound className="h-5 w-5" aria-hidden />
          </Link>
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

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/login"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors duration-300 touch-manipulation"
            aria-label="Inloggen klantenportaal"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <UserRound className="h-5 w-5" aria-hidden />
          </Link>
          <button
            type="button"
            className="relative z-[120] w-12 h-12 flex items-center justify-center rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300 touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Menu sluiten" : "Menu openen"}
          >
            <div className="relative w-5 h-5">
              <span
                className={cn(
                  "absolute left-0 w-5 h-0.5 bg-foreground transition-all duration-300",
                  isMobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-foreground transition-all duration-300",
                  isMobileMenuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 w-5 h-0.5 bg-foreground transition-all duration-300",
                  isMobileMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-1",
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation — geen opacity/translate op de shell: meteen volle dekkende laag (geen twee-fasen-bug) */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-[100] isolate min-h-[100dvh] overscroll-y-contain",
          isMobileMenuOpen
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible",
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className="absolute inset-0 min-h-[100dvh] bg-card touch-none"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden
        />

        <div
          className={cn(
            "relative z-[1] flex h-full min-h-[100dvh] flex-col bg-card pt-24 pb-12 px-6 pointer-events-none border-t border-border/40 touch-pan-y",
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-2",
              isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                tabIndex={isMobileMenuOpen ? undefined : -1}
                className={cn(
                  "text-3xl font-bold py-4 touch-manipulation",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div
            className={cn(
              "mt-auto",
              isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
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
