/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';

/**
 * Company Brain SOP Extraction Service
 * AI-generated standard operating procedures from active work patterns
 * Extracts undocumented steps and workflows from employee activities
 */

export interface SOP {
  id: string;
  organizationId: string;
  title: string;
  description?: string;
  category?: string;
  department?: string;
  process: string;
  steps: Array<{
    order: number;
    title: string;
    description: string;
    estimatedTime?: string;
    tools?: string[];
    prerequisites?: string[];
  }>;
  prerequisites: string[];
  tools: string[];
  estimatedTime?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'pending-review' | 'approved' | 'deprecated';
  version: number;
  sourceType: 'chat' | 'meeting' | 'email' | 'document' | 'activity-log';
  sourceId?: string;
  extractedFrom: Array<{
    type: string;
    id: string;
    title: string;
    relevance: number;
  }>;
  confidence: number;
  reviewedBy?: string;
  approvedBy?: string;
  approvedAt?: Date;
  embeddingVector?: number[];
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface SOPExtractionConfig {
  organizationId: string;
  autoExtract: boolean;
  sources: {
    chatLogs: boolean;
    meetingTranscriptions: boolean;
    emailThreads: boolean;
    documents: boolean;
    activityLogs: boolean;
  };
  confidenceThreshold: number;
  requireApproval: boolean;
  departments: string[];
  categories: string[];
}

export class CompanyBrainSOPExtractionService {
  private openai: OpenAI;
  private configs: Map<string, SOPExtractionConfig> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Configure SOP extraction for an organization
   */
  configureExtraction(config: SOPExtractionConfig): void {
    this.configs.set(config.organizationId, config);
  }

  /**
   * Get configuration for an organization
   */
  getConfig(organizationId: string): SOPExtractionConfig | undefined {
    return this.configs.get(organizationId);
  }

  /**
   * Extract SOP from chat logs
   */
  async extractFromChatLogs(
    organizationId: string,
    chatLogs: any[]
  ): Promise<SOP[]> {
    const config = this.configs.get(organizationId);
    if (!config?.sources.chatLogs) {
      return [];
    }

    const sops: SOP[] = [];

    // Group chat logs by topic/context
    const groupedLogs = this.groupByTopic(chatLogs);

    for (const [topic, logs] of Object.entries(groupedLogs)) {
      if (logs.length < 3) continue; // Need enough context

      const sop = await this.generateSOPFromLogs(organizationId, topic, logs, 'chat');
      if (sop && sop.confidence >= (config.confidenceThreshold || 0.7)) {
        sops.push(sop);
      }
    }

    return sops;
  }

  /**
   * Extract SOP from meeting transcription
   */
  async extractFromMeeting(
    organizationId: string,
    meetingTranscription: any
  ): Promise<SOP | null> {
    const config = this.configs.get(organizationId);
    if (!config?.sources.meetingTranscriptions) {
      return null;
    }

    if (!meetingTranscription.transcription) {
      return null;
    }

    const sop = await this.generateSOPFromTranscription(
      organizationId,
      meetingTranscription,
      'meeting'
    );

    if (sop && sop.confidence >= (config.confidenceThreshold || 0.7)) {
      return sop;
    }

    return null;
  }

  /**
   * Extract SOP from email thread
   */
  async extractFromEmailThread(
    organizationId: string,
    emailThread: any
  ): Promise<SOP | null> {
    const config = this.configs.get(organizationId);
    if (!config?.sources.emailThreads) {
      return null;
    }

    const messages = emailThread.messages || [];
    if (messages.length < 3) return null;

    const sop = await this.generateSOPFromEmails(organizationId, emailThread, 'email');

    if (sop && sop.confidence >= (config.confidenceThreshold || 0.7)) {
      return sop;
    }

    return null;
  }

  /**
   * Extract SOP from activity logs
   */
  async extractFromActivityLogs(
    organizationId: string,
    activityLogs: any[]
  ): Promise<SOP[]> {
    const config = this.configs.get(organizationId);
    if (!config?.sources.activityLogs) {
      return [];
    }

    const sops: SOP[] = [];

    // Group by user and activity type
    const groupedActivities = this.groupByActivity(activityLogs);

    for (const [activityType, activities] of Object.entries(groupedActivities)) {
      if (activities.length < 5) continue;

      const sop = await this.generateSOPFromActivities(
        organizationId,
        activityType,
        activities,
        'activity-log'
      );

      if (sop && sop.confidence >= (config.confidenceThreshold || 0.7)) {
        sops.push(sop);
      }
    }

    return sops;
  }

  /**
   * Group chat logs by topic
   */
  private groupByTopic(chatLogs: any[]): Record<string, any[]> {
    const grouped: Record<string, any[]> = {};

    for (const log of chatLogs) {
      const topics = log.extractedKnowledge?.topics || ['general'];
      for (const topic of topics) {
        if (!grouped[topic]) {
          grouped[topic] = [];
        }
        grouped[topic].push(log);
      }
    }

    return grouped;
  }

  /**
   * Group activities by type
   */
  private groupByActivity(activityLogs: any[]): Record<string, any[]> {
    const grouped: Record<string, any[]> = {};

    for (const log of activityLogs) {
      const type = log.activityType || 'general';
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(log);
    }

    return grouped;
  }

  /**
   * Generate SOP from chat logs
   */
  private async generateSOPFromLogs(
    organizationId: string,
    topic: string,
    logs: any[],
    sourceType: SOP['sourceType']
  ): Promise<SOP | null> {
    try {
      const context = logs.map(log => log.message).join('\n\n');

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract a Standard Operating Procedure (SOP) from these chat logs. The logs discuss "${topic}".

            Structure the SOP with:
            - Title (clear and descriptive)
            - Description (brief overview)
            - Category (e.g., development, sales, support)
            - Department
            - Process overview
            - Step-by-step instructions (numbered)
            - Prerequisites
            - Tools needed
            - Estimated time
            - Difficulty level (beginner/intermediate/advanced)

            Return as JSON with confidence score (0-1).`,
          },
          {
            role: 'user',
            content: context.substring(0, 12000),
          },
        ],
        temperature: 0.5,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');

      if (!result.title || !result.steps) {
        return null;
      }

      const sop: SOP = {
        id: crypto.randomUUID(),
        organizationId,
        title: result.title,
        description: result.description,
        category: result.category,
        department: result.department,
        process: result.process || result.title,
        steps: result.steps.map((step: any, index: number) => ({
          order: index + 1,
          title: step.title,
          description: step.description,
          estimatedTime: step.estimatedTime,
          tools: step.tools,
          prerequisites: step.prerequisites,
        })),
        prerequisites: result.prerequisites || [],
        tools: result.tools || [],
        estimatedTime: result.estimatedTime,
        difficulty: result.difficulty || 'intermediate',
        status: 'draft',
        version: 1,
        sourceType,
        sourceId: logs[0]?.id,
        extractedFrom: logs.slice(0, 5).map((log: any) => ({
          type: 'chat',
          id: log.id,
          title: log.message.substring(0, 100),
          relevance: 1,
        })),
        confidence: result.confidence || 0.5,
        metadata: { sourceCount: logs.length },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Generate embedding
      sop.embeddingVector = await this.generateEmbedding(sop.process);

      // Save to database
      await this.saveSOP(sop);

      return sop;
    } catch (error) {
      console.error('Error generating SOP from logs:', error);
      return null;
    }
  }

  /**
   * Generate SOP from meeting transcription
   */
  private async generateSOPFromTranscription(
    organizationId: string,
    meeting: any,
    sourceType: SOP['sourceType']
  ): Promise<SOP | null> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract a Standard Operating Procedure (SOP) from this meeting transcription. Focus on processes, workflows, or procedures discussed.

            Structure the SOP with:
            - Title
            - Description
            - Category
            - Department
            - Process overview
            - Step-by-step instructions
            - Prerequisites
            - Tools needed
            - Estimated time
            - Difficulty level

            Return as JSON with confidence score (0-1).`,
          },
          {
            role: 'user',
            content: `Meeting: ${meeting.meetingTitle}\n\nTranscription:\n${meeting.transcription}`,
          },
        ],
        temperature: 0.5,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');

      if (!result.title || !result.steps) {
        return null;
      }

      const sop: SOP = {
        id: crypto.randomUUID(),
        organizationId,
        title: result.title,
        description: result.description,
        category: result.category,
        department: result.department,
        process: result.process || result.title,
        steps: result.steps.map((step: any, index: number) => ({
          order: index + 1,
          title: step.title,
          description: step.description,
          estimatedTime: step.estimatedTime,
          tools: step.tools,
          prerequisites: step.prerequisites,
        })),
        prerequisites: result.prerequisites || [],
        tools: result.tools || [],
        estimatedTime: result.estimatedTime,
        difficulty: result.difficulty || 'intermediate',
        status: 'draft',
        version: 1,
        sourceType,
        sourceId: meeting.id,
        extractedFrom: [{
          type: 'meeting',
          id: meeting.id,
          title: meeting.meetingTitle,
          relevance: 1,
        }],
        confidence: result.confidence || 0.5,
        metadata: { meetingDate: meeting.startTime },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      sop.embeddingVector = await this.generateEmbedding(sop.process);
      await this.saveSOP(sop);

      return sop;
    } catch (error) {
      console.error('Error generating SOP from meeting:', error);
      return null;
    }
  }

  /**
   * Generate SOP from emails
   */
  private async generateSOPFromEmails(
    organizationId: string,
    emailThread: any,
    sourceType: SOP['sourceType']
  ): Promise<SOP | null> {
    try {
      const context = emailThread.messages
        .map((msg: any) => `From: ${msg.sender}\nSubject: ${msg.subject}\n\n${msg.body}`)
        .join('\n\n---\n\n');

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract a Standard Operating Procedure (SOP) from this email thread. Look for processes, procedures, or workflows described.

            Structure the SOP with:
            - Title
            - Description
            - Category
            - Department
            - Process overview
            - Step-by-step instructions
            - Prerequisites
            - Tools needed
            - Estimated time
            - Difficulty level

            Return as JSON with confidence score (0-1).`,
          },
          {
            role: 'user',
            content: context.substring(0, 12000),
          },
        ],
        temperature: 0.5,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');

      if (!result.title || !result.steps) {
        return null;
      }

      const sop: SOP = {
        id: crypto.randomUUID(),
        organizationId,
        title: result.title,
        description: result.description,
        category: result.category,
        department: result.department,
        process: result.process || result.title,
        steps: result.steps.map((step: any, index: number) => ({
          order: index + 1,
          title: step.title,
          description: step.description,
          estimatedTime: step.estimatedTime,
          tools: step.tools,
          prerequisites: step.prerequisites,
        })),
        prerequisites: result.prerequisites || [],
        tools: result.tools || [],
        estimatedTime: result.estimatedTime,
        difficulty: result.difficulty || 'intermediate',
        status: 'draft',
        version: 1,
        sourceType,
        sourceId: emailThread.id,
        extractedFrom: emailThread.messages.slice(0, 3).map((msg: any) => ({
          type: 'email',
          id: msg.id,
          title: msg.subject,
          relevance: 1,
        })),
        confidence: result.confidence || 0.5,
        metadata: { messageCount: emailThread.messageCount },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      sop.embeddingVector = await this.generateEmbedding(sop.process);
      await this.saveSOP(sop);

      return sop;
    } catch (error) {
      console.error('Error generating SOP from emails:', error);
      return null;
    }
  }

  /**
   * Generate SOP from activity logs
   */
  private async generateSOPFromActivities(
    organizationId: string,
    activityType: string,
    activities: any[],
    sourceType: SOP['sourceType']
  ): Promise<SOP | null> {
    try {
      const context = activities
        .map((act: any) => `${act.action} - ${act.description || ''}`)
        .join('\n');

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract a Standard Operating Procedure (SOP) from these activity logs for "${activityType}".

            Structure the SOP with:
            - Title
            - Description
            - Category
            - Department
            - Process overview
            - Step-by-step instructions
            - Prerequisites
            - Tools needed
            - Estimated time
            - Difficulty level

            Return as JSON with confidence score (0-1).`,
          },
          {
            role: 'user',
            content: context.substring(0, 12000),
          },
        ],
        temperature: 0.5,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');

      if (!result.title || !result.steps) {
        return null;
      }

      const sop: SOP = {
        id: crypto.randomUUID(),
        organizationId,
        title: result.title,
        description: result.description,
        category: result.category,
        department: result.department,
        process: result.process || result.title,
        steps: result.steps.map((step: any, index: number) => ({
          order: index + 1,
          title: step.title,
          description: step.description,
          estimatedTime: step.estimatedTime,
          tools: step.tools,
          prerequisites: step.prerequisites,
        })),
        prerequisites: result.prerequisites || [],
        tools: result.tools || [],
        estimatedTime: result.estimatedTime,
        difficulty: result.difficulty || 'intermediate',
        status: 'draft',
        version: 1,
        sourceType,
        sourceId: activities[0]?.id,
        extractedFrom: activities.slice(0, 5).map((act: any) => ({
          type: 'activity',
          id: act.id,
          title: act.action,
          relevance: 1,
        })),
        confidence: result.confidence || 0.5,
        metadata: { activityCount: activities.length },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      sop.embeddingVector = await this.generateEmbedding(sop.process);
      await this.saveSOP(sop);

      return sop;
    } catch (error) {
      console.error('Error generating SOP from activities:', error);
      return null;
    }
  }

  /**
   * Generate embedding
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      return [];
    }
  }

  /**
   * Save SOP to database
   */
  private async saveSOP(sop: SOP): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving SOP:', sop.id);
  }

  /**
   * Get SOP by ID
   */
  async getSOP(sopId: string): Promise<SOP | null> {
    // In production, query database
    return null;
  }

  /**
   * Search SOPs
   */
  async searchSOPs(
    organizationId: string,
    query: string,
    filters?: {
      category?: string;
      department?: string;
      status?: string;
      difficulty?: string;
    }
  ): Promise<SOP[]> {
    // In production, perform vector search with filters
    console.log(`Searching SOPs for ${organizationId}: ${query}`);
    
    return [];
  }

  /**
   * Approve SOP
   */
  async approveSOP(sopId: string, approvedBy: string): Promise<void> {
    // In production, update database
    console.log(`Approving SOP ${sopId} by ${approvedBy}`);
  }

  /**
   * Update SOP
   */
  async updateSOP(sopId: string, updates: Partial<SOP>): Promise<void> {
    // In production, update database
    console.log(`Updating SOP ${sopId}`);
  }

  /**
   * Get SOP statistics
   */
  async getSOPStatistics(organizationId: string): Promise<{
    totalSOPs: number;
    sopsByCategory: Record<string, number>;
    sopsByDepartment: Record<string, number>;
    sopsByStatus: Record<string, number>;
    avgConfidence: number;
  }> {
    // In production, query database
    return {
      totalSOPs: 0,
      sopsByCategory: {},
      sopsByDepartment: {},
      sopsByStatus: {},
      avgConfidence: 0,
    };
  }
}

// Export singleton instance
export const companyBrainSOPExtractionService = new CompanyBrainSOPExtractionService();
