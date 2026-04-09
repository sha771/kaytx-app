/**
 * Comprehensive Unit Tests for Consolidated Analytics Service
 * Tests all functionality including business analytics, reporting, and metrics
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { ConsolidatedAnalyticsService } from '../../../services/consolidated-analytics-service';
import { db } from '../../../db/connection';
import { eq, and, gte, lte, desc, sql } from 'drizzle-orm';

// Mock dependencies
jest.mock('../../../db/connection');
jest.mock('../../../services/consolidated-audit-service');

describe('ConsolidatedAnalyticsService', () => {
  let analyticsService: ConsolidatedAnalyticsService;
  let mockDb: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock database
    mockDb = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      having: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      onConflictDoUpdate: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({}),
    };

    // Use jest.requireMock to get the mocked db
    const mockedDb = jest.requireMock('../../../db/connection').db;
    Object.assign(mockedDb, mockDb);
    analyticsService = new ConsolidatedAnalyticsService();
  });

  afterEach(async () => {
    await analyticsService.cleanup();
  });

  describe('Usage Analytics', () => {
    it('should calculate usage metrics', async () => {
      const mockUsageData = [
        { date: '2024-01-01', activeUsers: 100, totalRequests: 1000 },
        { date: '2024-01-02', activeUsers: 120, totalRequests: 1200 },
        { date: '2024-01-03', activeUsers: 110, totalRequests: 1100 }
      ];

      mockDb.select.mockReturnValue(mockUsageData);

      const result = await analyticsService.getUsageAnalytics('org-123', {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-03'),
        granularity: 'daily'
      });

      expect(result).toHaveLength(3);
      expect(result[0].activeUsers).toBe(100);
      expect(result[0].totalRequests).toBe(1000);
      expect(mockDb.groupBy).toHaveBeenCalled();
    });

    it('should calculate user engagement metrics', async () => {
      const mockEngagementData = [
        { userId: 'user-1', sessionCount: 10, avgSessionDuration: 1800, lastActive: new Date() },
        { userId: 'user-2', sessionCount: 5, avgSessionDuration: 900, lastActive: new Date() }
      ];

      mockDb.select.mockReturnValue(mockEngagementData);

      const result = await analyticsService.getUserEngagementMetrics('org-123');

      expect(result).toHaveLength(2);
      expect(result[0].sessionCount).toBe(10);
      expect(result[0].avgSessionDuration).toBe(1800);
    });

    it('should track feature usage', async () => {
      const mockFeatureData = [
        { feature: 'ai-assistant', usageCount: 500, uniqueUsers: 50 },
        { feature: 'email-campaigns', usageCount: 300, uniqueUsers: 30 },
        { feature: 'lead-management', usageCount: 200, uniqueUsers: 20 }
      ];

      mockDb.select.mockReturnValue(mockFeatureData);

      const result = await analyticsService.getFeatureUsage('org-123');

      expect(result).toHaveLength(3);
      expect(result[0].feature).toBe('ai-assistant');
      expect(result[0].usageCount).toBe(500);
      expect(result[0].uniqueUsers).toBe(50);
    });
  });

  describe('Business Analytics', () => {
    it('should calculate revenue metrics', async () => {
      const mockRevenueData = [
        { month: '2024-01', revenue: 10000, subscriptions: 100, churnRate: 0.05 },
        { month: '2024-02', revenue: 12000, subscriptions: 120, churnRate: 0.03 }
      ];

      mockDb.select.mockReturnValue(mockRevenueData);

      const result = await analyticsService.getRevenueAnalytics('org-123', {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-02-29')
      });

      expect(result).toHaveLength(2);
      expect(result[0].revenue).toBe(10000);
      expect(result[0].subscriptions).toBe(100);
      expect(result[0].churnRate).toBe(0.05);
    });

    it('should calculate conversion funnel metrics', async () => {
      const mockFunnelData = [
        { stage: 'visitors', count: 10000, conversionRate: 1.0 },
        { stage: 'signups', count: 1000, conversionRate: 0.1 },
        { stage: 'trials', count: 500, conversionRate: 0.5 },
        { stage: 'customers', count: 100, conversionRate: 0.2 }
      ];

      mockDb.select.mockReturnValue(mockFunnelData);

      const result = await analyticsService.getConversionFunnel('org-123');

      expect(result).toHaveLength(4);
      expect(result[0].stage).toBe('visitors');
      expect(result[0].count).toBe(10000);
      expect(result[0].conversionRate).toBe(1.0);
    });

    it('should calculate customer lifetime value', async () => {
      const mockCLVData = [
        { customerId: 'cust-1', totalRevenue: 1200, subscriptionMonths: 12, avgMonthlyValue: 100 },
        { customerId: 'cust-2', totalRevenue: 600, subscriptionMonths: 6, avgMonthlyValue: 100 }
      ];

      mockDb.select.mockReturnValue(mockCLVData);

      const result = await analyticsService.getCustomerLifetimeValue('org-123');

      expect(result).toHaveLength(2);
      expect(result[0].totalRevenue).toBe(1200);
      expect(result[0].avgMonthlyValue).toBe(100);
    });
  });

  describe('Campaign Analytics', () => {
    it('should analyze email campaign performance', async () => {
      const mockCampaignData = [
        {
          campaignId: 'campaign-1',
          sent: 1000,
          delivered: 950,
          opened: 400,
          clicked: 80,
          converted: 20,
          revenue: 2000
        }
      ];

      mockDb.select.mockReturnValue(mockCampaignData);

      const result = await analyticsService.getCampaignAnalytics('org-123', 'campaign-1');

      expect(result).toBeDefined();
      expect(result.sent).toBe(1000);
      expect(result.delivered).toBe(950);
      expect(result.openRate).toBe(400 / 950);
      expect(result.clickRate).toBe(80 / 400);
      expect(result.conversionRate).toBe(20 / 80);
    });

    it('should perform A/B test analysis', async () => {
      const mockABTestData = [
        {
          variant: 'A',
          sent: 500,
          opened: 200,
          clicked: 40,
          converted: 10,
          revenue: 1000
        },
        {
          variant: 'B',
          sent: 500,
          opened: 250,
          clicked: 60,
          converted: 15,
          revenue: 1500
        }
      ];

      mockDb.select.mockReturnValue(mockABTestData);

      const result = await analyticsService.getABTestAnalysis('org-123', 'test-123');

      expect(result).toHaveLength(2);
      expect(result[0].variant).toBe('A');
      expect(result[1].variant).toBe('B');
      expect(result[1].conversionRate).toBeGreaterThan(result[0].conversionRate);
    });

    it('should calculate campaign ROI', async () => {
      const mockROIData = {
        campaignCost: 500,
        campaignRevenue: 2000,
        sent: 1000,
        conversions: 20
      };

      mockDb.select.mockReturnValue([mockROIData]);

      const result = await analyticsService.getCampaignROI('org-123', 'campaign-1');

      expect(result.roi).toBe((2000 - 500) / 500);
      expect(result.costPerAcquisition).toBe(500 / 20);
      expect(result.revenuePerEmail).toBe(2000 / 1000);
    });
  });

  describe('Platform Metrics', () => {
    it('should calculate system performance metrics', async () => {
      const mockPerformanceData = [
        {
          timestamp: new Date(),
          cpuUsage: 45.5,
          memoryUsage: 60.2,
          diskUsage: 30.1,
          responseTime: 150,
          errorRate: 0.01
        }
      ];

      mockDb.select.mockReturnValue(mockPerformanceData);

      const result = await analyticsService.getSystemMetrics();

      expect(result).toHaveLength(1);
      expect(result[0].cpuUsage).toBe(45.5);
      expect(result[0].memoryUsage).toBe(60.2);
      expect(result[0].responseTime).toBe(150);
    });

    it('should track API endpoint performance', async () => {
      const mockAPIData = [
        {
          endpoint: '/api/agents',
          requestCount: 1000,
          avgResponseTime: 200,
          errorRate: 0.02,
          statusCodes: { '200': 980, '400': 15, '500': 5 }
        },
        {
          endpoint: '/api/conversations',
          requestCount: 500,
          avgResponseTime: 150,
          errorRate: 0.01,
          statusCodes: { '200': 495, '400': 3, '500': 2 }
        }
      ];

      mockDb.select.mockReturnValue(mockAPIData);

      const result = await analyticsService.getAPIPerformanceMetrics();

      expect(result).toHaveLength(2);
      expect(result[0].endpoint).toBe('/api/agents');
      expect(result[0].requestCount).toBe(1000);
      expect(result[0].avgResponseTime).toBe(200);
    });

    it('should monitor database performance', async () => {
      const mockDBData = [
        {
          timestamp: new Date(),
          queryTime: 50,
          connectionCount: 25,
          cacheHitRate: 0.85,
          slowQueries: 2
        }
      ];

      mockDb.select.mockReturnValue(mockDBData);

      const result = await analyticsService.getDatabaseMetrics();

      expect(result).toHaveLength(1);
      expect(result[0].queryTime).toBe(50);
      expect(result[0].cacheHitRate).toBe(0.85);
      expect(result[0].slowQueries).toBe(2);
    });
  });

  describe('Reporting', () => {
    it('should generate comprehensive reports', async () => {
      const mockReportData = {
        usage: [
          { date: '2024-01-01', activeUsers: 100, totalRequests: 1000 }
        ],
        revenue: [
          { month: '2024-01', revenue: 10000, subscriptions: 100 }
        ],
        performance: [
          { timestamp: new Date(), avgResponseTime: 150, errorRate: 0.01 }
        ]
      };

      mockDb.select.mockReturnValue(mockReportData.usage)
        .mockReturnValueOnce(mockReportData.revenue)
        .mockReturnValueOnce(mockReportData.performance);

      const result = await analyticsService.generateReport('org-123', {
        type: 'comprehensive',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31')
      });

      expect(result.usage).toHaveLength(1);
      expect(result.revenue).toHaveLength(1);
      expect(result.performance).toHaveLength(1);
      expect(result.summary).toBeDefined();
    });

    it('should export reports in different formats', async () => {
      const mockReportData = {
        usage: [{ date: '2024-01-01', activeUsers: 100 }],
        revenue: [{ month: '2024-01', revenue: 10000 }]
      };

      mockDb.select.mockReturnValue(mockReportData.usage)
        .mockReturnValueOnce(mockReportData.revenue);

      const jsonReport = await analyticsService.exportReport('org-123', {
        type: 'monthly',
        format: 'json'
      });

      const csvReport = await analyticsService.exportReport('org-123', {
        type: 'monthly',
        format: 'csv'
      });

      expect(jsonReport).toContain('"usage"');
      expect(csvReport).toContain('date,activeUsers');
    });

    it('should schedule automated reports', async () => {
      const scheduleConfig = {
        organizationId: 'org-123',
        reportType: 'weekly',
        recipients: ['admin@example.com'],
        schedule: '0 9 * * 1', // Every Monday at 9 AM
        format: 'pdf'
      };

      mockDb.execute.mockResolvedValue({ insertId: 'schedule-123' });

      const result = await analyticsService.scheduleReport(scheduleConfig);

      expect(result).toBeDefined();
      expect(result.schedule).toBe(scheduleConfig.schedule);
      expect(mockDb.insert).toHaveBeenCalled();
    });
  });

  describe('Real-time Analytics', () => {
    it('should calculate real-time metrics', async () => {
      const mockRealTimeData = {
        activeUsers: 150,
        currentRequests: 25,
        systemLoad: 0.65,
        errorRate: 0.005
      };

      mockDb.select.mockReturnValue([mockRealTimeData]);

      const result = await analyticsService.getRealTimeMetrics('org-123');

      expect(result.activeUsers).toBe(150);
      expect(result.currentRequests).toBe(25);
      expect(result.systemLoad).toBe(0.65);
    });

    it('should detect anomalies in metrics', async () => {
      const mockAnomalyData = [
        {
          timestamp: new Date(),
          metric: 'responseTime',
          value: 5000, // Unusually high
          threshold: 1000,
          severity: 'high'
        }
      ];

      mockDb.select.mockReturnValue(mockAnomalyData);

      const result = await analyticsService.detectAnomalies('org-123');

      expect(result).toHaveLength(1);
      expect(result[0].metric).toBe('responseTime');
      expect(result[0].severity).toBe('high');
    });

    it('should provide alerts for critical metrics', async () => {
      const mockAlertData = [
        {
          id: 'alert-1',
          metric: 'errorRate',
          currentValue: 0.1,
          threshold: 0.05,
          severity: 'critical',
          message: 'Error rate exceeded threshold'
        }
      ];

      mockDb.select.mockReturnValue(mockAlertData);

      const result = await analyticsService.getActiveAlerts('org-123');

      expect(result).toHaveLength(1);
      expect(result[0].severity).toBe('critical');
      expect(result[0].metric).toBe('errorRate');
    });
  });

  describe('Data Aggregation', () => {
    it('should aggregate metrics by time periods', async () => {
      const mockAggregatedData = [
        { period: '2024-W01', totalUsers: 100, totalRevenue: 10000 },
        { period: '2024-W02', totalUsers: 120, totalRevenue: 12000 },
        { period: '2024-W03', totalUsers: 110, totalRevenue: 11000 }
      ];

      mockDb.select.mockReturnValue(mockAggregatedData);

      const result = await analyticsService.getAggregatedMetrics('org-123', {
        metric: 'revenue',
        period: 'weekly',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-21')
      });

      expect(result).toHaveLength(3);
      expect(result[0].period).toBe('2024-W01');
      expect(result[0].totalRevenue).toBe(10000);
    });

    it('should calculate moving averages', async () => {
      const mockTimeSeriesData = [
        { date: '2024-01-01', value: 100 },
        { date: '2024-01-02', value: 120 },
        { date: '2024-01-03', value: 110 },
        { date: '2024-01-04', value: 130 },
        { date: '2024-01-05', value: 125 }
      ];

      mockDb.select.mockReturnValue(mockTimeSeriesData);

      const result = await analyticsService.getMovingAverage('org-123', {
        metric: 'dailyRevenue',
        windowSize: 3
      });

      expect(result).toHaveLength(5);
      // Check moving average calculation
      expect(result[2].movingAverage).toBeCloseTo((100 + 120 + 110) / 3);
      expect(result[4].movingAverage).toBeCloseTo((110 + 130 + 125) / 3);
    });
  });

  describe('Error Handling', () => {
    it('should handle database connection errors', async () => {
      mockDb.select.mockImplementation(() => {
        throw new Error('Database connection failed');
      });

      await expect(analyticsService.getUsageAnalytics('org-123'))
        .rejects.toThrow('Database connection failed');
    });

    it('should handle invalid date ranges', async () => {
      const invalidParams = {
        startDate: new Date('2024-01-31'),
        endDate: new Date('2024-01-01'), // End before start
        granularity: 'daily'
      };

      await expect(analyticsService.getUsageAnalytics('org-123', invalidParams))
        .rejects.toThrow();
    });

    it('should handle missing organization data', async () => {
      mockDb.select.mockReturnValue([]);

      const result = await analyticsService.getUsageAnalytics('nonexistent-org');

      expect(result).toHaveLength(0);
    });
  });

  describe('Performance', () => {
    it('should handle large datasets efficiently', async () => {
      const largeDataset = Array(10000).fill(null).map((_, index) => ({
        date: `2024-01-${String(index + 1).padStart(2, '0')}`,
        activeUsers: Math.floor(Math.random() * 1000),
        totalRequests: Math.floor(Math.random() * 10000)
      }));

      mockDb.select.mockReturnValue(largeDataset);

      const startTime = Date.now();
      const result = await analyticsService.getUsageAnalytics('org-123', {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31'),
        granularity: 'daily'
      });
      const endTime = Date.now();

      expect(result).toHaveLength(10000);
      expect(endTime - startTime).toBeLessThan(2000); // Should complete within 2 seconds
    });

    it('should cache frequently accessed metrics', async () => {
      const mockMetrics = { activeUsers: 100, totalRequests: 1000 };

      mockDb.select.mockReturnValue([mockMetrics]);

      // First call - should hit database
      const result1 = await analyticsService.getRealTimeMetrics('org-123');
      // Second call - should hit cache
      const result2 = await analyticsService.getRealTimeMetrics('org-123');

      expect(result1).toEqual(result2);
      expect(mockDb.select).toHaveBeenCalledTimes(1); // Only called once due to caching
    });
  });

  describe('Resource Management', () => {
    it('should cleanup resources properly', async () => {
      const analyticsService = new ConsolidatedAnalyticsService();
      
      // Generate some analytics data
      await analyticsService.getUsageAnalytics('org-123');

      // Cleanup should not throw errors
      await expect(analyticsService.cleanup()).resolves.not.toThrow();
    });

    it('should handle concurrent analytics operations', async () => {
      const promises = Array(5).fill(null).map(() =>
        analyticsService.getUsageAnalytics('org-123')
      );

      mockDb.select.mockReturnValue([]);

      const results = await Promise.all(promises);

      expect(results).toHaveLength(5);
      results.forEach(result => {
        expect(Array.isArray(result)).toBe(true);
      });
    });
  });
});
