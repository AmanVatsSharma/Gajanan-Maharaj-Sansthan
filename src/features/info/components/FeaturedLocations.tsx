/**
 * File: src/features/info/components/FeaturedLocations.tsx
 * Module: info
 * Purpose: Showcase featured Sansthan locations with visual appeal.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Features main locations with high-quality imagery
 * - Elegant hover effects and smooth transitions
 * - Mobile-responsive grid layout
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";

interface Location {
  id: string;
  name: string;
  city: string;
  description: string;
  image: string;
  highlight: string;
}

const featuredLocations: Location[] = [
  {
    id: "shegaon-bhakt-niwas",
    name: "Shegaon Bhakt Niwas",
    city: "Shegaon, Maharashtra",
    description: "The main pilgrimage center housing the holy Samadhi of Shri Gajanan Maharaj. Experience divine peace and spiritual serenity.",
    image: "/images/shegaon-temple.jpg",
    highlight: "Main Pilgrimage Center",
  },
  {
    id: "pandharpur-math",
    name: "Pandharpur Math",
    city: "Pandharpur, Maharashtra",
    description: "A sacred complex near the holy city of Pandharpur, offering devotees a peaceful stay during their pilgrimage to Lord Vitthal.",
    image: "/images/pandharpur.jpg",
    highlight: "Spiritual Retreat",
  },
  {
    id: "shegaon-anand-vihar",
    name: "Anand Sagar",
    city: "Shegaon, Maharashtra",
    description: "A beautiful spiritual and recreational park with meditation centers, gardens, and serene water features for peaceful contemplation.",
    image: "/images/anand-sagar.jpg",
    highlight: "Spiritual Garden",
  },
];

export function FeaturedLocations() {
  return (
    <section className="relative py-20 md:py-28 bg-linear-to-b from-background via-muted/30 to-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-[10%] w-96 h-96 rounded-full bg-brand-saffron/20 blur-3xl" />
        <div className="absolute bottom-20 left-[10%] w-96 h-96 rounded-full bg-brand-maroon/20 blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-4">
            <span className="text-brand-maroon font-semibold text-sm uppercase tracking-wider">
              Sacred Destinations
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-maroon mb-4">
            Our Locations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our facilities across holy pilgrimage sites, each offering peaceful accommodation and spiritual solace
          </p>
        </motion.div>

        {/* Locations grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative h-full bg-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Image container */}
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10" />
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="px-3 py-1.5 rounded-full bg-brand-gold/90 backdrop-blur-sm shadow-lg">
                      <span className="text-xs font-semibold text-white uppercase tracking-wide">
                        {location.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Location pin */}
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-white" />
                    <span className="text-sm font-medium text-white">
                      {location.city}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold font-heading text-brand-maroon mb-3 group-hover:text-brand-saffron transition-colors">
                    {location.name}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {location.description}
                  </p>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 rounded-full border-brand-maroon/20 hover:border-brand-saffron/40 hover:bg-brand-saffron/5 group/btn"
                    >
                      <Link href={`/locations/${location.id}`}>
                        <span>Explore</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="flex-1 rounded-full bg-brand-saffron hover:bg-brand-saffron/90 text-white shadow-md hover:shadow-lg"
                    >
                      <Link href={`/booking?location=${location.id}`}>
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Decorative gradient corner */}
                <div className="absolute bottom-0 right-0 w-32 h-32 -mr-16 -mb-16 rounded-full bg-brand-gold/10 blur-2xl group-hover:bg-brand-gold/20 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-brand-maroon/20 hover:border-brand-saffron/40 hover:bg-brand-saffron/5"
          >
            <Link href="/locations">
              View All Locations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
