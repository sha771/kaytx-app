/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { knowledgeExtractionService } from './company-brain-extraction';
import { companyBrainWebSocketService } from './company-brain-websocket';
import fs from 'fs/promises';
import path from 'path';

/**
 * Company Brain Document Processing Service
 * Handles document upload, parsing, OCR, and knowledge extraction
 * Supports PDF, DOCX, PPTX, TXT, MD, and images with OCR
 */

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
  maxFileSize: number; // in bytes
  supportedFormats: string[];
  autoExtractKnowledge: boolean;
  chunkSize: number; // for large documents
}

export class DocumentProcessorService {
  private documents: Map<string, DocumentMetadata> = new Map();
  private config: ProcessingConfig = {
    enableOCR: true,
    ocrLanguages: ['eng', 'spa', 'fra', 'deu'],
    maxFileSize: 50 * 1024 * 1024, // 50MB
    supportedFormats: [
      'pdf',
      'docx',
      'doc',
      'pptx',
      'ppt',
      'txt',
      'md',
      'rtf',
      'png',
      'jpg',
      'jpeg',
      'tiff',
      'bmp',
    ],
    autoExtractKnowledge: true,
    chunkSize: 100000, // characters per chunk
  };

  /**
   * Configure document processing
   */
  configureProcessing(config: Partial<ProcessingConfig>): void {
    this.config = { ...this.config, ...config };
    console.log('Document processing configured:', this.config);
  }

  /**
   * Upload and process a document
   */
  async processDocument(
    file: File,
    authorId: string,
    departmentId?: string,
    projectIds?: string[],
    tags?: string[]
  ): Promise<DocumentProcessingResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    let textExtracted = '';
    let pagesProcessed = 0;
    let knowledgeNodesCreated = 0;
    let ocrUsed = false;

    try {
      // Validate file
      const validation = this.validateFile(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Create document metadata
      const documentId = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const fileType = this.getFileType(file.name);

      const metadata: DocumentMetadata = {
        id: documentId,
        filename: file.name,
        fileType,
        fileSize: file.size,
        uploadedAt: new Date(),
        authorId,
        departmentId,
        projectIds,
        tags,
        status: 'processing',
      };

      this.documents.set(documentId, metadata);

      // Notify start of processing
      companyBrainWebSocketService.broadcastAnalyticsUpdate({
        type: 'document_processing_started',
        documentId,
        filename: file.name,
      });

      // Extract text based on file type
      const extractionResult = await this.extractText(file, fileType);
      textExtracted = extractionResult.text;
      pagesProcessed = extractionResult.pagesProcessed;
      ocrUsed = extractionResult.ocrUsed;

      if (!textExtracted || textExtracted.length < 10) {
        throw new Error('No text could be extracted from document');
      }

      // Update metadata
      metadata.processedAt = new Date();
      metadata.ocrUsed = ocrUsed;
      metadata.pageCount = pagesProcessed;
      metadata.status = 'completed';

      // Extract knowledge if enabled
      if (this.config.autoExtractKnowledge) {
        const knowledge = await this.extractKnowledgeFromDocument(
          textExtracted,
          documentId,
          metadata
        );
        knowledgeNodesCreated = knowledge;
      }

      // Update processing time
      const processingTime = Date.now() - startTime;

      // Notify completion
      companyBrainWebSocketService.broadcastAnalyticsUpdate({
        type: 'document_processing_complete',
        documentId,
        filename: file.name,
        pagesProcessed,
        knowledgeNodesCreated,
        processingTime,
      });

      return {
        success: true,
        documentId,
        filename: file.name,
        fileType,
        pagesProcessed,
        textExtracted: textExtracted.substring(0, 500), // Preview
        knowledgeNodesCreated,
        processingTime,
        errors,
      };
    } catch (error) {
      const processingTime = Date.now() - startTime;
      errors.push(error instanceof Error ? error.message : 'Unknown error');

      // Update metadata to failed
      const metadata = this.documents.get(documentId);
      if (metadata) {
        metadata.status = 'failed';
      }

      // Notify failure
      companyBrainWebSocketService.broadcastRiskAlert({
        type: 'document_processing_failed',
        filename: file.name,
        error: errors[0],
      });

      return {
        success: false,
        documentId: '',
        filename: file.name,
        fileType: this.getFileType(file.name),
        pagesProcessed,
        textExtracted: '',
        knowledgeNodesCreated,
        processingTime,
        errors,
      };
    }
  }

  /**
   * Validate uploaded file
   */
  private validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > this.config.maxFileSize) {
      return {
        valid: false,
        error: `File size exceeds maximum of ${this.config.maxFileSize / 1024 / 1024}MB`,
      };
    }

    // Check file type
    const fileType = this.getFileType(file.name);
    if (!this.config.supportedFormats.includes(fileType)) {
      return {
        valid: false,
        error: `File type ${fileType} is not supported. Supported formats: ${this.config.supportedFormats.join(', ')}`,
      };
    }

    return { valid: true };
  }

  /**
   * Get file type from filename
   */
  private getFileType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    return ext;
  }

  /**
   * Extract text from document based on file type
   */
  private async extractText(
    file: File,
    fileType: string
  ): Promise<{ text: string; pagesProcessed: number; ocrUsed: boolean }> {
    switch (fileType) {
      case 'pdf':
        return this.extractFromPDF(file);
      case 'docx':
      case 'doc':
        return this.extractFromWord(file);
      case 'pptx':
      case 'ppt':
        return this.extractFromPowerPoint(file);
      case 'txt':
      case 'md':
      case 'rtf':
        return this.extractFromTextFile(file);
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'tiff':
      case 'bmp':
        return this.extractFromImage(file);
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  }

  /**
   * Extract text from PDF
   */
  private async extractFromPDF(file: File): Promise<{ text: string; pagesProcessed: number; ocrUsed: boolean }> {
    console.log('Extracting text from PDF:', file.name);

    // In production, use pdf-parse or pdf.js
    // For now, simulate extraction
    const text = await file.text();
    
    // Simulate page count
    const pagesProcessed = Math.ceil(text.length / 2000);

    return {
      text,
      pagesProcessed,
      ocrUsed: false,
    };
  }

  /**
   * Extract text from Word document
   */
  private async extractFromWord(file: File): Promise<{ text: string; pagesProcessed: number; ocrUsed: boolean }> {
    console.log('Extracting text from Word document:', file.name);

    // In production, use mammoth.js or docx library
    const text = await file.text();
    const pagesProcessed = Math.ceil(text.length / 2000);

    return {
      text,
      pagesProcessed,
      ocrUsed: false,
    };
  }

  /**
   * Extract text from PowerPoint
   */
  private async extractFromPowerPoint(file: File): Promise<{ text: string; pagesProcessed: number; ocrUsed: boolean }> {
    console.log('Extracting text from PowerPoint:', file.name);

    // In production, use pptx-parser or similar
    const text = await file.text();
    const pagesProcessed = Math.ceil(text.length / 1500);

    return {
      text,
      pagesProcessed,
      ocrUsed: false,
    };
  }

  /**
   * Extract text from plain text file
   */
  private async extractFromTextFile(file: File): Promise<{ text: string; pagesProcessed: number; ocrUsed: boolean }> {
    console.log('Extracting text from text file:', file.name);

    const text = await file.text();
    const pagesProcessed = Math.ceil(text.length / 2000);

    return {
      text,
      pagesProcessed,
      ocrUsed: false,
    };
  }

  /**
   * Extract text from image using OCR
   */
  private async extractFromImage(file: File): Promise<{ text: string; pagesProcessed: number; ocrUsed: boolean }> {
    console.log('Extracting text from image using OCR:', file.name);

    if (!this.config.enableOCR) {
      throw new Error('OCR is disabled in configuration');
    }

    // In production, use Tesseract.js or Google Cloud Vision API
    // For now, simulate OCR
    const text = `[OCR Extracted Text from ${file.name}]\n\nThis is simulated OCR output. In production, this would contain the actual text extracted from the image using Tesseract.js or Google Cloud Vision API.`;
    
    return {
      text,
      pagesProcessed: 1,
      ocrUsed: true,
    };
  }

  /**
   * Extract knowledge from document text
   */
  private async extractKnowledgeFromDocument(
    text: string,
    documentId: string,
    metadata: DocumentMetadata
  ): Promise<number> {
    let nodesCreated = 0;

    try {
      // For large documents, chunk the text
      const chunks = this.chunkText(text, this.config.chunkSize);

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const chunkId = `${documentId}-chunk-${i}`;

        try {
          const knowledge = await knowledgeExtractionService.extractFromText(
            chunk,
            chunkId,
            {
              sourceType: 'document',
              filename: metadata.filename,
              fileType: metadata.fileType,
              author: metadata.authorId,
              department: metadata.departmentId,
              chunkIndex: i,
              totalChunks: chunks.length,
            }
          );

          nodesCreated++;

          // Notify about new knowledge
          companyBrainWebSocketService.notifyKnowledgeCreated({
            id: chunkId,
            title: knowledge.title,
            type: knowledge.type,
            source: `document:${metadata.filename}`,
            author: metadata.authorId,
          });
        } catch (error) {
          console.error(`Error extracting knowledge from chunk ${i}:`, error);
        }
      }

      return nodesCreated;
    } catch (error) {
      console.error('Error extracting knowledge from document:', error);
      return nodesCreated;
    }
  }

  /**
   * Chunk text into smaller pieces for processing
   */
  private chunkText(text: string, chunkSize: number): string[] {
    const chunks: string[] = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      const endIndex = Math.min(currentIndex + chunkSize, text.length);
      let chunk = text.substring(currentIndex, endIndex);

      // Try to break at a sentence boundary
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

    return chunks.filter(chunk => chunk.length > 0);
  }

  /**
   * Batch process multiple documents
   */
  async batchProcessDocuments(
    files: File[],
    authorId: string,
    departmentId?: string,
    projectIds?: string[],
    tags?: string[]
  ): Promise<DocumentProcessingResult[]> {
    const results: DocumentProcessingResult[] = [];

    for (const file of files) {
      const result = await this.processDocument(file, authorId, departmentId, projectIds, tags);
      results.push(result);
    }

    return results;
  }

  /**
   * Get document metadata
   */
  getDocumentMetadata(documentId: string): DocumentMetadata | undefined {
    return this.documents.get(documentId);
  }

  /**
   * Get all documents
   */
  getAllDocuments(): DocumentMetadata[] {
    return Array.from(this.documents.values());
  }

  /**
   * Get documents by author
   */
  getDocumentsByAuthor(authorId: string): DocumentMetadata[] {
    return Array.from(this.documents.values()).filter(doc => doc.authorId === authorId);
  }

  /**
   * Get documents by status
   */
  getDocumentsByStatus(status: DocumentMetadata['status']): DocumentMetadata[] {
    return Array.from(this.documents.values()).filter(doc => doc.status === status);
  }

  /**
   * Delete document
   */
  async deleteDocument(documentId: string): Promise<boolean> {
    const deleted = this.documents.delete(documentId);
    
    if (deleted) {
      companyBrainWebSocketService.broadcastAnalyticsUpdate({
        type: 'document_deleted',
        documentId,
      });
    }

    return deleted;
  }

  /**
   * Get processing statistics
   */
  getProcessingStats(): {
    totalDocuments: number;
    completed: number;
    failed: number;
    processing: number;
    avgProcessingTime: number;
    ocrUsage: number;
  } {
    const documents = Array.from(this.documents.values());
    const completed = documents.filter(d => d.status === 'completed');
    const failed = documents.filter(d => d.status === 'failed');
    const processing = documents.filter(d => d.status === 'processing');
    const ocrUsed = completed.filter(d => d.ocrUsed).length;

    return {
      totalDocuments: documents.length,
      completed: completed.length,
      failed: failed.length,
      processing: processing.length,
      avgProcessingTime: 0, // Would calculate from actual processing times
      ocrUsage: completed.length > 0 ? (ocrUsed / completed.length) * 100 : 0,
    };
  }
}

// Export singleton instance
export const documentProcessorService = new DocumentProcessorService();
