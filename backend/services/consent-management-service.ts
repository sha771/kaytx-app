import { db as pgDb } from '../db/connection';
import { eq, and, desc, like, count, sql } from 'drizzle-orm';
import { EventEmitter } from 'events';
import crypto from 'crypto';
import { logAudit, AuditActions } from '../lib/audit';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface ConsentRecord {
  id: string;
  organizationId: string;
  userId?: string;
  email?: string;
  consentType: 'marketing' | 'analytics' | 'functional' | 'essential' | 'custom';
  status: 'granted' | 'denied' | 'withdrawn' | 'expired';
  purpose: string;
  legalBasis: 'consent' | 'contract' | 'legal_obligation' | 'vital_interests' | 'public_task' | 'legitimate_interests';
  dataCategories: string[];
  retentionPeriod: number; // days
  grantedAt?: Date;
  withdrawnAt?: Date;
  expiresAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConsentTemplate {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  version: string;
  consentType: ConsentRecord['consentType'];
  purpose: string;
  legalBasis: ConsentRecord['legalBasis'];
  dataCategories: string[];
  retentionPeriod: number;
  isActive: boolean;
  content: {
    title: string;
    description: string;
    checkboxes: {
      id: string;
      label: string;
      required: boolean;
      description?: string;
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export class ConsentManagementService extends EventEmitter {
  async createConsentTemplate(organizationId: string, templateData: Omit<ConsentTemplate, 'id' | 'organizationId' | 'version' | 'isActive' | 'createdAt' | 'updatedAt'>): Promise<ConsentTemplate> {
    try {
      const id = crypto.randomUUID();
      const version = '1.0.0';
      const now = new Date();

      // In a real implementation, this would save to a consent_templates table
      const template: ConsentTemplate = {
        id,
        organizationId,
        version,
        isActive: true,
        ...templateData,
        createdAt: now,
        updatedAt: now,
      };

      // Log template creation
      logAudit({
        organizationId,
        action: 'consent.template_created',
        resource: 'consent_template',
        resourceId: template.id,
        metadata: {
          templateName: template.name,
          consentType: template.consentType,
          version: template.version,
        },
        status: 'success',
      });

      this.emit('template:created', { template });
      return template;
    } catch (error) {
      logger.error('[ConsentManagementService] Failed to create consent template:', error);
      throw new Error(`Failed to create consent template: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async recordConsent(organizationId: string, consentData: Omit<ConsentRecord, 'id' | 'organizationId' | 'createdAt' | 'updatedAt'>): Promise<ConsentRecord> {
    try {
      const id = crypto.randomUUID();
      const now = new Date();

      const consent: ConsentRecord = {
        id,
        organizationId,
        ...consentData,
        grantedAt: consentData.status === 'granted' ? now : undefined,
        withdrawnAt: consentData.status === 'withdrawn' ? now : undefined,
        createdAt: now,
        updatedAt: now,
      };

      // Log consent recording
      logAudit({
        organizationId,
        action: consentData.status === 'granted' ? AuditActions.CONSENT_GRANTED : 
                consentData.status === 'withdrawn' ? AuditActions.CONSENT_WITHDRAWN : 
                'consent.recorded',
        resource: 'consent_record',
        resourceId: consent.id,
        metadata: {
          userId: consent.userId,
          email: consent.email,
          consentType: consent.consentType,
          purpose: consent.purpose,
          legalBasis: consent.legalBasis,
          ipAddress: consent.ipAddress,
        },
        status: 'success',
      });

      this.emit('consent:recorded', { consent });
      return consent;
    } catch (error) {
      logger.error('[ConsentManagementService] Failed to record consent:', error);
      throw new Error(`Failed to record consent: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async updateConsent(organizationId: string, consentId: string, updates: Partial<ConsentRecord>): Promise<ConsentRecord | null> {
    // In a real implementation, this would update the consent record
    const consent = await this.getConsent(organizationId, consentId);
    if (!consent) return null;

    const updatedConsent = {
      ...consent,
      ...updates,
      updatedAt: new Date(),
    };

    this.emit('consent:updated', { consent: updatedConsent });
    return updatedConsent;
  }

  async withdrawConsent(organizationId: string, consentId: string, reason?: string): Promise<boolean> {
    const consent = await this.getConsent(organizationId, consentId);
    if (!consent) return false;

    const updatedConsent = await this.updateConsent(organizationId, consentId, {
      status: 'withdrawn',
      withdrawnAt: new Date(),
      metadata: {
        ...consent.metadata,
        withdrawalReason: reason,
      },
    });

    this.emit('consent:withdrawn', { consent: updatedConsent });
    return true;
  }

  async getConsent(organizationId: string, consentId: string): Promise<ConsentRecord | null> {
    // In a real implementation, this would query the database
    return null;
  }

  async getUserConsents(organizationId: string, userId?: string, email?: string): Promise<ConsentRecord[]> {
    // In a real implementation, this would query the database
    return [];
  }

  async getConsentsByType(organizationId: string, consentType: ConsentRecord['consentType']): Promise<ConsentRecord[]> {
    // In a real implementation, this would query the database
    return [];
  }

  async getExpiredConsents(organizationId: string): Promise<ConsentRecord[]> {
    // In a real implementation, this would query for expired consents
    return [];
  }

  async checkConsent(organizationId: string, userId?: string, email?: string, consentType?: string): Promise<boolean> {
    const consents = await this.getUserConsents(organizationId, userId, email);
    
    if (consentType) {
      const specificConsent = consents.find(c => c.consentType === consentType);
      return specificConsent?.status === 'granted' && 
             (!specificConsent.expiresAt || specificConsent.expiresAt > new Date());
    }

    // Check if user has any active consents
    return consents.some(c => 
      c.status === 'granted' && 
      (!c.expiresAt || c.expiresAt > new Date())
    );
  }

  async getConsentAuditTrail(organizationId: string, consentId: string): Promise<{
    action: string;
    timestamp: Date;
    details?: Record<string, any>;
  }[]> {
    // In a real implementation, this would return audit trail
    return [];
  }

  async exportUserConsents(organizationId: string, userId?: string, email?: string): Promise<{
    consents: ConsentRecord[];
    exportedAt: Date;
    format: 'json';
  }> {
    const consents = await this.getUserConsents(organizationId, userId, email);
    
    return {
      consents,
      exportedAt: new Date(),
      format: 'json',
    };
  }

  async deleteExpiredConsents(organizationId: string): Promise<number> {
    const expiredConsents = await this.getExpiredConsents(organizationId);
    let deletedCount = 0;
    
    // Delete expired consents from database
    for (const consent of expiredConsents) {
      try {
        // In a real implementation, this would delete from database
        // await pgDb.delete(consentRecords).where(eq(consentRecords.id, consent.id));
        
        this.emit('consent:expired', { consent });
        deletedCount++;
        
        // Log the deletion
        await logAudit('CONSENT_EXPIRED', consent.id, {
          organizationId,
          consentType: consent.consentType,
          userId: consent.userId,
          email: consent.email
        });
      } catch (error) {
        logger.error(`Failed to delete expired consent ${consent.id}:`, error);
      }
    }

    return deletedCount;
  }

  async generateConsentReport(organizationId: string, filters?: {
    consentType?: ConsentRecord['consentType'];
    status?: ConsentRecord['status'];
    dateRange?: { start: Date; end: Date };
  }): Promise<{
    totalConsents: number;
    activeConsents: number;
    withdrawnConsents: number;
    expiredConsents: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    generatedAt: Date;
  }> {
    const consents = await this.getOrganizationConsents(organizationId);
    
    // Apply filters
    let filteredConsents = consents;
    if (filters?.consentType) {
      filteredConsents = filteredConsents.filter(c => c.consentType === filters.consentType);
    }
    if (filters?.status) {
      filteredConsents = filteredConsents.filter(c => c.status === filters.status);
    }
    if (filters?.dateRange) {
      filteredConsents = filteredConsents.filter(c => 
        c.createdAt >= filters.dateRange!.start && c.createdAt <= filters.dateRange!.end
      );
    }
    
    // Generate statistics
    const byType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    
    filteredConsents.forEach(consent => {
      // Count by type
      byType[consent.consentType] = (byType[consent.consentType] || 0) + 1;
      
      // Count by status
      byStatus[consent.status] = (byStatus[consent.status] || 0) + 1;
    });
    
    return {
      totalConsents: filteredConsents.length,
      activeConsents: filteredConsents.filter(c => c.status === 'granted').length,
      withdrawnConsents: filteredConsents.filter(c => c.status === 'withdrawn').length,
      expiredConsents: filteredConsents.filter(c => c.status === 'expired').length,
      byType,
      byStatus,
      generatedAt: new Date(),
    };
  }
}

export const consentManagementService = new ConsentManagementService();
