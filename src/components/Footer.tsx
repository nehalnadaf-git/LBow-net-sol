'use client';

import Link from 'next/link';
import { PipeTopologyBg } from './backgrounds/PipeTopologyBg';

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#0A0A0B] border-t border-white/5 py-12 md:py-20 text-[#EEEEEE] overflow-hidden">
      {/* Premium Background Graphics */}
      <PipeTopologyBg isLight={false} />

      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Top Metadata Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 font-mono text-[11px] sm:text-xs text-[#A6A6A6] uppercase tracking-wider mb-12 md:mb-20">
          {/* Col 1 */}
          <div className="leading-relaxed">
            PPR Pipe Fitting Dealers<br />
            Industrial piping solutions<br />
            Bangalore, India
          </div>
          
          {/* Col 2 */}
          <div className="md:text-center leading-relaxed">
            8+ years of experience<br />
            <Link href="/products" className="text-white hover:underline transition-all underline-offset-4 decoration-1">
              View Products
            </Link>
          </div>
          
          {/* Col 3 */}
          <div className="md:text-right leading-relaxed">
            T Dasarahalli, Bangalore<br />
            Est. 2018
          </div>
        </div>

        {/* Center Giant Typographic Title */}
        <div className="mb-12 md:mb-20">
          <h2 className="font-heading font-black text-[13.5vw] md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13rem] tracking-[-0.05em] leading-none select-none transition-[letter-spacing] duration-700 hover:tracking-[-0.03em] cursor-default text-white">
            lbow network
          </h2>
        </div>

        {/* Bottom Contacts Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 font-mono text-xs uppercase tracking-wider mb-10 border-b border-white/5 pb-10">
          <div>
            <span className="text-[#A6A6A6] block mb-1">Contact</span>
            <a href="tel:+919606419076" className="text-white hover:underline block underline-offset-4">
              +91 9606419076
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
            <span className="text-white block">
              29AUIPV4726C2ZB
            </span>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 font-mono text-[11px] sm:text-xs uppercase tracking-wider mb-10 border-b border-white/5 pb-10">
          {/* Locations */}
          <div>
            <span className="text-[#A6A6A6] block mb-3">Locations</span>
            <div className="flex flex-col gap-2">
              <Link href="/locations/peenya" className="text-white hover:underline underline-offset-4">Peenya</Link>
              <Link href="/locations/nelamangala" className="text-white hover:underline underline-offset-4">Nelamangala</Link>
              <Link href="/locations/bommasandra" className="text-white hover:underline underline-offset-4">Bommasandra</Link>
              <Link href="/locations/jigani" className="text-white hover:underline underline-offset-4">Jigani</Link>
              <Link href="/locations/bidadi" className="text-white hover:underline underline-offset-4">Bidadi</Link>
              <Link href="/locations" className="text-[#A6A6A6] hover:text-white hover:underline underline-offset-4 mt-1">View All Locations →</Link>
            </div>
          </div>
          {/* Products */}
          <div>
            <span className="text-[#A6A6A6] block mb-3">Products</span>
            <div className="flex flex-col gap-2">
              <Link href="/products/ppr-pipe-unions" className="text-white hover:underline underline-offset-4">PPR Pipe Unions</Link>
              <Link href="/products/pprc-chemical-pipe" className="text-white hover:underline underline-offset-4">PPRC Chemical Pipe</Link>
              <Link href="/products/ppch-industrial-pipeline" className="text-white hover:underline underline-offset-4">PPCH Industrial Pipeline</Link>
              <Link href="/products/cooling-tower-pipeline" className="text-white hover:underline underline-offset-4">Cooling Tower Pipeline</Link>
              <Link href="/products" className="text-[#A6A6A6] hover:text-white hover:underline underline-offset-4 mt-1">View All Products →</Link>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <span className="text-[#A6A6A6] block mb-3">Quick Links</span>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-white hover:underline underline-offset-4">About</Link>
              <Link href="/services" className="text-white hover:underline underline-offset-4">Services</Link>
              <Link href="/brands/prince-pipes" className="text-white hover:underline underline-offset-4">Prince Pipes</Link>
              <Link href="/blog" className="text-white hover:underline underline-offset-4">Blog</Link>
              <Link href="/faq" className="text-white hover:underline underline-offset-4">FAQ</Link>
              <Link href="/contact" className="text-white hover:underline underline-offset-4">Contact</Link>
            </div>
          </div>
        </div>

        {/* Very Bottom Copyright & Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-[10px] sm:text-xs text-[#A6A6A6] uppercase tracking-wider">
          <div className="leading-relaxed">
            © 2026 LBow Network Solutions | PPR Pipe Fittings in Bangalore
          </div>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:underline text-white underline-offset-4">
              Enquire
            </Link>
            <Link href="/privacy-policy" className="hover:underline text-white underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:underline text-white underline-offset-4">
              Terms of Service
            </Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
