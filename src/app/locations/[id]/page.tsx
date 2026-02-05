/**
 * File: src/app/locations/[id]/page.tsx
 * Module: locations
 * Purpose: Location detail page with facilities and booking CTA.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Booking CTA routes to the booking request flow.
 * - Table/mobile layout + image optimization will be refined in performance polish.
 */
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { sansthanLocations } from "@/data/sansthan-data";
import { AmenityList } from "@/features/locations/components/AmenityList";
import { MapPin, Phone, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const location = sansthanLocations.find((l) => l.id === id);

  if (!location) {
    notFound();
  }

  return (
    <div className="container py-12">
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
                  alt={location.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-center"
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
              <CardTitle>Booking Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                asChild
                className="w-full bg-brand-saffron hover:bg-brand-saffron/90 text-white h-12 text-lg"
              >
                <Link href={`/booking?location=${location.id}`}>Book Accommodation</Link>
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
  );
}
