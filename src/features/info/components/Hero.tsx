/**
 * File: src/features/info/components/Hero.tsx
 * Module: info
 * Purpose: Premium hero section with parallax, animations, and decorative elements.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Features parallax scroll effect on background
 * - Enhanced animations with staggered reveals
 * - Decorative motifs for premium spiritual feel
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Hero() {
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative flex min-h-[90vh] svh:min-h-[90svh] items-center justify-center overflow-hidden">
      {/* Animated background with parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/50 to-black/80 z-10" />
        <Image
          src="/gallery/0c23d827-555f-47ee-9cc8-f05072f21e48.jpeg"
          alt="Shri Gajanan Maharaj Temple, Shegaon"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-110"
          quality={90}
        />
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10" />
      </motion.div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 right-[10%] w-32 h-32 rounded-full bg-brand-gold/5 blur-3xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-[15%] w-40 h-40 rounded-full bg-brand-saffron/5 blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <motion.div 
        className="container relative z-20 text-center text-white px-4 py-20"
        style={{ opacity }}
      >
        {/* Enhanced badge with glow effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block mb-8"
        >
          <div className="relative inline-flex items-center gap-2 px-5 py-2 border border-brand-gold/60 rounded-full bg-black/40 backdrop-blur-md shadow-lg">
            <motion.div
              className="absolute inset-0 rounded-full bg-brand-gold/20 blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Sparkles className="h-4 w-4 text-brand-gold relative z-10" />
            <span className="text-brand-gold font-semibold tracking-wider text-sm uppercase relative z-10">
              Official Website
            </span>
          </div>
        </motion.div>
        
        {/* Spiritual chant */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 text-2xl md:text-4xl font-medium tracking-wider text-brand-gold font-serif italic"
        >
          <span className="inline-block">|| Gan Gan Ganaat Bote ||</span>
        </motion.h2>
        
        {/* Main heading with enhanced gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6 text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/80 drop-shadow-2xl text-balance leading-tight"
        >
          Shri Gajanan Maharaj Sansthan
        </motion.h1>
        
        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12 text-lg md:text-2xl text-gray-100/90 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Experience spiritual serenity and divine grace. Plan your visit for Darshan and comfortable stay at our Bhakta Niwas.
        </motion.p>
        
        {/* CTA buttons with stagger animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            asChild 
            size="lg" 
            variant="premium" 
            className="min-w-[240px] text-lg h-16 rounded-full shadow-2xl shadow-brand-saffron/20 hover:shadow-brand-saffron/40 hover:scale-105 transition-all duration-300"
          >
            <Link href="/booking">Book Accommodation</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/40 backdrop-blur-md min-w-[240px] text-lg h-16 rounded-full hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <Link href="/locations">Explore Locations</Link>
          </Button>
        </motion.div>

        {/* Trust indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 text-sm text-gray-300/70 font-light"
        >
          Serving devotees since 1908
        </motion.p>
      </motion.div>
      
      {/* Enhanced decorative bottom with traditional motif pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-20">
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
        <svg
          className="absolute bottom-0 w-full h-8 text-background"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 Q300,0 600,20 T1200,20 L1200,40 L0,40 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
