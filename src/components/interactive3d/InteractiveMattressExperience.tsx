import React, { useState, useCallback } from 'react';
import { MATTRESS_LAYERS } from '../../data/interactive3DData';
import { Mattress3DCanvas } from './Mattress3DCanvas';
import { MaterialDetailPanel } from './MaterialDetailPanel';
import { MaterialThumbnailNavigation } from './MaterialThumbnailNavigation';
import { MaterialHotspotsOverlay } from './MaterialHotspotsOverlay';
import { Play, RotateCw, Sparkles, Layers, Eye } from 'lucide-react';

export const InteractiveMattressExperience: React.FC = () => {
  const [isExploded, setIsExploded] = useState(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      return url.searchParams.get('exploded') === 'true' || url.hash.includes('exploded');
    }
    return false;
  });
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(true);
  const [hotspotPositions, setHotspotPositions] = useState<
    Array<{ id: string; screenX: number; screenY: number; visible: boolean }>
  >([]);

  // Navigation handlers
  const handleSelectLayer = useCallback((index: number) => {
    setSelectedLayerIndex(index);
    setIsDetailPanelOpen(true);
  }, []);

  const handleToggleExplode = useCallback((exploded: boolean) => {
    setIsExploded(exploded);
    if (exploded) {
      setIsDetailPanelOpen(true);
    }
  }, []);

  const handlePrevLayer = useCallback(() => {
    setSelectedLayerIndex((prev) => (prev > 0 ? prev - 1 : MATTRESS_LAYERS.length - 1));
  }, []);

  const handleNextLayer = useCallback(() => {
    setSelectedLayerIndex((prev) => (prev < MATTRESS_LAYERS.length - 1 ? prev + 1 : 0));
  }, []);

  const activeLayer = MATTRESS_LAYERS[selectedLayerIndex] || MATTRESS_LAYERS[0];

  return (
    <section
      id="interactive-3d-experience"
      className="relative w-full bg-[#071912] text-[#F8FAFC] overflow-hidden select-none border-t border-[#103828]"
      aria-label="Mindfree Ultra-Realistic Interactive 3D Mattress Experience"
    >
      {/* 1. PHOTOREALISTIC LUXURY BEDROOM BACKGROUND ENVIRONMENT */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/mindfree/3d-bedroom-bg.webp"
          alt="Mindfree Luxury Master Bedroom"
          className="w-full h-full object-cover object-center opacity-30 filter blur-xs scale-105"
        />
        {/* Cinematic dark evergreen vignette & gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06150F]/95 via-[#0A2218]/80 to-[#06150F]/95" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#06150F]/50 to-[#040E0A]/95" />

        {/* Ambient warm lamp light glow simulations */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E3262E]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#0A2E73]/20 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16 flex flex-col justify-between">
        {/* TOP STATUS / INTRO BAR */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E3262E] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#E3262E] font-semibold">
              Mindfree 3D Engineering Lab
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#F8FAFC]/60 font-mono">
            <span className="hidden sm:inline">King Size · 182 x 198 x 36 cm</span>
            <span className="hidden sm:inline">|</span>
            <span className="text-[#E3262E] font-semibold">7 Physical Zones</span>
          </div>
        </div>

        {/* 3. HERO COMPOSITION (Left Editorial, Center 3D Mattress, Right Detail Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 xl:gap-8 items-center mb-10">
          {/* LEFT: EDITORIAL CONTENT (3 cols) */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col z-20">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E3262E]">
                EXPLORE THE INSIDE STORY
              </span>
              <span className="w-8 h-px bg-[#E3262E]/40" />
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-[#F8FAFC] leading-[1.12] mb-5 tracking-tight">
              Not Just <br />
              a Mattress. <br />
              <span className="italic text-[#E3262E] font-serif font-normal">
                A New Way <br />
                to Sleep.
              </span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-[#F8FAFC]/75 leading-relaxed mb-7 font-sans">
              Discover the carefully crafted layers that work together to give you exceptional comfort, support, and more restorative sleep.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-6">
              <button
                onClick={() => handleToggleExplode(!isExploded)}
                className="px-6 py-3.5 rounded-full bg-[#E3262E] hover:bg-[#d69f4f] text-[#0C2A1E] font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-[0_10px_25px_rgba(189,139,67,0.35)] hover:shadow-[0_15px_30px_rgba(189,139,67,0.5)] flex items-center gap-2 cursor-pointer"
                aria-label="Explore each mattress layer"
              >
                <Layers className="w-4 h-4" />
                <span>{isExploded ? 'Close Layers' : 'Explore Each Layer →'}</span>
              </button>

              <button
                onClick={() => {
                  if (!isExploded) handleToggleExplode(true);
                  handleSelectLayer(0);
                }}
                className="px-5 py-3.5 rounded-full bg-white/8 hover:bg-white/15 text-[#F8FAFC] border border-white/15 hover:border-white/30 text-xs sm:text-sm font-medium tracking-wide transition-all flex items-center gap-2 cursor-pointer"
                aria-label="Watch how the mattress is made"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#E3262E]" />
                <span>Watch How It’s Made</span>
              </button>
            </div>

            {/* Interaction Hint */}
            <div className="flex items-center gap-3 pt-5 border-t border-white/10 text-xs text-[#F8FAFC]/60">
              <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E3262E]">
                <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
              </div>
              <span>
                {isExploded
                  ? 'Click any floating layer or hotspot to inspect materials'
                  : 'Click the mattress to physically open and reveal internal layers'}
              </span>
            </div>
          </div>

          {/* CENTER: INTERACTIVE 3D MATTRESS VIEWPORT (6 cols on XL, 5 cols on LG) */}
          <div className="lg:col-span-5 xl:col-span-6 relative h-[500px] sm:h-[560px] lg:h-[620px] w-full flex items-center justify-center">
            {/* 3D WebGL Canvas */}
            <div className="w-full h-full relative z-10">
              <Mattress3DCanvas
                isExploded={isExploded}
                selectedLayerIndex={selectedLayerIndex}
                onSelectLayer={handleSelectLayer}
                onToggleExplode={handleToggleExplode}
                onProjectHotspots={setHotspotPositions}
              />

              {/* 3D Hotspots Overlay */}
              <MaterialHotspotsOverlay
                hotspots={hotspotPositions}
                selectedLayerIndex={selectedLayerIndex}
                onSelectLayer={handleSelectLayer}
                isExploded={isExploded}
              />
            </div>

            {/* Quick Floating Hint Pill */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-sans tracking-wide text-[#F8FAFC]/90 flex items-center gap-2 shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E3262E]" />
                <span>
                  {isExploded ? 'Exploded Anatomy Active' : 'Click Mattress to Open Layers'}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: FLOATING MATERIAL INFORMATION PANEL (3 cols) */}
          <div className="lg:col-span-3 xl:col-span-3 flex justify-center lg:justify-end z-20">
            <MaterialDetailPanel
              layer={activeLayer}
              totalLayers={MATTRESS_LAYERS.length}
              onPrev={handlePrevLayer}
              onNext={handleNextLayer}
              onClose={() => setIsDetailPanelOpen(false)}
              isOpen={isDetailPanelOpen}
            />

            {!isDetailPanelOpen && (
              <button
                onClick={() => setIsDetailPanelOpen(true)}
                className="px-4 py-2.5 rounded-full bg-[#092218]/90 border border-[#E3262E]/50 text-xs font-semibold text-[#E3262E] flex items-center gap-2 shadow-xl hover:bg-[#E3262E] hover:text-[#0C2A1E] transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Show Material Specs</span>
              </button>
            )}
          </div>
        </div>

        {/* 4. BOTTOM MATERIAL SELECTOR THUMBNAILS */}
        <div className="mt-8 pt-6 border-t border-white/10 z-20">
          <MaterialThumbnailNavigation
            selectedLayerIndex={selectedLayerIndex}
            onSelectLayer={handleSelectLayer}
            isExploded={isExploded}
            onToggleExplode={handleToggleExplode}
          />
        </div>
      </div>
    </section>
  );
};
