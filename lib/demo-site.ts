import fs from "fs/promises"
import path from "path"

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function projectDemoBase(): string {
  return path.join(/* turbopackIgnore: true */ process.cwd(), "demo")
}

export function getValidatedDemoRoot(slug: string): string | null {
  if (!SLUG_RE.test(slug)) return null
  return path.resolve(path.join(projectDemoBase(), slug))
}

function isSafeSegment(seg: string): boolean {
  return Boolean(seg) && seg !== "." && seg !== ".." && !seg.includes("/") && !seg.includes("\\")
}

/** Of er een index.html in demo/[slug]/ staat (na login tonen we die preview). */
export async function hasDemoSite(slug: string): Promise<boolean> {
  const root = getValidatedDemoRoot(slug)
  if (!root) return false
  try {
    await fs.access(path.join(root, "index.html"))
    return true
  } catch {
    return false
  }
}

/**
 * Pad naar het bestand dat we onder /portal/[slug]/d/... mogen serveren, of null.
 */
export async function resolveDemoPublicFile(
  slug: string,
  pathSegments: string[],
): Promise<string | null> {
  const root = getValidatedDemoRoot(slug)
  if (!root) return null
  if (!pathSegments.every(isSafeSegment)) return null

  let target: string
  if (pathSegments.length === 0) {
    target = path.join(root, "index.html")
  } else {
    target = path.resolve(root, ...pathSegments)
  }

  const rootWithSep = root + path.sep
  if (target !== root && !target.startsWith(rootWithSep)) return null

  try {
    const st = await fs.stat(target)
    if (st.isDirectory()) {
      const idx = path.join(target, "index.html")
      try {
        await fs.access(idx)
        return idx
      } catch {
        return null
      }
    }
    return target
  } catch {
    return null
  }
}
