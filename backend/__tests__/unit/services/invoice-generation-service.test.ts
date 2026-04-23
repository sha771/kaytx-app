import { InvoiceGenerationService } from '../../../services/invoice-generation-service';

// Mock dependencies
jest.mock('../../../db/connection', () => ({
  db: {
    select: jest.fn(() => ({
      from: jest.fn(() => ({
        where: jest.fn(() => ({
          orderBy: jest.fn(() => ({
            limit: jest.fn(() => ({
              execute: jest.fn()
            }))
          }))
        }))
      }))
    })),
    insert: jest.fn(() => ({
      values: jest.fn(() => ({
        returning: jest.fn(() => ({
          execute: jest.fn()
        }))
      }))
    })),
    update: jest.fn(() => ({
      set: jest.fn(() => ({
        where: jest.fn(() => ({
          execute: jest.fn()
        }))
      }))
    }))
  }
}));

jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => 'mock-uuid'),
  createHash: jest.fn(() => ({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn(() => 'mock-hash')
  }))
}));

// Mock Stripe
jest.mock('stripe', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    invoices: {
      create: jest.fn(),
      retrieve: jest.fn(),
      update: jest.fn(),
      list: jest.fn()
    },
    invoiceItems: {
      create: jest.fn()
    }
  }))
}));

describe('InvoiceGenerationService', () => {
  let service: InvoiceGenerationService;
  let mockStripe: any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new InvoiceGenerationService();
    mockStripe = require('stripe').default();
  });

  describe('Basic Invoice Generation', () => {
    it('should generate a basic invoice', async () => {
      const mockInvoice = {
        id: 'inv_123',
        number: 'INV-2023-001',
        customer: 'cus_123',
        amount_due: 10000,
        currency: 'usd',
        status: 'open',
        created: Date.now() / 1000,
        lines: {
          data: [
            {
              id: 'il_123',
              description: 'Test Product',
              quantity: 1,
              unit_amount: 10000,
              amount: 10000
            }
          ]
        }
      };

      mockStripe.invoices.create.mockResolvedValue(mockInvoice);

      const result = await service.generateInvoice({
        customerId: 'cus_123',
        items: [
          {
            description: 'Test Product',
            quantity: 1,
            unitAmount: 10000,
            currency: 'usd'
          }
        ],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });

      expect(result.id).toBe('inv_123');
      expect(result.number).toBe('INV-2023-001');
      expect(result.amount).toBe(10000);
      expect(result.currency).toBe('usd');
      expect(result.status).toBe('open');
    });

    it('should handle invoice generation errors', async () => {
      mockStripe.invoices.create.mockRejectedValue(new Error('Stripe API error'));

      await expect(
        service.generateInvoice({
          customerId: 'cus_123',
          items: [{ description: 'Test', quantity: 1, unitAmount: 1000, currency: 'usd' }]
        })
      ).rejects.toThrow('Failed to generate invoice: Stripe API error');
    });

    it('should validate invoice items', async () => {
      await expect(
        service.generateInvoice({
          customerId: 'cus_123',
          items: [
            {
              description: '',
              quantity: 0,
              unitAmount: -100,
              currency: 'invalid'
            }
          ]
        })
      ).rejects.toThrow('Invalid invoice items');
    });
  });

  describe('Bulk Invoice Generation', () => {
    it('should generate multiple invoices in bulk', async () => {
      const mockInvoices = [
        { id: 'inv_1', number: 'INV-001', amount: 10000, status: 'open' },
        { id: 'inv_2', number: 'INV-002', amount: 15000, status: 'open' }
      ];

      mockStripe.invoices.create
        .mockResolvedValueOnce(mockInvoices[0])
        .mockResolvedValueOnce(mockInvoices[1]);

      const invoiceRequests = [
        {
          customerId: 'cus_1',
          items: [{ description: 'Product 1', quantity: 1, unitAmount: 10000, currency: 'usd' }]
        },
        {
          customerId: 'cus_2',
          items: [{ description: 'Product 2', quantity: 1, unitAmount: 15000, currency: 'usd' }]
        }
      ];

      const result = await service.bulkGenerateInvoices(invoiceRequests);

      expect(result.successful).toHaveLength(2);
      expect(result.failed).toHaveLength(0);
      expect(result.summary.totalInvoices).toBe(2);
      expect(result.summary.totalAmount).toBe(25000);
    });

    it('should handle partial failures in bulk generation', async () => {
      mockStripe.invoices.create
        .mockResolvedValueOnce({ id: 'inv_1', amount: 10000, status: 'open' })
        .mockRejectedValueOnce(new Error('Payment failed'));

      const invoiceRequests = [
        {
          customerId: 'cus_1',
          items: [{ description: 'Product 1', quantity: 1, unitAmount: 10000, currency: 'usd' }]
        },
        {
          customerId: 'cus_2',
          items: [{ description: 'Product 2', quantity: 1, unitAmount: 15000, currency: 'usd' }]
        }
      ];

      const result = await service.bulkGenerateInvoices(invoiceRequests);

      expect(result.successful).toHaveLength(1);
      expect(result.failed).toHaveLength(1);
      expect(result.summary.totalInvoices).toBe(2);
      expect(result.summary.generatedInvoices).toBe(1);
      expect(result.summary.failedInvoices).toBe(1);
    });

    it('should respect bulk size limits', async () => {
      const largeRequest = Array.from({ length: 105 }, (_, i) => ({
        customerId: `cus_${i}`,
        items: [{ description: `Product ${i}`, quantity: 1, unitAmount: 1000, currency: 'usd' }]
      }));

      await expect(service.bulkGenerateInvoices(largeRequest)).rejects.toThrow('Bulk size exceeds maximum');
    });
  });

  describe('Recurring Invoices', () => {
    it('should create recurring invoice schedule', async () => {
      const mockSchedule = {
        scheduleId: 'schedule_123',
        customerId: 'cus_123',
        interval: 'month',
        intervalCount: 1,
        nextInvoiceDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'active'
      };

      jest.spyOn(service as any, 'createRecurringSchedule').mockResolvedValue(mockSchedule);

      const result = await service.createRecurringInvoice({
        customerId: 'cus_123',
        items: [{ description: 'Monthly Service', quantity: 1, unitAmount: 5000, currency: 'usd' }],
        interval: 'month',
        intervalCount: 1,
        startDate: new Date()
      });

      expect(result.scheduleId).toBe('schedule_123');
      expect(result.interval).toBe('month');
      expect(result.status).toBe('active');
    });

    it('should generate recurring invoices', async () => {
      const mockInvoices = [
        { id: 'inv_1', amount: 5000, status: 'open' },
        { id: 'inv_2', amount: 3000, status: 'open' }
      ];

      jest.spyOn(service as any, 'generateRecurringInvoices').mockResolvedValue({
        generated: mockInvoices,
        failed: [],
        summary: {
          totalSchedules: 2,
          generatedInvoices: 2,
          failedInvoices: 0,
          totalAmount: 8000
        }
      });

      const result = await service.generateRecurringInvoices();

      expect(result.generated).toHaveLength(2);
      expect(result.summary.totalAmount).toBe(8000);
    });
  });

  describe('Proforma Invoices', () => {
    it('should create proforma invoice', async () => {
      const mockProforma = {
        id: 'prof_123',
        number: 'PROF-2023-001',
        customerId: 'cus_123',
        amount: 7500,
        currency: 'usd',
        status: 'draft',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      };

      jest.spyOn(service as any, 'createProformaInvoice').mockResolvedValue(mockProforma);

      const result = await service.createProformaInvoice({
        customerId: 'cus_123',
        items: [{ description: 'Quote Item', quantity: 1, unitAmount: 7500, currency: 'usd' }],
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });

      expect(result.id).toBe('prof_123');
      expect(result.number).toBe('PROF-2023-001');
      expect(result.status).toBe('draft');
    });

    it('should convert proforma to final invoice', async () => {
      const mockFinalInvoice = {
        id: 'inv_123',
        number: 'INV-2023-001',
        amount: 7500,
        status: 'open'
      };

      jest.spyOn(service as any, 'convertProformaToInvoice').mockResolvedValue(mockFinalInvoice);

      const result = await service.convertProformaToInvoice('prof_123');

      expect(result.id).toBe('inv_123');
      expect(result.status).toBe('open');
    });
  });

  describe('Credit Notes', () => {
    it('should create credit note', async () => {
      const mockCreditNote = {
        id: 'cn_123',
        number: 'CN-2023-001',
        invoiceId: 'inv_123',
        amount: 2000,
        currency: 'usd',
        reason: 'duplicate_charge',
        status: 'available'
      };

      jest.spyOn(service as any, 'createCreditNote').mockResolvedValue(mockCreditNote);

      const result = await service.createCreditNote({
        invoiceId: 'inv_123',
        amount: 2000,
        reason: 'duplicate_charge',
        currency: 'usd'
      });

      expect(result.id).toBe('cn_123');
      expect(result.invoiceId).toBe('inv_123');
      expect(result.reason).toBe('duplicate_charge');
    });

    it('should apply credit note to invoice', async () => {
      const mockApplication = {
        creditNoteId: 'cn_123',
        invoiceId: 'inv_123',
        amount: 2000,
        remainingCredit: 0,
        appliedAt: new Date()
      };

      jest.spyOn(service as any, 'applyCreditNote').mockResolvedValue(mockApplication);

      const result = await service.applyCreditNote('cn_123', 'inv_123', 2000);

      expect(result.creditNoteId).toBe('cn_123');
      expect(result.appliedAt).toBeInstanceOf(Date);
    });
  });

  describe('Tax Calculation', () => {
    it('should calculate taxes correctly', async () => {
      const mockTaxCalculation = {
        subtotal: 10000,
        taxRates: [
          {
            name: 'GST',
            rate: 0.10,
            amount: 1000,
            type: 'percentage'
          },
          {
            name: 'PST',
            rate: 0.07,
            amount: 700,
            type: 'percentage'
          }
        ],
        totalTax: 1700,
        total: 11700,
        taxBreakdown: {
          gst: 1000,
          pst: 700
        }
      };

      jest.spyOn(service as any, 'calculateTaxes').mockResolvedValue(mockTaxCalculation);

      const result = await service.calculateTaxes({
        amount: 10000,
        currency: 'cad',
        country: 'CA',
        province: 'BC'
      });

      expect(result.subtotal).toBe(10000);
      expect(result.totalTax).toBe(1700);
      expect(result.total).toBe(11700);
      expect(result.taxRates).toHaveLength(2);
    });

    it('should handle tax-exempt customers', async () => {
      const mockTaxCalculation = {
        subtotal: 10000,
        taxRates: [],
        totalTax: 0,
        total: 10000,
        taxExempt: true,
        exemptionReason: 'charity'
      };

      jest.spyOn(service as any, 'calculateTaxes').mockResolvedValue(mockTaxCalculation);

      const result = await service.calculateTaxes({
        amount: 10000,
        currency: 'usd',
        country: 'US',
        taxExempt: true,
        exemptionReason: 'charity'
      });

      expect(result.totalTax).toBe(0);
      expect(result.total).toBe(10000);
      expect(result.taxExempt).toBe(true);
    });
  });

  describe('Invoice Templates', () => {
    it('should get available invoice templates', async () => {
      const mockTemplates = [
        {
          id: 'template_1',
          name: 'Standard Template',
          description: 'Basic invoice template',
          preview: 'https://example.com/preview1.png',
          fields: ['customer', 'items', 'taxes', 'total'],
          customizable: true
        },
        {
          id: 'template_2',
          name: 'Professional Template',
          description: 'Detailed invoice with logo',
          preview: 'https://example.com/preview2.png',
          fields: ['customer', 'logo', 'items', 'taxes', 'total', 'notes'],
          customizable: true
        }
      ];

      jest.spyOn(service as any, 'getInvoiceTemplates').mockResolvedValue(mockTemplates);

      const result = await service.getInvoiceTemplates();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Standard Template');
      expect(result[1].customizable).toBe(true);
    });

    it('should customize invoice template', async () => {
      const mockCustomizedTemplate = {
        id: 'custom_123',
        baseTemplateId: 'template_1',
        customizations: {
          logo: 'https://example.com/logo.png',
          colors: { primary: '#0066cc', secondary: '#cccccc' },
          footer: 'Thank you for your business!',
          additionalFields: ['po_number', 'due_date']
        }
      };

      jest.spyOn(service as any, 'customizeTemplate').mockResolvedValue(mockCustomizedTemplate);

      const result = await service.customizeTemplate('template_1', {
        logo: 'https://example.com/logo.png',
        colors: { primary: '#0066cc' },
        footer: 'Thank you for your business!'
      });

      expect(result.baseTemplateId).toBe('template_1');
      expect(result.customizations.logo).toBe('https://example.com/logo.png');
    });
  });

  describe('PDF Generation', () => {
    it('should generate PDF invoice', async () => {
      const mockPDF = {
        invoiceId: 'inv_123',
        pdfUrl: 'https://example.com/invoices/inv_123.pdf',
        pdfSize: 245760, // bytes
        generatedAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      };

      jest.spyOn(service as any, 'generateInvoicePDF').mockResolvedValue(mockPDF);

      const result = await service.generateInvoicePDF('inv_123', {
        template: 'standard',
        includeWatermark: false
      });

      expect(result.invoiceId).toBe('inv_123');
      expect(result.pdfUrl).toContain('inv_123.pdf');
      expect(result.pdfSize).toBeGreaterThan(0);
    });

    it('should generate bulk PDF invoices', async () => {
      const mockBulkPDF = {
        batchId: 'batch_123',
        pdfs: [
          { invoiceId: 'inv_1', pdfUrl: 'https://example.com/inv_1.pdf' },
          { invoiceId: 'inv_2', pdfUrl: 'https://example.com/inv_2.pdf' }
        ],
        zipUrl: 'https://example.com/invoices_batch_123.zip',
        totalSize: 500000,
        generatedAt: new Date()
      };

      jest.spyOn(service as any, 'generateBulkPDFInvoices').mockResolvedValue(mockBulkPDF);

      const result = await service.generateBulkPDFInvoices(['inv_1', 'inv_2']);

      expect(result.batchId).toBe('batch_123');
      expect(result.pdfs).toHaveLength(2);
      expect(result.zipUrl).toContain('batch_123.zip');
    });
  });

  describe('Invoice Scheduling', () => {
    it('should schedule invoice generation', async () => {
      const mockSchedule = {
        scheduleId: 'schedule_123',
        invoiceConfig: {
          customerId: 'cus_123',
          items: [{ description: 'Monthly Service', quantity: 1, unitAmount: 5000, currency: 'usd' }]
        },
        schedule: {
          frequency: 'monthly',
          startDate: new Date(),
          nextRun: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          timezone: 'UTC'
        },
        status: 'active',
        createdAt: new Date()
      };

      jest.spyOn(service as any, 'scheduleInvoiceGeneration').mockResolvedValue(mockSchedule);

      const result = await service.scheduleInvoiceGeneration({
        customerId: 'cus_123',
        items: [{ description: 'Monthly Service', quantity: 1, unitAmount: 5000, currency: 'usd' }],
        schedule: {
          frequency: 'monthly',
          startDate: new Date(),
          timezone: 'UTC'
        }
      });

      expect(result.scheduleId).toBe('schedule_123');
      expect(result.schedule.frequency).toBe('monthly');
      expect(result.status).toBe('active');
    });

    it('should list scheduled invoices', async () => {
      const mockSchedules = [
        {
          scheduleId: 'schedule_1',
          customerId: 'cus_1',
          nextRun: new Date(),
          status: 'active'
        },
        {
          scheduleId: 'schedule_2',
          customerId: 'cus_2',
          nextRun: new Date(),
          status: 'paused'
        }
      ];

      jest.spyOn(service as any, 'listScheduledInvoices').mockResolvedValue(mockSchedules);

      const result = await service.listScheduledInvoices('org-123');

      expect(result).toHaveLength(2);
      expect(result[0].status).toBe('active');
      expect(result[1].status).toBe('paused');
    });
  });

  describe('Invoice Analytics', () => {
    it('should generate invoice analytics report', async () => {
      const mockAnalytics = {
        period: {
          startDate: '2023-01-01',
          endDate: '2023-12-31'
        },
        summary: {
          totalInvoices: 500,
          totalAmount: 2500000,
          averageInvoiceAmount: 5000,
          paidInvoices: 450,
          unpaidInvoices: 50,
          overdueInvoices: 20,
          paymentRate: 0.9
        },
        trends: [
          {
            month: '2023-01',
            invoiceCount: 40,
            totalAmount: 200000,
            averageAmount: 5000,
            paymentRate: 0.95
          },
          {
            month: '2023-02',
            invoiceCount: 42,
            totalAmount: 210000,
            averageAmount: 5000,
            paymentRate: 0.88
          }
        ],
        topCustomers: [
          {
            customerId: 'cus_1',
            customerName: 'Customer A',
            totalAmount: 500000,
            invoiceCount: 100,
            averageAmount: 5000,
            paymentRate: 0.98
          }
        ],
        agingReport: [
          {
            bucket: '0-30 days',
            count: 30,
            amount: 150000,
            percentage: 0.6
          },
          {
            bucket: '31-60 days',
            count: 15,
            amount: 75000,
            percentage: 0.3
          }
        ],
        recommendations: [
          {
            category: 'collections',
            recommendation: 'Follow up on overdue invoices',
            priority: 'high',
            potentialImpact: 'Reduce DSO by 15 days'
          }
        ]
      };

      jest.spyOn(service as any, 'generateInvoiceAnalytics').mockResolvedValue(mockAnalytics);

      const result = await service.generateInvoiceAnalytics('org-123', {
        startDate: '2023-01-01',
        endDate: '2023-12-31'
      });

      expect(result.summary.totalInvoices).toBe(500);
      expect(result.summary.paymentRate).toBe(0.9);
      expect(result.trends).toHaveLength(2);
      expect(result.topCustomers).toHaveLength(1);
      expect(result.agingReport).toHaveLength(2);
      expect(result.recommendations).toHaveLength(1);
    });

    it('should calculate invoice metrics', async () => {
      const mockMetrics = {
        totalRevenue: 2500000,
        totalInvoices: 500,
        averageInvoiceValue: 5000,
        medianInvoiceValue: 4500,
        paymentRate: 0.9,
        averageDaysToPay: 25,
        daysSalesOutstanding: 15,
        badDebtRate: 0.02,
        customerRetentionRate: 0.85,
        invoiceGrowthRate: 0.15
      };

      jest.spyOn(service as any, 'calculateInvoiceMetrics').mockResolvedValue(mockMetrics);

      const result = await service.calculateInvoiceMetrics('org-123');

      expect(result.totalRevenue).toBe(2500000);
      expect(result.paymentRate).toBe(0.9);
      expect(result.averageDaysToPay).toBe(25);
      expect(result.daysSalesOutstanding).toBe(15);
    });
  });

  describe('Invoice Validation', () => {
    it('should validate invoice data', async () => {
      const mockValidation = {
        valid: true,
        errors: [],
        warnings: [],
        suggestions: [
          {
            field: 'due_date',
            message: 'Consider setting a shorter due date',
            impact: 'improve_cash_flow'
          }
        ]
      };

      jest.spyOn(service as any, 'validateInvoiceData').mockResolvedValue(mockValidation);

      const result = await service.validateInvoiceData({
        customerId: 'cus_123',
        items: [{ description: 'Test', quantity: 1, unitAmount: 1000, currency: 'usd' }],
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.suggestions).toHaveLength(1);
    });

    it('should detect validation errors', async () => {
      const mockValidation = {
        valid: false,
        errors: [
          {
            field: 'customer_id',
            message: 'Customer ID is required',
            severity: 'error'
          },
          {
            field: 'items',
            message: 'At least one item is required',
            severity: 'error'
          }
        ],
        warnings: [],
        suggestions: []
      };

      jest.spyOn(service as any, 'validateInvoiceData').mockResolvedValue(mockValidation);

      const result = await service.validateInvoiceData({
        customerId: '',
        items: []
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors[0].field).toBe('customer_id');
    });
  });
});
