import React, { useState } from 'react';
import { Layers, Sliders, CheckCircle2 } from 'lucide-react';

export const ReferenceComparison: React.FC = () => {
  const [showReference, setShowReference] = useState(false);
  const [referenceType, setReferenceType] = useState<'hero' | 'navbar'>('hero');
  const [opacity, setOpacity] = useState(50);
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="hidden sm:block fixed bottom-4 right-4 z-50 select-none">
      <div className="bg-white/95 backdrop-blur-md border border-[#E0DCD3] rounded-2xl shadow-[0_12px_40px_rgba(10,46,115,0.15)] p-3.5 transition-all duration-200 min-w-[280px]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0A2E73] animate-pulse" />
            <span className="text-xs font-serif font-bold text-[#0A2E73]">Hero & Navbar Inspector</span>
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-[11px] text-[#747A78] hover:text-[#0A2E73] underline font-medium"
          >
            {isCollapsed ? 'Inspect' : 'Minimize'}
          </button>
        </div>

        {!isCollapsed && (
          <div className="mt-3 pt-3 border-t border-[#E2E8F0] space-y-3">
            {/* Toggle Reference Image Overlay */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-xs font-medium text-[#0A2540] cursor-pointer">
                <input
                  type="checkbox"
                  checked={showReference}
                  onChange={(e) => setShowReference(e.target.checked)}
                  className="rounded text-[#0A2E73] focus:ring-[#E3262E]"
                />
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#E3262E]" />
                  Overlay Reference
                </span>
              </label>

              {showReference && (
                <div className="space-y-2 pl-5">
                  <div className="flex items-center gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setReferenceType('hero')}
                      className={`px-2 py-0.5 rounded-full border text-[10.5px] ${
                        referenceType === 'hero'
                          ? 'bg-[#0A2E73] text-white border-[#0A2E73]'
                          : 'bg-[#F8FAFC] text-[#0A2540] border-[#E2E8F0]'
                      }`}
                    >
                      Hero Reference
                    </button>
                    <button
                      type="button"
                      onClick={() => setReferenceType('navbar')}
                      className={`px-2 py-0.5 rounded-full border text-[10.5px] ${
                        referenceType === 'navbar'
                          ? 'bg-[#0A2E73] text-white border-[#0A2E73]'
                          : 'bg-[#F8FAFC] text-[#0A2540] border-[#E2E8F0]'
                      }`}
                    >
                      Navbar Reference
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#747A78]">
                    <Sliders className="w-3 h-3" />
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={opacity}
                      onChange={(e) => setOpacity(Number(e.target.value))}
                      className="w-20 accent-[#0A2E73] h-1"
                    />
                    <span className="text-[10px] w-6">{opacity}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Checklist */}
            <div className="space-y-1 text-[10.5px] text-[#44524A] bg-[#F8FAFC] p-2 rounded-xl border border-[#E2E8F0]">
              <div className="flex items-center gap-1 text-[#0A2E73] font-medium">
                <CheckCircle2 className="w-3 h-3 text-[#E3262E]" />
                <span>Cinematic 3-Slide Carousel</span>
              </div>
              <div className="flex items-center gap-1 text-[#0A2E73] font-medium">
                <CheckCircle2 className="w-3 h-3 text-[#E3262E]" />
                <span>Original Gemini 8K Imagery</span>
              </div>
              <div className="flex items-center gap-1 text-[#0A2E73] font-medium">
                <CheckCircle2 className="w-3 h-3 text-[#E3262E]" />
                <span>Floating 5-Material Strip</span>
              </div>
              <div className="flex items-center gap-1 text-[#0A2E73] font-medium">
                <CheckCircle2 className="w-3 h-3 text-[#E3262E]" />
                <span>4 Factual Value Indicators</span>
              </div>
              <div className="flex items-center gap-1 text-[#0A2E73] font-medium">
                <CheckCircle2 className="w-3 h-3 text-[#E3262E]" />
                <span>Interactive Scene Thumbnails</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actual Reference Image Overlay */}
      {showReference && (
        <div
          className="fixed top-0 left-0 right-0 pointer-events-none z-50 transition-opacity"
          style={{ opacity: opacity / 100 }}
        >
          <div className="max-w-[1920px] mx-auto">
            <img
              src={
                referenceType === 'hero'
                  ? '/images/hero_reference_overlay.jpg'
                  : '/images/original_reference.png'
              }
              alt="Reference Overlay"
              className="w-full h-auto object-contain shadow-2xl border-2 border-emerald-500/50"
            />
          </div>
        </div>
      )}
    </div>
  );
};
