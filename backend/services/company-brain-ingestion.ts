import { db } from '../db/connection';
import { knowledgeNodes, knowledgeDocuments, knowledgeDocumentChunks, knowledgeIntegrationSyncs, knowledgeRelationships, knowledgePersons, knowledgeProjects, knowledgeClients } from '../db/drizzle-schema';
import { eq, and, desc } from 'drizzle-orm';
import { knowledgeExtractionService } from './company-brain-extraction';
import { knowledgeGraphService } from './company-brain-graph';
import { companyBrainWebSocketService } from './company-brain-websocket';
import { extractSkillsFromConversation, extractSkillsFromEmail, extractSkillsForDepartingEmployee } from './skill-brain-ingestion-hook';
import OpenAI from 'openai';
import crypto from 'crypto';

export interface IngestionConfig {
  organizationId: string;
  enabled: boolean;
  sources: Array<{
    type: string;
    enabled: boolean;
    config: any;
    lastSync?: Date;
  }>;
  realtime: boolean;
  batchSize: number;
  intervalMinutes: number;
  autoChunk: boolean;
  autoEmbed: boolean;
  autoLink: boolean;
}

export interface IngestionResult {
  success: boolean;
  itemsProcessed: number;
  itemsCreated: number;
  itemsUpdated: number;
  errors: number;
  duration: number;
  source: string;
  timestamp: Date;
}

export class CompanyBrainIngestionService {
  private ingestionConfigs: Map<string, IngestionConfig> = new Map();
  private activeIngestions: Map<string, boolean> = new Map();
  private ingestionHistory: IngestionResult[] = [];
  private _openai: OpenAI | null = null;

  private get openai(): OpenAI {
    if (!this._openai) {
      this._openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || undefined });
    }
    return this._openai;
  }

  configureIngestion(config: IngestionConfig): void {
    this.ingestionConfigs.set(config.organizationId, config);
  }

  async startIngestion(organizationId: string): Promise<void> {
    const config = this.ingestionConfigs.get(organizationId);
    if (!config || !config.enabled) throw new Error('Ingestion not configured or disabled');
    if (this.activeIngestions.get(organizationId)) return;

    this.activeIngestions.set(organizationId, true);

    if (config.realtime) {
      await this.startRealtimeIngestion(organizationId, config);
    } else {
      await this.startBatchIngestion(organizationId, config);
    }
  }

  stopIngestion(organizationId: string): void {
    this.activeIngestions.set(organizationId, false);
  }

  private async startRealtimeIngestion(organizationId: string, config: IngestionConfig): Promise<void> {
    for (const source of config.sources) {
      if (!source.enabled) continue;
      await this.setupRealtimeSource(organizationId, source);
    }
  }

  private async setupRealtimeSource(organizationId: string, source: any): Promise<void> {
    // In production, this would register webhooks with the respective platforms
    console.log(`Setting up realtime ingestion for ${source.type} in org ${organizationId}`);
  }

  private async startBatchIngestion(organizationId: string, config: IngestionConfig): Promise<void> {
    const intervalMs = config.intervalMinutes * 60 * 1000;
    const runOnce = async () => {
      if (!this.activeIngestions.get(organizationId)) return;
      for (const source of config.sources) {
        if (!source.enabled) continue;
        try {
          const result = await this.ingestFromSource(organizationId, source);
          this.ingestionHistory.push(result);
          companyBrainWebSocketService.broadcastAnalyticsUpdate({ type: 'ingestion_complete', source: source.type, result });
        } catch (error) {
          console.error(`Ingestion failed for ${source.type}:`, error);
        }
      }
    };

    await runOnce();
    setInterval(runOnce, intervalMs);
  }

  async ingestFromSource(organizationId: string, source: any): Promise<IngestionResult> {
    const startTime = Date.now();
    let itemsProcessed = 0;
    let itemsCreated = 0;
    let itemsUpdated = 0;
    let errors = 0;

    try {
      const syncId = crypto.randomUUID();
      await db.insert(knowledgeIntegrationSyncs).values({
        id: syncId,
        organizationId,
        integrationType: source.type,
        status: 'running',
        itemsProcessed: 0,
        itemsCreated: 0,
        itemsUpdated: 0,
        errors: 0,
        errorLog: JSON.stringify([]),
        startedAt: new Date(),
        metadata: JSON.stringify({}),
        createdAt: new Date(),
      });

      const type = source.type;
      if (type === 'webhook' || type === 'mcp') {
        itemsCreated = await this.ingestDocument(organizationId, source.config);
      } else {
        itemsCreated = await this.ingestKnowledge(organizationId, source.config);
      }

      itemsProcessed = itemsCreated;
      source.lastSync = new Date();

      await db.update(knowledgeIntegrationSyncs)
        .set({ status: 'completed', itemsProcessed, itemsCreated, itemsUpdated, completedAt: new Date() })
        .where(eq(knowledgeIntegrationSyncs.id, syncId));

      return {
        success: true,
        itemsProcessed,
        itemsCreated,
        itemsUpdated,
        errors,
        duration: Date.now() - startTime,
        source: type,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Ingestion error:', error);
      return {
        success: false,
        itemsProcessed,
        itemsCreated,
        itemsUpdated,
        errors: errors + 1,
        duration: Date.now() - startTime,
        source: source.type,
        timestamp: new Date(),
      };
    }
  }

  async ingestDocument(organizationId: string, doc: { title?: string; content: string; type?: string; sourceType?: string; sourceId?: string; authorId?: string; departmentId?: string; tags?: string[]; metadata?: Record<string, any> }): Promise<number> {
    const node = await knowledgeGraphService.addNode({
      organizationId,
      type: doc.type || 'document',
      label: doc.title || 'Untitled Document',
      content: doc.content,
      sourceType: doc.sourceType || 'manual',
      sourceId: doc.sourceId,
      tags: doc.tags || [],
      createdBy: doc.authorId,
      departmentId: doc.departmentId,
      properties: { ...doc.metadata, ingestedAt: new Date().toISOString() },
    });

    const docId = crypto.randomUUID();
    await db.insert(knowledgeDocuments).values({
      id: docId,
      organizationId,
      nodeId: node.id,
      fileName: doc.title || 'untitled.txt',
      fileType: doc.type || 'text',
      content: doc.content,
      processingStatus: 'completed',
      chunkCount: 0,
      metadata: JSON.stringify({}),
      createdBy: doc.authorId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (doc.content.length > 2000) {
      await this.chunkDocument(organizationId, docId, doc.content);
      await db.update(knowledgeDocuments).set({ processingStatus: 'completed' }).where(eq(knowledgeDocuments.id, docId));
    }

    return 1;
  }

  private async chunkDocument(organizationId: string, documentId: string, content: string): Promise<void> {
    const chunkSize = 1000;
    const overlap = 200;
    let chunks: Array<{ index: number; content: string }> = [];
    let start = 0;

    while (start < content.length) {
      const end = Math.min(start + chunkSize, content.length);
      chunks.push({ index: chunks.length, content: content.substring(start, end) });
      start = end - overlap;
      if (start + chunkSize >= content.length) break;
    }

    for (const chunk of chunks) {
      let embedding: number[] = [];
      try {
        const response = await this.openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: chunk.content.substring(0, 1000),
          dimensions: 1536,
        });
        embedding = response.data[0].embedding;
      } catch {}

      await db.insert(knowledgeDocumentChunks).values({
        id: crypto.randomUUID(),
        organizationId,
        documentId,
        chunkIndex: chunk.index,
        chunkContent: chunk.content,
        tokenCount: chunk.content.split(/\s+/).length,
        embeddingVector: embedding.length > 0 ? embedding : undefined,
        metadata: JSON.stringify({}),
        createdAt: new Date(),
      });
    }

    await db.update(knowledgeDocuments).set({ chunkCount: chunks.length }).where(eq(knowledgeDocuments.id, documentId));
  }

  private async ingestKnowledge(organizationId: string, config: any): Promise<number> {
    let count = 0;

    if (config.text) {
      await this.ingestDocument(organizationId, { title: config.title, content: config.text, sourceType: config.sourceType, authorId: config.authorId, tags: config.tags });
      count++;
    }

    if (config.person) {
      const personId = crypto.randomUUID();
      await db.insert(knowledgePersons).values({
        id: personId,
        organizationId,
        name: config.person.name,
        email: config.person.email,
        department: config.person.department,
        role: config.person.role,
        skills: JSON.stringify(config.person.skills || []),
        expertise: JSON.stringify(config.person.expertise || []),
        metadata: JSON.stringify({}),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      count++;
    }

    if (config.project) {
      const projectId = crypto.randomUUID();
      await db.insert(knowledgeProjects).values({
        id: projectId,
        organizationId,
        name: config.project.name,
        description: config.project.description,
        status: config.project.status || 'active',
        startDate: config.project.startDate ? new Date(config.project.startDate) : null,
        endDate: config.project.endDate ? new Date(config.project.endDate) : null,
        metadata: JSON.stringify({}),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      count++;
    }

    if (config.client) {
      const clientId = crypto.randomUUID();
      await db.insert(knowledgeClients).values({
        id: clientId,
        organizationId,
        name: config.client.name,
        industry: config.client.industry,
        contactEmail: config.client.contactEmail,
        contactPhone: config.client.contactPhone,
        metadata: JSON.stringify({}),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      count++;
    }

    return count;
  }

  async handleEmployeeDeparture(employeeId: string, employeeName: string, departureDate: Date): Promise<void> {
    companyBrainWebSocketService.broadcastRiskAlert({
      type: 'employee_departure',
      employeeId,
      employeeName,
      departureDate,
      message: `Employee departure detected. Initiating knowledge preservation workflow.`,
    });

    await extractSkillsForDepartingEmployee(employeeId, employeeName);
  }

  getIngestionStatus(organizationId: string): { active: boolean; config?: IngestionConfig; history: IngestionResult[] } {
    return {
      active: this.activeIngestions.get(organizationId) || false,
      config: this.ingestionConfigs.get(organizationId),
      history: this.ingestionHistory.filter(h => h.source !== 'unknown'),
    };
  }

  async getSyncHistory(organizationId: string, limit = 20): Promise<any[]> {
    try {
      return await db.select().from(knowledgeIntegrationSyncs)
        .where(eq(knowledgeIntegrationSyncs.organizationId, organizationId))
        .orderBy(desc(knowledgeIntegrationSyncs.startedAt))
        .limit(limit);
    } catch { return []; }
  }
}

export const companyBrainIngestionService = new CompanyBrainIngestionService();
