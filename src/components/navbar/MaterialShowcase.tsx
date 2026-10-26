import React from 'react';
import { CORE_MATERIALS, type CoreMaterial } from '../../data/navigationData';
import { useHomePageContent } from '../../context/HomePageContentContext';

interface MaterialShowcaseProps {
  onSelectMaterial?: (material: CoreMaterial) => void;
}

export const MaterialShowcase: React.FC<MaterialShowcaseProps> = ({ onSelectMaterial }) => {
  const { mattressesData } = useHomePageContent();
  const materials =
    mattressesData.megaMenu.coreMaterialsItems.length > 0
      ? mattressesData.megaMenu.coreMaterialsItems
      : CORE_MATERIALS;

  return (
    <div className="flex flex-col py-4 px-3.5 xl:px-4.5 w-[210px] xl:w-[230px] shrink-0 border-r border-[#E2E8F0] select-none">
      <h4 className="font-serif text-[15px] xl:text-[16px] font-semibold text-[#0A2540] tracking-tight mb-2">
        {mattressesData.megaMenu.coreMaterialsHeading}
      </h4>

      <div className="flex flex-col space-y-1">
        {materials.map((mat) => (
          <a
            key={mat.id}
            href={mat.href}
            onClick={(e) => {
              if (onSelectMaterial) {
                e.preventDefault();
                onSelectMaterial(mat);
              }
            }}
            className="flex items-center gap-2.5 py-1.5 px-1.5 rounded-lg hover:bg-[#EFF6FF] group transition-all duration-150"
          >
            {/* Material Realistic Thumbnail */}
            <div className="w-[44px] h-[34px] rounded-md overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0] shrink-0">
              <img
                src={mat.image}
                alt={mat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
              />
            </div>

            {/* Text description */}
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] font-semibold text-[#0A2540] group-hover:text-[#0A2E73] transition-colors leading-tight">
                {mat.name}
              </span>
              <span className="text-[10px] text-[#747A78] leading-tight mt-0.5">
                {mat.description}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
