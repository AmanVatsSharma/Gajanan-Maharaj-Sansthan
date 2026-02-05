/**
 * File: src/components/ui/whatsapp-button.tsx
 * Module: ui
 * Purpose: Floating WhatsApp CTA button for quick contact.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-05
 * Notes:
 * - Uses `Button asChild` to render a single interactive element (anchor).
 */
import { WHATSAPP_LINK } from "@/data/contact";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppButton() {
  return (
    <Button
      asChild
      size="lg"
      className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 p-0 bg-[#25D366] hover:bg-[#128C7E] shadow-lg hover:shadow-xl transition-all hover:scale-110 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000"
    >
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-8 w-8 text-white" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </Button>
  );
}
