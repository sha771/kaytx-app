import { trace } from '@opentelemetry/api';
import { logAudit } from '../lib/audit';
import { logger } from '../lib/production-logger';

/**
 * Production monitoring and alerting system
 */

export interface AlertRule {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
  condition: (metrics: any) => boolean;
  threshold?: number;
  window?: number; // minutes
  cooldown?: number; // minutes
  lastTriggered?: number;
}

export interface Alert {
  id: string;
  ruleId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details: any;
  timestamp: number;
  resolved?: boolean;
  resolvedAt?: number;
}

export class AlertManager {
  private rules: Map<string, AlertRule> = new Map();
  private activeAlerts: Map<string, Alert> = new Map();
  private alertHistory: Alert[] = [];
  private tracer = trace.getTracer('alert-manager');

  constructor() {
    this.initializeDefaultRules();
  }

  /**
   * Initialize default alert rules
   */
  private initializeDefaultRules() {
    // High error rate alert
    this.addRule({
      id: 'high-error-rate',
      name: 'High Error Rate',
      description: 'Error rate exceeds 5% over 5 minutes',
      severity: 'high',
      enabled: true,
      threshold: 0.05,
      window: 5,
      cooldown: 10,
      condition: (metrics) => {
        if (!metrics.errorRate || !metrics.requestCount) return false;
        return metrics.errorRate > 0.05 && metrics.requestCount > 10;
      }
    });

    // High response time alert
    this.addRule({
      id: 'high-response-time',
      name: 'High Response Time',
      description: 'Average response time exceeds 2 seconds',
      severity: 'medium',
      enabled: true,
      threshold: 2000,
      window: 5,
      cooldown: 15,
      condition: (metrics) => {
        return metrics.avgResponseTime > 2000;
      }
    });

    // Database connection issues
    this.addRule({
      id: 'database-connection-failure',
      name: 'Database Connection Failure',
      description: 'Database connection failure detected',
      severity: 'critical',
      enabled: true,
      condition: (metrics) => {
        return metrics.databaseStatus === 'unhealthy';
      }
    });

    // Memory usage alert
    this.addRule({
      id: 'high-memory-usage',
      name: 'High Memory Usage',
      description: 'Memory usage exceeds 90%',
      severity: 'high',
      enabled: true,
      threshold: 0.9,
      window: 2,
      cooldown: 5,
      condition: (metrics) => {
        return metrics.memoryUsage > 0.9;
      }
    });

    // CPU usage alert
    this.addRule({
      id: 'high-cpu-usage',
      name: 'High CPU Usage',
      description: 'CPU usage exceeds 80% for 5 minutes',
      severity: 'medium',
      enabled: true,
      threshold: 0.8,
      window: 5,
      cooldown: 10,
      condition: (metrics) => {
        return metrics.cpuUsage > 0.8;
      }
    });

    // Authentication failures alert
    this.addRule({
      id: 'high-auth-failures',
      name: 'High Authentication Failures',
      description: 'Authentication failure rate exceeds 20%',
      severity: 'high',
      enabled: true,
      threshold: 0.2,
      window: 5,
      cooldown: 10,
      condition: (metrics) => {
        if (!metrics.authFailureRate || !metrics.authAttempts) return false;
        return metrics.authFailureRate > 0.2 && metrics.authAttempts > 5;
      }
    });

    // Security events alert
    this.addRule({
      id: 'security-events',
      name: 'Security Events Detected',
      description: 'Multiple security events detected',
      severity: 'critical',
      enabled: true,
      threshold: 5,
      window: 1,
      cooldown: 5,
      condition: (metrics) => {
        return metrics.securityEventCount >= 5;
      }
    });
  }

  /**
   * Add new alert rule
   */
  addRule(rule: AlertRule) {
    this.rules.set(rule.id, rule);
  }

  /**
   * Remove alert rule
   */
  removeRule(ruleId: string) {
    this.rules.delete(ruleId);
  }

  /**
   * Enable/disable rule
   */
  toggleRule(ruleId: string, enabled: boolean) {
    const rule = this.rules.get(ruleId);
    if (rule) {
      rule.enabled = enabled;
    }
  }

  /**
   * Evaluate metrics against all rules
   */
  async evaluateMetrics(metrics: any) {
    const span = this.tracer.startSpan('evaluate-alerts');
    
    try {
      for (const rule of this.rules.values()) {
        if (!rule.enabled) continue;

        // Check cooldown
        if (rule.lastTriggered && rule.cooldown) {
          const timeSinceLastTrigger = (Date.now() - rule.lastTriggered) / 1000 / 60;
          if (timeSinceLastTrigger < rule.cooldown) {
            continue;
          }
        }

        // Evaluate condition
        if (rule.condition(metrics)) {
          await this.triggerAlert(rule, metrics);
        } else {
          // Check if we should resolve the alert
          this.resolveAlert(rule.id);
        }
      }
    } catch (error) {
      span.recordException(error as Error);
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Trigger an alert
   */
  private async triggerAlert(rule: AlertRule, metrics: any) {
    const alertId = `${rule.id}-${Date.now()}`;
    const alert: Alert = {
      id: alertId,
      ruleId: rule.id,
      severity: rule.severity,
      message: this.generateAlertMessage(rule, metrics),
      details: {
        rule: rule.name,
        metrics,
        threshold: rule.threshold,
        actual: this.getActualValue(rule, metrics),
      },
      timestamp: Date.now(),
    };

    this.activeAlerts.set(rule.id, alert);
    this.alertHistory.push(alert);

    // Update rule last triggered time
    rule.lastTriggered = Date.now();

    // Log alert
    await this.logAlert(alert);

    // Send notifications
    await this.sendNotifications(alert);
  }

  /**
   * Resolve an alert
   */
  private resolveAlert(ruleId: string) {
    const alert = this.activeAlerts.get(ruleId);
    if (alert) {
      alert.resolved = true;
      alert.resolvedAt = Date.now();
      this.activeAlerts.delete(ruleId);
      
      // Log resolution
      this.logAlertResolution(alert);
    }
  }

  /**
   * Generate alert message
   */
  private generateAlertMessage(rule: AlertRule, metrics: any): string {
    const actual = this.getActualValue(rule, metrics);
    const threshold = rule.threshold;
    
    switch (rule.id) {
      case 'high-error-rate':
        return `Error rate is ${(actual * 100).toFixed(2)}% (threshold: ${(threshold! * 100).toFixed(2)}%)`;
      case 'high-response-time':
        return `Average response time is ${actual}ms (threshold: ${threshold}ms)`;
      case 'database-connection-failure':
        return 'Database connection failure detected';
      case 'high-memory-usage':
        return `Memory usage is ${(actual * 100).toFixed(2)}% (threshold: ${(threshold! * 100).toFixed(2)}%)`;
      case 'high-cpu-usage':
        return `CPU usage is ${(actual * 100).toFixed(2)}% (threshold: ${(threshold! * 100).toFixed(2)}%)`;
      case 'high-auth-failures':
        return `Authentication failure rate is ${(actual * 100).toFixed(2)}% (threshold: ${(threshold! * 100).toFixed(2)}%)`;
      case 'security-events':
        return `${actual} security events detected (threshold: ${threshold})`;
      default:
        return rule.description;
    }
  }

  /**
   * Get actual value from metrics
   */
  private getActualValue(rule: AlertRule, metrics: any): number {
    switch (rule.id) {
      case 'high-error-rate':
        return metrics.errorRate || 0;
      case 'high-response-time':
        return metrics.avgResponseTime || 0;
      case 'high-memory-usage':
        return metrics.memoryUsage || 0;
      case 'high-cpu-usage':
        return metrics.cpuUsage || 0;
      case 'high-auth-failures':
        return metrics.authFailureRate || 0;
      case 'security-events':
        return metrics.securityEventCount || 0;
      default:
        return 0;
    }
  }

  /**
   * Log alert to audit system
   */
  private async logAlert(alert: Alert) {
    await logAudit({
      action: 'ALERT_TRIGGERED',
      resource: 'monitoring',
      resourceId: alert.id,
      metadata: {
        alertId: alert.id,
        ruleId: alert.ruleId,
        severity: alert.severity,
        message: alert.message,
        details: alert.details,
      },
      status: 'success',
      severity: alert.severity === 'critical' ? 'critical' : 
                alert.severity === 'high' ? 'error' : 'warning',
    });
  }

  /**
   * Log alert resolution
   */
  private logAlertResolution(alert: Alert) {
    logAudit({
      action: 'ALERT_RESOLVED',
      resource: 'monitoring',
      resourceId: alert.id,
      metadata: {
        alertId: alert.id,
        ruleId: alert.ruleId,
        duration: alert.resolvedAt! - alert.timestamp,
      },
      status: 'success',
      severity: 'info',
    });
  }

  /**
   * Send notifications for alerts
   */
  private async sendNotifications(alert: Alert) {
    // In production, this would integrate with your notification system
    // For now, we'll just log and potentially send webhook notifications
    
    logger.warn(`[ALERT] ${alert.severity.toUpperCase()}: ${alert.message}`);
    
    // Send webhook notification if configured
    if (process.env.ALERT_WEBHOOK_URL) {
      try {
        await fetch(process.env.ALERT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            alert,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        logger.error('Failed to send alert webhook:', error as Error);
      }
    }

    // Send email notification for critical alerts
    if (alert.severity === 'critical' && process.env.ALERT_EMAIL_TO) {
      // This would integrate with your email service
      logger.info(`[EMAIL ALERT] Critical alert: ${alert.message}`);
    }
  }

  /**
   * Get active alerts
   */
  getActiveAlerts(): Alert[] {
    return Array.from(this.activeAlerts.values());
  }

  /**
   * Get alert history
   */
  getAlertHistory(limit: number = 100): Alert[] {
    return this.alertHistory
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  /**
   * Get alert statistics
   */
  getAlertStats(): {
    total: number;
    active: number;
    bySeverity: Record<string, number>;
    recentTrend: Alert[];
  } {
    const bySeverity = this.alertHistory.reduce((acc, alert) => {
      acc[alert.severity] = (acc[alert.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: this.alertHistory.length,
      active: this.activeAlerts.size,
      bySeverity,
      recentTrend: this.alertHistory.slice(-10),
    };
  }

  /**
   * Test alert rule
   */
  async testRule(ruleId: string, testMetrics: any): Promise<{
    triggered: boolean;
    message?: string;
  }> {
    const rule = this.rules.get(ruleId);
    if (!rule) {
      throw new Error(`Rule ${ruleId} not found`);
    }

    const triggered = rule.condition(testMetrics);
    return {
      triggered,
      message: triggered ? this.generateAlertMessage(rule, testMetrics) : undefined,
    };
  }
}

// Singleton instance
export const alertManager = new AlertManager();

export default alertManager;
