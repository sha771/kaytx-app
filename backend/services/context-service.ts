import { BaseService, ServiceResponse, ServiceError } from './base-service';
import { db as pgDb } from '../db/connection';
import { userContexts, userContextVersions, userActivities, users, organizations } from '../db/drizzle-schema';
import { eq, and, or, desc, inArray, ilike, lte, isNull } from 'drizzle-orm';
import { logAudit } from '../lib/audit';
import { encrypt, decrypt } from '../lib/encryption';
import crypto from 'crypto';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface ContextData {
  userId: string;
  sessionId: string;
  organizationId: string;
  preferences: UserPreferences;
  recentActivity: ActivityItem[];
  userProfile: UserProfile;
  permissions: string[];
  metadata: Record<string, any>;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: NotificationSettings;
  ui: UISettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
  categories: string[];
}

export interface UISettings {
  layout: 'compact' | 'comfortable' | 'spacious';
  sidebarCollapsed: boolean;
  showTooltips: boolean;
  autoSave: boolean;
  defaultDashboard: string;
}

export interface PrivacySettings {
  dataCollection: boolean;
  analytics: boolean;
  marketing: boolean;
  sharing: boolean;
  retentionDays: number;
}

export interface ActivityItem {
  id: string;
  type: 'login' | 'logout' | 'page_view' | 'action' | 'error';
  timestamp: Date;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: string;
  department?: string;
  location?: string;
  bio?: string;
  skills: string[];
  certifications: Certification[];
  lastLogin: Date;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  verified: boolean;
}

export interface ContextRequest {
  userId: string;
  sessionId?: string;
  includeProfile?: boolean;
  includePreferences?: boolean;
  includeActivity?: boolean;
  includePermissions?: boolean;
  activityLimit?: number;
}

export class ContextService extends BaseService {
  private contextCache = new Map<string, ContextData>();
  private readonly cacheTimeout = 5 * 60 * 1000; // 5 minutes

  async getContext(request: ContextRequest): Promise<ServiceResponse<ContextData>> {
    return this.handleServiceOperation(async () => {
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(request.userId)) {
        throw new ServiceError('Invalid user ID', 'INVALID_USER_ID', 400);
      }

      const cacheKey = this.generateCacheKey(request);
      
      // Check cache first
      const cached = this.contextCache.get(cacheKey);
      if (cached && this.isCacheValid(cached)) {
        return cached;
      }

      // Get user and organization info
      const [userRecord] = await pgDb
        .select()
        .from(users)
        .where(eq(users.id, request.userId))
        .limit(1);

      if (!userRecord) {
        throw new ServiceError('User not found', 'USER_NOT_FOUND', 404);
      }

      // Build context data
      const contextData: ContextData = {
        userId: request.userId,
        sessionId: request.sessionId || crypto.randomUUID(),
        organizationId: userRecord.organizationId || this.context?.organizationId!,
        preferences: request.includePreferences !== false 
          ? await this.getUserPreferences(request.userId) 
          : {} as UserPreferences,
        recentActivity: request.includeActivity !== false
          ? await this.getRecentActivity(request.userId, request.activityLimit || 50)
          : [],
        userProfile: request.includeProfile !== false
          ? await this.getUserProfile(request.userId)
          : {} as UserProfile,
        permissions: request.includePermissions !== false
          ? await this.getUserPermissions(request.userId)
          : [],
        metadata: await this.getUserMetadata(request.userId),
      };

      // Cache the result
      this.contextCache.set(cacheKey, contextData);

      return contextData;
    }, 'GET_CONTEXT', 'user_context');
  }

  async updatePreferences(
    userId: string,
    preferences: Partial<UserPreferences>
  ): Promise<ServiceResponse<UserPreferences>> {
    return this.handleServiceOperation(async () => {
      const currentPrefs = await this.getUserPreferences(userId);
      const updatedPrefs = { ...currentPrefs, ...preferences };

      // This would update the database
      await this.saveUserPreferences(userId, updatedPrefs);

      // Invalidate cache
      this.invalidateUserCache(userId);

      logAudit({
        userId: this.context?.userId || userId,
        organizationId: this.context?.organizationId,
        action: 'UPDATE_PREFERENCES',
        resource: 'user_preferences',
        resourceId: userId,
        ipAddress: this.context?.ipAddress,
        userAgent: this.context?.userAgent,
        metadata: { updatedFields: Object.keys(preferences) },
        status: 'success',
      });

      return updatedPrefs;
    }, 'UPDATE_PREFERENCES', 'user_preferences');
  }

  async logActivity(activity: Omit<ActivityItem, 'id' | 'timestamp'>): Promise<ServiceResponse<string>> {
    return this.handleServiceOperation(async () => {
      const activityId = crypto.randomUUID();
      const activityItem: ActivityItem = {
        id: activityId,
        ...activity,
        timestamp: new Date(),
      };

      // This would store the activity in the database
      await this.storeActivity(activityItem);

      // Update recent activity in cache
      this.updateActivityCache(this.context?.userId || activityItem.userId || 'system', activityItem);

      return activityId;
    }, 'LOG_ACTIVITY', 'user_activity');
  }

  async getRecentActivity(
    userId: string,
    limit: number = 50
  ): Promise<ActivityItem[]> {
    try {
      const activities = await pgDb
        .select()
        .from(userActivities)
        .where(eq(userActivities.userId, userId))
        .orderBy(userActivities.timestamp)
        .limit(limit);

      return activities.map(activity => ({
        id: activity.id,
        type: activity.activityType as ActivityItem['type'],
        timestamp: activity.timestamp,
        resource: activity.resource,
        resourceId: activity.resourceId,
        details: activity.details,
        ipAddress: activity.ipAddress || '',
        userAgent: activity.userAgent || '',
      }));
    } catch (error) {
      logger.error('Error fetching recent activity:', error);
      return [];
    }
  }

  async updateProfile(
    userId: string,
    profile: Partial<UserProfile>
  ): Promise<ServiceResponse<UserProfile>> {
    return this.handleServiceOperation(async () => {
      const currentProfile = await this.getUserProfile(userId);
      const updatedProfile = { ...currentProfile, ...profile };

      // This would update the database
      await this.saveUserProfile(userId, updatedProfile);

      // Invalidate cache
      this.invalidateUserCache(userId);

      logAudit({
        userId: this.context?.userId || userId,
        organizationId: this.context?.organizationId,
        action: 'UPDATE_PROFILE',
        resource: 'user_profile',
        resourceId: userId,
        ipAddress: this.context?.ipAddress,
        userAgent: this.context?.userAgent,
        metadata: { updatedFields: Object.keys(profile) },
        status: 'success',
      });

      return updatedProfile;
    }, 'UPDATE_PROFILE', 'user_profile');
  }

  async addCertification(
    userId: string,
    certification: Omit<Certification, 'id' | 'verified'>
  ): Promise<ServiceResponse<Certification>> {
    return this.handleServiceOperation(async () => {
      const certificationId = crypto.randomUUID();
      const newCertification: Certification = {
        id: certificationId,
        ...certification,
        verified: false, // Requires verification
      };

      // This would add to database
      await this.addUserCertification(userId, newCertification);

      // Invalidate cache
      this.invalidateUserCache(userId);

      logAudit({
        userId: this.context?.userId || userId,
        organizationId: this.context?.organizationId,
        action: 'ADD_CERTIFICATION',
        resource: 'user_certification',
        resourceId: certificationId,
        ipAddress: this.context?.ipAddress,
        userAgent: this.context?.userAgent,
        metadata: { certificationName: certification.name },
        status: 'success',
      });

      return newCertification;
    }, 'ADD_CERTIFICATION', 'user_certification');
  }

  async getSessionContext(sessionId: string): Promise<ServiceResponse<Partial<ContextData>>> {
    return this.handleServiceOperation(async () => {
      // This would fetch session data from database
      // For now, return minimal context
      return {
        sessionId,
        organizationId: this.context?.organizationId!,
        metadata: { sessionActive: true },
      };
    }, 'GET_SESSION_CONTEXT', 'session_context');
  }

  async clearUserCache(userId: string): Promise<ServiceResponse<void>> {
    return this.handleServiceOperation(async () => {
      this.invalidateUserCache(userId);
    }, 'CLEAR_USER_CACHE', 'user_cache');
  }

  // Enhanced context storage with versioning
  async storeContext(
    userId: string,
    contextType: string,
    content: any,
    options: {
      sessionId?: string;
      tags?: string[];
      expiresAt?: Date;
      isEncrypted?: boolean;
      changeReason?: string;
    } = {}
  ): Promise<ServiceResponse<{ contextId: string; version: number }>> {
    return this.handleServiceOperation(async () => {
      // Validate context type
      if (!contextType || contextType.trim() === '') {
        throw new ServiceError('Context type is required', 'MISSING_CONTEXT_TYPE', 400);
      }

      // Validate content
      if (content === null || content === undefined) {
        throw new ServiceError('Content is required', 'MISSING_CONTENT', 400);
      }

      const contextId = crypto.randomUUID();
      const version = 1;
      const now = new Date();

      // Get user's organization
      const [user] = await pgDb
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (!user) {
        throw new ServiceError('User not found', 'USER_NOT_FOUND', 404);
      }

      // Encrypt content if requested
      let finalContent = content;
      if (options.isEncrypted) {
        finalContent = encrypt(JSON.stringify(content));
      }

      // Store the context
      await pgDb.insert(userContexts).values({
        id: contextId,
        userId,
        organizationId: user.organizationId,
        sessionId: options.sessionId,
        contextType,
        version,
        content: finalContent,
        metadata: {
          encrypted: options.isEncrypted || false,
          createdAt: now,
        },
        tags: options.tags || [],
        isEncrypted: options.isEncrypted || false,
        expiresAt: options.expiresAt,
      });

      // Store initial version
      await pgDb.insert(userContextVersions).values({
        contextId,
        version,
        content: finalContent,
        metadata: {
          encrypted: options.isEncrypted || false,
          changeReason: options.changeReason || 'Initial version',
        },
        changedBy: this.context?.userId || 'system',
      });

      // Log audit
      logAudit({
        userId: this.context?.userId || 'system',
        organizationId: user.organizationId,
        action: 'CONTEXT_STORED',
        resource: 'user_context',
        resourceId: contextId,
        ipAddress: this.context?.ipAddress,
        userAgent: this.context?.userAgent,
        metadata: {
          contextType,
          version,
          tags: options.tags,
          encrypted: options.isEncrypted,
        },
        status: 'success',
      });

      return { contextId, version };
    }, 'STORE_CONTEXT', 'user_context');
  }

  // Update existing context with versioning
  async updateContext(
    contextId: string,
    content: any,
    options: {
      changeReason?: string;
      tags?: string[];
      expiresAt?: Date;
    } = {}
  ): Promise<ServiceResponse<{ version: number }>> {
    return this.handleServiceOperation(async () => {
      // Get current context
      const [currentContext] = await pgDb
        .select()
        .from(userContexts)
        .where(eq(userContexts.id, contextId))
        .limit(1);

      if (!currentContext) {
        throw new ServiceError('Context not found', 'CONTEXT_NOT_FOUND', 404);
      }

      const newVersion = currentContext.version + 1;

      // Encrypt content if needed
      let finalContent = content;
      if (currentContext.isEncrypted) {
        finalContent = encrypt(JSON.stringify(content));
      }

      // Update context
      await pgDb
        .update(userContexts)
        .set({
          content: finalContent,
          version: newVersion,
          tags: options.tags || currentContext.tags,
          expiresAt: options.expiresAt || currentContext.expiresAt,
          updatedAt: new Date(),
        })
        .where(eq(userContexts.id, contextId));

      // Store new version
      await pgDb.insert(userContextVersions).values({
        contextId,
        version: newVersion,
        content: finalContent,
        metadata: {
          encrypted: currentContext.isEncrypted,
          changeReason: options.changeReason || 'Content updated',
        },
        changedBy: this.context?.userId || 'system',
      });

      // Invalidate cache
      this.invalidateUserCache(currentContext.userId);

      // Log audit
      logAudit({
        userId: this.context?.userId || 'system',
        organizationId: currentContext.organizationId,
        action: 'CONTEXT_UPDATED',
        resource: 'user_context',
        resourceId: contextId,
        ipAddress: this.context?.ipAddress,
        userAgent: this.context?.userAgent,
        metadata: {
          oldVersion: currentContext.version,
          newVersion,
          changeReason: options.changeReason,
        },
        status: 'success',
      });

      return { version: newVersion };
    }, 'UPDATE_CONTEXT', 'user_context');
  }

  // Search contexts
  async searchContexts(
    userId: string,
    query: {
      contextType?: string;
      tags?: string[];
      searchText?: string;
      includeExpired?: boolean;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<ServiceResponse<any[]>> {
    return this.handleServiceOperation(async () => {
      const {
        contextType,
        tags,
        searchText,
        includeExpired = false,
        limit = 50,
        offset = 0,
      } = query;

      // Validate limit
      if (limit < 1 || limit > 1000) {
        throw new ServiceError('Invalid limit', 'INVALID_LIMIT', 400);
      }

      // Build where conditions
      const conditions = [eq(userContexts.userId, userId)];

      if (contextType) {
        conditions.push(eq(userContexts.contextType, contextType));
      }

      if (!includeExpired) {
        conditions.push(
          or(
            isNull(userContexts.expiresAt),
            lte(userContexts.expiresAt, new Date())
          )
        );
      }

      let whereClause = and(...conditions);

      // Execute search
      let results = await pgDb
        .select()
        .from(userContexts)
        .where(whereClause)
        .orderBy(desc(userContexts.updatedAt))
        .limit(limit)
        .offset(offset);

      // Filter by tags if specified
      if (tags && tags.length > 0) {
        results = results.filter(context =>
          tags.some(tag => context.tags?.includes(tag))
        );
      }

      // Filter by search text if specified
      if (searchText) {
        results = results.filter(context =>
          JSON.stringify(context.content).toLowerCase().includes(searchText.toLowerCase())
        );
      }

      // Decrypt content if needed
      const processedResults = results.map(context => {
        let content = context.content;
        if (context.isEncrypted) {
          try {
            content = JSON.parse(decrypt(content));
          } catch (error) {
            logger.error('Error decrypting context:', error);
            content = { error: 'Failed to decrypt content' };
          }
        }

        return {
          id: context.id,
          contextType: context.contextType,
          version: context.version,
          content,
          metadata: context.metadata,
          tags: context.tags,
          isEncrypted: context.isEncrypted,
          expiresAt: context.expiresAt,
          createdAt: context.createdAt,
          updatedAt: context.updatedAt,
        };
      });

      return processedResults;
    }, 'SEARCH_CONTEXTS', 'user_context');
  }

  // Get context version history
  async getContextVersions(contextId: string): Promise<ServiceResponse<any[]>> {
    return this.handleServiceOperation(async () => {
      const versions = await pgDb
        .select()
        .from(userContextVersions)
        .where(eq(userContextVersions.contextId, contextId))
        .orderBy(desc(userContextVersions.version));

      // Get context info for encryption status
      const [context] = await pgDb
        .select()
        .from(userContexts)
        .where(eq(userContexts.id, contextId))
        .limit(1);

      if (!context) {
        throw new ServiceError('Context not found', 'CONTEXT_NOT_FOUND', 404);
      }

      // Decrypt content if needed
      const processedVersions = versions.map(version => {
        let content = version.content;
        if (context.isEncrypted) {
          try {
            content = JSON.parse(decrypt(content));
          } catch (error) {
            logger.error('Error decrypting version:', error);
            content = { error: 'Failed to decrypt content' };
          }
        }

        return {
          version: version.version,
          content,
          metadata: version.metadata,
          changeReason: version.changeReason,
          changedBy: version.changedBy,
          createdAt: version.createdAt,
        };
      });

      return processedVersions;
    }, 'GET_CONTEXT_VERSIONS', 'user_context');
  }

  // Delete expired contexts
  async cleanupExpiredContexts(): Promise<ServiceResponse<{ deleted: number }>> {
    return this.handleServiceOperation(async () => {
      const now = new Date();
      
      const deleted = await pgDb
        .delete(userContexts)
        .where(lte(userContexts.expiresAt, now))
        .returning({ id: userContexts.id });

      // Also delete related versions
      if (deleted.length > 0) {
        const contextIds = deleted.map(d => d.id);
        await pgDb
          .delete(userContextVersions)
          .where(inArray(userContextVersions.contextId, contextIds));
      }

      // Log audit
      logAudit({
        userId: this.context?.userId || 'system',
        organizationId: this.context?.organizationId,
        action: 'EXPIRED_CONTEXTS_CLEANUP',
        resource: 'user_context',
        ipAddress: this.context?.ipAddress,
        userAgent: this.context?.userAgent,
        metadata: { deletedCount: deleted.length },
        status: 'success',
      });

      return { deleted: deleted.length };
    }, 'CLEANUP_EXPIRED_CONTEXTS', 'user_context');
  }

  private generateCacheKey(request: ContextRequest): string {
    const parts = [
      'context',
      request.userId,
      request.sessionId || 'no-session',
      request.includeProfile ? 'profile' : '',
      request.includePreferences ? 'prefs' : '',
      request.includeActivity ? 'activity' : '',
      request.includePermissions ? 'perms' : '',
    ];
    return parts.filter(Boolean).join(':');
  }

  private isCacheValid(context: ContextData): boolean {
    // Check if cache is still valid based on timestamp
    return true; // Simplified for now
  }

  private invalidateUserCache(userId: string): void {
    // Remove all cache entries for this user
    for (const [key] of this.contextCache) {
      if (key.includes(userId)) {
        this.contextCache.delete(key);
      }
    }
  }

  private updateActivityCache(userId: string, activity: ActivityItem): void {
    // Find and update cached context with new activity
    for (const [key, context] of this.contextCache) {
      if (key.includes(userId) && context.recentActivity) {
        context.recentActivity.unshift(activity);
        // Keep only last 50 activities
        context.recentActivity = context.recentActivity.slice(0, 50);
      }
    }
  }

  private async getFromCache(key: string): Promise<any> {
    const cached = this.contextCache.get(key);
    if (cached && this.isCacheValid(cached)) {
      return cached;
    }
    this.contextCache.delete(key);
    return null;
  }

  private async setCache(key: string, data: any, ttlSeconds?: number): Promise<void> {
    this.contextCache.set(key, {
      ...data,
      _cachedAt: Date.now(),
      _ttl: ttlSeconds ? ttlSeconds * 1000 : this.cacheTimeout
    });
  }

  private async getUserPreferences(userId: string): Promise<UserPreferences> {
    // This would fetch from database
    return {
      theme: 'auto',
      language: 'en',
      timezone: 'UTC',
      notifications: {
        email: true,
        push: true,
        sms: false,
        frequency: 'daily',
        categories: ['security', 'updates', 'marketing'],
      },
      ui: {
        layout: 'comfortable',
        sidebarCollapsed: false,
        showTooltips: true,
        autoSave: true,
        defaultDashboard: 'overview',
      },
      privacy: {
        dataCollection: true,
        analytics: true,
        marketing: false,
        sharing: false,
        retentionDays: 365,
      },
    };
  }

  private async getUserProfile(userId: string): Promise<UserProfile> {
    // This would fetch from database
    return {
      id: userId,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'user',
      skills: ['JavaScript', 'React', 'Node.js'],
      certifications: [],
      lastLogin: new Date(),
    };
  }

  private async getUserPermissions(userId: string): Promise<string[]> {
    // This would fetch from RBAC system
    return ['read:own_data', 'write:own_data', 'read:public_data'];
  }

  private async getUserMetadata(userId: string): Promise<Record<string, any>> {
    // This would fetch from database
    return {
      lastSeen: new Date(),
      loginCount: 42,
      preferredDevices: ['desktop'],
    };
  }

  private async saveUserPreferences(userId: string, preferences: UserPreferences): Promise<void> {
    // This would save to database
    logger.info('Saving preferences for user:', userId);
  }

  private async saveUserProfile(userId: string, profile: UserProfile): Promise<void> {
    // This would save to database
    logger.info('Saving profile for user:', userId);
  }

  private async storeActivity(activity: ActivityItem): Promise<void> {
    try {
      await pgDb.insert(userActivities).values({
        id: activity.id,
        userId: activity.userId || this.context?.userId || 'system',
        organizationId: this.context?.organizationId,
        sessionId: activity.resourceId,
        activityType: activity.type,
        resource: activity.resource,
        resourceId: activity.resourceId,
        details: activity.details,
        ipAddress: activity.ipAddress,
        userAgent: activity.userAgent,
        timestamp: activity.timestamp,
      });
    } catch (error) {
      logger.error('Error storing activity:', error);
      throw error;
    }
  }

  private async addUserCertification(userId: string, certification: Certification): Promise<void> {
    // This would add to database
    logger.info('Adding certification for user:', userId);
  }

  // Required abstract methods from BaseService
  async create(data: any): Promise<ServiceResponse> {
    return this.getContext(data);
  }

  async findById(id: string): Promise<ServiceResponse> {
    return this.getSessionContext(id);
  }

  async update(id: string, data: any): Promise<ServiceResponse> {
    return this.updatePreferences(id, data);
  }

  async delete(id: string): Promise<ServiceResponse> {
    return this.clearUserCache(id);
  }

  async list(options: any): Promise<ServiceResponse<any[]>> {
    return this.handleServiceOperation(async () => {
      const { userId, organizationId, limit = 100, offset = 0 } = options;
      
      if (!userId) {
        throw new ServiceError('User ID is required', 'MISSING_USER_ID', 400);
      }

      // Get contexts from cache or database
      const cacheKey = `contexts:${userId}:${organizationId}`;
      let contexts = await this.getFromCache(cacheKey);
      
      if (!contexts) {
        // Fetch from database
        const db = require('../db/connection').db;
        const { userContexts } = require('../db/drizzle-schema');
        const { eq, and, desc, limit: sqlLimit, offset: sqlOffset } = require('drizzle-orm');
        
        const results = await pgDb
          .select()
          .from(userContexts)
          .where(and(
            eq(userContexts.userId, userId),
            organizationId ? eq(userContexts.organizationId, organizationId) : undefined
          ))
          .orderBy(desc(userContexts.updatedAt))
          .limit(limit)
          .offset(offset);
        
        contexts = results.map((ctx: any) => ({
          id: ctx.id,
          type: ctx.type,
          content: ctx.content,
          metadata: ctx.metadata,
          createdAt: ctx.createdAt,
          updatedAt: ctx.updatedAt,
          expiresAt: ctx.expiresAt
        }));
        
        // Cache for 5 minutes
        await this.setCache(cacheKey, contexts, 300);
      }
      
      return contexts;
    }, 'LIST_CONTEXTS', 'user_context');
  }
}
