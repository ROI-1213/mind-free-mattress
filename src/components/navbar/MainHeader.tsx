import React from 'react';
import { Menu, Search } from 'lucide-react';
import { MindfreeLogo } from './MindfreeLogo';
import { SearchBar } from './SearchBar';
import { HeaderActions } from './HeaderActions';
import { NavLinks } from './NavLinks';

interface MainHeaderProps {
  activeMegaMenu: boolean;
  onToggleMegaMenu: () => void;
  onOpenMegaMenu: () => void;
  onCloseMegaMenu: () => void;
  onOpenMobileMenu: () => void;
  onOpenMobileSearch: () => void;
  wishlistCount?: number;
  cartCount?: number;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  activeMegaMenu,
  onToggleMegaMenu,
  onOpenMegaMenu,
  onCloseMegaMenu,
  onOpenMobileMenu,
  onOpenMobileSearch,
  wishlistCount = 0,
  cartCount = 0,
}) => {
  return (
    <div className="w-full bg-white border-b border-[#E2E8F0]/80 select-none relative z-30">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header Layout: Compact Single-Row Balanced Header */}
        <div className="hidden lg:flex items-center justify-between gap-5 xl:gap-8 h-[68px]">
          {/* Left: Reduced Brand Logo */}
          <div className="shrink-0 flex items-center">
            <MindfreeLogo />
          </div>

          {/* Center-Left: Navigation Links */}
          <div className="shrink-0 flex items-center">
            <NavLinks
              activeMegaMenu={activeMegaMenu}
              onToggleMegaMenu={onToggleMegaMenu}
              onOpenMegaMenu={onOpenMegaMenu}
              onCloseMegaMenu={onCloseMegaMenu}
            />
          </div>

          {/* Center-Right: Search Bar */}
          <div className="flex-1 max-w-[380px] xl:max-w-[460px]">
            <SearchBar />
          </div>

          {/* Far Right: Account, Wishlist, Cart */}
          <div className="shrink-0 flex items-center justify-end pl-2 border-l border-[#E2E8F0]">
            <HeaderActions wishlistCount={wishlistCount} cartCount={cartCount} />
          </div>
        </div>

        {/* Mobile & Tablet Header Bar — Clean App Header (Main Actions Moved to Fixed Bottom Nav) */}
        <div className="flex lg:hidden items-center justify-between py-2 min-h-[60px]">
          {/* Left: Brand Logo */}
          <div className="shrink-0 flex items-center">
            <MindfreeLogo size="sm" />
          </div>

          {/* Right: Thumb-Friendly Search & Menu Buttons (48x48px touch targets) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenMobileSearch}
              className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-2xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] flex items-center justify-center text-[#0A2540] hover:text-[#0A2E73] active:scale-95 transition-all duration-200 shadow-2xs focus:outline-none cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Hamburger menu button at far right end */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-2xl bg-[#0A2E73] hover:bg-[#071F52] text-white flex items-center justify-center active:scale-95 transition-all duration-200 shadow-[0_4px_12px_rgba(10,46,115,0.2)] focus:outline-none cursor-pointer"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
