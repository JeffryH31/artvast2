/**
 * Analytics utilities for tracking user behavior
 */

// Google Analytics
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    });
  }
};

// Track events
interface EventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: EventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Common event trackers
export const trackProductView = (productId: string, productName: string) => {
  event({
    action: 'view_item',
    category: 'Product',
    label: productName,
    value: parseInt(productId.substring(0, 8), 16),
  });
};

export const trackAddToCart = (productId: string, productName: string, price: number) => {
  event({
    action: 'add_to_cart',
    category: 'Ecommerce',
    label: productName,
    value: price,
  });
};

export const trackPurchase = (orderId: string, value: number) => {
  event({
    action: 'purchase',
    category: 'Ecommerce',
    label: orderId,
    value: value,
  });
};

export const trackSignup = (method: string) => {
  event({
    action: 'sign_up',
    category: 'Auth',
    label: method,
  });
};

export const trackSearch = (searchTerm: string) => {
  event({
    action: 'search',
    category: 'Engagement',
    label: searchTerm,
  });
};

// Declare gtag types
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}
