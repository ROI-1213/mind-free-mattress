import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { MATTRESS_PRODUCTS } from '../../data/pdpData';
import { useNavigation } from '../../context/NavigationContext';

interface RelatedMattressesProps {
  currentSlug: string;
}

export const RelatedMattresses: React.FC<RelatedMattressesProps> = ({ currentSlug }) => {
  const { navigateToProduct } = useNavigation();

  // Exclude current product
  const otherProducts = Object.values(MATTRESS_PRODUCTS).filter(
    (p) => p.slug !== currentSlug
  ).slice(0, 3);

  return (
    <section className="w-full py-16 sm:py-20 bg-[#F8FAFC] border-t border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E3262E] block mb-2">
              COMPARE COLLECTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#071F52]">
              Explore Other Mindfree Mattresses
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md">
            Every Mindfree model is tuned for a distinct sleep posture and thermal comfort preference.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProducts.map((p) => (
            <div
              key={p.slug}
              className="bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] hover:border-[#E3262E]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE5DC]/30">
                  <img
                    src={p.gallery[0].url}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0A2E73]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                    {p.badge}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[#E3262E] font-bold uppercase tracking-wider text-[11px]">
                      {p.category}
                    </span>
                    <div className="flex items-center gap-1 text-[#E3262E]">
                      <Star className="w-3.5 h-3.5 fill-[#E3262E]" />
                      <span className="font-bold text-[#071F52]">{p.rating}</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-[#071F52] mb-1.5 group-hover:text-[#0A2E73] transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-xs text-[#55645D] leading-relaxed line-clamp-2 mb-4">
                    {p.summary}
                  </p>

                  <div className="text-xs text-[#64748B]">
                    From <strong className="text-sm font-serif font-bold text-[#0A2E73]">₹{p.sizes[0].price.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => navigateToProduct(p.slug)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] group-hover:bg-[#0A2E73] text-[#0A2E73] group-hover:text-[#F8FAFC] text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#E2E8F0] group-hover:border-[#0A2E73]"
                >
                  <span>Explore Mattress</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
