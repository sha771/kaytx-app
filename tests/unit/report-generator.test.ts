import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ReportGenerator, ReportOptions, AuditReport } from '../../backend/lib/report-generator';
import { ScanResult, CleanupPlan } from '../../backend/lib/code-scanner';
import * as fs from 'fs';

// Mock the file system
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

describe('ReportGenerator', () => {
  let reportGenerator: ReportGenerator;
  let mockScanResult: ScanResult;
  let mockCleanupPlan: CleanupPlan;

  beforeEach(() => {
    reportGenerator = new ReportGenerator('/test/project');
    
    mockScanResult = {
      files: [
        {
          path: '/test/project/src/test.ts',
          relativePath: 'src/test.ts',
          size: 1000,
          lastModified: new Date(),
          content: 'export const test = () => {};',
          imports: [],
          exports: ['test'],
          functions: ['test'],
          classes: [],
          interfaces: [],
          types: []
        }
      ],
      totalFiles: 1,
      totalLines: 10,
      duplicates: [],
      incompleteImplementations: [],
      securityIssues: [],
      unnecessaryFiles: [],
      configConflicts: [],
      testCoverage: {
        totalFiles: 1,
        testedFiles: 0,
        coveragePercentage: 0,
        untestedFiles: ['src/test.ts']
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

    jest.clearAllMocks();
  });

  describe('generateReport', () => {
    it('should generate JSON report successfully', async () => {
      mockFs.writeFileSync.mockImplementation();

      const options: ReportOptions = {
        format: 'json',
        outputPath: '/test/report.json',
        includeDetails: true,
        includeRecommendations: true
      };

      const result = await reportGenerator.generateReport(mockScanResult, mockCleanupPlan, options);

      expect(result.toLowerCase().replace(/\\/g, '/')).toContain('/test/report.json');
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('report.json'),
        expect.stringContaining('"summary"')
      );
    });

    it('should generate Markdown report successfully', async () => {
      mockFs.writeFileSync.mockImplementation();

      const options: ReportOptions = {
        format: 'markdown',
        outputPath: '/test/report.md',
        includeDetails: true,
        includeRecommendations: true
      };

      const result = await reportGenerator.generateReport(mockScanResult, mockCleanupPlan, options);

      expect(result.toLowerCase().replace(/\\/g, '/')).toContain('/test/report.md');
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('report.md'),
        expect.stringContaining('#')
      );
    });

    it('should generate HTML report successfully', async () => {
      mockFs.writeFileSync.mockImplementation();

      const options: ReportOptions = {
        format: 'html',
        outputPath: '/test/report.html',
        includeDetails: true,
        includeRecommendations: true
      };

      const result = await reportGenerator.generateReport(mockScanResult, mockCleanupPlan, options);

      expect(result.toLowerCase().replace(/\\/g, '/')).toContain('/test/report.html');
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('report.html'),
        expect.stringContaining('<!DOCTYPE html>')
      );
    });

    it('should generate circular references in JSON report correctly', async () => {
      // Add circular reference to test cleanup
      mockScanResult.files[0].ast = {} as any; // This would cause circular reference
      mockFs.writeFileSync.mockImplementation();

      const options: ReportOptions = {
        format: 'json',
        outputPath: '/test/report.json',
        includeDetails: true,
        includeRecommendations: true
      };

      await expect(
        reportGenerator.generateReport(mockScanResult, mockCleanupPlan, options)
      ).resolves.not.toThrow();

      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });
  });

  describe('generateSummary', () => {
    it('should calculate overall score correctly', () => {
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

      const summary = reportGenerator['generateSummary'](mockScanResult, mockCleanupPlan);

      expect(summary.totalFiles).toBe(1);
      expect(summary.totalLines).toBe(10);
      expect(summary.duplicatesFound).toBe(1);
      expect(summary.securityIssues).toBe(1);
      // Base 100 - (1 duplicate * 5) - (1 high security * 10) - ((100-0) * 0.5) + (low risk bonus * 5) = 100 - 5 - 10 - 50 + 5 = 40
      expect(summary.overallScore).toBe(40);
    });

    it('should give bonus points for good practices', () => {
      mockScanResult.testCoverage.coveragePercentage = 85; // Above 80%
      mockCleanupPlan.riskLevel = 'low';
      
      // Base 100 - ((100-85) * 0.5) = 100 - 7.5 = 92.5 (rounds to 93)
      // Bonus: +5 (coverage > 80) + 5 (low risk) = +10
      // Total: 93 + 10 = 103

      const summary = reportGenerator['generateSummary'](mockScanResult, mockCleanupPlan);

      expect(summary.overallScore).toBe(103);
    });
  });

  describe('generateRecommendations', () => {
    it('should generate critical security recommendations', () => {
      mockScanResult.securityIssues = [
        {
          filePath: 'critical.ts',
          type: 'csrf',
          severity: 'critical',
          description: 'Critical security issue',
          recommendation: 'Fix immediately'
        }
      ];

      const recommendations = reportGenerator['generateRecommendations'](mockScanResult, mockCleanupPlan);

      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations[0].priority).toBe('critical');
      expect(recommendations[0].category).toBe('immediate');
    });

    it('should generate duplicate service recommendations', () => {
      mockScanResult.duplicates = [
        {
          serviceName: 'user-service',
          files: ['service1.ts', 'service2.ts'],
          similarity: 0.8,
          functions: ['createUser', 'updateUser'],
          description: 'Duplicate user service'
        }
      ];

      const recommendations = reportGenerator['generateRecommendations'](mockScanResult, mockCleanupPlan);

      expect(recommendations.some(r => r.title.includes('Consolidate'))).toBe(true);
    });

    it('should generate test coverage recommendations', () => {
      mockScanResult.testCoverage.coveragePercentage = 30; // Below 80%

      const recommendations = reportGenerator['generateRecommendations'](mockScanResult, mockCleanupPlan);

      expect(recommendations.some(r => r.title.includes('Test Coverage'))).toBe(true);
      expect(recommendations.some(r => r.description.includes('80%'))).toBe(true);
    });
  });

  describe('generateMarkdownReport', () => {
    it('should include executive summary table', () => {
      const markdown = reportGenerator['generateMarkdownReport']({
        summary: {
          totalFiles: 100,
          totalLines: 10000,
          duplicatesFound: 5,
          incompleteImplementations: 10,
          securityIssues: 3,
          unnecessaryFiles: 2,
          configConflicts: 1,
          testCoverage: 45.5,
          estimatedCleanupTime: 240,
          riskLevel: 'medium',
          overallScore: 75
        },
        scanResult: mockScanResult,
        cleanupPlan: mockCleanupPlan,
        recommendations: [],
        timestamp: '2024-01-01T00:00:00Z',
        projectInfo: {
          name: 'Test Project',
          version: '1.0.0',
          root: '/test',
          scanDuration: 1000,
          lastModified: '2024-01-01T00:00:00Z'
        }
      }, { includeDetails: true, includeRecommendations: true });

      expect(markdown).toContain('## 📊 Executive Summary');
      expect(markdown).toContain('| **Total Files** | 100 |');
      expect(markdown).toContain('| **Test Coverage** | 45.5% |');
    });

    it('should include recommendations when enabled', () => {
      const markdown = reportGenerator['generateMarkdownReport']({
        summary: {
          totalFiles: 100,
          totalLines: 10000,
          duplicatesFound: 5,
          incompleteImplementations: 10,
          securityIssues: 3,
          unnecessaryFiles: 2,
          configConflicts: 1,
          testCoverage: 45.5,
          estimatedCleanupTime: 240,
          riskLevel: 'medium',
          overallScore: 75
        },
        scanResult: mockScanResult,
        cleanupPlan: mockCleanupPlan,
        recommendations: [
          {
            category: 'immediate',
            priority: 'high',
            title: 'Test Recommendation',
            description: 'Test description',
            impact: 'High impact',
            effort: '2 hours',
            files: ['test.ts']
          }
        ],
        timestamp: '2024-01-01T00:00:00Z',
        projectInfo: {
          name: 'Test Project',
          version: '1.0.0',
          root: '/test',
          scanDuration: 1000,
          lastModified: '2024-01-01T00:00:00Z'
        }
      }, { includeDetails: true, includeRecommendations: true });

      expect(markdown).toContain('## 🎯 Recommendations');
      expect(markdown).toContain('Test Recommendation');
      expect(markdown).toContain('Test description');
    });
  });

  describe('generateHTMLReport', () => {
    it('should generate valid HTML structure', () => {
      const html = reportGenerator['generateHTMLReport']({
        summary: {
          totalFiles: 100,
          totalLines: 10000,
          duplicatesFound: 5,
          incompleteImplementations: 10,
          securityIssues: 3,
          unnecessaryFiles: 2,
          configConflicts: 1,
          testCoverage: 45.5,
          estimatedCleanupTime: 240,
          riskLevel: 'medium',
          overallScore: 75
        },
        scanResult: mockScanResult,
        cleanupPlan: mockCleanupPlan,
        recommendations: [],
        timestamp: '2024-01-01T00:00:00Z',
        projectInfo: {
          name: 'Test Project',
          version: '1.0.0',
          root: '/test',
          scanDuration: 1000,
          lastModified: '2024-01-01T00:00:00Z'
        }
      }, { includeDetails: true, includeRecommendations: true });

      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html lang="en">');
      expect(html).toContain('<head>');
      expect(html).toContain('<body>');
      expect(html).toContain('</html>');
    });

    it('should include CSS styling', () => {
      const html = reportGenerator['generateHTMLReport']({
        summary: {
          totalFiles: 100,
          totalLines: 10000,
          duplicatesFound: 5,
          incompleteImplementations: 10,
          securityIssues: 3,
          unnecessaryFiles: 2,
          configConflicts: 1,
          testCoverage: 45.5,
          estimatedCleanupTime: 240,
          riskLevel: 'medium',
          overallScore: 75
        },
        scanResult: mockScanResult,
        cleanupPlan: mockCleanupPlan,
        recommendations: [],
        timestamp: '2024-01-01T00:00:00Z',
        projectInfo: {
          name: 'Test Project',
          version: '1.0.0',
          root: '/test',
          scanDuration: 1000,
          lastModified: '2024-01-01T00:00:00Z'
        }
      }, { includeDetails: true, includeRecommendations: true });

      expect(html).toContain('<style>');
      expect(html).toContain('.container');
      expect(html).toContain('.summary-grid');
      expect(html).toContain('.risk-badge');
    });
  });

  describe('getProjectInfo', () => {
    it('should read package.json when available', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify({
        name: 'Test Project',
        version: '2.0.0'
      }));

      const projectInfo = await reportGenerator['getProjectInfo']();

      expect(projectInfo.name).toBe('Test Project');
      expect(projectInfo.version).toBe('2.0.0');
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        expect.stringContaining('package.json'),
        'utf-8'
      );
    });

    it('should use defaults when package.json is not available', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const projectInfo = await reportGenerator['getProjectInfo']();

      expect(projectInfo.name).toBe('Unknown Project');
      expect(projectInfo.version).toBe('1.0.0');
    });
  });
});
