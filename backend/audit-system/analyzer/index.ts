/**
 * Static Analyzer Module
 * Analyzes code for complexity, dependency graphs, cycles, and coverage
 */

import type {
  DependencyGraph,
  DependencyNode,
  DependencyEdge,
  DependencyCycle,
  ComplexityMetrics,
  CoverageReport,
  FileMetrics,
  FileMetadata,
} from '../models/types';

export class StaticAnalyzer {
  private fileMetrics: Map<string, FileMetrics> = new Map();

  /**
   * Build a full dependency graph from scanned files
   */
  buildDependencyGraph(files: FileMetadata[], projectRoot: string): DependencyGraph {
    const nodeMap = new Map<string, DependencyNode>();
    const edges: DependencyEdge[] = [];

    for (const file of files) {
      const relativePath = file.path.replace(/\\/g, '/');
      const nodeType = this.inferNodeType(relativePath);

      nodeMap.set(relativePath, {
        id: relativePath,
        filePath: relativePath,
        type: nodeType,
        exports: file.exports.map(e => e.name),
      });

      for (const imp of file.imports) {
        // Skip node_modules and external imports
        if (!imp.source.startsWith('.') && !imp.source.startsWith('/')) continue;

        edges.push({
          from: relativePath,
          to: imp.source,
          importedSymbols: imp.specifiers,
        });
      }
    }

    const cycles = this.detectCycles(Array.from(nodeMap.values()), edges);

    return {
      nodes: Array.from(nodeMap.values()),
      edges,
      cycles,
    };
  }

  /**
   * Detect circular dependencies in the graph
   */
  detectCycles(nodes: DependencyNode[], edges: DependencyEdge[]): DependencyCycle[] {
    const adjacency = new Map<string, string[]>();

    for (const node of nodes) {
      adjacency.set(node.id, []);
    }

    for (const edge of edges) {
      const targets = adjacency.get(edge.from) || [];
      targets.push(edge.to);
      adjacency.set(edge.from, targets);
    }

    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const cycles: DependencyCycle[] = [];

    const dfs = (nodeId: string, path: string[]): void => {
      visited.add(nodeId);
      recursionStack.add(nodeId);
      path.push(nodeId);

      for (const neighbor of adjacency.get(nodeId) || []) {
        if (!visited.has(neighbor)) {
          dfs(neighbor, path);
        } else if (recursionStack.has(neighbor)) {
          const cycleStart = path.indexOf(neighbor);
          const cycleNodes = [...path.slice(cycleStart), neighbor];
          cycles.push({
            nodes: cycleNodes,
            severity: 'warning',
          });
        }
      }

      path.pop();
      recursionStack.delete(nodeId);
    };

    for (const node of nodes) {
      if (!visited.has(node.id)) {
        dfs(node.id, []);
      }
    }

    return cycles;
  }

  /**
   * Analyze individual file metrics
   */
  analyzeFileMetrics(file: FileMetadata, coverage?: number): FileMetrics {
    const metrics: FileMetrics = {
      filePath: file.path,
      linesOfCode: file.complexity.linesOfCode,
      complexity: file.complexity,
      coverage: coverage ?? 0,
      issueCount: 0,
      maintainabilityScore: file.complexity.maintainabilityIndex,
    };

    this.fileMetrics.set(file.path, metrics);
    return metrics;
  }

  /**
   * Analyze all files and return a coverage report
   */
  generateCoverageReport(files: FileMetadata[], testFilePattern = /.test.|.spec./): CoverageReport {
    const sourceFiles = files.filter(f => !testFilePattern.test(f.path));
    const testFiles = files.filter(f => testFilePattern.test(f.path));
    const fileCoverage = new Map<string, number>();
    const uncoveredLines = new Map<string, number[]>();
    const uncoveredFunctions = new Map<string, string[]>();

    for (const file of sourceFiles) {
      const hasTest = testFiles.some(tf =>
        tf.path.replace(/\.test\.|\.spec\./, '.') === file.path
      );
      const coveragePercent = hasTest ? 50 : 0; // Conservative estimate
      fileCoverage.set(file.path, coveragePercent);
      uncoveredLines.set(file.path, []);
      uncoveredFunctions.set(file.path, []);
    }

    const coveredCount = Array.from(fileCoverage.values()).filter(c => c > 0).length;
    const overallCoverage = sourceFiles.length > 0 ? (coveredCount / sourceFiles.length) * 100 : 0;

    return {
      overallCoverage: Math.round(overallCoverage * 100) / 100,
      fileCoverage,
      uncoveredLines,
      uncoveredFunctions,
      timestamp: new Date(),
    };
  }

  /**
   * Get file metrics report
   */
  getFileMetricsReport(): FileMetrics[] {
    return Array.from(this.fileMetrics.values()).sort((a, b) => b.complexity.cyclomaticComplexity - a.complexity.cyclomaticComplexity);
  }

  /**
   * Get top N most complex files
   */
  getMostComplexFiles(limit = 10): FileMetrics[] {
    return this.getFileMetricsReport().slice(0, limit);
  }

  private inferNodeType(filePath: string): 'service' | 'library' | 'config' | 'test' | 'component' {
    if (filePath.includes('.test.') || filePath.includes('.spec.') || filePath.includes('__tests__')) return 'test';
    if (filePath.includes('components/')) return 'component';
    if (filePath.includes('config/') || filePath.includes('.config.')) return 'config';
    if (filePath.includes('services/') || filePath.includes('controllers/')) return 'service';
    return 'library';
  }
}
