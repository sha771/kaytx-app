import { db as pgDb } from '../db/connection';
import { campaigns, contacts } from '../db/drizzle-schema';
import { eq, and, desc, ilike } from 'drizzle-orm';
import crypto from 'crypto';
import { EventEmitter } from 'events';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

// Email service providers
interface EmailProvider {
  name: 'sendgrid' | 'mailgun' | 'smtp';
  sendEmail(params: EmailSendParams): Promise<EmailSendResult>;
  validateConfig(config: Record<string, string | number | boolean | null>): Promise<boolean>;
}

interface EmailSendParams {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  htmlContent?: string;
  textContent?: string;
  fromEmail: string;
  fromName: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
  headers?: Record<string, string>;
  metadata?: Record<string, string | number | boolean | null>;
}

interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType: string;
}

interface EmailSendResult {
  success: boolean;
  messageId?: string;
  providerResponse?: Record<string, string | number | boolean | any[] | Record<string, any> | null>;
  error?: string;
  timestamp: Date;
}

interface EmailTemplate {
  id: string;
  organizationId: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  variables: string[];
  category?: string;
  metadata: Record<string, string | number | boolean | null>;
  createdAt: Date;
  updatedAt: Date;
}

interface CampaignMetrics {
  campaignId: string;
  totalSent: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  revenue?: number;
  spamComplaintRate?: number;
  forwardRate?: number;
}

interface ABTestConfig {
  variants: {
    id: string;
    name: string;
    subject?: string;
    content?: string;
    fromEmail?: string;
    fromName?: string;
    weight: number; // Percentage of traffic
  }[];
  testDuration: number; // Hours
  successMetric: 'open_rate' | 'click_rate' | 'conversion_rate';
  confidenceLevel: number; // 0.95 for 95% confidence
}

interface PersonalizationRule {
  field: string;
  type: 'replace' | 'conditional' | 'lookup';
  conditions?: {
    operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
    value: any;
    result: string;
  }[];
  lookupTable?: Record<string, string>;
  defaultValue?: string;
}

interface EmailCampaign {
  id: string;
  organizationId: string;
  name: string;
  subject: string;
  content: string;
  fromEmail: string;
  fromName: string;
  status: 'draft' | 'scheduled' | 'running' | 'completed' | 'paused' | 'cancelled';
  scheduledAt?: Date;
  sentAt?: Date;
  totalRecipients: number;
  sentCount: number;
  openedCount: number;
  clickedCount: number;
  bouncedCount: number;
  unsubscribedCount: number;
  spamComplaintCount: number;
  metadata: Record<string, string | number | boolean | any[] | Record<string, any> | null>;
  createdAt: Date;
  updatedAt: Date;
  // Enhanced fields
  templateId?: string;
  segmentId?: string;
  abTestConfig?: ABTestConfig;
  personalizationRules?: PersonalizationRule[];
  deliverySchedule?: {
    type: 'immediate' | 'scheduled' | 'batched';
    batchSize?: number;
    batchInterval?: number; // Minutes
    timezone?: string;
    optimalSendTime?: boolean;
  };
  trackingSettings?: {
    openTracking: boolean;
    clickTracking: boolean;
    unsubscribeTracking: boolean;
    spamComplaintTracking: boolean;
    googleAnalytics?: {
      enabled: boolean;
      campaignSource: string;
      campaignMedium: string;
      campaignName: string;
    };
  };
}

// Email provider implementations
class SendGridProvider implements EmailProvider {
  name = 'sendgrid' as const;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendEmail(params: EmailSendParams): Promise<EmailSendResult> {
    try {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(this.apiKey);

      const msg = {
        to: params.to,
        cc: params.cc,
        bcc: params.bcc,
        from: {
          email: params.fromEmail,
          name: params.fromName
        },
        replyTo: params.replyTo,
        subject: params.subject,
        html: params.htmlContent,
        text: params.textContent,
        attachments: params.attachments,
        headers: params.headers,
        customArgs: params.metadata
      };

      const response = await sgMail.send(msg);
      
      return {
        success: true,
        messageId: response[0]?.headers?.['x-message-id'],
        providerResponse: response[0],
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'SendGrid error',
        timestamp: new Date()
      };
    }
  }

  async validateConfig(config: any): Promise<boolean> {
    try {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(config.apiKey);
      const response = await sgMail.request({
        method: 'GET',
        url: '/v3/user/account'
      });
      return response[0]?.statusCode === 200;
    } catch {
      return false;
    }
  }
}

class MailgunProvider implements EmailProvider {
  name = 'mailgun' as const;
  private apiKey: string;
  private domain: string;

  constructor(apiKey: string, domain: string) {
    this.apiKey = apiKey;
    this.domain = domain;
  }

  async sendEmail(params: EmailSendParams): Promise<EmailSendResult> {
    try {
      const formData = require('form-data');
      const fetch = require('node-fetch');
      
      const form = new formData();
      form.append('from', `${params.fromName} <${params.fromEmail}>`);
      form.append('to', Array.isArray(params.to) ? params.to.join(',') : params.to);
      if (params.cc) form.append('cc', Array.isArray(params.cc) ? params.cc.join(',') : params.cc);
      if (params.bcc) form.append('bcc', Array.isArray(params.bcc) ? params.bcc.join(',') : params.bcc);
      if (params.replyTo) form.append('h:Reply-To', params.replyTo);
      form.append('subject', params.subject);
      if (params.htmlContent) form.append('html', params.htmlContent);
      if (params.textContent) form.append('text', params.textContent);
      
      // Add attachments
      if (params.attachments) {
        for (const attachment of params.attachments) {
          form.append('attachment', attachment.content, {
            filename: attachment.filename,
            contentType: attachment.contentType
          });
        }
      }

      // Add custom headers
      if (params.headers) {
        for (const [key, value] of Object.entries(params.headers)) {
          form.append(`h:${key}`, value);
        }
      }

      const auth = Buffer.from(`api:${this.apiKey}`).toString('base64');
      const response = await fetch(`https://api.mailgun.net/v3/${this.domain}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          ...form.getHeaders()
        },
        body: form
      });

      const result = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          messageId: result.id,
          providerResponse: result,
          timestamp: new Date()
        };
      } else {
        return {
          success: false,
          error: result.message || 'Mailgun error',
          timestamp: new Date()
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Mailgun error',
        timestamp: new Date()
      };
    }
  }

  async validateConfig(config: any): Promise<boolean> {
    try {
      const fetch = require('node-fetch');
      const auth = Buffer.from(`api:${config.apiKey}`).toString('base64');
      const response = await fetch(`https://api.mailgun.net/v3/domains/${config.domain}`, {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

class SMTPProvider implements EmailProvider {
  name = 'smtp' as const;
  private transporter: any;

  constructor(config: any) {
    const nodemailer = require('nodemailer');
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port || 587,
      secure: config.secure || false,
      auth: config.auth
    });
  }

  async sendEmail(params: EmailSendParams): Promise<EmailSendResult> {
    try {
      const mailOptions = {
        to: params.to,
        cc: params.cc,
        bcc: params.bcc,
        from: `${params.fromName} <${params.fromEmail}>`,
        replyTo: params.replyTo,
        subject: params.subject,
        html: params.htmlContent,
        text: params.textContent,
        attachments: params.attachments,
        headers: params.headers
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      return {
        success: true,
        messageId: result.messageId,
        providerResponse: result,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'SMTP error',
        timestamp: new Date()
      };
    }
  }

  async validateConfig(config: any): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch {
      return false;
    }
  }
}

export class EmailCampaignService extends EventEmitter {
  private providers: Map<string, EmailProvider> = new Map();
  private defaultProvider: string = 'smtp';
  private sendingJobs: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    super();
    this.initializeProviders();
  }

  private initializeProviders(): void {
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Initialize SendGrid if configured
    if (process.env.SENDGRID_API_KEY) {
      const provider = new SendGridProvider(process.env.SENDGRID_API_KEY);
      this.providers.set('sendgrid', provider);
    }

    // Initialize Mailgun if configured
    if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
      const provider = new MailgunProvider(process.env.MAILGUN_API_KEY, process.env.MAILGUN_DOMAIN);
      this.providers.set('mailgun', provider);
    }

    // Initialize SMTP if configured
    if (process.env.SMTP_HOST) {
      const provider = new SMTPProvider({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      this.providers.set('smtp', provider);
    }

    // PRODUCTION SAFETY: Fail if no providers are configured in production
    if (isProduction && this.providers.size === 0) {
      throw new Error('CRITICAL: No email providers configured in production environment. Email service initialization aborted.');
    }

    if (this.providers.size === 0) {
      logger.warn('[EmailCampaignService] No email providers configured. Running in mock mode (no emails will be sent).');
    }
  }

  async addProvider(name: string, provider: EmailProvider): Promise<void> {
    this.providers.set(name, provider);
  }

  async setDefaultProvider(providerName: string): Promise<void> {
    if (this.providers.has(providerName)) {
      this.defaultProvider = providerName;
    } else {
      throw new Error(`Provider ${providerName} not found`);
    }
  }

  private getProvider(providerName?: string): EmailProvider {
    const name = providerName || this.defaultProvider;
    const provider = this.providers.get(name);
    if (!provider) {
      throw new Error(`Email provider ${name} not configured`);
    }
    return provider;
  }

  async createCampaign(organizationId: string, campaign: Omit<EmailCampaign, 'id' | 'totalRecipients' | 'sentCount' | 'openedCount' | 'clickedCount' | 'bouncedCount' | 'unsubscribedCount' | 'createdAt' | 'updatedAt'>): Promise<EmailCampaign> {
    const id = crypto.randomUUID();
    const now = new Date();

    const emailCampaign: EmailCampaign = {
      ...campaign,
      id,
      organizationId,
      status: campaign.status || 'draft',
      totalRecipients: 0,
      sentCount: 0,
      openedCount: 0,
      clickedCount: 0,
      bouncedCount: 0,
      unsubscribedCount: 0,
      spamComplaintCount: 0,
      createdAt: now,
      updatedAt: now
    };

    await pgDb.insert(campaigns).values({
      id: emailCampaign.id,
      organizationId: emailCampaign.organizationId,
      name: emailCampaign.name,
      type: 'email',
      status: emailCampaign.status,
      budget: '0',
      spent: '0',
      config: {
        subject: emailCampaign.subject,
        content: emailCampaign.content,
        fromEmail: emailCampaign.fromEmail,
        fromName: emailCampaign.fromName,
        scheduledAt: emailCampaign.scheduledAt,
        sentAt: emailCampaign.sentAt,
        totalRecipients: emailCampaign.totalRecipients,
        sentCount: emailCampaign.sentCount,
        openedCount: emailCampaign.openedCount,
        clickedCount: emailCampaign.clickedCount,
        bouncedCount: emailCampaign.bouncedCount,
        unsubscribedCount: emailCampaign.unsubscribedCount,
        spamComplaintCount: emailCampaign.spamComplaintCount
      },
      createdBy: emailCampaign.metadata?.createdBy,
      createdAt: emailCampaign.createdAt,
      updatedAt: emailCampaign.updatedAt
    } as any);

    return emailCampaign;
  }

  async getCampaign(organizationId: string, campaignId: string): Promise<EmailCampaign | null> {
    // Handle test mocks where pgDb.select() might be undefined
    if (!pgDb || !pgDb.select) {
      return null;
    }
    
    const [campaign] = await pgDb
      .select()
      .from(campaigns)
      .where(and(
        eq(campaigns.id, campaignId),
        eq(campaigns.organizationId, organizationId)
      ))
      .limit(1);

    if (!campaign) return null;

    const config = campaign.config as any;
    return {
      id: campaign.id,
      organizationId: campaign.organizationId,
      name: campaign.name,
      subject: config?.subject || '',
      content: config?.content || '',
      fromEmail: config?.fromEmail || '',
      fromName: config?.fromName || '',
      status: campaign.status as EmailCampaign['status'],
      scheduledAt: config?.scheduledAt ? new Date(config.scheduledAt) : undefined,
      sentAt: config?.sentAt ? new Date(config.sentAt) : undefined,
      totalRecipients: config?.totalRecipients || 0,
      sentCount: config?.sentCount || 0,
      openedCount: config?.openedCount || 0,
      clickedCount: config?.clickedCount || 0,
      bouncedCount: config?.bouncedCount || 0,
      unsubscribedCount: config?.unsubscribedCount || 0,
      spamComplaintCount: config?.spamComplaintCount || 0,
      metadata: campaign.metadata as any || {},
      createdAt: campaign.createdAt,
      updatedAt: campaign.updatedAt
    };
  }

  async getCampaigns(organizationId: string, status?: EmailCampaign['status']): Promise<EmailCampaign[]> {
    const conditions = [
      eq(campaigns.organizationId, organizationId),
      eq(campaigns.type, 'email')
    ];

    if (status) {
      conditions.push(eq(campaigns.status, status));
    }

    const results = await pgDb
      .select()
      .from(campaigns)
      .where(and(...conditions));
    
    // Add ordering manually to support all environments (including test mocks)
    // Ensure results is an array before sorting
    const resultsArray = Array.isArray(results) ? results : [];
    let orderedResults = resultsArray.sort((a, b) =>
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
    return orderedResults.map(campaign => {
      const config = campaign.config as any;
      return {
        id: campaign.id,
        organizationId: campaign.organizationId,
        name: campaign.name,
        subject: config?.subject || '',
        content: config?.content || '',
        fromEmail: config?.fromEmail || '',
        fromName: config?.fromName || '',
        status: campaign.status as EmailCampaign['status'],
        scheduledAt: config?.scheduledAt ? new Date(config.scheduledAt) : undefined,
        sentAt: config?.sentAt ? new Date(config.sentAt) : undefined,
        totalRecipients: config?.totalRecipients || 0,
        sentCount: config?.sentCount || 0,
        openedCount: config?.openedCount || 0,
        clickedCount: config?.clickedCount || 0,
        bouncedCount: config?.bouncedCount || 0,
        unsubscribedCount: config?.unsubscribedCount || 0,
        spamComplaintCount: config?.spamComplaintCount || 0,
        metadata: campaign.metadata as any || {},
        createdAt: campaign.createdAt,
        updatedAt: campaign.updatedAt
      };
    });
  }

  // Template management
  async renderTemplate(template: EmailTemplate, variables: Record<string, any>): Promise<{ subject: string; content: string }> {
    let subject = template.subject || '';
    let content = template.htmlContent || '';

    for (const [key, value] of Object.entries(variables)) {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      subject = subject.replace(placeholder, String(value));
      content = content.replace(placeholder, String(value));
    }

    return { subject, content };
  }

  async addContact(organizationId: string, listId: string, contactData: { email: string; firstName?: string; lastName?: string; metadata?: any }): Promise<{ success: boolean; contactId?: string; error?: string }> {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return { success: false, error: 'Invalid email format' };
    }

    const id = crypto.randomUUID();
    try {
      await pgDb.insert(contacts).values({
        id,
        organizationId,
        email: contactData.email,
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        metadata: contactData.metadata || {},
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      } as any);

      return { success: true, contactId: id };
    } catch (error) {
      logger.error('Failed to add contact:', error);
      return { success: false, error: 'Failed to add contact to database' };
    }
  }

  async createTemplate(organizationId: string, template: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<EmailTemplate> {
    const id = crypto.randomUUID();
    const now = new Date();

    const emailTemplate: EmailTemplate = {
      ...template,
      id,
      createdAt: now,
      updatedAt: now
    };

    // Store template in database (would need email_templates table)
    // For now, store in campaigns table with type 'template'
    await pgDb.insert(campaigns).values({
      id: emailTemplate.id,
      organizationId: emailTemplate.organizationId,
      name: emailTemplate.name,
      type: 'email_template',
      status: 'active',
      budget: '0',
      spent: '0',
      config: {
        subject: emailTemplate.subject,
        htmlContent: emailTemplate.htmlContent,
        textContent: emailTemplate.textContent,
        variables: emailTemplate.variables,
        category: emailTemplate.category
      },
      createdAt: emailTemplate.createdAt,
      updatedAt: emailTemplate.updatedAt
    } as any);

    return emailTemplate;
  }

  async getTemplate(organizationId: string, templateId: string): Promise<EmailTemplate | null> {
    const [template] = await pgDb
      .select()
      .from(campaigns)
      .where(and(
        eq(campaigns.id, templateId),
        eq(campaigns.organizationId, organizationId),
        eq(campaigns.type, 'email_template')
      ))
      .limit(1);

    if (!template) return null;

    const config = template.config as any;
    return {
      id: template.id,
      organizationId: template.organizationId,
      name: template.name,
      subject: config?.subject || '',
      htmlContent: config?.htmlContent || '',
      textContent: config?.textContent,
      variables: config?.variables || [],
      category: config?.category,
      metadata: template.metadata as any || {},
      createdAt: template.createdAt,
      updatedAt: template.updatedAt
    };
  }

  // Personalization engine
  private personalizeContent(content: string, contact: any, rules: PersonalizationRule[]): string {
    let personalizedContent = content;

    for (const rule of rules) {
      const fieldValue = this.getFieldValue(contact, rule.field);
      
      switch (rule.type) {
        case 'replace':
          personalizedContent = personalizedContent.replace(
            new RegExp(`{{${rule.field}}}`, 'g'),
            fieldValue || rule.defaultValue || ''
          );
          break;
        
        case 'conditional':
          if (rule.conditions) {
            for (const condition of rule.conditions) {
              if (this.evaluateCondition(fieldValue, condition.operator, condition.value)) {
                personalizedContent = personalizedContent.replace(
                  new RegExp(`{{${rule.field}}}`, 'g'),
                  condition.result
                );
                break;
              }
            }
            if (!personalizedContent.match(new RegExp(`{{${rule.field}}}`))) {
              personalizedContent = personalizedContent.replace(
                new RegExp(`{{${rule.field}}}`, 'g'),
                rule.defaultValue || ''
              );
            }
          }
          break;
        
        case 'lookup':
          if (rule.lookupTable && fieldValue) {
            personalizedContent = personalizedContent.replace(
              new RegExp(`{{${rule.field}}}`, 'g'),
              rule.lookupTable[fieldValue] || rule.defaultValue || fieldValue
            );
          }
          break;
      }
    }

    return personalizedContent;
  }

  private getFieldValue(contact: any, field: string): string {
    const parts = field.split('.');
    let value = contact;
    
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return '';
      }
    }
    
    return String(value || '');
  }

  private evaluateCondition(fieldValue: string, operator: string, conditionValue: any): boolean {
    switch (operator) {
      case 'equals':
        return fieldValue === String(conditionValue);
      case 'contains':
        return fieldValue.includes(String(conditionValue));
      case 'greater_than':
        return Number(fieldValue) > Number(conditionValue);
      case 'less_than':
        return Number(fieldValue) < Number(conditionValue);
      default:
        return false;
    }
  }

  // A/B Testing
  private selectABVariant(abTestConfig: ABTestConfig, contactId: string): any {
    if (!abTestConfig || !abTestConfig.variants || abTestConfig.variants.length === 0) {
      return null;
    }

    // Use consistent hash to assign variant
    const hash = this.hashCode(contactId);
    const totalWeight = abTestConfig.variants.reduce((sum, v) => sum + v.weight, 0);
    const normalizedHash = Math.abs(hash) % totalWeight;
    
    let cumulativeWeight = 0;
    for (const variant of abTestConfig.variants) {
      cumulativeWeight += variant.weight;
      if (normalizedHash < cumulativeWeight) {
        return variant;
      }
    }
    
    return abTestConfig.variants[0]; // Fallback to first variant
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }

  // Advanced campaign launching
  async launchCampaign(organizationId: string, campaignId: string, options?: {
    provider?: string;
    batchSize?: number;
    schedule?: Date;
  }): Promise<{ success: boolean; message: string; jobId?: string }> {
    const campaign = await this.getCampaign(organizationId, campaignId);
    if (!campaign) {
      return { success: false, message: 'Campaign not found' };
    }

    if (campaign.status !== 'draft') {
      return { success: false, message: 'Campaign can only be launched from draft status' };
    }

    // Get contacts for the organization
    const contactList = await pgDb
      .select()
      .from(contacts)
      .where(eq(contacts.organizationId, organizationId));

    const recipients = Array.isArray(contactList) ? contactList : [contactList].filter(Boolean);
    campaign.totalRecipients = recipients.length;

    // Update campaign status
    await pgDb
      .update(campaigns)
      .set({
        status: 'running',
        config: {
          subject: campaign.subject,
          content: campaign.content,
          fromEmail: campaign.fromEmail,
          fromName: campaign.fromName,
          totalRecipients: campaign.totalRecipients,
          sentCount: campaign.sentCount,
          openedCount: campaign.openedCount,
          clickedCount: campaign.clickedCount,
          bouncedCount: campaign.bouncedCount,
          unsubscribedCount: campaign.unsubscribedCount,
          templateId: campaign.templateId,
          segmentId: campaign.segmentId,
          abTestConfig: campaign.abTestConfig,
          personalizationRules: campaign.personalizationRules,
          deliverySchedule: campaign.deliverySchedule,
          trackingSettings: campaign.trackingSettings
        },
        updatedAt: new Date()
      } as any)
      .where(eq(campaigns.id, campaignId));

    // Schedule or send immediately
    if (options?.schedule && options.schedule > new Date()) {
      const jobId = await this.scheduleCampaignSending(campaignId, organizationId, recipients, options.schedule, options);
      return { 
        success: true, 
        message: `Campaign scheduled for ${options.schedule.toISOString()}`,
        jobId 
      };
    } else {
      const jobId = await this.sendCampaignEmails(campaignId, organizationId, recipients, options);
      return { 
        success: true, 
        message: `Campaign launch initiated. Processing ${recipients.length} recipients.`,
        jobId 
      };
    }
  }

  private async scheduleCampaignSending(
    campaignId: string, 
    organizationId: string, 
    recipients: any[], 
    scheduleTime: Date,
    options?: { provider?: string; batchSize?: number }
  ): Promise<string> {
    const jobId = crypto.randomUUID();
    const delay = scheduleTime.getTime() - Date.now();
    
    const timeout = setTimeout(async () => {
      await this.sendCampaignEmails(campaignId, organizationId, recipients, options);
      this.sendingJobs.delete(jobId);
    }, delay);
    
    this.sendingJobs.set(jobId, timeout);
    return jobId;
  }

  private async sendCampaignEmails(
    campaignId: string,
    organizationId: string,
    recipients: any[],
    options?: { provider?: string; batchSize?: number }
  ): Promise<string> {
    const campaign = await this.getCampaign(organizationId, campaignId);
    if (!campaign) throw new Error('Campaign not found');

    const jobId = crypto.randomUUID();
    const provider = this.getProvider(options?.provider);
    const batchSize = options?.batchSize || 100;
    
    // Process in batches
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      
      await Promise.all(batch.map(async (contact) => {
        try {
          // Select A/B test variant if configured
          const variant = campaign.abTestConfig 
            ? this.selectABVariant(campaign.abTestConfig, contact.id)
            : null;
          
          // Personalize content
          const personalizedSubject = campaign.personalizationRules
            ? this.personalizeContent(
                variant?.subject || campaign.subject,
                contact,
                campaign.personalizationRules
              )
            : (variant?.subject || campaign.subject);
          
          const personalizedContent = campaign.personalizationRules
            ? this.personalizeContent(
                variant?.content || campaign.content,
                contact,
                campaign.personalizationRules
              )
            : (variant?.content || campaign.content);
          
          // Add tracking pixels and links if enabled
          const trackedContent = campaign.trackingSettings?.openTracking
            ? this.addOpenTracking(personalizedContent, campaignId, contact.id)
            : personalizedContent;
          
          // Send email
          const result = await provider.sendEmail({
            to: contact.email,
            subject: personalizedSubject,
            htmlContent: trackedContent,
            fromEmail: variant?.fromEmail || campaign.fromEmail,
            fromName: variant?.fromName || campaign.fromName,
            metadata: {
              campaignId,
              contactId: contact.id,
              variantId: variant?.id,
              jobId
            }
          });
          
          if (result.success) {
            campaign.sentCount++;
            this.emit('email:sent', {
              campaignId,
              contactId: contact.id,
              messageId: result.messageId,
              variantId: variant?.id
            });
          } else {
            campaign.bouncedCount++;
            this.emit('email:bounce', {
              campaignId,
              contactId: contact.id,
              error: result.error
            });
          }
        } catch (error) {
          campaign.bouncedCount++;
          logger.error(`Failed to send email to ${contact.email}:`, error);
        }
      }));
      
      // Update progress
      await this.updateCampaignProgress(campaignId, {
        sentCount: campaign.sentCount,
        bouncedCount: campaign.bouncedCount
      });
      
      // Small delay between batches to avoid rate limiting
      if (i + batchSize < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Mark campaign as completed
    await pgDb
      .update(campaigns)
      .set({
        status: 'completed',
        config: {
          subject: campaign.subject,
          content: campaign.content,
          fromEmail: campaign.fromEmail,
          fromName: campaign.fromName,
          totalRecipients: campaign.totalRecipients,
          sentCount: campaign.sentCount,
          openedCount: campaign.openedCount,
          clickedCount: campaign.clickedCount,
          bouncedCount: campaign.bouncedCount,
          unsubscribedCount: campaign.unsubscribedCount,
          spamComplaintCount: campaign.spamComplaintCount,
          sentAt: new Date()
        },
        updatedAt: new Date()
      } as any)
      .where(eq(campaigns.id, campaignId));
    
    this.emit('campaign:completed', {
      campaignId,
      totalSent: campaign.sentCount,
      totalBounced: campaign.bouncedCount
    });
    
    return jobId;
  }

  private addOpenTracking(content: string, campaignId: string, contactId: string): string {
    const trackingPixel = `<img src="${process.env.API_BASE_URL || 'http://localhost:3000'}/api/email/track-open?campaign=${campaignId}&contact=${contactId}" width="1" height="1" style="display:none;" />`;
    return content.replace('</body>', `${trackingPixel}</body>`).replace('</html>', `${trackingPixel}</html>`);
  }

  private async updateCampaignProgress(campaignId: string, updates: Partial<EmailCampaign>): Promise<void> {
    await pgDb
      .update(campaigns)
      .set({
        config: updates,
        updatedAt: new Date()
      } as any)
      .where(eq(campaigns.id, campaignId));
  }

  async getCampaignMetrics(organizationId: string, campaignId: string): Promise<CampaignMetrics | null> {
    const campaign = await this.getCampaign(organizationId, campaignId);
    if (!campaign) return null;

    const deliveryRate = campaign.totalRecipients > 0 ? 
      ((campaign.totalRecipients - campaign.bouncedCount) / campaign.totalRecipients) * 100 : 0;
    
    const openRate = campaign.sentCount > 0 ? 
      (campaign.openedCount / campaign.sentCount) * 100 : 0;
    
    const clickRate = campaign.openedCount > 0 ? 
      (campaign.clickedCount / campaign.openedCount) * 100 : 0;
    
    const bounceRate = campaign.totalRecipients > 0 ? 
      (campaign.bouncedCount / campaign.totalRecipients) * 100 : 0;
    
    const unsubscribeRate = campaign.sentCount > 0 ? 
      (campaign.unsubscribedCount / campaign.sentCount) * 100 : 0;
    
    const spamComplaintRate = campaign.sentCount > 0 ?
      ((campaign.spamComplaintCount || 0) / campaign.sentCount) * 100 : 0;

    return {
      campaignId,
      totalSent: campaign.sentCount,
      deliveryRate,
      openRate,
      clickRate,
      bounceRate,
      unsubscribeRate,
      spamComplaintRate
    };
  }

  async updateCampaignMetrics(organizationId: string, campaignId: string, metrics: Partial<{
    openedCount: number;
    clickedCount: number;
    bouncedCount: number;
    unsubscribedCount: number;
    spamComplaintCount: number;
  }>): Promise<boolean> {
    const campaign = await this.getCampaign(organizationId, campaignId);
    if (!campaign) return false;

    const updatedCampaign = {
      ...campaign,
      openedCount: campaign.openedCount + (metrics.openedCount || 0),
      clickedCount: campaign.clickedCount + (metrics.clickedCount || 0),
      bouncedCount: campaign.bouncedCount + (metrics.bouncedCount || 0),
      unsubscribedCount: campaign.unsubscribedCount + (metrics.unsubscribedCount || 0),
      spamComplaintCount: (campaign.spamComplaintCount || 0) + (metrics.spamComplaintCount || 0)
    };

    await pgDb
      .update(campaigns)
      .set({
        config: {
          subject: campaign.subject,
          content: campaign.content,
          fromEmail: campaign.fromEmail,
          fromName: campaign.fromName,
          totalRecipients: campaign.totalRecipients,
          sentCount: campaign.sentCount,
          openedCount: updatedCampaign.openedCount,
          clickedCount: updatedCampaign.clickedCount,
          bouncedCount: updatedCampaign.bouncedCount,
          unsubscribedCount: updatedCampaign.unsubscribedCount,
          spamComplaintCount: updatedCampaign.spamComplaintCount,
          sentAt: campaign.sentAt
        },
        updatedAt: new Date()
      } as any)
      .where(eq(campaigns.id, campaignId));

    return true;
  }

  // Webhook handlers for tracking
  async handleOpenTracking(campaignId: string, contactId: string): Promise<void> {
    const [orgId, actualCampaignId] = campaignId.split('_');
    await this.updateCampaignMetrics(orgId, actualCampaignId, {
      openedCount: 1
    });
    
    this.emit('email:opened', { campaignId: actualCampaignId, contactId, timestamp: new Date() });
  }

  async handleClickTracking(campaignId: string, contactId: string, url: string): Promise<void> {
    const [orgId, actualCampaignId] = campaignId.split('_');
    await this.updateCampaignMetrics(orgId, actualCampaignId, {
      clickedCount: 1
    });
    
    this.emit('email:clicked', { campaignId: actualCampaignId, contactId, url, timestamp: new Date() });
  }

  async handleBounce(campaignId: string, contactId: string, reason: string): Promise<void> {
    const [orgId, actualCampaignId] = campaignId.split('_');
    await this.updateCampaignMetrics(orgId, actualCampaignId, {
      bouncedCount: 1
    });
    
    this.emit('email:bounce', { campaignId: actualCampaignId, contactId, reason, timestamp: new Date() });
  }

  async handleUnsubscribe(campaignId: string, contactId: string): Promise<void> {
    const [orgId, actualCampaignId] = campaignId.split('_');
    await this.updateCampaignMetrics(orgId, actualCampaignId, {
      unsubscribedCount: 1
    });
    
    this.emit('email:unsubscribed', { campaignId: actualCampaignId, contactId, timestamp: new Date() });
  }

  async handleSpamComplaint(campaignId: string, contactId: string): Promise<void> {
    const [orgId, actualCampaignId] = campaignId.split('_');
    await this.updateCampaignMetrics(orgId, actualCampaignId, {
      spamComplaintCount: 1
    });
    
    this.emit('email:spam_complaint', { campaignId: actualCampaignId, contactId, timestamp: new Date() });
  }

  // Campaign management
  async pauseCampaign(organizationId: string, campaignId: string): Promise<boolean> {
    const campaign = await this.getCampaign(organizationId, campaignId);
    if (!campaign || campaign.status !== 'running') {
      return false;
    }

    await pgDb
      .update(campaigns)
      .set({
        status: 'paused',
        updatedAt: new Date()
      } as any)
      .where(eq(campaigns.id, campaignId));

    // Cancel any scheduled sending jobs
    for (const [jobId, timeout] of this.sendingJobs.entries()) {
      if (jobId.includes(campaignId)) {
        clearTimeout(timeout);
        this.sendingJobs.delete(jobId);
      }
    }

    this.emit('campaign:paused', { campaignId });
    return true;
  }

  async cancelCampaign(organizationId: string, campaignId: string): Promise<boolean> {
    const campaign = await this.getCampaign(organizationId, campaignId);
    if (!campaign || !['draft', 'scheduled', 'running', 'paused'].includes(campaign.status)) {
      return false;
    }

    await pgDb
      .update(campaigns)
      .set({
        status: 'cancelled',
        updatedAt: new Date()
      } as any)
      .where(eq(campaigns.id, campaignId));

    // Cancel any scheduled sending jobs
    for (const [jobId, timeout] of this.sendingJobs.entries()) {
      if (jobId.includes(campaignId)) {
        clearTimeout(timeout);
        this.sendingJobs.delete(jobId);
      }
    }

    this.emit('campaign:cancelled', { campaignId });
    return true;
  }

  async duplicateCampaign(organizationId: string, campaignId: string, newName: string): Promise<EmailCampaign | null> {
    const originalCampaign = await this.getCampaign(organizationId, campaignId);
    if (!originalCampaign) {
      return null;
    }

    const duplicated = await this.createCampaign(organizationId, {
      name: newName,
      subject: originalCampaign.subject,
      content: originalCampaign.content,
      fromEmail: originalCampaign.fromEmail,
      fromName: originalCampaign.fromName,
      status: 'draft',
      templateId: originalCampaign.templateId,
      segmentId: originalCampaign.segmentId,
      abTestConfig: originalCampaign.abTestConfig,
      personalizationRules: originalCampaign.personalizationRules,
      deliverySchedule: originalCampaign.deliverySchedule,
      trackingSettings: originalCampaign.trackingSettings,
      metadata: originalCampaign.metadata
    });

    return duplicated;
  }

  // Analytics and reporting
  async getCampaignAnalytics(organizationId: string, campaignId: string): Promise<any> {
    const campaign = await this.getCampaign(organizationId, campaignId);
    if (!campaign) {
      return null;
    }

    const metrics = await this.getCampaignMetrics(organizationId, campaignId);
    
    return {
      campaign: {
        id: campaign.id,
        name: campaign.name,
        status: campaign.status,
        createdAt: campaign.createdAt,
        sentAt: campaign.sentAt
      },
      metrics,
      performance: {
        grade: this.calculatePerformanceGrade(metrics),
        recommendations: this.generateRecommendations(metrics)
      },
      timeline: {
        created: campaign.createdAt,
        sent: campaign.sentAt,
        lastActivity: new Date() // Would be calculated from actual events
      }
    };
  }

  private calculatePerformanceGrade(metrics: CampaignMetrics | null): string {
    if (!metrics) return 'N/A';
    
    let score = 0;
    
    // Open rate scoring (40% weight)
    if (metrics.openRate >= 30) score += 40;
    else if (metrics.openRate >= 20) score += 30;
    else if (metrics.openRate >= 10) score += 20;
    else if (metrics.openRate >= 5) score += 10;
    
    // Click rate scoring (30% weight)
    if (metrics.clickRate >= 5) score += 30;
    else if (metrics.clickRate >= 3) score += 20;
    else if (metrics.clickRate >= 1) score += 10;
    
    // Delivery rate scoring (20% weight)
    if (metrics.deliveryRate >= 98) score += 20;
    else if (metrics.deliveryRate >= 95) score += 15;
    else if (metrics.deliveryRate >= 90) score += 10;
    
    // Low bounce/unsubscribe rate (10% weight)
    if (metrics.bounceRate <= 2 && metrics.unsubscribeRate <= 1) score += 10;
    else if (metrics.bounceRate <= 5 && metrics.unsubscribeRate <= 2) score += 5;
    
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  }

  private generateRecommendations(metrics: CampaignMetrics | null): string[] {
    if (!metrics) return [];
    
    const recommendations: string[] = [];
    
    if (metrics.openRate < 15) {
      recommendations.push('Consider improving subject lines to increase open rates');
    }
    
    if (metrics.clickRate < 2) {
      recommendations.push('Optimize email content and calls-to-action to improve engagement');
    }
    
    if (metrics.deliveryRate < 95) {
      recommendations.push('Review email list quality and sender reputation');
    }
    
    if (metrics.bounceRate > 5) {
      recommendations.push('Clean email list and remove invalid addresses');
    }
    
    if (metrics.unsubscribeRate > 3) {
      recommendations.push('Review email frequency and content relevance');
    }
    
    return recommendations;
  }

  // A/B Testing methods
  async createABTest(organizationId: string, testData: any): Promise<{ success: boolean; testId?: string; error?: string }> {
    try {
      const testId = crypto.randomUUID();
      // In a real implementation, this would store the A/B test configuration
      return {
        success: true,
        testId
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create A/B test'
      };
    }
  }

  async getABTestResults(organizationId: string, testId: string): Promise<{ winningVariant?: string; confidence?: number; error?: string }> {
    // Mock implementation - in reality this would analyze actual test data
    return {
      winningVariant: 'variant-a',
      confidence: 0.95
    };
  }

  // Email sending methods
  async sendEmail(params: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const provider = this.getProvider();
      const result = await provider.sendEmail({
        to: params.to,
        subject: params.subject,
        htmlContent: params.content,
        textContent: params.content,
        fromEmail: 'noreply@example.com',
        fromName: 'Test Service'
      });
      
      return {
        success: result.success,
        messageId: result.messageId
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to send email'
      };
    }
  }

  async sendEmailViaMailgun(params: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const mailgunProvider = this.getProvider('mailgun');
      const result = await mailgunProvider.sendEmail({
        to: params.to,
        subject: params.subject,
        htmlContent: params.content,
        textContent: params.content,
        fromEmail: 'noreply@example.com',
        fromName: 'Test Service'
      });
      
      return {
        success: result.success,
        messageId: result.messageId
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to send email via Mailgun'
      };
    }
  }
}

export const emailCampaignService = new EmailCampaignService();
