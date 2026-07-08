'use client'

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { HexGridBg } from '../../components/backgrounds/HexGridBg';

/* ─────────────────────────────────── data ──────────────────────────────── */
const products = [
  { slug: 'ppr-green-pipe',           image: '/images/product-ppr-green-pipe.webp',        category: 'PPR Pipes',         name: 'PPR Green Pipe',          description: 'Standard green PPR pipes — 20mm to 315mm. Food grade certified, 10-year warranty, temperature rated -5°C to +95°C.' },
  { slug: 'ppr-blue-pipe',            image: '/images/product-ppr-blue-pipe.webp',  category: 'PPR Pipes',         name: 'PPR Blue Pipe',           description: 'Premium blue PPR pipes — full range 20mm to 315mm. Ideal for hot/cold water and industrial pressure lines.' },
  { slug: 'ppr-fittings-green',       image: '/images/product-ppr-fittings-green.webp',     category: 'PPR Fittings',      name: 'PPR Fittings (Green)',    description: 'Complete range of green PPR fittings — elbows, tees, couplers, reducers, and unions for every need.' },
  { slug: 'ppr-fittings-blue',        image: '/images/product-ppr-fittings-blue.webp',       category: 'PPR Fittings',      name: 'PPR Fittings (Blue)',     description: 'Full set of blue PPR fittings with brass inserts for hot and cold water applications in industrial setups.' },
  { slug: 'brass-ball-valve',         image: '/images/product-brass-ball-valve.webp',    category: 'Valves',            name: 'Brass Ball Valve',        description: 'High-quality brass ball valves for reliable flow control in water, air, and light chemical lines.' },
  { slug: 'butterfly-valve',          image: '/images/product-butterfly-valve.webp',    category: 'Valves',            name: 'Butterfly Valve',         description: 'Industrial-grade butterfly valves for large-bore lines — lightweight, quick-acting, and corrosion resistant.' },
  { slug: 'ss-fittings',              image: '/images/product-ss-fittings.webp',        category: 'SS Fittings',       name: 'SS Fittings',             description: 'Stainless steel fittings for hygienic, high-pressure, and corrosive environments including food and pharma.' },
  { slug: 'brass-fittings',           image: '/images/product-brass-fittings.webp',       category: 'Brass Fittings',    name: 'Brass Fittings',          description: 'Precision-machined brass fittings for threaded connections in air, water, and gas line applications.' },
  { slug: 'pneumatic-fittings',       image: '/images/product-pneumatic-fittings.webp',    category: 'Pneumatic',         name: 'Pneumatic Fittings',      description: 'Push-to-connect and compression pneumatic fittings for air compressor lines and automated systems.' },
  { slug: 'pu-frl-airgun',            image: '/images/product-pu-frl-airgun.webp',     category: 'Air Tools',         name: 'PU/FRL Airgun',           description: 'PU tubing, FRL units (Filter-Regulator-Lubricator), and airguns for complete compressed air tool setups.' },
];

// Triple the set so the marquee loops seamlessly in both directions
const loopedProducts = [...products, ...products, ...products];

/* ───────────────────────────── constants ───────────────────── */
const GAP            = 16;   // px gap between cards
const AUTO_SPEED     = 55;   // px/sec — desktop auto-slide speed (raised from 40)
const MOBILE_SPEED   = 42;   // px/sec — mobile (cards are narrower)
const HOVER_FACTOR   = 0.15; // fraction of speed while hovering (nearly stopped)
const SPEED_LERP     = 0.06; // smooth speed transitions on hover/leave

/* ────────────────────────────── helpers ────────────────────── */
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
    className="product-card flex-shrink-0 bg-[#131822] rounded-2xl overflow-hidden border border-white/8
               group shadow-md hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-shadow duration-500"
    style={{ width }}
  >
    {/* Image area */}
    <div className="h-44 sm:h-52 lg:h-60 overflow-hidden relative pointer-events-none">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
        draggable={false}
        sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 320px"
      />
      {/* Green shimmer accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4ADE80] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Category badge — responsive, overflow-safe, single line guaranteed */}
      <div className="absolute bottom-3 left-3 right-3 flex">
        <div className="flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full bg-black/80 border border-white/10 max-w-full min-w-0">
          {/* Green accent dot */}
          <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[#4ADE80]" />
          <span className="font-body font-semibold text-[0.58rem] sm:text-[0.62rem] uppercase text-[#CCCCCC] tracking-[0.07em] truncate whitespace-nowrap leading-none">
            {product.category}
          </span>
        </div>
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
  const hovered     = useRef(false);
  const dragging    = useRef(false);
  const momentum    = useRef<gsap.core.Tween | null>(null);
  const currentSpd  = useRef(AUTO_SPEED); // lerped speed for smooth transitions

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

  /* ── Apply current pos to DOM — direct transform3d, no GSAP overhead per frame ── */
  const applyPos = useCallback(() => {
    if (trackRef.current) {
      // transform3d promotes element to GPU compositor layer — zero layout cost
      trackRef.current.style.transform = `translate3d(${pos.current.x}px,0,0)`;
    }
  }, []);

  /* ── GSAP ticker — frame-rate independent, lag-smoothing disabled ──────── */
  useEffect(() => {
    refreshDimensions();
    if (setW.current === 0) return;

    // Disable GSAP's lag smoothing — prevents the carousel from lurching
    // when the browser tab regains focus after being backgrounded
    gsap.ticker.lagSmoothing(0);

    // Start in the middle clone set
    pos.current.x = -setW.current;
    applyPos();

    // Determine base speed based on viewport (mobile gets slightly slower)
    const baseSpeed = () => window.innerWidth < 640 ? MOBILE_SPEED : AUTO_SPEED;

    const tick = (_time: number, deltaTime: number) => {
      if (dragging.current) return;

      // deltaTime from GSAP ticker is in milliseconds
      const dtSec = Math.min(deltaTime / 1000, 0.05); // cap at 50ms to avoid huge jumps on tab restore

      // Lerp current speed towards target — smooth hover slow-down/speed-up
      const targetSpd = hovered.current
        ? baseSpeed() * HOVER_FACTOR
        : baseSpeed();
      currentSpd.current += (targetSpd - currentSpd.current) * SPEED_LERP;

      pos.current.x -= currentSpd.current * dtSec;
      clamp();
      applyPos();
    };

    gsap.ticker.add(tick);

    const onResize = () => {
      refreshDimensions();
      if (setW.current > 0) { clamp(); applyPos(); }
    };
    window.addEventListener('resize', onResize);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP default on unmount
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

  /* ── Arrow navigation ───────────────────────────────────────── */
  const arrowSlide = useCallback((dir: 1 | -1) => {
    if (momentum.current) momentum.current.kill();
    const target = pos.current.x + dir * -(cw.current + GAP);
    momentum.current = gsap.to(pos.current, {
      x: target,
      duration: 0.45,
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

    // Momentum fling — faster cap + higher multiplier for snappier mobile swipe
    const fling = Math.sign(vel.current) * Math.min(Math.abs(vel.current * 700), 700);
    momentum.current = gsap.to(pos.current, {
      x: pos.current.x + fling,
      duration: 0.75,
      ease: 'power3.out',
      onUpdate: () => { clamp(); applyPos(); },
    });
  }, [clamp, applyPos]);

  /* ── Render ───────────────────────────────────────────────────────────── */
  return (
    <section className="relative overflow-hidden w-full py-16 sm:py-20 lg:py-24" style={{ background: 'linear-gradient(180deg, #0D1118 0%, #0F1520 50%, #0D1118 100%)' }}>
      <HexGridBg isLight={false} isMinimal={true} />

      <div className="relative z-10">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 mb-8 sm:mb-10 text-center will-change-transform"
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
            PPR Pipes, Fittings<br className="sm:hidden" /> &amp; Industrial Valves
          </h2>
          <p className="font-body text-sm sm:text-base text-[#A6A6A6] max-w-lg sm:max-w-2xl mx-auto leading-relaxed">
            From PPR pipes and fittings to valves, pneumatic fittings, and air tools — everything your industry needs.
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
            style={{ touchAction: 'pan-y' }}  // iOS: allow vertical page scroll, JS handles horizontal drag
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

          {/* Arrow navigation — desktop + keyboard */}
          <button
            onClick={() => arrowSlide(1)}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 rounded-full bg-[#0D1118]/90 border border-white/10
                       items-center justify-center text-[#EEEEEE]
                       hover:bg-[#2E7D32]/80 hover:border-[#4ADE80]/30
                       transition-all duration-200 opacity-0 group-hover/carousel:opacity-100"
            aria-label="Previous product"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => arrowSlide(-1)}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 rounded-full bg-[#0D1118]/90 border border-white/10
                       items-center justify-center text-[#EEEEEE]
                       hover:bg-[#2E7D32]/80 hover:border-[#4ADE80]/30
                       transition-all duration-200 opacity-0 group-hover/carousel:opacity-100"
            aria-label="Next product"
          >
            <ChevronRight size={18} />
          </button>
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
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 mt-8 sm:mt-10 text-center">
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
