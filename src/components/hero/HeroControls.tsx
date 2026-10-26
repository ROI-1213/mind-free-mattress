import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../../data/heroData';

interface HeroControlsProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  theme?: 'light' | 'garden' | 'night';
}

export const HeroControls: React.FC<HeroControlsProps> = ({
  currentIndex,
  onPrev,
  onNext,
  onSelectSlide,
}) => {
  return (
    <>
      {/* Left Arrow Control — hugged near left edge so it never overlaps text */}
      <button
        type="button"
        onClick={onPrev}
        className="hidden md:flex absolute left-2.5 lg:left-3.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/90 hover:bg-white active:scale-95 text-[#0A2E73] border border-slate-200/80 shadow-[0_4px_14px_rgba(10,46,115,0.12)] items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none"
        aria-label="Previous banner slide"
      >
        <ChevronLeft className="w-4.5 h-4.5 stroke-[2.2]" />
      </button>

      {/* Right Arrow Control — hugged near right edge so it never overlaps content */}
      <button
        type="button"
        onClick={onNext}
        className="hidden md:flex absolute right-2.5 lg:right-3.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/90 hover:bg-white active:scale-95 text-[#0A2E73] border border-slate-200/80 shadow-[0_4px_14px_rgba(10,46,115,0.12)] items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none"
        aria-label="Next banner slide"
      >
        <ChevronRight className="w-4.5 h-4.5 stroke-[2.2]" />
      </button>

      {/* Bottom Centered Pill Indicators */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-3.5 z-30 flex items-center gap-1.5 sm:gap-2 bg-white/80 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/80 shadow-xs"
        aria-label="Banner Slide Dots"
      >
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelectSlide(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-5 sm:w-7 bg-[#E3262E]'
                  : 'w-1.5 sm:w-2 bg-[#0A2E73]/30 hover:bg-[#0A2E73]/60'
              }`}
              aria-label={`Go to slide ${idx + 1}: ${slide.headlineTop}`}
              aria-current={isActive ? 'true' : 'false'}
            />
          );
        })}
      </div>
    </>
  );
};
