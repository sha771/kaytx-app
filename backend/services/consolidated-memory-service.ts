import { db as pgDb } from '../db/connection';
import {
  agentMemories,
  memoryAssociations,
  memorySummarizationJobs,
  memoryArchivalJobs,
  memoryContextWindows,
  memoryAccessPatterns,
} from '../db/drizzle-schema';
import { and, eq, desc, asc, lte, gt, or, ilike, inArray, sql, lt } from 'drizzle-orm';
import OpenAI from 'openai';
import { vectorEmbeddingService } from './vector-embedding-service';
import { semanticSearchService } from './semantic-search-service';
import { createLogger } from '../lib/production-logger';
import { logAudit } from '../lib/audit';
import crypto from 'crypto';

const logger = createLogger('ConsolidatedMemoryService');

/**
 * Consolidated Memory Service
 * Combines functionality from:
 * - unified-memory-service.ts
 * - memory-management-service.ts  
 * - memory-processing-service.ts
 * - agent-memory-service.ts
 */

export interface MemoryEntry {
  id: string;
  organizationId: string;
  userId: string;
  agentId?: string;
  sessionId?: string;
  type: 'conversation' | 'preference' | 'knowledge' | 'skill' | 'context' | 'emotion' | 'episodic' | 'semantic' | 'procedural' | 'working';
  contentType?: 'text' | 'image' | 'audio' | 'video' | 'document';
  content: string;
  importance: number; // 0-100
  priority: 'low' | 'medium' | 'high' | 'critical';
  accessLevel: 'public' | 'private' | 'restricted';
  isEncrypted: boolean;
  retentionDays: number;
  tags: string[];
  metadata: Record<string, unknown>;
  childIds: string[];
  parentId?: string;
  accessCount: number;
  lastAccessed: Date;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface MemorySummaryConfig {
  maxMemoriesPerAgent: number;
  maxAgeDays: number;
  minImportanceScore: number;
  summaryIntervalHours: number;
  pruningIntervalHours: number;
  batchSize: number;
}

export interface SummaryJob {
  id: string;
  agentId: string;
  organizationId: string;
  type: 'daily' | 'weekly' | 'monthly' | 'topic';
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  memoriesProcessed: number;
  summaryGenerated: string;
  error?: string;
}

export interface PruningJob {
  id: string;
  agentId: string;
  organizationId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  memoriesPruned: number;
  criteria: {
    ageDays?: number;
    minImportanceScore?: number;
    maxAccessCount?: number;
    memoryType?: string;
  };
  error?: string;
}

export interface MemorySearchOptions {
  query?: string;
  type?: string;
  contentType?: string;
  tags?: string[];
  importanceRange?: [number, number];
  dateRange?: { start: Date; end: Date };
  limit?: number;
  offset?: number;
  includeVector?: boolean;
}

export interface MemoryContextWindow {
  id: string;
  agentId: string;
  sessionId?: string;
  windowType: 'conversation' | 'task' | 'context';
  memories: string[]; // Memory IDs
  maxTokens: number;
  currentTokens: number;
  priority: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class ConsolidatedMemoryService {
  private openai: OpenAI | null;
  private config: MemorySummaryConfig;
  private activeJobs: Map<string, unknown> = new Map();
  private summaryJobInterval?: ReturnType<typeof setInterval>;
  private pruningJobInterval?: ReturnType<typeof setInterval>;

  constructor(config?: Partial<MemorySummaryConfig>) {
    this.config = {
      maxMemoriesPerAgent: 10000,
      maxAgeDays: 365,
      minImportanceScore: 10,
      summaryIntervalHours: 24,
      pruningIntervalHours: 168, // 1 week
      batchSize: 100,
      ...config
    };

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (openaiApiKey) {
      this.openai = new OpenAI({
        apiKey: openaiApiKey,
      });
    } else {
      this.openai = null;
      if (process.env.NODE_ENV !== 'production') {
        logger.warn('[ConsolidatedMemoryService] OPENAI_API_KEY not set; AI memory features will be disabled in development');
      }
    }

    // Start background jobs
    this.startBackgroundJobs();
  }

  /**
   * Store a new memory entry
   */
  async storeMemory(memory: Omit<MemoryEntry, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'accessCount'>): Promise<MemoryEntry> {
    const id = crypto.randomUUID();
    const now = new Date();
    
    const memoryEntry: MemoryEntry = {
      ...memory,
      id,
      accessCount: 0,
      lastAccessed: now,
      createdAt: now,
      updatedAt: now,
      version: 1,
    };

    // Generate embedding if content is text
    let embedding: number[] | null = null;
    if (memory.contentType === 'text' && memory.content) {
      try {
        embedding = await vectorEmbeddingService.generateEmbedding(memory.content);
      } catch (error) {
        logger.warn('[ConsolidatedMemoryService] Failed to generate embedding', { error: String(error) });
      }
    }

    // Store in database
    await pgDb.insert(agentMemories).values({
      organizationId: memoryEntry.organizationId,
      agentId: memoryEntry.agentId!,
      content: memoryEntry.content,
      contentType: memoryEntry.contentType || 'text',
      embedding: embedding || new Array(1536).fill(0), // Ensure non-null embedding
      metadata: memoryEntry.metadata,
      tags: memoryEntry.tags,
      importanceScore: (memoryEntry.importance / 100).toString(), // Convert to 0-1 scale as string
      accessCount: memoryEntry.accessCount,
      lastAccessedAt: memoryEntry.lastAccessed,
      memoryType: (memoryEntry.type === 'conversation' || memoryEntry.type === 'preference' || memoryEntry.type === 'knowledge' || memoryEntry.type === 'skill' || memoryEntry.type === 'context' || memoryEntry.type === 'emotion') ? 'episodic' : memoryEntry.type,
      createdAt: memoryEntry.createdAt,
      updatedAt: memoryEntry.updatedAt,
    });

    // Log audit event
    await logAudit({
      userId: memoryEntry.userId,
      organizationId: memoryEntry.organizationId,
      action: 'memory_stored',
      resource: 'memory',
      resourceId: memoryEntry.id,
      status: 'success',
      metadata: {
        type: memoryEntry.type,
        contentType: memoryEntry.contentType,
        importance: memoryEntry.importance,
      }
    });

    return memoryEntry;
  }

  /**
   * Retrieve memory by ID
   */
  async getMemory(memoryId: string, organizationId: string): Promise<MemoryEntry | null> {
    const [memory] = await pgDb
      .select()
      .from(agentMemories)
      .where(
        and(
          eq(agentMemories.id, memoryId),
          eq(agentMemories.organizationId, organizationId)
        )
      )
      .limit(1);

    if (!memory) return null;

    // Update access count and last accessed
    await pgDb
      .update(agentMemories)
      .set({
        accessCount: sql`${agentMemories.accessCount} + 1`,
        lastAccessedAt: new Date(),
      })
      .where(eq(agentMemories.id, memoryId));

    // Record access pattern
    await this.recordAccessPattern(memoryId, organizationId, memory?.agentId);

    return this.mapDbMemoryToMemoryEntry(memory);
  }

  /**
   * Search memories with various filters
   */
  async searchMemories(
    organizationId: string,
    options: MemorySearchOptions = {}
  ): Promise<{ memories: MemoryEntry[]; total: number }> {
    const filters: unknown[] = [eq(agentMemories.organizationId, organizationId)];
    
    if (options.type) {
      filters.push(eq(agentMemories.memoryType, options.type as any));
    }
    if (options.contentType) {
      filters.push(eq(agentMemories.contentType, options.contentType as any));
    }
    if (options.importanceRange) {
      filters.push(
        sql`cast(${agentMemories.importanceScore} as float) >= ${options.importanceRange[0] / 100}`,
        sql`cast(${agentMemories.importanceScore} as float) <= ${options.importanceRange[1] / 100}`
      );
    }
    if (options.dateRange) {
      filters.push(
        sql`${agentMemories.createdAt} >= ${options.dateRange.start}`,
        sql`${agentMemories.createdAt} <= ${options.dateRange.end}`
      );
    }
    if (options.tags && options.tags.length > 0) {
      filters.push(sql`${agentMemories.tags} && ${JSON.stringify(options.tags)}`);
    }

    // Build query with all filters
    const query = pgDb
      .select()
      .from(agentMemories)
      .where(and(...filters))
      .orderBy(desc(agentMemories.importanceScore), desc(agentMemories.createdAt))
      .limit(options.limit || 50)
      .offset(options.offset || 0);

    // Get total count
    const countResult = await pgDb
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(agentMemories)
      .where(and(...filters.filter(f => f !== undefined)));

    const memories = await query;
    return {
      memories: memories.map((m: unknown) => this.mapDbMemoryToMemoryEntry(m as any)),
      total: countResult[0]?.count || 0
    };
  }

  /**
   * Vector similarity search
   */
  async vectorSearch(
    organizationId: string,
    query: string,
    options: {
      limit?: number;
      threshold?: number;
      type?: string;
    } = {}
  ): Promise<MemoryEntry[]> {
    const queryEmbedding = await vectorEmbeddingService.generateEmbedding(query);
    
    let baseQuery: any = pgDb
      .select()
      .from(agentMemories)
      .where(and(
        eq(agentMemories.organizationId, organizationId),
        sql`${agentMemories.embedding} IS NOT NULL`
      ));

    if (options.type) {
      baseQuery = baseQuery.where(eq(agentMemories.memoryType, options.type as any));
    }

    const results = await baseQuery
      .orderBy(asc(sql`${agentMemories.embedding} <=> ${queryEmbedding}`))  
      .limit(options.limit || 10);

    return results.map((row: any) => this.mapDbMemoryToMemoryEntry(row));
  }

  /**
   * Create memory summary
   */
  async createSummary(
    organizationId: string,
    agentId?: string,
    options: {
      type?: 'daily' | 'weekly' | 'monthly' | 'topic';
      dateRange?: { start: Date; end: Date };
      maxMemories?: number;
    } = {}
  ): Promise<SummaryJob> {
    const jobId = crypto.randomUUID();
    
    const job: SummaryJob = {
      id: jobId,
      agentId: agentId || 'system',
      organizationId,
      type: options.type || 'daily',
      status: 'pending',
      memoriesProcessed: 0,
      summaryGenerated: '',
    };

    // Store job in database
    await pgDb.insert(memorySummarizationJobs).values({
      id: job.id,
      organizationId: job.organizationId,
      agentId: job.agentId,
      jobType: 'summarize',
      status: job.status,
      inputData: options,
      resultData: {},
      attempts: 0,
      maxAttempts: 3,
    });

    // Process asynchronously
    this.processSummaryJob(jobId);

    return job;
  }

  /**
   * Process summary job
   */
  private async processSummaryJob(jobId: string): Promise<void> {
    try {
      // Update job status to running
      await pgDb
        .update(memorySummarizationJobs)
        .set({ status: 'running', startedAt: new Date() })
        .where(eq(memorySummarizationJobs.id, jobId));

      const [job] = await pgDb
        .select()
        .from(memorySummarizationJobs)
        .where(eq(memorySummarizationJobs.id, jobId));

      if (!job) return;

      // Get memories to summarize
      const memories = await this.getMemoriesForSummary(job);
      
      // Generate summary using OpenAI
      const summary = await this.generateSummary(memories, job.jobType as any);
      
      // Update job with results
      await pgDb
        .update(memorySummarizationJobs)
        .set({
          status: 'completed',
          completedAt: new Date(),
          resultData: { summary, memoriesProcessed: memories.length },
          attempts: sql`${memorySummarizationJobs.attempts} + 1`,
        })
        .where(eq(memorySummarizationJobs.id, jobId));

    } catch (error) {
      logger.error('[ConsolidatedMemoryService] Summary job failed', error as Error);
      
      await pgDb
        .update(memorySummarizationJobs)
        .set({
          status: 'failed',
          completedAt: new Date(),
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          attempts: sql`${memorySummarizationJobs.attempts} + 1`,
        })
        .where(eq(memorySummarizationJobs.id, jobId));
    }
  }

  /**
   * Generate summary using OpenAI
   */
  private async generateSummary(memories: MemoryEntry[], type: string): Promise<string> {
    const memoriesText = memories
      .map(m => `[${m.type}] ${m.content}`)
      .join('\n');

    const prompt = `Summarize the following memories in a ${type} summary:\n\n${memoriesText}\n\nSummary:`;

    if (!this.openai) {
      logger.warn('[ConsolidatedMemoryService] AI summary disabled - no OpenAI API key available');
      return `AI summary disabled: ${memories.length} memories processed`;
    }

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that summarizes memory entries.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content?.trim() || '';
  }

  /**
   * Get memories for summary
   */
  private async getMemoriesForSummary(job: any): Promise<MemoryEntry[]> {
    const dateRange = job.inputData?.dateRange || {
      start: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
      end: new Date(),
    };

    const memories = await pgDb
      .select()
      .from(agentMemories)
      .where(
        and(
          eq(agentMemories.organizationId, job.organizationId),
          job.agentId !== 'system' ? eq(agentMemories.agentId, job.agentId) : undefined,
          sql`${agentMemories.createdAt} >= ${dateRange.start}`,
          sql`${agentMemories.createdAt} <= ${dateRange.end}`
        )
      )
      .orderBy(desc(agentMemories.importanceScore))
      .limit(job.inputData?.maxMemories || 100);

    return memories.map((m: any) => this.mapDbMemoryToMemoryEntry(m));
  }

  /**
   * Record access pattern
   */
  private async recordAccessPattern(memoryId: string, organizationId: string, agentId?: string): Promise<void> {
    await pgDb.insert(memoryAccessPatterns).values({
      memoryId,
      organizationId,
      agentId: agentId || 'system',
      accessType: 'retrieve' as const,
      accessTime: new Date(),
    }).onConflictDoNothing();
  }

  /**
   * Start background jobs
   */
  private startBackgroundJobs(): void {
    // Summary job scheduler
    this.summaryJobInterval = setInterval(async () => {
      await this.scheduleSummaryJobs();
    }, this.config.summaryIntervalHours * 60 * 60 * 1000);

    // Pruning job scheduler  
    this.pruningJobInterval = setInterval(async () => {
      await this.schedulePruningJobs();
    }, this.config.pruningIntervalHours * 60 * 60 * 1000);
  }

  /**
   * Schedule summary jobs
   */
  private async scheduleSummaryJobs(): Promise<void> {
    // Schedule daily summaries for all agents
    const agents = await pgDb
      .select({ agentId: agentMemories.agentId, organizationId: agentMemories.organizationId })
      .from(agentMemories)
      .where(sql`${agentMemories.agentId} IS NOT NULL`)
      .groupBy(agentMemories.agentId, agentMemories.organizationId);

    for (const agent of agents) {
      if (agent.agentId) {
        await this.createSummary(agent.organizationId, agent.agentId, { type: 'daily' });
      }
    }
  }

  /**
   * Schedule pruning jobs
   */
  private async schedulePruningJobs(): Promise<void> {
    // Find old memories to prune
    const cutoffDate = new Date(Date.now() - this.config.maxAgeDays * 24 * 60 * 60 * 1000);
    
    const oldMemories = await pgDb
      .select({ agentId: agentMemories.agentId, organizationId: agentMemories.organizationId })
      .from(agentMemories)
      .where(
        and(
          lt(agentMemories.createdAt, cutoffDate),
          sql`cast(${agentMemories.importanceScore} as float) < ${this.config.minImportanceScore / 100}`
        )
      )
      .groupBy(agentMemories.agentId, agentMemories.organizationId);

    for (const agent of oldMemories) {
      if (agent.agentId) {
        await this.createPruningJob(agent.organizationId, agent.agentId);
      }
    }
  }

  /**
   * Create pruning job
   */
  private async createPruningJob(organizationId: string, agentId: string): Promise<void> {
    const jobId = crypto.randomUUID();
    
    await pgDb.insert(memoryArchivalJobs).values({
      agentId,
      organizationId,
      jobType: 'prune',
      criteria: {
        ageDays: this.config.maxAgeDays,
        minImportanceScore: this.config.minImportanceScore,
      },
      status: 'pending',
      affectedMemoryCount: 0,
      processedMemoryCount: 0,
    });

    this.processPruningJob(jobId);
  }

  /**
   * Process pruning job
   */
  private async processPruningJob(jobId: string): Promise<void> {
    try {
      await pgDb
        .update(memoryArchivalJobs)
        .set({ status: 'running', startedAt: new Date() })
        .where(eq(memoryArchivalJobs.id, jobId));

      const [job] = await pgDb
        .select()
        .from(memoryArchivalJobs)
        .where(eq(memoryArchivalJobs.id, jobId));

      if (!job) return;

      // Delete old memories
      const criteria = job.criteria as { ageDays?: number; minImportanceScore?: number } || {};
      const cutoffDate = new Date(Date.now() - (criteria.ageDays || 30) * 24 * 60 * 60 * 1000);
      
      const deletedCount = await pgDb
        .delete(agentMemories)
        .where(
          and(
            eq(agentMemories.organizationId, job.organizationId),
            eq(agentMemories.agentId, job.agentId),
            lt(agentMemories.createdAt, cutoffDate),
            sql`cast(${agentMemories.importanceScore} as float) < ${(criteria.minImportanceScore || 0) / 100}`
          )
        );

      await pgDb
        .update(memoryArchivalJobs)
        .set({
          status: 'completed',
          completedAt: new Date(),
          processedMemoryCount: deletedCount.length,
        })
        .where(eq(memoryArchivalJobs.id, jobId));

    } catch (error) {
      logger.error('[ConsolidatedMemoryService] Pruning job failed', error as Error);
      
      await pgDb
        .update(memoryArchivalJobs)
        .set({
          status: 'failed',
          completedAt: new Date(),
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        })
        .where(eq(memoryArchivalJobs.id, jobId));
    }
  }

  /**
   * Map database memory to MemoryEntry interface
   */
  private mapDbMemoryToMemoryEntry(dbMemory: any): MemoryEntry {
    return {
      id: dbMemory.id,
      organizationId: dbMemory.organizationId,
      userId: dbMemory.agentId || '', // Use agentId as userId since DB doesn't have userId
      agentId: dbMemory.agentId,
      sessionId: undefined,
      type: (dbMemory.memoryType || 'episodic') as any,
      contentType: dbMemory.contentType || 'text',
      content: dbMemory.content,
      importance: Math.round((Number(dbMemory.importanceScore) || 0) * 100), // Convert from 0-1 to 0-100
      priority: 'medium',
      accessLevel: 'private',
      isEncrypted: false,
      retentionDays: 365,
      tags: dbMemory.tags || [],
      metadata: dbMemory.metadata || {},
      childIds: [],
      parentId: undefined,
      accessCount: dbMemory.accessCount || 0,
      lastAccessed: dbMemory.lastAccessedAt || new Date(),
      createdAt: dbMemory.createdAt,
      updatedAt: dbMemory.updatedAt,
      version: 1,
    };
  }

   /**

  /**
   * Update a memory entry
   */
  async updateMemory(
    memoryId: string,
    organizationId: string,
    updates: Partial<MemoryEntry>
  ): Promise<MemoryEntry | null> {
    try {
      const updateData: any = { ...updates, updatedAt: new Date() };
      
      // Generate new embedding if content was updated
      if (updates.content && updates.contentType === 'text') {
        try {
          updateData.embedding = await vectorEmbeddingService.generateEmbedding(updates.content);
        } catch (error) {
          logger.warn('[ConsolidatedMemoryService] Failed to generate embedding for update:', { error: String(error) });
        }
      }

      const [memory] = await pgDb
        .update(agentMemories)
        .set(updateData)
        .where(
          and(
            eq(agentMemories.id, memoryId),
            eq(agentMemories.organizationId, organizationId)
          )
        )
        .returning();

      if (memory) {
        logger.info(`Updated memory ${memoryId}`);
      }

      return memory ? this.mapDbMemoryToMemoryEntry(memory) : null;
    } catch (error: unknown) {
      logger.error('[ConsolidatedMemoryService] Failed to update memory:', error as Error);
      throw new Error('Failed to update memory');
    }
  }

  /**
   * Get memory statistics
   */
  async getMemoryStats(organizationId: string): Promise<{
    totalMemories: number;
    memoriesByType: Record<string, number>;
    averageImportance: number;
    topTags: { tag: string; count: number }[];
  }> {
    try {
      // Get total memories
      const [totalResult] = await pgDb
        .select({ count: sql`count(*)`.mapWith(Number) })
        .from(agentMemories)
        .where(eq(agentMemories.organizationId, organizationId));

      // Get memories by type
      const typeResults = await pgDb
        .select({
          memoryType: agentMemories.memoryType,
          count: sql`count(*)`.mapWith(Number)
        })
        .from(agentMemories)
        .where(eq(agentMemories.organizationId, organizationId))
        .groupBy(agentMemories.memoryType);

      // Get average importance
      const [avgResult] = await pgDb
        .select({ avg: sql`avg(cast(importance_score as float))`.mapWith(Number) })
        .from(agentMemories)
        .where(eq(agentMemories.organizationId, organizationId));

      // Get top tags
      const tagResults = await pgDb
        .select({ tags: agentMemories.tags })
        .from(agentMemories)
        .where(eq(agentMemories.organizationId, organizationId));

      const tagCounts: Record<string, number> = {};
      tagResults.forEach((result: any) => {
        if (result.tags && Array.isArray(result.tags)) {
          result.tags.forEach((tag: any) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });

      const topTags = Object.entries(tagCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([tag, count]) => ({ tag, count }));

      const memoriesByType = typeResults.reduce((acc: any, result: any) => {
        const typeKey = result.memoryType || 'unknown';
        acc[typeKey] = result.count;
        return acc;
      }, {} as Record<string, number>);

      return {
        totalMemories: totalResult?.count || 0,
        memoriesByType,
        averageImportance: (avgResult?.avg || 0) * 100, // Convert back to 0-100 scale
        topTags,
      };
    } catch (error: unknown) {
      logger.error('[ConsolidatedMemoryService] Failed to get memory stats:', error as Error);
      throw new Error('Failed to get memory stats');
    }
  }

  /**
   * Create memory association
   */
  async createMemoryAssociation(
    sourceMemoryId: string,
    targetMemoryId: string,
    type: string,
    strength: number
  ): Promise<any> {
    try {
      await pgDb.insert(memoryAssociations).values({
        id: crypto.randomUUID(),
        sourceMemoryId,
        targetMemoryId,
        associationType: type as any,
        strength: strength.toFixed(2),
        metadata: {},
      });

      logger.info(`Created memory association between ${sourceMemoryId} and ${targetMemoryId}`);
      return { sourceMemoryId, targetMemoryId, type, strength };
    } catch (error: unknown) {
      logger.error('[ConsolidatedMemoryService] Failed to create memory association:', error as Error);
      throw new Error('Failed to create memory association');
    }
  }

  /**
   * Get related memories
   */
  async getRelatedMemories(memoryId: string, organizationId: string): Promise<MemoryEntry[]> {
    try {
      const associations = await pgDb
        .select()
        .from(memoryAssociations)
        .where(
          or(
            eq(memoryAssociations.sourceMemoryId, memoryId),
            eq(memoryAssociations.targetMemoryId, memoryId)
          )
        );

      const relatedMemoryIds = associations.map((assoc: any) =>
        assoc.sourceMemoryId === memoryId ? assoc.targetMemoryId : assoc.sourceMemoryId
      );

      if (relatedMemoryIds.length === 0) {
        return [];
      }

      const relatedMemories = await pgDb
        .select()
        .from(agentMemories)
        .where(
          and(
            eq(agentMemories.organizationId, organizationId),
            inArray(agentMemories.id, relatedMemoryIds)
          )
        );

      return relatedMemories.map((m: any) => this.mapDbMemoryToMemoryEntry(m));
    } catch (error: unknown) {
      logger.error('[ConsolidatedMemoryService] Failed to get related memories:', error as Error);
      throw new Error('Failed to get related memories');
    }
  }

  /**
   * Archive memories based on criteria
   */
  async archiveMemories(criteria: {
    organizationId: string;
    agentId?: string;
    type?: string;
    ageDays?: number;
    minImportanceScore?: number;
  }): Promise<number> {
    try {
      const filters: any[] = [eq(agentMemories.organizationId, criteria.organizationId)];

      if (criteria.agentId) {
        filters.push(eq(agentMemories.agentId, criteria.agentId));
      }

      if (criteria.type) {
        filters.push(eq(agentMemories.memoryType, criteria.type as any));
      }

      if (criteria.minImportanceScore) {
        filters.push(sql`cast(${agentMemories.importanceScore} as float) < ${criteria.minImportanceScore / 100}`);
      }

      if (criteria.ageDays) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - criteria.ageDays);
        filters.push(lt(agentMemories.createdAt, cutoffDate));
      }

      const memoriesToArchive = await pgDb
        .select()
        .from(agentMemories)
        .where(and(...filters));

      if (memoriesToArchive.length === 0) {
        return 0;
      }

      // Mark memories as archived
      const memoryIds = memoriesToArchive.map((m: any) => m.id);
      await pgDb
        .update(agentMemories)
        .set({ 
          isArchived: true,
          updatedAt: new Date()
        })
        .where(inArray(agentMemories.id, memoryIds));

      logger.info(`Archived ${memoryIds.length} memories`);
      return memoriesToArchive.length;
    } catch (error: any) {
      logger.error('[ConsolidatedMemoryService] Failed to archive memories:', error as Error);
      throw new Error('Failed to archive memories');
    }
  }

  /**
   * Queue a summarization job
   */
  async queueSummarization(agentId: string, organizationId: string, type: string): Promise<SummaryJob> {
    try {
      const jobId = crypto.randomUUID();
      
      await pgDb.insert(memorySummarizationJobs).values({
        agentId,
        organizationId,
        jobType: 'summarize' as any,  // Map type parameter to jobType field
        status: 'pending',
      });

      logger.info(`Queued summarization job ${jobId}`);
      return {
        id: jobId,
        agentId,
        organizationId,
        type: type as any,
        status: 'pending',
        memoriesProcessed: 0,
        summaryGenerated: '',
      };
    } catch (error: unknown) {
      logger.error('[ConsolidatedMemoryService] Failed to queue summarization:', error as Error);
      throw new Error('Failed to queue summarization');
    }
  }

  /**
   * Process all pending summarization jobs
   */
  async processAllPendingJobs(organizationId?: string): Promise<void> {
    try {
      const whereFilters: any[] = [eq(memorySummarizationJobs.status, 'pending')];
      
      if (organizationId) {
        whereFilters.push(eq(memorySummarizationJobs.organizationId, organizationId));
      }

      const pendingJobs = await pgDb
        .select()
        .from(memorySummarizationJobs)
        .where(and(...whereFilters))
        .orderBy(desc(memorySummarizationJobs.createdAt));
      
      for (const job of pendingJobs) {
        try {
          await this.processSummaryJob(job.id);
        } catch (error) {
          logger.error(`[ConsolidatedMemoryService] Failed to process summarization job ${job.id}:`, error as Error);
        }
      }
    } catch (error: unknown) {
      logger.error('[ConsolidatedMemoryService] Failed to process pending jobs:', error as Error);
      throw new Error('Failed to process pending jobs');
    }
  }

  /**
   * Cleanup resources
   */
  async cleanup(): Promise<void> {
    if (this.summaryJobInterval) {
      clearInterval(this.summaryJobInterval);
    }
    if (this.pruningJobInterval) {
      clearInterval(this.pruningJobInterval);
    }
    this.activeJobs.clear();
    logger.info('Cleaned up resources');
  }

  /**
   * Destroy service and clear all intervals
   */
  destroy(): void {
    if (this.summaryJobInterval) {
      clearInterval(this.summaryJobInterval);
    }
    if (this.pruningJobInterval) {
      clearInterval(this.pruningJobInterval);
    }
    this.activeJobs.clear();
    logger.info('ConsolidatedMemoryService destroyed');
  }
}

export const consolidatedMemoryService = new ConsolidatedMemoryService();
export const agentMemoryService = consolidatedMemoryService; // Alias for backward compatibility
