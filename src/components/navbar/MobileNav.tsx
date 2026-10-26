import React, { useState } from 'react';
import {
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Truck,
  ShieldCheck,
  Moon,
  MapPin,
  Headphones,
} from 'lucide-react';
import {
  NAV_ITEMS,
  MATTRESS_CATEGORIES,
  CORE_MATERIALS,
  TOP_DESIGNS,
} from '../../data/navigationData';
import { useNavigation } from '../../context/NavigationContext';
import { useHomePageContent } from '../../context/HomePageContentContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    mattresses: true, // open by default to showcase mattress features
  });

  const {
    navigateToHome,
    navigateToMattresses,
    navigateToPillows,
    navigateToOurStory,
    navigateToStoreLocator,
    navigateToContact,
  } = useNavigation();
  const { pillowsData, whyMindfreeData, mattressesData } = useHomePageContent();

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-[380px] w-full bg-[#F8FAFC] shadow-2xl flex flex-col z-50 overflow-hidden transform transition-transform duration-300 ease-out border-l border-[#E2E8F0]">
        {/* Drawer Header */}
        <div className="px-5 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <img
              src="/images/mindfree_logo_transparent.png"
              alt="MINDFREE"
              className="h-8 w-auto object-contain"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#EFF6FF] hover:bg-[#EAE8E2] text-[#0A2540] flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5">
          {/* Quick Mobile Search Trigger */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-full text-xs text-[#747A78] shadow-xs hover:border-[#E3262E]"
          >
            <span>Search mattresses, pillows...</span>
            <span className="w-6 h-6 rounded-full bg-[#0A2E73] text-white flex items-center justify-center">
              <ArrowRight className="w-3 h-3" />
            </span>
          </button>

          {/* Navigation Links with Accordions */}
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isMattresses = item.id === 'mattresses';
              const isAccordionOpen = Boolean(openAccordions[item.id]);

              if (isMattresses) {
                return (
                  <div key={item.id} className="border border-[#E2E8F0] rounded-2xl bg-white overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between text-left font-medium text-sm text-[#0A2E73] bg-[#EFF6FF]/60 hover:bg-[#EFF6FF]"
                    >
                      <span className="flex items-center gap-2 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#E3262E]" />
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#0A2E73] transition-transform duration-200 ${
                          isAccordionOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isAccordionOpen && (
                      <div className="p-4 space-y-4 bg-white text-xs divide-y divide-[#E2E8F0]">
                        {/* Mobile Campaign Banner */}
                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#0A2E73] to-[#0E231B] text-white">
                          <span className="text-[9.5px] uppercase tracking-wider text-white/80 font-medium">
                            {mattressesData.megaMenu.campaign.eyebrow}
                          </span>
                          <h4 className="font-serif text-sm font-normal text-white mt-1">
                            {mattressesData.megaMenu.campaign.headlineLine1}{' '}
                            {mattressesData.megaMenu.campaign.headlineLine2}{' '}
                            <span className="text-white font-semibold">
                              {mattressesData.megaMenu.campaign.headlineHighlight}
                            </span>
                          </h4>
                          <a
                            href="/mattresses/all"
                            onClick={(e) => {
                              e.preventDefault();
                              onClose();
                              navigateToMattresses('all');
                            }}
                            className="mt-2.5 inline-flex items-center gap-1 text-[11px] text-[#F8FAFC] font-medium bg-[#E3262E] px-3 py-1 rounded-full cursor-pointer"
                          >
                            <span>{mattressesData.megaMenu.campaign.ctaText}</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>

                        {/* Shop by Type */}
                        <div className="pt-3">
                          <h5 className="font-serif text-xs font-semibold text-[#0A2540] mb-2">
                            {mattressesData.megaMenu.shopByTypeHeading}
                          </h5>
                          <div className="grid grid-cols-2 gap-2">
                            {(mattressesData.megaMenu.shopByTypeItems.length > 0
                              ? mattressesData.megaMenu.shopByTypeItems
                              : MATTRESS_CATEGORIES
                            ).map((cat) => (
                              <a
                                key={cat.id}
                                href={cat.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  onClose();
                                  navigateToMattresses(cat.id);
                                }}
                                className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] cursor-pointer"
                              >
                                <img src={cat.image} alt={cat.name} className="w-6 h-5 object-contain" />
                                <span className="text-[11px] font-medium text-[#0A2540] truncate">{cat.name}</span>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* By Core Material */}
                        <div className="pt-3">
                          <h5 className="font-serif text-xs font-semibold text-[#0A2540] mb-2">
                            {mattressesData.megaMenu.coreMaterialsHeading}
                          </h5>
                          <div className="space-y-1.5">
                            {(mattressesData.megaMenu.coreMaterialsItems.length > 0
                              ? mattressesData.megaMenu.coreMaterialsItems
                              : CORE_MATERIALS
                            ).map((mat) => (
                              <a
                                key={mat.id}
                                href={mat.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  onClose();
                                  navigateToMattresses(mat.id);
                                }}
                                className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-[#F8FAFC] cursor-pointer"
                              >
                                <img src={mat.image} alt={mat.name} className="w-8 h-6 rounded object-cover" />
                                <div>
                                  <div className="text-[11px] font-semibold text-[#0A2540]">{mat.name}</div>
                                  <div className="text-[9.5px] text-[#747A78]">{mat.description}</div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* By Top Design */}
                        <div className="pt-3">
                          <h5 className="font-serif text-xs font-semibold text-[#0A2540] mb-2">
                            {mattressesData.megaMenu.topDesignsHeading}
                          </h5>
                          <div className="space-y-1.5">
                            {(mattressesData.megaMenu.topDesignsItems.length > 0
                              ? mattressesData.megaMenu.topDesignsItems
                              : TOP_DESIGNS
                            ).map((des) => (
                              <a
                                key={des.id}
                                href={des.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  onClose();
                                  navigateToMattresses(des.id);
                                }}
                                className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <img src={des.image} alt={des.name} className="w-8 h-6 rounded object-cover" />
                                  <span className="text-[11px] font-semibold text-[#0A2540]">{des.name}</span>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-[#E3262E]" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (item.hasDropdown) {
                return (
                  <div key={item.id} className="border border-[#E2E8F0] rounded-2xl bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full min-h-[46px] px-4 py-2.5 flex items-center justify-between text-left text-xs font-medium text-[#0A2540] hover:bg-[#F8FAFC] cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.badge && (
                          <span className="px-1.5 py-0.2 rounded-full bg-[#E3262E] text-white text-[8px] font-bold">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#747A78] transition-transform duration-200 ${
                          isAccordionOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isAccordionOpen && item.children && (
                      <div className="px-4 pb-3 space-y-1 bg-[#F8FAFC]/40 border-t border-[#E2E8F0]">
                        {(item.id === 'pillows' && pillowsData.dropdownLinks.length > 0
                          ? pillowsData.dropdownLinks
                          : item.id === 'why-mindfree' && whyMindfreeData.dropdownLinks.length > 0
                            ? whyMindfreeData.dropdownLinks
                            : item.children
                        ).map((child, idx) => (
                          <a
                            key={idx}
                            href={child.href}
                            onClick={(e) => {
                              e.preventDefault();
                              onClose();
                              if (item.id === 'pillows') navigateToPillows();
                              else if (item.id === 'why-mindfree') navigateToOurStory();
                            }}
                            className="block py-1.5 text-[11px] text-[#2D3F35] hover:text-[#0A2E73] cursor-pointer"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    if (item.id === 'home') navigateToHome();
                    else if (item.id === 'mattresses') navigateToMattresses('all');
                    else if (item.id === 'pillows') navigateToPillows();
                    else if (item.id === 'why-mindfree') navigateToOurStory();
                    else if (item.id === 'contact') navigateToContact();
                  }}
                  className="flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-medium text-[#0A2540] hover:bg-white border border-transparent hover:border-[#E2E8F0] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full bg-[#E3262E] text-white text-[8.5px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#B8C0BA]" />
                </a>
              );
            })}
          </div>

          {/* Quick Utility Links in Drawer */}
          <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
            <div className="text-[10px] uppercase font-semibold text-[#E3262E] tracking-wider mb-2">
              MINDFREE Promises
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#2D3F35]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0A2E73]" />
                <span>100% Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#0A2E73]" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0A2E73]" />
                <span>10 Yr Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-[#0A2E73]" />
                <span>100 Nights Trial</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Bottom Bar */}
        <div className="p-4 bg-white border-t border-[#E2E8F0] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigateToStoreLocator();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#0A2540] cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#0A2E73]" />
            <span>Store Locator</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              navigateToContact();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#0A2E73] text-white text-xs font-medium shadow-sm cursor-pointer"
          >
            <Headphones className="w-3.5 h-3.5 text-white" />
            <span>Need Help?</span>
          </button>
        </div>
      </div>
    </div>
  );
};
