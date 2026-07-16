/**
 * Unified Alerting System
 * Consolidated alerting with multi-channel notifications, escalation, and deduplication
 */

import { randomUUID } from 'crypto';
import { monitoring } from '../../utils/monitoring';
import { errorsTotal } from './prometheus-metrics';
import { getHealthStatus } from './health-checks';
import { AIServiceLogger } from './ai-service-logger';
import { logger } from './production-logger';

export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum AlertStatus {
  OPEN = 'open',
  ACKNOWLEDGED = 'acknowledged',
  RESOLVED = 'resolved',
  SUPPRESSED = 'suppressed',
  FIRING = 'firing',
}

export enum AlertChannel {
  EMAIL = 'email',
  SLACK = 'slack',
  WEBHOOK = 'webhook',
  SMS = 'sms',
  PAGERDUTY = 'pagerduty',
}

export interface Alert {
  id: string;
  name: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  timestamp: Date;
  updatedAt: Date;
  source: string;
  labels: Record<string, string>;
  annotations: Record<string, string>;
  fingerprint: string;
  correlationId?: string;
  userId?: string;
  organizationId?: string;
  escalationLevel: number;
  maxEscalationLevel: number;
  channels: AlertChannel[];
  metadata?: Record<string, any>;
  message?: string;
  resolvedAt?: string;
}

export interface AlertRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  condition: string; // PromQL-like condition
  severity: AlertSeverity;
  channels: AlertChannel[];
  threshold: number;
  duration: number; // seconds
  cooldown: number; // seconds
  labels: Record<string, string>;
  annotations: Record<string, string>;
  escalationPolicy?: EscalationPolicy;
  suppressionRules?: SuppressionRule[];
}

export interface EscalationPolicy {
  levels: EscalationLevel[];
}

export interface EscalationLevel {
  level: number;
  timeout: number; // seconds
  channels: AlertChannel[];
  recipients: string[];
}

export interface SuppressionRule {
  id: string;
  name: string;
  condition: string;
  duration: number; // seconds
  labels: Record<string, string>;
}

export interface AlertNotification {
  alertId: string;
  channel: AlertChannel;
  recipient: string;
  status: 'pending' | 'sent' | 'failed';
  attempts: number;
  lastAttempt: Date;
  errorMessage?: string;
}

export interface AlertStatistics {
  total: number;
  byStatus: Record<AlertStatus, number>;
  bySeverity: Record<AlertSeverity, number>;
  byChannel: Record<AlertChannel, number>;
  meanTimeToResolution: number;
  activeAlerts: number;
}

class UnifiedAlertingSystem {
  private static instance: UnifiedAlertingSystem;
  private alerts: Map<string, Alert> = new Map();
  private rules: Map<string, AlertRule> = new Map();
  private notifications: Map<string, AlertNotification> = new Map();
  private evaluationIntervals: Map<string, NodeJS.Timeout> = new Map();
  private logger = AIServiceLogger.getInstance();

  private constructor() {
    this.initializeDefaultRules();
  }

  static getInstance(): UnifiedAlertingSystem {
    if (!UnifiedAlertingSystem.instance) {
      UnifiedAlertingSystem.instance = new UnifiedAlertingSystem();
    }
    return UnifiedAlertingSystem.instance;
  }

  private initializeDefaultRules(): void {
    const defaultRules: AlertRule[] = [
      {
        id: 'high-error-rate',
        name: 'High Error Rate',
        description: 'Error rate exceeds 5% for 5 minutes',
        enabled: true,
        condition: 'rate(errors_total[5m]) > 0.05',
        severity: AlertSeverity.HIGH,
        channels: [AlertChannel.EMAIL, AlertChannel.SLACK],
        threshold: 0.05,
        duration: 300,
        cooldown: 600,
        labels: { team: 'platform', service: 'all' },
        annotations: { description: 'High error rate detected' }
      },
      {
        id: 'high-response-time',
        name: 'High Response Time',
        description: 'P95 response time exceeds 2 seconds for 5 minutes',
        enabled: true,
        condition: 'histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2',
        severity: AlertSeverity.MEDIUM,
        channels: [AlertChannel.SLACK],
        threshold: 2,
        duration: 300,
        cooldown: 900,
        labels: { team: 'platform', service: 'api' },
        annotations: { description: 'High response time detected' }
      },
      {
        id: 'ai-service-failure',
        name: 'AI Service Failure',
        description: 'AI service success rate below 90% for 2 minutes',
        enabled: true,
        condition: 'rate(ai_requests_success_total[2m]) / rate(ai_requests_total[2m]) < 0.9',
        severity: AlertSeverity.CRITICAL,
        channels: [AlertChannel.EMAIL, AlertChannel.SLACK, AlertChannel.PAGERDUTY],
        threshold: 0.9,
        duration: 120,
        cooldown: 300,
        labels: { team: 'ai', service: 'ai-engine' },
        annotations: { description: 'AI service failure detected' }
      }
    ];

    defaultRules.forEach(rule => this.rules.set(rule.id, rule));
  }

  createAlert(alertData: Omit<Alert, 'id' | 'timestamp' | 'updatedAt' | 'escalationLevel' | 'maxEscalationLevel'>): Alert {
    const alert: Alert = {
      ...alertData,
      id: randomUUID(),
      timestamp: new Date(),
      updatedAt: new Date(),
      escalationLevel: 0,
      maxEscalationLevel: alertData.escalationPolicy?.levels.length || 3,
    };

    // Generate fingerprint for deduplication
    alert.fingerprint = this.generateFingerprint(alert);

    // Check for existing alerts with same fingerprint
    const existingAlert = this.findAlertByFingerprint(alert.fingerprint);
    if (existingAlert) {
      // Update existing alert instead of creating new one
      existingAlert.updatedAt = new Date();
      existingAlert.status = AlertStatus.FIRING;
      return existingAlert;
    }

    this.alerts.set(alert.id, alert);
    this.logger.logAlert('created', alert.id, alert.severity, alert.message);

    // Trigger notifications
    this.triggerNotifications(alert);

    return alert;
  }

  acknowledgeAlert(alertId: string): boolean {
    const alert = this.alerts.get(alertId);
    if (!alert) return false;

    alert.status = AlertStatus.ACKNOWLEDGED;
    alert.updatedAt = new Date();
    
    this.logger.logAlert('acknowledged', alertId, alert.severity, alert.message);
    return true;
  }

  resolveAlert(alertId: string): boolean {
    const alert = this.alerts.get(alertId);
    if (!alert) return false;

    alert.status = AlertStatus.RESOLVED;
    alert.resolvedAt = new Date().toISOString();
    alert.updatedAt = new Date();
    
    this.logger.logAlert('resolved', alertId, alert.severity, alert.message);
    return true;
  }

  suppressAlert(alertId: string, duration: number): boolean {
    const alert = this.alerts.get(alertId);
    if (!alert) return false;

    alert.status = AlertStatus.SUPPRESSED;
    alert.updatedAt = new Date();
    
    // Auto-unsuppress after duration
    setTimeout(() => {
      if (alert.status === AlertStatus.SUPPRESSED) {
        alert.status = AlertStatus.OPEN;
        alert.updatedAt = new Date();
      }
    }, duration * 1000);
    
    this.logger.logAlert('suppressed', alertId, alert.severity, `Suppressed for ${duration} seconds`);
    return true;
  }

  getAlerts(Filter?: {
    status?: AlertStatus;
    severity?: AlertSeverity;
    source?: string;
  }): Alert[] {
    let alerts = Array.from(this.alerts.values());

    if (Filter) {
      if (Filter.status) {
        alerts = alerts.filter(alert => alert.status === Filter.status);
      }
      if (Filter.severity) {
        alerts = alerts.filter(alert => alert.severity === Filter.severity);
      }
      if (Filter.source) {
        alerts = alerts.filter(alert => alert.source === Filter.source);
      }
    }

    return alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getAlert(alertId: string): Alert | undefined {
    return this.alerts.get(alertId);
  }

  getStatistics(): AlertStatistics {
    const alerts = Array.from(this.alerts.values());
    const activeAlerts = alerts.filter(a => a.status === AlertStatus.FIRING || a.status === AlertStatus.OPEN);
    
    const byStatus = Object.values(AlertStatus).reduce((acc, status) => {
      acc[status] = alerts.filter(a => a.status === status).length;
      return acc;
    }, {} as Record<AlertStatus, number>);

    const bySeverity = Object.values(AlertSeverity).reduce((acc, severity) => {
      acc[severity] = alerts.filter(a => a.severity === severity).length;
      return acc;
    }, {} as Record<AlertSeverity, number>);

    const byChannel = Object.values(AlertChannel).reduce((acc, channel) => {
      acc[channel] = alerts.filter(a => a.channels.includes(channel)).length;
      return acc;
    }, {} as Record<AlertChannel, number>);

    const resolvedAlerts = alerts.filter(a => a.status === AlertStatus.RESOLVED && a.resolvedAt);
    const meanTimeToResolution = resolvedAlerts.length > 0
      ? resolvedAlerts.reduce((sum, alert) => {
          const created = new Date(alert.timestamp).getTime();
          const resolved = new Date(alert.resolvedAt!).getTime();
          return sum + (resolved - created);
        }, 0) / resolvedAlerts.length / 1000 // Convert to seconds
      : 0;

    return {
      total: alerts.length,
      byStatus,
      bySeverity,
      byChannel,
      meanTimeToResolution,
      activeAlerts: activeAlerts.length,
    };
  }

  private generateFingerprint(alert: Omit<Alert, 'id' | 'timestamp' | 'updatedAt' | 'escalationLevel' | 'maxEscalationLevel' | 'fingerprint'>): string {
    const fingerprintData = {
      name: alert.name,
      source: alert.source,
      severity: alert.severity,
      labels: alert.labels,
    };
    return Buffer.from(JSON.stringify(fingerprintData)).toString('base64');
  }

  private findAlertByFingerprint(fingerprint: string): Alert | undefined {
    return Array.from(this.alerts.values()).find(alert => alert.fingerprint === fingerprint);
  }

  private async triggerNotifications(alert: Alert): Promise<void> {
    for (const channel of alert.channels) {
      const notification: AlertNotification = {
        alertId: alert.id,
        channel,
        recipient: this.getRecipientsForChannel(channel, alert),
        status: 'pending',
        attempts: 0,
        lastAttempt: new Date(),
      };

      this.notifications.set(`${alert.id}-${channel}`, notification);
      await this.sendNotification(notification, alert);
    }
  }

  private getRecipientsForChannel(channel: AlertChannel, alert: Alert): string {
    // In a real implementation, this would look up recipients based on alert labels and channel configuration
    switch (channel) {
      case AlertChannel.EMAIL:
        return process.env.ALERT_EMAIL_RECIPIENTS || 'alerts@company.com';
      case AlertChannel.SLACK:
        return process.env.SLACK_WEBHOOK_URL || '';
      case AlertChannel.PAGERDUTY:
        return process.env.PAGERDUTY_ROUTING_KEY || '';
      default:
        return '';
    }
  }

  private async sendNotification(notification: AlertNotification, alert: Alert): Promise<void> {
    try {
      notification.attempts++;
      notification.lastAttempt = new Date();

      // Mock notification sending - in reality, this would integrate with actual notification services
      await this.sendToChannel(notification.channel, notification.recipient, alert);
      
      notification.status = 'sent';
      this.logger.logAlert('notification_sent', alert.id, alert.severity, `Sent via ${notification.channel}`);
    } catch (error) {
      notification.status = 'failed';
      notification.errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.logAlert('notification_failed', alert.id, alert.severity, `Failed to send via ${notification.channel}: ${notification.errorMessage}`);
    }
  }

  private async sendToChannel(channel: AlertChannel, recipient: string, alert: Alert): Promise<void> {
    switch (channel) {
      case AlertChannel.EMAIL:
        // Integration with email service
        logger.info(`Email alert sent`, { recipient, alertName: alert.name, alertMessage: alert.message });
        break;
      case AlertChannel.SLACK:
        // Integration with Slack webhook
        logger.info(`Slack alert sent`, { alertName: alert.name, alertMessage: alert.message });
        break;
      case AlertChannel.PAGERDUTY:
        // Integration with PagerDuty
        logger.info(`PagerDuty alert sent`, { alertName: alert.name, alertMessage: alert.message });
        break;
      case AlertChannel.WEBHOOK:
        // Generic webhook
        logger.info(`Webhook alert sent`, { recipient, alertName: alert.name, alertMessage: alert.message });
        break;
      default:
        throw new Error(`Unsupported channel: ${channel}`);
    }
  }

  // Rule management
  addRule(rule: AlertRule): void {
    this.rules.set(rule.id, rule);
    if (rule.enabled) {
      this.startRuleEvaluation(rule);
    }
  }

  removeRule(ruleId: string): boolean {
    const rule = this.rules.get(ruleId);
    if (!rule) return false;

    this.stopRuleEvaluation(ruleId);
    this.rules.delete(ruleId);
    return true;
  }

  getRules(): AlertRule[] {
    return Array.from(this.rules.values());
  }

  private startRuleEvaluation(rule: AlertRule): void {
    const interval = setInterval(async () => {
      await this.evaluateRule(rule);
    }, rule.evaluationInterval * 1000);

    this.evaluationIntervals.set(rule.id, interval);
  }

  private stopRuleEvaluation(ruleId: string): void {
    const interval = this.evaluationIntervals.get(ruleId);
    if (interval) {
      clearInterval(interval);
      this.evaluationIntervals.delete(ruleId);
    }
  }

  private async evaluateRule(rule: AlertRule): Promise<void> {
    try {
      // Mock rule evaluation - in reality, this would query metrics and evaluate conditions
      const shouldTrigger = Math.random() < 0.1; // 10% chance for demo
      
      if (shouldTrigger) {
        this.createAlert({
          name: rule.name,
          description: rule.description,
          severity: rule.severity,
          status: AlertStatus.FIRING,
          source: 'rule-evaluation',
          labels: rule.labels,
          annotations: rule.annotations,
          channels: rule.channels,
          message: `Rule ${rule.name} triggered`,
          escalationPolicy: rule.escalationPolicy,
        });
      }
    } catch (error) {
      this.logger.logError({ id: 'rule_evaluation_failed', error: error instanceof Error ? error : new Error('Unknown error'), context: { ruleId: rule.id } });
    }
  }
}

// Export singleton instance
export const alertingSystem = UnifiedAlertingSystem.getInstance();

// Legacy exports for compatibility
export const alertManager = alertingSystem;
export const alertingService = alertingSystem;
