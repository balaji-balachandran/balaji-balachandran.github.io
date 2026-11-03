/**
 * The subdirectory the site is served from, e.g. "/~balajib" on
 * cs.stanford.edu. Empty when served from a domain root.
 *
 * Next rewrites paths it owns (next/link, next/image, the /_next bundles)
 * using `basePath` in next.config.mjs, but it does NOT touch plain strings
 * like <img src="/images/x.jpg"> or an href read out of a YAML file. Those go
 * through `asset()` below.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a site-root-relative path with BASE_PATH. External URLs, anchors,
 * and already-relative paths are returned untouched.
 */
export function asset(p: string): string {
  if (!p.startsWith("/") || p.startsWith("//")) return p;
  return `${BASE_PATH}${p}`;
}
