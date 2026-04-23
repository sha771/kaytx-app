import { describe, it, expect, beforeEach, jest } from '@jest/globals';

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

jest.mock('../../backend/lib/audit', () => ({
  logAudit: jest.fn().mockResolvedValue(undefined),
  AuditActions: {
    COMPLIANCE_REPORT_GENERATED: 'compliance.report_generated',
    COMPLIANCE_REPORT_DOWNLOADED: 'compliance.report_downloaded',
  },
}));

describe('ComplianceReportingService', () => {
  let complianceService: ComplianceReportingService;

  beforeEach(() => {
    jest.clearAllMocks();
    complianceService = new ComplianceReportingService();
  });

  describe('Report Generation', () => {
    it('should create a compliance service instance', () => {
      expect(complianceService).toBeInstanceOf(ComplianceReportingService);
    });

    it('should get compliance report by ID', async () => {
      const result = await complianceService.getComplianceReport('test-report-id');
      expect(result).toBeNull(); // No active reports by default
    });

    it('should list compliance reports', async () => {
      const result = await complianceService.listComplianceReports('org-123', {});
      expect(result).toBeDefined();
      expect(Array.isArray(result.reports)).toBe(true);
    });

    it('should export report', async () => {
      // Test that it throws an error for non-existent report
      await expect(complianceService.exportReport('test-report-id', 'json'))
        .rejects.toThrow('Report not found');
    });

    it('should schedule report', async () => {
      const result = await complianceService.scheduleReport('org-123', {
        reportType: 'gdpr',
        frequency: 'monthly',
        nextRun: new Date(),
      });
      expect(result).toBeDefined();
    });

    it('should update recommendation', async () => {
      const result = await complianceService.updateRecommendation(
        'org-123',
        'test-recommendation-id',
        { status: 'completed' }
      );
      expect(result).toBeDefined();
    });

    it('should resolve violation', async () => {
      const result = await complianceService.resolveViolation(
        'org-123',
        'test-violation-id',
        'resolution',
        'user-123'
      );
      expect(result).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid report ID gracefully', async () => {
      const result = await complianceService.getComplianceReport('');
      expect(result).toBeNull();
    });

    it('should handle empty organization ID', async () => {
      const result = await complianceService.listComplianceReports('', {});
      expect(result).toBeDefined();
      expect(Array.isArray(result.reports)).toBe(true);
    });
  });
});
