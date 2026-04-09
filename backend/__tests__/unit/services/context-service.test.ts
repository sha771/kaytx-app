import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { ContextService } from '../../../services/context-service';
import { db as pgDb } from '../../../db/connection';
import { logAudit } from '../../../lib/audit';
import { encrypt, decrypt } from '../../../lib/encryption';

// Mock dependencies
jest.mock('../../../db/connection');
jest.mock('../../../lib/audit');
jest.mock('../../../lib/encryption');

const mockDb = pgDb as jest.Mocked<typeof pgDb>;
const mockLogAudit = logAudit as jest.MockedFunction<typeof logAudit>;
const mockEncrypt = encrypt as jest.MockedFunction<typeof encrypt>;
const mockDecrypt = decrypt as jest.MockedFunction<typeof decrypt>;

describe('ContextService', () => {
  let contextService: ContextService;
  const mockOrganizationId = '12345678-1234-1234-1234-123456789012';
  const mockUserId = '00000000-0000-0000-0000-000000000123';
  const mockSessionId = '11111111-1111-1111-1111-111111111111';
  const mockContextId = '22222222-2222-2222-2222-222222222222';

  beforeEach(() => {
    jest.clearAllMocks();
    contextService = new ContextService();
    
    // Setup default mock responses
    mockDb.select = jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue([])
        })
      })
    });

    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: mockContextId }])
      })
    });

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ id: mockContextId }])
        })
      })
    });

    mockDb.delete = jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: mockContextId }])
      })
    });

    // Mock encryption
    mockEncrypt.mockReturnValue('encrypted-data');
    mockDecrypt.mockReturnValue('decrypted-data');

    // Mock audit log
    mockLogAudit.mockResolvedValue(undefined);
  });

  describe('getContext', () => {
    it('should get user context successfully', async () => {
      const mockUser = {
        id: mockUserId,
        organizationId: mockOrganizationId,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe'
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockUser])
          })
        })
      });

      const result = await contextService.getContext({
        userId: mockUserId,
        sessionId: mockSessionId,
        includeProfile: true,
        includePreferences: true,
        includeActivity: true,
        includePermissions: true
      });

      expect(result.success).toBe(true);
      expect(result.data?.userId).toBe(mockUserId);
      expect(result.data?.organizationId).toBe(mockOrganizationId);
      expect(result.data?.sessionId).toBe(mockSessionId);
      expect(result.data?.userProfile).toBeDefined();
      expect(result.data?.preferences).toBeDefined();
      expect(result.data?.recentActivity).toBeDefined();
      expect(result.data?.permissions).toBeDefined();
    });

    it('should return error for non-existent user', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      });

      const result = await contextService.getContext({
        userId: 'non-existent-user',
        sessionId: mockSessionId
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('User not found');
    });

    it('should use cached context when available', async () => {
      const mockUser = {
        id: mockUserId,
        organizationId: mockOrganizationId,
        email: 'test@example.com'
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockUser])
          })
        })
      });

      // First call
      const result1 = await contextService.getContext({
        userId: mockUserId,
        sessionId: mockSessionId
      });

      // Second call should use cache
      const result2 = await contextService.getContext({
        userId: mockUserId,
        sessionId: mockSessionId
      });

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
      // Should only hit database once
      expect(mockDb.select).toHaveBeenCalledTimes(1);
    });

    it('should handle partial context requests', async () => {
      const mockUser = {
        id: mockUserId,
        organizationId: mockOrganizationId,
        email: 'test@example.com'
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockUser])
          })
        })
      });

      const result = await contextService.getContext({
        userId: mockUserId,
        includeProfile: false,
        includePreferences: false,
        includeActivity: false,
        includePermissions: false
      });

      expect(result.success).toBe(true);
      expect(result.data?.userProfile).toEqual({});
      expect(result.data?.preferences).toEqual({});
      expect(result.data?.recentActivity).toEqual([]);
      expect(result.data?.permissions).toEqual([]);
    });
  });

  describe('updatePreferences', () => {
    it('should update user preferences successfully', async () => {
      const preferences = {
        theme: 'dark' as const,
        language: 'fr',
        notifications: {
          email: false,
          push: true,
          sms: false,
          frequency: 'weekly' as const,
          categories: ['important']
        }
      };

      const result = await contextService.updatePreferences(mockUserId, preferences);

      expect(result.success).toBe(true);
      expect(result.data?.theme).toBe('dark');
      expect(result.data?.language).toBe('fr');
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'UPDATE_PREFERENCES',
          resource: 'user_preferences',
          status: 'success'
        })
      );
    });

    it('should merge preferences with existing ones', async () => {
      const existingPreferences = {
        theme: 'light' as const,
        language: 'en',
        notifications: {
          email: true,
          push: true,
          sms: false,
          frequency: 'daily' as const,
          categories: ['all']
        }
      };

      const partialUpdate = {
        theme: 'dark' as const,
        language: 'fr'
      };

      jest.spyOn(contextService as any, 'getUserPreferences').mockResolvedValue(existingPreferences);

      const result = await contextService.updatePreferences(mockUserId, partialUpdate);

      expect(result.success).toBe(true);
      expect(result.data?.theme).toBe('dark');
      expect(result.data?.language).toBe('fr');
      // Should keep existing values
      expect(result.data?.notifications.email).toBe(true);
    });
  });

  describe('logActivity', () => {
    it('should log user activity successfully', async () => {
      const activity = {
        type: 'login' as const,
        resource: 'auth',
        resourceId: 'login-123',
        details: { method: 'password' },
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0'
      };

      const result = await contextService.logActivity(activity);

      expect(result.success).toBe(true);
      expect(result.data).toMatch(/^[0-9a-f-]+$/); // UUID format
      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: mockUserId,
          activityType: 'login',
          resource: 'auth'
        })
      );
    });

    it('should handle activity logging errors', async () => {
      mockDb.insert = jest.fn().mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockRejectedValue(new Error('Database error'))
        })
      });

      const activity = {
        type: 'login' as const,
        resource: 'auth',
        details: {},
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0'
      };

      const result = await contextService.logActivity(activity);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Database error');
    });
  });

  describe('getRecentActivity', () => {
    it('should get recent activity for user', async () => {
      const mockActivities = [
        {
          id: 'activity-1',
          userId: mockUserId,
          organizationId: mockOrganizationId,
          activityType: 'login',
          resource: 'auth',
          resourceId: 'login-123',
          details: { method: 'password' },
          ipAddress: '127.0.0.1',
          userAgent: 'Mozilla/5.0',
          timestamp: new Date('2024-01-15T10:00:00Z')
        },
        {
          id: 'activity-2',
          userId: mockUserId,
          organizationId: mockOrganizationId,
          activityType: 'page_view',
          resource: 'dashboard',
          details: { page: '/dashboard' },
          ipAddress: '127.0.0.1',
          userAgent: 'Mozilla/5.0',
          timestamp: new Date('2024-01-15T10:05:00Z')
        }
      ];

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue(mockActivities)
            })
          })
        })
      });

      const activities = await contextService.getRecentActivity(mockUserId, 10);

      expect(activities).toHaveLength(2);
      expect(activities[0].type).toBe('login');
      expect(activities[1].type).toBe('page_view');
      expect(activities[0].resource).toBe('auth');
      expect(activities[1].resource).toBe('dashboard');
    });

    it('should return empty array for user with no activity', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue([])
            })
          })
        })
      });

      const activities = await contextService.getRecentActivity(mockUserId);

      expect(activities).toHaveLength(0);
    });

    it('should limit results as requested', async () => {
      const mockActivities = Array.from({ length: 50 }, (_, i) => ({
        id: `activity-${i}`,
        userId: mockUserId,
        organizationId: mockOrganizationId,
        activityType: 'action',
        resource: 'test',
        details: {},
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0',
        timestamp: new Date()
      }));

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue(mockActivities.slice(0, 10))
            })
          })
        })
      });

      const activities = await contextService.getRecentActivity(mockUserId, 10);

      expect(activities).toHaveLength(10);
    });
  });

  describe('storeContext', () => {
    it('should store context successfully', async () => {
      const content = {
        preferences: { theme: 'dark' },
        recentSearches: ['test1', 'test2'],
        customData: { key: 'value' }
      };

      const options = {
        sessionId: mockSessionId,
        tags: ['user-preferences', 'custom'],
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        isEncrypted: false,
        changeReason: 'Initial context'
      };

      const mockUser = {
        id: mockUserId,
        organizationId: mockOrganizationId
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockUser])
          })
        })
      });

      const result = await contextService.storeContext(
        mockUserId,
        'user_preferences',
        content,
        options
      );

      expect(result.success).toBe(true);
      expect(result.data?.contextId).toBe(mockContextId);
      expect(result.data?.version).toBe(1);
      expect(mockDb.insert).toHaveBeenCalledTimes(2); // Once for context, once for version
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'CONTEXT_STORED',
          resource: 'user_context',
          status: 'success'
        })
      );
    });

    it('should encrypt content when requested', async () => {
      const content = { sensitive: 'data' };
      const options = { isEncrypted: true };

      const mockUser = {
        id: mockUserId,
        organizationId: mockOrganizationId
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockUser])
          })
        })
      });

      await contextService.storeContext(mockUserId, 'sensitive_data', content, options);

      expect(mockEncrypt).toHaveBeenCalledWith(JSON.stringify(content));
      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          content: 'encrypted-data',
          isEncrypted: true
        })
      );
    });

    it('should handle user not found error', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      });

      const result = await contextService.storeContext(
        mockUserId,
        'test',
        { data: 'test' }
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('User not found');
    });
  });

  describe('updateContext', () => {
    it('should update existing context successfully', async () => {
      const existingContext = {
        id: mockContextId,
        userId: mockUserId,
        organizationId: mockOrganizationId,
        content: 'old-content',
        version: 1,
        isEncrypted: false,
        tags: ['old-tag'],
        expiresAt: null
      };

      const newContent = { updated: 'data' };
      const options = {
        changeReason: 'User preference update',
        tags: ['new-tag']
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([existingContext])
          })
        })
      });

      const result = await contextService.updateContext(mockContextId, newContent, options);

      expect(result.success).toBe(true);
      expect(result.data?.version).toBe(2); // Should increment version
      expect(mockDb.update).toHaveBeenCalled();
      expect(mockDb.insert).toHaveBeenCalled(); // For new version
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'CONTEXT_UPDATED',
          resource: 'user_context',
          status: 'success'
        })
      );
    });

    it('should handle context not found error', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      });

      const result = await contextService.updateContext(
        mockContextId,
        { data: 'test' }
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Context not found');
    });

    it('should preserve encryption when updating', async () => {
      const existingContext = {
        id: mockContextId,
        userId: mockUserId,
        organizationId: mockOrganizationId,
        content: 'encrypted-data',
        version: 1,
        isEncrypted: true,
        tags: [],
        expiresAt: null
      };

      const newContent = { updated: 'data' };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([existingContext])
          })
        })
      });

      await contextService.updateContext(mockContextId, newContent);

      expect(mockEncrypt).toHaveBeenCalledWith(JSON.stringify(newContent));
      expect(mockDb.update).toHaveBeenCalledWith(
        expect.objectContaining({
          content: 'encrypted-data', // Should be encrypted
          isEncrypted: true
        })
      );
    });
  });

  describe('searchContexts', () => {
    it('should search contexts by type', async () => {
      const mockContexts = [
        {
          id: 'context-1',
          userId: mockUserId,
          contextType: 'user_preferences',
          version: 1,
          content: { theme: 'dark' },
          metadata: {},
          tags: ['preferences'],
          isEncrypted: false,
          expiresAt: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'context-2',
          userId: mockUserId,
          contextType: 'user_preferences',
          version: 1,
          content: { language: 'fr' },
          metadata: {},
          tags: ['preferences'],
          isEncrypted: false,
          expiresAt: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockReturnValue({
                offset: jest.fn().mockResolvedValue(mockContexts)
              })
            })
          })
        })
      });

      const result = await contextService.searchContexts(mockUserId, {
        contextType: 'user_preferences'
      });

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].contextType).toBe('user_preferences');
    });

    it('should search contexts by tags', async () => {
      const mockContexts = [
        {
          id: 'context-1',
          userId: mockUserId,
          contextType: 'custom',
          version: 1,
          content: { data: 'test' },
          metadata: {},
          tags: ['important', 'work'],
          isEncrypted: false,
          expiresAt: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'context-2',
          userId: mockUserId,
          contextType: 'custom',
          version: 1,
          content: { other: 'data' },
          metadata: {},
          tags: ['personal'],
          isEncrypted: false,
          expiresAt: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockReturnValue({
                offset: jest.fn().mockResolvedValue(mockContexts)
              })
            })
          })
        })
      });

      const result = await contextService.searchContexts(mockUserId, {
        tags: ['important']
      });

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].tags).toContain('important');
    });

    it('should search contexts by text content', async () => {
      const mockContexts = [
        {
          id: 'context-1',
          userId: mockUserId,
          contextType: 'notes',
          version: 1,
          content: { note: 'Important meeting tomorrow at 10am' },
          metadata: {},
          tags: [],
          isEncrypted: false,
          expiresAt: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockReturnValue({
                offset: jest.fn().mockResolvedValue(mockContexts)
              })
            })
          })
        })
      });

      const result = await contextService.searchContexts(mockUserId, {
        searchText: 'meeting'
      });

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(JSON.stringify(result.data[0].content)).toContain('meeting');
    });

    it('should decrypt encrypted contexts in search results', async () => {
      const mockContexts = [
        {
          id: 'context-1',
          userId: mockUserId,
          contextType: 'sensitive',
          version: 1,
          content: 'encrypted-data',
          metadata: { encrypted: true },
          tags: [],
          isEncrypted: true,
          expiresAt: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockReturnValue({
                offset: jest.fn().mockResolvedValue(mockContexts)
              })
            })
          })
        })
      });

      mockDecrypt.mockReturnValue('{"secret": "data"}');

      const result = await contextService.searchContexts(mockUserId, {});

      expect(result.success).toBe(true);
      expect(result.data[0].content).toEqual({ secret: 'data' });
      expect(mockDecrypt).toHaveBeenCalledWith('encrypted-data');
    });

    it('should handle decryption errors gracefully', async () => {
      const mockContexts = [
        {
          id: 'context-1',
          userId: mockUserId,
          contextType: 'sensitive',
          version: 1,
          content: 'corrupted-encrypted-data',
          metadata: { encrypted: true },
          tags: [],
          isEncrypted: true,
          expiresAt: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockReturnValue({
                offset: jest.fn().mockResolvedValue(mockContexts)
              })
            })
          })
        })
      });

      mockDecrypt.mockImplementation(() => {
        throw new Error('Decryption failed');
      });

      const result = await contextService.searchContexts(mockUserId, {});

      expect(result.success).toBe(true);
      expect(result.data[0].content).toEqual({ error: 'Failed to decrypt content' });
    });
  });

  describe('getContextVersions', () => {
    it('should get context version history', async () => {
      const mockContext = {
        id: mockContextId,
        userId: mockUserId,
        organizationId: mockOrganizationId,
        isEncrypted: false
      };

      const mockVersions = [
        {
          id: 'version-1',
          contextId: mockContextId,
          version: 1,
          content: { data: 'v1' },
          metadata: {},
          changeReason: 'Initial version',
          changedBy: mockUserId,
          createdAt: new Date('2024-01-15T10:00:00Z')
        },
        {
          id: 'version-2',
          contextId: mockContextId,
          version: 2,
          content: { data: 'v2' },
          metadata: {},
          changeReason: 'Updated data',
          changedBy: mockUserId,
          createdAt: new Date('2024-01-15T11:00:00Z')
        }
      ];

      // First call for versions (with orderBy), second for context (with limit)
      mockDb.select = jest.fn()
        .mockReturnValueOnce({
          from: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnValue({
              orderBy: jest.fn().mockResolvedValue(mockVersions)
            })
          })
        })
        .mockReturnValueOnce({
          from: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue([mockContext])
            })
          })
        });

      const result = await contextService.getContextVersions(mockContextId);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].version).toBe(2); // Should be ordered by version desc
      expect(result.data[1].version).toBe(1);
      expect(result.data[0].changeReason).toBe('Updated data');
      expect(result.data[1].changeReason).toBe('Initial version');
    });

    it('should decrypt version content if context is encrypted', async () => {
      const mockContext = {
        id: mockContextId,
        userId: mockUserId,
        organizationId: mockOrganizationId,
        isEncrypted: true
      };

      const mockVersions = [
        {
          id: 'version-1',
          contextId: mockContextId,
          version: 1,
          content: 'encrypted-v1',
          metadata: { encrypted: true },
          changedBy: mockUserId,
          createdAt: new Date()
        }
      ];

      mockDb.select = jest.fn()
        .mockReturnValueOnce({
          from: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnValue({
              orderBy: jest.fn().mockResolvedValue(mockVersions)
            })
          })
        })
        .mockReturnValueOnce({
          from: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue([mockContext])
            })
          })
        });

      mockDecrypt.mockReturnValue('{"data": "decrypted"}');

      const result = await contextService.getContextVersions(mockContextId);

      expect(result.success).toBe(true);
      expect(result.data[0].content).toEqual({ data: 'decrypted' });
      expect(mockDecrypt).toHaveBeenCalledWith('encrypted-v1');
    });
  });

  describe('cleanupExpiredContexts', () => {
    it('should delete expired contexts successfully', async () => {
      const mockDeleted = [
        { id: 'context-1' },
        { id: 'context-2' }
      ];

      mockDb.delete = jest.fn()
        .mockReturnValueOnce({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue(mockDeleted)
          })
        })
        .mockReturnValueOnce({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([])
          })
        });

      const result = await contextService.cleanupExpiredContexts();

      expect(result.success).toBe(true);
      expect(result.data?.deleted).toBe(2);
      expect(mockDb.delete).toHaveBeenCalledTimes(2); // Once for contexts, once for versions
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'EXPIRED_CONTEXTS_CLEANUP',
          resource: 'user_context',
          status: 'success'
        })
      );
    });

    it('should handle cleanup with no expired contexts', async () => {
      mockDb.delete = jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([])
        })
      });

      const result = await contextService.cleanupExpiredContexts();

      expect(result.success).toBe(true);
      expect(result.data?.deleted).toBe(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle database connection errors', async () => {
      mockDb.select = jest.fn().mockImplementation(() => {
        throw new Error('Connection failed');
      });

      const result = await contextService.getContext({
        userId: mockUserId
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Connection failed');
    });

    it('should handle encryption errors', async () => {
      mockEncrypt.mockImplementation(() => {
        throw new Error('Encryption failed');
      });

      const mockUser = {
        id: mockUserId,
        organizationId: mockOrganizationId
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockUser])
          })
        })
      });

      const result = await contextService.storeContext(
        mockUserId,
        'test',
        { data: 'sensitive' },
        { isEncrypted: true }
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Encryption failed');
    });

    it('should handle invalid UUID format', async () => {
      const invalidUserId = 'invalid-uuid';

      const result = await contextService.getContext({
        userId: invalidUserId
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid user ID');
    });
  });

  describe('Validation', () => {
    it('should validate context type', async () => {
      const mockUser = {
        id: mockUserId,
        organizationId: mockOrganizationId
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockUser])
          })
        })
      });

      const result = await contextService.storeContext(
        mockUserId,
        '', // Empty context type
        { data: 'test' }
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Context type is required');
    });

    it('should validate content is not empty', async () => {
      const mockUser = {
        id: mockUserId,
        organizationId: mockOrganizationId
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockUser])
          })
        })
      });

      const result = await contextService.storeContext(
        mockUserId,
        'test',
        null as any
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Content is required');
    });

    it('should validate search parameters', async () => {
      const result = await contextService.searchContexts(mockUserId, {
        limit: -1 // Invalid limit
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid limit');
    });
  });
});
