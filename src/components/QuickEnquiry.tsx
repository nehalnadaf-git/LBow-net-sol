'use client';

/**
 * QuickEnquiry — Floating enquiry button + modal form
 *
 * Responsive strategy:
 *  • Mobile  (<640px): Full-width bottom-sheet that slides up from the
 *    viewport bottom edge. Rounded top corners. Scrollable form body.
 *    iOS safe-area-inset respected on the trigger button.
 *  • Desktop (≥640px): 380px panel anchored to bottom-right, scales up
 *    from the trigger button's origin.
 *
 * Audit fixes applied:
 *  ✔ iOS safe-area inset on trigger & sheet
 *  ✔ Panel max-height + overflow-y scroll (keyboard-safe on mobile)
 *  ✔ 44px minimum touch targets on all interactive elements
 *  ✔ `relative` on trigger so pulse ring renders correctly
 *  ✔ Custom duration via inline style, not undefined Tailwind token
 *  ✔ Lenis-compatible scroll lock (class toggle, not style mutation)
 *  ✔ WhatsApp message text updated
 *  ✔ aria-label="Enquiry" panel
 *  ✔ prefers-reduced-motion: animations skipped
 */

import { useState, useRef, useEffect, useId, useCallback } from 'react';
import {
  X,
  Send,
  MessageSquarePlus,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

/* ── Product options ──────────────────────────────────────────────────── */
const PRODUCT_OPTIONS = [
  'PPR Green Pipe',
  'PPR Blue Pipe',
  'PPR Fittings (Green)',
  'PPR Fittings (Blue)',
  'Brass Ball Valve',
  'Butterfly Valve',
  'SS Fittings',
  'Brass Fittings',
  'Pneumatic Fittings',
  'PU / FRL Airgun',
  'Air Compressor Pipeline',
  'Cooling Tower Pipeline',
  'Chiller Line Pipeline',
  'Chemical Line Pipeline',
  'Vacuum Line System',
  'Water Line & General Piping',
  'Other',
];

type Step = 'form' | 'success';

interface FormState {
  name: string;
  phone: string;
  interest: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: '', phone: '', interest: '', message: '' };

/* Shared underline-input class builder */
function inputCls(error?: string) {
  return [
    'w-full bg-transparent border-0 border-b text-[#0A0F1E] text-[15px] font-body',
    'py-2.5 placeholder-[#9CA3AF]',
    'focus:outline-none transition-colors duration-150',
    error
      ? 'border-red-400 focus:border-red-500'
      : 'border-[rgba(10,15,30,0.12)] focus:border-[#2E7D32]',
  ].join(' ');
}

/* Label class */
const labelCls =
  'block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#6B7280] font-body mb-1';

export default function QuickEnquiry() {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /**
   * pastHero — true once the #hero section has scrolled out of view.
   * Defaults to true so the button is always visible on non-home pages
   * (where #hero doesn't exist in the DOM).
   */
  const [pastHero, setPastHero] = useState(true);

  /* ── Hero visibility: hide FAB while hero is in viewport ────────── */
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) {
      // Not on the home page — always show the button
      setPastHero(true);
      return;
    }

    // Start hidden (hero IS visible on page load)
    setPastHero(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show FAB only when hero has left the viewport
        setPastHero(!entry.isIntersecting);
      },
      {
        // Fire when the last 10% of the hero exits the bottom of the screen
        threshold: 0,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  /* ── Scroll lock (Lenis-compatible) ──────────────────────────────── */
  useEffect(() => {
    if (open) {
      document.documentElement.classList.add('qe-scroll-locked');
    } else {
      document.documentElement.classList.remove('qe-scroll-locked');
    }
    return () => document.documentElement.classList.remove('qe-scroll-locked');
  }, [open]);

  /* ── Focus management ────────────────────────────────────────────── */
  useEffect(() => {
    if (open && step === 'form') {
      const t = setTimeout(() => firstInputRef.current?.focus(), 380);
      return () => clearTimeout(t);
    }
  }, [open, step]);

  /* ── Keyboard: Escape ────────────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* ── Handlers ────────────────────────────────────────────────────── */
  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setStep('form');
      setForm(EMPTY_FORM);
      setErrors({});
    }, 400);
  }, []);

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid 10-digit mobile number';
    if (!form.interest) e.interest = 'Please select a product / service';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const msg = encodeURIComponent(
      `*Enquiry — LBow Network Solutions*\n\n` +
        `*Name:* ${form.name}\n` +
        `*Phone:* ${form.phone}\n` +
        `*Interested in:* ${form.interest}\n` +
        (form.message ? `*Message:* ${form.message}` : '')
    );
    const waUrl = `https://wa.me/918123501407?text=${msg}`;

    await new Promise((r) => setTimeout(r, 600));
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitting(false);
    setStep('success');
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((er) => ({ ...er, [name]: undefined }));
    }
  }

  /* ── Render ──────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Backdrop ───────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-[998] bg-black/25 backdrop-blur-[3px]"
          onClick={handleClose}
          aria-hidden="true"
          style={{ animation: 'qe-fade-in 0.22s ease forwards' }}
        />
      )}

      {/* ── Floating trigger button ─────────────────────────────────── */}
      <button
        id="quick-enquiry-trigger"
        onClick={() => pastHero && setOpen((o) => !o)}
        aria-label="Open enquiry form"
        aria-expanded={open}
        aria-controls={`${uid}-panel`}
        className={[
          'fixed z-[999]',
          'flex items-center gap-2 px-4 h-11 rounded-full',
          'font-semibold text-sm text-white select-none',
          'transition-all duration-300 ease-out group',
          /* Hide when: hero still visible OR panel is open */
          pastHero && !open
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 pointer-events-none scale-90 translate-y-4',
        ].join(' ')}
        style={{
          /* env() in Tailwind arbitrary values is unreliable — use inline style */
          bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
          right: '1.5rem',
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 52%, #1565C0 100%)',
          boxShadow: '0 4px 24px rgba(46,125,50,0.38), 0 2px 8px rgba(21,101,192,0.18)',
        }}
      >
        <MessageSquarePlus
          size={17}
          className="shrink-0 group-hover:scale-110 transition-transform duration-200"
        />
        <span className="font-body">Enquiry</span>

        {/* Pulse ring — absolute inset-0 works inside fixed parent */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ animation: 'qe-pulse-ring 2.8s ease-out infinite' }}
        />
      </button>

      {/* ══════════════════════════════════════════════════════════════
          Panel
          Mobile  : full-width bottom-sheet (slides up from bottom)
          Desktop : 380px card anchored bottom-right above the button
         ══════════════════════════════════════════════════════════════ */}
      <div
        id={`${uid}-panel`}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Enquiry"
        className={[
          /* Base — mobile full-width bottom sheet */
          'fixed z-[999] overflow-hidden qe-panel',
          'left-0 right-0 bottom-0 rounded-t-2xl',
          /* Transitions */
          'transition-[opacity,transform] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          open
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-8 pointer-events-none',
        ].join(' ')}
        style={{
          transitionDuration: '360ms',
          boxShadow:
            '0 -4px 40px rgba(10,15,30,0.12), 0 24px 60px rgba(10,15,30,0.18), 0 4px 20px rgba(46,125,50,0.10)',
        }}
      >
        {/* ── Form Step ──────────────────────────────────────────────── */}
        <div
          className={`bg-white flex flex-col ${step === 'form' ? '' : 'hidden'}`}
          /* Max height = 90vh so it never overflows short viewports / keyboards */
          style={{ maxHeight: 'min(90dvh, 640px)' }}
        >
          {/* Drag handle — mobile only visual cue */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden" aria-hidden="true">
            <div className="w-10 h-1 rounded-full bg-[rgba(10,15,30,0.12)]" />
          </div>

          {/* Header */}
          <div
            className="flex items-center justify-between px-5 pt-4 pb-4 sm:pt-5 shrink-0"
            style={{ borderBottom: '1px solid rgba(10,15,30,0.07)' }}
          >
            <div>
              <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#2E7D32] font-body mb-0.5">
                LBow Network Solutions
              </p>
              <h2
                className="text-[1.25rem] font-heading font-bold text-[#0A0F1E] leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                Get in touch
              </h2>
            </div>

            {/* Close — 44×44 touch target */}
            <button
              onClick={handleClose}
              aria-label="Close enquiry form"
              className="w-11 h-11 flex items-center justify-center rounded-full text-[#6B7280] hover:text-[#0A0F1E] hover:bg-[#F0F4F8] active:bg-[#E8EDF3] transition-all duration-150 -mr-1"
            >
              <X size={17} />
            </button>
          </div>

          {/* Scrollable form body */}
          <div
            className="overflow-y-auto overscroll-contain"
            data-lenis-prevent
            /* Scroll within the panel without propagating to Lenis */
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="px-5 pb-6 pt-4 flex flex-col gap-4"
            >
              {/* Name */}
              <div>
                <label htmlFor={`${uid}-name`} className={labelCls}>
                  Name
                </label>
                <input
                  ref={firstInputRef}
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputCls(errors.name)}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-500 mt-1 font-body">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor={`${uid}-phone`} className={labelCls}>
                  Phone
                </label>
                <input
                  id={`${uid}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputCls(errors.phone)}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-500 mt-1 font-body">{errors.phone}</p>
                )}
              </div>

              {/* Interested in */}
              <div>
                <label htmlFor={`${uid}-interest`} className={labelCls}>
                  Interested in…
                </label>
                <div className="relative">
                  <select
                    id={`${uid}-interest`}
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className={[
                      inputCls(errors.interest),
                      'pr-7 appearance-none cursor-pointer',
                      form.interest ? 'text-[#0A0F1E]' : 'text-[#9CA3AF]',
                    ].join(' ')}
                  >
                    <option value="" disabled>
                      Select a product / service
                    </option>
                    {PRODUCT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none"
                  />
                </div>
                {errors.interest && (
                  <p className="text-[11px] text-red-500 mt-1 font-body">{errors.interest}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor={`${uid}-message`} className={labelCls}>
                  Message{' '}
                  <span className="normal-case font-normal tracking-normal">(optional)</span>
                </label>
                <textarea
                  id={`${uid}-message`}
                  name="message"
                  rows={2}
                  placeholder="Any additional details…"
                  value={form.message}
                  onChange={handleChange}
                  className={[inputCls(), 'resize-none'].join(' ')}
                />
              </div>

              {/* Submit row */}
              <div className="flex items-center justify-end gap-3 mt-1 pb-safe">
                <span className="text-[10px] text-[#6B7280] font-body font-semibold tracking-[0.12em] uppercase">
                  Send via WhatsApp
                </span>
                {/* Submit — 44×44 touch target */}
                <button
                  type="submit"
                  id="quick-enquiry-submit"
                  disabled={submitting}
                  aria-label="Submit enquiry via WhatsApp"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
                  style={{
                    background: submitting
                      ? '#9CA3AF'
                      : 'linear-gradient(135deg, #2E7D32 0%, #1565C0 100%)',
                    boxShadow: submitting ? 'none' : '0 4px 16px rgba(46,125,50,0.32)',
                  }}
                >
                  {submitting ? (
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" />
                      <path d="M21 12a9 9 0 00-9-9" />
                    </svg>
                  ) : (
                    <Send size={15} />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Success Step ────────────────────────────────────────────── */}
        <div
          className={step === 'success' ? 'flex flex-col' : 'hidden'}
          style={{
            background: 'linear-gradient(145deg, #1B5E20 0%, #2E7D32 48%, #1565C0 100%)',
            minHeight: '320px',
          }}
        >
          {/* Drag handle — mobile only */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden" aria-hidden="true">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Close — 44×44 */}
          <div className="flex justify-end px-4 pt-4 sm:pt-4 shrink-0">
            <button
              onClick={handleClose}
              aria-label="Close"
              className="w-11 h-11 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all duration-150"
            >
              <X size={17} />
            </button>
          </div>

          {/* Thank you content */}
          <div className="px-6 pb-8 pt-2 flex flex-col flex-1">
            <CheckCircle2 size={34} className="text-white/75 mb-5" />

            <h3
              className="font-heading font-bold text-white leading-[0.95] mb-0"
              style={{ fontSize: 'clamp(2.2rem, 8vw, 2.75rem)', letterSpacing: '-0.03em' }}
            >
              Thank<br />You.
            </h3>

            <div className="mt-6 border-t border-white/20 pt-5 flex-1">
              <p className="text-white/80 text-[15px] font-body leading-relaxed">
                We&apos;ve opened WhatsApp with your details. We&apos;ll be in touch shortly!
              </p>
            </div>

            {/* Done row */}
            <div className="flex items-center justify-end gap-3 mt-6">
              <span className="text-[10px] text-white/60 font-body font-semibold tracking-[0.12em] uppercase">
                Done
              </span>
              <button
                id="quick-enquiry-done"
                onClick={handleClose}
                aria-label="Close enquiry panel"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/25 active:bg-white/30 text-white transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Injected styles ─────────────────────────────────────────── */}
      <style>{`
        /* ── Scroll lock (Lenis-compatible) ─────────────────────────── */
        html.qe-scroll-locked {
          overflow: hidden;
        }
        html.lenis.qe-scroll-locked {
          overflow: hidden !important;
        }

        /* ── Panel: desktop geometry ─────────────────────────────────
           At ≥640px the bottom-sheet becomes an anchored card.
           env() works correctly inside @media rules.
        ─────────────────────────────────────────────────────────────── */
        @media (min-width: 640px) {
          .qe-panel {
            left: auto;
            right: 1.5rem;
            bottom: calc(5.5rem + env(safe-area-inset-bottom, 0px));
            width: 380px;
            border-radius: 1rem;
          }
          /* Desktop closed state: scale from origin bottom-right */
          .qe-panel.opacity-0 {
            transform: translateY(12px) scale(0.92);
            transform-origin: bottom right;
          }
          .qe-panel.opacity-100 {
            transform: translateY(0) scale(1);
          }
        }

        /* ── Animations ──────────────────────────────────────────────── */
        @keyframes qe-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Pulse ring — box-shadow radiates from trigger */
        @keyframes qe-pulse-ring {
          0%  { box-shadow: 0 0 0 0    rgba(46,125,50,0.55); opacity: 1; }
          65% { box-shadow: 0 0 0 16px rgba(46,125,50,0);    opacity: 0; }
          100%{ box-shadow: 0 0 0 0    rgba(46,125,50,0);    opacity: 0; }
        }

        /* ── Reduced motion ──────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          #quick-enquiry-trigger span[aria-hidden] {
            animation: none !important;
          }
          .qe-panel {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
