/**
 * File: src/lib/seo/site-url.ts
 * Module: lib/seo
 * Purpose: Single source of truth for resolving the canonical site URL for SEO.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-13
 * Notes:
 * - Prefers NEXT_PUBLIC_SITE_URL (recommended), then VERCEL_URL.
 * - Uses production domain fallback in prod, localhost fallback in dev.
 * - Normalizes protocol and strips trailing slashes for consistent canonicals.
 */

export const DEFAULT_PRODUCTION_SITE_URL =
  "https://www.shrigajananmaharajsanstan.com";

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;

  const withProtocol =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  return withProtocol.endsWith("/") ? withProtocol.slice(0, -1) : withProtocol;
}

/**
 * Resolve canonical site URL for metadata/robots/sitemap/schema.
 */
export function getSiteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  if (fromEnv) return normalizeUrl(fromEnv);

  if (process.env.NODE_ENV === "production") {
    return DEFAULT_PRODUCTION_SITE_URL;
  }

  return "http://localhost:3000";
}

export function getSiteUrlAsUrl(): URL {
  return new URL(getSiteUrl());
}

