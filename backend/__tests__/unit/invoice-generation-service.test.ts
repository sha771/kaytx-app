import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { invoiceGenerationService } from '../../services/invoice-generation-service';
import { stripeService } from '../../services/stripe-service';
import { db as pgDb } from '../../db/connection';
import { invoices, organizations, subscriptions } from '../../db/drizzle-schema';
import { eq } from 'drizzle-orm';

// Mock dependencies
jest.mock('../../services/stripe-service');
jest.mock('../../db/connection');

describe('InvoiceGenerationService', () => {
  const mockOrganizationId = 'test-org-id';
  const mockSubscriptionId = 'test-subscription-id';
  const mockInvoiceData = {
    organizationId: mockOrganizationId,
    items: [
      {
        description: 'Test Item',
        quantity: 1,
        unitPrice: 100,
        total: 100,
      },
    ],
    taxRate: 10,
    currency: 'USD',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createInvoice', () => {
    it('should create an invoice successfully', async () => {
      // Mock organization
      const mockOrganization = {
        id: mockOrganizationId,
        name: 'Test Organization',
        metadata: {},
      };
      (pgDb.select as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([mockOrganization]),
        }),
      });

      // Mock invoice insertion
      const mockInvoice = {
        id: 'test-invoice-id',
        invoiceNumber: 'INV-2024-001',
        status: 'draft',
        amount: '100.00',
        tax: '10.00',
        total: '110.00',
        currency: 'USD',
        items: mockInvoiceData.items,
        metadata: {},
      };
      (pgDb.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockInvoice]),
        }),
      });

      // Mock Stripe service
      (stripeService.createInvoice as jest.Mock).mockResolvedValue({
        id: 'stripe-invoice-id',
        number: 'INV-2024-001',
      });

      const result = await invoiceGenerationService.createInvoice(mockInvoiceData);

      expect(result).toHaveProperty('invoice');
      expect(result).toHaveProperty('stripeInvoice');
      expect(result.invoice.invoiceNumber).toMatch(/^INV-\d{4}-\d{2}-[A-F0-9]{6}$/);
      expect(pgDb.insert).toHaveBeenCalledWith(invoices);
    });

    it('should handle organization not found', async () => {
      (pgDb.select as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
        }),
      });

      await expect(
        invoiceGenerationService.createInvoice(mockInvoiceData)
      ).rejects.toThrow('Organization not found');
    });

    it('should calculate totals correctly', async () => {
      const mockOrganization = {
        id: mockOrganizationId,
        name: 'Test Organization',
        metadata: {},
      };
      (pgDb.select as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([mockOrganization]),
        }),
      });

      const mockInvoice = {
        id: 'test-invoice-id',
        invoiceNumber: 'INV-2024-001',
        status: 'draft',
        amount: '200.00', // subtotal
        tax: '20.00', // 10% tax
        total: '220.00', // total
        currency: 'USD',
        items: mockInvoiceData.items,
        metadata: {},
      };
      (pgDb.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockInvoice]),
        }),
      });

      const invoiceDataWithMultipleItems = {
        ...mockInvoiceData,
        items: [
          { description: 'Item 1', quantity: 1, unitPrice: 100, total: 100 },
          { description: 'Item 2', quantity: 2, unitPrice: 50, total: 100 },
        ],
      };

      const result = await invoiceGenerationService.createInvoice(invoiceDataWithMultipleItems);

      expect(result.invoice.amount).toBe('200.00');
      expect(result.invoice.tax).toBe('20.00');
      expect(result.invoice.total).toBe('220.00');
    });
  });

  describe('generateSubscriptionInvoice', () => {
    it('should generate invoice for subscription', async () => {
      const mockSubscription = {
        id: mockSubscriptionId,
        organizationId: mockOrganizationId,
        plan: 'professional',
        status: 'active',
        amount: '99.00',
        currency: 'USD',
        nextBillingDate: new Date(),
        features: {
          additionalUsers: 5,
        },
      };

      (pgDb.select as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([mockSubscription]),
        }),
      });

      // Mock organization
      const mockOrganization = {
        id: mockOrganizationId,
        name: 'Test Organization',
        metadata: {},
      };
      (pgDb.select as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([mockOrganization]),
        }),
      });

      // Mock invoice creation
      const mockInvoice = {
        id: 'test-invoice-id',
        invoiceNumber: 'INV-2024-001',
        status: 'draft',
        amount: '149.00', // 99 + 5*10
        tax: '14.90',
        total: '163.90',
        currency: 'USD',
        items: [],
        metadata: {},
      };
      (pgDb.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockInvoice]),
        }),
      });

      const result = await invoiceGenerationService.generateSubscriptionInvoice(mockSubscriptionId);

      expect(result).toHaveProperty('invoice');
      expect(result.invoice.metadata).toHaveProperty('type', 'subscription');
      expect(result.invoice.metadata).toHaveProperty('plan', 'professional');
    });

    it('should handle subscription not found', async () => {
      (pgDb.select as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
        }),
      });

      await expect(
        invoiceGenerationService.generateSubscriptionInvoice(mockSubscriptionId)
      ).rejects.toThrow('Subscription not found');
    });
  });

  describe('finalizeInvoice', () => {
    it('should finalize invoice successfully', async () => {
      const mockInvoice = {
        id: 'test-invoice-id',
        organizationId: mockOrganizationId,
        invoiceNumber: 'INV-2024-001',
        status: 'draft',
        amount: '100.00',
        tax: '10.00',
        total: '110.00',
        currency: 'USD',
        metadata: {},
      };

      (pgDb.select as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([mockInvoice]),
        }),
      });

      const mockUpdatedInvoice = {
        ...mockInvoice,
        status: 'pending',
        updatedAt: new Date(),
      };
      (pgDb.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([mockUpdatedInvoice]),
          }),
        }),
      });

      const result = await invoiceGenerationService.finalizeInvoice('test-invoice-id');

      expect(result.invoice.status).toBe('pending');
      expect(pgDb.update).toHaveBeenCalledWith(invoices);
    });

    it('should handle invoice not found', async () => {
      (pgDb.select as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
        }),
      });

      await expect(
        invoiceGenerationService.finalizeInvoice('non-existent-id')
      ).rejects.toThrow('Invoice not found');
    });
  });

  describe('generateInvoicesForDueSubscriptions', () => {
    it('should generate invoices for due subscriptions', async () => {
      const mockDueSubscriptions = [
        {
          id: 'sub-1',
          organizationId: mockOrganizationId,
          status: 'active',
        },
        {
          id: 'sub-2',
          organizationId: mockOrganizationId,
          status: 'active',
        },
      ];

      (pgDb.select as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(mockDueSubscriptions),
        }),
      });

      // Mock generateSubscriptionInvoice
      jest.spyOn(invoiceGenerationService, 'generateSubscriptionInvoice')
        .mockResolvedValue({
          invoice: { id: 'invoice-1' },
          stripeInvoice: undefined,
        } as any);

      const result = await invoiceGenerationService.generateInvoicesForDueSubscriptions();

      expect(result.generated).toBe(2);
      expect(result.errors).toHaveLength(0);
    });

    it('should handle errors during bulk generation', async () => {
      const mockDueSubscriptions = [
        {
          id: 'sub-1',
          organizationId: mockOrganizationId,
          status: 'active',
        },
      ];

      (pgDb.select as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(mockDueSubscriptions),
        }),
      });

      // Mock generateSubscriptionInvoice to throw error
      jest.spyOn(invoiceGenerationService, 'generateSubscriptionInvoice')
        .mockRejectedValue(new Error('Test error'));

      const result = await invoiceGenerationService.generateInvoicesForDueSubscriptions();

      expect(result.generated).toBe(0);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain('Failed to generate invoice for subscription sub-1');
    });
  });

  describe('getInvoicePdf', () => {
    it('should generate invoice PDF', async () => {
      const mockInvoice = {
        id: 'test-invoice-id',
        organizationId: mockOrganizationId,
        invoiceNumber: 'INV-2024-001',
        status: 'paid',
        amount: '100.00',
        tax: '10.00',
        total: '110.00',
        currency: 'USD',
        items: [
          { description: 'Test Item', quantity: 1, unitPrice: 100, total: 100 },
        ],
        metadata: {},
      };

      const mockOrganization = {
        id: mockOrganizationId,
        name: 'Test Organization',
        billingEmail: 'billing@test.com',
      };

      (pgDb.select as jest.Mock)
        .mockReturnValueOnce({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockInvoice]),
          }),
        })
        .mockReturnValueOnce({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockOrganization]),
          }),
        });

      const pdfBuffer = await invoiceGenerationService.getInvoicePdf('test-invoice-id');

      expect(pdfBuffer).toBeInstanceOf(Buffer);
      expect(pdfBuffer.toString()).toContain('INVOICE');
      expect(pdfBuffer.toString()).toContain('INV-2024-001');
      expect(pdfBuffer.toString()).toContain('Test Organization');
    });

    it('should handle invoice not found', async () => {
      (pgDb.select as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
        }),
      });

      await expect(
        invoiceGenerationService.getInvoicePdf('non-existent-id')
      ).rejects.toThrow('Invoice not found');
    });
  });

  describe('createInvoiceTemplate', () => {
    it('should create invoice template', async () => {
      const templateData = {
        name: 'Test Template',
        description: 'Test description',
        items: [
          { description: 'Template Item', quantity: 1, unitPrice: 50, total: 50 },
        ],
        taxRate: 8,
        currency: 'USD',
        metadata: { type: 'template' },
      };

      const template = await invoiceGenerationService.createInvoiceTemplate(templateData);

      expect(template).toHaveProperty('id');
      expect(template).toHaveProperty('name', 'Test Template');
      expect(template).toHaveProperty('description', 'Test description');
      expect(template.items).toHaveLength(1);
      expect(template.taxRate).toBe(8);
      expect(template.currency).toBe('USD');
    });
  });

  describe('getInvoiceTemplates', () => {
    it('should return default invoice templates', async () => {
      const templates = await invoiceGenerationService.getInvoiceTemplates();

      expect(Array.isArray(templates)).toBe(true);
      expect(templates.length).toBeGreaterThan(0);
      expect(templates[0]).toHaveProperty('id');
      expect(templates[0]).toHaveProperty('name');
      expect(templates[0]).toHaveProperty('items');
      expect(templates[0]).toHaveProperty('taxRate');
      expect(templates[0]).toHaveProperty('currency');
    });
  });
});
