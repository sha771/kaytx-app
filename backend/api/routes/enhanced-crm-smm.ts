import { Hono } from 'hono';
import { requireAuth } from '../../middleware/rbac-middleware';
import { validateInput } from '../../middleware/comprehensive-validation';
import { z } from 'zod';

// Import enhanced services
import { socialCRMService } from '../../services/social-crm-service';
import { enhancedSocialMediaService } from '../../services/enhanced-social-media-service';

const router = new Hono();

// Apply authentication to all routes
router.use('*', requireAuth());

// ============================================
// ENHANCED CRM ROUTES - Revenue Intelligence
// ============================================

/**
 * GET /api/crm/revenue-intelligence
 * Get comprehensive revenue analytics including forecast, cohorts, attribution
 */
router.get('/crm/revenue-intelligence', async (c) => {
  try {
    const auth = (c as any).get('auth') as any;
    
    const intelligence = await socialCRMService.generateRevenueIntelligence();
    
    return c.json({
      success: true,
      data: intelligence
    });
  } catch (error) {
    console.error('Revenue intelligence error:', error);
    return c.json({ error: 'Failed to generate revenue intelligence' }, 500);
  }
});

/**
 * GET /api/crm/contacts/:id/advanced-score
 * Get AI-powered lead score with intent signals
 */
router.get('/crm/contacts/:id/advanced-score', async (c) => {
  try {
    const { id } = c.req.param();
    
    const scoreData = await socialCRMService.calculateAdvancedLeadScore(id);
    
    return c.json({
      success: true,
      data: scoreData
    });
  } catch (error) {
    console.error('Advanced scoring error:', error);
    return c.json({ error: 'Failed to calculate advanced score' }, 500);
  }
});

/**
 * GET /api/crm/accounts/:id/org-chart
 * Get organizational chart and account intelligence
 */
router.get('/crm/accounts/:id/org-chart', async (c) => {
  try {
    const { id } = c.req.param();
    
    const orgChart = await socialCRMService.generateOrgChart(id);
    
    return c.json({
      success: true,
      data: orgChart
    });
  } catch (error) {
    console.error('Org chart error:', error);
    return c.json({ error: 'Failed to generate org chart' }, 500);
  }
});

/**
 * POST /api/crm/smart-sequences
 * Create a smart nurture sequence with AI optimization
 */
const createSequenceSchema = z.object({
  name: z.string(),
  trigger: z.enum(['lead_score_change', 'intent_detected', 'engagement_drop', 'stage_change', 'time_based']),
  conditions: z.array(z.object({
    type: z.enum(['score_threshold', 'behavior', 'attribute', 'time', 'interaction']),
    operator: z.enum(['equals', 'greater_than', 'less_than', 'contains', 'has_not']),
    field: z.string(),
    value: z.any(),
    timeWindow: z.number().optional()
  })),
  actions: z.array(z.object({
    type: z.enum(['email', 'sms', 'linkedin_message', 'task', 'call', 'content_share', 'wait', 'ai_consultation']),
    content: z.string().optional(),
    templateId: z.string().optional(),
    delay: z.number(),
    channel: z.enum(['email', 'phone', 'sms', 'whatsapp', 'linkedin', 'twitter', 'facebook', 'instagram', 'tiktok', 'meeting', 'webchat', 'slack', 'teams', 'discord']).optional(),
    aiAgentId: z.string().optional()
  }))
});

router.post('/crm/smart-sequences', validateInput(createSequenceSchema, 'body'), async (c) => {
  try {
    const body = (c as any).get('validatedBody') as z.infer<typeof createSequenceSchema>;
    
    const sequence = await socialCRMService.createSmartSequence(
      body.name,
      body.trigger,
      body.conditions,
      body.actions
    );
    
    return c.json({
      success: true,
      data: sequence
    });
  } catch (error) {
    console.error('Sequence creation error:', error);
    return c.json({ error: 'Failed to create smart sequence' }, 500);
  }
});

/**
 * POST /api/crm/contacts/:id/enrich
 * Enrich contact data from external sources
 */
router.post('/crm/contacts/:id/enrich', async (c) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();
    
    const sources = body.sources || ['linkedin', 'clearbit'];
    
    const enrichmentData = await socialCRMService.enrichContact(id, sources);
    
    return c.json({
      success: true,
      data: enrichmentData
    });
  } catch (error) {
    console.error('Enrichment error:', error);
    return c.json({ error: 'Failed to enrich contact' }, 500);
  }
});

// ============================================
// ENHANCED SMM ROUTES - Social Commerce
// ============================================

/**
 * POST /api/smm/shoppable-content
 * Create shoppable social media content with product tags
 */
const shoppableContentSchema = z.object({
  accountId: z.string(),
  products: z.array(z.object({
    id: z.string(),
    sku: z.string(),
    name: z.string(),
    price: z.number(),
    currency: z.string(),
    images: z.array(z.string()),
    url: z.string(),
    inventory: z.number(),
    variants: z.array(z.object({
      id: z.string(),
      sku: z.string(),
      title: z.string(),
      price: z.number(),
      inventory: z.number(),
      options: z.record(z.string())
    })).optional()
  })),
  checkoutFlow: z.enum(['native', 'redirect', 'messenger', 'instagram_shop', 'tiktok_shop']).optional(),
  isPromoted: z.boolean().optional(),
  promotionBudget: z.number().optional()
});

router.post('/smm/shoppable-content', validateInput(shoppableContentSchema, 'body'), async (c) => {
  try {
    const body = (c as any).get('validatedBody') as z.infer<typeof shoppableContentSchema>;
    
    const content = await enhancedSocialMediaService.createShoppableContent(
      body.accountId,
      body.products as any,
      {
        checkoutFlow: body.checkoutFlow,
        isPromoted: body.isPromoted,
        promotionBudget: body.promotionBudget
      }
    );
    
    return c.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Shoppable content error:', error);
    return c.json({ error: 'Failed to create shoppable content' }, 500);
  }
});

/**
 * POST /api/smm/commerce-events
 * Track commerce events (view, click, add_to_cart, purchase)
 */
const commerceEventSchema = z.object({
  contentId: z.string(),
  event: z.enum(['view', 'click', 'add_to_cart', 'checkout', 'purchase']),
  productId: z.string().optional(),
  value: z.number().optional()
});

router.post('/smm/commerce-events', validateInput(commerceEventSchema, 'body'), async (c) => {
  try {
    const body = (c as any).get('validatedBody') as z.infer<typeof commerceEventSchema>;
    
    await enhancedSocialMediaService.trackCommerceEvent(
      body.contentId,
      body.event,
      body.productId,
      body.value
    );
    
    return c.json({
      success: true,
      message: 'Event tracked successfully'
    });
  } catch (error) {
    console.error('Commerce event error:', error);
    return c.json({ error: 'Failed to track commerce event' }, 500);
  }
});

// ============================================
// ENHANCED SMM ROUTES - Influencer Management
// ============================================

/**
 * POST /api/smm/influencers/discover
 * Discover influencers by platform and criteria
 */
const discoverInfluencersSchema = z.object({
  platform: z.enum(['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok', 'youtube']),
  niche: z.array(z.string()).optional(),
  minFollowers: z.number().optional(),
  maxFollowers: z.number().optional(),
  minEngagementRate: z.number().optional(),
  location: z.string().optional()
});

router.post('/smm/influencers/discover', validateInput(discoverInfluencersSchema, 'body'), async (c) => {
  try {
    const body = (c as any).get('validatedBody') as z.infer<typeof discoverInfluencersSchema>;
    
    const influencers = await enhancedSocialMediaService.discoverInfluencers(
      body.platform,
      {
        niche: body.niche,
        minFollowers: body.minFollowers,
        maxFollowers: body.maxFollowers,
        minEngagementRate: body.minEngagementRate,
        location: body.location
      }
    );
    
    return c.json({
      success: true,
      data: influencers
    });
  } catch (error) {
    console.error('Influencer discovery error:', error);
    return c.json({ error: 'Failed to discover influencers' }, 500);
  }
});

/**
 * POST /api/smm/influencers/:id/collaborations
 * Create collaboration with influencer
 */
const createCollaborationSchema = z.object({
  campaignId: z.string(),
  deliverables: z.array(z.object({
    type: z.enum(['post', 'story', 'reel', 'video', 'live', 'blog', 'review']),
    platform: z.enum(['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok', 'youtube']),
    requirements: z.string(),
    dueDate: z.string(), // ISO date
    payment: z.number()
  })),
  contractValue: z.number(),
  exclusivity: z.boolean().optional(),
  contentRights: z.enum(['usage', 'ownership', 'limited']).optional()
});

router.post('/smm/influencers/:id/collaborations', validateInput(createCollaborationSchema, 'body'), async (c) => {
  try {
    const { id } = c.req.param();
    const body = (c as any).get('validatedBody') as z.infer<typeof createCollaborationSchema>;
    
    const collaboration = await enhancedSocialMediaService.createCollaboration(
      id,
      body.campaignId,
      body.deliverables.map(d => ({
        ...d,
        dueDate: new Date(d.dueDate),
        status: 'pending'
      })) as any,
      body.contractValue,
      {
        exclusivity: body.exclusivity,
        contentRights: body.contentRights
      }
    );
    
    return c.json({
      success: true,
      data: collaboration
    });
  } catch (error) {
    console.error('Collaboration creation error:', error);
    return c.json({ error: 'Failed to create collaboration' }, 500);
  }
});

/**
 * GET /api/smm/influencers/:id/performance
 * Get influencer performance analytics
 */
router.get('/smm/influencers/:id/performance', async (c) => {
  try {
    const { id } = c.req.param();
    
    const performance = await enhancedSocialMediaService.analyzeInfluencerPerformance(id);
    
    return c.json({
      success: true,
      data: performance
    });
  } catch (error) {
    console.error('Performance analysis error:', error);
    return c.json({ error: 'Failed to analyze influencer performance' }, 500);
  }
});

// ============================================
// ENHANCED SMM ROUTES - Community Management
// ============================================

/**
 * GET /api/smm/accounts/:id/community-health
 * Get comprehensive community health metrics
 */
router.get('/smm/accounts/:id/community-health', async (c) => {
  try {
    const { id } = c.req.param();
    
    const health = await enhancedSocialMediaService.analyzeCommunityHealth(id);
    
    return c.json({
      success: true,
      data: health
    });
  } catch (error) {
    console.error('Community health error:', error);
    return c.json({ error: 'Failed to analyze community health' }, 500);
  }
});

// ============================================
// ENHANCED SMM ROUTES - AI Content Studio
// ============================================

/**
 * POST /api/smm/ai-content
 * Generate AI-powered content with variations
 */
const aiContentSchema = z.object({
  objective: z.enum(['awareness', 'engagement', 'traffic', 'leads', 'sales', 'community']),
  contentType: z.enum(['post', 'story', 'reel', 'video', 'live', 'carousel', 'poll', 'quiz', 'thread', 'article', 'newsletter']),
  platform: z.enum(['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok', 'youtube', 'pinterest', 'snapchat']),
  topic: z.string(),
  keywords: z.array(z.string()),
  targetAudience: z.string(),
  tone: z.enum(['professional', 'casual', 'humorous', 'inspiring', 'urgent', 'educational']),
  brandVoice: z.string(),
  includeCta: z.boolean(),
  ctaType: z.string().optional(),
  referenceContent: z.array(z.string()).optional(),
  competitorAnalysis: z.boolean().optional(),
  trendHijacking: z.string().optional()
});

router.post('/smm/ai-content', validateInput(aiContentSchema, 'body'), async (c) => {
  try {
    const body = (c as any).get('validatedBody') as z.infer<typeof aiContentSchema>;
    
    const result = await enhancedSocialMediaService.generateAIContent(body as any);
    
    return c.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('AI content generation error:', error);
    return c.json({ error: 'Failed to generate AI content' }, 500);
  }
});

// ============================================
// ENHANCED SMM ROUTES - Social Listening 2.0
// ============================================

/**
 * POST /api/smm/social-listening
 * Perform comprehensive social listening
 */
const socialListeningSchema = z.object({
  query: z.string()
});

router.post('/smm/social-listening', validateInput(socialListeningSchema, 'body'), async (c) => {
  try {
    const body = (c as any).get('validatedBody') as z.infer<typeof socialListeningSchema>;
    
    const result = await enhancedSocialMediaService.performSocialListening(body.query);
    
    return c.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Social listening error:', error);
    return c.json({ error: 'Failed to perform social listening' }, 500);
  }
});

// ============================================
// HEALTH CHECK
// ============================================

router.get('/health', (c) => {
  return c.json({
    success: true,
    message: 'Enhanced CRM & SMM API is running',
    timestamp: new Date().toISOString()
  });
});

export default router;
