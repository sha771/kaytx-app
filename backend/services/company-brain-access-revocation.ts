/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

/**
 * Company Brain Access Revocation Service
 * Instant access separation while preserving all data for searchability
 * Enables knowledge continuity during employee departures
 */

export interface AccessRevocation {
  id: string;
  organizationId: string;
  userId: string;
  userName: string;
  userEmail: string;
  revocationDate: Date;
  revokedBy: string;
  reason?: string;
  dataPreserved: {
    chatLogs: number;
    emails: number;
    documents: number;
    meetingTranscriptions: number;
    projectContributions: number;
    expertiseProfile: boolean;
    decisions: number;
  };
  accessTypes: Array<{
    type: string;
    system: string;
    status: 'revoked' | 'preserved' | 'transferred';
  }>;
  systemsAffected: Array<{
    system: string;
    accessRevoked: boolean;
    dataPreserved: boolean;
    notes?: string;
  }>;
  ownershipTransfers: Array<{
    resourceType: string;
    resourceId: string;
    resourceName: string;
    transferredTo: string;
    transferDate: Date;
    status: 'pending' | 'completed' | 'failed';
  }>;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface AccessRevocationConfig {
  organizationId: string;
  autoRevoke: boolean;
  preserveAllData: boolean;
  notifyStakeholders: boolean;
  requireApproval: boolean;
  defaultTransferTo?: string;
  systems: Array<{
    name: string;
    type: string;
    autoRevoke: boolean;
    preserveData: boolean;
    transferOwnership: boolean;
  }>;
}

export class CompanyBrainAccessRevocationService {
  private configs: Map<string, AccessRevocationConfig> = new Map();

  /**
   * Configure access revocation for an organization
   */
  configureRevocation(config: AccessRevocationConfig): void {
    this.configs.set(config.organizationId, config);
  }

  /**
   * Get configuration for an organization
   */
  getConfig(organizationId: string): AccessRevocationConfig | undefined {
    return this.configs.get(organizationId);
  }

  /**
   * Initiate access revocation for a user
   */
  async initiateRevocation(
    organizationId: string,
    userId: string,
    userName: string,
    userEmail: string,
    revokedBy: string,
    reason?: string
  ): Promise<AccessRevocation> {
    const config = this.configs.get(organizationId);
    
    const revocation: AccessRevocation = {
      id: crypto.randomUUID(),
      organizationId,
      userId,
      userName,
      userEmail,
      revocationDate: new Date(),
      revokedBy,
      reason,
      dataPreserved: {
        chatLogs: 0,
        emails: 0,
        documents: 0,
        meetingTranscriptions: 0,
        projectContributions: 0,
        expertiseProfile: false,
        decisions: 0,
      },
      accessTypes: [],
      systemsAffected: [],
      ownershipTransfers: [],
      status: 'pending',
      metadata: {},
      createdAt: new Date(),
    };

    // Save initial revocation record
    await this.saveRevocation(revocation);

    // Execute revocation process
    if (config?.autoRevoke) {
      await this.executeRevocation(revocation, config);
    }

    return revocation;
  }

  /**
   * Execute access revocation
   */
  private async executeRevocation(
    revocation: AccessRevocation,
    config: AccessRevocationConfig
  ): Promise<void> {
    revocation.status = 'in-progress';
    await this.updateRevocation(revocation);

    // Revoke access for each system
    for (const system of config.systems) {
      if (system.autoRevoke) {
        await this.revokeSystemAccess(revocation, system);
      }
    }

    // Preserve data
    if (config.preserveAllData) {
      await this.preserveUserData(revocation);
    }

    // Transfer ownership if configured
    if (config.defaultTransferTo) {
      await this.initiateOwnershipTransfer(revocation, config.defaultTransferTo);
    }

    // Notify stakeholders
    if (config.notifyStakeholders) {
      await this.notifyStakeholders(revocation);
    }

    revocation.status = 'completed';
    await this.updateRevocation(revocation);
  }

  /**
   * Revoke access for a specific system
   */
  private async revokeSystemAccess(
    revocation: AccessRevocation,
    system: AccessRevocationConfig['systems'][0]
  ): Promise<void> {
    try {
      // In production, call system-specific API to revoke access
      console.log(`Revoking ${system.name} access for user ${revocation.userId}`);

      revocation.accessTypes.push({
        type: system.type,
        system: system.name,
        status: 'revoked',
      });

      revocation.systemsAffected.push({
        system: system.name,
        accessRevoked: true,
        dataPreserved: system.preserveData,
      });
    } catch (error) {
      console.error(`Error revoking ${system.name} access:`, error);
      
      revocation.systemsAffected.push({
        system: system.name,
        accessRevoked: false,
        dataPreserved: system.preserveData,
        notes: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Preserve user data
   */
  private async preserveUserData(revocation: AccessRevocation): Promise<void> {
    // Count preserved data
    revocation.dataPreserved = {
      chatLogs: await this.countChatLogs(revocation.organizationId, revocation.userId),
      emails: await this.countEmails(revocation.organizationId, revocation.userId),
      documents: await this.countDocuments(revocation.organizationId, revocation.userId),
      meetingTranscriptions: await this.countMeetingTranscriptions(revocation.organizationId, revocation.userId),
      projectContributions: await this.countProjectContributions(revocation.organizationId, revocation.userId),
      expertiseProfile: await this.hasExpertiseProfile(revocation.organizationId, revocation.userId),
      decisions: await this.countDecisions(revocation.organizationId, revocation.userId),
    };

    // Mark all data as preserved but not deleted
    // In production, update database flags
    console.log(`Preserving data for user ${revocation.userId}:`, revocation.dataPreserved);
  }

  /**
   * Initiate ownership transfer
   */
  private async initiateOwnershipTransfer(
    revocation: AccessRevocation,
    transferTo: string
  ): Promise<void> {
    // In production, identify resources owned by user and initiate transfers
    console.log(`Initiating ownership transfer from ${revocation.userId} to ${transferTo}`);
  }

  /**
   * Notify stakeholders
   */
  private async notifyStakeholders(revocation: AccessRevocation): Promise<void> {
    // In production, send notifications to relevant stakeholders
    console.log(`Notifying stakeholders about revocation ${revocation.id}`);
  }

  /**
   * Count chat logs for user
   */
  private async countChatLogs(organizationId: string, userId: string): Promise<number> {
    // In production, query database
    return 0;
  }

  /**
   * Count emails for user
   */
  private async countEmails(organizationId: string, userId: string): Promise<number> {
    // In production, query database
    return 0;
  }

  /**
   * Count documents for user
   */
  private async countDocuments(organizationId: string, userId: string): Promise<number> {
    // In production, query database
    return 0;
  }

  /**
   * Count meeting transcriptions for user
   */
  private async countMeetingTranscriptions(organizationId: string, userId: string): Promise<number> {
    // In production, query database
    return 0;
  }

  /**
   * Count project contributions for user
   */
  private async countProjectContributions(organizationId: string, userId: string): Promise<number> {
    // In production, query database
    return 0;
  }

  /**
   * Check if user has expertise profile
   */
  private async hasExpertiseProfile(organizationId: string, userId: string): Promise<boolean> {
    // In production, query database
    return false;
  }

  /**
   * Count decisions for user
   */
  private async countDecisions(organizationId: string, userId: string): Promise<number> {
    // In production, query database
    return 0;
  }

  /**
   * Save revocation to database
   */
  private async saveRevocation(revocation: AccessRevocation): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving access revocation:', revocation.id);
  }

  /**
   * Update revocation in database
   */
  private async updateRevocation(revocation: AccessRevocation): Promise<void> {
    // In production, update in database
    console.log('Updating access revocation:', revocation.id);
  }

  /**
   * Get revocation by ID
   */
  async getRevocation(revocationId: string): Promise<AccessRevocation | null> {
    // In production, query database
    return null;
  }

  /**
   * Get revocations for organization
   */
  async getOrganizationRevocations(organizationId: string): Promise<AccessRevocation[]> {
    // In production, query database
    return [];
  }

  /**
   * Get revocation status for user
   */
  async getUserRevocationStatus(organizationId: string, userId: string): Promise<AccessRevocation | null> {
    // In production, query database
    return null;
  }

  /**
   * Search preserved data
   */
  async searchPreservedData(
    organizationId: string,
    userId: string,
    query: string
  ): Promise<{
    chatLogs: any[];
    emails: any[];
    documents: any[];
    meetings: any[];
    decisions: any[];
  }> {
    // In production, search across preserved data
    console.log(`Searching preserved data for user ${userId}: ${query}`);
    
    return {
      chatLogs: [],
      emails: [],
      documents: [],
      meetings: [],
      decisions: [],
    };
  }

  /**
   * Get revocation statistics
   */
  async getRevocationStatistics(organizationId: string): Promise<{
    totalRevocations: number;
    revocationsByMonth: Record<string, number>;
    dataPreserved: {
      totalChatLogs: number;
      totalEmails: number;
      totalDocuments: number;
      totalMeetings: number;
    };
    avgRevocationTime: number;
  }> {
    // In production, query database
    return {
      totalRevocations: 0,
      revocationsByMonth: {},
      dataPreserved: {
        totalChatLogs: 0,
        totalEmails: 0,
        totalDocuments: 0,
        totalMeetings: 0,
      },
      avgRevocationTime: 0,
    };
  }

  /**
   * Restore user access (emergency)
   */
  async restoreAccess(revocationId: string, restoredBy: string, reason: string): Promise<void> {
    const revocation = await this.getRevocation(revocationId);
    if (!revocation) {
      throw new Error('Revocation not found');
    }

    // In production, restore access to systems
    console.log(`Restoring access for user ${revocation.userId} by ${restoredBy}`);
  }
}

// Export singleton instance
export const companyBrainAccessRevocationService = new CompanyBrainAccessRevocationService();
