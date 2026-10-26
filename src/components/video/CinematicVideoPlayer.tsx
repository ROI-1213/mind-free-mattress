import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  MoreVertical,
  Sparkles,
} from 'lucide-react';

export const CinematicVideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const duration = 138; // 2 minutes 18 seconds (02:18)

  // Simulation timer for realistic playback progression
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Format seconds to mm:ss
  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setCurrentTime(pos * duration);
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const progressPercent = (currentTime / duration) * 100;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full group overflow-hidden select-none cursor-pointer bg-black"
      onClick={(e) => {
        // Only toggle play if clicking outside bottom controls bar
        if ((e.target as HTMLElement).closest('.video-controls-bar')) return;
        handleTogglePlay();
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false);
      }}
    >
      {/* 1. CINEMATIC VIDEO BACKGROUND PHOTOGRAPHY */}
      <img
        src="/images/mindfree/why-choose-bedroom.webp"
        alt="Mindfree Cinematic Bedroom Film"
        className={`
          w-full h-full object-cover object-center
          transition-transform duration-1000 ease-out
          ${isPlaying ? 'scale-105 brightness-100' : 'scale-100 brightness-95'}
        `}
      />

      {/* Subtle Cinematic Vignette & Text Contrast Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />

      {/* 2. LEFT EDITORIAL OVERLAY CONTENT */}
      <div
        className={`
          absolute top-8 sm:top-12 lg:top-16 left-6 sm:left-10 lg:left-14
          max-w-xs sm:max-w-md lg:max-w-lg
          transition-all duration-700 ease-out z-20 pointer-events-auto
          ${isPlaying ? 'opacity-20 hover:opacity-100 translate-y-2' : 'opacity-100 translate-y-0'}
        `}
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-2.5 sm:mb-3.5">
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#E3262E]" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#F8FAFC]/90">
            A MINDFREE EXPERIENCE
          </span>
          <span className="w-6 h-px bg-[#E3262E]/50" />
        </div>

        {/* Main Headline */}
        <h2 className="font-serif text-2xl sm:text-4xl lg:text-[46px] leading-[1.1] text-white tracking-tight mb-2.5 sm:mb-3.5">
          More Than <br />
          A Mattress <br />
          <span className="italic font-serif text-[#E3262E] font-normal">
            A New Way to Sleep.
          </span>
        </h2>

        {/* Supporting Description */}
        <p className="text-xs sm:text-sm text-[#F8FAFC]/80 leading-relaxed max-w-sm sm:max-w-md mb-4 sm:mb-6 font-sans">
          Experience the perfect blend of comfort, support and craftsmanship. See how Mindfree transforms everyday sleep into a more restful, refreshing life.
        </p>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleTogglePlay();
          }}
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-black/40 hover:bg-[#E3262E] text-[#F8FAFC] hover:text-[#0C2A1E] border border-[#E3262E] backdrop-blur-md font-semibold text-xs sm:text-xs tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isPlaying ? 'Pause Film' : 'Watch Our Story →'}</span>
        </button>
      </div>

      {/* 3. CENTRAL CINEMATIC PLAY BUTTON WITH CONCENTRIC GOLD RIPPLES */}
      <div
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          flex items-center justify-center pointer-events-auto z-20
          transition-all duration-500
          ${isPlaying ? 'opacity-0 scale-90 pointer-events-none group-hover:opacity-80 group-hover:pointer-events-auto' : 'opacity-100 scale-100'}
        `}
      >
        {/* Animated Ripple 1 */}
        <div className="absolute w-20 sm:w-28 lg:w-36 h-20 sm:h-28 lg:h-36 rounded-full border border-[#E3262E]/60 animate-ripple-1 pointer-events-none" />
        
        {/* Animated Ripple 2 */}
        <div className="absolute w-16 sm:w-24 lg:w-30 h-16 sm:h-24 lg:h-30 rounded-full border border-[#E3262E]/80 animate-ripple-2 pointer-events-none" />

        {/* Center Frosted Glass Disc with Gold Border */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleTogglePlay();
          }}
          className="relative w-14 sm:w-18 lg:w-22 h-14 sm:h-18 lg:h-22 rounded-full bg-black/35 hover:bg-[#E3262E] text-white hover:text-[#0C2A1E] backdrop-blur-md border border-[#E3262E] flex items-center justify-center shadow-[0_0_35px_rgba(189,139,67,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <Pause className="w-5 sm:w-7 h-5 sm:h-7 fill-current" />
          ) : (
            <Play className="w-5 sm:w-7 h-5 sm:h-7 fill-current ml-1 text-white hover:text-[#0C2A1E]" />
          )}
        </button>
      </div>

      {/* 4. BOTTOM VIDEO CONTROLS BAR */}
      <div
        className={`
          video-controls-bar
          absolute bottom-0 inset-x-0 px-4 sm:px-8 py-3 sm:py-4
          bg-gradient-to-t from-black/95 via-black/70 to-transparent
          backdrop-blur-xs flex flex-col gap-2 z-30 transition-all duration-500
          ${showControls || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
      >
        {/* Controls Row */}
        <div className="flex items-center gap-3 sm:gap-4 text-white text-xs">
          {/* Play/Pause Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleTogglePlay();
            }}
            className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current text-white" />
            ) : (
              <Play className="w-4 h-4 fill-current text-white" />
            )}
          </button>

          {/* Time Display */}
          <div className="font-mono text-[11px] sm:text-xs text-white/90 tracking-wider whitespace-nowrap">
            <span>{formatTime(currentTime)}</span>
            <span className="mx-1 text-white/50">/</span>
            <span className="text-white/70">{formatTime(duration)}</span>
          </div>

          {/* Scrubber Timeline Bar */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleSeek(e);
            }}
            className="flex-1 h-5 flex items-center cursor-pointer group/timeline mx-1 sm:mx-2"
          >
            <div className="relative w-full h-1 sm:h-1.5 bg-white/25 rounded-full overflow-hidden group-hover/timeline:h-2 transition-all">
              {/* Active Golden Progress Fill */}
              <div
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#D4A759] to-[#FFDF9E] rounded-full shadow-[0_0_8px_rgba(189,139,67,0.8)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                e.stopPropagation();
                const val = parseFloat(e.target.value);
                setVolume(val);
                if (val > 0) setIsMuted(false);
              }}
              className="w-12 sm:w-16 h-1 accent-[#E3262E] bg-white/30 rounded-lg cursor-pointer hidden sm:block"
            />
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFullscreen();
            }}
            className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-white" />
            ) : (
              <Maximize2 className="w-4 h-4 text-white" />
            )}
          </button>

          {/* More Options */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="More options"
          >
            <MoreVertical className="w-4 h-4 text-white/80" />
          </button>
        </div>
      </div>
    </div>
  );
};
