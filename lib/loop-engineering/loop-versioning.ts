/**
 * Loop Versioning and Rollback System
 * Manages loop versions, enables rollback, and tracks changes
 */

import { LoopConfig, LoopExecution } from './types';

export interface LoopVersion {
  id: string;
  loopId: string;
  version: string;
  config: LoopConfig;
  createdAt: Date;
  createdBy: string;
  changeDescription: string;
  changeType: 'major' | 'minor' | 'patch';
  parentVersionId?: string;
  tags: string[];
}

export interface VersionDiff {
  versionId: string;
  changes: Array<{
    path: string;
    oldValue: any;
    newValue: any;
    type: 'added' | 'removed' | 'modified';
  }>;
}

export interface RollbackPlan {
  targetVersionId: string;
  currentVersionId: string;
  changes: VersionDiff;
  estimatedImpact: 'low' | 'medium' | 'high';
  affectedExecutions: string[];
}

export class LoopVersionManager {
  private versions: Map<string, LoopVersion[]> = new Map();
  private currentVersions: Map<string, string> = new Map();

  /**
   * Create new version of a loop
   */
  createVersion(
    loopId: string,
    config: LoopConfig,
    changeDescription: string,
    changeType: LoopVersion['changeType'],
    createdBy: string,
    tags: string[] = []
  ): LoopVersion {
    const currentVersionId = this.currentVersions.get(loopId);
    const parentVersion = currentVersionId ? this.getVersion(loopId, currentVersionId) : undefined;

    const newVersion: LoopVersion = {
      id: `version-${Date.now()}`,
      loopId,
      version: this.generateNextVersion(parentVersion?.version, changeType),
      config: JSON.parse(JSON.stringify(config)), // Deep clone
      createdAt: new Date(),
      createdBy,
      changeDescription,
      changeType,
      parentVersionId: currentVersionId,
      tags,
    };

    if (!this.versions.has(loopId)) {
      this.versions.set(loopId, []);
    }

    this.versions.get(loopId)!.push(newVersion);
    this.currentVersions.set(loopId, newVersion.id);

    return newVersion;
  }

  /**
   * Generate next version number
   */
  private generateNextVersion(currentVersion: string | undefined, changeType: LoopVersion['changeType']): string {
    if (!currentVersion) return '1.0.0';

    const [major, minor, patch] = currentVersion.split('.').map(Number);

    switch (changeType) {
      case 'major':
        return `${major + 1}.0.0`;
      case 'minor':
        return `${major}.${minor + 1}.0`;
      case 'patch':
        return `${major}.${minor}.${patch + 1}`;
      default:
        return currentVersion;
    }
  }

  /**
   * Get specific version
   */
  getVersion(loopId: string, versionId: string): LoopVersion | undefined {
    const loopVersions = this.versions.get(loopId);
    return loopVersions?.find(v => v.id === versionId);
  }

  /**
   * Get current version
   */
  getCurrentVersion(loopId: string): LoopVersion | undefined {
    const currentVersionId = this.currentVersions.get(loopId);
    return currentVersionId ? this.getVersion(loopId, currentVersionId) : undefined;
  }

  /**
   * Get all versions for a loop
   */
  getAllVersions(loopId: string): LoopVersion[] {
    return this.versions.get(loopId) || [];
  }

  /**
   * Get version history
   */
  getVersionHistory(loopId: string): LoopVersion[] {
    const versions = this.versions.get(loopId) || [];
    return [...versions].reverse(); // Most recent first
  }

  /**
   * Compare two versions
   */
  compareVersions(loopId: string, versionId1: string, versionId2: string): VersionDiff {
    const version1 = this.getVersion(loopId, versionId1);
    const version2 = this.getVersion(loopId, versionId2);

    if (!version1 || !version2) {
      return { versionId: versionId1, changes: [] };
    }

    const changes = this.diffObjects(version1.config, version2.config, '');

    return {
      versionId: versionId1,
      changes,
    };
  }

  /**
   * Deep diff two objects
   */
  private diffObjects(obj1: any, obj2: any, path: string): Array<{
    path: string;
    oldValue: any;
    newValue: any;
    type: 'added' | 'removed' | 'modified';
  }> {
    const changes: Array<{
      path: string;
      oldValue: any;
      newValue: any;
      type: 'added' | 'removed' | 'modified';
    }> = [];

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = new Set([...keys1, ...keys2]);

    for (const key of allKeys) {
      const currentPath = path ? `${path}.${key}` : key;
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (!(key in obj1)) {
        changes.push({
          path: currentPath,
          oldValue: undefined,
          newValue: value2,
          type: 'added',
        });
      } else if (!(key in obj2)) {
        changes.push({
          path: currentPath,
          oldValue: value1,
          newValue: undefined,
          type: 'removed',
        });
      } else if (typeof value1 === 'object' && typeof value2 === 'object' && value1 !== null && value2 !== null) {
        if (JSON.stringify(value1) !== JSON.stringify(value2)) {
          changes.push(...this.diffObjects(value1, value2, currentPath));
        }
      } else if (value1 !== value2) {
        changes.push({
          path: currentPath,
          oldValue: value1,
          newValue: value2,
          type: 'modified',
        });
      }
    }

    return changes;
  }

  /**
   * Create rollback plan
   */
  createRollbackPlan(loopId: string, targetVersionId: string): RollbackPlan | null {
    const currentVersion = this.getCurrentVersion(loopId);
    const targetVersion = this.getVersion(loopId, targetVersionId);

    if (!currentVersion || !targetVersion) {
      return null;
    }

    const changes = this.compareVersions(loopId, currentVersion.id, targetVersion.id);

    // Estimate impact
    const impact = this.estimateImpact(changes);

    return {
      targetVersionId,
      currentVersionId: currentVersion.id,
      changes,
      estimatedImpact: impact,
      affectedExecutions: [], // Would need execution tracking
    };
  }

  /**
   * Estimate rollback impact
   */
  private estimateImpact(diff: VersionDiff): 'low' | 'medium' | 'high' {
    const criticalPaths = ['nodes', 'startNodeId', 'endNodeId', 'goal'];
    const criticalChanges = diff.changes.filter(c => 
      criticalPaths.some(path => c.path.startsWith(path))
    );

    if (criticalChanges.length > 5) return 'high';
    if (criticalChanges.length > 2) return 'medium';
    return 'low';
  }

  /**
   * Execute rollback
   */
  executeRollback(loopId: string, targetVersionId: string, rollbackBy: string): LoopVersion | null {
    const targetVersion = this.getVersion(loopId, targetVersionId);
    if (!targetVersion) return null;

    // Create new version with rollback config
    const rollbackVersion = this.createVersion(
      loopId,
      targetVersion.config,
      `Rollback to version ${targetVersion.version}`,
      'patch',
      rollbackBy,
      ['rollback']
    );

    return rollbackVersion;
  }

  /**
   * Tag version
   */
  tagVersion(loopId: string, versionId: string, tag: string): boolean {
    const version = this.getVersion(loopId, versionId);
    if (!version) return false;

    if (!version.tags.includes(tag)) {
      version.tags.push(tag);
    }

    return true;
  }

  /**
   * Get versions by tag
   */
  getVersionsByTag(loopId: string, tag: string): LoopVersion[] {
    const versions = this.versions.get(loopId) || [];
    return versions.filter(v => v.tags.includes(tag));
  }

  /**
   * Get version lineage
   */
  getVersionLineage(loopId: string, versionId: string): LoopVersion[] {
    const lineage: LoopVersion[] = [];
    let currentVersion = this.getVersion(loopId, versionId);

    while (currentVersion) {
      lineage.unshift(currentVersion);
      if (currentVersion.parentVersionId) {
        currentVersion = this.getVersion(loopId, currentVersion.parentVersionId);
      } else {
        break;
      }
    }

    return lineage;
  }

  /**
   * Delete old versions (cleanup)
   */
  cleanupOldVersions(loopId: string, keepCount: number = 10): number {
    const versions = this.versions.get(loopId);
    if (!versions || versions.length <= keepCount) return 0;

    const currentVersionId = this.currentVersions.get(loopId);
    const currentVersion = currentVersionId ? this.getVersion(loopId, currentVersionId) : undefined;

    // Keep current version and recent versions
    const versionsToDelete = versions
      .filter(v => v.id !== currentVersionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .slice(0, Math.max(0, versions.length - keepCount));

    versionsToDelete.forEach(v => {
      const index = versions.findIndex(ver => ver.id === v.id);
      if (index > -1) {
        versions.splice(index, 1);
      }
    });

    return versionsToDelete.length;
  }

  /**
   * Export version
   */
  exportVersion(loopId: string, versionId: string): string | null {
    const version = this.getVersion(loopId, versionId);
    if (!version) return null;

    return JSON.stringify(version, null, 2);
  }

  /**
   * Import version
   */
  importVersion(loopId: string, versionData: string, importedBy: string): LoopVersion | null {
    try {
      const version: LoopVersion = JSON.parse(versionData);
      
      // Validate version structure
      if (!version.id || !version.config || !version.version) {
        return null;
      }

      // Check if version already exists
      const existing = this.getVersion(loopId, version.id);
      if (existing) return null;

      // Add to versions
      if (!this.versions.has(loopId)) {
        this.versions.set(loopId, []);
      }

      this.versions.get(loopId)!.push(version);

      return version;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get version statistics
   */
  getVersionStats(loopId: string): {
    totalVersions: number;
    currentVersion: string | undefined;
    majorVersions: number;
    minorVersions: number;
    patchVersions: number;
    taggedVersions: number;
  } | undefined {
    const versions = this.versions.get(loopId);
    if (!versions) return undefined;

    const currentVersion = this.getCurrentVersion(loopId);

    return {
      totalVersions: versions.length,
      currentVersion: currentVersion?.version,
      majorVersions: versions.filter(v => v.changeType === 'major').length,
      minorVersions: versions.filter(v => v.changeType === 'minor').length,
      patchVersions: versions.filter(v => v.changeType === 'patch').length,
      taggedVersions: versions.filter(v => v.tags.length > 0).length,
    };
  }

  /**
   * Branch from version
   */
  branchFromVersion(
    loopId: string,
    versionId: string,
    newLoopId: string,
    branchName: string,
    createdBy: string
  ): LoopVersion | null {
    const sourceVersion = this.getVersion(loopId, versionId);
    if (!sourceVersion) return null;

    const branchedConfig = JSON.parse(JSON.stringify(sourceVersion.config));
    branchedConfig.id = newLoopId;
    branchedConfig.name = `${sourceVersion.config.name} (${branchName})`;

    const branchedVersion = this.createVersion(
      newLoopId,
      branchedConfig,
      `Branched from ${loopId}@${sourceVersion.version}`,
      'major',
      createdBy,
      ['branch', branchName]
    );

    return branchedVersion;
  }

  /**
   * Merge versions
   */
  mergeVersions(
    loopId: string,
    sourceVersionId: string,
    targetVersionId: string,
    mergedBy: string
  ): LoopVersion | null {
    const sourceVersion = this.getVersion(loopId, sourceVersionId);
    const targetVersion = this.getVersion(loopId, targetVersionId);

    if (!sourceVersion || !targetVersion) return null;

    // Simple merge: use target as base, apply source changes
    const mergedConfig = JSON.parse(JSON.stringify(targetVersion.config));
    
    // Apply source changes (simplified - in production would use proper merge strategy)
    const changes = this.compareVersions(loopId, sourceVersionId, targetVersionId);
    changes.changes.forEach(change => {
      if (change.type === 'modified' || change.type === 'added') {
        this.setNestedValue(mergedConfig, change.path, change.newValue);
      }
    });

    const mergedVersion = this.createVersion(
      loopId,
      mergedConfig,
      `Merged ${sourceVersion.version} into ${targetVersion.version}`,
      'minor',
      mergedBy,
      ['merge']
    );

    return mergedVersion;
  }

  /**
   * Set nested object value by path
   */
  private setNestedValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
  }

  /**
   * Delete loop and all its versions
   */
  deleteLoop(loopId: string): boolean {
    if (!this.versions.has(loopId)) return false;

    this.versions.delete(loopId);
    this.currentVersions.delete(loopId);

    return true;
  }
}

/**
 * Version comparison utilities
 */
export class VersionComparator {
  /**
   * Compare two version strings
   * Returns: -1 if v1 < v2, 0 if v1 == v2, 1 if v1 > v2
   */
  static compare(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    const maxLength = Math.max(parts1.length, parts2.length);

    for (let i = 0; i < maxLength; i++) {
      const p1 = parts1[i] || 0;
      const p2 = parts2[i] || 0;

      if (p1 < p2) return -1;
      if (p1 > p2) return 1;
    }

    return 0;
  }

  /**
   * Check if version is greater than another
   */
  static isGreaterThan(v1: string, v2: string): boolean {
    return this.compare(v1, v2) > 0;
  }

  /**
   * Check if version is less than another
   */
  static isLessThan(v1: string, v2: string): boolean {
    return this.compare(v1, v2) < 0;
  }

  /**
   * Check if version equals another
   */
  static equals(v1: string, v2: string): boolean {
    return this.compare(v1, v2) === 0;
  }

  /**
   * Get latest version from array
   */
  static getLatest(versions: string[]): string {
    return versions.reduce((latest, current) => 
      this.isGreaterThan(current, latest) ? current : latest
    );
  }
}
