/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';

/**
 * Company Brain Chat Knowledge Integration Service
 * Integrates chat messages with knowledge capture
 * Auto-links chats to SOPs, projects, and extracts actionable knowledge
 */

export interface KnowledgeLink {
  type: 'sop' | 'project' | 'expert' | 'decision' | 'document';
  id: string;
  title: string;
  relevance: number;
  confidence: number;
  metadata: Record<string, any>;
}

export interface ExtractedKnowledge {
  topics: string[];
  entities: Array<{ name: string; type: string; confidence: number }>;
  actionItems: Array<{ task: string; assignee?: string; dueDate?: string; priority: string }>;
  decisions: Array<{ decision: string; rationale: string; impact: string }>;
  risks: Array<{ description: string; severity: string; mitigation?: string }>;
  questions: Array<{ question: string; answer?: string }>;
}

export interface ChatKnowledgeContext {
  messageId: string;
  conversationId: string;
  channelId?: string;
  extractedKnowledge: ExtractedKnowledge;
  linkedResources: KnowledgeLink[];
  suggestedSOPs: KnowledgeLink[];
  suggestedProjects: KnowledgeLink[];
  suggestedExperts: KnowledgeLink[];
  metadata: Record<string, any>;
}

export class CompanyBrainChatKnowledgeIntegrationService {
  private openai: OpenAI;
  private knowledgeContexts: Map<string, ChatKnowledgeContext> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Process chat message for knowledge integration
   */
  async processMessage(
    organizationId: string,
    messageId: string,
    conversationId: string,
    channelId: string | undefined,
    content: string,
    senderId: string
  ): Promise<ChatKnowledgeContext> {
    // Extract knowledge from message
    const extractedKnowledge = await this.extractKnowledge(content);

    // Find linked resources
    const linkedResources = await this.findLinkedResources(organizationId, content);

    // Suggest relevant SOPs
    const suggestedSOPs = await this.suggestSOPs(organizationId, content);

    // Suggest relevant projects
    const suggestedProjects = await this.suggestProjects(organizationId, content);

    // Suggest relevant experts
    const suggestedExperts = await this.suggestExperts(organizationId, content);

    const context: ChatKnowledgeContext = {
      messageId,
      conversationId,
      channelId,
      extractedKnowledge,
      linkedResources,
      suggestedSOPs,
      suggestedProjects,
      suggestedExperts,
      metadata: {
        organizationId,
        senderId,
        processedAt: new Date(),
      },
    };

    this.knowledgeContexts.set(messageId, context);
    await this.saveKnowledgeContext(context);

    return context;
  }

  /**
   * Extract knowledge from message content
   */
  private async extractKnowledge(content: string): Promise<ExtractedKnowledge> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract structured knowledge from this chat message. Return JSON with:
            - topics: array of topic strings
            - entities: array of {name, type, confidence} objects
            - actionItems: array of {task, assignee, dueDate, priority} objects
            - decisions: array of {decision, rationale, impact} objects
            - risks: array of {description, severity, mitigation} objects
            - questions: array of {question, answer} objects`,
          },
          {
            role: 'user',
            content,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      return {
        topics: result.topics || [],
        entities: result.entities || [],
        actionItems: result.actionItems || [],
        decisions: result.decisions || [],
        risks: result.risks || [],
        questions: result.questions || [],
      };
    } catch (error) {
      console.error('Error extracting knowledge:', error);
      return {
        topics: [],
        entities: [],
        actionItems: [],
        decisions: [],
        risks: [],
        questions: [],
      };
    }
  }

  /**
   * Find linked resources based on content
   */
  private async findLinkedResources(organizationId: string, content: string): Promise<KnowledgeLink[]> {
    // In production, perform vector search across all knowledge sources
    // For now, return empty array
    return [];
  }

  /**
   * Suggest relevant SOPs
   */
  private async suggestSOPs(organizationId: string, content: string): Promise<KnowledgeLink[]> {
    // In production, search SOPs by vector similarity
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Identify which Standard Operating Procedures (SOPs) might be relevant to this message. Return JSON with suggestedSOPs array of {title, relevance} objects.',
          },
          {
            role: 'user',
            content,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      return (result.suggestedSOPs || []).map((sop: any) => ({
        type: 'sop' as const,
        id: crypto.randomUUID(),
        title: sop.title,
        relevance: sop.relevance || 0.5,
        confidence: 0.7,
        metadata: {},
      }));
    } catch (error) {
      console.error('Error suggesting SOPs:', error);
      return [];
    }
  }

  /**
   * Suggest relevant projects
   */
  private async suggestProjects(organizationId: string, content: string): Promise<KnowledgeLink[]> {
    // In production, search projects by vector similarity
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Identify which projects might be relevant to this message. Return JSON with suggestedProjects array of {title, relevance} objects.',
          },
          {
            role: 'user',
            content,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      return (result.suggestedProjects || []).map((project: any) => ({
        type: 'project' as const,
        id: crypto.randomUUID(),
        title: project.title,
        relevance: project.relevance || 0.5,
        confidence: 0.7,
        metadata: {},
      }));
    } catch (error) {
      console.error('Error suggesting projects:', error);
      return [];
    }
  }

  /**
   * Suggest relevant experts
   */
  private async suggestExperts(organizationId: string, content: string): Promise<KnowledgeLink[]> {
    // In production, search expertise profiles by vector similarity
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Identify which types of experts might be relevant to this message. Return JSON with suggestedExperts array of {name, expertise, relevance} objects.',
          },
          {
            role: 'user',
            content,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      return (result.suggestedExperts || []).map((expert: any) => ({
        type: 'expert' as const,
        id: crypto.randomUUID(),
        title: expert.name,
        relevance: expert.relevance || 0.5,
        confidence: 0.7,
        metadata: { expertise: expert.expertise },
      }));
    } catch (error) {
      console.error('Error suggesting experts:', error);
      return [];
    }
  }

  /**
   * Get knowledge context for message
   */
  async getKnowledgeContext(messageId: string): Promise<ChatKnowledgeContext | null> {
    return this.knowledgeContexts.get(messageId) || null;
  }

  /**
   * Link message to SOP
   */
  async linkToSOP(messageId: string, sopId: string, confidence: number): Promise<void> {
    const context = this.knowledgeContexts.get(messageId);
    if (context) {
      const link: KnowledgeLink = {
        type: 'sop',
        id: sopId,
        title: '',
        relevance: 0.8,
        confidence,
        metadata: {},
      };
      context.linkedResources.push(link);
      await this.saveKnowledgeContext(context);
    }
  }

  /**
   * Link message to project
   */
  async linkToProject(messageId: string, projectId: string, confidence: number): Promise<void> {
    const context = this.knowledgeContexts.get(messageId);
    if (context) {
      const link: KnowledgeLink = {
        type: 'project',
        id: projectId,
        title: '',
        relevance: 0.8,
        confidence,
        metadata: {},
      };
      context.linkedResources.push(link);
      await this.saveKnowledgeContext(context);
    }
  }

  /**
   * Generate SOP suggestion from conversation
   */
  async generateSOPSuggestion(conversationId: string): Promise<{
    title: string;
    description: string;
    steps: string[];
    confidence: number;
  }> {
    // In production, analyze conversation to suggest SOP creation
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Analyze this conversation and suggest if a Standard Operating Procedure (SOP) should be created. Return JSON with {title, description, steps, confidence}.',
          },
          {
            role: 'user',
            content: `Analyze conversation ${conversationId} for SOP potential.`,
          },
        ],
        temperature: 0.5,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      return {
        title: result.title || '',
        description: result.description || '',
        steps: result.steps || [],
        confidence: result.confidence || 0,
      };
    } catch (error) {
      console.error('Error generating SOP suggestion:', error);
      return {
        title: '',
        description: '',
        steps: [],
        confidence: 0,
      };
    }
  }

  /**
   * Extract action items from conversation
   */
  async extractActionItems(conversationId: string): Promise<Array<{
    task: string;
    assignee?: string;
    dueDate?: string;
    priority: string;
  }>> {
    // In production, analyze conversation for action items
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Extract action items from this conversation. Return JSON with actionItems array of {task, assignee, dueDate, priority} objects.',
          },
          {
            role: 'user',
            content: `Extract action items from conversation ${conversationId}.`,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result.actionItems || [];
    } catch (error) {
      console.error('Error extracting action items:', error);
      return [];
    }
  }

  /**
   * Save knowledge context to database
   */
  private async saveKnowledgeContext(context: ChatKnowledgeContext): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving knowledge context:', context.messageId);
  }

  /**
   * Get knowledge integration statistics
   */
  async getKnowledgeIntegrationStatistics(organizationId: string): Promise<{
    totalProcessedMessages: number;
    totalExtractedTopics: number;
    totalExtractedActionItems: number;
    totalExtractedDecisions: number;
    totalLinkedSOPs: number;
    totalLinkedProjects: number;
  }> {
    const contexts = Array.from(this.knowledgeContexts.values())
      .filter(c => c.metadata.organizationId === organizationId);

    const totalProcessedMessages = contexts.length;
    const totalExtractedTopics = contexts.reduce((sum, c) => sum + c.extractedKnowledge.topics.length, 0);
    const totalExtractedActionItems = contexts.reduce((sum, c) => sum + c.extractedKnowledge.actionItems.length, 0);
    const totalExtractedDecisions = contexts.reduce((sum, c) => sum + c.extractedKnowledge.decisions.length, 0);
    const totalLinkedSOPs = contexts.reduce((sum, c) => sum + c.linkedResources.filter(r => r.type === 'sop').length, 0);
    const totalLinkedProjects = contexts.reduce((sum, c) => sum + c.linkedResources.filter(r => r.type === 'project').length, 0);

    return {
      totalProcessedMessages,
      totalExtractedTopics,
      totalExtractedActionItems,
      totalExtractedDecisions,
      totalLinkedSOPs,
      totalLinkedProjects,
    };
  }

  /**
   * Search knowledge contexts
   */
  async searchKnowledgeContexts(
    organizationId: string,
    query: string,
    filters?: {
      topic?: string;
      entityType?: string;
      resourceType?: string;
    }
  ): Promise<ChatKnowledgeContext[]> {
    const contexts = Array.from(this.knowledgeContexts.values())
      .filter(c => c.metadata.organizationId === organizationId);

    let filtered = contexts;

    if (filters?.topic) {
      filtered = filtered.filter(c => c.extractedKnowledge.topics.includes(filters.topic));
    }

    if (filters?.entityType) {
      filtered = filtered.filter(c => 
        c.extractedKnowledge.entities.some(e => e.type === filters.entityType)
      );
    }

    if (filters?.resourceType) {
      filtered = filtered.filter(c => 
        c.linkedResources.some(r => r.type === filters.resourceType)
      );
    }

    // Simple text search
    if (query) {
      const queryLower = query.toLowerCase();
      filtered = filtered.filter(c =>
        c.extractedKnowledge.topics.some(t => t.toLowerCase().includes(queryLower)) ||
        c.extractedKnowledge.entities.some(e => e.name.toLowerCase().includes(queryLower))
      );
    }

    return filtered;
  }
}

// Export singleton instance
export const companyBrainChatKnowledgeIntegrationService = new CompanyBrainChatKnowledgeIntegrationService();
