import { ScanResult, CleanupPlan } from './code-scanner';
import { logger } from './production-logger';
import * as fs from 'fs';
import * as path from 'path';

export interface ReportOptions {
  format: 'json' | 'markdown' | 'html';
  outputPath: string;
  includeDetails: boolean;
  includeRecommendations: boolean;
}

export interface AuditReport {
  summary: ReportSummary;
  scanResult: ScanResult;
  cleanupPlan: CleanupPlan;
  recommendations: Recommendation[];
  timestamp: string;
  projectInfo: ProjectInfo;
}

export interface ReportSummary {
  totalFiles: number;
  totalLines: number;
  duplicatesFound: number;
  incompleteImplementations: number;
  securityIssues: number;
  unnecessaryFiles: number;
  configConflicts: number;
  testCoverage: number;
  estimatedCleanupTime: number;
  riskLevel: 'low' | 'medium' | 'high';
  overallScore: number;
}

export interface Recommendation {
  category: 'immediate' | 'short_term' | 'long_term';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  effort: string;
  files: string[];
}

export interface ProjectInfo {
  name: string;
  version: string;
  root: string;
  scanDuration: number;
  lastModified: string;
}

export class ReportGenerator {
  constructor(private projectRoot: string) {}

  async generateReport(
    scanResult: ScanResult,
    cleanupPlan: CleanupPlan,
    options: ReportOptions
  ): Promise<string> {
    const report: AuditReport = {
      summary: this.generateSummary(scanResult, cleanupPlan),
      scanResult,
      cleanupPlan,
      recommendations: this.generateRecommendations(scanResult, cleanupPlan),
      timestamp: new Date().toISOString(),
      projectInfo: await this.getProjectInfo()
    };

    let reportContent: string;

    switch (options.format) {
      case 'json':
        reportContent = this.generateJSONReport(report, options);
        break;
      case 'markdown':
        reportContent = this.generateMarkdownReport(report, options);
        break;
      case 'html':
        reportContent = this.generateHTMLReport(report, options);
        break;
      default:
        throw new Error(`Unsupported report format: ${options.format}`);
    }

    // Write report to file
    const outputPath = path.resolve(this.projectRoot, options.outputPath);
    fs.writeFileSync(outputPath, reportContent);

    return outputPath;
  }

  private generateSummary(scanResult: ScanResult, cleanupPlan: CleanupPlan): ReportSummary {
    const overallScore = this.calculateOverallScore(scanResult, cleanupPlan);

    return {
      totalFiles: scanResult.totalFiles,
      totalLines: scanResult.totalLines,
      duplicatesFound: scanResult.duplicates.length,
      incompleteImplementations: scanResult.incompleteImplementations.length,
      securityIssues: scanResult.securityIssues.length,
      unnecessaryFiles: scanResult.unnecessaryFiles.length,
      configConflicts: scanResult.configConflicts.length,
      testCoverage: scanResult.testCoverage.coveragePercentage,
      estimatedCleanupTime: cleanupPlan.estimatedTime,
      riskLevel: cleanupPlan.riskLevel,
      overallScore
    };
  }

  private calculateOverallScore(scanResult: ScanResult, cleanupPlan: CleanupPlan): number {
    let score = 100;

    // Deduct points for issues
    score -= scanResult.duplicates.length * 5;
    score -= scanResult.incompleteImplementations.length * 10;
    score -= scanResult.securityIssues.filter(s => s.severity === 'critical').length * 20;
    score -= scanResult.securityIssues.filter(s => s.severity === 'high').length * 10;
    score -= scanResult.securityIssues.filter(s => s.severity === 'medium').length * 5;
    score -= scanResult.configConflicts.length * 3;
    score -= (100 - scanResult.testCoverage.coveragePercentage) * 0.5;

    // Bonus for good practices
    if (scanResult.testCoverage.coveragePercentage > 80) score += 5;
    if (cleanupPlan.riskLevel === 'low') score += 5;

    return Math.max(0, Math.round(score));
  }

  private generateRecommendations(scanResult: ScanResult, cleanupPlan: CleanupPlan): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Critical security issues
    const criticalSecurity = scanResult.securityIssues.filter(s => s.severity === 'critical');
    if (criticalSecurity.length > 0) {
      recommendations.push({
        category: 'immediate',
        priority: 'critical',
        title: 'Fix Critical Security Issues',
        description: `Address ${criticalSecurity.length} critical security vulnerabilities immediately`,
        impact: 'High - Prevents potential security breaches',
        effort: `${criticalSecurity.length * 60} minutes`,
        files: criticalSecurity.map(s => s.filePath)
      });
    }

    // Duplicate services
    if (scanResult.duplicates.length > 0) {
      recommendations.push({
        category: 'immediate',
        priority: 'high',
        title: 'Consolidate Duplicate Services',
        description: `Merge or remove ${scanResult.duplicates.length} duplicate service implementations`,
        impact: 'Medium - Reduces maintenance overhead and improves consistency',
        effort: `${scanResult.duplicates.length * 45} minutes`,
        files: scanResult.duplicates.flatMap(d => d.files)
      });
    }

    // Incomplete implementations
    const highPriorityIncomplete = scanResult.incompleteImplementations.filter(i => i.priority === 'high');
    if (highPriorityIncomplete.length > 0) {
      recommendations.push({
        category: 'short_term',
        priority: 'high',
        title: 'Complete High-Priority Implementations',
        description: `Finish ${highPriorityIncomplete.length} incomplete high-priority implementations`,
        impact: 'High - Enables critical functionality',
        effort: `${highPriorityIncomplete.reduce((sum, i) => sum + (100 - i.completionPercentage), 0)} minutes`,
        files: highPriorityIncomplete.map(i => i.filePath)
      });
    }

    // Test coverage
    if (scanResult.testCoverage.coveragePercentage < 80) {
      recommendations.push({
        category: 'short_term',
        priority: 'medium',
        title: 'Improve Test Coverage',
        description: `Increase test coverage from ${scanResult.testCoverage.coveragePercentage.toFixed(1)}% to 80%`,
        impact: 'Medium - Improves code reliability and maintainability',
        effort: `${(80 - scanResult.testCoverage.coveragePercentage) * 10} minutes`,
        files: scanResult.testCoverage.untestedFiles
      });
    }

    // Config conflicts
    if (scanResult.configConflicts.length > 0) {
      recommendations.push({
        category: 'short_term',
        priority: 'medium',
        title: 'Resolve Configuration Conflicts',
        description: `Merge ${scanResult.configConflicts.length} conflicting configuration files`,
        impact: 'Medium - Ensures consistent behavior across environments',
        effort: `${scanResult.configConflicts.length * 30} minutes`,
        files: scanResult.configConflicts.flatMap(c => c.files)
      });
    }

    // Unnecessary files
    const safeToDelete = scanResult.unnecessaryFiles.filter(f => f.safeToDelete);
    if (safeToDelete.length > 0) {
      recommendations.push({
        category: 'long_term',
        priority: 'low',
        title: 'Remove Unnecessary Files',
        description: `Clean up ${safeToDelete.length} unnecessary files to reduce clutter`,
        impact: 'Low - Improves project organization',
        effort: `${safeToDelete.length * 10} minutes`,
        files: safeToDelete.map(f => f.filePath)
      });
    }

    return recommendations;
  }

  private async getProjectInfo(): Promise<ProjectInfo> {
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    let name = 'Unknown Project';
    let version = '1.0.0';

    try {
      if (fs.existsSync(packageJsonPath)) {
        const content = fs.readFileSync(packageJsonPath, 'utf-8');
        const packageJson = JSON.parse(content);
        name = packageJson.name || name;
        version = packageJson.version || version;
      }
    } catch (error) {
      logger.warn('Could not read package.json', { error });
    }

    return {
      name,
      version,
      root: this.projectRoot,
      scanDuration: 0,
      lastModified: new Date().toISOString()
    };
  }

  private generateJSONReport(report: AuditReport, options: ReportOptions): string {
    // Create a clean copy without circular references
    const cleanReport = {
      ...report,
      scanResult: {
        ...report.scanResult,
        files: report.scanResult.files.map(file => ({
          ...file,
          ast: undefined // Remove AST to avoid circular references
        }))
      }
    };
    return JSON.stringify(cleanReport, null, 2);
  }

  private generateMarkdownReport(report: AuditReport, options: ReportOptions): string {
    const { summary, scanResult, cleanupPlan, recommendations, timestamp, projectInfo } = report;

    return `# ${projectInfo.name} - Audit Report

**Generated:** ${new Date(timestamp).toLocaleString()}  
**Version:** ${projectInfo.version}  
**Risk Level:** ${cleanupPlan.riskLevel.toUpperCase()}  
**Overall Score:** ${summary.overallScore}/100

## 📊 Executive Summary

| Metric | Value |
|--------|-------|
| **Total Files** | ${summary.totalFiles} |
| **Total Lines** | ${summary.totalLines.toLocaleString()} |
| **Duplicate Services** | ${summary.duplicatesFound} |
| **Incomplete Implementations** | ${summary.incompleteImplementations} |
| **Security Issues** | ${summary.securityIssues} |
| **Unnecessary Files** | ${summary.unnecessaryFiles} |
| **Config Conflicts** | ${summary.configConflicts} |
| **Test Coverage** | ${summary.testCoverage.toFixed(1)}% |
| **Estimated Cleanup Time** | ${Math.round(summary.estimatedCleanupTime / 60)} hours |
| **Risk Level** | ${summary.riskLevel} |

## 🎯 Recommendations

${recommendations.map(rec => `
### ${rec.title} (${rec.priority.toUpperCase()})

**Category:** ${rec.category}  
**Impact:** ${rec.impact}  
**Effort:** ${rec.effort}  
**Files:** ${rec.files.length}

${rec.description}

${options.includeDetails ? `
**Affected Files:**
${rec.files.map(f => `- \`${f}\``).join('\n')}
` : ''}
`).join('')}

## 🔍 Detailed Findings

${options.includeDetails ? `
### Duplicate Services
${scanResult.duplicates.map(d => `
#### ${d.serviceName}
- **Files:** ${d.files.join(', ')}
- **Similarity:** ${(d.similarity * 100).toFixed(1)}%
- **Functions:** ${d.functions.join(', ')}
`).join('')}

### Incomplete Implementations
${scanResult.incompleteImplementations.map(i => `
#### ${i.filePath}
- **Completion:** ${i.completionPercentage}%
- **Priority:** ${i.priority}
- **Issues:** ${i.issues.join(', ')}
`).join('')}

### Security Issues
${scanResult.securityIssues.map(s => `
#### ${s.type} in ${s.filePath}
- **Severity:** ${s.severity}
- **Description:** ${s.description}
- **Recommendation:** ${s.recommendation}
`).join('')}

### Test Coverage
- **Total Source Files:** ${scanResult.testCoverage.totalFiles}
- **Tested Files:** ${scanResult.testCoverage.testedFiles}
- **Coverage:** ${scanResult.testCoverage.coveragePercentage.toFixed(1)}%
- **Untested Files:** ${scanResult.testCoverage.untestedFiles.length}

**Untested Files:**
${scanResult.testCoverage.untestedFiles.map(f => `- \`${f}\``).join('\n')}
` : ''}

## 🛠️ Cleanup Plan

${options.includeRecommendations ? `
The cleanup plan includes:
- **${cleanupPlan.duplicates.length}** duplicate service consolidations
- **${cleanupPlan.incomplete.length}** incomplete implementation fixes
- **${cleanupPlan.security.length}** security issue resolutions
- **${cleanupPlan.unnecessary.length}** unnecessary file removals
- **${cleanupPlan.configs.length}** configuration conflict resolutions

**Total Estimated Time:** ${Math.round(cleanupPlan.estimatedTime / 60)} hours
` : ''}

---
*Report generated by kaytx Audit System*
`;
  }

  private generateHTMLReport(report: AuditReport, options: ReportOptions): string {
    const { summary, scanResult, cleanupPlan, recommendations, timestamp, projectInfo } = report;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectInfo.name} - Audit Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 2.5em; }
        .header .meta { opacity: 0.9; margin-top: 10px; }
        .content { padding: 30px; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
        .summary-card { background: #f8f9fa; border-radius: 8px; padding: 20px; text-align: center; border-left: 4px solid #667eea; }
        .summary-card h3 { margin: 0 0 10px 0; color: #333; }
        .summary-card .value { font-size: 2em; font-weight: bold; color: #667eea; }
        .risk-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 0.9em; font-weight: bold; }
        .risk-low { background: #d4edda; color: #155724; }
        .risk-medium { background: #fff3cd; color: #856404; }
        .risk-high { background: #f8d7da; color: #721c24; }
        .score-badge { background: #667eea; color: white; padding: 8px 16px; border-radius: 25px; font-weight: bold; }
        .section { margin: 40px 0; }
        .section h2 { color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        .recommendation { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; }
        .recommendation h3 { margin: 0 0 10px 0; color: #333; }
        .priority-critical { border-left-color: #dc3545; }
        .priority-high { border-left-color: #fd7e14; }
        .priority-medium { border-left-color: #ffc107; }
        .priority-low { border-left-color: #28a745; }
        .file-list { background: #f8f9fa; border-radius: 4px; padding: 10px; margin: 10px 0; font-family: monospace; font-size: 0.9em; }
        .progress-bar { background: #e9ecef; border-radius: 10px; height: 20px; overflow: hidden; margin: 10px 0; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); transition: width 0.3s ease; }
        .details { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .details h3 { margin: 0 0 15px 0; color: #333; }
        .details ul { margin: 0; padding-left: 20px; }
        .details li { margin: 5px 0; }
        @media (max-width: 768px) {
            .summary-grid { grid-template-columns: 1fr; }
            .container { margin: 10px; }
            .content { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${projectInfo.name} Audit Report</h1>
            <div class="meta">
                Generated: ${new Date(timestamp).toLocaleString()} | 
                Version: ${projectInfo.version} | 
                Risk Level: <span class="risk-badge risk-${summary.riskLevel}">${summary.riskLevel.toUpperCase()}</span> |
                Score: <span class="score-badge">${summary.overallScore}/100</span>
            </div>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>📊 Executive Summary</h2>
                <div class="summary-grid">
                    <div class="summary-card">
                        <h3>Total Files</h3>
                        <div class="value">${summary.totalFiles.toLocaleString()}</div>
                    </div>
                    <div class="summary-card">
                        <h3>Duplicates</h3>
                        <div class="value">${summary.duplicatesFound}</div>
                    </div>
                    <div class="summary-card">
                        <h3>Security Issues</h3>
                        <div class="value">${summary.securityIssues}</div>
                    </div>
                    <div class="summary-card">
                        <h3>Test Coverage</h3>
                        <div class="value">${summary.testCoverage.toFixed(1)}%</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${summary.testCoverage}%"></div>
                        </div>
                    </div>
                    <div class="summary-card">
                        <h3>Cleanup Time</h3>
                        <div class="value">${Math.round(summary.estimatedCleanupTime / 60)}h</div>
                    </div>
                    <div class="summary-card">
                        <h3>Overall Score</h3>
                        <div class="value">${summary.overallScore}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>🎯 Recommendations</h2>
                ${recommendations.map(rec => `
                    <div class="recommendation priority-${rec.priority}">
                        <h3>${rec.title} <span class="risk-badge risk-${rec.priority}">${rec.priority.toUpperCase()}</span></h3>
                        <p><strong>Category:</strong> ${rec.category}</p>
                        <p><strong>Impact:</strong> ${rec.impact}</p>
                        <p><strong>Effort:</strong> ${rec.effort}</p>
                        <p>${rec.description}</p>
                        ${options.includeDetails && rec.files.length > 0 ? `
                            <p><strong>Affected Files (${rec.files.length}):</strong></p>
                            <div class="file-list">${rec.files.join('<br>')}</div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>

            ${options.includeDetails ? `
                <div class="section">
                    <h2>🔍 Detailed Findings</h2>
                    
                    ${scanResult.duplicates.length > 0 ? `
                        <div class="details">
                            <h3>🔄 Duplicate Services (${scanResult.duplicates.length})</h3>
                            ${scanResult.duplicates.map(d => `
                                <p><strong>${d.serviceName}</strong> - ${(d.similarity * 100).toFixed(1)}% similar</p>
                                <ul>
                                    <li>Files: ${d.files.join(', ')}</li>
                                    <li>Functions: ${d.functions.join(', ')}</li>
                                </ul>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${scanResult.securityIssues.length > 0 ? `
                        <div class="details">
                            <h3>🔒 Security Issues (${scanResult.securityIssues.length})</h3>
                            ${scanResult.securityIssues.map(s => `
                                <p><strong>${s.type}</strong> in <code>${s.filePath}</code> - <span class="risk-badge risk-${s.severity}">${s.severity.toUpperCase()}</span></p>
                                <ul>
                                    <li>${s.description}</li>
                                    <li><strong>Recommendation:</strong> ${s.recommendation}</li>
                                </ul>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${scanResult.incompleteImplementations.length > 0 ? `
                        <div class="details">
                            <h3>⚠️ Incomplete Implementations (${scanResult.incompleteImplementations.length})</h3>
                            ${scanResult.incompleteImplementations.map(i => `
                                <p><strong>${i.filePath}</strong> - ${i.completionPercentage}% complete</p>
                                <ul>
                                    <li>Priority: ${i.priority}</li>
                                    <li>Issues: ${i.issues.join(', ')}</li>
                                </ul>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            ` : ''}

            <div class="section">
                <h2>🛠️ Cleanup Plan Summary</h2>
                <div class="summary-grid">
                    <div class="summary-card">
                        <h3>Duplicate Consolidations</h3>
                        <div class="value">${cleanupPlan.duplicates.length}</div>
                    </div>
                    <div class="summary-card">
                        <h3>Incomplete Fixes</h3>
                        <div class="value">${cleanupPlan.incomplete.length}</div>
                    </div>
                    <div class="summary-card">
                        <h3>Security Fixes</h3>
                        <div class="value">${cleanupPlan.security.length}</div>
                    </div>
                    <div class="summary-card">
                        <h3>File Removals</h3>
                        <div class="value">${cleanupPlan.unnecessary.length}</div>
                    </div>
                    <div class="summary-card">
                        <h3>Config Resolutions</h3>
                        <div class="value">${cleanupPlan.configs.length}</div>
                    </div>
                    <div class="summary-card">
                        <h3>Total Time</h3>
                        <div class="value">${Math.round(cleanupPlan.estimatedTime / 60)}h</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
  }
}
