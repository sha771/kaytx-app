import { z } from 'zod';
import { publicProcedure } from '../../../create-context';
import { ssoService } from '../../../../services/sso-service';

const startOidcSchema = z.object({
  orgSlug: z.string().min(1),
});

const oidcCallbackSchema = z.object({
  code: z.string().min(1),
  state: z.string().min(1),
});

const samlAuthSchema = z.object({
  orgSlug: z.string().min(1),
  baseUrl: z.string().url().optional(),
});

const samlCallbackSchema = z.object({
  orgSlug: z.string().min(1),
  baseUrl: z.string().url().optional(),
  samlResponse: z.string().min(1),
});

const samlMetadataSchema = z.object({
  orgSlug: z.string().min(1),
  baseUrl: z.string().url().optional(),
});

export const startOidcProcedure = publicProcedure
  .input(startOidcSchema)
  .mutation(async ({ input }) => {
    return ssoService.buildOidcAuthUrl(input.orgSlug);
  });

export const oidcCallbackProcedure = publicProcedure
  .input(oidcCallbackSchema)
  .mutation(async ({ input }) => {
    return ssoService.handleOidcCallback(input);
  });

export const getSamlMetadataProcedure = publicProcedure
  .input(samlMetadataSchema)
  .query(async ({ input }) => {
    const baseUrl = input.baseUrl || config.baseUrl;
    const metadata = await ssoService.getSamlSpMetadata(input.orgSlug, baseUrl);
    return { metadata };
  });

export const startSamlAuthProcedure = publicProcedure
  .input(samlAuthSchema)
  .mutation(async ({ input }) => {
    const baseUrl = input.baseUrl || config.baseUrl;
    return ssoService.buildSamlAuthUrl(input.orgSlug, baseUrl);
  });

export const samlCallbackProcedure = publicProcedure
  .input(samlCallbackSchema)
  .mutation(async ({ input }) => {
    const baseUrl = input.baseUrl || config.baseUrl;
    return ssoService.handleSamlCallback({
      orgSlug: input.orgSlug,
      baseUrl,
      samlResponse: input.samlResponse,
    });
  });
