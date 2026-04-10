import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { SITE_CONTACT_EMAIL } from "@/lib/site-contact"
import { contactFormSchema } from "@/lib/contact-schema"

export const runtime = "nodejs"

const WEBSITE_TYPE_LABELS: Record<string, string> = {
  geen: "Ik heb nog geen website",
  bestaand: "Ik heb al een website",
  verbeteren: "Ik wil mijn website verbeteren",
}

const MAX_BODY_BYTES = 48 * 1024

function getTransporter() {
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!user || !pass) return null

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  })
}

/** Zelfde site met of zonder www, case-insensitive host. */
function originKeyFromUrlString(urlStr: string): string {
  const trimmed = urlStr.trim().replace(/\/$/, "")
  const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  const u = new URL(withProto)
  const host = u.hostname.toLowerCase().replace(/^www\./, "")
  return `${u.protocol}//${host}`
}

function buildAllowedOriginKeys(): string[] {
  const raw = process.env.ALLOWED_ORIGINS?.trim()
  const keys = new Set<string>()
  if (raw) {
    for (const part of raw.split(",")) {
      const t = part.trim()
      if (!t) continue
      try {
        keys.add(originKeyFromUrlString(t))
      } catch {
        /* negeren */
      }
    }
  }
  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "").replace(/^https?:\/\//, "")
  if (vercel) {
    try {
      keys.add(originKeyFromUrlString(`https://${vercel}`))
    } catch {
      /* negeren */
    }
  }
  return [...keys]
}

/** Alle bruikbare “site”-herkomsten van dit verzoek (Origin, Referer, Host). */
function collectRequestOriginKeys(request: Request): string[] {
  const keys = new Set<string>()

  const origin = request.headers.get("origin")
  if (origin) {
    try {
      keys.add(originKeyFromUrlString(origin))
    } catch {
      /* negeren */
    }
  }

  const referer = request.headers.get("referer")
  if (referer) {
    try {
      keys.add(originKeyFromUrlString(new URL(referer).origin))
    } catch {
      /* negeren */
    }
  }

  const hostRaw =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    request.headers.get("host")?.split(",")[0]?.trim()
  if (hostRaw) {
    const hostname = hostRaw.split(":")[0]
    const proto =
      request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https"
    try {
      keys.add(originKeyFromUrlString(`${proto}://${hostname}`))
    } catch {
      /* negeren */
    }
  }

  return [...keys]
}

/**
 * Als ALLOWED_ORIGINS is gezet (productie): minstens één kandidaat moet matchen.
 * www/non-www en hoofdletters worden genormaliseerd. VERCEL_URL wordt automatisch toegevoegd.
 */
function originBlocked(request: Request): boolean {
  if (process.env.NODE_ENV === "development") return false

  const allowed = buildAllowedOriginKeys()
  if (allowed.length === 0) return false

  const candidates = collectRequestOriginKeys(request)
  if (candidates.length === 0) return true

  return !candidates.some((c) => allowed.includes(c))
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  })
}

export async function POST(request: Request) {
  if (originBlocked(request)) {
    return NextResponse.json(
      {
        error:
          "De aanvraag wordt geweigerd door de beveiligingsinstellingen. Controleer in Vercel bij Environment Variables of ALLOWED_ORIGINS je domein bevat (https:// en eventueel www), of zet ALLOWED_ORIGINS tijdelijk leeg om te testen.",
      },
      { status: 403 },
    )
  }

  let textBody: string
  try {
    textBody = await request.text()
  } catch {
    return NextResponse.json(
      { error: "Kon het formulier niet uitlezen. Vernieuw de pagina en probeer opnieuw." },
      { status: 400 },
    )
  }

  if (!textBody.trim()) {
    return NextResponse.json(
      { error: "Er werd geen data meegestuurd. Vernieuw de pagina en probeer opnieuw." },
      { status: 400 },
    )
  }

  if (textBody.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Aanvraag te groot" }, { status: 413 })
  }

  let json: unknown
  try {
    json = JSON.parse(textBody) as unknown
  } catch {
    return NextResponse.json(
      { error: "Ongeldige data ontvangen. Vernieuw de pagina en probeer opnieuw." },
      { status: 400 },
    )
  }

  if (json === null || typeof json !== "object" || Array.isArray(json)) {
    return NextResponse.json(
      { error: "Verkeerd formulierformaat. Vernieuw de pagina en probeer opnieuw." },
      { status: 400 },
    )
  }

  const parsed = contactFormSchema.safeParse(json)
  if (!parsed.success) {
    const flat = parsed.error.flatten()
    const fieldMsg = Object.values(flat.fieldErrors)
      .flat()
      .find((m): m is string => Boolean(m))
    const msg = fieldMsg ?? flat.formErrors[0] ?? "Controleer de invoer en probeer opnieuw."
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  const { naam, email, websiteType, website, bericht, formHp } = parsed.data

  if (formHp.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const typeLabel = WEBSITE_TYPE_LABELS[websiteType] ?? websiteType
  const to = process.env.CONTACT_TO_EMAIL ?? SITE_CONTACT_EMAIL

  const text = [
    "Nieuwe aanvraag gratis analyse (website)",
    "",
    `Naam: ${naam}`,
    `E-mail: ${email}`,
    `Type website: ${typeLabel}`,
    website ? `Website-URL: ${website}` : "Website-URL: (niet ingevuld)",
    "",
    bericht ? `Bericht:\n${bericht}` : "Bericht: (geen)",
  ].join("\n")

  const transporter = getTransporter()
  if (!transporter) {
    console.error(
      "[contact] SMTP niet geconfigureerd. Zet SMTP_USER en SMTP_PASS (Gmail app-wachtwoord).",
    )
    return NextResponse.json(
      {
        error:
          "E-mailverzending is niet geconfigureerd op de server. Neem contact op via e-mail of WhatsApp.",
      },
      { status: 503 },
    )
  }

  const from = process.env.SMTP_FROM ?? `CNTstudios website <${process.env.SMTP_USER}>`
  const safeSubject = naam.slice(0, 120)

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Gratis analyse: ${safeSubject}`,
      text,
    })
  } catch (err) {
    console.error("[contact] sendMail", err)
    return NextResponse.json(
      { error: "Versturen is mislukt. Probeer het later opnieuw of mail direct." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
