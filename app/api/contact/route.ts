import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { SITE_CONTACT_EMAIL } from "@/lib/site-contact"

const WEBSITE_TYPE_LABELS: Record<string, string> = {
  geen: "Ik heb nog geen website",
  bestaand: "Ik heb al een website",
  verbeteren: "Ik wil mijn website verbeteren",
}

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

export async function POST(request: Request) {
  let body: {
    naam?: string
    email?: string
    websiteType?: string
    website?: string
    bericht?: string
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 })
  }

  const naam = String(body.naam ?? "").trim()
  const email = String(body.email ?? "").trim()
  const websiteType = String(body.websiteType ?? "").trim()
  const website = String(body.website ?? "").trim()
  const bericht = String(body.bericht ?? "").trim()

  if (!naam || !email || !websiteType) {
    return NextResponse.json({ error: "Vul alle verplichte velden in." }, { status: 400 })
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

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Gratis analyse: ${naam}`,
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
