import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TOP_DESIGNS, type TopDesign } from '../../data/navigationData';
import { useHomePageContent } from '../../context/HomePageContentContext';

interface TopDesignCardsProps {
  onSelectDesign?: (design: TopDesign) => void;
}

export const TopDesignCards: React.FC<TopDesignCardsProps> = ({ onSelectDesign }) => {
  const { mattressesData } = useHomePageContent();
  const designs =
    mattressesData.megaMenu.topDesignsItems.length > 0
      ? mattressesData.megaMenu.topDesignsItems
      : TOP_DESIGNS;

  return (
    <div className="flex flex-col py-5 px-4 lg:px-5 w-[220px] xl:w-[245px] shrink-0 border-r border-[#E2E8F0] select-none">
      <h4 className="font-serif text-[15px] xl:text-[16px] font-semibold text-[#0A2540] tracking-tight mb-2.5">
        {mattressesData.megaMenu.topDesignsHeading}
      </h4>

      <div className="flex flex-col space-y-2">
        {designs.map((design) => (
          <a
            key={design.id}
            href={design.href}
            onClick={(e) => {
              if (onSelectDesign) {
                e.preventDefault();
                onSelectDesign(design);
              }
            }}
            className="flex items-center gap-2.5 p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F2EFE8] border border-[#E2E8F0] hover:border-[#E3262E]/40 group transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(10,46,115,0.06)]"
          >
            {/* Cross-section Image */}
            <div className="w-[52px] h-[40px] rounded-lg overflow-hidden bg-white border border-[#E2E8F0] shrink-0">
              <img
                src={design.image}
                alt={design.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[12px] font-semibold text-[#0A2540] group-hover:text-[#0A2E73] transition-colors leading-tight">
                {design.name}
              </span>
              <span className="text-[10px] text-[#747A78] leading-tight mt-0.5">
                {design.description}
              </span>
            </div>

            {/* Circular Arrow Button */}
            <div className="w-6 h-6 rounded-full bg-white border border-[#E0DCD3] flex items-center justify-center shrink-0 group-hover:bg-[#0A2E73] group-hover:border-[#0A2E73] text-[#747A78] group-hover:text-white transition-all duration-200 shadow-xs">
              <ArrowRight className="w-3 h-3 stroke-[2]" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
