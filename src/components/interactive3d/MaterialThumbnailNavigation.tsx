import React from 'react';
import { MATTRESS_LAYERS } from '../../data/interactive3DData';

interface MaterialThumbnailNavigationProps {
  selectedLayerIndex: number;
  onSelectLayer: (index: number) => void;
  isExploded: boolean;
  onToggleExplode: (exploded: boolean) => void;
}

export const MaterialThumbnailNavigation: React.FC<MaterialThumbnailNavigationProps> = ({
  selectedLayerIndex,
  onSelectLayer,
  isExploded,
  onToggleExplode,
}) => {
  // Filter the 5 primary hero thumbnail layers specified in prompt
  const heroLayers = MATTRESS_LAYERS.filter((l) => l.isHeroThumbnail);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Control bar / Status banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-[#E3262E] font-semibold flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E3262E] animate-ping" />
            Interactive Material Anatomy
          </span>
          <span className="text-xs text-[#F8FAFC]/40 hidden sm:inline">•</span>
          <span className="text-xs text-[#F8FAFC]/70 hidden sm:inline">
            Click any layer or thumbnail to physically separate and inspect
          </span>
        </div>

        {/* Quick Toggle: Explode / Assembled view */}
        <button
          onClick={() => onToggleExplode(!isExploded)}
          className={`
            px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase
            transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg
            ${
              isExploded
                ? 'bg-white/15 hover:bg-white/25 text-[#F8FAFC] border border-white/20'
                : 'bg-[#E3262E] hover:bg-[#d49e4d] text-[#0C2A1E] font-bold border border-[#E3262E]'
            }
          `}
        >
          <span>{isExploded ? '✦ View Assembled' : '✦ Explode Layers'}</span>
        </button>
      </div>

      {/* 5 Premium Material Cards Container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3.5">
        {heroLayers.map((layer) => {
          const isSelected = selectedLayerIndex === layer.index;

          return (
            <button
              key={layer.id}
              onClick={() => {
                if (!isExploded) {
                  onToggleExplode(true);
                }
                onSelectLayer(layer.index);
              }}
              className={`
                group relative text-left rounded-2xl p-2.5 sm:p-3
                transition-all duration-300 cursor-pointer overflow-hidden
                flex flex-col items-start
                ${
                  isSelected
                    ? 'bg-[#092218]/95 border-2 border-[#E3262E] shadow-[0_10px_25px_rgba(189,139,67,0.35)] scale-[1.02]'
                    : 'bg-[#0A1D15]/80 hover:bg-[#0D291D]/90 border border-white/10 hover:border-[#E3262E]/50 shadow-md'
                }
              `}
              aria-label={`Select ${layer.name}`}
            >
              {/* Active Gold Indicator Corner */}
              {isSelected && (
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#E3262E] to-transparent rounded-bl-xl flex items-start justify-end p-1">
                  <span className="text-[10px] text-[#0C2A1E] font-bold leading-none">✓</span>
                </div>
              )}

              {/* Thumbnail Image */}
              <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden mb-2.5 border border-white/10">
                <img
                  src={layer.image}
                  alt={layer.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-1.5 left-2 text-[10px] font-mono font-bold text-white/90">
                  {layer.thumbnailNumber}
                </span>
              </div>

              {/* Title & Characteristics */}
              <div className="w-full">
                <div
                  className={`text-xs sm:text-sm font-serif font-medium truncate ${
                    isSelected ? 'text-[#F8FAFC] font-semibold' : 'text-[#F8FAFC]/90'
                  }`}
                >
                  {layer.thumbnailLabel || layer.name}
                </div>
                <div className="text-[11px] text-[#E3262E] truncate font-sans font-medium mt-0.5">
                  {layer.specs.thickness} · {layer.subtitle.split(' ')[0]}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
