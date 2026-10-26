import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { LIFESTYLE_CARDS } from '../../data/lifestyleData';
import { LifestyleCard } from './LifestyleCard';

export const LifestyleCollectionSection: React.FC = () => {
  return (
    <div className="w-full">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12 items-stretch">
          {/* Left Editorial Panel */}
          <div className="lg:w-[280px] xl:w-[320px] shrink-0 flex flex-col justify-between py-2 sm:py-4">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#0A2E73]">
                  COMFORT FOR EVERY LIFESTYLE
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.14] tracking-tight text-[#0A2540] mb-4">
                Designed for Every{' '}
                <span className="italic font-serif text-[#E3262E]">Stage of Life</span>
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6">
                Because every sleeper is different. Explore mattresses designed for your unique needs and lifestyle.
              </p>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-2">
              <a
                href="/mattress-finder"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A2E73] hover:bg-[#071F52] active:scale-95 text-white font-medium text-xs sm:text-[13px] tracking-wide shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Find Your Fit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Five Lifestyle Cards Grid / Flex */}
          <div className="flex-1 flex overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-4 sm:gap-4.5 xl:gap-5 no-scrollbar">
            {LIFESTYLE_CARDS.map((card) => (
              <LifestyleCard key={card.id} item={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
