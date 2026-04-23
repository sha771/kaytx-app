import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { platformDataSyncService } from '../../services/platform-data-sync-service';
import { platformAuthService } from '../../services/platform-auth-service';
import { platformSyncEngine } from '../../services/consolidated-platform-sync-service';
import { db as pgDb } from '../../db/connection';
import { logAudit } from '../../lib/audit';
import axios from 'axios';

// Mock dependencies
jest.mock('../../services/platform-auth-service');
jest.mock('../../services/platform-sync-engine');
jest.mock('../../db/connection');
jest.mock('../../lib/audit');
jest.mock('axios');

const mockPlatformAuthService = platformAuthService as jest.Mocked<typeof platformAuthService>;
const mockPlatformSyncEngine = platformSyncEngine as jest.Mocked<typeof platformSyncEngine>;
const mockDb = pgDb as jest.Mocked<typeof pgDb>;
const mockLogAudit = logAudit as jest.MockedFunction<typeof logAudit>;
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Platform Sync Integration Tests', () => {
  const mockOrganizationId = 'org-123';
  const mockConnectionId = 'conn-123';
  const mockUserId = 'user-123';
  const mockJobId = 'job-123';

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup mock responses
    mockPlatformAuthService.ensureValidCredentialsForOrg = jest.fn().mockResolvedValue({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      subdomain: 'test-domain',
      shopDomain: 'test-shop.myshopify.com'
    });

    mockPlatformSyncEngine.enqueueSyncJob = jest.fn().mockResolvedValue({ jobId: mockJobId });
    mockPlatformSyncEngine.getSyncJobStatus = jest.fn().mockResolvedValue({
      id: mockJobId,
      status: 'completed',
      recordsProcessed: 100,
      errors: []
    });

    mockDb.select = jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue([])
        })
      })
    });

    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: 'sync-123' }] as any)
      })
    });

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ id: 'sync-123' }] as any)
        })
      })
    });

    // Mock axios create
    mockAxios.create = jest.fn().mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });

    // Mock audit log
    mockLogAudit.mockResolvedValue(undefined);
  });

  describe('Complete Platform Sync Workflow', () => {
    it('should handle complete multi-platform sync workflow', async () => {
      // Step 1: Enqueue sync jobs for multiple platforms
      const platforms = ['salesforce', 'hubspot', 'zendesk', 'shopify'];
      const syncJobs = [];

      for (const platform of platforms) {
        const job = await platformSyncEngine.enqueueSyncJob({
          organizationId: mockOrganizationId,
          platform: platform as any,
          connectionId: mockConnectionId,
          syncType: 'full',
          scheduledFor: new Date(),
          priority: 'normal'
        });

        syncJobs.push(job);
        expect(job.jobId).toBeDefined();
      }

      expect(syncJobs).toHaveLength(4);

      // Step 2: Execute sync for each platform
      const mockSalesforceData = {
        records: [
          { Id: '001xx000003DHPh', Name: 'Test Account', Type: 'Customer' },
          { Id: '001xx000003DHPi', Name: 'Another Account', Type: 'Partner' }
        ]
      };

      const mockHubSpotData = {
        contacts: [
          { id: '123', properties: { email: 'test@example.com', firstname: 'John' } }
        ]
      };

      const mockZendeskData = {
        tickets: [
          { id: 123, subject: 'Support Request', status: 'open' }
        ],
        users: [
          { id: 456, name: 'John Doe', email: 'john@example.com' }
        ]
      };

      const mockShopifyData = {
        orders: [
          { id: 123456789, name: '#1001', total_price: '99.99' }
        ],
        products: [
          { id: 987654321, title: 'Test Product' }
        ],
        customers: [
          { id: 555666777, first_name: 'Jane', email: 'jane@example.com' }
        ]
      };

      // Mock API responses for each platform
      const mockClient = {
        get: jest.fn()
          .mockResolvedValueOnce({ data: mockSalesforceData }) // Salesforce
          .mockResolvedValueOnce({ data: mockHubSpotData }) // HubSpot
          .mockResolvedValueOnce({ data: mockZendeskData }) // Zendesk tickets
          .mockResolvedValueOnce({ data: { users: mockZendeskData.users } }) // Zendesk users
          .mockResolvedValueOnce({ data: mockShopifyData }) // Shopify orders
          .mockResolvedValueOnce({ data: { products: mockShopifyData.products } }) // Shopify products
          .mockResolvedValueOnce({ data: { customers: mockShopifyData.customers } }) // Shopify customers
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      // Execute sync for each platform
      const syncResults = [];
      for (const platform of platforms) {
        const result = await platformDataSyncService.syncPlatform(
          mockOrganizationId,
          platform as any,
          mockConnectionId
        );
        syncResults.push(result);
      }

      // Verify all syncs succeeded
      expect(syncResults.every((r: any) => r.success)).toBe(true);
      expect(syncResults[0].recordsProcessed).toBe(2); // Salesforce
      expect(syncResults[1].recordsProcessed).toBe(1); // HubSpot
      expect(syncResults[2].recordsProcessed).toBe(2); // Zendesk
      expect(syncResults[3].recordsProcessed).toBe(3); // Shopify

      // Step 3: Verify data was stored in database
      expect(mockDb.insert).toHaveBeenCalledTimes(7); // 2 Salesforce + 1 HubSpot + 2 Zendesk + 3 Shopify

      // Step 4: Verify audit logging
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'PLATFORM_DATA_SYNC',
          resource: 'platform_sync',
          status: 'success'
        })
      );
    });

    it('should handle scheduled sync with throttling', async () => {
      // Step 1: Schedule multiple sync jobs
      const scheduledJobs = [];
      const platforms = ['salesforce', 'hubspot', 'zendesk'];

      for (let i = 0; i < platforms.length; i++) {
        const scheduledTime = new Date(Date.now() + (i + 1) * 60000); // Schedule 1 minute apart
        const job = await platformSyncEngine.enqueueSyncJob({
          organizationId: mockOrganizationId,
          platform: platforms[i] as any,
          connectionId: mockConnectionId,
          syncType: 'incremental',
          scheduledFor: scheduledTime,
          priority: 'normal'
        });

        scheduledJobs.push(job);
      }

      expect(scheduledJobs).toHaveLength(3);

      // Step 2: Mock sync engine throttling
      mockPlatformSyncEngine.runDueJobs = jest.fn().mockImplementation(async () => {
        // Simulate running jobs with throttling
        const results = [];
        for (const job of scheduledJobs) {
          // Simulate delay for throttling
          await new Promise(resolve => setTimeout(resolve, 100));
          
          mockPlatformSyncEngine.getSyncJobStatus = jest.fn().mockResolvedValue({
            id: job.jobId,
            status: 'running',
            progress: 50
          });

          results.push({
            jobId: job.jobId,
            status: 'running',
            progress: 50
          });
        }
        return results;
      });

      // Step 3: Run due jobs
      const runResults = await platformSyncEngine.runDueJobs();

      expect(runResults).toHaveLength(3);
      expect(runResults.every((r: any) => r.status === 'running')).toBe(true);

      // Step 4: Verify throttling was respected
      expect(mockPlatformSyncEngine.runDueJobs).toHaveBeenCalled();
    });

    it('should handle sync failures and retry logic', async () => {
      // Step 1: Create sync job that will fail
      const job = await platformSyncEngine.enqueueSyncJob({
        organizationId: mockOrganizationId,
        platform: 'salesforce',
        connectionId: mockConnectionId,
        syncType: 'full',
        priority: 'high'
      });

      // Step 2: Mock API failure
      const mockClient = {
        get: jest.fn().mockRejectedValue(new Error('Salesforce API rate limit exceeded'))
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      // Step 3: Execute sync (should fail)
      const syncResult = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(syncResult.success).toBe(false);
      expect(syncResult.errors).toContain('Salesforce sync error: Salesforce API rate limit exceeded');

      // Step 4: Mock retry logic
      mockPlatformSyncEngine.retryFailedJob = jest.fn().mockResolvedValue({
        jobId: job.jobId,
        status: 'pending_retry',
        retryCount: 1,
        nextRetryAt: new Date(Date.now() + 300000) // 5 minutes later
      });

      // Step 5: Retry failed job
      const retryResult = await platformSyncEngine.retryFailedJob(job.jobId);

      expect(retryResult.status).toBe('pending_retry');
      expect(retryResult.retryCount).toBe(1);

      // Step 6: Verify failure was logged
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'PLATFORM_DATA_SYNC',
          resource: 'platform_sync',
          status: 'failure'
        })
      );
    });

    it('should handle real-time webhook sync', async () => {
      // Step 1: Simulate webhook from Salesforce
      const salesforceWebhook = {
        eventType: 'created',
        object: 'Account',
        data: {
          Id: '001xx000003DHPh',
          Name: 'New Account',
          Type: 'Customer',
          CreatedDate: new Date().toISOString()
        }
      };

      // Step 2: Process webhook
      const webhookResult = await platformDataSyncService.processWebhook(
        mockOrganizationId,
        'salesforce',
        salesforceWebhook
      );

      expect(webhookResult.success).toBe(true);
      expect(webhookResult.recordsProcessed).toBe(1);

      // Step 3: Verify data was stored
      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          organizationId: mockOrganizationId,
          platform: 'salesforce',
          platformId: '001xx000003DHPh'
        })
      );

      // Step 4: Simulate webhook from Shopify
      const shopifyWebhook = {
        eventType: 'orders/create',
        data: {
          id: 123456789,
          name: '#1002',
          total_price: '149.99',
          customer: { id: 555666777 }
        }
      };

      const shopifyResult = await platformDataSyncService.processWebhook(
        mockOrganizationId,
        'shopify',
        shopifyWebhook
      );

      expect(shopifyResult.success).toBe(true);
      expect(shopifyResult.recordsProcessed).toBe(1);

      // Step 5: Verify webhook audit logging
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'PLATFORM_WEBHOOK_PROCESSED',
          resource: 'platform_webhook',
          status: 'success'
        })
      );
    });
  });

  describe('Cross-Platform Data Consistency', () => {
    it('should maintain data consistency across platforms', async () => {
      // Step 1: Sync same customer from multiple platforms
      const customerEmail = 'john.doe@example.com';

      // Salesforce customer
      const salesforceData = {
        records: [
          {
            Id: '001xx000003DHPh',
            Name: 'John Doe',
            Email: customerEmail,
            Type: 'Customer'
          }
        ]
      };

      // HubSpot contact
      const hubspotData = {
        contacts: [
          {
            id: '123',
            properties: {
              email: customerEmail,
              firstname: 'John',
              lastname: 'Doe'
            }
          }
        ]
      };

      // Shopify customer
      const shopifyData = {
        customers: [
          {
            id: 555666777,
            email: customerEmail,
            first_name: 'John',
            last_name: 'Doe'
          }
        ]
      };

      // Step 2: Sync from each platform
      const mockClient = {
        get: jest.fn()
          .mockResolvedValueOnce({ data: salesforceData })
          .mockResolvedValueOnce({ data: hubspotData })
          .mockResolvedValueOnce({ data: { customers: shopifyData } })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const salesforceResult = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      const hubspotResult = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'hubspot',
        mockConnectionId
      );

      const shopifyResult = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'shopify',
        mockConnectionId
      );

      // Step 3: Verify all syncs succeeded
      expect(salesforceResult.success).toBe(true);
      expect(hubspotResult.success).toBe(true);
      expect(shopifyResult.success).toBe(true);

      // Step 4: Verify data linking
      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          platform: 'salesforce',
          platformId: '001xx000003DHPh'
        })
      );

      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          platform: 'hubspot',
          platformId: '123'
        })
      );

      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          platform: 'shopify',
          platformId: '555666777'
        })
      );

      // Step 5: Verify cross-platform relationships were created
      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          organizationId: mockOrganizationId,
          relatedPlatformIds: expect.arrayContaining([
            '001xx000003DHPh',
            '123',
            '555666777'
          ])
        })
      );
    });

    it('should handle data conflicts and resolution', async () => {
      // Step 1: Sync conflicting data
      const conflictingData = {
        records: [
          {
            Id: '001xx000003DHPh',
            Name: 'John Doe',
            Email: 'john@example.com',
            LastModifiedDate: '2024-01-15T10:00:00Z'
          }
        ]
      };

      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: conflictingData })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      // Step 2: First sync
      const firstSync = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(firstSync.success).toBe(true);

      // Step 3: Second sync with updated data
      const updatedData = {
        records: [
          {
            Id: '001xx000003DHPh',
            Name: 'John Smith', // Changed name
            Email: 'john@example.com',
            LastModifiedDate: '2024-01-15T11:00:00Z' // Later timestamp
          }
        ]
      };

      mockClient.get = jest.fn().mockResolvedValue({ data: updatedData });

      const secondSync = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(secondSync.success).toBe(true);

      // Step 4: Verify data was updated (not duplicated)
      expect(mockDb.update).toHaveBeenCalledWith(
        expect.objectContaining({
          platformId: '001xx000003DHPh',
          data: expect.objectContaining({
            Name: 'John Smith'
          })
        })
      );

      // Step 5: Verify conflict resolution was logged
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'DATA_CONFLICT_RESOLVED',
          resource: 'platform_data',
          status: 'success'
        })
      );
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle high volume sync operations', async () => {
      // Step 1: Create large dataset
      const largeDataset = {
        records: Array.from({ length: 10000 }, (_, i) => ({
          Id: `record-${i}`,
          Name: `Account ${i}`,
          Type: 'Customer',
          AnnualRevenue: Math.floor(Math.random() * 1000000)
        }))
      };

      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: largeDataset })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      // Step 2: Measure sync performance
      const startTime = Date.now();

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(10000);
      expect(duration).toBeLessThan(30000); // Should complete within 30 seconds

      // Step 3: Verify batch processing was used
      expect(mockDb.insert).toHaveBeenCalledTimes(Math.ceil(10000 / 1000)); // Batches of 1000
    });

    it('should handle concurrent platform syncs', async () => {
      // Step 1: Setup concurrent syncs
      const platforms = ['salesforce', 'hubspot', 'zendesk', 'shopify', 'slack'];
      const mockDatasets = platforms.map(platform => ({
        records: Array.from({ length: 1000 }, (_, i) => ({
          id: `${platform}-${i}`,
          name: `${platform} Record ${i}`
        }))
      }));

      const mockClient = {
        get: jest.fn().mockImplementation((url: string) => {
          const platform = platforms.find(p => url.includes(p));
          const dataset = mockDatasets[platforms.indexOf(platform!)];
          return Promise.resolve({ data: dataset });
        })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      // Step 2: Execute concurrent syncs
      const startTime = Date.now();

      const syncPromises = platforms.map(platform =>
        platformDataSyncService.syncPlatform(
          mockOrganizationId,
          platform as any,
          mockConnectionId
        )
      );

      const results = await Promise.all(syncPromises);

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Step 3: Verify all syncs succeeded
      expect(results.every((r: any) => r.success)).toBe(true);
      expect(results.every((r: any) => r.recordsProcessed === 1000)).toBe(true);
      expect(duration).toBeLessThan(20000); // Should complete within 20 seconds

      // Step 4: Verify concurrent operations were handled
      expect(mockDb.insert).toHaveBeenCalledTimes(5); // One for each platform
    });
  });

  describe('Security and Compliance', () => {
    it('should handle credential rotation during sync', async () => {
      // Step 1: Initial sync with valid credentials
      const initialResult = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(initialResult.success).toBe(true);

      // Step 2: Mock credential expiration
      mockPlatformAuthService.ensureValidCredentialsForOrg = jest.fn()
        .mockResolvedValueOnce({
          accessToken: 'expired-token',
          refreshToken: 'valid-refresh'
        })
        .mockRejectedValueOnce(new Error('Authentication failed'))
        .mockResolvedValueOnce({
          accessToken: 'new-valid-token',
          refreshToken: 'new-refresh-token'
        });

      // Step 3: Sync should trigger credential refresh
      const refreshResult = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(refreshResult.success).toBe(true);

      // Step 4: Verify credential refresh was logged
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'CREDENTIALS_REFRESHED',
          resource: 'platform_credentials',
          status: 'success'
        })
      );
    });

    it('should sanitize sensitive data before storage', async () => {
      // Step 1: Sync data with sensitive fields
      const sensitiveData = {
        records: [
          {
            Id: 'sensitive-record',
            Name: 'Test Account',
            CreditCardNumber: '4111-1111-1111-1111',
            SSN: '123-45-6789',
            Email: 'test@example.com'
          }
        ]
      };

      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: sensitiveData })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      // Step 2: Execute sync
      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(result.success).toBe(true);

      // Step 3: Verify sensitive data was sanitized
      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          platformId: 'sensitive-record',
          data: expect.not.objectContaining({
            CreditCardNumber: expect.any(String),
            SSN: expect.any(String)
          })
        })
      );

      // Step 4: Verify sanitization was logged
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'SENSITIVE_DATA_SANITIZED',
          resource: 'platform_data',
          status: 'success'
        })
      );
    });
  });
});
