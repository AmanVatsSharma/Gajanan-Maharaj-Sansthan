/**
 * @file page.tsx
 * @module app/(legal)/privacy-policy
 * @description Privacy Policy page
 * @author BharatERP
 * @created 2026-02-13
 */

import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Gajanan Maharaj Sansthan regarding data collection and usage.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="lead">Last Updated: February 2026</p>

      <p>
        At Gajanan Maharaj Sansthan, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, and postal address when you register for services, make a donation, or book accommodation.</li>
        <li><strong>Payment Information:</strong> Transaction details when you make a donation or booking. Note that we do not store credit/debit card numbers; these are processed securely by our payment gateway partners.</li>
        <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage data through cookies and analytics tools.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information for the following purposes:</p>
      <ul>
        <li>To process donations and issue receipts.</li>
        <li>To manage accommodation bookings and devotee services.</li>
        <li>To communicate with you regarding updates, events, and Sansthan activities.</li>
        <li>To improve our website functionality and user experience.</li>
        <li>To comply with legal obligations and regulatory requirements.</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>
        We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website and conducting our activities, subject to strict confidentiality agreements. We may also disclose information if required by law.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet is 100% secure.
      </p>

      <h2>5. Cookies</h2>
      <p>
        Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, but this may limit certain features of the website.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to access, correct, or request the deletion of your personal information held by us. Please contact us if you wish to exercise these rights.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at:
      </p>
      <p>
        <strong>Email:</strong> <a href="mailto:contact@gajananmaharaj.org">contact@gajananmaharaj.org</a>
      </p>
    </>
  );
}
