import { protectedProcedure } from '../../../create-context';
import { z } from 'zod';

const mockInvoices = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    organizationId: '1',
    amount: 2499,
    tax: 249.9,
    total: 2748.9,
    currency: 'USD',
    status: 'paid',
    dueDate: new Date('2024-12-15').toISOString(),
    paidAt: new Date('2024-12-10').toISOString(),
    items: [
      { description: 'Enterprise Plan - December 2024', quantity: 1, price: 1999 },
      { description: 'Additional Users (50)', quantity: 50, price: 10 },
    ],
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    organizationId: '1',
    amount: 2499,
    tax: 249.9,
    total: 2748.9,
    currency: 'USD',
    status: 'pending',
    dueDate: new Date('2025-01-15').toISOString(),
    items: [
      { description: 'Enterprise Plan - January 2025', quantity: 1, price: 1999 },
      { description: 'Additional Users (50)', quantity: 50, price: 10 },
    ],
  },
];

export const getInvoicesProcedure = protectedProcedure
  .input(
    z.object({
      limit: z.number().optional().default(10),
      offset: z.number().optional().default(0),
      status: z.enum(['paid', 'pending', 'overdue', 'cancelled']).optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    console.log('[Enterprise] Getting invoices for user:', ctx.user.id);

    let invoices = mockInvoices.filter(
      (inv) => inv.organizationId === ctx.user.organizationId || inv.organizationId === '1'
    );

    if (input.status) {
      invoices = invoices.filter((inv) => inv.status === input.status);
    }

    const total = invoices.length;
    const items = invoices.slice(input.offset, input.offset + input.limit);

    return {
      items,
      total,
      hasMore: input.offset + input.limit < total,
    };
  });
