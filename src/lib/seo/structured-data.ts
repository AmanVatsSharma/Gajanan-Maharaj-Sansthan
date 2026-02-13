/**
 * File: src/lib/seo/structured-data.ts
 * Module: lib/seo
 * Purpose: JSON-LD structured data generators for rich snippets in Google
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Generates Organization, LocalBusiness, PlaceOfWorship, LodgingBusiness schemas
 * - Helps Google understand and display rich results in SERP
 * - All schemas follow schema.org standards
 */

import { Location } from "@/data/sansthan-data";
import {
  SITE_CONFIG,
  ORGANIZATION_INFO,
  SOCIAL_PROFILES,
} from "./constants";
import { getSiteUrl } from "./site-url";

/**
 * Main Organization schema for the Sansthan
 */
export function getOrganizationSchema() {
  const baseUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}#organization`,
    name: ORGANIZATION_INFO.legalName,
    alternateName: ORGANIZATION_INFO.alternateName,
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}${ORGANIZATION_INFO.logo}`,
      width: 512,
      height: 512,
    },
    description: SITE_CONFIG.description,
    foundingDate: `${SITE_CONFIG.foundingYear}-01-01`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION_INFO.address.streetAddress,
      addressLocality: ORGANIZATION_INFO.address.addressLocality,
      addressRegion: ORGANIZATION_INFO.address.addressRegion,
      postalCode: ORGANIZATION_INFO.address.postalCode,
      addressCountry: ORGANIZATION_INFO.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: ORGANIZATION_INFO.phone,
      email: ORGANIZATION_INFO.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "mr"],
    },
    sameAs: Object.values(SOCIAL_PROFILES),
  };
}

/**
 * WebSite schema for improved entity understanding
 */
export function getWebSiteSchema() {
  const baseUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    url: baseUrl,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    inLanguage: SITE_CONFIG.locale,
    publisher: {
      "@id": `${baseUrl}#organization`,
    },
  };
}

/**
 * Place of Worship schema for temple locations
 */
export function getPlaceOfWorshipSchema(location: Location) {
  const baseUrl = getSiteUrl();
  
  return {
    "@context": "https://schema.org",
    "@type": "PlaceOfWorship",
    "@id": `${baseUrl}/locations/${location.id}#place`,
    name: location.name,
    description: location.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.city === "Omkareshwar" ? "Madhya Pradesh" : "Maharashtra",
      addressCountry: "IN",
    },
    telephone: location.contact[0] || ORGANIZATION_INFO.phone,
    image: location.images.map((img) => `${baseUrl}${img}`),
    url: `${baseUrl}/locations/${location.id}`,
    isAccessibleForFree: true,
    publicAccess: true,
  };
}

/**
 * Local Business schema for each location
 */
export function getLocalBusinessSchema(location: Location) {
  const baseUrl = getSiteUrl();
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/locations/${location.id}#business`,
    name: `${location.name} - ${SITE_CONFIG.name}`,
    description: location.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.city === "Omkareshwar" ? "Madhya Pradesh" : "Maharashtra",
      addressCountry: "IN",
    },
    telephone: location.contact[0] || ORGANIZATION_INFO.phone,
    image: location.images.map((img) => `${baseUrl}${img}`),
    url: `${baseUrl}/locations/${location.id}`,
    priceRange: "Free-Donation Based",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    amenityFeature: location.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
  };
}

/**
 * Lodging Business schema for accommodation-focused SEO
 */
export function getLodgingBusinessSchema(location: Location) {
  const baseUrl = getSiteUrl();
  
  // Calculate total capacity
  const totalCapacity = location.facilities.reduce(
    (sum, facility) => sum + facility.capacity,
    0
  );

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${baseUrl}/locations/${location.id}#lodging`,
    name: `${location.name} Accommodation`,
    description: `Temple accommodation at ${location.name}, ${location.city}. ${location.description}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.city === "Omkareshwar" ? "Madhya Pradesh" : "Maharashtra",
      addressCountry: "IN",
    },
    telephone: location.contact[0] || ORGANIZATION_INFO.phone,
    image: location.images.map((img) => `${baseUrl}${img}`),
    url: `${baseUrl}/locations/${location.id}`,
    priceRange: "Donation Based",
    amenityFeature: location.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
    numberOfRooms: location.facilities.length,
    maximumAttendeeCapacity: totalCapacity,
    checkinTime: "00:00",
    checkoutTime: "23:59",
    petsAllowed: false,
    smokingAllowed: false,
  };
}

/**
 * Breadcrumb schema for navigation
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const baseUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * FAQ schema for booking questions
 */
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Review/Rating schema for testimonials
 */
export function getAggregateRatingSchema(
  itemName: string,
  ratingValue: number,
  reviewCount: number
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toFixed(1),
      bestRating: "5",
      worstRating: "1",
      ratingCount: reviewCount,
    },
  };
}

/**
 * Individual review schema
 */
export function getReviewSchema(
  reviewerName: string,
  reviewBody: string,
  ratingValue: number,
  datePublished?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: reviewerName,
    },
    reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: ratingValue.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: datePublished || new Date().toISOString().split("T")[0],
  };
}

/**
 * Event schema for special occasions (optional, for future use)
 */
export function getEventSchema(
  eventName: string,
  eventDescription: string,
  startDate: string,
  endDate: string,
  locationName: string,
  locationAddress: string
) {
  const baseUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventName,
    description: eventDescription,
    startDate,
    endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: locationName,
      address: locationAddress,
    },
    organizer: {
      "@type": "Organization",
      name: ORGANIZATION_INFO.legalName,
      url: baseUrl,
    },
    isAccessibleForFree: true,
  };
}

/**
 * Interface for blog post data
 */
export interface BlogPost {
  title: string;
  date: string;
  slug: string;
  description?: string;
  author?: string;
  image?: string;
}

/**
 * Article/BlogPosting schema for blog posts
 */
export function getArticleSchema(post: BlogPost) {
  const baseUrl = getSiteUrl();
  const imageUrl = post.image 
    ? (post.image.startsWith("http") ? post.image : `${baseUrl}${post.image}`)
    : `${baseUrl}${ORGANIZATION_INFO.logo}`;
  
  // Use slug as is if it looks like a path, or append to /blog/
  const postUrl = post.slug.startsWith('/') 
    ? `${baseUrl}${post.slug}`
    : `${baseUrl}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline: post.title,
    description: post.description,
    image: [imageUrl],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": post.author ? "Person" : "Organization",
      name: post.author || ORGANIZATION_INFO.legalName,
      url: post.author ? undefined : baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_INFO.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}${ORGANIZATION_INFO.logo}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };
}
