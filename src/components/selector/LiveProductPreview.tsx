import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Moon,
  Truck,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
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

interface LiveProductPreviewProps {
  product: CatalogueProductMatch;
  selectedMaterial: MattressMaterialId;
  selectedTopDesign: TopDesignId;
  selectedSize: MattressSizeId;
  onReset: () => void;
  onExploreMatching: () => void;
}

export const LiveProductPreview: React.FC<LiveProductPreviewProps> = ({
  product,
  selectedMaterial,
  selectedTopDesign,
  selectedSize,
  onReset,
  onExploreMatching,
}) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const materialObj = SELECTOR_MATERIALS.find((m) => m.id === selectedMaterial);
  const topDesignObj = SELECTOR_TOP_DESIGNS.find((t) => t.id === selectedTopDesign);
  const sizeObj = SELECTOR_SIZES.find((s) => s.id === selectedSize);

  const currentPrice = product.prices[selectedSize];
  const originalPrice = product.originalPrices[selectedSize];
  const savings = originalPrice - currentPrice;
  const emiPerMonth = Math.round(currentPrice / 12);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_12px_40px_rgba(10,46,115,0.08)] overflow-hidden flex flex-col h-full sticky top-28 transition-all">
      {/* Top Header: Configuration Badges & Reset Button */}
      <div className="px-5 py-4 border-b border-[#EFEBE4] bg-[#F8FAFC] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0A2E73] animate-pulse" />
          <span className="text-[11.5px] font-bold tracking-wider uppercase text-[#0A2E73]">
            Live Configuration Preview
          </span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#76827C] hover:text-[#0A2E73] transition-colors cursor-pointer py-1 px-2 rounded-md hover:bg-[#EAE5DC]"
          title="Reset to default configuration"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Image Showcase Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] bg-[#F3EFE7] overflow-hidden group">
        <img
          key={product.image}
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-103 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
          }`}
        />

        {/* Soft dark vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Floating Stock Tag */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-[#0A2E73]/90 backdrop-blur-md text-[#F8FAFC] px-2.5 py-1 rounded-full text-[10.5px] font-medium shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#52D273]" />
          <span>{product.shippingNotice}</span>
        </div>

        {/* Bottom Floating Configuration Pill Tags */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          <span className="bg-white/95 backdrop-blur-md text-[#0A2E73] text-[10.5px] font-semibold px-2.5 py-1 rounded-lg shadow-xs border border-white/40">
            {materialObj?.name}
          </span>
          <span className="bg-white/95 backdrop-blur-md text-[#0A2E73] text-[10.5px] font-semibold px-2.5 py-1 rounded-lg shadow-xs border border-white/40">
            {topDesignObj?.name}
          </span>
          <span className="bg-[#0A2E73]/95 backdrop-blur-md text-[#F8FAFC] text-[10.5px] font-semibold px-2.5 py-1 rounded-lg shadow-xs">
            {sizeObj?.name} ({sizeObj?.dimensionsInches})
          </span>
        </div>
      </div>

      {/* Product Details & Pricing Info */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Series & SKU */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#E3262E]">
              {product.series}
            </span>
            <span className="text-[10.5px] font-mono text-[#8C9590]">
              SKU: {product.sku}
            </span>
          </div>

          {/* Product Headline */}
          <h4 className="font-serif text-[20px] sm:text-[22px] font-semibold text-[#0A2E73] leading-snug">
            {product.name}
          </h4>

          {/* Tagline */}
          <p className="text-[12.5px] text-[#5A6861] mt-1 mb-3.5 leading-relaxed">
            {product.tagline}
          </p>

          {/* Firmness & Dimension Pill Specs */}
          <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-[#F8FAFC] border border-[#EFEBE3]">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#88908B] block">
                Firmness Index
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[12px] font-bold text-[#0A2E73]">
                  {product.firmnessScore} / 10
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-[#E5DFD4] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E3262E] to-[#0A2E73] rounded-full transition-all duration-500"
                    style={{ width: `${(product.firmnessScore / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#88908B] block">
                Finished Height
              </span>
              <span className="text-[12px] font-bold text-[#0A2E73] mt-1 block">
                {product.height}
              </span>
            </div>
          </div>

          {/* Construction Features Bullet List */}
          <div className="space-y-1.5 mb-5">
            {product.keyFeatures.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E3262E] shrink-0 mt-0.5" />
                <span className="text-[11.5px] text-[#47544E] leading-tight">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Row */}
          <div className="pt-4 border-t border-[#EFEBE4] mb-5">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10.5px] uppercase font-semibold text-[#88908B] block mb-0.5">
                  Configured Price ({sizeObj?.name})
                </span>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-serif text-[26px] sm:text-[28px] font-bold text-[#0A2E73] tracking-tight">
                    {formatPriceINR(currentPrice)}
                  </span>
                  <span className="text-[14px] text-[#9AA39E] line-through font-medium">
                    {formatPriceINR(originalPrice)}
                  </span>
                  <span className="text-[11px] font-bold text-[#2B7A4B] bg-[#EAF5EE] px-2 py-0.5 rounded-md">
                    Save {formatPriceINR(savings)}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-[#69756F] block">
                  EMI from
                </span>
                <span className="text-[12.5px] font-bold text-[#0A2E73]">
                  ₹{emiPerMonth}/mo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Assurance Trust Badges Strip */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-lg bg-[#F8FAFC] border border-[#EBE7DF] mb-5 text-center">
          <div className="flex flex-col items-center">
            <Moon className="w-3.5 h-3.5 text-[#E3262E] mb-0.5" />
            <span className="text-[10px] font-semibold text-[#0F2952]">100 Nights</span>
            <span className="text-[8.5px] text-[#808B85]">Risk-Free Trial</span>
          </div>
          <div className="flex flex-col items-center border-x border-[#E5E0D5]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E3262E] mb-0.5" />
            <span className="text-[10px] font-semibold text-[#0F2952]">{product.warrantyYears} Years</span>
            <span className="text-[8.5px] text-[#808B85]">Warranty Assurance</span>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-3.5 h-3.5 text-[#E3262E] mb-0.5" />
            <span className="text-[10px] font-semibold text-[#0F2952]">Free Delivery</span>
            <span className="text-[8.5px] text-[#808B85]">All India Transit</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2.5">
          <button
            type="button"
            onClick={onExploreMatching}
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC] font-medium text-[13.5px] tracking-wide transition-all duration-200 cursor-pointer shadow-[0_4px_16px_rgba(10,46,115,0.2)] hover:shadow-[0_6px_20px_rgba(10,46,115,0.3)] active:scale-[0.99]"
          >
            <span>Explore Matching Mattresses</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <a
            href="#collection"
            className="w-full text-center py-2 text-[12px] font-medium text-[#5F6B65] hover:text-[#0A2E73] transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <span>Browse All Mattresses in Catalogue</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
