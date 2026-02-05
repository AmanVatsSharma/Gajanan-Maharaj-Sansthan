/**
 * File: src/features/locations/components/LocationCard.tsx
 * Module: locations
 * Purpose: Location preview card with CTAs for details/booking.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Uses `Button asChild` for Links to avoid nested interactive elements.
 * - Uses Next `Image` for optimized rendering and better CLS.
 */
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Location } from "@/data/sansthan-data";
import { MapPin, ArrowRight } from "lucide-react";

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Card className="group overflow-hidden flex flex-col h-full border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
      <div className="aspect-video bg-muted relative overflow-hidden">
         <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
         {/* Image placeholder or actual image */}
         {location.images[0] ? (
            <Image
              src={location.images[0]}
              alt={location.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            />
         ) : (
            <div className="w-full h-full bg-brand-saffron/10 flex items-center justify-center text-brand-maroon/40 font-medium">
               <span className="bg-white/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">Image Coming Soon</span>
            </div>
         )}
         <div className="absolute bottom-3 left-3 z-20">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-md">
              <MapPin className="h-3 w-3 mr-1" />
              {location.city}
            </span>
         </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-brand-maroon font-heading group-hover:text-brand-saffron transition-colors">
          {location.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="grow">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {location.description}
        </p>
      </CardContent>
      <CardFooter className="gap-3 pt-2">
        <Button
          asChild
          variant="outline"
          className="flex-1 border-brand-maroon/20 hover:bg-brand-maroon/5 hover:text-brand-maroon group/btn"
        >
          <Link href={`/locations/${location.id}`}>Details</Link>
        </Button>
        <Button
          asChild
          className="flex-1 bg-brand-saffron hover:bg-brand-saffron/90 text-white shadow-sm hover:shadow-md transition-all"
        >
          <Link href={`/booking?location=${location.id}`}>
            Book Now <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
