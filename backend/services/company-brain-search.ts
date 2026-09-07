import { db } from '../db/connection';
import { knowledgeNodes, knowledgeRelationships, knowledgeDocumentChunks, knowledgeSearchQueries } from '../db/drizzle-schema';
import { eq, and, or, desc, like, count, sql } from 'drizzle-orm';
import OpenAI from 'openai';
import crypto from 'crypto';

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: string;
  source: string;
  score: number;
  vectorScore: number;
  keywordScore: number;
  graphScore: number;
  metadata: Record<string, any>;
  highlights: string[];
  citations: Array<{ source: string; excerpt: string; relevance: number }>;
}

export interface SearchQuery {
  query: string;
  filters?: SearchFilters;
  limit?: number;
  offset?: number;
  searchMode?: 'hybrid' | 'vector' | 'keyword' | 'graphrag';
  rerank?: boolean;
  organizationId: string;
}

export interface SearchFilters {
  type?: string[];
  source?: string[];
  author?: string[];
  department?: string[];
  dateRange?: { start: Date; end: Date };
  tags?: string[];
  confidenceMin?: number;
}

export class EnhancedSearchService {
  private openai: OpenAI;
  private searchHistory: Map<string, { count: number; lastSearched: Date }> = new Map();

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async search(query: SearchQuery): Promise<{ results: SearchResult[]; total: number; queryTime: number }> {
    const startTime = Date.now();
    this.logSearch(query.query, query.organizationId);

    const items = await this.fetchKnowledgeItems(query.organizationId);
    const filteredItems = this.applyFilters(items, query.filters);
    let results: SearchResult[] = [];

    switch (query.searchMode || 'hybrid') {
      case 'vector': results = await this.vectorSearch(filteredItems, query); break;
      case 'keyword': results = await this.keywordSearch(filteredItems, query); break;
      case 'graphrag': results = await this.graphRAGSearch(filteredItems, query); break;
      case 'hybrid': default: results = await this.hybridSearch(filteredItems, query); break;
    }

    if (query.rerank) results = await this.rerankResults(results, query.query);

    const offset = query.offset || 0;
    const limit = query.limit || 20;
    return {
      results: results.slice(offset, offset + limit),
      total: results.length,
      queryTime: Date.now() - startTime,
    };
  }

  private async fetchKnowledgeItems(organizationId: string): Promise<any[]> {
    try {
      const nodes = await db.select().from(knowledgeNodes)
        .where(eq(knowledgeNodes.organizationId, organizationId))
        .limit(1000);

      const chunks = await db.select().from(knowledgeDocumentChunks)
        .where(eq(knowledgeDocumentChunks.organizationId, organizationId))
        .limit(1000);

      const items = nodes.map(n => ({
        id: n.id,
        title: n.label,
        content: n.content || n.summary || n.label,
        type: n.type,
        source: n.sourceType || 'knowledge_base',
        metadata: {
          author: n.createdBy,
          department: n.departmentId,
          tags: typeof n.tags === 'string' ? JSON.parse(n.tags) : (n.tags || []),
          confidence: parseFloat(n.confidenceScore || '0.5'),
          timestamp: n.createdAt,
          status: n.status,
          embedding: n.embeddingVector,
        },
      }));

      for (const chunk of chunks) {
        items.push({
          id: chunk.id,
          title: `Document Chunk ${chunk.chunkIndex}`,
          content: chunk.chunkContent,
          type: 'document_chunk',
          source: 'document',
          metadata: {
            documentId: chunk.documentId,
            chunkIndex: chunk.chunkIndex,
            tags: [],
            confidence: 0.7,
            timestamp: chunk.createdAt,
            embedding: chunk.embeddingVector,
          },
        });
      }

      return items;
    } catch { return []; }
  }

  private applyFilters(items: any[], filters?: SearchFilters): any[] {
    if (!filters) return items;
    return items.filter(item => {
      if (filters.type && filters.type.length > 0 && !filters.type.includes(item.type)) return false;
      if (filters.department && filters.department.length > 0 && !filters.department.includes(item.metadata.department)) return false;
      if (filters.confidenceMin !== undefined && (item.metadata.confidence || 0) < filters.confidenceMin) return false;
      if (filters.tags && filters.tags.length > 0) {
        const itemTags = item.metadata.tags || [];
        if (!filters.tags.some((t: string) => itemTags.includes(t))) return false;
      }
      return true;
    });
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        dimensions: 1536,
      });
      return response.data[0].embedding;
    } catch { return Array(1536).fill(0).map(() => Math.random()); }
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (!a || !b || a.length !== b.length) return 0;
    let dot = 0, nA = 0, nB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      nA += a[i] * a[i];
      nB += b[i] * b[i];
    }
    if (nA === 0 || nB === 0) return 0;
    return dot / (Math.sqrt(nA) * Math.sqrt(nB));
  }

  private async vectorSearch(items: any[], query: SearchQuery): Promise<SearchResult[]> {
    const queryEmb = await this.generateEmbedding(query.query);
    const results: SearchResult[] = [];

    for (const item of items) {
      let similarity = 0;
      if (item.metadata.embedding) {
        const emb = typeof item.metadata.embedding === 'string' ? JSON.parse(item.metadata.embedding) : item.metadata.embedding;
        similarity = this.cosineSimilarity(queryEmb, emb);
      } else {
        const itemEmb = await this.generateEmbedding(item.content.substring(0, 1000));
        similarity = this.cosineSimilarity(queryEmb, itemEmb);
      }

      results.push(this.makeResult(item, similarity, similarity, 0, 0, query.query));
    }

    results.sort((a, b) => b.score - a.score);
    return results;
  }

  private async keywordSearch(items: any[], query: SearchQuery): Promise<SearchResult[]> {
    const queryTerms = query.query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    const results: SearchResult[] = [];

    for (const item of items) {
      let score = 0;
      const content = item.content.toLowerCase();
      const title = item.title.toLowerCase();

      for (const term of queryTerms) {
        if (title.includes(term)) score += 3;
        const contentMatches = (content.match(new RegExp(term, 'g')) || []).length;
        score += contentMatches * 0.5;
        if (content.includes(query.query.toLowerCase())) score += 3;
      }

      score = queryTerms.length > 0 ? score / queryTerms.length : 0;
      if (score > 0) {
        results.push(this.makeResult(item, score, 0, score, 0, query.query));
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results;
  }

  private async graphRAGSearch(items: any[], query: SearchQuery): Promise<SearchResult[]> {
    const vectorResults = await this.vectorSearch(items, query);
    const topItems = vectorResults.slice(0, 20);

    try {
      const relatedIds = new Set<string>();
      const orgId = query.organizationId;
      for (const r of topItems.slice(0, 10)) {
        const edges = await db.select().from(knowledgeRelationships)
          .where(and(
            eq(knowledgeRelationships.organizationId, orgId),
            or(eq(knowledgeRelationships.sourceNodeId, r.id), eq(knowledgeRelationships.targetNodeId, r.id)),
          )).limit(20);

        for (const e of edges) {
          if (e.sourceNodeId !== r.id) relatedIds.add(e.sourceNodeId);
          if (e.targetNodeId !== r.id) relatedIds.add(e.targetNodeId);
        }
      }

      console.log(`GraphRAG: Found ${relatedIds.size} related nodes`);

      return vectorResults.map((r, i) => {
        const graphBoost = relatedIds.has(r.id) ? 0.2 : 0;
        return { ...r, score: r.score + graphBoost, graphScore: graphBoost };
      }).sort((a, b) => b.score - a.score);

    } catch {
      return vectorResults;
    }
  }

  private async hybridSearch(items: any[], query: SearchQuery): Promise<SearchResult[]> {
    const vectorResults = await this.vectorSearch(items, query);
    const keywordResults = await this.keywordSearch(items, query);
    const keywordMap = new Map(keywordResults.map(r => [r.id, r]));

    const combined = vectorResults.map(vr => {
      const kr = keywordMap.get(vr.id);
      const kwScore = kr?.keywordScore || 0;
      return {
        ...vr,
        score: vr.vectorScore * 0.6 + kwScore * 0.4,
        keywordScore: kwScore,
      };
    });

    for (const kr of keywordResults) {
      if (!combined.find(c => c.id === kr.id)) {
        combined.push({ ...kr, score: kr.keywordScore * 0.4, vectorScore: 0 });
      }
    }

    combined.sort((a, b) => b.score - a.score);
    return combined;
  }

  private async rerankResults(results: SearchResult[], query: string): Promise<SearchResult[]> {
    if (results.length === 0) return results;
    try {
      const topResults = results.slice(0, 20);
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: `Rerank these search results for relevance to "${query}". Return JSON: { rankedIds: string[] }` },
          { role: 'user', content: JSON.stringify(topResults.map(r => ({ id: r.id, title: r.title, content: r.content.substring(0, 300) }))) },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      const rankedIds: string[] = result.rankedIds || [];
      const rerankedMap = new Map(topResults.map(r => [r.id, r]));
      const reranked: SearchResult[] = [];

      for (const id of rankedIds) {
        const r = rerankedMap.get(id);
        if (r) { reranked.push(r); rerankedMap.delete(id); }
      }
      for (const r of rerankedMap.values()) reranked.push(r);

      return [...reranked, ...results.slice(20)];
    } catch { return results; }
  }

  private makeResult(item: any, score: number, vScore: number, kScore: number, gScore: number, query: string): SearchResult {
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      type: item.type,
      source: item.source,
      score,
      vectorScore: vScore,
      keywordScore: kScore,
      graphScore: gScore,
      metadata: item.metadata,
      highlights: this.generateHighlights(item.content, query),
      citations: [],
    };
  }

  private generateHighlights(content: string, query: string): string[] {
    const highlights: string[] = [];
    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    const sentences = content.split(/[.!?]+/);

    for (const sentence of sentences) {
      const lower = sentence.toLowerCase();
      if (terms.some(t => lower.includes(t))) {
        highlights.push(sentence.trim());
        if (highlights.length >= 3) break;
      }
    }

    return highlights;
  }

  private logSearch(query: string, organizationId: string): void {
    const key = query.toLowerCase();
    const existing = this.searchHistory.get(key) || { count: 0, lastSearched: new Date() };
    existing.count++;
    existing.lastSearched = new Date();
    this.searchHistory.set(key, existing);

    try {
      db.insert(knowledgeSearchQueries).values({
        id: crypto.randomUUID(),
        organizationId,
        query: query.substring(0, 500),
        queryType: 'hybrid',
        resultCount: 0,
        successful: true,
        filters: JSON.stringify({}),
        metadata: JSON.stringify({}),
        createdAt: new Date(),
      }).catch(() => {});
    } catch {}
  }

  getPopularQueries(limit = 10): Array<{ query: string; count: number }> {
    return Array.from(this.searchHistory.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, limit)
      .map(([query, data]) => ({ query, count: data.count }));
  }

  getSearchStats(): { totalQueries: number; uniqueQueries: number; avgResultsPerQuery: number; topQueries: Array<{ query: string; count: number }> } {
    const totalQueries = Array.from(this.searchHistory.values()).reduce((sum, d) => sum + d.count, 0);
    return {
      totalQueries,
      uniqueQueries: this.searchHistory.size,
      avgResultsPerQuery: 20,
      topQueries: this.getPopularQueries(5),
    };
  }

  async getSearchSuggestions(query: string, organizationId: string, limit = 10): Promise<Array<{ text: string; type: string; count: number }>> {
    try {
      const recent = await db.select()
        .from(knowledgeSearchQueries)
        .where(and(eq(knowledgeSearchQueries.organizationId, organizationId), like(knowledgeSearchQueries.query, `%${query}%`)))
        .orderBy(desc(knowledgeSearchQueries.createdAt))
        .limit(limit);

      const seen = new Set<string>();
      const suggestions: Array<{ text: string; type: string; count: number }> = [];

      for (const r of recent) {
        if (!seen.has(r.query)) {
          seen.add(r.query);
          suggestions.push({ text: r.query, type: 'query', count: 1 });
        }
      }

      return suggestions;
    } catch { return []; }
  }
}

export const enhancedSearchService = new EnhancedSearchService();
