import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CraftsmanshipBanner: React.FC = () => {
  return (
    <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_24px_60px_rgba(16,39,31,0.18)] select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[420px] lg:min-h-[440px]">
        {/* Left Column: Full-Width / Split Cinematic Photograph */}
        <div className="relative lg:col-span-7 h-[280px] sm:h-[340px] lg:h-full overflow-hidden">
          <img
            src="/images/mindfree/craftsmanship-bedroom.webp"
            alt="Mindfree Luxury Bedroom Craftsmanship Sanctuary"
            className="w-full h-full object-cover object-center scale-102 hover:scale-105 transition-transform duration-1000 ease-out"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/mindfree-hero-main.webp';
            }}
          />

          {/* Smooth Gradient Blend into Right Panel (Desktop) */}
          <div className="hidden lg:block absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-[#0A2E73] pointer-events-none" />
          <div className="lg:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A2E73] to-transparent pointer-events-none" />
        </div>

        {/* Right Column: Deep Forest-Green Editorial Panel */}
        <div className="relative lg:col-span-5 bg-gradient-to-br from-[#0A2E73] to-[#0E231B] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3262E]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top & Middle: Editorial Text */}
          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#E3262E]">
                TRANSFORM YOUR NIGHTS
              </span>
            </div>

            {/* Main Headline */}
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal leading-[1.18] tracking-tight text-white mb-4">
              A Healthier Tomorrow Starts with{' '}
              <span className="italic font-serif text-[#E3262E]">Better Sleep</span>
            </h3>

            {/* Supporting Description */}
            <p className="text-xs sm:text-sm text-[#D5E0D8] leading-relaxed max-w-md mb-8">
              Discover the Mindfree difference and experience sleep the way it should be — pure, restorative, and engineered to perfection.
            </p>
          </div>

          {/* Bottom CTA Button */}
          <div className="relative z-10">
            <a
              href="/mattresses/all"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#0A2E73] hover:bg-[#F8FAFC] active:scale-95 font-semibold text-xs sm:text-[13px] tracking-wide shadow-lg hover:shadow-xl hover:translate-x-0.5 transition-all duration-300"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 text-[#0A2E73]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
