import type { Metadata } from 'next';
import Link from 'next/link';
import { faqs, faqCategories, getFAQsByCategory } from '@/lib/faqs';
import { generalWhatsAppUrl } from '@/lib/whatsapp';
import { BASE_URL, localBusinessSchemaBase } from '@/lib/seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PipeTopologyBg } from '@/components/backgrounds/PipeTopologyBg';

export const metadata: Metadata = {
  title: 'FAQ | PPR & PPCH Pipe Supplier Bangalore | LBow Network Solutions',
  description:
    'Frequently asked questions about PPR, PPRC, PPCH pipes, delivery, ordering, and Prince Pipes dealership at LBow Network Solutions, Bangalore. Call +91 8123501407.',
  alternates: { canonical: `${BASE_URL}/faq` },
  openGraph: {
    title: 'FAQ — PPR & PPCH Pipe Supplier Bangalore | LBow Network Solutions',
    description: 'Answers about PPR, PPRC, PPCH pipes, delivery, ordering, and Prince Pipes dealership in Bangalore.',
    url: `${BASE_URL}/faq`,
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'LBow Network Solutions FAQ' }],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${BASE_URL}/faq` },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemaBase) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section
        className="relative overflow-hidden w-full pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 text-center"
        style={{ background: 'linear-gradient(160deg, #F0F7F1 0%, #FAFFFE 35%, #EDF4FF 70%, #F4FBF5 100%)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none" style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)' }} />
        <PipeTopologyBg isLight={true} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="font-body font-medium text-xs sm:text-sm uppercase tracking-[0.1em] mb-4" style={{ color: '#2E7D32' }}>
            Help Centre
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-[3rem] lg:text-[3.5rem] leading-[1.1] mb-6" style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Frequently Asked Questions
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#3D5040' }}>
            Answers about our pipes, delivery, ordering, and Prince Pipes dealership.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative w-full bg-[#F8F9FA] py-16 sm:py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <nav className="font-body text-xs text-[#6B7280] mb-10 flex gap-2 items-center">
            <Link href="/" className="hover:text-[#0A0F1E] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0A0F1E]">FAQ</span>
          </nav>

          {faqCategories.map((category) => {
            const items = getFAQsByCategory(category);
            return (
              <div key={category} className="mb-12">
                <h2 className="font-heading font-semibold text-lg sm:text-xl text-[#0A0F1E] mb-6 pb-3 border-b border-[rgba(15,23,42,0.10)]">
                  {category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {items.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`${category}-${i}`}
                      className="border-b border-[rgba(15,23,42,0.06)]"
                    >
                      <AccordionTrigger className="text-[#0A0F1E] hover:text-[#2E7D32] text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#374151]">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}

          {/* Bottom CTA */}
          <div className="mt-12 p-6 sm:p-8 bg-white rounded-xl border border-[rgba(15,23,42,0.08)] text-center">
            <h3 className="font-heading font-semibold text-lg text-[#0A0F1E] mb-2">
              Still Have Questions?
            </h3>
            <p className="font-body text-sm text-[#374151] mb-5">
              Contact our team directly — we respond promptly during business hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+918123501407"
                className="inline-flex items-center justify-center gap-2 bg-[#0A0F1E] hover:bg-[#1a2035] text-white font-body font-semibold rounded-md px-6 py-3 transition-all duration-300 text-sm"
              >
                Call +91 8123501407
              </a>
              <a
                href={generalWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-body font-semibold rounded-md px-6 py-3 transition-all duration-300 text-sm"
              >
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F8F9FA] text-[#0A0F1E] border border-[rgba(15,23,42,0.15)] font-body font-semibold rounded-md px-6 py-3 transition-all duration-300 text-sm"
              >
                Contact Form →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
