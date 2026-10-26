import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Check,
  ArrowRight,
  Layers,
  Info,
  X,
  ChevronRight,
  Sliders,
  ShieldCheck,
  Wind,
  Activity,
} from 'lucide-react';
import {
  BED_VARIETIES,
  CONSTRUCTION_MATERIALS,
  type BedVarietyId,
  type BedVarietyItem,
  type ConstructionMaterialId,
} from '../../data/bedVarietiesAndMaterialsData';

interface BedVarietiesAndMaterialsSectionProps {
  /** Optional callback when user wants to jump to the configurator or catalogue */
  onExploreCatalogue?: () => void;
}

/**
 * Custom SVG Cross-Section Diagram for each of the 3 Bed Varieties
 * Visually illustrates Normal Bed (Tight Top), Pillow Top Bed (Cushioned Crown with Gusset Indent),
 * and Euro Top Bed (Integrated Edge-to-Edge Flush Top Layer).
 */
const BedVarietyProfileSVG: React.FC<{
  varietyId: BedVarietyId;
  isActive?: boolean;
}> = ({ varietyId, isActive = false }) => {
  const strokeMain = isActive ? '#0A2E73' : '#0F2952';
  const goldAccent = '#E3262E';

  return (
    <svg
      viewBox="0 0 260 92"
      className="w-full h-full"
      role="img"
      aria-label={`${varietyId.replace(/-/g, ' ')} side profile cross-section`}
    >
      <defs>
        <linearGradient id={`baseGrad-${varietyId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F2EDE2" />
        </linearGradient>
        <linearGradient id={`topGrad-${varietyId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EFECE4" />
        </linearGradient>
      </defs>

      {/* Wooden Platform Base Shadow */}
      <rect x="16" y="76" width="228" height="6" rx="3" fill="#D8D0C2" opacity="0.65" />

      {varietyId === 'normal-bed' && (
        <g>
          {/* Main Classic Tight-Top Body */}
          <rect
            x="22"
            y="26"
            width="216"
            height="50"
            rx="8"
            fill={`url(#baseGrad-${varietyId})`}
            stroke={strokeMain}
            strokeWidth="1.6"
          />
          {/* Subtle Quilted Crown Waves */}
          <path
            d="M 30 26 Q 55 21 80 26 Q 105 21 130 26 Q 155 21 180 26 Q 205 21 230 26"
            fill="none"
            stroke={goldAccent}
            strokeWidth="1.5"
          />
          {/* Top Piping Seam */}
          <line x1="23" y1="33" x2="237" y2="33" stroke={goldAccent} strokeWidth="1.2" strokeDasharray="3 2" />
          {/* Internal Support Lines */}
          <line x1="34" y1="52" x2="226" y2="52" stroke="#D5CFC2" strokeWidth="1" />
          {/* Label Pill */}
          <text x="130" y="67" textAnchor="middle" fill="#0A2E73" fontSize="8.5" fontWeight="600" letterSpacing="0.08em">
            CLASSIC TIGHT-TOP SURFACE
          </text>
        </g>
      )}

      {varietyId === 'pillow-top-bed' && (
        <g>
          {/* Lower Support Core */}
          <rect
            x="22"
            y="36"
            width="216"
            height="40"
            rx="7"
            fill={`url(#baseGrad-${varietyId})`}
            stroke={strokeMain}
            strokeWidth="1.6"
          />
          {/* Indented Gusset Shadow */}
          <rect x="28" y="33" width="204" height="4" rx="2" fill="#0A2E73" opacity="0.18" />
          {/* Attached Cushioned Pillow Top Layer (Slightly Inset for Authentic Pillow-Top Silhouette) */}
          <rect
            x="25"
            y="16"
            width="210"
            height="19"
            rx="9"
            fill={`url(#topGrad-${varietyId})`}
            stroke={goldAccent}
            strokeWidth="1.8"
          />
          {/* Plush Tufting Curves */}
          <path
            d="M 36 16 Q 60 11 84 16 Q 108 11 132 16 Q 156 11 180 16 Q 204 11 224 16"
            fill="none"
            stroke={goldAccent}
            strokeWidth="1.3"
          />
          <text x="130" y="28.5" textAnchor="middle" fill="#0F62C8" fontSize="7.5" fontWeight="700" letterSpacing="0.08em">
            + CUSHIONED PILLOW LAYER
          </text>
          <text x="130" y="61" textAnchor="middle" fill="#0A2E73" fontSize="8.5" fontWeight="600" letterSpacing="0.08em">
            SUPPORTIVE MATTRESS CORE
          </text>
        </g>
      )}

      {varietyId === 'euro-top-bed' && (
        <g>
          {/* Full-Height Flush Outer Architecture */}
          <rect
            x="22"
            y="14"
            width="216"
            height="62"
            rx="7"
            fill={`url(#baseGrad-${varietyId})`}
            stroke={strokeMain}
            strokeWidth="1.7"
          />
          {/* Integrated Edge-to-Edge Euro Top Panel (Flush with Side Walls) */}
          <path
            d="M 22 21 Q 22 14 29 14 L 231 14 Q 238 14 238 21 L 238 36 L 22 36 Z"
            fill="#EFF6FF"
            stroke="#0A2E73"
            strokeWidth="1.6"
          />
          {/* Forest & Gold Piping Band */}
          <line x1="22" y1="36" x2="238" y2="36" stroke={goldAccent} strokeWidth="2.2" />
          {/* Flush Edge Indicators */}
          <circle cx="22" cy="25" r="2.5" fill={goldAccent} />
          <circle cx="238" cy="25" r="2.5" fill={goldAccent} />
          <text x="130" y="28" textAnchor="middle" fill="#0A2E73" fontSize="7.5" fontWeight="700" letterSpacing="0.08em">
            INTEGRATED EDGE-TO-EDGE EURO LAYER
          </text>
          <text x="130" y="60" textAnchor="middle" fill="#0A2E73" fontSize="8.5" fontWeight="600" letterSpacing="0.08em">
            STRUCTURAL SUPPORT CORE
          </text>
        </g>
      )}
    </svg>
  );
};

export const BedVarietiesAndMaterialsSection: React.FC<BedVarietiesAndMaterialsSectionProps> = ({
  onExploreCatalogue,
}) => {
  // Active "Learn More" bed variety state (defaults to null, opens interactive detail drawer/panel when clicked)
  const [selectedVariety, setSelectedVariety] = useState<BedVarietyItem | null>(null);

  // Interactive Layer Explorer state
  const [activeExplorerVarietyId, setActiveExplorerVarietyId] = useState<BedVarietyId>('euro-top-bed');
  const [activeMaterialId, setActiveMaterialId] = useState<ConstructionMaterialId>('spring');
  const [isExplodedView, setIsExplodedView] = useState<boolean>(true);

  // Scroll-reveal visibility states
  const varietiesRef = useRef<HTMLDivElement>(null);
  const materialsRef = useRef<HTMLDivElement>(null);
  const explorerRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const [varietiesVisible, setVarietiesVisible] = useState(true);
  const [materialsVisible, setMaterialsVisible] = useState(true);
  const [explorerVisible, setExplorerVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === varietiesRef.current) setVarietiesVisible(true);
            if (entry.target === materialsRef.current) setMaterialsVisible(true);
            if (entry.target === explorerRef.current) setExplorerVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (varietiesRef.current) observer.observe(varietiesRef.current);
    if (materialsRef.current) observer.observe(materialsRef.current);
    if (explorerRef.current) observer.observe(explorerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleLearnMoreVariety = (variety: BedVarietyItem) => {
    setSelectedVariety(variety);
    setActiveExplorerVarietyId(variety.id);
    setTimeout(() => {
      detailPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
  };

  const handleInspectMaterialInExplorer = (materialId: ConstructionMaterialId) => {
    setActiveMaterialId(materialId);
    explorerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleJumpToSelector = () => {
    const selectorEl = document.getElementById('mattress-selector');
    if (selectorEl) {
      selectorEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onExploreCatalogue) {
      onExploreCatalogue();
    }
  };

  const activeExplorerVariety =
    BED_VARIETIES.find((v) => v.id === activeExplorerVarietyId) || BED_VARIETIES[2];
  const activeExplorerMaterial =
    CONSTRUCTION_MATERIALS.find((m) => m.id === activeMaterialId) || CONSTRUCTION_MATERIALS[0];

  return (
    <div className="w-full bg-[#F8FAFC] text-[#0A2540] relative overflow-hidden">
      {/* ===================================================================== */}
      {/* SECTION 1: EXPLORE OUR BED VARIETIES                                  */}
      {/* ===================================================================== */}
      <section
        id="bed-varieties"
        ref={varietiesRef}
        aria-labelledby="bed-varieties-heading"
        className="relative py-16 sm:py-20 lg:py-24 border-t border-[#E2E8F0]"
      >
        {/* Ambient Luxury Glows */}
        <div className="absolute top-12 -left-36 w-96 h-96 bg-[#E3262E]/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 -right-36 w-96 h-96 bg-[#0A2E73]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Editorial Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#0A2E73]">
                  ARCHITECTURAL COMFORT PROFILES
                </span>
                <span className="w-8 h-px bg-[#E3262E]/50" />
              </div>

              <h2
                id="bed-varieties-heading"
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal leading-[1.12] tracking-tight text-[#0A2540]"
              >
                Discover Our Bed Varieties
              </h2>

              <p className="mt-3.5 text-sm sm:text-base text-[#55635C] leading-relaxed max-w-xl">
                Thoughtfully designed for exceptional comfort, support, and better sleep.
              </p>
            </div>

            {/* Quick Interactive Overview Pill */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {BED_VARIETIES.map((v) => {
                const isSelected = selectedVariety?.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleLearnMoreVariety(v)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#0A2E73] text-[#F8FAFC] border-[#0A2E73] shadow-sm'
                        : 'bg-white text-[#0A2540] border-[#E5E0D5] hover:border-[#E3262E]'
                    }`}
                  >
                    {v.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3-Column Responsive Bed Varieties Product Cards */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-8 transition-all duration-700 ${
              varietiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {BED_VARIETIES.map((variety) => {
              const isInspecting = selectedVariety?.id === variety.id;

              return (
                <article
                  key={variety.id}
                  className={`group bg-white rounded-[28px] border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isInspecting
                      ? 'border-[#E3262E] ring-2 ring-[#E3262E]/30 shadow-[0_24px_54px_rgba(10,46,115,0.12)] -translate-y-1.5'
                      : 'border-[#E2E8F0] hover:border-[#E3262E]/60 shadow-[0_10px_30px_rgba(10,46,115,0.05)] hover:shadow-[0_24px_50px_rgba(10,46,115,0.1)] hover:-translate-y-1.5'
                  }`}
                >
                  <div>
                    {/* Visual Image Container */}
                    <div className="relative h-64 sm:h-72 w-full bg-[#F4F1EA] overflow-hidden">
                      <img
                        src={variety.image}
                        alt={`${variety.name} — ${variety.tagline}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Subtle Dark Gradient Overlay for Badge Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071F52]/65 via-transparent to-black/15 pointer-events-none" />

                      {/* Top Left Number & Variety Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#0A2E73] text-[#F8FAFC] font-mono text-xs font-bold flex items-center justify-center shadow-sm border border-white/15">
                          {variety.number}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/92 backdrop-blur-md text-[#0A2E73] text-[10.5px] font-bold tracking-wider uppercase shadow-xs">
                          {variety.badge}
                        </span>
                      </div>

                      {/* Top Right Height Spec Pill */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-[#071F52]/80 backdrop-blur-md text-[#F8FAFC] border border-white/15 text-[11px] font-mono">
                          {variety.profileHeight}
                        </span>
                      </div>

                      {/* Bottom Image Caption Overlay */}
                      <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#DBEAFE]/90 block">
                            SURFACE PROFILE
                          </span>
                          <span className="text-xs font-medium text-white">
                            {variety.surfaceConstruction}
                          </span>
                        </div>
                        <div className="w-11 h-9 rounded-lg bg-white/95 p-1 border border-[#E5E0D5] shadow-sm shrink-0">
                          <img
                            src={variety.diagramImage}
                            alt={`${variety.name} corner detail`}
                            loading="lazy"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7">
                      {/* Cross-Sectional Silhouette Illustration */}
                      <div className="mb-5 p-3 rounded-2xl bg-[#F8FAFC] border border-[#EAE5DC]">
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#64748B] mb-1 px-1">
                          <span>Architectural Cross-Section</span>
                          <span className="text-[#0A2E73] font-semibold">{variety.firmnessFeel}</span>
                        </div>
                        <div className="h-[68px] w-full">
                          <BedVarietyProfileSVG
                            varietyId={variety.id}
                            isActive={isInspecting}
                          />
                        </div>
                      </div>

                      {/* Variety Heading & Subtitle */}
                      <div className="mb-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E3262E] block mb-1">
                          {variety.tagline}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-[#071F52] group-hover:text-[#0A2E73] transition-colors">
                          {variety.name}
                        </h3>
                      </div>

                      {/* Required Key Bullet Points */}
                      <ul className="space-y-2.5 mb-6" aria-label={`${variety.name} highlights`}>
                        {variety.bullets.map((point, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-[#0F2952] leading-relaxed"
                          >
                            <span className="w-5 h-5 rounded-full bg-[#DBEAFE] text-[#0A2E73] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer & "Learn More" Action */}
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-4 border-t border-[#F0ECE2] flex items-center justify-between gap-3">
                    <div className="text-[11px] text-[#64748B]">
                      <span className="block font-mono uppercase text-[9.5px] tracking-wider text-[#88908B]">
                        EDGE DESIGN
                      </span>
                      <span className="font-medium text-[#0A2E73] line-clamp-1">
                        {variety.edgeProfile}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleLearnMoreVariety(variety)}
                      aria-expanded={isInspecting}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 shrink-0 cursor-pointer ${
                        isInspecting
                          ? 'bg-[#E3262E] text-white shadow-md'
                          : 'bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC] shadow-xs hover:shadow-md active:scale-95'
                      }`}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Expandable "Learn More" Architectural Detail Drawer */}
          <div ref={detailPanelRef} className="mt-8">
            {selectedVariety && (
              <div
                role="region"
                aria-label={`Detailed specifications for ${selectedVariety.name}`}
                className="bg-white rounded-[28px] border-2 border-[#E3262E]/60 shadow-[0_24px_60px_rgba(10,46,115,0.12)] p-6 sm:p-8 lg:p-10 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                  {/* Left Column: Detailed Description & Highlights */}
                  <div className="flex-1 space-y-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DBEAFE] text-[#0A2E73] text-[11px] font-bold uppercase tracking-wider">
                        <Info className="w-3.5 h-3.5 text-[#E3262E]" />
                        <span>Bed Variety Specification · {selectedVariety.name}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedVariety(null)}
                        aria-label="Close bed variety details"
                        className="p-2 rounded-full bg-[#F8FAFC] hover:bg-[#DBEAFE] text-[#0A2540] transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#071F52]">
                        {selectedVariety.name}{' '}
                        <span className="font-serif italic font-normal text-[#E3262E]">
                          — {selectedVariety.tagline}
                        </span>
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-[#55635C] leading-relaxed">
                        {selectedVariety.extendedDescription}
                      </p>
                    </div>

                    {/* 4 Architectural Highlight Boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {selectedVariety.architecturalHighlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]"
                        >
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block">
                            {item.label}
                          </span>
                          <span className="text-xs sm:text-[13px] font-semibold text-[#0A2E73] mt-0.5 block">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Recommended For */}
                    <div className="pt-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#0A2E73] font-bold mb-2.5">
                        Recommended Sleepers & Bedroom Styles:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedVariety.idealFor.map((ideal, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EFF6FF] border border-[#D5DFD3] text-xs text-[#0A2E73] font-medium"
                          >
                            <Check className="w-3.5 h-3.5 text-[#E3262E]" />
                            {ideal}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Side-by-Side & CTA */}
                  <div className="w-full lg:w-[400px] shrink-0 bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0] space-y-4">
                    <div className="rounded-xl overflow-hidden h-44 bg-white border border-[#E2E8F0]">
                      <img
                        src={selectedVariety.image}
                        alt={selectedVariety.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#64748B]">Available Core Materials:</span>
                        <span className="font-semibold text-[#0A2E73]">Model Dependent</span>
                      </div>
                      <p className="text-[11px] text-[#64748B] leading-relaxed">
                        Our {selectedVariety.name} silhouette can be paired with select core materials
                        (such as Spring, EP Foam, Rebound Foam, Memory Foam, or Latex) depending on the
                        specific mattress collection you choose.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={handleJumpToSelector}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sliders className="w-3.5 h-3.5 text-[#E3262E]" />
                        <span>Configure {selectedVariety.name}</span>
                      </button>
                      <a
                        href="#mattress-materials"
                        className="py-2.5 px-4 rounded-xl bg-white hover:bg-[#DBEAFE] text-[#0A2E73] border border-[#0A2E73]/30 text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>View Materials</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: MATERIALS WE USE                                           */}
      {/* ===================================================================== */}
      <section
        id="mattress-materials"
        ref={materialsRef}
        aria-labelledby="mattress-materials-heading"
        className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F4F1EA] via-[#F8FAFC] to-[#F8FAFC] border-t border-[#E5E0D5]"
      >
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Editorial Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-3">
                <Layers className="w-3.5 h-3.5 text-[#E3262E]" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#0A2E73]">
                  CRAFTED INSIDE OUT
                </span>
                <span className="w-8 h-px bg-[#E3262E]/50" />
              </div>

              <h2
                id="mattress-materials-heading"
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal leading-[1.12] tracking-tight text-[#0A2540]"
              >
                Premium Materials, Exceptional Comfort
              </h2>

              <p className="mt-3.5 text-sm sm:text-base text-[#55635C] leading-relaxed max-w-xl">
                Discover the carefully selected materials that go into creating our mattresses.
              </p>
            </div>

            {/* Transparent Specification Note */}
            <div className="bg-white/90 border border-[#E2E8F0] rounded-2xl px-4 py-3 max-w-md flex items-start gap-3 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#E3262E] shrink-0 mt-0.5" />
              <p className="text-[11.5px] text-[#55635C] leading-relaxed">
                <strong className="text-[#0A2E73] font-semibold">Tailored Formulations:</strong> Each
                Mindfree mattress model uses a specific combination of these materials engineered for its
                target comfort and support profile.
              </p>
            </div>
          </div>

          {/* 5-Card Responsive Luxury Grid (3 Top + 2 Bottom Centered on Desktop, or 5-col XL) */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-7 transition-all duration-700 ${
              materialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {CONSTRUCTION_MATERIALS.map((material, idx) => {
              const isSelectedInExplorer = activeMaterialId === material.id;
              // First 3 cards span 2 cols each (3 across on lg), bottom 2 cards span 3 cols each (2 across on lg)
              const colSpanClass = idx < 3 ? 'lg:col-span-2' : 'lg:col-span-3';

              return (
                <article
                  key={material.id}
                  className={`${colSpanClass} group bg-white rounded-[26px] border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isSelectedInExplorer
                      ? 'border-[#E3262E] shadow-[0_20px_45px_rgba(10,46,115,0.1)]'
                      : 'border-[#E2E8F0] hover:border-[#E3262E]/60 shadow-[0_8px_28px_rgba(10,46,115,0.04)] hover:shadow-[0_20px_45px_rgba(10,46,115,0.09)] hover:-translate-y-1'
                  }`}
                >
                  <div>
                    {/* Material Visual Header */}
                    <div className="relative h-52 sm:h-56 w-full bg-[#F8FAFC] overflow-hidden">
                      <img
                        src={material.image}
                        alt={`${material.name} mattress material`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071F52]/60 via-transparent to-black/10 pointer-events-none" />

                      {/* Material Number & Badge */}
                      <div className="absolute top-3.5 left-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#0A2E73] text-white font-mono text-[11px] font-bold flex items-center justify-center">
                          {material.number}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-white/92 backdrop-blur-md text-[#0A2E73] text-[10px] font-bold uppercase tracking-wider">
                          {material.badge}
                        </span>
                      </div>

                      {/* Macro Swatch Thumbnail */}
                      <div className="absolute bottom-3 right-3.5 w-12 h-10 rounded-xl overflow-hidden border-2 border-white shadow-md bg-white">
                        <img
                          src={material.thumbnail}
                          alt={`${material.name} texture swatch`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Placement Role Label */}
                      <div className="absolute bottom-3 left-4 right-18">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#DBEAFE] block">
                          TYPICAL FUNCTION
                        </span>
                        <span className="text-xs font-medium text-white truncate block">
                          {material.roleInMattress}
                        </span>
                      </div>
                    </div>

                    {/* Material Content */}
                    <div className="p-6">
                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <h3 className="font-serif text-2xl font-bold text-[#071F52] group-hover:text-[#0A2E73] transition-colors">
                          {material.name}
                        </h3>
                        <span className="text-[11px] font-mono text-[#E3262E] font-semibold">
                          {material.typicalPlacement}
                        </span>
                      </div>

                      {/* Exact Required Material Description */}
                      <p className="text-sm font-medium text-[#0A2540] leading-relaxed mb-2.5">
                        {material.description}
                      </p>

                      {/* Supporting Architectural Context */}
                      <p className="text-xs text-[#69756F] leading-relaxed mb-5">
                        {material.extendedNote}
                      </p>

                      {/* 3 Property Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {material.keyProperties.map((prop, pIdx) => (
                          <span
                            key={pIdx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-medium text-[#0F2952]"
                          >
                            <Check className="w-3 h-3 text-[#E3262E]" />
                            {prop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action to Inspect in Layer Diagram */}
                  <div className="px-6 pb-5 pt-3.5 border-t border-[#F2EFE9] flex items-center justify-between">
                    <span className="text-[11px] text-[#64748B]">
                      Material #{material.number} of 05
                    </span>
                    <button
                      type="button"
                      onClick={() => handleInspectMaterialInExplorer(material.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A2E73] hover:text-[#E3262E] transition-colors cursor-pointer"
                    >
                      <span>See in Layer Illustration</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ===================================================================== */}
          {/* ADDITIONAL FEATURE: INTERACTIVE MATTRESS LAYER CONSTRUCTION EXPLORER  */}
          {/* ===================================================================== */}
          <div
            id="interactive-layer-explorer"
            ref={explorerRef}
            className={`mt-16 sm:mt-20 rounded-[32px] bg-[#0A2E73] text-[#F8FAFC] p-6 sm:p-10 lg:p-12 border border-[#1244A8] shadow-[0_24px_64px_rgba(16,39,31,0.22)] relative overflow-hidden transition-all duration-700 ${
              explorerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Ambient Gold & Forest Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E3262E]/12 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#1244A8]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header Row */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10.5px] font-mono uppercase tracking-[0.2em] text-[#E3262E] mb-3">
                    <Layers className="w-3.5 h-3.5 text-[#E3262E]" />
                    <span>Interactive Mattress Construction Visualizer</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-tight">
                    How Bed Varieties &{' '}
                    <span className="italic text-[#E3262E]">Materials Come Together</span>
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-[#D1DDD3] leading-relaxed">
                    Select any of our 3 bed varieties and 5 construction materials below to explore how
                    top surface designs and internal comfort or support layers work in harmony.
                  </p>
                </div>

                {/* Exploded / Compact Toggle */}
                <div className="flex items-center gap-2 self-start lg:self-end bg-white/8 p-1.5 rounded-full border border-white/15">
                  <button
                    type="button"
                    onClick={() => setIsExplodedView(true)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isExplodedView
                        ? 'bg-[#E3262E] text-white shadow-xs'
                        : 'text-[#D1DDD3] hover:text-white'
                    }`}
                  >
                    Exploded Layer View
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsExplodedView(false)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      !isExplodedView
                        ? 'bg-[#E3262E] text-white shadow-xs'
                        : 'text-[#D1DDD3] hover:text-white'
                    }`}
                  >
                    Assembled Profile
                  </button>
                </div>
              </div>

              {/* Main 12-Col Interactive Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left Controls: Step 1 (Bed Variety) & Step 2 (Material Highlight) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Control Group 1: Bed Variety Top Profile */}
                  <div className="bg-white/6 rounded-2xl p-4 sm:p-5 border border-white/12">
                    <span className="text-[10.5px] font-mono uppercase tracking-widest text-[#E3262E] block mb-2.5">
                      1. Select Bed Variety (Top Surface Profile)
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {BED_VARIETIES.map((v) => {
                        const active = activeExplorerVarietyId === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setActiveExplorerVarietyId(v.id)}
                            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                              active
                                ? 'bg-white text-[#0A2E73] border-[#E3262E] shadow-md'
                                : 'bg-white/5 text-white/85 border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <span className="text-xs font-bold block truncate">{v.name}</span>
                            <span
                              className={`text-[10px] block mt-0.5 truncate ${
                                active ? 'text-[#55635C]' : 'text-white/60'
                              }`}
                            >
                              {v.profileHeight}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Control Group 2: Inspect Material Layer */}
                  <div className="bg-white/6 rounded-2xl p-4 sm:p-5 border border-white/12">
                    <span className="text-[10.5px] font-mono uppercase tracking-widest text-[#E3262E] block mb-2.5">
                      2. Inspect Material Role in Construction
                    </span>
                    <div className="space-y-2">
                      {CONSTRUCTION_MATERIALS.map((m) => {
                        const active = activeMaterialId === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setActiveMaterialId(m.id)}
                            className={`w-full p-3 rounded-xl text-left border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                              active
                                ? 'bg-white text-[#0A2E73] border-[#E3262E] shadow-md'
                                : 'bg-white/5 text-white/85 border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={m.thumbnail}
                                alt={m.name}
                                className="w-9 h-7 rounded-md object-cover border border-black/10 shrink-0 bg-white"
                              />
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold">{m.name}</span>
                                  <span
                                    className={`text-[9.5px] px-2 py-0.5 rounded-full font-semibold ${
                                      active
                                        ? 'bg-[#DBEAFE] text-[#0A2E73]'
                                        : 'bg-white/10 text-[#E3262E]'
                                    }`}
                                  >
                                    {m.typicalPlacement}
                                  </span>
                                </div>
                                <p
                                  className={`text-[11px] truncate mt-0.5 ${
                                    active ? 'text-[#55635C]' : 'text-white/65'
                                  }`}
                                >
                                  {m.description}
                                </p>
                              </div>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 shrink-0 transition-transform ${
                                active ? 'text-[#E3262E] translate-x-0.5' : 'text-white/40'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Interactive Layered Cutaway Diagram & Live Details */}
                <div className="lg:col-span-7 flex flex-col justify-between bg-[#071F52] rounded-3xl p-5 sm:p-7 border border-white/12">
                  {/* Top Active Configuration Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#E3262E] block">
                        ACTIVE ILLUSTRATION
                      </span>
                      <h4 className="font-serif text-lg sm:text-xl text-white">
                        {activeExplorerVariety.name} + {activeExplorerMaterial.name} Layer Focus
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono text-[#DBEAFE]">
                      Profile: {activeExplorerVariety.profileHeight}
                    </span>
                  </div>

                  {/* Interactive Stack Visualization */}
                  <div className="my-6 py-4 px-2 sm:px-6 flex flex-col items-center justify-center min-h-[260px]">
                    {/* TOP LAYER: Selected Bed Variety Crown */}
                    <div
                      className={`w-full max-w-lg rounded-t-2xl rounded-b-lg border-2 border-[#E3262E] bg-gradient-to-r from-[#F8FAFC] via-white to-[#F3EFE6] text-[#0A2E73] p-3.5 shadow-lg transition-all duration-500 ${
                        isExplodedView ? 'mb-3.5' : 'mb-0.5'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded bg-[#0A2E73] text-white font-mono text-[10px] font-bold">
                            TOP DESIGN
                          </span>
                          <span className="font-serif font-bold text-sm sm:text-base">
                            {activeExplorerVariety.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-[#0F62C8]">
                          {activeExplorerVariety.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#55635C] mt-1">
                        {activeExplorerVariety.bullets[0]}
                      </p>
                    </div>

                    {/* COMFORT / PRESSURE-RELIEF ZONE (Latex or Memory Foam) */}
                    <div
                      onClick={() =>
                        setActiveMaterialId(
                          activeMaterialId === 'latex' ? 'memory-foam' : 'latex'
                        )
                      }
                      className={`w-full max-w-lg rounded-lg border p-3 transition-all duration-500 cursor-pointer ${
                        isExplodedView ? 'mb-3.5' : 'mb-0.5'
                      } ${
                        activeMaterialId === 'latex' || activeMaterialId === 'memory-foam'
                          ? 'bg-[#EDE7DC] text-[#071F52] border-[#E3262E] ring-2 ring-[#E3262E]/50 scale-[1.02] shadow-lg'
                          : 'bg-white/10 text-white/85 border-white/20 hover:bg-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold flex items-center gap-2">
                          <Wind className="w-3.5 h-3.5 text-[#E3262E]" />
                          Comfort Layer (Memory Foam / Latex)
                        </span>
                        <span className="text-[10px] font-mono uppercase opacity-80">
                          {activeMaterialId === 'latex'
                            ? 'Highlighting: Latex'
                            : activeMaterialId === 'memory-foam'
                            ? 'Highlighting: Memory Foam'
                            : 'Click to inspect'}
                        </span>
                      </div>
                    </div>

                    {/* TRANSITION / CUSHIONING ZONE (EP Foam or Rebound Foam) */}
                    <div
                      onClick={() =>
                        setActiveMaterialId(
                          activeMaterialId === 'ep-foam' ? 'rebound-foam' : 'ep-foam'
                        )
                      }
                      className={`w-full max-w-lg rounded-lg border p-3 transition-all duration-500 cursor-pointer ${
                        isExplodedView ? 'mb-3.5' : 'mb-0.5'
                      } ${
                        activeMaterialId === 'ep-foam' || activeMaterialId === 'rebound-foam'
                          ? 'bg-[#E8ECE6] text-[#071F52] border-[#E3262E] ring-2 ring-[#E3262E]/50 scale-[1.02] shadow-lg'
                          : 'bg-white/10 text-white/85 border-white/20 hover:bg-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-[#E3262E]" />
                          Support & Transition Layer (EP Foam / Rebound Foam)
                        </span>
                        <span className="text-[10px] font-mono uppercase opacity-80">
                          {activeMaterialId === 'ep-foam'
                            ? 'Highlighting: EP Foam'
                            : activeMaterialId === 'rebound-foam'
                            ? 'Highlighting: Rebound Foam'
                            : 'Click to inspect'}
                        </span>
                      </div>
                    </div>

                    {/* STRUCTURAL CORE ZONE (Spring) */}
                    <div
                      onClick={() => setActiveMaterialId('spring')}
                      className={`w-full max-w-lg rounded-b-2xl rounded-t-lg border p-3.5 transition-all duration-500 cursor-pointer ${
                        activeMaterialId === 'spring'
                          ? 'bg-[#E5E8EA] text-[#071F52] border-[#E3262E] ring-2 ring-[#E3262E]/50 scale-[1.02] shadow-lg'
                          : 'bg-white/10 text-white/85 border-white/20 hover:bg-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-[#E3262E]" />
                          Structural Core Foundation (Spring System / High-Density Base)
                        </span>
                        <span className="text-[10px] font-mono uppercase opacity-80">
                          {activeMaterialId === 'spring'
                            ? 'Highlighting: Spring'
                            : 'Click to inspect'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Active Material Detail Spotlight Card */}
                  <div className="bg-white/8 rounded-2xl p-4 sm:p-5 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={activeExplorerMaterial.image}
                        alt={activeExplorerMaterial.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#E3262E]/50 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#E3262E]">
                            SELECTED MATERIAL
                          </span>
                          <span className="text-xs font-bold text-white">
                            · {activeExplorerMaterial.name}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-white font-medium mt-0.5">
                          {activeExplorerMaterial.description}
                        </p>
                        <p className="text-[11px] text-[#D1DDD3] mt-1">
                          Note: Individual mattress models combine selected materials based on their specific design.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleJumpToSelector}
                      className="px-4 py-2.5 rounded-xl bg-[#E3262E] hover:bg-[#A88242] text-white text-xs font-semibold tracking-wide transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Build Your Mattress</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
