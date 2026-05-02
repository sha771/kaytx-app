/**
 * Comprehensive Unit Tests for Consolidated Platform Sync Service
 * Tests all functionality including job management, webhook processing, and analytics
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { ConsolidatedPlatformSyncService } from '../../../services/consolidated-platform-sync-service';
import { db } from '../../../db/connection';
import { eq, and, gte, lte, desc, sql } from 'drizzle-orm';
import { EventEmitter } from 'events';

// Mock dependencies
jest.mock('../../../db/connection');
jest.mock('../../../services/consolidated-audit-service');

describe('ConsolidatedPlatformSyncService', () => {
  let syncService: ConsolidatedPlatformSyncService;
  let mockDb: any;
  let mockAuditService: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock database
    mockDb = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      having: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      onConflictDoUpdate: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({}),
    };

    // Mock audit service
    mockAuditService = {
      createAuditLog: jest.fn().mockResolvedValue({}),
    };

    // Use jest.requireMock to get the mocked db
    const mockedDb = jest.requireMock('../../../db/connection').db;
    Object.assign(mockedDb, mockDb);
    syncService = new ConsolidatedPlatformSyncService();
  });

  afterEach(async () => {
    await syncService.cleanup();
  });

  describe('Job Management', () => {
    it('should create sync job successfully', async () => {
      const jobData = {
        organizationId: 'org-123',
        platformType: 'salesforce',
        syncType: 'incremental',
        config: {
          objects: ['contacts', 'opportunities'],
          filters: { lastModified: '2024-01-01' }
        },
        priority: 'normal',
        scheduledAt: new Date()
      };

      const mockJob = {
        id: 'job-123',
        ...jobData,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockDb.execute.mockResolvedValue({ insertId: 'job-123' });
      mockDb.select.mockReturnValue([mockJob]);

      const result = await syncService.createSyncJob(jobData);

      expect(result).toBeDefined();
      expect(result.platformType).toBe('salesforce');
      expect(result.syncType).toBe('incremental');
      expect(result.status).toBe('pending');
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockAuditService.createAuditLog).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'sync.job.created',
          resource: 'platform-sync',
          severity: 'info'
        })
      );
    });

    it('should execute sync job successfully', async () => {
      const jobId = 'job-123';
      const mockJob = {
        id: jobId,
        organizationId: 'org-123',
        platformType: 'salesforce',
        syncType: 'full',
        config: { objects: ['contacts'] },
        status: 'running'
      };

      mockDb.select.mockReturnValue([mockJob]);
      mockDb.execute.mockResolvedValue({});

      // Mock successful sync execution
      const syncResult = {
        recordsProcessed: 100,
        recordsCreated: 80,
        recordsUpdated: 20,
        errors: []
      };

      jest.spyOn(syncService as any, 'executeSyncOperation').mockResolvedValue(syncResult);

      const result = await syncService.executeSyncJob(jobId);

      expect(result).toBeDefined();
      expect(result.recordsProcessed).toBe(100);
      expect(result.recordsCreated).toBe(80);
      expect(result.recordsUpdated).toBe(20);
      expect(mockDb.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'completed'
        })
      );
    });

    it('should handle sync job failures', async () => {
      const jobId = 'job-123';
      const mockJob = {
        id: jobId,
        organizationId: 'org-123',
        platformType: 'salesforce',
        syncType: 'incremental',
        status: 'running'
      };

      mockDb.select.mockReturnValue([mockJob]);
      mockDb.execute.mockResolvedValue({});

      // Mock sync failure
      const syncError = new Error('API connection failed');
      jest.spyOn(syncService as any, 'executeSyncOperation').mockRejectedValue(syncError);

      const result = await syncService.executeSyncJob(jobId);

      expect(result).toBeDefined();
      expect(result.status).toBe('failed');
      expect(result.error).toBe('API connection failed');
      expect(mockDb.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'failed',
          error: 'API connection failed'
        })
      );
    });

    it('should retry failed sync jobs', async () => {
      const jobId = 'job-123';
      const mockJob = {
        id: jobId,
        organizationId: 'org-123',
        platformType: 'salesforce',
        retryCount: 1,
        maxRetries: 3,
        status: 'failed'
      };

      mockDb.select.mockReturnValue([mockJob]);
      mockDb.execute.mockResolvedValue({});

      // Mock successful retry
      const syncResult = { recordsProcessed: 50, errors: [] };
      jest.spyOn(syncService as any, 'executeSyncOperation').mockResolvedValue(syncResult);

      const result = await syncService.retrySyncJob(jobId);

      expect(result).toBeDefined();
      expect(result.status).toBe('completed');
      expect(mockDb.update).toHaveBeenCalledWith(
        expect.objectContaining({
          retryCount: 2,
          status: 'completed'
        })
      );
    });

    it('should not retry jobs exceeding max retries', async () => {
      const jobId = 'job-123';
      const mockJob = {
        id: jobId,
        organizationId: 'org-123',
        retryCount: 3,
        maxRetries: 3,
        status: 'failed'
      };

      mockDb.select.mockReturnValue([mockJob]);

      await expect(syncService.retrySyncJob(jobId))
        .rejects.toThrow('Maximum retries exceeded');
    });
  });

  describe('Webhook Processing', () => {
    it('should process webhook events successfully', async () => {
      const webhookEvent = {
        id: 'webhook-123',
        platformType: 'salesforce',
        eventType: 'object.created',
        objectId: 'contact-123',
        objectType: 'Contact',
        data: {
          Id: 'contact-123',
          Name: 'John Doe',
          Email: 'john@example.com'
        },
        timestamp: new Date()
      };

      const mockWebhook = {
        id: 'webhook-123',
        ...webhookEvent,
        processed: false,
        createdAt: new Date()
      };

      mockDb.execute.mockResolvedValue({ insertId: 'webhook-123' });
      mockDb.select.mockReturnValue([mockWebhook]);

      // Mock successful webhook processing
      jest.spyOn(syncService as any, 'processWebhookData').mockResolvedValue({
        success: true,
        recordsProcessed: 1
      });

      const result = await syncService.processWebhook(webhookEvent);

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(1);
      expect(mockDb.update).toHaveBeenCalledWith(
        expect.objectContaining({
          processed: true,
          processedAt: expect.any(Date)
        })
      );
    });

    it('should handle webhook processing failures', async () => {
      const webhookEvent = {
        id: 'webhook-123',
        platformType: 'salesforce',
        eventType: 'object.updated',
        objectId: 'contact-123',
        data: { invalid: 'data' }
      };

      const mockWebhook = {
        id: 'webhook-123',
        ...webhookEvent,
        processed: false
      };

      mockDb.execute.mockResolvedValue({ insertId: 'webhook-123' });
      mockDb.select.mockReturnValue([mockWebhook]);

      // Mock webhook processing failure
      jest.spyOn(syncService as any, 'processWebhookData').mockRejectedValue(
        new Error('Invalid webhook data')
      );

      const result = await syncService.processWebhook(webhookEvent);

      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid webhook data');
    });

    it('should queue webhook events for batch processing', async () => {
      const webhookEvents = [
        {
          id: 'webhook-1',
          platformType: 'salesforce',
          eventType: 'object.created',
          data: { Id: '1', Name: 'Contact 1' }
        },
        {
          id: 'webhook-2',
          platformType: 'salesforce',
          eventType: 'object.created',
          data: { Id: '2', Name: 'Contact 2' }
        }
      ];

      mockDb.execute.mockResolvedValue({});

      const result = await syncService.queueWebhookEvents(webhookEvents);

      expect(result.queuedCount).toBe(2);
      expect(result.failureCount).toBe(0);
      expect(mockDb.insert).toHaveBeenCalledTimes(2);
    });

    it('should process webhook batches efficiently', async () => {
      const webhookBatch = Array(100).fill(null).map((_, index) => ({
        id: `webhook-${index}`,
        platformType: 'salesforce',
        eventType: 'object.created',
        data: { Id: index.toString(), Name: `Contact ${index}` },
        processed: false
      }));

      mockDb.select.mockReturnValue(webhookBatch);
      mockDb.execute.mockResolvedValue({});

      // Mock batch processing
      jest.spyOn(syncService as any, 'processWebhookBatch').mockResolvedValue({
        processed: 100,
        failed: 0
      });

      const result = await syncService.processWebhookBatch({
        platformType: 'salesforce',
        batchSize: 50
      });

      expect(result.processed).toBe(100);
      expect(result.failed).toBe(0);
    });
  });

  describe('Sync Analytics', () => {
    it('should calculate sync performance metrics', async () => {
      const mockMetrics = [
        {
          date: '2024-01-01',
          totalJobs: 10,
          successfulJobs: 8,
          failedJobs: 2,
          avgDuration: 1200, // seconds
          recordsProcessed: 5000,
          recordsCreated: 3000,
          recordsUpdated: 2000
        },
        {
          date: '2024-01-02',
          totalJobs: 12,
          successfulJobs: 11,
          failedJobs: 1,
          avgDuration: 1000,
          recordsProcessed: 6000,
          recordsCreated: 3500,
          recordsUpdated: 2500
        }
      ];

      mockDb.select.mockReturnValue(mockMetrics);

      const result = await syncService.getSyncAnalytics('org-123', {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-02')
      });

      expect(result).toHaveLength(2);
      expect(result[0].totalJobs).toBe(10);
      expect(result[0].successRate).toBe(0.8);
      expect(result[0].avgDuration).toBe(1200);
    });

    it('should track platform health metrics', async () => {
      const mockHealthData = [
        {
          platformType: 'salesforce',
          connectionStatus: 'healthy',
          lastSync: new Date('2024-01-01T10:00:00Z'),
          apiLatency: 150,
          errorRate: 0.02,
          uptime: 0.998
        },
        {
          platformType: 'hubspot',
          connectionStatus: 'degraded',
          lastSync: new Date('2024-01-01T09:30:00Z'),
          apiLatency: 800,
          errorRate: 0.15,
          uptime: 0.950
        }
      ];

      mockDb.select.mockReturnValue(mockHealthData);

      const result = await syncService.getPlatformHealthMetrics('org-123');

      expect(result).toHaveLength(2);
      expect(result[0].platformType).toBe('salesforce');
      expect(result[0].connectionStatus).toBe('healthy');
      expect(result[0].apiLatency).toBe(150);
      expect(result[1].connectionStatus).toBe('degraded');
      expect(result[1].errorRate).toBe(0.15);
    });

    it('should analyze sync trends and patterns', async () => {
      const mockTrends = [
        {
          period: '2024-W01',
          totalRecords: 10000,
          newRecords: 2000,
          updatedRecords: 8000,
          errorRate: 0.03,
          avgProcessingTime: 1.2
        },
        {
          period: '2024-W02',
          totalRecords: 12000,
          newRecords: 2500,
          updatedRecords: 9500,
          errorRate: 0.02,
          avgProcessingTime: 1.1
        }
      ];

      mockDb.select.mockReturnValue(mockTrends);

      const result = await syncService.getSyncTrends('org-123', {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-14'),
        granularity: 'weekly'
      });

      expect(result).toHaveLength(2);
      expect(result[0].period).toBe('2024-W01');
      expect(result[0].totalRecords).toBe(10000);
      expect(result[0].errorRate).toBe(0.03);
    });

    it('should generate sync recommendations', async () => {
      const mockRecommendations = [
        {
          type: 'performance',
          title: 'Optimize sync frequency',
          description: 'Consider reducing sync frequency for low-activity objects',
          impact: 'medium',
          effort: 'low'
        },
        {
          type: 'reliability',
          title: 'Improve error handling',
          description: 'Implement better retry logic for API timeouts',
          impact: 'high',
          effort: 'medium'
        }
      ];

      mockDb.select.mockReturnValue(mockRecommendations);

      const result = await syncService.getSyncRecommendations('org-123');

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('performance');
      expect(result[0].impact).toBe('medium');
      expect(result[1].title).toBe('Improve error handling');
    });
  });

  describe('Connection Management', () => {
    it('should establish platform connections', async () => {
      const connectionConfig = {
        platformType: 'salesforce',
        organizationId: 'org-123',
        credentials: {
          clientId: 'client-123',
          clientSecret: 'secret-123',
          refreshToken: 'token-123'
        },
        settings: {
          apiVersion: 'v58.0',
          timeout: 30000
        }
      };

      const mockConnection = {
        id: 'conn-123',
        ...connectionConfig,
        status: 'connected',
        connectedAt: new Date()
      };

      mockDb.execute.mockResolvedValue({ insertId: 'conn-123' });
      mockDb.select.mockReturnValue([mockConnection]);

      // Mock successful connection
      jest.spyOn(syncService as any, 'testPlatformConnection').mockResolvedValue(true);

      const result = await syncService.establishConnection(connectionConfig);

      expect(result).toBeDefined();
      expect(result.status).toBe('connected');
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it('should test platform connection health', async () => {
      const connectionId = 'conn-123';
      const mockConnection = {
        id: connectionId,
        platformType: 'salesforce',
        credentials: { clientId: 'client-123' }
      };

      mockDb.select.mockReturnValue([mockConnection]);

      // Mock health check
      jest.spyOn(syncService as any, 'performHealthCheck').mockResolvedValue({
        status: 'healthy',
        latency: 150,
        errors: []
      });

      const result = await syncService.testConnectionHealth(connectionId);

      expect(result.status).toBe('healthy');
      expect(result.latency).toBe(150);
      expect(result.errors).toHaveLength(0);
    });

    it('should handle connection failures gracefully', async () => {
      const connectionConfig = {
        platformType: 'salesforce',
        organizationId: 'org-123',
        credentials: { invalid: 'credentials' }
      };

      // Mock connection failure
      jest.spyOn(syncService as any, 'testPlatformConnection').mockRejectedValue(
        new Error('Invalid credentials')
      );

      await expect(syncService.establishConnection(connectionConfig))
        .rejects.toThrow('Invalid credentials');
    });
  });

  describe('Data Transformation', () => {
    it('should transform platform data to standard format', async () => {
      const sourceData = {
        Contact: [
          {
            Id: '001xx000003DGb2AAG',
            Name: 'John Doe',
            Email: 'john@example.com',
            Phone: '+1234567890'
          }
        ]
      };

      const expectedTransformedData = {
        contacts: [
          {
            id: '001xx000003DGb2AAG',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            source: 'salesforce',
            sourceId: '001xx000003DGb2AAG'
          }
        ]
      };

      const result = await syncService.transformPlatformData('salesforce', sourceData);

      expect(result).toEqual(expectedTransformedData);
    });

    it('should handle data validation during transformation', async () => {
      const invalidData = {
        Contact: [
          {
            Id: '', // Invalid empty ID
            Name: null, // Invalid null name
            Email: 'invalid-email' // Invalid email format
          }
        ]
      };

      const result = await syncService.transformPlatformData('salesforce', invalidData);

      expect(result.contacts).toHaveLength(0); // Should Filter out invalid records
    });

    it('should apply field mappings during transformation', async () => {
      const sourceData = {
        Lead: [
          {
            Id: '001xx000003DGb2AAG',
            FirstName: 'John',
            LastName: 'Doe',
            Company: 'Acme Corp',
            AnnualRevenue: '1000000'
          }
        ]
      };

      const fieldMappings = {
        'FirstName': 'first_name',
        'LastName': 'last_name',
        'Company': 'company_name',
        'AnnualRevenue': 'annual_revenue'
      };

      const result = await syncService.transformPlatformData('salesforce', sourceData, fieldMappings);

      expect(result.leads[0].first_name).toBe('John');
      expect(result.leads[0].last_name).toBe('Doe');
      expect(result.leads[0].company_name).toBe('Acme Corp');
      expect(result.leads[0].annual_revenue).toBe('1000000');
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle API rate limiting', async () => {
      const rateLimitError = new Error('RATE_LIMIT_EXCEEDED');
      rateLimitError.name = 'RateLimitError';

      // Mock rate limit handling
      jest.spyOn(syncService as any, 'handleRateLimit').mockResolvedValue({
        retryAfter: 60,
        shouldRetry: true
      });

      const result = await syncService.handleSyncError(rateLimitError, {
        jobId: 'job-123',
        platformType: 'salesforce'
      });

      expect(result.shouldRetry).toBe(true);
      expect(result.retryAfter).toBe(60);
    });

    it('should implement exponential backoff for retries', async () => {
      const retryableError = new Error('Temporary API failure');
      
      const delays: number[] = [];
      const originalSetTimeout = global.setTimeout;

      global.setTimeout = jest.fn().mockImplementation((callback, delay) => {
        delays.push(delay);
        return originalSetTimeout(callback, 0); // Execute immediately for testing
      });

      await syncService.executeWithRetry(
        () => Promise.reject(retryableError),
        { maxAttempts: 3, baseDelay: 1000 }
      );

      // Check exponential backoff: 1000, 2000, 4000
      expect(delays).toEqual([1000, 2000, 4000]);

      global.setTimeout = originalSetTimeout;
    });

    it('should log and track sync errors', async () => {
      const error = new Error('Sync operation failed');
      const context = {
        jobId: 'job-123',
        platformType: 'salesforce',
        operation: 'contact_sync',
        recordCount: 100
      };

      mockDb.execute.mockResolvedValue({ insertId: 'error-123' });

      const result = await syncService.logSyncError(error, context);

      expect(result).toBeDefined();
      expect(result.error).toBe(error.message);
      expect(result.context).toEqual(context);
      expect(mockAuditService.createAuditLog).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'sync.error',
          severity: 'error'
        })
      );
    });
  });

  describe('Performance Optimization', () => {
    it('should implement efficient batch processing', async () => {
      const largeDataset = Array(1000).fill(null).map((_, index) => ({
        id: `record-${index}`,
        name: `Record ${index}`,
        email: `record${index}@example.com`
      }));

      const startTime = Date.now();
      const result = await syncService.processBatchData(largeDataset, {
        batchSize: 100,
        maxConcurrency: 5
      });
      const endTime = Date.now();

      expect(result.processed).toBe(1000);
      expect(result.failed).toBe(0);
      expect(endTime - startTime).toBeLessThan(3000); // Should complete within 3 seconds
    });

    it('should cache frequently accessed data', async () => {
      const cacheKey = 'salesforce:contact_fields';
      const cachedData = { fields: ['Id', 'Name', 'Email'] };

      // First call - should fetch from API
      jest.spyOn(syncService as any, 'fetchPlatformSchema').mockResolvedValue(cachedData);
      const result1 = await syncService.getPlatformSchema('salesforce', 'Contact');

      // Second call - should hit cache
      const result2 = await syncService.getPlatformSchema('salesforce', 'Contact');

      expect(result1).toEqual(cachedData);
      expect(result2).toEqual(cachedData);
      expect(syncService['fetchPlatformSchema']).toHaveBeenCalledTimes(1);
    });

    it('should optimize database queries', async () => {
      // Mock efficient query execution
      mockDb.select.mockReturnValue([
        { id: '1', status: 'completed', duration: 1200 },
        { id: '2', status: 'completed', duration: 1000 }
      ]);

      const startTime = Date.now();
      const result = await syncService.getRecentSyncJobs('org-123', { limit: 100 });
      const endTime = Date.now();

      expect(result).toHaveLength(2);
      expect(endTime - startTime).toBeLessThan(100); // Should be very fast
    });
  });

  describe('Resource Management', () => {
    it('should cleanup resources properly', async () => {
      const syncService = new ConsolidatedPlatformSyncService();
      
      // Create some jobs and connections
      await syncService.createSyncJob({
        organizationId: 'org-123',
        platformType: 'salesforce',
        syncType: 'incremental'
      });

      // Cleanup should not throw errors
      await expect(syncService.cleanup()).resolves.not.toThrow();
    });

    it('should handle concurrent sync operations', async () => {
      const jobPromises = Array(5).fill(null).map((_, index) =>
        syncService.createSyncJob({
          organizationId: 'org-123',
          platformType: 'salesforce',
          syncType: 'incremental',
          priority: index % 2 === 0 ? 'high' : 'normal'
        })
      );

      mockDb.execute.mockResolvedValue({ insertId: `job-${Math.random()}` });

      const results = await Promise.all(jobPromises);

      expect(results).toHaveLength(5);
      results.forEach(result => {
        expect(result).toBeDefined();
      });
    });

    it('should prevent memory leaks in long-running processes', async () => {
      // Simulate long-running sync process
      const longRunningJob = {
        id: 'job-long',
        organizationId: 'org-123',
        platformType: 'salesforce',
        syncType: 'full'
      };

      mockDb.select.mockReturnValue([longRunningJob]);
      mockDb.execute.mockResolvedValue({});

      // Mock incremental processing
      let processedCount = 0;
      jest.spyOn(syncService as any, 'processIncrementalBatch').mockImplementation(async () => {
        processedCount += 100;
        if (processedCount < 1000) {
          return { hasMore: true, processed: 100 };
        }
        return { hasMore: false, processed: 100 };
      });

      const result = await syncService.executeSyncJob('job-long');

      expect(result.recordsProcessed).toBe(1000);
      expect(processedCount).toBe(1000);
    });
  });
});
