import { createLegacyRouter, type Context } from '../../create-context';
import { z } from 'zod';
import { organizationManagementService } from '../../../services/organization-management-service';
import { requireAuth, requirePermission } from '../../../middleware/rbac-middleware';
import { Permission, Role } from '../../../lib/rbac';

function assertAuth(ctx: any): { user: NonNullable<Context['user']> } & Context {
  if (!ctx.user) throw new Error('Unauthorized');
  return ctx as { user: NonNullable<Context['user']> } & Context;
}

const createOrganizationSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  industry: z.string().optional(),
  size: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']).optional(),
  website: z.string().url().optional(),
  logo: z.string().url().optional(),
  settings: z.record(z.any()).optional(),
});

const updateOrganizationSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  industry: z.string().optional(),
  size: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']).optional(),
  website: z.string().url().optional(),
  logo: z.string().url().optional(),
  settings: z.record(z.any()).optional(),
});

const inviteMemberSchema = z.object({
  email: z.string().email(),
  role: z.nativeEnum(Role),
  permissions: z.array(z.nativeEnum(Permission)).optional(),
  message: z.string().optional(),
});

const updateMemberRoleSchema = z.object({
  userId: z.string().uuid(),
  role: z.nativeEnum(Role),
  permissions: z.array(z.nativeEnum(Permission)).optional(),
});

const getMembersSchema = z.object({
  role: z.nativeEnum(Role).optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
  search: z.string().optional(),
});

export const organizationsRouter = createLegacyRouter({
  create: {
    input: createOrganizationSchema,
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);

      const organization = await organizationManagementService.createOrganization({
        ...input,
        ownerId: auth.user.id,
      });

      return organization;
    },
  },

  get: {
    resolve: async ({ ctx }) => {
      const auth = assertAuth(ctx);
      
      const organization = await organizationManagementService.getOrganization(
        auth.user.organizationId
      );

      return organization;
    },
  },

  update: {
    input: updateOrganizationSchema,
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.MANAGE_ORGANIZATION);
      
      const organization = await organizationManagementService.updateOrganization(
        auth.user.organizationId,
        input
      );

      return organization;
    },
  },

  inviteMember: {
    input: inviteMemberSchema,
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.MANAGE_MEMBERS);
      
      const invitation = await organizationManagementService.inviteMember({
        organizationId: auth.user.organizationId,
        invitedBy: auth.user.id,
        ...input,
      });

      return invitation;
    },
  },

  acceptInvitation: {
    input: z.string().uuid(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const result = await organizationManagementService.acceptInvitation(
        input,
        auth.user.id
      );

      return result;
    },
  },

  declineInvitation: {
    input: z.string().uuid(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const result = await organizationManagementService.declineInvitation(
        input,
        auth.user.id
      );

      return result;
    },
  },

  getInvitations: {
    resolve: async ({ ctx }) => {
      const auth = assertAuth(ctx);
      
      const invitations = await organizationManagementService.getInvitations(
        auth.user.organizationId
      );

      return invitations;
    },
  },

  cancelInvitation: {
    input: z.string().uuid(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.MANAGE_MEMBERS);
      
      const result = await organizationManagementService.cancelInvitation(
        input,
        auth.user.organizationId
      );

      return result;
    },
  },

  getMembers: {
    input: getMembersSchema.optional(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const members = await organizationManagementService.getMembers(
        auth.user.organizationId,
        input || {}
      );

      return members;
    },
  },

  updateMemberRole: {
    input: updateMemberRoleSchema,
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.MANAGE_MEMBERS);
      
      const result = await organizationManagementService.updateMemberRole(
        auth.user.organizationId,
        input.userId,
        input.role,
        input.permissions
      );

      return result;
    },
  },

  removeMember: {
    input: z.string().uuid(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.MANAGE_MEMBERS);
      
      const result = await organizationManagementService.removeMember(
        auth.user.organizationId,
        input
      );

      return result;
    },
  },

  leaveOrganization: {
    resolve: async ({ ctx }) => {
      const auth = assertAuth(ctx);
      
      const result = await organizationManagementService.leaveOrganization(
        auth.user.id,
        auth.user.organizationId
      );

      return result;
    },
  },

  getStats: {
    resolve: async ({ ctx }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.VIEW_ANALYTICS);
      
      const stats = await organizationManagementService.getOrganizationStats(
        auth.user.organizationId
      );

      return stats;
    },
  },

  getSettings: {
    resolve: async ({ ctx }) => {
      const auth = assertAuth(ctx);
      
      const settings = await organizationManagementService.getOrganizationSettings(
        auth.user.organizationId
      );

      return settings;
    },
  },

  updateSettings: {
    input: z.record(z.any()),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.MANAGE_ORGANIZATION);
      
      const settings = await organizationManagementService.updateOrganizationSettings(
        auth.user.organizationId,
        input
      );

      return settings;
    },
  },

  getBilling: {
    resolve: async ({ ctx }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.MANAGE_BILLING);
      
      const billing = await organizationManagementService.getBillingInfo(
        auth.user.organizationId
      );

      return billing;
    },
  },

  updateBilling: {
    input: z.object({
      billingEmail: z.string().email().optional(),
      billingAddress: z.object({
        line1: z.string(),
        line2: z.string().optional(),
        city: z.string(),
        state: z.string(),
        postalCode: z.string(),
        country: z.string(),
      }).optional(),
      taxId: z.string().optional(),
    }),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.MANAGE_BILLING);
      
      const billing = await organizationManagementService.updateBillingInfo(
        auth.user.organizationId,
        input
      );

      return billing;
    },
  },

  getUsage: {
    input: z.object({
      startDate: z.date().optional(),
      endDate: z.date().optional(),
    }).optional(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.VIEW_ANALYTICS);
      
      const usage = await organizationManagementService.getOrganizationUsage(
        auth.user.organizationId,
        input || {}
      );

      return usage;
    },
  },

  getAuditLog: {
    input: z.object({
      limit: z.number().min(1).max(100).optional(),
      offset: z.number().min(0).optional(),
      action: z.string().optional(),
      userId: z.string().uuid().optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
    }).optional(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.VIEW_AUDIT_LOG);
      
      const auditLog = await organizationManagementService.getAuditLog(
        auth.user.organizationId,
        input || {}
      );

      return auditLog;
    },
  },
});
