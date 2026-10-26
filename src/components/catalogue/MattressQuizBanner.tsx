import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useHomePageContent } from '../../context/HomePageContentContext';

interface AnimatedBedSlide {
  id: string;
  image: string;
  label: string;
}

const ANIMATED_PNG_BEDS: AnimatedBedSlide[] = [
  {
    id: 'bed-1',
    image: '/images/quiz-bed-1.png',
    label: 'Euro-Top Orthopedic',
  },
  {
    id: 'bed-2',
    image: '/images/quiz-bed-2.png',
    label: 'Royal Navy Box-Top',
  },
  {
    id: 'bed-3',
    image: '/images/quiz-bed-3.png',
    label: 'Aero-Cool Gel Pillow-Top',
  },
  {
    id: 'bed-4',
    image: '/images/quiz-bed-4.png',
    label: 'Organic Latex Euro-Top',
  },
];

export const MattressQuizBanner: React.FC = () => {
  const { navigateToMattressFinder } = useNavigation();
  const { homePageData } = useHomePageContent();
  const quizData = homePageData.quizBanner;
  const bedsList = quizData.beds.length > 0 ? quizData.beds : ANIMATED_PNG_BEDS;
  const [activeIndex, setActiveIndex] = useState(0);

  // Continuously cycle the transparent PNG mattress every 2.6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bedsList.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [bedsList.length]);

  return (
    <div className="pt-4">
      <div className="relative w-full rounded-[16px] sm:rounded-[20px] overflow-hidden bg-gradient-to-r from-[#AE0B12] via-[#D3161E] to-[#E52229] shadow-[0_18px_45px_rgba(174,11,18,0.24)] select-none">
        {/* Sculpted Diagonal Crimson Light Waves matching the reference banner */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(112deg, rgba(145,7,13,0.45) 0%, transparent 36%, rgba(255,70,75,0.28) 49%, rgba(185,10,17,0.35) 64%, rgba(255,85,90,0.22) 82%, transparent 100%)',
          }}
        />
        <div className="absolute -right-16 -top-24 w-96 h-96 rounded-full bg-[#FF4D54]/25 blur-3xl pointer-events-none" />
        <div className="absolute left-1/2 bottom-0 w-80 h-32 rounded-full bg-[#7A0409]/40 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center min-h-[250px] sm:min-h-[280px] lg:min-h-[300px]">
          {/* Left Column: Typography & CTA Button */}
          <div className="lg:col-span-7 px-5 sm:px-10 lg:pl-14 lg:pr-6 pt-7 pb-3 sm:py-10 flex flex-col items-start justify-center">
            {/* Eyebrow with Horizontal Line */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[11px] sm:text-[13px] font-normal tracking-[0.14em] text-white/90">
                {quizData.eyebrow}
              </span>
              <span className="w-8 sm:w-9 h-[1px] bg-white/45 inline-block" />
            </div>

            {/* 2-Line Main Headline */}
            <h2 className="text-[21px] sm:text-3xl lg:text-[36px] xl:text-[40px] font-bold text-white leading-[1.2] sm:leading-[1.18] tracking-[-0.01em]">
              {quizData.headlineLine1}
              <br />
              {quizData.headlineLine2}
            </h2>

            {/* Subtitle */}
            <p className="text-[13px] sm:text-[15.5px] font-normal text-white/90 mt-2">
              {quizData.subtitle}
            </p>

            {/* Interactive White Pill/Rounded Button */}
            <button
              type="button"
              onClick={navigateToMattressFinder}
              className="mt-5 sm:mt-6 inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-[12px] bg-white hover:bg-[#FFF5F5] text-[#C81920] text-[13.5px] sm:text-[15px] font-bold shadow-[0_10px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.26)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
            >
              <span>{quizData.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#C81920] stroke-[2.4] transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Column: Continuous Changing Transparent PNG Bed Animation */}
          <div className="lg:col-span-5 relative h-[195px] sm:h-[250px] lg:h-[300px] flex items-center justify-center px-4 sm:pr-8 lg:pr-10 pb-5 lg:pb-0">
            {/* Soft Glowing Backlight Aura */}
            <div className="absolute w-[75%] h-[65%] rounded-full bg-[#FF6B70]/25 blur-2xl pointer-events-none animate-pulse" />

            {/* Realistic Isometric Floor Contact Shadow that breathes with the bed animation */}
            <div
              key={`shadow-${activeIndex}`}
              className="absolute bottom-5 sm:bottom-6 lg:bottom-7 w-[76%] h-9 sm:h-11 bg-[#420205]/75 blur-xl rounded-[100%] pointer-events-none transition-all duration-700"
              style={{
                transform: 'rotate(-8deg) scaleX(1.04)',
              }}
            />

            {/* Stacked Transparent PNG Mattresses with 3D Isometric Morph/Float Transition */}
            <div className="relative w-full max-w-[420px] xl:max-w-[460px] h-full flex items-center justify-center">
              {bedsList.map((bed, index) => {
                const isActive = index === activeIndex;
                const isPrev =
                  index === (activeIndex - 1 + bedsList.length) % bedsList.length;

                return (
                  <div
                    key={bed.id}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? 'opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0 z-20'
                        : isPrev
                        ? 'opacity-0 scale-90 -translate-x-8 -translate-y-4 -rotate-2 z-10 pointer-events-none'
                        : 'opacity-0 scale-105 translate-x-10 translate-y-3 rotate-2 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={bed.image}
                      alt={bed.label}
                      className={`w-full h-auto max-h-[210px] sm:max-h-[245px] lg:max-h-[265px] object-contain drop-shadow-[0_18px_22px_rgba(65,2,6,0.55)] ${
                        isActive ? 'animate-[subtleFloat_3.2s_ease-in-out_infinite]' : ''
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Subtle Interactive Bed Switcher Dots (Bottom Right) */}
            <div className="absolute bottom-3 right-6 sm:right-10 z-30 flex items-center gap-1.5">
              {bedsList.map((bed, idx) => (
                <button
                  key={bed.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? 'w-5 bg-white shadow-xs'
                      : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Preview ${bed.label}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
