'use client';

import Link from 'next/link';
import { PipeTopologyBg } from './backgrounds/PipeTopologyBg';

const Footer = () => {
  return (
    <footer className="relative w-full border-t border-white/5 pt-12 md:pt-20 text-[#EEEEEE] overflow-hidden" style={{ background: 'linear-gradient(180deg, #0D1118 0%, #0A0E15 100%)' }}>
      {/* Premium Background Graphics */}
      <PipeTopologyBg isLight={false} />

      {/* ── Top metadata row — constrained width ──────────────────────────── */}
      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 font-mono text-[11px] sm:text-xs text-[#A6A6A6] uppercase tracking-wider mb-12 md:mb-20">
          <div className="leading-relaxed">
            PPR Pipe Fitting Dealers<br />
            Industrial piping solutions<br />
            Bangalore, India
          </div>
          <div className="md:text-center leading-relaxed">
            8+ years of experience<br />
            <Link href="/products" className="text-white hover:underline transition-all underline-offset-4 decoration-1">
              View Products
            </Link>
          </div>
          <div className="md:text-right leading-relaxed">
            T Dasarahalli, Bangalore<br />
            Est. 2018
          </div>
        </div>
      </div>

      {/* ── Giant typographic title — FULL viewport width, no max-w constraint ── */}
      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 mb-10 md:mb-16 overflow-visible">
        <h2
          className="font-heading font-black leading-[0.9] select-none whitespace-nowrap transition-[letter-spacing] duration-700 hover:tracking-[-0.02em] cursor-default text-white tracking-[-0.05em]"
          style={{ fontSize: 'clamp(2.8rem, 13.5vw, 210px)' }}
        >
          lbow network
        </h2>
      </div>

      {/* ── Bottom content rows — constrained width ───────────────────────── */}
      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">

        {/* Contacts row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 font-mono text-xs uppercase tracking-wider mb-10 border-b border-white/5 pb-10">
          <div>
            <span className="text-[#A6A6A6] block mb-1">Contact</span>
            <a href="tel:+918123501407" className="text-white hover:underline block underline-offset-4">
              +91 81235 01407
            </a>
          </div>
          <div>
            <span className="text-[#A6A6A6] block mb-1">Email</span>
            <a href="mailto:lbownetwork9solutions@gmail.com" className="text-white hover:underline block break-all underline-offset-4">
              lbownetwork9solutions@gmail.com
            </a>
          </div>
          <div className="sm:col-span-2 lg:col-span-1 lg:text-right">
            <span className="text-[#A6A6A6] block mb-1">GSTIN</span>
            <span className="text-white block">29AUIPV4726C2ZB</span>
          </div>
        </div>

        {/* Navigation columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 font-mono text-[11px] sm:text-xs uppercase tracking-wider mb-10 border-b border-white/5 pb-10">
          {/* Locations */}
          <div>
            <span className="text-[#A6A6A6] block mb-3">Locations</span>
            <div className="flex flex-col gap-2">
              <Link href="/locations/peenya"        className="text-white hover:underline underline-offset-4">Peenya</Link>
              <Link href="/locations/nelamangala"   className="text-white hover:underline underline-offset-4">Nelamangala</Link>
              <Link href="/locations/bommasandra"   className="text-white hover:underline underline-offset-4">Bommasandra</Link>
              <Link href="/locations/jigani"        className="text-white hover:underline underline-offset-4">Jigani</Link>
              <Link href="/locations/bidadi"        className="text-white hover:underline underline-offset-4">Bidadi</Link>
              <Link href="/locations"               className="text-[#A6A6A6] hover:text-white hover:underline underline-offset-4 mt-1">View All Locations →</Link>
            </div>
          </div>
          {/* Products */}
          <div>
            <span className="text-[#A6A6A6] block mb-3">Products</span>
            <div className="flex flex-col gap-2">
              <Link href="/products/ppr-green-pipe"      className="text-white hover:underline underline-offset-4">PPR Green Pipe</Link>
              <Link href="/products/ppr-blue-pipe"       className="text-white hover:underline underline-offset-4">PPR Blue Pipe</Link>
              <Link href="/products/brass-ball-valve"    className="text-white hover:underline underline-offset-4">Brass Ball Valve</Link>
              <Link href="/products/butterfly-valve"     className="text-white hover:underline underline-offset-4">Butterfly Valve</Link>
              <Link href="/products/ss-fittings"         className="text-white hover:underline underline-offset-4">SS Fittings</Link>
              <Link href="/products/pneumatic-fittings"  className="text-white hover:underline underline-offset-4">Pneumatic Fittings</Link>
              <Link href="/products"                     className="text-[#A6A6A6] hover:text-white hover:underline underline-offset-4 mt-1">View All Products →</Link>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <span className="text-[#A6A6A6] block mb-3">Quick Links</span>
            <div className="flex flex-col gap-2">
              <Link href="/about"               className="text-white hover:underline underline-offset-4">About</Link>
              <Link href="/services"            className="text-white hover:underline underline-offset-4">Services</Link>
              <Link href="/brands/prince-pipes" className="text-white hover:underline underline-offset-4">Prince Pipes</Link>
              <Link href="/locations"           className="text-white hover:underline underline-offset-4">Locations</Link>
              <Link href="/blog"                className="text-white hover:underline underline-offset-4">Blog</Link>
              <Link href="/faq"                 className="text-white hover:underline underline-offset-4">FAQ</Link>
              <Link href="/contact"             className="text-white hover:underline underline-offset-4">Contact</Link>
            </div>
          </div>
        </div>

        {/* Hiring */}
        <div className="border-t border-white/5 pt-8 mb-8 font-mono text-[11px] sm:text-xs uppercase tracking-wider">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[#A6A6A6] block mb-1">We&apos;re Hiring</span>
              <span className="text-white">Join our growing team — send your profile to us</span>
            </div>
            <a
              href="mailto:lbownetwork9solutions@gmail.com?subject=Job Application — LBow Network Solutions"
              className="text-white hover:underline underline-offset-4 whitespace-nowrap"
            >
              lbownetwork9solutions@gmail.com →
            </a>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-[10px] sm:text-xs text-[#A6A6A6] uppercase tracking-wider pb-12 md:pb-20">
          <div className="leading-relaxed">
            © 2026 LBow Network Solutions | PPR Pipe Fittings in Bangalore
          </div>
          <div className="flex gap-6">
            <Link href="/contact"        className="hover:underline text-white underline-offset-4">Enquire</Link>
            <Link href="/privacy-policy" className="hover:underline text-white underline-offset-4">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:underline text-white underline-offset-4">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
