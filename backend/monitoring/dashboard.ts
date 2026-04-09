import { Context } from 'hono';
import { metricsCollector } from './metrics-collector';
import { alertManager } from './alerts';
import { APIUtils } from '../utils/api-utils';
import { escapeHtml, sanitizeObject } from '../lib/xss-sanitizer';
import { logger } from '../lib/production-logger';

/**
 * Monitoring dashboard endpoints and utilities
 */

export class MonitoringDashboard {
  /**
   * Get dashboard data
   */
  static async getDashboardData() {
    const now = Date.now();
    
    // Get metrics for different time windows
    const metrics1m = metricsCollector.getAggregatedMetrics('1m');
    const metrics5m = metricsCollector.getAggregatedMetrics('5m');
    const metrics15m = metricsCollector.getAggregatedMetrics('15m');
    const metrics1h = metricsCollector.getAggregatedMetrics('1h');
    
    // Get health status
    const healthStatus = metricsCollector.getHealthStatus();
    
    // Get active alerts
    const activeAlerts = alertManager.getActiveAlerts();
    
    // Get alert statistics
    const alertStats = alertManager.getAlertStats();
    
    // Get recent alert history
    const recentAlerts = alertManager.getAlertHistory(20);
    
    return {
      timestamp: now,
      health: healthStatus,
      alerts: {
        active: activeAlerts,
        stats: alertStats,
        recent: recentAlerts,
      },
      metrics: {
        '1m': metrics1m,
        '5m': metrics5m,
        '15m': metrics15m,
        '1h': metrics1h,
      },
    };
  }

  /**
   * Get metrics data for charts
   */
  static async getMetricsData(timeRange: string = '1h') {
    // This would typically query a time-series database
    // For now, we'll return aggregated metrics
    const metrics = metricsCollector.getAggregatedMetrics(timeRange as any);
    
    return {
      timeRange,
      data: {
        requests: {
          total: metrics.requests.total,
          errors: metrics.requests.errors,
          errorRate: metrics.requests.errorRate,
          avgResponseTime: metrics.requests.avgResponseTime,
          p95ResponseTime: metrics.requests.p95ResponseTime,
          p99ResponseTime: metrics.requests.p99ResponseTime,
        },
        system: metrics.system,
        topPaths: metrics.topPaths,
        errors: metrics.errors,
      },
      timestamp: Date.now(),
    };
  }

  /**
   * Get alert history with filtering
   */
  static async getAlertHistory(filters: {
    severity?: string;
    resolved?: boolean;
    limit?: number;
    offset?: number;
  } = {}) {
    let alerts = alertManager.getAlertHistory();
    
    // Apply filters
    if (filters.severity) {
      alerts = alerts.filter(alert => alert.severity === filters.severity);
    }
    
    if (filters.resolved !== undefined) {
      alerts = alerts.filter(alert => 
        filters.resolved ? alert.resolved : !alert.resolved
      );
    }
    
    // Apply pagination
    const limit = filters.limit || 50;
    const offset = filters.offset || 0;
    const paginatedAlerts = alerts.slice(offset, offset + limit);
    
    return {
      alerts: paginatedAlerts,
      total: alerts.length,
      limit,
      offset,
      hasMore: offset + limit < alerts.length,
    };
  }

  /**
   * Get system performance data
   */
  static async getPerformanceData() {
    const metrics5m = metricsCollector.getAggregatedMetrics('5m');
    const metrics15m = metricsCollector.getAggregatedMetrics('15m');
    const metrics1h = metricsCollector.getAggregatedMetrics('1h');
    
    return {
      timestamp: Date.now(),
      performance: {
        responseTime: {
          current: metrics5m.requests.avgResponseTime,
          trend5m: metrics5m.requests.avgResponseTime,
          trend15m: metrics15m.requests.avgResponseTime,
          trend1h: metrics1h.requests.avgResponseTime,
        },
        errorRate: {
          current: metrics5m.requests.errorRate,
          trend5m: metrics5m.requests.errorRate,
          trend15m: metrics15m.requests.errorRate,
          trend1h: metrics1h.requests.errorRate,
        },
        throughput: {
          current: metrics5m.requests.total / 5, // per minute
          trend5m: metrics5m.requests.total / 5,
          trend15m: metrics15m.requests.total / 15,
          trend1h: metrics1h.requests.total / 60,
        },
      },
      system: {
        cpu: metrics5m.system?.cpuUsage || 0,
        memory: metrics5m.system?.memoryUsage || 0,
        disk: metrics5m.system?.diskUsage || 0,
        activeConnections: metrics5m.system?.activeConnections || 0,
      },
    };
  }

  /**
   * Get top endpoints data
   */
  static async getTopEndpoints(limit: number = 10) {
    const metrics5m = metricsCollector.getAggregatedMetrics('5m');
    
    return {
      timestamp: Date.now(),
      endpoints: metrics5m.topPaths.slice(0, limit).map(endpoint => ({
        path: endpoint.path,
        requests: endpoint.count,
        avgResponseTime: endpoint.avgResponseTime,
        errorRate: this.calculateEndpointErrorRate(endpoint.path, metrics5m.errors),
      })),
    };
  }

  /**
   * Calculate error rate for specific endpoint
   */
  private static calculateEndpointErrorRate(path: string, errors: any[]): number {
    const endpointErrors = errors.filter(error => error.path === path);
    const totalErrors = endpointErrors.reduce((sum, error) => sum + error.count, 0);
    
    // This is a simplified calculation - in production you'd track total requests per endpoint
    return totalErrors > 0 ? 0.1 : 0; // Placeholder
  }

  /**
   * Get security metrics
   */
  static async getSecurityMetrics() {
    const metrics5m = metricsCollector.getAggregatedMetrics('5m');
    const activeAlerts = alertManager.getActiveAlerts();
    const securityAlerts = activeAlerts.filter(alert => 
      alert.ruleId.includes('security') || alert.ruleId.includes('auth')
    );
    
    return {
      timestamp: Date.now(),
      security: {
        authAttempts: metrics5m.system?.authAttempts || 0,
        authFailures: metrics5m.system?.authFailures || 0,
        authFailureRate: metrics5m.system?.authAttempts > 0 
          ? (metrics5m.system.authFailures / metrics5m.system.authAttempts)
          : 0,
        securityEvents: metrics5m.system?.securityEventCount || 0,
        activeSecurityAlerts: securityAlerts.length,
      },
      recentSecurityAlerts: securityAlerts.slice(-5),
    };
  }

  /**
   * Generate HTML dashboard
   */
  static generateDashboardHTML(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monitoring Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .card h3 { margin-top: 0; color: #333; }
        .status-healthy { color: #28a745; }
        .status-degraded { color: #ffc107; }
        .status-unhealthy { color: #dc3545; }
        .metric { display: flex; justify-content: space-between; margin: 10px 0; }
        .metric-value { font-weight: bold; }
        .alert { padding: 10px; margin: 5px 0; border-radius: 4px; }
        .alert-critical { background: #f8d7da; border: 1px solid #f5c6cb; }
        .alert-high { background: #fff3cd; border: 1px solid #ffeaa7; }
        .alert-medium { background: #d1ecf1; border: 1px solid #bee5eb; }
        .chart-container { position: relative; height: 300px; }
        .refresh-btn { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
        .refresh-btn:hover { background: #0056b3; }
    </style>
</head>
<body>
    <h1>System Monitoring Dashboard</h1>
    <button class="refresh-btn" onclick="refreshDashboard()">Refresh</button>
    
    <div class="dashboard">
        <!-- Health Status Card -->
        <div class="card">
            <h3>System Health</h3>
            <div id="health-status">Loading...</div>
        </div>
        
        <!-- Active Alerts Card -->
        <div class="card">
            <h3>Active Alerts</h3>
            <div id="active-alerts">Loading...</div>
        </div>
        
        <!-- Request Metrics Card -->
        <div class="card">
            <h3>Request Metrics (5m)</h3>
            <div id="request-metrics">Loading...</div>
        </div>
        
        <!-- System Metrics Card -->
        <div class="card">
            <h3>System Metrics</h3>
            <div id="system-metrics">Loading...</div>
        </div>
        
        <!-- Response Time Chart -->
        <div class="card">
            <h3>Response Time Trend</h3>
            <div class="chart-container">
                <canvas id="responseTimeChart"></canvas>
            </div>
        </div>
        
        <!-- Error Rate Chart -->
        <div class="card">
            <h3>Error Rate Trend</h3>
            <div class="chart-container">
                <canvas id="errorRateChart"></canvas>
            </div>
        </div>
        
        <!-- Top Endpoints -->
        <div class="card">
            <h3>Top Endpoints</h3>
            <div id="top-endpoints">Loading...</div>
        </div>
        
        <!-- Security Metrics -->
        <div class="card">
            <h3>Security Metrics</h3>
            <div id="security-metrics">Loading...</div>
        </div>
    </div>

    <script>
        // XSS Protection - Escape HTML entities
        function escapeHtml(text) {
            if (typeof text !== 'string') {
                return '';
            }
            const htmlEntities = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '/': '&#x2F;'
            };
            return text.replace(/[&<>"'\/]/g, (char) => htmlEntities[char] || char);
        }

        let responseTimeChart, errorRateChart;
        
        async function refreshDashboard() {
            try {
                const response = await fetch('/api/monitoring/dashboard');
                const data = await response.json();
                
                updateHealthStatus(data.health);
                updateActiveAlerts(data.alerts.active);
                updateRequestMetrics(data.metrics['5m'].requests);
                updateSystemMetrics(data.metrics['5m'].system);
                updateTopEndpoints(data.metrics['5m'].topPaths);
                updateSecurityMetrics(await getSecurityMetrics());
                updateCharts(data);
            } catch (error) {
                logger.error('Failed to refresh dashboard:', error as Error);
            }
        }
        
        function updateHealthStatus(health: any) {
            const container = document.getElementById('health-status');
            if (!container) return;
            const safeHealth = JSON.parse(JSON.stringify(health));
            const statusValue = safeHealth?.status || 'unknown';
            const statusClass = 'status-' + escapeHtml(statusValue);
            const upperStatus = escapeHtml(statusValue.toUpperCase());
            
            let html = '<div class="' + statusClass + '">';
            html += '<strong>Overall Status:</strong> ' + upperStatus;
            html += '</div>';

            if (safeHealth.checks) {
                Object.entries(safeHealth.checks).forEach(([name, check]) => {
                    const checkStatus = check.status || 'unknown';
                    html += '<div class="metric">';
                    html += '<span>' + escapeHtml(name) + ':</span>';
                    html += '<span class="metric-value status-' + escapeHtml(checkStatus) + '">' + escapeHtml(checkStatus) + '</span>';
                    html += '</div>';
                });
            }

            container.innerHTML = html;
        }
        
        function updateActiveAlerts(alerts: any[]) {
            const container = document.getElementById('active-alerts');
            if (!container) return;

            if (alerts.length === 0) {
                container.innerHTML = '<div class="status-healthy">No active alerts</div>';
                return;
            }

            let html = '';
            alerts.forEach((alert: any) => {
                const safeSeverity = escapeHtml(alert.severity || 'unknown');
                const safeMessage = escapeHtml(alert.message || '');
                const safeDate = escapeHtml(new Date(alert.timestamp).toLocaleString());
                html += '<div class="alert alert-' + safeSeverity + '">';
                html += '<strong>' + safeSeverity.toUpperCase() + ':</strong> ' + safeMessage;
                html += '<br><small>' + safeDate + '</small>';
                html += '</div>';
            });

            container.innerHTML = html;
        }
        
        function updateRequestMetrics(requests) {
            const container = document.getElementById('request-metrics');

            const safeRequests = {
                total: Number(requests.total) || 0,
                errors: Number(requests.errors) || 0,
                errorRate: Number(requests.errorRate) || 0,
                avgResponseTime: Number(requests.avgResponseTime) || 0,
                p95ResponseTime: Number(requests.p95ResponseTime) || 0,
            };

            const html = '<div class="metric">' +
                '<span>Total Requests:</span>' +
                '<span class="metric-value">' + safeRequests.total + '</span>' +
                '</div>' +
                '<div class="metric">' +
                '<span>Errors:</span>' +
                '<span class="metric-value">' + safeRequests.errors + '</span>' +
                '</div>' +
                '<div class="metric">' +
                '<span>Error Rate:</span>' +
                '<span class="metric-value">' + (safeRequests.errorRate * 100).toFixed(2) + '%</span>' +
                '</div>' +
                '<div class="metric">' +
                '<span>Avg Response Time:</span>' +
                '<span class="metric-value">' + safeRequests.avgResponseTime.toFixed(2) + 'ms</span>' +
                '</div>' +
                '<div class="metric">' +
                '<span>P95 Response Time:</span>' +
                '<span class="metric-value">' + safeRequests.p95ResponseTime.toFixed(2) + 'ms</span>' +
                '</div>';

            container.innerHTML = html;
        }
        
        function updateSystemMetrics(system) {
            const container = document.getElementById('system-metrics');

            if (!system) {
                container.innerHTML = '<div>No system data available</div>';
                return;
            }

            const safeSystem = {
                cpuUsage: Number(system.cpuUsage) || 0,
                memoryUsage: Number(system.memoryUsage) || 0,
                activeConnections: Number(system.activeConnections) || 0,
                databaseStatus: escapeHtml(system.databaseStatus || 'unknown'),
            };

            const html = '<div class="metric">' +
                '<span>CPU Usage:</span>' +
                '<span class="metric-value">' + (safeSystem.cpuUsage * 100).toFixed(2) + '%</span>' +
                '</div>' +
                '<div class="metric">' +
                '<span>Memory Usage:</span>' +
                '<span class="metric-value">' + (safeSystem.memoryUsage * 100).toFixed(2) + '%</span>' +
                '</div>' +
                '<div class="metric">' +
                '<span>Active Connections:</span>' +
                '<span class="metric-value">' + safeSystem.activeConnections + '</span>' +
                '</div>' +
                '<div class="metric">' +
                '<span>Database Status:</span>' +
                '<span class="metric-value status-' + safeSystem.databaseStatus + '">' + safeSystem.databaseStatus + '</span>' +
                '</div>';

            container.innerHTML = html;
        }
        
        function updateTopEndpoints(endpoints) {
            const container = document.getElementById('top-endpoints');

            let html = '';
            if (Array.isArray(endpoints)) {
                endpoints.forEach((endpoint: any) => {
                    const safePath = escapeHtml(endpoint.path || '/');
                    const safeCount = Number(endpoint.count) || 0;
                    html += '<div class="metric">';
                    html += '<span>' + safePath + '</span>';
                    html += '<span class="metric-value">' + safeCount + ' reqs</span>';
                    html += '</div>';
                });
            }

            container.innerHTML = html || '<div>No endpoint data available</div>';
        }
        
        async function getSecurityMetrics() {
            const response = await fetch('/api/monitoring/security');
            return await response.json();
        }
        
        function updateSecurityMetrics(security) {
            const container = document.getElementById('security-metrics');

            if (!security || !security.security) {
                container.innerHTML = '<div>No security data available</div>';
                return;
            }

            const safeSecurity = {
                authAttempts: Number(security.security.authAttempts) || 0,
                authFailures: Number(security.security.authFailures) || 0,
                authFailureRate: Number(security.security.authFailureRate) || 0,
                securityEvents: Number(security.security.securityEvents) || 0,
            };

            const html = '<div class="metric">' +
                '<span>Auth Attempts:</span>' +
                '<span class="metric-value">' + safeSecurity.authAttempts + '</span>' +
                '</div>' +
                '<div class="metric">' +
                '<span>Auth Failures:</span>' +
                '<span class="metric-value">' + safeSecurity.authFailures + '</span>' +
                '</div>' +
                '<div class="metric">' +
                '<span>Auth Failure Rate:</span>' +
                '<span class="metric-value">' + (safeSecurity.authFailureRate * 100).toFixed(2) + '%</span>' +
                '</div>' +
                '<div class="metric">' +
                '<span>Security Events:</span>' +
                '<span class="metric-value">' + safeSecurity.securityEvents + '</span>' +
                '</div>';

            container.innerHTML = html;
        }
        
        function updateCharts(data) {
            // Update charts with trend data
            // This would typically show time-series data
            // For now, we'll create simple charts with current data
        }
        
        // Initialize dashboard
        refreshDashboard();
        
        // Auto-refresh every 30 seconds
        setInterval(refreshDashboard, 30000);
    </script>
</body>
</html>`;
  }
}

export default MonitoringDashboard;
