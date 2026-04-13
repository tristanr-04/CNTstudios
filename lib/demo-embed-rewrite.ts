/**
 * Vite met base "/" bundelt vaak paden als "/foto.jpg". In het portaal wordt dat
 * https://site.nl/foto.jpg i.p.v. onder /portal/[slug]/d/. Met <base href=".../d/">
 * werken ./relatieve paden wel — dus "/x" → "./x" in strings en url().
 */
const STATIC_EXT = String.raw`\.(?:png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf)`

export function rewriteDemoRootAbsoluteAssets(source: string): string {
  const dquoted = new RegExp(`"\\/(?!\\/)([^"]+?${STATIC_EXT})"`, "g")
  const squoted = new RegExp(`'\\/(?!\\/)([^']+?${STATIC_EXT})'`, "g")
  const cssUrl = new RegExp(String.raw`url\(\s*\/(?!\/)([^)]+?` + STATIC_EXT + String.raw`)\s*\)`, "gi")
  return source
    .replace(dquoted, '"./$1"')
    .replace(squoted, "'./$1'")
    .replace(cssUrl, "url(./$1)")
}
