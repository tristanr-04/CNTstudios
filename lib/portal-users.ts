import type { PortalUserRow } from "@/lib/portal-types"

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function isPortalUserRow(x: unknown): x is PortalUserRow {
  if (x === null || typeof x !== "object") return false
  const o = x as Record<string, unknown>
  return (
    typeof o.username === "string" &&
    typeof o.passwordHash === "string" &&
    typeof o.slug === "string" &&
    o.username.length > 0 &&
    o.username.length <= 64 &&
    o.passwordHash.length > 0 &&
    o.slug.length > 0 &&
    o.slug.length <= 64 &&
    SLUG_RE.test(o.slug)
  )
}

/** Accounts die jullie zelf beheren (Vercel: PORTAL_USERS_JSON). */
export function getPortalUsers(): PortalUserRow[] {
  const raw = process.env.PORTAL_USERS_JSON?.trim()
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isPortalUserRow)
  } catch {
    return []
  }
}

export function findPortalUser(username: string): PortalUserRow | undefined {
  const u = username.trim().toLowerCase()
  return getPortalUsers().find((row) => row.username.toLowerCase() === u)
}
