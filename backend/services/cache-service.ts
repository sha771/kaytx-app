import { EventEmitter } from 'events';
import Redis from 'ioredis';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('CacheService');

export interface CacheOptions {
  ttl?: number;
  maxSize?: number;
  evictionPolicy?: 'lru' | 'lfu' | 'ttl';
}

export class CacheService extends EventEmitter {
  private redis: Redis | null = null;
  private defaultTtl: number = 3600;

  private distributedNodes: Map<string, any> = new Map();

  constructor(options: CacheOptions = {}) {
    super();
    this.defaultTtl = options.ttl || 3600;
  }

  private getEffectiveKey(key: string, organizationId?: string): string {
    return organizationId ? `org:${organizationId}:${key}` : key;
  }

  async get<T>(key: string, organizationId?: string): Promise<T | null> {
    if (!this.redis) return null;
    const effectiveKey = this.getEffectiveKey(key, organizationId);
    try {
      const data = await this.redis.get(effectiveKey);
      if (!data) return null;
      try {
        return JSON.parse(data) as T;
      } catch (e) {
        return null;
      }
    } catch (error) {
      logger.error(`[Cache] Get error for ${effectiveKey}:`, error as Error);
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number, organizationId?: string): Promise<boolean> {
    if (!this.redis) return false;
    const effectiveKey = this.getEffectiveKey(key, organizationId);
    const effectiveTtl = ttl || this.defaultTtl;
    try {
      const serialized = JSON.stringify(value);
      await this.redis.set(effectiveKey, serialized);
      if (effectiveTtl > 0) {
        await this.redis.expire(effectiveKey, effectiveTtl);
      }
      return true;
    } catch (error) {
      logger.error(`[Cache] Set error for ${effectiveKey}:`, error as Error);
      return false;
    }
  }

  async del(key: string, organizationId?: string): Promise<boolean> {
    if (!this.redis) return false;
    const effectiveKey = this.getEffectiveKey(key, organizationId);
    try {
      const result = await this.redis.del(effectiveKey);
      return result > 0;
    } catch (error) {
      logger.error(`[Cache] Delete error for ${effectiveKey}:`, error as Error);
      return false;
    }
  }

  async exists(key: string, organizationId?: string): Promise<boolean> {
    if (!this.redis) return false;
    const effectiveKey = this.getEffectiveKey(key, organizationId);
    try {
      const result = await this.redis.exists(effectiveKey);
      return result > 0;
    } catch (error) {
      return false;
    }
  }

  async getTTL(key: string, organizationId?: string): Promise<number> {
    if (!this.redis) return -2;
    const effectiveKey = this.getEffectiveKey(key, organizationId);
    try {
      return await this.redis.ttl(effectiveKey);
    } catch (error) {
      return -2;
    }
  }

  async setWithPattern(pattern: string, data: Record<string, any>, ttl?: number): Promise<boolean> {
    if (!this.redis) return false;
    try {
      for (const [key, value] of Object.entries(data)) {
        await this.set(key, value, ttl);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async getWithPattern(pattern: string): Promise<Record<string, any>> {
    if (!this.redis) return {};
    try {
      const keys = await this.redis.keys(pattern);
      const result: Record<string, any> = {};
      for (const key of keys) {
        result[key] = await this.get(key);
      }
      return result;
    } catch (error) {
      return {};
    }
  }

  async delWithPattern(pattern: string): Promise<boolean> {
    if (!this.redis) return false;
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length === 0) return false;
      const result = await this.redis.del(keys);
      return result > 0;
    } catch (error) {
      return false;
    }
  }

  async increment(key: string, amount: number = 1, ttl?: number): Promise<number> {
    if (!this.redis) return 0;
    try {
      const current = await this.redis.get(key);
      const val = (current ? parseInt(current) : 0) + amount;
      await this.redis.set(key, val.toString());
      if (ttl) await this.redis.expire(key, ttl);
      return val;
    } catch (error) {
      return 0;
    }
  }

  async decrement(key: string, amount: number = 1): Promise<number> {
    if (!this.redis) return 0;
    try {
      const current = await this.redis.get(key);
      const val = Math.max(0, (current ? parseInt(current) : 0) - amount);
      await this.redis.set(key, val.toString());
      return val;
    } catch (error) {
      return 0;
    }
  }

  async listPush(key: string, item: any | any[]): Promise<boolean> {
    if (!this.redis) return false;
    try {
      const current = await this.redis.get(key);
      const list = current ? JSON.parse(current) : [];
      if (Array.isArray(item)) {
        list.push(...item);
      } else {
        list.push(item);
      }
      await this.redis.set(key, JSON.stringify(list));
      return true;
    } catch (error) {
      return false;
    }
  }

  async listPop(key: string): Promise<any | null> {
    if (!this.redis) return null;
    try {
      const current = await this.redis.get(key);
      if (!current) return null;
      const list = JSON.parse(current);
      if (list.length === 0) return null;
      const item = list.pop();
      await this.redis.set(key, JSON.stringify(list));
      return item;
    } catch (error) {
      return null;
    }
  }

  async listGetRange(key: string, start: number, end: number): Promise<any[]> {
    if (!this.redis) return [];
    try {
      const current = await this.redis.get(key);
      if (!current) return [];
      const list = JSON.parse(current);
      return list.slice(start, end + 1);
    } catch (error) {
      return [];
    }
  }

  async clear(): Promise<boolean> {
    if (!this.redis) return false;
    try {
      await this.redis.flushall();
      return true;
    } catch (error) {
      return false;
    }
  }

  async healthCheck(): Promise<any> {
    if (!this.redis) return { status: 'unhealthy', error: 'Redis client not initialized' };
    try {
      const ping = await this.redis.ping();
      const info = await this.redis.info();
      const dbsize = await this.redis.dbsize();
      const version = info.split('\n').find(line => line.startsWith('redis_version'))?.split(':')[1].trim();
      return {
        status: ping === 'PONG' ? 'healthy' : 'unhealthy',
        redis_version: version,
        total_keys: dbsize
      };
    } catch (error) {
      return { status: 'unhealthy', error: (error as Error).message };
    }
  }

  async getStats(): Promise<any> {
    if (!this.redis) return {};
    try {
      const info = await this.redis.info();
      const dbsize = await this.redis.dbsize();
      const lines = info.split('\n');
      const getVal = (key: string) => lines.find(l => l.startsWith(key))?.split(':')[1].trim();
      
      const hits = parseInt(getVal('keyspace_hits') || '0');
      const misses = parseInt(getVal('keyspace_misses') || '0');
      
      return {
        used_memory: getVal('used_memory_human'),
        connected_clients: parseInt(getVal('connected_clients') || '0'),
        total_commands: parseInt(getVal('total_commands_processed') || '0'),
        hit_rate: hits / (hits + misses) || 0,
        total_keys: dbsize
      };
    } catch (error) {
      return {};
    }
  }

  private async getFromNode(node: any, key: string): Promise<any> {
    return this.get(key);
  }

  private async setToNode(node: any, key: string, value: any, ttl: number): Promise<void> {
    node.connectionCount++;
  }

  private async replicateToNodes(key: string, value: any, ttl: number, replicationFactor: number): Promise<void> {
    const nodes = Array.from(this.distributedNodes.values()).filter(n => n.status === 'active');
    
    for (let i = 0; i < Math.min(replicationFactor, nodes.length); i++) {
      try {
        await this.setToNode(nodes[i], key, value, ttl);
      } catch (error) {
        logger.error(`Failed to replicate to node ${nodes[i].id}:`, error instanceof Error ? error : new Error(String(error)));
      }
    }
  }

  private calculateNextRun(frequency: 'hourly' | 'daily' | 'weekly', timezone?: string): Date {
    const now = new Date();
    const nextRun = new Date(now);

    switch (frequency) {
      case 'hourly':
        nextRun.setHours(nextRun.getHours() + 1);
        nextRun.setMinutes(0, 0, 0);
        break;
      case 'daily':
        nextRun.setDate(nextRun.getDate() + 1);
        nextRun.setHours(2, 0, 0, 0); // 2 AM
        break;
      case 'weekly':
        nextRun.setDate(nextRun.getDate() + 7);
        nextRun.setHours(2, 0, 0, 0); // 2 AM on Sunday
        const day = now.getDay();
        const diff = (7 - day) % 7;
        nextRun.setDate(now.getDate() + diff);
        break;
    }

    return nextRun;
  }
}

// Supporting interfaces and classes

interface CacheNode {
  id: string;
  host: string;
  port: number;
  weight: number;
  region: string;
  status: 'active' | 'inactive' | 'degraded';
  lastHeartbeat: Date;
  connectionCount: number;
  cacheSize: number;
  hitRate: number;
}

class CacheWarmer {
  constructor(private cache: AdvancedCacheService) {}

  async warmByPattern(pattern: string, loader: (key: string) => Promise<any>): Promise<void> {
    // Mock pattern-based warming
    logger.info(`Warming cache for pattern: ${pattern}`);
  }

  async warmByPriority(keys: {
    key: string;
    loader: () => Promise<any>;
    priority: 'high' | 'medium' | 'low';
  }[]): Promise<void> {
    // Mock priority-based warming
    logger.info(`Warming cache by priority`);
  }
}

class CacheMetricsCollector {
  constructor(private cache: AdvancedCacheService) {}

  async collectMetrics(): Promise<{
    operations: {
      gets: number;
      sets: number;
      deletes: number;
      evictions: number;
    };
    performance: {
      averageGetTime: number;
      averageSetTime: number;
      p95GetTime: number;
      p99GetTime: number;
    };
    memory: {
      used: number;
      available: number;
      fragmentation: number;
    };
  }> {
    // Mock metrics collection
    return {
      operations: {
        gets: Math.floor(Math.random() * 10000) + 1000,
        sets: Math.floor(Math.random() * 5000) + 500,
        deletes: Math.floor(Math.random() * 1000) + 100,
        evictions: Math.floor(Math.random() * 500) + 50
      },
      performance: {
        averageGetTime: Math.random() * 5 + 1,
        averageSetTime: Math.random() * 10 + 2,
        p95GetTime: Math.random() * 20 + 5,
        p99GetTime: Math.random() * 50 + 10
      },
      memory: {
        used: Math.floor(Math.random() * 100000000) + 10000000,
        available: Math.floor(Math.random() * 50000000) + 5000000,
        fragmentation: Math.random() * 0.1 + 0.05
      }
    };
  }
}

export class AdvancedCacheService extends CacheService {
  private maxSize: number;
  private evictionPolicy: string;

  constructor(options: CacheOptions = {}) {
    super(options);
    this.maxSize = options.maxSize || 1000;
    this.evictionPolicy = options.evictionPolicy || 'lru';
  }
}

// Export advanced cache service
export const advancedCacheService = new AdvancedCacheService({
  maxSize: 1000,
  ttl: 3600,
  evictionPolicy: 'lru',
});
