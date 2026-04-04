import { protectedProcedure } from '../../../create-context';
import { z } from 'zod';

const mockOrganization = {
  id: '1',
  name: 'Enterprise Corp',
  slug: 'enterprise-corp',
  ownerId: '1',
  logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
  plan: 'enterprise',
  status: 'active',
  maxUsers: -1,
  maxStorage: -1,
  settings: {
    enforceSSO: true,
    enforce2FA: true,
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expiryDays: 90,
    },
    sessionTimeout: 3600,
    ipWhitelist: [],
    dataRetentionDays: 90,
  },
  billingEmail: 'billing@enterprise.com',
  taxId: 'US123456789',
  address: {
    street: '123 Enterprise St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'US',
  },
  industry: 'Technology',
  companySize: '1000-5000',
  createdAt: new Date('2023-01-01').toISOString(),
  updatedAt: new Date().toISOString(),
};

export const getOrganizationProcedure = protectedProcedure.query(async ({ ctx }) => {
  console.log('[Enterprise] Getting organization for user:', ctx.user.id);
  return mockOrganization;
});

export const updateOrganizationProcedure = protectedProcedure
  .input(
    z.object({
      name: z.string().optional(),
      logo: z.string().optional(),
      billingEmail: z.string().email().optional(),
      taxId: z.string().optional(),
      address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zip: z.string(),
        country: z.string(),
      }).optional(),
      industry: z.string().optional(),
      companySize: z.string().optional(),
      settings: z.object({
        enforceSSO: z.boolean().optional(),
        enforce2FA: z.boolean().optional(),
        passwordPolicy: z.object({
          minLength: z.number(),
          requireUppercase: z.boolean(),
          requireLowercase: z.boolean(),
          requireNumbers: z.boolean(),
          requireSpecialChars: z.boolean(),
          expiryDays: z.number().optional(),
        }).optional(),
        sessionTimeout: z.number().optional(),
        ipWhitelist: z.array(z.string()).optional(),
        dataRetentionDays: z.number().optional(),
      }).optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    console.log('[Enterprise] Updating organization:', input);

    return {
      ...mockOrganization,
      ...input,
      updatedAt: new Date().toISOString(),
    };
  });
