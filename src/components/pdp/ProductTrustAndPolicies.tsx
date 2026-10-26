import React from 'react';
import {
  Moon,
  RotateCcw,
  ShieldCheck,
  Truck,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { type ProductFAQ } from '../../data/pdpData';

interface ProductTrustAndPoliciesProps {
  faqs: ProductFAQ[];
  warrantyYears: string;
  productName: string;
}

export const ProductTrustAndPolicies: React.FC<ProductTrustAndPoliciesProps> = ({
  faqs,
  warrantyYears,
  productName,
}) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="w-full py-16 sm:py-20 bg-[#F8FAFC] border-t border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* 4 Brand Assurance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0A2E73]/10 flex items-center justify-center text-[#0A2E73] mb-4">
              <Moon className="w-5 h-5 text-[#E3262E]" />
            </div>
            <h4 className="text-sm font-bold text-[#071F52] mb-1">
              100-Night In-Home Trial
            </h4>
            <p className="text-xs text-[#55645D] leading-relaxed">
              Sleep on it in your own home for 100 nights. If it's not love, return it for a full refund.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0A2E73]/10 flex items-center justify-center text-[#0A2E73] mb-4">
              <ShieldCheck className="w-5 h-5 text-[#E3262E]" />
            </div>
            <h4 className="text-sm font-bold text-[#071F52] mb-1">
              {warrantyYears} Comprehensive Warranty
            </h4>
            <p className="text-xs text-[#55645D] leading-relaxed">
              Crafted to endure. Covers any structural sagging or manufacturing defects.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0A2E73]/10 flex items-center justify-center text-[#0A2E73] mb-4">
              <Truck className="w-5 h-5 text-[#E3262E]" />
            </div>
            <h4 className="text-sm font-bold text-[#071F52] mb-1">
              Free White-Glove Setup
            </h4>
            <p className="text-xs text-[#55645D] leading-relaxed">
              Delivered directly into your bedroom, unboxed, and positioned onto your frame.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#0A2E73]/10 flex items-center justify-center text-[#0A2E73] mb-4">
              <RotateCcw className="w-5 h-5 text-[#E3262E]" />
            </div>
            <h4 className="text-sm font-bold text-[#071F52] mb-1">
              Complimentary Old Mattress Removal
            </h4>
            <p className="text-xs text-[#55645D] leading-relaxed">
              Option to have your previous mattress responsibly collected and recycled.
            </p>
          </div>
        </div>

        {/* Product-Specific FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2 text-[#E3262E] text-xs font-semibold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENT QUESTIONS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#071F52]">
              Questions About the {productName}
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E3262E]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-[#0A2E73]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#E3262E] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-[13px] text-[#55645D] leading-relaxed border-t border-[#F0EBE1] pt-3 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
