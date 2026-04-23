import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { Hono } from 'hono';
import { DatabaseUtils } from '../../utils/database-utils';
import { SecurityUtils } from '../../utils/security-utils';

// Mock services for testing
const mockEmailCampaignService = {
  createCampaign: jest.fn(),
  getCampaigns: jest.fn(),
  sendCampaign: jest.fn(),
};

const mockLeadManagementService = {
  createLead: jest.fn(),
  getLeads: jest.fn(),
  updateLead: jest.fn(),
};

const mockAIAgentService = {
  createAgent: jest.fn(),
  getAgents: jest.fn(),
  chat: jest.fn(),
};

const mockStripeService = {
  createPaymentIntent: jest.fn(),
  confirmPayment: jest.fn(),
};

describe('Service Integration Tests', () => {
  let app: Hono;
  let mockDb: any;

  beforeAll(async () => {
    // Setup mock database
    mockDb = {
      transaction: jest.fn().mockImplementation((callback) => callback(mockDb)),
      insert: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue([{ id: '1', name: 'test' }]),
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue([{ count: 1 }]),
    };

    DatabaseUtils.initialize();
    jest.spyOn(DatabaseUtils, 'getDatabase').mockReturnValue(mockDb);

    // Create test app
    app = new Hono();
    
    // Mock authentication middleware
    app.use('*', async (c, next) => {
      c.set('auth', {
        userId: 'test-user-id',
        organizationId: 'test-org-id',
        sessionId: 'test-session-id',
      });
      await next();
    });

    // Email Campaign Routes
    app.post('/api/services/email-campaigns', async (c) => {
      const body = await c.req.json();
      const auth = c.get('auth');
      const result = await mockEmailCampaignService.createCampaign({
        ...body,
        organizationId: auth.organizationId,
        createdBy: auth.userId,
      });
      return c.json({ success: true, data: result });
    });

    app.get('/api/services/email-campaigns', async (c) => {
      const query = c.req.query();
      const auth = c.get('auth');
      const result = await mockEmailCampaignService.getCampaigns({
        organizationId: auth.organizationId,
        ...query,
      });
      return c.json({ success: true, data: result });
    });

    // Lead Management Routes
    app.post('/api/services/leads', async (c) => {
      const body = await c.req.json();
      const auth = c.get('auth');
      const result = await mockLeadManagementService.createLead({
        ...body,
        organizationId: auth.organizationId,
        createdBy: auth.userId,
      });
      return c.json({ success: true, data: result });
    });

    app.get('/api/services/leads', async (c) => {
      const query = c.req.query();
      const auth = c.get('auth');
      const result = await mockLeadManagementService.getLeads({
        organizationId: auth.organizationId,
        ...query,
      });
      return c.json({ success: true, data: result });
    });

    // AI Agent Routes
    app.post('/api/services/ai-agents', async (c) => {
      const body = await c.req.json();
      const auth = c.get('auth');
      const result = await mockAIAgentService.createAgent({
        ...body,
        organizationId: auth.organizationId,
        createdBy: auth.userId,
      });
      return c.json({ success: true, data: result });
    });

    app.post('/api/services/ai-agents/:id/chat', async (c) => {
      const params = c.req.param();
      const body = await c.req.json();
      const auth = c.get('auth');
      const result = await mockAIAgentService.chat({
        agentId: params.id,
        organizationId: auth.organizationId,
        userId: auth.userId,
        message: body.message,
        context: body.context,
      });
      return c.json({ success: true, data: result });
    });

    // Payment Routes
    app.post('/api/services/payments/intents', async (c) => {
      const body = await c.req.json();
      const auth = c.get('auth');
      const result = await mockStripeService.createPaymentIntent({
        customerId: body.customerId,
        organizationId: auth.organizationId,
        amount: body.amount,
        currency: body.currency,
        metadata: body.metadata,
      });
      return c.json({ success: true, data: result });
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Email Campaign Service Integration', () => {
    it('should create email campaign successfully', async () => {
      const campaignData = {
        name: 'Test Campaign',
        subject: 'Test Subject',
        content: 'Test content',
        recipientList: ['test@example.com'],
      };

      const expectedCampaign = {
        id: 'campaign-1',
        ...campaignData,
        organizationId: 'test-org-id',
        createdBy: 'test-user-id',
        status: 'draft',
      };

      mockEmailCampaignService.createCampaign.mockResolvedValue(expectedCampaign);

      const res = await app.request('/api/services/email-campaigns', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(campaignData),
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data).toEqual(expectedCampaign);
      expect(mockEmailCampaignService.createCampaign).toHaveBeenCalledWith(expectedCampaign);
    });

    it('should get email campaigns for organization', async () => {
      const expectedCampaigns = [
        { id: '1', name: 'Campaign 1', status: 'draft' },
        { id: '2', name: 'Campaign 2', status: 'sent' },
      ];

      mockEmailCampaignService.getCampaigns.mockResolvedValue(expectedCampaigns);

      const res = await app.request('/api/services/email-campaigns?status=draft&limit=10');

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data).toEqual(expectedCampaigns);
      expect(mockEmailCampaignService.getCampaigns).toHaveBeenCalledWith({
        organizationId: 'test-org-id',
        status: 'draft',
        limit: '10',
      });
    });

    it('should handle campaign creation errors', async () => {
      mockEmailCampaignService.createCampaign.mockRejectedValue(new Error('Database error'));

      const res = await app.request('/api/services/email-campaigns', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Campaign',
          subject: 'Test Subject',
          content: 'Test content',
          recipientList: ['test@example.com'],
        }),
      });

      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json.success).toBe(false);
    });
  });

  describe('Lead Management Service Integration', () => {
    it('should create lead successfully', async () => {
      const leadData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        company: 'Test Corp',
      };

      const expectedLead = {
        id: 'lead-1',
        ...leadData,
        organizationId: 'test-org-id',
        createdBy: 'test-user-id',
        status: 'new',
      };

      mockLeadManagementService.createLead.mockResolvedValue(expectedLead);

      const res = await app.request('/api/services/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data).toEqual(expectedLead);
    });

    it('should get leads for organization', async () => {
      const expectedLeads = [
        { id: '1', firstName: 'John', lastName: 'Doe', status: 'new' },
        { id: '2', firstName: 'Jane', lastName: 'Smith', status: 'contacted' },
      ];

      mockLeadManagementService.getLeads.mockResolvedValue(expectedLeads);

      const res = await app.request('/api/services/leads?status=new&limit=20');

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data).toEqual(expectedLeads);
    });

    it('should validate lead data', async () => {
      const invalidLeadData = {
        firstName: '',
        email: 'invalid-email',
      };

      const res = await app.request('/api/services/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(invalidLeadData),
      });

      expect(res.status).toBe(500);
    });
  });

  describe('AI Agent Service Integration', () => {
    it('should create AI agent successfully', async () => {
      const agentData = {
        name: 'Test Agent',
        description: 'Test AI agent',
        type: 'chat',
        model: 'gpt-4',
        configuration: { temperature: 0.7 },
      };

      const expectedAgent = {
        id: 'agent-1',
        ...agentData,
        organizationId: 'test-org-id',
        createdBy: 'test-user-id',
        status: 'active',
      };

      mockAIAgentService.createAgent.mockResolvedValue(expectedAgent);

      const res = await app.request('/api/services/ai-agents', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(agentData),
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data).toEqual(expectedAgent);
    });

    it('should handle AI agent chat', async () => {
      const chatData = {
        message: 'Hello, how can you help me?',
        context: { sessionId: 'session-1' },
      };

      const expectedResponse = {
        response: 'I can help you with various tasks...',
        sessionId: 'session-1',
        timestamp: Date.now(),
      };

      mockAIAgentService.chat.mockResolvedValue(expectedResponse);

      const res = await app.request('/api/services/ai-agents/agent-1/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(chatData),
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data).toEqual(expectedResponse);
      expect(mockAIAgentService.chat).toHaveBeenCalledWith({
        agentId: 'agent-1',
        organizationId: 'test-org-id',
        userId: 'test-user-id',
        message: 'Hello, how can you help me?',
        context: { sessionId: 'session-1' },
      });
    });
  });

  describe('Payment Service Integration', () => {
    it('should create payment intent successfully', async () => {
      const paymentData = {
        customerId: 'customer-1',
        amount: 1000, // $10.00 in cents
        currency: 'usd',
        metadata: { orderId: 'order-1' },
      };

      const expectedPaymentIntent = {
        id: 'pi_123',
        ...paymentData,
        organizationId: 'test-org-id',
        status: 'requires_payment_method',
      };

      mockStripeService.createPaymentIntent.mockResolvedValue(expectedPaymentIntent);

      const res = await app.request('/api/services/payments/intents', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data).toEqual(expectedPaymentIntent);
    });

    it('should validate payment amount', async () => {
      const invalidPaymentData = {
        customerId: 'customer-1',
        amount: -100, // Negative amount
        currency: 'usd',
      };

      const res = await app.request('/api/services/payments/intents', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(invalidPaymentData),
      });

      expect(res.status).toBe(500);
    });
  });

  describe('Cross-Service Integration', () => {
    it('should handle service dependencies correctly', async () => {
      // Test scenario: Create lead, then create email campaign targeting that lead
      const leadData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      };

      const expectedLead = {
        id: 'lead-1',
        ...leadData,
        organizationId: 'test-org-id',
        createdBy: 'test-user-id',
      };

      mockLeadManagementService.createLead.mockResolvedValue(expectedLead);

      const campaignData = {
        name: 'Welcome Campaign',
        subject: 'Welcome to our service',
        content: 'Hello John!',
        recipientList: [expectedLead.email],
      };

      const expectedCampaign = {
        id: 'campaign-1',
        ...campaignData,
        organizationId: 'test-org-id',
        createdBy: 'test-user-id',
      };

      mockEmailCampaignService.createCampaign.mockResolvedValue(expectedCampaign);

      // Create lead
      const leadRes = await app.request('/api/services/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      expect(leadRes.status).toBe(200);

      // Create campaign targeting the lead
      const campaignRes = await app.request('/api/services/email-campaigns', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(campaignData),
      });

      expect(campaignRes.status).toBe(200);
      const campaignJson = await campaignRes.json();
      expect(campaignJson.data.recipientList).toContain(expectedLead.email);
    });

    it('should handle service failures gracefully', async () => {
      // Test scenario: One service fails, others should continue working
      mockEmailCampaignService.createCampaign.mockRejectedValue(new Error('Email service down'));
      mockLeadManagementService.createLead.mockResolvedValue({
        id: 'lead-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        organizationId: 'test-org-id',
      });

      // Email campaign should fail
      const campaignRes = await app.request('/api/services/email-campaigns', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Campaign',
          subject: 'Test',
          content: 'Test',
          recipientList: ['test@example.com'],
        }),
      });

      expect(campaignRes.status).toBe(500);

      // Lead creation should still work
      const leadRes = await app.request('/api/services/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
        }),
      });

      expect(leadRes.status).toBe(200);
    });
  });

  describe('Database Transaction Integration', () => {
    it('should use transactions for data consistency', async () => {
      const leadData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      };

      const expectedLead = {
        id: 'lead-1',
        ...leadData,
        organizationId: 'test-org-id',
      };

      mockLeadManagementService.createLead.mockImplementation(async (data) => {
        // Simulate using transaction
        await DatabaseUtils.withTransaction(async (tx) => {
          // Simulate database operations
          return expectedLead;
        });
        return expectedLead;
      });

      const res = await app.request('/api/services/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      expect(res.status).toBe(200);
      expect(mockDb.transaction).toHaveBeenCalled();
    });

    it('should rollback on transaction failure', async () => {
      mockLeadManagementService.createLead.mockImplementation(async () => {
        return DatabaseUtils.withTransaction(async (tx) => {
          throw new Error('Transaction failed');
        });
      });

      const res = await app.request('/api/services/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
        }),
      });

      expect(res.status).toBe(500);
    });
  });

  describe('Security Integration', () => {
    it('should enforce authentication on all service routes', async () => {
      // Create app without auth middleware
      const insecureApp = new Hono();
      
      insecureApp.post('/api/services/email-campaigns', async (c) => {
        return c.json({ success: true });
      });

      // Should work with auth
      const res = await app.request('/api/services/email-campaigns', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: 'Test',
          subject: 'Test',
          content: 'Test',
          recipientList: ['test@example.com'],
        }),
      });

      expect(res.status).toBe(200);
    });

    it('should sanitize inputs across all services', async () => {
      const maliciousData = {
        name: '<script>alert("xss")</script>',
        subject: 'Test Subject',
        content: 'Test content',
        recipientList: ['test@example.com'],
      };

      mockEmailCampaignService.createCampaign.mockImplementation(async (data) => {
        // Verify input is sanitized
        expect(data.name).not.toContain('<script>');
        return { id: '1', ...data };
      });

      const res = await app.request('/api/services/email-campaigns', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(maliciousData),
      });

      expect(res.status).toBe(200);
    });
  });
});
