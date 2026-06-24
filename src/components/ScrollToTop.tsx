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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full border border-[#434343] bg-[#2E7D32] flex items-center justify-center transition-all duration-300 hover:bg-[#1b5e20] group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp
        size={18}
        className="text-[#EEEEEE] group-hover:text-white transition-colors duration-300"
      />
    </button>
  );
};

export default ScrollToTop;
