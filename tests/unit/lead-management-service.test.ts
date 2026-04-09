import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { LeadManagementService } from '../../backend/services/lead-management-service';
import { db as pgDb } from '../../backend/db/connection';
import { leads, leadWorkflows } from '../../backend/db/drizzle-schema';

// Mock the database
jest.mock('../../backend/db/connection');
const mockDb = pgDb as jest.Mocked<typeof pgDb>;

describe('LeadManagementService', () => {
  let leadService: LeadManagementService;
  let mockOrganizationId: string;
  let mockUserId: string;

  beforeEach(() => {
    leadService = new LeadManagementService();
    mockOrganizationId = 'test-org-1';
    mockUserId = 'test-user-1';

    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    const mockQuery = {
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      then: jest.fn((resolve) => resolve([{
        id: 'lead-1',
        organizationId: mockOrganizationId,
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        company: 'Test Company',
        position: 'Developer',
        phone: '+1234567890',
        status: 'new' as const,
        source: 'website',
        score: 50,
        leadTemperature: 'warm' as const,
        lifecycleStage: 'lead' as const,
        tags: ['prospect'],
        metadata: {},
        assignedTo: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date()
      }])),
      catch: jest.fn().mockReturnThis()
    };

    // Make orderBy a function to pass the typeof check
    mockQuery.orderBy = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        offset: jest.fn().mockResolvedValue([{
          id: 'lead-1',
          organizationId: mockOrganizationId,
          email: 'john@example.com',
          firstName: 'John',
          lastName: 'Doe',
          company: 'Test Company',
          position: 'Developer',
          phone: '+1234567890',
          status: 'new' as const,
          source: 'website',
          score: 50,
          leadTemperature: 'warm' as const,
          lifecycleStage: 'lead' as const,
          tags: ['prospect'],
          metadata: {},
          assignedTo: 'user-123',
          createdAt: new Date(),
          updatedAt: new Date()
        }])
      })
    });

    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: 'lead-1' }])
      })
    }) as any;

    mockDb.select = jest.fn().mockReturnValue(mockQuery) as any;

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ id: 'lead-1' }])
        })
      })
    }) as any;

    mockDb.delete = jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: 'lead-1' }])
      })
    }) as any;
  });

  describe('Lead Creation', () => {
    it('should create a new lead successfully', async () => {
      const leadData = {
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        company: 'Test Company',
        source: 'website',
        metadata: { customField: 'custom value' }
      };

      const result = await leadService.createLead(mockOrganizationId, leadData);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.email).toBe('john@example.com');
      expect(result.organizationId).toBe(mockOrganizationId);
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it('should validate required fields', async () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe'
        // Missing required email
      };

      await expect(
        leadService.createLead(mockOrganizationId, invalidData)
      ).rejects.toThrow('Email is required');
    });

    it('should validate email format', async () => {
      const invalidData = {
        email: 'invalid-email',
        firstName: 'John',
        lastName: 'Doe'
      };

      await expect(
        leadService.createLead(mockOrganizationId, invalidData)
      ).rejects.toThrow('Invalid email format');
    });

    it('should calculate lead score automatically', async () => {
      const leadData = {
        email: 'qualified@example.com',
        firstName: 'Qualified',
        lastName: 'Lead',
        company: 'Enterprise Corp',
        position: 'CEO',
        source: 'referral'
      };

      const result = await leadService.createLead(mockOrganizationId, leadData);

      expect(result.score).toBeGreaterThan(0);
    });
  });

  describe('Lead Retrieval', () => {
    it('should provide lead statistics', async () => {
      const mockLeads = [
        { id: '1', organizationId: mockOrganizationId, email: 'lead1@test.com', customFields: { status: 'new', score: 10, source: 'web' }, status: 'active', createdAt: new Date() },
        { id: '2', organizationId: mockOrganizationId, email: 'lead2@test.com', customFields: { status: 'qualified', score: 20, source: 'referral' }, status: 'active', createdAt: new Date() }
      ];

      const mockQuery = {
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        then: jest.fn((resolve) => resolve(mockLeads)),
        catch: jest.fn().mockReturnThis()
      };

      mockDb.select.mockReturnValue(mockQuery as any);

      const result = await leadService.getLeadStats(mockOrganizationId);

      expect(result).toHaveProperty('total', 2);
      expect(result.byStatus.new).toBe(1);
      expect(result.byStatus.qualified).toBe(1);
      expect(result.avgScore).toBe(15);
    });

    it('should return null for non-existent lead', async () => {
      const mockQuery = {
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        then: jest.fn((resolve) => resolve([])),
        catch: jest.fn().mockReturnThis()
      };
      mockDb.select.mockReturnValue(mockQuery as any);

      const result = await leadService.getLead(mockOrganizationId, 'non-existent');
      expect(result).toBeNull();
    });

    it('should retrieve all leads for organization', async () => {
      const mockLeads = [
        {
          id: 'lead-1',
          organizationId: mockOrganizationId,
          email: 'john@example.com',
          customFields: { status: 'new', score: 25, source: 'web' },
          status: 'active',
          createdAt: new Date()
        },
        {
          id: 'lead-2',
          organizationId: mockOrganizationId,
          email: 'jane@example.com',
          customFields: { status: 'contacted', score: 50, source: 'referral' },
          status: 'active',
          createdAt: new Date()
        },
        {
          id: 'lead-3',
          organizationId: mockOrganizationId,
          email: 'bob@example.com',
          customFields: { status: 'qualified', score: 75, source: 'web' },
          status: 'active',
          createdAt: new Date()
        }
      ];

      const mockQuery = {
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        then: jest.fn((resolve) => resolve(mockLeads)),
        catch: jest.fn().mockReturnThis()
      };
      mockDb.select.mockReturnValue(mockQuery as any);

      const result = await leadService.getAllLeads(mockOrganizationId);

      expect(result).toHaveLength(3);
      expect(result[0].email).toBe('john@example.com');
      expect(result[1].email).toBe('jane@example.com');
      expect(result[2].email).toBe('bob@example.com');
    });
  });

  describe('Lead Updates', () => {
    it('should update lead information', async () => {
      const updateData = {
        firstName: 'Jane',
        company: 'Updated Corp'
      };

      const result = await leadService.updateLead(mockOrganizationId, 'lead-1', updateData);

      expect(result).toBeDefined();
      expect(result?.firstName).toBe('Jane');
      expect(result?.company).toBe('Updated Corp');
      expect(mockDb.update).toHaveBeenCalled();
    });

    it('should update lead status successfully', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'lead-1',
              organizationId: mockOrganizationId,
              email: 'test@lead.com',
              customFields: { status: 'new' },
              status: 'active',
              createdAt: new Date(),
              updatedAt: new Date()
            }])
          })
        })
      } as any);

      const result = await leadService.updateLeadStatus(mockOrganizationId, 'lead-1', 'qualified');

      expect(result).toBe(true);
      expect(mockDb.update).toHaveBeenCalled();
    });

    it('should assign lead to user', async () => {
      const result = await leadService.assignLead(mockOrganizationId, 'lead-1', 'user-456');

      expect(result).toBe(true);
      expect(mockDb.update).toHaveBeenCalled();
    });

    it('should return null for non-existent lead update', async () => {
      const mockQuery = {
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        then: jest.fn((resolve) => resolve([])),
        catch: jest.fn().mockReturnThis()
      };
      mockDb.select.mockReturnValue(mockQuery as any);

      const result = await leadService.updateLead(mockOrganizationId, 'non-existent', {
        firstName: 'Updated'
      });
      expect(result).toBeNull();
    });
  });

  describe('Lead Deletion', () => {
    it('should delete lead successfully', async () => {
      const result = await leadService.deleteLead(mockOrganizationId, 'lead-1');

      expect(result).toBe(true);
      expect(mockDb.update).toHaveBeenCalled();
    });

    it('should return false for non-existent lead deletion', async () => {
      const mockQuery = {
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        then: jest.fn((resolve) => resolve([])),
        catch: jest.fn().mockReturnThis()
      };
      mockDb.select.mockReturnValue(mockQuery as any);

      const result = await leadService.deleteLead(mockOrganizationId, 'non-existent');
      expect(result).toBe(false);
    });
  });

  describe('Lead Scoring', () => {
    it('should calculate lead score based on multiple factors', async () => {
      const leadData = {
        email: 'ceo@enterprise.com',
        firstName: 'CEO',
        lastName: 'Lead',
        company: 'Fortune 500 Corp',
        position: 'CEO',
        source: 'referral',
        phone: '+1234567890',
        website: 'https://enterprise.com'
      };

      const result = await leadService.createLead(mockOrganizationId, leadData);

      expect(result.score).toBeGreaterThan(50); // Should be high score
    });

    it('should update lead score based on engagement', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'lead-1',
              organizationId: mockOrganizationId,
              email: 'test@lead.com',
              score: 10,
              customFields: { score: 10 },
              status: 'active',
              createdAt: new Date(),
              updatedAt: new Date(),
              metadata: {}
            }])
          })
        })
      } as any);

      const result = await leadService.updateLeadScore(mockOrganizationId, 'lead-1', {
        emailOpened: true,
        linkClicked: true
      });

      expect(result).toBe(true);
      expect(mockDb.update).toHaveBeenCalled();
    });
  });

  describe('Lead Nurturing', () => {
    it('should start nurturing workflow', async () => {
      const workflow = {
        id: 'workflow-1',
        organizationId: mockOrganizationId,
        name: 'Test Workflow',
        description: 'Test',
        trigger: { type: 'lead_created' as const },
        steps: [
          {
            id: 'step-1',
            name: 'Test Step',
            type: 'email' as const,
            config: {},
            order: 1
          }
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const lead = {
        id: 'lead-1',
        organizationId: mockOrganizationId,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'Lead',
        status: 'new' as const,
        source: 'website',
        score: 0,
        leadTemperature: 'cold' as const,
        lifecycleStage: 'lead' as const,
        tags: [],
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await (leadService as any).startNurturingWorkflow(workflow, lead);

      expect(result).toBe(true);
    });

    it('should convert lead to customer', async () => {
      const emitSpy = jest.spyOn(leadService, 'emit');
      
      const result = await leadService.convertToCustomer(mockOrganizationId, 'lead-1');

      expect(result).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith('lead:converted', expect.any(Object));
    });
  });

  describe('Lead Analytics', () => {
    it('should provide lead statistics', async () => {
      const mockLeads = [
        {
          id: 'lead-1',
          customFields: { status: 'new', source: 'website', score: 25 },
          tags: ['prospect']
        },
        {
          id: 'lead-2',
          customFields: { status: 'contacted', source: 'referral', score: 50 },
          tags: ['warm']
        },
        {
          id: 'lead-3',
          customFields: { status: 'qualified', source: 'website', score: 75 },
          tags: ['hot']
        }
      ];

      const mockQuery = {
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        then: jest.fn((resolve) => resolve(mockLeads)),
        catch: jest.fn().mockReturnThis()
      };
      mockDb.select.mockReturnValue(mockQuery as any);

      const result = await leadService.getLeadStats(mockOrganizationId);

      expect(result.total).toBe(3);
      expect(result.byStatus).toBeDefined();
      expect(result.bySource).toBeDefined();
      expect(result.avgScore).toBe(50); // (25 + 50 + 75) / 3
      expect(typeof result.byStatus).toBe('object');
      expect(typeof result.bySource).toBe('object');
    });
  });

  describe('Field Value Extraction', () => {
    it('should extract nested field values', () => {
      const lead = {
        id: 'lead-1',
        organizationId: mockOrganizationId,
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        company: 'Test Company',
        position: 'Developer',
        phone: '+1234567890',
        status: 'new' as const,
        source: 'website',
        score: 50,
        leadTemperature: 'warm' as const,
        lifecycleStage: 'lead' as const,
        tags: [],
        metadata: {
          customField: 'custom value',
          nested: {
            deep: 'deep value'
          }
        },
        assignedTo: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const testCases = [
        { field: 'firstName', expected: 'John' },
        { field: 'score', expected: 50 },
        { field: 'metadata.customField', expected: 'custom value' },
        { field: 'metadata.nested.deep', expected: 'deep value' },
        { field: 'nonExistent', expected: undefined },
        { field: 'metadata.nonExistent', expected: undefined }
      ];

      for (const testCase of testCases) {
        const result = (leadService as any).getFieldValue(lead, testCase.field);
        expect(result).toBe(testCase.expected);
      }
    });
  });

  describe('Event Emission', () => {
    it('should emit lead:created event', async () => {
      const emitSpy = jest.spyOn(leadService, 'emit');
      
      const leadData = {
        email: 'new@example.com',
        firstName: 'New',
        lastName: 'Lead',
        status: 'new' as const,
        source: 'website',
        metadata: {}
      };

      await leadService.createLead(mockOrganizationId, leadData);

      expect(emitSpy).toHaveBeenCalledWith('lead:created', expect.any(Object));
    });

    it('should emit nurturing:started event', async () => {
      const emitSpy = jest.spyOn(leadService, 'emit');
      
      const workflow = {
        id: 'workflow-1',
        organizationId: mockOrganizationId,
        name: 'Test Workflow',
        description: 'Test',
        trigger: { type: 'lead_created' as const },
        steps: [
          {
            id: 'step-1',
            name: 'Test Step',
            type: 'email' as const,
            config: {},
            order: 1
          }
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const lead = {
        id: 'lead-1',
        organizationId: mockOrganizationId,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'Lead',
        status: 'new' as const,
        source: 'website',
        score: 0,
        leadTemperature: 'cold' as const,
        lifecycleStage: 'lead' as const,
        tags: [],
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await (leadService as any).startNurturingWorkflow(workflow, lead);

      expect(emitSpy).toHaveBeenCalledWith('nurturing:started', {
        workflowId: 'workflow-1',
        leadId: 'lead-1'
      });
    });
  });
});
