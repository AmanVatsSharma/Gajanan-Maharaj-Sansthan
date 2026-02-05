import Link from "next/link"
import { CONTACT_DETAILS } from "@/data/contact"

export function Footer() {
  return (
    <footer className="relative bg-brand-maroon text-white">
      {/* Decorative Border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-gold via-brand-saffron to-brand-gold opacity-80" />
      
      <div className="container py-10 md:py-12 lg:py-16 pt-12 md:pt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-bold font-heading">Shri Gajanan Maharaj Sansthan</h3>
            <p className="text-sm text-gray-200 italic">
              &quot;Gan Gan Ganaat Bote&quot;
            </p>
            <p className="text-sm text-gray-200 leading-relaxed">
              Official website for devotee services and accommodation booking.
            </p>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><Link href="/" className="hover:text-brand-gold transition-colors">Home</Link></li>
              <li><Link href="/locations" className="hover:text-brand-gold transition-colors">Accommodation</Link></li>
              <li><Link href="/booking" className="hover:text-brand-gold transition-colors">Book Now</Link></li>
              <li><Link href="/about" className="hover:text-brand-gold transition-colors">History</Link></li>
            </ul>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">Locations</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>Shegaon</li>
              <li>Pandharpur</li>
              <li>Trimbakeshwar</li>
              <li>Omkareshwar</li>
              <li>Alandi</li>
            </ul>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">Contact</h4>
            <div className="text-sm text-gray-200 leading-relaxed">
              {CONTACT_DETAILS.headOffice.address.split(',').map((line, i, arr) => (
                <span key={i} className="block">
                  {line.trim()}{i < arr.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-200">
              Phone: {CONTACT_DETAILS.headOffice.phone}
            </p>
            <p className="text-sm text-gray-200">
              Mobile: {CONTACT_DETAILS.booking.mobile}
            </p>
          </div>
        </div>
        
        <div className="mt-10 md:mt-12 border-t border-white/10 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Shri Gajanan Maharaj Sansthan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
