import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { type MattressCollectionItem } from '../../data/collectionData';
import { ExpandedMattressDetails } from './ExpandedMattressDetails';
import { useNavigation } from '../../context/NavigationContext';

interface ExpandableMattressCardProps {
  item: MattressCollectionItem;
  isExpanded: boolean;
  onActivate: () => void;
  onPin?: () => void;
}

export const ExpandableMattressCard: React.FC<ExpandableMattressCardProps> = ({
  item,
  isExpanded,
  onActivate,
}) => {
  const [activeImage, setActiveImage] = useState(item.mainImage);
  const { navigateToProduct } = useNavigation();

  // If card changes or item changes, reset active image to main
  React.useEffect(() => {
    setActiveImage(item.mainImage);
  }, [item.mainImage]);

  return (
    <div
      onClick={onActivate}
      onMouseEnter={onActivate}
      className={`relative h-[540px] sm:h-[560px] lg:h-[600px] rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer select-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isExpanded
          ? 'flex flex-[3.8] w-full lg:w-auto min-w-full lg:min-w-[560px] shadow-[0_20px_50px_rgba(16,39,31,0.22)] ring-1 ring-[#E3262E]/40'
          : 'hidden lg:flex flex-1 min-w-[70px] sm:min-w-[85px] lg:min-w-[95px] xl:min-w-[110px] hover:flex-[1.2] opacity-85 hover:opacity-100 hover:shadow-lg'
      }`}
      role="tab"
      aria-selected={isExpanded}
      aria-label={`${item.name} mattress category`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate();
        }
      }}
    >
      {/* Background Mattress Photograph with scale transition */}
      <div className="absolute inset-0 overflow-hidden bg-[#071F52]">
        <img
          src={activeImage}
          alt={item.name}
          className={`w-full h-full object-cover object-center transition-transform duration-1000 ease-out ${
            isExpanded ? 'scale-100 filter brightness-95' : 'scale-108 filter brightness-[0.75] hover:scale-105'
          }`}
          onError={(e) => {
            // fallback to original category crop if needed
            (e.currentTarget as HTMLImageElement).src = '/images/mindfree-hero-main.webp';
          }}
        />

        {/* Sophisticated Dark Evergreen Vignette & Gradient Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
            isExpanded
              ? 'bg-gradient-to-r from-[#041230]/95 via-[#041230]/75 sm:via-[#041230]/40 to-transparent'
              : 'bg-gradient-to-t from-[#041230]/90 via-[#041230]/50 to-[#041230]/20'
          }`}
        />
      </div>

      {/* EXPANDED STATE CONTENT */}
      {isExpanded ? (
        <ExpandedMattressDetails
          item={item}
          activeImage={activeImage}
          onSelectThumbnail={(thumb) => setActiveImage(thumb)}
          onViewCollection={() => navigateToProduct(item.id)}
        />
      ) : (
        /* COLLAPSED STATE VERTICAL LUXURY CARD */
        <div className="relative w-full h-full flex flex-col justify-between items-center py-6 px-1.5 text-white z-10">
          {/* Top Number */}
          <div className="flex flex-col items-center">
            <span className="font-mono text-[11px] font-bold tracking-widest text-[#E3262E]">
              {item.number}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#E3262E]/70 mt-1" />
          </div>

          {/* Vertical Category Title (Rotated 90-deg text) */}
          <div className="flex-1 flex items-center justify-center my-4 overflow-visible">
            <span className="font-serif text-[15px] sm:text-[17px] font-medium tracking-wider text-[#F8FAFC] whitespace-nowrap -rotate-90 select-none drop-shadow-md transition-colors duration-300">
              {item.name}
            </span>
          </div>

          {/* Bottom Circular Arrow Indicator */}
          <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white/80 group-hover:bg-[#E3262E] group-hover:text-white transition-all duration-200">
            <ArrowUpRight className="w-4 h-4 stroke-[2]" />
          </div>
        </div>
      )}
    </div>
  );
};
