import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';
import { type ProductReview } from '../../data/pdpData';

interface ProductReviewsSectionProps {
  reviews: ProductReview[];
  rating: number;
  reviewsCount: number;
  productName: string;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  reviews,
  rating,
  reviewsCount,
  productName,
}) => {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [helpfulLikes, setHelpfulLikes] = useState<Record<string, number>>({});

  const handleHelpful = (id: string, initialCount: number) => {
    setHelpfulLikes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
  };

  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  return (
    <section className="w-full py-16 sm:py-20 bg-white border-t border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2 text-[#E3262E] text-xs font-semibold uppercase tracking-wider">
            <Star className="w-4 h-4 fill-[#E3262E]" />
            <span>REAL EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#071F52] tracking-tight mb-2">
            Verified Customer Reviews
          </h2>
          <p className="text-xs sm:text-sm text-[#55645D]">
            Read unfiltered feedback from homeowners who sleep on the {productName} every night.
          </p>
        </div>

        {/* Rating Summary Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] mb-12">
          
          {/* Big Score (Col 1-4) */}
          <div className="md:col-span-4 text-center md:border-r border-[#E2E8F0] md:pr-6">
            <div className="font-serif text-5xl sm:text-6xl font-bold text-[#071F52]">
              {rating}
            </div>
            <div className="flex items-center justify-center gap-1 my-2 text-[#E3262E]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#E3262E]" />
              ))}
            </div>
            <div className="text-xs text-[#64748B]">
              Based on {reviewsCount} verified purchases
            </div>
          </div>

          {/* Breakdown Bars (Col 5-12) */}
          <div className="md:col-span-8 space-y-2">
            {[
              { stars: 5, percent: 92, count: Math.round(reviewsCount * 0.92) },
              { stars: 4, percent: 7, count: Math.round(reviewsCount * 0.07) },
              { stars: 3, percent: 1, count: Math.round(reviewsCount * 0.01) },
              { stars: 2, percent: 0, count: 0 },
              { stars: 1, percent: 0, count: 0 },
            ].map((row) => (
              <div
                key={row.stars}
                onClick={() => setFilterRating(filterRating === row.stars ? null : row.stars)}
                className="flex items-center gap-3 text-xs cursor-pointer group"
              >
                <span className="w-12 text-[#64748B] font-medium group-hover:text-[#0A2E73]">
                  {row.stars} Stars
                </span>
                <div className="flex-1 h-2 rounded-full bg-[#E5E0D5] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#E3262E] group-hover:bg-[#0A2E73] transition-colors"
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
                <span className="w-12 text-right text-[#64748B] font-mono text-[11px]">
                  {row.percent}%
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Filter Indicator */}
        {filterRating && (
          <div className="mb-6 flex items-center justify-between bg-[#DBEAFE] px-4 py-2 rounded-xl text-xs text-[#0A2E73]">
            <span>Showing only {filterRating}-star reviews</span>
            <button
              type="button"
              onClick={() => setFilterRating(null)}
              className="font-bold underline cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((rev) => {
            const currentHelpful = helpfulLikes[rev.id] ?? rev.helpfulCount;
            return (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#071F52]">{rev.author}</span>
                    {rev.verifiedBuyer && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Verified Owner
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#94A3B8]">{rev.date}</span>
                </div>

                <div className="flex items-center gap-2 mb-2 text-[#E3262E]">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#E3262E]" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#0A2E73]">• {rev.location}</span>
                </div>

                <h4 className="text-sm sm:text-base font-semibold text-[#071F52] mb-1.5">
                  "{rev.title}"
                </h4>

                <p className="text-xs sm:text-[13px] text-[#55645D] leading-relaxed mb-4">
                  {rev.content}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
                  <span>Was this review helpful?</span>
                  <button
                    type="button"
                    onClick={() => handleHelpful(rev.id, rev.helpfulCount)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#DBEAFE] text-[#0A2E73] font-medium transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3 h-3 text-[#E3262E]" />
                    <span>Helpful ({currentHelpful})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
