'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    // On desktop Lenis intercepts the scroll and applies its own smooth-scroll;
    // passing behavior:'smooth' here would create a double-smooth conflict.
    // On touch/mobile Lenis is in pass-through mode, so window.scrollTo is fine.
    window.scrollTo({ top: 0 });
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed z-40 flex items-center justify-center w-11 h-11 rounded-full border border-[#434343] bg-[#2E7D32] text-white transition-all duration-300 hover:bg-[#1b5e20] group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{
        /* Sit above the Enquiry FAB (44px) + 24px gap + safe-area */
        bottom: 'calc(44px + 1.5rem + 16px + env(safe-area-inset-bottom, 0px))',
        right: '1.5rem',
      }}
      aria-label="Scroll to top"
    >
      <ArrowUp
        size={18}
        className="group-hover:text-white transition-colors duration-300"
      />
    </button>
  );
};

export default ScrollToTop;
