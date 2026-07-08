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

  // Home page keeps its dark/transparent navbar behaviour.
  // Every other page has a light hero, so always show a white navbar there.
  const isHome = pathname === '/';
  const isLightTheme = !scrolled && isHome; // only used for home unscrolled state

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          !isHome
            ? 'bg-[#0D1118]/98 border-b border-white/5'
            : scrolled
              ? 'bg-[#0D1118]/98 border-b border-white/5'
              : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Dark logo — shown on dark navbar (all non-home, + scrolled home) */}
            <Image
              src="/lns_logo_dark.webp"
              alt="LBow Network Solutions"
              width={192}
              height={192}
              quality={90}
              priority
              sizes="(max-width: 768px) 48px, 64px"
              className={`h-12 md:h-16 w-auto object-contain transition-opacity duration-300 ${
                isLightTheme ? 'opacity-0 absolute pointer-events-none' : 'opacity-100'
              }`}
            />
            {/* Light logo — shown on home page unscrolled (transparent/light context) */}
            <Image
              src="/lns_logo_light.webp"
              alt="LBow Network Solutions"
              width={192}
              height={192}
              quality={90}
              priority
              sizes="(max-width: 768px) 48px, 64px"
              className={`h-12 md:h-16 w-auto object-contain transition-opacity duration-300 ${
                isLightTheme ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
              }`}
            />
          </Link>
 
          {/* Desktop Nav — all links including Home */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
              className={`relative font-body font-medium text-[0.7rem] lg:text-[0.75rem] uppercase tracking-[0.04em] lg:tracking-[0.05em] transition-colors duration-300 group ${
                isActive(link.path)
                  ? (isLightTheme ? 'text-[#0A0A0B]' : 'text-[#EEEEEE]')
                  : (isLightTheme ? 'text-[#434343] hover:text-[#2E7D32]' : 'text-[#A6A6A6] hover:text-[#2E7D32]')
              }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#2E7D32] transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className={`hidden md:inline-flex font-body font-semibold text-sm rounded-md px-5 py-2.5 transition-all duration-300 hover:scale-[1.02] ${
              isLightTheme
                ? 'bg-[#0A0A0B] text-[#EEEEEE] hover:bg-[#434343]'
                : 'bg-[#EEEEEE] text-[#0A0A0B] hover:bg-[#434343] hover:text-[#EEEEEE]'
            }`}
          >
            Get Quote
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              isLightTheme ? 'text-[#0A0A0B]' : 'text-[#EEEEEE]'
            }`}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[60] flex flex-col transition-all duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ background: '#0D1118' }}
      >
        {/* Top bar — logo + close */}
        <div className="flex items-center justify-between px-6 h-[64px] border-b border-white/5 flex-shrink-0">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
            <Image
              src="/lns_logo_dark.webp"
              alt="LBow Network Solutions"
              width={160}
              height={160}
              quality={90}
              priority
              sizes="40px"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#EEEEEE] p-2 -mr-2"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav links — scrollable so nothing clips on small screens */}
        <div className="flex-1 overflow-y-auto py-6 px-6">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-heading text-2xl py-3 border-b border-white/5 transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-[#EEEEEE]'
                    : 'text-[#A6A6A6] hover:text-[#EEEEEE]'
                }`}
                style={{
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.3s ease ${0.05 + index * 0.05}s, transform 0.3s ease ${0.05 + index * 0.05}s`,
                }}
              >
                <span className="flex items-center justify-between">
                  {link.name}
                  {isActive(link.path) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] flex-shrink-0" />
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-6"
            style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.3s ease 0.55s, transform 0.3s ease 0.55s`,
            }}
          >
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#2E7D32] hover:bg-[#256428] text-white font-body font-semibold text-base rounded-lg px-6 py-3.5 transition-all duration-200 active:scale-[0.98]"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Footer info */}
          <div
            className="mt-8 pt-6 border-t border-white/5"
            style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transition: `opacity 0.3s ease 0.65s`,
            }}
          >
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-[#A6A6A6]/60">
              T Dasarahalli, Bangalore
            </p>
            <a href="tel:+918123501407" className="font-mono text-[0.7rem] text-[#A6A6A6] hover:text-white transition-colors mt-1 block">
              +91 81235 01407
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
