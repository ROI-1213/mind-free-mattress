import React, { useState } from 'react';
import type { SignatureMattressModel } from '../../data/showroomData';
import { X, Check, ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';

interface ShowroomDetailModalProps {
  mattress: SignatureMattressModel | null;
  onClose: () => void;
}

export const ShowroomDetailModal: React.FC<ShowroomDetailModalProps> = ({ mattress, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<string>('King (72 × 78 in)');
  const [activeView, setActiveView] = useState<'perspective' | 'macro'>('perspective');

  if (!mattress) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-xl animate-fade-in select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detailed inspection for ${mattress.title}`}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto custom-scrollbar bg-gradient-to-br from-[#121B14] via-[#1E291C] to-[#0E1710] border border-[#E3262E]/40 rounded-3xl lg:rounded-4xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-6 sm:p-8 lg:p-10 text-[#F8F5EE]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-[#E3262E] hover:text-[#121B14] text-white flex items-center justify-center transition-all cursor-pointer z-30 shadow-lg"
          aria-label="Close inspection view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Tag */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#E3262E] font-bold">
            {mattress.label}
          </span>
        </div>

        {/* Grid: Left Product View + Right Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: INTERACTIVE IMAGE VIEW (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Main Showcase Image */}
            <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-4 bg-black/40 group">
              <img
                src={activeView === 'perspective' ? mattress.image : mattress.macroImage}
                alt={mattress.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* View Switcher Pills */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 z-20">
                <button
                  onClick={() => setActiveView('perspective')}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer
                    ${activeView === 'perspective' ? 'bg-[#E3262E] text-[#121B14] font-semibold' : 'bg-black/60 backdrop-blur-md text-white/80 hover:text-white'}
                  `}
                >
                  Gallery View
                </button>
                <button
                  onClick={() => setActiveView('macro')}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer
                    ${activeView === 'macro' ? 'bg-[#E3262E] text-[#121B14] font-semibold' : 'bg-black/60 backdrop-blur-md text-white/80 hover:text-white'}
                  `}
                >
                  Material Macro
                </button>
              </div>
            </div>

            {/* Key Performance Indicators */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] uppercase tracking-wider text-[#D8D0C1]/70 font-mono mb-1">
                  Height
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#F8F5EE]">
                  {mattress.specs.height}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] uppercase tracking-wider text-[#D8D0C1]/70 font-mono mb-1">
                  Warranty
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#E3262E]">
                  {mattress.specs.warranty.split(' ')[0]} {mattress.specs.warranty.split(' ')[1]}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] uppercase tracking-wider text-[#D8D0C1]/70 font-mono mb-1">
                  Risk-Free Trial
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#F8F5EE]">
                  {mattress.specs.trial.split(' ')[0]} Nights
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PRODUCT DETAILS & CONFIGURATION (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F8F5EE] leading-tight mb-2">
                {mattress.title}
              </h2>
              <p className="text-xs text-[#E3262E] uppercase font-mono tracking-wider font-semibold mb-4">
                {mattress.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-[#D8D0C1]/90 leading-relaxed mb-6">
                {mattress.description}
              </p>

              {/* Firmness Rating Meter */}
              <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#D8D0C1] font-medium flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#E3262E]" />
                    Firmness Profile
                  </span>
                  <span className="text-[#E3262E] font-bold font-mono">
                    {mattress.specs.firmness} ({mattress.specs.firmnessScore}/10)
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E3262E] to-[#FFF1D0] rounded-full shadow-[0_0_8px_rgba(189,139,67,0.7)]"
                    style={{ width: `${(mattress.specs.firmnessScore / 10) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
                  <span>Plush</span>
                  <span>Balanced</span>
                  <span>Firm</span>
                </div>
              </div>

              {/* Available Sizes Selector */}
              <div className="mb-6">
                <label className="text-xs font-medium text-[#D8D0C1] block mb-2.5">
                  Select Dimension
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {mattress.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        px-3 py-2 rounded-xl text-xs font-medium transition-all text-left flex items-center justify-between cursor-pointer
                        ${
                          selectedSize === size
                            ? 'bg-[#E3262E] text-[#121B14] font-semibold shadow-md'
                            : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
                        }
                      `}
                    >
                      <span className="truncate">{size}</span>
                      {selectedSize === size && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Core Features */}
              <div className="space-y-2 mb-6">
                {mattress.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs">
                    <div className="w-4 h-4 rounded-full bg-[#E3262E]/20 text-[#E3262E] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <span className="font-semibold text-white">{feat.title}:</span>{' '}
                      <span className="text-[#D8D0C1]/80">{feat.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <a
                href={mattress.route}
                className="flex-1 py-3.5 rounded-full bg-[#E3262E] hover:bg-[#d4a759] text-[#121B14] font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>View Full Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={onClose}
                className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Back to Showroom
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
