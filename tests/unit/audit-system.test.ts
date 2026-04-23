import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { AuditSystem, AuditOptions } from '../../backend/lib/audit-system';
import { ScanResult , CodeScanner } from '../../backend/lib/code-scanner';
import { CleanupPlan , IssueDetector, CleanupEngine } from '../../backend/lib/issue-detectors';

import { ReportGenerator } from '../../backend/lib/report-generator';

// Mock the dependencies
jest.mock('../../backend/lib/code-scanner', () => ({
  CodeScanner: jest.fn().mockImplementation(() => ({
    scanProject: jest.fn()
  }))
}));
jest.mock('../../backend/lib/issue-detectors', () => ({
  IssueDetector: jest.fn().mockImplementation(() => ({
    generateCleanupPlan: jest.fn()
  })),
  CleanupEngine: jest.fn().mockImplementation(() => ({
    executeCleanupPlan: jest.fn(),
    rollback: jest.fn(),
    getExecutionLog: jest.fn().mockReturnValue([])
  }))
}));
jest.mock('../../backend/lib/report-generator', () => ({
  ReportGenerator: jest.fn().mockImplementation(() => ({
    generateReport: jest.fn()
  }))
}));

describe('AuditSystem', () => {
  let auditSystem: AuditSystem;
  let mockOptions: AuditOptions;
  let mockScanResult: ScanResult;
  let mockCleanupPlan: CleanupPlan;

  beforeEach(() => {
    mockOptions = {
      projectRoot: '/test/project',
      reportFormats: ['json', 'markdown'],
      outputDir: '/test/reports',
      includeDetails: true,
      includeRecommendations: true,
      dryRun: true,
      autoApply: false
    };

    mockScanResult = {
      files: [],
      totalFiles: 10,
      totalLines: 1000,
      duplicates: [],
      incompleteImplementations: [],
      securityIssues: [],
      unnecessaryFiles: [],
      configConflicts: [],
      testCoverage: {
        totalFiles: 10,
        testedFiles: 5,
        coveragePercentage: 50,
        untestedFiles: ['file1.ts']
      }
    };

    mockCleanupPlan = {
      duplicates: [],
      incomplete: [],
      security: [],
      unnecessary: [],
      configs: [],
      estimatedTime: 120,
      riskLevel: 'low'
    };

    auditSystem = new AuditSystem(mockOptions);
    jest.clearAllMocks();
  });

  describe('runFullAudit', () => {
    it('should execute a complete audit workflow', async () => {
      const progressCallback = jest.fn();
      
      // Mock implementations
      (CodeScanner as jest.MockedClass<typeof CodeScanner>).mockImplementation(() => ({
        scanProject: jest.fn().mockResolvedValue(mockScanResult)
      } as any));

      (IssueDetector as jest.MockedClass<typeof IssueDetector>).mockImplementation(() => ({
        generateCleanupPlan: jest.fn().mockReturnValue(mockCleanupPlan)
      } as any));

      (ReportGenerator as jest.MockedClass<typeof ReportGenerator>).mockImplementation(() => ({
        generateReport: jest.fn().mockResolvedValue('/test/report.json')
      } as any));

      // Re-instantiate to use mocks
      auditSystem = new AuditSystem(mockOptions);
      auditSystem.onProgress(progressCallback);

      const result = await auditSystem.runFullAudit();

      expect(result).toBeDefined();
      expect(result.summary).toBeDefined();
      expect(result.scanResult).toBeDefined();
      expect(result.cleanupPlan).toBeDefined();
      expect(result.recommendations).toBeDefined();
      expect(progressCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          stage: expect.any(String),
          progress: expect.any(Number),
          total: expect.any(Number),
          message: expect.any(String)
        })
      );
    });

    it('should handle errors during audit execution', async () => {
      (CodeScanner as jest.MockedClass<typeof CodeScanner>).mockImplementation(() => ({
        scanProject: jest.fn().mockRejectedValue(new Error('Scan failed'))
      } as any));

      // Re-instantiate to use mocks
      auditSystem = new AuditSystem(mockOptions);

      await expect(auditSystem.runFullAudit()).rejects.toThrow('Scan failed');
    });

    it('should execute cleanup when autoApply is enabled', async () => {
      mockOptions.autoApply = true;
      mockOptions.dryRun = false;

      (CodeScanner as jest.MockedClass<typeof CodeScanner>).mockImplementation(() => ({
        scanProject: jest.fn().mockResolvedValue(mockScanResult)
      } as any));

      (IssueDetector as jest.MockedClass<typeof IssueDetector>).mockImplementation(() => ({
        generateCleanupPlan: jest.fn().mockReturnValue(mockCleanupPlan)
      } as any));

      const mockExecuteCleanupPlan = jest.fn().mockResolvedValue(undefined);
      (CleanupEngine as jest.MockedClass<typeof CleanupEngine>).mockImplementation(() => ({
        executeCleanupPlan: mockExecuteCleanupPlan,
        rollback: jest.fn(),
        getExecutionLog: jest.fn().mockReturnValue([])
      } as any));

      (ReportGenerator as jest.MockedClass<typeof ReportGenerator>).mockImplementation(() => ({
        generateReport: jest.fn().mockResolvedValue('/test/report.json')
      } as any));

      auditSystem = new AuditSystem(mockOptions);

      await auditSystem.runFullAudit();

      // Should attempt cleanup when autoApply is true
      expect(mockExecuteCleanupPlan).toHaveBeenCalledWith(mockCleanupPlan, false);
    });
  });

  describe('runQuickScan', () => {
    it('should perform a quick scan without detailed analysis', async () => {
      (CodeScanner as jest.MockedClass<typeof CodeScanner>).mockImplementation(() => ({
        scanProject: jest.fn().mockResolvedValue(mockScanResult)
      } as any));

      // Re-instantiate to use mocks
      auditSystem = new AuditSystem(mockOptions);

      const progressCallback = jest.fn();
      auditSystem.onProgress(progressCallback);

      const result = await auditSystem.runQuickScan();

      expect(result).toBe(mockScanResult);
      expect(progressCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          stage: 'complete',
          progress: 100,
          total: 100,
          message: 'Quick scan completed!'
        })
      );
    });
  });

  describe('executeCleanup', () => {
    it('should execute cleanup plan with proper progress tracking', async () => {
      const progressCallback = jest.fn();
      
      const mockExecuteCleanupPlan = jest.fn().mockResolvedValue(undefined);
      (CleanupEngine as jest.MockedClass<typeof CleanupEngine>).mockImplementation(() => ({
        executeCleanupPlan: mockExecuteCleanupPlan,
        rollback: jest.fn(),
        getExecutionLog: jest.fn().mockReturnValue([])
      } as any));

      // Re-instantiate to use mocks
      auditSystem = new AuditSystem(mockOptions);
      auditSystem.onProgress(progressCallback);

      await auditSystem.executeCleanup(mockCleanupPlan);

      expect(mockExecuteCleanupPlan).toHaveBeenCalledWith(mockCleanupPlan, true);
      expect(progressCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          stage: 'complete',
          progress: 100,
          total: 100,
          message: 'Cleanup completed successfully!'
        })
      );
    });

    it('should handle cleanup execution errors', async () => {
      const mockExecuteCleanupPlan = jest.fn().mockRejectedValue(new Error('Cleanup failed'));
      (CleanupEngine as jest.MockedClass<typeof CleanupEngine>).mockImplementation(() => ({
        executeCleanupPlan: mockExecuteCleanupPlan,
        rollback: jest.fn(),
        getExecutionLog: jest.fn().mockReturnValue([])
      } as any));

      // Re-instantiate to use mocks
      auditSystem = new AuditSystem(mockOptions);

      await expect(auditSystem.executeCleanup(mockCleanupPlan)).rejects.toThrow('Cleanup failed');
    });
  });

  describe('rollbackCleanup', () => {
    it('should execute rollback with proper progress tracking', async () => {
      const progressCallback = jest.fn();
      auditSystem.onProgress(progressCallback);

      const mockRollback = jest.fn().mockResolvedValue(undefined);
      const mockEngineInstance = {
        executeCleanupPlan: jest.fn(),
        rollback: mockRollback,
        getExecutionLog: jest.fn().mockReturnValue([])
      };
      
      (CleanupEngine as jest.MockedClass<typeof CleanupEngine>).mockImplementation(() => mockEngineInstance as any);

      // Re-instantiate to use the new mock
      auditSystem = new AuditSystem(mockOptions);
      auditSystem.onProgress(progressCallback);

      await auditSystem.rollbackCleanup();

      expect(mockRollback).toHaveBeenCalled();
      expect(progressCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          stage: 'complete',
          progress: 100,
          total: 100,
          message: 'Rollback completed successfully!'
        })
      );
    });
  });

  describe('progress tracking', () => {
    it('should support multiple progress callbacks', async () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      auditSystem.onProgress(callback1);
      auditSystem.onProgress(callback2);

      (CodeScanner as jest.MockedClass<typeof CodeScanner>).mockImplementation(() => ({
        scanProject: jest.fn().mockResolvedValue(mockScanResult)
      } as any));

      await auditSystem.runQuickScan();

      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });

    it('should pass correct progress information', async () => {
      (CodeScanner as jest.MockedClass<typeof CodeScanner>).mockImplementation(() => ({
        scanProject: jest.fn().mockResolvedValue(mockScanResult)
      } as any));

      // Re-instantiate to use mocks
      auditSystem = new AuditSystem(mockOptions);
      
      const progressCallback = jest.fn();
      auditSystem.onProgress(progressCallback);

      await auditSystem.runQuickScan();

      const progressCalls = progressCallback.mock.calls as any[][];
      expect(progressCalls).toHaveLength(2); // Start and complete

      // Check start call
      expect(progressCalls[0][0]).toMatchObject({
        stage: 'scan',
        progress: 0,
        total: 100,
        message: 'Running quick scan...'
      });

      // Check complete call
      expect(progressCalls[1][0]).toMatchObject({
        stage: 'complete',
        progress: 100,
        total: 100,
        message: 'Quick scan completed!'
      });
    });
  });

  describe('calculateOverallScore', () => {
    it('should calculate overall score correctly', async () => {
      // Add some issues to test score calculation
      mockScanResult.duplicates = [
        {
          serviceName: 'test-service',
          files: ['file1.ts', 'file2.ts'],
          similarity: 0.8,
          functions: ['test'],
          description: 'Test duplicate'
        }
      ];

      mockScanResult.securityIssues = [
        {
          filePath: 'security.ts',
          type: 'csrf',
          severity: 'high',
          description: 'Security issue',
          recommendation: 'Fix it'
        }
      ];

      (CodeScanner as jest.MockedClass<typeof CodeScanner>).mockImplementation(() => ({
        scanProject: jest.fn().mockResolvedValue(mockScanResult)
      } as any));

      (IssueDetector as jest.MockedClass<typeof IssueDetector>).mockImplementation(() => ({
        generateCleanupPlan: jest.fn().mockReturnValue(mockCleanupPlan)
      } as any));

      (ReportGenerator as jest.MockedClass<typeof ReportGenerator>).mockImplementation(() => ({
        generateReport: jest.fn().mockResolvedValue('/test/report.json')
      } as any));

      const result = await auditSystem.runFullAudit();

      // Base 100 - (1 duplicate * 5) - (1 high security * 10) - ((100-50) * 0.5) + (low risk bonus * 5) = 100 - 5 - 10 - 25 + 5 = 65
      expect(result.summary.overallScore).toBe(65);
    });
  });

    it('should generate reports in all specified formats', async () => {
      mockOptions.reportFormats = ['json', 'markdown', 'html'];
      
      const mockGenerateReport = jest.fn()
          .mockResolvedValueOnce('/test/report.json')
          .mockResolvedValueOnce('/test/report.markdown')
          .mockResolvedValueOnce('/test/report.html');

      (CodeScanner as jest.MockedClass<typeof CodeScanner>).mockImplementation(() => ({
        scanProject: jest.fn().mockResolvedValue(mockScanResult)
      } as any));

      (IssueDetector as jest.MockedClass<typeof IssueDetector>).mockImplementation(() => ({
        generateCleanupPlan: jest.fn().mockReturnValue(mockCleanupPlan)
      } as any));

      (ReportGenerator as jest.MockedClass<typeof ReportGenerator>).mockImplementation(() => ({
        generateReport: mockGenerateReport
      } as any));

      auditSystem = new AuditSystem(mockOptions);
      await auditSystem.runFullAudit();

      expect(mockGenerateReport).toHaveBeenCalledTimes(3);
      expect(mockGenerateReport).toHaveBeenCalledWith(
        mockScanResult,
        mockCleanupPlan,
        expect.objectContaining({ format: 'json' })
      );
      expect(mockGenerateReport).toHaveBeenCalledWith(
        mockScanResult,
        mockCleanupPlan,
        expect.objectContaining({ format: 'markdown' })
      );
      expect(mockGenerateReport).toHaveBeenCalledWith(
        mockScanResult,
        mockCleanupPlan,
        expect.objectContaining({ format: 'html' })
      );
    });

  afterEach(() => {
    jest.resetModules();
  });
});
