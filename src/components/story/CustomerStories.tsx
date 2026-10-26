import React, { useState, useEffect } from 'react';
import { Star, X, CheckCircle2 } from 'lucide-react';
import { useHomePageContent } from '../../context/HomePageContentContext';

interface GoogleReviewItem {
  id: string;
  name: string;
  date: string;
  rating: number;
  reviewText?: string;
}

const INITIAL_GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Rohan Deshmukh',
    date: '19-10-2026',
    rating: 5,
    reviewText:
      'Switched to the Mindfree Ultima Pocket Spring mattress last month and my lower back stiffness has completely vanished. Truly hotel-grade luxury comfort!',
  },
  {
    id: 'rev-2',
    name: 'Priya Subramanian',
    date: '16-10-2026',
    rating: 5,
    reviewText:
      'Wonderful experience! The Natural Latex mattress stays remarkably cool throughout the night and the build quality is top notch. 😊',
  },
  {
    id: 'rev-3',
    name: 'Vikramaditya Malhotra',
    date: '14-10-2026',
    rating: 5,
  },
  {
    id: 'rev-4',
    name: 'Sneha Kulkarni',
    date: '12-10-2026',
    rating: 5,
    reviewText:
      'Great experience..! Must visit if you are looking for a comfortable and orthopedic mattress option for your home...! 😊',
  },
  {
    id: 'rev-5',
    name: 'Arjun Venkatesh',
    date: '09-10-2026',
    rating: 5,
    reviewText:
      'Ordered the Ortho Firm 6-inch mattress for my parents. Perfect firm support, zero sagging, and seamless doorstep delivery.',
  },
  {
    id: 'rev-6',
    name: 'Meera Chatterjee',
    date: '06-10-2026',
    rating: 5,
  },
  {
    id: 'rev-7',
    name: 'Siddharth Singhania',
    date: '03-10-2026',
    rating: 5,
    reviewText:
      'The Euro Top finish on the Ultra Latex Plus feels plush yet supportive. Easily the best investment we made for our master bedroom.',
  },
  {
    id: 'rev-8',
    name: 'Kavita Nambiar',
    date: '29-09-2026',
    rating: 5,
    reviewText:
      'Superb cushioning and premium knitted fabric finish. Highly recommend Mindfree to anyone upgrading their bed.',
  },
];

/** Authentic 4-Color Google 'G' Icon */
const GoogleGIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
    />
  </svg>
);

export const CustomerStories: React.FC = () => {
  const { homePageData } = useHomePageContent();
  const [reviews, setReviews] = useState<GoogleReviewItem[]>(INITIAL_GOOGLE_REVIEWS);
  const [extraReviewCount, setExtraReviewCount] = useState<number>(0);
  const totalReviewCount = homePageData.reviewsSummary.baseReviewCount + extraReviewCount;
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Synchronize reviews from PostgreSQL (/api/reviews)
  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      })
      .catch(() => {
        // Fallback to initial seed reviews if offline
      });
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const added: GoogleReviewItem = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      date: `${dd}-${mm}-${yyyy}`,
      rating: newRating,
      reviewText: newComment.trim() || undefined,
    };

    // Persist directly to PostgreSQL
    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(added),
    }).catch((err) => console.warn('PostgreSQL review save warning:', err));

    setReviews((prev) => [added, ...prev]);
    setExtraReviewCount((c) => c + 1);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setIsWriteModalOpen(false);
      setNewName('');
      setNewComment('');
      setNewRating(5);
    }, 1400);
  };

  return (
    <div className="w-full py-6 font-dm">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F6F6F6] border border-[#E8E6E1] p-6 sm:p-10">
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 lg:gap-12">
            {/* LEFT: Google Average Rating Summary Card */}
            <div className="w-full max-w-[280px] shrink-0 bg-white rounded-[22px] shadow-[0_6px_28px_rgba(0,0,0,0.12)] px-7 py-8 flex flex-col items-center justify-center text-center">
              {/* Authentic Multi-Color Google Wordmark */}
              <div
                className="text-[42px] font-semibold tracking-tight leading-none select-none mb-2"
                aria-label="Google"
              >
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>

              <p className="text-[18px] font-normal text-[#222222] mt-1">
                Average rating
              </p>

              <div className="text-[64px] font-normal text-[#111111] leading-none my-3">
                {homePageData.reviewsSummary.averageRating}
              </div>

              {/* 5 Golden Yellow Stars */}
              <div className="flex items-center justify-center gap-1.5 my-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-7 h-7 fill-[#FFD700] text-[#FFD700]"
                  />
                ))}
              </div>

              <p className="text-[14px] font-normal text-[#555555] mt-3 mb-5">
                Based on {totalReviewCount} Reviews
              </p>

              <button
                type="button"
                onClick={() => setIsWriteModalOpen(true)}
                className="w-full min-h-[48px] py-2.5 px-5 rounded-xl border border-[#E53935] text-[#E53935] hover:bg-[#E53935] hover:text-white active:scale-95 text-[15px] font-medium transition-all duration-200 cursor-pointer flex items-center justify-center shadow-2xs"
              >
                Write a Review
              </button>
            </div>

            {/* RIGHT: Scrollable Google Review Cards List */}
            <div className="flex-1 w-full max-h-[430px] overflow-y-auto pr-2 space-y-3.5 custom-scrollbar">
              {reviews.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/95 backdrop-blur-md rounded-xl px-5 py-4 shadow-[0_2px_8px_rgba(10,37,64,0.04)] hover:shadow-[0_8px_22px_rgba(10,46,115,0.08)] hover:-translate-y-0.5 transition-all duration-300 border border-[#E2E8F0]/80"
                >
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <GoogleGIcon className="w-5 h-5 shrink-0" />
                    <span className="text-[15px] font-normal text-[#222222]">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-0.5 ml-1">
                      {Array.from({ length: item.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pl-7 mt-0.5">
                    <span className="text-[12px] text-[#777777] block">
                      {item.date}
                    </span>

                    {item.reviewText && (
                      <p className="text-[14px] font-normal text-[#222222] leading-[1.6] mt-2">
                        {item.reviewText}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsWriteModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <GoogleGIcon className="w-5 h-5" />
                <h3 className="text-[18px] font-semibold text-[#222222]">
                  Write a Google Review
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <p className="text-[18px] font-semibold text-[#0A2E73]">
                  Thank you for your review!
                </p>
                <p className="text-[14px] text-[#555555]">
                  Your review has been added to the list.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="text-[12px] font-medium text-[#444444] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-[14px] focus:outline-none focus:border-[#4285F4]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-medium text-[#444444] block mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating
                              ? 'fill-[#FFC107] text-[#FFC107]'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-medium text-[#444444] block mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your experience with Mindfree Mattresses..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-[14px] focus:outline-none focus:border-[#4285F4]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#E53935] hover:bg-[#D32F2F] text-white text-[14px] font-semibold transition-colors cursor-pointer"
                >
                  Post Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
