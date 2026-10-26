import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';
import { CUSTOMER_BENEFITS, type BenefitStripItem } from '../../data/lifestyleData';

export const CustomerBenefitsStrip: React.FC = () => {
  const getIcon = (iconName: BenefitStripItem['iconName']) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-5 h-5 text-[#E3262E]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#E3262E]" />;
      case 'RotateCcw':
        return <RotateCcw className="w-5 h-5 text-[#E3262E]" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-[#E3262E]" />;
      default:
        return <Truck className="w-5 h-5 text-[#E3262E]" />;
    }
  };

  return (
    <div className="w-full py-7 sm:py-8 bg-[#EDF3EB] border-y border-[#DDE7DA] select-none">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 items-center">
          {CUSTOMER_BENEFITS.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-3.5 sm:gap-4 px-2 sm:px-4 lg:px-6 ${
                idx < CUSTOMER_BENEFITS.length - 1 ? 'lg:border-r lg:border-[#CBDCCE]' : ''
              }`}
            >
              {/* Circular Icon Container */}
              <div className="w-12 h-12 rounded-full bg-white border border-[#D5DFD3] shadow-[0_2px_8px_rgba(10,46,115,0.06)] flex items-center justify-center shrink-0">
                {getIcon(item.iconName)}
              </div>

              {/* Text Information */}
              <div>
                <span className="block font-serif text-[15px] sm:text-[16px] font-bold text-[#0A2540] leading-snug">
                  {item.title}
                </span>
                <span className="block text-xs sm:text-[12.5px] text-[#55635B] leading-tight mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
