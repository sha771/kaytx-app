/**
 * AI Agent Cost Tracking Service
 * 
 * Tracks token usage, cloud costs, and billing for AI agents running on cloud infrastructure.
 * Companies can activate departments and agents as required, with cost tracking per activation.
 */

import { BaseService } from './base-service';

// ============================================
// TYPES & INTERFACES
// ============================================

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cachedTokens?: number;
}

export interface AgentCostMetrics {
  agentId: string;
  agentName: string;
  departmentId: string;
  departmentName: string;
  companyId: string;
  
  // Token usage
  tokenUsage: TokenUsage;
  
  // Cost calculations
  inputCost: number; // in USD
  outputCost: number; // in USD
  totalCost: number; // in USD
  
  // Cloud infrastructure costs
  computeCost: number; // in USD
  storageCost: number; // in USD
  networkCost: number; // in USD
  
  // Time tracking
  executionTime: number; // in milliseconds
  timestamp: Date;
  
  // Agent tier
  tier: 'standard' | 'premium' | 'enterprise';
}

export interface DepartmentCostSummary {
  departmentId: string;
  departmentName: string;
  companyId: string;
  
  // Aggregated costs
  totalCost: number;
  totalTokenUsage: TokenUsage;
  totalComputeCost: number;
  totalStorageCost: number;
  totalNetworkCost: number;
  
  // Agent counts
  activeAgents: number;
  totalAgents: number;
  
  // Time period
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
}

export interface CompanyCostSummary {
  companyId: string;
  companyName: string;
  
  // Aggregated costs
  totalCost: number;
  totalTokenUsage: TokenUsage;
  totalComputeCost: number;
  totalStorageCost: number;
  totalNetworkCost: number;
  
  // Department breakdown
  departmentCosts: DepartmentCostSummary[];
  
  // Active departments and agents
  activeDepartments: number;
  totalDepartments: number;
  activeAgents: number;
  totalAgents: number;
  
  // Time period
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
}

export interface PricingTier {
  tier: 'standard' | 'premium' | 'enterprise';
  
  // Token pricing (per 1M tokens)
  inputTokenPrice: number; // USD per 1M input tokens
  outputTokenPrice: number; // USD per 1M output tokens
  
  // Cloud infrastructure pricing (per hour)
  computePrice: number; // USD per hour
  storagePrice: number; // USD per GB per month
  networkPrice: number; // USD per GB transferred
  
  // Monthly base fee
  baseFee: number; // USD per month
  
  // Features
  maxConcurrentAgents: number;
  maxTokensPerMonth: number;
  supportLevel: 'basic' | 'priority' | 'dedicated';
}

// ============================================
// PRICING TIERS
// ============================================

export const PRICING_TIERS: Record<string, PricingTier> = {
  standard: {
    tier: 'standard',
    inputTokenPrice: 0.50, // $0.50 per 1M input tokens
    outputTokenPrice: 1.50, // $1.50 per 1M output tokens
    computePrice: 0.10, // $0.10 per hour
    storagePrice: 0.023, // $0.023 per GB per month
    networkPrice: 0.09, // $0.09 per GB transferred
    baseFee: 99, // $99 per month
    maxConcurrentAgents: 10,
    maxTokensPerMonth: 10000000, // 10M tokens per month
    supportLevel: 'basic',
  },
  premium: {
    tier: 'premium',
    inputTokenPrice: 0.30, // $0.30 per 1M input tokens
    outputTokenPrice: 0.90, // $0.90 per 1M output tokens
    computePrice: 0.15, // $0.15 per hour
    storagePrice: 0.023, // $0.023 per GB per month
    networkPrice: 0.09, // $0.09 per GB transferred
    baseFee: 499, // $499 per month
    maxConcurrentAgents: 50,
    maxTokensPerMonth: 100000000, // 100M tokens per month
    supportLevel: 'priority',
  },
  enterprise: {
    tier: 'enterprise',
    inputTokenPrice: 0.15, // $0.15 per 1M input tokens
    outputTokenPrice: 0.45, // $0.45 per 1M output tokens
    computePrice: 0.25, // $0.25 per hour
    storagePrice: 0.021, // $0.021 per GB per month
    networkPrice: 0.08, // $0.08 per GB transferred
    baseFee: 1999, // $1,999 per month
    maxConcurrentAgents: 200,
    maxTokensPerMonth: 1000000000, // 1B tokens per month
    supportLevel: 'dedicated',
  },
};

// ============================================
// DEPARTMENT PRICING
// ============================================

export const DEPARTMENT_PRICING: Record<string, {
  baseActivationCost: number; // One-time activation cost
  monthlyMaintenanceCost: number; // Monthly maintenance
  agentMultiplier: number; // Multiplier for agent costs
}> = {
  'customer-experience': { baseActivationCost: 50, monthlyMaintenanceCost: 25, agentMultiplier: 1.0 },
  'sales-revenue': { baseActivationCost: 75, monthlyMaintenanceCost: 35, agentMultiplier: 1.2 },
  'marketing-growth': { baseActivationCost: 75, monthlyMaintenanceCost: 35, agentMultiplier: 1.2 },
  'operations-management': { baseActivationCost: 100, monthlyMaintenanceCost: 50, agentMultiplier: 1.5 },
  'finance-accounting': { baseActivationCost: 100, monthlyMaintenanceCost: 50, agentMultiplier: 1.5 },
  'technology-engineering': { baseActivationCost: 150, monthlyMaintenanceCost: 75, agentMultiplier: 2.0 },
  'human-resources': { baseActivationCost: 75, monthlyMaintenanceCost: 35, agentMultiplier: 1.2 },
  'legal-compliance': { baseActivationCost: 125, monthlyMaintenanceCost: 60, agentMultiplier: 1.8 },
  'data-intelligence': { baseActivationCost: 125, monthlyMaintenanceCost: 60, agentMultiplier: 1.8 },
  'product-management': { baseActivationCost: 100, monthlyMaintenanceCost: 50, agentMultiplier: 1.5 },
  'security-risk': { baseActivationCost: 150, monthlyMaintenanceCost: 75, agentMultiplier: 2.0 },
  'research-development': { baseActivationCost: 175, monthlyMaintenanceCost: 85, agentMultiplier: 2.2 },
  'administrative': { baseActivationCost: 50, monthlyMaintenanceCost: 25, agentMultiplier: 1.0 },
  'trading-investments': { baseActivationCost: 200, monthlyMaintenanceCost: 100, agentMultiplier: 2.5 },
  'healthcare': { baseActivationCost: 175, monthlyMaintenanceCost: 85, agentMultiplier: 2.2 },
  'insurance': { baseActivationCost: 150, monthlyMaintenanceCost: 75, agentMultiplier: 2.0 },
  'government': { baseActivationCost: 200, monthlyMaintenanceCost: 100, agentMultiplier: 2.5 },
  'manufacturing': { baseActivationCost: 150, monthlyMaintenanceCost: 75, agentMultiplier: 2.0 },
  'real-estate': { baseActivationCost: 125, monthlyMaintenanceCost: 60, agentMultiplier: 1.8 },
  'education': { baseActivationCost: 100, monthlyMaintenanceCost: 50, agentMultiplier: 1.5 },
  'gaming-esports': { baseActivationCost: 125, monthlyMaintenanceCost: 60, agentMultiplier: 1.8 },
  'supply-chain': { baseActivationCost: 150, monthlyMaintenanceCost: 75, agentMultiplier: 2.0 },
};

// ============================================
// COST TRACKING SERVICE
// ============================================

export class AgentCostTrackingService extends BaseService {
  private costMetrics: Map<string, AgentCostMetrics[]> = new Map();
  private departmentSummaries: Map<string, DepartmentCostSummary[]> = new Map();
  private companySummaries: Map<string, CompanyCostSummary[]> = new Map();

  /**
   * Calculate token cost based on pricing tier
   */
  calculateTokenCost(
    tokenUsage: TokenUsage,
    tier: 'standard' | 'premium' | 'enterprise'
  ): { inputCost: number; outputCost: number; totalCost: number } {
    const pricing = PRICING_TIERS[tier];
    
    const inputCost = (tokenUsage.inputTokens / 1000000) * pricing.inputTokenPrice;
    const outputCost = (tokenUsage.outputTokens / 1000000) * pricing.outputTokenPrice;
    const totalCost = inputCost + outputCost;
    
    return { inputCost, outputCost, totalCost };
  }

  /**
   * Calculate cloud infrastructure cost
   */
  calculateCloudCost(
    executionTime: number, // in milliseconds
    storageUsed: number, // in GB
    networkTransferred: number, // in GB
    tier: 'standard' | 'premium' | 'enterprise'
  ): { computeCost: number; storageCost: number; networkCost: number; totalCost: number } {
    const pricing = PRICING_TIERS[tier];
    
    const computeCost = (executionTime / 3600000) * pricing.computePrice; // Convert ms to hours
    const storageCost = storageUsed * pricing.storagePrice;
    const networkCost = networkTransferred * pricing.networkPrice;
    const totalCost = computeCost + storageCost + networkCost;
    
    return { computeCost, storageCost, networkCost, totalCost };
  }

  /**
   * Record agent execution cost
   */
  async recordAgentExecution(metrics: Omit<AgentCostMetrics, 'inputCost' | 'outputCost' | 'totalCost' | 'computeCost' | 'storageCost' | 'networkCost'>): Promise<AgentCostMetrics> {
    const tokenCosts = this.calculateTokenCost(metrics.tokenUsage, metrics.tier);
    const cloudCosts = this.calculateCloudCost(
      metrics.executionTime,
      0, // storageUsed - would need to be tracked separately
      0, // networkTransferred - would need to be tracked separately
      metrics.tier
    );
    
    const fullMetrics: AgentCostMetrics = {
      ...metrics,
      inputCost: tokenCosts.inputCost,
      outputCost: tokenCosts.outputCost,
      totalCost: tokenCosts.totalCost + cloudCosts.totalCost,
      computeCost: cloudCosts.computeCost,
      storageCost: cloudCosts.storageCost,
      networkCost: cloudCosts.networkCost,
    };
    
    // Store metrics
    const companyMetrics = this.costMetrics.get(metrics.companyId) || [];
    companyMetrics.push(fullMetrics);
    this.costMetrics.set(metrics.companyId, companyMetrics);
    
    return fullMetrics;
  }

  /**
   * Get agent cost history
   */
  getAgentCostHistory(
    companyId: string,
    agentId: string,
    startDate: Date,
    endDate: Date
  ): AgentCostMetrics[] {
    const companyMetrics = this.costMetrics.get(companyId) || [];
    return companyMetrics.filter(
      m => m.agentId === agentId &&
      m.timestamp >= startDate &&
      m.timestamp <= endDate
    );
  }

  /**
   * Calculate department cost summary
   */
  calculateDepartmentCostSummary(
    companyId: string,
    departmentId: string,
    departmentName: string,
    period: 'hourly' | 'daily' | 'weekly' | 'monthly',
    startDate: Date,
    endDate: Date
  ): DepartmentCostSummary {
    const companyMetrics = this.costMetrics.get(companyId) || [];
    const departmentMetrics = companyMetrics.filter(
      m => m.departmentId === departmentId &&
      m.timestamp >= startDate &&
      m.timestamp <= endDate
    );
    
    const totalTokenUsage: TokenUsage = {
      inputTokens: departmentMetrics.reduce((sum, m) => sum + m.tokenUsage.inputTokens, 0),
      outputTokens: departmentMetrics.reduce((sum, m) => sum + m.tokenUsage.outputTokens, 0),
      totalTokens: departmentMetrics.reduce((sum, m) => sum + m.tokenUsage.totalTokens, 0),
      cachedTokens: departmentMetrics.reduce((sum, m) => sum + (m.tokenUsage.cachedTokens || 0), 0),
    };
    
    const totalCost = departmentMetrics.reduce((sum, m) => sum + m.totalCost, 0);
    const totalComputeCost = departmentMetrics.reduce((sum, m) => sum + m.computeCost, 0);
    const totalStorageCost = departmentMetrics.reduce((sum, m) => sum + m.storageCost, 0);
    const totalNetworkCost = departmentMetrics.reduce((sum, m) => sum + m.networkCost, 0);
    
    const activeAgents = new Set(departmentMetrics.map(m => m.agentId)).size;
    const totalAgents = activeAgents; // Would need to be tracked separately
    
    return {
      departmentId,
      departmentName,
      companyId,
      totalCost,
      totalTokenUsage,
      totalComputeCost,
      totalStorageCost,
      totalNetworkCost,
      activeAgents,
      totalAgents,
      period,
      startDate,
      endDate,
    };
  }

  /**
   * Calculate company cost summary
   */
  calculateCompanyCostSummary(
    companyId: string,
    companyName: string,
    departmentIds: string[],
    period: 'hourly' | 'daily' | 'weekly' | 'monthly',
    startDate: Date,
    endDate: Date
  ): CompanyCostSummary {
    const departmentCosts: DepartmentCostSummary[] = [];
    let totalCost = 0;
    let totalTokenUsage: TokenUsage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 };
    let totalComputeCost = 0;
    let totalStorageCost = 0;
    let totalNetworkCost = 0;
    let activeAgents = 0;
    
    for (const deptId of departmentIds) {
      const deptSummary = this.calculateDepartmentCostSummary(
        companyId,
        deptId,
        '', // Would need department name mapping
        period,
        startDate,
        endDate
      );
      departmentCosts.push(deptSummary);
      
      totalCost += deptSummary.totalCost;
      totalTokenUsage.inputTokens += deptSummary.totalTokenUsage.inputTokens;
      totalTokenUsage.outputTokens += deptSummary.totalTokenUsage.outputTokens;
      totalTokenUsage.totalTokens += deptSummary.totalTokenUsage.totalTokens;
      totalComputeCost += deptSummary.totalComputeCost;
      totalStorageCost += deptSummary.totalStorageCost;
      totalNetworkCost += deptSummary.totalNetworkCost;
      activeAgents += deptSummary.activeAgents;
    }
    
    return {
      companyId,
      companyName,
      totalCost,
      totalTokenUsage,
      totalComputeCost,
      totalStorageCost,
      totalNetworkCost,
      departmentCosts,
      activeDepartments: departmentCosts.filter(d => d.activeAgents > 0).length,
      totalDepartments: departmentIds.length,
      activeAgents,
      totalAgents: activeAgents, // Would need to be tracked separately
      period,
      startDate,
      endDate,
    };
  }

  /**
   * Estimate monthly cost for a company
   */
  estimateMonthlyCost(
    companyId: string,
    activeDepartments: string[],
    activeAgents: Map<string, number>, // departmentId -> agentCount
    estimatedDailyTokensPerAgent: number,
    tier: 'standard' | 'premium' | 'enterprise'
  ): {
    estimatedMonthlyCost: number;
    breakdown: {
      baseFee: number;
      departmentActivationCosts: number;
      departmentMaintenanceCosts: number;
      tokenCosts: number;
      cloudCosts: number;
    };
  } {
    const pricing = PRICING_TIERS[tier];
    
    // Base fee
    const baseFee = pricing.baseFee;
    
    // Department activation costs
    let departmentActivationCosts = 0;
    let departmentMaintenanceCosts = 0;
    
    for (const deptId of activeDepartments) {
      const deptPricing = DEPARTMENT_PRICING[deptId];
      if (deptPricing) {
        departmentActivationCosts += deptPricing.baseActivationCost;
        departmentMaintenanceCosts += deptPricing.monthlyMaintenanceCost;
      }
    }
    
    // Token costs
    const totalAgents = Array.from(activeAgents.values()).reduce((sum, count) => sum + count, 0);
    const estimatedMonthlyTokens = totalAgents * estimatedDailyTokensPerAgent * 30;
    const estimatedTokenCosts = (estimatedMonthlyTokens / 1000000) * 
      ((pricing.inputTokenPrice + pricing.outputTokenPrice) / 2);
    
    // Cloud costs (assuming 8 hours/day operation)
    const estimatedCloudHours = totalAgents * 8 * 30;
    const estimatedCloudCosts = estimatedCloudHours * pricing.computePrice;
    
    const estimatedMonthlyCost = baseFee + departmentActivationCosts + 
      departmentMaintenanceCosts + estimatedTokenCosts + estimatedCloudCosts;
    
    return {
      estimatedMonthlyCost,
      breakdown: {
        baseFee,
        departmentActivationCosts,
        departmentMaintenanceCosts,
        tokenCosts: estimatedTokenCosts,
        cloudCosts: estimatedCloudCosts,
      },
    };
  }

  /**
   * Get cost optimization recommendations
   */
  getCostOptimizationRecommendations(
    companyId: string,
    period: 'hourly' | 'daily' | 'weekly' | 'monthly'
  ): {
    recommendations: string[];
    potentialSavings: number;
  } {
    const recommendations: string[] = [];
    let potentialSavings = 0;
    
    const companyMetrics = this.costMetrics.get(companyId) || [];
    
    // Analyze token usage patterns
    const avgTokensPerExecution = companyMetrics.length > 0
      ? companyMetrics.reduce((sum, m) => sum + m.tokenUsage.totalTokens, 0) / companyMetrics.length
      : 0;
    
    if (avgTokensPerExecution > 10000) {
      recommendations.push('Consider implementing response caching to reduce token usage');
      potentialSavings += companyMetrics.length * 0.01; // Estimated savings
    }
    
    // Analyze execution time
    const avgExecutionTime = companyMetrics.length > 0
      ? companyMetrics.reduce((sum, m) => sum + m.executionTime, 0) / companyMetrics.length
      : 0;
    
    if (avgExecutionTime > 5000) { // > 5 seconds
      recommendations.push('Optimize agent logic to reduce execution time and compute costs');
      potentialSavings += companyMetrics.length * 0.02;
    }
    
    // Check for inactive agents
    const agentUsage = new Map<string, number>();
    companyMetrics.forEach(m => {
      agentUsage.set(m.agentId, (agentUsage.get(m.agentId) || 0) + 1);
    });
    
    const inactiveAgents = Array.from(agentUsage.entries())
      .filter(([_, count]) => count < 10)
      .map(([agentId, _]) => agentId);
    
    if (inactiveAgents.length > 0) {
      recommendations.push(`Consider deactivating ${inactiveAgents.length} low-usage agents to save costs`);
      potentialSavings += inactiveAgents.length * 50; // Estimated savings per agent
    }
    
    return {
      recommendations,
      potentialSavings,
    };
  }
}

// Export singleton instance
export const agentCostTrackingService = new AgentCostTrackingService();
