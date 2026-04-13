/** Alleen interne /portal/[slug]-paden toestaan na login. */
export function sanitizePortalNextParam(next: string | undefined): string | null {
  if (!next || typeof next !== "string") return null
  const t = next.trim()
  if (!t.startsWith("/portal/")) return null
  if (t.includes("//") || t.includes("?") || t.includes("#")) return null
  const rest = t.slice("/portal/".length).replace(/\/$/, "")
  if (!rest || rest.includes("/")) return null
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rest)) return null
  return `/portal/${rest}`
}
