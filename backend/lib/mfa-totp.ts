import crypto from 'crypto';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32ToBuffer(input: string): Buffer {
  const cleaned = input.replace(/=+$/g, '').replace(/\s+/g, '').toUpperCase();
  if (!cleaned) return Buffer.alloc(0);

  let bits = 0;
  let value = 0;
  const out: number[] = [];

  for (const ch of cleaned) {
    const idx = BASE32_ALPHABET.indexOf(ch);
    if (idx === -1) {
      throw new Error('Invalid base32 secret');
    }
    value = (value << 5) | idx;
    bits += 5;

    if (bits >= 8) {
      bits -= 8;
      out.push((value >>> bits) & 0xff);
    }
  }

  return Buffer.from(out);
}

function leftPad(num: number, len: number): string {
  let s = String(num);
  while (s.length < len) s = `0${s}`;
  return s;
}

export function generateBase32Secret(bytes: number = 20): string {
  const buf = crypto.randomBytes(bytes);
  let bits = 0;
  let value = 0;
  let output = '';

  for (const b of buf) {
    value = (value << 8) | b;
    bits += 8;
    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }

  return output;
}

export function buildOtpauthUrl(params: {
  issuer: string;
  accountName: string;
  secret: string;
}): string {
  const issuer = encodeURIComponent(params.issuer);
  const accountName = encodeURIComponent(params.accountName);
  const secret = encodeURIComponent(params.secret);
  return `otpauth://totp/${issuer}:${accountName}?secret=${secret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`;
}

function hotp(secretBase32: string, counter: number, digits: number): string {
  const key = base32ToBuffer(secretBase32);
  const msg = Buffer.alloc(8);
  const ctr = BigInt(counter);
  msg.writeBigUInt64BE(ctr);

  const hmac = crypto.createHmac('sha1', key).update(msg).digest();
  const offset = (hmac[hmac.length - 1] ?? 0) & 0x0f;
  const b0 = hmac[offset] ?? 0;
  const b1 = hmac[offset + 1] ?? 0;
  const b2 = hmac[offset + 2] ?? 0;
  const b3 = hmac[offset + 3] ?? 0;
  const code = ((b0 & 0x7f) << 24) | ((b1 & 0xff) << 16) | ((b2 & 0xff) << 8) | (b3 & 0xff);

  const otp = code % 10 ** digits;
  return leftPad(otp, digits);
}

export function generateTotp(secretBase32: string, opts?: { step?: number; digits?: number; timestampMs?: number }): string {
  const step = opts?.step ?? 30;
  const digits = opts?.digits ?? 6;
  const ts = opts?.timestampMs ?? Date.now();
  const counter = Math.floor(ts / 1000 / step);
  return hotp(secretBase32, counter, digits);
}

export function verifyTotp(
  token: string,
  secretBase32: string,
  opts?: { step?: number; digits?: number; window?: number; timestampMs?: number }
): boolean {
  const step = opts?.step ?? 30;
  const digits = opts?.digits ?? 6;
  const window = opts?.window ?? 1;
  const ts = opts?.timestampMs ?? Date.now();

  const cleaned = String(token || '').replace(/\s+/g, '');
  if (!new RegExp(`^\\d{${digits}}$`).test(cleaned)) return false;

  const counter = Math.floor(ts / 1000 / step);
  for (let w = -window; w <= window; w++) {
    const expected = hotp(secretBase32, counter + w, digits);
    if (crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(cleaned))) {
      return true;
    }
  }
  return false;
}

export function generateRecoveryCodes(count: number = 10): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    // 10 chars base32-ish, uppercase, no ambiguous chars
    const raw = crypto.randomBytes(8).toString('base64url').toUpperCase();
    codes.push(raw.replace(/[^A-Z0-9]/g, '').slice(0, 10));
  }
  return codes;
}

export function hashRecoveryCode(code: string): string {
  return crypto.createHash('sha256').update(code).digest('hex');
}
