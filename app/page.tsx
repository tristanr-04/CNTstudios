import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/section"
import { GlassCard, ServiceCard, TestimonialCard, CaseCard, PremiumCard } from "@/components/glass-card"
import { FadeIn, GlowOrb, GridBackground, GlowLine, MagneticButton, AnimatedBorder } from "@/components/animated-elements"
import { ArrowRight, Zap, Paintbrush, LineChart, Layout, Check, X, AlertTriangle, ArrowUpRight } from "lucide-react"

export default function Home() {
  return (
    <>
      {/* Hero Section - Ultra Premium */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
        <GridBackground className="opacity-100" />
        
        {/* Animated Glow Orbs */}
        <GlowOrb className="top-0 left-1/4 -translate-y-1/2" size="xl" color="primary" intensity="high" />
        <GlowOrb className="bottom-0 right-1/4 translate-y-1/2" size="xl" color="accent" intensity="medium" />
        <GlowOrb className="top-1/2 right-0 translate-x-1/2 -translate-y-1/2" size="lg" color="mixed" intensity="low" />
        
        {/* Noise texture for premium feel */}
        <div className="absolute inset-0 noise-overlay" />
        
        <div className="container mx-auto px-6 py-24 md:py-28 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Headline */}
            <FadeIn delay={0} distance={60}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
              Websites die presteren.
                <br />
                <span className="text-gradient">Niet alleen bestaan.</span>
              </h1>
            </FadeIn>
            
            {/* Subheadline */}
            <FadeIn delay={150} distance={40}>
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              Wij ontwerpen en optimaliseren digitale ervaringen die{" "}
                <span className="text-foreground font-medium">vertrouwen opbouwen en converteren.</span>.
              </p>
            </FadeIn>
            
            {/* CTA Buttons */}
            <FadeIn delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <MagneticButton>
                  <Button asChild size="lg" className="text-lg px-10 py-7 glow-primary hover:glow-accent transition-all duration-500 rounded-xl">
                    <Link href="/contact">
                      Gratis Website Analyse
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button asChild variant="outline" size="lg" className="text-lg px-10 py-7 rounded-xl border-border/80 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500">
                    <Link href="/cases">
                      Bekijk ons werk
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Gradient Line Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <GlowLine />
        </div>
      </section>

      {/* Problem Section */}
      <Section className="relative pt-12 md:pt-16" size="sm">
        <GlowOrb className="top-1/2 -left-48 -translate-y-1/2" size="lg" color="accent" intensity="low" />
        
        <SectionHeader 
          badge="Het Probleem"
          title="Waarom de meeste websites falen"
          description="Veel bedrijven investeren in een mooie website, maar verliezen dagelijks klanten door deze veelgemaakte fouten."
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          <FadeIn delay={0}>
            <PremiumCard className="h-full border-destructive/20 hover:border-destructive/40">
              <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Geen Conversie Focus</h3>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-destructive font-semibold">70%</span> van de websites mist duidelijke call-to-actions. Bezoekers weten niet wat ze moeten doen.
              </p>  
            </PremiumCard>
          </FadeIn>
          <FadeIn delay={100}>
            <PremiumCard className="h-full border-destructive/20 hover:border-destructive/40">
              <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Slechte UX</h3>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-destructive font-semibold">88%</span> van de online bezoekers keert niet terug na een slechte gebruikerservaring. Verwarrende navigatie kost klanten.
              </p>
            </PremiumCard>
          </FadeIn>
          <FadeIn delay={200}>
            <PremiumCard className="h-full border-destructive/20 hover:border-destructive/40">
              <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Trage Laadtijd</h3>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-destructive font-semibold">53%</span> van bezoekers verlaat een website die langer dan 3 seconden laadt. Elke seconde vertraging kost je conversie.
              </p>
            </PremiumCard>
          </FadeIn>
        </div>
      </Section>

      {/* Before vs After */}
      <Section className="relative overflow-hidden" size="sm">
        <GridBackground className="opacity-50" variant="dots" />
        <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="xl" color="mixed" intensity="low" />
        
        <SectionHeader 
          badge="Transformatie"
          title="Van probleem naar resultaat"
          description="Ontdek hoe wij websites transformeren van underperformers naar conversie-machines."
        />
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <FadeIn direction="left" distance={60}>
            <PremiumCard className="h-full border-destructive/30 hover:border-destructive/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-destructive/20 border border-destructive/30 flex items-center justify-center">
                  <X className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Voor CNTstudios</h3>
                  <p className="text-sm text-muted-foreground">De oude situatie</p>
                </div>
              </div>
              <ul className="space-y-5">
                {[
                  "Trage laadtijden (+5 seconden)",
                  "Verouderd en onaantrekkelijk design",
                  "Verwarrende navigatie structuur",
                  "Onduidelijke call-to-actions",
                  "Niet geoptimaliseerd voor mobiel",
                  "Lage conversieratio (<1%)",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </PremiumCard>
          </FadeIn>
          
          <FadeIn direction="right" distance={60}>
            <PremiumCard variant="gradient" className="h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Na CNTstudios</h3>
                  <p className="text-sm text-muted-foreground">De transformatie</p>
                </div>
              </div>
              <ul className="space-y-5">
                {[
                  "Bliksemsnelle laadtijden (<2 seconden)",
                  "Premium, modern design dat vertrouwen wekt",
                  "Intuïtieve gebruikerservaring",
                  "Strategisch geplaatste CTA's",
                  "100% responsive en mobile-first",
                  "Conversieratio verhoging tot +300%",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 text-foreground/90">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </PremiumCard>
          </FadeIn>
        </div>
      </Section>

      {/* Services Preview */}
      <Section className="relative" size="sm">
        <GlowOrb className="top-0 right-0 -translate-y-1/2 translate-x-1/2" size="lg" color="primary" intensity="medium" />
        
        <SectionHeader 
          className="mb-10"
          title="Alles voor een converterende website"
          description="Van redesign tot optimalisatie - wij zorgen ervoor dat jouw website daadwerkelijk resultaat oplevert."
        />
        
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          <FadeIn delay={0}>
            <ServiceCard 
              icon={<Paintbrush className="w-6 h-6" />}
              title="Website Redesign"
              description="Complete visuele transformatie naar een modern, premium design dat vertrouwen opbouwt."
              features={["Modern design", "Brand consistency", "Mobile-first"]}
            />
          </FadeIn>
          <FadeIn delay={100}>
            <ServiceCard 
              icon={<LineChart className="w-6 h-6" />}
              title="Conversie Optimalisatie"
              description="Data-gedreven aanpassingen die bezoekers omzetten naar betalende klanten."
              features={["A/B testing", "CTA optimalisatie", "Funnel analyse"]}
            />
          </FadeIn>
          <FadeIn delay={200}>
            <ServiceCard 
              icon={<Zap className="w-6 h-6" />}
              title="Performance"
              description="Razendsnelle laadtijden die bounce rates verlagen en SEO verbeteren."
              features={["Core Web Vitals", "Code optimalisatie", "CDN setup"]}
            />
          </FadeIn>
          <FadeIn delay={300}>
            <ServiceCard 
              icon={<Layout className="w-6 h-6" />}
              title="UX/UI Verbeteringen"
              description="Intuïtieve gebruikerservaringen die bezoekers moeiteloos door je website leiden."
              features={["User research", "Wireframing", "Usability testing"]}
            />
          </FadeIn>
        </div>
        
        <FadeIn delay={400}>
          <div className="text-center mt-10">
            <MagneticButton>
              <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl">
                <Link href="/diensten">
                  Alle diensten bekijken
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </MagneticButton>
          </div>
        </FadeIn>
      </Section>

      {/* Ons werk — preview */}
      <Section className="relative" size="sm">
        <GridBackground className="opacity-30" variant="cross" />
        <GlowOrb className="bottom-0 left-1/4" size="lg" color="accent" intensity="low" />
        
        <SectionHeader 
          title="Voorbeelden van ons werk"
          description="Bekijk hoe wij websites transformeren naar moderne, converterende ervaringen."
        />
        
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          <FadeIn delay={0}>
            <CaseCard 
              title="Demo 1"
              category="Timmerman"
              images={[
                "/cases/demo-4-timmerman.png",
                "/cases/demo-4-timmerman-2.png",
                "/cases/demo-4-timmerman-3.png",
              ]}
              results={[
                { label: "projecten", value: "1360+" },
                { label: "rating", value: "4.9/5" },
              ]}
            />
          </FadeIn>
          <FadeIn delay={100}>
            <CaseCard 
              title="Demo 2"
              category="Barbershop"
              images={[
                "/cases/demo-2-barbershop-2.png",
                "/cases/demo-2-barbershop.png",
                "/cases/demo-2-barbershop-3.png",
              ]}
              results={[
                { label: "omzet", value: "+89%" },
                { label: "bounce", value: "-45%" },
              ]}
            />
          </FadeIn>
          <FadeIn delay={200}>
            <CaseCard 
              title="Demo 3"
              category="Boekhouder"
              images={[
                "/cases/demo-5-boekhouder.png",
                "/cases/demo-5-boekhouder-2.png",
                "/cases/demo-5-boekhouder-3.png",
              ]}
              results={[
                { label: "aanvragen", value: "+41%" },
                { label: "laadtijd", value: "2.3s" },
              ]}
            />
          </FadeIn>
        </div>

        <FadeIn delay={300}>
          <div className="text-center mt-10">
            <MagneticButton>
              <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl">
                <Link href="/cases">
                  Al ons werk bekijken
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </MagneticButton>
          </div>
        </FadeIn>
      </Section>

      {/* Testimonials */}
      <Section className="relative" size="sm">
        <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="xl" color="primary" intensity="low" />
        
        <SectionHeader 
          badge="Testimonials"
          title="Wat onze klanten zeggen"
          description="Ontdek waarom bedrijven kiezen voor CNTstudios."
        />
        
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          <FadeIn delay={0}>
            <TestimonialCard 
              quote="Onze conversie is met 67% gestegen sinds de redesign. Het team van CNTstudios begrijpt echt wat werkt."
              author="Martijn de Vries"
              company="TechStart B.V."
              role="CEO"
            />
          </FadeIn>
          <FadeIn delay={100}>
            <TestimonialCard 
              quote="De snelheid van onze website is dramatisch verbeterd. Klanten complimenteren ons nu over de gebruikerservaring."
              author="Lisa Jansen"
              company="ModaHuis"
              role="Marketing Director"
            />
          </FadeIn>
          <FadeIn delay={200}>
            <TestimonialCard 
              quote="Professioneel, snel en resultaatgericht. CNTstudios levert precies wat ze beloven."
              author="Thomas Bakker"
              company="FinanceFlow"
              role="Founder"
            />
          </FadeIn>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="relative pb-16 md:pb-20" size="sm">
        <div className="relative max-w-5xl mx-auto">
          <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="xl" color="mixed" intensity="high" />
          
          <FadeIn>
            <AnimatedBorder className="rounded-3xl">
              <div className="glass-strong rounded-3xl text-center py-20 md:py-28 px-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-30">
                  <GridBackground variant="dots" />
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-balance">
                    Klaar om je website te{" "}
                    <span className="text-gradient">transformeren?</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                    Vraag een gratis website analyse aan en ontdek precies waar jouw website klanten verliest.
                  </p>
                  <MagneticButton>
                    <Button asChild size="lg" className="text-lg px-12 py-7 glow-primary hover:glow-accent transition-all duration-500 rounded-xl">
                      <Link href="/contact">
                        Gratis Analyse Aanvragen
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </Link>
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </AnimatedBorder>
          </FadeIn>
        </div>
      </Section>
    </>
  )
}
