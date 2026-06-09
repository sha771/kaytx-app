/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { knowledgeExtractionService } from './company-brain-extraction';
import { companyBrainWebSocketService } from './company-brain-websocket';

/**
 * Company Brain Knowledge Ingestion Service
 * Automated capture and ingestion of knowledge from multiple conversation sources
 * Ensures no knowledge is lost when employees leave
 */

export interface IngestionConfig {
  companyId: string;
  enabled: boolean;
  sources: ConversationSource[];
  realtime: boolean;
  batchSize: number;
  intervalMinutes: number;
}

export interface ConversationSource {
  type: 'slack' | 'teams' | 'email' | 'zoom' | 'meet' | 'webex' | 'discord';
  enabled: boolean;
  config: any;
  lastSync?: Date;
  channels?: string[];
  filters?: string[];
}

export interface ConversationMessage {
  id: string;
  source: string;
  sourceType: string;
  text: string;
  author: string;
  authorEmail?: string;
  timestamp: Date;
  channel?: string;
  threadId?: string;
  metadata?: Record<string, any>;
}

export interface IngestionResult {
  success: boolean;
  messagesProcessed: number;
  knowledgeNodesCreated: number;
  errors: number;
  duration: number;
  source: string;
  timestamp: Date;
}

export interface EmployeeDepartureTrigger {
  employeeId: string;
  employeeName: string;
  departureDate: Date;
  knowledgeAtRisk: number;
  preservationStatus: 'pending' | 'in_progress' | 'complete';
}

export class CompanyBrainIngestionService {
  private ingestionConfigs: Map<string, IngestionConfig> = new Map();
  private activeIngestions: Map<string, boolean> = new Map();
  private ingestionHistory: IngestionResult[] = [];
  private departureTriggers: EmployeeDepartureTrigger[] = [];

  /**
   * Configure ingestion for a company/department
   */
  configureIngestion(config: IngestionConfig): void {
    this.ingestionConfigs.set(config.companyId, config);
    console.log(`Ingestion configured for company ${config.companyId}`);
  }

  /**
   * Start automated ingestion for a company
   */
  async startIngestion(companyId: string): Promise<void> {
    const config = this.ingestionConfigs.get(companyId);
    if (!config || !config.enabled) {
      throw new Error('Ingestion not configured or disabled');
    }

    if (this.activeIngestions.get(companyId)) {
      console.log(`Ingestion already active for company ${companyId}`);
      return;
    }

    this.activeIngestions.set(companyId, true);

    if (config.realtime) {
      await this.startRealtimeIngestion(companyId, config);
    } else {
      await this.startBatchIngestion(companyId, config);
    }
  }

  /**
   * Stop ingestion for a company
   */
  stopIngestion(companyId: string): void {
    this.activeIngestions.set(companyId, false);
    console.log(`Ingestion stopped for company ${companyId}`);
  }

  /**
   * Start real-time ingestion with webhooks
   */
  private async startRealtimeIngestion(companyId: string, config: IngestionConfig): Promise<void> {
    console.log(`Starting real-time ingestion for company ${companyId}`);

    for (const source of config.sources) {
      if (!source.enabled) continue;

      try {
        await this.setupRealtimeSource(companyId, source);
      } catch (error) {
        console.error(`Failed to setup realtime source ${source.type}:`, error);
      }
    }
  }

  /**
   * Setup real-time ingestion for a specific source
   */
  private async setupRealtimeSource(companyId: string, source: ConversationSource): Promise<void> {
    switch (source.type) {
      case 'slack':
        await this.setupSlackWebhook(companyId, source.config);
        break;
      case 'teams':
        await this.setupTeamsWebhook(companyId, source.config);
        break;
      case 'email':
        await this.setupEmailImap(companyId, source.config);
        break;
      case 'zoom':
        await this.setupZoomWebhook(companyId, source.config);
        break;
      default:
        console.log(`Real-time ingestion not implemented for ${source.type}`);
    }
  }

  /**
   * Setup Slack webhook for real-time message capture
   */
  private async setupSlackWebhook(companyId: string, config: any): Promise<void> {
    console.log(`Setting up Slack webhook for company ${companyId}`);
    
    const webhookUrl = `${process.env.API_URL || 'http://localhost:3000'}/api/company-brain/webhooks/slack/${companyId}`;
    console.log(`Slack webhook URL: ${webhookUrl}`);
    
    // In production, this would register with Slack API
    // For now, we simulate the webhook registration
  }

  /**
   * Setup Teams webhook for real-time message capture
   */
  private async setupTeamsWebhook(companyId: string, config: any): Promise<void> {
    console.log(`Setting up Teams webhook for company ${companyId}`);
    
    const webhookUrl = `${process.env.API_URL || 'http://localhost:3000'}/api/company-brain/webhooks/teams/${companyId}`;
    console.log(`Teams webhook URL: ${webhookUrl}`);
  }

  /**
   * Setup email IMAP monitoring
   */
  private async setupEmailImap(companyId: string, config: any): Promise<void> {
    console.log(`Setting up email IMAP monitoring for company ${companyId}`);
    
    // Poll every 5 minutes for new emails
    setInterval(async () => {
      if (this.activeIngestions.get(companyId)) {
        await this.pollEmailMessages(companyId, config);
      }
    }, 5 * 60 * 1000);
  }

  /**
   * Setup Zoom webhook for meeting recordings
   */
  private async setupZoomWebhook(companyId: string, config: any): Promise<void> {
    console.log(`Setting up Zoom webhook for company ${companyId}`);
    
    const webhookUrl = `${process.env.API_URL || 'http://localhost:3000'}/api/company-brain/webhooks/zoom/${companyId}`;
    console.log(`Zoom webhook URL: ${webhookUrl}`);
  }

  /**
   * Start batch ingestion (periodic polling)
   */
  private async startBatchIngestion(companyId: string, config: IngestionConfig): Promise<void> {
    console.log(`Starting batch ingestion for company ${companyId}`);

    const intervalMs = config.intervalMinutes * 60 * 1000;

    setInterval(async () => {
      if (this.activeIngestions.get(companyId)) {
        await this.runBatchIngestion(companyId, config);
      }
    }, intervalMs);

    // Run initial ingestion
    await this.runBatchIngestion(companyId, config);
  }

  /**
   * Run batch ingestion for all configured sources
   */
  private async runBatchIngestion(companyId: string, config: IngestionConfig): Promise<void> {
    console.log(`Running batch ingestion for company ${companyId}`);

    for (const source of config.sources) {
      if (!source.enabled) continue;

      try {
        const result = await this.ingestFromSource(companyId, source);
        this.ingestionHistory.push(result);
        
        // Notify via WebSocket
        companyBrainWebSocketService.broadcastAnalyticsUpdate({
          type: 'ingestion_complete',
          source: source.type,
          result,
        });
      } catch (error) {
        console.error(`Batch ingestion failed for ${source.type}:`, error);
      }
    }
  }

  /**
   * Ingest messages from a specific source
   */
  private async ingestFromSource(companyId: string, source: ConversationSource): Promise<IngestionResult> {
    const startTime = Date.now();
    let messagesProcessed = 0;
    let knowledgeNodesCreated = 0;
    let errors = 0;

    try {
      const messages = await this.fetchMessagesFromSource(source);
      messagesProcessed = messages.length;

      for (const message of messages) {
        try {
          // Extract knowledge from message
          const knowledge = await knowledgeExtractionService.extractFromText(
            message.text,
            `${source.type}:${message.id}`,
            {
              sourceType: source.type,
              author: message.author,
              authorEmail: message.authorEmail,
              timestamp: message.timestamp,
              channel: message.channel,
            }
          );

          // Create knowledge node (would be saved to database in production)
          knowledgeNodesCreated++;

          // Notify about new knowledge
          companyBrainWebSocketService.notifyKnowledgeCreated({
            id: message.id,
            title: knowledge.title,
            type: knowledge.type,
            source: message.source,
            author: message.author,
          });
        } catch (error) {
          errors++;
          console.error(`Failed to process message ${message.id}:`, error);
        }
      }

      // Update last sync time
      source.lastSync = new Date();

      return {
        success: true,
        messagesProcessed,
        knowledgeNodesCreated,
        errors,
        duration: Date.now() - startTime,
        source: source.type,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error(`Ingestion from ${source.type} failed:`, error);
      return {
        success: false,
        messagesProcessed,
        knowledgeNodesCreated,
        errors: messagesProcessed + 1,
        duration: Date.now() - startTime,
        source: source.type,
        timestamp: new Date(),
      };
    }
  }

  /**
   * Fetch messages from a source
   */
  private async fetchMessagesFromSource(source: ConversationSource): Promise<ConversationMessage[]> {
    switch (source.type) {
      case 'slack':
        return this.fetchSlackMessages(source.config);
      case 'teams':
        return this.fetchTeamsMessages(source.config);
      case 'email':
        return this.fetchEmailMessages(source.config);
      case 'zoom':
        return this.fetchZoomTranscripts(source.config);
      default:
        return [];
    }
  }

  /**
   * Fetch Slack messages
   */
  private async fetchSlackMessages(config: any): Promise<ConversationMessage[]> {
    console.log('Fetching Slack messages...');
    
    // In production, this would use the Slack API
    return [
      {
        id: 'slack-msg-1',
        source: 'slack',
        sourceType: 'slack',
        text: 'The API authentication flow needs to be updated to use OAuth 2.0 for better security',
        author: 'john.doe',
        authorEmail: 'john.doe@company.com',
        timestamp: new Date(),
        channel: '#engineering',
        metadata: { team: 'engineering' },
      },
    ];
  }

  /**
   * Fetch Teams messages
   */
  private async fetchTeamsMessages(config: any): Promise<ConversationMessage[]> {
    console.log('Fetching Teams messages...');
    
    return [
      {
        id: 'teams-msg-1',
        source: 'teams',
        sourceType: 'teams',
        text: 'Client meeting notes: Acme Corp wants to expand to European markets starting Q2',
        author: 'jane.smith',
        authorEmail: 'jane.smith@company.com',
        timestamp: new Date(),
        channel: 'Sales Team',
        metadata: { team: 'sales' },
      },
    ];
  }

  /**
   * Fetch email messages
   */
  private async fetchEmailMessages(config: any): Promise<ConversationMessage[]> {
    console.log('Fetching email messages...');
    
    return [
      {
        id: 'email-msg-1',
        source: 'email',
        sourceType: 'email',
        text: 'Q4 budget approval has been granted. We can proceed with the hiring plan for 3 new engineers.',
        author: 'finance@company.com',
        authorEmail: 'finance@company.com',
        timestamp: new Date(),
        metadata: { subject: 'Budget Approval' },
      },
    ];
  }

  /**
   * Fetch Zoom meeting transcripts
   */
  private async fetchZoomTranscripts(config: any): Promise<ConversationMessage[]> {
    console.log('Fetching Zoom transcripts...');
    
    return [
      {
        id: 'zoom-msg-1',
        source: 'zoom',
        sourceType: 'zoom',
        text: 'Meeting transcript: Product roadmap discussion for Q1 2026. Key priorities: mobile app, API v2, and analytics dashboard.',
        author: 'product-team',
        timestamp: new Date(),
        metadata: { meetingId: 'zoom-123', title: 'Product Roadmap' },
      },
    ];
  }

  /**
   * Poll for new email messages
   */
  private async pollEmailMessages(companyId: string, config: any): Promise<void> {
    console.log(`Polling email messages for company ${companyId}`);
    const messages = await this.fetchEmailMessages(config);
    
    for (const message of messages) {
      try {
        const knowledge = await knowledgeExtractionService.extractFromText(
          message.text,
          `email:${message.id}`,
          {
            sourceType: 'email',
            author: message.author,
            authorEmail: message.authorEmail,
            timestamp: message.timestamp,
          }
        );

        companyBrainWebSocketService.notifyKnowledgeCreated({
          id: message.id,
          title: knowledge.title,
          type: knowledge.type,
          source: message.source,
          author: message.author,
        });
      } catch (error) {
        console.error(`Failed to process email message ${message.id}:`, error);
      }
    }
  }

  /**
   * Handle employee departure - trigger knowledge preservation
   */
  async handleEmployeeDeparture(employeeId: string, employeeName: string, departureDate: Date): Promise<void> {
    console.log(`Handling departure for employee ${employeeName} (${employeeId})`);
    
    const trigger: EmployeeDepartureTrigger = {
      employeeId,
      employeeName,
      departureDate,
      knowledgeAtRisk: 0, // Would calculate from database
      preservationStatus: 'pending',
    };
    
    this.departureTriggers.push(trigger);
    
    // Notify via WebSocket
    companyBrainWebSocketService.broadcastRiskAlert({
      type: 'employee_departure',
      employeeId,
      employeeName,
      departureDate,
      message: `Employee departure detected. Initiating knowledge preservation workflow.`,
    });
    
    // Start knowledge preservation
    await this.preserveEmployeeKnowledge(employeeId, employeeName);
  }

  /**
   * Preserve knowledge from departing employee
   */
  private async preserveEmployeeKnowledge(employeeId: string, employeeName: string): Promise<void> {
    console.log(`Preserving knowledge for ${employeeName}`);
    
    // In production, this would:
    // 1. Extract all knowledge nodes created by this employee
    // 2. Identify critical knowledge areas
    // 3. Generate documentation
    // 4. Create knowledge transfer plans
    // 5. Notify relevant stakeholders
    
    // Notify progress
    companyBrainWebSocketService.broadcastAnalyticsUpdate({
      type: 'knowledge_preservation',
      employeeId,
      employeeName,
      status: 'in_progress',
      message: 'Extracting and preserving employee knowledge...',
    });
  }

  /**
   * Get ingestion status for a company
   */
  getIngestionStatus(companyId: string): {
    active: boolean;
    config?: IngestionConfig;
    history: IngestionResult[];
  } {
    return {
      active: this.activeIngestions.get(companyId) || false,
      config: this.ingestionConfigs.get(companyId),
      history: this.ingestionHistory.filter(h => h.source !== 'unknown'),
    };
  }

  /**
   * Get departure triggers
   */
  getDepartureTriggers(): EmployeeDepartureTrigger[] {
    return this.departureTriggers;
  }
}

// Export singleton instance
export const companyBrainIngestionService = new CompanyBrainIngestionService();
