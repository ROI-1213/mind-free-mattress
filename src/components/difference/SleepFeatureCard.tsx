import React from 'react';
import { ArrowUpRight, Activity, Wind, Moon } from 'lucide-react';
import { type SleepFeatureItem } from '../../data/differenceData';

interface SleepFeatureCardProps {
  item: SleepFeatureItem;
}

export const SleepFeatureCard: React.FC<SleepFeatureCardProps> = ({ item }) => {
  const getIcon = () => {
    switch (item.iconName) {
      case 'Activity':
        return <Activity className="w-4 h-4 text-[#0A2E73]" />;
      case 'Wind':
        return <Wind className="w-4 h-4 text-[#0A2E73]" />;
      case 'Moon':
        return <Moon className="w-4 h-4 text-[#0A2E73]" />;
      default:
        return <Activity className="w-4 h-4 text-[#0A2E73]" />;
    }
  };

  return (
    <div className="group relative h-[250px] sm:h-[265px] lg:h-[280px] rounded-[24px] overflow-hidden cursor-pointer select-none border border-[#E2E8F0] shadow-[0_10px_30px_rgba(10,46,115,0.06)] hover:shadow-[0_16px_40px_rgba(16,39,31,0.12)] hover:border-[#E3262E]/60 transition-all duration-500">
      {/* Background Image with subtle smooth scale */}
      <div className="absolute inset-0 bg-[#F4F1EA] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/mindfree-hero-main.webp';
          }}
        />

        {/* Cinematic Soft Gradient Overlay to ensure typography readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC]/95 via-[#F8FAFC]/80 md:via-[#F8FAFC]/60 to-transparent transition-opacity duration-300 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC]/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content Container (Editorial card positioned on left of image) */}
      <div className="relative z-10 w-full h-full p-6 sm:p-7 flex flex-col justify-between max-w-[320px] sm:max-w-[340px]">
        {/* Top: Number badge and Title */}
        <div>
          {/* Eyebrow Number */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-[#E3262E] tracking-widest">
              {item.number}
            </span>
            <span className="w-4 h-[1px] bg-[#E3262E]/60" />
          </div>

          {/* Heading */}
          <h4 className="font-serif text-xl sm:text-[22px] font-normal leading-snug text-[#0A2540] mb-2 group-hover:text-[#0A2E73] transition-colors">
            {item.title}
          </h4>

          {/* Description */}
          <p className="text-xs sm:text-[12.5px] text-[#64748B] leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Bottom Circular Action Button */}
        <div className="pt-3 flex items-center justify-between">
          <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs border border-[#E0DCD3] group-hover:border-[#E3262E] group-hover:bg-[#E3262E] shadow-xs flex items-center justify-center text-[#0A2E73] group-hover:text-white transition-all duration-300">
            {getIcon()}
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-[#0A2E73] group-hover:text-[#E3262E] transition-colors">
            <span>Learn more</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
