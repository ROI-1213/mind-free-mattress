import React from 'react';
import type { MattressLayerData } from '../../data/interactive3DData';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Wind,
  ShieldCheck,
  Layers,
  Flame,
  BoxSelect,
  Zap,
  Activity,
  Shield,
  Maximize2,
  Moon,
  Droplets,
  Compass,
  Leaf,
  TrendingUp,
  Disc,
  Target,
  Maximize,
  Feather,
  CheckCircle2,
  Anchor,
} from 'lucide-react';

interface MaterialDetailPanelProps {
  layer: MattressLayerData;
  totalLayers: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  isOpen: boolean;
}

// Icon mapper for dynamic feature items
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Sparkles,
  Wind,
  ShieldCheck,
  Layers,
  Flame,
  BoxSelect,
  Zap,
  Activity,
  Shield,
  Maximize2,
  Moon,
  Droplets,
  Compass,
  Leaf,
  TrendingUp,
  Disc,
  Target,
  Maximize,
  Feather,
  CheckCircle2,
  Anchor,
};

export const MaterialDetailPanel: React.FC<MaterialDetailPanelProps> = ({
  layer,
  totalLayers,
  onPrev,
  onNext,
  onClose,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`
        w-full lg:w-[380px] xl:w-[420px]
        bg-[#092218]/90 backdrop-blur-xl
        border border-[#E3262E]/35 rounded-3xl
        shadow-[0_25px_60px_rgba(0,0,0,0.5)]
        text-[#F8FAFC] p-6 lg:p-7
        transition-all duration-500 ease-out
        relative flex flex-col z-30
      `}
      role="region"
      aria-label={`Detailed specifications for ${layer.name}`}
    >
      {/* Top Header: Layer Number, Step Count & Close Button */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#E3262E] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-[#E3262E] uppercase font-semibold">
            {layer.layerNumber}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#F8FAFC]/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close detail panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Material Heading & Subtitle */}
      <div className="mb-4">
        <h3 className="font-serif text-2xl lg:text-3xl text-[#F8FAFC] tracking-tight leading-snug">
          {layer.name}
        </h3>
        <p className="text-xs uppercase tracking-wider text-[#E3262E] font-medium mt-1">
          {layer.subtitle}
        </p>
      </div>

      {/* Realistic Macro Image Preview */}
      <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden mb-4 border border-white/15 shadow-inner group">
        <img
          src={layer.image}
          alt={layer.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#092218]/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase font-mono tracking-wider text-[#F8FAFC]/90 border border-white/15">
            Thickness: {layer.specs.thickness}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase font-mono tracking-wider text-[#E3262E] border border-[#E3262E]/30">
            {layer.specs.density}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-[#F8FAFC]/80 leading-relaxed mb-5 font-normal">
        {layer.description}
      </p>

      {/* 3 Concise Feature Highlights */}
      <div className="space-y-2.5 mb-6">
        <span className="text-[10px] uppercase tracking-widest text-[#F8FAFC]/50 font-semibold block">
          Key Performance Characteristics
        </span>
        <div className="grid grid-cols-1 gap-2">
          {layer.features.map((feat, i) => {
            const IconComponent = iconMap[feat.icon] || Sparkles;
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/8 hover:border-[#E3262E]/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E3262E]/15 text-[#E3262E] flex items-center justify-center shrink-0">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#F8FAFC] truncate">
                    {feat.title}
                  </div>
                  <div className="text-[11px] text-[#F8FAFC]/60 truncate">
                    {feat.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Controls: Prev / Next / Position */}
      <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#F8FAFC]/70 font-mono">
          <span className="text-[#E3262E] font-bold">0{layer.index + 1}</span>
          <span>/</span>
          <span>0{totalLayers}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#E3262E] hover:text-[#0C2A1E] text-[#F8FAFC] transition-all flex items-center gap-1 text-xs font-medium cursor-pointer"
            aria-label="Previous layer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>
          <button
            onClick={onNext}
            className="px-3.5 py-1.5 rounded-full bg-[#E3262E] hover:bg-[#d49e4d] text-[#0C2A1E] transition-all flex items-center gap-1 text-xs font-semibold shadow-md cursor-pointer"
            aria-label="Next layer"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
