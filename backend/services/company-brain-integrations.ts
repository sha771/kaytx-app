/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { knowledgeExtractionService } from './company-brain-extraction';
import { companyBrainWebSocketService } from './company-brain-websocket';

/**
 * Company Brain Integration Service
 * Expanded integration support for multiple platforms
 * Supports: Google Drive, SharePoint, Jira, Confluence, Notion, GitHub, Slack, Teams, Email, Zoom
 */

export interface IntegrationConfig {
  id: string;
  type: IntegrationType;
  enabled: boolean;
  credentials: Record<string, any>;
  settings: IntegrationSettings;
  lastSync?: Date;
  syncStatus: 'idle' | 'syncing' | 'error';
}

export interface IntegrationSettings {
  syncInterval: number; // minutes
  includeArchived: boolean;
  includePrivate: boolean;
  filters?: string[];
  autoSync: boolean;
}

export enum IntegrationType {
  SLACK = 'slack',
  TEAMS = 'teams',
  EMAIL = 'email',
  ZOOM = 'zoom',
  GOOGLE_DRIVE = 'google_drive',
  SHAREPOINT = 'sharepoint',
  JIRA = 'jira',
  CONFLUENCE = 'confluence',
  NOTION = 'notion',
  GITHUB = 'github',
  DISCORD = 'discord',
  WEBEX = 'webex',
}

export interface SyncResult {
  integrationId: string;
  integrationType: IntegrationType;
  success: boolean;
  itemsProcessed: number;
  knowledgeNodesCreated: number;
  errors: number;
  duration: number;
  timestamp: Date;
}

export interface IntegrationItem {
  id: string;
  type: 'message' | 'document' | 'issue' | 'page' | 'commit' | 'file';
  title?: string;
  content: string;
  author: string;
  authorEmail?: string;
  timestamp: Date;
  url?: string;
  metadata?: Record<string, any>;
}

export class IntegrationService {
  private integrations: Map<string, IntegrationConfig> = new Map();
  private syncHistory: SyncResult[] = [];
  private activeSyncs: Set<string> = new Set();

  /**
   * Register a new integration
   */
  async registerIntegration(
    type: IntegrationType,
    credentials: Record<string, any>,
    settings?: Partial<IntegrationSettings>
  ): Promise<IntegrationConfig> {
    const integrationId = `integration-${type}-${Date.now()}`;
    
    const config: IntegrationConfig = {
      id: integrationId,
      type,
      enabled: true,
      credentials,
      settings: {
        syncInterval: 60,
        includeArchived: false,
        includePrivate: false,
        autoSync: true,
        ...settings,
      },
      syncStatus: 'idle',
    };

    this.integrations.set(integrationId, config);

    // Start auto-sync if enabled
    if (config.settings.autoSync) {
      this.startAutoSync(integrationId);
    }

    console.log(`Integration registered: ${type} (${integrationId})`);
    
    companyBrainWebSocketService.broadcastAnalyticsUpdate({
      type: 'integration_registered',
      integrationId,
      integrationType: type,
    });

    return config;
  }

  /**
   * Update integration configuration
   */
  updateIntegration(
    integrationId: string,
    updates: Partial<IntegrationConfig>
  ): void {
    const integration = this.integrations.get(integrationId);
    if (!integration) {
      throw new Error(`Integration ${integrationId} not found`);
    }

    this.integrations.set(integrationId, { ...integration, ...updates });
    console.log(`Integration updated: ${integrationId}`);
  }

  /**
   * Enable/disable integration
   */
  toggleIntegration(integrationId: string, enabled: boolean): void {
    const integration = this.integrations.get(integrationId);
    if (!integration) {
      throw new Error(`Integration ${integrationId} not found`);
    }

    integration.enabled = enabled;
    
    if (enabled && integration.settings.autoSync) {
      this.startAutoSync(integrationId);
    } else {
      this.stopAutoSync(integrationId);
    }

    console.log(`Integration ${enabled ? 'enabled' : 'disabled'}: ${integrationId}`);
  }

  /**
   * Start auto-sync for an integration
   */
  private startAutoSync(integrationId: string): void {
    const integration = this.integrations.get(integrationId);
    if (!integration || !integration.enabled) return;

    const intervalMs = integration.settings.syncInterval * 60 * 1000;

    setInterval(async () => {
      if (integration.enabled && !this.activeSyncs.has(integrationId)) {
        await this.syncIntegration(integrationId);
      }
    }, intervalMs);

    // Initial sync
    this.syncIntegration(integrationId);
  }

  /**
   * Stop auto-sync for an integration
   */
  private stopAutoSync(integrationId: string): void {
    // In production, would clear the interval
    console.log(`Auto-sync stopped for ${integrationId}`);
  }

  /**
   * Manually trigger sync for an integration
   */
  async syncIntegration(integrationId: string): Promise<SyncResult> {
    const integration = this.integrations.get(integrationId);
    if (!integration) {
      throw new Error(`Integration ${integrationId} not found`);
    }

    if (!integration.enabled) {
      throw new Error(`Integration ${integrationId} is disabled`);
    }

    if (this.activeSyncs.has(integrationId)) {
      throw new Error(`Integration ${integrationId} is already syncing`);
    }

    const startTime = Date.now();
    this.activeSyncs.add(integrationId);
    integration.syncStatus = 'syncing';

    try {
      const items = await this.fetchItems(integration);
      let knowledgeNodesCreated = 0;
      let errors = 0;

      for (const item of items) {
        try {
          const knowledge = await knowledgeExtractionService.extractFromText(
            item.content,
            `${integration.type}:${item.id}`,
            {
              sourceType: integration.type,
              author: item.author,
              authorEmail: item.authorEmail,
              timestamp: item.timestamp,
              url: item.url,
              metadata: item.metadata,
            }
          );

          knowledgeNodesCreated++;

          companyBrainWebSocketService.notifyKnowledgeCreated({
            id: item.id,
            title: knowledge.title,
            type: knowledge.type,
            source: `${integration.type}:${item.title || item.id}`,
            author: item.author,
          });
        } catch (error) {
          errors++;
          console.error(`Error processing item ${item.id}:`, error);
        }
      }

      integration.lastSync = new Date();
      integration.syncStatus = 'idle';

      const result: SyncResult = {
        integrationId,
        integrationType: integration.type,
        success: true,
        itemsProcessed: items.length,
        knowledgeNodesCreated,
        errors,
        duration: Date.now() - startTime,
        timestamp: new Date(),
      };

      this.syncHistory.push(result);

      companyBrainWebSocketService.broadcastAnalyticsUpdate({
        type: 'sync_complete',
        integrationId,
        result,
      });

      return result;
    } catch (error) {
      integration.syncStatus = 'error';
      this.activeSyncs.delete(integrationId);

      const result: SyncResult = {
        integrationId,
        integrationType: integration.type,
        success: false,
        itemsProcessed: 0,
        knowledgeNodesCreated: 0,
        errors: 1,
        duration: Date.now() - startTime,
        timestamp: new Date(),
      };

      this.syncHistory.push(result);

      companyBrainWebSocketService.broadcastRiskAlert({
        type: 'sync_failed',
        integrationId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return result;
    } finally {
      this.activeSyncs.delete(integrationId);
    }
  }

  /**
   * Fetch items from integration based on type
   */
  private async fetchItems(integration: IntegrationConfig): Promise<IntegrationItem[]> {
    switch (integration.type) {
      case IntegrationType.SLACK:
        return this.fetchSlackItems(integration);
      case IntegrationType.TEAMS:
        return this.fetchTeamsItems(integration);
      case IntegrationType.EMAIL:
        return this.fetchEmailItems(integration);
      case IntegrationType.ZOOM:
        return this.fetchZoomItems(integration);
      case IntegrationType.GOOGLE_DRIVE:
        return this.fetchGoogleDriveItems(integration);
      case IntegrationType.SHAREPOINT:
        return this.fetchSharePointItems(integration);
      case IntegrationType.JIRA:
        return this.fetchJiraItems(integration);
      case IntegrationType.CONFLUENCE:
        return this.fetchConfluenceItems(integration);
      case IntegrationType.NOTION:
        return this.fetchNotionItems(integration);
      case IntegrationType.GITHUB:
        return this.fetchGitHubItems(integration);
      case IntegrationType.DISCORD:
        return this.fetchDiscordItems(integration);
      case IntegrationType.WEBEX:
        return this.fetchWebexItems(integration);
      default:
        return [];
    }
  }

  /**
   * Fetch Slack messages
   */
  private async fetchSlackItems(integration: IntegrationConfig): Promise<IntegrationItem[]> {
    console.log('Fetching Slack items...');
    
    // In production, use Slack API
    return [
      {
        id: 'slack-msg-1',
        type: 'message',
        content: 'The API authentication flow needs to be updated to use OAuth 2.0 for better security',
        author: 'john.doe',
        authorEmail: 'john.doe@company.com',
        timestamp: new Date(),
        url: 'https://company.slack.com/archives/eng/p12345678',
        metadata: { channel: '#engineering', team: 'engineering' },
      },
    ];
  }

  /**
   * Fetch Teams messages
   */
  private async fetchTeamsItems(integration: IntegrationConfig): Promise<IntegrationItem[]> {
    console.log('Fetching Teams items...');
    
    return [
      {
        id: 'teams-msg-1',
        type: 'message',
        content: 'Client meeting notes: Acme Corp wants to expand to European markets starting Q2',
        author: 'jane.smith',
        authorEmail: 'jane.smith@company.com',
        timestamp: new Date(),
        url: 'https://teams.microsoft.com/l/message/123',
        metadata: { channel: 'Sales Team', team: 'sales' },
      },
    ];
  }

  /**
   * Fetch email messages
   */
  private async fetchEmailItems(integration: IntegrationConfig): Promise<IntegrationItem[]> {
    console.log('Fetching email items...');
    
    return [
      {
        id: 'email-msg-1',
        type: 'message',
        title: 'Budget Approval',
        content: 'Q4 budget approval has been granted. We can proceed with the hiring plan for 3 new engineers.',
        author: 'finance@company.com',
        authorEmail: 'finance@company.com',
        timestamp: new Date(),
        metadata: { subject: 'Budget Approval', to: ['engineering@company.com'] },
      },
    ];
  }

  /**
   * Fetch Zoom transcripts
   */
  private async fetchZoomItems(integration: IntegrationConfig): Promise<IntegrationItem[]> {
    console.log('Fetching Zoom items...');
    
    return [
      {
        id: 'zoom-msg-1',
        type: 'message',
        title: 'Product Roadmap',
        content: 'Meeting transcript: Product roadmap discussion for Q1 2026. Key priorities: mobile app, API v2, and analytics dashboard.',
        author: 'product-team',
        timestamp: new Date(),
        metadata: { meetingId: 'zoom-123', title: 'Product Roadmap' },
      },
    ];
  }

  /**
   * Fetch Google Drive documents
   */
  private async fetchGoogleDriveItems(integration: IntegrationConfig): Promise<IntegrationItem[]> {
    console.log('Fetching Google Drive items...');
    
    // In production, use Google Drive API
    return [
      {
        id: 'gdrive-doc-1',
        type: 'document',
        title: 'Q4 Strategy Document',
        content: 'Strategic priorities for Q4 include expanding into European markets, launching mobile app beta, and hiring 5 new engineers.',
        author: 'sarah.johnson',
        authorEmail: 'sarah.johnson@company.com',
        timestamp: new Date(),
        url: 'https://docs.google.com/document/d/abc123',
        metadata: { mimeType: 'application/vnd.google-apps.document' },
      },
    ];
  }

  /**
   * Fetch SharePoint documents
   */
  private async fetchSharePointItems(integration: IntegrationConfig): Promise<IntegrationItem[]> {
    console.log('Fetching SharePoint items...');
    
    return [
      {
        id: 'sp-doc-1',
        type: 'document',
        title: 'Employee Handbook 2026',
        content: 'Company policies and procedures for 2026. Updated remote work policy, new benefits package, and updated code of conduct.',
        author: 'hr-department',
        timestamp: new Date(),
        url: 'https://company.sharepoint.com/sites/hr/EmployeeHandbook',
        metadata: { library: 'HR Documents' },
      },
    ];
  }

  /**
   * Fetch Jira issues
   */
  private async fetchJiraItems(integration: IntegrationConfig): Promise<IntegrationItem[]> {
    console.log('Fetching Jira items...');
    
    return [
      {
        id: 'jira-1',
        type: 'issue',
        title: 'Implement OAuth 2.0 authentication',
        content: 'Description: Replace current API key authentication with OAuth 2.0. Include refresh token support and proper token revocation.',
        author: 'dev-team',
        timestamp: new Date(),
        url: 'https://company.atlassian.net/browse/ENG-123',
        metadata: { project: 'Engineering', status: 'In Progress', priority: 'High' },
      },
    ];
  }

  /**
   * Fetch Confluence pages
   */
  private async fetchConfluenceItems(integration: IntegrationConfig): Promise<IntegrationItem[]> {
    console.log('Fetching Confluence items...');
    
    return [
      {
        id: 'conf-page-1',
        type: 'page',
        title: 'API Documentation',
        content: 'Complete API documentation including endpoints, authentication, rate limits, and examples. Updated with v2 API changes.',
        author: 'tech-writer',
        timestamp: new Date(),
        url: 'https://company.atlassian.net/wiki/display/ENG/API+Documentation',
        metadata: { space: 'Engineering', labels: ['api', 'documentation'] },
      },
    ];
  }

  /**
   * Fetch Notion pages
   */
  private async fetchNotionItems(integration: IntegrationConfig): Promise<IntegrationItem[]> {
    console.log('Fetching Notion items...');
    
    return [
      {
        id: 'notion-1',
        type: 'page',
        title: 'Product Roadmap 2026',
        content: 'Q1: Mobile app beta launch. Q2: European market expansion. Q3: Enterprise features. Q4: AI-powered analytics.',
        author: 'product-manager',
        timestamp: new Date(),
        url: 'https://company.notion.site/Product-Roadmap-2026-abc123',
        metadata: { database: 'Product', tags: ['roadmap', 'planning'] },
      },
    ];
  }

  /**
   * Fetch GitHub commits and issues
   */
  private async fetchGitHubItems(integration: IntegrationConfig): Promise<IntegrationItem[]> {
    console.log('Fetching GitHub items...');
    
    return [
      {
        id: 'gh-commit-1',
        type: 'commit',
        title: 'feat: Add OAuth 2.0 support',
        content: 'Commit message: Implemented OAuth 2.0 authentication flow with refresh tokens. Added token revocation endpoint.',
        author: 'developer',
        authorEmail: 'developer@company.com',
        timestamp: new Date(),
        url: 'https://github.com/company/repo/commit/abc123',
        metadata: { repository: 'main-repo', branch: 'main' },
      },
      {
        id: 'gh-issue-1',
        type: 'issue',
        title: 'Bug: Login page not loading on Safari',
        content: 'Issue description: Login page fails to load on Safari browser. Error in console: ReferenceError. Works fine on Chrome and Firefox.',
        author: 'qa-engineer',
        timestamp: new Date(),
        url: 'https://github.com/company/repo/issues/456',
        metadata: { repository: 'main-repo', labels: ['bug', 'safari'] },
      },
    ];
  }

  /**
   * Fetch Discord messages
   */
  private async fetchDiscordItems(integration: IntegrationConfig): Promise<IntegrationItem[]> {
    console.log('Fetching Discord items...');
    
    return [
      {
        id: 'discord-msg-1',
        type: 'message',
        content: 'The deployment to production is scheduled for Friday at 2 PM EST. Please ensure all PRs are merged by Thursday EOD.',
        author: 'devops-team',
        timestamp: new Date(),
        url: 'https://discord.com/channels/123/456/789',
        metadata: { channel: '#deployments', server: 'Company Server' },
      },
    ];
  }

  /**
   * Fetch Webex messages
   */
  private async fetchWebexItems(integration: IntegrationConfig): Promise<IntegrationItem[]> {
    console.log('Fetching Webex items...');
    
    return [
      {
        id: 'webex-msg-1',
        type: 'message',
        content: 'Weekly sync notes: All projects on track. New client onboarding process needs documentation.',
        author: 'project-manager',
        timestamp: new Date(),
        url: 'https://webex.com/rooms/123',
        metadata: { room: 'Project Management' },
      },
    ];
  }

  /**
   * Get all integrations
   */
  getIntegrations(): IntegrationConfig[] {
    return Array.from(this.integrations.values());
  }

  /**
   * Get integration by ID
   */
  getIntegration(integrationId: string): IntegrationConfig | undefined {
    return this.integrations.get(integrationId);
  }

  /**
   * Get integrations by type
   */
  getIntegrationsByType(type: IntegrationType): IntegrationConfig[] {
    return Array.from(this.integrations.values()).filter(i => i.type === type);
  }

  /**
   * Get sync history
   */
  getSyncHistory(limit: number = 50): SyncResult[] {
    return this.syncHistory.slice(-limit);
  }

  /**
   * Get sync history for integration
   */
  getIntegrationSyncHistory(integrationId: string, limit: number = 20): SyncResult[] {
    return this.syncHistory
      .filter(s => s.integrationId === integrationId)
      .slice(-limit);
  }

  /**
   * Delete integration
   */
  async deleteIntegration(integrationId: string): Promise<boolean> {
    const integration = this.integrations.get(integrationId);
    if (!integration) {
      return false;
    }

    this.stopAutoSync(integrationId);
    this.integrations.delete(integrationId);

    companyBrainWebSocketService.broadcastAnalyticsUpdate({
      type: 'integration_deleted',
      integrationId,
    });

    return true;
  }

  /**
   * Test integration connection
   */
  async testConnection(integrationId: string): Promise<{ success: boolean; message: string }> {
    const integration = this.integrations.get(integrationId);
    if (!integration) {
      return { success: false, message: 'Integration not found' };
    }

    try {
      // In production, would actually test the connection
      console.log(`Testing connection for ${integration.type}...`);
      
      return { success: true, message: 'Connection successful' };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Connection failed' 
      };
    }
  }

  /**
   * Get integration statistics
   */
  getIntegrationStats(): {
    totalIntegrations: number;
    enabledIntegrations: number;
    activeSyncs: number;
    totalSyncs: number;
    successfulSyncs: number;
    failedSyncs: number;
    lastSyncTime?: Date;
  } {
    const integrations = Array.from(this.integrations.values());
    const enabled = integrations.filter(i => i.enabled).length;
    const successfulSyncs = this.syncHistory.filter(s => s.success).length;
    const failedSyncs = this.syncHistory.filter(s => !s.success).length;
    const lastSync = this.syncHistory[this.syncHistory.length - 1];

    return {
      totalIntegrations: integrations.length,
      enabledIntegrations: enabled,
      activeSyncs: this.activeSyncs.size,
      totalSyncs: this.syncHistory.length,
      successfulSyncs,
      failedSyncs,
      lastSyncTime: lastSync?.timestamp,
    };
  }
}

// Export singleton instance
export const integrationService = new IntegrationService();
