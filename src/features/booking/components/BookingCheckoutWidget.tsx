/**
 * File: src/features/booking/components/BookingCheckoutWidget.tsx
 * Module: booking
 * Purpose: Home page inline checkout widget (location → Call).
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-06
 * Notes:
 * - Used on the homepage under the hero for a quick booking intent flow.
 * - This does not confirm a booking; it only helps devotees contact the office.
 */
"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, MapPin, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CONTACT_DETAILS } from "@/data/contact";
import { sansthanLocations } from "@/data/sansthan-data";
import { trackPhoneClick } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

export interface BookingCheckoutWidgetProps {
  className?: string;
  "data-testid"?: string;
}

/**
 * BookingCheckoutWidget
 *
 * A lightweight, homepage-friendly flow:
 * - pick location
 * - click “Check Availability”
 * - then call the helpline to check availability
 *
 * This keeps the action extremely simple (like the reference site),
 * while still offering the detailed wizard at `/booking`.
 */
export function BookingCheckoutWidget({ className, "data-testid": dataTestId }: BookingCheckoutWidgetProps) {
  const [locationId, setLocationId] = useState<string>("");
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const locationTriggerRef = useRef<HTMLButtonElement | null>(null);

  const selectedLocation = useMemo(() => {
    return sansthanLocations.find((loc) => loc.id === locationId) ?? null;
  }, [locationId]);

  const bookingCallHref = `tel:${CONTACT_DETAILS.booking.mobile.replace(/[^0-9+]/g, "")}`;

  const handleLocationChange = (value: string) => {
    setLocationId(value);
    setValidationError(null);
    // Keep the “Check Availability” step explicit to match the desired flow.
    setHasCheckedOut(false);
  };

  const handleCheckout = () => {
    if (!locationId) {
      setValidationError("Please select a location to continue.");
      setHasCheckedOut(false);
      locationTriggerRef.current?.focus();
      return;
    }

    setValidationError(null);
    setHasCheckedOut(true);
  };

  return (
    <section
      id="quick-checkout"
      aria-label="Check availability for booking"
      className={cn("relative -mt-14 md:-mt-20 lg:-mt-24 pb-10 md:pb-14", className)}
      data-testid={dataTestId}
    >
      <div className="container">
        <Card className="mx-auto max-w-5xl border-brand-saffron/20 shadow-2xl bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
          <CardHeader className="pb-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl text-brand-maroon">Check Availability</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Select your location, then call our helpline to check availability.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 md:gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="quick-checkout-location" className="text-brand-maroon">
                  Select Location
                </Label>
                <Select value={locationId} onValueChange={handleLocationChange}>
                  <SelectTrigger
                    id="quick-checkout-location"
                    ref={locationTriggerRef}
                    className={cn(
                      "h-12 text-base",
                      validationError ? "border-destructive focus:ring-destructive" : undefined
                    )}
                    aria-invalid={Boolean(validationError)}
                  >
                    <SelectValue placeholder="Choose a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {sansthanLocations.map((loc) => (
                      <SelectItem key={loc.id} value={loc.id}>
                        {loc.name}, {loc.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {validationError ? (
                  <p className="text-sm text-destructive" role="alert">
                    {validationError}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Tip: Keep your dates and guest count ready for faster assistance.
                  </p>
                )}
              </div>

              <Button
                type="button"
                variant="premium"
                className="h-12 rounded-full px-8 w-full md:w-auto"
                onClick={handleCheckout}
              >
                Check Availability
              </Button>
            </div>

            {selectedLocation ? (
              <div className="rounded-2xl border bg-muted/30 p-4 md:p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-xl bg-brand-saffron/10 p-2">
                    <MapPin className="h-5 w-5 text-brand-saffron" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-brand-maroon leading-tight">
                      {selectedLocation.name}
                      {selectedLocation.city ? <span className="text-muted-foreground font-medium">, {selectedLocation.city}</span> : null}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                      {selectedLocation.address}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {hasCheckedOut ? (
              <div className="pt-1">
                <Button
                  asChild
                  variant="premium"
                  className="h-12 rounded-full w-full sm:w-auto"
                >
                  <a
                    href={bookingCallHref}
                    aria-label="Call booking helpline"
                    onClick={() => trackPhoneClick(CONTACT_DETAILS.booking.mobile, `quick_checkout:${locationId || "unknown"}`)}
                  >
                    <PhoneCall className="h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed bg-muted/20 p-4 text-sm text-muted-foreground">
                Click <span className="font-medium text-brand-maroon">Check Availability</span> to reveal the Call option.
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-muted-foreground text-center sm:text-left">
              Final confirmation is provided by the Sansthan office based on availability and rules.
            </div>

            <Button asChild variant="ghost" className="h-10 rounded-full">
              <Link href="/locations">
                View Locations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

