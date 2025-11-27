'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Designer, DesignerWithWorks, FeaturedWork } from '@/types/database.types'

type DesignerRow = Designer
type FeaturedWorkRow = FeaturedWork

export function useDesigners() {
  const [designers, setDesigners] = useState<DesignerWithWorks[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDesigners = useCallback(async () => {
    const supabase = createClient()
    setLoading(true)
    
    try {
      // Fetch designers
      const { data: designersData, error: designersError } = await supabase
        .from('designers')
        .select('*')
        .order('rating', { ascending: false })

      if (designersError) throw designersError

      // Fetch featured works for all designers
      const { data: worksData, error: worksError } = await supabase
        .from('featured_works')
        .select('*')
        .order('order', { ascending: true })

      if (worksError) throw worksError

      // Combine designers with their featured works
      const designers = designersData as DesignerRow[] || []
      const works = worksData as FeaturedWorkRow[] || []
      
      const designersWithWorks: DesignerWithWorks[] = designers.map(designer => ({
        ...designer,
        featured_works: works.filter(work => work.designer_id === designer.id)
      }))

      setDesigners(designersWithWorks)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch designers')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDesigners()
  }, [fetchDesigners])

  return { designers, loading, error, refetch: fetchDesigners }
}

export function useDesigner(id: string) {
  const [designer, setDesigner] = useState<DesignerWithWorks | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDesigner() {
      const supabase = createClient()
      setLoading(true)

      try {
        const { data: designerData, error: designerError } = await supabase
          .from('designers')
          .select('*')
          .eq('id', id)
          .single()

        if (designerError) throw designerError

        const { data: worksData, error: worksError } = await supabase
          .from('featured_works')
          .select('*')
          .eq('designer_id', id)
          .order('order', { ascending: true })

        if (worksError) throw worksError

        const designer = designerData as DesignerRow
        const works = worksData as FeaturedWorkRow[] || []
        
        setDesigner({
          ...designer,
          featured_works: works
        })
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch designer')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchDesigner()
  }, [id])

  return { designer, loading, error }
}
