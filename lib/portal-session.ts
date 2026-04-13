import { cookies } from "next/headers"
import { PORTAL_COOKIE_NAME, verifyPortalJwt } from "@/lib/portal-jwt"

export { PORTAL_COOKIE_NAME } from "@/lib/portal-jwt"

export async function getPortalSessionFromCookies(): Promise<{ username: string; slug: string } | null> {
  const jar = await cookies()
  const token = jar.get(PORTAL_COOKIE_NAME)?.value
  if (!token) return null
  return verifyPortalJwt(token)
}
