import axios from 'axios';
import { db as pgDb } from '../db/connection';
import { sql } from 'drizzle-orm';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface EmbeddingConfig {
  model: string;
  dimension: number;
  batchSize: number;
  maxTokens: number;
}

export interface MemoryEmbedding {
  id: string;
  vector: number[];
  metadata?: Record<string, any>;
}

export interface EmbeddingResult {
  data: {
    embedding: number[];
    index: number;
    object: string;
  }[];
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

function asError(err: unknown): Error {
  return err instanceof Error ? err : new Error(typeof err === 'string' ? err : JSON.stringify(err));
}

export class VectorEmbeddingService {
  private openaiApiKey: string;
  private config: EmbeddingConfig;
  private cache: Map<string, number[]> = new Map();

  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY || '';
    if (!this.openaiApiKey && process.env.NODE_ENV === 'production') {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }
    if (!this.openaiApiKey) {
      logger.warn('OPENAI_API_KEY not set; vector embedding service will be disabled in development');
    }

    this.config = {
      model: 'text-embedding-ada-002',
      dimension: 1536,
      batchSize: 100,
      maxTokens: 8191,
    };
  }

  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.openaiApiKey) {
      logger.warn('Vector embedding service disabled - no OpenAI API key available');
      // Return a zero vector of the expected dimension
      return new Array(this.config.dimension).fill(0);
    }

    const cacheKey = this.generateCacheKey(text);
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.post<EmbeddingResult>(
        'https://api.openai.com/v1/embeddings',
        {
          model: this.config.model,
          input: text,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      const embedding = response.data.data[0]?.embedding;
      if (!embedding) {
        throw new Error('OpenAI embeddings response did not include an embedding');
      }
      
      // Cache the result
      this.cache.set(cacheKey, embedding);
      
      return embedding;
    } catch (error) {
      logger.error('[VectorEmbeddingService] Failed to generate embedding:', asError(error));
      throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
    const results: number[][] = [];
    const batches = this.createBatches(texts, this.config.batchSize);

    for (const batch of batches) {
      const batchResults = await this.processBatch(batch);
      results.push(...batchResults);
    }

    return results;
  }

  async generateMemoryEmbedding(
    content: string,
    metadata?: Record<string, any>
  ): Promise<MemoryEmbedding> {
    const vector = await this.generateEmbedding(content);
    
    return {
      id: this.generateEmbeddingId(),
      vector,
      metadata,
    };
  }

  async updateMemoryEmbedding(
    embeddingId: string,
    content: string,
    metadata?: Record<string, any>
  ): Promise<MemoryEmbedding> {
    const vector = await this.generateEmbedding(content);
    
    return {
      id: embeddingId,
      vector,
      metadata,
    };
  }

  calculateCosineSimilarity(vectorA: number[], vectorB: number[]): number {
    if (vectorA.length !== vectorB.length) {
      throw new Error('Vectors must have the same dimension');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vectorA.length; i++) {
      const a = vectorA[i]!;
      const b = vectorB[i]!;
      dotProduct += a * b;
      normA += a * a;
      normB += b * b;
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) {
      return 0;
    }

    return dotProduct / (normA * normB);
  }

  findMostSimilar(queryVector: number[], candidates: number[][], topK: number = 10): { index: number; similarity: number }[] {
    const similarities = candidates.map((candidate, index) => ({
      index,
      similarity: this.calculateCosineSimilarity(queryVector, candidate),
    }));

    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);
  }

  async embedTextWithChunking(
    text: string,
    maxChunkSize: number = 1000,
    overlap: number = 100
  ): Promise<{ chunk: string; embedding: number[]; startIndex: number }[]> {
    const chunks = this.createTextChunks(text, maxChunkSize, overlap);
    const embeddings = await this.generateBatchEmbeddings(chunks.map(c => c.text));

    return chunks.map((chunk, index) => {
      const embedding = embeddings[index];
      if (!embedding) {
        throw new Error(`Missing embedding for chunk index ${index}`);
      }
      return {
        chunk: chunk.text,
        embedding,
        startIndex: chunk.startIndex,
      };
    });
  }

  private async processBatch(texts: string[]): Promise<number[][]> {
    try {
      const response = await axios.post<EmbeddingResult>(
        'https://api.openai.com/v1/embeddings',
        {
          model: this.config.model,
          input: texts,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 60000,
        }
      );

      return response.data.data.map(item => item.embedding);
    } catch (error) {
      logger.error('[VectorEmbeddingService] Failed to process batch:', asError(error));
      
      // Fallback to individual requests
      const results: number[][] = [];
      for (const text of texts) {
        try {
          const embedding = await this.generateEmbedding(text);
          results.push(embedding);
        } catch (individualError) {
          logger.error('[VectorEmbeddingService] Failed to generate embedding for individual text:', asError(individualError));
          throw individualError;
        }
      }
      return results;
    }
  }

  private createBatches<T>(array: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < array.length; i += batchSize) {
      batches.push(array.slice(i, i + batchSize));
    }
    return batches;
  }

  private createTextChunks(text: string, maxChunkSize: number, overlap: number): { text: string; startIndex: number }[] {
    const chunks: { text: string; startIndex: number }[] = [];
    let startIndex = 0;

    while (startIndex < text.length) {
      const endIndex = Math.min(startIndex + maxChunkSize, text.length);
      let chunk = text.substring(startIndex, endIndex);

      // Try to break at word boundaries
      if (endIndex < text.length) {
        const lastSpaceIndex = chunk.lastIndexOf(' ');
        if (lastSpaceIndex > maxChunkSize * 0.8) {
          chunk = chunk.substring(0, lastSpaceIndex);
        }
      }

      chunks.push({ text: chunk.trim(), startIndex });
      startIndex += chunk.length - overlap;
    }

    return chunks;
  }

  private generateCacheKey(text: string): string {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(text).digest('hex');
  }

  private generateEmbeddingId(): string {
    const crypto = require('crypto');
    return `embedding_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
  }

  // Vector database operations
  async storeEmbedding(
    table: string,
    id: string,
    embedding: number[],
    metadata?: Record<string, any>
  ): Promise<void> {
    const vectorString = `[${embedding.join(',')}]`;
    
    try {
      await pgDb.execute(sql`
        INSERT INTO ${table} (id, embedding, metadata)
        VALUES (${id}, ${vectorString}::vector, ${JSON.stringify(metadata || {})})
        ON CONFLICT (id) DO UPDATE SET
          embedding = ${vectorString}::vector,
          metadata = ${JSON.stringify(metadata || {})},
          updated_at = NOW()
      `);
    } catch (error) {
      logger.error(`Failed to store embedding in ${table}:`, asError(error));
      throw error;
    }
  }

  async retrieveEmbedding(table: string, id: string): Promise<number[] | null> {
    try {
      const result = await pgDb.execute(sql`
        SELECT embedding FROM ${table} WHERE id = ${id}
      `);

      if (result.length === 0) return null;

      const firstRow = result[0] as Record<string, unknown> | undefined;
      const embeddingString = firstRow?.embedding;
      if (typeof embeddingString !== 'string') {
        return null;
      }
      return this.parseVectorString(embeddingString);
    } catch (error) {
      logger.error(`Failed to retrieve embedding from ${table}:`, asError(error));
      throw error;
    }
  }

  async searchSimilarEmbeddings(
    table: string,
    queryVector: number[],
    limit: number = 10,
    threshold: number = 0.7,
    whereClause?: string
  ): Promise<{ id: string; similarity: number; metadata?: any }[]> {
    const vectorString = `[${queryVector.join(',')}]`;

    // Validate table name to prevent SQL injection
    const allowedTables = ['memory_embeddings', 'document_embeddings', 'knowledge_embeddings'];
    if (!allowedTables.includes(table)) {
      throw new Error(`Invalid table name: ${table}`);
    }

    // Validate and sanitize whereClause to prevent SQL injection
    let whereSql = '';
    if (whereClause) {
      // Only allow specific safe patterns
      const allowedPatterns = /^(\w+\s*=\s*\$\d+\s*(AND|OR\s*\w+\s*=\s*\$\d+)*)?$/;
      if (!allowedPatterns.test(whereClause)) {
        throw new Error(`Invalid whereClause: ${whereClause}`);
      }
      whereSql = `AND ${whereClause}`;
    }

    try {
      const result = await pgDb.execute(sql`
        SELECT 
          id,
          metadata,
          1 - (embedding <=> ${vectorString}::vector) as similarity
        FROM ${table}
        WHERE 1 - (embedding <=> ${vectorString}::vector) > ${threshold} ${whereSql}
        ORDER BY similarity DESC
        LIMIT ${limit}
      `);

      return result.map((row: any) => ({
        id: row.id,
        similarity: parseFloat(row.similarity),
        metadata: row.metadata ? JSON.parse(row.metadata) : undefined,
      }));
    } catch (error) {
      logger.error(`Failed to search similar embeddings in ${table}:`, asError(error));
      throw error;
    }
  }

  async deleteEmbedding(table: string, id: string): Promise<void> {
    try {
      await pgDb.execute(sql`DELETE FROM ${table} WHERE id = ${id}`);
    } catch (error) {
      logger.error(`Failed to delete embedding from ${table}:`, asError(error));
      throw error;
    }
  }

  private parseVectorString(vectorString: string): number[] {
    // Remove brackets and split by comma
    const cleaned = vectorString.replace(/[\[\]]/g, '');
    return cleaned.split(',').map(num => parseFloat(num.trim()));
  }

  // Cache management
  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }

  // Utility methods
  validateEmbedding(embedding: number[]): boolean {
    return Array.isArray(embedding) && 
           embedding.length === this.config.dimension &&
           embedding.every(num => typeof num === 'number' && !isNaN(num));
  }

  normalizeVector(vector: number[]): number[] {
    const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    if (norm === 0) return vector;
    return vector.map(val => val / norm);
  }

  getConfig(): EmbeddingConfig {
    return { ...this.config };
  }

  updateConfig(newConfig: Partial<EmbeddingConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

export const vectorEmbeddingService = new VectorEmbeddingService();
