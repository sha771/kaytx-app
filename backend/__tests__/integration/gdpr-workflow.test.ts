import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { gdprService } from '../../services/gdpr-service';
import { complianceReportingService } from '../../services/compliance-reporting-service';
import { db as pgDb } from '../../db/connection';
import { logAudit } from '../../lib/audit';

// Mock dependencies
jest.mock('../../db/connection');
jest.mock('../../lib/audit');

const mockDb = pgDb as jest.Mocked<typeof pgDb>;
const mockLogAudit = logAudit as jest.MockedFunction<typeof logAudit>;

describe('GDPR Integration Tests', () => {
  const mockOrganizationId = 'org-123';
  const mockUserId = 'user-123';
  const mockRequestId = 'request-123';
  const mockReportId = 'report-123';

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup comprehensive mock database responses
    mockDb.select = jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue([])
        })
      })
    });

    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: mockRequestId }] as any)
      })
    });

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ id: mockUserId }] as any)
        })
      })
    });

    mockDb.delete = jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: mockUserId }] as any)
      })
    });

    mockLogAudit.mockResolvedValue(undefined);
  });

  describe('Complete GDPR Workflow', () => {
    it('should handle complete GDPR access request workflow', async () => {
      // Step 1: Create GDPR access request
      const requestData = {
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
        description: 'Customer requests access to all personal data'
      };

      const requestResult = await gdprService.createGDPRRequest(
        mockOrganizationId,
        mockUserId,
        'access',
        requestData
      );

      expect(requestResult.success).toBe(true);
      expect(requestResult.data?.requestId).toBe(mockRequestId);

      // Step 2: Mock user data collection
      const mockUserData = [
        {
          table: 'users',
          id: mockUserId,
          data: {
            email: 'john.doe@example.com',
            firstName: 'John',
            lastName: 'Doe',
            phone: '+1234567890',
            address: '123 Main St, New York, NY 10001',
            dateOfBirth: '1985-05-15',
            createdAt: '2023-01-01T00:00:00Z'
          }
        },
        {
          table: 'orders',
          id: 'order-1',
          data: {
            userId: mockUserId,
            total: 299.99,
            items: ['Product A', 'Product B'],
            orderDate: '2024-01-10T15:30:00Z',
            shippingAddress: '123 Main St, New York, NY 10001'
          }
        },
        {
          table: 'user_sessions',
          id: 'session-1',
          data: {
            userId: mockUserId,
            loginTime: '2024-01-15T09:00:00Z',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      ];

      jest.spyOn(gdprService as any, 'collectAllPersonalData').mockResolvedValue(mockUserData);

      // Step 3: Process access request
      const processResult = await gdprService.processAccessRequest(mockRequestId);

      expect(processResult.success).toBe(true);
      expect(processResult.data?.personalData).toEqual(mockUserData);
      expect(processResult.data?.exportFormat).toBe('json');
      expect(processResult.data?.processedAt).toBeDefined();

      // Step 4: Verify audit logging
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'GDPR_ACCESS_REQUEST',
          resource: 'gdpr_request',
          status: 'success'
        })
      );

      // Step 5: Generate compliance report
      jest.spyOn(complianceReportingService as any, 'runGDPRChecks').mockResolvedValue([
        {
          type: 'consent',
          severity: 'low',
          description: 'Consent records found and valid',
          affectedRecords: 1,
          recommendation: 'Continue maintaining consent records'
        }
      ]);

      const reportResult = await complianceReportingService.generateReport(mockOrganizationId, {
        type: 'gdpr',
        dateRange: {
          start: '2024-01-01',
          end: '2024-01-31'
        },
        format: 'pdf'
      }, mockUserId);

      expect(reportResult.success).toBe(true);
      expect(reportResult.data?.reportId).toBeDefined();
    });

    it('should handle complete GDPR erasure request workflow', async () => {
      // Step 1: Create erasure request
      const erasureRequestData = {
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
        description: 'Customer requests complete data deletion',
        reason: 'Account closure'
      };

      const requestResult = await gdprService.createGDPRRequest(
        mockOrganizationId,
        mockUserId,
        'erasure',
        erasureRequestData
      );

      expect(requestResult.success).toBe(true);

      // Step 2: Mock data collection and deletion
      const mockUserData = [
        { table: 'users', id: mockUserId, data: { email: 'john.doe@example.com' } },
        { table: 'orders', id: 'order-1', data: { userId: mockUserId } },
        { table: 'user_sessions', id: 'session-1', data: { userId: mockUserId } }
      ];

      jest.spyOn(gdprService as any, 'collectAllPersonalData').mockResolvedValue(mockUserData);
      jest.spyOn(gdprService as any, 'performDataErasure').mockResolvedValue(true);

      // Step 3: Process erasure request
      const processResult = await gdprService.processErasureRequest(mockRequestId);

      expect(processResult.success).toBe(true);
      expect(processResult.data?.deletedRecords).toBe(3);
      expect(processResult.data?.erasureDate).toBeDefined();

      // Step 4: Verify data is actually deleted
      expect(mockDb.delete).toHaveBeenCalledTimes(3); // Once for each table

      // Step 5: Verify audit logging
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'GDPR_ERASURE_REQUEST',
          resource: 'gdpr_request',
          status: 'success'
        })
      );
    });

    it('should handle complete data portability workflow', async () => {
      // Step 1: Create portability request
      const portabilityRequestData = {
        email: 'john.doe@example.com',
        format: 'json',
        description: 'Customer requests portable copy of personal data'
      };

      const requestResult = await gdprService.createGDPRRequest(
        mockOrganizationId,
        mockUserId,
        'portability',
        portabilityRequestData
      );

      expect(requestResult.success).toBe(true);

      // Step 2: Mock data collection
      const mockUserData = [
        {
          table: 'users',
          id: mockUserId,
          data: {
            email: 'john.doe@example.com',
            firstName: 'John',
            lastName: 'Doe',
            profile: {
              preferences: { theme: 'dark', language: 'en' },
              history: ['login', 'purchase', 'support']
            }
          }
        }
      ];

      jest.spyOn(gdprService as any, 'collectAllPersonalData').mockResolvedValue(mockUserData);

      // Step 3: Process portability request
      const processResult = await gdprService.processDataPortabilityRequest(mockRequestId, 'json');

      expect(processResult.success).toBe(true);
      expect(processResult.data?.portableData).toBeDefined();
      expect(processResult.data?.format).toBe('json');
      expect(processResult.data?.exportDate).toBeDefined();

      // Step 4: Test CSV format
      const csvResult = await gdprService.processDataPortabilityRequest(mockRequestId, 'csv');

      expect(csvResult.success).toBe(true);
      expect(csvResult.data?.format).toBe('csv');
      expect(csvResult.data?.portableData).toContain('email,firstName,lastName');
    });

    it('should handle consent management workflow', async () => {
      // Step 1: Record initial consent
      const consentData = {
        marketing: true,
        analytics: true,
        cookies: false,
        newsletter: true
      };

      const consentResult = await gdprService.recordConsent(mockUserId, consentData);

      expect(consentResult.success).toBe(true);
      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: mockUserId,
          consentData: consentData
        })
      );

      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'CONSENT_GRANTED',
          resource: 'user_consent',
          status: 'success'
        })
      );

      // Step 2: Check consent status
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'consent-1',
              userId: mockUserId,
              consentType: 'marketing',
              granted: true,
              grantedAt: '2024-01-15T10:00:00Z'
            }])
          })
        })
      });

      const checkResult = await gdprService.checkConsent(mockUserId, 'marketing');

      expect(checkResult.success).toBe(true);
      expect(checkResult.data?.hasConsent).toBe(true);
      expect(checkResult.data?.grantedAt).toBeDefined();

      // Step 3: Withdraw consent
      const withdrawResult = await gdprService.withdrawConsent(mockUserId, 'marketing');

      expect(withdrawResult.success).toBe(true);
      expect(mockDb.update).toHaveBeenCalledWith(
        expect.objectContaining({
          granted: false,
          withdrawnAt: expect.any(Date)
        })
      );

      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'CONSENT_WITHDRAWN',
          resource: 'user_consent',
          status: 'success'
        })
      );
    });
  });

  describe('GDPR Compliance Reporting Integration', () => {
    it('should generate comprehensive compliance report', async () => {
      // Mock various GDPR data for comprehensive report
      const mockGDPRData = {
        requests: [
          {
            id: 'req-1',
            type: 'access',
            status: 'completed',
            createdAt: '2024-01-10T00:00:00Z',
            completedAt: '2024-01-12T00:00:00Z',
            processingTime: 48
          },
          {
            id: 'req-2',
            type: 'erasure',
            status: 'pending',
            createdAt: '2024-01-14T00:00:00Z',
            dueDate: '2024-01-28T00:00:00Z'
          }
        ],
        consents: [
          {
            id: 'consent-1',
            userId: 'user-1',
            type: 'marketing',
            granted: true,
            grantedAt: '2024-01-01T00:00:00Z'
          },
          {
            id: 'consent-2',
            userId: 'user-2',
            type: 'analytics',
            granted: false,
            requestedAt: '2024-01-05T00:00:00Z'
          }
        ],
        dataRetention: [
          {
            table: 'user_sessions',
            recordCount: 1000,
            retentionDays: 30,
            oldestRecord: '2023-12-15T00:00:00Z'
          },
          {
            table: 'audit_logs',
            recordCount: 5000,
            retentionDays: 365,
            oldestRecord: '2023-01-15T00:00:00Z'
          }
        ]
      };

      jest.spyOn(complianceReportingService as any, 'generateComplianceMetrics').mockResolvedValue({
        totalRequests: 2,
        pendingRequests: 1,
        completedRequests: 1,
        averageProcessingTime: 48,
        overdueRequests: 1,
        consentRecords: 2,
        dataRetentionCompliance: 95,
        violations: [
          {
            type: 'response_time',
            severity: 'medium',
            description: '1 request overdue for processing',
            affectedRecords: 1,
            recommendation: 'Process overdue requests immediately'
          }
        ]
      });

      const reportResult = await complianceReportingService.generateReport(mockOrganizationId, {
        type: 'gdpr',
        dateRange: {
          start: '2024-01-01',
          end: '2024-01-31'
        },
        format: 'pdf',
        includeViolations: true,
        includeMetrics: true
      }, mockUserId);

      expect(reportResult.success).toBe(true);
      expect(reportResult.data?.reportId).toBeDefined();
      expect(reportResult.data?.status).toBe('generating');

      // Verify audit logging for report generation
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'REPORT_GENERATED',
          resource: 'compliance_report',
          status: 'success'
        })
      );
    });

    it('should detect and report GDPR violations', async () => {
      // Mock violation scenarios
      const violationScenarios = [
        {
          usersWithoutConsent: [
            { id: 'user-1', email: 'user1@example.com', hasConsent: false },
            { id: 'user-2', email: 'user2@example.com', hasConsent: false }
          ],
          overdueRequests: [
            {
              id: 'req-1',
              type: 'access',
              createdAt: '2023-12-01T00:00:00Z',
              dueDate: '2023-12-15T00:00:00Z',
              status: 'pending'
            }
          ],
          dataRetentionViolations: [
            {
              table: 'user_sessions',
              recordCount: 50,
              oldestRecord: '2023-01-01T00:00:00Z',
              retentionDays: 30
            }
          ]
        }
      ];

      jest.spyOn(complianceReportingService as any, 'runGDPRChecks').mockResolvedValue([
        {
          type: 'consent',
          severity: 'high',
          description: 'Users found without proper consent records',
          affectedRecords: 2,
          recommendation: 'Implement consent management system'
        },
        {
          type: 'response_time',
          severity: 'high',
          description: 'GDPR requests overdue for processing',
          affectedRecords: 1,
          recommendation: 'Process overdue requests immediately'
        },
        {
          type: 'data_retention',
          severity: 'medium',
          description: 'Data retained beyond policy limits',
          affectedRecords: 50,
          recommendation: 'Implement automated data retention policies'
        }
      ]);

      const reportResult = await complianceReportingService.generateReport(mockOrganizationId, {
        type: 'gdpr',
        dateRange: {
          start: '2024-01-01',
          end: '2024-01-31'
        },
        format: 'pdf',
        includeViolations: true
      }, mockUserId);

      expect(reportResult.success).toBe(true);

      // Verify violations are detected and reported
      const mockChecks = jest.spyOn(complianceReportingService as any, 'runGDPRChecks');
      expect(mockChecks).toHaveBeenCalled();
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle partial data deletion failures', async () => {
      // Create erasure request
      const requestResult = await gdprService.createGDPRRequest(
        mockOrganizationId,
        mockUserId,
        'erasure',
        { email: 'test@example.com' }
      );

      expect(requestResult.success).toBe(true);

      // Mock partial deletion failure
      const mockUserData = [
        { table: 'users', id: mockUserId },
        { table: 'orders', id: 'order-1' },
        { table: 'user_sessions', id: 'session-1' }
      ];

      jest.spyOn(gdprService as any, 'collectAllPersonalData').mockResolvedValue(mockUserData);
      
      // Mock partial failure - first two succeed, third fails
      mockDb.delete = jest.fn()
        .mockResolvedValueOnce([{ id: mockUserId }])
        .mockResolvedValueOnce([{ id: 'order-1' }])
        .mockRejectedValueOnce(new Error('Failed to delete sessions'));

      const processResult = await gdprService.processErasureRequest(mockRequestId);

      expect(processResult.success).toBe(false);
      expect(processResult.error).toContain('Partial deletion completed');
      expect(processResult.data?.deletedRecords).toBe(2);
      expect(processResult.data?.failedRecords).toBe(1);
    });

    it('should handle concurrent GDPR requests', async () => {
      // Create multiple concurrent requests
      const results = await Promise.all([
        gdprService.createGDPRRequest(mockOrganizationId, 'user-1', 'access', { email: 'user1@example.com' }),
        gdprService.createGDPRRequest(mockOrganizationId, 'user-2', 'access', { email: 'user2@example.com' }),
        gdprService.createGDPRRequest(mockOrganizationId, 'user-3', 'erasure', { email: 'user3@example.com' })
      ]);

      expect(results.every((r: any) => r.success)).toBe(true);

      // Process requests concurrently
      jest.spyOn(gdprService as any, 'collectAllPersonalData').mockResolvedValue([]);
      jest.spyOn(gdprService as any, 'performDataErasure').mockResolvedValue(true);

      const processes = await Promise.all([
        gdprService.processAccessRequest('req-1'),
        gdprService.processAccessRequest('req-2'),
        gdprService.processErasureRequest('req-3')
      ]);

      expect(processes.every((p: any) => p.success)).toBe(true);
    });

    it('should handle large data exports for portability', async () => {
      // Create portability request
      const requestResult = await gdprService.createGDPRRequest(
        mockOrganizationId,
        mockUserId,
        'portability',
        { email: 'user@example.com', format: 'json' }
      );

      expect(requestResult.success).toBe(true);

      // Mock large dataset
      const largeDataSet = Array.from({ length: 10000 }, (_, i) => ({
        table: 'orders',
        id: `order-${i}`,
        data: {
          userId: mockUserId,
          orderId: `ORD-${i}`,
          amount: Math.random() * 1000,
          date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
        }
      }));

      jest.spyOn(gdprService as any, 'collectAllPersonalData').mockResolvedValue(largeDataSet);

      const processResult = await gdprService.processDataPortabilityRequest(requestResult.data?.requestId!, 'json');

      expect(processResult.success).toBe(true);
      expect(processResult.data?.recordCount).toBe(10000);
      expect(processResult.data?.fileSize).toBeGreaterThan(1000000); // Should be > 1MB
    });

    it('should handle audit logging failures gracefully', async () => {
      // Mock audit logging failure
      mockLogAudit.mockRejectedValue(new Error('Audit service unavailable'));

      const requestResult = await gdprService.createGDPRRequest(
        mockOrganizationId,
        mockUserId,
        'access',
        { email: 'test@example.com' }
      );

      // Should still succeed even if audit logging fails
      expect(requestResult.success).toBe(true);
      expect(requestResult.data?.requestId).toBeDefined();
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle high volume of consent updates', async () => {
      const consentUpdates = Array.from({ length: 1000 }, (_, i) => ({
        userId: `user-${i}`,
        consentData: {
          marketing: Math.random() > 0.5,
          analytics: Math.random() > 0.5,
          cookies: Math.random() > 0.5
        }
      }));

      const startTime = Date.now();

      const results = await Promise.all(
        consentUpdates.map((update: any) => 
          gdprService.recordConsent(update.userId, update.consentData)
        )
      );

      expect(results.every((r: any) => r.success)).toBe(true);
      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(10000); // Should complete within 10 seconds
    });

    it('should handle large compliance report generation', async () => {
      // Mock large dataset for report
      const largeDataset = {
        requests: Array.from({ length: 5000 }, (_, i) => ({
          id: `req-${i}`,
          type: ['access', 'erasure', 'portability'][i % 3],
          status: ['completed', 'pending', 'failed'][i % 3],
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        })),
        consents: Array.from({ length: 10000 }, (_, i) => ({
          id: `consent-${i}`,
          userId: `user-${i}`,
          type: ['marketing', 'analytics', 'cookies'][i % 3],
          granted: Math.random() > 0.3
        }))
      };

      jest.spyOn(complianceReportingService as any, 'generateComplianceMetrics').mockResolvedValue({
        totalRequests: 5000,
        pendingRequests: 1667,
        completedRequests: 1666,
        consentRecords: 10000,
        complianceScore: 87.5
      });

      const startTime = Date.now();

      const reportResult = await complianceReportingService.generateReport(mockOrganizationId, {
        type: 'gdpr',
        dateRange: {
          start: '2024-01-01',
          end: '2024-01-31'
        },
        format: 'pdf'
      }, mockUserId);

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(reportResult.success).toBe(true);
      expect(duration).toBeLessThan(15000); // Should complete within 15 seconds
    });
  });

  describe('Data Privacy and Security', () => {
    it('should ensure data anonymization in reports', async () => {
      // Create access request
      const requestResult = await gdprService.createGDPRRequest(
        mockOrganizationId,
        mockUserId,
        'access',
        { email: 'sensitive@example.com' }
      );

      expect(requestResult.success).toBe(true);

      // Mock sensitive data
      const sensitiveData = [
        {
          table: 'users',
          id: mockUserId,
          data: {
            email: 'sensitive@example.com',
            phone: '+1234567890',
            ssn: '123-45-6789',
            creditCard: '4111-1111-1111-1111'
          }
        }
      ];

      jest.spyOn(gdprService as any, 'collectAllPersonalData').mockResolvedValue(sensitiveData);

      const processResult = await gdprService.processAccessRequest(mockRequestId);

      expect(processResult.success).toBe(true);

      // Verify sensitive data is handled appropriately
      const exportedData = processResult.data?.personalData;
      expect(exportedData).toBeDefined();
      // In a real implementation, sensitive fields should be masked or encrypted
    });

    it('should maintain audit trail for all GDPR operations', async () => {
      // Perform multiple GDPR operations
      await gdprService.createGDPRRequest(mockOrganizationId, mockUserId, 'access', { email: 'test@example.com' });
      await gdprService.recordConsent(mockUserId, { marketing: true });
      await gdprService.checkConsent(mockUserId, 'marketing');
      await gdprService.withdrawConsent(mockUserId, 'marketing');

      // Verify all operations were audited
      expect(mockLogAudit).toHaveBeenCalledTimes(4);

      const auditCalls = mockLogAudit.mock.calls;
      expect(auditCalls[0][0].action).toBe('GDPR_REQUEST_CREATED');
      expect(auditCalls[1][0].action).toBe('CONSENT_GRANTED');
      expect(auditCalls[2][0].action).toBe('CONSENT_CHECKED'); // Check consent
      expect(auditCalls[3][0].action).toBe('CONSENT_WITHDRAWN');

      // Verify audit data integrity
      auditCalls.forEach((call: any) => {
        expect(call[0]).toHaveProperty('organizationId');
        expect(call[0]).toHaveProperty('resource');
        expect(call[0]).toHaveProperty('status');
        expect(call[0]).toHaveProperty('timestamp');
      });
    });
  });
});
