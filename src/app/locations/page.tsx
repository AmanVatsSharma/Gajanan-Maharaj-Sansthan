/**
 * File: src/app/locations/page.tsx
 * Module: app/locations
 * Purpose: Locations listing page showing all Sansthan accommodations
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-18
 * Notes:
 * - Important landing page for location-based searches
 * - Links to all individual location detail pages
 * - Plan 3: "Popular Guides by Location" section for blog interlinking
 */
import Link from "next/link";
import { LocationCard } from "@/features/locations/components/LocationCard";
import { BlogCard } from "@/features/blog/components/BlogCard";
import { sansthanLocations } from "@/data/sansthan-data";
import { getPostsBySlugs } from "@/lib/blog";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { generatePageMetadata } from "@/lib/seo/metadata";
import {
  BRAND_VARIANTS,
  LOCATION_INTENT_KEYWORDS,
  LOCATION_KEYWORDS,
  getUniqueKeywords,
} from "@/lib/seo/constants";

export const metadata = generatePageMetadata({
  title: "All Locations | Temple Accommodation Across India",
  description: "Explore Shri Gajanan Maharaj Sansthan accommodation locations across Maharashtra and Madhya Pradesh. Find temple stays at Shri Gajanan Maharaj Sansthan Shegaon, Shri Gajanan Maharaj Sansthan Pandharpur, Shri Gajanan Maharaj Sansthan Trimbakeshwar, and Shri Gajanan Maharaj Sansthan Omkareshwar with modern facilities.",
  keywords: getUniqueKeywords([
    ...BRAND_VARIANTS,
    ...Object.values(LOCATION_KEYWORDS).flat(),
    ...Object.values(LOCATION_INTENT_KEYWORDS).flat(),
    "temple locations",
    "bhakt niwas network",
    "sansthan branches",
  ]),
  path: "/locations",
});

const LOCATIONS_POPULAR_GUIDE_SLUGS = [
  "shegaon-travel-guide",
  "shegaon-accommodation-guide",
  "omkareshwar-darshan-timings",
  "pandharpur-darshan-timing-guide",
  "trimbakeshwar-darshan-timing-guide",
];

export default async function LocationsPage() {
  const popularGuides = await getPostsBySlugs(LOCATIONS_POPULAR_GUIDE_SLUGS);

  return (
    <div className="container py-12">
      <ScrollReveal>
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold font-heading text-brand-maroon mb-4">Sansthan Locations</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Accommodations managed by Shri Gajanan Maharaj Sansthan across various holy places.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sansthanLocations.map((location, index) => (
          <ScrollReveal key={location.id} delay={index * 0.1} className="h-full">
            <LocationCard location={location} />
          </ScrollReveal>
        ))}
      </div>

      {popularGuides.length > 0 && (
        <ScrollReveal className="mt-16">
          <h2 className="text-2xl font-bold font-heading text-brand-maroon mb-4 text-center">
            Popular Guides by Location
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Plan your visit with guides for Shegaon, Omkareshwar, Pandharpur, and Trimbakeshwar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGuides.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-medium text-brand-saffron hover:text-brand-maroon transition-colors"
            >
              View all guides
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
