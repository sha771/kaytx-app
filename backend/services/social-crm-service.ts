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
  
  // Competitor Intelligence
  competitorMentions?: CompetitorMention[];
  
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

// ============================================
// ENHANCEMENT: REVENUE INTELLIGENCE (Phase 1)
// ============================================

export interface RevenueIntelligence {
  forecast: {
    monthlyRecurringRevenue: number;
    projectedGrowth: number; // percentage
    confidenceScore: number; // 0-100
    riskFactors: string[];
    scenarioAnalysis: {
      optimistic: number;
      realistic: number;
      pessimistic: number;
    };
  };
  cohortAnalysis: CohortMetrics[];
  retentionBySegment: Record<string, number>;
  lifetimeValueCurves: LTVCurve[];
  attribution: {
    multiTouchAttribution: TouchPoint[];
    channelPerformance: ChannelROI[];
    campaignEffectiveness: CampaignMetrics[];
  };
  pipelineHealth: {
    totalPipelineValue: number;
    weightedForecast: number;
    avgDealSize: number;
    winRate: number;
    avgSalesCycle: number; // days
    velocityTrend: 'accelerating' | 'stable' | 'slowing';
    stalledDeals: string[];
  };
}

export interface CohortMetrics {
  cohortId: string;
  acquisitionMonth: string;
  initialCustomers: number;
  retentionByMonth: Record<number, number>; // month -> retention %
  revenueByMonth: Record<number, number>;
  churnRate: number;
  lifetimeValue: number;
  avgRevenuePerUser: number;
  segment: string;
  acquisitionChannel: string;
}

export interface LTVCurve {
  segment: string;
  months: number[];
  cumulativeValues: number[];
  paybackPeriod: number; // months to recover CAC
  profitabilityThreshold: number; // months to break even
}

export interface TouchPoint {
  channel: string;
  touchOrder: number; // 1st touch, 2nd touch, etc.
  attributionWeight: number; // percentage of credit
  timestamp: Date;
  dealId: string;
  revenueAttributed: number;
}

export interface ChannelROI {
  channel: string;
  spend: number;
  revenue: number;
  roi: number; // percentage
  conversions: number;
  costPerAcquisition: number;
  costPerLead: number;
  pipelineGenerated: number;
  influenceRate: number; // % of deals influenced
}

export interface CampaignMetrics {
  campaignId: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spend: number;
  revenue: number;
  leads: number;
  conversions: number;
  roi: number;
  touchPoints: number;
  avgTimeToConversion: number; // days
  influencedDeals: string[];
}

// ============================================
// ENHANCEMENT: ADVANCED AI INSIGHTS (Phase 1)
// ============================================

export interface AdvancedAIInsights extends ContactAIInsights {
  // Enhanced Predictive Analytics
  buyIntentSignals: {
    score: number; // 0-100
    signals: IntentSignal[];
    trend: 'rising' | 'stable' | 'falling';
    lastSignalAt: Date;
    hotTopics: string[];
    competitorComparisons: CompetitorMention[];
  };
  budgetIndicators: BudgetSignal[];
  decisionTimeline: 'immediate' | '3months' | '6months' | '1year' | 'unknown';
  
  // Enhanced Segmentation
  firmographics: {
    companySize: 'startup' | 'smb' | 'midmarket' | 'enterprise';
    industry: string;
    revenue: number;
    growthRate: number;
    techStack: string[];
    maturityScore: number;
    digitalPresence: number;
  };
  psychographics: {
    decisionStyle: 'analytical' | 'collaborative' | 'decisive' | 'risk_averse';
    communicationPreference: string;
    buyingMotivations: string[];
    painPoints: string[];
    goals: string[];
  };
  
  // Conversation Intelligence
  conversationSentiment: {
    overall: number; // -100 to 100
    trend: 'improving' | 'stable' | 'declining';
    lastConversationAt: Date;
    keyTopics: string[];
    objections: string[];
    commitments: string[];
    nextSteps: string[];
  };
  
  // ML Model Scoring
  mlPredictions: {
    modelVersion: string;
    trainedAt: Date;
    features: string[];
    weights: Record<string, number>;
    prediction: number;
    confidence: number;
    explanation: string; // SHAP/LIME explanation
  };
}

export interface IntentSignal {
  type: 'website_visit' | 'content_download' | 'pricing_view' | 'demo_request' | 'email_open' | 'social_engagement' | 'competitor_research';
  timestamp: Date;
  source: string;
  score: number; // 0-100
  details: Record<string, any>;
  decay: number; // signal strength decays over time
}

export interface CompetitorMention {
  competitor: string;
  context: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
  platform?: string;
  urgency: boolean;
  recommendedResponse?: string;
}

export interface BudgetSignal {
  indicator: string;
  confidence: number; // 0-100
  estimatedBudget: number;
  budgetRange: [number, number];
  fiscalYearStart?: Date;
  signals: string[];
}

// ============================================
// ENHANCEMENT: ORGANIZATIONAL CHART MAPPING (Phase 2)
// ============================================

export interface OrgChartNode {
  contactId: string;
  role: 'decision_maker' | 'influencer' | 'blocker' | 'champion' | 'user' | 'economic_buyer' | 'technical_buyer';
  influenceScore: number; // 0-100
  relationshipStrength: number; // 0-100
  reportingTo?: string;
  manages: string[];
  crossFunctionalTeams: string[];
  engagementHistory: {
    lastContact: Date;
    totalInteractions: number;
    sentiment: number;
  };
  roleInDecision: string;
  painPoints: string[];
  motivations: string[];
  objections: string[];
}

export interface AccountIntelligence {
  accountId: string;
  orgChart: OrgChartNode[];
  buyingCommittee: string[];
  pastChampions: string[];
  relationshipHealth: number; // 0-100
  whitespaceOpportunities: ProductGap[];
  accountPenetration: {
    totalEmployees: number;
    knownContacts: number;
    activeUsers: number;
    penetrationRate: number;
  };
  strategicInitiatives: string[];
  recentChanges: {
    funding?: FundingEvent;
    leadership?: LeadershipChange;
    expansion?: ExpansionEvent;
    productLaunch?: ProductLaunch;
  };
  competitiveLandscape: {
    incumbentVendor?: string;
    competitorsInEvaluation: string[];
    contractRenewalDate?: Date;
    switchingLikelihood: number;
  };
}

export interface ProductGap {
  productCategory: string;
  currentSpend: number;
  estimatedOpportunity: number;
  competitor: string;
  fitScore: number; // 0-100 how well Kaytx fits
  priority: number;
  recommendedApproach: string;
}

export interface FundingEvent {
  round: string;
  amount: number;
  date: Date;
  investors: string[];
  valuation?: number;
  implications: string[];
}

export interface LeadershipChange {
  position: string;
  previousHolder?: string;
  newHolder: string;
  date: Date;
  source: 'hired' | 'promoted' | 'departed';
  implications: 'positive' | 'negative' | 'neutral';
}

export interface ExpansionEvent {
  type: 'hiring' | 'new_office' | 'acquisition' | 'product_line' | 'geographic';
  details: string;
  date: Date;
  implications: string[];
}

export interface ProductLaunch {
  name: string;
  date: Date;
  market: string;
  relevanceScore: number;
  implications: string[];
}

// ============================================
// ENHANCEMENT: SMART NURTURE SEQUENCES (Phase 3)
// ============================================

export interface SmartSequence {
  id: string;
  name: string;
  trigger: 'lead_score_change' | 'intent_detected' | 'engagement_drop' | 'stage_change' | 'time_based';
  conditions: AutomationCondition[];
  actions: SequenceAction[];
  aiOptimization: {
    bestSendTime: boolean;
    contentPersonalization: boolean;
    channelOptimization: boolean;
    aBTesting: boolean;
  };
  performance: {
    enrolled: number;
    completed: number;
    converted: number;
    avgTimeToConvert: number;
    revenueGenerated: number;
  };
}

export interface AutomationCondition {
  type: 'score_threshold' | 'behavior' | 'attribute' | 'time' | 'interaction';
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'has_not';
  field: string;
  value: any;
  timeWindow?: number; // days
}

export interface SequenceAction {
  type: 'email' | 'sms' | 'linkedin_message' | 'task' | 'call' | 'content_share' | 'wait' | 'ai_consultation';
  content?: string;
  templateId?: string;
  delay: number; // hours
  channel?: InteractionChannel;
  aiAgentId?: string;
  condition?: AutomationCondition; // conditional action
}

// ============================================
// ENHANCEMENT: DATA ENRICHMENT (Phase 3)
// ============================================

export interface DataEnrichmentSource {
  provider: 'clearbit' | 'zoominfo' | 'linkedin' | 'crunchbase' | 'github' | 'twitter' | 'manual';
  lastEnriched: Date;
  confidence: number;
  fields: Record<string, any>;
  rawData?: any;
}

export interface EnrichmentConfig {
  autoEnrich: boolean;
  sources: string[];
  fieldsToEnrich: string[];
  overrideExisting: boolean;
  minimumConfidence: number;
  enrichmentSchedule: 'realtime' | 'daily' | 'weekly';
}

export interface TriggerEvent {
  type: 'funding' | 'acquisition' | 'leadership_change' | 'expansion' | 'layoffs' | 'product_launch' | 'earnings';
  date: Date;
  description: string;
  source: string;
  relevanceScore: number;
  recommendedAction: string;
  notifiedAt?: Date;
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
  status: 'open' | 'active' | 'won' | 'lost' | 'stalled';
  probability: number;
  
  // Timeline
  createdAt: Date;
  expectedCloseDate: Date;
  actualCloseDate?: Date;
  closedAt?: Date;
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
      const contacts = Array.from(this.contacts.values());
      for (const contact of contacts) {
        const profiles = Array.from(contact.socialProfiles);
        for (const profile of profiles) {
          await this.syncSocialProfile(contact.id, profile.id);
        }
      }
    }, 21600000);
  }

  private startLeadScoring(): void {
    // Update lead scores daily
    this.scoringInterval = setInterval(async () => {
      const contacts = Array.from(this.contacts.values());
      for (const contact of contacts) {
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

  // ============================================
  // ENHANCEMENT: REVENUE INTELLIGENCE (Phase 1)
  // ============================================

  async generateRevenueIntelligence(): Promise<RevenueIntelligence> {
    const deals = Array.from(this.deals.values());
    const contacts = Array.from(this.contacts.values());
    const now = new Date();
    
    // Calculate MRR and forecast
    const wonDeals = deals.filter(d => d.status === 'won');
    const pipelineDeals = deals.filter(d => d.status === 'active');
    
    const mrr = wonDeals.reduce((sum, d) => sum + (d.value / 12), 0);
    const projectedGrowth = this.calculateProjectedGrowth(deals, contacts);
    
    // Cohort Analysis
    const cohorts = this.calculateCohortAnalysis(contacts);
    
    // Channel Performance
    const channelPerformance = this.calculateChannelROI(contacts);
    
    // Pipeline Health
    const pipelineHealth = this.calculatePipelineHealth(deals);
    
    return {
      forecast: {
        monthlyRecurringRevenue: mrr,
        projectedGrowth,
        confidenceScore: 75,
        riskFactors: this.identifyRevenueRisks(deals, pipelineDeals),
        scenarioAnalysis: {
          optimistic: mrr * 1.3,
          realistic: mrr * 1.15,
          pessimistic: mrr * 0.95
        }
      },
      cohortAnalysis: cohorts,
      retentionBySegment: this.calculateRetentionBySegment(contacts),
      lifetimeValueCurves: this.calculateLTVCurves(contacts),
      attribution: {
        multiTouchAttribution: this.calculateMultiTouchAttribution(deals),
        channelPerformance,
        campaignEffectiveness: []
      },
      pipelineHealth
    };
  }

  private calculateProjectedGrowth(deals: CRMSalesDeal[], contacts: SocialCRMContact[]): number {
    const activeDeals = deals.filter(d => d.status === 'active');
    const totalPipeline = activeDeals.reduce((sum, d) => sum + d.value * (d.probability / 100), 0);
    const wonDeals = deals.filter(d => d.status === 'won');
    const currentRevenue = wonDeals.reduce((sum, d) => sum + d.value, 0);
    
    if (currentRevenue === 0) return 0;
    return (totalPipeline / currentRevenue) * 100;
  }

  private identifyRevenueRisks(deals: CRMSalesDeal[], pipelineDeals: CRMSalesDeal[]): string[] {
    const risks: string[] = [];
    
    // Identify stalled deals
    const stalledDeals = pipelineDeals.filter(d => {
      const daysInStage = (new Date().getTime() - d.lastActivityAt.getTime()) / (1000 * 60 * 60 * 24);
      return daysInStage > 30;
    });
    
    if (stalledDeals.length > 3) {
      risks.push(`${stalledDeals.length} stalled deals may not close this quarter`);
    }
    
    // Identify concentration risk
    const topDeals = pipelineDeals.sort((a, b) => b.value - a.value).slice(0, 3);
    const topDealValue = topDeals.reduce((sum, d) => sum + d.value, 0);
    const totalPipeline = pipelineDeals.reduce((sum, d) => sum + d.value, 0);
    
    if (totalPipeline > 0 && topDealValue / totalPipeline > 0.5) {
      risks.push('High pipeline concentration in top 3 deals');
    }
    
    return risks;
  }

  private calculateCohortAnalysis(contacts: SocialCRMContact[]): CohortMetrics[] {
    const cohorts = new Map<string, SocialCRMContact[]>();
    
    // Group contacts by acquisition month
    for (const contact of contacts) {
      const month = contact.createdAt.toISOString().slice(0, 7); // YYYY-MM
      if (!cohorts.has(month)) cohorts.set(month, []);
      cohorts.get(month)!.push(contact);
    }
    
    return Array.from(cohorts.entries()).map(([month, cohortContacts]) => {
      const purchases = cohortContacts.flatMap(c => c.purchases);
      const revenue = purchases.reduce((sum, p) => sum + p.amount, 0);
      
      return {
        cohortId: month,
        acquisitionMonth: month,
        initialCustomers: cohortContacts.length,
        retentionByMonth: this.calculateRetentionByMonth(cohortContacts, month),
        revenueByMonth: {}, // Simplified
        churnRate: 0.1,
        lifetimeValue: revenue / cohortContacts.length || 0,
        avgRevenuePerUser: revenue / cohortContacts.length || 0,
        segment: 'default',
        acquisitionChannel: cohortContacts[0]?.purchases[0]?.source || 'unknown'
      };
    });
  }

  private calculateRetentionByMonth(contacts: SocialCRMContact[], cohortMonth: string): Record<number, number> {
    // Simplified retention calculation
    const retention: Record<number, number> = {};
    const cohortDate = new Date(cohortMonth + '-01');
    const now = new Date();
    const monthsSince = (now.getFullYear() - cohortDate.getFullYear()) * 12 + (now.getMonth() - cohortDate.getMonth());
    
    for (let i = 0; i <= monthsSince; i++) {
      const activeContacts = contacts.filter(c => {
        const lastPurchase = c.purchases[c.purchases.length - 1];
        if (!lastPurchase) return false;
        const monthsSincePurchase = (now.getFullYear() - lastPurchase.date.getFullYear()) * 12 + 
          (now.getMonth() - lastPurchase.date.getMonth());
        return monthsSincePurchase <= i + 1;
      });
      retention[i] = activeContacts.length / contacts.length || 0;
    }
    
    return retention;
  }

  private calculateRetentionBySegment(contacts: SocialCRMContact[]): Record<string, number> {
    const segments = new Map<string, number[]>();
    
    for (const contact of contacts) {
      const segment = contact.aiInsights.persona || 'unknown';
      if (!segments.has(segment)) segments.set(segment, []);
      segments.get(segment)!.push(contact.engagement.loyaltyScore / 100);
    }
    
    const result: Record<string, number> = {};
    for (const [segment, scores] of segments) {
      result[segment] = scores.reduce((a, b) => a + b, 0) / scores.length || 0;
    }
    
    return result;
  }

  private calculateLTVCurves(contacts: SocialCRMContact[]): LTVCurve[] {
    const segments = ['enterprise', 'midmarket', 'smb', 'startup'];
    
    return segments.map(segment => ({
      segment,
      months: [1, 3, 6, 12, 24, 36],
      cumulativeValues: [100, 280, 520, 1200, 2800, 4500], // Simplified
      paybackPeriod: 6,
      profitabilityThreshold: 12
    }));
  }

  private calculateMultiTouchAttribution(deals: CRMSalesDeal[]): TouchPoint[] {
    const touchPoints: TouchPoint[] = [];
    
    for (const deal of deals) {
      if (deal.status === 'won') {
        touchPoints.push({
          channel: deal.source,
          touchOrder: 1,
          attributionWeight: 100,
          timestamp: deal.createdAt,
          dealId: deal.id,
          revenueAttributed: deal.value
        });
      }
    }
    
    return touchPoints;
  }

  private calculateChannelROI(contacts: SocialCRMContact[]): ChannelROI[] {
    const channels = new Map<string, { spend: number; revenue: number; conversions: number }>();
    
    for (const contact of contacts) {
      const source = contact.purchases[0]?.source || 'organic';
      if (!channels.has(source)) {
        channels.set(source, { spend: 0, revenue: 0, conversions: 0 });
      }
      
      const data = channels.get(source)!;
      data.revenue += contact.purchases.reduce((sum, p) => sum + p.amount, 0);
      data.conversions += contact.purchases.length;
    }
    
    return Array.from(channels.entries()).map(([channel, data]) => ({
      channel,
      spend: data.spend || 1000, // Placeholder
      revenue: data.revenue,
      roi: data.spend > 0 ? ((data.revenue - data.spend) / data.spend) * 100 : 0,
      conversions: data.conversions,
      costPerAcquisition: data.spend / data.conversions || 0,
      costPerLead: data.spend / (data.conversions * 3) || 0, // Assume 3:1 lead:conversion
      pipelineGenerated: data.revenue * 2, // Assume pipeline 2x revenue
      influenceRate: 100
    }));
  }

  private calculatePipelineHealth(deals: CRMSalesDeal[]): RevenueIntelligence['pipelineHealth'] {
    const activeDeals = deals.filter(d => d.status === 'active');
    const wonDeals = deals.filter(d => d.status === 'won');
    
    const totalPipeline = activeDeals.reduce((sum, d) => sum + d.value, 0);
    const weightedForecast = activeDeals.reduce((sum, d) => sum + d.value * (d.probability / 100), 0);
    
    const avgDealSize = wonDeals.length > 0 
      ? wonDeals.reduce((sum, d) => sum + d.value, 0) / wonDeals.length 
      : 0;
    
    const winRate = deals.length > 0 ? (wonDeals.length / deals.length) * 100 : 0;
    
    // Average sales cycle
    const cycleTimes = wonDeals.map(d => {
      const closeDate = d.closedAt || d.actualCloseDate || new Date();
      const days = (closeDate.getTime() - d.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      return days;
    });
    const avgSalesCycle = cycleTimes.length > 0 
      ? cycleTimes.reduce((a, b) => a + b, 0) / cycleTimes.length 
      : 45;
    
    // Stalled deals
    const stalledDeals = activeDeals
      .filter(d => (new Date().getTime() - d.lastActivityAt.getTime()) / (1000 * 60 * 60 * 24) > 30)
      .map(d => d.id);
    
    return {
      totalPipelineValue: totalPipeline,
      weightedForecast,
      avgDealSize,
      winRate,
      avgSalesCycle,
      velocityTrend: 'stable',
      stalledDeals
    };
  }

  // ============================================
  // ENHANCEMENT: ADVANCED AI SCORING (Phase 1)
  // ============================================

  async calculateAdvancedLeadScore(contactId: string): Promise<AdvancedAIInsights['buyIntentSignals']> {
    const contact = this.contacts.get(contactId);
    if (!contact) throw new Error(`Contact ${contactId} not found`);
    
    const signals: IntentSignal[] = [];
    let totalScore = 50; // Base score
    
    // Analyze interactions for intent signals
    for (const interaction of contact.interactions) {
      const signalScore = this.scoreInteractionForIntent(interaction);
      if (signalScore > 0) {
        signals.push({
          type: this.mapInteractionToSignalType(interaction),
          timestamp: interaction.timestamp,
          source: interaction.channel,
          score: signalScore,
          details: { summary: interaction.summary, type: interaction.type },
          decay: this.calculateSignalDecay(interaction.timestamp)
        });
        totalScore += signalScore * this.calculateSignalDecay(interaction.timestamp);
      }
    }
    
    // Check for budget indicators
    const budgetSignals = this.detectBudgetSignals(contact);
    
    // Analyze decision timeline
    const decisionTimeline = this.predictDecisionTimeline(contact, signals);
    
    // Calculate trend
    const recentSignals = signals.filter(s => 
      (new Date().getTime() - s.timestamp.getTime()) < (7 * 24 * 60 * 60 * 1000)
    );
    const olderSignals = signals.filter(s => 
      (new Date().getTime() - s.timestamp.getTime()) >= (7 * 24 * 60 * 60 * 1000) &&
      (new Date().getTime() - s.timestamp.getTime()) < (30 * 24 * 60 * 60 * 1000)
    );
    
    const recentScore = recentSignals.reduce((sum, s) => sum + s.score, 0);
    const olderScore = olderSignals.reduce((sum, s) => sum + s.score, 0);
    
    let trend: 'rising' | 'stable' | 'falling' = 'stable';
    if (recentScore > olderScore * 1.2) trend = 'rising';
    else if (recentScore < olderScore * 0.8) trend = 'falling';
    
    return {
      score: Math.min(Math.max(totalScore, 0), 100),
      signals: signals.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
      trend,
      lastSignalAt: signals.length > 0 ? signals[0].timestamp : contact.createdAt,
      hotTopics: this.extractHotTopics(signals),
      competitorComparisons: contact.aiInsights.competitorMentions || []
    };
  }

  private scoreInteractionForIntent(interaction: ContactInteraction): number {
    const summary = interaction.summary.toLowerCase();
    let score = 0;
    
    // High intent signals
    if (summary.includes('pricing') || summary.includes('cost') || summary.includes('budget')) score += 25;
    if (summary.includes('demo') || summary.includes('trial')) score += 20;
    if (summary.includes('purchase') || summary.includes('buy')) score += 30;
    if (summary.includes('implement') || summary.includes('deploy')) score += 35;
    if (summary.includes('contract') || summary.includes('agreement')) score += 40;
    
    // Medium intent signals
    if (summary.includes('integration')) score += 15;
    if (summary.includes('api')) score += 15;
    if (summary.includes('security') || summary.includes('compliance')) score += 10;
    
    // Engagement-based scoring
    if (interaction.type === 'meeting') score += 20;
    if (interaction.type === 'call') score += 15;
    if (interaction.sentiment === 'positive') score += 10;
    
    return score;
  }

  private mapInteractionToSignalType(interaction: ContactInteraction): IntentSignal['type'] {
    const summary = interaction.summary.toLowerCase();
    
    if (interaction.channel === 'website') return 'website_visit';
    if (summary.includes('download') || summary.includes('ebook') || summary.includes('whitepaper')) return 'content_download';
    if (summary.includes('pricing') || summary.includes('quote')) return 'pricing_view';
    if (summary.includes('demo') || summary.includes('trial')) return 'demo_request';
    if (interaction.channel === 'email') return 'email_open';
    if (['linkedin', 'twitter', 'facebook'].includes(interaction.channel)) return 'social_engagement';
    if (summary.includes('competitor') || summary.includes('alternative')) return 'competitor_research';
    
    return 'website_visit';
  }

  private calculateSignalDecay(timestamp: Date): number {
    const daysSince = (new Date().getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24);
    // Exponential decay: 100% at day 0, 50% at day 30, 25% at day 60
    return Math.exp(-0.023 * daysSince);
  }

  private detectBudgetSignals(contact: SocialCRMContact): BudgetSignal[] {
    const signals: BudgetSignal[] = [];
    
    // Look for budget mentions in interactions
    for (const interaction of contact.interactions) {
      const summary = interaction.summary.toLowerCase();
      
      if (summary.includes('budget') || summary.includes('funding') || summary.includes('allocation')) {
        signals.push({
          indicator: 'Budget mentioned',
          confidence: 70,
          estimatedBudget: 0,
          budgetRange: [10000, 100000],
          signals: [interaction.summary]
        });
      }
    }
    
    return signals;
  }

  private predictDecisionTimeline(contact: SocialCRMContact, signals: IntentSignal[]): AdvancedAIInsights['decisionTimeline'] {
    const urgencySignals = signals.filter(s => 
      s.type === 'demo_request' || s.type === 'pricing_view'
    );
    
    const hasHighEngagement = contact.engagement.totalInteractions > 10;
    const hasPositiveSentiment = contact.interactions.filter(i => i.sentiment === 'positive').length > 
      contact.interactions.filter(i => i.sentiment === 'negative').length;
    
    if (urgencySignals.length >= 3 && hasHighEngagement && hasPositiveSentiment) {
      return 'immediate';
    } else if (urgencySignals.length >= 2 && hasHighEngagement) {
      return '3months';
    } else if (contact.engagement.totalInteractions > 5) {
      return '6months';
    } else {
      return '1year';
    }
  }

  private extractHotTopics(signals: IntentSignal[]): string[] {
    const topicFrequency = new Map<string, number>();
    
    for (const signal of signals) {
      const words = signal.details?.summary?.toLowerCase().split(' ') || [];
      for (const word of words) {
        if (word.length > 4) {
          topicFrequency.set(word, (topicFrequency.get(word) || 0) + signal.score);
        }
      }
    }
    
    return Array.from(topicFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([topic]) => topic);
  }

  // ============================================
  // ENHANCEMENT: ORGANIZATIONAL CHART (Phase 2)
  // ============================================

  async generateOrgChart(accountId: string): Promise<AccountIntelligence> {
    const account = this.pipelines.get(accountId);
    if (!account) {
      // Create org chart for contact's company
      return this.generateContactOrgChart(accountId);
    }
    
    // Get all contacts involved in this account/pipeline
    const contacts = this.getContactsForPipeline(accountId);
    const orgChart: OrgChartNode[] = [];
    
    for (const contact of contacts) {
      const node = this.mapContactToOrgNode(contact, contacts);
      orgChart.push(node);
    }
    
    // Identify buying committee
    const buyingCommittee = orgChart
      .filter(n => n.role === 'decision_maker' || n.role === 'economic_buyer')
      .map(n => n.contactId);
    
    // Find whitespace opportunities
    const whitespace = this.identifyWhitespaceOpportunities(contacts);
    
    return {
      accountId,
      orgChart,
      buyingCommittee,
      pastChampions: [],
      relationshipHealth: this.calculateRelationshipHealth(orgChart),
      whitespaceOpportunities: whitespace,
      accountPenetration: {
        totalEmployees: 100, // Would come from external data
        knownContacts: contacts.length,
        activeUsers: contacts.filter(c => c.engagement.totalInteractions > 0).length,
        penetrationRate: contacts.length / 100
      },
      strategicInitiatives: [],
      recentChanges: {},
      competitiveLandscape: {
        competitorsInEvaluation: [],
        switchingLikelihood: 50
      }
    };
  }

  private mapContactToOrgNode(contact: SocialCRMContact, allContacts: SocialCRMContact[]): OrgChartNode {
    // Infer role from job title
    const title = contact.profile.jobTitle?.toLowerCase() || '';
    let role: OrgChartNode['role'] = 'user';
    
    if (title.includes('ceo') || title.includes('cto') || title.includes('cfo') || title.includes('chief')) {
      role = 'decision_maker';
    } else if (title.includes('vp') || title.includes('vice president') || title.includes('director')) {
      role = 'decision_maker';
    } else if (title.includes('manager') && !title.includes('project manager')) {
      role = 'influencer';
    } else if (title.includes('buyer') || title.includes('procurement')) {
      role = 'economic_buyer';
    } else if (title.includes('engineer') || title.includes('developer') || title.includes('it')) {
      role = 'technical_buyer';
    }
    
    // Infer influence score
    const influenceScore = contact.leadScore * 0.6 + contact.engagement.score * 0.4;
    
    // Calculate relationship strength
    const relationshipStrength = contact.engagement.loyaltyScore;
    
    return {
      contactId: contact.id,
      role,
      influenceScore,
      relationshipStrength,
      reportingTo: undefined, // Would need external data
      manages: [],
      crossFunctionalTeams: [],
      engagementHistory: {
        lastContact: contact.lastContactedAt || contact.createdAt,
        totalInteractions: contact.engagement.totalInteractions,
        sentiment: contact.interactions.length > 0 
          ? (contact.interactions.filter(i => i.sentiment === 'positive').length / contact.interactions.length) * 100
          : 50
      },
      roleInDecision: this.inferDecisionRole(contact),
      painPoints: contact.aiInsights.nextBestActions.map(a => a.action),
      motivations: contact.preferences.content.interests,
      objections: contact.interactions.filter(i => i.sentiment === 'negative').map(i => i.summary)
    };
  }

  private inferDecisionRole(contact: SocialCRMContact): string {
    const title = contact.profile.jobTitle?.toLowerCase() || '';
    
    if (title.includes('ceo') || title.includes('founder')) return 'Final decision maker';
    if (title.includes('cto') || title.includes('cio')) return 'Technical evaluator';
    if (title.includes('cfo')) return 'Budget approver';
    if (title.includes('vp') || title.includes('director')) return 'Department decision maker';
    if (title.includes('manager')) return 'Influencer and user';
    return 'End user';
  }

  private calculateRelationshipHealth(orgChart: OrgChartNode[]): number {
    if (orgChart.length === 0) return 0;
    
    const avgStrength = orgChart.reduce((sum, n) => sum + n.relationshipStrength, 0) / orgChart.length;
    const decisionMakerEngaged = orgChart.some(n => 
      n.role === 'decision_maker' && n.engagementHistory.totalInteractions > 0
    );
    
    // Boost score if we have decision maker engagement
    return decisionMakerEngaged ? Math.min(avgStrength * 1.2, 100) : avgStrength;
  }

  private identifyWhitespaceOpportunities(contacts: SocialCRMContact[]): ProductGap[] {
    // Analyze current purchases and identify gaps
    const purchasedCategories = new Set<string>();
    
    for (const contact of contacts) {
      for (const purchase of contact.purchases) {
        purchase.products.forEach(p => purchasedCategories.add(p));
      }
    }
    
    const gaps: ProductGap[] = [];
    const allCategories = ['CRM', 'Marketing', 'Sales', 'Support', 'Analytics', 'AI Agents'];
    
    for (const category of allCategories) {
      if (!purchasedCategories.has(category)) {
        gaps.push({
          productCategory: category,
          currentSpend: 0,
          estimatedOpportunity: 50000,
          competitor: 'Unknown',
          fitScore: 85,
          priority: 8,
          recommendedApproach: `Cross-sell ${category} module based on usage patterns`
        });
      }
    }
    
    return gaps;
  }

  private generateContactOrgChart(contactId: string): AccountIntelligence {
    const contact = this.contacts.get(contactId);
    if (!contact) throw new Error(`Contact ${contactId} not found`);
    
    // Single contact org chart
    const orgChart = [this.mapContactToOrgNode(contact, [contact])];
    
    return {
      accountId: contactId,
      orgChart,
      buyingCommittee: orgChart.filter(n => n.role === 'decision_maker').map(n => n.contactId),
      pastChampions: [],
      relationshipHealth: orgChart[0]?.relationshipStrength || 0,
      whitespaceOpportunities: this.identifyWhitespaceOpportunities([contact]),
      accountPenetration: {
        totalEmployees: 1,
        knownContacts: 1,
        activeUsers: contact.engagement.totalInteractions > 0 ? 1 : 0,
        penetrationRate: 1
      },
      strategicInitiatives: [],
      recentChanges: {},
      competitiveLandscape: {
        competitorsInEvaluation: [],
        switchingLikelihood: 50
      }
    };
  }

  // ============================================
  // ENHANCEMENT: SMART SEQUENCES (Phase 3)
  // ============================================

  async createSmartSequence(
    name: string,
    trigger: SmartSequence['trigger'],
    conditions: AutomationCondition[],
    actions: SequenceAction[]
  ): Promise<SmartSequence> {
    const sequence: SmartSequence = {
      id: randomUUID(),
      name,
      trigger,
      conditions,
      actions,
      aiOptimization: {
        bestSendTime: true,
        contentPersonalization: true,
        channelOptimization: true,
        aBTesting: false
      },
      performance: {
        enrolled: 0,
        completed: 0,
        converted: 0,
        avgTimeToConvert: 0,
        revenueGenerated: 0
      }
    };
    
    // Store sequence (would persist to DB in production)
    this.logEvent('social-crm', 'sequence_created', { sequenceId: sequence.id, name, trigger });
    
    return sequence;
  }

  async enrollInSequence(contactId: string, sequenceId: string): Promise<boolean> {
    const contact = this.contacts.get(contactId);
    if (!contact) return false;
    
    // In production, this would trigger the sequence workflow
    this.logEvent('social-crm', 'contact_enrolled', { contactId, sequenceId });
    
    return true;
  }

  async executeSequenceAction(contactId: string, action: SequenceAction): Promise<void> {
    const contact = this.contacts.get(contactId);
    if (!contact) return;
    
    switch (action.type) {
      case 'email':
        // Trigger email send
        this.logEvent('social-crm', 'sequence_email', { contactId, content: action.content });
        break;
      case 'task':
        // Create task for sales rep
        this.logEvent('social-crm', 'sequence_task', { contactId, content: action.content });
        break;
      case 'ai_consultation':
        if (action.aiAgentId) {
          await agentConsultingService.initiateConsultation(
            'crm-sequence',
            action.aiAgentId,
            'Sequence Action',
            `Contact ${contactId} needs action: ${action.content}`,
            { type: 'analytical', priority: 'medium' }
          );
        }
        break;
      case 'wait':
        // Delay handled by scheduler
        break;
    }
  }

  // ============================================
  // ENHANCEMENT: DATA ENRICHMENT (Phase 3)
  // ============================================

  async enrichContact(
    contactId: string,
    sources: DataEnrichmentSource['provider'][] = ['linkedin', 'clearbit']
  ): Promise<DataEnrichmentSource[]> {
    const contact = this.contacts.get(contactId);
    if (!contact) throw new Error(`Contact ${contactId} not found`);
    
    const enrichmentData: DataEnrichmentSource[] = [];
    
    for (const source of sources) {
      try {
        const data = await this.fetchEnrichmentData(contact, source);
        enrichmentData.push(data);
        
        // Update contact with enriched data
        this.applyEnrichment(contact, data);
      } catch (error) {
        this.logEvent('social-crm', 'enrichment_failed', { contactId, source, error: String(error) });
      }
    }
    
    this.contacts.set(contactId, contact);
    
    this.logEvent('social-crm', 'contact_enriched', { 
      contactId, 
      sources: enrichmentData.map(e => e.provider),
      fieldsEnriched: enrichmentData.flatMap(e => Object.keys(e.fields))
    });
    
    return enrichmentData;
  }

  private async fetchEnrichmentData(
    contact: SocialCRMContact,
    provider: DataEnrichmentSource['provider']
  ): Promise<DataEnrichmentSource> {
    // In production, this would call actual enrichment APIs
    const mockData: Record<string, any> = {
      linkedin: {
        companySize: '50-200',
        industry: 'Technology',
        revenue: 10000000,
        techStack: ['Salesforce', 'HubSpot', 'Slack'],
        companyDescription: 'Fast-growing SaaS company'
      },
      clearbit: {
        companyType: 'private',
        raised: 25000000,
        employees: 150,
        foundedYear: 2018,
        location: 'San Francisco, CA'
      }
    };
    
    return {
      provider,
      lastEnriched: new Date(),
      confidence: 85,
      fields: mockData[provider] || {},
      rawData: mockData[provider]
    };
  }

  private applyEnrichment(contact: SocialCRMContact, enrichment: DataEnrichmentSource): void {
    const fields = enrichment.fields;
    
    if (fields.companySize || fields.employees) {
      // Update firmographics
      contact.customFields.companySize = fields.companySize || fields.employees;
    }
    
    if (fields.industry) {
      contact.customFields.industry = fields.industry;
    }
    
    if (fields.techStack) {
      contact.customFields.techStack = fields.techStack;
    }
    
    if (fields.revenue || fields.raised) {
      contact.customFields.companyRevenue = fields.revenue || fields.raised;
    }
  }

  async monitorTriggerEvents(contactId: string): Promise<TriggerEvent[]> {
    const contact = this.contacts.get(contactId);
    if (!contact) return [];
    
    // In production, this would monitor external data sources
    // For now, return empty array
    return [];
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
