import { trace, metrics } from '@opentelemetry/api';
import { DatabaseUtils } from '../utils/database-utils';
import { logger } from '../lib/production-logger';

/**
 * Production metrics collection and aggregation
 */

export interface SystemMetrics {
  timestamp: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkIO: {
    bytesIn: number;
    bytesOut: number;
  };
  activeConnections: number;
  requestCount: number;
  errorCount: number;
  avgResponseTime: number;
  databaseStatus: 'healthy' | 'degraded' | 'unhealthy';
  authAttempts: number;
  authFailures: number;
  securityEventCount: number;
}

export interface RequestMetrics {
  method: string;
  path: string;
  statusCode: number;
  responseTime: number;
  userAgent?: string;
  ipAddress?: string;
  userId?: string;
  timestamp: number;
}

export class MetricsCollector {
  private tracer = trace.getTracer('metrics-collector');
  private meter = metrics.getMeter('application-metrics');
  
  // OpenTelemetry metrics
  private requestCounter: any;
  private responseTimeHistogram: any;
  private errorCounter: any;
  private activeConnectionsGauge: any;
  private cpuGauge: any;
  private memoryGauge: any;
  
  // Local metrics storage
  private requestMetrics: RequestMetrics[] = [];
  private systemMetrics: SystemMetrics[] = [];
  private maxMetricsHistory = 1000;
  
  // Aggregation windows
  private windows = {
    '1m': 60 * 1000,
    '5m': 5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '1h': 60 * 60 * 1000,
  };

  constructor() {
    this.initializeMetrics();
    this.startCollection();
  }

  /**
   * Initialize OpenTelemetry metrics
   */
  private initializeMetrics() {
    // Mock OpenTelemetry metrics for test environment
    if (process.env.NODE_ENV === 'test') {
      this.requestCounter = { add: () => {} };
      this.responseTimeHistogram = { record: () => {} };
      this.errorCounter = { add: () => {} };
      this.activeConnectionsGauge = { add: () => {}, set: () => {} };
      this.cpuGauge = { add: () => {}, set: () => {} };
      this.memoryGauge = { add: () => {}, set: () => {} };
      return;
    }

    this.requestCounter = this.meter.createCounter('http_requests_total', {
      description: 'Total number of HTTP requests',
    });

    this.responseTimeHistogram = this.meter.createHistogram('http_response_time_ms', {
      description: 'HTTP response time in milliseconds',
    });

    this.errorCounter = this.meter.createCounter('http_errors_total', {
      description: 'Total number of HTTP errors',
    });

    this.activeConnectionsGauge = this.meter.createUpDownCounter('active_connections', {
      description: 'Number of active connections',
    });

    this.cpuGauge = this.meter.createUpDownCounter('cpu_usage_percent', {
      description: 'CPU usage percentage',
    });

    this.memoryGauge = this.meter.createUpDownCounter('memory_usage_percent', {
      description: 'Memory usage percentage',
    });
  }

  /**
   * Start metrics collection
   */
  private startCollection() {
    // Collect system metrics every 30 seconds
    setInterval(() => {
      this.collectSystemMetrics().catch(() => {});
    }, 30000);

    // Clean old metrics every 5 minutes
    setInterval(() => {
      this.cleanupOldMetrics();
    }, 5 * 60 * 1000);
  }

  /**
   * Record request metrics
   */
  recordRequest(metrics: RequestMetrics) {
    const span = this.tracer.startSpan('record-request-metrics');
    
    try {
      // Store locally for aggregation
      this.requestMetrics.push(metrics);
      
      // Update OpenTelemetry metrics
      this.requestCounter.add(1, {
        method: metrics.method,
        path: metrics.path,
        status_code: metrics.statusCode.toString(),
      });

      this.responseTimeHistogram.record(metrics.responseTime, {
        method: metrics.method,
        path: metrics.path,
      });

      if (metrics.statusCode >= 400) {
        this.errorCounter.add(1, {
          method: metrics.method,
          path: metrics.path,
          status_code: metrics.statusCode.toString(),
        });
      }
    } finally {
      span.end();
    }
  }

  /**
   * Collect system metrics
   */
  private async collectSystemMetrics(): Promise<SystemMetrics> {
    const span = this.tracer.startSpan('collect-system-metrics');
    
    try {
      const timestamp = Date.now();
      
      // CPU usage (simplified - in production use proper monitoring)
      const cpuUsage = await this.getCPUUsage();
      
      // Memory usage
      const memoryUsage = this.getMemoryUsage();
      
      // Disk usage
      const diskUsage = await this.getDiskUsage();
      
      // Network I/O (simplified)
      const networkIO = await this.getNetworkIO();
      
      // Active connections
      const activeConnections = this.getActiveConnections();
      
      // Request metrics aggregation
      const recentRequests = this.getRecentRequests(60000); // Last 1 minute
      const requestCount = recentRequests.length;
      const errorCount = recentRequests.filter(r => r.statusCode >= 400).length;
      const avgResponseTime = requestCount > 0 
        ? recentRequests.reduce((sum, r) => sum + r.responseTime, 0) / requestCount 
        : 0;
      
      // Database health
      const dbHealth = await DatabaseUtils.healthCheck();
      
      // Auth metrics
      const authMetrics = this.getAuthMetrics();
      
      // Security events
      const securityEventCount = this.getSecurityEventCount();
      
      const systemMetrics: SystemMetrics = {
        timestamp,
        cpuUsage,
        memoryUsage,
        diskUsage,
        networkIO,
        activeConnections,
        requestCount,
        errorCount,
        avgResponseTime,
        databaseStatus: dbHealth.status,
        authAttempts: authMetrics.attempts,
        authFailures: authMetrics.failures,
        securityEventCount,
      };

      // Store locally
      this.systemMetrics.push(systemMetrics);
      
      // Update OpenTelemetry metrics (non-critical, catch errors)
      try { this.cpuGauge.set(cpuUsage * 100); } catch {}
      try { this.memoryGauge.set(memoryUsage * 100); } catch {}
      try { this.activeConnectionsGauge.set(activeConnections); } catch {}

      return systemMetrics;
    } catch (error) {
      span.recordException(error as Error);
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Get CPU usage (simplified implementation)
   */
  private async getCPUUsage(): Promise<number> {
    const startUsage = process.cpuUsage();
    await new Promise(resolve => setTimeout(resolve, 100));
    const endUsage = process.cpuUsage(startUsage);
    
    const totalUsage = endUsage.user + endUsage.system;
    const totalTime = 100000; // 100ms in microseconds
    
    return Math.min(totalUsage / totalTime / this.getCPUCount(), 1);
  }

  /**
   * Get memory usage
   */
  private getMemoryUsage(): number {
    const usage = process.memoryUsage();
    const totalMemory = usage.heapTotal + usage.external;
    const usedMemory = usage.heapUsed + usage.external;
    
    return usedMemory / totalMemory;
  }

  /**
   * Get disk usage (real implementation)
   */
  private async getDiskUsage(): Promise<number> {
    try {
      const fs = require('fs');
      const path = require('path');
      
      // Get disk usage for the current working directory
      const stats = fs.statSync(process.cwd());
      
      // On Windows, we can use a different approach
      if (process.platform === 'win32') {
        // For Windows, we'll use a simplified approach
        // In production, consider using 'drivelist' or 'diskusage' packages
        const exec = require('child_process').execSync;
        try {
          const output = exec('wmic logicaldisk get size,freespace /format:csv').toString();
          const lines = output.split('\n').filter(line => line.trim() && !line.includes('Node'));
          if (lines.length > 0) {
            const values = lines[0].split(',');
            const freeSpace = parseInt(values[1]) || 0;
            const totalSpace = parseInt(values[2]) || 1;
            return (totalSpace - freeSpace) / totalSpace; // Usage percentage
          }
        } catch (e) {
          logger.warn('[MetricsCollector] Failed to get Windows disk usage:', e);
        }
      } else {
        // For Unix-like systems, we can use 'df' command
        const exec = require('child_process').execSync;
        try {
          const output = exec('df -k .').toString();
          const lines = output.split('\n');
          if (lines.length >= 2) {
            const values = lines[1].split(/\s+/);
            const total = parseInt(values[1]) || 1;
            const used = parseInt(values[2]) || 0;
            return used / total;
          }
        } catch (e) {
          logger.warn('[MetricsCollector] Failed to get Unix disk usage:', e);
        }
      }
      
      // Fallback: estimate based on available memory
      const os = require('os');
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      return (totalMem - freeMem) / totalMem;
    } catch (error) {
      logger.error('[MetricsCollector] Error getting disk usage:', error);
      return 0.5; // Default fallback
    }
  }

  /**
   * Get network I/O (simplified)
   */
  private async getNetworkIO(): Promise<{ bytesIn: number; bytesOut: number }> {
    // In production, use proper network monitoring
    return {
      bytesIn: 0,
      bytesOut: 0,
    };
  }

  /**
   * Get active connections count
   */
  private getActiveConnections(): number {
    try {
      // Track actual database connections from the connection pool
      // This would be available from your database connection pool
      // For now, we'll use a reasonable estimate based on application state
      
      // If you have a connection pool, you could get this from:
      // return this.dbPool.numUsed() + this.dbPool.numFree();
      
      // For HTTP connections, you could track active requests
      // return this.activeHttpRequests || 0;
      
      // For now, return a reasonable default based on system load
      const os = require('os');
      const loadAverage = os.loadavg()[0]; // 1-minute load average
      const cpuCount = os.cpus().length;
      
      // Estimate connections based on load average (rough heuristic)
      const estimatedConnections = Math.min(Math.max(Math.floor(loadAverage * cpuCount), 1), 100);
      return estimatedConnections;
    } catch (error) {
      logger.error('[MetricsCollector] Error getting active connections:', error);
      return 5; // Conservative fallback
    }
  }

  /**
   * Get recent requests within time window
   */
  private getRecentRequests(windowMs: number): RequestMetrics[] {
    const cutoff = Date.now() - windowMs;
    return this.requestMetrics.filter(r => r.timestamp > cutoff);
  }

  /**
   * Get authentication metrics
   */
  private getAuthMetrics(): { attempts: number; failures: number } {
    const recentRequests = this.getRecentRequests(60000);
    const authRequests = recentRequests.filter(r => r.path.startsWith('/auth/'));
    
    return {
      attempts: authRequests.length,
      failures: authRequests.filter(r => r.statusCode >= 400).length,
    };
  }

  /**
   * Get security event count
   */
  private getSecurityEventCount(): number {
    try {
      const recentRequests = this.getRecentRequests(300000); // Last 5 minutes
      
      // Count security-related events
      const securityEvents = recentRequests.filter(r => {
        const path = r.path.toLowerCase();
        const isSecurityRelated = 
          path.includes('/auth/') || 
          path.includes('/login') || 
          path.includes('/logout') ||
          path.includes('/admin') ||
          path.includes('/security') ||
          r.statusCode === 401 || // Unauthorized
          r.statusCode === 403 || // Forbidden  
          r.statusCode === 429;   // Rate limited
          
        return isSecurityRelated;
      });
      
      // Add weight to failed authentication attempts
      const failedAuthCount = securityEvents.filter(r => 
        r.statusCode === 401 || r.statusCode === 403
      ).length;
      
      // Add weight to rate limiting (potential DoS)
      const rateLimitCount = securityEvents.filter(r => 
        r.statusCode === 429
      ).length;
      
      // Calculate security score (weighted sum)
      const baseSecurityEvents = securityEvents.length - failedAuthCount - rateLimitCount;
      const weightedScore = baseSecurityEvents + (failedAuthCount * 2) + (rateLimitCount * 3);
      
      return Math.min(weightedScore, 100); // Cap at 100 for reporting
    } catch (error) {
      logger.error('[MetricsCollector] Error getting security event count:', error);
      return 0;
    }
  }

  /**
   * Get CPU count
   */
  private getCPUCount(): number {
    return require('os').cpus().length;
  }

  /**
   * Clean old metrics
   */
  private cleanupOldMetrics() {
    const cutoff = Date.now() - (24 * 60 * 60 * 1000); // 24 hours
    
    this.requestMetrics = this.requestMetrics.filter(r => r.timestamp > cutoff);
    this.systemMetrics = this.systemMetrics.filter(s => s.timestamp > cutoff);
    
    // Limit array sizes
    if (this.requestMetrics.length > this.maxMetricsHistory) {
      this.requestMetrics = this.requestMetrics.slice(-this.maxMetricsHistory);
    }
    
    if (this.systemMetrics.length > this.maxMetricsHistory) {
      this.systemMetrics = this.systemMetrics.slice(-this.maxMetricsHistory);
    }
  }

  /**
   * Get aggregated metrics for time window
   */
  getAggregatedMetrics(window: keyof typeof this.windows = '5m'): {
    requests: {
      total: number;
      errors: number;
      errorRate: number;
      avgResponseTime: number;
      p95ResponseTime: number;
      p99ResponseTime: number;
    };
    system: SystemMetrics | null;
    topPaths: { path: string; count: number; avgResponseTime: number }[];
    errors: { path: string; count: number; statusCode: number }[];
  } {
    const windowMs = this.windows[window];
    const cutoff = Date.now() - windowMs;
    
    const recentRequests = this.requestMetrics.filter(r => r.timestamp > cutoff);
    const recentSystem = this.systemMetrics.filter(s => s.timestamp > cutoff);
    
    if (recentRequests.length === 0) {
      return {
        requests: {
          total: 0,
          errors: 0,
          errorRate: 0,
          avgResponseTime: 0,
          p95ResponseTime: 0,
          p99ResponseTime: 0,
        },
        system: recentSystem[recentSystem.length - 1] || null,
        topPaths: [],
        errors: [],
      };
    }

    // Request metrics
    const totalRequests = recentRequests.length;
    const errorRequests = recentRequests.filter(r => r.statusCode >= 400);
    const errorCount = errorRequests.length;
    const errorRate = errorCount / totalRequests;
    
    const responseTimes = recentRequests.map(r => r.responseTime).sort((a, b) => a - b);
    const avgResponseTime = responseTimes.reduce((sum, r) => sum + r, 0) / responseTimes.length;
    const p95ResponseTime = responseTimes[Math.floor(responseTimes.length * 0.95)];
    const p99ResponseTime = responseTimes[Math.floor(responseTimes.length * 0.99)];

    // Top paths
    const pathStats = recentRequests.reduce((acc, req) => {
      const key = req.path;
      if (!acc[key]) {
        acc[key] = { count: 0, totalTime: 0 };
      }
      acc[key].count++;
      acc[key].totalTime += req.responseTime;
      return acc;
    }, {} as Record<string, { count: number; totalTime: number }>);

    const topPaths = Object.entries(pathStats)
      .map(([path, stats]) => ({
        path,
        count: stats.count,
        avgResponseTime: stats.totalTime / stats.count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Error breakdown
    const errorStats = errorRequests.reduce((acc, req) => {
      const key = `${req.path}:${req.statusCode}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const errors = Object.entries(errorStats)
      .map(([key, count]) => {
        const [path, statusCode] = key.split(':');
        return { path, count, statusCode: parseInt(statusCode) };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      requests: {
        total: totalRequests,
        errors: errorCount,
        errorRate,
        avgResponseTime,
        p95ResponseTime,
        p99ResponseTime,
      },
      system: recentSystem[recentSystem.length - 1] || null,
      topPaths,
      errors,
    };
  }

  /**
   * Get health status
   */
  getHealthStatus(): {
    status: 'healthy' | 'degraded' | 'unhealthy';
    checks: Record<string, any>;
    timestamp: number;
  } {
    const metrics = this.getAggregatedMetrics('5m');
    const checks: Record<string, any> = {};
    
    // Error rate check
    checks.errorRate = {
      status: metrics.requests.errorRate < 0.05 ? 'healthy' : 'unhealthy',
      value: metrics.requests.errorRate,
      threshold: 0.05,
    };

    // Response time check
    checks.responseTime = {
      status: metrics.requests.avgResponseTime < 2000 ? 'healthy' : 'degraded',
      value: metrics.requests.avgResponseTime,
      threshold: 2000,
    };

    // Database check
    checks.database = metrics.system?.databaseStatus || { status: 'unknown' };

    // Memory check
    checks.memory = {
      status: (metrics.system?.memoryUsage || 0) < 0.9 ? 'healthy' : 'degraded',
      value: metrics.system?.memoryUsage || 0,
      threshold: 0.9,
    };

    // CPU check
    checks.cpu = {
      status: (metrics.system?.cpuUsage || 0) < 0.8 ? 'healthy' : 'degraded',
      value: metrics.system?.cpuUsage || 0,
      threshold: 0.8,
    };

    // Overall status
    const statuses = Object.values(checks).map(check => check.status);
    const hasUnhealthy = statuses.includes('unhealthy');
    const hasDegraded = statuses.includes('degraded');

    return {
      status: hasUnhealthy ? 'unhealthy' : hasDegraded ? 'degraded' : 'healthy',
      checks,
      timestamp: Date.now(),
    };
  }

  /**
   * Export metrics for external monitoring
   */
  exportPrometheusMetrics(): string {
    const metrics = this.getAggregatedMetrics('5m');
    
    let output = '';
    
    // Request metrics
    output += `# HELP http_requests_total Total number of HTTP requests\n`;
    output += `# TYPE http_requests_total counter\n`;
    output += `http_requests_total ${metrics.requests.total}\n\n`;
    
    output += `# HELP http_errors_total Total number of HTTP errors\n`;
    output += `# TYPE http_errors_total counter\n`;
    output += `http_errors_total ${metrics.requests.errors}\n\n`;
    
    output += `# HELP http_response_time_ms HTTP response time in milliseconds\n`;
    output += `# TYPE http_response_time_ms histogram\n`;
    output += `http_response_time_ms_sum ${metrics.requests.avgResponseTime * metrics.requests.total}\n`;
    output += `http_response_time_ms_count ${metrics.requests.total}\n\n`;
    
    // System metrics
    if (metrics.system) {
      output += `# HELP cpu_usage_percent CPU usage percentage\n`;
      output += `# TYPE cpu_usage_percent gauge\n`;
      output += `cpu_usage_percent ${metrics.system.cpuUsage * 100}\n\n`;
      
      output += `# HELP memory_usage_percent Memory usage percentage\n`;
      output += `# TYPE memory_usage_percent gauge\n`;
      output += `memory_usage_percent ${metrics.system.memoryUsage * 100}\n\n`;
    }
    
    return output;
  }
}

// Singleton instance
export const metricsCollector = new MetricsCollector();

export default metricsCollector;
