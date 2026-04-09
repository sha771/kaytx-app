import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { gdprService } from '../../../services/gdpr-service';
import { db as pgDb } from '../../../db/connection';
import { logAudit } from '../../../lib/audit';

// Mock dependencies
jest.mock('../../../db/connection');
jest.mock('../../../lib/audit');
jest.mock('fs');

const mockDb = pgDb as jest.Mocked<typeof pgDb>;
const mockLogAudit = logAudit as jest.MockedFunction<typeof logAudit>;

describe('GDPR Service', () => {
  const mockOrganizationId = 'org-123';
  const mockUserId = 'user-123';
  const mockRequestId = 'request-123';

  beforeEach(() => {
    jest.clearAllMocks();
    
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
        returning: jest.fn().mockResolvedValue([{ id: mockRequestId }])
      })
    });

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ id: mockUserId }])
        })
      })
    });

    mockDb.delete = jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: mockUserId }])
      })
    });
  });

  describe('createGDPRRequest', () => {
    it('should create a GDPR access request successfully', async () => {
      const requestType = 'access';
      const requestData = {
        email: 'test@example.com',
        phoneNumber: '+1234567890',
        description: 'Access request for personal data'
      };

      const result = await gdprService.createGDPRRequest(
        mockOrganizationId,
        mockUserId,
        requestType,
        requestData
      );

      expect(result.success).toBe(true);
      expect(result.data?.requestId).toBe(mockRequestId);
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'GDPR_REQUEST_CREATED',
          resource: 'gdpr_request',
          status: 'success'
        })
      );
    });

    it('should validate request type', async () => {
      const invalidRequestType = 'invalid' as any;
      const requestData = { email: 'test@example.com' };

      await expect(
        gdprService.createGDPRRequest(mockOrganizationId, mockUserId, invalidRequestType, requestData)
      ).rejects.toThrow('Invalid request type');

      expect(mockDb.insert).not.toHaveBeenCalled();
    });

    it('should require email for access requests', async () => {
      const requestData = { phoneNumber: '+1234567890' };

      await expect(
        gdprService.createGDPRRequest(mockOrganizationId, mockUserId, 'access', requestData)
      ).rejects.toThrow('Email is required for access requests');
    });

    it('should handle database errors gracefully', async () => {
      mockDb.insert = jest.fn().mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockRejectedValue(new Error('Database error'))
        })
      });

      const requestData = { email: 'test@example.com' };

      await expect(
        gdprService.createGDPRRequest(mockOrganizationId, mockUserId, 'access', requestData)
      ).rejects.toThrow('Database error');
    });
  });

  describe('processAccessRequest', () => {
    it('should process access request and collect user data', async () => {
      const mockUserData = [
        { id: mockUserId, email: 'test@example.com', firstName: 'John', lastName: 'Doe' },
        { id: 'order-1', userId: mockUserId, total: 100.00, items: [] }
      ];

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            or: jest.fn().mockReturnValue([])
          })
        })
      });

      // Mock collectAllPersonalData to return test data
      jest.spyOn(gdprService as any, 'collectAllPersonalData').mockResolvedValue(mockUserData);

      const result = await gdprService.processAccessRequest(mockRequestId);

      expect(result.success).toBe(true);
      expect(result.data?.personalData).toEqual(mockUserData);
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'GDPR_ACCESS_REQUEST',
          status: 'success'
        })
      );
    });

    it('should handle requests not found', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      });

      await expect(gdprService.processAccessRequest(mockRequestId)).rejects.toThrow('GDPR request not found');
    });
  });

  describe('processErasureRequest', () => {
    it('should process erasure request and delete user data', async () => {
      const mockUserData = [
        { table: 'users', id: mockUserId, data: { email: 'test@example.com' } },
        { table: 'orders', id: 'order-1', data: { userId: mockUserId } }
      ];

      jest.spyOn(gdprService as any, 'collectAllPersonalData').mockResolvedValue(mockUserData);
      jest.spyOn(gdprService as any, 'performDataErasure').mockResolvedValue(true);

      const result = await gdprService.processErasureRequest(mockRequestId);

      expect(result.success).toBe(true);
      expect(result.data?.deletedRecords).toBeGreaterThan(0);
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'GDPR_ERASURE_REQUEST',
          status: 'success'
        })
      );
    });

    it('should handle erasure failures gracefully', async () => {
      jest.spyOn(gdprService as any, 'collectAllPersonalData').mockResolvedValue([]);
      jest.spyOn(gdprService as any, 'performDataErasure').mockResolvedValue(false);

      const result = await gdprService.processErasureRequest(mockRequestId);

      expect(result.success).toBe(false);
      expect(result.error).toContain('No data to erase');
    });
  });

  describe('processDataPortabilityRequest', () => {
    it('should generate portable data format', async () => {
      const mockUserData = [
        { table: 'users', data: { email: 'test@example.com', firstName: 'John' } },
        { table: 'orders', data: [{ id: 'order-1', total: 100.00 }] }
      ];

      jest.spyOn(gdprService as any, 'collectAllPersonalData').mockResolvedValue(mockUserData);

      const result = await gdprService.processDataPortabilityRequest(mockRequestId);

      expect(result.success).toBe(true);
      expect(result.data?.portableData).toBeDefined();
      expect(result.data?.format).toBe('json');
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'GDPR_PORTABILITY_REQUEST',
          status: 'success'
        })
      );
    });

    it('should generate CSV format when requested', async () => {
      const mockUserData = [
        { table: 'users', data: { email: 'test@example.com', firstName: 'John' } }
      ];

      jest.spyOn(gdprService as any, 'collectAllPersonalData').mockResolvedValue(mockUserData);

      const result = await gdprService.processDataPortabilityRequest(mockRequestId, 'csv');

      expect(result.success).toBe(true);
      expect(result.data?.format).toBe('csv');
      expect(result.data?.portableData).toContain('email,firstName');
    });
  });

  describe('checkConsent', () => {
    it('should check user consent status', async () => {
      const mockConsent = {
        marketing: true,
        analytics: false,
        cookies: true,
        timestamp: new Date().toISOString()
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockConsent])
          })
        })
      });

      const result = await gdprService.checkConsent(mockUserId, 'marketing');

      expect(result.success).toBe(true);
      expect(result.data?.hasConsent).toBe(true);
      expect(result.data?.timestamp).toBeDefined();
    });

    it('should return false for non-existent consent', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      });

      const result = await gdprService.checkConsent(mockUserId, 'marketing');

      expect(result.success).toBe(true);
      expect(result.data?.hasConsent).toBe(false);
    });
  });

  describe('recordConsent', () => {
    it('should record user consent', async () => {
      const consentData = {
        marketing: true,
        analytics: true,
        cookies: false
      };

      const result = await gdprService.recordConsent(mockUserId, consentData);

      expect(result.success).toBe(true);
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'CONSENT_GRANTED',
          status: 'success'
        })
      );
    });

    it('should update existing consent', async () => {
      const consentData = { marketing: false };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{ id: 'consent-1' }])
          })
        })
      });

      const result = await gdprService.recordConsent(mockUserId, consentData);

      expect(result.success).toBe(true);
      expect(mockDb.update).toHaveBeenCalled();
    });
  });

  describe('withdrawConsent', () => {
    it('should withdraw user consent', async () => {
      const result = await gdprService.withdrawConsent(mockUserId, 'marketing');

      expect(result.success).toBe(true);
      expect(mockDb.update).toHaveBeenCalled();
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'CONSENT_WITHDRAWN',
          status: 'success'
        })
      );
    });
  });

  describe('generateComplianceReport', () => {
    it('should generate compliance report', async () => {
      const mockReportData = {
        totalRequests: 10,
        pendingRequests: 2,
        completedRequests: 8,
        averageProcessingTime: 48,
        consentRecords: 150,
        dataRetentionCompliance: 95
      };

      jest.spyOn(gdprService as any, 'generateComplianceMetrics').mockResolvedValue(mockReportData);

      const result = await gdprService.generateComplianceReport(mockOrganizationId);

      expect(result.success).toBe(true);
      expect(result.data?.report).toBeDefined();
      expect(result.data?.metrics).toEqual(mockReportData);
    });
  });

  describe('Data retention', () => {
    it('should check data retention eligibility', async () => {
      const mockUser = {
        id: mockUserId,
        lastLoginAt: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000), // 400 days ago
        hasActiveOrders: false,
        hasLegalHold: false
      };

      jest.spyOn(gdprService as any, 'checkDeletionEligibility').mockResolvedValue(true);

      const result = await gdprService.checkDataRetention(mockUserId);

      expect(result.success).toBe(true);
      expect(result.data?.eligibleForDeletion).toBe(true);
    });
  });

  describe('Error handling', () => {
    it('should handle malformed request data', async () => {
      const invalidData = { email: 'invalid-email' };

      await expect(
        gdprService.createGDPRRequest(mockOrganizationId, mockUserId, 'access', invalidData)
      ).rejects.toThrow();
    });

    it('should handle database connection errors', async () => {
      mockDb.select = jest.fn().mockImplementation(() => {
        throw new Error('Connection failed');
      });

      await expect(gdprService.checkConsent(mockUserId, 'marketing')).rejects.toThrow('Connection failed');
    });
  });

  describe('Validation', () => {
    it('should validate organization ID format', async () => {
      const invalidOrgId = 'invalid-org-id';

      await expect(
        gdprService.createGDPRRequest(invalidOrgId, mockUserId, 'access', { email: 'test@example.com' })
      ).rejects.toThrow('Invalid organization ID');
    });

    it('should validate user ID format', async () => {
      const invalidUserId = 'invalid-user-id';

      await expect(
        gdprService.createGDPRRequest(mockOrganizationId, invalidUserId, 'access', { email: 'test@example.com' })
      ).rejects.toThrow('Invalid user ID');
    });
  });
});
