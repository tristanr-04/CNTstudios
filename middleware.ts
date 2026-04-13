import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/** Safari op iPhone cachet LAN-dev hard; oude HTML → oude /_next-chunks → “kapotte” site terwijl Chrome wél werkt. */
const DEV_NO_CACHE =
  "private, no-store, no-cache, must-revalidate, max-age=0"

function withDevNoCache(res: NextResponse): NextResponse {
  if (process.env.NODE_ENV === "development") {
    res.headers.set("Cache-Control", DEV_NO_CACHE)
  }
  return res
}

const WINDOW_MS = 60_000
const MAX_REQUESTS = 8

type Bucket = { count: number; windowStart: number }

const globalForRl = globalThis as typeof globalThis & {
  __contactRateLimit?: Map<string, Bucket>
}

function getStore() {
  if (!globalForRl.__contactRateLimit) {
    globalForRl.__contactRateLimit = new Map()
  }
  return globalForRl.__contactRateLimit
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }
  const realIp = request.headers.get("x-real-ip")?.trim()
  if (realIp) return realIp
  return "unknown"
}

function isRateLimited(ip: string): boolean {
  const store = getStore()
  const now = Date.now()

  if (store.size > 20_000) {
    store.clear()
  }

  const b = store.get(ip)
  if (!b || now - b.windowStart > WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now })
    return false
  }
  if (b.count >= MAX_REQUESTS) {
    return true
  }
  b.count += 1
  return false
}

async function portalGuard(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith("/portal/")) return null

  /**
   * /portal/[slug]/d moet eindigen op /d/ — anders lost de browser ./assets/ op naar
   * /portal/[slug]/assets/ i.p.v. /portal/[slug]/d/assets/ → lege witte demo.
   */
  if (/^\/portal\/[^/]+\/d$/u.test(pathname)) {
    const u = request.nextUrl.clone()
    u.pathname = `${pathname}/`
    return NextResponse.redirect(u, 308)
  }

  /**
   * Portaal-auth gebeurt in Server Components + route handlers (Node), niet hier.
   * Edge Middleware krijgt op Vercel soms geen PORTAL_SESSION_SECRET (build-time inlining),
   * terwijl Node wél de secret heeft → oneindige redirect: /portal → /login → /portal.
   */
  return null
}

export async function middleware(request: NextRequest) {
  const portal = await portalGuard(request)
  if (portal) return portal

  if (process.env.NODE_ENV === "development") {
    return withDevNoCache(NextResponse.next())
  }

  if (request.nextUrl.pathname !== "/api/contact" || request.method !== "POST") {
    return NextResponse.next()
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Te veel aanvragen. Wacht even en probeer het opnieuw." },
      { status: 429 },
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/api/contact",
    "/portal/:path*",
    /* HTML-pagina’s: voorkomt Safari-stale cache tijdens pnpm dev op LAN */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
}
