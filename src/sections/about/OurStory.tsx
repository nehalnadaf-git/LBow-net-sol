'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';

gsap.registerPlugin(ScrollTrigger);

const values = [
  'Quality First — Only premium-grade materials',
  'Customer Satisfaction — Your success is our success',
  'On-Time Delivery — We respect your timelines',
];

const OurStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const leftImage = section.querySelector('.animate-left');
    const rightElements = section.querySelectorAll('.animate-right');

    gsap.fromTo(
      leftImage,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.52,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      rightElements,
      { opacity: 0, x: 20 },
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28">
      {/* Premium Background Graphics */}
      <DotMatrixBg isLight={true} />

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div className="animate-left relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/about-section-home-mixed.webp"
              alt="Professional green PPR pipe network installation by LBow Network Solutions"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>

          {/* Right - Text */}
          <div>
            <div className="animate-right font-body font-medium text-sm uppercase tracking-[0.1em] text-[#434343] mb-4">
              Our Story
            </div>
            <h2 className="animate-right font-heading font-semibold text-2xl sm:text-[1.9rem] md:text-[2.2rem] text-[#0A0A0B] leading-[1.2] mb-6">
              From a Small Shop to Bangalore&apos;s Leading Pipe Dealer
            </h2>
            <p className="animate-right font-body text-base text-[#434343] leading-[1.7] mb-4">
              Established in 2018 in Peenya, Bengaluru, LBow Network Solutions started as a small pipe fitting shop with a big vision — to provide premium quality piping solutions at competitive prices. Our founder&apos;s commitment to quality and customer satisfaction quickly earned us a reputation as a reliable supplier in the local industrial community.
            </p>
            <p className="animate-right font-body text-base text-[#434343] leading-[1.7] mb-4">
              Over the years, we&apos;ve expanded our product range to include PPR green and blue pipes, PPRC chemical pipes, PPCH industrial pipe lines, PPR and PPCH pipe fittings, brass ball valves, butterfly valves, SS fittings, pneumatic fittings, and PU/FRL airguns. Today, we serve over 200 industrial clients across India, from small workshops to large manufacturing facilities. We are an <strong>Authorized Prince Pipes Dealer</strong>, an <strong>MSME Certified</strong> business (Udyam No: UDYAM-KR-03-0717969), and a GST registered enterprise (GSTIN: 29AUIPV4726C2ZB).
            </p>
            <p className="animate-right font-body text-base text-[#434343] leading-[1.7] mb-8">
              Our mission is simple: to provide the best piping solutions with unmatched service. Every PPR product we sell comes with a 10-year warranty, and our expert team ensures proper installation. We offer free demo for all our product ranges — call us to schedule one.
            </p>

            {/* Values */}
            <div className="animate-right flex flex-col gap-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-[#0A0A0B] flex-shrink-0" />
                  <span className="font-body text-sm text-[#434343]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
