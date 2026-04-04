import { z } from "zod";
import { protectedProcedure } from '../../../create-context';
import { twilioCallingService } from '../../../services/twilio-calling-service';

const initiateCallSchema = z.object({
  phoneNumber: z.string(),
  customerName: z.string(),
  agentId: z.string().optional(),
  recordingEnabled: z.boolean().optional().default(true),
  transcriptionEnabled: z.boolean().optional().default(true),
  metadata: z.record(z.any()).optional(),
});

export const initiateCallProcedure = protectedProcedure
  .input(initiateCallSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof initiateCallSchema>; ctx: any }) => {
    try {
      const userId = ctx.session?.userId;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const call = await twilioCallingService.initiateCall(
        input.phoneNumber,
        input.customerName,
        {
          agentId: input.agentId,
          recordingEnabled: input.recordingEnabled,
          transcriptionEnabled: input.transcriptionEnabled,
          metadata: { userId, ...input.metadata },
        }
      );

      if (!call) {
        throw new Error('Failed to initiate call');
      }

      return {
        success: true,
        callId: call.id,
        status: call.status,
        phoneNumber: call.phoneNumber,
        startTime: call.startTime,
      };
    } catch (error: any) {
      console.error('Failed to initiate call:', error);
      throw new Error(error.message || 'Failed to initiate call');
    }
  });

const endCallSchema = z.object({
  callId: z.string(),
});

export const endCallProcedure = protectedProcedure
  .input(endCallSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof endCallSchema>; ctx: any }) => {
    try {
      const success = await twilioCallingService.endCall(input.callId);

      if (!success) {
        throw new Error('Failed to end call');
      }

      const call = twilioCallingService.getCallSession(input.callId);

      return {
        success: true,
        callId: input.callId,
        duration: call?.duration || 0,
        status: 'completed',
      };
    } catch (error: any) {
      console.error('Failed to end call:', error);
      throw new Error(error.message || 'Failed to end call');
    }
  });

const getCallStatusSchema = z.object({
  callId: z.string(),
});

export const getCallStatusProcedure = protectedProcedure
  .input(getCallStatusSchema)
  .query(({ input }) => {
    try {
      const call = twilioCallingService.getCallSession(input.callId);

      if (!call) {
        throw new Error('Call not found');
      }

      return {
        callId: call.id,
        status: call.status,
        phoneNumber: call.phoneNumber,
        customerName: call.customerName,
        duration: call.duration,
        startTime: call.startTime,
        recordingEnabled: call.recordingEnabled,
        transcriptionEnabled: call.transcriptionEnabled,
      };
    } catch (error: any) {
      console.error('Failed to get call status:', error);
      throw new Error(error.message || 'Failed to get call status');
    }
  });

const getCallMetricsSchema = z.object({
  timeframe: z.enum(['today', 'week', 'month']).optional(),
});

export const getCallMetricsProcedure = protectedProcedure
  .input(getCallMetricsSchema)
  .query(() => {
    try {
      const metrics = twilioCallingService.getMetrics();

      return {
        totalCalls: metrics.totalCalls,
        activeCalls: metrics.activeCalls,
        completedCalls: metrics.completedCalls,
        failedCalls: metrics.failedCalls,
        avgDuration: metrics.avgDuration,
        successRate: metrics.successRate,
        totalMinutes: Math.round(metrics.totalMinutes),
      };
    } catch (error: any) {
      console.error('Failed to get call metrics:', error);
      throw new Error(error.message || 'Failed to get call metrics');
    }
  });

const getCallHistorySchema = z.object({
  limit: z.number().optional().default(50),
});

export const getCallHistoryProcedure = protectedProcedure
  .input(getCallHistorySchema)
  .query(({ input }) => {
    try {
      const history = twilioCallingService.getCallHistory(input.limit);

      return {
        calls: history.map(call => ({
          callId: call.id,
          phoneNumber: call.phoneNumber,
          customerName: call.customerName,
          status: call.status,
          duration: call.duration,
          startTime: call.startTime,
          endTime: call.endTime,
          direction: call.direction,
          channel: call.channel,
        })),
        count: history.length,
      };
    } catch (error: any) {
      console.error('Failed to get call history:', error);
      throw new Error(error.message || 'Failed to get call history');
    }
  });
