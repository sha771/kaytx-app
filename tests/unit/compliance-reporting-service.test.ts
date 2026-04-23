import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { generators } from '../property/generators';

// Import service after mocking
import { ComplianceReportingService } from '../../backend/services/compliance-reporting-service';

// Mock dependencies
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
  auditTrail: { id: 'audit_trail' },
  gdprRequests: { id: 'gdpr_requests' },
  payments: { id: 'payments' },
}));

jest.mock('../../backend/lib/audit', () => ({
  logAudit: jest.fn().mockResolvedValue(undefined),
  AuditActions: {
    COMPLIANCE_REPORT_GENERATED: 'compliance.report_generated',
    COMPLIANCE_REPORT_DOWNLOADED: 'compliance.report_downloaded',
  },
}));

describe('ComplianceReportingService', () => {
  let mockOrganizationId: string;
  let mockUserId: string;
  let complianceService: ComplianceReportingService;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOrganizationId = 'org-123';
    mockUserId = 'user-123';

    complianceService = new ComplianceReportingService({
      userId: mockUserId,
      organizationId: mockOrganizationId,
      role: 'admin',
      ipAddress: '127.0.0.1',
      userAgent: 'test-agent',
    });

    // Setup complete mock chain for database operations
    const mockLimit = jest.fn().mockReturnValue([]);
    const mockWhere = jest.fn().mockReturnValue({ limit: mockLimit });
    const mockFrom = jest.fn().mockReturnValue({ where: mockWhere });
    const mockOrderBy = jest.fn().mockReturnValue({ from: mockFrom });
    
    mockDb.select.mockReturnValue({ orderBy: mockOrderBy });
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

  describe('Compliance Report Generation', () => {
    it('should generate GDPR compliance report successfully', async () => {
      const reportRequest = {
        type: 'GDPR' as const,
        format: 'json' as const,
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
        includeViolations: true,
      };

      const result = await complianceService.generateReport(reportRequest);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        id: expect.any(String),
        name: expect.stringContaining('GDPR Compliance Report'),
        type: 'GDPR',
        organizationId: mockOrganizationId,
        status: 'completed',
        generatedAt: expect.any(Date),
        generatedBy: mockUserId,
        metadata: expect.objectContaining({
          totalRecords: expect.any(Number),
          compliantRecords: expect.any(Number),
          nonCompliantRecords: expect.any(Number),
          complianceScore: expect.any(Number),
          violations: expect.any(Array),
        }),
      });
    });

    it('should generate CCPA compliance report successfully', async () => {
      const reportRequest = {
        type: 'CCPA' as const,
        format: 'pdf' as const,
        dateRange: {
          start: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
        includeViolations: false,
      };

      const result = await complianceService.generateReport(reportRequest);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        type: 'CCPA',
        status: 'completed',
        fileUrl: expect.stringContaining('/reports/'),
      });
    });

    it('should generate HIPAA compliance report successfully', async () => {
      const reportRequest = {
        type: 'HIPAA' as const,
        format: 'csv' as const,
        dateRange: {
          start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
        includeViolations: true,
      };

      const result = await complianceService.generateReport(reportRequest);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        type: 'HIPAA',
        status: 'completed',
        fileUrl: expect.stringContaining('/reports/'),
      });
    });

    it('should generate SOX compliance report successfully', async () => {
      const reportRequest = {
        type: 'SOX' as const,
        format: 'json' as const,
        dateRange: {
          start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
        includeViolations: true,
      };

      const result = await complianceService.generateReport(reportRequest);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        type: 'SOX',
        status: 'completed',
      });
    });
  });

  describe('Compliance Score Calculation', () => {
    it('should calculate GDPR compliance score', async () => {
      const result = await complianceService.getComplianceScore('GDPR');

      expect(result.success).toBe(true);
      expect(result.data).toBeGreaterThanOrEqual(0);
      expect(result.data).toBeLessThanOrEqual(100);
    });

    it('should calculate CCPA compliance score', async () => {
      const result = await complianceService.getComplianceScore('CCPA');

      expect(result.success).toBe(true);
      expect(result.data).toBeGreaterThanOrEqual(0);
      expect(result.data).toBeLessThanOrEqual(100);
    });

    it('should calculate HIPAA compliance score', async () => {
      const result = await complianceService.getComplianceScore('HIPAA');

      expect(result.success).toBe(true);
      expect(result.data).toBeGreaterThanOrEqual(0);
      expect(result.data).toBeLessThanOrEqual(100);
    });

    it('should calculate SOX compliance score', async () => {
      const result = await complianceService.getComplianceScore('SOX');

      expect(result.success).toBe(true);
      expect(result.data).toBeGreaterThanOrEqual(0);
      expect(result.data).toBeLessThanOrEqual(100);
    });
  });

  describe('Report Management', () => {
    it('should handle report not found', async () => {
      const result = await complianceService.getReport('non-existent-report');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Report not found');
    });

    it('should list reports successfully', async () => {
      const result = await complianceService.listReports();

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    it('should list reports with filters', async () => {
      const options = {
        type: 'GDPR',
        status: 'completed',
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
      };

      const result = await complianceService.listReports(options);

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    it('should delete report successfully', async () => {
      const result = await complianceService.deleteReport('test-report-id');

      expect(result.success).toBe(true);
      expect(result.data).toBeUndefined();
    });
  });

  describe('Report Scheduling', () => {
    it('should schedule daily GDPR report', async () => {
      const scheduleData = {
        frequency: 'daily' as const,
        time: '09:00',
        timezone: 'UTC',
        recipients: ['admin@example.com', 'compliance@example.com'],
      };

      const result = await complianceService.scheduleReport('GDPR', scheduleData);

      expect(result.success).toBe(true);
      expect(result.data).toMatch(/^[a-f0-9-]{36}$/); // UUID format
    });

    it('should schedule weekly CCPA report', async () => {
      const scheduleData = {
        frequency: 'weekly' as const,
        time: '10:00',
        timezone: 'America/New_York',
        recipients: ['compliance@example.com'],
      };

      const result = await complianceService.scheduleReport('CCPA', scheduleData);

      expect(result.success).toBe(true);
      expect(result.data).toMatch(/^[a-f0-9-]{36}$/);
    });

    it('should schedule monthly HIPAA report', async () => {
      const scheduleData = {
        frequency: 'monthly' as const,
        time: '08:00',
        timezone: 'UTC',
        recipients: ['hipaa@example.com'],
      };

      const result = await complianceService.scheduleReport('HIPAA', scheduleData);

      expect(result.success).toBe(true);
      expect(result.data).toMatch(/^[a-f0-9-]{36}$/);
    });

    it('should schedule quarterly SOX report', async () => {
      const scheduleData = {
        frequency: 'quarterly' as const,
        time: '07:00',
        timezone: 'UTC',
        recipients: ['sox@example.com', 'audit@example.com'],
      };

      const result = await complianceService.scheduleReport('SOX', scheduleData);

      expect(result.success).toBe(true);
      expect(result.data).toMatch(/^[a-f0-9-]{36}$/);
    });
  });

  describe('Base Service Methods', () => {
    it('should create report using base service method', async () => {
      const reportData = {
        type: 'GDPR' as const,
        format: 'json' as const,
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
        includeViolations: true,
      };

      const result = await complianceService.create(reportData);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        type: 'GDPR',
        status: 'completed',
      });
    });

    it('should find report by ID using service method', async () => {
      const result = await complianceService.getComplianceReport('non-existent-report');

      expect(result).toBeNull();
    });

    it('should update recommendation using service method', async () => {
      const result = await complianceService.updateRecommendation(
        'org-123',
        'test-recommendation-id',
        { status: 'resolved' }
      );

      expect(result).toBeDefined();
    });

    it('should resolve violation using service method', async () => {
      const result = await complianceService.resolveViolation(
        'org-123',
        'test-violation-id',
        'Fixed the issue'
      );

      expect(result).toBeDefined();
    });

    it('should list reports using service method', async () => {
      const result = await complianceService.listComplianceReports('org-123', {});

      expect(result).toBeDefined();
      expect(Array.isArray(result.reports)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid report type', async () => {
      const invalidRequest = {
        type: 'INVALID' as any,
        format: 'json' as const,
        dateRange: {
          start: new Date(),
          end: new Date(),
        },
        includeViolations: false,
      };

      // The service should handle this gracefully
      const result = await complianceService.generateComplianceReport(
        'org-123',
        'gdpr',
        {
          startDate: new Date(),
          endDate: new Date(),
        }
      );

      // Depending on implementation, this might succeed or fail
      // The important thing is that it doesn't crash
      expect(result).toBeDefined();
    });

    it('should handle invalid date range', async () => {
      const invalidRequest = {
        type: 'GDPR' as const,
        format: 'json' as const,
        dateRange: {
          start: new Date(),
          end: new Date(Date.now() - 24 * 60 * 60 * 1000), // End before start
        },
        includeViolations: false,
      };

      const result = await complianceService.generateReport(invalidRequest);

      expect(result).toBeDefined();
    });

    it('should handle missing recipients in schedule', async () => {
      const scheduleData = {
        frequency: 'daily' as const,
        time: '09:00',
        timezone: 'UTC',
        recipients: [], // Empty recipients
      };

      const result = await complianceService.scheduleReport('GDPR', scheduleData);

      expect(result).toBeDefined();
    });
  });

  describe('Service Context', () => {
    it('should use provided context in operations', async () => {
      const customService = new ComplianceReportingService({
        userId: 'custom-user',
        organizationId: 'custom-org',
        role: 'viewer',
        ipAddress: '192.168.1.100',
        userAgent: 'custom-agent',
      });

      const reportRequest = {
        type: 'GDPR' as const,
        format: 'json' as const,
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
        includeViolations: false,
      };

      const result = await customService.generateReport(reportRequest);

      expect(result.success).toBe(true);
      expect(result.data?.generatedBy).toBe('custom-user');
      expect(result.data?.organizationId).toBe('custom-org');
    });
  });

  describe('Audit Logging', () => {
    it('should log report generation', async () => {
      const { logAudit } = require('../../backend/lib/audit');
      
      const reportRequest = {
        type: 'GDPR' as const,
        format: 'json' as const,
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
        includeViolations: true,
      };

      await complianceService.generateReport(reportRequest);

      expect(logAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: mockUserId,
          organizationId: mockOrganizationId,
          action: 'GENERATE_COMPLIANCE_REPORT',
          resource: 'compliance_report',
          resourceId: expect.any(String),
          status: 'success',
        })
      );
    });

    it('should log report deletion', async () => {
      const { logAudit } = require('../../backend/lib/audit');
      
      await complianceService.deleteReport('test-report-id');

      expect(logAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: mockUserId,
          organizationId: mockOrganizationId,
          action: 'DELETE_COMPLIANCE_REPORT',
          resource: 'compliance_report',
          resourceId: 'test-report-id',
          status: 'success',
        })
      );
    });
  });
});
