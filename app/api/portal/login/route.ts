import { NextResponse } from "next/server"
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
  if (!getPortalSessionSecret()) {
    return NextResponse.json(
      {
        error:
          "Portaal-secret ontbreekt of is te kort. Zet PORTAL_SESSION_SECRET in Vercel (min. 24 tekens) en deploy opnieuw.",
      },
      { status: 503 },
    )
  }
  if (getPortalUsers().length === 0) {
    return NextResponse.json(
      {
        error:
          "Geen accounts geladen. Controleer PORTAL_USERS_JSON: één regel, geldige JSON-array, slug alleen kleine letters en streepjes (bijv. hair-xl). Bcrypt-hash moet het $-teken intact houden.",
      },
      { status: 503 },
    )
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

  if (!username.trim() || !password) {
    return NextResponse.json({ error: "Vul gebruikersnaam en wachtwoord in." }, { status: 400 })
  }

  const user = findPortalUser(username)
  const ok = user ? await bcrypt.compare(password, user.passwordHash) : false
  if (!user || !ok) {
    return authFailedResponse()
  }

  const token = await signPortalJwt(user.username, user.slug)

  /** response.cookies.set is betrouwbaarder dan cookies().set in sommige Next route handlers. */
  const response = NextResponse.json({ ok: true, redirect: `/portal/${user.slug}` })
  response.cookies.set(PORTAL_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
