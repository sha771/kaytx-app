/**
 * Core type definitions for the Platform Audit and Cleanup system
 */

// ============================================================================
// Scanning Types
// ============================================================================

export interface ScanOptions {
  includePatterns: string[];
  excludePatterns: string[];
  followSymlinks: boolean;
  maxDepth: number;
  maxFileSize: number;
  parallelWorkers: number;
}

export interface ScanResult {
  files: FileMetadata[];
  totalFiles: number;
  totalLines: number;
  scanDuration: number;
  timestamp: Date;
}

export interface FileMetadata {
  path: string;
  size: number;
  lines: number;
  hash: string;
  imports: ImportStatement[];
  exports: ExportStatement[];
  functions: FunctionMetadata[];
  classes: ClassMetadata[];
  complexity: ComplexityMetrics;
}

export interface ImportStatement {
  source: string;
  specifiers: string[];
  isTypeOnly: boolean;
  lineNumber: number;
}

export interface ExportStatement {
  name: string;
  type: 'function' | 'class' | 'const' | 'type' | 'interface';
  isDefault: boolean;
  lineNumber: number;
}

export interface FunctionMetadata {
  name: string;
  lineNumber: number;
  parameters: string[];
  isAsync: boolean;
  isExported: boolean;
  complexity: number;
}

export interface ClassMetadata {
  name: string;
  lineNumber: number;
  methods: string[];
  isExported: boolean;
  extendsClass: string | null;
}

// ============================================================================
// Analysis Types
// ============================================================================

export interface DependencyGraph {
  nodes: DependencyNode[];
  edges: DependencyEdge[];
  cycles: DependencyCycle[];
}

export interface DependencyNode {
  id: string;
  filePath: string;
  type: 'service' | 'library' | 'config' | 'test' | 'component';
  exports: string[];
}

export interface DependencyEdge {
  from: string;
  to: string;
  importedSymbols: string[];
}

export interface DependencyCycle {
  nodes: string[];
  severity: 'warning' | 'error';
}

export interface ComplexityMetrics {
  cyclomaticComplexity: number;
  cognitiveComplexity: number;
  maintainabilityIndex: number;
  linesOfCode: number;
  halsteadMetrics?: HalsteadMetrics;
}

export interface HalsteadMetrics {
  vocabulary: number;
  length: number;
  volume: number;
  difficulty: number;
  effort: number;
}

export interface CoverageReport {
  overallCoverage: number;
  fileCoverage: Map<string, number>;
  uncoveredLines: Map<string, number[]>;
  uncoveredFunctions: Map<string, string[]>;
  timestamp: Date;
}

// ============================================================================
// Issue Types
// ============================================================================

export type IssueType =
  | 'duplicate_service'
  | 'incomplete_implementation'
  | 'unused_code'
  | 'configuration_issue'
  | 'security_issue'
  | 'documentation_gap'
  | 'test_coverage_gap'
  | 'complexity_issue'
  | 'dependency_cycle';

export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low';

export type IssueStatus = 'open' | 'in_progress' | 'resolved' | 'wont_fix';

export interface Issue {
  id: string;
  type: IssueType;
  severity: IssueSeverity;
  status: IssueStatus;
  title: string;
  description: string;
  filePath: string;
  lineNumber: number | null;
  detectedAt: Date;
  resolvedAt: Date | null;
  estimatedEffort: number; // hours
  actualEffort: number | null;
  autoFixable: boolean;
  metadata: Record<string, unknown>;
}

export interface DuplicateServiceIssue extends Issue {
  type: 'duplicate_service';
  duplicateOf: string;
  overlapPercentage: number;
  suggestedConsolidation: string;
  sharedFunctions: string[];
  sharedTypes: string[];
}

export interface IncompleteImplementationIssue extends Issue {
  type: 'incomplete_implementation';
  missingFeatures: string[];
  todoComments: TodoComment[];
  incompleteErrorHandling: boolean;
  memoryLeakRisk: boolean;
}

export interface TodoComment {
  text: string;
  lineNumber: number;
  type: 'TODO' | 'FIXME' | 'HACK' | 'XXX';
}

export interface UnusedCodeIssue extends Issue {
  type: 'unused_code';
  unusedType: 'import' | 'function' | 'class' | 'file' | 'variable';
  references: number;
}

export interface ConfigurationIssue extends Issue {
  type: 'configuration_issue';
  configType: 'duplicate' | 'missing' | 'invalid' | 'conflict';
  affectedFiles: string[];
}

export interface SecurityIssue extends Issue {
  type: 'security_issue';
  securityType: 'csrf' | 'error_handling' | 'audit_logging' | 'injection' | 'authentication';
  owaspCategory: string;
  cveReferences: string[];
}

export interface DocumentationGapIssue extends Issue {
  type: 'documentation_gap';
  gapType: 'missing_readme' | 'missing_api_docs' | 'missing_jsdoc' | 'outdated';
  affectedAPIs: string[];
}

export interface TestCoverageGapIssue extends Issue {
  type: 'test_coverage_gap';
  currentCoverage: number;
  targetCoverage: number;
  uncoveredFunctions: string[];
  uncoveredLines: number[];
}

// ============================================================================
// Remediation Types
// ============================================================================

export type ActionType =
  | 'consolidate_services'
  | 'complete_implementation'
  | 'remove_unused_code'
  | 'consolidate_config'
  | 'fix_security_issue'
  | 'add_tests'
  | 'add_documentation'
  | 'refactor_complexity';

export type ActionStatus = 'pending' | 'executing' | 'completed' | 'failed' | 'rolled_back';

export interface RemediationPlan {
  id: string;
  phases: RemediationPhase[];
  totalIssues: number;
  estimatedDuration: number;
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface RemediationPhase {
  id: string;
  name: string;
  order: number;
  actions: RemediationAction[];
  dependencies: string[]; // phase IDs
  rollbackStrategy: RollbackStrategy;
}

export interface RemediationAction {
  id: string;
  issueId: string;
  type: ActionType;
  description: string;
  filesToModify: string[];
  filesToDelete: string[];
  testCommand: string;
  autoExecutable: boolean;
  estimatedDuration: number;
}

export interface RollbackStrategy {
  type: 'backup' | 'git' | 'manual';
  backupLocation?: string;
  instructions?: string;
}

export interface ExecutionResult {
  actionId: string;
  success: boolean;
  filesModified: string[];
  filesDeleted: string[];
  backupId: string;
  testResults: TestResult;
  duration: number;
  error?: Error;
  timestamp: Date;
}

export interface TestResult {
  passed: boolean;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  coverage: number;
  failureDetails?: TestFailure[];
}

export interface TestFailure {
  testName: string;
  errorMessage: string;
  stackTrace: string;
}

export interface PhaseResult {
  phaseId: string;
  success: boolean;
  completedActions: number;
  totalActions: number;
  duration: number;
  rollbackPerformed: boolean;
  timestamp: Date;
}

// ============================================================================
// Backup and Rollback Types
// ============================================================================

export type BackupId = string;

export interface Backup {
  id: BackupId;
  timestamp: Date;
  files: BackupFile[];
  metadata: BackupMetadata;
}

export interface BackupFile {
  originalPath: string;
  backupPath: string;
  hash: string;
  size: number;
}

export interface BackupMetadata {
  actionId: string;
  reason: string;
  createdBy: string;
  tags: string[];
}

export interface RollbackResult {
  success: boolean;
  filesRestored: number;
  duration: number;
  error?: Error;
  timestamp: Date;
}

// ============================================================================
// Report Types
// ============================================================================

export type ReportFormat = 'json' | 'markdown' | 'html' | 'pdf';

export interface SummaryReport {
  timestamp: Date;
  totalIssues: number;
  issuesBySeverity: Map<IssueSeverity, number>;
  issuesByType: Map<IssueType, number>;
  estimatedEffort: number;
  topIssues: Issue[];
}

export interface DetailedReport extends SummaryReport {
  allIssues: Issue[];
  fileMetrics: FileMetrics[];
  dependencyGraph: DependencyGraph;
  recommendations: Recommendation[];
}

export interface FileMetrics {
  filePath: string;
  linesOfCode: number;
  complexity: ComplexityMetrics;
  coverage: number;
  issueCount: number;
  maintainabilityScore: number;
}

export interface Recommendation {
  priority: number;
  category: string;
  title: string;
  description: string;
  estimatedImpact: string;
  relatedIssues: string[];
}

export interface ProgressReport {
  timestamp: Date;
  issuesResolved: number;
  issuesRemaining: number;
  newIssues: number;
  coverageImprovement: number;
  timeSpent: number;
  estimatedTimeRemaining: number;
  previousScan?: Date;
}

export interface CertificationReport {
  timestamp: Date;
  productionReady: boolean;
  testCoverage: number;
  criticalIssues: number;
  highIssues: number;
  securityIssues: number;
  documentationComplete: boolean;
  recommendations: string[];
  certificationCriteria: CertificationCriteria;
}

export interface CertificationCriteria {
  minimumCoverage: number;
  maxCriticalIssues: number;
  maxHighIssues: number;
  maxSecurityIssues: number;
  requiresDocumentation: boolean;
}

// ============================================================================
// Configuration Types
// ============================================================================

export interface AuditConfig {
  scanning: ScanningConfig;
  detection: DetectionConfig;
  execution: ExecutionConfig;
  reporting: ReportingConfig;
}

export interface ScanningConfig {
  includePatterns: string[];
  excludePatterns: string[];
  maxFileSize: number;
  parallelWorkers: number;
  followSymlinks: boolean;
  maxDepth: number;
}

export interface DetectionConfig {
  duplicateThreshold: number; // 0-1, similarity percentage
  complexityThreshold: number;
  coverageThreshold: number; // 0-1
  securityRules: SecurityRule[];
  enabledDetectors: IssueType[];
}

export interface SecurityRule {
  id: string;
  name: string;
  severity: IssueSeverity;
  pattern: string;
  description: string;
  owaspCategory: string;
}

export interface ExecutionConfig {
  autoExecute: boolean;
  testAfterEachAction: boolean;
  rollbackOnFailure: boolean;
  backupRetentionDays: number;
  dryRun: boolean;
}

export interface ReportingConfig {
  defaultFormat: ReportFormat;
  includeGraphs: boolean;
  emailNotifications: boolean;
  outputDirectory: string;
}

// ============================================================================
// Database Schema Types
// ============================================================================

export interface IssueRecord {
  id: string;
  type: IssueType;
  severity: IssueSeverity;
  status: IssueStatus;
  title: string;
  description: string;
  filePath: string;
  lineNumber: number | null;
  detectedAt: string; // ISO date string
  resolvedAt: string | null;
  assignedTo: string | null;
  estimatedEffort: number;
  actualEffort: number | null;
  autoFixable: number; // SQLite boolean (0 or 1)
  metadata: string; // JSON string
}

export interface RemediationRecord {
  id: string;
  issueId: string;
  actionType: ActionType;
  status: ActionStatus;
  startedAt: string | null;
  completedAt: string | null;
  backupId: string | null;
  testsPassed: number | null; // SQLite boolean (0 or 1)
  filesModified: string; // JSON array string
  filesDeleted: string; // JSON array string
  error: string | null;
}

export interface MetricRecord {
  id: string;
  timestamp: string; // ISO date string
  metricType: string;
  value: number;
  metadata: string; // JSON string
}
