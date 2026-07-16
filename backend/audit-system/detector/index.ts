/**
 * Issue Detector Module
 * Detects code issues: duplicates, incomplete implementations, unused code, security, coverage gaps
 */

import type {
  Issue,
  IssueType,
  IssueSeverity,
  DuplicateServiceIssue,
  IncompleteImplementationIssue,
  TodoComment,
  UnusedCodeIssue,
  ConfigurationIssue,
  SecurityIssue,
  TestCoverageGapIssue,
  FileMetadata,
  DependencyGraph,
  DetectionConfig,
} from '../models/types';
import { nanoid } from 'nanoid';

const DEFAULT_DETECTION_CONFIG: DetectionConfig = {
  duplicateThreshold: 0.7,
  complexityThreshold: 20,
  coverageThreshold: 0.8,
  securityRules: [
    { id: 'no-eval', name: 'No eval()', severity: 'high', pattern: /\beval\s*\(/, description: 'Use of eval() is a security risk', owaspCategory: 'A03:2021' },
    { id: 'no-innerhtml', name: 'No innerHTML', severity: 'high', pattern: /innerHTML\s*=/, description: 'innerHTML usage can lead to XSS', owaspCategory: 'A03:2021' },
    { id: 'no-hardcoded-secret', name: 'No hardcoded secrets', severity: 'critical', pattern: /(password|secret|api_key|token)\s*[:=]\s*['"][^'"]+['"]/, description: 'Hardcoded credential detected', owaspCategory: 'A02:2021' },
    { id: 'no-sql-concat', name: 'No SQL string concatenation', severity: 'high', pattern: /SELECT.*\+\s*(?:req|params|query)/, description: 'Potential SQL injection via concatenation', owaspCategory: 'A03:2021' },
    { id: 'no-console-log-prod', name: 'No console.log in production', severity: 'low', pattern: /console\.(log|debug|info)\s*\(/, description: 'Console logging in production', owaspCategory: '' },
  ],
  enabledDetectors: [
    'duplicate_service', 'incomplete_implementation', 'unused_code',
    'configuration_issue', 'security_issue', 'test_coverage_gap',
  ],
};

export class IssueDetector {
  private config: DetectionConfig;
  private issues: Issue[] = [];

  constructor(config?: Partial<DetectionConfig>) {
    this.config = { ...DEFAULT_DETECTION_CONFIG, ...config };
  }

  /**
   * Run all enabled detectors against the scanned files
   */
  detect(files: FileMetadata[], graph?: DependencyGraph): Issue[] {
    this.issues = [];

    if (this.config.enabledDetectors.includes('duplicate_service')) {
      this.detectDuplicates(files);
    }
    if (this.config.enabledDetectors.includes('incomplete_implementation')) {
      this.detectIncompleteImplementations(files);
    }
    if (this.config.enabledDetectors.includes('unused_code')) {
      this.detectUnusedCode(files, graph);
    }
    if (this.config.enabledDetectors.includes('security_issue')) {
      this.detectSecurityIssues(files);
    }
    if (this.config.enabledDetectors.includes('test_coverage_gap')) {
      this.detectCoverageGaps(files);
    }
    if (this.config.enabledDetectors.includes('configuration_issue')) {
      this.detectConfigurationIssues(files);
    }

    return this.issues;
  }

  private detectDuplicates(files: FileMetadata[]): void {
    const exportMap = new Map<string, string[]>();

    for (const file of files) {
      for (const exp of file.exports) {
        const key = exp.name;
        if (!exportMap.has(key)) exportMap.set(key, []);
        exportMap.get(key)!.push(file.path);
      }
    }

    for (const [name, paths] of exportMap) {
      if (paths.length > 1) {
        this.issues.push({
          id: nanoid(),
          type: 'duplicate_service',
          severity: 'medium',
          status: 'open',
          title: `Duplicate export: "${name}"`,
          description: `Export "${name}" is defined in ${paths.length} files`,
          filePath: paths[0],
          lineNumber: null,
          detectedAt: new Date(),
          resolvedAt: null,
          estimatedEffort: 1,
          actualEffort: null,
          autoFixable: false,
          metadata: { 
            duplicateOf: paths[0], 
            overlapPercentage: 80, 
            sharedFunctions: [], 
            sharedTypes: [], 
            suggestedConsolidation: '' 
          },
        } as unknown as DuplicateServiceIssue);
      }
    }
  }

  private detectIncompleteImplementations(files: FileMetadata[]): void {
    for (const file of files) {
      let content: string;
      try {
        content = require('fs').readFileSync(file.path, 'utf-8');
      } catch {
        continue;
      }

      const todos: TodoComment[] = [];
      const todoRegex = /(TODO|FIXME|HACK|XXX):\s*(.+)/g;
      let match;
      while ((match = todoRegex.exec(content)) !== null) {
        todos.push({
          text: match[2].trim(),
          lineNumber: content.slice(0, match.index).split('\n').length,
          type: match[1] as 'TODO' | 'FIXME' | 'HACK' | 'XXX',
        });
      }

      const hasEmptyFunctions = /function\s+\w+\s*\([^)]*\)\s*\{\s*\}/.test(content);
      const hasThrowNotImplemented = /throw.*not implemented/i.test(content);
      const hasReturnNull = /return\s+null\s*;/.test(content) && content.length < 500;

      if (todos.length > 0 || hasEmptyFunctions || hasThrowNotImplemented) {
        this.issues.push({
          id: nanoid(),
          type: 'incomplete_implementation',
          severity: hasThrowNotImplemented ? 'high' : 'medium',
          status: 'open',
          title: `Incomplete implementation in ${file.path.split('/').pop()}`,
          description: `Found ${todos.length} TODO/FIXME comments, ${hasEmptyFunctions ? 'empty functions, ' : ''}${hasThrowNotImplemented ? 'unimplemented throws' : ''}`,
          filePath: file.path,
          lineNumber: null,
          detectedAt: new Date(),
          resolvedAt: null,
          estimatedEffort: Math.ceil(todos.length / 2),
          actualEffort: null,
          autoFixable: false,
          metadata: {
            todoComments: todos,
            incompleteErrorHandling: hasThrowNotImplemented,
            memoryLeakRisk: false,
            missingFeatures: [],
          },
        } as unknown as IncompleteImplementationIssue);
      }
    }
  }

  private detectUnusedCode(files: FileMetadata[], graph?: DependencyGraph): void {
    if (!graph) return;

    const allExports = new Set<string>();
    const allImports = new Set<string>();

    for (const node of graph.nodes) {
      node.exports.forEach(e => allExports.add(e));
    }

    for (const edge of graph.edges) {
      edge.importedSymbols.forEach(s => allImports.add(s));
    }

    for (const exp of allExports) {
      if (!allImports.has(exp) && !exp.startsWith('_')) {
        this.issues.push({
          id: nanoid(),
          type: 'unused_code',
          severity: 'low',
          status: 'open',
          title: `Potentially unused export: "${exp}"`,
          description: `"${exp}" is exported but never imported`,
          filePath: '',
          lineNumber: null,
          detectedAt: new Date(),
          resolvedAt: null,
          estimatedEffort: 0.5,
          actualEffort: null,
          autoFixable: true,
          metadata: { unusedType: 'function', references: 0 },
        } as unknown as UnusedCodeIssue);
      }
    }
  }

  private detectSecurityIssues(files: FileMetadata[]): void {
    for (const file of files) {
      let content: string;
      try {
        content = require('fs').readFileSync(file.path, 'utf-8');
      } catch {
        continue;
      }

      for (const rule of this.config.securityRules) {
        const regex = rule.pattern instanceof RegExp ? rule.pattern : new RegExp(rule.pattern);
        if (regex.test(content)) {
          const lineMatch = content.match(regex);
          const lineNumber = lineMatch ? content.slice(0, lineMatch.index!).split('\n').length : null;

          this.issues.push({
            id: nanoid(),
            type: 'security_issue',
            severity: rule.severity as IssueSeverity,
            status: 'open',
            title: `Security: ${rule.name}`,
            description: rule.description,
            filePath: file.path,
            lineNumber,
            detectedAt: new Date(),
            resolvedAt: null,
            estimatedEffort: 1,
            actualEffort: null,
            autoFixable: rule.id === 'no-console-log-prod',
            metadata: {
              securityType: rule.id,
              owaspCategory: rule.owaspCategory,
              cveReferences: [],
            },
          } as unknown as SecurityIssue);
        }
      }
    }
  }

  private detectCoverageGaps(files: FileMetadata[]): void {
    const testFiles = files.filter(f => /\.test\.|\.spec\./.test(f.path));
    const sourceFiles = files.filter(f => !/\.test\.|\.spec\./.test(f.path));

    // Map test files to source files
    const coveredSources = new Set<string>();
    for (const testFile of testFiles) {
      const sourceName = testFile.path.replace(/\.test\.|\.spec\./, '.');
      coveredSources.add(sourceName);
    }

    const uncovered = sourceFiles.filter(f => !coveredSources.has(f.path) && f.exports.length > 0);
    if (uncovered.length > 0) {
      this.issues.push({
        id: nanoid(),
        type: 'test_coverage_gap',
        severity: 'medium',
        status: 'open',
        title: `${uncovered.length} source files have no tests`,
        description: `Found ${uncovered.length} source files with exports but no corresponding test files`,
        filePath: '',
        lineNumber: null,
        detectedAt: new Date(),
        resolvedAt: null,
        estimatedEffort: Math.ceil(uncovered.length * 0.5),
        actualEffort: null,
        autoFixable: false,
        metadata: {
          currentCoverage: ((sourceFiles.length - uncovered.length) / sourceFiles.length) * 100,
          targetCoverage: 80,
          uncoveredFunctions: uncovered.slice(0, 20).map(f => f.path),
          uncoveredLines: [],
        },
      } as unknown as TestCoverageGapIssue);
    }
  }

  private detectConfigurationIssues(files: FileMetadata[]): void {
    // Check for multiple config files that could conflict
    const configFiles = files.filter(f => f.path.includes('config') || f.path.includes('.config.'));
    const configNames = new Set(configFiles.map(f => f.path.split('/').pop()));

    if (configFiles.length > 10) {
      this.issues.push({
        id: nanoid(),
        type: 'configuration_issue',
        severity: 'low',
        status: 'open',
        title: 'Many configuration files detected',
        description: `Found ${configFiles.length} config-related files. Consider consolidation.`,
        filePath: '',
        lineNumber: null,
        detectedAt: new Date(),
        resolvedAt: null,
        estimatedEffort: 2,
        actualEffort: null,
        autoFixable: false,
        metadata: { configType: 'duplicate', affectedFiles: Array.from(configNames) },
      } as unknown as ConfigurationIssue);
    }
  }

  getIssues(): Issue[] {
    return this.issues;
  }

  getIssuesByType(type: IssueType): Issue[] {
    return this.issues.filter(i => i.type === type);
  }

  getIssuesBySeverity(severity: IssueSeverity): Issue[] {
    return this.issues.filter(i => i.severity === severity);
  }
}
