import React from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Moon,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalSavings,
  } = useCart();
  const { navigateToHome, navigateToCheckout } = useNavigation();

  if (!isCartOpen) return null;

  const handleStartCheckout = () => {
    closeCart();
    navigateToCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Dark Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Shopping Cart Drawer"
          className="w-screen max-w-md bg-[#F8FAFC] shadow-2xl flex flex-col justify-between border-l border-[#E2E8F0] animate-in slide-in-from-right duration-300 relative"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0A2E73]" />
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#071F52]">
                Your Sleep Sanctuary ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="w-8 h-8 rounded-full bg-[#F8FAFC] hover:bg-[#DBEAFE] flex items-center justify-center text-[#071F52] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Delivery & Assurance Strip */}
          <div className="px-5 sm:px-6 py-2.5 bg-[#0A2E73] text-[#F8FAFC] text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#E3262E]" />
              Free White-Glove Setup Unlocked
            </span>
            <span className="text-[#E3262E] font-bold">100 Nights Trial</span>
          </div>

          {/* Body: Items or Empty State */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-[#E3262E] mx-auto mb-3 opacity-60" />
                <h3 className="font-serif text-xl font-bold text-[#071F52] mb-1">
                  Your Sleep Bag is Empty
                </h3>
                <p className="text-xs text-[#64748B] max-w-xs mx-auto mb-6">
                  Explore our handcrafted mattresses engineered with botanical latex, memory foam, and pocket coils.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    navigateToHome();
                  }}
                  className="px-6 py-3 rounded-full bg-[#0A2E73] text-[#F8FAFC] text-xs font-semibold hover:bg-[#071F52] transition-all cursor-pointer shadow-md"
                >
                  Explore Mattresses
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.sku}
                  className="p-4 rounded-2xl bg-white border border-[#E2E8F0] flex gap-3.5 shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border border-[#E2E8F0] shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-serif font-bold text-[#071F52] truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.sku)}
                          className="text-[#94A3B8] hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#64748B] mt-0.5">
                        {item.size} • {item.thickness}
                      </div>
                      <div className="text-[10px] font-mono text-[#94A3B8]">
                        SKU: {item.sku}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E2E8F0]">
                      <div className="flex items-center gap-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#071F52] hover:bg-white rounded cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#071F52]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#071F52] hover:bg-white rounded cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold text-[#0A2E73]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#E2E8F0] space-y-3 shadow-lg">
              <div className="space-y-1.5 text-xs text-[#64748B]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#071F52]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Promotional Savings</span>
                    <span className="font-semibold">
                      -₹{totalSavings.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Room Setup</span>
                  <span className="text-emerald-800 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-serif font-bold text-[#071F52] pt-2 border-t border-[#E2E8F0]">
                  <span>Total Amount</span>
                  <span className="text-[#0A2E73]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartCheckout}
                className="w-full py-3.5 px-6 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC] font-semibold text-xs sm:text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10.5px] text-[#94A3B8] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#E3262E]" /> 10-Yr Warranty
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Moon className="w-3 h-3 text-[#E3262E]" /> 100 Nights Trial
                </span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
