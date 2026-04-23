import { CacheService } from '../../backend/services/cache-service';
import { db as pgDb } from '../../backend/db/connection';

// Mock dependencies
jest.mock('../../backend/db/connection');

const mockDb = pgDb as jest.Mocked<typeof pgDb>;

describe('CacheService', () => {
  let service: CacheService;
  const mockOrgId = 'org-123';

  beforeEach(() => {
    service = new CacheService();
    jest.clearAllMocks();
    
    // Mock Redis client
    (service as any).redis = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      exists: jest.fn(),
      expire: jest.fn(),
      ttl: jest.fn(),
      keys: jest.fn(),
      flushall: jest.fn(),
      ping: jest.fn(),
      info: jest.fn(),
      dbsize: jest.fn()
    };
  });

  describe('get', () => {
    it('should get value from cache', async () => {
      const mockValue = JSON.stringify({ data: 'test' });
      (service as any).redis.get.mockResolvedValue(mockValue);

      const result = await service.get('test-key');

      expect(result).toEqual({ data: 'test' });
      expect((service as any).redis.get).toHaveBeenCalledWith('test-key');
    });

    it('should return null for non-existent key', async () => {
      (service as any).redis.get.mockResolvedValue(null);

      const result = await service.get('non-existent');

      expect(result).toBeNull();
    });

    it('should handle JSON parse errors', async () => {
      (service as any).redis.get.mockResolvedValue('invalid-json');

      const result = await service.get('invalid-key');

      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    it('should set value in cache with default TTL', async () => {
      (service as any).redis.set.mockResolvedValue('OK');
      (service as any).redis.expire.mockResolvedValue(1);

      const result = await service.set('test-key', { data: 'test' });

      expect(result).toBe(true);
      expect((service as any).redis.set).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify({ data: 'test' })
      );
      expect((service as any).redis.expire).toHaveBeenCalledWith('test-key', 3600);
    });

    it('should set value with custom TTL', async () => {
      (service as any).redis.set.mockResolvedValue('OK');
      (service as any).redis.expire.mockResolvedValue(1);

      const result = await service.set('test-key', { data: 'test' }, 7200);

      expect(result).toBe(true);
      expect((service as any).redis.expire).toHaveBeenCalledWith('test-key', 7200);
    });

    it('should handle Redis errors', async () => {
      (service as any).redis.set.mockRejectedValue(new Error('Redis error'));

      const result = await service.set('test-key', { data: 'test' });

      expect(result).toBe(false);
    });
  });

  describe('del', () => {
    it('should delete key from cache', async () => {
      (service as any).redis.del.mockResolvedValue(1);

      const result = await service.del('test-key');

      expect(result).toBe(true);
      expect((service as any).redis.del).toHaveBeenCalledWith('test-key');
    });

    it('should return false for non-existent key', async () => {
      (service as any).redis.del.mockResolvedValue(0);

      const result = await service.del('non-existent');

      expect(result).toBe(false);
    });
  });

  describe('exists', () => {
    it('should check if key exists', async () => {
      (service as any).redis.exists.mockResolvedValue(1);

      const result = await service.exists('test-key');

      expect(result).toBe(true);
    });

    it('should return false for non-existent key', async () => {
      (service as any).redis.exists.mockResolvedValue(0);

      const result = await service.exists('non-existent');

      expect(result).toBe(false);
    });
  });

  describe('getTTL', () => {
    it('should get TTL for key', async () => {
      (service as any).redis.ttl.mockResolvedValue(3600);

      const result = await service.getTTL('test-key');

      expect(result).toBe(3600);
    });

    it('should return -1 for key without TTL', async () => {
      (service as any).redis.ttl.mockResolvedValue(-1);

      const result = await service.getTTL('permanent-key');

      expect(result).toBe(-1);
    });

    it('should return -2 for non-existent key', async () => {
      (service as any).redis.ttl.mockResolvedValue(-2);

      const result = await service.getTTL('non-existent');

      expect(result).toBe(-2);
    });
  });

  describe('setWithPattern', () => {
    it('should set multiple keys with pattern', async () => {
      (service as any).redis.set.mockResolvedValue('OK');
      (service as any).redis.expire.mockResolvedValue(1);

      const data = {
        'user:1': { name: 'John' },
        'user:2': { name: 'Jane' }
      };

      const result = await service.setWithPattern('user:*', data, 1800);

      expect(result).toBe(true);
      expect((service as any).redis.set).toHaveBeenCalledTimes(2);
      expect((service as any).redis.expire).toHaveBeenCalledTimes(2);
    });

    it('should handle empty data object', async () => {
      const result = await service.setWithPattern('test:*', {});

      expect(result).toBe(true);
    });
  });

  describe('getWithPattern', () => {
    it('should get multiple keys with pattern', async () => {
      (service as any).redis.keys.mockResolvedValue(['user:1', 'user:2']);
      (service as any).redis.get
        .mockResolvedValueOnce(JSON.stringify({ name: 'John' }))
        .mockResolvedValueOnce(JSON.stringify({ name: 'Jane' }));

      const result = await service.getWithPattern('user:*');

      expect(result).toEqual({
        'user:1': { name: 'John' },
        'user:2': { name: 'Jane' }
      });
    });

    it('should return empty object for no matching keys', async () => {
      (service as any).redis.keys.mockResolvedValue([]);

      const result = await service.getWithPattern('non-existent:*');

      expect(result).toEqual({});
    });
  });

  describe('delWithPattern', () => {
    it('should delete multiple keys with pattern', async () => {
      (service as any).redis.keys.mockResolvedValue(['temp:1', 'temp:2']);
      (service as any).redis.del.mockResolvedValue(2);

      const result = await service.delWithPattern('temp:*');

      expect(result).toBe(true);
      expect((service as any).redis.del).toHaveBeenCalledWith(['temp:1', 'temp:2']);
    });

    it('should return false for no matching keys', async () => {
      (service as any).redis.keys.mockResolvedValue([]);

      const result = await service.delWithPattern('non-existent:*');

      expect(result).toBe(false);
    });
  });

  describe('increment', () => {
    it('should increment counter', async () => {
      (service as any).redis.set.mockResolvedValue('OK');
      (service as any).redis.expire.mockResolvedValue(1);

      const result = await service.increment('counter', 1, 3600);

      expect(result).toBe(1);
      expect((service as any).redis.set).toHaveBeenCalledWith('counter', '1');
    });

    it('should increment existing counter', async () => {
      (service as any).redis.get.mockResolvedValue('5');
      (service as any).redis.set.mockResolvedValue('OK');

      const result = await service.increment('counter', 3);

      expect(result).toBe(8);
    });
  });

  describe('decrement', () => {
    it('should decrement counter', async () => {
      (service as any).redis.get.mockResolvedValue('10');
      (service as any).redis.set.mockResolvedValue('OK');

      const result = await service.decrement('counter', 2);

      expect(result).toBe(8);
    });

    it('should not go below zero', async () => {
      (service as any).redis.get.mockResolvedValue('1');
      (service as any).redis.set.mockResolvedValue('OK');

      const result = await service.decrement('counter', 5);

      expect(result).toBe(0);
    });
  });

  describe('listPush', () => {
    it('should push item to list', async () => {
      (service as any).redis.set.mockResolvedValue('OK');

      const result = await service.listPush('mylist', 'item1');

      expect(result).toBe(true);
    });

    it('should push multiple items to list', async () => {
      (service as any).redis.set.mockResolvedValue('OK');

      const result = await service.listPush('mylist', ['item1', 'item2']);

      expect(result).toBe(true);
    });
  });

  describe('listPop', () => {
    it('should pop item from list', async () => {
      (service as any).redis.get.mockResolvedValue(JSON.stringify(['item1', 'item2', 'item3']));
      (service as any).redis.set.mockResolvedValue('OK');

      const result = await service.listPop('mylist');

      expect(result).toBe('item3');
    });

    it('should return null for empty list', async () => {
      (service as any).redis.get.mockResolvedValue(JSON.stringify([]));

      const result = await service.listPop('emptylist');

      expect(result).toBeNull();
    });
  });

  describe('listGetRange', () => {
    it('should get range from list', async () => {
      (service as any).redis.get.mockResolvedValue(JSON.stringify(['item1', 'item2', 'item3', 'item4']));

      const result = await service.listGetRange('mylist', 1, 2);

      expect(result).toEqual(['item2', 'item3']);
    });

    it('should handle invalid range', async () => {
      (service as any).redis.get.mockResolvedValue(JSON.stringify(['item1', 'item2']));

      const result = await service.listGetRange('mylist', 5, 10);

      expect(result).toEqual([]);
    });
  });

  describe('healthCheck', () => {
    it('should return healthy status', async () => {
      (service as any).redis.ping.mockResolvedValue('PONG');
      (service as any).redis.info.mockResolvedValue('redis_version:6.0.0');
      (service as any).redis.dbsize.mockResolvedValue(1000);

      const result = await service.healthCheck();

      expect(result).toHaveProperty('status', 'healthy');
      expect(result).toHaveProperty('redis_version', '6.0.0');
      expect(result).toHaveProperty('total_keys', 1000);
    });

    it('should return unhealthy status on error', async () => {
      (service as any).redis.ping.mockRejectedValue(new Error('Redis connection failed'));

      const result = await service.healthCheck();

      expect(result).toHaveProperty('status', 'unhealthy');
      expect(result).toHaveProperty('error');
    });
  });

  describe('clear', () => {
    it('should clear all cache', async () => {
      (service as any).redis.flushall.mockResolvedValue('OK');

      const result = await service.clear();

      expect(result).toBe(true);
      expect((service as any).redis.flushall).toHaveBeenCalled();
    });

    it('should handle clear errors', async () => {
      (service as any).redis.flushall.mockRejectedValue(new Error('Clear failed'));

      const result = await service.clear();

      expect(result).toBe(false);
    });
  });

  describe('getStats', () => {
    it('should get cache statistics', async () => {
      (service as any).redis.info.mockResolvedValue(`used_memory:1000000
used_memory_human:1.00M
connected_clients:10
total_commands_processed:50000
keyspace_hits:30000
keyspace_misses:20000`);
      (service as any).redis.dbsize.mockResolvedValue(1000);

      const result = await service.getStats();

      expect(result).toHaveProperty('used_memory', '1.00M');
      expect(result).toHaveProperty('connected_clients', 10);
      expect(result).toHaveProperty('total_commands', 50000);
      expect(result).toHaveProperty('hit_rate', 0.6);
      expect(result).toHaveProperty('total_keys', 1000);
    });
  });

  describe('Organization-specific caching', () => {
    it('should prefix keys with organization ID', async () => {
      (service as any).redis.set.mockResolvedValue('OK');
      (service as any).redis.expire.mockResolvedValue(1);

      await service.set('test-key', { data: 'test' }, 3600, mockOrgId);

      expect((service as any).redis.set).toHaveBeenCalledWith(
        `org:${mockOrgId}:test-key`,
        JSON.stringify({ data: 'test' })
      );
    });

    it('should get organization-specific key', async () => {
      (service as any).redis.get.mockResolvedValue(JSON.stringify({ data: 'test' }));

      const result = await service.get('test-key', mockOrgId);

      expect(result).toEqual({ data: 'test' });
      expect((service as any).redis.get).toHaveBeenCalledWith(`org:${mockOrgId}:test-key`);
    });

    it('should delete organization-specific key', async () => {
      (service as any).redis.del.mockResolvedValue(1);

      await service.del('test-key', mockOrgId);

      expect((service as any).redis.del).toHaveBeenCalledWith(`org:${mockOrgId}:test-key`);
    });
  });
});
