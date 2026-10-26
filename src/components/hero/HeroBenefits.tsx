import React from 'react';
import { Sparkles, Activity, Moon, ShieldCheck } from 'lucide-react';
import { HERO_BENEFITS, type HeroBenefit } from '../../data/heroData';

interface HeroBenefitsProps {
  className?: string;
  theme?: 'light' | 'garden' | 'night';
}

const benefitIconMap = {
  leaf: Sparkles,
  spine: Activity,
  moon: Moon,
  shield: ShieldCheck,
};

export const HeroBenefits: React.FC<HeroBenefitsProps> = ({ className = '', theme = 'light' }) => {
  const isNight = theme === 'night';

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 pt-3 select-none ${className}`}
      aria-label="MINDFREE Core Sleep Guarantees"
    >
      {HERO_BENEFITS.map((item: HeroBenefit) => {
        const IconComponent = benefitIconMap[item.icon];
        return (
          <div
            key={item.id}
            className="flex flex-col items-start sm:items-center text-left sm:text-center group transition-transform duration-200 hover:-translate-y-0.5"
          >
            {/* Elegant Line Icon */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 transition-colors duration-300 ${
                isNight
                  ? 'bg-white/10 text-[#E3262E] border border-white/15'
                  : 'bg-[#F8FAFC]/80 backdrop-blur-xs text-[#E3262E] border border-[#E2E8F0]/80 shadow-xs'
              }`}
            >
              <IconComponent className="w-4 h-4 stroke-[1.8]" />
            </div>

            {/* Factual Value Label */}
            <span
              className={`text-[11.5px] font-semibold leading-tight transition-colors duration-300 ${
                isNight ? 'text-white/90' : 'text-[#0A2E73]'
              }`}
            >
              {item.title}
            </span>
            {item.subtitle && (
              <span
                className={`text-[10px] leading-tight mt-0.5 transition-colors duration-300 ${
                  isNight ? 'text-white/60' : 'text-[#747A78]'
                }`}
              >
                {item.subtitle}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
