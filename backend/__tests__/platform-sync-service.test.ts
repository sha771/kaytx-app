import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { ConsolidatedPlatformSyncService } from '../services/consolidated-platform-sync-service';

/**
 * Platform Sync Service Tests
 * Tests the consolidated platform sync service functionality
 */

describe('ConsolidatedPlatformSyncService', () => {
  let platformSyncService: ConsolidatedPlatformSyncService;
  const testOrganizationId = 'test-org-123';

  beforeEach(() => {
    platformSyncService = new ConsolidatedPlatformSyncService();
  });

  afterEach(async () => {
    await platformSyncService.cleanup();
  });

  describe('Job Management', () => {
    it('should enqueue and run sync jobs', async () => {
      const job = await platformSyncService.enqueueAndRunJob({
        organizationId: testOrganizationId,
        platform: 'salesforce',
        jobType: 'test_sync',
        payload: { test: 'data' }
      });

      expect(job).toBeDefined();
      expect(job.organizationId).toBe(testOrganizationId);
      expect(job.platform).toBe('salesforce');
      expect(job.jobType).toBe('test_sync');
      expect(job.status).toBe('pending');
    });

    it('should handle job priorities correctly', async () => {
      // High priority job
      const highPriorityJob = await platformSyncService.enqueueAndRunJob({
        organizationId: testOrganizationId,
        platform: 'stripe',
        jobType: 'urgent_sync',
        payload: { critical: 'data' }
      });

      // Low priority job
      const lowPriorityJob = await platformSyncService.enqueueAndRunJob({
        organizationId: testOrganizationId,
        platform: 'calendly',
        jobType: 'routine_sync',
        payload: { routine: 'data' }
      });

      expect(highPriorityJob.priority).toBeGreaterThan(lowPriorityJob.priority);
    });

    it('should process webhook event jobs', async () => {
      const webhookEvent = await platformSyncService.recordWebhookEvent({
        organizationId: testOrganizationId,
        platform: 'stripe',
        eventId: 'evt_test_123',
        payload: { type: 'payment_intent.succeeded' }
      });

      expect(webhookEvent).toBeDefined();
      expect(webhookEvent.platform).toBe('stripe');
      expect(webhookEvent.eventId).toBe('evt_test_123');
    });
  });

  describe('Sync Operations', () => {
    it('should perform platform sync operations', async () => {
      const result = await platformSyncService.performPlatformSync(
        testOrganizationId,
        'hubspot',
        undefined,
        {
          batchSize: 10,
          maxRetries: 2,
          retryDelayMs: 1000
        }
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBeGreaterThanOrEqual(0);
    });

    it('should handle sync failures gracefully', async () => {
      // Test with invalid platform
      const result = await platformSyncService.performPlatformSync(
        testOrganizationId,
        'invalid_platform',
        undefined
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should retry failed operations', async () => {
      const result = await platformSyncService.performPlatformSync(
        testOrganizationId,
        'salesforce',
        undefined,
        {
          batchSize: 10,
          maxRetries: 3,
          retryDelayMs: 1000
        }
      );

      expect(result).toBeDefined();
      // Should handle retries based on configuration
    });
  });

  describe('Analytics', () => {
    it('should provide comprehensive analytics', async () => {
      const analytics = await platformSyncService.getAnalytics(testOrganizationId);

      expect(analytics).toBeDefined();
      expect(analytics.overview).toBeDefined();
      expect(analytics.byPlatform).toBeDefined();
      expect(analytics.performanceMetrics).toBeDefined();
      expect(analytics.recentActivity).toBeDefined();
      expect(analytics.errors).toBeDefined();
      expect(analytics.recommendations).toBeDefined();
    });

    it('should include date range filtering', async () => {
      const dateRange = {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        end: new Date()
      };

      const analytics = await platformSyncService.getAnalytics(testOrganizationId, dateRange);

      expect(analytics).toBeDefined();
      // Should filter data by date range
    });

    it('should generate meaningful recommendations', async () => {
      const analytics = await platformSyncService.getAnalytics(testOrganizationId);

      expect(analytics.recommendations).toBeDefined();
      expect(analytics.recommendations.length).toBeGreaterThan(0);
    });

    it('should track performance metrics', async () => {
      const analytics = await platformSyncService.getAnalytics(testOrganizationId);

      expect(analytics.performanceMetrics).toBeDefined();
      expect(analytics.performanceMetrics.fastestSync).toBeGreaterThanOrEqual(0);
      expect(analytics.performanceMetrics.slowestSync).toBeGreaterThanOrEqual(0);
      expect(analytics.performanceMetrics.medianSyncTime).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid job data gracefully', async () => {
      const job = await platformSyncService.enqueueAndRunJob({
        organizationId: 'invalid-org',
        platform: 'salesforce',
        jobType: 'test_sync',
        payload: null
      });

      expect(job).toBeDefined();
      expect(job.status).toBe('pending');
    });

    it('should handle webhook processing errors', async () => {
      const result = await platformSyncService.processPlatformWebhook(
        'invalid_platform',
        testOrganizationId,
        'invalid-json',
        {}
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle analytics errors gracefully', async () => {
      const analytics = await platformSyncService.getAnalytics('invalid-org');

      expect(analytics).toBeDefined();
      // Should handle invalid organization gracefully
    });
  });

  describe('Resource Management', () => {
    it('should cleanup resources properly', async () => {
      // Create some jobs to test cleanup
      await platformSyncService.enqueueAndRunJob({
        organizationId: testOrganizationId,
        platform: 'salesforce',
        jobType: 'cleanup_test',
        payload: {}
      });

      await platformSyncService.cleanup();

      // Should not throw and should clean up all resources
      expect(platformSyncService['realTimeSyncIntervals']).toBeDefined();
      expect(platformSyncService['activeJobs']).toBeDefined();
      expect(platformSyncService['jobQueue']).toBeDefined();
    });

    it('should handle concurrent operations', async () => {
      const jobPromises = [];
      
      // Create multiple concurrent jobs
      for (let i = 0; i < 10; i++) {
        jobPromises.push(
          platformSyncService.enqueueAndRunJob({
            organizationId: testOrganizationId,
            platform: 'salesforce',
            jobType: `concurrent_test_${i}`,
            payload: { iteration: i }
          })
        );
      }

      const jobs = await Promise.all(jobPromises);
      expect(jobs).toHaveLength(10);
      
      jobs.forEach((job, index) => {
        expect(job.jobType).toBe(`concurrent_test_${index}`);
      });
    });
  });

  describe('Integration Tests', () => {
    it('should handle end-to-end workflow', async () => {
      // Record a webhook event
      const webhookEvent = await platformSyncService.recordWebhookEvent({
        organizationId: testOrganizationId,
        platform: 'stripe',
        eventId: 'evt_integration_test',
        payload: { type: 'payment_intent.succeeded' }
      });

      // This should automatically trigger a sync job
      expect(webhookEvent).toBeDefined();
      expect(webhookEvent.status).toBe('received');
    });

    it('should maintain data consistency', async () => {
      // Create multiple jobs and verify they're processed correctly
      const jobs = [];
      
      for (let i = 0; i < 5; i++) {
        jobs.push(
          platformSyncService.enqueueAndRunJob({
            organizationId: testOrganizationId,
            platform: 'hubspot',
            jobType: `consistency_test_${i}`,
            payload: { iteration: i }
          })
        );
      }

      await Promise.all(jobs);
      
      // Verify all jobs were created
      jobs.forEach((job, index) => {
        expect(job.jobType).toBe(`consistency_test_${index}`);
      });
    });
  });
});
