import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { NAV_ITEMS, type NavItem } from '../../data/navigationData';
import { useNavigation } from '../../context/NavigationContext';
import { useHomePageContent } from '../../context/HomePageContentContext';

interface NavLinksProps {
  activeMegaMenu: boolean;
  onToggleMegaMenu: () => void;
  onOpenMegaMenu: () => void;
  onCloseMegaMenu: () => void;
}

export const NavLinks: React.FC<NavLinksProps> = ({
  activeMegaMenu,
  onToggleMegaMenu: _onToggleMegaMenu,
  onOpenMegaMenu,
  onCloseMegaMenu,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { pillowsData, whyMindfreeData } = useHomePageContent();
  const {
    currentView,
    navigateToHome,
    navigateToMattresses,
    navigateToPillows,
    navigateToOurStory,
    navigateToContact,
  } = useNavigation();

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    if (item.id === 'home') navigateToHome();
    else if (item.id === 'mattresses') {
      onCloseMegaMenu();
      navigateToMattresses('all');
    } else if (item.id === 'pillows') navigateToPillows();
    else if (item.id === 'why-mindfree') navigateToOurStory();
    else if (item.id === 'contact') navigateToContact();
  };

  const handleChildClick = (e: React.MouseEvent, _child: { label: string; href: string }, parentId: string) => {
    e.preventDefault();
    setActiveDropdown(null);
    if (parentId === 'pillows') navigateToPillows();
    else if (parentId === 'why-mindfree') navigateToOurStory();
  };

  const isItemActive = (id: string) => {
    if (id === 'home') return currentView === 'home';
    if (id === 'mattresses') return currentView === 'mattresses' || currentView === 'product';
    if (id === 'pillows') return currentView === 'pillows';
    if (id === 'why-mindfree') return currentView === 'our-story';
    if (id === 'contact') return currentView === 'contact';
    return false;
  };

  return (
    <nav
      className="flex items-center space-x-1 lg:space-x-2 xl:space-x-3.5 py-1 select-none whitespace-nowrap"
      aria-label="Main Navigation"
    >
      {NAV_ITEMS.map((item: NavItem) => {
        const isMattresses = item.id === 'mattresses';
        const hasSubmenu = Boolean(item.children && item.children.length > 0);
        const active = isItemActive(item.id);

        if (isMattresses) {
          return (
            <div
              key={item.id}
              className="relative inline-flex items-center shrink-0"
              onMouseEnter={onOpenMegaMenu}
            >
              <button
                type="button"
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13.5px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeMegaMenu || active
                    ? 'bg-[#0A2E73] text-white shadow-sm'
                    : 'text-[#0A2540] hover:text-[#0A2E73] hover:bg-[#EFF6FF]'
                }`}
                aria-expanded={activeMegaMenu}
                aria-haspopup="true"
              >
                <span>{item.label}</span>
                {activeMegaMenu ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#E3262E] stroke-[2] shrink-0" />
                ) : (
                  <ChevronDown
                    className={`w-3.5 h-3.5 stroke-[2] shrink-0 ${
                      active ? 'text-white' : 'text-[#0A2540]'
                    }`}
                  />
                )}
              </button>
            </div>
          );
        }

        return (
          <div
            key={item.id}
            className="relative shrink-0"
            onMouseEnter={() => {
              if (hasSubmenu) setActiveDropdown(item.id);
            }}
            onMouseLeave={() => {
              if (hasSubmenu) setActiveDropdown(null);
            }}
          >
            <a
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`relative inline-flex items-center gap-1 px-3 py-2 text-[13.5px] whitespace-nowrap rounded-lg transition-all duration-150 cursor-pointer ${
                active
                  ? 'font-semibold text-[#0A2E73] bg-[#EFF6FF]'
                  : 'font-medium text-[#0A2540] hover:text-[#0A2E73] hover:bg-[#EFF6FF]/80'
              }`}
            >
              <span>{item.label}</span>

              {item.hasDropdown && !isMattresses && (
                <ChevronDown className="w-3.5 h-3.5 text-[#747A78] stroke-[1.8] shrink-0" />
              )}

              {item.badge && (
                <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-[#E3262E] text-white text-[8.5px] font-bold tracking-wider uppercase shadow-xs">
                  {item.badge}
                </span>
              )}
            </a>

            {/* Standard Dropdown Menu */}
            {hasSubmenu && activeDropdown === item.id && (
              <div className="absolute left-0 top-full mt-1.5 w-56 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_14px_35px_rgba(10,46,115,0.12)] p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="space-y-0.5">
                  {(item.id === 'pillows' && pillowsData.dropdownLinks.length > 0
                    ? pillowsData.dropdownLinks
                    : item.id === 'why-mindfree' && whyMindfreeData.dropdownLinks.length > 0
                      ? whyMindfreeData.dropdownLinks
                      : item.children || []
                  ).map((child, idx) => (
                    <a
                      key={idx}
                      href={child.href}
                      onClick={(e) => handleChildClick(e, child, item.id)}
                      className="block px-3 py-2 rounded-xl text-xs font-medium text-[#0A2540] hover:text-[#0A2E73] hover:bg-[#EFF6FF] transition-colors cursor-pointer whitespace-normal"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};
