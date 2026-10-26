import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Phone,
  MapPin,
  Compass,
  Award,
  Layers,
  Bed,
  Trash2,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { MindfreeLogo } from './MindfreeLogo';
import { MATTRESS_PRODUCTS } from '../../data/pdpData';

// Available catalogue categories strictly aligned with the 14-model PDF mattress data
export const INNER_NAV_MATTRESS_CATEGORIES = [
  {
    id: 'all',
    slug: 'deluxe',
    name: 'All 14 Mattresses',
    tagline: 'Explore all 14 official models grouped by category',
    badge: 'Complete Range',
    icon: Bed,
  },
  {
    id: 'foam',
    slug: 'deluxe',
    name: 'Foam Mattresses',
    tagline: 'Deluxe, Dream Comfort, Ultra Comfort, Sleep Soft & Classic Comfort',
    badge: '5 Models',
    icon: Layers,
  },
  {
    id: 'spring',
    slug: 'ultima-pocket-spring',
    name: 'Spring Mattresses',
    tagline: 'Sweet Dream, Royale, Ultima Pocket Spring, Elite, Spinal Care & Luxury',
    badge: '6 Models',
    icon: Compass,
  },
  {
    id: 'orthopedic',
    slug: 'ortho-firm',
    name: 'Orthopedic & Back Support',
    tagline: 'Ortho Firm & Spinal Care spinal alignment foundations',
    badge: '2 Models',
    icon: ShieldCheck,
  },
  {
    id: 'latex',
    slug: 'natural-latex',
    name: 'Latex & Hybrid Mattresses',
    tagline: 'Natural Latex & Ultra Latex Plus 7-zone botanical latex',
    badge: '2 Models',
    icon: Sparkles,
  },
  {
    id: 'cooling',
    slug: 'sleep-soft',
    name: 'Luxury Cooling & Comfort',
    tagline: 'Sleep Soft, Elite & Luxury CoolTech gel memory foam suites',
    badge: '3 Models',
    icon: Award,
  },
];

export const INNER_NAV_PILLOWS = [
  { name: 'Ergonomic Memory Foam Pillow', subtitle: 'Targeted cervical contour support', price: '₹2,499' },
  { name: 'Natural Botanical Latex Pillow', subtitle: 'Breathable pin-core aeration loft', price: '₹3,299' },
  { name: 'Dual-Zone Cooling Gel Pillow', subtitle: 'Thermoregulating phase-change surface', price: '₹2,999' },
  { name: 'Microfiber Hotel Plush Pillow', subtitle: 'Ultra-fine down-alternative softness', price: '₹1,899' },
];

export const INNER_NAV_ACCESSORIES = [
  { name: 'Waterproof Bamboo Mattress Protector', subtitle: '100% Hypoallergenic breathable shield', price: '₹1,999' },
  { name: 'Organic Long-Staple Cotton Sheet Set', subtitle: '400 Thread count satin finish weave', price: '₹3,499' },
  { name: 'Pure Mulberry Silk Pillowcase Pair', subtitle: 'Skin & hair hydration friction-free surface', price: '₹2,799' },
  { name: 'All-Season Botanical Micro-Loft Duvet', subtitle: 'Lightweight thermal cloud balance', price: '₹4,999' },
];

export const INNER_NAV_GUIDES = [
  {
    title: 'How to Choose Your Firmness',
    description: 'Find your ideal 1 to 10 firmness level based on sleep posture and body weight.',
  },
  {
    title: 'Spine Alignment & Posture Science',
    description: 'Clinical insights on pressure relief and zero-partner motion disturbance.',
  },
  {
    title: 'Mattress Care & 100-Night Trial Guide',
    description: 'How our risk-free bedroom trial and 10-year warranty protection work.',
  },
];

export interface InnerNavbarProps {
  className?: string;
  showAnnouncement?: boolean;
}

export const InnerNavbar: React.FC<InnerNavbarProps> = ({
  className = '',
  showAnnouncement = false,
}) => {
  const {
    currentView,
    productSlug,
    categoryFilter,
    navigateToProduct,
    navigateToMattresses,
    navigateToPillows,
    navigateToAccessories,
    navigateToOurStory,
    navigateToStoreLocator,
    navigateToContact,
    navigateToSearch,
    navigateToWishlist,
    navigateToAccount,
  } = useNavigation();

  const { cartCount, wishlist, toggleWishlist, openCart } = useCart();
  const { user } = useAuth();

  // Scroll detection for sticky frosted glass state
  const [isScrolled, setIsScrolled] = useState(false);

  // Desktop active menu state
  const [openDropdown, setOpenDropdown] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const menu = new URLSearchParams(window.location.search).get('menu');
      if (menu) return menu;
    }
    return null;
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('search') === 'open';
    }
    return false;
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Mobile expandable accordion state
  const [mobileAccordions, setMobileAccordions] = useState<Record<string, boolean>>({
    mattresses: true,
  });

  // Track window scroll for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer or search is open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Handle global Escape key to close any active menu/modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setIsSearchOpen(false);
        setIsWishlistOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debounced dropdown hover handling to prevent flicker
  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(menuId);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 240);
  };


  const toggleMobileAccordion = (key: string) => {
    setMobileAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Live real catalogue search filtering
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return Object.values(MATTRESS_PRODUCTS).filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Wishlisted product snapshots from catalogue
  const wishlistedProducts = useMemo(() => {
    return wishlist
      .map((id) => MATTRESS_PRODUCTS[id])
      .filter((p): p is (typeof MATTRESS_PRODUCTS)[keyof typeof MATTRESS_PRODUCTS] => Boolean(p));
  }, [wishlist]);

  // Active section identification
  const isMattressesActive = currentView === 'mattresses' || currentView === 'product';
  const isPillowsActive = currentView === 'pillows';
  const isAccessoriesActive = currentView === 'accessories';
  const isStoryActive = currentView === 'our-story';
  const isCartActive = currentView === 'cart';
  const isAccountActive = currentView === 'account';
  const isWishlistActive = currentView === 'wishlist';
  const isSearchActive = currentView === 'search';

  return (
    <>
      {/* Optional micro announcement strip */}
      {showAnnouncement && (
        <div className="w-full bg-[#0A2E73] text-[#F8FAFC] text-[11px] font-medium py-1.5 px-4 text-center select-none border-b border-[#071F52] flex items-center justify-center gap-4">
          <span className="flex items-center gap-1.5 text-[#E3262E]">
            <Truck className="w-3.5 h-3.5" />
            <span>Complimentary White-Glove In-Bedroom Setup Across India</span>
          </span>
          <span className="hidden md:inline text-white/30">•</span>
          <span className="hidden md:inline text-white/80">100 Nights Risk-Free Atelier Trial</span>
          <span className="hidden lg:inline text-white/30">•</span>
          <span className="hidden lg:inline text-white/80">10 Years Comprehensive Warranty</span>
        </div>
      )}

      {/* Main Sticky Inner Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 select-none ${
          isScrolled
            ? 'bg-[#F8FAFC]/95 backdrop-blur-md shadow-xs border-b border-[#E2E8F0]'
            : 'bg-[#F8FAFC] border-b border-[#E2E8F0]'
        } ${className}`}
        role="banner"
      >
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[66px] sm:h-[72px] gap-4">
            
            {/* 1. LEFT: Brand Identity & Logo */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-[#0A2E73] hover:bg-[#DBEAFE] rounded-xl transition-colors cursor-pointer"
                aria-label="Open navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-6 h-6 stroke-[1.8]" />
              </button>

              <MindfreeLogo size="sm" />
            </div>

            {/* 2. CENTRE: Primary Navigation on Desktop */}
            <nav
              className="hidden lg:flex items-center space-x-1 xl:space-x-2"
              aria-label="Primary Inner-Page Navigation"
              onMouseLeave={handleMouseLeave}
            >
              {/* Mattresses Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('mattresses')}
              >
                <button
                  type="button"
                  onClick={() => navigateToMattresses('all')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150 cursor-pointer ${
                    isMattressesActive || openDropdown === 'mattresses'
                      ? 'text-[#0A2E73] bg-[#DBEAFE]/80 shadow-2xs'
                      : 'text-[#0F2952] hover:text-[#0A2E73] hover:bg-[#DBEAFE]/50'
                  }`}
                  aria-expanded={openDropdown === 'mattresses'}
                  aria-haspopup="true"
                >
                  <span>Mattresses</span>
                  {openDropdown === 'mattresses' ? (
                    <ChevronUp className="w-3.5 h-3.5 text-[#E3262E] stroke-[2.2]" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#64748B] stroke-[2]" />
                  )}
                  {isMattressesActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3262E]" />
                  )}
                </button>

                {/* Mattresses Tailored Mega Menu Dropdown */}
                {openDropdown === 'mattresses' && (
                  <div
                    className="absolute left-0 top-full pt-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    onMouseEnter={() => handleMouseEnter('mattresses')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-[740px] xl:w-[780px] bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_20px_50px_rgba(10,46,115,0.12)] p-6 overflow-hidden grid grid-cols-12 gap-6">
                      
                      {/* Left: 7 Catalogue Categories (7 cols) */}
                      <div className="col-span-7 space-y-2 border-r border-[#E2E8F0] pr-4">
                        <div className="flex items-center justify-between pb-2 mb-1 border-b border-[#E2E8F0]">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-[#E3262E] font-bold">
                            Atelier Mattress Catalogue
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setOpenDropdown(null);
                              navigateToMattresses('all');
                            }}
                            className="text-[10px] text-[#0A2E73] font-semibold hover:underline cursor-pointer"
                          >
                            View All 7 Collections →
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-1">
                          {INNER_NAV_MATTRESS_CATEGORIES.map((cat) => {
                            const IconComponent = cat.icon;
                            const isSelectedProduct =
                              (currentView === 'mattresses' && categoryFilter === cat.id) ||
                              (currentView === 'product' && productSlug === cat.id);

                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                  setOpenDropdown(null);
                                  navigateToMattresses(cat.id);
                                }}
                                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all cursor-pointer group ${
                                  isSelectedProduct
                                    ? 'bg-[#F8FAFC] border border-[#E3262E]/40 shadow-xs'
                                    : 'hover:bg-[#F8FAFC] border border-transparent'
                                }`}
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-8 h-8 rounded-xl bg-[#DBEAFE] group-hover:bg-[#0A2E73] text-[#0A2E73] group-hover:text-[#F8FAFC] flex items-center justify-center shrink-0 transition-colors">
                                    <IconComponent className="w-4 h-4 stroke-[1.8]" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-serif font-bold text-[#071F52] group-hover:text-[#0A2E73] truncate">
                                        {cat.name}
                                      </span>
                                      {cat.badge && (
                                        <span className="px-1.5 py-0.2 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[9px] font-medium text-[#E3262E]">
                                          {cat.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                                      {cat.tagline}
                                    </p>
                                  </div>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-[#E3262E] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Editorial Craftsmanship Showcase & Mattress Finder Card (5 cols) */}
                      <div className="col-span-5 flex flex-col justify-between space-y-4">
                        {/* Craftsmanship Card */}
                        <div
                          onClick={() => {
                            setOpenDropdown(null);
                            navigateToOurStory();
                          }}
                          className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0] cursor-pointer hover:border-[#E3262E]/40 transition-colors"
                        >
                          <div className="relative h-28 rounded-xl overflow-hidden mb-3 bg-[#0A2E73]">
                            <img
                              src="/images/mindfree/mindfree-orthopedic.webp"
                              alt="Mindfree Luxury Craftsmanship"
                              className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = '/images/type_ortho.png';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                              <span className="text-[10px] font-serif italic text-white/95">
                                Belgian Damask & Botanical Latex
                              </span>
                            </div>
                          </div>
                          <h4 className="text-xs font-serif font-bold text-[#071F52] mb-1">
                            Bespoke Atelier Commissioning
                          </h4>
                          <p className="text-[11px] text-[#64748B] leading-relaxed">
                            Each mattress is handcrafted to order with individual multi-zone tempering and white-glove setup.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* Pillows Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('pillows')}
              >
                <button
                  type="button"
                  onClick={() => navigateToPillows()}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150 cursor-pointer ${
                    isPillowsActive || openDropdown === 'pillows'
                      ? 'text-[#0A2E73] bg-[#DBEAFE]/80'
                      : 'text-[#0F2952] hover:text-[#0A2E73] hover:bg-[#DBEAFE]/50'
                  }`}
                  aria-expanded={openDropdown === 'pillows'}
                  aria-haspopup="true"
                >
                  <span>Pillows</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#64748B] stroke-[2]" />
                  {isPillowsActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3262E]" />
                  )}
                </button>

                {openDropdown === 'pillows' && (
                  <div
                    className="absolute left-0 top-full pt-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    onMouseEnter={() => handleMouseEnter('pillows')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-72 bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_16px_40px_rgba(10,46,115,0.12)] p-4 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#E3262E] font-bold px-2 py-1 border-b border-[#E2E8F0] mb-1">
                        <span>Cervical Ergonomics</span>
                        <span className="text-[9px] text-[#64748B]">Explore All →</span>
                      </div>
                      {INNER_NAV_PILLOWS.map((pillow, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setOpenDropdown(null);
                            navigateToPillows();
                          }}
                          className="p-2.5 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-serif font-bold text-[#071F52] group-hover:text-[#0A2E73]">
                              {pillow.name}
                            </span>
                            <span className="text-[11px] font-mono text-[#E3262E] font-semibold">
                              {pillow.price}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-[#64748B] mt-0.5">
                            {pillow.subtitle}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Accessories Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('accessories')}
              >
                <button
                  type="button"
                  onClick={() => navigateToAccessories()}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150 cursor-pointer ${
                    isAccessoriesActive || openDropdown === 'accessories'
                      ? 'text-[#0A2E73] bg-[#DBEAFE]/80'
                      : 'text-[#0F2952] hover:text-[#0A2E73] hover:bg-[#DBEAFE]/50'
                  }`}
                  aria-expanded={openDropdown === 'accessories'}
                  aria-haspopup="true"
                >
                  <span>Accessories</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#64748B] stroke-[2]" />
                  {isAccessoriesActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3262E]" />
                  )}
                </button>

                {openDropdown === 'accessories' && (
                  <div
                    className="absolute left-0 top-full pt-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    onMouseEnter={() => handleMouseEnter('accessories')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-80 bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_16px_40px_rgba(10,46,115,0.12)] p-4 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#E3262E] font-bold px-2 py-1 border-b border-[#E2E8F0] mb-1">
                        <span>Bedding Sanctuary Essentials</span>
                        <span className="text-[9px] text-[#64748B]">Explore All →</span>
                      </div>
                      {INNER_NAV_ACCESSORIES.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setOpenDropdown(null);
                            navigateToAccessories();
                          }}
                          className="p-2.5 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-serif font-bold text-[#071F52] group-hover:text-[#0A2E73]">
                              {item.name}
                            </span>
                            <span className="text-[11px] font-mono text-[#E3262E] font-semibold">
                              {item.price}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-[#64748B] mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Our Story Link */}
              <button
                type="button"
                onClick={() => navigateToOurStory()}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer ${
                  isStoryActive
                    ? 'text-[#0A2E73] bg-[#DBEAFE]/80'
                    : 'text-[#0F2952] hover:text-[#0A2E73] hover:bg-[#DBEAFE]/50'
                }`}
              >
                <span>Our Story</span>
                {isStoryActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E3262E]" />
                )}
              </button>
            </nav>

            {/* 3. RIGHT: Utility Icons (Search, Wishlist, Account, Shopping Bag) */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
              
              {/* Search Icon Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 sm:p-2.5 rounded-2xl transition-colors cursor-pointer focus:outline-none relative group ${
                  isSearchActive ? 'bg-[#DBEAFE] text-[#0A2E73]' : 'text-[#0A2E73] hover:bg-[#DBEAFE]'
                }`}
                aria-label="Search product catalogue"
                title="Search mattresses & accessories"
              >
                <Search className="w-5 h-5 stroke-[1.8]" />
                <span className="sr-only">Search</span>
              </button>

              {/* Wishlist Icon Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsWishlistOpen((prev) => !prev)}
                  className={`p-2 sm:p-2.5 rounded-2xl transition-colors cursor-pointer focus:outline-none relative group ${
                    isWishlistActive ? 'bg-[#DBEAFE] text-[#0A2E73]' : 'text-[#0A2E73] hover:bg-[#DBEAFE]'
                  }`}
                  aria-label="Wishlist items"
                  title="View saved wishlist"
                >
                  <Heart className="w-5 h-5 stroke-[1.8]" />
                  {wishlist.length > 0 && (
                    <span className="absolute 1 top-1 right-1 min-w-[17px] h-[17px] rounded-full bg-[#E3262E] text-white text-[9.5px] font-bold flex items-center justify-center px-1 shadow-2xs">
                      {wishlist.length}
                    </span>
                  )}
                  <span className="sr-only">Wishlist</span>
                </button>

                {/* Wishlist Popover Modal */}
                {isWishlistOpen && (
                  <div className="absolute right-0 top-full mt-2.5 w-80 sm:w-96 bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_20px_50px_rgba(10,46,115,0.14)] p-4 sm:p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-[#E3262E]" />
                        <h4 className="text-xs font-serif font-bold text-[#071F52]">
                          Saved Wishlist ({wishlist.length})
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsWishlistOpen(false)}
                        className="text-[#64748B] hover:text-[#071F52] p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {wishlistedProducts.length === 0 ? (
                      <div className="text-center py-6">
                        <Heart className="w-8 h-8 text-[#E3262E]/40 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-[#071F52]">Your Wishlist is Empty</p>
                        <p className="text-[11px] text-[#64748B] mt-1 leading-relaxed">
                          Save your favorite bespoke mattresses while exploring the collection.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setIsWishlistOpen(false);
                            navigateToProduct('orthopedic');
                          }}
                          className="mt-3 px-4 py-2 rounded-xl bg-[#0A2E73] text-white text-xs font-semibold hover:bg-[#071F52] transition-colors cursor-pointer"
                        >
                          Explore Mattresses
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                          {wishlistedProducts.map((p) => (
                            <div
                              key={p.id}
                              className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]"
                            >
                              <img
                                src={p.gallery[0]?.url || '/images/type_ortho.png'}
                                alt={p.name}
                                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#E2E8F0]"
                              />
                              <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-serif font-bold text-[#071F52] truncate">
                                  {p.name}
                                </h5>
                                <div className="text-[11px] text-[#0A2E73] font-serif font-bold">
                                  ₹{p.sizes[0].price.toLocaleString('en-IN')}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsWishlistOpen(false);
                                    navigateToProduct(p.slug);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-[#0A2E73] text-white text-[10px] font-semibold hover:bg-[#071F52] cursor-pointer"
                                >
                                  View
                                </button>
                                <button
                                  type="button"
                                  onClick={() => toggleWishlist(p.id)}
                                  className="p-1 text-[#64748B] hover:text-red-600 cursor-pointer"
                                  title="Remove from wishlist"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsWishlistOpen(false);
                            navigateToWishlist();
                          }}
                          className="w-full mt-3 py-2 rounded-xl border border-[#0A2E73] text-[#0A2E73] hover:bg-[#F8FAFC] text-xs font-semibold text-center cursor-pointer"
                        >
                          Open Full Saved Sanctuary ({wishlist.length}) →
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Account Icon Trigger */}
              <button
                type="button"
                onClick={() => navigateToAccount(undefined, 'orders')}
                className={`p-2 sm:p-2.5 rounded-2xl transition-all cursor-pointer focus:outline-none relative group flex items-center gap-1.5 ${
                  isAccountActive
                    ? 'bg-[#0A2E73] text-[#F8FAFC] shadow-xs'
                    : 'text-[#0A2E73] hover:bg-[#DBEAFE]'
                }`}
                aria-label="Customer Sanctuary & Order Tracking"
                title={user ? `Signed in as ${user.fullName}` : 'Sign in to Client Sanctuary'}
              >
                <div className="relative">
                  <User className={`w-5 h-5 stroke-[1.8] ${isAccountActive ? 'text-white' : 'text-[#0A2E73]'}`} />
                  {user && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                  )}
                </div>
                {user && (
                  <span className={`hidden xl:inline text-xs font-semibold truncate max-w-[80px] ${
                    isAccountActive ? 'text-[#E3262E]' : 'text-[#0A2E73]'
                  }`}>
                    {user.fullName.split(' ')[0]}
                  </span>
                )}
              </button>

              {/* Shopping Bag Icon Trigger with Live Cart Count */}
              <button
                type="button"
                onClick={openCart}
                className={`p-2 sm:p-2.5 rounded-2xl transition-all cursor-pointer focus:outline-none relative group ${
                  isCartActive
                    ? 'bg-[#0A2E73] text-[#F8FAFC] shadow-xs'
                    : 'text-[#0A2E73] hover:bg-[#DBEAFE]'
                }`}
                aria-label={`Shopping bag containing ${cartCount} items`}
                title="View Shopping Bag"
              >
                <ShoppingBag className={`w-5 h-5 stroke-[1.8] ${isCartActive ? 'text-white' : 'text-[#0A2E73]'}`} />
                {cartCount > 0 && (
                  <span className="absolute 1 top-1 right-1 min-w-[17px] h-[17px] rounded-full bg-[#E3262E] text-white text-[9.5px] font-bold flex items-center justify-center px-1 shadow-2xs">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* 4. REAL PRODUCT CATALOGUE SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setIsSearchOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl p-5 sm:p-6 z-10 animate-in zoom-in-95 duration-150">
            {/* Search Input Bar */}
            <div className="relative flex items-center pb-4 border-b border-[#E2E8F0]">
              <Search className="w-5 h-5 text-[#E3262E] shrink-0 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setIsSearchOpen(false);
                    navigateToSearch(searchQuery);
                  }
                }}
                placeholder="Search mattresses by type, firmness or model (e.g. Orthopedic, Latex, Hybrid)..."
                className="w-full text-sm sm:text-base text-[#071F52] placeholder-[#94A3B8] outline-none font-medium bg-transparent"
                aria-label="Search mattresses catalogue"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-[#64748B] hover:text-[#071F52] mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 rounded-full bg-[#F8FAFC] hover:bg-[#DBEAFE] text-[#071F52] transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results or Curated Shortcuts */}
            <div className="pt-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {searchQuery.trim() === '' ? (
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E3262E] font-bold block mb-3">
                    Featured Atelier Collections
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.values(MATTRESS_PRODUCTS).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigateToProduct(p.slug);
                        }}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFC] hover:bg-[#DBEAFE] border border-[#E2E8F0] transition-colors cursor-pointer group"
                      >
                        <img
                          src={p.gallery[0]?.url || '/images/type_ortho.png'}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#E2E8F0]"
                        />
                        <div className="min-w-0 flex-1">
                          <h5 className="text-xs font-serif font-bold text-[#071F52] group-hover:text-[#0A2E73] truncate">
                            {p.name}
                          </h5>
                          <div className="flex items-center justify-between text-[11px] text-[#64748B] mt-0.5">
                            <span>{p.category}</span>
                            <span className="font-serif font-bold text-[#0A2E73]">
                              ₹{p.sizes[0].price.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-10">
                  <Search className="w-10 h-10 text-[#E3262E]/40 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-[#071F52]">
                    No mattress matches found for "{searchQuery}"
                  </p>
                  <p className="text-xs text-[#64748B] mt-1">
                    Try searching for "Orthopedic", "Latex", "Spring", or "Hybrid".
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#E3262E] font-bold mb-2">
                    {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} in Catalogue
                  </div>
                  {searchResults.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateToProduct(p.slug);
                      }}
                      className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAFC] hover:bg-[#DBEAFE] border border-[#E2E8F0] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={p.gallery[0]?.url || '/images/type_ortho.png'}
                          alt={p.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#E2E8F0]"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs sm:text-sm font-serif font-bold text-[#071F52] group-hover:text-[#0A2E73] truncate">
                              {p.name}
                            </h5>
                            {p.badge && (
                              <span className="px-1.5 py-0.2 rounded-md bg-[#0A2E73] text-white text-[9px] font-bold">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#64748B] truncate mt-0.5">
                            {p.tagline}
                          </p>
                          <div className="text-[11px] text-[#E3262E] font-medium mt-0.5">
                            {p.firmnessLabel}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-4">
                        <span className="text-[10px] text-[#64748B] block">Starting from</span>
                        <span className="font-serif font-bold text-xs sm:text-sm text-[#0A2E73]">
                          ₹{p.sizes[0].price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Helper Footer */}
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#94A3B8]">
              <span>Tip: Press ENTER for full results</span>
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  navigateToSearch(searchQuery);
                }}
                className="text-[#0A2E73] hover:underline font-semibold cursor-pointer"
              >
                View Full Search Results Page →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. RESPONSIVE MOBILE SLIDE-IN DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 left-0 max-w-[360px] w-full bg-[#F8FAFC] shadow-2xl flex flex-col z-50 border-r border-[#E2E8F0] animate-in slide-in-from-left duration-300">
            
            {/* Header */}
            <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-white">
              <MindfreeLogo size="sm" />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F8FAFC] hover:bg-[#DBEAFE] text-[#071F52] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input Bar Trigger */}
            <div className="p-4 bg-white border-b border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#64748B]"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#E3262E]" />
                  <span>Search catalogue...</span>
                </span>
                <span className="text-[10px] font-mono bg-[#DBEAFE] text-[#0A2E73] px-1.5 py-0.5 rounded-md font-bold">
                  GO
                </span>
              </button>
            </div>

            {/* Scrollable Navigation Sections */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
              
              {/* Mattresses Accordion */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion('mattresses')}
                  className="w-full flex items-center justify-between p-3.5 text-xs font-serif font-bold text-[#071F52] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-[#0A2E73]" />
                    <span>Mattresses</span>
                  </span>
                  {mobileAccordions.mattresses ? (
                    <ChevronUp className="w-4 h-4 text-[#E3262E]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#64748B]" />
                  )}
                </button>

                {mobileAccordions.mattresses && (
                  <div className="px-3 pb-3 pt-1 border-t border-[#E2E8F0] space-y-1 bg-[#F8FAFC]/50">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigateToMattresses('all');
                      }}
                      className="w-full text-left py-2 px-2.5 rounded-xl hover:bg-white text-xs font-bold text-[#0A2E73] flex items-center justify-between cursor-pointer"
                    >
                      <span>Explore All 7 Collections</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E3262E]" />
                    </button>

                    {INNER_NAV_MATTRESS_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigateToMattresses(cat.id);
                        }}
                        className="w-full text-left py-2 px-2.5 rounded-xl hover:bg-white text-xs font-medium text-[#0F2952] flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate">{cat.name}</span>
                        {cat.badge && (
                          <span className="text-[9px] font-mono text-[#E3262E]">
                            {cat.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Pillows Accordion */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion('pillows')}
                  className="w-full flex items-center justify-between p-3.5 text-xs font-serif font-bold text-[#071F52] cursor-pointer"
                >
                  <span>Pillows Collection</span>
                  {mobileAccordions.pillows ? (
                    <ChevronUp className="w-4 h-4 text-[#E3262E]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#64748B]" />
                  )}
                </button>

                {mobileAccordions.pillows && (
                  <div className="px-3 pb-3 pt-1 border-t border-[#E2E8F0] space-y-1 bg-[#F8FAFC]/50">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigateToPillows();
                      }}
                      className="w-full text-left py-2 px-2.5 rounded-xl hover:bg-white text-xs font-bold text-[#0A2E73] flex items-center justify-between cursor-pointer"
                    >
                      <span>Explore All Pillows</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E3262E]" />
                    </button>

                    {INNER_NAV_PILLOWS.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigateToPillows();
                        }}
                        className="w-full text-left py-2 px-2.5 rounded-xl hover:bg-white text-xs font-medium text-[#0F2952] flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate">{item.name}</span>
                        <span className="text-[10px] font-mono text-[#E3262E]">
                          {item.price}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Accessories Accordion */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion('accessories')}
                  className="w-full flex items-center justify-between p-3.5 text-xs font-serif font-bold text-[#071F52] cursor-pointer"
                >
                  <span>Sanctuary Accessories</span>
                  {mobileAccordions.accessories ? (
                    <ChevronUp className="w-4 h-4 text-[#E3262E]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#64748B]" />
                  )}
                </button>

                {mobileAccordions.accessories && (
                  <div className="px-3 pb-3 pt-1 border-t border-[#E2E8F0] space-y-1 bg-[#F8FAFC]/50">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigateToAccessories();
                      }}
                      className="w-full text-left py-2 px-2.5 rounded-xl hover:bg-white text-xs font-bold text-[#0A2E73] flex items-center justify-between cursor-pointer"
                    >
                      <span>Explore All Accessories</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E3262E]" />
                    </button>

                    {INNER_NAV_ACCESSORIES.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigateToAccessories();
                        }}
                        className="w-full text-left py-2 px-2.5 rounded-xl hover:bg-white text-xs font-medium text-[#0F2952] flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate">{item.name}</span>
                        <span className="text-[10px] font-mono text-[#E3262E]">
                          {item.price}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Standalone Route Buttons */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigateToOurStory();
                }}
                className="w-full p-3.5 bg-white rounded-2xl border border-[#E2E8F0] text-xs font-serif font-bold text-[#071F52] flex items-center justify-between cursor-pointer"
              >
                <span>Our Story & Craftsmanship</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E3262E]" />
              </button>
            </div>

            {/* Mobile Footer Drawer Utilities */}
            <div className="p-4 border-t border-[#E2E8F0] bg-white space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigateToAccount(undefined, 'orders');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0A2E73] flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#E3262E]" />
                  <span>{user ? user.fullName : 'Client Sanctuary & Tracking'}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E3262E]" />
              </button>

              <div className="pt-2 flex items-center justify-between text-[11px] text-[#64748B]">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateToContact();
                  }}
                  className="flex items-center gap-1.5 hover:text-[#0A2E73] cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E3262E]" />
                  <span>Concierge Help</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateToStoreLocator();
                  }}
                  className="flex items-center gap-1.5 hover:text-[#0A2E73] cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E3262E]" />
                  <span>Find Atelier</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
