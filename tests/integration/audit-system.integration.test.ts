import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { AuditSystem } from '../../backend/lib/audit-system';
import * as fs from 'fs';
import * as path from 'path';

describe('AuditSystem Integration Tests', () => {
  let auditSystem: AuditSystem;
  const testProjectDir = path.join(__dirname, '../../test-project');

  beforeAll(() => {
    // Create a test project structure
    if (!fs.existsSync(testProjectDir)) {
      fs.mkdirSync(testProjectDir, { recursive: true });
    }

    // Create test files
    const testFiles = [
      {
        path: 'backend/services/test-service.ts',
        content: `
export class TestService {
  constructor() {}
  
  async testMethod() {
    return 'test';
  }
  
  // TODO: Implement this method
  async incompleteMethod() {
    throw new Error('Not implemented');
  }
}
        `
      },
      {
        path: 'backend/services/duplicate-service.ts',
        content: `
export class TestService {
  constructor() {}
  
  async testMethod() {
    return 'test';
  }
}
        `
      },
      {
        path: 'backend/routes/api.ts',
        content: `
import { Hono } from 'hono';

const app = new Hono();

app.post('/data', (c) => {
  const data = c.req.body; // No validation
  return c.json({ success: true });
});

export default app;
        `
      },
      {
        path: 'src/test.ts',
        content: `
export const test = () => {
  return 'test';
};
        `
      },
      {
        path: 'src/test.test.ts',
        content: `
import { test } from './test';

describe('test', () => {
  it('should work', () => {
    expect(test()).toBe('test');
  });
});
        `
      }
    ];

    testFiles.forEach(file => {
      const fullPath = path.join(testProjectDir, file.path);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(fullPath, file.content);
    });

    auditSystem = new AuditSystem({
      projectRoot: testProjectDir,
      reportFormats: ['json'],
      outputDir: testProjectDir,
      includeDetails: true,
      includeRecommendations: true,
      dryRun: true,
      autoApply: false
    });
  });

  afterAll(() => {
    // Clean up test files
    if (fs.existsSync(testProjectDir)) {
      fs.rmSync(testProjectDir, { recursive: true, force: true });
    }
  });

  describe('Quick Scan', () => {
    it('should perform a quick scan and return results', async () => {
      const result = await auditSystem.runQuickScan();

      expect(result).toBeDefined();
      expect(result.totalFiles).toBeGreaterThan(0);
      expect(result.totalLines).toBeGreaterThan(0);
      expect(result.files).toBeDefined();
      expect(result.duplicates).toBeDefined();
      expect(result.incompleteImplementations).toBeDefined();
      expect(result.securityIssues).toBeDefined();
      expect(result.testCoverage).toBeDefined();
    });

    it('should detect duplicate services', async () => {
      const result = await auditSystem.runQuickScan();

      // Should detect the duplicate TestService
      expect(result.duplicates.length).toBeGreaterThan(0);
      const duplicate = result.duplicates.find(d => 
        d.serviceName.includes('testservice')
      );
      expect(duplicate).toBeDefined();
      expect(duplicate.files.length).toBe(2);
    });

    it('should detect incomplete implementations', async () => {
      const result = await auditSystem.runQuickScan();

      // Should detect TODO comments and incomplete methods
      expect(result.incompleteImplementations.length).toBeGreaterThan(0);
      const incomplete = result.incompleteImplementations.find(f => 
        f.filePath.includes('test-service.ts')
      );
      expect(incomplete).toBeDefined();
      expect(incomplete.issues.some(issue => issue.includes('TODO'))).toBe(true);
    });

    it('should detect security issues', async () => {
      const result = await auditSystem.runQuickScan();

      // Should detect missing input validation
      expect(result.securityIssues.length).toBeGreaterThan(0);
      const securityIssue = result.securityIssues.find(issue => 
        issue.type === 'input_validation'
      );
      expect(securityIssue).toBeDefined();
    });

    it('should calculate test coverage', async () => {
      const result = await auditSystem.runQuickScan();

      expect(result.testCoverage).toBeDefined();
      expect(result.testCoverage.totalFiles).toBeGreaterThan(0);
      expect(result.testCoverage.coveragePercentage).toBeGreaterThanOrEqual(0);
      expect(result.testCoverage.coveragePercentage).toBeLessThanOrEqual(100);
    });
  });

  describe('Full Audit', () => {
    it('should perform a complete audit workflow', async () => {
      const result = await auditSystem.runFullAudit();

      expect(result).toBeDefined();
      expect(result.summary).toBeDefined();
      expect(result.scanResult).toBeDefined();
      expect(result.cleanupPlan).toBeDefined();
      expect(result.recommendations).toBeDefined();
      expect(result.timestamp).toBeDefined();
      expect(result.projectInfo).toBeDefined();
    });

    it('should generate audit summary with scores', async () => {
      const result = await auditSystem.runFullAudit();

      expect(result.summary.totalFiles).toBeGreaterThan(0);
      expect(result.summary.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.summary.overallScore).toBeLessThanOrEqual(100);
      expect(result.summary.riskLevel).toBeDefined();
      expect(['low', 'medium', 'high']).toContain(result.summary.riskLevel);
    });

    it('should generate cleanup plan with recommendations', async () => {
      const result = await auditSystem.runFullAudit();

      expect(result.cleanupPlan.duplicates).toBeDefined();
      expect(result.cleanupPlan.incomplete).toBeDefined();
      expect(result.cleanupPlan.security).toBeDefined();
      expect(result.cleanupPlan.unnecessary).toBeDefined();
      expect(result.cleanupPlan.configs).toBeDefined();
      expect(result.cleanupPlan.estimatedTime).toBeGreaterThan(0);
    });

    it('should generate actionable recommendations', async () => {
      const result = await auditSystem.runFullAudit();

      expect(result.recommendations.length).toBeGreaterThan(0);
      result.recommendations.forEach(rec => {
        expect(rec.title).toBeDefined();
        expect(rec.description).toBeDefined();
        expect(rec.category).toBeDefined();
        expect(rec.priority).toBeDefined();
        expect(rec.impact).toBeDefined();
        expect(rec.effort).toBeDefined();
      });
    });
  });

  describe('Progress Tracking', () => {
    it('should emit progress events during scan', async () => {
      const progressEvents: any[] = [];
      
      auditSystem.onProgress((progress) => {
        progressEvents.push(progress);
      });

      await auditSystem.runQuickScan();

      expect(progressEvents.length).toBeGreaterThan(0);
      expect(progressEvents[0]).toMatchObject({
        stage: expect.any(String),
        progress: expect.any(Number),
        total: expect.any(Number),
        message: expect.any(String)
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid project paths gracefully', async () => {
      const invalidAuditSystem = new AuditSystem({
        projectRoot: '/nonexistent/path',
        reportFormats: ['json'],
        outputDir: '/tmp',
        includeDetails: true,
        includeRecommendations: true,
        dryRun: true,
        autoApply: false
      });

      // Should not throw but return empty results
      const result = await invalidAuditSystem.runQuickScan();
      expect(result).toBeDefined();
      expect(result.totalFiles).toBe(0);
    });
  });
});
