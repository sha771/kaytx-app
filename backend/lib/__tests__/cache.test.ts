import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { Cache, MemoryCache, RedisCache } from '../cache';

describe('Cache Implementation', () => {
  describe('MemoryCache', () => {
    let memoryCache: MemoryCache;

    beforeEach(() => {
      memoryCache = new MemoryCache({
        maxSize: 100,
        defaultTtl: 60000, // 1 minute
      });
    });

    afterEach(() => {
      memoryCache.clear();
    });

    describe('Basic Operations', () => {
      it('should set and get values', async () => {
        await memoryCache.set('key1', 'value1');
        const result = await memoryCache.get('key1');
        
        expect(result).toBe('value1');
      });

      it('should return null for non-existent keys', async () => {
        const result = await memoryCache.get('nonexistent');
        expect(result).toBeNull();
      });

      it('should handle different data types', async () => {
        const testValues = [
          'string',
          123,
          true,
          { object: 'value' },
          [1, 2, 3],
          null,
        ];

        for (let i = 0; i < testValues.length; i++) {
          const key = `key${i}`;
          const value = testValues[i];
          
          await memoryCache.set(key, value);
          const result = await memoryCache.get(key);
          expect(result).toEqual(value);
        }
      });

      it('should delete values', async () => {
        await memoryCache.set('key1', 'value1');
        await memoryCache.delete('key1');
        
        const result = await memoryCache.get('key1');
        expect(result).toBeNull();
      });

      it('should check if key exists', async () => {
        await memoryCache.set('key1', 'value1');
        
        expect(await memoryCache.has('key1')).toBe(true);
        expect(await memoryCache.has('nonexistent')).toBe(false);
      });

      it('should clear all values', async () => {
        await memoryCache.set('key1', 'value1');
        await memoryCache.set('key2', 'value2');
        
        memoryCache.clear();
        
        expect(await memoryCache.get('key1')).toBeNull();
        expect(await memoryCache.get('key2')).toBeNull();
      });
    });

    describe('TTL (Time To Live)', () => {
      it('should expire values after TTL', async () => {
        await memoryCache.set('key1', 'value1', 100); // 100ms TTL
        
        // Should be available immediately
        expect(await memoryCache.get('key1')).toBe('value1');
        
        // Wait for expiration
        await new Promise(resolve => setTimeout(resolve, 150));
        
        expect(await memoryCache.get('key1')).toBeNull();
      });

      it('should use default TTL when not specified', async () => {
        await memoryCache.set('key1', 'value1');
        
        // Should be available immediately
        expect(await memoryCache.get('key1')).toBe('value1');
        
        // Mock time passing
        jest.spyOn(Date, 'now').mockReturnValue(Date.now() + 70000); // 70 seconds later
        
        expect(await memoryCache.get('key1')).toBeNull();
        
        jest.restoreAllMocks();
      });

      it('should handle zero TTL (no expiration)', async () => {
        await memoryCache.set('key1', 'value1', 0);
        
        // Mock time passing
        jest.spyOn(Date, 'now').mockReturnValue(Date.now() + 70000);
        
        expect(await memoryCache.get('key1')).toBe('value1');
        
        jest.restoreAllMocks();
      });
    });

    describe('Size Limits', () => {
      it('should respect max size limit', async () => {
        const smallCache = new MemoryCache({ maxSize: 2 });
        
        await smallCache.set('key1', 'value1');
        await smallCache.set('key2', 'value2');
        await smallCache.set('key3', 'value3'); // Should evict oldest
        
        expect(await smallCache.get('key1')).toBeNull(); // Evicted
        expect(await smallCache.get('key2')).toBe('value2');
        expect(await smallCache.get('key3')).toBe('value3');
      });

      it('should update access time on get', async () => {
        const smallCache = new MemoryCache({ maxSize: 2 });
        
        await smallCache.set('key1', 'value1');
        await smallCache.set('key2', 'value2');
        
        // Access key1 to make it recently used
        await smallCache.get('key1');
        
        // Add key3, should evict key2 (least recently used)
        await smallCache.set('key3', 'value3');
        
        expect(await smallCache.get('key1')).toBe('value1'); // Still there
        expect(await smallCache.get('key2')).toBeNull(); // Evicted
        expect(await smallCache.get('key3')).toBe('value3');
      });
    });

    describe('Batch Operations', () => {
      it('should set multiple values', async () => {
        const items = [
          ['key1', 'value1'],
          ['key2', 'value2'],
          ['key3', 'value3'],
        ] as const;

        await memoryCache.setMany(items);
        
        expect(await memoryCache.get('key1')).toBe('value1');
        expect(await memoryCache.get('key2')).toBe('value2');
        expect(await memoryCache.get('key3')).toBe('value3');
      });

      it('should get multiple values', async () => {
        await memoryCache.set('key1', 'value1');
        await memoryCache.set('key2', 'value2');
        await memoryCache.set('key3', 'value3');
        
        const results = await memoryCache.getMany(['key1', 'key2', 'key3', 'nonexistent']);
        
        expect(results).toEqual({
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
          nonexistent: null,
        });
      });

      it('should delete multiple values', async () => {
        await memoryCache.set('key1', 'value1');
        await memoryCache.set('key2', 'value2');
        await memoryCache.set('key3', 'value3');
        
        await memoryCache.deleteMany(['key1', 'key3']);
        
        expect(await memoryCache.get('key1')).toBeNull();
        expect(await memoryCache.get('key2')).toBe('value2');
        expect(await memoryCache.get('key3')).toBeNull();
      });
    });

    describe('Statistics', () => {
      it('should track cache statistics', async () => {
        await memoryCache.set('key1', 'value1');
        await memoryCache.get('key1'); // Hit
        await memoryCache.get('nonexistent'); // Miss
        await memoryCache.delete('key1');
        
        const stats = memoryCache.getStats();
        
        expect(stats.hits).toBe(1);
        expect(stats.misses).toBe(1);
        expect(stats.sets).toBe(1);
        expect(stats.deletes).toBe(1);
        expect(stats.size).toBe(0);
        expect(stats.hitRate).toBe(0.5);
      });

      it('should reset statistics', async () => {
        await memoryCache.set('key1', 'value1');
        await memoryCache.get('key1');
        
        memoryCache.resetStats();
        
        const stats = memoryCache.getStats();
        expect(stats.hits).toBe(0);
        expect(stats.misses).toBe(0);
        expect(stats.sets).toBe(0);
        expect(stats.deletes).toBe(0);
      });
    });
  });

  describe('RedisCache', () => {
    let redisCache: RedisCache;
    let mockRedis: any;

    beforeEach(() => {
      mockRedis = {
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
        exists: jest.fn(),
        flushall: jest.fn(),
        mget: jest.fn(),
        mset: jest.fn(),
      };

      redisCache = new RedisCache(mockRedis, {
        defaultTtl: 60000,
        keyPrefix: 'test:',
      });
    });

    describe('Basic Operations', () => {
      it('should set and get values', async () => {
        mockRedis.get.mockResolvedValue('value1');
        mockRedis.set.mockResolvedValue('OK');

        await redisCache.set('key1', 'value1');
        const result = await redisCache.get('key1');

        expect(mockRedis.set).toHaveBeenCalledWith('test:key1', JSON.stringify('value1'), 'EX', 60);
        expect(mockRedis.get).toHaveBeenCalledWith('test:key1');
        expect(result).toBe('value1');
      });

      it('should handle null values', async () => {
        mockRedis.get.mockResolvedValue(null);

        const result = await redisCache.get('nonexistent');

        expect(result).toBeNull();
      });

      it('should delete values', async () => {
        mockRedis.del.mockResolvedValue(1);

        await redisCache.delete('key1');

        expect(mockRedis.del).toHaveBeenCalledWith('test:key1');
      });

      it('should check if key exists', async () => {
        mockRedis.exists.mockResolvedValue(1);

        const exists = await redisCache.has('key1');

        expect(mockRedis.exists).toHaveBeenCalledWith('test:key1');
        expect(exists).toBe(true);
      });

      it('should clear all values', async () => {
        mockRedis.flushall.mockResolvedValue('OK');

        await redisCache.clear();

        expect(mockRedis.flushall).toHaveBeenCalled();
      });
    });

    describe('Error Handling', () => {
      it('should handle Redis connection errors', async () => {
        mockRedis.get.mockRejectedValue(new Error('Connection failed'));

        const result = await redisCache.get('key1');

        expect(result).toBeNull(); // Fail gracefully
      });

      it('should handle JSON parsing errors', async () => {
        mockRedis.get.mockResolvedValue('invalid-json');

        const result = await redisCache.get('key1');

        expect(result).toBeNull(); // Fail gracefully
      });
    });

    describe('Batch Operations', () => {
      it('should get multiple values', async () => {
        mockRedis.mget.mockResolvedValue([
          JSON.stringify('value1'),
          null,
          JSON.stringify('value3'),
        ]);

        const results = await redisCache.getMany(['key1', 'key2', 'key3']);

        expect(mockRedis.mget).toHaveBeenCalledWith('test:key1', 'test:key2', 'test:key3');
        expect(results).toEqual({
          key1: 'value1',
          key2: null,
          key3: 'value3',
        });
      });

      it('should set multiple values', async () => {
        mockRedis.mset.mockResolvedValue('OK');

        await redisCache.setMany([
          ['key1', 'value1'],
          ['key2', 'value2'],
        ]);

        expect(mockRedis.mset).toHaveBeenCalledWith(
          'test:key1', JSON.stringify('value1'),
          'test:key2', JSON.stringify('value2')
        );
      });
    });
  });

  describe('Cache Interface', () => {
    it('should work with any cache implementation', async () => {
      const caches: Cache[] = [
        new MemoryCache(),
        new RedisCache({} as any), // Mock Redis
      ];

      for (const cache of caches) {
        await cache.set('test', 'value');
        const result = await cache.get('test');
        expect(result).toBe('value');
      }
    });
  });

  describe('Performance', () => {
    it('should handle high volume operations efficiently', async () => {
      const startTime = Date.now();
      const operations = 1000;

      for (let i = 0; i < operations; i++) {
        await memoryCache.set(`key${i}`, `value${i}`);
        await memoryCache.get(`key${i}`);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should handle 2000 operations quickly (less than 1 second)
      expect(duration).toBeLessThan(1000);
    });

    it('should handle concurrent operations', async () => {
      const promises = Array(100).fill(null).map((_, i) =>
        memoryCache.set(`key${i}`, `value${i}`)
      );

      await Promise.all(promises);

      for (let i = 0; i < 100; i++) {
        const result = await memoryCache.get(`key${i}`);
        expect(result).toBe(`value${i}`);
      }
    });
  });
});
