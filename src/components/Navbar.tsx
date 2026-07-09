'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Locations', path: '/locations' },
    { name: 'Brands', path: '/brands' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const isHome = pathname === '/';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[80px] sm:h-[88px] flex items-center transition-all duration-300 ${
          !isHome
            ? 'bg-white/98 border-b border-[rgba(15,23,42,0.08)] shadow-sm'
            : scrolled
              ? 'bg-white/98 border-b border-[rgba(15,23,42,0.08)] shadow-sm'
              : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1700px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/lns_logo_light.webp"
              alt="LBow Network Solutions"
              width={256}
              height={256}
              quality={95}
              priority
              sizes="(max-width: 640px) 72px, (max-width: 1024px) 80px, 96px"
              className="h-[4.5rem] sm:h-20 lg:h-[5.5rem] w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative font-body font-semibold text-[0.8rem] xl:text-[0.875rem] uppercase tracking-[0.06em] xl:tracking-[0.07em] px-3 xl:px-3.5 py-2.5 transition-colors duration-200 group ${
                  isActive(link.path)
                    ? 'text-[#0A0F1E]'
                    : 'text-[#374151] hover:text-[#2E7D32]'
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 right-0 bottom-0 h-[2.5px] bg-[#2E7D32] rounded-full transition-all duration-300 ${
                    isActive(link.path) ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right side — CTA + hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* CTA Button — desktop */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center font-body font-bold text-[0.875rem] xl:text-[0.9375rem] rounded-xl px-6 xl:px-7 py-3 xl:py-3.5 bg-[#0A0F1E] text-white hover:bg-[#1a2035] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_2px_14px_rgba(10,15,30,0.20)] whitespace-nowrap"
            >
              Get Quote
            </Link>

            {/* Mobile / Tablet Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 -mr-1 rounded-xl text-[#0A0F1E] hover:bg-[rgba(10,15,30,0.06)] transition-colors duration-200"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen
                ? <X size={28} strokeWidth={2} />
                : <Menu size={28} strokeWidth={2} />
              }
            </button>
          </div>

        </div>
      </nav>

      {/* ── Mobile / Tablet Full-Screen Menu ─────────────────────────────── */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[60] flex flex-col transition-all duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ background: '#FFFFFF' }}
      >
        {/* Top bar — matches navbar height */}
        <div className="flex items-center justify-between px-5 sm:px-8 h-[80px] sm:h-[88px] border-b border-[rgba(15,23,42,0.08)] flex-shrink-0">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
            <Image
              src="/lns_logo_light.webp"
              alt="LBow Network Solutions"
              width={256}
              height={256}
              quality={95}
              priority
              sizes="(max-width: 640px) 72px, 80px"
              className="h-[4.5rem] sm:h-20 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 -mr-1 rounded-xl text-[#374151] hover:bg-[rgba(10,15,30,0.06)] hover:text-[#0A0F1E] transition-colors"
            aria-label="Close menu"
          >
            <X size={28} strokeWidth={2} />
          </button>
        </div>

        {/* Nav links — scrollable */}
        <div className="flex-1 overflow-y-auto py-3 px-5 sm:px-8">
          <div className="flex flex-col">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-heading font-semibold text-2xl sm:text-[1.75rem] py-4 sm:py-5 border-b border-[rgba(15,23,42,0.07)] transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-[#0A0F1E]'
                    : 'text-[#6B7280] hover:text-[#0A0F1E]'
                }`}
                style={{
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(18px)',
                  transition: `opacity 0.28s ease ${0.04 + index * 0.04}s, transform 0.28s ease ${0.04 + index * 0.04}s`,
                }}
              >
                <span className="flex items-center justify-between">
                  {link.name}
                  {isActive(link.path) && (
                    <span className="w-2 h-2 rounded-full bg-[#2E7D32] flex-shrink-0" />
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-8"
            style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.28s ease 0.48s, transform 0.28s ease 0.48s',
            }}
          >
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#2E7D32] hover:bg-[#256428] text-white font-body font-bold text-lg sm:text-xl rounded-2xl px-6 py-4 sm:py-5 transition-all duration-200 active:scale-[0.98] shadow-[0_4px_18px_rgba(46,125,50,0.28)]"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Footer info */}
          <div
            className="mt-8 pt-6 border-t border-[rgba(15,23,42,0.08)]"
            style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transition: 'opacity 0.28s ease 0.58s',
            }}
          >
            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#9CA3AF]">
              T Dasarahalli, Bangalore
            </p>
            <a
              href="tel:+918123501407"
              className="font-mono text-sm sm:text-base text-[#6B7280] hover:text-[#0A0F1E] transition-colors mt-2 block"
            >
              +91 81235 01407
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
