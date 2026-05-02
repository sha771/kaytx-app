import { EmailCampaignService, EmailCampaign } from '../../backend/services/email-campaign-service';
import { db as pgDb } from '../../backend/db/connection';
import { campaigns, contacts } from '../../backend/db/drizzle-schema';

// Mock the database and nodemailer
jest.mock('../../backend/db/connection');

jest.mock(
  'nodemailer',
  () => ({
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' })
    })
  }),
  { virtual: true }
);

const mockDb = pgDb as jest.Mocked<typeof pgDb>;

describe('EmailCampaignService', () => {
  let service: EmailCampaignService;
  let mockOrganizationId: string;

  beforeEach(() => {
    service = new EmailCampaignService();
    mockOrganizationId = 'test-org-1';

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
            type: 'email',
            status: 'draft',
            budget: '1000',
            spent: '0',
            config: {
              subject: 'Test Subject',
              content: 'Test Content',
              fromEmail: 'test@example.com',
              fromName: 'Test Sender',
              totalRecipients: 0,
              sentCount: 0,
              openedCount: 0,
              clickedCount: 0,
              bouncedCount: 0,
              unsubscribedCount: 0
            },
            createdBy: 'user-1',
            createdAt: new Date(),
            updatedAt: new Date()
          }]),
          orderBy: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      })
    }) as any;

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([])
        })
      })
    }) as any;
  });

  describe('createCampaign', () => {
    it('should create an email campaign successfully', async () => {
      const campaignData = {
        organizationId: mockOrganizationId,
        name: 'Test Campaign',
        subject: 'Test Subject',
        content: '<h1>Test Email Content</h1>',
        fromEmail: 'test@example.com',
        fromName: 'Test Sender',
        status: 'draft' as const,
        metadata: { createdBy: 'user-1' }
      };

      const result = await service.createCampaign(mockOrganizationId, campaignData);

      expect(result.id).toBeDefined();
      expect(result.name).toBe(campaignData.name);
      expect(result.subject).toBe(campaignData.subject);
      expect(result.content).toBe(campaignData.content);
      expect(result.fromEmail).toBe(campaignData.fromEmail);
      expect(result.fromName).toBe(campaignData.fromName);
      expect(result.status).toBe('draft');
      expect(result.totalRecipients).toBe(0);
      expect(result.sentCount).toBe(0);
      expect(result.openedCount).toBe(0);
      expect(result.clickedCount).toBe(0);
      expect(result.bouncedCount).toBe(0);
      expect(result.unsubscribedCount).toBe(0);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);

      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.insert(campaigns).values).toHaveBeenCalled();
    });

    it('should handle different campaign statuses', async () => {
      const statuses: EmailCampaign['status'][] = ['draft', 'scheduled', 'paused'];

      for (const status of statuses) {
        const campaignData = {
          organizationId: mockOrganizationId,
          name: `Test ${status} Campaign`,
          subject: 'Test Subject',
          content: 'Test Content',
          fromEmail: 'test@example.com',
          fromName: 'Test Sender',
          status,
          metadata: {}
        };

        const result = await service.createCampaign(mockOrganizationId, campaignData);
        expect(result.status).toBe(status);
      }
    });
  });

  describe('getCampaign', () => {
    it('should retrieve a campaign successfully', async () => {
      const result = await service.getCampaign(mockOrganizationId, 'campaign-1');

      expect(result).toBeTruthy();
      expect(result?.id).toBe('campaign-1');
      expect(result?.name).toBe('Test Campaign');
      expect(result?.subject).toBe('Test Subject');
      expect(result?.status).toBe('draft');
      expect(result?.totalRecipients).toBe(0);
      expect(result?.sentCount).toBe(0);
    });

    it('should return null for non-existent campaign', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      }) as any;

      const result = await service.getCampaign(mockOrganizationId, 'non-existent');

      expect(result).toBeNull();
    });
  });

  describe('getCampaigns', () => {
    it('should retrieve all campaigns for organization', async () => {
      // Mock multiple campaigns - the service uses .where() which returns an array directly
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([
            {
              id: 'campaign-1',
              organizationId: mockOrganizationId,
              name: 'Campaign 1',
              type: 'email',
              status: 'draft',
              budget: '1000',
              spent: '0',
              config: {
                subject: 'Subject 1',
                content: 'Content 1',
                fromEmail: 'test1@example.com',
                fromName: 'Sender 1',
                totalRecipients: 100,
                sentCount: 50,
                openedCount: 25,
                clickedCount: 10,
                bouncedCount: 2,
                unsubscribedCount: 1
              },
              createdBy: 'user-1',
              createdAt: new Date('2024-01-02T00:00:00.000Z'),
              updatedAt: new Date('2024-01-02T00:00:00.000Z')
            },
            {
              id: 'campaign-2',
              organizationId: mockOrganizationId,
              name: 'Campaign 2',
              type: 'email',
              status: 'completed',
              budget: '500',
              spent: '250',
              config: {
                subject: 'Subject 2',
                content: 'Content 2',
                fromEmail: 'test2@example.com',
                fromName: 'Sender 2',
                totalRecipients: 200,
                sentCount: 200,
                openedCount: 150,
                clickedCount: 75,
                bouncedCount: 5,
                unsubscribedCount: 3
              },
              createdBy: 'user-1',
              createdAt: new Date('2024-01-01T00:00:00.000Z'),
              updatedAt: new Date('2024-01-01T00:00:00.000Z')
            }
          ])
        })
      }) as any;

      const result = await service.getCampaigns(mockOrganizationId);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Campaign 1');
      expect(result[1].name).toBe('Campaign 2');
      expect(result[0].status).toBe('draft');
      expect(result[1].status).toBe('completed');
      expect(result[0].sentCount).toBe(50);
      expect(result[1].sentCount).toBe(200);
    });

    it('should Filter campaigns by status', async () => {
      const result = await service.getCampaigns(mockOrganizationId, 'completed');

      expect(mockDb.select).toHaveBeenCalled();
      // The Filter would be applied in the where clause
    });
  });

  describe('launchCampaign', () => {
    it('should launch a campaign successfully', async () => {
      // Mock campaign query (first select call)
      mockDb.select = jest.fn()
        .mockReturnValueOnce({
          from: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue([{
                id: 'campaign-1',
                organizationId: mockOrganizationId,
                name: 'Test Campaign',
                type: 'email',
                status: 'draft',
                budget: '1000',
                spent: '0',
                config: {
                  subject: 'Test Subject',
                  content: 'Test Content',
                  fromEmail: 'test@example.com',
                  fromName: 'Test Sender',
                  totalRecipients: 0,
                  sentCount: 0,
                  openedCount: 0,
                  clickedCount: 0,
                  bouncedCount: 0,
                  unsubscribedCount: 0
                },
                createdBy: 'user-1',
                createdAt: new Date(),
                updatedAt: new Date()
              }])
            })
          })
        })
        // Mock contacts query (second select call for contacts)
        .mockReturnValueOnce({
          from: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue([
              { id: 'contact-1', email: 'contact1@example.com' },
              { id: 'contact-2', email: 'contact2@example.com' }
            ])
          })
        })
        // Mock campaign re-fetch in sendCampaignEmails
        .mockReturnValueOnce({
          from: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue([{
                id: 'campaign-1',
                organizationId: mockOrganizationId,
                name: 'Test Campaign',
                type: 'email',
                status: 'running',
                budget: '1000',
                spent: '0',
                config: {
                  subject: 'Test Subject',
                  content: 'Test Content',
                  fromEmail: 'test@example.com',
                  fromName: 'Test Sender',
                  totalRecipients: 2,
                  sentCount: 0,
                  openedCount: 0,
                  clickedCount: 0,
                  bouncedCount: 0,
                  unsubscribedCount: 0
                },
                createdBy: 'user-1',
                createdAt: new Date(),
                updatedAt: new Date()
              }])
            })
          })
        }) as any;

      const result = await service.launchCampaign(mockOrganizationId, 'campaign-1');

      expect(result.success).toBe(true);
      expect(result.message).toContain('Processing 2 recipients');
    });

    it('should fail to launch non-existent campaign', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      }) as any;

      const result = await service.launchCampaign(mockOrganizationId, 'non-existent');

      expect(result.success).toBe(false);
      expect(result.message).toContain('not found');
    });

    it('should fail to launch campaign that is not in draft status', async () => {
      // Mock campaign with running status
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'campaign-1',
              organizationId: mockOrganizationId,
              name: 'Test Campaign',
              type: 'email',
              status: 'running',
              budget: '1000',
              spent: '0',
              config: {
                subject: 'Test Subject',
                content: 'Test Content',
                fromEmail: 'test@example.com',
                fromName: 'Test Sender',
                totalRecipients: 0,
                sentCount: 0,
                openedCount: 0,
                clickedCount: 0,
                bouncedCount: 0,
                unsubscribedCount: 0
              },
              createdBy: 'user-1',
              createdAt: new Date(),
              updatedAt: new Date()
            }])
          })
        })
      }) as any;

      const result = await service.launchCampaign(mockOrganizationId, 'campaign-1');

      expect(result.success).toBe(false);
      expect(result.message).toContain('can only be launched from draft status');
    });
  });

  describe('getCampaignMetrics', () => {
    it('should calculate campaign metrics correctly', async () => {
      const result = await service.getCampaignMetrics(mockOrganizationId, 'campaign-1');

      expect(result).toBeTruthy();
      expect(result?.campaignId).toBe('campaign-1');
      expect(result?.totalSent).toBe(0);
      // When totalRecipients is 0, delivery rate should be 0 to avoid division by zero confusion
      expect(result?.deliveryRate).toBe(0);
      expect(result?.openRate).toBe(0);
      expect(result?.clickRate).toBe(0);
      expect(result?.bounceRate).toBe(0);
      expect(result?.unsubscribeRate).toBe(0);
    });

    it('should return null for non-existent campaign', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      }) as any;

      const result = await service.getCampaignMetrics(mockOrganizationId, 'non-existent');

      expect(result).toBeNull();
    });
  });

  describe('updateCampaignMetrics', () => {
    it('should update campaign metrics successfully', async () => {
      const result = await service.updateCampaignMetrics(mockOrganizationId, 'campaign-1', {
        openedCount: 10,
        clickedCount: 5,
        bouncedCount: 2,
        unsubscribedCount: 1
      });

      expect(result).toBe(true);
      expect(mockDb.update).toHaveBeenCalled();
    });

    it('should return false for non-existent campaign', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      }) as any;

      const result = await service.updateCampaignMetrics(mockOrganizationId, 'non-existent', {
        openedCount: 10
      });

      expect(result).toBe(false);
    });
  });
});
