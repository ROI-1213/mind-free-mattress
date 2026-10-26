import React from 'react';
import { useNavigation } from '../../context/NavigationContext';

interface MindfreeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MindfreeLogo: React.FC<MindfreeLogoProps> = ({ className = '', size = 'md' }) => {
  const { navigateToHome } = useNavigation();

  const heightClass =
    size === 'sm'
      ? 'h-9 sm:h-10'
      : size === 'lg'
      ? 'h-14 lg:h-16'
      : 'h-10 sm:h-11 lg:h-[46px]';

  return (
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();
        navigateToHome();
      }}
      className={`inline-flex items-center select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E3262E] rounded-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      aria-label="MIND FREE MATTRESS"
    >
      <img
        src="/images/mindfree_logo_transparent.png?v=2"
        alt="MIND FREE MATTRESS"
        className={`${heightClass} w-auto object-contain max-w-[170px] xl:max-w-[190px] drop-shadow-xs transition-opacity duration-200 group-hover:opacity-95`}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/images/mindfree_logo_exact.png?v=2';
        }}
      />
    </a>
  );
};
