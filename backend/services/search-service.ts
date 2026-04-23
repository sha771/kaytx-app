import { EventEmitter } from 'events';
import crypto from 'crypto';

export interface SearchDocument {
  id: string;
  organizationId: string;
  type: string;
  title: string;
  content: string;
  metadata?: Record<string, any>;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchQuery {
  query: string;
  organizationId: string;
  type?: string;
  tags?: string[];
  filters?: Record<string, any>;
  limit?: number;
  offset?: number;
  sortBy?: 'relevance' | 'date' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  document: SearchDocument;
  score: number;
  highlights: { field: string; fragments: string[] }[];
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  took: number; // milliseconds
  suggestions?: string[];
}

export class SearchService extends EventEmitter {
  private documents: Map<string, SearchDocument> = new Map();
  private index: Map<string, Set<string>> = new Map(); // word -> document IDs

  async indexDocument(document: Omit<SearchDocument, 'id' | 'createdAt' | 'updatedAt'>): Promise<SearchDocument> {
    const id = crypto.randomUUID();
    const now = new Date();

    const fullDocument: SearchDocument = {
      id,
      ...document,
      createdAt: now,
      updatedAt: now,
    };

    // Store document
    this.documents.set(id, fullDocument);

    // Update inverted index
    this.updateIndex(fullDocument);

    this.emit('document:indexed', { document: fullDocument });
    return fullDocument;
  }

  async updateDocument(id: string, updates: Partial<SearchDocument>): Promise<SearchDocument | null> {
    const existing = this.documents.get(id);
    if (!existing) return null;

    const updated: SearchDocument = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };

    this.documents.set(id, updated);
    this.updateIndex(updated);

    this.emit('document:updated', { document: updated });
    return updated;
  }

  async deleteDocument(id: string): Promise<boolean> {
    const document = this.documents.get(id);
    if (!document) return false;

    this.documents.delete(id);
    this.removeFromIndex(document);

    this.emit('document:deleted', { id });
    return true;
  }

  async search(query: SearchQuery): Promise<SearchResponse> {
    const startTime = Date.now();

    // Parse and normalize query
    const terms = this.tokenizeQuery(query.query);
    const documentIds = this.findMatchingDocuments(terms, query);

    // Score and rank documents
    const scoredResults = await this.scoreDocuments(documentIds, terms, query);

    // Sort results
    const sortedResults = this.sortResults(scoredResults, query.sortBy, query.sortOrder);

    // Apply pagination
    const limit = query.limit || 10;
    const offset = query.offset || 0;
    const paginatedResults = sortedResults.slice(offset, offset + limit);

    // Generate highlights
    const resultsWithHighlights = await this.addHighlights(paginatedResults, terms);

    const took = Date.now() - startTime;

    // Generate suggestions if no results
    const suggestions = resultsWithHighlights.length === 0 ? this.generateSuggestions(terms) : undefined;

    this.emit('search:performed', { query, results: resultsWithHighlights, took });

    return {
      results: resultsWithHighlights,
      total: sortedResults.length,
      took,
      suggestions,
    };
  }

  async getDocument(id: string): Promise<SearchDocument | null> {
    return this.documents.get(id) || null;
  }

  async getDocumentsByType(organizationId: string, type: string): Promise<SearchDocument[]> {
    const documents: SearchDocument[] = [];
    
    for (const document of this.documents.values()) {
      if (document.organizationId === organizationId && document.type === type) {
        documents.push(document);
      }
    }

    return documents;
  }

  async getDocumentsByTags(organizationId: string, tags: string[]): Promise<SearchDocument[]> {
    const documents: SearchDocument[] = [];
    
    for (const document of this.documents.values()) {
      if (document.organizationId === organizationId && 
          tags.some(tag => document.tags.includes(tag))) {
        documents.push(document);
      }
    }

    return documents;
  }

  async getSuggestions(query: string, organizationId: string): Promise<string[]> {
    const terms = this.tokenizeQuery(query);
    return this.generateSuggestions(terms);
  }

  async reindexAll(): Promise<number> {
    const documents = Array.from(this.documents.values());
    this.index.clear();

    for (const document of documents) {
      this.updateIndex(document);
    }

    this.emit('index:rebuilt', { count: documents.length });
    return documents.length;
  }

  async getStats(organizationId?: string): Promise<{
    totalDocuments: number;
    documentsByType: Record<string, number>;
    totalTerms: number;
    averageDocumentLength: number;
  }> {
    let totalDocuments = 0;
    const documentsByType: Record<string, number> = {};
    let totalLength = 0;

    for (const document of this.documents.values()) {
      if (organizationId && document.organizationId !== organizationId) {
        continue;
      }

      totalDocuments++;
      documentsByType[document.type] = (documentsByType[document.type] || 0) + 1;
      totalLength += document.content.length + document.title.length;
    }

    return {
      totalDocuments,
      documentsByType,
      totalTerms: this.index.size,
      averageDocumentLength: totalDocuments > 0 ? totalLength / totalDocuments : 0,
    };
  }

  private tokenizeQuery(query: string): string[] {
    return query
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(term => term.length > 0);
  }

  private updateIndex(document: SearchDocument): void {
    const text = `${document.title} ${document.content}`.toLowerCase();
    const terms = text.replace(/[^\w\s]/g, ' ').split(/\s+/);

    for (const term of terms) {
      if (term.length === 0) continue;

      if (!this.index.has(term)) {
        this.index.set(term, new Set());
      }
      this.index.get(term)!.add(document.id);
    }
  }

  private removeFromIndex(document: SearchDocument): void {
    const text = `${document.title} ${document.content}`.toLowerCase();
    const terms = text.replace(/[^\w\s]/g, ' ').split(/\s+/);

    for (const term of terms) {
      if (term.length === 0) continue;

      const documentIds = this.index.get(term);
      if (documentIds) {
        documentIds.delete(document.id);
        if (documentIds.size === 0) {
          this.index.delete(term);
        }
      }
    }
  }

  private findMatchingDocuments(terms: string[], query: SearchQuery): Set<string> {
    const matchingDocs = new Set<string>();

    if (terms.length === 0) {
      // Return all documents for empty query
      for (const [id, doc] of this.documents.entries()) {
        if (doc.organizationId === query.organizationId) {
          matchingDocs.add(id);
        }
      }
      return matchingDocs;
    }

    for (const term of terms) {
      const documentIds = this.index.get(term);
      if (!documentIds) continue;

      for (const docId of documentIds) {
        const document = this.documents.get(docId);
        if (document && document.organizationId === query.organizationId) {
          // Apply filters
          if (query.type && document.type !== query.type) continue;
          if (query.tags && !query.tags.some(tag => document.tags.includes(tag))) continue;
          
          matchingDocs.add(docId);
        }
      }
    }

    return matchingDocs;
  }

  private async scoreDocuments(documentIds: Set<string>, terms: string[], query: SearchQuery): Promise<SearchResult[]> {
    const results: SearchResult[] = [];

    for (const docId of documentIds) {
      const document = this.documents.get(docId);
      if (!document) continue;

      let score = 0;
      const text = `${document.title} ${document.content}`.toLowerCase();

      // Calculate TF-IDF score (simplified)
      for (const term of terms) {
        const termFrequency = (text.match(new RegExp(term, 'g')) || []).length;
        const documentFrequency = this.index.get(term)?.size || 1;
        const inverseDocumentFrequency = Math.log(this.documents.size / documentFrequency);
        score += termFrequency * inverseDocumentFrequency;
      }

      // Boost for title matches
      for (const term of terms) {
        if (document.title.toLowerCase().includes(term)) {
          score *= 1.5;
        }
      }

      // Boost for exact phrase matches
      if (text.includes(query.query.toLowerCase())) {
        score *= 2;
      }

      results.push({
        document,
        score,
        highlights: [],
      });
    }

    return results;
  }

  private sortResults(results: SearchResult[], sortBy?: string, sortOrder: 'asc' | 'desc' = 'desc'): SearchResult[] {
    return results.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'date':
          comparison = a.document.updatedAt.getTime() - b.document.updatedAt.getTime();
          break;
        case 'title':
          comparison = a.document.title.localeCompare(b.document.title);
          break;
        case 'relevance':
        default:
          comparison = b.score - a.score;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  private async addHighlights(results: SearchResult[], terms: string[]): Promise<SearchResult[]> {
    for (const result of results) {
      const highlights: { field: string; fragments: string[] }[] = [];

      // Highlight title
      const titleFragments = this.generateFragments(result.document.title, terms, 1);
      if (titleFragments.length > 0) {
        highlights.push({ field: 'title', fragments: titleFragments });
      }

      // Highlight content
      const contentFragments = this.generateFragments(result.document.content, terms, 3);
      if (contentFragments.length > 0) {
        highlights.push({ field: 'content', fragments: contentFragments });
      }

      result.highlights = highlights;
    }

    return results;
  }

  private generateFragments(text: string, terms: string[], maxFragments: number): string[] {
    const fragments: string[] = [];
    const lowerText = text.toLowerCase();
    const fragmentSize = 150;

    for (const term of terms) {
      const regex = new RegExp(term, 'gi');
      let match;

      while ((match = regex.exec(lowerText)) !== null && fragments.length < maxFragments) {
        const start = Math.max(0, match.index - fragmentSize / 2);
        const end = Math.min(text.length, match.index + term.length + fragmentSize / 2);
        const fragment = text.slice(start, end);

        if (!fragments.includes(fragment)) {
          fragments.push(fragment);
        }
      }
    }

    return fragments;
  }

  private generateSuggestions(terms: string[]): string[] {
    const suggestions: string[] = [];
    const allTerms = Array.from(this.index.keys());

    for (const term of terms) {
      // Find similar terms using Levenshtein distance (simplified)
      for (const indexedTerm of allTerms) {
        if (this.areSimilar(term, indexedTerm) && !suggestions.includes(indexedTerm)) {
          suggestions.push(indexedTerm);
          if (suggestions.length >= 5) break;
        }
      }
    }

    return suggestions.slice(0, 5);
  }

  private areSimilar(term1: string, term2: string): boolean {
    if (Math.abs(term1.length - term2.length) > 2) return false;

    let differences = 0;
    const maxLength = Math.max(term1.length, term2.length);

    for (let i = 0; i < maxLength; i++) {
      if (term1[i] !== term2[i]) {
        differences++;
        if (differences > 2) return false;
      }
    }

    return true;
  }

  async exportIndex(organizationId?: string): Promise<{ documents: SearchDocument[]; index: Record<string, string[]> }> {
    const documents: SearchDocument[] = [];
    const index: Record<string, string[]> = {};

    for (const document of this.documents.values()) {
      if (organizationId && document.organizationId !== organizationId) {
        continue;
      }
      documents.push(document);
    }

    for (const [term, docIds] of this.index.entries()) {
      const filteredIds = Array.from(docIds).filter(id => {
        const doc = this.documents.get(id);
        return doc && (!organizationId || doc.organizationId === organizationId);
      });

      if (filteredIds.length > 0) {
        index[term] = filteredIds;
      }
    }

    return { documents, index };
  }

  async importIndex(data: { documents: SearchDocument[]; index: Record<string, string[]> }): Promise<void> {
    this.documents.clear();
    this.index.clear();

    for (const document of data.documents) {
      this.documents.set(document.id, document);
    }

    for (const [term, docIds] of Object.entries(data.index)) {
      this.index.set(term, new Set(docIds));
    }

    this.emit('index:imported', { documentCount: data.documents.length, termCount: Object.keys(data.index).length });
  }
}

export const searchService = new SearchService();
