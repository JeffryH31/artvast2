"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { PortfolioItem } from "@/types/database.types";

interface UsePortfolioOptions {
  category?: string;
  designerId?: string;
  featured?: boolean;
}

export function usePortfolio(options: UsePortfolioOptions = {}) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    const supabase = createClient();
    setLoading(true);

    try {
      let query = supabase
        .from("portfolio_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (options.category && options.category !== "All") {
        query = query.eq("category", options.category);
      }

      if (options.designerId) {
        query = query.eq("designer_id", options.designerId);
      }

      if (options.featured) {
        query = query.eq("featured", true);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setItems(data || []);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch portfolio items"
      );
    } finally {
      setLoading(false);
    }
  }, [options.category, options.designerId, options.featured]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refetch: fetchItems };
}
