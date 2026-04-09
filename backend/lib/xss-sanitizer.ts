/**
 * XSS Sanitization Utility
 * Prevents XSS attacks by escaping HTML entities and sanitizing user input
 */

/**
 * Escape HTML entities to prevent XSS
 */
export function escapeHtml(text: string): string {
  if (typeof text !== 'string') {
    return '';
  }

  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return text.replace(/[&<>"'/]/g, (char) => htmlEntities[char] || char);
}

/**
 * Sanitize an object by escaping all string values recursively
 */
export function sanitizeObject<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    return escapeHtml(obj) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject) as unknown as T;
  }

  if (typeof obj === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value);
    }
    return sanitized as T;
  }

  return obj;
}

/**
 * Create a safe HTML element with text content
 */
export function createSafeElement(
  tag: string,
  textContent: string,
  className?: string
): string {
  const classAttr = className ? ` class="${escapeHtml(className)}"` : '';
  return `<${tag}${classAttr}>${escapeHtml(textContent)}</${tag}>`;
}

/**
 * Validate and sanitize URL to prevent javascript: protocol attacks
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') {
    return '';
  }

  const trimmed = url.trim().toLowerCase();

  // Block javascript: and data: protocols
  if (trimmed.startsWith('javascript:') ||
      trimmed.startsWith('data:') ||
      trimmed.startsWith('vbscript:')) {
    return '';
  }

  // Allow only http:, https:, mailto:, tel:, and relative URLs
  if (!/^https?:\/\//i.test(url) &&
      !/^mailto:/i.test(url) &&
      !/^tel:/i.test(url) &&
      !/^\/[^/\s]/i.test(url) &&
      !/^#[\w-]+$/i.test(url)) {
    return '';
  }

  return url;
}

/**
 * Sanitize JSON string before parsing
 */
export function safeJsonParse<T>(json: string, defaultValue: T = null as T): T {
  try {
    // Remove potential script tags and dangerous content
    const sanitized = json
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '');

    return JSON.parse(sanitized) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Middleware to sanitize request body
 */
export function sanitizeRequestBody(body: unknown): unknown {
  return sanitizeObject(body);
}

/**
 * Check if string contains potential XSS payload
 */
export function containsXss(input: string): boolean {
  if (typeof input !== 'string') {
    return false;
  }

  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,  // event handlers like onclick=
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /data:text\/html/i,
  ];

  return xssPatterns.some(pattern => pattern.test(input));
}

/**
 * Strip all HTML tags from text
 */
export function stripHtml(html: string): string {
  if (typeof html !== 'string') {
    return '';
  }

  return html.replace(/<[^>]*>/g, '');
}
