/**
 * Organization Repository
 * Data access layer for organization/tenant entities
 */

import { eq, and, or, desc, asc, ilike, sql } from 'drizzle-orm';
import { BaseRepository, SoftDeleteRepository, paginate, type PaginatedResult, type PaginationOptions } from '../lib/repository';
import { db as pgDb } from '../db/connection';
import { organizations, users } from '../db/drizzle-schema';

export type OrganizationPlan = 'free' | 'starter' | 'pro' | 'enterprise';

export type OrganizationCreateInput = {
  id?: string;
  name: string;
  slug: string;
  plan: OrganizationPlan;
  ownerId: string;
  settings?: Record<string, unknown> | null;
  branding?: Record<string, unknown> | null;
};

export type OrganizationUpdateInput = Partial<{
  name: string;
  plan: OrganizationPlan;
  settings: Record<string, unknown>;
  branding: Record<string, unknown>;
  status: string;
}>;

export class OrganizationRepository extends SoftDeleteRepository<any, OrganizationCreateInput, OrganizationUpdateInput> {
  constructor() {
    super(organizations);
  }

  /** Find organization by slug */
  async findBySlug(slug: string): Promise<any | null> {
    const [result] = await pgDb
      .select()
      .from(organizations)
      .where(eq(organizations.slug, slug))
      .limit(1);
    return result || null;
  }

  /** Find organization by owner */
  async findByOwner(ownerId: string): Promise<any[]> {
    return pgDb
      .select()
      .from(organizations)
      .where(eq(organizations.ownerId, ownerId))
      .orderBy(desc(organizations.createdAt));
  }

  /** Get organization with member count */
  async getWithMemberCount(orgId: string): Promise<any | null> {
    const [org] = await pgDb
      .select()
      .from(organizations)
      .where(eq(organizations.id, orgId))
      .limit(1);

    if (!org) return null;

    const [memberCount] = await pgDb
      .select({ count: sql<number>`count(*)::int` })
      .from(users)
      .where(eq(users.organizationId, orgId));

    return { ...org, memberCount: memberCount?.count || 0 };
  }

  /** Get all members of an organization */
  async getMembers(orgId: string, options?: { role?: string } & PaginationOptions): Promise<PaginatedResult<any>> {
    const conditions = [eq(users.organizationId, orgId)];
    if (options?.role) conditions.push(eq(users.role, options.role));

    const query = pgDb
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        status: users.status,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(and(...conditions));

    return paginate(query.$dynamic(), {
      page: options?.page || 1,
      limit: options?.limit || 50,
    });
  }

  /** Update plan */
  async updatePlan(orgId: string, plan: OrganizationPlan): Promise<void> {
    await pgDb
      .update(organizations)
      .set({ plan, updatedAt: new Date() })
      .where(eq(organizations.id, orgId));
  }

  /** Check if slug is available */
  async isSlugAvailable(slug: string, excludeOrgId?: string): Promise<boolean> {
    const conditions = [eq(organizations.slug, slug)];
    if (excludeOrgId) {
      // Use ne (not equal) if available, else use sql
      conditions.push(sql`${organizations.id} != ${excludeOrgId}`);
    }
    const [existing] = await pgDb
      .select({ id: organizations.id })
      .from(organizations)
      .where(and(...conditions))
      .limit(1);
    return !existing;
  }

  /** Get usage metrics for billing */
  async getUsageMetrics(orgId: string): Promise<{
    memberCount: number;
    agentCount: number;
    apiCallsThisMonth: number;
    storageUsedMb: number;
  }> {
    const [memberRow] = await pgDb
      .select({ count: sql<number>`count(*)::int` })
      .from(users)
      .where(eq(users.organizationId, orgId));

    return {
      memberCount: memberRow?.count || 0,
      agentCount: 0, // populated by joining ai_agents
      apiCallsThisMonth: 0,
      storageUsedMb: 0,
    };
  }
}

export const organizationRepository = new OrganizationRepository();
