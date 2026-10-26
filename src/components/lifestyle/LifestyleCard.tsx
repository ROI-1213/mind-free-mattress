import React from 'react';
import { ArrowRight } from 'lucide-react';
import { type LifestyleItem } from '../../data/lifestyleData';

interface LifestyleCardProps {
  item: LifestyleItem;
}

export const LifestyleCard: React.FC<LifestyleCardProps> = ({ item }) => {
  return (
    <a
      href={item.href}
      className="group flex-1 min-w-[210px] sm:min-w-[230px] rounded-[22px] overflow-hidden bg-white border border-[#E2E8F0] shadow-[0_8px_24px_rgba(10,46,115,0.05)] hover:shadow-[0_16px_36px_rgba(16,39,31,0.12)] hover:border-[#E3262E]/60 transition-all duration-500 flex flex-col justify-between select-none hover:-translate-y-1.5"
    >
      {/* Top Portrait Photograph Container */}
      <div className="relative w-full aspect-[4/4.6] overflow-hidden bg-[#F8FAFC]">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/mindfree-hero-main.webp';
          }}
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Bottom Content Area */}
      <div className="p-5 sm:p-5.5 flex flex-col justify-between flex-1 bg-white">
        <div>
          <h4 className="font-serif text-[17px] sm:text-[18px] font-semibold text-[#0A2540] leading-snug mb-1.5 group-hover:text-[#0A2E73] transition-colors">
            {item.title}
          </h4>
          <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Bottom Circular Arrow Button */}
        <div className="pt-4 flex items-center justify-between">
          <span className="text-[11px] font-medium tracking-wide text-[#E3262E] group-hover:text-[#0A2E73] transition-colors">
            Explore
          </span>
          <div className="w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E7E1D6] group-hover:border-[#E3262E] group-hover:bg-[#E3262E] flex items-center justify-center text-[#0A2E73] group-hover:text-white transition-all duration-300 shadow-xs">
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </a>
  );
};
