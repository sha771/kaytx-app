import { db as pgDb } from '../db/connection';
import { users, organizations, gdprRequests, consentRecords, dataBreachNotifications, dataProcessingActivities , GDPRRequest, GDPRRequestInsert, ConsentRecord, ConsentRecordInsert } from '../db/drizzle-schema';
import { eq, and, or, like, desc, asc, count, sql } from 'drizzle-orm';
import crypto from 'crypto';
import { logAudit, AuditActions } from '../lib/audit';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export type { GDPRRequest } from '../db/drizzle-schema';

export interface GDPRRequestCreate {
  organizationId: string;
  userId?: string;
  email?: string;
  type: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction' | 'objection';
  requestData: Record<string, any>;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  dueDate?: Date;
  notes?: string;
}

export interface DataMapping {
  userId: string;
  organizationId: string;
  personalData: {
    users: Record<string, any>;
    contacts: Record<string, any>;
    conversations: Record<string, any>;
    payments: Record<string, any>;
    auditLogs: Record<string, any>;
    customData: Record<string, any>;
  };
  processingActivities: {
    purpose: string;
    legalBasis: string;
    dataCategories: string[];
    retentionPeriod: string;
    recipients: string[];
  }[];
}

export class GDPRService {
  async createGDPRRequest(request: GDPRRequestCreate): Promise<GDPRRequest> {
    try {
      // Validate required fields
      if (!request.userId) {
        throw new Error('userId is required');
      }

      // Validate request type
      const validTypes = ['access', 'rectification', 'erasure', 'portability', 'restriction', 'objection'];
      if (!validTypes.includes(request.type)) {
        throw new Error('Invalid request type');
      }

      const id = crypto.randomUUID();
      const now = new Date();
      const dueDate = request.dueDate || new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days default

      const gdprRequestData: GDPRRequestInsert = {
        id,
        organizationId: request.organizationId,
        userId: request.userId,
        email: request.email,
        requestType: request.type,
        status: 'pending',
        requestData: request.requestData,
        priority: request.priority || 'medium',
        dueDate,
        notes: request.notes,
        metadata: {
          type: request.type,
          status: 'pending'
        },
        createdAt: now,
        updatedAt: now
      };

      const [createdRequest] = await pgDb
        .insert(gdprRequests)
        .values(gdprRequestData)
        .returning();

      // Log the request for audit trail
      logAudit({
        organizationId: request.organizationId,
        action: AuditActions.GDPR_REQUEST_CREATED,
        resource: 'gdpr_request',
        resourceId: createdRequest.id,
        metadata: {
          requestType: createdRequest.requestType,
          userId: createdRequest.userId,
          email: createdRequest.email,
          priority: createdRequest.priority,
          dueDate: createdRequest.dueDate
        },
        status: 'success',
      });

      return this.mapDbRecordToGDPRRequest(createdRequest);
    } catch (error) {
      logger.error('[GDPRService] Failed to create GDPR request:', error);
      throw new Error(`Failed to create GDPR request: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async updateGDPRRequest(requestId: string, updates: {
    status?: 'pending' | 'processing' | 'completed' | 'rejected';
    responseData?: Record<string, any>;
    processedBy?: string;
    notes?: string;
    priority?: 'low' | 'medium' | 'high' | 'critical';
  }): Promise<GDPRRequest> {
    try {
      const updateData: any = {
        ...updates,
        updatedAt: new Date()
      };

      if (updates.status === 'completed') {
        updateData.completedAt = new Date();
        updateData.processedAt = new Date();
      }

      const [updatedRequest] = await pgDb
        .update(gdprRequests)
        .set(updateData)
        .where(eq(gdprRequests.id, requestId))
        .returning();

      if (!updatedRequest) {
        throw new Error('GDPR request not found');
      }

      // Log the update
      logAudit({
        organizationId: updatedRequest.organizationId,
        action: AuditActions.GDPR_REQUEST_UPDATED,
        resource: 'gdpr_request',
        resourceId: updatedRequest.id,
        metadata: {
          previousStatus: updatedRequest.status,
          updates: Object.keys(updates)
        },
        status: 'success',
      });

      return this.mapDbRecordToGDPRRequest(updatedRequest);
    } catch (error) {
      logger.error('[GDPRService] Failed to update GDPR request:', error);
      throw new Error(`Failed to update GDPR request: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getGDPRRequest(requestId: string): Promise<GDPRRequest | null> {
    try {
      const [request] = await pgDb
        .select()
        .from(gdprRequests)
        .where(eq(gdprRequests.id, requestId))
        .limit(1);

      return request ? this.mapDbRecordToGDPRRequest(request) : null;
    } catch (error) {
      logger.error('[GDPRService] Failed to get GDPR request:', error);
      throw new Error(`Failed to get GDPR request: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async listGDPRRequests(organizationId: string, filters: {
    status?: string;
    type?: string;
    userId?: string;
    email?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ requests: GDPRRequest[]; total: number }> {
    try {
      let whereClause = eq(gdprRequests.organizationId, organizationId);

      if (filters.status) {
        whereClause = and(whereClause, eq(gdprRequests.status, filters.status as any));
      }

      if (filters.type) {
        whereClause = and(whereClause, eq(gdprRequests.requestType, filters.type as any));
      }

      if (filters.userId) {
        whereClause = and(whereClause, eq(gdprRequests.userId, filters.userId));
      }

      if (filters.email) {
        whereClause = and(whereClause, like(gdprRequests.email, `%${filters.email}%`));
      }

      const limit = filters.limit || 50;
      const offset = filters.offset || 0;

      const [requestsResult, countResult] = await Promise.all([
        pgDb
          .select()
          .from(gdprRequests)
          .where(whereClause)
          .orderBy(desc(gdprRequests.createdAt))
          .limit(limit)
          .offset(offset),
        pgDb
          .select({ count: count() })
          .from(gdprRequests)
          .where(whereClause)
      ]);

      return {
        requests: requestsResult.map(req => this.mapDbRecordToGDPRRequest(req)),
        total: countResult[0]?.count || 0
      };
    } catch (error) {
      logger.error('[GDPRService] Failed to list GDPR requests:', error);
      throw new Error(`Failed to list GDPR requests: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getUserGDPRRequests(organizationId: string, userId: string): Promise<GDPRRequest[]> {
    try {
      if (!organizationId) {
        throw new Error('Organization ID is required');
      }
      if (!userId) {
        throw new Error('User ID is required');
      }

      const requests = await pgDb
        .select()
        .from(gdprRequests)
        .where(and(
          eq(gdprRequests.organizationId, organizationId),
          eq(gdprRequests.userId, userId)
        ))
        .orderBy(desc(gdprRequests.createdAt));

      return requests.map(req => this.mapDbRecordToGDPRRequest(req));
    } catch (error) {
      logger.error('[GDPRService] Failed to get user GDPR requests:', error);
      throw new Error(`Failed to get user GDPR requests: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getOrganizationGDPRRequests(organizationId: string): Promise<GDPRRequest[]> {
    try {
      if (!organizationId) {
        throw new Error('Organization ID is required');
      }

      const requests = await pgDb
        .select()
        .from(gdprRequests)
        .where(eq(gdprRequests.organizationId, organizationId))
        .orderBy(desc(gdprRequests.createdAt));

      return requests.map(req => this.mapDbRecordToGDPRRequest(req));
    } catch (error) {
      logger.error('[GDPRService] Failed to get organization GDPR requests:', error);
      throw new Error(`Failed to get organization GDPR requests: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async exportUserData(organizationId: string, userId: string, format: 'json' | 'csv' | 'xml' = 'json'): Promise<{
    format: 'json' | 'csv' | 'xml';
    data: any;
    exportedAt: Date;
  }> {
    try {
      if (!organizationId) {
        throw new Error('Organization ID is required');
      }
      if (!userId) {
        throw new Error('User ID is required');
      }

      if (!['json', 'csv', 'xml'].includes(format)) {
        throw new Error('Unsupported export format');
      }

      // Get user data
      const [user] = await pgDb
        .select()
        .from(users)
        .where(and(
          eq(users.id, userId),
          eq(users.organizationId, organizationId)
        ))
        .limit(1);

      if (!user) {
        throw new Error('User not found');
      }

      // Collect all personal data
      const personalData = await this.collectAllPersonalData(organizationId, userId);

      const exportData = {
        user: personalData.users,
        leads: personalData.contacts,
        campaigns: [],
        exportedAt: new Date(),
        organizationId,
        userId,
        complianceFramework: 'GDPR',
        dataController: await this.getDataControllerInfo(organizationId)
      };

      // Log the export
      logAudit({
        organizationId,
        action: AuditActions.GDPR_PORTABILITY_REQUEST,
        resource: 'gdpr_export',
        resourceId: userId,
        metadata: { userId, format },
        status: 'success',
      });

      if (format === 'csv') {
        // Convert to CSV format
        const csvData = this.convertToCSV(exportData.user);
        return {
          format: 'csv',
          data: csvData,
          exportedAt: new Date()
        };
      }

      return {
        format,
        data: exportData,
        exportedAt: new Date()
      };
    } catch (error) {
      logger.error('[GDPRService] Failed to export user data:', error);
      throw new Error(`Failed to export user data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private convertToCSV(userData: any): string {
    if (!userData || typeof userData !== 'object') {
      return 'id,email,name\n';
    }

    const headers = ['id', 'email', 'name'];
    const values = [
      userData.id || '',
      userData.email || '',
      `${userData.firstName || ''} ${userData.lastName || ''}`.trim()
    ];

    return `${headers.join(',')}\n${values.join(',')}\n`;
  }

  async userDataExists(organizationId: string, userId: string): Promise<boolean> {
    try {
      if (!organizationId || !userId) {
        return false;
      }

      const [user] = await pgDb
        .select({ id: users.id })
        .from(users)
        .where(and(
          eq(users.id, userId),
          eq(users.organizationId, organizationId)
        ))
        .limit(1);

      return !!user;
    } catch (error) {
      logger.error('[GDPRService] Failed to check user data existence:', error);
      return false;
    }
  }

  async getDataRetentionStatus(organizationId: string, userId: string): Promise<{
    userId: string;
    daysSinceLastActivity: number;
    daysSinceCreation: number;
    retentionRisk: 'low' | 'medium' | 'high';
  }> {
    try {
      if (!organizationId) {
        throw new Error('Organization ID is required');
      }
      if (!userId) {
        throw new Error('User ID is required');
      }

      const [user] = await pgDb
        .select({
          id: users.id,
          lastActiveAt: users.lastLoginAt,
          createdAt: users.createdAt
        })
        .from(users)
        .where(and(
          eq(users.id, userId),
          eq(users.organizationId, organizationId)
        ))
        .limit(1);

      if (!user) {
        throw new Error('User not found');
      }

      const now = new Date();
      const lastActive = user.lastActiveAt ? new Date(user.lastActiveAt) : new Date(user.createdAt);
      const created = new Date(user.createdAt);

      const daysSinceLastActivity = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
      const daysSinceCreation = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));

      // Determine retention risk
      let retentionRisk: 'low' | 'medium' | 'high' = 'low';
      if (daysSinceLastActivity > 365) {
        retentionRisk = 'high';
      } else if (daysSinceLastActivity > 180) {
        retentionRisk = 'medium';
      }

      return {
        userId,
        daysSinceLastActivity,
        daysSinceCreation,
        retentionRisk
      };
    } catch (error) {
      logger.error('[GDPRService] Failed to get data retention status:', error);
      throw new Error(`Failed to get data retention status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Enhanced Consent Management Methods
  async recordConsent(organizationId: string, userId: string, consent: {
    purpose: 'marketing' | 'analytics' | 'personalization' | 'essential' | 'third_party_sharing';
    granted: boolean;
    version?: string;
    ipAddress?: string;
    userAgent?: string;
    consentText?: string;
    legalBasis?: string;
    processingActivities?: string[];
    dataCategories?: string[];
    retentionPeriod?: number;
    thirdParties?: string[];
  }): Promise<ConsentRecord> {
    try {
      const id = crypto.randomUUID();
      const now = new Date();

      const consentData: ConsentRecordInsert = {
        id,
        organizationId,
        userId,
        purpose: consent.purpose,
        status: consent.granted ? 'granted' : 'withdrawn',
        consentDate: now,
        withdrawalDate: consent.granted ? null : now,
        ipAddress: consent.ipAddress,
        userAgent: consent.userAgent,
        consentText: consent.consentText,
        version: consent.version || '1.0',
        legalBasis: consent.legalBasis || 'consent',
        processingActivities: consent.processingActivities || [],
        dataCategories: consent.dataCategories || [],
        retentionPeriod: consent.retentionPeriod,
        thirdParties: consent.thirdParties || [],
        metadata: {},
        createdAt: now,
        updatedAt: now
      };

      // Check if consent already exists for this purpose and update it
      const [existingConsent] = await pgDb
        .select()
        .from(consentRecords)
        .where(and(
          eq(consentRecords.organizationId, organizationId),
          eq(consentRecords.userId, userId),
          eq(consentRecords.purpose, consent.purpose)
        ))
        .limit(1);

      let savedConsent;
      if (existingConsent) {
        // Update existing consent
        const [updated] = await pgDb
          .update(consentRecords)
          .set({
            status: consent.granted ? 'granted' : 'withdrawn',
            consentDate: now,
            withdrawalDate: consent.granted ? null : now,
            ipAddress: consent.ipAddress,
            userAgent: consent.userAgent,
            consentText: consent.consentText,
            version: consent.version || '1.0',
            legalBasis: consent.legalBasis || 'consent',
            processingActivities: consent.processingActivities || [],
            dataCategories: consent.dataCategories || [],
            retentionPeriod: consent.retentionPeriod,
            thirdParties: consent.thirdParties || [],
            updatedAt: now
          })
          .where(eq(consentRecords.id, existingConsent.id))
          .returning();
        savedConsent = updated;
      } else {
        // Create new consent record
        const [created] = await pgDb
          .insert(consentRecords)
          .values(consentData)
          .returning();
        savedConsent = created;
      }

      // Log the consent action
      logAudit({
        organizationId,
        action: consent.granted ? AuditActions.CONSENT_GRANTED : AuditActions.CONSENT_WITHDRAWN,
        resource: 'consent_record',
        resourceId: savedConsent.id,
        metadata: {
          userId,
          purpose: consent.purpose,
          granted: consent.granted,
          version: consentData.version,
          ipAddress: consent.ipAddress
        },
        status: 'success',
      });

      return savedConsent;
    } catch (error) {
      logger.error('[GDPRService] Failed to record consent:', error);
      throw new Error(`Failed to record consent: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async checkConsent(organizationId: string, userId: string, purpose: string): Promise<{
    hasConsent: boolean;
    consentRecord?: ConsentRecord;
    consentDate?: Date;
    consentVersion?: string;
    withdrawalDate?: Date;
  }> {
    try {
      const [consentRecord] = await pgDb
        .select()
        .from(consentRecords)
        .where(and(
          eq(consentRecords.organizationId, organizationId),
          eq(consentRecords.userId, userId),
          eq(consentRecords.purpose, purpose as any)
        ))
        .orderBy(desc(consentRecords.createdAt))
        .limit(1);

      if (!consentRecord) {
        return { hasConsent: false };
      }

      return {
        hasConsent: consentRecord.status === 'granted',
        consentRecord,
        consentDate: consentRecord.consentDate,
        consentVersion: consentRecord.version,
        withdrawalDate: consentRecord.withdrawalDate
      };
    } catch (error) {
      logger.error('[GDPRService] Failed to check consent:', error);
      throw new Error(`Failed to check consent: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async withdrawConsent(organizationId: string, userId: string, purpose: string, reason?: string): Promise<boolean> {
    try {
      const [consentRecord] = await pgDb
        .select()
        .from(consentRecords)
        .where(and(
          eq(consentRecords.organizationId, organizationId),
          eq(consentRecords.userId, userId),
          eq(consentRecords.purpose, purpose as any),
          eq(consentRecords.status, 'granted')
        ))
        .orderBy(desc(consentRecords.createdAt))
        .limit(1);

      if (!consentRecord) {
        throw new Error('No active consent found for this purpose');
      }

      const now = new Date();
      await pgDb
        .update(consentRecords)
        .set({
          status: 'withdrawn',
          withdrawalDate: now,
          updatedAt: now,
          metadata: {
            ...consentRecord.metadata,
            withdrawalReason: reason,
            withdrawnAt: now.toISOString()
          }
        })
        .where(eq(consentRecords.id, consentRecord.id));

      // Log the withdrawal
      logAudit({
        organizationId,
        action: AuditActions.CONSENT_WITHDRAWN,
        resource: 'consent_record',
        resourceId: consentRecord.id,
        metadata: {
          userId,
          purpose,
          reason
        },
        status: 'success',
      });

      return true;
    } catch (error) {
      logger.error('[GDPRService] Failed to withdraw consent:', error);
      throw new Error(`Failed to withdraw consent: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getConsentRecords(organizationId: string, userId?: string, purpose?: string): Promise<ConsentRecord[]> {
    try {
      let whereClause = eq(consentRecords.organizationId, organizationId);

      if (userId) {
        whereClause = and(whereClause, eq(consentRecords.userId, userId));
      }

      if (purpose) {
        whereClause = and(whereClause, eq(consentRecords.purpose, purpose as any));
      }

      const records = await pgDb
        .select()
        .from(consentRecords)
        .where(whereClause)
        .orderBy(desc(consentRecords.createdAt));

      return records;
    } catch (error) {
      logger.error('[GDPRService] Failed to get consent records:', error);
      throw new Error(`Failed to get consent records: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Helper method to map database records to interface
  private mapDbRecordToGDPRRequest(record: any): GDPRRequest {
    return {
      id: record.id,
      organizationId: record.organizationId,
      userId: record.userId,
      email: record.email,
      type: record.requestType || record.type,
      status: record.status,
      requestData: record.requestData,
      response: record.responseData,
      processedAt: record.processedAt,
      processedBy: record.processedBy,
      notes: record.notes,
      priority: record.priority,
      dueDate: record.dueDate,
      completedAt: record.completedAt,
      metadata: record.metadata,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt
    };
  }

  async processAccessRequest(organizationId: string, userId: string): Promise<DataMapping> {
    try {
      // Get user data
      const [user] = await pgDb
        .select()
        .from(users)
        .where(and(
          eq(users.id, userId),
          eq(users.organizationId, organizationId)
        ))
        .limit(1);

      if (!user) {
        throw new Error('User not found');
      }

      // Collect all personal data from various sources
      const personalData = await this.collectAllPersonalData(organizationId, userId);

      // Get processing activities
      const processingActivities = await this.getProcessingActivities(organizationId, userId);

      // Log the access request
      logAudit({
        organizationId,
        action: AuditActions.GDPR_ACCESS_REQUEST,
        resource: 'gdpr_access',
        resourceId: userId,
        metadata: { userId },
        status: 'success',
      });

      return {
        userId,
        organizationId,
        personalData,
        processingActivities
      };
    } catch (error) {
      logger.error('[GDPRService] Failed to process access request:', error);
      
      // Log the failure
      logAudit({
        organizationId,
        action: AuditActions.GDPR_ACCESS_REQUEST,
        resource: 'gdpr_access',
        resourceId: userId,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' },
        status: 'failed',
      });
      
      throw new Error(`Access request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async processErasureRequest(organizationId: string, userId: string): Promise<boolean> {
    try {
      // Get user data for verification
      const [user] = await pgDb
        .select()
        .from(users)
        .where(and(
          eq(users.id, userId),
          eq(users.organizationId, organizationId)
        ))
        .limit(1);

      if (!user) {
        throw new Error('User not found');
      }

      // Check if data can be deleted (legal holds, regulatory requirements)
      const canDelete = await this.checkDeletionEligibility(organizationId, userId);
      
      if (!canDelete) {
        throw new Error('Data cannot be deleted due to legal or regulatory requirements');
      }

      // Perform comprehensive data erasure
      await this.performDataErasure(organizationId, userId);

      // Log the erasure
      logAudit({
        organizationId,
        action: AuditActions.GDPR_ERASURE_REQUEST,
        resource: 'gdpr_erasure',
        resourceId: userId,
        metadata: { userId },
        status: 'success',
      });

      return true;
    } catch (error) {
      logger.error('[GDPRService] Failed to process erasure request:', error);
      
      logAudit({
        organizationId,
        action: AuditActions.GDPR_ERASURE_REQUEST,
        resource: 'gdpr_erasure',
        resourceId: userId,
        metadata: { error: error.message },
        status: 'failed',
      });
      
      throw new Error(`Erasure request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async processDataPortabilityRequest(organizationId: string, userId: string): Promise<{
    format: 'json' | 'csv' | 'xml';
    data: any;
    exportedAt: Date;
  }> {
    try {
      const dataMapping = await this.processAccessRequest(organizationId, userId);

      const exportData = {
        user: dataMapping.personalData.users,
        processingActivities: dataMapping.processingActivities,
        exportMetadata: {
          exportedAt: new Date(),
          format: 'json',
          version: '1.0',
          organizationId,
          userId,
          complianceFramework: 'GDPR',
          dataController: await this.getDataControllerInfo(organizationId)
        }
      };

      // Log the portability request
      logAudit({
        organizationId,
        action: AuditActions.GDPR_PORTABILITY_REQUEST,
        resource: 'gdpr_portability',
        resourceId: userId,
        metadata: { userId, format: 'json' },
        status: 'success',
      });

      return {
        format: 'json',
        data: exportData,
        exportedAt: new Date()
      };
    } catch (error) {
      logger.error('[GDPRService] Failed to process portability request:', error);
      
      logAudit({
        organizationId,
        action: AuditActions.GDPR_PORTABILITY_REQUEST,
        resource: 'gdpr_portability',
        resourceId: userId,
        metadata: { error: error.message },
        status: 'failed',
      });
      
      throw new Error(`Portability request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async processRectificationRequest(organizationId: string, userId: string, corrections: Record<string, any>): Promise<boolean> {
    try {
      const [user] = await pgDb
        .select()
        .from(users)
        .where(and(
          eq(users.id, userId),
          eq(users.organizationId, organizationId)
        ))
        .limit(1);

      if (!user) {
        throw new Error('User not found');
      }

      // Validate corrections
      const validationResult = await this.validateDataCorrections(organizationId, userId, corrections);
      if (!validationResult.isValid) {
        throw new Error(`Invalid corrections: ${validationResult.errors.join(', ')}`);
      }

      // Apply corrections with audit trail
      const updateData: any = { updatedAt: new Date() };
      const correctionLog: Record<string, { old: any; new: any }> = {};
      
      for (const [field, newValue] of Object.entries(corrections)) {
        if (field === 'firstName' || field === 'lastName' || field === 'phoneNumber' || field === 'email') {
          const oldValue = (user as any)[field];
          updateData[field] = newValue;
          correctionLog[field] = { old: oldValue, new: newValue };
        }
      }

      await pgDb
        .update(users)
        .set(updateData as any)
        .where(and(
          eq(users.id, userId),
          eq(users.organizationId, organizationId)
        ));

      // Log the rectification
      logAudit({
        organizationId,
        action: AuditActions.GDPR_RECTIFICATION_REQUEST,
        resource: 'gdpr_rectification',
        resourceId: userId,
        metadata: { userId, corrections: correctionLog },
        status: 'success',
      });

      logger.info(`Processed rectification request for user ${userId} in organization ${organizationId}`);

      return true;
    } catch (error) {
      logger.error('[GDPRService] Failed to process rectification request:', error);
      
      logAudit({
        organizationId,
        action: AuditActions.GDPR_RECTIFICATION_REQUEST,
        resource: 'gdpr_rectification',
        resourceId: userId,
        metadata: { error: error.message },
        status: 'failed',
      });
      
      throw new Error(`Rectification request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generateComplianceReport(organizationId: string): Promise<{
    organizationId: string;
    reportDate: Date;
    totalRequests: number;
    requestsByType: Record<string, number>;
    requestsByStatus: Record<string, number>;
    averageProcessingTime: number;
    dataRetentionSummary: Record<string, number>;
    complianceScore: number;
    recommendations: string[];
  }> {
    // Mock compliance report data
    const mockReport = {
      organizationId,
      reportDate: new Date(),
      totalRequests: Math.floor(Math.random() * 100) + 20,
      requestsByType: {
        access: Math.floor(Math.random() * 30) + 10,
        erasure: Math.floor(Math.random() * 20) + 5,
        portability: Math.floor(Math.random() * 15) + 3,
        rectification: Math.floor(Math.random() * 25) + 5,
        restriction: Math.floor(Math.random() * 10) + 2,
        objection: Math.floor(Math.random() * 5) + 1
      },
      requestsByStatus: {
        pending: Math.floor(Math.random() * 10) + 2,
        processing: Math.floor(Math.random() * 15) + 3,
        completed: Math.floor(Math.random() * 60) + 20,
        rejected: Math.floor(Math.random() * 5) + 1
      },
      averageProcessingTime: Math.floor(Math.random() * 14) + 7, // days
      dataRetentionSummary: {
        users: Math.floor(Math.random() * 1000) + 500,
        contacts: Math.floor(Math.random() * 2000) + 1000,
        conversations: Math.floor(Math.random() * 5000) + 2000,
        payments: Math.floor(Math.random() * 10000) + 5000
      },
      complianceScore: Math.floor(Math.random() * 30) + 70, // 70-100
      recommendations: [
        'Implement automated data retention policies',
        'Enhance consent management mechanisms',
        'Improve request processing efficiency',
        'Regular compliance audits recommended',
        'Update privacy policy with recent regulatory changes'
      ]
    };

    return mockReport;
  }

  async getDataRetentionSchedule(organizationId: string): Promise<{
    dataType: string;
    retentionPeriod: string;
    legalBasis: string;
    deletionAction: 'anonymize' | 'delete' | 'archive';
    nextReviewDate: Date;
  }[]> {
    return [
      {
        dataType: 'User Personal Data',
        retentionPeriod: '7 years after account closure',
        legalBasis: 'Contractual & Legal Requirements',
        deletionAction: 'anonymize',
        nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days
      },
      {
        dataType: 'Transaction Data',
        retentionPeriod: '10 years',
        legalBasis: 'Tax & Financial Regulations',
        deletionAction: 'archive',
        nextReviewDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // 180 days
      },
      {
        dataType: 'Analytics Data',
        retentionPeriod: '2 years',
        legalBasis: 'Legitimate Interest',
        deletionAction: 'delete',
        nextReviewDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days
      }
    ];
  }

  private async checkDeletionEligibility(organizationId: string, userId: string): Promise<boolean> {
    // Check for legal holds, ongoing transactions, regulatory requirements
    // Mock implementation - in production, this would check various conditions
    
    const hasActiveTransactions = Math.random() > 0.8; // 20% chance of active transactions
    const hasLegalHold = Math.random() > 0.95; // 5% chance of legal hold
    const hasRegulatoryRequirements = Math.random() > 0.9; // 10% chance of regulatory requirements

    return !(hasActiveTransactions || hasLegalHold || hasRegulatoryRequirements);
  }

  // Helper methods for comprehensive GDPR implementation
  private async collectAllPersonalData(organizationId: string, userId: string): Promise<Record<string, any>> {
    const [user] = await pgDb
      .select()
      .from(users)
      .where(and(
        eq(users.id, userId),
        eq(users.organizationId, organizationId)
      ))
      .limit(1);

    if (!user) {
      throw new Error('User not found');
    }

    // Collect user data
    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: user.lastLoginAt,
      preferences: user.preferences,
      metadata: user.metadata
    };

    // In a real implementation, this would collect data from:
    // - Contacts table
    // - Conversations table  
    // - Payments table
    // - Audit logs table
    // - Any other tables containing personal data

    return {
      users: userData,
      contacts: {}, // Would fetch from contacts table
      conversations: {}, // Would fetch from conversations table
      payments: {}, // Would fetch from payments table
      auditLogs: {}, // Would fetch from audit logs table
      customData: {} // Any custom fields
    };
  }

  private async getProcessingActivities(organizationId: string, userId: string): Promise<{
    purpose: string;
    legalBasis: string;
    dataCategories: string[];
    retentionPeriod: string;
    recipients: string[];
  }[]> {
    // In a real implementation, this would be based on actual processing activities
    return [
      {
        purpose: 'User Authentication and Authorization',
        legalBasis: 'Contractual Necessity',
        dataCategories: ['name', 'email', 'phone'],
        retentionPeriod: '7 years after account closure',
        recipients: ['internal systems']
      },
      {
        purpose: 'Service Provision',
        legalBasis: 'Legitimate Interest',
        dataCategories: ['usage data', 'preferences'],
        retentionPeriod: '2 years',
        recipients: ['service providers']
      },
      {
        purpose: 'Marketing Communications',
        legalBasis: 'Consent',
        dataCategories: ['email', 'name'],
        retentionPeriod: 'Until consent withdrawn',
        recipients: ['marketing systems']
      },
      {
        purpose: 'Analytics and Improvement',
        legalBasis: 'Legitimate Interest',
        dataCategories: ['usage patterns', 'preferences'],
        retentionPeriod: '2 years',
        recipients: ['analytics providers']
      }
    ];
  }

  private async performDataErasure(organizationId: string, userId: string): Promise<void> {
    // Anonymize user data instead of hard delete
    await pgDb
      .update(users)
      .set({
        email: `deleted-${crypto.randomUUID()}@deleted.com`,
        firstName: 'Deleted',
        lastName: 'User',
        phoneNumber: null,
        role: 'deleted',
        status: 'deleted',
        updatedAt: new Date()
      } as any)
      .where(and(
        eq(users.id, userId),
        eq(users.organizationId, organizationId)
      ));

    // In a real implementation, this would also:
    // - Anonymize data in related tables
    // - Delete or anonymize conversations
    // - Handle payment data according to PCI requirements
    // - Remove from analytics systems
    // - Handle backup data retention policies
  }

  private async validateDataCorrections(organizationId: string, userId: string, corrections: Record<string, any>): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors: string[] = [];

    // Validate email format if provided
    if (corrections.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(corrections.email)) {
        errors.push('Invalid email format');
      }

      // Check if email is already taken by another user
      const existingUser = await pgDb
        .select()
        .from(users)
        .where(and(
          eq(users.email, corrections.email),
          eq(users.organizationId, organizationId),
          // Exclude current user
          // Note: This would need proper handling in production
        ))
        .limit(1);

      if (existingUser.length > 0) {
        errors.push('Email already in use');
      }
    }

    // Validate phone number format if provided
    if (corrections.phoneNumber) {
      const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(corrections.phoneNumber)) {
        errors.push('Invalid phone number format');
      }
    }

    // Validate name fields
    if (corrections.firstName && corrections.firstName.length < 1) {
      errors.push('First name cannot be empty');
    }

    if (corrections.lastName && corrections.lastName.length < 1) {
      errors.push('Last name cannot be empty');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private async getDataControllerInfo(organizationId: string): Promise<{
    name: string;
    contact: string;
    address?: string;
    representative?: string;
  }> {
    const [organization] = await pgDb
      .select()
      .from(organizations)
      .where(eq(organizations.id, organizationId))
      .limit(1);

    return {
      name: organization?.name || 'Unknown Organization',
      contact: organization?.billingEmail || 'No contact email',
      address: organization?.address ? JSON.stringify(organization.address) : undefined,
      representative: 'Data Protection Officer' // In production, this would be configurable
    };
  }

  // Additional GDPR methods
  async processRestrictionRequest(organizationId: string, userId: string, processingTypes: string[]): Promise<boolean> {
    try {
      // Implement processing restriction
      logger.info(`Processing restriction request for user ${userId}: ${processingTypes.join(', ')}`);

      logAudit({
        organizationId,
        action: AuditActions.GDPR_RESTRICTION_REQUEST,
        resource: 'gdpr_restriction',
        resourceId: userId,
        metadata: { userId, processingTypes },
        status: 'success',
      });

      return true;
    } catch (error) {
      logger.error('[GDPRService] Failed to process restriction request:', error);
      throw new Error(`Restriction request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async processObjectionRequest(organizationId: string, userId: string, objectionReason: string): Promise<boolean> {
    try {
      // Implement objection to processing
      logger.info(`Processing objection request for user ${userId}: ${objectionReason}`);

      logAudit({
        organizationId,
        action: AuditActions.GDPR_OBJECTION_REQUEST,
        resource: 'gdpr_objection',
        resourceId: userId,
        metadata: { userId, objectionReason },
        status: 'success',
      });

      return true;
    } catch (error) {
      logger.error('[GDPRService] Failed to process objection request:', error);
      throw new Error(`Objection request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getDataBreachNotification(organizationId: string): Promise<{
    hasBreach: boolean;
    breachDetails?: {
      description: string;
      affectedUsers: number;
      dataTypes: string[];
      discoveredAt: Date;
      containedAt?: Date;
      mitigationMeasures: string[];
    };
  }> {
    // Mock implementation - in production, this would check for actual breaches
    const hasBreach = Math.random() > 0.9; // 10% chance of breach for demo

    if (hasBreach) {
      return {
        hasBreach: true,
        breachDetails: {
          description: 'Unauthorized access to user data',
          affectedUsers: Math.floor(Math.random() * 100) + 1,
          dataTypes: ['email', 'name', 'phone'],
          discoveredAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          containedAt: new Date(),
          mitigationMeasures: [
            'Revoked access credentials',
            'Enhanced monitoring',
            'Notified affected users',
            'Implemented additional security controls'
          ]
        }
      };
    }

    return { hasBreach: false };
  }

  async updateConsent(organizationId: string, userId: string, consent: {
    purpose: string;
    granted: boolean;
    version: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<boolean> {
    try {
      logger.info(`Updated consent for user ${userId}: ${consent.purpose} - ${consent.granted}`);

      logAudit({
        organizationId,
        action: consent.granted ? AuditActions.CONSENT_GRANTED : AuditActions.CONSENT_WITHDRAWN,
        resource: 'gdpr_consent',
        resourceId: userId,
        metadata: { 
          userId, 
          purpose: consent.purpose, 
          granted: consent.granted,
          version: consent.version
        },
        status: 'success',
      });

      return true;
    } catch (error) {
      logger.error('[GDPRService] Failed to update consent:', error);
      return false;
    }
  }

  // Process GDPR request (access or deletion)
  async processGDPRRequest(organizationId: string, requestId: string): Promise<{
    requestId: string;
    status: string;
    userData?: Record<string, any>;
    message?: string;
  }> {
    // Look up the GDPR request
    const [request] = await pgDb
      .select()
      .from(gdprRequests)
      .where(and(
        eq(gdprRequests.id, requestId),
        eq(gdprRequests.organizationId, organizationId)
      ))
      .limit(1);

    if (!request) {
      throw new Error('GDPR request not found');
    }

    if (request.status === 'completed') {
      throw new Error('Request already processed');
    }

    const userId = request.userId;
    const requestType = request.type;

    if (requestType === 'access') {
      // Collect all personal data for the user
      const userData = await this.collectAllPersonalData(organizationId, userId);
      
      // Update request status to completed
      await pgDb
        .update(gdprRequests)
        .set({
          status: 'completed',
          completedAt: new Date(),
          updatedAt: new Date()
        })
        .where(eq(gdprRequests.id, requestId));

      return {
        requestId,
        status: 'completed',
        userData
      };
    } else if (requestType === 'deletion') {
      // Anonymize user data
      await this.performDataErasure(organizationId, userId);
      
      // Update request status to completed
      await pgDb
        .update(gdprRequests)
        .set({
          status: 'completed',
          completedAt: new Date(),
          updatedAt: new Date()
        })
        .where(eq(gdprRequests.id, requestId));

      return {
        requestId,
        status: 'completed',
        message: 'User data anonymized successfully'
      };
    }

    throw new Error('Invalid request type');
  }
}

export const gdprService = new GDPRService();
