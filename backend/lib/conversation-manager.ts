import { EventEmitter } from 'events';
import { db as pgDb } from '../db/connection';
import { aiConversations } from '../db/drizzle-schema';
import { and, eq } from 'drizzle-orm';
import crypto from 'crypto';
import { AIServiceLogger } from './ai-service-logger';

const logger = AIServiceLogger;

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface ConversationContext {
  sessionId: string;
  agentId: string;
  history: ConversationMessage[];
  summary?: string;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
  tokenCount: number;
}

export interface ConversationOptions {
  maxMessages?: number;
  maxTokens?: number;
  enableSummarization?: boolean;
  compressionThreshold?: number;
}

export class ConversationManager extends EventEmitter {
  private conversations = new Map<string, ConversationContext>();
  private readonly defaultOptions: ConversationOptions = {
    maxMessages: 50,
    maxTokens: 8000,
    enableSummarization: true,
    compressionThreshold: 0.8,
  };

  async manageConversation(
    sessionId: string,
    agentId: string,
    newMessage: string,
    context: { organizationId: string; userId?: string; metadata?: Record<string, any> },
    options: ConversationOptions = {}
  ): Promise<ConversationContext> {
    const opts = { ...this.defaultOptions, ...options };
    let conversation = this.conversations.get(sessionId);

    if (!conversation) {
      // Try to load from database
      conversation = (await this.loadConversationFromDb(sessionId, context.organizationId)) || undefined;
      if (!conversation) {
        // Create new conversation
        conversation = await this.createNewConversation(sessionId, agentId, context);
      }
      this.conversations.set(sessionId, conversation);
    }

    // Add new message
    const userMessage: ConversationMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: newMessage,
      timestamp: new Date(),
      metadata: context.metadata,
    };

    conversation.history.push(userMessage);
    conversation.updatedAt = new Date();
    conversation.messageCount = conversation.history.length;
    conversation.tokenCount = this.calculateTokenCount(conversation.history);

    // Check if compression is needed
    if (opts.enableSummarization && this.shouldCompress(conversation, opts)) {
      conversation = await this.compressConversation(conversation, opts);
    }

    // Persist to database
    await this.persistConversation(conversation, context.organizationId);

    this.emit('conversation:updated', { sessionId, conversation });
    return conversation;
  }

  async addAssistantResponse(
    sessionId: string,
    response: string,
    metadata?: Record<string, any>
  ): Promise<ConversationContext> {
    const conversation = this.conversations.get(sessionId);
    if (!conversation) {
      throw new Error(`Conversation not found: ${sessionId}`);
    }

    const assistantMessage: ConversationMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      metadata,
    };

    conversation.history.push(assistantMessage);
    conversation.updatedAt = new Date();
    conversation.messageCount = conversation.history.length;
    conversation.tokenCount = this.calculateTokenCount(conversation.history);

    this.emit('message:added', { sessionId, message: assistantMessage });
    return conversation;
  }

  async getConversation(sessionId: string): Promise<ConversationContext | null> {
    const conversation = this.conversations.get(sessionId);
    if (conversation) {
      return conversation;
    }

    // Try to load from database
    const loaded = await this.loadConversationFromDb(sessionId);
    if (loaded) {
      this.conversations.set(sessionId, loaded);
      return loaded;
    }

    return null;
  }

  async clearConversation(sessionId: string): Promise<void> {
    this.conversations.delete(sessionId);
    
    try {
      await pgDb
        .delete(aiConversations)
        .where(eq(aiConversations.id, sessionId as any));
    } catch (error) {
      logger.error(`Failed to clear conversation ${sessionId}`, error instanceof Error ? error : undefined);
    }

    this.emit('conversation:cleared', { sessionId });
  }

  async getConversationHistory(
    sessionId: string,
    limit?: number,
    offset?: number
  ): Promise<ConversationMessage[]> {
    const conversation = await this.getConversation(sessionId);
    if (!conversation) {
      return [];
    }

    let history = [...conversation.history];
    
    // Apply pagination if specified
    if (offset) {
      history = history.slice(offset);
    }
    if (limit) {
      history = history.slice(0, limit);
    }

    return history;
  }

  async searchConversations(
    organizationId: string,
    query: string,
    options: { limit?: number; agentId?: string } = {}
  ): Promise<ConversationContext[]> {
    // This would implement search functionality
    // For now, return all conversations for the organization
    const results: ConversationContext[] = [];
    
    for (const conversation of this.conversations.values()) {
      if (conversation.metadata.organizationId === organizationId) {
        if (options.agentId && conversation.agentId !== options.agentId) {
          continue;
        }
        
        // Simple text search in messages
        const hasMatch = conversation.history.some(msg => 
          msg.content.toLowerCase().includes(query.toLowerCase())
        );
        
        if (hasMatch) {
          results.push(conversation);
        }
      }
    }

    return results.slice(0, options.limit || 50);
  }

  private async createNewConversation(
    sessionId: string,
    agentId: string,
    context: { organizationId: string; userId?: string; metadata?: Record<string, any> }
  ): Promise<ConversationContext> {
    const conversation: ConversationContext = {
      sessionId,
      agentId,
      history: [],
      metadata: {
        organizationId: context.organizationId,
        userId: context.userId,
        ...context.metadata,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: 0,
      tokenCount: 0,
    };

    return conversation;
  }

  private async loadConversationFromDb(
    sessionId: string,
    organizationId?: string
  ): Promise<ConversationContext | null> {
    try {
      const whereClause = organizationId
        ? and(
            eq(aiConversations.id, sessionId as any),
            eq(aiConversations.organizationId, organizationId as any)
          )
        : eq(aiConversations.id, sessionId as any);

      const [conversation] = await pgDb
        .select()
        .from(aiConversations)
        .where(whereClause)
        .limit(1);

      if (!conversation) {
        return null;
      }

      return {
        sessionId: conversation.id,
        agentId: conversation.agentId || '',
        history: (conversation.messages as any[]) || [],
        metadata: {},
        createdAt: conversation.createdAt || new Date(),
        updatedAt: conversation.updatedAt || new Date(),
        messageCount: ((conversation.messages as any[]) || []).length,
        tokenCount: this.calculateTokenCount((conversation.messages as any[]) || []),
      };
    } catch (error) {
      logger.error(`Failed to load conversation ${sessionId}`, error instanceof Error ? error : undefined);
      return null;
    }
  }

  private async persistConversation(
    conversation: ConversationContext,
    organizationId: string
  ): Promise<void> {
    try {
      const existing = await pgDb
        .select()
        .from(aiConversations)
        .where(
          and(
            eq(aiConversations.id, conversation.sessionId as any),
            eq(aiConversations.organizationId, organizationId as any)
          )
        )
        .limit(1);

      const conversationData = {
        organizationId: organizationId as any,
        agentId: conversation.agentId as any,
        type: 'ai-agent' as any,
        participants: [{ kind: 'agent', id: conversation.agentId }],
        messages: conversation.history,
        status: 'active' as any,
        updatedAt: new Date(),
      };

      if (existing.length > 0) {
        await pgDb
          .update(aiConversations)
          .set(conversationData)
          .where(eq(aiConversations.id, conversation.sessionId as any));
      } else {
        await pgDb.insert(aiConversations).values({
          id: conversation.sessionId as any,
          ...conversationData,
          createdAt: conversation.createdAt,
        } as any);
      }
    } catch (error) {
      logger.error(`Failed to persist conversation ${conversation.sessionId}`, error instanceof Error ? error : undefined);
    }
  }

  private shouldCompress(
    conversation: ConversationContext,
    options: ConversationOptions
  ): boolean {
    if (conversation.messageCount >= (options.maxMessages || 50)) {
      return true;
    }

    if (conversation.tokenCount >= (options.maxTokens || 8000)) {
      return true;
    }

    const threshold = options.compressionThreshold || 0.8;
    const currentRatio = conversation.tokenCount / (options.maxTokens || 8000);
    return currentRatio >= threshold;
  }

  private async compressConversation(
    conversation: ConversationContext,
    options: ConversationOptions
  ): Promise<ConversationContext> {
    const keepMessages = Math.floor((options.maxMessages || 50) * 0.6); // Keep 60% of messages
    const messages = conversation.history;
    
    if (messages.length <= keepMessages) {
      return conversation;
    }

    // Create summary of older messages
    const oldMessages = messages.slice(0, messages.length - keepMessages);
    const recentMessages = messages.slice(messages.length - keepMessages);

    const summary = this.generateSummary(oldMessages);
    
    const summaryMessage: ConversationMessage = {
      id: crypto.randomUUID(),
      role: 'system',
      content: `Conversation summary: ${summary}`,
      timestamp: new Date(),
      metadata: { type: 'summary', compressedMessageCount: oldMessages.length },
    };

    conversation.history = [summaryMessage, ...recentMessages];
    conversation.summary = summary;
    conversation.tokenCount = this.calculateTokenCount(conversation.history);

    this.emit('conversation:compressed', { 
      sessionId: conversation.sessionId, 
      originalCount: messages.length,
      compressedCount: conversation.history.length 
    });

    return conversation;
  }

  private generateSummary(messages: ConversationMessage[]): string {
    // Simple summarization - in production, this would use AI
    const topics = messages
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content.slice(0, 100))
      .join('; ');

    return `Discussed: ${topics}. Total messages: ${messages.length}`;
  }

  private calculateTokenCount(messages: ConversationMessage[]): number {
    // Rough token estimation - in production, use proper tokenizer
    const totalChars = messages.reduce((sum, msg) => sum + msg.content.length, 0);
    return Math.ceil(totalChars / 4); // ~4 chars per token
  }

  getStats(): {
    totalConversations: number;
    totalMessages: number;
    totalTokens: number;
    averageMessagesPerConversation: number;
  } {
    const conversations = Array.from(this.conversations.values());
    const totalMessages = conversations.reduce((sum, conv) => sum + conv.messageCount, 0);
    const totalTokens = conversations.reduce((sum, conv) => sum + conv.tokenCount, 0);

    return {
      totalConversations: conversations.length,
      totalMessages,
      totalTokens,
      averageMessagesPerConversation: conversations.length > 0 ? totalMessages / conversations.length : 0,
    };
  }
}

export const conversationManager = new ConversationManager();
