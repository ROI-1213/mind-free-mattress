import React from 'react';
import {
  FAQ_CATEGORIES,
  type FAQCategoryId,
} from '../../data/faqData';

interface FAQCategoryFilterProps {
  selectedCategory: FAQCategoryId;
  onSelectCategory: (id: FAQCategoryId) => void;
  counts: Record<FAQCategoryId, number>;
}

export const FAQCategoryFilter: React.FC<FAQCategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none w-0 min-w-full max-w-full">
      {FAQ_CATEGORIES.map((cat) => {
        const isSelected = cat.id === selectedCategory;
        const count = counts[cat.id] ?? 0;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            aria-pressed={isSelected}
            className={`whitespace-nowrap text-[12px] sm:text-[12.5px] font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 ${
              isSelected
                ? 'bg-[#0A2E73] text-[#F8FAFC] shadow-xs'
                : 'bg-white/80 hover:bg-white text-[#526058] hover:text-[#0A2E73] border border-[#E5DFD4]'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                isSelected
                  ? 'bg-[#E3262E] text-[#071F52]'
                  : 'bg-[#EAE5DB] text-[#637069]'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
