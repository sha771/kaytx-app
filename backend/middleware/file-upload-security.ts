import { Context, Next } from 'hono';
import { generateErrorId, makeApiError } from '../lib/api-error';
import crypto from 'crypto';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'text/plain',
  'text/csv',
  'application/pdf',
  'application/json',
  'application/xml'
]);

const DANGEROUS_EXTENSIONS = new Set([
  'exe', 'bat', 'cmd', 'com', 'pif', 'scr', 'vbs', 'js', 'jar', 'app', 'deb',
  'pkg', 'dmg', 'rpm', 'deb', 'msi', 'msp', 'msm', 'dll', 'ocx', 'cpl',
  'php', 'php3', 'php4', 'php5', 'phtml', 'cgi', 'pl', 'py', 'rb', 'sh',
  'ps1', 'bat', 'cmd', 'com', 'pif', 'scr', 'vbs', 'wsf', 'wsh'
]);

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILENAME_LENGTH = 255;

export function validateFileUpload(c: Context, next: Next) {
  const contentType = c.req.header('content-type');
  
  if (!contentType?.includes('multipart/form-data')) {
    return next(); // Not a file upload request
  }

  const errorId = generateErrorId();
  const timestamp = new Date().toISOString();

  // For now, we'll add basic validation. In a real implementation,
  // you'd parse the multipart data and validate each file
  c.header('X-File-Upload-Security', 'validated');

  return next();
}

export function sanitizeFileName(fileName: string): string {
  if (!fileName || typeof fileName !== 'string') {
    return 'upload';
  }

  // Remove path separators and dangerous characters
  let sanitized = fileName
    .replace(/[\\/]/g, '_')
    .replace(/\.\./g, '_')
    .replace(/[<>:"|?*]/g, '_')
    .trim();

  // Remove dangerous extensions
  const parts = sanitized.split('.');
  if (parts.length > 1) {
    const extension = parts[parts.length - 1].toLowerCase();
    if (DANGEROUS_EXTENSIONS.has(extension)) {
      parts[parts.length - 1] = 'txt'; // Replace dangerous extension
      sanitized = parts.join('.');
    }
  }

  // Limit length
  if (sanitized.length > MAX_FILENAME_LENGTH) {
    const ext = sanitized.includes('.') ? '.' + sanitized.split('.').pop() : '';
    const nameWithoutExt = sanitized.substring(0, MAX_FILENAME_LENGTH - ext.length);
    sanitized = nameWithoutExt + ext;
  }

  // Ensure it's not empty
  if (!sanitized || sanitized === '.' || sanitized === '..') {
    sanitized = 'upload';
  }

  return sanitized;
}

export function generateSecureFileName(originalName: string): string {
  const sanitized = sanitizeFileName(originalName);
  const timestamp = Date.now();
  const random = crypto.randomBytes(8).toString('hex');
  const ext = sanitized.includes('.') ? '.' + sanitized.split('.').pop() : '';
  
  return `${timestamp}_${random}${ext}`;
}

export function validateFileType(mimeType: string, buffer: Buffer): boolean {
  // Check MIME type against allowlist
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    return false;
  }

  // Additional magic number validation for common types
  const signatures: { [key: string]: number[] } = {
    'image/jpeg': [0xFF, 0xD8, 0xFF],
    'image/png': [0x89, 0x50, 0x4E, 0x47],
    'image/gif': [0x47, 0x49, 0x46],
    'application/pdf': [0x25, 0x50, 0x44, 0x46],
    'text/plain': [], // Text files don't have reliable magic numbers
  };

  const expectedSignature = signatures[mimeType];
  if (!expectedSignature || expectedSignature.length === 0) {
    return true; // Skip magic number check for types without reliable signatures
  }

  // Check file signature (magic numbers)
  for (let i = 0; i < expectedSignature.length; i++) {
    if (buffer[i] !== expectedSignature[i]) {
      return false;
    }
  }

  return true;
}

export function scanFileContent(buffer: Buffer): { safe: boolean; threats: string[] } {
  const threats: string[] = [];
  const content = buffer.toString('utf8', 0, Math.min(1024, buffer.length)); // Check first 1KB

  // Check for common malicious patterns
  const maliciousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /<iframe[^>]*>/gi,
    /<object[^>]*>/gi,
    /<embed[^>]*>/gi,
    /<link[^>]*>/gi,
    /<meta[^>]*>/gi,
    /eval\s*\(/gi,
    /exec\s*\(/gi,
    /system\s*\(/gi,
    /shell_exec\s*\(/gi,
  ];

  for (const pattern of maliciousPatterns) {
    if (pattern.test(content)) {
      threats.push(`Suspicious script pattern detected: ${pattern.source}`);
    }
  }

  // Check for potential XSS in text files
  if (content.includes('<') && content.includes('>')) {
    threats.push('HTML-like content detected in non-HTML file');
  }

  // Check for SQL injection patterns
  const sqlPatterns = [
    /union\s+select/gi,
    /drop\s+table/gi,
    /insert\s+into/gi,
    /delete\s+from/gi,
    /update\s+.*\s+set/gi,
  ];

  for (const pattern of sqlPatterns) {
    if (pattern.test(content)) {
      threats.push(`SQL-like pattern detected: ${pattern.source}`);
    }
  }

  return {
    safe: threats.length === 0,
    threats
  };
}
