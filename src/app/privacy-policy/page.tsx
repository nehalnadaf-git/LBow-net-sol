import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL, localBusinessSchemaBase } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy | LBow Network Solutions',
  description:
    'Privacy Policy for LBow Network Solutions — PPR pipe fitting dealers in Bangalore. Learn how we collect, use and protect your information.',
  alternates: {
    canonical: `${BASE_URL}/privacy-policy`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${BASE_URL}/privacy-policy` },
  ],
};

export default function PrivacyPolicy() {
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
            <span className="text-white">Privacy Policy</span>
          </nav>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
            Privacy Policy
          </h1>
          <p className="font-body text-sm text-[#A6A6A6] mb-12">
            Last updated: June 2026
          </p>

          <div className="prose prose-invert prose-sm sm:prose-base max-w-none font-body text-[#A6A6A6] space-y-8">
            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">1. Introduction</h2>
              <p>
                LBow Network Solutions (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your personal
                information. This Privacy Policy explains how we collect, use, disclose, and safeguard
                information when you visit our website{' '}
                <Link href="/" className="text-[#2E7D32] hover:underline">lbownetworksolutions.com</Link>{' '}
                or contact us for products and services.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong className="text-white">Contact Information:</strong> Name, phone number, email address, and business name when you submit an enquiry form or contact us directly.</li>
                <li><strong className="text-white">Usage Data:</strong> Browser type, IP address, pages visited, and time spent on pages — collected automatically via standard web server logs.</li>
                <li><strong className="text-white">Communication Records:</strong> Records of calls, WhatsApp messages, and email correspondence related to product enquiries and orders.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Respond to enquiries and provide quotations for products and services</li>
                <li>Process and fulfil orders</li>
                <li>Send order confirmations and delivery information</li>
                <li>Improve our website and services</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
              <p className="mt-4">
                We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">4. Information Sharing</h2>
              <p>
                We may share your information with logistics and courier partners solely for the purpose of delivering your orders. We may also disclose information when required by Indian law or legal process.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">5. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your information from unauthorised access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">6. Cookies</h2>
              <p>
                Our website may use cookies and similar technologies for basic functionality and analytics. You can control cookie settings through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">7. Your Rights</h2>
              <p>
                You have the right to access, correct, or request deletion of your personal information that we hold. To exercise these rights, contact us at{' '}
                <a href="mailto:lbownetwork9solutions@gmail.com" className="text-[#2E7D32] hover:underline">
                  lbownetwork9solutions@gmail.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-xl text-white mb-3">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, contact us at:
              </p>
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
