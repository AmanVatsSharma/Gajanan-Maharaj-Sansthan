/**
 * File: src/features/info/components/Testimonials.tsx
 * Module: info
 * Purpose: Display devotee testimonials with elegant styling.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Features rotating testimonials with elegant quote styling
 * - Gold quotation marks and subtle animations
 */
"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="relative py-16 md:py-20 lg:py-28 bg-background overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-[15%] w-64 h-64 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-[15%] w-64 h-64 rounded-full bg-brand-saffron/20 blur-3xl" />
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
          <div className="inline-block px-3 py-1 md:px-4 rounded-full bg-brand-saffron/10 border border-brand-saffron/20 mb-3 md:mb-4">
            <span className="text-brand-maroon font-semibold text-xs md:text-sm uppercase tracking-wider">
              Devotee Experiences
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-brand-maroon mb-3 md:mb-4 px-4">
            What Devotees Say
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            Heartfelt experiences and blessings shared by devotees who visited our holy shrines
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-card rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-border/50 hover:border-brand-gold/30 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-brand-gold/0 via-brand-saffron/0 to-brand-maroon/0 group-hover:from-brand-gold/5 group-hover:via-brand-saffron/5 group-hover:to-brand-maroon/5 transition-all duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Decorative quote icon */}
                  <div className="mb-5 md:mb-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-gold/10 group-hover:bg-brand-gold/20 transition-colors duration-300">
                      <Quote className="h-5 w-5 md:h-6 md:w-6 text-brand-gold" />
                    </div>
                  </div>

                  {/* Quote text */}
                  <blockquote className="mb-5 md:mb-6">
                    <p className="text-foreground/90 leading-relaxed italic text-sm md:text-base">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </blockquote>

                  {/* Author info */}
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Decorative divider */}
                    <div className="w-10 md:w-12 h-px bg-linear-to-r from-brand-gold via-brand-saffron to-brand-maroon" />
                    
                    <div>
                      <p className="font-semibold text-brand-maroon text-sm md:text-base">
                        {testimonial.author}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-brand-gold/5 blur-2xl group-hover:bg-brand-gold/10 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spiritual quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="inline-flex flex-col items-center gap-2 md:gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 md:w-8 h-px bg-linear-to-r from-transparent to-brand-gold/50" />
              <div className="w-2 h-2 rounded-full bg-brand-gold" />
              <div className="w-6 md:w-8 h-px bg-linear-to-l from-transparent to-brand-gold/50" />
            </div>
            <p className="text-brand-maroon/80 font-serif italic text-base md:text-lg">
              &quot;Gan Gan Ganaat Bote&quot;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
