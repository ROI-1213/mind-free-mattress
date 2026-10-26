import React from 'react';
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Moon } from 'lucide-react';
import { type MattressCollectionItem } from '../../data/collectionData';

interface ExpandedMattressDetailsProps {
  item: MattressCollectionItem;
  activeImage: string;
  onSelectThumbnail: (thumb: string) => void;
  onViewCollection?: () => void;
}

export const ExpandedMattressDetails: React.FC<ExpandedMattressDetailsProps> = ({
  item,
  activeImage,
  onSelectThumbnail,
  onViewCollection,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 text-white z-20 select-none animate-in fade-in duration-500">
      {/* Top Header Information */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-[#E3262E] font-bold">
              {item.number} / 06
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E3262E]" />
            <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#C5D5C6] font-medium">
              {item.tag}
            </span>
          </div>

          {/* Star rating */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-xs border border-white/10 text-xs">
            <Star className="w-3.5 h-3.5 fill-[#E3262E] text-[#E3262E]" />
            <span className="font-semibold text-[11.5px]">{item.rating}</span>
            <span className="text-[10px] text-white/60">({item.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight tracking-tight text-white mb-1.5">
          {item.name}
        </h3>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-[#E3262E] font-medium italic font-serif tracking-wide mb-3">
          {item.tagline}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-[#E0E7E2] leading-relaxed max-w-[420px] mb-5">
          {item.description}
        </p>

        {/* 4 Benefits in a Clean 2x2 Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 max-w-[440px] mb-5">
          {item.benefits.map((b, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs text-white"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E3262E] shrink-0" />
              <span className="text-[11.5px] font-medium leading-tight">{b.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Area: Specs, Price, CTA, and 3 Detail Thumbnails */}
      <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Specs & Pricing */}
        <div>
          <div className="flex items-center gap-3 text-[11px] text-white/70 mb-1">
            <span className="flex items-center gap-1">
              <Moon className="w-3 h-3 text-[#E3262E]" />
              {item.trial} Trial
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#E3262E]" />
              {item.warranty} Warranty
            </span>
          </div>
          <div className="text-xs text-white/90">
            From <span className="font-serif text-lg sm:text-xl font-bold text-white">{item.startingPrice}</span>
          </div>
        </div>

        {/* Right side: 3 Thumbnails + CTA Button */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
          {/* 3 Clickable alternate angles */}
          <div className="hidden md:flex items-center gap-2">
            {item.thumbnails.map((thumb, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectThumbnail(thumb);
                }}
                className={`w-11 h-9 rounded-lg overflow-hidden border transition-all ${
                  activeImage === thumb
                    ? 'border-[#E3262E] ring-2 ring-[#E3262E]/50 scale-105'
                    : 'border-white/30 opacity-70 hover:opacity-100'
                }`}
                title={`View angle ${idx + 1}`}
              >
                <img src={thumb} alt={`${item.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Primary View Collection Button */}
          <a
            href={item.href}
            onClick={(e) => {
              if (onViewCollection) {
                e.preventDefault();
                onViewCollection();
              }
            }}
            className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#E3262E] hover:bg-[#A88242] active:scale-95 text-white font-medium text-xs sm:text-[13px] tracking-wide shadow-lg transition-all duration-200"
          >
            <span>View Collection</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};
