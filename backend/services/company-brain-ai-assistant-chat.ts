/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';

/**
 * Company Brain AI Assistant Chat Service
 * Chat with Company Brain AI for knowledge retrieval and assistance
 * Supports multiple assistant types: knowledge, onboarding, expertise, project
 */

export interface AIConversation {
  id: string;
  organizationId: string;
  userId: string;
  assistantType: 'knowledge' | 'onboarding' | 'expertise' | 'project';
  title?: string;
  context: Record<string, any>;
  messageCount: number;
  lastMessageAt?: Date;
  isArchived: boolean;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIMessage {
  id: string;
  organizationId: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  sources: Array<{
    type: string;
    id: string;
    title: string;
    relevance: number;
  }>;
  confidence: number;
  tokensUsed: number;
  modelUsed: string;
  embeddingVector?: number[];
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface AIChatResponse {
  message: AIMessage;
  sources: Array<{
    type: string;
    id: string;
    title: string;
    relevance: number;
  }>;
  confidence: number;
  followUpQuestions: string[];
  relatedTopics: string[];
}

export class CompanyBrainAIAssistantChatService {
  private openai: OpenAI;
  private conversations: Map<string, AIConversation> = new Map();
  private messages: Map<string, AIMessage> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Create a new AI conversation
   */
  async createConversation(conversation: Omit<AIConversation, 'id' | 'messageCount' | 'createdAt' | 'updatedAt'>): Promise<AIConversation> {
    const newConversation: AIConversation = {
      ...conversation,
      id: crypto.randomUUID(),
      messageCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.conversations.set(newConversation.id, newConversation);
    await this.saveConversation(newConversation);

    return newConversation;
  }

  /**
   * Get conversation by ID
   */
  async getConversation(conversationId: string): Promise<AIConversation | null> {
    return this.conversations.get(conversationId) || null;
  }

  /**
   * List conversations for user
   */
  async listUserConversations(organizationId: string, userId: string, assistantType?: string): Promise<AIConversation[]> {
    const conversations = Array.from(this.conversations.values())
      .filter(c => c.organizationId === organizationId && c.userId === userId && !c.isArchived);

    if (assistantType) {
      return conversations.filter(c => c.assistantType === assistantType);
    }

    return conversations.sort((a, b) => (b.lastMessageAt?.getTime() || 0) - (a.lastMessageAt?.getTime() || 0));
  }

  /**
   * Send message to AI assistant
   */
  async sendMessage(conversationId: string, userMessage: string): Promise<AIChatResponse> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // Create user message
    const userAIMessage: AIMessage = {
      id: crypto.randomUUID(),
      organizationId: conversation.organizationId,
      conversationId,
      role: 'user',
      content: userMessage,
      sources: [],
      confidence: 1,
      tokensUsed: 0,
      modelUsed: '',
      embeddingVector: await this.generateEmbedding(userMessage),
      metadata: {},
      createdAt: new Date(),
    };

    this.messages.set(userAIMessage.id, userAIMessage);
    await this.saveMessage(userAIMessage);

    // Get conversation history
    const history = await this.getConversationMessages(conversationId, 10);

    // Generate AI response
    const response = await this.generateAIResponse(conversation, userMessage, history);

    // Create assistant message
    const assistantMessage: AIMessage = {
      id: crypto.randomUUID(),
      organizationId: conversation.organizationId,
      conversationId,
      role: 'assistant',
      content: response.answer,
      sources: response.sources,
      confidence: response.confidence,
      tokensUsed: response.tokensUsed,
      modelUsed: response.modelUsed,
      embeddingVector: await this.generateEmbedding(response.answer),
      metadata: {},
      createdAt: new Date(),
    };

    this.messages.set(assistantMessage.id, assistantMessage);
    await this.saveMessage(assistantMessage);

    // Update conversation
    conversation.messageCount += 2;
    conversation.lastMessageAt = assistantMessage.createdAt;
    conversation.updatedAt = new Date();
    await this.saveConversation(conversation);

    return {
      message: assistantMessage,
      sources: response.sources,
      confidence: response.confidence,
      followUpQuestions: response.followUpQuestions,
      relatedTopics: response.relatedTopics,
    };
  }

  /**
   * Generate AI response based on assistant type
   */
  private async generateAIResponse(
    conversation: AIConversation,
    userMessage: string,
    history: AIMessage[]
  ): Promise<{
    answer: string;
    sources: Array<{ type: string; id: string; title: string; relevance: number }>;
    confidence: number;
    tokensUsed: number;
    modelUsed: string;
    followUpQuestions: string[];
    relatedTopics: string[];
  }> {
    const systemPrompt = this.getSystemPrompt(conversation.assistantType);

    // Build messages array
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-10).map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: userMessage },
    ];

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      });

      const answer = completion.choices[0].message.content || '';
      const tokensUsed = completion.usage?.total_tokens || 0;
      const modelUsed = completion.model;

      // Search for relevant knowledge sources
      const sources = await this.searchKnowledgeSources(conversation.organizationId, userMessage);

      // Generate follow-up questions
      const followUpQuestions = await this.generateFollowUpQuestions(userMessage, answer);

      // Extract related topics
      const relatedTopics = await this.extractRelatedTopics(answer);

      return {
        answer,
        sources,
        confidence: 0.85,
        tokensUsed,
        modelUsed,
        followUpQuestions,
        relatedTopics,
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      return {
        answer: 'I apologize, but I encountered an error processing your request. Please try again.',
        sources: [],
        confidence: 0,
        tokensUsed: 0,
        modelUsed: 'gpt-4-turbo-preview',
        followUpQuestions: [],
        relatedTopics: [],
      };
    }
  }

  /**
   * Get system prompt based on assistant type
   */
  private getSystemPrompt(assistantType: string): string {
    switch (assistantType) {
      case 'knowledge':
        return `You are a knowledgeable Company Brain assistant. Help users find information from the company's knowledge base, including SOPs, project histories, decisions, and expertise profiles. Provide accurate, well-sourced answers with citations.`;
      
      case 'onboarding':
        return `You are a helpful onboarding assistant for new employees. Guide them through company processes, help them find resources, introduce them to team members, and answer questions about company culture and workflows. Be friendly and patient.`;
      
      case 'expertise':
        return `You are an expertise discovery assistant. Help users find internal experts by skill, project, or domain. Provide recommendations for mentorship and collaboration based on expertise profiles.`;
      
      case 'project':
        return `You are a project intelligence assistant. Help users understand project histories, decisions made, contributors involved, and related projects. Provide context and insights from project timelines.`;
      
      default:
        return `You are a helpful Company Brain assistant. Assist users with their questions about company knowledge, processes, and information.`;
    }
  }

  /**
   * Search knowledge sources
   */
  private async searchKnowledgeSources(
    organizationId: string,
    query: string
  ): Promise<Array<{ type: string; id: string; title: string; relevance: number }>> {
    // In production, perform vector search across SOPs, projects, chat logs, etc.
    return [];
  }

  /**
   * Generate follow-up questions
   */
  private async generateFollowUpQuestions(userMessage: string, answer: string): Promise<string[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Generate 3-5 relevant follow-up questions based on the user question and AI response. Return as JSON array of strings.',
          },
          {
            role: 'user',
            content: `User Question: ${userMessage}\nAI Response: ${answer}`,
          },
        ],
        temperature: 0.5,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result.questions || [];
    } catch (error) {
      console.error('Error generating follow-up questions:', error);
      return [];
    }
  }

  /**
   * Extract related topics
   */
  private async extractRelatedTopics(text: string): Promise<string[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Extract 3-5 key topics from the text. Return as JSON array of strings.',
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result.topics || [];
    } catch (error) {
      console.error('Error extracting topics:', error);
      return [];
    }
  }

  /**
   * Get messages for conversation
   */
  async getConversationMessages(conversationId: string, limit?: number): Promise<AIMessage[]> {
    const messages = Array.from(this.messages.values())
      .filter(m => m.conversationId === conversationId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    if (limit) {
      return messages.slice(-limit);
    }

    return messages;
  }

  /**
   * Delete message
   */
  async deleteMessage(messageId: string): Promise<void> {
    this.messages.delete(messageId);
    // In production, delete from database
  }

  /**
   * Archive conversation
   */
  async archiveConversation(conversationId: string): Promise<void> {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.isArchived = true;
      conversation.updatedAt = new Date();
      await this.saveConversation(conversation);
    }
  }

  /**
   * Delete conversation
   */
  async deleteConversation(conversationId: string): Promise<void> {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      // Delete all messages
      const messages = await this.getConversationMessages(conversationId);
      for (const message of messages) {
        this.messages.delete(message.id);
      }
      // Delete conversation
      this.conversations.delete(conversationId);
      // In production, delete from database
    }
  }

  /**
   * Generate embedding
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      return [];
    }
  }

  /**
   * Save conversation to database
   */
  private async saveConversation(conversation: AIConversation): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving AI conversation:', conversation.id);
  }

  /**
   * Save message to database
   */
  private async saveMessage(message: AIMessage): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving AI message:', message.id);
  }

  /**
   * Get chat statistics
   */
  async getChatStatistics(organizationId: string): Promise<{
    totalConversations: number;
    totalMessages: number;
    conversationsByType: Record<string, number>;
    avgMessagesPerConversation: number;
    totalTokensUsed: number;
  }> {
    const conversations = Array.from(this.conversations.values()).filter(c => c.organizationId === organizationId);
    const messages = Array.from(this.messages.values()).filter(m => m.organizationId === organizationId);

    const conversationsByType: Record<string, number> = {};
    conversations.forEach(c => {
      conversationsByType[c.assistantType] = (conversationsByType[c.assistantType] || 0) + 1;
    });

    const totalTokensUsed = messages.reduce((sum, m) => sum + m.tokensUsed, 0);
    const avgMessagesPerConversation = conversations.length > 0 ? messages.length / conversations.length : 0;

    return {
      totalConversations: conversations.length,
      totalMessages: messages.length,
      conversationsByType,
      avgMessagesPerConversation,
      totalTokensUsed,
    };
  }
}

// Export singleton instance
export const companyBrainAIAssistantChatService = new CompanyBrainAIAssistantChatService();
