import React from 'react';
import type { ReactNode } from 'react';

interface SculptedVideoFrameProps {
  children: ReactNode;
}

export const SculptedVideoFrame: React.FC<SculptedVideoFrameProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12 select-none">
      {/* 1. SCULPTED OUTER FRAME CONTAINER WITH ASYMMETRICAL CURVES */}
      <div className="relative w-full rounded-[36px] sm:rounded-[48px] lg:rounded-[56px] p-2.5 sm:p-4 lg:p-6 shadow-[0_30px_90px_rgba(4,20,14,0.45)] bg-gradient-to-br from-[#061B13] via-[#0B2A1E] to-[#04140D] border border-[#E3262E]/20 overflow-hidden">
        
        {/* Ambient Warm Golden & Emerald Radial Flares */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#E3262E]/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#E3262E]/12 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial from-[#123829]/20 to-transparent blur-3xl pointer-events-none" />

        {/* 2. DRAPED SILK & IVORY LUXURY SURROUND FLOURISHES (Top-Left & Bottom-Right) */}
        {/* Top-Left Draped Flourish */}
        <div className="hidden lg:block absolute -top-12 -left-12 w-64 h-64 pointer-events-none z-10 opacity-80">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <path
              d="M-20,90 Q40,80 70,40 Q95,10 110,-20 L-20,-20 Z"
              fill="url(#ivorySilkGrad)"
              filter="drop-shadow(0 10px 25px rgba(0,0,0,0.5))"
            />
            <path
              d="M-10,95 Q45,85 75,45 Q100,15 115,-15"
              stroke="url(#champagneGoldGrad)"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        {/* Bottom-Right Draped Flourish */}
        <div className="hidden lg:block absolute -bottom-12 -right-12 w-64 h-64 pointer-events-none z-10 opacity-80 rotate-180">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <path
              d="M-20,90 Q40,80 70,40 Q95,10 110,-20 L-20,-20 Z"
              fill="url(#ivorySilkGrad)"
              filter="drop-shadow(0 10px 25px rgba(0,0,0,0.5))"
            />
            <path
              d="M-10,95 Q45,85 75,45 Q100,15 115,-15"
              stroke="url(#champagneGoldGrad)"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        {/* 3. BOTANICAL SCULPTED GOLD LEAVES (Top-Left Corner) */}
        <div className="hidden sm:block absolute top-2 sm:top-4 left-3 sm:left-6 w-20 sm:w-28 lg:w-36 h-20 sm:h-28 lg:h-36 pointer-events-none z-30">
          <svg viewBox="0 0 140 140" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <defs>
              <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF1D0" />
                <stop offset="35%" stopColor="#D8A95A" />
                <stop offset="70%" stopColor="#E3262E" />
                <stop offset="100%" stopColor="#8A6025" />
              </linearGradient>
            </defs>
            {/* Vine stem */}
            <path
              d="M10,130 C20,90 40,50 85,25 C105,15 125,12 135,10"
              stroke="url(#goldLeafGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Leaf 1 */}
            <path
              d="M40,75 C30,60 35,40 55,42 C65,43 65,65 40,75 Z"
              fill="url(#goldLeafGrad)"
            />
            {/* Leaf 2 */}
            <path
              d="M62,55 C65,35 85,32 90,50 C92,62 75,70 62,55 Z"
              fill="url(#goldLeafGrad)"
            />
            {/* Leaf 3 */}
            <path
              d="M25,95 C10,85 12,68 30,72 C42,75 38,94 25,95 Z"
              fill="url(#goldLeafGrad)"
            />
            {/* Leaf 4 (Terminal) */}
            <path
              d="M95,30 C108,18 126,16 130,28 C132,38 115,44 95,30 Z"
              fill="url(#goldLeafGrad)"
            />
          </svg>
        </div>

        {/* 4. BOTANICAL SCULPTED GOLD LEAF (Bottom-Right Corner) */}
        <div className="hidden sm:block absolute bottom-2 sm:bottom-4 right-3 sm:right-6 w-16 sm:w-24 lg:w-28 h-16 sm:h-24 lg:h-28 pointer-events-none z-30 rotate-180">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <path
              d="M10,90 C30,65 50,45 85,20"
              stroke="url(#goldLeafGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M35,65 C25,50 32,35 48,40 C56,43 52,60 35,65 Z"
              fill="url(#goldLeafGrad)"
            />
            <path
              d="M60,42 C62,25 78,22 84,35 C88,44 75,52 60,42 Z"
              fill="url(#goldLeafGrad)"
            />
          </svg>
        </div>

        {/* 5. METALLIC DOUBLE GOLD RIM WITH SCULPTED ASYMMETRICAL CORNERS */}
        <div className="relative w-full aspect-16/9 rounded-[28px] sm:rounded-[38px] lg:rounded-[46px] p-[2.5px] sm:p-[3.5px] lg:p-[4px] bg-gradient-to-tr from-[#9B702F] via-[#FFDF9E] via-[#E3262E] via-[#7B531E] to-[#FCE0A2] shadow-[0_15px_45px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.4)]">
          
          {/* Top Golden Light Glint / Specular Flare */}
          <div className="absolute -top-3 sm:-top-4 left-1/5 sm:left-1/4 w-44 sm:w-72 lg:w-96 h-6 sm:h-8 bg-gradient-to-r from-transparent via-[#FFF6DC] to-transparent blur-[6px] sm:blur-[8px] pointer-events-none z-30 opacity-90" />
          <div className="absolute -top-1 left-[28%] sm:left-[30%] w-12 sm:w-20 h-2 sm:h-3 bg-white rounded-full blur-[2px] pointer-events-none z-30" />

          {/* Bottom Golden Light Glint */}
          <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-40 sm:w-64 h-5 sm:h-6 bg-gradient-to-r from-transparent via-[#FFDF9E] to-transparent blur-[6px] pointer-events-none z-30 opacity-80" />

          {/* Inner Secondary Polished Rim */}
          <div className="relative w-full h-full rounded-[26px] sm:rounded-[35px] lg:rounded-[43px] p-[1.5px] sm:p-[2px] bg-gradient-to-br from-[#103425] via-[#1244A8] to-[#0A2218] overflow-hidden">
            
            {/* The Inner Video Element */}
            <div className="relative w-full h-full rounded-[24px] sm:rounded-[33px] lg:rounded-[41px] overflow-hidden bg-black shadow-inner">
              {children}
            </div>

            {/* Subtle Animated Gold Glint Sweep across the rim */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[26px] sm:rounded-[35px] lg:rounded-[43px]">
              <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 animate-[goldGlintSweep_8s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {/* 6. BOTTOM-CENTER GEOMETRIC DETAIL: DIAMOND & HAIRLINE ACCENTS */}
        <div className="relative flex items-center justify-center gap-4 pt-3 sm:pt-4 lg:pt-5 pb-1">
          {/* Left Hairline */}
          <div className="w-16 sm:w-28 lg:w-40 h-px bg-gradient-to-r from-transparent via-[#E3262E]/70 to-[#E3262E]" />
          
          {/* Rotated Diamond Emblem */}
          <div className="relative w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rotate-45 border border-[#E3262E] bg-[#0C2D22] flex items-center justify-center shadow-[0_0_8px_rgba(189,139,67,0.5)]">
            <div className="w-1 h-1 bg-[#E3262E] rounded-full" />
          </div>

          {/* Right Hairline */}
          <div className="w-16 sm:w-28 lg:w-40 h-px bg-gradient-to-l from-transparent via-[#E3262E]/70 to-[#E3262E]" />
        </div>

        {/* SVG Defs for gradients */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <linearGradient id="champagneGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="40%" stopColor="#D4A759" />
              <stop offset="70%" stopColor="#E3262E" />
              <stop offset="100%" stopColor="#8A6025" />
            </linearGradient>

            <linearGradient id="ivorySilkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF7F0" />
              <stop offset="50%" stopColor="#F0E8D8" />
              <stop offset="100%" stopColor="#E2D4BC" />
            </linearGradient>
          </defs>
        </svg>

      </div>
    </div>
  );
};
