import { describe, it, expect, beforeAll } from '@jest/globals';
import { appRouter } from '../../trpc/app-router';
import { createInnerTRPCContext } from '../../trpc/create-context';

describe('AI Agents tRPC Procedures Smoke Tests', () => {
  let ctx: any;
  let caller: any;

  beforeAll(() => {
    ctx = createInnerTRPCContext({
      user: { id: 'test-user', organizationId: 'test-org', role: 'admin' },
    });
    caller = appRouter.createCaller(ctx);
  });

  it('should fetch agent stats', async () => {
    const stats = await caller.aiAgents.getAgentAnalytics({ timeRange: '7d' });
    expect(stats).toBeDefined();
    expect(stats.totalTasks).toBeGreaterThanOrEqual(0);
    expect(stats.successRate).toBeDefined();
  });

  it('should fetch agent activity', async () => {
    const result = await caller.aiAgents.getAgentActivity({ limit: 5 });
    expect(result.activities).toBeDefined();
    expect(Array.isArray(result.activities)).toBe(true);
  });

  it('should fetch agent analytics', async () => {
    const analytics = await caller.aiAgents.getAgentAnalytics({
      timeRange: '7d'
    });
    expect(analytics).toBeDefined();
    expect(analytics.successRate).toBeDefined();
    expect(analytics.totalTasks).toBeGreaterThanOrEqual(0);
    expect(analytics.revenueImpact).toBeDefined();
  });

  it('should fetch specific agent activity', async () => {
    const result = await caller.aiAgents.getAgentActivity({
      limit: 10
    });
    expect(result.activities).toBeDefined();
    expect(result.count).toBeDefined();
  });

  it('should update agent status', async () => {
    const result = await caller.aiAgents.updateAgentStatus({
      agentId: '123e4567-e89b-12d3-a456-426614174000',
      status: 'paused',
    });
    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });
});
