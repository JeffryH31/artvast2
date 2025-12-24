export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// User roles from RBAC schema
export type UserRole = 'user' | 'designer' | 'admin'

// Order status from user features schema
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'

// Application status from RBAC schema
export type ApplicationStatus = 'pending' | 'approved' | 'rejected'

// Payment method types
export type PaymentMethod = 'card' | 'paypal' | 'crypto'

export interface Database {
  public: {
    Tables: {
      // Main tables from schema.sql
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
      // User features tables from schema-user-features.sql
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: UserRole
          bio: string | null
          location: string | null
          website: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: UserRole
          bio?: string | null
          location?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: UserRole
          bio?: string | null
          location?: string | null
          website?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          product_id: string
          status: OrderStatus
          total_amount: number
          payment_method: PaymentMethod
          contact_email: string
          contact_name: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          product_id: string
          status?: OrderStatus
          total_amount: number
          payment_method: PaymentMethod
          contact_email: string
          contact_name?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          product_id?: string
          status?: OrderStatus
          total_amount?: number
          payment_method?: PaymentMethod
          contact_email?: string
          contact_name?: string | null
        }
      }
      saved_products: {
        Row: {
          id: string
          created_at: string
          user_id: string
          product_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          product_id: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          product_id?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          product_id: string
          quantity: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          product_id: string
          quantity?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          product_id?: string
          quantity?: number
        }
      }
      // RBAC tables from schema-rbac.sql
      designer_applications: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          status: ApplicationStatus
          specialty: string
          portfolio_url: string | null
          description: string | null
          reviewed_by: string | null
          reviewed_at: string | null
          rejection_reason: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          status?: ApplicationStatus
          specialty: string
          portfolio_url?: string | null
          description?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          status?: ApplicationStatus
          specialty?: string
          portfolio_url?: string | null
          description?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
        }
      }
      designer_analytics: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          designer_id: string
          views: number
          sales: number
          revenue: number
          rating: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          designer_id: string
          views?: number
          sales?: number
          revenue?: number
          rating?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          designer_id?: string
          views?: number
          sales?: number
          revenue?: number
          rating?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_designer: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      promote_to_designer: {
        Args: { target_user_id: string }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types for main tables
export type Designer = Database['public']['Tables']['designers']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type Category = Database['public']['Tables']['categories']['Row']

// Helper types for user features
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type SavedProduct = Database['public']['Tables']['saved_products']['Row']
export type CartItem = Database['public']['Tables']['cart_items']['Row']

// Helper types for RBAC
export type DesignerApplication = Database['public']['Tables']['designer_applications']['Row']
export type DesignerAnalytics = Database['public']['Tables']['designer_analytics']['Row']

// Extended types with relations
export interface CartItemWithProduct extends CartItem {
  product: Product & {
    designer: Designer
  }
}

export interface OrderWithProduct extends Order {
  product: Product & {
    designer: Designer
  }
}

export interface SavedProductWithDetails extends SavedProduct {
  product: Product & {
    designer: Designer
  }
}
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
