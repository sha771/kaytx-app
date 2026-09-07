import { db } from '../db/connection';
import { memoryRecords, knowledgeNodes } from '../db/drizzle-schema';
import { eq, and, desc, lte, isNull } from 'drizzle-orm';
import crypto from 'crypto';

export type MemoryType = 'working' | 'short_term' | 'long_term' | 'semantic' | 'episodic' | 'procedural' | 'organizational';

export interface MemoryInput {
  organizationId: string;
  userId: string;
  type: MemoryType;
  subtype?: string;
  content: string;
  summary?: string;
  importance?: number;
  context?: Record<string, any>;
  tags?: string[];
  metadata?: Record<string, any>;
  expiresAt?: Date;
}

export interface MemoryRecord {
  id: string;
  organizationId: string;
  userId: string;
  type: MemoryType;
  subtype: string | null;
  content: string;
  summary: string | null;
  importance: number;
  relevanceScore: number;
  context: Record<string, any>;
  tags: string[];
  metadata: Record<string, any>;
  expiresAt: Date | null;
  accessedAt: Date | null;
  accessCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CompanyBrainMemoryService {
  async store(memory: MemoryInput): Promise<MemoryRecord> {
    const id = crypto.randomUUID();
    const now = new Date();

    const expiresAt = memory.expiresAt || (
      memory.type === 'working' ? new Date(now.getTime() + 24 * 60 * 60 * 1000) :
      memory.type === 'short_term' ? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) :
      null
    );

    const record = {
      id,
      organizationId: memory.organizationId,
      userId: memory.userId,
      type: memory.type,
      subtype: memory.subtype || null,
      content: memory.content,
      summary: memory.summary || null,
      importance: String(memory.importance ?? 0),
      relevanceScore: '0.50',
      context: JSON.stringify(memory.context || {}),
      tags: JSON.stringify(memory.tags || []),
      metadata: JSON.stringify(memory.metadata || {}),
      expiresAt,
      accessedAt: now,
      accessCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await db.insert(memoryRecords).values(record);
    } catch (e) {
      // Mock fallback
    }

    return this.toMemoryRecord(record);
  }

  async recall(opts: {
    organizationId: string;
    userId: string;
    type?: MemoryType;
    query?: string;
    limit?: number;
    minImportance?: number;
  }): Promise<MemoryRecord[]> {
    try {
      const conditions: any[] = [
        eq(memoryRecords.organizationId, opts.organizationId),
        eq(memoryRecords.userId, opts.userId),
      ];
      if (opts.type) conditions.push(eq(memoryRecords.type, opts.type));

      let results = await db.select()
        .from(memoryRecords)
        .where(and(...conditions))
        .orderBy(desc(memoryRecords.importance))
        .limit(opts.limit || 20);

      return results.map(this.toMemoryRecord);
    } catch {
      return [];
    }
  }

  async consolidate(organizationId: string, userId: string): Promise<number> {
    const workingMemories = await this.recall({ organizationId, userId, type: 'working', limit: 1000 });
    let consolidated = 0;

    for (const mem of workingMemories) {
      if (mem.importance >= 0.5) {
        await this.store({
          organizationId,
          userId,
          type: 'short_term',
          subtype: mem.subtype || undefined,
          content: mem.content,
          summary: mem.summary || undefined,
          importance: mem.importance,
          tags: mem.tags,
          metadata: mem.metadata,
        });
        consolidated++;
      }
    }

    const shortTermMemories = await this.recall({ organizationId, userId, type: 'short_term', limit: 1000 });
    for (const mem of shortTermMemories) {
      if (mem.accessCount >= 5 && mem.importance >= 0.6) {
        await this.store({
          organizationId,
          userId,
          type: 'long_term',
          subtype: mem.subtype || undefined,
          content: mem.content,
          summary: mem.summary || undefined,
          importance: mem.importance,
          tags: mem.tags,
          metadata: mem.metadata,
        });
        consolidated++;
      }
    }

    return consolidated;
  }

  async forget(organizationId: string, userId: string, type?: MemoryType): Promise<number> {
    try {
      const conditions: any[] = [
        eq(memoryRecords.organizationId, organizationId),
        eq(memoryRecords.userId, userId),
        lte(memoryRecords.expiresAt, new Date()),
      ];
      if (type) conditions.push(eq(memoryRecords.type, type));

      const result = await db.delete(memoryRecords).where(and(...conditions));
      return 0;
    } catch {
      return 0;
    }
  }

  async getStats(organizationId: string, userId: string): Promise<Record<MemoryType, number>> {
    const stats: Record<string, number> = { working: 0, short_term: 0, long_term: 0, semantic: 0, episodic: 0, procedural: 0, organizational: 0 };
    try {
      const records = await db.select().from(memoryRecords)
        .where(and(eq(memoryRecords.organizationId, organizationId), eq(memoryRecords.userId, userId)));
      for (const r of records) {
        stats[r.type] = (stats[r.type] || 0) + 1;
      }
    } catch {}
    return stats as Record<MemoryType, number>;
  }

  private toMemoryRecord(r: any): MemoryRecord {
    return {
      id: r.id,
      organizationId: r.organizationId,
      userId: r.userId,
      type: r.type,
      subtype: r.subtype,
      content: r.content,
      summary: r.summary,
      importance: parseFloat(r.importance || '0'),
      relevanceScore: parseFloat(r.relevanceScore || '0.5'),
      context: typeof r.context === 'string' ? JSON.parse(r.context) : (r.context || {}),
      tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : (r.tags || []),
      metadata: typeof r.metadata === 'string' ? JSON.parse(r.metadata) : (r.metadata || {}),
      expiresAt: r.expiresAt,
      accessedAt: r.accessedAt,
      accessCount: r.accessCount || 0,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  }
}

export const companyBrainMemoryService = new CompanyBrainMemoryService();
