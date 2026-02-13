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
import { MapPin, Clock, Smartphone } from "lucide-react";
import { CONTACT_DETAILS } from "@/data/contact";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata({
  title: "Contact Us | Shri Gajanan Maharaj Sansthan",
  description: "Get in touch with Shri Gajanan Maharaj Sansthan. Find phone numbers, address, and office hours for booking inquiries and general information. Located in Shegaon, Maharashtra.",
  keywords: [
    "gajanan maharaj contact",
    "shegaon temple phone number",
    "bhakt niwas booking contact",
    "sansthan address",
    "temple office hours",
  ],
  path: "/contact",
});

export default function ContactPage() {
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

        <div className="h-full min-h-[400px] bg-muted rounded-xl overflow-hidden relative border">
          {/* Placeholder for Map */}
          <div className="absolute inset-0 flex items-center justify-center bg-brand-saffron/5">
             <p className="text-muted-foreground font-medium">Google Map Embed Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
