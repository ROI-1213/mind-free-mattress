import React, { useRef, useEffect } from 'react';
import { MegaMenuCampaign } from './MegaMenuCampaign';
import { ShopByType } from './ShopByType';
import { MaterialShowcase } from './MaterialShowcase';
import { TopDesignCards } from './TopDesignCards';
import { LifestyleCampaign } from './LifestyleCampaign';
import { useNavigation } from '../../context/NavigationContext';

interface MattressesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const MattressesMegaMenu: React.FC<MattressesMegaMenuProps> = ({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { navigateToMattresses } = useNavigation();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="hidden lg:block absolute left-0 right-0 top-full pt-2 z-40 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-2"
      role="region"
      aria-label="Mattresses Mega Menu"
    >
      <div className="w-full bg-white rounded-[24px] border border-[#E2E8F0] shadow-[0_24px_64px_-16px_rgba(10,46,115,0.18)] overflow-hidden flex flex-row min-h-[340px] max-h-[380px]">
        {/* Column 1: Brand Campaign Panel */}
        <MegaMenuCampaign
          onExploreClick={() => {
            onClose();
            navigateToMattresses('all');
          }}
        />

        {/* Column 2: Shop by Type */}
        <ShopByType
          onSelectCategory={(cat) => {
            onClose();
            navigateToMattresses(cat.id);
          }}
        />

        {/* Column 3: By Core Material */}
        <MaterialShowcase
          onSelectMaterial={(mat) => {
            onClose();
            navigateToMattresses(mat.id);
          }}
        />

        {/* Column 4: By Top Design */}
        <TopDesignCards
          onSelectDesign={(design) => {
            onClose();
            navigateToMattresses(design.id);
          }}
        />

        {/* Column 5: Right Lifestyle Bedroom Campaign Image */}
        <LifestyleCampaign />
      </div>
    </div>
  );
};

