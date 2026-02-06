/**
 * File: src/lib/seo/constants.ts
 * Module: lib/seo
 * Purpose: SEO-related constants including keywords, site info, and configuration
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-06
 * Notes:
 * - Centralized SEO configuration for consistency across pages
 * - Keywords organized by category for better targeting
 * - Primary phone comes from @/data/contact (single source of truth)
 */

import { CONTACT_DETAILS } from "@/data/contact";

export const SITE_CONFIG = {
  name: "Shri Gajanan Maharaj Sansthan",
  shortName: "SGMS",
  url: "https://www.shrigajananmaharajsanstan.com",
  description: "Official website of Shri Gajanan Maharaj Sansthan, Shegaon. Book temple accommodation, plan your visit to multiple locations across Maharashtra and Madhya Pradesh.",
  foundingYear: "1908",
  locale: "en_IN",
  type: "Hindu Temple & Religious Organization",
} as const;

export const ORGANIZATION_INFO = {
  legalName: "Shri Gajanan Maharaj Sansthan",
  alternateName: "Gajanan Maharaj Mandir Shegaon",
  logo: "/logo/logo.png",
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

// Primary keywords for accommodation/booking focus
export const PRIMARY_KEYWORDS = [
  "gajanan maharaj temple booking",
  "shegaon temple accommodation",
  "bhakt niwas shegaon",
  "temple stay maharashtra",
  "dharamshala booking shegaon",
] as const;

// Secondary keywords for broader reach
export const SECONDARY_KEYWORDS = [
  "gajanan maharaj sansthan",
  "shegaon temple",
  "devotee accommodation",
  "temple rooms booking",
  "pilgrimage stay maharashtra",
  "pandharpur temple accommodation",
  "hindu temple lodging",
] as const;

// Long-tail keywords for specific queries
export const LONGTAIL_KEYWORDS = [
  "how to book accommodation at gajanan maharaj temple",
  "shegaon bhakt niwas room booking",
  "family accommodation near shegaon temple",
  "gajanan maharaj temple stay facilities",
  "book dharamshala near pandharpur",
] as const;

// Location-specific keywords
export const LOCATION_KEYWORDS = {
  shegaon: [
    "shegaon temple booking",
    "bhakt niwas shegaon",
    "anand vihar shegaon",
    "shegaon accommodation",
    "shegaon dharamshala",
  ],
  pandharpur: [
    "pandharpur temple stay",
    "pandharpur accommodation",
    "gajanan math pandharpur",
  ],
  trimbakeshwar: [
    "trimbakeshwar accommodation",
    "trimbakeshwar jyotirlinga stay",
  ],
  omkareshwar: [
    "omkareshwar bhakt niwas",
    "omkareshwar temple accommodation",
  ],
} as const;

// Combine all keywords for global use
export const ALL_KEYWORDS = [
  ...PRIMARY_KEYWORDS,
  ...SECONDARY_KEYWORDS,
  ...LONGTAIL_KEYWORDS,
  ...Object.values(LOCATION_KEYWORDS).flat(),
] as const;

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
