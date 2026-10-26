import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Truck } from 'lucide-react';

export const MindfreeFinalCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = id;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#F8FAFC] overflow-hidden select-none"
    >
      {/* Subtle architectural background ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-[#E3262E]/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#0A2E73]/5 blur-3xl" />
        {/* Subtle architectural top pinstripe */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E3262E]/30 to-transparent" />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          
          {/* Left Column: Editorial Call to Action (42% width on desktop) */}
          <div
            className={`lg:col-span-5 flex flex-col justify-center transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 mb-5 sm:mb-6">
              <span className="w-6 h-px bg-[#E3262E]" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#E3262E]">
                YOUR MINDFREE EXPERIENCE BEGINS HERE
              </span>
            </div>

            {/* Main Headline */}
            <h2
              id="final-cta-heading"
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-serif font-light text-[#071F52] leading-[1.12] tracking-tight mb-6"
            >
              Your Best Nights
              <br />
              <span className="italic font-normal text-[#E3262E]">Start Here.</span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#0F2952]/80 font-sans leading-relaxed mb-8 max-w-lg">
              Discover thoughtfully crafted comfort and find the Mindfree mattress that feels right for you. Engineered with natural botanical latex and targeted pressure-relief pocket springs.
            </p>

            {/* Trust Reassurance Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 mb-8 border-y border-[#E2E8F0]/70">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E3262E] shrink-0 stroke-[2]" />
                <span className="text-xs font-medium text-[#0F2952] leading-snug">
                  100-Night In-Home Trial
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#E3262E] shrink-0 stroke-[2]" />
                <span className="text-xs font-medium text-[#0F2952] leading-snug">
                  10-Year Warranty
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#E3262E] shrink-0 stroke-[2]" />
                <span className="text-xs font-medium text-[#0F2952] leading-snug">
                  White-Glove Setup
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              {/* Primary CTA */}
              <a
                href="#mattress-collection"
                onClick={(e) => handleScrollTo(e, 'mattress-collection')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0A2E73] text-[#F8FAFC] font-sans font-medium text-sm tracking-wide shadow-lg shadow-[#0A2E73]/20 hover:shadow-xl hover:shadow-[#0A2E73]/35 hover:bg-[#071F52] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-[#E3262E]/30 overflow-hidden cursor-pointer"
              >
                {/* Subtle metallic sheen sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform pointer-events-none" />
                <span className="relative z-10 font-semibold tracking-wide">
                  Explore Our Mattresses
                </span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300 stroke-[2.2]" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#mattress-selector"
                onClick={(e) => handleScrollTo(e, 'mattress-selector')}
                className="group inline-flex items-center justify-center gap-2 py-3 px-2 text-sm font-semibold text-[#0A2E73] hover:text-[#E3262E] transition-colors duration-200 cursor-pointer relative"
              >
                <span className="border-b border-[#0A2E73]/30 group-hover:border-[#E3262E] pb-0.5 transition-colors">
                  Find Your Perfect Mattress
                </span>
                <span className="text-xs text-[#E3262E] group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Bedroom Showcase (58% width on desktop) */}
          <div
            className={`lg:col-span-7 relative group transition-all duration-1000 delay-200 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
            }`}
          >
            {/* Architectural Frame with Sculpted Corner */}
            <div className="relative rounded-tl-[60px] sm:rounded-tl-[80px] lg:rounded-tl-[110px] rounded-br-[36px] rounded-tr-2xl rounded-bl-2xl overflow-hidden shadow-2xl shadow-[#071F52]/15 border border-[#E3262E]/35 bg-[#E8EEE5]/30">
              
              {/* Soft Left-Edge Gradient Mask (seamless desktop blending) */}
              <div className="absolute inset-y-0 left-0 w-24 xl:w-32 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent pointer-events-none z-10 hidden lg:block" />

              {/* Top Accent Champagne-Gold Pinstripe */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#E3262E] via-[#E3262E]/60 to-transparent z-10 pointer-events-none" />

              {/* Aspect Ratio Container */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/10] w-full overflow-hidden bg-[#E2DBD0]/40">
                <img
                  src="/images/mindfree/final-cta-bedroom.webp"
                  alt="Mindfree luxury master bedroom with hand-tufted king-size mattress on deep forest-green upholstered bed frame in warm morning sunlight"
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out motion-safe:group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to jpg if needed
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.endsWith('.jpg')) {
                      target.src = '/images/mindfree/final-cta-bedroom.jpg';
                    }
                  }}
                />

                {/* Subtle cinematic ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071F52]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Architectural Badge */}
              <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 bg-[#071F52]/85 backdrop-blur-md border border-[#E3262E]/40 rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-2xl text-left z-20 flex items-center gap-3.5 max-w-[90%] sm:max-w-none transition-transform duration-300 group-hover:-translate-y-1">
                <div className="w-8 h-8 rounded-xl bg-[#E3262E]/20 border border-[#E3262E]/40 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#E3262E]" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E3262E]">
                    MINDFREE MASTER SUITE
                  </div>
                  <div className="text-xs sm:text-[13px] font-medium text-[#F8FAFC] tracking-tight">
                    Grand Sovereign • Handcrafted Latex & Pocket Springs
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle decorative framing shadow / backdrop flourish */}
            <div className="absolute -bottom-3 -right-3 w-40 h-40 bg-[#E3262E]/10 rounded-full blur-2xl -z-10 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
