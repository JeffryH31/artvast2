'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './useAuth';

interface Review {
  id: string;
  product_id: string;
  user_id: string;
  author_name: string;
  author_avatar?: string;
  rating: number;
  comment: string;
  created_at: string;
}

export function useReviews(productId: string) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    fetchReviews();
    checkCanReview();
  }, [productId, user]);

  const fetchReviews = async () => {
    const supabase = createClient();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const checkCanReview = async () => {
    if (!user) {
      setCanReview(false);
      return;
    }

    const supabase = createClient();

    try {
      // Check if user has purchased this product
      const { data: orders } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .eq('payment_status', 'paid')
        .limit(1);

      // Check if user already reviewed
      const { data: existingReview } = await supabase
        .from('reviews')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .limit(1);

      setCanReview(!!orders && orders.length > 0 && !existingReview);
    } catch (err) {
      console.error('Error checking review eligibility:', err);
      setCanReview(false);
    }
  };

  const addReview = async (rating: number, comment: string) => {
    if (!user) {
      throw new Error('Must be logged in to review');
    }

    const supabase = createClient();

    try {
      const { error } = await supabase.from('reviews').insert({
        product_id: productId,
        user_id: user.id,
        author_name: user.email?.split('@')[0] || 'Anonymous',
        rating,
        comment,
      } as never);

      if (error) throw error;

      await fetchReviews();
      setCanReview(false);
      return true;
    } catch (err) {
      console.error('Error adding review:', err);
      throw err;
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return {
    reviews,
    loading,
    error,
    canReview,
    averageRating,
    totalReviews: reviews.length,
    addReview,
    refetch: fetchReviews,
  };
}
