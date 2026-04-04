import { protectedProcedure } from '../../../create-context';
import { z } from 'zod';

const mockApiKeys = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'pk_live_1234567890abcdef',
    hashedKey: 'hash_1234567890abcdef',
    permissions: ['read', 'write', 'delete'],
    rateLimit: 10000,
    status: 'active',
    lastUsedAt: new Date(Date.now() - 3600000).toISOString(),
    usageCount: 45827,
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'pk_test_9876543210fedcba',
    hashedKey: 'hash_9876543210fedcba',
    permissions: ['read'],
    rateLimit: 1000,
    status: 'active',
    lastUsedAt: new Date(Date.now() - 7200000).toISOString(),
    usageCount: 12453,
    createdAt: new Date('2024-06-15').toISOString(),
  },
];

export const getApiKeysProcedure = protectedProcedure.query(async ({ ctx }) => {
  console.log('[Enterprise] Getting API keys for user:', ctx.user.id);
  return mockApiKeys;
});

export const createApiKeyProcedure = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      permissions: z.array(z.string()),
      rateLimit: z.number().optional().default(1000),
      expiresAt: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    console.log('[Enterprise] Creating API key:', input.name);

    const newKey = {
      id: Math.random().toString(36).substr(2, 9),
      name: input.name,
      key: `pk_${Math.random().toString(36).substr(2, 20)}`,
      hashedKey: `hash_${Math.random().toString(36).substr(2, 20)}`,
      permissions: input.permissions,
      rateLimit: input.rateLimit,
      status: 'active',
      lastUsedAt: null,
      usageCount: 0,
      expiresAt: input.expiresAt,
      createdAt: new Date().toISOString(),
    };

    return newKey;
  });

export const revokeApiKeyProcedure = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    console.log('[Enterprise] Revoking API key:', input.id);

    return {
      success: true,
      message: 'API key revoked successfully',
    };
  });
