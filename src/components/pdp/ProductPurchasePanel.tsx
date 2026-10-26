import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Heart,
  MapPin,
  Minus,
  Moon,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Zap,
} from 'lucide-react';
import {
  type MattressProductDetail,
  type ProductSizeOption,
  type ProductThicknessOption,
} from '../../data/pdpData';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';

interface ProductPurchasePanelProps {
  product: MattressProductDetail;
}

export const ProductPurchasePanel: React.FC<ProductPurchasePanelProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, openCart } = useCart();
  const { navigateToHome } = useNavigation();

  // Selected Variants
  const [selectedSize, setSelectedSize] = useState<ProductSizeOption>(
    () => product.sizes.find((s) => s.isPopular) || product.sizes[0]
  );
  const [selectedThickness, setSelectedThickness] = useState<ProductThicknessOption>(
    () => product.thicknessOptions[0]
  );
  const [quantity, setQuantity] = useState(1);

  // Delivery Pincode Checker
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Add to cart feedback
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // Dynamic calculations
  const currentPrice = selectedSize.price + selectedThickness.priceDelta;
  const currentOriginalPrice = selectedSize.originalPrice + selectedThickness.priceDelta;
  const savings = currentOriginalPrice - currentPrice;
  const savingsPercent = Math.round((savings / currentOriginalPrice) * 100);

  // Dynamic SKU
  const currentSku = `${selectedSize.sku}-${selectedThickness.id.replace('-inch', '')}`;

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setPincodeStatus(`Available for delivery to ${pincode} in 2–4 business days. Free White-Glove installation included.`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        sku: currentSku,
        name: product.name,
        size: selectedSize.label,
        thickness: selectedThickness.label,
        price: currentPrice,
        originalPrice: currentOriginalPrice,
        image: product.gallery[0].url,
      },
      quantity
    );

    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        id: product.id,
        sku: currentSku,
        name: product.name,
        size: selectedSize.label,
        thickness: selectedThickness.label,
        price: currentPrice,
        originalPrice: currentOriginalPrice,
        image: product.gallery[0].url,
      },
      quantity
    );
    openCart();
  };

  const isFavorite = isWishlisted(product.id);

  return (
    <div className="w-full flex flex-col justify-start select-none">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-[#64748B] mb-4">
        <button
          type="button"
          onClick={navigateToHome}
          className="hover:text-[#0A2E73] transition-colors cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={navigateToHome}
          className="hover:text-[#0A2E73] transition-colors cursor-pointer"
        >
          Mattresses
        </button>
        <span>/</span>
        <span className="text-[#0A2E73] font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* 2. Category & Rating Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E3262E]">
          {product.category}
        </span>

        {/* Rating and Reviews Count */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[#E3262E]">
            <Star className="w-4 h-4 fill-[#E3262E]" />
            <span className="text-xs font-bold text-[#071F52]">{product.rating}</span>
          </div>
          <span className="text-xs text-[#64748B]">
            ({product.reviewsCount} verified reviews)
          </span>
        </div>
      </div>

      {/* 3. Product Title & Tagline */}
      <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-light text-[#071F52] tracking-tight leading-[1.15] mb-2">
        {product.name}
      </h1>

      <p className="text-xs sm:text-sm text-[#E3262E] font-medium italic font-serif mb-4">
        {product.tagline}
      </p>

      {/* 4. Pricing Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/70 border border-[#E2E8F0] mb-6 shadow-xs">
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-2xl sm:text-3xl font-serif font-bold text-[#071F52]">
            ₹{currentPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-sm sm:text-base text-[#94A3B8] line-through">
            ₹{currentOriginalPrice.toLocaleString('en-IN')}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#0A2E73]/10 text-[#0A2E73] text-xs font-bold tracking-wide">
            Save ₹{savings.toLocaleString('en-IN')} ({savingsPercent}% OFF)
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-[#64748B]">
          <span>Includes all taxes</span>
          <span>•</span>
          <span className="text-[#0A2E73] font-medium flex items-center gap-1">
            <Truck className="w-3 h-3 text-[#E3262E]" /> Free White-Glove Room Delivery
          </span>
        </div>
      </div>

      {/* 5. Size Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#071F52]">
            Select Size
          </label>
          <span className="text-xs text-[#64748B]">
            Selected: <strong className="text-[#071F52]">{selectedSize.label}</strong> ({selectedSize.dimensionsInches})
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {product.sizes.map((size) => {
            const isSelected = selectedSize.id === size.id;
            return (
              <button
                key={size.id}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer relative ${
                  isSelected
                    ? 'border-[#0A2E73] bg-[#0A2E73] text-[#F8FAFC] shadow-md ring-2 ring-[#E3262E]/40'
                    : 'border-[#E2E8F0] bg-white/60 hover:bg-white text-[#071F52] hover:border-[#E3262E]'
                }`}
              >
                {size.isPopular && !isSelected && (
                  <span className="absolute -top-2 right-2 text-[9px] font-bold bg-[#E3262E] text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                )}
                <div className="text-xs font-bold leading-tight">{size.label}</div>
                <div
                  className={`text-[10px] mt-0.5 ${
                    isSelected ? 'text-[#F8FAFC]/80' : 'text-[#64748B]'
                  }`}
                >
                  {size.dimensionsInches}
                </div>
                <div
                  className={`text-[11px] font-semibold mt-1.5 ${
                    isSelected ? 'text-[#E3262E]' : 'text-[#0A2E73]'
                  }`}
                >
                  ₹{size.price.toLocaleString('en-IN')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Thickness / Height Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#071F52]">
            Select Thickness
          </label>
          <span className="text-xs text-[#64748B]">
            {selectedThickness.description}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {product.thicknessOptions.map((th) => {
            const isSelected = selectedThickness.id === th.id;
            return (
              <button
                key={th.id}
                type="button"
                onClick={() => setSelectedThickness(th)}
                className={`py-2.5 px-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-[#0A2E73] bg-[#0A2E73] text-[#F8FAFC] shadow-md ring-2 ring-[#E3262E]/40'
                    : 'border-[#E2E8F0] bg-white/60 hover:bg-white text-[#071F52] hover:border-[#E3262E]'
                }`}
              >
                <div className="text-xs font-semibold">{th.label}</div>
                <div
                  className={`text-[10.5px] mt-0.5 ${
                    isSelected ? 'text-[#E3262E]' : 'text-[#64748B]'
                  }`}
                >
                  {th.priceDelta === 0 ? 'Standard' : `+₹${th.priceDelta.toLocaleString('en-IN')}`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Firmness Gauge Visual Indicator */}
      <div className="p-4 rounded-2xl bg-white/60 border border-[#E2E8F0] mb-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-[#071F52]">Firmness Feel</span>
          <span className="text-[#E3262E] font-bold">{product.firmnessLabel}</span>
        </div>
        
        {/* Visual Bar */}
        <div className="relative w-full h-2 rounded-full bg-[#E5E0D5] overflow-hidden mb-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#E3262E] to-[#0A2E73]"
            style={{ width: `${(product.firmnessScore / 10) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#94A3B8] uppercase tracking-wider">
          <span>Plush / Soft (1)</span>
          <span>Medium (5)</span>
          <span>Firm (10)</span>
        </div>
        <p className="text-[11.5px] text-[#55645D] mt-2 leading-relaxed">
          {product.firmnessDescription}
        </p>
      </div>

      {/* 8. Live SKU & Inventory Status */}
      <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] mb-6">
        <span className="text-[#64748B] font-mono text-[11px]">
          SKU: <strong>{currentSku}</strong>
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          In Stock (Ships in 24–48 hrs)
        </span>
      </div>

      {/* 9. Pincode Availability Checker */}
      <form onSubmit={handleCheckPincode} className="mb-6">
        <label htmlFor="pincode-input" className="text-xs font-semibold text-[#071F52] block mb-1.5">
          Delivery & Installation Availability
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <MapPin className="w-4 h-4 text-[#E3262E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="pincode-input"
              type="text"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter 6-digit delivery PIN"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-xs text-[#071F52] focus:outline-none focus:border-[#E3262E]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] text-[#F8FAFC] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
          >
            Check
          </button>
        </div>
        {pincodeStatus && (
          <p className="text-[11px] text-[#0A2E73] mt-1.5 flex items-start gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#E3262E] shrink-0 mt-0.5" />
            <span>{pincodeStatus}</span>
          </p>
        )}
      </form>

      {/* 10. Purchase Actions (Quantity + Add to Cart + Buy Now + Wishlist) */}
      <div className="space-y-3 pt-2 mb-8 border-t border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="inline-flex items-center rounded-xl border border-[#E2E8F0] bg-white p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-9 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-center text-[#071F52] cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-bold text-xs text-[#071F52]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-9 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-center text-[#071F52] cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3.5 px-6 rounded-xl bg-[#0A2E73] hover:bg-[#071F52] active:scale-[0.99] text-[#F8FAFC] font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#0A2E73]/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-[#E3262E]/30"
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-4 h-4 text-[#E3262E]" />
                <span>Added to Sleep Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 stroke-[2]" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isFavorite
                ? 'border-red-300 bg-red-50 text-red-600 shadow-sm'
                : 'border-[#E2E8F0] bg-white hover:border-[#E3262E] text-[#64748B] hover:text-[#0A2E73]'
            }`}
            aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Buy Now Button */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full py-3.5 px-6 rounded-xl bg-[#E3262E] hover:bg-[#C81E25] active:scale-[0.99] text-[#071F52] font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-[#071F52]" />
          <span>Buy Now — Instant Checkout</span>
        </button>
      </div>

      {/* 11. Three Brand Reassurance Micro-Pillars */}
      <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/70 border border-[#E2E8F0] text-center">
        <div className="flex flex-col items-center">
          <Moon className="w-4 h-4 text-[#E3262E] mb-1" />
          <span className="text-[11px] font-bold text-[#071F52] block">100 Nights</span>
          <span className="text-[10px] text-[#64748B]">Risk-Free Trial</span>
        </div>
        <div className="flex flex-col items-center border-x border-[#E2E8F0]">
          <ShieldCheck className="w-4 h-4 text-[#E3262E] mb-1" />
          <span className="text-[11px] font-bold text-[#071F52] block">{product.specifications.warranty.split(' ')[0]} Years</span>
          <span className="text-[10px] text-[#64748B]">Warranty</span>
        </div>
        <div className="flex flex-col items-center">
          <RotateCcw className="w-4 h-4 text-[#E3262E] mb-1" />
          <span className="text-[11px] font-bold text-[#071F52] block">Zero Hassle</span>
          <span className="text-[10px] text-[#64748B]">Free Returns</span>
        </div>
      </div>
    </div>
  );
};
