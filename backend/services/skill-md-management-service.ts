import { EventEmitter } from 'events';
import crypto from 'crypto';
import { db as pgDb } from '../db/connection';
import { agentSkillFiles, agentSkillFileChunks, agentSkillKnowledgeGraph, aiAgents } from '../db/drizzle-schema';
import { eq, and, desc, asc, or, ilike, inArray, sql } from 'drizzle-orm';
import { skillMDProcessorService, ProcessedDocument, DocumentProcessingOptions } from './skill-md-processor-service';
import { vectorEmbeddingService } from './vector-embedding-service';
import { fileManagementService } from './file-management-service';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('SkillMDManagementService');

export interface SkillFile {
  id: string;
  organizationId: string;
  agentId?: string;
  userId?: string;
  originalFileName: string;
  originalFilePath?: string;
  originalMimeType: string;
  originalFileSize: number;
  originalFileHash?: string;
  markdownContent: string;
  markdownFilePath?: string;
  extractedTopics: string[];
  extractedEntities: Array<{ text: string; type: string; confidence: number }>;
  extractedKeywords: string[];
  summary?: string;
  embeddingVector?: number[];
  category?: string;
  tags: string[];
  language: string;
  difficulty?: string;
  processingStatus: string;
  processingError?: string;
  processingStartedAt?: Date;
  processingCompletedAt?: Date;
  accessCount: number;
  lastAccessedAt?: Date;
  relevanceScore: string;
  relatedFileIds: string[];
  parentFileId?: string;
  knowledgeGraph: Record<string, any>;
  triples: Array<{ subject: string; predicate: string; object: string; confidence: number }>;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillFileChunk {
  id: string;
  skillFileId: string;
  organizationId: string;
  agentId?: string;
  chunkIndex: number;
  chunkContent: string;
  chunkSummary?: string;
  embeddingVector?: number[];
  startPosition?: number;
  endPosition?: number;
  tokenCount?: number;
  chunkType?: string;
  importanceScore: string;
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface KnowledgeGraphNode {
  id: string;
  organizationId: string;
  agentId?: string;
  nodeId: string;
  nodeType: string;
  nodeLabel: string;
  nodeProperties: Record<string, any>;
  embeddingVector?: number[];
  connections: string[];
  connectionTypes: Record<string, string>;
  sourceFileIds: string[];
  confidence: string;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface UploadSkillFileOptions {
  organizationId: string;
  agentId?: string;
  userId?: string;
  fileBuffer: Buffer;
  fileName: string;
  mimeType: string;
  category?: string;
  tags?: string[];
  language?: string;
  difficulty?: string;
  processingOptions?: DocumentProcessingOptions;
}

export interface SearchSkillFilesOptions {
  organizationId: string;
  agentId?: string;
  query?: string;
  category?: string;
  tags?: string[];
  language?: string;
  difficulty?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'relevance' | 'created' | 'accessed' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export class SkillMDManagementService extends EventEmitter {
  async uploadSkillFile(options: UploadSkillFileOptions): Promise<SkillFile> {
    try {
      // Generate file hash
      const fileHash = crypto.createHash('sha256').update(options.fileBuffer).digest('hex');

      // Check for duplicate files
      const existingFile = await this.getFileByHash(options.organizationId, fileHash);
      if (existingFile) {
        logger.info(`Duplicate file detected: ${options.fileName}, returning existing file`);
        return existingFile;
      }

      // Store original file
      const fileMetadata = await fileManagementService.uploadFile(options.fileBuffer, {
        organizationId: options.organizationId,
        userId: options.userId,
        filename: options.fileName,
        mimeType: options.mimeType,
        isPublic: false,
        tags: options.tags,
        metadata: {
          category: options.category,
          language: options.language,
          difficulty: options.difficulty,
        },
      });

      // Create skill file record
      const skillFileId = crypto.randomUUID();
      const now = new Date();

      await pgDb.insert(agentSkillFiles).values({
        id: skillFileId,
        organizationId: options.organizationId,
        agentId: options.agentId,
        userId: options.userId,
        originalFileName: options.fileName,
        originalFilePath: fileMetadata.path,
        originalMimeType: options.mimeType,
        originalFileSize: options.fileBuffer.length,
        originalFileHash: fileHash,
        markdownContent: '', // Will be populated after processing
        markdownFilePath: null,
        extractedTopics: [],
        extractedEntities: [],
        extractedKeywords: [],
        summary: null,
        embeddingVector: null,
        category: options.category,
        tags: options.tags || [],
        language: options.language || 'en',
        difficulty: options.difficulty,
        processingStatus: 'pending',
        processingError: null,
        processingStartedAt: now,
        processingCompletedAt: null,
        accessCount: 0,
        lastAccessedAt: null,
        relevanceScore: '0.50',
        relatedFileIds: [],
        parentFileId: null,
        knowledgeGraph: {},
        triples: [],
        metadata: {
          originalFileId: fileMetadata.id,
          uploadedAt: now.toISOString(),
        },
        createdAt: now,
        updatedAt: now,
      });

      // Process document asynchronously
      this.processDocumentAsync(skillFileId, options.fileBuffer, options.fileName, options.mimeType, options.processingOptions);

      // Return the skill file (will be updated after processing)
      const skillFile = await this.getSkillFileById(skillFileId, options.organizationId);
      if (!skillFile) {
        throw new Error('Failed to create skill file');
      }

      this.emit('skillFile:uploaded', { skillFileId, fileName: options.fileName });
      return skillFile;
    } catch (error) {
      logger.error('[SkillMDManagementService] Failed to upload skill file:', error);
      throw new Error(`Failed to upload skill file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async processDocumentAsync(
    skillFileId: string,
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
    processingOptions?: DocumentProcessingOptions
  ): Promise<void> {
    try {
      // Update status to processing
      await pgDb.update(agentSkillFiles)
        .set({
          processingStatus: 'processing',
          processingStartedAt: new Date(),
        })
        .where(eq(agentSkillFiles.id, skillFileId));

      // Process document
      const processed = await skillMDProcessorService.processDocument(
        fileBuffer,
        fileName,
        mimeType,
        processingOptions
      );

      // Generate embedding for full document
      const embedding = await vectorEmbeddingService.generateEmbedding(processed.markdownContent);

      // Update skill file with processed data
      await pgDb.update(agentSkillFiles)
        .set({
          markdownContent: processed.markdownContent,
          extractedTopics: processed.extractedTopics,
          extractedEntities: processed.extractedEntities,
          extractedKeywords: processed.extractedKeywords,
          summary: processed.summary,
          embeddingVector: embedding,
          knowledgeGraph: processed.knowledgeGraph,
          triples: processed.triples,
          processingStatus: 'completed',
          processingCompletedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(agentSkillFiles.id, skillFileId));

      // Process chunks if available
      if (processed.chunks && processed.chunks.length > 0) {
        await this.processChunks(skillFileId, processed.chunks, embedding);
      }

      // Create knowledge graph nodes
      await this.createKnowledgeGraphNodes(skillFileId, processed);

      // Find related files
      await this.findRelatedFiles(skillFileId, embedding);

      this.emit('skillFile:processed', { skillFileId, fileName });
    } catch (error) {
      logger.error(`[SkillMDManagementService] Failed to process document ${skillFileId}:`, error);
      
      // Update status to failed
      await pgDb.update(agentSkillFiles)
        .set({
          processingStatus: 'failed',
          processingError: error instanceof Error ? error.message : 'Unknown error',
          processingCompletedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(agentSkillFiles.id, skillFileId));

      this.emit('skillFile:processingFailed', { skillFileId, error });
    }
  }

  private async processChunks(
    skillFileId: string,
    chunks: ProcessedDocument['chunks'],
    documentEmbedding: number[]
  ): Promise<void> {
    const skillFile = await pgDb.select().from(agentSkillFiles).where(eq(agentSkillFiles.id, skillFileId)).limit(1);
    if (!skillFile[0]) return;

    const { organizationId, agentId } = skillFile[0];

    for (const chunk of chunks!) {
      // Generate embedding for chunk
      const chunkEmbedding = await vectorEmbeddingService.generateEmbedding(chunk.content);

      await pgDb.insert(agentSkillFileChunks).values({
        id: crypto.randomUUID(),
        skillFileId,
        organizationId,
        agentId,
        chunkIndex: chunk.index,
        chunkContent: chunk.content,
        chunkSummary: chunk.summary,
        embeddingVector: chunkEmbedding,
        startPosition: chunk.startPosition,
        endPosition: chunk.endPosition,
        tokenCount: chunk.tokenCount,
        chunkType: chunk.type,
        importanceScore: chunk.type === 'heading' ? '0.80' : '0.50',
        metadata: {},
        createdAt: new Date(),
      });
    }
  }

  private async createKnowledgeGraphNodes(
    skillFileId: string,
    processed: ProcessedDocument
  ): Promise<void> {
    const skillFile = await pgDb.select().from(agentSkillFiles).where(eq(agentSkillFiles.id, skillFileId)).limit(1);
    if (!skillFile[0]) return;

    const { organizationId, agentId } = skillFile[0];

    for (const node of processed.knowledgeGraph.nodes) {
      const nodeEmbedding = await vectorEmbeddingService.generateEmbedding(node.label);

      await pgDb.insert(agentSkillKnowledgeGraph).values({
        id: crypto.randomUUID(),
        organizationId,
        agentId,
        nodeId: node.id,
        nodeType: node.type,
        nodeLabel: node.label,
        nodeProperties: node.properties,
        embeddingVector: nodeEmbedding,
        connections: [],
        connectionTypes: {},
        sourceFileIds: [skillFileId],
        confidence: '0.70',
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      }).onConflictDoNothing();
    }

    // Update connections
    for (const edge of processed.knowledgeGraph.edges) {
      await pgDb.update(agentSkillKnowledgeGraph)
        .set({
          connections: sql`array_append(connections, ${edge.target})`,
          connectionTypes: sql`jsonb_set(COALESCE(connectionTypes, '{}'::jsonb), ${edge.target}, ${edge.relation})`,
          updatedAt: new Date(),
        })
        .where(eq(agentSkillKnowledgeGraph.nodeId, edge.source));
    }
  }

  private async findRelatedFiles(skillFileId: string, embedding: number[]): Promise<void> {
    try {
      // Search for similar files using vector similarity
      const similarFiles = await vectorEmbeddingService.searchSimilarEmbeddings(
        'agent_skill_files',
        embedding,
        5,
        0.7,
        `id != '${skillFileId}'`
      );

      const relatedFileIds = similarFiles.map(f => f.id);

      if (relatedFileIds.length > 0) {
        await pgDb.update(agentSkillFiles)
          .set({
            relatedFileIds: relatedFileIds as any,
            updatedAt: new Date(),
          })
          .where(eq(agentSkillFiles.id, skillFileId));
      }
    } catch (error) {
      logger.error(`[SkillMDManagementService] Failed to find related files for ${skillFileId}:`, error);
    }
  }

  async getSkillFileById(skillFileId: string, organizationId: string): Promise<SkillFile | null> {
    try {
      const result = await pgDb
        .select()
        .from(agentSkillFiles)
        .where(
          and(
            eq(agentSkillFiles.id, skillFileId),
            eq(agentSkillFiles.organizationId, organizationId)
          )
        )
        .limit(1);

      if (!result[0]) return null;

      // Increment access count
      await pgDb.update(agentSkillFiles)
        .set({
          accessCount: sql`access_count + 1`,
          lastAccessedAt: new Date(),
        })
        .where(eq(agentSkillFiles.id, skillFileId));

      return result[0] as SkillFile;
    } catch (error) {
      logger.error(`[SkillMDManagementService] Failed to get skill file ${skillFileId}:`, error);
      return null;
    }
  }

  async getFileByHash(organizationId: string, fileHash: string): Promise<SkillFile | null> {
    try {
      const result = await pgDb
        .select()
        .from(agentSkillFiles)
        .where(
          and(
            eq(agentSkillFiles.organizationId, organizationId),
            eq(agentSkillFiles.originalFileHash, fileHash)
          )
        )
        .limit(1);

      return result[0] as SkillFile || null;
    } catch (error) {
      logger.error('[SkillMDManagementService] Failed to get file by hash:', error);
      return null;
    }
  }

  async searchSkillFiles(options: SearchSkillFilesOptions): Promise<{ files: SkillFile[]; total: number }> {
    try {
      const conditions = [eq(agentSkillFiles.organizationId, options.organizationId)];

      if (options.agentId) {
        conditions.push(eq(agentSkillFiles.agentId, options.agentId));
      }

      if (options.category) {
        conditions.push(eq(agentSkillFiles.category, options.category));
      }

      if (options.language) {
        conditions.push(eq(agentSkillFiles.language, options.language));
      }

      if (options.difficulty) {
        conditions.push(eq(agentSkillFiles.difficulty, options.difficulty));
      }

      if (options.tags && options.tags.length > 0) {
        conditions.push(sql`${options.tags} <@ tags`);
      }

      if (options.query) {
        conditions.push(
          or(
            ilike(agentSkillFiles.originalFileName, `%${options.query}%`),
            ilike(agentSkillFiles.markdownContent, `%${options.query}%`),
            ilike(agentSkillFiles.summary, `%${options.query}%`)
          )!
        );
      }

      // Get total count
      const countResult = await pgDb
        .select({ count: sql<number>`count(*)` })
        .from(agentSkillFiles)
        .where(and(...conditions));

      const total = countResult[0]?.count || 0;

      // Determine sort order
      let orderBy;
      const sortOrder = options.sortOrder === 'asc' ? asc : desc;

      switch (options.sortBy) {
        case 'relevance':
          orderBy = sortOrder(agentSkillFiles.relevanceScore);
          break;
        case 'created':
          orderBy = sortOrder(agentSkillFiles.createdAt);
          break;
        case 'accessed':
          orderBy = sortOrder(agentSkillFiles.lastAccessedAt);
          break;
        case 'name':
          orderBy = sortOrder(agentSkillFiles.originalFileName);
          break;
        default:
          orderBy = desc(agentSkillFiles.createdAt);
      }

      // Get files
      const files = await pgDb
        .select()
        .from(agentSkillFiles)
        .where(and(...conditions))
        .orderBy(orderBy)
        .limit(options.limit || 20)
        .offset(options.offset || 0);

      return { files: files as SkillFile[], total };
    } catch (error) {
      logger.error('[SkillMDManagementService] Failed to search skill files:', error);
      throw new Error(`Failed to search skill files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async semanticSearchSkillFiles(
    organizationId: string,
    query: string,
    agentId?: string,
    limit: number = 10
  ): Promise<{ files: SkillFile[]; similarities: number[] }> {
    try {
      // Generate query embedding
      const queryEmbedding = await vectorEmbeddingService.generateEmbedding(query);

      // Build where clause
      const whereClause = agentId 
        ? `organization_id = '${organizationId}' AND agent_id = '${agentId}'`
        : `organization_id = '${organizationId}'`;

      // Search similar embeddings
      const results = await vectorEmbeddingService.searchSimilarEmbeddings(
        'agent_skill_files',
        queryEmbedding,
        limit,
        0.6,
        whereClause
      );

      // Get full file data
      const fileIds = results.map(r => r.id);
      const files = await pgDb
        .select()
        .from(agentSkillFiles)
        .where(inArray(agentSkillFiles.id, fileIds));

      // Update access count for accessed files
      for (const file of files) {
        await pgDb.update(agentSkillFiles)
          .set({
            accessCount: sql`access_count + 1`,
            lastAccessedAt: new Date(),
          })
          .where(eq(agentSkillFiles.id, file.id));
      }

      return {
        files: files as SkillFile[],
        similarities: results.map(r => r.similarity),
      };
    } catch (error) {
      logger.error('[SkillMDManagementService] Failed to semantic search skill files:', error);
      throw new Error(`Failed to semantic search skill files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getSkillFileChunks(skillFileId: string, organizationId: string): Promise<SkillFileChunk[]> {
    try {
      const chunks = await pgDb
        .select()
        .from(agentSkillFileChunks)
        .where(
          and(
            eq(agentSkillFileChunks.skillFileId, skillFileId),
            eq(agentSkillFileChunks.organizationId, organizationId)
          )
        )
        .orderBy(asc(agentSkillFileChunks.chunkIndex));

      return chunks as SkillFileChunk[];
    } catch (error) {
      logger.error(`[SkillMDManagementService] Failed to get chunks for ${skillFileId}:`, error);
      return [];
    }
  }

  async getKnowledgeGraph(organizationId: string, agentId?: string): Promise<KnowledgeGraphNode[]> {
    try {
      const conditions = [eq(agentSkillKnowledgeGraph.organizationId, organizationId)];

      if (agentId) {
        conditions.push(eq(agentSkillKnowledgeGraph.agentId, agentId));
      }

      const nodes = await pgDb
        .select()
        .from(agentSkillKnowledgeGraph)
        .where(and(...conditions))
        .limit(1000);

      return nodes as KnowledgeGraphNode[];
    } catch (error) {
      logger.error('[SkillMDManagementService] Failed to get knowledge graph:', error);
      return [];
    }
  }

  async updateSkillFile(
    skillFileId: string,
    organizationId: string,
    updates: Partial<SkillFile>
  ): Promise<SkillFile | null> {
    try {
      await pgDb.update(agentSkillFiles)
        .set({
          ...updates,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(agentSkillFiles.id, skillFileId),
            eq(agentSkillFiles.organizationId, organizationId)
          )
        );

      return await this.getSkillFileById(skillFileId, organizationId);
    } catch (error) {
      logger.error(`[SkillMDManagementService] Failed to update skill file ${skillFileId}:`, error);
      return null;
    }
  }

  async deleteSkillFile(skillFileId: string, organizationId: string): Promise<boolean> {
    try {
      // Delete chunks
      await pgDb.delete(agentSkillFileChunks)
        .where(eq(agentSkillFileChunks.skillFileId, skillFileId));

      // Delete skill file
      await pgDb.delete(agentSkillFiles)
        .where(
          and(
            eq(agentSkillFiles.id, skillFileId),
            eq(agentSkillFiles.organizationId, organizationId)
          )
        );

      this.emit('skillFile:deleted', { skillFileId });
      return true;
    } catch (error) {
      logger.error(`[SkillMDManagementService] Failed to delete skill file ${skillFileId}:`, error);
      return false;
    }
  }

  async getSkillFilesByAgent(agentId: string, organizationId: string): Promise<SkillFile[]> {
    try {
      const files = await pgDb
        .select()
        .from(agentSkillFiles)
        .where(
          and(
            eq(agentSkillFiles.agentId, agentId),
            eq(agentSkillFiles.organizationId, organizationId)
          )
        )
        .orderBy(desc(agentSkillFiles.createdAt));

      return files as SkillFile[];
    } catch (error) {
      logger.error(`[SkillMDManagementService] Failed to get files for agent ${agentId}:`, error);
      return [];
    }
  }

  async getSkillFileStats(organizationId: string, agentId?: string): Promise<{
    totalFiles: number;
    processingStatus: Record<string, number>;
    byCategory: Record<string, number>;
    byLanguage: Record<string, number>;
    totalSize: number;
    avgRelevanceScore: number;
  }> {
    try {
      const conditions = [eq(agentSkillFiles.organizationId, organizationId)];

      if (agentId) {
        conditions.push(eq(agentSkillFiles.agentId, agentId));
      }

      const files = await pgDb
        .select()
        .from(agentSkillFiles)
        .where(and(...conditions));

      const processingStatus: Record<string, number> = {};
      const byCategory: Record<string, number> = {};
      const byLanguage: Record<string, number> = {};
      let totalSize = 0;
      let totalRelevanceScore = 0;

      for (const file of files) {
        processingStatus[file.processingStatus] = (processingStatus[file.processingStatus] || 0) + 1;
        if (file.category) {
          byCategory[file.category] = (byCategory[file.category] || 0) + 1;
        }
        byLanguage[file.language] = (byLanguage[file.language] || 0) + 1;
        totalSize += file.originalFileSize;
        totalRelevanceScore += parseFloat(file.relevanceScore);
      }

      return {
        totalFiles: files.length,
        processingStatus,
        byCategory,
        byLanguage,
        totalSize,
        avgRelevanceScore: files.length > 0 ? totalRelevanceScore / files.length : 0,
      };
    } catch (error) {
      logger.error('[SkillMDManagementService] Failed to get skill file stats:', error);
      throw error;
    }
  }

  async reprocessSkillFile(skillFileId: string, organizationId: string): Promise<boolean> {
    try {
      const skillFile = await this.getSkillFileById(skillFileId, organizationId);
      if (!skillFile) {
        throw new Error('Skill file not found');
      }

      // Download original file
      const { buffer } = await fileManagementService.downloadFile(
        skillFile.metadata.originalFileId,
        organizationId
      );

      if (!buffer) {
        throw new Error('Failed to download original file');
      }

      // Reprocess document
      await this.processDocumentAsync(
        skillFileId,
        buffer,
        skillFile.originalFileName,
        skillFile.originalMimeType
      );

      return true;
    } catch (error) {
      logger.error(`[SkillMDManagementService] Failed to reprocess skill file ${skillFileId}:`, error);
      return false;
    }
  }
}

export const skillMDManagementService = new SkillMDManagementService();
