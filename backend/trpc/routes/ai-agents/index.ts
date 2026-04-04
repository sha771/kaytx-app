import { z } from "zod";
import { protectedProcedure } from '../../../create-context';
import { aiAgentService, AgentType } from '../../../services/ai-agent-service';

const startConversationSchema = z.object({
  agentId: z.string(),
  initialMessage: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const startConversationProcedure = protectedProcedure
  .input(startConversationSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof startConversationSchema>; ctx: any }) => {
    try {
      const userId = ctx.session?.userId;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const conversation = await aiAgentService.startConversation(
        input.agentId,
        input.initialMessage,
        { userId, ...input.metadata }
      );

      if (!conversation) {
        throw new Error('Failed to start conversation');
      }

      return {
        success: true,
        sessionId: conversation.sessionId,
        agentId: conversation.agentId,
        createdAt: conversation.createdAt,
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

export const sendMessageProcedure = protectedProcedure
  .input(sendMessageSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof sendMessageSchema>; ctx: any }) => {
    try {
      const userId = ctx.session?.userId;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await aiAgentService.sendMessage(input.sessionId, input.message);

      if (!response) {
        throw new Error('Failed to send message');
      }

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

const executeToolSchema = z.object({
  agentId: z.string(),
  toolName: z.string(),
  parameters: z.record(z.any()),
});

export const executeToolProcedure = protectedProcedure
  .input(executeToolSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof executeToolSchema>; ctx: any }) => {
    try {
      const userId = ctx.session?.userId;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const result = await aiAgentService.executeTool(
        input.agentId,
        input.toolName,
        input.parameters
      );

      return {
        success: result.success,
        data: result.data,
        error: result.error,
      };
    } catch (error: any) {
      console.error('Failed to execute tool:', error);
      throw new Error(error.message || 'Failed to execute tool');
    }
  });

const getAgentSchema = z.object({
  agentId: z.string(),
});

export const getAgentProcedure = protectedProcedure
  .input(getAgentSchema)
  .query(({ input }) => {
    try {
      const agent = aiAgentService.getAgent(input.agentId);

      if (!agent) {
        throw new Error('Agent not found');
      }

      return {
        id: agent.id,
        name: agent.name,
        type: agent.type,
        capabilities: agent.capabilities,
        voiceProfile: agent.voiceProfile,
      };
    } catch (error: any) {
      console.error('Failed to get agent:', error);
      throw new Error(error.message || 'Failed to get agent');
    }
  });

const listAgentsSchema = z.object({
  type: z.enum(['voice-assistant', 'receptionist', 'negotiator', 'workflow-automator', 'data-analyst']).optional() as any,
});

export const listAgentsProcedure = protectedProcedure
  .input(listAgentsSchema)
  .query(({ input }) => {
    try {
      let agents;

      if (input.type) {
        agents = aiAgentService.getAgentsByType(input.type as AgentType);
      } else {
        agents = aiAgentService.getAllAgents();
      }

      return {
        agents: agents.map(agent => ({
          id: agent.id,
          name: agent.name,
          type: agent.type,
          description: agent.systemPrompt.substring(0, 200),
          capabilities: agent.capabilities,
        })),
        count: agents.length,
      };
    } catch (error: any) {
      console.error('Failed to list agents:', error);
      throw new Error(error.message || 'Failed to list agents');
    }
  });

const endConversationSchema = z.object({
  sessionId: z.string(),
});

export const endConversationProcedure = protectedProcedure
  .input(endConversationSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof endConversationSchema>; ctx: any }) => {
    try {
      const userId = ctx.session?.userId;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const success = aiAgentService.endConversation(input.sessionId);

      if (!success) {
        throw new Error('Failed to end conversation');
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

const getConversationHistorySchema = z.object({
  sessionId: z.string(),
});

export const getConversationHistoryProcedure = protectedProcedure
  .input(getConversationHistorySchema)
  .query(({ input }) => {
    try {
      const messages = aiAgentService.getConversationHistory(input.sessionId);

      return {
        messages: messages.map(msg => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp,
        })),
        count: messages.length,
      };
    } catch (error: any) {
      console.error('Failed to get conversation history:', error);
      throw new Error(error.message || 'Failed to get conversation history');
    }
  });
