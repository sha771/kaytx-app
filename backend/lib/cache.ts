import Redis from 'ioredis';
import { logger } from './production-logger';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const redisUrl = process.env.REDIS_URL;
if (isProduction && !redisUrl) {
  throw new Error('REDIS_URL is required in production');
}

const isMockMode = !isProduction && process.env.USE_MOCK_REDIS === 'true';

// SECURITY: Never allow mock mode in production
if (isMockMode && process.env.NODE_ENV === 'production') {
  throw new Error('Mock Redis mode is not allowed in production');
}

let redisInstance: Redis | null = null;

export function getRedis() {
  if (isMockMode) {
    logger.warn('[Redis] Running in mock mode (USE_MOCK_REDIS=true)');
    return null;
  }

  if (!redisUrl) {
    if (isProduction) {
      throw new Error('REDIS_URL is required. Set USE_MOCK_REDIS=true for development without Redis.');
    }
    logger.warn('[Redis] No REDIS_URL set. Redis features disabled. Set USE_MOCK_REDIS=true to suppress this warning.');
    return null;
  }

  if (!redisInstance) {
    redisInstance = new Redis(redisUrl, {
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      maxRetriesPerRequest: 3,
    });

    redisInstance.on('connect', () => {
      logger.info('[Redis] Connected successfully');
    });

    redisInstance.on('error', (err) => {
      logger.error('[Redis] Connection error', err instanceof Error ? err : undefined, { error: err });
    });
  }

  return redisInstance;
}

export const redis = getRedis();

export class CacheService {
  private redis: Redis | null;

  constructor() {
    this.redis = redis;
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.redis) {
      if (isProduction) {
        throw new Error('CRITICAL: Redis instance unavailable in production');
      }
      return null;
    }

    try {
      const data = await this.redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error('[Cache] Get error', error instanceof Error ? error : undefined, { error });
      if (isProduction) throw error;
      return null;
    }
  }

  async set(key: string, value: any, expirationSeconds?: number): Promise<void> {
    if (!this.redis) {
      if (isProduction) {
        throw new Error('CRITICAL: Redis instance unavailable in production');
      }
      return;
    }

    try {
      const serialized = JSON.stringify(value);
      if (expirationSeconds) {
        await this.redis.setex(key, expirationSeconds, serialized);
      } else {
        await this.redis.set(key, serialized);
      }
    } catch (error) {
      logger.error('[Cache] Set error', error instanceof Error ? error : undefined, { error });
      if (isProduction) throw error;
    }
  }

  async del(key: string): Promise<boolean> {
    if (!this.redis) {
      return false;
    }

    try {
      const result = await this.redis.del(key);
      return result > 0;
    } catch (error) {
      logger.error('[Cache] Delete error', error instanceof Error ? error : undefined, { error });
      return false;
    }
  }

  async keys(pattern: string): Promise<string[]> {
    if (!this.redis) {
      return [];
    }

    try {
      return await this.redis.keys(pattern);
    } catch (error) {
      logger.error('[Cache] Keys error', error instanceof Error ? error : undefined, { error });
      return [];
    }
  }

  async flushPattern(pattern: string): Promise<void> {
    if (!this.redis) {
      return;
    }

    try {
      const keys = await this.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      logger.error('[Cache] Flush pattern error', error instanceof Error ? error : undefined, { error });
    }
  }
}

export const cacheService = new CacheService();
