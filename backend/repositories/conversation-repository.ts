/**
 * Conversation Repository
 * Data access layer for AI chat conversations, messages, and threads
 */

import { eq, and, or, desc, asc, ilike, sql, inArray } from 'drizzle-orm';
import { BaseRepository, paginate, type PaginatedResult, type PaginationOptions } from '../lib/repository';
import { db as pgDb } from '../db/connection';
import { aiConversations, aiMessages } from '../db/drizzle-schema';

export type ConversationStatus = 'active' | 'archived' | 'deleted';

export type ConversationCreateInput = {
  id?: string;
  userId: string;
  agentId?: string | null;
  title?: string;
  status?: ConversationStatus;
  metadata?: Record<string, unknown> | null;
};

export type MessageRole = 'user' | 'assistant' | 'system' | 'tool';

export type MessageCreateInput = {
  id?: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  tokensUsed?: number;
  model?: string;
  toolCalls?: Record<string, unknown> | null;
  metadata?: Record<string, unknown> | null;
};

export class ConversationRepository extends BaseRepository<any, ConversationCreateInput, Partial<ConversationCreateInput>> {
  constructor() {
    super(aiConversations);
  }

  /** Create a new conversation */
  async createConversation(input: ConversationCreateInput): Promise<any> {
    const [conversation] = await pgDb
      .insert(aiConversations)
      .values({
        ...input,
        status: input.status || 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return conversation;
  }

  /** Add a message to a conversation */
  async addMessage(input: MessageCreateInput): Promise<any> {
    const [message] = await pgDb
      .insert(aiMessages)
      .values({
        ...input,
        createdAt: new Date(),
      })
      .returning();

    // Bump the conversation's updatedAt timestamp
    await pgDb
      .update(aiConversations)
      .set({ updatedAt: new Date() })
      .where(eq(aiConversations.id, input.conversationId));

    return message;
  }

  /** Get all messages in a conversation, ordered chronologically */
  async getMessages(conversationId: string, limit = 100): Promise<any[]> {
    return pgDb
      .select()
      .from(aiMessages)
      .where(eq(aiMessages.conversationId, conversationId))
      .orderBy(asc(aiMessages.createdAt))
      .limit(limit);
  }

  /** Get a conversation with its messages */
  async getWithMessages(conversationId: string, messageLimit = 100): Promise<{ conversation: any; messages: any[] } | null> {
    const [conversation] = await pgDb
      .select()
      .from(aiConversations)
      .where(eq(aiConversations.id, conversationId))
      .limit(1);

    if (!conversation) return null;

    const messages = await this.getMessages(conversationId, messageLimit);
    return { conversation, messages };
  }

  /** List conversations for a user */
  async listByUser(
    userId: string,
    options?: { status?: ConversationStatus; agentId?: string } & PaginationOptions
  ): Promise<PaginatedResult<any>> {
    const conditions = [eq(aiConversations.userId, userId)];
    if (options?.status) conditions.push(eq(aiConversations.status, options.status));
    if (options?.agentId) conditions.push(eq(aiConversations.agentId, options.agentId));

    const query = pgDb
      .select()
      .from(aiConversations)
      .where(and(...conditions));

    return paginate(query.$dynamic(), {
      page: options?.page || 1,
      limit: options?.limit || 20,
      sortBy: aiConversations.updatedAt,
      sortOrder: desc,
    });
  }

  /** Get total token usage for a conversation */
  async getTokenUsage(conversationId: string): Promise<{ totalTokens: number; messageCount: number }> {
    const [result] = await pgDb
      .select({
        totalTokens: sql<number>`coalesce(sum(${aiMessages.tokensUsed}), 0)::int`,
        messageCount: sql<number>`count(*)::int`,
      })
      .from(aiMessages)
      .where(eq(aiMessages.conversationId, conversationId));

    return {
      totalTokens: result?.totalTokens || 0,
      messageCount: result?.messageCount || 0,
    };
  }

  /** Archive a conversation (soft-delete) */
  async archive(conversationId: string): Promise<void> {
    await pgDb
      .update(aiConversations)
      .set({ status: 'archived', updatedAt: new Date() })
      .where(eq(aiConversations.id, conversationId));
  }

  /** Search within a conversation's messages */
  async searchMessages(conversationId: string, query: string, limit = 20): Promise<any[]> {
    return pgDb
      .select()
      .from(aiMessages)
      .where(
        and(
          eq(aiMessages.conversationId, conversationId),
          ilike(aiMessages.content, `%${query}%`)
        )
      )
      .orderBy(desc(aiMessages.createdAt))
      .limit(limit);
  }

  /** Delete a message (hard delete) */
  async deleteMessage(messageId: string): Promise<void> {
    await pgDb.delete(aiMessages).where(eq(aiMessages.id, messageId));
  }

  /** Get recent conversations across the platform (admin) */
  async getRecent(limit = 20): Promise<any[]> {
    return pgDb
      .select()
      .from(aiConversations)
      .orderBy(desc(aiConversations.updatedAt))
      .limit(limit);
  }
}

export const conversationRepository = new ConversationRepository();
