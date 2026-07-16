/**
 * Telegram Bot Integration Service
 * Handles Telegram bot commands, messages, inline queries, and webhook management
 */

export interface TelegramMessage {
  messageId: number;
  from?: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
  photo?: TelegramPhoto[];
  document?: TelegramDocument;
  replyToMessage?: TelegramMessage;
  caption?: string;
}

export interface TelegramUser {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  isBot: boolean;
  languageCode?: string;
}

export interface TelegramChat {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

export interface TelegramPhoto {
  fileId: string;
  width: number;
  height: number;
  fileSize?: number;
}

export interface TelegramDocument {
  fileId: string;
  fileName?: string;
  mimeType?: string;
  fileSize?: number;
}

export interface TelegramConfig {
  botToken: string;
  webhookUrl?: string;
  allowedChatIds?: number[];
  commandPrefix?: string;
}

export class TelegramIntegrationService {
  private config: TelegramConfig | null = null;
  private baseUrl = 'https://api.telegram.org';
  private isInitialized = false;

  async initialize(config: TelegramConfig): Promise<void> {
    this.config = config;
    this.isInitialized = true;

    // Verify connection
    try {
      const res = await fetch(`${this.baseUrl}/bot${config.botToken}/getMe`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.description);
      console.log(`Telegram integration initialized for bot: @${data.result.username}`);
    } catch (error) {
      console.error('Failed to initialize Telegram integration:', error);
      throw new Error('Telegram authentication failed');
    }
  }

  /** Set webhook for receiving updates */
  async setWebhook(url: string, options?: { allowedUpdates?: string[]; dropPendingUpdates?: boolean }): Promise<boolean> {
    this.ensureInitialized();
    const params = new URLSearchParams({ url });
    if (options?.allowedUpdates) params.append('allowed_updates', JSON.stringify(options.allowedUpdates));
    if (options?.dropPendingUpdates) params.append('drop_pending_updates', 'true');

    const res = await fetch(`${this.baseUrl}/bot${this.config!.botToken}/setWebhook?${params.toString()}`);
    const data = await res.json();
    return data.ok === true;
  }

  /** Remove webhook */
  async deleteWebhook(dropPendingUpdates = false): Promise<boolean> {
    this.ensureInitialized();
    const res = await fetch(`${this.baseUrl}/bot${this.config!.botToken}/deleteWebhook?drop_pending_updates=${dropPendingUpdates}`);
    const data = await res.json();
    return data.ok === true;
  }

  /** Send a text message */
  async sendMessage(chatId: number, text: string, options?: { parseMode?: 'HTML' | 'Markdown'; replyTo?: number; keyboard?: Array<Array<{ text: string }>> }): Promise<{ messageId: number }> {
    this.ensureInitialized();
    const body: Record<string, unknown> = { chat_id: chatId, text, parse_mode: options?.parseMode || 'HTML' };
    if (options?.replyTo) body.reply_to_message_id = options.replyTo;
    if (options?.keyboard) {
      body.reply_markup = {
        keyboard: options.keyboard,
        resize_keyboard: true,
        one_time_keyboard: false,
      };
    }

    const res = await fetch(`${this.baseUrl}/bot${this.config!.botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(`Telegram send failed: ${data.description}`);
    return { messageId: data.result.message_id };
  }

  /** Send a photo */
  async sendPhoto(chatId: number, photoUrl: string, caption?: string): Promise<{ messageId: number }> {
    this.ensureInitialized();
    const body: Record<string, unknown> = { chat_id: chatId, photo: photoUrl };
    if (caption) body.caption = caption;

    const res = await fetch(`${this.baseUrl}/bot${this.config!.botToken}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(`Telegram photo send failed: ${data.description}`);
    return { messageId: data.result.message_id };
  }

  /** Send a document */
  async sendDocument(chatId: number, documentUrl: string, caption?: string): Promise<{ messageId: number }> {
    this.ensureInitialized();
    const body: Record<string, unknown> = { chat_id: chatId, document: documentUrl };
    if (caption) body.caption = caption;

    const res = await fetch(`${this.baseUrl}/bot${this.config!.botToken}/sendDocument`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(`Telegram document send failed: ${data.description}`);
    return { messageId: data.result.message_id };
  }

  /** Parse incoming update from Telegram webhook */
  parseUpdate(update: Record<string, unknown>): TelegramMessage | null {
    const message = update?.message as Record<string, unknown> | undefined;
    if (!message) return null;

    // Check if chat is allowed
    const chat = message.chat as Record<string, unknown> | undefined;
    if (chat && this.config?.allowedChatIds?.length) {
      if (!this.config.allowedChatIds.includes(chat.id as number)) return null;
    }

    const from = message.from as Record<string, unknown> | undefined;
    const replyTo = message.reply_to_message as Record<string, unknown> | undefined;

    return {
      messageId: message.message_id as number,
      from: from ? {
        id: from.id as number,
        firstName: (from.first_name as string) || '',
        lastName: from.last_name as string,
        username: from.username as string,
        isBot: from.is_bot as boolean,
      } : undefined,
      chat: {
        id: chat!.id as number,
        type: chat!.type as TelegramChat['type'],
        title: chat!.title as string,
        firstName: chat!.first_name as string,
        lastName: chat!.last_name as string,
        username: chat!.username as string,
      },
      date: message.date as number,
      text: message.text as string,
      caption: message.caption as string,
      replyToMessage: replyTo ? this.parseUpdate({ message: replyTo }) || undefined : undefined,
    };
  }

  /** Get bot info */
  async getBotInfo(): Promise<{ id: number; firstName: string; username: string; canJoinGroups: boolean; canReadAllGroupMessages: boolean }> {
    this.ensureInitialized();
    const res = await fetch(`${this.baseUrl}/bot${this.config!.botToken}/getMe`);
    const data = await res.json();
    const r = data.result;
    return {
      id: r.id,
      firstName: r.first_name,
      username: r.username,
      canJoinGroups: r.can_join_groups,
      canReadAllGroupMessages: r.can_read_all_group_messages,
    };
  }

  private ensureInitialized(): void {
    if (!this.isInitialized || !this.config) {
      throw new Error('Telegram integration not initialized');
    }
  }
}
