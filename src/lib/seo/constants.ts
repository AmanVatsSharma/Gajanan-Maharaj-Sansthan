/**
 * File: src/lib/seo/constants.ts
 * Module: lib/seo
 * Purpose: SEO-related constants including keywords, site info, and configuration
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-18
 * Notes:
 * - Centralized SEO configuration for consistency across pages
 * - Keywords organized by category for better targeting
 * - Primary phone comes from @/data/contact (single source of truth)
 */

import { CONTACT_DETAILS } from "@/data/contact";
import { getSiteUrl } from "./site-url";

export const SITE_CONFIG = {
  name: "Shri Gajanan Maharaj Sansthan",
  shortName: "SGMS",
  url: getSiteUrl(),
  description: "Official website of Shri Gajanan Maharaj Sansthan, Shegaon. Book temple accommodation, plan your visit to multiple locations across Maharashtra and Madhya Pradesh.",
  foundingYear: "1908",
  locale: "en_IN",
  type: "Hindu Temple & Religious Organization",
} as const;

export const ORGANIZATION_INFO = {
  legalName: "Shri Gajanan Maharaj Sansthan",
  alternateName: "Gajanan Maharaj Mandir Shegaon",
  logo: "/logo/logo.svg",
  email: "contact@gajananmaharaj.org",
  phone: CONTACT_DETAILS.booking.mobile,
  address: {
    streetAddress: "Shri Gajanan Maharaj Temple Complex",
    addressLocality: "Shegaon",
    addressRegion: "Maharashtra",
    postalCode: "444203",
    addressCountry: "IN",
  },
} as const;

/**
 * Canonical + common search-variant brand names.
 * Includes transliteration/spelling patterns frequently used in Google queries.
 */
export const BRAND_VARIANTS = [
  "shri gajanan maharaj sansthan",
  "shree gajanan maharaj sansthan",
  "sri gajanan maharaj sansthan",
  "gajanan maharaj sansthan",
  "shri gajanan maharaj sanstan",
  "shree gajanan maharaj sanstan",
  "sri gajanan maharaj sanstan",
  "gajanan maharaj sanstan",
  "shri gajanan maharaj shegaon",
  "shree gajanan maharaj shegaon",
  "sri gajanan maharaj shegaon",
  "gajanan maharaj shegaon",
  "shri gajanan maharaj mandir shegaon",
  "shree gajanan maharaj mandir shegaon",
  "gajanan maharaj temple shegaon",
] as const;

// Primary keywords for accommodation/booking focus
export const PRIMARY_KEYWORDS = [
  "gajanan maharaj temple booking",
  "shri gajanan maharaj sansthan booking",
  "shree gajanan maharaj sansthan booking",
  "sri gajanan maharaj sansthan booking",
  "shegaon temple accommodation",
  "bhakt niwas shegaon",
  "bhakta niwas shegaon",
  "shegaon bhakta niwas booking",
  "bhakta niwas booking",
  "bhakt niwas accommodation",
  "temple stay maharashtra",
  "dharamshala booking shegaon",
  "gajanan maharaj room booking",
  "shri gajanan maharaj room booking",
] as const;

// Secondary keywords for broader reach
export const SECONDARY_KEYWORDS = [
  "gajanan maharaj sansthan",
  "shri gajanan maharaj sansthan",
  "shree gajanan maharaj sansthan",
  "sri gajanan maharaj sansthan",
  "gajanan maharaj sanstan",
  "shegaon temple",
  "devotee accommodation",
  "temple rooms booking",
  "pilgrimage stay maharashtra",
  "pandharpur temple accommodation",
  "hindu temple lodging",
  "jyotirlinga yatra stay",
  "temple dharamshala booking",
] as const;

// Long-tail keywords for specific queries
export const LONGTAIL_KEYWORDS = [
  "how to book accommodation at gajanan maharaj temple",
  "how to book room in shri gajanan maharaj sansthan",
  "how to book shree gajanan maharaj sansthan accommodation",
  "shegaon bhakt niwas room booking",
  "bhakta niwas shegaon contact number",
  "bhakta niwas sheogaon booking process",
  "family accommodation near shegaon temple",
  "gajanan maharaj temple stay facilities",
  "book dharamshala near pandharpur",
  "best time to visit shegaon gajanan maharaj temple",
  "omkareshwar darshan timings and stay guide",
  "omkareshwar bhakt niwas accommodation",
  "trimbakeshwar accommodation for devotees",
  "triambakeshwar jyotirlinga stay and darshan",
  "pandharpur pilgrimage stay booking tips",
] as const;

// Location-specific keywords
export const LOCATION_KEYWORDS = {
  shegaon: [
    "shri gajanan maharaj sansthan shegaon",
    "shree gajanan maharaj sansthan shegaon",
    "sri gajanan maharaj sansthan shegaon",
    "shegaon temple booking",
    "shegaon gajanan maharaj booking",
    "sheogaon temple",
    "sheogaon accommodation",
    "sheogaon bhakta niwas",
    "sheogaon darshan",
    "bhakt niwas shegaon",
    "bhakta niwas shegaon",
    "anand vihar shegaon",
    "visawa shegaon",
    "anand sagar shegaon",
    "buldhana temple",
    "maharashtra pilgrimage",
    "vidarbha temple stay",
    "akola to shegaon",
    "jalgaon to shegaon",
    "shegaon accommodation",
    "shegaon dharamshala",
    "shegaon mandir accommodation",
    "shegaon darshan timings",
    "nearby places from shegaon",
  ],
  pandharpur: [
    "shri gajanan maharaj sansthan pandharpur",
    "shree gajanan maharaj sansthan pandharpur",
    "pandharpur temple stay",
    "pandharpur accommodation",
    "gajanan math pandharpur",
    "pandharpur darshan travel guide",
    "pandharpur temple dharamshala booking",
  ],
  trimbakeshwar: [
    "shri gajanan maharaj sansthan trimbakeshwar",
    "shree gajanan maharaj sansthan trimbakeshwar",
    "trimbakeshwar accommodation",
    "triambakeshwar accommodation",
    "trimbakeshwar jyotirlinga stay",
    "triambakeshwar jyotirlinga",
    "trimbakeshwar darshan guide",
    "trimbakeshwar temple room booking",
    "triambakeshwar temple stay",
  ],
  omkareshwar: [
    "shri gajanan maharaj sansthan omkareshwar",
    "shree gajanan maharaj sansthan omkareshwar",
    "omkareshwar bhakt niwas",
    "omkareshwar temple accommodation",
    "omkareshwar darshan timings",
    "omkareshwar jyotirlinga stay",
    "omkareshwar yatra planning",
  ],
} as const;

/**
 * Location-intent cluster variants for blog and metadata use.
 */
export const LOCATION_INTENT_KEYWORDS = {
  shegaon: [
    "shegaon travel guide",
    "sheogaon travel guide",
    "shegaon accommodation guide",
    "shegaon darshan timing guide",
    "how to reach shegaon temple",
    "shegaon family trip planning",
    "shegaon temple nearby places",
    "shegaon bhakt niwas contact number",
    "sheogaon temple accommodation",
    "buldhana district temple guide",
    "akola to shegaon route",
  ],
  pandharpur: [
    "pandharpur travel guide",
    "pandharpur temple stay guide",
    "how to reach pandharpur temple",
    "pandharpur darshan tips",
    "pandharpur family pilgrimage planning",
  ],
  trimbakeshwar: [
    "trimbakeshwar travel guide",
    "triambakeshwar travel guide",
    "trimbakeshwar jyotirlinga darshan guide",
    "triambakeshwar jyotirlinga stay",
    "how to reach trimbakeshwar",
    "trimbakeshwar stay for families",
    "trimbakeshwar darshan timing tips",
  ],
  omkareshwar: [
    "omkareshwar travel guide",
    "omkareshwar jyotirlinga darshan guide",
    "how to reach omkareshwar temple",
    "omkareshwar family pilgrimage planning",
    "omkareshwar darshan timing tips",
  ],
} as const;

// Combine all keywords for global use
export const ALL_KEYWORDS = [
  ...BRAND_VARIANTS,
  ...PRIMARY_KEYWORDS,
  ...SECONDARY_KEYWORDS,
  ...LONGTAIL_KEYWORDS,
  ...Object.values(LOCATION_KEYWORDS).flat(),
  ...Object.values(LOCATION_INTENT_KEYWORDS).flat(),
] as const;

/**
 * Deduplicate and trim keywords defensively before passing to metadata.
 * Keeps metadata robust when many keyword sources are merged.
 */
export function getUniqueKeywords(
  keywords: ReadonlyArray<string>,
  limit = 80
): string[] {
  const normalized = keywords
    .map((keyword) => keyword.trim().toLowerCase())
    .filter(Boolean);
  return [...new Set(normalized)].slice(0, limit);
}

// Social media profiles
export const SOCIAL_PROFILES = {
  facebook: "https://facebook.com/shrigajananmaharajsansthan",
  youtube: "https://youtube.com/@shrigajananmaharajsansthan",
  instagram: "https://instagram.com/shrigajananmaharajsansthan",
  twitter: "https://twitter.com/sgms_shegaon",
} as const;

// Image dimensions for Open Graph
export const OG_IMAGE_DIMENSIONS = {
  width: 1200,
  height: 630,
} as const;

// Geo coordinates for main temple (Shegaon)
export const MAIN_TEMPLE_COORDINATES = {
  latitude: 20.7934,
  longitude: 76.6983,
} as const;
