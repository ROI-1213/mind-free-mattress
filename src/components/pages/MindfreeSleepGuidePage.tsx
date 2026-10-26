import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Clock,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { SLEEP_GUIDES } from '../../data/sleepGuideData';
import { MATTRESS_PRODUCTS } from '../../data/pdpData';

export const MindfreeSleepGuidePage: React.FC = () => {
  const { guideSlug, navigateToSleepGuide, navigateToProduct } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Ergonomics', 'Material Science', 'Sleep Wellness', 'Care & Longevity'];

  // Current standalone article if guideSlug is active
  const currentArticle = SLEEP_GUIDES.find((g) => g.slug === guideSlug);

  // Filtered articles list for hub
  const filteredArticles = SLEEP_GUIDES.filter((g) => {
    if (selectedCategory === 'all') return true;
    return g.category === selectedCategory;
  });

  // If a specific article is open
  if (currentArticle) {
    const recommendedProduct = currentArticle.recommendedMattressSlug
      ? MATTRESS_PRODUCTS[currentArticle.recommendedMattressSlug]
      : null;

    return (
      <div className="bg-[#F8FAFC] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breadcrumb Navigation */}
          <button
            type="button"
            onClick={() => navigateToSleepGuide()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0A2E73] hover:text-[#E3262E] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Sleep Guides</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#0A2E73] text-[#F8FAFC] text-[10px] font-bold uppercase tracking-wider">
                {currentArticle.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-[#64748B]">
                <Clock className="w-3.5 h-3.5" />
                {currentArticle.readTime}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071F52] leading-tight">
              {currentArticle.title}
            </h1>

            <div className="flex items-center gap-3 pt-2 border-b border-[#E2E8F0] pb-6">
              <div className="w-10 h-10 rounded-full bg-[#0A2E73] text-[#E3262E] flex items-center justify-center font-serif font-bold text-sm">
                {currentArticle.author.charAt(0)}
              </div>
              <div>
                <span className="text-xs font-bold text-[#071F52] block">
                  {currentArticle.author}
                </span>
                <span className="text-[11px] text-[#64748B]">{currentArticle.role}</span>
              </div>
              <span className="text-xs text-[#64748B] ml-auto">{currentArticle.date}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden bg-[#F8FAFC] shadow-xs">
            <img
              src={currentArticle.heroImage}
              alt={currentArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Takeaways Box */}
          <div className="bg-white rounded-3xl border-2 border-[#E3262E]/40 p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E3262E] font-bold">
              <Sparkles className="w-4 h-4 text-[#E3262E]" />
              <span>Executive Clinical Summary</span>
            </div>
            <p className="text-sm font-serif italic text-[#071F52] leading-relaxed">
              "{currentArticle.excerpt}"
            </p>
            <ul className="space-y-2 pt-3 border-t border-[#E2E8F0]">
              {currentArticle.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#0F2952]">
                  <Check className="w-4 h-4 text-[#E3262E] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Article Body */}
          <div className="space-y-8 text-[#0F2952] leading-relaxed text-sm sm:text-base">
            {currentArticle.sections.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#071F52] pt-4">
                  {sec.heading}
                </h2>
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-[#364942] leading-relaxed text-sm sm:text-[15px]">
                    {p}
                  </p>
                ))}
                {sec.callout && (
                  <div className="my-4 p-5 rounded-2xl bg-[#DBEAFE]/70 border-l-4 border-[#0A2E73] text-xs sm:text-sm font-medium text-[#0A2E73]">
                    {sec.callout}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Recommended Product Box */}
          {recommendedProduct && (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs mt-12">
              <div className="flex items-center gap-4">
                <img
                  src={recommendedProduct.gallery[0]?.url}
                  alt={recommendedProduct.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-[#E2E8F0]"
                />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E3262E] font-bold">
                    Anatomically Calibrated Product
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#071F52]">
                    {recommendedProduct.name}
                  </h4>
                  <p className="text-xs text-[#64748B]">{recommendedProduct.tagline}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigateToProduct(recommendedProduct.slug)}
                className="shrink-0 px-5 py-2.5 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] text-white text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore This Formulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Sleep Guide Hub View
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* 1. HERO BANNER */}
      <section className="relative bg-[#0A2E73] text-[#F8FAFC] pt-14 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#1244A8] via-[#0A2E73] to-[#071F52] opacity-90 pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#E3262E]/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1520px] mx-auto max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono tracking-widest uppercase text-[#E3262E]">
            <BookOpen className="w-3.5 h-3.5 text-[#E3262E]" />
            <span>Sleep Architecture & Ergonomics Journal</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            The Sleep Science Guide,{' '}
            <span className="italic font-light text-[#E3262E]">Unfiltered Clinical Insights.</span>
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans">
            Explore deep architectural research on nocturnal spinal decompression, material
            aeration physics, and how posture calibration transforms daytime human energy.
          </p>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <section className="sticky top-[66px] sm:top-[72px] z-20 bg-[#F8FAFC]/95 backdrop-blur-md border-b border-[#E2E8F0] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1520px] mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0A2E73] text-[#F8FAFC] shadow-xs'
                  : 'bg-white text-[#64748B] hover:text-[#0A2E73] border border-[#E2E8F0]'
              }`}
            >
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. ARTICLES GRID */}
      <section className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.slug}
              className="bg-white rounded-3xl border border-[#E2E8F0] hover:border-[#E3262E]/50 overflow-hidden shadow-xs hover:shadow-[0_16px_40px_rgba(10,46,115,0.08)] transition-all flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-60 bg-[#F8FAFC] overflow-hidden">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#0A2E73] text-[#F8FAFC] text-[10px] font-bold uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[10.5px] flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-[#E3262E]" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3
                    onClick={() => navigateToSleepGuide(article.slug)}
                    className="font-serif text-xl font-bold text-[#071F52] group-hover:text-[#0A2E73] transition-colors leading-snug cursor-pointer"
                  >
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                  <div className="text-[11px] text-[#64748B]">
                    <span>By </span>
                    <span className="font-semibold text-[#071F52]">{article.author}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigateToSleepGuide(article.slug)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A2E73] group-hover:text-[#E3262E] transition-colors cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
