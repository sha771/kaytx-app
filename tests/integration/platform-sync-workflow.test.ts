import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { PlatformSyncEngine } from '../../backend/services/platform-sync-engine';
import { platformAuthService } from '../../backend/services/platform-auth-service';
import { platformDataSyncService } from '../../backend/services/platform-data-sync-service';

jest.mock('../../backend/services/platform-auth-service');
jest.mock('../../backend/services/platform-data-sync-service');
jest.mock('../../backend/db/connection');

describe('Platform Sync Integration Tests', () => {
  let syncEngine: PlatformSyncEngine;
  let mockDb: any;

  beforeEach(() => {
    jest.clearAllMocks();
    syncEngine = new PlatformSyncEngine();
    
    mockDb = {
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    
    require('../../backend/db/connection').pgDb = mockDb;
  });

  describe('Complete Platform Sync Workflow', () => {
    it('should complete full sync workflow for Salesforce', async () => {
      // Mock platform connection
      (platformAuthService.ensureValidCredentialsForOrg as jest.Mock).mockResolvedValue({
        accessToken: 'salesforce-access-token',
        refreshToken: 'salesforce-refresh-token',
        platformId: 'salesforce-connection-123',
      });

      // Mock successful sync
      (platformDataSyncService.syncPlatform as jest.Mock).mockResolvedValue({
        success: true,
        recordsProcessed: 150,
        messageCount: 75,
        errors: [],
        lastSyncAt: new Date(),
      });

      // Mock job insertion
      mockDb.insert.mockReturnValue({
        values: jest.fn().mockResolvedValue([{ id: 'sync-job-123' }]),
      });

      // Mock job status update
      mockDb.update.mockReturnValue({
        where: jest.fn().mockReturnValue({
          set: jest.fn().mockResolvedValue(undefined),
        }),
      });

      // Trigger sync
      const result = await syncEngine.triggerSync({
        organizationId: 'org-123',
        platform: 'salesforce',
        jobType: 'manual_sync',
      });

      expect(result).toBeDefined();
      expect(platformAuthService.ensureValidCredentialsForOrg).toHaveBeenCalledWith('org-123', 'salesforce');
      expect(platformDataSyncService.syncPlatform).toHaveBeenCalled();
    });

    it('should handle sync failures and retry logic', async () => {
      // Mock credentials
      (platformAuthService.ensureValidCredentialsForOrg as jest.Mock).mockResolvedValue({
        accessToken: 'hubspot-access-token',
        platformId: 'hubspot-connection-123',
      });

      // Mock sync failure
      (platformDataSyncService.syncPlatform as jest.Mock).mockResolvedValue({
        success: false,
        recordsProcessed: 0,
        messageCount: 0,
        errors: ['Rate limit exceeded', 'API timeout'],
        lastSyncAt: new Date(),
      });

      // Mock job operations
      mockDb.insert.mockReturnValue({
        values: jest.fn().mockResolvedValue([{ id: 'failed-sync-job-123' }]),
      });

      mockDb.update.mockReturnValue({
        where: jest.fn().mockReturnValue({
          set: jest.fn().mockResolvedValue(undefined),
        }),
      });

      // Expect sync to fail
      await expect(syncEngine.triggerSync({
        organizationId: 'org-123',
        platform: 'hubspot',
        jobType: 'manual_sync',
      })).rejects.toThrow('Sync failed: Rate limit exceeded, API timeout');
    });

    it('should handle multiple platform syncs concurrently', async () => {
      const platforms = ['salesforce', 'hubspot', 'slack'];
      
      // Mock credentials for all platforms
      (platformAuthService.ensureValidCredentialsForOrg as jest.Mock).mockResolvedValue({
        accessToken: 'mock-access-token',
        platformId: 'mock-connection-123',
      });

      // Mock successful syncs
      (platformDataSyncService.syncPlatform as jest.Mock).mockResolvedValue({
        success: true,
        recordsProcessed: 100,
        messageCount: 50,
        errors: [],
        lastSyncAt: new Date(),
      });

      // Mock job insertion
      mockDb.insert.mockReturnValue({
        values: jest.fn().mockResolvedValue([{ id: 'concurrent-sync-job-123' }]),
      });

      // Trigger concurrent syncs
      const syncPromises = platforms.map(platform =>
        syncEngine.triggerSync({
          organizationId: 'org-123',
          platform: platform as any,
          jobType: 'manual_sync',
        })
      );

      const results = await Promise.all(syncPromises);

      expect(results).toHaveLength(3);
      expect(platformDataSyncService.syncPlatform).toHaveBeenCalledTimes(3);
    });
  });

  describe('Platform Connection Management', () => {
    it('should handle expired credentials refresh', async () => {
      // Mock expired credentials
      (platformAuthService.ensureValidCredentialsForOrg as jest.Mock)
        .mockResolvedValueOnce({
          accessToken: 'expired-token',
          refreshToken: 'valid-refresh-token',
          expiresAt: new Date(Date.now() - 1000), // Expired
        })
        .mockResolvedValueOnce({
          accessToken: 'new-access-token',
          refreshToken: 'new-refresh-token',
          expiresAt: new Date(Date.now() + 3600000), // Valid for 1 hour
        });

      // Mock successful sync after refresh
      (platformDataSyncService.syncPlatform as jest.Mock).mockResolvedValue({
        success: true,
        recordsProcessed: 50,
        messageCount: 25,
        errors: [],
        lastSyncAt: new Date(),
      });

      mockDb.insert.mockReturnValue({
        values: jest.fn().mockResolvedValue([{ id: 'refresh-sync-job-123' }]),
      });

      const result = await syncEngine.triggerSync({
        organizationId: 'org-123',
        platform: 'microsoft_teams',
        jobType: 'manual_sync',
      });

      expect(result).toBeDefined();
      expect(platformAuthService.ensureValidCredentialsForOrg).toHaveBeenCalledTimes(2);
    });

    it('should handle platform connection not found', async () => {
      (platformAuthService.ensureValidCredentialsForOrg as jest.Mock).mockResolvedValue(null);

      await expect(syncEngine.triggerSync({
        organizationId: 'org-123',
        platform: 'stripe',
        jobType: 'manual_sync',
      })).rejects.toThrow('Invalid or expired credentials for stripe');
    });
  });

  describe('Sync Job Management', () => {
    it('should track sync job status throughout lifecycle', async () => {
      const jobId = 'status-tracking-job-123';

      // Mock job creation
      mockDb.insert.mockReturnValue({
        values: jest.fn().mockResolvedValue([{ id: jobId }]),
      });

      // Mock credentials
      (platformAuthService.ensureValidCredentialsForOrg as jest.Mock).mockResolvedValue({
        accessToken: 'tracking-token',
        platformId: 'tracking-connection-123',
      });

      // Mock sync with progress
      (platformDataSyncService.syncPlatform as jest.Mock).mockImplementation(async () => {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
          success: true,
          recordsProcessed: 200,
          messageCount: 100,
          errors: [],
          lastSyncAt: new Date(),
        };
      });

      // Mock status queries
      mockDb.select.mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([
            { id: jobId, status: 'pending' },
            { id: jobId, status: 'in_progress' },
            { id: jobId, status: 'completed' },
          ]),
        }),
      });

      // Start sync
      const syncPromise = syncEngine.triggerSync({
        organizationId: 'org-123',
        platform: 'calendly',
        jobType: 'manual_sync',
      });

      // Check status during sync
      const status1 = await syncEngine.getJobStatus(jobId);
      expect(status1?.status).toBeDefined();

      await syncPromise;

      // Check final status
      const finalStatus = await syncEngine.getJobStatus(jobId);
      expect(finalStatus?.status).toBe('completed');
    });

    it('should handle sync job cancellation', async () => {
      const jobId = 'cancellable-job-123';

      // Mock job creation
      mockDb.insert.mockReturnValue({
        values: jest.fn().mockResolvedValue([{ id: jobId }]),
      });

      // Mock long-running sync
      (platformDataSyncService.syncPlatform as jest.Mock).mockImplementation(async () => {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Long sync
        return {
          success: true,
          recordsProcessed: 1000,
          messageCount: 500,
          errors: [],
          lastSyncAt: new Date(),
        };
      });

      // Start sync
      const syncPromise = syncEngine.triggerSync({
        organizationId: 'org-123',
        platform: 'zoom',
        jobType: 'scheduled_sync',
      });

      // Cancel after short delay
      setTimeout(async () => {
        await syncEngine.cancelJob(jobId);
      }, 100);

      // Expect cancellation to work
      await expect(syncPromise).rejects.toThrow('Job cancelled');
    });
  });

  describe('Error Recovery and Retry Logic', () => {
    it('should implement exponential backoff for failed syncs', async () => {
      let attemptCount = 0;

      // Mock credentials
      (platformAuthService.ensureValidCredentialsForOrg as jest.Mock).mockResolvedValue({
        accessToken: 'retry-token',
        platformId: 'retry-connection-123',
      });

      // Mock initial failures, then success
      (platformDataSyncService.syncPlatform as jest.Mock).mockImplementation(async () => {
        attemptCount++;
        if (attemptCount < 3) {
          throw new Error('Temporary API failure');
        }
        return {
          success: true,
          recordsProcessed: 100,
          messageCount: 50,
          errors: [],
          lastSyncAt: new Date(),
        };
      });

      mockDb.insert.mockReturnValue({
        values: jest.fn().mockResolvedValue([{ id: 'retry-job-123' }]),
      });

      const startTime = Date.now();
      const result = await syncEngine.triggerSync({
        organizationId: 'org-123',
        platform: 'google_workspace',
        jobType: 'manual_sync',
      });
      const endTime = Date.now();

      expect(result).toBeDefined();
      expect(attemptCount).toBe(3);
      expect(endTime - startTime).toBeGreaterThan(1000); // Should have delays between retries
    });

    it('should handle platform-specific error responses', async () => {
      (platformAuthService.ensureValidCredentialsForOrg as jest.Mock).mockResolvedValue({
        accessToken: 'error-test-token',
        platformId: 'error-connection-123',
      });

      // Mock platform-specific error
      (platformDataSyncService.syncPlatform as jest.Mock).mockResolvedValue({
        success: false,
        recordsProcessed: 0,
        messageCount: 0,
        errors: [
          'Salesforce: INVALID_SESSION_ID: Invalid session ID',
          'Salesforce: LIMIT_EXCEEDED: Concurrent limit exceeded'
        ],
        lastSyncAt: new Date(),
      });

      mockDb.insert.mockReturnValue({
        values: jest.fn().mockResolvedValue([{ id: 'error-job-123' }]),
      });

      await expect(syncEngine.triggerSync({
        organizationId: 'org-123',
        platform: 'salesforce',
        jobType: 'manual_sync',
      })).rejects.toThrow('Salesforce: INVALID_SESSION_ID: Invalid session ID, Salesforce: LIMIT_EXCEEDED: Concurrent limit exceeded');
    });
  });
});
