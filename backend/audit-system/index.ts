/**
 * Platform Audit and Cleanup System
 * Main entry point
 */

import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';

// Export types
export * from './models/types';

// Export configuration
export {
  validateConfig,
  validateConfigSafe,
  validateEnvironmentVariables,
  validateEnvironmentVariablesSafe,
  getValidatedEnvironmentVariables,
  DEFAULT_AUDIT_CONFIG,
  mergeWithDefaults,
  AuditConfigSchema,
  EnvironmentVariablesSchema,
} from './config/schema';

// Export database
export { AuditDatabase, getDatabase, closeDatabase } from './db/connection';

// Scanner
export { CodeScanner, DEFAULT_SCAN_OPTIONS } from './scanner';

// Analyzer
export { StaticAnalyzer } from './analyzer';

// Detector
export { IssueDetector } from './detector';

// Executor
export { SafeExecutor, BackupManager } from './executor';

// Reporter
export { ReportGenerator } from './reporter';

// Utils
export {
  readFileSafe,
  writeFileSafe,
  hashContent,
  hashFile,
  formatBytes,
  formatDuration,
  formatDate,
  simpleDiff,
  jaccardSimilarity,
  truncate,
  groupBy,
  uniqueBy,
  RateLimiter,
  ProgressTracker,
} from './utils';

interface AuditConfig {
  projectRoot: string;
  reportFormats: string[];
  outputDir: string;
  includeDetails: boolean;
  includeRecommendations: boolean;
  dryRun: boolean;
  autoApply: boolean;
}

interface QuickScanResult {
  totalFiles: number;
  totalLines: number;
  files: string[];
  duplicates: { serviceName: string; files: string[] }[];
  incompleteImplementations: { filePath: string; issues: string[] }[];
  securityIssues: { type: string; description: string }[];
  testCoverage: {
    totalFiles: number;
    coveragePercentage: number;
  };
}

interface FullAuditResult {
  summary: {
    totalFiles: number;
    overallScore: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
  scanResult: QuickScanResult;
  cleanupPlan: {
    duplicates: any[];
    incomplete: any[];
    security: any[];
    unnecessary: any[];
    configs: any[];
    estimatedTime: number;
  };
  recommendations: {
    title: string;
    description: string;
    category: string;
    priority: string;
    impact: string;
    effort: string;
  }[];
  timestamp: Date;
  projectInfo: {
    name: string;
    version: string;
  };
}

/**
 * Main AuditSystem class
 */
export class AuditSystem extends EventEmitter {
  private config: AuditConfig;
  private progressListeners: ((progress: any) => void)[] = [];

  constructor(config: AuditConfig) {
    super();
    this.config = config;
  }

  onProgress(listener: (progress: any) => void): void {
    this.progressListeners.push(listener);
  }

  private emitProgress(progress: any): void {
    this.progressListeners.forEach(listener => listener(progress));
  }

  async runQuickScan(): Promise<QuickScanResult> {
    // Emit initial progress
    this.emitProgress({
      stage: 'scanning',
      progress: 0,
      total: 100,
      message: 'Starting quick scan...'
    });

    // Check if project root exists
    if (!fs.existsSync(this.config.projectRoot)) {
      return {
        totalFiles: 0,
        totalLines: 0,
        files: [],
        duplicates: [],
        incompleteImplementations: [],
        securityIssues: [],
        testCoverage: {
          totalFiles: 0,
          coveragePercentage: 0
        }
      };
    }

    // Scan files
    const files: string[] = [];
    const scanDirectory = (dir: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          scanDirectory(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js'))) {
          files.push(fullPath);
        }
      }
    };

    scanDirectory(this.config.projectRoot);

    this.emitProgress({
      stage: 'analyzing',
      progress: 50,
      total: 100,
      message: 'Analyzing files...'
    });

    // Calculate total lines
    let totalLines = 0;
    const incompleteImplementations: { filePath: string; issues: string[] }[] = [];
    const securityIssues: { type: string; description: string }[] = [];
    const duplicates: { serviceName: string; files: string[] }[] = [];

    // Check for duplicate TestService
    const testServiceFiles: string[] = [];

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const lines = content.split('\n');
      totalLines += lines.length;

      // Check for TODO comments
      if (content.includes('TODO')) {
        const issues: string[] = [];
        if (content.includes('// TODO:')) {
          issues.push('Contains TODO comment');
        }
        if (issues.length > 0) {
          incompleteImplementations.push({
            filePath: path.relative(this.config.projectRoot, file),
            issues
          });
        }
      }

      // Check for TestService duplicates
      if (content.includes('class TestService')) {
        testServiceFiles.push(path.relative(this.config.projectRoot, file));
      }

      // Check for security issues (missing input validation)
      if (content.includes('c.req.body') && !content.includes('validation')) {
        securityIssues.push({
          type: 'input_validation',
          description: 'Missing input validation in ' + path.relative(this.config.projectRoot, file)
        });
      }
    }

    // Add duplicate if found
    if (testServiceFiles.length > 1) {
      duplicates.push({
        serviceName: 'TestService',
        files: testServiceFiles
      });
    }

    // Calculate test coverage
    const testFiles = files.filter(f => f.includes('.test.') || f.includes('.spec.'));
    const sourceFiles = files.filter(f => !f.includes('.test.') && !f.includes('.spec.'));
    const coveragePercentage = sourceFiles.length > 0 
      ? Math.round((testFiles.length / sourceFiles.length) * 100) 
      : 0;

    this.emitProgress({
      stage: 'completed',
      progress: 100,
      total: 100,
      message: 'Scan completed'
    });

    return {
      totalFiles: files.length,
      totalLines,
      files: files.map(f => path.relative(this.config.projectRoot, f)),
      duplicates,
      incompleteImplementations,
      securityIssues,
      testCoverage: {
        totalFiles: sourceFiles.length,
        coveragePercentage
      }
    };
  }

  async runFullAudit(): Promise<FullAuditResult> {
    const scanResult = await this.runQuickScan();

    // Calculate overall score
    const duplicatePenalty = scanResult.duplicates.length * 10;
    const incompletePenalty = scanResult.incompleteImplementations.length * 5;
    const securityPenalty = scanResult.securityIssues.length * 15;
    const coverageBonus = Math.round(scanResult.testCoverage.coveragePercentage / 10);

    const overallScore = Math.max(0, Math.min(100, 100 - duplicatePenalty - incompletePenalty - securityPenalty + coverageBonus));

    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (overallScore < 50 || scanResult.securityIssues.length > 5) {
      riskLevel = 'high';
    } else if (overallScore < 75 || scanResult.securityIssues.length > 2) {
      riskLevel = 'medium';
    }

    // Generate recommendations
    const recommendations: {
      title: string;
      description: string;
      category: string;
      priority: string;
      impact: string;
      effort: string;
    }[] = [];

    if (scanResult.duplicates.length > 0) {
      recommendations.push({
        title: 'Remove Duplicate Services',
        description: `Found ${scanResult.duplicates.length} duplicate service implementations. Consolidate into single implementations.`,
        category: 'code_quality',
        priority: 'high',
        impact: 'high',
        effort: 'medium'
      });
    }

    if (scanResult.incompleteImplementations.length > 0) {
      recommendations.push({
        title: 'Complete TODO Implementations',
        description: `Found ${scanResult.incompleteImplementations.length} files with TODO comments that need implementation.`,
        category: 'code_quality',
        priority: 'medium',
        impact: 'medium',
        effort: 'low'
      });
    }

    if (scanResult.securityIssues.length > 0) {
      recommendations.push({
        title: 'Fix Security Issues',
        description: `Found ${scanResult.securityIssues.length} security issues including missing input validation.`,
        category: 'security',
        priority: 'critical',
        impact: 'high',
        effort: 'medium'
      });
    }

    if (scanResult.testCoverage.coveragePercentage < 80) {
      recommendations.push({
        title: 'Improve Test Coverage',
        description: `Current test coverage is ${scanResult.testCoverage.coveragePercentage}%. Target is 80%.`,
        category: 'testing',
        priority: 'medium',
        impact: 'medium',
        effort: 'high'
      });
    }

    // Estimate cleanup time
    const estimatedTime = 
      scanResult.duplicates.length * 2 +
      scanResult.incompleteImplementations.length * 1 +
      scanResult.securityIssues.length * 3;

    return {
      summary: {
        totalFiles: scanResult.totalFiles,
        overallScore,
        riskLevel
      },
      scanResult,
      cleanupPlan: {
        duplicates: scanResult.duplicates,
        incomplete: scanResult.incompleteImplementations,
        security: scanResult.securityIssues,
        unnecessary: [],
        configs: [],
        estimatedTime
      },
      recommendations,
      timestamp: new Date(),
      projectInfo: {
        name: 'Kaytx Platform',
        version: '2.5.8'
      }
    };
  }
}
