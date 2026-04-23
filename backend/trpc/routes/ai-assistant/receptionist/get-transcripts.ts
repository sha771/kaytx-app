import { permissionProcedure } from '../../../create-context';
import { Permission } from '../../../../lib/rbac';
import { db as pgDb } from '../../../../db/connection';
import { callLogs } from '../../../../db/drizzle-schema';
import { eq, and, desc } from 'drizzle-orm';
import { z } from 'zod';

export const getTranscriptsProcedure = permissionProcedure(Permission.AI_RECEPTIONIST_USE)
  .input(z.object({
    limit: z.number().default(50),
    offset: z.number().default(0),
  }).optional())
  .query(async ({ ctx, input }) => {
    const organizationId = ctx.user.organizationId;
    if (!organizationId) throw new Error('Organization ID required');

    const limit = input?.limit ?? 50;
    const offset = input?.offset ?? 0;

    const results = await pgDb
      .select()
      .from(callLogs)
      .where(eq(callLogs.organizationId, organizationId as any))
      .orderBy(desc(callLogs.startedAt))
      .limit(limit)
      .offset(offset);

    return results.map(log => ({
      id: log.id,
      customerName: (log.metadata as any)?.customerName || 'Unknown',
      phoneNumber: log.phoneNumber,
      channel: (log.metadata as any)?.channel || 'PSTN',
      timestamp: log.startedAt.toISOString(),
      duration: `${Math.floor(log.duration / 60)}:${(log.duration % 60).toString().padStart(2, '0')}`,
      sentiment: log.sentiment || 'neutral',
      summary: log.summary || '',
      actions: (log.metadata as any)?.actions || [],
      tags: (log.tags as string[]) || [],
      qaScore: (log.metadata as any)?.quality?.score || 0,
      crmRecord: (log.metadata as any)?.crmRecord || '',
      transcript: (log.metadata as any)?.transcriptLines || (log.transcription ? [{ speaker: 'System', text: log.transcription, time: '00:00' }] : []),
    }));
  });
