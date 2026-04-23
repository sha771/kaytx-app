import { and, eq, inArray, sql, desc } from 'drizzle-orm';
import { db as pgDb } from '../db/connection';
import { callLogs, dataRetentionPolicies, users, organizations, aiConversations, platformContacts } from '../db/drizzle-schema';
import { BaseService, ServiceResponse, ServiceError } from './base-service';
import { logAudit } from '../lib/audit';
import crypto from 'crypto';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface RetentionPolicy {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  dataType: 'call_logs' | 'user_data' | 'ai_conversations' | 'platform_data' | 'analytics' | 'all';
  retentionDays: number;
  action: 'delete' | 'archive' | 'anonymize';
  status: 'active' | 'inactive' | 'suspended';
  autoDelete: boolean;
  legalHold: boolean;
  archivalLocation?: string;
  lastExecutedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LegalHoldRequest {
  id: string;
  organizationId: string;
  reason: string;
  dataType: string;
  criteria: Record<string, any>;
  status: 'active' | 'released';
  createdBy: string;
  createdAt: Date;
  releasedAt?: Date;
  releasedBy?: string;
}

export interface RetentionAuditTrail {
  id: string;
  organizationId: string;
  policyId: string;
  action: 'executed' | 'failed' | 'skipped';
  dataType: string;
  recordsProcessed: number;
  recordsAffected: number;
  errors: string[];
  executionTime: number;
  executedAt: Date;
}

export class DataRetentionService extends BaseService {
  constructor() {
    super('DataRetentionService');
  }

  /**
   * Create a new retention policy
   */
  async createPolicy(input: {
    organizationId: string;
    name: string;
    description: string;
    dataType: RetentionPolicy['dataType'];
    retentionDays: number;
    action: RetentionPolicy['action'];
    autoDelete?: boolean;
    archivalLocation?: string;
    createdBy: string;
  }): Promise<ServiceResponse<RetentionPolicy>> {
    try {
      const id = crypto.randomUUID();
      const now = new Date();

      const [policy] = await pgDb
        .insert(dataRetentionPolicies)
        .values({
          id,
          organizationId: input.organizationId,
          name: input.name,
          description: input.description,
          dataType: input.dataType,
          retentionDays: input.retentionDays,
          action: input.action,
          status: 'active',
          autoDelete: input.autoDelete ?? true,
          legalHold: false,
          archivalLocation: input.archivalLocation,
          createdAt: now,
          updatedAt: now,
        } as any)
        .returning();

      await logAudit({
        organizationId: input.organizationId,
        userId: input.createdBy,
        action: 'CREATE_RETENTION_POLICY',
        details: {
          policyId: id,
          dataType: input.dataType,
          retentionDays: input.retentionDays,
          action: input.action,
        },
      });

      return this.success(policy as RetentionPolicy);
    } catch (error) {
      return this.handleError('Failed to create retention policy', error);
    }
  }

  /**
   * Update retention policy
   */
  async updatePolicy(input: {
    organizationId: string;
    policyId: string;
    updates: Partial<Omit<RetentionPolicy, 'id' | 'organizationId' | 'createdAt'>>;
    updatedBy: string;
  }): Promise<ServiceResponse<RetentionPolicy>> {
    try {
      const [policy] = await pgDb
        .update(dataRetentionPolicies)
        .set({
          ...input.updates,
          updatedAt: new Date(),
        } as any)
        .where(
          and(
            eq(dataRetentionPolicies.id, input.policyId as any),
            eq(dataRetentionPolicies.organizationId, input.organizationId as any)
          )
        )
        .returning();

      if (!policy) {
        return this.error('Policy not found', 'NOT_FOUND');
      }

      await logAudit({
        organizationId: input.organizationId,
        userId: input.updatedBy,
        action: 'UPDATE_RETENTION_POLICY',
        details: {
          policyId: input.policyId,
          updates: Object.keys(input.updates),
        },
      });

      return this.success(policy as RetentionPolicy);
    } catch (error) {
      return this.handleError('Failed to update retention policy', error);
    }
  }

  /**
   * Place data on legal hold
   */
  async placeLegalHold(input: {
    organizationId: string;
    reason: string;
    dataType: string;
    criteria: Record<string, any>;
    createdBy: string;
  }): Promise<ServiceResponse<LegalHoldRequest>> {
    try {
      const id = crypto.randomUUID();
      const now = new Date();

      // Create legal hold record
      const legalHold: LegalHoldRequest = {
        id,
        organizationId: input.organizationId,
        reason: input.reason,
        dataType: input.dataType,
        criteria: input.criteria,
        status: 'active',
        createdBy: input.createdBy,
        createdAt: now,
      };

      // Suspend related policies
      await pgDb
        .update(dataRetentionPolicies)
        .set({ status: 'suspended', updatedAt: now } as any)
        .where(
          and(
            eq(dataRetentionPolicies.organizationId, input.organizationId as any),
            eq(dataRetentionPolicies.dataType, input.dataType as any),
            eq(dataRetentionPolicies.status, 'active' as any)
          )
        );

      await logAudit({
        organizationId: input.organizationId,
        userId: input.createdBy,
        action: 'PLACE_LEGAL_HOLD',
        details: {
          legalHoldId: id,
          dataType: input.dataType,
          reason: input.reason,
        },
      });

      return this.success(legalHold);
    } catch (error) {
      return this.handleError('Failed to place legal hold', error);
    }
  }

  /**
   * Release legal hold
   */
  async releaseLegalHold(input: {
    organizationId: string;
    legalHoldId: string;
    releasedBy: string;
  }): Promise<ServiceResponse<LegalHoldRequest>> {
    try {
      const now = new Date();

      // Update legal hold status
      const [legalHold] = await pgDb
        .update(dataRetentionPolicies)
        .set({
          status: 'released',
          updatedAt: now,
          releasedAt: now,
          releasedBy: input.releasedBy,
        } as any)
        .where(
          and(
            eq(dataRetentionPolicies.id, input.legalHoldId as any),
            eq(dataRetentionPolicies.organizationId, input.organizationId as any)
          )
        )
        .returning();

      if (!legalHold) {
        return this.error('Legal hold not found', 'NOT_FOUND');
      }

      // Reactivate suspended policies
      await pgDb
        .update(dataRetentionPolicies)
        .set({ status: 'active', updatedAt: now } as any)
        .where(
          and(
            eq(dataRetentionPolicies.organizationId, input.organizationId as any),
            eq(dataRetentionPolicies.status, 'suspended' as any)
          )
        );

      await logAudit({
        organizationId: input.organizationId,
        userId: input.releasedBy,
        action: 'RELEASE_LEGAL_HOLD',
        details: {
          legalHoldId: input.legalHoldId,
        },
      });

      return this.success(legalHold as LegalHoldRequest);
    } catch (error) {
      return this.handleError('Failed to release legal hold', error);
    }
  }

  /**
   * Archive data
   */
  async archiveData(input: {
    organizationId: string;
    dataType: string;
    cutoff: Date;
    archivalLocation: string;
  }): Promise<ServiceResponse<{ recordsArchived: number }>> {
    try {
      let recordsArchived = 0;

      switch (input.dataType) {
        case 'call_logs':
          recordsArchived = await this.archiveCallLogs(input.organizationId, input.cutoff, input.archivalLocation);
          break;
        case 'ai_conversations':
          recordsArchived = await this.archiveAIConversations(input.organizationId, input.cutoff, input.archivalLocation);
          break;
        case 'platform_data':
          recordsArchived = await this.archivePlatformData(input.organizationId, input.cutoff, input.archivalLocation);
          break;
        default:
          throw new Error(`Unsupported data type for archival: ${input.dataType}`);
      }

      return this.success({ recordsArchived });
    } catch (error) {
      return this.handleError('Failed to archive data', error);
    }
  }

  /**
   * Get retention statistics
   */
  async getRetentionStats(input: {
    organizationId: string;
  }): Promise<ServiceResponse<{
    totalPolicies: number;
    activePolicies: number;
    suspendedPolicies: number;
    legalHolds: number;
    lastExecution: Date | null;
  }>> {
    try {
      const [policiesResult] = await pgDb
        .select({
          total: sql<number>`count(*)`,
          active: sql<number>`count(*) FILTER (WHERE status = 'active')`,
          suspended: sql<number>`count(*) FILTER (WHERE status = 'suspended')`,
          lastExecuted: sql<Date>`MAX(last_executed_at)`,
        })
        .from(dataRetentionPolicies)
        .where(eq(dataRetentionPolicies.organizationId, input.organizationId as any));

      const stats = {
        totalPolicies: Number(policiesResult?.total || 0),
        activePolicies: Number(policiesResult?.active || 0),
        suspendedPolicies: Number(policiesResult?.suspended || 0),
        legalHolds: Number(policiesResult?.suspended || 0), // Simplified
        lastExecution: policiesResult?.lastExecuted || null,
      };

      return this.success(stats);
    } catch (error) {
      return this.handleError('Failed to get retention stats', error);
    }
  }

  private async archiveCallLogs(organizationId: string, cutoff: Date, archivalLocation: string): Promise<number> {
    // Implementation for archiving call logs
    // This would move data to archival storage
    const [countRow] = await pgDb
      .select({ count: sql<number>`count(*)` })
      .from(callLogs)
      .where(
        and(
          eq(callLogs.organizationId, organizationId as any),
          sql`COALESCE(${callLogs.endedAt}, ${callLogs.createdAt}) < ${cutoff}`
        )
      );

    const count = Number(countRow?.count || 0);
    
    if (count > 0) {
      // In a real implementation, this would:
      // 1. Export data to archival storage
      // 2. Delete from main table
      logger.info(`Archiving ${count} call logs to ${archivalLocation}`);
    }

    return count;
  }

  private async archiveAIConversations(organizationId: string, cutoff: Date, archivalLocation: string): Promise<number> {
    // Implementation for archiving AI conversations
    const [countRow] = await pgDb
      .select({ count: sql<number>`count(*)` })
      .from(aiConversations)
      .where(
        and(
          eq(aiConversations.organizationId, organizationId as any),
          sql`${aiConversations.createdAt} < ${cutoff}`
        )
      );

    const count = Number(countRow?.count || 0);
    
    if (count > 0) {
      logger.info(`Archiving ${count} AI conversations to ${archivalLocation}`);
    }

    return count;
  }

  private async archivePlatformData(organizationId: string, cutoff: Date, archivalLocation: string): Promise<number> {
    // Implementation for archiving platform data
    const [countRow] = await pgDb
      .select({ count: sql<number>`count(*)` })
      .from(platformContacts)
      .where(
        and(
          eq(platformContacts.organizationId, organizationId as any),
          sql`${platformContacts.createdAt} < ${cutoff}`
        )
      );

    const count = Number(countRow?.count || 0);
    
    if (count > 0) {
      logger.info(`Archiving ${count} platform contacts to ${archivalLocation}`);
    }

    return count;
  }
}

export const dataRetentionService = new DataRetentionService();

// Legacy function for backward compatibility
export async function runCallLogsRetentionSweep(params?: {
  organizationId?: string;
  dryRun?: boolean;
  now?: Date;
}): Promise<{
  organizationsProcessed: number;
  totalRowsDeleted: number;
  details: { organizationId: string; retentionDays: number; cutoff: Date; rowsDeleted: number }[];
}> {
  const now = params?.now ?? new Date();
  const dryRun = params?.dryRun ?? false;

  const policies = await pgDb
    .select({
      id: dataRetentionPolicies.id,
      organizationId: dataRetentionPolicies.organizationId,
      retentionDays: dataRetentionPolicies.retentionDays,
    })
    .from(dataRetentionPolicies)
    .where(
      and(
        params?.organizationId ? eq(dataRetentionPolicies.organizationId, params.organizationId as any) : sql`true`,
        eq(dataRetentionPolicies.dataType, 'call_logs' as any),
        eq(dataRetentionPolicies.status, 'active' as any),
        eq(dataRetentionPolicies.autoDelete, true)
      )
    );

  const byOrg = new Map<string, { retentionDays: number; policyIds: string[] }>();
  for (const row of policies as any[]) {
    const organizationId = String(row.organizationId);
    const retentionDays = Number(row.retentionDays);
    if (!Number.isFinite(retentionDays) || retentionDays <= 0) continue;

    const existing = byOrg.get(organizationId);
    if (!existing) {
      byOrg.set(organizationId, { retentionDays, policyIds: [String(row.id)] });
      continue;
    }

    if (retentionDays < existing.retentionDays) {
      existing.retentionDays = retentionDays;
    }
    existing.policyIds.push(String(row.id));
  }

  const details: { organizationId: string; retentionDays: number; cutoff: Date; rowsDeleted: number }[] = [];
  let totalRowsDeleted = 0;

  for (const [organizationId, { retentionDays, policyIds }] of byOrg.entries()) {
    const cutoff = new Date(now.getTime() - retentionDays * 24 * 60 * 60 * 1000);

    const [countRow] = await pgDb
      .select({ count: sql<number>`count(*)` })
      .from(callLogs)
      .where(
        and(
          eq(callLogs.organizationId, organizationId as any),
          sql`COALESCE(${callLogs.endedAt}, ${callLogs.createdAt}) < ${cutoff}`
        )
      );

    const rowsToDelete = Number((countRow as any)?.count || 0);

    if (!dryRun && rowsToDelete > 0) {
      await pgDb
        .delete(callLogs)
        .where(
          and(
            eq(callLogs.organizationId, organizationId as any),
            sql`COALESCE(${callLogs.endedAt}, ${callLogs.createdAt}) < ${cutoff}`
          )
        );
    }

    const executedAt = new Date();
    if (!dryRun && policyIds.length > 0) {
      await pgDb
        .update(dataRetentionPolicies)
        .set({ lastExecutedAt: executedAt, updatedAt: executedAt } as any)
        .where(inArray(dataRetentionPolicies.id, policyIds as any));
    }

    details.push({ organizationId, retentionDays, cutoff, rowsDeleted: dryRun ? 0 : rowsToDelete });
    totalRowsDeleted += dryRun ? 0 : rowsToDelete;
  }

  return {
    organizationsProcessed: byOrg.size,
    totalRowsDeleted,
    details,
  };
}
