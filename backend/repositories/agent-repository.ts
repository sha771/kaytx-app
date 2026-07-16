/**
 * Agent Repository
 * Data access layer for AI Agent entities with department/category filtering
 */

import { eq, and, or, desc, asc, ilike, sql, inArray } from 'drizzle-orm';
import { BaseRepository, SoftDeleteRepository, paginate, type PaginatedResult, type PaginationOptions } from '../lib/repository';
import { db as pgDb } from '../db/connection';
import { aiAgents, agentDepartments } from '../db/drizzle-schema';
import { z } from 'zod';

export type AgentStatus = 'active' | 'inactive' | 'draft' | 'archived';

export type AgentCreateInput = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  department: string;
  category?: string | null;
  capabilities?: string[] | null;
  status?: AgentStatus;
  config?: Record<string, unknown> | null;
  organizationId: string;
  createdBy: string;
};

export type AgentUpdateInput = Partial<{
  name: string;
  description: string;
  capabilities: string[];
  status: AgentStatus;
  config: Record<string, unknown>;
  metadata: Record<string, unknown>;
}>;

export type AgentSearchOptions = {
  search?: string;
  department?: string;
  category?: string;
  status?: AgentStatus;
  organizationId?: string;
  capabilities?: string[];
  createdAfter?: Date;
  createdBefore?: Date;
  sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'department';
  sortOrder?: 'asc' | 'desc';
} & PaginationOptions;

export class AgentRepository extends SoftDeleteRepository<any, AgentCreateInput, AgentUpdateInput> {
  constructor() {
    super(aiAgents);
  }

  /** Find a single agent by its slug */
  async findBySlug(slug: string, organizationId?: string): Promise<any | null> {
    const conditions = [eq(aiAgents.slug, slug)];
    if (organizationId) conditions.push(eq(aiAgents.organizationId, organizationId));

    const [result] = await pgDb
      .select()
      .from(aiAgents)
      .where(and(...conditions))
      .limit(1);
    return result || null;
  }

  /** Find all agents in a department */
  async findByDepartment(department: string, organizationId?: string): Promise<any[]> {
    const conditions = [eq(aiAgents.department, department)];
    if (organizationId) conditions.push(eq(aiAgents.organizationId, organizationId));

    return pgDb
      .select()
      .from(aiAgents)
      .where(and(...conditions))
      .orderBy(asc(aiAgents.name));
  }

  /** Find agents by capability */
  async findByCapability(capability: string, organizationId?: string): Promise<any[]> {
    const conditions = [sql`${aiAgents.capabilities} @> ${JSON.stringify([capability])}::jsonb`];
    if (organizationId) conditions.push(eq(aiAgents.organizationId, organizationId));

    return pgDb
      .select()
      .from(aiAgents)
      .where(and(...conditions));
  }

  /** Search agents with pagination and filtering */
  async search(options: AgentSearchOptions): Promise<PaginatedResult<any>> {
    const conditions = [];

    if (options.search) {
      conditions.push(
        or(
          ilike(aiAgents.name, `%${options.search}%`),
          ilike(aiAgents.description, `%${options.search}%`)
        )
      );
    }
    if (options.department) conditions.push(eq(aiAgents.department, options.department));
    if (options.category) conditions.push(eq(aiAgents.category, options.category));
    if (options.status) conditions.push(eq(aiAgents.status, options.status));
    if (options.organizationId) conditions.push(eq(aiAgents.organizationId, options.organizationId));
    if (options.createdAfter) conditions.push(sql`${aiAgents.createdAt} >= ${options.createdAfter}`);
    if (options.createdBefore) conditions.push(sql`${aiAgents.createdAt} <= ${options.createdBefore}`);

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';

    const sortColumn =
      sortBy === 'name' ? aiAgents.name :
      sortBy === 'department' ? aiAgents.department :
      sortBy === 'updatedAt' ? aiAgents.updatedAt :
      aiAgents.createdAt;

    const orderFn = sortOrder === 'asc' ? asc : desc;

    const query = pgDb.select().from(aiAgents);
    if (where) query.where(where);

    return paginate(query.$dynamic(), {
      page: options.page || 1,
      limit: options.limit || 20,
      sortBy: sortColumn,
      sortOrder: orderFn,
    });
  }

  /** Get count of agents grouped by department */
  async countByDepartment(organizationId?: string): Promise<Array<{ department: string; count: number }>> {
    const conditions = [];
    if (organizationId) conditions.push(eq(aiAgents.organizationId, organizationId));

    const result = await pgDb
      .select({
        department: aiAgents.department,
        count: sql<number>`count(*)::int`,
      })
      .from(aiAgents)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .groupBy(aiAgents.department)
      .orderBy(desc(sql`count(*)`));

    return result;
  }

  /** Bulk update status for agents in a department */
  async bulkUpdateStatus(department: string, status: AgentStatus, organizationId?: string): Promise<number> {
    const conditions = [eq(aiAgents.department, department)];
    if (organizationId) conditions.push(eq(aiAgents.organizationId, organizationId));

    const result = await pgDb
      .update(aiAgents)
      .set({ status, updatedAt: new Date() })
      .where(and(...conditions))
      .returning({ id: aiAgents.id });

    return result.length;
  }

  /** Toggle agent active/inactive status */
  async toggleStatus(agentId: string): Promise<AgentStatus | null> {
    const [current] = await pgDb.select().from(aiAgents).where(eq(aiAgents.id, agentId)).limit(1);
    if (!current) return null;

    const newStatus: AgentStatus = current.status === 'active' ? 'inactive' : 'active';
    await pgDb.update(aiAgents).set({ status: newStatus, updatedAt: new Date() }).where(eq(aiAgents.id, agentId));
    return newStatus;
  }
}

// Singleton instance
export const agentRepository = new AgentRepository();
