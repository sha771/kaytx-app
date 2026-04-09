/**
 * Multi-Tenant Resource Quotas
 * AI Operating System - Core Component #5
 * 
 * Prevents one customer from using all resources
 * Enables pricing tiers and prevents system abuse
 * Like AWS account limits or Kubernetes ResourceQuotas
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '../lib/production-logger';
import { logAudit } from '../lib/audit';

const logger = createLogger('ResourceQuotas');

// Quota Types
export type ResourceType = 
  | 'agents'           // Number of AI agents
  | 'compute'          // CPU/GPU compute hours
  | 'memory'           // RAM usage
  | 'storage'          // Disk storage
  | 'bandwidth'        // Network bandwidth
  | 'api_calls'        // API request count
  | 'executions'       // Agent execution count
  | 'concurrent_tasks' // Parallel task limit
  | 'data_transfer'    // Data in/out
  | 'llm_tokens'     // LLM API tokens
  | 'webhooks';       // Webhook calls

export type QuotaPeriod = 'minute' | 'hour' | 'day' | 'month' | 'billing_cycle';
export type EnforcementAction = 'block' | 'throttle' | 'warn' | 'queue' | 'notify';

export interface ResourceQuota {
  quotaId: string;
  organizationId: string;
  resourceType: ResourceType;
  
  // Limits
  limit: number;
  period: QuotaPeriod;
  
  // Usage tracking
  used: number;
  remaining: number;
  percentUsed: number;
  
  // Soft limit (warning) vs hard limit (enforcement)
  softLimit?: number;  // Percentage (e.g., 80)
  hardLimit: number;   // Always 100%
  
  // Enforcement
  enforcementAction: EnforcementAction;
  burstAllowance?: number; // Temporary overage allowed
  
  // Time tracking
  periodStart: Date;
  periodEnd: Date;
  lastReset: Date;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  description?: string;
}

export interface QuotaPlan {
  planId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  
  // Quota limits by resource type
  quotas: Record<ResourceType, {
    limit: number;
    period: QuotaPeriod;
    softLimit: number;
    enforcementAction: EnforcementAction;
  }>;
  
  // Features
  features: string[];
  priority: 'low' | 'normal' | 'high' | 'enterprise';
  supportLevel: 'community' | 'email' | 'priority' | 'dedicated';
  sla: string; // e.g., "99.9%"
  
  // Trial
  trialDays: number;
  trialQuotaPercent: number;
}

export interface UsageEvent {
  eventId: string;
  organizationId: string;
  resourceType: ResourceType;
  amount: number;
  timestamp: Date;
  agentId?: string;
  userId?: string;
  operation: string;
  metadata: Record<string, any>;
  cost: number;
}

export interface QuotaViolation {
  violationId: string;
  organizationId: string;
  quotaId: string;
  resourceType: ResourceType;
  requested: number;
  allowed: number;
  exceededBy: number;
  timestamp: Date;
  action: EnforcementAction;
  resolved: boolean;
}

export interface UsageReport {
  organizationId: string;
  period: { start: Date; end: Date };
  quotas: ResourceQuota[];
  totalCost: number;
  breakdown: Record<ResourceType, {
    used: number;
    limit: number;
    cost: number;
    percentUsed: number;
    peakUsage: number;
    peakTime: Date;
  }>;
  violations: QuotaViolation[];
  recommendations: string[];
}

export interface BillingRecord {
  recordId: string;
  organizationId: string;
  billingPeriod: string; // YYYY-MM
  lineItems: Array<{
    resourceType: ResourceType;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    description: string;
  }>;
  subtotal: number;
  discounts: number;
  tax: number;
  total: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  createdAt: Date;
  paidAt?: Date;
}

class ResourceQuotaManager extends EventEmitter {
  private quotas: Map<string, ResourceQuota> = new Map(); // quotaId -> quota
  private orgQuotas: Map<string, Set<string>> = new Map(); // orgId -> set of quotaIds
  private usageEvents: UsageEvent[] = [];
  private violations: QuotaViolation[] = [];
  private billingRecords: Map<string, BillingRecord> = new Map();
  private plans: Map<string, QuotaPlan> = new Map();
  private monitoringInterval?: NodeJS.Timeout;
  private readonly EVENT_RETENTION_DAYS = 90;

  constructor() {
    super();
    this.initializeDefaultPlans();
    this.startMonitoring();
  }

  // Initialize default pricing plans
  private initializeDefaultPlans(): void {
    const plans: QuotaPlan[] = [
      {
        planId: 'plan-free',
        name: 'Free',
        description: 'Perfect for trying out Kaytx',
        price: 0,
        currency: 'USD',
        billingPeriod: 'monthly',
        quotas: {
          agents: { limit: 3, period: 'billing_cycle', softLimit: 80, enforcementAction: 'block' },
          compute: { limit: 100, period: 'month', softLimit: 80, enforcementAction: 'block' }, // hours
          memory: { limit: 8 * 1024, period: 'billing_cycle', softLimit: 90, enforcementAction: 'throttle' }, // MB
          storage: { limit: 10 * 1024, period: 'billing_cycle', softLimit: 90, enforcementAction: 'block' }, // MB
          bandwidth: { limit: 100, period: 'month', softLimit: 90, enforcementAction: 'throttle' }, // GB
          api_calls: { limit: 10000, period: 'month', softLimit: 80, enforcementAction: 'block' },
          executions: { limit: 5000, period: 'month', softLimit: 80, enforcementAction: 'block' },
          concurrent_tasks: { limit: 5, period: 'minute', softLimit: 80, enforcementAction: 'queue' },
          data_transfer: { limit: 50, period: 'month', softLimit: 90, enforcementAction: 'throttle' }, // GB
          llm_tokens: { limit: 100000, period: 'month', softLimit: 80, enforcementAction: 'block' },
          webhooks: { limit: 1000, period: 'month', softLimit: 80, enforcementAction: 'block' }
        },
        features: ['basic_agents', 'community_support', 'standard_security'],
        priority: 'low',
        supportLevel: 'community',
        sla: '99%',
        trialDays: 0,
        trialQuotaPercent: 100
      },
      {
        planId: 'plan-starter',
        name: 'Starter',
        description: 'For small teams getting started',
        price: 99,
        currency: 'USD',
        billingPeriod: 'monthly',
        quotas: {
          agents: { limit: 10, period: 'billing_cycle', softLimit: 80, enforcementAction: 'warn' },
          compute: { limit: 500, period: 'month', softLimit: 80, enforcementAction: 'warn' },
          memory: { limit: 32 * 1024, period: 'billing_cycle', softLimit: 85, enforcementAction: 'throttle' },
          storage: { limit: 100 * 1024, period: 'billing_cycle', softLimit: 90, enforcementAction: 'warn' },
          bandwidth: { limit: 500, period: 'month', softLimit: 85, enforcementAction: 'throttle' },
          api_calls: { limit: 100000, period: 'month', softLimit: 80, enforcementAction: 'warn' },
          executions: { limit: 50000, period: 'month', softLimit: 80, enforcementAction: 'warn' },
          concurrent_tasks: { limit: 25, period: 'minute', softLimit: 80, enforcementAction: 'queue' },
          data_transfer: { limit: 250, period: 'month', softLimit: 85, enforcementAction: 'throttle' },
          llm_tokens: { limit: 1000000, period: 'month', softLimit: 80, enforcementAction: 'warn' },
          webhooks: { limit: 10000, period: 'month', softLimit: 80, enforcementAction: 'warn' }
        },
        features: ['all_agents', 'email_support', 'advanced_security', 'analytics'],
        priority: 'normal',
        supportLevel: 'email',
        sla: '99.5%',
        trialDays: 14,
        trialQuotaPercent: 100
      },
      {
        planId: 'plan-professional',
        name: 'Professional',
        description: 'For growing businesses',
        price: 499,
        currency: 'USD',
        billingPeriod: 'monthly',
        quotas: {
          agents: { limit: 50, period: 'billing_cycle', softLimit: 85, enforcementAction: 'warn' },
          compute: { limit: 2000, period: 'month', softLimit: 85, enforcementAction: 'warn' },
          memory: { limit: 128 * 1024, period: 'billing_cycle', softLimit: 90, enforcementAction: 'throttle' },
          storage: { limit: 500 * 1024, period: 'billing_cycle', softLimit: 90, enforcementAction: 'warn' },
          bandwidth: { limit: 2000, period: 'month', softLimit: 90, enforcementAction: 'throttle' },
          api_calls: { limit: 1000000, period: 'month', softLimit: 85, enforcementAction: 'warn' },
          executions: { limit: 500000, period: 'month', softLimit: 85, enforcementAction: 'warn' },
          concurrent_tasks: { limit: 100, period: 'minute', softLimit: 85, enforcementAction: 'queue' },
          data_transfer: { limit: 1000, period: 'month', softLimit: 90, enforcementAction: 'throttle' },
          llm_tokens: { limit: 10000000, period: 'month', softLimit: 85, enforcementAction: 'warn' },
          webhooks: { limit: 100000, period: 'month', softLimit: 85, enforcementAction: 'warn' }
        },
        features: ['all_agents', 'custom_agents', 'priority_support', 'advanced_security', 'sso', 'audit_logs'],
        priority: 'high',
        supportLevel: 'priority',
        sla: '99.9%',
        trialDays: 14,
        trialQuotaPercent: 100
      },
      {
        planId: 'plan-enterprise',
        name: 'Enterprise',
        description: 'For large organizations with custom needs',
        price: 0, // Custom pricing
        currency: 'USD',
        billingPeriod: 'monthly',
        quotas: {
          agents: { limit: Infinity, period: 'billing_cycle', softLimit: 90, enforcementAction: 'notify' },
          compute: { limit: Infinity, period: 'month', softLimit: 90, enforcementAction: 'notify' },
          memory: { limit: Infinity, period: 'billing_cycle', softLimit: 95, enforcementAction: 'notify' },
          storage: { limit: Infinity, period: 'billing_cycle', softLimit: 95, enforcementAction: 'notify' },
          bandwidth: { limit: Infinity, period: 'month', softLimit: 95, enforcementAction: 'notify' },
          api_calls: { limit: Infinity, period: 'month', softLimit: 90, enforcementAction: 'notify' },
          executions: { limit: Infinity, period: 'month', softLimit: 90, enforcementAction: 'notify' },
          concurrent_tasks: { limit: 1000, period: 'minute', softLimit: 90, enforcementAction: 'queue' },
          data_transfer: { limit: Infinity, period: 'month', softLimit: 95, enforcementAction: 'notify' },
          llm_tokens: { limit: Infinity, period: 'month', softLimit: 90, enforcementAction: 'notify' },
          webhooks: { limit: Infinity, period: 'month', softLimit: 90, enforcementAction: 'notify' }
        },
        features: ['all_agents', 'custom_agents', 'dedicated_support', 'custom_contract', 'sla_guarantee', 'dedicated_infrastructure'],
        priority: 'enterprise',
        supportLevel: 'dedicated',
        sla: '99.99%',
        trialDays: 30,
        trialQuotaPercent: 50
      }
    ];

    plans.forEach(p => this.plans.set(p.planId, p));
    logger.info(`Initialized ${plans.length} pricing plans`);
  }

  // Assign plan to organization
  async assignPlan(
    organizationId: string,
    planId: string,
    customQuotas?: Partial<Record<ResourceType, number>>
  ): Promise<ResourceQuota[]> {
    const plan = this.plans.get(planId);
    if (!plan) {
      throw new Error(`Plan ${planId} not found`);
    }

    // Remove existing quotas
    const existingQuotas = this.orgQuotas.get(organizationId);
    if (existingQuotas) {
      for (const quotaId of existingQuotas) {
        this.quotas.delete(quotaId);
      }
    }

    const newQuotaIds = new Set<string>();
    const now = new Date();
    const periodEnd = this.calculatePeriodEnd(now, 'billing_cycle');

    // Create quotas from plan
    const createdQuotas: ResourceQuota[] = [];
    
    for (const [resourceType, planQuota] of Object.entries(plan.quotas)) {
      const quotaId = `quota-${uuidv4()}`;
      
      const limit = customQuotas?.[resourceType as ResourceType] ?? planQuota.limit;
      
      const quota: ResourceQuota = {
        quotaId,
        organizationId,
        resourceType: resourceType as ResourceType,
        limit,
        period: planQuota.period,
        used: 0,
        remaining: limit,
        percentUsed: 0,
        softLimit: planQuota.softLimit,
        hardLimit: 100,
        enforcementAction: planQuota.enforcementAction,
        periodStart: now,
        periodEnd,
        lastReset: now,
        createdAt: now,
        updatedAt: now,
        createdBy: 'system',
        description: `${plan.name} plan - ${resourceType}`
      };

      this.quotas.set(quotaId, quota);
      newQuotaIds.add(quotaId);
      createdQuotas.push(quota);
    }

    this.orgQuotas.set(organizationId, newQuotaIds);

    await logAudit({
      userId: 'system',
      organizationId,
      action: 'plan_assigned',
      resource: 'quota_plan',
      resourceId: planId,
      details: { quotasCreated: createdQuotas.length }
    });

    this.emit('planAssigned', { organizationId, planId, quotas: createdQuotas });
    logger.info(`Assigned plan ${planId} to organization ${organizationId}`);

    return createdQuotas;
  }

  // Calculate period end
  private calculatePeriodEnd(start: Date, period: QuotaPeriod): Date {
    const end = new Date(start);
    
    switch (period) {
      case 'minute':
        end.setMinutes(end.getMinutes() + 1);
        break;
      case 'hour':
        end.setHours(end.getHours() + 1);
        break;
      case 'day':
        end.setDate(end.getDate() + 1);
        break;
      case 'month':
        end.setMonth(end.getMonth() + 1);
        break;
      case 'billing_cycle':
        end.setMonth(end.getMonth() + 1);
        break;
    }
    
    return end;
  }

  // Check and track resource usage
  async checkAndTrackUsage(
    organizationId: string,
    resourceType: ResourceType,
    requestedAmount: number,
    context: {
      agentId?: string;
      userId?: string;
      operation: string;
      metadata?: Record<string, any>;
    }
  ): Promise<{
    allowed: boolean;
    amount: number;
    quotaId?: string;
    percentUsed?: number;
    action: EnforcementAction;
    message?: string;
  }> {
    // Find quota for this resource
    const quota = this.getQuota(organizationId, resourceType);
    
    if (!quota) {
      // No quota defined - deny
      return {
        allowed: false,
        amount: 0,
        action: 'block',
        message: `No quota defined for ${resourceType}`
      };
    }

    // Check if period expired and needs reset
    if (new Date() > quota.periodEnd) {
      await this.resetQuota(quota.quotaId);
    }

    const newUsage = quota.used + requestedAmount;
    const percentUsed = (newUsage / quota.limit) * 100;

    // Check against limits
    if (percentUsed > 100) {
      // Hard limit exceeded
      const violation = this.recordViolation(organizationId, quota, requestedAmount);
      
      return {
        allowed: quota.enforcementAction !== 'block',
        amount: quota.enforcementAction === 'block' ? 0 : requestedAmount,
        quotaId: quota.quotaId,
        percentUsed,
        action: quota.enforcementAction,
        message: `Quota exceeded for ${resourceType}. Used: ${quota.used}/${quota.limit}`
      };
    }

    if (percentUsed > quota.softLimit!) {
      // Soft limit exceeded - warn but allow
      this.emit('softLimitExceeded', { organizationId, resourceType, quota, percentUsed });
    }

    // Track usage
    await this.trackUsage(organizationId, resourceType, requestedAmount, context);

    // Update quota
    quota.used = newUsage;
    quota.remaining = Math.max(0, quota.limit - newUsage);
    quota.percentUsed = percentUsed;
    quota.updatedAt = new Date();

    return {
      allowed: true,
      amount: requestedAmount,
      quotaId: quota.quotaId,
      percentUsed,
      action: 'warn',
      message: percentUsed > quota.softLimit! ? 
        `Warning: ${resourceType} usage at ${percentUsed.toFixed(1)}%` : 
        undefined
    };
  }

  // Track usage event
  private async trackUsage(
    organizationId: string,
    resourceType: ResourceType,
    amount: number,
    context: {
      agentId?: string;
      userId?: string;
      operation: string;
      metadata?: Record<string, any>;
    }
  ): Promise<void> {
    const unitCost = this.calculateUnitCost(resourceType);
    const cost = amount * unitCost;

    const event: UsageEvent = {
      eventId: `usage-${uuidv4()}`,
      organizationId,
      resourceType,
      amount,
      timestamp: new Date(),
      agentId: context.agentId,
      userId: context.userId,
      operation: context.operation,
      metadata: context.metadata || {},
      cost
    };

    this.usageEvents.push(event);

    this.emit('usageTracked', event);
  }

  // Calculate unit cost for resource
  private calculateUnitCost(resourceType: ResourceType): number {
    const costs: Record<ResourceType, number> = {
      agents: 0.50,           // $0.50 per agent/day
      compute: 0.05,          // $0.05 per CPU hour
      memory: 0.001,          // $0.001 per MB-hour
      storage: 0.0001,        // $0.0001 per MB-month
      bandwidth: 0.09,        // $0.09 per GB
      api_calls: 0.00001,     // $0.00001 per call
      executions: 0.001,      // $0.001 per execution
      concurrent_tasks: 0,   // No direct cost
      data_transfer: 0.09,   // $0.09 per GB
      llm_tokens: 0.00002,   // $0.00002 per token
      webhooks: 0.0001        // $0.0001 per webhook
    };

    return costs[resourceType] || 0;
  }

  // Get quota for organization and resource type
  private getQuota(organizationId: string, resourceType: ResourceType): ResourceQuota | undefined {
    const quotaIds = this.orgQuotas.get(organizationId);
    if (!quotaIds) return undefined;

    for (const quotaId of quotaIds) {
      const quota = this.quotas.get(quotaId);
      if (quota && quota.resourceType === resourceType) {
        return quota;
      }
    }

    return undefined;
  }

  // Reset quota for new period
  private async resetQuota(quotaId: string): Promise<void> {
    const quota = this.quotas.get(quotaId);
    if (!quota) return;

    const now = new Date();
    quota.used = 0;
    quota.remaining = quota.limit;
    quota.percentUsed = 0;
    quota.periodStart = now;
    quota.periodEnd = this.calculatePeriodEnd(now, quota.period);
    quota.lastReset = now;
    quota.updatedAt = now;

    this.emit('quotaReset', { quotaId, organizationId: quota.organizationId, resourceType: quota.resourceType });
    logger.info(`Reset quota ${quotaId} for ${quota.resourceType}`);
  }

  // Record quota violation
  private recordViolation(
    organizationId: string,
    quota: ResourceQuota,
    requested: number
  ): QuotaViolation {
    const violation: QuotaViolation = {
      violationId: `violation-${uuidv4()}`,
      organizationId,
      quotaId: quota.quotaId,
      resourceType: quota.resourceType,
      requested,
      allowed: Math.max(0, quota.limit - quota.used),
      exceededBy: requested - Math.max(0, quota.limit - quota.used),
      timestamp: new Date(),
      action: quota.enforcementAction,
      resolved: false
    };

    this.violations.push(violation);

    this.emit('quotaViolation', violation);

    logAudit({
      userId: 'system',
      organizationId,
      action: 'quota_violation',
      resource: 'quota',
      resourceId: quota.quotaId,
      details: { resourceType: quota.resourceType, requested, allowed: violation.allowed }
    });

    return violation;
  }

  // Get quotas for organization
  getQuotas(organizationId: string): ResourceQuota[] {
    const quotaIds = this.orgQuotas.get(organizationId);
    if (!quotaIds) return [];

    return Array.from(quotaIds)
      .map(id => this.quotas.get(id))
      .filter((q): q is ResourceQuota => q !== undefined);
  }

  // Get usage report
  getUsageReport(organizationId: string, period: { start: Date; end: Date }): UsageReport {
    const quotas = this.getQuotas(organizationId);
    
    // Filter events for this org and period
    const orgEvents = this.usageEvents.filter(e => 
      e.organizationId === organizationId &&
      e.timestamp >= period.start &&
      e.timestamp <= period.end
    );

    // Build breakdown
    const breakdown: UsageReport['breakdown'] = {} as any;
    let totalCost = 0;

    for (const quota of quotas) {
      const typeEvents = orgEvents.filter(e => e.resourceType === quota.resourceType);
      const used = typeEvents.reduce((sum, e) => sum + e.amount, 0);
      const cost = typeEvents.reduce((sum, e) => sum + e.cost, 0);
      
      // Find peak usage
      let peakUsage = 0;
      let peakTime = period.start;
      let runningTotal = 0;
      
      for (const event of typeEvents.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())) {
        runningTotal += event.amount;
        if (runningTotal > peakUsage) {
          peakUsage = runningTotal;
          peakTime = event.timestamp;
        }
      }

      breakdown[quota.resourceType] = {
        used,
        limit: quota.limit,
        cost,
        percentUsed: (used / quota.limit) * 100,
        peakUsage,
        peakTime
      };

      totalCost += cost;
    }

    // Get violations
    const violations = this.violations.filter(v => 
      v.organizationId === organizationId &&
      v.timestamp >= period.start &&
      v.timestamp <= period.end
    );

    // Generate recommendations
    const recommendations: string[] = [];
    
    for (const [type, data] of Object.entries(breakdown)) {
      if (data.percentUsed > 90) {
        recommendations.push(`Consider upgrading your plan - ${type} usage at ${data.percentUsed.toFixed(1)}%`);
      }
      if (data.peakUsage > data.limit * 0.5 && data.percentUsed < 50) {
        recommendations.push(`Optimize ${type} usage - high peak but low overall consumption suggests inefficiency`);
      }
    }

    if (totalCost > 1000) {
      recommendations.push('Contact sales for enterprise pricing to reduce costs');
    }

    return {
      organizationId,
      period,
      quotas,
      totalCost,
      breakdown,
      violations,
      recommendations
    };
  }

  // Generate billing record
  generateBilling(organizationId: string, billingPeriod: string): BillingRecord {
    const [year, month] = billingPeriod.split('-').map(Number);
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const report = this.getUsageReport(organizationId, { start, end });

    const lineItems = Object.entries(report.breakdown).map(([resourceType, data]) => ({
      resourceType: resourceType as ResourceType,
      quantity: data.used,
      unitPrice: this.calculateUnitCost(resourceType as ResourceType),
      subtotal: data.cost,
      description: `${resourceType} usage for ${billingPeriod}`
    }));

    const subtotal = lineItems.reduce((sum, item) => sum + item.subtotal, 0);
    const plan = this.getPlanForOrganization(organizationId);
    const discounts = plan ? this.calculateDiscounts(subtotal, plan) : 0;
    const tax = (subtotal - discounts) * 0.08; // 8% tax
    const total = subtotal - discounts + tax;

    const record: BillingRecord = {
      recordId: `billing-${uuidv4()}`,
      organizationId,
      billingPeriod,
      lineItems,
      subtotal,
      discounts,
      tax,
      total,
      status: 'draft',
      createdAt: new Date()
    };

    this.billingRecords.set(record.recordId, record);

    return record;
  }

  // Calculate discounts based on plan
  private calculateDiscounts(subtotal: number, plan: QuotaPlan): number {
    if (plan.planId === 'plan-enterprise') {
      return subtotal * 0.20; // 20% enterprise discount
    }
    if (plan.planId === 'plan-professional' && subtotal > 1000) {
      return subtotal * 0.10; // 10% volume discount
    }
    return 0;
  }

  // Get plan for organization
  private getPlanForOrganization(organizationId: string): QuotaPlan | undefined {
    // In production: Look up from database
    // For now, infer from quotas
    const quotas = this.getQuotas(organizationId);
    if (quotas.length === 0) return undefined;

    const agentQuota = quotas.find(q => q.resourceType === 'agents');
    if (!agentQuota) return undefined;

    if (agentQuota.limit === Infinity) return this.plans.get('plan-enterprise');
    if (agentQuota.limit >= 50) return this.plans.get('plan-professional');
    if (agentQuota.limit >= 10) return this.plans.get('plan-starter');
    return this.plans.get('plan-free');
  }

  // Update custom quota
  async updateQuota(
    quotaId: string,
    updates: Partial<Pick<ResourceQuota, 'limit' | 'softLimit' | 'enforcementAction'>>,
    updatedBy: string
  ): Promise<ResourceQuota> {
    const quota = this.quotas.get(quotaId);
    if (!quota) {
      throw new Error(`Quota ${quotaId} not found`);
    }

    if (updates.limit !== undefined) {
      quota.limit = updates.limit;
      quota.remaining = Math.max(0, quota.limit - quota.used);
      quota.percentUsed = (quota.used / quota.limit) * 100;
    }
    if (updates.softLimit !== undefined) quota.softLimit = updates.softLimit;
    if (updates.enforcementAction !== undefined) quota.enforcementAction = updates.enforcementAction;

    quota.updatedAt = new Date();

    await logAudit({
      userId: updatedBy,
      organizationId: quota.organizationId,
      action: 'quota_updated',
      resource: 'quota',
      resourceId: quotaId,
      details: updates
    });

    return quota;
  }

  // Get available plans
  getPlans(): QuotaPlan[] {
    return Array.from(this.plans.values());
  }

  // Get plan details
  getPlan(planId: string): QuotaPlan | undefined {
    return this.plans.get(planId);
  }

  // Start monitoring
  private startMonitoring(): void {
    this.monitoringInterval = setInterval(() => {
      this.cleanupOldEvents();
    }, 24 * 60 * 60 * 1000); // Daily cleanup
  }

  // Cleanup old events
  private cleanupOldEvents(): void {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - this.EVENT_RETENTION_DAYS);

    const beforeCount = this.usageEvents.length;
    this.usageEvents = this.usageEvents.filter(e => e.timestamp > cutoff);
    const afterCount = this.usageEvents.length;

    logger.info(`Cleaned up ${beforeCount - afterCount} old usage events`);
  }

  // Cleanup
  destroy(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    this.removeAllListeners();
  }
}

// Singleton instance
export const resourceQuotaManager = new ResourceQuotaManager();

// Export types
export type { ResourceQuotaManager };
