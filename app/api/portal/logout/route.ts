import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { PORTAL_COOKIE_NAME } from "@/lib/portal-jwt"

export async function POST(request: Request) {
  const jar = await cookies()
  jar.set(PORTAL_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
  const url = new URL(request.url)
  return NextResponse.redirect(new URL("/login", url.origin), 303)
}
