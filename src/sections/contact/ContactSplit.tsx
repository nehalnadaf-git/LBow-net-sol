'use client'

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CreditCard,
} from 'lucide-react';
import { PipeFlowBg } from '../../components/backgrounds/PipeFlowBg';

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  {
    icon: MapPin,
    label: 'Address',
    value: '51/3, Officers Model Colony, T Dasarahalli, Bangalore — 560057, Opposite Eco Fresh Mart',
    href: null,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9606419076',
    secondary: '+91 8123501407',
    href: 'tel:+919606419076',
    hrefSecondary: 'tel:+918123501407',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'lbownetwork9solutions@gmail.com',
    href: 'mailto:lbownetwork9solutions@gmail.com',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Monday – Saturday: 09:00 AM to 07:00 PM',
    href: null,
  },
  {
    icon: CreditCard,
    label: 'Payment Modes',
    value: 'Net Banking, Cheque, Demand Draft, UPI, Cash',
    href: null,
  },
];

const productOptions = [
  'Select an option',
  'PPR Pipe Unions',
  'PPRC Chemical Pipe',
  'PPCH Pipe Line for Industrial',
  'PPR Pipe Fittings',
  'PPCH Pipe Fittings',
  'Cooling Tower Pipeline',
  'FRP Lining Services',
  'Air Compressor Pipe Line',
  'Other',
];

const ContactSplit = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const leftItems = section.querySelectorAll('.animate-left');
    const rightForm = section.querySelector('.animate-right');

    gsap.fromTo(
      leftItems,
      { opacity: 0, x: -18 },
      {
        opacity: 1,
        x: 0,
        duration: 0.42,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      rightForm,
      { opacity: 0, x: 18 },
      {
        opacity: 1,
        x: 0,
        duration: 0.52,
        delay: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  const inputClass =
    'w-full border border-[rgba(10,10,11,0.2)] rounded-lg px-4 py-3 font-body text-sm text-[#0A0A0B] bg-white placeholder:text-[#A6A6A6] focus:border-[#0A0A0B] focus:ring-2 focus:ring-[rgba(10,10,11,0.1)] focus:outline-none transition-all duration-200';

  const labelClass = 'block font-body font-medium text-sm text-[#0A0A0B] mb-1.5';

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28">
      {/* Premium Background Graphics */}
      <PipeFlowBg isLight={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 sm:gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="animate-left font-heading font-semibold text-xl sm:text-2xl text-[#0A0A0B] mb-6 sm:mb-8">
              Get In Touch
            </h2>

            <div className="flex flex-col gap-6 sm:gap-8">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="animate-left flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[rgba(10,10,11,0.08)] flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#0A0A0B]" />
                    </div>
                    <div>
                      <div className="font-body font-medium text-xs uppercase text-[#434343] tracking-[0.05em] mb-1">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-body text-sm sm:text-base text-[#0A0A0B] hover:text-[#434343] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="font-body text-sm sm:text-base text-[#0A0A0B]">
                          {item.value}
                        </div>
                      )}
                      {'secondary' in item && item.secondary && (
                        <div>
                          <span className="font-body text-xs uppercase text-[#434343] tracking-[0.05em] block mb-0.5">Alternate</span>
                          <a
                            href={'hrefSecondary' in item ? item.hrefSecondary : undefined}
                            className="font-body text-sm sm:text-base text-[#0A0A0B] hover:text-[#434343] transition-colors"
                          >
                            {item.secondary}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick CTAs */}
            <div className="animate-left flex flex-col sm:flex-row lg:flex-col gap-3 mt-8 sm:mt-10">
              <a
                href="tel:+919606419076"
                className="inline-flex items-center justify-center gap-2 bg-[#0A0A0B] hover:bg-[#434343] text-[#EEEEEE] font-body font-semibold rounded-md px-6 py-3 transition-all duration-300 text-sm"
              >
                <Phone size={16} />
                Call Now
              </a>
              <a
                href="https://wa.me/919606419076?text=Hello%2C%20I%20am%20interested%20in%20your%20piping%20solutions."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-body font-semibold rounded-md px-6 py-3 transition-all duration-300 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="animate-right">
            <h2 className="font-heading font-semibold text-xl sm:text-2xl text-[#0A0A0B] mb-2">
              Send an Enquiry
            </h2>
            <p className="font-body text-sm text-[#434343] mb-6 sm:mb-8">
              Fill in the details below and we&apos;ll get back to you shortly.
            </p>

            {submitted ? (
              <div className="bg-[rgba(46,125,50,0.06)] border border-[#2E7D32]/20 rounded-lg p-6 sm:p-8 text-center">
                <div className="font-heading font-semibold text-lg sm:text-xl text-[#0A0A0B] mb-2">
                  Thank You!
                </div>
                <p className="font-body text-sm text-[#434343]">
                  We have received your enquiry and will get back to you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                <div>
                  <label className={labelClass}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Product or Service Interested In
                  </label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    {productOptions.map((option, i) => (
                      <option key={i} value={i === 0 ? '' : option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your requirements..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0A0A0B] hover:bg-[#434343] text-[#EEEEEE] font-body font-semibold rounded-md px-8 py-3.5 transition-all duration-300 text-sm sm:text-base mt-1"
                >
                  Send Enquiry
                </button>

                <p className="font-body text-xs text-[#434343] text-center">
                  We typically respond within 2 hours during working hours (9 AM – 7 PM).
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSplit;
