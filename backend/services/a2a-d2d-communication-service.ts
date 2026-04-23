/**
 * Agent-to-Agent (A2A) and Department-to-Department (D2D) Communication Service
 * 
 * This service manages communication between AI agents (A2A) and between departments (D2D),
 * enabling consultation, delegation, escalation, insight sharing, and mentoring.
 */

import { db } from '../db';
import { agent_communications, aiAgents } from '../db/drizzle-schema';
import { eq, and, desc, inArray } from 'drizzle-orm';

export type CommunicationType = 'a2a' | 'd2d';
export type MessageType = 'consultation' | 'delegation' | 'escalation' | 'insight_sharing' | 'mentoring' | 'status_update' | 'collaboration';
export type MessagePriority = 'low' | 'medium' | 'high' | 'critical';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'acknowledged' | 'responded';

export interface CommunicationMessage {
  id?: string;
  organizationId: string;
  senderId: string;
  recipientId?: string;
  communicationType: CommunicationType;
  messageType: MessageType;
  priority: MessagePriority;
  subject?: string;
  content: string;
  context?: Record<string, any>;
  attachments?: any[];
  status?: MessageStatus;
  responseId?: string;
  metadata?: Record<string, any>;
}

export interface CommunicationResponse {
  id: string;
  originalMessage: CommunicationMessage;
  response: CommunicationMessage;
  responseTime: number; // milliseconds
}

class A2AD2DCommunicationService {
  /**
   * Send a communication message from one agent to another
   */
  async sendMessage(message: CommunicationMessage): Promise<CommunicationMessage> {
    const result = await db.insert(agent_communications).values({
      organization_id: message.organizationId,
      sender_id: message.senderId,
      recipient_id: message.recipientId,
      communication_type: message.communicationType,
      message_type: message.messageType,
      priority: message.priority,
      subject: message.subject,
      content: message.content,
      context: message.context || {},
      attachments: message.attachments || [],
      status: message.status || 'sent',
      metadata: message.metadata || {},
    }).returning();

    return {
      id: result[0].id,
      organizationId: result[0].organization_id,
      senderId: result[0].sender_id,
      recipientId: result[0].recipient_id,
      communicationType: result[0].communication_type as CommunicationType,
      messageType: result[0].message_type as MessageType,
      priority: result[0].priority as MessagePriority,
      subject: result[0].subject,
      content: result[0].content,
      context: result[0].context,
      attachments: result[0].attachments,
      status: result[0].status as MessageStatus,
      responseId: result[0].response_id,
      metadata: result[0].metadata,
    };
  }

  /**
   * Respond to a communication message
   */
  async respondToMessage(originalMessageId: string, response: CommunicationMessage): Promise<CommunicationResponse> {
    // Update original message status
    await db.update(agent_communications)
      .set({ 
        status: 'acknowledged',
        responded_at: new Date()
      })
      .where(eq(agent_communications.id, originalMessageId));

    // Send response
    const responseMessage = await this.sendMessage({
      ...response,
      responseId: originalMessageId,
      status: 'sent',
    });

    // Calculate response time
    const original = await db.select()
      .from(agent_communications)
      .where(eq(agent_communications.id, originalMessageId))
      .limit(1);

    const responseTime = original[0]?.created_at 
      ? new Date().getTime() - new Date(original[0].created_at).getTime()
      : 0;

    return {
      id: responseMessage.id!,
      originalMessage: await this.getMessageById(originalMessageId),
      response: responseMessage,
      responseTime,
    };
  }

  /**
   * Get message by ID
   */
  async getMessageById(messageId: string): Promise<CommunicationMessage> {
    const result = await db.select()
      .from(agent_communications)
      .where(eq(agent_communications.id, messageId))
      .limit(1);

    if (!result[0]) {
      throw new Error(`Message not found: ${messageId}`);
    }

    return {
      id: result[0].id,
      organizationId: result[0].organization_id,
      senderId: result[0].sender_id,
      recipientId: result[0].recipient_id,
      communicationType: result[0].communication_type as CommunicationType,
      messageType: result[0].message_type as MessageType,
      priority: result[0].priority as MessagePriority,
      subject: result[0].subject,
      content: result[0].content,
      context: result[0].context,
      attachments: result[0].attachments,
      status: result[0].status as MessageStatus,
      responseId: result[0].response_id,
      metadata: result[0].metadata,
    };
  }

  /**
   * Get all messages for an agent (sent and received)
   */
  async getAgentMessages(agentId: string, options?: {
    limit?: number;
    offset?: number;
    communicationType?: CommunicationType;
    messageType?: MessageType;
    status?: MessageStatus;
  }): Promise<CommunicationMessage[]> {
    const conditions = [
      eq(agent_communications.sender_id, agentId),
      eq(agent_communications.recipient_id, agentId),
    ];

    let query = db.select()
      .from(agent_communications)
      .where(conditions[0]) // Default to sent messages
      .orderBy(desc(agent_communications.created_at));

    // Apply filters
    if (options?.communicationType) {
      query = query.where(and(
        conditions[0],
        eq(agent_communications.communication_type, options.communicationType)
      ));
    }

    if (options?.messageType) {
      query = query.where(and(
        conditions[0],
        eq(agent_communications.message_type, options.messageType)
      ));
    }

    if (options?.status) {
      query = query.where(and(
        conditions[0],
        eq(agent_communications.status, options.status)
      ));
    }

    // Apply pagination
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.offset(options.offset);
    }

    const results = await query;

    return results.map(row => ({
      id: row.id,
      organizationId: row.organization_id,
      senderId: row.sender_id,
      recipientId: row.recipient_id,
      communicationType: row.communication_type as CommunicationType,
      messageType: row.message_type as MessageType,
      priority: row.priority as MessagePriority,
      subject: row.subject,
      content: row.content,
      context: row.context,
      attachments: row.attachments,
      status: row.status as MessageStatus,
      responseId: row.response_id,
      metadata: row.metadata,
    }));
  }

  /**
   * Get pending messages for an agent (messages that need response)
   */
  async getPendingMessages(agentId: string): Promise<CommunicationMessage[]> {
    const results = await db.select()
      .from(agent_communications)
      .where(and(
        eq(agent_communications.recipient_id, agentId),
        eq(agent_communications.status, 'sent')
      ))
      .orderBy(desc(agent_communications.created_at));

    return results.map(row => ({
      id: row.id,
      organizationId: row.organization_id,
      senderId: row.sender_id,
      recipientId: row.recipient_id,
      communicationType: row.communication_type as CommunicationType,
      messageType: row.message_type as MessageType,
      priority: row.priority as MessagePriority,
      subject: row.subject,
      content: row.content,
      context: row.context,
      attachments: row.attachments,
      status: row.status as MessageStatus,
      responseId: row.response_id,
      metadata: row.metadata,
    }));
  }

  /**
   * Get communication statistics for an agent
   */
  async getAgentCommunicationStats(agentId: string): Promise<{
    totalSent: number;
    totalReceived: number;
    totalResponded: number;
    averageResponseTime: number;
    byType: Record<CommunicationType, number>;
    byMessageType: Record<MessageType, number>;
  }> {
    const sent = await db.select()
      .from(agent_communications)
      .where(eq(agent_communications.sender_id, agentId));

    const received = await db.select()
      .from(agent_communications)
      .where(eq(agent_communications.recipient_id, agentId));

    const responded = received.filter(msg => msg.status === 'responded');

    // Calculate average response time
    let totalResponseTime = 0;
    let respondedCount = 0;
    for (const msg of responded) {
      if (msg.created_at && msg.responded_at) {
        totalResponseTime += new Date(msg.responded_at).getTime() - new Date(msg.created_at).getTime();
        respondedCount++;
      }
    }

    const byType: Record<CommunicationType, number> = { a2a: 0, d2d: 0 };
    const byMessageType: Record<MessageType, number> = {
      consultation: 0,
      delegation: 0,
      escalation: 0,
      insight_sharing: 0,
      mentoring: 0,
      status_update: 0,
      collaboration: 0,
    };

    sent.concat(received).forEach(msg => {
      byType[msg.communication_type as CommunicationType]++;
      byMessageType[msg.message_type as MessageType]++;
    });

    return {
      totalSent: sent.length,
      totalReceived: received.length,
      totalResponded: responded.length,
      averageResponseTime: respondedCount > 0 ? totalResponseTime / respondedCount : 0,
      byType,
      byMessageType,
    };
  }

  /**
   * Escalate a message to a higher priority or different agent/department
   */
  async escalateMessage(originalMessageId: string, escalation: {
    newPriority: MessagePriority;
    newRecipientId?: string;
    reason: string;
  }): Promise<CommunicationMessage> {
    const original = await this.getMessageById(originalMessageId);

    return this.sendMessage({
      organizationId: original.organizationId,
      senderId: original.senderId,
      recipientId: escalation.newRecipientId || original.recipientId,
      communicationType: original.communicationType,
      messageType: 'escalation',
      priority: escalation.newPriority,
      subject: `ESCALATED: ${original.subject || 'No Subject'}`,
      content: `${escalation.reason}\n\nOriginal message:\n${original.content}`,
      context: {
        ...original.context,
        originalMessageId,
        escalationReason: escalation.reason,
      },
      responseId: originalMessageId,
    });
  }

  /**
   * Broadcast a message to multiple agents in a department
   */
  async broadcastToDepartment(organizationId: string, departmentId: string, broadcast: {
    senderId: string;
    messageType: MessageType;
    priority: MessagePriority;
    subject: string;
    content: string;
    context?: Record<string, any>;
  }): Promise<CommunicationMessage[]> {
    // Get all agents in the department
    const agentsInDepartment = await db.select()
      .from(aiAgents)
      .where(eq(aiAgents.organizationId, organizationId));
    // Filter by department in config
    const targetAgents = agentsInDepartment.filter((agent: any) => 
      agent.config?.departmentId === departmentId
    );

    const messages: CommunicationMessage[] = [];
    for (const agent of targetAgents) {
      const message = await this.sendMessage({
        organizationId,
        senderId: broadcast.senderId,
        recipientId: agent.id,
        communicationType: 'd2d',
        messageType: broadcast.messageType,
        priority: broadcast.priority,
        subject: broadcast.subject,
        content: broadcast.content,
        context: broadcast.context,
      });
      messages.push(message);
    }

    return messages;
  }

  /**
   * Update message status
   */
  async updateMessageStatus(messageId: string, status: MessageStatus): Promise<void> {
    await db.update(agent_communications)
      .set({ status })
      .where(eq(agent_communications.id, messageId));

    if (status === 'acknowledged') {
      await db.update(agent_communications)
        .set({ acknowledged_at: new Date() })
        .where(eq(agent_communications.id, messageId));
    }

    if (status === 'responded') {
      await db.update(agent_communications)
        .set({ responded_at: new Date() })
        .where(eq(agent_communications.id, messageId));
    }
  }

  /**
   * Delete a communication message (soft delete by setting status to 'deleted')
   */
  async deleteMessage(messageId: string): Promise<void> {
    await db.update(agent_communications)
      .set({ status: 'deleted' })
      .where(eq(agent_communications.id, messageId));
  }
}

export const a2aD2DCommunicationService = new A2AD2DCommunicationService();
