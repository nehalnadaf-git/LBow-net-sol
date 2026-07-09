import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { brands, getBrandBySlug } from '@/lib/brands';
import { BASE_URL, localBusinessSchemaBase } from '@/lib/seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle, Phone } from 'lucide-react';
import { brandWhatsAppUrl } from '@/lib/whatsapp';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  return {
    title: brand.metaTitle,
    description: brand.metaDescription,
    keywords: brand.keywords,
    alternates: {
      canonical: `${BASE_URL}/brands/${brand.slug}`,
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const paragraphs = brand.description.split('\n\n').filter((p) => p.trim().length > 0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: brand.faqs.map((faq) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Brands', item: `${BASE_URL}/brands` },
      { '@type': 'ListItem', position: 3, name: brand.name, item: `${BASE_URL}/brands/${brand.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemaBase) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section
        className="relative overflow-hidden w-full pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 text-center"
        style={{ background: 'linear-gradient(160deg, #F0F7F1 0%, #FAFFFE 35%, #EDF4FF 70%, #F4FBF5 100%)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none" style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)' }} />
        {/* Breadcrumb — inside section, safely below navbar */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-6 text-left">
          <nav className="font-body text-xs text-[#6B7280] flex gap-2 items-center">
            <Link href="/" className="hover:text-[#0A0F1E] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/brands" className="hover:text-[#0A0F1E] transition-colors">Brands</Link>
            <span>/</span>
            <span className="text-[#0A0F1E]">{brand.name}</span>
          </nav>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="font-body font-medium text-xs sm:text-sm uppercase tracking-[0.1em] text-[#2E7D32] mb-4">
            Authorized Dealer
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-[3rem] lg:text-[3.5rem] leading-[1.1] mb-6" style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {brand.tagline}
          </h1>
          <div className="inline-flex items-center gap-2 bg-[rgba(46,125,50,0.10)] text-[#2E7D32] px-5 py-2 rounded-full font-body text-sm font-medium mt-2">
            <CheckCircle size={16} />
            Certificate Valid {brand.dealershipDetails.certificateValidFrom}–{brand.dealershipDetails.certificateValidTo}
          </div>
        </div>
      </section>

      {/* Dealership Info + Description */}
      <section className="relative w-full bg-[#F8F9FA] py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-16">
            {/* Description */}
            <div>
              <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#6B7280] mb-4">
                About Our Dealership
              </div>
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-[#0A0F1E] mb-6 leading-tight">
                {brand.name} — Authorized Dealer in Bangalore
              </h2>
              <div className="space-y-4">
                {paragraphs.map((para, i) => {
                  const boldProcessed = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                  return (
                    <p
                      key={i}
                      className="font-body text-sm sm:text-base text-[#434343] leading-[1.75]"
                      dangerouslySetInnerHTML={{ __html: boldProcessed }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Dealer Certificate — Prince Pipes only */}
              {brand.slug === 'prince-pipes' && (
                <div className="rounded-xl overflow-hidden border border-[rgba(30,32,33,0.12)] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                  <div className="relative">
                    <Image
                      src="/images/dealer-certificate.jpeg"
                      alt="Prince Pipes Authorised Dealer Certificate — LBow Network Solutions 2025–2027"
                      width={800}
                      height={566}
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </div>
                  <div className="bg-white border-t border-[rgba(15,23,42,0.08)] px-4 py-3 flex items-center gap-2">
                    <CheckCircle size={13} className="text-[#2E7D32] flex-shrink-0" />
                    <span className="font-body text-xs text-[#6B7280]">
                      Verified Authorised Dealer · 2025–2027
                    </span>
                  </div>
                </div>
              )}

              {/* Dealership Certificate Details */}
              <div className="bg-white rounded-xl border border-[rgba(15,23,42,0.08)] p-5">
                <h3 className="font-heading font-semibold text-base text-[#0A0F1E] mb-4">
                  Dealership Certificate Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between gap-4 border-b border-[rgba(15,23,42,0.06)] pb-3">
                    <span className="font-body text-xs text-[#6B7280] uppercase tracking-[0.04em]">Issued By</span>
                    <span className="font-body text-xs text-[#0A0F1E] text-right">{brand.dealershipDetails.signedBy}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-[rgba(15,23,42,0.06)] pb-3">
                    <span className="font-body text-xs text-[#6B7280] uppercase tracking-[0.04em]">Designation</span>
                    <span className="font-body text-xs text-[#0A0F1E] text-right">{brand.dealershipDetails.designation}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-[rgba(15,23,42,0.06)] pb-3">
                    <span className="font-body text-xs text-[#6B7280] uppercase tracking-[0.04em]">Valid From</span>
                    <span className="font-body text-xs text-[#0A0F1E] text-right">{brand.dealershipDetails.certificateValidFrom}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-[rgba(15,23,42,0.06)] pb-3">
                    <span className="font-body text-xs text-[#6B7280] uppercase tracking-[0.04em]">Valid Until</span>
                    <span className="font-body text-xs text-[#0A0F1E] text-right">{brand.dealershipDetails.certificateValidTo}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-body text-xs text-[#6B7280] uppercase tracking-[0.04em]">Dealer City</span>
                    <span className="font-body text-xs text-[#0A0F1E] text-right">{brand.dealershipDetails.dealerCity}</span>
                  </div>
                </div>
              </div>

              {/* Product Range */}
              <div className="bg-white rounded-xl border border-[rgba(15,23,42,0.08)] p-5">
                <h3 className="font-heading font-semibold text-base text-[#0A0F1E] mb-4">
                  {brand.name} Products We Supply
                </h3>
                <ul className="space-y-2">
                  {brand.productRange.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <span className="font-body text-sm text-[#374151]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-[#EDF7EE] rounded-xl border border-[#2E7D32]/20 p-5 text-center">
                <h3 className="font-heading font-semibold text-base text-[#0A0F1E] mb-2">
                  Order {brand.name} Products
                </h3>
                <p className="font-body text-xs text-[#6B7280] mb-4">
                  Free demo available. No minimum order quantity.
                </p>
                <a
                  href="tel:+918123501407"
                  className="flex items-center justify-center gap-2 w-full text-center bg-[#0A0F1E] hover:bg-[#1a2035] text-white font-body font-semibold text-sm rounded-md px-5 py-2.5 transition-all duration-300 mb-3"
                >
                  <Phone size={15} />
                  Call +91 8123501407
                </a>
                <a
                  href={brandWhatsAppUrl(brand.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#25D366] hover:bg-[#128C7E] text-white font-body font-semibold text-sm rounded-md px-5 py-2.5 transition-all duration-300"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative w-full bg-[#F0F4F8] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#6B7280] mb-3">
            Common Questions
          </div>
          <h2 className="font-heading font-semibold text-xl sm:text-2xl text-[#0A0F1E] mb-8">
            FAQs — {brand.name} Dealership
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {brand.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-[#0A0F1E] hover:text-[#2E7D32]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#374151]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
