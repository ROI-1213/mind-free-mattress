import React from 'react';
import { ArrowRight, Sparkles, Leaf, Waves, ShieldCheck, Home } from 'lucide-react';
import { CRAFT_DETAILS, type CraftDetailItem } from '../../data/brandStoryData';

export const CraftsmanshipPromise: React.FC = () => {
  const getIcon = (iconName: CraftDetailItem['iconName']) => {
    switch (iconName) {
      case 'Leaf':
        return <Leaf className="w-4 h-4 text-[#E3262E]" />;
      case 'Waves':
        return <Waves className="w-4 h-4 text-[#E3262E]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-[#E3262E]" />;
      case 'Home':
        return <Home className="w-4 h-4 text-[#E3262E]" />;
      default:
        return <Leaf className="w-4 h-4 text-[#E3262E]" />;
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12 items-stretch">
          {/* Left Column: Editorial (~24% = ~280-320px) */}
          <div className="lg:w-[280px] xl:w-[320px] shrink-0 flex flex-col justify-between py-2 sm:py-4">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#0A2E73]">
                  OUR PROMISE TO YOU
                </span>
                <span className="w-8 h-[1px] bg-[#E3262E]/50 hidden sm:inline-block" />
              </div>

              {/* Main Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.14] tracking-tight text-[#0A2E73] mb-4">
                Comfort in Every{' '}
                <span className="italic font-serif text-[#E3262E]">Detail</span>
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
                From materials to manufacturing, every detail is thoughtfully considered to give you
                a better and more consistent sleep experience.
              </p>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-2">
              <a
                href="/craftsmanship"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#0A2E73] hover:text-white border border-[#0A2E73]/30 hover:border-[#0A2E73] text-[#0A2E73] font-medium text-xs sm:text-[13px] tracking-wide shadow-xs hover:shadow-md transition-all duration-300"
              >
                <span>Learn About Our Process</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Area: 4 Arched Detail Cards (~76%) */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {CRAFT_DETAILS.map((card) => (
              <div
                key={card.id}
                className="group rounded-[22px] overflow-hidden bg-white border border-[#E2E8F0] shadow-[0_8px_24px_rgba(10,46,115,0.05)] hover:shadow-[0_16px_36px_rgba(10,46,115,0.12)] hover:border-[#E3262E]/60 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1 select-none"
              >
                {/* Top Arched Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F8FAFC] rounded-t-[36px] rounded-b-[18px]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/mindfree-hero-main.webp';
                    }}
                  />

                  {/* Floating Circular Icon Badge */}
                  <div className="absolute left-4 bottom-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur-xs border border-[#E8E2D7] shadow-md flex items-center justify-center text-[#E3262E] group-hover:scale-110 group-hover:border-[#E3262E] transition-all duration-300">
                    {getIcon(card.iconName)}
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-[16.5px] sm:text-[17.5px] font-semibold text-[#0A2E73] leading-snug mb-1.5 group-hover:text-[#0A2E73] transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
