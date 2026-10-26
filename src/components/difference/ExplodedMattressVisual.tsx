import React, { useState } from 'react';
import { MATTRESS_LAYERS } from '../../data/differenceData';
import { MattressLayerLabel } from './MattressLayerLabel';

export const ExplodedMattressVisual: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[520px] lg:min-h-[600px] flex flex-col items-center justify-center select-none">
      {/* Background Soft Depth Glow */}
      <div className="absolute inset-0 bg-radial from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[#E3262E]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Image Container */}
      <div className="relative w-full max-w-[680px] mx-auto aspect-[16/13] flex items-center justify-center">
        <img
          src="/images/mindfree/mattress-exploded.webp"
          alt="Mindfree Exploded 3D Mattress Anatomy with Floating Layers"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(10,46,115,0.12)] transition-transform duration-700 ease-out hover:scale-[1.02]"
          onError={(e) => {
            // fallback if not yet loaded
            (e.currentTarget as HTMLImageElement).src = '/images/mindfree/mindfree-exploded-layers.webp';
          }}
        />

        {/* SVG Leader Lines for Floating Labels (Desktop only) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-15"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {MATTRESS_LAYERS.map((layer) => {
            const isActive = activeLayer === layer.id;
            // Parse coords
            const sx = parseFloat(layer.desktopPos.left) + 12;
            const sy = parseFloat(layer.desktopPos.top) + 2.5;
            const tx = parseFloat(layer.targetPos.x);
            const ty = parseFloat(layer.targetPos.y);

            return (
              <g key={layer.id} className="transition-opacity duration-300">
                {/* Thin leader line */}
                <line
                  x1={`${sx}%`}
                  y1={`${sy}%`}
                  x2={`${tx}%`}
                  y2={`${ty}%`}
                  stroke={isActive ? '#E3262E' : '#E3262E'}
                  strokeWidth={isActive ? '0.4' : '0.25'}
                  strokeDasharray={isActive ? 'none' : '0.8, 0.8'}
                  className="transition-all duration-300"
                />
                {/* Target anchor point on the mattress layer */}
                <circle
                  cx={`${tx}%`}
                  cy={`${ty}%`}
                  r={isActive ? '1.2' : '0.8'}
                  fill="#E3262E"
                  stroke="#FFFFFF"
                  strokeWidth="0.3"
                  className="animate-pulse"
                />
                {isActive && (
                  <circle
                    cx={`${tx}%`}
                    cy={`${ty}%`}
                    r="2.4"
                    fill="none"
                    stroke="#E3262E"
                    strokeWidth="0.2"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Callout Badges (Desktop) */}
        {MATTRESS_LAYERS.map((layer) => (
          <MattressLayerLabel
            key={layer.id}
            layer={layer}
            isActive={activeLayer === layer.id}
            onHover={setActiveLayer}
          />
        ))}
      </div>

      {/* Mobile Badges Strip (Visible only on mobile/tablet) */}
      <div className="md:hidden w-full mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 px-2">
        {MATTRESS_LAYERS.map((layer) => (
          <div
            key={layer.id}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/90 border border-[#EAE5DC] shadow-xs"
          >
            <div className="w-6 h-6 rounded-full bg-[#0A2E73]/10 flex items-center justify-center shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E3262E]" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-semibold text-[#0A2540]">{layer.name}</span>
              <span className="block text-[10px] text-[#64748B]">{layer.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
