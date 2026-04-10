import type { Metadata } from "next"
import Link from "next/link"
import { Section } from "@/components/section"

export const metadata: Metadata = {
  title: "Algemene voorwaarden | CNTstudios",
  description: "Algemene voorwaarden voor diensten van CNTstudios.",
}

export default function VoorwaardenPage() {
  return (
    <Section className="pt-24 pb-16 md:pt-28">
      <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground">
        <p className="text-sm mb-8">
          <Link href="/" className="text-primary hover:underline">
            ← Home
          </Link>
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Algemene voorwaarden</h1>
        <p className="mb-6">
          Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en diensten van CNTstudios.
          Laatste update: {new Date().getFullYear()}.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">Aanvaarding</h2>
        <p>
          Door een offerte te accepteren of door gebruik te maken van onze diensten ga je akkoord met deze voorwaarden.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">Diensten</h2>
        <p>
          De concrete scope, planning en oplevering worden per project schriftelijk (of per e-mail) vastgelegd. Wij
          leveren professionele inspanning; specifieke resultaten (zoals exacte conversiecijfers) zijn geen garantie tenzij
          uitdrukkelijk overeengekomen.
        </p>
        <h2 className="text-xl font-semibold mt-10 mb-3">Betaling</h2>
        <p>
          Betalingsvoorwaarden en facturatie worden per offerte of overeenkomst afgesproken. Bij wanbetaling kunnen wij
          werk opschorten of de overeenkomst ontbinden volgens de wettelijke mogelijkheden.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">Aansprakelijkheid</h2>
        <p>
          Onze aansprakelijkheid is beperkt tot het bedrag dat in het desbetreffende project in rekening is gebracht,
          tenzij sprake is van opzet of grove schuld.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">Toepasselijk recht</h2>
        <p>
          Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter
          in Nederland.
        </p>
        <p className="pt-6 text-sm border-t border-border/30">
          Voor juridisch bindende teksten: laat deze pagina door je adviseur controleren en vul aan met jouw KvK-gegevens,
          adres en specifieke projectvoorwaarden.
        </p>
      </div>
    </Section>
  )
}
