export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      designers: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string | null
          name: string
          username: string
          avatar_url: string | null
          avatar_initials: string
          avatar_gradient: string
          bio: string | null
          specialties: string[]
          rating: number
          projects_count: number
          followers_count: number
          verified: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          name: string
          username: string
          avatar_url?: string | null
          avatar_initials: string
          avatar_gradient?: string
          bio?: string | null
          specialties?: string[]
          rating?: number
          projects_count?: number
          followers_count?: number
          verified?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          name?: string
          username?: string
          avatar_url?: string | null
          avatar_initials?: string
          avatar_gradient?: string
          bio?: string | null
          specialties?: string[]
          rating?: number
          projects_count?: number
          followers_count?: number
          verified?: boolean
        }
      }
      products: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          designer_id: string
          name: string
          description: string
          category: string
          price: number
          original_price: number | null
          rating: number
          review_count: number
          image_url: string
          images: string[]
          featured: boolean
          features: string[]
          delivery_time: string
          license_type: string
          tags: string[]
          bestseller: boolean
          trending: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          designer_id: string
          name: string
          description: string
          category: string
          price: number
          original_price?: number | null
          rating?: number
          review_count?: number
          image_url: string
          images?: string[]
          featured?: boolean
          features?: string[]
          delivery_time?: string
          license_type?: string
          tags?: string[]
          bestseller?: boolean
          trending?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          designer_id?: string
          name?: string
          description?: string
          category?: string
          price?: number
          original_price?: number | null
          rating?: number
          review_count?: number
          image_url?: string
          images?: string[]
          featured?: boolean
          features?: string[]
          delivery_time?: string
          license_type?: string
          tags?: string[]
          bestseller?: boolean
          trending?: boolean
        }
      }
      portfolio_items: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          designer_id: string
          title: string
          description: string | null
          category: string
          image_url: string
          featured: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          designer_id: string
          title: string
          description?: string | null
          category: string
          image_url: string
          featured?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          designer_id?: string
          title?: string
          description?: string | null
          category?: string
          image_url?: string
          featured?: boolean
        }
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          product_id: string
          user_id: string | null
          author_name: string
          author_avatar: string | null
          rating: number
          comment: string
        }
        Insert: {
          id?: string
          created_at?: string
          product_id: string
          user_id?: string | null
          author_name: string
          author_avatar?: string | null
          rating: number
          comment: string
        }
        Update: {
          id?: string
          created_at?: string
          product_id?: string
          user_id?: string | null
          author_name?: string
          author_avatar?: string | null
          rating?: number
          comment?: string
        }
      }
      featured_works: {
        Row: {
          id: string
          created_at: string
          designer_id: string
          image: string
          title: string
          order: number
        }
        Insert: {
          id?: string
          created_at?: string
          designer_id: string
          image: string
          title: string
          order?: number
        }
        Update: {
          id?: string
          created_at?: string
          designer_id?: string
          image?: string
          title?: string
          order?: number
        }
      }
      categories: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
          description: string | null
          icon: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Designer = Database['public']['Tables']['designers']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type FeaturedWork = Database['public']['Tables']['featured_works']['Row']
export type Category = Database['public']['Tables']['categories']['Row']

// Product with designer relation
export type ProductWithDesigner = Product & {
  designer: Designer
}

// Designer with featured works
export type DesignerWithWorks = Designer & {
  featured_works: FeaturedWork[]
}
