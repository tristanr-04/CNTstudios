import type { Metadata } from "next"
import Link from "next/link"
import { unstable_noStore as noStore } from "next/cache"
import { redirect } from "next/navigation"
import { getPortalSessionFromCookies } from "@/lib/portal-session"
import { hasDemoSite } from "@/lib/demo-site"
import { GlassCard } from "@/components/glass-card"
import { GridBackground, GlowOrb } from "@/components/animated-elements"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

type Props = { params: Promise<{ slug: string }> }

/** Geen cache op URL alleen: anders CDN “redirect ↔ portal”-loops met/out cookie. */
export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Testomgeving | ${slug}`,
    robots: { index: false, follow: false },
  }
}

export default async function PortalSlugPage({ params }: Props) {
  noStore()
  const { slug } = await params
  const session = await getPortalSessionFromCookies()
  if (!session) {
    redirect(`/login?next=${encodeURIComponent(`/portal/${slug}`)}`)
  }
  if (session.slug !== slug) {
    redirect(`/portal/${session.slug}`)
  }

  const demoReady = await hasDemoSite(slug)
  const demoBasePath = `/portal/${slug}/d/`

  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-28 pb-16 px-6">
      <GridBackground />
      <GlowOrb className="top-1/3 -left-32" size="lg" color="accent" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">CNTstudios · klantenportaal</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Welkom,{" "}
            <span className="text-gradient-static">{session.username}</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            {demoReady
              ? "Hieronder staat jouw demo. Alleen ingelogd met jouw account is deze te bekijken."
              : `Dit is jouw testomgeving. Zet bestanden in de map demo/${slug}/ (o.a. index.html) om hier een preview te tonen.`}
          </p>
        </div>

        {demoReady ? (
          <div className="rounded-xl border border-border/60 bg-card/40 overflow-hidden glow-sm min-h-[min(75dvh,820px)]">
            <iframe
              title={`Demo ${slug}`}
              src={demoBasePath}
              className="w-full h-[min(75dvh,820px)] border-0 bg-background"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
        ) : (
          <GlassCard hover={false} className="glow-sm">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Slug:</strong> <code className="text-primary">{slug}</code>
              <br />
              <span className="mt-2 block">
                Map in het project: <code className="text-primary">demo/{slug}/</code> met een{" "}
                <code className="text-primary">index.html</code>. Gebruik relatieve paden (bijv.{" "}
                <code className="text-primary">./style.css</code>) zodat alles onder{" "}
                <code className="text-primary">{demoBasePath}</code> blijft werken.
              </span>
            </p>
          </GlassCard>
        )}

        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild variant="outline">
            <Link href="/">Naar website</Link>
          </Button>
          <form action="/api/portal/logout" method="post">
            <Button type="submit" variant="secondary" className="gap-2">
              <LogOut className="h-4 w-4" />
              Uitloggen
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
