import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/section"
import { GlassCard } from "@/components/glass-card"
import { FadeIn, GlowOrb, GridBackground } from "@/components/animated-elements"
import { ArrowRight, Target, Eye, Sparkles, Zap, Award, Layers, ListOrdered } from "lucide-react"

export const metadata: Metadata = {
  title: "Over Ons | CNTstudios",
  description:
    "CNTstudios bouwt en verbetert websites die klanten opleveren. Ontdek onze missie, werkwijze en waarden.",
}

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Resultaatgericht",
    description: "Alles wat we doen is gericht op groei en duidelijke verbetering.",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Transparant",
    description: "Heldere communicatie en realistische verwachtingen.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Kwaliteit",
    description: "We leveren alleen werk waar we achter staan.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Efficiënt",
    description: "Snelle en duidelijke processen zonder onnodige vertraging.",
  },
]

export default function OverOnsPage() {
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
                Wij bouwen en verbeteren websites{" "}
                <span className="text-gradient">die klanten opleveren.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty mb-6">
                Geen standaard websites. Alleen oplossingen die bijdragen aan de groei van jouw bedrijf.
              </p>
            </FadeIn>

            <FadeIn delay={180}>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed text-pretty">
                <p>
                  CNTstudios is een digital agency dat websites ontwikkelt en optimaliseert met één doel: resultaat.
                </p>
                <p>
                  Of je nu een nieuwe website nodig hebt of je huidige website niet presteert, wij zorgen voor een moderne, snelle en conversiegerichte oplossing.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Story / Mission */}
      <Section className="relative">
        <GlowOrb className="-left-32 top-1/2 -translate-y-1/2" size="lg" color="accent" />
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Onze Missie
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>Te veel websites zien er goed uit, maar leveren niets op.</p>
                <p>
                  Bedrijven investeren in design, maar verliezen klanten door slechte structuur, trage laadtijden of onduidelijke communicatie.
                </p>
                <p>
                  Onze missie is simpel: websites bouwen en verbeteren die niet alleen goed ogen, maar ook werken.
                </p>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="right" delay={100}>
            <GlassCard className="glow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Onze Visie</h3>
                  <p className="text-sm text-muted-foreground">Waar we naartoe werken</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Een website moet geen visitekaartje zijn. Het moet bijdragen aan de groei van je bedrijf.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Wij geloven dat elke website meer klanten en vertrouwen kan opleveren, als het goed wordt aangepakt.
              </p>
            </GlassCard>
          </FadeIn>
        </div>
      </Section>

      {/* Values */}
      <Section className="relative bg-card/30">
        <GridBackground className="opacity-[0.01]" />
        <SectionHeader
          badge="Onze waarden"
          title="Waar wij voor staan"
          description="Hoe we samenwerken en wat je van ons mag verwachten."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <FadeIn key={value.title} delay={index * 100}>
              <GlassCard className="h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="relative bg-card/30">
        <GlowOrb className="-right-32 top-1/2 -translate-y-1/2" size="lg" color="accent" />
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <GlassCard className="glow-sm">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Resultaat boven design</h4>
                    <p className="text-muted-foreground text-sm">Een mooie website is niet genoeg. Het moet werken.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Bouwen en verbeteren</h4>
                    <p className="text-muted-foreground text-sm">Of je nu start of al een website hebt, wij zorgen dat het beter wordt.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <ListOrdered className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Duidelijke aanpak</h4>
                    <p className="text-muted-foreground text-sm">Geen ingewikkelde trajecten, maar heldere stappen.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Snelle oplevering</h4>
                    <p className="text-muted-foreground text-sm">We werken efficiënt en doelgericht.</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
          
          <FadeIn direction="right" delay={100}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Waarom bedrijven kiezen voor CNTstudios
              </h2>
              <h3 className="text-lg font-semibold tracking-tight mb-4">Hoe wij werken</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-primary font-medium shrink-0">1.</span>
                  <span>Analyse van jouw situatie</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium shrink-0">2.</span>
                  <span>Strategie en structuur</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium shrink-0">3.</span>
                  <span>Design en ontwikkeling</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium shrink-0">4.</span>
                  <span>Optimalisatie en groei</span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* CTA */}
      <Section className="relative">
        <div className="relative max-w-4xl mx-auto">
          <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70" size="lg" color="primary" />
          <FadeIn>
            <GlassCard className="text-center py-12 md:py-16 glow-sm">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
                Klaar om meer uit je website te halen?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
                Of je nu wilt starten of verbeteren, wij helpen je naar een website die werkt.
              </p>
              <Button asChild size="lg" className="glow-primary hover:glow-accent transition-shadow text-base px-8">
                <Link href="/contact">
                  Vraag een gratis analyse aan
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
