/**
 * Canonieke basis-URL voor sitemap, robots en metadata.
 *
 * - Zet NEXT_PUBLIC_SITE_URL in Vercel als je www vs non-www anders wilt (bijv. https://www.cntstudios.nl).
 * - Gebruik nooit VERCEL_URL hier: preview-URLs (*.vercel.app) mogen niet in de sitemap staan
 *   als Search Console op je echte domein staat.
 */
const PRODUCTION_SITE_URL = "https://cntstudios.nl"

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "")
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000"
  }
  return PRODUCTION_SITE_URL
}
