import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MATTRESS_COLLECTIONS, type MattressCollectionItem } from '../../data/collectionData';
import { ExpandableMattressCard } from './ExpandableMattressCard';
import { PromoPanels } from './PromoPanels';

export const MattressCollectionSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const cat = new URLSearchParams(window.location.search).get('category');
      if (cat && MATTRESS_COLLECTIONS.some((item) => item.id === cat)) {
        return cat;
      }
    }
    return 'orthopedic';
  });

  return (
    <section
      id="mattress-collection"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] overflow-hidden select-none border-t border-[#E2E8F0]"
      aria-label="MINDFREE Mattress Collection"
    >
      {/* Background Ambient Glow & Subtle Botanical Atmosphere */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#E3262E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-[#0A2E73]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Section Introduction (Editorial Layout) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#0A2E73]">
                EXPLORE OUR COLLECTION
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.12] tracking-tight text-[#0A2540]">
              Mattresses for Every{' '}
              <span className="italic font-serif text-[#E3262E]">Kind of Sleep</span>
            </h2>

            {/* Description */}
            <p className="mt-3.5 text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed max-w-xl">
              Discover thoughtfully crafted mattresses designed with advanced materials and innovative
              technology for healthier, deeper, more restful sleep.
            </p>
          </div>

          {/* Top Section CTA Button */}
          <div className="shrink-0">
            <a
              href="/mattresses/all"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A2E73] hover:bg-[#071F52] active:scale-95 text-white font-medium text-xs sm:text-[13px] tracking-wide shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>Explore All Mattresses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* 2. Mobile/Tablet Category Navigation Pills (< lg screens) */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-4">
          {MATTRESS_COLLECTIONS.map((item: MattressCollectionItem) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border ${
                activeId === item.id
                  ? 'bg-[#0A2E73] text-white border-[#0A2E73] shadow-sm'
                  : 'bg-white text-[#0A2540] border-[#E2E8F0] hover:border-[#E3262E]'
              }`}
            >
              <span>{item.name.replace(' Mattresses', '')}</span>
            </button>
          ))}
        </div>

        {/* 3. Cinematic Expanding Card System */}
        <div
          className="flex flex-col lg:flex-row items-stretch gap-3 sm:gap-4 w-full"
          role="tablist"
          aria-label="Mattress categories expanding showcase"
        >
          {MATTRESS_COLLECTIONS.map((item: MattressCollectionItem) => (
            <ExpandableMattressCard
              key={item.id}
              item={item}
              isExpanded={activeId === item.id}
              onActivate={() => setActiveId(item.id)}
            />
          ))}
        </div>

        {/* 4. Three Lower Promotional Feature Panels */}
        <PromoPanels />
      </div>
    </section>
  );
};
