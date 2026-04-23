import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { Hono } from 'hono';
import { emailCampaignService } from '../../services/email-campaign-service';
import { userManagementService } from '../../services/user-management-service';
import { organizationManagementService } from '../../services/organization-management-service';
import { notificationService } from '../../services/notification-service';
import { auditLogService } from '../../services/consolidated-audit-service';
import { createApp } from '../../hono';

describe('Email Campaign Integration Tests', () => {
  let app: Hono;
  let testOrganization: any;
  let testUser: any;
  let authToken: string;
  let testCampaign: any;
  let testContacts: any[] = [];

  beforeAll(async () => {
    app = createApp();

    // Create test organization
    testOrganization = await organizationManagementService.createOrganization({
      name: 'Test Email Organization',
      slug: 'test-email-org',
      ownerId: 'test-owner-id',
      billingEmail: 'billing@test.com',
      plan: 'pro',
    });

    // Create test user
    testUser = await userManagementService.createUser({
      email: 'campaign.manager@test.com',
      password: 'SecurePass123!',
      firstName: 'Campaign',
      lastName: 'Manager',
      organizationId: testOrganization.id,
      role: 'manager',
    });

    // Get auth token
    const loginResponse = await app.request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: 'SecurePass123!',
      }),
    });

    authToken = (await loginResponse.json()).data.token;

    await setupTestData();
  });

  afterAll(async () => {
    await cleanupTestData();
    await teardownTestEnvironment();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await cleanupCampaignData();
  });

  describe('Campaign Creation Flow', () => {
    it('should create campaign with template', async () => {
      const campaignData = {
        name: 'Test Campaign',
        subject: 'Test Subject',
        content: '<h1>Hello {{firstName}}</h1><p>This is a test email.</p>',
        templateId: null,
        listIds: [],
        scheduledAt: null,
        settings: {
          trackOpens: true,
          trackClicks: true,
          suppressDuplicates: true,
        },
      };

      const response = await app.request('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(campaignData),
      });

      expect(response.status).toBe(201);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        name: campaignData.name,
        subject: campaignData.subject,
        status: 'draft',
        organizationId: testOrganization.id,
      });

      testCampaign = result.data;
    });

    it('should create campaign with existing template', async () => {
      // First create a template
      const templateData = {
        name: 'Test Template',
        subject: 'Template Subject',
        htmlContent: '<h1>{{title}}</h1><p>{{content}}</p>',
        variables: ['title', 'content'],
      };

      const templateResponse = await app.request('/api/email-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(templateData),
      });

      const template = (await templateResponse.json()).data;

      // Create campaign using template
      const campaignData = {
        name: 'Template Campaign',
        templateId: template.id,
        variables: {
          title: 'Welcome',
          content: 'Thank you for joining!',
        },
      };

      const response = await app.request('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(campaignData),
      });

      expect(response.status).toBe(201);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.templateId).toBe(template.id);
      expect(result.data.variables).toEqual(campaignData.variables);
    });

    it('should validate campaign data integrity', async () => {
      const invalidCampaignData = {
        name: '', // Empty name should fail
        subject: 'Test Subject',
        content: 'Test content',
      };

      const response = await app.request('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(invalidCampaignData),
      });

      expect(response.status).toBe(400);
      
      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.error).toContain('validation');
    });
  });

  describe('Campaign Scheduling Flow', () => {
    beforeEach(async () => {
      // Create a test campaign for scheduling tests
      const campaignData = {
        name: 'Scheduled Campaign',
        subject: 'Scheduled Test',
        content: '<p>This will be scheduled</p>',
      };

      const response = await app.request('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(campaignData),
      });

      testCampaign = (await response.json()).data;
    });

    it('should schedule campaign for future delivery', async () => {
      const scheduledTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

      const response = await app.request(`/api/campaigns/${testCampaign.id}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          scheduledAt: scheduledTime.toISOString(),
        }),
      });

      expect(response.status).toBe(200);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.status).toBe('scheduled');
      expect(new Date(result.data.scheduledAt)).toEqual(scheduledTime);

      // Verify campaign cannot be launched manually when scheduled
      const launchResponse = await app.request(`/api/campaigns/${testCampaign.id}/launch`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(launchResponse.status).toBe(400);
    });

    it('should handle scheduling conflicts', async () => {
      // Schedule the campaign
      const scheduledTime = new Date(Date.now() + 60 * 60 * 1000);
      await app.request(`/api/campaigns/${testCampaign.id}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          scheduledAt: scheduledTime.toISOString(),
        }),
      });

      // Try to schedule again
      const response = await app.request(`/api/campaigns/${testCampaign.id}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          scheduledAt: scheduledTime.toISOString(),
        }),
      });

      expect(response.status).toBe(400);
      
      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.error).toContain('already scheduled');
    });

    it('should cancel scheduled campaign', async () => {
      // Schedule the campaign
      const scheduledTime = new Date(Date.now() + 60 * 60 * 1000);
      await app.request(`/api/campaigns/${testCampaign.id}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          scheduledAt: scheduledTime.toISOString(),
        }),
      });

      // Cancel scheduling
      const response = await app.request(`/api/campaigns/${testCampaign.id}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(response.status).toBe(200);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.status).toBe('cancelled');
    });
  });

  describe('Campaign Launch Flow', () => {
    beforeEach(async () => {
      // Create test contacts
      testContacts = await createTestContacts(10);

      // Create a test campaign
      const campaignData = {
        name: 'Launch Test Campaign',
        subject: 'Launch Test',
        content: '<p>This is a test campaign</p>',
        listIds: testContacts.map(c => c.id),
      };

      const response = await app.request('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(campaignData),
      });

      testCampaign = (await response.json()).data;
    });

    it('should launch campaign immediately', async () => {
      const response = await app.request(`/api/campaigns/${testCampaign.id}/launch`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(response.status).toBe(200);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.status).toBe('running');
      expect(result.data.launchedAt).toBeDefined();

      // Verify campaign statistics
      const statsResponse = await app.request(`/api/campaigns/${testCampaign.id}/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const stats = await statsResponse.json();
      expect(stats.success).toBe(true);
      expect(stats.data.totalSent).toBe(testContacts.length);
    });

    it('should track campaign delivery in real-time', async () => {
      // Launch campaign
      await app.request(`/api/campaigns/${testCampaign.id}/launch`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      // Wait for processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check delivery status
      const response = await app.request(`/api/campaigns/${testCampaign.id}/delivery-status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(response.status).toBe(200);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        totalSent: testContacts.length,
        delivered: expect.any(Number),
        bounced: expect.any(Number),
        pending: expect.any(Number),
      });

      // Verify audit logs for delivery events
      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        action: 'email_sent',
        resource: 'campaign',
        resourceId: testCampaign.id,
      });

      expect(auditLogs.logs.length).toBeGreaterThan(0);
    });

    it('should handle campaign pause and resume', async () => {
      // Launch campaign
      await app.request(`/api/campaigns/${testCampaign.id}/launch`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      // Pause campaign
      const pauseResponse = await app.request(`/api/campaigns/${testCampaign.id}/pause`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(pauseResponse.status).toBe(200);
      
      const pauseResult = await pauseResponse.json();
      expect(pauseResult.data.status).toBe('paused');

      // Resume campaign
      const resumeResponse = await app.request(`/api/campaigns/${testCampaign.id}/resume`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(resumeResponse.status).toBe(200);
      
      const resumeResult = await resumeResponse.json();
      expect(resumeResult.data.status).toBe('running');
    });
  });

  describe('A/B Testing Integration', () => {
    let abTestCampaign: any;

    beforeEach(async () => {
      // Create A/B test campaign
      const campaignData = {
        name: 'A/B Test Campaign',
        subject: 'A/B Test',
        content: '<p>Version A content</p>',
        abTest: {
          enabled: true,
          variants: [
            {
              name: 'Version A',
              subject: 'Subject A',
              content: '<p>Version A content</p>',
              ratio: 0.5,
            },
            {
              name: 'Version B',
              subject: 'Subject B',
              content: '<p>Version B content</p>',
              ratio: 0.5,
            },
          ],
        },
        listIds: testContacts.map(c => c.id),
      };

      const response = await app.request('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(campaignData),
      });

      abTestCampaign = (await response.json()).data;
    });

    it('should create A/B test campaign with variants', async () => {
      expect(abTestCampaign.abTest.enabled).toBe(true);
      expect(abTestCampaign.abTest.variants).toHaveLength(2);
      expect(abTestCampaign.abTest.variants[0].ratio).toBe(0.5);
      expect(abTestCampaign.abTest.variants[1].ratio).toBe(0.5);
    });

    it('should distribute contacts evenly across variants', async () => {
      // Launch A/B test
      await app.request(`/api/campaigns/${abTestCampaign.id}/launch`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      // Wait for processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check variant distribution
      const response = await app.request(`/api/campaigns/${abTestCampaign.id}/ab-stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.variants).toHaveLength(2);

      const variantA = result.data.variants.find((v: any) => v.name === 'Version A');
      const variantB = result.data.variants.find((v: any) => v.name === 'Version B');

      // Distribution should be roughly equal (within 20% tolerance)
      const totalSent = variantA.sent + variantB.sent;
      const expectedPerVariant = totalSent / 2;
      const tolerance = expectedPerVariant * 0.2;

      expect(Math.abs(variantA.sent - expectedPerVariant)).toBeLessThanOrEqual(tolerance);
      expect(Math.abs(variantB.sent - expectedPerVariant)).toBeLessThanOrEqual(tolerance);
    });

    it('should determine winning variant based on metrics', async () => {
      // Launch A/B test
      await app.request(`/api/campaigns/${abTestCampaign.id}/launch`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      // Simulate some interactions (in real test, this would be done by test users)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if winner is determined
      const response = await app.request(`/api/campaigns/${abTestCampaign.id}/ab-winner`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const result = await response.json();
      expect(result.success).toBe(true);
      
      if (result.data.winner) {
        expect(['Version A', 'Version B']).toContain(result.data.winner.name);
        expect(result.data.confidence).toBeGreaterThan(0);
      }
    });
  });

  describe('Analytics Integration', () => {
    beforeEach(async () => {
      // Create and launch campaign for analytics
      const campaignData = {
        name: 'Analytics Test Campaign',
        subject: 'Analytics Test',
        content: '<p>Test content with <a href="https://example.com">link</a></p>',
        listIds: testContacts.map(c => c.id),
      };

      const response = await app.request('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(campaignData),
      });

      testCampaign = (await response.json()).data;

      await app.request(`/api/campaigns/${testCampaign.id}/launch`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
    });

    it('should provide comprehensive campaign analytics', async () => {
      // Wait for processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await app.request(`/api/campaigns/${testCampaign.id}/analytics`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(response.status).toBe(200);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        overview: {
          totalSent: expect.any(Number),
          delivered: expect.any(Number),
          opened: expect.any(Number),
          clicked: expect.any(Number),
          bounced: expect.any(Number),
          unsubscribed: expect.any(Number),
        },
        metrics: {
          deliveryRate: expect.any(Number),
          openRate: expect.any(Number),
          clickRate: expect.any(Number),
          bounceRate: expect.any(Number),
          unsubscribeRate: expect.any(Number),
        },
        timeline: expect.any(Array),
        performance: {
          grade: expect.any(String),
          recommendations: expect.any(Array),
        },
      });

      // Verify metrics are within valid ranges
      const { metrics } = result.data;
      expect(metrics.deliveryRate).toBeGreaterThanOrEqual(0);
      expect(metrics.deliveryRate).toBeLessThanOrEqual(1);
      expect(metrics.openRate).toBeGreaterThanOrEqual(0);
      expect(metrics.openRate).toBeLessThanOrEqual(1);
      expect(metrics.clickRate).toBeGreaterThanOrEqual(0);
      expect(metrics.clickRate).toBeLessThanOrEqual(1);
    });

    it('should track individual email events', async () => {
      // Get email events
      const response = await app.request(`/api/campaigns/${testCampaign.id}/events`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        query: 'limit=10',
      });

      expect(response.status).toBe(200);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data.events)).toBe(true);

      // Verify event structure
      if (result.data.events.length > 0) {
        const event = result.data.events[0];
        expect(event).toMatchObject({
          id: expect.any(String),
          type: expect.any(String),
          contactId: expect.any(String),
          timestamp: expect.any(String),
        });
      }
    });

    it('should generate performance recommendations', async () => {
      const response = await app.request(`/api/campaigns/${testCampaign.id}/recommendations`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(response.status).toBe(200);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data.recommendations)).toBe(true);

      // Verify recommendations are actionable
      if (result.data.recommendations.length > 0) {
        const recommendation = result.data.recommendations[0];
        expect(recommendation).toMatchObject({
          type: expect.any(String),
          priority: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          actionItems: expect.any(Array),
        });
      }
    });
  });

  describe('Cross-Service Integration', () => {
    it('should integrate with notification service for campaign alerts', async () => {
      const notificationSpy = jest.spyOn(notificationService, 'createNotification');

      // Create and launch campaign
      const campaignData = {
        name: 'Notification Test Campaign',
        subject: 'Notification Test',
        content: '<p>Test content</p>',
        listIds: testContacts.slice(0, 5).map(c => c.id),
      };

      const response = await app.request('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(campaignData),
      });

      const campaign = (await response.json()).data;

      await app.request(`/api/campaigns/${campaign.id}/launch`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      // Wait for processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Verify notifications were sent
      expect(notificationSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: expect.any(String),
          category: 'campaign',
          title: expect.any(String),
        })
      );

      notificationSpy.mockRestore();
    });

    it('should integrate with audit service for compliance', async () => {
      // Launch campaign
      await app.request(`/api/campaigns/${testCampaign.id}/launch`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      // Verify comprehensive audit trail
      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        resource: 'campaign',
        resourceId: testCampaign.id,
      });

      expect(auditLogs.logs.length).toBeGreaterThan(0);

      // Should have logs for campaign creation, launch, and email sends
      const logActions = auditLogs.logs.map(log => log.action);
      expect(logActions).toContain('campaign_created');
      expect(logActions).toContain('campaign_launched');
      expect(logActions).toContain('email_sent');

      // Verify audit log integrity
      const integrityCheck = await auditLogService.verifyAuditTrailIntegrity(
        testOrganization.id
      );
      expect(integrityCheck.validLogs).toBe(integrityCheck.totalLogs);
    });

    it('should handle service failures gracefully', async () => {
      // Mock email service failure
      const originalSendEmail = emailCampaignService.sendEmail;
      emailCampaignService.sendEmail = jest.fn().mockRejectedValue(
        new Error('Email service unavailable')
      );

      const response = await app.request(`/api/campaigns/${testCampaign.id}/launch`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      // Should handle failure gracefully
      expect(response.status).toBe(500);
      
      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.error).toContain('Email service');

      // Restore original method
      emailCampaignService.sendEmail = originalSendEmail;
    });
  });

  // Helper functions
  async function setupTestData(): Promise<void> {
    // Create test contacts for campaigns
    testContacts = await createTestContacts(50);
  }

  async function createTestContacts(count: number): Promise<any[]> {
    const contacts = [];
    for (let i = 0; i < count; i++) {
      contacts.push({
        id: `contact-${i}`,
        email: `contact${i}@test.com`,
        firstName: `Contact${i}`,
        lastName: `Test${i}`,
      });
    }
    return contacts;
  }

  async function cleanupCampaignData(): Promise<void> {
    if (testCampaign?.id) {
      try {
        await app.request(`/api/campaigns/${testCampaign.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
      } catch (error) {
        // Ignore cleanup errors
      }
    }
    testCampaign = null;
  }

  async function cleanupTestData(): Promise<void> {
    await cleanupCampaignData();
    
    // Clean up test contacts
    for (const contact of testContacts) {
      try {
        await app.request(`/api/contacts/${contact.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
      } catch (error) {
        // Ignore cleanup errors
      }
    }

    if (testUser?.id) {
      await userManagementService.deleteUser(testOrganization.id, testUser.id);
    }
    if (testOrganization?.id) {
      await organizationManagementService.deleteOrganization(testOrganization.id);
    }
  }

  async function teardownTestEnvironment(): Promise<void> {
    // Final cleanup
  }
});
