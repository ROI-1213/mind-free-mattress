import React from 'react';
import type { SignatureMattressModel } from '../../data/showroomData';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';

interface MattressDisplayPlinthProps {
  mattress: SignatureMattressModel;
  isActive: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (mattress: SignatureMattressModel) => void;
}

export const MattressDisplayPlinth: React.FC<MattressDisplayPlinthProps> = ({
  mattress,
  isActive,
  isHovered,
  onHover,
  onSelect,
}) => {
  // Plinth styling classes
  const getPlinthBackground = () => {
    switch (mattress.plinthStyle) {
      case 'dark-green':
        return 'from-[#0C2B1F] via-[#143B2C] to-[#0A2218] border-[#E3262E]/35 shadow-[0_20px_50px_rgba(4,20,14,0.7)]';
      case 'travertine-stone':
        return 'from-[#C4B7A0] via-[#D8CEBC] to-[#A89880] border-[#F2EADA]/50 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-[#202722]';
      case 'olive-stone':
        return 'from-[#1E291C] via-[#2A3B28] to-[#151F14] border-[#E3262E]/35 shadow-[0_20px_50px_rgba(4,20,14,0.7)]';
      default:
        return 'from-[#143B2C] to-[#0A2218] border-[#E3262E]/30 shadow-xl';
    }
  };

  return (
    <div
      className={`
        relative flex flex-col items-center cursor-pointer transition-all duration-700 ease-out group
        ${mattress.isHero ? 'z-20 scale-100 lg:scale-105' : 'z-10 scale-95 lg:scale-100 opacity-90 hover:opacity-100'}
        ${isHovered ? 'translate-y-[-10px]' : 'translate-y-0'}
      `}
      onMouseEnter={() => onHover(mattress.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(mattress)}
      role="button"
      tabIndex={0}
      aria-label={`Inspect ${mattress.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(mattress);
        }
      }}
    >
      {/* 1. TOP SPOTLIGHT ACCENT RING */}
      <div
        className={`
          absolute -top-14 w-40 sm:w-56 h-12 rounded-full
          bg-radial from-[#FFF2D6]/40 via-[#E3262E]/15 to-transparent blur-md
          transition-opacity duration-500 pointer-events-none
          ${isHovered || isActive ? 'opacity-100 scale-125' : 'opacity-30 scale-100'}
        `}
      />

      {/* 2. MATTRESS IMAGE DISPLAY CONTAINER */}
      <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden mb-3">
        {/* Contact Shadow behind mattress */}
        <div className="absolute inset-x-8 bottom-0 h-8 bg-black/70 blur-xl rounded-full transform scale-y-50 pointer-events-none" />

        {/* Mattress Render */}
        <img
          src={mattress.image}
          alt={mattress.title}
          className={`
            w-full h-full object-cover object-center
            transition-transform duration-700 ease-out
            ${isHovered ? 'scale-105' : 'scale-100'}
          `}
        />

        {/* Subtle Vignette & Specular Highlight */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 pointer-events-none" />

        {/* Floating Interactive Badge (Appears on Hover) */}
        <div
          className={`
            absolute top-3 right-3 px-3 py-1 rounded-full
            bg-black/60 backdrop-blur-md border border-[#E3262E]/60 text-[10px] font-mono tracking-wider text-[#E3262E]
            flex items-center gap-1.5 transition-all duration-300
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
          `}
        >
          <Layers className="w-3 h-3 text-[#E3262E]" />
          <span>Click to Inspect</span>
        </div>
      </div>

      {/* 3. SCULPTURAL DISPLAY PLINTH / PLATFORM */}
      <div
        className={`
          relative w-full max-w-[94%] h-12 sm:h-14 lg:h-16 rounded-xl sm:rounded-2xl
          bg-gradient-to-b ${getPlinthBackground()} border
          flex items-center justify-between px-4 sm:px-6
          transition-all duration-500
          ${isHovered ? 'border-[#E3262E] shadow-[0_0_25px_rgba(189,139,67,0.35)]' : ''}
        `}
      >
        {/* Subtle Plinth Bevel Highlight Line */}
        <div className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-[#FFF4DE]/40 to-transparent" />

        {/* Left: Plinth Collection Number */}
        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#E3262E]">
          {mattress.number}
        </span>

        {/* Center: Height & Core Spec */}
        <span className="text-[10px] sm:text-xs tracking-wider uppercase font-medium text-[#F8F5EE]/80">
          {mattress.specs.height} · {mattress.specs.firmness}
        </span>

        {/* Right: Golden Diamond Accent */}
        <div className="w-2 h-2 rotate-45 border border-[#E3262E] bg-[#E3262E]/20" />
      </div>

      {/* 4. EDITORIAL DISPLAY LABEL & INFORMATION */}
      <div className="mt-5 text-center max-w-sm px-2 flex flex-col items-center">
        {/* Label Eyebrow */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles className="w-3 h-3 text-[#E3262E]" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#E3262E] font-semibold">
            {mattress.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl lg:text-[26px] text-[#F8F5EE] tracking-tight leading-snug mb-2 group-hover:text-[#E3262E] transition-colors">
          {mattress.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-[#D8D0C1]/80 leading-relaxed mb-4 line-clamp-2">
          {mattress.description}
        </p>

        {/* CTA Link Button */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-medium text-[#E3262E] group-hover:text-[#F8F5EE] transition-colors">
          <span>{mattress.ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
