import { EventEmitter } from 'events';
import crypto from 'crypto';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('SkillMDProcessorService');

export interface DocumentProcessingOptions {
  extractTopics?: boolean;
  extractEntities?: boolean;
  extractKeywords?: boolean;
  generateSummary?: boolean;
  createKnowledgeGraph?: boolean;
  chunkDocument?: boolean;
  chunkSize?: number;
  chunkOverlap?: number;
  language?: string;
}

export interface ProcessedDocument {
  markdownContent: string;
  extractedTopics: string[];
  extractedEntities: Array<{ text: string; type: string; confidence: number }>;
  extractedKeywords: string[];
  summary: string;
  knowledgeGraph: {
    nodes: Array<{ id: string; label: string; type: string; properties: Record<string, any> }>;
    edges: Array<{ source: string; target: string; relation: string; confidence: number }>;
  };
  triples: Array<{ subject: string; predicate: string; object: string; confidence: number }>;
  chunks?: Array<{
    content: string;
    summary: string;
    index: number;
    startPosition: number;
    endPosition: number;
    tokenCount: number;
    type: string;
  }>;
  metadata: Record<string, any>;
}

export interface FileProcessingResult {
  success: boolean;
  skillFileId?: string;
  markdownContent?: string;
  error?: string;
  processingTime: number;
}

export class SkillMDProcessorService extends EventEmitter {
  private processingQueue: Map<string, Promise<ProcessedDocument>> = new Map();
  private maxConcurrentProcessing = 5;
  private currentProcessingCount = 0;

  async processDocument(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
    options: DocumentProcessingOptions = {}
  ): Promise<ProcessedDocument> {
    const startTime = Date.now();
    const processingId = crypto.createHash('md5').update(fileBuffer).digest('hex');

    try {
      // Check if already processing
      if (this.processingQueue.has(processingId)) {
        logger.info(`Document ${fileName} already being processed, waiting...`);
        return await this.processingQueue.get(processingId)!;
      }

      // Wait for slot
      while (this.currentProcessingCount >= this.maxConcurrentProcessing) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      this.currentProcessingCount++;
      const processingPromise = this.doProcessDocument(fileBuffer, fileName, mimeType, options);
      this.processingQueue.set(processingId, processingPromise);

      const result = await processingPromise;
      
      this.processingQueue.delete(processingId);
      this.currentProcessingCount--;

      logger.info(`Document ${fileName} processed in ${Date.now() - startTime}ms`);
      this.emit('document:processed', { fileName, processingTime: Date.now() - startTime });

      return result;
    } catch (error) {
      this.processingQueue.delete(processingId);
      this.currentProcessingCount--;
      logger.error(`Failed to process document ${fileName}:`, error);
      throw error;
    }
  }

  private async doProcessDocument(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
    options: DocumentProcessingOptions
  ): Promise<ProcessedDocument> {
    const opts = {
      extractTopics: true,
      extractEntities: true,
      extractKeywords: true,
      generateSummary: true,
      createKnowledgeGraph: true,
      chunkDocument: true,
      chunkSize: 1000,
      chunkOverlap: 100,
      language: 'en',
      ...options,
    };

    // Step 1: Convert to markdown based on file type
    const markdownContent = await this.convertToMarkdown(fileBuffer, fileName, mimeType);

    // Step 2: Extract knowledge
    const extractedTopics = opts.extractTopics ? await this.extractTopics(markdownContent) : [];
    const extractedEntities = opts.extractEntities ? await this.extractEntities(markdownContent) : [];
    const extractedKeywords = opts.extractKeywords ? await this.extractKeywords(markdownContent) : [];
    const summary = opts.generateSummary ? await this.generateSummary(markdownContent) : '';

    // Step 3: Create knowledge graph
    const knowledgeGraph = opts.createKnowledgeGraph 
      ? await this.createKnowledgeGraph(markdownContent, extractedEntities)
      : { nodes: [], edges: [] };

    // Step 4: Generate triples (Subject-Predicate-Object)
    const triples = opts.createKnowledgeGraph
      ? await this.generateTriples(markdownContent, extractedEntities)
      : [];

    // Step 5: Chunk document if requested
    const chunks = opts.chunkDocument
      ? await this.chunkDocument(markdownContent, opts.chunkSize!, opts.chunkOverlap!)
      : undefined;

    return {
      markdownContent,
      extractedTopics,
      extractedEntities,
      extractedKeywords,
      summary,
      knowledgeGraph,
      triples,
      chunks,
      metadata: {
        originalFileName: fileName,
        originalMimeType: mimeType,
        fileSize: fileBuffer.length,
        processedAt: new Date().toISOString(),
        language: opts.language,
      },
    };
  }

  private async convertToMarkdown(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> {
    // Extract text based on MIME type
    let textContent = '';

    switch (mimeType) {
      case 'application/pdf':
        textContent = await this.extractTextFromPDF(fileBuffer);
        break;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword':
        textContent = await this.extractTextFromWord(fileBuffer);
        break;
      case 'text/plain':
        textContent = fileBuffer.toString('utf-8');
        break;
      case 'text/csv':
        textContent = await this.convertCSVToMarkdown(fileBuffer);
        break;
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
        textContent = await this.convertExcelToMarkdown(fileBuffer);
        break;
      default:
        // For unsupported types, try to extract as text
        textContent = fileBuffer.toString('utf-8');
    }

    // Convert to structured markdown
    return this.textToMarkdown(textContent, fileName);
  }

  private async extractTextFromPDF(buffer: Buffer): Promise<string> {
    // In production, use pdf-parse or pdf.js
    // For now, return placeholder
    logger.warn('PDF extraction not fully implemented, using placeholder');
    return `[PDF Document Content]\n\nThis is a placeholder for PDF text extraction. In production, integrate pdf-parse or pdf.js library.`;
  }

  private async extractTextFromWord(buffer: Buffer): Promise<string> {
    // In production, use mammoth.js
    logger.warn('Word extraction not fully implemented, using placeholder');
    return `[Word Document Content]\n\nThis is a placeholder for Word text extraction. In production, integrate mammoth.js library.`;
  }

  private async convertCSVToMarkdown(buffer: Buffer): Promise<string> {
    const content = buffer.toString('utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) return '';

    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(line => line.split(',').map(cell => cell.trim()));

    let markdown = `# CSV Data\n\n`;
    markdown += `| ${headers.join(' | ')} |\n`;
    markdown += `| ${headers.map(() => '---').join(' | ')} |\n`;
    
    for (const row of rows) {
      if (row.length === headers.length) {
        markdown += `| ${row.join(' | ')} |\n`;
      }
    }

    return markdown;
  }

  private async convertExcelToMarkdown(buffer: Buffer): Promise<string> {
    // In production, use xlsx library
    logger.warn('Excel conversion not fully implemented, using placeholder');
    return `[Excel Data]\n\nThis is a placeholder for Excel to Markdown conversion. In production, integrate xlsx library.`;
  }

  private textToMarkdown(text: string, fileName: string): string {
    // Clean and structure text as markdown
    const lines = text.split('\n').filter(line => line.trim());
    
    let markdown = `# ${fileName}\n\n`;
    markdown += `**Document Type:** Processed Document\n`;
    markdown += `**Processed At:** ${new Date().toISOString()}\n\n`;
    markdown += `---\n\n`;

    // Detect headings (lines that are short and followed by longer content)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!.trim();
      const nextLine = lines[i + 1]?.trim();
      
      // If line is short and next line exists, treat as heading
      if (line.length < 50 && nextLine && line.length > 0) {
        markdown += `## ${line}\n\n`;
      } else if (line.length > 0) {
        markdown += `${line}\n\n`;
      }
    }

    return markdown;
  }

  private async extractTopics(markdown: string): Promise<string[]> {
    // Extract topics using keyword frequency and patterns
    const words = markdown.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
    const wordFreq = new Map<string, number>();
    
    for (const word of words) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }

    // Filter common words and get top topics
    const commonWords = new Set(['this', 'that', 'with', 'from', 'have', 'will', 'been', 'were', 'they', 'their', 'what', 'when', 'which', 'would', 'could', 'should']);
    const topics = Array.from(wordFreq.entries())
      .filter(([word]) => !commonWords.has(word))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);

    return topics;
  }

  private async extractEntities(markdown: string): Promise<Array<{ text: string; type: string; confidence: number }>> {
    const entities: Array<{ text: string; type: string; confidence: number }> = [];

    // Extract capitalized words (potential proper nouns)
    const capitalizedWords = markdown.match(/\b[A-Z][a-z]+\b/g) || [];
    const capitalizedFreq = new Map<string, number>();
    
    for (const word of capitalizedWords) {
      capitalizedFreq.set(word, (capitalizedFreq.get(word) || 0) + 1);
    }

    // Words appearing multiple times are likely entities
    for (const [word, count] of capitalizedFreq.entries()) {
      if (count >= 2) {
        entities.push({
          text: word,
          type: 'ENTITY',
          confidence: Math.min(0.9, 0.5 + count * 0.1),
        });
      }
    }

    // Extract email addresses
    const emails = markdown.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) || [];
    for (const email of emails) {
      entities.push({ text: email, type: 'EMAIL', confidence: 0.95 });
    }

    // Extract URLs
    const urls = markdown.match(/https?:\/\/[^\s]+/g) || [];
    for (const url of urls) {
      entities.push({ text: url, type: 'URL', confidence: 0.95 });
    }

    // Extract numbers that look like dates
    const dates = markdown.match(/\b\d{4}-\d{2}-\d{2}\b/g) || [];
    for (const date of dates) {
      entities.push({ text: date, type: 'DATE', confidence: 0.85 });
    }

    return entities.slice(0, 50); // Limit to top 50 entities
  }

  private async extractKeywords(markdown: string): Promise<string[]> {
    // Extract keywords using TF-IDF-like approach
    const words = markdown.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const wordFreq = new Map<string, number>();
    
    for (const word of words) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }

    const stopWords = new Set([
      'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one',
      'our', 'out', 'has', 'have', 'been', 'will', 'with', 'that', 'this', 'from', 'they', 'would',
      'there', 'their', 'what', 'about', 'which', 'when', 'make', 'like', 'into', 'year', 'your',
      'just', 'over', 'also', 'such', 'because', 'these', 'first', 'being', 'through', 'most'
    ]);

    const keywords = Array.from(wordFreq.entries())
      .filter(([word]) => !stopWords.has(word))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word]) => word);

    return keywords;
  }

  private async generateSummary(markdown: string): Promise<string> {
    // Extract first few sentences as summary
    const sentences = markdown.match(/[^.!?]+[.!?]+/g) || [];
    const summarySentences = sentences.slice(0, 3);
    
    if (summarySentences.length === 0) {
      return markdown.substring(0, 200) + '...';
    }

    return summarySentences.join(' ');
  }

  private async createKnowledgeGraph(
    markdown: string,
    entities: Array<{ text: string; type: string; confidence: number }>
  ): Promise<{
    nodes: Array<{ id: string; label: string; type: string; properties: Record<string, any> }>;
    edges: Array<{ source: string; target: string; relation: string; confidence: number }>;
  }> {
    const nodes: Array<{ id: string; label: string; type: string; properties: Record<string, any> }> = [];
    const edges: Array<{ source: string; target: string; relation: string; confidence: number }> = [];

    // Create nodes from entities
    for (const entity of entities) {
      const nodeId = entity.text.toLowerCase().replace(/\s+/g, '_');
      nodes.push({
        id: nodeId,
        label: entity.text,
        type: entity.type,
        properties: {
          confidence: entity.confidence,
          mentions: 1,
        },
      });
    }

    // Create edges based on co-occurrence in sentences
    const sentences = markdown.split(/[.!?]+/);
    for (const sentence of sentences) {
      const sentenceEntities = entities.filter(e => 
        sentence.toLowerCase().includes(e.text.toLowerCase())
      );

      for (let i = 0; i < sentenceEntities.length; i++) {
        for (let j = i + 1; j < sentenceEntities.length; j++) {
          const sourceId = sentenceEntities[i]!.text.toLowerCase().replace(/\s+/g, '_');
          const targetId = sentenceEntities[j]!.text.toLowerCase().replace(/\s+/g, '_');
          
          edges.push({
            source: sourceId,
            target: targetId,
            relation: 'RELATED_TO',
            confidence: 0.7,
          });
        }
      }
    }

    return { nodes, edges };
  }

  private async generateTriples(
    markdown: string,
    entities: Array<{ text: string; type: string; confidence: number }>
  ): Promise<Array<{ subject: string; predicate: string; object: string; confidence: number }>> {
    const triples: Array<{ subject: string; predicate: string; object: string; confidence: number }> = [];

    // Generate simple triples based on sentence patterns
    const sentences = markdown.split(/[.!?]+/);
    
    for (const sentence of sentences) {
      const sentenceEntities = entities.filter(e =>
        sentence.toLowerCase().includes(e.text.toLowerCase())
      );

      if (sentenceEntities.length >= 2) {
        // Create triples between co-occurring entities
        for (let i = 0; i < sentenceEntities.length; i++) {
          for (let j = i + 1; j < sentenceEntities.length; j++) {
            triples.push({
              subject: sentenceEntities[i]!.text,
              predicate: 'is_related_to',
              object: sentenceEntities[j]!.text,
              confidence: 0.6,
            });
          }
        }
      }
    }

    return triples.slice(0, 100); // Limit to 100 triples
  }

  private async chunkDocument(
    markdown: string,
    chunkSize: number,
    overlap: number
  ): Promise<Array<{
    content: string;
    summary: string;
    index: number;
    startPosition: number;
    endPosition: number;
    tokenCount: number;
    type: string;
  }>> {
    const chunks: Array<{
      content: string;
      summary: string;
      index: number;
      startPosition: number;
      endPosition: number;
      tokenCount: number;
      type: string;
    }> = [];

    const sentences = markdown.match(/[^.!?]+[.!?]+/g) || [];
    let currentChunk = '';
    let startPosition = 0;
    let chunkIndex = 0;

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i]!;
      
      if (currentChunk.length + sentence.length > chunkSize && currentChunk.length > 0) {
        // Save current chunk
        chunks.push({
          content: currentChunk.trim(),
          summary: currentChunk.substring(0, 100) + '...',
          index: chunkIndex,
          startPosition,
          endPosition: startPosition + currentChunk.length,
          tokenCount: currentChunk.split(/\s+/).length,
          type: this.classifyChunk(currentChunk),
        });

        // Start new chunk with overlap
        const overlapSentences = currentChunk.split(/[.!?]+/).slice(-Math.ceil(overlap / 50));
        currentChunk = overlapSentences.join('. ') + sentence;
        startPosition = startPosition + currentChunk.length - overlapSentences.join('. ').length;
        chunkIndex++;
      } else {
        currentChunk += sentence;
      }
    }

    // Add final chunk
    if (currentChunk.trim()) {
      chunks.push({
        content: currentChunk.trim(),
        summary: currentChunk.substring(0, 100) + '...',
        index: chunkIndex,
        startPosition,
        endPosition: startPosition + currentChunk.length,
        tokenCount: currentChunk.split(/\s+/).length,
        type: this.classifyChunk(currentChunk),
      });
    }

    return chunks;
  }

  private classifyChunk(content: string): string {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('```') || lowerContent.includes('function') || lowerContent.includes('class')) {
      return 'code';
    }
    if (lowerContent.includes('|') && lowerContent.split('|').length > 5) {
      return 'table';
    }
    if (content.startsWith('#')) {
      return 'heading';
    }
    if (content.length < 200) {
      return 'introduction';
    }
    return 'body';
  }

  // Queue management
  getQueueStatus(): { processing: number; queued: number } {
    return {
      processing: this.currentProcessingCount,
      queued: this.processingQueue.size,
    };
  }

  clearQueue(): void {
    this.processingQueue.clear();
    this.currentProcessingCount = 0;
  }
}

export const skillMDProcessorService = new SkillMDProcessorService();
