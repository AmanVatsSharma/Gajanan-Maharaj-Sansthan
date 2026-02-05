/**
 * File: src/components/analytics/GoogleAnalytics.tsx
 * Module: components/analytics
 * Purpose: Google Analytics 4 integration component
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Loads GA4 script with tracking ID from environment variables
 * - Only loads in production environment
 * - Follows Next.js Script component best practices
 */

"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  gaId: string;
}

/**
 * Google Analytics 4 tracking component
 * Add to root layout to enable site-wide tracking
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  // Only load GA in production or when explicitly enabled
  if (
    !gaId ||
    process.env.NODE_ENV !== "production" ||
    gaId === "GA_MEASUREMENT_ID"
  ) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track custom events to Google Analytics
 * Usage: trackEvent('booking_started', { location: 'shegaon' })
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
}

/**
 * Track page views manually (useful for client-side navigation)
 */
export function trackPageView(url: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
      page_path: url,
    });
  }
}
