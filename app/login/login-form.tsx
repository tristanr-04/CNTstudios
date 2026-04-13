"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/glass-card"
import { GridBackground, GlowOrb } from "@/components/animated-elements"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string; redirect?: string }
      if (!res.ok) {
        setError(data.error ?? "Onjuiste gebruikersnaam of wachtwoord.")
        return
      }
      if (data.redirect) {
        router.push(data.redirect)
        router.refresh()
        return
      }
      setError("Onverwacht antwoord van de server.")
    } catch {
      setError("Geen verbinding. Probeer het opnieuw.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 pb-16 px-6">
      <GridBackground />
      <GlowOrb className="top-1/4 -right-24" size="lg" color="primary" />

      <GlassCard className="relative z-10 w-full max-w-md glow-sm" hover={false}>
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-bold tracking-tight mb-2">
            CNT<span className="text-gradient-static">studios</span>
          </Link>
          <p className="text-sm text-muted-foreground">Klantenportaal — testwebsite</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {error ? (
            <p className="text-sm text-destructive text-center" role="alert">
              {error}
            </p>
          ) : null}

          <div>
            <label htmlFor="portal-user" className="block text-sm font-medium mb-2">
              Gebruikersnaam
            </label>
            <Input
              id="portal-user"
              name="username"
              autoComplete="username"
              required
              maxLength={64}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-secondary border-border/50 focus:border-primary min-h-[44px] md:min-h-9"
            />
          </div>

          <div>
            <label htmlFor="portal-pass" className="block text-sm font-medium mb-2">
              Wachtwoord
            </label>
            <Input
              id="portal-pass"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              maxLength={256}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary border-border/50 focus:border-primary min-h-[44px] md:min-h-9"
            />
          </div>

          <Button
            type="submit"
            className="w-full min-h-[48px] glow-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Bezig…
              </>
            ) : (
              "Inloggen"
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          <Link href="/" className="underline underline-offset-4 hover:text-foreground">
            Terug naar website
          </Link>
        </p>
      </GlassCard>
    </section>
  )
}
