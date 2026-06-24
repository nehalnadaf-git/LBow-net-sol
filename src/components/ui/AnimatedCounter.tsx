'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  /** The final numeric value to count up to */
  to: number;
  /** Text before the number (e.g. '₹', '<') */
  prefix?: string;
  /** Text after the number (e.g. '+', ' Years', 'k') */
  suffix?: string;
  /** Duration of the count-up animation in seconds */
  duration?: number;
  /** Decimal places to show */
  decimals?: number;
  /** CSS class name(s) for the span wrapper */
  className?: string;
  /** Delay before starting (seconds) */
  delay?: number;
  /** Separator for thousands (e.g. ',') */
  separator?: string;
}

/**
 * AnimatedCounter – counts from 0 to `to` when scrolled into view.
 * Powered by GSAP ScrollTrigger.
 */
const AnimatedCounter = ({
  to,
  prefix = '',
  suffix = '',
  duration = 1.8,
  decimals = 0,
  className,
  delay = 0,
  separator = '',
}: AnimatedCounterProps) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const objRef = useRef({ val: 0 });

  useEffect(() => {
    const span = spanRef.current;
    if (!span) return;

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      if (separator) {
        const [int, dec] = fixed.split('.');
        const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return dec !== undefined ? `${formatted}.${dec}` : formatted;
      }
      return fixed;
    };

    objRef.current.val = 0;
    span.textContent = `${prefix}0${suffix}`;

    const st = ScrollTrigger.create({
      trigger: span,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(objRef.current, {
          val: to,
          duration,
          delay,
          ease: 'power2.out',
          onUpdate: () => {
            if (span) {
              span.textContent = `${prefix}${format(objRef.current.val)}${suffix}`;
            }
          },
        });
      },
    });

    return () => st.kill();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={spanRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
};

export default AnimatedCounter;
