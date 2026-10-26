import React from 'react';
import { ArrowRight, Sparkles, Layers, Gem, ShieldCheck } from 'lucide-react';
import { DIFFERENCE_STATS, SLEEP_FEATURES, type StatItem } from '../../data/differenceData';
import { ExplodedMattressVisual } from './ExplodedMattressVisual';
import { MaterialBenefits } from './MaterialBenefits';
import { SleepFeatureCard } from './SleepFeatureCard';
import { CraftsmanshipBanner } from './CraftsmanshipBanner';

export const MindfreeDifferenceSection: React.FC = () => {
  const getStatIcon = (iconName: StatItem['iconName']) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-4 h-4 text-[#E3262E]" />;
      case 'Gem':
        return <Gem className="w-4 h-4 text-[#E3262E]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-[#E3262E]" />;
      default:
        return <Layers className="w-4 h-4 text-[#E3262E]" />;
    }
  };

  return (
    <section
      id="the-mindfree-difference"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] overflow-hidden select-none border-t border-[#E2E8F0]"
      aria-label="The Mindfree Difference: Technology & Benefits"
    >
      {/* Subtle Botanical Ambient Depth and Background Glows */}
      <div className="absolute top-1/6 -left-36 w-80 h-80 bg-[#0A2E73]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-36 w-96 h-96 bg-[#E3262E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* 1. MAIN UPPER 3-COLUMN COMPOSITION                        */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* LEFT EDITORIAL COLUMN (~29% width: 3.5 cols on 12-col grid) */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col justify-between h-full">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#0A2E73]">
                  THE MINDFREE DIFFERENCE
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal leading-[1.14] tracking-tight text-[#0A2540] mb-4">
                Thoughtfully Engineered for{' '}
                <span className="italic font-serif text-[#E3262E]">Better Sleep</span>
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6 max-w-md">
                From carefully selected materials to intelligent design, every Mindfree mattress is crafted to
                give you a healthier, deeper and more restorative sleep.
              </p>

              {/* Primary CTA */}
              <div className="mb-8 sm:mb-10">
                <a
                  href="/craftsmanship"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A2E73] hover:bg-[#071F52] active:scale-95 text-white font-medium text-xs sm:text-[13px] tracking-wide shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>Our Craftsmanship</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* 3 Compact Statistics */}
            <div className="pt-6 border-t border-[#EAE5DC] grid grid-cols-3 gap-2 sm:gap-3">
              {DIFFERENCE_STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1 sm:gap-1.5 mb-1">
                    {getStatIcon(stat.iconName)}
                    <span className="font-serif text-sm sm:text-base lg:text-xl font-bold text-[#0A2540] truncate">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-[#64748B] leading-tight break-words">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CENTRAL EXPLODED 3D MATTRESS (~42% width: 5 cols on 12-col grid) */}
          <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center">
            <ExplodedMattressVisual />
          </div>

          {/* RIGHT BENEFITS TIMELINE (~29% width: 3.5 cols on 12-col grid) */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-center">
            <MaterialBenefits />
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. THREE CINEMATIC FEATURE CARDS                          */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 lg:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {SLEEP_FEATURES.map((item) => (
              <SleepFeatureCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. BOTTOM CINEMATIC BEDROOM CRAFTSMANSHIP BANNER          */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 lg:mt-20">
          <CraftsmanshipBanner />
        </div>
      </div>
    </section>
  );
};
