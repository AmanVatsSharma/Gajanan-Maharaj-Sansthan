/**
 * File: src/app/booking/page.tsx
 * Module: booking
 * Purpose: Booking request page (WhatsApp/call workflow).
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - This page prepares a booking request; it does not confirm a booking.
 * - High-intent transactional page for accommodation bookings
 */
import { BookingWizard } from "@/features/booking/components/BookingWizard";
import { Suspense } from "react";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { PRIMARY_KEYWORDS, LONGTAIL_KEYWORDS } from "@/lib/seo/constants";

export const metadata = generatePageMetadata({
  title: "Book Accommodation | Temple Stay Booking Request",
  description: "Book temple accommodation at Shri Gajanan Maharaj Sansthan locations. Submit your booking request for Bhakt Niwas in Shegaon, Pandharpur, Trimbakeshwar, and Omkareshwar. Family-friendly facilities with traditional hospitality.",
  keywords: [...PRIMARY_KEYWORDS, ...LONGTAIL_KEYWORDS, "book temple room", "dharamshala reservation"],
  path: "/booking",
});

export default function BookingPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-heading text-brand-maroon mb-2">Accommodation Booking Request</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Fill the details below to prepare a WhatsApp request or call the booking helpline.
          Final confirmation is provided by the Sansthan office based on availability and rules.
        </p>
      </div>
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingWizard />
      </Suspense>
    </div>
  );
}
