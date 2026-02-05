/**
 * File: src/app/error.tsx
 * Module: app
 * Purpose: Global error boundary UI for unexpected runtime errors.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Keep the message calm and actionable; avoid leaking internal details.
 */
"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center space-y-6">
        <div className="inline-flex items-center justify-center rounded-full border border-brand-gold/40 bg-background/60 px-4 py-1 text-xs font-medium tracking-wider text-brand-maroon backdrop-blur-sm">
          Something went wrong
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-maroon text-balance">
          We couldn&apos;t load this page
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed">
          Please try again. If the issue continues, you can return to the home page and continue from
          there.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            onClick={reset}
            variant="premium"
            className="h-12 rounded-full px-6 text-base"
          >
            Try again
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full px-6 text-base border-brand-maroon/20"
          >
            <Link href="/">Go to Home</Link>
          </Button>
        </div>

        {error?.digest ? (
          <p className="pt-4 text-xs text-muted-foreground">
            Reference: <span className="font-mono">{error.digest}</span>
          </p>
        ) : null}

        <p className="pt-2 text-sm text-muted-foreground italic">&quot;Gan Gan Ganaat Bote&quot;</p>
      </div>
    </div>
  );
}

