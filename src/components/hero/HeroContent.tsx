import React from 'react';
import { ArrowRight } from 'lucide-react';
import { type HeroSlideData } from '../../data/heroData';

interface HeroContentProps {
  slide: HeroSlideData;
  className?: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({ slide, className = '' }) => {
  const isOutlineButton = slide.buttonVariant === 'outline-red';

  const handlePrimaryAction = () => {
    const targetId = slide.primaryCtaHref.replace('#', '');
    const targetEl = document.getElementById(targetId) || document.getElementById('catalogue-grid');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex flex-col justify-center select-none z-20 ${className}`}>
      {/* Two-Line Bold Uppercase Sans-Serif Headline Overlaid in the Left Space */}
      <h1 className="font-sans uppercase tracking-[-0.02em] leading-[1.12]">
        <span className="block text-[13.5px] sm:text-[25px] md:text-[31px] lg:text-[36px] xl:text-[42px] font-extrabold text-[#0A2E73] sm:whitespace-nowrap drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]">
          {slide.headlineTop}
        </span>

        <span className="block text-[13.5px] sm:text-[25px] md:text-[31px] lg:text-[36px] xl:text-[42px] font-extrabold text-[#E3262E] mt-0.5 sm:whitespace-nowrap drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]">
          {slide.headlineHighlight}
        </span>
      </h1>

      {/* Supporting Paragraph in Slate Navy — Hidden on Mobile View Only */}
      <p className="hidden sm:block mt-3 text-[13.5px] lg:text-[15px] xl:text-[16px] leading-[1.55] text-[#1E3A5F] font-normal max-w-[360px] lg:max-w-[420px] xl:max-w-[460px]">
        {slide.supportingText}
      </p>

      {/* Real Interactive HTML Button (Tactile 3D Button with Hover Lift & Press Feedback) */}
      <div className="mt-3 sm:mt-5 flex items-center">
        {isOutlineButton ? (
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-7 py-1.5 sm:py-3 rounded-full bg-white hover:bg-[#E3262E] text-[#0A2E73] hover:text-white border sm:border-2 border-[#E3262E] font-bold text-[10.5px] sm:text-[15px] tracking-tight shadow-[0_6px_16px_rgba(10,46,115,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_12px_26px_rgba(227,38,46,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2E73]"
          >
            <span>{slide.primaryCtaText}</span>
            <ArrowRight className="w-3 h-3 sm:w-4.5 sm:h-4.5 text-[#E3262E] group-hover:text-white group-hover:translate-x-1 transition-all duration-200 stroke-[2.4]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-7 py-1.5 sm:py-3 rounded-full bg-gradient-to-b from-[#E62831] to-[#C80815] hover:from-[#F0323B] hover:to-[#D90416] text-white font-semibold text-[10.5px] sm:text-[15px] tracking-tight border border-[#FF6B72]/40 shadow-[0_8px_18px_rgba(200,8,21,0.35),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:shadow-[0_14px_30px_rgba(200,8,21,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2E73]"
          >
            <span>{slide.primaryCtaText}</span>
            <ArrowRight className="w-3 h-3 sm:w-4.5 sm:h-4.5 text-white group-hover:translate-x-1 transition-transform duration-200 stroke-[2.3]" />
          </button>
        )}
      </div>
    </div>
  );
};
