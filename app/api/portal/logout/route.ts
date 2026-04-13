import { NextResponse } from "next/server"
import { PORTAL_COOKIE_NAME } from "@/lib/portal-jwt"

export async function POST(request: Request) {
  const url = new URL(request.url)
  const response = NextResponse.redirect(new URL("/login", url.origin), 303)
  response.cookies.set(PORTAL_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
  return response
}
