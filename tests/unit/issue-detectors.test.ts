import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { IssueDetector, CleanupPlan } from '../../backend/lib/issue-detectors';
import { ScanResult, DuplicateService, IncompleteImplementation, SecurityIssue } from '../../backend/lib/code-scanner';

describe('IssueDetector', () => {
  let issueDetector: IssueDetector;
  let mockScanResult: ScanResult;

  beforeEach(() => {
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
        untestedFiles: ['file1.ts', 'file2.ts']
      }
    };
    issueDetector = new IssueDetector(mockScanResult);
  });

  describe('generateCleanupPlan', () => {
    it('should generate a comprehensive cleanup plan', () => {
      // Add a duplicate to ensure estimatedTime > 0
      mockScanResult.duplicates = [
        {
          serviceName: 'test-service',
          files: ['file1.ts', 'file2.ts'],
          similarity: 0.8,
          functions: ['test'],
          description: 'Test duplicate'
        }
      ];
      
      const plan = issueDetector.generateCleanupPlan();

      expect(plan).toBeDefined();
      expect(plan.duplicates).toBeDefined();
      expect(plan.incomplete).toBeDefined();
      expect(plan.security).toBeDefined();
      expect(plan.unnecessary).toBeDefined();
      expect(plan.configs).toBeDefined();
      expect(plan.estimatedTime).toBeGreaterThan(0);
      expect(['low', 'medium', 'high']).toContain(plan.riskLevel);
    });

    it('should calculate appropriate risk level based on issues', () => {
      // Add critical security issues
      mockScanResult.securityIssues = [
        {
          filePath: 'test.ts',
          type: 'csrf',
          severity: 'critical',
          description: 'Critical security issue',
          recommendation: 'Fix it'
        }
      ];

      const plan = issueDetector.generateCleanupPlan();
      expect(plan.riskLevel).toBe('high');
    });
  });

  describe('analyzeDuplicates', () => {
    it('should recommend merge for similar duplicates', () => {
      mockScanResult.duplicates = [
        {
          serviceName: 'user-service',
          files: ['service1.ts', 'service2.ts'],
          similarity: 0.8,
          functions: ['createUser', 'updateUser'],
          description: 'Duplicate user service'
        }
      ];

      const plan = issueDetector.generateCleanupPlan();
      const duplicateCleanup = plan.duplicates[0];

      expect(duplicateCleanup.recommendedAction).toBe('merge');
      expect(duplicateCleanup.confidence).toBe(0.8);
      expect(duplicateCleanup.targetFile).toContain('unified-user-service');
    });

    it('should recommend keeping best file for very similar duplicates', () => {
      mockScanResult.duplicates = [
        {
          serviceName: 'auth-service',
          files: ['auth-old.ts', 'auth-new.ts'],
          similarity: 0.95,
          functions: ['login', 'logout'],
          description: 'Duplicate auth service'
        }
      ];

      const plan = issueDetector.generateCleanupPlan();
      const duplicateCleanup = plan.duplicates[0];

      expect(duplicateCleanup.recommendedAction).toBe('keep_best');
      expect(duplicateCleanup.filesToRemove).toContain('auth-old.ts');
    });
  });

  describe('analyzeIncomplete', () => {
    it('should generate fixes for incomplete implementations', () => {
      mockScanResult.incompleteImplementations = [
        {
          filePath: 'service.ts',
          issues: ['TODO comments found', 'empty function implementations'],
          completionPercentage: 60,
          priority: 'high'
        }
      ];

      const plan = issueDetector.generateCleanupPlan();
      const incompleteFix = plan.incomplete[0];

      expect(incompleteFix.filePath).toBe('service.ts');
      expect(incompleteFix.fixes).toContain('Complete TODO implementations');
      expect(incompleteFix.fixes).toContain('Implement empty functions');
      expect(incompleteFix.priority).toBe('high');
      expect(incompleteFix.estimatedTime).toBeGreaterThan(0);
    });

    it('should estimate time based on issue complexity', () => {
      mockScanResult.incompleteImplementations = [
        {
          filePath: 'complex-service.ts',
          issues: ['TODO comments found', 'TODO comments found', 'empty function implementations'],
          completionPercentage: 20,
          priority: 'high'
        }
      ];

      const plan = issueDetector.generateCleanupPlan();
      const incompleteFix = plan.incomplete[0];

      // Should estimate more time for more complex issues
      // (2 * 80) + 20 = 180 > 100
      expect(incompleteFix.estimatedTime).toBeGreaterThan(100);
    });
  });

  describe('analyzeSecurity', () => {
    it('should generate security fixes with code examples', () => {
      mockScanResult.securityIssues = [
        {
          filePath: 'api.ts',
          type: 'csrf',
          severity: 'high',
          description: 'Missing CSRF protection',
          recommendation: 'Add CSRF middleware'
        }
      ];

      const plan = issueDetector.generateCleanupPlan();
      const securityFix = plan.security[0];

      expect(securityFix.filePath).toBe('api.ts');
      expect(securityFix.type).toBe('csrf');
      expect(securityFix.severity).toBe('high');
      expect(securityFix.fix).toBe('Add CSRF middleware');
      expect(securityFix.code).toContain('csrf');
      expect(securityFix.estimatedTime).toBe(60); // 1 hour for CSRF
    });

    it('should provide different time estimates for different security issues', () => {
      mockScanResult.securityIssues = [
        {
          filePath: 'api.ts',
          type: 'csrf',
          severity: 'high',
          description: 'Missing CSRF protection',
          recommendation: 'Add CSRF middleware'
        },
        {
          filePath: 'service.ts',
          type: 'error_handling',
          severity: 'medium',
          description: 'Incomplete error handling',
          recommendation: 'Add proper catch blocks'
        }
      ];

      const plan = issueDetector.generateCleanupPlan();
      const csrfFix = plan.security.find(f => f.type === 'csrf');
      const errorFix = plan.security.find(f => f.type === 'error_handling');

      expect(csrfFix.estimatedTime).toBe(60);
      expect(errorFix.estimatedTime).toBe(30);
    });
  });

  describe('analyzeUnnecessary', () => {
    it('should identify safe-to-delete files', () => {
      mockScanResult.unnecessaryFiles = [
        {
          filePath: 'deprecated.ts',
          reason: 'deprecated',
          size: 1000,
          safeToDelete: true
        }
      ];

      const plan = issueDetector.generateCleanupPlan();
      const fileRemoval = plan.unnecessary[0];

      expect(fileRemoval.filePath).toBe('deprecated.ts');
      expect(fileRemoval.reason).toBe('deprecated');
      expect(fileRemoval.safeToDelete).toBe(true);
      expect(fileRemoval.backupRequired).toBe(false);
    });

    it('should require backup for unsafe deletions', () => {
      mockScanResult.unnecessaryFiles = [
        {
          filePath: 'unused-imports.ts',
          reason: 'unused_imports',
          size: 500,
          safeToDelete: false
        }
      ];

      const plan = issueDetector.generateCleanupPlan();
      const fileRemoval = plan.unnecessary[0];

      expect(fileRemoval.safeToDelete).toBe(false);
      expect(fileRemoval.backupRequired).toBe(true);
    });
  });

  describe('analyzeConfigs', () => {
    it('should merge conflicting configurations', () => {
      mockScanResult.configConflicts = [
        {
          configType: 'database',
          files: ['config1.json', 'config2.json'],
          conflicts: ['Different host values', 'Different port values'],
          resolution: 'Merge configurations or remove duplicates'
        }
      ];

      const plan = issueDetector.generateCleanupPlan();
      const configResolution = plan.configs[0];

      expect(configResolution.configType).toBe('database');
      expect(configResolution.files).toContain('config1.json');
      expect(configResolution.files).toContain('config2.json');
      expect(configResolution.mergedConfig).toBeDefined();
      expect(configResolution.filesToRemove).toContain('config2.json');
    });
  });

  describe('calculateEstimatedTime', () => {
    it('should sum time estimates from all categories', () => {
      mockScanResult.duplicates = [
        {
          serviceName: 'test-service',
          files: ['file1.ts', 'file2.ts'],
          similarity: 0.8,
          functions: ['test'],
          description: 'Test duplicate'
        }
      ];

      mockScanResult.incompleteImplementations = [
        {
          filePath: 'incomplete.ts',
          issues: ['TODO found'],
          completionPercentage: 80,
          priority: 'medium'
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

      const plan = issueDetector.generateCleanupPlan();

      // Should include time for duplicates (45min), incomplete (30min), and security (60min)
      expect(plan.estimatedTime).toBeGreaterThan(100);
    });
  });

  describe('calculateRiskLevel', () => {
    it('should return high risk for critical security issues', () => {
      mockScanResult.securityIssues = [
        {
          filePath: 'critical.ts',
          type: 'csrf',
          severity: 'critical',
          description: 'Critical security issue',
          recommendation: 'Fix immediately'
        }
      ];

      const plan = issueDetector.generateCleanupPlan();
      expect(plan.riskLevel).toBe('high');
    });

    it('should return low risk for minor issues', () => {
      mockScanResult.duplicates = [
        {
          serviceName: 'minor-service',
          files: ['file1.ts', 'file2.ts'],
          similarity: 0.7,
          functions: ['minor'],
          description: 'Minor duplicate'
        }
      ];

      const plan = issueDetector.generateCleanupPlan();
      expect(plan.riskLevel).toBe('low');
    });
  });
});
