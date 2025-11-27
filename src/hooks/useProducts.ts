'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Product, ProductWithDesigner, Review, Category } from '@/types/database.types'

interface UseProductsOptions {
  category?: string
  featured?: boolean
  limit?: number
  search?: string
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<ProductWithDesigner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    const supabase = createClient()
    setLoading(true)

    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          designer:designers(*)
        `)
        .order('created_at', { ascending: false })

      if (options.category && options.category !== 'All Categories') {
        query = query.eq('category', options.category)
      }

      if (options.featured) {
        query = query.eq('featured', true)
      }

      if (options.limit) {
        query = query.limit(options.limit)
      }

      if (options.search) {
        query = query.ilike('name', `%${options.search}%`)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      setProducts(data as ProductWithDesigner[] || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }, [options.category, options.featured, options.limit, options.search])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<ProductWithDesigner | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      const supabase = createClient()
      setLoading(true)

      try {
        // Fetch product with designer
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select(`
            *,
            designer:designers(*)
          `)
          .eq('id', id)
          .single()

        if (productError) throw productError

        // Fetch reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*')
          .eq('product_id', id)
          .order('created_at', { ascending: false })

        if (reviewsError) throw reviewsError

        setProduct(productData as ProductWithDesigner)
        setReviews(reviewsData || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id])

  return { product, reviews, loading, error }
}

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('categories')
        .select('name')
        .order('name')

      if (!error && data) {
        const categories = data as Category[]
        setCategories(['All Categories', ...categories.map(c => c.name)])
      }
      setLoading(false)
    }

    fetchCategories()
  }, [])

  return { categories, loading }
}
