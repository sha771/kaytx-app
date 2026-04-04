import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { User, Session } from '../db/schema';
import { db } from '../db/in-memory-store';

if (!process.env.JWT_SECRET) {
  throw new Error('CRITICAL: JWT_SECRET environment variable is not set. Application cannot start.');
}
if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error('CRITICAL: JWT_REFRESH_SECRET environment variable is not set. Application cannot start.');
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION = 15 * 60 * 1000;

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  organizationId?: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function generateVerificationToken(): string {
  return nanoid(32);
}

export function generateSessionId(): string {
  return nanoid(32);
}

export async function createSession(
  userId: string,
  ipAddress?: string,
  userAgent?: string,
  deviceId?: string
): Promise<Session> {
  const user = db.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId,
  };

  const token = generateToken(payload);
  const refreshToken = generateRefreshToken(payload);
  const now = Date.now();

  const session: Session = {
    id: generateSessionId(),
    userId,
    token,
    refreshToken,
    expiresAt: now + 15 * 60 * 1000,
    refreshExpiresAt: now + 7 * 24 * 60 * 60 * 1000,
    ipAddress,
    userAgent,
    deviceId,
    createdAt: now,
    lastActivityAt: now,
  };

  db.createSession(session);
  return session;
}

export async function refreshSession(refreshToken: string): Promise<Session | null> {
  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    return null;
  }

  const sessions = db.getUserSessions(payload.userId);
  const existingSession = sessions.find(s => s.refreshToken === refreshToken);

  if (!existingSession || existingSession.refreshExpiresAt < Date.now()) {
    return null;
  }

  const newToken = generateToken(payload);
  const now = Date.now();

  db.updateSession(existingSession.id, {
    token: newToken,
    expiresAt: now + 15 * 60 * 1000,
    lastActivityAt: now,
  });

  return db.getUserSessions(payload.userId).find(s => s.id === existingSession.id)!;
}

export function validateSession(token: string): { valid: boolean; userId?: string; session?: Session } {
  const session = db.getSessionByToken(token);
  
  if (!session) {
    return { valid: false };
  }

  if (session.expiresAt < Date.now()) {
    return { valid: false };
  }

  db.updateSession(session.id, {
    lastActivityAt: Date.now(),
  });

  return { valid: true, userId: session.userId, session };
}

export async function revokeSession(sessionId: string): Promise<void> {
  db.deleteSession(sessionId);
}

export async function revokeAllUserSessions(userId: string): Promise<void> {
  const sessions = db.getUserSessions(userId);
  sessions.forEach(session => db.deleteSession(session.id));
}

export async function handleFailedLogin(userId: string): Promise<void> {
  const user = db.getUser(userId);
  if (!user) return;

  const failedAttempts = user.failedLoginAttempts + 1;
  const updates: Partial<User> = {
    failedLoginAttempts: failedAttempts,
  };

  if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
    updates.accountLockedUntil = Date.now() + LOCK_DURATION;
    updates.status = 'suspended';
  }

  db.updateUser(userId, updates);
}

export async function resetFailedLoginAttempts(userId: string): Promise<void> {
  db.updateUser(userId, {
    failedLoginAttempts: 0,
    accountLockedUntil: undefined,
  });
}

export function isAccountLocked(user: User): boolean {
  if (user.accountLockedUntil && user.accountLockedUntil > Date.now()) {
    return true;
  }
  return false;
}

export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
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
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
