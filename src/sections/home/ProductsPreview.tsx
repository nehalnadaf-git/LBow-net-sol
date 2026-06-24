'use client'

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { HexGridBg } from '../../components/backgrounds/HexGridBg';

/* ─────────────────────────────────── data ──────────────────────────────── */
const products = [
  { slug: 'ppr-pipe-unions',         image: '/images/product-ppr-unions.webp',      category: 'PPR Fittings',     name: 'PPR Pipe Unions',               description: 'Durable PPR pipe unions with brass inserts, perfect for hot and cold water applications.' },
  { slug: 'pprc-chemical-pipe',      image: '/images/product-pprc-pipe.webp',        category: 'Chemical Pipes',   name: 'PPRC Chemical Pipe',            description: 'Chemical-resistant PPRC pipes designed for industrial chemical transport systems.' },
  { slug: 'ppch-industrial-pipeline',image: '/images/product-ppch-industrial.webp',  category: 'Industrial Pipes', name: 'PPCH Pipe Line for Industrial', description: 'High-pressure PPCH pipe lines engineered for demanding industrial environments.' },
  { slug: 'ppr-pipe-fittings',       image: '/images/product-ppr-fittings.webp',     category: 'Pipe Fittings',    name: 'PPR Pipe Fittings',             description: 'Complete range of PPR fittings — elbows, tees, couplers, and reducers for every need.' },
  { slug: 'ppch-pipe-fittings',      image: '/images/product-ppch-fittings.webp',    category: 'PPCH Fittings',    name: 'PPCH Pipe Fittings',            description: 'Precision-engineered PPCH fittings ensuring leak-proof connections in critical systems.' },
  { slug: 'cooling-tower-pipeline',  image: '/images/product-cooling-tower.webp',    category: 'Cooling Systems',  name: 'Cooling Tower Pipeline',        description: 'Specialized pipeline systems for cooling towers — designed for efficiency and longevity.' },
];

// Triple the set so the marquee loops seamlessly in both directions
const loopedProducts = [...products, ...products, ...products];

/* ─────────────────────────────── constants ─────────────────────────────── */
const GAP          = 16;   // px gap between cards (tighter on mobile)
const AUTO_SPEED   = 40;   // px / sec — normal auto-slide speed
const HOVER_FACTOR = 0.3;  // fraction of speed while hovering (desktop)

/* ─────────────────────────────── helpers ───────────────────────────────── */
function calcCardWidth(): number {
  if (typeof window === 'undefined') return 300;
  const vw = window.innerWidth;
  if (vw < 640)  return 260;
  if (vw < 1024) return 300;
  return 320;
}

/* ──────────────────────────── ProductCard ──────────────────────────────── */
interface Product { slug: string; image: string; category: string; name: string; description: string; }

const ProductCard = ({ product, width }: { product: Product; width: number }) => (
  <div
    className="product-card flex-shrink-0 bg-[#121315] rounded-2xl overflow-hidden border border-white/8
               group shadow-md hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-shadow duration-500"
    style={{ width }}
  >
    {/* Image area */}
    <div className="h-44 sm:h-52 lg:h-60 overflow-hidden relative pointer-events-none">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
        draggable={false}
        loading="lazy"
      />
      {/* Green shimmer accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4ADE80] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Category badge */}
      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
        <span className="font-body font-medium text-[0.6rem] uppercase text-[#A6A6A6] tracking-[0.06em]">
          {product.category}
        </span>
      </div>
    </div>

    {/* Body */}
    <div className="px-4 py-4 sm:px-5 sm:py-5">
      <h3 className="font-heading font-semibold text-[0.95rem] sm:text-lg text-[#EEEEEE] leading-snug">
        {product.name}
      </h3>
      <p className="font-body text-xs sm:text-sm text-[#A6A6A6] mt-1.5 leading-relaxed line-clamp-2">
        {product.description}
      </p>
      <Link
        href={`/products/${product.slug}`}
        onClick={e => e.stopPropagation()}
        className="inline-flex items-center gap-1.5 mt-3 sm:mt-4 font-body font-semibold text-xs sm:text-sm text-[#4ADE80]
                   hover:text-[#2E7D32] transition-colors duration-200 group/link pointer-events-auto"
      >
        View Details
        <ChevronRight size={13} className="transition-transform duration-300 group-hover/link:translate-x-0.5" />
      </Link>
    </div>
  </div>
);

/* ──────────────────────────── Main component ───────────────────────────── */
const ProductsPreview = () => {
  const headerRef  = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // GSAP-tweeable position object
  const pos      = useRef({ x: 0 });
  const cw       = useRef(280);  // current card width
  const setW     = useRef(0);    // width of ONE products set

  // Live behavior flags (refs so ticker never needs re-registration)
  const hovered  = useRef(false);
  const dragging = useRef(false);
  const momentum = useRef<gsap.core.Tween | null>(null);
  const tickerAdded = useRef(false);

  // Pointer drag tracking
  const ptrX0 = useRef(0);
  const posX0 = useRef(0);
  const ptrXp = useRef(0);
  const ptrTp = useRef(0);
  const vel   = useRef(0);

  // React UI state
  const [cardWidth, setCardWidth] = useState(300);

  /* ── Compute / apply dimensions ──────────────────────────────────────── */
  const refreshDimensions = useCallback(() => {
    const w = calcCardWidth();
    cw.current   = w;
    setW.current = products.length * (w + GAP);
    setCardWidth(w);
  }, []);

  /* ── Keep pos.x inside the middle set ───────────────────────────────── */
  const clamp = useCallback(() => {
    const s = setW.current;
    if (s === 0) return;
    while (pos.current.x > -(s * 0.5)) pos.current.x -= s;
    while (pos.current.x < -(s * 1.5)) pos.current.x += s;
  }, []);

  /* ── Apply current pos to DOM ────────────────────────────────────────── */
  const applyPos = useCallback(() => {
    if (trackRef.current) {
      gsap.set(trackRef.current, { x: pos.current.x });
    }
  }, []);

  /* ── GSAP ticker — uses deltaTime for frame-rate independence ─────────── */
  useEffect(() => {
    refreshDimensions();

    // Guard: ensure setW is computed before starting
    if (setW.current === 0) return;

    // Start in the middle clone set
    pos.current.x = -setW.current;
    applyPos();

    const tick = (_time: number, deltaTime: number) => {
      if (dragging.current) return;
      // deltaTime is in ms; convert to seconds for px/sec calculation
      const dtSec = deltaTime / 1000;
      const spd = hovered.current ? AUTO_SPEED * HOVER_FACTOR : AUTO_SPEED;
      pos.current.x -= spd * dtSec;
      clamp();
      applyPos();
    };

    gsap.ticker.add(tick);
    tickerAdded.current = true;

    const onResize = () => {
      refreshDimensions();
      // Recalculate setW and clamp position
      if (setW.current > 0) {
        clamp();
        applyPos();
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', onResize);
    };
  }, [refreshDimensions, clamp, applyPos]);

  /* ── Header entrance animation ───────────────────────────────────────── */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 24 });
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out' });
        obs.disconnect();
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Arrow navigation ─────────────────────────────────────────────────── */
  const arrowSlide = useCallback((dir: 1 | -1) => {
    if (momentum.current) momentum.current.kill();
    const target = pos.current.x + dir * -(cw.current + GAP);
    momentum.current = gsap.to(pos.current, {
      x: target,
      duration: 0.55,
      ease: 'power3.out',
      onUpdate: () => { clamp(); applyPos(); },
    });
  }, [clamp, applyPos]);

  /* ── Pointer events ───────────────────────────────────────────────────── */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Don't capture pointer when clicking a link or button — let the browser handle it
    if ((e.target as HTMLElement).closest('a, button')) return;

    if (momentum.current) momentum.current.kill();
    dragging.current = true;
    ptrX0.current  = e.clientX;
    posX0.current  = pos.current.x;
    ptrXp.current  = e.clientX;
    ptrTp.current  = performance.now();
    vel.current    = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const now = performance.now();
    const dt  = now - ptrTp.current;
    if (dt > 0) vel.current = (e.clientX - ptrXp.current) / dt;
    ptrXp.current = e.clientX;
    ptrTp.current = now;
    pos.current.x = posX0.current + (e.clientX - ptrX0.current);
    clamp();
    applyPos();
  }, [clamp, applyPos]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const totalMove = Math.abs(e.clientX - ptrX0.current);
    dragging.current = false;

    if (totalMove < 6) return; // plain tap — auto-slide continues

    // Momentum fling
    const fling = Math.sign(vel.current) * Math.min(Math.abs(vel.current * 600), 480);
    momentum.current = gsap.to(pos.current, {
      x: pos.current.x + fling,
      duration: 0.8,
      ease: 'power3.out',
      onUpdate: () => { clamp(); applyPos(); },
    });
  }, [clamp, applyPos]);

  /* ── Render ───────────────────────────────────────────────────────────── */
  return (
    <section className="relative overflow-hidden w-full bg-[#0A0A0B] py-16 sm:py-20 lg:py-24">
      <HexGridBg isLight={false} />

      <div className="relative z-10">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-10 text-center will-change-transform"
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="block w-6 h-px bg-[#4ADE80]/60" />
            <span className="font-body font-medium text-xs uppercase tracking-[0.12em] text-[#4ADE80]/80">
              Our Products
            </span>
            <span className="block w-6 h-px bg-[#4ADE80]/60" />
          </div>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-[2.6rem] text-[#EEEEEE] mb-3 leading-tight">
            Premium Quality<br className="sm:hidden" /> Pipes &amp; Fittings
          </h2>
          <p className="font-body text-sm sm:text-base text-[#A6A6A6] max-w-lg sm:max-w-2xl mx-auto leading-relaxed">
            From PPR unions to cooling tower pipelines — we supply the full range of industrial piping solutions.
          </p>
        </div>

        {/* ── Carousel ──────────────────────────────────────────────── */}
        <div
          ref={wrapperRef}
          className="relative group/carousel"
          onMouseEnter={() => { hovered.current = true; }}
          onMouseLeave={() => { hovered.current = false; }}
        >



          {/* Draggable overflow viewport */}
          <div
            className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              ref={trackRef}
              className="flex will-change-transform py-4"
              style={{ gap: GAP, paddingLeft: GAP }}
            >
              {loopedProducts.map((product, i) => (
                <ProductCard key={i} product={product} width={cardWidth} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Swipe hint — mobile only ───────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <span className="block w-4 h-px bg-[#A6A6A6]/20" />
          <p className="font-body text-[0.6rem] uppercase tracking-widest text-[#A6A6A6]/30">
            Swipe to explore
          </p>
          <span className="block w-4 h-px bg-[#A6A6A6]/20" />
        </div>

        {/* ── View All Button ────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-8 sm:mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 justify-center bg-[#EEEEEE] text-[#0A0A0B]
                       hover:bg-[#A6A6A6] font-body font-semibold rounded-lg px-8 sm:px-10 py-3 sm:py-3.5
                       text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                       shadow-sm"
          >
            View All Products
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsPreview;
