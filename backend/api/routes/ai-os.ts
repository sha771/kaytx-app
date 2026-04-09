/**
 * AI Operating System API Routes
 * Enterprise-grade endpoints for managing AI agents with full OS capabilities
 */

import { Hono } from 'hono';
import { z } from 'zod';
import { requireAuth, requirePermission, requireMinRole } from '../../middleware/rbac-middleware';
import { validateBody, validateParams, validateQuery } from '../../middleware/validate';
import { Permission, Role } from '../../lib/rbac';
import { createLogger } from '../../lib/production-logger';
import { aiAgentServiceEnterprise } from '../../services/ai-agent-service-enterprise';
import { aiosInfrastructureService } from '../../services/ai-os-infrastructure';
import { ServiceContext } from '../../services/base-service';

const logger = createLogger('AIOSRoutes');
const app = new Hono();

// ============================================
// Validation Schemas
// ============================================

const deployAgentSchema = z.object({
  agentId: z.string().min(1),
  resources: z.object({
    cpu: z.number().min(0.1).max(32).optional(),
    memory: z.number().min(0.5).max(128).optional(),
    gpu: z.number().min(0).max(8).optional()
  }).optional(),
  securityLevel: z.enum(['low', 'medium', 'high', 'maximum']).optional(),
  strategy: z.enum(['blue-green', 'rolling', 'canary', 'recreate']).optional(),
  replicate: z.boolean().optional(),
  replicaCount: z.number().min(1).max(20).optional(),
  preferredRegion: z.string().optional()
});

const scaleAgentSchema = z.object({
  targetReplicaCount: z.number().min(1).max(20)
});

const upgradeAgentSchema = z.object({
  newVersion: z.string().min(1),
  strategy: z.enum(['blue-green', 'rolling', 'canary', 'recreate']).optional()
});

const rollbackAgentSchema = z.object({
  reason: z.string().min(1)
});

const migrateAgentSchema = z.object({
  targetNodeId: z.string().min(1)
});

const resourceReportQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional()
});

// ============================================
// Agent Deployment Routes
// ============================================

/**
 * POST /api/ai-os/agents/:agentId/deploy
 * Deploy an agent with full AI OS infrastructure
 */
app.post(
  '/agents/:agentId/deploy',
  requireAuth,
  requirePermission(Permission.AI_AGENT_CREATE),
  validateParams(z.object({ agentId: z.string().min(1) })),
  validateBody(deployAgentSchema),
  async (c) => {
    const { agentId } = c.req.param();
    const body = c.get('validatedBody') as z.infer<typeof deployAgentSchema>;
    const authContext = c.get('authContext');

    logger.info(`Deploying agent ${agentId} for org ${authContext.organizationId}`);

    const result = await aiAgentServiceEnterprise.deployAgent(
      agentId,
      authContext.organizationId,
      authContext.userId,
      {
        resources: body.resources,
        securityLevel: body.securityLevel,
        strategy: body.strategy,
        replicate: body.replicate,
        replicaCount: body.replicaCount,
        preferredRegion: body.preferredRegion
      }
    );

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400);
    }

    return c.json({ success: true, data: result.data });
  }
);

/**
 * POST /api/ai-os/agents/:agentId/undeploy
 * Stop/undeploy an agent
 */
app.post(
  '/agents/:agentId/undeploy',
  requireAuth,
  requirePermission(Permission.AI_AGENT_DELETE),
  validateParams(z.object({ agentId: z.string().min(1) })),
  async (c) => {
    const { agentId } = c.req.param();
    const authContext = c.get('authContext');
    const { force } = await c.req.json<{ force?: boolean }>().catch(() => ({ force: false }));

    logger.info(`Undeploying agent ${agentId}`);

    const result = await aiAgentServiceEnterprise.undeployAgent(
      agentId,
      authContext.organizationId,
      authContext.userId,
      force
    );

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400);
    }

    return c.json({ success: true });
  }
);

/**
 * GET /api/ai-os/agents/:agentId/status
 * Get deployment status for an agent
 */
app.get(
  '/agents/:agentId/status',
  requireAuth,
  requirePermission(Permission.AI_AGENT_READ),
  validateParams(z.object({ agentId: z.string().min(1) })),
  async (c) => {
    const { agentId } = c.req.param();
    const authContext = c.get('authContext');

    const result = await aiAgentServiceEnterprise.getDeploymentStatus(
      agentId,
      authContext.organizationId
    );

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 404);
    }

    return c.json({ success: true, data: result.data });
  }
);

// ============================================
// Scaling & Migration Routes
// ============================================

/**
 * POST /api/ai-os/agents/:agentId/scale
 * Scale an agent deployment
 */
app.post(
  '/agents/:agentId/scale',
  requireAuth,
  requirePermission(Permission.AI_AGENT_UPDATE),
  validateParams(z.object({ agentId: z.string().min(1) })),
  validateBody(scaleAgentSchema),
  async (c) => {
    const { agentId } = c.req.param();
    const body = c.get('validatedBody') as z.infer<typeof scaleAgentSchema>;
    const authContext = c.get('authContext');

    logger.info(`Scaling agent ${agentId} to ${body.targetReplicaCount} replicas`);

    const result = await aiAgentServiceEnterprise.scaleAgent(
      agentId,
      authContext.organizationId,
      authContext.userId,
      body.targetReplicaCount
    );

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400);
    }

    return c.json({ success: true, data: result.data });
  }
);

/**
 * POST /api/ai-os/agents/:agentId/migrate
 * Migrate agent to a different node
 */
app.post(
  '/agents/:agentId/migrate',
  requireAuth,
  requirePermission(Permission.AI_AGENT_UPDATE),
  validateParams(z.object({ agentId: z.string().min(1) })),
  validateBody(migrateAgentSchema),
  async (c) => {
    const { agentId } = c.req.param();
    const body = c.get('validatedBody') as z.infer<typeof migrateAgentSchema>;
    const authContext = c.get('authContext');

    // Find deployment ID
    const agent = await aiAgentServiceEnterprise.findById(agentId);
    if (!agent.success || !agent.data?.deploymentId) {
      return c.json({ success: false, error: 'Agent not deployed' }, 400);
    }

    const result = await aiosInfrastructureService.migrateAgent(
      agent.data.deploymentId,
      body.targetNodeId,
      authContext.userId
    );

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400);
    }

    return c.json({ success: true, data: result.data });
  }
);

// ============================================
// Version Management Routes
// ============================================

/**
 * POST /api/ai-os/agents/:agentId/upgrade
 * Upgrade agent to new version
 */
app.post(
  '/agents/:agentId/upgrade',
  requireAuth,
  requirePermission(Permission.AI_AGENT_UPDATE),
  validateParams(z.object({ agentId: z.string().min(1) })),
  validateBody(upgradeAgentSchema),
  async (c) => {
    const { agentId } = c.req.param();
    const body = c.get('validatedBody') as z.infer<typeof upgradeAgentSchema>;
    const authContext = c.get('authContext');

    logger.info(`Upgrading agent ${agentId} to version ${body.newVersion}`);

    const result = await aiAgentServiceEnterprise.upgradeAgent(
      agentId,
      authContext.organizationId,
      authContext.userId,
      body.newVersion,
      body.strategy
    );

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400);
    }

    return c.json({ success: true, data: result.data });
  }
);

/**
 * POST /api/ai-os/agents/:agentId/rollback
 * Rollback agent to previous version
 */
app.post(
  '/agents/:agentId/rollback',
  requireAuth,
  requirePermission(Permission.AI_AGENT_UPDATE),
  validateParams(z.object({ agentId: z.string().min(1) })),
  validateBody(rollbackAgentSchema),
  async (c) => {
    const { agentId } = c.req.param();
    const body = c.get('validatedBody') as z.infer<typeof rollbackAgentSchema>;
    const authContext = c.get('authContext');

    logger.info(`Rolling back agent ${agentId}: ${body.reason}`);

    const result = await aiAgentServiceEnterprise.rollbackAgent(
      agentId,
      authContext.organizationId,
      authContext.userId,
      body.reason
    );

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400);
    }

    return c.json({ success: true, data: result.data });
  }
);

// ============================================
// Infrastructure Health & Monitoring Routes
// ============================================

/**
 * GET /api/ai-os/health
 * Get AI OS infrastructure health
 */
app.get(
  '/health',
  requireAuth,
  requirePermission(Permission.SYSTEM_READ),
  async (c) => {
    const result = aiAgentServiceEnterprise.getInfrastructureHealth();
    return c.json(result);
  }
);

/**
 * GET /api/ai-os/nodes
 * List all distributed mesh nodes
 */
app.get(
  '/nodes',
  requireAuth,
  requirePermission(Permission.SYSTEM_READ),
  async (c) => {
    const nodes = aiosInfrastructureService['mesh'].getAllNodes();
    return c.json({ success: true, data: nodes });
  }
);

/**
 * GET /api/ai-os/resources/report
 * Get resource usage report for organization
 */
app.get(
  '/resources/report',
  requireAuth,
  requirePermission(Permission.ORGANIZATION_READ),
  validateQuery(resourceReportQuerySchema),
  async (c) => {
    const query = c.get('validatedQuery') as z.infer<typeof resourceReportQuerySchema>;
    const authContext = c.get('authContext');

    const endDate = query.endDate ? new Date(query.endDate) : new Date();
    const startDate = query.startDate ? new Date(query.startDate) : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    const result = aiAgentServiceEnterprise.getResourceReport(
      authContext.organizationId,
      { start: startDate, end: endDate }
    );

    return c.json(result);
  }
);

// ============================================
// Quota Management Routes
// ============================================

/**
 * GET /api/ai-os/quota-plans
 * List available quota plans
 */
app.get(
  '/quota-plans',
  requireAuth,
  requirePermission(Permission.ORGANIZATION_READ),
  async (c) => {
    const plans = aiosInfrastructureService.getQuotaPlans();
    return c.json({ success: true, data: plans });
  }
);

/**
 * POST /api/ai-os/quota-plans/:planId/assign
 * Assign quota plan to organization
 */
app.post(
  '/quota-plans/:planId/assign',
  requireAuth,
  requireMinRole(Role.ADMIN),
  validateParams(z.object({ planId: z.string().min(1) })),
  async (c) => {
    const { planId } = c.req.param();
    const authContext = c.get('authContext');

    const result = await aiosInfrastructureService.assignQuotaPlan(
      authContext.organizationId,
      planId,
      authContext.userId
    );

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400);
    }

    return c.json({ success: true, data: result.data });
  }
);

// ============================================
// Plugin Management Routes
// ============================================

/**
 * GET /api/ai-os/plugins
 * List installed plugins
 */
app.get(
  '/plugins',
  requireAuth,
  requirePermission(Permission.AI_AGENT_READ),
  async (c) => {
    const authContext = c.get('authContext');
    const plugins = aiosInfrastructureService['pluginSystem'].getOrganizationPlugins(authContext.organizationId);
    return c.json({ success: true, data: plugins });
  }
);

/**
 * POST /api/ai-os/plugins/:pluginId/install
 * Install a plugin from marketplace
 */
app.post(
  '/plugins/:pluginId/install',
  requireAuth,
  requirePermission(Permission.AI_AGENT_CREATE),
  validateParams(z.object({ pluginId: z.string().min(1) })),
  async (c) => {
    const { pluginId } = c.req.param();
    const authContext = c.get('authContext');

    const result = await aiosInfrastructureService.installPlugin(
      pluginId,
      authContext.organizationId,
      authContext.userId
    );

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400);
    }

    return c.json({ success: true, data: { pluginId: result.data } });
  }
);

// ============================================
// Agent List Route
// ============================================

/**
 * GET /api/ai-os/agents
 * List all deployed agents for organization
 */
app.get(
  '/agents',
  requireAuth,
  requirePermission(Permission.AI_AGENT_READ),
  validateQuery(z.object({
    status: z.enum(['not_deployed', 'provisioning', 'deploying', 'running', 'failed', 'stopped']).optional(),
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional()
  })),
  async (c) => {
    const query = c.get('validatedQuery') as { status?: string; page?: number; limit?: number };
    const authContext = c.get('authContext');

    const agents = aiosInfrastructureService.getOrganizationAgents(authContext.organizationId);

    // Filter by status if provided
    let filtered = agents;
    if (query.status) {
      filtered = agents.filter(a => a.status === query.status);
    }

    // Pagination
    const page = query.page || 1;
    const limit = query.limit || 20;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return c.json({
      success: true,
      data: paginated,
      metadata: {
        total: filtered.length,
        page,
        limit,
        hasMore: start + limit < filtered.length
      }
    });
  }
);

export default app;
