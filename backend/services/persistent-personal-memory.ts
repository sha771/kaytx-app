import { db } from '../db/connection';
import {
  agentPersonalMemories,
  agentMemoryPreferences,
  agentUserRelationships,
  agentMemoryInsights,
} from '../db/drizzle-schema';
import { and, eq, desc, asc, sql, inArray, gt, lt } from 'drizzle-orm';
import { createLogger } from '../lib/production-logger';
import { logAudit } from '../lib/audit';
import crypto from 'crypto';

const logger = createLogger('PersistentPersonalMemory');

/**
 * Personal Memory Types
 */
export type PersonalMemoryType = 
  | 'preference'      // User likes/dislikes
  | 'fact'           // Facts about the user
  | 'goal'           // User goals and objectives
  | 'history'        // Interaction history
  | 'context'        // Contextual information
  | 'relationship'   // Relationship dynamics
  | 'habit'          // User habits and patterns
  | 'skill'          // User skills and expertise
  | 'value'          // User values and principles
  | 'emotion'        // Emotional patterns
  | 'schedule'       // User schedule preferences
  | 'communication'  // Communication preferences
  | 'workstyle'      // Work style preferences
  | 'decision';      // Past decisions and outcomes

/**
 * Personal Memory Entry
 */
export interface PersonalMemory {
  id: string;
  agentId: string;
  userId: string;
  organizationId: string;
  type: PersonalMemoryType;
  category: string;
  content: string;
  context?: string;
  importance: number; // 0-100
  confidence: number; // 0-100
  source: 'explicit' | 'inferred' | 'observed' | 'third_party';
  verified: boolean;
  verificationCount: number;
  lastVerifiedAt?: Date;
  expiresAt?: Date;
  relatedMemoryIds: string[];
  tags: string[];
  metadata: Record<string, unknown>;
  accessCount: number;
  lastAccessed: Date;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

/**
 * User Relationship Profile
 */
export interface UserRelationshipProfile {
  id: string;
  agentId: string;
  userId: string;
  organizationId: string;
  relationshipStage: 'new' | 'acquaintance' | 'familiar' | 'close' | 'trusted';
  trustLevel: number; // 0-100
  rapportScore: number; // 0-100
  interactionCount: number;
  totalConversations: number;
  averageSessionDuration: number;
  preferredCommunicationStyle: string;
  knownPainPoints: string[];
  knownInterests: string[];
  collaborationHistory: {
    successfulProjects: number;
    failedProjects: number;
    averageSatisfaction: number;
  };
  memoryHighlights: string[]; // Top memory IDs
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Memory Query Options
 */
export interface MemoryQueryOptions {
  types?: PersonalMemoryType[];
  categories?: string[];
  tags?: string[];
  minImportance?: number;
  minConfidence?: number;
  verifiedOnly?: boolean;
  timeRange?: { start: Date; end: Date };
  limit?: number;
  orderBy?: 'importance' | 'recency' | 'relevance' | 'confidence';
}

/**
 * Memory Insight
 */
export interface MemoryInsight {
  id: string;
  agentId: string;
  userId: string;
  type: 'pattern' | 'recommendation' | 'prediction' | 'anomaly';
  title: string;
  description: string;
  relatedMemoryIds: string[];
  confidence: number;
  actionable: boolean;
  actionSuggestion?: string;
  createdAt: Date;
}

/**
 * Persistent Personal Memory Service
 * Enables AI agents to remember users across sessions with rich personal context
 */
export class PersistentPersonalMemoryService {
  private static instance: PersistentPersonalMemoryService;
  private insightGenerationInterval?: NodeJS.Timeout;

  private constructor() {
    this.startInsightGeneration();
  }

  static getInstance(): PersistentPersonalMemoryService {
    if (!PersistentPersonalMemoryService.instance) {
      PersistentPersonalMemoryService.instance = new PersistentPersonalMemoryService();
    }
    return PersistentPersonalMemoryService.instance;
  }

  /**
   * Store a personal memory for a user
   */
  async storeMemory(
    agentId: string,
    userId: string,
    organizationId: string,
    memory: Omit<PersonalMemory, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'accessCount' | 'lastAccessed' | 'verificationCount'>
  ): Promise<PersonalMemory> {
    const id = crypto.randomUUID();
    const now = new Date();

    try {
      // Check for similar existing memories to avoid duplicates
      const similarMemories = await this.findSimilarMemories(
        agentId,
        userId,
        memory.type,
        memory.content
      );

      if (similarMemories.length > 0) {
        // Update existing memory with new information
        const existing = similarMemories[0];
        const updatedConfidence = Math.min(100, existing.confidence + 5);
        const updatedVersion = existing.version + 1;

        await db.update(agentPersonalMemories)
          .set({
            content: memory.content,
            context: memory.context || existing.context,
            confidence: updatedConfidence,
            verificationCount: existing.verificationCount + 1,
            lastVerifiedAt: now,
            updatedAt: now,
            version: updatedVersion,
            metadata: { ...existing.metadata, updated: true },
          })
          .where(eq(agentPersonalMemories.id, existing.id));

        logger.info(`Updated existing memory ${existing.id} for user ${userId}`);
        
        await logAudit({
          userId,
          organizationId,
          action: 'personal_memory_updated',
          resource: 'agent_personal_memory',
          resourceId: existing.id,
          details: { type: memory.type, agentId },
        });

        return { ...existing, ...memory, confidence: updatedConfidence, version: updatedVersion, updatedAt: now };
      }

      // Create new memory
      const newMemory: PersonalMemory = {
        id,
        agentId,
        userId,
        organizationId,
        ...memory,
        accessCount: 0,
        verificationCount: memory.verified ? 1 : 0,
        lastVerifiedAt: memory.verified ? now : undefined,
        lastAccessed: now,
        createdAt: now,
        updatedAt: now,
        version: 1,
      };

      await db.insert(agentPersonalMemories).values({
        id: newMemory.id,
        agentId: newMemory.agentId,
        userId: newMemory.userId,
        organizationId: newMemory.organizationId,
        type: newMemory.type,
        category: newMemory.category,
        content: newMemory.content,
        context: newMemory.context,
        importance: newMemory.importance,
        confidence: newMemory.confidence,
        source: newMemory.source,
        verified: newMemory.verified,
        verificationCount: newMemory.verificationCount,
        lastVerifiedAt: newMemory.lastVerifiedAt,
        expiresAt: newMemory.expiresAt,
        relatedMemoryIds: newMemory.relatedMemoryIds,
        tags: newMemory.tags,
        metadata: newMemory.metadata,
        accessCount: newMemory.accessCount,
        lastAccessed: newMemory.lastAccessed,
        createdAt: newMemory.createdAt,
        updatedAt: newMemory.updatedAt,
        version: newMemory.version,
      });

      logger.info(`Created new memory ${id} for user ${userId}`);

      await logAudit({
        userId,
        organizationId,
        action: 'personal_memory_created',
        resource: 'agent_personal_memory',
        resourceId: id,
        details: { type: memory.type, agentId, importance: memory.importance },
      });

      // Update relationship interaction count
      await this.updateRelationshipStats(agentId, userId, organizationId);

      return newMemory;
    } catch (error) {
      logger.error('Failed to store personal memory:', error);
      throw error;
    }
  }

  /**
   * Retrieve memories for a user
   */
  async retrieveMemories(
    agentId: string,
    userId: string,
    options: MemoryQueryOptions = {}
  ): Promise<PersonalMemory[]> {
    const {
      types,
      categories,
      tags,
      minImportance = 0,
      minConfidence = 0,
      verifiedOnly = false,
      timeRange,
      limit = 50,
      orderBy = 'importance',
    } = options;

    try {
      let query = db.select()
        .from(agentPersonalMemories)
        .where(and(
          eq(agentPersonalMemories.agentId, agentId),
          eq(agentPersonalMemories.userId, userId),
          gt(agentPersonalMemories.importance, minImportance),
          gt(agentPersonalMemories.confidence, minConfidence),
          verifiedOnly ? eq(agentPersonalMemories.verified, true) : undefined
        ));

      if (types?.length) {
        query = query.where(inArray(agentPersonalMemories.type, types));
      }

      if (categories?.length) {
        query = query.where(inArray(agentPersonalMemories.category, categories));
      }

      if (timeRange) {
        query = query.where(and(
          gt(agentPersonalMemories.createdAt, timeRange.start),
          lt(agentPersonalMemories.createdAt, timeRange.end)
        ));
      }

      // Order by
      switch (orderBy) {
        case 'recency':
          query = query.orderBy(desc(agentPersonalMemories.updatedAt));
          break;
        case 'relevance':
          query = query.orderBy(desc(agentPersonalMemories.accessCount));
          break;
        case 'confidence':
          query = query.orderBy(desc(agentPersonalMemories.confidence));
          break;
        case 'importance':
        default:
          query = query.orderBy(desc(agentPersonalMemories.importance));
      }

      query = query.limit(limit);

      const memories = await query;

      // Update access counts
      for (const memory of memories) {
        await this.incrementAccessCount(memory.id);
      }

      // Tag filtering in memory if needed
      if (tags?.length) {
        return memories.filter(m => m.tags?.some(t => tags.includes(t)));
      }

      return memories;
    } catch (error) {
      logger.error('Failed to retrieve memories:', error);
      throw error;
    }
  }

  /**
   * Get context-aware memories for a conversation
   */
  async getContextualMemories(
    agentId: string,
    userId: string,
    context: string,
    maxResults = 10
  ): Promise<PersonalMemory[]> {
    // Get high-importance memories first
    const highImportanceMemories = await this.retrieveMemories(agentId, userId, {
      minImportance: 70,
      limit: maxResults / 2,
      orderBy: 'importance',
    });

    // Get recent memories
    const recentMemories = await this.retrieveMemories(agentId, userId, {
      limit: maxResults / 2,
      orderBy: 'recency',
    });

    // Get relevant memories based on context keywords
    const contextKeywords = context.toLowerCase().split(/\s+/);
    const allMemories = await this.retrieveMemories(agentId, userId, { limit: 100 });
    
    const relevantMemories = allMemories.filter(m => 
      contextKeywords.some(kw => 
        m.content.toLowerCase().includes(kw) || 
        m.category.toLowerCase().includes(kw) ||
        m.tags?.some(t => t.toLowerCase().includes(kw))
      )
    ).slice(0, maxResults / 2);

    // Combine and deduplicate
    const combined = [...highImportanceMemories, ...recentMemories, ...relevantMemories];
    const unique = combined.filter((m, i, arr) => arr.findIndex(t => t.id === m.id) === i);
    
    return unique.slice(0, maxResults);
  }

  /**
   * Get or create user relationship profile
   */
  async getOrCreateRelationshipProfile(
    agentId: string,
    userId: string,
    organizationId: string
  ): Promise<UserRelationshipProfile> {
    try {
      let [profile] = await db.select()
        .from(agentUserRelationships)
        .where(and(
          eq(agentUserRelationships.agentId, agentId),
          eq(agentUserRelationships.userId, userId)
        ));

      if (!profile) {
        const now = new Date();
        const newProfile: UserRelationshipProfile = {
          id: crypto.randomUUID(),
          agentId,
          userId,
          organizationId,
          relationshipStage: 'new',
          trustLevel: 30,
          rapportScore: 25,
          interactionCount: 0,
          totalConversations: 0,
          averageSessionDuration: 0,
          preferredCommunicationStyle: 'professional',
          knownPainPoints: [],
          knownInterests: [],
          collaborationHistory: {
            successfulProjects: 0,
            failedProjects: 0,
            averageSatisfaction: 0,
          },
          memoryHighlights: [],
          createdAt: now,
          updatedAt: now,
        };

        await db.insert(agentUserRelationships).values({
          id: newProfile.id,
          agentId: newProfile.agentId,
          userId: newProfile.userId,
          organizationId: newProfile.organizationId,
          relationshipStage: newProfile.relationshipStage,
          trustLevel: newProfile.trustLevel,
          rapportScore: newProfile.rapportScore,
          interactionCount: newProfile.interactionCount,
          totalConversations: newProfile.totalConversations,
          averageSessionDuration: newProfile.averageSessionDuration,
          preferredCommunicationStyle: newProfile.preferredCommunicationStyle,
          knownPainPoints: newProfile.knownPainPoints,
          knownInterests: newProfile.knownInterests,
          collaborationHistory: newProfile.collaborationHistory,
          memoryHighlights: newProfile.memoryHighlights,
          createdAt: newProfile.createdAt,
          updatedAt: newProfile.updatedAt,
        });

        return newProfile;
      }

      return profile as UserRelationshipProfile;
    } catch (error) {
      logger.error('Failed to get/create relationship profile:', error);
      throw error;
    }
  }

  /**
   * Update relationship statistics
   */
  private async updateRelationshipStats(
    agentId: string,
    userId: string,
    organizationId: string
  ): Promise<void> {
    const profile = await this.getOrCreateRelationshipProfile(agentId, userId, organizationId);
    
    const now = new Date();
    const newInteractionCount = profile.interactionCount + 1;
    
    // Update relationship stage based on interaction count
    let newStage = profile.relationshipStage;
    if (newInteractionCount > 100) newStage = 'trusted';
    else if (newInteractionCount > 50) newStage = 'close';
    else if (newInteractionCount > 20) newStage = 'familiar';
    else if (newInteractionCount > 5) newStage = 'acquaintance';

    await db.update(agentUserRelationships)
      .set({
        interactionCount: newInteractionCount,
        relationshipStage: newStage,
        trustLevel: Math.min(100, profile.trustLevel + 0.5),
        rapportScore: Math.min(100, profile.rapportScore + 0.3),
        updatedAt: now,
      })
      .where(eq(agentUserRelationships.id, profile.id));
  }

  /**
   * Generate insights from memories
   */
  async generateInsights(agentId: string, userId: string): Promise<MemoryInsight[]> {
    const memories = await this.retrieveMemories(agentId, userId, { limit: 200 });
    const insights: MemoryInsight[] = [];

    // Pattern detection
    const patterns = this.detectPatterns(memories);
    for (const pattern of patterns) {
      insights.push({
        id: crypto.randomUUID(),
        agentId,
        userId,
        type: 'pattern',
        title: pattern.title,
        description: pattern.description,
        relatedMemoryIds: pattern.memoryIds,
        confidence: pattern.confidence,
        actionable: pattern.actionable,
        actionSuggestion: pattern.suggestion,
        createdAt: new Date(),
      });
    }

    // Store insights
    for (const insight of insights) {
      await db.insert(agentMemoryInsights).values({
        id: insight.id,
        agentId: insight.agentId,
        userId: insight.userId,
        type: insight.type,
        title: insight.title,
        description: insight.description,
        relatedMemoryIds: insight.relatedMemoryIds,
        confidence: insight.confidence,
        actionable: insight.actionable,
        actionSuggestion: insight.actionSuggestion,
        createdAt: insight.createdAt,
      });
    }

    return insights;
  }

  /**
   * Detect patterns in memories
   */
  private detectPatterns(memories: PersonalMemory[]): {
    title: string;
    description: string;
    memoryIds: string[];
    confidence: number;
    actionable: boolean;
    suggestion?: string;
  }[] {
    const patterns: {
      title: string;
      description: string;
      memoryIds: string[];
      confidence: number;
      actionable: boolean;
      suggestion?: string;
    }[] = [];

    // Group by type and category
    const byType = new Map<string, PersonalMemory[]>();
    for (const m of memories) {
      const key = `${m.type}:${m.category}`;
      if (!byType.has(key)) byType.set(key, []);
      byType.get(key)!.push(m);
    }

    // Detect frequent preferences
    for (const [key, group] of byType) {
      if (group.length >= 3) {
        patterns.push({
          title: `Consistent ${group[0].category} Pattern`,
          description: `User has ${group.length} recorded ${group[0].type} entries in ${group[0].category}`,
          memoryIds: group.map(m => m.id),
          confidence: Math.min(95, 50 + group.length * 10),
          actionable: true,
          suggestion: `Reference these ${group[0].category} preferences in future interactions`,
        });
      }
    }

    // Detect high-importance clusters
    const highImportance = memories.filter(m => m.importance >= 80);
    if (highImportance.length >= 5) {
      patterns.push({
        title: 'High-Priority Topics',
        description: `User has ${highImportance.length} high-importance items that should always be considered`,
        memoryIds: highImportance.map(m => m.id),
        confidence: 90,
        actionable: true,
        suggestion: 'Always reference these high-priority topics in decision-making',
      });
    }

    return patterns;
  }

  /**
   * Find similar memories to avoid duplication
   */
  private async findSimilarMemories(
    agentId: string,
    userId: string,
    type: string,
    content: string
  ): Promise<PersonalMemory[]> {
    const memories = await db.select()
      .from(agentPersonalMemories)
      .where(and(
        eq(agentPersonalMemories.agentId, agentId),
        eq(agentPersonalMemories.userId, userId),
        eq(agentPersonalMemories.type, type)
      ));

    // Simple similarity check based on content overlap
    const contentWords = new Set(content.toLowerCase().split(/\s+/));
    return memories.filter(m => {
      const mWords = new Set(m.content.toLowerCase().split(/\s+/));
      const intersection = new Set([...contentWords].filter(x => mWords.has(x)));
      const similarity = intersection.size / Math.max(contentWords.size, mWords.size);
      return similarity > 0.7; // 70% similar
    });
  }

  /**
   * Increment memory access count
   */
  private async incrementAccessCount(memoryId: string): Promise<void> {
    await db.update(agentPersonalMemories)
      .set({
        accessCount: sql`${agentPersonalMemories.accessCount} + 1`,
        lastAccessed: new Date(),
      })
      .where(eq(agentPersonalMemories.id, memoryId));
  }

  /**
   * Verify a memory
   */
  async verifyMemory(
    memoryId: string,
    verified: boolean
  ): Promise<void> {
    const now = new Date();
    await db.update(agentPersonalMemories)
      .set({
        verified,
        verificationCount: sql`${agentPersonalMemories.verificationCount} + 1`,
        lastVerifiedAt: now,
        updatedAt: now,
      })
      .where(eq(agentPersonalMemories.id, memoryId));
  }

  /**
   * Delete expired memories
   */
  async cleanupExpiredMemories(): Promise<number> {
    const now = new Date();
    const result = await db.delete(agentPersonalMemories)
      .where(and(
        lt(agentPersonalMemories.expiresAt, now),
        gt(agentPersonalMemories.importance, 30) // Keep important memories even if expired
      ));

    logger.info(`Cleaned up expired memories`);
    return result.length || 0;
  }

  /**
   * Get memory statistics for a user
   */
  async getMemoryStats(agentId: string, userId: string): Promise<{
    totalMemories: number;
    byType: Record<string, number>;
    averageImportance: number;
    averageConfidence: number;
    verifiedCount: number;
    relationshipStage: string;
    trustLevel: number;
  }> {
    const memories = await this.retrieveMemories(agentId, userId, { limit: 1000 });
    const profile = await this.getOrCreateRelationshipProfile(agentId, userId, '');

    const byType: Record<string, number> = {};
    for (const m of memories) {
      byType[m.type] = (byType[m.type] || 0) + 1;
    }

    const averageImportance = memories.length > 0
      ? memories.reduce((sum, m) => sum + m.importance, 0) / memories.length
      : 0;

    const averageConfidence = memories.length > 0
      ? memories.reduce((sum, m) => sum + m.confidence, 0) / memories.length
      : 0;

    return {
      totalMemories: memories.length,
      byType,
      averageImportance,
      averageConfidence,
      verifiedCount: memories.filter(m => m.verified).length,
      relationshipStage: profile.relationshipStage,
      trustLevel: profile.trustLevel,
    };
  }

  /**
   * Start periodic insight generation
   */
  private startInsightGeneration(): void {
    // Generate insights every 24 hours
    this.insightGenerationInterval = setInterval(async () => {
      try {
        const relationships = await db.select()
          .from(agentUserRelationships)
          .where(gt(agentUserRelationships.interactionCount, 10));

        for (const rel of relationships) {
          await this.generateInsights(rel.agentId, rel.userId);
        }

        // Cleanup expired memories
        await this.cleanupExpiredMemories();
      } catch (error) {
        logger.error('Insight generation failed:', error);
      }
    }, 24 * 60 * 60 * 1000);
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    if (this.insightGenerationInterval) {
      clearInterval(this.insightGenerationInterval);
    }
  }
}

// Export singleton instance
export const persistentPersonalMemory = PersistentPersonalMemoryService.getInstance();
