import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

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

export function middleware(request: NextRequest) {
  if (request.method !== "POST") {
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
  matcher: "/api/contact",
}
