import React from 'react';
import {
  ArrowRight,
  Heart,
  Minus,
  Moon,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  Lock,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';

export const MindfreeCartPage: React.FC = () => {
  const {
    items,
    cartCount,
    subtotal,
    totalSavings,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    isWishlisted,
  } = useCart();
  const { navigateToHome, navigateToProduct, navigateToCheckout } = useNavigation();

  const handleCheckout = () => {
    navigateToCheckout();
  };

  return (
    <div className="w-full bg-[#F8FAFC] min-h-[80vh] py-10 sm:py-14 select-none font-sans text-[#071F52]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* 1. Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#64748B] mb-6">
          <button
            type="button"
            onClick={navigateToHome}
            className="hover:text-[#0A2E73] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#0A2E73] font-medium">Shopping Cart</span>
        </nav>

        {/* 2. Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#071F52] tracking-tight">
                Your Sleep Essentials
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#0A2E73] text-[#F8FAFC] text-xs font-semibold">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#55645D]">
              Review your selection before preparing for better sleep.
            </p>
          </div>

          <button
            type="button"
            onClick={navigateToHome}
            className="text-xs font-semibold text-[#0A2E73] hover:text-[#E3262E] transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>← Continue Shopping</span>
          </button>
        </div>

        {/* Empty Cart State vs Main Cart */}
        {items.length === 0 ? (
          /* 8. Empty Cart State */
          <div className="max-w-3xl mx-auto py-12 px-6 text-center bg-white rounded-3xl border border-[#E2E8F0] shadow-sm">
            <div className="relative w-48 sm:w-64 aspect-[16/10] mx-auto mb-6 rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm">
              <img
                src="/images/mindfree/final-cta-bedroom.webp"
                alt="Mindfree luxury bedroom"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#071F52] mb-2">
              Your next great night’s sleep starts here.
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto mb-8">
              Your cart is waiting for something comfortable. Discover our handcrafted collection of orthopedic, memory foam, botanical latex, and pocket spring mattresses.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={navigateToHome}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC] text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Mattresses</span>
              </button>
              <button
                type="button"
                onClick={navigateToHome}
                className="text-xs font-semibold text-[#0A2E73] hover:text-[#E3262E] py-2 px-4 transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          /* Main 2-Column Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left: Cart Items List (Col 1-8) */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => {
                const isItemWishlisted = isWishlisted(item.id);

                return (
                  <div
                    key={item.sku}
                    className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between transition-all hover:border-[#E3262E]/40"
                  >
                    {/* Thumbnail & Title Info */}
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div
                        onClick={() => navigateToProduct(item.id)}
                        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC] shrink-0 cursor-pointer group"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E3262E] block mb-1">
                          MINDFREE MATTRESS
                        </span>
                        <h3
                          onClick={() => navigateToProduct(item.id)}
                          className="text-base sm:text-lg font-serif font-bold text-[#071F52] hover:text-[#0A2E73] cursor-pointer truncate mb-1"
                        >
                          {item.name}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#55645D] mb-2">
                          <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] font-medium">
                            {item.size}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] font-medium">
                            {item.thickness}
                          </span>
                        </div>

                        <div className="text-[11px] font-mono text-[#94A3B8]">
                          SKU: {item.sku}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls & Line-Item Price */}
                    <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E2E8F0]">
                      {/* Price */}
                      <div className="text-left sm:text-right">
                        <div className="text-base sm:text-lg font-serif font-bold text-[#071F52]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-[#64748B]">
                          ₹{item.price.toLocaleString('en-IN')} each
                        </div>
                      </div>

                      {/* Quantity Controller & Actions */}
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg hover:bg-white flex items-center justify-center text-[#071F52] transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-bold text-xs text-[#071F52]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg hover:bg-white flex items-center justify-center text-[#071F52] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Move to Wishlist */}
                        <button
                          type="button"
                          onClick={() => toggleWishlist(item.id)}
                          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                            isItemWishlisted
                              ? 'border-red-200 bg-red-50 text-red-600'
                              : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#E3262E] text-[#64748B] hover:text-[#0A2E73]'
                          }`}
                          aria-label={isItemWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
                          title={isItemWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
                        >
                          <Heart className={`w-4 h-4 ${isItemWishlisted ? 'fill-red-500' : ''}`} />
                        </button>

                        {/* Remove Action */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.sku)}
                          className="w-9 h-9 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-red-50 hover:border-red-200 text-[#64748B] hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Remove item from cart"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Sticky Order Summary (Col 9-12) */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm">
                <h2 className="text-lg font-serif font-bold text-[#071F52] mb-4 pb-3 border-b border-[#E2E8F0]">
                  Order Summary
                </h2>

                <div className="space-y-3 text-xs sm:text-[13px] text-[#55645D] mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-semibold text-[#071F52]">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-800">
                      <span>Promotional Savings</span>
                      <span className="font-bold">
                        -₹{totalSavings.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>White-Glove Room Delivery & Setup</span>
                    <span className="font-bold text-emerald-800">FREE</span>
                  </div>

                  <div className="flex justify-between text-[11px] text-[#94A3B8]">
                    <span>Taxes & GST</span>
                    <span>Included</span>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex items-baseline justify-between text-base sm:text-lg font-serif font-bold text-[#071F52]">
                    <span>Estimated Total</span>
                    <span className="text-xl sm:text-2xl text-[#0A2E73]">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Checkout Action Button */}
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-4 px-6 rounded-2xl bg-[#0A2E73] hover:bg-[#071F52] active:scale-[0.99] text-[#F8FAFC] font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#0A2E73]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-[#E3262E]" />
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <p className="text-[10.5px] text-center text-[#94A3B8] mt-3">
                  Encrypted 256-bit checkout • Instant order confirmation
                </p>
              </div>

              {/* Guarantees Box */}
              <div className="p-5 rounded-2xl bg-white/70 border border-[#E2E8F0] space-y-3 text-xs text-[#55645D]">
                <div className="flex items-center gap-2.5">
                  <Moon className="w-4 h-4 text-[#E3262E] shrink-0" />
                  <span><strong>100-Night Trial</strong> — Risk-free comfort guarantee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#E3262E] shrink-0" />
                  <span><strong>10-Year Warranty</strong> — Unrivaled craftsmanship</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#E3262E] shrink-0" />
                  <span><strong>White-Glove Setup</strong> — Unpacked in your bedroom</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#E3262E] shrink-0" />
                  <span><strong>Complimentary Old Mattress Removal</strong></span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
