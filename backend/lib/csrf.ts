import { randomBytes, createHash } from 'crypto';

const csrfTokens = new Map<string, { token: string; expiresAt: number }>();
const CSRF_TOKEN_EXPIRY = 3600000; // 1 hour

export function generateCSRFToken(sessionId: string): string {
  const token = randomBytes(32).toString('hex');
  const hash = createHash('sha256').update(token).digest('hex');
  
  csrfTokens.set(sessionId, {
    token: hash,
    expiresAt: Date.now() + CSRF_TOKEN_EXPIRY,
  });
  
  return token;
}

export function validateCSRFToken(sessionId: string, token: string): boolean {
  const stored = csrfTokens.get(sessionId);
  
  if (!stored) {
    return false;
  }
  
  if (stored.expiresAt < Date.now()) {
    csrfTokens.delete(sessionId);
    return false;
  }
  
  const hash = createHash('sha256').update(token).digest('hex');
  return hash === stored.token;
}

export function deleteCSRFToken(sessionId: string): void {
  csrfTokens.delete(sessionId);
}

export function cleanupExpiredTokens(): void {
  const now = Date.now();
  for (const [sessionId, data] of csrfTokens.entries()) {
    if (data.expiresAt < now) {
      csrfTokens.delete(sessionId);
    }
  }
}

setInterval(cleanupExpiredTokens, 300000); // Cleanup every 5 minutes
