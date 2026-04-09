import { createHash, randomBytes } from 'crypto';
import { logAudit, AuditActions } from '../lib/audit';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

// API Gateway Types
export interface APIRequest {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: unknown;
  query?: Record<string, string>;
  timestamp: number;
  userId?: string;
  organizationId?: string;
  clientIp?: string;
  userAgent?: string;
}

export interface APIResponse {
  status: number;
  headers: Record<string, string>;
  body?: unknown;
  timestamp: number;
  duration: number;
}

export interface RouteConfig {
  path: string;
  method: string;
  handler: RouteHandler;
  middleware?: GatewayMiddleware[];
  rateLimit?: {
    requests: number;
    windowMs: number;
  };
  auth?: {
    required: boolean;
    permissions?: string[];
  };
  cache?: {
    ttl: number;
    key?: string;
  };
  timeout?: number;
}

export interface GatewayMiddleware {
  (request: APIRequest, response: APIResponse, next: () => Promise<void>): Promise<void>;
}

export interface GatewayMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  requestsByPath: Record<string, number>;
  requestsByStatus: Record<string, number>;
  activeConnections: number;
  errorRate: number;
  rateLimitHits: number;
  cacheHits: number;
  cacheMisses: number;
  bandwidthInbound: number;
  bandwidthOutbound: number;
}

export type RouteHandler = (request: APIRequest) => Promise<APIResponse>;

// API Gateway Implementation
export class APIGateway {
  private routes: Map<string, RouteConfig[]> = new Map();
  private middleware: GatewayMiddleware[] = [];
  private metrics: GatewayMetrics;
  private rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map();
  private cacheStore: Map<string, { data: unknown; expiresAt: number }> = new Map();
  private requestStore: Map<string, APIRequest & { status: number; duration: number; details: unknown }> = new Map();
  private activeConnections: Set<string> = new Set();
  private circuitBreakers: Map<string, unknown> = new Map();
  private apiKeys: Map<string, unknown> = new Map();
  private globalMiddleware: GatewayMiddleware[] = [];
  private cleanupInterval?: NodeJS.Timeout;

  constructor() {
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      requestsByPath: {},
      requestsByStatus: {},
      activeConnections: 0,
      errorRate: 0,
      rateLimitHits: 0,
      cacheHits: 0,
      cacheMisses: 0,
      bandwidthInbound: 0,
      bandwidthOutbound: 0,
    };

    // Start cleanup interval for rate limits and cache
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000); // Every minute
  }

  // Register a route
  registerRoute(config: RouteConfig): void {
    const key = `${config.method}:${config.path}`;
    
    if (!this.routes.has(key)) {
      this.routes.set(key, []);
    }
    
    this.routes.get(key)!.push(config);
  }

  // Register multiple routes
  registerRoutes(configs: RouteConfig[]): void {
    configs.forEach(config => this.registerRoute(config));
  }

  // Add global middleware
  use(middleware: GatewayMiddleware): void {
    this.middleware.push(middleware);
  }

  // Handle incoming request
  async handleRequest(request: APIRequest): Promise<APIResponse> {
    const startTime = Date.now();
    this.metrics.totalRequests++;
    this.metrics.activeConnections++;

    try {
      // Find matching routes
      const routes = this.findMatchingRoutes(request.method, request.url);
      
      if (routes.length === 0) {
        return this.createResponse(404, { error: 'Route not found' }, startTime);
      }

      // Execute route with first matching configuration
      const route = routes[0];
      
      // Apply global middleware
      for (const middleware of this.middleware) {
        await middleware(request, {} as APIResponse, async () => {});
      }

      // Apply route-specific middleware
      if (route.middleware) {
        for (const middleware of route.middleware) {
          await middleware(request, {} as APIResponse, async () => {});
        }
      }

      // Check rate limiting
      if (route.rateLimit) {
        const allowed = await this.checkRateLimit(request, route.rateLimit);
        if (!allowed) {
          return this.createResponse(429, { error: 'Rate limit exceeded' }, startTime);
        }
      }

      // Check authentication
      if (route.auth?.required) {
        const authResult = await this.checkAuthentication(request, route.auth);
        if (!authResult.valid) {
          return this.createResponse(401, { error: authResult.error }, startTime);
        }
        request.userId = authResult.userId;
        request.organizationId = authResult.organizationId;
      }

      // Check cache
      if (route.cache) {
        const cached = await this.getCache(request, route.cache);
        if (cached) {
          return this.createResponse(200, cached, startTime);
        }
      }

      // Execute handler with timeout
      const response = await this.executeWithTimeout(
        () => route.handler(request),
        route.timeout || 30000
      );

      // Cache response if configured
      if (route.cache && response.status === 200) {
        await this.setCache(request, response.body, route.cache);
      }

      // Update metrics
      this.updateMetrics(request, response, Date.now() - startTime);

      return response;

    } catch (error: unknown) {
      this.metrics.failedRequests++;
      
      logger.error('[APIGateway] Request handling error:', error as Error);
      
      // Log error to audit
      logAudit({
        userId: request.userId,
        organizationId: request.organizationId,
        action: AuditActions.SYSTEM_ERROR,
        resource: 'api_gateway',
        ipAddress: request.clientIp,
        userAgent: request.userAgent,
        metadata: {
          requestId: request.id,
          method: request.method,
          url: request.url,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        status: 'failure',
      });

      return this.createResponse(500, { error: 'Internal server error' }, startTime);
    } finally {
      this.metrics.activeConnections--;
    }
  }

  // Find matching routes
  private findMatchingRoutes(method: string, url: string): RouteConfig[] {
    const key = `${method}:${url}`;
    const exactMatches = this.routes.get(key) || [];

    // Try pattern matching
    for (const [routeKey, configs] of this.routes.entries()) {
      const [routeMethod, routePath] = routeKey.split(':');
      
      if (routeMethod !== method) continue;
      
      if (this.pathMatches(routePath, url)) {
        exactMatches.push(...configs);
      }
    }

    return exactMatches;
  }

  // Check if path matches pattern
  private pathMatches(pattern: string, path: string): boolean {
    // Simple pattern matching - can be enhanced with proper path-to-regexp
    if (pattern === path) return true;
    
    // Handle wildcard patterns
    if (pattern.includes('*')) {
      const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
      return regex.test(path);
    }
    
    // Handle parameter patterns like /users/:id
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');
    
    if (patternParts.length !== pathParts.length) return false;
    
    return patternParts.every((part, index) => {
      return part.startsWith(':') || part === pathParts[index];
    });
  }

  // Check rate limiting
  private async checkRateLimit(request: APIRequest, config: { requests: number; windowMs: number }): Promise<boolean> {
    const key = this.getRateLimitKey(request);
    const now = Date.now();
    const windowStart = now - config.windowMs;

    let rateLimitData = this.rateLimitStore.get(key);
    
    if (!rateLimitData || rateLimitData.resetTime <= now) {
      rateLimitData = {
        count: 0,
        resetTime: now + config.windowMs,
      };
      this.rateLimitStore.set(key, rateLimitData);
    }

    if (rateLimitData.count >= config.requests) {
      return false;
    }

    rateLimitData.count++;
    return true;
  }

  // Get rate limit key
  private getRateLimitKey(request: APIRequest): string {
    const identifier = request.userId || request.clientIp || 'anonymous';
    return createHash('md5').update(`${request.method}:${request.url}:${identifier}`).digest('hex');
  }

  // Check authentication
  private async checkAuthentication(
    request: APIRequest,
    authConfig: { required: boolean; permissions?: string[] }
  ): Promise<{ valid: boolean; userId?: string; organizationId?: string; error?: string }> {
    // Extract token from Authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { valid: false, error: 'Missing or invalid authorization header' };
    }

    const token = authHeader.substring(7);
    
    // This would integrate with the actual authentication system
    // For now, return a mock response
    return { valid: true, userId: 'mock-user-id', organizationId: 'mock-org-id' };
  }

  // Get cached response
  private async getCache(request: APIRequest, config: { ttl: number; key?: string }): Promise<any> {
    const key = config.key || this.getCacheKey(request);
    const cached = this.cacheStore.get(key);
    
    if (cached && cached.expiresAt > Date.now()) {
      this.metrics.cacheHits++;
      return cached.data;
    }
    
    this.metrics.cacheMisses++;
    return null;
  }

  // Set cache
  private async setCache(request: APIRequest, data: unknown, config: { ttl: number; key?: string }): Promise<void> {
    const key = config.key || this.getCacheKey(request);
    this.cacheStore.set(key, {
      data,
      expiresAt: Date.now() + config.ttl * 1000,
    });
  }

  // Get cache key
  private getCacheKey(request: APIRequest): string {
    return createHash('md5')
      .update(`${request.method}:${request.url}:${JSON.stringify(request.query)}`)
      .digest('hex');
  }

  // Execute with timeout
  private async executeWithTimeout<T>(fn: () => Promise<T>, timeoutMs: number): Promise<T> {
    return Promise.race([
      fn(),
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeoutMs)),
    ]);
  }

  // Update metrics
  private updateMetrics(request: APIRequest, response: APIResponse, duration: number): void {
    this.metrics.successfulRequests++;
    this.metrics.averageResponseTime = (this.metrics.averageResponseTime * (this.metrics.totalRequests - 1) + duration) / this.metrics.totalRequests;
    
    const path = request.url.split('?')[0];
    this.metrics.requestsByPath[path] = (this.metrics.requestsByPath[path] || 0) + 1;
    this.metrics.requestsByStatus[response.status] = (this.metrics.requestsByStatus[response.status] || 0) + 1;
  }

  // Create response
  private createResponse(status: number, body: unknown, startTime: number): APIResponse {
    return {
      status,
      headers: { 'Content-Type': 'application/json' },
      body,
      timestamp: Date.now(),
      duration: Date.now() - startTime,
    };
  }

  // Cleanup expired data
  private cleanup(): void {
    const now = Date.now();
    
    // Cleanup rate limits
    for (const [key, data] of this.rateLimitStore.entries()) {
      if (data.resetTime <= now) {
        this.rateLimitStore.delete(key);
      }
    }
    
    // Cleanup cache
    for (const [key, data] of this.cacheStore.entries()) {
      if (data.expiresAt <= now) {
        this.cacheStore.delete(key);
      }
    }
  }

  // Get current metrics
  getMetrics(): GatewayMetrics {
    return { ...this.metrics };
  }

  // Reset metrics
  resetMetrics(): void {
    this.resetMetricsInternal();
  }

  // Clear all data
  clear(): void {
    this.routes.clear();
    this.middleware = [];
    this.globalMiddleware = [];
    this.rateLimitStore.clear();
    this.cacheStore.clear();
    this.requestStore.clear();
    this.activeConnections.clear();
    this.circuitBreakers.clear();
    this.apiKeys.clear();
    this.resetMetricsInternal();
  }

  private resetMetricsInternal(): void {
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      requestsByPath: {},
      requestsByStatus: {},
      activeConnections: 0,
      errorRate: 0,
      rateLimitHits: 0,
      cacheHits: 0,
      cacheMisses: 0,
      bandwidthInbound: 0,
      bandwidthOutbound: 0,
    };
  }

  /**
   * Destroy and cleanup resources
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
    this.resetMetrics();
    logger.info('APIGateway destroyed');
  }
}

// Global API Gateway instance
export const apiGateway = new APIGateway();

// Common middleware
export const corsMiddleware: GatewayMiddleware = async (request, response, next) => {
  // Set CORS headers
  response.headers = {
    ...response.headers,
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'Content-Type, Authorization',
    'access-control-max-age': '86400',
  };
  
  await next();
};

export const loggingMiddleware: GatewayMiddleware = async (request, response, next) => {
  const startTime = Date.now();
  
  logger.info(`${request.method} ${request.url} - Request started`);
  
  await next();
  
  const duration = Date.now() - startTime;
  logger.info(
    `[APIGateway] ${request.method} ${request.url} - ${response.status} (${duration}ms)`
  );
};

export const securityHeadersMiddleware: GatewayMiddleware = async (request, response, next) => {
  response.headers = {
    ...response.headers,
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'x-xss-protection': '1; mode=block',
    'strict-transport-security': 'max-age=31536000; includeSubDomains',
    'referrer-policy': 'strict-origin-when-cross-origin',
  };
  
  await next();
};

// Register default middleware
apiGateway.use(corsMiddleware);
apiGateway.use(loggingMiddleware);
apiGateway.use(securityHeadersMiddleware);
