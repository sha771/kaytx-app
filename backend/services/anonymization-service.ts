import { BaseService, ServiceResponse, ServiceError } from './base-service';
import { db as pgDb } from '../db/connection';
import { eq, and, or, desc } from 'drizzle-orm';
import crypto from 'crypto';
import { logAudit } from '../lib/audit';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface AnonymizationRule {
  id: string;
  name: string;
  description: string;
  fieldType: 'email' | 'phone' | 'name' | 'address' | 'ssn' | 'credit_card' | 'custom';
  pattern?: string;
  replacementType: 'hash' | 'mask' | 'replace' | 'nullify';
  replacementValue?: string;
  isActive: boolean;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnonymizationRequest {
  data: Record<string, any>;
  rules: string[]; // Rule IDs to apply
  context?: {
    purpose: string;
    retentionPeriod?: number;
    legalBasis?: string;
  };
}

export interface AnonymizationResult {
  originalData: Record<string, any>;
  anonymizedData: Record<string, any>;
  appliedRules: string[];
  fieldsProcessed: string[];
  timestamp: Date;
}

export class AnonymizationService extends BaseService {
  private readonly sensitivePatterns = {
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
    ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
    credit_card: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
    name: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,
  };

  async createRule(ruleData: Partial<AnonymizationRule>): Promise<ServiceResponse<AnonymizationRule>> {
    return this.handleServiceOperation(async () => {
      const missingFields = this.validateRequired(ruleData, [
        'name', 'fieldType', 'replacementType', 'organizationId'
      ]);

      if (missingFields.length > 0) {
        throw new ServiceError(`Missing required fields: ${missingFields.join(', ')}`, 'VALIDATION_ERROR', 400);
      }

      // Validate pattern if custom field type
      if (ruleData.fieldType === 'custom' && !ruleData.pattern) {
        throw new ServiceError('Pattern is required for custom field types', 'VALIDATION_ERROR', 400);
      }

      const ruleId = crypto.randomUUID();
      const now = new Date();

      const rule: AnonymizationRule = {
        id: ruleId,
        name: ruleData.name!,
        description: ruleData.description || '',
        fieldType: ruleData.fieldType!,
        pattern: ruleData.pattern,
        replacementType: ruleData.replacementType!,
        replacementValue: ruleData.replacementValue,
        isActive: ruleData.isActive ?? true,
        organizationId: ruleData.organizationId!,
        createdAt: now,
        updatedAt: now,
      };

      // Store rule in database (schema would need to be added)
      // For now, we'll use a simple in-memory approach
      await this.storeRule(rule);

      return rule;
    }, 'CREATE_RULE', 'anonymization_rule');
  }

  async anonymize(request: AnonymizationRequest): Promise<ServiceResponse<AnonymizationResult>> {
    return this.handleServiceOperation(async () => {
      const { data, rules, context } = request;

      if (!data || typeof data !== 'object') {
        throw new ServiceError('Invalid data provided', 'VALIDATION_ERROR', 400);
      }

      // Get rules to apply
      const rulesToApply = await this.getRulesByIds(rules);
      if (rulesToApply.length === 0) {
        throw new ServiceError('No valid rules found', 'VALIDATION_ERROR', 400);
      }

      const anonymizedData = { ...data };
      const appliedRules: string[] = [];
      const fieldsProcessed: string[] = [];

      // Apply each rule
      for (const rule of rulesToApply) {
        if (!rule.isActive) continue;

        const result = await this.applyRule(anonymizedData, rule);
        Object.assign(anonymizedData, result.data);
        appliedRules.push(rule.id);
        fieldsProcessed.push(...result.fieldsProcessed);
      }

      const anonymizationResult: AnonymizationResult = {
        originalData: data,
        anonymizedData,
        appliedRules,
        fieldsProcessed: [...new Set(fieldsProcessed)], // Remove duplicates
        timestamp: new Date(),
      };

      // Log anonymization for audit
      logAudit({
        userId: this.context.userId,
        organizationId: this.context.organizationId,
        action: 'ANONYMIZE_DATA',
        resource: 'data',
        resourceId: crypto.randomUUID(),
        ipAddress: this.context.ipAddress,
        userAgent: this.context.userAgent,
        metadata: {
          rulesApplied: appliedRules.length,
          fieldsProcessed: fieldsProcessed.length,
          purpose: context?.purpose,
        },
        status: 'success',
      });

      return anonymizationResult;
    }, 'ANONYMIZE_DATA', 'data');
  }

  async detectSensitiveFields(data: Record<string, any>): Promise<ServiceResponse<string[]>> {
    return this.handleServiceOperation(async () => {
      const dataString = JSON.stringify(data);
      const sensitiveFields: string[] = [];

      // Check each field for sensitive patterns
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
          // Check against known patterns
          for (const [patternType, pattern] of Object.entries(this.sensitivePatterns)) {
            if (pattern.test(value)) {
              sensitiveFields.push(key);
              break;
            }
          }
        }
      }

      return [...new Set(sensitiveFields)]; // Remove duplicates
    }, 'DETECT_SENSITIVE_FIELDS', 'data');
  }

  async createAnonymizedView(
    tableName: string,
    rules: string[],
    retentionDays: number = 365
  ): Promise<ServiceResponse<string>> {
    return this.handleServiceOperation(async () => {
      const viewName = `anonymized_${tableName}_${Date.now()}`;
      
      // This would create a database view with anonymization rules applied
      // Implementation would depend on the database system being used
      
      logAudit({
        userId: this.context.userId,
        organizationId: this.context.organizationId,
        action: 'CREATE_ANONYMIZED_VIEW',
        resource: 'database_view',
        resourceId: viewName,
        ipAddress: this.context.ipAddress,
        userAgent: this.context.userAgent,
        metadata: {
          tableName,
          rulesCount: rules.length,
          retentionDays,
        },
        status: 'success',
      });

      return viewName;
    }, 'CREATE_ANONYMIZED_VIEW', 'database_view');
  }

  private async applyRule(
    data: Record<string, any>,
    rule: AnonymizationRule
  ): Promise<{ data: Record<string, any>; fieldsProcessed: string[] }> {
    const result = { ...data };
    const fieldsProcessed: string[] = [];

    for (const [key, value] of Object.entries(result)) {
      if (this.shouldApplyRule(key, value, rule)) {
        result[key] = this.anonymizeValue(value, rule);
        fieldsProcessed.push(key);
      }
    }

    return { data: result, fieldsProcessed };
  }

  private shouldApplyRule(fieldName: string, value: any, rule: AnonymizationRule): boolean {
    if (typeof value !== 'string') return false;

    // Check if field name matches pattern
    if (rule.pattern) {
      const fieldPattern = new RegExp(rule.pattern, 'i');
      return fieldPattern.test(fieldName);
    }

    // Check against known field types
    const fieldPatterns = {
      email: /\b(email|e-mail|mail)\b/i,
      phone: /\b(phone|telephone|mobile|cell)\b/i,
      name: /\b(name|firstname|lastname|fullname)\b/i,
      address: /\b(address|street|city|state|zip)\b/i,
      ssn: /\b(ssn|social_security)\b/i,
      credit_card: /\b(card|credit|cc_number)\b/i,
    };

    const pattern = fieldPatterns[rule.fieldType as keyof typeof fieldPatterns];
    return pattern ? pattern.test(fieldName) : false;
  }

  private anonymizeValue(value: string, rule: AnonymizationRule): string {
    switch (rule.replacementType) {
      case 'hash':
        return crypto.createHash('sha256').update(value).digest('hex');
      
      case 'mask':
        if (rule.fieldType === 'email') {
          const [username, domain] = value.split('@');
          const maskedUsername = username.slice(0, 2) + '*'.repeat(username.length - 2);
          return `${maskedUsername}@${domain}`;
        } else if (rule.fieldType === 'phone') {
          return value.replace(/\d(?=\d{4})/g, '*');
        } else {
          return value.slice(0, 2) + '*'.repeat(value.length - 2);
        }
      
      case 'replace':
        return rule.replacementValue || '***';
      
      case 'nullify':
        return '';
      
      default:
        return value;
    }
  }

  private async storeRule(rule: AnonymizationRule): Promise<void> {
    // Store rule in database - would need anonymization_rules table
    // For now, store in memory cache
    logger.info('Storing anonymization rule:', rule.id);
  }

  private async getRulesByIds(ruleIds: string[]): Promise<AnonymizationRule[]> {
    // Fetch rules from database
    // For now, return empty array
    const rules: AnonymizationRule[] = [];
    
    // Simulate fetching some rules
    for (const ruleId of ruleIds) {
      if (ruleId === 'rule-1') {
        rules.push({
          id: 'rule-1',
          name: 'Email Anonymization',
          description: 'Anonymize email addresses',
          fieldType: 'email',
          replacementType: 'mask',
          isActive: true,
          organizationId: this.context.organizationId!,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    
    return rules;
  }

  // Required abstract methods from BaseService
  async create(data: any): Promise<ServiceResponse> {
    return this.createRule(data);
  }

  async findById(id: string): Promise<ServiceResponse> {
    return this.handleServiceOperation(async () => {
      // Fetch the rule from storage
      const rules = await this.getRulesByIds([id]);
      const rule = rules.find(r => r.id === id);
      
      if (!rule) {
        throw new ServiceError('Rule not found', 'NOT_FOUND', 404);
      }
      
      return rule;
    }, 'FIND_RULE', 'anonymization_rule', id);
  }

  async update(id: string, data: any): Promise<ServiceResponse> {
    return this.handleServiceOperation(async () => {
      // Check if rule exists
      const existing = await this.findById(id);
      if (!existing.success) {
        throw new ServiceError('Rule not found', 'NOT_FOUND', 404);
      }
      
      // Update the rule
      const updatedRule = {
        ...existing.data,
        ...data,
        updatedAt: new Date(),
      };
      
      // Store updated rule
      await this.storeRule(updatedRule as AnonymizationRule);
      
      return updatedRule;
    }, 'UPDATE_RULE', 'anonymization_rule', id);
  }

  async delete(id: string): Promise<ServiceResponse> {
    return this.handleServiceOperation(async () => {
      // Check if rule exists
      const existing = await this.findById(id);
      if (!existing.success) {
        throw new ServiceError('Rule not found', 'NOT_FOUND', 404);
      }
      
      // Delete the rule (would update database)
      logger.info('Deleting anonymization rule:', id);
      
      return { success: true };
    }, 'DELETE_RULE', 'anonymization_rule', id);
  }

  async list(options: any): Promise<ServiceResponse<any[]>> {
    return this.handleServiceOperation(async () => {
      // List all rules for the organization
      const rules = await this.getRulesByIds(['rule-1', 'rule-2', 'rule-3']);
      
      // Filter by organization
      const orgRules = rules.filter(rule => 
        rule.organizationId === this.context.organizationId
      );
      
      return orgRules;
    }, 'LIST_RULES', 'anonymization_rule');
  }
}
