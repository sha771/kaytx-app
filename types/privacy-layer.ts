/**
 * =============================================================================
 * PRIVACY LAYER - TypeScript Type Definitions
 * =============================================================================
 *
 * Type definitions for the Privacy Layer system that classifies, filters,
 * and monitors all data flowing through the KAYTX AI Workforce hierarchy.
 *
 * @version 1.0.0
 * @lastUpdated 2026-04-23
 */

// ============================================
// DATA SENSITIVITY LEVELS
// ============================================

export enum DataSensitivity {
  PUBLIC = 'public',
  INTERNAL = 'internal',
  CONFIDENTIAL = 'confidential',
  RESTRICTED = 'restricted',
  PROHIBITED = 'prohibited',
}

// ============================================
// DATA TYPES
// ============================================

export enum DataType {
  PII = 'pii',
  FINANCIAL = 'financial',
  HEALTH = 'health',
  BUSINESS = 'business',
  SYSTEM = 'system',
  PUBLIC_CONTENT = 'public_content',
}

// ============================================
// ACCESS LEVELS
// ============================================

export enum AccessLevel {
  NONE = 'none',
  READ_ONLY = 'read_only',
  READ_WRITE = 'read_write',
  FULL_ACCESS = 'full_access',
  ADMIN = 'admin',
}

// ============================================
// ENFORCEMENT ACTIONS
// ============================================

export enum EnforcementAction {
  ALLOW = 'allow',
  BLOCK = 'block',
  MASK = 'mask',
  REQUIRE_APPROVAL = 'require_approval',
  LOG_ONLY = 'log_only',
}

// ============================================
// REGULATIONS
// ============================================

export enum Regulation {
  GDPR = 'gdpr',
  CCPA = 'ccpa',
  HIPAA = 'hipaa',
  PCI_DSS = 'pci_dss',
  SOC2 = 'soc2',
}

// ============================================
// CLASSIFICATION
// ============================================

export interface ClassificationRequest {
  data: any;
  source: string;
  context: string;
  requester: string;
}

export interface DataClassificationResult {
  sensitivity: DataSensitivity;
  dataType: DataType;
  confidence: number;
  requiresMasking: boolean;
  allowedRecipients: string[];
  message?: string;
}

// ============================================
// PURPOSE VALIDATION
// ============================================

export interface PurposeValidation {
  isValid: boolean;
  purpose: string;
  justification: string;
  expiration?: Date;
  conditions: string[];
  message?: string;
}

export interface PurposeValidationRequest {
  purpose: string;
  dataType: DataType;
  sensitivity: DataSensitivity;
  requesterId: string;
  customerId?: string;
}

// ============================================
// ACCESS CONTROL
// ============================================

export interface AccessRequest {
  agentId: string;
  dataType: DataType;
  operation: 'read' | 'write' | 'delete' | 'share';
  sensitivity?: DataSensitivity;
  purpose?: string;
  customerId?: string;
}

export interface PermissionMatrix {
  agentId: string;
  allowedDataTypes: DataType[];
  allowedSensitivity: DataSensitivity[];
  maxSensitivity: DataSensitivity;
  operations: ('read' | 'write' | 'delete' | 'share')[];
  requiresApproval: boolean;
  approvalWorkflow: string[];
}

export interface RolePermissions {
  role: string;
  departments: string[];
  dataTypes: DataType[];
  sensitivityMax: DataSensitivity;
  operations: ('read' | 'write' | 'delete' | 'share')[];
}

// ============================================
// MASKING
// ============================================

export interface MaskingStrategy {
  field: string;
  strategy: 'redact' | 'partial' | 'tokenize' | 'hash' | 'encrypt';
  pattern?: RegExp;
  replacement?: string;
  preserveFormat?: boolean;
}

export interface MaskingRule {
  field: string;
  strategy: MaskingStrategy['strategy'];
  pattern?: string;
  replacement: string;
}

// ============================================
// CONTEXT FILTERING
// ============================================

export interface ContextFilter {
  agentRole: string;
  department: string;
  currentTask: string;
  dataRelevance: number;
  isNecessary: boolean;
}

// ============================================
// SANITIZATION
// ============================================

export interface SanitizationRule {
  pattern: RegExp;
  replacement: string;
  appliesTo: ('response' | 'logs' | 'metadata')[];
}

// ============================================
// COMPLIANCE
// ============================================

export interface ComplianceCheck {
  regulation: Regulation;
  isCompliant: boolean;
  violations: string[];
  recommendations: string[];
  requiredConsents: string[];
  message?: string;
}

// ============================================
// AUDIT LOGGING
// ============================================

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  agentId: string;
  action: string;
  dataType: DataType;
  sensitivity: DataSensitivity;
  purpose: string;
  result: 'success' | 'blocked' | 'masked' | 'approved' | 'rejected';
  details?: any;
}

// ============================================
// PRIVACY RESULT
// ============================================

export interface PrivacyResult {
  status: 'allowed' | 'blocked' | 'masked' | 'requires_approval';
  data: any;
  warnings: string[];
  classification?: DataClassificationResult;
  compliance?: ComplianceCheck[];
  auditLog?: AuditLogEntry;
  message?: string;
}

// ============================================
// PRIVACY AGENT CONFIG
// ============================================

export interface PrivacyAgentConfig {
  id: string;
  name: string;
  role: string;
  gate: 'input' | 'agent' | 'output';
  enabled: boolean;
  priority: number;
  rules: any[];
}
