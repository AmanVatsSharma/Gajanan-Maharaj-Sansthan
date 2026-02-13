/**
 * @file page.tsx
 * @module app/(legal)/refund-policy
 * @description Refund & Cancellation Policy page
 * @author BharatERP
 * @created 2026-02-13
 */

import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Refund & Cancellation Policy",
  description: "Policies regarding refunds, cancellations, and donations for Gajanan Maharaj Sansthan.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <>
      <h1>Refund & Cancellation Policy</h1>
      <p className="lead">Last Updated: February 2026</p>

      <p>
        At Gajanan Maharaj Sansthan, we understand that situations may arise where you need to modify or cancel your donation or accommodation booking. This Refund & Cancellation Policy outlines our procedures for such instances.
      </p>

      <h2>1. Donations</h2>
      <p>
        All donations made to Gajanan Maharaj Sansthan are voluntary and are generally non-refundable. We use these funds to support our various charitable and religious activities. However, in exceptional circumstances (e.g., technical errors during the transaction process), we may consider refund requests on a case-by-case basis. Please contact us immediately if you believe a donation was made in error.
      </p>

      <h2>2. Accommodation Bookings (Bhakt Niwas)</h2>
      <p>
        Cancellations and refunds for accommodation bookings are subject to the following terms:
      </p>
      <ul>
        <li><strong>Cancellation Request:</strong> To cancel a booking, please contact us via email or phone at least 24 hours before the scheduled check-in time.</li>
        <li><strong>Refund Eligibility:</strong> Refunds will be processed for eligible cancellations according to the Sansthan's prevailing rules. Typically, a cancellation fee may apply.</li>
        <li><strong>Processing Time:</strong> Approved refunds will be processed within 7-10 working days to the original payment method.</li>
        <li><strong>No-Show:</strong> Failure to check-in on the scheduled date without prior cancellation may result in forfeiture of the booking amount.</li>
      </ul>

      <h2>3. Event Registrations</h2>
      <p>
        Fees paid for event registrations or special services are generally non-refundable unless the event is cancelled by the Sansthan. In such cases, a full refund will be provided.
      </p>

      <h2>4. Changes to Policy</h2>
      <p>
        Gajanan Maharaj Sansthan reserves the right to modify this Refund & Cancellation Policy at any time. Any changes will be posted on this page with an updated date.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have any questions or need to request a refund or cancellation, please contact us at:
      </p>
      <p>
        <strong>Email:</strong> <a href="mailto:contact@gajananmaharaj.org">contact@gajananmaharaj.org</a>
      </p>
    </>
  );
}
