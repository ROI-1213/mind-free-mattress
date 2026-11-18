import React from 'react';
import { type HeroSlideData } from '../../data/heroData';

interface HeroSlideProps {
  slide: HeroSlideData;
  isActive: boolean;
  parallaxOffset: { x: number; y: number };
}

export const HeroSlide: React.FC<HeroSlideProps> = ({
  slide,
  isActive,
  parallaxOffset,
}) => {
  const isLayersSlide = slide.id === 'thoughtful-layers';

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
      }`}
      aria-hidden={!isActive}
    >
      {/* Full-Bleed Background Photograph Container */}
      <div
        className="absolute inset-0 overflow-hidden transform-gpu will-change-transform bg-[#EDF4FC]"
        style={{
          transform: `translate3d(${parallaxOffset.x * 0.2}px, ${parallaxOffset.y * 0.2}px, 0)`,
        }}
      >
        {isLayersSlide ? (
          <div className="relative w-full h-full bg-gradient-to-r from-[#EBF3FD] via-[#F5F9FF] to-[#E6F0FC]">
            <img
              src={slide.imageJpg}
              alt={slide.altText}
              className={`w-full lg:w-[82%] h-full ${
                slide.imageJpg?.startsWith('data:image/')
                  ? 'object-contain object-right'
                  : 'object-cover object-[center_right]'
              } scale-100`}
              style={{
                maskImage: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
              }}
            />
          </div>
        ) : (
          <img
            src={slide.imageJpg}
            alt={slide.altText}
            className={`w-full h-full ${
              slide.imageJpg?.startsWith('data:image/')
                ? 'object-contain object-right'
                : 'object-cover object-[center_right]'
            } scale-100`}
          />
        )}
      </div>

      {/* Soft Ice-Blue & White Curved Gradient Overlay on the Left for 100% legible HTML typography */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isLayersSlide
            ? 'linear-gradient(90deg, rgba(235,243,253,0.97) 0%, rgba(244,248,254,0.92) 38%, rgba(244,248,254,0.35) 50%, rgba(244,248,254,0) 60%)'
            : 'linear-gradient(95deg, rgba(235,243,253,0.97) 0%, rgba(245,249,255,0.92) 39%, rgba(248,251,255,0.6) 50%, rgba(248,251,255,0) 60%)',
        }}
      />

      {/* Decorative bottom-left soft wave accent matching reference banners */}
      <svg
        className="absolute left-0 bottom-0 h-24 sm:h-32 w-[45%] pointer-events-none opacity-80"
        viewBox="0 0 600 160"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 70 C160 110, 310 155, 520 160 L0 160 Z"
          fill="url(#heroWaveBlue)"
        />
        {isLayersSlide && (
          <path
            d="M0 115 C90 135, 180 152, 260 160 L0 160 Z"
            fill="url(#heroWaveRed)"
          />
        )}
        <defs>
          <linearGradient id="heroWaveBlue" x1="0" y1="70" x2="520" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#BFD9F8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#DCEBFC" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="heroWaveRed" x1="0" y1="115" x2="260" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E3262E" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#F87171" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Slide 2: Interactive 6-Layer Callout Pointers & Labels on Desktop */}
      {isLayersSlide && slide.layerCallouts && (
        <div className="hidden lg:block absolute inset-y-0 left-[71%] right-14 pointer-events-none z-20">
          {slide.layerCallouts.map((layer, index) => (
            <div
              key={index}
              className="absolute left-0 right-0 flex items-center gap-2 -translate-y-1/2"
              style={{ top: `${layer.topPercent}%` }}
            >
              <span className="w-2 h-2 rounded-full bg-[#E3262E] shrink-0 shadow-xs" />
              <span className="w-8 xl:w-12 h-[1.5px] bg-[#E3262E] shrink-0" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3262E] shrink-0 ring-2 ring-white/80 shadow-xs" />
              <div className="pl-1 leading-tight">
                <span className="block text-[12px] xl:text-[13.5px] font-bold text-[#0A2E73] tracking-tight whitespace-nowrap drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                  {layer.label}
                </span>
                {layer.sublabel && (
                  <span className="block text-[10.5px] xl:text-[11.5px] font-medium text-[#1E3A5F] whitespace-nowrap">
                    {layer.sublabel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
