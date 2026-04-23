/**
 * Agent Summary and Notes Service
 * 
 * This service generates comprehensive summaries and notes from interactions,
 * tasks, and conversations, enabling knowledge retention and easy retrieval.
 */

import { db } from '../db';
import { agent_summaries, aiAgents } from '../db/drizzle-schema';
import { eq, and, desc, or, like } from 'drizzle-orm';

export type SummaryType = 'conversation' | 'task' | 'meeting' | 'session' | 'daily' | 'weekly' | 'monthly' | 'custom';
export type SummaryFormat = 'narrative' | 'bullet' | 'structured';

export interface SummaryEntry {
  id?: string;
  organizationId: string;
  agentId: string;
  summaryType: SummaryType;
  title?: string;
  content: string;
  format: SummaryFormat;
  sourceIds?: string[];
  keyPoints?: Array<{
    point: string;
    priority: 'low' | 'medium' | 'high';
    category?: string;
  }>;
  actionItems?: Array<{
    action: string;
    assignee?: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    dueDate?: Date;
    status: 'pending' | 'in_progress' | 'completed';
  }>;
  decisions?: Array<{
    decision: string;
    rationale: string;
    timestamp: Date;
    stakeholders?: string[];
  }>;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface NoteEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  sharedWith: string[];
}

export interface SummaryConfig {
  autoGenerate: boolean;
  format: SummaryFormat;
  frequency: 'real-time' | 'session' | 'hourly' | 'daily' | 'weekly';
  includeKeyPoints: boolean;
  includeActionItems: boolean;
  includeDecisions: boolean;
  maxLength?: number;
  detailLevel: 'brief' | 'detailed' | 'comprehensive';
}

class SummaryNotesService {
  /**
   * Generate and store a summary
   */
  async generateSummary(summary: SummaryEntry): Promise<SummaryEntry> {
    const result = await db.insert(agent_summaries).values({
      organization_id: summary.organizationId,
      agent_id: summary.agentId,
      summary_type: summary.summaryType,
      title: summary.title,
      content: summary.content,
      format: summary.format,
      source_ids: summary.sourceIds || [],
      key_points: summary.keyPoints || [],
      action_items: summary.actionItems || [],
      decisions: summary.decisions || [],
      tags: summary.tags || [],
      metadata: summary.metadata || {},
    }).returning();

    return {
      id: result[0].id,
      organizationId: result[0].organization_id,
      agentId: result[0].agent_id,
      summaryType: result[0].summary_type as SummaryType,
      title: result[0].title,
      content: result[0].content,
      format: result[0].format as SummaryFormat,
      sourceIds: result[0].source_ids,
      keyPoints: result[0].key_points,
      actionItems: result[0].action_items,
      decisions: result[0].decisions,
      tags: result[0].tags,
      metadata: result[0].metadata,
    };
  }

  /**
   * Generate a conversation summary
   */
  async summarizeConversation(agentId: string, conversationData: {
    conversationId: string;
    messages: Array<{
      role: string;
      content: string;
      timestamp: Date;
    }>;
    duration: number; // milliseconds
    topics?: string[];
  }): Promise<SummaryEntry> {
    // Extract key points from conversation
    const keyPoints = this.extractKeyPoints(conversationData.messages, 5);
    
    // Extract action items
    const actionItems = this.extractActionItems(conversationData.messages);
    
    // Extract decisions
    const decisions = this.extractDecisions(conversationData.messages);

    // Generate summary content
    const content = this.generateConversationSummaryContent(
      conversationData.messages,
      keyPoints,
      actionItems,
      decisions,
      conversationData.duration
    );

    const summary: SummaryEntry = {
      organizationId: (await db.select().from(aiAgents).where(eq(aiAgents.id, agentId)))[0].organization_id,
      agentId,
      summaryType: 'conversation',
      title: `Conversation Summary - ${new Date().toLocaleDateString()}`,
      content,
      format: 'bullet',
      sourceIds: [conversationData.conversationId],
      keyPoints,
      actionItems,
      decisions,
      tags: conversationData.topics || ['conversation'],
      metadata: {
        duration: conversationData.duration,
        messageCount: conversationData.messages.length,
        generatedAt: new Date().toISOString(),
      },
    };

    return this.generateSummary(summary);
  }

  /**
   * Generate a task summary
   */
  async summarizeTask(agentId: string, taskData: {
    taskId: string;
    taskName: string;
    taskType: string;
    status: string;
    outcome: string;
    duration: number;
    inputData?: Record<string, any>;
    outputData?: Record<string, any>;
    decisions?: Array<{ decision: string; rationale: string }>;
  }): Promise<SummaryEntry> {
    const content = this.generateTaskSummaryContent(taskData);

    const summary: SummaryEntry = {
      organizationId: (await db.select().from(aiAgents).where(eq(aiAgents.id, agentId)))[0].organization_id,
      agentId,
      summaryType: 'task',
      title: `Task Summary: ${taskData.taskName}`,
      content,
      format: 'structured',
      sourceIds: [taskData.taskId],
      decisions: taskData.decisions?.map(d => ({
        decision: d.decision,
        rationale: d.rationale,
        timestamp: new Date(),
      })),
      tags: [taskData.taskType, taskData.status, taskData.outcome],
      metadata: {
        taskId: taskData.taskId,
        taskType: taskData.taskType,
        duration: taskData.duration,
        generatedAt: new Date().toISOString(),
      },
    };

    return this.generateSummary(summary);
  }

  /**
   * Generate a daily summary report
   */
  async generateDailySummary(agentId: string, date: Date, data: {
    tasksCompleted: number;
    conversationsHad: number;
    decisionsMade: number;
    actionItemsCompleted: number;
    keyAchievements: string[];
    challenges: string[];
    learnings: string[];
    metrics: Record<string, any>;
  }): Promise<SummaryEntry> {
    const content = this.generateDailySummaryContent(date, data);

    const summary: SummaryEntry = {
      organizationId: (await db.select().from(aiAgents).where(eq(aiAgents.id, agentId)))[0].organization_id,
      agentId,
      summaryType: 'daily',
      title: `Daily Summary - ${date.toLocaleDateString()}`,
      content,
      format: 'bullet',
      keyPoints: data.keyAchievements.map(achievement => ({
        point: achievement,
        priority: 'high' as const,
        category: 'achievement',
      })),
      actionItems: [],
      decisions: [],
      tags: ['daily', 'summary', date.toISOString().split('T')[0]],
      metadata: {
        date: date.toISOString(),
        tasksCompleted: data.tasksCompleted,
        conversationsHad: data.conversationsHad,
        decisionsMade: data.decisionsMade,
        actionItemsCompleted: data.actionItemsCompleted,
        challenges: data.challenges,
        learnings: data.learnings,
        metrics: data.metrics,
        generatedAt: new Date().toISOString(),
      },
    };

    return this.generateSummary(summary);
  }

  /**
   * Get summaries for an agent
   */
  async getAgentSummaries(agentId: string, options?: {
    limit?: number;
    summaryType?: SummaryType;
    searchQuery?: string;
    dateRange?: { start: Date; end: Date };
    tags?: string[];
  }): Promise<SummaryEntry[]> {
    let query = db.select()
      .from(agent_summaries)
      .where(eq(agent_summaries.agent_id, agentId))
      .orderBy(desc(agent_summaries.created_at));

    if (options?.summaryType) {
      query = query.where(and(
        eq(agent_summaries.agent_id, agentId),
        eq(agent_summaries.summary_type, options.summaryType)
      ));
    }

    if (options?.searchQuery) {
      query = query.where(and(
        eq(agent_summaries.agent_id, agentId),
        or(
          like(agent_summaries.title, `%${options.searchQuery}%`),
          like(agent_summaries.content, `%${options.searchQuery}%`)
        )
      ));
    }

    if (options?.dateRange) {
      query = query.where(and(
        eq(agent_summaries.agent_id, agentId),
        gte(agent_summaries.created_at, options.dateRange.start),
        lte(agent_summaries.created_at, options.dateRange.end)
      ));
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const results = await query;

    return results.map(row => ({
      id: row.id,
      organizationId: row.organization_id,
      agentId: row.agent_id,
      summaryType: row.summary_type as SummaryType,
      title: row.title,
      content: row.content,
      format: row.format as SummaryFormat,
      sourceIds: row.source_ids,
      keyPoints: row.key_points,
      actionItems: row.action_items,
      decisions: row.decisions,
      tags: row.tags,
      metadata: row.metadata,
    }));
  }

  /**
   * Get a specific summary by ID
   */
  async getSummaryById(summaryId: string): Promise<SummaryEntry> {
    const result = await db.select()
      .from(agent_summaries)
      .where(eq(agent_summaries.id, summaryId))
      .limit(1);

    if (!result[0]) {
      throw new Error(`Summary not found: ${summaryId}`);
    }

    return {
      id: result[0].id,
      organizationId: result[0].organization_id,
      agentId: result[0].agent_id,
      summaryType: result[0].summary_type as SummaryType,
      title: result[0].title,
      content: result[0].content,
      format: result[0].format as SummaryFormat,
      sourceIds: result[0].source_ids,
      keyPoints: result[0].key_points,
      actionItems: result[0].action_items,
      decisions: result[0].decisions,
      tags: result[0].tags,
      metadata: result[0].metadata,
    };
  }

  /**
   * Update a summary
   */
  async updateSummary(summaryId: string, updates: Partial<SummaryEntry>): Promise<SummaryEntry> {
    const result = await db.update(agent_summaries)
      .set({
        title: updates.title,
        content: updates.content,
        key_points: updates.keyPoints,
        action_items: updates.actionItems,
        decisions: updates.decisions,
        tags: updates.tags,
        metadata: updates.metadata,
      })
      .where(eq(agent_summaries.id, summaryId))
      .returning();

    if (!result[0]) {
      throw new Error(`Summary not found: ${summaryId}`);
    }

    return {
      id: result[0].id,
      organizationId: result[0].organization_id,
      agentId: result[0].agent_id,
      summaryType: result[0].summary_type as SummaryType,
      title: result[0].title,
      content: result[0].content,
      format: result[0].format as SummaryFormat,
      sourceIds: result[0].source_ids,
      keyPoints: result[0].key_points,
      actionItems: result[0].action_items,
      decisions: result[0].decisions,
      tags: result[0].tags,
      metadata: result[0].metadata,
    };
  }

  /**
   * Delete a summary
   */
  async deleteSummary(summaryId: string): Promise<void> {
    await db.delete(agent_summaries)
      .where(eq(agent_summaries.id, summaryId));
  }

  /**
   * Get summary configuration for an agent
   */
  async getSummaryConfig(agentId: string): Promise<SummaryConfig> {
    const agent = await db.select()
      .from(aiAgents)
      .where(eq(aiAgents.id, agentId))
      .limit(1);

    if (!agent[0]) {
      throw new Error(`Agent not found: ${agentId}`);
    }

    return agent[0].summary_config || {
      autoGenerate: true,
      format: 'bullet',
      frequency: 'session',
      includeKeyPoints: true,
      includeActionItems: true,
      includeDecisions: true,
      detailLevel: 'detailed',
    };
  }

  /**
   * Update summary configuration
   */
  async updateSummaryConfig(agentId: string, config: Partial<SummaryConfig>): Promise<SummaryConfig> {
    const agent = await db.select()
      .from(aiAgents)
      .where(eq(aiAgents.id, agentId))
      .limit(1);

    if (!agent[0]) {
      throw new Error(`Agent not found: ${agentId}`);
    }

    const currentConfig = agent[0].summary_config || {};
    const updatedConfig = { ...currentConfig, ...config };

    await db.update(aiAgents)
      .set({ 
        summary_config: updatedConfig,
        updated_at: new Date()
      })
      .where(eq(aiAgents.id, agentId));

    return updatedConfig;
  }

  /**
   * Search summaries across tags and content
   */
  async searchSummaries(organizationId: string, query: {
    searchTerm?: string;
    agentId?: string;
    summaryType?: SummaryType;
    tags?: string[];
    limit?: number;
  }): Promise<SummaryEntry[]> {
    let dbQuery = db.select()
      .from(agent_summaries)
      .where(eq(agent_summaries.organization_id, organizationId))
      .orderBy(desc(agent_summaries.created_at));

    if (query.agentId) {
      dbQuery = dbQuery.where(eq(agent_summaries.agent_id, query.agentId));
    }

    if (query.summaryType) {
      dbQuery = dbQuery.where(eq(agent_summaries.summary_type, query.summaryType));
    }

    if (query.searchTerm) {
      dbQuery = dbQuery.where(or(
        like(agent_summaries.title, `%${query.searchTerm}%`),
        like(agent_summaries.content, `%${query.searchTerm}%`)
      ));
    }

    if (query.limit) {
      dbQuery = dbQuery.limit(query.limit);
    }

    const results = await dbQuery;

    return results.map(row => ({
      id: row.id,
      organizationId: row.organization_id,
      agentId: row.agent_id,
      summaryType: row.summary_type as SummaryType,
      title: row.title,
      content: row.content,
      format: row.format as SummaryFormat,
      sourceIds: row.source_ids,
      keyPoints: row.key_points,
      actionItems: row.action_items,
      decisions: row.decisions,
      tags: row.tags,
      metadata: row.metadata,
    }));
  }

  /**
   * Helper: Extract key points from messages
   */
  private extractKeyPoints(messages: Array<{ role: string; content: string }>, maxPoints: number = 5): Array<{ point: string; priority: 'low' | 'medium' | 'high'; category?: string }> {
    // Placeholder implementation - would use NLP to extract key points
    const keyPoints: Array<{ point: string; priority: 'low' | 'medium' | 'high'; category?: string }> = [];

    // Simple heuristic: extract important-looking sentences
    for (const msg of messages.slice(-10)) { // Look at last 10 messages
      const sentences = msg.content.split(/[.!?]+/).filter(s => s.trim());
      for (const sentence of sentences.slice(0, 2)) {
        if (sentence.trim().length > 20 && keyPoints.length < maxPoints) {
          keyPoints.push({
            point: sentence.trim(),
            priority: 'medium',
            category: msg.role,
          });
        }
      }
    }

    return keyPoints.slice(0, maxPoints);
  }

  /**
   * Helper: Extract action items from messages
   */
  private extractActionItems(messages: Array<{ role: string; content: string }>): Array<{
    action: string;
    assignee?: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    dueDate?: Date;
    status: 'pending' | 'in_progress' | 'completed';
  }> {
    // Placeholder implementation - would use NLP to detect action items
    const actionItems: Array<{
      action: string;
      assignee?: string;
      priority: 'low' | 'medium' | 'high' | 'critical';
      dueDate?: Date;
      status: 'pending' | 'in_progress' | 'completed';
    }> = [];

    // Simple heuristic: look for action-oriented language
    for (const msg of messages) {
      if (msg.content.toLowerCase().includes('should') || 
          msg.content.toLowerCase().includes('need to') ||
          msg.content.toLowerCase().includes('will')) {
        actionItems.push({
          action: msg.content.substring(0, 100),
          priority: 'medium',
          status: 'pending',
        });
      }
    }

    return actionItems;
  }

  /**
   * Helper: Extract decisions from messages
   */
  private extractDecisions(messages: Array<{ role: string; content: string }>): Array<{
    decision: string;
    rationale: string;
    timestamp: Date;
    stakeholders?: string[];
  }> {
    // Placeholder implementation - would use NLP to detect decisions
    const decisions: Array<{
      decision: string;
      rationale: string;
      timestamp: Date;
      stakeholders?: string[];
    }> = [];

    // Simple heuristic: look for decision-oriented language
    for (const msg of messages) {
      if (msg.content.toLowerCase().includes('decided') || 
          msg.content.toLowerCase().includes('decision') ||
          msg.content.toLowerCase().includes('agree')) {
        decisions.push({
          decision: msg.content.substring(0, 100),
          rationale: 'Based on discussion',
          timestamp: new Date(),
        });
      }
    }

    return decisions;
  }

  /**
   * Helper: Generate conversation summary content
   */
  private generateConversationSummaryContent(
    messages: Array<{ role: string; content: string }>,
    keyPoints: any[],
    actionItems: any[],
    decisions: any[],
    duration: number
  ): string {
    const durationMinutes = Math.round(duration / 60000);
    
    let content = `**Conversation Summary**\n\n`;
    content += `Duration: ${durationMinutes} minutes\n`;
    content += `Messages: ${messages.length}\n\n`;

    if (keyPoints.length > 0) {
      content += `**Key Points:**\n`;
      keyPoints.forEach((kp, i) => {
        content += `${i + 1}. ${kp.point}\n`;
      });
      content += '\n';
    }

    if (actionItems.length > 0) {
      content += `**Action Items:**\n`;
      actionItems.forEach((ai, i) => {
        content += `${i + 1}. ${ai.action}\n`;
      });
      content += '\n';
    }

    if (decisions.length > 0) {
      content += `**Decisions Made:**\n`;
      decisions.forEach((d, i) => {
        content += `${i + 1}. ${d.decision}\n`;
      });
      content += '\n';
    }

    return content;
  }

  /**
   * Helper: Generate task summary content
   */
  private generateTaskSummaryContent(taskData: {
    taskName: string;
    taskType: string;
    status: string;
    outcome: string;
    duration: number;
    inputData?: Record<string, any>;
    outputData?: Record<string, any>;
  }): string {
    const durationMinutes = Math.round(taskData.duration / 60000);
    
    let content = `**Task Summary**\n\n`;
    content += `Task: ${taskData.taskName}\n`;
    content += `Type: ${taskData.taskType}\n`;
    content += `Status: ${taskData.status}\n`;
    content += `Outcome: ${taskData.outcome}\n`;
    content += `Duration: ${durationMinutes} minutes\n\n`;

    if (taskData.inputData) {
      content += `**Input Data:**\n`;
      content += `${JSON.stringify(taskData.inputData, null, 2)}\n\n`;
    }

    if (taskData.outputData) {
      content += `**Output Data:**\n`;
      content += `${JSON.stringify(taskData.outputData, null, 2)}\n\n`;
    }

    return content;
  }

  /**
   * Helper: Generate daily summary content
   */
  private generateDailySummaryContent(
    date: Date,
    data: {
      tasksCompleted: number;
      conversationsHad: number;
      decisionsMade: number;
      actionItemsCompleted: number;
      keyAchievements: string[];
      challenges: string[];
      learnings: string[];
      metrics: Record<string, any>;
    }
  ): string {
    let content = `**Daily Summary - ${date.toLocaleDateString()}**\n\n`;

    content += `**Metrics:**\n`;
    content += `- Tasks Completed: ${data.tasksCompleted}\n`;
    content += `- Conversations: ${data.conversationsHad}\n`;
    content += `- Decisions Made: ${data.decisionsMade}\n`;
    content += `- Action Items Completed: ${data.actionItemsCompleted}\n\n`;

    if (data.keyAchievements.length > 0) {
      content += `**Key Achievements:**\n`;
      data.keyAchievements.forEach((achievement, i) => {
        content += `${i + 1}. ${achievement}\n`;
      });
      content += '\n';
    }

    if (data.challenges.length > 0) {
      content += `**Challenges:**\n`;
      data.challenges.forEach((challenge, i) => {
        content += `${i + 1}. ${challenge}\n`;
      });
      content += '\n';
    }

    if (data.learnings.length > 0) {
      content += `**Learnings:**\n`;
      data.learnings.forEach((learning, i) => {
        content += `${i + 1}. ${learning}\n`;
      });
      content += '\n';
    }

    return content;
  }
}

// Helper functions for drizzle-orm
function like(column: any, pattern: string): any {
  return { like: pattern };
}

function gte(column: any, value: any): any {
  return { gte: value };
}

function lte(column: any, value: any): any {
  return { lte: value };
}

export const summaryNotesService = new SummaryNotesService();
