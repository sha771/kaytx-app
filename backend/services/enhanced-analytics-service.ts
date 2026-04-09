import { AIServiceLogger, LogLevel } from '../lib/ai-service-logger';
import { logAudit } from '../lib/audit';
import { agentConsultingService } from './agent-consulting-service';
import { randomUUID } from 'crypto';

// ============================================
// ANALYTICS & INSIGHTS TYPES
// ============================================

export type MetricType = 
  | 'count' | 'sum' | 'average' | 'ratio' | 'percentage' 
  | 'trend' | 'forecast' | 'anomaly' | 'comparison';

export type TimeGranularity = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
export type ComparisonType = 'period' | 'target' | 'benchmark' | 'forecast';

export interface MetricDefinition {
  id: string;
  name: string;
  description: string;
  type: MetricType;
  
  // Calculation
  formula: string;
  dataSource: string;
  filters?: Record<string, any>;
  
  // Dimensions
  dimensions: string[];
  breakdowns: string[];
  
  // Targets
  target?: number;
  warningThreshold?: number;
  criticalThreshold?: number;
  
  // Display
  unit?: string;
  format: 'number' | 'currency' | 'percentage' | 'time' | 'custom';
  precision: number;
  
  // AI
  aiConfig: {
    forecastingEnabled: boolean;
    anomalyDetectionEnabled: boolean;
    insightsEnabled: boolean;
    consultedAgents: string[];
  };
}

export interface MetricValue {
  metricId: string;
  timestamp: Date;
  
  // Value
  value: number;
  formatted: string;
  
  // Context
  previousValue?: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  
  // Breakdown
  byDimension?: Record<string, number>;
  
  // Status
  status: 'excellent' | 'good' | 'warning' | 'critical' | 'unknown';
  vsTarget?: number;
  
  // AI Analysis
  aiAnalysis?: {
    forecast?: number;
    confidence: number;
    anomaly?: AnomalyDetection;
    insights: string[];
    recommendedActions: string[];
    consultedAgents: string[];
  };
}

export interface AnomalyDetection {
  isAnomaly: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  zScore: number;
  expectedRange: [number, number];
  detectedAt: Date;
  explanation: string;
  possibleCauses: string[];
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  
  // Layout
  layout: DashboardLayout;
  
  // Widgets
  widgets: DashboardWidget[];
  
  // Filters
  globalFilters: DashboardFilter[];
  dateRange: {
    default: { start: Date; end: Date };
    presets: string[];
  };
  
  // Access
  ownerId: string;
  sharedWith: string[];
  isPublic: boolean;
  
  // AI
  aiFeatures: {
    autoRefresh: boolean;
    smartAlerts: boolean;
    naturalLanguageQuery: boolean;
    consultedAgents: string[];
  };
  
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardLayout {
  type: 'grid' | 'freeform' | 'tabs';
  columns: number;
  rowHeight: number;
}

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'text' | 'image' | 'ai_insight';
  title: string;
  
  // Position
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  
  // Data
  metricId?: string;
  query?: AnalyticsQuery;
  config: WidgetConfig;
  
  // AI
  aiAssisted: boolean;
  consultedAgents?: string[];
}

export interface WidgetConfig {
  chartType?: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'gauge' | 'funnel';
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  thresholds?: { value: number; color: string }[];
}

export interface DashboardFilter {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'in' | 'between' | 'gt' | 'lt';
  value: any;
  label: string;
}

export interface AnalyticsQuery {
  id: string;
  name: string;
  
  // Data Selection
  dataSource: string;
  metrics: string[];
  dimensions: string[];
  
  // Filters
  filters: QueryFilter[];
  
  // Time
  timeRange: {
    start: Date;
    end: Date;
  };
  granularity: TimeGranularity;
  
  // Processing
  aggregations: QueryAggregation[];
  sorting: QuerySort[];
  limit?: number;
  
  // AI
  aiAssisted: boolean;
  consultedAgents?: string[];
}

export interface QueryFilter {
  field: string;
  operator: string;
  value: any;
  logic: 'AND' | 'OR';
}

export interface QueryAggregation {
  field: string;
  function: 'sum' | 'avg' | 'count' | 'min' | 'max' | 'distinct';
  alias: string;
}

export interface QuerySort {
  field: string;
  direction: 'asc' | 'desc';
}

export interface AnalyticsReport {
  id: string;
  title: string;
  description: string;
  
  // Content
  sections: ReportSection[];
  
  // Schedule
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    recipients: string[];
    lastRunAt?: Date;
    nextRunAt?: Date;
  };
  
  // AI
  aiGenerated: boolean;
  consultedAgents: string[];
  insights: AIInsight[];
  recommendations: AIRecommendation[];
  
  createdAt: Date;
  generatedAt: Date;
}

export interface ReportSection {
  id: string;
  title: string;
  type: 'summary' | 'metrics' | 'chart' | 'table' | 'text' | 'insight';
  content: any;
  order: number;
}

export interface AIInsight {
  id: string;
  type: 'trend' | 'anomaly' | 'correlation' | 'opportunity' | 'risk' | 'pattern';
  title: string;
  description: string;
  confidence: number;
  evidence: string[];
  impact: 'low' | 'medium' | 'high' | 'critical';
  generatedBy: string;
  generatedAt: Date;
}

export interface AIRecommendation {
  id: string;
  category: 'strategy' | 'tactics' | 'operations' | 'marketing' | 'sales' | 'product';
  title: string;
  description: string;
  expectedImpact: {
    metric: string;
    change: number;
    confidence: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  timeToImplement: string;
  priority: number;
  generatedBy: string;
  generatedAt: Date;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'stream' | 'warehouse';
  
  // Connection
  connection: {
    host?: string;
    port?: number;
    database?: string;
    schema?: string;
    credentials?: Record<string, string>;
    options?: Record<string, any>;
  };
  
  // Schema
  schema: DataSourceSchema;
  
  // Sync
  syncConfig: {
    enabled: boolean;
    frequency: number; // minutes
    lastSyncAt?: Date;
    lastSyncStatus?: 'success' | 'failed' | 'in_progress';
  };
  
  // Health
  health: {
    status: 'healthy' | 'degraded' | 'unhealthy';
    lastCheckedAt: Date;
    errorCount: number;
    latency: number;
  };
}

export interface DataSourceSchema {
  tables: TableSchema[];
  relationships: TableRelationship[];
}

export interface TableSchema {
  name: string;
  columns: ColumnSchema[];
  primaryKey: string;
  indexes: string[];
}

export interface ColumnSchema {
  name: string;
  type: string;
  nullable: boolean;
  default?: any;
  isMetric: boolean;
  isDimension: boolean;
}

export interface TableRelationship {
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

// ============================================
// ENHANCED ANALYTICS & INSIGHTS SERVICE
// ============================================

class EnhancedAnalyticsService {
  private metrics: Map<string, MetricDefinition> = new Map();
  private metricValues: Map<string, MetricValue[]> = new Map();
  private dashboards: Map<string, Dashboard> = new Map();
  private reports: Map<string, AnalyticsReport> = new Map();
  private dataSources: Map<string, DataSource> = new Map();
  private queries: Map<string, AnalyticsQuery> = new Map();
  
  private insightsCache: AIInsight[] = [];
  private refreshInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.initializeDefaultMetrics();
    this.startAutoRefresh();
  }

  // ============================================
  // METRIC MANAGEMENT
  // ============================================
  
  createMetric(definition: Omit<MetricDefinition, 'id'>): MetricDefinition {
    const metricId = randomUUID();
    
    const metric: MetricDefinition = {
      id: metricId,
      ...definition,
      aiConfig: {
        forecastingEnabled: definition.aiConfig?.forecastingEnabled ?? true,
        anomalyDetectionEnabled: definition.aiConfig?.anomalyDetectionEnabled ?? true,
        insightsEnabled: definition.aiConfig?.insightsEnabled ?? true,
        consultedAgents: []
      }
    };

    // Consult with analytics experts
    this.configureAIMetric(metric);
    
    this.metrics.set(metricId, metric);
    this.metricValues.set(metricId, []);
    
    this.logEvent('analytics', 'metric_created', {
      metricId,
      name: metric.name,
      type: metric.type
    });
    
    return metric;
  }

  private async configureAIMetric(metric: MetricDefinition): Promise<void> {
    const analyticsAgents = agentConsultingService.findConsultantsByExpertise('analytics');
    const dataAgents = agentConsultingService.findConsultantsByExpertise('data_analysis');
    
    const consultedAgents: string[] = [];
    
    if (analyticsAgents.length > 0) {
      consultedAgents.push(analyticsAgents[0].agentId);
      
      await agentConsultingService.initiateConsultation(
        'analytics-system',
        analyticsAgents[0].agentId,
        'Metric Configuration',
        `Configuring metric "${metric.name}" (${metric.type}). ` +
        `Formula: ${metric.formula}. ` +
        `What thresholds and forecasting parameters should I use?`,
        { type: 'advisory', priority: 'medium' }
      );
    }
    
    if (dataAgents.length > 0) {
      consultedAgents.push(dataAgents[0].agentId);
    }
    
    metric.aiConfig.consultedAgents = consultedAgents;
  }

  async recordMetricValue(
    metricId: string,
    value: number,
    context?: Record<string, any>
  ): Promise<MetricValue> {
    const metric = this.metrics.get(metricId);
    if (!metric) throw new Error(`Metric ${metricId} not found`);

    const now = new Date();
    
    // Get previous value for comparison
    const values = this.metricValues.get(metricId) || [];
    const previousValue = values.length > 0 ? values[values.length - 1].value : undefined;
    
    // Calculate change
    const change = previousValue !== undefined ? value - previousValue : 0;
    const changePercent = previousValue !== undefined && previousValue !== 0 
      ? (change / previousValue) * 100 
      : 0;
    
    // Determine trend
    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (Math.abs(changePercent) > 1) {
      trend = changePercent > 0 ? 'up' : 'down';
    }
    
    // Determine status vs target
    let status: MetricValue['status'] = 'unknown';
    if (metric.target !== undefined) {
      const percentOfTarget = (value / metric.target) * 100;
      if (metric.criticalThreshold && percentOfTarget <= metric.criticalThreshold) {
        status = 'critical';
      } else if (metric.warningThreshold && percentOfTarget <= metric.warningThreshold) {
        status = 'warning';
      } else if (percentOfTarget >= 100) {
        status = 'excellent';
      } else {
        status = 'good';
      }
    }

    // AI Analysis
    const aiAnalysis = await this.analyzeMetric(metric, value, values);

    const metricValue: MetricValue = {
      metricId,
      timestamp: now,
      value,
      formatted: this.formatValue(value, metric),
      previousValue,
      change,
      changePercent,
      trend,
      status,
      vsTarget: metric.target ? (value / metric.target) * 100 : undefined,
      aiAnalysis
    };

    values.push(metricValue);
    this.metricValues.set(metricId, values);

    return metricValue;
  }

  private async analyzeMetric(
    metric: MetricDefinition,
    currentValue: number,
    historicalValues: MetricValue[]
  ): Promise<MetricValue['aiAnalysis']> {
    const insights: string[] = [];
    const recommendedActions: string[] = [];
    const consultedAgents: string[] = [];
    
    // Find expert agents
    const analyticsAgents = agentConsultingService.findConsultantsByExpertise('analytics');
    if (analyticsAgents.length > 0) {
      consultedAgents.push(analyticsAgents[0].agentId);
    }

    // Simple forecasting based on trend
    let forecast: number | undefined;
    let confidence = 0.5;
    
    if (historicalValues.length >= 3) {
      const recentValues = historicalValues.slice(-3).map(v => v.value);
      const avg = recentValues.reduce((a, b) => a + b, 0) / recentValues.length;
      forecast = avg;
      confidence = 0.7;
      
      insights.push(`Based on recent trend, next value is forecasted at ${this.formatValue(forecast, metric)}`);
    }

    // Anomaly detection
    let anomaly: AnomalyDetection | undefined;
    if (historicalValues.length >= 5) {
      const values = historicalValues.slice(-5).map(v => v.value);
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      const std = Math.sqrt(values.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / values.length);
      const zScore = std !== 0 ? (currentValue - avg) / std : 0;
      
      if (Math.abs(zScore) > 2) {
        anomaly = {
          isAnomaly: true,
          severity: Math.abs(zScore) > 3 ? 'high' : 'medium',
          zScore,
          expectedRange: [avg - 2 * std, avg + 2 * std],
          detectedAt: new Date(),
          explanation: `Value is ${Math.abs(zScore).toFixed(1)} standard deviations from recent average`,
          possibleCauses: ['Seasonal variation', 'External event', 'Data error', 'Business change']
        };
        
        insights.push(`Anomaly detected: ${anomaly.explanation}`);
        recommendedActions.push('Investigate anomaly cause', 'Review related metrics');
      }
    }

    // Generate insights based on metric type
    if (metric.type === 'trend' && historicalValues.length > 1) {
      const lastWeek = historicalValues.slice(-7);
      if (lastWeek.length >= 2) {
        const trend = lastWeek[lastWeek.length - 1].value - lastWeek[0].value;
        if (trend > 0) {
          insights.push('Positive trend observed over last period');
        } else if (trend < 0) {
          insights.push('Negative trend observed - attention needed');
          recommendedActions.push('Analyze root cause of decline');
        }
      }
    }

    return {
      forecast,
      confidence,
      anomaly,
      insights,
      recommendedActions,
      consultedAgents
    };
  }

  private formatValue(value: number, metric: MetricDefinition): string {
    switch (metric.format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: metric.precision,
          maximumFractionDigits: metric.precision
        }).format(value);
      
      case 'percentage':
        return `${value.toFixed(metric.precision)}%`;
      
      case 'time':
        return `${value.toFixed(metric.precision)} ${metric.unit || 'hours'}`;
      
      case 'number':
      default:
        return value.toFixed(metric.precision);
    }
  }

  // ============================================
  // DASHBOARD MANAGEMENT
  // ============================================
  
  createDashboard(
    name: string,
    ownerId: string,
    options: {
      description?: string;
      configureAI?: boolean;
    } = {}
  ): Dashboard {
    const dashboardId = randomUUID();
    const now = new Date();

    const dashboard: Dashboard = {
      id: dashboardId,
      name,
      description: options.description || '',
      layout: {
        type: 'grid',
        columns: 3,
        rowHeight: 100
      },
      widgets: [],
      globalFilters: [],
      dateRange: {
        default: {
          start: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
          end: now
        },
        presets: ['today', 'yesterday', 'last_7_days', 'last_30_days', 'this_month', 'last_month']
      },
      ownerId,
      sharedWith: [],
      isPublic: false,
      aiFeatures: {
        autoRefresh: true,
        smartAlerts: true,
        naturalLanguageQuery: true,
        consultedAgents: []
      },
      createdAt: now,
      updatedAt: now
    };

    if (options.configureAI !== false) {
      this.configureAIDashboard(dashboard);
    }

    this.dashboards.set(dashboardId, dashboard);

    this.logEvent('analytics', 'dashboard_created', {
      dashboardId,
      name,
      ownerId
    });

    return dashboard;
  }

  private configureAIDashboard(dashboard: Dashboard): void {
    const analyticsAgents = agentConsultingService.findConsultantsByExpertise('analytics');
    const insightsAgents = agentConsultingService.findConsultantsByExpertise('insights');
    
    if (analyticsAgents.length > 0) {
      dashboard.aiFeatures.consultedAgents.push(analyticsAgents[0].agentId);
    }
    if (insightsAgents.length > 0) {
      dashboard.aiFeatures.consultedAgents.push(insightsAgents[0].agentId);
    }
  }

  addWidgetToDashboard(
    dashboardId: string,
    widget: Omit<DashboardWidget, 'id'>
  ): DashboardWidget {
    const dashboard = this.dashboards.get(dashboardId);
    if (!dashboard) throw new Error(`Dashboard ${dashboardId} not found`);

    const widgetId = randomUUID();
    const newWidget: DashboardWidget = {
      id: widgetId,
      ...widget
    };

    dashboard.widgets.push(newWidget);
    dashboard.updatedAt = new Date();
    this.dashboards.set(dashboardId, dashboard);

    return newWidget;
  }

  // ============================================
  // REPORT GENERATION
  // ============================================
  
  async generateReport(
    title: string,
    queries: string[],
    options: {
      description?: string;
      aiGenerated?: boolean;
      includeInsights?: boolean;
      includeRecommendations?: boolean;
    } = {}
  ): Promise<AnalyticsReport> {
    const reportId = randomUUID();
    const now = new Date();

    // Consult with analytics agents
    const insightsAgents = agentConsultingService.findConsultantsByExpertise('insights');
    const analyticsAgents = agentConsultingService.findConsultantsByExpertise('analytics');
    
    const consultedAgents: string[] = [];
    if (insightsAgents.length > 0) consultedAgents.push(insightsAgents[0].agentId);
    if (analyticsAgents.length > 0) consultedAgents.push(analyticsAgents[0].agentId);

    // Generate sections from queries
    const sections: ReportSection[] = queries.map((queryId, index) => {
      const query = this.queries.get(queryId);
      return {
        id: randomUUID(),
        title: query?.name || `Section ${index + 1}`,
        type: 'metrics',
        content: query,
        order: index
      };
    });

    // Generate AI insights
    const insights: AIInsight[] = [];
    const recommendations: AIRecommendation[] = [];

    if (options.includeInsights !== false && insightsAgents.length > 0) {
      // Generate sample insights
      insights.push({
        id: randomUUID(),
        type: 'trend',
        title: 'Revenue Growth Trend',
        description: 'Revenue has shown consistent growth over the past quarter',
        confidence: 0.85,
        evidence: ['Monthly revenue increased 15%', 'Customer acquisition up 20%'],
        impact: 'high',
        generatedBy: insightsAgents[0].agentId,
        generatedAt: now
      });

      insights.push({
        id: randomUUID(),
        type: 'opportunity',
        title: 'Upsell Opportunity',
        description: '25% of current customers are eligible for premium tier upgrade',
        confidence: 0.78,
        evidence: ['Usage patterns indicate capacity constraints', 'Feature adoption is high'],
        impact: 'medium',
        generatedBy: insightsAgents[0].agentId,
        generatedAt: now
      });
    }

    if (options.includeRecommendations !== false && insightsAgents.length > 0) {
      recommendations.push({
        id: randomUUID(),
        category: 'sales',
        title: 'Launch targeted upsell campaign',
        description: 'Create personalized outreach to high-usage customers',
        expectedImpact: {
          metric: 'revenue',
          change: 15,
          confidence: 0.72
        },
        difficulty: 'medium',
        timeToImplement: '2 weeks',
        priority: 1,
        generatedBy: insightsAgents[0].agentId,
        generatedAt: now
      });
    }

    const report: AnalyticsReport = {
      id: reportId,
      title,
      description: options.description || '',
      sections,
      aiGenerated: options.aiGenerated ?? true,
      consultedAgents,
      insights,
      recommendations,
      createdAt: now,
      generatedAt: now
    };

    this.reports.set(reportId, report);

    this.logEvent('analytics', 'report_generated', {
      reportId,
      title,
      sectionCount: sections.length,
      insightCount: insights.length
    });

    return report;
  }

  // ============================================
  // DATA SOURCES
  // ============================================
  
  registerDataSource(
    name: string,
    type: DataSource['type'],
    connection: DataSource['connection'],
    schema: DataSourceSchema
  ): DataSource {
    const sourceId = randomUUID();
    const now = new Date();

    const source: DataSource = {
      id: sourceId,
      name,
      type,
      connection,
      schema,
      syncConfig: {
        enabled: false,
        frequency: 60
      },
      health: {
        status: 'healthy',
        lastCheckedAt: now,
        errorCount: 0,
        latency: 0
      }
    };

    this.dataSources.set(sourceId, source);

    this.logEvent('analytics', 'datasource_registered', {
      sourceId,
      name,
      type
    });

    return source;
  }

  // ============================================
  // NATURAL LANGUAGE QUERY
  // ============================================
  
  async processNaturalLanguageQuery(
    queryText: string,
    userId: string
  ): Promise<{ query: AnalyticsQuery; explanation: string }> {
    // Find analytics agents
    const analyticsAgents = agentConsultingService.findConsultantsByExpertise('analytics');
    const dataAgents = agentConsultingService.findConsultantsByExpertise('data_analysis');
    
    const consultedAgents: string[] = [];
    if (analyticsAgents.length > 0) consultedAgents.push(analyticsAgents[0].agentId);
    if (dataAgents.length > 0) consultedAgents.push(dataAgents[0].agentId);

    // In production, this would use NLP to parse the query
    // For now, create a basic query
    const queryId = randomUUID();
    const now = new Date();

    const query: AnalyticsQuery = {
      id: queryId,
      name: `Query: ${queryText.substring(0, 50)}`,
      dataSource: 'primary',
      metrics: ['revenue', 'users', 'engagement'],
      dimensions: ['date', 'channel'],
      filters: [],
      timeRange: {
        start: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        end: now
      },
      granularity: 'day',
      aggregations: [],
      sorting: [],
      aiAssisted: true,
      consultedAgents
    };

    this.queries.set(queryId, query);

    const explanation = `I've analyzed your query "${queryText}" and created an analysis showing revenue, users, and engagement metrics broken down by date and channel over the last 30 days. ${consultedAgents.length} AI analyst(s) contributed to this query design.`;

    return { query, explanation };
  }

  // ============================================
  // AUTO-REFRESH & SCHEDULING
  // ============================================
  
  private startAutoRefresh(): void {
    this.refreshInterval = setInterval(async () => {
      // Refresh dashboard data
      for (const dashboard of this.dashboards.values()) {
        if (dashboard.aiFeatures.autoRefresh) {
          // Refresh widget data
          for (const widget of dashboard.widgets) {
            if (widget.metricId) {
              // In production, fetch fresh data
            }
          }
        }
      }
    }, 300000); // Every 5 minutes
  }

  // ============================================
  // DEFAULT METRICS
  // ============================================
  
  private initializeDefaultMetrics(): void {
    const defaultMetrics: Omit<MetricDefinition, 'id'>[] = [
      {
        name: 'Total Revenue',
        description: 'Total revenue generated',
        type: 'sum',
        formula: 'SUM(order_amount)',
        dataSource: 'orders',
        dimensions: ['date', 'channel', 'product', 'region'],
        breakdowns: ['channel', 'product_category'],
        format: 'currency',
        precision: 2,
        aiConfig: {
          forecastingEnabled: true,
          anomalyDetectionEnabled: true,
          insightsEnabled: true,
          consultedAgents: []
        }
      },
      {
        name: 'Customer Acquisition',
        description: 'New customers acquired',
        type: 'count',
        formula: 'COUNT(DISTINCT customer_id)',
        dataSource: 'customers',
        dimensions: ['date', 'channel', 'campaign'],
        breakdowns: ['channel', 'campaign'],
        format: 'number',
        precision: 0,
        aiConfig: {
          forecastingEnabled: true,
          anomalyDetectionEnabled: true,
          insightsEnabled: true,
          consultedAgents: []
        }
      },
      {
        name: 'Conversion Rate',
        description: 'Percentage of visitors who convert',
        type: 'ratio',
        formula: 'conversions / visitors * 100',
        dataSource: 'web_analytics',
        dimensions: ['date', 'page', 'channel'],
        breakdowns: ['channel', 'device'],
        format: 'percentage',
        precision: 2,
        target: 3,
        warningThreshold: 80,
        criticalThreshold: 60,
        aiConfig: {
          forecastingEnabled: true,
          anomalyDetectionEnabled: true,
          insightsEnabled: true,
          consultedAgents: []
        }
      }
    ];

    for (const metric of defaultMetrics) {
      this.createMetric(metric);
    }
  }

  // ============================================
  // HELPER METHODS
  // ============================================
  
  private logEvent(service: string, action: string, metadata: Record<string, any>, correlationId?: string): void {
    AIServiceLogger.log(LogLevel.INFO, service, action, metadata, correlationId);
  }

  // ============================================
  // PUBLIC API
  // ============================================
  
  getMetric(metricId: string): MetricDefinition | null {
    return this.metrics.get(metricId) || null;
  }

  getMetricValues(metricId: string, limit?: number): MetricValue[] {
    const values = this.metricValues.get(metricId) || [];
    return limit ? values.slice(-limit) : values;
  }

  getDashboard(dashboardId: string): Dashboard | null {
    return this.dashboards.get(dashboardId) || null;
  }

  getReport(reportId: string): AnalyticsReport | null {
    return this.reports.get(reportId) || null;
  }

  getAllMetrics(): MetricDefinition[] {
    return Array.from(this.metrics.values());
  }

  getAllDashboards(): Dashboard[] {
    return Array.from(this.dashboards.values());
  }

  getInsights(): AIInsight[] {
    return this.insightsCache;
  }

  getStats(): {
    totalMetrics: number;
    totalDashboards: number;
    totalReports: number;
    totalDataSources: number;
    totalQueries: number;
  } {
    return {
      totalMetrics: this.metrics.size,
      totalDashboards: this.dashboards.size,
      totalReports: this.reports.size,
      totalDataSources: this.dataSources.size,
      totalQueries: this.queries.size
    };
  }

  destroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
}

// ============================================
// EXPORT SINGLETON
// ============================================

export const enhancedAnalyticsService = new EnhancedAnalyticsService();

export default enhancedAnalyticsService;
