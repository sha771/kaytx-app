import { decrypt, encrypt, hashData } from './encryption';
import { generateRecoveryCodes, generateTotp, verifyTotp } from './mfa-totp';

const SECRET_PREFIX = 'enc:';

function getEncryptionKey(): string | undefined {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) return undefined;
  return key;
}

export function encryptTotpSecret(secretBase32: string): string {
  const key = getEncryptionKey();
  if (!key) {
    return secretBase32;
  }

  const out = encrypt(secretBase32, key);
  return `${SECRET_PREFIX}${out.iv}:${out.authTag}:${out.encrypted}`;
}

export function decryptTotpSecret(stored: string): string {
  if (!stored) return '';
  if (!stored.startsWith(SECRET_PREFIX)) return stored;

  const key = getEncryptionKey();
  if (!key) {
    throw new Error('ENCRYPTION_KEY is required to decrypt TOTP secret');
  }

  const rest = stored.slice(SECRET_PREFIX.length);
  const [iv, authTag, encrypted] = rest.split(':');
  if (!iv || !authTag || !encrypted) {
    throw new Error('Invalid encrypted TOTP secret format');
  }

  return decrypt(encrypted, key, iv, authTag);
}

export type RecoveryCodeRecord = {
  hash: string;
  usedAt?: string;
};

export function normalizeRecoveryCodes(value: unknown): RecoveryCodeRecord[] {
  if (!Array.isArray(value)) return [];
  const out: RecoveryCodeRecord[] = [];
  for (const item of value) {
    if (item && typeof item === 'object') {
      const hash = (item as any).hash;
      const usedAt = (item as any).usedAt;
      if (typeof hash === 'string' && hash.length > 0) {
        out.push({
          hash,
          ...(typeof usedAt === 'string' ? { usedAt } : {}),
        });
      }
    }
  }
  return out;
}

export function generateNewRecoveryCodeRecords(count: number = 10): { plain: string[]; records: RecoveryCodeRecord[] } {
  const plain = generateRecoveryCodes(count);
  const records = plain.map((code) => ({ hash: hashData(code) }));
  return { plain, records };
}

export function consumeRecoveryCode(
  codes: RecoveryCodeRecord[],
  recoveryCode: string
): { ok: boolean; updated: RecoveryCodeRecord[] } {
  const normalized = normalizeRecoveryCodes(codes);
  const hashed = hashData(String(recoveryCode || '').trim().toUpperCase());
  let matched = false;

  const updated = normalized.map((c) => {
    if (!matched && !c.usedAt && c.hash === hashed) {
      matched = true;
      return { ...c, usedAt: new Date().toISOString() };
    }
    return c;
  });

  return { ok: matched, updated };
}

export function verifyTotpForUser(secretStored: string | null | undefined, token: string): boolean {
  if (!secretStored) return false;
  const secret = decryptTotpSecret(String(secretStored));
  return verifyTotp(token, secret, { window: 1 });
}

export function generateCurrentTotp(secretStored: string): string {
  const secret = decryptTotpSecret(secretStored);
  return generateTotp(secret);
}
