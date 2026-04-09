import { MarketingAnalyticsService } from '../../../services/marketing-analytics-service';
import { jest } from '@jest/globals';

// Mock dependencies
jest.mock('../../../db/connection', () => ({
  db: {
    select: jest.fn(() => ({
      from: jest.fn(() => ({
        where: jest.fn(() => ({
          orderBy: jest.fn(() => ({
            limit: jest.fn(() => ({
              execute: jest.fn()
            }))
          }))
        }))
      }))
    }))
  }
}));

jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => 'mock-uuid'),
  createHash: jest.fn(() => ({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn(() => 'mock-hash')
  }))
}));

describe('MarketingAnalyticsService', () => {
  let service: MarketingAnalyticsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new MarketingAnalyticsService();
  });

  describe('Customer Journey Analytics', () => {
    it('should analyze customer journey touchpoints', async () => {
      const mockJourneyData = {
        journeyId: 'journey-123',
        customerId: 'customer-123',
        touchpoints: [
          {
            id: 'tp-1',
            type: 'email',
            channel: 'newsletter',
            timestamp: new Date('2023-01-01'),
            interaction: 'opened',
            conversionValue: 0
          },
          {
            id: 'tp-2',
            type: 'website',
            channel: 'product-page',
            timestamp: new Date('2023-01-02'),
            interaction: 'viewed',
            conversionValue: 50
          }
        ],
        totalValue: 50,
        conversionRate: 0.5,
        journeyDuration: 86400000, // 1 day in ms
        pathEfficiency: 0.8
      };

      jest.spyOn(service as any, 'analyzeCustomerJourney').mockResolvedValue(mockJourneyData);

      const result = await service.analyzeCustomerJourney('customer-123', {
        startDate: '2023-01-01',
        endDate: '2023-12-31'
      });

      expect(result.journeyId).toBe('journey-123');
      expect(result.touchpoints).toHaveLength(2);
      expect(result.totalValue).toBe(50);
      expect(result.conversionRate).toBe(0.5);
    });

    it('should calculate journey path analysis', async () => {
      const mockPathAnalysis = {
        commonPaths: [
          {
            path: ['email', 'website', 'purchase'],
            frequency: 45,
            conversionRate: 0.12,
            averageValue: 150
          },
          {
            path: ['social', 'website', 'purchase'],
            frequency: 32,
            conversionRate: 0.08,
            averageValue: 120
          }
        ],
        dropoffPoints: [
          {
            touchpoint: 'website',
            dropoffRate: 0.35,
            reason: 'price_concern',
            improvement: 'optimize pricing display'
          }
        ],
        optimalPaths: [
          {
            path: ['email', 'landing_page', 'purchase'],
            conversionRate: 0.18,
            value: 200
          }
        ]
      };

      jest.spyOn(service as any, 'analyzeJourneyPaths').mockResolvedValue(mockPathAnalysis);

      const result = await service.analyzeJourneyPaths('org-123');

      expect(result.commonPaths).toHaveLength(2);
      expect(result.dropoffPoints).toHaveLength(1);
      expect(result.optimalPaths).toHaveLength(1);
      expect(result.commonPaths[0].frequency).toBe(45);
    });

    it('should generate touchpoint attribution', async () => {
      const mockAttribution = {
        firstTouch: {
          channel: 'email',
          attribution: 0.3,
          value: 300
        },
        lastTouch: {
          channel: 'website',
          attribution: 0.5,
          value: 500
        },
        linear: {
          email: 0.25,
          website: 0.25,
          social: 0.25,
          direct: 0.25
        },
        timeDecay: {
          email: 0.4,
          website: 0.3,
          social: 0.2,
          direct: 0.1
        },
        positionBased: {
          email: 0.4,
          website: 0.2,
          social: 0.2,
          direct: 0.2
        }
      };

      jest.spyOn(service as any, 'generateTouchpointAttribution').mockResolvedValue(mockAttribution);

      const result = await service.generateTouchpointAttribution('customer-123');

      expect(result.firstTouch.channel).toBe('email');
      expect(result.lastTouch.channel).toBe('website');
      expect(result.linear.email).toBe(0.25);
      expect(result.timeDecay.email).toBe(0.4);
    });
  });

  describe('Marketing ROI Analysis', () => {
    it('should calculate campaign ROI', async () => {
      const mockROI = {
        campaignId: 'campaign-123',
        totalSpend: 5000,
        totalRevenue: 15000,
        roi: 2.0, // 200% return
        roas: 3.0, // 3x return on ad spend
        cac: 50, // customer acquisition cost
        ltv: 300, // lifetime value
        ltv_cac_ratio: 6.0,
        paybackPeriod: 60, // days
        breakEvenPoint: 166.67,
        profitMargin: 0.67,
        incrementalLift: 0.15
      };

      jest.spyOn(service as any, 'calculateCampaignROI').mockResolvedValue(mockROI);

      const result = await service.calculateCampaignROI('campaign-123');

      expect(result.roi).toBe(2.0);
      expect(result.roas).toBe(3.0);
      expect(result.cac).toBe(50);
      expect(result.ltv_cac_ratio).toBe(6.0);
    });

    it('should analyze channel performance', async () => {
      const mockChannelPerformance = {
        channels: [
          {
            name: 'email',
            spend: 2000,
            revenue: 8000,
            roi: 3.0,
            conversions: 80,
            cpc: 0.25,
            cpa: 25,
            ctr: 0.05,
            conversionRate: 0.04
          },
          {
            name: 'social',
            spend: 3000,
            revenue: 9000,
            roi: 2.0,
            conversions: 60,
            cpc: 0.50,
            cpa: 50,
            ctr: 0.02,
            conversionRate: 0.02
          }
        ],
        topPerforming: 'email',
        budgetRecommendations: [
          {
            channel: 'email',
            recommendation: 'increase_budget',
            percentage: 0.2,
            reasoning: 'High ROI and conversion rate'
          }
        ]
      };

      jest.spyOn(service as any, 'analyzeChannelPerformance').mockResolvedValue(mockChannelPerformance);

      const result = await service.analyzeChannelPerformance('org-123');

      expect(result.channels).toHaveLength(2);
      expect(result.topPerforming).toBe('email');
      expect(result.channels[0].roi).toBe(3.0);
      expect(result.budgetRecommendations).toHaveLength(1);
    });

    it('should perform cohort analysis', async () => {
      const mockCohortAnalysis = {
        cohorts: [
          {
            cohort: '2023-01',
            size: 1000,
            retentionRates: [1.0, 0.8, 0.6, 0.5, 0.4],
            averageLTV: 250,
            cac: 40
          },
          {
            cohort: '2023-02',
            size: 1200,
            retentionRates: [1.0, 0.85, 0.7, 0.6],
            averageLTV: 280,
            cac: 35
          }
        ],
        trends: {
          improvingRetention: true,
          increasingLTV: true,
          decreasingCAC: true
        },
        recommendations: [
          {
            type: 'retention_improvement',
            description: 'Focus on Q2 cohort retention',
            impact: 'Increase LTV by 15%'
          }
        ]
      };

      jest.spyOn(service as any, 'performCohortAnalysis').mockResolvedValue(mockCohortAnalysis);

      const result = await service.performCohortAnalysis('org-123');

      expect(result.cohorts).toHaveLength(2);
      expect(result.trends.improvingRetention).toBe(true);
      expect(result.recommendations).toHaveLength(1);
    });
  });

  describe('Marketing Automation Analytics', () => {
    it('should analyze automation funnel performance', async () => {
      const mockFunnelAnalysis = {
        funnelId: 'funnel-123',
        stages: [
          {
            name: 'awareness',
            entries: 10000,
            exits: 2000,
            conversionRate: 0.8,
            avgTimeInStage: 86400
          },
          {
            name: 'consideration',
            entries: 8000,
            exits: 4000,
            conversionRate: 0.5,
            avgTimeInStage: 172800
          },
          {
            name: 'conversion',
            entries: 4000,
            exits: 1000,
            conversionRate: 0.75,
            avgTimeInStage: 43200
          }
        ],
        overallConversionRate: 0.3,
        bottlenecks: ['consideration'],
        optimizations: [
          {
            stage: 'consideration',
            recommendation: 'improve_content',
            potentialLift: 0.15
          }
        ]
      };

      jest.spyOn(service as any, 'analyzeAutomationFunnel').mockResolvedValue(mockFunnelAnalysis);

      const result = await service.analyzeAutomationFunnel('funnel-123');

      expect(result.stages).toHaveLength(3);
      expect(result.overallConversionRate).toBe(0.3);
      expect(result.bottlenecks).toContain('consideration');
      expect(result.optimizations).toHaveLength(1);
    });

    it('should analyze trigger performance', async () => {
      const mockTriggerAnalysis = {
        triggers: [
          {
            triggerId: 'trigger-1',
            name: 'welcome_email',
            type: 'email',
            fires: 500,
            delivered: 485,
            opened: 290,
            clicked: 145,
            converted: 58,
            deliveryRate: 0.97,
            openRate: 0.58,
            clickRate: 0.29,
            conversionRate: 0.12
          }
        ],
        topPerforming: 'trigger-1',
        underperforming: [],
        recommendations: [
          {
            trigger: 'trigger-1',
            action: 'optimize_subject_line',
            expectedImpact: 'increase open rate by 10%'
          }
        ]
      };

      jest.spyOn(service as any, 'analyzeTriggerPerformance').mockResolvedValue(mockTriggerAnalysis);

      const result = await service.analyzeTriggerPerformance('org-123');

      expect(result.triggers).toHaveLength(1);
      expect(result.topPerforming).toBe('trigger-1');
      expect(result.triggers[0].openRate).toBe(0.58);
      expect(result.recommendations).toHaveLength(1);
    });
  });

  describe('Content Performance Analytics', () => {
    it('should analyze content performance', async () => {
      const mockContentAnalysis = {
        content: [
          {
            contentId: 'content-1',
            title: 'Blog Post 1',
            type: 'blog',
            views: 5000,
            engagements: 500,
            shares: 100,
            conversions: 25,
            engagementRate: 0.1,
            shareRate: 0.02,
            conversionRate: 0.005,
            readTime: 180,
            bounceRate: 0.3
          }
        ],
        topPerforming: {
          byViews: 'content-1',
          byEngagements: 'content-1',
          byConversions: 'content-1'
        },
        contentTypes: {
          blog: { count: 10, avgViews: 3000, avgEngagementRate: 0.08 },
          video: { count: 5, avgViews: 8000, avgEngagementRate: 0.12 }
        },
        recommendations: [
          {
            type: 'content_optimization',
            description: 'Create more video content',
            reasoning: 'Higher engagement rates'
          }
        ]
      };

      jest.spyOn(service as any, 'analyzeContentPerformance').mockResolvedValue(mockContentAnalysis);

      const result = await service.analyzeContentPerformance('org-123');

      expect(result.content).toHaveLength(1);
      expect(result.topPerforming.byViews).toBe('content-1');
      expect(result.contentTypes.blog.avgViews).toBe(3000);
      expect(result.recommendations).toHaveLength(1);
    });

    it('should perform topic analysis', async () => {
      const mockTopicAnalysis = {
        topics: [
          {
            topic: 'digital_marketing',
            contentCount: 15,
            totalViews: 45000,
            avgEngagementRate: 0.09,
            trending: true,
            seasonality: 'stable'
          },
          {
            topic: 'ai_tools',
            contentCount: 8,
            totalViews: 32000,
            avgEngagementRate: 0.12,
            trending: true,
            seasonality: 'growing'
          }
        ],
        trendingTopics: ['ai_tools', 'digital_marketing'],
        contentGaps: [
          {
            topic: 'marketing_automation',
            demand: 0.8,
            supply: 0.3,
            opportunity: 'high'
          }
        ],
        recommendations: [
          {
            topic: 'marketing_automation',
            action: 'create_content',
            priority: 'high',
            expectedImpact: 'capture 25% more traffic'
          }
        ]
      };

      jest.spyOn(service as any, 'performTopicAnalysis').mockResolvedValue(mockTopicAnalysis);

      const result = await service.performTopicAnalysis('org-123');

      expect(result.topics).toHaveLength(2);
      expect(result.trendingTopics).toContain('ai_tools');
      expect(result.contentGaps).toHaveLength(1);
      expect(result.recommendations).toHaveLength(1);
    });

    it('should analyze content calendar performance', async () => {
      const mockCalendarAnalysis = {
        calendar: [
          {
            date: '2023-01-01',
            contentPublished: 2,
            totalViews: 5000,
            totalEngagements: 400,
            dayOfWeek: 'Sunday',
            performance: 'above_average'
          },
          {
            date: '2023-01-02',
            contentPublished: 1,
            totalViews: 3000,
            totalEngagements: 200,
            dayOfWeek: 'Monday',
            performance: 'average'
          }
        ],
        bestDays: ['Sunday', 'Wednesday'],
        optimalFrequency: 3, // posts per week
        seasonalityPatterns: {
          Q1: 'high_engagement',
          Q2: 'moderate',
          Q3: 'low',
          Q4: 'high'
        },
        recommendations: [
          {
            type: 'scheduling',
            description: 'Post more content on Sundays',
            expectedLift: 0.15
          }
        ]
      };

      jest.spyOn(service as any, 'analyzeContentCalendar').mockResolvedValue(mockCalendarAnalysis);

      const result = await service.analyzeContentCalendar('org-123', {
        startDate: '2023-01-01',
        endDate: '2023-12-31'
      });

      expect(result.calendar).toHaveLength(2);
      expect(result.bestDays).toContain('Sunday');
      expect(result.optimalFrequency).toBe(3);
      expect(result.recommendations).toHaveLength(1);
    });
  });

  describe('Competitive Intelligence', () => {
    it('should analyze market positioning', async () => {
      const mockPositioning = {
        marketPosition: {
          current: 'challenger',
          target: 'leader',
          marketShare: 0.15,
          competitorShare: 0.25
        },
        competitors: [
          {
            name: 'Competitor A',
            marketShare: 0.25,
            strengths: ['brand_recognition', 'pricing'],
            weaknesses: ['customer_service', 'innovation'],
            strategies: ['price_competition', 'market_expansion']
          }
        ],
        opportunities: [
          {
            type: 'market_gap',
            description: 'Premium segment underserved',
            size: 1000000,
            difficulty: 'medium'
          }
        ],
        threats: [
          {
            type: 'new_entrant',
            description: 'Tech startup with AI platform',
            impact: 'high',
            probability: 0.7
          }
        ],
        recommendations: [
          {
            action: 'differentiate_on_service',
            priority: 'high',
            timeline: '6_months'
          }
        ]
      };

      jest.spyOn(service as any, 'analyzeMarketPositioning').mockResolvedValue(mockPositioning);

      const result = await service.analyzeMarketPositioning('org-123');

      expect(result.marketPosition.current).toBe('challenger');
      expect(result.competitors).toHaveLength(1);
      expect(result.opportunities).toHaveLength(1);
      expect(result.threats).toHaveLength(1);
      expect(result.recommendations).toHaveLength(1);
    });

    it('should perform trend analysis', async () => {
      const mockTrendAnalysis = {
        trends: [
          {
            name: 'AI-powered marketing',
            category: 'technology',
            momentum: 'growing',
            adoptionRate: 0.35,
            timeToMainstream: '18_months',
            impact: 'high',
            relevance: 0.9
          },
          {
            name: 'Privacy-first marketing',
            category: 'compliance',
            momentum: 'accelerating',
            adoptionRate: 0.6,
            timeToMainstream: '6_months',
            impact: 'critical',
            relevance: 0.95
          }
        ],
        emergingSignals: [
          {
            signal: 'Voice commerce integration',
            source: 'tech_blogs',
            confidence: 0.7,
            timeframe: '2_years'
          }
        ],
        recommendations: [
          {
            trend: 'Privacy-first marketing',
            action: 'implement_consent_management',
            urgency: 'immediate',
            resources: 'medium'
          }
        ]
      };

      jest.spyOn(service as any, 'performTrendAnalysis').mockResolvedValue(mockTrendAnalysis);

      const result = await service.performTrendAnalysis('org-123');

      expect(result.trends).toHaveLength(2);
      expect(result.trends[0].name).toBe('AI-powered marketing');
      expect(result.emergingSignals).toHaveLength(1);
      expect(result.recommendations).toHaveLength(1);
    });
  });

  describe('Marketing Dashboard Generation', () => {
    it('should generate comprehensive marketing dashboard', async () => {
      const mockDashboard = {
        overview: {
          totalSpend: 50000,
          totalRevenue: 150000,
          overallROI: 2.0,
          totalConversions: 500,
          avgCAC: 100,
          avgLTV: 300
        },
        kpis: [
          {
            name: 'Marketing ROI',
            value: 2.0,
            target: 2.5,
            status: 'warning',
            trend: 'improving'
          },
          {
            name: 'Conversion Rate',
            value: 0.03,
            target: 0.04,
            status: 'critical',
            trend: 'declining'
          }
        ],
        widgets: [
          {
            type: 'chart',
            title: 'Revenue Trend',
            data: expect.any(Array),
            config: expect.any(Object)
          },
          {
            type: 'metric',
            title: 'Active Campaigns',
            value: 12,
            format: 'number'
          }
        ],
        alerts: [
          {
            level: 'warning',
            message: 'Conversion rate below target',
            recommendation: 'Optimize landing pages'
          }
        ],
        recommendations: [
          {
            category: 'performance',
            priority: 'high',
            action: 'Increase email marketing budget',
            expectedImpact: '15% ROI improvement'
          }
        ],
        lastUpdated: expect.any(Date)
      };

      jest.spyOn(service as any, 'generateMarketingDashboard').mockResolvedValue(mockDashboard);

      const result = await service.generateMarketingDashboard('org-123');

      expect(result.overview.totalSpend).toBe(50000);
      expect(result.overview.overallROI).toBe(2.0);
      expect(result.kpis).toHaveLength(2);
      expect(result.widgets).toHaveLength(2);
      expect(result.alerts).toHaveLength(1);
      expect(result.recommendations).toHaveLength(1);
      expect(result.kpis[0].status).toBe('warning');
    });

    it('should generate real-time performance metrics', async () => {
      const mockRealTimeMetrics = {
        timestamp: expect.any(Date),
        activeCampaigns: 8,
        currentSpend: 2500,
        currentRevenue: 7500,
        activeUsers: 1250,
        conversionRate: 0.032,
        avgResponseTime: 150,
        systemHealth: 'optimal',
        alerts: []
      };

      jest.spyOn(service as any, 'getRealTimeMetrics').mockResolvedValue(mockRealTimeMetrics);

      const result = await service.getRealTimeMetrics('org-123');

      expect(result.activeCampaigns).toBe(8);
      expect(result.currentSpend).toBe(2500);
      expect(result.activeUsers).toBe(1250);
      expect(result.systemHealth).toBe('optimal');
    });
  });
});
