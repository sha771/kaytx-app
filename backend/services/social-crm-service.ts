import { AIServiceLogger, LogLevel } from '../lib/ai-service-logger';
import { logAudit } from '../lib/audit';
import { agentConsultingService } from './agent-consulting-service';
import { randomUUID } from 'crypto';

// ============================================
// SOCIAL CRM TYPES
// ============================================

export type ContactStatus = 'lead' | 'prospect' | 'customer' | 'churned' | 'inactive' | 'vip';
export type InteractionType = 
  | 'email' | 'call' | 'meeting' | 'message' | 'social' | 'web' 
  | 'support' | 'purchase' | 'review' | 'referral' | 'event';
export type InteractionChannel = 
  | 'email' | 'phone' | 'whatsapp' | 'sms' | 'linkedin' | 'twitter' 
  | 'facebook' | 'instagram' | 'website' | 'app' | 'in_person';
export type DealStage = 
  | 'prospecting' | 'qualification' | 'needs_analysis' | 'value_proposition' 
  | 'id_decision_makers' | 'perception_analysis' | 'proposal' | 'negotiation' 
  | 'closed_won' | 'closed_lost' | 'closed_nurturing';

export interface SocialCRMContact {
  id: string;
  correlationId: string;
  
  // Identity
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    avatar?: string;
    company?: string;
    jobTitle?: string;
    department?: string;
  };
  
  // Social Profiles
  socialProfiles: SocialProfile[];
  
  // Status & Segmentation
  status: ContactStatus;
  leadScore: number; // 0-100
  leadTemperature: 'cold' | 'warm' | 'hot';
  
  // Engagement
  engagement: ContactEngagement;
  
  // History
  interactions: ContactInteraction[];
  purchases: Purchase[];
  supportTickets: SupportTicket[];
  
  // Relationships
  relationships: {
    accountManager?: string;
    salesRep?: string;
    supportRep?: string;
    referredBy?: string;
    referrals: string[];
  };
  
  // AI Insights
  aiInsights: ContactAIInsights;
  
  // Preferences
  preferences: ContactPreferences;
  
  // Metadata
  tags: string[];
  customFields: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  lastContactedAt?: Date;
}

export interface SocialProfile {
  id: string;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'github' | 'other';
  username: string;
  url: string;
  followers: number;
  following: number;
  posts: number;
  bio?: string;
  location?: string;
  isVerified: boolean;
  lastSyncedAt: Date;
  
  // Social Data
  recentPosts: SocialPost[];
  interests: string[];
  influence: {
    score: number; // 0-100
    level: 'low' | 'medium' | 'high' | 'expert';
    topics: string[];
  };
}

export interface SocialPost {
  id: string;
  content: string;
  timestamp: Date;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  sentiment: 'positive' | 'negative' | 'neutral';
  topics: string[];
  mentions: string[];
}

export interface ContactEngagement {
  totalInteractions: number;
  firstInteraction: Date;
  lastInteraction: Date;
  
  byChannel: Record<InteractionChannel, number>;
  byType: Record<InteractionType, number>;
  
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'rarely';
  trend: 'increasing' | 'stable' | 'decreasing' | 'dormant';
  
  score: number; // 0-100
  loyaltyScore: number; // 0-100
  churnRisk: number; // 0-1
}

export interface ContactInteraction {
  id: string;
  type: InteractionType;
  channel: InteractionChannel;
  timestamp: Date;
  duration?: number; // minutes
  
  // Participants
  contactId: string;
  agentId?: string;
  aiAgentIds: string[];
  
  // Content
  summary: string;
  transcript?: string;
  notes: string;
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  
  // Outcome
  outcome: 'successful' | 'unsuccessful' | 'pending' | 'no_resolution';
  followUpRequired: boolean;
  followUpDate?: Date;
  
  // AI Analysis
  aiAnalysis: {
    intent: string;
    topics: string[];
    urgency: number;
    nextBestAction: string;
    consultedAgents: string[];
  };
  
  // Attachments
  attachments: string[];
}

export interface Purchase {
  id: string;
  orderNumber: string;
  date: Date;
  amount: number;
  currency: string;
  products: string[];
  status: 'completed' | 'pending' | 'cancelled' | 'refunded';
  
  // Attribution
  source: string;
  campaign?: string;
  referrer?: string;
  
  // AI Insights
  aiInsights: {
    predictedLifetimeValue: number;
    purchasePattern: string;
    nextPurchaseLikelihood: number;
    upsellOpportunities: string[];
  };
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
  category: string;
  
  createdAt: Date;
  resolvedAt?: Date;
  
  assignedTo?: string;
  aiHandled: boolean;
  aiAgentsInvolved: string[];
  
  satisfaction?: number; // 0-5
}

export interface ContactAIInsights {
  // Predictive
  churnRisk: number;
  nextPurchaseProbability: number;
  lifetimeValue: {
    predicted: number;
    confidence: number;
  };
  
  // Recommendations
  nextBestActions: NextBestAction[];
  contentRecommendations: string[];
  productRecommendations: string[];
  
  // Segmentation
  persona: string;
  journeyStage: string;
  
  // Social Intelligence
  socialInfluence: {
    canBeAdvocate: boolean;
    advocacyLikelihood: number;
    preferredAdvocacyChannel?: string;
  };
  
  // Consultation History
  consultedAgents: string[];
  lastConsultedAt?: Date;
}

export interface NextBestAction {
  action: string;
  channel: InteractionChannel;
  timing: 'immediate' | 'today' | 'this_week' | 'this_month';
  priority: number;
  expectedOutcome: string;
  confidence: number;
}

export interface ContactPreferences {
  communication: {
    preferredChannel: InteractionChannel;
    preferredTime?: string;
    timezone: string;
    language: string;
    frequency: 'high' | 'medium' | 'low';
    marketingConsent: boolean;
  };
  
  content: {
    interests: string[];
    preferredTopics: string[];
    contentFormats: string[];
  };
  
  product: {
    categories: string[];
    priceRange: [number, number];
    purchaseFrequency: string;
  };
}

export interface CRMSalesPipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
  deals: CRMSalesDeal[];
  
  // Performance
  stats: {
    totalDeals: number;
    totalValue: number;
    avgDealSize: number;
    winRate: number;
    avgSalesCycle: number; // days
    
    byStage: Record<DealStage, {
      count: number;
      value: number;
      avgAge: number;
    }>;
  };
  
  // AI Features
  aiFeatures: {
    forecastingEnabled: boolean;
    dealScoringEnabled: boolean;
    nextBestActionEnabled: boolean;
    consultedAgents: string[];
  };
}

export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  probability: number; // Win probability at this stage
  
  // Requirements
  requiredFields: string[];
  exitCriteria: string[];
  
  // Automation
  autoActions: string[];
  notifications: string[];
}

export interface CRMSalesDeal {
  id: string;
  pipelineId: string;
  
  // Basic Info
  name: string;
  description: string;
  value: number;
  currency: string;
  
  // Contacts
  primaryContactId: string;
  decisionMakers: string[];
  influencers: string[];
  
  // Status
  stage: DealStage;
  status: 'open' | 'won' | 'lost' | 'stalled';
  probability: number;
  
  // Timeline
  createdAt: Date;
  expectedCloseDate: Date;
  actualCloseDate?: Date;
  lastActivityAt: Date;
  
  // AI Analysis
  aiAnalysis: {
    score: number; // 0-100
    winProbability: number;
    riskFactors: string[];
    recommendedActions: string[];
    stallRisk: number;
    consultedAgents: string[];
  };
  
  // Activities
  activities: DealActivity[];
  
  // Competitors
  competitors: string[];
  competitivePosition: 'leading' | 'neutral' | 'behind';
  
  // Source
  source: string;
  campaign?: string;
}

export interface DealActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'demo' | 'proposal' | 'negotiation' | 'note';
  timestamp: Date;
  description: string;
  outcome?: string;
  nextStep?: string;
  agentId?: string;
  aiAssisted: boolean;
}

export interface CRMCampaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'content' | 'event' | 'webinar' | 'referral' | 'multi';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  
  // Targeting
  targetAudience: {
    segments: string[];
    filters: Record<string, any>;
    estimatedReach: number;
  };
  
  // Timeline
  startDate: Date;
  endDate: Date;
  
  // Performance
  performance: CampaignPerformance;
  
  // AI
  aiConfig: {
    personalizationEnabled: boolean;
    aBTestingEnabled: boolean;
    optimizationEnabled: boolean;
    consultedAgents: string[];
  };
}

export interface CampaignPerformance {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  
  rates: {
    open: number;
    click: number;
    conversion: number;
    bounce: number;
    unsubscribe: number;
  };
  
  revenue: number;
  roi: number;
}

// ============================================
// SOCIAL CRM SERVICE
// ============================================

class SocialCRMService {
  private contacts: Map<string, SocialCRMContact> = new Map();
  private pipelines: Map<string, CRMSalesPipeline> = new Map();
  private deals: Map<string, CRMSalesDeal> = new Map();
  private campaigns: Map<string, CRMCampaign> = new Map();
  
  private syncInterval: ReturnType<typeof setInterval> | null = null;
  private scoringInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.startSyncProcesses();
    this.startLeadScoring();
  }

  // ============================================
  // CONTACT MANAGEMENT
  // ============================================
  
  async createContact(
    profile: Omit<SocialCRMContact['profile'], never>,
    options: {
      socialProfiles?: Partial<SocialProfile>[];
      source?: string;
      tags?: string[];
      configureAI?: boolean;
    } = {}
  ): Promise<SocialCRMContact> {
    const contactId = randomUUID();
    const correlationId = randomUUID();
    const now = new Date();

    const contact: SocialCRMContact = {
      id: contactId,
      correlationId,
      profile: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        avatar: profile.avatar,
        company: profile.company,
        jobTitle: profile.jobTitle,
        department: profile.department
      },
      socialProfiles: options.socialProfiles?.map(p => ({
        id: randomUUID(),
        platform: p.platform || 'other',
        username: p.username || '',
        url: p.url || '',
        followers: 0,
        following: 0,
        posts: 0,
        isVerified: false,
        lastSyncedAt: now,
        recentPosts: [],
        interests: [],
        influence: {
          score: 0,
          level: 'low',
          topics: []
        },
        ...p
      })) || [],
      status: 'lead',
      leadScore: 0,
      leadTemperature: 'cold',
      engagement: {
        totalInteractions: 0,
        firstInteraction: now,
        lastInteraction: now,
        byChannel: {} as Record<InteractionChannel, number>,
        byType: {} as Record<InteractionType, number>,
        frequency: 'rarely',
        trend: 'stable',
        score: 0,
        loyaltyScore: 0,
        churnRisk: 0.5
      },
      interactions: [],
      purchases: [],
      supportTickets: [],
      relationships: {
        referrals: []
      },
      aiInsights: {
        churnRisk: 0.5,
        nextPurchaseProbability: 0,
        lifetimeValue: {
          predicted: 0,
          confidence: 0
        },
        nextBestActions: [],
        contentRecommendations: [],
        productRecommendations: [],
        persona: 'new_lead',
        journeyStage: 'awareness',
        socialInfluence: {
          canBeAdvocate: false,
          advocacyLikelihood: 0
        },
        consultedAgents: []
      },
      preferences: {
        communication: {
          preferredChannel: 'email',
          timezone: 'UTC',
          language: 'en',
          frequency: 'medium',
          marketingConsent: true
        },
        content: {
          interests: [],
          preferredTopics: [],
          contentFormats: []
        },
        product: {
          categories: [],
          priceRange: [0, 1000],
          purchaseFrequency: 'unknown'
        }
      },
      tags: options.tags || [],
      customFields: {},
      createdAt: now,
      updatedAt: now
    };

    // Configure AI if requested
    if (options.configureAI !== false) {
      await this.configureAIForContact(contactId);
    }

    this.contacts.set(contactId, contact);

    this.logEvent('social-crm', 'contact_created', {
      contactId,
      email: profile.email,
      correlationId
    });

    return contact;
  }

  private async configureAIForContact(contactId: string): Promise<void> {
    const contact = this.contacts.get(contactId);
    if (!contact) return;

    // Find relevant AI agents
    const salesAgents = agentConsultingService.findConsultantsByExpertise('sales');
    const customerSuccessAgents = agentConsultingService.findConsultantsByExpertise('customer_success');
    const marketingAgents = agentConsultingService.findConsultantsByExpertise('marketing');

    const consultedAgents: string[] = [];

    // Consult with sales agent for lead qualification
    if (salesAgents.length > 0) {
      const salesAgent = salesAgents[0];
      consultedAgents.push(salesAgent.agentId);

      await agentConsultingService.initiateConsultation(
        'crm-system',
        salesAgent.agentId,
        'Lead Qualification',
        `New lead: ${contact.profile.firstName} ${contact.profile.lastName} (${contact.profile.email}). ` +
        `Company: ${contact.profile.company || 'Unknown'}. ` +
        `Please help qualify this lead and suggest next best actions.`,
        { type: 'analytical', priority: 'medium' }
      );
    }

    if (customerSuccessAgents.length > 0) {
      consultedAgents.push(customerSuccessAgents[0].agentId);
    }

    if (marketingAgents.length > 0) {
      consultedAgents.push(marketingAgents[0].agentId);
    }

    contact.aiInsights.consultedAgents = consultedAgents;
    this.contacts.set(contactId, contact);
  }

  // ============================================
  // INTERACTION TRACKING
  // ============================================
  
  async logInteraction(
    contactId: string,
    type: InteractionType,
    channel: InteractionChannel,
    summary: string,
    options: {
      outcome?: ContactInteraction['outcome'];
      sentiment?: ContactInteraction['sentiment'];
      agentId?: string;
      duration?: number;
      attachments?: string[];
      notes?: string;
    } = {}
  ): Promise<ContactInteraction> {
    const contact = this.contacts.get(contactId);
    if (!contact) throw new Error(`Contact ${contactId} not found`);

    const interactionId = randomUUID();
    const now = new Date();

    // AI analysis of interaction
    const aiAnalysis = await this.analyzeInteraction(
      summary,
      contact,
      type,
      options.sentiment
    );

    const interaction: ContactInteraction = {
      id: interactionId,
      type,
      channel,
      timestamp: now,
      duration: options.duration,
      contactId,
      agentId: options.agentId,
      aiAgentIds: aiAnalysis.consultedAgents,
      summary,
      notes: options.notes || '',
      sentiment: options.sentiment || 'neutral',
      outcome: options.outcome || 'pending',
      followUpRequired: false,
      aiAnalysis,
      attachments: options.attachments || []
    };

    contact.interactions.push(interaction);
    contact.engagement.lastInteraction = now;
    contact.engagement.totalInteractions++;
    contact.engagement.byType[type] = (contact.engagement.byType[type] || 0) + 1;
    contact.engagement.byChannel[channel] = (contact.engagement.byChannel[channel] || 0) + 1;
    contact.lastContactedAt = now;

    // Update contact insights based on interaction
    await this.updateContactInsights(contact);

    this.contacts.set(contactId, contact);

    this.logEvent('social-crm', 'interaction_logged', {
      contactId,
      interactionId,
      type,
      channel,
      sentiment: interaction.sentiment
    });

    return interaction;
  }

  private async analyzeInteraction(
    summary: string,
    contact: SocialCRMContact,
    type: InteractionType,
    sentiment?: string
  ): Promise<ContactInteraction['aiAnalysis']> {
    // Find relevant agents
    const supportAgents = agentConsultingService.findConsultantsByExpertise('customer_support');
    const salesAgents = agentConsultingService.findConsultantsByExpertise('sales');

    const consultedAgents: string[] = [];
    
    if (type === 'support' && supportAgents.length > 0) {
      consultedAgents.push(supportAgents[0].agentId);
    }
    
    if (['call', 'meeting'].includes(type) && salesAgents.length > 0) {
      consultedAgents.push(salesAgents[0].agentId);
    }

    // Analyze intent and urgency
    const summaryLower = summary.toLowerCase();
    let urgency = 0.3;
    if (summaryLower.includes('urgent') || summaryLower.includes('asap')) urgency = 0.9;
    if (summaryLower.includes('problem') || summaryLower.includes('issue')) urgency = 0.7;
    if (summaryLower.includes('question') || summaryLower.includes('help')) urgency = 0.5;

    return {
      intent: this.detectIntent(summary, type),
      topics: this.extractTopics(summary),
      urgency,
      nextBestAction: urgency > 0.7 ? 'immediate_follow_up' : 'schedule_follow_up',
      consultedAgents
    };
  }

  private detectIntent(summary: string, type: InteractionType): string {
    const text = summary.toLowerCase();
    
    if (type === 'support' || text.includes('problem') || text.includes('issue')) {
      return 'support_request';
    }
    if (text.includes('buy') || text.includes('purchase') || text.includes('price')) {
      return 'purchase_intent';
    }
    if (text.includes('demo') || text.includes('trial') || text.includes('see')) {
      return 'exploration';
    }
    if (text.includes('question') || text.includes('how') || text.includes('what')) {
      return 'inquiry';
    }
    if (type === 'referral' || text.includes('recommend') || text.includes('refer')) {
      return 'referral';
    }
    
    return 'general';
  }

  private extractTopics(text: string): string[] {
    const topics: string[] = [];
    const lowerText = text.toLowerCase();
    
    const topicKeywords: Record<string, string[]> = {
      'pricing': ['price', 'cost', 'budget', 'expensive', 'cheap'],
      'features': ['feature', 'functionality', 'can it', 'does it'],
      'integration': ['integrate', 'connect', 'api', 'sync'],
      'support': ['help', 'support', 'issue', 'problem', 'bug'],
      'training': ['train', 'learn', 'tutorial', 'how to'],
      'security': ['secure', 'privacy', 'protection', 'data']
    };

    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(k => lowerText.includes(k))) {
        topics.push(topic);
      }
    }

    return topics;
  }

  private async updateContactInsights(contact: SocialCRMContact): Promise<void> {
    const recentInteractions = contact.interactions.slice(-10);
    
    // Calculate engagement score
    const engagementScore = Math.min(contact.engagement.totalInteractions * 5, 100);
    contact.engagement.score = engagementScore;

    // Update lead score
    const baseScore = contact.engagement.totalInteractions * 3;
    const socialBonus = contact.socialProfiles.length * 5;
    const purchaseBonus = contact.purchases.length * 15;
    
    contact.leadScore = Math.min(baseScore + socialBonus + purchaseBonus, 100);
    
    // Update temperature
    if (contact.leadScore >= 70) contact.leadTemperature = 'hot';
    else if (contact.leadScore >= 40) contact.leadTemperature = 'warm';
    else contact.leadTemperature = 'cold';

    // Update status based on journey
    if (contact.purchases.length > 0) contact.status = 'customer';
    else if (contact.leadScore >= 60) contact.status = 'prospect';

    // Generate next best actions
    contact.aiInsights.nextBestActions = this.generateNextBestActions(contact);

    contact.updatedAt = new Date();
  }

  private generateNextBestActions(contact: SocialCRMContact): NextBestAction[] {
    const actions: NextBestAction[] = [];
    const daysSinceLastContact = contact.lastContactedAt
      ? (new Date().getTime() - contact.lastContactedAt.getTime()) / (1000 * 60 * 60 * 24)
      : 30;

    // Re-engagement for dormant contacts
    if (daysSinceLastContact > 14) {
      actions.push({
        action: 'Send re-engagement email',
        channel: 'email',
        timing: 'this_week',
        priority: 0.8,
        expectedOutcome: 'Re-activate dormant lead',
        confidence: 0.7
      });
    }

    // Follow-up for recent interactions
    const lastInteraction = contact.interactions[contact.interactions.length - 1];
    if (lastInteraction?.followUpRequired && !lastInteraction.followUpDate) {
      actions.push({
        action: 'Schedule follow-up',
        channel: lastInteraction.channel,
        timing: 'today',
        priority: 0.9,
        expectedOutcome: 'Continue conversation thread',
        confidence: 0.85
      });
    }

    // Sales outreach for hot leads
    if (contact.leadTemperature === 'hot' && contact.status === 'prospect') {
      actions.push({
        action: 'Schedule sales call',
        channel: 'phone',
        timing: 'immediate',
        priority: 1.0,
        expectedOutcome: 'Move to deal stage',
        confidence: 0.75
      });
    }

    return actions.sort((a, b) => b.priority - a.priority);
  }

  // ============================================
  // SALES PIPELINE MANAGEMENT
  // ============================================
  
  async createPipeline(
    name: string,
    stages: Omit<PipelineStage, 'id'>[],
    options: {
      configureAI?: boolean;
    } = {}
  ): Promise<CRMSalesPipeline> {
    const pipelineId = randomUUID();

    const pipeline: CRMSalesPipeline = {
      id: pipelineId,
      name,
      stages: stages.map((s, i) => ({
        id: randomUUID(),
        ...s,
        order: i
      })),
      deals: [],
      stats: {
        totalDeals: 0,
        totalValue: 0,
        avgDealSize: 0,
        winRate: 0,
        avgSalesCycle: 0,
        byStage: {} as Record<DealStage, any>
      },
      aiFeatures: {
        forecastingEnabled: true,
        dealScoringEnabled: true,
        nextBestActionEnabled: true,
        consultedAgents: []
      }
    };

    if (options.configureAI !== false) {
      await this.configureAIPipeline(pipelineId);
    }

    this.pipelines.set(pipelineId, pipeline);

    return pipeline;
  }

  private async configureAIPipeline(pipelineId: string): Promise<void> {
    const pipeline = this.pipelines.get(pipelineId);
    if (!pipeline) return;

    const salesAgents = agentConsultingService.findConsultantsByExpertise('sales');
    const revenueAgents = agentConsultingService.findConsultantsByExpertise('revenue_optimization');

    const consultedAgents: string[] = [];

    if (salesAgents.length > 0) consultedAgents.push(salesAgents[0].agentId);
    if (revenueAgents.length > 0) consultedAgents.push(revenueAgents[0].agentId);

    pipeline.aiFeatures.consultedAgents = consultedAgents;
    this.pipelines.set(pipelineId, pipeline);
  }

  async createDeal(
    pipelineId: string,
    name: string,
    contactId: string,
    value: number,
    options: {
      expectedCloseDate?: Date;
      description?: string;
      source?: string;
      configureAI?: boolean;
    } = {}
  ): Promise<CRMSalesDeal> {
    const pipeline = this.pipelines.get(pipelineId);
    if (!pipeline) throw new Error(`Pipeline ${pipelineId} not found`);

    const contact = this.contacts.get(contactId);
    if (!contact) throw new Error(`Contact ${contactId} not found`);

    const dealId = randomUUID();
    const now = new Date();

    // AI analysis for deal
    const aiAnalysis = await this.analyzeDeal(contact, value, options.expectedCloseDate);

    const deal: CRMSalesDeal = {
      id: dealId,
      pipelineId,
      name,
      description: options.description || '',
      value,
      currency: 'USD',
      primaryContactId: contactId,
      decisionMakers: [contactId],
      influencers: [],
      stage: 'prospecting',
      status: 'open',
      probability: 10,
      createdAt: now,
      expectedCloseDate: options.expectedCloseDate || new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
      lastActivityAt: now,
      aiAnalysis,
      activities: [],
      competitors: [],
      competitivePosition: 'neutral',
      source: options.source || 'manual'
    };

    this.deals.set(dealId, deal);
    pipeline.deals.push(deal);
    pipeline.stats.totalDeals++;
    pipeline.stats.totalValue += value;

    this.pipelines.set(pipelineId, pipeline);

    this.logEvent('social-crm', 'deal_created', {
      dealId,
      pipelineId,
      contactId,
      value
    });

    return deal;
  }

  private async analyzeDeal(
    contact: SocialCRMContact,
    value: number,
    expectedCloseDate?: Date
  ): Promise<CRMSalesDeal['aiAnalysis']> {
    // Find sales agents
    const salesAgents = agentConsultingService.findConsultantsByExpertise('sales');
    const negotiationAgents = agentConsultingService.findConsultantsByExpertise('negotiation');

    const consultedAgents: string[] = [];
    if (salesAgents.length > 0) consultedAgents.push(salesAgents[0].agentId);
    if (negotiationAgents.length > 0) consultedAgents.push(negotiationAgents[0].agentId);

    // Calculate win probability
    let winProbability = 0.1; // Base probability
    
    // Adjust based on contact score
    winProbability += contact.leadScore / 500;
    
    // Adjust based on engagement
    if (contact.engagement.totalInteractions > 5) winProbability += 0.1;
    
    // Adjust based on temperature
    if (contact.leadTemperature === 'hot') winProbability += 0.2;
    else if (contact.leadTemperature === 'warm') winProbability += 0.1;

    return {
      score: Math.round(winProbability * 100),
      winProbability: Math.min(winProbability, 0.9),
      riskFactors: [],
      recommendedActions: [
        'Schedule discovery call',
        'Send product information',
        'Identify decision makers'
      ],
      stallRisk: 0.3,
      consultedAgents
    };
  }

  // ============================================
  // HELPER METHODS
  // ============================================
  
  private logEvent(service: string, action: string, metadata: Record<string, any>, correlationId?: string): void {
    AIServiceLogger.log(LogLevel.INFO, service, action, metadata, correlationId);
  }

  // ============================================
  // SYNC PROCESSES
  // ============================================
  
  private startSyncProcesses(): void {
    // Sync social profiles every 6 hours
    this.syncInterval = setInterval(async () => {
      for (const contact of this.contacts.values()) {
        for (const profile of contact.socialProfiles) {
          await this.syncSocialProfile(contact.id, profile.id);
        }
      }
    }, 21600000);
  }

  private startLeadScoring(): void {
    // Update lead scores daily
    this.scoringInterval = setInterval(async () => {
      for (const contact of this.contacts.values()) {
        await this.updateContactInsights(contact);
        this.contacts.set(contact.id, contact);
      }
    }, 86400000);
  }

  private async syncSocialProfile(contactId: string, profileId: string): Promise<void> {
    // In production, this would call social media APIs
    this.logEvent('social-crm', 'social_profile_synced', {
      contactId,
      profileId
    });
  }

  // ============================================
  // PUBLIC API
  // ============================================
  
  getContact(contactId: string): SocialCRMContact | null {
    return this.contacts.get(contactId) || null;
  }

  getContactByEmail(email: string): SocialCRMContact | null {
    return Array.from(this.contacts.values())
      .find(c => c.profile.email.toLowerCase() === email.toLowerCase()) || null;
  }

  getDeal(dealId: string): CRMSalesDeal | null {
    return this.deals.get(dealId) || null;
  }

  getPipeline(pipelineId: string): CRMSalesPipeline | null {
    return this.pipelines.get(pipelineId) || null;
  }

  getContactsForPipeline(pipelineId: string): SocialCRMContact[] {
    const pipeline = this.pipelines.get(pipelineId);
    if (!pipeline) return [];

    return pipeline.deals
      .map(d => this.contacts.get(d.primaryContactId))
      .filter((c): c is SocialCRMContact => c !== undefined);
  }

  getDealsForContact(contactId: string): CRMSalesDeal[] {
    return Array.from(this.deals.values())
      .filter(d => d.primaryContactId === contactId || d.decisionMakers.includes(contactId));
  }

  getNextBestActions(contactId: string): NextBestAction[] {
    const contact = this.contacts.get(contactId);
    if (!contact) return [];
    return contact.aiInsights.nextBestActions;
  }

  getStats(): {
    totalContacts: number;
    totalDeals: number;
    totalPipelines: number;
    totalRevenue: number;
    avgDealSize: number;
  } {
    const totalRevenue = Array.from(this.deals.values())
      .filter(d => d.status === 'won')
      .reduce((sum, d) => sum + d.value, 0);

    const wonDeals = Array.from(this.deals.values()).filter(d => d.status === 'won');

    return {
      totalContacts: this.contacts.size,
      totalDeals: this.deals.size,
      totalPipelines: this.pipelines.size,
      totalRevenue,
      avgDealSize: wonDeals.length > 0 ? totalRevenue / wonDeals.length : 0
    };
  }

  destroy(): void {
    if (this.syncInterval) clearInterval(this.syncInterval);
    if (this.scoringInterval) clearInterval(this.scoringInterval);
  }
}

// ============================================
// EXPORT SINGLETON
// ============================================

export const socialCRMService = new SocialCRMService();

export default socialCRMService;
