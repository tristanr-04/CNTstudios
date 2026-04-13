/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"

/**
 * Next.js (15+) blokkeert in development requests naar /_next/* als de Origin-host
 * niet op de allowlist staat. Zonder lijst werkt http://192.168.x.x:3000 op je telefoon
 * niet: geen JS → geen menu, lege FadeIn-pagina’s.
 *
 * We vullen in development automatisch gangbare private IPv4-adressen (hostname zonder poort).
 * Extra hosts (bv. mijn-macbook.local): LAN_DEV_ORIGINS in .env.local.
 */
function buildDefaultLanDevOrigins() {
  const out = []
  /* 43=veel Android-hotspots; 137/215=iOS/USB-tether varianten */
  const common192 = [0, 1, 2, 4, 8, 10, 11, 20, 43, 50, 100, 101, 123, 132, 137, 178, 192, 215, 254]
  for (const b of common192) {
    for (let c = 0; c < 256; c++) {
      out.push(`192.168.${b}.${c}`)
    }
  }
  for (let c = 0; c < 256; c++) {
    out.push(`10.0.0.${c}`)
    out.push(`10.0.1.${c}`)
    out.push(`172.16.0.${c}`)
    out.push(`172.17.0.${c}`)
    out.push(`172.20.0.${c}`)
  }
  return out
}

const lanDevOriginsExtra =
  process.env.LAN_DEV_ORIGINS?.split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean) ?? []

const allowedDevOrigins = !isProd
  ? [...new Set([...buildDefaultLanDevOrigins(), ...lanDevOriginsExtra])]
  : []

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-XSS-Protection", value: "0" },
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
]

const nextConfig = {
  poweredByHeader: false,
  ...(!isProd && allowedDevOrigins.length > 0
    ? { allowedDevOrigins }
    : {}),
  /** Zorgt dat demo-bestanden op Vercel in de serverless bundle zitten (fs.readFile). */
  outputFileTracingIncludes: {
    "/portal/[slug]/d/[[...path]]": ["./demo/**/*"],
    "/portal/[slug]": ["./demo/**/*"],
  },
  images: {
    qualities: [75, 100],
  },
  async headers() {
    const noStorePortalLogin = [
      {
        key: "Cache-Control",
        value: "private, no-store, no-cache, must-revalidate, max-age=0",
      },
      { key: "Vary", value: "Cookie" },
    ]
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/portal/:path*",
        headers: noStorePortalLogin,
      },
      {
        source: "/login",
        headers: noStorePortalLogin,
      },
    ]
  },
}

export default nextConfig
