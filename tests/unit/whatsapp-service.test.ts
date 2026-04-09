import { WhatsAppService, WhatsAppConnection, WhatsAppMessage } from '../../backend/services/whatsapp-service';
import { db } from '../../backend/db/connection';
import { users, organizations } from '../../backend/db/drizzle-schema';

// Mock dependencies
jest.mock('../../backend/db/connection');
jest.mock('qrcode');
jest.mock('axios');

const mockDb = db as jest.Mocked<typeof db>;
const mockQRCode = require('qrcode');
const mockAxios = require('axios');

describe('WhatsAppService', () => {
  let service: WhatsAppService;
  const mockUserId = 'user-123';
  const mockOrgId = 'org-123';
  const mockPhoneNumber = '+1234567890';

  beforeEach(() => {
    service = new WhatsAppService();
    jest.clearAllMocks();
    
    // Mock database responses
    mockDb.select.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([{ id: mockUserId }])
        })
      })
    } as any);

    mockQRCode.toDataURL = jest.fn().mockResolvedValue('data:image/png;base64,mock-qr-code');
    
    mockAxios.create = jest.fn().mockReturnValue({
      post: jest.fn().mockResolvedValue({
        data: {
          messages: [{ id: 'msg-123' }]
        }
      })
    });
  });

  describe('generateQRCode', () => {
    it('should generate QR code successfully', async () => {
      const result = await service.generateQRCode(mockUserId, mockOrgId, mockPhoneNumber);

      expect(result).toHaveProperty('sessionId');
      expect(result).toHaveProperty('qrCode');
      expect(result).toHaveProperty('linkingCode');
      expect(result).toHaveProperty('phoneNumber', mockPhoneNumber);
      expect(result).toHaveProperty('status', 'pending');
      expect(mockQRCode.toDataURL).toHaveBeenCalled();
    });

    it('should throw error for invalid user', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      } as any);

      await expect(service.generateQRCode('invalid-user', mockOrgId, mockPhoneNumber))
        .rejects.toThrow('User not found');
    });

    it('should throw error for invalid organization', async () => {
      mockDb.select.mockReturnValueOnce({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{ id: mockUserId }])
          })
        })
      } as any).mockReturnValueOnce({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      } as any);

      await expect(service.generateQRCode(mockUserId, 'invalid-org', mockPhoneNumber))
        .rejects.toThrow('Organization not found');
    });
  });

  describe('verifyConnection', () => {
    it('should verify connection successfully', async () => {
      // First generate a QR code to create a session
      const connection = await service.generateQRCode(mockUserId, mockOrgId, mockPhoneNumber);
      
      const payload = {
        sessionId: connection.sessionId,
        verified: true,
        phoneNumber: mockPhoneNumber,
        businessAccountId: 'ba-123',
        accessToken: 'test-access-token'
      };

      const result = await service.verifyConnection(payload);

      expect(result).toBeTruthy();
      expect(result?.status).toBe('verified');
    });

    it('should return null for invalid session', async () => {
      const payload = {
        sessionId: 'invalid-session',
        verified: true,
        phoneNumber: mockPhoneNumber,
        businessAccountId: 'ba-123',
        accessToken: 'test-access-token'
      };

      const result = await service.verifyConnection(payload);

      expect(result).toBeNull();
    });

    it('should mark session as failed when verification fails', async () => {
      const connection = await service.generateQRCode(mockUserId, mockOrgId, mockPhoneNumber);
      
      const payload = {
        sessionId: connection.sessionId,
        verified: false,
        phoneNumber: mockPhoneNumber,
        businessAccountId: 'ba-123',
        accessToken: 'test-access-token'
      };

      const result = await service.verifyConnection(payload);

      expect(result).toBeTruthy();
      expect(result?.status).toBe('failed');
    });
  });

  describe('sendMessage', () => {
    it('should send message successfully', async () => {
      // Create and verify a session first
      const connection = await service.generateQRCode(mockUserId, mockOrgId, mockPhoneNumber);
      await service.verifyConnection({
        sessionId: connection.sessionId,
        verified: true,
        phoneNumber: mockPhoneNumber,
        businessAccountId: 'ba-123',
        accessToken: 'test-access-token'
      });

      const result = await service.sendMessage(
        connection.sessionId,
        '+0987654321',
        'Test message',
        'text'
      );

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('content', 'Test message');
      expect(result).toHaveProperty('type', 'text');
      expect(result).toHaveProperty('status', 'sent');
    });

    it('should throw error for invalid session', async () => {
      await expect(service.sendMessage('invalid-session', '+0987654321', 'Test message'))
        .rejects.toThrow('Invalid or unverified session');
    });

    it('should throw error for unverified session', async () => {
      const connection = await service.generateQRCode(mockUserId, mockOrgId, mockPhoneNumber);

      await expect(service.sendMessage(connection.sessionId, '+0987654321', 'Test message'))
        .rejects.toThrow('Invalid or unverified session');
    });
  });

  describe('sendTemplateMessage', () => {
    it('should send template message successfully', async () => {
      const connection = await service.generateQRCode(mockUserId, mockOrgId, mockPhoneNumber);
      await service.verifyConnection({
        sessionId: connection.sessionId,
        verified: true,
        phoneNumber: mockPhoneNumber,
        businessAccountId: 'ba-123',
        accessToken: 'test-access-token'
      });

      // Create a template first
      const template = await service.createTemplate({
        organizationId: mockOrgId,
        name: 'test_template',
        category: 'utility',
        language: 'en',
        components: [{
          type: 'body',
          text: 'Hello {{name}}!'
        }],
        isActive: true
      });

      const result = await service.sendTemplateMessage(
        connection.sessionId,
        template.id,
        '+0987654321',
        { name: 'John' }
      );

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('status', 'sent');
    });

    it('should throw error for invalid template', async () => {
      const connection = await service.generateQRCode(mockUserId, mockOrgId, mockPhoneNumber);
      await service.verifyConnection({
        sessionId: connection.sessionId,
        verified: true,
        phoneNumber: mockPhoneNumber,
        businessAccountId: 'ba-123',
        accessToken: 'test-access-token'
      });

      await expect(service.sendTemplateMessage(connection.sessionId, 'invalid-template', '+0987654321'))
        .rejects.toThrow('Template not found');
    });
  });

  describe('createTemplate', () => {
    it('should create template successfully', async () => {
      const result = await service.createTemplate({
        organizationId: mockOrgId,
        name: 'test_template',
        category: 'utility',
        language: 'en',
        components: [{
          type: 'body',
          text: 'Hello {{name}}!'
        }],
        isActive: true
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name', 'test_template');
      expect(result).toHaveProperty('category', 'utility');
      expect(result).toHaveProperty('language', 'en');
      expect(result).toHaveProperty('isActive', true);
    });
  });

  describe('createCampaign', () => {
    it('should create campaign successfully', async () => {
      // Create a template first
      const template = await service.createTemplate({
        organizationId: mockOrgId,
        name: 'campaign_template',
        category: 'marketing',
        language: 'en',
        components: [{
          type: 'body',
          text: 'Special offer!'
        }],
        isActive: true
      });

      const result = await service.createCampaign({
        organizationId: mockOrgId,
        name: 'Test Campaign',
        templateId: template.id,
        recipients: ['+0987654321', '+1122334455'],
        status: 'draft'
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name', 'Test Campaign');
      expect(result).toHaveProperty('templateId', template.id);
      expect(result).toHaveProperty('recipients');
      expect(result.recipients).toHaveLength(2);
      expect(result).toHaveProperty('status', 'draft');
      expect(result).toHaveProperty('sentCount', 0);
    });
  });

  describe('getAnalytics', () => {
    it('should get analytics for session', async () => {
      const connection = await service.generateQRCode(mockUserId, mockOrgId, mockPhoneNumber);
      await service.verifyConnection({
        sessionId: connection.sessionId,
        verified: true,
        phoneNumber: mockPhoneNumber,
        businessAccountId: 'ba-123',
        accessToken: 'test-access-token'
      });

      // Send some messages first
      await service.sendMessage(connection.sessionId, '+0987654321', 'Test 1');
      await service.sendMessage(connection.sessionId, '+1122334455', 'Test 2');

      const result = await service.getAnalytics(connection.sessionId);

      expect(result).toHaveProperty('sessionId', connection.sessionId);
      expect(result).toHaveProperty('messagesSent', 2);
      expect(result).toHaveProperty('messagesDelivered', 2);
      expect(result).toHaveProperty('topContacts');
      expect(result.topContacts).toHaveLength(2);
    });

    it('should throw error for invalid session', async () => {
      await expect(service.getAnalytics('invalid-session'))
        .rejects.toThrow('Session not found');
    });
  });

  describe('disconnectSession', () => {
    it('should disconnect session successfully', async () => {
      const connection = await service.generateQRCode(mockUserId, mockOrgId, mockPhoneNumber);
      
      const result = await service.disconnectSession(connection.sessionId);

      expect(result).toBe(true);
      
      const status = service.getSessionStatus(connection.sessionId);
      expect(status?.status).toBe('disconnected');
    });

    it('should return false for invalid session', async () => {
      const result = await service.disconnectSession('invalid-session');
      expect(result).toBe(false);
    });
  });

  describe('getSessionStatus', () => {
    it('should return session status', async () => {
      const connection = await service.generateQRCode(mockUserId, mockOrgId, mockPhoneNumber);
      
      const status = service.getSessionStatus(connection.sessionId);

      expect(status).toBeTruthy();
      expect(status?.sessionId).toBe(connection.sessionId);
      expect(status?.status).toBe('pending');
    });

    it('should return null for invalid session', async () => {
      const status = service.getSessionStatus('invalid-session');
      expect(status).toBeNull();
    });
  });

  describe('getOrganizationSessions', () => {
    it('should return organization sessions', async () => {
      // Create multiple sessions for the same organization
      const connection1 = await service.generateQRCode(mockUserId, mockOrgId, '+1111111111');
      const connection2 = await service.generateQRCode(mockUserId, mockOrgId, '+2222222222');
      
      const sessions = service.getOrganizationSessions(mockOrgId);

      expect(sessions).toHaveLength(2);
      expect(sessions[0].organizationId).toBe(mockOrgId);
      expect(sessions[1].organizationId).toBe(mockOrgId);
    });

    it('should return empty array for organization with no sessions', async () => {
      const sessions = service.getOrganizationSessions('org-without-sessions');
      expect(sessions).toHaveLength(0);
    });
  });

  describe('handleWebhook', () => {
    it('should handle message webhook', async () => {
      const connection = await service.generateQRCode(mockUserId, mockOrgId, mockPhoneNumber);
      await service.verifyConnection({
        sessionId: connection.sessionId,
        verified: true,
        phoneNumber: mockPhoneNumber,
        businessAccountId: 'ba-123',
        accessToken: 'test-access-token'
      });

      const webhookPayload = {
        object: 'whatsapp_business_account',
        entry: [{
          changes: [{
            field: 'messages',
            value: {
              messages: [{
                id: 'incoming-msg-123',
                from: '+0987654321',
                to: mockPhoneNumber,
                text: { body: 'Incoming message' },
                type: 'text',
                timestamp: '1234567890'
              }]
            }
          }]
        }]
      };

      // Should not throw error
      await expect(service.handleWebhook(webhookPayload)).resolves.toBeUndefined();
    });

    it('should ignore non-whatsapp webhooks', async () => {
      const webhookPayload = {
        object: 'not_whatsapp',
        entry: []
      };

      // Should not throw error
      await expect(service.handleWebhook(webhookPayload)).resolves.toBeUndefined();
    });
  });
});
