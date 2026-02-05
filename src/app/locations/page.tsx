import { LocationCard } from "@/features/locations/components/LocationCard";
import { sansthanLocations } from "@/data/sansthan-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function LocationsPage() {
  return (
    <div className="container py-12">
      <ScrollReveal>
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold font-heading text-brand-maroon mb-4">Sansthan Locations</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Accommodations managed by Shri Gajanan Maharaj Sansthan across various holy places.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sansthanLocations.map((location, index) => (
          <ScrollReveal key={location.id} delay={index * 0.1} className="h-full">
            <LocationCard location={location} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
