"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Section } from "@/components/section"
import { GlassCard } from "@/components/glass-card"
import { FadeIn, GlowOrb, GridBackground } from "@/components/animated-elements"
import { cn } from "@/lib/utils"
import { SITE_CONTACT_EMAIL, SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from "@/lib/site-contact"
import { ArrowRight, MessageSquare, Check, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    websiteType: "",
    website: "",
    bericht: "",
    formHp: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }

      if (!res.ok) {
        setSubmitError(
          data.error ??
            "Versturen is mislukt. Mail ons op " + SITE_CONTACT_EMAIL + " of bel " + SITE_PHONE_DISPLAY + ".",
        )
        return
      }

      setIsSubmitted(true)
    } catch {
      setSubmitError(
        "Geen verbinding met de server. Probeer het opnieuw of mail naar " + SITE_CONTACT_EMAIL + ".",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-28 md:pb-14 overflow-hidden">
        <GridBackground />
        <GlowOrb className="top-1/3 -left-32" size="lg" color="primary" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-balance">
                Ontdek wat jouw website{" "}
                <span className="text-gradient">je kost.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                Vraag een gratis analyse aan en krijg inzicht in waar jouw website kansen laat liggen en hoe je dit kunt verbeteren.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <Section className="pt-0">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <FadeIn>
              <GlassCard className="glow-sm">
                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Bedankt voor je aanvraag!</h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      We hebben je aanvraag ontvangen. Binnen 1 week plannen we je gratis analyse en nemen we persoonlijk contact met je op.
                    </p>
                    <Button asChild variant="outline">
                      <Link href="/">
                        Terug naar home
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 pb-2 border-b border-border/40">
                      <p className="text-sm font-semibold text-foreground">
                        Binnen 24 uur persoonlijk contact
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Vul het formulier in en wij nemen contact met je op met concrete verbeterpunten en advies op maat.
                      </p>
                    </div>

                    {submitError ? (
                      <p className="text-sm text-destructive text-center" role="alert">
                        {submitError}
                      </p>
                    ) : null}

                    <div
                      className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden opacity-0 pointer-events-none"
                      aria-hidden="true"
                    >
                      <label htmlFor="formHp">Laat dit veld leeg</label>
                      <input
                        id="formHp"
                        name="formHp"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.formHp}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="naam" className="block text-sm font-medium mb-2">
                        Naam <span className="text-primary">*</span>
                      </label>
                      <Input
                        id="naam"
                        name="naam"
                        type="text"
                        required
                        maxLength={200}
                        placeholder="Jouw naam"
                        value={formData.naam}
                        onChange={handleChange}
                        className="bg-secondary border-border/50 focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        E-mailadres <span className="text-primary">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={254}
                        placeholder="jouw@email.nl"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-secondary border-border/50 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="websiteType" className="block text-sm font-medium mb-2">
                        Wat voor website heb je? <span className="text-primary">*</span>
                      </label>
                      <select
                        id="websiteType"
                        name="websiteType"
                        required
                        value={formData.websiteType}
                        onChange={handleChange}
                        className={cn(
                          "h-9 w-full rounded-md border bg-secondary px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
                          "border-border/50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                          "text-foreground",
                        )}
                      >
                        <option value="" disabled>
                          Kies een optie
                        </option>
                        <option value="geen">Ik heb nog geen website</option>
                        <option value="bestaand">Ik heb al een website</option>
                        <option value="verbeteren">Ik wil mijn website verbeteren</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-sm font-medium mb-2">
                        Website-URL{" "}
                        <span className="text-muted-foreground text-xs font-normal">(optioneel)</span>
                      </label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        maxLength={2048}
                        placeholder="https://jouwwebsite.nl"
                        value={formData.website}
                        onChange={handleChange}
                        className="bg-secondary border-border/50 focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bericht" className="block text-sm font-medium mb-2">
                        Bericht <span className="text-muted-foreground text-xs">(optioneel)</span>
                      </label>
                      <Textarea
                        id="bericht"
                        name="bericht"
                        rows={4}
                        maxLength={8000}
                        placeholder="Vertel ons meer over je website en wat je wilt bereiken..."
                        value={formData.bericht}
                        onChange={handleChange}
                        className="bg-secondary border-border/50 focus:border-primary resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full glow-primary hover:glow-accent transition-shadow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Verzenden...
                        </>
                      ) : (
                        <>
                          Vraag een gratis analyse aan
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </GlassCard>
            </FadeIn>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={100}>
              <GlassCard>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold mb-3">Wat je van ons krijgt:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {[
                        "Inzicht in wat er niet werkt op je website",
                        "Concrete verbeterpunten",
                        "Advies welk pakket het beste bij je past",
                        "Duidelijke vervolgstappen",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
            
            <FadeIn delay={200}>
              <GlassCard>
                <h3 className="font-semibold mb-4">Dit analyseren we:</h3>
                <ul className="space-y-3">
                  {[
                    "Snelheid en performance",
                    "Structuur en gebruiksvriendelijkheid",
                    "Conversie en call-to-actions",
                    "Mobiele ervaring",
                    "Basis SEO",
                    "Visuele uitstraling",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </FadeIn>
            
            <FadeIn delay={300}>
              <GlassCard>
                <h3 className="font-semibold mb-4">Direct contact?</h3>
                <a
                  href={`tel:${SITE_PHONE_E164.replace(/\s/g, "")}`}
                  className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {SITE_PHONE_DISPLAY}
                </a>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="relative bg-card/30">
        <GlowOrb className="-right-32 top-1/2 -translate-y-1/2" size="lg" color="accent" />
        
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
              Veelgestelde vragen
            </h2>
          </FadeIn>
          
          <div className="space-y-6">
            {[
              {
                q: "Is de website analyse echt gratis?",
                a: "Ja, de eerste analyse is volledig gratis en vrijblijvend. Je krijgt concrete inzichten en verbeterpunten die je direct kunt toepassen.",
              },
              {
                q: "Hoe lang duurt het voordat ik iets hoor?",
                a: "We nemen binnen 24 uur contact met je op om de resultaten van de analyse te bespreken en je vragen te beantwoorden.",
              },
              {
                q: "Wat kost een website bij jullie?",
                a: "Onze prijzen starten vanaf €449,-. Afhankelijk van jouw wensen maken we een voorstel op maat.",
              },
              {
                q: "Hoe lang duurt het bouwen van een website?",
                a: "In veel gevallen kun je binnen 2 weken live. De exacte planning hangt af van de omvang en je wensen.",
              },
            ].map((faq, index) => (
              <FadeIn key={index} delay={index * 100}>
                <GlassCard>
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
