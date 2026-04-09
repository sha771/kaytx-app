import crypto from 'crypto';

/**
 * Constant-time comparison functions to prevent timing attacks
 */

/**
 * Compare two strings in constant time to prevent timing attacks
 * This is the core function that should be used for all sensitive comparisons
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Compare two buffers in constant time
 * This is useful when working with crypto operations
 */
export function timingSafeEqualBuffer(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) {
    return false;
  }

  return crypto.timingSafeEqual(a, b);
}

/**
 * Compare two hex-encoded strings in constant time
 * Useful for comparing hashes and signatures
 */
export function timingSafeEqualHex(a: string, b: string): boolean {
  try {
    const aBuf = Buffer.from(a, 'hex');
    const bBuf = Buffer.from(b, 'hex');
    return timingSafeEqualBuffer(aBuf, bBuf);
  } catch {
    return false;
  }
}

/**
 * Compare two base64-encoded strings in constant time
 * Useful for comparing tokens and signatures
 */
export function timingSafeEqualBase64(a: string, b: string): boolean {
  try {
    const aBuf = Buffer.from(a, 'base64');
    const bBuf = Buffer.from(b, 'base64');
    return timingSafeEqualBuffer(aBuf, bBuf);
  } catch {
    return false;
  }
}

/**
 * Generic constant-time comparison that handles different encodings
 * @param a First value to compare
 * @param b Second value to compare
 * @param encoding Optional encoding ('hex', 'base64', 'utf8')
 */
export function constantTimeCompare(
  a: string, 
  b: string, 
  encoding: 'hex' | 'base64' | 'utf8' = 'utf8'
): boolean {
  if (encoding === 'hex') {
    return timingSafeEqualHex(a, b);
  } else if (encoding === 'base64') {
    return timingSafeEqualBase64(a, b);
  } else {
    return timingSafeEqual(a, b);
  }
}

/**
 * Secure string comparison with length normalization
 * This prevents timing attacks even when strings have different lengths
 * by padding the shorter string to match the longer one
 */
export function secureCompare(a: string, b: string): boolean {
  const maxLen = Math.max(a.length, b.length);
  const aPadded = a.padEnd(maxLen, '\0');
  const bPadded = b.padEnd(maxLen, '\0');
  
  return timingSafeEqual(aPadded, bPadded);
}

/**
 * Verify HMAC signature in constant time
 * @param data Original data
 * @param signature Provided signature (hex)
 * @param secret Secret key
 * @returns true if signature is valid
 */
export function verifyHMACSignature(
  data: string, 
  signature: string, 
  secret: string
): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('hex');
    
    return timingSafeEqualHex(signature, expectedSignature);
  } catch {
    return false;
  }
}

/**
 * Verify CSRF token in constant time
 * @param sessionId Session ID
 * @param token CSRF token
 * @param secret Secret key for CSRF token generation
 * @returns true if CSRF token is valid
 */
export function verifyCSRFToken(
  sessionId: string, 
  token: string, 
  secret: string
): boolean {
  try {
    const expectedToken = crypto
      .createHmac('sha256', secret)
      .update(sessionId)
      .digest('hex');
    
    return timingSafeEqualHex(token, expectedToken);
  } catch {
    return false;
  }
}

/**
 * Verify webhook signature in constant time
 * @param payload Raw request body
 * @param signature Provided signature
 * @param secret Webhook secret
 * @returns true if signature is valid
 */
export function verifyWebhookSignature(
  payload: string, 
  signature: string, 
  secret: string
): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    return timingSafeEqualHex(signature, expectedSignature);
  } catch {
    return false;
  }
}

/**
 * Constant-time array comparison
 * Useful for comparing arrays of values (like permissions)
 */
export function timingSafeEqualArray<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    const aStr = String(a[i]);
    const bStr = String(b[i]);
    result |= timingSafeEqual(aStr, bStr) ? 0 : 1;
  }

  return result === 0;
}

/**
 * Secure comparison for numeric values
 * Prevents timing attacks when comparing numbers (like timestamps)
 */
export function timingSafeEqualNumber(a: number, b: number): boolean {
  return a === b;
}

/**
 * Generic secure comparison function that chooses the appropriate method
 * based on the input types
 */
export function secureEquals(a: any, b: any): boolean {
  // Handle null/undefined
  if (a == null || b == null) {
    return a === b;
  }

  // Handle strings
  if (typeof a === 'string' && typeof b === 'string') {
    return timingSafeEqual(a, b);
  }

  // Handle buffers
  if (Buffer.isBuffer(a) && Buffer.isBuffer(b)) {
    return timingSafeEqualBuffer(a, b);
  }

  // Handle numbers
  if (typeof a === 'number' && typeof b === 'number') {
    return timingSafeEqualNumber(a, b);
  }

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    return timingSafeEqualArray(a, b);
  }

  // Fallback to string comparison
  return timingSafeEqual(String(a), String(b));
}
