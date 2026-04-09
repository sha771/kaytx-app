import { db as pgDb } from '../db/connection';
import { createLogger } from '../lib/production-logger';
import {
  platformConnections,
  platformSyncJobs,
  platformFailedOperations,
} from '../db/drizzle-schema';
import { and, eq, desc, asc, lte, gt, or } from 'drizzle-orm';
import { platformAuthService, PlatformType } from './platform-auth-service';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

interface ConflictData {
  id: string;
  organizationId: string;
  platform: PlatformType;
  entityType: string;
  entityId: string;
  localData: Record<string, unknown> | null;
  remoteData: Record<string, unknown> | null;
  conflictType: 'data_mismatch' | 'version_conflict' | 'delete_conflict' | 'permission_conflict';
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: Date;
  resolvedAt?: Date;
  resolutionStrategy?: 'manual' | 'auto_local_wins' | 'auto_remote_wins' | 'auto_merge';
  resolvedBy?: string;
  notes?: string;
}

interface ConflictResolution {
  conflictId: string;
  strategy: 'manual' | 'auto_local_wins' | 'auto_remote_wins' | 'auto_merge';
  resolvedData?: Record<string, unknown>;
  resolvedBy?: string;
  notes?: string;
}

interface SyncConflictRule {
  id: string;
  organizationId: string;
  platform: PlatformType;
  entityType: string;
  field: string;
  strategy: 'local_wins' | 'remote_wins' | 'merge' | 'manual';
  priority: number;
  isActive: boolean;
}

export class SyncConflictResolutionService {
  private conflicts: Map<string, ConflictData> = new Map();
  private resolutionRules: Map<string, SyncConflictRule[]> = new Map();

  constructor() {
    this.loadResolutionRules();
  }

  /**
   * Detect and resolve sync conflicts
   */
  async detectAndResolveConflicts(
    organizationId: string,
    platform: PlatformType,
    entityType: string,
    localData: Record<string, unknown> | null,
    remoteData: Record<string, unknown> | null,
    entityId: string
  ): Promise<{ hasConflict: boolean; resolvedData?: Record<string, unknown>; conflict?: ConflictData }> {
    try {
      // Check for conflicts
      const conflict = await this.detectConflict(organizationId, platform, entityType, localData, remoteData, entityId);

      if (!conflict) {
        return { hasConflict: false, resolvedData: (remoteData as Record<string, unknown> | undefined) || undefined };
      }

      // Store conflict
      await this.storeConflict(conflict);

      // Attempt automatic resolution
      const resolution = await this.attemptAutomaticResolution(conflict);

      if (resolution.resolvedData) {
        await this.markConflictResolved(conflict.id, resolution);
        return { 
          hasConflict: true, 
          resolvedData: resolution.resolvedData, 
          conflict 
        };
      }

      // Return conflict for manual resolution
      return { 
        hasConflict: true, 
        conflict 
      };

    } catch (error: unknown) {
      logger.error('[SyncConflictResolutionService] Failed to detect/resolve conflicts:', error instanceof Error ? error : new Error(String(error)));
      throw new Error('Conflict resolution failed');
    }
  }

  /**
   * Detect conflicts between local and remote data
   */
  private async detectConflict(
    organizationId: string,
    platform: PlatformType,
    entityType: string,
    localData: Record<string, unknown> | null,
    remoteData: Record<string, unknown> | null,
    entityId: string
  ): Promise<ConflictData | null> {
    // Check if data exists
    if (!localData && !remoteData) {
      return null;
    }

    // Check for delete conflicts
    if ((localData && !remoteData) || (!localData && remoteData)) {
      return {
        id: this.generateConflictId(),
        organizationId,
        platform,
        entityType,
        entityId,
        localData,
        remoteData,
        conflictType: 'delete_conflict',
        severity: 'medium',
        detectedAt: new Date(),
      };
    }

    // Check for data mismatches
    const conflicts = this.findDataConflicts(localData, remoteData);
    if (conflicts.length > 0) {
      return {
        id: this.generateConflictId(),
        organizationId,
        platform,
        entityType,
        entityId,
        localData,
        remoteData,
        conflictType: 'data_mismatch',
        severity: this.calculateSeverity(conflicts),
        detectedAt: new Date(),
      };
    }

    // Check for version conflicts
    const localVersion = localData ? (localData.version || localData.last_modified) : null;
    const remoteVersion = remoteData ? (remoteData.version || remoteData.last_modified) : null;
    
    if (localVersion && remoteVersion && localVersion !== remoteVersion) {
      return {
        id: this.generateConflictId(),
        organizationId,
        platform,
        entityType,
        entityId,
        localData,
        remoteData,
        conflictType: 'version_conflict',
        severity: 'medium',
        detectedAt: new Date(),
      };
    }

    return null;
  }

  /**
   * Find specific data conflicts
   */
  private findDataConflicts(localData: Record<string, unknown> | null, remoteData: Record<string, unknown> | null): string[] {
    const conflicts: string[] = [];
    
    if (!localData || !remoteData) {
      return conflicts;
    }

    // Compare all fields
    const allKeys = new Set([...Object.keys(localData), ...Object.keys(remoteData)]);
    
    for (const key of allKeys) {
      const localValue = localData[key];
      const remoteValue = remoteData[key];
      
      // Skip system fields
      if (['id', 'created_at', 'updated_at', 'last_synced'].includes(key)) {
        continue;
      }
      
      // Check for differences
      if (JSON.stringify(localValue) !== JSON.stringify(remoteValue)) {
        conflicts.push(key);
      }
    }

    return conflicts;
  }

  /**
   * Calculate conflict severity based on field importance
   */
  private calculateSeverity(conflictedFields: string[]): 'low' | 'medium' | 'high' | 'critical' {
    const criticalFields = ['email', 'id', 'status', 'amount', 'price'];
    const highFields = ['name', 'phone', 'address', 'date'];
    
    if (conflictedFields.some(field => criticalFields.includes(field.toLowerCase()))) {
      return 'critical';
    }
    
    if (conflictedFields.some(field => highFields.includes(field.toLowerCase()))) {
      return 'high';
    }
    
    if (conflictedFields.length > 3) {
      return 'medium';
    }
    
    return 'low';
  }

  /**
   * Store conflict in database
   */
  private async storeConflict(conflict: ConflictData): Promise<void> {
    try {
      // Store in memory for quick access
      this.conflicts.set(conflict.id, conflict);

      // You could also store in a database table for persistence
      logger.info(`Stored conflict: ${conflict.id} (${conflict.conflictType})`);

    } catch (error: unknown) {
      logger.error('[SyncConflictResolutionService] Failed to store conflict:', error instanceof Error ? error : new Error(String(error)));
    }
  }

  /**
   * Attempt automatic resolution based on rules
   */
  private async attemptAutomaticResolution(conflict: ConflictData): Promise<ConflictResolution> {
    try {
      const rules = this.resolutionRules.get(`${conflict.organizationId}_${conflict.platform}_${conflict.entityType}`) || [];
      
      // Find applicable rule
      const applicableRule = rules.find(rule => rule.isActive && this.isRuleApplicable(rule, conflict));
      
      if (!applicableRule) {
        return { conflictId: conflict.id, strategy: 'manual' };
      }

      switch (applicableRule.strategy) {
        case 'local_wins':
          return {
            conflictId: conflict.id,
            strategy: 'auto_local_wins',
            resolvedData: (conflict.localData as Record<string, unknown> | undefined) || undefined,
          };
          
        case 'remote_wins':
          return {
            conflictId: conflict.id,
            strategy: 'auto_remote_wins',
            resolvedData: (conflict.remoteData as Record<string, unknown> | undefined) || undefined,
          };
          
        case 'merge':
          const mergedData = await this.mergeData(conflict.localData, conflict.remoteData);
          return {
            conflictId: conflict.id,
            strategy: 'auto_merge',
            resolvedData: mergedData,
          };
          
        default:
          return { conflictId: conflict.id, strategy: 'manual' };
      }

    } catch (error: unknown) {
      logger.error('[SyncConflictResolutionService] Failed to auto-resolve conflict:', error instanceof Error ? error : new Error(String(error)));
      return { conflictId: conflict.id, strategy: 'manual' };
    }
  }

  /**
   * Check if rule is applicable to conflict
   */
  private isRuleApplicable(rule: SyncConflictRule, conflict: ConflictData): boolean {
    // Check if rule applies to conflict type
    if (rule.field === '*' && rule.entityType === conflict.entityType) {
      return true;
    }
    
    // Check specific field conflicts
    const conflicts = this.findDataConflicts(conflict.localData, conflict.remoteData);
    return conflicts.includes(rule.field);
  }

  /**
   * Merge data from local and remote sources
   */
  private async mergeData(localData: any, remoteData: any): Promise<any> {
    const merged = { ...localData };
    
    // Use most recent timestamps
    if (remoteData.updated_at && localData.updated_at) {
      if (new Date(remoteData.updated_at) > new Date(localData.updated_at)) {
        merged.updated_at = remoteData.updated_at;
      }
    }
    
    // Merge arrays and objects intelligently
    for (const key in remoteData) {
      if (localData[key] === undefined) {
        merged[key] = remoteData[key];
      } else if (Array.isArray(localData[key]) && Array.isArray(remoteData[key])) {
        // Merge arrays, removing duplicates
        merged[key] = [...new Set([...localData[key], ...remoteData[key]])];
      } else if (typeof localData[key] === 'object' && typeof remoteData[key] === 'object') {
        // Recursively merge objects
        merged[key] = { ...localData[key], ...remoteData[key] };
      }
    }
    
    return merged;
  }

  /**
   * Mark conflict as resolved
   */
  private async markConflictResolved(conflictId: string, resolution: ConflictResolution): Promise<void> {
    try {
      const conflict = this.conflicts.get(conflictId);
      if (conflict) {
        conflict.resolvedAt = new Date();
        conflict.resolutionStrategy = resolution.strategy;
        conflict.resolvedBy = resolution.resolvedBy || 'system';
        conflict.notes = resolution.notes;
        
        logger.info(`Resolved conflict: ${conflictId} (${resolution.strategy})`);
      }

    } catch (error) {
      logger.error('[SyncConflictResolutionService] Failed to mark conflict resolved:', error);
    }
  }

  /**
   * Manually resolve a conflict
   */
  async manuallyResolveConflict(resolution: ConflictResolution): Promise<boolean> {
    try {
      const conflict = this.conflicts.get(resolution.conflictId);
      if (!conflict) {
        throw new Error('Conflict not found');
      }

      let resolvedData: any;

      switch (resolution.strategy) {
        case 'auto_local_wins':
          resolvedData = conflict.localData;
          break;
        case 'auto_remote_wins':
          resolvedData = conflict.remoteData;
          break;
        case 'auto_merge':
          resolvedData = await this.mergeData(conflict.localData, conflict.remoteData);
          break;
        case 'manual':
          resolvedData = resolution.resolvedData;
          break;
        default:
          throw new Error('Invalid resolution strategy');
      }

      await this.markConflictResolved(resolution.conflictId, resolution);
      
      logger.info(`Manually resolved conflict: ${resolution.conflictId}`);
      return true;

    } catch (error) {
      logger.error('[SyncConflictResolutionService] Failed to manually resolve conflict:', error);
      return false;
    }
  }

  /**
   * Add resolution rule
   */
  async addResolutionRule(rule: Omit<SyncConflictRule, 'id'>): Promise<string> {
    try {
      const newRule: SyncConflictRule = {
        ...rule,
        id: this.generateRuleId(),
      };

      const key = `${rule.organizationId}_${rule.platform}_${rule.entityType}`;
      const existingRules = this.resolutionRules.get(key) || [];
      
      // Sort by priority
      existingRules.push(newRule);
      existingRules.sort((a, b) => b.priority - a.priority);
      
      this.resolutionRules.set(key, existingRules);

      logger.info(`Added resolution rule: ${newRule.id}`);
      return newRule.id;

    } catch (error) {
      logger.error('[SyncConflictResolutionService] Failed to add resolution rule:', error);
      throw new Error('Failed to add resolution rule');
    }
  }

  /**
   * Get unresolved conflicts
   */
  async getUnresolvedConflicts(organizationId: string, platform?: PlatformType): Promise<ConflictData[]> {
    try {
      const conflicts = Array.from(this.conflicts.values());
      
      return conflicts.filter(conflict => 
        conflict.organizationId === organizationId &&
        (!platform || conflict.platform === platform) &&
        !conflict.resolvedAt
      );

    } catch (error) {
      logger.error('[SyncConflictResolutionService] Failed to get unresolved conflicts:', error);
      throw new Error('Failed to retrieve unresolved conflicts');
    }
  }

  /**
   * Get conflict statistics
   */
  async getConflictStats(organizationId: string, platform?: PlatformType): Promise<any> {
    try {
      const conflicts = Array.from(this.conflicts.values());
      const filteredConflicts = conflicts.filter(conflict => 
        conflict.organizationId === organizationId &&
        (!platform || conflict.platform === platform)
      );

      const stats = {
        total: filteredConflicts.length,
        unresolved: filteredConflicts.filter(c => !c.resolvedAt).length,
        resolved: filteredConflicts.filter(c => c.resolvedAt).length,
        byType: {} as Record<string, number>,
        bySeverity: {} as Record<string, number>,
        byPlatform: {} as Record<string, number>,
      };

      filteredConflicts.forEach(conflict => {
        stats.byType[conflict.conflictType] = (stats.byType[conflict.conflictType] || 0) + 1;
        stats.bySeverity[conflict.severity] = (stats.bySeverity[conflict.severity] || 0) + 1;
        stats.byPlatform[conflict.platform] = (stats.byPlatform[conflict.platform] || 0) + 1;
      });

      return stats;

    } catch (error) {
      logger.error('[SyncConflictResolutionService] Failed to get conflict stats:', error);
      throw new Error('Failed to retrieve conflict statistics');
    }
  }

  /**
   * Load resolution rules (could be from database)
   */
  private async loadResolutionRules(): Promise<void> {
    try {
      // Default rules for common scenarios
      const defaultRules: SyncConflictRule[] = [
        {
          id: 'default_email_remote',
          organizationId: '*',
          platform: 'salesforce',
          entityType: 'contact',
          field: 'email',
          strategy: 'remote_wins',
          priority: 100,
          isActive: true,
        },
        {
          id: 'default_name_merge',
          organizationId: '*',
          platform: 'hubspot',
          entityType: 'contact',
          field: 'name',
          strategy: 'merge',
          priority: 80,
          isActive: true,
        },
      ];

      defaultRules.forEach(rule => {
        const key = `${rule.organizationId}_${rule.platform}_${rule.entityType}`;
        const existingRules = this.resolutionRules.get(key) || [];
        existingRules.push(rule);
        this.resolutionRules.set(key, existingRules);
      });

    } catch (error) {
      logger.error('[SyncConflictResolutionService] Failed to load resolution rules:', error);
    }
  }

  /**
   * Generate unique conflict ID
   */
  private generateConflictId(): string {
    return `conflict_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate unique rule ID
   */
  private generateRuleId(): string {
    return `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get resolution rules for organization and platform
   */
  getResolutionRules(organizationId: string, platform: PlatformType, entityType: string): SyncConflictRule[] {
    const key = `${organizationId}_${platform}_${entityType}`;
    return this.resolutionRules.get(key) || [];
  }

  /**
   * Update resolution rule
   */
  async updateResolutionRule(ruleId: string, updates: Partial<SyncConflictRule>): Promise<boolean> {
    try {
      for (const [key, rules] of this.resolutionRules.entries()) {
        const ruleIndex = rules.findIndex(rule => rule.id === ruleId);
        if (ruleIndex !== -1) {
          rules[ruleIndex] = { ...rules[ruleIndex], ...updates };
          this.resolutionRules.set(key, rules);
          return true;
        }
      }
      return false;

    } catch (error) {
      logger.error('[SyncConflictResolutionService] Failed to update resolution rule:', error);
      return false;
    }
  }

  /**
   * Delete resolution rule
   */
  async deleteResolutionRule(ruleId: string): Promise<boolean> {
    try {
      for (const [key, rules] of this.resolutionRules.entries()) {
        const ruleIndex = rules.findIndex(rule => rule.id === ruleId);
        if (ruleIndex !== -1) {
          rules.splice(ruleIndex, 1);
          this.resolutionRules.set(key, rules);
          return true;
        }
      }
      return false;

    } catch (error) {
      logger.error('[SyncConflictResolutionService] Failed to delete resolution rule:', error);
      return false;
    }
  }
}

export const syncConflictResolutionService = new SyncConflictResolutionService();
