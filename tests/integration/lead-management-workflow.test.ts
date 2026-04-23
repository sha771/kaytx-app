import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import request from 'supertest';
import { app } from '../../backend/server';
import { db } from '../../backend/db/connection';

describe('Lead Management End-to-End Workflow', () => {
  let organizationId: string;
  let userId: string;
  let authToken: string;
  let leadId: string;
  let workflowId: string;

  beforeEach(async () => {
    // Create test organization and user
    const orgResult = await db.insert({
      into: 'organizations',
      values: {
        name: 'Lead Test Organization',
        domain: 'lead-test.com',
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
        email: 'leadtest@example.com',
        name: 'Lead Test User',
        role: 'admin',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      returning: ['id'],
    });

    userId = userResult[0].id;

    // Get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'leadtest@example.com',
        password: 'testpassword',
      });

    authToken = loginResponse.body.token;
  });

  afterEach(async () => {
    // Clean up test data
    await db.delete().from('lead_activities').where('lead_id', '=', leadId);
    await db.delete().from('lead_workflows').where('organization_id', '=', organizationId);
    await db.delete().from('leads').where('organization_id', '=', organizationId);
    await db.delete().from('users').where('id', '=', userId);
    await db.delete().from('organizations').where('id', '=', organizationId);
  });

  describe('Complete Lead Lifecycle Workflow', () => {
    it('should manage lead from creation to conversion', async () => {
      // Step 1: Create new lead
      const leadData = {
        email: 'john.doe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        company: 'Acme Corporation',
        position: 'CEO',
        phone: '+1234567890',
        source: 'website',
        metadata: { campaign: 'spring-promo' },
      };

      const createResponse = await request(app)
        .post('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .send(leadData)
        .expect(201);

      leadId = createResponse.body.id;
      expect(createResponse.body).toMatchObject({
        email: 'john.doe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        company: 'Acme Corporation',
        status: 'new',
        source: 'website',
        score: expect.any(Number),
        lead_temperature: expect.any(String),
        lifecycle_stage: 'lead',
      });

      // Step 2: Update lead with additional information
      const updateData = {
        website: 'https://acme.com',
        annual_revenue: 1000000,
        employee_count: 50,
        industry: 'technology',
      };

      const updateResponse = await request(app)
        .put(`/api/leads/${leadId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(updateResponse.body).toMatchObject({
        id: leadId,
        website: 'https://acme.com',
        metadata: expect.objectContaining({
          annual_revenue: 1000000,
          employee_count: 50,
          industry: 'technology',
        }),
      });

      // Step 3: Add lead activities
      const activities = [
        {
          type: 'call',
          description: 'Initial discovery call',
          outcome: 'positive',
          duration: 30,
          notes: 'Interested in enterprise solution',
        },
        {
          type: 'email',
          description: 'Follow-up email with pricing',
          outcome: 'sent',
          notes: 'Sent enterprise pricing sheet',
        },
        {
          type: 'meeting',
          description: 'Product demo',
          outcome: 'positive',
          duration: 60,
          notes: 'Demo went well, interested in features',
        },
      ];

      for (const activity of activities) {
        await request(app)
          .post(`/api/leads/${leadId}/activities`)
          .set('Authorization', `Bearer ${authToken}`)
          .send(activity)
          .expect(201);
      }

      // Step 4: Update lead status through pipeline
      const statusUpdates = [
        { status: 'contacted', notes: 'Initial contact made' },
        { status: 'qualified', notes: 'Lead qualified based on budget and authority' },
        { status: 'opportunity', notes: 'Converted to sales opportunity' },
      ];

      for (const statusUpdate of statusUpdates) {
        await request(app)
          .put(`/api/leads/${leadId}/status`)
          .set('Authorization', `Bearer ${authToken}`)
          .send(statusUpdate)
          .expect(200);
      }

      // Step 5: Convert lead to customer
      const conversionData = {
        deal_value: 50000,
        deal_close_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        conversion_notes: 'Closed enterprise deal',
        products: ['enterprise-plan', 'premium-support'],
      };

      const conversionResponse = await request(app)
        .post(`/api/leads/${leadId}/convert`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(conversionData)
        .expect(200);

      expect(conversionResponse.body).toMatchObject({
        lead_id: leadId,
        status: 'customer',
        lifecycle_stage: 'customer',
        deal_value: 50000,
        conversion_date: expect.any(String),
      });

      // Step 6: Verify lead history and analytics
      const historyResponse = await request(app)
        .get(`/api/leads/${leadId}/history`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(historyResponse.body).toMatchObject({
        lead_id: leadId,
        activities: expect.arrayContaining([
          expect.objectContaining({ type: 'call' }),
          expect.objectContaining({ type: 'email' }),
          expect.objectContaining({ type: 'meeting' }),
        ]),
        status_changes: expect.any(Array),
        score_history: expect.any(Array),
      });

      // Step 7: Get lead analytics
      const analyticsResponse = await request(app)
        .get(`/api/leads/${leadId}/analytics`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(analyticsResponse.body).toMatchObject({
        lead_id: leadId,
        total_activities: expect.any(Number),
        engagement_score: expect.any(Number),
        conversion_probability: expect.any(Number),
        time_to_conversion: expect.any(Number),
        activity_breakdown: expect.any(Object),
      });
    });

    it('should handle lead scoring and nurturing workflow', async () => {
      // Step 1: Create lead with initial score
      const leadData = {
        email: 'nurture@example.com',
        first_name: 'Nurture',
        last_name: 'Test',
        company: 'Test Company',
        position: 'Manager',
        source: 'referral',
        metadata: { referrer: 'existing-customer' },
      };

      const createResponse = await request(app)
        .post('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .send(leadData)
        .expect(201);

      leadId = createResponse.body.id;
      const initialScore = createResponse.body.score;

      // Step 2: Simulate engagement activities to increase score
      const engagementActivities = [
        { type: 'email_open', points: 5 },
        { type: 'link_click', points: 10 },
        { type: 'form_submit', points: 15 },
        { type: 'website_visit', points: 8 },
        { type: 'demo_request', points: 25 },
      ];

      for (const activity of engagementActivities) {
        await request(app)
          .post(`/api/leads/${leadId}/score`)
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            activity: activity.type,
            points: activity.points,
            notes: `${activity.type} activity`,
          })
          .expect(200);
      }

      // Step 3: Check updated score and temperature
      const scoreResponse = await request(app)
        .get(`/api/leads/${leadId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(scoreResponse.body.score).toBeGreaterThan(initialScore);
      expect(['cold', 'warm', 'hot']).toContain(scoreResponse.body.lead_temperature);

      // Step 4: Trigger nurturing workflow based on score
      const workflowData = {
        name: 'High Score Nurturing',
        description: 'Nurture leads with high scores',
        trigger: { type: 'score_threshold', value: 50 },
        steps: [
          {
            order: 1,
            type: 'email',
            name: 'Personalized Follow-up',
            config: {
              template: 'high-score-followup',
              delay_hours: 1,
            },
          },
          {
            order: 2,
            type: 'task',
            name: 'Sales Call Assignment',
            config: {
              assign_to: 'sales-team',
              priority: 'high',
              delay_hours: 24,
            },
          },
        ],
        is_active: true,
      };

      const workflowResponse = await request(app)
        .post('/api/lead-workflows')
        .set('Authorization', `Bearer ${authToken}`)
        .send(workflowData)
        .expect(201);

      workflowId = workflowResponse.body.id;

      // Step 5: Execute workflow for lead
      const executeResponse = await request(app)
        .post(`/api/lead-workflows/${workflowId}/execute`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ lead_id: leadId })
        .expect(200);

      expect(executeResponse.body).toMatchObject({
        workflow_id: workflowId,
        lead_id: leadId,
        status: 'executed',
        steps_completed: expect.any(Number),
      });

      // Step 6: Verify workflow execution results
      const resultsResponse = await request(app)
        .get(`/api/lead-workflows/${workflowId}/results`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(resultsResponse.body).toMatchObject({
        workflow_id: workflowId,
        executions: expect.arrayContaining([
          expect.objectContaining({
            lead_id: leadId,
            status: expect.any(String),
            steps: expect.any(Array),
          }),
        ]),
      });
    });
  });

  describe('Lead Assignment and Routing', () => {
    it('should handle automatic lead assignment', async () => {
      // Step 1: Create sales team members
      const salesUsers = [];
      for (let i = 0; i < 3; i++) {
        const userResult = await db.insert({
          into: 'users',
          values: {
            organization_id: organizationId,
            email: `sales${i}@example.com`,
            name: `Sales User ${i}`,
            role: 'sales',
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
          },
          returning: ['id'],
        });
        salesUsers.push(userResult[0].id);
      }

      // Step 2: Create assignment rules
      const assignmentRules = [
        {
          name: 'Geographic Assignment',
          conditions: [
            { field: 'metadata.country', operator: 'equals', value: 'US' },
          ],
          assign_to: salesUsers[0],
          priority: 1,
        },
        {
          name: 'High Value Assignment',
          conditions: [
            { field: 'metadata.annual_revenue', operator: 'greater_than', value: 1000000 },
          ],
          assign_to: salesUsers[1],
          priority: 2,
        },
        {
          name: 'Default Assignment',
          conditions: [],
          assign_to: salesUsers[2],
          priority: 3,
        },
      ];

      for (const rule of assignmentRules) {
        await request(app)
          .post('/api/lead-assignment-rules')
          .set('Authorization', `Bearer ${authToken}`)
          .send(rule)
          .expect(201);
      }

      // Step 3: Create leads that should match different rules
      const leads = [
        {
          email: 'us-lead@example.com',
          first_name: 'US',
          last_name: 'Lead',
          metadata: { country: 'US', annual_revenue: 500000 },
        },
        {
          email: 'high-value@example.com',
          first_name: 'High',
          last_name: 'Value',
          metadata: { country: 'UK', annual_revenue: 2000000 },
        },
        {
          email: 'default@example.com',
          first_name: 'Default',
          last_name: 'Lead',
          metadata: { country: 'CA', annual_revenue: 100000 },
        },
      ];

      const createdLeads = [];
      for (const leadData of leads) {
        const response = await request(app)
          .post('/api/leads')
          .set('Authorization', `Bearer ${authToken}`)
          .send(leadData)
          .expect(201);
        createdLeads.push(response.body);
      }

      // Step 4: Trigger assignment process
      await request(app)
        .post('/api/leads/assign')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ lead_ids: createdLeads.map(l => l.id) })
        .expect(200);

      // Step 5: Verify assignments
      for (const lead of createdLeads) {
        const leadResponse = await request(app)
          .get(`/api/leads/${lead.id}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        expect(leadResponse.body.assigned_to).toBeDefined();
        expect(salesUsers).toContain(leadResponse.body.assigned_to);
      }

      // Step 6: Check assignment analytics
      const analyticsResponse = await request(app)
        .get('/api/leads/assignment-analytics')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(analyticsResponse.body).toMatchObject({
        total_assigned: expect.any(Number),
        assignment_by_user: expect.any(Object),
        assignment_by_rule: expect.any(Object),
        average_assignment_time: expect.any(Number),
      });

      // Clean up sales users
      await db.delete().from('users').where('id', 'in', salesUsers);
    });
  });

  describe('Lead Data Import and Export', () => {
    it('should handle bulk lead import', async () => {
      // Step 1: Prepare CSV data for import
      const csvData = `email,first_name,last_name,company,position,source
import1@example.com,Import,One,Import Corp,Manager,website
import2@example.com,Import,Two,Import Inc,Director,referral
import3@example.com,Import,Three,Import LLC,VP,email
invalid-email,Invalid,Format,Bad Company,CEO,website`;

      // Step 2: Upload CSV file
      const importResponse = await request(app)
        .post('/api/leads/import')
        .set('Authorization', `Bearer ${authToken}`)
        .attach('file', Buffer.from(csvData), 'leads.csv')
        .expect(200);

      expect(importResponse.body).toMatchObject({
        total_records: 4,
        imported_records: 3,
        failed_records: 1,
        errors: expect.arrayContaining([
          expect.objectContaining({
            row: expect.any(Number),
            error: expect.stringContaining('email'),
          }),
        ]),
      });

      // Step 3: Verify imported leads
      const leadsResponse = await request(app)
        .get('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ source: 'website,referral,email' })
        .expect(200);

      expect(leadsResponse.body.data).toHaveLength(3);
      expect(leadsResponse.body.data.map(l => l.email)).toEqual(
        expect.arrayContaining([
          'import1@example.com',
          'import2@example.com',
          'import3@example.com',
        ])
      );
    });

    it('should handle lead data export', async () => {
      // Step 1: Create test leads for export
      const leads = [
        {
          email: 'export1@example.com',
          first_name: 'Export',
          last_name: 'One',
          company: 'Export Corp',
          status: 'new',
        },
        {
          email: 'export2@example.com',
          first_name: 'Export',
          last_name: 'Two',
          company: 'Export Inc',
          status: 'contacted',
        },
      ];

      for (const leadData of leads) {
        await request(app)
          .post('/api/leads')
          .set('Authorization', `Bearer ${authToken}`)
          .send(leadData)
          .expect(201);
      }

      // Step 2: Export leads as CSV
      const csvExportResponse = await request(app)
        .get('/api/leads/export')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ format: 'csv' })
        .expect(200);

      expect(csvExportResponse.headers['content-type']).toMatch(/csv/);
      expect(csvExportResponse.text).toContain('email,first_name,last_name');
      expect(csvExportResponse.text).toContain('export1@example.com');
      expect(csvExportResponse.text).toContain('export2@example.com');

      // Step 3: Export leads as JSON
      const jsonExportResponse = await request(app)
        .get('/api/leads/export')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ format: 'json' })
        .expect(200);

      expect(jsonExportResponse.body).toMatchObject({
        leads: expect.arrayContaining([
          expect.objectContaining({
            email: 'export1@example.com',
            first_name: 'Export',
          }),
          expect.objectContaining({
            email: 'export2@example.com',
            first_name: 'Export',
          }),
        ]),
        exported_at: expect.any(String),
        total_count: expect.any(Number),
      });
    });
  });

  describe('Lead Analytics and Reporting', () => {
    it('should provide comprehensive lead analytics', async () => {
      // Step 1: Create leads with different statuses and sources
      const leadData = [
        { email: 'analytics1@example.com', status: 'new', source: 'website' },
        { email: 'analytics2@example.com', status: 'contacted', source: 'referral' },
        { email: 'analytics3@example.com', status: 'qualified', source: 'email' },
        { email: 'analytics4@example.com', status: 'converted', source: 'social' },
        { email: 'analytics5@example.com', status: 'lost', source: 'website' },
      ];

      for (const data of leadData) {
        await request(app)
          .post('/api/leads')
          .set('Authorization', `Bearer ${authToken}`)
          .send(data)
          .expect(201);
      }

      // Step 2: Get lead funnel analytics
      const funnelResponse = await request(app)
        .get('/api/leads/analytics/funnel')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(funnelResponse.body).toMatchObject({
        funnel_stages: expect.arrayContaining([
          expect.objectContaining({ stage: 'new', count: expect.any(Number) }),
          expect.objectContaining({ stage: 'contacted', count: expect.any(Number) }),
          expect.objectContaining({ stage: 'qualified', count: expect.any(Number) }),
          expect.objectContaining({ stage: 'converted', count: expect.any(Number) }),
        ]),
        conversion_rates: expect.any(Object),
        average_time_in_stage: expect.any(Object),
      });

      // Step 3: Get source analytics
      const sourceResponse = await request(app)
        .get('/api/leads/analytics/sources')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(sourceResponse.body).toMatchObject({
        sources: expect.arrayContaining([
          expect.objectContaining({ source: 'website', count: expect.any(Number) }),
          expect.objectContaining({ source: 'referral', count: expect.any(Number) }),
          expect.objectContaining({ source: 'email', count: expect.any(Number) }),
          expect.objectContaining({ source: 'social', count: expect.any(Number) }),
        ]),
        conversion_by_source: expect.any(Object),
        cost_per_lead: expect.any(Object),
      });

      // Step 4: Get performance metrics
      const performanceResponse = await request(app)
        .get('/api/leads/analytics/performance')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(performanceResponse.body).toMatchObject({
        total_leads: expect.any(Number),
        conversion_rate: expect.any(Number),
        average_lead_score: expect.any(Number),
        average_time_to_convert: expect.any(Number),
        top_performing_sources: expect.any(Array),
        trends: expect.any(Object),
      });

      // Step 5: Get team performance
      const teamResponse = await request(app)
        .get('/api/leads/analytics/team')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(teamResponse.body).toMatchObject({
        team_members: expect.any(Array),
        total_conversions: expect.any(Number),
        conversion_by_member: expect.any(Object),
        average_activities_per_lead: expect.any(Number),
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle duplicate lead detection', async () => {
      // Step 1: Create initial lead
      const leadData = {
        email: 'duplicate@example.com',
        first_name: 'Duplicate',
        last_name: 'Test',
        company: 'Test Company',
      };

      const firstResponse = await request(app)
        .post('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .send(leadData)
        .expect(201);

      // Step 2: Try to create duplicate lead
      const duplicateResponse = await request(app)
        .post('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .send(leadData)
        .expect(409);

      expect(duplicateResponse.body).toMatchObject({
        error: expect.stringContaining('duplicate'),
        existing_lead_id: expect.any(String),
      });

      // Step 3: Update existing lead instead
      const updateResponse = await request(app)
        .post('/api/leads/merge')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          primary_lead_id: firstResponse.body.id,
          update_data: { phone: '+1234567890', notes: 'Updated via merge' },
        })
        .expect(200);

      expect(updateResponse.body).toMatchObject({
        lead_id: firstResponse.body.id,
        merged: true,
        updated_fields: expect.any(Array),
      });
    });

    it('should handle invalid lead status transitions', async () => {
      // Step 1: Create lead
      const leadData = {
        email: 'status@example.com',
        first_name: 'Status',
        last_name: 'Test',
      };

      const createResponse = await request(app)
        .post('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .send(leadData)
        .expect(201);

      leadId = createResponse.body.id;

      // Step 2: Try invalid status transition (new → converted directly)
      const invalidResponse = await request(app)
        .put(`/api/leads/${leadId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          status: 'converted',
          notes: 'Invalid transition',
        })
        .expect(400);

      expect(invalidResponse.body.error).toContain('invalid transition');

      // Step 3: Try valid status transition
      const validResponse = await request(app)
        .put(`/api/leads/${leadId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          status: 'contacted',
          notes: 'Valid transition',
        })
        .expect(200);

      expect(validResponse.body.status).toBe('contacted');
    });
  });
});
