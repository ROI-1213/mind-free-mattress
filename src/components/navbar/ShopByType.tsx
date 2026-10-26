import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MATTRESS_CATEGORIES, type MattressCategory } from '../../data/navigationData';
import { useHomePageContent } from '../../context/HomePageContentContext';

interface ShopByTypeProps {
  onSelectCategory?: (category: MattressCategory) => void;
}

export const ShopByType: React.FC<ShopByTypeProps> = ({ onSelectCategory }) => {
  const { mattressesData } = useHomePageContent();
  const categories =
    mattressesData.megaMenu.shopByTypeItems.length > 0
      ? mattressesData.megaMenu.shopByTypeItems
      : MATTRESS_CATEGORIES;

  return (
    <div className="flex flex-col py-5 px-4 lg:px-5 w-[185px] xl:w-[205px] shrink-0 border-r border-[#E2E8F0] select-none">
      <h4 className="font-serif text-[15px] xl:text-[16px] font-semibold text-[#0A2540] tracking-tight mb-2.5">
        {mattressesData.megaMenu.shopByTypeHeading}
      </h4>

      <div className="flex flex-col space-y-0.5">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={cat.href}
            onClick={(e) => {
              if (onSelectCategory) {
                e.preventDefault();
                onSelectCategory(cat);
              }
            }}
            className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#EFF6FF] group transition-all duration-150"
          >
            {/* Left Thumbnail + Label */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-[32px] h-[22px] rounded-md overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0] shrink-0 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain p-0.5 group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <span className="text-[12px] font-medium text-[#0A2540] group-hover:text-[#0A2E73] truncate transition-colors">
                {cat.name}
              </span>
            </div>

            {/* Right Chevron */}
            <ChevronRight
              className="w-3.5 h-3.5 text-[#B8C0BA] group-hover:text-[#0A2E73] group-hover:translate-x-0.5 transition-all shrink-0"
              strokeWidth={1.8}
            />
          </a>
        ))}
      </div>
    </div>
  );
};
