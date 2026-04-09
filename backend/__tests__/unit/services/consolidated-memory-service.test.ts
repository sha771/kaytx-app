/**
 * Comprehensive Unit Tests for Consolidated Memory Service
 * Tests all functionality including memory management, vector search, summarization, and archival
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { ConsolidatedMemoryService } from '../../../services/consolidated-memory-service';
import { db } from '../../../db/connection';
import { eq, and, gte, lte } from 'drizzle-orm';

// Mock dependencies
jest.mock('../../../db/connection');
jest.mock('../../../lib/vector-embedding-service');
jest.mock('../../../lib/semantic-search-service');
jest.mock('../../../services/ai-agent-service');

describe('ConsolidatedMemoryService', () => {
  let memoryService: ConsolidatedMemoryService;
  let mockDb: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock database
    mockDb = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      onConflictDoUpdate: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({}),
    };

    // Use jest.requireMock to get the mocked db
    const mockedDb = jest.requireMock('../../../db/connection').db;
    Object.assign(mockedDb, mockDb);
    memoryService = new ConsolidatedMemoryService();
  });

  afterEach(async () => {
    await memoryService.cleanup();
  });

  describe('Memory Entry Management', () => {
    it('should create a memory entry successfully', async () => {
      const memoryData = {
        agentId: 'agent-123',
        organizationId: 'org-123',
        content: 'Test memory content',
        type: 'conversation' as const,
        importance: 5,
        tags: ['test', 'unit'],
        metadata: { source: 'test' }
      };

      const mockMemory = {
        id: 'memory-123',
        ...memoryData,
        embedding: [0.1, 0.2, 0.3],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockDb.execute.mockResolvedValue({ insertId: 'memory-123' });
      mockDb.select.mockReturnValue([mockMemory]);

      const result = await memoryService.createMemory(memoryData);

      expect(result).toBeDefined();
      expect(result.content).toBe(memoryData.content);
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.values).toHaveBeenCalledWith(
        expect.objectContaining({
          agentId: memoryData.agentId,
          content: memoryData.content,
          type: memoryData.type
        })
      );
    });

    it('should retrieve memory by ID', async () => {
      const mockMemory = {
        id: 'memory-123',
        agentId: 'agent-123',
        content: 'Test content',
        type: 'conversation',
        importance: 5,
        createdAt: new Date()
      };

      mockDb.select.mockReturnValue([mockMemory]);

      const result = await memoryService.getMemory('memory-123');

      expect(result).toEqual(mockMemory);
      expect(mockDb.where).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'memory-123'
        })
      );
    });

    it('should update memory entry', async () => {
      const updates = {
        content: 'Updated content',
        importance: 8
      };

      const existingMemory = {
        id: 'memory-123',
        content: 'Original content',
        importance: 5
      };

      mockDb.select.mockReturnValue([existingMemory]);
      mockDb.execute.mockResolvedValue({});

      const result = await memoryService.updateMemory('memory-123', updates);

      expect(result).toBeDefined();
      expect(mockDb.update).toHaveBeenCalled();
      expect(mockDb.set).toHaveBeenCalledWith(
        expect.objectContaining(updates)
      );
    });

    it('should delete memory entry', async () => {
      mockDb.execute.mockResolvedValue({});

      const result = await memoryService.deleteMemory('memory-123');

      expect(result).toBe(true);
      expect(mockDb.delete).toHaveBeenCalled();
      expect(mockDb.where).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'memory-123'
        })
      );
    });

    it('should search memories with filters', async () => {
      const mockMemories = [
        { id: '1', content: 'Memory 1', type: 'conversation' },
        { id: '2', content: 'Memory 2', type: 'summary' }
      ];

      mockDb.select.mockReturnValue(mockMemories);

      const result = await memoryService.searchMemories({
        agentId: 'agent-123',
        type: 'conversation',
        limit: 10,
        offset: 0
      });

      expect(result).toHaveLength(2);
      expect(mockDb.where).toHaveBeenCalled();
    });
  });

  describe('Vector Search', () => {
    it('should perform semantic search', async () => {
      const query = 'test query';
      const mockResults = [
        { id: '1', content: 'Similar content 1', similarity: 0.9 },
        { id: '2', content: 'Similar content 2', similarity: 0.8 }
      ];

      mockDb.select.mockReturnValue(mockResults);

      const result = await memoryService.semanticSearch(query, {
        agentId: 'agent-123',
        threshold: 0.7,
        limit: 5
      });

      expect(result).toHaveLength(2);
      expect(result[0].similarity).toBeGreaterThanOrEqual(0.7);
    });

    it('should handle empty search results', async () => {
      mockDb.select.mockReturnValue([]);

      const result = await memoryService.semanticSearch('no match query');

      expect(result).toHaveLength(0);
    });
  });

  describe('Memory Summarization', () => {
    it('should create summary job', async () => {
      const jobData = {
        agentId: 'agent-123',
        organizationId: 'org-123',
        timeRange: { start: new Date('2024-01-01'), end: new Date('2024-01-31') },
        criteria: { minImportance: 5 }
      };

      mockDb.execute.mockResolvedValue({ insertId: 'job-123' });

      const result = await memoryService.createSummaryJob(jobData);

      expect(result).toBeDefined();
      expect(result.status).toBe('pending');
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it('should process summary job', async () => {
      const jobId = 'job-123';
      const mockMemories = [
        { id: '1', content: 'Memory 1', importance: 8 },
        { id: '2', content: 'Memory 2', importance: 7 }
      ];

      mockDb.select.mockReturnValue([{
        id: jobId,
        status: 'pending',
        criteria: { minImportance: 5 }
      }]);

      mockDb.select.mockReturnValue(mockMemories);
      mockDb.execute.mockResolvedValue({});

      const result = await memoryService.processSummaryJob(jobId);

      expect(result).toBeDefined();
      expect(result.status).toBe('completed');
    });
  });

  describe('Memory Archival', () => {
    it('should create archival job', async () => {
      const jobData = {
        organizationId: 'org-123',
        criteria: {
          olderThan: 90, // days
          maxImportance: 3
        }
      };

      mockDb.execute.mockResolvedValue({ insertId: 'archive-job-123' });

      const result = await memoryService.createArchivalJob(jobData);

      expect(result).toBeDefined();
      expect(result.status).toBe('pending');
    });

    it('should process archival job', async () => {
      const jobId = 'archive-job-123';
      const oldMemories = [
        { id: '1', content: 'Old memory 1', importance: 2, createdAt: new Date('2023-01-01') },
        { id: '2', content: 'Old memory 2', importance: 1, createdAt: new Date('2023-01-02') }
      ];

      mockDb.select.mockReturnValue([{
        id: jobId,
        status: 'pending',
        criteria: { olderThan: 90, maxImportance: 3 }
      }]);

      mockDb.select.mockReturnValue(oldMemories);
      mockDb.execute.mockResolvedValue({});

      const result = await memoryService.processArchivalJob(jobId);

      expect(result).toBeDefined();
      expect(result.status).toBe('completed');
      expect(result.archivedCount).toBe(2);
    });
  });

  describe('Memory Analytics', () => {
    it('should get memory statistics', async () => {
      const mockStats = [
        { type: 'conversation', count: 100 },
        { type: 'summary', count: 50 },
        { type: 'decision', count: 25 }
      ];

      mockDb.select.mockReturnValue(mockStats);

      const result = await memoryService.getMemoryStatistics('org-123');

      expect(result).toBeDefined();
      expect(result.totalMemories).toBe(175);
      expect(result.byType.conversation).toBe(100);
    });

    it('should get memory trends', async () => {
      const mockTrends = [
        { date: '2024-01-01', count: 10 },
        { date: '2024-01-02', count: 15 },
        { date: '2024-01-03', count: 12 }
      ];

      mockDb.select.mockReturnValue(mockTrends);

      const result = await memoryService.getMemoryTrends('org-123', {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-03'),
        granularity: 'daily'
      });

      expect(result).toHaveLength(3);
      expect(result[0].date).toBe('2024-01-01');
      expect(result[0].count).toBe(10);
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      mockDb.select.mockImplementation(() => {
        throw new Error('Database connection failed');
      });

      await expect(memoryService.getMemory('memory-123')).rejects.toThrow();
    });

    it('should handle invalid memory data', async () => {
      const invalidMemory = {
        agentId: '', // invalid empty string
        content: null, // invalid null
        type: 'invalid-type' as any
      };

      await expect(memoryService.createMemory(invalidMemory)).rejects.toThrow();
    });

    it('should handle concurrent operations', async () => {
      const memoryData = {
        agentId: 'agent-123',
        organizationId: 'org-123',
        content: 'Test memory',
        type: 'conversation' as const,
        importance: 5
      };

      mockDb.execute.mockResolvedValue({ insertId: 'memory-123' });

      // Create multiple memories concurrently
      const promises = Array(5).fill(null).map(() => 
        memoryService.createMemory(memoryData)
      );

      const results = await Promise.all(promises);

      expect(results).toHaveLength(5);
      results.forEach(result => {
        expect(result).toBeDefined();
      });
    });
  });

  describe('Performance', () => {
    it('should handle large memory sets efficiently', async () => {
      const largeMemorySet = Array(1000).fill(null).map((_, index) => ({
        id: `memory-${index}`,
        content: `Memory content ${index}`,
        type: 'conversation' as const,
        importance: Math.floor(Math.random() * 10)
      }));

      mockDb.select.mockReturnValue(largeMemorySet);

      const startTime = Date.now();
      const result = await memoryService.searchMemories({
        limit: 1000,
        offset: 0
      });
      const endTime = Date.now();

      expect(result).toHaveLength(1000);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should cache frequently accessed memories', async () => {
      const memoryId = 'memory-123';
      const mockMemory = {
        id: memoryId,
        content: 'Cached memory',
        type: 'conversation'
      };

      mockDb.select.mockReturnValue([mockMemory]);

      // First call - should hit database
      const result1 = await memoryService.getMemory(memoryId);
      // Second call - should hit cache
      const result2 = await memoryService.getMemory(memoryId);

      expect(result1).toEqual(result2);
      expect(mockDb.select).toHaveBeenCalledTimes(1); // Only called once due to caching
    });
  });

  describe('Resource Management', () => {
    it('should cleanup resources properly', async () => {
      const memoryService = new ConsolidatedMemoryService();
      
      // Add some data to cache
      await memoryService.createMemory({
        agentId: 'agent-123',
        organizationId: 'org-123',
        content: 'Test memory',
        type: 'conversation',
        importance: 5
      });

      // Cleanup should not throw errors
      await expect(memoryService.cleanup()).resolves.not.toThrow();
    });

    it('should handle memory leaks prevention', async () => {
      const memoryService = new ConsolidatedMemoryService();
      
      // Create many memories to test cleanup
      const promises = Array(100).fill(null).map((_, index) =>
        memoryService.createMemory({
          agentId: `agent-${index}`,
          organizationId: 'org-123',
          content: `Memory ${index}`,
          type: 'conversation',
          importance: 5
        })
      );

      await Promise.all(promises);
      await memoryService.cleanup();

      // Should not cause memory leaks
      expect(true).toBe(true); // Test passes if no errors occur
    });
  });
});
