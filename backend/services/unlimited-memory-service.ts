/**
 * Agent Unlimited Memory System Service
 * 
 * This service manages unlimited memory capabilities for AI agents,
 * enabling short-term, medium-term, long-term, and infinite memory storage
 * with intelligent indexing, retrieval, and optimization.
 */

import { db } from '../db';
import { agent_memories, aiAgents } from '../db/drizzle-schema';
import { eq, and, desc, or, like, gt, lt, asc } from 'drizzle-orm';

export type MemoryType = 'short_term' | 'medium_term' | 'long_term' | 'infinite';
export type MemoryCategory = 'conversation' | 'task' | 'decision' | 'learning' | 'insight' | 'preference' | 'context' | 'other';

export interface MemoryEntry {
  id?: string;
  organizationId: string;
  agentId: string;
  memoryType: MemoryType;
  category?: MemoryCategory;
  title?: string;
  content: string;
  context?: Record<string, any>;
  associations?: string[];
  importanceScore?: number;
  accessCount?: number;
  lastAccessedAt?: Date;
  isCompressed?: boolean;
  metadata?: Record<string, any>;
}

export interface MemoryConfig {
  shortTerm: boolean;
  mediumTerm: boolean;
  longTerm: boolean;
  infinite: boolean;
  maxStorage: 'limited' | 'standard' | 'high' | 'unlimited';
  retentionDays?: {
    shortTerm?: number;
    mediumTerm?: number;
    longTerm?: number;
    infinite?: number;
  };
  autoCompress: boolean;
  compressionThreshold?: number; // days
}

export interface MemorySearchResult {
  memories: MemoryEntry[];
  total: number;
  relevance: number;
}

export interface MemoryAnalytics {
  totalMemories: number;
  byType: Record<MemoryType, number>;
  byCategory: Record<MemoryCategory, number>;
  averageImportance: number;
  accessPatterns: {
    frequentlyAccessed: number;
    rarelyAccessed: number;
    neverAccessed: number;
  };
  storageUsed: string;
  compressionRate: number;
}

class UnlimitedMemoryService {
  /**
   * Store a new memory
   */
  async storeMemory(memory: MemoryEntry): Promise<MemoryEntry> {
    const result = await db.insert(agent_memories).values({
      organization_id: memory.organizationId,
      agent_id: memory.agentId,
      memory_type: memory.memoryType,
      category: memory.category,
      title: memory.title,
      content: memory.content,
      context: memory.context || {},
      associations: memory.associations || [],
      importance_score: memory.importanceScore || 0.5,
      access_count: memory.accessCount || 0,
      is_compressed: memory.isCompressed || false,
      metadata: memory.metadata || {},
    }).returning();

    return {
      id: result[0].id,
      organizationId: result[0].organization_id,
      agentId: result[0].agent_id,
      memoryType: result[0].memory_type as MemoryType,
      category: result[0].category as MemoryCategory,
      title: result[0].title,
      content: result[0].content,
      context: result[0].context,
      associations: result[0].associations,
      importanceScore: result[0].importance_score,
      accessCount: result[0].access_count,
      lastAccessedAt: result[0].last_accessed_at,
      isCompressed: result[0].is_compressed,
      metadata: result[0].metadata,
    };
  }

  /**
   * Retrieve a memory by ID
   */
  async getMemoryById(memoryId: string): Promise<MemoryEntry> {
    const result = await db.select()
      .from(agent_memories)
      .where(eq(agent_memories.id, memoryId))
      .limit(1);

    if (!result[0]) {
      throw new Error(`Memory not found: ${memoryId}`);
    }

    // Update access count and last accessed time
    await db.update(agent_memories)
      .set({
        access_count: (result[0].access_count || 0) + 1,
        last_accessed_at: new Date(),
      })
      .where(eq(agent_memories.id, memoryId));

    return {
      id: result[0].id,
      organizationId: result[0].organization_id,
      agentId: result[0].agent_id,
      memoryType: result[0].memory_type as MemoryType,
      category: result[0].category as MemoryCategory,
      title: result[0].title,
      content: result[0].content,
      context: result[0].context,
      associations: result[0].associations,
      importanceScore: result[0].importance_score,
      accessCount: (result[0].access_count || 0) + 1,
      lastAccessedAt: new Date(),
      isCompressed: result[0].is_compressed,
      metadata: result[0].metadata,
    };
  }

  /**
   * Retrieve memories for an agent with filtering
   */
  async getMemories(agentId: string, options?: {
    memoryType?: MemoryType;
    category?: MemoryCategory;
    minImportance?: number;
    maxResults?: number;
    searchQuery?: string;
    includeCompressed?: boolean;
  }): Promise<MemoryEntry[]> {
    let query = db.select()
      .from(agent_memories)
      .where(eq(agent_memories.agent_id, agentId))
      .orderBy(desc(agent_memories.importance_score), desc(agent_memories.created_at));

    if (options?.memoryType) {
      query = query.where(and(
        eq(agent_memories.agent_id, agentId),
        eq(agent_memories.memory_type, options.memoryType)
      ));
    }

    if (options?.category) {
      query = query.where(and(
        eq(agent_memories.agent_id, agentId),
        eq(agent_memories.category, options.category)
      ));
    }

    if (options?.minImportance !== undefined) {
      query = query.where(and(
        eq(agent_memories.agent_id, agentId),
        gt(agent_memories.importance_score, options.minImportance)
      ));
    }

    if (options?.includeCompressed === false) {
      query = query.where(and(
        eq(agent_memories.agent_id, agentId),
        eq(agent_memories.is_compressed, false)
      ));
    }

    if (options?.searchQuery) {
      query = query.where(and(
        eq(agent_memories.agent_id, agentId),
        or(
          like(agent_memories.title, `%${options.searchQuery}%`),
          like(agent_memories.content, `%${options.searchQuery}%`)
        )
      ));
    }

    if (options?.maxResults) {
      query = query.limit(options.maxResults);
    }

    const results = await query;

    return results.map(row => ({
      id: row.id,
      organizationId: row.organization_id,
      agentId: row.agent_id,
      memoryType: row.memory_type as MemoryType,
      category: row.category as MemoryCategory,
      title: row.title,
      content: row.content,
      context: row.context,
      associations: row.associations,
      importanceScore: row.importance_score,
      accessCount: row.access_count,
      lastAccessedAt: row.last_accessed_at,
      isCompressed: row.is_compressed,
      metadata: row.metadata,
    }));
  }

  /**
   * Search memories with contextual relevance
   */
  async searchMemories(agentId: string, context: {
    query: string;
    category?: MemoryCategory;
    memoryTypes?: MemoryType[];
    minImportance?: number;
    maxResults?: number;
  }): Promise<MemorySearchResult> {
    let query = db.select()
      .from(agent_memories)
      .where(and(
        eq(agent_memories.agent_id, agentId),
        or(
          like(agent_memories.title, `%${context.query}%`),
          like(agent_memories.content, `%${context.query}%`)
        )
      ));

    if (context.category) {
      query = query.where(eq(agent_memories.category, context.category));
    }

    if (context.memoryTypes && context.memoryTypes.length > 0) {
      const conditions = context.memoryTypes.map(type => 
        eq(agent_memories.memory_type, type)
      );
      query = query.where(or(...conditions));
    }

    if (context.minImportance !== undefined) {
      query = query.where(gt(agent_memories.importance_score, context.minImportance));
    }

    const results = await query;

    const memories = results.map(row => ({
      id: row.id,
      organizationId: row.organization_id,
      agentId: row.agent_id,
      memoryType: row.memory_type as MemoryType,
      category: row.category as MemoryCategory,
      title: row.title,
      content: row.content,
      context: row.context,
      associations: row.associations,
      importanceScore: row.importance_score,
      accessCount: row.access_count,
      lastAccessedAt: row.last_accessed_at,
      isCompressed: row.is_compressed,
      metadata: row.metadata,
    }));

    // Calculate relevance score based on importance and access patterns
    const relevance = memories.length > 0
      ? memories.reduce((sum, m) => sum + (m.importanceScore || 0.5), 0) / memories.length
      : 0;

    return {
      memories: memories.slice(0, context.maxResults),
      total: memories.length,
      relevance,
    };
  }

  /**
   * Update a memory
   */
  async updateMemory(memoryId: string, updates: Partial<MemoryEntry>): Promise<MemoryEntry> {
    const result = await db.update(agent_memories)
      .set({
        title: updates.title,
        content: updates.content,
        context: updates.context,
        associations: updates.associations,
        importance_score: updates.importanceScore,
        is_compressed: updates.isCompressed,
        metadata: updates.metadata,
        updated_at: new Date(),
      })
      .where(eq(agent_memories.id, memoryId))
      .returning();

    if (!result[0]) {
      throw new Error(`Memory not found: ${memoryId}`);
    }

    return {
      id: result[0].id,
      organizationId: result[0].organization_id,
      agentId: result[0].agent_id,
      memoryType: result[0].memory_type as MemoryType,
      category: result[0].category as MemoryCategory,
      title: result[0].title,
      content: result[0].content,
      context: result[0].context,
      associations: result[0].associations,
      importanceScore: result[0].importance_score,
      accessCount: result[0].access_count,
      lastAccessedAt: result[0].last_accessed_at,
      isCompressed: result[0].is_compressed,
      metadata: result[0].metadata,
    };
  }

  /**
   * Delete a memory
   */
  async deleteMemory(memoryId: string): Promise<void> {
    await db.delete(agent_memories)
      .where(eq(agent_memories.id, memoryId));
  }

  /**
   * Associate memories (create links between related memories)
   */
  async associateMemories(memoryId: string, associatedMemoryIds: string[]): Promise<void> {
    const memory = await this.getMemoryById(memoryId);
    const currentAssociations = memory.associations || [];

    const updatedAssociations = [...new Set([...currentAssociations, ...associatedMemoryIds])];

    await db.update(agent_memories)
      .set({ associations: updatedAssociations })
      .where(eq(agent_memories.id, memoryId));
  }

  /**
   * Compress old or rarely accessed memories
   */
  async compressOldMemories(agentId: string, options?: {
    olderThan?: Date;
    maxAccessCount?: number;
    memoryType?: MemoryType;
  }): Promise<number> {
    let query = db.select()
      .from(agent_memories)
      .where(and(
        eq(agent_memories.agent_id, agentId),
        eq(agent_memories.is_compressed, false)
      ));

    if (options?.olderThan) {
      query = query.where(lt(agent_memories.created_at, options.olderThan));
    }

    if (options?.maxAccessCount !== undefined) {
      query = query.where(lt(agent_memories.access_count, options.maxAccessCount));
    }

    if (options?.memoryType) {
      query = query.where(eq(agent_memories.memory_type, options.memoryType));
    }

    const memories = await query;

    let compressedCount = 0;
    for (const memory of memories) {
      await db.update(agent_memories)
        .set({ is_compressed: true })
        .where(eq(agent_memories.id, memory.id));
      compressedCount++;
    }

    return compressedCount;
  }

  /**
   * Get memory configuration for an agent
   */
  async getMemoryConfig(agentId: string): Promise<MemoryConfig> {
    const agent = await db.select()
      .from(aiAgents)
      .where(eq(aiAgents.id, agentId))
      .limit(1);

    if (!agent[0]) {
      throw new Error(`Agent not found: ${agentId}`);
    }

    return agent[0].memory_config || {
      shortTerm: true,
      mediumTerm: true,
      longTerm: true,
      infinite: false,
      maxStorage: 'unlimited',
      autoCompress: true,
    };
  }

  /**
   * Update memory configuration
   */
  async updateMemoryConfig(agentId: string, config: Partial<MemoryConfig>): Promise<MemoryConfig> {
    const agent = await db.select()
      .from(aiAgents)
      .where(eq(aiAgents.id, agentId))
      .limit(1);

    if (!agent[0]) {
      throw new Error(`Agent not found: ${agentId}`);
    }

    const currentConfig = agent[0].memory_config || {};
    const updatedConfig = { ...currentConfig, ...config };

    await db.update(aiAgents)
      .set({ 
        memory_config: updatedConfig,
        updated_at: new Date()
      })
      .where(eq(aiAgents.id, agentId));

    return updatedConfig;
  }

  /**
   * Get memory analytics for an agent
   */
  async getMemoryAnalytics(agentId: string): Promise<MemoryAnalytics> {
    const memories = await db.select()
      .from(agent_memories)
      .where(eq(agent_memories.agent_id, agentId));

    const analytics: MemoryAnalytics = {
      totalMemories: memories.length,
      byType: {
        short_term: 0,
        medium_term: 0,
        long_term: 0,
        infinite: 0,
      },
      byCategory: {
        conversation: 0,
        task: 0,
        decision: 0,
        learning: 0,
        insight: 0,
        preference: 0,
        context: 0,
        other: 0,
      },
      averageImportance: 0,
      accessPatterns: {
        frequentlyAccessed: 0,
        rarelyAccessed: 0,
        neverAccessed: 0,
      },
      storageUsed: '0 MB',
      compressionRate: 0,
    };

    let totalImportance = 0;
    let compressedCount = 0;

    memories.forEach(memory => {
      analytics.byType[memory.memory_type as MemoryType]++;
      
      if (memory.category) {
        analytics.byCategory[memory.category as MemoryCategory]++;
      }

      totalImportance += memory.importance_score || 0;

      if ((memory.access_count || 0) >= 10) {
        analytics.accessPatterns.frequentlyAccessed++;
      } else if ((memory.access_count || 0) >= 1) {
        analytics.accessPatterns.rarelyAccessed++;
      } else {
        analytics.accessPatterns.neverAccessed++;
      }

      if (memory.is_compressed) {
        compressedCount++;
      }
    });

    analytics.averageImportance = memories.length > 0 ? totalImportance / memories.length : 0;
    analytics.compressionRate = memories.length > 0 ? compressedCount / memories.length : 0;

    // Estimate storage (placeholder calculation)
    const totalContent = memories.reduce((sum, m) => sum + m.content.length, 0);
    analytics.storageUsed = `${(totalContent / 1024 / 1024).toFixed(2)} MB`;

    return analytics;
  }

  /**
   * Consolidate short-term memories into medium-term
   */
  async consolidateShortToMediumTerm(agentId: string, options?: {
    olderThan?: Date;
    minImportance?: number;
  }): Promise<number> {
    const olderThan = options?.olderThan || new Date(Date.now() - 48 * 60 * 60 * 1000); // Default: 48 hours
    const minImportance = options?.minImportance || 0.6;

    const shortTermMemories = await db.select()
      .from(agent_memories)
      .where(and(
        eq(agent_memories.agent_id, agentId),
        eq(agent_memories.memory_type, 'short_term'),
        lt(agent_memories.created_at, olderThan),
        gt(agent_memories.importance_score, minImportance)
      ));

    let consolidatedCount = 0;
    for (const memory of shortTermMemories) {
      // Update to medium_term
      await db.update(agent_memories)
        .set({ memory_type: 'medium_term' })
        .where(eq(agent_memories.id, memory.id));
      consolidatedCount++;
    }

    return consolidatedCount;
  }

  /**
   * Consolidate medium-term memories into long-term
   */
  async consolidateMediumToLongTerm(agentId: string, options?: {
    olderThan?: Date;
    minImportance?: number;
  }): Promise<number> {
    const olderThan = options?.olderThan || new Date(Date.now() - 90 * 24 * 60 * 60 * 1000); // Default: 90 days
    const minImportance = options?.minImportance || 0.7;

    const mediumTermMemories = await db.select()
      .from(agent_memories)
      .where(and(
        eq(agent_memories.agent_id, agentId),
        eq(agent_memories.memory_type, 'medium_term'),
        lt(agent_memories.created_at, olderThan),
        gt(agent_memories.importance_score, minImportance)
      ));

    let consolidatedCount = 0;
    for (const memory of mediumTermMemories) {
      // Update to long_term
      await db.update(agent_memories)
        .set({ memory_type: 'long_term' })
        .where(eq(agent_memories.id, memory.id));
      consolidatedCount++;
    }

    return consolidatedCount;
  }

  /**
   * Clean up old memories based on retention policy
   */
  async cleanupOldMemories(agentId: string): Promise<number> {
    const config = await this.getMemoryConfig(agentId);
    let deletedCount = 0;

    const now = new Date();

    // Clean up short-term memories
    if (config.retentionDays?.shortTerm) {
      const cutoffDate = new Date(now.getTime() - config.retentionDays.shortTerm * 24 * 60 * 60 * 1000);
      const result = await db.delete(agent_memories)
        .where(and(
          eq(agent_memories.agent_id, agentId),
          eq(agent_memories.memory_type, 'short_term'),
          lt(agent_memories.created_at, cutoffDate),
          lt(agent_memories.importance_score, 0.5)
        ));
      deletedCount += result.rowCount || 0;
    }

    // Clean up medium-term memories
    if (config.retentionDays?.mediumTerm) {
      const cutoffDate = new Date(now.getTime() - config.retentionDays.mediumTerm * 24 * 60 * 60 * 1000);
      const result = await db.delete(agent_memories)
        .where(and(
          eq(agent_memories.agent_id, agentId),
          eq(agent_memories.memory_type, 'medium_term'),
          lt(agent_memories.created_at, cutoffDate),
          lt(agent_memories.importance_score, 0.4)
        ));
      deletedCount += result.rowCount || 0;
    }

    // Clean up long-term memories (only very low importance)
    if (config.retentionDays?.longTerm) {
      const cutoffDate = new Date(now.getTime() - config.retentionDays.longTerm * 24 * 60 * 60 * 1000);
      const result = await db.delete(agent_memories)
        .where(and(
          eq(agent_memories.agent_id, agentId),
          eq(agent_memories.memory_type, 'long_term'),
          lt(agent_memories.created_at, cutoffDate),
          lt(agent_memories.importance_score, 0.3)
        ));
      deletedCount += result.rowCount || 0;
    }

    return deletedCount;
  }
}

// Helper functions for drizzle-orm
function like(column: any, pattern: string): any {
  return { like: pattern };
}

export const unlimitedMemoryService = new UnlimitedMemoryService();
