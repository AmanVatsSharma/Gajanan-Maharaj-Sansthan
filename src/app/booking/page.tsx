/**
 * File: src/app/booking/page.tsx
 * Module: app/booking
 * Purpose: SEO-focused booking landing page (WhatsApp + call based).
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-13
 * Notes:
 * - This page does not confirm bookings; it helps devotees contact the office with complete details.
 * - Includes FAQ schema (rich results) and breadcrumb schema for better SERP visibility.
 */

import { Suspense } from "react";
import Link from "next/link";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQ } from "@/components/seo/FAQ";
import { Button } from "@/components/ui/button";
import { bookingFAQs } from "@/data/faq";
import { BookingLandingForm } from "@/features/booking/components/BookingLandingForm";
import { LONGTAIL_KEYWORDS, PRIMARY_KEYWORDS } from "@/lib/seo/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata({
  title: "Accommodation Booking Request",
  description:
    "Send an accommodation booking request to Shri Gajanan Maharaj Sansthan, Shegaon. Select your location, dates, and guest count, then book via WhatsApp or call the booking helpline.",
  keywords: [
    ...PRIMARY_KEYWORDS,
    ...LONGTAIL_KEYWORDS,
    "bhakt niwas booking",
    "shegaon accommodation booking",
    "gajanan maharaj booking helpline",
  ],
  path: "/booking",
});

export default function BookingPage() {
  return (
    <div className="container py-12">
      <Breadcrumbs
        items={[{ name: "Booking", url: "/booking" }]}
        className="mb-6"
      />

      <div className="mx-auto max-w-5xl space-y-10">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-maroon text-balance">
            Accommodation Booking Request
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
            This is the official booking help page for devotees. Share your preferred location, dates,
            and guest count, then contact our office via WhatsApp or phone for availability and
            confirmation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full px-6 text-base border-brand-maroon/20"
            >
              <Link href="/locations">View Locations</Link>
            </Button>
            <Button
              asChild
              variant="premium"
              className="h-12 rounded-full px-6 text-base"
            >
              <a href="#booking-form">Send Request</a>
            </Button>
          </div>
        </header>

        <section id="booking-form" aria-label="Booking request form">
          <Suspense
            fallback={
              <div className="rounded-2xl border bg-background p-6 text-sm text-muted-foreground">
                Loading booking form…
              </div>
            }
          >
            <BookingLandingForm />
          </Suspense>
        </section>

        <section className="rounded-2xl border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-2xl font-bold font-heading text-brand-maroon mb-3">
            How booking works
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
            <li>Select your preferred location (Shegaon, Pandharpur, Trimbakeshwar, Omkareshwar).</li>
            <li>Share your dates and guest count.</li>
            <li>Send the request via WhatsApp or call. The office confirms based on availability.</li>
          </ol>
          <p className="mt-4 text-sm text-muted-foreground">
            For rules (families only, ID proof, minimum occupancy), please check the FAQs below.
          </p>
        </section>

        <section aria-label="Booking FAQs">
          <FAQ
            title="Booking FAQs"
            description="Common questions about accommodation rules, facilities, and the booking process."
            faqs={bookingFAQs}
          />
        </section>

        <section className="text-center text-sm text-muted-foreground">
          Need direct contact details? Visit{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-foreground">
            Contact
          </Link>
          .
        </section>
      </div>
    </div>
  );
}

