'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './useAuth';

interface SavedProduct {
  id: string;
  product_id: string;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    designer?: {
      name: string;
    };
  };
}

export function useSavedProducts() {
  const { user } = useAuth();
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedProducts = useCallback(async () => {
    if (!user) {
      setSavedProducts([]);
      setLoading(false);
      return;
    }

    const supabase = createClient();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('saved_products')
        .select(`
          *,
          product:products(id, name, price, image_url, designer:designers(name))
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedProducts(data || []);
    } catch (err) {
      console.error('Error fetching saved products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch saved products');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSavedProducts();
  }, [fetchSavedProducts]);

  const isSaved = useCallback((productId: string) => {
    return savedProducts.some((sp) => sp.product_id === productId);
  }, [savedProducts]);

  const toggleSave = async (productId: string) => {
    if (!user) {
      setError('Please login to save products');
      return false;
    }

    const supabase = createClient();
    const alreadySaved = isSaved(productId);

    try {
      if (alreadySaved) {
        // Remove from saved
        const { error } = await supabase
          .from('saved_products')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) throw error;
      } else {
        // Add to saved
        const { error } = await supabase
          .from('saved_products')
          .insert({ user_id: user.id, product_id: productId });

        if (error) throw error;
      }

      await fetchSavedProducts();
      return true;
    } catch (err) {
      console.error('Error toggling save:', err);
      setError(err instanceof Error ? err.message : 'Failed to save product');
      return false;
    }
  };

  const saveProduct = async (productId: string) => {
    if (isSaved(productId)) return true;
    return toggleSave(productId);
  };

  const unsaveProduct = async (productId: string) => {
    if (!isSaved(productId)) return true;
    return toggleSave(productId);
  };

  return {
    savedProducts,
    loading,
    error,
    isSaved,
    toggleSave,
    saveProduct,
    unsaveProduct,
    refetch: fetchSavedProducts,
  };
}
