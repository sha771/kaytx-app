import Redis from 'ioredis';
import { logger } from './production-logger';

let redisClient: Redis | null = null;

export function getRedisClient(): Redis | null {
  if (redisClient) {
    return redisClient;
  }

  // Check if Redis is configured
  if (!process.env.REDIS_URL && !process.env.REDIS_HOST) {
    logger.warn('[Redis] Redis not configured. Cache and rate limiting will use memory fallback.');
    return null;
  }

  try {
    // Create Redis client
    const redisOptions: Redis.RedisOptions = {
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      // Add TLS if using secure connection
      tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
    };

    if (process.env.REDIS_URL) {
      redisClient = new Redis(process.env.REDIS_URL, redisOptions);
    } else {
      redisClient = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB || '0'),
        ...redisOptions,
      });
    }

    // Event handlers
    redisClient.on('connect', () => {
      logger.info('[Redis] Connected to Redis server');
    });

    redisClient.on('error', (error) => {
      logger.error('[Redis] Connection error', error instanceof Error ? error : undefined, { error });
      // Don't set to null here, let it retry
    });

    redisClient.on('close', () => {
      logger.warn('[Redis] Connection closed');
    });

    redisClient.on('reconnecting', () => {
      logger.info('[Redis] Reconnecting to Redis server');
    });

    // Test connection
    redisClient.connect().catch((error) => {
      logger.error('[Redis] Failed to connect', error instanceof Error ? error : undefined, { error });
      redisClient = null;
    });

    return redisClient;
  } catch (error) {
    logger.error('[Redis] Failed to initialize Redis client', error instanceof Error ? error : undefined, { error });
    return null;
  }
}

export async function closeRedisConnection(): Promise<void> {
  if (redisClient) {
    try {
      await redisClient.quit();
      redisClient = null;
      logger.info('[Redis] Connection closed successfully');
    } catch (error) {
      logger.error('[Redis] Error closing connection', error instanceof Error ? error : undefined, { error });
      redisClient = null;
    }
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeRedisConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeRedisConnection();
  process.exit(0);
});

export default redisClient;
