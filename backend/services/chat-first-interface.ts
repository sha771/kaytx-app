import { createLogger } from '../lib/production-logger';
import { logAudit } from '../lib/audit';
import crypto from 'crypto';
import { EventEmitter } from 'events';
import { db } from '../db/connection';
import {
  chatPlatformConnections,
  chatMessages,
  chatPlatformWebhooks,
  chatUserMappings,
  chatChannelMappings,
} from '../db/drizzle-schema';
import { eq, and, desc, inArray } from 'drizzle-orm';
import { WebClient as SlackClient } from '@slack/web-api';
import { Client as WhatsAppClient } from 'whatsapp-web.js';
import { persistentPersonalMemory } from './persistent-personal-memory';

const logger = createLogger('ChatFirstInterface');

/**
 * Supported Chat Platforms
 */
export type ChatPlatform = 'slack' | 'teams' | 'whatsapp' | 'discord' | 'telegram';

/**
 * Message Types
 */
export type MessageType = 'text' | 'image' | 'file' | 'audio' | 'video' | 'reaction' | 'thread' | 'command';

/**
 * Platform Connection Status
 */
export type ConnectionStatus = 'connected' | 'disconnected' | 'error' | 'pending';

/**
 * Platform Connection Configuration
 */
export interface PlatformConnection {
  id: string;
  agentId: string;
  organizationId: string;
  platform: ChatPlatform;
  status: ConnectionStatus;
  credentials: {
    botToken?: string;
    appToken?: string;
    signingSecret?: string;
    apiKey?: string;
    webhookUrl?: string;
    phoneNumber?: string;
    sessionData?: string;
  };
  settings: {
    autoReply: boolean;
    replyDelayMs: number;
    mentionRequired: boolean;
    allowedChannels?: string[];
    allowedUsers?: string[];
    blockedUsers?: string[];
    welcomeMessage?: string;
    farewellMessage?: string;
    commandPrefix: string;
    maxMessageLength: number;
    threadDepth: number;
  };
  webhooks: {
    incoming: string;
    outgoing?: string;
  };
  stats: {
    messagesReceived: number;
    messagesSent: number;
    errors: number;
    lastMessageAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Chat Message
 */
export interface ChatMessage {
  id: string;
  platform: ChatPlatform;
  connectionId: string;
  externalId: string; // Platform-specific message ID
  externalThreadId?: string;
  channelId: string;
  channelName?: string;
  userId: string;
  externalUserId: string;
  userName: string;
  userAvatar?: string;
  type: MessageType;
  content: string;
  attachments?: {
    type: string;
    url: string;
    name: string;
    size?: number;
  }[];
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
  replyTo?: string;
  mentions: string[];
  isDirectMessage: boolean;
  timestamp: Date;
  metadata: Record<string, unknown>;
  processed: boolean;
  agentResponse?: string;
  responseTime?: number;
}

/**
 * User Mapping
 */
export interface ChatUserMapping {
  id: string;
  platform: ChatPlatform;
  externalUserId: string;
  internalUserId?: string;
  organizationId: string;
  userName: string;
  userEmail?: string;
  profile?: Record<string, unknown>;
  preferences?: {
    notificationLevel: 'all' | 'mentions' | 'none';
    language?: string;
    timezone?: string;
  };
  firstSeen: Date;
  lastSeen: Date;
  messageCount: number;
}

/**
 * Channel Mapping
 */
export interface ChatChannelMapping {
  id: string;
  platform: ChatPlatform;
  externalChannelId: string;
  internalChannelId?: string;
  organizationId: string;
  channelName: string;
  channelType: 'public' | 'private' | 'dm';
  settings?: {
    autoJoin: boolean;
    requireApproval: boolean;
    allowedCommands: string[];
  };
  memberCount: number;
  createdAt: Date;
}

/**
 * Platform Command
 */
export interface PlatformCommand {
  name: string;
  description: string;
  syntax: string;
  parameters: {
    name: string;
    required: boolean;
    type: 'string' | 'number' | 'boolean' | 'mention' | 'channel';
    description: string;
  }[];
  permissionLevel: 'all' | 'member' | 'admin';
  handler: (message: ChatMessage, args: Record<string, string>, context: CommandContext) => Promise<string>;
}

/**
 * Command Context
 */
export interface CommandContext {
  agentId: string;
  organizationId: string;
  connection: PlatformConnection;
  userMapping?: ChatUserMapping;
  channelMapping?: ChatChannelMapping;
}

/**
 * Rich Message Response
 */
export interface RichMessage {
  text: string;
  blocks?: {
    type: 'header' | 'section' | 'divider' | 'image' | 'actions' | 'context';
    text?: { type: 'mrkdwn' | 'plain_text'; text: string };
    fields?: { type: 'mrkdwn'; text: string }[];
    imageUrl?: string;
    altText?: string;
    elements?: {
      type: 'button' | 'overflow' | 'datepicker' | 'static_select';
      text?: { type: 'plain_text'; text: string };
      actionId?: string;
      url?: string;
      value?: string;
    }[];
  }[];
  attachments?: {
    color?: string;
    pretext?: string;
    author?: { name: string; link?: string; icon?: string };
    title?: { text: string; link?: string };
    text?: string;
    fields?: { title: string; value: string; short: boolean }[];
    imageUrl?: string;
    thumbUrl?: string;
    footer?: string;
    ts?: number;
  }[];
  buttons?: {
    label: string;
    action: string;
    style?: 'primary' | 'secondary' | 'danger';
    url?: string;
  }[];
  threadReply?: boolean;
  ephemeral?: boolean;
}

/**
 * Chat-First Interface Service
 * Integrates AI agents with Slack, Teams, WhatsApp, and other platforms
 */
export class ChatFirstInterfaceService extends EventEmitter {
  private static instance: ChatFirstInterfaceService;
  private connections: Map<string, PlatformConnection> = new Map();
  private slackClients: Map<string, SlackClient> = new Map();
  private whatsappClients: Map<string, WhatsAppClient> = new Map();
  private commands: Map<string, PlatformCommand> = new Map();
  private messageQueue: Map<string, ChatMessage[]> = new Map();
  private processingInterval?: NodeJS.Timeout;

  private constructor() {
    super();
    this.registerDefaultCommands();
    this.startMessageProcessing();
  }

  static getInstance(): ChatFirstInterfaceService {
    if (!ChatFirstInterfaceService.instance) {
      ChatFirstInterfaceService.instance = new ChatFirstInterfaceService();
    }
    return ChatFirstInterfaceService.instance;
  }
  /**
   * Connect to a chat platform
   */
  async connectPlatform(
    agentId: string,
    organizationId: string,
    platform: ChatPlatform,
    credentials: PlatformConnection['credentials'],
    settings?: Partial<PlatformConnection['settings']>
  ): Promise<PlatformConnection> {
    const connectionId = crypto.randomUUID();
    const now = new Date();

    const connection: PlatformConnection = {
      id: connectionId,
      agentId,
      organizationId,
      platform,
      status: 'pending',
      credentials,
      settings: {
        autoReply: true,
        replyDelayMs: 1000,
        mentionRequired: platform === 'slack' || platform === 'teams',
        commandPrefix: '!',
        maxMessageLength: 4000,
        threadDepth: 10,
        ...settings,
      },
      webhooks: {
        incoming: `/webhooks/chat/${platform}/${connectionId}`,
      },
      stats: {
        messagesReceived: 0,
        messagesSent: 0,
        errors: 0,
      },
      createdAt: now,
      updatedAt: now,
    };

    // Initialize platform-specific client
    try {
      switch (platform) {
        case 'slack':
          if (!credentials.botToken) {
            throw new Error('Slack bot token required');
          }
          const slackClient = new SlackClient(credentials.botToken);
          await slackClient.auth.test();
          this.slackClients.set(connectionId, slackClient);
          connection.status = 'connected';
          break;

        case 'whatsapp':
          // WhatsApp requires QR code scan, handled separately
          connection.status = 'pending';
          break;

        case 'teams':
          // Microsoft Teams integration
          if (!credentials.botToken || !credentials.apiKey) {
            throw new Error('Teams bot token and API key required');
          }
          connection.status = 'connected';
          break;

        case 'discord':
          // Discord bot integration
          if (!credentials.botToken) {
            throw new Error('Discord bot token required');
          }
          connection.status = 'connected';
          break;

        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }
    } catch (error) {
      connection.status = 'error';
      logger.error(`Failed to connect to ${platform}:`, error);
      throw error;
    }

    // Store connection
    this.connections.set(connectionId, connection);

    // Store in database
    await db.insert(chatPlatformConnections).values({
      id: connectionId,
      agentId,
      organizationId,
      platform,
      status: connection.status,
      credentials: credentials as any,
      settings: connection.settings as any,
      webhooks: connection.webhooks as any,
      stats: connection.stats as any,
      createdAt: now,
      updatedAt: now,
    });

    logger.info(`Connected ${platform} for agent ${agentId}`);

    await logAudit({
      userId: agentId,
      organizationId,
      action: 'chat_platform_connected',
      resource: 'chat_platform_connection',
      resourceId: connectionId,
      details: { platform, status: connection.status },
    });

    this.emit('platformConnected', connection);
    return connection;
  }

  /**
   * Disconnect from a platform
   */
  async disconnectPlatform(connectionId: string): Promise<void> {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    // Clean up clients
    this.slackClients.delete(connectionId);
    this.whatsappClients.delete(connectionId);

    connection.status = 'disconnected';
    this.connections.delete(connectionId);

    await db.update(chatPlatformConnections)
      .set({ status: 'disconnected', updatedAt: new Date() })
      .where(eq(chatPlatformConnections.id, connectionId));

    logger.info(`Disconnected ${connection.platform} connection ${connectionId}`);
    this.emit('platformDisconnected', connection);
  }

  /**
   * Handle incoming message from webhook
   */
  async handleIncomingMessage(
    connectionId: string,
    platformData: Record<string, unknown>
  ): Promise<void> {
    const connection = this.connections.get(connectionId);
    if (!connection) {
      logger.error(`Connection ${connectionId} not found`);
      return;
    }

    try {
      const message = await this.parsePlatformMessage(connection.platform, platformData);
      message.connectionId = connectionId;

      // Queue message for processing
      if (!this.messageQueue.has(connectionId)) {
        this.messageQueue.set(connectionId, []);
      }
      this.messageQueue.get(connectionId)!.push(message);

      // Update stats
      connection.stats.messagesReceived++;
      connection.stats.lastMessageAt = new Date();

      // Store in database
      await db.insert(chatMessages).values({
        id: message.id,
        platform: message.platform,
        connectionId: message.connectionId,
        externalId: message.externalId,
        externalThreadId: message.externalThreadId,
        channelId: message.channelId,
        channelName: message.channelName,
        userId: message.userId,
        externalUserId: message.externalUserId,
        userName: message.userName,
        userAvatar: message.userAvatar,
        type: message.type,
        content: message.content,
        attachments: message.attachments as any,
        reactions: message.reactions as any,
        replyTo: message.replyTo,
        mentions: message.mentions,
        isDirectMessage: message.isDirectMessage,
        timestamp: message.timestamp,
        metadata: message.metadata as any,
        processed: false,
      });

      // Update or create user mapping
      await this.ensureUserMapping(message);

      this.emit('messageReceived', message);
    } catch (error) {
      logger.error('Failed to handle incoming message:', error);
      connection.stats.errors++;
    }
  }

  /**
   * Process message queue
   */
  private async processMessageQueue(): Promise<void> {
    for (const [connectionId, messages] of this.messageQueue) {
      const connection = this.connections.get(connectionId);
      if (!connection || connection.status !== 'connected') continue;

      for (const message of messages) {
        if (message.processed) continue;

        try {
          await this.processMessage(message, connection);
          message.processed = true;

          // Update in database
          await db.update(chatMessages)
            .set({ processed: true })
            .where(eq(chatMessages.id, message.id));
        } catch (error) {
          logger.error('Failed to process message:', error);
        }
      }

      // Clear processed messages
      this.messageQueue.set(connectionId, messages.filter(m => !m.processed));
    }
  }

  /**
   * Process a single message
   */
  private async processMessage(
    message: ChatMessage,
    connection: PlatformConnection
  ): Promise<void> {
    const startTime = Date.now();

    // Check if should respond
    if (!this.shouldRespond(message, connection)) {
      return;
    }

    // Get personal memories for context
    const memories = await persistentPersonalMemory.getContextualMemories(
      connection.agentId,
      message.userId,
      message.content,
      5
    );

    // Check for commands
    const commandPrefix = connection.settings.commandPrefix;
    if (message.content.startsWith(commandPrefix)) {
      const response = await this.executeCommand(message, connection);
      if (response) {
        await this.sendMessage(connection, message.channelId, {
          text: response,
          threadReply: !!message.externalThreadId,
        });
      }
      return;
    }

    // Generate AI response
    const response = await this.generateResponse(message, connection, memories);

    // Send response if not empty
    if (response.trim()) {
      await this.sendMessage(connection, message.channelId, {
        text: response,
        threadReply: !!message.externalThreadId,
      });

      // Update response time
      const responseTime = Date.now() - startTime;
      await db.update(chatMessages)
        .set({ agentResponse: response, responseTime })
        .where(eq(chatMessages.id, message.id));

      // Store interaction in memory
      await persistentPersonalMemory.storeMemory(
        connection.agentId,
        message.userId,
        connection.organizationId,
        {
          type: 'conversation',
          category: 'chat_interaction',
          content: `User asked: "${message.content}" | Agent responded: "${response}"`,
          importance: 60,
          confidence: 90,
          source: 'observed',
          verified: true,
          relatedMemoryIds: memories.map(m => m.id),
          tags: ['chat', connection.platform, 'interaction'],
          metadata: { platform: connection.platform, channelId: message.channelId },
          accessLevel: 'private',
          isEncrypted: false,
          retentionDays: 365,
        }
      );
    }
  }

  /**
   * Generate AI response
   */
  private async generateResponse(
    message: ChatMessage,
    connection: PlatformConnection,
    memories: any[]
  ): Promise<string> {
    // Build context from memories
    const memoryContext = memories.length > 0
      ? `Previous context about this user:\n${memories.map(m => `- ${m.content}`).join('\n')}`
      : '';

    const systemPrompt = `You are an AI assistant integrated with ${connection.platform}. 
Be helpful, concise, and natural in your responses.
${memoryContext}

User message: ${message.content}`;

    // This would call the AI service
    // For now, return a placeholder response
    return `I received your message: "${message.content}". I'm processing this with knowledge from ${memories.length} previous interactions.`;
  }

  /**
   * Send message to platform
   */
  async sendMessage(
    connection: PlatformConnection,
    channelId: string,
    message: RichMessage
  ): Promise<void> {
    const startTime = Date.now();

    try {
      switch (connection.platform) {
        case 'slack':
          await this.sendSlackMessage(connection, channelId, message);
          break;

        case 'whatsapp':
          await this.sendWhatsAppMessage(connection, channelId, message);
          break;

        case 'teams':
          // Teams implementation
          logger.info('Teams message sending not yet implemented');
          break;

        default:
          throw new Error(`Sending not implemented for ${connection.platform}`);
      }

      connection.stats.messagesSent++;

      await logAudit({
        userId: connection.agentId,
        organizationId: connection.organizationId,
        action: 'chat_message_sent',
        resource: 'chat_platform',
        resourceId: connection.id,
        details: { platform: connection.platform, channelId, responseTime: Date.now() - startTime },
      });
    } catch (error) {
      logger.error(`Failed to send message to ${connection.platform}:`, error);
      connection.stats.errors++;
    }
  }

  /**
   * Send Slack message
   */
  private async sendSlackMessage(
    connection: PlatformConnection,
    channelId: string,
    message: RichMessage
  ): Promise<void> {
    const client = this.slackClients.get(connection.id);
    if (!client) throw new Error('Slack client not found');

    const blocks = message.blocks || [];
    if (message.text && !blocks.length) {
      blocks.push({
        type: 'section',
        text: { type: 'mrkdwn', text: message.text },
      });
    }

    await client.chat.postMessage({
      channel: channelId,
      text: message.text,
      blocks: blocks as any,
      thread_ts: message.threadReply ? undefined : undefined,
    });
  }

  /**
   * Send WhatsApp message
   */
  private async sendWhatsAppMessage(
    connection: PlatformConnection,
    phoneNumber: string,
    message: RichMessage
  ): Promise<void> {
    const client = this.whatsappClients.get(connection.id);
    if (!client) {
      logger.warn('WhatsApp client not initialized');
      return;
    }

    // WhatsApp implementation
    logger.info(`Would send WhatsApp message to ${phoneNumber}: ${message.text}`);
  }

  /**
   * Register a command
   */
  registerCommand(command: PlatformCommand): void {
    this.commands.set(command.name, command);
  }

  /**
   * Execute command
   */
  private async executeCommand(
    message: ChatMessage,
    connection: PlatformConnection
  ): Promise<string | null> {
    const content = message.content;
    const prefix = connection.settings.commandPrefix;
    const commandText = content.slice(prefix.length).trim();
    const [commandName, ...args] = commandText.split(/\s+/);

    const command = this.commands.get(commandName);
    if (!command) {
      return `Unknown command: ${commandName}. Type ${prefix}help for available commands.`;
    }

    // Parse arguments
    const parsedArgs: Record<string, string> = {};
    for (let i = 0; i < command.parameters.length; i++) {
      const param = command.parameters[i];
      if (args[i]) {
        parsedArgs[param.name] = args[i];
      } else if (param.required) {
        return `Missing required parameter: ${param.name}. Usage: ${prefix}${command.syntax}`;
      }
    }

    // Build context
    const context: CommandContext = {
      agentId: connection.agentId,
      organizationId: connection.organizationId,
      connection,
    };

    try {
      return await command.handler(message, parsedArgs, context);
    } catch (error) {
      return `Error executing command: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  /**
   * Parse platform-specific message
   */
  private async parsePlatformMessage(
    platform: ChatPlatform,
    data: Record<string, unknown>
  ): Promise<ChatMessage> {
    switch (platform) {
      case 'slack':
        return this.parseSlackMessage(data);

      case 'whatsapp':
        return this.parseWhatsAppMessage(data);

      default:
        throw new Error(`Parsing not implemented for ${platform}`);
    }
  }

  /**
   * Parse Slack message
   */
  private parseSlackMessage(data: Record<string, unknown>): ChatMessage {
    const event = data.event as any;
    return {
      id: crypto.randomUUID(),
      platform: 'slack',
      connectionId: '', // Set by caller
      externalId: event.ts,
      externalThreadId: event.thread_ts,
      channelId: event.channel,
      channelName: event.channel_type,
      userId: '', // Will be mapped
      externalUserId: event.user,
      userName: event.username || 'Unknown',
      type: event.subtype || 'text',
      content: event.text || '',
      attachments: event.files?.map((f: any) => ({
        type: f.mimetype,
        url: f.url_private,
        name: f.name,
        size: f.size,
      })),
      mentions: this.extractMentions(event.text),
      isDirectMessage: event.channel_type === 'im',
      timestamp: new Date(parseFloat(event.ts) * 1000),
      metadata: { raw: data },
      processed: false,
    };
  }

  /**
   * Parse WhatsApp message
   */
  private parseWhatsAppMessage(data: Record<string, unknown>): ChatMessage {
    const message = data.message as any;
    return {
      id: crypto.randomUUID(),
      platform: 'whatsapp',
      connectionId: '',
      externalId: message.id.id,
      externalThreadId: undefined,
      channelId: data.from as string,
      channelName: 'DM',
      userId: '',
      externalUserId: data.from as string,
      userName: message._data?.notifyName || 'Unknown',
      type: message.type,
      content: message.body || '',
      isDirectMessage: true,
      mentions: [],
      timestamp: new Date(message.timestamp * 1000),
      metadata: { raw: data },
      processed: false,
    };
  }

  /**
   * Extract mentions from text
   */
  private extractMentions(text: string): string[] {
    const mentionRegex = /<@([A-Z0-9]+)>/g;
    const mentions: string[] = [];
    let match;
    while ((match = mentionRegex.exec(text)) !== null) {
      mentions.push(match[1]);
    }
    return mentions;
  }

  /**
   * Check if should respond to message
   */
  private shouldRespond(message: ChatMessage, connection: PlatformConnection): boolean {
    // Check auto-reply setting
    if (!connection.settings.autoReply) return false;

    // Check mention requirement for group channels
    if (connection.settings.mentionRequired && !message.isDirectMessage) {
      // In a real implementation, check if bot was mentioned
      // For now, assume not mentioned
      return false;
    }

    // Check allowed channels
    if (connection.settings.allowedChannels?.length) {
      if (!connection.settings.allowedChannels.includes(message.channelId)) {
        return false;
      }
    }

    // Check blocked users
    if (connection.settings.blockedUsers?.includes(message.externalUserId)) {
      return false;
    }

    return true;
  }

  /**
   * Ensure user mapping exists
   */
  private async ensureUserMapping(message: ChatMessage): Promise<void> {
    const existing = await db.select()
      .from(chatUserMappings)
      .where(and(
        eq(chatUserMappings.platform, message.platform),
        eq(chatUserMappings.externalUserId, message.externalUserId)
      ));

    if (existing.length === 0) {
      await db.insert(chatUserMappings).values({
        id: crypto.randomUUID(),
        platform: message.platform,
        externalUserId: message.externalUserId,
        organizationId: message.userId || '',
        userName: message.userName,
        firstSeen: message.timestamp,
        lastSeen: message.timestamp,
        messageCount: 1,
      });
    } else {
      await db.update(chatUserMappings)
        .set({
          lastSeen: message.timestamp,
          messageCount: (existing[0].messageCount || 0) + 1,
        })
        .where(eq(chatUserMappings.id, existing[0].id));
    }
  }

  /**
   * Register default commands
   */
  private registerDefaultCommands(): void {
    this.registerCommand({
      name: 'help',
      description: 'Show available commands',
      syntax: 'help [command]',
      parameters: [
        { name: 'command', required: false, type: 'string', description: 'Command to get help for' },
      ],
      permissionLevel: 'all',
      handler: async (message, args) => {
        if (args.command) {
          const cmd = this.commands.get(args.command);
          if (cmd) {
            return `*${cmd.name}*: ${cmd.description}\nUsage: ${cmd.syntax}`;
          }
          return `Command not found: ${args.command}`;
        }

        const commandList = Array.from(this.commands.values())
          .map(cmd => `• *${cmd.name}*: ${cmd.description}`)
          .join('\n');

        return `*Available Commands:*\n${commandList}`;
      },
    });

    this.registerCommand({
      name: 'status',
      description: 'Check agent status',
      syntax: 'status',
      parameters: [],
      permissionLevel: 'all',
      handler: async (message, args, context) => {
        return `✅ I'm online and ready to help!\nPlatform: ${context.connection.platform}\nAgent ID: ${context.agentId}`;
      },
    });

    this.registerCommand({
      name: 'memory',
      description: 'View your stored memories',
      syntax: 'memory [count]',
      parameters: [
        { name: 'count', required: false, type: 'number', description: 'Number of memories to show' },
      ],
      permissionLevel: 'all',
      handler: async (message, args, context) => {
        const count = parseInt(args.count) || 5;
        const memories = await persistentPersonalMemory.retrieveMemories(
          context.agentId,
          message.userId,
          { limit: count, orderBy: 'recency' }
        );

        if (memories.length === 0) {
          return "I don't have any memories stored about you yet.";
        }

        const memoryList = memories.map(m => `• ${m.category}: ${m.content.slice(0, 100)}${m.content.length > 100 ? '...' : ''}`).join('\n');
        return `*Your Recent Memories (${memories.length} total):*\n${memoryList}`;
      },
    });
  }

  /**
   * Start message processing loop
   */
  private startMessageProcessing(): void {
    this.processingInterval = setInterval(() => {
      this.processMessageQueue();
    }, 1000); // Process every second
  }

  /**
   * Get connection stats
   */
  async getConnectionStats(connectionId: string): Promise<PlatformConnection['stats'] | null> {
    const connection = this.connections.get(connectionId);
    return connection?.stats || null;
  }

  /**
   * Get all connections for an agent
   */
  async getAgentConnections(agentId: string): Promise<PlatformConnection[]> {
    return Array.from(this.connections.values()).filter(c => c.agentId === agentId);
  }

  /**
   * Cleanup resources
   */
  async cleanup(): Promise<void> {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
    }

    for (const [connectionId] of this.connections) {
      await this.disconnectPlatform(connectionId);
    }

    this.removeAllListeners();
  }
}

// Export singleton instance
export const chatFirstInterface = ChatFirstInterfaceService.getInstance();
