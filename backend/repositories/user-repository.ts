import { sql , eq, and, or, desc, asc, ilike } from 'drizzle-orm';
import { BaseRepository, SoftDeleteRepository, paginate, PaginatedResult, PaginationOptions } from '../lib/repository';
import { db as pgDb } from '../db/connection';
import { users, organizations } from '../db/drizzle-schema';
import { z } from 'zod';

// Types for user operations
export type UserCreateInput = {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  organizationId?: string | null;
  role?: string;
  status?: string;
};

export type UserUpdateInput = Partial<{
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  role: string;
  status: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  failedLoginAttempts: number;
  accountLockedUntil: Date | null;
}>;

export type UserSearchOptions = {
  search?: string;
  role?: string;
  status?: string;
  organizationId?: string;
  emailVerified?: boolean;
  createdAfter?: Date;
  createdBefore?: Date;
  sortBy?: 'createdAt' | 'updatedAt' | 'firstName' | 'lastName' | 'email';
  sortOrder?: 'asc' | 'desc';
};

export class UserRepository extends BaseRepository<any, UserCreateInput, UserUpdateInput> {
  constructor() {
    super(users);
  }

  // Find by email (common operation)
  async findByEmail(email: string): Promise<any | null> {
    const [result] = await pgDb
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);
    return result || null;
  }

  // Find by organization
  async findByOrganization(organizationId: string, options: UserSearchOptions = {}): Promise<any[]> {
    let query = pgDb.select().from(users).where(eq(users.organizationId, organizationId));

    // Apply filters
    if (options.role) {
      query = query.where(and(eq(users.organizationId, organizationId), eq(users.role, options.role)));
    }

    if (options.status) {
      query = query.where(and(eq(users.organizationId, organizationId), eq(users.status, options.status)));
    }

    if (options.emailVerified !== undefined) {
      query = query.where(and(eq(users.organizationId, organizationId), eq(users.emailVerified, options.emailVerified)));
    }

    // Apply search
    if (options.search) {
      const searchCondition = this.buildSearchQuery(
        ['firstName', 'lastName', 'email'],
        options.search
      );
      query = query.where(and(eq(users.organizationId, organizationId), searchCondition));
    }

    // Apply sorting
    const sortField = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const orderBy = sortOrder === 'desc' ? desc(users[sortField]) : asc(users[sortField]);
    query = query.orderBy(orderBy);

    return await query;
  }

  // Search users with advanced filtering
  async search(options: UserSearchOptions = {}): Promise<any[]> {
    let query = pgDb.select().from(users);

    const conditions = [];

    // Search term
    if (options.search) {
      const searchCondition = this.buildSearchQuery(
        ['firstName', 'lastName', 'email'],
        options.search
      );
      conditions.push(searchCondition);
    }

    // Role Filter
    if (options.role) {
      conditions.push(eq(users.role, options.role));
    }

    // Status Filter
    if (options.status) {
      conditions.push(eq(users.status, options.status));
    }

    // Organization Filter
    if (options.organizationId) {
      conditions.push(eq(users.organizationId, options.organizationId));
    }

    // Email verification Filter
    if (options.emailVerified !== undefined) {
      conditions.push(eq(users.emailVerified, options.emailVerified));
    }

    // Date range Filter
    if (options.createdAfter || options.createdBefore) {
      const dateCondition = this.buildDateRangeQuery('createdAt', options.createdAfter, options.createdBefore);
      conditions.push(dateCondition);
    }

    // Apply all conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    const sortField = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const orderBy = sortOrder === 'desc' ? desc(users[sortField]) : asc(users[sortField]);
    query = query.orderBy(orderBy);

    return await query;
  }

  // Paginated search
  async searchPaginated(
    pagination: PaginationOptions,
    options: UserSearchOptions = {}
  ): Promise<PaginatedResult<any>> {
    const where = this.buildWhereClause(options);
    const orderBy = this.buildOrderByClause(options);
    
    return await paginate(this, pagination, where, orderBy);
  }

  // Get user with organization details
  async findByIdWithOrganization(id: string): Promise<any | null> {
    const [result] = await pgDb
      .select({
        user: users,
        organization: organizations
      })
      .from(users)
      .leftJoin(organizations, eq(users.organizationId, organizations.id))
      .where(eq(users.id, id))
      .limit(1);
    return result || null;
  }

  // Update last login
  async updateLastLogin(id: string): Promise<void> {
    await pgDb
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, id));
  }

  // Increment failed login attempts
  async incrementFailedLoginAttempts(id: string): Promise<void> {
    await pgDb
      .update(users)
      .set({
        failedLoginAttempts: sql`${users.failedLoginAttempts} + 1`
      })
      .where(eq(users.id, id));
  }

  // Reset failed login attempts
  async resetFailedLoginAttempts(id: string): Promise<void> {
    await pgDb
      .update(users)
      .set({
        failedLoginAttempts: 0,
        accountLockedUntil: null
      })
      .where(eq(users.id, id));
  }

  // Lock account
  async lockAccount(id: string, lockDuration: number = 15 * 60 * 1000): Promise<void> {
    const lockedUntil = new Date(Date.now() + lockDuration);
    await pgDb
      .update(users)
      .set({
        status: 'suspended',
        accountLockedUntil: lockedUntil
      })
      .where(eq(users.id, id));
  }

  // Check if account is locked
  async isAccountLocked(id: string): Promise<boolean> {
    const [user] = await pgDb
      .select({
        accountLockedUntil: users.accountLockedUntil,
        status: users.status
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!user) return false;

    if (user.status === 'suspended' && user.accountLockedUntil) {
      return user.accountLockedUntil.getTime() > Date.now();
    }

    return false;
  }

  // Get user statistics
  async getStatistics(organizationId?: string): Promise<{
    total: number;
    active: number;
    suspended: number;
    verified: number;
    unverified: number;
  }> {
    let baseQuery = pgDb.select({
      total: sql<number>`count(*)`,
      active: sql<number>`count(*) Filter (where ${users.status} = 'active')`,
      suspended: sql<number>`count(*) Filter (where ${users.status} = 'suspended')`,
      verified: sql<number>`count(*) Filter (where ${users.emailVerified} = true)`,
      unverified: sql<number>`count(*) Filter (where ${users.emailVerified} = false)`
    }).from(users);

    if (organizationId) {
      baseQuery = baseQuery.where(eq(users.organizationId, organizationId));
    }

    const [result] = await baseQuery;
    return result;
  }

  // Helper methods
  private buildWhereClause(options: UserSearchOptions): any {
    const conditions = [];

    if (options.search) {
      const searchCondition = this.buildSearchQuery(
        ['firstName', 'lastName', 'email'],
        options.search
      );
      conditions.push(searchCondition);
    }

    if (options.role) {
      conditions.push(eq(users.role, options.role));
    }

    if (options.status) {
      conditions.push(eq(users.status, options.status));
    }

    if (options.organizationId) {
      conditions.push(eq(users.organizationId, options.organizationId));
    }

    if (options.emailVerified !== undefined) {
      conditions.push(eq(users.emailVerified, options.emailVerified));
    }

    if (options.createdAfter || options.createdBefore) {
      const dateCondition = this.buildDateRangeQuery('createdAt', options.createdAfter, options.createdBefore);
      conditions.push(dateCondition);
    }

    return conditions.length > 0 ? and(...conditions) : sql`1=1`;
  }

  private buildOrderByClause(options: UserSearchOptions): any {
    const sortField = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    return sortOrder === 'desc' ? desc(users[sortField]) : asc(users[sortField]);
  }
}

// Export singleton instance
export const userRepository = new UserRepository();
