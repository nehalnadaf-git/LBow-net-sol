import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogs';
import { BASE_URL, localBusinessSchemaBase } from '@/lib/seo';
import { Calendar, Clock } from 'lucide-react';
import { HexGridBg } from '@/components/backgrounds/HexGridBg';

export const metadata: Metadata = {
  title: 'Blog — Industrial Piping Insights | LBow Network Solutions',
  description:
    'Expert articles on PPR, PPRC, PPCH pipe selection, industrial piping, compressed air systems, and FRP lining from LBow Network Solutions, Bangalore.',
  alternates: { canonical: `${BASE_URL}/blog` },
};

export default function BlogIndex() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemaBase) }} />

      <section className="relative overflow-hidden w-full bg-[#0A0A0B] pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 text-center">
        <HexGridBg isLight={false} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="font-body font-medium text-xs sm:text-sm uppercase tracking-[0.1em] text-[#A6A6A6] mb-4">
            Resources &amp; Insights
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-[3rem] lg:text-[3.5rem] text-white leading-[1.1] mb-6">
            Industrial Piping Blog
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-[#A6A6A6] max-w-2xl mx-auto">
            Expert guidance on PPR, PPRC, PPCH pipe selection, industrial applications, and maintenance.
          </p>
        </div>
      </section>

      <section className="relative w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-[rgba(30,32,33,0.12)] hover:border-[#0A0A0B] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col"
              >
                <div className="h-[180px] sm:h-[200px] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[#A6A6A6] font-body text-xs mb-3">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {post.publishedAt}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                  </div>
                  <h2 className="font-heading font-semibold text-base sm:text-lg text-[#0A0A0B] mb-3 leading-snug flex-1">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-[#434343] mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="bg-[rgba(46,125,50,0.08)] text-[#2E7D32] rounded-full px-2.5 py-0.5 font-body text-[0.65rem] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-body font-semibold text-sm text-[#0A0A0B] group-hover:text-[#2E7D32] transition-colors mt-auto">
                    Read Article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
