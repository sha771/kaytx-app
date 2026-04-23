import bcrypt from 'bcryptjs';

/**
 * Hash a token for secure storage using bcrypt
 */
export async function hashSessionToken(token: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(token, saltRounds);
}

/**
 * Verify a token against its stored hash using bcrypt
 */
export async function verifySessionToken(token: string, hashedToken: string): Promise<boolean> {
  return await bcrypt.compare(token, hashedToken);
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
