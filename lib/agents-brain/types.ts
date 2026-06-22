/**
 * Agents Brain System Types
 * Based on LLM Wiki and Obsidian Wiki patterns
 * Three-layer architecture: Raw Sources → Wiki → Schema
 */

export interface BrainManifest {
  version: string;
  lastUpdated: string;
  sources: SourceEntry[];
  statistics: BrainStatistics;
}

export interface SourceEntry {
  id: string;
  path: string;
  type: 'document' | 'pdf' | 'markdown' | 'json' | 'text' | 'image';
  size: number;
  lastModified: string;
  ingestedAt: string;
  checksum: string;
  wikiPages: string[]; // IDs of wiki pages generated from this source
  status: 'pending' | 'ingested' | 'failed' | 'outdated';
}

export interface BrainStatistics {
  totalSources: number;
  totalWikiPages: number;
  totalConcepts: number;
  totalRelationships: number;
  lastIngestTime: string;
  tokenSavings: number; // Estimated tokens saved by using brain vs raw files
}

export interface WikiPage {
  id: string;
  title: string;
  path: string; // Path within wiki directory
  frontmatter: WikiFrontmatter;
  content: string;
  createdAt: string;
  updatedAt: string;
  sourceIds: string[]; // Which raw sources this page came from
}

export interface WikiFrontmatter {
  title: string;
  summary: string;
  created: string;
  updated: string;
  sources: string[]; // Source file paths
  tags: string[];
  categories: string[];
  related: string[]; // Related wiki page IDs
  confidence: number; // 0-1, confidence in extracted information
}

export interface Concept {
  id: string;
  name: string;
  definition: string;
  wikiPageId: string;
  sourceIds: string[];
  relationships: Relationship[];
  attributes: Record<string, any>;
}

export interface Relationship {
  id: string;
  fromConceptId: string;
  toConceptId: string;
  type: 'relates-to' | 'part-of' | 'similar-to' | 'causes' | 'caused-by' | 'contains' | 'contained-in';
  strength: number; // 0-1
  sourceId: string;
}

export interface BrainIndex {
  pages: WikiPageIndex[];
  concepts: ConceptIndex[];
  categories: string[];
  tags: string[];
}

export interface WikiPageIndex {
  id: string;
  title: string;
  path: string;
  summary: string;
  tags: string[];
  categories: string[];
  lastUpdated: string;
}

export interface ConceptIndex {
  id: string;
  name: string;
  wikiPageId: string;
  relatedConcepts: string[];
}

export interface IngestResult {
  success: boolean;
  sourcesProcessed: number;
  pagesCreated: number;
  pagesUpdated: number;
  conceptsExtracted: number;
  relationshipsFound: number;
  errors: IngestError[];
  duration: number; // milliseconds
}

export interface IngestError {
  sourceId: string;
  sourcePath: string;
  error: string;
  timestamp: string;
}

export interface QueryResult {
  pages: WikiPage[];
  concepts: Concept[];
  relevanceScores: number[];
  totalTokensUsed: number;
  estimatedTokenSavings: number;
}

export interface BrainConfig {
  brainPath: string;
  rawSourcesPath: string;
  wikiPath: string;
  schemaPath: string;
  indexPath: string;
  manifestPath: string;
  logPath: string;
  maxContextWindow: number;
  embeddingModel?: string;
  enableSemanticSearch: boolean;
}

export interface BrainLogEntry {
  timestamp: string;
  operation: 'ingest' | 'query' | 'update' | 'delete' | 'lint';
  details: string;
  sources?: string[];
  pages?: string[];
  duration?: number;
  success: boolean;
}
