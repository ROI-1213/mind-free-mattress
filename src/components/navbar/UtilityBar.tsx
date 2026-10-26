import React from 'react';
import {
  Sparkles,
  Truck,
  ShieldCheck,
  Moon,
  MapPin,
  Package,
  Headphones,
} from 'lucide-react';
import { UTILITY_LEFT_ITEMS, UTILITY_RIGHT_ITEMS } from '../../data/navigationData';
import { useNavigation } from '../../context/NavigationContext';

const iconMap = {
  leaf: Sparkles,
  truck: Truck,
  shield: ShieldCheck,
  moon: Moon,
  'map-pin': MapPin,
  package: Package,
  headphones: Headphones,
  phone: Headphones,
};

export const UtilityBar: React.FC = () => {
  const { navigateToStoreLocator, navigateToAccount, navigateToContact, navigateToHome } = useNavigation();

  const handleRightItemClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (id === 'store') navigateToStoreLocator();
    else if (id === 'track') navigateToAccount(undefined, 'tracking');
    else if (id === 'support') navigateToContact();
  };

  const handleLeftItemClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    navigateToHome();
    setTimeout(() => {
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11.5px] text-[#22382E] transition-colors select-none overflow-hidden max-w-full">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        {/* Left Information Items */}
        <div className="hidden lg:flex items-center space-x-3.5 xl:space-x-4">
          {UTILITY_LEFT_ITEMS.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <React.Fragment key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => handleLeftItemClick(e, item.href)}
                  className="flex items-center gap-1.5 hover:text-[#0A2E73] font-normal transition-colors text-[#2D3F35] cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-[#0A2E73] shrink-0" strokeWidth={1.75} />
                  <span>{item.label}</span>
                </a>
                {index < UTILITY_LEFT_ITEMS.length - 1 && (
                  <span className="text-[#D8D4CA] select-none text-[11px]">|</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile / Tablet ticker/condensed left info */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto no-scrollbar py-1 flex-1 min-w-0 mr-2">
          <div className="flex items-center gap-1 text-[#0A2E73] font-medium shrink-0 text-[10.5px] sm:text-[11.5px]">
            <Sparkles className="w-3 h-3 text-[#E3262E] shrink-0" />
            <span>100% Certified</span>
          </div>
          <span className="text-[#D8D4CA] shrink-0">|</span>
          <div className="flex items-center gap-1 shrink-0 text-[#2D3F35] text-[10.5px] sm:text-[11.5px]">
            <Truck className="w-3 h-3 text-[#0A2E73] shrink-0" />
            <span>Free Shipping</span>
          </div>
          <span className="hidden sm:inline text-[#D8D4CA] shrink-0">|</span>
          <div className="hidden sm:flex items-center gap-1 shrink-0 text-[#2D3F35] text-[11.5px]">
            <Moon className="w-3 h-3 text-[#0A2E73] shrink-0" />
            <span>100 Nights Trial</span>
          </div>
        </div>

        {/* Right Information & Need Help Button */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 xl:space-x-3.5 shrink-0">
          <div className="hidden sm:flex items-center space-x-3 xl:space-x-3.5">
            {UTILITY_RIGHT_ITEMS.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <React.Fragment key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleRightItemClick(e, item.id)}
                    className="flex items-center gap-1.5 hover:text-[#0A2E73] font-normal transition-colors text-[#2D3F35] cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#0A2E73] shrink-0" strokeWidth={1.75} />
                    <span>{item.label}</span>
                  </a>
                  {index < UTILITY_RIGHT_ITEMS.length - 1 && (
                    <span className="text-[#D8D4CA] select-none text-[11px]">|</span>
                  )}
                </React.Fragment>
              );
            })}
            <span className="text-[#D8D4CA] select-none text-[11px]">|</span>
          </div>

          {/* Need Help Button */}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 bg-[#0A2E73] hover:bg-[#071F52] text-white px-3.5 py-1 rounded-full text-[11.5px] font-medium tracking-wide transition-all duration-200 shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            onClick={() => navigateToContact()}
            aria-label="Need Help? Contact MINDFREE customer concierge"
          >
            <Headphones className="w-3 h-3 text-white" strokeWidth={2} />
            <span>Need Help?</span>
          </button>
        </div>
      </div>
    </div>
  );
};

