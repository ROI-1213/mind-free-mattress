import React, { useState } from 'react';
import type { SignatureMattressModel } from '../../data/showroomData';
import { ArchitecturalShowroom } from './ArchitecturalShowroom';
import { ShowroomNavigation } from './ShowroomNavigation';
import { ShowroomDetailModal } from './ShowroomDetailModal';
import { Sparkles, ArrowRight } from 'lucide-react';

export const SignatureCollectionSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>('memory-foam-collection');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [inspectingMattress, setInspectingMattress] = useState<SignatureMattressModel | null>(null);

  const handleSelectMattress = (mattress: SignatureMattressModel) => {
    setActiveId(mattress.id);
    setInspectingMattress(mattress);
  };

  return (
    <section
      id="signature-collection-showroom"
      className="relative w-full bg-[#18231A] text-[#F8F5EE] py-16 sm:py-20 lg:py-28 overflow-hidden select-none border-t border-[#253628]"
      aria-label="Mindfree Signature Mattress Collection — Luxury Architectural Showroom"
    >
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#E3262E]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[500px] bg-[#0C2D22]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* 1. SECTION INTRODUCTION (Integrated into Architecture) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-14">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.22em] uppercase text-[#E3262E]">
                THE MINDFREE SIGNATURE COLLECTION
              </span>
              <span className="w-8 h-px bg-[#E3262E]/40" />
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-[#F8F5EE] leading-[1.12] tracking-tight mb-4">
              Find the Comfort That{' '}
              <span className="italic font-serif text-[#E3262E] font-normal">
                Feels Like You.
              </span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-xs sm:text-sm text-[#D8D0C1]/85 leading-relaxed max-w-xl font-sans">
              Explore thoughtfully crafted mattresses, each designed around a different approach to comfort, support, and everyday sleep.
            </p>
          </div>

          {/* Minimal Text Link */}
          <div className="shrink-0">
            <a
              href="#interactive-3d-experience"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#E3262E] hover:text-[#F8F5EE] transition-colors group cursor-pointer"
            >
              <span>Explore Our Materials</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* 2. IMMERSIVE ARCHITECTURAL SHOWROOM VIEWPORT */}
        <div className="mb-8">
          <ArchitecturalShowroom
            activeId={activeId}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onSelect={handleSelectMattress}
          />
        </div>

        {/* 3. BOTTOM SHOWROOM NAVIGATION */}
        <div className="flex justify-center">
          <ShowroomNavigation
            activeId={activeId}
            onSelect={(m) => setActiveId(m.id)}
          />
        </div>
      </div>

      {/* 4. ADVANCED MATTRESS DETAIL INSPECTION MODAL */}
      <ShowroomDetailModal
        mattress={inspectingMattress}
        onClose={() => setInspectingMattress(null)}
      />
    </section>
  );
};
