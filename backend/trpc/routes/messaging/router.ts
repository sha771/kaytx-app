import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { and, desc, eq } from 'drizzle-orm';
import { createTRPCRouter, permissionProcedure } from '../../create-context';
import { Permission } from '../../../lib/rbac';
import { db as pgDb } from '../../../db/connection';
import { messages, secureConversationMembers, secureConversations } from '../../../db/drizzle-schema';
import { decryptField, encryptField, getFieldEncryptionKey, isEncryptedField } from '../../../lib/encryption';
import { logAudit } from '../../../lib/audit';

function requireOrgId(orgId: unknown): string {
  if (!orgId || typeof orgId !== 'string') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Organization context required' });
  }
  return orgId;
}

async function assertConversationAccess(params: {
  conversationId: string;
  organizationId: string;
  userId: string;
}): Promise<{ conversation: any; isOrgVisible: boolean }> {
  const [conv] = await pgDb
    .select()
    .from(secureConversations)
    .where(
      and(
        eq(secureConversations.id, params.conversationId as any),
        eq(secureConversations.organizationId, params.organizationId as any)
      )
    )
    .limit(1);

  if (!conv) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Conversation not found' });
  }

  const isOrgVisible = conv.visibility === 'org';
  if (isOrgVisible) {
    return { conversation: conv, isOrgVisible };
  }

  const [member] = await pgDb
    .select()
    .from(secureConversationMembers)
    .where(
      and(
        eq(secureConversationMembers.conversationId, params.conversationId as any),
        eq(secureConversationMembers.userId, params.userId as any)
      )
    )
    .limit(1);

  if (!member) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'You are not a member of this conversation' });
  }

  return { conversation: conv, isOrgVisible };
}

export const messagingRouter = createTRPCRouter({
  getChannels: permissionProcedure(Permission.MESSAGE_READ)
    .input(z.object({ includeOrgVisible: z.boolean().default(true) }).optional())
    .query(async ({ ctx, input }) => {
      const organizationId = requireOrgId(ctx.user.organizationId);
      const includeOrgVisible = input?.includeOrgVisible ?? true;

      const memberRows = await pgDb
        .select({ conv: secureConversations })
        .from(secureConversationMembers)
        .innerJoin(secureConversations, eq(secureConversationMembers.conversationId, secureConversations.id))
        .where(
          and(
            eq(secureConversationMembers.userId, ctx.user.id as any),
            eq(secureConversations.organizationId, organizationId as any)
          )
        );

      const out = new Map<string, any>();
      for (const row of memberRows) {
        out.set((row.conv as any).id, row.conv);
      }

      if (includeOrgVisible) {
        const orgVisible = await pgDb
          .select()
          .from(secureConversations)
          .where(and(eq(secureConversations.organizationId, organizationId as any), eq(secureConversations.visibility, 'org' as any)));

        for (const conv of orgVisible as any[]) {
          out.set(conv.id, conv);
        }
      }

      const channels = Array.from(out.values()).map((c: any) => ({
        id: c.id,
        name: c.name ?? 'Untitled',
        description: c.description ?? undefined,
        type: c.type,
        visibility: c.visibility,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        metadata: c.metadata ?? {},
      }));

      return { channels };
    }),

  createChannel: permissionProcedure(Permission.MESSAGE_CREATE)
    .input(
      z.object({
        type: z.enum(['dm', 'group', 'channel']),
        name: z.string().min(1).max(255).optional(),
        description: z.string().max(2000).optional(),
        visibility: z.enum(['private', 'org']).default('private'),
        memberIds: z.array(z.string().uuid()).default([]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const organizationId = requireOrgId(ctx.user.organizationId);

      if (input.type === 'dm' && input.memberIds.length !== 1) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'DM requires exactly 1 other member' });
      }

      const now = new Date();
      const [conv] = await pgDb
        .insert(secureConversations)
        .values({
          organizationId: organizationId as any,
          type: input.type as any,
          name: input.name ?? null,
          description: input.description ?? null,
          visibility: input.visibility as any,
          createdBy: ctx.user.id as any,
          metadata: {},
          createdAt: now,
          updatedAt: now,
        } as any)
        .returning();

      if (!conv) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create conversation' });
      }

      const membersToAdd = input.visibility === 'org'
        ? [ctx.user.id]
        : Array.from(new Set([ctx.user.id, ...input.memberIds]));

      if (membersToAdd.length > 0) {
        await pgDb
          .insert(secureConversationMembers)
          .values(
            membersToAdd.map((userId) => ({
              conversationId: conv.id as any,
              userId: userId as any,
              role: userId === ctx.user.id ? 'owner' : 'member',
              joinedAt: now,
            })) as any
          )
          .onConflictDoNothing();
      }

      // Audit log for channel creation
      await logAudit({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId!,
        action: 'conversation_created',
        resource: 'secure_conversation',
        resourceId: conv.id,
        details: {
          conversationId: conv.id,
          conversationType: input.type,
          visibility: input.visibility,
          memberCount: membersToAdd.length,
        }
      });

      return {
        channel: {
          id: conv.id,
          name: conv.name ?? 'Untitled',
          description: conv.description ?? undefined,
          type: conv.type,
          visibility: conv.visibility,
          createdAt: conv.createdAt,
          updatedAt: conv.updatedAt,
          metadata: conv.metadata ?? {},
        },
      };
    }),

  getMessages: permissionProcedure(Permission.MESSAGE_READ)
    .input(z.object({ channelId: z.string().uuid(), limit: z.number().min(1).max(200).default(50) }))
    .query(async ({ ctx, input }) => {
      const organizationId = requireOrgId(ctx.user.organizationId);
      await assertConversationAccess({ conversationId: input.channelId, organizationId, userId: ctx.user.id });

      const rows = await pgDb
        .select()
        .from(messages)
        .where(
          and(
            eq(messages.organizationId, organizationId as any),
            eq(messages.secureConversationId, input.channelId as any)
          )
        )
        .orderBy(desc(messages.createdAt))
        .limit(input.limit);

      const key = getFieldEncryptionKey();

      const mapped = rows
        .slice()
        .reverse()
        .map((m: any) => {
          const meta = (m.metadata ?? {}) as any;
          const isE2EE = meta?.e2ee === true;
          const isOwn = m.senderId === ctx.user.id;

          if (isE2EE) {
            return {
              id: m.id,
              userId: m.senderId,
              message: '',
              timestamp: m.createdAt ? new Date(m.createdAt).toISOString() : new Date().toISOString(),
              status: m.status,
              isE2EE: true,
              isOwn,
              metadata: meta,
            };
          }

          let content = '';
          try {
            const parsed = JSON.parse(m.content);
            if (isEncryptedField(parsed)) {
              content = decryptField(parsed, key);
            } else {
              content = m.content;
            }
          } catch {
            content = m.content;
          }

          return {
            id: m.id,
            userId: m.senderId,
            message: content,
            timestamp: m.createdAt ? new Date(m.createdAt).toISOString() : new Date().toISOString(),
            status: m.status,
            isE2EE: false,
            isOwn,
            metadata: meta,
          };
        });

      return { messages: mapped };
    }),

  sendMessage: permissionProcedure(Permission.MESSAGE_CREATE)
    .input(
      z.object({
        channelId: z.string().uuid(),
        content: z.string().min(1).max(10000).optional(),
        e2eeCiphertext: z.string().min(1).max(50000).optional(),
        e2eeMetadata: z.record(z.string(), z.any()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const organizationId = requireOrgId(ctx.user.organizationId);
      await assertConversationAccess({ conversationId: input.channelId, organizationId, userId: ctx.user.id });

      const isE2EE = typeof input.e2eeCiphertext === 'string' && input.e2eeCiphertext.length > 0;
      const now = new Date();

      let storedContent: string;
      let metadata: Record<string, any> = {};

      if (isE2EE) {
        storedContent = input.e2eeCiphertext!;
        metadata = { ...(input.e2eeMetadata ?? {}), e2ee: true };
      } else {
        if (!input.content) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'content is required when not using E2EE' });
        }
        const key = getFieldEncryptionKey();
        const encryptedField = encryptField(input.content, key, `secureConversation:${input.channelId}`);
        storedContent = JSON.stringify(encryptedField);
        metadata = { e2ee: false };
      }

      const [created] = await pgDb
        .insert(messages)
        .values({
          organizationId: organizationId as any,
          secureConversationId: input.channelId as any,
          senderId: ctx.user.id as any,
          recipientId: null,
          content: storedContent,
          type: 'secure',
          direction: 'outbound',
          status: 'sent',
          readAt: null,
          metadata,
          createdAt: now,
        } as any)
        .returning();

      if (!created) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to send message' });
      }

      // Audit log
      await logAudit({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId!,
        action: 'message_sent',
        resource: 'secure_conversation',
        resourceId: input.channelId,
        details: {
          conversationId: input.channelId,
          messageType: input.isE2EE ? 'e2ee' : 'encrypted',
          hasE2EE: !!input.isE2EE,
        }
      });

      return {
        id: created.id,
        status: created.status,
        timestamp: created.createdAt ? new Date(created.createdAt).toISOString() : new Date().toISOString(),
      };
    }),
});

export type MessagingRouter = typeof messagingRouter;
