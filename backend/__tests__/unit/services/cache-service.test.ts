import { CacheService, AdvancedCacheService } from '../../../services/cache-service';
import { jest } from '@jest/globals';

// Mock crypto for UUID generation
jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => 'mock-uuid'),
  randomBytes: jest.fn(() => ({ toString: () => 'mock-random-bytes' }))
}));

describe('CacheService', () => {
  let cache: CacheService;

  beforeEach(() => {
    cache = new CacheService({
      maxSize: 100,
      ttl: 3600,
      evictionPolicy: 'lru'
    });
  });

  afterEach(() => {
    cache.clear();
  });

  describe('Basic Operations', () => {
    it('should set and get values', async () => {
      await cache.set('test-key', 'test-value');
      const result = await cache.get('test-key');
      expect(result).toBe('test-value');
    });

    it('should return undefined for non-existent keys', async () => {
      const result = await cache.get('non-existent-key');
      expect(result).toBeUndefined();
    });

    it('should check if key exists', async () => {
      await cache.set('test-key', 'test-value');
      expect(await cache.has('test-key')).toBe(true);
      expect(await cache.has('non-existent-key')).toBe(false);
    });

    it('should delete keys', async () => {
      await cache.set('test-key', 'test-value');
      await cache.delete('test-key');
      expect(await cache.get('test-key')).toBeUndefined();
    });

    it('should clear all keys', async () => {
      await cache.set('key1', 'value1');
      await cache.set('key2', 'value2');
      await cache.clear();
      expect(await cache.get('key1')).toBeUndefined();
      expect(await cache.get('key2')).toBeUndefined();
    });
  });

  describe('TTL (Time To Live)', () => {
    beforeEach(() => {
      cache = new CacheService({
        maxSize: 100,
        ttl: 1, // 1 second TTL for testing
        evictionPolicy: 'lru'
      });
    });

    it('should expire keys after TTL', async () => {
      await cache.set('test-key', 'test-value');
      
      // Should be available immediately
      expect(await cache.get('test-key')).toBe('test-value');
      
      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      // Should be expired
      expect(await cache.get('test-key')).toBeUndefined();
    });

    it('should support custom TTL per key', async () => {
      await cache.set('short-lived', 'value', 0.1); // 100ms TTL
      
      expect(await cache.get('short-lived')).toBe('value');
      
      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 150));
      
      expect(await cache.get('short-lived')).toBeUndefined();
    });
  });

  describe('Eviction Policies', () => {
    it('should evict least recently used items when max size is reached', async () => {
      cache = new CacheService({
        maxSize: 2,
        ttl: 3600,
        evictionPolicy: 'lru'
      });

      await cache.set('key1', 'value1');
      await cache.set('key2', 'value2');
      
      // Access key1 to make it most recently used
      await cache.get('key1');
      
      // Add key3, should evict key2 (least recently used)
      await cache.set('key3', 'value3');
      
      expect(await cache.get('key1')).toBe('value1'); // Should still exist
      expect(await cache.get('key2')).toBeUndefined(); // Should be evicted
      expect(await cache.get('key3')).toBe('value3'); // Should exist
    });

    it('should evict least frequently used items when policy is lfu', async () => {
      cache = new CacheService({
        maxSize: 2,
        ttl: 3600,
        evictionPolicy: 'lfu'
      });

      await cache.set('key1', 'value1');
      await cache.set('key2', 'value2');
      
      // Access key1 multiple times to increase frequency
      await cache.get('key1');
      await cache.get('key1');
      await cache.get('key1');
      
      // Access key2 once
      await cache.get('key2');
      
      // Add key3, should evict key2 (least frequently used)
      await cache.set('key3', 'value3');
      
      expect(await cache.get('key1')).toBe('value1'); // Should still exist
      expect(await cache.get('key2')).toBeUndefined(); // Should be evicted
      expect(await cache.get('key3')).toBe('value3'); // Should exist
    });
  });

  describe('Statistics', () => {
    it('should track hit and miss rates', async () => {
      await cache.set('key1', 'value1');
      
      // Hit
      await cache.get('key1');
      
      // Misses
      await cache.get('non-existent1');
      await cache.get('non-existent2');
      
      const stats = await cache.getStats();
      
      expect(stats.hits).toBe(1);
      expect(stats.misses).toBe(2);
      expect(stats.hitRate).toBeCloseTo(0.333, 2);
      expect(stats.missRate).toBeCloseTo(0.667, 2);
    });

    it('should track memory usage', async () => {
      await cache.set('key1', 'value1');
      await cache.set('key2', 'value2');
      
      const stats = await cache.getStats();
      
      expect(stats.size).toBe(2);
      expect(stats.memoryUsage).toBeGreaterThan(0);
    });
  });

  describe('Health Check', () => {
    it('should return healthy status for normal operation', async () => {
      await cache.set('key1', 'value1');
      
      const health = await cache.healthCheck();
      
      expect(health.status).toBe('healthy');
      expect(health.size).toBe(1);
      expect(health.memoryUsage).toBeGreaterThan(0);
      expect(health.hitRate).toBeGreaterThanOrEqual(0);
    });

    it('should return degraded status when memory usage is high', async () => {
      // Create a cache with very small max size to trigger degraded status
      const smallCache = new CacheService({
        maxSize: 1,
        ttl: 3600,
        evictionPolicy: 'lru'
      });
      
      // Fill the cache to capacity
      await smallCache.set('key1', 'x'.repeat(1000000)); // Large value
      
      const health = await smallCache.healthCheck();
      
      expect(['degraded', 'unhealthy']).toContain(health.status);
    });
  });

  describe('Import/Export', () => {
    it('should export cache data', async () => {
      await cache.set('key1', 'value1');
      await cache.set('key2', 'value2', 7200); // Different TTL
      
      const exported = await cache.export();
      
      expect(exported).toHaveLength(2);
      expect(exported[0]).toMatchObject({
        key: expect.any(String),
        value: expect.any(String),
        createdAt: expect.any(Date),
        accessedAt: expect.any(Date),
        accessCount: expect.any(Number)
      });
    });

    it('should import cache data', async () => {
      const importData = [
        {
          key: 'imported-key1',
          value: 'imported-value1',
          expiresAt: new Date(Date.now() + 3600000),
          createdAt: new Date(),
          accessedAt: new Date(),
          accessCount: 0
        },
        {
          key: 'imported-key2',
          value: 'imported-value2',
          createdAt: new Date(),
          accessedAt: new Date(),
          accessCount: 0
        }
      ];
      
      await cache.import(importData);
      
      expect(await cache.get('imported-key1')).toBe('imported-value1');
      expect(await cache.get('imported-key2')).toBe('imported-value2');
    });
  });
});

describe('AdvancedCacheService', () => {
  let advancedCache: AdvancedCacheService;

  beforeEach(() => {
    advancedCache = new AdvancedCacheService({
      maxSize: 100,
      ttl: 3600,
      evictionPolicy: 'lru'
    });
  });

  describe('Distributed Cache Operations', () => {
    it('should add distributed nodes', async () => {
      await advancedCache.addDistributedNode('node-1', {
        host: 'localhost',
        port: 6379,
        weight: 1,
        region: 'us-east-1'
      });

      // Should not throw
      expect(true).toBe(true);
    });

    it('should remove distributed nodes', async () => {
      await advancedCache.addDistributedNode('node-1', {
        host: 'localhost',
        port: 6379
      });

      await advancedCache.removeDistributedNode('node-1');

      // Should not throw
      expect(true).toBe(true);
    });

    it('should get distributed cache with strong consistency', async () => {
      await advancedCache.set('test-key', 'test-value');

      const result = await advancedCache.getDistributed('test-key', 'strong');

      expect(result).toBe('test-value');
    });

    it('should set distributed cache with replication', async () => {
      await advancedCache.setDistributed('test-key', 'test-value', {
        ttl: 3600,
        consistency: 'strong',
        replicationFactor: 2
      });

      const result = await advancedCache.get('test-key');
      expect(result).toBe('test-value');
    });
  });

  describe('Cache Warming', () => {
    it('should warm cache with priority-based loading', async () => {
      const keys = [
        {
          key: 'high-priority-key',
          loader: jest.fn().mockResolvedValue('high-value'),
          priority: 'high' as const
        },
        {
          key: 'low-priority-key',
          loader: jest.fn().mockResolvedValue('low-value'),
          priority: 'low' as const
        }
      ];

      const result = await advancedCache.warmCache(keys);

      expect(result.successful).toBe(2);
      expect(result.failed).toBe(0);
      expect(result.duration).toBeGreaterThan(0);

      // Verify values are in cache
      expect(await advancedCache.get('high-priority-key')).toBe('high-value');
      expect(await advancedCache.get('low-priority-key')).toBe('low-value');
    });

    it('should handle warming failures gracefully', async () => {
      const keys = [
        {
          key: 'success-key',
          loader: jest.fn().mockResolvedValue('success-value'),
          priority: 'high' as const
        },
        {
          key: 'failure-key',
          loader: jest.fn().mockRejectedValue(new Error('Load failed')),
          priority: 'medium' as const
        }
      ];

      const result = await advancedCache.warmCache(keys);

      expect(result.successful).toBe(1);
      expect(result.failed).toBe(1);
    });

    it('should schedule cache warming', async () => {
      const keys = [
        {
          key: 'scheduled-key',
          loader: jest.fn().mockResolvedValue('scheduled-value'),
          priority: 'medium' as const
        }
      ];

      const result = await advancedCache.scheduleCacheWarming({
        keys,
        frequency: 'daily',
        timezone: 'UTC'
      });

      expect(result.scheduleId).toBeDefined();
      expect(result.nextRun).toBeInstanceOf(Date);
      expect(result.status).toBe('scheduled');
    });
  });

  describe('Cache Analytics', () => {
    it('should provide detailed analytics', async () => {
      // Add some data to cache
      await advancedCache.set('key1', 'value1');
      await advancedCache.set('key2', 'value2');
      
      // Generate some hits/misses
      await advancedCache.get('key1');
      await advancedCache.get('non-existent');

      const analytics = await advancedCache.getDetailedAnalytics();

      expect(analytics.overview).toMatchObject({
        totalKeys: expect.any(Number),
        hitRate: expect.any(Number),
        missRate: expect.any(Number),
        averageResponseTime: expect.any(Number),
        memoryUsage: expect.any(Number),
        evictionRate: expect.any(Number)
      });

      expect(analytics.performance).toMatchObject({
        topHitKeys: expect.any(Array),
        topMissKeys: expect.any(Array),
        slowKeys: expect.any(Array)
      });

      expect(analytics.patterns).toMatchObject({
        hourlyAccess: expect.any(Array),
        keySizeDistribution: expect.any(Array),
        ttlDistribution: expect.any(Array)
      });

      expect(analytics.recommendations).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            category: expect.any(String),
            recommendation: expect.any(String),
            impact: expect.any(String),
            priority: expect.any(String)
          })
        ])
      );
    });
  });

  describe('Cache Optimization', () => {
    it('should optimize cache with balanced strategy', async () => {
      const result = await advancedCache.optimizeCache({
        strategy: 'balanced',
        aggressive: false
      });

      expect(result.optimizationId).toBeDefined();
      expect(result.results).toMatchObject({
        keysOptimized: expect.any(Number),
        memoryFreed: expect.any(Number),
        hitRateImprovement: expect.any(Number),
        evictionRateReduction: expect.any(Number)
      });

      expect(result.changes).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: expect.any(String),
            description: expect.any(String),
            impact: expect.any(String)
          })
        ])
      );

      expect(result.completedAt).toBeInstanceOf(Date);
    });
  });

  describe('Backup and Restore', () => {
    it('should create backup with compression', async () => {
      await advancedCache.set('backup-key', 'backup-value');

      const backup = await advancedCache.createBackup({
        includeExpired: false,
        compression: true,
        encryption: false
      });

      expect(backup.backupId).toBeDefined();
      expect(backup.keyCount).toBeGreaterThan(0);
      expect(backup.compressed).toBe(true);
      expect(backup.encrypted).toBe(false);
      expect(backup.downloadUrl).toBeDefined();
      expect(backup.createdAt).toBeInstanceOf(Date);
    });

    it('should restore from backup', async () => {
      const backup = await advancedCache.createBackup();

      const restore = await advancedCache.restoreFromBackup(backup.backupId, {
        overwrite: true,
        mergeStrategy: 'overwrite'
      });

      expect(restore.backupId).toBe(backup.backupId);
      expect(restore.keysRestored).toBeGreaterThan(0);
      expect(restore.duration).toBeGreaterThan(0);
      expect(restore.restoredAt).toBeInstanceOf(Date);
    });
  });

  describe('Cache Validation', () => {
    it('should validate cache integrity', async () => {
      await advancedCache.set('valid-key', 'valid-value');

      const validation = await advancedCache.validateCacheIntegrity();

      expect(validation.validationId).toBeDefined();
      expect(validation.results).toMatchObject({
        totalKeys: expect.any(Number),
        validKeys: expect.any(Number),
        corruptedKeys: expect.any(Number),
        expiredKeys: expect.any(Number),
        integrityScore: expect.any(Number)
      });

      expect(validation.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            key: expect.any(String),
            issue: expect.any(String),
            severity: expect.any(String),
            recommendation: expect.any(String)
          })
        ])
      );

      expect(validation.actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: expect.any(String),
            description: expect.any(String),
            keysAffected: expect.any(Number)
          })
        ])
      );

      expect(validation.validatedAt).toBeInstanceOf(Date);
    });
  });
});
