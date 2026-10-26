import React, { useState, useRef, useEffect } from 'react';
import { UtilityBar } from './UtilityBar';
import { MainHeader } from './MainHeader';
import { MattressesMegaMenu } from './MattressesMegaMenu';
import { MobileNav } from './MobileNav';
import { SearchBar } from './SearchBar';
import { X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export interface NavbarProps {
  isInnerPage?: boolean;
}

export const Navbar: React.FC<NavbarProps> = () => {
  // Unified Navbar rendered identically across all pages
  const { cartCount, wishlist } = useCart();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(() => {
    return typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('drawer') === 'open';
  });
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const wishlistCount = wishlist.length;

  const navContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear hover timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close when clicking outside of navbar container
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 280);
  };

  const handleToggle = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMegaMenuOpen((prev) => !prev);
  };

  return (
    <header ref={navContainerRef} className="sticky top-0 w-full z-40 bg-white shadow-xs">
      {/* 1. Top Utility Bar */}
      <UtilityBar />

      {/* 2. Main Navigation Header */}
      <div onMouseLeave={handleMouseLeave}>
        <MainHeader
          activeMegaMenu={isMegaMenuOpen}
          onToggleMegaMenu={handleToggle}
          onOpenMegaMenu={handleMouseEnter}
          onCloseMegaMenu={handleMouseLeave}
          onOpenMobileMenu={() => setIsMobileNavOpen(true)}
          onOpenMobileSearch={() => setIsMobileSearchOpen(true)}
          wishlistCount={wishlistCount}
          cartCount={cartCount}
        />

        {/* 3. Mattresses Mega Menu */}
        <MattressesMegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      {/* 4. Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={() => setIsMobileSearchOpen(true)}
      />

      {/* 5. Mobile Search Modal Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full bg-[#F8FAFC] text-[#0A2540]"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-sm font-serif font-semibold text-[#0A2E73] mb-3">
              Search MINDFREE
            </div>
            <SearchBar onSearch={() => setIsMobileSearchOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};
