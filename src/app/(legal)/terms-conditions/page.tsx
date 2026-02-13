/**
 * @file page.tsx
 * @module app/(legal)/terms-conditions
 * @description Terms & Conditions page
 * @author BharatERP
 * @created 2026-02-13
 */

import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions of use for Gajanan Maharaj Sansthan services.",
  path: "/terms-conditions",
});

export default function TermsConditionsPage() {
  return (
    <>
      <h1>Terms & Conditions</h1>
      <p className="lead">Last Updated: February 2026</p>

      <p>
        Welcome to the Gajanan Maharaj Sansthan website. By accessing or using our services, you agree to comply with and be bound by the following Terms & Conditions. Please read these terms carefully before using our website.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using our website, you signify your acceptance of these Terms & Conditions. If you do not agree with any part of these terms, please discontinue your use of the website immediately.
      </p>

      <h2>2. Use of Services</h2>
      <p>
        Our website provides information about the Sansthan, its activities, events, and services such as accommodation booking and donations. You agree to use the website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
      </p>

      <h2>3. Donations and Bookings</h2>
      <p>
        All donations made through our website are voluntary and non-refundable unless otherwise stated in our Refund Policy. Accommodation bookings are subject to availability and the specific rules and regulations of the Bhakt Niwas.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        All content on this website, including text, graphics, logos, images, and software, is the property of Gajanan Maharaj Sansthan or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without prior written consent.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        Gajanan Maharaj Sansthan shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages arising from your use of or inability to use the website or services. We strive to provide accurate and up-to-date information, but we make no warranties or representations regarding the accuracy or completeness of the content.
      </p>

      <h2>6. Links to Third-Party Sites</h2>
      <p>
        Our website may contain links to third-party websites for your convenience. We do not endorse or assume responsibility for the content, privacy policies, or practices of any third-party sites. Accessing them is at your own risk.
      </p>

      <h2>7. Modifications to Terms</h2>
      <p>
        We reserve the right to modify these Terms & Conditions at any time without prior notice. Your continued use of the website after any changes constitutes your acceptance of the new terms. Please review this page periodically for updates.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Buldhana, Maharashtra.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have any questions about these Terms & Conditions, please contact us at:
      </p>
      <p>
        <strong>Email:</strong> <a href="mailto:contact@gajananmaharaj.org">contact@gajananmaharaj.org</a>
      </p>
    </>
  );
}
