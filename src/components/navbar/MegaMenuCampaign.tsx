import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useHomePageContent } from '../../context/HomePageContentContext';

interface MegaMenuCampaignProps {
  onExploreClick?: () => void;
}

export const MegaMenuCampaign: React.FC<MegaMenuCampaignProps> = ({ onExploreClick }) => {
  const { mattressesData } = useHomePageContent();
  const campaign = mattressesData.megaMenu.campaign;

  return (
    <div className="relative flex flex-col justify-between bg-gradient-to-b from-[#071F52] via-[#143327] to-[#0E231B] text-white p-5 lg:p-6 w-[205px] xl:w-[225px] shrink-0 overflow-hidden select-none">
      {/* Top Promotional Copy */}
      <div className="relative z-10">
        <span className="inline-block text-[9.5px] font-semibold tracking-[0.2em] text-[#A8BEA7] uppercase mb-2">
          {campaign.eyebrow}
        </span>

        <h3 className="font-serif text-[22px] xl:text-[24px] font-normal leading-[1.16] text-white tracking-normal">
          {campaign.headlineLine1} <br />
          {campaign.headlineLine2} <br />
          <span className="text-white italic font-serif">{campaign.headlineHighlight}</span>
        </h3>

        <p className="text-[11px] leading-[1.45] text-[#D0DCD2] mt-2.5 max-w-[185px]">
          {campaign.description}
        </p>

        <a
          href="/mattresses/all"
          onClick={(e) => {
            if (onExploreClick) {
              e.preventDefault();
              onExploreClick();
            }
          }}
          className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E3262E] hover:bg-[#A88242] active:scale-95 text-white text-[11px] font-medium tracking-wide shadow-sm transition-all duration-200 group"
        >
          <span>{campaign.ctaText}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* Bottom Mattress Photography: Exact quilted corner with leaf & Mindfree tag */}
      <div className="relative mt-3 -mx-6 -mb-6">
        <div className="relative h-28 w-full overflow-hidden">
          <img
            src={campaign.image}
            alt="MINDFREE luxury mattress organic tufting"
            className="w-full h-full object-cover object-bottom transform hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/campaign_mattress_generated.jpg';
            }}
          />
        </div>
      </div>
    </div>
  );
};
