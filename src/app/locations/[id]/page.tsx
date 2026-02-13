/**
 * File: src/app/locations/[id]/page.tsx
 * Module: locations
 * Purpose: Location detail page with facilities and booking CTA.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Booking CTA routes to the booking request flow.
 * - Dynamic metadata generation for each location
 * - Includes structured data for local SEO
 */
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { sansthanLocations } from "@/data/sansthan-data";
import { AmenityList } from "@/features/locations/components/AmenityList";
import { MapPin, Phone, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateLocationMetadata } from "@/lib/seo/metadata";
import { LOCATION_KEYWORDS } from "@/lib/seo/constants";
import {
  getPlaceOfWorshipSchema,
  getLocalBusinessSchema,
  getLodgingBusinessSchema,
} from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Pre-render all known location pages for crawlability/performance.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return sansthanLocations.map((location) => ({
    id: location.id,
  }));
}

/**
 * Generate dynamic metadata for each location
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const location = sansthanLocations.find((l) => l.id === id);

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  const cityKey = location.city.toLowerCase() as keyof typeof LOCATION_KEYWORDS;
  const locationKeywords = LOCATION_KEYWORDS[cityKey] || [];

  return generateLocationMetadata(
    location.name,
    location.city,
    location.description,
    location.images[0] || "/images/shegaon-temple.jpg",
    location.id,
    [...locationKeywords] // Convert readonly array to mutable array
  );
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const location = sansthanLocations.find((l) => l.id === id);

  if (!location) {
    notFound();
  }

  // Generate structured data schemas for this location
  const placeOfWorshipSchema = getPlaceOfWorshipSchema(location);
  const localBusinessSchema = getLocalBusinessSchema(location);
  const lodgingBusinessSchema = getLodgingBusinessSchema(location);

  return (
    <>
      <StructuredData
        data={[placeOfWorshipSchema, localBusinessSchema, lodgingBusinessSchema]}
      />
      <div className="container py-12">
        <Breadcrumbs
          items={[
            { name: "Locations", url: "/locations" },
            { name: location.name, url: `/locations/${location.id}` },
          ]}
          className="mb-6"
        />
        <Link href="/locations" className="inline-flex items-center text-sm text-muted-foreground hover:text-brand-saffron mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Locations
        </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-brand-maroon mb-2">{location.name}</h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-5 w-5 mr-2 text-brand-saffron" />
              {location.address}
            </div>
          </div>

          <div className="aspect-video bg-muted rounded-xl overflow-hidden relative">
             {location.images[0] ? (
                <Image
                  src={location.images[0]}
                  alt={`${location.name} ${location.city} - Temple accommodation building exterior and entrance view`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-center"
                  priority
                />
             ) : (
                <div className="w-full h-full bg-brand-saffron/10 flex items-center justify-center text-brand-maroon/50 font-medium text-lg">
                   Image Not Available
                </div>
             )}
          </div>

          <div>
            <h2 className="text-2xl font-bold font-heading text-brand-maroon mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              {location.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-heading text-brand-maroon mb-4">Facilities & Amenities</h2>
            <AmenityList amenities={location.amenities} />
          </div>
          
           <div>
            <h2 className="text-2xl font-bold font-heading text-brand-maroon mb-4">Room Types</h2>
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-[520px] w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-3 sm:p-4">Type</th>
                      <th className="p-3 sm:p-4">Capacity</th>
                      <th className="p-3 sm:p-4">AC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {location.facilities.map((facility, idx) => (
                      <tr key={idx}>
                        <td className="p-3 sm:p-4 font-medium">{facility.name}</td>
                        <td className="p-3 sm:p-4">{facility.capacity} Persons</td>
                        <td className="p-3 sm:p-4">{facility.ac ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Book Accommodation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                asChild
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white h-12 text-base"
              >
                <a
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`🙏 Jai Gajanan Maharaj 🙏\n\nAccommodation booking enquiry\nLocation: ${location.name}, ${location.city}\n\nKindly share availability and booking process.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`location_page:${location.id}`)}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Book on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full h-12 text-base border-brand-maroon/20"
              >
                <a
                  href={`tel:${CONTACT_DETAILS.booking.mobile.replace(/[^0-9+]/g, "")}`}
                  onClick={() => trackPhoneClick(CONTACT_DETAILS.booking.mobile, `location_page:${location.id}`)}
                >
                  <PhoneCall className="mr-2 h-5 w-5" />
                  Call to Book
                </a>
              </Button>
              <div className="text-xs text-muted-foreground text-center">
                * Booking subject to availability and Sansthan rules.
              </div>
            </CardContent>
          </Card>

          {location.contact.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {location.contact.map((phone, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-brand-saffron" />
                      {phone}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
