/**
 * WhatsApp Business API Integration
 * Handles messaging, templates, and webhook verification via Meta's WhatsApp Business API
 */

export interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  type: 'text' | 'image' | 'document' | 'audio' | 'video' | 'interactive' | 'location' | 'contacts';
  text?: { body: string; preview_url?: string };
  timestamp: string;
  conversationId?: string;
}

export interface WhatsAppTemplate {
  name: string;
  language: string;
  components: WhatsAppTemplateComponent[];
}

export interface WhatsAppTemplateComponent {
  type: 'header' | 'body' | 'footer' | 'button';
  parameters: { type: string; text?: string; image?: { link: string } }[];
}

export interface WhatsAppConfig {
  apiVersion: string;
  businessAccountId: string;
  accessToken: string;
  phoneNumberId: string;
  webhookUrl: string;
  verifyToken: string;
}

export class WhatsAppIntegrationService {
  private config: WhatsAppConfig | null = null;
  private baseUrl = 'https://graph.facebook.com';
  private isInitialized = false;

  async initialize(config: WhatsAppConfig): Promise<void> {
    this.config = config;
    this.isInitialized = true;

    // Verify token validity
    try {
      const res = await fetch(
        `${this.baseUrl}/${config.apiVersion}/${config.phoneNumberId}?access_token=${config.accessToken}`
      );
      if (!res.ok) throw new Error(`WhatsApp API returned ${res.status}`);
      console.log(`WhatsApp integration initialized for phone: ${config.phoneNumberId}`);
    } catch (error) {
      console.error('Failed to initialize WhatsApp integration:', error);
      throw new Error('WhatsApp authentication failed');
    }
  }

  /** Verify webhook challenge from Meta */
  verifyWebhook(mode: string, token: string, challenge: string): string | null {
    if (!this.config) return null;
    if (mode === 'subscribe' && token === this.config.verifyToken) {
      return challenge;
    }
    return null;
  }

  /** Send a text message */
  async sendMessage(to: string, text: string, previewUrl = false): Promise<{ messageId: string }> {
    this.ensureInitialized();
    const res = await fetch(
      `${this.baseUrl}/${this.config!.apiVersion}/${this.config!.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config!.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: text, preview_url: previewUrl },
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`WhatsApp send failed: ${data.error?.message || res.status}`);
    return { messageId: data.messages?.[0]?.id };
  }

  /** Send a template message */
  async sendTemplate(to: string, template: WhatsAppTemplate): Promise<{ messageId: string }> {
    this.ensureInitialized();
    const res = await fetch(
      `${this.baseUrl}/${this.config!.apiVersion}/${this.config!.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config!.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'template',
          template: {
            name: template.name,
            language: { code: template.language },
            components: template.components,
          },
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`WhatsApp template send failed: ${data.error?.message || res.status}`);
    return { messageId: data.messages?.[0]?.id };
  }

  /** Send a media message */
  async sendMedia(to: string, type: 'image' | 'document' | 'audio' | 'video', mediaId: string, caption?: string): Promise<{ messageId: string }> {
    this.ensureInitialized();
    const body: Record<string, unknown> = {
      messaging_product: 'whatsapp',
      to,
      type,
      [type]: { id: mediaId },
    };
    if (caption && type !== 'audio') {
      (body[type] as Record<string, unknown>).caption = caption;
    }
    const res = await fetch(
      `${this.baseUrl}/${this.config!.apiVersion}/${this.config!.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config!.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`WhatsApp media send failed: ${data.error?.message || res.status}`);
    return { messageId: data.messages?.[0]?.id };
  }

  /** Parse incoming webhook payload */
  parseWebhookPayload(body: unknown): WhatsAppMessage[] {
    const payload = body as Record<string, unknown>;
    const entries = payload?.entry as Array<Record<string, unknown>> | undefined;
    if (!entries) return [];

    const messages: WhatsAppMessage[] = [];
    for (const entry of entries) {
      const changes = entry?.changes as Array<Record<string, unknown>> | undefined;
      for (const change of changes || []) {
        const value = change?.value as Record<string, unknown> | undefined;
        const msgs = value?.messages as Array<Record<string, unknown>> | undefined;
        for (const msg of msgs || []) {
          messages.push({
            id: msg.id as string,
            from: msg.from as string,
            to: this.config?.phoneNumberId || '',
            type: msg.type as WhatsAppMessage['type'],
            text: msg.text as WhatsAppMessage['text'],
            timestamp: msg.timestamp as string,
          });
        }
      }
    }
    return messages;
  }

  /** Mark a message as read */
  async markAsRead(messageId: string): Promise<void> {
    this.ensureInitialized();
    await fetch(
      `${this.baseUrl}/${this.config!.apiVersion}/${this.config!.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config!.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messaging_product: 'whatsapp', status: 'read', message_id: messageId }),
      }
    );
  }

  private ensureInitialized(): void {
    if (!this.isInitialized || !this.config) {
      throw new Error('WhatsApp integration not initialized');
    }
  }
}
