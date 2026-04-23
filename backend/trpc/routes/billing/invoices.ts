import { z } from 'zod';
import { permissionProcedure } from '../../create-context';
import { db as pgDb } from '../../../db/connection';
import { invoices, payments, organizations } from '../../../db/drizzle-schema';
import { eq, and, desc, gte, lte } from 'drizzle-orm';
import { logAudit, AuditActions } from '../../../lib/audit';
import { Permission } from '../../../lib/rbac';
import { invoiceGenerationService } from '../../../services/invoice-generation-service';
import { stripeService } from '../../../services/stripe-service';

// Schemas
const createInvoiceSchema = z.object({
  organizationId: z.string().uuid(),
  subscriptionId: z.string().uuid().optional(),
  items: z.array(z.object({
    description: z.string().min(1),
    quantity: z.number().positive(),
    unitPrice: z.number().positive(),
    total: z.number().positive(),
    metadata: z.record(z.any()).optional(),
  })),
  dueDate: z.string().datetime().optional(),
  taxRate: z.number().min(0).max(100).default(0),
  currency: z.string().length(3).default('USD'),
  metadata: z.record(z.any()).optional(),
});

const getInvoicesSchema = z.object({
  organizationId: z.string().uuid(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  status: z.enum(['draft', 'pending', 'paid', 'overdue', 'cancelled', 'refunded', 'failed']).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

const getInvoiceByIdSchema = z.object({
  organizationId: z.string().uuid(),
  invoiceId: z.string().uuid(),
});

const updateInvoiceSchema = z.object({
  organizationId: z.string().uuid(),
  invoiceId: z.string().uuid(),
  status: z.enum(['draft', 'pending', 'paid', 'overdue', 'cancelled', 'refunded', 'failed']).optional(),
  dueDate: z.string().datetime().optional(),
  metadata: z.record(z.any()).optional(),
});

const deleteInvoiceSchema = z.object({
  organizationId: z.string().uuid(),
  invoiceId: z.string().uuid(),
});

const generateSubscriptionInvoiceSchema = z.object({
  organizationId: z.string().uuid(),
  subscriptionId: z.string().uuid(),
});

const finalizeInvoiceSchema = z.object({
  organizationId: z.string().uuid(),
  invoiceId: z.string().uuid(),
});

const downloadInvoicePdfSchema = z.object({
  organizationId: z.string().uuid(),
  invoiceId: z.string().uuid(),
});

// Procedures
export const createInvoiceProcedure = permissionProcedure(Permission.BILLING_WRITE)
  .input(createInvoiceSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      // Verify organization access
      const [organization] = await pgDb
        .select()
        .from(organizations)
        .where(eq(organizations.id, input.organizationId))
        .limit(1);

      if (!organization) {
        return {
          success: false,
          error: 'Organization not found',
        };
      }

      // Create invoice using the invoice generation service
      const result = await invoiceGenerationService.createInvoice({
        organizationId: input.organizationId,
        subscriptionId: input.subscriptionId,
        items: input.items,
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
        taxRate: input.taxRate,
        currency: input.currency,
        metadata: input.metadata,
      });

      return {
        success: true,
        data: {
          invoice: result.invoice,
          stripeInvoice: result.stripeInvoice,
        },
      };
    } catch (error) {
      console.error('[Billing] Create invoice failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

export const getInvoicesProcedure = permissionProcedure(Permission.BILLING_READ)
  .input(getInvoicesSchema)
  .query(async ({ ctx, input }) => {
    try {
      // Build query
      let query = pgDb
        .select()
        .from(invoices)
        .where(eq(invoices.organizationId, input.organizationId));

      // Apply filters
      if (input.status) {
        query = query.where(eq(invoices.status, input.status));
      }

      if (input.dateFrom) {
        const fromDate = new Date(input.dateFrom);
        query = query.where(gte(invoices.createdAt, fromDate));
      }

      if (input.dateTo) {
        const toDate = new Date(input.dateTo);
        query = query.where(lte(invoices.createdAt, toDate));
      }

      // Get total count
      const totalQuery = query;
      const totalResults = await totalQuery;
      const total = totalResults.length;

      // Apply pagination and ordering
      query = query.orderBy(desc(invoices.createdAt));
      
      if (input.limit) {
        query = query.limit(input.limit);
      }
      
      const offset = (input.page - 1) * input.limit;
      if (offset > 0) {
        query = query.offset(offset);
      }

      const items = await query;

      return {
        success: true,
        data: {
          items,
          total,
          page: input.page,
          limit: input.limit,
          hasMore: offset + input.limit < total,
        },
      };
    } catch (error) {
      console.error('[Billing] Get invoices failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

export const getInvoiceByIdProcedure = permissionProcedure(Permission.BILLING_READ)
  .input(getInvoiceByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const [invoice] = await pgDb
        .select()
        .from(invoices)
        .where(and(
          eq(invoices.id, input.invoiceId),
          eq(invoices.organizationId, input.organizationId)
        ))
        .limit(1);

      if (!invoice) {
        return {
          success: false,
          error: 'Invoice not found',
        };
      }

      return {
        success: true,
        data: invoice,
      };
    } catch (error) {
      console.error('[Billing] Get invoice by ID failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

export const updateInvoiceProcedure = permissionProcedure(Permission.BILLING_WRITE)
  .input(updateInvoiceSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      // Check if invoice exists and belongs to organization
      const [existingInvoice] = await pgDb
        .select()
        .from(invoices)
        .where(and(
          eq(invoices.id, input.invoiceId),
          eq(invoices.organizationId, input.organizationId)
        ))
        .limit(1);

      if (!existingInvoice) {
        return {
          success: false,
          error: 'Invoice not found',
        };
      }

      // Prepare update data
      const updateData: any = {
        updatedAt: new Date(),
      };

      if (input.status) updateData.status = input.status;
      if (input.dueDate) updateData.dueDate = new Date(input.dueDate);
      if (input.metadata) updateData.metadata = { ...existingInvoice.metadata, ...input.metadata };

      // Update invoice
      const [updatedInvoice] = await pgDb
        .update(invoices)
        .set(updateData)
        .where(and(
          eq(invoices.id, input.invoiceId),
          eq(invoices.organizationId, input.organizationId)
        ))
        .returning();

      logAudit({
        organizationId: input.organizationId,
        action: AuditActions.INVOICE_UPDATED,
        resource: 'invoice',
        resourceId: input.invoiceId,
        metadata: { 
          invoiceNumber: updatedInvoice.invoiceNumber,
          updates: Object.keys(updateData),
        },
        status: 'success',
      });

      return {
        success: true,
        data: updatedInvoice,
      };
    } catch (error) {
      console.error('[Billing] Update invoice failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

export const deleteInvoiceProcedure = permissionProcedure(Permission.BILLING_WRITE)
  .input(deleteInvoiceSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      // Check if invoice exists and belongs to organization
      const [existingInvoice] = await pgDb
        .select()
        .from(invoices)
        .where(and(
          eq(invoices.id, input.invoiceId),
          eq(invoices.organizationId, input.organizationId)
        ))
        .limit(1);

      if (!existingInvoice) {
        return {
          success: false,
          error: 'Invoice not found',
        };
      }

      // Only allow deletion of draft invoices
      if (existingInvoice.status !== 'draft') {
        return {
          success: false,
          error: 'Only draft invoices can be deleted',
        };
      }

      // Delete invoice
      await pgDb
        .delete(invoices)
        .where(and(
          eq(invoices.id, input.invoiceId),
          eq(invoices.organizationId, input.organizationId)
        ));

      logAudit({
        organizationId: input.organizationId,
        action: AuditActions.INVOICE_DELETED,
        resource: 'invoice',
        resourceId: input.invoiceId,
        metadata: { 
          invoiceNumber: existingInvoice.invoiceNumber,
        },
        status: 'success',
      });

      return {
        success: true,
        message: 'Invoice deleted successfully',
      };
    } catch (error) {
      console.error('[Billing] Delete invoice failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

export const generateSubscriptionInvoiceProcedure = permissionProcedure(Permission.BILLING_WRITE)
  .input(generateSubscriptionInvoiceSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const result = await invoiceGenerationService.generateSubscriptionInvoice(input.subscriptionId);

      return {
        success: true,
        data: {
          invoice: result.invoice,
          stripeInvoice: result.stripeInvoice,
        },
      };
    } catch (error) {
      console.error('[Billing] Generate subscription invoice failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

export const finalizeInvoiceProcedure = permissionProcedure(Permission.BILLING_WRITE)
  .input(finalizeInvoiceSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const result = await invoiceGenerationService.finalizeInvoice(input.invoiceId);

      return {
        success: true,
        data: {
          invoice: result.invoice,
          stripeInvoice: result.stripeInvoice,
        },
      };
    } catch (error) {
      console.error('[Billing] Finalize invoice failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

export const downloadInvoicePdfProcedure = permissionProcedure(Permission.BILLING_READ)
  .input(downloadInvoicePdfSchema)
  .query(async ({ ctx, input }) => {
    try {
      // Check if invoice exists and belongs to organization
      const [invoice] = await pgDb
        .select()
        .from(invoices)
        .where(and(
          eq(invoices.id, input.invoiceId),
          eq(invoices.organizationId, input.organizationId)
        ))
        .limit(1);

      if (!invoice) {
        return {
          success: false,
          error: 'Invoice not found',
        };
      }

      // Generate PDF
      const pdfBuffer = await invoiceGenerationService.getInvoicePdf(input.invoiceId);

      // In a real implementation, you would return a URL to the PDF
      // or upload it to a storage service and return the URL
      return {
        success: true,
        data: {
          invoiceNumber: invoice.invoiceNumber,
          pdfSize: pdfBuffer.length,
          // In production: pdfUrl: 'https://storage.example.com/invoices/...'
        },
      };
    } catch (error) {
      console.error('[Billing] Download invoice PDF failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

export const getInvoiceStatsProcedure = permissionProcedure(Permission.BILLING_READ)
  .input(z.object({
    organizationId: z.string().uuid(),
  }))
  .query(async ({ ctx, input }) => {
    try {
      const invoicesList = await pgDb
        .select()
        .from(invoices)
        .where(eq(invoices.organizationId, input.organizationId));

      const stats = {
        totalInvoices: invoicesList.length,
        draftInvoices: invoicesList.filter(inv => inv.status === 'draft').length,
        pendingInvoices: invoicesList.filter(inv => inv.status === 'pending').length,
        paidInvoices: invoicesList.filter(inv => inv.status === 'paid').length,
        overdueInvoices: invoicesList.filter(inv => inv.status === 'overdue').length,
        totalAmount: invoicesList.reduce((sum, inv) => sum + parseFloat(inv.total.toString()), 0),
        paidAmount: invoicesList
          .filter(inv => inv.status === 'paid')
          .reduce((sum, inv) => sum + parseFloat(inv.total.toString()), 0),
        outstandingAmount: invoicesList
          .filter(inv => ['pending', 'overdue'].includes(inv.status))
          .reduce((sum, inv) => sum + parseFloat(inv.total.toString()), 0),
      };

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      console.error('[Billing] Get invoice stats failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
