/**
 * Comprehensive Unit Tests for Consolidated Audit Service
 * Tests all functionality including audit logging, integrity verification, and batch processing
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { ConsolidatedAuditService } from '../../../services/consolidated-audit-service';
import { db } from '../../../db/connection';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import crypto from 'crypto';

// Mock dependencies
jest.mock('../../../db/connection');
jest.mock('../../../lib/audit');

describe('ConsolidatedAuditService', () => {
  let auditService: ConsolidatedAuditService;
  let mockDb: any;
  let originalCreateHash: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Store original crypto.createHash
    originalCreateHash = crypto.createHash;
    
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
    auditService = new ConsolidatedAuditService();
  });

  afterEach(async () => {
    await auditService.cleanup();
    // Restore crypto.createHash to prevent Jest caching issues
    crypto.createHash = originalCreateHash;
  });

  describe('Audit Log Creation', () => {
    it('should create audit log successfully', async () => {
      const auditData = {
        organizationId: 'org-123',
        userId: 'user-123',
        action: 'user.login',
        resource: 'authentication',
        resourceId: 'user-123',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0...',
        metadata: { sessionId: 'session-123' },
        severity: 'info' as const,
        status: 'success' as const
      };

      const mockAuditLog = {
        id: 'audit-123',
        ...auditData,
        timestamp: new Date(),
        hash: 'generated-hash',
        previousHash: null
      };

      mockDb.execute.mockResolvedValue({ insertId: 'audit-123' });
      mockDb.select.mockReturnValue([mockAuditLog]);

      const result = await auditService.createAuditLog(auditData);

      expect(result).toBeDefined();
      expect(result.action).toBe(auditData.action);
      expect(result.hash).toBeDefined();
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.values).toHaveBeenCalledWith(
        expect.objectContaining({
          organizationId: auditData.organizationId,
          action: auditData.action,
          resource: auditData.resource
        })
      );
    });

    it('should maintain hash chain integrity', async () => {
      const auditData1 = {
        organizationId: 'org-123',
        userId: 'user-123',
        action: 'user.login',
        resource: 'authentication',
        severity: 'info' as const,
        status: 'success' as const
      };

      const auditData2 = {
        organizationId: 'org-123',
        userId: 'user-123',
        action: 'user.logout',
        resource: 'authentication',
        severity: 'info' as const,
        status: 'success' as const
      };

      // Mock first audit log
      const mockAuditLog1 = {
        id: 'audit-1',
        ...auditData1,
        timestamp: new Date(),
        hash: 'hash1',
        previousHash: null
      };

      // Mock second audit log with previous hash
      const mockAuditLog2 = {
        id: 'audit-2',
        ...auditData2,
        timestamp: new Date(),
        hash: 'hash2',
        previousHash: 'hash1'
      };

      mockDb.select.mockReturnValue([mockAuditLog1]).mockReturnValueOnce([mockAuditLog1]);
      mockDb.execute.mockResolvedValue({ insertId: 'audit-2' });
      mockDb.select.mockReturnValue([mockAuditLog2]);

      const result1 = await auditService.createAuditLog(auditData1);
      const result2 = await auditService.createAuditLog(auditData2);

      expect(result1.previousHash).toBeNull();
      expect(result2.previousHash).toBe(result1.hash);
    });

    it('should handle high-priority security events', async () => {
      const securityEventData = {
        organizationId: 'org-123',
        userId: 'user-123',
        action: 'security.breached',
        resource: 'authentication',
        severity: 'critical' as const,
        status: 'failure' as const,
        metadata: { threatLevel: 'high' }
      };

      const mockAuditLog = {
        id: 'audit-critical',
        ...securityEventData,
        timestamp: new Date(),
        hash: 'critical-hash'
      };

      mockDb.execute.mockResolvedValue({ insertId: 'audit-critical' });
      mockDb.select.mockReturnValue([mockAuditLog]);

      const result = await auditService.createAuditLog(securityEventData);

      expect(result.severity).toBe('critical');
      expect(result.action).toBe('security.breached');
    });
  });

  describe('Audit Log Retrieval', () => {
    it('should retrieve audit logs by organization', async () => {
      const mockAuditLogs = [
        { id: '1', action: 'user.login', timestamp: new Date() },
        { id: '2', action: 'user.logout', timestamp: new Date() }
      ];

      mockDb.select.mockReturnValue(mockAuditLogs);

      const result = await auditService.getAuditLogs({
        organizationId: 'org-123',
        limit: 10,
        offset: 0
      });

      expect(result).toHaveLength(2);
      expect(mockDb.where).toHaveBeenCalledWith(
        expect.objectContaining({
          organizationId: 'org-123'
        })
      );
    });

    it('should filter audit logs by multiple criteria', async () => {
      const filters = {
        organizationId: 'org-123',
        userId: 'user-123',
        action: 'user.login',
        severity: 'info',
        status: 'success',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31')
      };

      const mockAuditLogs = [
        { id: '1', ...filters, timestamp: new Date('2024-01-15') }
      ];

      mockDb.select.mockReturnValue(mockAuditLogs);

      const result = await auditService.getAuditLogs(filters);

      expect(result).toHaveLength(1);
      expect(mockDb.where).toHaveBeenCalled();
    });

    it('should paginate results correctly', async () => {
      const mockAuditLogs = Array(50).fill(null).map((_, index) => ({
        id: `audit-${index}`,
        action: 'test.action',
        timestamp: new Date()
      }));

      mockDb.select.mockReturnValue(mockAuditLogs);

      const result = await auditService.getAuditLogs({
        organizationId: 'org-123',
        limit: 20,
        offset: 10
      });

      expect(result).toHaveLength(50);
      expect(mockDb.limit).toHaveBeenCalledWith(20);
      expect(mockDb.offset).toHaveBeenCalledWith(10);
    });
  });

  describe('Integrity Verification', () => {
    it('should verify audit log chain integrity', async () => {
      const mockAuditLogs = [
        {
          id: '1',
          hash: 'hash1',
          previousHash: null,
          data: 'log1'
        },
        {
          id: '2',
          hash: 'hash2',
          previousHash: 'hash1',
          data: 'log2'
        },
        {
          id: '3',
          hash: 'hash3',
          previousHash: 'hash2',
          data: 'log3'
        }
      ];

      mockDb.select.mockReturnValue(mockAuditLogs);

      const result = await auditService.verifyIntegrity('org-123');

      expect(result.isValid).toBe(true);
      expect(result.verifiedCount).toBe(3);
      expect(result.violations).toHaveLength(0);
    });

    it('should detect integrity violations', async () => {
      const mockAuditLogs = [
        {
          id: '1',
          hash: 'hash1',
          previousHash: null,
          data: 'log1'
        },
        {
          id: '2',
          hash: 'invalid-hash',
          previousHash: 'hash1',
          data: 'log2'
        },
        {
          id: '3',
          hash: 'hash3',
          previousHash: 'hash2',
          data: 'log3'
        }
      ];

      mockDb.select.mockReturnValue(mockAuditLogs);

      const result = await auditService.verifyIntegrity('org-123');

      expect(result.isValid).toBe(false);
      expect(result.violations.length).toBeGreaterThan(0);
    });

    it('should handle empty audit log sets', async () => {
      mockDb.select.mockReturnValue([]);

      const result = await auditService.verifyIntegrity('org-123');

      expect(result.isValid).toBe(true);
      expect(result.verifiedCount).toBe(0);
    });
  });

  describe('Batch Processing', () => {
    it('should process audit logs in batches', async () => {
      const batchData = [
        {
          organizationId: 'org-123',
          userId: 'user-1',
          action: 'action.1',
          resource: 'test',
          severity: 'info' as const,
          status: 'success' as const
        },
        {
          organizationId: 'org-123',
          userId: 'user-2',
          action: 'action.2',
          resource: 'test',
          severity: 'info' as const,
          status: 'success' as const
        }
      ];

      mockDb.execute.mockResolvedValue({});

      const result = await auditService.createBatchAuditLogs(batchData);

      expect(result.successCount).toBe(2);
      expect(result.failureCount).toBe(0);
      expect(mockDb.insert).toHaveBeenCalledTimes(2);
    });

    it('should handle partial batch failures', async () => {
      const batchData = [
        {
          organizationId: 'org-123',
          userId: 'user-1',
          action: 'action.1',
          resource: 'test',
          severity: 'info' as const,
          status: 'success' as const
        },
        {
          organizationId: 'org-123',
          userId: 'user-2',
          action: 'action.2',
          resource: 'test',
          severity: 'info' as const,
          status: 'success' as const
        }
      ];

      // First insert succeeds, second fails
      mockDb.execute
        .mockResolvedValueOnce({ insertId: 'audit-1' })
        .mockRejectedValueOnce(new Error('Database error'));

      const result = await auditService.createBatchAuditLogs(batchData);

      expect(result.successCount).toBe(1);
      expect(result.failureCount).toBe(1);
      expect(result.errors).toHaveLength(1);
    });
  });

  describe('Audit Analytics', () => {
    it('should generate audit statistics', async () => {
      const mockStats = [
        { action: 'user.login', count: 100 },
        { action: 'user.logout', count: 95 },
        { action: 'security.breached', count: 2 }
      ];

      mockDb.select.mockReturnValue(mockStats);

      const result = await auditService.getAuditStatistics('org-123', {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31')
      });

      expect(result.totalEvents).toBe(197);
      expect(result.byAction['user.login']).toBe(100);
      expect(result.securityEvents).toBe(2);
    });

    it('should detect suspicious activity patterns', async () => {
      const suspiciousLogs = [
        {
          userId: 'user-123',
          action: 'user.login',
          timestamp: new Date('2024-01-01T10:00:00Z'),
          ipAddress: '192.168.1.1'
        },
        {
          userId: 'user-123',
          action: 'user.login',
          timestamp: new Date('2024-01-01T10:01:00Z'),
          ipAddress: '192.168.1.2'
        },
        {
          userId: 'user-123',
          action: 'user.login',
          timestamp: new Date('2024-01-01T10:02:00Z'),
          ipAddress: '192.168.1.3'
        }
      ];

      mockDb.select.mockReturnValue(suspiciousLogs);

      const result = await auditService.detectSuspiciousActivity('org-123');

      expect(result.suspiciousPatterns.length).toBeGreaterThan(0);
      expect(result.riskLevel).toBe('high');
    });
  });

  describe('Audit Log Retention', () => {
    it('should cleanup old audit logs', async () => {
      const cutoffDate = new Date();
      cutoffDate.setDays(cutoffDate.getDate() - 90);

      mockDb.execute.mockResolvedValue({ deletedCount: 1000 });

      const result = await auditService.cleanupOldAuditLogs('org-123', 90);

      expect(result.deletedCount).toBe(1000);
      expect(mockDb.delete).toHaveBeenCalled();
      expect(mockDb.where).toHaveBeenCalledWith(
        expect.objectContaining({
          timestamp: expect.any(Object) // Less than cutoff date
        })
      );
    });

    it('should preserve critical security events', async () => {
      const criticalLogs = [
        { id: '1', severity: 'critical', action: 'security.breached' },
        { id: '2', severity: 'high', action: 'data.access' }
      ];

      mockDb.select.mockReturnValue(criticalLogs);
      mockDb.execute.mockResolvedValue({ deletedCount: 500 });

      const result = await auditService.cleanupOldAuditLogs('org-123', 90, {
        preserveCriticalEvents: true
      });

      expect(result.deletedCount).toBe(500);
      expect(result.preservedCount).toBe(2);
    });
  });

  describe('Error Handling', () => {
    it('should handle database connection errors', async () => {
      mockDb.select.mockImplementation(() => {
        throw new Error('Database connection failed');
      });

      await expect(auditService.getAuditLogs({ organizationId: 'org-123' }))
        .rejects.toThrow('Database connection failed');
    });

    it('should handle invalid audit data', async () => {
      const invalidAuditData = {
        organizationId: '', // invalid
        action: '', // invalid
        resource: null, // invalid
        severity: 'invalid' as any
      };

      await expect(auditService.createAuditLog(invalidAuditData))
        .rejects.toThrow();
    });

    it('should handle hash generation failures', async () => {
      // Mock crypto.createHash to throw an error
      const originalCreateHash = crypto.createHash;
      const mockCreateHash = jest.fn().mockImplementation(() => {
        throw new Error('Hash generation failed');
      });
      
      crypto.createHash = mockCreateHash;

      const auditData = {
        organizationId: 'org-123',
        userId: 'user-123',
        action: 'test.action',
        resource: 'test',
        severity: 'info' as const,
        status: 'success' as const
      };

      await expect(auditService.createAuditLog(auditData))
        .rejects.toThrow('Hash generation failed');

      // Restore original function
      crypto.createHash = originalCreateHash;
      jest.clearAllMocks();
    });
  });

  describe('Performance', () => {
    it('should handle high-volume audit logging', async () => {
      const highVolumeData = Array(1000).fill(null).map((_, index) => ({
        organizationId: 'org-123',
        userId: `user-${index}`,
        action: 'test.action',
        resource: 'test',
        severity: 'info' as const,
        status: 'success' as const
      }));

      mockDb.execute.mockResolvedValue({});

      const startTime = Date.now();
      const result = await auditService.createBatchAuditLogs(highVolumeData);
      const endTime = Date.now();

      expect(result.successCount).toBe(1000);
      expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds
    });

    it('should efficiently query large audit datasets', async () => {
      const largeAuditSet = Array(10000).fill(null).map((_, index) => ({
        id: `audit-${index}`,
        action: 'test.action',
        timestamp: new Date()
      }));

      mockDb.select.mockReturnValue(largeAuditSet);

      const startTime = Date.now();
      const result = await auditService.getAuditLogs({
        organizationId: 'org-123',
        limit: 100,
        offset: 0
      });
      const endTime = Date.now();

      expect(result).toHaveLength(10000);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });

  describe('Resource Management', () => {
    it('should cleanup resources properly', async () => {
      const auditService = new ConsolidatedAuditService();
      
      // Add some audit logs
      await auditService.createAuditLog({
        organizationId: 'org-123',
        userId: 'user-123',
        action: 'test.action',
        resource: 'test',
        severity: 'info',
        status: 'success'
      });

      // Cleanup should not throw errors
      await expect(auditService.cleanup()).resolves.not.toThrow();
    });

    it('should handle concurrent audit operations', async () => {
      const auditData = {
        organizationId: 'org-123',
        userId: 'user-123',
        action: 'test.action',
        resource: 'test',
        severity: 'info' as const,
        status: 'success' as const
      };

      mockDb.execute.mockResolvedValue({ insertId: 'audit-123' });

      // Create multiple audit logs concurrently
      const promises = Array(10).fill(null).map(() => 
        auditService.createAuditLog(auditData)
      );

      const results = await Promise.all(promises);

      expect(results).toHaveLength(10);
      results.forEach(result => {
        expect(result).toBeDefined();
      });
    });
  });
});
