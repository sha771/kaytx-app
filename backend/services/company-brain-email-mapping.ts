/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';

/**
 * Company Brain Email Thread Mapping Service
 * Maps client and project email histories to shared company accounts
 * Intercepts and indexes email threads for knowledge preservation
 */

export interface EmailThread {
  id: string;
  organizationId: string;
  threadId: string;
  subject: string;
  sender: string;
  recipients: string[];
  cc: string[];
  bcc: string[];
  messageCount: number;
  firstMessageDate: Date;
  lastMessageDate: Date;
  projectId?: string;
  clientId?: string;
  category?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'active' | 'archived' | 'resolved';
  summary?: string;
  actionItems: Array<{
    task: string;
    assignedTo?: string;
    dueDate?: Date;
    status: 'pending' | 'in-progress' | 'completed';
  }>;
  embeddingVector?: number[];
  extractedKnowledge: {
    topics: string[];
    decisions: string[];
    clientRequests: string[];
    commitments: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailMessage {
  id: string;
  organizationId: string;
  threadId: string;
  messageId: string;
  sender: string;
  recipients: string[];
  subject: string;
  body: string;
  htmlBody?: string;
  sentDate: Date;
  attachments: Array<{ url: string; name: string; type: string; size: number }>;
  inReplyTo?: string;
  references: string[];
  headers: Record<string, string>;
  embeddingVector?: number[];
  extractedKnowledge: {
    topics: string[];
    actionItems: string[];
    decisions: string[];
  };
  createdAt: Date;
}

export interface EmailMappingConfig {
  organizationId: string;
  emailProviders: {
    gmail?: {
      enabled: boolean;
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      sharedAccounts: string[];
    };
    outlook?: {
      enabled: boolean;
      clientId: string;
      clientSecret: string;
      tenantId: string;
      sharedAccounts: string[];
    };
    exchange?: {
      enabled: boolean;
      server: string;
      username: string;
      password: string;
      sharedMailboxes: string[];
    };
  };
  autoCategorize: boolean;
  extractActionItems: boolean;
  linkToProjects: boolean;
  linkToClients: boolean;
  retentionDays: number;
  interceptPersonal: boolean;
}

export class CompanyBrainEmailMappingService {
  private openai: OpenAI;
  private configs: Map<string, EmailMappingConfig> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Configure email mapping for an organization
   */
  configureMapping(config: EmailMappingConfig): void {
    this.configs.set(config.organizationId, config);
  }

  /**
   * Get configuration for an organization
   */
  getConfig(organizationId: string): EmailMappingConfig | undefined {
    return this.configs.get(organizationId);
  }

  /**
   * Process an incoming email
   */
  async processEmail(
    organizationId: string,
    emailData: any
  ): Promise<{ thread: EmailThread; message: EmailMessage }> {
    const config = this.configs.get(organizationId);
    
    // Find or create thread
    const thread = await this.findOrCreateThread(organizationId, emailData);
    
    // Create message
    const message: EmailMessage = {
      id: crypto.randomUUID(),
      organizationId,
      threadId: thread.id,
      messageId: emailData.messageId,
      sender: emailData.sender,
      recipients: emailData.recipients || [],
      subject: emailData.subject,
      body: emailData.body,
      htmlBody: emailData.htmlBody,
      sentDate: new Date(emailData.sentDate),
      attachments: emailData.attachments || [],
      inReplyTo: emailData.inReplyTo,
      references: emailData.references || [],
      headers: emailData.headers || {},
      extractedKnowledge: {
        topics: [],
        actionItems: [],
        decisions: [],
      },
      createdAt: new Date(),
    };

    // Extract knowledge if enabled
    if (config?.autoCategorize) {
      message.extractedKnowledge = await this.extractKnowledge(message.body);
    }

    // Generate embedding
    message.embeddingVector = await this.generateEmbedding(message.body);

    // Save message
    await this.saveMessage(message);

    // Update thread
    thread.messageCount++;
    thread.lastMessageDate = message.sentDate;
    
    // Auto-categorize if enabled
    if (config?.autoCategorize) {
      thread.category = await this.categorizeThread(thread);
    }

    // Extract action items if enabled
    if (config?.extractActionItems) {
      const actionItems = await this.extractActionItems(message.body);
      thread.actionItems.push(...actionItems);
    }

    // Update thread embedding
    const threadText = this.buildThreadText(thread, message);
    thread.embeddingVector = await this.generateEmbedding(threadText);

    // Update thread
    await this.updateThread(thread);

    return { thread, message };
  }

  /**
   * Find or create email thread
   */
  private async findOrCreateThread(
    organizationId: string,
    emailData: any
  ): Promise<EmailThread> {
    // Try to find existing thread by thread ID or subject
    const existingThread = await this.findThreadByMessageId(organizationId, emailData.messageId);
    
    if (existingThread) {
      return existingThread;
    }

    // Create new thread
    const thread: EmailThread = {
      id: crypto.randomUUID(),
      organizationId,
      threadId: emailData.threadId || emailData.messageId,
      subject: emailData.subject,
      sender: emailData.sender,
      recipients: emailData.recipients || [],
      cc: emailData.cc || [],
      bcc: emailData.bcc || [],
      messageCount: 1,
      firstMessageDate: new Date(emailData.sentDate),
      lastMessageDate: new Date(emailData.sentDate),
      priority: 'normal',
      status: 'active',
      actionItems: [],
      extractedKnowledge: {
        topics: [],
        decisions: [],
        clientRequests: [],
        commitments: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.saveThread(thread);
    return thread;
  }

  /**
   * Find thread by message ID
   */
  private async findThreadByMessageId(
    organizationId: string,
    messageId: string
  ): Promise<EmailThread | null> {
    // In production, query database
    return null;
  }

  /**
   * Categorize thread
   */
  private async categorizeThread(thread: EmailThread): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Categorize this email thread into one of these categories: sales, support, project, billing, legal, hr, general. Return only the category name.',
          },
          {
            role: 'user',
            content: `Subject: ${thread.subject}\nSender: ${thread.sender}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 20,
      });

      return completion.choices[0].message.content?.toLowerCase() || 'general';
    } catch (error) {
      console.error('Error categorizing thread:', error);
      return 'general';
    }
  }

  /**
   * Extract knowledge from email body
   */
  private async extractKnowledge(body: string): Promise<EmailMessage['extractedKnowledge']> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract knowledge from the email. Identify:
            - Topics discussed
            - Action items
            - Decisions made
            
            Return as JSON.`,
          },
          {
            role: 'user',
            content: body.substring(0, 4000), // Limit length
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      return {
        topics: result.topics || [],
        actionItems: result.actionItems || [],
        decisions: result.decisions || [],
      };
    } catch (error) {
      console.error('Error extracting knowledge:', error);
      return {
        topics: [],
        actionItems: [],
        decisions: [],
      };
    }
  }

  /**
   * Extract action items from email
   */
  private async extractActionItems(body: string): Promise<EmailThread['actionItems']> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract action items from the email. For each, identify the task and who it's assigned to. Return as JSON array.`,
          },
          {
            role: 'user',
            content: body.substring(0, 4000),
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      return (result.actionItems || []).map((item: any) => ({
        task: item.task,
        assignedTo: item.assignedTo,
        dueDate: item.dueDate ? new Date(item.dueDate) : undefined,
        status: 'pending',
      }));
    } catch (error) {
      console.error('Error extracting action items:', error);
      return [];
    }
  }

  /**
   * Generate embedding
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text.substring(0, 8000),
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      return [];
    }
  }

  /**
   * Build thread text for embedding
   */
  private buildThreadText(thread: EmailThread, message: EmailMessage): string {
    return `Thread: ${thread.subject}\nSender: ${thread.sender}\nLatest: ${message.body}`;
  }

  /**
   * Save thread to database
   */
  private async saveThread(thread: EmailThread): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving thread:', thread.id);
  }

  /**
   * Update thread in database
   */
  private async updateThread(thread: EmailThread): Promise<void> {
    // In production, update in database
    console.log('Updating thread:', thread.id);
  }

  /**
   * Save message to database
   */
  private async saveMessage(message: EmailMessage): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving message:', message.id);
  }

  /**
   * Get thread by ID
   */
  async getThread(threadId: string): Promise<EmailThread | null> {
    // In production, query database
    return null;
  }

  /**
   * Get messages for a thread
   */
  async getThreadMessages(threadId: string): Promise<EmailMessage[]> {
    // In production, query database
    return [];
  }

  /**
   * Search email threads
   */
  async searchThreads(
    organizationId: string,
    query: string,
    filters?: {
      category?: string;
      projectId?: string;
      clientId?: string;
      priority?: string;
      status?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<EmailThread[]> {
    // In production, perform vector search with filters
    console.log(`Searching email threads for ${organizationId}: ${query}`);
    
    return [];
  }

  /**
   * Link thread to project
   */
  async linkToProject(threadId: string, projectId: string): Promise<void> {
    // In production, update database
    console.log(`Linking thread ${threadId} to project ${projectId}`);
  }

  /**
   * Link thread to client
   */
  async linkToClient(threadId: string, clientId: string): Promise<void> {
    // In production, update database
    console.log(`Linking thread ${threadId} to client ${clientId}`);
  }

  /**
   * Get email statistics
   */
  async getEmailStatistics(organizationId: string): Promise<{
    totalThreads: number;
    totalMessages: number;
    threadsByCategory: Record<string, number>;
    threadsByPriority: Record<string, number>;
    actionItemsCreated: number;
    decisionsCaptured: number;
  }> {
    // In production, query database
    return {
      totalThreads: 0,
      totalMessages: 0,
      threadsByCategory: {},
      threadsByPriority: {},
      actionItemsCreated: 0,
      decisionsCaptured: 0,
    };
  }

  /**
   * Apply retention policy
   */
  async applyRetentionPolicy(organizationId: string): Promise<number> {
    const config = this.configs.get(organizationId);
    if (!config) {
      throw new Error('No configuration found');
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - config.retentionDays);

    // In production, delete from database
    console.log(`Deleting emails older than ${cutoffDate}`);
    
    return 0;
  }

  /**
   * Export email thread
   */
  async exportThread(threadId: string): Promise<{ thread: EmailThread; messages: EmailMessage[] }> {
    const thread = await this.getThread(threadId);
    const messages = await this.getThreadMessages(threadId);

    if (!thread) {
      throw new Error('Thread not found');
    }

    return { thread, messages };
  }
}

// Export singleton instance
export const companyBrainEmailMappingService = new CompanyBrainEmailMappingService();
