/**
 * AI Operating System tRPC Router
 * Type-safe procedures for managing AI agents with full OS capabilities
 */

import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, protectedProcedure, adminProcedure } from '../../trpc';
import { aiosInfrastructureService } from '../../../services/ai-os-infrastructure';
import { aiAgentServiceEnterprise } from '../../../services/ai-agent-service-enterprise';
import {
  DeploymentStrategy,
  SecurityLevel,
  SandboxType
} from '../../../services/ai-os-index';

const deployAgentInput = z.object({
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

const scaleAgentInput = z.object({
  agentId: z.string().min(1),
  targetReplicaCount: z.number().min(1).max(20)
});

const migrateAgentInput = z.object({
  agentId: z.string().min(1),
  targetNodeId: z.string().min(1)
});

const upgradeAgentInput = z.object({
  agentId: z.string().min(1),
  newVersion: z.string().min(1),
  strategy: z.enum(['blue-green', 'rolling', 'canary', 'recreate']).optional()
});

const rollbackAgentInput = z.object({
  agentId: z.string().min(1),
  reason: z.string().min(1)
});

const resourceReportInput = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional()
});

export const aiOSRouter = router({
  // ============================================
  // Agent Deployment Procedures
  // ============================================

  /**
   * Deploy an agent with full AI OS infrastructure
   */
  deployAgent: protectedProcedure
    .input(deployAgentInput)
    .mutation(async ({ ctx, input }) => {
      const result = await aiAgentServiceEnterprise.deployAgent(
        input.agentId,
        ctx.organizationId,
        ctx.userId,
        {
          resources: input.resources,
          securityLevel: input.securityLevel,
          strategy: input.strategy,
          replicate: input.replicate,
          replicaCount: input.replicaCount,
          preferredRegion: input.preferredRegion
        }
      );

      if (!result.success) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: result.error || 'Deployment failed'
        });
      }

      return result.data;
    }),

  /**
   * Undeploy/stop an agent
   */
  undeployAgent: protectedProcedure
    .input(z.object({ agentId: z.string().min(1), force: z.boolean().optional() }))
    .mutation(async ({ ctx, input }) => {
      const result = await aiAgentServiceEnterprise.undeployAgent(
        input.agentId,
        ctx.organizationId,
        ctx.userId,
        input.force || false
      );

      if (!result.success) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: result.error || 'Undeploy failed'
        });
      }

      return { success: true };
    }),

  /**
   * Get deployment status
   */
  getDeploymentStatus: protectedProcedure
    .input(z.object({ agentId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const result = await aiAgentServiceEnterprise.getDeploymentStatus(
        input.agentId,
        ctx.organizationId
      );

      if (!result.success) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: result.error || 'Agent not found'
        });
      }

      return result.data;
    }),

  // ============================================
  // Scaling & Migration Procedures
  // ============================================

  /**
   * Scale an agent deployment
   */
  scaleAgent: protectedProcedure
    .input(scaleAgentInput)
    .mutation(async ({ ctx, input }) => {
      const result = await aiAgentServiceEnterprise.scaleAgent(
        input.agentId,
        ctx.organizationId,
        ctx.userId,
        input.targetReplicaCount
      );

      if (!result.success) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: result.error || 'Scaling failed'
        });
      }

      return result.data;
    }),

  /**
   * Migrate agent to different node
   */
  migrateAgent: protectedProcedure
    .input(migrateAgentInput)
    .mutation(async ({ ctx, input }) => {
      const agent = await aiAgentServiceEnterprise.findById(input.agentId);
      if (!agent.success || !agent.data?.deploymentId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Agent not deployed'
        });
      }

      const result = await aiosInfrastructureService.migrateAgent(
        agent.data.deploymentId,
        input.targetNodeId,
        ctx.userId
      );

      if (!result.success) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: result.error || 'Migration failed'
        });
      }

      return result.data;
    }),

  /**
   * Upgrade agent to new version
   */
  upgradeAgent: protectedProcedure
    .input(upgradeAgentInput)
    .mutation(async ({ ctx, input }) => {
      const result = await aiAgentServiceEnterprise.upgradeAgent(
        input.agentId,
        ctx.organizationId,
        ctx.userId,
        input.newVersion,
        input.strategy
      );

      if (!result.success) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: result.error || 'Upgrade failed'
        });
      }

      return result.data;
    }),

  /**
   * Rollback agent to previous version
   */
  rollbackAgent: protectedProcedure
    .input(rollbackAgentInput)
    .mutation(async ({ ctx, input }) => {
      const result = await aiAgentServiceEnterprise.rollbackAgent(
        input.agentId,
        ctx.organizationId,
        ctx.userId,
        input.reason
      );

      if (!result.success) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: result.error || 'Rollback failed'
        });
      }

      return result.data;
    }),

  // ============================================
  // Infrastructure Monitoring Procedures
  // ============================================

  /**
   * Get infrastructure health status
   */
  getInfrastructureHealth: protectedProcedure
    .query(() => {
      const result = aiAgentServiceEnterprise.getInfrastructureHealth();
      return result.data;
    }),

  /**
   * Get distributed mesh nodes
   */
  getNodes: protectedProcedure
    .query(() => {
      return aiosInfrastructureService['mesh'].getAllNodes();
    }),

  /**
   * Get resource usage report
   */
  getResourceReport: protectedProcedure
    .input(resourceReportInput)
    .query(({ ctx, input }) => {
      const endDate = input.endDate || new Date();
      const startDate = input.startDate || new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

      const result = aiAgentServiceEnterprise.getResourceReport(
        ctx.organizationId,
        { start: startDate, end: endDate }
      );

      return result.data;
    }),

  // ============================================
  // Quota Management Procedures
  // ============================================

  /**
   * Get available quota plans
   */
  getQuotaPlans: protectedProcedure
    .query(() => {
      return aiosInfrastructureService.getQuotaPlans();
    }),

  /**
   * Assign quota plan to organization (admin only)
   */
  assignQuotaPlan: adminProcedure
    .input(z.object({ planId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const result = await aiosInfrastructureService.assignQuotaPlan(
        ctx.organizationId,
        input.planId,
        ctx.userId
      );

      if (!result.success) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: result.error || 'Failed to assign quota plan'
        });
      }

      return result.data;
    }),

  // ============================================
  // Plugin Management Procedures
  // ============================================

  /**
   * Get installed plugins
   */
  getInstalledPlugins: protectedProcedure
    .query(({ ctx }) => {
      return aiosInfrastructureService['pluginSystem'].getOrganizationPlugins(ctx.organizationId);
    }),

  /**
   * Install plugin from marketplace
   */
  installPlugin: protectedProcedure
    .input(z.object({ listingId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const result = await aiosInfrastructureService.installPlugin(
        input.listingId,
        ctx.organizationId,
        ctx.userId
      );

      if (!result.success) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: result.error || 'Failed to install plugin'
        });
      }

      return { pluginId: result.data };
    }),

  // ============================================
  // Agent Listing
  // ============================================

  /**
   * List deployed agents for organization
   */
  getDeployedAgents: protectedProcedure
    .input(z.object({
      status: z.enum(['not_deployed', 'provisioning', 'deploying', 'running', 'failed', 'stopped']).optional()
    }).optional())
    .query(({ ctx, input }) => {
      const agents = aiosInfrastructureService.getOrganizationAgents(ctx.organizationId);

      if (input?.status) {
        return agents.filter(a => a.status === input.status);
      }

      return agents;
    })
});

export type AIOSRouter = typeof aiOSRouter;
