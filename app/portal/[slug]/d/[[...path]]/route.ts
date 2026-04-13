import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { cookies } from "next/headers"
import { PORTAL_COOKIE_NAME, verifyPortalJwt } from "@/lib/portal-jwt"
import { resolveDemoPublicFile } from "@/lib/demo-site"

export const runtime = "nodejs"

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
}

const PRIVATE_CACHE = "private, no-store, no-cache, must-revalidate"

type Ctx = { params: Promise<{ slug: string; path?: string[] }> }

export async function GET(_request: Request, context: Ctx) {
  const { slug, path: segments = [] } = await context.params

  const jar = await cookies()
  const token = jar.get(PORTAL_COOKIE_NAME)?.value
  const session = token ? await verifyPortalJwt(token) : null
  if (!session || session.slug !== slug) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const filePath = await resolveDemoPublicFile(slug, segments)
  if (!filePath) {
    return new NextResponse("Not Found", { status: 404 })
  }

  let buf: Buffer
  try {
    buf = await fs.readFile(filePath)
  } catch {
    return new NextResponse("Not Found", { status: 404 })
  }

  const ext = path.extname(filePath).toLowerCase()
  const contentType = MIME[ext] ?? "application/octet-stream"

  return new NextResponse(buf, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": PRIVATE_CACHE,
      "X-Content-Type-Options": "nosniff",
    },
  })
}
