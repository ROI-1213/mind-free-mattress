import { Navbar } from './components/navbar/Navbar';
import { MobileBottomNav } from './components/navbar/MobileBottomNav';
import { ScrollProgressBar } from './components/motion/ScrollReveal';
import { MindfreeHero } from './components/hero/MindfreeHero';
import { ShopByRoomSection } from './components/room/ShopByRoomSection';
import { MattressCatalogueSection } from './components/catalogue/MattressCatalogueSection';
import { BrandStoryExperience } from './components/story/BrandStoryExperience';
import { MindfreeFooter } from './components/footer/MindfreeFooter';
import { MindfreeProductDetailPage } from './components/pdp/MindfreeProductDetailPage';
import { MindfreeCartPage } from './components/cart/MindfreeCartPage';
import { MindfreeCheckoutPage } from './components/checkout/MindfreeCheckoutPage';
import { MindfreeOrderConfirmationPage } from './components/checkout/MindfreeOrderConfirmationPage';
import { AdminOrderDashboard } from './components/admin/AdminOrderDashboard';
import { CustomerOrderDashboard } from './components/account/CustomerOrderDashboard';
import { MindfreeMattressesPage } from './components/pages/MindfreeMattressesPage';
import { MindfreePillowsPage } from './components/pages/MindfreePillowsPage';
import { MindfreeAccessoriesPage } from './components/pages/MindfreeAccessoriesPage';
import { MindfreeStoryPage } from './components/pages/MindfreeStoryPage';
import { MindfreeStoreLocatorPage } from './components/pages/MindfreeStoreLocatorPage';
import { MindfreeContactPage } from './components/pages/MindfreeContactPage';
import { MindfreeSearchPage } from './components/pages/MindfreeSearchPage';
import { MindfreeWishlistPage } from './components/pages/MindfreeWishlistPage';
import { MindfreeFinderPage } from './components/pages/MindfreeFinderPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { HomePageContentProvider } from './context/HomePageContentContext';

function AppContent() {
  const { currentView, productSlug } = useNavigation();
  const isAdminView = currentView === 'admin';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A2540] flex flex-col relative font-sans overflow-x-hidden">
      {/* 0. Top Smooth Scroll Progress Bar (Hidden in Admin) */}
      {!isAdminView && <ScrollProgressBar />}

      {/* 1. MINDFREE Luxury Navigation Bar & Mega Menu (Hidden in Admin) */}
      {!isAdminView && <Navbar />}

      {/* Main View Router */}
      {currentView === 'product' && productSlug ? (
        <main className="flex-1 relative">
          <MindfreeProductDetailPage slug={productSlug} />
        </main>
      ) : currentView === 'cart' ? (
        <main className="flex-1 relative">
          <MindfreeCartPage />
        </main>
      ) : currentView === 'checkout' ? (
        <main className="flex-1 relative">
          <MindfreeCheckoutPage />
        </main>
      ) : currentView === 'order-confirmation' ? (
        <main className="flex-1 relative">
          <MindfreeOrderConfirmationPage />
        </main>
      ) : currentView === 'admin' ? (
        <main className="flex-1 relative">
          <AdminOrderDashboard />
        </main>
      ) : currentView === 'account' ? (
        <main className="flex-1 relative">
          <CustomerOrderDashboard />
        </main>
      ) : currentView === 'mattresses' ? (
        <main className="flex-1 relative">
          <MindfreeMattressesPage />
        </main>
      ) : currentView === 'pillows' ? (
        <main className="flex-1 relative">
          <MindfreePillowsPage />
        </main>
      ) : currentView === 'accessories' ? (
        <main className="flex-1 relative">
          <MindfreeAccessoriesPage />
        </main>
      ) : currentView === 'our-story' ? (
        <main className="flex-1 relative">
          <MindfreeStoryPage />
        </main>
      ) : currentView === 'store-locator' ? (
        <main className="flex-1 relative">
          <MindfreeStoreLocatorPage />
        </main>
      ) : currentView === 'contact' ? (
        <main className="flex-1 relative">
          <MindfreeContactPage />
        </main>
      ) : currentView === 'search' ? (
        <main className="flex-1 relative">
          <MindfreeSearchPage />
        </main>
      ) : currentView === 'wishlist' ? (
        <main className="flex-1 relative">
          <MindfreeWishlistPage />
        </main>
      ) : currentView === 'mattress-finder' ? (
        <main className="flex-1 relative">
          <MindfreeFinderPage />
        </main>
      ) : (
        /* Approved Homepage Sections */
        <main className="flex-1 relative">
          {/* 2. MINDFREE Cinematic Homepage Hero Section */}
          <MindfreeHero />

          {/* 2B. MINDFREE Shop By Room Interactive Showcase */}
          <ShopByRoomSection />

          {/* 3A. MINDFREE Clean Category-Grouped Mattress Cards */}
          <MattressCatalogueSection />

          {/* 6. MINDFREE Google Reviews Testimonials */}
          <BrandStoryExperience />
        </main>
      )}

      {/* 13. MINDFREE Luxury Architectural Footer (Hidden in Admin) */}
      {!isAdminView && <MindfreeFooter />}

      {/* 14. Mobile Fixed App-Style Bottom Navigation Bar (Hidden in Admin) */}
      {!isAdminView && <MobileBottomNav />}

      {/* 15. Luxury Interactive Cart Drawer (Hidden in Admin) */}
      {!isAdminView && <CartDrawer />}
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationProvider>
          <HomePageContentProvider>
            <AppContent />
          </HomePageContentProvider>
        </NavigationProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
