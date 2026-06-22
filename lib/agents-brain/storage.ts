/**
 * Agents Brain Storage System
 * Handles file system operations for the brain
 */

import { BrainManifest, WikiPage, BrainLogEntry, SourceEntry } from './types';
import { DEFAULT_BRAIN_CONFIG } from './config';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export class BrainStorage {
  private config = DEFAULT_BRAIN_CONFIG;

  constructor(config?: Partial<typeof DEFAULT_BRAIN_CONFIG>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  /**
   * Initialize brain directory structure
   */
  async initializeBrain(): Promise<void> {
    const directories = [
      this.config.brainPath,
      this.config.rawSourcesPath,
      this.config.wikiPath,
      this.config.schemaPath,
    ];

    for (const dir of directories) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }

    // Initialize manifest if it doesn't exist
    if (!fs.existsSync(this.config.manifestPath)) {
      const initialManifest: BrainManifest = {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        sources: [],
        statistics: {
          totalSources: 0,
          totalWikiPages: 0,
          totalConcepts: 0,
          totalRelationships: 0,
          lastIngestTime: '',
          tokenSavings: 0,
        },
      };
      await this.writeManifest(initialManifest);
    }

    // Initialize log if it doesn't exist
    if (!fs.existsSync(this.config.logPath)) {
      await this.writeLog({
        timestamp: new Date().toISOString(),
        operation: 'ingest',
        details: 'Brain system initialized',
        success: true,
      });
    }

    // Initialize index if it doesn't exist
    if (!fs.existsSync(this.config.indexPath)) {
      await this.writeIndex('# Agents Brain Index\n\nThis file serves as the catalog for all wiki pages in the brain.\n\n## Pages\n\nNo pages ingested yet.\n');
    }
  }

  /**
   * Read manifest
   */
  async readManifest(): Promise<BrainManifest> {
    try {
      const content = fs.readFileSync(this.config.manifestPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error('Error reading manifest:', error);
      throw error;
    }
  }

  /**
   * Write manifest
   */
  async writeManifest(manifest: BrainManifest): Promise<void> {
    try {
      manifest.lastUpdated = new Date().toISOString();
      fs.writeFileSync(this.config.manifestPath, JSON.stringify(manifest, null, 2));
    } catch (error) {
      console.error('Error writing manifest:', error);
      throw error;
    }
  }

  /**
   * Add source to manifest
   */
  async addSourceToManifest(source: SourceEntry): Promise<void> {
    const manifest = await this.readManifest();
    const existingIndex = manifest.sources.findIndex(s => s.id === source.id);
    
    if (existingIndex >= 0) {
      manifest.sources[existingIndex] = source;
    } else {
      manifest.sources.push(source);
      manifest.statistics.totalSources++;
    }
    
    await this.writeManifest(manifest);
  }

  /**
   * Update source status in manifest
   */
  async updateSourceStatus(sourceId: string, status: SourceEntry['status']): Promise<void> {
    const manifest = await this.readManifest();
    const source = manifest.sources.find(s => s.id === sourceId);
    
    if (source) {
      source.status = status;
      await this.writeManifest(manifest);
    }
  }

  /**
   * Read wiki page
   */
  async readWikiPage(pageId: string): Promise<WikiPage | null> {
    try {
      const pagePath = path.join(this.config.wikiPath, `${pageId}.md`);
      if (!fs.existsSync(pagePath)) {
        return null;
      }

      const content = fs.readFileSync(pagePath, 'utf-8');
      return this.parseWikiPage(content, pageId);
    } catch (error) {
      console.error('Error reading wiki page:', error);
      return null;
    }
  }

  /**
   * Write wiki page
   */
  async writeWikiPage(page: WikiPage): Promise<void> {
    try {
      const pagePath = path.join(this.config.wikiPath, `${page.id}.md`);
      const content = this.serializeWikiPage(page);
      fs.writeFileSync(pagePath, content);
    } catch (error) {
      console.error('Error writing wiki page:', error);
      throw error;
    }
  }

  /**
   * Parse wiki page from markdown
   */
  private parseWikiPage(content: string, pageId: string): WikiPage {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
    
    let frontmatter: any = {};
    let bodyContent = content;

    if (frontmatterMatch) {
      try {
        frontmatter = YAML.parse(frontmatterMatch[1]);
        bodyContent = content.replace(frontmatterMatch[0], '');
      } catch (error) {
        console.error('Error parsing frontmatter:', error);
      }
    }

    return {
      id: pageId,
      title: frontmatter.title || 'Untitled',
      path: `${pageId}.md`,
      frontmatter: {
        title: frontmatter.title || 'Untitled',
        summary: frontmatter.summary || '',
        created: frontmatter.created || new Date().toISOString(),
        updated: frontmatter.updated || new Date().toISOString(),
        sources: frontmatter.sources || [],
        tags: frontmatter.tags || [],
        categories: frontmatter.categories || [],
        related: frontmatter.related || [],
        confidence: frontmatter.confidence || 1.0,
      },
      content: bodyContent,
      createdAt: frontmatter.created || new Date().toISOString(),
      updatedAt: frontmatter.updated || new Date().toISOString(),
      sourceIds: frontmatter.sources || [],
    };
  }

  /**
   * Serialize wiki page to markdown
   */
  private serializeWikiPage(page: WikiPage): string {
    const frontmatter = {
      title: page.frontmatter.title,
      summary: page.frontmatter.summary,
      created: page.frontmatter.created,
      updated: new Date().toISOString(),
      sources: page.frontmatter.sources,
      tags: page.frontmatter.tags,
      categories: page.frontmatter.categories,
      related: page.frontmatter.related,
      confidence: page.frontmatter.confidence,
    };

    const frontmatterYaml = `---
${Object.entries(frontmatter)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}: ${JSON.stringify(value)}`;
    }
    return `${key}: ${value}`;
  })
  .join('\n')}
---
`;

    return frontmatterYaml + page.content;
  }

  /**
   * Read index
   */
  async readIndex(): Promise<string> {
    try {
      return fs.readFileSync(this.config.indexPath, 'utf-8');
    } catch (error) {
      console.error('Error reading index:', error);
      throw error;
    }
  }

  /**
   * Write index
   */
  async writeIndex(content: string): Promise<void> {
    try {
      fs.writeFileSync(this.config.indexPath, content);
    } catch (error) {
      console.error('Error writing index:', error);
      throw error;
    }
  }

  /**
   * Append to log
   */
  async writeLog(entry: BrainLogEntry): Promise<void> {
    try {
      const logLine = `## ${entry.timestamp} - ${entry.operation}\n` +
        `- Success: ${entry.success}\n` +
        `- Details: ${entry.details}\n` +
        (entry.sources ? `- Sources: ${entry.sources.join(', ')}\n` : '') +
        (entry.pages ? `- Pages: ${entry.pages.join(', ')}\n` : '') +
        (entry.duration ? `- Duration: ${entry.duration}ms\n` : '') +
        '\n';
      
      fs.appendFileSync(this.config.logPath, logLine);
    } catch (error) {
      console.error('Error writing log:', error);
      throw error;
    }
  }

  /**
   * Calculate file checksum
   */
  async calculateChecksum(filePath: string): Promise<string> {
    try {
      const content = fs.readFileSync(filePath);
      return crypto.createHash('sha256').update(content).digest('hex');
    } catch (error) {
      console.error('Error calculating checksum:', error);
      throw error;
    }
  }

  /**
   * Get all wiki pages
   */
  async getAllWikiPages(): Promise<WikiPage[]> {
    try {
      const files = fs.readdirSync(this.config.wikiPath);
      const pages: WikiPage[] = [];

      for (const file of files) {
        if (file.endsWith('.md')) {
          const pageId = file.replace('.md', '');
          const page = await this.readWikiPage(pageId);
          if (page) {
            pages.push(page);
          }
        }
      }

      return pages;
    } catch (error) {
      console.error('Error getting all wiki pages:', error);
      return [];
    }
  }

  /**
   * Get all raw sources
   */
  async getAllRawSources(): Promise<string[]> {
    try {
      const files = this.getAllFiles(this.config.rawSourcesPath);
      return files.filter(file => 
        !file.includes('.git') && 
        !file.includes('node_modules')
      );
    } catch (error) {
      console.error('Error getting raw sources:', error);
      return [];
    }
  }

  /**
   * Recursively get all files in directory
   */
  private getAllFiles(dirPath: string): string[] {
    const files: string[] = [];
    
    try {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          files.push(...this.getAllFiles(fullPath));
        } else {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.error('Error reading directory:', error);
    }
    
    return files;
  }

  /**
   * Read raw source file
   */
  async readRawSource(filePath: string): Promise<string> {
    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      console.error('Error reading raw source:', error);
      throw error;
    }
  }

  /**
   * Write raw source file
   */
  async writeRawSource(filePath: string, content: string): Promise<void> {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, content);
    } catch (error) {
      console.error('Error writing raw source:', error);
      throw error;
    }
  }
}

// Simple YAML parser for frontmatter
class YAML {
  static parse(str: string): any {
    const result: any = {};
    const lines = str.split('\n');
    
    for (const line of lines) {
      const match = line.match(/^(\w+):\s*(.*)$/);
      if (match) {
        const [, key, value] = match;
        try {
          result[key] = JSON.parse(value);
        } catch {
          result[key] = value;
        }
      }
    }
    
    return result;
  }
}
