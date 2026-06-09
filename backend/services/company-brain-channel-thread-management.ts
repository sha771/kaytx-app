/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

/**
 * Company Brain Channel and Thread Management Service
 * Manages chat channels, threads, and organizational structure
 * Includes channel permissions, thread resolution, and linking to knowledge resources
 */

export interface ChannelPermission {
  channelId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member' | 'guest';
  permissions: string[];
}

export interface ChannelSettings {
  allowGuests: boolean;
  requireApproval: boolean;
  messageRetentionDays: number;
  allowFileUploads: boolean;
  allowThreads: boolean;
  allowReactions: boolean;
  allowMentions: boolean;
}

export interface ThreadResolution {
  threadId: string;
  resolvedBy: string;
  resolvedAt: Date;
  resolution: string;
  tags: string[];
}

export class CompanyBrainChannelThreadManagementService {
  private channelPermissions: Map<string, ChannelPermission> = new Map();
  private channelSettings: Map<string, ChannelSettings> = new Map();
  private threadResolutions: Map<string, ThreadResolution> = new Map();

  /**
   * Create channel with default settings
   */
  async createChannelWithSettings(
    organizationId: string,
    name: string,
    type: 'public' | 'private' | 'group',
    createdBy: string,
    settings?: Partial<ChannelSettings>
  ): Promise<void> {
    const defaultSettings: ChannelSettings = {
      allowGuests: type === 'public',
      requireApproval: type === 'private',
      messageRetentionDays: 90,
      allowFileUploads: true,
      allowThreads: true,
      allowReactions: true,
      allowMentions: true,
      ...settings,
    };

    // In production, save channel settings to database
    console.log('Creating channel with settings:', name, defaultSettings);
  }

  /**
   * Update channel settings
   */
  async updateChannelSettings(channelId: string, settings: Partial<ChannelSettings>): Promise<void> {
    const existing = this.channelSettings.get(channelId) || {
      allowGuests: false,
      requireApproval: false,
      messageRetentionDays: 90,
      allowFileUploads: true,
      allowThreads: true,
      allowReactions: true,
      allowMentions: true,
    };

    const updated = { ...existing, ...settings };
    this.channelSettings.set(channelId, updated);
    
    // In production, save to database
    console.log('Updating channel settings:', channelId, updated);
  }

  /**
   * Get channel settings
   */
  async getChannelSettings(channelId: string): Promise<ChannelSettings | null> {
    return this.channelSettings.get(channelId) || null;
  }

  /**
   * Set user channel permission
   */
  async setChannelPermission(
    channelId: string,
    userId: string,
    role: ChannelPermission['role'],
    permissions: string[]
  ): Promise<void> {
    const permission: ChannelPermission = {
      channelId,
      userId,
      role,
      permissions,
    };

    this.channelPermissions.set(`${channelId}:${userId}`, permission);
    
    // In production, save to database
    console.log('Setting channel permission:', channelId, userId, role);
  }

  /**
   * Get user channel permission
   */
  async getChannelPermission(channelId: string, userId: string): Promise<ChannelPermission | null> {
    return this.channelPermissions.get(`${channelId}:${userId}`) || null;
  }

  /**
   * Check if user has permission
   */
  async hasPermission(channelId: string, userId: string, permission: string): Promise<boolean> {
    const perm = await this.getChannelPermission(channelId, userId);
    if (!perm) return false;

    // Owners and admins have all permissions
    if (perm.role === 'owner' || perm.role === 'admin') return true;

    return perm.permissions.includes(permission);
  }

  /**
   * Add user to channel
   */
  async addUserToChannel(channelId: string, userId: string, role: ChannelPermission['role'] = 'member'): Promise<void> {
    const permissions = this.getDefaultPermissions(role);
    await this.setChannelPermission(channelId, userId, role, permissions);
  }

  /**
   * Remove user from channel
   */
  async removeUserFromChannel(channelId: string, userId: string): Promise<void> {
    this.channelPermissions.delete(`${channelId}:${userId}`);
    // In production, delete from database
  }

  /**
   * Get channel members
   */
  async getChannelMembers(channelId: string): Promise<Array<{ userId: string; role: string }>> {
    const members: Array<{ userId: string; role: string }> = [];

    for (const [key, perm] of this.channelPermissions.entries()) {
      if (perm.channelId === channelId) {
        members.push({ userId: perm.userId, role: perm.role });
      }
    }

    return members;
  }

  /**
   * Promote user to admin
   */
  async promoteToAdmin(channelId: string, userId: string): Promise<void> {
    await this.setChannelPermission(channelId, userId, 'admin', this.getDefaultPermissions('admin'));
  }

  /**
   * Demote user to member
   */
  async demoteToMember(channelId: string, userId: string): Promise<void> {
    await this.setChannelPermission(channelId, userId, 'member', this.getDefaultPermissions('member'));
  }

  /**
   * Get default permissions for role
   */
  private getDefaultPermissions(role: ChannelPermission['role']): string[] {
    switch (role) {
      case 'owner':
        return ['*'];
      case 'admin':
        return ['read', 'write', 'delete', 'manage_members', 'manage_settings', 'pin_messages'];
      case 'member':
        return ['read', 'write', 'react', 'mention'];
      case 'guest':
        return ['read'];
      default:
        return [];
    }
  }

  /**
   * Resolve thread
   */
  async resolveThread(
    threadId: string,
    resolvedBy: string,
    resolution: string,
    tags: string[] = []
  ): Promise<void> {
    const threadResolution: ThreadResolution = {
      threadId,
      resolvedBy,
      resolvedAt: new Date(),
      resolution,
      tags,
    };

    this.threadResolutions.set(threadId, threadResolution);
    
    // In production, save to database and update thread status
    console.log('Resolving thread:', threadId, resolution);
  }

  /**
   * Get thread resolution
   */
  async getThreadResolution(threadId: string): Promise<ThreadResolution | null> {
    return this.threadResolutions.get(threadId) || null;
  }

  /**
   * Reopen thread
   */
  async reopenThread(threadId: string): Promise<void> {
    this.threadResolutions.delete(threadId);
    // In production, update thread status in database
    console.log('Reopening thread:', threadId);
  }

  /**
   * Link channel to project
   */
  async linkChannelToProject(channelId: string, projectId: string): Promise<void> {
    // In production, update channel in database
    console.log('Linking channel to project:', channelId, projectId);
  }

  /**
   * Link channel to SOP
   */
  async linkChannelToSOP(channelId: string, sopId: string): Promise<void> {
    // In production, update channel in database
    console.log('Linking channel to SOP:', channelId, sopId);
  }

  /**
   * Unlink channel from project
   */
  async unlinkChannelFromProject(channelId: string): Promise<void> {
    // In production, update channel in database
    console.log('Unlinking channel from project:', channelId);
  }

  /**
   * Unlink channel from SOP
   */
  async unlinkChannelFromSOP(channelId: string): Promise<void> {
    // In production, update channel in database
    console.log('Unlinking channel from SOP:', channelId);
  }

  /**
   * Get channel statistics
   */
  async getChannelStatistics(channelId: string): Promise<{
    totalMembers: number;
    totalMessages: number;
    totalThreads: number;
    resolvedThreads: number;
    activeMembers: number;
  }> {
    const members = await this.getChannelMembers(channelId);
    const totalMembers = members.length;
    
    // In production, query database for actual statistics
    return {
      totalMembers,
      totalMessages: 0,
      totalThreads: 0,
      resolvedThreads: this.threadResolutions.size,
      activeMembers: 0,
    };
  }

  /**
   * Archive channel
   */
  async archiveChannel(channelId: string): Promise<void> {
    // In production, update channel status in database
    console.log('Archiving channel:', channelId);
  }

  /**
   * Unarchive channel
   */
  async unarchiveChannel(channelId: string): Promise<void> {
    // In production, update channel status in database
    console.log('Unarchiving channel:', channelId);
  }

  /**
   * Delete channel
   */
  async deleteChannel(channelId: string): Promise<void> {
    // Remove all permissions
    for (const [key, perm] of this.channelPermissions.entries()) {
      if (perm.channelId === channelId) {
        this.channelPermissions.delete(key);
      }
    }

    // Remove settings
    this.channelSettings.delete(channelId);

    // In production, delete from database
    console.log('Deleting channel:', channelId);
  }

  /**
   * Bulk add members to channel
   */
  async bulkAddMembers(channelId: string, userIds: string[], role: ChannelPermission['role'] = 'member'): Promise<void> {
    for (const userId of userIds) {
      await this.addUserToChannel(channelId, userId, role);
    }
  }

  /**
   * Bulk remove members from channel
   */
  async bulkRemoveMembers(channelId: string, userIds: string[]): Promise<void> {
    for (const userId of userIds) {
      await this.removeUserFromChannel(channelId, userId);
    }
  }

  /**
   * Get channels for user
   */
  async getUserChannels(organizationId: string, userId: string): Promise<string[]> {
    const channelIds: string[] = [];

    for (const [key, perm] of this.channelPermissions.entries()) {
      if (perm.userId === userId) {
        channelIds.push(perm.channelId);
      }
    }

    return channelIds;
  }

  /**
   * Search threads by tag
   */
  async searchThreadsByTag(organizationId: string, tag: string): Promise<string[]> {
    const threadIds: string[] = [];

    for (const [threadId, resolution] of this.threadResolutions.entries()) {
      if (resolution.tags.includes(tag)) {
        threadIds.push(threadId);
      }
    }

    return threadIds;
  }

  /**
   * Get popular tags
   */
  async getPopularTags(organizationId: string, limit: number = 10): Promise<Array<{ tag: string; count: number }>> {
    const tagCounts = new Map<string, number>();

    for (const resolution of this.threadResolutions.values()) {
      for (const tag of resolution.tags) {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      }
    }

    const sorted = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([tag, count]) => ({ tag, count }));

    return sorted;
  }
}

// Export singleton instance
export const companyBrainChannelThreadManagementService = new CompanyBrainChannelThreadManagementService();
