/**
 * File: src/features/info/components/CTABanner.tsx
 * Module: info
 * Purpose: Final compelling CTA banner before footer.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Premium gradient background with decorative elements
 * - Strong final conversion opportunity
 */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, MapPin } from "lucide-react";

export function CTABanner() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-saffron via-brand-gold to-brand-maroon" />
      
      {/* Overlay pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-10 left-[10%] w-32 h-32 rounded-full bg-white/10 blur-2xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-[15%] w-40 h-40 rounded-full bg-white/10 blur-2xl"
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center text-white max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-1.5 md:gap-2 px-3.5 py-1.5 md:px-5 md:py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-6 md:mb-8"
          >
            <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="font-semibold text-xs md:text-sm uppercase tracking-wider">
              Begin Your Journey
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading mb-5 md:mb-6 px-4 leading-tight text-balance"
          >
            Experience Divine Grace and Spiritual Serenity
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto px-4 leading-relaxed"
          >
            Book your stay at our premium accommodations and immerse yourself in the spiritual atmosphere of Shri Gajanan Maharaj&apos;s divine presence.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4"
          >
            <Button
              asChild
              size="lg"
              className="min-w-[200px] sm:min-w-[240px] h-14 md:h-16 text-base md:text-lg rounded-full bg-white text-brand-maroon hover:bg-white/90 shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Link href="/booking">
                Book Accommodation
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[200px] sm:min-w-[240px] h-14 md:h-16 text-base md:text-lg rounded-full border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              <Link href="/locations">
                <MapPin className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Explore Locations
              </Link>
            </Button>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs md:text-sm text-white/70"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>Trusted Since 1908</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/30" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>1M+ Devotees Annually</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
