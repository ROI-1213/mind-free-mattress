import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import {
  SELECTOR_SIZES,
  type MattressSizeId,
  type CatalogueProductMatch,
  formatPriceINR,
} from '../../data/selectorData';

interface MattressSizeSelectorProps {
  selectedSizeId: MattressSizeId;
  onSelectSize: (sizeId: MattressSizeId) => void;
  currentProduct: CatalogueProductMatch;
}

export const MattressSizeSelector: React.FC<MattressSizeSelectorProps> = ({
  selectedSizeId,
  onSelectSize,
  currentProduct,
}) => {
  return (
    <div className="flex flex-col space-y-3 pt-2 border-t border-[#EAE5DC]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#0A2E73] text-[#F8FAFC] text-[11px] font-bold flex items-center justify-center">
            3
          </span>
          <h3 className="font-serif text-[17px] sm:text-[18px] font-semibold text-[#0A2E73]">
            Choose Mattress Size
          </h3>
        </div>
        <span className="text-[11px] font-medium tracking-wide uppercase text-[#88908B]">
          Step 3 of 3
        </span>
      </div>

      <p className="text-[12.5px] text-[#55635C] leading-relaxed">
        Select standard dimensions calibrated to standard Indian and international bed frames.
      </p>

      {/* Size Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {SELECTOR_SIZES.map((size) => {
          const isSelected = size.id === selectedSizeId;
          const price = currentProduct.prices[size.id];

          return (
            <button
              key={size.id}
              type="button"
              onClick={() => onSelectSize(size.id)}
              aria-pressed={isSelected}
              className={`group text-left relative flex flex-col justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer min-h-[92px] select-none ${
                isSelected
                  ? 'bg-white border-[#E3262E] shadow-[0_4px_16px_rgba(189,148,88,0.14)] ring-1 ring-[#E3262E]'
                  : 'bg-[#F8FAFC]/90 hover:bg-white border-[#E5E0D6] hover:border-[#0A2E73]/30 shadow-xs'
              }`}
            >
              {/* Popular Badge */}
              {size.isPopular && (
                <div className="absolute -top-2 left-2 flex items-center gap-1 bg-[#0A2E73] text-[#F8FAFC] text-[8.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                  <Sparkles className="w-2.5 h-2.5 text-[#E3262E]" />
                  <span>Popular</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mt-0.5">
                  <span
                    className={`text-[14px] font-semibold tracking-tight transition-colors ${
                      isSelected
                        ? 'text-[#0A2E73]'
                        : 'text-[#0F2952] group-hover:text-[#0A2E73]'
                    }`}
                  >
                    {size.name}
                  </span>

                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#E3262E] text-white scale-100'
                        : 'border border-[#D1CCC2] group-hover:border-[#88908B] scale-90 opacity-50'
                    }`}
                  >
                    {isSelected && <Check className="w-2 h-2 stroke-[3]" />}
                  </div>
                </div>

                {/* Dimension Details */}
                <p className="text-[11px] font-medium text-[#76827C] mt-1">
                  {size.dimensionsInches}
                </p>
                <p className="text-[9.5px] text-[#9BA5A0]">
                  {size.dimensionsCm}
                </p>
              </div>

              {/* Price Preview */}
              <div className="mt-2.5 pt-2 border-t border-[#EFEBE3] flex items-baseline justify-between">
                <span className="text-[10px] uppercase font-semibold text-[#88908B]">
                  From
                </span>
                <span
                  className={`text-[12.5px] font-bold ${
                    isSelected ? 'text-[#0A2E73]' : 'text-[#3E4A44]'
                  }`}
                >
                  {formatPriceINR(price)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
