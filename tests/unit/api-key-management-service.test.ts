import { ApiKeyManagementService } from '../../backend/services/api-key-management-service';
import { db as pgDb } from '../../backend/db/connection';
import { users, organizations, apiKeys } from '../../backend/db/drizzle-schema';
import { logAudit } from '../../backend/lib/audit';

// Mock dependencies
jest.mock('../../backend/db/connection');
jest.mock('../../backend/lib/audit');

const mockDb = pgDb as jest.Mocked<typeof pgDb>;
const mockLogAudit = logAudit as jest.MockedFunction<typeof logAudit>;

describe('ApiKeyManagementService', () => {
  let service: ApiKeyManagementService;
  const mockUserId = 'user-123';
  const mockOrgId = 'org-123';
  const mockApiKey = 'ak_test_123456789';

  beforeEach(() => {
    service = new ApiKeyManagementService();
    jest.clearAllMocks();
    
    // Mock database responses
    mockDb.select.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([{ id: mockUserId }])
        })
      })
    } as any);

    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{
          id: 'key-123',
          organizationId: mockOrgId,
          userId: mockUserId,
          name: 'Test Key',
          key: mockApiKey,
          hashedKey: 'hashed-key',
          permissions: ['read'],
          rateLimit: 1000,
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        }])
      })
    } as any);

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([{ id: 'key-123' }])
      })
    } as any);

    mockDb.delete = jest.fn().mockReturnValue({
      where: jest.fn().mockResolvedValue([])
    } as any);

    mockLogAudit.mockResolvedValue(undefined);
  });

  describe('createApiKey', () => {
    it('should create API key successfully', async () => {
      const result = await service.createApiKey({
        userId: mockUserId,
        organizationId: mockOrgId,
        name: 'Test Key',
        permissions: ['read'],
        rateLimit: 1000,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('key');
      expect(result).toHaveProperty('name', 'Test Key');
      expect(result).toHaveProperty('permissions', ['read']);
      expect(result).toHaveProperty('rateLimit', 1000);
      expect(result).toHaveProperty('status', 'active');
      expect(mockLogAudit).toHaveBeenCalledWith({
        userId: mockUserId,
        organizationId: mockOrgId,
        action: 'api_key_created',
        resource: 'api_key',
        resourceId: result.id,
        details: expect.objectContaining({
          keyName: 'Test Key'
        })
      });
    });

    it('should throw error for invalid user', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      } as any);

      await expect(service.createApiKey({
        userId: 'invalid-user',
        organizationId: mockOrgId,
        name: 'Test Key',
        permissions: ['read']
      })).rejects.toThrow('User not found');
    });

    it('should throw error for invalid organization', async () => {
      mockDb.select.mockReturnValueOnce({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{ id: mockUserId }])
          })
        })
      } as any).mockReturnValueOnce({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      } as any);

      await expect(service.createApiKey({
        userId: mockUserId,
        organizationId: 'invalid-org',
        name: 'Test Key',
        permissions: ['read']
      })).rejects.toThrow('Organization not found');
    });

    it('should respect API key limits', async () => {
      // Mock existing keys count
      mockDb.select.mockReturnValueOnce({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{ id: mockUserId }])
          })
        })
      } as any).mockReturnValueOnce({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      } as any).mockReturnValueOnce({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      } as any).mockReturnValueOnce({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([Array(10).fill({})]) // 10 existing keys
          })
        })
      } as any);

      await expect(service.createApiKey({
        userId: mockUserId,
        organizationId: mockOrgId,
        name: 'Test Key',
        permissions: ['read']
      })).rejects.toThrow('Maximum API keys limit reached');
    });
  });

  describe('validateApiKey', () => {
    it('should validate API key successfully', async () => {
      // Mock database response for key lookup
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'key-123',
              organizationId: mockOrgId,
              userId: mockUserId,
              name: 'Test Key',
              hashedKey: 'hashed-key',
              permissions: ['read'],
              rateLimit: 1000,
              status: 'active',
              expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              usageCount: 5,
              lastUsedAt: new Date()
            }])
          })
        })
      } as any);

      const result = await service.validateApiKey(mockApiKey);

      expect(result).toBeTruthy();
      expect(result?.id).toBe('key-123');
      expect(result?.organizationId).toBe(mockOrgId);
      expect(result?.userId).toBe(mockUserId);
      expect(result?.status).toBe('active');
    });

    it('should return null for invalid API key', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      } as any);

      const result = await service.validateApiKey('invalid-key');

      expect(result).toBeNull();
    });

    it('should return null for inactive API key', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'key-123',
              status: 'inactive'
            }])
          })
        })
      } as any);

      const result = await service.validateApiKey(mockApiKey);

      expect(result).toBeNull();
    });

    it('should return null for expired API key', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'key-123',
              status: 'active',
              expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // Expired yesterday
            }])
          })
        })
      } as any);

      const result = await service.validateApiKey(mockApiKey);

      expect(result).toBeNull();
    });
  });

  describe('getApiKeys', () => {
    it('should get API keys for organization', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              offset: jest.fn().mockResolvedValue([{
                id: 'key-123',
                organizationId: mockOrgId,
                userId: mockUserId,
                name: 'Test Key',
                hashedKey: 'hashed-key',
                permissions: ['read'],
                rateLimit: 1000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
              }])
            })
          })
        })
      } as any);

      const result = await service.getApiKeys(mockOrgId);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('key-123');
      expect(result[0].organizationId).toBe(mockOrgId);
    });

    it('should apply filters correctly', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              offset: jest.fn().mockResolvedValue([{
                id: 'key-123',
                status: 'active'
              }])
            })
          })
        })
      } as any);

      const result = await service.getApiKeys(mockOrgId, {
        status: 'active',
        search: 'Test',
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('active');
    });
  });

  describe('getApiKeyById', () => {
    it('should get API key by ID', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'key-123',
              organizationId: mockOrgId,
              userId: mockUserId,
              name: 'Test Key'
            }])
          })
        })
      } as any);

      const result = await service.getApiKeyById('key-123', mockOrgId);

      expect(result).toBeTruthy();
      expect(result?.id).toBe('key-123');
      expect(result?.organizationId).toBe(mockOrgId);
    });

    it('should return null for non-existent key', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      } as any);

      const result = await service.getApiKeyById('non-existent', mockOrgId);

      expect(result).toBeNull();
    });
  });

  describe('updateApiKey', () => {
    it('should update API key successfully', async () => {
      const result = await service.updateApiKey('key-123', mockOrgId, {
        name: 'Updated Key',
        permissions: ['read', 'write']
      });

      expect(result).toBeTruthy();
      expect(result?.name).toBe('Updated Key');
      expect(result?.permissions).toEqual(['read', 'write']);
      expect(mockLogAudit).toHaveBeenCalledWith({
        organizationId: mockOrgId,
        action: 'api_key_updated',
        resource: 'api_key',
        resourceId: 'key-123',
        details: expect.objectContaining({
          updatedFields: ['name', 'permissions']
        })
      });
    });
  });

  describe('revokeApiKey', () => {
    it('should revoke API key successfully', async () => {
      const result = await service.revokeApiKey('key-123', mockOrgId);

      expect(result).toBeTruthy();
      expect(result?.status).toBe('inactive');
      expect(mockLogAudit).toHaveBeenCalledWith({
        organizationId: mockOrgId,
        action: 'api_key_revoked',
        resource: 'api_key',
        resourceId: 'key-123'
      });
    });
  });

  describe('rotateApiKey', () => {
    it('should rotate API key successfully', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'key-123',
              organizationId: mockOrgId,
              userId: mockUserId,
              name: 'Test Key',
              hashedKey: 'old-hashed-key',
              permissions: ['read'],
              rateLimit: 1000,
              status: 'active'
            }])
          })
        })
      } as any);

      const result = await service.rotateApiKey('key-123', mockOrgId);

      expect(result).toBeTruthy();
      expect(result?.key).not.toBe(mockApiKey); // Should be a new key
      expect(mockLogAudit).toHaveBeenCalledWith({
        organizationId: mockOrgId,
        action: 'api_key_rotated',
        resource: 'api_key',
        resourceId: 'key-123'
      });
    });
  });

  describe('getApiKeyUsage', () => {
    it('should get API key usage statistics', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'key-123',
              usageCount: 100,
              lastUsedAt: new Date()
            }])
          })
        })
      } as any);

      const result = await service.getApiKeyUsage('key-123', mockOrgId);

      expect(result).toHaveProperty('usageCount', 100);
      expect(result).toHaveProperty('lastUsedAt');
    });
  });

  describe('checkRateLimit', () => {
    it('should allow requests within rate limit', async () => {
      const result = await service.checkRateLimit('key-123', 1000);

      expect(result).toBe(true);
    });

    it('should block requests exceeding rate limit', async () => {
      // First request should pass
      await service.checkRateLimit('key-123', 1);
      
      // Second request should fail
      const result = await service.checkRateLimit('key-123', 1);

      expect(result).toBe(false);
    });
  });

  describe('getApiKeyStats', () => {
    it('should get API key statistics', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([
              { status: 'active' },
              { status: 'active' },
              { status: 'inactive' }
            ])
          })
        })
      } as any);

      const result = await service.getApiKeyStats(mockOrgId);

      expect(result).toHaveProperty('total', 3);
      expect(result).toHaveProperty('active', 2);
      expect(result).toHaveProperty('inactive', 1);
    });
  });

  describe('cleanupExpiredKeys', () => {
    it('should cleanup expired keys', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'expired-key',
              status: 'active',
              expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // Expired
            }])
          })
        })
      } as any);

      const result = await service.cleanupExpiredKeys();

      expect(result).toBeGreaterThan(0);
    });
  });
});
