import React, { useState, useEffect } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { type MattressProductDetail } from '../../data/pdpData';
import { useCart } from '../../context/CartContext';

interface ProductStickyMobileBarProps {
  product: MattressProductDetail;
}

export const ProductStickyMobileBar: React.FC<ProductStickyMobileBarProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 650px on mobile
      if (window.scrollY > 650) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const defaultSize = product.sizes.find((s) => s.isPopular) || product.sizes[0];

  const handleQuickAdd = () => {
    addToCart(
      {
        id: product.id,
        sku: defaultSize.sku,
        name: product.name,
        size: defaultSize.label,
        thickness: product.thicknessOptions[0].label,
        price: defaultSize.price,
        originalPrice: defaultSize.originalPrice,
        image: product.gallery[0].url,
      },
      1
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <aside
      aria-label="Quick purchase bar"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] px-4 py-3 shadow-[0_-8px_24px_rgba(10,46,115,0.08)] select-none animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={product.gallery[0].url}
            alt={product.name}
            className="w-11 h-11 rounded-lg object-cover border border-[#E2E8F0] shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-serif font-bold text-[#071F52] truncate">
              {product.name}
            </h4>
            <div className="text-xs text-[#0A2E73] font-bold">
              ₹{defaultSize.price.toLocaleString('en-IN')}{' '}
              <span className="text-[10px] text-[#94A3B8] font-normal line-through">
                ₹{defaultSize.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleQuickAdd}
          className="px-5 py-2.5 rounded-xl bg-[#0A2E73] text-[#F8FAFC] text-xs font-semibold tracking-wide shadow-md active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#E3262E]" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
