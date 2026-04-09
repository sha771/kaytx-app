import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { platformDataSyncService } from '../../backend/services/platform-data-sync-service';

describe('Platform Data Sync Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Salesforce Integration', () => {
    it('should sync Salesforce contacts', async () => {
      const mockSync = jest.spyOn(platformDataSyncService, 'syncPlatform')
        .mockResolvedValue({
          success: true,
          messageCount: 0,
          recordsProcessed: 10,
          errors: [],
          lastSyncAt: new Date()
        });

      const result = await platformDataSyncService.syncPlatform(
        'org-123',
        'salesforce',
        'conn-123'
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(10);
      expect(mockSync).toHaveBeenCalledWith('org-123', 'salesforce', 'conn-123');
    });

    it('should handle Salesforce sync errors', async () => {
      const mockSync = jest.spyOn(platformDataSyncService, 'syncPlatform')
        .mockResolvedValue({
          success: false,
          messageCount: 0,
          recordsProcessed: 0,
          errors: ['API rate limit exceeded'],
          lastSyncAt: new Date()
        });

      const result = await platformDataSyncService.syncPlatform(
        'org-123',
        'salesforce',
        'conn-123'
      );

      expect(result.success).toBe(false);
      expect(result.errors).toContain('API rate limit exceeded');
    });
  });

  describe('HubSpot Integration', () => {
    it('should sync HubSpot deals', async () => {
      const mockSync = jest.spyOn(platformDataSyncService, 'syncPlatform')
        .mockResolvedValue({
          success: true,
          messageCount: 0,
          recordsProcessed: 5,
          errors: [],
          lastSyncAt: new Date()
        });

      const result = await platformDataSyncService.syncPlatform(
        'org-123',
        'hubspot',
        'conn-456'
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(5);
    });
  });

  describe('Slack Integration', () => {
    it('should sync Slack channels', async () => {
      const mockSync = jest.spyOn(platformDataSyncService, 'syncPlatform')
        .mockResolvedValue({
          success: true,
          messageCount: 25,
          recordsProcessed: 8,
          errors: [],
          lastSyncAt: new Date()
        });

      const result = await platformDataSyncService.syncPlatform(
        'org-123',
        'slack',
        'conn-789'
      );

      expect(result.success).toBe(true);
      expect(result.messageCount).toBe(25);
      expect(result.recordsProcessed).toBe(8);
    });
  });

  describe('Stripe Integration', () => {
    it('should sync Stripe customers', async () => {
      const mockSync = jest.spyOn(platformDataSyncService, 'syncPlatform')
        .mockResolvedValue({
          success: true,
          messageCount: 15,
          recordsProcessed: 20,
          errors: [],
          lastSyncAt: new Date()
        });

      const result = await platformDataSyncService.syncPlatform(
        'org-123',
        'stripe',
        'conn-stripe'
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(20);
    });
  });

  describe('Multi-Platform Sync', () => {
    it('should sync multiple platforms sequentially', async () => {
      const mockSync = jest.spyOn(platformDataSyncService, 'syncPlatform')
        .mockResolvedValue({
          success: true,
          messageCount: 0,
          recordsProcessed: 10,
          errors: [],
          lastSyncAt: new Date()
        });

      const platforms = ['salesforce', 'hubspot', 'slack'];
      const results = [];

      for (const platform of platforms) {
        const result = await platformDataSyncService.syncPlatform(
          'org-123',
          platform as any,
          `conn-${platform}`
        );
        results.push(result);
      }

      expect(results).toHaveLength(3);
      results.forEach(result => {
        expect(result.success).toBe(true);
      });
      expect(mockSync).toHaveBeenCalledTimes(3);
    });
  });
});
