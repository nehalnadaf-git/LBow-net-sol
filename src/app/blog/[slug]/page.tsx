import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getBlogBySlug } from '@/lib/blogs';
import { BASE_URL, localBusinessSchemaBase } from '@/lib/seo';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

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
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'LBow Network Solutions',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'LBow Network Solutions',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/icon-512x512.png` },
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

  function renderSection(text: string, index: number) {
    const lines = text.split('\n').filter((l) => l.trim().length > 0);
    const elements: React.ReactNode[] = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${i}`} className="font-heading font-bold text-xl sm:text-2xl text-[#0A0A0B] mt-10 mb-4 first:mt-0">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} className="font-heading font-semibold text-lg text-[#0A0A0B] mt-6 mb-3">
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
        i--; // will be incremented at end of loop
        const rows = tableLines.filter((l) => !l.match(/^\|[-\s|]+\|$/));
        const [headerRow, ...bodyRows] = rows;
        const headerCells = headerRow?.split('|').filter((c) => c.trim() !== '') ?? [];
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-6">
            <table className="w-full text-sm font-body border-collapse">
              <thead>
                <tr className="bg-[#F0F0F0] font-semibold">
                  {headerCells.map((cell, ci) => (
                    <th key={ci} className="px-4 py-2.5 border border-[rgba(30,32,33,0.12)] text-[#0A0A0B] text-left font-semibold">
                      {cell.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => {
                  const cells = row.split('|').filter((c) => c.trim() !== '');
                  return (
                    <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF9]'}>
                      {cells.map((cell, ci) => (
                        <td key={ci} className="px-4 py-2.5 border border-[rgba(30,32,33,0.12)] text-[#0A0A0B]">
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
          <ul key={`ul-${i}`} className="space-y-2 my-4 pl-4">
            {listLines.map((item, li) => (
              <li key={li} className="font-body text-sm sm:text-base text-[#434343] leading-relaxed flex items-start gap-2">
                <span className="mt-0.5">{item.startsWith('✅') ? '✅' : item.startsWith('❌') ? '❌' : '•'}</span>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/^[-✅❌•✓]\s/, '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            ))}
          </ul>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <p key={`bold-${i}`} className="font-body font-semibold text-sm sm:text-base text-[#0A0A0B] mt-4 mb-1">
            {line.slice(2, -2)}
          </p>
        );
      } else if (line.trim().length > 0) {
        const processed = line
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#2E7D32] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
        elements.push(
          <p key={`p-${i}`} className="font-body text-sm sm:text-base text-[#434343] leading-[1.8] my-3"
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

      {/* Hero */}
      <section className="relative w-full bg-[#0A0A0B] pt-28 sm:pt-36 md:pt-44 pb-8 sm:pb-12">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <nav className="font-body text-xs text-white/60 flex gap-2 items-center mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white line-clamp-1">{post.title}</span>
          </nav>
          <div className="flex items-center gap-4 font-body text-xs text-[#A6A6A6] mb-4">
            <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.publishedAt}</span>
            <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-[2.5rem] text-white leading-tight mb-5">
            {post.title}
          </h1>
          <p className="font-body text-sm sm:text-base text-[#A6A6A6] leading-relaxed max-w-3xl mb-6">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, i) => (
              <span key={i} className="bg-white/5 text-white rounded-full px-3 py-1 font-body text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Image — full bleed */}
      <div className="w-full bg-[#0A0A0B]">
        <div className="relative w-full aspect-video sm:aspect-[2/1] lg:aspect-auto lg:h-[400px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient fade into content below */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAFAF9]/30 pointer-events-none" />
        </div>
      </div>

      {/* Article Content */}
      <section className="relative w-full bg-[#FAFAF9] py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10 lg:gap-16">
            {/* Content */}
            <article className="min-w-0">
              {sections.map((section, i) => renderSection(section, i))}
            </article>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* CTA */}
              <div className="bg-[#0A0A0B] rounded-xl p-5 text-center sticky top-24">
                <h3 className="font-heading font-semibold text-base text-white mb-2">
                  Get a Quote
                </h3>
                <p className="font-body text-xs text-[#A6A6A6] mb-4">
                  No minimum order quantity. Free delivery within 22km of Bangalore.
                </p>
                <a
                  href="tel:+919606419076"
                  className="block w-full text-center bg-[#EEEEEE] hover:bg-[#434343] hover:text-[#EEEEEE] text-[#0A0A0B] font-body font-semibold text-sm rounded-md px-4 py-2.5 transition-all duration-300 mb-3"
                >
                  +91 9606419076
                </a>
                <a
                  href="https://wa.me/919606419076"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#25D366] hover:bg-[#128C7E] text-white font-body font-semibold text-sm rounded-md px-4 py-2.5 transition-all duration-300"
                >
                  WhatsApp Us
                </a>
              </div>

              {/* Related Products */}
              <div className="bg-white rounded-xl border border-[rgba(30,32,33,0.12)] p-5">
                <h3 className="font-heading font-semibold text-sm text-[#0A0A0B] mb-3">
                  Related Products
                </h3>
                <div className="space-y-2">
                  {post.relatedProducts.map((slug) => (
                    <Link
                      key={slug}
                      href={`/products/${slug}`}
                      className="block font-body text-sm text-[#434343] hover:text-[#2E7D32] transition-colors py-1.5 border-b border-[rgba(30,32,33,0.06)] last:border-0"
                    >
                      → {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-6 border-t border-[rgba(30,32,33,0.1)]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-body font-semibold text-sm text-[#434343] hover:text-[#0A0A0B] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
