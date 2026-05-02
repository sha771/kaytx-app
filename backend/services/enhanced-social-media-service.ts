import { AIServiceLogger } from '../lib/ai-service-logger';
import { logAudit } from '../lib/audit';
import { agentConsultingService } from './agent-consulting-service';
import { randomUUID } from 'crypto';
import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

// ============================================
// ENHANCED SOCIAL MEDIA TYPES
// ============================================

export type SocialPlatform = 
  | 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok' 
  | 'youtube' | 'pinterest' | 'snapchat' | 'reddit' | 'threads'
  | 'discord' | 'telegram' | 'whatsapp' | 'messenger';

export type ContentType = 
  | 'post' | 'story' | 'reel' | 'video' | 'live' | 'carousel'
  | 'poll' | 'quiz' | 'thread' | 'article' | 'newsletter';

export type PostStatus = 
  | 'draft' | 'scheduled' | 'pending_approval' | 'publishing' 
  | 'published' | 'failed' | 'archived' | 'boosted';

export type EngagementType =
  | 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry'
  | 'comment' | 'share' | 'save' | 'retweet' | 'quote'
  | 'mention' | 'tag' | 'dm' | 'click' | 'view' | 'reach'
  | 'purchase' | 'add_to_cart' | 'checkout' | 'save_product'; // Social commerce engagements

// ============================================
// ENHANCEMENT: SOCIAL COMMERCE (Phase 1)
// ============================================

export interface ShoppableContent extends SocialMediaContent {
  products: ShoppableProduct[];
  checkoutFlow: 'native' | 'redirect' | 'messenger' | 'instagram_shop' | 'tiktok_shop';
  commerceAnalytics: CommerceAnalytics;
  shopId?: string;
  collectionId?: string;
  isPromoted: boolean;
  promotionBudget?: number;
}

export interface ShoppableProduct {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  video?: string;
  url: string;
  inventory: number;
  inventoryPolicy: 'deny' | 'continue';
  variants: ProductVariant[];
  attributes: Record<string, string>;
  shippingWeight?: number;
  shippingRates: ShippingRate[];
  taxCode?: string;
  isDigital: boolean;
  fulfillmentPartner?: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  price: number;
  inventory: number;
  options: Record<string, string>; // color: red, size: L
  image?: string;
  weight?: number;
  barcode?: string;
}

export interface ShippingRate {
  name: string;
  price: number;
  estimatedDays: number;
  regions: string[];
  minWeight?: number;
  maxWeight?: number;
}

export interface CommerceAnalytics {
  impressions: number;
  clicks: number;
  addToCarts: number;
  checkouts: number;
  purchases: number;
  revenue: number;
  unitsSold: number;
  roas: number; // Return on ad spend
  conversionRate: number;
  avgOrderValue: number;
  abandonedCarts: number;
  recoveredCarts: number;
  byProduct: Record<string, {
    views: number;
    purchases: number;
    revenue: number;
    conversionRate: number;
  }>;
  byAudience: Record<string, {
    views: number;
    purchases: number;
    revenue: number;
  }>;
}

// ============================================
// ENHANCEMENT: SOCIAL CUSTOMER SERVICE (Phase 1)
// ============================================

export interface SocialSupportTicket {
  id: string;
  mentionId: string;
  platform: SocialPlatform;
  originalContent: SocialMention;
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
  status: 'new' | 'assigned' | 'investigating' | 'resolved' | 'closed' | 'escalated';
  category: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  authorInfluence: 'low' | 'medium' | 'high' | 'viral';
  assignedTo?: string;
  aiAgentId?: string;
  crmContactId?: string;
  thread: SupportMessage[];
  resolution?: string;
  satisfaction?: number;
  createdAt: Date;
  resolvedAt?: Date;
  responseTime?: number; // minutes
  handleTime?: number; // minutes
}

export interface SupportMessage {
  id: string;
  platform: SocialPlatform;
  content: string;
  author: string;
  isFromBrand: boolean;
  isAiGenerated: boolean;
  sentiment: string;
  timestamp: Date;
  attachments?: string[];
  internalNote?: string;
}

// ============================================
// ENHANCEMENT: INFLUENCER RELATIONSHIP MANAGEMENT (Phase 2)
// ============================================

export interface InfluencerProfile {
  id: string;
  platform: SocialPlatform;
  handle: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  
  // Audience
  followers: number;
  following: number;
  engagementRate: number;
  avgLikes: number;
  avgComments: number;
  audienceQuality: number; // 0-100, bot detection
  audienceDemographics: AudienceDemographics;
  
  // Influence Tier
  influenceTier: 'nano' | 'micro' | 'mid' | 'macro' | 'mega';
  category: string;
  niche: string[];
  contentQuality: number; // AI-scored 0-100
  postingFrequency: number; // posts per week
  
  // Brand Safety
  brandSafety: number; // 0-100 risk score
  previousControversies: string[];
  contentFlags: string[];
  competitorMentions: string[];
  
  // Relationship
  relationshipStatus: 'prospect' | 'outreach' | 'negotiating' | 'active' | 'inactive' | 'blacklisted';
  relationshipStrength: number; // 0-100
  firstContact?: Date;
  lastContact?: Date;
  assignedManager?: string;
  tags: string[];
  notes: string[];
  
  // Performance
  estimatedValuePerPost: number;
  estimatedValuePerStory: number;
  estimatedValuePerReel: number;
  historicalPerformance: Collaboration[];
  
  // AI Analysis
  aiInsights: {
    authenticityScore: number;
    growthTrend: 'rising' | 'stable' | 'declining';
    collaborationReadiness: number;
    brandAlignment: number; // 0-100 match with your brand
    recommendedApproach: string;
    consultedAgents: string[];
  };
}

export interface Collaboration {
  id: string;
  campaignId: string;
  influencerId: string;
  status: 'planning' | 'contract_sent' | 'contract_signed' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
  
  // Deliverables
  deliverables: Deliverable[];
  contractValue: number;
  contractTerms: string;
  contentRights: 'usage' | 'ownership' | 'limited';
  exclusivity: boolean;
  exclusivityPeriod?: number; // days
  
  // Timeline
  startDate: Date;
  endDate?: Date;
  milestones: Milestone[];
  
  // Performance
  performance: CollaborationPerformance;
  
  // Management
  contentApprovals: ContentApproval[];
  paymentSchedule: PaymentSchedule;
  communications: CollaborationMessage[];
}

export interface Deliverable {
  id: string;
  type: 'post' | 'story' | 'reel' | 'video' | 'live' | 'blog' | 'review';
  platform: SocialPlatform;
  requirements: string;
  dueDate: Date;
  status: 'pending' | 'in_review' | 'approved' | 'published' | 'rejected';
  submittedContent?: SocialMediaContent;
  publishedUrl?: string;
  performance?: ContentPerformance;
  payment: number;
}

export interface Milestone {
  name: string;
  dueDate: Date;
  completed: boolean;
  completedAt?: Date;
  paymentAmount?: number;
  paymentReleased?: boolean;
}

export interface CollaborationPerformance {
  impressions: number;
  reach: number;
  engagement: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roas: number;
  earnedMediaValue: number;
  costPerEngagement: number;
  costPerClick: number;
  costPerAcquisition: number;
}

export interface ContentApproval {
  deliverableId: string;
  submittedAt: Date;
  reviewedAt?: Date;
  status: 'pending' | 'approved' | 'rejected' | 'revision_requested';
  reviewer?: string;
  feedback?: string;
  revisionCount: number;
}

export interface PaymentSchedule {
  totalValue: number;
  upfrontPercentage: number;
  milestonePayments: { milestone: string; amount: number; released: boolean }[];
  finalPayment: number;
  finalPaymentReleased: boolean;
}

export interface CollaborationMessage {
  timestamp: Date;
  from: string;
  to: string;
  message: string;
  attachments?: string[];
  isInternal: boolean;
}

// ============================================
// ENHANCEMENT: COMMUNITY MANAGEMENT (Phase 2)
// ============================================

export interface CommunityHealth {
  platform: SocialPlatform;
  accountId: string;
  
  // Engagement Metrics
  activeMembers: number;
  newMembers: number; // this week
  churnedMembers: number;
  contentVelocity: number; // posts per day
  responseRate: number; // % of mentions responded
  avgResponseTime: number; // minutes
  
  // Sentiment
  sentimentTrend: 'improving' | 'stable' | 'declining';
  sentimentDistribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
  
  // Health Scores
  overallHealth: number; // 0-100
  engagementHealth: number;
  supportHealth: number;
  growthHealth: number;
  
  // Advocates
  advocateCount: number;
  advocateEngagement: number;
  userGeneratedContent: number; // posts this week
  referralRate: number;
  
  // Risks
  crisisIndicators: CrisisSignal[];
  negativeTrends: string[];
  emergingIssues: string[];
  
  // AI Insights
  aiAnalysis: {
    recommendedActions: string[];
    contentOpportunities: string[];
    engagementPredictions: number;
    riskLevel: 'low' | 'medium' | 'high';
    consultedAgents: string[];
  };
}

export interface CrisisSignal {
  type: 'sentiment_spike' | 'volume_spike' | 'negative_viral' | 'complaint_cluster' | 'competitor_attack' | 'pr_issue';
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: Date;
  description: string;
  affectedChannels: string[];
  mentionsAffected: number;
  estimatedReach: number;
  recommendedResponse: string;
  autoAlertSent: boolean;
  handledBy?: string;
  resolvedAt?: Date;
}

// ============================================
// ENHANCEMENT: AI CONTENT STUDIO (Phase 3)
// ============================================

export interface AIContentStudio {
  contentRequest: ContentRequest;
  generatedVariations: ContentVariation[];
  selectedVariation?: ContentVariation;
  aBTestConfig?: ABTestConfig;
  predictedPerformance: PredictedPerformance;
}

export interface ContentRequest {
  objective: 'awareness' | 'engagement' | 'traffic' | 'leads' | 'sales' | 'community';
  contentType: ContentType;
  platform: SocialPlatform;
  topic: string;
  keywords: string[];
  targetAudience: string;
  tone: 'professional' | 'casual' | 'humorous' | 'inspiring' | 'urgent' | 'educational';
  brandVoice: string;
  includeCta: boolean;
  ctaType?: string;
  referenceContent?: string[];
  competitorAnalysis?: boolean;
  trendHijacking?: string;
}

export interface ContentVariation {
  id: string;
  text: string;
  hashtags: string[];
  mentions: string[];
  media: MediaAsset[];
  cta?: string;
  confidence: number;
  predictedEngagement: number;
  targetSegment?: string;
  generatedBy: string; // AI agent ID
  generatedAt: Date;
  reasoning: string;
}

export interface ABTestConfig {
  testId: string;
  variations: string[]; // variation IDs
  testDuration: number; // days
  successMetric: 'engagement' | 'clicks' | 'conversions' | 'reach';
  minSampleSize: number;
  confidenceLevel: number;
  autoWinnerSelection: boolean;
}

export interface PredictedPerformance {
  engagementRate: number;
  reach: number;
  clicks: number;
  confidence: number; // 0-100
  bestPostingTime: Date;
  bestDayOfWeek: string;
  competitiveAnalysis: {
    similarContentPerformance: number;
    gapOpportunities: string[];
    recommendedDifferentiation: string;
  };
}

export interface CompetitorContentAnalysis {
  competitor: string;
  topPerformingContent: {
    url: string;
    engagement: number;
    topics: string[];
    format: string;
    postedAt: Date;
  }[];
  contentGaps: string[]; // topics they cover that you don't
  yourAdvantages: string[];
  recommendedResponse: string;
}

// ============================================
// ENHANCEMENT: SOCIAL LISTENING 2.0 (Phase 3)
// ============================================

export interface SentimentBreakdown {
  positive: number; // percentage 0-1
  negative: number;
  neutral: number;
}

export interface SocialListening {
  brandMentions: BrandMention[];
  competitorMentions: CompetitorSocialMention[];
  industryTrends: Trend[];
  sentimentAnalysis: SentimentBreakdown;
  crisisDetection: CrisisAlert[];
  opportunitySpotting: SocialOpportunity[];
  influencerDiscovery: InfluencerSignal[];
  leadGeneration: SocialLead[];
}

export interface BrandMention {
  id: string;
  platform: SocialPlatform;
  url: string;
  author: {
    id: string;
    name: string;
    handle: string;
    followers: number;
    influence: number;
    isCustomer?: boolean;
    crmContactId?: string;
  };
  content: string;
  timestamp: Date;
  sentiment: 'positive' | 'negative' | 'neutral';
  engagement: number;
  reach: number;
  tags: string[];
  category: 'praise' | 'complaint' | 'question' | 'comparison' | 'share' | 'review';
  urgency: boolean;
  aiProcessed: boolean;
  aiAction?: 'respond' | 'escalate' | 'monitor' | 'ignore';
  aiDraftResponse?: string;
  responded: boolean;
  responseTime?: number;
}

export interface CompetitorSocialMention {
  competitor: string;
  platform: SocialPlatform;
  context: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
  authorInfluence: number;
  engagement: number;
  viralRisk: boolean;
  opportunityForKaytx?: string;
  recommendedAction?: string;
}

export interface Trend {
  id: string;
  name: string;
  hashtag?: string;
  platform: SocialPlatform;
  volume: number; // mentions/hour
  growthRate: number; // % change
  sentiment: 'positive' | 'negative' | 'neutral';
  peakTime?: Date;
  predictedDuration: number; // hours
  relevanceToBrand: number; // 0-100
  recommendedAction: 'create_content' | 'monitor' | 'ignore';
  contentIdeas: string[];
}

export interface CrisisAlert {
  id: string;
  type: 'sentiment_drop' | 'negative_viral' | 'volume_spike' | 'complaint_cluster' | 'brand_crisis' | 'competitor_attack';
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: Date;
  description: string;
  affectedPlatforms: SocialPlatform[];
  mentionCount: number;
  estimatedReach: number;
  sentiment: number; // -100 to 100
  trend: 'escalating' | 'stable' | 'deescalating';
  rootCause?: string;
  recommendedActions: string[];
  autoNotificationsSent: boolean;
  assignedTo?: string;
  resolvedAt?: Date;
  resolution?: string;
}

export interface SocialOpportunity {
  type: 'trend_hijack' | 'competitor_weakness' | 'influencer_mention' | 'customer_request' | 'pr_opportunity' | 'partnership';
  description: string;
  platform: SocialPlatform;
  source: string;
  timestamp: Date;
  relevanceScore: number;
  urgency: 'low' | 'medium' | 'high';
  recommendedAction: string;
  contentSuggestion?: string;
  estimatedImpact: number;
  expiryTime?: Date;
}

export interface InfluencerSignal {
  influencerId: string;
  handle: string;
  platform: SocialPlatform;
  signal: 'mentioned_brand' | 'engaged_with_content' | 'followed_account' | 'used_hashtag' | 'similar_audience' | 'rising_star';
  strength: number; // 0-100
  timestamp: Date;
  recommendedApproach: string;
  autoTagged: boolean;
}

export interface SocialLead {
  id: string;
  platform: SocialPlatform;
  source: string;
  context: string;
  author: {
    name: string;
    handle: string;
    followers: number;
    company?: string;
    title?: string;
  };
  intent: 'researching' | 'comparing' | 'ready_to_buy' | 'asking_recommendation';
  score: number; // 0-100
  timestamp: Date;
  crmContactCreated: boolean;
  crmContactId?: string;
  assignedTo?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
}

export interface SocialMediaAccount {
  id: string;
  platform: SocialPlatform;
  name: string;
  handle: string;
  profileUrl: string;
  avatarUrl?: string;
  
  // Connection Status
  isConnected: boolean;
  connectedAt: Date;
  lastSyncedAt: Date;
  expiresAt?: Date;
  
  // Permissions
  permissions: string[];
  allowedContentTypes: ContentType[];
  
  // Statistics
  stats: PlatformStats;
  
  // Settings
  settings: PlatformSettings;
  
  // AI Configuration
  aiConfig: {
    autoRespondEnabled: boolean;
    autoScheduleEnabled: boolean;
    contentGenerationEnabled: boolean;
    assignedAgentId?: string;
    consultedAgents: string[];
  };
}

export interface PlatformStats {
  followers: number;
  following: number;
  posts: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    clicks: number;
    views: number;
    reach: number;
  };
  demographics?: AudienceDemographics;
  growth: {
    followers: number; // Weekly change
    engagement: number; // Weekly change
  };
}

export interface AudienceDemographics {
  ageGroups: Record<string, number>;
  gender: Record<string, number>;
  locations: Record<string, number>;
  languages: Record<string, number>;
  interests: Record<string, number>;
  activeHours: Record<number, number>; // Hour -> engagement
}

export interface PlatformSettings {
  postingSchedule: PostingSchedule;
  responseTemplates: ResponseTemplate[];
  moderationRules: ModerationRule[];
  hashtagSets: string[][];
  competitorAccounts: string[];
  keywordsToMonitor: string[];
}

export interface PostingSchedule {
  timezone: string;
  optimalTimes: OptimalPostTime[];
  frequency: {
    min: number;
    max: number;
    per: 'day' | 'week';
  };
}

export interface OptimalPostTime {
  day: string;
  hour: number;
  engagement: number;
  confidence: number;
}

export interface ResponseTemplate {
  id: string;
  name: string;
  trigger: 'keyword' | 'sentiment' | 'question' | 'complaint' | 'praise' | 'all';
  conditions: string[];
  response: string;
  variables: string[];
  isEnabled: boolean;
}

export interface ModerationRule {
  id: string;
  name: string;
  condition: 'spam' | 'toxic' | 'keywords' | 'sentiment' | 'user';
  parameters: Record<string, any>;
  action: 'hide' | 'delete' | 'flag' | 'block' | 'escalate' | 'auto_respond';
  autoResponse?: string;
  isEnabled: boolean;
}

export interface SocialMediaContent {
  id: string;
  correlationId: string;
  
  // Basic Info
  accountId: string;
  platform: SocialPlatform;
  type: ContentType;
  status: PostStatus;
  
  // Content
  content: {
    text: string;
    html?: string;
    hashtags: string[];
    mentions: string[];
    links: string[];
    media: MediaAsset[];
    location?: string;
    altText?: string;
  };
  
  // AI Generated Content
  aiGenerated: {
    isGenerated: boolean;
    generatedBy?: string;
    consultedAgents: string[];
    variations: ContentVariation[];
    confidence: number;
    reasoning: string;
  };
  
  // Publishing
  publishing: {
    scheduledFor?: Date;
    publishedAt?: Date;
    timezone: string;
    wasOptimalTime: boolean;
    boostSettings?: BoostSettings;
  };
  
  // Engagement
  engagement: ContentEngagement;
  
  // Performance
  performance: ContentPerformance;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  approvedBy?: string;
  tags: string[];
  categories: string[];
  campaignId?: string;
}

export interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'gif' | 'audio' | 'document';
  url: string;
  thumbnailUrl?: string;
  duration?: number;
  size: number;
  width?: number;
  height?: number;
  altText?: string;
  metadata: Record<string, any>;
}

export interface ContentVariation {
  id: string;
  text: string;
  hashtags: string[];
  media: MediaAsset[];
  confidence: number;
  targetSegment?: string;
}

export interface BoostSettings {
  isBoosted: boolean;
  budget: number;
  currency: string;
  duration: number; // days
  targetAudience: TargetAudience;
  objective: 'awareness' | 'engagement' | 'traffic' | 'leads' | 'sales';
  results?: BoostResults;
}

export interface TargetAudience {
  ageRange?: [number, number];
  gender?: string[];
  locations?: string[];
  interests?: string[];
  behaviors?: string[];
  customAudiences?: string[];
  lookalikeAudiences?: string[];
}

export interface BoostResults {
  spend: number;
  impressions: number;
  reach: number;
  engagement: number;
  clicks: number;
  conversions: number;
  cpm: number;
  cpc: number;
  roas: number;
}

export interface ContentEngagement {
  total: number;
  byType: Record<EngagementType, number>;
  details: EngagementDetail[];
  trending: boolean;
  viralScore: number;
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export interface EngagementDetail {
  id: string;
  type: EngagementType;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  aiProcessed: boolean;
  aiResponse?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface ContentPerformance {
  score: number;
  rank: 'excellent' | 'good' | 'average' | 'below_average' | 'poor';
  vsAverage: number; // Percentage vs account average
  vsPrevious: number; // Percentage vs previous post
  insights: string[];
  recommendations: string[];
  predictedPerformance?: number;
}

export interface SocialMediaCampaign {
  id: string;
  name: string;
  description: string;
  
  // Strategy
  objective: 'awareness' | 'consideration' | 'conversion' | 'loyalty';
  strategy: string;
  consultedAgents: string[];
  
  // Timeline
  startDate: Date;
  endDate?: Date;
  timezone: string;
  
  // Content
  contentIds: string[];
  contentCalendar: ContentCalendarItem[];
  
  // Targeting
  targetPlatforms: SocialPlatform[];
  targetAudience: TargetAudience;
  
  // Budget
  budget: {
    total: number;
    spent: number;
    remaining: number;
    currency: string;
  };
  
  // Performance
  performance: CampaignPerformance;
  
  // Status
  status: 'planning' | 'active' | 'paused' | 'completed' | 'cancelled';
  
  // AI Features
  aiFeatures: {
    autoOptimizeEnabled: boolean;
    autoRespondEnabled: boolean;
    contentSuggestionsEnabled: boolean;
    performancePredictionEnabled: boolean;
  };
}

export interface ContentCalendarItem {
  id: string;
  contentId?: string;
  scheduledFor: Date;
  platform: SocialPlatform;
  accountId: string;
  status: 'planned' | 'scheduled' | 'published' | 'failed';
  optimalTimeScore: number;
  contentType: ContentType;
  topic: string;
}

export interface CampaignPerformance {
  impressions: number;
  reach: number;
  engagement: number;
  clicks: number;
  conversions: number;
  roas: number;
  cpm: number;
  cpc: number;
  cpa: number;
  
  byPlatform: Record<SocialPlatform, {
    impressions: number;
    engagement: number;
    clicks: number;
    conversions: number;
  }>;
  
  byContent: Record<string, {
    impressions: number;
    engagement: number;
    clicks: number;
    performance: ContentPerformance;
  }>;
}

export interface SocialListeningTopic {
  id: string;
  name: string;
  keywords: string[];
  hashtags: string[];
  accounts: string[];
  platforms: SocialPlatform[];
  
  // Monitoring
  isActive: boolean;
  lastCheckedAt: Date;
  checkFrequency: number; // minutes
  
  // Results
  mentions: SocialMention[];
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };
  volume: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  
  // AI Analysis
  aiAnalysis: {
    trends: string[];
    influencers: string[];
    opportunities: string[];
    threats: string[];
    consultedAgents: string[];
  };
}

export interface SocialMention {
  id: string;
  topicId: string;
  platform: SocialPlatform;
  url: string;
  author: {
    id: string;
    name: string;
    handle: string;
    followers: number;
    influence: number;
  };
  content: string;
  timestamp: Date;
  sentiment: 'positive' | 'negative' | 'neutral';
  engagement: number;
  aiProcessed: boolean;
  aiAction?: string;
  aiResponse?: string;
}

// ============================================
// ENHANCED SOCIAL MEDIA MANAGEMENT SERVICE
// ============================================

class EnhancedSocialMediaService {
  private accounts: Map<string, SocialMediaAccount> = new Map();
  private content: Map<string, SocialMediaContent> = new Map();
  private campaigns: Map<string, SocialMediaCampaign> = new Map();
  private listeningTopics: Map<string, SocialListeningTopic> = new Map();
  private mentions: Map<string, SocialMention> = new Map();
  
  private monitoringInterval: NodeJS.Timeout | null = null;
  private publishingInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startMonitoring();
    this.startPublishingScheduler();
  }

  // ============================================
  // ACCOUNT MANAGEMENT
  // ============================================
  
  async connectAccount(
    platform: SocialPlatform,
    credentials: Record<string, string>,
    options: {
      permissions?: string[];
      autoConfigure?: boolean;
    } = {}
  ): Promise<SocialMediaAccount> {
    const accountId = randomUUID();
    const now = new Date();

    // In production, validate credentials with platform API
    const account: SocialMediaAccount = {
      id: accountId,
      platform,
      name: `${platform}_account`,
      handle: credentials.handle || `@${platform}_user`,
      profileUrl: `https://${platform}.com/${credentials.handle}`,
      isConnected: true,
      connectedAt: now,
      lastSyncedAt: now,
      permissions: options.permissions || ['read', 'write'],
      allowedContentTypes: this.getDefaultContentTypes(platform),
      stats: {
        followers: 0,
        following: 0,
        posts: 0,
        engagement: { likes: 0, comments: 0, shares: 0, saves: 0, clicks: 0, views: 0, reach: 0 },
        growth: { followers: 0, engagement: 0 }
      },
      settings: {
        postingSchedule: {
          timezone: 'UTC',
          optimalTimes: [],
          frequency: { min: 1, max: 5, per: 'day' }
        },
        responseTemplates: [],
        moderationRules: this.getDefaultModerationRules(),
        hashtagSets: [],
        competitorAccounts: [],
        keywordsToMonitor: []
      },
      aiConfig: {
        autoRespondEnabled: true,
        autoScheduleEnabled: true,
        contentGenerationEnabled: true,
        consultedAgents: []
      }
    };

    this.accounts.set(accountId, account);

    AIServiceLogger.logAgentEvent('account_connected', 'social-media', {
      accountId,
      platform,
      handle: account.handle
    });

    // If auto-configure, set up AI agents
    if (options.autoConfigure) {
      await this.configureAIForAccount(accountId);
    }

    return account;
  }

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
        
        logger.warn(`[SocialMedia] Operation failed, retrying (${attempt + 1}/${maxRetries}) in ${delay}ms`, {
          error: error instanceof Error ? error.message : String(error)
        });
          
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    logger.error(`[SocialMedia] Operation failed after ${maxRetries} attempts`, 
      lastError instanceof Error ? lastError : new Error(String(lastError)));
    throw lastError;
  }

  private async configureAIForAccount(accountId: string): Promise<void> {
    const account = this.accounts.get(accountId);
    if (!account) return;

    // Consult with Social Media Manager agent
    const socialManagerAgent = agentConsultingService.findConsultantsByExpertise('social_media')[0];
    const contentAgent = agentConsultingService.findConsultantsByExpertise('content_creation')[0];
    const audienceAgent = agentConsultingService.findConsultantsByExpertise('audience_analysis')[0];

    const consultedAgents: string[] = [];

    if (socialManagerAgent) {
      consultedAgents.push(socialManagerAgent.agentId);
      await this.withRetry(() => agentConsultingService.initiateConsultation(
        'social-media-system',
        socialManagerAgent.agentId,
        'Account Setup: Social Media Strategy',
        `I need help configuring optimal settings for a new ${account.platform} account. ` +
        `Handle: ${account.handle}. Please recommend posting schedule, content strategy, and engagement tactics.`,
        { type: 'advisory', priority: 'medium' }
      )).catch(err => logger.error('Failed to initiate AI consultation for account setup:', err));
    }

    if (contentAgent) {
      consultedAgents.push(contentAgent.agentId);
    }

    if (audienceAgent) {
      consultedAgents.push(audienceAgent.agentId);
    }

    account.aiConfig.consultedAgents = consultedAgents;
    this.accounts.set(accountId, account);
  }

  // ============================================
  // CONTENT CREATION & MANAGEMENT
  // ============================================
  
  async createContent(
    accountId: string,
    type: ContentType,
    options: {
      topic?: string;
      prompt?: string;
      useAI?: boolean;
      schedule?: Date;
      campaignId?: string;
    } = {}
  ): Promise<SocialMediaContent> {
    const account = this.accounts.get(accountId);
    if (!account) throw new Error(`Account ${accountId} not found`);

    const contentId = randomUUID();
    const correlationId = randomUUID();
    const now = new Date();

    let contentText = '';
    let media: MediaAsset[] = [];
    let consultedAgents: string[] = [];
    let aiConfidence = 0;
    let aiReasoning = '';

    // Generate content with AI if requested
    if (options.useAI !== false && account.aiConfig.contentGenerationEnabled) {
      const result = await this.generateContentWithAI(
        account,
        type,
        options.topic,
        options.prompt
      );
      contentText = result.text;
      media = result.media;
      consultedAgents = result.consultedAgents;
      aiConfidence = result.confidence;
      aiReasoning = result.reasoning;
    }

    const content: SocialMediaContent = {
      id: contentId,
      correlationId,
      accountId,
      platform: account.platform,
      type,
      status: options.schedule ? 'scheduled' : 'draft',
      content: {
        text: contentText,
        hashtags: this.extractHashtags(contentText),
        mentions: this.extractMentions(contentText),
        links: this.extractLinks(contentText),
        media
      },
      aiGenerated: {
        isGenerated: options.useAI !== false,
        generatedBy: consultedAgents.length > 0 ? consultedAgents[0] : undefined,
        consultedAgents,
        variations: [],
        confidence: aiConfidence,
        reasoning: aiReasoning
      },
      publishing: {
        scheduledFor: options.schedule,
        timezone: account.settings.postingSchedule.timezone,
        wasOptimalTime: options.schedule ? this.isOptimalTime(account, options.schedule) : false
      },
      engagement: {
        total: 0,
        byType: {} as Record<EngagementType, number>,
        details: [],
        trending: false,
        viralScore: 0,
        sentiment: { positive: 0, negative: 0, neutral: 0 }
      },
      performance: {
        score: 0,
        rank: 'average',
        vsAverage: 0,
        vsPrevious: 0,
        insights: [],
        recommendations: []
      },
      createdAt: now,
      updatedAt: now,
      createdBy: 'ai-system',
      tags: [],
      categories: []
    };

    if (options.campaignId) {
      content.campaignId = options.campaignId;
    }

    this.content.set(contentId, content);

    AIServiceLogger.logAgentEvent('content_created', 'social-media', {
      contentId,
      accountId,
      type,
      aiGenerated: content.aiGenerated.isGenerated,
      correlationId
    });

    return content;
  }

  private async generateContentWithAI(
    account: SocialMediaAccount,
    type: ContentType,
    topic?: string,
    prompt?: string
  ): Promise<{
    text: string;
    media: MediaAsset[];
    consultedAgents: string[];
    confidence: number;
    reasoning: string;
  }> {
    // Find relevant AI agents
    const contentAgents = agentConsultingService.findConsultantsByExpertise('content_creation');
    const socialAgents = agentConsultingService.findConsultantsByExpertise('social_media');
    const copyAgents = agentConsultingService.findConsultantsByExpertise('copywriting');

    const consultedAgents: string[] = [];
    let contentText = '';

    // Consult with content creation agent
    if (contentAgents.length > 0) {
      const contentAgent = contentAgents[0];
      consultedAgents.push(contentAgent.agentId);
      
      const consultation = await agentConsultingService.initiateConsultation(
        'social-media-system',
        contentAgent.agentId,
        `Content Creation: ${topic || type}`,
        `Create a ${type} for ${account.platform}. ` +
        `Topic: ${topic || 'general engagement'}. ` +
        `Target audience: ${Object.entries(account.stats.demographics?.interests || {}).slice(0, 3).map(([k]) => k).join(', ')}. ` +
        `Prompt: ${prompt || 'Create engaging content'}`,
        { type: 'directive', priority: 'medium' }
      );

      // In production, wait for agent response
      contentText = `🚀 New update from our team! ` +
                    `${topic ? `Excited to share about ${topic}.` : 'Check out what we are working on!'} ` +
                    `#${account.platform} #content`;
    }

    // If no content agent, use social media agent
    if (!contentText && socialAgents.length > 0) {
      const socialAgent = socialAgents[0];
      consultedAgents.push(socialAgent.agentId);
      
      contentText = `👋 Hey ${account.platform} community! ` +
                    `Stay tuned for exciting updates. What would you like to see from us? 💭`;
    }

    return {
      text: contentText || 'Coming soon! Stay tuned for updates.',
      media: [],
      consultedAgents,
      confidence: consultedAgents.length > 0 ? 0.8 : 0.5,
      reasoning: `Generated with consultation from ${consultedAgents.length} specialist(s)`
    };
  }

  // ============================================
  // CAMPAIGN MANAGEMENT
  // ============================================
  
  async createCampaign(
    name: string,
    objective: SocialMediaCampaign['objective'],
    options: {
      description?: string;
      startDate?: Date;
      endDate?: Date;
      budget?: number;
      targetPlatforms?: SocialPlatform[];
      autoGenerateContent?: boolean;
    } = {}
  ): Promise<SocialMediaCampaign> {
    const campaignId = randomUUID();
    const now = new Date();

    // Consult with campaign experts
    const campaignAgents = agentConsultingService.findConsultantsByExpertise('campaign_management');
    const marketingAgents = agentConsultingService.findConsultantsByExpertise('marketing_strategy');

    const consultedAgents: string[] = [];

    if (campaignAgents.length > 0) {
      consultedAgents.push(campaignAgents[0].agentId);
    }
    if (marketingAgents.length > 0) {
      consultedAgents.push(marketingAgents[0].agentId);
    }

    const campaign: SocialMediaCampaign = {
      id: campaignId,
      name,
      description: options.description || '',
      objective,
      strategy: 'Multi-platform social media campaign',
      consultedAgents,
      startDate: options.startDate || now,
      endDate: options.endDate,
      timezone: 'UTC',
      contentIds: [],
      contentCalendar: [],
      targetPlatforms: options.targetPlatforms || ['instagram', 'facebook', 'twitter'],
      targetAudience: {
        interests: [],
        locations: []
      },
      budget: {
        total: options.budget || 0,
        spent: 0,
        remaining: options.budget || 0,
        currency: 'USD'
      },
      performance: {
        impressions: 0,
        reach: 0,
        engagement: 0,
        clicks: 0,
        conversions: 0,
        roas: 0,
        cpm: 0,
        cpc: 0,
        cpa: 0,
        byPlatform: {} as Record<SocialPlatform, any>,
        byContent: {}
      },
      status: 'planning',
      aiFeatures: {
        autoOptimizeEnabled: true,
        autoRespondEnabled: true,
        contentSuggestionsEnabled: true,
        performancePredictionEnabled: true
      }
    };

    this.campaigns.set(campaignId, campaign);

    // Auto-generate content if requested
    if (options.autoGenerateContent) {
      await this.generateCampaignContent(campaignId);
    }

    AIServiceLogger.logAgentEvent('campaign_created', 'social-media', {
      campaignId,
      name,
      objective,
      consultedAgents: consultedAgents.length
    });

    return campaign;
  }

  private async generateCampaignContent(campaignId: string): Promise<void> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) return;

    const contentTypes: ContentType[] = ['post', 'story', 'reel', 'carousel'];
    const topics = ['brand_awareness', 'product_feature', 'customer_story', 'engagement'];

    for (let i = 0; i < 4; i++) {
      for (const platform of campaign.targetPlatforms.slice(0, 2)) {
        const account = Array.from(this.accounts.values())
          .find(a => a.platform === platform);
        
        if (account) {
          const content = await this.createContent(
            account.id,
            contentTypes[i % contentTypes.length],
            {
              topic: topics[i % topics.length],
              useAI: true,
              campaignId
            }
          );

          campaign.contentIds.push(content.id);
        }
      }
    }

    this.campaigns.set(campaignId, campaign);
  }

  // ============================================
  // SOCIAL LISTENING
  // ============================================
  
  async createListeningTopic(
    name: string,
    keywords: string[],
    platforms: SocialPlatform[],
    options: {
      hashtags?: string[];
      accounts?: string[];
      checkFrequency?: number;
    } = {}
  ): Promise<SocialListeningTopic> {
    const topicId = randomUUID();
    const now = new Date();

    const topic: SocialListeningTopic = {
      id: topicId,
      name,
      keywords,
      hashtags: options.hashtags || [],
      accounts: options.accounts || [],
      platforms,
      isActive: true,
      lastCheckedAt: now,
      checkFrequency: options.checkFrequency || 60,
      mentions: [],
      sentiment: { positive: 0, negative: 0, neutral: 0 },
      volume: { daily: 0, weekly: 0, monthly: 0 },
      aiAnalysis: {
        trends: [],
        influencers: [],
        opportunities: [],
        threats: [],
        consultedAgents: []
      }
    };

    this.listeningTopics.set(topicId, topic);

    // Consult with social intelligence agents
    const intelligenceAgents = agentConsultingService.findConsultantsByExpertise('social_intelligence');
    if (intelligenceAgents.length > 0) {
      topic.aiAnalysis.consultedAgents = intelligenceAgents.slice(0, 2).map(a => a.agentId);
    }

    AIServiceLogger.logAgentEvent('listening_topic_created', 'social-media', {
      topicId,
      name,
      keywords: keywords.length,
      platforms: platforms.length
    });

    return topic;
  }

  // ============================================
  // ENGAGEMENT MANAGEMENT
  // ============================================
  
  async processEngagement(
    contentId: string,
    engagement: EngagementDetail
  ): Promise<void> {
    const content = this.content.get(contentId);
    if (!content) return;

    // Add engagement
    content.engagement.details.push(engagement);
    content.engagement.total++;
    content.engagement.byType[engagement.type] = 
      (content.engagement.byType[engagement.type] || 0) + 1;

    // Update sentiment
    content.engagement.sentiment[engagement.sentiment]++;

    // Auto-respond with AI if enabled
    const account = this.accounts.get(content.accountId);
    if (account?.aiConfig.autoRespondEnabled && !engagement.aiProcessed) {
      const shouldRespond = this.shouldAutoRespond(engagement, account);
      
      if (shouldRespond) {
        const response = await this.generateEngagementResponse(
          content,
          engagement,
          account
        );
        
        engagement.aiProcessed = true;
        engagement.aiResponse = response;
      }
    }

    this.content.set(contentId, content);
  }

  private shouldAutoRespond(
    engagement: EngagementDetail,
    account: SocialMediaAccount
  ): boolean {
    // Check moderation rules
    for (const rule of account.settings.moderationRules) {
      if (!rule.isEnabled) continue;

      if (rule.condition === 'spam' && this.isSpam(engagement.content)) {
        return false;
      }

      if (rule.condition === 'keywords' && rule.parameters.keywords) {
        const hasKeyword = rule.parameters.keywords.some((k: string) => 
          engagement.content.toLowerCase().includes(k.toLowerCase())
        );
        if (hasKeyword) return rule.action === 'auto_respond';
      }
    }

    // Respond to questions and certain sentiments
    if (engagement.type === 'comment') {
      const text = engagement.content.toLowerCase();
      if (text.includes('?') || 
          text.includes('how') || 
          text.includes('what') ||
          text.includes('when') ||
          text.includes('where')) {
        return true;
      }
    }

    return false;
  }

  private async generateEngagementResponse(
    content: SocialMediaContent,
    engagement: EngagementDetail,
    account: SocialMediaAccount
  ): Promise<string> {
    // Consult with customer support or social media agent
    const supportAgents = agentConsultingService.findConsultantsByExpertise('customer_support');
    const socialAgents = agentConsultingService.findConsultantsByExpertise('social_media');

    let response = '';

    if (engagement.sentiment === 'negative' && supportAgents.length > 0) {
      // Escalate negative feedback
      await agentConsultingService.initiateConsultation(
        account.aiConfig.assignedAgentId || 'social-media-system',
        supportAgents[0].agentId,
        'Negative Feedback Response',
        `A user left negative feedback on our ${account.platform} content. ` +
        `Comment: "${engagement.content}". ` +
        `How should we respond appropriately?`,
        { type: 'advisory', priority: 'high' }
      );

      response = `Thank you for your feedback. We're looking into this and will get back to you soon. ` +
                 `Please DM us if you'd like to discuss further.`;
    } else {
      // Generate positive/neutral response
      const positiveResponses = [
        `Thanks for engaging with our content! 🙌`,
        `We appreciate your support! 💪`,
        `Great question! We'll get back to you shortly.`,
        `Thanks for being part of our community! 🌟`,
        `Love your energy! Thanks for commenting.`
      ];

      response = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    }

    return response;
  }

  // ============================================
  // HELPER METHODS
  // ============================================
  
  private getDefaultContentTypes(platform: SocialPlatform): ContentType[] {
    const defaults: Record<SocialPlatform, ContentType[]> = {
      instagram: ['post', 'story', 'reel', 'carousel', 'live'],
      facebook: ['post', 'story', 'reel', 'live', 'poll'],
      twitter: ['post', 'thread', 'poll'],
      linkedin: ['post', 'article', 'poll', 'newsletter'],
      tiktok: ['video', 'live', 'story'],
      youtube: ['video', 'live', 'story'],
      pinterest: ['post'],
      snapchat: ['story'],
      reddit: ['post', 'poll'],
      threads: ['thread', 'post'],
      discord: ['post'],
      telegram: ['post', 'poll'],
      whatsapp: ['story', 'post'],
      messenger: ['post']
    };

    return defaults[platform] || ['post'];
  }

  private getDefaultModerationRules(): ModerationRule[] {
    return [
      {
        id: 'spam-Filter',
        name: 'Spam Filter',
        condition: 'spam',
        parameters: {},
        action: 'hide',
        isEnabled: true
      },
      {
        id: 'toxic-Filter',
        name: 'Toxic Language Filter',
        condition: 'toxic',
        parameters: {},
        action: 'delete',
        isEnabled: true
      }
    ];
  }

  private extractHashtags(text: string): string[] {
    const matches = text.match(/#\w+/g);
    return matches ? matches.map(t => t.slice(1)) : [];
  }

  private extractMentions(text: string): string[] {
    const matches = text.match(/@\w+/g);
    return matches ? matches.map(m => m.slice(1)) : [];
  }

  private extractLinks(text: string): string[] {
    const matches = text.match(/https?:\/\/[^\s]+/g);
    return matches || [];
  }

  private isOptimalTime(account: SocialMediaAccount, date: Date): boolean {
    const hour = date.getHours();
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    const optimal = account.settings.postingSchedule.optimalTimes.find(
      o => o.day.toLowerCase() === day && Math.abs(o.hour - hour) <= 1
    );

    return !!optimal;
  }

  private isSpam(text: string): boolean {
    const spamIndicators = [
      /buy cheap/i,
      /click here/i,
      /earn money fast/i,
      /free gift/i,
      /limited time only/i,
      /\$\$\$/,
      /http[s]?:\/\/t\.co\/\w{10}/i
    ];

    return spamIndicators.some(pattern => pattern.test(text));
  }

  // ============================================
  // SCHEDULERS
  // ============================================
  
  private startMonitoring(): void {
    this.monitoringInterval = setInterval(async () => {
      // Check for new mentions and engagements
      const topics = Array.from(this.listeningTopics.values());
      for (const topic of topics) {
        if (!topic.isActive) continue;
        
        const now = new Date();
        const minutesSinceLastCheck = 
          (now.getTime() - topic.lastCheckedAt.getTime()) / 60000;
        
        if (minutesSinceLastCheck >= topic.checkFrequency) {
          await this.checkMentions(topic);
          topic.lastCheckedAt = now;
        }
      }
    }, 60000); // Every minute
  }

  private startPublishingScheduler(): void {
    this.publishingInterval = setInterval(async () => {
      const now = new Date();
      
      const contents = Array.from(this.content.values());
      for (const content of contents) {
        if (content.status === 'scheduled' && content.publishing.scheduledFor) {
          if (content.publishing.scheduledFor <= now) {
            await this.publishContent(content.id);
          }
        }
      }
    }, 30000); // Every 30 seconds
  }

  private async checkMentions(topic: SocialListeningTopic): Promise<void> {
    // In production, this would query social media APIs
    // For now, placeholder implementation
    AIServiceLogger.logAgentEvent('mentions_checked', 'social-media', {
      topicId: topic.id,
      keywords: topic.keywords.length,
      platforms: topic.platforms.length
    });
  }

  private async publishContent(contentId: string): Promise<void> {
    const content = this.content.get(contentId);
    if (!content) return;

    // In production, this would call the platform API
    content.status = 'published';
    content.publishing.publishedAt = new Date();
    content.updatedAt = new Date();

    this.content.set(contentId, content);

    AIServiceLogger.logAgentEvent('content_published', 'social-media', {
      contentId,
      platform: content.platform,
      accountId: content.accountId
    });
  }

  // ============================================
  // PUBLIC API
  // ============================================
  
  getAccount(accountId: string): SocialMediaAccount | null {
    return this.accounts.get(accountId) || null;
  }

  getContent(contentId: string): SocialMediaContent | null {
    return this.content.get(contentId) || null;
  }

  getCampaign(campaignId: string): SocialMediaCampaign | null {
    return this.campaigns.get(campaignId) || null;
  }

  getAllAccounts(): SocialMediaAccount[] {
    return Array.from(this.accounts.values());
  }

  getContentForAccount(accountId: string): SocialMediaContent[] {
    return Array.from(this.content.values())
      .filter(c => c.accountId === accountId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getCampaignsForAccount(accountId: string): SocialMediaCampaign[] {
    const account = this.accounts.get(accountId);
    if (!account) return [];

    return Array.from(this.campaigns.values())
      .filter(c => c.targetPlatforms.includes(account.platform))
      .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  }

  getStats(): {
    totalAccounts: number;
    totalContent: number;
    totalCampaigns: number;
    activeCampaigns: number;
    scheduledContent: number;
    listeningTopics: number;
  } {
    return {
      totalAccounts: this.accounts.size,
      totalContent: this.content.size,
      totalCampaigns: this.campaigns.size,
      activeCampaigns: Array.from(this.campaigns.values())
        .filter(c => c.status === 'active').length,
      scheduledContent: Array.from(this.content.values())
        .filter(c => c.status === 'scheduled').length,
      listeningTopics: this.listeningTopics.size
    };
  }

  // ============================================
  // ENHANCEMENT: SOCIAL COMMERCE (Phase 1)
  // ============================================

  async createShoppableContent(
    accountId: string,
    products: ShoppableProduct[],
    options: {
      checkoutFlow?: ShoppableContent['checkoutFlow'];
      isPromoted?: boolean;
      promotionBudget?: number;
    } = {}
  ): Promise<ShoppableContent> {
    const account = this.accounts.get(accountId);
    if (!account) throw new Error(`Account ${accountId} not found`);

    const contentId = randomUUID();
    const correlationId = randomUUID();
    const now = new Date();

    // Generate AI-optimized content for products
    const contentResult = await this.generateContentWithAI(
      account,
      'post',
      `Shoppable products: ${products.map(p => p.name).join(', ')}`,
      `Create compelling social media content showcasing these products with clear CTAs and benefits`
    );

    const shoppableContent: ShoppableContent = {
      id: contentId,
      correlationId,
      accountId,
      platform: account.platform,
      type: 'post',
      status: 'draft',
      content: {
        text: contentResult.text,
        hashtags: this.extractHashtags(contentResult.text),
        mentions: this.extractMentions(contentResult.text),
        links: products.map(p => p.url),
        media: products.flatMap(p => 
          p.images.map((img, idx) => ({
            id: randomUUID(),
            type: 'image' as const,
            url: img,
            thumbnailUrl: img,
            size: 0,
            metadata: { productId: p.id, isPrimary: idx === 0 }
          }))
        )
      },
      aiGenerated: {
        isGenerated: true,
        generatedBy: contentResult.consultedAgents[0],
        consultedAgents: contentResult.consultedAgents,
        variations: [],
        confidence: contentResult.confidence,
        reasoning: contentResult.reasoning
      },
      publishing: {
        timezone: account.settings.postingSchedule.timezone,
        wasOptimalTime: false
      },
      engagement: {
        total: 0,
        byType: {} as Record<EngagementType, number>,
        details: [],
        trending: false,
        viralScore: 0,
        sentiment: { positive: 0, negative: 0, neutral: 0 }
      },
      performance: {
        score: 0,
        rank: 'average',
        vsAverage: 0,
        vsPrevious: 0,
        insights: [],
        recommendations: []
      },
      createdAt: now,
      updatedAt: now,
      createdBy: 'ai-system',
      tags: ['shoppable', 'commerce'],
      categories: ['product', 'sales'],
      products,
      checkoutFlow: options.checkoutFlow || 'native',
      commerceAnalytics: {
        impressions: 0,
        clicks: 0,
        addToCarts: 0,
        checkouts: 0,
        purchases: 0,
        revenue: 0,
        unitsSold: 0,
        roas: 0,
        conversionRate: 0,
        avgOrderValue: 0,
        abandonedCarts: 0,
        recoveredCarts: 0,
        byProduct: products.reduce((acc, p) => {
          acc[p.id] = { views: 0, purchases: 0, revenue: 0, conversionRate: 0 };
          return acc;
        }, {} as Record<string, any>),
        byAudience: {}
      },
      isPromoted: options.isPromoted || false,
      promotionBudget: options.promotionBudget
    };

    this.content.set(contentId, shoppableContent);

    logger.info(`Created shoppable content ${contentId} with ${products.length} products`);

    return shoppableContent;
  }

  async trackCommerceEvent(
    contentId: string,
    event: 'view' | 'click' | 'add_to_cart' | 'checkout' | 'purchase',
    productId?: string,
    value?: number
  ): Promise<void> {
    const content = this.content.get(contentId) as ShoppableContent | undefined;
    if (!content || !content.products) return;

    // Update commerce analytics
    switch (event) {
      case 'view':
        content.commerceAnalytics.impressions++;
        break;
      case 'click':
        content.commerceAnalytics.clicks++;
        if (productId && content.commerceAnalytics.byProduct[productId]) {
          content.commerceAnalytics.byProduct[productId].views++;
        }
        break;
      case 'add_to_cart':
        content.commerceAnalytics.addToCarts++;
        break;
      case 'checkout':
        content.commerceAnalytics.checkouts++;
        break;
      case 'purchase':
        content.commerceAnalytics.purchases++;
        content.commerceAnalytics.revenue += value || 0;
        content.commerceAnalytics.unitsSold++;
        if (productId && content.commerceAnalytics.byProduct[productId]) {
          content.commerceAnalytics.byProduct[productId].purchases++;
          content.commerceAnalytics.byProduct[productId].revenue += value || 0;
        }
        // Recalculate ROAS if promoted
        if (content.isPromoted && content.promotionBudget) {
          content.commerceAnalytics.roas = content.commerceAnalytics.revenue / content.promotionBudget;
        }
        break;
    }

    // Update conversion rate
    content.commerceAnalytics.conversionRate = 
      (content.commerceAnalytics.purchases / content.commerceAnalytics.clicks) * 100 || 0;
    content.commerceAnalytics.avgOrderValue = 
      content.commerceAnalytics.purchases > 0 
        ? content.commerceAnalytics.revenue / content.commerceAnalytics.purchases 
        : 0;

    this.content.set(contentId, content);

    logger.info(`Tracked commerce event ${event} for content ${contentId}`);
  }

  // ============================================
  // ENHANCEMENT: SOCIAL CUSTOMER SERVICE (Phase 1)
  // ============================================

  async createSupportTicketFromMention(mention: SocialMention): Promise<SocialSupportTicket> {
    const ticketId = randomUUID();
    const now = new Date();

    // Determine priority based on sentiment and author influence
    const priority = this.calculateSupportPriority(mention);

    // Check if author is existing customer
    const crmContactId = await this.findOrCreateCRMContact(mention);

    const ticket: SocialSupportTicket = {
      id: ticketId,
      mentionId: mention.id,
      platform: mention.platform,
      originalContent: mention,
      priority,
      status: 'new',
      category: this.categorizeSupportIssue(mention.content),
      sentiment: mention.sentiment,
      authorInfluence: this.calculateAuthorInfluence(mention.author),
      aiAgentId: this.getAIAgentForSupport(),
      crmContactId,
      thread: [],
      createdAt: now
    };

    // Auto-generate AI response if appropriate
    if (priority !== 'critical') {
      ticket.thread.push({
        id: randomUUID(),
        platform: mention.platform,
        content: await this.generateSupportResponse(mention, ticket.category),
        author: 'Kaytx Support',
        isFromBrand: true,
        isAiGenerated: true,
        sentiment: 'positive',
        timestamp: new Date()
      });
      ticket.status = 'investigating';
    }

    logger.info(`Created support ticket ${ticketId} from ${mention.platform} mention`);

    return ticket;
  }

  private calculateSupportPriority(mention: SocialMention): SocialSupportTicket['priority'] {
    // Critical: Viral negative content
    if (mention.sentiment === 'negative' && mention.author.followers > 100000) return 'critical';
    
    // Urgent: High-influence negative
    if (mention.sentiment === 'negative' && mention.author.followers > 10000) return 'urgent';
    
    // High: Negative mentions with engagement
    if (mention.sentiment === 'negative' && mention.engagement > 10) return 'high';
    
    // Medium: Questions or issues from customers
    if (mention.content.toLowerCase().includes('help') || 
        mention.content.toLowerCase().includes('issue') ||
        mention.content.toLowerCase().includes('problem')) return 'medium';
    
    return 'low';
  }

  private categorizeSupportIssue(content: string): string {
    const lower = content.toLowerCase();
    if (lower.includes('login') || lower.includes('access')) return 'Account Access';
    if (lower.includes('billing') || lower.includes('payment') || lower.includes('charge')) return 'Billing';
    if (lower.includes('bug') || lower.includes('error') || lower.includes('broken')) return 'Technical Issue';
    if (lower.includes('feature') || lower.includes('how to')) return 'Feature Request';
    if (lower.includes('refund') || lower.includes('cancel')) return 'Cancellation';
    return 'General Inquiry';
  }

  private calculateAuthorInfluence(author: SocialMention['author']): SocialSupportTicket['authorInfluence'] {
    if (author.followers > 100000) return 'viral';
    if (author.followers > 10000) return 'high';
    if (author.followers > 1000) return 'medium';
    return 'low';
  }

  private getAIAgentForSupport(): string {
    const supportAgents = agentConsultingService.findConsultantsByExpertise('customer_support');
    return supportAgents.length > 0 ? supportAgents[0].agentId : 'ai-support-agent';
  }

  private async findOrCreateCRMContact(mention: SocialMention): Promise<string | undefined> {
    // In production, this would query CRM service
    // For now, return undefined
    return undefined;
  }

  private async generateSupportResponse(mention: SocialMention, category: string): Promise<string> {
    const supportAgent = agentConsultingService.findConsultantsByExpertise('customer_support')[0];
    if (!supportAgent) {
      return `Thanks for reaching out! Our team will look into your ${category.toLowerCase()} and get back to you shortly. 🙏`;
    }

    // In production, this would consult with AI agent
    return `Hi ${mention.author.name}! Thanks for reaching out about ${category.toLowerCase()}. We're on it and will DM you shortly to help resolve this. 💙`;
  }

  // ============================================
  // ENHANCEMENT: INFLUENCER MANAGEMENT (Phase 2)
  // ============================================

  private influencers: Map<string, InfluencerProfile> = new Map();
  private collaborations: Map<string, Collaboration> = new Map();

  async discoverInfluencers(
    platform: SocialPlatform,
    criteria: {
      niche?: string[];
      minFollowers?: number;
      maxFollowers?: number;
      minEngagementRate?: number;
      location?: string;
    }
  ): Promise<InfluencerProfile[]> {
    // In production, this would search social media APIs
    // For now, return mock data
    const mockInfluencers: InfluencerProfile[] = [
      {
        id: randomUUID(),
        platform,
        handle: '@techinfluencer',
        name: 'Tech Reviewer',
        followers: 50000,
        following: 1000,
        engagementRate: 4.5,
        avgLikes: 2000,
        avgComments: 150,
        audienceQuality: 92,
        audienceDemographics: {
          ageGroups: { '18-24': 20, '25-34': 40, '35-44': 25, '45+': 15 },
          gender: { male: 55, female: 43, other: 2 },
          locations: { 'US': 60, 'UK': 15, 'CA': 10 },
          languages: { en: 90 },
          interests: { technology: 80, gadgets: 70, reviews: 60 },
          activeHours: { 9: 10, 12: 15, 18: 25, 21: 20 }
        },
        influenceTier: 'mid',
        category: 'Technology',
        niche: ['SaaS', 'Product Reviews', 'Tech News'],
        contentQuality: 88,
        postingFrequency: 5,
        brandSafety: 95,
        previousControversies: [],
        contentFlags: [],
        competitorMentions: [],
        relationshipStatus: 'prospect',
        relationshipStrength: 0,
        tags: ['b2b', 'tech', 'enterprise'],
        notes: ['Great fit for Kaytx enterprise messaging'],
        estimatedValuePerPost: 2500,
        estimatedValuePerStory: 800,
        estimatedValuePerReel: 1500,
        historicalPerformance: [],
        aiInsights: {
          authenticityScore: 91,
          growthTrend: 'rising',
          collaborationReadiness: 75,
          brandAlignment: 88,
          recommendedApproach: 'Reach out with enterprise-focused collaboration proposal',
          consultedAgents: []
        }
      }
    ];

    // Store for later use
    for (const influencer of mockInfluencers) {
      this.influencers.set(influencer.id, influencer);
    }

    return mockInfluencers;
  }

  async createCollaboration(
    influencerId: string,
    campaignId: string,
    deliverables: Deliverable[],
    contractValue: number,
    options: {
      exclusivity?: boolean;
      contentRights?: Collaboration['contentRights'];
    } = {}
  ): Promise<Collaboration> {
    const influencer = this.influencers.get(influencerId);
    if (!influencer) throw new Error(`Influencer ${influencerId} not found`);

    const collaborationId = randomUUID();
    const now = new Date();

    const collaboration: Collaboration = {
      id: collaborationId,
      campaignId,
      influencerId,
      status: 'planning',
      deliverables,
      contractValue,
      contractTerms: `Standard collaboration agreement with ${options.contentRights || 'usage'} rights`,
      contentRights: options.contentRights || 'usage',
      exclusivity: options.exclusivity || false,
      startDate: now,
      milestones: deliverables.map(d => ({
        name: `${d.type} due`,
        dueDate: d.dueDate,
        completed: false,
        paymentAmount: d.payment,
        paymentReleased: false
      })),
      performance: {
        impressions: 0,
        reach: 0,
        engagement: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        roas: 0,
        earnedMediaValue: 0,
        costPerEngagement: 0,
        costPerClick: 0,
        costPerAcquisition: 0
      },
      contentApprovals: [],
      paymentSchedule: {
        totalValue: contractValue,
        upfrontPercentage: 50,
        milestonePayments: deliverables.map(d => ({
          milestone: `${d.type} published`,
          amount: d.payment * 0.5,
          released: false
        })),
        finalPayment: contractValue * 0.5,
        finalPaymentReleased: false
      },
      communications: []
    };

    this.collaborations.set(collaborationId, collaboration);

    // Update influencer status
    influencer.relationshipStatus = 'outreach';
    this.influencers.set(influencerId, influencer);

    logger.info(`Created collaboration ${collaborationId} with influencer ${influencerId}`);

    return collaboration;
  }

  async analyzeInfluencerPerformance(influencerId: string): Promise<Partial<CollaborationPerformance>> {
    const influencer = this.influencers.get(influencerId);
    if (!influencer) throw new Error(`Influencer ${influencerId} not found`);

    // Aggregate performance from all collaborations
    const influencerCollaborations = Array.from(this.collaborations.values())
      .filter(c => c.influencerId === influencerId);

    if (influencerCollaborations.length === 0) {
      return {
        costPerEngagement: influencer.estimatedValuePerPost / (influencer.followers * influencer.engagementRate / 100),
        costPerClick: influencer.estimatedValuePerPost / (influencer.followers * 0.01),
      };
    }

    const totalEngagement = influencerCollaborations.reduce((sum, c) => sum + c.performance.engagement, 0);
    const totalClicks = influencerCollaborations.reduce((sum, c) => sum + c.performance.clicks, 0);
    const totalCost = influencerCollaborations.reduce((sum, c) => sum + c.contractValue, 0);

    return {
      impressions: influencerCollaborations.reduce((sum, c) => sum + c.performance.impressions, 0),
      engagement: totalEngagement,
      clicks: totalClicks,
      conversions: influencerCollaborations.reduce((sum, c) => sum + c.performance.conversions, 0),
      revenue: influencerCollaborations.reduce((sum, c) => sum + c.performance.revenue, 0),
      roas: totalCost > 0 ? influencerCollaborations.reduce((sum, c) => sum + c.performance.revenue, 0) / totalCost : 0,
      costPerEngagement: totalCost / totalEngagement || 0,
      costPerClick: totalCost / totalClicks || 0,
    };
  }

  // ============================================
  // ENHANCEMENT: COMMUNITY MANAGEMENT (Phase 2)
  // ============================================

  async analyzeCommunityHealth(accountId: string): Promise<CommunityHealth> {
    const account = this.accounts.get(accountId);
    if (!account) throw new Error(`Account ${accountId} not found`);

    // Get recent mentions and engagement
    const accountMentions = Array.from(this.mentions.values())
      .filter(m => this.isMentionForAccount(m, accountId));

    const recentMentions = accountMentions.filter(m => 
      (new Date().getTime() - m.timestamp.getTime()) < (7 * 24 * 60 * 60 * 1000)
    );

    // Calculate sentiment distribution
    const sentimentDist = {
      positive: recentMentions.filter(m => m.sentiment === 'positive').length,
      negative: recentMentions.filter(m => m.sentiment === 'negative').length,
      neutral: recentMentions.filter(m => m.sentiment === 'neutral').length
    };

    const totalMentions = recentMentions.length || 1;

    // Calculate health scores
    const sentimentHealth = (sentimentDist.positive / totalMentions) * 100;
    const responseHealth = this.calculateResponseHealth(accountId, recentMentions);
    const growthHealth = Math.min(account.stats.growth.followers + 50, 100);

    // Identify crisis indicators
    const crisisIndicators = this.detectCrisisIndicators(accountId, recentMentions);

    return {
      platform: account.platform,
      accountId,
      activeMembers: account.stats.followers,
      newMembers: account.stats.growth.followers,
      churnedMembers: 0, // Would need historical data
      contentVelocity: account.stats.posts / 7, // posts per day
      responseRate: responseHealth,
      avgResponseTime: 45, // placeholder
      sentimentTrend: this.calculateSentimentTrend(accountMentions),
      sentimentDistribution: {
        positive: sentimentDist.positive / totalMentions,
        negative: sentimentDist.negative / totalMentions,
        neutral: sentimentDist.neutral / totalMentions
      },
      overallHealth: (sentimentHealth + responseHealth + growthHealth) / 3,
      engagementHealth: account.stats.engagement.likes / (account.stats.followers || 1) * 100,
      supportHealth: responseHealth,
      growthHealth,
      advocateCount: recentMentions.filter(m => m.sentiment === 'positive' && m.engagement > 10).length,
      advocateEngagement: recentMentions.filter(m => m.sentiment === 'positive').reduce((sum, m) => sum + m.engagement, 0),
      userGeneratedContent: recentMentions.filter(m => !m.aiProcessed).length,
      referralRate: 0, // Would need tracking
      crisisIndicators,
      negativeTrends: this.identifyNegativeTrends(recentMentions),
      emergingIssues: [],
      aiAnalysis: {
        recommendedActions: this.generateCommunityRecommendations(crisisIndicators, sentimentHealth),
        contentOpportunities: this.identifyContentOpportunities(accountMentions),
        engagementPredictions: this.predictEngagement(account),
        riskLevel: crisisIndicators.length > 0 ? 'high' : sentimentDist.negative / totalMentions > 0.3 ? 'medium' : 'low',
        consultedAgents: account.aiConfig.consultedAgents
      }
    };
  }

  private isMentionForAccount(mention: SocialMention, accountId: string): boolean {
    // Simplified - in production, check if mention is about this account
    return true;
  }

  private calculateResponseHealth(accountId: string, mentions: SocialMention[]): number {
    if (mentions.length === 0) return 100;
    const responded = mentions.filter(m => m.aiProcessed || m.aiResponse).length;
    return (responded / mentions.length) * 100;
  }

  private calculateSentimentTrend(mentions: SocialMention[]): CommunityHealth['sentimentTrend'] {
    if (mentions.length < 10) return 'stable';
    
    const recent = mentions.slice(-5);
    const older = mentions.slice(-10, -5);
    
    const recentPositive = recent.filter(m => m.sentiment === 'positive').length;
    const olderPositive = older.filter(m => m.sentiment === 'positive').length;
    
    if (recentPositive > olderPositive * 1.2) return 'improving';
    if (recentPositive < olderPositive * 0.8) return 'declining';
    return 'stable';
  }

  private detectCrisisIndicators(accountId: string, mentions: SocialMention[]): CrisisSignal[] {
    const indicators: CrisisSignal[] = [];

    // Check for negative viral content
    const negativeViral = mentions.filter(m => 
      m.sentiment === 'negative' && m.engagement > 50
    );

    for (const mention of negativeViral) {
      indicators.push({
        type: 'negative_viral',
        severity: mention.engagement > 1000 ? 'critical' : 'high',
        detectedAt: new Date(),
        description: `Negative content going viral: ${mention.content.substring(0, 100)}...`,
        affectedChannels: [mention.platform],
        mentionsAffected: 1,
        estimatedReach: mention.engagement * 10,
        recommendedResponse: 'Immediate response from leadership team required',
        autoAlertSent: true
      });
    }

    // Check for volume spikes
    const hourlyMentions = mentions.filter(m => 
      (new Date().getTime() - m.timestamp.getTime()) < (60 * 60 * 1000)
    );

    if (hourlyMentions.length > 10) {
      indicators.push({
        type: 'volume_spike',
        severity: 'medium',
        detectedAt: new Date(),
        description: `Unusual volume of mentions: ${hourlyMentions.length} in last hour`,
        affectedChannels: [hourlyMentions[0]?.platform || 'unknown'],
        mentionsAffected: hourlyMentions.length,
        estimatedReach: hourlyMentions.reduce((sum, m) => sum + m.engagement * 10, 0),
        recommendedResponse: 'Monitor and prepare responses',
        autoAlertSent: true
      });
    }

    return indicators;
  }

  private identifyNegativeTrends(mentions: SocialMention[]): string[] {
    const negative = mentions.filter(m => m.sentiment === 'negative');
    const topics = new Map<string, number>();

    for (const mention of negative) {
      const words = mention.content.toLowerCase().split(' ');
      for (const word of words) {
        if (word.length > 4) {
          topics.set(word, (topics.get(word) || 0) + 1);
        }
      }
    }

    return Array.from(topics.entries())
      .filter(([, count]) => count > 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([topic]) => topic);
  }

  private generateCommunityRecommendations(crisisIndicators: CrisisSignal[], sentimentHealth: number): string[] {
    const recommendations: string[] = [];

    if (crisisIndicators.length > 0) {
      recommendations.push('Activate crisis response team immediately');
      recommendations.push('Pause all scheduled promotional content');
    }

    if (sentimentHealth < 50) {
      recommendations.push('Launch proactive engagement campaign');
      recommendations.push('Review recent product/service changes');
    }

    if (recommendations.length === 0) {
      recommendations.push('Maintain current engagement strategy');
      recommendations.push('Consider amplifying positive community voices');
    }

    return recommendations;
  }

  private identifyContentOpportunities(mentions: SocialMention[]): string[] {
    // Analyze what content is being requested or discussed
    const requests = mentions.filter(m => 
      m.content.toLowerCase().includes('how to') ||
      m.content.toLowerCase().includes('tutorial') ||
      m.content.toLowerCase().includes('tips')
    );

    const opportunities: string[] = [];
    
    if (requests.length > 5) {
      opportunities.push('Create educational content series');
    }

    return opportunities;
  }

  private predictEngagement(account: SocialMediaAccount): number {
    // Simple prediction based on historical performance
    return account.stats.engagement.likes * 1.1;
  }

  // ============================================
  // ENHANCEMENT: AI CONTENT STUDIO (Phase 3)
  // ============================================

  async generateAIContent(
    request: ContentRequest
  ): Promise<AIContentStudio> {
    const account = Array.from(this.accounts.values())
      .find(a => a.platform === request.platform);

    if (!account) throw new Error(`No account found for platform ${request.platform}`);

    // Generate multiple variations
    const variations: ContentVariation[] = [];
    const consultedAgents: string[] = [];

    // Consult with content creation agents
    const contentAgents = agentConsultingService.findConsultantsByExpertise('content_creation');
    const copyAgents = agentConsultingService.findConsultantsByExpertise('copywriting');

    // Generate 3 variations
    for (let i = 0; i < 3; i++) {
      const variationResult = await this.generateContentVariation(
        account,
        request,
        i,
        contentAgents[0]?.agentId,
        copyAgents[0]?.agentId
      );

      variations.push(variationResult);
      if (variationResult.generatedBy) consultedAgents.push(variationResult.generatedBy);
    }

    // Predict performance
    const predictedPerformance: PredictedPerformance = {
      engagementRate: variations.reduce((sum, v) => sum + v.predictedEngagement, 0) / variations.length,
      reach: account.stats.followers * 0.3,
      clicks: Math.floor(account.stats.followers * 0.05),
      confidence: Math.min(variations.reduce((sum, v) => sum + v.confidence, 0) / variations.length * 1.2, 95),
      bestPostingTime: this.calculateBestPostingTime(account),
      bestDayOfWeek: this.calculateBestDayOfWeek(account),
      competitiveAnalysis: {
        similarContentPerformance: account.stats.engagement.likes,
        gapOpportunities: [],
        recommendedDifferentiation: `Focus on ${request.tone} tone to stand out`
      }
    };

    return {
      contentRequest: request,
      generatedVariations: variations,
      selectedVariation: variations[0], // Default to first
      predictedPerformance
    };
  }

  private async generateContentVariation(
    account: SocialMediaAccount,
    request: ContentRequest,
    index: number,
    contentAgentId?: string,
    copyAgentId?: string
  ): Promise<ContentVariation> {
    const now = new Date();
    const generatedBy = contentAgentId || copyAgentId || 'ai-content-agent';

    // Vary tone slightly for each variation
    const tones = ['professional', 'casual', 'humorous'];
    const tone = index === 0 ? request.tone : tones[index % tones.length];

    return {
      id: randomUUID(),
      text: this.generateSampleText(request, tone, index),
      hashtags: this.generateHashtags(request.keywords, index),
      mentions: [],
      media: [],
      cta: request.includeCta ? this.generateCTA(request.objective) : undefined,
      confidence: 75 + Math.random() * 20,
      predictedEngagement: account.stats.engagement.likes * (0.8 + Math.random() * 0.4),
      targetSegment: request.targetAudience,
      generatedBy,
      generatedAt: now,
      reasoning: `Generated with ${tone} tone focusing on ${request.topic}. Optimized for ${request.platform}.`
    };
  }

  private generateSampleText(request: ContentRequest, tone: string, index: number): string {
    const intros = [
      `Excited to share insights on ${request.topic}! 🚀`,
      `Ever wondered about ${request.topic}? Here's what you need to know:`,
      `The future of ${request.topic} is here. Let us break it down for you:`
    ];

    const bodies = [
      `Our latest ${request.topic} features are designed to help you scale faster and work smarter.`,
      `We have been working hard on ${request.topic} to bring you the best experience possible.`,
      `${request.topic} is changing how businesses operate. Here is how we are leading the way.`
    ];

    return `${intros[index % intros.length]} ${bodies[index % bodies.length]}`;
  }

  private generateHashtags(keywords: string[], index: number): string[] {
    const baseTags = keywords.map(k => `#${k.replace(/\s+/g, '')}`);
    const extraTags = ['#innovation', '#growth', '#business', '#ai', '#future'];
    return [...baseTags, ...extraTags.slice(index, index + 2)];
  }

  private generateCTA(objective: ContentRequest['objective']): string {
    const ctas: Record<string, string> = {
      awareness: 'Follow us for more insights!',
      engagement: 'What do you think? Comment below! 👇',
      traffic: 'Link in bio to learn more!',
      leads: 'DM us for a free consultation!',
      sales: 'Shop now via link in bio!',
      community: 'Join the conversation!'
    };
    return ctas[objective] || 'Learn more!';
  }

  private calculateBestPostingTime(account: SocialMediaAccount): Date {
    const optimalTimes = account.settings.postingSchedule.optimalTimes;
    if (optimalTimes.length === 0) {
      return new Date(new Date().setHours(10, 0, 0, 0));
    }
    const best = optimalTimes.sort((a, b) => b.engagement - a.engagement)[0];
    const date = new Date();
    date.setHours(best.hour, 0, 0, 0);
    return date;
  }

  private calculateBestDayOfWeek(account: SocialMediaAccount): string {
    return 'Tuesday'; // Simplified - would analyze historical data
  }

  // ============================================
  // ENHANCEMENT: SOCIAL LISTENING 2.0 (Phase 3)
  // ============================================

  async performSocialListening(query: string): Promise<SocialListening> {
    // In production, this would search across all platforms
    // For now, simulate results based on existing data

    const mentions = Array.from(this.mentions.values());
    const recentMentions = mentions.filter(m => 
      (new Date().getTime() - m.timestamp.getTime()) < (30 * 24 * 60 * 60 * 1000)
    );

    // Filter by query
    const relevantMentions = recentMentions.filter(m =>
      m.content.toLowerCase().includes(query.toLowerCase())
    );

    const brandMentions: BrandMention[] = relevantMentions.map(m => ({
      id: m.id,
      platform: m.platform,
      url: m.url,
      author: {
        ...m.author,
        isCustomer: false, // Would check CRM
        crmContactId: undefined
      },
      content: m.content,
      timestamp: m.timestamp,
      sentiment: m.sentiment,
      engagement: m.engagement,
      reach: m.engagement * 10,
      tags: [],
      category: this.categorizeMention(m.content),
      urgency: m.sentiment === 'negative' && m.engagement > 50,
      aiProcessed: m.aiProcessed,
      aiAction: m.aiAction as any,
      aiDraftResponse: m.aiResponse,
      responded: m.aiProcessed,
      responseTime: undefined
    }));

    return {
      brandMentions,
      competitorMentions: [],
      industryTrends: this.identifyTrends(relevantMentions),
      sentimentAnalysis: this.analyzeSentiment(relevantMentions),
      crisisDetection: this.detectCrisis(relevantMentions),
      opportunitySpotting: this.findOpportunities(relevantMentions, query),
      influencerDiscovery: [],
      leadGeneration: this.identifySocialLeads(relevantMentions)
    };
  }

  private categorizeMention(content: string): BrandMention['category'] {
    const lower = content.toLowerCase();
    if (lower.includes('love') || lower.includes('amazing') || lower.includes('best')) return 'praise';
    if (lower.includes('hate') || lower.includes('terrible') || lower.includes('worst')) return 'complaint';
    if (lower.includes('how') || lower.includes('what') || lower.includes('?')) return 'question';
    if (lower.includes('vs') || lower.includes('compared to') || lower.includes('alternative')) return 'comparison';
    if (lower.includes('share') || lower.includes('rt') || lower.includes('repost')) return 'share';
    return 'review';
  }

  private identifyTrends(mentions: SocialMention[]): Trend[] {
    // Extract hashtags and frequent terms
    const hashtagCounts = new Map<string, number>();

    for (const mention of mentions) {
      const hashtags = mention.content.match(/#\w+/g) || [];
      for (const hashtag of hashtags) {
        hashtagCounts.set(hashtag, (hashtagCounts.get(hashtag) || 0) + 1);
      }
    }

    return Array.from(hashtagCounts.entries())
      .filter(([, count]) => count > 3)
      .map(([hashtag, volume]) => ({
        id: randomUUID(),
        name: hashtag,
        hashtag,
        platform: mentions[0]?.platform || 'twitter',
        volume,
        growthRate: 25,
        sentiment: 'positive',
        predictedDuration: 48,
        relevanceToBrand: 70,
        recommendedAction: 'create_content',
        contentIdeas: [`Create content about ${hashtag}`, `Engage with ${hashtag} community`]
      }));
  }

  private analyzeSentiment(mentions: SocialMention[]): SentimentBreakdown {
    const total = mentions.length || 1;
    return {
      positive: mentions.filter(m => m.sentiment === 'positive').length / total,
      negative: mentions.filter(m => m.sentiment === 'negative').length / total,
      neutral: mentions.filter(m => m.sentiment === 'neutral').length / total
    };
  }

  private detectCrisis(mentions: SocialMention[]): CrisisAlert[] {
    const negativeMentions = mentions.filter(m => m.sentiment === 'negative');
    const alerts: CrisisAlert[] = [];

    if (negativeMentions.length > 10) {
      const viralNegative = negativeMentions.filter(m => m.engagement > 100);
      
      if (viralNegative.length > 0) {
        alerts.push({
          id: randomUUID(),
          type: 'negative_viral',
          severity: 'high',
          detectedAt: new Date(),
          description: `${viralNegative.length} negative posts gaining traction`,
          affectedPlatforms: [viralNegative[0].platform],
          mentionCount: negativeMentions.length,
          estimatedReach: viralNegative.reduce((sum, m) => sum + m.engagement * 10, 0),
          sentiment: -50,
          trend: 'escalating',
          recommendedActions: ['Immediate response', 'Escalate to PR team'],
          autoNotificationsSent: true
        });
      }
    }

    return alerts;
  }

  private findOpportunities(mentions: SocialMention[], query: string): SocialOpportunity[] {
    const opportunities: SocialOpportunity[] = [];

    // Look for requests/recommendations
    const requests = mentions.filter(m => 
      m.content.toLowerCase().includes('recommend') ||
      m.content.toLowerCase().includes('suggestion') ||
      m.content.toLowerCase().includes('looking for')
    );

    for (const request of requests) {
      opportunities.push({
        type: 'customer_request',
        description: `User requesting ${query} recommendations: ${request.content.substring(0, 100)}...`,
        platform: request.platform,
        source: request.author.handle,
        timestamp: request.timestamp,
        relevanceScore: 90,
        urgency: 'high',
        recommendedAction: 'Engage with helpful response and soft pitch',
        contentSuggestion: `We can help with that! Check out our ${query} solutions...`,
        estimatedImpact: 100
      });
    }

    return opportunities;
  }

  private identifySocialLeads(mentions: SocialMention[]): SocialLead[] {
    return mentions
      .filter(m => {
        const lower = m.content.toLowerCase();
        return lower.includes('pricing') || 
               lower.includes('demo') || 
               lower.includes('trial') ||
               lower.includes('buy');
      })
      .map(m => ({
        id: randomUUID(),
        platform: m.platform,
        source: m.id,
        context: m.content,
        author: {
          name: m.author.name,
          handle: m.author.handle,
          followers: m.author.followers
        },
        intent: m.content.toLowerCase().includes('buy') ? 'ready_to_buy' : 'researching',
        score: Math.min(m.author.followers / 1000 + 50, 95),
        timestamp: m.timestamp,
        crmContactCreated: false,
        status: 'new'
      }));
  }

  destroy(): void {
    if (this.monitoringInterval) clearInterval(this.monitoringInterval);
    if (this.publishingInterval) clearInterval(this.publishingInterval);
  }
}

// ============================================
// EXPORT SINGLETON
// ============================================

export const enhancedSocialMediaService = new EnhancedSocialMediaService();

export default enhancedSocialMediaService;
