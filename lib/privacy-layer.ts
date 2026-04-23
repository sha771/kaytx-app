/**
 * Privacy Layer Service - Integration layer for all 9 privacy agents
 */

import {
  DataSensitivity,
  DataType,
  DataClassificationResult,
  PurposeValidation,
  AccessRequest,
  MaskingStrategy,
  ComplianceCheck,
  Regulation,
  AuditLogEntry,
  PrivacyResult,
} from '../types/privacy-layer';

import {
  allPrivacyAgents,
  getPrivacyAgentById,
  privacyDataClassifier,
  privacyPurposeValidator,
  privacyAccessController,
  privacyDataMasker,
  privacyContextFilter,
  privacyPermissionEnforcer,
  privacyOutputSanitizer,
  privacyComplianceChecker,
  privacyAuditLogger,
} from '../constants/privacy-agents';

// ============================================
// CLASSIFICATION RULES
// ============================================

const sensitivityRules: Record<string, DataSensitivity> = {
  'ssn': DataSensitivity.PROHIBITED,
  'credit_card': DataSensitivity.PROHIBITED,
  'password': DataSensitivity.PROHIBITED,
  'email': DataSensitivity.RESTRICTED,
  'phone': DataSensitivity.RESTRICTED,
  'name': DataSensitivity.CONFIDENTIAL,
  'address': DataSensitivity.CONFIDENTIAL,
  'medical_record': DataSensitivity.RESTRICTED,
  'salary': DataSensitivity.CONFIDENTIAL,
  'strategy': DataSensitivity.CONFIDENTIAL,
  'marketing_content': DataSensitivity.PUBLIC,
  'public_announcement': DataSensitivity.PUBLIC,
};

const dataTypePatterns: Record<string, RegExp> = {
  ssn: /^\d{3}-\d{2}-\d{4}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?\d{10,15}$/,
  credit_card: /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/,
};

// ============================================
// MASKING RULES
// ============================================

const maskingRules: Record<string, MaskingStrategy> = {
  email: { field: 'email', strategy: 'partial', pattern: /(.{2})(.*)(@.*)/, replacement: '$1***$3' },
  phone: { field: 'phone', strategy: 'partial', pattern: /(\d{3})(\d{3})(\d{4})/, replacement: '$1-***-$3' },
  ssn: { field: 'ssn', strategy: 'redact', replacement: '***-**-****' },
  credit_card: { field: 'credit_card', strategy: 'tokenize', replacement: '****-****-****-{{last4}}' },
  name: { field: 'name', strategy: 'partial', pattern: /(.)(.*)/, replacement: '$1***' },
  address: { field: 'address', strategy: 'partial', pattern: /(\d+)\s(.*)/, replacement: '$1 ***' },
};

// ============================================
// PERMISSION MATRIX
// ============================================

const rolePermissions: Record<string, { maxSensitivity: DataSensitivity; operations: string[] }> = {
  'ceo': { maxSensitivity: DataSensitivity.PROHIBITED, operations: ['read','write','delete','share'] },
  'c_suite': { maxSensitivity: DataSensitivity.RESTRICTED, operations: ['read','write','share'] },
  'department_head': { maxSensitivity: DataSensitivity.CONFIDENTIAL, operations: ['read','write'] },
  'agent': { maxSensitivity: DataSensitivity.INTERNAL, operations: ['read','write'] },
  'public': { maxSensitivity: DataSensitivity.PUBLIC, operations: ['read'] },
};

// ============================================
// PRIVACY LAYER SERVICE
// ============================================

class PrivacyLayerService {
  private auditLog: AuditLogEntry[] = [];

  // --- INPUT GATE ---

  async processInput(data: any, requester: string): Promise<PrivacyResult> {
    const warnings: string[] = [];

    // Step 1: Classify data
    const classification = this.classifyData(data);
    if (classification.sensitivity === DataSensitivity.PROHIBITED) {
      this.logAudit(requester, 'INPUT_BLOCKED', classification.dataType, classification.sensitivity, 'rejected');
      return { status: 'blocked', data: null, warnings: ['Prohibited data detected and blocked'], classification };
    }

    // Step 2: Validate purpose
    const purposeValidation = this.validatePurpose(requester, classification.dataType);
    if (!purposeValidation.isValid) {
      warnings.push(`Purpose validation failed: ${purposeValidation.message}`);
    }

    // Step 3: Check access
    const hasAccess = this.checkAccess(requester, classification.dataType, 'read', classification.sensitivity);
    if (!hasAccess) {
      this.logAudit(requester, 'INPUT_BLOCKED', classification.dataType, classification.sensitivity, 'rejected');
      return { status: 'blocked', data: null, warnings: ['Access denied'], classification };
    }

    this.logAudit(requester, 'INPUT_ALLOWED', classification.dataType, classification.sensitivity, 'success');
    return { status: 'allowed', data, warnings, classification };
  }

  // --- AGENT GATE ---

  async processForAgent(data: any, agentId: string, agentRole: string, task: string): Promise<PrivacyResult> {
    const warnings: string[] = [];

    // Step 1: Mask sensitive data
    const maskedData = this.maskData(data);

    // Step 2: Filter by context
    const filteredData = this.filterByContext(maskedData, agentRole, task);

    // Step 3: Enforce permissions
    const enforcement = this.enforcePermission(agentId, filteredData);
    if (enforcement === 'BLOCK') {
      this.logAudit(agentId, 'AGENT_BLOCKED', DataType.BUSINESS, DataSensitivity.INTERNAL, 'rejected');
      return { status: 'blocked', data: null, warnings: ['Permission enforcement blocked access'] };
    }
    if (enforcement === 'MASK') {
      warnings.push('Data masked by permission enforcer');
    }

    this.logAudit(agentId, 'AGENT_ALLOWED', DataType.BUSINESS, DataSensitivity.INTERNAL, 'success');
    return { status: enforcement === 'MASK' ? 'masked' : 'allowed', data: filteredData, warnings };
  }

  // --- OUTPUT GATE ---

  async processOutput(data: any, recipient: string, regulation?: Regulation): Promise<PrivacyResult> {
    const warnings: string[] = [];

    // Step 1: Sanitize output
    const sanitized = this.sanitizeOutput(data);

    // Step 2: Check compliance
    const complianceChecks: ComplianceCheck[] = [];
    if (regulation) {
      const check = this.checkCompliance(sanitized, regulation);
      complianceChecks.push(check);
      if (!check.isCompliant) {
        warnings.push(`Compliance check failed: ${check.violations.join(', ')}`);
      }
    }

    // Step 3: Log access
    this.logAudit(recipient, 'OUTPUT_DELIVERED', DataType.PUBLIC_CONTENT, DataSensitivity.PUBLIC, 'success');

    return { status: 'allowed', data: sanitized, warnings, compliance: complianceChecks };
  }

  // --- CLASSIFICATION ---

  private classifyData(data: any): DataClassificationResult {
    // Simple heuristic classification
    let detectedType = DataType.PUBLIC_CONTENT;
    let sensitivity = DataSensitivity.PUBLIC;

    const dataStr = JSON.stringify(data).toLowerCase();

    for (const [field, pattern] of Object.entries(dataTypePatterns)) {
      if (pattern.test(dataStr)) {
        detectedType = field as DataType;
        sensitivity = sensitivityRules[field] || DataSensitivity.INTERNAL;
        break;
      }
    }

    if (dataStr.includes('strategy') || dataStr.includes('confidential')) {
      sensitivity = DataSensitivity.CONFIDENTIAL;
    }

    return {
      sensitivity,
      dataType: detectedType,
      confidence: 0.95,
      requiresMasking: sensitivity >= DataSensitivity.CONFIDENTIAL,
      allowedRecipients: this.getAllowedRecipients(sensitivity),
    };
  }

  private getAllowedRecipients(sensitivity: DataSensitivity): string[] {
    switch (sensitivity) {
      case DataSensitivity.PUBLIC: return ['all'];
      case DataSensitivity.INTERNAL: return ['employees','agents'];
      case DataSensitivity.CONFIDENTIAL: return ['managers','executives'];
      case DataSensitivity.RESTRICTED: return ['executives','legal'];
      case DataSensitivity.PROHIBITED: return ['none'];
      default: return ['none'];
    }
  }

  // --- PURPOSE VALIDATION ---

  private validatePurpose(requester: string, dataType: DataType): PurposeValidation {
    const validPurposes: Record<string, string[]> = {
      'customer_service': ['pii','public_content'],
      'marketing': ['public_content'],
      'analytics': ['public_content','business'],
      'security': ['pii','financial','health','business','system','public_content'],
      'legal': ['pii','financial','health','business','system','public_content'],
    };

    const purpose = this.inferPurpose(requester);
    const allowed = validPurposes[purpose] || [];

    return {
      isValid: allowed.includes(dataType),
      purpose,
      justification: `Purpose: ${purpose}, DataType: ${dataType}`,
      conditions: ['logged','audited'],
    };
  }

  private inferPurpose(requester: string): string {
    if (requester.includes('support') || requester.includes('cx')) return 'customer_service';
    if (requester.includes('marketing') || requester.includes('mkt')) return 'marketing';
    if (requester.includes('analytics') || requester.includes('data')) return 'analytics';
    if (requester.includes('security') || requester.includes('ciso')) return 'security';
    if (requester.includes('legal') || requester.includes('compliance')) return 'legal';
    return 'general';
  }

  // --- ACCESS CONTROL ---

  private checkAccess(requester: string, dataType: DataType, operation: string, sensitivity?: DataSensitivity): boolean {
    const role = this.inferRole(requester);
    const perms = rolePermissions[role];
    if (!perms) return false;

    if (!perms.operations.includes(operation)) return false;
    if (sensitivity && this.sensitivityRank(sensitivity) > this.sensitivityRank(perms.maxSensitivity)) return false;

    return true;
  }

  private inferRole(requester: string): string {
    if (requester.includes('ceo')) return 'ceo';
    if (requester.includes('c_') || requester.includes('chief')) return 'c_suite';
    if (requester.includes('head') || requester.includes('vp')) return 'department_head';
    if (requester.includes('agent') || requester.includes('bot')) return 'agent';
    return 'public';
  }

  private sensitivityRank(s: DataSensitivity): number {
    const ranks: Record<string, number> = { public: 0, internal: 1, confidential: 2, restricted: 3, prohibited: 4 };
    return ranks[s] || 0;
  }

  // --- MASKING ---

  private maskData(data: any): any {
    if (typeof data !== 'object' || data === null) return data;

    const result: any = Array.isArray(data) ? [] : {};
    for (const [key, value] of Object.entries(data)) {
      const rule = maskingRules[key.toLowerCase()];
      if (rule && typeof value === 'string') {
        if (rule.strategy === 'redact') {
          result[key] = rule.replacement;
        } else if (rule.strategy === 'partial' && rule.pattern) {
          result[key] = value.replace(rule.pattern, rule.replacement || '***');
        } else if (rule.strategy === 'tokenize') {
          const last4 = value.slice(-4);
          result[key] = (rule.replacement || '****-****-****-{{last4}}').replace('{{last4}}', last4);
        } else {
          result[key] = '***';
        }
      } else if (typeof value === 'object') {
        result[key] = this.maskData(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  // --- CONTEXT FILTERING ---

  private filterByContext(data: any, agentRole: string, task: string): any {
    const roleFilters: Record<string, string[]> = {
      'marketing': ['name','email','public_content'],
      'sales': ['name','email','phone','public_content'],
      'support': ['name','email','phone','address','public_content'],
      'hr': ['name','salary','public_content'],
      'finance': ['name','salary','credit_card','public_content'],
    };

    const allowedFields = roleFilters[agentRole] || ['public_content'];

    if (typeof data !== 'object' || data === null) return data;

    const result: any = Array.isArray(data) ? [] : {};
    for (const [key, value] of Object.entries(data)) {
      if (allowedFields.includes(key.toLowerCase()) || typeof value === 'object') {
        result[key] = typeof value === 'object' ? this.filterByContext(value, agentRole, task) : value;
      }
    }
    return result;
  }

  // --- PERMISSION ENFORCEMENT ---

  private enforcePermission(agentId: string, data: any): string {
    const sensitiveFields = ['ssn','credit_card','password','medical_record'];
    const dataStr = JSON.stringify(data).toLowerCase();

    for (const field of sensitiveFields) {
      if (dataStr.includes(field)) {
        return 'MASK';
      }
    }
    return 'ALLOW';
  }

  // --- OUTPUT SANITIZATION ---

  private sanitizeOutput(data: any): any {
    const internalPatterns = [
      /agent_id_[a-z0-9]+/gi,
      /internal_note:.*/gi,
      /debug_.*/gi,
      /system_.*/gi,
    ];

    let dataStr = JSON.stringify(data);
    for (const pattern of internalPatterns) {
      dataStr = dataStr.replace(pattern, '[REDACTED]');
    }

    try {
      return JSON.parse(dataStr);
    } catch {
      return data;
    }
  }

  // --- COMPLIANCE ---

  private checkCompliance(data: any, regulation: Regulation): ComplianceCheck {
    const violations: string[] = [];
    const recommendations: string[] = [];
    const requiredConsents: string[] = [];

    const dataStr = JSON.stringify(data).toLowerCase();

    switch (regulation) {
      case Regulation.GDPR:
        if (dataStr.includes('email') || dataStr.includes('name')) {
          requiredConsents.push('data_processing_consent');
          recommendations.push('Ensure data processing consent is recorded');
        }
        break;
      case Regulation.CCPA:
        if (dataStr.includes('email') || dataStr.includes('phone')) {
          recommendations.push('Provide opt-out mechanism');
        }
        break;
      case Regulation.HIPAA:
        if (dataStr.includes('medical') || dataStr.includes('health')) {
          violations.push('PHI detected - ensure encryption and access controls');
          recommendations.push('Apply HIPAA safeguards');
        }
        break;
      case Regulation.PCI_DSS:
        if (dataStr.includes('credit_card')) {
          violations.push('PCI data must be tokenized');
          recommendations.push('Tokenize all payment card data');
        }
        break;
    }

    return {
      regulation,
      isCompliant: violations.length === 0,
      violations,
      recommendations,
      requiredConsents,
    };
  }

  // --- AUDIT LOGGING ---

  private logAudit(agentId: string, action: string, dataType: DataType, sensitivity: DataSensitivity, result: 'success' | 'blocked' | 'masked' | 'approved' | 'rejected'): void {
    const entry: AuditLogEntry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,
      timestamp: new Date(),
      agentId,
      action,
      dataType,
      sensitivity,
      purpose: 'privacy_layer',
      result,
    };
    this.auditLog.push(entry);

    // Keep last 10000 entries
    if (this.auditLog.length > 10000) {
      this.auditLog = this.auditLog.slice(-10000);
    }
  }

  getAuditLog(agentId?: string, startDate?: Date, endDate?: Date): AuditLogEntry[] {
    let logs = this.auditLog;
    if (agentId) {
      logs = logs.filter(l => l.agentId === agentId);
    }
    if (startDate) {
      logs = logs.filter(l => l.timestamp >= startDate);
    }
    if (endDate) {
      logs = logs.filter(l => l.timestamp <= endDate);
    }
    return logs;
  }

  generateComplianceReport(regulation: Regulation): string {
    const logs = this.auditLog.filter(l => l.result === 'blocked' || l.result === 'rejected');
    return `${regulation.toUpperCase()} Compliance Report: ${logs.length} violations detected in last ${this.auditLog.length} operations.`;
  }

  // --- HELPERS ---

  getPrivacyAgent(id: string) {
    return getPrivacyAgentById(id);
  }

  getAllPrivacyAgents() {
    return allPrivacyAgents;
  }
}

export const privacyLayerService = new PrivacyLayerService();
export default privacyLayerService;
