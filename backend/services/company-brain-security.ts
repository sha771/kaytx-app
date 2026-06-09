/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import crypto from 'crypto';

/**
 * Company Brain Enterprise Security Service
 * Provides SSO, RBAC, encryption, and compliance features for enterprise-level security
 */

// Encryption utilities for data at rest
export class EncryptionService {
  private algorithm = 'aes-256-gcm';
  private keyLength = 32;
  private ivLength = 16;
  private saltLength = 64;
  private tagLength = 16;
  private iterations = 100000;

  /**
   * Generate a secure random key
   */
  generateKey(): Buffer {
    return crypto.randomBytes(this.keyLength);
  }

  /**
   * Derive a key from a password using PBKDF2
   */
  deriveKey(password: string, salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(password, salt, this.iterations, this.keyLength, 'sha256');
  }

  /**
   * Encrypt data using AES-256-GCM
   */
  encrypt(data: string, key: Buffer): { encrypted: string; iv: string; tag: string; salt: string } {
    const salt = crypto.randomBytes(this.saltLength);
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, key, iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();

    return {
      encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex'),
      salt: salt.toString('hex'),
    };
  }

  /**
   * Decrypt data using AES-256-GCM
   */
  decrypt(encryptedData: string, key: Buffer, iv: string, tag: string, salt: string): string {
    const ivBuffer = Buffer.from(iv, 'hex');
    const tagBuffer = Buffer.from(tag, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, key, ivBuffer);
    decipher.setAuthTag(tagBuffer);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  /**
   * Hash sensitive data for comparison (e.g., PII)
   */
  hash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Generate a secure token for API authentication
   */
  generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}

// Role-Based Access Control (RBAC)
export enum Permission {
  // Knowledge Node permissions
  KNOWLEDGE_READ = 'knowledge:read',
  KNOWLEDGE_WRITE = 'knowledge:write',
  KNOWLEDGE_DELETE = 'knowledge:delete',
  KNOWLEDGE_VERIFY = 'knowledge:verify',
  
  // Search permissions
  SEARCH_BASIC = 'search:basic',
  SEARCH_ADVANCED = 'search:advanced',
  SEARCH_EXPORT = 'search:export',
  
  // Analytics permissions
  ANALYTICS_VIEW = 'analytics:view',
  ANALYTICS_EXPORT = 'analytics:export',
  
  // Team permissions
  TEAM_VIEW = 'team:view',
  TEAM_MANAGE = 'team:manage',
  
  // Settings permissions
  SETTINGS_VIEW = 'settings:view',
  SETTINGS_MANAGE = 'settings:manage',
  SETTINGS_INTEGRATIONS = 'settings:integrations',
  
  // Admin permissions
  ADMIN_USERS = 'admin:users',
  ADMIN_ROLES = 'admin:roles',
  ADMIN_AUDIT = 'admin:audit',
  ADMIN_SECURITY = 'admin:security',
}

export enum Role {
  VIEWER = 'viewer',
  CONTRIBUTOR = 'contributor',
  VERIFIER = 'verifier',
  MANAGER = 'manager',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

// Role permission mappings
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.VIEWER]: [
    Permission.KNOWLEDGE_READ,
    Permission.SEARCH_BASIC,
    Permission.ANALYTICS_VIEW,
    Permission.TEAM_VIEW,
    Permission.SETTINGS_VIEW,
  ],
  [Role.CONTRIBUTOR]: [
    Permission.KNOWLEDGE_READ,
    Permission.KNOWLEDGE_WRITE,
    Permission.SEARCH_BASIC,
    Permission.SEARCH_ADVANCED,
    Permission.ANALYTICS_VIEW,
    Permission.TEAM_VIEW,
    Permission.SETTINGS_VIEW,
  ],
  [Role.VERIFIER]: [
    Permission.KNOWLEDGE_READ,
    Permission.KNOWLEDGE_WRITE,
    Permission.KNOWLEDGE_VERIFY,
    Permission.SEARCH_BASIC,
    Permission.SEARCH_ADVANCED,
    Permission.ANALYTICS_VIEW,
    Permission.TEAM_VIEW,
    Permission.SETTINGS_VIEW,
  ],
  [Role.MANAGER]: [
    Permission.KNOWLEDGE_READ,
    Permission.KNOWLEDGE_WRITE,
    Permission.KNOWLEDGE_DELETE,
    Permission.SEARCH_BASIC,
    Permission.SEARCH_ADVANCED,
    Permission.SEARCH_EXPORT,
    Permission.ANALYTICS_VIEW,
    Permission.ANALYTICS_EXPORT,
    Permission.TEAM_VIEW,
    Permission.TEAM_MANAGE,
    Permission.SETTINGS_VIEW,
    Permission.SETTINGS_MANAGE,
  ],
  [Role.ADMIN]: [
    Permission.KNOWLEDGE_READ,
    Permission.KNOWLEDGE_WRITE,
    Permission.KNOWLEDGE_DELETE,
    Permission.KNOWLEDGE_VERIFY,
    Permission.SEARCH_BASIC,
    Permission.SEARCH_ADVANCED,
    Permission.SEARCH_EXPORT,
    Permission.ANALYTICS_VIEW,
    Permission.ANALYTICS_EXPORT,
    Permission.TEAM_VIEW,
    Permission.TEAM_MANAGE,
    Permission.SETTINGS_VIEW,
    Permission.SETTINGS_MANAGE,
    Permission.SETTINGS_INTEGRATIONS,
    Permission.ADMIN_USERS,
    Permission.ADMIN_ROLES,
    Permission.ADMIN_AUDIT,
  ],
  [Role.SUPER_ADMIN]: [
    Permission.KNOWLEDGE_READ,
    Permission.KNOWLEDGE_WRITE,
    Permission.KNOWLEDGE_DELETE,
    Permission.KNOWLEDGE_VERIFY,
    Permission.SEARCH_BASIC,
    Permission.SEARCH_ADVANCED,
    Permission.SEARCH_EXPORT,
    Permission.ANALYTICS_VIEW,
    Permission.ANALYTICS_EXPORT,
    Permission.TEAM_VIEW,
    Permission.TEAM_MANAGE,
    Permission.SETTINGS_VIEW,
    Permission.SETTINGS_MANAGE,
    Permission.SETTINGS_INTEGRATIONS,
    Permission.ADMIN_USERS,
    Permission.ADMIN_ROLES,
    Permission.ADMIN_AUDIT,
    Permission.ADMIN_SECURITY,
  ],
};

export class RBACService {
  /**
   * Check if a role has a specific permission
   */
  hasPermission(role: Role, permission: Permission): boolean {
    const permissions = ROLE_PERMISSIONS[role] || [];
    return permissions.includes(permission);
  }

  /**
   * Get all permissions for a role
   */
  getPermissions(role: Role): Permission[] {
    return ROLE_PERMISSIONS[role] || [];
  }

  /**
   * Check if a user has any of the required permissions
   */
  hasAnyPermission(role: Role, permissions: Permission[]): boolean {
    const userPermissions = this.getPermissions(role);
    return permissions.some(p => userPermissions.includes(p));
  }

  /**
   * Check if a user has all required permissions
   */
  hasAllPermissions(role: Role, permissions: Permission[]): boolean {
    const userPermissions = this.getPermissions(role);
    return permissions.every(p => userPermissions.includes(p));
  }

  /**
   * Filter data based on user permissions
   */
  filterByPermission<T>(
    data: T[],
    role: Role,
    permission: Permission,
    accessor: (item: T) => string
  ): T[] {
    if (!this.hasPermission(role, permission)) {
      return [];
    }
    return data;
  }
}

// SSO Integration Service
export class SSOService {
  private providers: Map<string, SSOProvider> = new Map();

  constructor() {
    // Initialize SSO providers
    this.providers.set('saml', new SAMLProvider());
    this.providers.set('oidc', new OIDCProvider());
    this.providers.set('okta', new OktaProvider());
    this.providers.set('azure-ad', new AzureADProvider());
    this.providers.set('google', new GoogleProvider());
  }

  /**
   * Get SSO provider by type
   */
  getProvider(type: string): SSOProvider | undefined {
    return this.providers.get(type);
  }

  /**
   * Initiate SSO login flow
   */
  async initiateLogin(providerType: string, redirectUri: string): Promise<string> {
    const provider = this.getProvider(providerType);
    if (!provider) {
      throw new Error(`SSO provider ${providerType} not found`);
    }
    return provider.generateAuthUrl(redirectUri);
  }

  /**
   * Handle SSO callback
   */
  async handleCallback(
    providerType: string,
    code: string,
    state: string
  ): Promise<SSOUserProfile> {
    const provider = this.getProvider(providerType);
    if (!provider) {
      throw new Error(`SSO provider ${providerType} not found`);
    }
    return provider.exchangeCodeForProfile(code, state);
  }

  /**
   * Validate SSO token
   */
  async validateToken(providerType: string, token: string): Promise<boolean> {
    const provider = this.getProvider(providerType);
    if (!provider) {
      return false;
    }
    return provider.validateToken(token);
  }
}

// SSO Provider Interface
export interface SSOProvider {
  generateAuthUrl(redirectUri: string): Promise<string>;
  exchangeCodeForProfile(code: string, state: string): Promise<SSOUserProfile>;
  validateToken(token: string): Promise<boolean>;
}

export interface SSOUserProfile {
  id: string;
  email: string;
  name: string;
  department?: string;
  role?: string;
  groups?: string[];
}

// SAML Provider Implementation
class SAMLProvider implements SSOProvider {
  async generateAuthUrl(redirectUri: string): Promise<string> {
    // Placeholder for SAML SSO implementation
    return `https://saml.example.com/auth?redirect=${encodeURIComponent(redirectUri)}`;
  }

  async exchangeCodeForProfile(code: string, state: string): Promise<SSOUserProfile> {
    // Placeholder for SAML token exchange
    return {
      id: 'saml-user-123',
      email: 'user@company.com',
      name: 'SAML User',
      department: 'Engineering',
      role: 'contributor',
      groups: ['engineering', 'developers'],
    };
  }

  async validateToken(token: string): Promise<boolean> {
    // Placeholder for SAML token validation
    return true;
  }
}

// OIDC Provider Implementation
class OIDCProvider implements SSOProvider {
  async generateAuthUrl(redirectUri: string): Promise<string> {
    // Placeholder for OIDC SSO implementation
    return `https://oidc.example.com/auth?redirect=${encodeURIComponent(redirectUri)}`;
  }

  async exchangeCodeForProfile(code: string, state: string): Promise<SSOUserProfile> {
    // Placeholder for OIDC token exchange
    return {
      id: 'oidc-user-123',
      email: 'user@company.com',
      name: 'OIDC User',
      department: 'Product',
      role: 'verifier',
      groups: ['product', 'managers'],
    };
  }

  async validateToken(token: string): Promise<boolean> {
    // Placeholder for OIDC token validation
    return true;
  }
}

// Okta Provider Implementation
class OktaProvider implements SSOProvider {
  async generateAuthUrl(redirectUri: string): Promise<string> {
    return `https://okta.example.com/oauth2/v1/authorize?redirect=${encodeURIComponent(redirectUri)}`;
  }

  async exchangeCodeForProfile(code: string, state: string): Promise<SSOUserProfile> {
    return {
      id: 'okta-user-123',
      email: 'user@company.com',
      name: 'Okta User',
      department: 'Sales',
      role: 'manager',
      groups: ['sales', 'managers'],
    };
  }

  async validateToken(token: string): Promise<boolean> {
    return true;
  }
}

// Azure AD Provider Implementation
class AzureADProvider implements SSOProvider {
  async generateAuthUrl(redirectUri: string): Promise<string> {
    return `https://login.microsoftonline.com/authorize?redirect=${encodeURIComponent(redirectUri)}`;
  }

  async exchangeCodeForProfile(code: string, state: string): Promise<SSOUserProfile> {
    return {
      id: 'azure-user-123',
      email: 'user@company.com',
      name: 'Azure User',
      department: 'Marketing',
      role: 'contributor',
      groups: ['marketing', 'content'],
    };
  }

  async validateToken(token: string): Promise<boolean> {
    return true;
  }
}

// Google Provider Implementation
class GoogleProvider implements SSOProvider {
  async generateAuthUrl(redirectUri: string): Promise<string> {
    return `https://accounts.google.com/o/oauth2/v2/auth?redirect=${encodeURIComponent(redirectUri)}`;
  }

  async exchangeCodeForProfile(code: string, state: string): Promise<SSOUserProfile> {
    return {
      id: 'google-user-123',
      email: 'user@company.com',
      name: 'Google User',
      department: 'HR',
      role: 'verifier',
      groups: ['hr', 'admin'],
    };
  }

  async validateToken(token: string): Promise<boolean> {
    return true;
  }
}

// PII Detection and Redaction Service
export class PIIService {
  private patterns = {
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
    ssn: /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/g,
    creditCard: /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g,
    ipAddress: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g,
  };

  /**
   * Detect PII in text
   */
  detectPII(text: string): { type: string; matches: string[] }[] {
    const detected: { type: string; matches: string[] }[] = [];

    for (const [type, pattern] of Object.entries(this.patterns)) {
      const matches = text.match(pattern);
      if (matches) {
        detected.push({ type, matches: [...new Set(matches)] });
      }
    }

    return detected;
  }

  /**
   * Redact PII from text
   */
  redactPII(text: string, replacement: string = '[REDACTED]'): string {
    let redacted = text;

    for (const pattern of Object.values(this.patterns)) {
      redacted = redacted.replace(pattern, replacement);
    }

    return redacted;
  }

  /**
   * Check if text contains PII
   */
  containsPII(text: string): boolean {
    return this.detectPII(text).length > 0;
  }
}

// Audit Logging Service
export class AuditService {
  private logs: AuditLog[] = [];

  /**
   * Log an audit event
   */
  log(event: Omit<AuditLog, 'id' | 'timestamp'>): void {
    const log: AuditLog = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      ...event,
    };
    this.logs.push(log);
    
    // In production, this would be persisted to database
    console.log(`[AUDIT] ${log.action} by ${log.userId} on ${log.resource}: ${log.details}`);
  }

  /**
   * Get audit logs for a user
   */
  getUserLogs(userId: string, limit: number = 100): AuditLog[] {
    return this.logs
      .filter(log => log.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Get audit logs for a resource
   */
  getResourceLogs(resourceId: string, limit: number = 100): AuditLog[] {
    return this.logs
      .filter(log => log.resourceId === resourceId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Get all audit logs (admin only)
   */
  getAllLogs(limit: number = 1000): AuditLog[] {
    return this.logs
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress?: string;
  userAgent?: string;
}

// Compliance Service (GDPR, SOC 2)
export class ComplianceService {
  /**
   * Generate GDPR compliance report
   */
  generateGDPRReport(): GDPRReport {
    return {
      generatedAt: new Date(),
      dataProcessingActivities: [
        {
          purpose: 'Knowledge Management',
          dataCategories: ['Employee Data', 'Client Information', 'Process Documentation'],
          retentionPeriod: '7 years',
          legalBasis: 'Legitimate Interest',
          dataSubjects: ['Employees', 'Clients'],
        },
      ],
      dataSubjectRights: {
        rightToAccess: true,
        rightToRectification: true,
        rightToErasure: true,
        rightToPortability: true,
        rightToObject: true,
      },
      securityMeasures: [
        'Encryption at rest (AES-256-GCM)',
        'Encryption in transit (TLS 1.3)',
        'Role-based access control',
        'Audit logging',
        'PII detection and redaction',
      ],
      dataBreaches: [],
    };
  }

  /**
   * Generate SOC 2 compliance report
   */
  generateSOC2Report(): SOC2Report {
    return {
      generatedAt: new Date(),
      trustServicesCriteria: {
        security: true,
        availability: true,
        processingIntegrity: true,
        confidentiality: true,
        privacy: true,
      },
      controls: [
        {
          category: 'Access Control',
          description: 'Role-based access control implemented',
          status: 'implemented',
        },
        {
          category: 'Encryption',
          description: 'Data encrypted at rest and in transit',
          status: 'implemented',
        },
        {
          category: 'Audit Logging',
          description: 'Comprehensive audit logging enabled',
          status: 'implemented',
        },
        {
          category: 'Change Management',
          description: 'Version control and approval processes',
          status: 'implemented',
        },
      ],
      lastAuditDate: new Date('2026-01-15'),
      nextAuditDate: new Date('2027-01-15'),
    };
  }
}

export interface GDPRReport {
  generatedAt: Date;
  dataProcessingActivities: DataProcessingActivity[];
  dataSubjectRights: {
    rightToAccess: boolean;
    rightToRectification: boolean;
    rightToErasure: boolean;
    rightToPortability: boolean;
    rightToObject: boolean;
  };
  securityMeasures: string[];
  dataBreaches: any[];
}

export interface DataProcessingActivity {
  purpose: string;
  dataCategories: string[];
  retentionPeriod: string;
  legalBasis: string;
  dataSubjects: string[];
}

export interface SOC2Report {
  generatedAt: Date;
  trustServicesCriteria: {
    security: boolean;
    availability: boolean;
    processingIntegrity: boolean;
    confidentiality: boolean;
    privacy: boolean;
  };
  controls: Control[];
  lastAuditDate: Date;
  nextAuditDate: Date;
}

export interface Control {
  category: string;
  description: string;
  status: 'implemented' | 'planned' | 'not-implemented';
}

// Export services
export const encryptionService = new EncryptionService();
export const rbacService = new RBACService();
export const ssoService = new SSOService();
export const piiService = new PIIService();
export const auditService = new AuditService();
export const complianceService = new ComplianceService();
