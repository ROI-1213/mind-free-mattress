import React from 'react';
import { Search, X } from 'lucide-react';

interface FAQSearchProps {
  query: string;
  onChange: (query: string) => void;
  onClear: () => void;
}

export const FAQSearch: React.FC<FAQSearchProps> = ({
  query,
  onChange,
  onClear,
}) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86928C]">
        <Search className="w-4 h-4 stroke-[2]" />
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your question…"
        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/90 border border-[#E4DED4] focus:border-[#E3262E] focus:bg-white focus:outline-hidden text-[#0A2E73] placeholder-[#8F9993] text-[13px] transition-all duration-200 shadow-2xs"
      />

      {query && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#86928C] hover:text-[#0A2E73] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
