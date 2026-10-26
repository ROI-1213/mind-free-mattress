import React from 'react';
import { LifestyleCollectionSection } from './LifestyleCollectionSection';
import { CustomerBenefitsStrip } from './CustomerBenefitsStrip';
import { SustainabilitySection } from './SustainabilitySection';

export const MindfreeLifestyleExperience: React.FC = () => {
  return (
    <section
      id="lifestyle-sustainability"
      className="relative w-full bg-[#F8FAFC] overflow-hidden select-none border-t border-[#E2E8F0]"
      aria-label="Mindfree Lifestyle Collection & Sustainability Experience"
    >
      {/* Background Soft Depth Glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#E3262E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-[#0A2E73]/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Section A — Designed for Every Stage of Life */}
      <div className="py-16 sm:py-20 lg:py-24 relative z-10">
        <LifestyleCollectionSection />
      </div>

      {/* 2. Full-Width Customer Benefits Strip */}
      <div className="relative z-10">
        <CustomerBenefitsStrip />
      </div>

      {/* 3. Section B — Sustainability Story */}
      <div className="py-16 sm:py-20 lg:py-24 relative z-10">
        <SustainabilitySection />
      </div>
    </section>
  );
};
