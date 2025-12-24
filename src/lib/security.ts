/**
 * Input validation utilities
 */

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}

export function isValidPrice(price: number): boolean {
  return price > 0 && price < 1000000 && Number.isFinite(price);
}

export function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= 100;
}

export function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .substring(0, 255);
}

/**
 * Rate limiting helper
 */
interface RateLimitConfig {
  interval: number; // milliseconds
  maxRequests: number;
}

const requestMap = new Map<string, number[]>();

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { interval: 60000, maxRequests: 10 }
): boolean {
  const now = Date.now();
  const requests = requestMap.get(identifier) || [];
  
  // Remove old requests outside the interval
  const recentRequests = requests.filter(time => now - time < config.interval);
  
  if (recentRequests.length >= config.maxRequests) {
    return false; // Rate limit exceeded
  }
  
  recentRequests.push(now);
  requestMap.set(identifier, recentRequests);
  
  return true;
}

/**
 * XSS Protection
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * SQL Injection Prevention (for search queries)
 */
export function sanitizeSearchQuery(query: string): string {
  return query
    .replace(/[';\-]/g, '')
    .trim()
    .substring(0, 100);
}
