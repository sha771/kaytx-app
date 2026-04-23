import { describe, it, expect } from '@jest/globals';
import { Hono } from 'hono';
import servicesRoutes from '@/backend/api/routes/services';

jest.mock('@/backend/middleware/rbac-middleware', () => {
  return {
    requireAuth: () => async (c: any, next: any) => {
      c.set('auth', {
        userId: 'test-user-id',
        organizationId: 'test-org-id',
        role: 'USER',
        email: 'test@example.com',
      });
      await next();
    },
  };
});

describe('Employee ↔ Agent Counseling API (services routes)', () => {
  it('employee can initiate counseling with an agent and agent can respond', async () => {
    const app = new Hono();
    app.route('/api/services', servicesRoutes);

    const initRes = await app.request('/api/services/agent-counseling/employee-to-agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-token',
      },
      body: JSON.stringify({
        agentId: 'customer-experience-main',
        topic: 'Need coaching',
        question: 'How can I improve my customer handling workflow?',
        options: {
          priority: 'high',
          type: 'advisory',
          confidentiality: 'team',
        },
      }),
    });

    expect(initRes.status).toBe(200);
    const initJson = await initRes.json();
    expect(initJson).toHaveProperty('success', true);
    expect(initJson.data).toHaveProperty('id');
    expect(initJson.data).toHaveProperty('status', 'pending');

    const sessionId = initJson.data.id as string;

    const respondRes = await app.request(`/api/services/agent-counseling/sessions/${sessionId}/respond`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-token',
      },
      body: JSON.stringify({
        respondingAgentId: 'customer-experience-main',
        response: {
          status: 'completed',
          answer: 'Use a simple triage checklist and standard response templates.',
          recommendations: ['Create triage checklist', 'Use templates'],
          confidence: 0.8,
          reasoning: 'Standardization improves speed and reduces errors.',
          caveats: [],
          requiresFollowUp: false,
          suggestedNextSteps: ['Draft checklist', 'Pilot templates for 1 week'],
        },
      }),
    });

    expect(respondRes.status).toBe(200);
    const respondJson = await respondRes.json();
    expect(respondJson).toHaveProperty('success', true);
    expect(respondJson.data).toHaveProperty('id', sessionId);
    expect(respondJson.data).toHaveProperty('status', 'completed');
  });
});
