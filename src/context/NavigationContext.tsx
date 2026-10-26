import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AppView =
  | 'home'
  | 'product'
  | 'mattresses'
  | 'pillows'
  | 'accessories'
  | 'offers'
  | 'mattress-finder'
  | 'sleep-guide'
  | 'our-story'
  | 'store-locator'
  | 'contact'
  | 'search'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'admin'
  | 'account';

export type AccountTabType = 'orders' | 'tracking' | 'profile' | 'guest';

interface NavigationContextType {
  currentView: AppView;
  productSlug: string | null;
  categoryFilter: string | null;
  guideSlug: string | null;
  searchQuery: string | null;
  lastOrderId: string | null;
  accountTab: AccountTabType;
  navigateToProduct: (slug: string) => void;
  navigateToMattresses: (category?: string) => void;
  navigateToPillows: () => void;
  navigateToAccessories: () => void;
  navigateToOffers: () => void;
  navigateToMattressFinder: () => void;
  navigateToSleepGuide: (articleSlug?: string) => void;
  navigateToOurStory: () => void;
  navigateToStoreLocator: () => void;
  navigateToContact: () => void;
  navigateToSearch: (query?: string) => void;
  navigateToWishlist: () => void;
  navigateToCart: () => void;
  navigateToCheckout: () => void;
  navigateToOrderConfirmation: (orderId: string) => void;
  navigateToAdmin: () => void;
  navigateToAccount: (orderId?: string, tab?: AccountTabType) => void;
  navigateToHome: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationState {
  view: AppView;
  slug: string | null;
  category: string | null;
  guideSlug: string | null;
  searchQuery: string | null;
  orderId: string | null;
  tab: AccountTabType;
}

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialState = (): NavigationState => {
    if (typeof window === 'undefined') {
      return {
        view: 'home',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as AppView | null;
    const orderIdParam = params.get('orderId');
    const tabParam = (params.get('tab') as AccountTabType) || 'orders';
    const productParam = params.get('product');
    const categoryParam = params.get('category');
    const guideParam = params.get('guide');
    const queryParam = params.get('q') || params.get('query');

    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    // 1. Mattresses category or product routes
    if (pathname.startsWith('/mattresses') || viewParam === 'mattresses' || hash === '#mattresses') {
      const parts = pathname.split('/').filter(Boolean);
      if (parts.length >= 2 && parts[1] !== 'all') {
        const sub = parts[1];
        // Check if sub matches known categories or a product
        const knownCats = [
          'orthopedic',
          'memory-foam',
          'latex',
          'spring',
          'coir',
          'hybrid',
          'foam',
          'cooling',
          'ep-foam',
          'rebound-foam',
          'normal-bed',
          'pillow-top',
          'euro-top',
        ];
        if (knownCats.includes(sub)) {
          return {
            view: 'mattresses',
            slug: null,
            category: sub,
            guideSlug: null,
            searchQuery: null,
            orderId: null,
            tab: 'orders',
          };
        }
        return {
          view: 'product',
          slug: sub,
          category: null,
          guideSlug: null,
          searchQuery: null,
          orderId: null,
          tab: 'orders',
        };
      }
      return {
        view: 'mattresses',
        slug: null,
        category: categoryParam || 'all',
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 2. Product Detail Page
    if (productParam || hash.startsWith('#/product/')) {
      const slug = productParam || hash.replace('#/product/', '');
      return {
        view: 'product',
        slug,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 3. Pillows
    if (pathname.startsWith('/pillows') || viewParam === 'pillows' || hash === '#pillows') {
      return {
        view: 'pillows',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 4. Accessories
    if (pathname.startsWith('/accessories') || viewParam === 'accessories' || hash === '#accessories') {
      return {
        view: 'accessories',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 5. Offers
    if (pathname.startsWith('/offers') || viewParam === 'offers' || hash === '#offers') {
      return {
        view: 'offers',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 6. Mattress Finder
    if (pathname.startsWith('/mattress-finder') || viewParam === 'mattress-finder' || hash === '#finder') {
      return {
        view: 'mattress-finder',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 7. Sleep Guide & Editorial Articles
    if (pathname.startsWith('/sleep-guide') || viewParam === 'sleep-guide' || hash === '#guide') {
      const parts = pathname.split('/').filter(Boolean);
      const article = parts.length >= 2 ? parts[1] : guideParam;
      return {
        view: 'sleep-guide',
        slug: null,
        category: null,
        guideSlug: article || null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 8. Our Story
    if (pathname.startsWith('/our-story') || pathname.startsWith('/about') || viewParam === 'our-story' || hash === '#story') {
      return {
        view: 'our-story',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 9. Store Locator
    if (pathname.startsWith('/store-locator') || pathname.startsWith('/stores') || viewParam === 'store-locator' || hash === '#stores') {
      return {
        view: 'store-locator',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 10. Contact
    if (pathname.startsWith('/contact') || viewParam === 'contact' || hash === '#contact') {
      return {
        view: 'contact',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 11. Search
    if (pathname.startsWith('/search') || viewParam === 'search' || queryParam) {
      return {
        view: 'search',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: queryParam || null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 12. Wishlist
    if (pathname.startsWith('/wishlist') || viewParam === 'wishlist' || hash === '#wishlist') {
      return {
        view: 'wishlist',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 13. Customer Account & Order Tracking
    if (
      viewParam === 'account' ||
      pathname === '/account' ||
      hash === '#account' ||
      hash === '#orders' ||
      hash === '#track-order'
    ) {
      const initialTab: AccountTabType =
        hash === '#track-order' || orderIdParam ? 'tracking' : tabParam;
      return {
        view: 'account',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: orderIdParam,
        tab: initialTab,
      };
    }

    // 14. Admin
    if (viewParam === 'admin' || pathname === '/admin') {
      return {
        view: 'admin',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 15. Checkout
    if (viewParam === 'checkout' || pathname === '/checkout') {
      return {
        view: 'checkout',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // 16. Order Confirmation
    if (viewParam === 'order-confirmation' || pathname === '/order-confirmation') {
      return {
        view: 'order-confirmation',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: orderIdParam,
        tab: 'orders',
      };
    }

    // 17. Cart
    if (viewParam === 'cart' || pathname === '/cart' || hash === '#/cart') {
      return {
        view: 'cart',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      };
    }

    // Default to Home
    return {
      view: 'home',
      slug: null,
      category: null,
      guideSlug: null,
      searchQuery: null,
      orderId: null,
      tab: 'orders',
    };
  };

  const [state, setState] = useState<NavigationState>(getInitialState);

  // Synchronize document title
  useEffect(() => {
    const titles: Record<AppView, string> = {
      home: 'MINDFREE — Sleep Pure · Live Better | Luxury Mattresses',
      product: state.slug
        ? `${state.slug.toUpperCase()} Luxury Mattress | MINDFREE Atelier`
        : 'Luxury Mattress Collection | MINDFREE',
      mattresses: state.category && state.category !== 'all'
        ? `${state.category.toUpperCase()} Collection | MINDFREE Mattresses`
        : 'All Signature Mattresses | MINDFREE Atelier',
      pillows: 'Ergonomic & Botanical Pillows | MINDFREE Sanctuary',
      accessories: 'Luxury Bedding & Sleep Accessories | MINDFREE',
      offers: 'Exclusive Atelier Privileges & Offers | MINDFREE',
      'mattress-finder': 'Interactive Mattress Finder & Sleep Profiler | MINDFREE',
      'sleep-guide': state.guideSlug
        ? `Sleep Architecture Guide | MINDFREE`
        : 'Sleep Guide & Editorial Hub | MINDFREE',
      'our-story': 'Our Story, Craftsmanship & Philosophy | MINDFREE',
      'store-locator': 'Atelier Showroom & Sanctuary Directory | MINDFREE',
      contact: 'Concierge & Client Support | MINDFREE',
      search: state.searchQuery
        ? `Search: "${state.searchQuery}" | MINDFREE Catalogue`
        : 'Search Sleep Catalogue | MINDFREE',
      wishlist: 'Saved Sleep Sanctuary Wishlist | MINDFREE',
      cart: 'Your Shopping Bag | MINDFREE',
      checkout: 'Atelier Checkout & White-Glove Concierge | MINDFREE',
      'order-confirmation': 'Commission Confirmed | MINDFREE Atelier',
      admin: 'Atelier Order Fulfillment Center | MINDFREE',
      account: 'Client Sanctuary & Live Order Tracking | MINDFREE',
    };

    if (typeof document !== 'undefined') {
      document.title = titles[state.view] || 'MINDFREE — Luxury Sleep Systems';
    }
  }, [state]);

  // Listen for browser popstate
  useEffect(() => {
    const handlePopState = () => {
      setState(getInitialState());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const pushNavigation = useCallback((newState: NavigationState, url: string) => {
    setState(newState);
    try {
      window.history.pushState(newState, '', url);
    } catch {
      // Fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToProduct = (slug: string) => {
    pushNavigation(
      {
        view: 'product',
        slug,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      `?product=${slug}`
    );
  };

  const navigateToMattresses = (category: string = 'all') => {
    pushNavigation(
      {
        view: 'mattresses',
        slug: null,
        category,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      category === 'all' ? '?view=mattresses' : `?view=mattresses&category=${category}`
    );
  };

  const navigateToPillows = () => {
    pushNavigation(
      {
        view: 'pillows',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      '?view=pillows'
    );
  };

  const navigateToAccessories = () => {
    pushNavigation(
      {
        view: 'accessories',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      '?view=accessories'
    );
  };

  const navigateToOffers = () => {
    pushNavigation(
      {
        view: 'offers',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      '?view=offers'
    );
  };

  const navigateToMattressFinder = () => {
    pushNavigation(
      {
        view: 'mattress-finder',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      '?view=mattress-finder'
    );
  };

  const navigateToSleepGuide = (articleSlug?: string) => {
    pushNavigation(
      {
        view: 'sleep-guide',
        slug: null,
        category: null,
        guideSlug: articleSlug || null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      articleSlug ? `?view=sleep-guide&guide=${articleSlug}` : '?view=sleep-guide'
    );
  };

  const navigateToOurStory = () => {
    pushNavigation(
      {
        view: 'our-story',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      '?view=our-story'
    );
  };

  const navigateToStoreLocator = () => {
    pushNavigation(
      {
        view: 'store-locator',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      '?view=store-locator'
    );
  };

  const navigateToContact = () => {
    pushNavigation(
      {
        view: 'contact',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      '?view=contact'
    );
  };

  const navigateToSearch = (query?: string) => {
    pushNavigation(
      {
        view: 'search',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: query || null,
        orderId: null,
        tab: 'orders',
      },
      query ? `?view=search&q=${encodeURIComponent(query)}` : '?view=search'
    );
  };

  const navigateToWishlist = () => {
    pushNavigation(
      {
        view: 'wishlist',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      '?view=wishlist'
    );
  };

  const navigateToCart = () => {
    pushNavigation(
      {
        view: 'cart',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      '?view=cart'
    );
  };

  const navigateToCheckout = () => {
    pushNavigation(
      {
        view: 'checkout',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      '?view=checkout'
    );
  };

  const navigateToOrderConfirmation = (orderId: string) => {
    pushNavigation(
      {
        view: 'order-confirmation',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId,
        tab: 'orders',
      },
      `?view=order-confirmation&orderId=${orderId}`
    );
  };

  const navigateToAdmin = () => {
    pushNavigation(
      {
        view: 'admin',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      '?view=admin'
    );
  };

  const navigateToAccount = (orderId?: string, tab: AccountTabType = 'orders') => {
    const activeTab = orderId ? 'tracking' : tab;
    pushNavigation(
      {
        view: 'account',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: orderId || state.orderId,
        tab: activeTab,
      },
      orderId ? `?view=account&tab=tracking&orderId=${orderId}` : `?view=account&tab=${tab}`
    );
  };

  const navigateToHome = () => {
    pushNavigation(
      {
        view: 'home',
        slug: null,
        category: null,
        guideSlug: null,
        searchQuery: null,
        orderId: null,
        tab: 'orders',
      },
      '/'
    );
  };

  return (
    <NavigationContext.Provider
      value={{
        currentView: state.view,
        productSlug: state.slug,
        categoryFilter: state.category,
        guideSlug: state.guideSlug,
        searchQuery: state.searchQuery,
        lastOrderId: state.orderId,
        accountTab: state.tab,
        navigateToProduct,
        navigateToMattresses,
        navigateToPillows,
        navigateToAccessories,
        navigateToOffers,
        navigateToMattressFinder,
        navigateToSleepGuide,
        navigateToOurStory,
        navigateToStoreLocator,
        navigateToContact,
        navigateToSearch,
        navigateToWishlist,
        navigateToCart,
        navigateToCheckout,
        navigateToOrderConfirmation,
        navigateToAdmin,
        navigateToAccount,
        navigateToHome,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
