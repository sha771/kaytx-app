/**
 * Reporter Module
 * Generates audit reports in JSON, Markdown, and HTML formats
 */

import type {
  SummaryReport,
  DetailedReport,
  ProgressReport,
  CertificationReport,
  CertificationCriteria,
  Issue,
  IssueSeverity,
  IssueType,
  Recommendation,
  FileMetrics,
  DependencyGraph,
  ReportFormat,
} from '../models/types';

export class ReportGenerator {
  /**
   * Generate a summary report from detected issues
   */
  generateSummary(issues: Issue[], timestamp?: Date): SummaryReport {
    const issuesBySeverity = new Map<IssueSeverity, number>();
    const issuesByType = new Map<IssueType, number>();
    let estimatedEffort = 0;

    for (const issue of issues) {
      issuesBySeverity.set(issue.severity, (issuesBySeverity.get(issue.severity) || 0) + 1);
      issuesByType.set(issue.type, (issuesByType.get(issue.type) || 0) + 1);
      estimatedEffort += issue.estimatedEffort;
    }

    // Sort issues by severity, then effort
    const severityOrder: Record<IssueSeverity, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    const topIssues = [...issues]
      .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity] || b.estimatedEffort - a.estimatedEffort)
      .slice(0, 10);

    return {
      timestamp: timestamp || new Date(),
      totalIssues: issues.length,
      issuesBySeverity,
      issuesByType,
      estimatedEffort,
      topIssues,
    };
  }

  /**
   * Generate a detailed report
   */
  generateDetailed(
    issues: Issue[],
    fileMetrics: FileMetrics[],
    dependencyGraph?: DependencyGraph,
  ): DetailedReport {
    const summary = this.generateSummary(issues);
    const recommendations = this.generateRecommendations(issues, fileMetrics);

    return {
      ...summary,
      allIssues: issues,
      fileMetrics,
      dependencyGraph: dependencyGraph || { nodes: [], edges: [], cycles: [] },
      recommendations,
    };
  }

  /**
   * Generate a certification report (production readiness)
   */
  generateCertification(issues: Issue[], coverage: number): CertificationReport {
    const criteria: CertificationCriteria = {
      minimumCoverage: 50,
      maxCriticalIssues: 0,
      maxHighIssues: 3,
      maxSecurityIssues: 1,
      requiresDocumentation: true,
    };

    const critical = issues.filter(i => i.severity === 'critical').length;
    const high = issues.filter(i => i.severity === 'high').length;
    const security = issues.filter(i => i.type === 'security_issue').length;

    const productionReady =
      coverage >= criteria.minimumCoverage &&
      critical <= criteria.maxCriticalIssues &&
      high <= criteria.maxHighIssues &&
      security <= criteria.maxSecurityIssues;

    const recommendations: string[] = [];
    if (coverage < criteria.minimumCoverage) recommendations.push(`Increase test coverage from ${coverage.toFixed(1)}% to ${criteria.minimumCoverage}%`);
    if (critical > 0) recommendations.push(`Resolve ${critical} critical issues`);
    if (high > criteria.maxHighIssues) recommendations.push(`Reduce high-severity issues from ${high} to ${criteria.maxHighIssues}`);
    if (security > 0) recommendations.push(`Address ${security} security issues`);

    return {
      timestamp: new Date(),
      productionReady,
      testCoverage: coverage,
      criticalIssues: critical,
      highIssues: high,
      securityIssues: security,
      documentationComplete: false,
      recommendations,
      certificationCriteria: criteria,
    };
  }

  /**
   * Generate a progress report comparing two scans
   */
  generateProgress(
    previousIssues: Issue[],
    currentIssues: Issue[],
    previousCoverage: number,
    currentCoverage: number,
    timeSpent: number,
  ): ProgressReport {
    const resolvedCount = previousIssues.filter(
      pi => !currentIssues.some(ci => ci.id === pi.id || (ci.filePath === pi.filePath && ci.type === pi.type))
    ).length;

    const newIssues = currentIssues.filter(
      ci => !previousIssues.some(pi => pi.id === ci.id || (ci.filePath === pi.filePath && pi.type === ci.type))
    ).length;

    const remainingEstimate = currentIssues.reduce((sum, i) => sum + i.estimatedEffort, 0);

    return {
      timestamp: new Date(),
      issuesResolved: resolvedCount,
      issuesRemaining: currentIssues.length,
      newIssues,
      coverageImprovement: currentCoverage - previousCoverage,
      timeSpent,
      estimatedTimeRemaining: remainingEstimate,
    };
  }

  /**
   * Render a report to a specific format
   */
  renderReport(report: SummaryReport | DetailedReport, format: ReportFormat): string {
    switch (format) {
      case 'json':
        return JSON.stringify(report, (key, value) => {
          if (value instanceof Map) return Object.fromEntries(value);
          return value;
        }, 2);

      case 'markdown':
        return this.renderMarkdown(report as SummaryReport);

      case 'html':
        return this.renderHtml(report as SummaryReport);

      default:
        return JSON.stringify(report);
    }
  }

  private generateRecommendations(issues: Issue[], fileMetrics: FileMetrics[]): Recommendation[] {
    const recommendations: Recommendation[] = [];
    let priority = 1;

    // Security first
    const securityIssues = issues.filter(i => i.type === 'security_issue');
    if (securityIssues.length > 0) {
      recommendations.push({
        priority: priority++,
        category: 'Security',
        title: 'Address security vulnerabilities',
        description: `Found ${securityIssues.length} security issues including potential injection, hardcoded secrets, and XSS risks.`,
        estimatedImpact: 'Critical — prevents production deployment',
        relatedIssues: securityIssues.map(i => i.id),
      });
    }

    // Test coverage
    const coverageGaps = issues.filter(i => i.type === 'test_coverage_gap');
    if (coverageGaps.length > 0) {
      recommendations.push({
        priority: priority++,
        category: 'Testing',
        title: 'Increase test coverage',
        description: `${coverageGaps.length} modules lack adequate test coverage. Target 80% coverage.`,
        estimatedImpact: 'High — improves reliability and refactoring confidence',
        relatedIssues: coverageGaps.map(i => i.id),
      });
    }

    // Code duplication
    const duplicates = issues.filter(i => i.type === 'duplicate_service');
    if (duplicates.length > 0) {
      recommendations.push({
        priority: priority++,
        category: 'Code Quality',
        title: 'Consolidate duplicate services',
        description: `Found ${duplicates.length} duplicate service implementations. Consolidation will reduce maintenance burden.`,
        estimatedImpact: 'Medium — reduces code surface and bug count',
        relatedIssues: duplicates.map(i => i.id),
      });
    }

    // Incomplete implementations
    const incomplete = issues.filter(i => i.type === 'incomplete_implementation');
    if (incomplete.length > 0) {
      recommendations.push({
        priority: priority++,
        category: 'Code Quality',
        title: 'Complete stub implementations',
        description: `${incomplete.length} files have TODO/FIXME comments or throw "not implemented". Complete or remove.`,
        estimatedImpact: 'Medium — ensures feature completeness',
        relatedIssues: incomplete.map(i => i.id),
      });
    }

    // High complexity
    const highComplexity = fileMetrics.filter(f => f.complexity.cyclomaticComplexity > 20);
    if (highComplexity.length > 0) {
      recommendations.push({
        priority: priority++,
        category: 'Maintainability',
        title: 'Reduce code complexity',
        description: `${highComplexity.length} files exceed cyclomatic complexity threshold of 20. Consider refactoring.`,
        estimatedImpact: 'Medium — improves readability and testability',
        relatedIssues: [],
      });
    }

    return recommendations;
  }

  private renderMarkdown(report: SummaryReport): string {
    const severityIcons: Record<string, string> = { critical: '🔴', high: '🟠', medium: '🟡', low: '🟢' };
    let md = `# Audit Report\n\n`;
    md += `**Date:** ${report.timestamp.toISOString()}\n\n`;
    md += `## Summary\n\n`;
    md += `| Metric | Value |\n|---|---|\n`;
    md += `| Total Issues | ${report.totalIssues} |\n`;
    md += `| Estimated Effort | ${report.estimatedEffort}h |\n\n`;

    md += `## Issues by Severity\n\n`;
    md += `| Severity | Count |\n|---|---|\n`;
    for (const [severity, count] of report.issuesBySeverity) {
      md += `| ${severityIcons[severity] || ''} ${severity} | ${count} |\n`;
    }

    md += `\n## Top Issues\n\n`;
    for (const issue of report.topIssues) {
      md += `- ${severityIcons[issue.severity] || ''} **${issue.title}** (${issue.severity}) — ${issue.filePath || 'N/A'}\n`;
    }

    return md;
  }

  private renderHtml(report: SummaryReport): string {
    return `<!DOCTYPE html>
<html><head><title>Audit Report - ${report.timestamp.toISOString().split('T')[0]}</title>
<style>
body{font-family:system-ui;max-width:900px;margin:2rem auto;padding:0 1rem;color:#333}
h1{border-bottom:2px solid #333;padding-bottom:.5rem}
table{border-collapse:collapse;width:100%;margin:1rem 0}
th,td{border:1px solid #ddd;padding:.5rem;text-align:left}
th{background:#f5f5f5}
.critical{color:#dc2626}.high{color:#ea580c}.medium{color:#ca8a04}.low{color:#16a34a}
</style></head>
<body>
<h1>🔑 Audit Report</h1>
<p><strong>Date:</strong> ${report.timestamp.toISOString()}</p>
<h2>Summary</h2>
<table><tr><th>Total Issues</th><th>Estimated Effort</th></tr>
<tr><td>${report.totalIssues}</td><td>${report.estimatedEffort}h</td></tr></table>
<h2>Top Issues</h2>
<ul>${report.topIssues.map(i => `<li class="${i.severity}"><strong>${i.title}</strong> (${i.severity})</li>`).join('')}</ul>
</body></html>`;
  }
}
