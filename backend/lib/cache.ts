import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const isMockMode = !process.env.REDIS_URL || process.env.USE_MOCK_REDIS === 'true';

let redisInstance: Redis | null = null;

export function getRedis() {
  if (isMockMode) {
    console.log('[Redis] Running in mock mode');
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
      console.log('[Redis] Connected successfully');
    });

    redisInstance.on('error', (err) => {
      console.error('[Redis] Connection error:', err);
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
      return null;
    }

    try {
      const data = await this.redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('[Cache] Get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, expirationSeconds?: number): Promise<void> {
    if (!this.redis) {
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
      console.error('[Cache] Set error:', error);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.redis) {
      return;
    }

    try {
      await this.redis.del(key);
    } catch (error) {
      console.error('[Cache] Delete error:', error);
    }
  }

  async keys(pattern: string): Promise<string[]> {
    if (!this.redis) {
      return [];
    }

    try {
      return await this.redis.keys(pattern);
    } catch (error) {
      console.error('[Cache] Keys error:', error);
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
      console.error('[Cache] Flush pattern error:', error);
    }
  }
}

export const cacheService = new CacheService();
