import { db } from '../db/connection';
import {
  knowledgeNodes,
  knowledgeSearchQueries,
  knowledgeContributions,
  knowledgeVerifications,
  knowledgeAnalytics,
  knowledgeInsights,
  knowledgeRelationships,
  knowledgeDocuments,
  knowledgeOnboardingProgress,
  knowledgeIntegrationSyncs,
  integrations,
  users,
} from '../db/drizzle-schema';
import { eq, and, desc, asc, gte, lte, sql, count, avg, inArray } from 'drizzle-orm';

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
  async getMetrics(organizationId: string): Promise<AnalyticsMetrics> {
    const [health, usage, risk, team, quality, integration] = await Promise.all([
      this.getKnowledgeHealth(organizationId),
      this.getUsageMetrics(organizationId),
      this.getRiskMetrics(organizationId),
      this.getTeamMetrics(organizationId),
      this.getContentQualityMetrics(organizationId),
      this.getIntegrationMetrics(organizationId),
    ]);

    return {
      knowledgeHealth: health,
      usageMetrics: usage,
      riskAssessment: risk,
      teamPerformance: team,
      contentQuality: quality,
      integrationStatus: integration,
    };
  }

  async updateKnowledgeHealth(organizationId: string): Promise<KnowledgeHealthMetrics> {
    const metrics = await this.getKnowledgeHealth(organizationId);

    await db.insert(knowledgeAnalytics).values({
      organizationId,
      metricType: 'knowledge_health',
      metricValue: metrics.coveragePercentage,
      period: 'daily',
      periodStart: new Date(),
      periodEnd: new Date(),
      dimensions: { totalKnowledgeNodes: metrics.totalKnowledgeNodes, verifiedNodes: metrics.verifiedNodes, outdatedNodes: metrics.outdatedNodes, draftNodes: metrics.draftNodes, averageConfidence: metrics.averageConfidence, growthRate: metrics.growthRate },
    });

    return metrics;
  }

  async updateUsageMetrics(organizationId: string): Promise<UsageMetrics> {
    const metrics = await this.getUsageMetrics(organizationId);

    await db.insert(knowledgeAnalytics).values({
      organizationId,
      metricType: 'usage_metrics',
      metricValue: metrics.totalSearches,
      period: 'daily',
      periodStart: new Date(),
      periodEnd: new Date(),
      dimensions: { uniqueUsers: metrics.uniqueUsers, avgSearchResults: metrics.avgSearchResults, searchSuccessRate: metrics.searchSuccessRate, dailyActiveUsers: metrics.dailyActiveUsers, weeklyActiveUsers: metrics.weeklyActiveUsers, monthlyActiveUsers: metrics.monthlyActiveUsers },
    });

    return metrics;
  }

  async updateRiskAssessment(organizationId: string): Promise<RiskMetrics> {
    const metrics = await this.getRiskMetrics(organizationId);

    await db.insert(knowledgeAnalytics).values({
      organizationId,
      metricType: 'risk_assessment',
      metricValue: metrics.singlePointsOfFailure,
      period: 'daily',
      periodStart: new Date(),
      periodEnd: new Date(),
      dimensions: { employeesAtRisk: metrics.employeesAtRisk, complianceGaps: metrics.complianceGaps, dataLossRisk: metrics.dataLossRisk, retentionRisk: metrics.retentionRisk },
    });

    return metrics;
  }

  async updateTeamPerformance(organizationId: string): Promise<TeamMetrics> {
    const metrics = await this.getTeamMetrics(organizationId);

    await db.insert(knowledgeAnalytics).values({
      organizationId,
      metricType: 'team_performance',
      metricValue: metrics.knowledgeTransferReadiness,
      period: 'daily',
      periodStart: new Date(),
      periodEnd: new Date(),
      dimensions: { topContributors: metrics.topContributors.length, departments: metrics.departmentStats.length },
    });

    return metrics;
  }

  async updateContentQuality(organizationId: string): Promise<ContentQualityMetrics> {
    const metrics = await this.getContentQualityMetrics(organizationId);

    await db.insert(knowledgeAnalytics).values({
      organizationId,
      metricType: 'content_quality',
      metricValue: metrics.contentFreshnessScore,
      period: 'daily',
      periodStart: new Date(),
      periodEnd: new Date(),
      dimensions: { averageDocumentAge: metrics.averageDocumentAge, duplicateContent: metrics.duplicateContent, lowConfidenceNodes: metrics.lowConfidenceNodes, needsVerification: metrics.needsVerification, accuracyScore: metrics.accuracyScore, completenessScore: metrics.completenessScore },
    });

    return metrics;
  }

  async updateIntegrationStatus(organizationId: string): Promise<IntegrationMetrics> {
    const metrics = await this.getIntegrationMetrics(organizationId);

    await db.insert(knowledgeAnalytics).values({
      organizationId,
      metricType: 'integration_status',
      metricValue: metrics.activeIntegrations,
      period: 'daily',
      periodStart: new Date(),
      periodEnd: new Date(),
      dimensions: { totalIntegrations: metrics.totalIntegrations, dataIngestionRate: metrics.dataIngestionRate, errorRate: metrics.errorRate },
    });

    return metrics;
  }

  async getTrendData(organizationId: string, metric: string, days: number = 30): Promise<TrendData[]> {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const rows = await db.select({
      date: sql<string>`DATE(${knowledgeAnalytics.periodStart})`,
      value: knowledgeAnalytics.metricValue,
    })
      .from(knowledgeAnalytics)
      .where(and(
        eq(knowledgeAnalytics.organizationId, organizationId),
        eq(knowledgeAnalytics.metricType, metric),
        gte(knowledgeAnalytics.periodStart, cutoffDate),
      ))
      .orderBy(asc(knowledgeAnalytics.periodStart));

    return rows.map((r: { date: string; value: string }) => ({
      date: new Date(r.date),
      value: Number(r.value),
    }));
  }

  async getInsights(
    organizationId: string,
    filters?: {
      type?: Insight['type'];
      severity?: Insight['severity'];
      actionable?: boolean;
    }
  ): Promise<Insight[]> {
    const conditions = [eq(knowledgeInsights.organizationId, organizationId)];

    if (filters?.type) {
      conditions.push(eq(knowledgeInsights.type, filters.type));
    }

    if (filters?.severity) {
      conditions.push(eq(knowledgeInsights.severity, filters.severity));
    }

    if (filters?.actionable !== undefined) {
      conditions.push(eq(knowledgeInsights.actionable, filters.actionable));
    }

    const rows = await db.select()
      .from(knowledgeInsights)
      .where(and(...conditions))
      .orderBy(
        sql`CASE ${knowledgeInsights.severity} WHEN 'high' THEN 0 WHEN 'medium' THEN 1 WHEN 'low' THEN 2 ELSE 3 END`,
        desc(knowledgeInsights.createdAt)
      );

    return rows.map(this.mapInsight);
  }

  async getDashboardSummary(organizationId: string): Promise<{
    overallHealth: 'excellent' | 'good' | 'fair' | 'poor';
    keyMetrics: Record<string, number>;
    topInsights: Insight[];
    recentTrends: Record<string, 'up' | 'down' | 'stable'>;
  }> {
    const [health, risk, usage, insights, knowledgeTrend, coverageTrend, searchTrend, userTrend] = await Promise.all([
      this.getKnowledgeHealth(organizationId),
      this.getRiskMetrics(organizationId),
      this.getUsageMetrics(organizationId),
      this.getInsights(organizationId, { actionable: true }),
      this.getTrendData(organizationId, 'knowledge_health', 7),
      this.getTrendData(organizationId, 'coverage_percentage', 7),
      this.getTrendData(organizationId, 'usage_metrics', 7),
      this.getTrendData(organizationId, 'daily_active_users', 7),
    ]);

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

    const recentTrends: Record<string, 'up' | 'down' | 'stable'> = {};

    const computeTrend = (data: TrendData[]) => {
      if (data.length < 2) return 'stable';
      const recent = data[data.length - 1].value;
      const previous = data[data.length - 2].value;
      if (previous === 0) return 'stable';
      const change = (recent - previous) / previous;
      if (change > 0.05) return 'up';
      if (change < -0.05) return 'down';
      return 'stable';
    };

    recentTrends['knowledge_nodes'] = computeTrend(knowledgeTrend);
    recentTrends['coverage_percentage'] = computeTrend(coverageTrend);
    recentTrends['daily_searches'] = computeTrend(searchTrend);
    recentTrends['active_users'] = computeTrend(userTrend);

    return {
      overallHealth,
      keyMetrics: {
        totalKnowledgeNodes: health.totalKnowledgeNodes,
        coveragePercentage: health.coveragePercentage,
        dailyActiveUsers: usage.dailyActiveUsers,
        employeesAtRisk: risk.employeesAtRisk,
        searchSuccessRate: usage.searchSuccessRate,
      },
      topInsights: insights.slice(0, 5),
      recentTrends,
    };
  }

  async exportReport(organizationId: string, format: 'json' | 'csv'): Promise<string> {
    const [metrics, insightsList] = await Promise.all([
      this.getMetrics(organizationId),
      this.getInsights(organizationId),
    ]);

    const data = {
      metrics,
      insights: insightsList,
      generatedAt: new Date(),
    };

    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    }

    const lines: string[] = [];
    lines.push('Metric,Value');

    for (const [key, value] of Object.entries(metrics.knowledgeHealth)) {
      if (typeof value === 'number') {
        lines.push(`knowledge_health.${key},${value}`);
      }
    }

    for (const [key, value] of Object.entries(metrics.usageMetrics)) {
      if (typeof value === 'number') {
        lines.push(`usage.${key},${value}`);
      }
    }

    for (const [key, value] of Object.entries(metrics.contentQuality)) {
      if (typeof value === 'number') {
        lines.push(`content_quality.${key},${value}`);
      }
    }

    for (const insight of insightsList) {
      lines.push(`insight.${insight.type},${insight.title}`);
    }

    return lines.join('\n');
  }

  async clearInsights(organizationId: string): Promise<void> {
    await db.delete(knowledgeInsights)
      .where(eq(knowledgeInsights.organizationId, organizationId));
  }

  async resetMetrics(organizationId: string): Promise<void> {
    await db.delete(knowledgeAnalytics)
      .where(eq(knowledgeAnalytics.organizationId, organizationId));
  }

  private async getKnowledgeHealth(organizationId: string): Promise<KnowledgeHealthMetrics> {
    const [nodeCounts, avgConfidence, nodesLastWeek, nodesToday] = await Promise.all([
      db.select({
        status: knowledgeNodes.status,
        count: count(),
      })
        .from(knowledgeNodes)
        .where(eq(knowledgeNodes.organizationId, organizationId))
        .groupBy(knowledgeNodes.status),
      db.select({ avg: avg(knowledgeNodes.confidenceScore) })
        .from(knowledgeNodes)
        .where(eq(knowledgeNodes.organizationId, organizationId))
        .then(r => Number(r[0]?.avg ?? 0)),
      db.select({ count: count() })
        .from(knowledgeNodes)
        .where(and(
          eq(knowledgeNodes.organizationId, organizationId),
          gte(knowledgeNodes.createdAt, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
        ))
        .then(r => Number(r[0]?.count ?? 0)),
      db.select({ count: count() })
        .from(knowledgeNodes)
        .where(eq(knowledgeNodes.organizationId, organizationId))
        .then(r => Number(r[0]?.count ?? 0)),
    ]);

    const totalNodes = nodesToday;
    const verifiedNodes = nodeCounts.find(n => n.status === 'verified')?.count ?? 0;
    const outdatedNodes = nodeCounts.find(n => n.status === 'outdated')?.count ?? 0;
    const draftNodes = nodeCounts.find(n => n.status === 'draft')?.count ?? 0;
    const coveragePercentage = totalNodes > 0 ? Math.round((verifiedNodes / totalNodes) * 100) : 0;
    const averageConfidence = avgConfidence;
    const growthRate = totalNodes > 0 && nodesLastWeek > 0
      ? (totalNodes - nodesLastWeek) / nodesLastWeek
      : 0;

    return {
      totalKnowledgeNodes: totalNodes,
      verifiedNodes: Number(verifiedNodes),
      outdatedNodes: Number(outdatedNodes),
      draftNodes: Number(draftNodes),
      coveragePercentage,
      averageConfidence,
      growthRate,
      lastUpdated: new Date(),
    };
  }

  private async getUsageMetrics(organizationId: string): Promise<UsageMetrics> {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const [totalSearches, uniqueUserCount, avgResults, topQueriesData, successData, dailyUsers, weeklyUsers, monthlyUsers] = await Promise.all([
      db.select({ count: count() })
        .from(knowledgeSearchQueries)
        .where(eq(knowledgeSearchQueries.organizationId, organizationId))
        .then(r => Number(r[0]?.count ?? 0)),
      db.select({ count: sql<number>`COUNT(DISTINCT ${knowledgeSearchQueries.userId})` })
        .from(knowledgeSearchQueries)
        .where(and(
          eq(knowledgeSearchQueries.organizationId, organizationId),
          gte(knowledgeSearchQueries.createdAt, thirtyDaysAgo),
        ))
        .then(r => Number(r[0]?.count ?? 0)),
      db.select({ avg: avg(knowledgeSearchQueries.resultCount) })
        .from(knowledgeSearchQueries)
        .where(eq(knowledgeSearchQueries.organizationId, organizationId))
        .then(r => Number(r[0]?.avg ?? 0)),
      db.select({
        query: knowledgeSearchQueries.query,
        count: count(),
      })
        .from(knowledgeSearchQueries)
        .where(and(
          eq(knowledgeSearchQueries.organizationId, organizationId),
          gte(knowledgeSearchQueries.createdAt, thirtyDaysAgo),
        ))
        .groupBy(knowledgeSearchQueries.query)
        .orderBy(desc(count()))
        .limit(10),
      db.select({
        total: count(),
        successful: sql<number>`SUM(CASE WHEN ${knowledgeSearchQueries.successful} = true THEN 1 ELSE 0 END)`,
      })
        .from(knowledgeSearchQueries)
        .where(and(
          eq(knowledgeSearchQueries.organizationId, organizationId),
          gte(knowledgeSearchQueries.createdAt, thirtyDaysAgo),
        ))
        .then(r => {
          const row = r[0];
          if (!row || Number(row.total) === 0) return 0;
          return Math.round((Number(row.successful) / Number(row.total)) * 100);
        }),
      db.select({ count: count() })
        .from(knowledgeSearchQueries)
        .where(and(
          eq(knowledgeSearchQueries.organizationId, organizationId),
          gte(knowledgeSearchQueries.createdAt, oneDayAgo),
        ))
        .then(r => Number(r[0]?.count ?? 0)),
      db.select({ count: count() })
        .from(knowledgeSearchQueries)
        .where(and(
          eq(knowledgeSearchQueries.organizationId, organizationId),
          gte(knowledgeSearchQueries.createdAt, sevenDaysAgo),
        ))
        .then(r => Number(r[0]?.count ?? 0)),
      db.select({ count: count() })
        .from(knowledgeSearchQueries)
        .where(and(
          eq(knowledgeSearchQueries.organizationId, organizationId),
          gte(knowledgeSearchQueries.createdAt, thirtyDaysAgo),
        ))
        .then(r => Number(r[0]?.count ?? 0)),
    ]);

    return {
      totalSearches,
      uniqueUsers: uniqueUserCount,
      avgSearchResults: Math.round(avgResults * 100) / 100,
      topQueries: topQueriesData.map(q => ({ query: q.query, count: Number(q.count) })),
      searchSuccessRate: successData,
      avgSessionDuration: 0,
      dailyActiveUsers: Math.min(dailyUsers, 100),
      weeklyActiveUsers: weeklyUsers,
      monthlyActiveUsers: monthlyUsers,
    };
  }

  private async getRiskMetrics(organizationId: string): Promise<RiskMetrics> {
    const [spofCount, contributorNodes, complianceCount] = await Promise.all([
      db.select({ count: count() })
        .from(knowledgeNodes)
        .where(and(
          eq(knowledgeNodes.organizationId, organizationId),
          eq(knowledgeNodes.status, 'draft'),
        ))
        .then(r => Number(r[0]?.count ?? 0)),
      db.select({
        nodeId: knowledgeContributions.nodeId,
        contributorCount: count(),
      })
        .from(knowledgeContributions)
        .where(eq(knowledgeContributions.organizationId, organizationId))
        .groupBy(knowledgeContributions.nodeId)
        .having(lte(count(), 1)),
      db.select({ count: count() })
        .from(knowledgeNodes)
        .where(and(
          eq(knowledgeNodes.organizationId, organizationId),
          eq(knowledgeNodes.status, 'outdated'),
        ))
        .then(r => Number(r[0]?.count ?? 0)),
    ]);

    const totalSpof = contributorNodes.length + spofCount;

    const knowledgeGaps: Array<{ area: string; severity: 'high' | 'medium' | 'low' }> = [];

    if (complianceCount > 0) {
      knowledgeGaps.push({ area: 'Outdated Knowledge', severity: complianceCount > 10 ? 'high' : complianceCount > 5 ? 'medium' : 'low' });
    }

    const draftNodeCount = spofCount;
    if (draftNodeCount > 0) {
      knowledgeGaps.push({ area: 'Unverified Drafts', severity: draftNodeCount > 10 ? 'high' : draftNodeCount > 5 ? 'medium' : 'low' });
    }

    let dataLossRisk: 'low' | 'medium' | 'high' = 'low';
    if (totalSpof > 20) dataLossRisk = 'high';
    else if (totalSpof > 10) dataLossRisk = 'medium';

    let retentionRisk: 'low' | 'medium' | 'high' = 'low';
    if (complianceCount > 15) retentionRisk = 'high';
    else if (complianceCount > 8) retentionRisk = 'medium';

    return {
      singlePointsOfFailure: totalSpof,
      employeesAtRisk: Math.min(totalSpof, 50),
      knowledgeGaps,
      complianceGaps: complianceCount,
      dataLossRisk,
      retentionRisk,
    };
  }

  private async getTeamMetrics(organizationId: string): Promise<TeamMetrics> {
    const [departmentContributions, topContributorsData, onboardingData] = await Promise.all([
      db.select({
        department: knowledgeNodes.departmentId,
        contributions: count(),
      })
        .from(knowledgeContributions)
        .innerJoin(knowledgeNodes, eq(knowledgeContributions.nodeId, knowledgeNodes.id))
        .where(and(
          eq(knowledgeContributions.organizationId, organizationId),
          eq(knowledgeNodes.organizationId, organizationId),
        ))
        .groupBy(knowledgeNodes.departmentId)
        .orderBy(desc(count()))
        .limit(20),
      db.select({
        userId: knowledgeContributions.userId,
        contributions: count(),
      })
        .from(knowledgeContributions)
        .where(eq(knowledgeContributions.organizationId, organizationId))
        .groupBy(knowledgeContributions.userId)
        .orderBy(desc(count()))
        .limit(10)
        .then(async (contribRows) => {
          if (contribRows.length === 0) return [];

          const userIds = contribRows.map(c => c.userId);
          const userRows = await db.select({
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
          })
            .from(users)
            .where(inArray(users.id, userIds));

          const userMap = new Map(userRows.map(u => [u.id, `${u.firstName} ${u.lastName}`]));

          return contribRows.map(c => ({
            id: c.userId,
            name: userMap.get(c.userId) ?? 'Unknown',
            contributions: Number(c.contributions),
            department: '',
          }));
        }),
      db.select({
        userId: knowledgeOnboardingProgress.userId,
        progress: knowledgeOnboardingProgress.progress,
        daysOnboarded: knowledgeOnboardingProgress.daysOnboarded,
      })
        .from(knowledgeOnboardingProgress)
        .where(eq(knowledgeOnboardingProgress.organizationId, organizationId))
        .orderBy(desc(knowledgeOnboardingProgress.createdAt)),
    ]);

    const departmentStats = departmentContributions.map(d => ({
      department: d.department ?? 'Unknown',
      knowledgeContributions: Number(d.contributions),
      activeMembers: Math.min(Number(d.contributions), 10),
      coverageScore: Math.min(Math.round((Number(d.contributions) / (departmentContributions[0]?.contributions ?? 1)) * 100), 100),
      searchActivity: Math.round(Number(d.contributions) * 0.4),
    }));

    const totalPossible = departmentStats.length * 100;
    const actualScore = departmentStats.reduce((sum, d) => sum + d.coverageScore, 0);
    const knowledgeTransferReadiness = totalPossible > 0 ? Math.round((actualScore / totalPossible) * 100) : 0;

    const onboardingProgress = onboardingData.map(o => ({
      employeeId: o.userId,
      name: '',
      progress: Number(o.progress),
      daysOnboarded: o.daysOnboarded,
    }));

    return {
      departmentStats,
      topContributors: topContributorsData,
      knowledgeTransferReadiness,
      onboardingProgress,
    };
  }

  private async getContentQualityMetrics(organizationId: string): Promise<ContentQualityMetrics> {
    const [docAgeResult, duplicateResult, lowConfResult, needsVerifResult, totalDocs, totalNodes] = await Promise.all([
      db.select({ avg: avg(sql<number>`EXTRACT(DAY FROM (NOW() - ${knowledgeDocuments.createdAt}))`) })
        .from(knowledgeDocuments)
        .where(eq(knowledgeDocuments.organizationId, organizationId))
        .then(r => Number(r[0]?.avg ?? 0)),
      db.select({ count: count() })
        .from(knowledgeDocuments)
        .where(and(
          eq(knowledgeDocuments.organizationId, organizationId),
          eq(knowledgeDocuments.processingStatus, 'completed'),
        ))
        .then(r => Number(r[0]?.count ?? 0)),
      db.select({ count: count() })
        .from(knowledgeNodes)
        .where(and(
          eq(knowledgeNodes.organizationId, organizationId),
          lte(knowledgeNodes.confidenceScore, 0.3),
        ))
        .then(r => Number(r[0]?.count ?? 0)),
      db.select({ count: count() })
        .from(knowledgeNodes)
        .where(and(
          eq(knowledgeNodes.organizationId, organizationId),
          eq(knowledgeNodes.status, 'draft'),
        ))
        .then(r => Number(r[0]?.count ?? 0)),
      db.select({ count: count() })
        .from(knowledgeDocuments)
        .where(eq(knowledgeDocuments.organizationId, organizationId))
        .then(r => Number(r[0]?.count ?? 0)),
      db.select({ count: count() })
        .from(knowledgeNodes)
        .where(eq(knowledgeNodes.organizationId, organizationId))
        .then(r => Number(r[0]?.count ?? 0)),
    ]);

    const duplicateCount = Math.max(0, Math.round(duplicateResult * 0.05));

    const freshnessScore = docAgeResult < 30 ? 90 : docAgeResult < 60 ? 70 : docAgeResult < 90 ? 50 : 30;
    const accuracyScore = totalNodes > 0 ? Math.round(((totalNodes - lowConfResult) / totalNodes) * 100) : 0;
    const completenessScore = totalDocs > 0 ? Math.min(100, Math.round((totalDocs / Math.max(totalNodes, 1)) * 100)) : 0;

    return {
      averageDocumentAge: docAgeResult,
      duplicateContent: duplicateCount,
      lowConfidenceNodes: lowConfResult,
      needsVerification: needsVerifResult,
      contentFreshnessScore: Math.min(100, freshnessScore),
      accuracyScore: Math.min(100, accuracyScore),
      completenessScore: Math.min(100, completenessScore),
    };
  }

  private async getIntegrationMetrics(organizationId: string): Promise<IntegrationMetrics> {
    const [allIntegrations, syncs] = await Promise.all([
      db.select({
        id: integrations.id,
        name: integrations.name,
        status: integrations.status,
        lastSyncAt: integrations.lastSyncAt,
        errorCount: integrations.errorCount,
      })
        .from(integrations)
        .where(eq(integrations.organizationId, organizationId)),
      db.select({
        integrationType: knowledgeIntegrationSyncs.integrationType,
        itemsProcessed: sql<number>`SUM(${knowledgeIntegrationSyncs.itemsProcessed})`,
        errors: sql<number>`SUM(${knowledgeIntegrationSyncs.errors})`,
        status: knowledgeIntegrationSyncs.status,
      })
        .from(knowledgeIntegrationSyncs)
        .where(eq(knowledgeIntegrationSyncs.organizationId, organizationId))
        .groupBy(knowledgeIntegrationSyncs.integrationType, knowledgeIntegrationSyncs.status),
    ]);

    const totalIntegrations = allIntegrations.length;
    const activeIntegrations = allIntegrations.filter(i => i.status === 'active').length;

    const syncStatus = allIntegrations.map(i => ({
      integration: i.name,
      status: (i.status === 'active' ? 'active' : i.status === 'error' ? 'error' : 'idle') as 'active' | 'error' | 'idle',
      lastSync: i.lastSyncAt ?? new Date(),
      itemsProcessed: syncs
        .filter(s => s.integrationType === i.name)
        .reduce((sum, s) => sum + Number(s.itemsProcessed ?? 0), 0),
    }));

    const totalItemsProcessed = syncs.reduce((sum, s) => sum + Number(s.itemsProcessed ?? 0), 0);
    const totalErrors = syncs.reduce((sum, s) => sum + Number(s.errors ?? 0), 0);
    const dataIngestionRate = totalItemsProcessed > 0 ? Math.round(totalItemsProcessed / 24) : 0;
    const errorRate = totalItemsProcessed > 0 ? Math.round((totalErrors / totalItemsProcessed) * 100) : 0;

    return {
      activeIntegrations,
      totalIntegrations,
      syncStatus,
      dataIngestionRate,
      errorRate,
    };
  }

  private mapInsight(row: typeof knowledgeInsights.$inferSelect): Insight {
    const typeMap: Record<string, Insight['type']> = {
      opportunity: 'opportunity',
      risk: 'warning',
      gap: 'warning',
      duplicate: 'info',
      trend: 'info',
      faq: 'info',
      expert: 'success',
      missing: 'warning',
    };

    const severityMap: Record<string, Insight['severity']> = {
      high: 'high',
      medium: 'medium',
      low: 'low',
      critical: 'high',
      info: 'low',
    };

    return {
      id: row.id,
      type: typeMap[row.type] ?? 'info',
      title: row.title,
      description: row.description ?? '',
      severity: severityMap[row.severity] ?? 'low',
      actionable: row.actionable,
      suggestedActions: row.suggestedActions as string[] | undefined,
      createdAt: row.createdAt,
    };
  }
}

export const analyticsDashboardService = new AnalyticsDashboardService();
