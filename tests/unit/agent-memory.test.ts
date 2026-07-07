import { AgentMemoryService, MemoryEntry } from '../../backend/services/consolidated-memory-service';
import { vectorEmbeddingService } from '../../backend/services/vector-embedding-service';
import { db as pgDb } from '../../backend/db/connection';
import { aiMemories } from '../../backend/db/drizzle-schema';
import { eq } from 'drizzle-orm';
import axios from 'axios';

// Mock dependencies
jest.mock('../../backend/db/connection');
jest.mock('../../backend/services/vector-embedding-service');
jest.mock('axios');

const mockDb = pgDb as jest.Mocked<typeof pgDb>;
const mockVectorEmbeddingService = vectorEmbeddingService as jest.Mocked<typeof vectorEmbeddingService>;
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('AgentMemoryService', () => {
  let service: AgentMemoryService;
  let mockOrganizationId: string;
  let mockUserId: string;

  beforeEach(() => {
    service = new AgentMemoryService();
    mockOrganizationId = 'test-org-1';
    mockUserId = 'test-user-1';

    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup vector embedding mock
    mockVectorEmbeddingService.generateEmbedding = jest.fn().mockResolvedValue(new Array(1536).fill(0.1));
    
    // Setup axios mock to avoid network calls
    mockAxios.post = jest.fn().mockResolvedValue({
      data: {
        data: [{ embedding: new Array(1536).fill(0.1) }]
      }
    });
    
    // Setup default mock implementations
    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([])
      })
    }) as any;

    mockDb.select = jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          orderBy: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      })
    }) as any;

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([])
        })
      })
    }) as any;

    mockDb.delete = jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        rowCount: 1
      })
    }) as any;
  });

  describe('storeMemory', () => {
    it('should store a memory entry successfully', async () => {
      const memoryData = {
        organizationId: mockOrganizationId,
        userId: mockUserId,
        type: 'conversation' as const,
        content: 'Test memory content',
        importance: 0.8,
        tags: ['test', 'important'],
        metadata: { source: 'test' }
      };

      const result = await service.storeMemory(memoryData);

      expect(result.id).toBeDefined();
      expect(result.organizationId).toBe(mockOrganizationId);
      expect(result.userId).toBe(mockUserId);
      expect(result.content).toBe(memoryData.content);
      expect(result.importance).toBe(memoryData.importance);
      expect(result.tags).toEqual(memoryData.tags);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);

      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.insert(aiMemories).values).toHaveBeenCalled();
    });

    it('should handle different memory types', async () => {
      const types: MemoryEntry['type'][] = ['conversation', 'preference', 'knowledge'];

      for (const type of types) {
        const memoryData = {
          organizationId: mockOrganizationId,
          userId: mockUserId,
          type,
          content: `Test ${type} content`,
          importance: 0.5,
          tags: [],
          metadata: {}
        };

        const result = await service.storeMemory(memoryData);
        expect(result.type).toBe(type);
      }
    });
  });

  describe('getMemories', () => {
    it('should retrieve memories for a user', async () => {
      const mockMemories = [
        {
          id: 'memory-1',
          organizationId: mockOrganizationId,
          userId: mockUserId,
          type: 'conversation',
          content: 'Memory 1',
          importance: '0.8',
          tags: ['test'],
          metadata: {},
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue(mockMemories)
            })
          })
        })
      }) as any;

      const result = await service.getMemories(mockOrganizationId, mockUserId);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('memory-1');
      expect(result[0].importance).toBe(0.8);
      expect(result[0].tags).toEqual(['test']);
    });

    it('should apply limit parameter', async () => {
      await service.getMemories(mockOrganizationId, mockUserId, 50);

      const mockLimit = jest.fn().mockResolvedValue([]);
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: mockLimit
            })
          })
        })
      }) as any;

      await service.getMemories(mockOrganizationId, mockUserId, 50);
      expect(mockLimit).toHaveBeenCalledWith(50);
    });
  });

  describe('searchMemories', () => {
    it('should search memories by content', async () => {
      const mockMemories = [
        {
          id: 'memory-1',
          organizationId: mockOrganizationId,
          userId: mockUserId,
          type: 'conversation',
          content: 'This is about testing',
          importance: '0.8',
          tags: [],
          metadata: {},
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      // Mock getMemories to return our test data
      jest.spyOn(service, 'getMemories').mockResolvedValue(mockMemories as any);

      const result = await service.searchMemories(mockOrganizationId, mockUserId, 'testing');

      expect(result).toHaveLength(1);
      expect(result[0].content).toContain('testing');
    });

    it('should search memories by tags', async () => {
      const mockMemories = [
        {
          id: 'memory-1',
          organizationId: mockOrganizationId,
          userId: mockUserId,
          type: 'conversation',
          content: 'Some content',
          importance: '0.8',
          tags: ['important', 'test'],
          metadata: {},
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      jest.spyOn(service, 'getMemories').mockResolvedValue(mockMemories as any);

      const result = await service.searchMemories(mockOrganizationId, mockUserId, 'important');

      expect(result).toHaveLength(1);
      expect(result[0].tags).toContain('important');
    });

    it('should return empty results for non-matching queries', async () => {
      jest.spyOn(service, 'getMemories').mockResolvedValue([]);

      const result = await service.searchMemories(mockOrganizationId, mockUserId, 'nonexistent');

      expect(result).toHaveLength(0);
    });
  });

  describe('updateMemory', () => {
    it('should update a memory successfully', async () => {
      const mockUpdatedMemory = {
        id: 'memory-1',
        organizationId: mockOrganizationId,
        userId: mockUserId,
        type: 'conversation',
        content: 'Updated content',
        importance: '0.9',
        tags: ['updated'],
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockDb.update = jest.fn().mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([mockUpdatedMemory])
          })
        })
      }) as any;

      const result = await service.updateMemory(mockOrganizationId, mockUserId, 'memory-1', {
        content: 'Updated content',
        importance: 0.9,
        tags: ['updated']
      });

      expect(result).toBeTruthy();
      expect(result?.content).toBe('Updated content');
      expect(result?.importance).toBe(0.9);
      expect(result?.tags).toEqual(['updated']);
    });

    it('should return null for non-existent memory', async () => {
      mockDb.update = jest.fn().mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([])
          })
        })
      }) as any;

      const result = await service.updateMemory(mockOrganizationId, mockUserId, 'non-existent', {
        content: 'Updated content'
      });

      expect(result).toBeNull();
    });
  });

  describe('deleteMemory', () => {
    it('should delete a memory successfully', async () => {
      mockDb.delete = jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          rowCount: 1
        })
      }) as any;

      const result = await service.deleteMemory(mockOrganizationId, mockUserId, 'memory-1');

      expect(result).toBe(true);
      expect(mockDb.delete).toHaveBeenCalled();
    });

    it('should return false for non-existent memory', async () => {
      mockDb.delete = jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          rowCount: 0
        })
      }) as any;

      const result = await service.deleteMemory(mockOrganizationId, mockUserId, 'non-existent');

      expect(result).toBe(false);
    });
  });
});
