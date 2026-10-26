import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import {
  type CatalogueProductMatch,
  type MattressMaterialId,
  type TopDesignId,
  type MattressSizeId,
  SELECTOR_MATERIALS,
  SELECTOR_TOP_DESIGNS,
  SELECTOR_SIZES,
  formatPriceINR,
} from '../../data/selectorData';

interface MatchingMattressModalProps {
  product: CatalogueProductMatch;
  initialSize: MattressSizeId;
  selectedMaterial: MattressMaterialId;
  selectedTopDesign: TopDesignId;
  onClose: () => void;
}

export const MatchingMattressModal: React.FC<MatchingMattressModalProps> = ({
  product,
  initialSize,
  selectedMaterial,
  selectedTopDesign,
  onClose,
}) => {
  const [activeSize, setActiveSize] = useState<MattressSizeId>(initialSize);
  const [isAdded, setIsAdded] = useState(false);

  const materialObj = SELECTOR_MATERIALS.find((m) => m.id === selectedMaterial);
  const topDesignObj = SELECTOR_TOP_DESIGNS.find((t) => t.id === selectedTopDesign);
  const currentSizeObj = SELECTOR_SIZES.find((s) => s.id === activeSize);

  const currentPrice = product.prices[activeSize];
  const originalPrice = product.originalPrices[activeSize];
  const savings = originalPrice - currentPrice;

  const handleOrder = () => {
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
      // Scroll to checkout or collection
      const target = document.getElementById('collection');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#F8FAFC] rounded-3xl border border-[#DCD5C9] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#0A2540] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#0A2E73] border border-[#E0DCD3] flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto p-5 sm:p-8 flex-1">
          {/* Header Tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E3262E]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#E3262E]">
              {product.series} · Matched Specification
            </span>
          </div>

          <h2 className="font-serif text-[24px] sm:text-[30px] font-bold text-[#0A2E73] tracking-tight leading-tight">
            {product.name}
          </h2>

          <p className="text-[13.5px] text-[#55635C] mt-1.5 mb-6 max-w-2xl leading-relaxed">
            {product.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Column: Visual Showcase */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#E5DFD4] shadow-md relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute bottom-3 left-3 bg-[#0A2E73]/90 backdrop-blur-md text-[#F8FAFC] text-[11px] font-medium px-3 py-1 rounded-lg">
                  {materialObj?.name} + {topDesignObj?.name}
                </div>
              </div>

              {/* Material & Profile Detail Strip */}
              <div className="p-3.5 rounded-xl bg-white border border-[#EAE4D8] flex items-center gap-4">
                <img
                  src={materialObj?.thumbnail}
                  alt={materialObj?.name}
                  className="w-12 h-9 object-cover rounded-md border border-[#E2DDD3]"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[11.5px] font-bold text-[#0A2E73] block">
                    Core: {materialObj?.name}
                  </span>
                  <span className="text-[10.5px] text-[#6F7B75] block truncate">
                    {materialObj?.shortDesc}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Size Selector & Technical Breakdown */}
            <div className="lg:col-span-6 flex flex-col space-y-5">
              {/* Size Selector in Modal */}
              <div>
                <label className="text-[11.5px] font-bold uppercase tracking-wider text-[#0A2E73] block mb-2">
                  Select Mattress Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SELECTOR_SIZES.map((sz) => {
                    const isSelected = sz.id === activeSize;
                    const price = product.prices[sz.id];

                    return (
                      <button
                        key={sz.id}
                        type="button"
                        onClick={() => setActiveSize(sz.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0A2E73] text-white border-[#0A2E73] shadow-sm'
                            : 'bg-white hover:bg-[#F6F3EB] text-[#0F2952] border-[#E2DDD3]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[12.5px] font-bold">
                            {sz.name}
                          </span>
                          <span
                            className={`text-[11.5px] font-semibold ${
                              isSelected ? 'text-[#E3262E]' : 'text-[#0A2E73]'
                            }`}
                          >
                            {formatPriceINR(price)}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] block mt-0.5 ${
                            isSelected ? 'text-white/80' : 'text-[#7A8580]'
                          }`}
                        >
                          {sz.dimensionsInches}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-2.5">
                <div className="flex items-center justify-between text-[12px] pb-2 border-b border-[#F0EBE2]">
                  <span className="text-[#78847F]">Finished Mattress Height</span>
                  <span className="font-bold text-[#0A2E73]">{product.height}</span>
                </div>
                <div className="flex items-center justify-between text-[12px] pb-2 border-b border-[#F0EBE2]">
                  <span className="text-[#78847F]">Firmness Index</span>
                  <span className="font-bold text-[#0A2E73]">{product.firmnessLabel}</span>
                </div>
                <div className="flex items-center justify-between text-[12px] pb-2 border-b border-[#F0EBE2]">
                  <span className="text-[#78847F]">Warranty Protection</span>
                  <span className="font-bold text-[#0A2E73]">{product.warrantyYears} Years Comprehensive</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[#78847F]">In-Home Trial</span>
                  <span className="font-bold text-[#0A2E73]">{product.trialNights} Nights Risk-Free</span>
                </div>
              </div>

              {/* Key Construction Highlights */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#88908B] block mb-1">
                  Engineered Construction Layers
                </span>
                {product.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E3262E] shrink-0" />
                    <span className="text-[12px] text-[#425049]">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Pricing & Add To Cart Button */}
              <div className="pt-3 border-t border-[#E8E2D6]">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#88908B] block">
                      Total Configured Price ({currentSizeObj?.name})
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-[26px] font-bold text-[#0A2E73]">
                        {formatPriceINR(currentPrice)}
                      </span>
                      <span className="text-[13px] text-[#9AA39E] line-through">
                        {formatPriceINR(originalPrice)}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11.5px] font-bold text-[#2B7A4B] bg-[#EAF5EE] px-2.5 py-1 rounded-md">
                    Instant Savings {formatPriceINR(savings)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleOrder}
                  disabled={isAdded}
                  className={`w-full py-3.5 px-6 rounded-xl font-medium text-[14px] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-md ${
                    isAdded
                      ? 'bg-[#2B7A4B] text-white'
                      : 'bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC] hover:shadow-lg'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Configuration Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <span>Reserve with 100-Night Trial</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
