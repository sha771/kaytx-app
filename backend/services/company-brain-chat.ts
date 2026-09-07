/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/connection';
import {
  companyBrainAIConversations,
  companyBrainAIMessages,
  knowledgeNodes,
  knowledgeSearchQueries,
} from '../db/drizzle-schema';
import { eq, and, desc, asc, sql, count, like, inArray, or } from 'drizzle-orm';
import { enhancedSearchService } from './company-brain-search';

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  userId: string;
  metadata?: {
    sources?: string[];
    knowledgeNodes?: string[];
    confidence?: number;
    relatedQuestions?: string[];
  };
}

export interface ChatConversation {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
  status: 'active' | 'archived' | 'deleted';
  tags?: string[];
  context?: {
    department?: string;
    project?: string;
    topic?: string;
  };
}

export interface ChatResponse {
  message: ChatMessage;
  sources: Array<{
    id: string;
    title: string;
    content: string;
    score: number;
    type: string;
  }>;
  relatedQuestions: string[];
  suggestedActions: string[];
}

export interface ChatContext {
  conversationId: string;
  userId: string;
  department?: string;
  project?: string;
  recentQueries?: string[];
  knowledgeAreas?: string[];
}

export class CompanyBrainChatService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createConversation(
    organizationId: string,
    userId: string,
    data?: { title?: string; context?: ChatConversation['context']; assistantType?: string }
  ): Promise<ChatConversation> {
    const id = uuidv4();
    const now = new Date();

    await db.insert(companyBrainAIConversations).values({
      id,
      organizationId,
      userId,
      assistantType: data?.assistantType || 'knowledge',
      title: data?.title || 'New Conversation',
      context: data?.context || {},
      messageCount: 0,
      lastMessageAt: now,
      isArchived: false,
      metadata: {},
      createdAt: now,
      updatedAt: now,
    });

    return {
      id,
      userId,
      title: data?.title || 'New Conversation',
      createdAt: now,
      updatedAt: now,
      messageCount: 0,
      status: 'active',
      tags: [],
      context: data?.context,
    };
  }

  async getConversation(
    organizationId: string,
    conversationId: string
  ): Promise<ChatConversation | null> {
    const rows = await db.select()
      .from(companyBrainAIConversations)
      .where(
        and(
          eq(companyBrainAIConversations.id, conversationId),
          eq(companyBrainAIConversations.organizationId, organizationId)
        )
      )
      .limit(1);

    if (rows.length === 0) return null;

    return this.mapConversation(rows[0]);
  }

  async getUserConversations(
    organizationId: string,
    userId: string
  ): Promise<ChatConversation[]> {
    const rows = await db.select()
      .from(companyBrainAIConversations)
      .where(
        and(
          eq(companyBrainAIConversations.organizationId, organizationId),
          eq(companyBrainAIConversations.userId, userId),
          eq(companyBrainAIConversations.isArchived, false)
        )
      )
      .orderBy(desc(companyBrainAIConversations.lastMessageAt));

    return rows.map(r => this.mapConversation(r));
  }

  async archiveConversation(
    organizationId: string,
    conversationId: string
  ): Promise<void> {
    await db.update(companyBrainAIConversations)
      .set({
        isArchived: true,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(companyBrainAIConversations.id, conversationId),
          eq(companyBrainAIConversations.organizationId, organizationId)
        )
      );
  }

  async deleteConversation(
    organizationId: string,
    conversationId: string
  ): Promise<void> {
    await db.delete(companyBrainAIMessages)
      .where(
        and(
          eq(companyBrainAIMessages.conversationId, conversationId),
          eq(companyBrainAIMessages.organizationId, organizationId)
        )
      );

    await db.delete(companyBrainAIConversations)
      .where(
        and(
          eq(companyBrainAIConversations.id, conversationId),
          eq(companyBrainAIConversations.organizationId, organizationId)
        )
      );
  }

  async sendMessage(
    organizationId: string,
    conversationId: string,
    userId: string,
    content: string,
    context?: ChatContext
  ): Promise<ChatResponse> {
    const conversations = await db.select()
      .from(companyBrainAIConversations)
      .where(
        and(
          eq(companyBrainAIConversations.id, conversationId),
          eq(companyBrainAIConversations.organizationId, organizationId)
        )
      )
      .limit(1);

    if (conversations.length === 0) {
      throw new Error('Conversation not found');
    }

    const conversation = conversations[0];
    const now = new Date();

    // Insert user message
    const userMessageId = uuidv4();
    await db.insert(companyBrainAIMessages).values({
      id: userMessageId,
      organizationId,
      conversationId,
      role: 'user',
      content,
      sources: [],
      metadata: { userId },
      createdAt: now,
    });

    // Update conversation metadata/timestamps
    const updateData: any = {
      lastMessageAt: now,
      messageCount: sql`${companyBrainAIConversations.messageCount} + 1`,
      updatedAt: now,
    };

    if (context) {
      const existingContext = (conversation.context as Record<string, any>) || {};
      updateData.context = {
        ...existingContext,
        department: context.department || existingContext.department,
        project: context.project || existingContext.project,
      };
    }

    await db.update(companyBrainAIConversations)
      .set(updateData)
      .where(eq(companyBrainAIConversations.id, conversationId));

    // Get recent messages for context
    const recentMessages = await db.select()
      .from(companyBrainAIMessages)
      .where(
        and(
          eq(companyBrainAIMessages.conversationId, conversationId),
          eq(companyBrainAIMessages.organizationId, organizationId)
        )
      )
      .orderBy(desc(companyBrainAIMessages.createdAt))
      .limit(10);

    const history = recentMessages.reverse();

    // Search knowledge base
    const searchResults = await enhancedSearchService.search({
      query: content,
      organizationId,
      limit: 5,
      searchMode: 'hybrid',
      filters: context?.department ? { department: [context.department] } : undefined,
    });

    // Log search query
    await db.insert(knowledgeSearchQueries).values({
      id: uuidv4(),
      organizationId,
      userId,
      query: content,
      queryType: 'hybrid',
      resultCount: searchResults.results.length,
      successful: true,
      searchTime: searchResults.queryTime,
      filters: context?.department ? { department: [context.department] } : {},
      metadata: { conversationId },
      createdAt: new Date(),
    });

    // Build AI prompt
    const systemPrompt = this.buildSystemPrompt(conversation, searchResults.results);
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...history.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    // Get AI response
    const aiResponse = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const assistantContent = aiResponse.choices[0].message.content || 'I apologize, but I could not generate a response.';

    // Generate related questions and suggested actions
    const relatedQuestions = await this.generateRelatedQuestions(content, assistantContent);
    const suggestedActions = this.generateSuggestedActions(content, searchResults.results);

    // Insert AI message
    const assistantMessageId = uuidv4();
    await db.insert(companyBrainAIMessages).values({
      id: assistantMessageId,
      organizationId,
      conversationId,
      role: 'assistant',
      content: assistantContent,
      sources: searchResults.results.map(r => ({
        id: r.id,
        title: r.title,
        content: r.content.substring(0, 200),
        score: r.score,
        type: r.type,
      })),
      confidence: searchResults.results[0]?.score?.toString() || '0',
      tokensUsed: aiResponse.usage?.total_tokens || 0,
      modelUsed: 'gpt-4-turbo-preview',
      metadata: { relatedQuestions, suggestedActions },
      createdAt: new Date(),
    });

    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      conversationId,
      role: 'assistant',
      content: assistantContent,
      timestamp: new Date(),
      userId: 'system',
      metadata: {
        sources: searchResults.results.map(r => r.id),
        knowledgeNodes: searchResults.results.map(r => r.id),
        confidence: searchResults.results[0]?.score || 0,
        relatedQuestions,
      },
    };

    return {
      message: assistantMessage,
      sources: searchResults.results.map(r => ({
        id: r.id,
        title: r.title,
        content: r.content,
        score: r.score,
        type: r.type,
      })),
      relatedQuestions,
      suggestedActions,
    };
  }

  async getMessages(
    organizationId: string,
    conversationId: string
  ): Promise<ChatMessage[]> {
    const rows = await db.select()
      .from(companyBrainAIMessages)
      .where(
        and(
          eq(companyBrainAIMessages.conversationId, conversationId),
          eq(companyBrainAIMessages.organizationId, organizationId)
        )
      )
      .orderBy(asc(companyBrainAIMessages.createdAt));

    return rows.map(r => this.mapMessage(r));
  }

  async getUserChatStats(
    organizationId: string,
    userId: string
  ): Promise<{
    totalConversations: number;
    activeConversations: number;
    totalMessages: number;
    avgMessagesPerConversation: number;
  }> {
    const [convStats] = await db.select({
      totalConversations: count(),
      activeConversations: sql<number>`COUNT(*) FILTER (WHERE ${companyBrainAIConversations.isArchived} = false)`,
    })
    .from(companyBrainAIConversations)
    .where(
      and(
        eq(companyBrainAIConversations.organizationId, organizationId),
        eq(companyBrainAIConversations.userId, userId)
      )
    );

    const userConvs = await db.select({ id: companyBrainAIConversations.id })
      .from(companyBrainAIConversations)
      .where(
        and(
          eq(companyBrainAIConversations.organizationId, organizationId),
          eq(companyBrainAIConversations.userId, userId)
        )
      );

    const convIds = userConvs.map(c => c.id);

    let totalMessages = 0;
    if (convIds.length > 0) {
      const [msgStats] = await db.select({
        total: count(),
      })
      .from(companyBrainAIMessages)
      .where(
        and(
          eq(companyBrainAIMessages.organizationId, organizationId),
          inArray(companyBrainAIMessages.conversationId, convIds)
        )
      );
      totalMessages = Number(msgStats?.total || 0);
    }

    const totalConv = Number(convStats?.totalConversations || 0);
    const activeConv = Number(convStats?.activeConversations || 0);

    return {
      totalConversations: totalConv,
      activeConversations: activeConv,
      totalMessages,
      avgMessagesPerConversation: totalConv > 0 ? totalMessages / totalConv : 0,
    };
  }

  async updateConversationTitle(
    organizationId: string,
    conversationId: string,
    title: string
  ): Promise<void> {
    await db.update(companyBrainAIConversations)
      .set({
        title,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(companyBrainAIConversations.id, conversationId),
          eq(companyBrainAIConversations.organizationId, organizationId)
        )
      );
  }

  async addConversationTags(
    organizationId: string,
    conversationId: string,
    tags: string[]
  ): Promise<void> {
    const rows = await db.select({
      metadata: companyBrainAIConversations.metadata,
    })
    .from(companyBrainAIConversations)
    .where(
      and(
        eq(companyBrainAIConversations.id, conversationId),
        eq(companyBrainAIConversations.organizationId, organizationId)
      )
    )
    .limit(1);

    if (rows.length === 0) return;

    const existingMetadata = (rows[0].metadata as Record<string, any>) || {};
    const existingTags: string[] = existingMetadata.tags || [];
    const mergedTags = [...new Set([...existingTags, ...tags])];

    await db.update(companyBrainAIConversations)
      .set({
        metadata: { ...existingMetadata, tags: mergedTags },
        updatedAt: new Date(),
      })
      .where(eq(companyBrainAIConversations.id, conversationId));
  }

  async searchConversations(
    organizationId: string,
    userId: string,
    query: string
  ): Promise<ChatConversation[]> {
    const searchPattern = `%${query}%`;

    const titleMatches = await db.select()
      .from(companyBrainAIConversations)
      .where(
        and(
          eq(companyBrainAIConversations.organizationId, organizationId),
          eq(companyBrainAIConversations.userId, userId),
          eq(companyBrainAIConversations.isArchived, false),
          like(companyBrainAIConversations.title, searchPattern)
        )
      )
      .orderBy(desc(companyBrainAIConversations.lastMessageAt));

    const msgMatchRows = await db.selectDistinct({
      conversationId: companyBrainAIMessages.conversationId,
    })
    .from(companyBrainAIMessages)
    .innerJoin(
      companyBrainAIConversations,
      eq(companyBrainAIMessages.conversationId, companyBrainAIConversations.id)
    )
    .where(
      and(
        eq(companyBrainAIMessages.organizationId, organizationId),
        eq(companyBrainAIConversations.userId, userId),
        eq(companyBrainAIConversations.isArchived, false),
        like(companyBrainAIMessages.content, searchPattern)
      )
    );

    const titleIds = new Set(titleMatches.map(c => c.id));
    const msgConvIds = msgMatchRows
      .map(r => r.conversationId)
      .filter((id): id is string => id !== null && !titleIds.has(id));

    let extraConversations: any[] = [];
    if (msgConvIds.length > 0) {
      extraConversations = await db.select()
        .from(companyBrainAIConversations)
        .where(inArray(companyBrainAIConversations.id, msgConvIds))
        .orderBy(desc(companyBrainAIConversations.lastMessageAt));
    }

    return [...titleMatches, ...extraConversations].map(r => this.mapConversation(r));
  }

  async exportConversation(
    organizationId: string,
    conversationId: string
  ): Promise<{
    conversation: ChatConversation;
    messages: ChatMessage[];
    exportedAt: Date;
  }> {
    const conversation = await this.getConversation(organizationId, conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const messages = await this.getMessages(organizationId, conversationId);

    return {
      conversation,
      messages,
      exportedAt: new Date(),
    };
  }

  async clearUserData(
    organizationId: string,
    userId: string
  ): Promise<void> {
    const conversations = await db.select({ id: companyBrainAIConversations.id })
      .from(companyBrainAIConversations)
      .where(
        and(
          eq(companyBrainAIConversations.organizationId, organizationId),
          eq(companyBrainAIConversations.userId, userId)
        )
      );

    const convIds = conversations.map(c => c.id);

    if (convIds.length > 0) {
      await db.delete(companyBrainAIMessages)
        .where(
          and(
            eq(companyBrainAIMessages.organizationId, organizationId),
            inArray(companyBrainAIMessages.conversationId, convIds)
          )
        );

      await db.delete(companyBrainAIConversations)
        .where(
          and(
            eq(companyBrainAIConversations.organizationId, organizationId),
            inArray(companyBrainAIConversations.id, convIds)
          )
        );
    }
  }

  private mapConversation(row: any): ChatConversation {
    const metadata = (row.metadata as Record<string, any>) || {};
    return {
      id: row.id,
      userId: row.userId,
      title: row.title || 'New Conversation',
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      messageCount: row.messageCount,
      status: row.isArchived ? 'archived' : 'active',
      tags: metadata.tags || [],
      context: row.context || undefined,
    };
  }

  private mapMessage(row: any): ChatMessage {
    const sources: any[] = (row.sources as any[]) || [];
    const metadata = (row.metadata as Record<string, any>) || {};
    return {
      id: row.id,
      conversationId: row.conversationId,
      role: row.role,
      content: row.content,
      timestamp: row.createdAt,
      userId: row.role === 'assistant' ? 'system' : metadata.userId || '',
      metadata: {
        sources: sources.map(s => s.id || s),
        knowledgeNodes: sources.map(s => s.id || s),
        confidence: row.confidence ? Number(row.confidence) : undefined,
        relatedQuestions: metadata.relatedQuestions || [],
      },
    };
  }

  private buildSystemPrompt(
    conversation: any,
    searchResults: any[]
  ): string {
    let prompt = `You are Company Brain, an AI assistant that helps users find and understand company knowledge.

Your role is to:
- Answer questions based on the company's knowledge base
- Provide accurate, context-aware responses
- Cite your sources when possible
- Ask clarifying questions when needed
- Suggest related topics the user might be interested in

`;

    const convContext = conversation.context as Record<string, any> | undefined;
    if (convContext) {
      prompt += `Context:\n`;
      if (convContext.department) {
        prompt += `- Department: ${convContext.department}\n`;
      }
      if (convContext.project) {
        prompt += `- Project: ${convContext.project}\n`;
      }
      if (convContext.topic) {
        prompt += `- Topic: ${convContext.topic}\n`;
      }
      prompt += `\n`;
    }

    if (searchResults.length > 0) {
      prompt += `Relevant knowledge from the company database:\n\n`;
      searchResults.forEach((result, index) => {
        prompt += `Source ${index + 1}:\n`;
        prompt += `- Title: ${result.title}\n`;
        prompt += `- Type: ${result.type}\n`;
        prompt += `- Content: ${result.content.substring(0, 500)}...\n`;
        prompt += `- Relevance Score: ${result.score.toFixed(2)}\n\n`;
      });
    }

    prompt += `
When answering:
1. Use the provided knowledge sources as your primary information
2. If information is not available in the sources, acknowledge this limitation
3. Provide specific, actionable answers when possible
4. Include source references in your response (e.g., "According to [Source 1]...")
5. If the user's question is unclear, ask for clarification
6. Keep responses concise but comprehensive
7. Format information clearly with bullet points or numbered lists when appropriate
`;

    return prompt;
  }

  private async generateRelatedQuestions(query: string, response: string): Promise<string[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Generate 3-5 related follow-up questions based on the user query and AI response. Return as a JSON array of strings.',
          },
          {
            role: 'user',
            content: `Query: ${query}\n\nResponse: ${response}`,
          },
        ],
        temperature: 0.5,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result.questions || [];
    } catch (error) {
      console.error('Error generating related questions:', error);
      return [];
    }
  }

  private generateSuggestedActions(query: string, searchResults: any[]): string[] {
    const actions: string[] = [];
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('process') || lowerQuery.includes('how to')) {
      actions.push('View detailed process documentation');
      actions.push('Create a process checklist');
    }

    if (lowerQuery.includes('client') || lowerQuery.includes('customer')) {
      actions.push('View client relationship history');
      actions.push('Contact account manager');
    }

    if (lowerQuery.includes('decision') || lowerQuery.includes('why')) {
      actions.push('View decision record details');
      actions.push('See related decisions');
    }

    if (searchResults.length > 0) {
      actions.push('Explore related knowledge nodes');
      actions.push('View knowledge graph connections');
    }

    if (actions.length === 0) {
      actions.push('Search for more information');
      actions.push('Ask a follow-up question');
    }

    return actions.slice(0, 4);
  }
}

export const companyBrainChatService = new CompanyBrainChatService();
