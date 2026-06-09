/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { WebClient } from '@slack/web-api';
import { knowledgeExtractionService } from '../services/company-brain-extraction';

/**
 * Slack Integration Service for Company Brain
 * Captures Slack messages and extracts knowledge from them
 */

export interface SlackMessage {
  text: string;
  user: string;
  timestamp: string;
  channel: string;
  team: string;
  thread_ts?: string;
  reply_count?: number;
}

export interface SlackChannel {
  id: string;
  name: string;
  is_private: boolean;
  is_archived: boolean;
  topic?: string;
  purpose?: string;
}

export interface SlackConfig {
  botToken: string;
  signingSecret: string;
  workspaceId: string;
  channels: string[];
  excludeChannels?: string[];
  captureThreads: boolean;
  minMessageLength: number;
}

export class SlackIntegrationService {
  private client: WebClient | null = null;
  private config: SlackConfig | null = null;
  private isInitialized = false;

  /**
   * Initialize Slack integration
   */
  async initialize(config: SlackConfig): Promise<void> {
    this.config = config;
    this.client = new WebClient(config.botToken);
    this.isInitialized = true;

    // Verify connection
    try {
      const auth = await this.client.auth.test();
      console.log(`Slack integration initialized for workspace: ${auth.team}`);
    } catch (error) {
      console.error('Failed to initialize Slack integration:', error);
      throw new Error('Slack authentication failed');
    }
  }

  /**
   * Get all accessible channels
   */
  async getChannels(): Promise<SlackChannel[]> {
    if (!this.client || !this.isInitialized) {
      throw new Error('Slack integration not initialized');
    }

    try {
      const result = await this.client.conversations.list({
        types: 'public_channel,private_channel',
        limit: 1000,
      });

      return result.channels?.map((channel) => ({
        id: channel.id!,
        name: channel.name!,
        is_private: channel.is_private!,
        is_archived: channel.is_archived!,
        topic: channel.topic?.value,
        purpose: channel.purpose?.value,
      })) || [];
    } catch (error) {
      console.error('Error fetching Slack channels:', error);
      throw new Error('Failed to fetch channels');
    }
  }

  /**
   * Get messages from a channel
   */
  async getChannelMessages(
    channelId: string,
    options: {
      limit?: number;
      oldest?: string;
      latest?: string;
      inclusive?: boolean;
    } = {}
  ): Promise<SlackMessage[]> {
    if (!this.client || !this.isInitialized) {
      throw new Error('Slack integration not initialized');
    }

    try {
      const result = await this.client.conversations.history({
        channel: channelId,
        limit: options.limit || 100,
        oldest: options.oldest,
        latest: options.latest,
        inclusive: options.inclusive || false,
      });

      const messages: SlackMessage[] = [];

      for (const message of result.messages || []) {
        if (message.subtype || !message.text) continue; // Skip bot messages and messages without text

        const slackMessage: SlackMessage = {
          text: message.text,
          user: message.user!,
          timestamp: message.ts!,
          channel: channelId,
          team: this.config!.workspaceId,
          thread_ts: message.thread_ts,
          reply_count: message.reply_count,
        };

        // Fetch thread replies if enabled
        if (this.config!.captureThreads && message.thread_ts && message.reply_count && message.reply_count > 0) {
          const replies = await this.getThreadReplies(channelId, message.thread_ts);
          messages.push(...replies);
        }

        messages.push(slackMessage);
      }

      return messages;
    } catch (error) {
      console.error('Error fetching channel messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }

  /**
   * Get thread replies
   */
  async getThreadReplies(channelId: string, threadTs: string): Promise<SlackMessage[]> {
    if (!this.client || !this.isInitialized) {
      throw new Error('Slack integration not initialized');
    }

    try {
      const result = await this.client.conversations.replies({
        channel: channelId,
        ts: threadTs,
      });

      return (result.messages || [])
        .filter((msg) => !msg.subtype && msg.text)
        .map((message) => ({
          text: message.text!,
          user: message.user!,
          timestamp: message.ts!,
          channel: channelId,
          team: this.config!.workspaceId,
          thread_ts: threadTs,
        }));
    } catch (error) {
      console.error('Error fetching thread replies:', error);
      return [];
    }
  }

  /**
   * Capture and extract knowledge from configured channels
   */
  async captureKnowledge(): Promise<{
    totalMessages: number;
    extractedKnowledge: number;
    errors: number;
  }> {
    if (!this.client || !this.isInitialized) {
      throw new Error('Slack integration not initialized');
    }

    let totalMessages = 0;
    let extractedKnowledge = 0;
    let errors = 0;

    const channels = this.config!.channels;

    for (const channelId of channels) {
      try {
        const messages = await this.getChannelMessages(channelId, { limit: 1000 });
        totalMessages += messages.length;

        // Filter messages by minimum length
        const filteredMessages = messages.filter(
          (msg) => msg.text.length >= this.config!.minMessageLength
        );

        // Extract knowledge from messages
        const knowledge = await knowledgeExtractionService.extractFromSlackMessages(filteredMessages);
        extractedKnowledge += knowledge.length;

        // Store knowledge nodes (implementation depends on your database layer)
        for (const k of knowledge) {
          await this.storeKnowledgeNode(k, channelId);
        }
      } catch (error) {
        console.error(`Error capturing knowledge from channel ${channelId}:`, error);
        errors++;
      }
    }

    return {
      totalMessages,
      extractedKnowledge,
      errors,
    };
  }

  /**
   * Store a knowledge node (placeholder - implement based on your database)
   */
  private async storeKnowledgeNode(knowledge: any, channelId: string): Promise<void> {
    // This is a placeholder - implement based on your database schema
    console.log(`Storing knowledge node from channel ${channelId}:`, knowledge.title);
    // In production, this would insert into your knowledge_nodes table
  }

  /**
   * Set up event subscription for real-time message capture
   */
  async setupEventSubscription(endpointUrl: string): Promise<void> {
    if (!this.client || !this.isInitialized) {
      throw new Error('Slack integration not initialized');
    }

    try {
      // Subscribe to message events
      await this.client.apps.event.subscriptions.create({
        event_types: ['message'],
        url: endpointUrl,
      });

      console.log('Slack event subscription set up successfully');
    } catch (error) {
      console.error('Error setting up event subscription:', error);
      throw new Error('Failed to set up event subscription');
    }
  }

  /**
   * Handle incoming Slack event (webhook)
   */
  async handleEvent(event: any): Promise<void> {
    if (event.type === 'message' && !event.subtype) {
      const message: SlackMessage = {
        text: event.text,
        user: event.user,
        timestamp: event.ts,
        channel: event.channel,
        team: event.team,
        thread_ts: event.thread_ts,
        reply_count: event.reply_count,
      };

      // Check if message meets minimum length requirement
      if (message.text.length >= (this.config?.minMessageLength || 50)) {
        try {
          const knowledge = await knowledgeExtractionService.extractFromSlackMessages([message]);
          
          for (const k of knowledge) {
            await this.storeKnowledgeNode(k, event.channel);
          }
        } catch (error) {
          console.error('Error extracting knowledge from event:', error);
        }
      }
    }
  }

  /**
   * Send a message to a channel
   */
  async sendMessage(channelId: string, text: string): Promise<void> {
    if (!this.client || !this.isInitialized) {
      throw new Error('Slack integration not initialized');
    }

    try {
      await this.client.chat.postMessage({
        channel: channelId,
        text,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  /**
   * Post a knowledge summary to a channel
   */
  async postKnowledgeSummary(channelId: string, knowledge: any[]): Promise<void> {
    if (!this.client || !this.isInitialized) {
      throw new Error('Slack integration not initialized');
    }

    const summary = knowledge
      .slice(0, 5)
      .map((k, i) => `${i + 1}. ${k.title}`)
      .join('\n');

    const message = `🧠 *Knowledge Captured*\n\n${summary}\n\n_Extracted from Slack messages_`;

    await this.sendMessage(channelId, message);
  }

  /**
   * Get user information
   */
  async getUserInfo(userId: string): Promise<any> {
    if (!this.client || !this.isInitialized) {
      throw new Error('Slack integration not initialized');
    }

    try {
      const result = await this.client.users.info({ user: userId });
      return result.user;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  }

  /**
   * Verify Slack signature (for webhook security)
   */
  verifySignature(
    body: string,
    signature: string,
    timestamp: string
  ): boolean {
    if (!this.config) {
      return false;
    }

    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', this.config.signingSecret);
    hmac.update(`v0:${timestamp}:${body}`);
    const digest = hmac.digest('hex');
    const expectedSignature = `v0=${digest}`;

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  /**
   * Disconnect integration
   */
  async disconnect(): Promise<void> {
    this.client = null;
    this.config = null;
    this.isInitialized = false;
    console.log('Slack integration disconnected');
  }

  /**
   * Get integration status
   */
  getStatus(): {
    initialized: boolean;
    workspaceId?: string;
    channelsConfigured: number;
  } {
    return {
      initialized: this.isInitialized,
      workspaceId: this.config?.workspaceId,
      channelsConfigured: this.config?.channels.length || 0,
    };
  }
}

// Export singleton instance
export const slackIntegrationService = new SlackIntegrationService();
