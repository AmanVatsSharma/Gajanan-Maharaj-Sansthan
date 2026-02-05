/**
 * File: src/features/info/components/ImpactStats.tsx
 * Module: info
 * Purpose: Display impact statistics with animated counters.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Features animated number counting effect on scroll into view
 * - Shows key metrics about Sansthan's service and reach
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Users, Home, Utensils } from "lucide-react";

interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const stats: Stat[] = [
  {
    id: "years",
    value: 116,
    suffix: "+",
    label: "Years of Service",
    icon: Heart,
    description: "Serving devotees since 1908",
  },
  {
    id: "devotees",
    value: 1,
    suffix: "M+",
    label: "Annual Devotees",
    icon: Users,
    description: "Millions visit every year",
  },
  {
    id: "locations",
    value: 6,
    suffix: "+",
    label: "Holy Locations",
    icon: Home,
    description: "Across sacred pilgrimage sites",
  },
  {
    id: "prasad",
    value: 10000,
    suffix: "+",
    label: "Daily Prasad",
    icon: Utensils,
    description: "Servings distributed daily",
  },
];

interface CounterProps {
  end: number;
  duration?: number;
}

function Counter({ end, duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(countRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView, end, duration]);

  return <span ref={countRef}>{count.toLocaleString()}</span>;
}

export function ImpactStats() {
  return (
    <section className="relative py-20 md:py-28 bg-linear-to-b from-background via-brand-saffron/5 to-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-[10%] w-64 h-64 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="absolute bottom-10 right-[10%] w-64 h-64 rounded-full bg-brand-maroon/10 blur-3xl" />
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
          <div className="inline-block px-4 py-1 rounded-full bg-brand-saffron/10 border border-brand-saffron/20 mb-4">
            <span className="text-brand-maroon font-semibold text-sm uppercase tracking-wider">
              Our Impact
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-maroon mb-4">
            Serving with Devotion
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuing the legacy of Shri Gajanan Maharaj through dedicated service to humanity
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full bg-card rounded-2xl p-8 border border-border/50 hover:border-brand-saffron/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-brand-saffron/0 via-brand-gold/0 to-brand-maroon/0 group-hover:from-brand-saffron/5 group-hover:via-brand-gold/5 group-hover:to-brand-maroon/5 transition-all duration-500" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-saffron/10 group-hover:bg-brand-saffron/20 transition-colors duration-300">
                      <Icon className="h-8 w-8 text-brand-saffron" />
                    </div>

                    {/* Number */}
                    <div className="mb-2">
                      <span className="text-5xl md:text-6xl font-bold font-heading text-brand-maroon">
                        <Counter end={stat.value} />
                        {stat.suffix}
                      </span>
                    </div>

                    {/* Label */}
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {stat.label}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 rounded-full bg-brand-gold/10 blur-2xl group-hover:bg-brand-gold/20 transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-brand-gold/50" />
            <div className="w-2 h-2 rounded-full bg-brand-gold" />
            <div className="w-8 h-px bg-brand-gold/50" />
            <div className="w-2 h-2 rounded-full bg-brand-gold" />
            <div className="w-12 h-px bg-linear-to-l from-transparent to-brand-gold/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
