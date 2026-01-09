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
          <h2 className="text-2xl font-bold text-gray-900">{t.reviews.title}</h2>
          {totalReviews > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
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
              <span className="text-gray-600 text-sm">
                {averageRating.toFixed(1)} ({totalReviews} {totalReviews === 1 ? t.reviews.review : t.reviews.reviewsPlural})
              </span>
            </div>
          )}
        </div>

        {canReview && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors cursor-pointer"
          >
            {t.reviews.writeReview}
          </button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 border-2 border-purple-500/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.reviews.writeYourReview}</h3>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.reviews.rating}</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none cursor-pointer"
                >
                  <svg
                    className={`w-8 h-8 ${
                      star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    } hover:text-yellow-400 transition-colors`}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.reviews.yourReview}</label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t.reviews.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white rounded-lg transition-colors cursor-pointer"
            >
              {submitting ? t.reviews.submitting : t.reviews.submitReview}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors cursor-pointer"
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
            <div key={i} className="animate-pulse bg-gray-50 rounded-xl p-6">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {review.author_avatar || review.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{review.author_name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
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

              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t.reviews.noReviewsYet}</h3>
          <p className="text-gray-600">{t.reviews.beFirstToReview}</p>
        </div>
      )}
    </div>
  );
}
