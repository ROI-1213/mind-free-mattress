import React from 'react';
import { Check } from 'lucide-react';
import {
  SELECTOR_TOP_DESIGNS,
  type TopDesignId,
} from '../../data/selectorData';

interface TopDesignSelectorProps {
  selectedId: TopDesignId;
  onSelect: (id: TopDesignId) => void;
}

export const TopDesignSelector: React.FC<TopDesignSelectorProps> = ({
  selectedId,
  onSelect,
}) => {
  return (
    <div className="flex flex-col space-y-3 pt-2 border-t border-[#EAE5DC]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#0A2E73] text-[#F8FAFC] text-[11px] font-bold flex items-center justify-center">
            2
          </span>
          <h3 className="font-serif text-[17px] sm:text-[18px] font-semibold text-[#0A2E73]">
            Choose Top Design
          </h3>
        </div>
        <span className="text-[11px] font-medium tracking-wide uppercase text-[#88908B]">
          Step 2 of 3
        </span>
      </div>

      <p className="text-[12.5px] text-[#55635C] leading-relaxed">
        Choose your sleep surface profile. Each design provides tailored cushioning depth, visual height, and surface plushness.
      </p>

      {/* Top Designs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        {SELECTOR_TOP_DESIGNS.map((design) => {
          const isSelected = design.id === selectedId;

          return (
            <button
              key={design.id}
              type="button"
              onClick={() => onSelect(design.id)}
              aria-pressed={isSelected}
              className={`group text-left relative flex flex-col p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? 'bg-white border-[#E3262E] shadow-[0_4px_16px_rgba(189,148,88,0.14)] ring-1 ring-[#E3262E]'
                  : 'bg-[#F8FAFC]/90 hover:bg-white border-[#E5E0D6] hover:border-[#0A2E73]/30 shadow-xs'
              }`}
            >
              {/* Realistic Side-Profile Cross-Section */}
              <div
                className={`w-full h-[72px] sm:h-[64px] rounded-lg overflow-hidden bg-white mb-2.5 border transition-all duration-200 flex items-center justify-center relative ${
                  isSelected
                    ? 'border-[#E3262E]/70 shadow-xs'
                    : 'border-[#E2DED5] group-hover:border-[#C5C0B5]'
                }`}
              >
                <img
                  src={design.profileImage}
                  alt={design.name}
                  className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Subtle height tag */}
                <span className="absolute bottom-1 right-1 text-[9px] font-medium text-[#0A2E73] bg-[#F8FAFC]/90 px-1.5 py-0.5 rounded border border-[#E0DCD3]">
                  {design.addedHeight}
                </span>
              </div>

              {/* Title & Check */}
              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  className={`text-[13.5px] font-semibold tracking-tight transition-colors ${
                    isSelected
                      ? 'text-[#0A2E73]'
                      : 'text-[#0F2952] group-hover:text-[#0A2E73]'
                  }`}
                >
                  {design.name}
                </span>

                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#E3262E] text-white scale-100 shadow-xs'
                      : 'border border-[#D1CCC2] group-hover:border-[#88908B] scale-90 opacity-60'
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>

              {/* Short factual description */}
              <p className="text-[11px] text-[#69756F] leading-[1.35] mt-0.5">
                {design.shortDesc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
