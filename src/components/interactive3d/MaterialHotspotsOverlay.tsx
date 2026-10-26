import React from 'react';
import { MATTRESS_LAYERS } from '../../data/interactive3DData';
import { Plus } from 'lucide-react';

interface HotspotPosition {
  id: string;
  screenX: number;
  screenY: number;
  visible: boolean;
}

interface MaterialHotspotsOverlayProps {
  hotspots: HotspotPosition[];
  selectedLayerIndex: number;
  onSelectLayer: (index: number) => void;
  isExploded: boolean;
}

export const MaterialHotspotsOverlay: React.FC<MaterialHotspotsOverlayProps> = ({
  hotspots,
  selectedLayerIndex,
  onSelectLayer,
  isExploded,
}) => {
  if (!isExploded) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {hotspots.map((hp) => {
        if (!hp.visible || hp.screenX <= 0 || hp.screenY <= 0) return null;

        const layerIndex = MATTRESS_LAYERS.findIndex((l) => l.id === hp.id);
        if (layerIndex === -1) return null;

        const layer = MATTRESS_LAYERS[layerIndex];
        const isSelected = selectedLayerIndex === layerIndex;

        return (
          <div
            key={hp.id}
            className="absolute transition-all duration-300 pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group"
            style={{
              left: `${hp.screenX}px`,
              top: `${hp.screenY}px`,
            }}
          >
            {/* Hotspot Click Target Button */}
            <button
              onClick={() => onSelectLayer(layerIndex)}
              className={`
                flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full
                backdrop-blur-md shadow-xl transition-all duration-300 cursor-pointer
                ${
                  isSelected
                    ? 'bg-[#E3262E] text-[#0C2A1E] ring-2 ring-white/80 scale-105'
                    : 'bg-[#092218]/90 hover:bg-[#E3262E] text-[#F8FAFC] hover:text-[#0C2A1E] border border-[#E3262E]/50'
                }
              `}
              aria-label={`Inspect ${layer.name}`}
            >
              {/* Gold Circular Badge with Plus Icon */}
              <div
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform
                  ${
                    isSelected
                      ? 'bg-[#0C2A1E] text-[#E3262E]'
                      : 'bg-[#E3262E] text-[#0C2A1E] group-hover:rotate-45'
                  }
                `}
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>

              {/* Label */}
              <span className="text-[11px] font-sans font-semibold tracking-wide whitespace-nowrap">
                {layer.hotspot.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
};
