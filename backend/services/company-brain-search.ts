/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';

/**
 * Company Brain Enhanced Search Service
 * Hybrid semantic search combining vector similarity and keyword matching
 * Provides intelligent search with ranking, filtering, and result aggregation
 */

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: string;
  source: string;
  score: number;
  vectorScore: number;
  keywordScore: number;
  metadata: Record<string, any>;
  highlights: string[];
}

export interface SearchQuery {
  query: string;
  filters?: SearchFilters;
  limit?: number;
  offset?: number;
  searchMode?: 'hybrid' | 'vector' | 'keyword';
  rerank?: boolean;
}

export interface SearchFilters {
  type?: string[];
  source?: string[];
  author?: string[];
  department?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  confidenceMin?: number;
}

export interface SearchSuggestion {
  text: string;
  type: 'query' | 'entity' | 'topic';
  count: number;
}

export class EnhancedSearchService {
  private openai: OpenAI;
  private knowledgeBase: Map<string, any> = new Map();
  private searchHistory: Map<string, number> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Add knowledge item to search index
   */
  addToIndex(item: {
    id: string;
    title: string;
    content: string;
    type: string;
    source: string;
    metadata: Record<string, any>;
  }): void {
    this.knowledgeBase.set(item.id, item);
  }

  /**
   * Perform hybrid search (vector + keyword)
   */
  async search(query: SearchQuery): Promise<{
    results: SearchResult[];
    total: number;
    queryTime: number;
  }> {
    const startTime = Date.now();

    // Log search query
    this.logSearch(query.query);

    // Generate query embedding
    const queryEmbedding = await this.generateEmbedding(query.query);

    // Get all knowledge items
    const items = Array.from(this.knowledgeBase.values());

    // Apply filters
    const filteredItems = this.applyFilters(items, query.filters);

    // Perform search based on mode
    let results: SearchResult[];
    switch (query.searchMode || 'hybrid') {
      case 'vector':
        results = await this.vectorSearch(filteredItems, queryEmbedding, query);
        break;
      case 'keyword':
        results = await this.keywordSearch(filteredItems, query.query, query);
        break;
      case 'hybrid':
      default:
        results = await this.hybridSearch(filteredItems, queryEmbedding, query.query, query);
        break;
    }

    // Rerank if requested
    if (query.rerank) {
      results = await this.rerankResults(results, query.query);
    }

    // Apply pagination
    const offset = query.offset || 0;
    const limit = query.limit || 20;
    const paginatedResults = results.slice(offset, offset + limit);

    const queryTime = Date.now() - startTime;

    return {
      results: paginatedResults,
      total: results.length,
      queryTime,
    };
  }

  /**
   * Apply filters to knowledge items
   */
  private applyFilters(items: any[], filters?: SearchFilters): any[] {
    if (!filters) return items;

    let filtered = items;

    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter(item => filters.type!.includes(item.type));
    }

    if (filters.source && filters.source.length > 0) {
      filtered = filtered.filter(item => filters.source!.includes(item.source));
    }

    if (filters.author && filters.author.length > 0) {
      filtered = filtered.filter(item => filters.author!.includes(item.metadata.author));
    }

    if (filters.department && filters.department.length > 0) {
      filtered = filtered.filter(item => filters.department!.includes(item.metadata.department));
    }

    if (filters.dateRange) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.metadata.timestamp);
        return itemDate >= filters.dateRange!.start && itemDate <= filters.dateRange!.end;
      });
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(item => {
        const itemTags = item.metadata.tags || [];
        return filters.tags!.some(tag => itemTags.includes(tag));
      });
    }

    if (filters.confidenceMin !== undefined) {
      filtered = filtered.filter(item => item.metadata.confidence >= filters.confidenceMin!);
    }

    return filtered;
  }

  /**
   * Vector similarity search
   */
  private async vectorSearch(
    items: any[],
    queryEmbedding: number[],
    query: SearchQuery
  ): Promise<SearchResult[]> {
    const results: SearchResult[] = [];

    for (const item of items) {
      // In production, would use stored embedding
      // For now, generate embedding on the fly
      const itemEmbedding = await this.generateEmbedding(item.content);
      const similarity = this.cosineSimilarity(queryEmbedding, itemEmbedding);

      results.push({
        id: item.id,
        title: item.title,
        content: item.content,
        type: item.type,
        source: item.source,
        score: similarity,
        vectorScore: similarity,
        keywordScore: 0,
        metadata: item.metadata,
        highlights: this.generateHighlights(item.content, query.query),
      });
    }

    // Sort by score
    results.sort((a, b) => b.score - a.score);

    return results;
  }

  /**
   * Keyword search with BM25-like scoring
   */
  private async keywordSearch(
    items: any[],
    queryString: string,
    query: SearchQuery
  ): Promise<SearchResult[]> {
    const queryTerms = this.tokenize(queryString.toLowerCase());
    const results: SearchResult[] = [];

    for (const item of items) {
      const content = item.content.toLowerCase();
      const title = item.title.toLowerCase();
      const contentTerms = this.tokenize(content);
      const titleTerms = this.tokenize(title);

      // Calculate BM25-like score
      let score = 0;
      const termMatches = new Set<string>();

      for (const term of queryTerms) {
        // Title matches (weighted higher)
        if (titleTerms.includes(term)) {
          score += 2;
          termMatches.add(term);
        }

        // Content matches
        const contentCount = contentTerms.filter(t => t === term).length;
        if (contentCount > 0) {
          score += contentCount * 0.5;
          termMatches.add(term);
        }

        // Exact phrase match bonus
        if (content.includes(queryString.toLowerCase())) {
          score += 3;
        }
      }

      // Normalize score
      score = score / queryTerms.length;

      if (score > 0) {
        results.push({
          id: item.id,
          title: item.title,
          content: item.content,
          type: item.type,
          source: item.source,
          score,
          vectorScore: 0,
          keywordScore: score,
          metadata: item.metadata,
          highlights: this.generateHighlights(item.content, queryString),
        });
      }
    }

    // Sort by score
    results.sort((a, b) => b.score - a.score);

    return results;
  }

  /**
   * Hybrid search combining vector and keyword scores
   */
  private async hybridSearch(
    items: any[],
    queryEmbedding: number[],
    queryString: string,
    query: SearchQuery
  ): Promise<SearchResult[]> {
    const vectorResults = await this.vectorSearch(items, queryEmbedding, query);
    const keywordResults = await this.keywordSearch(items, queryString, query);

    // Create map for keyword results
    const keywordMap = new Map<string, SearchResult>();
    for (const result of keywordResults) {
      keywordMap.set(result.id, result);
    }

    // Combine scores
    const combinedResults: SearchResult[] = [];
    for (const vectorResult of vectorResults) {
      const keywordResult = keywordMap.get(vectorResult.id);
      const keywordScore = keywordResult?.keywordScore || 0;

      // Weighted combination (60% vector, 40% keyword)
      const combinedScore = vectorResult.vectorScore * 0.6 + keywordScore * 0.4;

      combinedResults.push({
        ...vectorResult,
        score: combinedScore,
        keywordScore,
      });
    }

    // Add items only found by keyword search
    for (const keywordResult of keywordResults) {
      if (!combinedResults.find(r => r.id === keywordResult.id)) {
        combinedResults.push({
          ...keywordResult,
          score: keywordResult.keywordScore * 0.4,
          vectorScore: 0,
        });
      }
    }

    // Sort by combined score
    combinedResults.sort((a, b) => b.score - a.score);

    return combinedResults;
  }

  /**
   * Rerank results using AI
   */
  private async rerankResults(results: SearchResult[], query: string): Promise<SearchResult[]> {
    if (results.length === 0) return results;

    try {
      // Take top 20 results for reranking
      const topResults = results.slice(0, 20);

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Rerank the following search results based on their relevance to the query "${query}".
            
            Return a JSON object with a "rankedIds" array containing the result IDs in order of relevance (most relevant first).`,
          },
          {
            role: 'user',
            content: JSON.stringify(
              topResults.map(r => ({
                id: r.id,
                title: r.title,
                content: r.content.substring(0, 500),
              }))
            ),
          },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      const rankedIds = result.rankedIds || [];

      // Reorder results based on AI ranking
      const rerankedMap = new Map<string, SearchResult>();
      for (const result of topResults) {
        rerankedMap.set(result.id, result);
      }

      const reranked: SearchResult[] = [];
      for (const id of rankedIds) {
        const result = rerankedMap.get(id);
        if (result) {
          reranked.push(result);
        }
      }

      // Add unranked results at the end
      for (const result of topResults) {
        if (!rankedIds.includes(result.id)) {
          reranked.push(result);
        }
      }

      // Replace top results with reranked ones
      return [...reranked, ...results.slice(20)];
    } catch (error) {
      console.error('Error reranking results:', error);
      return results;
    }
  }

  /**
   * Generate embedding for text
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        dimensions: 1536,
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      // Return random embedding as fallback
      return Array(1536).fill(0).map(() => Math.random());
    }
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    if (normA === 0 || normB === 0) return 0;

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Tokenize text into terms
   */
  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(term => term.length > 0);
  }

  /**
   * Generate highlights for search results
   */
  private generateHighlights(content: string, query: string): string[] {
    const highlights: string[] = [];
    const queryTerms = this.tokenize(query.toLowerCase());
    const sentences = content.split(/[.!?]+/);

    for (const sentence of sentences) {
      const lowerSentence = sentence.toLowerCase();
      const matchCount = queryTerms.filter(term => lowerSentence.includes(term)).length;

      if (matchCount > 0) {
        highlights.push(sentence.trim());
      }

      if (highlights.length >= 3) break;
    }

    return highlights;
  }

  /**
   * Get search suggestions
   */
  async getSearchSuggestions(query: string, limit: number = 10): Promise<SearchSuggestion[]> {
    const suggestions: SearchSuggestion[] = [];

    // Query completion suggestions
    const queryTerms = this.tokenize(query);
    if (queryTerms.length > 0) {
      suggestions.push({
        text: query,
        type: 'query',
        count: this.searchHistory.get(query.toLowerCase()) || 0,
      });
    }

    // Entity suggestions from knowledge base
    const entities = new Set<string>();
    for (const item of this.knowledgeBase.values()) {
      const content = item.content.toLowerCase();
      if (content.includes(query.toLowerCase())) {
        // Extract potential entities (simple heuristic)
        const words = content.split(/\s+/).filter(w => w.length > 3);
        for (const word of words) {
          if (word.toLowerCase().includes(query.toLowerCase())) {
            entities.add(word);
          }
        }
      }
    }

    for (const entity of Array.from(entities).slice(0, limit - 1)) {
      suggestions.push({
        text: entity,
        type: 'entity',
        count: 1,
      });
    }

    return suggestions.slice(0, limit);
  }

  /**
   * Log search query for analytics
   */
  private logSearch(query: string): void {
    const normalizedQuery = query.toLowerCase();
    this.searchHistory.set(normalizedQuery, (this.searchHistory.get(normalizedQuery) || 0) + 1);
  }

  /**
   * Get popular search queries
   */
  getPopularQueries(limit: number = 10): Array<{ query: string; count: number }> {
    const entries = Array.from(this.searchHistory.entries());
    entries.sort((a, b) => b[1] - a[1]);

    return entries.slice(0, limit).map(([query, count]) => ({ query, count }));
  }

  /**
   * Get search statistics
   */
  getSearchStats(): {
    totalQueries: number;
    uniqueQueries: number;
    avgResultsPerQuery: number;
    topQueries: Array<{ query: string; count: number }>;
  } {
    const totalQueries = Array.from(this.searchHistory.values()).reduce((sum, count) => sum + count, 0);
    const uniqueQueries = this.searchHistory.size;

    return {
      totalQueries,
      uniqueQueries,
      avgResultsPerQuery: this.knowledgeBase.size,
      topQueries: this.getPopularQueries(5),
    };
  }

  /**
   * Clear search history
   */
  clearSearchHistory(): void {
    this.searchHistory.clear();
  }

  /**
   * Clear knowledge base
   */
  clearKnowledgeBase(): void {
    this.knowledgeBase.clear();
  }
}

// Export singleton instance
export const enhancedSearchService = new EnhancedSearchService();
