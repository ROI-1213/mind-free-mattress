import React from 'react';
import { ArrowRight, Sparkles, Leaf, Recycle, Globe2 } from 'lucide-react';
import { SUSTAINABILITY_PRINCIPLES, type SustainabilityPrincipleItem } from '../../data/lifestyleData';

export const SustainabilitySection: React.FC = () => {
  const getIcon = (iconName: SustainabilityPrincipleItem['iconName']) => {
    switch (iconName) {
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-[#0A2E73]" />;
      case 'Recycle':
        return <Recycle className="w-5 h-5 text-[#0A2E73]" />;
      case 'Globe2':
        return <Globe2 className="w-5 h-5 text-[#0A2E73]" />;
      default:
        return <Leaf className="w-5 h-5 text-[#0A2E73]" />;
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          {/* Left Column: Editorial Content (~3.5 cols on 12-col grid) */}
          <div className="lg:col-span-4 xl:col-span-3.5 flex flex-col justify-between py-2">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#0A2E73]">
                  A CLEANER, GREENER TOMORROW
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.16] tracking-tight text-[#0A2540] mb-4">
                Sustainable Sleep for a{' '}
                <span className="italic font-serif text-[#E3262E]">Brighter Future</span>
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6 max-w-sm">
                We are committed to responsible materials, conscious manufacturing and a healthier planet for generations to come.
              </p>
            </div>

            {/* Primary CTA Button */}
            <div>
              <a
                href="/sustainability"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A2E73] hover:bg-[#071F52] active:scale-95 text-white font-medium text-xs sm:text-[13px] tracking-wide shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Our Sustainability Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Center Column: Wide Landscape Sustainability Bedroom Visual (~5.5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5.5">
            <div className="relative rounded-[26px] sm:rounded-[30px] overflow-hidden shadow-[0_16px_40px_rgba(10,46,115,0.12)] border border-[#E8E2D7] group">
              <img
                src="/images/mindfree/sustainability-bedroom.webp"
                alt="Mindfree Sustainable Natural Sleep Bedroom"
                className="w-full h-full object-cover aspect-[16/10] group-hover:scale-104 transition-transform duration-1000 ease-out"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/mindfree-hero-main.webp';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: 3 Sustainability Principles (~3 cols) */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-center space-y-6 sm:space-y-7">
            {SUSTAINABILITY_PRINCIPLES.map((principle) => (
              <div
                key={principle.id}
                className="group flex items-start gap-4 p-2 rounded-2xl transition-all duration-300 hover:translate-x-1"
              >
                {/* Circular Icon Container */}
                <div className="w-12 h-12 rounded-full bg-white border border-[#E5E0D4] group-hover:border-[#E3262E] shadow-[0_4px_12px_rgba(10,46,115,0.06)] group-hover:shadow-[0_6px_20px_rgba(189,148,88,0.2)] flex items-center justify-center shrink-0 transition-all duration-300">
                  {getIcon(principle.iconName)}
                </div>

                {/* Text Information */}
                <div>
                  <h4 className="font-serif text-[16px] sm:text-[17px] font-semibold text-[#0A2540] leading-snug mb-1 group-hover:text-[#0A2E73] transition-colors">
                    {principle.title}
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
