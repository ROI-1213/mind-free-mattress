import React from 'react';
import { Sparkles, Activity, Boxes, Leaf, Wind } from 'lucide-react';
import { type MattressLayer } from '../../data/differenceData';

interface MattressLayerLabelProps {
  layer: MattressLayer;
  isActive?: boolean;
  onHover?: (id: string | null) => void;
}

export const MattressLayerLabel: React.FC<MattressLayerLabelProps> = ({
  layer,
  isActive = false,
  onHover,
}) => {
  const getIcon = () => {
    switch (layer.iconName) {
      case 'Sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />;
      case 'Activity':
        return <Activity className="w-3.5 h-3.5 text-[#E3262E]" />;
      case 'Boxes':
        return <Boxes className="w-3.5 h-3.5 text-[#E3262E]" />;
      case 'Leaf':
        return <Leaf className="w-3.5 h-3.5 text-[#E3262E]" />;
      case 'Wind':
        return <Wind className="w-3.5 h-3.5 text-[#E3262E]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />;
    }
  };

  return (
    <div
      style={{
        top: layer.desktopPos.top,
        left: layer.desktopPos.left,
      }}
      className={`absolute z-20 hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border shadow-[0_8px_20px_rgba(10,46,115,0.12)] transition-all duration-300 cursor-pointer ${
        isActive
          ? 'border-[#E3262E] ring-2 ring-[#E3262E]/30 scale-105 shadow-[0_12px_28px_rgba(189,148,88,0.25)]'
          : 'border-[#EAE5DC] hover:border-[#E3262E]/60 hover:scale-102'
      }`}
      onMouseEnter={() => onHover?.(layer.id)}
      onMouseLeave={() => onHover?.(null)}
      role="button"
      tabIndex={0}
      aria-label={layer.name}
    >
      <div className="w-6 h-6 rounded-full bg-[#0A2E73]/8 flex items-center justify-center shrink-0">
        {getIcon()}
      </div>
      <div className="text-left pr-1">
        <span className="block text-[11px] font-semibold text-[#0A2540] leading-tight whitespace-nowrap">
          {layer.name}
        </span>
      </div>
      {/* Anchor dot indication */}
      <span className="w-1.5 h-1.5 rounded-full bg-[#E3262E] shrink-0 animate-pulse" />
    </div>
  );
};
