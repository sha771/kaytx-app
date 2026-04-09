import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { CodeScanner, ScanResult } from '../../backend/lib/code-scanner';
import * as fs from 'fs';
import * as path from 'path';

// Mock the file system
jest.mock('fs');
jest.mock('path');

describe('CodeScanner', () => {
  let codeScanner: CodeScanner;
  let mockFs: jest.Mocked<typeof fs>;
  let mockPath: jest.Mocked<typeof path>;

  beforeEach(() => {
    mockFs = fs as jest.Mocked<typeof fs>;
    mockPath = path as jest.Mocked<typeof path>;
    codeScanner = new CodeScanner('/test/project');
    
    // Reset all mocks
    jest.clearAllMocks();
  });

  describe('scanProject', () => {
    it('should scan project and return comprehensive results', async () => {
      // Mock file system responses
      mockFs.statSync.mockReturnValue({
        size: 1000,
        mtime: new Date(),
        isFile: () => true,
        isDirectory: () => false
      } as any);

      mockFs.readFileSync.mockReturnValue(`
        import { test } from './helper';
        export function example() {
          return 'test';
        }
        class TestClass {
          method() {}
        }
        interface TestInterface {}
        type TestType = string;
      `);

      // Mock glob pattern matching
      jest.doMock('glob', () => ({
        glob: jest.fn().mockResolvedValue([
          '/test/project/src/test.ts',
          '/test/project/src/test2.ts'
        ])
      }));

      const result = await codeScanner.scanProject();

      expect(result).toBeDefined();
      expect(result.totalFiles).toBeGreaterThan(0);
      expect(result.totalLines).toBeGreaterThan(0);
      expect(result.duplicates).toBeDefined();
      expect(result.incompleteImplementations).toBeDefined();
      expect(result.securityIssues).toBeDefined();
      expect(result.unnecessaryFiles).toBeDefined();
      expect(result.configConflicts).toBeDefined();
      expect(result.testCoverage).toBeDefined();
    });

    it('should handle file reading errors gracefully', async () => {
      mockFs.statSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      jest.doMock('glob', () => ({
        glob: jest.fn().mockResolvedValue(['/test/project/src/test.ts'])
      }));

      const result = await codeScanner.scanProject();

      expect(result.files).toHaveLength(0);
      expect(result.totalFiles).toBe(0);
    });
  });

  describe('detectDuplicateServices', () => {
    it('should identify duplicate service implementations', async () => {
      const mockFiles = [
        {
          relativePath: 'backend/services/user-service.ts',
          functions: ['createUser', 'updateUser', 'deleteUser'],
          classes: ['UserService'],
          content: 'export class UserService { createUser() {} }'
        },
        {
          relativePath: 'backend/services/user-management.ts',
          functions: ['createUser', 'updateUser', 'deleteUser'],
          classes: ['UserManagement'],
          content: 'export class UserManagement { createUser() {} }'
        }
      ];

      // @ts-ignore
      const duplicates = await codeScanner.detectDuplicateServices(mockFiles);

      expect(duplicates).toHaveLength(1);
      expect(duplicates[0].serviceName).toBe('userservice');
      expect(duplicates[0].files).toContain('backend/services/user-service.ts');
      expect(duplicates[0].files).toContain('backend/services/user-management.ts');
      expect(duplicates[0].similarity).toBeGreaterThan(0.7);
    });
  });

  describe('detectIncompleteImplementations', () => {
    it('should identify TODO comments and empty functions', async () => {
      const mockFiles = [
        {
          relativePath: 'backend/services/test-service.ts',
          content: `
            // TODO: Implement this function
            function incompleteFunction() {
              throw new Error('Not implemented');
            }
            
            function emptyFunction() {
              // Empty implementation
            }
          `,
          functions: ['incompleteFunction', 'emptyFunction'],
          exports: ['incompleteFunction']
        }
      ];

      // @ts-ignore
      const incomplete = await codeScanner.detectIncompleteImplementations(mockFiles);

      expect(incomplete).toHaveLength(1);
      expect(incomplete[0].issues).toContain('1 TODO comments found');
      expect(incomplete[0].issues).toContain('Contains placeholder error implementations');
      expect(incomplete[0].completionPercentage).toBeLessThan(100);
    });
  });

  describe('detectSecurityIssues', () => {
    it('should identify missing CSRF protection', async () => {
      const mockFiles = [
        {
          relativePath: 'backend/routes/api.ts',
          content: `
            app.post('/data', (req, res) => {
              // No CSRF protection
              res.json({ success: true });
            });
          `,
          isBackendFile: true
        }
      ];

      // @ts-ignore
      const issues = await codeScanner.detectSecurityIssues(mockFiles);

      expect(issues.length).toBeGreaterThan(0);
      expect(issues.some(issue => issue.type === 'csrf')).toBe(true);
    });

    it('should identify missing input validation', async () => {
      const mockFiles = [
        {
          relativePath: 'backend/routes/api.ts',
          content: `
            app.post('/data', (req, res) => {
              const data = req.body; // No validation
              res.json({ success: true });
            });
          `,
          isBackendFile: true
        }
      ];

      // @ts-ignore
      const issues = await codeScanner.detectSecurityIssues(mockFiles);

      expect(issues.some(issue => issue.type === 'input_validation')).toBe(true);
    });
  });

  describe('analyzeTestCoverage', () => {
    it('should calculate test coverage percentage', async () => {
      const mockFiles = [
        // Source files
        { relativePath: 'src/service.ts', isSourceFile: true },
        { relativePath: 'src/utils.ts', isSourceFile: true },
        { relativePath: 'src/helper.ts', isSourceFile: true },
        // Test files
        { relativePath: 'src/service.test.ts', isTestFile: true },
        { relativePath: 'src/utils.spec.ts', isTestFile: true }
      ];

      // @ts-ignore
      const coverage = await codeScanner.analyzeTestCoverage(mockFiles);

      expect(coverage.totalFiles).toBe(3);
      expect(coverage.testedFiles).toBe(2);
      expect(coverage.coveragePercentage).toBe((2 / 3) * 100);
      expect(coverage.untestedFiles).toContain('src/helper.ts');
    });
  });

  describe('helper methods', () => {
    it('should correctly identify service files', () => {
      const serviceFile = {
        relativePath: 'backend/services/user-service.ts',
        content: 'export class UserService {}'
      };

      // @ts-ignore
      expect(codeScanner.isServiceFile(serviceFile)).toBe(true);

      const nonServiceFile = {
        relativePath: 'frontend/components/button.tsx',
        content: 'export const Button = () => {}'
      };

      // @ts-ignore
      expect(codeScanner.isServiceFile(nonServiceFile)).toBe(false);
    });

    it('should correctly identify backend files', () => {
      const backendFile = {
        relativePath: 'backend/routes/api.ts'
      };

      // @ts-ignore
      expect(codeScanner.isBackendFile(backendFile)).toBe(true);

      const frontendFile = {
        relativePath: 'frontend/components/button.tsx'
      };

      // @ts-ignore
      expect(codeScanner.isBackendFile(frontendFile)).toBe(false);
    });

    it('should correctly identify test files', () => {
      const testFile1 = {
        relativePath: 'src/service.test.ts'
      };

      const testFile2 = {
        relativePath: 'src/utils.spec.ts'
      };

      const testFile3 = {
        relativePath: '__tests__/helper.test.ts'
      };

      // @ts-ignore
      expect(codeScanner.isTestFile(testFile1)).toBe(true);
      // @ts-ignore
      expect(codeScanner.isTestFile(testFile2)).toBe(true);
      // @ts-ignore
      expect(codeScanner.isTestFile(testFile3)).toBe(true);

      const sourceFile = {
        relativePath: 'src/service.ts'
      };

      // @ts-ignore
      expect(codeScanner.isTestFile(sourceFile)).toBe(false);
    });
  });

  afterEach(() => {
    jest.resetModules();
  });
});
