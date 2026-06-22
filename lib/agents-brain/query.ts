/**
 * Agents Brain Query System
 * Allows AI agents to query the structured brain instead of raw files
 * Saves tokens by reading structured wiki pages instead of raw documents
 */

import { BrainStorage } from './storage';
import { WikiPage, QueryResult, Concept } from './types';

export class BrainQuery {
  private storage: BrainStorage;

  constructor(storage?: BrainStorage) {
    this.storage = storage || new BrainStorage();
  }

  /**
   * Query the brain for relevant information
   * Returns structured wiki pages instead of raw files
   */
  async query(query: string, options?: QueryOptions): Promise<QueryResult> {
    const startTime = Date.now();
    const pages: WikiPage[] = [];
    const concepts: Concept[] = [];
    const relevanceScores: number[] = [];

    try {
      // Get all wiki pages
      const allPages = await this.storage.getAllWikiPages();

      // Search for relevant pages
      for (const page of allPages) {
        const relevance = this.calculateRelevance(query, page);
        
        if (relevance > (options?.minRelevance || 0.3)) {
          pages.push(page);
          relevanceScores.push(relevance);
        }
      }

      // Sort by relevance
      const sorted = pages
        .map((page, i) => ({ page, score: relevanceScores[i] }))
        .sort((a, b) => b.score - a.score);

      // Limit results
      const limit = options?.limit || 10;
      const limited = sorted.slice(0, limit);

      const resultPages = limited.map(item => item.page);
      const resultScores = limited.map(item => item.score);

      // Extract concepts from pages
      for (const page of resultPages) {
        for (const tag of page.frontmatter.tags) {
          concepts.push({
            id: this.generateConceptId(tag),
            name: tag,
            definition: '',
            wikiPageId: page.id,
            sourceIds: page.sourceIds,
            relationships: [],
            attributes: {},
          });
        }
      }

      // Calculate token usage
      const totalTokensUsed = this.calculateTokenUsage(resultPages);
      const estimatedTokenSavings = await this.estimateTokenSavings(resultPages);

      // Log the query
      await this.storage.writeLog({
        timestamp: new Date().toISOString(),
        operation: 'query',
        details: `Query: "${query}", returned ${resultPages.length} pages`,
        pages: resultPages.map(p => p.id),
        duration: Date.now() - startTime,
        success: true,
      });

      return {
        pages: resultPages,
        concepts,
        relevanceScores: resultScores,
        totalTokensUsed,
        estimatedTokenSavings,
      };

    } catch (error) {
      console.error('Error querying brain:', error);
      throw error;
    }
  }

  /**
   * Search by tag
   */
  async searchByTag(tag: string): Promise<WikiPage[]> {
    const allPages = await this.storage.getAllWikiPages();
    return allPages.filter(page => 
      page.frontmatter.tags.includes(tag)
    );
  }

  /**
   * Search by category
   */
  async searchByCategory(category: string): Promise<WikiPage[]> {
    const allPages = await this.storage.getAllWikiPages();
    return allPages.filter(page => 
      page.frontmatter.categories.includes(category)
    );
  }

  /**
   * Get related pages
   */
  async getRelatedPages(pageId: string): Promise<WikiPage[]> {
    const page = await this.storage.readWikiPage(pageId);
    if (!page) return [];

    const related: WikiPage[] = [];
    
    for (const relatedId of page.frontmatter.related) {
      const relatedPage = await this.storage.readWikiPage(relatedId);
      if (relatedPage) {
        related.push(relatedPage);
      }
    }

    return related;
  }

  /**
   * Get page by ID
   */
  async getPage(pageId: string): Promise<WikiPage | null> {
    return await this.storage.readWikiPage(pageId);
  }

  /**
   * Get all pages
   */
  async getAllPages(): Promise<WikiPage[]> {
    return await this.storage.getAllWikiPages();
  }

  /**
   * Get brain statistics
   */
  async getStatistics(): Promise<any> {
    const manifest = await this.storage.readManifest();
    const pages = await this.storage.getAllWikiPages();
    
    return {
      ...manifest.statistics,
      totalPages: pages.length,
      categories: this.getUniqueCategories(pages),
      tags: this.getUniqueTags(pages),
    };
  }

  /**
   * Calculate relevance score for a page
   */
  private calculateRelevance(query: string, page: WikiPage): number {
    const queryLower = query.toLowerCase();
    let score = 0;

    // Check title
    if (page.frontmatter.title.toLowerCase().includes(queryLower)) {
      score += 0.5;
    }

    // Check summary
    if (page.frontmatter.summary.toLowerCase().includes(queryLower)) {
      score += 0.3;
    }

    // Check tags
    for (const tag of page.frontmatter.tags) {
      if (tag.toLowerCase().includes(queryLower)) {
        score += 0.2;
      }
    }

    // Check categories
    for (const category of page.frontmatter.categories) {
      if (category.toLowerCase().includes(queryLower)) {
        score += 0.15;
      }
    }

    // Check content
    if (page.content.toLowerCase().includes(queryLower)) {
      score += 0.1;
    }

    // Boost by confidence
    score *= page.frontmatter.confidence;

    return Math.min(score, 1.0);
  }

  /**
   * Calculate token usage for pages
   */
  private calculateTokenUsage(pages: WikiPage[]): number {
    // Rough estimate: ~4 characters per token
    const totalChars = pages.reduce((acc, page) => acc + page.content.length, 0);
    return Math.ceil(totalChars / 4);
  }

  /**
   * Estimate token savings compared to reading raw files
   */
  private async estimateTokenSavings(pages: WikiPage[]): Promise<number> {
    const manifest = await this.storage.readManifest();
    
    // Get unique source IDs from pages
    const sourceIds = new Set<string>();
    for (const page of pages) {
      for (const sourceId of page.sourceIds) {
        sourceIds.add(sourceId);
      }
    }

    // Calculate raw file sizes
    let rawSize = 0;
    for (const sourceId of sourceIds) {
      const source = manifest.sources.find(s => s.id === sourceId);
      if (source) {
        rawSize += source.size;
      }
    }

    // Calculate wiki page sizes
    const wikiSize = pages.reduce((acc, page) => acc + page.content.length, 0);

    // Estimate token savings (rough estimate)
    const rawTokens = Math.ceil(rawSize / 4);
    const wikiTokens = Math.ceil(wikiSize / 4);

    return Math.max(0, rawTokens - wikiTokens);
  }

  /**
   * Get unique categories from pages
   */
  private getUniqueCategories(pages: WikiPage[]): string[] {
    const categories = new Set<string>();
    for (const page of pages) {
      for (const category of page.frontmatter.categories) {
        categories.add(category);
      }
    }
    return Array.from(categories);
  }

  /**
   * Get unique tags from pages
   */
  private getUniqueTags(pages: WikiPage[]): string[] {
    const tags = new Set<string>();
    for (const page of pages) {
      for (const tag of page.frontmatter.tags) {
        tags.add(tag);
      }
    }
    return Array.from(tags);
  }

  /**
   * Generate concept ID
   */
  private generateConceptId(concept: string): string {
    return concept.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
}

export interface QueryOptions {
  limit?: number;
  minRelevance?: number;
  includeRelated?: boolean;
}
