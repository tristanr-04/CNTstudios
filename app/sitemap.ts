import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-url"

type Frequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>

const entries: { path: string; changeFrequency: Frequency; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/diensten", changeFrequency: "weekly", priority: 0.9 },
  { path: "/cases", changeFrequency: "weekly", priority: 0.9 },
  { path: "/over-ons", changeFrequency: "monthly", priority: 0.85 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/voorwaarden", changeFrequency: "yearly", priority: 0.4 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const lastModified = new Date()

  return entries.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
