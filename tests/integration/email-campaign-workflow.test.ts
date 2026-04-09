import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import request from 'supertest';
import { app } from '../../backend/server';
import { db } from '../../backend/db/connection';

describe('Email Campaign End-to-End Workflow', () => {
  let organizationId: string;
  let userId: string;
  let campaignId: string;
  let contactListId: string;
  let authToken: string;

  beforeEach(async () => {
    // Create test organization and user
    const orgResult = await db.insert({
      into: 'organizations',
      values: {
        name: 'Test Organization',
        domain: 'test-org.com',
        plan: 'pro',
        settings: {},
        created_at: new Date(),
        updated_at: new Date(),
      },
      returning: ['id'],
    });

    organizationId = orgResult[0].id;

    const userResult = await db.insert({
      into: 'users',
      values: {
        organization_id: organizationId,
        email: 'test@example.com',
        name: 'Test User',
        role: 'admin',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      returning: ['id'],
    });

    userId = userResult[0].id;

    // Create contact list
    const listResult = await db.insert({
      into: 'contact_lists',
      values: {
        organization_id: organizationId,
        name: 'Test List',
        description: 'Test contact list',
        created_at: new Date(),
        updated_at: new Date(),
      },
      returning: ['id'],
    });

    contactListId = listResult[0].id;

    // Add test contacts
    await db.insert({
      into: 'contacts',
      values: [
        {
          organization_id: organizationId,
          list_id: contactListId,
          email: 'contact1@example.com',
          first_name: 'John',
          last_name: 'Doe',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          organization_id: organizationId,
          list_id: contactListId,
          email: 'contact2@example.com',
          first_name: 'Jane',
          last_name: 'Smith',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });

    // Get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword',
      });

    authToken = loginResponse.body.token;
  });

  afterEach(async () => {
    // Clean up test data
    await db.delete().from('campaigns').where('organization_id', '=', organizationId);
    await db.delete().from('contacts').where('organization_id', '=', organizationId);
    await db.delete().from('contact_lists').where('organization_id', '=', organizationId);
    await db.delete().from('users').where('id', '=', userId);
    await db.delete().from('organizations').where('id', '=', organizationId);
  });

  describe('Complete Email Campaign Workflow', () => {
    it('should create, launch, and monitor email campaign end-to-end', async () => {
      // Step 1: Create email campaign
      const campaignData = {
        name: 'Test Campaign',
        subject: 'Test Subject',
        content: '<h1>Hello {{firstName}}</h1><p>This is a test email.</p>',
        list_id: contactListId,
        scheduled_at: null, // Send immediately
      };

      const createResponse = await request(app)
        .post('/api/email-campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .send(campaignData)
        .expect(201);

      campaignId = createResponse.body.id;
      expect(createResponse.body).toMatchObject({
        name: 'Test Campaign',
        subject: 'Test Subject',
        status: 'draft',
        organization_id: organizationId,
      });

      // Step 2: Add email template variables
      const templateData = {
        name: 'Test Template',
        subject: 'Hello {{firstName}} {{lastName}}',
        content: 'Dear {{firstName}}, welcome to our service!',
        variables: ['firstName', 'lastName'],
      };

      const templateResponse = await request(app)
        .post('/api/email-campaigns/templates')
        .set('Authorization', `Bearer ${authToken}`)
        .send(templateData)
        .expect(201);

      expect(templateResponse.body).toMatchObject({
        name: 'Test Template',
        variables: ['firstName', 'lastName'],
      });

      // Step 3: Launch campaign
      const launchResponse = await request(app)
        .post(`/api/email-campaigns/${campaignId}/launch`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(launchResponse.body).toMatchObject({
        campaign_id: campaignId,
        status: 'sending',
        job_id: expect.any(String),
      });

      // Step 4: Monitor campaign progress
      // Wait a moment for processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      const progressResponse = await request(app)
        .get(`/api/email-campaigns/${campaignId}/progress`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(progressResponse.body).toMatchObject({
        campaign_id: campaignId,
        total_recipients: 2,
        processed_count: expect.any(Number),
        failed_count: expect.any(Number),
      });

      // Step 5: Get campaign analytics
      const analyticsResponse = await request(app)
        .get(`/api/email-campaigns/${campaignId}/analytics`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(analyticsResponse.body).toMatchObject({
        total_sent: expect.any(Number),
        total_opened: expect.any(Number),
        total_clicked: expect.any(Number),
        total_bounced: expect.any(Number),
        open_rate: expect.any(Number),
        click_rate: expect.any(Number),
      });

      // Step 6: Verify campaign status
      const statusResponse = await request(app)
        .get(`/api/email-campaigns/${campaignId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(['sent', 'sending', 'completed']).toContain(statusResponse.body.status);
    });

    it('should handle A/B testing workflow', async () => {
      // Step 1: Create A/B test campaign
      const abTestData = {
        name: 'A/B Test Campaign',
        list_id: contactListId,
        variants: [
          {
            name: 'Variant A',
            subject: 'Subject A',
            content: 'Content A',
            traffic_split: 50,
          },
          {
            name: 'Variant B',
            subject: 'Subject B',
            content: 'Content B',
            traffic_split: 50,
          },
        ],
        test_duration_days: 7,
        success_metric: 'open_rate',
      };

      const createResponse = await request(app)
        .post('/api/email-campaigns/ab-test')
        .set('Authorization', `Bearer ${authToken}`)
        .send(abTestData)
        .expect(201);

      const abTestId = createResponse.body.id;
      expect(createResponse.body).toMatchObject({
        name: 'A/B Test Campaign',
        test_type: 'ab_test',
        status: 'draft',
      });

      // Step 2: Launch A/B test
      const launchResponse = await request(app)
        .post(`/api/email-campaigns/ab-test/${abTestId}/launch`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(launchResponse.body).toMatchObject({
        test_id: abTestId,
        status: 'running',
      });

      // Step 3: Get A/B test results
      const resultsResponse = await request(app)
        .get(`/api/email-campaigns/ab-test/${abTestId}/results`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(resultsResponse.body).toMatchObject({
        test_id: abTestId,
        variants: expect.arrayContaining([
          expect.objectContaining({
            name: 'Variant A',
            metrics: expect.any(Object),
          }),
          expect.objectContaining({
            name: 'Variant B',
            metrics: expect.any(Object),
          }),
        ]),
        winning_variant: expect.any(String),
        confidence: expect.any(Number),
      });
    });

    it('should handle scheduled campaign workflow', async () => {
      // Step 1: Create scheduled campaign
      const scheduledDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // Tomorrow
      const campaignData = {
        name: 'Scheduled Campaign',
        subject: 'Scheduled Subject',
        content: 'Scheduled content',
        list_id: contactListId,
        scheduled_at: scheduledDate.toISOString(),
      };

      const createResponse = await request(app)
        .post('/api/email-campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .send(campaignData)
        .expect(201);

      campaignId = createResponse.body.id;
      expect(createResponse.body).toMatchObject({
        name: 'Scheduled Campaign',
        status: 'scheduled',
        scheduled_at: expect.any(String),
      });

      // Step 2: Update scheduled time
      const newScheduledDate = new Date(Date.now() + 48 * 60 * 60 * 1000); // Day after tomorrow
      const updateResponse = await request(app)
        .put(`/api/email-campaigns/${campaignId}/schedule`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          scheduled_at: newScheduledDate.toISOString(),
        })
        .expect(200);

      expect(updateResponse.body).toMatchObject({
        campaign_id: campaignId,
        scheduled_at: newScheduledDate.toISOString(),
      });

      // Step 3: Cancel scheduled campaign
      const cancelResponse = await request(app)
        .post(`/api/email-campaigns/${campaignId}/cancel`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(cancelResponse.body).toMatchObject({
        campaign_id: campaignId,
        status: 'cancelled',
      });
    });
  });

  describe('Contact Management Workflow', () => {
    it('should manage contacts throughout campaign lifecycle', async () => {
      // Step 1: Add new contact
      const contactData = {
        list_id: contactListId,
        email: 'newcontact@example.com',
        first_name: 'New',
        last_name: 'Contact',
        phone: '+1234567890',
        metadata: { source: 'manual' },
      };

      const addResponse = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${authToken}`)
        .send(contactData)
        .expect(201);

      const contactId = addResponse.body.id;
      expect(addResponse.body).toMatchObject({
        email: 'newcontact@example.com',
        first_name: 'New',
        last_name: 'Contact',
      });

      // Step 2: Update contact
      const updateData = {
        first_name: 'Updated',
        last_name: 'Name',
        metadata: { source: 'manual', updated: true },
      };

      const updateResponse = await request(app)
        .put(`/api/contacts/${contactId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(updateResponse.body).toMatchObject({
        first_name: 'Updated',
        last_name: 'Name',
      });

      // Step 3: Add contact to suppression list
      const suppressResponse = await request(app)
        .post(`/api/contacts/${contactId}/suppress`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          reason: 'user_request',
        })
        .expect(200);

      expect(suppressResponse.body).toMatchObject({
        contact_id: contactId,
        is_suppressed: true,
        suppression_reason: 'user_request',
      });

      // Step 4: Verify contact is excluded from campaigns
      const campaignData = {
        name: 'Test Campaign',
        subject: 'Test Subject',
        content: 'Test content',
        list_id: contactListId,
      };

      const createResponse = await request(app)
        .post('/api/email-campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .send(campaignData)
        .expect(201);

      campaignId = createResponse.body.id;

      const launchResponse = await request(app)
        .post(`/api/email-campaigns/${campaignId}/launch`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Should only process 2 contacts (suppressed contact excluded)
      expect(launchResponse.body.total_recipients).toBe(2);
    });
  });

  describe('Email Provider Integration', () => {
    it('should handle multiple email providers', async () => {
      // Step 1: Configure SendGrid
      const sendgridConfig = {
        provider: 'sendgrid',
        api_key: 'test-sendgrid-key',
        from_email: 'test@example.com',
        from_name: 'Test Sender',
      };

      const configResponse = await request(app)
        .post('/api/email-providers/configure')
        .set('Authorization', `Bearer ${authToken}`)
        .send(sendgridConfig)
        .expect(200);

      expect(configResponse.body).toMatchObject({
        provider: 'sendgrid',
        status: 'configured',
      });

      // Step 2: Test provider connectivity
      const testResponse = await request(app)
        .post('/api/email-providers/test')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ provider: 'sendgrid' })
        .expect(200);

      expect(testResponse.body).toMatchObject({
        provider: 'sendgrid',
        status: 'connected',
      });

      // Step 3: Send test email
      const testEmailData = {
        provider: 'sendgrid',
        to: 'test@example.com',
        subject: 'Test Email',
        content: 'This is a test email',
      };

      const sendResponse = await request(app)
        .post('/api/email-providers/send-test')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testEmailData)
        .expect(200);

      expect(sendResponse.body).toMatchObject({
        status: 'sent',
        message_id: expect.any(String),
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle campaign with empty contact list', async () => {
      // Create empty list
      const emptyListResult = await db.insert({
        into: 'contact_lists',
        values: {
          organization_id: organizationId,
          name: 'Empty List',
          description: 'Empty contact list',
          created_at: new Date(),
          updated_at: new Date(),
        },
        returning: ['id'],
      });

      const emptyListId = emptyListResult[0].id;

      const campaignData = {
        name: 'Empty Campaign',
        subject: 'Test Subject',
        content: 'Test content',
        list_id: emptyListId,
      };

      const createResponse = await request(app)
        .post('/api/email-campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .send(campaignData)
        .expect(201);

      const launchResponse = await request(app)
        .post(`/api/email-campaigns/${createResponse.body.id}/launch`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(launchResponse.body).toMatchObject({
        status: 'completed',
        message: 'No recipients found',
        total_recipients: 0,
      });
    });

    it('should handle invalid email addresses', async () => {
      // Add contact with invalid email
      await db.insert({
        into: 'contacts',
        values: {
          organization_id: organizationId,
          list_id: contactListId,
          email: 'invalid-email',
          first_name: 'Invalid',
          last_name: 'Email',
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      const campaignData = {
        name: 'Invalid Email Campaign',
        subject: 'Test Subject',
        content: 'Test content',
        list_id: contactListId,
      };

      const createResponse = await request(app)
        .post('/api/email-campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .send(campaignData)
        .expect(201);

      const launchResponse = await request(app)
        .post(`/api/email-campaigns/${createResponse.body.id}/launch`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Should process valid emails and mark invalid ones as failed
      expect(launchResponse.body.failed_count).toBeGreaterThan(0);
    });

    it('should handle campaign pause and resume', async () => {
      const campaignData = {
        name: 'Pauseable Campaign',
        subject: 'Test Subject',
        content: 'Test content',
        list_id: contactListId,
      };

      const createResponse = await request(app)
        .post('/api/email-campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .send(campaignData)
        .expect(201);

      campaignId = createResponse.body.id;

      // Launch campaign
      await request(app)
        .post(`/api/email-campaigns/${campaignId}/launch`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Pause campaign
      const pauseResponse = await request(app)
        .post(`/api/email-campaigns/${campaignId}/pause`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(pauseResponse.body).toMatchObject({
        campaign_id: campaignId,
        status: 'paused',
      });

      // Resume campaign
      const resumeResponse = await request(app)
        .post(`/api/email-campaigns/${campaignId}/resume`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(resumeResponse.body).toMatchObject({
        campaign_id: campaignId,
        status: 'sending',
      });
    });
  });
});
