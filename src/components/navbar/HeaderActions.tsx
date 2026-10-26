import React, { useState } from 'react';
import { User, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderActionsProps {
  wishlistCount?: number;
  cartCount?: number;
  className?: string;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  wishlistCount: propWishlistCount = 0,
  cartCount: propCartCount = 0,
  className = '',
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { navigateToAccount, navigateToWishlist } = useNavigation();
  const { user } = useAuth();
  
  // Safe consumption of CartContext
  let cartCount = propCartCount;
  let wishlistCount = propWishlistCount;
  let openCartFn = () => setActiveModal((prev) => (prev === 'cart' ? null : 'cart'));

  try {
    const cart = useCart();
    cartCount = cart.cartCount;
    wishlistCount = cart.wishlist.length;
    openCartFn = cart.openCart;
  } catch {
    // Fallback if rendered outside CartProvider
  }

  return (
    <div className={`flex items-center space-x-3.5 sm:space-x-5 lg:space-x-7 select-none ${className}`}>
      {/* Account */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setActiveModal(null);
            navigateToAccount(undefined, 'orders');
          }}
          className="flex flex-col items-center group cursor-pointer focus:outline-none"
          aria-label="User Account"
        >
          <div className="relative text-[#0A2540] group-hover:text-[#0A2E73] transition-colors p-0.5">
            <User className="w-5 h-5 stroke-[1.6]" />
            {user && (
              <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white" />
            )}
          </div>
          <span className="hidden sm:block text-[11px] font-normal text-[#0A2540] group-hover:text-[#0A2E73] transition-colors mt-0.5 truncate max-w-[64px]">
            {user ? user.fullName.split(' ')[0] : 'Account'}
          </span>
        </button>
      </div>

      {/* Wishlist */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setActiveModal(null);
            navigateToWishlist();
          }}
          className="flex flex-col items-center group cursor-pointer focus:outline-none"
          aria-label="Wishlist items"
        >
          <div className="relative text-[#0A2540] group-hover:text-[#0A2E73] transition-colors p-0.5">
            <Heart className="w-5 h-5 stroke-[1.6]" />
            {/* Crimson quantity badge */}
            <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] bg-[#E3262E] text-white text-[9.5px] font-semibold rounded-full flex items-center justify-center px-0.5 shadow-xs">
              {wishlistCount}
            </span>
          </div>
          <span className="hidden sm:block text-[11px] font-normal text-[#0A2540] group-hover:text-[#0A2E73] transition-colors mt-0.5">
            Wishlist
          </span>
        </button>
      </div>

      {/* Cart */}
      <div className="relative">
        <button
          type="button"
          onClick={openCartFn}
          className="flex flex-col items-center group cursor-pointer focus:outline-none"
          aria-label="Shopping Cart"
        >
          <div className="relative text-[#0A2540] group-hover:text-[#0A2E73] transition-colors p-0.5">
            <ShoppingCart className="w-5 h-5 stroke-[1.6]" />
            {/* Crimson quantity badge */}
            <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] bg-[#E3262E] text-white text-[9.5px] font-semibold rounded-full flex items-center justify-center px-0.5 shadow-xs">
              {cartCount}
            </span>
          </div>
          <span className="hidden sm:block text-[11px] font-normal text-[#0A2540] group-hover:text-[#0A2E73] transition-colors mt-0.5">
            Cart
          </span>
        </button>

        {activeModal === 'cart' && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_12px_32px_rgba(10,46,115,0.12)] p-4 z-50 animate-in fade-in duration-150 text-center">
            <ShoppingCart className="w-8 h-8 text-[#0A2E73] mx-auto mb-2 opacity-60" />
            <p className="text-xs font-semibold text-[#0A2540]">Your Sleep Bag is Empty</p>
            <p className="text-[11px] text-[#747A78] mt-1">Add a mattress to unlock 100 Nights Risk Free Trial & Free Delivery.</p>
            <a
              href="/mattresses/all"
              className="mt-3 block w-full py-1.5 bg-[#0A2E73] text-white text-xs font-medium rounded-full hover:bg-[#071F52] transition"
            >
              Shop Mattresses
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
