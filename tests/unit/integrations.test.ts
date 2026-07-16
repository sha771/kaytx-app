import { describe, it, expect } from '@jest/globals';
import { WhatsAppIntegrationService } from '../../backend/integrations/whatsapp-integration';
import { InstagramIntegrationService } from '../../backend/integrations/instagram-integration';
import { FacebookIntegrationService } from '../../backend/integrations/facebook-integration';
import { LinkedInIntegrationService } from '../../backend/integrations/linkedin-integration';
import { TwitterIntegrationService } from '../../backend/integrations/twitter-integration';
import { TelegramIntegrationService } from '../../backend/integrations/telegram-integration';
import { SignalIntegrationService } from '../../backend/integrations/signal-integration';

describe('Platform Integration Services', () => {
  describe('WhatsApp', () => {
    it('should construct without config', () => {
      const svc = new WhatsAppIntegrationService();
      expect(svc).toBeDefined();
    });

    it('should return null for webhook verify when not initialized', () => {
      const svc = new WhatsAppIntegrationService();
      const result = svc.verifyWebhook('subscribe', 'token', 'challenge');
      expect(result).toBeNull();
    });

    it('should verify webhook with correct token', async () => {
      const svc = new WhatsAppIntegrationService();
      await svc.initialize({
        apiVersion: 'v21.0',
        businessAccountId: '123',
        accessToken: 'token',
        phoneNumberId: '456',
        webhookUrl: 'https://example.com/webhook',
        verifyToken: 'my-secret',
      });
      const result = svc.verifyWebhook('subscribe', 'my-secret', 'challenge123');
      expect(result).toBe('challenge123');
    });

    it('should reject webhook with wrong token', async () => {
      const svc = new WhatsAppIntegrationService();
      await svc.initialize({
        apiVersion: 'v21.0',
        businessAccountId: '123',
        accessToken: 'token',
        phoneNumberId: '456',
        webhookUrl: 'https://example.com/webhook',
        verifyToken: 'my-secret',
      });
      const result = svc.verifyWebhook('subscribe', 'wrong', 'challenge');
      expect(result).toBeNull();
    });

    it('should parse webhook payload', async () => {
      const svc = new WhatsAppIntegrationService();
      const payload = {
        entry: [
          {
            changes: [
              {
                value: {
                  messages: [
                    { id: 'msg1', from: '1234567890', type: 'text', text: { body: 'Hello' }, timestamp: '1234567890' },
                  ],
                },
              },
            ],
          },
        ],
      };
      const messages = svc.parseWebhookPayload(payload);
      expect(messages.length).toBe(1);
      expect(messages[0].from).toBe('1234567890');
      expect(messages[0].text?.body).toBe('Hello');
    });
  });

  describe('Instagram', () => {
    it('should build auth URL', () => {
      const svc = new InstagramIntegrationService();
      // @ts-expect-error setting config for test
      svc.config = { clientId: 'ig_client', redirectUri: 'https://app/cb', accessToken: '', businessAccountId: '' };
      const url = svc.getAuthUrl();
      expect(url).toContain('client_id=ig_client');
      expect(url).toContain('redirect_uri=');
      expect(url).toContain('instagram_basic');
    });
  });

  describe('Facebook', () => {
    it('should verify webhook', async () => {
      const svc = new FacebookIntegrationService();
      await svc.initialize({
        clientId: '', clientSecret: '', redirectUri: '',
        pageAccessToken: '', pageId: '123', verifyToken: 'fb-secret', appId: '',
      });
      expect(svc.verifyWebhook('subscribe', 'fb-secret', 'challenge')).toBe('challenge');
      expect(svc.verifyWebhook('subscribe', 'wrong', 'challenge')).toBeNull();
    });

    it('should parse webhook messaging payload', async () => {
      const svc = new FacebookIntegrationService();
      await svc.initialize({
        clientId: '', clientSecret: '', redirectUri: '',
        pageAccessToken: '', pageId: '123', verifyToken: '', appId: '',
      });
      const payload = {
        entry: [
          {
            messaging: [
              {
                sender: { id: 'user1' },
                message: { text: 'Hi there' },
                timestamp: '1234567890',
              },
            ],
          },
        ],
      };
      const messages = svc.parseWebhookPayload(payload);
      expect(messages.length).toBe(1);
      expect(messages[0].senderId).toBe('user1');
      expect(messages[0].message).toBe('Hi there');
    });
  });

  describe('LinkedIn', () => {
    it('should build OAuth URL with scopes', () => {
      const svc = new LinkedInIntegrationService();
      // @ts-expect-error test
      svc.config = { clientId: 'li_client', redirectUri: 'https://app/cb' };
      const url = svc.getAuthUrl();
      expect(url).toContain('linkedin.com/oauth/v2/authorization');
      expect(url).toContain('client_id=li_client');
    });
  });

  describe('Twitter', () => {
    it('should build OAuth URL', () => {
      const svc = new TwitterIntegrationService();
      // @ts-expect-error test
      svc.config = { clientId: 'tw_client', redirectUri: 'https://app/cb' };
      const url = svc.getAuthUrl();
      expect(url).toContain('twitter.com/i/oauth2/authorize');
      expect(url).toContain('client_id=tw_client');
    });
  });

  describe('Telegram', () => {
    it('should parse incoming update', () => {
      const svc = new TelegramIntegrationService();
      const update = {
        message: {
          message_id: 42,
          from: { id: 111, first_name: 'Alice', is_bot: false },
          chat: { id: 222, type: 'private' },
          date: 1700000000,
          text: 'Hello bot',
        },
      };
      const msg = svc.parseUpdate(update);
      expect(msg).not.toBeNull();
      expect(msg!.messageId).toBe(42);
      expect(msg!.text).toBe('Hello bot');
      expect(msg!.chat.id).toBe(222);
      expect(msg!.from?.firstName).toBe('Alice');
    });

    it('should return null for update without message', () => {
      const svc = new TelegramIntegrationService();
      expect(svc.parseUpdate({})).toBeNull();
    });

    it('should respect allowed chat IDs filter', () => {
      const svc = new TelegramIntegrationService();
      // @ts-expect-error test
      svc.config = { botToken: 'token', allowedChatIds: [999] };
      const update = {
        message: {
          message_id: 1,
          chat: { id: 222, type: 'private' },
          date: 0,
          text: 'x',
        },
      };
      // Not in allowlist → should be filtered out
      expect(svc.parseUpdate(update)).toBeNull();
    });
  });

  describe('Signal', () => {
    it('should construct', () => {
      const svc = new SignalIntegrationService();
      expect(svc).toBeDefined();
    });

    it('should parse a signal-cli message', () => {
      const svc = new SignalIntegrationService();
      // @ts-expect-error accessing private for test
      const result = svc.parseMessage({
        envelope: {
          source: '+1234567890',
          sourceName: 'Alice',
          sourceDevice: 1,
          dataMessage: { timestamp: 1700000000000, message: 'Hello' },
        },
      });
      expect(result.source).toBe('+1234567890');
      expect(result.sourceName).toBe('Alice');
      expect(result.text).toBe('Hello');
    });
  });
});
