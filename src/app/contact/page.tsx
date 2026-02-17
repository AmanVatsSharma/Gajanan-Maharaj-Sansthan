/**
 * File: src/app/contact/page.tsx
 * Module: app
 * Purpose: Contact page with office details, phone numbers, and location map
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Includes contact structured data for local SEO
 * - NAP (Name, Address, Phone) consistency maintained
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { MapPin, Clock, Smartphone, ExternalLink } from "lucide-react";
import { CONTACT_DETAILS } from "@/data/contact";
import { sansthanLocations } from "@/data/sansthan-data";
import { BRAND_VARIANTS, getUniqueKeywords } from "@/lib/seo/constants";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata({
  title: "Contact Us | Shri Gajanan Maharaj Sansthan",
  description: "Get in touch with Shri Gajanan Maharaj Sansthan. Find phone numbers, address, and office hours for booking inquiries and general information. Located in Shegaon, Maharashtra.",
  keywords: getUniqueKeywords([
    ...BRAND_VARIANTS,
    "gajanan maharaj contact",
    "shegaon temple phone number",
    "bhakt niwas booking contact",
    "sansthan address",
    "temple office hours",
  ]),
  path: "/contact",
});

export default function ContactPage() {
  const headOfficeMapLink = "https://maps.google.com/?q=Shri+Gajanan+Maharaj+Sansthan+Shegaon";

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold font-heading text-brand-maroon mb-8 text-center">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-saffron" />
                Head Office
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {CONTACT_DETAILS.headOffice.address.split(',').map((line, i) => (
                  <span key={i} className="block">{line.trim()},</span>
                ))}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-brand-saffron" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p className="font-medium text-brand-maroon">{CONTACT_DETAILS.booking.mobile}</p>
              <p className="text-sm">For booking and general inquiries (WhatsApp / Call)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-saffron" />
                Office Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monday - Sunday: 9:00 AM - 6:00 PM
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="h-full min-h-[400px] rounded-xl border bg-muted/20 p-5 sm:p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold font-heading text-brand-maroon">Find us on map</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Open trusted map links for directions to each Sansthan location.
              </p>
            </div>

            <Link
              href={headOfficeMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-maroon hover:text-brand-saffron transition-colors"
            >
              Open Head Office Map
              <ExternalLink className="h-4 w-4" />
            </Link>

            <div className="space-y-3 pt-1">
              {sansthanLocations.map((location) => (
                <div
                  key={location.id}
                  className="rounded-lg border bg-background p-3 sm:p-4 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm sm:text-base line-clamp-2">
                      {location.name}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {location.address}
                    </p>
                  </div>
                  <Link
                    href={location.googleMapsLink || headOfficeMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs sm:text-sm font-medium hover:border-brand-saffron/40 hover:text-brand-saffron transition-colors"
                  >
                    Map
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
