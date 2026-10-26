import React from 'react';
import { ArrowRight, Sparkles, Leaf, Settings, Users, Heart } from 'lucide-react';
import { BRAND_PILLARS, type BrandPillarItem } from '../../data/brandStoryData';

export const WhyChooseMindfree: React.FC = () => {
  const getIcon = (iconName: BrandPillarItem['iconName']) => {
    switch (iconName) {
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-[#E3262E]" />;
      case 'Settings':
        return <Settings className="w-5 h-5 text-[#E3262E]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#E3262E]" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#E3262E]" />;
      default:
        return <Leaf className="w-5 h-5 text-[#E3262E]" />;
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          {/* Left Column: Editorial Intro (~28% = 3.5 cols on 12-col grid) */}
          <div className="lg:col-span-4 xl:col-span-3.5 flex flex-col justify-between py-2">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#0A2E73]">
                  WHY CHOOSE MINDFREE
                </span>
                <span className="w-8 h-[1px] bg-[#E3262E]/50 hidden sm:inline-block" />
              </div>

              {/* Main Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal leading-[1.12] tracking-tight text-[#0A2E73] mb-4">
                Sleep Well <br />
                Live <span className="italic font-serif text-[#E3262E]">Better</span>
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6 max-w-sm">
                Mindfree is more than a mattress brand. We create restful sleep experiences with
                thoughtful craftsmanship, reliable quality, and care that stays with you every day.
              </p>
            </div>

            {/* Primary CTA Button */}
            <div>
              <a
                href="/our-story"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A2E73] hover:bg-[#071F52] active:scale-95 text-white font-medium text-xs sm:text-[13px] tracking-wide shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Explore Our Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Center Column: Luxury Bedroom Photography (~44% = 5.5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5.5">
            <div className="relative rounded-[26px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(10,46,115,0.14)] border border-[#E2E8F0] group">
              <img
                src="/images/mindfree/why-choose-bedroom.webp"
                alt="Mindfree Luxury Boutique Bedroom Suite with Balcony"
                className="w-full h-full object-cover aspect-[16/10] group-hover:scale-104 transition-transform duration-1000 ease-out"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/mindfree/craftsmanship-bedroom.webp';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: 4 Brand Pillars (~28% = 3 cols) */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-center space-y-5 sm:space-y-6">
            {BRAND_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="group flex items-start gap-3.5 sm:gap-4 p-2 rounded-2xl transition-all duration-300 hover:translate-x-1"
              >
                {/* Circular Icon Container */}
                <div className="w-11 h-11 rounded-full bg-white border border-[#E2E8F0] group-hover:border-[#E3262E] shadow-[0_3px_10px_rgba(10,46,115,0.06)] group-hover:shadow-[0_6px_20px_rgba(189,139,67,0.2)] flex items-center justify-center shrink-0 transition-all duration-300">
                  {getIcon(pillar.iconName)}
                </div>

                {/* Text Information */}
                <div>
                  <h4 className="font-serif text-[15.5px] sm:text-[16.5px] font-semibold text-[#0A2E73] leading-snug mb-0.5 group-hover:text-[#0A2E73] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {pillar.description}
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
