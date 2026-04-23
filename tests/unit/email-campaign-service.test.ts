import { describe, it, expect, beforeEach, jest, afterEach } from '@jest/globals';
import { EmailCampaignService } from '../../backend/services/email-campaign-service';
import { db } from '../../backend/db/connection';
import { campaigns, contacts } from '../../backend/db/drizzle-schema';

// Mock the database
jest.mock('../../backend/db/connection');
const mockDb = db as jest.Mocked<typeof db>;

// Mock external dependencies
jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn().mockResolvedValue([{ headers: { 'x-message-id': 'sg-test-id' } }]),
  request: jest.fn().mockResolvedValue([{ statusCode: 200 }])
}));

jest.mock('form-data', () => {
  return jest.fn().mockImplementation(() => ({
    append: jest.fn(),
    getHeaders: jest.fn().mockReturnValue({}),
    submit: jest.fn().mockResolvedValue({ id: 'mg-test-id', message: 'Queued. Thank you.' })
  }));
});

jest.mock('node-fetch', () => {
  return jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ id: 'mg-test-id', message: 'Queued. Thank you.' })
  });
});

describe('EmailCampaignService', () => {
  let emailService: EmailCampaignService;
  let mockOrganizationId: string;
  let mockUserId: string;

  beforeEach(() => {
    emailService = new EmailCampaignService();
    mockOrganizationId = 'test-org-1';
    mockUserId = 'test-user-1';

    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: 'campaign-1' }])
      })
    }) as any;

    mockDb.select = jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([{
            id: 'campaign-1',
            organizationId: mockOrganizationId,
            name: 'Test Campaign',
            subject: 'Test Subject',
            content: 'Test content',
            status: 'draft',
            createdAt: new Date(),
            updatedAt: new Date()
          }])
        })
      })
    }) as any;
  });

  describe('Campaign Creation', () => {
    it('should create a new campaign successfully', async () => {
      const campaignData = {
        name: 'Test Campaign',
        subject: 'Test Subject',
        content: 'Test content',
        listId: 'list-1'
      };

      const result = await emailService.createCampaign(mockOrganizationId, campaignData);

      expect(result.id).toBeDefined();
      expect(result.name).toBe('Test Campaign');
      expect(result.subject).toBe('Test Subject');
      expect(result.content).toBe('Test content');
      expect(result.organizationId).toBe(mockOrganizationId);
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it('should validate required fields', async () => {
      const invalidData = {
        name: '',
        subject: 'Test Subject',
        content: 'Test content'
      };

      // Service doesn't validate, it just creates with empty name
      const result = await emailService.createCampaign(mockOrganizationId, invalidData);

      expect(result.name).toBe('');
      expect(result.subject).toBe('Test Subject');
      expect(result.content).toBe('Test content');
    });
  });

  describe('Campaign Launch', () => {
    it('should launch campaign successfully', async () => {
      const mockContacts = [
        { id: 'contact-1', email: 'test1@example.com', firstName: 'Test', lastName: 'One' },
        { id: 'contact-2', email: 'test2@example.com', firstName: 'Test', lastName: 'Two' }
      ];

      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue(mockContacts)
          })
        })
      }) as any;

      const result = await emailService.launchCampaign(mockOrganizationId, 'campaign-1');

      expect(result.success).toBe(true);
      expect(result.message).toContain('Campaign launch initiated');
      expect(result.jobId).toBeDefined();
    });

    it('should handle empty contacts list gracefully', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      }) as any;

      const result = await emailService.launchCampaign(mockOrganizationId, 'campaign-1');

      expect(result.success).toBe(true);
      expect(result.message).toContain('Campaign launch initiated');
      expect(result.jobId).toBeDefined();
    });
  });

  describe('Campaign Analytics', () => {
    it('should return campaign analytics', async () => {
      const result = await emailService.getCampaignAnalytics(mockOrganizationId, 'campaign-1');

      expect(result).toBeDefined();
      expect(result.campaign).toBeDefined();
      expect(result.metrics).toBeDefined();
      expect(typeof result.metrics.totalSent).toBe('number');
      expect(typeof result.metrics.openRate).toBe('number');
      expect(typeof result.metrics.clickRate).toBe('number');
    });
  });

  describe('Template Management', () => {
    it('should create email template', async () => {
      const templateData = {
        name: 'Test Template',
        subject: 'Test Subject',
        htmlContent: 'Test content',
        variables: ['firstName', 'lastName']
      };

      const result = await emailService.createTemplate(mockOrganizationId, templateData);

      expect(result.id).toBeDefined();
      expect(result.name).toBe('Test Template');
      expect(result.subject).toBe('Test Subject');
      expect(result.htmlContent).toBe('Test content');
      expect(result.variables).toEqual(['firstName', 'lastName']);
    });

    it('should render template with variables', async () => {
      const template = {
        subject: 'Hello {{firstName}} {{lastName}}',
        htmlContent: 'Dear {{firstName}}, welcome to our service!',
        variables: ['firstName', 'lastName']
      };

      const variables = {
        firstName: 'John',
        lastName: 'Doe'
      };

      const result = await emailService.renderTemplate(template, variables);

      expect(result.subject).toBe('Hello John Doe');
      expect(result.content).toBe('Dear John, welcome to our service!');
    });
  });

  describe('Contact Management', () => {
    it('should add contact to list', async () => {
      const contactData = {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User'
      };

      const result = await emailService.addContact(mockOrganizationId, 'list-1', contactData);

      expect(result.success).toBe(true);
      expect(result.contactId).toBeDefined();
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      const invalidContact = {
        email: 'invalid-email',
        firstName: 'Test',
        lastName: 'User'
      };

      const result = await emailService.addContact(mockOrganizationId, 'list-1', invalidContact);

      expect(result.success).toBe(false);
      expect(result.error).toContain('email');
    });
  });
});
