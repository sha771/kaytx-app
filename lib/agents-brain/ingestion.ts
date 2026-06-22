/**
 * Agents Brain Ingestion System
 * Scans raw data and creates structured wiki pages using LLM
 * Based on LLM Wiki pattern: Two-Step Chain-of-Thought Ingest
 */

import { BrainStorage } from './storage';
import { WikiPage, SourceEntry, IngestResult, IngestError, WikiFrontmatter } from './types';
import { BrainLLMClient } from './llm-client';
import crypto from 'crypto';
import path from 'path';

export class BrainIngestion {
  private storage: BrainStorage;
  private llmClient: BrainLLMClient;

  constructor(storage?: BrainStorage, llmClient?: BrainLLMClient) {
    this.storage = storage || new BrainStorage();
    // Initialize LLM client - use provided client or create from environment
    this.llmClient = llmClient || BrainLLMClient.fromEnvironment();
  }

  /**
   * Main ingestion process - scans raw sources and creates structured wiki
   */
  async ingestSources(sourcePaths?: string[]): Promise<IngestResult> {
    const startTime = Date.now();
    const errors: IngestError[] = [];
    let sourcesProcessed = 0;
    let pagesCreated = 0;
    let pagesUpdated = 0;
    let conceptsExtracted = 0;
    let relationshipsFound = 0;

    try {
      // Initialize brain if needed
      await this.storage.initializeBrain();

      // Get sources to process
      const sources = sourcePaths 
        ? sourcePaths 
        : await this.storage.getAllRawSources();

      console.log(`Starting ingestion of ${sources.length} sources...`);

      for (const sourcePath of sources) {
        try {
          sourcesProcessed++;
          
          // Check if source already exists and hasn't changed
          const sourceId = this.generateSourceId(sourcePath);
          const manifest = await this.storage.readManifest();
          const existingSource = manifest.sources.find(s => s.id === sourceId);
          
          const currentChecksum = await this.storage.calculateChecksum(sourcePath);
          
          // Skip if source hasn't changed
          if (existingSource && existingSource.checksum === currentChecksum) {
            console.log(`Skipping unchanged source: ${sourcePath}`);
            continue;
          }

          // Update source status to processing
          await this.storage.updateSourceStatus(sourceId, 'pending');

          // Read raw source
          const rawContent = await this.storage.readRawSource(sourcePath);

          // Step 1: Analyze source with LLM (Chain-of-Thought)
          const analysis = await this.analyzeSource(sourcePath, rawContent);

          // Step 2: Generate wiki pages from analysis
          const wikiPages = await this.generateWikiPages(sourcePath, rawContent, analysis);

          // Step 3: Merge with existing wiki
          for (const page of wikiPages) {
            const existingPage = await this.storage.readWikiPage(page.id);
            
            if (existingPage) {
              // Merge with existing page
              const mergedPage = await this.mergeWikiPages(existingPage, page);
              await this.storage.writeWikiPage(mergedPage);
              pagesUpdated++;
            } else {
              // Create new page
              await this.storage.writeWikiPage(page);
              pagesCreated++;
            }

            conceptsExtracted += page.frontmatter.tags.length;
            relationshipsFound += page.frontmatter.related.length;
          }

          // Update source entry in manifest
          const sourceEntry: SourceEntry = {
            id: sourceId,
            path: sourcePath,
            type: this.detectSourceType(sourcePath),
            size: rawContent.length,
            lastModified: new Date().toISOString(),
            ingestedAt: new Date().toISOString(),
            checksum: currentChecksum,
            wikiPages: wikiPages.map(p => p.id),
            status: 'ingested',
          };

          await this.storage.addSourceToManifest(sourceEntry);

          console.log(`Successfully ingested: ${sourcePath}`);

        } catch (error) {
          const errorEntry: IngestError = {
            sourceId: this.generateSourceId(sourcePath),
            sourcePath,
            error: error instanceof Error ? error.message : String(error),
            timestamp: new Date().toISOString(),
          };
          errors.push(errorEntry);
          console.error(`Error ingesting ${sourcePath}:`, error);
        }
      }

      // Update index with all pages
      await this.updateIndex();

      // Calculate statistics
      const manifest = await this.storage.readManifest();
      const allPages = await this.storage.getAllWikiPages();
      manifest.statistics.totalWikiPages = allPages.length;
      manifest.statistics.totalConcepts = conceptsExtracted;
      manifest.statistics.totalRelationships = relationshipsFound;
      manifest.statistics.lastIngestTime = new Date().toISOString();
      
      // Estimate token savings (rough estimate: raw files are ~10x larger than structured wiki)
      const rawTokens = sources.reduce((acc, s) => acc + s.length / 4, 0); // ~4 chars per token
      const wikiTokens = allPages.reduce((acc, p) => acc + p.content.length / 4, 0);
      manifest.statistics.tokenSavings = Math.max(0, rawTokens - wikiTokens);
      
      await this.storage.writeManifest(manifest);

      // Log the operation
      await this.storage.writeLog({
        timestamp: new Date().toISOString(),
        operation: 'ingest',
        details: `Ingested ${sourcesProcessed} sources, created ${pagesCreated} pages, updated ${pagesUpdated} pages`,
        sources: sources,
        pages: wikiPages => wikiPages.map(p => p.id),
        duration: Date.now() - startTime,
        success: errors.length === 0,
      });

      const duration = Date.now() - startTime;

      return {
        success: errors.length === 0,
        sourcesProcessed,
        pagesCreated,
        pagesUpdated,
        conceptsExtracted,
        relationshipsFound,
        errors,
        duration,
      };

    } catch (error) {
      console.error('Fatal error during ingestion:', error);
      throw error;
    }
  }

  /**
   * Step 1: Analyze source with LLM using Chain-of-Thought
   */
  private async analyzeSource(sourcePath: string, content: string): Promise<any> {
    try {
      // Use the real LLM client to analyze the content
      const analysis = await this.llmClient.analyzeDocument(sourcePath, content);
      return analysis;
    } catch (error) {
      console.error('LLM analysis failed, using fallback:', error);
      // Fallback to simple analysis if LLM fails
      return this.getFallbackAnalysis(content);
    }
  }

  /**
   * Fallback analysis when LLM is not available
   */
  private getFallbackAnalysis(content: string): any {
    // Simple keyword extraction as fallback
    const words = content.toLowerCase().split(/\s+/);
    const wordFreq = new Map<string, number>();
    
    words.forEach(word => {
      if (word.length > 3) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
      }
    });

    const topWords = Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);

    return {
      summary: content.substring(0, 200) + '...',
      concepts: topWords.slice(0, 5),
      categories: ['general'],
      tags: topWords,
      related: [],
      claims: [],
      confidence: 0.5,
    };
  }

  /**
   * Step 2: Generate wiki pages from analysis
   */
  private async generateWikiPages(
    sourcePath: string,
    rawContent: string,
    analysis: any
  ): Promise<WikiPage[]> {
    const pages: WikiPage[] = [];
    const sourceId = this.generateSourceId(sourcePath);

    // Generate main page for the document
    const mainPage: WikiPage = {
      id: this.generatePageId(sourcePath),
      title: this.extractTitle(sourcePath, analysis),
      path: `${this.generatePageId(sourcePath)}.md`,
      frontmatter: {
        title: this.extractTitle(sourcePath, analysis),
        summary: analysis.summary || '',
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        sources: [sourcePath],
        tags: analysis.tags || [],
        categories: analysis.categories || [],
        related: analysis.related || [],
        confidence: analysis.confidence || 0.8,
      },
      content: this.generatePageContent(rawContent, analysis),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sourceIds: [sourceId],
    };

    pages.push(mainPage);

    // Generate concept pages if needed
    if (analysis.concepts && Array.isArray(analysis.concepts)) {
      for (const concept of analysis.concepts) {
        const conceptPage: WikiPage = {
          id: this.generateConceptId(concept),
          title: concept,
          path: `concepts/${this.generateConceptId(concept)}.md`,
          frontmatter: {
            title: concept,
            summary: `Concept page for ${concept}`,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            sources: [sourcePath],
            tags: ['concept'],
            categories: analysis.categories || [],
            related: analysis.related || [],
            confidence: analysis.confidence || 0.8,
          },
          content: this.generateConceptContent(concept, analysis),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          sourceIds: [sourceId],
        };
        pages.push(conceptPage);
      }
    }

    return pages;
  }

  /**
   * Merge new wiki page with existing one
   */
  private async mergeWikiPages(existing: WikiPage, newPage: WikiPage): Promise<WikiPage> {
    // Merge tags
    const mergedTags = [...new Set([...existing.frontmatter.tags, ...newPage.frontmatter.tags])];
    
    // Merge categories
    const mergedCategories = [...new Set([...existing.frontmatter.categories, ...newPage.frontmatter.categories])];
    
    // Merge related pages
    const mergedRelated = [...new Set([...existing.frontmatter.related, ...newPage.frontmatter.related])];
    
    // Merge sources
    const mergedSources = [...new Set([...existing.frontmatter.sources, ...newPage.frontmatter.sources])];
    
    // Merge source IDs
    const mergedSourceIds = [...new Set([...existing.sourceIds, ...newPage.sourceIds])];
    
    // Append new content to existing
    const mergedContent = existing.content + '\n\n---\n\n' + newPage.content;
    
    // Update confidence (take average)
    const mergedConfidence = (existing.frontmatter.confidence + newPage.frontmatter.confidence) / 2;

    return {
      ...existing,
      frontmatter: {
        ...existing.frontmatter,
        tags: mergedTags,
        categories: mergedCategories,
        related: mergedRelated,
        sources: mergedSources,
        confidence: mergedConfidence,
        updated: new Date().toISOString(),
      },
      content: mergedContent,
      updatedAt: new Date().toISOString(),
      sourceIds: mergedSourceIds,
    };
  }

  /**
   * Update the brain index
   */
  private async updateIndex(): Promise<void> {
    const pages = await this.storage.getAllWikiPages();
    
    let indexContent = '# Agents Brain Index\n\n';
    indexContent += `Last Updated: ${new Date().toISOString()}\n`;
    indexContent += `Total Pages: ${pages.length}\n\n`;
    indexContent += '## Pages\n\n';
    
    // Group by category
    const byCategory: Record<string, WikiPage[]> = {};
    
    for (const page of pages) {
      for (const category of page.frontmatter.categories) {
        if (!byCategory[category]) {
          byCategory[category] = [];
        }
        byCategory[category].push(page);
      }
    }
    
    // Generate index by category
    for (const [category, categoryPages] of Object.entries(byCategory)) {
      indexContent += `### ${category}\n\n`;
      
      for (const page of categoryPages) {
        indexContent += `- [[${page.id}]] - ${page.frontmatter.summary}\n`;
      }
      
      indexContent += '\n';
    }
    
    // Add uncategorized pages
    const uncategorized = pages.filter(p => p.frontmatter.categories.length === 0);
    if (uncategorized.length > 0) {
      indexContent += '### Uncategorized\n\n';
      for (const page of uncategorized) {
        indexContent += `- [[${page.id}]] - ${page.frontmatter.summary}\n`;
      }
    }
    
    await this.storage.writeIndex(indexContent);
  }

  /**
   * Generate source ID from path
   */
  private generateSourceId(sourcePath: string): string {
    return crypto.createHash('md5').update(sourcePath).digest('hex');
  }

  /**
   * Generate page ID from source path
   */
  private generatePageId(sourcePath: string): string {
    const basename = path.basename(sourcePath, path.extname(sourcePath));
    return basename.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  /**
   * Generate concept ID
   */
  private generateConceptId(concept: string): string {
    return concept.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  /**
   * Detect source type from file extension
   */
  private detectSourceType(filePath: string): SourceEntry['type'] {
    const ext = path.extname(filePath).toLowerCase();
    
    const typeMap: Record<string, SourceEntry['type']> = {
      '.pdf': 'pdf',
      '.md': 'markdown',
      '.json': 'json',
      '.txt': 'text',
      '.png': 'image',
      '.jpg': 'image',
      '.jpeg': 'image',
      '.gif': 'image',
    };
    
    return typeMap[ext] || 'document';
  }

  /**
   * Extract title from source path or analysis
   */
  private extractTitle(sourcePath: string, analysis: any): string {
    const basename = path.basename(sourcePath, path.extname(sourcePath));
    // Convert filename to title case
    return basename
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Generate page content from raw content and analysis
   */
  private generatePageContent(rawContent: string, analysis: any): string {
    let content = '';
    
    // Add summary
    content += `## Summary\n\n${analysis.summary || 'No summary available.'}\n\n`;
    
    // Add key concepts
    if (analysis.concepts && analysis.concepts.length > 0) {
      content += '## Key Concepts\n\n';
      for (const concept of analysis.concepts) {
        content += `- [[${this.generateConceptId(concept)}]]\n`;
      }
      content += '\n';
    }
    
    // Add categories
    if (analysis.categories && analysis.categories.length > 0) {
      content += '## Categories\n\n';
      for (const category of analysis.categories) {
        content += `- ${category}\n`;
      }
      content += '\n';
    }
    
    // Add structured content (truncated)
    content += '## Content\n\n';
    content += rawContent.substring(0, 5000);
    if (rawContent.length > 5000) {
      content += '\n\n... (content truncated for brevity)';
    }
    
    return content;
  }

  /**
   * Generate concept page content
   */
  private generateConceptContent(concept: string, analysis: any): string {
    let content = `# ${concept}\n\n`;
    content += `This page represents the concept: ${concept}\n\n`;
    content += '## Related Concepts\n\n';
    
    if (analysis.related && analysis.related.length > 0) {
      for (const related of analysis.related) {
        content += `- [[${this.generateConceptId(related)}]]\n`;
      }
    }
    
    return content;
  }
}
