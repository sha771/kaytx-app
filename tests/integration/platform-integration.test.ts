import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';
import { TestContainer } from 'testcontainers';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { RedisContainer } from '@testcontainers/redis';
import { setupTestDatabase, cleanupTestDatabase } from '../setup/integration.setup';

describe('Platform Integration Tests', () => {
  let postgresContainer: PostgreSqlContainer;
  let redisContainer: RedisContainer;
  let dbConnection: any;
  let redisClient: any;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer()
      .withDatabase('test_platform_integration')
      .withUsername('test')
      .withPassword('test')
      .start();

    redisContainer = await new RedisContainer()
      .start();

    dbConnection = await setupTestDatabase(postgresContainer.getConnectionUri());
    redisClient = await redisContainer.getConnection();
  }, 60000);

  afterAll(async () => {
    await cleanupTestDatabase(dbConnection);
    await postgresContainer.stop();
    await redisContainer.stop();
  });

  beforeEach(async () => {
    await dbConnection.query('TRUNCATE TABLE platform_syncs, sync_logs, leads, contacts CASCADE');
    await redisClient.flushdb();
  });

  describe('Salesforce Integration', () => {
    it('should authenticate with Salesforce successfully', async () => {
      const salesforceConfig = {
        platform: 'salesforce',
        organizationId: 'test-org-id',
        config: {
          apiKey: 'test-salesforce-api-key',
          baseUrl: 'https://test.salesforce.com',
          mapping: {
            leadStatus: {
              'New': 'new',
              'Working': 'contacted',
              'Qualified': 'qualified'
            },
            contactFields: {
              'FirstName': 'firstName',
              'LastName': 'lastName',
              'Email': 'email'
            }
          }
        }
      };

      const response = await fetch('http://localhost:3001/api/platform-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(salesforceConfig)
      });

      expect(response.status).toBe(201);
      const syncConfig = await response.json();
      expect(syncConfig.platform).toBe('salesforce');
      expect(syncConfig.isActive).toBe(true);
    });

    it('should sync leads from Salesforce', async () => {
      // Create sync configuration
      const syncResponse = await fetch('http://localhost:3001/api/platform-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'salesforce',
          organizationId: 'test-org-id',
          syncType: 'import_only',
          config: {
            apiKey: 'test-key',
            baseUrl: 'https://test.salesforce.com'
          }
        })
      });

      const syncConfig = await syncResponse.json();

      // Mock Salesforce API response
      const mockSalesforceLeads = [
        {
          Id: '001SF000001',
          FirstName: 'John',
          LastName: 'Doe',
          Email: 'john.doe@example.com',
          Company: 'Test Corp',
          Status: 'New'
        },
        {
          Id: '001SF000002',
          FirstName: 'Jane',
          LastName: 'Smith',
          Email: 'jane.smith@example.com',
          Company: 'Another Corp',
          Status: 'Working'
        }
      ];

      // Trigger sync
      const syncExecutionResponse = await fetch(`http://localhost:3001/api/platform-sync/${syncConfig.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'import_leads',
          data: mockSalesforceLeads
        })
      });

      expect(syncExecutionResponse.status).toBe(200);
      const syncResult = await syncExecutionResponse.json();
      
      expect(syncResult.recordsProcessed).toBe(2);
      expect(syncResult.successfulSyncs).toBe(2);
      expect(syncResult.failedSyncs).toBe(0);
    });

    it('should handle Salesforce API errors gracefully', async () => {
      const syncResponse = await fetch('http://localhost:3001/api/platform-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'salesforce',
          organizationId: 'test-org-id',
          config: {
            apiKey: 'invalid-key',
            baseUrl: 'https://test.salesforce.com'
          }
        })
      });

      const syncConfig = await syncResponse.json();

      // Try to sync with invalid credentials
      const syncExecutionResponse = await fetch(`http://localhost:3001/api/platform-sync/${syncConfig.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'import_leads'
        })
      });

      expect(syncExecutionResponse.status).toBe(400);
      const errorResult = await syncExecutionResponse.json();
      expect(errorResult.error).toContain('authentication');
    });
  });

  describe('HubSpot Integration', () => {
    it('should authenticate with HubSpot successfully', async () => {
      const hubspotConfig = {
        platform: 'hubspot',
        organizationId: 'test-org-id',
        config: {
          apiKey: 'test-hubspot-api-key',
          baseUrl: 'https://api.hubapi.com',
          mapping: {
            leadStatus: {
              'NEW': 'new',
              'CONTACTED': 'contacted',
              'QUALIFIED': 'qualified'
            }
          }
        }
      };

      const response = await fetch('http://localhost:3001/api/platform-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hubspotConfig)
      });

      expect(response.status).toBe(201);
      const syncConfig = await response.json();
      expect(syncConfig.platform).toBe('hubspot');
    });

    it('should sync contacts to HubSpot', async () => {
      // Create sync configuration
      const syncResponse = await fetch('http://localhost:3001/api/platform-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'hubspot',
          organizationId: 'test-org-id',
          syncType: 'export_only',
          config: {
            apiKey: 'test-hubspot-key',
            baseUrl: 'https://api.hubapi.com'
          }
        })
      });

      const syncConfig = await syncResponse.json();

      // Create test contacts in local system
      const testContacts = [
        {
          id: 'contact-1',
          firstName: 'Alice',
          lastName: 'Johnson',
          email: 'alice.j@example.com',
          company: 'Tech Corp',
          status: 'qualified'
        },
        {
          id: 'contact-2',
          firstName: 'Bob',
          lastName: 'Wilson',
          email: 'bob.w@example.com',
          company: 'Startup Inc',
          status: 'new'
        }
      ];

      // Export to HubSpot
      const exportResponse = await fetch(`http://localhost:3001/api/platform-sync/${syncConfig.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'export_contacts',
          data: testContacts
        })
      });

      expect(exportResponse.status).toBe(200);
      const exportResult = await exportResponse.json();
      
      expect(exportResult.recordsProcessed).toBe(2);
      expect(exportResult.successfulSyncs).toBe(2);
    });
  });

  describe('Bidirectional Sync', () => {
    it('should sync data in both directions', async () => {
      // Create bidirectional sync configuration
      const syncResponse = await fetch('http://localhost:3001/api/platform-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'pipedrive',
          organizationId: 'test-org-id',
          syncType: 'bidirectional',
          config: {
            apiKey: 'test-pipedrive-key',
            baseUrl: 'https://test.pipedrive.com',
            mapping: {
              leadStatus: {
                'Open': 'new',
                'Won': 'converted',
                'Lost': 'lost'
              }
            }
          }
        })
      });

      const syncConfig = await syncResponse.json();

      // Import from Pipedrive
      const importData = [
        {
          id: 'deal-1',
          title: 'Test Deal 1',
          status: 'Open',
          value: 10000,
          person_name: 'John Doe',
          email: 'john@example.com'
        }
      ];

      const importResponse = await fetch(`http://localhost:3001/api/platform-sync/${syncConfig.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'import_deals',
          data: importData
        })
      });

      expect(importResponse.status).toBe(200);

      // Export back to Pipedrive
      const exportData = [
        {
          id: 'local-lead-1',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          status: 'qualified',
          value: 15000
        }
      ];

      const exportResponse = await fetch(`http://localhost:3001/api/platform-sync/${syncConfig.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'export_leads',
          data: exportData
        })
      });

      expect(exportResponse.status).toBe(200);
      const exportResult = await exportResponse.json();
      expect(exportResult.recordsProcessed).toBe(1);
    });
  });

  describe('Sync Conflict Resolution', () => {
    it('should handle conflicting records', async () => {
      const syncResponse = await fetch('http://localhost:3001/api/platform-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'zoho',
          organizationId: 'test-org-id',
          syncType: 'bidirectional',
          config: {
            apiKey: 'test-zoho-key',
            baseUrl: 'https://test.zoho.com',
            conflictResolution: 'latest_wins'
          }
        })
      });

      const syncConfig = await syncResponse.json();

      // Simulate conflicting data
      const conflictingRecords = [
        {
          id: 'conflict-1',
          email: 'conflict@example.com',
          firstName: 'John', // Local version
          lastName: 'Doe',
          updatedAt: new Date('2024-01-01T10:00:00Z'),
          externalData: {
            firstName: 'Jonathan', // External version
            lastName: 'Doe',
            updatedAt: new Date('2024-01-01T09:00:00Z')
          }
        }
      ];

      const conflictResponse = await fetch(`http://localhost:3001/api/platform-sync/${syncConfig.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'resolve_conflicts',
          data: conflictingRecords
        })
      });

      expect(conflictResponse.status).toBe(200);
      const result = await conflictResponse.json();
      
      expect(result.conflictsResolved).toBe(1);
      expect(result.resolutionStrategy).toBe('latest_wins');
    });
  });

  describe('Sync Performance and Scaling', () => {
    it('should handle large datasets efficiently', async () => {
      const syncResponse = await fetch('http://localhost:3001/api/platform-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'salesforce',
          organizationId: 'test-org-id',
          config: {
            apiKey: 'test-key',
            baseUrl: 'https://test.salesforce.com',
            batchSize: 100
          }
        })
      });

      const syncConfig = await syncResponse.json();

      // Generate large dataset
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        id: `lead-${i}`,
        firstName: `User${i}`,
        lastName: `Test${i}`,
        email: `user${i}@example.com`,
        company: `Company ${i % 100}`,
        status: ['new', 'contacted', 'qualified'][i % 3]
      }));

      const startTime = Date.now();

      const syncResponse = await fetch(`http://localhost:3001/api/platform-sync/${syncConfig.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'import_leads',
          data: largeDataset
        })
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(syncResponse.status).toBe(200);
      const result = await syncResponse.json();
      
      expect(result.recordsProcessed).toBe(1000);
      expect(result.successfulSyncs).toBe(1000);
      expect(duration).toBeLessThan(30000); // Should complete within 30 seconds
    });
  });

  describe('Sync Monitoring and Logging', () => {
    it('should log sync activities', async () => {
      const syncResponse = await fetch('http://localhost:3001/api/platform-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'hubspot',
          organizationId: 'test-org-id',
          config: {
            apiKey: 'test-key',
            baseUrl: 'https://api.hubapi.com'
          }
        })
      });

      const syncConfig = await syncResponse.json();

      // Execute sync
      await fetch(`http://localhost:3001/api/platform-sync/${syncConfig.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'import_contacts',
          data: [{ id: 'test-1', email: 'test@example.com' }]
        })
      });

      // Check sync logs
      const logsResponse = await fetch(`http://localhost:3001/api/platform-sync/${syncConfig.id}/logs`);
      const logs = await logsResponse.json();

      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0]).toHaveProperty('timestamp');
      expect(logs[0]).toHaveProperty('action');
      expect(logs[0]).toHaveProperty('status');
    });

    it('should track sync metrics', async () => {
      const syncResponse = await fetch('http://localhost:3001/api/platform-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'salesforce',
          organizationId: 'test-org-id',
          config: {
            apiKey: 'test-key',
            baseUrl: 'https://test.salesforce.com'
          }
        })
      });

      const syncConfig = await syncResponse.json();

      // Execute multiple syncs
      for (let i = 0; i < 5; i++) {
        await fetch(`http://localhost:3001/api/platform-sync/${syncConfig.id}/execute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'import_leads',
            data: [{ id: `test-${i}`, email: `test${i}@example.com` }]
          })
        });
      }

      // Check metrics
      const metricsResponse = await fetch(`http://localhost:3001/api/platform-sync/${syncConfig.id}/metrics`);
      const metrics = await metricsResponse.json();

      expect(metrics.totalSyncs).toBe(5);
      expect(metrics.successfulSyncs).toBe(5);
      expect(metrics.averageSyncTime).toBeGreaterThan(0);
      expect(metrics.lastSyncAt).toBeDefined();
    });
  });
});
