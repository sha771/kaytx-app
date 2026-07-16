/**
 * Code Scanner Module
 * Scans project files, extracts metadata, and builds file indexes
 */

import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';
import type { ScanOptions, ScanResult, FileMetadata, ImportStatement, ExportStatement, FunctionMetadata, ClassMetadata, ComplexityMetrics } from '../models/types';

export const DEFAULT_SCAN_OPTIONS: ScanOptions = {
  includePatterns: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  excludePatterns: ['node_modules/**', 'dist/**', 'build/**', '.expo/**', 'coverage/**', 'scripts/_archive/**'],
  followSymlinks: false,
  maxDepth: 50,
  maxFileSize: 1024 * 1024, // 1MB
  parallelWorkers: 4,
};

function calculateHash(content: string): string {
  return createHash('sha256').update(content).digest('hex').slice(0, 16);
}

function extractImports(content: string): ImportStatement[] {
  const imports: ImportStatement[] = [];
  const regex = /import\s+(?:type\s+)?(?:{([^}]+)}|(\w+))\s+(?:from\s+)?['"]([^'"]+)['"]/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const specifiers = match[1]
      ? match[1].split(',').map(s => s.trim()).filter(Boolean)
      : match[2]
        ? [match[2]]
        : [];

    imports.push({
      source: match[3],
      specifiers,
      isTypeOnly: content.includes('import type'),
      lineNumber: content.slice(0, match.index).split('\n').length,
    });
  }

  return imports;
}

function extractExports(content: string): ExportStatement[] {
  const exports: ExportStatement[] = [];

  const namedExportRegex = /export\s+(?:async\s+)?function\s+(\w+)/g;
  let match;
  while ((match = namedExportRegex.exec(content)) !== null) {
    exports.push({
      name: match[1],
      type: 'function',
      isDefault: false,
      lineNumber: content.slice(0, match.index).split('\n').length,
    });
  }

  const constExportRegex = /export\s+(?:const|let|var)\s+(\w+)/g;
  while ((match = constExportRegex.exec(content)) !== null) {
    exports.push({
      name: match[1],
      type: 'const',
      isDefault: false,
      lineNumber: content.slice(0, match.index).split('\n').length,
    });
  }

  const classExportRegex = /export\s+(?:default\s+)?class\s+(\w+)/g;
  while ((match = classExportRegex.exec(content)) !== null) {
    exports.push({
      name: match[1],
      type: 'class',
      isDefault: false,
      lineNumber: content.slice(0, match.index).split('\n').length,
    });
  }

  const typeExportRegex = /export\s+(?:type|interface)\s+(\w+)/g;
  while ((match = typeExportRegex.exec(content)) !== null) {
    exports.push({
      name: match[1],
      type: 'interface',
      isDefault: false,
      lineNumber: content.slice(0, match.index).split('\n').length,
    });
  }

  return exports;
}

function extractFunctions(content: string): FunctionMetadata[] {
  const functions: FunctionMetadata[] = [];
  const regex = /(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*\(([^)]*)\)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const params = match[2].split(',').map(p => p.trim().split(':')[0].trim().split('=')[0].trim()).filter(Boolean);
    functions.push({
      name: match[1],
      lineNumber: content.slice(0, match.index).split('\n').length,
      parameters: params,
      isAsync: match[0].includes('async '),
      isExported: match[0].includes('export '),
      complexity: 1,
    });
  }

  return functions;
}

function extractClasses(content: string): ClassMetadata[] {
  const classes: ClassMetadata[] = [];
  const regex = /(?:export\s+)?class\s+(\w+)(?:\s+extends\s+(\w+))?\s*\{/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const classBody = content.slice(match.index);
    const methods: string[] = [];
    const methodRegex = /(?:async\s+)?(\w+)\s*\(/g;
    let methodMatch;
    while ((methodMatch = methodRegex.exec(classBody)) !== null) {
      methods.push(methodMatch[1]);
    }

    classes.push({
      name: match[1],
      lineNumber: content.slice(0, match.index).split('\n').length,
      methods: methods.slice(1), // skip class name itself
      isExported: match[0].includes('export '),
      extendsClass: match[2] || null,
    });
  }

  return classes;
}

function calculateComplexity(content: string): ComplexityMetrics {
  const lines = content.split('\n');
  const codeLines = lines.filter(l => l.trim() && !l.trim().startsWith('//') && !l.trim().startsWith('*')).length;

  // Cyclomatic complexity approximation
  const decisionKeywords = ['if', 'else if', 'case', 'catch', '&&', '||', '?', 'for', 'while', 'switch'];
  let cyclomatic = 1;
  for (const line of lines) {
    for (const kw of decisionKeywords) {
      if (line.includes(kw)) cyclomatic++;
    }
  }

  const cyclomaticComplexity = Math.min(cyclomatic, codeLines || 1);
  const cognitiveComplexity = Math.round(cyclomaticComplexity * 1.5);
  const maintainabilityIndex = Math.max(0, Math.min(100, 100 - (cyclomaticComplexity * 2) - (codeLines > 300 ? 20 : codeLines > 100 ? 10 : 0)));

  return {
    cyclomaticComplexity,
    cognitiveComplexity,
    maintainabilityIndex,
    linesOfCode: codeLines,
  };
}

function matchesPattern(filePath: string, patterns: string[]): boolean {
  return patterns.some(pattern => {
    const normalized = pattern.replace(/\*\*/g, 'PLACEHOLDER');
    const regex = new RegExp(normalized.replace(/PLACEHOLDER/g, '.*').replace(/\*/g, '[^/]*'));
    return regex.test(filePath.replace(/\\/g, '/'));
  });
}

function analyzeFile(filePath: string): FileMetadata {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const stat = fs.statSync(filePath);

  return {
    path: filePath,
    size: stat.size,
    lines: lines.length,
    hash: calculateHash(content),
    imports: extractImports(content),
    exports: extractExports(content),
    functions: extractFunctions(content),
    classes: extractClasses(content),
    complexity: calculateComplexity(content),
  };
}

export class CodeScanner {
  private options: ScanOptions;
  private files: FileMetadata[] = [];

  constructor(options?: Partial<ScanOptions>) {
    this.options = { ...DEFAULT_SCAN_OPTIONS, ...options };
  }

  async scan(projectRoot: string): Promise<ScanResult> {
    const startTime = Date.now();
    this.files = [];

    const allFiles = this.collectFiles(projectRoot);

    // Filter by size and patterns
    const eligible = allFiles.filter(file => {
      const stat = fs.statSync(file);
      if (stat.size > this.options.maxFileSize) return false;
      const relative = path.relative(projectRoot, file).replace(/\\/g, '/');
      if (this.options.excludePatterns.some(p => matchesPattern(relative, [p]))) return false;
      return true;
    });

    // Analyze files (sequential for memory safety)
    for (const file of eligible) {
      try {
        const metadata = analyzeFile(file);
        this.files.push(metadata);
      } catch {
        // Skip files that can't be parsed
      }
    }

    const totalLines = this.files.reduce((sum, f) => sum + f.lines, 0);

    return {
      files: this.files,
      totalFiles: this.files.length,
      totalLines,
      scanDuration: Date.now() - startTime,
      timestamp: new Date(),
    };
  }

  getFiles(): FileMetadata[] {
    return this.files;
  }

  getFileByPath(filePath: string): FileMetadata | undefined {
    return this.files.find(f => f.path === filePath);
  }

  getStats() {
    return {
      totalFiles: this.files.length,
      totalLines: this.files.reduce((sum, f) => sum + f.lines, 0),
      totalImports: this.files.reduce((sum, f) => sum + f.imports.length, 0),
      totalExports: this.files.reduce((sum, f) => sum + f.exports.length, 0),
      totalFunctions: this.files.reduce((sum, f) => sum + f.functions.length, 0),
      totalClasses: this.files.reduce((sum, f) => sum + f.classes.length, 0),
      avgComplexity: this.files.length > 0
        ? this.files.reduce((sum, f) => sum + f.complexity.cyclomaticComplexity, 0) / this.files.length
        : 0,
    };
  }

  private collectFiles(dir: string, depth = 0): string[] {
    if (depth > this.options.maxDepth) return [];
    const results: string[] = [];

    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return results;
    }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (!this.options.followSymlinks && entry.isSymbolicLink()) continue;
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;

      if (entry.isDirectory()) {
        results.push(...this.collectFiles(fullPath, depth + 1));
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
          results.push(fullPath);
        }
      }
    }

    return results;
  }
}
