import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { type FAQItemData } from '../../data/faqData';

interface FAQItemProps {
  item: FAQItemData;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  const contentId = `faq-content-${item.id}`;
  const buttonId = `faq-btn-${item.id}`;

  return (
    <div
      className={`border-b transition-colors duration-300 py-4 sm:py-5 ${
        isOpen ? 'border-[#E3262E]/40' : 'border-[#E2E8F0]'
      }`}
    >
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full flex items-start justify-between gap-3 sm:gap-4 text-left group cursor-pointer focus:outline-hidden"
      >
        {/* Left: Number + Question */}
        <div className="flex items-baseline gap-2.5 sm:gap-4 flex-1 min-w-0">
          <span
            className={`font-mono text-[11.5px] sm:text-[13px] font-semibold tracking-wider transition-colors duration-200 shrink-0 ${
              isOpen ? 'text-[#E3262E]' : 'text-[#96A09A] group-hover:text-[#E3262E]'
            }`}
          >
            {item.number}
          </span>

          <h3
            className={`font-sans text-[14px] sm:text-[16.5px] font-medium leading-snug transition-colors duration-200 break-words ${
              isOpen
                ? 'text-[#0A2E73] font-semibold'
                : 'text-[#0F2952] group-hover:text-[#0A2E73]'
            }`}
          >
            {item.question}
          </h3>
        </div>

        {/* Right: Plus / Minus Toggle Button */}
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? 'bg-[#0A2E73] text-[#F8FAFC] rotate-180 shadow-xs'
              : 'bg-white border border-[#E0DCD3] text-[#7A8580] group-hover:border-[#0A2E73] group-hover:text-[#0A2E73]'
          }`}
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : (
            <Plus className="w-3.5 h-3.5 stroke-[2]" />
          )}
        </div>
      </button>

      {/* Expandable Answer Container */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-300 ease-out overflow-hidden ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-3 sm:mt-3.5' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden pl-6 sm:pl-8 pr-1 sm:pr-4">
          <p className="text-[13.5px] sm:text-[14.5px] text-[#55635C] leading-relaxed">
            {item.answer}
          </p>

          {item.link && (
            <div className="mt-3">
              <a
                href={item.link.href}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0A2E73] hover:text-[#E3262E] transition-colors py-1 group/link"
              >
                <span>{item.link.text}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
