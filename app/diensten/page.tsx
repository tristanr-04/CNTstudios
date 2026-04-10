import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/section"
import { GlassCard } from "@/components/glass-card"
import { FadeIn, GlowOrb, GridBackground } from "@/components/animated-elements"
import { 
  ArrowRight, 
  Check,
  Paintbrush,
  Sparkles,
  Target,
  Gauge,
  MousePointerClick
} from "lucide-react"

export const metadata: Metadata = {
  title: "Diensten | CNTstudios",
  description: "Website redesign, conversie optimalisatie, performance verbetering en UX/UI design. Ontdek hoe wij jouw website transformeren.",
}

const process = [
  {
    step: "01",
    icon: <Target className="w-6 h-6" />,
    title: "Analyse",
    description: "We kijken naar jouw situatie: heb je al een website of begin je vanaf nul? Je krijgt direct inzicht in wat beter kan en wat nodig is.",
  },
  {
    step: "02",
    icon: <Sparkles className="w-6 h-6" />,
    title: "Keuze & Strategie",
    description: "Je kiest het pakket dat bij jouw bedrijf past. Wij bepalen de structuur, indeling en aanpak voor maximale impact.",
  },
  {
    step: "03",
    icon: <Paintbrush className="w-6 h-6" />,
    title: "Design & Development",
    description: "We bouwen een moderne, snelle website die vertrouwen uitstraalt en klanten oplevert.",
  },
  {
    step: "04",
    icon: <Gauge className="w-6 h-6" />,
    title: "Livegang & Groei",
    description: "Je website gaat live. Met onze abonnementen zorgen we dat alles snel, veilig en up-to-date blijft en blijven we optimaliseren waar nodig.",
  },
]

export default function DienstenPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-28 md:pb-14 overflow-hidden">
        <GridBackground />
        <GlowOrb className="top-1/3 -right-32" size="lg" color="primary" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-balance">
              Van website naar{" "}
                <span className="text-gradient">groeimachine</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={100}>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                Van redesign tot optimalisatie. Wij zorgen ervoor dat jouw website daadwerkelijk resultaat oplevert. Elke dienst is gericht op meetbare groei.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <Section className="relative pt-12 md:pt-16" size="sm">
        <GridBackground className="opacity-[0.02]" variant="dots" />
        <GlowOrb className="top-0 -left-32" size="lg" color="primary" intensity="low" />
        <GlowOrb className="bottom-0 -right-32" size="lg" color="accent" intensity="low" />

        <SectionHeader
          className="mb-12 md:mb-16"
          title="Hoe wij werken"
          description="Een bewezen aanpak voor consistente, meetbare resultaten."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10 md:mb-12">
          {process.map((item, index) => (
            <FadeIn key={item.step} delay={index * 100}>
              <GlassCard className="h-full relative">
                <div className="absolute -top-4 -left-2 text-6xl font-bold text-primary/10">
                  {item.step}
                </div>
                <div className="relative z-10 pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        <SectionHeader
          badge="Website pakketten"
          title="Websites die niet alleen mooi zijn, Maar klanten opleveren."
          description="Kies een pakket dat past bij je ambities. Wij bouwen premium websites met focus op conversie, snelheid en vertrouwen."
        />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          <FadeIn delay={0}>
            <GlassCard className="h-full glow-sm flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">ONE PAGE</div>
                  <div className="text-3xl font-bold mt-2">€449,-</div>
                  <div className="text-sm text-muted-foreground">eenmalig • excl. btw</div>
                </div>
              </div>

              <p className="text-muted-foreground mb-8">
                Perfect om professioneel online te starten.{" "}
                <span className="text-foreground/90">
                  Ideaal voor ondernemers die snel een sterke eerste indruk willen maken.
                </span>
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  "One-page website",
                  "Professioneel design",
                  "Responsive",
                  "Contactformulier",
                  "Basis SEO",
                  "Google-indexatie",
                  "SEO-teksten inbegrepen",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Button asChild className="w-full glow-sm hover:glow-primary transition-shadow">
                  <Link href="/contact">
                    Start jouw website
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={100}>
            <GlassCard className="h-full relative overflow-hidden border border-primary/40 glow-primary flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary mb-6">
                  <Sparkles className="w-4 h-4" />
                  Meest gekozen
                </div>

                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">POPULAR</div>
                    <div className="text-3xl font-bold mt-2">€549,-</div>
                    <div className="text-sm text-muted-foreground">eenmalig • excl. btw</div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-8">
                  Voor bedrijven die willen groeien.{" "}
                  <span className="text-foreground/90">
                    De perfecte balans tussen design, structuur en conversie.
                  </span>
                </p>

                <ul className="space-y-3 mb-10">
                  {[
                    "Tot 5 pagina’s",
                    "Custom design",
                    "Responsive",
                    "Contactformulieren",
                    "SEO",
                    "Uitbreidbaar",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto relative">
                <Button asChild className="w-full glow-primary hover:glow-accent transition-shadow">
                  <Link href="/contact">
                    Ga voor groei
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={200}>
            <GlassCard className="h-full glow-sm flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">PREMIUM</div>
                  <div className="text-3xl font-bold mt-2">€799,-</div>
                  <div className="text-sm text-muted-foreground">eenmalig • excl. btw</div>
                </div>
              </div>

              <p className="text-muted-foreground mb-8">
                Maximale impact en performance.{" "}
                <span className="text-foreground/90">
                  Voor bedrijven die hun website serieus willen inzetten als groeimachine.
                </span>
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  "Tot 10 pagina’s",
                  "Volledig custom design",
                  "Geavanceerde formulieren",
                  "SEO optimalisatie",
                  "Schaalbaar",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Button asChild variant="outline" className="w-full border-border/70 hover:border-primary/40 hover:bg-primary/5 transition-all">
                  <Link href="/contact">
                    Maximaliseer je resultaat
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        <FadeIn delay={250}>
          <div className="max-w-6xl mx-auto mt-10">
            <GlassCard className="glow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-sm font-semibold tracking-tight">Maatwerk</div>
                <div className="text-muted-foreground">Prijs op aanvraag</div>
              </div>
              <Button asChild className="glow-sm hover:glow-primary transition-shadow">
                <Link href="/contact">
                  Vraag een maatwerk offerte aan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </GlassCard>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="max-w-6xl mx-auto mt-10">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Wij denken met je mee
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Geen standaard oplossingen, maar websites die écht werken en resultaat opleveren.
              </p>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section className="relative bg-card/30">
        <GlowOrb className="top-1/3 -right-32" size="lg" color="primary" intensity="low" />

        <SectionHeader
          badge="Abonnementen"
          title="Abonnementen"
          description="Alles wat je nodig hebt voor een veilige, snelle website — met support wanneer je het nodig hebt."
        />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          <FadeIn delay={0}>
            <GlassCard className="h-full glow-sm flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">BASIC</div>
                  <div className="text-3xl font-bold mt-2">€39,-</div>
                  <div className="text-sm text-muted-foreground">per maand • excl. btw</div>
                </div>
              </div>
              <ul className="space-y-3 mb-10">
                {["Hosting", "SSL certificaat", "Dagelijkse back-ups", "Basis support"].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button asChild className="w-full glow-sm hover:glow-primary transition-shadow">
                  <Link href="/contact">
                    Start BASIC
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={100}>
            <GlassCard className="h-full relative overflow-hidden border border-primary/30 glow-primary flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary mb-6">
                  Meest gekozen
                </div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">PLUS</div>
                    <div className="text-3xl font-bold mt-2">€59,-</div>
                    <div className="text-sm text-muted-foreground">per maand • excl. btw</div>
                  </div>
                </div>
                <ul className="space-y-3 mb-10">
                  {["Alles van BASIC", "Updates & onderhoud", "Beveiliging", "Snelle support"].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto relative">
                <Button asChild className="w-full glow-primary hover:glow-accent transition-shadow">
                  <Link href="/contact">
                    Ga voor PLUS
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={200}>
            <GlassCard className="h-full glow-sm flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">PRO</div>
                  <div className="text-3xl font-bold mt-2">€79,-</div>
                  <div className="text-sm text-muted-foreground">per maand • excl. btw</div>
                </div>
              </div>
              <ul className="space-y-3 mb-10">
                {["Alles van PLUS", "Marketing ondersteuning", "Performance monitoring", "Prioriteit support"].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button asChild variant="outline" className="w-full border-border/70 hover:border-primary/40 hover:bg-primary/5 transition-all">
                  <Link href="/contact">
                    Kies PRO
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </Section>

      {/* CTA */}
      <Section className="relative">
        <div className="relative max-w-4xl mx-auto">
          <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70" size="lg" color="accent" />
          <FadeIn>
            <GlassCard className="text-center py-12 md:py-16 glow-sm">
              <MousePointerClick className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
                Welke dienst past bij jou?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
                Vraag een gratis analyse aan en ontdek precies wat jouw website nodig heeft voor betere resultaten.
              </p>
              <Button asChild size="lg" className="glow-primary hover:glow-accent transition-shadow text-base px-8">
                <Link href="/contact">
                  Gratis analyse aanvragen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </GlassCard>
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
