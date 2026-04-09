import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { glob } from 'glob';
import { logger } from './production-logger';

export interface FileInfo {
  path: string;
  relativePath: string;
  size: number;
  lastModified: Date;
  content: string;
  ast?: ts.SourceFile;
  imports: string[];
  exports: string[];
  functions: string[];
  classes: string[];
  interfaces: string[];
  types: string[];
}

export interface ScanResult {
  files: FileInfo[];
  totalFiles: number;
  totalLines: number;
  duplicates: DuplicateService[];
  incompleteImplementations: IncompleteImplementation[];
  securityIssues: SecurityIssue[];
  unnecessaryFiles: UnnecessaryFile[];
  configConflicts: ConfigConflict[];
  testCoverage: TestCoverage;
}

export interface DuplicateService {
  serviceName: string;
  files: string[];
  similarity: number;
  functions: string[];
  description: string;
}

export interface IncompleteImplementation {
  filePath: string;
  issues: string[];
  completionPercentage: number;
  priority: 'high' | 'medium' | 'low';
}

export interface SecurityIssue {
  filePath: string;
  type: 'csrf' | 'error_handling' | 'audit_logging' | 'input_validation' | 'authentication';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
}

export interface UnnecessaryFile {
  filePath: string;
  reason: 'dead_code' | 'unused_imports' | 'duplicate_file' | 'deprecated';
  size: number;
  safeToDelete: boolean;
}

export interface ConfigConflict {
  configType: string;
  files: string[];
  conflicts: string[];
  resolution: string;
}

export interface TestCoverage {
  totalFiles: number;
  testedFiles: number;
  coveragePercentage: number;
  untestedFiles: string[];
}

export class CodeScanner {
  private projectRoot: string;
  private excludePatterns: string[] = [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.git/**',
    '**/coverage/**',
    '**/*.log',
    '**/tmp/**'
  ];

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
  }

  async scanProject(): Promise<ScanResult> {
    logger.info('🔍 Scanning project structure...');
    const files = await this.getAllFiles();
    
    logger.info('📊 Analyzing file contents...');
    const fileInfos = await this.analyzeFiles(files);
    
    logger.info('🔍 Detecting issues...');
    const [duplicates, incomplete, security, unnecessary, configConflicts] = await Promise.all([
      this.detectDuplicateServices(fileInfos),
      this.detectIncompleteImplementations(fileInfos),
      this.detectSecurityIssues(fileInfos),
      this.detectUnnecessaryFiles(fileInfos),
      this.detectConfigConflicts(fileInfos)
    ]);
    
    const testCoverage = await this.analyzeTestCoverage(fileInfos);
    
    return {
      files: fileInfos,
      totalFiles: fileInfos.length,
      totalLines: fileInfos.reduce((sum, f) => sum + f.content.split('\n').length, 0),
      duplicates,
      incompleteImplementations: incomplete,
      securityIssues: security,
      unnecessaryFiles: unnecessary,
      configConflicts,
      testCoverage
    };
  }

  private async getAllFiles(): Promise<string[]> {
    const patterns = [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
      '**/*.json',
      '**/*.md',
      '**/*.yml',
      '**/*.yaml'
    ];
    
    const allFiles: string[] = [];
    
    for (const pattern of patterns) {
      const files = await glob(pattern, {
        cwd: this.projectRoot,
        ignore: this.excludePatterns,
        absolute: true
      });
      allFiles.push(...files);
    }
    
    return [...new Set(allFiles)].sort();
  }

  private async analyzeFiles(filePaths: string[]): Promise<FileInfo[]> {
    const fileInfos: FileInfo[] = [];
    
    for (const filePath of filePaths) {
      try {
        const stats = fs.statSync(filePath);
        const content = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(this.projectRoot, filePath);
        
        const fileInfo: FileInfo = {
          path: filePath,
          relativePath,
          size: stats.size,
          lastModified: stats.mtime,
          content,
          imports: [],
          exports: [],
          functions: [],
          classes: [],
          interfaces: [],
          types: []
        };
        
        // Parse TypeScript/JavaScript files for AST analysis
        if (this.isTypeScriptFile(filePath) || this.isJavaScriptFile(filePath)) {
          const ast = this.parseFile(content, filePath);
          if (ast) {
            fileInfo.ast = ast;
            this.extractASTInfo(ast, fileInfo);
          }
        }
        
        fileInfos.push(fileInfo);
      } catch (error) {
        logger.warn(`⚠️  Failed to analyze file: ${filePath}`, { error });
      }
    }
    
    return fileInfos;
  }

  private parseFile(content: string, filePath: string): ts.SourceFile | undefined {
    try {
      return ts.createSourceFile(
        filePath,
        content,
        ts.ScriptTarget.Latest,
        true
      );
    } catch (error) {
      logger.warn(`⚠️  Failed to parse AST for: ${filePath}`, { error });
      return undefined;
    }
  }

  private extractASTInfo(ast: ts.SourceFile, fileInfo: FileInfo): void {
    const visit = (node: ts.Node) => {
      // Extract imports
      if (ts.isImportDeclaration(node)) {
        const moduleSpecifier = node.moduleSpecifier?.getText();
        if (moduleSpecifier) {
          fileInfo.imports.push(moduleSpecifier.replace(/['"]/g, ''));
        }
      }
      
      // Extract exports
      if (ts.isExportDeclaration(node) || ts.isExportAssignment(node)) {
        const exportName = node.getText();
        fileInfo.exports.push(exportName);
      }
      
      // Extract functions
      if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
        const name = node.name?.getText() || 'anonymous';
        fileInfo.functions.push(name);
      }
      
      // Extract classes
      if (ts.isClassDeclaration(node)) {
        const name = node.name?.getText() || 'anonymous';
        fileInfo.classes.push(name);
      }
      
      // Extract interfaces
      if (ts.isInterfaceDeclaration(node)) {
        const name = node.name?.getText() || 'anonymous';
        fileInfo.interfaces.push(name);
      }
      
      // Extract type aliases
      if (ts.isTypeAliasDeclaration(node)) {
        const name = node.name?.getText() || 'anonymous';
        fileInfo.types.push(name);
      }
      
      ts.forEachChild(node, visit);
    };
    
    visit(ast);
  }

  private async detectDuplicateServices(files: FileInfo[]): Promise<DuplicateService[]> {
    const duplicates: DuplicateService[] = [];
    const serviceGroups = new Map<string, FileInfo[]>();
    
    // Group files by potential service names
    for (const file of files) {
      if (this.isServiceFile(file)) {
        const serviceName = this.extractServiceName(file);
        if (!serviceGroups.has(serviceName)) {
          serviceGroups.set(serviceName, []);
        }
        serviceGroups.get(serviceName)!.push(file);
      }
    }
    
    // Find duplicates within groups
    for (const [serviceName, serviceFiles] of serviceGroups) {
      if (serviceFiles.length > 1) {
        const similarity = this.calculateSimilarity(serviceFiles);
        if (similarity > 0.7) { // 70% similarity threshold
          duplicates.push({
            serviceName,
            files: serviceFiles.map(f => f.relativePath),
            similarity,
            functions: [...new Set(serviceFiles.flatMap(f => f.functions))],
            description: `Duplicate implementation of ${serviceName} service`
          });
        }
      }
    }
    
    return duplicates;
  }

  private async detectIncompleteImplementations(files: FileInfo[]): Promise<IncompleteImplementation[]> {
    const incomplete: IncompleteImplementation[] = [];
    
    for (const file of files) {
      const issues: string[] = [];
      
      // Check for TODO comments
      const todoMatches = file.content.match(/\/\/\s*TODO|\/\*\s*TODO/gi);
      if (todoMatches) {
        issues.push(`${todoMatches.length} TODO comments found`);
      }
      
      // Check for empty functions
      const emptyFunctions = file.functions.filter(func => {
        const regex = new RegExp(`(?:function\\s+${func}|${func}\\s*[:=]\\s*[^{]*\\([^)]*\\)\\s*=>)[^{]*{\\s*}`, 'g');
        return regex.test(file.content);
      });
      
      if (emptyFunctions.length > 0) {
        issues.push(`${emptyFunctions.length} empty function implementations`);
      }
      
      // Check for thrown errors or placeholder returns
      if (file.content.includes('throw new Error(') || file.content.includes('Not implemented')) {
        issues.push('Contains placeholder error implementations');
      }
      
      // Check for missing exports
      if (this.isServiceFile(file) && file.exports.length === 0) {
        issues.push('Service file has no exports');
      }
      
      // Calculate completion percentage
      const completionPercentage = Math.max(0, 100 - (issues.length * 15));
      
      if (issues.length > 0) {
        incomplete.push({
          filePath: file.relativePath,
          issues,
          completionPercentage,
          priority: completionPercentage < 50 ? 'high' : completionPercentage < 80 ? 'medium' : 'low'
        });
      }
    }
    
    return incomplete;
  }

  private async detectSecurityIssues(files: FileInfo[]): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = [];
    
    for (const file of files) {
      // Check for CSRF protection
      if (this.isBackendFile(file) && !file.content.includes('csurf') && !file.content.includes('csrf')) {
        issues.push({
          filePath: file.relativePath,
          type: 'csrf',
          severity: 'high',
          description: 'Missing CSRF protection',
          recommendation: 'Add CSRF middleware for state-changing operations'
        });
      }
      
      // Check for error handling
      if (file.content.includes('try') && !file.content.includes('catch')) {
        issues.push({
          filePath: file.relativePath,
          type: 'error_handling',
          severity: 'medium',
          description: 'Incomplete error handling',
          recommendation: 'Add proper catch blocks for all try statements'
        });
      }
      
      // Check for audit logging
      if (this.isServiceFile(file) && !file.content.includes('audit') && !file.content.includes('log')) {
        issues.push({
          filePath: file.relativePath,
          type: 'audit_logging',
          severity: 'medium',
          description: 'Missing audit logging',
          recommendation: 'Add audit logging for sensitive operations'
        });
      }
      
      // Check for input validation
      if (file.content.includes('req.body') && !file.content.includes('zod') && !file.content.includes('validate')) {
        issues.push({
          filePath: file.relativePath,
          type: 'input_validation',
          severity: 'high',
          description: 'Missing input validation',
          recommendation: 'Add input validation using Zod or similar'
        });
      }
    }
    
    return issues;
  }

  private async detectUnnecessaryFiles(files: FileInfo[]): Promise<UnnecessaryFile[]> {
    const unnecessary: UnnecessaryFile[] = [];
    
    for (const file of files) {
      let reason: 'dead_code' | 'unused_imports' | 'duplicate_file' | 'deprecated' | null = null;
      let safeToDelete = false;
      
      // Check for deprecated files
      if (file.relativePath.includes('.deprecated') || file.relativePath.includes('.old')) {
        reason = 'deprecated';
        safeToDelete = true;
      }
      
      // Check for unused imports
      const unusedImports = this.findUnusedImports(file);
      if (unusedImports.length > 0 && unusedImports.length === file.imports.length) {
        reason = 'unused_imports';
        safeToDelete = false; // Should fix imports, not delete file
      }
      
      // Check for very small files that might be unnecessary
      if (file.size < 100 && file.content.trim().length < 50) {
        reason = 'dead_code';
        safeToDelete = true;
      }
      
      if (reason) {
        unnecessary.push({
          filePath: file.relativePath,
          reason,
          size: file.size,
          safeToDelete
        });
      }
    }
    
    return unnecessary;
  }

  private async detectConfigConflicts(files: FileInfo[]): Promise<ConfigConflict[]> {
    const conflicts: ConfigConflict[] = [];
    const configFiles = files.filter(f => f.relativePath.includes('config') || f.relativePath.endsWith('.json'));
    
    // Group config files by type
    const configGroups = new Map<string, FileInfo[]>();
    for (const config of configFiles) {
      const configType = path.basename(config.relativePath, path.extname(config.relativePath));
      if (!configGroups.has(configType)) {
        configGroups.set(configType, []);
      }
      configGroups.get(configType)!.push(config);
    }
    
    // Find conflicts within groups
    for (const [configType, configFiles] of configGroups) {
      if (configFiles.length > 1) {
        const conflictsList: string[] = [];
        
        // Compare configurations
        for (let i = 0; i < configFiles.length; i++) {
          for (let j = i + 1; j < configFiles.length; j++) {
            const file1 = configFiles[i];
            const file2 = configFiles[j];
            
            try {
              const config1 = JSON.parse(file1.content);
              const config2 = JSON.parse(file2.content);
              
              const differences = this.findConfigDifferences(config1, config2);
              if (differences.length > 0) {
                conflictsList.push(`${file1.relativePath} vs ${file2.relativePath}: ${differences.join(', ')}`);
              }
            } catch (error) {
              // Invalid JSON, skip
            }
          }
        }
        
        if (conflictsList.length > 0) {
          conflicts.push({
            configType,
            files: configFiles.map(f => f.relativePath),
            conflicts: conflictsList,
            resolution: 'Merge configurations or remove duplicates'
          });
        }
      }
    }
    
    return conflicts;
  }

  private async analyzeTestCoverage(files: FileInfo[]): Promise<TestCoverage> {
    const sourceFiles = files.filter(f => this.isSourceFile(f));
    const testFiles = files.filter(f => this.isTestFile(f));
    
    const testedFiles = new Set<string>();
    
    // Map test files to source files
    for (const testFile of testFiles) {
      const sourceFile = this.findCorrespondingSourceFile(testFile, sourceFiles);
      if (sourceFile) {
        testedFiles.add(sourceFile.relativePath);
      }
    }
    
    const coveragePercentage = sourceFiles.length > 0 ? (testedFiles.size / sourceFiles.length) * 100 : 0;
    
    return {
      totalFiles: sourceFiles.length,
      testedFiles: testedFiles.size,
      coveragePercentage,
      untestedFiles: sourceFiles.filter(f => !testedFiles.has(f.relativePath)).map(f => f.relativePath)
    };
  }

  // Helper methods
  private isServiceFile(file: FileInfo): boolean {
    return file.relativePath.includes('/services/') || 
           file.relativePath.includes('/lib/') ||
           file.relativePath.includes('/utils/') ||
           file.content.includes('export.*Service') ||
           file.content.includes('class.*Service');
  }

  private isBackendFile(file: FileInfo): boolean {
    const normalizedPath = file.relativePath.replace(/\\/g, '/');
    return normalizedPath.includes('/backend/') || normalizedPath.startsWith('backend/') || normalizedPath.includes('/api/') || normalizedPath.startsWith('api/');
  }

  private isTypeScriptFile(filePath: string): boolean {
    if (!filePath) return false;
    const lowerPath = filePath.toLowerCase();
    return lowerPath.endsWith('.ts') || lowerPath.endsWith('.tsx');
  }

  private isJavaScriptFile(filePath: string): boolean {
    if (!filePath) return false;
    const lowerPath = filePath.toLowerCase();
    return lowerPath.endsWith('.js') || lowerPath.endsWith('.jsx');
  }

  private isSourceFile(file: FileInfo): boolean {
    return (this.isTypeScriptFile(file.path) || this.isJavaScriptFile(file.path)) &&
           !file.relativePath.includes('__tests__') &&
           !file.relativePath.includes('.test.') &&
           !file.relativePath.includes('.spec.');
  }

  private isTestFile(file: FileInfo): boolean {
    return file.relativePath.includes('__tests__') ||
           file.relativePath.includes('.test.') ||
           file.relativePath.includes('.spec.');
  }

  private extractServiceName(file: FileInfo): string {
    const basename = path.basename(file.relativePath, path.extname(file.relativePath));
    return basename.replace(/[-_]/g, '').toLowerCase();
  }

  private calculateSimilarity(files: FileInfo[]): number {
    if (files.length < 2) return 1.0;
    
    // Simple similarity based on function names and structure
    const allFunctions = files.flatMap(f => f.functions);
    const uniqueFunctions = [...new Set(allFunctions)];
    
    if (uniqueFunctions.length === 0) return 1.0;
    
    const commonFunctions = uniqueFunctions.filter(func => 
      files.every(f => f.functions.includes(func))
    );
    
    return commonFunctions.length / uniqueFunctions.length;
  }

  private findUnusedImports(file: FileInfo): string[] {
    const unused: string[] = [];
    
    for (const importName of file.imports) {
      const importBase = path.basename(importName, path.extname(importName));
      if (!file.content.includes(importBase) && !file.content.includes('*')) {
        unused.push(importName);
      }
    }
    
    return unused;
  }

  private findCorrespondingSourceFile(testFile: FileInfo, sourceFiles: FileInfo[]): FileInfo | undefined {
    const testBaseName = path.basename(testFile.relativePath)
      .replace('.test', '')
      .replace('.spec', '')
      .replace('__tests__', '');
    
    return sourceFiles.find(source => 
      source.relativePath.includes(testBaseName) ||
      testBaseName.includes(path.basename(source.relativePath, path.extname(source.relativePath)))
    );
  }

  private findConfigDifferences(config1: any, config2: any): string[] {
    const differences: string[] = [];
    const keys = new Set([...Object.keys(config1), ...Object.keys(config2)]);
    
    for (const key of keys) {
      if (!(key in config1)) {
        differences.push(`Missing in config1: ${key}`);
      } else if (!(key in config2)) {
        differences.push(`Missing in config2: ${key}`);
      } else if (JSON.stringify(config1[key]) !== JSON.stringify(config2[key])) {
        differences.push(`Different values for ${key}`);
      }
    }
    
    return differences;
  }
}
