import { db as pgDb } from '../db/connection';
import { and, eq, desc, asc } from 'drizzle-orm';
import { platformConnections } from '../db/drizzle-schema';
import { PlatformType } from './platform-auth-service';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface ConflictRecord {
  id: string;
  organizationId: string;
  platform: PlatformType;
  entityType: string;
  entityId: string;
  localData: any;
  remoteData: any;
  conflictType: ConflictType;
  severity: ConflictSeverity;
  status: ConflictStatus;
  resolution?: ConflictResolution;
  resolvedAt?: Date;
  resolvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ConflictType {
  DATA_MISMATCH = 'data_mismatch',
  DELETED_CONFLICT = 'deleted_conflict',
  VERSION_CONFLICT = 'version_conflict',
  DUPLICATE_CONFLICT = 'duplicate_conflict',
  REFERENCE_CONFLICT = 'reference_conflict',
}

export enum ConflictSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum ConflictStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  RESOLVED = 'resolved',
  IGNORED = 'ignored',
}

export enum ConflictResolution {
  KEEP_LOCAL = 'keep_local',
  KEEP_REMOTE = 'keep_remote',
  MERGE = 'merge',
  DELETE_LOCAL = 'delete_local',
  DELETE_REMOTE = 'delete_remote',
  MANUAL = 'manual',
}

export interface ConflictResolutionStrategy {
  resolve(conflict: ConflictRecord): Promise<ConflictResolution>;
  canAutoResolve(conflict: ConflictRecord): boolean;
}

export class ConflictResolver {
  private strategies: Map<ConflictType, ConflictResolutionStrategy> = new Map();
  private conflictCache: Map<string, ConflictRecord[]> = new Map();

  constructor() {
    this.initializeStrategies();
  }

  private initializeStrategies() {
    this.strategies.set(ConflictType.DATA_MISMATCH, new DataMismatchStrategy());
    this.strategies.set(ConflictType.DELETED_CONFLICT, new DeletedConflictStrategy());
    this.strategies.set(ConflictType.VERSION_CONFLICT, new VersionConflictStrategy());
    this.strategies.set(ConflictType.DUPLICATE_CONFLICT, new DuplicateConflictStrategy());
    this.strategies.set(ConflictType.REFERENCE_CONFLICT, new ReferenceConflictStrategy());
  }

  async detectConflicts(
    organizationId: string,
    platform: PlatformType,
    entityType: string,
    localData: any[],
    remoteData: any[]
  ): Promise<ConflictRecord[]> {
    const conflicts: ConflictRecord[] = [];
    const localMap = new Map(localData.map(item => [this.getEntityId(item), item]));
    const remoteMap = new Map(remoteData.map(item => [this.getEntityId(item), item]));

    // Check for data mismatches
    for (const [id, localItem] of localMap) {
      const remoteItem = remoteMap.get(id);
      if (remoteItem) {
        const conflict = await this.detectDataMismatch(organizationId, platform, entityType, localItem, remoteItem);
        if (conflict) conflicts.push(conflict);
      } else {
        // Local item not found remotely
        const conflict = await this.detectDeletedConflict(organizationId, platform, entityType, localItem, null);
        if (conflict) conflicts.push(conflict);
      }
    }

    // Check for remote-only items
    for (const [id, remoteItem] of remoteMap) {
      if (!localMap.has(id)) {
        const conflict = await this.detectDeletedConflict(organizationId, platform, entityType, null, remoteItem);
        if (conflict) conflicts.push(conflict);
      }
    }

    // Check for duplicates
    const duplicateConflicts = await this.detectDuplicates(organizationId, platform, entityType, [...localData, ...remoteData]);
    conflicts.push(...duplicateConflicts);

    return conflicts;
  }

  async resolveConflict(conflictId: string, resolution: ConflictResolution, resolvedBy?: string): Promise<void> {
    // In a real implementation, this would load the conflict from database
    const conflict: ConflictRecord = {
      id: conflictId,
      organizationId: '',
      platform: 'salesforce',
      entityType: '',
      entityId: '',
      localData: {},
      remoteData: {},
      conflictType: ConflictType.DATA_MISMATCH,
      severity: ConflictSeverity.MEDIUM,
      status: ConflictStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const strategy = this.strategies.get(conflict.conflictType);
    if (!strategy) {
      throw new Error(`No resolution strategy found for conflict type: ${conflict.conflictType}`);
    }

    const finalResolution = await strategy.resolve(conflict);
    
    // Apply the resolution
    await this.applyResolution(conflict, finalResolution, resolvedBy);
  }

  async autoResolveConflicts(organizationId: string, platform: PlatformType): Promise<{ resolved: number; failed: number }> {
    const result = { resolved: 0, failed: 0 };

    // Get pending conflicts for auto-resolution
    const pendingConflicts = await this.getPendingConflicts(organizationId, platform);

    for (const conflict of pendingConflicts) {
      const strategy = this.strategies.get(conflict.conflictType);
      if (strategy && strategy.canAutoResolve(conflict)) {
        try {
          const resolution = await strategy.resolve(conflict);
          await this.applyResolution(conflict, resolution, 'system');
          result.resolved++;
        } catch (error) {
          logger.error(`Auto-resolution failed for conflict ${conflict.id}:`, error);
          result.failed++;
        }
      }
    }

    return result;
  }

  private async detectDataMismatch(
    organizationId: string,
    platform: PlatformType,
    entityType: string,
    localItem: any,
    remoteItem: any
  ): Promise<ConflictRecord | null> {
    const localHash = this.calculateDataHash(localItem);
    const remoteHash = this.calculateDataHash(remoteItem);

    if (localHash === remoteHash) {
      return null; // No conflict
    }

    // Determine severity based on field importance
    const severity = this.calculateConflictSeverity(localItem, remoteItem);

    return {
      id: this.generateConflictId(),
      organizationId,
      platform,
      entityType,
      entityId: this.getEntityId(localItem),
      localData: localItem,
      remoteData: remoteItem,
      conflictType: ConflictType.DATA_MISMATCH,
      severity,
      status: ConflictStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  private async detectDeletedConflict(
    organizationId: string,
    platform: PlatformType,
    entityType: string,
    localItem: any | null,
    remoteItem: any | null
  ): Promise<ConflictRecord | null> {
    if (!localItem && !remoteItem) return null;

    const severity = this.calculateDeletionSeverity(localItem, remoteItem);

    return {
      id: this.generateConflictId(),
      organizationId,
      platform,
      entityType,
      entityId: this.getEntityId(localItem || remoteItem),
      localData: localItem,
      remoteData: remoteItem,
      conflictType: ConflictType.DELETED_CONFLICT,
      severity,
      status: ConflictStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  private async detectDuplicates(
    organizationId: string,
    platform: PlatformType,
    entityType: string,
    allItems: any[]
  ): Promise<ConflictRecord[]> {
    const conflicts: ConflictRecord[] = [];
    const seen = new Map<string, any[]>();

    // Group by potential duplicate keys
    for (const item of allItems) {
      const duplicateKey = this.getDuplicateKey(item);
      if (!seen.has(duplicateKey)) {
        seen.set(duplicateKey, []);
      }
      seen.get(duplicateKey)!.push(item);
    }

    // Find actual duplicates
    for (const [key, items] of seen) {
      if (items.length > 1) {
        const conflict: ConflictRecord = {
          id: this.generateConflictId(),
          organizationId,
          platform,
          entityType,
          entityId: key,
          localData: items[0],
          remoteData: items[1],
          conflictType: ConflictType.DUPLICATE_CONFLICT,
          severity: ConflictSeverity.MEDIUM,
          status: ConflictStatus.PENDING,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        conflicts.push(conflict);
      }
    }

    return conflicts;
  }

  private calculateDataHash(data: any): string {
    const crypto = require('crypto');
    const normalizedData = JSON.stringify(data, Object.keys(data).sort());
    return crypto.createHash('md5').update(normalizedData).digest('hex');
  }

  private calculateConflictSeverity(localItem: any, remoteItem: any): ConflictSeverity {
    // Simple heuristic based on field differences
    const localFields = Object.keys(localItem);
    const remoteFields = Object.keys(remoteItem);
    const allFields = new Set([...localFields, ...remoteFields]);
    
    let criticalDifferences = 0;
    let totalDifferences = 0;

    for (const field of allFields) {
      const localValue = localItem[field];
      const remoteValue = remoteItem[field];
      
      if (localValue !== remoteValue) {
        totalDifferences++;
        if (this.isCriticalField(field)) {
          criticalDifferences++;
        }
      }
    }

    if (criticalDifferences > 0) return ConflictSeverity.CRITICAL;
    if (totalDifferences > 5) return ConflictSeverity.HIGH;
    if (totalDifferences > 2) return ConflictSeverity.MEDIUM;
    return ConflictSeverity.LOW;
  }

  private calculateDeletionSeverity(localItem: any | null, remoteItem: any | null): ConflictSeverity {
    // If one side deleted an important record, it's high severity
    if (localItem && this.isImportantRecord(localItem)) return ConflictSeverity.HIGH;
    if (remoteItem && this.isImportantRecord(remoteItem)) return ConflictSeverity.HIGH;
    return ConflictSeverity.MEDIUM;
  }

  private isCriticalField(field: string): boolean {
    const criticalFields = ['id', 'email', 'status', 'amount', 'date', 'name'];
    return criticalFields.includes(field.toLowerCase());
  }

  private isImportantRecord(record: any): boolean {
    // Check if record has important indicators
    return record.status === 'active' || 
           record.amount > 1000 || 
           record.priority === 'high' ||
           record.important === true;
  }

  private getEntityId(item: any): string {
    return item.id || item.Id || item.ID || item.uuid || Math.random().toString();
  }

  private getDuplicateKey(item: any): string {
    // Use email or name for duplicate detection
    return item.email || item.name || item.title || JSON.stringify(item);
  }

  private generateConflictId(): string {
    return `conflict_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async applyResolution(conflict: ConflictRecord, resolution: ConflictResolution, resolvedBy?: string): Promise<void> {
    // In a real implementation, this would:
    // 1. Apply the resolution to the data
    // 2. Update the conflict record in the database
    // 3. Trigger any necessary sync operations
    
    logger.info(`Applied resolution ${resolution} to conflict ${conflict.id}`);
  }

  private async getPendingConflicts(organizationId: string, platform: PlatformType): Promise<ConflictRecord[]> {
    // In a real implementation, this would query the database
    // For now, return empty array
    return [];
  }
}

// Resolution Strategies
class DataMismatchStrategy implements ConflictResolutionStrategy {
  async resolve(conflict: ConflictRecord): Promise<ConflictResolution> {
    // Simple strategy: keep the most recently updated record
    const localUpdatedAt = new Date(conflict.localData.updatedAt || conflict.localData.lastModified || 0);
    const remoteUpdatedAt = new Date(conflict.remoteData.updatedAt || conflict.remoteData.lastModified || 0);
    
    return localUpdatedAt > remoteUpdatedAt ? ConflictResolution.KEEP_LOCAL : ConflictResolution.KEEP_REMOTE;
  }

  canAutoResolve(conflict: ConflictRecord): boolean {
    // Auto-resolve if severity is low or medium
    return conflict.severity === ConflictSeverity.LOW || conflict.severity === ConflictSeverity.MEDIUM;
  }
}

class DeletedConflictStrategy implements ConflictResolutionStrategy {
  async resolve(conflict: ConflictRecord): Promise<ConflictResolution> {
    // If local exists but remote doesn't, keep local (and vice versa)
    if (conflict.localData && !conflict.remoteData) return ConflictResolution.KEEP_LOCAL;
    if (!conflict.localData && conflict.remoteData) return ConflictResolution.KEEP_REMOTE;
    return ConflictResolution.MANUAL; // Both deleted, needs manual review
  }

  canAutoResolve(conflict: ConflictRecord): boolean {
    // Auto-resolve if one side is null
    return conflict.localData === null || conflict.remoteData === null;
  }
}

class VersionConflictStrategy implements ConflictResolutionStrategy {
  async resolve(conflict: ConflictRecord): Promise<ConflictResolution> {
    // Keep the higher version
    const localVersion = conflict.localData.version || 0;
    const remoteVersion = conflict.remoteData.version || 0;
    
    return localVersion > remoteVersion ? ConflictResolution.KEEP_LOCAL : ConflictResolution.KEEP_REMOTE;
  }

  canAutoResolve(conflict: ConflictRecord): boolean {
    return true; // Version conflicts can usually be auto-resolved
  }
}

class DuplicateConflictStrategy implements ConflictResolutionStrategy {
  async resolve(conflict: ConflictRecord): Promise<ConflictResolution> {
    // Merge duplicates or keep the more complete record
    const localCompleteness = this.calculateCompleteness(conflict.localData);
    const remoteCompleteness = this.calculateCompleteness(conflict.remoteData);
    
    if (localCompleteness > remoteCompleteness) return ConflictResolution.KEEP_LOCAL;
    if (remoteCompleteness > localCompleteness) return ConflictResolution.KEEP_REMOTE;
    return ConflictResolution.MERGE;
  }

  canAutoResolve(conflict: ConflictRecord): boolean {
    // Auto-resolve if one record is significantly more complete
    const localCompleteness = this.calculateCompleteness(conflict.localData);
    const remoteCompleteness = this.calculateCompleteness(conflict.remoteData);
    
    return Math.abs(localCompleteness - remoteCompleteness) > 0.3;
  }

  private calculateCompleteness(data: any): number {
    if (!data) return 0;
    
    const fields = Object.keys(data);
    const nonNullFields = fields.filter(field => data[field] !== null && data[field] !== undefined);
    
    return nonNullFields.length / fields.length;
  }
}

class ReferenceConflictStrategy implements ConflictResolutionStrategy {
  async resolve(conflict: ConflictRecord): Promise<ConflictResolution> {
    // Reference conflicts usually need manual resolution
    return ConflictResolution.MANUAL;
  }

  canAutoResolve(conflict: ConflictRecord): boolean {
    return false; // Reference conflicts are complex
  }
}

export const conflictResolver = new ConflictResolver();
