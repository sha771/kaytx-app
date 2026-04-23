import { describe, it, expect, beforeEach, jest } from '@jest/globals';

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
}));

// Import service after mocking
const { gdprService } = require('../../backend/services/gdpr-service');

describe('GDPRService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
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

  describe('createGDPRRequest', () => {
    it('should create GDPR request successfully', async () => {
      const request = {
        organizationId: 'org-123',
        userId: 'user-123',
        type: 'access' as const,
        requestData: { reason: 'data access' },
      };

      // Mock the insert to return the created request
      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ 
            id: 'gdpr-123',
            organizationId: 'org-123',
            userId: 'user-123',
            requestType: 'access',
            status: 'pending',
            requestData: { reason: 'data access' },
            createdAt: new Date(),
            updatedAt: new Date()
          }])
        })
      });

      const result = await gdprService.createGDPRRequest(request);

      expect(result).toMatchObject({
        userId: 'user-123',
        type: 'access', // This should be mapped from requestType
        status: 'pending',
        requestData: { reason: 'data access' },
      });
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });
  });

  describe('processAccessRequest', () => {
    it('should process access request successfully', async () => {
      // Mock user data
      const mockLimit = jest.fn().mockResolvedValue([{
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User'
      }]);
      const mockWhere = jest.fn().mockReturnValue({ limit: mockLimit });
      const mockFrom = jest.fn().mockReturnValue({ where: mockWhere });
      
      mockDb.select.mockReturnValue({ from: mockFrom });

      const result = await gdprService.processAccessRequest('org-123', 'user-123');

      expect(result).toBeDefined();
      expect(result.userId).toBe('user-123');
      expect(result.organizationId).toBe('org-123');
      expect(result.personalData).toBeDefined();
      expect(result.processingActivities).toBeDefined();
    });

    it('should throw error for non-existent user', async () => {
      // Mock empty result
      const mockLimit = jest.fn().mockResolvedValue([]);
      const mockWhere = jest.fn().mockReturnValue({ limit: mockLimit });
      const mockFrom = jest.fn().mockReturnValue({ where: mockWhere });
      
      mockDb.select.mockReturnValue({ from: mockFrom });

      await expect(gdprService.processAccessRequest('org-123', 'invalid'))
        .rejects.toThrow('User not found');
    });
  });

  describe('processErasureRequest', () => {
    it('should process erasure request successfully', async () => {
      // Mock user data
      const mockLimit = jest.fn().mockResolvedValue([{
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User'
      }]);
      const mockWhere = jest.fn().mockReturnValue({ limit: mockLimit });
      const mockFrom = jest.fn().mockReturnValue({ where: mockWhere });
      
      mockDb.select.mockReturnValue({ from: mockFrom });

      // Mock the deletion eligibility check to return true
      jest.spyOn(gdprService as any, 'checkDeletionEligibility').mockResolvedValue(true);
      // Mock the data erasure to succeed
      jest.spyOn(gdprService as any, 'performDataErasure').mockResolvedValue(undefined);

      const result = await gdprService.processErasureRequest('org-123', 'user-123');

      expect(result).toBe(true);
    });
  });

  describe('generateComplianceReport', () => {
    it('should generate compliance report', async () => {
      const result = await gdprService.generateComplianceReport('org-123');

      expect(result).toBeDefined();
      expect(result.organizationId).toBe('org-123');
      expect(result.reportDate).toBeInstanceOf(Date);
      expect(result.totalRequests).toBeGreaterThan(0);
      expect(result.requestsByType).toBeDefined();
      expect(result.requestsByStatus).toBeDefined();
      expect(result.complianceScore).toBeGreaterThanOrEqual(0);
      expect(result.recommendations).toBeInstanceOf(Array);
    });
  });
});
