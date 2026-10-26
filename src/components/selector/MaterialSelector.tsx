import React from 'react';
import { Check } from 'lucide-react';
import {
  SELECTOR_MATERIALS,
  type MattressMaterialId,
} from '../../data/selectorData';

interface MaterialSelectorProps {
  selectedId: MattressMaterialId;
  onSelect: (id: MattressMaterialId) => void;
}

export const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  selectedId,
  onSelect,
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#0A2E73] text-[#F8FAFC] text-[11px] font-bold flex items-center justify-center">
            1
          </span>
          <h3 className="font-serif text-[17px] sm:text-[18px] font-semibold text-[#0A2E73]">
            Choose Core Material
          </h3>
        </div>
        <span className="text-[11px] font-medium tracking-wide uppercase text-[#88908B]">
          Step 1 of 3
        </span>
      </div>

      <p className="text-[12.5px] text-[#55635C] leading-relaxed">
        Select the internal foundation layer engineered for your ideal balance of support, spinal neutrality, and contouring.
      </p>

      {/* Material Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5 pt-1">
        {SELECTOR_MATERIALS.map((mat) => {
          const isSelected = mat.id === selectedId;

          return (
            <button
              key={mat.id}
              type="button"
              onClick={() => onSelect(mat.id)}
              aria-pressed={isSelected}
              className={`group text-left relative flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer min-h-[52px] select-none ${
                isSelected
                  ? 'bg-white border-[#E3262E] shadow-[0_4px_16px_rgba(189,148,88,0.14)] ring-1 ring-[#E3262E]'
                  : 'bg-[#F8FAFC]/90 hover:bg-white border-[#E5E0D6] hover:border-[#0A2E73]/30 shadow-xs'
              }`}
            >
              {/* Material Realistic Thumbnail */}
              <div
                className={`w-[52px] h-[40px] rounded-lg overflow-hidden shrink-0 border transition-all duration-200 bg-white flex items-center justify-center ${
                  isSelected
                    ? 'border-[#E3262E] shadow-xs'
                    : 'border-[#E2DED5] group-hover:border-[#C5C0B5]'
                }`}
              >
                <img
                  src={mat.thumbnail}
                  alt={mat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0 pr-5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className={`text-[13.5px] font-semibold tracking-tight transition-colors ${
                      isSelected
                        ? 'text-[#0A2E73]'
                        : 'text-[#0F2952] group-hover:text-[#0A2E73]'
                    }`}
                  >
                    {mat.name}
                  </span>
                  {mat.badge && (
                    <span
                      className={`text-[9.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#E3262E]/15 text-[#0F62C8]'
                          : 'bg-[#DBEAFE] text-[#0A2E73]'
                      }`}
                    >
                      {mat.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#69756F] line-clamp-2 leading-[1.35]">
                  {mat.shortDesc}
                </p>
              </div>

              {/* Selection Check Indicator */}
              <div
                className={`absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#E3262E] text-white scale-100 shadow-xs'
                    : 'border border-[#D1CCC2] group-hover:border-[#88908B] scale-90 opacity-60'
                }`}
              >
                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
