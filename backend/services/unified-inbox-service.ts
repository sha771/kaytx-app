import { AIServiceLogger } from '../lib/ai-service-logger';
import { logAudit } from '../lib/audit';
import { agentConsultingService } from './agent-consulting-service';
import { randomUUID } from 'crypto';

// ============================================
// ENHANCED UNIFIED INBOX TYPES
// ============================================

export type MessageChannel = 
  | 'whatsapp' | 'telegram' | 'instagram' | 'facebook' | 'twitter' | 'linkedin'
  | 'email' | 'sms' | 'slack' | 'teams' | 'discord' | 'messenger'
  | 'voice' | 'video' | 'webchat' | 'api' | 'push';

export type MessageStatus = 
  | 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | 'bounced' 
  | 'scheduled' | 'draft' | 'archived' | 'deleted';

export type MessagePriority = 'low' | 'normal' | 'high' | 'urgent' | 'critical';

export type AIProcessingStatus = 
  | 'pending' | 'processing' | 'analyzing' | 'responding' 
  | 'completed' | 'escalated' | 'failed' | 'human_review';

export interface EnhancedMessage {
  id: string;
  correlationId: string;
  
  // Core Content
  content: {
    text: string;
    html?: string;
    subject?: string;
    metadata: Record<string, any>;
  };
  
  // Sender Info
  sender: {
    id: string;
    name: string;
    avatar?: string;
    email?: string;
    phone?: string;
    channelId: string;
    isVerified: boolean;
    isInternal: boolean;
    agentId?: string; // If sent by AI agent
  };
  
  // Recipient Info
  recipients: {
    to: Recipient[];
    cc?: Recipient[];
    bcc?: Recipient[];
  };
  
  // Channel & Routing
  channel: MessageChannel;
  threadId?: string;
  parentMessageId?: string;
  conversationId: string;
  
  // Status & Timing
  status: MessageStatus;
  priority: MessagePriority;
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  scheduledAt?: Date;
  
  // Attachments & Media
  attachments: EnhancedAttachment[];
  reactions: MessageReaction[];
  
  // AI Processing
  aiProcessing: {
    status: AIProcessingStatus;
    assignedAgentId?: string;
    assignedAgentName?: string;
    analysis?: MessageAnalysis;
    response?: AIResponse;
    consultedAgents?: string[];
    confidence?: number;
    requiresHumanReview: boolean;
    reviewReason?: string;
  };
  
  // Smart Features
  smartFeatures: {
    summary?: string;
    sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
    intent: string[];
    entities: ExtractedEntity[];
    language: string;
    translatedText?: string;
    categories: string[];
    tags: string[];
    priorityScore: number;
  };
  
  // Actions & Follow-ups
  actions: {
    suggested: SuggestedAction[];
    completed: CompletedAction[];
    scheduled: ScheduledAction[];
  };
  
  // Engagement Tracking
  engagement: {
    openCount: number;
    clickCount: number;
    replyCount: number;
    forwardCount: number;
    reactions: Record<string, number>;
  };
}

export interface Recipient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  channelId: string;
  isInternal: boolean;
}

export interface EnhancedAttachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'location' | 'contact' | 'poll' | 'other';
  name: string;
  url: string;
  size: number;
  mimeType: string;
  thumbnailUrl?: string;
  duration?: number; // For audio/video
  metadata: Record<string, any>;
}

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface ExtractedEntity {
  type: 'person' | 'organization' | 'location' | 'date' | 'time' | 'money' | 'product' | 'email' | 'phone' | 'url' | 'other';
  value: string;
  confidence: number;
  startIndex: number;
  endIndex: number;
}

export interface MessageAnalysis {
  intent: string;
  urgency: number;
  sentiment: {
    overall: number;
    positive: number;
    negative: number;
    neutral: number;
  };
  topics: string[];
  keyPhrases: string[];
  suggestedResponseType: string;
  requiresConsultation: boolean;
  consultationTopics?: string[];
  relatedMessages?: string[];
}

export interface AIResponse {
  text: string;
  html?: string;
  confidence: number;
  sources: string[];
  suggestedActions: SuggestedAction[];
  consultedAgents: string[];
  reasoning: string;
  alternatives: string[];
}

export interface SuggestedAction {
  id: string;
  type: 'reply' | 'forward' | 'schedule' | 'escalate' | 'tag' | 'archive' | 'delete' | 'consult' | 'delegate';
  title: string;
  description: string;
  confidence: number;
  metadata: Record<string, any>;
}

export interface CompletedAction {
  id: string;
  type: string;
  title: string;
  completedBy: string;
  completedAt: Date;
  result: any;
}

export interface ScheduledAction {
  id: string;
  type: string;
  title: string;
  scheduledFor: Date;
  scheduledBy: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface UnifiedConversation {
  id: string;
  correlationId: string;
  
  // Participants
  participants: ConversationParticipant[];
  
  // Channel Info
  primaryChannel: MessageChannel;
  connectedChannels: MessageChannel[];
  
  // Conversation State
  title?: string;
  status: 'active' | 'archived' | 'merged' | 'spam' | 'blocked';
  priority: MessagePriority;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
  resolvedAt?: Date;
  
  // Statistics
  stats: {
    messageCount: number;
    unreadCount: number;
    responseTime: number; // Average in seconds
    resolutionTime?: number;
    satisfactionScore?: number;
  };
  
  // AI Management
  aiManagement: {
    isAIPilot: boolean;
    primaryAgentId?: string;
    consultedAgents: string[];
    autoResponseEnabled: boolean;
    escalationThreshold: number;
  };
  
  // Organization
  labels: string[];
  tags: string[];
  categories: string[];
  customFields: Record<string, any>;
}

export interface ConversationParticipant {
  id: string;
  name: string;
  avatar?: string;
  channelId: string;
  isInternal: boolean;
  role: 'customer' | 'agent' | 'ai_agent' | 'observer';
  agentId?: string;
  joinedAt: Date;
  lastSeenAt?: Date;
}

export interface InboxView {
  id: string;
  name: string;
  filters: InboxFilter;
  sortBy: 'date' | 'priority' | 'channel' | 'unread' | 'status';
  groupBy?: 'channel' | 'date' | 'priority' | 'agent' | 'none';
  columns: string[];
  isDefault: boolean;
  isShared: boolean;
  ownerId?: string;
}

export interface InboxFilter {
  channels?: MessageChannel[];
  status?: MessageStatus[];
  priority?: MessagePriority[];
  assignedTo?: string[];
  tags?: string[];
  categories?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
  isUnread?: boolean;
  requiresHumanReview?: boolean;
  aiProcessed?: boolean;
}

// ============================================
// UNIFIED INBOX SERVICE
// ============================================

class UnifiedInboxService {
  private messages: Map<string, EnhancedMessage> = new Map();
  private conversations: Map<string, UnifiedConversation> = new Map();
  private views: Map<string, InboxView> = new Map();
  
  private messageQueue: EnhancedMessage[] = [];
  private processingInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startProcessingLoop();
  }

  // ============================================
  // MESSAGE RECEIVING & ROUTING
  // ============================================
  
  async receiveMessage(
    channel: MessageChannel,
    content: {
      text: string;
      html?: string;
      subject?: string;
    },
    sender: {
      id: string;
      name: string;
      email?: string;
      phone?: string;
      channelId: string;
    },
    recipients: Recipient[],
    options: {
      attachments?: EnhancedAttachment[];
      threadId?: string;
      parentMessageId?: string;
      metadata?: Record<string, any>;
    } = {}
  ): Promise<EnhancedMessage> {
    const correlationId = randomUUID();
    const messageId = randomUUID();
    const conversationId = await this.getOrCreateConversationId(channel, sender, recipients);
    const now = new Date();

    // Detect language and translate if needed
    const language = await this.detectLanguage(content.text);
    const translatedText = language !== 'en' ? await this.translateText(content.text, 'en') : undefined;

    // Extract entities and analyze sentiment
    const [entities, sentiment, intent] = await Promise.all([
      this.extractEntities(content.text),
      this.analyzeSentiment(content.text),
      this.detectIntent(content.text)
    ]);

    const message: EnhancedMessage = {
      id: messageId,
      correlationId,
      content: {
        text: content.text,
        html: content.html,
        subject: content.subject,
        metadata: options.metadata || {}
      },
      sender: {
        id: sender.id,
        name: sender.name,
        email: sender.email,
        phone: sender.phone,
        channelId: sender.channelId,
        isVerified: false,
        isInternal: false
      },
      recipients: {
        to: recipients,
        cc: [],
        bcc: []
      },
      channel,
      threadId: options.threadId,
      parentMessageId: options.parentMessageId,
      conversationId,
      status: 'pending',
      priority: 'normal',
      createdAt: now,
      updatedAt: now,
      attachments: options.attachments || [],
      reactions: [],
      aiProcessing: {
        status: 'pending',
        requiresHumanReview: false
      },
      smartFeatures: {
        sentiment,
        intent: [intent],
        entities,
        language,
        translatedText,
        categories: [],
        tags: [],
        priorityScore: 0
      },
      actions: {
        suggested: [],
        completed: [],
        scheduled: []
      },
      engagement: {
        openCount: 0,
        clickCount: 0,
        replyCount: 0,
        forwardCount: 0,
        reactions: {}
      }
    };

    this.messages.set(messageId, message);
    this.messageQueue.push(message);

    // Update conversation
    await this.updateConversationWithMessage(conversationId, message);

    // Log
    AIServiceLogger.logAgentEvent('message_received', 'inbox', {
      messageId,
      channel,
      sender: sender.id,
      conversationId,
      correlationId
    });

    return message;
  }

  // ============================================
  // AI PROCESSING & AGENT CONSULTATION
  // ============================================
  
  async processMessageWithAI(messageId: string): Promise<EnhancedMessage> {
    const message = this.messages.get(messageId);
    if (!message) throw new Error(`Message ${messageId} not found`);

    message.aiProcessing.status = 'processing';
    
    try {
      // 1. Analyze the message
      const analysis = await this.analyzeMessage(message);
      message.aiProcessing.analysis = analysis;

      // 2. Determine if consultation is needed
      if (analysis.requiresConsultation && analysis.consultationTopics) {
        message.aiProcessing.status = 'analyzing';
        
        // Find expert agents for each topic
        const consultedAgents: string[] = [];
        for (const topic of analysis.consultationTopics) {
          const experts = agentConsultingService.findConsultantsByExpertise(topic);
          if (experts.length > 0) {
            const expert = experts[0];
            consultedAgents.push(expert.agentId);
            
            // Initiate consultation
            await agentConsultingService.initiateConsultation(
              'inbox-processor',
              expert.agentId,
              `Message Processing: ${topic}`,
              `I need help responding to a message. Topic: ${topic}\n\nMessage: ${message.content.text}`,
              {
                type: 'advisory',
                priority: message.priority === 'urgent' || message.priority === 'critical' ? 'high' : 'medium',
                context: {
                  messageId: message.id,
                  conversationId: message.conversationId,
                  channel: message.channel,
                  sentiment: message.smartFeatures.sentiment
                }
              }
            );
          }
        }
        
        message.aiProcessing.consultedAgents = consultedAgents;
      }

      // 3. Generate AI response
      const response = await this.generateAIResponse(message);
      message.aiProcessing.response = response;
      message.aiProcessing.confidence = response.confidence;

      // 4. Determine if human review is needed
      if (response.confidence < 0.7 || message.priority === 'urgent' || message.priority === 'critical') {
        message.aiProcessing.requiresHumanReview = true;
        message.aiProcessing.reviewReason = response.confidence < 0.7 
          ? 'Low confidence response' 
          : 'High priority message requires human oversight';
      }

      // 5. Generate suggested actions
      message.actions.suggested = await this.generateSuggestedActions(message, response);

      message.aiProcessing.status = 'completed';
      message.updatedAt = new Date();

    } catch (error) {
      message.aiProcessing.status = 'failed';
      AIServiceLogger.logError('ai_processing_failed', 'inbox', error as Error, {
        messageId,
        correlationId: message.correlationId
      });
    }

    return message;
  }

  private async analyzeMessage(message: EnhancedMessage): Promise<MessageAnalysis> {
    // In production, this would call the AI service
    const intents = message.smartFeatures.intent;
    const urgency = this.calculateUrgency(message);
    
    return {
      intent: intents[0] || 'general',
      urgency,
      sentiment: {
        overall: this.sentimentToScore(message.smartFeatures.sentiment),
        positive: message.smartFeatures.sentiment === 'positive' ? 0.8 : 0.1,
        negative: message.smartFeatures.sentiment === 'negative' ? 0.8 : 0.1,
        neutral: message.smartFeatures.sentiment === 'neutral' ? 0.8 : 0.1
      },
      topics: this.extractTopics(message.content.text),
      keyPhrases: message.smartFeatures.entities.map(e => e.value),
      suggestedResponseType: this.determineResponseType(message),
      requiresConsultation: urgency > 0.7 || message.priority === 'urgent',
      consultationTopics: urgency > 0.7 ? this.identifyConsultationTopics(message) : undefined
    };
  }

  private async generateAIResponse(message: EnhancedMessage): Promise<AIResponse> {
    // In production, this would call the AI agent service with agent consultation
    // For now, we'll generate a placeholder response
    
    const consultedAgents: string[] = message.aiProcessing.consultedAgents || [];
    
    return {
      text: `Thank you for your message. This is an automated response while we review your inquiry. ` +
            `Consulted ${consultedAgents.length} specialist(s) for guidance.`,
      confidence: consultedAgents.length > 0 ? 0.85 : 0.7,
      sources: consultedAgents,
      suggestedActions: [
        {
          id: randomUUID(),
          type: 'reply',
          title: 'Send automated response',
          description: 'Send the AI-generated response to the customer',
          confidence: 0.8,
          metadata: {}
        }
      ],
      consultedAgents,
      reasoning: 'Generated response based on message analysis and agent consultation',
      alternatives: []
    };
  }

  private async generateSuggestedActions(message: EnhancedMessage, response: AIResponse): Promise<SuggestedAction[]> {
    const actions: SuggestedAction[] = [];
    
    // Always suggest reply
    actions.push({
      id: randomUUID(),
      type: 'reply',
      title: 'Send AI Response',
      description: 'Send the generated response to the customer',
      confidence: response.confidence,
      metadata: { responseText: response.text }
    });

    // Suggest escalation for urgent/negative messages
    if (message.priority === 'urgent' || message.smartFeatures.sentiment === 'negative') {
      actions.push({
        id: randomUUID(),
        type: 'escalate',
        title: 'Escalate to Human Agent',
        description: 'Forward to a human agent for immediate attention',
        confidence: 0.9,
        metadata: { priority: message.priority }
      });
    }

    // Suggest consultation for complex topics
    if (message.aiProcessing.analysis?.requiresConsultation) {
      actions.push({
        id: randomUUID(),
        type: 'consult',
        title: 'Consult Specialist Agents',
        description: 'Get additional input from specialized AI agents',
        confidence: 0.85,
        metadata: { topics: message.aiProcessing.analysis.consultationTopics }
      });
    }

    return actions;
  }

  // ============================================
  // CONVERSATION MANAGEMENT
  // ============================================
  
  private async getOrCreateConversationId(
    channel: MessageChannel,
    sender: { id: string; channelId: string },
    recipients: Recipient[]
  ): Promise<string> {
    // Look for existing conversation
    for (const [id, conv] of this.conversations.entries()) {
      const hasParticipant = conv.participants.some(p => 
        p.channelId === sender.channelId || recipients.some(r => r.channelId === p.channelId)
      );
      if (hasParticipant && conv.primaryChannel === channel) {
        return id;
      }
    }

    // Create new conversation
    const conversationId = randomUUID();
    const now = new Date();

    const conversation: UnifiedConversation = {
      id: conversationId,
      correlationId: randomUUID(),
      participants: [
        {
          id: sender.id,
          name: sender.name,
          channelId: sender.channelId,
          isInternal: false,
          role: 'customer',
          joinedAt: now
        },
        ...recipients.map(r => ({
          id: r.id,
          name: r.name,
          channelId: r.channelId,
          isInternal: r.isInternal,
          role: (r.isInternal ? 'agent' : 'customer') as 'customer' | 'agent',
          joinedAt: now
        }))
      ],
      primaryChannel: channel,
      connectedChannels: [channel],
      status: 'active',
      priority: 'normal',
      createdAt: now,
      updatedAt: now,
      lastMessageAt: now,
      stats: {
        messageCount: 0,
        unreadCount: 0,
        responseTime: 0
      },
      aiManagement: {
        isAIPilot: true,
        consultedAgents: [],
        autoResponseEnabled: true,
        escalationThreshold: 0.7
      },
      labels: [],
      tags: [],
      categories: [],
      customFields: {}
    };

    this.conversations.set(conversationId, conversation);
    return conversationId;
  }

  private async updateConversationWithMessage(
    conversationId: string,
    message: EnhancedMessage
  ): Promise<void> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) return;

    conversation.lastMessageAt = new Date();
    conversation.stats.messageCount++;
    conversation.stats.unreadCount++;
    conversation.updatedAt = new Date();

    // Update priority based on message
    if (message.priority === 'urgent' || message.priority === 'critical') {
      conversation.priority = message.priority;
    }
  }

  // ============================================
  // INBOX VIEWS & FILTERING
  // ============================================
  
  createView(view: Omit<InboxView, 'id'>): InboxView {
    const newView: InboxView = {
      ...view,
      id: randomUUID()
    };
    this.views.set(newView.id, newView);
    return newView;
  }

  getMessagesForView(viewId: string, userId: string): EnhancedMessage[] {
    const view = this.views.get(viewId);
    if (!view) return [];
    
    // Check access
    if (!view.isShared && view.ownerId !== userId) return [];

    let messages = Array.from(this.messages.values());

    // Apply filters
    if (view.filters.channels) {
      messages = messages.filter(m => view.filters.channels!.includes(m.channel));
    }
    if (view.filters.status) {
      messages = messages.filter(m => view.filters.status!.includes(m.status));
    }
    if (view.filters.priority) {
      messages = messages.filter(m => view.filters.priority!.includes(m.priority));
    }
    if (view.filters.assignedTo) {
      messages = messages.filter(m => 
        m.aiProcessing.assignedAgentId && 
        view.filters.assignedTo!.includes(m.aiProcessing.assignedAgentId)
      );
    }
    if (view.filters.isUnread) {
      messages = messages.filter(m => m.status !== 'read');
    }
    if (view.filters.requiresHumanReview) {
      messages = messages.filter(m => m.aiProcessing.requiresHumanReview);
    }
    if (view.filters.aiProcessed) {
      messages = messages.filter(m => m.aiProcessing.status === 'completed');
    }

    // Sort
    messages.sort((a, b) => {
      switch (view.sortBy) {
        case 'date':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'priority':
          const priorityOrder = { critical: 4, urgent: 3, high: 2, normal: 1, low: 0 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    return messages;
  }

  // ============================================
  // HELPER METHODS
  // ============================================
  
  private startProcessingLoop(): void {
    this.processingInterval = setInterval(async () => {
      while (this.messageQueue.length > 0) {
        const message = this.messageQueue.shift();
        if (message) {
          await this.processMessageWithAI(message.id);
        }
      }
    }, 1000);
  }

  private async detectLanguage(text: string): Promise<string> {
    // In production, use a language detection service
    return 'en';
  }

  private async translateText(text: string, targetLang: string): Promise<string> {
    // In production, use a translation service
    return text;
  }

  private async analyzeSentiment(text: string): Promise<'positive' | 'negative' | 'neutral' | 'mixed'> {
    // In production, use a sentiment analysis service
    return 'neutral';
  }

  private async detectIntent(text: string): Promise<string> {
    // In production, use intent detection
    return 'general';
  }

  private async extractEntities(text: string): Promise<ExtractedEntity[]> {
    // In production, use NER service
    return [];
  }

  private calculateUrgency(message: EnhancedMessage): number {
    let urgency = 0;
    
    // Check for urgency keywords
    const urgentKeywords = ['urgent', 'asap', 'emergency', 'critical', 'immediately'];
    if (urgentKeywords.some(k => message.content.text.toLowerCase().includes(k))) {
      urgency += 0.3;
    }
    
    // Check sentiment
    if (message.smartFeatures.sentiment === 'negative') {
      urgency += 0.2;
    }
    
    // Check priority
    if (message.priority === 'urgent') urgency += 0.3;
    if (message.priority === 'critical') urgency += 0.5;
    
    return Math.min(urgency, 1);
  }

  private sentimentToScore(sentiment: string): number {
    switch (sentiment) {
      case 'positive': return 0.8;
      case 'negative': return -0.8;
      case 'mixed': return 0;
      default: return 0;
    }
  }

  private extractTopics(text: string): string[] {
    // In production, use topic extraction
    return [];
  }

  private determineResponseType(message: EnhancedMessage): string {
    const text = message.content.text.toLowerCase();
    
    if (text.includes('?')) return 'question';
    if (text.includes('problem') || text.includes('issue')) return 'support';
    if (text.includes('buy') || text.includes('purchase')) return 'sales';
    if (text.includes('feedback') || text.includes('review')) return 'feedback';
    
    return 'general';
  }

  private identifyConsultationTopics(message: EnhancedMessage): string[] {
    const topics: string[] = [];
    const text = message.content.text.toLowerCase();
    
    // Map keywords to expertise areas
    if (text.includes('price') || text.includes('cost')) topics.push('pricing');
    if (text.includes('technical') || text.includes('bug')) topics.push('technical_support');
    if (text.includes('return') || text.includes('refund')) topics.push('billing');
    if (text.includes('feature') || text.includes('product')) topics.push('product');
    if (text.includes('marketing') || text.includes('campaign')) topics.push('marketing');
    
    return topics;
  }

  // ============================================
  // PUBLIC API
  // ============================================
  
  getMessage(messageId: string): EnhancedMessage | null {
    return this.messages.get(messageId) || null;
  }

  getConversation(conversationId: string): UnifiedConversation | null {
    return this.conversations.get(conversationId) || null;
  }

  getConversationsForUser(userId: string): UnifiedConversation[] {
    return Array.from(this.conversations.values())
      .filter(c => c.participants.some(p => p.id === userId))
      .sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());
  }

  async sendResponse(
    messageId: string,
    responseText: string,
    options: {
      attachments?: EnhancedAttachment[];
      agentId?: string;
      asDraft?: boolean;
    } = {}
  ): Promise<EnhancedMessage> {
    const originalMessage = this.messages.get(messageId);
    if (!originalMessage) throw new Error(`Message ${messageId} not found`);

    const response: EnhancedMessage = {
      ...originalMessage,
      id: randomUUID(),
      correlationId: randomUUID(),
      content: {
        text: responseText,
        metadata: {}
      },
      sender: {
        id: options.agentId || 'system',
        name: options.agentId ? 'AI Agent' : 'System',
        channelId: 'system',
        isVerified: true,
        isInternal: true,
        agentId: options.agentId
      },
      recipients: {
        to: [{
          id: originalMessage.sender.id,
          name: originalMessage.sender.name,
          channelId: originalMessage.sender.channelId,
          isInternal: originalMessage.sender.isInternal
        }]
      },
      parentMessageId: messageId,
      status: options.asDraft ? 'draft' : 'sent',
      createdAt: new Date(),
      updatedAt: new Date(),
      sentAt: options.asDraft ? undefined : new Date(),
      attachments: options.attachments || [],
      reactions: [],
      aiProcessing: {
        status: 'completed',
        requiresHumanReview: false
      },
      smartFeatures: {
        sentiment: 'neutral',
        intent: ['response'],
        entities: [],
        language: originalMessage.smartFeatures.language,
        categories: [],
        tags: [],
        priorityScore: 0
      },
      actions: {
        suggested: [],
        completed: [],
        scheduled: []
      },
      engagement: {
        openCount: 0,
        clickCount: 0,
        replyCount: 0,
        forwardCount: 0,
        reactions: {}
      }
    };

    this.messages.set(response.id, response);
    
    // Update original message
    originalMessage.engagement.replyCount++;
    originalMessage.status = 'read';
    originalMessage.readAt = new Date();

    // Update conversation
    await this.updateConversationWithMessage(originalMessage.conversationId, response);

    return response;
  }

  getStats(): {
    totalMessages: number;
    totalConversations: number;
    activeConversations: number;
    pendingAIProcessing: number;
    requiresHumanReview: number;
  } {
    const allMessages = Array.from(this.messages.values());
    const allConversations = Array.from(this.conversations.values());

    return {
      totalMessages: allMessages.length,
      totalConversations: allConversations.length,
      activeConversations: allConversations.filter(c => c.status === 'active').length,
      pendingAIProcessing: allMessages.filter(m => m.aiProcessing.status === 'pending').length,
      requiresHumanReview: allMessages.filter(m => m.aiProcessing.requiresHumanReview).length
    };
  }

  destroy(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
    }
    this.messages.clear();
    this.conversations.clear();
    this.views.clear();
    this.messageQueue = [];
    this.removeAllListeners();
  }
}

// ============================================
// EXPORT SINGLETON
// ============================================

export const unifiedInboxService = new UnifiedInboxService();

export default unifiedInboxService;
