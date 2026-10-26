import React, { useEffect, useRef, useState } from 'react';

export type RevealVariant =
  | 'fade-up'
  | 'fade-in'
  | 'scale-up'
  | 'slide-left'
  | 'slide-right'
  | 'blur-reveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  parallaxSpeed?: number; // e.g. 0.08 for subtle upward parallax
  className?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 750,
  threshold = 0.12,
  parallaxSpeed = 0,
  className = '',
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  useEffect(() => {
    if (!parallaxSpeed || typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const windowH = window.innerHeight;
        if (rect.bottom < 0 || rect.top > windowH) return;
        const centerOffset = rect.top + rect.height / 2 - windowH / 2;
        const factor = window.innerWidth < 768 ? parallaxSpeed * 0.45 : parallaxSpeed;
        setParallaxY(centerOffset * -factor);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [parallaxSpeed]);

  const getHiddenTransform = (): string => {
    switch (variant) {
      case 'fade-up':
        return 'translate3d(0, 28px, 0) scale(0.99)';
      case 'scale-up':
        return 'translate3d(0, 18px, 0) scale(0.94)';
      case 'slide-left':
        return 'translate3d(-32px, 0, 0)';
      case 'slide-right':
        return 'translate3d(32px, 0, 0)';
      case 'blur-reveal':
        return 'translate3d(0, 20px, 0) scale(0.97)';
      case 'fade-in':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const visibleTransform = parallaxSpeed
    ? `translate3d(0, ${parallaxY.toFixed(1)}px, 0) scale(1)`
    : 'translate3d(0, 0, 0) scale(1)';

  return (
    <div
      ref={ref}
      className={`will-change-[opacity,transform] ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        filter:
          variant === 'blur-reveal'
            ? isVisible
              ? 'blur(0px)'
              : 'blur(6px)'
            : undefined,
        transform: isVisible ? visibleTransform : getHiddenTransform(),
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
    </div>
  );
};

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const updateProgress = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) {
          setProgress(0);
          return;
        }
        setProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
      });
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#0A2E73] via-[#E3262E] to-[#0F62C8] shadow-[0_0_12px_rgba(227,38,46,0.55)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
