import React from 'react';
import { Home, BedDouble, Sparkles, Heart, ShoppingBag, User } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const {
    currentView,
    navigateToHome,
    navigateToMattresses,
    navigateToPillows,
    navigateToWishlist,
    navigateToAccount,
  } = useNavigation();
  const { cartCount, wishlist, openCart, isCartOpen } = useCart();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      isActive: currentView === 'home' && !isCartOpen,
      onClick: () => {
        navigateToHome();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      badge: 0,
    },
    {
      id: 'mattresses',
      label: 'Mattresses',
      icon: BedDouble,
      isActive: (currentView === 'mattresses' || currentView === 'product') && !isCartOpen,
      onClick: () => navigateToMattresses('all'),
      badge: 0,
    },
    {
      id: 'pillows',
      label: 'Pillows',
      icon: Sparkles,
      isActive: currentView === 'pillows' && !isCartOpen,
      onClick: () => navigateToPillows(),
      badge: 0,
    },
    {
      id: 'wishlist',
      label: 'Saved',
      icon: Heart,
      isActive: currentView === 'wishlist' && !isCartOpen,
      onClick: () => navigateToWishlist(),
      badge: wishlist.length,
    },
    {
      id: 'cart',
      label: 'Bag',
      icon: ShoppingBag,
      isActive: isCartOpen || currentView === 'cart' || currentView === 'checkout',
      onClick: () => openCart(),
      badge: cartCount,
    },
    {
      id: 'account',
      label: 'Account',
      icon: User,
      isActive: currentView === 'account' && !isCartOpen,
      onClick: () => navigateToAccount(),
      badge: 0,
    },
  ];

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#E2E8F0] shadow-[0_-8px_30px_rgba(10,46,115,0.12)] select-none"
      style={{
        paddingBottom: 'max(0.35rem, env(safe-area-inset-bottom))',
      }}
    >
      {/* Subtle Top Brand Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#0A2E73]/20 via-[#E3262E]/50 to-[#0A2E73]/20" />

      <div className="grid grid-cols-6 items-center px-1.5 pt-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={`relative flex flex-col items-center justify-center min-h-[52px] py-1.5 px-1 rounded-2xl transition-all duration-200 active:scale-92 cursor-pointer focus:outline-none ${
                active
                  ? 'text-[#0A2E73]'
                  : 'text-[#64748B] hover:text-[#0A2E73]'
              }`}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              {/* Active Top Indicator Pill */}
              {active && (
                <span className="absolute top-0.5 w-6 h-[3px] rounded-full bg-[#E3262E] shadow-[0_2px_8px_rgba(227,38,46,0.5)] transition-all duration-300" />
              )}

              {/* Icon Container with Optional Badge */}
              <div
                className={`relative flex items-center justify-center w-9 h-7 rounded-xl transition-all duration-200 ${
                  active ? 'bg-[#0A2E73]/10 text-[#0A2E73]' : 'bg-transparent'
                }`}
              >
                <Icon
                  className={`w-[19px] h-[19px] transition-transform duration-200 ${
                    active ? 'stroke-[2.3] scale-105' : 'stroke-[1.9]'
                  }`}
                />

                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#E3262E] text-white text-[9.5px] font-bold flex items-center justify-center shadow-[0_2px_6px_rgba(227,38,46,0.4)] ring-2 ring-white">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>

              {/* Crisp Label */}
              <span
                className={`mt-0.5 text-[10px] leading-tight tracking-tight truncate max-w-full transition-colors duration-200 ${
                  active ? 'font-bold text-[#0A2E73]' : 'font-medium text-[#64748B]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
