/**
 * Configuration schema and validation using Zod
 * Validates: Requirements 4.6, 4.7, 4.8
 */

import { z } from 'zod';
import type {
  AuditConfig,
  ScanningConfig,
  DetectionConfig,
  ExecutionConfig,
  ReportingConfig,
  SecurityRule,
  IssueType,
  IssueSeverity,
  ReportFormat,
} from '../models/types';

// ============================================================================
// Security Rule Schema
// ============================================================================

export const SecurityRuleSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  pattern: z.string().min(1),
  description: z.string().min(1),
  owaspCategory: z.string().min(1),
}) satisfies z.ZodType<SecurityRule>;

// ============================================================================
// Scanning Configuration Schema
// ============================================================================

export const ScanningConfigSchema = z.object({
  includePatterns: z.array(z.string()).min(1, 'At least one include pattern is required'),
  excludePatterns: z.array(z.string()).default([]),
  maxFileSize: z.number().positive().default(1024 * 1024), // 1MB default
  parallelWorkers: z.number().int().positive().max(16).default(4),
  followSymlinks: z.boolean().default(false),
  maxDepth: z.number().int().positive().default(50),
}) satisfies z.ZodType<ScanningConfig>;

// ============================================================================
// Detection Configuration Schema
// ============================================================================

const IssueTypeSchema = z.enum([
  'duplicate_service',
  'incomplete_implementation',
  'unused_code',
  'configuration_issue',
  'security_issue',
  'documentation_gap',
  'test_coverage_gap',
  'complexity_issue',
  'dependency_cycle',
]) satisfies z.ZodType<IssueType>;

export const DetectionConfigSchema = z.object({
  duplicateThreshold: z
    .number()
    .min(0, 'Duplicate threshold must be between 0 and 1')
    .max(1, 'Duplicate threshold must be between 0 and 1')
    .default(0.7),
  complexityThreshold: z.number().positive().default(20),
  coverageThreshold: z
    .number()
    .min(0, 'Coverage threshold must be between 0 and 1')
    .max(1, 'Coverage threshold must be between 0 and 1')
    .default(0.8),
  securityRules: z.array(SecurityRuleSchema).default([]),
  enabledDetectors: z.array(IssueTypeSchema).default([
    'duplicate_service',
    'incomplete_implementation',
    'unused_code',
    'configuration_issue',
    'security_issue',
    'documentation_gap',
    'test_coverage_gap',
    'complexity_issue',
    'dependency_cycle',
  ]),
}) satisfies z.ZodType<DetectionConfig>;

// ============================================================================
// Execution Configuration Schema
// ============================================================================

export const ExecutionConfigSchema = z.object({
  autoExecute: z.boolean().default(false),
  testAfterEachAction: z.boolean().default(true),
  rollbackOnFailure: z.boolean().default(true),
  backupRetentionDays: z.number().int().positive().default(30),
  dryRun: z.boolean().default(false),
}) satisfies z.ZodType<ExecutionConfig>;

// ============================================================================
// Reporting Configuration Schema
// ============================================================================

const ReportFormatSchema = z.enum(['json', 'markdown', 'html', 'pdf']) satisfies z.ZodType<ReportFormat>;

export const ReportingConfigSchema = z.object({
  defaultFormat: ReportFormatSchema.default('markdown'),
  includeGraphs: z.boolean().default(true),
  emailNotifications: z.boolean().default(false),
  outputDirectory: z.string().default('./reports'),
}) satisfies z.ZodType<ReportingConfig>;

// ============================================================================
// Main Audit Configuration Schema
// ============================================================================

export const AuditConfigSchema = z.object({
  scanning: ScanningConfigSchema,
  detection: DetectionConfigSchema,
  execution: ExecutionConfigSchema,
  reporting: ReportingConfigSchema,
}) satisfies z.ZodType<AuditConfig>;

// ============================================================================
// Environment Variable Schema
// ============================================================================

export const EnvironmentVariablesSchema = z.object({
  // Database
  AUDIT_DB_PATH: z.string().default('./backend/audit-system/db/audit.db'),
  
  // Backup
  AUDIT_BACKUP_PATH: z.string().default('./.audit-backups'),
  
  // Reporting
  AUDIT_REPORT_PATH: z.string().default('./reports'),
  
  // Performance
  AUDIT_MAX_WORKERS: z.coerce.number().int().positive().max(16).default(4),
  AUDIT_MAX_FILE_SIZE: z.coerce.number().positive().default(1048576),
  
  // Thresholds
  AUDIT_DUPLICATE_THRESHOLD: z.coerce.number().min(0).max(1).default(0.7),
  AUDIT_COVERAGE_THRESHOLD: z.coerce.number().min(0).max(1).default(0.8),
  AUDIT_COMPLEXITY_THRESHOLD: z.coerce.number().positive().default(20),
  
  // Execution
  AUDIT_AUTO_EXECUTE: z.coerce.boolean().default(false),
  AUDIT_DRY_RUN: z.coerce.boolean().default(false),
  AUDIT_ROLLBACK_ON_FAILURE: z.coerce.boolean().default(true),
  
  // Retention
  AUDIT_BACKUP_RETENTION_DAYS: z.coerce.number().int().positive().default(30),
});

export type EnvironmentVariables = z.infer<typeof EnvironmentVariablesSchema>;

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validates audit configuration
 * Throws ZodError if validation fails
 */
export function validateConfig(config: unknown): AuditConfig {
  return AuditConfigSchema.parse(config);
}

/**
 * Validates audit configuration with safe parsing
 * Returns success/error result
 */
export function validateConfigSafe(config: unknown): import('zod').ZodSafeParseResult<AuditConfig> {
  return AuditConfigSchema.safeParse(config);
}

/**
 * Validates environment variables
 * Throws ZodError if validation fails
 */
export function validateEnvironmentVariables(env: Record<string, string | undefined>): EnvironmentVariables {
  return EnvironmentVariablesSchema.parse(env);
}

/**
 * Validates environment variables with safe parsing
 * Returns success/error result
 */
export function validateEnvironmentVariablesSafe(
  env: Record<string, string | undefined>
): import('zod').ZodSafeParseResult<EnvironmentVariables> {
  return EnvironmentVariablesSchema.safeParse(env);
}

/**
 * Gets validated environment variables with defaults
 * Logs warnings for missing optional variables
 */
export function getValidatedEnvironmentVariables(): EnvironmentVariables {
  const result = validateEnvironmentVariablesSafe(process.env);
  
  if (!result.success) {
    console.error('Environment variable validation failed:');
    result.error.issues.forEach(err => {
      console.error(`  - ${err.path.join('.')}: ${err.message}`);
    });
    throw new Error('Invalid environment variables. See errors above.');
  }
  
  return result.data;
}

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_AUDIT_CONFIG: AuditConfig = {
  scanning: {
    includePatterns: ['**/*.ts', '**/*.tsx'],
    excludePatterns: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.expo/**',
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/*.property.test.ts',
    ],
    maxFileSize: 1024 * 1024, // 1MB
    parallelWorkers: 4,
    followSymlinks: false,
    maxDepth: 50,
  },
  detection: {
    duplicateThreshold: 0.7,
    complexityThreshold: 20,
    coverageThreshold: 0.8,
    securityRules: [
      {
        id: 'csrf-protection',
        name: 'CSRF Protection',
        severity: 'critical',
        pattern: 'csrf|CSRF|Cross-Site Request Forgery',
        description: 'Detects incomplete CSRF protection implementations',
        owaspCategory: 'A01:2021 – Broken Access Control',
      },
      {
        id: 'error-handling',
        name: 'Error Handling',
        severity: 'high',
        pattern: 'try.*catch|error handling|exception',
        description: 'Detects missing error handling in critical paths',
        owaspCategory: 'A04:2021 – Insecure Design',
      },
      {
        id: 'audit-logging',
        name: 'Audit Logging',
        severity: 'high',
        pattern: 'audit.*log|security.*log|authentication.*log',
        description: 'Detects incomplete audit logging',
        owaspCategory: 'A09:2021 – Security Logging and Monitoring Failures',
      },
    ],
    enabledDetectors: [
      'duplicate_service',
      'incomplete_implementation',
      'unused_code',
      'configuration_issue',
      'security_issue',
      'documentation_gap',
      'test_coverage_gap',
      'complexity_issue',
      'dependency_cycle',
    ],
  },
  execution: {
    autoExecute: false,
    testAfterEachAction: true,
    rollbackOnFailure: true,
    backupRetentionDays: 30,
    dryRun: false,
  },
  reporting: {
    defaultFormat: 'markdown',
    includeGraphs: true,
    emailNotifications: false,
    outputDirectory: './reports',
  },
};

/**
 * Merges user config with defaults
 */
export function mergeWithDefaults(userConfig: Partial<AuditConfig>): AuditConfig {
  return validateConfig({
    scanning: { ...DEFAULT_AUDIT_CONFIG.scanning, ...userConfig.scanning },
    detection: { ...DEFAULT_AUDIT_CONFIG.detection, ...userConfig.detection },
    execution: { ...DEFAULT_AUDIT_CONFIG.execution, ...userConfig.execution },
    reporting: { ...DEFAULT_AUDIT_CONFIG.reporting, ...userConfig.reporting },
  });
}
