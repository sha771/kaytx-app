interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export const RateLimitPresets = {
  STRICT: { windowMs: 60000, maxRequests: 10 },
  MODERATE: { windowMs: 60000, maxRequests: 30 },
  RELAXED: { windowMs: 60000, maxRequests: 100 },
  API: { windowMs: 60000, maxRequests: 60 },
  AUTH: { windowMs: 300000, maxRequests: 5 },
  EXPORT: { windowMs: 3600000, maxRequests: 3 },
} as const;

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = RateLimitPresets.MODERATE
): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const key = identifier;
  
  const entry = rateLimitStore.get(key);
  
  if (!entry || entry.resetAt < now) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + config.windowMs,
    };
    rateLimitStore.set(key, newEntry);
    
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt: newEntry.resetAt,
    };
  }
  
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }
  
  entry.count++;
  rateLimitStore.set(key, entry);
  
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}

export function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}

setInterval(cleanupExpiredEntries, 60000);
