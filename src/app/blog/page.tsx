import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogs';
import { BASE_URL, localBusinessSchemaBase } from '@/lib/seo';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { HexGridBg } from '@/components/backgrounds/HexGridBg';

export const metadata: Metadata = {
  title: 'Blog — Industrial Piping Insights | LBow Network Solutions',
  description:
    'Expert articles on PPR, PPRC, PPCH pipe selection, industrial piping, compressed air systems, and FRP lining from LBow Network Solutions, Bangalore.',
  alternates: { canonical: `${BASE_URL}/blog` },
};

export default function BlogIndex() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemaBase) }} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden w-full pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 text-center"
        style={{ background: 'linear-gradient(160deg, #F0F7F1 0%, #FAFFFE 35%, #EDF4FF 70%, #F4FBF5 100%)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none" style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)' }} />
        <HexGridBg isLight={true} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-[rgba(46,125,50,0.08)] text-[#2E7D32] rounded-full px-4 py-1.5 font-body font-medium text-xs uppercase tracking-[0.1em] mb-5">
            Resources &amp; Insights
          </div>
          <h1
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] mb-5"
            style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            Industrial Piping Blog
          </h1>
          <p className="font-body text-base sm:text-lg text-[#374151] max-w-2xl mx-auto leading-relaxed">
            Expert guidance on PPR, PPRC, PPCH pipe selection, industrial applications, and maintenance — straight from the field.
          </p>
        </div>
      </section>

      {/* ── Blog Grid ────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-[#F8F9FA] py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">

          {/* Featured post — large hero card on desktop */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block mb-10 sm:mb-14 bg-white rounded-2xl overflow-hidden border border-[rgba(15,23,42,0.08)] hover:border-[rgba(15,23,42,0.2)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.10)] transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-[240px] sm:h-[300px] lg:h-[420px] overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                {/* Content */}
                <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[#9CA3AF] font-body text-xs mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {featured.publishedAt}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {featured.readTime}</span>
                    <span className="bg-[rgba(46,125,50,0.1)] text-[#2E7D32] rounded-full px-3 py-0.5 font-medium uppercase tracking-wide text-[0.65rem]">Featured</span>
                  </div>
                  <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-[#0A0F1E] mb-4 leading-snug">
                    {featured.title}
                  </h2>
                  <p className="font-body text-sm sm:text-base text-[#374151] leading-relaxed mb-6 line-clamp-3 lg:line-clamp-4">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featured.tags.slice(0, 4).map((tag, i) => (
                      <span key={i} className="bg-[rgba(46,125,50,0.08)] text-[#2E7D32] rounded-full px-3 py-1 font-body text-[0.7rem] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 font-body font-bold text-sm text-[#0A0F1E] group-hover:text-[#2E7D32] transition-colors">
                    Read Article <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Remaining posts — 3-column grid on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[rgba(15,23,42,0.08)] hover:border-[rgba(15,23,42,0.2)] hover:-translate-y-2 hover:shadow-[0_20px_56px_rgba(15,23,42,0.10)] transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-[200px] sm:h-[220px] lg:h-[200px] xl:h-[220px] overflow-hidden flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[#9CA3AF] font-body text-[0.7rem] mb-3">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {post.publishedAt}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                  </div>
                  <h2 className="font-heading font-semibold text-base sm:text-lg lg:text-[1.05rem] xl:text-lg text-[#0A0F1E] mb-3 leading-snug flex-1">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-[#374151] mb-4 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="bg-[rgba(46,125,50,0.08)] text-[#2E7D32] rounded-full px-2.5 py-0.5 font-body text-[0.65rem] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-[#0A0F1E] group-hover:text-[#2E7D32] transition-colors mt-auto">
                    Read Article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
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
