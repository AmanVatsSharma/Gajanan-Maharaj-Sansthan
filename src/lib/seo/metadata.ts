/**
 * File: src/lib/seo/metadata.ts
 * Module: lib/seo
 * Purpose: Helper functions for generating page-specific metadata
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Provides consistent metadata generation across pages
 * - Includes Open Graph and Twitter Card support
 */

import type { Metadata } from "next";
import { SITE_CONFIG, OG_IMAGE_DIMENSIONS } from "./constants";

interface PageMetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  path?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

/**
 * Generate metadata for a page with SEO best practices
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image = "/images/shegaon-temple.jpg",
  path = "",
  noIndex = false,
  type = "website",
}: PageMetadataProps): Metadata {
  const fullUrl = `${SITE_CONFIG.url}${path}`;
  const fullTitle = `${title} | ${SITE_CONFIG.name}`;

  const metadata: Metadata = {
    title,
    description,
    keywords,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type,
      images: [
        {
          url: image,
          width: OG_IMAGE_DIMENSIONS.width,
          height: OG_IMAGE_DIMENSIONS.height,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };

  // Add robots meta if noIndex is true
  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: true,
    };
  }

  return metadata;
}

/**
 * Generate metadata for location pages
 */
export function generateLocationMetadata(
  locationName: string,
  locationCity: string,
  locationDescription: string,
  locationImage: string,
  locationId: string,
  keywords: string[] = []
): Metadata {
  const title = `${locationName} - ${locationCity} Temple Accommodation`;
  const description = `Book accommodation at ${locationName}, ${locationCity}. ${locationDescription} Check facilities, amenities, and make booking requests.`;

  return generatePageMetadata({
    title,
    description,
    keywords: [
      ...keywords,
      `${locationCity} temple accommodation`,
      `${locationCity} temple booking`,
      `${locationName}`,
      "dharamshala booking",
      "bhakt niwas",
    ],
    image: locationImage,
    path: `/locations/${locationId}`,
  });
}

/**
 * Add geo meta tags for location pages
 */
export function getGeoMetaTags(latitude: number, longitude: number) {
  return {
    "geo.position": `${latitude};${longitude}`,
    "geo.placename": SITE_CONFIG.name,
    "geo.region": "IN-MH",
  };
}
