/**
 * File: src/features/info/components/Hero.tsx
 * Module: info
 * Purpose: Premium hero section with primary CTAs.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Background image is currently a local placeholder from `public/gallery/`.
 * - CTAs use `Button asChild` to avoid nested interactive elements.
 */
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative flex min-h-[85vh] svh:min-h-[85svh] items-center justify-center overflow-hidden bg-brand-maroon/10">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/80 z-10" />
        <Image
          src="/gallery/0c23d827-555f-47ee-9cc8-f05072f21e48.jpeg"
          alt="Shri Gajanan Maharaj Temple, Shegaon"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-in fade-in duration-2000"
        />
      </div>

      <div className="container relative z-20 text-center text-white pt-20">
        <div className="inline-block mb-6 px-4 py-1 border border-brand-gold/50 rounded-full bg-black/30 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <span className="text-brand-gold font-medium tracking-wider text-sm uppercase">Official Website</span>
        </div>
        
        <h2 className="mb-4 text-2xl md:text-3xl font-medium tracking-wide text-brand-gold font-serif italic animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          || Gan Gan Ganaat Bote ||
        </h2>
        
        <h1 className="mb-8 text-4xl md:text-7xl lg:text-8xl font-bold font-heading shadow-sm text-transparent bg-clip-text bg-linear-to-b from-white to-white/90 drop-shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 text-balance motion-reduce:animate-none">
          Shri Gajanan Maharaj Sansthan
        </h1>
        
        <p className="mb-10 text-lg md:text-2xl text-gray-100 max-w-3xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          Experience spiritual serenity and divine grace. Plan your visit for Darshan and comfortable stay at our Bhakta Niwas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <Button asChild size="lg" variant="premium" className="min-w-[220px] text-lg h-14 rounded-full">
            <Link href="/booking">Book Accommodation</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm min-w-[220px] text-lg h-14 rounded-full hover:-translate-y-1 transition-all duration-300"
          >
            <Link href="/locations">View Locations</Link>
          </Button>
        </div>
      </div>
      
      {/* Decorative bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent z-20" />
    </div>
  )
}
