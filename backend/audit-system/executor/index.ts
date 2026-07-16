/**
 * Executor Module
 * Safely executes remediation actions with backup, rollback, and test verification
 */

import * as fs from 'fs';
import * as path from 'path';
import { nanoid } from 'nanoid';
import type {
  RemediationAction,
  RemediationPhase,
  ExecutionResult,
  TestResult,
  PhaseResult,
  RollbackResult,
  Backup,
  BackupFile,
  BackupMetadata,
  RollbackStrategy,
} from '../models/types';

export class SafeExecutor {
  private backups: Map<string, Backup> = new Map();
  private results: ExecutionResult[] = [];
  private dryRun: boolean;
  private testAfterEach: boolean;
  private rollbackOnFailure: boolean;

  constructor(options?: { dryRun?: boolean; testAfterEach?: boolean; rollbackOnFailure?: boolean }) {
    this.dryRun = options?.dryRun ?? false;
    this.testAfterEach = options?.testAfterEach ?? true;
    this.rollbackOnFailure = options?.rollbackOnFailure ?? true;
  }

  /**
   * Execute a single remediation action safely
   */
  async executeAction(action: RemediationAction): Promise<ExecutionResult> {
    const backupId = nanoid();
    const startTime = Date.now();

    // Phase 1: Create backup before any changes
    if (!this.dryRun) {
      await this.createBackup(backupId, action);
    }

    try {
      // Phase 2: Execute modifications
      if (!this.dryRun) {
        for (const file of action.filesToModify) {
          if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf-8');
            // Apply the modification (placeholder — actual logic depends on action type)
            fs.writeFileSync(file, content, 'utf-8');
          }
        }

        for (const file of action.filesToDelete) {
          if (fs.existsSync(file)) {
            fs.unlinkSync(file);
          }
        }
      }

      // Phase 3: Run tests if configured
      const testResults = this.testAfterEach
        ? await this.runTests(action.testCommand)
        : { passed: true, totalTests: 0, passedTests: 0, failedTests: 0, coverage: 0 };

      // Phase 4: Rollback on failure if configured
      if (!testResults.passed && this.rollbackOnFailure) {
        await this.rollback(backupId);
        return {
          actionId: action.id,
          success: false,
          filesModified: this.dryRun ? [] : action.filesToModify,
          filesDeleted: this.dryRun ? [] : action.filesToDelete,
          backupId,
          testResults,
          duration: Date.now() - startTime,
          error: new Error('Tests failed — changes rolled back'),
          timestamp: new Date(),
        };
      }

      const result: ExecutionResult = {
        actionId: action.id,
        success: testResults.passed,
        filesModified: this.dryRun ? [] : action.filesToModify,
        filesDeleted: this.dryRun ? [] : action.filesToDelete,
        backupId,
        testResults,
        duration: Date.now() - startTime,
        timestamp: new Date(),
      };

      this.results.push(result);
      return result;
    } catch (error) {
      // Rollback on error
      if (this.rollbackOnFailure && !this.dryRun) {
        await this.rollback(backupId);
      }

      const result: ExecutionResult = {
        actionId: action.id,
        success: false,
        filesModified: [],
        filesDeleted: [],
        backupId,
        testResults: { passed: false, totalTests: 0, passedTests: 0, failedTests: 0, coverage: 0 },
        duration: Date.now() - startTime,
        error: error instanceof Error ? error : new Error(String(error)),
        timestamp: new Date(),
      };

      this.results.push(result);
      return result;
    }
  }

  /**
   * Execute a full remediation phase
   */
  async executePhase(phase: RemediationPhase): Promise<PhaseResult> {
    const startTime = Date.now();
    let completedActions = 0;
    let rollbackPerformed = false;

    for (const action of phase.actions) {
      if (!action.autoExecutable) continue;

      const result = await this.executeAction(action);

      if (result.success) {
        completedActions++;
      } else {
        rollbackPerformed = true;
        break;
      }
    }

    return {
      phaseId: phase.id,
      success: completedActions === phase.actions.length,
      completedActions,
      totalActions: phase.actions.length,
      duration: Date.now() - startTime,
      rollbackPerformed,
      timestamp: new Date(),
    };
  }

  /**
   * Create a backup of files before modification
   */
  async createBackup(backupId: string, action: RemediationAction): Promise<Backup> {
    const files: BackupFile[] = [];
    const backupDir = path.join('.audit-backups', backupId);

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const allFiles = [...action.filesToModify, ...action.filesToDelete];
    for (const filePath of allFiles) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath);
        const hash = require('crypto').createHash('sha256').update(content).digest('hex').slice(0, 16);
        const backupPath = path.join(backupDir, filePath.replace(/[\\/]/g, '_'));

        fs.writeFileSync(backupPath, content);

        files.push({
          originalPath: filePath,
          backupPath,
          hash,
          size: content.length,
        });
      }
    }

    const backup: Backup = {
      id: backupId,
      timestamp: new Date(),
      files,
      metadata: {
        actionId: action.id,
        reason: 'Pre-remediation backup',
        createdBy: 'audit-system',
        tags: ['remediation', action.type],
      },
    };

    this.backups.set(backupId, backup);
    return backup;
  }

  /**
   * Rollback a failed action by restoring from backup
   */
  async rollback(backupId: string): Promise<RollbackResult> {
    const backup = this.backups.get(backupId);
    if (!backup) {
      return {
        success: false,
        filesRestored: 0,
        duration: 0,
        error: new Error(`No backup found for ID: ${backupId}`),
        timestamp: new Date(),
      };
    }

    const startTime = Date.now();
    let restored = 0;

    for (const file of backup.files) {
      try {
        if (fs.existsSync(file.backupPath)) {
          const dir = path.dirname(file.originalPath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.copyFileSync(file.backupPath, file.originalPath);
          restored++;
        }
      } catch (error) {
        return {
          success: false,
          filesRestored: restored,
          duration: Date.now() - startTime,
          error: error instanceof Error ? error : new Error(String(error)),
          timestamp: new Date(),
        };
      }
    }

    return {
      success: true,
      filesRestored: restored,
      duration: Date.now() - startTime,
      timestamp: new Date(),
    };
  }

  /**
   * Clean up old backups beyond retention period
   */
  async cleanupBackups(retentionDays = 30): Promise<number> {
    const now = Date.now();
    const cutoff = now - retentionDays * 24 * 60 * 60 * 1000;
    let cleaned = 0;

    for (const [id, backup] of this.backups) {
      if (backup.timestamp.getTime() < cutoff) {
        // Delete backup files from disk
        for (const file of backup.files) {
          try { fs.unlinkSync(file.backupPath); } catch { /* ignore */ }
        }
        this.backups.delete(id);
        cleaned++;
      }
    }

    return cleaned;
  }

  getResults(): ExecutionResult[] {
    return this.results;
  }

  getBackup(id: string): Backup | undefined {
    return this.backups.get(id);
  }

  private async runTests(testCommand: string): Promise<TestResult> {
    if (!testCommand) {
      return { passed: true, totalTests: 0, passedTests: 0, failedTests: 0, coverage: 0 };
    }

    try {
      const { execSync } = require('child_process');
      const output = execSync(testCommand, {
        timeout: 60000,
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      // Parse jest output for pass/fail counts
      const passedMatch = output.match(/(\d+)\s+passing/);
      const failedMatch = output.match(/(\d+)\s+failing/);

      return {
        passed: !failedMatch,
        totalTests: (passedMatch ? parseInt(passedMatch[1]) : 0) + (failedMatch ? parseInt(failedMatch[1]) : 0),
        passedTests: passedMatch ? parseInt(passedMatch[1]) : 0,
        failedTests: failedMatch ? parseInt(failedMatch[1]) : 0,
        coverage: 0,
      };
    } catch (error: any) {
      return {
        passed: false,
        totalTests: 0,
        passedTests: 0,
        failedTests: 1,
        coverage: 0,
        failureDetails: [{ testName: testCommand, errorMessage: error.message, stackTrace: '' }],
      };
    }
  }
}

export class BackupManager {
  private backupsDir = '.audit-backups';

  listBackups(): Backup[] {
    if (!fs.existsSync(this.backupsDir)) return [];
    const dirs = fs.readdirSync(this.backupsDir);
    return dirs.map(id => ({
      id,
      timestamp: fs.statSync(path.join(this.backupsDir, id)).birthtime,
      files: [],
      metadata: { actionId: '', reason: '', createdBy: '', tags: [] },
    }));
  }

  getBackupSize(): number {
    if (!fs.existsSync(this.backupsDir)) return 0;
    return this.calculateDirSize(this.backupsDir);
  }

  private calculateDirSize(dir: string): number {
    let size = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) size += this.calculateDirSize(full);
      else size += fs.statSync(full).size;
    }
    return size;
  }
}
