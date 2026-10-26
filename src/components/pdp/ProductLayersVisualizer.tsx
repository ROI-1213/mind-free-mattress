import React, { useState } from 'react';
import { Layers, Sparkles } from 'lucide-react';
import { type ProductLayerSpec } from '../../data/pdpData';

interface ProductLayersVisualizerProps {
  layers: ProductLayerSpec[];
  productName: string;
}

export const ProductLayersVisualizer: React.FC<ProductLayersVisualizerProps> = ({
  layers,
  productName,
}) => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
  const activeLayer = layers[selectedLayerIndex] || layers[0];

  return (
    <section className="w-full py-16 sm:py-20 bg-white border-t border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-[#E3262E]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E3262E]">
              INTERNAL ARCHITECTURE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#071F52] tracking-tight mb-3">
            Exploded Layer Engineering
          </h2>
          <p className="text-sm sm:text-base text-[#55645D]">
            Explore the multi-tier physical construction inside the {productName}. Click on any tier to inspect its technical density and sleep function.
          </p>
        </div>

        {/* Interactive Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Layer Selector List (Col 1-5) */}
          <div className="lg:col-span-5 space-y-3">
            {layers.map((layer, idx) => {
              const isSelected = selectedLayerIndex === idx;
              return (
                <button
                  key={layer.number}
                  type="button"
                  onClick={() => setSelectedLayerIndex(idx)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-[#0A2E73] bg-[#0A2E73] text-[#F8FAFC] shadow-md ring-2 ring-[#E3262E]/40'
                      : 'border-[#E2E8F0] bg-[#F8FAFC]/60 hover:bg-white text-[#071F52] hover:border-[#E3262E]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-1 rounded-md ${
                        isSelected ? 'bg-white/15 text-[#E3262E]' : 'bg-[#DBEAFE] text-[#0A2E73]'
                      }`}
                    >
                      {layer.number}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold">{layer.name}</div>
                      <div
                        className={`text-[11px] mt-0.5 ${
                          isSelected ? 'text-[#F8FAFC]/80' : 'text-[#64748B]'
                        }`}
                      >
                        {layer.thickness} • {layer.density}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-[#E3262E]' : 'text-[#94A3B8]'
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Active Layer Detail Showcase (Col 6-12) */}
          <div className="lg:col-span-7 bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E2E8F0] shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              {/* Layer Texture Image (5 cols) */}
              <div className="sm:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-[#E3DDD1] shadow-md bg-white">
                <img
                  src={activeLayer.image}
                  alt={activeLayer.name}
                  className="w-full h-full object-cover object-center animate-in fade-in duration-300"
                  key={activeLayer.image}
                />
                <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                  Texture Preview
                </div>
              </div>

              {/* Layer Description & Specs (7 cols) */}
              <div className="sm:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-2 text-[#E3262E] text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Layer {activeLayer.number} Breakdown</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#071F52] mb-3">
                  {activeLayer.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#55645D] leading-relaxed mb-6">
                  {activeLayer.description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E2E8F0]">
                  <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]">
                    <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                      Thickness
                    </div>
                    <div className="text-sm font-bold text-[#0A2E73] mt-0.5">
                      {activeLayer.thickness}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]">
                    <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                      Density Rating
                    </div>
                    <div className="text-sm font-bold text-[#0A2E73] mt-0.5">
                      {activeLayer.density}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
