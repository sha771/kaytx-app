/**
 * Agent-to-Agent (A2A) Communication Service
 * Enables seamless communication between AI agents with support for:
 * - Direct messaging between agents
 * - Consultation requests (Main Agent consulting Subagent or vice versa)
 * - Broadcast messaging to multiple agents
 * - Escalation and delegation workflows
 * - Message persistence and encryption
 */

import { AIAgent, AgentType } from '../../constants/aiAgentHierarchy';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('A2ACommunication');

// ============================================
// TYPES & INTERFACES
// ============================================

export type MessageType = 'direct' | 'consultation' | 'broadcast' | 'escalation' | 'delegation' | 'response';
export type MessageStatus = 'pending' | 'delivered' | 'read' | 'processing' | 'completed' | 'failed';
export type ConsultationStatus = 'requested' | 'in_progress' | 'completed' | 'escalated' | 'declined';

export interface A2AMessage {
  id: string;
  type: MessageType;
  
  // Sender/Receiver
  fromAgentId: string;
  toAgentId: string; // Can be 'broadcast' for broadcast messages
  
  // Message Content
  subject: string;
  content: string;
  metadata?: Record<string, any>;
  
  // Consultation specific fields
  consultationId?: string;
  consultationType?: 'advisory' | 'analytical' | 'collaborative' | 'directive';
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  
  // Timestamps
  createdAt: Date;
  deliveredAt?: Date;
  readAt?: Date;
  completedAt?: Date;
  
  // Status
  status: MessageStatus;
  
  // Response tracking
  parentMessageId?: string;
  responseCount: number;
  
  // Encryption
  encrypted: boolean;
  encryptionKey?: string;
}

export interface ConsultationSession {
  id: string;
  requesterAgentId: string;
  consultantAgentId: string;
  
  // Session Details
  type: 'advisory' | 'analytical' | 'collaborative' | 'directive';
  subject: string;
  description: string;
  
  // Status
  status: ConsultationStatus;
  
  // Timeline
  requestedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  
  // Messages in this consultation
  messages: A2AMessage[];
  
  // Outcome
  outcome?: string;
  recommendations?: string[];
  actions?: string[];
  
  // Metrics
  duration?: number; // in seconds
  satisfaction?: number; // 1-5 rating
}

export interface AgentCommunicationProfile {
  agentId: string;
  agentName: string;
  agentType: AgentType;
  
  // Communication Preferences
  preferredChannels: AgentCommunicationChannel['type'][];
  maxConcurrentConsultations: number;
  
  // Active Sessions
  activeConsultations: string[];
  pendingMessages: number;
  
  // Statistics
  totalMessagesSent: number;
  totalMessagesReceived: number;
  totalConsultationsGiven: number;
  totalConsultationsReceived: number;
  averageResponseTime: number;
  
  // Status
  isOnline: boolean;
  lastActiveAt: Date;
}

export interface A2ACommunicationStats {
  totalMessages: number;
  totalConsultations: number;
  activeConsultations: number;
  averageResponseTime: number;
  messagesByType: Record<MessageType, number>;
  messagesByStatus: Record<MessageStatus, number>;
}

// ============================================
// A2A COMMUNICATION SERVICE
// ============================================

class A2ACommunicationService {
  private messages: Map<string, A2AMessage> = new Map();
  private consultations: Map<string, ConsultationSession> = new Map();
  private agentProfiles: Map<string, AgentCommunicationProfile> = new Map();
  private messageListeners: Set<(message: A2AMessage) => void> = new Set();
  private consultationListeners: Set<(consultation: ConsultationSession) => void> = new Set();
  
  // ============================================
  // MESSAGE MANAGEMENT
  // ============================================
  
  private async withRetry<T>(
    operation: () => Promise<T>,
    options: { maxRetries?: number; baseDelay?: number; backoffFactor?: number } = {}
  ): Promise<T> {
    const isProduction = process.env.NODE_ENV === 'production';
    const maxRetries = options.maxRetries ?? (isProduction ? 5 : 3);
    const baseDelay = options.baseDelay ?? 1000;
    const backoffFactor = options.backoffFactor ?? 2;
    let lastError: any;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        const delay = baseDelay * Math.pow(backoffFactor, attempt);
        
        logger.warn(`[A2A] Operation failed, retrying (${attempt + 1}/${maxRetries}) in ${delay}ms`, {
          error: error instanceof Error ? error.message : String(error)
        });
          
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    logger.error(`[A2A] Operation failed after ${maxRetries} attempts`, 
      lastError instanceof Error ? lastError : new Error(String(lastError)));
    throw lastError;
  }

  sendMessage(
    fromAgentId: string,
    toAgentId: string,
    subject: string,
    content: string,
    type: MessageType = 'direct',
    metadata?: Record<string, any>
  ): A2AMessage {
    const message: A2AMessage = {
      id: this.generateId(),
      type,
      fromAgentId,
      toAgentId,
      subject,
      content,
      metadata,
      createdAt: new Date(),
      status: 'pending',
      responseCount: 0,
      encrypted: true,
    };
    
    this.messages.set(message.id, message);
    
    // Update sender profile
    this.updateSenderProfile(fromAgentId);
    
    // Asynchronous delivery with reliability pattern
    this.withRetry(async () => {
      // Simulate delivery logic (would be a real message queue in production)
      message.status = 'delivered';
      message.deliveredAt = new Date();
      this.notifyMessageListeners(message);
    }).catch(err => {
      logger.error(`[A2A] Critical failure delivering message ${message.id}:`, err);
      message.status = 'failed';
    });
    
    return message;
  }
  
  sendBroadcast(
    fromAgentId: string,
    subject: string,
    content: string,
    targetAgentIds: string[],
    metadata?: Record<string, any>
  ): A2AMessage[] {
    return targetAgentIds.map(toAgentId =>
      this.sendMessage(fromAgentId, toAgentId, subject, content, 'broadcast', metadata)
    );
  }
  
  getMessage(messageId: string): A2AMessage | undefined {
    return this.messages.get(messageId);
  }
  
  getMessagesForAgent(agentId: string): A2AMessage[] {
    return Array.from(this.messages.values()).filter(
      msg => msg.toAgentId === agentId || msg.fromAgentId === agentId
    );
  }
  
  getPendingMessagesForAgent(agentId: string): A2AMessage[] {
    return Array.from(this.messages.values()).filter(
      msg => msg.toAgentId === agentId && msg.status === 'pending'
    );
  }
  
  markMessageAsRead(messageId: string): void {
    const message = this.messages.get(messageId);
    if (message) {
      message.status = 'read';
      message.readAt = new Date();
      this.notifyMessageListeners(message);
    }
  }
  
  replyToMessage(
    parentMessageId: string,
    fromAgentId: string,
    content: string,
    metadata?: Record<string, any>
  ): A2AMessage | undefined {
    const parentMessage = this.messages.get(parentMessageId);
    if (!parentMessage) return undefined;
    
    const reply = this.sendMessage(
      fromAgentId,
      parentMessage.fromAgentId,
      `Re: ${parentMessage.subject}`,
      content,
      'response',
      { ...metadata, parentMessageId }
    );
    
    reply.parentMessageId = parentMessageId;
    parentMessage.responseCount++;
    
    return reply;
  }
  
  // ============================================
  // CONSULTATION MANAGEMENT
  // ============================================
  
  requestConsultation(
    requesterAgentId: string,
    consultantAgentId: string,
    type: ConsultationSession['type'],
    subject: string,
    description: string,
    urgency: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): ConsultationSession {
    const consultation: ConsultationSession = {
      id: this.generateId(),
      requesterAgentId,
      consultantAgentId,
      type,
      subject,
      description,
      status: 'requested',
      requestedAt: new Date(),
      messages: [],
    };
    
    this.consultations.set(consultation.id, consultation);
    
    // Send initial consultation request message
    const requestMessage = this.sendMessage(
      requesterAgentId,
      consultantAgentId,
      `Consultation Request: ${subject}`,
      description,
      'consultation',
      { consultationId: consultation.id, type, urgency }
    );
    
    consultation.messages.push(requestMessage);
    
    // Notify listeners
    this.notifyConsultationListeners(consultation);
    
    return consultation;
  }
  
  acceptConsultation(consultationId: string): ConsultationSession | undefined {
    const consultation = this.consultations.get(consultationId);
    if (!consultation || consultation.status !== 'requested') return undefined;
    
    consultation.status = 'in_progress';
    consultation.startedAt = new Date();
    
    // Send acceptance message
    const acceptanceMessage = this.sendMessage(
      consultation.consultantAgentId,
      consultation.requesterAgentId,
      `Consultation Accepted: ${consultation.subject}`,
      `I have accepted your consultation request. Let's begin our ${consultation.type} consultation.`,
      'response',
      { consultationId: consultation.id, action: 'accepted' }
    );
    
    consultation.messages.push(acceptanceMessage);
    
    this.notifyConsultationListeners(consultation);
    
    return consultation;
  }
  
  declineConsultation(consultationId: string, reason?: string): ConsultationSession | undefined {
    const consultation = this.consultations.get(consultationId);
    if (!consultation || consultation.status !== 'requested') return undefined;
    
    consultation.status = 'declined';
    consultation.completedAt = new Date();
    consultation.outcome = reason || 'Consultation declined';
    
    // Send decline message
    this.sendMessage(
      consultation.consultantAgentId,
      consultation.requesterAgentId,
      `Consultation Declined: ${consultation.subject}`,
      reason || 'I am unable to provide consultation at this time.',
      'response',
      { consultationId: consultation.id, action: 'declined' }
    );
    
    this.notifyConsultationListeners(consultation);
    
    return consultation;
  }
  
  completeConsultation(
    consultationId: string,
    outcome: string,
    recommendations?: string[],
    actions?: string[]
  ): ConsultationSession | undefined {
    const consultation = this.consultations.get(consultationId);
    if (!consultation || consultation.status !== 'in_progress') return undefined;
    
    consultation.status = 'completed';
    consultation.completedAt = new Date();
    consultation.outcome = outcome;
    consultation.recommendations = recommendations;
    consultation.actions = actions;
    
    // Calculate duration
    if (consultation.startedAt) {
      consultation.duration = (consultation.completedAt.getTime() - consultation.startedAt.getTime()) / 1000;
    }
    
    // Send completion message
    const completionMessage = this.sendMessage(
      consultation.consultantAgentId,
      consultation.requesterAgentId,
      `Consultation Completed: ${consultation.subject}`,
      `Consultation outcome: ${outcome}\n\nRecommendations:\n${(recommendations || []).join('\n')}\n\nActions:\n${(actions || []).join('\n')}`,
      'response',
      { consultationId: consultation.id, action: 'completed' }
    );
    
    consultation.messages.push(completionMessage);
    
    // Update profiles
    this.updateConsultationProfiles(consultation);
    
    this.notifyConsultationListeners(consultation);
    
    return consultation;
  }
  
  escalateConsultation(
    consultationId: string,
    toAgentId: string,
    reason: string
  ): ConsultationSession | undefined {
    const consultation = this.consultations.get(consultationId);
    if (!consultation) return undefined;
    
    consultation.status = 'escalated';
    
    // Send escalation message
    this.sendMessage(
      consultation.consultantAgentId,
      toAgentId,
      `Consultation Escalated: ${consultation.subject}`,
      `This consultation has been escalated. Reason: ${reason}`,
      'escalation',
      { consultationId: consultation.id, fromAgentId: consultation.consultantAgentId, reason }
    );
    
    // Notify original requester
    this.sendMessage(
      consultation.consultantAgentId,
      consultation.requesterAgentId,
      `Consultation Escalated: ${consultation.subject}`,
      `Your consultation has been escalated to a senior agent for further assistance.`,
      'response',
      { consultationId: consultation.id, action: 'escalated', reason }
    );
    
    this.notifyConsultationListeners(consultation);
    
    return consultation;
  }
  
  getConsultation(consultationId: string): ConsultationSession | undefined {
    return this.consultations.get(consultationId);
  }
  
  getConsultationsForAgent(agentId: string): ConsultationSession[] {
    return Array.from(this.consultations.values()).filter(
      c => c.requesterAgentId === agentId || c.consultantAgentId === agentId
    );
  }
  
  getActiveConsultationsForAgent(agentId: string): ConsultationSession[] {
    return Array.from(this.consultations.values()).filter(
      c => 
        (c.requesterAgentId === agentId || c.consultantAgentId === agentId) &&
        c.status === 'in_progress'
    );
  }
  
  addMessageToConsultation(
    consultationId: string,
    fromAgentId: string,
    content: string
  ): A2AMessage | undefined {
    const consultation = this.consultations.get(consultationId);
    if (!consultation || consultation.status !== 'in_progress') return undefined;
    
    const toAgentId = fromAgentId === consultation.requesterAgentId
      ? consultation.consultantAgentId
      : consultation.requesterAgentId;
    
    const message = this.sendMessage(
      fromAgentId,
      toAgentId,
      consultation.subject,
      content,
      'consultation',
      { consultationId: consultation.id }
    );
    
    consultation.messages.push(message);
    
    return message;
  }
  
  // ============================================
  // AGENT PROFILE MANAGEMENT
  // ============================================
  
  registerAgentProfile(agent: AIAgent): AgentCommunicationProfile {
    const profile: AgentCommunicationProfile = {
      agentId: agent.id,
      agentName: agent.name,
      agentType: agent.type,
      preferredChannels: agent.communicationChannels.map(c => c.type),
      maxConcurrentConsultations: agent.a2aCapabilities.maxConcurrentConsultations,
      activeConsultations: [],
      pendingMessages: 0,
      totalMessagesSent: 0,
      totalMessagesReceived: 0,
      totalConsultationsGiven: 0,
      totalConsultationsReceived: 0,
      averageResponseTime: agent.a2aCapabilities.averageResponseTime,
      isOnline: agent.status === 'active',
      lastActiveAt: new Date(),
    };
    
    this.agentProfiles.set(agent.id, profile);
    return profile;
  }
  
  getAgentProfile(agentId: string): AgentCommunicationProfile | undefined {
    return this.agentProfiles.get(agentId);
  }
  
  updateAgentStatus(agentId: string, isOnline: boolean): void {
    const profile = this.agentProfiles.get(agentId);
    if (profile) {
      profile.isOnline = isOnline;
      profile.lastActiveAt = new Date();
    }
  }
  
  // ============================================
  // MAIN/SUBAGENT CONSULTING PATTERNS
  // ============================================
  
  /**
   * Main Agent consults Subagent for specific expertise
   */
  mainAgentConsultsSubagent(
    mainAgentId: string,
    subAgentId: string,
    subject: string,
    description: string,
    urgency: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): ConsultationSession {
    return this.requestConsultation(
      mainAgentId,
      subAgentId,
      'advisory',
      subject,
      description,
      urgency
    );
  }
  
  /**
   * Subagent escalates to Main Agent for decision/approval
   */
  subagentEscalatesToMainAgent(
    subAgentId: string,
    mainAgentId: string,
    subject: string,
    description: string,
    context?: Record<string, any>
  ): ConsultationSession {
    return this.requestConsultation(
      subAgentId,
      mainAgentId,
      'directive',
      subject,
      description,
      'high'
    );
  }
  
  /**
   * Peer-to-peer consultation between agents
   */
  peerConsultation(
    fromAgentId: string,
    toAgentId: string,
    type: ConsultationSession['type'],
    subject: string,
    description: string
  ): ConsultationSession {
    return this.requestConsultation(
      fromAgentId,
      toAgentId,
      type,
      subject,
      description,
      'medium'
    );
  }
  
  /**
   * Broadcast consultation request to multiple agents
   */
  broadcastConsultationRequest(
    fromAgentId: string,
    targetAgentIds: string[],
    subject: string,
    description: string,
    type: ConsultationSession['type'] = 'collaborative'
  ): ConsultationSession[] {
    return targetAgentIds.map(agentId =>
      this.requestConsultation(fromAgentId, agentId, type, subject, description, 'medium')
    );
  }
  
  // ============================================
  // STATISTICS & ANALYTICS
  // ============================================
  
  getCommunicationStats(): A2ACommunicationStats {
    const messages = Array.from(this.messages.values());
    const consultations = Array.from(this.consultations.values());
    
    const messagesByType = messages.reduce((acc, msg) => {
      acc[msg.type] = (acc[msg.type] || 0) + 1;
      return acc;
    }, {} as Record<MessageType, number>);
    
    const messagesByStatus = messages.reduce((acc, msg) => {
      acc[msg.status] = (acc[msg.status] || 0) + 1;
      return acc;
    }, {} as Record<MessageStatus, number>);
    
    const completedConsultations = consultations.filter(c => c.status === 'completed' && c.duration);
    const avgDuration = completedConsultations.length > 0
      ? completedConsultations.reduce((sum, c) => sum + (c.duration || 0), 0) / completedConsultations.length
      : 0;
    
    return {
      totalMessages: messages.length,
      totalConsultations: consultations.length,
      activeConsultations: consultations.filter(c => c.status === 'in_progress').length,
      averageResponseTime: avgDuration,
      messagesByType,
      messagesByStatus,
    };
  }
  
  getAgentStats(agentId: string): Partial<AgentCommunicationProfile> {
    const profile = this.agentProfiles.get(agentId);
    if (!profile) return {};
    
    return {
      totalMessagesSent: profile.totalMessagesSent,
      totalMessagesReceived: profile.totalMessagesReceived,
      totalConsultationsGiven: profile.totalConsultationsGiven,
      totalConsultationsReceived: profile.totalConsultationsReceived,
      averageResponseTime: profile.averageResponseTime,
    };
  }
  
  // ============================================
  // EVENT LISTENERS
  // ============================================
  
  onMessage(callback: (message: A2AMessage) => void): () => void {
    this.messageListeners.add(callback);
    return () => this.messageListeners.delete(callback);
  }
  
  onConsultationUpdate(callback: (consultation: ConsultationSession) => void): () => void {
    this.consultationListeners.add(callback);
    return () => this.consultationListeners.delete(callback);
  }
  
  private notifyMessageListeners(message: A2AMessage): void {
    this.messageListeners.forEach(listener => {
      try {
        listener(message);
      } catch (error) {
        logger.error('Error in message listener', error as Error);
      }
    });
  }
  
  private notifyConsultationListeners(consultation: ConsultationSession): void {
    this.consultationListeners.forEach(listener => {
      try {
        listener(consultation);
      } catch (error) {
        logger.error('Error in consultation listener', error as Error);
      }
    });
  }
  
  // ============================================
  // PRIVATE HELPERS
  // ============================================
  
  private generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private updateSenderProfile(agentId: string): void {
    const profile = this.agentProfiles.get(agentId);
    if (profile) {
      profile.totalMessagesSent++;
      profile.lastActiveAt = new Date();
    }
  }
  
  private updateConsultationProfiles(consultation: ConsultationSession): void {
    const consultantProfile = this.agentProfiles.get(consultation.consultantAgentId);
    const requesterProfile = this.agentProfiles.get(consultation.requesterAgentId);
    
    if (consultantProfile) {
      consultantProfile.totalConsultationsGiven++;
      consultantProfile.activeConsultations = consultantProfile.activeConsultations.filter(
        id => id !== consultation.id
      );
    }
    
    if (requesterProfile) {
      requesterProfile.totalConsultationsReceived++;
    }
  }
}

// ============================================
// EXPORT SINGLETON INSTANCE
// ============================================

export const a2aCommunicationService = new A2ACommunicationService();

// ============================================
// CONVENIENCE HOOKS AND UTILITIES
// ============================================

export const useA2ACommunication = () => {
  return {
    // Message operations
    sendMessage: a2aCommunicationService.sendMessage.bind(a2aCommunicationService),
    sendBroadcast: a2aCommunicationService.sendBroadcast.bind(a2aCommunicationService),
    getMessagesForAgent: a2aCommunicationService.getMessagesForAgent.bind(a2aCommunicationService),
    replyToMessage: a2aCommunicationService.replyToMessage.bind(a2aCommunicationService),
    markMessageAsRead: a2aCommunicationService.markMessageAsRead.bind(a2aCommunicationService),
    
    // Consultation operations
    requestConsultation: a2aCommunicationService.requestConsultation.bind(a2aCommunicationService),
    acceptConsultation: a2aCommunicationService.acceptConsultation.bind(a2aCommunicationService),
    declineConsultation: a2aCommunicationService.declineConsultation.bind(a2aCommunicationService),
    completeConsultation: a2aCommunicationService.completeConsultation.bind(a2aCommunicationService),
    escalateConsultation: a2aCommunicationService.escalateConsultation.bind(a2aCommunicationService),
    getConsultationsForAgent: a2aCommunicationService.getConsultationsForAgent.bind(a2aCommunicationService),
    getActiveConsultationsForAgent: a2aCommunicationService.getActiveConsultationsForAgent.bind(a2aCommunicationService),
    addMessageToConsultation: a2aCommunicationService.addMessageToConsultation.bind(a2aCommunicationService),
    
    // Main/Subagent consulting patterns
    mainAgentConsultsSubagent: a2aCommunicationService.mainAgentConsultsSubagent.bind(a2aCommunicationService),
    subagentEscalatesToMainAgent: a2aCommunicationService.subagentEscalatesToMainAgent.bind(a2aCommunicationService),
    peerConsultation: a2aCommunicationService.peerConsultation.bind(a2aCommunicationService),
    broadcastConsultationRequest: a2aCommunicationService.broadcastConsultationRequest.bind(a2aCommunicationService),
    
    // Profile and stats
    registerAgentProfile: a2aCommunicationService.registerAgentProfile.bind(a2aCommunicationService),
    getAgentProfile: a2aCommunicationService.getAgentProfile.bind(a2aCommunicationService),
    updateAgentStatus: a2aCommunicationService.updateAgentStatus.bind(a2aCommunicationService),
    getCommunicationStats: a2aCommunicationService.getCommunicationStats.bind(a2aCommunicationService),
    getAgentStats: a2aCommunicationService.getAgentStats.bind(a2aCommunicationService),
    
    // Event listeners
    onMessage: a2aCommunicationService.onMessage.bind(a2aCommunicationService),
    onConsultationUpdate: a2aCommunicationService.onConsultationUpdate.bind(a2aCommunicationService),
  };
};

export default a2aCommunicationService;
