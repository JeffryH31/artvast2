// Shared constants for the application

export const APP_NAME = 'Artvast';
export const APP_DESCRIPTION = 'Creative Platform for Designers';

// API Constants
export const API_ROUTES = {
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    SIGNOUT: '/auth/signout',
    RESET_PASSWORD: '/auth/reset-password',
  },
  CART: '/cart',
  CHECKOUT: '/checkout',
  DASHBOARD: '/dashboard',
  MARKETPLACE: '/marketplace',
  DESIGNERS: '/designers',
  PORTFOLIO: '/portfolio',
  BECOME_DESIGNER: '/become-designer',
} as const;

// User Roles
export const USER_ROLES = {
  USER: 'user',
  DESIGNER: 'designer',
  ADMIN: 'admin',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

// Payment Status
export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PAID: 'paid',
  REFUNDED: 'refunded',
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];

// Application Status
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];

// Categories - using slug format matching database
export const PRODUCT_CATEGORIES = [
  'branding',
  'ui-ux-design',
  'motion-graphics',
  'illustration',
  'graphic-design',
  'photography',
  '3d-design',
  'web-design',
] as const;

// Popular categories for filter display (subset of PRODUCT_CATEGORIES)
export const POPULAR_CATEGORIES = [
  'branding',
  'ui-ux-design',
  'illustration',
  'graphic-design',
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

// Error Messages
export const ERROR_MESSAGES = {
  AUTH: {
    NOT_AUTHENTICATED: 'Please login to continue',
    INVALID_CREDENTIALS: 'Invalid email or password',
    SESSION_EXPIRED: 'Your session has expired. Please login again',
  },
  CART: {
    ADD_FAILED: 'Failed to add item to cart',
    UPDATE_FAILED: 'Failed to update cart',
    REMOVE_FAILED: 'Failed to remove item from cart',
  },
  PRODUCT: {
    NOT_FOUND: 'Product not found',
    LOAD_FAILED: 'Failed to load product',
  },
  GENERIC: {
    SOMETHING_WRONG: 'Something went wrong. Please try again',
    NETWORK_ERROR: 'Network error. Please check your connection',
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CART: {
    ADDED: 'Added to cart!',
    REMOVED: 'Removed from cart',
    UPDATED: 'Cart updated',
  },
  WISHLIST: {
    ADDED: 'Added to wishlist',
    REMOVED: 'Removed from wishlist',
  },
  ORDER: {
    PLACED: 'Order placed successfully!',
  },
  APPLICATION: {
    SUBMITTED: 'Application submitted successfully!',
  },
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PRODUCTS_PER_PAGE: 12,
  DESIGNERS_PER_PAGE: 8,
  PORTFOLIO_PER_PAGE: 9,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'artvast_theme',
  RECENT_SEARCHES: 'artvast_recent_searches',
} as const;

// Query Keys for React Query (if using)
export const QUERY_KEYS = {
  PRODUCTS: 'products',
  PRODUCT: 'product',
  DESIGNERS: 'designers',
  DESIGNER: 'designer',
  PORTFOLIO: 'portfolio',
  CART: 'cart',
  SAVED_PRODUCTS: 'saved_products',
  ORDERS: 'orders',
  USER_PROFILE: 'user_profile',
} as const;
