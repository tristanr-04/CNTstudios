import type { Metadata } from "next"
import Link from "next/link"
import { Section } from "@/components/section"

export const metadata: Metadata = {
  title: "Privacybeleid | CNTstudios",
  description: "Hoe CNTstudios omgaat met persoonsgegevens en privacy.",
}

export default function PrivacyPage() {
  return (
    <Section className="pt-24 pb-16 md:pt-28">
      <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground">
        <p className="text-sm mb-8">
          <Link href="/" className="text-primary hover:underline">
            ← Home
          </Link>
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Privacybeleid</h1>
        <p className="mb-6">
          Dit privacybeleid beschrijft hoe CNTstudios (hierna &ldquo;wij&rdquo;) omgaat met gegevens die via deze
          website worden verzameld. Laatste update: {new Date().getFullYear()}.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">Gegevens die wij verwerken</h2>
        <p>
          Wanneer je contact met ons opneemt (bijvoorbeeld via het contactformulier), kunnen wij naam, e-mailadres,
          website-URL en je bericht verwerken om je verzoek te beantwoorden.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">Doeleinden</h2>
        <p>
          We gebruiken deze gegevens alleen om je aanvraag te behandelen, te communiceren over onze diensten en waar
          nodig om wettelijke verplichtingen na te komen.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">Bewaartermijn</h2>
        <p>
          We bewaren gegevens niet langer dan nodig is voor de doeleinden waarvoor ze zijn verzameld, tenzij een langere
          bewaartermijn wettelijk verplicht is.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">Je rechten</h2>
        <p>
          Je kunt bezwaar maken tegen verwerking, inzage vragen, rectificatie of verwijdering verzoeken voor zover dat
          past bij de AVG. Neem hiervoor contact met ons op via het e-mailadres op de contactpagina.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">Wijzigingen</h2>
        <p>
          Wij kunnen dit beleid aanpassen. De actuele versie staat altijd op deze pagina.
        </p>
      </div>
    </Section>
  )
}
