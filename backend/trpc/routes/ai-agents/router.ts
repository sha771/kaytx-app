import { z } from "zod";
import { createTRPCRouter, permissionProcedure } from '../../create-context';
import { aiAgentService, AgentType } from '../../../services/ai-agent-service';
import { db as pgDb } from '../../../db/connection';
import { aiAgents, aiAgentEvents, organizations } from '../../../db/drizzle-schema';
import { eq, and, desc, gte, sql } from 'drizzle-orm';
import { Permission } from '../../../lib/rbac';

import { agentConsultingService } from '../../../services/agent-consulting-service';
import { getAgentById, getAgentHierarchy } from '../../../../constants/aiAgentHierarchy';

function getSinceDate(timeRange: '24h' | '7d' | '30d' | '90d'): Date {
  const now = Date.now();
  const deltaMs =
    timeRange === '24h'
      ? 24 * 60 * 60 * 1000
      : timeRange === '7d'
        ? 7 * 24 * 60 * 60 * 1000
        : timeRange === '30d'
          ? 30 * 24 * 60 * 60 * 1000
          : 90 * 24 * 60 * 60 * 1000;
  return new Date(now - deltaMs);
}

const startConversationSchema = z.object({
  agentId: z.string(),
  initialMessage: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

const startConversationProcedure = permissionProcedure(Permission.AI_AGENT_USE)
  .input(startConversationSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const userId = ctx.user?.id;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const organizationId = ctx.user?.organizationId;
      if (!organizationId) {
        throw new Error('User organization not found');
      }

      const conversation = await aiAgentService.startConversation(
        input.agentId,
        input.initialMessage || '',
        { userId, organizationId, ...input.metadata }
      );

      return {
        success: true,
        sessionId: conversation.sessionId,
        agentId: input.agentId,
        createdAt: new Date(),
      };
    } catch (error: any) {
      console.error('Failed to start conversation:', error);
      throw new Error(error.message || 'Failed to start conversation');
    }
  });

const sendMessageSchema = z.object({
  sessionId: z.string(),
  message: z.string(),
});

const sendMessageProcedure = permissionProcedure(Permission.AI_AGENT_USE)
  .input(sendMessageSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const response = await aiAgentService.sendMessage(input.sessionId, input.message, {
        organizationId: ctx.user.organizationId,
        userId: ctx.user.id,
      });

      return {
        success: true,
        message: response.message,
        action: response.action,
        actionParams: response.actionParams,
        confidence: response.confidence,
        nextSteps: response.nextSteps,
      };
    } catch (error: any) {
      console.error('Failed to send message:', error);
      throw new Error(error.message || 'Failed to send message');
    }
  });

const endConversationSchema = z.object({
  sessionId: z.string(),
});

const endConversationProcedure = permissionProcedure(Permission.AI_AGENT_USE)
  .input(endConversationSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const ok = await aiAgentService.endConversation(input.sessionId, {
        organizationId: ctx.user.organizationId,
        userId: ctx.user.id,
      });

      if (!ok) {
        throw new Error('Conversation not found or access denied');
      }

      return {
        success: true,
        sessionId: input.sessionId,
        endedAt: new Date(),
      };
    } catch (error: any) {
      console.error('Failed to end conversation:', error);
      throw new Error(error.message || 'Failed to end conversation');
    }
  });

const executeToolSchema = z.object({
  agentId: z.string(),
  toolName: z.string(),
  parameters: z.record(z.string(), z.any()),
});

const executeToolProcedure = permissionProcedure(Permission.AI_AGENT_MANAGE)
  .input(executeToolSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const result = await aiAgentService.executeTool(
        input.agentId,
        input.toolName,
        {
          ...input.parameters,
          userId: ctx.user?.id,
          organizationId: ctx.user?.organizationId,
        }
      );

      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      console.error('Failed to execute tool:', error);
      throw new Error(error.message || 'Failed to execute tool');
    }
  });

const getAgentProcedure = permissionProcedure(Permission.AI_AGENT_READ)
  .input(z.object({ agentId: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      const agent = await aiAgentService.getAgentResolved(input.agentId, {
        userId: ctx.user?.id,
        organizationId: ctx.user?.organizationId,
      });

      return agent;
    } catch (error: any) {
      console.error('Failed to get agent:', error);
      throw new Error(error.message || 'Failed to get agent');
    }
  });

const listAgentsProcedure = permissionProcedure(Permission.AI_AGENT_READ)
  .input(z.object({ type: z.nativeEnum(AgentType).optional() }))
  .query(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const whereParts = [eq(aiAgents.organizationId, ctx.user.organizationId)];
      if (input.type) {
        whereParts.push(eq(aiAgents.type, input.type));
      }

      const agents = await pgDb
        .select()
        .from(aiAgents)
        .where(and(...whereParts))
        .orderBy(desc(aiAgents.createdAt));

      return {
        agents,
        count: agents.length,
      };
    } catch (error: any) {
      console.error('Failed to list agents:', error);
      throw new Error(error.message || 'Failed to list agents');
    }
  });

const getConversationHistoryProcedure = permissionProcedure(Permission.AI_AGENT_READ)
  .input(z.object({ sessionId: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const history = await aiAgentService.getConversationHistoryDb(input.sessionId, {
        organizationId: ctx.user.organizationId || undefined,
      });

      return {
        messages: history.messages,
        count: history.messages.length,
        total: history.total,
      };
    } catch (error: any) {
      console.error('Failed to get conversation history:', error);
      throw new Error(error.message || 'Failed to get conversation history');
    }
  });

// Get all agents for user's organization (for history page)
export const getAllAgentsProcedure = permissionProcedure(Permission.AI_AGENT_READ)
  .query(async ({ ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const agents = await pgDb
        .select()
        .from(aiAgents)
        .where(eq(aiAgents.organizationId, ctx.user.organizationId))
        .orderBy(desc(aiAgents.createdAt));

      return {
        agents,
        count: agents.length,
      };
    } catch (error: any) {
      console.error('Failed to get all agents:', error);
      throw new Error(error.message || 'Failed to get all agents');
    }
  });

// Create a new AI agent
export const createAgentProcedure = permissionProcedure(Permission.AI_AGENT_MANAGE)
  .input(z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    type: z.string().min(1),
    model: z.string().optional(),
    systemPrompt: z.string().optional(),
    capabilities: z.array(z.string()).optional(),
    config: z.record(z.string(), z.any()).optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const [newAgent] = await pgDb
        .insert(aiAgents)
        .values({
          organizationId: ctx.user.organizationId,
          name: input.name,
          description: input.description || null,
          type: input.type,
          model: input.model || null,
          status: 'draft',
          systemPrompt: input.systemPrompt || null,
          capabilities: input.capabilities || [],
          config: input.config || {},
          successRate: 0,
          totalCalls: 0,
        })
        .returning();

      if (!newAgent) {
        throw new Error('Failed to create agent');
      }

      await pgDb.insert(aiAgentEvents).values({
        organizationId: ctx.user.organizationId,
        agentId: newAgent.id,
        agentType: newAgent.type,
        agentName: newAgent.name,
        eventType: 'agent.created',
        status: 'success',
        action: 'Agent created',
        details: {
          description: newAgent.description,
          model: newAgent.model,
        },
        metadata: {
          createdByUserId: ctx.user.id,
        },
      });

      return {
        success: true,
        agent: newAgent,
      };
    } catch (error: any) {
      console.error('Failed to create agent:', error);
      throw new Error(error.message || 'Failed to create agent');
    }
  });

// Update agent status (activate/deactivate)
export const updateAgentStatusProcedure = permissionProcedure(Permission.AI_AGENT_MANAGE)
  .input(z.object({
    agentId: z.string().uuid(),
    status: z.enum(['draft', 'active', 'paused', 'archived']),
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      // Verify that agent belongs to user's organization
      const [existingAgent] = await pgDb
        .select()
        .from(aiAgents)
        .where(
          and(
            eq(aiAgents.id, input.agentId),
            eq(aiAgents.organizationId, ctx.user.organizationId)
          )
        )
        .limit(1);

      if (!existingAgent) {
        throw new Error('Agent not found or access denied');
      }

      const [updatedAgent] = await pgDb
        .update(aiAgents)
        .set({
          status: input.status,
          updatedAt: new Date(),
        })
        .where(eq(aiAgents.id, input.agentId))
        .returning();

      if (!updatedAgent) {
        throw new Error('Failed to update agent status');
      }

      await pgDb.insert(aiAgentEvents).values({
        organizationId: ctx.user.organizationId,
        agentId: updatedAgent.id,
        agentType: updatedAgent.type,
        agentName: updatedAgent.name,
        eventType: 'agent.status_changed',
        status: 'success',
        action: `Status changed to ${input.status}`,
        details: {
          from: existingAgent.status,
          to: input.status,
        },
        metadata: {
          changedByUserId: ctx.user.id,
        },
      });

      return {
        success: true,
        agent: updatedAgent,
      };
    } catch (error: any) {
      console.error('Failed to update agent status:', error);
      throw new Error(error.message || 'Failed to update agent status');
    }
  });

// Get agent analytics and performance metrics
const getAgentAnalyticsProcedure = permissionProcedure(Permission.AI_AGENT_ANALYTICS_READ)
  .input(z.object({
    agentId: z.string().uuid().optional(),
    type: z.string().optional(),
    timeRange: z.enum(['24h', '7d', '30d', '90d']).default('7d'),
  }))
  .query(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const since = getSinceDate(input.timeRange);
      const whereParts = [
        eq(aiAgentEvents.organizationId, ctx.user.organizationId),
        gte(aiAgentEvents.createdAt, since),
      ];

      if (input.agentId) {
        whereParts.push(eq(aiAgentEvents.agentId, input.agentId));
      }

      if (input.type) {
        whereParts.push(eq(aiAgentEvents.agentType, input.type));
      }

      const events = await pgDb
        .select()
        .from(aiAgentEvents)
        .where(and(...whereParts))
        .orderBy(desc(aiAgentEvents.createdAt))
        .limit(5000);

      const totalTasks = events.length;
      const successCount = events.filter(e => (e.status || '').toLowerCase() === 'success').length;
      const errorCount = events.filter(e => (e.status || '').toLowerCase() === 'error').length;

      const responseMsValues = events
        .map((e: any) => (e.details && typeof (e.details as any).responseMs === 'number' ? (e.details as any).responseMs : null))
        .filter((v: any) => typeof v === 'number');

      const avgResponseMs = responseMsValues.length
        ? Math.round(responseMsValues.reduce((a: number, b: number) => a + b, 0) / responseMsValues.length)
        : 500;

      const now = Date.now();
      const activeConversations = events.filter(e => {
        const ts = e.createdAt ? new Date(e.createdAt).getTime() : 0;
        return (e.status || '').toLowerCase() === 'processing' && now - ts < 60 * 60 * 1000;
      }).length;

      const revenueImpactNum = events.reduce((sum, e: any) => {
        const value = e.details && typeof (e.details as any).revenueImpact === 'number' ? (e.details as any).revenueImpact : 0;
        return sum + value;
      }, 0);

      const tasksCompleted = successCount;
      const successRate = totalTasks > 0 ? (successCount / totalTasks) * 100 : 0;
      const errorRate = totalTasks > 0 ? (errorCount / totalTasks) * 100 : 0;
      const uptime = 99.9;

      const dailyMap = new Map<string, { date: string; tasks: number; success: number }>();
      for (const e of events) {
        const d = e.createdAt ? new Date(e.createdAt) : new Date();
        const key = d.toISOString().slice(0, 10);
        const row = dailyMap.get(key) || { date: key, tasks: 0, success: 0 };
        row.tasks += 1;
        if ((e.status || '').toLowerCase() === 'success') row.success += 1;
        dailyMap.set(key, row);
      }
      const dailyActivity = Array.from(dailyMap.values())
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-7);

      const actionCounts = new Map<string, { count: number; success: number }>();
      for (const e of events) {
        const key = e.action || e.eventType || 'Unknown';
        const row = actionCounts.get(key) || { count: 0, success: 0 };
        row.count += 1;
        if ((e.status || '').toLowerCase() === 'success') row.success += 1;
        actionCounts.set(key, row);
      }
      const topActions = Array.from(actionCounts.entries())
        .map(([action, v]) => ({ action, count: v.count, success: v.count > 0 ? Math.round((v.success / v.count) * 100) : 0 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      return {
        totalTasks,
        successRate,
        averageResponseTime: `${(avgResponseMs / 1000).toFixed(2)}s`,
        activeConversations,
        revenueImpact: `$${revenueImpactNum.toLocaleString()}`,
        tasksCompleted,
        errorRate: `${errorRate.toFixed(2)}%`,
        uptime,
        dailyActivity,
        topActions,
      };
    } catch (error: any) {
      console.error('Failed to get agent analytics:', error);
      throw new Error(error.message || 'Failed to get agent analytics');
    }
  });

// Get real-time activity for an agent
const getAgentActivityProcedure = permissionProcedure(Permission.AI_AGENT_ANALYTICS_READ)
  .input(z.object({
    agentId: z.string().uuid().optional(),
    type: z.string().optional(),
    limit: z.number().default(50),
  }))
  .query(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const whereParts = [eq(aiAgentEvents.organizationId, ctx.user.organizationId)];
      if (input.agentId) {
        whereParts.push(eq(aiAgentEvents.agentId, input.agentId));
      }

      if (input.type) {
        whereParts.push(eq(aiAgentEvents.agentType, input.type));
      }

      const events = await pgDb
        .select()
        .from(aiAgentEvents)
        .where(and(...whereParts))
        .orderBy(desc(aiAgentEvents.createdAt))
        .limit(input.limit);

      const activities = events.map((e: any) => ({
        id: e.id,
        timestamp: (e.createdAt ? new Date(e.createdAt) : new Date()).toISOString(),
        action: e.action,
        status: (e.status || 'success') as 'success' | 'processing' | 'pending' | 'warn' | 'error',
        details: e.details || null,
        agentId: e.agentId,
        agentType: e.agentType,
        agentName: e.agentName,
        eventType: e.eventType,
      }));

      return { activities, count: activities.length };
    } catch (error: any) {
      console.error('Failed to get agent activity:', error);
      throw new Error(error.message || 'Failed to get agent activity');
    }
  });

// AGENT COUNSELING PROCEDURES
// ============================================

// Get counseling sessions for an agent
const getCounselingSessionsProcedure = permissionProcedure(Permission.AI_AGENT_READ)
  .input(z.object({
    agentId: z.string(),
    scope: z.enum(['active', 'completed', 'all']).default('active'),
    limit: z.number().default(20),
    offset: z.number().default(0),
  }))
  .query(async ({ input }) => {
    try {
      const sessions = agentConsultingService.getSessionsForAgent(input.agentId, input.scope);
      const paginated = sessions.slice(input.offset, input.offset + input.limit);
      
      return {
        sessions: paginated,
        total: sessions.length,
        offset: input.offset,
        limit: input.limit,
      };
    } catch (error: any) {
      console.error('Failed to get counseling sessions:', error);
      throw new Error(error.message || 'Failed to get counseling sessions');
    }
  });

// Main agent to subagent counseling
const mainToSubCounselingProcedure = permissionProcedure(Permission.AI_AGENT_MANAGE)
  .input(z.object({
    mainAgentId: z.string(),
    subagentId: z.string(),
    counselingType: z.enum(['performance', 'development', 'coordination', 'crisis']),
    topic: z.string(),
    details: z.object({
      issue: z.string().optional(),
      goals: z.array(z.string()).optional(),
      expectations: z.array(z.string()).optional(),
      timeline: z.string().optional(),
      resources: z.array(z.string()).optional(),
    }),
    options: z.object({
      priority: z.enum(['low', 'medium', 'high', 'critical', 'emergency']).optional(),
      confidentiality: z.enum(['public', 'team', 'private', 'confidential']).optional(),
      sessionType: z.enum(['one_time', 'ongoing', 'crisis', 'development']).optional(),
      deadline: z.date().optional(),
    }).optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const session = await agentConsultingService.initiateMainToSubagentCounseling(
        input.mainAgentId,
        input.subagentId,
        input.counselingType,
        input.topic,
        input.details,
        input.options || {}
      );

      return {
        success: true,
        session: {
          id: session.id,
          status: session.status,
          createdAt: session.createdAt,
          initiator: session.initiator,
          participants: session.participants,
        },
      };
    } catch (error: any) {
      console.error('Failed to initiate main-to-sub counseling:', error);
      throw new Error(error.message || 'Failed to initiate counseling');
    }
  });

// Subagent to main agent counseling/escalation
const subToMainCounselingProcedure = permissionProcedure(Permission.AI_AGENT_USE)
  .input(z.object({
    subagentId: z.string(),
    mainAgentId: z.string(),
    requestType: z.enum(['guidance', 'support', 'escalation', 'resource_request']),
    topic: z.string(),
    details: z.object({
      challenge: z.string().optional(),
      whatAttempted: z.array(z.string()).optional(),
      specificNeeds: z.array(z.string()).optional(),
      urgency: z.enum(['low', 'medium', 'high', 'critical']).optional(),
    }),
    options: z.object({
      priority: z.enum(['low', 'medium', 'high', 'critical', 'emergency']).optional(),
      confidentiality: z.enum(['public', 'team', 'private', 'confidential']).optional(),
      deadline: z.date().optional(),
    }).optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const session = await agentConsultingService.initiateSubagentToMainCounseling(
        input.subagentId,
        input.mainAgentId,
        input.requestType,
        input.topic,
        input.details,
        input.options || {}
      );

      return {
        success: true,
        session: {
          id: session.id,
          status: session.status,
          createdAt: session.createdAt,
          initiator: session.initiator,
          participants: session.participants,
        },
      };
    } catch (error: any) {
      console.error('Failed to initiate sub-to-main counseling:', error);
      throw new Error(error.message || 'Failed to initiate counseling');
    }
  });

// Peer-to-peer agent counseling
const peerCounselingProcedure = permissionProcedure(Permission.AI_AGENT_USE)
  .input(z.object({
    agentId1: z.string(),
    agentId2: z.string(),
    counselingType: z.enum(['collaboration', 'peer_review', 'knowledge_sharing', 'problem_solving']),
    topic: z.string(),
    details: z.object({
      sharedChallenge: z.string().optional(),
      collaborationGoal: z.string().optional(),
      knowledgeArea: z.string().optional(),
      specificProblem: z.string().optional(),
    }),
    options: z.object({
      priority: z.enum(['low', 'medium', 'high', 'critical', 'emergency']).optional(),
      confidentiality: z.enum(['public', 'team', 'private', 'confidential']).optional(),
      deadline: z.date().optional(),
    }).optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const session = await agentConsultingService.initiatePeerToPeerCounseling(
        input.agentId1,
        input.agentId2,
        input.counselingType,
        input.topic,
        input.details,
        input.options || {}
      );

      return {
        success: true,
        session: {
          id: session.id,
          status: session.status,
          createdAt: session.createdAt,
          initiator: session.initiator,
          participants: session.participants,
        },
      };
    } catch (error: any) {
      console.error('Failed to initiate peer counseling:', error);
      throw new Error(error.message || 'Failed to initiate counseling');
    }
  });

// Employee to agent counseling
const employeeToAgentCounselingProcedure = permissionProcedure(Permission.AI_AGENT_USE)
  .input(z.object({
    agentId: z.string(),
    topic: z.string(),
    question: z.string(),
    options: z.object({
      priority: z.enum(['low', 'medium', 'high', 'critical', 'emergency']).optional(),
      type: z.string().optional(),
      confidentiality: z.enum(['public', 'team', 'private', 'confidential']).optional(),
    }).optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId || !ctx.user?.id) {
        throw new Error('User not authenticated');
      }

      const session = await agentConsultingService.initiateConsultation(
        ctx.user.id, // Employee/user as source
        input.agentId,
        input.topic,
        input.question,
        {
          type: (input.options?.type as any) || 'advisory',
          priority: (input.options?.priority as any) || 'medium',
          confidentiality: input.options?.confidentiality || 'team',
        }
      );

      return {
        success: true,
        session: {
          id: session.id,
          status: session.status,
          createdAt: session.createdAt,
          initiator: session.initiator,
          participants: session.participants,
        },
      };
    } catch (error: any) {
      console.error('Failed to initiate employee-to-agent counseling:', error);
      throw new Error(error.message || 'Failed to initiate counseling');
    }
  });

// Respond to counseling session
const respondToCounselingProcedure = permissionProcedure(Permission.AI_AGENT_USE)
  .input(z.object({
    sessionId: z.string(),
    respondingAgentId: z.string(),
    response: z.object({
      status: z.enum(['completed', 'in_progress', 'escalated']),
      answer: z.string(),
      recommendations: z.array(z.string()),
      confidence: z.number(),
      counselingGuidance: z.any().optional(),
    }),
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User organization not found');
      }

      const session = await agentConsultingService.respondToConsultation(
        input.sessionId,
        input.respondingAgentId,
        {
          status: input.response.status,
          answer: input.response.answer,
          recommendations: input.response.recommendations,
          confidence: input.response.confidence,
          reasoning: 'Response provided by agent',
          caveats: [],
          requiresFollowUp: false,
          suggestedNextSteps: input.response.recommendations,
          counselingGuidance: input.response.counselingGuidance,
        }
      );

      return {
        success: true,
        session: {
          id: session.id,
          status: session.status,
          updatedAt: session.updatedAt,
          responses: session.responses,
        },
      };
    } catch (error: any) {
      console.error('Failed to respond to counseling:', error);
      throw new Error(error.message || 'Failed to respond to counseling');
    }
  });

// Get agent hierarchy info
const getAgentHierarchyProcedure = permissionProcedure(Permission.AI_AGENT_READ)
  .input(z.object({
    agentId: z.string(),
  }))
  .query(async ({ input }) => {
    try {
      const agent = getAgentById(input.agentId);
      const hierarchy = getAgentHierarchy(input.agentId);
      
      return {
        agent: agent || null,
        hierarchy: {
          mainAgent: hierarchy.mainAgent,
          subAgents: hierarchy.subAgents,
          peers: hierarchy.peers || [],
        },
      };
    } catch (error: any) {
      console.error('Failed to get agent hierarchy:', error);
      throw new Error(error.message || 'Failed to get agent hierarchy');
    }
  });

// Get recruiting data for agents
const getRecruitingDataProcedure = permissionProcedure(Permission.AI_AGENT_READ)
  .input(z.object({
    agentId: z.string().uuid().optional(),
    timeRange: z.enum(['24h', '7d', '30d', '90d']).default('30d'),
  }))
  .query(async ({ input, ctx }) => {
    try {
      if (!ctx.user?.organizationId) {
        throw new Error('User not authenticated');
      }

      const sinceDate = getSinceDate(input.timeRange);
      
      // Get recruiting-related metrics
      const agents = await pgDb
        .select({
          id: aiAgents.id,
          name: aiAgents.name,
          type: aiAgents.type,
          status: aiAgents.status,
          createdAt: aiAgents.createdAt,
          totalConversations: sql<number>`
            SELECT COUNT(*) 
            FROM ${aiAgentEvents} 
            WHERE ${aiAgentEvents.agentId} = ${aiAgents.id} 
            AND ${aiAgentEvents.eventType} = 'conversation_started'
            AND ${aiAgentEvents.timestamp} >= ${sinceDate}
          `.mapWith(Number),
          successfulRecruitments: sql<number>`
            SELECT COUNT(*) 
            FROM ${aiAgentEvents} 
            WHERE ${aiAgentEvents.agentId} = ${aiAgents.id} 
            AND ${aiAgentEvents.eventType} = 'recruitment_successful'
            AND ${aiAgentEvents.timestamp} >= ${sinceDate}
          `.mapWith(Number),
        })
        .from(aiAgents)
        .where(
          and(
            eq(aiAgents.organizationId, ctx.user.organizationId),
            input.agentId ? eq(aiAgents.id, input.agentId) : undefined
          )
        );

      return {
        success: true,
        data: {
          agents,
          timeRange: input.timeRange,
          totalAgents: agents.length,
          totalConversations: agents.reduce((sum, agent) => sum + agent.totalConversations, 0),
          totalRecruitments: agents.reduce((sum, agent) => sum + agent.successfulRecruitments, 0),
        },
      };
    } catch (error: any) {
      console.error('Failed to get recruiting data:', error);
      throw new Error(error.message || 'Failed to get recruiting data');
    }
  });

export const aiAgentsRouter = createTRPCRouter({
  startConversation: startConversationProcedure,
  sendMessage: sendMessageProcedure,
  endConversation: endConversationProcedure,
  executeTool: executeToolProcedure,
  getAgent: getAgentProcedure,
  listAgents: listAgentsProcedure,
  getConversationHistory: getConversationHistoryProcedure,
  getAllAgents: getAllAgentsProcedure,
  createAgent: createAgentProcedure,
  updateAgentStatus: updateAgentStatusProcedure,
  getAgentAnalytics: getAgentAnalyticsProcedure,
  getAgentActivity: getAgentActivityProcedure,
  getRecruitingData: getRecruitingDataProcedure,
  getStats: getAgentAnalyticsProcedure, // Alias for getAgentAnalytics
  toggleAgent: updateAgentStatusProcedure, // Alias for updateAgentStatus
  // Agent Counseling
  getCounselingSessions: getCounselingSessionsProcedure,
  mainToSubCounseling: mainToSubCounselingProcedure,
  subToMainCounseling: subToMainCounselingProcedure,
  peerCounseling: peerCounselingProcedure,
  employeeToAgentCounseling: employeeToAgentCounselingProcedure,
  respondToCounseling: respondToCounselingProcedure,
  getAgentHierarchy: getAgentHierarchyProcedure,
});
