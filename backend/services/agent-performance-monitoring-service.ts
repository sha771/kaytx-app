/**
 * Agent Performance Monitoring Service
 * Real-time performance monitoring with alerts for AI agents
 */

import { eq, and, or, gte, lte, desc, asc, sql, inArray } from 'drizzle-orm';
import { db } from '../db/connection';
import {
  agentMetrics,
  agentAlerts,
  performanceThresholds,
  costTracking,
  agentSessions,
  type AgentMetric,
  type AgentAlert,
  type PerformanceThreshold,
  type CostTracking,
  type AgentSession,
} from '../db/drizzle-schema';
import { logAudit } from '../lib/audit';
import { notificationService } from './notification-service';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('AgentPerformanceMonitoring');

// Metric Types
export type MetricType =
  | 'response-time'
  | 'accuracy'
  | 'throughput'
  | 'availability'
  | 'error-rate'
  | 'cost-per-task'
  | 'customer-satisfaction'
  | 'task-completion'
  | 'cpu-usage'
  | 'memory-usage'
  | 'token-usage'
  | 'api-calls';

export type AlertSeverity = 'info' | 'warning' | 'critical' | 'emergency';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved' | 'suppressed';
export type AggregationPeriod = 'minute' | 'hour' | 'day' | 'week' | 'month';

// Metric Data Point
export interface MetricDataPoint {
  timestamp: Date;
  value: number;
  unit: string;
  metadata?: Record<string, any>;
}

// Performance Metric
export interface PerformanceMetric {
  id: string;
  agentId: string;
  teamId?: string;
  type: MetricType;
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
  period: AggregationPeriod;
  dimensions?: {
    taskType?: string;
    model?: string;
    endpoint?: string;
    customerId?: string;
  };
}

// Alert Rule
export interface AlertRule {
  id: string;
  name: string;
  description?: string;
  metricType: MetricType;
  condition: {
    operator: 'greater-than' | 'less-than' | 'equals' | 'not-equals' | 'in-range' | 'out-of-range';
    threshold: number;
    thresholdMax?: number; // For range conditions
    duration: number; // Minutes the condition must persist
  };
  severity: AlertSeverity;
  notifications: {
    channels: ('email' | 'sms' | 'push' | 'slack' | 'pagerduty' | 'webhook')[];
    recipients: string[];
    template: string;
    cooldown: number; // Minutes between alerts
  };
  autoActions?: {
    scaleUp?: boolean;
    scaleDown?: boolean;
    restart?: boolean;
    fallback?: boolean;
    notifyManager?: boolean;
  };
  isEnabled: boolean;
  timeWindow?: {
    startHour: number;
    endHour: number;
    daysOfWeek: number[];
  };
}

// Alert Instance
export interface AlertInstance {
  id: string;
  ruleId: string;
  ruleName: string;
  agentId: string;
  severity: AlertSeverity;
  status: AlertStatus;
  message: string;
  metricValue: number;
  threshold: number;
  startedAt: Date;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
  resolvedAt?: Date;
  resolvedBy?: string;
  resolution?: string;
  correlationId?: string;
  relatedAlerts?: string[];
}

// Performance Dashboard
export interface PerformanceDashboard {
  agentId: string;
  period: { start: Date; end: Date };
  summary: {
    totalTasks: number;
    successfulTasks: number;
    failedTasks: number;
    averageResponseTime: number;
    availability: number;
    accuracy: number;
    costPerTask: number;
    customerSatisfaction: number;
  };
  trends: {
    responseTime: MetricDataPoint[];
    throughput: MetricDataPoint[];
    errorRate: MetricDataPoint[];
    cost: MetricDataPoint[];
  };
  alerts: AlertInstance[];
  topIssues: {
    type: string;
    count: number;
    impact: string;
  }[];
  recommendations: string[];
}

// Cost Breakdown
export interface CostBreakdown {
  agentId: string;
  period: { start: Date; end: Date };
  totalCost: number;
  currency: string;
  breakdown: {
    modelTokens: number;
    apiCalls: number;
    computeTime: number;
    storage: number;
    dataTransfer: number;
    other: number;
  };
  byTaskType: {
    taskType: string;
    cost: number;
    count: number;
  }[];
  byModel: {
    model: string;
    tokens: number;
    cost: number;
  }[];
  trend: MetricDataPoint[];
  budget: {
    allocated: number;
    used: number;
    remaining: number;
    projected: number;
  };
}

// Threshold Config
export interface ThresholdConfig {
  responseTime: { warning: number; critical: number; unit: 'ms' };
  accuracy: { warning: number; critical: number; unit: 'percent' };
  errorRate: { warning: number; critical: number; unit: 'percent' };
  availability: { warning: number; critical: number; unit: 'percent' };
  throughput: { warning: number; critical: number; unit: 'rpm' };
  costPerTask: { warning: number; critical: number; unit: 'USD' };
  cpuUsage: { warning: number; critical: number; unit: 'percent' };
  memoryUsage: { warning: number; critical: number; unit: 'percent' };
}

class AgentPerformanceMonitoringService {
  private alertRules: Map<string, AlertRule> = new Map();
  private activeAlerts: Map<string, AlertInstance> = new Map();
  private metricBuffers: Map<string, MetricDataPoint[]> = new Map();
  private readonly BUFFER_SIZE = 1000;

  // Initialize service
  async initialize(): Promise<void> {
    // Load alert rules from database
    const thresholds = await this.getAllThresholds();
    for (const threshold of thresholds) {
      this.alertRules.set(threshold.id, this.mapThresholdToRule(threshold));
    }

    logger.info('Agent Performance Monitoring Service initialized');
  }

  // Record metric
  async recordMetric(
    metric: Omit<PerformanceMetric, 'id'>,
    userId?: string
  ): Promise<{ success: boolean; metricId?: string; error?: string }> {
    try {
      const metricId = crypto.randomUUID();

      // Store in buffer for real-time analysis
      const bufferKey = `${metric.agentId}:${metric.type}`;
      if (!this.metricBuffers.has(bufferKey)) {
        this.metricBuffers.set(bufferKey, []);
      }
      const buffer = this.metricBuffers.get(bufferKey)!;
      buffer.push({
        timestamp: metric.timestamp,
        value: metric.value,
        unit: metric.unit,
        metadata: metric.dimensions,
      });

      // Keep buffer size limited
      if (buffer.length > this.BUFFER_SIZE) {
        buffer.shift();
      }

      // Save to database (async, don't wait)
      db.insert(agentMetrics).values({
        id: metricId,
        agentId: metric.agentId,
        teamId: metric.teamId,
        type: metric.type,
        name: metric.name,
        value: metric.value,
        unit: metric.unit,
        timestamp: metric.timestamp,
        period: metric.period,
        dimensions: metric.dimensions ? JSON.stringify(metric.dimensions) : null,
        createdAt: new Date(),
      }).then(() => {}).catch((err) => logger.error('Failed to insert metric', err));

      // Check alert rules
      this.checkAlertRules(metric);

      return { success: true, metricId };
    } catch (error) {
      logger.error('Error recording metric', error as Error);
      return { success: false, error: 'Failed to record metric' };
    }
  }

  // Record multiple metrics in batch
  async recordMetricsBatch(
    metrics: Omit<PerformanceMetric, 'id'>[],
    userId?: string
  ): Promise<{ success: boolean; recorded: number; error?: string }> {
    try {
      let recorded = 0;
      for (const metric of metrics) {
        const result = await this.recordMetric(metric, userId);
        if (result.success) recorded++;
      }
      return { success: true, recorded };
    } catch (error) {
      logger.error('Error recording metrics batch', error as Error);
      return { success: false, recorded: 0, error: 'Failed to record metrics batch' };
    }
  }

  // Create alert rule
  async createAlertRule(
    rule: Omit<AlertRule, 'id'>,
    userId?: string
  ): Promise<{ success: boolean; ruleId?: string; error?: string }> {
    try {
      const ruleId = crypto.randomUUID();

      await db.insert(performanceThresholds).values({
        id: ruleId,
        agentId: rule.notifications.recipients[0], // Use first recipient as agent
        metricType: rule.metricType,
        name: rule.name,
        description: rule.description,
        conditionOperator: rule.condition.operator,
        threshold: rule.condition.threshold,
        thresholdMax: rule.condition.thresholdMax,
        duration: rule.condition.duration,
        severity: rule.severity,
        notificationChannels: rule.notifications.channels,
        notificationRecipients: rule.notifications.recipients,
        notificationTemplate: rule.notifications.template,
        cooldown: rule.notifications.cooldown,
        autoActions: rule.autoActions ? JSON.stringify(rule.autoActions) : null,
        isEnabled: rule.isEnabled,
        timeWindowStart: rule.timeWindow?.startHour,
        timeWindowEnd: rule.timeWindow?.endHour,
        timeWindowDays: rule.timeWindow?.daysOfWeek,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.alertRules.set(ruleId, { ...rule, id: ruleId });

      await logAudit({
        userId: userId || 'system',
        action: 'alert_rule_created',
        resource: 'performance_threshold',
        resourceId: ruleId,
        details: { name: rule.name, metricType: rule.metricType, severity: rule.severity },
      });

      return { success: true, ruleId };
    } catch (error) {
      logger.error('Error creating alert rule', error as Error);
      return { success: false, error: 'Failed to create alert rule' };
    }
  }

  // Update alert rule
  async updateAlertRule(
    ruleId: string,
    updates: Partial<AlertRule>,
    userId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: any = { updatedAt: new Date() };

      if (updates.name) updateData.name = updates.name;
      if (updates.description) updateData.description = updates.description;
      if (updates.condition) {
        updateData.conditionOperator = updates.condition.operator;
        updateData.threshold = updates.condition.threshold;
        updateData.thresholdMax = updates.condition.thresholdMax;
        updateData.duration = updates.condition.duration;
      }
      if (updates.severity) updateData.severity = updates.severity;
      if (updates.notifications) {
        updateData.notificationChannels = updates.notifications.channels;
        updateData.notificationRecipients = updates.notifications.recipients;
        updateData.notificationTemplate = updates.notifications.template;
        updateData.cooldown = updates.notifications.cooldown;
      }
      if (updates.autoActions) updateData.autoActions = JSON.stringify(updates.autoActions);
      if (updates.isEnabled !== undefined) updateData.isEnabled = updates.isEnabled;

      await db.update(performanceThresholds)
        .set(updateData)
        .where(eq(performanceThresholds.id, ruleId));

      // Update in-memory rule
      const existingRule = this.alertRules.get(ruleId);
      if (existingRule) {
        this.alertRules.set(ruleId, { ...existingRule, ...updates });
      }

      await logAudit({
        userId: userId || 'system',
        action: 'alert_rule_updated',
        resource: 'performance_threshold',
        resourceId: ruleId,
        details: { updates: Object.keys(updates) },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error updating alert rule', error as Error);
      return { success: false, error: 'Failed to update alert rule' };
    }
  }

  // Delete alert rule
  async deleteAlertRule(ruleId: string, userId?: string): Promise<{ success: boolean; error?: string }> {
    try {
      await db.delete(performanceThresholds)
        .where(eq(performanceThresholds.id, ruleId));

      this.alertRules.delete(ruleId);

      await logAudit({
        userId: userId || 'system',
        action: 'alert_rule_deleted',
        resource: 'performance_threshold',
        resourceId: ruleId,
      });

      return { success: true };
    } catch (error) {
      logger.error('Error deleting alert rule', error as Error);
      return { success: false, error: 'Failed to delete alert rule' };
    }
  }

  // Get agent performance dashboard
  async getPerformanceDashboard(
    agentId: string,
    period: { start: Date; end: Date }
  ): Promise<PerformanceDashboard | null> {
    try {
      // Get metrics for period
      const metrics = await db.select().from(agentMetrics)
        .where(
          and(
            eq(agentMetrics.agentId, agentId),
            gte(agentMetrics.timestamp, period.start),
            lte(agentMetrics.timestamp, period.end)
          )
        )
        .orderBy(desc(agentMetrics.timestamp));

      // Calculate summary
      const summary = this.calculateSummary(metrics, period);

      // Get trends
      const trends = this.calculateTrends(metrics, period);

      // Get active alerts
      const alerts = await this.getAgentAlerts(agentId, period);

      // Identify top issues
      const topIssues = this.identifyTopIssues(metrics);

      // Generate recommendations
      const recommendations = this.generateRecommendations(summary, trends, topIssues);

      return {
        agentId,
        period,
        summary,
        trends,
        alerts,
        topIssues,
        recommendations,
      };
    } catch (error) {
      logger.error('Error getting performance dashboard', error as Error);
      return null;
    }
  }

  // Get cost breakdown
  async getCostBreakdown(
    agentId: string,
    period: { start: Date; end: Date }
  ): Promise<CostBreakdown | null> {
    try {
      // Get cost records
      const costs = await db.select().from(costTracking)
        .where(
          and(
            eq(costTracking.agentId, agentId),
            gte(costTracking.timestamp, period.start),
            lte(costTracking.timestamp, period.end)
          )
        );

      // Calculate totals
      const totalCost = costs.reduce((sum, c) => sum + (c.cost || 0), 0);
      const currency = costs[0]?.currency || 'USD';

      // Breakdown by category
      const breakdown = {
        modelTokens: costs.filter(c => c.category === 'model-tokens').reduce((s, c) => s + (c.cost || 0), 0),
        apiCalls: costs.filter(c => c.category === 'api-call').reduce((s, c) => s + (c.cost || 0), 0),
        computeTime: costs.filter(c => c.category === 'compute').reduce((s, c) => s + (c.cost || 0), 0),
        storage: costs.filter(c => c.category === 'storage').reduce((s, c) => s + (c.cost || 0), 0),
        dataTransfer: costs.filter(c => c.category === 'data-transfer').reduce((s, c) => s + (c.cost || 0), 0),
        other: costs.filter(c => !['model-tokens', 'api-call', 'compute', 'storage', 'data-transfer'].includes(c.category || ''))
          .reduce((s, c) => s + (c.cost || 0), 0),
      };

      // Get task type breakdown
      const taskTypes = await this.getCostByTaskType(agentId, period);

      // Get model breakdown
      const models = await this.getCostByModel(agentId, period);

      // Calculate trend
      const trend = await this.getCostTrend(agentId, period);

      // Get budget info
      const budget = await this.getBudgetInfo(agentId);

      return {
        agentId,
        period,
        totalCost,
        currency,
        breakdown,
        byTaskType: taskTypes,
        byModel: models,
        trend,
        budget,
      };
    } catch (error) {
      logger.error('Error getting cost breakdown', error as Error);
      return null;
    }
  }

  // Record cost
  async recordCost(
    agentId: string,
    cost: number,
    currency: string,
    category: string,
    taskId?: string,
    taskType?: string,
    model?: string,
    metadata?: Record<string, any>,
    userId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await db.insert(costTracking).values({
        id: crypto.randomUUID(),
        agentId,
        taskId,
        cost,
        currency,
        category,
        taskType,
        model,
        metadata: metadata ? JSON.stringify(metadata) : null,
        timestamp: new Date(),
        createdAt: new Date(),
      });

      return { success: true };
    } catch (error) {
      logger.error('Error recording cost', error as Error);
      return { success: false, error: 'Failed to record cost' };
    }
  }

  // Acknowledge alert
  async acknowledgeAlert(
    alertId: string,
    userId: string,
    notes?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await db.update(agentAlerts)
        .set({
          status: 'acknowledged',
          acknowledgedAt: new Date(),
          acknowledgedBy: userId,
          resolution: notes,
          updatedAt: new Date(),
        })
        .where(eq(agentAlerts.id, alertId));

      const alert = this.activeAlerts.get(alertId);
      if (alert) {
        alert.status = 'acknowledged';
        alert.acknowledgedAt = new Date();
        alert.acknowledgedBy = userId;
        alert.resolution = notes;
      }

      await logAudit({
        userId,
        action: 'alert_acknowledged',
        resource: 'agent_alert',
        resourceId: alertId,
        details: { notes },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error acknowledging alert', error as Error);
      return { success: false, error: 'Failed to acknowledge alert' };
    }
  }

  // Resolve alert
  async resolveAlert(
    alertId: string,
    userId: string,
    resolution: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await db.update(agentAlerts)
        .set({
          status: 'resolved',
          resolvedAt: new Date(),
          resolvedBy: userId,
          resolution,
          updatedAt: new Date(),
        })
        .where(eq(agentAlerts.id, alertId));

      this.activeAlerts.delete(alertId);

      await logAudit({
        userId,
        action: 'alert_resolved',
        resource: 'agent_alert',
        resourceId: alertId,
        details: { resolution },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error resolving alert', error as Error);
      return { success: false, error: 'Failed to resolve alert' };
    }
  }

  // Get active alerts
  async getActiveAlerts(
    options?: {
      agentId?: string;
      severity?: AlertSeverity;
      teamId?: string;
    }
  ): Promise<AlertInstance[]> {
    let query = db.select().from(agentAlerts)
      .where(eq(agentAlerts.status, 'active'))
      .orderBy(desc(agentAlerts.startedAt));

    if (options?.agentId) {
      query = query.where(eq(agentAlerts.agentId, options.agentId));
    }
    if (options?.severity) {
      query = query.where(eq(agentAlerts.severity, options.severity));
    }

    const alerts = await query;
    return alerts.map(a => this.mapAlertToInstance(a));
  }

  // Get alert history
  async getAlertHistory(
    options?: {
      agentId?: string;
      startDate?: Date;
      endDate?: Date;
      status?: AlertStatus;
    },
    limit: number = 100
  ): Promise<AlertInstance[]> {
    let query = db.select().from(agentAlerts)
      .orderBy(desc(agentAlerts.startedAt))
      .limit(limit);

    if (options?.agentId) {
      query = query.where(eq(agentAlerts.agentId, options.agentId));
    }
    if (options?.status) {
      query = query.where(eq(agentAlerts.status, options.status));
    }
    if (options?.startDate && options?.endDate) {
      query = query.where(
        and(
          gte(agentAlerts.startedAt, options.startDate),
          lte(agentAlerts.startedAt, options.endDate)
        )
      );
    }

    const alerts = await query;
    return alerts.map(a => this.mapAlertToInstance(a));
  }

  // Get metrics for agent
  async getMetrics(
    agentId: string,
    metricTypes: MetricType[],
    period: { start: Date; end: Date },
    aggregation?: AggregationPeriod
  ): Promise<PerformanceMetric[]> {
    let query = db.select().from(agentMetrics)
      .where(
        and(
          eq(agentMetrics.agentId, agentId),
          inArray(agentMetrics.type, metricTypes),
          gte(agentMetrics.timestamp, period.start),
          lte(agentMetrics.timestamp, period.end)
        )
      )
      .orderBy(desc(agentMetrics.timestamp));

    const metrics = await query;
    return metrics.map(m => ({
      id: m.id,
      agentId: m.agentId,
      teamId: m.teamId || undefined,
      type: m.type as MetricType,
      name: m.name,
      value: m.value,
      unit: m.unit,
      timestamp: m.timestamp,
      period: m.period as AggregationPeriod,
      dimensions: m.dimensions ? JSON.parse(m.dimensions as string) : undefined,
    }));
  }

  // Private helper methods

  private async getAllThresholds(): Promise<PerformanceThreshold[]> {
    return await db.select().from(performanceThresholds)
      .where(eq(performanceThresholds.isEnabled, true));
  }

  private mapThresholdToRule(threshold: PerformanceThreshold): AlertRule {
    return {
      id: threshold.id,
      name: threshold.name,
      description: threshold.description || undefined,
      metricType: threshold.metricType as MetricType,
      condition: {
        operator: threshold.conditionOperator as any,
        threshold: threshold.threshold,
        thresholdMax: threshold.thresholdMax || undefined,
        duration: threshold.duration,
      },
      severity: threshold.severity as AlertSeverity,
      notifications: {
        channels: threshold.notificationChannels as any[],
        recipients: threshold.notificationRecipients as string[],
        template: threshold.notificationTemplate,
        cooldown: threshold.cooldown,
      },
      autoActions: threshold.autoActions ? JSON.parse(threshold.autoActions as string) : undefined,
      isEnabled: threshold.isEnabled,
      timeWindow: threshold.timeWindowStart !== null ? {
        startHour: threshold.timeWindowStart!,
        endHour: threshold.timeWindowEnd!,
        daysOfWeek: threshold.timeWindowDays || [],
      } : undefined,
    };
  }

  private mapAlertToInstance(alert: AgentAlert): AlertInstance {
    return {
      id: alert.id,
      ruleId: alert.ruleId,
      ruleName: alert.ruleName,
      agentId: alert.agentId,
      severity: alert.severity as AlertSeverity,
      status: alert.status as AlertStatus,
      message: alert.message,
      metricValue: alert.metricValue,
      threshold: alert.threshold,
      startedAt: alert.startedAt,
      acknowledgedAt: alert.acknowledgedAt || undefined,
      acknowledgedBy: alert.acknowledgedBy || undefined,
      resolvedAt: alert.resolvedAt || undefined,
      resolvedBy: alert.resolvedBy || undefined,
      resolution: alert.resolution || undefined,
      correlationId: alert.correlationId || undefined,
      relatedAlerts: alert.relatedAlerts ? JSON.parse(alert.relatedAlerts as string) : undefined,
    };
  }

  private checkAlertRules(metric: PerformanceMetric): void {
    for (const rule of this.alertRules.values()) {
      if (!rule.isEnabled) continue;
      if (rule.metricType !== metric.type) continue;

      // Check time window if specified
      if (rule.timeWindow) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentDay = now.getDay();

        if (
          currentHour < rule.timeWindow.startHour ||
          currentHour > rule.timeWindow.endHour ||
          !rule.timeWindow.daysOfWeek.includes(currentDay)
        ) {
          continue;
        }
      }

      // Check condition
      const conditionMet = this.evaluateCondition(
        metric.value,
        rule.condition.operator,
        rule.condition.threshold,
        rule.condition.thresholdMax
      );

      if (conditionMet) {
        this.triggerAlert(rule, metric);
      }
    }
  }

  private evaluateCondition(
    value: number,
    operator: string,
    threshold: number,
    thresholdMax?: number
  ): boolean {
    switch (operator) {
      case 'greater-than':
        return value > threshold;
      case 'less-than':
        return value < threshold;
      case 'equals':
        return value === threshold;
      case 'not-equals':
        return value !== threshold;
      case 'in-range':
        return thresholdMax !== undefined && value >= threshold && value <= thresholdMax;
      case 'out-of-range':
        return thresholdMax === undefined || value < threshold || value > thresholdMax;
      default:
        return false;
    }
  }

  private async triggerAlert(rule: AlertRule, metric: PerformanceMetric): Promise<void> {
    // Check cooldown
    const lastAlert = await this.getLastAlertForRule(rule.id, metric.agentId);
    if (lastAlert) {
      const cooldownMs = rule.notifications.cooldown * 60 * 1000;
      if (new Date().getTime() - new Date(lastAlert.startedAt).getTime() < cooldownMs) {
        return; // Still in cooldown
      }
    }

    const alertId = crypto.randomUUID();
    const alert: AlertInstance = {
      id: alertId,
      ruleId: rule.id,
      ruleName: rule.name,
      agentId: metric.agentId,
      severity: rule.severity,
      status: 'active',
      message: this.formatAlertMessage(rule, metric),
      metricValue: metric.value,
      threshold: rule.condition.threshold,
      startedAt: new Date(),
    };

    // Save to database
    await db.insert(agentAlerts).values({
      id: alertId,
      ruleId: rule.id,
      ruleName: rule.name,
      agentId: metric.agentId,
      severity: rule.severity,
      status: 'active',
      message: alert.message,
      metricValue: metric.value,
      threshold: rule.condition.threshold,
      startedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.activeAlerts.set(alertId, alert);

    // Send notifications
    await this.sendAlertNotifications(rule, alert);

    // Execute auto-actions if configured
    if (rule.autoActions) {
      await this.executeAutoActions(rule.autoActions, metric.agentId);
    }
  }

  private async getLastAlertForRule(ruleId: string, agentId: string): Promise<AgentAlert | null> {
    const [alert] = await db.select().from(agentAlerts)
      .where(
        and(
          eq(agentAlerts.ruleId, ruleId),
          eq(agentAlerts.agentId, agentId)
        )
      )
      .orderBy(desc(agentAlerts.startedAt))
      .limit(1);

    return alert || null;
  }

  private formatAlertMessage(rule: AlertRule, metric: PerformanceMetric): string {
    const condition = `${rule.condition.operator} ${rule.condition.threshold}${rule.condition.thresholdMax ? `-${rule.condition.thresholdMax}` : ''}`;
    return `${rule.name}: ${metric.type} is ${metric.value}${metric.unit} (threshold: ${condition})`;
  }

  private async sendAlertNotifications(rule: AlertRule, alert: AlertInstance): Promise<void> {
    const { channels, recipients, template } = rule.notifications;

    const message = template
      .replace('{{ruleName}}', rule.name)
      .replace('{{metricValue}}', String(alert.metricValue))
      .replace('{{threshold}}', String(alert.threshold))
      .replace('{{severity}}', alert.severity);

    for (const channel of channels) {
      for (const recipient of recipients) {
        try {
          switch (channel) {
            case 'email':
              await notificationService.sendEmail({
                to: recipient,
                subject: `[${alert.severity.toUpperCase()}] Agent Alert: ${rule.name}`,
                body: message,
              });
              break;
            case 'sms':
              await notificationService.sendSMS({
                to: recipient,
                message: message.substring(0, 160),
              });
              break;
            case 'push':
              await notificationService.sendPush({
                userId: recipient,
                title: `Agent Alert: ${rule.name}`,
                body: message,
                data: { alertId: alert.id },
              });
              break;
            case 'slack':
              await notificationService.sendSlack({
                channel: recipient,
                text: message,
                attachments: [{
                  color: this.getSeverityColor(alert.severity),
                  fields: [
                    { title: 'Agent', value: alert.agentId, short: true },
                    { title: 'Metric Value', value: String(alert.metricValue), short: true },
                    { title: 'Threshold', value: String(alert.threshold), short: true },
                  ],
                }],
              });
              break;
          }
        } catch (error) {
          logger.error(`Failed to send ${channel} notification`, error as Error);
        }
      }
    }
  }

  private getSeverityColor(severity: AlertSeverity): string {
    const colors = {
      info: '#3B82F6',
      warning: '#F59E0B',
      critical: '#EF4444',
      emergency: '#DC2626',
    };
    return colors[severity];
  }

  private async executeAutoActions(
    actions: NonNullable<AlertRule['autoActions']>,
    agentId: string
  ): Promise<void> {
    // These would trigger actual system actions
    if (actions.scaleUp) {
      logger.info(`Auto-scaling up agent: ${agentId}`);
    }
    if (actions.scaleDown) {
      logger.info(`Auto-scaling down agent: ${agentId}`);
    }
    if (actions.restart) {
      logger.info(`Auto-restarting agent: ${agentId}`);
    }
    if (actions.fallback) {
      logger.info(`Activating fallback for agent: ${agentId}`);
    }
    if (actions.notifyManager) {
      logger.info(`Notifying manager for agent: ${agentId}`);
    }
  }

  private calculateSummary(metrics: AgentMetric[], period: { start: Date; end: Date }) {
    const tasksCompleted = metrics.filter(m => m.type === 'task-completion').length;
    const successfulTasks = metrics.filter(m => m.type === 'task-completion' && m.value > 0).length;

    const responseTimeMetrics = metrics.filter(m => m.type === 'response-time');
    const averageResponseTime = responseTimeMetrics.length > 0
      ? responseTimeMetrics.reduce((s, m) => s + m.value, 0) / responseTimeMetrics.length
      : 0;

    const availabilityMetrics = metrics.filter(m => m.type === 'availability');
    const availability = availabilityMetrics.length > 0
      ? availabilityMetrics.reduce((s, m) => s + m.value, 0) / availabilityMetrics.length
      : 100;

    const accuracyMetrics = metrics.filter(m => m.type === 'accuracy');
    const accuracy = accuracyMetrics.length > 0
      ? accuracyMetrics.reduce((s, m) => s + m.value, 0) / accuracyMetrics.length
      : 100;

    const costMetrics = metrics.filter(m => m.type === 'cost-per-task');
    const costPerTask = costMetrics.length > 0
      ? costMetrics.reduce((s, m) => s + m.value, 0) / costMetrics.length
      : 0;

    const satisfactionMetrics = metrics.filter(m => m.type === 'customer-satisfaction');
    const customerSatisfaction = satisfactionMetrics.length > 0
      ? satisfactionMetrics.reduce((s, m) => s + m.value, 0) / satisfactionMetrics.length
      : 0;

    return {
      totalTasks: tasksCompleted,
      successfulTasks,
      failedTasks: tasksCompleted - successfulTasks,
      averageResponseTime,
      availability,
      accuracy,
      costPerTask,
      customerSatisfaction,
    };
  }

  private calculateTrends(metrics: AgentMetric[], period: { start: Date; end: Date }) {
    const responseTime = metrics
      .filter(m => m.type === 'response-time')
      .map(m => ({
        timestamp: m.timestamp,
        value: m.value,
        unit: m.unit,
      }));

    const throughput = metrics
      .filter(m => m.type === 'throughput')
      .map(m => ({
        timestamp: m.timestamp,
        value: m.value,
        unit: m.unit,
      }));

    const errorRate = metrics
      .filter(m => m.type === 'error-rate')
      .map(m => ({
        timestamp: m.timestamp,
        value: m.value,
        unit: m.unit,
      }));

    const cost = metrics
      .filter(m => m.type === 'cost-per-task')
      .map(m => ({
        timestamp: m.timestamp,
        value: m.value,
        unit: m.unit,
      }));

    return { responseTime, throughput, errorRate, cost };
  }

  private async getAgentAlerts(agentId: string, period: { start: Date; end: Date }): Promise<AlertInstance[]> {
    const alerts = await db.select().from(agentAlerts)
      .where(
        and(
          eq(agentAlerts.agentId, agentId),
          gte(agentAlerts.startedAt, period.start),
          lte(agentAlerts.startedAt, period.end)
        )
      )
      .orderBy(desc(agentAlerts.startedAt));

    return alerts.map(a => this.mapAlertToInstance(a));
  }

  private identifyTopIssues(metrics: AgentMetric[]) {
    const issues: { type: string; count: number; impact: string }[] = [];

    // Count error types
    const errorMetrics = metrics.filter(m => m.type === 'error-rate' && m.value > 5);
    if (errorMetrics.length > 0) {
      issues.push({
        type: 'High Error Rate',
        count: errorMetrics.length,
        impact: 'high',
      });
    }

    // Count slow responses
    const slowMetrics = metrics.filter(m => m.type === 'response-time' && m.value > 5000);
    if (slowMetrics.length > 0) {
      issues.push({
        type: 'Slow Response Time',
        count: slowMetrics.length,
        impact: 'medium',
      });
    }

    // Count low accuracy
    const accuracyIssues = metrics.filter(m => m.type === 'accuracy' && m.value < 80);
    if (accuracyIssues.length > 0) {
      issues.push({
        type: 'Low Accuracy',
        count: accuracyIssues.length,
        impact: 'high',
      });
    }

    return issues.sort((a, b) => b.count - a.count).slice(0, 5);
  }

  private generateRecommendations(
    summary: any,
    trends: any,
    topIssues: any[]
  ): string[] {
    const recommendations: string[] = [];

    if (summary.accuracy < 85) {
      recommendations.push('Consider retraining the agent with additional data to improve accuracy.');
    }

    if (summary.averageResponseTime > 3000) {
      recommendations.push('Response time is high. Consider optimizing the model or scaling up resources.');
    }

    if (summary.availability < 99) {
      recommendations.push('Availability issues detected. Review error logs and improve error handling.');
    }

    if (summary.costPerTask > 0.5) {
      recommendations.push('Cost per task is elevated. Consider using a more cost-effective model for simple queries.');
    }

    if (topIssues.some(i => i.type === 'High Error Rate')) {
      recommendations.push('High error rate detected. Review recent changes and error patterns.');
    }

    return recommendations;
  }

  private async getCostByTaskType(agentId: string, period: { start: Date; end: Date }) {
    const costs = await db.select().from(costTracking)
      .where(
        and(
          eq(costTracking.agentId, agentId),
          gte(costTracking.timestamp, period.start),
          lte(costTracking.timestamp, period.end)
        )
      );

    const byType = new Map<string, { cost: number; count: number }>();
    for (const cost of costs) {
      const type = cost.taskType || 'unknown';
      const existing = byType.get(type) || { cost: 0, count: 0 };
      existing.cost += cost.cost || 0;
      existing.count++;
      byType.set(type, existing);
    }

    return Array.from(byType.entries()).map(([taskType, data]) => ({
      taskType,
      cost: Math.round(data.cost * 100) / 100,
      count: data.count,
    }));
  }

  private async getCostByModel(agentId: string, period: { start: Date; end: Date }) {
    const costs = await db.select().from(costTracking)
      .where(
        and(
          eq(costTracking.agentId, agentId),
          gte(costTracking.timestamp, period.start),
          lte(costTracking.timestamp, period.end)
        )
      );

    const byModel = new Map<string, { tokens: number; cost: number }>();
    for (const cost of costs) {
      const model = cost.model || 'unknown';
      const existing = byModel.get(model) || { tokens: 0, cost: 0 };
      // Estimate tokens from cost (rough approximation)
      existing.tokens += Math.round((cost.cost || 0) * 1000);
      existing.cost += cost.cost || 0;
      byModel.set(model, existing);
    }

    return Array.from(byModel.entries()).map(([model, data]) => ({
      model,
      tokens: data.tokens,
      cost: Math.round(data.cost * 100) / 100,
    }));
  }

  private async getCostTrend(agentId: string, period: { start: Date; end: Date }) {
    const costs = await db.select().from(costTracking)
      .where(
        and(
          eq(costTracking.agentId, agentId),
          gte(costTracking.timestamp, period.start),
          lte(costTracking.timestamp, period.end)
        )
      )
      .orderBy(asc(costTracking.timestamp));

    // Group by day
    const byDay = new Map<string, number>();
    for (const cost of costs) {
      const day = cost.timestamp.toISOString().split('T')[0];
      const existing = byDay.get(day) || 0;
      byDay.set(day, existing + (cost.cost || 0));
    }

    return Array.from(byDay.entries()).map(([day, value]) => ({
      timestamp: new Date(day),
      value: Math.round(value * 100) / 100,
      unit: 'USD',
    }));
  }

  private async getBudgetInfo(agentId: string) {
    // Get budget from agent settings
    const [member] = await db.select().from(agentSessions)
      .where(eq(agentSessions.agentId, agentId))
      .limit(1);

    if (!member) {
      return {
        allocated: 1000,
        used: 0,
        remaining: 1000,
        projected: 1000,
      };
    }

    // Get current month's cost
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const costs = await db.select({ total: sql`SUM(${costTracking.cost})` }).from(costTracking)
      .where(
        and(
          eq(costTracking.agentId, agentId),
          gte(costTracking.timestamp, startOfMonth)
        )
      );

    const used = Number(costs[0]?.total) || 0;
    const allocated = 1000; // Default budget
    const remaining = allocated - used;

    // Project based on current usage rate
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysPassed = now.getDate();
    const dailyAverage = used / daysPassed;
    const projected = dailyAverage * daysInMonth;

    return {
      allocated,
      used: Math.round(used * 100) / 100,
      remaining: Math.round(remaining * 100) / 100,
      projected: Math.round(projected * 100) / 100,
    };
  }

  // Get agent metrics
  async getAgentMetrics(agentId: string): Promise<any> {
    return { agentId, metrics: {}, timestamp: new Date() };
  }

  // Get alert rules
  getAlertRules(): any[] {
    return [];
  }

  // Get alerts
  getAlerts(filters?: any): any[] {
    return [];
  }

  // Create cost center
  async createCostCenter(data: any): Promise<any> {
    return { id: crypto.randomUUID(), ...data, createdAt: new Date() };
  }

  // Get cost centers
  async getCostCenters(organizationId: string): Promise<any[]> {
    return [];
  }

  // Get cost report
  async getCostReport(organizationId: string, period: string): Promise<any> {
    return { organizationId, period, costs: [], total: 0 };
  }

  // Check budget alert
  async checkBudgetAlert(organizationId: string): Promise<{ triggered: boolean; message?: string }> {
    return { triggered: false };
  }
}

// Export singleton instance
export const agentPerformanceMonitoringService = new AgentPerformanceMonitoringService();
