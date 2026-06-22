/**
 * Agents Brain System
 * Main entry point for the brain system
 * Ties together storage, ingestion, and query systems
 * 
 * Based on LLM Wiki and Obsidian Wiki patterns:
 * - Three-layer architecture: Raw Sources → Wiki → Schema
 * - Three core operations: Ingest, Query, Lint
 * - Token savings by reading structured wiki instead of raw files
 * 
 * Supports per-agent brains: each agent gets their own isolated brain
 */

import { BrainStorage } from './storage';
import { BrainIngestion } from './ingestion';
import { BrainQuery } from './query';
import { BrainLLMClient } from './llm-client';
import { BrainConfig, IngestResult, QueryResult, BrainStatistics } from './types';
import { DEFAULT_BRAIN_CONFIG, getAgentBrainConfig } from './config';

export class BrainSystem {
  private storage: BrainStorage;
  private ingestion: BrainIngestion;
  private brainQuery: BrainQuery;
  private config: BrainConfig;
  private agentId?: string;
  private llmClient?: BrainLLMClient;

  constructor(config?: Partial<BrainConfig>, agentId?: string, llmClient?: BrainLLMClient) {
    // If agentId is provided, use agent-specific config
    this.config = agentId 
      ? getAgentBrainConfig(agentId)
      : { ...DEFAULT_BRAIN_CONFIG, ...config };
    
    this.agentId = agentId;
    this.llmClient = llmClient;
    this.storage = new BrainStorage(this.config);
    this.ingestion = new BrainIngestion(this.storage, this.llmClient);
    this.brainQuery = new BrainQuery(this.storage);
  }

  /**
   * Get the agent ID for this brain instance
   */
  getAgentId(): string | undefined {
    return this.agentId;
  }

  /**
   * Initialize the brain system
   * Creates directory structure and initializes manifest
   */
  async initialize(): Promise<void> {
    await this.storage.initializeBrain();
    console.log('Agents Brain System initialized');
  }

  /**
   * Ingest raw sources into the brain
   * Scans raw data once and creates structured wiki pages
   */
  async ingest(sourcePaths?: string[]): Promise<IngestResult> {
    console.log('Starting brain ingestion...');
    const result = await this.ingestion.ingestSources(sourcePaths);
    console.log('Ingestion complete:', result);
    return result;
  }

  /**
   * Query the brain for relevant information
   * Returns structured wiki pages instead of raw files
   */
  async query(query: string, options?: any): Promise<QueryResult> {
    console.log(`Querying brain: "${query}"`);
    const result = await this.brainQuery.query(query, options);
    console.log(`Query returned ${result.pages.length} pages`);
    return result;
  }

  /**
   * Search brain by tag
   */
  async searchByTag(tag: string) {
    return await this.brainQuery.searchByTag(tag);
  }

  /**
   * Search brain by category
   */
  async searchByCategory(category: string) {
    return await this.brainQuery.searchByCategory(category);
  }

  /**
   * Get related pages
   */
  async getRelatedPages(pageId: string) {
    return await this.brainQuery.getRelatedPages(pageId);
  }

  /**
   * Get page by ID
   */
  async getPage(pageId: string) {
    return await this.brainQuery.getPage(pageId);
  }

  /**
   * Get all pages
   */
  async getAllPages() {
    return await this.brainQuery.getAllPages();
  }

  /**
   * Get brain statistics
   */
  async getStatistics(): Promise<BrainStatistics> {
    return await this.brainQuery.getStatistics();
  }

  /**
   * Get brain manifest
   */
  async getManifest() {
    return await this.storage.readManifest();
  }

  /**
   * Get brain index
   */
  async getIndex() {
    return await this.storage.readIndex();
  }

  /**
   * Get brain log
   */
  async getLog() {
    const logPath = this.config.logPath;
    const fs = require('fs');
    try {
      return fs.readFileSync(logPath, 'utf-8');
    } catch (error) {
      console.error('Error reading log:', error);
      return '';
    }
  }

  /**
   * Add raw source file to brain
   */
  async addRawSource(filePath: string, content: string): Promise<void> {
    const fullPath = `${this.config.rawSourcesPath}/${filePath}`;
    await this.storage.writeRawSource(fullPath, content);
    console.log(`Added raw source: ${filePath}`);
  }

  /**
   * Get all raw sources
   */
  async getRawSources() {
    return await this.storage.getAllRawSources();
  }

  /**
   * Re-ingest specific source
   */
  async reingestSource(sourcePath: string): Promise<IngestResult> {
    console.log(`Re-ingesting source: ${sourcePath}`);
    return await this.ingestion.ingestSources([sourcePath]);
  }

  /**
   * Update brain index
   */
  async updateIndex(): Promise<void> {
    // This is called automatically during ingestion
    console.log('Updating brain index...');
    // The actual update is handled in the ingestion system
  }

  /**
   * Get token savings estimate
   */
  async getTokenSavings(): Promise<number> {
    const stats = await this.getStatistics();
    return stats.tokenSavings || 0;
  }

  /**
   * Reset brain (clear all data)
   * WARNING: This will delete all brain data
   */
  async reset(): Promise<void> {
    const fs = require('fs');
    const path = require('path');
    
    console.log('Resetting brain system...');
    
    // Delete brain directory
    if (fs.existsSync(this.config.brainPath)) {
      fs.rmSync(this.config.brainPath, { recursive: true, force: true });
    }
    
    // Reinitialize
    await this.initialize();
    
    console.log('Brain system reset complete');
  }

  /**
   * Export brain data
   */
  async export(): Promise<any> {
    const manifest = await this.getManifest();
    const pages = await this.getAllPages();
    const index = await this.getIndex();
    const log = await this.getLog();
    
    return {
      manifest,
      pages,
      index,
      log,
      exportedAt: new Date().toISOString(),
    };
  }

  /**
   * Import brain data
   */
  async import(data: any): Promise<void> {
    console.log('Importing brain data...');
    
    // Import manifest
    if (data.manifest) {
      await this.storage.writeManifest(data.manifest);
    }
    
    // Import pages
    if (data.pages && Array.isArray(data.pages)) {
      for (const page of data.pages) {
        await this.storage.writeWikiPage(page);
      }
    }
    
    // Import index
    if (data.index) {
      await this.storage.writeIndex(data.index);
    }
    
    console.log('Brain data import complete');
  }

  /**
   * Get brain health status
   */
  async getHealthStatus(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    issues: string[];
    statistics: BrainStatistics;
  }> {
    const issues: string[] = [];
    const stats = await this.getStatistics();
    
    // Check if brain is initialized
    try {
      await this.getManifest();
    } catch (error) {
      issues.push('Brain manifest not found or corrupted');
    }
    
    // Check if there are any pages
    if (stats.totalWikiPages === 0) {
      issues.push('No wiki pages found');
    }
    
    // Determine health status
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    if (issues.length === 0) {
      status = 'healthy';
    } else if (issues.length <= 2) {
      status = 'degraded';
    } else {
      status = 'unhealthy';
    }
    
    return {
      status,
      issues,
      statistics: stats,
    };
  }
}

// Export all types and classes
export * from './types';
export * from './config';
export * from './storage';
export * from './ingestion';
export * from './query';

// Default export
export default BrainSystem;
