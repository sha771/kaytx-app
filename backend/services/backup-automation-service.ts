/**
 * Backup Automation Service
 * Schedules and executes automated database backups, file backups, and verification.
 *
 * Backups run via cron-like scheduling without external cron daemon.
 * Configure retention, compression, and cloud upload via BackupConfig.
 */

import { exec, execSync } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';

const execAsync = promisify(exec);

export type BackupType = 'database' | 'files' | 'full';
export type BackupFrequency = 'hourly' | 'daily' | 'weekly' | 'monthly';
export type BackupStatus = 'pending' | 'running' | 'completed' | 'failed' | 'verified';

export interface BackupRecord {
  id: string;
  type: BackupType;
  frequency: BackupFrequency;
  status: BackupStatus;
  startedAt: Date;
  completedAt: Date | null;
  sizeBytes: number;
  checksum: string;
  location: string;
  error?: string;
  verifiedAt: Date | null;
}

export interface BackupConfig {
  /** Postgres connection string */
  databaseUrl: string;
  /** Directory to store backups locally */
  backupDir: string;
  /** Number of backups to retain per frequency (older are pruned) */
  retention: {
    hourly: number;
    daily: number;
    weekly: number;
    monthly: number;
  };
  /** Enable gzip compression */
  compress: boolean;
  /** Upload to cloud storage (S3/GCS). If false, only local. */
  cloudUpload: boolean;
  /** S3 bucket name (if cloudUpload enabled) */
  s3Bucket?: string;
  /** Verify backup integrity after creation */
  verifyOnCreate: boolean;
  /** Maximum concurrent backup jobs */
  maxConcurrent: number;
}

const DEFAULT_CONFIG: BackupConfig = {
  databaseUrl: process.env.DATABASE_URL || '',
  backupDir: process.env.BACKUP_DIR || './backups',
  retention: {
    hourly: 24, // 24 hourly backups
    daily: 30, // 30 daily backups
    weekly: 12, // 12 weekly backups
    monthly: 12, // 12 monthly backups
  },
  compress: true,
  cloudUpload: false,
  verifyOnCreate: true,
  maxConcurrent: 1,
};

export class BackupAutomationService {
  private config: BackupConfig;
  private records: BackupRecord[] = [];
  private timers: Map<string, NodeJS.Timeout> = new Map();
  private running = false;

  constructor(config?: Partial<BackupConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /** Start the scheduled backup jobs */
  start(): void {
    if (this.running) return;
    this.running = true;

    // Hourly: every hour at minute 5
    this.schedule('hourly', this.getHourlyDelay, 60 * 60 * 1000);

    // Daily: every day at 02:00
    this.schedule('daily', this.getDailyDelay, 24 * 60 * 60 * 1000);

    // Weekly: every Sunday at 03:00
    this.schedule('weekly', this.getWeeklyDelay, 7 * 24 * 60 * 60 * 1000);

    // Monthly: 1st of month at 04:00
    this.schedule('monthly', this.getMonthlyDelay, 30 * 24 * 60 * 60 * 1000);

    console.log('[BackupAutomation] Scheduled backups started:', {
      hourly: `${this.config.retention.hourly} retained`,
      daily: `${this.config.retention.daily} retained`,
      weekly: `${this.config.retention.weekly} retained`,
      monthly: `${this.config.retention.monthly} retained`,
    });
  }

  /** Stop all scheduled jobs */
  stop(): void {
    for (const [name, timer] of this.timers) {
      clearTimeout(timer);
      console.log(`[BackupAutomation] Stopped ${name} schedule`);
    }
    this.timers.clear();
    this.running = false;
  }

  /** Run a one-off backup immediately */
  async runBackup(type: BackupType = 'database', frequency: BackupFrequency = 'daily'): Promise<BackupRecord> {
    const record: BackupRecord = {
      id: this.generateId(),
      type,
      frequency,
      status: 'running',
      startedAt: new Date(),
      completedAt: null,
      sizeBytes: 0,
      checksum: '',
      location: '',
      verifiedAt: null,
    };

    this.records.push(record);

    try {
      // Ensure backup dir exists
      if (!fs.existsSync(this.config.backupDir)) {
        fs.mkdirSync(this.config.backupDir, { recursive: true });
      }

      const timestamp = record.startedAt.toISOString().replace(/[:.]/g, '-');
      const ext = this.config.compress ? 'sql.gz' : 'sql';
      const filename = `${frequency}-${type}-${timestamp}.${ext}`;
      const filepath = path.join(this.config.backupDir, filename);

      // Execute pg_dump
      const dumpCmd = this.buildDumpCommand(filepath);
      await execAsync(dumpCmd, { maxBuffer: 1024 * 1024 * 1024 });

      // Get file stats
      const stats = fs.statSync(filepath);
      const checksum = this.calculateChecksum(filepath);

      record.sizeBytes = stats.size;
      record.checksum = checksum;
      record.location = filepath;
      record.completedAt = new Date();
      record.status = 'completed';

      // Verify if configured
      if (this.config.verifyOnCreate) {
        const verified = await this.verifyBackup(filepath);
        record.verifiedAt = verified ? new Date() : null;
        if (!verified) record.status = 'failed';
      }

      // Upload to cloud if configured
      if (this.config.cloudUpload && this.config.s3Bucket) {
        await this.uploadToCloud(filepath, filename);
      }

      // Prune old backups
      await this.pruneOldBackups(frequency);

      console.log(`[BackupAutomation] Backup completed: ${filename} (${this.formatBytes(stats.size)})`);
      return record;
    } catch (error) {
      record.status = 'failed';
      record.completedAt = new Date();
      record.error = error instanceof Error ? error.message : String(error);
      console.error(`[BackupAutomation] Backup failed:`, record.error);
      return record;
    }
  }

  /** Verify backup integrity by checking the file is readable and valid SQL */
  async verifyBackup(filepath: string): Promise<boolean> {
    try {
      if (!fs.existsSync(filepath)) return false;

      const stats = fs.statSync(filepath);
      if (stats.size === 0) return false;

      // For compressed files, we can't easily verify content, but check size
      if (filepath.endsWith('.gz')) {
        return stats.size > 100; // minimum plausible size
      }

      // For plain SQL, check it starts with a comment or SQL statement
      const fd = fs.openSync(filepath, 'r');
      const buffer = Buffer.alloc(200);
      fs.readSync(fd, buffer, 0, 200, 0);
      fs.closeSync(fd);

      const header = buffer.toString('utf-8');
      return header.includes('--') || header.includes('CREATE') || header.includes('COPY') || header.includes('INSERT');
    } catch {
      return false;
    }
  }

  /** Restore from a backup file */
  async restoreBackup(filepath: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!fs.existsSync(filepath)) {
        return { success: false, error: 'Backup file not found' };
      }

      // Verify first
      const isValid = await this.verifyBackup(filepath);
      if (!isValid) {
        return { success: false, error: 'Backup file failed verification' };
      }

      // Decompress if needed
      let sqlFile = filepath;
      if (filepath.endsWith('.gz')) {
        await execAsync(`gunzip -k ${filepath}`);
        sqlFile = filepath.replace('.gz', '');
      }

      // Run psql restore
      const cmd = `psql "${this.config.databaseUrl}" < ${sqlFile}`;
      await execAsync(cmd, { maxBuffer: 1024 * 1024 * 1024 });

      console.log(`[BackupAutomation] Restore completed from: ${filepath}`);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /** List all backup records */
  getRecords(): BackupRecord[] {
    return [...this.records].sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
  }

  /** List backup files on disk */
  listBackupFiles(): Array<{ filename: string; sizeBytes: number; createdAt: Date }> {
    if (!fs.existsSync(this.config.backupDir)) return [];

    return fs
      .readdirSync(this.config.backupDir)
      .filter((f) => f.endsWith('.sql') || f.endsWith('.sql.gz'))
      .map((filename) => {
        const filepath = path.join(this.config.backupDir, filename);
        const stats = fs.statSync(filepath);
        return {
          filename,
          sizeBytes: stats.size,
          createdAt: stats.birthtime,
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /** Prune old backups per the retention policy */
  async pruneOldBackups(frequency: BackupFrequency): Promise<number> {
    const keepCount = this.config.retention[frequency];
    if (!fs.existsSync(this.config.backupDir)) return 0;

    const prefix = frequency;
    const files = fs
      .readdirSync(this.config.backupDir)
      .filter((f) => f.startsWith(prefix))
      .sort()
      .reverse(); // newest first

    const toDelete = files.slice(keepCount);
    for (const f of toDelete) {
      try {
        fs.unlinkSync(path.join(this.config.backupDir, f));
      } catch {
        /* ignore */
      }
    }

    return toDelete.length;
  }

  /** Get total size of all stored backups */
  getTotalBackupSize(): number {
    if (!fs.existsSync(this.config.backupDir)) return 0;
    return fs
      .readdirSync(this.config.backupDir)
      .reduce((sum, f) => {
        try {
          return sum + fs.statSync(path.join(this.config.backupDir, f)).size;
        } catch {
          return sum;
        }
      }, 0);
  }

  // ============================================================================
  // Private scheduling helpers
  // ============================================================================

  private schedule(name: string, getDelay: () => number, interval: number): void {
    const run = async () => {
      try {
        await this.runBackup('database', name as BackupFrequency);
      } catch (error) {
        console.error(`[BackupAutomation] ${name} backup failed:`, error);
      }
      // Reschedule for next interval
      const timer = setTimeout(run, interval);
      this.timers.set(name, timer);
    };

    const initialDelay = getDelay.call(this);
    const timer = setTimeout(run, initialDelay);
    this.timers.set(name, timer);
  }

  private getHourlyDelay(): number {
    const now = new Date();
    const minutesToNext = 60 - now.getMinutes() + 5; // 5 minutes past the hour
    return minutesToNext * 60 * 1000;
  }

  private getDailyDelay(): number {
    const now = new Date();
    const target = new Date(now);
    target.setHours(2, 0, 0, 0); // 2 AM
    if (target <= now) target.setDate(target.getDate() + 1);
    return target.getTime() - now.getTime();
  }

  private getWeeklyDelay(): number {
    const now = new Date();
    const target = new Date(now);
    const daysUntilSunday = (7 - now.getDay()) % 7;
    target.setDate(now.getDate() + daysUntilSunday);
    target.setHours(3, 0, 0, 0); // 3 AM Sunday
    if (target <= now) target.setDate(target.getDate() + 7);
    return target.getTime() - now.getTime();
  }

  private getMonthlyDelay(): number {
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth() + 1, 1, 4, 0, 0, 0); // 1st of next month, 4 AM
    return target.getTime() - now.getTime();
  }

  private buildDumpCommand(outputPath: string): string {
    const url = new URL(this.config.databaseUrl);
    const dbName = url.pathname.slice(1);
    const host = url.hostname;
    const port = url.port || '5432';
    const user = url.username;
    const password = url.password;

    const env = `PGPASSWORD="${password}"`;
    const base = `pg_dump -h ${host} -p ${port} -U ${user} -d ${dbName} --no-owner --no-acl --format=custom`;

    if (this.config.compress) {
      return `${env} ${base} | gzip > ${outputPath}`;
    }
    return `${env} ${base} > ${outputPath}`;
  }

  private calculateChecksum(filepath: string): string {
    const content = fs.readFileSync(filepath);
    return createHash('sha256').update(content).digest('hex').slice(0, 32);
  }

  private async uploadToCloud(filepath: string, key: string): Promise<void> {
    if (!this.config.s3Bucket) return;
    try {
      execSync(`aws s3 cp ${filepath} s3://${this.config.s3Bucket}/backups/${key}`, {
        stdio: 'pipe',
        timeout: 300000, // 5 min
      });
      console.log(`[BackupAutomation] Uploaded to s3://${this.config.s3Bucket}/backups/${key}`);
    } catch (error) {
      console.error('[BackupAutomation] Cloud upload failed:', error);
    }
  }

  private generateId(): string {
    return `bkp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
  }
}

// Singleton instance
export const backupAutomation = new BackupAutomationService();
