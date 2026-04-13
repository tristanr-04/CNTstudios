import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getPortalSessionFromCookies } from "@/lib/portal-session"
import { GlassCard } from "@/components/glass-card"
import { GridBackground, GlowOrb } from "@/components/animated-elements"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Testomgeving | ${slug}`,
    robots: { index: false, follow: false },
  }
}

export default async function PortalSlugPage({ params }: Props) {
  const { slug } = await params
  const session = await getPortalSessionFromCookies()
  if (!session || session.slug !== slug) {
    redirect(`/login?next=${encodeURIComponent(`/portal/${slug}`)}`)
  }

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
            Dit is jouw testomgeving. Hier komt straks je testwebsite of preview — die kunnen we
            koppelen aan een eigen URL of embed.
          </p>
        </div>

        <GlassCard hover={false} className="glow-sm">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Slug:</strong> <code className="text-primary">{slug}</code>
            <br />
            <span className="mt-2 block">
              Nog geen live preview? Neem contact op, dan zetten we jouw demo hier neer.
            </span>
          </p>
        </GlassCard>

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
