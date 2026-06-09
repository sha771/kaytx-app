/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';
import { companyBrainWebSocketService } from './company-brain-websocket';
import { enhancedSearchService } from './company-brain-search';

/**
 * Company Brain Chat Service
 * AI-powered chat interface for querying company knowledge
 * Provides conversational access to institutional knowledge with context awareness
 */

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
  private conversations: Map<string, ChatConversation> = new Map();
  private messages: Map<string, ChatMessage[]> = new Map();
  private userContexts: Map<string, ChatContext> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Create a new chat conversation
   */
  createConversation(userId: string, title?: string, context?: ChatContext['context']): ChatConversation {
    const conversation: ChatConversation = {
      id: crypto.randomUUID(),
      userId,
      title: title || 'New Conversation',
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: 0,
      status: 'active',
      context,
    };

    this.conversations.set(conversation.id, conversation);
    this.messages.set(conversation.id, []);

    // Initialize user context
    this.userContexts.set(userId, {
      conversationId: conversation.id,
      userId,
      ...context,
    });

    return conversation;
  }

  /**
   * Get a conversation by ID
   */
  getConversation(conversationId: string): ChatConversation | undefined {
    return this.conversations.get(conversationId);
  }

  /**
   * Get all conversations for a user
   */
  getUserConversations(userId: string): ChatConversation[] {
    const userConversations = Array.from(this.conversations.values())
      .filter(conv => conv.userId === userId && conv.status !== 'deleted')
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    return userConversations;
  }

  /**
   * Archive a conversation
   */
  archiveConversation(conversationId: string): void {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.status = 'archived';
      conversation.updatedAt = new Date();
    }
  }

  /**
   * Delete a conversation
   */
  deleteConversation(conversationId: string): void {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.status = 'deleted';
      this.messages.delete(conversationId);
    }
  }

  /**
   * Send a message and get AI response
   */
  async sendMessage(
    conversationId: string,
    userId: string,
    content: string,
    context?: ChatContext['context']
  ): Promise<ChatResponse> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      conversationId,
      role: 'user',
      content,
      timestamp: new Date(),
      userId,
    };

    this.addMessage(conversationId, userMessage);

    // Update conversation
    conversation.updatedAt = new Date();
    conversation.messageCount++;

    // Update context if provided
    if (context) {
      conversation.context = { ...conversation.context, ...context };
    }

    // Get conversation history for context
    const conversationHistory = this.messages.get(conversationId) || [];
    const recentMessages = conversationHistory.slice(-10); // Last 10 messages for context

    // Search knowledge base for relevant information
    const searchResults = await enhancedSearchService.search({
      query: content,
      limit: 5,
      searchMode: 'hybrid',
      filters: context?.department ? { department: [context.department] } : undefined,
    });

    // Build AI context
    const systemPrompt = this.buildSystemPrompt(conversation, searchResults.results);
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...recentMessages.map(msg => ({
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

    // Add assistant message
    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      conversationId,
      role: 'assistant',
      content: assistantContent,
      timestamp: new Date(),
      userId: 'system',
      metadata: {
        sources: searchResults.results.map(r => r.id),
        knowledgeNodes: searchResults.results.map(r => r.id),
        confidence: searchResults.results[0]?.score || 0,
      },
    };

    this.addMessage(conversationId, assistantMessage);

    // Generate related questions
    const relatedQuestions = await this.generateRelatedQuestions(content, assistantContent);

    // Generate suggested actions
    const suggestedActions = this.generateSuggestedActions(content, searchResults.results);

    // Notify via WebSocket
    companyBrainWebSocketService.broadcastChatMessage({
      conversationId,
      message: assistantMessage,
      userId,
    });

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

  /**
   * Add a message to a conversation
   */
  private addMessage(conversationId: string, message: ChatMessage): void {
    const messages = this.messages.get(conversationId) || [];
    messages.push(message);
    this.messages.set(conversationId, messages);
  }

  /**
   * Get messages for a conversation
   */
  getMessages(conversationId: string, limit?: number): ChatMessage[] {
    const messages = this.messages.get(conversationId) || [];
    if (limit) {
      return messages.slice(-limit);
    }
    return messages;
  }

  /**
   * Build system prompt with context and knowledge sources
   */
  private buildSystemPrompt(
    conversation: ChatConversation,
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

    // Add context
    if (conversation.context) {
      prompt += `Context:\n`;
      if (conversation.context.department) {
        prompt += `- Department: ${conversation.context.department}\n`;
      }
      if (conversation.context.project) {
        prompt += `- Project: ${conversation.context.project}\n`;
      }
      if (conversation.context.topic) {
        prompt += `- Topic: ${conversation.context.topic}\n`;
      }
      prompt += `\n`;
    }

    // Add knowledge sources
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

  /**
   * Generate related questions based on the conversation
   */
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

  /**
   * Generate suggested actions based on the query and search results
   */
  private generateSuggestedActions(query: string, searchResults: any[]): string[] {
    const actions: string[] = [];

    // Analyze query intent
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

  /**
   * Get chat statistics for a user
   */
  getUserChatStats(userId: string): {
    totalConversations: number;
    activeConversations: number;
    totalMessages: number;
    avgMessagesPerConversation: number;
  } {
    const userConversations = this.getUserConversations(userId);
    const activeConversations = userConversations.filter(c => c.status === 'active').length;
    let totalMessages = 0;

    userConversations.forEach(conv => {
      const messages = this.messages.get(conv.id) || [];
      totalMessages += messages.length;
    });

    return {
      totalConversations: userConversations.length,
      activeConversations,
      totalMessages,
      avgMessagesPerConversation: userConversations.length > 0 
        ? totalMessages / userConversations.length 
        : 0,
    };
  }

  /**
   * Update conversation title
   */
  updateConversationTitle(conversationId: string, title: string): void {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.title = title;
      conversation.updatedAt = new Date();
    }
  }

  /**
   * Add tags to conversation
   */
  addConversationTags(conversationId: string, tags: string[]): void {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      const existingTags = conversation.tags || [];
      conversation.tags = [...new Set([...existingTags, ...tags])];
      conversation.updatedAt = new Date();
    }
  }

  /**
   * Search conversations
   */
  searchConversations(userId: string, query: string): ChatConversation[] {
    const userConversations = this.getUserConversations(userId);
    const lowerQuery = query.toLowerCase();

    return userConversations.filter(conv => {
      // Search in title
      if (conv.title.toLowerCase().includes(lowerQuery)) {
        return true;
      }

      // Search in messages
      const messages = this.messages.get(conv.id) || [];
      return messages.some(msg => 
        msg.content.toLowerCase().includes(lowerQuery)
      );
    });
  }

  /**
   * Export conversation
   */
  exportConversation(conversationId: string): {
    conversation: ChatConversation;
    messages: ChatMessage[];
    exportedAt: Date;
  } {
    const conversation = this.conversations.get(conversationId);
    const messages = this.messages.get(conversationId) || [];

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    return {
      conversation,
      messages,
      exportedAt: new Date(),
    };
  }

  /**
   * Clear all data for a user (for testing/cleanup)
   */
  clearUserData(userId: string): void {
    const userConversations = this.getUserConversations(userId);
    userConversations.forEach(conv => {
      this.messages.delete(conv.id);
      this.conversations.delete(conv.id);
    });
    this.userContexts.delete(userId);
  }
}

// Export singleton instance
export const companyBrainChatService = new CompanyBrainChatService();
