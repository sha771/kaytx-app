export interface User {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  emailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: number;
  passwordResetToken?: string;
  passwordResetExpires?: number;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  termsAccepted: boolean;
  termsAcceptedAt?: number;
  privacyPolicyAccepted: boolean;
  privacyPolicyAcceptedAt?: number;
  role: 'user' | 'admin' | 'enterprise_admin' | 'super_admin';
  organizationId?: string;
  status: 'active' | 'suspended' | 'deleted';
  lastLoginAt?: number;
  lastLoginIp?: string;
  failedLoginAttempts: number;
  accountLockedUntil?: number;
  createdAt: number;
  updatedAt: number;
  metadata?: Record<string, any>;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: number;
  refreshExpiresAt: number;
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  createdAt: number;
  lastActivityAt: number;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  maxUsers: number;
  settings: {
    enforceSSO: boolean;
    enforce2FA: boolean;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireLowercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      expiryDays?: number;
    };
    sessionTimeout: number;
    ipWhitelist?: string[];
    dataRetentionDays: number;
  };
  billingEmail: string;
  status: 'active' | 'suspended' | 'trial';
  trialEndsAt?: number;
  createdAt: number;
  updatedAt: number;
}

export interface AuditLog {
  id: string;
  userId?: string;
  organizationId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  status: 'success' | 'failure';
  timestamp: number;
}

export interface DataBackup {
  id: string;
  organizationId: string;
  type: 'full' | 'incremental';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  size?: number;
  location?: string;
  encryptionKey?: string;
  createdAt: number;
  completedAt?: number;
  error?: string;
}

export interface Consent {
  id: string;
  userId: string;
  type: 'terms' | 'privacy' | 'marketing' | 'cookies' | 'data_processing';
  version: string;
  accepted: boolean;
  ipAddress?: string;
  timestamp: number;
}

export interface EncryptedData {
  id: string;
  userId: string;
  organizationId?: string;
  dataType: string;
  encryptedContent: string;
  encryptionAlgorithm: string;
  iv: string;
  authTag?: string;
  createdAt: number;
  updatedAt: number;
}
