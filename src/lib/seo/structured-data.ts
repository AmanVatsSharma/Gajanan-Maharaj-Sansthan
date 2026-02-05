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

/**
 * Main Organization schema for the Sansthan
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}#organization`,
    name: ORGANIZATION_INFO.legalName,
    alternateName: ORGANIZATION_INFO.alternateName,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}${ORGANIZATION_INFO.logo}`,
      width: 512,
      height: 512,
    },
    description: SITE_CONFIG.description,
    foundingDate: ORGANIZATION_INFO.address,
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
 * Place of Worship schema for temple locations
 */
export function getPlaceOfWorshipSchema(location: Location) {
  const baseUrl = SITE_CONFIG.url;
  
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
  const baseUrl = SITE_CONFIG.url;
  
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
  const baseUrl = SITE_CONFIG.url;
  
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
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
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
      url: SITE_CONFIG.url,
    },
    isAccessibleForFree: true,
  };
}
