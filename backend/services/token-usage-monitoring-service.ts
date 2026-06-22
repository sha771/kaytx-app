/**
 * Token Usage Monitoring Service
 * 
 * Real-time monitoring and tracking of token usage across all AI agents.
 * Provides analytics, alerts, and optimization suggestions for token consumption.
 */

import { BaseService } from './base-service';

// ============================================
// TYPES & INTERFACES
// ============================================

export interface TokenUsageRecord {
  id: string;
  agentId: string;
  agentName: string;
  departmentId: string;
  departmentName: string;
  companyId: string;
  
  // Token counts
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cachedTokens: number;
  
  // Context
  promptLength: number;
  responseLength: number;
  modelUsed: string;
  
  // Timestamps
  timestamp: Date;
  executionDuration: number; // milliseconds
  
  // Metadata
  taskType: string;
  success: boolean;
  errorMessage?: string;
}

export interface TokenUsageAlert {
  id: string;
  companyId: string;
  agentId?: string;
  departmentId?: string;
  
  alertType: 'threshold_exceeded' | 'unusual_spike' | 'budget_warning' | 'inefficient_usage';
  severity: 'low' | 'medium' | 'high' | 'critical';
  
  message: string;
  currentValue: number;
  threshold: number;
  
  timestamp: Date;
  acknowledged: boolean;
}

export interface TokenUsageAnalytics {
  companyId: string;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  
  // Aggregated metrics
  totalTokens: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCachedTokens: number;
  averageTokensPerRequest: number;
  
  // Cost estimates
  estimatedCost: number;
  
  // Breakdown by agent
  agentBreakdown: Array<{
    agentId: string;
    agentName: string;
    totalTokens: number;
    requestCount: number;
    averageTokens: number;
    estimatedCost: number;
  }>;
  
  // Breakdown by department
  departmentBreakdown: Array<{
    departmentId: string;
    departmentName: string;
    totalTokens: number;
    requestCount: number;
    averageTokens: number;
    estimatedCost: number;
  }>;
  
  // Trends
  trend: 'increasing' | 'decreasing' | 'stable';
  trendPercentage: number;
  
  // Efficiency metrics
  cacheHitRate: number;
  averageResponseTime: number;
  successRate: number;
}

export interface TokenBudget {
  companyId: string;
  budgetId: string;
  
  // Budget limits
  monthlyTokenLimit: number;
  monthlyCostLimit: number;
  
  // Current usage
  currentTokenUsage: number;
  currentCostUsage: number;
  
  // Alerts
  alertThresholds: {
    warning: number; // percentage
    critical: number; // percentage
  };
  
  // Period
  periodStart: Date;
  periodEnd: Date;
  
  // Status
  status: 'active' | 'exceeded' | 'warning';
}

// ============================================
// TOKEN USAGE MONITORING SERVICE
// ============================================

export class TokenUsageMonitoringService extends BaseService {
  private tokenRecords: Map<string, TokenUsageRecord[]> = new Map();
  private alerts: Map<string, TokenUsageAlert[]> = new Map();
  private budgets: Map<string, TokenBudget> = new Map();
  private analyticsCache: Map<string, TokenUsageAnalytics> = new Map();

  /**
   * Record token usage for an agent execution
   */
  async recordTokenUsage(record: Omit<TokenUsageRecord, 'id' | 'timestamp'>): Promise<TokenUsageRecord> {
    const fullRecord: TokenUsageRecord = {
      ...record,
      id: this.generateId(),
      timestamp: new Date(),
    };
    
    // Store record
    const companyRecords = this.tokenRecords.get(record.companyId) || [];
    companyRecords.push(fullRecord);
    this.tokenRecords.set(record.companyId, companyRecords);
    
    // Check for alerts
    await this.checkForAlerts(record.companyId, fullRecord);
    
    // Invalidate analytics cache
    this.analyticsCache.delete(record.companyId);
    
    return fullRecord;
  }

  /**
   * Get token usage records for a company
   */
  getTokenUsageRecords(
    companyId: string,
    filters?: {
      agentId?: string;
      departmentId?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): TokenUsageRecord[] {
    const records = this.tokenRecords.get(companyId) || [];
    
    return records.filter(record => {
      if (filters?.agentId && record.agentId !== filters.agentId) return false;
      if (filters?.departmentId && record.departmentId !== filters.departmentId) return false;
      if (filters?.startDate && record.timestamp < filters.startDate) return false;
      if (filters?.endDate && record.timestamp > filters.endDate) return false;
      return true;
    });
  }

  /**
   * Get token usage analytics
   */
  getTokenUsageAnalytics(
    companyId: string,
    period: 'hourly' | 'daily' | 'weekly' | 'monthly',
    endDate: Date = new Date()
  ): TokenUsageAnalytics {
    // Check cache
    const cacheKey = `${companyId}-${period}-${endDate.toISOString()}`;
    const cached = this.analyticsCache.get(cacheKey);
    if (cached) return cached;
    
    // Calculate date range
    const startDate = this.calculateStartDate(period, endDate);
    
    // Get records
    const records = this.getTokenUsageRecords(companyId, { startDate, endDate });
    
    // Calculate aggregated metrics
    const totalTokens = records.reduce((sum, r) => sum + r.totalTokens, 0);
    const totalInputTokens = records.reduce((sum, r) => sum + r.inputTokens, 0);
    const totalOutputTokens = records.reduce((sum, r) => sum + r.outputTokens, 0);
    const totalCachedTokens = records.reduce((sum, r) => sum + (r.cachedTokens || 0), 0);
    const averageTokensPerRequest = records.length > 0 ? totalTokens / records.length : 0;
    
    // Estimate cost (using standard pricing: $0.50/1M input, $1.50/1M output)
    const estimatedCost = (totalInputTokens / 1000000) * 0.50 + (totalOutputTokens / 1000000) * 1.50;
    
    // Agent breakdown
    const agentMap = new Map<string, { count: number; tokens: number; name: string }>();
    records.forEach(r => {
      const existing = agentMap.get(r.agentId) || { count: 0, tokens: 0, name: r.agentName };
      agentMap.set(r.agentId, {
        count: existing.count + 1,
        tokens: existing.tokens + r.totalTokens,
        name: r.agentName,
      });
    });
    
    const agentBreakdown = Array.from(agentMap.entries()).map(([agentId, data]) => ({
      agentId,
      agentName: data.name,
      totalTokens: data.tokens,
      requestCount: data.count,
      averageTokens: data.count > 0 ? data.tokens / data.count : 0,
      estimatedCost: (data.tokens / 1000000) * 1.0, // Average pricing
    }));
    
    // Department breakdown
    const deptMap = new Map<string, { count: number; tokens: number; name: string }>();
    records.forEach(r => {
      const existing = deptMap.get(r.departmentId) || { count: 0, tokens: 0, name: r.departmentName };
      deptMap.set(r.departmentId, {
        count: existing.count + 1,
        tokens: existing.tokens + r.totalTokens,
        name: r.departmentName,
      });
    });
    
    const departmentBreakdown = Array.from(deptMap.entries()).map(([departmentId, data]) => ({
      departmentId,
      departmentName: data.name,
      totalTokens: data.tokens,
      requestCount: data.count,
      averageTokens: data.count > 0 ? data.tokens / data.count : 0,
      estimatedCost: (data.tokens / 1000000) * 1.0,
    }));
    
    // Calculate trend
    const previousEndDate = new Date(startDate.getTime() - 1);
    const previousStartDate = this.calculateStartDate(period, previousEndDate);
    const previousRecords = this.getTokenUsageRecords(companyId, { 
      startDate: previousStartDate, 
      endDate: previousEndDate 
    });
    const previousTotalTokens = previousRecords.reduce((sum, r) => sum + r.totalTokens, 0);
    
    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    let trendPercentage = 0;
    
    if (previousTotalTokens > 0) {
      const change = ((totalTokens - previousTotalTokens) / previousTotalTokens) * 100;
      trendPercentage = Math.abs(change);
      trend = change > 5 ? 'increasing' : change < -5 ? 'decreasing' : 'stable';
    }
    
    // Efficiency metrics
    const cacheHitRate = totalTokens > 0 ? (totalCachedTokens / totalTokens) * 100 : 0;
    const averageResponseTime = records.length > 0 
      ? records.reduce((sum, r) => sum + r.executionDuration, 0) / records.length 
      : 0;
    const successRate = records.length > 0 
      ? (records.filter(r => r.success).length / records.length) * 100 
      : 0;
    
    const analytics: TokenUsageAnalytics = {
      companyId,
      period,
      startDate,
      endDate,
      totalTokens,
      totalInputTokens,
      totalOutputTokens,
      totalCachedTokens,
      averageTokensPerRequest,
      estimatedCost,
      agentBreakdown,
      departmentBreakdown,
      trend,
      trendPercentage,
      cacheHitRate,
      averageResponseTime,
      successRate,
    };
    
    // Cache results
    this.analyticsCache.set(cacheKey, analytics);
    
    return analytics;
  }

  /**
   * Set token budget for a company
   */
  setTokenBudget(budget: Omit<TokenBudget, 'status'>): TokenBudget {
    const currentTokenUsage = this.getCurrentMonthUsage(budget.companyId);
    const currentCostUsage = this.getCurrentMonthCost(budget.companyId);
    
    const usagePercentage = (currentTokenUsage / budget.monthlyTokenLimit) * 100;
    
    let status: 'active' | 'exceeded' | 'warning' = 'active';
    if (usagePercentage >= budget.alertThresholds.critical) {
      status = 'exceeded';
    } else if (usagePercentage >= budget.alertThresholds.warning) {
      status = 'warning';
    }
    
    const fullBudget: TokenBudget = {
      ...budget,
      currentTokenUsage,
      currentCostUsage,
      status,
    };
    
    this.budgets.set(budget.companyId, fullBudget);
    
    return fullBudget;
  }

  /**
   * Get token budget for a company
   */
  getTokenBudget(companyId: string): TokenBudget | undefined {
    return this.budgets.get(companyId);
  }

  /**
   * Get alerts for a company
   */
  getAlerts(companyId: string, acknowledged: boolean = false): TokenUsageAlert[] {
    const alerts = this.alerts.get(companyId) || [];
    return alerts.filter(a => a.acknowledged === acknowledged);
  }

  /**
   * Acknowledge an alert
   */
  acknowledgeAlert(companyId: string, alertId: string): void {
    const alerts = this.alerts.get(companyId) || [];
    const alert = alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      this.alerts.set(companyId, alerts);
    }
  }

  /**
   * Get real-time token usage for active agents
   */
  getRealTimeTokenUsage(companyId: string): {
    activeAgents: number;
    tokensLastHour: number;
    tokensLastDay: number;
    estimatedDailyCost: number;
    topConsumers: Array<{
      agentId: string;
      agentName: string;
      tokens: number;
    }>;
  } {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 3600000);
    const oneDayAgo = new Date(now.getTime() - 86400000);
    
    const records = this.getTokenUsageRecords(companyId);
    
    const tokensLastHour = records
      .filter(r => r.timestamp >= oneHourAgo)
      .reduce((sum, r) => sum + r.totalTokens, 0);
    
    const tokensLastDay = records
      .filter(r => r.timestamp >= oneDayAgo)
      .reduce((sum, r) => sum + r.totalTokens, 0);
    
    const estimatedDailyCost = (tokensLastDay / 1000000) * 1.0;
    
    // Get top consumers
    const agentUsage = new Map<string, { name: string; tokens: number }>();
    records
      .filter(r => r.timestamp >= oneDayAgo)
      .forEach(r => {
        const existing = agentUsage.get(r.agentId) || { name: r.agentName, tokens: 0 };
        agentUsage.set(r.agentId, {
          name: r.agentName,
          tokens: existing.tokens + r.totalTokens,
        });
      });
    
    const topConsumers = Array.from(agentUsage.entries())
      .map(([agentId, data]) => ({ agentId, agentName: data.name, tokens: data.tokens }))
      .sort((a, b) => b.tokens - a.tokens)
      .slice(0, 5);
    
    const activeAgents = new Set(
      records
        .filter(r => r.timestamp >= oneHourAgo)
        .map(r => r.agentId)
    ).size;
    
    return {
      activeAgents,
      tokensLastHour,
      tokensLastDay,
      estimatedDailyCost,
      topConsumers,
    };
  }

  /**
   * Get token usage optimization suggestions
   */
  getOptimizationSuggestions(companyId: string): {
    suggestions: Array<{
      type: 'caching' | 'prompt_optimization' | 'model_selection' | 'batching' | 'deactivation';
      priority: 'high' | 'medium' | 'low';
      description: string;
      estimatedSavings: number; // in USD
      affectedAgents: string[];
    }>;
  } {
    const suggestions: Array<{
      type: 'caching' | 'prompt_optimization' | 'model_selection' | 'batching' | 'deactivation';
      priority: 'high' | 'medium' | 'low';
      description: string;
      estimatedSavings: number;
      affectedAgents: string[];
    }> = [];
    
    const records = this.getTokenUsageRecords(companyId);
    const analytics = this.getTokenUsageAnalytics(companyId, 'daily');
    
    // Check cache hit rate
    if (analytics.cacheHitRate < 10) {
      suggestions.push({
        type: 'caching',
        priority: 'high',
        description: 'Low cache hit rate detected. Implement response caching for similar queries.',
        estimatedSavings: analytics.estimatedCost * 0.20,
        affectedAgents: analytics.agentBreakdown.map(a => a.agentId),
      });
    }
    
    // Check for high token usage per request
    const highTokenAgents = analytics.agentBreakdown.filter(a => a.averageTokens > 5000);
    if (highTokenAgents.length > 0) {
      suggestions.push({
        type: 'prompt_optimization',
        priority: 'high',
        description: 'Some agents have high average token usage. Optimize prompts and responses.',
        estimatedSavings: highTokenAgents.reduce((sum, a) => sum + a.estimatedCost, 0) * 0.15,
        affectedAgents: highTokenAgents.map(a => a.agentId),
      });
    }
    
    // Check for low-usage agents
    const lowUsageAgents = analytics.agentBreakdown.filter(a => a.requestCount < 10);
    if (lowUsageAgents.length > 0) {
      suggestions.push({
        type: 'deactivation',
        priority: 'medium',
        description: 'Some agents have very low usage. Consider deactivating them to save costs.',
        estimatedSavings: lowUsageAgents.length * 10, // $10 per agent
        affectedAgents: lowUsageAgents.map(a => a.agentId),
      });
    }
    
    // Check response time
    if (analytics.averageResponseTime > 3000) {
      suggestions.push({
        type: 'model_selection',
        priority: 'medium',
        description: 'High average response time. Consider using faster models for non-critical tasks.',
        estimatedSavings: analytics.estimatedCost * 0.10,
        affectedAgents: analytics.agentBreakdown.map(a => a.agentId),
      });
    }
    
    // Check for batching opportunities
    const frequentTasks = new Map<string, number>();
    records.forEach(r => {
      frequentTasks.set(r.taskType, (frequentTasks.get(r.taskType) || 0) + 1);
    });
    
    const batchableTasks = Array.from(frequentTasks.entries())
      .filter(([_, count]) => count > 50)
      .map(([task, _]) => task);
    
    if (batchableTasks.length > 0) {
      suggestions.push({
        type: 'batching',
        priority: 'low',
        description: 'Frequent tasks detected. Consider batching similar requests to reduce overhead.',
        estimatedSavings: analytics.estimatedCost * 0.05,
        affectedAgents: analytics.agentBreakdown.map(a => a.agentId),
      });
    }
    
    return { suggestions };
  }

  // ============================================
  // PRIVATE METHODS
  // ============================================

  private generateId(): string {
    return `token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private calculateStartDate(period: 'hourly' | 'daily' | 'weekly' | 'monthly', endDate: Date): Date {
    const startDate = new Date(endDate);
    
    switch (period) {
      case 'hourly':
        startDate.setHours(startDate.getHours() - 1);
        break;
      case 'daily':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 'weekly':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'monthly':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
    }
    
    return startDate;
  }

  private getCurrentMonthUsage(companyId: string): number {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const records = this.getTokenUsageRecords(companyId, { 
      startDate: monthStart, 
      endDate: now 
    });
    
    return records.reduce((sum, r) => sum + r.totalTokens, 0);
  }

  private getCurrentMonthCost(companyId: string): number {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const records = this.getTokenUsageRecords(companyId, { 
      startDate: monthStart, 
      endDate: now 
    });
    
    const totalInputTokens = records.reduce((sum, r) => sum + r.inputTokens, 0);
    const totalOutputTokens = records.reduce((sum, r) => sum + r.outputTokens, 0);
    
    return (totalInputTokens / 1000000) * 0.50 + (totalOutputTokens / 1000000) * 1.50;
  }

  private async checkForAlerts(companyId: string, record: TokenUsageRecord): Promise<void> {
    const budget = this.budgets.get(companyId);
    if (!budget) return;
    
    const alerts: TokenUsageAlert[] = this.alerts.get(companyId) || [];
    
    // Check budget threshold
    const usagePercentage = (budget.currentTokenUsage / budget.monthlyTokenLimit) * 100;
    
    if (usagePercentage >= budget.alertThresholds.critical) {
      alerts.push({
        id: this.generateId(),
        companyId,
        agentId: record.agentId,
        departmentId: record.departmentId,
        alertType: 'budget_warning',
        severity: 'critical',
        message: `Token budget critical: ${usagePercentage.toFixed(1)}% of monthly limit used`,
        currentValue: budget.currentTokenUsage,
        threshold: budget.monthlyTokenLimit,
        timestamp: new Date(),
        acknowledged: false,
      });
    } else if (usagePercentage >= budget.alertThresholds.warning) {
      alerts.push({
        id: this.generateId(),
        companyId,
        agentId: record.agentId,
        departmentId: record.departmentId,
        alertType: 'budget_warning',
        severity: 'medium',
        message: `Token budget warning: ${usagePercentage.toFixed(1)}% of monthly limit used`,
        currentValue: budget.currentTokenUsage,
        threshold: budget.monthlyTokenLimit,
        timestamp: new Date(),
        acknowledged: false,
      });
    }
    
    // Check for unusual spike
    const recentRecords = this.getTokenUsageRecords(companyId, {
      startDate: new Date(Date.now() - 3600000), // Last hour
    });
    
    const avgTokens = recentRecords.length > 0
      ? recentRecords.reduce((sum, r) => sum + r.totalTokens, 0) / recentRecords.length
      : 0;
    
    if (record.totalTokens > avgTokens * 3 && avgTokens > 0) {
      alerts.push({
        id: this.generateId(),
        companyId,
        agentId: record.agentId,
        departmentId: record.departmentId,
        alertType: 'unusual_spike',
        severity: 'high',
        message: `Unusual token spike detected for agent ${record.agentName}`,
        currentValue: record.totalTokens,
        threshold: avgTokens * 3,
        timestamp: new Date(),
        acknowledged: false,
      });
    }
    
    this.alerts.set(companyId, alerts);
  }
}

// Export singleton instance
export const tokenUsageMonitoringService = new TokenUsageMonitoringService();
