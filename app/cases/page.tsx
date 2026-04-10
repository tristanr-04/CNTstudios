import Link from "next/link"
import { Fragment } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"
import { GlassCard } from "@/components/glass-card"
import { FadeIn, GlowOrb, GridBackground } from "@/components/animated-elements"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ArrowRight, Eye, Layout, MousePointerClick, Shield, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Ons werk | CNTstudios",
  description:
    "Voorbeeldprojecten: websites ontwerpen en verbeteren met focus op structuur, snelheid en conversie. Geen standaardtemplates.",
}

const cases = [
  {
    id: "demo-1",
    title: "Timmerman: vertrouwen, portfolio en contact",
    category: "Ambacht",
    beforeImage: "/cases/demo-4-timmerman.png",
    images: [
      "/cases/demo-4-timmerman.png",
      "/cases/demo-4-timmerman-2.png",
      "/cases/demo-4-timmerman-3.png",
    ],
    description: "Warme uitstraling, helder aanbod, rustige route naar contact.",
    challenge: "Te algemeen: bezoekers zagen niet snel wat jullie doen of wat de volgende stap is.",
    solution: "Strakkere structuur, duidelijke werksecties, één hoofdactie. Rustige typografie en vaste beeldtaal.",
    results: [
      {
        value: "Duidelijk verhaal",
        label: "Sneller zichtbaar wie jullie zijn en wat er te doen is.",
        icon: <Eye className="w-5 h-5" />,
      },
      {
        value: "Vertrouwen",
        label: "Portfolio en opbouw geven een rustige, professionele indruk.",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        value: "Betere flow",
        label: "Info en contact liggen logisch bij elkaar.",
        icon: <Layout className="w-5 h-5" />,
      },
    ],
    testimonial: {
      quote: "Veel duidelijker en professioneler. Je ziet direct wat we doen.",
      author: "Ondernemer",
      role: "",
    },
  },
  {
    id: "demo-2",
    title: "Barbershop: afspraken en uitstraling",
    category: "Retail & dienst",
    beforeImage: "/cases/demo-2-barbershop-2.png",
    images: [
      "/cases/demo-2-barbershop-2.png",
      "/cases/demo-2-barbershop.png",
      "/cases/demo-2-barbershop-3.png",
    ],
    description: "Premium uitstraling, diensten in één oogopslag, duidelijke route naar boeken.",
    challenge: "Onrustige opbouw: ‘afspraak maken’ was niet de vanzelfsprekende vervolgstap.",
    solution: "Eén hoofdlijn, rust in het grid, herkenbare patronen voor prijzen en de belangrijkste actie.",
    results: [
      {
        value: "Overzicht",
        label: "Minder afleiding, sneller begrip van wat er mogelijk is.",
        icon: <Layout className="w-5 h-5" />,
      },
      {
        value: "Uitstraling",
        label: "Typografie en stijl passen bij een premium salon.",
        icon: <Sparkles className="w-5 h-5" />,
      },
      {
        value: "Duidelijke actie",
        label: "Boeken blijft herkenbaar, zonder opdringerige druk.",
        icon: <MousePointerClick className="w-5 h-5" />,
      },
    ],
    testimonial: {
      quote: "De website voelt rustiger en overzichtelijker.",
      author: "Lokale ondernemer",
      role: "",
    },
  },
  {
    id: "demo-3",
    title: "Boekhoudkantoor: helderheid en autoriteit",
    category: "Zakelijke dienst",
    beforeImage: "/cases/demo-5-boekhouder.png",
    images: [
      "/cases/demo-5-boekhouder.png",
      "/cases/demo-5-boekhouder-2.png",
      "/cases/demo-5-boekhouder-3.png",
    ],
    description: "Rustige zakelijke uitstraling, transparant aanbod, duidelijke route naar contact.",
    challenge: "Pakketten en diensten waren lastig te vergelijken; te veel denkwerk vóór contact.",
    solution: "Heldere opbouw per dienst en pakket, rustige kleuren, duidelijke contactpunten.",
    results: [
      {
        value: "Helder aanbod",
        label: "Sneller te begrijpen wat jullie doen en voor wie, zonder ruis.",
        icon: <Eye className="w-5 h-5" />,
      },
      {
        value: "Autoriteit",
        label: "Strak en consistent: past bij een betrouwbaar kantoor.",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        value: "Contact",
        label: "Eén duidelijke plek voor een vraag of kennismaking.",
        icon: <MousePointerClick className="w-5 h-5" />,
      },
    ],
    testimonial: {
      quote: "Strakke uitstraling en duidelijke structuur.",
      author: "ZZP’er",
      role: "",
    },
  },
  {
    id: "demo-4",
    title: "Loodgieter: duidelijkheid en bereikbaarheid",
    category: "Installatie & service",
    beforeImage: "/cases/demo-1-broyeur.png",
    images: [
      "/cases/demo-1-broyeur.png",
      "/cases/demo-1-broyeur-2.png",
      "/cases/demo-1-broyeur-3.png",
    ],
    description: "Directe boodschap, herkenbare diensten, snelle route naar bellen of appen.",
    challenge: "Belangrijkste info zat verstopt; de eerste indruk was niet scherp genoeg voor spoed en bereikbaarheid.",
    solution: "Sterke hero, scanbare diensten, vaste contactmomenten. Strak vormgegeven, zodat vertrouwen en snelheid samengaan.",
    results: [
      {
        value: "Meteen duidelijk",
        label: "Bezoekers zien wat jullie oplossen en hoe ze contact opnemen.",
        icon: <Eye className="w-5 h-5" />,
      },
      {
        value: "Betrouwbaar",
        label: "Rustige, professionele opmaak die past bij werk aan huis.",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        value: "Mobiel",
        label: "Overzichtelijk op de telefoon: bellen of appen voelt logisch.",
        icon: <Layout className="w-5 h-5" />,
      },
    ],
    testimonial: {
      quote: "Past bij hoe wij werken: rustig, maar wel duidelijk.",
      author: "ZZP’er",
      role: "",
    },
  },
  {
    id: "demo-5",
    title: "Dakdekker: regio, werk en contact",
    category: "Bouw & onderhoud",
    beforeImage: "/cases/demo-3-dakdekker.png",
    images: [
      "/cases/demo-3-dakdekker.png",
      "/cases/demo-3-dakdekker-2.png",
      "/cases/demo-3-dakdekker-3.png",
    ],
    description: "Duidelijke diensten, vertrouwen in vakmanschap, eenvoudige route naar aanvraag.",
    challenge: "Kernboodschap te diffuus: te lang zoeken naar wat, waar en hoe een aanvraag werkt.",
    solution: "Opbouw per dienst, korte USP’s, mobiel-vriendelijke flow en consistente knoppen.",
    results: [
      {
        value: "Positionering",
        label: "Regio, aanbod en werkwijze sneller te scannen.",
        icon: <Eye className="w-5 h-5" />,
      },
      {
        value: "Vertrouwen",
        label: "Beeld en structuur ondersteunen vakwerk en duidelijke afspraken.",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        value: "Gebruiksgemak",
        label: "Minder frictie op klein scherm.",
        icon: <Sparkles className="w-5 h-5" />,
      },
    ],
    testimonial: {
      quote: "Professioneler. Je snapt meteen waar we voor staan.",
      author: "Ondernemer",
      role: "",
    },
  },
]

export default function OnsWerkPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-28 md:pb-14 overflow-hidden">
        <GridBackground />
        <GlowOrb className="top-1/3 -left-32" size="lg" color="primary" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-balance">
              Van idee{" "}
                <span className="text-gradient">naar resultaat</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={100}>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                Websites ontwerpen en verbeteren: structuur, snelheid, conversie.
              </p>
            </FadeIn>
            <FadeIn delay={180}>
              <p className="text-sm text-muted-foreground/90 mt-4 max-w-xl">
                Geen standaardtemplates. Elk ontwerp is gericht op resultaat.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Ons werk: grid, minder padding onder (dichter bij CTA) */}
      <Section className="relative pb-6 md:pb-10">
        <GlowOrb className="top-1/4 -right-32" size="lg" color="accent" />
        <GlowOrb className="bottom-1/4 -left-32" size="lg" color="primary" />
        
        <div className="space-y-14 md:space-y-16">
          {cases.map((caseItem, index) => (
            <Fragment key={caseItem.id}>
              <FadeIn delay={index % 2 === 0 ? 0 : 100}>
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <GlassCard className="aspect-video flex items-center justify-center glow-sm overflow-hidden">
                    {caseItem.images?.length ? (
                      caseItem.images.length === 1 ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={caseItem.images[0]}
                            alt={`Voorbeeld ${caseItem.title}`}
                            fill
                            quality={100}
                            className="object-cover object-top"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent pointer-events-none" />
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <Carousel opts={{ loop: true }} className="absolute inset-0 h-full">
                            <CarouselContent className="h-full" contentClassName="h-full ml-0">
                              {caseItem.images.map((src, i) => (
                                <CarouselItem key={`${caseItem.id}-${i}-${src}`} className="h-full pl-0">
                                  <div className="relative h-full w-full">
                                    <Image
                                      src={src}
                                      alt={`Screenshot ${i + 1} van ${caseItem.title}`}
                                      fill
                                      quality={100}
                                      className="object-cover object-top"
                                      sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>

                            <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 bg-background/40 backdrop-blur-sm border-border/50 hover:bg-background/60" />
                            <CarouselNext className="right-3 top-1/2 -translate-y-1/2 bg-background/40 backdrop-blur-sm border-border/50 hover:bg-background/60" />
                          </Carousel>

                          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent pointer-events-none" />
                        </div>
                      )
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold text-primary/30 mb-2">{caseItem.title}</div>
                        <div className="text-muted-foreground text-sm">{caseItem.category}</div>
                      </div>
                    )}
                  </GlassCard>
                </div>
                
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">
                    {caseItem.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-2 mb-4">
                    {caseItem.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {caseItem.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        De Uitdaging
                      </h4>
                      <p className="text-foreground/80">{caseItem.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Onze Aanpak
                      </h4>
                      <p className="text-foreground/80">{caseItem.solution}</p>
                    </div>
                  </div>
                  
                  {/* Resultaat (kwalitatief) */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Resultaat
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {caseItem.results.map((result, i) => (
                        <div key={i} className="text-center p-4 bg-secondary rounded-xl">
                          <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            {result.icon}
                          </div>
                          <div className="text-base md:text-lg font-semibold text-gradient leading-snug">{result.value}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">{result.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial */}
                  <div className="p-4 bg-card rounded-xl border border-border/50">
                    <p className="text-foreground/80 italic mb-3">
                      &ldquo;{caseItem.testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0">
                        {caseItem.testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{caseItem.testimonial.author}</div>
                        {caseItem.testimonial.role ? (
                          <div className="text-xs text-muted-foreground">{caseItem.testimonial.role}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            </Fragment>
          ))}
        </div>
      </Section>

      {/* CTA: minder padding boven (dichter bij blok hierboven) */}
      <Section className="relative pt-6 md:pt-10">
        <div className="relative max-w-4xl mx-auto">
          <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70" size="lg" color="primary" />
          <FadeIn>
            <GlassCard className="text-center py-12 md:py-16 glow-sm">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
                Klaar om jouw website naar een{" "}
                <span className="text-gradient">hoger niveau</span> te tillen?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
                Vraag een gratis analyse aan en ontdek waar jouw website beter kan.
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
