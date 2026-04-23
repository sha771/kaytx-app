import { db as pgDb } from '../db/connection';
import { users, organizations } from '../db/drizzle-schema';
import { eq, and, inArray } from 'drizzle-orm';
import { logAudit, AuditActions } from '../lib/audit';
import { Permission, Role, hasPermission } from '../lib/rbac';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface CustomRole {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  permissions: Permission[];
  parentRoleId?: string;
  isActive: boolean;
  isSystemRole: boolean;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleHierarchy {
  id: string;
  organizationId: string;
  parentRoleId: string;
  childRoleId: string;
  level: number;
  createdAt: Date;
}

export interface PermissionTemplate {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  category: 'basic' | 'admin' | 'enterprise' | 'custom';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleAssignment {
  id: string;
  userId: string;
  organizationId: string;
  roleId: string;
  assignedBy: string;
  assignedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  metadata: Record<string, any>;
}

export interface GranularPermission {
  id: string;
  userId: string;
  organizationId: string;
  resource: string;
  action: string;
  conditions?: Record<string, any>;
  granted: boolean;
  grantedBy: string;
  grantedAt: Date;
  expiresAt?: Date;
  reason?: string;
}

export class AdvancedRoleManagementService {
  // Custom Role Management
  async createCustomRole(organizationId: string, role: Omit<CustomRole, 'id' | 'createdAt' | 'updatedAt'>): Promise<CustomRole> {
    const newRole: CustomRole = {
      ...role,
      id: `role_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // In a real implementation, this would be stored in a custom_roles table
    logger.info(`Created custom role: ${newRole.name} for organization ${organizationId}`);

    logAudit({
      organizationId,
      action: AuditActions.ROLE_CREATED,
      resource: 'custom_role',
      resourceId: newRole.id,
      metadata: { 
        roleName: newRole.name,
        permissions: newRole.permissions.length,
        parentRoleId: newRole.parentRoleId
      },
      status: 'success',
    });

    return newRole;
  }

  async updateCustomRole(organizationId: string, roleId: string, updates: Partial<CustomRole>): Promise<CustomRole> {
    // In a real implementation, this would update the custom_roles table
    logger.info(`Updated custom role: ${roleId} for organization ${organizationId}`);

    logAudit({
      organizationId,
      action: AuditActions.ROLE_UPDATED,
      resource: 'custom_role',
      resourceId: roleId,
      metadata: { updates: Object.keys(updates) },
      status: 'success',
    });

    // Return updated role (mock)
    return {
      id: roleId,
      organizationId,
      name: updates.name || 'Updated Role',
      description: updates.description || 'Updated description',
      permissions: updates.permissions || [],
      parentRoleId: updates.parentRoleId,
      isActive: updates.isActive ?? true,
      isSystemRole: false,
      metadata: updates.metadata || {},
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  async deleteCustomRole(organizationId: string, roleId: string): Promise<boolean> {
    // Check if role is in use
    const roleAssignments = await this.getRoleAssignmentsByRole(organizationId, roleId);
    if (roleAssignments.length > 0) {
      throw new Error('Cannot delete role that is assigned to users');
    }

    // In a real implementation, this would delete from custom_roles table
    logger.info(`Deleted custom role: ${roleId} for organization ${organizationId}`);

    logAudit({
      organizationId,
      action: AuditActions.ROLE_DELETED,
      resource: 'custom_role',
      resourceId: roleId,
      metadata: {},
      status: 'success',
    });

    return true;
  }

  async getCustomRoles(organizationId: string): Promise<CustomRole[]> {
    // In a real implementation, this would query the custom_roles table
    // Mock data for demonstration
    return [
      {
        id: 'role_custom_1',
        organizationId,
        name: 'Marketing Manager',
        description: 'Can manage marketing campaigns and view analytics',
        permissions: [
          Permission.MARKETING_CAMPAIGNS_READ,
          Permission.MARKETING_CAMPAIGNS_CREATE,
          Permission.MARKETING_CAMPAIGNS_UPDATE,
          Permission.ANALYTICS_READ,
          Permission.ANALYTICS_EXPORT
        ],
        parentRoleId: undefined,
        isActive: true,
        isSystemRole: false,
        metadata: { department: 'marketing' },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'role_custom_2',
        organizationId,
        name: 'Sales Representative',
        description: 'Can manage contacts and deals',
        permissions: [
          Permission.USER_READ,
          Permission.TEAM_READ,
          Permission.ANALYTICS_READ,
          Permission.AI_AGENT_USE
        ],
        parentRoleId: undefined,
        isActive: true,
        isSystemRole: false,
        metadata: { department: 'sales' },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  // Role Hierarchy Management
  async createRoleHierarchy(organizationId: string, parentRoleId: string, childRoleId: string): Promise<RoleHierarchy> {
    const hierarchy: RoleHierarchy = {
      id: `hierarchy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      organizationId,
      parentRoleId,
      childRoleId,
      level: await this.calculateHierarchyLevel(organizationId, parentRoleId) + 1,
      createdAt: new Date()
    };

    // In a real implementation, this would be stored in a role_hierarchy table
    logger.info(`Created role hierarchy: ${parentRoleId} -> ${childRoleId}`);

    logAudit({
      organizationId,
      action: AuditActions.ROLE_HIERARCHY_CREATED,
      resource: 'role_hierarchy',
      resourceId: hierarchy.id,
      metadata: { parentRoleId, childRoleId, level: hierarchy.level },
      status: 'success',
    });

    return hierarchy;
  }

  async removeRoleHierarchy(organizationId: string, parentRoleId: string, childRoleId: string): Promise<boolean> {
    // In a real implementation, this would delete from role_hierarchy table
    logger.info(`Removed role hierarchy: ${parentRoleId} -> ${childRoleId}`);

    logAudit({
      organizationId,
      action: AuditActions.ROLE_HIERARCHY_DELETED,
      resource: 'role_hierarchy',
      resourceId: `${parentRoleId}_${childRoleId}`,
      metadata: { parentRoleId, childRoleId },
      status: 'success',
    });

    return true;
  }

  async getRoleHierarchy(organizationId: string): Promise<RoleHierarchy[]> {
    // In a real implementation, this would query the role_hierarchy table
    return [
      {
        id: 'hierarchy_1',
        organizationId,
        parentRoleId: 'role_admin',
        childRoleId: 'role_custom_1',
        level: 1,
        createdAt: new Date()
      },
      {
        id: 'hierarchy_2',
        organizationId,
        parentRoleId: 'role_custom_1',
        childRoleId: 'role_custom_2',
        level: 2,
        createdAt: new Date()
      }
    ];
  }

  async getInheritedPermissions(roleId: string, organizationId: string): Promise<Permission[]> {
    const hierarchy = await this.getRoleHierarchy(organizationId);
    const inheritedPermissions: Permission[] = [];
    
    // Find all parent roles in the hierarchy
    const parentRoles = this.findParentRoles(roleId, hierarchy);
    
    // Collect permissions from all parent roles
    for (const parentRoleId of parentRoles) {
      const parentRole = await this.getCustomRoleById(parentRoleId, organizationId);
      if (parentRole) {
        inheritedPermissions.push(...parentRole.permissions);
      }
    }

    return [...new Set(inheritedPermissions)]; // Remove duplicates
  }

  // Role Assignment Management
  async assignRoleToUser(organizationId: string, userId: string, roleId: string, assignedBy: string, expiresAt?: Date): Promise<RoleAssignment> {
    const assignment: RoleAssignment = {
      id: `assignment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      organizationId,
      roleId,
      assignedBy,
      assignedAt: new Date(),
      expiresAt,
      isActive: true,
      metadata: {}
    };

    // In a real implementation, this would be stored in a role_assignments table
    logger.info(`Assigned role ${roleId} to user ${userId}`);

    logAudit({
      organizationId,
      action: AuditActions.ROLE_ASSIGNED,
      resource: 'role_assignment',
      resourceId: assignment.id,
      metadata: { userId, roleId, assignedBy, expiresAt },
      status: 'success',
    });

    return assignment;
  }

  async removeRoleFromUser(organizationId: string, userId: string, roleId: string): Promise<boolean> {
    // In a real implementation, this would delete from role_assignments table
    logger.info(`Removed role ${roleId} from user ${userId}`);

    logAudit({
      organizationId,
      action: AuditActions.ROLE_UNASSIGNED,
      resource: 'role_assignment',
      resourceId: `${userId}_${roleId}`,
      metadata: { userId, roleId },
      status: 'success',
    });

    return true;
  }

  async getUserRoles(userId: string, organizationId: string): Promise<RoleAssignment[]> {
    // In a real implementation, this would query the role_assignments table
    return [
      {
        id: 'assignment_1',
        userId,
        organizationId,
        roleId: 'role_custom_1',
        assignedBy: 'admin_user',
        assignedAt: new Date(),
        isActive: true,
        metadata: {}
      }
    ];
  }

  async getRoleAssignmentsByRole(organizationId: string, roleId: string): Promise<RoleAssignment[]> {
    // In a real implementation, this would query the role_assignments table
    return [];
  }

  // Granular Permission Management
  async grantGranularPermission(organizationId: string, userId: string, resource: string, action: string, grantedBy: string, conditions?: Record<string, any>, expiresAt?: Date, reason?: string): Promise<GranularPermission> {
    const permission: GranularPermission = {
      id: `granular_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      organizationId,
      resource,
      action,
      conditions,
      granted: true,
      grantedBy,
      grantedAt: new Date(),
      expiresAt,
      reason
    };

    // In a real implementation, this would be stored in a granular_permissions table
    logger.info(`Granted granular permission: ${resource}:${action} to user ${userId}`);

    logAudit({
      organizationId,
      action: AuditActions.PERMISSION_GRANTED,
      resource: 'granular_permission',
      resourceId: permission.id,
      metadata: { userId, resource, action, grantedBy, conditions, expiresAt, reason },
      status: 'success',
    });

    return permission;
  }

  async revokeGranularPermission(organizationId: string, userId: string, resource: string, action: string): Promise<boolean> {
    // In a real implementation, this would update/delete from granular_permissions table
    logger.info(`Revoked granular permission: ${resource}:${action} from user ${userId}`);

    logAudit({
      organizationId,
      action: AuditActions.PERMISSION_REVOKED,
      resource: 'granular_permission',
      resourceId: `${userId}_${resource}_${action}`,
      metadata: { userId, resource, action },
      status: 'success',
    });

    return true;
  }

  async getUserGranularPermissions(userId: string, organizationId: string): Promise<GranularPermission[]> {
    // In a real implementation, this would query the granular_permissions table
    return [
      {
        id: 'granular_1',
        userId,
        organizationId,
        resource: 'campaign',
        action: 'delete',
        conditions: { department: 'marketing' },
        granted: true,
        grantedBy: 'admin_user',
        grantedAt: new Date(),
        reason: 'Temporary project lead access'
      }
    ];
  }

  // Permission Templates
  async createPermissionTemplate(template: Omit<PermissionTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<PermissionTemplate> {
    const newTemplate: PermissionTemplate = {
      ...template,
      id: `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // In a real implementation, this would be stored in a permission_templates table
    logger.info(`Created permission template: ${newTemplate.name}`);

    return newTemplate;
  }

  async getPermissionTemplates(): Promise<PermissionTemplate[]> {
    // In a real implementation, this would query the permission_templates table
    return [
      {
        id: 'template_1',
        name: 'Marketing Basic',
        description: 'Basic marketing permissions',
        permissions: [
          Permission.MARKETING_CAMPAIGNS_READ,
          Permission.ANALYTICS_READ
        ],
        category: 'basic',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'template_2',
        name: 'Marketing Advanced',
        description: 'Advanced marketing permissions',
        permissions: [
          Permission.MARKETING_CAMPAIGNS_READ,
          Permission.MARKETING_CAMPAIGNS_CREATE,
          Permission.MARKETING_CAMPAIGNS_UPDATE,
          Permission.ANALYTICS_READ,
          Permission.ANALYTICS_EXPORT
        ],
        category: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  // Advanced Permission Checking
  async checkUserPermission(userId: string, organizationId: string, permission: Permission, resourceId?: string): Promise<{
    hasPermission: boolean;
    source: 'role' | 'granular' | 'inherited' | 'denied';
    details?: string;
  }> {
    // Get user's base role
    const [user] = await pgDb
      .select()
      .from(users)
      .where(and(
        eq(users.id, userId),
        eq(users.organizationId, organizationId)
      ))
      .limit(1);

    if (!user) {
      return { hasPermission: false, source: 'denied', details: 'User not found' };
    }

    // Check base role permissions
    const baseRole = user.role as Role;
    if (hasPermission(baseRole, permission)) {
      return { hasPermission: true, source: 'role', details: `Base role: ${baseRole}` };
    }

    // Check custom role assignments
    const userRoles = await this.getUserRoles(userId, organizationId);
    for (const roleAssignment of userRoles) {
      if (!roleAssignment.isActive) continue;
      
      // Check if assignment has expired
      if (roleAssignment.expiresAt && roleAssignment.expiresAt < new Date()) continue;

      const customRole = await this.getCustomRoleById(roleAssignment.roleId, organizationId);
      if (customRole && customRole.isActive && customRole.permissions.includes(permission)) {
        return { hasPermission: true, source: 'role', details: `Custom role: ${customRole.name}` };
      }

      // Check inherited permissions
      const inheritedPermissions = await this.getInheritedPermissions(roleAssignment.roleId, organizationId);
      if (inheritedPermissions.includes(permission)) {
        return { hasPermission: true, source: 'inherited', details: `Inherited from role hierarchy` };
      }
    }

    // Check granular permissions
    const granularPermissions = await this.getUserGranularPermissions(userId, organizationId);
    for (const granularPerm of granularPermissions) {
      if (!granularPerm.granted) continue;
      
      // Check if permission has expired
      if (granularPerm.expiresAt && granularPerm.expiresAt < new Date()) continue;

      // Check if permission matches (resource:action format)
      const permissionString = `${granularPerm.resource}:${granularPerm.action}`;
      if (permission === permissionString as Permission) {
        return { hasPermission: true, source: 'granular', details: `Granular permission: ${granularPerm.reason || 'Special access'}` };
      }
    }

    return { hasPermission: false, source: 'denied', details: 'No matching permissions found' };
  }

  async getUserPermissionSummary(userId: string, organizationId: string): Promise<{
    userId: string;
    organizationId: string;
    baseRole: Role;
    customRoles: {
      id: string;
      name: string;
      permissions: Permission[];
      inheritedPermissions: Permission[];
    }[];
    granularPermissions: GranularPermission[];
    effectivePermissions: Permission[];
    permissionCount: number;
    lastUpdated: Date;
  }> {
    // Get user base role
    const [user] = await pgDb
      .select()
      .from(users)
      .where(and(
        eq(users.id, userId),
        eq(users.organizationId, organizationId)
      ))
      .limit(1);

    const baseRole = user?.role as Role || Role.USER;

    // Get custom roles with inherited permissions
    const userRoles = await this.getUserRoles(userId, organizationId);
    const customRoles = await Promise.all(
      userRoles.map(async (roleAssignment) => {
        const customRole = await this.getCustomRoleById(roleAssignment.roleId, organizationId);
        const inheritedPermissions = customRole ? await this.getInheritedPermissions(roleAssignment.roleId, organizationId) : [];
        
        return {
          id: roleAssignment.roleId,
          name: customRole?.name || 'Unknown Role',
          permissions: customRole?.permissions || [],
          inheritedPermissions
        };
      })
    );

    // Get granular permissions
    const granularPermissions = await this.getUserGranularPermissions(userId, organizationId);

    // Calculate effective permissions
    const effectivePermissions = new Set<Permission>();
    
    // Add base role permissions
    effectivePermissions.push(...Object.values(Permission).filter(p => hasPermission(baseRole, p)));
    
    // Add custom role permissions
    customRoles.forEach(role => {
      effectivePermissions.push(...role.permissions);
      effectivePermissions.push(...role.inheritedPermissions);
    });
    
    // Add granular permissions
    granularPermissions.forEach(granular => {
      if (granular.granted) {
        const permissionString = `${granular.resource}:${granular.action}` as Permission;
        effectivePermissions.add(permissionString);
      }
    });

    return {
      userId,
      organizationId,
      baseRole,
      customRoles,
      granularPermissions,
      effectivePermissions: Array.from(effectivePermissions),
      permissionCount: effectivePermissions.size,
      lastUpdated: new Date()
    };
  }

  // Helper methods
  private async calculateHierarchyLevel(organizationId: string, roleId: string): Promise<number> {
    const hierarchy = await this.getRoleHierarchy(organizationId);
    const level = this.calculateNodeLevel(roleId, hierarchy, 0);
    return level;
  }

  private calculateNodeLevel(roleId: string, hierarchy: RoleHierarchy[], currentLevel: number): number {
    const children = hierarchy.filter(h => h.parentRoleId === roleId);
    if (children.length === 0) return currentLevel;
    
    return Math.max(...children.map(child => 
      this.calculateNodeLevel(child.childRoleId, hierarchy, currentLevel + 1)
    ));
  }

  private findParentRoles(roleId: string, hierarchy: RoleHierarchy[]): string[] {
    const parentRoles: string[] = [];
    const directParents = hierarchy.filter(h => h.childRoleId === roleId);
    
    for (const parent of directParents) {
      parentRoles.push(parent.parentRoleId);
      parentRoles.push(...this.findParentRoles(parent.parentRoleId, hierarchy));
    }
    
    return parentRoles;
  }

  private async getCustomRoleById(roleId: string, organizationId: string): Promise<CustomRole | null> {
    const customRoles = await this.getCustomRoles(organizationId);
    return customRoles.find(role => role.id === roleId) || null;
  }
}

export const advancedRoleManagementService = new AdvancedRoleManagementService();
