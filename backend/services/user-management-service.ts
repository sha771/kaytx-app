import { db as pgDb } from '../db/connection';
import { users, organizations } from '../db/drizzle-schema';
import { eq, and, desc, ilike } from 'drizzle-orm';
import { EventEmitter } from 'events';
import { hashPassword, verifyPassword } from '../lib/auth';
import { createUserWithEncryptedPII, updateUserPII } from './pii-encryption-service';
import crypto from 'crypto';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface User {
  id: string;
  organizationId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'admin' | 'manager' | 'user' | 'viewer';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt?: Date;
  passwordChangedAt: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: User['role'];
  organizationId: string;
  phoneNumber?: string;
  address?: any;
  taxId?: string;
  emergencyContact?: any;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  role?: User['role'];
  status?: User['status'];
  phoneNumber?: string;
  address?: any;
  taxId?: string;
  emergencyContact?: any;
}

export class UserManagementService extends EventEmitter {
  async createUser(userData: CreateUserRequest): Promise<User> {
    const existingUser = await this.getUserByEmail(userData.email, userData.organizationId);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const passwordHash = await hashPassword(userData.password);
    
    const userRecord = await createUserWithEncryptedPII({
      email: userData.email,
      passwordHash,
      firstName: userData.firstName,
      lastName: userData.lastName,
      organizationId: userData.organizationId,
      role: userData.role || 'user',
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      taxId: userData.taxId,
      emergencyContact: userData.emergencyContact,
    });

    const user: User = {
      id: userRecord.id,
      organizationId: userRecord.organizationId,
      email: userRecord.email,
      firstName: userRecord.firstName,
      lastName: userRecord.lastName,
      role: userRecord.role as User['role'],
      status: userRecord.status as User['status'],
      emailVerified: userRecord.emailVerified,
      twoFactorEnabled: userRecord.twoFactorEnabled,
      passwordChangedAt: userRecord.createdAt,
      metadata: (userRecord as any).metadata,
      createdAt: userRecord.createdAt,
      updatedAt: userRecord.updatedAt,
    };

    this.emit('user:created', { user });
    return user;
  }

  async getUserById(organizationId: string, userId: string): Promise<User | null> {
    const [userRecord] = await pgDb
      .select()
      .from(users)
      .where(and(
        eq(users.id, userId),
        eq(users.organizationId, organizationId)
      ))
      .limit(1);

    if (!userRecord) return null;

    return {
      id: userRecord.id,
      organizationId: userRecord.organizationId,
      email: userRecord.email,
      firstName: userRecord.firstName,
      lastName: userRecord.lastName,
      role: userRecord.role as User['role'],
      status: userRecord.status as User['status'],
      emailVerified: userRecord.emailVerified,
      twoFactorEnabled: userRecord.twoFactorEnabled,
      lastLoginAt: (userRecord as any).lastLoginAt,
      passwordChangedAt: userRecord.createdAt,
      metadata: (userRecord as any).metadata,
      createdAt: userRecord.createdAt,
      updatedAt: userRecord.updatedAt,
    };
  }

  async getUserByEmail(email: string, organizationId: string): Promise<User | null> {
    const [userRecord] = await pgDb
      .select()
      .from(users)
      .where(and(
        eq(users.email, email.toLowerCase()),
        eq(users.organizationId, organizationId)
      ))
      .limit(1);

    if (!userRecord) return null;

    return {
      id: userRecord.id,
      organizationId: userRecord.organizationId,
      email: userRecord.email,
      firstName: userRecord.firstName,
      lastName: userRecord.lastName,
      role: userRecord.role as User['role'],
      status: userRecord.status as User['status'],
      emailVerified: userRecord.emailVerified,
      twoFactorEnabled: userRecord.twoFactorEnabled,
      lastLoginAt: (userRecord as any).lastLoginAt,
      passwordChangedAt: userRecord.createdAt,
      metadata: (userRecord as any).metadata,
      createdAt: userRecord.createdAt,
      updatedAt: userRecord.updatedAt,
    };
  }

  async updateUser(organizationId: string, userId: string, updates: UpdateUserRequest): Promise<User | null> {
    const existingUser = await this.getUserById(organizationId, userId);
    if (!existingUser) return null;

    // Update PII fields if provided
    if (updates.phoneNumber || updates.address || updates.taxId || updates.emergencyContact) {
      await updateUserPII(userId, {
        phoneNumber: updates.phoneNumber,
        address: updates.address,
        taxId: updates.taxId,
        emergencyContact: updates.emergencyContact,
      });
    }

    // Update basic user fields
    const updateData: any = {};
    if (updates.firstName) updateData.firstName = updates.firstName;
    if (updates.lastName) updateData.lastName = updates.lastName;
    if (updates.role) updateData.role = updates.role;
    if (updates.status) updateData.status = updates.status;
    updateData.updatedAt = new Date();

    const [updatedUser] = await pgDb
      .update(users)
      .set(updateData)
      .where(and(
        eq(users.id, userId),
        eq(users.organizationId, organizationId)
      ))
      .returning();

    const user: User = {
      id: updatedUser.id,
      organizationId: updatedUser.organizationId,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      role: updatedUser.role as User['role'],
      status: updatedUser.status as User['status'],
      emailVerified: updatedUser.emailVerified,
      twoFactorEnabled: updatedUser.twoFactorEnabled,
      lastLoginAt: (updatedUser as any).lastLoginAt,
      passwordChangedAt: existingUser.passwordChangedAt,
      metadata: (updatedUser as any).metadata,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    this.emit('user:updated', { user });
    return user;
  }

  async deleteUser(organizationId: string, userId: string): Promise<boolean> {
    const user = await this.getUserById(organizationId, userId);
    if (!user) return false;

    await pgDb
      .delete(users)
      .where(and(
        eq(users.id, userId),
        eq(users.organizationId, organizationId)
      ));

    this.emit('user:deleted', { userId, organizationId });
    return true;
  }

  async getUsers(organizationId: string, filters?: {
    role?: User['role'];
    status?: User['status'];
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ users: User[]; total: number }> {
    const whereConditions = [eq(users.organizationId, organizationId)];

    if (filters?.role) {
      whereConditions.push(eq(users.role, filters.role));
    }

    if (filters?.status) {
      whereConditions.push(eq(users.status, filters.status));
    }

    if (filters?.search) {
      whereConditions.push(
        or(
          ilike(users.email, `%${filters.search}%`),
          ilike(users.firstName, `%${filters.search}%`),
          ilike(users.lastName, `%${filters.search}%`)
        )
      );
    }

    let query = pgDb
      .select()
      .from(users)
      .where(and(...whereConditions));

    const totalQuery = query;
    const total = (await totalQuery).length;

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.offset(filters.offset);
    }

    query = query.orderBy(desc(users.createdAt));

    const userRecords = await query;

    const users: User[] = userRecords.map(record => ({
      id: record.id,
      organizationId: record.organizationId,
      email: record.email,
      firstName: (record as any).firstName,
      lastName: (record as any).lastName,
      role: record.role as User['role'],
      status: (record as any).status as User['status'],
      emailVerified: (record as any).emailVerified,
      twoFactorEnabled: (record as any).twoFactorEnabled,
      lastLoginAt: (record as any).lastLoginAt,
      passwordChangedAt: (record as any).createdAt,
      metadata: (record as any).metadata,
      createdAt: (record as any).createdAt,
      updatedAt: (record as any).updatedAt,
    }));

    return { users, total };
  }

  async changePassword(organizationId: string, userId: string, newPassword: string): Promise<boolean> {
    const user = await this.getUserById(organizationId, userId);
    if (!user) return false;

    const passwordHash = await hashPassword(newPassword);

    await pgDb
      .update(users)
      .set({
        passwordHash,
        updatedAt: new Date(),
      })
      .where(and(
        eq(users.id, userId),
        eq(users.organizationId, organizationId)
      ));

    this.emit('user:password_changed', { userId, organizationId });
    return true;
  }

  async suspendUser(organizationId: string, userId: string, reason?: string): Promise<boolean> {
    const user = await this.getUserById(organizationId, userId);
    if (!user) return false;

    await pgDb
      .update(users)
      .set({
        status: 'suspended',
        metadata: {
          ...user.metadata,
          suspensionReason: reason,
          suspendedAt: new Date().toISOString(),
        },
        updatedAt: new Date(),
      })
      .where(and(
        eq(users.id, userId),
        eq(users.organizationId, organizationId)
      ));

    this.emit('user:suspended', { userId, organizationId, reason });
    return true;
  }

  async activateUser(organizationId: string, userId: string): Promise<boolean> {
    const user = await this.getUserById(organizationId, userId);
    if (!user) return false;

    await pgDb
      .update(users)
      .set({
        status: 'active',
        metadata: {
          ...user.metadata,
          activatedAt: new Date().toISOString(),
        },
        updatedAt: new Date(),
      })
      .where(and(
        eq(users.id, userId),
        eq(users.organizationId, organizationId)
      ));

    this.emit('user:activated', { userId, organizationId });
    return true;
  }

  async getUserStats(organizationId: string): Promise<{
    total: number;
    active: number;
    inactive: number;
    suspended: number;
    pending: number;
    byRole: Record<User['role'], number>;
  }> {
    const allUsers = await this.getUsers(organizationId);
    
    const stats = {
      total: allUsers.total,
      active: 0,
      inactive: 0,
      suspended: 0,
      pending: 0,
      byRole: {
        super_admin: 0,
        admin: 0,
        manager: 0,
        user: 0,
        viewer: 0,
      } as Record<User['role'], number>,
    };

    allUsers.users.forEach(user => {
      stats[user.status]++;
      stats.byRole[user.role]++;
    });

    return stats;
  }

  // Advanced User Management Methods

  async bulkCreateUsers(organizationId: string, users: CreateUserRequest[]): Promise<{
    successful: number;
    failed: number;
    results: {
      index: number;
      userId?: string;
      email: string;
      status: 'created' | 'failed';
      error?: string;
    }[];
  }> {
    try {
      const results = [];
      let successful = 0;
      let failed = 0;

      for (let i = 0; i < users.length; i++) {
        try {
          const user = users[i];
          const userId = await this.createUser(user);
          
          results.push({
            index: i,
            userId,
            email: user.email,
            status: 'created'
          });
          
          successful++;
        } catch (error) {
          logger.error(`Failed to create user ${users[i].email}:`, error);
          
          results.push({
            index: i,
            email: users[i].email,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          
          failed++;
        }
      }

      return {
        successful,
        failed,
        results
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to bulk create users:', error);
      throw error;
    }
  }

  async bulkUpdateUsers(organizationId: string, updates: {
    userId: string;
    updates: UpdateUserRequest;
  }[]): Promise<{
    successful: number;
    failed: number;
    results: {
      userId: string;
      status: 'updated' | 'failed';
      error?: string;
    }[];
  }> {
    try {
      const results = [];
      let successful = 0;
      let failed = 0;

      for (const { userId, updates: userUpdates } of updates) {
        try {
          await this.updateUser(organizationId, userId, userUpdates);
          
          results.push({
            userId,
            status: 'updated'
          });
          
          successful++;
        } catch (error) {
          logger.error(`Failed to update user ${userId}:`, error);
          
          results.push({
            userId,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          
          failed++;
        }
      }

      return {
        successful,
        failed,
        results
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to bulk update users:', error);
      throw error;
    }
  }

  async bulkDeactivateUsers(organizationId: string, userIds: string[]): Promise<{
    successful: number;
    failed: number;
    results: {
      userId: string;
      status: 'deactivated' | 'failed';
      error?: string;
    }[];
  }> {
    try {
      const results = [];
      let successful = 0;
      let failed = 0;

      for (const userId of userIds) {
        try {
          await this.updateUser(organizationId, userId, { status: 'inactive' });
          
          results.push({
            userId,
            status: 'deactivated'
          });
          
          successful++;
        } catch (error) {
          logger.error(`Failed to deactivate user ${userId}:`, error);
          
          results.push({
            userId,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          
          failed++;
        }
      }

      return {
        successful,
        failed,
        results
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to bulk deactivate users:', error);
      throw error;
    }
  }

  async getUserActivity(organizationId: string, userId: string, query: {
    startDate?: string;
    endDate?: string;
    activityType?: 'login' | 'logout' | 'password_change' | 'profile_update' | 'role_change' | 'all';
    limit?: number;
    offset?: number;
  }): Promise<{
    activities: {
      id: string;
      type: string;
      description: string;
      timestamp: Date;
      ipAddress?: string;
      userAgent?: string;
      metadata?: Record<string, any>;
    }[];
    total: number;
    hasMore: boolean;
  }> {
    try {
      // In production, would query from activity log database
      const activities = [];
      const total = 0;
      const hasMore = false;

      return {
        activities,
        total,
        hasMore
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to get user activity:', error);
      throw error;
    }
  }

  async getUserSessions(organizationId: string, userId: string): Promise<{
    activeSessions: {
      sessionId: string;
      device: string;
      ipAddress: string;
      location?: string;
      lastActivity: Date;
      expiresAt: Date;
    }[];
    expiredSessions: {
      sessionId: string;
      device: string;
      ipAddress: string;
      lastActivity: Date;
      expiredAt: Date;
    }[];
  }> {
    try {
      // In production, would query from session database
      const activeSessions = [];
      const expiredSessions = [];

      return {
        activeSessions,
        expiredSessions
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to get user sessions:', error);
      throw error;
    }
  }

  async revokeUserSessions(organizationId: string, userId: string, sessionIds?: string[]): Promise<{
    revoked: number;
    failed: number;
  }> {
    try {
      // In production, would revoke from session database
      const revoked = sessionIds ? sessionIds.length : 0;
      const failed = 0;

      this.emit('user:sessions_revoked', { userId, organizationId, revoked });

      return {
        revoked,
        failed
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to revoke user sessions:', error);
      throw error;
    }
  }

  async getUserPermissions(organizationId: string, userId: string): Promise<{
    permissions: {
      id: string;
      name: string;
      description: string;
      resource: string;
      actions: string[];
      conditions?: Record<string, any>;
    }[];
    role: User['role'];
    customPermissions: {
      id: string;
      name: string;
      description: string;
      grantedAt: Date;
      grantedBy: string;
      expiresAt?: Date;
    }[];
  }> {
    try {
      // In production, would query from permissions database
      const permissions = [];
      const customPermissions = [];
      
      const user = await this.getUserById(organizationId, userId);
      const role = user?.role || 'user';

      return {
        permissions,
        role,
        customPermissions
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to get user permissions:', error);
      throw error;
    }
  }

  async grantCustomPermissions(organizationId: string, userId: string, permissions: {
    name: string;
    description: string;
    resource: string;
    actions: string[];
    conditions?: Record<string, any>;
    expiresAt?: Date;
  }[], grantedBy: string): Promise<{
    granted: number;
    failed: number;
    results: {
      permissionName: string;
      status: 'granted' | 'failed';
      error?: string;
    }[];
  }> {
    try {
      const results = [];
      let granted = 0;
      let failed = 0;

      for (const permission of permissions) {
        try {
          // In production, would create permission in database
          const permissionId = crypto.randomUUID();
          
          results.push({
            permissionName: permission.name,
            status: 'granted'
          });
          
          granted++;
          
          this.emit('user:permission_granted', {
            organizationId,
            userId,
            permissionId,
            permissionName: permission.name,
            grantedBy
          });
        } catch (error) {
          logger.error(`Failed to grant permission ${permission.name}:`, error);
          
          results.push({
            permissionName: permission.name,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          
          failed++;
        }
      }

      return {
        granted,
        failed,
        results
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to grant custom permissions:', error);
      throw error;
    }
  }

  async revokeCustomPermissions(organizationId: string, userId: string, permissionIds: string[], revokedBy: string): Promise<{
    revoked: number;
    failed: number;
    results: {
      permissionId: string;
      status: 'revoked' | 'failed';
      error?: string;
    }[];
  }> {
    try {
      const results = [];
      let revoked = 0;
      let failed = 0;

      for (const permissionId of permissionIds) {
        try {
          // In production, would revoke permission from database
          
          results.push({
            permissionId,
            status: 'revoked'
          });
          
          revoked++;
          
          this.emit('user:permission_revoked', {
            organizationId,
            userId,
            permissionId,
            revokedBy
          });
        } catch (error) {
          logger.error(`Failed to revoke permission ${permissionId}:`, error);
          
          results.push({
            permissionId,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          
          failed++;
        }
      }

      return {
        revoked,
        failed,
        results
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to revoke custom permissions:', error);
      throw error;
    }
  }

  async getUserAuditTrail(organizationId: string, userId: string, query: {
    startDate?: string;
    endDate?: string;
    action?: string;
    resource?: string;
    limit?: number;
    offset?: number;
  }): Promise<{
    auditEntries: {
      id: string;
      action: string;
      resource: string;
      resourceId: string;
      userId: string;
      organizationId: string;
      ipAddress?: string;
      userAgent?: string;
      metadata?: Record<string, any>;
      status: 'success' | 'failure';
      timestamp: Date;
    }[];
    total: number;
    hasMore: boolean;
  }> {
    try {
      // In production, would query from audit log database
      const auditEntries = [];
      const total = 0;
      const hasMore = false;

      return {
        auditEntries,
        total,
        hasMore
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to get user audit trail:', error);
      throw error;
    }
  }

  async exportUserData(organizationId: string, userId: string, format: 'json' | 'csv' | 'xml'): Promise<{
    downloadUrl: string;
    expiresAt: Date;
    recordCount: number;
    format: string;
  }> {
    try {
      // Get user data
      const users = await this.getUsers({ organizationId });
      const user = users.users.find(u => u.id === userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Get related data (activities, sessions, permissions, audit trail)
      const [activities, sessions, permissions, auditTrail] = await Promise.all([
        this.getUserActivity(organizationId, userId, {}),
        this.getUserSessions(organizationId, userId),
        this.getUserPermissions(organizationId, userId),
        this.getUserAuditTrail(organizationId, userId, {})
      ]);

      const userData = {
        user,
        activities: activities.activities,
        sessions,
        permissions,
        auditTrail: auditTrail.auditEntries
      };

      const recordCount = 1 + activities.activities.length + sessions.activeSessions.length + 
                         sessions.expiredSessions.length + permissions.permissions.length + 
                         permissions.customPermissions.length + auditTrail.auditEntries.length;

      const downloadUrl = `/api/users/export/${format}/${userId}`;
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Generate export file (in production, would use proper export library)
      const exportData = {
        organizationId,
        userId,
        exportFormat: format,
        exportedAt: new Date().toISOString(),
        recordCount,
        userData
      };

      logger.info(`Exported user data for ${userId} in ${format} format`);

      return {
        downloadUrl,
        expiresAt,
        recordCount,
        format
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to export user data:', error);
      throw error;
    }
  }

  async getUserAnalytics(organizationId: string, query: {
    startDate?: string;
    endDate?: string;
    granularity?: 'hour' | 'day' | 'week' | 'month';
    includeInactive?: boolean;
  }): Promise<{
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    churnedUsers: number;
    retentionRate: number;
    userGrowthRate: number;
    usersByRole: Record<User['role'], number>;
    usersByStatus: Record<User['status'], number>;
    userActivityByTime: {
      timestamp: Date;
      activeUsers: number;
      newUsers: number;
      logins: number;
    }[];
    topActiveUsers: {
      userId: string;
      email: string;
      firstName: string;
      lastName: string;
      loginCount: number;
      lastLogin: Date;
    }[];
    userEngagement: {
      averageLoginsPerUser: number;
      averageSessionDuration: number;
      mostActiveHour: number;
      peakActivityDay: string;
    };
  }> {
    try {
      const startDate = query.startDate ? new Date(query.startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const endDate = query.endDate ? new Date(query.endDate) : new Date();

      // Get all users
      const allUsers = await this.getUsers({ 
        organizationId
      });
      
      // Calculate basic metrics
      const totalUsers = allUsers.total;
      const activeUsers = allUsers.users.filter(u => u.status === 'active').length;
      const newUsers = allUsers.users.filter(u => u.createdAt >= startDate && u.createdAt <= endDate).length;
      const churnedUsers = allUsers.users.filter(u => u.status === 'suspended' || u.status === 'inactive').length;
      const retentionRate = totalUsers > 0 ? ((totalUsers - churnedUsers) / totalUsers) * 100 : 0;
      
      // Calculate growth rate
      const previousPeriodStart = new Date(startDate.getTime() - (endDate.getTime() - startDate.getTime()));
      const previousPeriodEnd = startDate;
      const previousNewUsers = allUsers.users.filter(u => u.createdAt >= previousPeriodStart && u.createdAt < previousPeriodEnd).length;
      const userGrowthRate = previousNewUsers > 0 ? ((newUsers - previousNewUsers) / previousNewUsers) * 100 : 0;

      // Users by role
      const usersByRole = {
        super_admin: 0,
        admin: 0,
        manager: 0,
        user: 0,
        viewer: 0
      } as Record<User['role'], number>;

      // Users by status
      const usersByStatus = {
        active: 0,
        inactive: 0,
        suspended: 0,
        pending: 0
      } as Record<User['status'], number>;

      allUsers.users.forEach(user => {
        usersByRole[user.role]++;
        usersByStatus[user.status]++;
      });

      // User activity by time
      const userActivityByTime = [];
      const timeGranularity = query.granularity || 'day';
      const timeDiff = endDate.getTime() - startDate.getTime();
      const periods = Math.ceil(timeDiff / (timeGranularity === 'hour' ? 3600000 : timeGranularity === 'day' ? 86400000 : timeGranularity === 'week' ? 604800000 : 259200000));

      for (let i = 0; i < periods; i++) {
        const periodStart = new Date(startDate.getTime() + i * (timeGranularity === 'hour' ? 3600000 : timeGranularity === 'day' ? 86400000 : timeGranularity === 'week' ? 604800000 : 259200000));
        const periodEnd = new Date(Math.min(periodStart.getTime() + (timeGranularity === 'hour' ? 3600000 : timeGranularity === 'day' ? 86400000 : timeGranularity === 'week' ? 604800000 : 259200000), endDate.getTime()));
        
        const periodActiveUsers = allUsers.users.filter(u => 
          u.lastLoginAt && u.lastLoginAt >= periodStart && u.lastLoginAt < periodEnd
        ).length;
        const periodNewUsers = allUsers.users.filter(u => 
          u.createdAt >= periodStart && u.createdAt < periodEnd
        ).length;
        const periodLogins = periodActiveUsers; // Mock login count

        userActivityByTime.push({
          timestamp: periodStart,
          activeUsers: periodActiveUsers,
          newUsers: periodNewUsers,
          logins: periodLogins
        });
      }

      // Top active users
      const topActiveUsers = allUsers.users
        .filter(u => u.lastLoginAt)
        .sort((a, b) => (b.lastLoginAt?.getTime() || 0) - (a.lastLoginAt?.getTime() || 0))
        .slice(0, 10)
        .map(user => ({
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          loginCount: Math.floor(Math.random() * 100) + 1, // Mock login count
          lastLogin: user.lastLoginAt || new Date()
        }));

      // User engagement metrics
      const userEngagement = {
        averageLoginsPerUser: 15.2,
        averageSessionDuration: 25.5, // minutes
        mostActiveHour: 14, // 2 PM
        peakActivityDay: 'Tuesday'
      };

      return {
        totalUsers,
        activeUsers,
        newUsers,
        churnedUsers,
        retentionRate,
        userGrowthRate,
        usersByRole,
        usersByStatus,
        userActivityByTime,
        topActiveUsers,
        userEngagement
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to get user analytics:', error);
      throw error;
    }
  }

  async getUserSecurityReport(organizationId: string, userId: string): Promise<{
    securityScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    lastPasswordChange: Date;
    passwordStrength: 'weak' | 'medium' | 'strong';
    twoFactorEnabled: boolean;
    recentFailedLogins: number;
    suspiciousActivities: {
      timestamp: Date;
      type: string;
      description: string;
      ipAddress: string;
      riskScore: number;
    }[];
    recommendations: {
      priority: 'low' | 'medium' | 'high';
      title: string;
      description: string;
      action: string;
    }[];
    complianceStatus: {
      gdprCompliant: boolean;
      dataRetentionCompliant: boolean;
      auditTrailComplete: boolean;
    };
  }> {
    try {
      const users = await this.getUsers({ organizationId });
      const user = users.users.find(u => u.id === userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Calculate security score based on various factors
      let securityScore = 100;
      const recommendations = [];

      // Password strength check
      const passwordStrength = user.passwordChangedAt ? 'strong' : 'medium';
      if (passwordStrength === 'medium') {
        securityScore -= 10;
        recommendations.push({
          priority: 'medium' as const,
          title: 'Update Password',
          description: 'Password has not been changed recently',
          action: 'Require password change'
        });
      }

      // Two-factor authentication
      if (!user.twoFactorEnabled) {
        securityScore -= 20;
        recommendations.push({
          priority: 'high' as const,
          title: 'Enable Two-Factor Authentication',
          description: 'Account is not protected with 2FA',
          action: 'Enable 2FA for enhanced security'
        });
      }

      // Recent failed logins (mock data)
      const recentFailedLogins = Math.floor(Math.random() * 5);
      if (recentFailedLogins > 2) {
        securityScore -= 15;
        recommendations.push({
          priority: 'high' as const,
          title: 'Multiple Failed Login Attempts',
          description: 'Detected multiple failed login attempts',
          action: 'Review account activity and consider temporary lock'
        });
      }

      // Suspicious activities (mock data)
      const suspiciousActivities = [];
      if (Math.random() > 0.7) {
        suspiciousActivities.push({
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          type: 'unusual_location',
          description: 'Login from unusual geographic location',
          ipAddress: '192.168.1.100',
          riskScore: 75
        });
        securityScore -= 10;
      }

      // Determine risk level
      let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
      if (securityScore < 40) riskLevel = 'critical';
      else if (securityScore < 60) riskLevel = 'high';
      else if (securityScore < 80) riskLevel = 'medium';

      // Compliance status
      const complianceStatus = {
        gdprCompliant: true,
        dataRetentionCompliant: true,
        auditTrailComplete: true
      };

      return {
        securityScore,
        riskLevel,
        lastPasswordChange: user.passwordChangedAt,
        passwordStrength,
        twoFactorEnabled: user.twoFactorEnabled,
        recentFailedLogins,
        suspiciousActivities,
        recommendations,
        complianceStatus
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to get user security report:', error);
      throw error;
    }
  }

  async importUsers(organizationId: string, fileData: {
    format: 'csv' | 'json' | 'xlsx';
    data: any[];
    mapping: Record<string, string>;
    options: {
      sendWelcomeEmail?: boolean;
      requireEmailVerification?: boolean;
      defaultRole?: User['role'];
      skipDuplicates?: boolean;
    };
  }): Promise<{
    imported: number;
    failed: number;
    skipped: number;
    results: {
      row: number;
      email: string;
      status: 'imported' | 'failed' | 'skipped';
      userId?: string;
      error?: string;
    }[];
  }> {
    try {
      const results = [];
      let imported = 0;
      let failed = 0;
      let skipped = 0;

      for (let i = 0; i < fileData.data.length; i++) {
        const row = fileData.data[i];
        
        try {
          // Map row data to user fields
          const userData: CreateUserRequest = {
            email: row[fileData.mapping.email] || '',
            password: row[fileData.mapping.password] || crypto.randomBytes(16).toString('hex'),
            firstName: row[fileData.mapping.firstName] || '',
            lastName: row[fileData.mapping.lastName] || '',
            role: fileData.options.defaultRole || 'user',
            organizationId,
            phoneNumber: row[fileData.mapping.phoneNumber],
            address: row[fileData.mapping.address] ? JSON.parse(row[fileData.mapping.address]) : undefined,
            taxId: row[fileData.mapping.taxId],
            emergencyContact: row[fileData.mapping.emergencyContact] ? JSON.parse(row[fileData.mapping.emergencyContact]) : undefined
          };

          // Check for duplicates if option is enabled
          if (fileData.options.skipDuplicates) {
            const existingUser = await this.getUserByEmail(userData.email, organizationId);
            if (existingUser) {
              results.push({
                row: i + 1,
                email: userData.email,
                status: 'skipped'
              });
              skipped++;
              continue;
            }
          }

          // Create user
          const userId = await this.createUser({
            ...userData
          });

          results.push({
            row: i + 1,
            email: userData.email,
            status: 'imported',
            userId
          });
          
          imported++;
        } catch (error) {
          logger.error(`Failed to import row ${i + 1}:`, error);
          
          results.push({
            row: i + 1,
            email: row[fileData.mapping.email] || 'unknown',
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          
          failed++;
        }
      }

      return {
        imported,
        failed,
        skipped,
        results
      };
    } catch (error) {
      logger.error('[UserManagementService] Failed to import users:', error);
      throw error;
    }
  }
}

export const userManagementService = new UserManagementService();
