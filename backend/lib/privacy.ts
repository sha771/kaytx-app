import crypto from 'crypto';

export interface PrivacySettings {
  userId: string;
  dataRetentionDays: number;
  allowAnalytics: boolean;
  allowMarketing: boolean;
  allowThirdPartySharing: boolean;
  allowLocationTracking: boolean;
  allowCookies: boolean;
  allowPersonalization: boolean;
  showOnlineStatus: boolean;
  shareActivityData: boolean;
  allowDataProcessing: boolean;
  consentVersion: string;
  consentDate: number;
  updatedAt: number;
}

export interface DataExportRequest {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requestedAt: number;
  completedAt?: number;
  downloadUrl?: string;
  expiresAt?: number;
  format: 'json' | 'csv' | 'xml';
  includeMessages: boolean;
  includeContacts: boolean;
  includeCallLogs: boolean;
  includeAnalytics: boolean;
}

export interface DataDeletionRequest {
  id: string;
  userId: string;
  status: 'pending' | 'scheduled' | 'processing' | 'completed' | 'cancelled';
  requestedAt: number;
  scheduledFor: number;
  completedAt?: number;
  reason?: string;
  deleteType: 'full' | 'partial';
  dataTypes: string[];
  cancellationDeadline: number;
}

export interface ConsentRecord {
  id: string;
  userId: string;
  consentType: string;
  version: string;
  granted: boolean;
  timestamp: number;
  ipAddress?: string;
  userAgent?: string;
  expiresAt?: number;
}

export interface DataAccessLog {
  id: string;
  userId: string;
  accessedBy: string;
  accessType: 'read' | 'write' | 'delete' | 'export';
  dataType: string;
  reason: string;
  timestamp: number;
  ipAddress?: string;
  success: boolean;
}

export interface PrivacyPolicy {
  id: string;
  version: string;
  content: string;
  effectiveDate: number;
  createdAt: number;
  mandatory: boolean;
}

const CURRENT_CONSENT_VERSION = '2.0.0';
const DATA_RETENTION_DEFAULT = 365;
const DELETION_GRACE_PERIOD = 30 * 24 * 60 * 60 * 1000;

export function getDefaultPrivacySettings(userId: string): PrivacySettings {
  return {
    userId,
    dataRetentionDays: DATA_RETENTION_DEFAULT,
    allowAnalytics: true,
    allowMarketing: false,
    allowThirdPartySharing: false,
    allowLocationTracking: false,
    allowCookies: true,
    allowPersonalization: true,
    showOnlineStatus: true,
    shareActivityData: false,
    allowDataProcessing: true,
    consentVersion: CURRENT_CONSENT_VERSION,
    consentDate: Date.now(),
    updatedAt: Date.now(),
  };
}

export function createDataExportRequest(
  userId: string,
  options: {
    format: 'json' | 'csv' | 'xml';
    includeMessages: boolean;
    includeContacts: boolean;
    includeCallLogs: boolean;
    includeAnalytics: boolean;
  }
): DataExportRequest {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    userId,
    status: 'pending',
    requestedAt: now,
    format: options.format,
    includeMessages: options.includeMessages,
    includeContacts: options.includeContacts,
    includeCallLogs: options.includeCallLogs,
    includeAnalytics: options.includeAnalytics,
  };
}

export function createDataDeletionRequest(
  userId: string,
  options: {
    deleteType: 'full' | 'partial';
    dataTypes: string[];
    reason?: string;
  }
): DataDeletionRequest {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    userId,
    status: 'pending',
    requestedAt: now,
    scheduledFor: now + DELETION_GRACE_PERIOD,
    deleteType: options.deleteType,
    dataTypes: options.dataTypes,
    ...(options.reason ? { reason: options.reason } : {}),
    cancellationDeadline: now + DELETION_GRACE_PERIOD,
  };
}

export function recordConsent(
  userId: string,
  consentType: string,
  granted: boolean,
  ipAddress?: string,
  userAgent?: string
): ConsentRecord {
  return {
    id: crypto.randomUUID(),
    userId,
    consentType,
    version: CURRENT_CONSENT_VERSION,
    granted,
    timestamp: Date.now(),
    ...(typeof ipAddress === 'string' ? { ipAddress } : {}),
    ...(typeof userAgent === 'string' ? { userAgent } : {}),
  };
}

export function logDataAccess(
  userId: string,
  accessedBy: string,
  accessType: 'read' | 'write' | 'delete' | 'export',
  dataType: string,
  reason: string,
  success: boolean,
  ipAddress?: string
): DataAccessLog {
  return {
    id: crypto.randomUUID(),
    userId,
    accessedBy,
    accessType,
    dataType,
    reason,
    timestamp: Date.now(),
    ...(typeof ipAddress === 'string' ? { ipAddress } : {}),
    success,
  };
}

export function anonymizeUserData(data: any): any {
  const anonymized = { ...data };
  
  if (anonymized.email) {
    anonymized.email = `user_${crypto.randomBytes(4).toString('hex')}@anonymized.local`;
  }
  
  if (anonymized.phone) {
    anonymized.phone = `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
  }
  
  if (anonymized.name) {
    anonymized.name = `Anonymous User ${crypto.randomBytes(3).toString('hex')}`;
  }
  
  if (anonymized.ipAddress) {
    anonymized.ipAddress = '0.0.0.0';
  }
  
  return anonymized;
}

export function validateDataRetentionCompliance(
  dataCreatedAt: number,
  retentionDays: number
): boolean {
  const retentionMs = retentionDays * 24 * 60 * 60 * 1000;
  const expiryDate = dataCreatedAt + retentionMs;
  return Date.now() < expiryDate;
}

export function shouldDeleteOldData(
  dataCreatedAt: number,
  retentionDays: number
): boolean {
  return !validateDataRetentionCompliance(dataCreatedAt, retentionDays);
}

export const ConsentTypes = {
  TERMS_OF_SERVICE: 'terms_of_service',
  PRIVACY_POLICY: 'privacy_policy',
  MARKETING_EMAILS: 'marketing_emails',
  ANALYTICS: 'analytics',
  COOKIES: 'cookies',
  DATA_PROCESSING: 'data_processing',
  THIRD_PARTY_SHARING: 'third_party_sharing',
  LOCATION_TRACKING: 'location_tracking',
} as const;

export const DataTypes = {
  PROFILE: 'profile',
  MESSAGES: 'messages',
  CONTACTS: 'contacts',
  CALL_LOGS: 'call_logs',
  ANALYTICS: 'analytics',
  PREFERENCES: 'preferences',
  SESSIONS: 'sessions',
  AUDIT_LOGS: 'audit_logs',
  PAYMENTS: 'payments',
  DOCUMENTS: 'documents',
} as const;

export function generatePrivacyReport(userId: string): {
  personalData: string[];
  consents: ConsentRecord[];
  dataAccess: DataAccessLog[];
  retentionStatus: any;
  thirdPartySharing: any;
} {
  return {
    personalData: [
      'Email address',
      'Phone number',
      'Name',
      'Profile picture',
      'Messages',
      'Call logs',
      'Contacts',
      'Location data',
      'Device information',
      'Usage analytics',
    ],
    consents: [],
    dataAccess: [],
    retentionStatus: {
      enabled: true,
      days: DATA_RETENTION_DEFAULT,
      lastCleanup: Date.now(),
    },
    thirdPartySharing: {
      enabled: false,
      partners: [],
    },
  };
}
