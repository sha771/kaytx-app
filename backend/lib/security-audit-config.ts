/**
 * Security Audit Configuration
 * Defines comprehensive audit logging for all security events
 * Ensures compliance and security monitoring
 */

import { AuditActions } from './audit';

// Security event categories
export enum SecurityEventCategory {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  SESSION_MANAGEMENT = 'session_management',
  DATA_ACCESS = 'data_access',
  SYSTEM_SECURITY = 'system_security',
  NETWORK_SECURITY = 'network_security',
  APPLICATION_SECURITY = 'application_security',
  USER_MANAGEMENT = 'user_management',
  PRIVILEGE_ESCALATION = 'privilege_escalation',
  SECURITY_POLICY = 'security_policy',
  INCIDENT_RESPONSE = 'incident_response',
  COMPLIANCE = 'compliance'
}

// Security event types with detailed configuration
export const SECURITY_AUDIT_EVENTS = {
  // Authentication Events
  [SecurityEventCategory.AUTHENTICATION]: {
    'auth.login.success': {
      action: AuditActions.USER_LOGIN,
      severity: 'info',
      description: 'User successfully logged in',
      requiredFields: ['userId', 'ipAddress', 'userAgent'],
      piiFields: ['userId', 'email'],
    },
    'auth.login.failure': {
      action: AuditActions.USER_LOGIN,
      severity: 'medium',
      description: 'User login failed',
      requiredFields: ['email', 'ipAddress', 'userAgent', 'reason'],
      piiFields: ['email'],
    },
    'auth.login.blocked': {
      action: 'auth.login.blocked',
      severity: 'high',
      description: 'Login blocked due to security policy',
      requiredFields: ['ipAddress', 'userAgent', 'reason', 'blockType'],
    },
    'auth.logout.success': {
      action: AuditActions.USER_LOGOUT,
      severity: 'info',
      description: 'User successfully logged out',
      requiredFields: ['userId', 'sessionId'],
      piiFields: ['userId'],
    },
    'auth.password.change': {
      action: 'auth.password.change',
      severity: 'medium',
      description: 'User password changed',
      requiredFields: ['userId', 'ipAddress'],
      piiFields: ['userId'],
    },
    'auth.password.reset.request': {
      action: 'auth.password.reset.request',
      severity: 'medium',
      description: 'Password reset requested',
      requiredFields: ['email', 'ipAddress'],
      piiFields: ['email'],
    },
    'auth.password.reset.success': {
      action: 'auth.password.reset.success',
      severity: 'medium',
      description: 'Password reset completed',
      requiredFields: ['userId', 'ipAddress'],
      piiFields: ['userId'],
    },
    'auth.mfa.enabled': {
      action: 'auth.mfa.enabled',
      severity: 'medium',
      description: 'Multi-factor authentication enabled',
      requiredFields: ['userId', 'ipAddress'],
      piiFields: ['userId'],
    },
    'auth.mfa.disabled': {
      action: 'auth.mfa.disabled',
      severity: 'medium',
      description: 'Multi-factor authentication disabled',
      requiredFields: ['userId', 'ipAddress'],
      piiFields: ['userId'],
    },
    'auth.mfa.verify.success': {
      action: 'auth.mfa.verify.success',
      severity: 'info',
      description: 'Multi-factor authentication verified',
      requiredFields: ['userId', 'mfaType'],
      piiFields: ['userId'],
    },
    'auth.mfa.verify.failure': {
      action: 'auth.mfa.verify.failure',
      severity: 'medium',
      description: 'Multi-factor authentication failed',
      requiredFields: ['userId', 'mfaType', 'reason'],
      piiFields: ['userId'],
    },
    'auth.sso.login.success': {
      action: 'auth.sso.login.success',
      severity: 'info',
      description: 'SSO login successful',
      requiredFields: ['userId', 'ssoProvider', 'ipAddress'],
      piiFields: ['userId'],
    },
    'auth.sso.login.failure': {
      action: 'auth.sso.login.failure',
      severity: 'medium',
      description: 'SSO login failed',
      requiredFields: ['ssoProvider', 'ipAddress', 'reason'],
    },
  },

  // Authorization Events
  [SecurityEventCategory.AUTHORIZATION]: {
    'auth.permission.granted': {
      action: 'auth.permission.granted',
      severity: 'info',
      description: 'Permission granted to user',
      requiredFields: ['userId', 'permission', 'resource'],
      piiFields: ['userId'],
    },
    'auth.permission.denied': {
      action: 'auth.permission.denied',
      severity: 'medium',
      description: 'Permission denied to user',
      requiredFields: ['userId', 'permission', 'resource', 'reason'],
      piiFields: ['userId'],
    },
    'auth.role.assigned': {
      action: 'auth.role.assigned',
      severity: 'medium',
      description: 'Role assigned to user',
      requiredFields: ['userId', 'roleId', 'assignedBy'],
      piiFields: ['userId', 'assignedBy'],
    },
    'auth.role.revoked': {
      action: 'auth.role.revoked',
      severity: 'medium',
      description: 'Role revoked from user',
      requiredFields: ['userId', 'roleId', 'revokedBy'],
      piiFields: ['userId', 'revokedBy'],
    },
    'auth.privilege.escalation': {
      action: 'auth.privilege.escalation',
      severity: 'high',
      description: 'Privilege escalation attempted',
      requiredFields: ['userId', 'targetPrivilege', 'ipAddress'],
      piiFields: ['userId'],
    },
  },

  // Session Management Events
  [SecurityEventCategory.SESSION_MANAGEMENT]: {
    'session.create': {
      action: AuditActions.SESSION_CREATE,
      severity: 'info',
      description: 'Session created',
      requiredFields: ['userId', 'sessionId', 'ipAddress'],
      piiFields: ['userId'],
    },
    'session.destroy': {
      action: AuditActions.SESSION_DESTROY,
      severity: 'info',
      description: 'Session destroyed',
      requiredFields: ['userId', 'sessionId', 'reason'],
      piiFields: ['userId'],
    },
    'session.expired': {
      action: 'session.expired',
      severity: 'info',
      description: 'Session expired',
      requiredFields: ['userId', 'sessionId'],
      piiFields: ['userId'],
    },
    'session.suspicious': {
      action: 'session.suspicious',
      severity: 'high',
      description: 'Suspicious session activity detected',
      requiredFields: ['sessionId', 'ipAddress', 'reason'],
    },
    'session.concurrent': {
      action: 'session.concurrent',
      severity: 'medium',
      description: 'Multiple concurrent sessions detected',
      requiredFields: ['userId', 'sessionCount', 'ipAddresses'],
      piiFields: ['userId'],
    },
  },

  // Data Access Events
  [SecurityEventCategory.DATA_ACCESS]: {
    'data.access.read': {
      action: 'data.access.read',
      severity: 'info',
      description: 'Data read access',
      requiredFields: ['userId', 'resourceType', 'resourceId'],
      piiFields: ['userId'],
    },
    'data.access.write': {
      action: 'data.access.write',
      severity: 'medium',
      description: 'Data write access',
      requiredFields: ['userId', 'resourceType', 'resourceId'],
      piiFields: ['userId'],
    },
    'data.access.delete': {
      action: 'data.access.delete',
      severity: 'high',
      description: 'Data deletion access',
      requiredFields: ['userId', 'resourceType', 'resourceId'],
      piiFields: ['userId'],
    },
    'data.access.export': {
      action: 'data.access.export',
      severity: 'high',
      description: 'Data export access',
      requiredFields: ['userId', 'resourceType', 'exportFormat'],
      piiFields: ['userId'],
    },
    'data.access.unauthorized': {
      action: 'data.access.unauthorized',
      severity: 'high',
      description: 'Unauthorized data access attempt',
      requiredFields: ['userId', 'resourceType', 'resourceId', 'ipAddress'],
      piiFields: ['userId'],
    },
    'data.pii.access': {
      action: 'data.pii.access',
      severity: 'medium',
      description: 'PII data access',
      requiredFields: ['userId', 'piiType', 'resourceId'],
      piiFields: ['userId'],
    },
  },

  // System Security Events
  [SecurityEventCategory.SYSTEM_SECURITY]: {
    'security.breach.attempt': {
      action: 'security.breach.attempt',
      severity: 'critical',
      description: 'Security breach attempt detected',
      requiredFields: ['attackType', 'ipAddress', 'target'],
    },
    'security.breach.confirmed': {
      action: 'security.breach.confirmed',
      severity: 'critical',
      description: 'Security breach confirmed',
      requiredFields: ['attackType', 'ipAddress', 'target', 'impact'],
    },
    'security.threat.detected': {
      action: 'security.threat.detected',
      severity: 'high',
      description: 'Security threat detected',
      requiredFields: ['threatType', 'severity', 'source'],
    },
    'security.vulnerability.found': {
      action: 'security.vulnerability.found',
      severity: 'high',
      description: 'Security vulnerability discovered',
      requiredFields: ['vulnerabilityType', 'component', 'severity'],
    },
    'security.patch.applied': {
      action: 'security.patch.applied',
      severity: 'medium',
      description: 'Security patch applied',
      requiredFields: ['patchId', 'component', 'appliedBy'],
    },
    'security.config.changed': {
      action: 'security.config.changed',
      severity: 'medium',
      description: 'Security configuration changed',
      requiredFields: ['configType', 'changedBy', 'oldValue', 'newValue'],
    },
  },

  // Network Security Events
  [SecurityEventCategory.NETWORK_SECURITY]: {
    'network.firewall.block': {
      action: 'network.firewall.block',
      severity: 'medium',
      description: 'Firewall blocked connection',
      requiredFields: ['ipAddress', 'port', 'protocol', 'rule'],
    },
    'network.ips.alert': {
      action: 'network.ips.alert',
      severity: 'high',
      description: 'Intrusion prevention system alert',
      requiredFields: ['alertType', 'ipAddress', 'signature'],
    },
    'network.ddos.detected': {
      action: 'network.ddos.detected',
      severity: 'critical',
      description: 'DDoS attack detected',
      requiredFields: ['attackType', 'sourceIPs', 'target'],
    },
    'network.port.scan': {
      action: 'network.port.scan',
      severity: 'high',
      description: 'Port scan detected',
      requiredFields: ['sourceIP', 'scannedPorts', 'timeframe'],
    },
  },

  // Application Security Events
  [SecurityEventCategory.APPLICATION_SECURITY]: {
    'app.csrf.invalid': {
      action: 'app.csrf.invalid',
      severity: 'medium',
      description: 'Invalid CSRF token',
      requiredFields: ['ipAddress', 'userAgent', 'endpoint'],
    },
    'app.xss.attempt': {
      action: 'app.xss.attempt',
      severity: 'high',
      description: 'XSS attack attempt',
      requiredFields: ['ipAddress', 'userAgent', 'payload'],
    },
    'app.sql.injection': {
      action: 'app.sql.injection',
      severity: 'critical',
      description: 'SQL injection attempt',
      requiredFields: ['ipAddress', 'userAgent', 'query'],
    },
    'app.upload.malicious': {
      action: 'app.upload.malicious',
      severity: 'high',
      description: 'Malicious file upload attempt',
      requiredFields: ['userId', 'fileName', 'fileType', 'threat'],
      piiFields: ['userId'],
    },
    'app.rate.limit.exceeded': {
      action: 'app.rate.limit.exceeded',
      severity: 'medium',
      description: 'Rate limit exceeded',
      requiredFields: ['ipAddress', 'endpoint', 'limit'],
    },
  },

  // User Management Events
  [SecurityEventCategory.USER_MANAGEMENT]: {
    'user.create': {
      action: 'user.create',
      severity: 'medium',
      description: 'User account created',
      requiredFields: ['userId', 'email', 'createdBy'],
      piiFields: ['userId', 'email'],
    },
    'user.delete': {
      action: 'user.delete',
      severity: 'high',
      description: 'User account deleted',
      requiredFields: ['userId', 'deletedBy'],
      piiFields: ['userId'],
    },
    'user.suspend': {
      action: 'user.suspend',
      severity: 'high',
      description: 'User account suspended',
      requiredFields: ['userId', 'suspendedBy', 'reason'],
      piiFields: ['userId'],
    },
    'user.reactivate': {
      action: 'user.reactivate',
      severity: 'medium',
      description: 'User account reactivated',
      requiredFields: ['userId', 'reactivatedBy'],
      piiFields: ['userId'],
    },
    'user.profile.update': {
      action: 'user.profile.update',
      severity: 'low',
      description: 'User profile updated',
      requiredFields: ['userId', 'updatedFields'],
      piiFields: ['userId'],
    },
  },

  // Privilege Escalation Events
  [SecurityEventCategory.PRIVILEGE_ESCALATION]: {
    'privilege.escalation.attempt': {
      action: 'privilege.escalation.attempt',
      severity: 'high',
      description: 'Privilege escalation attempt',
      requiredFields: ['userId', 'targetRole', 'method', 'ipAddress'],
      piiFields: ['userId'],
    },
    'privilege.escalation.success': {
      action: 'privilege.escalation.success',
      severity: 'critical',
      description: 'Privilege escalation successful',
      requiredFields: ['userId', 'previousRole', 'newRole', 'method'],
      piiFields: ['userId'],
    },
    'privilege.escalation.blocked': {
      action: 'privilege.escalation.blocked',
      severity: 'high',
      description: 'Privilege escalation blocked',
      requiredFields: ['userId', 'targetRole', 'blockedBy'],
      piiFields: ['userId'],
    },
  },

  // Security Policy Events
  [SecurityEventCategory.SECURITY_POLICY]: {
    'policy.violation': {
      action: 'policy.violation',
      severity: 'medium',
      description: 'Security policy violation',
      requiredFields: ['policyType', 'violationType', 'userId'],
      piiFields: ['userId'],
    },
    'policy.update': {
      action: 'policy.update',
      severity: 'medium',
      description: 'Security policy updated',
      requiredFields: ['policyType', 'updatedBy', 'changes'],
    },
    'policy.enforcement': {
      action: 'policy.enforcement',
      severity: 'low',
      description: 'Security policy enforced',
      requiredFields: ['policyType', 'action', 'target'],
    },
  },

  // Incident Response Events
  [SecurityEventCategory.INCIDENT_RESPONSE]: {
    'incident.created': {
      action: 'incident.created',
      severity: 'high',
      description: 'Security incident created',
      requiredFields: ['incidentId', 'severity', 'category', 'reportedBy'],
    },
    'incident.updated': {
      action: 'incident.updated',
      severity: 'medium',
      description: 'Security incident updated',
      requiredFields: ['incidentId', 'updateType', 'updatedBy'],
    },
    'incident.resolved': {
      action: 'incident.resolved',
      severity: 'medium',
      description: 'Security incident resolved',
      requiredFields: ['incidentId', 'resolution', 'resolvedBy'],
    },
    'incident.escalated': {
      action: 'incident.escalated',
      severity: 'high',
      description: 'Security incident escalated',
      requiredFields: ['incidentId', 'escalationLevel', 'escalatedBy'],
    },
  },

  // Compliance Events
  [SecurityEventCategory.COMPLIANCE]: {
    'compliance.audit.start': {
      action: 'compliance.audit.start',
      severity: 'medium',
      description: 'Compliance audit started',
      requiredFields: ['auditType', 'auditor', 'scope'],
    },
    'compliance.audit.complete': {
      action: 'compliance.audit.complete',
      severity: 'medium',
      description: 'Compliance audit completed',
      requiredFields: ['auditType', 'auditor', 'findings'],
    },
    'compliance.violation': {
      action: 'compliance.violation',
      severity: 'high',
      description: 'Compliance violation detected',
      requiredFields: ['regulation', 'violationType', 'severity'],
    },
    'compliance.report.generated': {
      action: 'compliance.report.generated',
      severity: 'low',
      description: 'Compliance report generated',
      requiredFields: ['reportType', 'period', 'generatedBy'],
    },
  },
} as const;

// Security event severity levels
export enum SecurityEventSeverity {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  INFO = 'info'
}

// Alert thresholds for security events
export const SECURITY_ALERT_THRESHOLDS = {
  // Authentication alerts
  failed_login_attempts: {
    threshold: 5,
    window: 900000, // 15 minutes
    severity: SecurityEventSeverity.HIGH,
  },
  brute_force_attempts: {
    threshold: 20,
    window: 3600000, // 1 hour
    severity: SecurityEventSeverity.CRITICAL,
  },
  
  // Data access alerts
  unauthorized_access_attempts: {
    threshold: 10,
    window: 3600000, // 1 hour
    severity: SecurityEventSeverity.HIGH,
  },
  pii_access_frequency: {
    threshold: 100,
    window: 3600000, // 1 hour
    severity: SecurityEventSeverity.MEDIUM,
  },
  
  // System security alerts
  vulnerability_count: {
    threshold: 5,
    window: 86400000, // 24 hours
    severity: SecurityEventSeverity.HIGH,
  },
  security_config_changes: {
    threshold: 3,
    window: 3600000, // 1 hour
    severity: SecurityEventSeverity.MEDIUM,
  },
  
  // Network security alerts
  firewall_blocks: {
    threshold: 50,
    window: 3600000, // 1 hour
    severity: SecurityEventSeverity.MEDIUM,
  },
  ips_alerts: {
    threshold: 10,
    window: 3600000, // 1 hour
    severity: SecurityEventSeverity.HIGH,
  },
  
  // Application security alerts
  csrf_failures: {
    threshold: 20,
    window: 3600000, // 1 hour
    severity: SecurityEventSeverity.MEDIUM,
  },
  xss_attempts: {
    threshold: 5,
    window: 3600000, // 1 hour
    severity: SecurityEventSeverity.HIGH,
  },
  rate_limit_exceeded: {
    threshold: 100,
    window: 3600000, // 1 hour
    severity: SecurityEventSeverity.MEDIUM,
  },
};

// Data retention policies for audit logs
export const AUDIT_RETENTION_POLICIES = {
  [SecurityEventSeverity.CRITICAL]: 2555, // 7 years
  [SecurityEventSeverity.HIGH]: 1825, // 5 years
  [SecurityEventSeverity.MEDIUM]: 1095, // 3 years
  [SecurityEventSeverity.LOW]: 365, // 1 year
  [SecurityEventSeverity.INFO]: 90, // 90 days
};

// PII data handling policies
export const PII_HANDLING_POLICIES = {
  encryption: {
    atRest: true,
    inTransit: true,
    algorithm: 'AES-256',
  },
  masking: {
    email: 'partial', // Show first 2 and last 2 characters
    phone: 'partial', // Show last 4 digits
    ip: 'none', // Don't mask IP addresses for security analysis
  },
  retention: {
    piiFields: 2555, // 7 years for PII fields
    nonPiiFields: 365, // 1 year for non-PII fields
  },
};

// Compliance frameworks mapping
export const COMPLIANCE_FRAMEWORKS = {
  GDPR: {
    events: [
      'data.access.read',
      'data.access.write',
      'data.access.delete',
      'data.pii.access',
      'user.delete',
      'compliance.violation',
    ],
    retentionDays: 2555, // 7 years
    requirements: {
      rightToAccess: true,
      rightToRectification: true,
      rightToErasure: true,
      consentManagement: true,
      breachNotification: true,
    },
  },
  SOX: {
    events: [
      'auth.login.success',
      'auth.login.failure',
      'data.access.write',
      'data.access.delete',
      'security.config.changed',
      'compliance.audit.start',
      'compliance.audit.complete',
    ],
    retentionDays: 2555, // 7 years
    requirements: {
      financialDataProtection: true,
      accessControl: true,
      auditTrail: true,
      changeManagement: true,
    },
  },
  HIPAA: {
    events: [
      'data.pii.access',
      'data.access.export',
      'user.create',
      'user.delete',
      'security.breach.attempt',
      'security.breach.confirmed',
    ],
    retentionDays: 2555, // 7 years
    requirements: {
      phiProtection: true,
      auditControls: true,
      integrityControls: true,
      transmissionSecurity: true,
    },
  },
  PCI_DSS: {
    events: [
      'auth.login.success',
      'auth.login.failure',
      'data.access.read',
      'data.access.write',
      'app.csrf.invalid',
      'security.config.changed',
    ],
    retentionDays: 365, // 1 year
    requirements: {
      cardholderDataProtection: true,
      accessControl: true,
      auditLogging: true,
      networkSecurity: true,
    },
  },
} as const;

// Export type helpers
export type SecurityEventType = keyof typeof SECURITY_AUDIT_EVENTS[SecurityEventCategory];
export type SecurityEventConfig = typeof SECURITY_AUDIT_EVENTS[SecurityEventCategory][SecurityEventType];
export type ComplianceFramework = keyof typeof COMPLIANCE_FRAMEWORKS;
