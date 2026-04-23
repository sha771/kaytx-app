import { permissionProcedure } from '../../../create-context';
import { z } from 'zod';
import { db as pgDb } from '../../../../db/connection';
import { organizations } from '../../../../db/drizzle-schema';
import { eq } from 'drizzle-orm';
import { Permission } from '../../../../lib/rbac';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge<T extends Record<string, unknown>>(base: T, patch: Record<string, unknown>): T {
  const out: Record<string, unknown> = { ...(base as any) };
  for (const [key, value] of Object.entries(patch)) {
    const existing = out[key];
    if (isPlainObject(existing) && isPlainObject(value)) {
      out[key] = deepMerge(existing as any, value as any);
    } else {
      out[key] = value;
    }
  }
  return out as T;
}

async function getOrganizationForUser(ctx: { user: any }) {
  const orgId = (ctx.user as any)?.organizationId;

  if (orgId) {
    const [org] = await pgDb.select().from(organizations).where(eq(organizations.id, orgId)).limit(1);
    if (org) return org as any;
  }

  const [org] = await pgDb
    .select()
    .from(organizations)
    .where(eq(organizations.ownerId, (ctx.user as any).id))
    .limit(1);
  return org as any;
}

export const getOrganizationProcedure = permissionProcedure(Permission.SETTINGS_READ)
  .input(z.object({}).optional())
  .query(async ({ ctx, input }) => {
  const org = await getOrganizationForUser(ctx);
  if (!org) {
    throw new Error('Organization not found');
  }
  return org;
});

export const updateOrganizationProcedure = permissionProcedure(Permission.SETTINGS_UPDATE)
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
        sso: z.object({
          oidc: z.object({
            issuer: z.string().min(1),
            clientId: z.string().min(1),
            clientSecret: z.string().optional(),
            redirectUri: z.string().min(1),
            scopes: z.array(z.string()).optional(),
            emailClaim: z.string().optional(),
          }).optional(),
          saml: z.object({
            idpMetadataXml: z.string().min(1),
            emailAttribute: z.string().min(1).optional(),
          }).optional(),
        }).optional(),
      }).optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const org = await getOrganizationForUser(ctx);
    if (!org) {
      throw new Error('Organization not found');
    }

    const nextSettings = input.settings
      ? deepMerge(((org as any).settings || {}) as any, input.settings as any)
      : (org as any).settings;

    const update: any = {
      updatedAt: new Date(),
    };

    if (typeof input.name !== 'undefined') update.name = input.name;
    if (typeof input.logo !== 'undefined') update.logo = input.logo;
    if (typeof input.billingEmail !== 'undefined') update.billingEmail = input.billingEmail;
    if (typeof input.taxId !== 'undefined') update.taxId = input.taxId;
    if (typeof input.address !== 'undefined') update.address = input.address;
    if (typeof input.industry !== 'undefined') update.industry = input.industry;
    if (typeof input.companySize !== 'undefined') update.companySize = input.companySize;
    if (typeof input.settings !== 'undefined') update.settings = nextSettings;

    await pgDb.update(organizations).set(update).where(eq(organizations.id, (org as any).id));

    const [updated] = await pgDb.select().from(organizations).where(eq(organizations.id, (org as any).id)).limit(1);
    return (updated || org) as any;
  });
