import * as jose from "jose"

export const PORTAL_COOKIE_NAME = "cnt_portal"

const ALG = "HS256"

export function getPortalSessionSecret(): string | null {
  const s = process.env.PORTAL_SESSION_SECRET?.trim()
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
