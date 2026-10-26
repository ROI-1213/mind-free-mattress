import React from 'react';
import { SculptedVideoFrame } from './SculptedVideoFrame';
import { CinematicVideoPlayer } from './CinematicVideoPlayer';

export const MindfreeVideoSection: React.FC = () => {
  return (
    <section
      id="mindfree-brand-film"
      className="relative w-full bg-[#F8FAFC] py-14 sm:py-20 lg:py-24 overflow-hidden border-t border-[#EAE6DD]"
      aria-label="Mindfree Brand Film and Cinematic Video Experience"
    >
      {/* Subtle Ambient Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#E3262E]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[300px] bg-[#0A2E73]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Video Section Container */}
      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        <SculptedVideoFrame>
          <CinematicVideoPlayer />
        </SculptedVideoFrame>
      </div>
    </section>
  );
};
