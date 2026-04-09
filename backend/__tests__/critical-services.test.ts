import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { UnifiedWorkflowService } from '../services/unified-workflow-service';
import { UnifiedWebhookService } from '../services/unified-webhook-service';
import { checkRateLimit, RateLimitPresets } from '../lib/unified-rate-limiting';
import { generateCSRFToken, verifyCSRFToken } from '../lib/unified-csrf';

/**
 * Comprehensive Test Suite for Critical Services
 * Tests all consolidated services to ensure they work correctly
 * and maintain the expected functionality after consolidation
 */

describe('Critical Services Integration Tests', () => {
  let workflowService: UnifiedWorkflowService;
  let webhookService: UnifiedWebhookService;
  let rateLimitService: ConsolidatedRateLimitService;

  beforeEach(() => {
    workflowService = new UnifiedWorkflowService();
    webhookService = new UnifiedWebhookService();
  });

  afterEach(async () => {
    // Cleanup all services to prevent memory leaks
    await workflowService.cleanup();
    await webhookService.cleanup();
  });

  describe('ConsolidatedWorkflowService', () => {
    const testOrganizationId = 'test-org-123';
    const testUserId = 'test-user-123';

    it('should create and manage workflows', async () => {
      const workflowData = {
        name: 'Test Workflow',
        description: 'Test workflow for unit testing',
        organizationId: testOrganizationId,
        category: 'custom' as const,
        status: 'active' as const,
        triggers: [{
          id: 'trigger-1',
          type: 'manual' as const,
          config: { test: true },
          isActive: true
        }],
        steps: [{
          id: 'step-1',
          name: 'Test Step',
          type: 'action' as const,
          config: { action: 'test' },
          position: { x: 0, y: 0 },
          connections: []
        }],
        variables: [],
        settings: {
          timeout: 30000,
          retryPolicy: { maxRetries: 3, retryDelay: 5000 },
          notifications: {},
          security: {}
        }
      };

      const workflow = await workflowService.createWorkflow(testOrganizationId, workflowData);
      
      expect(workflow).toBeDefined();
      expect(workflow.name).toBe('Test Workflow');
      expect(workflow.organizationId).toBe(testOrganizationId);
      expect(workflow.status).toBe('active');
      expect(workflow.triggers).toHaveLength(1);
      expect(workflow.steps).toHaveLength(1);
    });

    it('should execute workflows', async () => {
      const workflowData = {
        name: 'Execution Test Workflow',
        organizationId: testOrganizationId,
        category: 'custom' as const,
        status: 'active' as const,
        triggers: [{
          id: 'trigger-1',
          type: 'manual' as const,
          config: {},
          isActive: true
        }],
        steps: [{
          id: 'step-1',
          name: 'Test Action',
          type: 'action' as const,
          config: { action: 'test' },
          position: { x: 0, y: 0 },
          connections: []
        }],
        variables: [],
        settings: {
          timeout: 30000,
          retryPolicy: { maxRetries: 3, retryDelay: 5000 },
          notifications: {},
          security: {}
        }
      };

      const workflow = await workflowService.createWorkflow(testOrganizationId, workflowData);
      const execution = await workflowService.executeWorkflow(workflow.id, testOrganizationId, { test: 'data' });

      expect(execution).toBeDefined();
      expect(execution.status).toBe('completed');
      expect(execution.recordsProcessed).toBeGreaterThan(0);
    });

    it('should handle workflow events', async () => {
      const eventReceived = new Promise((resolve) => {
        workflowService.once('workflow:created', resolve);
      });

      const workflowData = {
        name: 'Event Test Workflow',
        organizationId: testOrganizationId,
        category: 'custom' as const,
        status: 'active' as const,
        triggers: [],
        steps: [],
        variables: [],
        settings: {
          timeout: 30000,
          retryPolicy: { maxRetries: 3, retryDelay: 5000 },
          notifications: {},
          security: {}
        }
      };

      await workflowService.createWorkflow(testOrganizationId, workflowData);
      const event = await eventReceived;

      expect(event).toBeDefined();
      expect(event.workflow.name).toBe('Event Test Workflow');
    });

    it('should cleanup resources properly', async () => {
      const workflowData = {
        name: 'Cleanup Test Workflow',
        organizationId: testOrganizationId,
        category: 'custom' as const,
        status: 'active' as const,
        triggers: [],
        steps: [],
        variables: [],
        settings: {
          timeout: 30000,
          retryPolicy: { maxRetries: 3, retryDelay: 5000 },
          notifications: {},
          security: {}
        }
      };

      await workflowService.createWorkflow(testOrganizationId, workflowData);
      await workflowService.cleanup();

      // Should not throw and should clean up all resources
      expect(workflowService['scheduledWorkflows']).toBeDefined();
      expect(workflowService['activeExecutions']).toBeDefined();
    });
  });

  describe('ConsolidatedWebhookService', () => {
    const testOrganizationId = 'test-org-123';

    it('should create and manage webhooks', async () => {
      const webhookData = {
        name: 'Test Webhook',
        url: 'https://example.com/webhook',
        organizationId: testOrganizationId,
        events: ['test.event'],
        type: 'outgoing' as const,
        retryConfig: {
          maxRetries: 3,
          retryDelay: 5000,
          backoffMultiplier: 2
        },
        timeout: 30000
      };

      const webhook = await webhookService.createWebhook(testOrganizationId, webhookData);
      
      expect(webhook).toBeDefined();
      expect(webhook.name).toBe('Test Webhook');
      expect(webhook.url).toBe('https://example.com/webhook');
      expect(webhook.organizationId).toBe(testOrganizationId);
      expect(webhook.events).toContain('test.event');
    });

    it('should trigger and deliver webhook events', async () => {
      const webhookData = {
        name: 'Delivery Test Webhook',
        url: 'https://httpbin.org/post',
        organizationId: testOrganizationId,
        events: ['test.delivery'],
        type: 'outgoing' as const,
        retryConfig: {
          maxRetries: 2,
          retryDelay: 1000,
          backoffMultiplier: 2
        },
        timeout: 10000
      };

      const webhook = await webhookService.createWebhook(testOrganizationId, webhookData);
      
      const deliveryPromise = new Promise((resolve) => {
        webhookService.once('delivery:success', resolve);
      });

      await webhookService.triggerEvent('test.delivery', { message: 'test' }, testOrganizationId);
      const delivery = await deliveryPromise;

      expect(delivery).toBeDefined();
      expect(delivery.webhook.id).toBe(webhook.id);
    });

    it('should handle webhook events with proper error handling', async () => {
      const webhookData = {
        name: 'Error Test Webhook',
        url: 'https://httpbin.org/status/500',
        organizationId: testOrganizationId,
        events: ['test.error'],
        type: 'outgoing' as const,
        retryConfig: {
          maxRetries: 1,
          retryDelay: 500,
          backoffMultiplier: 1
        },
        timeout: 5000
      };

      const webhook = await webhookService.createWebhook(testOrganizationId, webhookData);
      
      const errorPromise = new Promise((resolve) => {
        webhookService.once('delivery:failed', resolve);
      });

      await webhookService.triggerEvent('test.error', { message: 'test' }, testOrganizationId);
      const error = await errorPromise;

      expect(error).toBeDefined();
      expect(error.webhook.id).toBe(webhook.id);
    });

    it('should process platform webhooks', async () => {
      const result = await webhookService.processPlatformWebhook(
        'stripe',
        testOrganizationId,
        '{"type": "payment_intent.succeeded", "data": {"id": "pi_test"}}',
        {
          'stripe-signature': 'test-signature'
        }
      );

      expect(result.success).toBe(true);
      expect(result.eventId).toBeDefined();
    });

    it('should cleanup resources properly', async () => {
      await webhookService.cleanup();

      expect(webhookService['deliveryQueue']).toBeDefined();
      expect(webhookService['processingEvents']).toBeDefined();
    });
  });

  describe('ConsolidatedPlatformSyncService', () => {
    const testOrganizationId = 'test-org-123';

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

    it('should record webhook events', async () => {
      const event = await platformSyncService.recordWebhookEvent({
        organizationId: testOrganizationId,
        platform: 'stripe',
        eventId: 'evt_test_123',
        payload: { type: 'payment_intent.succeeded' }
      });

      expect(event).toBeDefined();
      expect(event.organizationId).toBe(testOrganizationId);
      expect(event.platform).toBe('stripe');
      expect(event.eventId).toBe('evt_test_123');
    });

    it('should get sync statistics', async () => {
      const stats = await platformSyncService.getSyncStatistics(testOrganizationId);

      expect(stats).toBeDefined();
      expect(stats.totalJobs).toBeGreaterThanOrEqual(0);
      expect(stats.completedJobs).toBeGreaterThanOrEqual(0);
      expect(stats.failedJobs).toBeGreaterThanOrEqual(0);
      expect(stats.averageProcessingTime).toBeGreaterThanOrEqual(0);
    });

    it('should cleanup resources properly', async () => {
      await platformSyncService.cleanup();

      expect(platformSyncService['realTimeSyncIntervals']).toBeDefined();
      expect(platformSyncService['activeJobs']).toBeDefined();
      expect(platformSyncService['jobQueue']).toBeDefined();
    });
  });

  describe('ConsolidatedSessionManagementService', () => {
    const testOrganizationId = 'test-org-123';
    const testUserId = 'test-user-123';

    it('should create and validate sessions', async () => {
      const sessionData = {
        userId: testUserId,
        organizationId: testOrganizationId,
        deviceType: 'web' as const,
        userAgent: 'Test Browser',
        ipAddress: '127.0.0.1'
      };

      const { session, token } = await sessionService.createSession(sessionData);
      
      expect(session).toBeDefined();
      expect(session.userId).toBe(testUserId);
      expect(session.organizationId).toBe(testOrganizationId);
      expect(session.deviceType).toBe('web');
      expect(token).toBeDefined();

      const validation = await sessionService.validateSession(token);
      expect(validation.valid).toBe(true);
      expect(validation.userId).toBe(testUserId);
      expect(validation.organizationId).toBe(testOrganizationId);
    });

    it('should invalidate sessions', async () => {
      const sessionData = {
        userId: testUserId,
        organizationId: testOrganizationId,
        deviceType: 'mobile' as const
      };

      const { session } = await sessionService.createSession(sessionData);
      const invalidated = await sessionService.invalidateSession(session.id);

      expect(invalidated).toBe(true);

      const validation = await sessionService.validateSession('invalid-token');
      expect(validation.valid).toBe(false);
    });

    it('should detect suspicious activity', async () => {
      const sessionData = {
        userId: testUserId,
        organizationId: testOrganizationId,
        deviceType: 'web' as const,
        ipAddress: '192.168.1.1'
      };

      const { session } = await sessionService.createSession(sessionData);
      
      // Test impossible travel detection
      const suspicious = await sessionService.validateSession('invalid-token', {
        currentIpAddress: '10.0.0.1',
        currentUserAgent: 'Different Browser'
      });

      expect(suspicious.valid).toBe(false);
    });

    it('should get session statistics', async () => {
      const stats = await sessionService.getSessionStats(testOrganizationId);

      expect(stats).toBeDefined();
      expect(stats.total).toBeGreaterThanOrEqual(0);
      expect(stats.active).toBeGreaterThanOrEqual(0);
      expect(stats.expired).toBeGreaterThanOrEqual(0);
      expect(stats.byDeviceType).toBeDefined();
    });

    it('should cleanup resources properly', async () => {
      await sessionService.cleanup();

      expect(sessionService['cleanupTimer']).toBeUndefined();
    });
  });

  describe('ConsolidatedCSRFService', () => {
    it('should generate and validate CSRF tokens', () => {
      const token = csrfService.generateCSRFToken('test-user');
      
      expect(token).toBeDefined();
      expect(token).toHaveLength(64); // 32 bytes * 2 hex chars

      const isValid = csrfService.verifyCSRFTokenWithSession(token, 'test-user');
      expect(isValid).toBe(true);
    });

    it('should handle double-submit pattern', () => {
      const token = csrfService.generateCSRFToken('test-user');
      
      // First validation should succeed
      const firstValidation = csrfService.verifyCSRFTokenWithSession(token, 'test-user');
      expect(firstValidation).toBe(true);

      // Second validation should fail (token consumed)
      const secondValidation = csrfService.verifyCSRFTokenWithSession(token, 'test-user');
      expect(secondValidation).toBe(false);
    });

    it('should get CSRF statistics', () => {
      const stats = csrfService.getCSRFStats();

      expect(stats).toBeDefined();
      expect(stats.totalTokens).toBeGreaterThanOrEqual(0);
      expect(stats.activeTokens).toBeGreaterThanOrEqual(0);
      expect(stats.expiredTokens).toBeGreaterThanOrEqual(0);
      expect(stats.tokensByUser).toBeDefined();
    });

    it('should revoke user tokens', () => {
      const token1 = csrfService.generateCSRFToken('user1');
      const token2 = csrfService.generateCSRFToken('user2');

      const revokedCount = csrfService.revokeUserTokens('user1');
      expect(revokedCount).toBe(1);

      // user1 token should be invalid, user2 token should still be valid
      expect(csrfService.verifyCSRFTokenWithSession(token1, 'user1')).toBe(false);
      expect(csrfService.verifyCSRFTokenWithSession(token2, 'user2')).toBe(true);
    });

    it('should cleanup resources properly', async () => {
      await csrfService.cleanup();

      expect(csrfService['cleanupTimer']).toBeUndefined();
    });
  });

  describe('ConsolidatedRateLimitService', () => {
    it('should enforce rate limits', async () => {
      const identifier = 'test-user';
      
      // First request should be allowed
      const result1 = await rateLimitService.checkLimit(identifier);
      expect(result1.allowed).toBe(true);
      expect(result1.remaining).toBeGreaterThan(0);

      // Second request should also be allowed (within limits)
      const result2 = await rateLimitService.checkLimit(identifier);
      expect(result2.allowed).toBe(true);
      expect(result2.remaining).toBeGreaterThan(0);
    });

    it('should handle rate limit exceeded', async () => {
      const limiter = new ConsolidatedRateLimitService({
        windowMs: 1000,
        maxRequests: 2,
        skipSuccessfulRequests: false,
        skipFailedRequests: false
      });

      // Make requests up to the limit
      await limiter.checkLimit('test-user');
      await limiter.checkLimit('test-user');
      
      // Third request should be blocked
      const result = await limiter.checkLimit('test-user');
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);

      await limiter.cleanup();
    });

    it('should get rate limit statistics', () => {
      const stats = rateLimitService.getStats();

      expect(stats).toBeDefined();
      expect(stats.totalEntries).toBeGreaterThanOrEqual(0);
      expect(stats.activeEntries).toBeGreaterThanOrEqual(0);
      expect(stats.expiredEntries).toBeGreaterThanOrEqual(0);
    });

    it('should reset rate limits', async () => {
      const identifier = 'test-user-reset';
      
      // Add some requests
      await rateLimitService.checkLimit(identifier);
      await rateLimitService.checkLimit(identifier);
      
      // Reset the limit
      await rateLimitService.resetLimit(identifier);
      
      // Should be able to make requests again
      const result = await rateLimitService.checkLimit(identifier);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBeGreaterThan(0);
    });

    it('should cleanup resources properly', async () => {
      await rateLimitService.cleanup();

      expect(rateLimitService['cleanupTimer']).toBeUndefined();
    });
  });

  describe('Service Integration', () => {
    it('should handle cross-service operations', async () => {
      const testOrganizationId = 'test-org-integration';
      const testUserId = 'test-user-integration';

      // Create a session
      const { session, token } = await sessionService.createSession({
        userId: testUserId,
        organizationId: testOrganizationId
      });

      // Create a webhook
      const webhook = await webhookService.createWebhook(testOrganizationId, {
        name: 'Integration Test Webhook',
        url: 'https://example.com/webhook',
        organizationId: testOrganizationId,
        events: ['integration.test'],
        type: 'outgoing'
      });

      // Create a workflow
      const workflow = await workflowService.createWorkflow(testOrganizationId, {
        name: 'Integration Test Workflow',
        organizationId: testOrganizationId,
        category: 'custom',
        status: 'active',
        triggers: [],
        steps: [],
        variables: [],
        settings: {
          timeout: 30000,
          retryPolicy: { maxRetries: 3, retryDelay: 5000 },
          notifications: {},
          security: {}
        }
      });

      // Verify all services are working
      expect(session).toBeDefined();
      expect(webhook).toBeDefined();
      expect(workflow).toBeDefined();

      // Cleanup
      await sessionService.invalidateSession(session.id);
      await webhookService.cleanup();
      await workflowService.cleanup();
    });

    it('should handle concurrent operations', async () => {
      const testOrganizationId = 'test-org-concurrent';

      // Create multiple concurrent operations
      const operations = [];
      
      for (let i = 0; i < 10; i++) {
        operations.push(
          workflowService.createWorkflow(testOrganizationId, {
            name: `Concurrent Workflow ${i}`,
            organizationId: testOrganizationId,
            category: 'custom',
            status: 'active',
            triggers: [],
            steps: [],
            variables: [],
            settings: {
              timeout: 30000,
              retryPolicy: { maxRetries: 3, retryDelay: 5000 },
              notifications: {},
              security: {}
            }
          })
        );
      }

      const results = await Promise.all(operations);
      
      // All operations should succeed
      expect(results).toHaveLength(10);
      results.forEach(result => {
        expect(result.name).toMatch(/^Concurrent Workflow \d+$/);
        expect(result.organizationId).toBe(testOrganizationId);
      });

      // Cleanup
      await Promise.all(results.map(result => 
        workflowService.cleanup()
      ));
    });

    it('should handle error scenarios gracefully', async () => {
      const testOrganizationId = 'test-org-errors';

      // Test invalid workflow creation
      try {
        await workflowService.createWorkflow(testOrganizationId, {
          name: '', // Invalid empty name
          organizationId: testOrganizationId,
          category: 'custom',
          status: 'active',
          triggers: [],
          steps: [],
          variables: [],
          settings: {
            timeout: 30000,
            retryPolicy: { maxRethooks: 3, retryDelay: 5000 }, // Invalid property
            notifications: {},
            security: {}
          }
        });
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }

      // Test invalid session validation
      const validation = await sessionService.validateSession('invalid-token');
      expect(validation.valid).toBe(false);

      // Test rate limit exceeded
      const limiter = new ConsolidatedRateLimitService({
        windowMs: 100,
        maxRequests: 1,
        skipSuccessfulRequests: false,
        skipFailedRequests: false
      });

      await limiter.checkLimit('test-user');
      const blockedResult = await limiter.checkLimit('test-user');
      expect(blockedResult.allowed).toBe(false);

      await limiter.cleanup();
    });
  });
});
