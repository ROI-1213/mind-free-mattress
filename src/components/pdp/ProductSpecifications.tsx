import React from 'react';
import {
  Layers,
  Clock,
  HeartHandshake,
} from 'lucide-react';
import { type MattressProductDetail } from '../../data/pdpData';

interface ProductSpecificationsProps {
  product: MattressProductDetail;
}

export const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ product }) => {
  return (
    <section className="w-full py-16 sm:py-20 border-t border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#E3262E]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E3262E]">
              ENGINEERED FOR DEEP REST
            </span>
            <span className="w-6 h-px bg-[#E3262E]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#071F52] tracking-tight mb-4">
            Product Specifications & Anatomy
          </h2>
          <p className="text-sm sm:text-base text-[#55645D] leading-relaxed">
            Every layer and contour of the {product.name} is calibrated for anatomical spinal alignment, thermal equilibrium, and lifetime resilience.
          </p>
        </div>

        {/* 2-Column Technical Specifications & Ergonomics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Left: Detailed Specification Table (Col 1-7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs">
            <h3 className="text-lg font-serif font-semibold text-[#0A2E73] mb-6 flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-[#E3262E]" />
              <span>Core Technical Specifications</span>
            </h3>

            <div className="divide-y divide-[#E2E8F0] text-xs sm:text-[13px]">
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#64748B] font-medium">Core Architecture</span>
                <span className="text-[#071F52] font-semibold sm:text-right max-w-md">
                  {product.specifications.coreSupport}
                </span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#64748B] font-medium">Comfort Cushioning</span>
                <span className="text-[#071F52] font-semibold sm:text-right max-w-md">
                  {product.specifications.comfortLayer}
                </span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#64748B] font-medium">Cover Textile</span>
                <span className="text-[#071F52] font-semibold sm:text-right max-w-md">
                  {product.specifications.coverFabric}
                </span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#64748B] font-medium">Firmness Rating</span>
                <span className="text-[#E3262E] font-bold sm:text-right">
                  {product.firmnessLabel}
                </span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#64748B] font-medium">Thermoregulation & Airflow</span>
                <span className="text-[#071F52] font-semibold sm:text-right">
                  {product.specifications.breathability}
                </span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#64748B] font-medium">Kinetic Motion Isolation</span>
                <span className="text-[#071F52] font-semibold sm:text-right">
                  {product.specifications.motionIsolation}
                </span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#64748B] font-medium">Warranty Assurance</span>
                <span className="text-[#0A2E73] font-bold sm:text-right">
                  {product.specifications.warranty}
                </span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#64748B] font-medium">Trial Policy</span>
                <span className="text-[#0A2E73] font-bold sm:text-right">
                  {product.specifications.trial}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Sleeping Posture & Key Benefits (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Ideal Sleepers Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs">
              <h3 className="text-base font-serif font-semibold text-[#0A2E73] mb-4 flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#E3262E]" />
                <span>Recommended Sleeping Styles</span>
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {product.idealSleepers.map((style) => (
                  <span
                    key={style}
                    className="px-3 py-1.5 rounded-full bg-[#0A2E73]/8 text-[#0A2E73] text-xs font-semibold"
                  >
                    ✓ {style}
                  </span>
                ))}
              </div>

              <p className="text-xs text-[#55645D] leading-relaxed">
                Tested and calibrated for individuals who demand anatomical neutrality without stiffness across variable sleeping positions.
              </p>
            </div>

            {/* Care & Maintenance Card */}
            <div className="bg-[#0A2E73] text-[#F8FAFC] rounded-3xl p-6 sm:p-7 border border-[#E3262E]/30 shadow-md">
              <div className="flex items-center gap-2 text-[#E3262E] mb-3">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Care & Maintenance
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-[#DBEAFE]/90">
                {product.careInstructions.map((inst, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#E3262E] font-bold">•</span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
