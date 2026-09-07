/**
 * Health Checks & Liveness Probes
 * Kubernetes-compatible health endpoints
 * Used for load balancing, auto-restart, and readiness gates
 */

import { Hono } from 'hono';
import { monitoring } from '../../utils/monitoring';
import { logger } from './production-logger';

// Import db connection - handle gracefully if not available
let getDb: (() => any) | null = null;
try {
  const dbModule = require('../db/connection');
  getDb = dbModule.getDb;
} catch (e) {
  logger.warn('[Health] DB module not available');
}

// Import external services for health checks
let redis: any = null;
try {
  const redisModule = require('../services/redis-service');
  redis = redisModule.redis;
} catch (e) {
  logger.warn('[Health] Redis module not available');
}

let messageQueue: any = null;
try {
  const mqModule = require('../services/message-queue-service');
  messageQueue = mqModule.messageQueue;
} catch (e) {
  logger.warn('[Health] MessageQueue module not available');
}

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: number;
  uptime: number;
  checks: {
    database: { status: string; latency: number; error?: string };
    redis: { status: string; latency: number; error?: string };
    messageQueue: { status: string; latency: number; error?: string };
    memory: { status: string; usage: number; percentage: number };
    cpu: { status: string; usage: number };
    diskSpace: { status: string; available: number; percentage: number };
    externalApis: { status: string; services: Record<string, { status: string; latency: number; error?: string }> };
  };
  version: string;
  environment: string;
}

/**
 * Database health check
 */
async function checkDatabase(): Promise<{ status: string; latency: number; error?: string }> {
  const startTime = Date.now();
  try {
    if (!getDb) {
      return {
        status: 'warning',
        latency: 0,
        error: 'Database module not loaded',
      };
    }

    const db = getDb();
    if (!db) {
      return {
        status: 'warning',
        latency: 0,
        error: 'Using in-memory store (mock mode)',
      };
    }

    // Simple query to verify connection
    const result = await db.execute('SELECT 1');
    const latency = Date.now() - startTime;
    
    monitoring.trackPerformance('health_check_database', latency, 'ms');
    
    return {
      status: latency < 100 ? 'healthy' : latency < 500 ? 'degraded' : 'unhealthy',
      latency,
    };
  } catch (error) {
    const latency = Date.now() - startTime;
    monitoring.error('health_check', 'Database health check failed', error as Error, { latency });
    
    return {
      status: 'unhealthy',
      latency,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Redis health check
 */
async function checkRedis(): Promise<{ status: string; latency: number; error?: string }> {
  const startTime = Date.now();
  try {
    if (!redis) {
      return {
        status: 'warning',
        latency: 0,
        error: 'Redis not available',
      };
    }

    await redis.ping();
    const latency = Date.now() - startTime;
    
    monitoring.trackPerformance('health_check_redis', latency, 'ms');
    
    return {
      status: latency < 50 ? 'healthy' : latency < 200 ? 'degraded' : 'unhealthy',
      latency,
    };
  } catch (error) {
    const latency = Date.now() - startTime;
    monitoring.error('health_check', 'Redis health check failed', error as Error, { latency });
    
    return {
      status: 'unhealthy',
      latency,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Message Queue health check
 */
async function checkMessageQueue(): Promise<{ status: string; latency: number; error?: string }> {
  const startTime = Date.now();
  try {
    if (!messageQueue) {
      return {
        status: 'warning',
        latency: 0,
        error: 'MessageQueue not available',
      };
    }

    const connectionStatus = !!(messageQueue.connection && messageQueue.channel);
    const latency = Date.now() - startTime;
    
    monitoring.trackPerformance('health_check_message_queue', latency, 'ms');
    
    return {
      status: connectionStatus ? 'healthy' : 'unhealthy',
      latency,
    };
  } catch (error) {
    const latency = Date.now() - startTime;
    monitoring.error('health_check', 'MessageQueue health check failed', error as Error, { latency });
    
    return {
      status: 'unhealthy',
      latency,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * External API health checks
 */
async function checkExternalApis(): Promise<{ status: string; services: Record<string, { status: string; latency: number; error?: string }> }> {
  const services: Record<string, { status: string; latency: number; error?: string }> = {};
  
  // Check OpenAI API
  const openaiStart = Date.now();
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });
    const latency = Date.now() - openaiStart;
    services.openai = {
      status: response.ok ? 'healthy' : 'unhealthy',
      latency,
    };
    monitoring.trackPerformance('health_check_openai', latency, 'ms');
  } catch (error) {
    const latency = Date.now() - openaiStart;
    services.openai = {
      status: 'unhealthy',
      latency,
      error: error instanceof Error ? error.message : String(error),
    };
    monitoring.error('health_check', 'OpenAI health check failed', error as Error, { latency });
  }

  // Check Anthropic API
  const anthropicStart = Date.now();
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });
    const latency = Date.now() - anthropicStart;
    services.anthropic = {
      status: response.ok ? 'healthy' : 'unhealthy',
      latency,
    };
    monitoring.trackPerformance('health_check_anthropic', latency, 'ms');
  } catch (error) {
    const latency = Date.now() - anthropicStart;
    services.anthropic = {
      status: 'unhealthy',
      latency,
      error: error instanceof Error ? error.message : String(error),
    };
    monitoring.error('health_check', 'Anthropic health check failed', error as Error, { latency });
  }

  // Check Twilio API
  const twilioStart = Date.now();
  try {
    const response = await fetch('https://api.twilio.com/2010-04-01/Accounts.json', {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });
    const latency = Date.now() - twilioStart;
    services.twilio = {
      status: response.ok ? 'healthy' : 'unhealthy',
      latency,
    };
    monitoring.trackPerformance('health_check_twilio', latency, 'ms');
  } catch (error) {
    const latency = Date.now() - twilioStart;
    services.twilio = {
      status: 'unhealthy',
      latency,
      error: error instanceof Error ? error.message : String(error),
    };
    monitoring.error('health_check', 'Twilio health check failed', error as Error, { latency });
  }

  const overallStatus = Object.values(services).every(s => s.status === 'healthy') ? 'healthy' :
                       Object.values(services).some(s => s.status === 'healthy') ? 'degraded' : 'unhealthy';

  return {
    status: overallStatus,
    services,
  };
}

/**
 * Memory health check
 */
function checkMemory(): { status: string; usage: number; percentage: number } {
  const memUsage = process.memoryUsage();
  const heapUsedPercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;

  monitoring.trackPerformance('memory_usage_bytes', memUsage.heapUsed, 'bytes');
  monitoring.trackPerformance('memory_usage_percentage', heapUsedPercent, 'percent');

  return {
    status: heapUsedPercent < 80 ? 'healthy' : heapUsedPercent < 90 ? 'degraded' : 'unhealthy',
    usage: memUsage.heapUsed,
    percentage: heapUsedPercent,
  };
}

/**
 * CPU health check (simplified)
 */
function checkCpu(): { status: string; usage: number } {
  const cpuUsage = process.cpuUsage();
  // Very simplified - in production use more sophisticated CPU tracking
  const usage = (cpuUsage.user + cpuUsage.system) / 1000000;

  monitoring.trackPerformance('cpu_usage', usage, 'percent');

  return {
    status: usage < 75 ? 'healthy' : usage < 90 ? 'degraded' : 'unhealthy',
    usage,
  };
}

/**
 * Disk space health check
 */
function checkDiskSpace(): { status: string; available: number; percentage: number } {
  // Simplified disk space check
  // In production, use proper disk usage monitoring
  const available = 100; // GB (placeholder)
  const total = 500; // GB (placeholder)
  const percentage = (available / total) * 100;

  monitoring.trackPerformance('disk_available_gb', available, 'gb');
  monitoring.trackPerformance('disk_usage_percentage', 100 - percentage, 'percent');

  return {
    status: percentage > 20 ? 'healthy' : percentage > 10 ? 'degraded' : 'unhealthy',
    available,
    percentage,
  };
}

/**
 * Comprehensive health check
 */
export async function getHealthStatus(): Promise<HealthStatus> {
  const startTime = Date.now();
  
  try {
    const [dbHealth, redisHealth, mqHealth, memHealth, cpuHealth, diskHealth, apiHealth] = await Promise.all([
      checkDatabase(),
      checkRedis(),
      checkMessageQueue(),
      Promise.resolve(checkMemory()),
      Promise.resolve(checkCpu()),
      Promise.resolve(checkDiskSpace()),
      checkExternalApis(),
    ]);

    // Determine overall status
    const checks = [
      dbHealth.status,
      redisHealth.status,
      mqHealth.status,
      memHealth.status,
      cpuHealth.status,
      diskHealth.status,
      apiHealth.status,
    ];

    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    if (checks.some(s => s === 'unhealthy')) {
      overallStatus = 'unhealthy';
    } else if (checks.some(s => s === 'degraded' || s === 'warning')) {
      overallStatus = 'degraded';
    }

    const totalLatency = Date.now() - startTime;
    monitoring.trackPerformance('health_check_total', totalLatency, 'ms');

    const healthStatus = {
      status: overallStatus,
      timestamp: Date.now(),
      uptime: typeof process.uptime === 'function' ? process.uptime() : 0,
      checks: {
        database: dbHealth,
        redis: redisHealth,
        messageQueue: mqHealth,
        memory: memHealth,
        cpu: cpuHealth,
        diskSpace: diskHealth,
        externalApis: apiHealth,
      },
      version: process.env.DEPLOYMENT_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };

    // Log health status
    if (overallStatus !== 'healthy') {
      monitoring.warning('health_check', `Health status: ${overallStatus}`, { 
        status: overallStatus,
        checks: healthStatus.checks,
      });
    } else {
      monitoring.info('health_check', 'Health status: healthy', { 
        latency: totalLatency,
      });
    }

    return healthStatus;
  } catch (error) {
    monitoring.error('health_check', 'Health check failed', error as Error);
    
    return {
      status: 'unhealthy',
      timestamp: Date.now(),
      uptime: typeof process.uptime === 'function' ? process.uptime() : 0,
      checks: {
        database: { status: 'unhealthy', latency: 0, error: 'Health check failed' },
        redis: { status: 'unhealthy', latency: 0, error: 'Health check failed' },
        messageQueue: { status: 'unhealthy', latency: 0, error: 'Health check failed' },
        memory: { status: 'unhealthy', usage: 0, percentage: 0 },
        cpu: { status: 'unhealthy', usage: 0 },
        diskSpace: { status: 'unhealthy', available: 0, percentage: 0 },
        externalApis: { status: 'unhealthy', services: {} },
      },
      version: process.env.DEPLOYMENT_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };
  }
}

/**
 * Setup Kubernetes health endpoints
 */
export function setupHealthChecks(app: Hono) {
  // Liveness probe - is the app running?
  app.get('/health/live', (c) => {
    monitoring.info('health_check', 'Liveness probe accessed');
    return c.json({
      status: 'alive',
      timestamp: Date.now(),
      uptime: typeof process.uptime === 'function' ? process.uptime() : 0,
    }, 200);
  });

  // Readiness probe - is the app ready to serve traffic?
  app.get('/health/ready', async (c) => {
    const health = await getHealthStatus();
    const statusCode = health.status === 'healthy' ? 200 : 503;
    
    monitoring.info('health_check', 'Readiness probe accessed', { 
      status: health.status,
      statusCode,
    });
    
    return c.json(health, statusCode);
  });

  // Startup probe - used for slow-starting applications
  app.get('/health/startup', async (c) => {
    const health = await getHealthStatus();
    const statusCode = health.status !== 'unhealthy' ? 200 : 503;
    
    monitoring.info('health_check', 'Startup probe accessed', { 
      status: health.status,
      statusCode,
    });
    
    return c.json(health, statusCode);
  });

  // Detailed health endpoint for monitoring
  app.get('/health', async (c) => {
    const health = await getHealthStatus();
    const statusCode = health.status === 'healthy' ? 200 : health.status === 'degraded' ? 200 : 503;
    
    monitoring.info('health_check', 'Detailed health endpoint accessed', { 
      status: health.status,
      statusCode,
    });
    
    return c.json(health, statusCode);
  });

  // Simplified health endpoint (minimal response)
  app.get('/health/simple', async (c) => {
    const health = await getHealthStatus();
    const simpleResponse = {
      status: health.status,
      uptime: health.uptime,
      timestamp: health.timestamp,
    };
    
    monitoring.info('health_check', 'Simple health endpoint accessed', { 
      status: health.status,
    });
    
    return c.json(simpleResponse);
  });

  // Health check for specific service
  app.get('/health/:service', async (c) => {
    const service = c.req.param('service');
    const health = await getHealthStatus();
    
    let serviceHealth: any = null;
    
    switch (service) {
      case 'database':
        serviceHealth = health.checks.database;
        break;
      case 'redis':
        serviceHealth = health.checks.redis;
        break;
      case 'messagequeue':
      case 'message-queue':
        serviceHealth = health.checks.messageQueue;
        break;
      case 'memory':
        serviceHealth = health.checks.memory;
        break;
      case 'cpu':
        serviceHealth = health.checks.cpu;
        break;
      case 'disk':
      case 'disk-space':
        serviceHealth = health.checks.diskSpace;
        break;
      case 'apis':
      case 'external-apis':
        serviceHealth = health.checks.externalApis;
        break;
      default:
        return c.json({ error: 'Unknown service' }, 404);
    }
    
    monitoring.info('health_check', `Service health check: ${service}`, { 
      service,
      status: serviceHealth.status,
    });
    
    const statusCode = serviceHealth.status === 'healthy' ? 200 : 
                       serviceHealth.status === 'degraded' || serviceHealth.status === 'warning' ? 200 : 503;
    
    return c.json({
      service,
      ...serviceHealth,
      timestamp: health.timestamp,
    }, statusCode);
  });
}

export default {
  getHealthStatus,
  setupHealthChecks,
  checkDatabase,
  checkRedis,
  checkMessageQueue,
  checkExternalApis,
  checkMemory,
  checkCpu,
  checkDiskSpace,
};
