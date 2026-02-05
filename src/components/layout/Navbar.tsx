"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-500",
      isScrolled 
        ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md py-2" 
        : "bg-background/50 border-transparent py-4 backdrop-blur-sm"
    )}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className={cn(
              "font-bold text-brand-saffron font-heading transition-all duration-300",
              isScrolled ? "text-xl" : "text-2xl"
            )}>
              Shri Gajanan Maharaj Sansthan
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-brand-saffron transition-colors">
            Home
          </Link>
          <Link href="/locations" className="text-sm font-medium hover:text-brand-saffron transition-colors">
            Locations
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-brand-saffron transition-colors">
            About Sansthan
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-brand-saffron transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/booking">
            <Button className={cn(
              "hidden md:inline-flex bg-brand-saffron hover:bg-brand-saffron/90 text-white transition-all duration-300",
              isScrolled ? "h-9 px-4 text-sm" : "h-10 px-6"
            )}>
              Book Accommodation
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
