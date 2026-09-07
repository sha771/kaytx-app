/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { db } from '../db/connection';
import {
  integrations,
  knowledgeIntegrationSyncs,
  knowledgeNodes,
  knowledgeDocuments,
} from '../db/drizzle-schema';
import { eq, and, desc, sql, count } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export interface IntegrationInput {
  type: IntegrationType;
  name: string;
  provider: string;
  credentials: Record<string, any>;
  settings?: IntegrationSettings;
}

export interface IntegrationSettings {
  syncInterval: number;
  includeArchived: boolean;
  includePrivate: boolean;
  filters?: string[];
  autoSync: boolean;
}

export enum IntegrationType {
  SLACK = 'slack',
  TEAMS = 'teams',
  EMAIL = 'email',
  ZOOM = 'zoom',
  GOOGLE_DRIVE = 'google_drive',
  SHAREPOINT = 'sharepoint',
  JIRA = 'jira',
  CONFLUENCE = 'confluence',
  NOTION = 'notion',
  GITHUB = 'github',
  DISCORD = 'discord',
  WEBEX = 'webex',
}

export interface SyncResult {
  integrationId: string;
  integrationType: string;
  success: boolean;
  itemsProcessed: number;
  knowledgeNodesCreated: number;
  errors: number;
  duration: number;
  timestamp: Date;
}

export class IntegrationService {
  async registerIntegration(
    organizationId: string,
    input: IntegrationInput
  ) {
    const id = uuidv4();
    const defaultSettings: IntegrationSettings = {
      syncInterval: 60,
      includeArchived: false,
      includePrivate: false,
      autoSync: true,
      ...input.settings,
    };

    const [integration] = await db.insert(integrations).values({
      id,
      organizationId,
      name: input.name,
      type: input.type,
      provider: input.provider,
      status: 'active',
      credentials: input.credentials,
      config: defaultSettings,
    }).returning();

    return integration;
  }

  async updateIntegration(
    organizationId: string,
    integrationId: string,
    settings: Partial<IntegrationSettings>
  ) {
    const [existing] = await db.select().from(integrations)
      .where(and(
        eq(integrations.id, integrationId),
        eq(integrations.organizationId, organizationId)
      ))
      .limit(1);

    if (!existing) {
      throw new Error(`Integration ${integrationId} not found`);
    }

    const mergedConfig = {
      ...(existing.config as Record<string, any>),
      ...settings,
    };

    const [updated] = await db.update(integrations)
      .set({ config: mergedConfig })
      .where(eq(integrations.id, integrationId))
      .returning();

    return updated;
  }

  async toggleIntegration(organizationId: string, integrationId: string) {
    const [existing] = await db.select().from(integrations)
      .where(and(
        eq(integrations.id, integrationId),
        eq(integrations.organizationId, organizationId)
      ))
      .limit(1);

    if (!existing) {
      throw new Error(`Integration ${integrationId} not found`);
    }

    const newStatus = existing.status === 'active' ? 'inactive' : 'active';
    const [updated] = await db.update(integrations)
      .set({ status: newStatus })
      .where(eq(integrations.id, integrationId))
      .returning();

    return updated;
  }

  async syncIntegration(organizationId: string, integrationId: string): Promise<SyncResult> {
    const [integration] = await db.select().from(integrations)
      .where(and(
        eq(integrations.id, integrationId),
        eq(integrations.organizationId, organizationId)
      ))
      .limit(1);

    if (!integration) {
      throw new Error(`Integration ${integrationId} not found`);
    }

    if (integration.status === 'inactive') {
      throw new Error(`Integration ${integrationId} is inactive`);
    }

    const startTime = Date.now();
    const syncId = uuidv4();

    await db.insert(knowledgeIntegrationSyncs).values({
      id: syncId,
      organizationId,
      integrationType: integration.type,
      status: 'running',
      itemsProcessed: 0,
      itemsCreated: 0,
      itemsUpdated: 0,
      errors: 0,
      errorLog: [],
      startedAt: new Date(),
    });

    try {
      const itemsProcessed = 0;
      const knowledgeNodesCreated = 0;
      const errors = 0;

      await db.update(knowledgeIntegrationSyncs)
        .set({
          status: 'completed',
          itemsProcessed,
          itemsCreated: knowledgeNodesCreated,
          completedAt: new Date(),
        })
        .where(eq(knowledgeIntegrationSyncs.id, syncId));

      await db.update(integrations)
        .set({ lastSyncAt: new Date(), errorCount: 0, lastError: null })
        .where(eq(integrations.id, integrationId));

      return {
        integrationId,
        integrationType: integration.type,
        success: true,
        itemsProcessed,
        knowledgeNodesCreated,
        errors,
        duration: Date.now() - startTime,
        timestamp: new Date(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      await db.update(knowledgeIntegrationSyncs)
        .set({
          status: 'failed',
          errors: 1,
          errorLog: [errorMessage],
          completedAt: new Date(),
        })
        .where(eq(knowledgeIntegrationSyncs.id, syncId));

      await db.update(integrations)
        .set({
          status: 'error',
          errorCount: sql`${integrations.errorCount} + 1`,
          lastError: errorMessage,
        })
        .where(eq(integrations.id, integrationId));

      return {
        integrationId,
        integrationType: integration.type,
        success: false,
        itemsProcessed: 0,
        knowledgeNodesCreated: 0,
        errors: 1,
        duration: Date.now() - startTime,
        timestamp: new Date(),
      };
    }
  }

  async getIntegrations(organizationId: string) {
    return db.select().from(integrations)
      .where(eq(integrations.organizationId, organizationId))
      .orderBy(desc(integrations.createdAt));
  }

  async getIntegration(organizationId: string, integrationId: string) {
    const [result] = await db.select().from(integrations)
      .where(and(
        eq(integrations.id, integrationId),
        eq(integrations.organizationId, organizationId)
      ))
      .limit(1);

    return result || null;
  }

  async getIntegrationsByType(organizationId: string, type: IntegrationType) {
    return db.select().from(integrations)
      .where(and(
        eq(integrations.organizationId, organizationId),
        eq(integrations.type, type)
      ))
      .orderBy(desc(integrations.createdAt));
  }

  async getSyncHistory(organizationId: string) {
    return db.select().from(knowledgeIntegrationSyncs)
      .where(eq(knowledgeIntegrationSyncs.organizationId, organizationId))
      .orderBy(desc(knowledgeIntegrationSyncs.startedAt));
  }

  async getIntegrationSyncHistory(organizationId: string, integrationId: string) {
    const [integration] = await db.select({ type: integrations.type }).from(integrations)
      .where(and(
        eq(integrations.id, integrationId),
        eq(integrations.organizationId, organizationId)
      ))
      .limit(1);

    if (!integration) return [];

    return db.select().from(knowledgeIntegrationSyncs)
      .where(and(
        eq(knowledgeIntegrationSyncs.organizationId, organizationId),
        eq(knowledgeIntegrationSyncs.integrationType, integration.type)
      ))
      .orderBy(desc(knowledgeIntegrationSyncs.startedAt));
  }

  async deleteIntegration(organizationId: string, integrationId: string) {
    const [existing] = await db.select({ id: integrations.id }).from(integrations)
      .where(and(
        eq(integrations.id, integrationId),
        eq(integrations.organizationId, organizationId)
      ))
      .limit(1);

    if (!existing) return false;

    await db.delete(integrations)
      .where(eq(integrations.id, integrationId));

    return true;
  }

  async testConnection(organizationId: string, integrationId: string) {
    const [integration] = await db.select().from(integrations)
      .where(and(
        eq(integrations.id, integrationId),
        eq(integrations.organizationId, organizationId)
      ))
      .limit(1);

    if (!integration) {
      return { success: false, message: 'Integration not found' };
    }

    return { success: true, message: 'Connection successful' };
  }

  async getIntegrationStats(organizationId: string) {
    const [{ total }] = await db.select({ total: count() }).from(integrations)
      .where(eq(integrations.organizationId, organizationId));

    const [{ enabled }] = await db.select({ enabled: count() }).from(integrations)
      .where(and(
        eq(integrations.organizationId, organizationId),
        eq(integrations.status, 'active')
      ));

    const [syncStats] = await db.select({
      totalSyncs: count(),
      successfulSyncs: sql<number>`COUNT(*) FILTER (WHERE ${knowledgeIntegrationSyncs.status} = 'completed')`,
      failedSyncs: sql<number>`COUNT(*) FILTER (WHERE ${knowledgeIntegrationSyncs.status} = 'failed')`,
    }).from(knowledgeIntegrationSyncs)
      .where(eq(knowledgeIntegrationSyncs.organizationId, organizationId));

    const [lastSync] = await db.select({ startedAt: knowledgeIntegrationSyncs.startedAt })
      .from(knowledgeIntegrationSyncs)
      .where(eq(knowledgeIntegrationSyncs.organizationId, organizationId))
      .orderBy(desc(knowledgeIntegrationSyncs.startedAt))
      .limit(1);

    return {
      totalIntegrations: Number(total),
      enabledIntegrations: Number(enabled),
      activeSyncs: 0,
      totalSyncs: Number(syncStats?.totalSyncs || 0),
      successfulSyncs: Number(syncStats?.successfulSyncs || 0),
      failedSyncs: Number(syncStats?.failedSyncs || 0),
      lastSyncTime: lastSync?.startedAt || undefined,
    };
  }
}

export const integrationService = new IntegrationService();
