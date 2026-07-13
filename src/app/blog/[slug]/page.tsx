import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getBlogBySlug } from '@/lib/blogs';
import { BASE_URL, localBusinessSchemaBase } from '@/lib/seo';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { generalWhatsAppUrl } from '@/lib/whatsapp';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: 'article',
      images: [{ url: `${BASE_URL}${post.image}`, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: (post as typeof post & { updatedAt?: string }).updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'LBow Network Solutions',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'LBow Network Solutions',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/web-app-manifest-512x512.png` },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  };

  // Convert markdown-like content to sections
  const sections = post.content.split(/\n---\n/).map((sec) => sec.trim()).filter(Boolean);

  // Other posts for "More Articles" sidebar
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  function renderSection(text: string, index: number) {
    const lines = text.split('\n').filter((l) => l.trim().length > 0);
    const elements: React.ReactNode[] = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${i}`} className="font-heading font-bold text-xl sm:text-2xl lg:text-[1.625rem] text-[#0A0F1E] mt-10 mb-4 first:mt-0 leading-snug">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} className="font-heading font-semibold text-lg text-[#0A0F1E] mt-6 mb-3 leading-snug">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith('| ')) {
        // Table
        const tableLines = [];
        while (i < lines.length && lines[i].startsWith('|')) {
          tableLines.push(lines[i]);
          i++;
        }
        i--;
        const rows = tableLines.filter((l) => !l.match(/^\|[-\s|]+\|$/));
        const [headerRow, ...bodyRows] = rows;
        const headerCells = headerRow?.split('|').filter((c) => c.trim() !== '') ?? [];
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-6 rounded-xl border border-[rgba(15,23,42,0.08)] shadow-sm">
            <table className="w-full text-sm font-body border-collapse">
              <thead>
                <tr className="bg-[#F0F4F8]">
                  {headerCells.map((cell, ci) => (
                    <th key={ci} className="px-5 py-3.5 border-b border-[rgba(15,23,42,0.08)] text-[#0A0F1E] text-left font-semibold text-sm">
                      {cell.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => {
                  const cells = row.split('|').filter((c) => c.trim() !== '');
                  return (
                    <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                      {cells.map((cell, ci) => (
                        <td key={ci} className="px-5 py-3 border-b border-[rgba(15,23,42,0.06)] text-[#374151] text-sm">
                          {cell.trim()}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      } else if (line.match(/^[-✅❌•]\s/)) {
        // List
        const listLines: string[] = [];
        while (i < lines.length && lines[i].match(/^[-✅❌•✓]\s/)) {
          listLines.push(lines[i]);
          i++;
        }
        i--;
        elements.push(
          <ul key={`ul-${i}`} className="space-y-2.5 my-5 pl-1">
            {listLines.map((item, li) => (
              <li key={li} className="font-body text-sm sm:text-base text-[#374151] leading-relaxed flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 text-base">
                  {item.startsWith('✅') ? '✅' : item.startsWith('❌') ? '❌' : (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-2" />
                  )}
                </span>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/^[-✅❌•✓]\s/, '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            ))}
          </ul>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <p key={`bold-${i}`} className="font-body font-semibold text-sm sm:text-base text-[#0A0F1E] mt-5 mb-2">
            {line.slice(2, -2)}
          </p>
        );
      } else if (line.trim().length > 0) {
        const processed = line
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#2E7D32] hover:underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>');
        elements.push(
          <p key={`p-${i}`} className="font-body text-sm sm:text-base text-[#374151] leading-[1.85] my-3"
            dangerouslySetInnerHTML={{ __html: processed }}
          />
        );
      }
      i++;
    }
    return <div key={index}>{elements}</div>;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemaBase) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden w-full pt-28 sm:pt-36 md:pt-44 pb-10 sm:pb-14"
        style={{ background: 'linear-gradient(160deg, #F0F7F1 0%, #FAFFFE 35%, #EDF4FF 70%, #F4FBF5 100%)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none" style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)' }} />
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          {/* Breadcrumb */}
          <nav className="font-body text-xs text-[#6B7280] flex gap-2 items-center mb-8">
            <Link href="/" className="hover:text-[#0A0F1E] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#0A0F1E] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#0A0F1E] line-clamp-1 max-w-[280px]">{post.title}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 font-body text-xs text-[#9CA3AF] mb-5">
              <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.publishedAt}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
            </div>
            <h1
              className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl leading-[1.1] mb-6"
              style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              {post.title}
            </h1>
            <p className="font-body text-base sm:text-lg text-[#374151] leading-relaxed mb-6 max-w-3xl">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span key={i} className="bg-[rgba(46,125,50,0.08)] text-[#2E7D32] rounded-full px-3 py-1 font-body text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Image ───────────────────────────────────────────────── */}
      <div className="w-full bg-[#F0F4F8]">
        <div className="max-w-[1700px] mx-auto">
          <div className="relative w-full h-[280px] sm:h-[380px] md:h-[480px] lg:h-[540px] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F8F9FA]/40 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── Article Content ──────────────────────────────────────────────── */}
      <section className="relative w-full bg-[#F8F9FA] py-14 sm:py-18 lg:py-24">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-10 lg:gap-16 xl:gap-20">

            {/* ── Main Article ─────────────────────────────────────────── */}
            <article className="min-w-0 bg-white rounded-2xl border border-[rgba(15,23,42,0.07)] shadow-sm p-7 sm:p-10 lg:p-12">
              {sections.map((section, i) => renderSection(section, i))}

              {/* Back link */}
              <div className="mt-14 pt-7 border-t border-[rgba(15,23,42,0.08)] flex items-center justify-between flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 font-body font-semibold text-sm text-[#374151] hover:text-[#0A0F1E] transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Blog
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-body font-semibold text-sm bg-[#2E7D32] hover:bg-[#256428] text-white px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  Get a Free Quote <ArrowRight size={14} />
                </Link>
              </div>
            </article>

            {/* ── Sidebar ──────────────────────────────────────────────── */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-[#EDF7EE] to-[#E8F4FD] rounded-2xl border border-[#2E7D32]/15 p-6 text-center shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#2E7D32]/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#0A0F1E] mb-2">
                  Get a Quote
                </h3>
                <p className="font-body text-sm text-[#374151] mb-5 leading-relaxed">
                  No minimum order. Free demo available — call or WhatsApp us.
                </p>
                <a
                  href="tel:+918123501407"
                  className="block w-full text-center bg-[#0A0F1E] hover:bg-[#1a2035] text-white font-body font-bold text-sm rounded-xl px-4 py-3 transition-all duration-300 mb-3 shadow-sm hover:shadow-md"
                >
                  +91 81235 01407
                </a>
                <a
                  href={generalWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#25D366] hover:bg-[#128C7E] text-white font-body font-bold text-sm rounded-xl px-4 py-3 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  WhatsApp Us
                </a>
              </div>

              {/* Related Products */}
              <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.07)] shadow-sm p-6">
                <h3 className="font-heading font-bold text-base text-[#0A0F1E] mb-4 pb-3 border-b border-[rgba(15,23,42,0.07)]">
                  Related Products
                </h3>
                <div className="space-y-1">
                  {post.relatedProducts.map((slug) => (
                    <Link
                      key={slug}
                      href={`/products/${slug}`}
                      className="flex items-center gap-2.5 font-body text-sm text-[#374151] hover:text-[#2E7D32] transition-colors py-2.5 border-b border-[rgba(15,23,42,0.05)] last:border-0 group"
                    >
                      <ArrowRight size={13} className="text-[#9CA3AF] group-hover:text-[#2E7D32] transition-colors flex-shrink-0" />
                      {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Link>
                  ))}
                </div>
              </div>

              {/* More Articles */}
              {otherPosts.length > 0 && (
                <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.07)] shadow-sm p-6">
                  <h3 className="font-heading font-bold text-base text-[#0A0F1E] mb-4 pb-3 border-b border-[rgba(15,23,42,0.07)]">
                    More Articles
                  </h3>
                  <div className="space-y-4">
                    {otherPosts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-semibold text-xs text-[#0A0F1E] leading-snug line-clamp-2 group-hover:text-[#2E7D32] transition-colors mb-1">
                            {p.title}
                          </p>
                          <span className="font-body text-[0.65rem] text-[#9CA3AF] flex items-center gap-1">
                            <Clock size={10} /> {p.readTime}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
