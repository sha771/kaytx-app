import { LeadManagementService, Lead } from '../../backend/services/lead-management-service';
import { db as pgDb } from '../../backend/db/connection';
import { contacts } from '../../backend/db/drizzle-schema';

// Mock the database
jest.mock('../../backend/db/connection');
const mockDb = pgDb as jest.Mocked<typeof pgDb>;

describe('LeadManagementService', () => {
  let service: LeadManagementService;
  let mockOrganizationId: string;
  let mockUserId: string;

  beforeEach(() => {
    jest.useFakeTimers();
    service = new LeadManagementService();
    mockOrganizationId = 'test-org-1';
    mockUserId = 'test-user-1';

    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: 'lead-1' }])
      })
    }) as any;

    const mockLeadData = {
      id: 'lead-1',
      organizationId: mockOrganizationId,
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      status: 'new' as const,
      source: 'website',
      score: 0,
      leadTemperature: 'cold' as const,
      lifecycleStage: 'lead' as const,
      tags: [],
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      customFields: {
        status: 'new',
        source: 'website',
        score: 0,
        assignedTo: null,
        lastContactedAt: null
      }
    };

    mockDb.select = jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([mockLeadData])
        }),
        orderBy: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            offset: jest.fn().mockResolvedValue([mockLeadData])
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

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
    // Ensure service cleans up any active workflows/timers
    if (service && typeof (service as any).stopAllNurturingWorkflows === 'function') {
      (service as any).stopAllNurturingWorkflows();
    }
  });

  describe('createLead', () => {
    it('should create a lead successfully', async () => {
      const leadData = {
        organizationId: mockOrganizationId,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        company: 'Test Corp',
        position: 'Manager',
        phone: '+1234567890',
        status: 'new' as const,
        source: 'website',
        metadata: {}
      };

      const result = await service.createLead(mockOrganizationId, leadData);

      expect(result.id).toBeDefined();
      expect(result.email).toBe(leadData.email);
      expect(result.firstName).toBe(leadData.firstName);
      expect(result.lastName).toBe(leadData.lastName);
      expect(result.company).toBe(leadData.company);
      expect(result.position).toBe(leadData.position);
      expect(result.phone).toBe(leadData.phone);
      expect(result.status).toBe(leadData.status);
      expect(result.source).toBe(leadData.source);
      expect(result.score).toBe(0);
      expect(result.tags).toEqual([]);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);

      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.insert(contacts).values).toHaveBeenCalled();
    });

    it('should handle different lead statuses', async () => {
      const statuses: Lead['status'][] = ['new', 'contacted', 'qualified', 'converted', 'lost'];

      for (const status of statuses) {
        const leadData = {
          organizationId: mockOrganizationId,
          email: `test${status}@example.com`,
          status,
          source: 'manual' as const
        };

        const result = await service.createLead(mockOrganizationId, leadData);
        expect(result.status).toBe(status);
      }
    });

    it('should calculate lead score after creation', async () => {
      const leadData = {
        organizationId: mockOrganizationId,
        email: 'john@company.com',
        company: 'Enterprise Corp',
        position: 'CEO',
        phone: '+1234567890',
        status: 'new' as const,
        source: 'referral',
        metadata: {}
      };

      const result = await service.createLead(mockOrganizationId, leadData);
      
      // Score should be calculated based on available data
      expect(typeof result.score).toBe('number');
      expect(result.score).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getLead', () => {
    it('should retrieve a lead successfully', async () => {
      const result = await service.getLead(mockOrganizationId, 'lead-1');

      expect(result).toBeTruthy();
      expect(result?.id).toBe('lead-1');
      expect(result?.email).toBe('test@example.com');
      expect(result?.firstName).toBe('John');
      expect(result?.lastName).toBe('Doe');
      expect(result?.status).toBe('new');
      expect(result?.source).toBe('website');
      expect(result?.score).toBe(0);
    });

    it('should return null for non-existent lead', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      }) as any;

      const result = await service.getLead(mockOrganizationId, 'non-existent');

      expect(result).toBeNull();
    });
  });

  describe('getLeads', () => {
    it('should retrieve leads with pagination', async () => {
      const result = await service.getLeads(mockOrganizationId, {
        limit: 10,
        offset: 0
      });

      expect(result.leads).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.leads[0].email).toBe('test@example.com');
    });

    it('should Filter leads by status', async () => {
      const result = await service.getLeads(mockOrganizationId, {
        status: 'qualified'
      });

      expect(result.leads).toHaveLength(0); // No qualified leads in mock data
    });

    it('should search leads by email', async () => {
      const result = await service.getLeads(mockOrganizationId, {
        search: 'test@example.com'
      });

      expect(result.leads).toHaveLength(1);
      expect(result.leads[0].email).toBe('test@example.com');
    });
  });

  describe('updateLead', () => {
    it('should update a lead successfully', async () => {
      const result = await service.updateLead(mockOrganizationId, 'lead-1', {
        firstName: 'Jane',
        status: 'contacted',
        score: 25
      });

      expect(result).toBeTruthy();
      expect(result?.firstName).toBe('Jane');
      expect(result?.status).toBe('contacted');
      expect(result?.score).toBe(25);

      expect(mockDb.update).toHaveBeenCalled();
    });

    it('should return null for non-existent lead', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      }) as any;

      const result = await service.updateLead(mockOrganizationId, 'non-existent', {
        firstName: 'Jane'
      });

      expect(result).toBeNull();
    });
  });

  describe('updateLeadStatus', () => {
    it('should update lead status and record activity', async () => {
      const result = await service.updateLeadStatus(mockOrganizationId, 'lead-1', 'qualified', mockUserId);

      expect(result).toBe(true);
      expect(mockDb.update).toHaveBeenCalled();
    });

    it('should return false for non-existent lead', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      }) as any;

      const result = await service.updateLeadStatus(mockOrganizationId, 'non-existent', 'qualified');

      expect(result).toBe(false);
    });
  });

  describe('assignLead', () => {
    it('should assign a lead to a user', async () => {
      const result = await service.assignLead(mockOrganizationId, 'lead-1', 'user-123', mockUserId);

      expect(result).toBe(true);
      expect(mockDb.update).toHaveBeenCalled();
    });
  });

  describe('calculateLeadScore', () => {
    it('should calculate lead score based on available data', async () => {
      const score = await service.calculateLeadScore(mockOrganizationId, 'lead-1');

      expect(typeof score).toBe('number');
      expect(score).toBeGreaterThanOrEqual(0);
    });

    it('should return 0 for non-existent lead', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      }) as any;

      const score = await service.calculateLeadScore(mockOrganizationId, 'non-existent');

      expect(score).toBe(0);
    });
  });

  describe('recordActivity', () => {
    it('should record lead activity', async () => {
      const activity = {
        type: 'email' as const,
        title: 'Email sent',
        description: 'Follow-up email sent to lead',
        userId: mockUserId
      };

      const result = await service.recordActivity(mockOrganizationId, 'lead-1', activity);

      expect(result.id).toBeDefined();
      expect(result.leadId).toBe('lead-1');
      expect(result.type).toBe('email');
      expect(result.title).toBe('Email sent');
      expect(result.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('getLeadActivities', () => {
    it('should retrieve lead activities', async () => {
      // Mock lead with activities in metadata
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'lead-1',
              organizationId: mockOrganizationId,
              email: 'test@example.com',
              firstName: 'John',
              lastName: 'Doe',
              company: 'Test Corp',
              position: 'Manager',
              phone: '+1234567890',
              tags: ['prospect'],
              customFields: {
                status: 'new',
                source: 'website',
                score: 0,
                assignedTo: null,
                lastContactedAt: null
              },
              metadata: {
                activities: [
                  {
                    id: 'activity-1',
                    type: 'email',
                    title: 'Email sent',
                    description: 'Initial contact email',
                    createdAt: new Date()
                  }
                ]
              },
              source: 'website',
              status: 'active',
              createdAt: new Date(),
              updatedAt: new Date()
            }])
          })
        })
      }) as any;

      const activities = await service.getLeadActivities(mockOrganizationId, 'lead-1');

      expect(activities).toHaveLength(1);
      expect(activities[0].type).toBe('email');
      expect(activities[0].title).toBe('Email sent');
    });

    it('should return empty activities for lead with no activities', async () => {
      const activities = await service.getLeadActivities(mockOrganizationId, 'lead-1');

      expect(activities).toEqual([]);
    });
  });

  describe('getLeadStats', () => {
    it('should calculate lead statistics', async () => {
      const stats = await service.getLeadStats(mockOrganizationId);

      expect(stats.total).toBe(1);
      expect(stats.byStatus).toEqual({
        new: 1,
        contacted: 0,
        qualified: 0,
        converted: 0,
        lost: 0
      });
      expect(stats.bySource).toEqual({ website: 1 });
      expect(stats.avgScore).toBe(0);
    });
  });

  describe('convertToCustomer', () => {
    it('should convert lead to customer', async () => {
      const result = await service.convertToCustomer(mockOrganizationId, 'lead-1', mockUserId);

      expect(result).toBe(true);
      expect(mockDb.update).toHaveBeenCalled();
    });
  });
});
