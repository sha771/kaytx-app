 
 
import { Hono } from 'hono';
import { z } from 'zod';

/**
 * API utility functions for consistent responses and error handling
 */

export class APIUtils {
  /**
   * Standard success response format
   */
  static success<T>(data: T, meta?: {
    message?: string;
    timestamp?: string;
    requestId?: string;
  }) {
    return {
      success: true,
      data,
      meta: {
        timestamp: meta?.timestamp || new Date().toISOString(),
        message: meta?.message,
        requestId: meta?.requestId,
      }
    };
  }

  /**
   * Standard error response format
   */
  static error(
    code: string,
    message: string,
    details?: any,
    meta?: {
      timestamp?: string;
      requestId?: string;
      traceId?: string;
    }
  ) {
    return {
      success: false,
      error: {
        code,
        message,
        details,
      },
      meta: {
        timestamp: meta?.timestamp || new Date().toISOString(),
        requestId: meta?.requestId,
        traceId: meta?.traceId,
      }
    };
  }

  /**
   * Extract pagination parameters
   */
  static getPaginationParams(c: Context): {
    limit: number;
    offset: number;
    page: number;
  } {
    const query = c.req.query();
    const limit = Math.min(parseInt(query.limit || '50'), 100);
    const offset = Math.max(parseInt(query.offset || '0'), 0);
    const page = Math.max(parseInt(query.page || '1'), 1);
    
    return { limit, offset, page };
  }

  /**
   * Build pagination metadata
   */
  static buildPaginationMeta(
    total: number,
    limit: number,
    offset: number,
    page: number
  ) {
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;
    
    return {
      pagination: {
        total,
        limit,
        offset,
        page,
        totalPages,
        hasNext,
        hasPrev,
        nextOffset: hasNext ? offset + limit : null,
        prevOffset: hasPrev ? Math.max(0, offset - limit) : null,
      }
    };
  }

  /**
   * Extract sorting parameters
   */
  static getSortingParams(c: Context, allowedFields: string[] = []): {
    sortBy?: string;
    sortOrder: 'asc' | 'desc';
  } {
    const query = c.req.query();
    let sortBy = query.sortBy;
    let sortOrder: 'asc' | 'desc' = 'desc';
    
    if (sortBy && allowedFields.length > 0) {
      sortBy = allowedFields.includes(sortBy) ? sortBy : allowedFields[0];
    }
    
    if (query.sortOrder?.toLowerCase() === 'asc') {
      sortOrder = 'asc';
    }
    
    return { sortBy, sortOrder };
  }

  /**
   * Extract filtering parameters
   */
  static getFilterParams(c: Context, schema?: z.ZodSchema): {
    filters: Record<string, any>;
    search?: string;
  } {
    const query = c.req.query();
    const filters: Record<string, any> = {};
    let search: string | undefined;
    
    Object.keys(query).forEach(key => {
      if (key === 'search') {
        search = query[key];
      } else if (key !== 'limit' && key !== 'offset' && key !== 'page' && 
                 key !== 'sortBy' && key !== 'sortOrder') {
        filters[key] = query[key];
      }
    });
    
    if (schema) {
      try {
        const validated = schema.parse(filters);
        return { filters: validated, search };
      } catch (error) {
        // Return original filters if validation fails
        return { filters, search };
      }
    }
    
    return { filters, search };
  }

  /**
   * Generate request ID
   */
  static generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get client IP address from request
   */
  static getClientIP(c: Context): string {
    return (
      c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ||
      c.req.header('x-real-ip') ||
      c.req.header('cf-connecting-ip') ||
      'unknown'
    );
  }

  /**
   * Get user agent from request
   */
  static getUserAgent(c: Context): string {
    return c.req.header('user-agent') || 'unknown';
  }

  /**
   * Validate API version
   */
  static validateAPIVersion(c: Context, supportedVersions: string[] = ['v1']): boolean {
    const version = c.req.header('api-version') || 
                   c.req.path.match(/^\/api\/([^\/]+)/)?.[1] ||
                   'v1';
    
    return supportedVersions.includes(version);
  }

  /**
   * Rate limiting response
   */
  static rateLimitResponse(
    retryAfter: number,
    limit: number,
    remaining: number,
    resetTime: number
  ) {
    return {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please try again later.',
        details: {
          retryAfter,
          limit,
          remaining,
          resetTime: new Date(resetTime).toISOString(),
        }
      }
    };
  }

  /**
   * Health check response
   */
  static healthResponse(status: 'healthy' | 'degraded' | 'unhealthy', checks: Record<string, any>) {
    return {
      status,
      timestamp: new Date().toISOString(),
      checks,
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    };
  }

  /**
   * Cache control headers
   */
  static setCacheHeaders(c: Context, maxAge: number, etag?: string) {
    if (etag) {
      c.header('ETag', etag);
    }
    c.header('Cache-Control', `public, max-age=${maxAge}`);
    c.header('Vary', 'Accept-Encoding');
  }

  /**
   * Security headers
   */
  static setSecurityHeaders(c: Context) {
    c.header('X-Content-Type-Options', 'nosniff');
    c.header('X-Frame-Options', 'DENY');
    c.header('X-XSS-Protection', '1; mode=block');
    c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  }

  /**
   * CORS headers for specific origin
   */
  static setCORSHeaders(c: Context, origin: string, methods: string[] = ['GET', 'POST', 'PUT', 'DELETE']) {
    c.header('Access-Control-Allow-Origin', origin);
    c.header('Access-Control-Allow-Methods', methods.join(', '));
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-API-Key');
    c.header('Access-Control-Max-Age', '86400');
    c.header('Access-Control-Allow-Credentials', 'true');
  }
}

export default APIUtils;
