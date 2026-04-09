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
  | 'mention' | 'tag' | 'dm' | 'click' | 'view' | 'reach';

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
        id: 'spam-filter',
        name: 'Spam Filter',
        condition: 'spam',
        parameters: {},
        action: 'hide',
        isEnabled: true
      },
      {
        id: 'toxic-filter',
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
      for (const topic of this.listeningTopics.values()) {
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
      
      for (const content of this.content.values()) {
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
