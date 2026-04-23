/**
 * ✅ ENTERPRISE HEALTH CHECK ENDPOINT
 * Full system diagnostics for production readiness
 */

import { db } from '../db/connection';
import { users } from '../db/drizzle-schema';

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  environment: string;
  services: {
    database: ServiceHealth;
    redis: ServiceHealth;
    rabbitmq: ServiceHealth;
    prometheus: ServiceHealth;
    tracing: ServiceHealth;
  };
  metrics: {
    uptime: number;
    memory: {
      heapUsed: number;
      heapTotal: number;
    };
    requests: {
      total: number;
      successRate: number;
    };
  };
  checks: {
    readiness: boolean;
    liveness: boolean;
    startup: boolean;
  };
}

export interface ServiceHealth {
  status: 'operational' | 'degraded' | 'down';
  latency: number;
  error?: string;
}

export class HealthChecker {
  private startTime = Date.now();
  private requestCount = 0;
  private failureCount = 0;

  async performHealthCheck(): Promise<HealthCheckResult> {
    const results = await Promise.allSettled([
      this.checkDatabase(),
      this.checkRedis(),
      this.checkRabbitMQ(),
      this.checkPrometheus(),
      this.checkTracing(),
    ]);

    const services = {
      database: results[0].status === 'fulfilled' ? results[0].value : { status: 'down' as const, latency: 0 },
      redis: results[1].status === 'fulfilled' ? results[1].value : { status: 'down' as const, latency: 0 },
      rabbitmq: results[2].status === 'fulfilled' ? results[2].value : { status: 'down' as const, latency: 0 },
      prometheus: results[3].status === 'fulfilled' ? results[3].value : { status: 'down' as const, latency: 0 },
      tracing: results[4].status === 'fulfilled' ? results[4].value : { status: 'down' as const, latency: 0 },
    };

    const overallStatus = this.calculateOverallStatus(services);
    const successRate = this.requestCount > 0 ? (this.requestCount - this.failureCount) / this.requestCount : 1;

    return {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'production',
      services,
      metrics: {
        uptime: Date.now() - this.startTime,
        memory: {
          heapUsed: process.memoryUsage().heapUsed,
          heapTotal: process.memoryUsage().heapTotal,
        },
        requests: {
          total: this.requestCount,
          successRate,
        },
      },
      checks: {
        readiness: overallStatus !== 'unhealthy',
        liveness: true,
        startup: overallStatus !== 'unhealthy',
      },
    };
  }

  private async checkDatabase(): Promise<ServiceHealth> {
    const start = Date.now();
    try {
      await db.select().from(users).limit(1);
      return {
        status: 'operational',
        latency: Date.now() - start,
      };
    } catch (error) {
      return {
        status: 'down',
        latency: Date.now() - start,
        error: String(error),
      };
    }
  }

  private async checkRedis(): Promise<ServiceHealth> {
    const start = Date.now();
    try {
      // Check if Redis is available via environment variables
      const redisUrl = process.env.REDIS_URL || process.env.REDIS_HOST;
      if (!redisUrl) {
        return {
          status: 'down',
          latency: Date.now() - start,
          error: 'Redis not configured',
        };
      }

      // Try to connect to Redis and ping
      const redis = require('redis');
      const client = redis.createClient({
        url: redisUrl,
        socket: {
          connectTimeout: 5000,
        },
      });

      await client.connect();
      const pong = await client.ping();
      await client.disconnect();

      if (pong === 'PONG') {
        return {
          status: 'operational',
          latency: Date.now() - start,
        };
      } else {
        return {
          status: 'degraded',
          latency: Date.now() - start,
          error: 'Unexpected Redis response',
        };
      }
    } catch (error) {
      return {
        status: 'down',
        latency: Date.now() - start,
        error: String(error),
      };
    }
  }

  private async checkRabbitMQ(): Promise<ServiceHealth> {
    const start = Date.now();
    try {
      // Check if RabbitMQ is configured
      const rabbitmqUrl = process.env.RABBITMQ_URL || process.env.AMQP_URL;
      if (!rabbitmqUrl) {
        return {
          status: 'down',
          latency: Date.now() - start,
          error: 'RabbitMQ not configured',
        };
      }

      // Try to connect to RabbitMQ management API
      const managementUrl = process.env.RABBITMQ_MANAGEMENT_URL || 'http://localhost:15672';
      const response = await fetch(`${managementUrl}/api/overview`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.RABBITMQ_USER || 'guest'}:${process.env.RABBITMQ_PASS || 'guest'}`).toString('base64')}`,
        },
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.management_version) {
          return {
            status: 'operational',
            latency: Date.now() - start,
          };
        }
      }

      return {
        status: 'degraded',
        latency: Date.now() - start,
        error: 'RabbitMQ management API not responding correctly',
      };
    } catch (error) {
      return {
        status: 'down',
        latency: Date.now() - start,
        error: String(error),
      };
    }
  }

  private async checkPrometheus(): Promise<ServiceHealth> {
    const start = Date.now();
    try {
      const response = await fetch('http://localhost:9090/-/healthy');
      const status = response.ok ? 'operational' : 'degraded';
      return {
        status,
        latency: Date.now() - start,
      };
    } catch {
      return {
        status: 'down',
        latency: Date.now() - start,
      };
    }
  }

  private async checkTracing(): Promise<ServiceHealth> {
    const start = Date.now();
    try {
      // Check if Jaeger is configured
      const jaegerEndpoint = process.env.JAEGER_ENDPOINT || process.env.JAEGER_AGENT_HOST;
      if (!jaegerEndpoint) {
        return {
          status: 'down',
          latency: Date.now() - start,
          error: 'Tracing not configured',
        };
      }

      // Try to connect to Jaeger UI or API
      const jaegerUrl = process.env.JAEGER_UI_URL || `http://${jaegerEndpoint.replace(':14250', ':16686')}`;
      const response = await fetch(`${jaegerUrl}/api/services`, {
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        const services = await response.json();
        if (Array.isArray(services) && services.length >= 0) {
          return {
            status: 'operational',
            latency: Date.now() - start,
          };
        }
      }

      return {
        status: 'degraded',
        latency: Date.now() - start,
        error: 'Jaeger API not responding correctly',
      };
    } catch (error) {
      return {
        status: 'down',
        latency: Date.now() - start,
        error: String(error),
      };
    }
  }

  private calculateOverallStatus(
    services: Record<string, ServiceHealth>
  ): 'healthy' | 'degraded' | 'unhealthy' {
    const statuses = Object.values(services).map(s => s.status);
    const downCount = statuses.filter(s => s === 'down').length;
    const degradedCount = statuses.filter(s => s === 'degraded').length;

    if (downCount > 2) return 'unhealthy';
    if (downCount > 0 || degradedCount > 1) return 'degraded';
    return 'healthy';
  }

  recordRequest(success: boolean): void {
    this.requestCount++;
    if (!success) this.failureCount++;
  }
}

export const healthChecker = new HealthChecker();
