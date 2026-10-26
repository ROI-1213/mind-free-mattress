import React from 'react';
import { HelpCircle, RotateCcw } from 'lucide-react';
import { type FAQItemData } from '../../data/faqData';
import { FAQItem } from './FAQItem';

interface FAQAccordionProps {
  items: FAQItemData[];
  openId: string | null;
  onToggle: (id: string) => void;
  onResetSearch?: () => void;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  openId,
  onToggle,
  onResetSearch,
}) => {
  if (items.length === 0) {
    return (
      <div className="py-12 px-6 rounded-2xl bg-white/70 border border-[#E2E8F0] text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#E0DCD3] flex items-center justify-center text-[#8C9892] mb-3">
          <HelpCircle className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h4 className="font-serif text-[17px] font-semibold text-[#0A2E73]">
          No matching questions found
        </h4>
        <p className="text-[13px] text-[#697670] mt-1 max-w-sm">
          We couldn't find any questions matching your search. Try different keywords or browse all questions.
        </p>

        {onResetSearch && (
          <button
            type="button"
            onClick={onResetSearch}
            className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0A2E73] bg-[#F8FAFC] hover:bg-[#EAE5DC] border border-[#DDD7CD] py-1.5 px-3.5 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Search & Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col border-t border-[#E2E8F0]">
      {items.map((item) => (
        <FAQItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => onToggle(item.id)}
        />
      ))}
    </div>
  );
};
