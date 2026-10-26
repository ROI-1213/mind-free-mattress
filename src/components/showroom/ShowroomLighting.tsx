import React from 'react';

interface ShowroomLightingProps {
  activeId: string | null;
  hoveredId: string | null;
}

export const ShowroomLighting: React.FC<ShowroomLightingProps> = ({ activeId, hoveredId }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* 1. High-Ceiling Ambient Track Light Beam Array */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />

      {/* 2. Spotlight 1: Left Display (Spring Collection) */}
      <div
        className={`
          absolute -top-10 left-[18%] w-[380px] h-[650px]
          bg-gradient-to-b from-[#FFF2D6]/25 via-[#E3262E]/10 to-transparent
          transform -rotate-12 blur-[45px] rounded-full
          transition-all duration-700 ease-out
          ${hoveredId === 'spring-collection' || activeId === 'spring-collection' ? 'opacity-100 scale-105 from-[#FFF5DC]/35' : 'opacity-40 scale-100'}
        `}
      />

      {/* 3. Spotlight 2: Center Hero Display (Memory Foam Collection) */}
      <div
        className={`
          absolute -top-16 left-1/2 -translate-x-1/2 w-[460px] h-[720px]
          bg-gradient-to-b from-[#FFF8E7]/35 via-[#E3262E]/15 to-transparent
          blur-[50px] rounded-full
          transition-all duration-700 ease-out
          ${hoveredId === 'memory-foam-collection' || activeId === 'memory-foam-collection' ? 'opacity-100 scale-110 from-[#FFFFEE]/45' : 'opacity-60 scale-100'}
        `}
      />

      {/* 4. Spotlight 3: Right Display (Latex Collection) */}
      <div
        className={`
          absolute -top-10 right-[18%] w-[380px] h-[650px]
          bg-gradient-to-b from-[#FFF2D6]/25 via-[#E3262E]/10 to-transparent
          transform rotate-12 blur-[45px] rounded-full
          transition-all duration-700 ease-out
          ${hoveredId === 'latex-collection' || activeId === 'latex-collection' ? 'opacity-100 scale-105 from-[#FFF5DC]/35' : 'opacity-40 scale-100'}
        `}
      />

      {/* 5. Ambient Architectural Warmth on Walnut Flooring */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
};
