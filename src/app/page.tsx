/**
 * File: src/app/page.tsx
 * Module: app
 * Purpose: Premium spiritual home page with rich content sections.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Multi-section landing experience with storytelling flow
 * - Each section is independently animated and mobile-responsive
 */
import { Hero } from "@/features/info/components/Hero";
import { BookingCheckoutWidget } from "@/features/booking/components/BookingCheckoutWidget";
import { ImpactStats } from "@/features/info/components/ImpactStats";
import { Features } from "@/features/info/components/Features";
import { FeaturedLocations } from "@/features/info/components/FeaturedLocations";
import EnhancedRoomsSection from "@/features/info/components/EnhancedRoomsSection";
import { Testimonials } from "@/features/info/components/Testimonials";
import { PlanYourVisit } from "@/features/info/components/PlanYourVisit";
import { CTABanner } from "@/features/info/components/CTABanner";
import { SectionDivider } from "@/features/info/components/SectionDivider";
import { generatePageMetadata } from "@/lib/seo/metadata";
import {
  BRAND_VARIANTS,
  PRIMARY_KEYWORDS,
  SECONDARY_KEYWORDS,
  getUniqueKeywords,
} from "@/lib/seo/constants";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata = generatePageMetadata({
  title: "Shri Gajanan Maharaj Sansthan | Temple Accommodation & Booking",
  description: "Official website of Shri Gajanan Maharaj Sansthan, Shegaon. Book temple accommodation at multiple locations across Maharashtra and Madhya Pradesh. Experience spiritual peace with modern facilities.",
  keywords: getUniqueKeywords([
    ...BRAND_VARIANTS,
    ...PRIMARY_KEYWORDS,
    ...SECONDARY_KEYWORDS,
  ]),
  path: "/",
});

export default function Home() {
  const organizationSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();
  return (
    <>
      <StructuredData data={[organizationSchema, webSiteSchema]} />
      <div className="flex flex-col">
        <Hero />
        <BookingCheckoutWidget />
        <ImpactStats />
        <SectionDivider variant="ornate" />
        <Features />
        <SectionDivider variant="default" />
        <EnhancedRoomsSection />
        <SectionDivider variant="default" />
        <FeaturedLocations />
        <SectionDivider variant="ornate" />
        <Testimonials />
        <SectionDivider variant="minimal" />
        <PlanYourVisit />
        <CTABanner />
      </div>
    </>
  );
}

