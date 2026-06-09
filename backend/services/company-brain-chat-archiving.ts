/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';

/**
 * Company Brain Chat Archiving Service
 * Continuous capture and indexing of Slack/Teams chat logs
 * Captures team problem-solving and the "why" behind decisions
 */

export interface ChatLog {
  id: string;
  organizationId: string;
  platform: 'slack' | 'teams' | 'discord';
  channelId: string;
  channelName: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  threadId?: string;
  replyCount: number;
  reactions: Array<{ emoji: string; users: string[]; count: number }>;
  attachments: Array<{ url: string; name: string; type: string }>;
  mentions: string[];
  embeddingVector?: number[];
  extractedKnowledge: {
    topics: string[];
    decisions: string[];
    actionItems: string[];
    sentiment: string;
    importance: number;
  };
  createdAt: Date;
}

export interface ChatArchivingConfig {
  organizationId: string;
  platforms: {
    slack?: {
      enabled: boolean;
      token: string;
      channels: string[];
      includePrivate: boolean;
    };
    teams?: {
      enabled: boolean;
      token: string;
      channels: string[];
    };
    discord?: {
      enabled: boolean;
      token: string;
      channels: string[];
    };
  };
  retentionDays: number;
  autoExtractKnowledge: boolean;
  enableRealtime: boolean;
}

export interface ChatSearchResult {
  log: ChatLog;
  score: number;
  highlights: string[];
}

export class CompanyBrainChatArchivingService {
  private openai: OpenAI;
  private configs: Map<string, ChatArchivingConfig> = new Map();
  private activeStreams: Map<string, any> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Configure chat archiving for an organization
   */
  configureArchiving(config: ChatArchivingConfig): void {
    this.configs.set(config.organizationId, config);
  }

  /**
   * Get configuration for an organization
   */
  getConfig(organizationId: string): ChatArchivingConfig | undefined {
    return this.configs.get(organizationId);
  }

  /**
   * Start real-time chat archiving
   */
  async startRealtimeArchiving(organizationId: string): Promise<void> {
    const config = this.configs.get(organizationId);
    if (!config) {
      throw new Error('No configuration found for organization');
    }

    if (config.platforms.slack?.enabled) {
      await this.startSlackArchiving(organizationId, config.platforms.slack);
    }

    if (config.platforms.teams?.enabled) {
      await this.startTeamsArchiving(organizationId, config.platforms.teams);
    }

    if (config.platforms.discord?.enabled) {
      await this.startDiscordArchiving(organizationId, config.platforms.discord);
    }
  }

  /**
   * Stop real-time chat archiving
   */
  stopRealtimeArchiving(organizationId: string): void {
    const stream = this.activeStreams.get(organizationId);
    if (stream) {
      // Close the stream
      stream.close();
      this.activeStreams.delete(organizationId);
    }
  }

  /**
   * Start Slack archiving
   */
  private async startSlackArchiving(organizationId: string, config: any): Promise<void> {
    // In production, this would use the Slack RTM API or Events API
    console.log(`Starting Slack archiving for ${organizationId}`);
    
    // Mock implementation - in production, connect to Slack API
    const stream = {
      close: () => console.log('Slack stream closed'),
    };
    
    this.activeStreams.set(`${organizationId}-slack`, stream);
  }

  /**
   * Start Teams archiving
   */
  private async startTeamsArchiving(organizationId: string, config: any): Promise<void> {
    // In production, this would use Microsoft Graph API
    console.log(`Starting Teams archiving for ${organizationId}`);
    
    const stream = {
      close: () => console.log('Teams stream closed'),
    };
    
    this.activeStreams.set(`${organizationId}-teams`, stream);
  }

  /**
   * Start Discord archiving
   */
  private async startDiscordArchiving(organizationId: string, config: any): Promise<void> {
    // In production, this would use Discord.js
    console.log(`Starting Discord archiving for ${organizationId}`);
    
    const stream = {
      close: () => console.log('Discord stream closed'),
    };
    
    this.activeStreams.set(`${organizationId}-discord`, stream);
  }

  /**
   * Process and save a chat message
   */
  async processMessage(
    organizationId: string,
    platform: 'slack' | 'teams' | 'discord',
    messageData: any
  ): Promise<ChatLog> {
    const config = this.configs.get(organizationId);
    
    const chatLog: ChatLog = {
      id: crypto.randomUUID(),
      organizationId,
      platform,
      channelId: messageData.channelId,
      channelName: messageData.channelName,
      userId: messageData.userId,
      userName: messageData.userName,
      message: messageData.message,
      timestamp: new Date(messageData.timestamp),
      threadId: messageData.threadId,
      replyCount: messageData.replyCount || 0,
      reactions: messageData.reactions || [],
      attachments: messageData.attachments || [],
      mentions: messageData.mentions || [],
      extractedKnowledge: {
        topics: [],
        decisions: [],
        actionItems: [],
        sentiment: 'neutral',
        importance: 0,
      },
      createdAt: new Date(),
    };

    // Extract knowledge if enabled
    if (config?.autoExtractKnowledge) {
      chatLog.extractedKnowledge = await this.extractKnowledge(chatLog.message);
    }

    // Generate embedding for search
    if (chatLog.extractedKnowledge.importance > 0.5) {
      chatLog.embeddingVector = await this.generateEmbedding(chatLog.message);
    }

    // Save to database (in production)
    await this.saveChatLog(chatLog);

    return chatLog;
  }

  /**
   * Extract knowledge from a message
   */
  private async extractKnowledge(message: string): Promise<ChatLog['extractedKnowledge']> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract knowledge from the chat message. Identify:
            - Topics discussed
            - Decisions made
            - Action items
            - Sentiment (positive, negative, neutral)
            - Importance score (0-1)

            Return as JSON.`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      return {
        topics: result.topics || [],
        decisions: result.decisions || [],
        actionItems: result.actionItems || [],
        sentiment: result.sentiment || 'neutral',
        importance: result.importance || 0,
      };
    } catch (error) {
      console.error('Error extracting knowledge:', error);
      return {
        topics: [],
        decisions: [],
        actionItems: [],
        sentiment: 'neutral',
        importance: 0,
      };
    }
  }

  /**
   * Generate embedding for a message
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
   * Save chat log to database
   */
  private async saveChatLog(chatLog: ChatLog): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving chat log:', chatLog.id);
  }

  /**
   * Search chat logs
   */
  async searchChatLogs(
    organizationId: string,
    query: string,
    filters?: {
      platform?: 'slack' | 'teams' | 'discord';
      channelId?: string;
      userId?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<ChatSearchResult[]> {
    // In production, perform vector search with filters
    console.log(`Searching chat logs for ${organizationId}: ${query}`);
    
    // Mock results
    return [];
  }

  /**
   * Get chat logs for a channel
   */
  async getChannelLogs(
    organizationId: string,
    channelId: string,
    platform: 'slack' | 'teams' | 'discord',
    limit: number = 100,
    offset: number = 0
  ): Promise<ChatLog[]> {
    // In production, query database
    console.log(`Getting logs for channel ${channelId}`);
    
    return [];
  }

  /**
   * Get chat logs for a user
   */
  async getUserLogs(
    organizationId: string,
    userId: string,
    platform?: 'slack' | 'teams' | 'discord',
    limit: number = 100
  ): Promise<ChatLog[]> {
    // In production, query database
    console.log(`Getting logs for user ${userId}`);
    
    return [];
  }

  /**
   * Get chat statistics
   */
  async getChatStatistics(organizationId: string): Promise<{
    totalMessages: number;
    messagesByPlatform: Record<string, number>;
    messagesByChannel: Record<string, number>;
    topContributors: Array<{ userId: string; userName: string; count: number }>;
    knowledgeExtracted: number;
    decisionsCaptured: number;
    actionItemsCaptured: number;
  }> {
    // In production, query database
    return {
      totalMessages: 0,
      messagesByPlatform: {},
      messagesByChannel: {},
      topContributors: [],
      knowledgeExtracted: 0,
      decisionsCaptured: 0,
      actionItemsCaptured: 0,
    };
  }

  /**
   * Batch import historical chat logs
   */
  async batchImport(
    organizationId: string,
    platform: 'slack' | 'teams' | 'discord',
    messages: any[]
  ): Promise<{ imported: number; failed: number }> {
    let imported = 0;
    let failed = 0;

    for (const message of messages) {
      try {
        await this.processMessage(organizationId, platform, message);
        imported++;
      } catch (error) {
        console.error('Error importing message:', error);
        failed++;
      }
    }

    return { imported, failed };
  }

  /**
   * Delete old chat logs based on retention policy
   */
  async applyRetentionPolicy(organizationId: string): Promise<number> {
    const config = this.configs.get(organizationId);
    if (!config) {
      throw new Error('No configuration found');
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - config.retentionDays);

    // In production, delete from database
    console.log(`Deleting logs older than ${cutoffDate}`);
    
    return 0;
  }

  /**
   * Export chat logs
   */
  async exportChatLogs(
    organizationId: string,
    filters?: {
      platform?: 'slack' | 'teams' | 'discord';
      channelId?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<ChatLog[]> {
    // In production, query and export
    return [];
  }
}

// Export singleton instance
export const companyBrainChatArchivingService = new CompanyBrainChatArchivingService();
