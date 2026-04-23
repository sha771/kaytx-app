import axios, { AxiosInstance } from 'axios';
import axiosRetry, { exponentialDelay, isNetworkOrIdempotentRequestError } from 'axios-retry';
import crypto from 'crypto';
import QRCode from 'qrcode';
import { EventEmitter } from 'events';
import { db as pgDb } from '../db/connection';
import { users, organizations } from '../db/drizzle-schema';
import { eq, and, desc, sql, count } from 'drizzle-orm';
import { logAudit } from '../lib/audit';

import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface WhatsAppConnection {
  sessionId: string;
  userId: string;
  organizationId: string;
  phoneNumber: string;
  qrCode: string;
  linkingCode: string;
  expiresAt: Date;
  status: 'pending' | 'verified' | 'failed' | 'disconnected';
  encryptionKey: string;
  deviceInfo?: {
    platform: string;
    version: string;
    userAgent?: string;
  };
  lastActivityAt: Date;
  createdAt: Date;
}

export interface WhatsAppWebhookPayload {
  sessionId: string;
  verified: boolean;
  phoneNumber: string;
  businessAccountId: string;
  accessToken: string;
  expiresIn?: number;
  webhookEvent?: 'message' | 'status' | 'error';
}

export interface WhatsAppMessage {
  id: string;
  sessionId: string;
  from: string;
  to: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'document' | 'audio';
  mediaUrl?: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  metadata?: Record<string, any>;
}

interface WhatsAppTemplate {
  id: string;
  organizationId: string;
  name: string;
  category: 'marketing' | 'utility' | 'authentication';
  language: string;
  components: {
    type: 'header' | 'body' | 'footer' | 'buttons';
    text?: string;
    buttons?: {
      type: 'url' | 'quick_reply';
      text: string;
      url?: string;
      payload?: string;
    }[];
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface WhatsAppCampaign {
  id: string;
  organizationId: string;
  name: string;
  templateId: string;
  recipients: string[];
  scheduledAt?: Date;
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'failed';
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface WhatsAppAnalytics {
  sessionId: string;
  date: Date;
  messagesSent: number;
  messagesDelivered: number;
  messagesRead: number;
  messagesFailed: number;
  averageResponseTime: number;
  topContacts: {
    phoneNumber: string;
    messageCount: number;
  }[];
}

export class WhatsAppService extends EventEmitter {
  private apiClient: AxiosInstance;
  private whatsappApiUrl: string;
  private businessAccountId: string;
  private accessToken: string;
  private sessions: Map<string, WhatsAppConnection> = new Map();
  private webhookUrl: string;
  private messageQueue: Map<string, WhatsAppMessage[]> = new Map();
  private templates: Map<string, WhatsAppTemplate> = new Map();
  private campaigns: Map<string, WhatsAppCampaign> = new Map();
  private rateLimits: Map<string, { count: number; resetTime: number }> = new Map();
  private readonly maxMessagesPerSecond = 50;
  private readonly maxMessagesPerDay = 1000;

  constructor() {
    super();
    this.whatsappApiUrl = process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0';
    this.businessAccountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '';
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || '';
    this.webhookUrl = process.env.WHATSAPP_WEBHOOK_URL || 'https://api.rork.app/webhooks/whatsapp';

    this.apiClient = axios.create({
      baseURL: this.whatsappApiUrl,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Standardized Retry Logic
    axiosRetry(this.apiClient, {
      retries: 3,
      retryDelay: exponentialDelay,
      retryCondition: (error) => {
        return isNetworkOrIdempotentRequestError(error) || error.response?.status === 429;
      },
    });

    // Start cleanup interval for expired sessions
    this.cleanupInterval = setInterval(() => this.cleanupExpiredSessions(), 60000); // Every minute
    
    // Start rate limit reset interval
    this.rateLimitResetInterval = setInterval(() => this.resetRateLimits(), 60000); // Every minute
  }

  /**
   * Generate QR code for WhatsApp login
   * Uses WhatsApp Cloud API for authentication
   */
  async generateQRCode(userId: string, organizationId: string, phoneNumber: string): Promise<WhatsAppConnection> {
    // Validate user and organization
    const user = await pgDb.select().from(users).where(eq(users.id, userId)).limit(1);
    if (user.length === 0) {
      throw new Error('User not found');
    }

    const org = await pgDb.select().from(organizations).where(eq(organizations.id, organizationId)).limit(1);
    if (org.length === 0) {
      throw new Error('Organization not found');
    }

    const sessionId = crypto.randomBytes(32).toString('hex');
    const linkingCode = crypto.randomBytes(6).toString('hex').toUpperCase();
    const encryptionKey = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    try {
      // Generate QR code with WhatsApp Cloud API
      const qrData = JSON.stringify({
        sessionId,
        phoneNumber,
        linkingCode,
        businessAccountId: this.businessAccountId,
        timestamp: new Date().toISOString(),
      });

      const qrCode = await QRCode.toDataURL(qrData);

      const connection: WhatsAppConnection = {
        sessionId,
        userId,
        organizationId,
        phoneNumber,
        qrCode,
        linkingCode,
        expiresAt,
        status: 'pending',
        encryptionKey,
        deviceInfo: {
          platform: 'web',
          version: '1.0.0',
        },
        lastActivityAt: new Date(),
        createdAt: new Date(),
      };

      this.sessions.set(sessionId, connection);

      // Log audit event
      await logAudit({
        userId,
        organizationId,
        action: 'whatsapp_qr_generated',
        resource: 'whatsapp_session',
        resourceId: sessionId,
        status: 'success',
        metadata: {
          phoneNumber,
          linkingCode,
          expiresAt,
        },
      });

      this.emit('whatsapp:qr_generated', { sessionId, phoneNumber });

      return connection;
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error}`);
    }
  }

  /**
   * Verify WhatsApp connection via webhook
   */
  async verifyConnection(payload: WhatsAppWebhookPayload): Promise<WhatsAppConnection | null> {
    const session = this.sessions.get(payload.sessionId);
    if (!session) {
      return null;
    }

    if (payload.verified) {
      session.status = 'verified';
      session.lastActivityAt = new Date();
      
      // Store access token if provided
      if (payload.accessToken) {
        // In real implementation, store this securely
        session.deviceInfo = {
          ...session.deviceInfo,
          platform: 'whatsapp',
          version: '2.0',
        };
      }

      // Log audit event
      await logAudit({
        userId: session.userId,
        organizationId: session.organizationId,
        action: 'whatsapp_connection_verified',
        resource: 'whatsapp_session',
        resourceId: session.sessionId,
        status: 'success',
        metadata: {
          phoneNumber: session.phoneNumber,
          businessAccountId: payload.businessAccountId,
        },
      });

      this.emit('whatsapp:connection_verified', { sessionId: session.sessionId });
    } else {
      session.status = 'failed';
      
      this.emit('whatsapp:connection_failed', { sessionId: session.sessionId });
    }

    return session;
  }

  /**
   * Send message via WhatsApp
   */
  async sendMessage(sessionId: string, to: string, content: string, type: WhatsAppMessage['type'] = 'text'): Promise<WhatsAppMessage> {
    const session = this.sessions.get(sessionId);
    if (!session || session.status !== 'verified') {
      throw new Error('Invalid or unverified session');
    }

    // Check rate limits
    const rateLimitKey = `${sessionId}:${Math.floor(Date.now() / 1000)}`;
    const currentRate = this.rateLimits.get(rateLimitKey) || { count: 0, resetTime: Date.now() + 1000 };
    
    if (currentRate.count >= this.maxMessagesPerSecond) {
      throw new Error('Rate limit exceeded');
    }

    currentRate.count++;
    this.rateLimits.set(rateLimitKey, currentRate);

    const message: WhatsAppMessage = {
      id: crypto.randomUUID(),
      sessionId,
      from: session.phoneNumber,
      to,
      content,
      type,
      timestamp: new Date(),
      status: 'sent',
    };

    try {
      // Send via WhatsApp Cloud API
      const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to.replace(/[^0-9]/g, ''),
        type,
      };

      if (type === 'text') {
        (payload as any)['text'] = { body: content };
      } else if (type === 'image' && message.mediaUrl) {
        (payload as any)['image'] = { link: message.mediaUrl, caption: content };
      }

      const response = await this.apiClient.post(
        `/${this.businessAccountId}/messages`,
        payload
      );

      if (response.data.messages?.[0]?.id) {
        message.status = 'sent';
        session.lastActivityAt = new Date();
      } else {
        message.status = 'failed';
      }

      // Store in message queue
      const queue = this.messageQueue.get(sessionId) || [];
      queue.push(message);
      this.messageQueue.set(sessionId, queue);

      this.emit('whatsapp:message_sent', { sessionId, message });

      return message;
    } catch (error) {
      message.status = 'failed';
      throw new Error(`Failed to send message: ${error}`);
    }
  }

  /**
   * Send template message
   */
  async sendTemplateMessage(sessionId: string, templateId: string, to: string, variables?: Record<string, string>): Promise<WhatsAppMessage> {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    const session = this.sessions.get(sessionId);
    if (!session || session.status !== 'verified') {
      throw new Error('Invalid or unverified session');
    }

    try {
      const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to.replace(/[^0-9]/g, ''),
        type: 'template',
        template: {
          name: template.name,
          language: { code: template.language },
          components: template.components.map(component => ({
            type: component.type,
            parameters: component.text ? [{ type: 'text', text: this.replaceTemplateVariables(component.text || '', variables) }] : [],
          })),
        },
      };

      const response = await this.apiClient.post(
        `/${this.businessAccountId}/messages`,
        payload
      );

      const message: WhatsAppMessage = {
        id: crypto.randomUUID(),
        sessionId,
        from: session.phoneNumber,
        to,
        content: `Template: ${template.name}`,
        type: 'text',
        timestamp: new Date(),
        status: response.data.messages?.[0]?.id ? 'sent' : 'failed',
      };

      this.emit('whatsapp:template_sent', { sessionId, templateId, message });

      return message;
    } catch (error) {
      throw new Error(`Failed to send template message: ${error}`);
    }
  }

  /**
   * Create message template
   */
  async createTemplate(templateData: Omit<WhatsAppTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<WhatsAppTemplate> {
    const template: WhatsAppTemplate = {
      ...templateData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      // Create template in WhatsApp Cloud API
      await this.apiClient.post(
        `/${this.businessAccountId}/message_templates`,
        {
          name: template.name,
          category: template.category,
          language: template.language,
          components: template.components,
        }
      );

      this.templates.set(template.id, template);

      // Log audit event
      await logAudit({
        organizationId: template.organizationId,
        action: 'whatsapp_template_created',
        resource: 'whatsapp_template',
        resourceId: template.id,
        status: 'success',
        metadata: {
          templateName: template.name,
          templateCategory: template.category,
        },
      });

      this.emit('whatsapp:template_created', { template });

      return template;
    } catch (error) {
      throw new Error(`Failed to create template: ${error}`);
    }
  }

  /**
   * Create campaign
   */
  async createCampaign(campaignData: Omit<WhatsAppCampaign, 'id' | 'createdAt' | 'updatedAt' | 'sentCount' | 'deliveredCount' | 'readCount' | 'failedCount'>): Promise<WhatsAppCampaign> {
    const campaign: WhatsAppCampaign = {
      ...campaignData,
      id: crypto.randomUUID(),
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      failedCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.campaigns.set(campaign.id, campaign);

    // Schedule campaign if needed
    if (campaign.scheduledAt && campaign.scheduledAt > new Date()) {
      setTimeout(() => this.executeCampaign(campaign.id), campaign.scheduledAt.getTime() - Date.now());
    } else if (campaign.status === 'sending') {
      this.executeCampaign(campaign.id);
    }

    this.emit('whatsapp:campaign_created', { campaign });

    return campaign;
  }

  /**
   * Execute campaign
   */
  private async executeCampaign(campaignId: string): Promise<void> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) return;

    const template = this.templates.get(campaign.templateId);
    if (!template) {
      campaign.status = 'failed';
      return;
    }

    campaign.status = 'sending';

    for (const recipient of campaign.recipients) {
      try {
        // Find active session for the organization
        const activeSession = Array.from(this.sessions.values())
          .find(s => s.organizationId === campaign.organizationId && s.status === 'verified');

        if (!activeSession) {
          campaign.failedCount++;
          continue;
        }

        await this.sendTemplateMessage(activeSession.sessionId, template.id, recipient);
        campaign.sentCount++;
        campaign.deliveredCount++;

        // Add delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        campaign.failedCount++;
      }
    }

    campaign.status = campaign.failedCount === 0 ? 'completed' : 'failed';
    campaign.updatedAt = new Date();

    this.emit('whatsapp:campaign_completed', { campaign });
  }

  /**
   * Get analytics for session
   */
  async getAnalytics(sessionId: string, dateRange?: { start: Date; end: Date }): Promise<WhatsAppAnalytics> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const messages = this.messageQueue.get(sessionId) || [];
    const filteredMessages = dateRange 
      ? messages.filter(m => m.timestamp >= dateRange.start && m.timestamp <= dateRange.end)
      : messages;

    const contactCounts = new Map<string, number>();
    filteredMessages.forEach(msg => {
      const count = contactCounts.get(msg.to) || 0;
      contactCounts.set(msg.to, count + 1);
    });

    const topContacts = Array.from(contactCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([phoneNumber, messageCount]) => ({ phoneNumber, messageCount }));

    return {
      sessionId,
      date: new Date(),
      messagesSent: filteredMessages.filter(m => m.status === 'sent').length,
      messagesDelivered: filteredMessages.filter(m => m.status === 'delivered' || m.status === 'sent' || m.status === 'read').length,
      messagesRead: filteredMessages.filter(m => m.status === 'read').length,
      messagesFailed: filteredMessages.filter(m => m.status === 'failed').length,
      averageResponseTime: 0, // Would calculate from message timestamps
      topContacts,
    };
  }

  /**
   * Get session status
   */
  getSessionStatus(sessionId: string): WhatsAppConnection | null {
    return this.sessions.get(sessionId) || null;
  }

  /**
   * Get all sessions for organization
   */
  getOrganizationSessions(organizationId: string): WhatsAppConnection[] {
    return Array.from(this.sessions.values())
      .filter(session => session.organizationId === organizationId);
  }

  /**
   * Disconnect WhatsApp session
   */
  async disconnectSession(sessionId: string, reason?: string): Promise<boolean> {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    session.status = 'disconnected';
    
    // Log audit event
    await logAudit({
      userId: session.userId,
      organizationId: session.organizationId,
      action: 'whatsapp_session_disconnected',
      resource: 'whatsapp_session',
      resourceId: sessionId,
      status: 'success',
      metadata: {
        phoneNumber: session.phoneNumber,
        reason: reason,
      },
    });

    this.emit('whatsapp:session_disconnected', { sessionId });

    return true;
  }

  /**
   * Handle incoming webhook from WhatsApp
   */
  async handleWebhook(payload: any): Promise<void> {
    try {
      if (payload.object === 'whatsapp_business_account') {
        for (const entry of payload.entry) {
          for (const change of entry.changes) {
            if (change.field === 'messages') {
              await this.handleMessageWebhook(change.value);
            }
          }
        }
      }
    } catch (error) {
      logger.error('Webhook processing error:', error instanceof Error ? error : new Error(String(error)));
    }
  }

  /**
   * Handle message webhook
   */
  private async handleMessageWebhook(value: any): Promise<void> {
    const message = value.messages?.[0];
    if (!message) return;

    const from = message.from;
    const to = message.to;
    
    // Find session by phone number
    const session = Array.from(this.sessions.values())
      .find(s => s.phoneNumber === to && s.status === 'verified');

    if (!session) return;

    const whatsappMessage: WhatsAppMessage = {
      id: message.id,
      sessionId: session.sessionId,
      from,
      to,
      content: message.text?.body || '',
      type: message.type || 'text',
      timestamp: new Date(parseInt(message.timestamp) * 1000),
      status: 'delivered',
    };

    // Store message
    const queue = this.messageQueue.get(session.sessionId) || [];
    queue.push(whatsappMessage);
    this.messageQueue.set(session.sessionId, queue);

    this.emit('whatsapp:message_received', { sessionId: session.sessionId, message: whatsappMessage });
  }

  /**
   * Replace template variables
   */
  private replaceTemplateVariables(text: string, variables?: Record<string, string>): string {
    if (!variables) return text;
    
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] || match;
    });
  }

  /**
   * Cleanup expired sessions
   */
  private cleanupExpiredSessions(): void {
    const now = new Date();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.expiresAt < now && session.status === 'pending') {
        this.sessions.delete(sessionId);
        this.emit('whatsapp:session_expired', { sessionId });
      }
    }
  }

  /**
   * Reset rate limits
   */
  private resetRateLimits(): void {
    const now = Date.now();
    for (const [key, data] of this.rateLimits.entries()) {
      if (data.resetTime < now) {
        this.rateLimits.delete(key);
      }
    }
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    if (this.rateLimitResetInterval) {
      clearInterval(this.rateLimitResetInterval);
    }
    this.removeAllListeners();
    logger.info('WhatsAppService cleaned up');
  }
}

export const whatsappService = new WhatsAppService();
