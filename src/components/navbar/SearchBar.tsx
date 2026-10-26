import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight, X } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

const SUGGESTIONS = [
  { text: 'Orthopedic Back Support Mattress', category: 'Mattresses' },
  { text: 'Natural Pin-Core Latex Mattress', category: 'Mattresses' },
  { text: 'Zero Motion Transfer Pocket Spring', category: 'Mattresses' },
  { text: 'Memory Foam Contour Pillow', category: 'Pillows' },
  { text: 'Waterproof Breathable Mattress Protector', category: 'Accessories' },
];

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className = '', onSearch }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateToSearch } = useNavigation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) onSearch(query);
      navigateToSearch(query.trim());
      setIsOpen(false);
    }
  };

  const filteredSuggestions = query
    ? SUGGESTIONS.filter((s) => s.text.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS.slice(0, 4);

  return (
    <div ref={containerRef} className={`relative w-full max-w-[540px] ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center w-full transition-all duration-300"
      >
        {/* Left search icon */}
        <div className="absolute left-4.5 pointer-events-none text-[#747A78]">
          <Search className="w-4 h-4 text-[#606E66]" strokeWidth={1.8} />
        </div>

        {/* Input field */}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search mattresses, pillows..."
          className="w-full h-10 pl-10 pr-11 text-[13px] text-[#0A2540] placeholder-[#747A78] bg-[#F7F6F2] hover:bg-[#F2EFE8] focus:bg-white border border-[#E2E8F0] focus:border-[#E3262E]/80 rounded-full outline-none transition-all duration-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] focus:shadow-[0_4px_16px_rgba(10,46,115,0.08)]"
          aria-label="Search mattresses, pillows"
        />

        {/* Clear query button if text present */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-12 text-[#989E9B] hover:text-[#0A2540] p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Circular submit button on the right */}
        <button
          type="submit"
          className="absolute right-1.5 w-8 h-8 rounded-full bg-[#0A2E73] hover:bg-[#071F52] active:scale-95 text-white flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
          aria-label="Submit search"
        >
          <ArrowRight className="w-3.5 h-3.5 text-white stroke-[2.2]" />
        </button>
      </form>

      {/* Dropdown Suggestions */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_12px_30px_rgba(10,46,115,0.12)] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-[10.5px] uppercase font-semibold tracking-wider text-[#E3262E] px-3 py-1">
            {query ? 'Matching Results' : 'Trending Sleep Searches'}
          </div>
          <div className="mt-1 space-y-1">
            {filteredSuggestions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setQuery(item.text);
                  setIsOpen(false);
                  navigateToSearch(item.text);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#0A2540] hover:bg-[#EFF6FF] hover:text-[#0A2E73] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-3.5 h-3.5 text-[#A0A6A3]" />
                  <span>{item.text}</span>
                </div>
                <span className="text-[10px] text-[#868E89] bg-[#EAE8E2]/60 px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
