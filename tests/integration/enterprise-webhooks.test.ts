import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { setupTestApp, cleanupTestApp, createTestUser, createTestOrganization } from '../setup/test-setup';

describe('Enterprise Webhooks Integration Tests', () => {
  let testOrg: any;
  let testUser: any;
  let authToken: string;

  beforeAll(async () => {
    await setupTestApp();
    testOrg = await createTestOrganization();
    testUser = await createTestUser({ organizationId: testOrg.id, role: 'admin' });
    authToken = `Bearer ${testUser.sessionToken}`;
  });

  afterAll(async () => {
    await cleanupTestApp();
  });

  describe('Webhook CRUD Operations', () => {
    it('should create a webhook', async () => {
      const webhookData = {
        name: 'Test Webhook',
        url: 'https://example.com/webhook',
        events: ['user.created', 'user.updated'],
        headers: { 'X-Custom': 'value' },
        retryAttempts: 3
      };

      const response = await fetch('http://localhost:3000/api/trpc/enterprise.webhooks.create', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookData)
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(result.result.data).toMatchObject({
        name: webhookData.name,
        url: webhookData.url,
        events: webhookData.events,
        status: 'active'
      });
      expect(result.result.data.secret).toMatch(/^whsec_/);
    });

    it('should list webhooks for organization', async () => {
      const response = await fetch('http://localhost:3000/api/trpc/enterprise.webhooks.getWebhooks', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(Array.isArray(result.result.data)).toBe(true);
    });

    it('should update a webhook', async () => {
      // First create a webhook
      const createResponse = await fetch('http://localhost:3000/api/trpc/enterprise.webhooks.create', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Update Test',
          url: 'https://example.com/update',
          events: ['test.event']
        })
      });

      const createResult = await createResponse.json();
      const webhookId = createResult.result.data.id;

      // Update the webhook
      const updateData = { name: 'Updated Webhook', status: 'inactive' };
      const updateResponse = await fetch('http://localhost:3000/api/trpc/enterprise.webhooks.update', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: webhookId, ...updateData })
      });

      expect(updateResponse.ok).toBe(true);
      const updateResult = await updateResponse.json();
      expect(updateResult.result.data.name).toBe(updateData.name);
      expect(updateResult.result.data.status).toBe(updateData.status);
    });

    it('should delete a webhook', async () => {
      // First create a webhook
      const createResponse = await fetch('http://localhost:3000/api/trpc/enterprise.webhooks.create', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Delete Test',
          url: 'https://example.com/delete',
          events: ['delete.event']
        })
      });

      const createResult = await createResponse.json();
      const webhookId = createResult.result.data.id;

      // Delete the webhook
      const deleteResponse = await fetch('http://localhost:3000/api/trpc/enterprise.webhooks.delete', {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: webhookId })
      });

      expect(deleteResponse.ok).toBe(true);
      const deleteResult = await deleteResponse.json();
      expect(deleteResult.result.data.success).toBe(true);
      expect(deleteResult.result.data.deletedId).toBe(webhookId);
    });

    it('should enforce webhook permissions', async () => {
      // Create a user without webhook permissions
      const limitedUser = await createTestUser({ 
        organizationId: testOrg.id, 
        role: 'user' 
      });
      const limitedToken = `Bearer ${limitedUser.sessionToken}`;

      const response = await fetch('http://localhost:3000/api/trpc/enterprise.webhooks.getWebhooks', {
        method: 'POST',
        headers: {
          'Authorization': limitedToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      // Should be forbidden due to lack of WEBHOOK_READ permission
      expect(response.status).toBe(403);
    });
  });
});
