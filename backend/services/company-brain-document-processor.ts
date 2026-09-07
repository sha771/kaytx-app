import { db } from '../db/connection';
import { knowledgeDocuments, knowledgeDocumentChunks, knowledgeNodes } from '../db/drizzle-schema';
import { eq, and, desc, count, sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export interface DocumentProcessingResult {
  success: boolean;
  documentId: string;
  filename: string;
  fileType: string;
  pagesProcessed: number;
  textExtracted: string;
  knowledgeNodesCreated: number;
  processingTime: number;
  errors: string[];
}

export interface DocumentMetadata {
  id: string;
  filename: string;
  fileType: string;
  fileSize: number;
  uploadedAt: Date;
  processedAt?: Date;
  authorId: string;
  departmentId?: string;
  projectIds?: string[];
  tags?: string[];
  status: 'uploaded' | 'processing' | 'completed' | 'failed';
  ocrUsed?: boolean;
  pageCount?: number;
}

export interface ProcessingConfig {
  enableOCR: boolean;
  ocrLanguages: string[];
  maxFileSize: number;
  supportedFormats: string[];
  autoExtractKnowledge: boolean;
  chunkSize: number;
}

export class DocumentProcessorService {
  private config: ProcessingConfig = {
    enableOCR: true,
    ocrLanguages: ['eng', 'spa', 'fra', 'deu'],
    maxFileSize: 50 * 1024 * 1024,
    supportedFormats: [
      'pdf', 'docx', 'doc', 'pptx', 'ppt', 'txt', 'md', 'rtf',
      'png', 'jpg', 'jpeg', 'tiff', 'bmp',
    ],
    autoExtractKnowledge: true,
    chunkSize: 100000,
  };

  configureProcessing(config: Partial<ProcessingConfig>): void {
    this.config = { ...this.config, ...config };
    console.log('Document processing configured:', this.config);
  }

  async processDocument(
    organizationId: string,
    documentData: {
      fileName: string;
      fileType?: string;
      content: string;
      fileSize?: number;
      createdBy?: string;
      departmentId?: string;
      projectIds?: string[];
      tags?: string[];
      mimeType?: string;
    }
  ): Promise<DocumentProcessingResult> {
    const startTime = Date.now();
    const errors: string[] = [];

    try {
      const fileType = documentData.fileType || this.getFileType(documentData.fileName);
      const fileSize = documentData.fileSize || documentData.content.length;
      const validation = this.validateFile({ fileName: documentData.fileName, fileType, fileSize });

      if (!validation.valid) {
        throw new Error(validation.error);
      }

      const documentId = uuidv4();
      const nodeId = uuidv4();
      const textExtracted = documentData.content;
      const pagesProcessed = Math.ceil(textExtracted.length / 2000);
      let knowledgeNodesCreated = 0;

      await db.insert(knowledgeNodes).values({
        id: nodeId,
        organizationId,
        type: 'document',
        label: documentData.fileName,
        content: textExtracted,
        sourceType: 'document',
        sourceId: documentId,
        status: 'draft',
        tags: JSON.stringify(documentData.tags || []),
        properties: JSON.stringify({
          fileType,
          fileSize,
          departmentId: documentData.departmentId || null,
          projectIds: documentData.projectIds || [],
          ocrUsed: false,
          pageCount: pagesProcessed,
        }),
        createdBy: documentData.createdBy || null,
        departmentId: documentData.departmentId || null,
        projectIds: JSON.stringify(documentData.projectIds || []),
        metadata: JSON.stringify({}),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await db.insert(knowledgeDocuments).values({
        id: documentId,
        organizationId,
        nodeId,
        fileName: documentData.fileName,
        fileType,
        fileSize: fileSize || 0,
        content: textExtracted,
        mimeType: documentData.mimeType || null,
        processingStatus: 'processing',
        chunkCount: 0,
        metadata: JSON.stringify({
          tags: documentData.tags || [],
          departmentId: documentData.departmentId || null,
          projectIds: documentData.projectIds || [],
          ocrUsed: false,
          pageCount: pagesProcessed,
        }),
        createdBy: documentData.createdBy || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const chunks = this.chunkText(textExtracted, this.config.chunkSize);

      for (let i = 0; i < chunks.length; i++) {
        await db.insert(knowledgeDocumentChunks).values({
          id: uuidv4(),
          organizationId,
          documentId,
          chunkIndex: i,
          chunkContent: chunks[i],
          tokenCount: chunks[i].split(/\s+/).length,
          metadata: JSON.stringify({}),
          createdAt: new Date(),
        });
        knowledgeNodesCreated++;
      }

      await db.update(knowledgeDocuments)
        .set({
          processingStatus: 'completed',
          chunkCount: chunks.length,
          updatedAt: new Date(),
        })
        .where(eq(knowledgeDocuments.id, documentId));

      const processingTime = Date.now() - startTime;

      return {
        success: true,
        documentId,
        filename: documentData.fileName,
        fileType,
        pagesProcessed,
        textExtracted: textExtracted.substring(0, 500),
        knowledgeNodesCreated,
        processingTime,
        errors,
      };
    } catch (error) {
      const processingTime = Date.now() - startTime;
      errors.push(error instanceof Error ? error.message : 'Unknown error');

      return {
        success: false,
        documentId: '',
        filename: documentData.fileName,
        fileType: documentData.fileType || this.getFileType(documentData.fileName),
        pagesProcessed: 0,
        textExtracted: '',
        knowledgeNodesCreated: 0,
        processingTime,
        errors,
      };
    }
  }

  async batchProcessDocuments(
    organizationId: string,
    documents: Array<{
      fileName: string;
      fileType?: string;
      content: string;
      fileSize?: number;
      createdBy?: string;
      departmentId?: string;
      projectIds?: string[];
      tags?: string[];
      mimeType?: string;
    }>
  ): Promise<DocumentProcessingResult[]> {
    const results: DocumentProcessingResult[] = [];

    for (const doc of documents) {
      const result = await this.processDocument(organizationId, doc);
      results.push(result);
    }

    return results;
  }

  async getDocumentMetadata(organizationId: string, documentId: string): Promise<DocumentMetadata | null> {
    const rows = await db.select()
      .from(knowledgeDocuments)
      .where(and(
        eq(knowledgeDocuments.id, documentId),
        eq(knowledgeDocuments.organizationId, organizationId)
      ))
      .limit(1);

    if (rows.length === 0) return null;

    return this.rowToMetadata(rows[0]);
  }

  async getAllDocuments(organizationId: string): Promise<DocumentMetadata[]> {
    const rows = await db.select()
      .from(knowledgeDocuments)
      .where(eq(knowledgeDocuments.organizationId, organizationId))
      .orderBy(desc(knowledgeDocuments.createdAt));

    return rows.map(r => this.rowToMetadata(r));
  }

  async getDocumentsByAuthor(organizationId: string, author: string): Promise<DocumentMetadata[]> {
    const rows = await db.select()
      .from(knowledgeDocuments)
      .where(and(
        eq(knowledgeDocuments.organizationId, organizationId),
        eq(knowledgeDocuments.createdBy, author)
      ))
      .orderBy(desc(knowledgeDocuments.createdAt));

    return rows.map(r => this.rowToMetadata(r));
  }

  async getDocumentsByStatus(organizationId: string, status: string): Promise<DocumentMetadata[]> {
    const rows = await db.select()
      .from(knowledgeDocuments)
      .where(and(
        eq(knowledgeDocuments.organizationId, organizationId),
        eq(knowledgeDocuments.processingStatus, status)
      ))
      .orderBy(desc(knowledgeDocuments.createdAt));

    return rows.map(r => this.rowToMetadata(r));
  }

  async deleteDocument(organizationId: string, documentId: string): Promise<boolean> {
    const rows = await db.select({
      id: knowledgeDocuments.id,
      nodeId: knowledgeDocuments.nodeId,
    })
      .from(knowledgeDocuments)
      .where(and(
        eq(knowledgeDocuments.id, documentId),
        eq(knowledgeDocuments.organizationId, organizationId)
      ))
      .limit(1);

    if (rows.length === 0) return false;

    const doc = rows[0];

    await db.delete(knowledgeDocumentChunks)
      .where(and(
        eq(knowledgeDocumentChunks.documentId, documentId),
        eq(knowledgeDocumentChunks.organizationId, organizationId)
      ));

    await db.delete(knowledgeDocuments)
      .where(and(
        eq(knowledgeDocuments.id, documentId),
        eq(knowledgeDocuments.organizationId, organizationId)
      ));

    if (doc.nodeId) {
      await db.delete(knowledgeNodes)
        .where(and(
          eq(knowledgeNodes.id, doc.nodeId),
          eq(knowledgeNodes.organizationId, organizationId)
        ));
    }

    return true;
  }

  async getProcessingStats(organizationId: string): Promise<{
    totalDocuments: number;
    completed: number;
    failed: number;
    processing: number;
    avgProcessingTime: number;
    ocrUsage: number;
  }> {
    const rows = await db.select({
      status: knowledgeDocuments.processingStatus,
      total: count(),
    })
      .from(knowledgeDocuments)
      .where(eq(knowledgeDocuments.organizationId, organizationId))
      .groupBy(knowledgeDocuments.processingStatus);

    const stats = {
      totalDocuments: 0,
      completed: 0,
      failed: 0,
      processing: 0,
      avgProcessingTime: 0,
      ocrUsage: 0,
    };

    for (const row of rows) {
      const s = row.status;
      const t = Number(row.total);
      stats.totalDocuments += t;

      if (s === 'completed') stats.completed += t;
      else if (s === 'failed') stats.failed += t;
      else if (s === 'processing' || s === 'uploaded') stats.processing += t;
    }

    if (stats.completed > 0) {
      const completedRows = await db.select({ metadata: knowledgeDocuments.metadata })
        .from(knowledgeDocuments)
        .where(and(
          eq(knowledgeDocuments.organizationId, organizationId),
          eq(knowledgeDocuments.processingStatus, 'completed')
        ));

      let ocrCount = 0;
      for (const r of completedRows) {
        const meta = (r.metadata as any) || {};
        if (meta.ocrUsed) ocrCount++;
      }

      stats.ocrUsage = (ocrCount / stats.completed) * 100;
    }

    return stats;
  }

  private validateFile(data: { fileName: string; fileType: string; fileSize: number }): { valid: boolean; error?: string } {
    if (data.fileSize > this.config.maxFileSize) {
      return {
        valid: false,
        error: `File size exceeds maximum of ${this.config.maxFileSize / 1024 / 1024}MB`,
      };
    }

    if (!this.config.supportedFormats.includes(data.fileType)) {
      return {
        valid: false,
        error: `File type ${data.fileType} is not supported. Supported formats: ${this.config.supportedFormats.join(', ')}`,
      };
    }

    return { valid: true };
  }

  private getFileType(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  private chunkText(text: string, chunkSize: number): string[] {
    const chunks: string[] = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      const endIndex = Math.min(currentIndex + chunkSize, text.length);
      let chunk = text.substring(currentIndex, endIndex);

      if (endIndex < text.length) {
        const lastSentenceEnd = Math.max(
          chunk.lastIndexOf('.'),
          chunk.lastIndexOf('!'),
          chunk.lastIndexOf('?')
        );

        if (lastSentenceEnd > chunkSize * 0.5) {
          chunk = chunk.substring(0, lastSentenceEnd + 1);
        }
      }

      chunks.push(chunk.trim());
      currentIndex += chunk.length;
    }

    return chunks.filter(c => c.length > 0);
  }

  private rowToMetadata(row: any): DocumentMetadata {
    const meta = (row.metadata as any) || {};
    return {
      id: row.id,
      filename: row.fileName,
      fileType: row.fileType,
      fileSize: row.fileSize || 0,
      uploadedAt: row.createdAt,
      processedAt: row.processingStatus === 'completed' ? row.updatedAt : undefined,
      authorId: row.createdBy || '',
      departmentId: meta.departmentId || undefined,
      projectIds: meta.projectIds || undefined,
      tags: meta.tags || undefined,
      status: row.processingStatus as DocumentMetadata['status'],
      ocrUsed: meta.ocrUsed || false,
      pageCount: meta.pageCount || undefined,
    };
  }
}

export const documentProcessorService = new DocumentProcessorService();
