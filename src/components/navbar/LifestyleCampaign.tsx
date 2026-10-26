import React, { useState } from 'react';
import { useHomePageContent } from '../../context/HomePageContentContext';

interface LifestyleCampaignProps {
  initialImage?: 'reference' | 'generated';
}

export const LifestyleCampaign: React.FC<LifestyleCampaignProps> = ({ initialImage = 'reference' }) => {
  const { mattressesData } = useHomePageContent();
  const banner = mattressesData.megaMenu.lifestyleBanner;
  const [useGenerated, setUseGenerated] = useState(initialImage === 'generated');

  return (
    <div className="relative flex-1 min-w-[280px] h-full overflow-hidden select-none group bg-[#F5F2EB]">
      {/* Background Bedroom Lifestyle Image */}
      <img
        src={useGenerated ? '/images/bedroom_lifestyle_generated.jpg' : banner.image}
        alt={banner.altText}
        className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/images/bedroom_reference.png';
        }}
      />

      {/* If using generated image, render overlay text; if using reference, the typography is already in the photo */}
      {useGenerated && (
        <div className="absolute top-5 right-6 sm:top-6 sm:right-8 text-right pointer-events-none">
          <div className="font-serif leading-[1.12]">
            <span className="block text-[15px] sm:text-[17px] text-[#0A2E73] font-normal italic tracking-wide">
              A
            </span>
            <span className="block text-[22px] sm:text-[26px] xl:text-[28px] text-[#0A2E73] font-normal tracking-[-0.01em]">
              Healthier
            </span>
            <span className="block text-[22px] sm:text-[26px] xl:text-[28px] text-[#E3262E] italic font-normal tracking-[-0.01em]">
              Happier
            </span>
            <span className="block text-[22px] sm:text-[26px] xl:text-[28px] text-[#0A2E73] font-normal tracking-[-0.01em]">
              You
            </span>
          </div>
        </div>
      )}

      {/* Subtle toggle pill for user in top-right or hover corner */}
      <div className="absolute bottom-2.5 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setUseGenerated(!useGenerated);
          }}
          className="bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white text-[9.5px] px-2.5 py-1 rounded-full border border-white/20 transition-colors shadow-sm"
          title="Toggle between Reference and Generated 8K photo"
        >
          {useGenerated ? 'Switch to Exact Reference' : 'Switch to Generated 8K'}
        </button>
      </div>
    </div>
  );
};
