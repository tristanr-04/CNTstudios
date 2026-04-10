/**
 * Canonieke basis-URL voor sitemap, robots en (later) metadata.
 * In productie: zet NEXT_PUBLIC_SITE_URL op je voorkeursdomein (met https, zonder slash aan het eind).
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "")
  }
  if (process.env.VERCEL_URL) {
    const host = process.env.VERCEL_URL.replace(/\/+$/, "")
    return `https://${host}`
  }
  return "http://localhost:3000"
}
