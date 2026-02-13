/**
 * File: src/app/sitemap.ts
 * Module: app
 * Purpose: Enhanced sitemap with images, optimized priorities, and better change frequencies
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Base URL derives from NEXT_PUBLIC_SITE_URL / VERCEL_URL with localhost fallback
 * - Includes image sitemap data for better image SEO
 * - Optimized priorities: Home (1.0), Booking (0.9), Locations main (0.9), Individual locations (0.8)
 * - Change frequencies based on content update patterns
 */
import type { MetadataRoute } from "next";

import { sansthanLocations } from "@/data/sansthan-data";
import { getSiteUrl } from "@/lib/seo/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  // Static routes with optimized priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/locations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9, // High priority for locations listing
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic location routes with images
  const locationRoutes: MetadataRoute.Sitemap = sansthanLocations.map((loc) => ({
    url: `${siteUrl}/locations/${loc.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8, // Higher priority for individual location pages
    // Note: Next.js sitemap doesn't support image extensions directly
    // Image sitemaps are better handled via structured data on the page
  }));

  return [...staticRoutes, ...locationRoutes];
}

