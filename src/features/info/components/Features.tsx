/**
 * File: src/features/info/components/Features.tsx
 * Module: info
 * Purpose: Display key Sansthan services with enhanced visual effects.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Enhanced with gradient overlays and hover lift effects
 * - Decorative top border pattern for premium feel
 */
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Utensils, Flower2, Bus } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const features: Feature[] = [
  {
    title: "Bhakta Niwas",
    description: "Clean and affordable accommodation for families visiting the holy shrine with modern amenities and spiritual atmosphere.",
    icon: Building2,
    color: "from-brand-saffron/10 to-brand-gold/10",
  },
  {
    title: "Mahaprasad",
    description: "Hygienic and nutritious prasad distribution for thousands of devotees daily, prepared with devotion and care.",
    icon: Utensils,
    color: "from-brand-maroon/10 to-brand-saffron/10",
  },
  {
    title: "Anand Sagar",
    description: "Spiritual and recreational park with meditation centers, beautiful gardens, and serene water features.",
    icon: Flower2,
    color: "from-brand-gold/10 to-brand-maroon/10",
  },
  {
    title: "Free Bus Service",
    description: "Complimentary transport between Railway Station, Bhakta Niwas, and Temple for devotee convenience.",
    icon: Bus,
    color: "from-brand-saffron/10 to-brand-gold/10",
  },
];

export function Features() {
  return (
    <section className="relative py-16 md:py-20 lg:py-28 bg-background overflow-hidden">
      {/* Decorative top border pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-brand-gold/40 to-transparent" />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-[5%] w-72 h-72 rounded-full bg-brand-saffron/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-[5%] w-72 h-72 rounded-full bg-brand-maroon/10 blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block px-3 py-1 md:px-4 rounded-full bg-brand-maroon/10 border border-brand-maroon/20 mb-3 md:mb-4">
            <span className="text-brand-maroon font-semibold text-xs md:text-sm uppercase tracking-wider">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-brand-maroon mb-3 md:mb-4 px-4">
            Serving with Devotion
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            Dedicated to the service of humanity and devotees with discipline, devotion, and dignity
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group h-full"
              >
                <Card className="relative h-full border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-card">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/10 to-transparent" />
                  
                  <CardHeader className="text-center pb-3 md:pb-4 pt-6 md:pt-8 px-4 md:px-6 relative z-10">
                    {/* Icon container */}
                    <motion.div 
                      className="mx-auto bg-brand-saffron/10 p-4 md:p-5 rounded-2xl mb-5 md:mb-6 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center group-hover:bg-brand-saffron/20 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-8 w-8 md:h-10 md:w-10 text-brand-saffron" />
                    </motion.div>
                    
                    <CardTitle className="text-lg md:text-xl font-bold text-brand-maroon group-hover:text-brand-maroon transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="text-center text-muted-foreground px-5 md:px-6 pb-6 md:pb-8 relative z-10">
                    <p className="leading-relaxed text-sm md:text-base">
                      {feature.description}
                    </p>
                  </CardContent>

                  {/* Decorative corner accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 -mr-12 -mb-12 rounded-full bg-brand-gold/5 blur-2xl group-hover:bg-brand-gold/10 transition-all duration-500" />
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-xs md:text-sm text-muted-foreground italic">
            &quot;Service to humanity is service to God&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}

