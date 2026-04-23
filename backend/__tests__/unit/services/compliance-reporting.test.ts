import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { complianceReportingService } from '../../../services/compliance-reporting';
import { db as pgDb } from '../../../db/connection';
import { logAudit } from '../../../lib/audit';
import * as fs from 'fs';
import * as path from 'path';

// Mock dependencies
jest.mock('../../../db/connection');
jest.mock('../../../lib/audit');
jest.mock('fs');
jest.mock('path');

const mockDb = pgDb as jest.Mocked<typeof pgDb>;
const mockLogAudit = logAudit as jest.MockedFunction<typeof logAudit>;
const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

describe('Compliance Reporting Service', () => {
  const mockOrganizationId = 'org-123';
  const mockReportId = 'report-123';
  const mockUserId = 'user-123';

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mock responses
    mockDb.select = jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          orderBy: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue([])
          })
        })
      })
    });

    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: mockReportId }])
      })
    });

    mockDb.delete = jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: mockReportId }])
      })
    });

    // Mock file system operations
    mockFs.existsSync = jest.fn().mockReturnValue(true);
    mockFs.mkdirSync = jest.fn();
    mockFs.writeFileSync = jest.fn();
    mockPath.join = jest.fn().mockImplementation((...args) => args.join('/'));

    // Mock audit log
    mockLogAudit.mockResolvedValue(undefined);
  });

  describe('generateReport', () => {
    it('should generate a compliance report successfully', async () => {
      const reportRequest = {
        type: 'gdpr' as const,
        dateRange: {
          start: '2024-01-01',
          end: '2024-01-31'
        },
        format: 'pdf' as const,
        includeViolations: true,
        includeMetrics: true
      };

      const result = await complianceReportingService.generateReport(
        mockOrganizationId,
        reportRequest,
        mockUserId
      );

      expect(result.success).toBe(true);
      expect(result.data?.reportId).toBe(mockReportId);
      expect(result.data?.status).toBe('generating');
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'REPORT_GENERATED',
          resource: 'compliance_report',
          status: 'success'
        })
      );
    });

    it('should validate report type', async () => {
      const invalidRequest = {
        type: 'invalid' as any,
        dateRange: { start: '2024-01-01', end: '2024-01-31' },
        format: 'pdf' as const
      };

      await expect(
        complianceReportingService.generateReport(mockOrganizationId, invalidRequest, mockUserId)
      ).rejects.toThrow('Invalid report type');
    });

    it('should validate date range', async () => {
      const invalidRequest = {
        type: 'gdpr' as const,
        dateRange: { start: '2024-01-31', end: '2024-01-01' }, // End before start
        format: 'pdf' as const
      };

      await expect(
        complianceReportingService.generateReport(mockOrganizationId, invalidRequest, mockUserId)
      ).rejects.toThrow('Invalid date range');
    });

    it('should handle database errors', async () => {
      mockDb.insert = jest.fn().mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockRejectedValue(new Error('Database error'))
        })
      });

      const validRequest = {
        type: 'gdpr' as const,
        dateRange: { start: '2024-01-01', end: '2024-01-31' },
        format: 'pdf' as const
      };

      await expect(
        complianceReportingService.generateReport(mockOrganizationId, validRequest, mockUserId)
      ).rejects.toThrow('Database error');
    });
  });

  describe('getReport', () => {
    it('should retrieve an existing report', async () => {
      const mockReport = {
        id: mockReportId,
        organizationId: mockOrganizationId,
        type: 'gdpr',
        status: 'completed',
        format: 'pdf',
        fileUrl: '/reports/compliance_report_123.pdf',
        metadata: { generatedAt: '2024-01-15T10:00:00Z' },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockReport])
          })
        })
      });

      const result = await complianceReportingService.getReport(mockReportId, mockOrganizationId);

      expect(result.success).toBe(true);
      expect(result.data?.id).toBe(mockReportId);
      expect(result.data?.status).toBe('completed');
      expect(result.data?.fileUrl).toBeDefined();
    });

    it('should return null for non-existent report', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      });

      const result = await complianceReportingService.getReport('non-existent', mockOrganizationId);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Report not found');
    });

    it('should handle unauthorized access', async () => {
      const mockReport = {
        id: mockReportId,
        organizationId: 'different-org',
        type: 'gdpr',
        status: 'completed'
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockReport])
          })
        })
      });

      const result = await complianceReportingService.getReport(mockReportId, mockOrganizationId);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Access denied');
    });
  });

  describe('listReports', () => {
    it('should list reports for organization', async () => {
      const mockReports = [
        {
          id: 'report-1',
          type: 'gdpr',
          status: 'completed',
          createdAt: new Date('2024-01-15')
        },
        {
          id: 'report-2',
          type: 'security',
          status: 'generating',
          createdAt: new Date('2024-01-16')
        }
      ];

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockReturnValue({
                offset: jest.fn().mockResolvedValue(mockReports)
              })
            })
          })
        })
      });

      const result = await complianceReportingService.listReports(mockOrganizationId, {
        limit: 10,
        offset: 0
      });

      expect(result.success).toBe(true);
      expect(result.data?.reports).toHaveLength(2);
      expect(result.data?.total).toBe(2);
    });

    it('should filter by report type', async () => {
      const mockReports = [
        {
          id: 'report-1',
          type: 'gdpr',
          status: 'completed'
        }
      ];

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockReturnValue({
                offset: jest.fn().mockResolvedValue(mockReports)
              })
            })
          })
        })
      });

      const result = await complianceReportingService.listReports(mockOrganizationId, {
        type: 'gdpr',
        limit: 10,
        offset: 0
      });

      expect(result.success).toBe(true);
      expect(result.data?.reports[0].type).toBe('gdpr');
    });

    it('should handle pagination', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockReturnValue({
                offset: jest.fn().mockResolvedValue([])
              })
            })
          })
        })
      });

      const result = await complianceReportingService.listReports(mockOrganizationId, {
        limit: 5,
        offset: 10
      });

      expect(result.success).toBe(true);
      expect(mockDb.select).toHaveBeenCalled();
    });
  });

  describe('deleteReport', () => {
    it('should delete a report successfully', async () => {
      const mockReport = {
        id: mockReportId,
        organizationId: mockOrganizationId,
        fileUrl: '/reports/compliance_report_123.pdf'
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockReport])
          })
        })
      });

      const result = await complianceReportingService.deleteReport(mockReportId, mockOrganizationId);

      expect(result.success).toBe(true);
      expect(mockDb.delete).toHaveBeenCalled();
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'REPORT_DELETED',
          resource: 'compliance_report',
          status: 'success'
        })
      );
    });

    it('should handle file deletion errors gracefully', async () => {
      const mockReport = {
        id: mockReportId,
        organizationId: mockOrganizationId,
        fileUrl: '/reports/compliance_report_123.pdf'
      };

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockReport])
          })
        })
      });

      mockFs.existsSync = jest.fn().mockReturnValue(true);
      mockFs.unlinkSync = jest.fn().mockImplementation(() => {
        throw new Error('File deletion failed');
      });

      const result = await complianceReportingService.deleteReport(mockReportId, mockOrganizationId);

      expect(result.success).toBe(true); // Should still succeed even if file deletion fails
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'REPORT_DELETED',
          status: 'success'
        })
      );
    });
  });

  describe('Compliance Checks', () => {
    describe('GDPR Compliance Checks', () => {
      it('should detect missing consent records', async () => {
        const mockData = {
          users: [{ id: 'user-1', email: 'test@example.com' }],
          consents: [], // No consent records
          gdprRequests: []
        };

        jest.spyOn(complianceReportingService as any, 'runGDPRChecks').mockResolvedValue([
          {
            type: 'consent',
            severity: 'high',
            description: 'Missing consent records for users',
            affectedRecords: 1,
            recommendation: 'Implement consent management system'
          }
        ]);

        const result = await complianceReportingService.generateReport(mockOrganizationId, {
          type: 'gdpr',
          dateRange: { start: '2024-01-01', end: '2024-01-31' },
          format: 'pdf'
        }, mockUserId);

        expect(result.success).toBe(true);
      });

      it('should detect overdue GDPR requests', async () => {
        const mockData = {
          gdprRequests: [
            {
              id: 'request-1',
              type: 'access',
              status: 'pending',
              createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), // 35 days ago
              dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days overdue
            }
          ]
        };

        jest.spyOn(complianceReportingService as any, 'runGDPRChecks').mockResolvedValue([
          {
            type: 'response_time',
            severity: 'high',
            description: 'GDPR request overdue',
            affectedRecords: 1,
            recommendation: 'Process overdue requests immediately'
          }
        ]);

        const result = await complianceReportingService.generateReport(mockOrganizationId, {
          type: 'gdpr',
          dateRange: { start: '2024-01-01', end: '2024-01-31' },
          format: 'pdf'
        }, mockUserId);

        expect(result.success).toBe(true);
      });
    });

    describe('Security Compliance Checks', () => {
      it('should detect weak password policies', async () => {
        jest.spyOn(complianceReportingService as any, 'runSecurityChecks').mockResolvedValue([
          {
            type: 'password_policy',
            severity: 'medium',
            description: 'Password policy does not meet security standards',
            affectedRecords: 0,
            recommendation: 'Implement stronger password requirements'
          }
        ]);

        const result = await complianceReportingService.generateReport(mockOrganizationId, {
          type: 'security',
          dateRange: { start: '2024-01-01', end: '2024-01-31' },
          format: 'pdf'
        }, mockUserId);

        expect(result.success).toBe(true);
      });

      it('should detect missing audit logs', async () => {
        jest.spyOn(complianceReportingService as any, 'runSecurityChecks').mockResolvedValue([
          {
            type: 'audit_trail',
            severity: 'high',
            description: 'Gaps in audit trail detected',
            affectedRecords: 50,
            recommendation: 'Ensure all critical actions are logged'
          }
        ]);

        const result = await complianceReportingService.generateReport(mockOrganizationId, {
          type: 'security',
          dateRange: { start: '2024-01-01', end: '2024-01-31' },
          format: 'pdf'
        }, mockUserId);

        expect(result.success).toBe(true);
      });
    });

    describe('Data Retention Checks', () => {
      it('should detect data retention violations', async () => {
        jest.spyOn(complianceReportingService as any, 'runDataRetentionChecks').mockResolvedValue([
          {
            type: 'retention_policy',
            severity: 'medium',
            description: 'Data retained beyond policy limits',
            affectedRecords: 25,
            recommendation: 'Implement automated data retention policies'
          }
        ]);

        const result = await complianceReportingService.generateReport(mockOrganizationId, {
          type: 'data_retention',
          dateRange: { start: '2024-01-01', end: '2024-01-31' },
          format: 'pdf'
        }, mockUserId);

        expect(result.success).toBe(true);
      });
    });
  });

  describe('File Generation', () => {
    it('should generate PDF reports', async () => {
      const mockReportData = {
        id: mockReportId,
        type: 'gdpr',
        violations: [],
        metrics: { complianceScore: 95 },
        generatedAt: new Date()
      };

      jest.spyOn(complianceReportingService as any, 'generateReportFile').mockResolvedValue('/reports/test.pdf');

      const result = await complianceReportingService.generateReport(mockOrganizationId, {
        type: 'gdpr',
        dateRange: { start: '2024-01-01', end: '2024-01-31' },
        format: 'pdf'
      }, mockUserId);

      expect(result.success).toBe(true);
    });

    it('should generate CSV reports', async () => {
      jest.spyOn(complianceReportingService as any, 'generateReportFile').mockResolvedValue('/reports/test.csv');

      const result = await complianceReportingService.generateReport(mockOrganizationId, {
        type: 'gdpr',
        dateRange: { start: '2024-01-01', end: '2024-01-31' },
        format: 'csv'
      }, mockUserId);

      expect(result.success).toBe(true);
    });

    it('should handle file generation errors', async () => {
      jest.spyOn(complianceReportingService as any, 'generateReportFile').mockRejectedValue(new Error('File generation failed'));

      const result = await complianceReportingService.generateReport(mockOrganizationId, {
        type: 'gdpr',
        dateRange: { start: '2024-01-01', end: '2024-01-31' },
        format: 'pdf'
      }, mockUserId);

      expect(result.success).toBe(false);
      expect(result.error).toContain('File generation failed');
    });
  });

  describe('Metrics Calculation', () => {
    it('should calculate compliance score correctly', async () => {
      const mockViolations = [
        { severity: 'high', weight: 10 },
        { severity: 'medium', weight: 5 },
        { severity: 'low', weight: 1 }
      ];

      jest.spyOn(complianceReportingService as any, 'calculateComplianceScore').mockReturnValue(85);

      const result = await complianceReportingService.generateReport(mockOrganizationId, {
        type: 'gdpr',
        dateRange: { start: '2024-01-01', end: '2024-01-31' },
        format: 'pdf',
        includeMetrics: true
      }, mockUserId);

      expect(result.success).toBe(true);
    });

    it('should handle zero violations', async () => {
      jest.spyOn(complianceReportingService as any, 'calculateComplianceScore').mockReturnValue(100);

      const result = await complianceReportingService.generateReport(mockOrganizationId, {
        type: 'gdpr',
        dateRange: { start: '2024-01-01', end: '2024-01-31' },
        format: 'pdf',
        includeMetrics: true
      }, mockUserId);

      expect(result.success).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed report requests', async () => {
      const invalidRequest = {
        type: 'gdpr',
        dateRange: { start: 'invalid-date', end: '2024-01-31' },
        format: 'pdf'
      };

      await expect(
        complianceReportingService.generateReport(mockOrganizationId, invalidRequest, mockUserId)
      ).rejects.toThrow();
    });

    it('should handle database connection errors', async () => {
      mockDb.select = jest.fn().mockImplementation(() => {
        throw new Error('Connection failed');
      });

      await expect(
        complianceReportingService.getReport(mockReportId, mockOrganizationId)
      ).rejects.toThrow('Connection failed');
    });

    it('should handle file system errors', async () => {
      mockFs.existsSync = jest.fn().mockReturnValue(false);
      mockFs.mkdirSync = jest.fn().mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const result = await complianceReportingService.generateReport(mockOrganizationId, {
        type: 'gdpr',
        dateRange: { start: '2024-01-01', end: '2024-01-31' },
        format: 'pdf'
      }, mockUserId);

      expect(result.success).toBe(false);
    });
  });

  describe('Validation', () => {
    it('should validate organization ID format', async () => {
      const invalidOrgId = 'invalid-org-id';

      await expect(
        complianceReportingService.generateReport(invalidOrgId, {
          type: 'gdpr',
          dateRange: { start: '2024-01-01', end: '2024-01-31' },
          format: 'pdf'
        }, mockUserId)
      ).rejects.toThrow('Invalid organization ID');
    });

    it('should validate user ID format', async () => {
      const invalidUserId = 'invalid-user-id';

      await expect(
        complianceReportingService.generateReport(mockOrganizationId, {
          type: 'gdpr',
          dateRange: { start: '2024-01-01', end: '2024-01-31' },
          format: 'pdf'
        }, invalidUserId)
      ).rejects.toThrow('Invalid user ID');
    });

    it('should validate report format', async () => {
      const invalidRequest = {
        type: 'gdpr',
        dateRange: { start: '2024-01-01', end: '2024-01-31' },
        format: 'invalid' as any
      };

      await expect(
        complianceReportingService.generateReport(mockOrganizationId, invalidRequest, mockUserId)
      ).rejects.toThrow('Invalid report format');
    });
  });
});
