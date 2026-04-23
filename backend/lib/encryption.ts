import crypto from 'crypto';
import { logger } from './production-logger';

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

export function generateEncryptionKey(): string {
  return crypto.randomBytes(KEY_LENGTH).toString('hex');
}

export function encrypt(text: string, key: string): {
  encrypted: string;
  iv: string;
  authTag: string;
} {
  const keyBuffer = Buffer.from(key, 'hex');
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
  };
}

export function decrypt(encrypted: string, key: string, iv: string, authTag: string): string {
  const keyBuffer = Buffer.from(key, 'hex');
  const ivBuffer = Buffer.from(iv, 'hex');
  const authTagBuffer = Buffer.from(authTag, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, ivBuffer);
  decipher.setAuthTag(authTagBuffer);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

export function hashData(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

export function maskEmail(email: string): string {
  const parts = email.split('@');
  if (parts.length !== 2) return email;
  const localPart = parts[0] ?? '';
  const domain = parts[1] ?? '';
  if (!localPart || !domain) return email;
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }
  return `${localPart.substring(0, 2)}***@${domain}`;
}

export function maskPhoneNumber(phone: string): string {
  if (phone.length <= 4) {
    return '***' + phone;
  }
  return '***' + phone.substring(phone.length - 4);
}

// ============================================================================
// FIELD-LEVEL ENCRYPTION FOR SENSITIVE DATA
// ============================================================================

interface EncryptedField {
  encrypted: string;
  iv: string;
  authTag: string;
  timestamp: number;
}

/**
 * Enhanced field-level encryption with additional security features
 */

/**
 * Encrypt sensitive database fields with enhanced security
 */
export function encryptField(plaintext: string, encryptionKey: string, additionalData?: string): EncryptedField {
  if (!plaintext || !encryptionKey) {
    throw new Error('Both plaintext and encryption key are required');
  }
  
  // Add timestamp to prevent replay attacks and encode data to avoid plaintext leakage
  const timestamp = Date.now();
  const encodedPlaintext = Buffer.from(plaintext, 'utf8').toString('base64');
  const dataObject = {
    t: timestamp,
    p: encodedPlaintext,
    a: additionalData ? Buffer.from(additionalData, 'utf8').toString('base64') : undefined
  };
  
  const encrypted = encrypt(JSON.stringify(dataObject), encryptionKey);
  
  return {
    ...encrypted,
    timestamp
  };
}

/**
 * Decrypt sensitive database fields with validation
 */
export function decryptField(encryptedField: EncryptedField, encryptionKey: string, maxAgeMs: number = 365 * 24 * 60 * 60 * 1000): string {
  if (!encryptedField || !encryptionKey) {
    throw new Error('Both encrypted field and encryption key are required');
  }
  
  const anyField = encryptedField as any;
  const encrypted = typeof anyField.encrypted === 'string' ? anyField.encrypted : anyField.data;
  if (typeof encrypted !== 'string') {
    throw new Error('Invalid encrypted field format');
  }
  
  const decrypted = decrypt(encrypted, encryptionKey, encryptedField.iv, encryptedField.authTag);
  
  let dataObject;
  try {
    dataObject = JSON.parse(decrypted);
  } catch (e) {
    // Fallback for legacy format (timestamp:plaintext[:additionalData])
    const parts = decrypted.split(':');
    if (parts.length < 2) {
      throw new Error('Invalid encrypted data format');
    }
    
    const timestamp = parseInt(parts[0]);
    if (Date.now() - timestamp > maxAgeMs) {
      throw new Error('Encrypted data is too old');
    }
    return parts[1];
  }
  
  if (!dataObject || typeof dataObject.p !== 'string' || typeof dataObject.t !== 'number') {
    throw new Error('Invalid encrypted data structure');
  }
  
  if (Date.now() - dataObject.t > maxAgeMs) {
    throw new Error('Encrypted data is too old');
  }
  
  // Decode base64 plaintext
  try {
    return Buffer.from(dataObject.p, 'base64').toString('utf8');
  } catch (e) {
    // Fallback for non-base64 encoded data (legacy)
    return dataObject.p;
  }
}

/**
 * Get or generate encryption key from environment with enhanced validation
 */
export function getFieldEncryptionKey(): string {
  const key = process.env.FIELD_ENCRYPTION_KEY;
  if (key) {
    if (key.length !== 64) {
      throw new Error('FIELD_ENCRYPTION_KEY must be 64 characters (32 bytes in hex)');
    }
    // Validate hex format
    if (!/^[0-9a-fA-F]{64}$/.test(key)) {
      throw new Error('FIELD_ENCRYPTION_KEY must be valid hexadecimal');
    }
    return key;
  }

  const nodeEnv = process.env.NODE_ENV || 'development';
  const isProduction = nodeEnv === 'production';
  if (isProduction) {
    throw new Error('FIELD_ENCRYPTION_KEY environment variable is not set');
  }

  const fallback = process.env.ENCRYPTION_KEY;
  if (!fallback) {
    throw new Error('FIELD_ENCRYPTION_KEY environment variable is not set');
  }

  return crypto.createHash('sha256').update(fallback).digest('hex');
}

/**
 * Rotate encryption key for a field
 */
export function rotateFieldEncryption(oldEncryptedField: EncryptedField, oldKey: string, newKey: string): EncryptedField {
  const decrypted = decryptField(oldEncryptedField, oldKey);
  return encryptField(decrypted, newKey);
}

/**
 * Batch encrypt multiple fields
 */
export function encryptFields(data: Record<string, any>, fieldsToEncrypt: string[], encryptionKey?: string): Record<string, any> {
  const key = encryptionKey || getFieldEncryptionKey();
  const result = { ...data };
  
  for (const field of fieldsToEncrypt) {
    if (result[field] && typeof result[field] === 'string') {
      result[field] = encryptField(result[field], key);
    }
  }
  
  return result;
}

/**
 * Batch decrypt multiple fields
 */
export function decryptFields(data: Record<string, any>, fieldsToDecrypt: string[], encryptionKey?: string): Record<string, any> {
  const key = encryptionKey || getFieldEncryptionKey();
  const result = { ...data };
  
  for (const field of fieldsToDecrypt) {
    if (result[field] && isEncryptedField(result[field])) {
      try {
        result[field] = decryptField(result[field], key);
      } catch (error) {
        logger.warn(`Failed to decrypt field ${field}`, { error });
        // Keep original encrypted value if decryption fails
      }
    }
  }
  
  return result;
}


/**
 * Encrypt payment information
 */
export function encryptPaymentData(data: {
  cardNumber?: string;
  bankAccount?: string;
  routingNumber?: string;
}): {
  cardNumber?: EncryptedField;
  bankAccount?: EncryptedField;
  routingNumber?: EncryptedField;
} {
  const encryptionKey = getFieldEncryptionKey();
  const result: any = {};
  
  if (data.cardNumber) {
    result.cardNumber = encryptField(data.cardNumber, encryptionKey);
  }
  
  if (data.bankAccount) {
    result.bankAccount = encryptField(data.bankAccount, encryptionKey);
  }
  
  if (data.routingNumber) {
    result.routingNumber = encryptField(data.routingNumber, encryptionKey);
  }
  
  return result;
}

/**
 * Decrypt payment information
 */
export function decryptPaymentData(encryptedData: {
  cardNumber?: EncryptedField;
  bankAccount?: EncryptedField;
  routingNumber?: EncryptedField;
}): {
  cardNumber?: string;
  bankAccount?: string;
  routingNumber?: string;
} {
  const encryptionKey = getFieldEncryptionKey();
  const result: any = {};
  
  if (encryptedData.cardNumber) {
    result.cardNumber = decryptField(encryptedData.cardNumber, encryptionKey);
  }
  
  if (encryptedData.bankAccount) {
    result.bankAccount = decryptField(encryptedData.bankAccount, encryptionKey);
  }
  
  if (encryptedData.routingNumber) {
    result.routingNumber = decryptField(encryptedData.routingNumber, encryptionKey);
  }
  
  return result;
}

/**
 * Encrypt integration credentials
 */
export function encryptIntegrationCredentials(credentials: Record<string, any>): {
  encrypted: string;
  iv: string;
  authTag: string;
} {
  const encryptionKey = getFieldEncryptionKey();
  return encrypt(JSON.stringify(credentials), encryptionKey);
}

/**
 * Decrypt integration credentials
 */
export function decryptIntegrationCredentials(encryptedCredentials: {
  encrypted: string;
  iv: string;
  authTag: string;
}): Record<string, any> {
  const encryptionKey = getFieldEncryptionKey();
  const { encrypted, iv, authTag } = encryptedCredentials;
  const decrypted = decrypt(encrypted, encryptionKey, iv, authTag);
  return JSON.parse(decrypted);
}

/**
 * Check if a field is encrypted (has the expected structure)
 */
export function isEncryptedField(field: any): field is EncryptedField {
  return field && 
         typeof field === 'object' && 
         (typeof field.encrypted === 'string' || typeof field.data === 'string') && 
         typeof field.iv === 'string' && 
         typeof field.authTag === 'string';
}

/**
 * Securely compare two values (timing attack safe)
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/**
 * Encrypt comprehensive PII data for a user
 */
export function encryptUserPII(userData: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  ssn?: string;
  dateOfBirth?: string;
}): Record<string, any> {
  const encryptionKey = getFieldEncryptionKey();
  const encrypted: Record<string, any> = {};
  
  // Encrypt email
  if (userData.email) {
    encrypted.email = encryptField(userData.email, encryptionKey);
  }
  
  // Encrypt phone
  if (userData.phone) {
    encrypted.phone = encryptField(userData.phone, encryptionKey);
  }
  
  // Encrypt name fields
  if (userData.firstName) {
    encrypted.firstName = encryptField(userData.firstName, encryptionKey);
  }
  
  if (userData.lastName) {
    encrypted.lastName = encryptField(userData.lastName, encryptionKey);
  }
  
  // Encrypt address components
  if (userData.address) {
    encrypted.address = {};
    if (userData.address.street) {
      encrypted.address.street = encryptField(userData.address.street, encryptionKey);
    }
    if (userData.address.city) {
      encrypted.address.city = encryptField(userData.address.city, encryptionKey);
    }
    if (userData.address.state) {
      encrypted.address.state = encryptField(userData.address.state, encryptionKey);
    }
    if (userData.address.zip) {
      encrypted.address.zip = encryptField(userData.address.zip, encryptionKey);
    }
    if (userData.address.country) {
      encrypted.address.country = encryptField(userData.address.country, encryptionKey);
    }
  }
  
  // Encrypt SSN (highly sensitive)
  if (userData.ssn) {
    encrypted.ssn = encryptField(userData.ssn, encryptionKey);
  }
  
  // Encrypt date of birth
  if (userData.dateOfBirth) {
    encrypted.dateOfBirth = encryptField(userData.dateOfBirth, encryptionKey);
  }
  
  return encrypted;
}

/**
 * Decrypt comprehensive PII data for a user
 */
export function decryptUserPII(encryptedData: Record<string, any>): {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  ssn?: string;
  dateOfBirth?: string;
} {
  const encryptionKey = getFieldEncryptionKey();
  const decrypted: Record<string, any> = {};
  
  // Decrypt email
  if (encryptedData.email && isEncryptedField(encryptedData.email)) {
    decrypted.email = decryptField(encryptedData.email, encryptionKey);
  }
  
  // Decrypt phone
  if (encryptedData.phone && isEncryptedField(encryptedData.phone)) {
    decrypted.phone = decryptField(encryptedData.phone, encryptionKey);
  }
  
  // Decrypt name fields
  if (encryptedData.firstName && isEncryptedField(encryptedData.firstName)) {
    decrypted.firstName = decryptField(encryptedData.firstName, encryptionKey);
  }
  
  if (encryptedData.lastName && isEncryptedField(encryptedData.lastName)) {
    decrypted.lastName = decryptField(encryptedData.lastName, encryptionKey);
  }
  
  // Decrypt address components
  if (encryptedData.address) {
    decrypted.address = {};
    if (encryptedData.address.street && isEncryptedField(encryptedData.address.street)) {
      decrypted.address.street = decryptField(encryptedData.address.street, encryptionKey);
    }
    if (encryptedData.address.city && isEncryptedField(encryptedData.address.city)) {
      decrypted.address.city = decryptField(encryptedData.address.city, encryptionKey);
    }
    if (encryptedData.address.state && isEncryptedField(encryptedData.address.state)) {
      decrypted.address.state = decryptField(encryptedData.address.state, encryptionKey);
    }
    if (encryptedData.address.zip && isEncryptedField(encryptedData.address.zip)) {
      decrypted.address.zip = decryptField(encryptedData.address.zip, encryptionKey);
    }
    if (encryptedData.address.country && isEncryptedField(encryptedData.address.country)) {
      decrypted.address.country = decryptField(encryptedData.address.country, encryptionKey);
    }
  }
  
  // Decrypt SSN
  if (encryptedData.ssn && isEncryptedField(encryptedData.ssn)) {
    decrypted.ssn = decryptField(encryptedData.ssn, encryptionKey);
  }
  
  // Decrypt date of birth
  if (encryptedData.dateOfBirth && isEncryptedField(encryptedData.dateOfBirth)) {
    decrypted.dateOfBirth = decryptField(encryptedData.dateOfBirth, encryptionKey);
  }
  
  return decrypted;
}

/**
 * Encrypt sensitive metadata fields
 */
export function encryptSensitiveMetadata(metadata: Record<string, any>): Record<string, any> {
  const encryptionKey = getFieldEncryptionKey();
  const sensitiveFields = [
    'ssn', 'taxId', 'passportNumber', 'driverLicense', 
    'bankAccount', 'routingNumber', 'creditCard', 'cvv',
    'personalEmail', 'homePhone', 'mobilePhone'
  ];
  
  const encrypted = { ...metadata };
  
  for (const field of sensitiveFields) {
    if (encrypted[field] && typeof encrypted[field] === 'string') {
      encrypted[field] = encryptField(encrypted[field], encryptionKey);
    }
  }
  
  return encrypted;
}

/**
 * Verify field encryption key integrity
 */
export function verifyEncryptionKeyIntegrity(): boolean {
  try {
    const key = getFieldEncryptionKey();
    if (!key || key.length !== 64) {
      logger.error('[ENCRYPTION] Invalid encryption key length');
      return false;
    }
    
    // Test encryption/decryption
    const testData = 'test-integrity-' + Date.now();
    const encrypted = encryptField(testData, key);
    const decrypted = decryptField(encrypted, key);
    
    return decrypted === testData;
  } catch (error) {
    logger.error('[ENCRYPTION] Key integrity check failed', { error });
    return false;
  }
}

/**
 * Encrypt an entire object with field-level encryption for sensitive fields
 */
export function encryptObject(obj: Record<string, any>, sensitiveFields: string[] = [], encryptionKey?: string): Record<string, any> {
  const key = encryptionKey || getFieldEncryptionKey();
  const result = { ...obj };
  
  // Encrypt specified sensitive fields
  for (const field of sensitiveFields) {
    if (result[field] && typeof result[field] === 'string') {
      result[field] = encryptField(result[field], key);
    }
  }
  
  // Auto-encrypt commonly sensitive fields if not explicitly specified
  const autoSensitiveFields = ['ssn', 'taxId', 'passportNumber', 'driverLicense', 'bankAccount', 'routingNumber', 'creditCard', 'cvv'];
  for (const field of autoSensitiveFields) {
    if (result[field] && typeof result[field] === 'string' && !sensitiveFields.includes(field)) {
      result[field] = encryptField(result[field], key);
    }
  }
  
  return result;
}

/**
 * Decrypt an entire object with field-level decryption for sensitive fields
 */
export function decryptObject(obj: Record<string, any>, sensitiveFields: string[] = [], encryptionKey?: string): Record<string, any> {
  const key = encryptionKey || getFieldEncryptionKey();
  const result = { ...obj };
  
  // Decrypt specified sensitive fields
  for (const field of sensitiveFields) {
    if (result[field] && isEncryptedField(result[field])) {
      try {
        result[field] = decryptField(result[field], key);
      } catch (error) {
        logger.warn(`Failed to decrypt field ${field}`, { error });
        // Keep original encrypted value if decryption fails
      }
    }
  }
  
  // Auto-decrypt commonly sensitive fields if not explicitly specified
  const autoSensitiveFields = ['ssn', 'taxId', 'passportNumber', 'driverLicense', 'bankAccount', 'routingNumber', 'creditCard', 'cvv'];
  for (const field of autoSensitiveFields) {
    if (result[field] && isEncryptedField(result[field]) && !sensitiveFields.includes(field)) {
      try {
        result[field] = decryptField(result[field], key);
      } catch (error) {
        logger.warn(`Failed to decrypt field ${field}`, { error });
        // Keep original encrypted value if decryption fails
      }
    }
  }
  
  return result;
}
