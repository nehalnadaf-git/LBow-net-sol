'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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

  const isLightTheme = !scrolled && pathname === '/';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-400 ${
          scrolled
            ? 'bg-[#0A0A0B]/95 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className={`font-heading font-bold text-xl md:text-2xl leading-tight transition-colors duration-300 ${
              isLightTheme ? 'text-[#0A0A0B]' : 'text-[#EEEEEE]'
            }`}>
              LBow<span className="text-[#2E7D32]">.</span>
            </span>
            <span className={`font-body text-[0.6rem] md:text-[0.7rem] tracking-[0.1em] uppercase -mt-0.5 transition-colors duration-300 ${
              isLightTheme ? 'text-[#434343]' : 'text-[#A6A6A6]'
            }`}>
              Network Solutions
            </span>
          </Link>
 
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.filter(l => l.path !== '/').map((link) => (
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
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-[#0A0A0B] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-5 right-5 text-[#EEEEEE] p-2"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>


        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-heading text-3xl transition-all duration-300 ${
                isActive(link.path) ? 'text-[#EEEEEE]' : 'text-[#A6A6A6] hover:text-[#EEEEEE]'
              }`}
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.4s ease ${0.1 + index * 0.1}s`,
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 bg-[#EEEEEE] hover:bg-[#434343] hover:text-[#EEEEEE] text-[#0A0A0B] font-body font-semibold text-lg rounded-md px-8 py-3 transition-all duration-300"
            style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ease ${0.6}s`,
            }}
          >
            Get Quote
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
