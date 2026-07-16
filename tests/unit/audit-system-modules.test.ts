import { describe, it, expect, beforeEach } from '@jest/globals';
import { StaticAnalyzer } from '../../backend/audit-system/analyzer';
import { IssueDetector } from '../../backend/audit-system/detector';
import { ReportGenerator } from '../../backend/audit-system/reporter';
import {
  jaccardSimilarity,
  groupBy,
  uniqueBy,
  truncate,
  formatBytes,
  formatDuration,
} from '../../backend/audit-system/utils';
import type { FileMetadata } from '../../backend/audit-system/models/types';

const mockFile = (overrides: Partial<FileMetadata> = {}): FileMetadata => ({
  path: 'test.ts',
  size: 100,
  lines: 10,
  hash: 'abc123',
  imports: [],
  exports: [],
  functions: [],
  classes: [],
  complexity: {
    cyclomaticComplexity: 1,
    cognitiveComplexity: 1,
    maintainabilityIndex: 90,
    linesOfCode: 10,
  },
  ...overrides,
});

describe('Audit Utils', () => {
  describe('jaccardSimilarity', () => {
    it('returns 1 for identical sets', () => {
      expect(jaccardSimilarity(new Set(['a', 'b']), new Set(['a', 'b']))).toBe(1);
    });
    it('returns 0 for disjoint sets', () => {
      expect(jaccardSimilarity(new Set(['a']), new Set(['b']))).toBe(0);
    });
    it('returns 0 for two empty sets', () => {
      expect(jaccardSimilarity(new Set(), new Set())).toBe(0);
    });
    it('computes partial overlap', () => {
      const result = jaccardSimilarity(new Set(['a', 'b', 'c']), new Set(['a', 'b', 'd']));
      expect(result).toBeCloseTo(0.5, 2);
    });
  });

  describe('groupBy', () => {
    it('groups items by key', () => {
      const items = [{ t: 'a' }, { t: 'a' }, { t: 'b' }];
      const g = groupBy(items, (i) => i.t);
      expect(g.get('a')).toHaveLength(2);
      expect(g.get('b')).toHaveLength(1);
    });
  });

  describe('uniqueBy', () => {
    it('deduplicates by key', () => {
      const items = [{ id: 1 }, { id: 2 }, { id: 1 }];
      expect(uniqueBy(items, (i) => i.id)).toHaveLength(2);
    });
  });

  describe('truncate', () => {
    it('keeps short strings unchanged', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });
    it('truncates long strings with ellipsis', () => {
      expect(truncate('hello world this is long', 10)).toBe('hello w...');
    });
  });

  describe('formatBytes', () => {
    it('formats various sizes', () => {
      expect(formatBytes(0)).toBe('0 B');
      expect(formatBytes(1024)).toBe('1.0 KB');
      expect(formatBytes(1048576)).toBe('1.0 MB');
    });
  });

  describe('formatDuration', () => {
    it('formats milliseconds', () => expect(formatDuration(500)).toBe('500ms'));
    it('formats seconds', () => expect(formatDuration(1500)).toBe('1.5s'));
    it('formats minutes', () => expect(formatDuration(65000)).toContain('1m'));
  });
});

describe('IssueDetector', () => {
  let detector: IssueDetector;
  beforeEach(() => {
    detector = new IssueDetector();
  });

  it('detects duplicate exports', () => {
    const files = [
      mockFile({
        path: 'a.ts',
        exports: [{ name: 'MyService', type: 'class', isDefault: false, lineNumber: 1 }],
      }),
      mockFile({
        path: 'b.ts',
        exports: [{ name: 'MyService', type: 'class', isDefault: false, lineNumber: 1 }],
      }),
    ];
    const issues = detector.detect(files);
    expect(issues.filter((i) => i.type === 'duplicate_service').length).toBeGreaterThan(0);
  });

  it('detects security issues', () => {
    const fs = require('fs');
    jest.spyOn(fs, 'readFileSync').mockReturnValue('const x = eval("1+1");');
    const issues = detector.detect([mockFile({ path: 'dangerous.ts' })]);
    expect(issues.filter((i) => i.type === 'security_issue').length).toBeGreaterThan(0);
    (fs.readFileSync as jest.Mock).mockRestore();
  });

  it('returns empty for clean code', () => {
    const fs = require('fs');
    jest.spyOn(fs, 'readFileSync').mockReturnValue('const x = 1;');
    const issues = detector.detect([mockFile({ path: 'clean.ts' })]);
    expect(issues).toEqual([]);
    (fs.readFileSync as jest.Mock).mockRestore();
  });
});

describe('StaticAnalyzer', () => {
  it('builds a dependency graph', () => {
    const analyzer = new StaticAnalyzer();
    const files = [
      mockFile({
        path: 'service.ts',
        imports: [{ source: './helper', specifiers: ['help'], isTypeOnly: false, lineNumber: 1 }],
        exports: [{ name: 'Service', type: 'class', isDefault: false, lineNumber: 5 }],
      }),
      mockFile({
        path: 'helper.ts',
        exports: [{ name: 'help', type: 'function', isDefault: false, lineNumber: 1 }],
      }),
    ];
    const graph = analyzer.buildDependencyGraph(files, '/root');
    expect(graph.nodes.length).toBe(2);
    expect(graph.edges.length).toBe(1);
  });

  it('detects cycles', () => {
    const analyzer = new StaticAnalyzer();
    const nodes = [
      { id: 'a', filePath: 'a', type: 'service' as const, exports: [] },
      { id: 'b', filePath: 'b', type: 'service' as const, exports: [] },
    ];
    const edges = [
      { from: 'a', to: 'b', importedSymbols: [] },
      { from: 'b', to: 'a', importedSymbols: [] },
    ];
    expect(analyzer.detectCycles(nodes, edges).length).toBeGreaterThan(0);
  });

  it('generates coverage report', () => {
    const analyzer = new StaticAnalyzer();
    const files = [mockFile({ path: 'svc.ts' }), mockFile({ path: 'svc.test.ts' })];
    const report = analyzer.generateCoverageReport(files);
    expect(report.overallCoverage).toBeGreaterThanOrEqual(0);
    expect(report.overallCoverage).toBeLessThanOrEqual(100);
  });
});

describe('ReportGenerator', () => {
  it('generates summary report', () => {
    const gen = new ReportGenerator();
    const issues = [
      {
        id: '1', type: 'security_issue', severity: 'critical', status: 'open',
        title: 'X', description: 'd', filePath: 'a.ts', lineNumber: 1,
        detectedAt: new Date(), resolvedAt: null, estimatedEffort: 2, actualEffort: null,
        autoFixable: false, metadata: {},
      },
    ];
    const r = gen.generateSummary(issues);
    expect(r.totalIssues).toBe(1);
    expect(r.issuesBySeverity.get('critical')).toBe(1);
  });

  it('renders markdown', () => {
    const gen = new ReportGenerator();
    const issues = [
      {
        id: '1', type: 'security_issue', severity: 'high', status: 'open',
        title: 'Test', description: 'd', filePath: 'a.ts', lineNumber: null,
        detectedAt: new Date(), resolvedAt: null, estimatedEffort: 1, actualEffort: null,
        autoFixable: false, metadata: {},
      },
    ];
    const md = gen.renderReport(gen.generateSummary(issues), 'markdown');
    expect(md).toContain('# Audit Report');
    expect(md).toContain('Test');
  });

  it('generates certification (blocks deploy on critical)', () => {
    const gen = new ReportGenerator();
    const issues = [
      {
        id: '1', type: 'security_issue', severity: 'critical', status: 'open',
        title: 'X', description: 'd', filePath: 'a.ts', lineNumber: null,
        detectedAt: new Date(), resolvedAt: null, estimatedEffort: 1, actualEffort: null,
        autoFixable: false, metadata: {},
      },
    ];
    const cert = gen.generateCertification(issues, 40);
    expect(cert.productionReady).toBe(false);
    expect(cert.criticalIssues).toBe(1);
  });
});
