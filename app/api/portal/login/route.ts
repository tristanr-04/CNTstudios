import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { findPortalUser, getPortalUsers } from "@/lib/portal-users"
import { PORTAL_COOKIE_NAME, getPortalSessionSecret, signPortalJwt } from "@/lib/portal-jwt"
export const runtime = "nodejs"

const MAX_BODY = 4096

const AUTH_FAILED = "Onjuiste gebruikersnaam of wachtwoord."

async function authFailedResponse() {
  await new Promise((r) => setTimeout(r, 400))
  return NextResponse.json({ error: AUTH_FAILED }, { status: 401 })
}

export async function POST(request: Request) {
  if (!getPortalSessionSecret() || getPortalUsers().length === 0) {
    return authFailedResponse()
  }

  let text: string
  try {
    text = await request.text()
  } catch {
    return NextResponse.json({ error: "Kon de aanvraag niet uitlezen." }, { status: 400 })
  }
  if (text.length > MAX_BODY) {
    return NextResponse.json({ error: "Aanvraag te groot." }, { status: 413 })
  }

  let body: unknown
  try {
    body = JSON.parse(text) as unknown
  } catch {
    return NextResponse.json({ error: "Ongeldige data." }, { status: 400 })
  }

  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Ongeldig formulier." }, { status: 400 })
  }

  const o = body as Record<string, unknown>
  const username = typeof o.username === "string" ? o.username : ""
  const password = typeof o.password === "string" ? o.password : ""
  const nextRaw = typeof o.next === "string" ? o.next : undefined

  if (!username.trim() || !password) {
    return NextResponse.json({ error: "Vul gebruikersnaam en wachtwoord in." }, { status: 400 })
  }

  const user = findPortalUser(username)
  const ok = user ? await bcrypt.compare(password, user.passwordHash) : false
  if (!user || !ok) {
    return authFailedResponse()
  }

  const token = await signPortalJwt(user.username, user.slug)
  const jar = await cookies()
  jar.set(PORTAL_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return NextResponse.json({ ok: true, redirect: `/portal/${user.slug}` })
}
