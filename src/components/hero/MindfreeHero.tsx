import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HERO_SLIDES, type HeroSlideData } from '../../data/heroData';
import { HeroSlide } from './HeroSlide';
import { HeroContent } from './HeroContent';
import { HeroControls } from './HeroControls';
import { useHomePageContent } from '../../context/HomePageContentContext';

export const MindfreeHero: React.FC = () => {
  const { homePageData } = useHomePageContent();
  const slides = homePageData.heroSlides.length > 0 ? homePageData.heroSlides : HERO_SLIDES;
  const features = homePageData.heroFeatures;

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('slide');
      if (param !== null) {
        const parsed = parseInt(param, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < HERO_SLIDES.length) {
          return parsed;
        }
      }
    }
    return 0;
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileFeatureIndex, setMobileFeatureIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  // Scroll-triggered vertical depth parallax for the hero section
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (window.scrollY <= 600) {
          setScrollOffset(window.scrollY);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Auto-advance mobile single-row feature strip one after another
  useEffect(() => {
    const timer = setInterval(() => {
      setMobileFeatureIndex((prev) => (prev + 1) % 3);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const containerRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentSlide: HeroSlideData = slides[currentIndex] || slides[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Autoplay rotation (6 seconds)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !isPlaying || isHovered) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, isHovered, handleNext]);

  // Gentle mouse parallax effect (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
    setParallaxOffset({
      x: xRatio * 10,
      y: yRatio * 10,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setParallaxOffset({ x: 0, y: 0 });
  };

  // Touch-friendly swipe navigation on mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(deltaX) > 42) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    }
    touchStartXRef.current = null;
  };

  return (
    <div className="w-full bg-white select-none">
      {/* 1. Full-Bleed Panoramic Hero Banner with Text Overlaid in the Left Space on Both Mobile & Desktop */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[225px] sm:h-[340px] md:h-[390px] lg:h-[420px] xl:h-[450px] overflow-hidden bg-[#EAF3FC]"
        role="region"
        aria-label="MINDFREE Homepage Hero Banner"
      >
        {/* Background Slides with Scroll-Triggered Depth Parallax */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(0, ${(scrollOffset * 0.14).toFixed(1)}px, 0) scale(${1 + Math.min(0.05, scrollOffset * 0.0001)})`,
          }}
        >
          {slides.map((slide, idx) => (
            <HeroSlide
              key={slide.id}
              slide={slide}
              isActive={idx === currentIndex}
              parallaxOffset={parallaxOffset}
            />
          ))}
        </div>

        {/* Left Editorial Text & Interactive Button Container overlaid inside the left space of the banner */}
        <div
          className="relative z-20 max-w-[1440px] mx-auto h-full pl-3.5 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-24 pr-3 sm:pr-12 lg:pr-20 flex items-center will-change-transform"
          style={{
            transform: `translate3d(0, ${(scrollOffset * -0.06).toFixed(1)}px, 0)`,
          }}
        >
          <div
            key={currentSlide.id}
            className="w-[56%] sm:w-[52%] md:w-full max-w-[240px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[480px] xl:max-w-[520px] animate-hero-entrance"
          >
            <HeroContent slide={currentSlide} />
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <HeroControls
          currentIndex={currentIndex}
          totalSlides={slides.length}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectSlide={handleSelectSlide}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          theme={currentSlide.theme}
        />
      </section>

      {/* 2. Bottom Feature Strip directly below the Hero Banner (Single-Row Auto-Slider on Mobile, 3-Column Row on Desktop) */}
      <div className="w-full bg-white border-b border-slate-200/80 py-3 sm:py-4 px-4 sm:px-8 overflow-hidden">
        {/* Mobile Single-Row One-After-Another Slider (< md) */}
        <div className="md:hidden relative w-full overflow-hidden">
          <div
            className="flex flex-nowrap w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${mobileFeatureIndex * 100}%)` }}
          >
            {/* Slide 1 */}
            <div className="w-full shrink-0 flex items-center justify-center gap-3.5 py-1 px-2">
              <svg
                className="w-10 h-10 text-[#0A2540] shrink-0"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 14v24" />
                <path d="M6 28h36v10" />
                <path d="M6 33h36" />
                <rect x="10" y="21" width="11" height="7" rx="1.5" />
                <path d="M21 23h19a2 2 0 0 1 2 2v3H21v-5Z" />
              </svg>
              <div>
                <div className="text-[15px] leading-snug text-[#0A2540]">
                  <span className="font-semibold text-[#0A2E73]">{features[0]?.titleAccent}</span>{' '}
                  <span className="font-bold text-[#0A2540]">{features[0]?.titleMain}</span>
                </div>
                <p className="text-[12px] text-slate-600 mt-0.5">
                  {features[0]?.subtitle}
                </p>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="w-full shrink-0 flex items-center justify-center gap-3.5 py-1 px-2">
              <svg
                className="w-10 h-10 text-[#0A2540] shrink-0"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 15h20v18H10z" />
                <path d="M30 21h7l5 6v6h-12V21z" />
                <circle cx="17" cy="35" r="3.5" />
                <circle cx="36" cy="35" r="3.5" />
                <path d="M4 20h4" />
                <path d="M2 25h6" />
                <path d="M5 30h3" />
              </svg>
              <div>
                <div className="text-[15px] leading-snug text-[#0A2540]">
                  <span className="font-semibold text-[#0A2E73]">{features[1]?.titleAccent}</span>{' '}
                  <span className="font-bold text-[#0A2540]">{features[1]?.titleMain}</span>
                </div>
                <p className="text-[12px] text-slate-600 mt-0.5">
                  {features[1]?.subtitle}
                </p>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="w-full shrink-0 flex items-center justify-center gap-3.5 py-1 px-2">
              <svg
                className="w-10 h-10 text-[#0A2540] shrink-0"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="24" cy="24" r="10" />
                <path d="m20 24 3 3 6-6" />
                <path d="M24 8l3.5 3 4.5-.5 1.5 4.2 4.2 1.5-.5 4.5 3 3.3-3 3.3.5 4.5-4.2 1.5-1.5 4.2-4.5-.5L24 40l-3.5-3-4.5.5-1.5-4.2-4.2-1.5.5-4.5-3-3.3 3-3.3-.5-4.5 4.2-1.5 1.5-4.2 4.5.5L24 8z" />
              </svg>
              <div>
                <div className="text-[15px] leading-snug text-[#0A2540]">
                  <span className="font-semibold text-[#0A2E73]">{features[2]?.titleAccent}</span>{' '}
                  <span className="font-bold text-[#0A2540]">{features[2]?.titleMain}</span>
                </div>
                <p className="text-[12px] text-slate-600 mt-0.5">
                  {features[2]?.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop 3-Column Single Row (md+) */}
        <div className="hidden md:grid max-w-[1380px] mx-auto grid-cols-3 divide-x divide-slate-200">
          {/* Feature 1 */}
          <div className="flex items-center justify-center gap-3.5 py-1 px-4">
            <svg
              className="w-11 h-11 text-[#0A2540] shrink-0"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 14v24" />
              <path d="M6 28h36v10" />
              <path d="M6 33h36" />
              <rect x="10" y="21" width="11" height="7" rx="1.5" />
              <path d="M21 23h19a2 2 0 0 1 2 2v3H21v-5Z" />
            </svg>
            <div>
              <div className="text-[17px] leading-snug text-[#0A2540]">
                <span className="font-semibold text-[#0A2E73]">{features[0]?.titleAccent}</span>{' '}
                <span className="font-bold text-[#0A2540]">{features[0]?.titleMain}</span>
              </div>
              <p className="text-[12.5px] text-slate-600 mt-0.5">
                {features[0]?.subtitle}
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center justify-center gap-3.5 py-1 px-4">
            <svg
              className="w-11 h-11 text-[#0A2540] shrink-0"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 15h20v18H10z" />
              <path d="M30 21h7l5 6v6h-12V21z" />
              <circle cx="17" cy="35" r="3.5" />
              <circle cx="36" cy="35" r="3.5" />
              <path d="M4 20h4" />
              <path d="M2 25h6" />
              <path d="M5 30h3" />
            </svg>
            <div>
              <div className="text-[17px] leading-snug text-[#0A2540]">
                <span className="font-semibold text-[#0A2E73]">{features[1]?.titleAccent}</span>{' '}
                <span className="font-bold text-[#0A2540]">{features[1]?.titleMain}</span>
              </div>
              <p className="text-[12.5px] text-slate-600 mt-0.5">
                {features[1]?.subtitle}
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center justify-center gap-3.5 py-1 px-4">
            <svg
              className="w-11 h-11 text-[#0A2540] shrink-0"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="24" cy="24" r="10" />
              <path d="m20 24 3 3 6-6" />
              <path d="M24 8l3.5 3 4.5-.5 1.5 4.2 4.2 1.5-.5 4.5 3 3.3-3 3.3.5 4.5-4.2 1.5-1.5 4.2-4.5-.5L24 40l-3.5-3-4.5.5-1.5-4.2-4.2-1.5.5-4.5-3-3.3 3-3.3-.5-4.5 4.2-1.5 1.5-4.2 4.5.5L24 8z" />
            </svg>
            <div>
              <div className="text-[17px] leading-snug text-[#0A2540]">
                <span className="font-semibold text-[#0A2E73]">{features[2]?.titleAccent}</span>{' '}
                <span className="font-bold text-[#0A2540]">{features[2]?.titleMain}</span>
              </div>
              <p className="text-[12.5px] text-slate-600 mt-0.5">
                {features[2]?.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
