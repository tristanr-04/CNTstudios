import * as jose from "jose"

export const PORTAL_COOKIE_NAME = "cnt_portal"

const ALG = "HS256"

/**
 * Dynamische env-naam voorkomt dat Turbopack/Webpack de waarde bij build naar ""
 * inlijnt (Edge middleware kreeg dan geen secret terwijl Node wél redirect-loops gaf).
 */
export function getPortalSessionSecret(): string | null {
  const key = ["PORTAL", "SESSION", "SECRET"].join("_")
  const raw =
    typeof process !== "undefined" && process.env != null
      ? (process.env as Record<string, string | undefined>)[key]
      : undefined
  const s = raw?.trim()
  if (!s || s.length < 24) return null
  return s
}

export async function signPortalJwt(username: string, slug: string): Promise<string> {
  const secret = getPortalSessionSecret()
  if (!secret) throw new Error("PORTAL_SESSION_SECRET ontbreekt of is te kort (min. 24 tekens).")

  return new jose.SignJWT({ slug })
    .setProtectedHeader({ alg: ALG })
    .setSubject(username)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(secret))
}

export async function verifyPortalJwt(token: string): Promise<{ username: string; slug: string } | null> {
  const secret = getPortalSessionSecret()
  if (!secret) return null
  try {
    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: [ALG],
    })
    const slug = payload.slug
    const sub = payload.sub
    if (typeof slug !== "string" || typeof sub !== "string") return null
    return { username: sub, slug }
  } catch {
    return null
  }
}
