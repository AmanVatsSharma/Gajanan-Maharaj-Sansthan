/**
 * File: src/app/locations/page.tsx
 * Module: app/locations
 * Purpose: Locations listing page showing all Sansthan accommodations
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Important landing page for location-based searches
 * - Links to all individual location detail pages
 */
import { LocationCard } from "@/features/locations/components/LocationCard";
import { sansthanLocations } from "@/data/sansthan-data";
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

export default function LocationsPage() {
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
    </div>
  );
}
