import React from 'react';
import { SIGNATURE_MATTRESSES } from '../../data/showroomData';
import type { SignatureMattressModel } from '../../data/showroomData';
import { MattressDisplayPlinth } from './MattressDisplayPlinth';
import { ShowroomLighting } from './ShowroomLighting';

interface ArchitecturalShowroomProps {
  activeId: string | null;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (mattress: SignatureMattressModel) => void;
}

export const ArchitecturalShowroom: React.FC<ArchitecturalShowroomProps> = ({
  activeId,
  hoveredId,
  onHover,
  onSelect,
}) => {
  const springMattress = SIGNATURE_MATTRESSES[0];
  const memoryFoamMattress = SIGNATURE_MATTRESSES[1];
  const latexMattress = SIGNATURE_MATTRESSES[2];

  return (
    <div className="relative w-full rounded-[32px] sm:rounded-[44px] lg:rounded-[56px] overflow-hidden border border-[#E3262E]/25 shadow-[0_30px_90px_rgba(4,20,14,0.6)] select-none">
      {/* 1. ARCHITECTURAL SHOWROOM BACKGROUND (Olive Walls & Walnut Parquet) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/mindfree/showroom/showroom-gallery.webp"
          alt="Mindfree Luxury Architectural Showroom"
          className="w-full h-full object-cover object-center scale-102 filter brightness-85"
        />
        {/* Soft Ambient Depth Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141C15]/95 via-[#1E291C]/75 to-[#151E16]/90" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0F1710]/40 to-[#0A100B]/85" />
      </div>

      {/* 2. FRAMED CRAFTSMANSHIP WALL ART (Architectural Gallery Walls) */}
      <div className="absolute top-8 sm:top-12 inset-x-8 sm:inset-x-16 flex justify-between pointer-events-none z-1 opacity-70">
        {/* Left Wall Artwork */}
        <div className="hidden lg:block w-36 xl:w-44 aspect-4/3 rounded-lg border border-[#E3262E]/40 p-1 bg-black/40 shadow-xl overflow-hidden">
          <img
            src="/images/mindfree/craft-fabrics.webp"
            alt="Craftsmanship macro"
            className="w-full h-full object-cover rounded-sm filter brightness-90 sepia-20"
          />
        </div>

        {/* Right Wall Artwork */}
        <div className="hidden lg:block w-36 xl:w-44 aspect-4/3 rounded-lg border border-[#E3262E]/40 p-1 bg-black/40 shadow-xl overflow-hidden">
          <img
            src="/images/mindfree/craft-durable.webp"
            alt="Craftsmanship macro"
            className="w-full h-full object-cover rounded-sm filter brightness-90 sepia-20"
          />
        </div>
      </div>

      {/* 3. DIRECTIONAL ARCHITECTURAL SPOTLIGHTS */}
      <ShowroomLighting activeId={activeId} hoveredId={hoveredId} />

      {/* 4. THREE STAGGERED SIGNATURE MATTRESS PLINTH DISPLAYS */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 items-end">
          {/* DISPLAY 01: SPRING COLLECTION (Left) */}
          <div className="order-2 md:order-1">
            <MattressDisplayPlinth
              mattress={springMattress}
              isActive={activeId === springMattress.id}
              isHovered={hoveredId === springMattress.id}
              onHover={onHover}
              onSelect={onSelect}
            />
          </div>

          {/* DISPLAY 02: MEMORY FOAM COLLECTION (Center Hero) */}
          <div className="order-1 md:order-2 -mt-4 md:-mt-8 lg:-mt-12">
            <MattressDisplayPlinth
              mattress={memoryFoamMattress}
              isActive={activeId === memoryFoamMattress.id}
              isHovered={hoveredId === memoryFoamMattress.id}
              onHover={onHover}
              onSelect={onSelect}
            />
          </div>

          {/* DISPLAY 03: LATEX COLLECTION (Right) */}
          <div className="order-3 md:order-3">
            <MattressDisplayPlinth
              mattress={latexMattress}
              isActive={activeId === latexMattress.id}
              isHovered={hoveredId === latexMattress.id}
              onHover={onHover}
              onSelect={onSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
