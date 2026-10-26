import React, { useState, useMemo } from 'react';
import {
  FAQ_ITEMS,
  type FAQCategoryId,
} from '../../data/faqData';
import { FAQCategoryFilter } from './FAQCategoryFilter';
import { FAQSearch } from './FAQSearch';
import { FAQAccordion } from './FAQAccordion';
import { CustomerSupportCTA } from './CustomerSupportCTA';

export const MindfreeFAQSection: React.FC = () => {
  // Active accordion state (starts with first question open for immediate visual clarity)
  const [openId, setOpenId] = useState<string | null>('faq-01');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<FAQCategoryId, number> = {
      all: FAQ_ITEMS.length,
      materials: 0,
      'comfort-sizes': 0,
      'delivery-warranty': 0,
      'care-support': 0,
    };

    FAQ_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    return counts;
  }, []);

  // Filter items based on active category and search query
  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const trimmedQuery = searchQuery.trim().toLowerCase();
      if (!trimmedQuery) {
        return matchesCategory;
      }

      const matchesSearch =
        item.question.toLowerCase().includes(trimmedQuery) ||
        item.answer.toLowerCase().includes(trimmedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleResetSearch = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-t border-[#EAE5DC] overflow-hidden"
    >
      {/* Restrained architectural ambient glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#E3262E]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#0A2E73]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Asymmetric Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start w-full max-w-full overflow-hidden">
          {/* Left Column: Editorial Introduction & Customer Support (approx 38%) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-w-0 w-full max-w-full overflow-hidden">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#E3262E]">
                  THE SLEEP QUESTIONS
                </span>
                <span className="w-10 h-[1px] bg-[#E3262E]/40" />
              </div>

              {/* Main Heading */}
              <h2 className="font-serif text-[23px] sm:text-[34px] lg:text-[42px] font-bold text-[#0A2E73] tracking-tight leading-[1.2]">
                Everything You Need to Know About{' '}
                <span className="font-serif italic font-normal text-[#E3262E]">
                  Better Sleep.
                </span>
              </h2>

              {/* Small Decorative Gold Divider */}
              <div className="w-14 h-[2px] bg-[#E3262E] mt-3.5 mb-3.5 rounded-full" />

              {/* Supporting Text */}
              <p className="text-[14px] sm:text-[15px] text-[#55635C] leading-relaxed max-w-md">
                Choosing a mattress should feel simple. Find answers about our materials, comfort options, sizing, delivery, and care.
              </p>
            </div>

            {/* Compact Customer Support Prompt */}
            <CustomerSupportCTA />
          </div>

          {/* Right Column: Search + Category Filters + Interactive Accordion (approx 62%) */}
          <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-5 min-w-0 w-full max-w-full overflow-hidden">
            {/* Search and Category Filter Strip */}
            <div className="flex flex-col space-y-3.5 bg-white/60 backdrop-blur-xs p-3.5 sm:p-5 rounded-2xl border border-[#E9E4DB] shadow-[0_2px_12px_rgba(10,46,115,0.02)] min-w-0 w-full max-w-full overflow-hidden">
              {/* Search Field */}
              <FAQSearch
                query={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />

              {/* Category Filter Pills */}
              <FAQCategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                counts={categoryCounts}
              />
            </div>

            {/* Accordion Questions List */}
            <div className="bg-white/70 backdrop-blur-xs px-4 sm:px-6 py-2 sm:py-3 rounded-2xl border border-[#E9E4DB] shadow-[0_4px_24px_rgba(10,46,115,0.03)] min-w-0 w-full overflow-hidden">
              <FAQAccordion
                items={filteredItems}
                openId={openId}
                onToggle={handleToggle}
                onResetSearch={handleResetSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
