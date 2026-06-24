import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL, localBusinessSchemaBase } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Service | LBow Network Solutions',
  description:
    'Terms of Service for LBow Network Solutions — PPR pipe fitting dealers in Bangalore. Our terms for product supply, delivery, and business transactions.',
  alternates: {
    canonical: `${BASE_URL}/terms-of-service`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: `${BASE_URL}/terms-of-service` },
  ],
};

export default function TermsOfService() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemaBase) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative w-full bg-[#0A0A0B] pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <nav className="font-body text-xs text-[#A6A6A6] mb-8 flex gap-2 items-center">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Terms of Service</span>
          </nav>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
            Terms of Service
          </h1>
          <p className="font-body text-sm text-[#A6A6A6] mb-12">
            Last updated: June 2026
          </p>

          <div className="font-body text-[#A6A6A6] space-y-8">
            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing our website or placing an order with LBow Network Solutions, you agree to these Terms of Service. If you do not agree, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">2. Products and Services</h2>
              <p>
                LBow Network Solutions supplies PPR, PPRC, PPCH industrial pipes and fittings, and Prince Pipes branded products (as an Authorized Dealer, certificate valid 2025–2027). Product specifications, availability, and pricing are subject to change without notice. No prices are published on this website — contact us for current pricing.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">3. Orders and Payment</h2>
              <p>
                All orders are subject to availability confirmation. We accept Net Banking, Cheque, Demand Draft, UPI, and Cash. Orders are confirmed upon receipt of payment or agreed credit terms. We reserve the right to decline or cancel orders at our discretion.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">4. Delivery</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Free delivery is provided within 22km of our T Dasarahalli, Bangalore location.</li>
                <li>Delivery charges apply for all locations outside the 22km free zone.</li>
                <li>Small orders outside the free zone are dispatched by courier; bulk orders by freight truck.</li>
                <li>There is no minimum order quantity.</li>
                <li>Delivery timelines are estimates and may be affected by logistics conditions.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">5. Product Warranty</h2>
              <p>
                Our industrial pipe and fitting products carry a 10-year warranty against manufacturing defects. This warranty does not cover damage resulting from improper installation, misuse, use outside specified temperature/pressure ratings, or external physical damage. Prince Pipes branded products carry the manufacturer&apos;s warranty terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">6. Returns and Complaints</h2>
              <p>
                Claims for defective or incorrect products must be notified within 7 days of receipt. Products must be returned in original condition for assessment. We will arrange replacement or credit for verified manufacturing defects. Return logistics for accepted claims will be managed by mutual agreement.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">7. Limitation of Liability</h2>
              <p>
                LBow Network Solutions&apos; liability for any claim is limited to the purchase price of the products involved. We are not liable for indirect, consequential, or incidental damages arising from product use or delivery delays.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">8. Governing Law</h2>
              <p>
                These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Bangalore, Karnataka.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">9. Contact</h2>
              <div className="mt-4 p-4 border border-white/10 rounded-lg">
                <p className="text-white font-semibold">LBow Network Solutions</p>
                <p>51/3, Officers Model Colony, T Dasarahalli, Bangalore – 560057</p>
                <p>Phone: <a href="tel:+919606419076" className="text-[#2E7D32] hover:underline">+91 9606419076</a></p>
                <p>Email: <a href="mailto:lbownetwork9solutions@gmail.com" className="text-[#2E7D32] hover:underline">lbownetwork9solutions@gmail.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
