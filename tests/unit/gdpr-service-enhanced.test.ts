import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { generators } from '../property/generators';

// Mock everything before importing the service
const mockDb = {
  select: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

jest.mock('../../backend/db/connection', () => ({
  db: mockDb,
}));

jest.mock('../../backend/db/drizzle-schema', () => ({
  users: { id: 'users' },
  organizations: { id: 'organizations' },
  gdprRequests: { id: 'gdpr_requests' },
  auditTrail: { id: 'audit_trail' },
}));

jest.mock('../../backend/lib/audit', () => ({
  logAudit: jest.fn().mockResolvedValue(undefined),
  AuditActions: {
    GDPR_REQUEST_CREATED: 'gdpr.request_created',
    GDPR_ACCESS_REQUEST: 'gdpr.access_request',
    GDPR_ERASURE_REQUEST: 'gdpr.erasure_request',
    GDPR_PORTABILITY_REQUEST: 'gdpr.portability_request',
    GDPR_RECTIFICATION_REQUEST: 'gdpr.rectification_request',
  },
}));

jest.mock('drizzle-orm', () => ({
  eq: jest.fn((a, b) => ({ eq: { a, b } })),
  and: jest.fn((...conditions) => ({ and: conditions })),
  or: jest.fn((...conditions) => ({ or: conditions })),
  in: jest.fn((column, values) => ({ in: { column, values } })),
}));

// Import service after mocking
const { gdprService } = require('../../backend/services/gdpr-service');

describe('GDPRService Enhanced Tests', () => {
  let mockOrganizationId: string;
  let mockUserId: string;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOrganizationId = 'org-123';
    mockUserId = 'user-123';
    
    // Setup complete mock chain for database operations
    const mockLimit = jest.fn().mockReturnValue([]);
    const mockWhere = jest.fn().mockReturnValue({ limit: mockLimit });
    const mockFrom = jest.fn().mockReturnValue({ where: mockWhere });
    
    mockDb.select.mockReturnValue({ from: mockFrom });
    mockDb.insert.mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([])
      })
    });
    mockDb.update.mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([])
        })
      })
    });
    mockDb.delete.mockReturnValue({
      where: jest.fn().mockResolvedValue([])
    });
  });

  describe('GDPR Request Creation', () => {
    it('should create access request successfully', async () => {
      const request = {
        userId: mockUserId,
        type: 'access' as const,
        requestData: { reason: 'data access request' },
      };

      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ 
            id: 'gdpr-123',
            organizationId: mockOrganizationId,
            userId: mockUserId,
            type: 'access',
            status: 'pending',
            requestData: { reason: 'data access request' },
            createdAt: new Date(),
            updatedAt: new Date()
          }])
        })
      });

      const result = await gdprService.createGDPRRequest(mockOrganizationId, request);

      expect(result).toMatchObject({
        userId: mockUserId,
        type: 'access',
        status: 'pending',
        requestData: { reason: 'data access request' },
      });
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
    });

    it('should create deletion request successfully', async () => {
      const request = {
        userId: mockUserId,
        type: 'deletion' as const,
        requestData: { reason: 'account deletion' },
      };

      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ 
            id: 'gdpr-456',
            organizationId: mockOrganizationId,
            userId: mockUserId,
            type: 'deletion',
            status: 'pending',
            requestData: { reason: 'account deletion' },
            createdAt: new Date(),
            updatedAt: new Date()
          }])
        })
      });

      const result = await gdprService.createGDPRRequest(mockOrganizationId, request);

      expect(result).toMatchObject({
        userId: mockUserId,
        type: 'deletion',
        status: 'pending',
        requestData: { reason: 'account deletion' },
      });
    });

    it('should create rectification request successfully', async () => {
      const request = {
        userId: mockUserId,
        type: 'rectification' as const,
        requestData: { 
          fields: ['email', 'name'],
          corrections: { email: 'newemail@example.com' }
        },
      };

      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ 
            id: 'gdpr-789',
            organizationId: mockOrganizationId,
            userId: mockUserId,
            type: 'rectification',
            status: 'pending',
            requestData: request.requestData,
            createdAt: new Date(),
            updatedAt: new Date()
          }])
        })
      });

      const result = await gdprService.createGDPRRequest(mockOrganizationId, request);

      expect(result).toMatchObject({
        userId: mockUserId,
        type: 'rectification',
        status: 'pending',
        requestData: request.requestData,
      });
    });

    it('should create portability request successfully', async () => {
      const request = {
        userId: mockUserId,
        type: 'portability' as const,
        requestData: { format: 'json' },
      };

      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ 
            id: 'gdpr-999',
            organizationId: mockOrganizationId,
            userId: mockUserId,
            type: 'portability',
            status: 'pending',
            requestData: { format: 'json' },
            createdAt: new Date(),
            updatedAt: new Date()
          }])
        })
      });

      const result = await gdprService.createGDPRRequest(mockOrganizationId, request);

      expect(result).toMatchObject({
        userId: mockUserId,
        type: 'portability',
        status: 'pending',
        requestData: { format: 'json' },
      });
    });

    it('should validate required fields', async () => {
      const invalidRequest = {
        type: 'access' as const,
        // Missing userId
        requestData: { reason: 'test' },
      };

      await expect(
        gdprService.createGDPRRequest(mockOrganizationId, invalidRequest)
      ).rejects.toThrow('userId is required');
    });

    it('should validate request type', async () => {
      const invalidRequest = {
        userId: mockUserId,
        type: 'invalid' as any,
        requestData: { reason: 'test' },
      };

      await expect(
        gdprService.createGDPRRequest(mockOrganizationId, invalidRequest)
      ).rejects.toThrow('Invalid request type');
    });
  });

  describe('GDPR Request Processing', () => {
    it('should process access request and return user data', async () => {
      const requestId = 'gdpr-123';
      const userData = {
        id: mockUserId,
        email: 'user@example.com',
        name: 'Test User',
        organizationId: mockOrganizationId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Mock request lookup
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: requestId,
              userId: mockUserId,
              type: 'access',
              status: 'pending',
              organizationId: mockOrganizationId
            }])
          })
        })
      });

      // Mock user data lookup
      const mockUserSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([userData])
          })
        })
      });

      // Mock request update
      mockDb.update.mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([{
              id: requestId,
              status: 'completed',
              processedAt: new Date()
            }])
          })
        })
      });

      // Override the select mock for user lookup
      mockDb.select.mockImplementation(mockUserSelect);

      const result = await gdprService.processGDPRRequest(mockOrganizationId, requestId);

      expect(result).toMatchObject({
        requestId,
        status: 'completed',
        data: userData
      });
    });

    it('should process deletion request and anonymize user data', async () => {
      const requestId = 'gdpr-456';

      // Mock request lookup
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: requestId,
              userId: mockUserId,
              type: 'deletion',
              status: 'pending',
              organizationId: mockOrganizationId
            }])
          })
        })
      });

      // Mock user update (anonymization)
      mockDb.update.mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([{
              id: mockUserId,
              email: 'deleted@example.com',
              name: 'Deleted User',
              isDeleted: true
            }])
          })
        })
      });

      const result = await gdprService.processGDPRRequest(mockOrganizationId, requestId);

      expect(result).toMatchObject({
        requestId,
        status: 'completed',
        message: 'User data anonymized successfully'
      });
    });

    it('should handle request not found', async () => {
      const requestId = 'non-existent';

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      });

      await expect(
        gdprService.processGDPRRequest(mockOrganizationId, requestId)
      ).rejects.toThrow('GDPR request not found');
    });

    it('should handle already processed requests', async () => {
      const requestId = 'gdpr-123';

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: requestId,
              userId: mockUserId,
              type: 'access',
              status: 'completed',
              processedAt: new Date()
            }])
          })
        })
      });

      await expect(
        gdprService.processGDPRRequest(mockOrganizationId, requestId)
      ).rejects.toThrow('Request already processed');
    });
  });

  describe('GDPR Request Retrieval', () => {
    it('should retrieve request by ID', async () => {
      const requestId = 'gdpr-123';
      const expectedRequest = {
        id: requestId,
        userId: mockUserId,
        type: 'access',
        status: 'pending',
        organizationId: mockOrganizationId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([expectedRequest])
          })
        })
      });

      const result = await gdprService.getGDPRRequest(mockOrganizationId, requestId);

      expect(result).toMatchObject(expectedRequest);
    });

    it('should return null for non-existent request', async () => {
      const requestId = 'non-existent';

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      });

      const result = await gdprService.getGDPRRequest(mockOrganizationId, requestId);

      expect(result).toBeNull();
    });

    it('should retrieve all requests for user', async () => {
      const expectedRequests = [
        {
          id: 'gdpr-1',
          userId: mockUserId,
          type: 'access',
          status: 'completed',
          createdAt: new Date()
        },
        {
          id: 'gdpr-2',
          userId: mockUserId,
          type: 'deletion',
          status: 'pending',
          createdAt: new Date()
        }
      ];

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue(expectedRequests)
          })
        })
      });

      const result = await gdprService.getUserGDPRRequests(mockOrganizationId, mockUserId);

      expect(result).toHaveLength(2);
      expect(result[0].userId).toBe(mockUserId);
      expect(result[1].userId).toBe(mockUserId);
    });

    it('should retrieve all requests for organization', async () => {
      const expectedRequests = [
        {
          id: 'gdpr-1',
          userId: 'user-1',
          type: 'access',
          status: 'pending',
          createdAt: new Date()
        },
        {
          id: 'gdpr-2',
          userId: 'user-2',
          type: 'deletion',
          status: 'completed',
          createdAt: new Date()
        }
      ];

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue(expectedRequests)
          })
        })
      });

      const result = await gdprService.getOrganizationGDPRRequests(mockOrganizationId);

      expect(result).toHaveLength(2);
      expect(result.every(req => req.organizationId === mockOrganizationId)).toBe(true);
    });
  });

  describe('GDPR Data Export', () => {
    it('should export user data in JSON format', async () => {
      const userData = {
        id: mockUserId,
        email: 'user@example.com',
        name: 'Test User',
        organizationId: mockOrganizationId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const additionalData = {
        leads: [
          { id: 'lead-1', email: 'lead@example.com', status: 'new' },
          { id: 'lead-2', email: 'lead2@example.com', status: 'contacted' }
        ],
        campaigns: [
          { id: 'campaign-1', name: 'Test Campaign', status: 'sent' }
        ]
      };

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([userData])
          })
        })
      });

      // Mock additional data lookups
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      });

      mockDb.select.mockImplementation(mockSelect);

      const result = await gdprService.exportUserData(mockOrganizationId, mockUserId, 'json');

      expect(result).toHaveProperty('format', 'json');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('user');
      expect(result.data).toHaveProperty('leads');
      expect(result.data).toHaveProperty('campaigns');
      expect(result.data).toHaveProperty('exportedAt');
    });

    it('should export user data in CSV format', async () => {
      const userData = {
        id: mockUserId,
        email: 'user@example.com',
        name: 'Test User',
        organizationId: mockOrganizationId
      };

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([userData])
          })
        })
      });

      const result = await gdprService.exportUserData(mockOrganizationId, mockUserId, 'csv');

      expect(result).toHaveProperty('format', 'csv');
      expect(result).toHaveProperty('data');
      expect(typeof result.data).toBe('string');
      expect(result.data).toContain('id,email,name');
    });

    it('should validate export format', async () => {
      await expect(
        gdprService.exportUserData(mockOrganizationId, mockUserId, 'xml')
      ).rejects.toThrow('Unsupported export format');
    });
  });

  describe('GDPR Compliance Checks', () => {
    it('should check if user data exists', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{ id: mockUserId }])
          })
        })
      });

      const result = await gdprService.userDataExists(mockOrganizationId, mockUserId);

      expect(result).toBe(true);
    });

    it('should return false for non-existent user data', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      });

      const result = await gdprService.userDataExists(mockOrganizationId, mockUserId);

      expect(result).toBe(false);
    });

    it('should get data retention status', async () => {
      const userData = {
        id: mockUserId,
        email: 'user@example.com',
        lastActiveAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) // 60 days ago
      };

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([userData])
          })
        })
      });

      const result = await gdprService.getDataRetentionStatus(mockOrganizationId, mockUserId);

      expect(result).toHaveProperty('userId', mockUserId);
      expect(result).toHaveProperty('daysSinceLastActivity');
      expect(result).toHaveProperty('daysSinceCreation');
      expect(result).toHaveProperty('retentionRisk');
      expect(['low', 'medium', 'high']).toContain(result.retentionRisk);
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      const request = {
        userId: mockUserId,
        type: 'access' as const,
        requestData: { reason: 'test' },
      };

      mockDb.insert.mockImplementation(() => {
        throw new Error('Database connection failed');
      });

      await expect(
        gdprService.createGDPRRequest(mockOrganizationId, request)
      ).rejects.toThrow('Database connection failed');
    });

    it('should handle invalid organization ID', async () => {
      const request = {
        userId: mockUserId,
        type: 'access' as const,
        requestData: { reason: 'test' },
      };

      await expect(
        gdprService.createGDPRRequest('', request)
      ).rejects.toThrow('Organization ID is required');
    });

    it('should handle malformed request data', async () => {
      const request = {
        userId: mockUserId,
        type: 'access' as const,
        requestData: 'invalid' as any, // Should be object
      };

      await expect(
        gdprService.createGDPRRequest(mockOrganizationId, request)
      ).rejects.toThrow('Request data must be an object');
    });
  });
});
