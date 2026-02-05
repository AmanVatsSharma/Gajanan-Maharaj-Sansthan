/**
 * File: src/components/layout/Navbar.tsx
 * Module: layout
 * Purpose: Premium sticky navbar with mobile drawer navigation.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Mobile navigation uses a Radix Dialog drawer (focus-trapped).
 * - Update `NAV_ITEMS` first when changing navigation structure.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, PhoneCall } from "lucide-react";

import { CONTACT_DETAILS, WHATSAPP_LINK } from "@/data/contact";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About Sansthan" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const bookingCallHref = `tel:${CONTACT_DETAILS.booking.mobile.replace(/[^0-9+]/g, "")}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-md py-2"
          : "bg-background/50 border-transparent py-4 backdrop-blur-sm"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span
            className={cn(
              "font-bold tracking-tight text-brand-saffron font-serif transition-all duration-300",
              isScrolled ? "text-xl" : "text-2xl"
            )}
          >
            Shri Gajanan Maharaj Sansthan
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-brand-saffron"
                  : "text-foreground/80 hover:text-brand-saffron"
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className={cn(
              "hidden md:inline-flex bg-brand-saffron hover:bg-brand-saffron/90 text-white transition-all duration-300",
              isScrolled ? "h-9 px-4 text-sm" : "h-10 px-6"
            )}
          >
            <Link href="/booking">Booking Request</Link>
          </Button>

          <Dialog open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="left-auto right-0 top-0 translate-x-0 translate-y-0 h-dvh w-[88vw] max-w-sm gap-0 p-0 rounded-none sm:rounded-l-2xl border-l">
              <DialogHeader className="p-6 pb-4 border-b text-left">
                <DialogTitle className="font-serif text-lg text-brand-maroon">
                  Shri Gajanan Maharaj Sansthan
                </DialogTitle>
                <p className="text-sm text-muted-foreground italic">
                  &quot;Gan Gan Ganaat Bote&quot;
                </p>
              </DialogHeader>

              <div className="p-6 space-y-6">
                <div className="space-y-1">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-brand-saffron/10 text-brand-maroon"
                          : "hover:bg-muted/60 text-foreground/80"
                      )}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="space-y-3">
                  <Button asChild variant="premium" className="w-full h-12 rounded-full text-base">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Book via WhatsApp
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-12 rounded-full text-base border-brand-maroon/20"
                  >
                    <a href={bookingCallHref} onClick={() => setIsMobileOpen(false)}>
                      <PhoneCall className="h-4 w-4" />
                      Call for Booking
                    </a>
                  </Button>

                  <div className="text-center text-xs text-muted-foreground">
                    Booking help: <span className="font-medium text-brand-maroon">{CONTACT_DETAILS.booking.mobile}</span>
                  </div>
                </div>

                <div className="rounded-xl border bg-muted/30 p-4 text-xs text-muted-foreground leading-relaxed">
                  For faster assistance, please keep your <span className="font-medium">dates</span>,{" "}
                  <span className="font-medium">location</span>, and <span className="font-medium">guest count</span>{" "}
                  ready while calling or messaging.
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
}
