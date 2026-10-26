import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MATERIAL_STRIP_ITEMS, type MaterialStripItem } from '../../data/heroData';

interface MaterialPreviewStripProps {
  className?: string;
  theme?: 'light' | 'garden' | 'night';
}

export const MaterialPreviewStrip: React.FC<MaterialPreviewStripProps> = ({
  className = '',
  theme = 'light',
}) => {
  const isNight = theme === 'night';

  return (
    <div
      className={`w-full max-w-[880px] select-none ${className}`}
      aria-label="Core Mattress Materials Navigation"
    >
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-2 px-1">
        {MATERIAL_STRIP_ITEMS.map((item: MaterialStripItem) => (
          <a
            key={item.id}
            href={item.href}
            className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl transition-all duration-300 shrink-0 group border ${
              isNight
                ? 'bg-[#071F52]/80 hover:bg-[#0A2E73] border-white/10 hover:border-[#E3262E]/40 text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)]'
                : 'bg-white/85 hover:bg-white/95 backdrop-blur-md border-[#E2E8F0]/80 hover:border-[#E3262E]/40 text-[#0A2540] shadow-[0_8px_20px_rgba(10,46,115,0.06)] hover:shadow-[0_12px_28px_rgba(10,46,115,0.12)]'
            }`}
          >
            {/* Thumbnail */}
            <div className="w-[42px] h-[34px] sm:w-[48px] sm:h-[38px] rounded-xl overflow-hidden bg-[#F8FAFC] shrink-0 border border-black/5">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Label & Subtitle */}
            <div className="flex flex-col pr-1 min-w-[70px]">
              <span
                className={`text-[11.5px] font-semibold tracking-tight transition-colors ${
                  isNight
                    ? 'text-white group-hover:text-[#E3262E]'
                    : 'text-[#0A2E73] group-hover:text-[#071F52]'
                }`}
              >
                {item.name}
              </span>
              <span
                className={`text-[9.5px] leading-tight transition-colors ${
                  isNight ? 'text-white/60' : 'text-[#747A78]'
                }`}
              >
                {item.subtitle}
              </span>
            </div>

            {/* Circular Arrow Button */}
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                isNight
                  ? 'bg-white/10 group-hover:bg-[#E3262E] text-white/70 group-hover:text-white'
                  : 'bg-black/5 group-hover:bg-[#0A2E73] text-[#747A78] group-hover:text-white'
              }`}
            >
              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
