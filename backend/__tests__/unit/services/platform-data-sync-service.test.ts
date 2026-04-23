import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { platformDataSyncService } from '../../../services/platform-data-sync-service';
import { platformAuthService } from '../../../services/platform-auth-service';
import { db as pgDb } from '../../../db/connection';
import { logAudit } from '../../../lib/audit';
import axios from 'axios';

// Mock dependencies
jest.mock('../../../services/platform-auth-service');
jest.mock('../../../db/connection');
jest.mock('../../../lib/audit');
jest.mock('axios');

const mockPlatformAuthService = platformAuthService as jest.Mocked<typeof platformAuthService>;
const mockDb = pgDb as jest.Mocked<typeof pgDb>;
const mockLogAudit = logAudit as jest.MockedFunction<typeof logAudit>;
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Platform Data Sync Service', () => {
  const mockOrganizationId = 'org-123';
  const mockConnectionId = 'conn-123';
  const mockUserId = 'user-123';

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mock responses
    mockPlatformAuthService.ensureValidCredentialsForOrg = jest.fn().mockResolvedValue({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      subdomain: 'test-domain',
      shopDomain: 'test-shop.myshopify.com'
    });

    mockDb.select = jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue([])
        })
      })
    });

    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: 'sync-123' }])
      })
    });

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ id: 'sync-123' }])
        })
      })
    });

    // Mock axios create
    mockAxios.create = jest.fn().mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });

    // Mock audit log
    mockLogAudit.mockResolvedValue(undefined);
  });

  describe('Salesforce Sync', () => {
    it('should sync Salesforce data successfully', async () => {
      const mockSalesforceData = {
        records: [
          {
            Id: '001xx000003DHPh',
            Name: 'Test Account',
            Type: 'Customer',
            Industry: 'Technology',
            AnnualRevenue: 1000000
          },
          {
            Id: '001xx000003DHPi',
            Name: 'Another Account',
            Type: 'Partner',
            Industry: 'Finance',
            AnnualRevenue: 500000
          }
        ]
      };

      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: mockSalesforceData })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(2);
      expect(result.messageCount).toBe(2);
      expect(mockClient.get).toHaveBeenCalledWith('/sobjects/Account?limit=100');
    });

    it('should handle Salesforce API errors', async () => {
      const mockClient = {
        get: jest.fn().mockRejectedValue(new Error('Salesforce API error'))
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Salesforce sync error: Salesforce API error');
    });

    it('should update base URL with Salesforce instance', async () => {
      mockPlatformAuthService.ensureValidCredentialsForOrg = jest.fn().mockResolvedValue({
        accessToken: 'token',
        instanceUrl: 'https://custom-instance.my.salesforce.com'
      });

      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: { records: [] } })
      };

      mockAxios.create = jest.fn().mockImplementation((config) => {
        expect(config.baseURL).toBe('https://custom-instance.my.salesforce.com/services/data/v56.0');
        return mockClient;
      });

      await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(mockAxios.create).toHaveBeenCalled();
    });
  });

  describe('HubSpot Sync', () => {
    it('should sync HubSpot contacts successfully', async () => {
      const mockHubSpotData = {
        contacts: [
          {
            id: '123',
            properties: {
              email: 'test@example.com',
              firstname: 'John',
              lastname: 'Doe',
              company: 'Test Corp'
            }
          },
          {
            id: '456',
            properties: {
              email: 'jane@example.com',
              firstname: 'Jane',
              lastname: 'Smith',
              company: 'Another Corp'
            }
          }
        ]
      };

      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: mockHubSpotData })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'hubspot',
        mockConnectionId
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(2);
      expect(mockClient.get).toHaveBeenCalledWith('/crm/v3/objects/contacts?limit=100');
    });

    it('should sync HubSpot deals successfully', async () => {
      const mockDealsData = {
        results: [
          {
            id: 'deal-123',
            properties: {
              dealname: 'Test Deal',
              amount: '50000',
              dealstage: 'appointment scheduled'
            }
          }
        ]
      };

      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: mockDealsData })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'hubspot',
        mockConnectionId
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(1);
    });
  });

  describe('Zendesk Sync', () => {
    it('should sync Zendesk tickets successfully', async () => {
      const mockZendeskData = {
        tickets: [
          {
            id: 123,
            subject: 'Support Request',
            description: 'Need help with product',
            status: 'open',
            priority: 'normal',
            type: 'question',
            requester_id: 456,
            assignee_id: 789,
            group_id: 101,
            tags: ['support', 'urgent'],
            created_at: '2024-01-15T10:00:00Z',
            updated_at: '2024-01-15T11:00:00Z'
          }
        ]
      };

      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: mockZendeskData })
      };

      mockAxios.create = jest.fn().mockImplementation((config) => {
        // Should update base URL with subdomain
        expect(config.baseURL).toBe('https://test-domain.zendesk.com/api/v2');
        return mockClient;
      });

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'zendesk',
        mockConnectionId
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(1);
      expect(result.messageCount).toBe(1);
      expect(mockClient.get).toHaveBeenCalledWith('/tickets?per_page=100');
    });

    it('should sync Zendesk users successfully', async () => {
      const mockUsersData = {
        users: [
          {
            id: 456,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'end-user',
            phone: '+1234567890',
            time_zone: 'America/New_York',
            locale: 'en-US',
            organization_id: 789,
            tags: ['vip'],
            suspended: false,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-15T10:00:00Z',
            last_login_at: '2024-01-14T15:30:00Z'
          }
        ]
      };

      const mockClient = {
        get: jest.fn()
          .mockResolvedValueOnce({ data: { tickets: [] } }) // First call for tickets
          .mockResolvedValueOnce({ data: mockUsersData }) // Second call for users
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'zendesk',
        mockConnectionId
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(1);
      expect(mockClient.get).toHaveBeenCalledWith('/users?per_page=100');
    });

    it('should handle Zendesk authentication errors', async () => {
      mockPlatformAuthService.ensureValidCredentialsForOrg = jest.fn()
        .mockRejectedValue(new Error('Zendesk authentication failed'));

      await expect(
        platformDataSyncService.syncPlatform(mockOrganizationId, 'zendesk', mockConnectionId)
      ).rejects.toThrow('Zendesk authentication failed');
    });
  });

  describe('Shopify Sync', () => {
    it('should sync Shopify orders successfully', async () => {
      const mockOrdersData = {
        orders: [
          {
            id: 123456789,
            name: '#1001',
            email: 'customer@example.com',
            total_price: '99.99',
            currency: 'USD',
            financial_status: 'paid',
            fulfillment_status: 'unfulfilled',
            tags: 'new, vip',
            customer: { id: 987654321 },
            line_items: [
              {
                id: 111,
                name: 'Test Product',
                quantity: 1,
                price: '99.99'
              }
            ],
            shipping_address: {
              first_name: 'John',
              last_name: 'Doe',
              address1: '123 Main St',
              city: 'New York',
              zip: '10001',
              country: 'US'
            },
            created_at: '2024-01-15T10:00:00Z',
            updated_at: '2024-01-15T10:30:00Z',
            processed_at: '2024-01-15T10:05:00Z'
          }
        ]
      };

      const mockClient = {
        get: jest.fn().mockImplementation((config) => {
          // Should update base URL with shop domain
          expect(config).toBe('/orders.json?limit=50');
          return Promise.resolve({ data: mockOrdersData });
        })
      };

      mockAxios.create = jest.fn().mockImplementation((config) => {
        expect(config.baseURL).toBe('https://test-shop.myshopify.com/admin/api/2023-10');
        return mockClient;
      });

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'shopify',
        mockConnectionId
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(1);
      expect(result.messageCount).toBe(1);
    });

    it('should sync Shopify products successfully', async () => {
      const mockProductsData = {
        products: [
          {
            id: 987654321,
            title: 'Test Product',
            body_html: '<p>Product description</p>',
            vendor: 'Test Vendor',
            product_type: 'Physical',
            tags: 'new, featured',
            status: 'active',
            variants: [
              {
                id: 111,
                title: 'Default Title',
                price: '99.99',
                sku: 'TEST-001'
              }
            ],
            images: [
              {
                id: 222,
                src: 'https://example.com/image.jpg'
              }
            ],
            options: [
              {
                name: 'Title',
                values: ['Default Title']
              }
            ],
            created_at: '2024-01-10T00:00:00Z',
            updated_at: '2024-01-15T10:00:00Z',
            published_at: '2024-01-10T12:00:00Z'
          }
        ]
      };

      const mockClient = {
        get: jest.fn()
          .mockResolvedValueOnce({ data: { orders: [] } }) // First call for orders
          .mockResolvedValueOnce({ data: mockProductsData }) // Second call for products
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'shopify',
        mockConnectionId
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(1);
      expect(mockClient.get).toHaveBeenCalledWith('/products.json?limit=50');
    });

    it('should sync Shopify customers successfully', async () => {
      const mockCustomersData = {
        customers: [
          {
            id: 555666777,
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane@example.com',
            phone: '+1234567890',
            tags: 'vip, repeat',
            state: 'enabled',
            total_spent: '299.97',
            orders_count: 3,
            currency: 'USD',
            addresses: [
              {
                first_name: 'Jane',
                last_name: 'Smith',
                address1: '456 Oak Ave',
                city: 'Los Angeles',
                zip: '90001',
                country: 'US'
              }
            ],
            accepts_marketing: true,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-15T10:00:00Z',
            last_order_id: 123456789
          }
        ]
      };

      const mockClient = {
        get: jest.fn()
          .mockResolvedValueOnce({ data: { orders: [] } }) // Orders
          .mockResolvedValueOnce({ data: { products: [] } }) // Products
          .mockResolvedValueOnce({ data: mockCustomersData }) // Customers
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'shopify',
        mockConnectionId
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(1);
      expect(mockClient.get).toHaveBeenCalledWith('/customers.json?limit=50');
    });
  });

  describe('Slack Sync', () => {
    it('should sync Slack messages successfully', async () => {
      const mockSlackData = {
        ok: true,
        messages: [
          {
            type: 'message',
            user: 'U1234567890',
            text: 'Hello team!',
            ts: '1642248000.000100',
            channel: 'C1234567890'
          },
          {
            type: 'message',
            user: 'U0987654321',
            text: 'How is everyone doing?',
            ts: '1642248060.000200',
            channel: 'C1234567890'
          }
        ],
        channels: [
          {
            id: 'C1234567890',
            name: 'general',
            is_channel: true,
            created: 1642248000
          }
        ]
      };

      const mockClient = {
        get: jest.fn()
          .mockResolvedValueOnce({ data: mockSlackData }) // Messages
          .mockResolvedValueOnce({ data: { ok: true, channels: mockSlackData.channels } }) // Channels
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'slack',
        mockConnectionId
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(2);
      expect(result.messageCount).toBe(2);
      expect(mockClient.get).toHaveBeenCalledWith('/conversations.history?limit=100');
    });

    it('should handle Slack API rate limiting', async () => {
      const mockClient = {
        get: jest.fn().mockRejectedValue({
          response: {
            status: 429,
            data: { error: 'rate_limited' }
          }
        })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'slack',
        mockConnectionId
      );

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Slack sync error: Request failed with status code 429');
    });
  });

  describe('Google Workspace Sync', () => {
    it('should sync Google Calendar events successfully', async () => {
      const mockCalendarData = {
        items: [
          {
            id: 'event-123',
            summary: 'Team Meeting',
            description: 'Weekly team sync',
            start: {
              dateTime: '2024-01-15T10:00:00Z'
            },
            end: {
              dateTime: '2024-01-15T11:00:00Z'
            },
            attendees: [
              { email: 'team@example.com' },
              { email: 'manager@example.com' }
            ]
          }
        ]
      };

      const mockGmailData = {
        messages: [
          {
            id: 'msg-123',
            threadId: 'thread-123',
            snippet: 'Important update'
          }
        ]
      };

      const mockClient = {
        get: jest.fn()
          .mockResolvedValueOnce({ data: mockCalendarData }) // Calendar
          .mockResolvedValueOnce({ data: mockGmailData }) // Gmail
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'google_workspace',
        mockConnectionId
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(2);
      expect(mockClient.get).toHaveBeenCalledWith('/calendar/v3/calendars/primary/events?maxResults=25');
    });

    it('should sync Gmail messages successfully', async () => {
      const mockMessageDetail = {
        id: 'msg-123',
        threadId: 'thread-123',
        subject: 'Test Subject',
        from: 'sender@example.com',
        to: 'recipient@example.com',
        date: '1642248000000',
        body: 'Message content'
      };

      const mockClient = {
        get: jest.fn()
          .mockResolvedValueOnce({ data: { messages: [{ id: 'msg-123' }] } }) // Message list
          .mockResolvedValueOnce({ data: mockMessageDetail }) // Message detail
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'google_workspace',
        mockConnectionId
      );

      expect(result.success).toBe(true);
      expect(mockClient.get).toHaveBeenCalledWith('/gmail/v1/users/me/messages?maxResults=25');
      expect(mockClient.get).toHaveBeenCalledWith('/gmail/v1/users/me/messages/msg-123');
    });
  });

  describe('Rate Limiting', () => {
    it('should check rate limits before sync', async () => {
      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: { records: [] } })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      // Should call rate limit check
      expect(mockPlatformAuthService.ensureValidCredentialsForOrg).toHaveBeenCalled();
    });

    it('should handle rate limit exceeded errors', async () => {
      const mockClient = {
        get: jest.fn().mockRejectedValue({
          response: {
            status: 429,
            headers: {
              'x-rate-limit-reset': Date.now() + 60000 // Reset in 1 minute
            }
          }
        })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Salesforce sync error: Request failed with status code 429');
    });
  });

  describe('Error Handling', () => {
    it('should handle authentication failures', async () => {
      mockPlatformAuthService.ensureValidCredentialsForOrg = jest.fn()
        .mockRejectedValue(new Error('Authentication failed'));

      await expect(
        platformDataSyncService.syncPlatform(mockOrganizationId, 'salesforce', mockConnectionId)
      ).rejects.toThrow('Authentication failed');
    });

    it('should handle network errors', async () => {
      const mockClient = {
        get: jest.fn().mockRejectedValue(new Error('Network timeout'))
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Salesforce sync error: Network timeout');
    });

    it('should handle malformed API responses', async () => {
      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: null }) // Invalid response
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(result.success).toBe(true); // Should handle gracefully
      expect(result.recordsProcessed).toBe(0);
    });

    it('should handle database errors during data storage', async () => {
      const mockClient = {
        get: jest.fn().mockResolvedValue({ 
          data: { 
            records: [{ Id: '001', Name: 'Test' }] 
          } 
        })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      mockDb.insert = jest.fn().mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockRejectedValue(new Error('Database constraint violation'))
        })
      });

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Database constraint violation');
    });
  });

  describe('Data Processing', () => {
    it('should process Salesforce accounts correctly', async () => {
      const mockSalesforceData = {
        records: [
          {
            Id: '001xx000003DHPh',
            Name: 'Test Account',
            Type: 'Customer',
            Industry: 'Technology',
            AnnualRevenue: 1000000,
            BillingStreet: '123 Main St',
            BillingCity: 'New York',
            BillingState: 'NY',
            BillingPostalCode: '10001',
            Phone: '+1234567890',
            Website: 'https://example.com'
          }
        ]
      };

      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: mockSalesforceData })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(1);
      
      // Should have processed the account data
      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          platform: 'salesforce',
          platformId: '001xx000003DHPh'
        })
      );
    });

    it('should handle empty data sets', async () => {
      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: { records: [] } })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(result.success).toBe(true);
      expect(result.recordsProcessed).toBe(0);
      expect(result.messageCount).toBe(0);
    });

    it('should handle data transformation errors', async () => {
      const mockInvalidData = {
        records: [
          {
            Id: null, // Invalid ID
            Name: undefined, // Invalid name
            Type: 'Customer'
          }
        ]
      };

      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: mockInvalidData })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      const result = await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(result.success).toBe(true); // Should handle gracefully
      expect(result.recordsProcessed).toBe(1); // Still counts as processed
    });
  });

  describe('Audit Logging', () => {
    it('should log successful sync operations', async () => {
      const mockClient = {
        get: jest.fn().mockResolvedValue({ data: { records: [{ Id: '001', Name: 'Test' }] } })
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'PLATFORM_DATA_SYNC',
          resource: 'platform_sync',
          status: 'success'
        })
      );
    });

    it('should log sync failures', async () => {
      const mockClient = {
        get: jest.fn().mockRejectedValue(new Error('API Error'))
      };

      mockAxios.create = jest.fn().mockReturnValue(mockClient);

      await platformDataSyncService.syncPlatform(
        mockOrganizationId,
        'salesforce',
        mockConnectionId
      );

      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'PLATFORM_DATA_SYNC',
          resource: 'platform_sync',
          status: 'failure'
        })
      );
    });
  });

  describe('Validation', () => {
    it('should validate organization ID format', async () => {
      const invalidOrgId = 'invalid-org-id';

      await expect(
        platformDataSyncService.syncPlatform(invalidOrgId, 'salesforce', mockConnectionId)
      ).rejects.toThrow('Invalid organization ID');
    });

    it('should validate platform type', async () => {
      await expect(
        platformDataSyncService.syncPlatform(mockOrganizationId, 'invalid-platform' as any, mockConnectionId)
      ).rejects.toThrow('Sync not implemented for platform: invalid-platform');
    });

    it('should validate connection ID format', async () => {
      const invalidConnectionId = 'invalid-conn-id';

      await expect(
        platformDataSyncService.syncPlatform(mockOrganizationId, 'salesforce', invalidConnectionId)
      ).rejects.toThrow('Invalid connection ID');
    });
  });
});
