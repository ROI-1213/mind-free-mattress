import React, { useState } from 'react';
import {
  type MattressMaterialId,
  type TopDesignId,
  type MattressSizeId,
  getMatchingProduct,
} from '../../data/selectorData';
import { MaterialSelector } from './MaterialSelector';
import { TopDesignSelector } from './TopDesignSelector';
import { MattressSizeSelector } from './MattressSizeSelector';
import { LiveProductPreview } from './LiveProductPreview';
import { MatchingMattressModal } from './MatchingMattressModal';

export const MattressSelectorSection: React.FC = () => {
  // Configured states with luxury default (Spring + Euro Top + Queen)
  const [selectedMaterial, setSelectedMaterial] = useState<MattressMaterialId>('spring');
  const [selectedTopDesign, setSelectedTopDesign] = useState<TopDesignId>('euro-top');
  const [selectedSize, setSelectedSize] = useState<MattressSizeId>('queen');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compute live matching product from catalogue
  const matchingProduct = getMatchingProduct(selectedMaterial, selectedTopDesign);

  const handleReset = () => {
    setSelectedMaterial('spring');
    setSelectedTopDesign('euro-top');
    setSelectedSize('queen');
  };

  const handleExploreMatching = () => {
    setIsModalOpen(true);
  };

  return (
    <section
      id="mattress-selector"
      aria-label="Interactive Mattress Selector"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-t border-[#EAE5DC] overflow-hidden"
    >
      {/* Subtle architectural background texture accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E3262E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0A2E73]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Editorial Heading */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#E3262E]">
              YOUR PERFECT SLEEP STARTS HERE
            </span>
            <span className="w-12 h-[1px] bg-[#E3262E]/40" />
          </div>

          {/* Headline */}
          <h2 className="font-serif text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#0A2E73] tracking-tight leading-[1.15]">
            Find Your{' '}
            <span className="font-serif italic font-normal text-[#E3262E]">
              Perfect Mattress
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-[14.5px] sm:text-[15.5px] text-[#55635C] mt-2.5 leading-relaxed">
            Choose your preferred materials, comfort style, and size to discover your Mindfree mattress.
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Interactive Selection Controls */}
          <div className="lg:col-span-7 flex flex-col space-y-6 bg-white/70 backdrop-blur-xs p-5 sm:p-7 rounded-2xl border border-[#E9E4DB] shadow-[0_4px_24px_rgba(10,46,115,0.04)]">
            {/* Step 1: Material Selector */}
            <MaterialSelector
              selectedId={selectedMaterial}
              onSelect={setSelectedMaterial}
            />

            {/* Step 2: Top Design Selector */}
            <TopDesignSelector
              selectedId={selectedTopDesign}
              onSelect={setSelectedTopDesign}
            />

            {/* Step 3: Size Selector */}
            <MattressSizeSelector
              selectedSizeId={selectedSize}
              onSelectSize={setSelectedSize}
              currentProduct={matchingProduct}
            />
          </div>

          {/* Right Column: Live Product Preview */}
          <div className="lg:col-span-5">
            <LiveProductPreview
              product={matchingProduct}
              selectedMaterial={selectedMaterial}
              selectedTopDesign={selectedTopDesign}
              selectedSize={selectedSize}
              onReset={handleReset}
              onExploreMatching={handleExploreMatching}
            />
          </div>
        </div>
      </div>

      {/* Detail Inspection & Order Modal */}
      {isModalOpen && (
        <MatchingMattressModal
          product={matchingProduct}
          initialSize={selectedSize}
          selectedMaterial={selectedMaterial}
          selectedTopDesign={selectedTopDesign}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};
