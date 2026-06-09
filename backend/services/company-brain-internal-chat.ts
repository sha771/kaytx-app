/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';

/**
 * Company Brain Internal Chat Service
 * Team messaging system integrated with knowledge capture
 * Supports channels, direct messages, threads, and AI-powered features
 */

export interface ChatChannel {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  type: 'public' | 'private' | 'direct' | 'group';
  createdBy: string;
  members: string[];
  admins: string[];
  linkedProjectId?: string;
  linkedSOPId?: string;
  isArchived: boolean;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatConversation {
  id: string;
  organizationId: string;
  channelId?: string;
  type: 'direct' | 'group' | 'channel';
  participants: string[];
  createdBy: string;
  title?: string;
  lastMessageAt?: Date;
  lastMessagePreview?: string;
  isPinned: boolean;
  isArchived: boolean;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  organizationId: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  messageType: 'text' | 'image' | 'file' | 'code' | 'system';
  replyToId?: string;
  threadId?: string;
  mentions: string[];
  reactions: Array<{ emoji: string; userIds: string[] }>;
  attachments: Array<{ name: string; url: string; type: string; size: number }>;
  isEdited: boolean;
  editedAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  isPinned: boolean;
  embeddingVector?: number[];
  extractedKnowledge: Record<string, any>;
  linkedSOPId?: string;
  linkedProjectId?: string;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatThread {
  id: string;
  organizationId: string;
  channelId: string;
  parentMessageId: string;
  title?: string;
  participants: string[];
  messageCount: number;
  isResolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export class CompanyBrainInternalChatService {
  private openai: OpenAI;
  private channels: Map<string, ChatChannel> = new Map();
  private conversations: Map<string, ChatConversation> = new Map();
  private messages: Map<string, ChatMessage> = new Map();
  private threads: Map<string, ChatThread> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Create a new chat channel
   */
  async createChannel(channel: Omit<ChatChannel, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChatChannel> {
    const newChannel: ChatChannel = {
      ...channel,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.channels.set(newChannel.id, newChannel);
    await this.saveChannel(newChannel);

    return newChannel;
  }

  /**
   * Get channel by ID
   */
  async getChannel(channelId: string): Promise<ChatChannel | null> {
    return this.channels.get(channelId) || null;
  }

  /**
   * List channels for organization
   */
  async listChannels(organizationId: string, filters?: {
    type?: string;
    isArchived?: boolean;
  }): Promise<ChatChannel[]> {
    const channels = Array.from(this.channels.values()).filter(c => c.organizationId === organizationId);

    if (filters?.type) {
      return channels.filter(c => c.type === filters.type);
    }

    if (filters?.isArchived !== undefined) {
      return channels.filter(c => c.isArchived === filters.isArchived);
    }

    return channels;
  }

  /**
   * Update channel
   */
  async updateChannel(channelId: string, updates: Partial<ChatChannel>): Promise<ChatChannel> {
    const channel = this.channels.get(channelId);
    if (!channel) {
      throw new Error('Channel not found');
    }

    const updatedChannel = {
      ...channel,
      ...updates,
      updatedAt: new Date(),
    };

    this.channels.set(channelId, updatedChannel);
    await this.saveChannel(updatedChannel);

    return updatedChannel;
  }

  /**
   * Archive channel
   */
  async archiveChannel(channelId: string): Promise<void> {
    await this.updateChannel(channelId, { isArchived: true });
  }

  /**
   * Add member to channel
   */
  async addChannelMember(channelId: string, userId: string): Promise<void> {
    const channel = this.channels.get(channelId);
    if (!channel) {
      throw new Error('Channel not found');
    }

    if (!channel.members.includes(userId)) {
      channel.members.push(userId);
      await this.saveChannel(channel);
    }
  }

  /**
   * Remove member from channel
   */
  async removeChannelMember(channelId: string, userId: string): Promise<void> {
    const channel = this.channels.get(channelId);
    if (!channel) {
      throw new Error('Channel not found');
    }

    channel.members = channel.members.filter(m => m !== userId);
    await this.saveChannel(channel);
  }

  /**
   * Create a new conversation
   */
  async createConversation(conversation: Omit<ChatConversation, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChatConversation> {
    const newConversation: ChatConversation = {
      ...conversation,
      id: crypto.randomUUID(),
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
  async getConversation(conversationId: string): Promise<ChatConversation | null> {
    return this.conversations.get(conversationId) || null;
  }

  /**
   * List conversations for user
   */
  async listUserConversations(organizationId: string, userId: string): Promise<ChatConversation[]> {
    return Array.from(this.conversations.values()).filter(
      c => c.organizationId === organizationId && c.participants.includes(userId)
    );
  }

  /**
   * Send a message
   */
  async sendMessage(message: Omit<ChatMessage, 'id' | 'createdAt' | 'updatedAt' | 'embeddingVector' | 'extractedKnowledge'>): Promise<ChatMessage> {
    const newMessage: ChatMessage = {
      ...message,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      embeddingVector: [],
      extractedKnowledge: {},
    };

    // Generate embedding for semantic search
    newMessage.embeddingVector = await this.generateEmbedding(newMessage.content);

    // Extract knowledge from message
    newMessage.extractedKnowledge = await this.extractKnowledge(newMessage);

    // Auto-link to SOPs and projects
    const linkedResources = await this.autoLinkResources(newMessage);
    if (linkedResources.sopId) newMessage.linkedSOPId = linkedResources.sopId;
    if (linkedResources.projectId) newMessage.linkedProjectId = linkedResources.projectId;

    this.messages.set(newMessage.id, newMessage);
    await this.saveMessage(newMessage);

    // Update conversation
    const conversation = this.conversations.get(newMessage.conversationId);
    if (conversation) {
      conversation.lastMessageAt = newMessage.createdAt;
      conversation.lastMessagePreview = newMessage.content.substring(0, 100);
      conversation.updatedAt = new Date();
      await this.saveConversation(conversation);
    }

    return newMessage;
  }

  /**
   * Get message by ID
   */
  async getMessage(messageId: string): Promise<ChatMessage | null> {
    return this.messages.get(messageId) || null;
  }

  /**
   * Get messages for conversation
   */
  async getConversationMessages(conversationId: string, limit?: number, offset?: number): Promise<ChatMessage[]> {
    const messages = Array.from(this.messages.values())
      .filter(m => m.conversationId === conversationId && !m.isDeleted)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    if (offset) {
      messages.splice(0, offset);
    }

    if (limit) {
      return messages.slice(0, limit);
    }

    return messages;
  }

  /**
   * Edit message
   */
  async editMessage(messageId: string, newContent: string): Promise<ChatMessage> {
    const message = this.messages.get(messageId);
    if (!message) {
      throw new Error('Message not found');
    }

    message.content = newContent;
    message.isEdited = true;
    message.editedAt = new Date();
    message.updatedAt = new Date();

    // Regenerate embedding
    message.embeddingVector = await this.generateEmbedding(newContent);

    await this.saveMessage(message);

    return message;
  }

  /**
   * Delete message
   */
  async deleteMessage(messageId: string): Promise<void> {
    const message = this.messages.get(messageId);
    if (!message) {
      throw new Error('Message not found');
    }

    message.isDeleted = true;
    message.deletedAt = new Date();
    message.updatedAt = new Date();

    await this.saveMessage(message);
  }

  /**
   * Add reaction to message
   */
  async addReaction(messageId: string, emoji: string, userId: string): Promise<void> {
    const message = this.messages.get(messageId);
    if (!message) {
      throw new Error('Message not found');
    }

    const existingReaction = message.reactions.find(r => r.emoji === emoji);
    if (existingReaction) {
      if (!existingReaction.userIds.includes(userId)) {
        existingReaction.userIds.push(userId);
      }
    } else {
      message.reactions.push({ emoji, userIds: [userId] });
    }

    message.updatedAt = new Date();
    await this.saveMessage(message);
  }

  /**
   * Remove reaction from message
   */
  async removeReaction(messageId: string, emoji: string, userId: string): Promise<void> {
    const message = this.messages.get(messageId);
    if (!message) {
      throw new Error('Message not found');
    }

    const reaction = message.reactions.find(r => r.emoji === emoji);
    if (reaction) {
      reaction.userIds = reaction.userIds.filter(id => id !== userId);
      if (reaction.userIds.length === 0) {
        message.reactions = message.reactions.filter(r => r.emoji !== emoji);
      }
    }

    message.updatedAt = new Date();
    await this.saveMessage(message);
  }

  /**
   * Pin message
   */
  async pinMessage(messageId: string): Promise<void> {
    const message = this.messages.get(messageId);
    if (!message) {
      throw new Error('Message not found');
    }

    message.isPinned = !message.isPinned;
    message.updatedAt = new Date();
    await this.saveMessage(message);
  }

  /**
   * Create thread from message
   */
  async createThread(thread: Omit<ChatThread, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChatThread> {
    const newThread: ChatThread = {
      ...thread,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.threads.set(newThread.id, newThread);
    await this.saveThread(newThread);

    return newThread;
  }

  /**
   * Get thread by ID
   */
  async getThread(threadId: string): Promise<ChatThread | null> {
    return this.threads.get(threadId) || null;
  }

  /**
   * Get thread messages
   */
  async getThreadMessages(threadId: string): Promise<ChatMessage[]> {
    return Array.from(this.messages.values())
      .filter(m => m.threadId === threadId && !m.isDeleted)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  /**
   * Resolve thread
   */
  async resolveThread(threadId: string, resolvedBy: string): Promise<void> {
    const thread = this.threads.get(threadId);
    if (!thread) {
      throw new Error('Thread not found');
    }

    thread.isResolved = true;
    thread.resolvedBy = resolvedBy;
    thread.resolvedAt = new Date();
    thread.updatedAt = new Date();

    await this.saveThread(thread);
  }

  /**
   * Search messages
   */
  async searchMessages(organizationId: string, query: string, filters?: {
    conversationId?: string;
    channelId?: string;
    senderId?: string;
  }): Promise<ChatMessage[]> {
    const messages = Array.from(this.messages.values())
      .filter(m => m.organizationId === organizationId && !m.isDeleted);

    // Apply filters
    let filtered = messages;
    if (filters?.conversationId) {
      filtered = filtered.filter(m => m.conversationId === filters.conversationId);
    }
    if (filters?.senderId) {
      filtered = filtered.filter(m => m.senderId === filters.senderId);
    }

    // Simple text search (in production, use vector search)
    const queryLower = query.toLowerCase();
    const results = filtered.filter(m => 
      m.content.toLowerCase().includes(queryLower) ||
      m.senderName.toLowerCase().includes(queryLower)
    );

    return results;
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
   * Extract knowledge from message
   */
  private async extractKnowledge(message: ChatMessage): Promise<Record<string, any>> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Extract key knowledge from this chat message. Return JSON with: topics (array), entities (array), actionItems (array), decisions (array).',
          },
          {
            role: 'user',
            content: message.content,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      return JSON.parse(completion.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error extracting knowledge:', error);
      return {};
    }
  }

  /**
   * Auto-link to SOPs and projects
   */
  private async autoLinkResources(message: ChatMessage): Promise<{ sopId?: string; projectId?: string }> {
    // In production, use vector search to find relevant SOPs and projects
    return {};
  }

  /**
   * Save channel to database
   */
  private async saveChannel(channel: ChatChannel): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving channel:', channel.id);
  }

  /**
   * Save conversation to database
   */
  private async saveConversation(conversation: ChatConversation): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving conversation:', conversation.id);
  }

  /**
   * Save message to database
   */
  private async saveMessage(message: ChatMessage): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving message:', message.id);
  }

  /**
   * Save thread to database
   */
  private async saveThread(thread: ChatThread): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving thread:', thread.id);
  }

  /**
   * Get chat statistics
   */
  async getChatStatistics(organizationId: string): Promise<{
    totalChannels: number;
    totalConversations: number;
    totalMessages: number;
    totalThreads: number;
    activeUsers: number;
  }> {
    const channels = Array.from(this.channels.values()).filter(c => c.organizationId === organizationId);
    const conversations = Array.from(this.conversations.values()).filter(c => c.organizationId === organizationId);
    const messages = Array.from(this.messages.values()).filter(m => m.organizationId === organizationId);
    const threads = Array.from(this.threads.values()).filter(t => t.organizationId === organizationId);

    const activeUsers = new Set<string>();
    conversations.forEach(c => c.participants.forEach(p => activeUsers.add(p)));

    return {
      totalChannels: channels.length,
      totalConversations: conversations.length,
      totalMessages: messages.length,
      totalThreads: threads.length,
      activeUsers: activeUsers.size,
    };
  }
}

// Export singleton instance
export const companyBrainInternalChatService = new CompanyBrainInternalChatService();
