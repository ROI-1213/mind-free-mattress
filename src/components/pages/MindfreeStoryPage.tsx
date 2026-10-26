import React from 'react';
import {
  Sparkles,
  Award,
  ShieldCheck,
  Leaf,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useHomePageContent } from '../../context/HomePageContentContext';

const PILLAR_ICONS = [Leaf, Award, Layers, ShieldCheck];

export const MindfreeStoryPage: React.FC = () => {
  const { navigateToMattresses, navigateToStoreLocator } = useNavigation();
  const { whyMindfreeData } = useHomePageContent();

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* 1. HERO STORY BANNER */}
      <section className="relative bg-[#0A2E73] text-[#F8FAFC] pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#1244A8] via-[#0A2E73] to-[#071F52] opacity-90 pointer-events-none" />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#E3262E]/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold tracking-wider uppercase text-white">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>{whyMindfreeData.hero.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {whyMindfreeData.hero.headlineMain}{' '}
            <span className="font-bold text-white">{whyMindfreeData.hero.headlineHighlight}</span>
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            {whyMindfreeData.hero.description}
          </p>
        </div>
      </section>

      {/* 2. THE MANIFESTO */}
      <section className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E3262E] font-bold">
              {whyMindfreeData.manifesto.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#071F52] leading-snug">
              {whyMindfreeData.manifesto.title}
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#364942] leading-relaxed">
              {whyMindfreeData.manifesto.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[420px] rounded-3xl overflow-hidden shadow-lg bg-[#0A2E73]">
            <img
              src={whyMindfreeData.manifesto.image}
              alt="Mindfree Master Craftsmanship"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/mindfree/sustainability-bedroom.webp';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <p className="text-xs font-serif italic text-white/90">
                {whyMindfreeData.manifesto.imageQuote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR PILLARS OF MINDFREE CRAFTSMANSHIP */}
      <section className="bg-white border-y border-[#E2E8F0] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1520px] mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E3262E] font-bold">
              {whyMindfreeData.pillarsSection.eyebrow}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#071F52]">
              {whyMindfreeData.pillarsSection.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyMindfreeData.pillarsSection.pillars.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
              return (
                <div
                  key={`${pillar.num}-${idx}`}
                  className="bg-[#F8FAFC] rounded-3xl border border-[#E2E8F0] p-6 space-y-4 hover:border-[#E3262E]/60 transition-colors shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#E3262E]">{pillar.num}</span>
                    <Icon className="w-5 h-5 text-[#0A2E73]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#071F52]">{pillar.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MATERIAL PROVENANCE */}
      <section className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E3262E] font-bold">
            {whyMindfreeData.provenanceSection.eyebrow}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#071F52]">
            {whyMindfreeData.provenanceSection.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyMindfreeData.provenanceSection.items.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-[#E2E8F0] p-6 space-y-3">
              <h4 className="font-serif text-base font-bold text-[#071F52]">{item.title}</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-[#0A2E73] text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold">{whyMindfreeData.ctaBanner.title}</h3>
            <p className="text-xs text-white/70">{whyMindfreeData.ctaBanner.subtitle}</p>
          </div>

          <div className="shrink-0 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigateToMattresses()}
              className="px-6 py-3 rounded-2xl bg-[#E3262E] hover:bg-[#C81E25] text-white text-xs font-semibold tracking-wide transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>{whyMindfreeData.ctaBanner.primaryButtonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateToStoreLocator()}
              className="px-6 py-3 rounded-2xl border border-white/30 text-white hover:bg-white/10 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              {whyMindfreeData.ctaBanner.secondaryButtonText}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
