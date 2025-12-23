import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  sanitizeInput,
  isValidPrice,
  isValidQuantity,
  sanitizeFileName,
  escapeHtml,
  sanitizeSearchQuery,
  checkRateLimit,
} from '../security';

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
      expect(sanitizeInput('<b>Bold</b> text')).toBe('bBold/b text');
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
    });

    it('should limit length to 1000 characters', () => {
      const longText = 'a'.repeat(2000);
      expect(sanitizeInput(longText).length).toBe(1000);
    });

    it('should handle empty strings', () => {
      expect(sanitizeInput('')).toBe('');
    });

    it('should remove angle brackets', () => {
      expect(sanitizeInput('Test < and >')).toBe('Test  and ');
    });
  });

  describe('isValidPrice', () => {
    it('should accept valid prices', () => {
      expect(isValidPrice(99.99)).toBe(true);
      expect(isValidPrice(1)).toBe(true);
      expect(isValidPrice(999999)).toBe(true);
    });

    it('should reject invalid prices', () => {
      expect(isValidPrice(0)).toBe(false);
      expect(isValidPrice(-10)).toBe(false);
      expect(isValidPrice(1000000)).toBe(false);
      expect(isValidPrice(Infinity)).toBe(false);
      expect(isValidPrice(NaN)).toBe(false);
    });
  });

  describe('isValidQuantity', () => {
    it('should accept valid quantities', () => {
      expect(isValidQuantity(1)).toBe(true);
      expect(isValidQuantity(50)).toBe(true);
      expect(isValidQuantity(100)).toBe(true);
    });

    it('should reject invalid quantities', () => {
      expect(isValidQuantity(0)).toBe(false);
      expect(isValidQuantity(-1)).toBe(false);
      expect(isValidQuantity(101)).toBe(false);
      expect(isValidQuantity(1.5)).toBe(false);
    });
  });

  describe('sanitizeFileName', () => {
    it('should remove special characters', () => {
      expect(sanitizeFileName('file@#$.jpg')).toBe('file___.jpg');
      expect(sanitizeFileName('my file!.png')).toBe('my_file_.png');
    });

    it('should limit length to 255 characters', () => {
      const longName = 'a'.repeat(300) + '.jpg';
      expect(sanitizeFileName(longName).length).toBeLessThanOrEqual(255);
    });

    it('should preserve file extension', () => {
      expect(sanitizeFileName('document.pdf')).toContain('.pdf');
    });

    it('should handle files without extension', () => {
      expect(sanitizeFileName('filename')).toBe('filename');
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML entities', () => {
      expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
      expect(escapeHtml('"quote"')).toBe('&quot;quote&quot;');
      expect(escapeHtml("'apostrophe'")).toBe('&#039;apostrophe&#039;');
      expect(escapeHtml('&ampersand')).toBe('&amp;ampersand');
    });

    it('should handle empty strings', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('should handle strings without special chars', () => {
      expect(escapeHtml('normal text')).toBe('normal text');
    });
  });

  describe('sanitizeSearchQuery', () => {
    it('should remove SQL injection attempts', () => {
      expect(sanitizeSearchQuery("'; DROP TABLE--")).toBe('DROP TABLE');
      expect(sanitizeSearchQuery('search; DELETE')).toBe('search DELETE');
    });

    it('should preserve normal search terms', () => {
      expect(sanitizeSearchQuery('ui design')).toBe('ui design');
      expect(sanitizeSearchQuery('modern template')).toBe('modern template');
    });

    it('should trim whitespace', () => {
      expect(sanitizeSearchQuery('  search  ')).toBe('search');
    });
  });

  describe('checkRateLimit', () => {
    beforeEach(() => {
      // Clear any existing rate limit data
      vi.clearAllMocks();
    });

    it('should allow requests within limit', () => {
      const identifier = 'user-123';
      const config = { interval: 60000, maxRequests: 5 };

      expect(checkRateLimit(identifier, config)).toBe(true);
      expect(checkRateLimit(identifier, config)).toBe(true);
      expect(checkRateLimit(identifier, config)).toBe(true);
    });

    it('should block requests exceeding limit', () => {
      const identifier = 'user-456';
      const config = { interval: 60000, maxRequests: 3 };

      // First 3 should pass
      expect(checkRateLimit(identifier, config)).toBe(true);
      expect(checkRateLimit(identifier, config)).toBe(true);
      expect(checkRateLimit(identifier, config)).toBe(true);

      // 4th should fail
      expect(checkRateLimit(identifier, config)).toBe(false);
    });

    it('should use default config when not provided', () => {
      const identifier = 'user-789';
      expect(checkRateLimit(identifier)).toBe(true);
    });
  });
});
