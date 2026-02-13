/**
 * @file page.tsx
 * @module app/(legal)/disclaimer
 * @description Disclaimer page
 * @author BharatERP
 * @created 2026-02-13
 */

import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Disclaimer",
  description: "Legal disclaimer for the Gajanan Maharaj Sansthan website.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <h1>Disclaimer</h1>
      <p className="lead">Last Updated: February 2026</p>

      <p>
        The information contained on this website is for general information purposes only. The information is provided by Gajanan Maharaj Sansthan, and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
      </p>

      <h2>1. External Links Disclaimer</h2>
      <p>
        Through this website, you are able to link to other websites which are not under the control of Gajanan Maharaj Sansthan. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
      </p>

      <h2>2. Professional Advice Disclaimer</h2>
      <p>
        The content provided on this website is not intended to be a substitute for professional advice. Always seek the advice of qualified professionals with any questions you may have regarding a medical condition, legal matter, or other professional concerns.
      </p>

      <h2>3. Limitation of Liability</h2>
      <p>
        In no event will Gajanan Maharaj Sansthan be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
      </p>

      <h2>4. Changes to This Disclaimer</h2>
      <p>
        We reserve the right to modify this disclaimer at any time without prior notice.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have any questions about this disclaimer, please contact us at:
      </p>
      <p>
        <strong>Email:</strong> <a href="mailto:contact@gajananmaharaj.org">contact@gajananmaharaj.org</a>
      </p>
    </>
  );
}
