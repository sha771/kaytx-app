import { CodeScanner, ScanResult } from './code-scanner';
import { IssueDetector, CleanupPlan, CleanupEngine } from './issue-detectors';
import { ReportGenerator, ReportOptions, AuditReport } from './report-generator';
import { logger } from './production-logger';
import * as path from 'path';

export interface AuditOptions {
  projectRoot: string;
  reportFormats: ('json' | 'markdown' | 'html')[];
  outputDir: string;
  includeDetails: boolean;
  includeRecommendations: boolean;
  dryRun: boolean;
  autoApply: boolean;
}

export interface AuditProgress {
  stage: string;
  progress: number;
  total: number;
  message: string;
}

export class AuditSystem {
  private scanner: CodeScanner;
  private engine: CleanupEngine;
  private reporter: ReportGenerator;
  private progressCallbacks: ((progress: AuditProgress) => void)[] = [];

  constructor(private options: AuditOptions) {
    this.scanner = new CodeScanner(options.projectRoot);
    this.engine = new CleanupEngine(options.projectRoot);
    this.reporter = new ReportGenerator(options.projectRoot);
  }

  onProgress(callback: (progress: AuditProgress) => void): void {
    this.progressCallbacks.push(callback);
  }

  async runFullAudit(): Promise<AuditReport> {
    const startTime = Date.now();
    
    try {
      this.updateProgress('scan', 0, 100, 'Starting comprehensive audit...');
      
      // Stage 1: Scan project
      this.updateProgress('scan', 10, 100, 'Scanning project structure...');
      const scanResult = await this.scanner.scanProject();
      
      // Stage 2: Analyze issues and generate cleanup plan
      this.updateProgress('analysis', 30, 100, 'Analyzing issues and generating cleanup plan...');
      const detector = new IssueDetector(scanResult);
      const cleanupPlanResult = detector.generateCleanupPlan();
      
      // Stage 3: Generate reports
      this.updateProgress('reports', 60, 100, 'Generating audit reports...');
      await this.generateReports(scanResult, cleanupPlanResult);
      
      // Stage 4: Execute cleanup if requested
      if (this.options.autoApply && !this.options.dryRun) {
        this.updateProgress('cleanup', 80, 100, 'Executing cleanup plan...');
        await this.engine.executeCleanupPlan(cleanupPlanResult, this.options.dryRun);
      }
      
      this.updateProgress('complete', 100, 100, 'Audit completed successfully!');
      
      // Create final audit report
      const auditReport: AuditReport = {
        summary: {
          totalFiles: scanResult.totalFiles,
          totalLines: scanResult.totalLines,
          duplicatesFound: scanResult.duplicates.length,
          incompleteImplementations: scanResult.incompleteImplementations.length,
          securityIssues: scanResult.securityIssues.length,
          unnecessaryFiles: scanResult.unnecessaryFiles.length,
          configConflicts: scanResult.configConflicts.length,
          testCoverage: scanResult.testCoverage.coveragePercentage,
          estimatedCleanupTime: cleanupPlanResult.estimatedTime,
          riskLevel: cleanupPlanResult.riskLevel,
          overallScore: this.calculateOverallScore(scanResult, cleanupPlanResult)
        },
        scanResult,
        cleanupPlan: cleanupPlanResult,
        recommendations: cleanupPlanResult.duplicates.map(d => ({
          category: 'immediate' as const,
          priority: 'high' as const,
          title: `Consolidate ${d.serviceName}`,
          description: `Merge duplicate ${d.serviceName} implementations`,
          impact: 'Reduces maintenance overhead',
          effort: '45 minutes',
          files: d.files
        })),
        timestamp: new Date().toISOString(),
        projectInfo: {
          name: 'kaytx Platform',
          version: '1.0.0',
          root: this.options.projectRoot,
          scanDuration: Date.now() - startTime,
          lastModified: new Date().toISOString()
        }
      };
      
      return auditReport;
      
    } catch (error) {
      this.updateProgress('error', 0, 100, `Audit failed: ${error}`);
      throw error;
    }
  }

  async runQuickScan(): Promise<ScanResult> {
    this.updateProgress('scan', 0, 100, 'Running quick scan...');
    
    const scanResult = await this.scanner.scanProject();
    
    this.updateProgress('complete', 100, 100, 'Quick scan completed!');
    
    return scanResult;
  }

  async executeCleanup(cleanupPlan: CleanupPlan): Promise<void> {
    this.updateProgress('cleanup', 0, 100, 'Starting cleanup execution...');
    
    try {
      await this.engine.executeCleanupPlan(cleanupPlan, this.options.dryRun);
      
      this.updateProgress('complete', 100, 100, 'Cleanup completed successfully!');
    } catch (error) {
      this.updateProgress('error', 0, 100, `Cleanup failed: ${error}`);
      throw error;
    }
  }

  async rollbackCleanup(): Promise<void> {
    this.updateProgress('rollback', 0, 100, 'Starting rollback...');
    
    try {
      await this.engine.rollback();
      
      this.updateProgress('complete', 100, 100, 'Rollback completed successfully!');
    } catch (error) {
      this.updateProgress('error', 0, 100, `Rollback failed: ${error}`);
      throw error;
    }
  }

  private async generateReports(scanResult: ScanResult, cleanupPlan: CleanupPlan): Promise<string[]> {
    const reports: string[] = [];
    
    for (const format of this.options.reportFormats) {
      const outputPath = path.join(
        this.options.outputDir,
        `audit-report.${format}`
      );
      
      const reportPath = await this.reporter.generateReport(
        scanResult,
        cleanupPlan,
        {
          format,
          outputPath,
          includeDetails: this.options.includeDetails,
          includeRecommendations: this.options.includeRecommendations
        }
      );
      
      reports.push(reportPath);
    }
    
    return reports;
  }

  private calculateOverallScore(scanResult: ScanResult, cleanupPlan: CleanupPlan): number {
    let score = 100;

    // Deduct points for various issues
    score -= scanResult.duplicates.length * 5;
    score -= scanResult.incompleteImplementations.length * 10;
    score -= scanResult.securityIssues.filter(s => s.severity === 'critical').length * 20;
    score -= scanResult.securityIssues.filter(s => s.severity === 'high').length * 10;
    score -= scanResult.configConflicts.length * 3;
    score -= (100 - scanResult.testCoverage.coveragePercentage) * 0.5;

    // Bonus for good practices
    if (scanResult.testCoverage.coveragePercentage > 80) score += 5;
    if (cleanupPlan.riskLevel === 'low') score += 5;

    return Math.max(0, Math.round(score));
  }

  private updateProgress(stage: string, progress: number, total: number, message: string): void {
    const auditProgress: AuditProgress = {
      stage,
      progress,
      total,
      message
    };

    this.progressCallbacks.forEach(callback => callback(auditProgress));
  }

  getExecutionLog(): string[] {
    return this.engine.getExecutionLog();
  }
}

// CLI Interface
export class AuditCLI {
  static async run(args: string[]): Promise<void> {
    const options = this.parseArgs(args);
    const auditSystem = new AuditSystem(options);

    // Setup progress reporting
    auditSystem.onProgress((progress) => {
      const percentage = Math.round((progress.progress / progress.total) * 100);
      logger.info(`[${percentage}%] ${progress.message}`);
    });

    try {
      if (args.includes('--quick-scan')) {
        const result = await auditSystem.runQuickScan();
        logger.info('\n📊 Quick Scan Results:');
        logger.info(`- Files: ${result.totalFiles}`);
        logger.info(`- Duplicates: ${result.duplicates.length}`);
        logger.info(`- Security Issues: ${result.securityIssues.length}`);
        logger.info(`- Test Coverage: ${result.testCoverage.coveragePercentage.toFixed(1)}%`);
      } else {
        const report = await auditSystem.runFullAudit();
        
        logger.info('\n✅ Audit completed successfully!');
        logger.info(`📊 Overall Score: ${report.summary.overallScore}/100`);
        logger.info(`⏱️  Estimated Cleanup Time: ${Math.round(report.summary.estimatedCleanupTime / 60)} hours`);
        logger.info(`🚨 Risk Level: ${report.summary.riskLevel.toUpperCase()}`);
        
        if (report.summary.securityIssues > 0) {
          logger.info(`\n🔒 Security Issues Found: ${report.summary.securityIssues}`);
        }
        
        if (report.summary.duplicatesFound > 0) {
          logger.info(`\n🔄 Duplicate Services: ${report.summary.duplicatesFound}`);
        }
        
        logger.info('\n📄 Reports generated:');
        logger.info(`- JSON: audit-report.json`);
        logger.info(`- Markdown: audit-report.md`);
        logger.info(`- HTML: audit-report.html`);
      }
    } catch (error) {
      logger.error('❌ Audit failed', error instanceof Error ? error : undefined);
      process.exit(1);
    }
  }

  private static parseArgs(args: string[]): AuditOptions {
    const defaultOptions: AuditOptions = {
      projectRoot: process.cwd(),
      reportFormats: ['json', 'markdown', 'html'],
      outputDir: process.cwd(),
      includeDetails: true,
      includeRecommendations: true,
      dryRun: true,
      autoApply: false
    };

    // Simple argument parsing
    const options = { ...defaultOptions };
    
    if (args.includes('--apply')) {
      options.autoApply = true;
      options.dryRun = false;
    }
    
    if (args.includes('--no-details')) {
      options.includeDetails = false;
    }
    
    if (args.includes('--no-recommendations')) {
      options.includeRecommendations = false;
    }
    
    const outputDirIndex = args.indexOf('--output-dir');
    if (outputDirIndex !== -1 && args[outputDirIndex + 1]) {
      options.outputDir = args[outputDirIndex + 1];
    }

    return options;
  }
}

// Export for programmatic use
export * from './code-scanner';
export * from './issue-detectors';
export * from './report-generator';
