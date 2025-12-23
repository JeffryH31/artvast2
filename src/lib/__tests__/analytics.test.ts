import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  pageview,
  event,
  trackProductView,
  trackAddToCart,
  trackPurchase,
  trackSignup,
  trackSearch,
} from '../analytics';

describe('Analytics Utilities', () => {
  beforeEach(() => {
    // Mock window.gtag
    global.window = {
      gtag: vi.fn(),
    } as any;
  });

  describe('pageview', () => {
    it('should track page view', () => {
      const url = '/marketplace';
      pageview(url);
      
      expect(window.gtag).toHaveBeenCalledWith('config', undefined, {
        page_path: url,
      });
    });

    it('should handle undefined window.gtag gracefully', () => {
      delete (window as any).gtag;
      expect(() => pageview('/test')).not.toThrow();
    });
  });

  describe('event', () => {
    it('should track custom event', () => {
      event({
        action: 'click',
        category: 'Button',
        label: 'CTA',
        value: 1,
      });

      expect(window.gtag).toHaveBeenCalledWith('event', 'click', {
        event_category: 'Button',
        event_label: 'CTA',
        value: 1,
      });
    });

    it('should work without optional parameters', () => {
      event({
        action: 'submit',
        category: 'Form',
      });

      expect(window.gtag).toHaveBeenCalledWith('event', 'submit', {
        event_category: 'Form',
        event_label: undefined,
        value: undefined,
      });
    });
  });

  describe('trackProductView', () => {
    it('should track product view event', () => {
      trackProductView('product-123', 'UI Kit Pro');

      expect(window.gtag).toHaveBeenCalledWith('event', 'view_item', {
        event_category: 'Product',
        event_label: 'UI Kit Pro',
        value: expect.any(Number),
      });
    });
  });

  describe('trackAddToCart', () => {
    it('should track add to cart event', () => {
      trackAddToCart('product-456', 'Icon Pack', 29.99);

      expect(window.gtag).toHaveBeenCalledWith('event', 'add_to_cart', {
        event_category: 'Ecommerce',
        event_label: 'Icon Pack',
        value: 29.99,
      });
    });
  });

  describe('trackPurchase', () => {
    it('should track purchase event', () => {
      trackPurchase('order-789', 199.99);

      expect(window.gtag).toHaveBeenCalledWith('event', 'purchase', {
        event_category: 'Ecommerce',
        event_label: 'order-789',
        value: 199.99,
      });
    });
  });

  describe('trackSignup', () => {
    it('should track signup event', () => {
      trackSignup('email');

      expect(window.gtag).toHaveBeenCalledWith('event', 'sign_up', {
        event_category: 'Auth',
        event_label: 'email',
      });
    });
  });

  describe('trackSearch', () => {
    it('should track search event', () => {
      trackSearch('ui design');

      expect(window.gtag).toHaveBeenCalledWith('event', 'search', {
        event_category: 'Engagement',
        event_label: 'ui design',
      });
    });
  });
});
