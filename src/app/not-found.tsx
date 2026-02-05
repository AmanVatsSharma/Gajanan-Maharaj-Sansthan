/**
 * File: src/app/not-found.tsx
 * Module: app
 * Purpose: Premium 404 page with helpful navigation.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Keep the copy calm and spiritual; provide clear next actions.
 */
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center space-y-6">
        <div className="inline-flex items-center justify-center rounded-full border border-brand-gold/40 bg-background/60 px-4 py-1 text-xs font-medium tracking-wider text-brand-maroon backdrop-blur-sm">
          404 • Page Not Found
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-maroon text-balance">
          This page is not available
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed">
          The page you&apos;re looking for may have moved or no longer exists. Please use the options
          below to continue.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button asChild variant="premium" className="h-12 rounded-full px-6 text-base">
            <Link href="/">Go to Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full px-6 text-base border-brand-maroon/20"
          >
            <Link href="/locations">View Locations</Link>
          </Button>
          <Button asChild variant="ghost" className="h-12 rounded-full px-6 text-base">
            <Link href="/booking">Booking Request</Link>
          </Button>
        </div>

        <p className="pt-4 text-sm text-muted-foreground italic">&quot;Gan Gan Ganaat Bote&quot;</p>
      </div>
    </div>
  );
}

