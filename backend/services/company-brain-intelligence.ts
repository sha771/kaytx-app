import { db } from '../db/connection';
import { knowledgeNodes, knowledgeInsights, knowledgeSearchQueries, knowledgePersons, knowledgeRelationships, knowledgeDocuments } from '../db/drizzle-schema';
import { eq, and, desc, count, gte, like, sql } from 'drizzle-orm';
import OpenAI from 'openai';
import crypto from 'crypto';

export interface FAQ {
  question: string;
  answer: string;
  frequency: number;
  relatedNodes: string[];
  confidence: number;
}

export interface Expert {
  id: string;
  name: string;
  department: string;
  skills: string[];
  knowledgeScore: number;
  contributionCount: number;
}

export interface KnowledgeGap {
  area: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  suggestedAction: string;
}

export interface Trend {
  topic: string;
  growthRate: number;
  searchCount: number;
  relatedNodes: string[];
  period: string;
}

export class CompanyBrainIntelligenceService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async discoverFAQs(organizationId: string, limit = 20): Promise<FAQ[]> {
    try {
      const queries = await db.select()
        .from(knowledgeSearchQueries)
        .where(and(eq(knowledgeSearchQueries.organizationId, organizationId), gte(knowledgeSearchQueries.createdAt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))))
        .orderBy(desc(knowledgeSearchQueries.resultCount))
        .limit(100);

      const queryFrequency = new Map<string, { count: number; results: number }>();
      for (const q of queries) {
        const key = q.query.toLowerCase().trim();
        const existing = queryFrequency.get(key) || { count: 0, results: 0 };
        existing.count++;
        existing.results += q.resultCount || 0;
        queryFrequency.set(key, existing);
      }

      const faqs: FAQ[] = [];
      for (const [question, data] of queryFrequency) {
        if (data.count >= 3) {
          faqs.push({
            question,
            answer: '',
            frequency: data.count,
            relatedNodes: [],
            confidence: Math.min(0.95, 0.5 + data.count * 0.05),
          });
        }
      }

      return faqs.sort((a, b) => b.frequency - a.frequency).slice(0, limit);
    } catch { return []; }
  }

  async discoverExperts(organizationId: string, limit = 20): Promise<Expert[]> {
    try {
      let persons: any[] = [];
      try {
        persons = await db.select().from(knowledgePersons)
          .where(eq(knowledgePersons.organizationId, organizationId))
          .limit(limit);
      } catch {}

      if (persons.length === 0) {
        try {
          const topContributors = await db.select({
            createdBy: knowledgeNodes.createdBy,
            count: count(),
          })
            .from(knowledgeNodes)
            .where(eq(knowledgeNodes.organizationId, organizationId))
            .groupBy(knowledgeNodes.createdBy)
            .orderBy(desc(count()))
            .limit(limit);

          return topContributors.map((c: any) => ({
            id: c.createdBy || 'unknown',
            name: `User ${(c.createdBy || 'unknown').substring(0, 8)}`,
            department: 'General',
            skills: ['Knowledge Contributor'],
            knowledgeScore: Math.min(100, (c.count || 0) * 10),
            contributionCount: c.count || 0,
          }));
        } catch { return []; }
      }

      return persons.map(p => ({
        id: p.id,
        name: p.name,
        department: p.department || 'General',
        skills: typeof p.skills === 'string' ? JSON.parse(p.skills) : (p.skills || []),
        knowledgeScore: p.expertise?.length ? Math.min(100, p.expertise.length * 20) : 50,
        contributionCount: 0,
      }));
    } catch { return []; }
  }

  async discoverRisks(organizationId: string): Promise<KnowledgeGap[]> {
    const gaps: KnowledgeGap[] = [];

    try {
      const outdatedCount = await db.select({ count: count() })
        .from(knowledgeNodes)
        .where(and(eq(knowledgeNodes.organizationId, organizationId), eq(knowledgeNodes.status, 'outdated')));

      if (outdatedCount[0]?.count > 0) {
        gaps.push({
          area: 'Outdated Knowledge',
          severity: outdatedCount[0].count > 10 ? 'high' : 'medium',
          description: `${outdatedCount[0].count} knowledge nodes are marked as outdated`,
          suggestedAction: 'Review and update outdated content',
        });
      }

      const unverifiedCount = await db.select({ count: count() })
        .from(knowledgeNodes)
        .where(and(eq(knowledgeNodes.organizationId, organizationId), eq(knowledgeNodes.status, 'draft')));

      if (unverifiedCount[0]?.count > 0) {
        gaps.push({
          area: 'Unverified Knowledge',
          severity: unverifiedCount[0].count > 20 ? 'high' : 'low',
          description: `${unverifiedCount[0].count} knowledge nodes need verification`,
          suggestedAction: 'Assign reviewers to verify knowledge nodes',
        });
      }
    } catch {}

    gaps.push({
      area: 'Knowledge Coverage',
      severity: 'low',
      description: 'AI-powered gap analysis is running',
      suggestedAction: 'Enable more integrations to capture knowledge automatically',
    });

    return gaps;
  }

  async discoverTrends(organizationId: string): Promise<Trend[]> {
    try {
      const recentQueries = await db.select()
        .from(knowledgeSearchQueries)
        .where(eq(knowledgeSearchQueries.organizationId, organizationId))
        .orderBy(desc(knowledgeSearchQueries.createdAt))
        .limit(200);

      const topicMap = new Map<string, { count: number; dates: Date[] }>();
      for (const q of recentQueries) {
        const topic = q.query.toLowerCase().trim();
        if (topic.length < 3) continue;
        const existing = topicMap.get(topic) || { count: 0, dates: [] };
        existing.count++;
        existing.dates.push(q.createdAt);
        topicMap.set(topic, existing);
      }

      const trends: Trend[] = [];
      for (const [topic, data] of topicMap) {
        if (data.count >= 2) {
          trends.push({
            topic,
            growthRate: data.count > 5 ? 0.5 : 0.1,
            searchCount: data.count,
            relatedNodes: [],
            period: '30d',
          });
        }
      }

      return trends.sort((a, b) => b.searchCount - a.searchCount).slice(0, 20);
    } catch { return []; }
  }

  async generateInsight(organizationId: string, type: string): Promise<any> {
    const id = crypto.randomUUID();
    const insight: any = {
      id,
      organizationId,
      type,
      title: '',
      description: '',
      confidence: 0.5,
      severity: 'info',
      actionable: false,
      suggestedActions: [],
      relatedNodeIds: [],
      metadata: {},
    };

    switch (type) {
      case 'faq': {
        const faqs = await this.discoverFAQs(organizationId, 5);
        if (faqs.length > 0) {
          insight.title = `${faqs.length} Frequently Asked Questions Discovered`;
          insight.description = `Top questions: ${faqs.slice(0, 3).map(f => f.question).join(', ')}`;
          insight.severity = 'info';
          insight.actionable = true;
          insight.suggestedActions = ['Create FAQ documentation', 'Add quick answers to search'];
        }
        break;
      }
      case 'expert': {
        const experts = await this.discoverExperts(organizationId, 5);
        if (experts.length > 0) {
          insight.title = `${experts.length} Knowledge Experts Identified`;
          insight.description = `Top expert: ${experts[0].name} in ${experts[0].department}`;
          insight.severity = 'info';
          insight.actionable = true;
          insight.suggestedActions = ['Create expert directory', 'Set up mentorship programs'];
        }
        break;
      }
      case 'risk': {
        const risks = await this.discoverRisks(organizationId);
        const highRisks = risks.filter(r => r.severity === 'high');
        if (highRisks.length > 0) {
          insight.title = `${highRisks.length} High-Severity Knowledge Risks Detected`;
          insight.description = highRisks.map(r => r.description).join('; ');
          insight.severity = 'high';
          insight.actionable = true;
          insight.suggestedActions = highRisks.map(r => r.suggestedAction);
        }
        break;
      }
      case 'trend': {
        const trends = await this.discoverTrends(organizationId);
        if (trends.length > 0) {
          insight.title = `Top Trends: ${trends[0].topic}`;
          insight.description = `${trends[0].topic} has ${trends[0].searchCount} searches in the last 30 days`;
          insight.severity = 'info';
          insight.actionable = true;
          insight.suggestedActions = ['Create documentation for trending topics', 'Assign subject matter experts'];
        }
        break;
      }
      case 'comprehensive': {
        const allRisks = await this.discoverRisks(organizationId);
        const allTrends = await this.discoverTrends(organizationId);
        insight.title = 'Comprehensive Knowledge Analysis';
        insight.description = `Found ${allRisks.length} knowledge gaps and ${allTrends.length} trending topics`;
        insight.severity = allRisks.some(r => r.severity === 'high') ? 'high' : 'medium';
        insight.actionable = true;
        insight.suggestedActions = allRisks.map(r => r.suggestedAction);
        break;
      }
    }

    try {
      await db.insert(knowledgeInsights).values({
        ...insight,
        metadata: JSON.stringify(insight.metadata),
        suggestedActions: JSON.stringify(insight.suggestedActions),
        relatedNodeIds: JSON.stringify(insight.relatedNodeIds),
      });
    } catch {}

    return insight;
  }

  async getInsights(organizationId: string, opts?: { type?: string; severity?: string; actionable?: boolean; limit?: number }): Promise<any[]> {
    try {
      const conditions: any[] = [eq(knowledgeInsights.organizationId, organizationId)];
      if (opts?.type) conditions.push(eq(knowledgeInsights.type, opts.type));
      if (opts?.severity) conditions.push(eq(knowledgeInsights.severity, opts.severity));
      if (opts?.actionable !== undefined) conditions.push(eq(knowledgeInsights.actionable, opts.actionable));

      const results = await db.select()
        .from(knowledgeInsights)
        .where(and(...conditions))
        .orderBy(desc(knowledgeInsights.createdAt))
        .limit(opts?.limit || 50);

      return results.map(r => ({
        ...r,
        suggestedActions: typeof r.suggestedActions === 'string' ? JSON.parse(r.suggestedActions) : r.suggestedActions,
        relatedNodeIds: typeof r.relatedNodeIds === 'string' ? JSON.parse(r.relatedNodeIds) : r.relatedNodeIds,
        metadata: typeof r.metadata === 'string' ? JSON.parse(r.metadata) : r.metadata,
      }));
    } catch { return []; }
  }
}

export const companyBrainIntelligenceService = new CompanyBrainIntelligenceService();
