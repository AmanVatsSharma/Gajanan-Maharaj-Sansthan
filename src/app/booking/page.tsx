import { BookingWizard } from "@/features/booking/components/BookingWizard";
import { Suspense } from "react";

export default function BookingPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-heading text-brand-maroon mb-2">Book Accommodation</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Secure your stay at Shri Gajanan Maharaj Sansthan Bhakta Niwas.
          Please review the rules carefully before booking.
        </p>
      </div>
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingWizard />
      </Suspense>
    </div>
  );
}
