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
import { ImpactStats } from "@/features/info/components/ImpactStats";
import { Features } from "@/features/info/components/Features";
import { FeaturedLocations } from "@/features/info/components/FeaturedLocations";
import { Testimonials } from "@/features/info/components/Testimonials";
import { PlanYourVisit } from "@/features/info/components/PlanYourVisit";
import { CTABanner } from "@/features/info/components/CTABanner";
import { SectionDivider } from "@/features/info/components/SectionDivider";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ImpactStats />
      <SectionDivider variant="ornate" />
      <Features />
      <SectionDivider variant="default" />
      <FeaturedLocations />
      <SectionDivider variant="ornate" />
      <Testimonials />
      <SectionDivider variant="minimal" />
      <PlanYourVisit />
      <CTABanner />
    </div>
  );
}

