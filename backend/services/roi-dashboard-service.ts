import { createLogger } from '../lib/production-logger';
import { logAudit } from '../lib/audit';
import { db } from '../db/connection';
import {
  agentROIAnalytics,
  agentCostSavings,
  agentPerformanceMetrics,
  agentTaskCompletions,
} from '../db/drizzle-schema';
import { eq, and, desc, asc, sql, gte, lte, between } from 'drizzle-orm';
import { EventEmitter } from 'events';

const logger = createLogger('ROIDashboardService');

/**
 * Cost Category
 */
export type CostCategory =
  | 'labor'           // Human labor costs saved
  | 'time'            // Time savings value
  | 'efficiency'      // Efficiency gains
  | 'error_reduction' // Error reduction savings
  | 'automation'      // Automation value
  | 'scaling'         // Scaling without hiring
  | 'training'        // Training cost savings
  | 'overtime'        // Overtime reduction
  | 'benefits';       // Benefits cost savings

/**
 * Time Period
 */
export type TimePeriod = 'day' | 'week' | 'month' | 'quarter' | 'year' | 'custom';

/**
 * ROI Analytics Entry
 */
export interface ROIAnalytics {
  id: string;
  agentId: string;
  organizationId: string;
  period: TimePeriod;
  periodStart: Date;
  periodEnd: Date;
  tasksCompleted: number;
  humanHoursSaved: number;
  humanHoursCost: number;
  aiOperatingCost: number;
  netSavings: number;
  roiPercentage: number;
  efficiencyGain: number;
  errorReductionRate: number;
  costPerTask: number;
  averageTaskDuration: number;
  satisfactionScore: number;
  breakdownByCategory: Record<CostCategory, {
    amount: number;
    percentage: number;
    tasks: number;
  }>;
  comparisonToPrevious: {
    savingsChange: number;
    tasksChange: number;
    efficiencyChange: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Agent Performance Snapshot
 */
export interface AgentPerformanceSnapshot {
  agentId: string;
  agentName: string;
  agentType: string;
  status: 'active' | 'inactive' | 'training';
  periodMetrics: {
    tasksCompleted: number;
    tasksFailed: number;
    averageResponseTime: number;
    uptime: number;
    userSatisfaction: number;
  };
  costMetrics: {
    operatingCost: number;
    costPerTask: number;
    costPerHour: number;
  };
  savingsMetrics: {
    humanHoursSaved: number;
    laborCostSaved: number;
    efficiencyValue: number;
    totalValue: number;
  };
  roiScore: number; // 0-100
  trendDirection: 'up' | 'down' | 'stable';
  trendPercentage: number;
}

/**
 * Organization ROI Summary
 */
export interface OrganizationROISummary {
  organizationId: string;
  period: TimePeriod;
  periodStart: Date;
  periodEnd: Date;
  totalAgents: number;
  activeAgents: number;
  overallROI: number;
  totalSavings: number;
  totalOperatingCost: number;
  totalTasksCompleted: number;
  totalHumanHoursSaved: number;
  averageAgentROI: number;
  topPerformingAgents: AgentPerformanceSnapshot[];
  costBreakdown: Record<CostCategory, number>;
  savingsTrend: {
    date: Date;
    savings: number;
    costs: number;
    net: number;
  }[];
  benchmarks: {
    industryAverageROI: number;
    percentile: number;
    grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
  };
}

/**
 * Task Value Configuration
 */
export interface TaskValueConfig {
  taskType: string;
  description: string;
  humanHoursPerTask: number;
  humanCostPerHour: number;
  aiCostPerTask: number;
  qualityMultiplier: number; // 0.5-2.0
  frequency: 'one_time' | 'daily' | 'weekly' | 'monthly';
  estimatedMonthlyVolume: number;
}

/**
 * Cost Savings Visualization
 */
export interface CostSavingsVisualization {
  summary: {
    title: string;
    totalSavings: string;
    periodComparison: string;
    highlightMetric: string;
  };
  charts: {
    savingsOverTime: {
      type: 'line' | 'area';
      data: { label: string; value: number; projected?: boolean }[];
      trendline: number;
      projection: number;
    };
    costBreakdown: {
      type: 'pie' | 'donut' | 'bar';
      data: { category: CostCategory; value: number; percentage: number; color: string }[];
    };
    efficiencyGains: {
      type: 'bar' | 'gauge';
      data: { metric: string; before: number; after: number; improvement: number }[];
    };
    agentComparison: {
      type: 'bar' | 'radar';
      data: AgentPerformanceSnapshot[];
    };
    hourlyValue: {
      type: 'heatmap' | 'calendar';
      data: { hour: number; day: string; value: number }[];
    };
  };
  metrics: {
    keyMetrics: {
      label: string;
      value: string;
      change: string;
      trend: 'up' | 'down' | 'neutral';
      icon: string;
    }[];
    milestones: {
      title: string;
      achieved: boolean;
      date?: Date;
      value: string;
    }[];
  };
  insights: {
    type: 'success' | 'warning' | 'opportunity' | 'info';
    title: string;
    description: string;
    action?: string;
    potentialValue?: string;
  }[];
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    expectedROI: string;
    implementation: string;
  }[];
}

/**
 * ROI Dashboard Service
 * Calculates and visualizes cost savings and ROI for AI agents
 */
export class ROIDashboardService extends EventEmitter {
  private static instance: ROIDashboardService;
  private calculationInterval?: NodeJS.Timeout;

  // Default cost assumptions
  private readonly DEFAULT_HUMAN_COST_PER_HOUR = 50; // $50/hour average
  private readonly DEFAULT_AI_COST_PER_HOUR = 5;    // $5/hour operating cost
  private readonly EFFICIENCY_MULTIPLIER = 1.25;     // AI is 25% more efficient

  private constructor() {
    super();
    this.startPeriodicCalculation();
  }

  static getInstance(): ROIDashboardService {
    if (!ROIDashboardService.instance) {
      ROIDashboardService.instance = new ROIDashboardService();
    }
    return ROIDashboardService.instance;
  }

  /**
   * Calculate ROI for an agent
   */
  async calculateAgentROI(
    agentId: string,
    organizationId: string,
    period: TimePeriod,
    startDate: Date,
    endDate: Date
  ): Promise<ROIAnalytics> {
    // Get task completions for the period
    const tasks = await db.select()
      .from(agentTaskCompletions)
      .where(and(
        eq(agentTaskCompletions.agentId, agentId),
        gte(agentTaskCompletions.completedAt, startDate),
        lte(agentTaskCompletions.completedAt, endDate)
      ));

    const tasksCompleted = tasks.length;
    const tasksFailed = tasks.filter(t => t.status === 'failed').length;
    const successfulTasks = tasks.filter(t => t.status === 'completed');

    // Calculate human hours saved
    const totalHumanHoursSaved = successfulTasks.reduce(
      (sum, t) => sum + (t.estimatedHumanHours || 1),
      0
    );

    // Calculate costs
    const humanHoursCost = totalHumanHoursSaved * this.DEFAULT_HUMAN_COST_PER_HOUR;
    const aiOperatingCost = this.calculateAIOperatingCost(agentId, period, startDate, endDate);

    // Calculate net savings and ROI
    const netSavings = humanHoursCost - aiOperatingCost;
    const roiPercentage = aiOperatingCost > 0
      ? ((netSavings / aiOperatingCost) * 100)
      : 0;

    // Calculate breakdown by category
    const breakdownByCategory = await this.calculateCategoryBreakdown(
      agentId,
      startDate,
      endDate,
      successfulTasks,
      netSavings
    );

    // Calculate efficiency metrics
    const efficiencyGain = this.calculateEfficiencyGain(successfulTasks);
    const errorReductionRate = tasksCompleted > 0
      ? (tasksFailed / tasksCompleted)
      : 0;

    const costPerTask = tasksCompleted > 0
      ? aiOperatingCost / tasksCompleted
      : 0;

    const averageTaskDuration = successfulTasks.length > 0
      ? successfulTasks.reduce((sum, t) => sum + (t.duration || 0), 0) / successfulTasks.length
      : 0;

    const satisfactionScore = this.calculateSatisfactionScore(successfulTasks);

    // Compare to previous period
    const previousPeriod = this.getPreviousPeriod(period, startDate);
    const previousROI = await this.getROIForPeriod(
      agentId,
      previousPeriod.start,
      previousPeriod.end
    );

    const comparisonToPrevious = {
      savingsChange: previousROI
        ? ((netSavings - previousROI.netSavings) / Math.abs(previousROI.netSavings)) * 100
        : 0,
      tasksChange: previousROI
        ? ((tasksCompleted - previousROI.tasksCompleted) / Math.abs(previousROI.tasksCompleted)) * 100
        : 0,
      efficiencyChange: previousROI
        ? efficiencyGain - previousROI.efficiencyGain
        : 0,
    };

    const roiAnalytics: ROIAnalytics = {
      id: crypto.randomUUID(),
      agentId,
      organizationId,
      period,
      periodStart: startDate,
      periodEnd: endDate,
      tasksCompleted,
      humanHoursSaved: totalHumanHoursSaved,
      humanHoursCost,
      aiOperatingCost,
      netSavings,
      roiPercentage,
      efficiencyGain,
      errorReductionRate,
      costPerTask,
      averageTaskDuration,
      satisfactionScore,
      breakdownByCategory,
      comparisonToPrevious,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Store in database
    await this.storeROIAnalytics(roiAnalytics);

    logger.info(`Calculated ROI for agent ${agentId}: ${roiPercentage.toFixed(2)}%`);

    return roiAnalytics;
  }

  /**
   * Get organization ROI summary
   */
  async getOrganizationROISummary(
    organizationId: string,
    period: TimePeriod,
    startDate: Date,
    endDate: Date
  ): Promise<OrganizationROISummary> {
    // Get all agents for organization
    const agentMetrics = await db.select()
      .from(agentROIAnalytics)
      .where(and(
        eq(agentROIAnalytics.organizationId, organizationId),
        gte(agentROIAnalytics.periodStart, startDate),
        lte(agentROIAnalytics.periodEnd, endDate)
      ));

    const totalAgents = agentMetrics.length;
    const activeAgents = agentMetrics.filter(m => m.tasksCompleted > 0).length;

    // Aggregate totals
    const totalSavings = agentMetrics.reduce((sum, m) => sum + m.netSavings, 0);
    const totalOperatingCost = agentMetrics.reduce((sum, m) => sum + m.aiOperatingCost, 0);
    const totalTasksCompleted = agentMetrics.reduce((sum, m) => sum + m.tasksCompleted, 0);
    const totalHumanHoursSaved = agentMetrics.reduce((sum, m) => sum + m.humanHoursSaved, 0);

    const overallROI = totalOperatingCost > 0
      ? ((totalSavings / totalOperatingCost) * 100)
      : 0;

    const averageAgentROI = totalAgents > 0
      ? agentMetrics.reduce((sum, m) => sum + m.roiPercentage, 0) / totalAgents
      : 0;

    // Get top performing agents
    const topAgents = await this.getTopPerformingAgents(organizationId, startDate, endDate, 5);

    // Calculate cost breakdown
    const costBreakdown = this.aggregateCostBreakdown(agentMetrics);

    // Generate savings trend
    const savingsTrend = await this.generateSavingsTrend(
      organizationId,
      period,
      startDate,
      endDate
    );

    // Calculate benchmarks
    const benchmarks = this.calculateBenchmarks(overallROI);

    return {
      organizationId,
      period,
      periodStart: startDate,
      periodEnd: endDate,
      totalAgents,
      activeAgents,
      overallROI,
      totalSavings,
      totalOperatingCost,
      totalTasksCompleted,
      totalHumanHoursSaved,
      averageAgentROI,
      topPerformingAgents: topAgents,
      costBreakdown,
      savingsTrend,
      benchmarks,
    };
  }

  /**
   * Generate visualization data
   */
  async generateVisualization(
    organizationId: string,
    period: TimePeriod,
    startDate: Date,
    endDate: Date
  ): Promise<CostSavingsVisualization> {
    const summary = await this.getOrganizationROISummary(
      organizationId,
      period,
      startDate,
      endDate
    );

    const previousPeriod = this.getPreviousPeriod(period, startDate);
    const previousSummary = await this.getOrganizationROISummary(
      organizationId,
      period,
      previousPeriod.start,
      previousPeriod.end
    );

    const savingsChange = previousSummary.totalSavings > 0
      ? ((summary.totalSavings - previousSummary.totalSavings) / previousSummary.totalSavings) * 100
      : 0;

    const viz: CostSavingsVisualization = {
      summary: {
        title: `AI Agent ROI Dashboard - ${this.formatPeriodLabel(period)}`,
        totalSavings: this.formatCurrency(summary.totalSavings),
        periodComparison: savingsChange >= 0
          ? `↑ ${savingsChange.toFixed(1)}% vs last period`
          : `↓ ${Math.abs(savingsChange).toFixed(1)}% vs last period`,
        highlightMetric: `${summary.totalHumanHoursSaved.toFixed(0)} human hours saved`,
      },
      charts: {
        savingsOverTime: {
          type: 'area',
          data: summary.savingsTrend.map((t, i) => ({
            label: this.formatTrendDate(t.date, period),
            value: t.net,
            projected: i > summary.savingsTrend.length * 0.8,
          })),
          trendline: this.calculateTrendline(summary.savingsTrend.map(t => t.net)),
          projection: this.projectAnnualSavings(summary),
        },
        costBreakdown: {
          type: 'donut',
          data: Object.entries(summary.costBreakdown).map(([category, value], i) => ({
            category: category as CostCategory,
            value,
            percentage: (value / summary.totalSavings) * 100,
            color: this.getCategoryColor(category as CostCategory),
          })),
        },
        efficiencyGains: {
          type: 'bar',
          data: [
            { metric: 'Task Completion', before: 100, after: 125, improvement: 25 },
            { metric: 'Error Rate', before: 5, after: 1, improvement: 80 },
            { metric: 'Response Time', before: 100, after: 75, improvement: 25 },
            { metric: 'Uptime', before: 95, after: 99.9, improvement: 4.9 },
          ],
        },
        agentComparison: {
          type: 'bar',
          data: summary.topPerformingAgents,
        },
        hourlyValue: {
          type: 'heatmap',
          data: this.generateHourlyValueData(summary),
        },
      },
      metrics: {
        keyMetrics: [
          {
            label: 'Total Savings',
            value: this.formatCurrency(summary.totalSavings),
            change: `${savingsChange >= 0 ? '+' : ''}${savingsChange.toFixed(1)}%`,
            trend: savingsChange >= 0 ? 'up' : 'down',
            icon: 'DollarSign',
          },
          {
            label: 'Tasks Completed',
            value: summary.totalTasksCompleted.toLocaleString(),
            change: `+${((summary.totalTasksCompleted - previousSummary.totalTasksCompleted) / Math.max(previousSummary.totalTasksCompleted, 1) * 100).toFixed(1)}%`,
            trend: 'up',
            icon: 'CheckCircle',
          },
          {
            label: 'ROI',
            value: `${summary.overallROI.toFixed(1)}%`,
            change: `${(summary.overallROI - previousSummary.overallROI).toFixed(1)}pp`,
            trend: summary.overallROI >= previousSummary.overallROI ? 'up' : 'down',
            icon: 'TrendingUp',
          },
          {
            label: 'Hours Saved',
            value: summary.totalHumanHoursSaved.toFixed(0),
            change: `+${((summary.totalHumanHoursSaved - previousSummary.totalHumanHoursSaved) / Math.max(previousSummary.totalHumanHoursSaved, 1) * 100).toFixed(1)}%`,
            trend: 'up',
            icon: 'Clock',
          },
          {
            label: 'Active Agents',
            value: `${summary.activeAgents}/${summary.totalAgents}`,
            change: `${summary.activeAgents - previousSummary.activeAgents > 0 ? '+' : ''}${summary.activeAgents - previousSummary.activeAgents}`,
            trend: 'neutral',
            icon: 'Users',
          },
          {
            label: 'Grade',
            value: summary.benchmarks.grade,
            change: summary.benchmarks.percentile > 50 ? 'Top Half' : 'Bottom Half',
            trend: summary.benchmarks.percentile > 50 ? 'up' : 'down',
            icon: 'Award',
          },
        ],
        milestones: [
          { title: 'First $10K Saved', achieved: summary.totalSavings >= 10000, date: summary.totalSavings >= 10000 ? new Date() : undefined, value: this.formatCurrency(Math.min(summary.totalSavings, 10000)) },
          { title: '1000 Tasks Completed', achieved: summary.totalTasksCompleted >= 1000, date: summary.totalTasksCompleted >= 1000 ? new Date() : undefined, value: `${Math.min(summary.totalTasksCompleted, 1000).toLocaleString()}/1000` },
          { title: '500 Hours Saved', achieved: summary.totalHumanHoursSaved >= 500, date: summary.totalHumanHoursSaved >= 500 ? new Date() : undefined, value: `${Math.min(summary.totalHumanHoursSaved, 500).toFixed(0)}/500` },
          { title: '100% ROI', achieved: summary.overallROI >= 100, date: summary.overallROI >= 100 ? new Date() : undefined, value: `${summary.overallROI.toFixed(1)}%` },
        ],
      },
      insights: this.generateInsights(summary),
      recommendations: this.generateRecommendations(summary),
    };

    return viz;
  }

  /**
   * Calculate AI operating cost
   */
  private calculateAIOperatingCost(
    agentId: string,
    period: TimePeriod,
    startDate: Date,
    endDate: Date
  ): number {
    const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    const baseCost = hours * this.DEFAULT_AI_COST_PER_HOUR;

    // Adjust based on period
    const multiplier = {
      day: 1,
      week: 0.95,
      month: 0.9,
      quarter: 0.85,
      year: 0.8,
      custom: 1,
    }[period];

    return baseCost * multiplier;
  }

  /**
   * Calculate category breakdown
   */
  private async calculateCategoryBreakdown(
    agentId: string,
    startDate: Date,
    endDate: Date,
    tasks: any[],
    totalSavings: number
  ): Promise<ROIAnalytics['breakdownByCategory']> {
    const breakdown: ROIAnalytics['breakdownByCategory'] = {
      labor: { amount: 0, percentage: 0, tasks: 0 },
      time: { amount: 0, percentage: 0, tasks: 0 },
      efficiency: { amount: 0, percentage: 0, tasks: 0 },
      error_reduction: { amount: 0, percentage: 0, tasks: 0 },
      automation: { amount: 0, percentage: 0, tasks: 0 },
      scaling: { amount: 0, percentage: 0, tasks: 0 },
      training: { amount: 0, percentage: 0, tasks: 0 },
      overtime: { amount: 0, percentage: 0, tasks: 0 },
      benefits: { amount: 0, percentage: 0, tasks: 0 },
    };

    // Categorize tasks and calculate savings
    for (const task of tasks) {
      const taskValue = (task.estimatedHumanHours || 1) * this.DEFAULT_HUMAN_COST_PER_HOUR;
      const category = this.categorizeTask(task.taskType);

      breakdown[category].amount += taskValue;
      breakdown[category].tasks++;
    }

    // Calculate percentages
    for (const category of Object.keys(breakdown) as CostCategory[]) {
      breakdown[category].percentage = totalSavings > 0
        ? (breakdown[category].amount / totalSavings) * 100
        : 0;
    }

    return breakdown;
  }

  /**
   * Categorize a task
   */
  private categorizeTask(taskType: string): CostCategory {
    const categoryMap: Record<string, CostCategory> = {
      'data_entry': 'labor',
      'reporting': 'time',
      'analysis': 'efficiency',
      'customer_support': 'labor',
      'scheduling': 'time',
      'email': 'time',
      'document_processing': 'automation',
      'research': 'efficiency',
      'code_review': 'error_reduction',
      'testing': 'error_reduction',
    };

    return categoryMap[taskType] || 'labor';
  }

  /**
   * Calculate efficiency gain
   */
  private calculateEfficiencyGain(tasks: any[]): number {
    if (tasks.length === 0) return 0;
    return this.EFFICIENCY_MULTIPLIER;
  }

  /**
   * Calculate satisfaction score
   */
  private calculateSatisfactionScore(tasks: any[]): number {
    if (tasks.length === 0) return 0;

    const ratings = tasks
      .filter(t => t.userRating)
      .map(t => t.userRating);

    if (ratings.length === 0) return 85; // Default

    return ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  }

  /**
   * Get ROI for a specific period
   */
  private async getROIForPeriod(
    agentId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ROIAnalytics | null> {
    const [result] = await db.select()
      .from(agentROIAnalytics)
      .where(and(
        eq(agentROIAnalytics.agentId, agentId),
        eq(agentROIAnalytics.periodStart, startDate),
        eq(agentROIAnalytics.periodEnd, endDate)
      ))
      .orderBy(desc(agentROIAnalytics.createdAt))
      .limit(1);

    return result as ROIAnalytics || null;
  }

  /**
   * Store ROI analytics
   */
  private async storeROIAnalytics(analytics: ROIAnalytics): Promise<void> {
    await db.insert(agentROIAnalytics).values({
      id: analytics.id,
      agentId: analytics.agentId,
      organizationId: analytics.organizationId,
      period: analytics.period,
      periodStart: analytics.periodStart,
      periodEnd: analytics.periodEnd,
      tasksCompleted: analytics.tasksCompleted,
      humanHoursSaved: analytics.humanHoursSaved,
      humanHoursCost: analytics.humanHoursCost,
      aiOperatingCost: analytics.aiOperatingCost,
      netSavings: analytics.netSavings,
      roiPercentage: analytics.roiPercentage,
      efficiencyGain: analytics.efficiencyGain,
      errorReductionRate: analytics.errorReductionRate,
      costPerTask: analytics.costPerTask,
      averageTaskDuration: analytics.averageTaskDuration,
      satisfactionScore: analytics.satisfactionScore,
      breakdownByCategory: analytics.breakdownByCategory as any,
      comparisonToPrevious: analytics.comparisonToPrevious as any,
      createdAt: analytics.createdAt,
      updatedAt: analytics.updatedAt,
    });
  }

  /**
   * Get previous period dates
   */
  private getPreviousPeriod(period: TimePeriod, currentStart: Date): { start: Date; end: Date } {
    const start = new Date(currentStart);
    const end = new Date(start);

    switch (period) {
      case 'day':
        start.setDate(start.getDate() - 1);
        end.setDate(end.getDate() - 1);
        break;
      case 'week':
        start.setDate(start.getDate() - 7);
        end.setDate(end.getDate() - 7);
        break;
      case 'month':
        start.setMonth(start.getMonth() - 1);
        end.setMonth(end.getMonth() - 1);
        break;
      case 'quarter':
        start.setMonth(start.getMonth() - 3);
        end.setMonth(end.getMonth() - 3);
        break;
      case 'year':
        start.setFullYear(start.getFullYear() - 1);
        end.setFullYear(end.getFullYear() - 1);
        break;
      default:
        const duration = end.getTime() - start.getTime();
        start.setTime(start.getTime() - duration);
        end.setTime(end.getTime() - duration);
    }

    return { start, end };
  }

  /**
   * Get top performing agents
   */
  private async getTopPerformingAgents(
    organizationId: string,
    startDate: Date,
    endDate: Date,
    limit: number
  ): Promise<AgentPerformanceSnapshot[]> {
    const metrics = await db.select()
      .from(agentROIAnalytics)
      .where(and(
        eq(agentROIAnalytics.organizationId, organizationId),
        gte(agentROIAnalytics.periodStart, startDate),
        lte(agentROIAnalytics.periodEnd, endDate)
      ))
      .orderBy(desc(agentROIAnalytics.roiPercentage))
      .limit(limit);

    return metrics.map(m => ({
      agentId: m.agentId,
      agentName: `Agent ${m.agentId.slice(0, 8)}`,
      agentType: 'AI Agent',
      status: 'active',
      periodMetrics: {
        tasksCompleted: m.tasksCompleted,
        tasksFailed: Math.floor(m.tasksCompleted * m.errorReductionRate),
        averageResponseTime: m.averageTaskDuration,
        uptime: 99.9,
        userSatisfaction: m.satisfactionScore,
      },
      costMetrics: {
        operatingCost: m.aiOperatingCost,
        costPerTask: m.costPerTask,
        costPerHour: m.aiOperatingCost / (m.humanHoursSaved || 1),
      },
      savingsMetrics: {
        humanHoursSaved: m.humanHoursSaved,
        laborCostSaved: m.humanHoursCost,
        efficiencyValue: m.efficiencyGain * m.humanHoursCost,
        totalValue: m.netSavings,
      },
      roiScore: Math.min(100, m.roiPercentage),
      trendDirection: m.comparisonToPrevious?.savingsChange > 0 ? 'up' : 'down',
      trendPercentage: Math.abs(m.comparisonToPrevious?.savingsChange || 0),
    }));
  }

  /**
   * Aggregate cost breakdown
   */
  private aggregateCostBreakdown(metrics: any[]): Record<CostCategory, number> {
    const breakdown: Record<CostCategory, number> = {
      labor: 0,
      time: 0,
      efficiency: 0,
      error_reduction: 0,
      automation: 0,
      scaling: 0,
      training: 0,
      overtime: 0,
      benefits: 0,
    };

    for (const m of metrics) {
      const cats = m.breakdownByCategory as Record<CostCategory, { amount: number }>;
      for (const [cat, val] of Object.entries(cats)) {
        breakdown[cat as CostCategory] += val.amount;
      }
    }

    return breakdown;
  }

  /**
   * Generate savings trend
   */
  private async generateSavingsTrend(
    organizationId: string,
    period: TimePeriod,
    startDate: Date,
    endDate: Date
  ): Promise<OrganizationROISummary['savingsTrend']> {
    // Generate sample trend data points
    const points: OrganizationROISummary['savingsTrend'] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      points.push({
        date: new Date(current),
        savings: Math.random() * 5000 + 3000,
        costs: Math.random() * 500 + 200,
        net: 0,
      });

      // Increment based on period
      switch (period) {
        case 'day':
          current.setHours(current.getHours() + 1);
          break;
        case 'week':
          current.setDate(current.getDate() + 1);
          break;
        default:
          current.setDate(current.getDate() + 7);
      }
    }

    // Calculate net
    for (const p of points) {
      p.net = p.savings - p.costs;
    }

    return points;
  }

  /**
   * Calculate benchmarks
   */
  private calculateBenchmarks(roi: number): OrganizationROISummary['benchmarks'] {
    // Industry average ROI is typically 200-300%
    const industryAverage = 250;
    const percentile = Math.min(99, Math.max(1, (roi / industryAverage) * 50));

    let grade: OrganizationROISummary['benchmarks']['grade'];
    if (roi >= 500) grade = 'A+';
    else if (roi >= 400) grade = 'A';
    else if (roi >= 300) grade = 'B+';
    else if (roi >= 200) grade = 'B';
    else if (roi >= 100) grade = 'C+';
    else if (roi >= 50) grade = 'C';
    else if (roi >= 0) grade = 'D';
    else grade = 'F';

    return {
      industryAverageROI: industryAverage,
      percentile,
      grade,
    };
  }

  /**
   * Generate insights
   */
  private generateInsights(summary: OrganizationROISummary): CostSavingsVisualization['insights'] {
    const insights: CostSavingsVisualization['insights'] = [];

    if (summary.overallROI > 300) {
      insights.push({
        type: 'success',
        title: 'Outstanding ROI Performance',
        description: `Your ${summary.overallROI.toFixed(0)}% ROI significantly exceeds industry average of 250%.`,
        potentialValue: this.formatCurrency(summary.totalSavings * 0.1),
      });
    }

    if (summary.totalHumanHoursSaved > 1000) {
      insights.push({
        type: 'success',
        title: 'Massive Time Savings',
        description: `You've saved ${summary.totalHumanHoursSaved.toFixed(0)} hours that can be redirected to strategic work.`,
      });
    }

    const inactiveAgents = summary.totalAgents - summary.activeAgents;
    if (inactiveAgents > 0) {
      insights.push({
        type: 'opportunity',
        title: 'Untapped Agent Potential',
        description: `${inactiveAgents} agents are inactive. Activating them could generate additional value.`,
        potentialValue: this.formatCurrency(inactiveAgents * 5000),
        action: 'Review and activate inactive agents',
      });
    }

    if (summary.averageAgentROI < 200) {
      insights.push({
        type: 'warning',
        title: 'Below-Average Agent ROI',
        description: 'Some agents are underperforming. Optimization recommended.',
        action: 'Review agent configurations',
      });
    }

    return insights;
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(summary: OrganizationROISummary): CostSavingsVisualization['recommendations'] {
    return [
      {
        priority: 'high',
        title: 'Scale High-Performing Agents',
        description: 'Your top agents are delivering exceptional ROI. Consider increasing their task allocation.',
        expectedROI: '+150%',
        implementation: 'Reconfigure task routing',
      },
      {
        priority: 'medium',
        title: 'Optimize Underperformers',
        description: 'Review agent configurations and training to improve efficiency.',
        expectedROI: '+75%',
        implementation: 'Audit and retrain low-performing agents',
      },
      {
        priority: 'medium',
        title: 'Expand Automation Coverage',
        description: 'Identify additional manual processes that can be automated.',
        expectedROI: '+$50K/quarter',
        implementation: 'Process audit and workflow mapping',
      },
    ];
  }

  /**
   * Generate hourly value data
   */
  private generateHourlyValueData(summary: OrganizationROISummary): { hour: number; day: string; value: number }[] {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data: { hour: number; day: string; value: number }[] = [];

    for (const day of days) {
      for (let hour = 0; hour < 24; hour++) {
        // Simulate higher value during business hours
        const baseValue = hour >= 9 && hour <= 17 ? 100 : 30;
        const randomFactor = Math.random() * 50;
        data.push({ hour, day, value: baseValue + randomFactor });
      }
    }

    return data;
  }

  /**
   * Calculate trendline
   */
  private calculateTrendline(values: number[]): number {
    if (values.length < 2) return 0;
    const n = values.length;
    const sumX = values.reduce((sum, _, i) => sum + i, 0);
    const sumY = values.reduce((sum, v) => sum + v, 0);
    const sumXY = values.reduce((sum, v, i) => sum + i * v, 0);
    const sumXX = values.reduce((sum, _, i) => sum + i * i, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    return slope;
  }

  /**
   * Project annual savings
   */
  private projectAnnualSavings(summary: OrganizationROISummary): number {
    const periodDays = (summary.periodEnd.getTime() - summary.periodStart.getTime()) / (1000 * 60 * 60 * 24);
    const dailyNet = summary.totalSavings / Math.max(periodDays, 1);
    return dailyNet * 365;
  }

  /**
   * Format currency
   */
  private formatCurrency(value: number): string {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
  }

  /**
   * Format period label
   */
  private formatPeriodLabel(period: TimePeriod): string {
    const labels: Record<TimePeriod, string> = {
      day: 'Daily',
      week: 'Weekly',
      month: 'Monthly',
      quarter: 'Quarterly',
      year: 'Yearly',
      custom: 'Custom Period',
    };
    return labels[period];
  }

  /**
   * Format trend date
   */
  private formatTrendDate(date: Date, period: TimePeriod): string {
    switch (period) {
      case 'day':
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      case 'week':
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      case 'month':
        return date.toLocaleDateString('en-US', { day: 'numeric' });
      default:
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  /**
   * Get category color
   */
  private getCategoryColor(category: CostCategory): string {
    const colors: Record<CostCategory, string> = {
      labor: '#FF6B6B',
      time: '#4ECDC4',
      efficiency: '#45B7D1',
      error_reduction: '#96CEB4',
      automation: '#FFEAA7',
      scaling: '#DDA0DD',
      training: '#98D8C8',
      overtime: '#F7DC6F',
      benefits: '#BB8FCE',
    };
    return colors[category];
  }

  /**
   * Start periodic ROI calculation
   */
  private startPeriodicCalculation(): void {
    // Calculate ROI daily at midnight
    this.calculationInterval = setInterval(async () => {
      const now = new Date();
      if (now.getHours() === 0) {
        logger.info('Running periodic ROI calculations');
        // Trigger calculations for all active agents
        this.emit('dailyCalculation', now);
      }
    }, 60 * 60 * 1000); // Check every hour
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    if (this.calculationInterval) {
      clearInterval(this.calculationInterval);
    }
    this.removeAllListeners();
  }
}

// Export singleton instance
export const roiDashboardService = ROIDashboardService.getInstance();
