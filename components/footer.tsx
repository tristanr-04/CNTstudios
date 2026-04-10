import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { GlowLine } from "./animated-elements"

const footerLinks = {
  navigatie: [
    { href: "/", label: "Home" },
    { href: "/diensten", label: "Diensten" },
    { href: "/cases", label: "Ons werk" },
    { href: "/over-ons", label: "Over Ons" },
    { href: "/contact", label: "Contact" },
  ],
  diensten: [
    { href: "/diensten#redesign", label: "Website Redesign" },
    { href: "/diensten#conversie", label: "Conversie Optimalisatie" },
    { href: "/diensten#performance", label: "Performance Optimalisatie" },
    { href: "/diensten#ux-ui", label: "UX/UI Verbeteringen" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-background/50 backdrop-blur-sm">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0">
        <GlowLine />
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <span className="text-3xl font-bold tracking-tight">
                CNT<span className="text-gradient-static group-hover:text-primary transition-colors duration-300">studios</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed text-lg mb-8">
              Wij transformeren bestaande websites naar high-converting machines. 
              Premium digital agency uit Nederland.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
            >
              Start een project
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-6">
              Navigatie
            </h4>
            <ul className="space-y-4">
              {footerLinks.navigatie.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-6">
              Diensten
            </h4>
            <ul className="space-y-4">
              {footerLinks.diensten.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CNTstudios. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Privacybeleid
            </Link>
            <Link
              href="/voorwaarden"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Algemene Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
