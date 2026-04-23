/**
 * Agent Insights and Predictive Insights Service
 * 
 * This service generates real-time insights and predictive insights from data,
 * enabling agents to provide descriptive, diagnostic, predictive, and prescriptive analytics.
 */

import { db } from '../db';
import { agent_insights, aiAgents } from '../db/drizzle-schema';
import { eq, and, desc } from 'drizzle-orm';

export type InsightType = 'descriptive' | 'diagnostic' | 'predictive' | 'prescriptive';
export type InsightPriority = 'low' | 'medium' | 'high' | 'critical';
export type InsightStatus = 'active' | 'archived' | 'acted_upon' | 'dismissed';

export interface Insight {
  id?: string;
  organizationId: string;
  agentId: string;
  insightType: InsightType;
  title: string;
  description: string;
  confidenceScore?: number;
  supportingData?: Record<string, any>;
  recommendations?: Array<{
    action: string;
    priority: string;
    expectedImpact: string;
    effort: 'low' | 'medium' | 'high';
  }>;
  priority: InsightPriority;
  status?: InsightStatus;
  relatedInsights?: string[];
  metadata?: Record<string, any>;
  expiresAt?: Date;
}

export interface PredictiveModel {
  name: string;
  type: string;
  accuracy: number;
  trainedAt: Date;
  features: string[];
  predictions: Array<{
    outcome: any;
    probability: number;
    confidence: number;
    timeframe: string;
  }>;
}

export interface InsightsConfig {
  enabled: boolean;
  predictive: boolean;
  confidenceThreshold: number;
  autoGenerate: boolean;
  insightTypes: InsightType[];
  maxInsightsPerDay?: number;
  retentionDays?: number;
}

class InsightsPredictiveService {
  /**
   * Generate a new insight
   */
  async generateInsight(insight: Insight): Promise<Insight> {
    const result = await db.insert(agent_insights).values({
      organization_id: insight.organizationId,
      agent_id: insight.agentId,
      insight_type: insight.insightType,
      title: insight.title,
      description: insight.description,
      confidence_score: insight.confidenceScore,
      supporting_data: insight.supportingData || {},
      recommendations: insight.recommendations || [],
      priority: insight.priority,
      status: insight.status || 'active',
      related_insights: insight.relatedInsights || [],
      metadata: insight.metadata || {},
      expires_at: insight.expiresAt,
    }).returning();

    return {
      id: result[0].id,
      organizationId: result[0].organization_id,
      agentId: result[0].agent_id,
      insightType: result[0].insight_type as InsightType,
      title: result[0].title,
      description: result[0].description,
      confidenceScore: result[0].confidence_score,
      supportingData: result[0].supporting_data,
      recommendations: result[0].recommendations,
      priority: result[0].priority as InsightPriority,
      status: result[0].status as InsightStatus,
      relatedInsights: result[0].related_insights,
      metadata: result[0].metadata,
      expiresAt: result[0].expires_at,
    };
  }

  /**
   * Get insights for an agent
   */
  async getAgentInsights(agentId: string, options?: {
    limit?: number;
    insightType?: InsightType;
    priority?: InsightPriority;
    status?: InsightStatus;
    includeExpired?: boolean;
  }): Promise<Insight[]> {
    let query = db.select()
      .from(agent_insights)
      .where(eq(agent_insights.agent_id, agentId))
      .orderBy(desc(agent_insights.created_at));

    if (options?.insightType) {
      query = query.where(and(
        eq(agent_insights.agent_id, agentId),
        eq(agent_insights.insight_type, options.insightType)
      ));
    }

    if (options?.priority) {
      query = query.where(and(
        eq(agent_insights.agent_id, agentId),
        eq(agent_insights.priority, options.priority)
      ));
    }

    if (options?.status) {
      query = query.where(and(
        eq(agent_insights.agent_id, agentId),
        eq(agent_insights.status, options.status)
      ));
    }

    if (!options?.includeExpired) {
      query = query.where(and(
        eq(agent_insights.agent_id, agentId),
        or(
          isNull(agent_insights.expires_at),
          gt(agent_insights.expires_at, new Date())
        )
      ));
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const results = await query;

    return results.map(row => ({
      id: row.id,
      organizationId: row.organization_id,
      agentId: row.agent_id,
      insightType: row.insight_type as InsightType,
      title: row.title,
      description: row.description,
      confidenceScore: row.confidence_score,
      supportingData: row.supporting_data,
      recommendations: row.recommendations,
      priority: row.priority as InsightPriority,
      status: row.status as InsightStatus,
      relatedInsights: row.related_insights,
      metadata: row.metadata,
      expiresAt: row.expires_at,
    }));
  }

  /**
   * Generate predictive insights based on historical data
   */
  async generatePredictiveInsights(agentId: string, data: {
    historicalData: any[];
    forecastHorizon: number; // days
    targetMetric: string;
    features?: string[];
  }): Promise<Insight[]> {
    const insights: Insight[] = [];

    // Get agent's insights config
    const agent = await db.select()
      .from(aiAgents)
      .where(eq(aiAgents.id, agentId))
      .limit(1);

    if (!agent[0]) {
      throw new Error(`Agent not found: ${agentId}`);
    }

    const config = agent[0].insights_config || {};
    if (!config.enabled || !config.predictive) {
      throw new Error('Predictive insights not enabled for this agent');
    }

    // Placeholder for predictive modeling - integrate with actual ML service
    // This would use time series forecasting, regression, classification, etc.

    const prediction = {
      predictedValue: 0,
      confidence: 0.8,
      trend: 'stable',
      riskFactors: [],
      opportunities: [],
    };

    // Generate predictive insight
    insights.push({
      organizationId: agent[0].organization_id,
      agentId,
      insightType: 'predictive',
      title: `Predictive Insight: ${data.targetMetric} Forecast`,
      description: `Based on analysis of ${data.historicalData.length} historical data points, 
        the predicted ${data.targetMetric} for the next ${data.forecastHorizon} days shows:
        Trend: ${prediction.trend}
        Confidence: ${(prediction.confidence * 100).toFixed(1)}%
        Risk Factors: ${prediction.riskFactors.join(', ') || 'None identified'}
        Opportunities: ${prediction.opportunities.join(', ') || 'None identified'}`,
      confidenceScore: prediction.confidence,
      supportingData: {
        historicalDataPoints: data.historicalData.length,
        forecastHorizon: data.forecastHorizon,
        targetMetric: data.targetMetric,
        prediction: prediction.predictedValue,
        trend: prediction.trend,
      },
      recommendations: [
        {
          action: 'Monitor trends closely and prepare contingency plans',
          priority: 'high',
          expectedImpact: 'Proactive risk mitigation',
          effort: 'medium',
        },
        {
          action: 'Identify opportunities for optimization',
          priority: 'medium',
          expectedImpact: 'Performance improvement',
          effort: 'low',
        },
      ],
      priority: prediction.confidence > 0.9 ? 'high' : 'medium',
      metadata: {
        modelType: 'predictive_forecasting',
        generatedAt: new Date().toISOString(),
      },
      expiresAt: new Date(Date.now() + data.forecastHorizon * 24 * 60 * 60 * 1000),
    });

    // Generate prescriptive recommendations
    if (prediction.riskFactors.length > 0) {
      insights.push({
        organizationId: agent[0].organization_id,
        agentId,
        insightType: 'prescriptive',
        title: `Recommended Actions: ${data.targetMetric} Risk Mitigation`,
        description: `To mitigate identified risks to ${data.targetMetric}, consider the following actions:
          ${prediction.riskFactors.map((risk, i) => `${i + 1}. ${risk}`).join('\n          ')}`,
        confidenceScore: 0.75,
        recommendations: prediction.riskFactors.map(risk => ({
          action: `Address: ${risk}`,
          priority: 'high',
          expectedImpact: 'Risk reduction',
          effort: 'medium' as const,
        })),
        priority: 'high',
        metadata: {
          riskFactors: prediction.riskFactors,
          generatedAt: new Date().toISOString(),
        },
      });
    }

    // Store all insights
    const storedInsights: Insight[] = [];
    for (const insight of insights) {
      const stored = await this.generateInsight(insight);
      storedInsights.push(stored);
    }

    return storedInsights;
  }

  /**
   * Analyze data and generate descriptive insights
   */
  async generateDescriptiveInsights(agentId: string, data: {
    dataset: any[];
    metrics: string[];
    timeframe: { start: Date; end: Date };
  }): Promise<Insight> {
    // Calculate basic statistics (placeholder - integrate with actual analytics)
    const stats = {
      total: data.dataset.length,
      averages: {},
      trends: {},
      anomalies: [],
    };

    const insight: Insight = {
      organizationId: (await db.select().from(aiAgents).where(eq(aiAgents.id, agentId)))[0].organization_id,
      agentId,
      insightType: 'descriptive',
      title: 'Data Overview and Summary',
      description: `Analysis of ${stats.total} data points across ${data.metrics.length} metrics 
        from ${data.timeframe.start.toDateString()} to ${data.timeframe.end.toDateString()}.
        Key findings and patterns identified.`,
      confidenceScore: 0.9,
      supportingData: {
        dataPoints: stats.total,
        metrics: data.metrics,
        timeframe: data.timeframe,
        statistics: stats,
      },
      priority: 'medium',
      metadata: {
        analysisType: 'descriptive',
        generatedAt: new Date().toISOString(),
      },
    };

    return this.generateInsight(insight);
  }

  /**
   * Perform root cause analysis (diagnostic insights)
   */
  async generateDiagnosticInsights(agentId: string, data: {
    issue: string;
    symptoms: string[];
    context: Record<string, any>;
  }): Promise<Insight> {
    // Placeholder for diagnostic analysis - integrate with actual diagnostic engine
    const diagnosis = {
      rootCauses: [
        { cause: 'Potential cause 1', confidence: 0.6 },
        { cause: 'Potential cause 2', confidence: 0.4 },
      ],
      contributingFactors: ['Factor 1', 'Factor 2'],
    };

    const insight: Insight = {
      organizationId: (await db.select().from(aiAgents).where(eq(aiAgents.id, agentId)))[0].organization_id,
      agentId,
      insightType: 'diagnostic',
      title: `Root Cause Analysis: ${data.issue}`,
      description: `Diagnostic analysis of "${data.issue}" with ${data.symptoms.length} symptoms.
        
        Potential Root Causes:
        ${diagnosis.rootCauses.map((rc, i) => `${i + 1}. ${rc.cause} (${(rc.confidence * 100).toFixed(0)}% confidence)`).join('\n        ')}
        
        Contributing Factors:
        ${diagnosis.contributingFactors.join(', ') || 'None identified'}`,
      confidenceScore: diagnosis.rootCauses[0]?.confidence || 0.6,
      supportingData: {
        issue: data.issue,
        symptoms: data.symptoms,
        context: data.context,
        rootCauses: diagnosis.rootCauses,
        contributingFactors: diagnosis.contributingFactors,
      },
      recommendations: [
        {
          action: 'Investigate top root cause and implement corrective actions',
          priority: 'high',
          expectedImpact: 'Issue resolution',
          effort: 'medium',
        },
      ],
      priority: 'high',
      metadata: {
        analysisType: 'diagnostic',
        generatedAt: new Date().toISOString(),
      },
    };

    return this.generateInsight(insight);
  }

  /**
   * Update insight status
   */
  async updateInsightStatus(insightId: string, status: InsightStatus): Promise<void> {
    await db.update(agent_insights)
      .set({ status })
      .where(eq(agent_insights.id, insightId));
  }

  /**
   * Link related insights
   */
  async linkInsights(insightId: string, relatedInsightIds: string[]): Promise<void> {
    await db.update(agent_insights)
      .set({ related_insights: relatedInsightIds })
      .where(eq(agent_insights.id, insightId));
  }

  /**
   * Get insight statistics for an agent
   */
  async getInsightStats(agentId: string): Promise<{
    totalInsights: number;
    byType: Record<InsightType, number>;
    byPriority: Record<InsightPriority, number>;
    averageConfidence: number;
    actedUponRate: number;
  }> {
    const insights = await this.getAgentInsights(agentId, { includeExpired: true });

    const byType: Record<InsightType, number> = {
      descriptive: 0,
      diagnostic: 0,
      predictive: 0,
      prescriptive: 0,
    };

    const byPriority: Record<InsightPriority, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    };

    let totalConfidence = 0;
    let confidenceCount = 0;
    let actedUpon = 0;

    insights.forEach(insight => {
      byType[insight.insightType]++;
      byPriority[insight.priority]++;

      if (insight.confidenceScore) {
        totalConfidence += insight.confidenceScore;
        confidenceCount++;
      }

      if (insight.status === 'acted_upon') {
        actedUpon++;
      }
    });

    return {
      totalInsights: insights.length,
      byType,
      byPriority,
      averageConfidence: confidenceCount > 0 ? totalConfidence / confidenceCount : 0,
      actedUponRate: insights.length > 0 ? actedUpon / insights.length : 0,
    };
  }

  /**
   * Archive old insights
   */
  async archiveOldInsights(agentId: string, olderThan: Date): Promise<number> {
    const result = await db.update(agent_insights)
      .set({ status: 'archived' })
      .where(and(
        eq(agent_insights.agent_id, agentId),
        eq(agent_insights.status, 'active'),
        lt(agent_insights.created_at, olderThan)
      ));

    return result.rowCount || 0;
  }

  /**
   * Delete expired insights
   */
  async cleanupExpiredInsights(): Promise<number> {
    const result = await db.delete(agent_insights)
      .where(and(
        isNotNull(agent_insights.expires_at),
        lt(agent_insights.expires_at, new Date())
      ));

    return result.rowCount || 0;
  }
}

// Helper functions for drizzle-orm queries
function or(...conditions: any[]): any {
  return conditions;
}

function isNull(column: any): any {
  return { isNull: true };
}

function gt(column: any, value: any): any {
  return { gt: value };
}

function lt(column: any, value: any): any {
  return { lt: value };
}

export const insightsPredictiveService = new InsightsPredictiveService();
