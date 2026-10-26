import React from 'react';
import { BedDouble, Star, ShieldCheck, Truck } from 'lucide-react';
import { TRUST_METRICS, type MetricItem } from '../../data/brandStoryData';

export const TrustMetricsStrip: React.FC = () => {
  const getIcon = (iconName: MetricItem['iconName']) => {
    switch (iconName) {
      case 'Bed':
        return <BedDouble className="w-6 h-6 text-[#E3262E]" />;
      case 'Star':
        return <Star className="w-6 h-6 text-[#E3262E]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#E3262E]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#E3262E]" />;
      default:
        return <BedDouble className="w-6 h-6 text-[#E3262E]" />;
    }
  };

  return (
    <div className="w-full py-8 sm:py-10 bg-gradient-to-r from-[#0A2E73] via-[#0E4032] to-[#0A2E73] text-white border-y border-[#185341] shadow-[inset_0_2px_12px_rgba(0,0,0,0.15)] select-none">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 items-center">
          {TRUST_METRICS.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-4 sm:gap-5 px-3 sm:px-6 lg:px-8 ${
                idx < TRUST_METRICS.length - 1 ? 'lg:border-r lg:border-[#1E5C49]/60' : ''
              }`}
            >
              {/* Circular Icon Container */}
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 flex items-center justify-center shrink-0 shadow-xs">
                {getIcon(item.iconName)}
              </div>

              {/* Metric Text */}
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-none">
                  {item.value}
                </span>
                <span className="block text-xs sm:text-[13px] text-[#A2C2B5] font-medium leading-tight mt-1">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
