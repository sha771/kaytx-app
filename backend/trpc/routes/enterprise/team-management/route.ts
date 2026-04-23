import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { db as pgDb } from '../../../../db/connection';
import { users, organizations } from '../../../../db/drizzle-schema';
import { eq, and, ilike, sql } from 'drizzle-orm';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { hashPassword } from '../../../../lib/auth';
import { Permission } from '../../../../lib/rbac';

type TeamRole = 'admin' | 'manager' | 'user' | 'viewer';
type TeamStatus = 'active' | 'inactive' | 'suspended';

function mapTeamRoleToDbRole(role: TeamRole): 'admin' | 'user' {
  if (role === 'admin' || role === 'manager') return 'admin';
  return 'user';
}

function mapTeamStatusToDbStatus(status: TeamStatus): 'active' | 'suspended' {
  if (status === 'active') return 'active';
  return 'suspended';
}

const inviteUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(['admin', 'manager', 'user', 'viewer']),
  department: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

const updateUserSchema = z.object({
  userId: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(['admin', 'manager', 'user', 'viewer']).optional(),
  department: z.string().optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
  permissions: z.array(z.string()).optional(),
});

const removeUserSchema = z.object({
  userId: z.string(),
  transferDataTo: z.string().optional(),
});

const getTeamMembersSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  search: z.string().optional(),
  department: z.string().optional(),
  role: z.string().optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
});

export const inviteUserProcedure = permissionProcedure(Permission.USER_CREATE)
  .input(inviteUserSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    const [existingUser] = await pgDb
      .select()
      .from(users)
      .where(and(
        eq(users.email, input.email.toLowerCase()),
        eq(users.organizationId, organizationId)
      ))
      .limit(1);

    if (existingUser) {
      throw new Error('User already exists in organization');
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const passwordHash = await hashPassword(tempPassword);
    const invitationToken = Math.random().toString(36).slice(-32);
    const invitationExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const dbRole = mapTeamRoleToDbRole(input.role as TeamRole);
    const metadata = {
      ...(typeof input.department === 'string' && input.department.trim()
        ? { department: input.department.trim() }
        : {}),
      ...(Array.isArray(input.permissions) ? { permissions: input.permissions } : {}),
      teamRole: input.role,
      invitationToken,
      invitationExpires: invitationExpires.toISOString(),
    };

    const [newUser] = await pgDb
      .insert(users)
      .values({
        email: input.email.toLowerCase(),
        passwordHash,
        firstName: input.firstName,
        lastName: input.lastName,
        role: dbRole,
        organizationId,
        status: 'pending',
        emailVerified: true,
        metadata,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any)
      .returning();

    logAudit({
      userId: ctx.user.id,
      action: AuditActions.USER_INVITED,
      resource: 'user',
      resourceId: newUser.id,
      organizationId,
      metadata: {
        invitedEmail: input.email,
        role: input.role,
      },
      status: 'success',
    });

    return {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        status: newUser.status,
      },
      invitationToken,
      message: 'User invited successfully',
    };
  });

export const updateUserProcedure = permissionProcedure(Permission.USER_UPDATE)
  .input(updateUserSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    const [user] = await pgDb
      .select()
      .from(users)
      .where(and(
        eq(users.id, input.userId),
        eq(users.organizationId, organizationId)
      ))
      .limit(1);

    if (!user) {
      throw new Error('User not found');
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (input.firstName) updateData.firstName = input.firstName;
    if (input.lastName) updateData.lastName = input.lastName;
    if (input.role) updateData.role = mapTeamRoleToDbRole(input.role as TeamRole);
    if (input.status) updateData.status = mapTeamStatusToDbStatus(input.status as TeamStatus);

    const existingMetadata = ((user as any)?.metadata && typeof (user as any).metadata === 'object') ? (user as any).metadata : {};
    const nextMetadata = {
      ...existingMetadata,
      ...(typeof input.department === 'string' ? { department: input.department } : {}),
      ...(Array.isArray(input.permissions) ? { permissions: input.permissions } : {}),
      ...(input.role ? { teamRole: input.role } : {}),
    };
    updateData.metadata = nextMetadata;

    const [updatedUser] = await pgDb
      .update(users)
      .set(updateData)
      .where(and(eq(users.id, input.userId), eq(users.organizationId, organizationId)))
      .returning();

    logAudit({
      userId: ctx.user.id,
      action: AuditActions.USER_UPDATED,
      resource: 'user',
      resourceId: input.userId,
      organizationId,
      metadata: {
        changes: Object.keys(input).filter(key => input[key as keyof typeof input] !== undefined),
      },
      status: 'success',
    });

    return {
      success: true,
      user: updatedUser,
      message: 'User updated successfully',
    };
  });

export const removeUserProcedure = permissionProcedure(Permission.USER_DELETE)
  .input(removeUserSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    const [user] = await pgDb
      .select()
      .from(users)
      .where(and(
        eq(users.id, input.userId),
        eq(users.organizationId, organizationId)
      ))
      .limit(1);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.id === ctx.user.id) {
      throw new Error('Cannot remove yourself from the organization');
    }

    await pgDb
      .delete(users)
      .where(and(eq(users.id, input.userId), eq(users.organizationId, organizationId)));

    logAudit({
      userId: ctx.user.id,
      action: AuditActions.USER_REMOVED,
      resource: 'user',
      resourceId: input.userId,
      organizationId,
      metadata: {
        removedEmail: user.email,
        transferDataTo: input.transferDataTo,
      },
      status: 'success',
    });

    return {
      success: true,
      message: 'User removed successfully',
    };
  });

export const getTeamMembersProcedure = permissionProcedure(Permission.TEAM_READ)
  .input(getTeamMembersSchema)
  .query(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    const offset = (input.page - 1) * input.limit;

    let whereConditions = [eq(users.organizationId, organizationId)];
    
    if (input.search) {
      whereConditions.push(
        ilike(users.firstName, `%${input.search}%`)
      );
    }
    
    if (input.department) {
      whereConditions.push(sql`${users.metadata}->>'department' = ${input.department}`);
    }

    if (input.role) {
      const normalized = String(input.role).toLowerCase().trim();
      if (normalized === 'admin' || normalized === 'manager' || normalized === 'user' || normalized === 'viewer') {
        const dbRole = mapTeamRoleToDbRole(normalized as TeamRole);
        whereConditions.push(eq(users.role, dbRole));
      }
    }

    if (input.status) {
      const normalized = String(input.status).toLowerCase().trim();
      if (normalized === 'active' || normalized === 'inactive' || normalized === 'suspended') {
        whereConditions.push(eq(users.status, mapTeamStatusToDbStatus(normalized as TeamStatus)));
      }
    }

    const [teamMembers, totalCount] = await Promise.all([
      pgDb
        .select({
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          role: users.role,
          teamRole: sql<string>`${users.metadata}->>'teamRole'`,
          department: sql<string>`${users.metadata}->>'department'`,
          status: users.status,
          lastLoginAt: users.lastLoginAt,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(and(...whereConditions))
        .limit(input.limit)
        .offset(offset),
      pgDb
        .select({ count: users.id })
        .from(users)
        .where(and(...whereConditions))
        .then(result => result.length),
    ]);

    return {
      teamMembers,
      pagination: {
        page: input.page,
        limit: input.limit,
        total: totalCount,
        pages: Math.ceil(totalCount / input.limit),
      },
    };
  });

export const getTeamStatsProcedure = permissionProcedure(Permission.TEAM_READ)
  .input(z.object({}).optional())
  .query(async ({ ctx, input }) => {
    const organizationId = ctx.user.organizationId;

    const rows = await pgDb
      .select({
        role: users.role,
        status: users.status,
        teamRole: sql<string>`${users.metadata}->>'teamRole'`,
      })
      .from(users)
      .where(eq(users.organizationId, organizationId));

    const totalMembers = rows.length;
    const activeMembers = rows.filter((r: any) => r.status === 'active').length;
    const pendingInvitations = rows.filter((r: any) => r.status === 'pending').length;
    const admins = rows.filter((r: any) => r.role === 'admin' || r.role === 'enterprise_admin' || r.role === 'super_admin').length;
    const managers = rows.filter((r: any) => String(r.teamRole || '').toLowerCase() === 'manager').length;
    const regularUsers = rows.filter((r: any) => r.role === 'user').length;

    return {
      totalMembers,
      activeMembers,
      pendingInvitations,
      admins,
      managers,
      regularUsers,
    };
  });
