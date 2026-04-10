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

/** Als ALLOWED_ORIGINS is gezet: alleen die origins (komma-gescheiden, zonder trailing slash). */
function originBlocked(request: Request): boolean {
  const raw = process.env.ALLOWED_ORIGINS?.trim()
  if (!raw) return false
  const allowed = raw
    .split(",")
    .map((s) => s.trim().replace(/\/$/, ""))
    .filter(Boolean)
  if (allowed.length === 0) return false

  const origin = request.headers.get("origin")
  if (!origin) return true
  const normalized = origin.replace(/\/$/, "")
  return !allowed.some((a) => a === normalized)
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
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 403 })
  }

  let textBody: string
  try {
    const buf = await request.arrayBuffer()
    if (buf.byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Aanvraag te groot" }, { status: 413 })
    }
    textBody = new TextDecoder("utf-8", { fatal: false }).decode(buf)
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 })
  }

  let json: unknown
  try {
    json = JSON.parse(textBody) as unknown
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 })
  }

  if (!json || typeof json !== "object") {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 })
  }

  const parsed = contactFormSchema.safeParse(json)
  if (!parsed.success) {
    const flat = parsed.error.flatten()
    const fieldMsg = Object.values(flat.fieldErrors)
      .flat()
      .find((m): m is string => Boolean(m))
    const msg = fieldMsg ?? flat.formErrors[0] ?? "Ongeldige invoer"
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
