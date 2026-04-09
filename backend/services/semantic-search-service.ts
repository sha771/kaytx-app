import { db as pgDb } from '../db/connection';
import { vectorEmbeddingService } from './vector-embedding-service';
import { createLogger } from '../lib/production-logger';
import postgres from 'postgres';

const logger = createLogger('SemanticSearchService');

// Get raw SQL client for complex queries
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/enterprise_db';
const sqlClient = postgres(connectionString, { max: 10 });

export interface SearchQuery {
  text: string;
  filters?: {
    memoryType?: string[];
    dateRange?: { start: Date; end: Date };
    importanceScore?: { min: number; max: number };
    sessionId?: string;
  };
  options?: {
    limit?: number;
    threshold?: number;
    includeMetadata?: boolean;
    boostRecent?: boolean;
    boostImportant?: boolean;
  };
}

export interface SearchResult {
  id: string;
  content: string;
  type: string;
  similarity: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  importanceScore?: number;
  sessionId?: string;
}

export interface ContextRetrievalOptions {
  maxContextItems?: number;
  contextTypes?: string[];
  timeWeight?: number;
  importanceWeight?: number;
  relevanceWeight?: number;
}

export interface ContextItem {
  id: string;
  content: string;
  type: 'memory' | 'context' | 'summary';
  relevanceScore: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface MemoryContext {
  query: string;
  contextItems: ContextItem[];
  summary?: string;
  totalItems: number;
  retrievalTime: Date;
}

export class SemanticSearchService {
  private embeddingService = vectorEmbeddingService;

  async searchMemories(
    agentId: string,
    organizationId: string,
    query: SearchQuery
  ): Promise<SearchResult[]> {
    const startTime = Date.now();
    
    try {
      // Generate embedding for the query
      const queryEmbedding = await this.embeddingService.generateEmbedding(query.text);
      
      const sqlQuery = this.buildSearchQuery(query.filters, query.options);
      const params = this.buildSearchParams(agentId, organizationId, queryEmbedding, query);
      
      const results = await sqlClient.unsafe(sqlQuery, params);
      
      // Process and rank results
      const processedResults = await this.processSearchResults(results as unknown as Record<string, unknown>[], query);
      
      // Log search for analytics
      await this.logSearch(agentId, organizationId, query, processedResults.length, Date.now() - startTime);
      
      return processedResults;
    } catch (error: any) {
      logger.error('[SemanticSearchService] Search failed:', error);
      throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async retrieveContext(
    agentId: string,
    organizationId: string,
    query: string,
    options?: ContextRetrievalOptions
  ): Promise<MemoryContext> {
    const opts = {
      maxContextItems: 10,
      contextTypes: ['memory', 'context', 'summary'],
      timeWeight: 0.2,
      importanceWeight: 0.3,
      relevanceWeight: 0.5,
      ...options,
    };

    try {
      // Generate query embedding
      const queryEmbedding = await this.embeddingService.generateEmbedding(query);
      
      // Search across different memory types
      const contextPromises = opts.contextTypes.map(type => 
        this.searchContextType(agentId, organizationId, type, queryEmbedding, opts)
      );
      
      const contextResults = await Promise.all(contextPromises);
      const allContextItems = contextResults.flat();
      
      // Score and rank context items
      const scoredItems = this.scoreContextItems(allContextItems, queryEmbedding, opts);
      
      // Select top items
      const topItems = scoredItems
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, opts.maxContextItems);
      
      // Generate context summary if needed
      const summary = topItems.length > 5 ? await this.generateContextSummary(query, topItems) : undefined;
      
      return {
        query,
        contextItems: topItems,
        summary,
        totalItems: allContextItems.length,
        retrievalTime: new Date(),
      };
    } catch (error: any) {
      logger.error('[SemanticSearchService] Context retrieval failed:', error);
      throw new Error(`Context retrieval failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async findSimilarMemories(
    agentId: string,
    organizationId: string,
    memoryId: string,
    limit: number = 10
  ): Promise<SearchResult[]> {
    try {
      // Get the source memory embedding
      const sourceMemory = await this.getMemoryEmbedding(agentId, memoryId);
      if (!sourceMemory) {
        throw new Error('Source memory not found');
      }

      // Search for similar memories
      const results = await this.embeddingService.searchSimilarEmbeddings(
        'agent_memories',
        sourceMemory.embedding,
        limit,
        0.6,
        `agent_id = '${agentId}' AND id != '${memoryId}'`
      );

      return results.map(result => ({
        id: result.id,
        content: '', // Would need to fetch full content
        type: 'memory',
        similarity: result.similarity,
        metadata: result.metadata,
        createdAt: new Date(), // Would need to fetch from database
      }));
    } catch (error: any) {
      logger.error('[SemanticSearchService] Similar memories search failed:', error);
      throw new Error(`Similar memories search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async searchByTopic(
    agentId: string,
    organizationId: string,
    topic: string,
    limit: number = 20
  ): Promise<SearchResult[]> {
    try {
      // Generate topic embedding
      const topicEmbedding = await this.embeddingService.generateEmbedding(topic);
      
      // Search with topic-specific filters
      const query: SearchQuery = {
        text: topic,
        options: { limit, threshold: 0.5 },
        filters: { memoryType: ['conversation', 'context'] },
      };

      return this.searchMemories(agentId, organizationId, query);
    } catch (error: any) {
      logger.error('[SemanticSearchService] Topic search failed:', error);
      throw new Error(`Topic search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async searchWithTimeDecay(
    agentId: string,
    organizationId: string,
    query: string,
    timeDecayHours: number = 24
  ): Promise<SearchResult[]> {
    try {
      const queryEmbedding = await this.embeddingService.generateEmbedding(query);
      const cutoffTime = new Date(Date.now() - timeDecayHours * 60 * 60 * 1000);
      
      const decayQuery = `
        SELECT 
          id,
          content,
          memory_type,
          metadata,
          created_at,
          importance_score,
          session_id,
          1 - (embedding <=> $1::vector) as semantic_similarity,
          CASE 
            WHEN created_at > $3 THEN 1.0
            ELSE 0.5 * (1 - (EXTRACT(EPOCH FROM (NOW() - created_at)) / ($2 * 3600)))
          END as time_score
        FROM agent_memories
        WHERE agent_id = $4 
          AND organization_id = $5
          AND created_at > $3
        ORDER BY (semantic_similarity * 0.7 + time_score * 0.3) DESC
        LIMIT 20
      `;
      
      const results = await sqlClient.unsafe(decayQuery, [
        `[${queryEmbedding.join(',')}]`,
        timeDecayHours,
        cutoffTime,
        agentId,
        organizationId,
      ]);

      return (results as any[]).map(row => ({
        id: row.id,
        content: row.content,
        type: row.memory_type,
        similarity: parseFloat(row.semantic_similarity),
        metadata: row.metadata ? JSON.parse(row.metadata) : undefined,
        createdAt: row.created_at,
        importanceScore: row.importance_score,
        sessionId: row.session_id,
      }));
    } catch (error: any) {
      logger.error('[SemanticSearchService] Time decay search failed:', error);
      throw new Error(`Time decay search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private buildSearchQuery(filters?: SearchQuery['filters'], options?: SearchQuery['options']): string {
    let query = `
      SELECT 
        id,
        content,
        memory_type,
        metadata,
        created_at,
        importance_score,
        session_id,
        1 - (embedding <=> $1::vector) as similarity
      FROM agent_memories
      WHERE agent_id = $2 
        AND organization_id = $3
    `;

    const conditions: string[] = [];
    
    if (filters?.memoryType && filters.memoryType.length > 0) {
      conditions.push(`memory_type = ANY($${conditions.length + 4})`);
    }
    
    if (filters?.dateRange) {
      conditions.push(`created_at BETWEEN $${conditions.length + 4} AND $${conditions.length + 5}`);
    }
    
    if (filters?.importanceScore) {
      conditions.push(`importance_score BETWEEN $${conditions.length + 4} AND $${conditions.length + 5}`);
    }
    
    if (filters?.sessionId) {
      conditions.push(`session_id = $${conditions.length + 4}`);
    }

    if (conditions.length > 0) {
      query += ' AND ' + conditions.join(' AND ');
    }

    // Add similarity threshold if specified
    if (options?.threshold) {
      query += ` HAVING 1 - (embedding <=> $1::vector) > $${conditions.length + 4}`;
    }

    // Add ordering and limit
    query += ' ORDER BY similarity DESC';
    
    if (options?.limit) {
      query += ` LIMIT $${conditions.length + (options.threshold ? 5 : 4)}`;
    }

    return query;
  }

  private buildSearchParams(
    agentId: string,
    organizationId: string,
    queryEmbedding: number[],
    query: SearchQuery
  ): any[] {
    const params: any[] = [
      `[${queryEmbedding.join(',')}]`,
      agentId,
      organizationId,
    ];

    if (query.filters?.memoryType) {
      params.push(query.filters.memoryType);
    }
    
    if (query.filters?.dateRange) {
      params.push(query.filters.dateRange.start, query.filters.dateRange.end);
    }
    
    if (query.filters?.importanceScore) {
      params.push(query.filters.importanceScore.min, query.filters.importanceScore.max);
    }
    
    if (query.filters?.sessionId) {
      params.push(query.filters.sessionId);
    }

    if (query.options?.threshold) {
      params.push(query.options.threshold);
    }

    if (query.options?.limit) {
      params.push(query.options.limit);
    }

    return params;
  }

  private async processSearchResults(rows: any[], query: SearchQuery): Promise<SearchResult[]> {
    const results: SearchResult[] = rows.map(row => ({
      id: row.id,
      content: row.content,
      type: row.memory_type,
      similarity: parseFloat(row.similarity),
      metadata: row.metadata ? JSON.parse(row.metadata) : undefined,
      createdAt: row.created_at,
      importanceScore: row.importance_score,
      sessionId: row.session_id,
    }));

    // Apply additional scoring if requested
    if (query.options?.boostRecent || query.options?.boostImportant) {
      return this.applyBoostScoring(results, query.options);
    }

    return results;
  }

  private applyBoostScoring(results: SearchResult[], options: NonNullable<SearchQuery['options']>): SearchResult[] {
    return results.map(result => {
      let boostedSimilarity = result.similarity;
      
      // Boost recent memories
      if (options.boostRecent) {
        const hoursSinceCreation = (Date.now() - result.createdAt.getTime()) / (1000 * 60 * 60);
        const recentBoost = Math.max(0, 1 - hoursSinceCreation / 168); // Decay over 1 week
        boostedSimilarity += recentBoost * 0.1;
      }
      
      // Boost important memories
      if (options.boostImportant && result.importanceScore) {
        const importanceBoost = result.importanceScore / 5.0; // Normalize to 0-1
        boostedSimilarity += importanceBoost * 0.15;
      }
      
      return { ...result, similarity: Math.min(1.0, boostedSimilarity) };
    });
  }

  private async searchContextType(
    agentId: string,
    organizationId: string,
    contextType: string,
    queryEmbedding: number[],
    options: ContextRetrievalOptions
  ): Promise<ContextItem[]> {
    const tableName = contextType === 'memory' ? 'agent_memories' : 
                     contextType === 'context' ? 'agent_memory_contexts' : 
                     'agent_memory_summaries';

    const results = await this.embeddingService.searchSimilarEmbeddings(
      tableName,
      queryEmbedding,
      options.maxContextItems,
      0.5,
      `agent_id = '${agentId}' AND organization_id = '${organizationId}'`
    );

    return results.map(result => ({
      id: result.id,
      content: '', // Would need to fetch full content
      type: contextType as 'memory' | 'context' | 'summary',
      relevanceScore: result.similarity,
      metadata: result.metadata,
      createdAt: new Date(), // Would need to fetch from database
    }));
  }

  private scoreContextItems(
    items: ContextItem[],
    queryEmbedding: number[],
    options: Required<ContextRetrievalOptions>
  ): ContextItem[] {
    return items.map(item => {
      let score = item.relevanceScore * (options.relevanceWeight || 0.5);
      
      // Add time-based scoring
      const hoursSinceCreation = (Date.now() - item.createdAt.getTime()) / (1000 * 60 * 60);
      const timeScore = Math.max(0, 1 - hoursSinceCreation / 168); // Decay over 1 week
      score += timeScore * (options.timeWeight || 0.2);
      
      // Add importance-based scoring if available
      if (item.metadata?.importance_score) {
        const importanceScore = Math.min(1.0, (Number(item.metadata.importance_score) || 0) / 5.0);
        score += importanceScore * (options.importanceWeight || 0.3);
      }
      
      return { ...item, relevanceScore: score };
    });
  }

  private async generateContextSummary(query: string, contextItems: ContextItem[]): Promise<string> {
    // In a real implementation, this would use an LLM to generate a summary
    // For now, return a simple summary
    return `Context summary for "${query}" based on ${contextItems.length} relevant items.`;
  }

  private async getMemoryEmbedding(agentId: string, memoryId: string): Promise<{ embedding: number[] } | null> {
    try {
      const result = await sqlClient.unsafe(`
        SELECT embedding FROM agent_memories 
        WHERE agent_id = $1 AND id = $2
      `, [agentId, memoryId]);

      if ((result as any[]).length === 0) return null;

      const embeddingString = (result as any[])[0].embedding;
      const embedding = this.parseVectorString(embeddingString);
      
      return { embedding };
    } catch (error: any) {
      logger.error('[SemanticSearchService] Failed to get memory embedding:', error);
      return null;
    }
  }

  private parseVectorString(vectorString: string): number[] {
    const cleaned = vectorString.replace(/[\[\]]/g, '');
    return cleaned.split(',').map(num => parseFloat(num.trim()));
  }

  private async logSearch(
    agentId: string,
    organizationId: string,
    query: SearchQuery,
    resultCount: number,
    durationMs: number
  ): Promise<void> {
    try {
      await sqlClient.unsafe(`
        INSERT INTO agent_memory_access_patterns 
        (agent_id, organization_id, access_type, query_embedding, access_timestamp, metadata)
        VALUES ($1, $2, 'search', $3::vector, NOW(), $4)
      `, [
        agentId,
        organizationId,
        `[${(await this.embeddingService.generateEmbedding(query.text)).join(',')}]`,
        JSON.stringify({
          query: query.text,
          resultCount,
          durationMs,
          filters: query.filters,
          options: query.options,
        }),
      ]);
    } catch (error: any) {
      // Log errors but don't throw to avoid interrupting search
      logger.error('[SemanticSearchService] Failed to log search:', error);
    }
  }
}

export const semanticSearchService = new SemanticSearchService();
