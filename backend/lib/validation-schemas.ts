import { z } from 'zod';

// User registration schema
export const registerBodySchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  organizationName: z.string().optional(),
});

// OIDC callback query schema
export const oidcCallbackQuerySchema = z.object({
  code: z.string().min(1, 'Authorization code is required'),
  state: z.string().min(1, 'State parameter is required'),
});

// Password validation schema
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Email validation utility
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Email verification schema
export const verifyEmailBodySchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
  verificationCode: z.string().optional(),
  userId: z.string().uuid().optional(),
});

// Reset password schema
export const resetPasswordBodySchema = z.object({
  email: z.string().email('Invalid email format'),
  resetToken: z.string().min(1, 'Reset token is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

// Platform sync drain schema
export const platformSyncDrainBodySchema = z.object({
  organizationId: z.string().uuid().optional(),
  force: z.boolean().optional(),
});

// User login schema
export const userLoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  deviceId: z.string().optional(),
  totp: z.string().optional(),
  recoveryCode: z.string().optional(),
});

// User registration schema
export const userRegistrationSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  organizationName: z.string().optional(),
});

// CSRF token schema
export const csrfTokenSchema = z.object({
  sessionId: z.string().optional(),
});

// Call recording params schema
export const callRecordingParamsSchema = z.object({
  callId: z.string().uuid(),
});

// Call recording query schema
export const callRecordingQuerySchema = z.object({
  format: z.enum(['mp3', 'wav']).optional(),
  quality: z.enum(['low', 'medium', 'high']).optional(),
});

// Consolidated validation schemas object
export const validationSchemas = {
  userRegistration: userRegistrationSchema,
  userLogin: userLoginSchema,
  verifyEmail: verifyEmailBodySchema,
  resetPassword: resetPasswordBodySchema,
  csrfToken: csrfTokenSchema,
};

// Password validation utility
export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Export all schemas as a collection
export const allValidationSchemas = {
  registerBodySchema,
  oidcCallbackQuerySchema,
  passwordSchema,
};
