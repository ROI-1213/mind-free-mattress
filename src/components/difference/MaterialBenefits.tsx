import React from 'react';
import { Leaf, Cpu, Home, ShieldCheck } from 'lucide-react';
import { MATERIAL_BENEFITS, type BenefitItem } from '../../data/differenceData';

export const MaterialBenefits: React.FC = () => {
  const getIcon = (iconName: BenefitItem['iconName']) => {
    switch (iconName) {
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-[#0A2E73]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#E3262E]" />;
      case 'Home':
        return <Home className="w-5 h-5 text-[#0A2E73]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#E3262E]" />;
      default:
        return <Leaf className="w-5 h-5 text-[#0A2E73]" />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between py-2 sm:py-4 select-none">
      {/* Vertical Continuous Connector Line */}
      <div className="absolute left-[23px] top-6 bottom-6 w-[1.5px] bg-gradient-to-b from-[#E3262E]/40 via-[#0A2E73]/30 to-[#E3262E]/40 hidden sm:block pointer-events-none" />

      <div className="space-y-6 sm:space-y-8 relative z-10">
        {MATERIAL_BENEFITS.map((item) => (
          <div
            key={item.id}
            className="group flex items-start gap-4 sm:gap-5 transition-transform duration-300 hover:translate-x-1"
          >
            {/* Circular Icon Container */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-white border border-[#E7E1D6] group-hover:border-[#E3262E] shadow-[0_4px_14px_rgba(10,46,115,0.06)] group-hover:shadow-[0_6px_20px_rgba(189,148,88,0.2)] flex items-center justify-center transition-all duration-300">
                {getIcon(item.iconName)}
              </div>
              {/* Active gold pulsing ring on hover */}
              <div className="absolute inset-0 rounded-full border border-[#E3262E] opacity-0 group-hover:opacity-100 group-hover:scale-115 transition-all duration-300 pointer-events-none" />
            </div>

            {/* Benefit Content */}
            <div className="pt-0.5 max-w-xs">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif text-[16px] sm:text-[17px] font-semibold text-[#0A2540] leading-snug group-hover:text-[#0A2E73] transition-colors">
                  {item.title}
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
