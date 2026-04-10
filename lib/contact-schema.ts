import { z } from "zod"

/** Geen CRLF of null-bytes (e-mailheader-injectie). */
export function sanitizeSingleLine(input: string, max: number): string {
  return input.replace(/[\r\n\x00]/g, " ").slice(0, max).trim()
}

const websiteTypeEnum = z.enum(["geen", "bestaand", "verbeteren"], {
  errorMap: () => ({ message: "Kies wat voor website je hebt." }),
})

const websiteField = z.preprocess(
  (v) => (v == null || v === "" ? "" : String(v).trim().slice(0, 2048)),
  z
    .string()
    .max(2048)
    .refine(
      (s) => s === "" || /^https?:\/\//i.test(s),
      "Gebruik een URL die begint met http:// of https://",
    )
    .refine((s) => {
      if (s === "") return true
      try {
        const u = new URL(s)
        return u.protocol === "http:" || u.protocol === "https:"
      } catch {
        return false
      }
    }, "Ongeldige website-URL"),
)

export const contactFormSchema = z.object({
  naam: z
    .string()
    .max(200)
    .transform((s) => sanitizeSingleLine(s, 200))
    .refine((s) => s.length > 0, "Naam is verplicht"),
  email: z
    .string()
    .max(254)
    .transform((s) => sanitizeSingleLine(s.trim(), 254))
    .pipe(z.string().min(1, "E-mail is verplicht").email("Ongeldig e-mailadres").max(254)),
  websiteType: websiteTypeEnum,
  website: websiteField,
  bericht: z.preprocess(
    (v) => (v == null ? "" : String(v)),
    z.string().max(8000).transform((s) => s.trim().slice(0, 8000)),
  ),
  /** Honeypot: moet leeg blijven */
  formHp: z.preprocess(
    (v) => (v == null ? "" : String(v).trim().slice(0, 200)),
    z.string().max(200),
  ),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
