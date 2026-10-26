import React from 'react';
import { SIGNATURE_MATTRESSES } from '../../data/showroomData';
import type { SignatureMattressModel } from '../../data/showroomData';

interface ShowroomNavigationProps {
  activeId: string | null;
  onSelect: (mattress: SignatureMattressModel) => void;
}

export const ShowroomNavigation: React.FC<ShowroomNavigationProps> = ({ activeId, onSelect }) => {
  return (
    <div className="w-full max-w-xl mx-auto z-20">
      <div className="flex items-center justify-center gap-3 sm:gap-4 p-2 rounded-full bg-[#121B14]/80 backdrop-blur-md border border-[#E3262E]/30 shadow-2xl">
        {SIGNATURE_MATTRESSES.map((mattress) => {
          const isSelected = activeId === mattress.id;

          return (
            <button
              key={mattress.id}
              onClick={() => onSelect(mattress)}
              className={`
                group relative flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full
                transition-all duration-300 cursor-pointer
                ${
                  isSelected
                    ? 'bg-[#E3262E] text-[#121B14] font-semibold shadow-md'
                    : 'bg-transparent text-[#F8F5EE]/80 hover:text-white hover:bg-white/5'
                }
              `}
              aria-label={`Focus ${mattress.title}`}
            >
              {/* Mini Thumbnail */}
              <div
                className={`
                  w-6 h-6 rounded-full overflow-hidden shrink-0 border
                  ${isSelected ? 'border-[#121B14]' : 'border-white/20 group-hover:border-[#E3262E]'}
                `}
              >
                <img
                  src={mattress.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Short Category */}
              <span className="text-xs tracking-wider whitespace-nowrap font-medium">
                {mattress.title.replace(' Collection', '')}
              </span>

              {/* Discreet Active Indicator Dot */}
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#121B14] shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
