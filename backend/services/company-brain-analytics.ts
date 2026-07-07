/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

/**
 * Company Brain Analytics Dashboard Service
 * Provides comprehensive analytics and insights for knowledge management
 * Tracks metrics, trends, and actionable insights
 */

export interface AnalyticsMetrics {
  knowledgeHealth: KnowledgeHealthMetrics;
  usageMetrics: UsageMetrics;
  riskAssessment: RiskMetrics;
  teamPerformance: TeamMetrics;
  contentQuality: ContentQualityMetrics;
  integrationStatus: IntegrationMetrics;
}

export interface KnowledgeHealthMetrics {
  totalKnowledgeNodes: number;
  verifiedNodes: number;
  outdatedNodes: number;
  draftNodes: number;
  coveragePercentage: number;
  averageConfidence: number;
  growthRate: number;
  lastUpdated: Date;
}

export interface UsageMetrics {
  totalSearches: number;
  uniqueUsers: number;
  avgSearchResults: number;
  topQueries: Array<{ query: string; count: number }>;
  searchSuccessRate: number;
  avgSessionDuration: number;
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
}

export interface RiskMetrics {
  singlePointsOfFailure: number;
  employeesAtRisk: number;
  knowledgeGaps: Array<{ area: string; severity: 'high' | 'medium' | 'low' }>;
  complianceGaps: number;
  dataLossRisk: 'low' | 'medium' | 'high';
  retentionRisk: 'low' | 'medium' | 'high';
}

export interface TeamMetrics {
  departmentStats: Array<{
    department: string;
    knowledgeContributions: number;
    activeMembers: number;
    coverageScore: number;
    searchActivity: number;
  }>;
  topContributors: Array<{
    id: string;
    name: string;
    contributions: number;
    department: string;
  }>;
  knowledgeTransferReadiness: number;
  onboardingProgress: Array<{
    employeeId: string;
    name: string;
    progress: number;
    daysOnboarded: number;
  }>;
}

export interface ContentQualityMetrics {
  averageDocumentAge: number;
  duplicateContent: number;
  lowConfidenceNodes: number;
  needsVerification: number;
  contentFreshnessScore: number;
  accuracyScore: number;
  completenessScore: number;
}

export interface IntegrationMetrics {
  activeIntegrations: number;
  totalIntegrations: number;
  syncStatus: Array<{
    integration: string;
    status: 'active' | 'error' | 'idle';
    lastSync: Date;
    itemsProcessed: number;
  }>;
  dataIngestionRate: number;
  errorRate: number;
}

export interface TrendData {
  date: Date;
  value: number;
  label?: string;
}

export interface Insight {
  id: string;
  type: 'opportunity' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  actionable: boolean;
  suggestedActions?: string[];
  createdAt: Date;
}

export class AnalyticsDashboardService {
  private metrics: AnalyticsMetrics;
  private insights: Insight[] = [];
  private trendData: Map<string, TrendData[]> = new Map();

  constructor() {
    this.metrics = this.initializeMetrics();
  }

  /**
   * Initialize default metrics
   */
  private initializeMetrics(): AnalyticsMetrics {
    return {
      knowledgeHealth: {
        totalKnowledgeNodes: 0,
        verifiedNodes: 0,
        outdatedNodes: 0,
        draftNodes: 0,
        coveragePercentage: 0,
        averageConfidence: 0,
        growthRate: 0,
        lastUpdated: new Date(),
      },
      usageMetrics: {
        totalSearches: 0,
        uniqueUsers: 0,
        avgSearchResults: 0,
        topQueries: [],
        searchSuccessRate: 0,
        avgSessionDuration: 0,
        dailyActiveUsers: 0,
        weeklyActiveUsers: 0,
        monthlyActiveUsers: 0,
      },
      riskAssessment: {
        singlePointsOfFailure: 0,
        employeesAtRisk: 0,
        knowledgeGaps: [],
        complianceGaps: 0,
        dataLossRisk: 'low',
        retentionRisk: 'low',
      },
      teamPerformance: {
        departmentStats: [],
        topContributors: [],
        knowledgeTransferReadiness: 0,
        onboardingProgress: [],
      },
      contentQuality: {
        averageDocumentAge: 0,
        duplicateContent: 0,
        lowConfidenceNodes: 0,
        needsVerification: 0,
        contentFreshnessScore: 0,
        accuracyScore: 0,
        completenessScore: 0,
      },
      integrationStatus: {
        activeIntegrations: 0,
        totalIntegrations: 0,
        syncStatus: [],
        dataIngestionRate: 0,
        errorRate: 0,
      },
    };
  }

  /**
   * Get all analytics metrics
   */
  getMetrics(): AnalyticsMetrics {
    return this.metrics;
  }

  /**
   * Update knowledge health metrics
   */
  updateKnowledgeHealth(updates: Partial<KnowledgeHealthMetrics>): void {
    this.metrics.knowledgeHealth = {
      ...this.metrics.knowledgeHealth,
      ...updates,
      lastUpdated: new Date(),
    };

    // Record trend data
    this.recordTrend('knowledge_nodes', this.metrics.knowledgeHealth.totalKnowledgeNodes);
    this.recordTrend('coverage_percentage', this.metrics.knowledgeHealth.coveragePercentage);

    // Generate insights
    this.generateHealthInsights();
  }

  /**
   * Update usage metrics
   */
  updateUsageMetrics(updates: Partial<UsageMetrics>): void {
    this.metrics.usageMetrics = {
      ...this.metrics.usageMetrics,
      ...updates,
    };

    // Record trend data
    this.recordTrend('daily_searches', this.metrics.usageMetrics.totalSearches);
    this.recordTrend('active_users', this.metrics.usageMetrics.dailyActiveUsers);

    // Generate insights
    this.generateUsageInsights();
  }

  /**
   * Update risk assessment
   */
  updateRiskAssessment(updates: Partial<RiskMetrics>): void {
    this.metrics.riskAssessment = {
      ...this.metrics.riskAssessment,
      ...updates,
    };

    // Generate insights
    this.generateRiskInsights();
  }

  /**
   * Update team performance metrics
   */
  updateTeamPerformance(updates: Partial<TeamMetrics>): void {
    this.metrics.teamPerformance = {
      ...this.metrics.teamPerformance,
      ...updates,
    };

    // Generate insights
    this.generateTeamInsights();
  }

  /**
   * Update content quality metrics
   */
  updateContentQuality(updates: Partial<ContentQualityMetrics>): void {
    this.metrics.contentQuality = {
      ...this.metrics.contentQuality,
      ...updates,
    };

    // Record trend data
    this.recordTrend('content_freshness', this.metrics.contentQuality.contentFreshnessScore);

    // Generate insights
    this.generateQualityInsights();
  }

  /**
   * Update integration status
   */
  updateIntegrationStatus(updates: Partial<IntegrationMetrics>): void {
    this.metrics.integrationStatus = {
      ...this.metrics.integrationStatus,
      ...updates,
    };

    // Generate insights
    this.generateIntegrationInsights();
  }

  /**
   * Record trend data point
   */
  private recordTrend(metric: string, value: number): void {
    if (!this.trendData.has(metric)) {
      this.trendData.set(metric, []);
    }

    const data = this.trendData.get(metric)!;
    data.push({
      date: new Date(),
      value,
    });

    // Keep only last 30 days of data
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const filtered = data.filter(d => d.date >= thirtyDaysAgo);
    this.trendData.set(metric, filtered);
  }

  /**
   * Get trend data for a metric
   */
  getTrendData(metric: string, days: number = 30): TrendData[] {
    const data = this.trendData.get(metric) || [];
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return data.filter(d => d.date >= cutoffDate);
  }

  /**
   * Generate health-related insights
   */
  private generateHealthInsights(): void {
    const health = this.metrics.knowledgeHealth;

    // Low coverage insight
    if (health.coveragePercentage < 70) {
      this.addInsight({
        type: 'warning',
        title: 'Low Knowledge Coverage',
        description: `Knowledge coverage is at ${health.coveragePercentage}%. Consider increasing documentation efforts.`,
        severity: 'high',
        actionable: true,
        suggestedActions: [
          'Schedule knowledge capture sessions',
          'Enable more integrations',
          'Encourage employees to document processes',
        ],
      });
    }

    // High outdated content
    if (health.outdatedNodes > health.totalKnowledgeNodes * 0.2) {
      this.addInsight({
        type: 'warning',
        title: 'High Outdated Content',
        description: `${health.outdatedNodes} knowledge nodes are marked as outdated.`,
        severity: 'medium',
        actionable: true,
        suggestedActions: [
          'Review and update outdated content',
          'Set up content review schedules',
          'Notify owners of outdated content',
        ],
      });
    }

    // Positive growth
    if (health.growthRate > 0.1) {
      this.addInsight({
        type: 'success',
        title: 'Strong Knowledge Growth',
        description: `Knowledge base is growing at ${Math.round(health.growthRate * 100)}% per month.`,
        severity: 'low',
        actionable: false,
      });
    }
  }

  /**
   * Generate usage-related insights
   */
  private generateUsageInsights(): void {
    const usage = this.metrics.usageMetrics;

    // Low search success rate
    if (usage.searchSuccessRate < 70) {
      this.addInsight({
        type: 'warning',
        title: 'Low Search Success Rate',
        description: `Search success rate is ${usage.searchSuccessRate}%. Users may not be finding what they need.`,
        severity: 'medium',
        actionable: true,
        suggestedActions: [
          'Review search queries',
          'Improve knowledge indexing',
          'Add more relevant content',
        ],
      });
    }

    // High user engagement
    if (usage.dailyActiveUsers > 50) {
      this.addInsight({
        type: 'success',
        title: 'High User Engagement',
        description: `${usage.dailyActiveUsers} daily active users showing strong engagement.`,
        severity: 'low',
        actionable: false,
      });
    }
  }

  /**
   * Generate risk-related insights
   */
  private generateRiskInsights(): void {
    const risk = this.metrics.riskAssessment;

    // Single points of failure
    if (risk.singlePointsOfFailure > 0) {
      this.addInsight({
        type: 'warning',
        title: 'Single Points of Failure Detected',
        description: `${risk.singlePointsOfFailure} critical knowledge areas depend on single individuals.`,
        severity: 'high',
        actionable: true,
        suggestedActions: [
          'Identify backup knowledge owners',
          'Document critical processes',
          'Start knowledge transfer workflows',
        ],
      });
    }

    // Employees at risk
    if (risk.employeesAtRisk > 0) {
      this.addInsight({
        type: 'warning',
        title: 'Employees at Risk of Departure',
        description: `${risk.employeesAtRisk} employees have departure notices. Knowledge preservation recommended.`,
        severity: 'high',
        actionable: true,
        suggestedActions: [
          'Trigger knowledge preservation workflows',
          'Schedule knowledge transfer sessions',
          'Document critical knowledge',
        ],
      });
    }

    // High data loss risk
    if (risk.dataLossRisk === 'high') {
      this.addInsight({
        type: 'warning',
        title: 'High Data Loss Risk',
        description: 'Risk assessment indicates high potential for knowledge loss.',
        severity: 'high',
        actionable: true,
        suggestedActions: [
          'Enable more integrations',
          'Increase backup frequency',
          'Review access controls',
        ],
      });
    }
  }

  /**
   * Generate team-related insights
   */
  private generateTeamInsights(): void {
    const team = this.metrics.teamPerformance;

    // Low knowledge transfer readiness
    if (team.knowledgeTransferReadiness < 60) {
      this.addInsight({
        type: 'warning',
        title: 'Low Knowledge Transfer Readiness',
        description: `Knowledge transfer readiness score is ${team.knowledgeTransferReadiness}%.`,
        severity: 'medium',
        actionable: true,
        suggestedActions: [
          'Improve documentation practices',
          'Create knowledge transfer plans',
          'Train team members on knowledge sharing',
        ],
      });
    }

    // Department with low coverage
    const lowCoverageDepts = team.departmentStats.filter(d => d.coverageScore < 50);
    if (lowCoverageDepts.length > 0) {
      this.addInsight({
        type: 'info',
        title: 'Departments with Low Coverage',
        description: `${lowCoverageDepts.map(d => d.department).join(', ')} have knowledge coverage below 50%.`,
        severity: 'low',
        actionable: true,
        suggestedActions: [
          'Focus knowledge capture efforts on these departments',
          'Assign knowledge champions',
          'Schedule department-specific documentation sessions',
        ],
      });
    }
  }

  /**
   * Generate quality-related insights
   */
  private generateQualityInsights(): void {
    const quality = this.metrics.contentQuality;

    // Low content freshness
    if (quality.contentFreshnessScore < 60) {
      this.addInsight({
        type: 'warning',
        title: 'Low Content Freshness',
        description: `Content freshness score is ${quality.contentFreshnessScore}%. Content may be outdated.`,
        severity: 'medium',
        actionable: true,
        suggestedActions: [
          'Review and update old content',
          'Set up content review schedules',
          'Archive outdated content',
        ],
      });
    }

    // High duplicate content
    if (quality.duplicateContent > quality.averageDocumentAge * 0.1) {
      this.addInsight({
        type: 'info',
        title: 'Duplicate Content Detected',
        description: `${quality.duplicateContent} duplicate content items found.`,
        severity: 'low',
        actionable: true,
        suggestedActions: [
          'Merge duplicate content',
          'Establish content guidelines',
          'Implement content deduplication',
        ],
      });
    }
  }

  /**
   * Generate integration-related insights
   */
  private generateIntegrationInsights(): void {
    const integration = this.metrics.integrationStatus;

    // Failed integrations
    const failedIntegrations = integration.syncStatus.filter(s => s.status === 'error');
    if (failedIntegrations.length > 0) {
      this.addInsight({
        type: 'warning',
        title: 'Integration Errors Detected',
        description: `${failedIntegrations.length} integrations have errors.`,
        severity: 'medium',
        actionable: true,
        suggestedActions: [
          'Review integration logs',
          'Reconfigure failed integrations',
          'Check API credentials',
        ],
      });
    }

    // Low data ingestion rate
    if (integration.dataIngestionRate < 10) {
      this.addInsight({
        type: 'info',
        title: 'Low Data Ingestion Rate',
        description: `Data ingestion rate is ${integration.dataIngestionRate} items/hour.`,
        severity: 'low',
        actionable: true,
        suggestedActions: [
          'Enable more integrations',
          'Increase sync frequency',
          'Review integration configurations',
        ],
      });
    }
  }

  /**
   * Add an insight
   */
  private addInsight(insight: Omit<Insight, 'id' | 'createdAt'>): void {
    const newInsight: Insight = {
      ...insight,
      id: `insight-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };

    // Avoid duplicate insights
    const exists = this.insights.some(
      i => i.title === newInsight.title && i.type === newInsight.type
    );

    if (!exists) {
      this.insights.push(newInsight);
    }

    // Keep only last 50 insights
    if (this.insights.length > 50) {
      this.insights = this.insights.slice(-50);
    }
  }

  /**
   * Get all insights
   */
  getInsights(filters?: {
    type?: Insight['type'];
    severity?: Insight['severity'];
    actionable?: boolean;
  }): Insight[] {
    let filtered = this.insights;

    if (filters?.type) {
      filtered = filtered.filter(i => i.type === filters.type);
    }

    if (filters?.severity) {
      filtered = filtered.filter(i => i.severity === filters.severity);
    }

    if (filters?.actionable !== undefined) {
      filtered = filtered.filter(i => i.actionable === filters.actionable);
    }

    // Sort by severity and date
    const severityOrder = { high: 0, medium: 1, low: 2 };
    filtered.sort((a, b) => {
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    return filtered;
  }

  /**
   * Get dashboard summary
   */
  getDashboardSummary(): {
    overallHealth: 'excellent' | 'good' | 'fair' | 'poor';
    keyMetrics: Record<string, number>;
    topInsights: Insight[];
    recentTrends: Record<string, 'up' | 'down' | 'stable'>;
  } {
    const health = this.metrics.knowledgeHealth;
    const risk = this.metrics.riskAssessment;

    // Calculate overall health
    let healthScore = 0;
    healthScore += health.coveragePercentage;
    healthScore -= risk.singlePointsOfFailure * 10;
    healthScore -= risk.employeesAtRisk * 5;
    healthScore += health.averageConfidence * 100;

    let overallHealth: 'excellent' | 'good' | 'fair' | 'poor';
    if (healthScore >= 80) overallHealth = 'excellent';
    else if (healthScore >= 60) overallHealth = 'good';
    else if (healthScore >= 40) overallHealth = 'fair';
    else overallHealth = 'poor';

    // Calculate recent trends
    const recentTrends: Record<string, 'up' | 'down' | 'stable'> = {};
    const trendMetrics = ['knowledge_nodes', 'coverage_percentage', 'daily_searches', 'active_users'];

    for (const metric of trendMetrics) {
      const data = this.getTrendData(metric, 7);
      if (data.length >= 2) {
        const recent = data[data.length - 1].value;
        const previous = data[data.length - 2].value;
        const change = (recent - previous) / previous;

        if (change > 0.05) recentTrends[metric] = 'up';
        else if (change < -0.05) recentTrends[metric] = 'down';
        else recentTrends[metric] = 'stable';
      }
    }

    return {
      overallHealth,
      keyMetrics: {
        totalKnowledgeNodes: health.totalKnowledgeNodes,
        coveragePercentage: health.coveragePercentage,
        dailyActiveUsers: this.metrics.usageMetrics.dailyActiveUsers,
        employeesAtRisk: risk.employeesAtRisk,
        searchSuccessRate: this.metrics.usageMetrics.searchSuccessRate,
      },
      topInsights: this.getInsights({ actionable: true }).slice(0, 5),
      recentTrends,
    };
  }

  /**
   * Export analytics report
   */
  exportReport(format: 'json' | 'csv'): string {
    const data = {
      metrics: this.metrics,
      insights: this.insights,
      generatedAt: new Date(),
    };

    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    } else {
      // Simple CSV export
      const lines: string[] = [];
      lines.push('Metric,Value');
      
      for (const [key, value] of Object.entries(this.metrics.knowledgeHealth)) {
        if (typeof value === 'number') {
          lines.push(`knowledge_health.${key},${value}`);
        }
      }

      return lines.join('\n');
    }
  }

  /**
   * Clear all insights
   */
  clearInsights(): void {
    this.insights = [];
  }

  /**
   * Reset all metrics
   */
  resetMetrics(): void {
    this.metrics = this.initializeMetrics();
    this.insights = [];
    this.trendData.clear();
  }
}

// Export singleton instance
export const analyticsDashboardService = new AnalyticsDashboardService();
