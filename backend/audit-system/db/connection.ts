/**
 * SQLite database connection and initialization
 */

import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';
import type {
  IssueRecord,
  RemediationRecord,
  MetricRecord,
  Issue,
  RemediationAction,
  ActionStatus,
} from '../models/types';

export class AuditDatabase {
  private db: Database.Database;
  private readonly dbPath: string;

  constructor(dbPath: string = './backend/audit-system/db/audit.db') {
    this.dbPath = dbPath;
    this.db = new Database(dbPath);
    this.initialize();
  }

  /**
   * Initialize database with schema
   */
  private initialize(): void {
    // Enable foreign keys
    this.db.pragma('foreign_keys = ON');
    
    // Set journal mode to WAL for better concurrency
    this.db.pragma('journal_mode = WAL');
    
    // Load and execute schema
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    this.db.exec(schema);
  }

  /**
   * Close database connection
   */
  close(): void {
    this.db.close();
  }

  // ============================================================================
  // Issues Operations
  // ============================================================================

  /**
   * Insert a new issue
   */
  insertIssue(issue: Issue): void {
    const stmt = this.db.prepare(`
      INSERT INTO issues (
        id, type, severity, status, title, description, file_path, line_number,
        detected_at, resolved_at, assigned_to, estimated_effort, actual_effort,
        auto_fixable, metadata
      ) VALUES (
        @id, @type, @severity, @status, @title, @description, @filePath, @lineNumber,
        @detectedAt, @resolvedAt, @assignedTo, @estimatedEffort, @actualEffort,
        @autoFixable, @metadata
      )
    `);

    stmt.run({
      id: issue.id,
      type: issue.type,
      severity: issue.severity,
      status: issue.status,
      title: issue.title,
      description: issue.description,
      filePath: issue.filePath,
      lineNumber: issue.lineNumber,
      detectedAt: issue.detectedAt.toISOString(),
      resolvedAt: issue.resolvedAt?.toISOString() ?? null,
      assignedTo: null,
      estimatedEffort: issue.estimatedEffort,
      actualEffort: issue.actualEffort,
      autoFixable: issue.autoFixable ? 1 : 0,
      metadata: JSON.stringify(issue.metadata),
    });
  }

  /**
   * Get all issues
   */
  getAllIssues(): IssueRecord[] {
    const stmt = this.db.prepare('SELECT * FROM issues ORDER BY severity, detected_at DESC');
    return stmt.all() as IssueRecord[];
  }

  /**
   * Get issues by status
   */
  getIssuesByStatus(status: string): IssueRecord[] {
    const stmt = this.db.prepare('SELECT * FROM issues WHERE status = ? ORDER BY severity, detected_at DESC');
    return stmt.all(status) as IssueRecord[];
  }

  /**
   * Get issues by severity
   */
  getIssuesBySeverity(severity: string): IssueRecord[] {
    const stmt = this.db.prepare('SELECT * FROM issues WHERE severity = ? ORDER BY detected_at DESC');
    return stmt.all(severity) as IssueRecord[];
  }

  /**
   * Get issues by type
   */
  getIssuesByType(type: string): IssueRecord[] {
    const stmt = this.db.prepare('SELECT * FROM issues WHERE type = ? ORDER BY severity, detected_at DESC');
    return stmt.all(type) as IssueRecord[];
  }

  /**
   * Update issue status
   */
  updateIssueStatus(issueId: string, status: string, resolvedAt?: Date): void {
    const stmt = this.db.prepare(`
      UPDATE issues 
      SET status = ?, resolved_at = ?
      WHERE id = ?
    `);
    stmt.run(status, resolvedAt?.toISOString() ?? null, issueId);
  }

  /**
   * Delete issue
   */
  deleteIssue(issueId: string): void {
    const stmt = this.db.prepare('DELETE FROM issues WHERE id = ?');
    stmt.run(issueId);
  }

  /**
   * Get issue count by severity
   */
  getIssueCountBySeverity(): Map<string, number> {
    const stmt = this.db.prepare('SELECT * FROM v_open_issues_by_severity');
    const results = stmt.all() as { severity: string; count: number }[];
    return new Map(results.map(r => [r.severity, r.count]));
  }

  /**
   * Get issue count by type
   */
  getIssueCountByType(): Map<string, number> {
    const stmt = this.db.prepare('SELECT type, count FROM v_issues_by_type');
    const results = stmt.all() as { type: string; count: number }[];
    return new Map(results.map(r => [r.type, r.count]));
  }

  // ============================================================================
  // Remediations Operations
  // ============================================================================

  /**
   * Insert a new remediation
   */
  insertRemediation(remediation: {
    id: string;
    issueId: string;
    actionType: string;
    status: ActionStatus;
    filesModified: string[];
    filesDeleted: string[];
  }): void {
    const stmt = this.db.prepare(`
      INSERT INTO remediations (
        id, issue_id, action_type, status, files_modified, files_deleted
      ) VALUES (
        @id, @issueId, @actionType, @status, @filesModified, @filesDeleted
      )
    `);

    stmt.run({
      id: remediation.id,
      issueId: remediation.issueId,
      actionType: remediation.actionType,
      status: remediation.status,
      filesModified: JSON.stringify(remediation.filesModified),
      filesDeleted: JSON.stringify(remediation.filesDeleted),
    });
  }

  /**
   * Update remediation status
   */
  updateRemediationStatus(
    remediationId: string,
    status: ActionStatus,
    backupId?: string,
    testsPassed?: boolean,
    error?: string
  ): void {
    const now = new Date().toISOString();
    const stmt = this.db.prepare(`
      UPDATE remediations 
      SET status = ?,
          backup_id = COALESCE(?, backup_id),
          tests_passed = COALESCE(?, tests_passed),
          error = COALESCE(?, error),
          started_at = COALESCE(started_at, ?),
          completed_at = CASE WHEN ? IN ('completed', 'failed', 'rolled_back') THEN ? ELSE completed_at END
      WHERE id = ?
    `);
    stmt.run(
      status,
      backupId ?? null,
      testsPassed !== undefined ? (testsPassed ? 1 : 0) : null,
      error ?? null,
      now,
      status,
      now,
      remediationId
    );
  }

  /**
   * Get remediations by issue ID
   */
  getRemediationsByIssueId(issueId: string): RemediationRecord[] {
    const stmt = this.db.prepare('SELECT * FROM remediations WHERE issue_id = ? ORDER BY created_at DESC');
    return stmt.all(issueId) as RemediationRecord[];
  }

  /**
   * Get remediation statistics
   */
  getRemediationStats(): {
    action_type: string;
    total: number;
    completed: number;
    failed: number;
    rolled_back: number;
    success_rate: number;
  }[] {
    const stmt = this.db.prepare('SELECT * FROM v_remediation_stats');
    return stmt.all() as {
      action_type: string;
      total: number;
      completed: number;
      failed: number;
      rolled_back: number;
      success_rate: number;
    }[];
  }

  // ============================================================================
  // Metrics Operations
  // ============================================================================

  /**
   * Insert a new metric
   */
  insertMetric(metric: {
    id: string;
    timestamp: Date;
    metricType: string;
    value: number;
    metadata: Record<string, unknown>;
  }): void {
    const stmt = this.db.prepare(`
      INSERT INTO metrics (id, timestamp, metric_type, value, metadata)
      VALUES (@id, @timestamp, @metricType, @value, @metadata)
    `);

    stmt.run({
      id: metric.id,
      timestamp: metric.timestamp.toISOString(),
      metricType: metric.metricType,
      value: metric.value,
      metadata: JSON.stringify(metric.metadata),
    });
  }

  /**
   * Get metrics by type
   */
  getMetricsByType(metricType: string, limit: number = 100): MetricRecord[] {
    const stmt = this.db.prepare(`
      SELECT * FROM metrics 
      WHERE metric_type = ? 
      ORDER BY timestamp DESC 
      LIMIT ?
    `);
    return stmt.all(metricType, limit) as MetricRecord[];
  }

  /**
   * Get latest metric value
   */
  getLatestMetric(metricType: string): MetricRecord | undefined {
    const stmt = this.db.prepare(`
      SELECT * FROM metrics 
      WHERE metric_type = ? 
      ORDER BY timestamp DESC 
      LIMIT 1
    `);
    return stmt.get(metricType) as MetricRecord | undefined;
  }

  // ============================================================================
  // Backups Operations
  // ============================================================================

  /**
   * Insert a new backup
   */
  insertBackup(backup: {
    id: string;
    timestamp: Date;
    actionId: string | null;
    reason: string;
    createdBy: string;
    tags: string[];
    fileCount: number;
    totalSize: number;
    backupPath: string;
  }): void {
    const stmt = this.db.prepare(`
      INSERT INTO backups (
        id, timestamp, action_id, reason, created_by, tags, 
        file_count, total_size, backup_path
      ) VALUES (
        @id, @timestamp, @actionId, @reason, @createdBy, @tags,
        @fileCount, @totalSize, @backupPath
      )
    `);

    stmt.run({
      id: backup.id,
      timestamp: backup.timestamp.toISOString(),
      actionId: backup.actionId,
      reason: backup.reason,
      createdBy: backup.createdBy,
      tags: JSON.stringify(backup.tags),
      fileCount: backup.fileCount,
      totalSize: backup.totalSize,
      backupPath: backup.backupPath,
    });
  }

  /**
   * Insert backup file
   */
  insertBackupFile(backupFile: {
    id: string;
    backupId: string;
    originalPath: string;
    backupPath: string;
    hash: string;
    size: number;
  }): void {
    const stmt = this.db.prepare(`
      INSERT INTO backup_files (id, backup_id, original_path, backup_path, hash, size)
      VALUES (@id, @backupId, @originalPath, @backupPath, @hash, @size)
    `);

    stmt.run(backupFile);
  }

  /**
   * Get backup by ID
   */
  getBackupById(backupId: string): {
    id: string;
    timestamp: string;
    action_id: string | null;
    reason: string;
    created_by: string;
    tags: string;
    file_count: number;
    total_size: number;
    backup_path: string;
  } | undefined {
    const stmt = this.db.prepare('SELECT * FROM backups WHERE id = ?');
    return stmt.get(backupId) as
      | {
          id: string;
          timestamp: string;
          action_id: string | null;
          reason: string;
          created_by: string;
          tags: string;
          file_count: number;
          total_size: number;
          backup_path: string;
        }
      | undefined;
  }

  /**
   * Get backup files by backup ID
   */
  getBackupFiles(backupId: string): {
    id: string;
    backup_id: string;
    original_path: string;
    backup_path: string;
    hash: string;
    size: number;
  }[] {
    const stmt = this.db.prepare('SELECT * FROM backup_files WHERE backup_id = ?');
    return stmt.all(backupId) as {
      id: string;
      backup_id: string;
      original_path: string;
      backup_path: string;
      hash: string;
      size: number;
    }[];
  }

  /**
   * Delete old backups
   */
  deleteOldBackups(retentionDays: number): number {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

    const stmt = this.db.prepare('DELETE FROM backups WHERE timestamp < ?');
    const result = stmt.run(cutoffDate.toISOString());
    return result.changes;
  }

  // ============================================================================
  // Scan History Operations
  // ============================================================================

  /**
   * Insert scan history
   */
  insertScanHistory(scan: {
    id: string;
    timestamp: Date;
    totalFiles: number;
    totalLines: number;
    scanDuration: number;
    issuesFound: number;
    config: Record<string, unknown>;
  }): void {
    const stmt = this.db.prepare(`
      INSERT INTO scan_history (
        id, timestamp, total_files, total_lines, scan_duration, issues_found, config
      ) VALUES (
        @id, @timestamp, @totalFiles, @totalLines, @scanDuration, @issuesFound, @config
      )
    `);

    stmt.run({
      id: scan.id,
      timestamp: scan.timestamp.toISOString(),
      totalFiles: scan.totalFiles,
      totalLines: scan.totalLines,
      scanDuration: scan.scanDuration,
      issuesFound: scan.issuesFound,
      config: JSON.stringify(scan.config),
    });
  }

  /**
   * Get recent scans
   */
  getRecentScans(limit: number = 10): {
    timestamp: string;
    total_files: number;
    total_lines: number;
    scan_duration: number;
    issues_found: number;
    issues_per_file: number;
  }[] {
    const stmt = this.db.prepare('SELECT * FROM v_recent_scans LIMIT ?');
    return stmt.all(limit) as {
      timestamp: string;
      total_files: number;
      total_lines: number;
      scan_duration: number;
      issues_found: number;
      issues_per_file: number;
    }[];
  }
}

// Singleton instance
let dbInstance: AuditDatabase | null = null;

/**
 * Get database instance (singleton)
 */
export function getDatabase(dbPath?: string): AuditDatabase {
  if (!dbInstance) {
    dbInstance = new AuditDatabase(dbPath);
  }
  return dbInstance;
}

/**
 * Close database connection
 */
export function closeDatabase(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}
