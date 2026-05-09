'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useReviews } from '@/hooks/useReviews';
import { useLanguage } from '@/lib/i18n';

interface ReviewSectionProps {
  productId: string;
}

export function ReviewSection({ productId }: ReviewSectionProps) {
  const { reviews, loading, canReview, averageRating, totalReviews, addReview } = useReviews(productId);
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error(t.reviews.pleaseWriteReview);
      return;
    }

    setSubmitting(true);

    try {
      await addReview(rating, comment);
      toast.success(t.reviews.reviewAddedSuccess);
      setShowForm(false);
      setComment('');
      setRating(5);
    } catch (error) {
      toast.error(t.reviews.failedToAddReview);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{t.reviews.title}</h2>
          {totalReviews > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-white/20'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-[#DFE7F7]/70 text-sm">
                {averageRating.toFixed(1)} ({totalReviews} {totalReviews === 1 ? t.reviews.review : t.reviews.reviewsPlural})
              </span>
            </div>
          )}
        </div>

        {canReview && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2.5 btn-primary text-white rounded-xl font-semibold cursor-pointer"
          >
            {t.reviews.writeReview}
          </button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 border border-[#234CF9]/30">
          <h3 className="text-lg font-semibold text-white mb-4">{t.reviews.writeYourReview}</h3>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#DFE7F7]/80 mb-2">{t.reviews.rating}</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none cursor-pointer transition-transform hover:scale-125"
                >
                  <svg
                    className={`w-8 h-8 ${
                      star <= rating ? 'text-yellow-400 fill-current drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]' : 'text-white/20'
                    } transition-all duration-200`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#DFE7F7]/80 mb-2">{t.reviews.yourReview}</label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t.reviews.placeholder}
              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#234CF9] focus:border-[#234CF9]/50 resize-none text-white placeholder-white/30 transition-all duration-300"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 btn-primary disabled:opacity-50 text-white rounded-xl font-semibold cursor-pointer"
            >
              {submitting ? t.reviews.submitting : t.reviews.submitReview}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-xl transition-all duration-300 cursor-pointer"
            >
              {t.reviews.cancel}
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl p-6 border border-white/10 overflow-hidden relative bg-white/5">
              <div className="animate-shimmer absolute inset-0" />
              <div className="h-4 bg-white/10 rounded w-1/4 mb-3"></div>
              <div className="h-3 bg-white/10 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-white/10 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, idx) => (
            <div
              key={review.id}
              className="glass-card rounded-2xl p-6 border border-white/10 group"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#234CF9] to-[#1C277B] rounded-full flex items-center justify-center text-white font-bold shadow-[0_0_12px_rgba(35,76,249,0.3)]">
                    {review.author_avatar || review.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{review.author_name}</p>
                    <p className="text-xs text-white/40">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-white/15'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  ))}
                </div>
              </div>

              <p className="text-white/80 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-14 glass-card rounded-2xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#234CF9]/15 border border-[#234CF9]/25 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#234CF9]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{t.reviews.noReviewsYet}</h3>
          <p className="text-white/50">{t.reviews.beFirstToReview}</p>
        </div>
      )}
    </div>
  );
}
