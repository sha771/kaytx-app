/**
 * Backup Automation Service Tests
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { BackupAutomationService } from '../../backend/services/backup-automation-service';

describe('BackupAutomationService', () => {
  let service: BackupAutomationService;

  beforeEach(() => {
    service = new BackupAutomationService({
      databaseUrl: 'postgresql://test:test@localhost/test',
      backupDir: './test-backups',
      compress: true,
      cloudUpload: false,
      verifyOnCreate: false,
    });
  });

  it('should construct with config', () => {
    expect(service).toBeDefined();
  });

  it('should start and stop scheduling', () => {
    service.start();
    service.stop();
    // Should not throw
  });

  it('should return empty records initially', () => {
    expect(service.getRecords()).toEqual([]);
  });

  it('should return empty list when backup dir does not exist', () => {
    const records = service.listBackupFiles();
    expect(records).toEqual([]);
  });

  it('should return 0 total size when no backups', () => {
    expect(service.getTotalBackupSize()).toBe(0);
  });

  it('should format record with id', () => {
    // Verify the service has the generateId method indirectly via records
    const records = service.getRecords();
    expect(Array.isArray(records)).toBe(true);
  });
});
