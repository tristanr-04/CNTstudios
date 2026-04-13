import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getPortalSessionFromCookies } from "@/lib/portal-session"
import { sanitizePortalNextParam } from "@/lib/portal-redirect"
import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Klanteninlog | CNTstudios",
  description: "Inloggen voor je testwebsite bij CNTstudios.",
  robots: { index: false, follow: false },
}

type SearchParams = Promise<{ next?: string }>

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const session = await getPortalSessionFromCookies()
  if (session) {
    const next = sanitizePortalNextParam(sp.next)
    if (next && next === `/portal/${session.slug}`) {
      redirect(next)
    }
    redirect(`/portal/${session.slug}`)
  }

  return <LoginForm />
}
