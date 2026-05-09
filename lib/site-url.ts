/**
 * Canonical site URL for metadata, sitemap, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL on production (e.g. https://www.amgmobilegrooming.com).
 * On Vercel, VERCEL_URL is used when the env var is unset.
 */
export function getSiteUrl(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) {
    const normalized = fromEnv.startsWith('http') ? fromEnv : `https://${fromEnv}`
    const trimmed = normalized.replace(/\/+$/, '')
    return new URL(trimmed)
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`)
  }
  return new URL('http://localhost:3000')
}

export function absoluteUrl(pathname: string): string {
  const base = getSiteUrl().origin
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${base}${path}`
}
