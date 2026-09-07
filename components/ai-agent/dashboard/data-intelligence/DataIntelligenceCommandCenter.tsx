import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  withDelay,
  Easing 
} from 'react-native-reanimated';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  CheckCircle,
  ChevronRight,
  Clock,
  Cpu,
  Crown,
  Database,
  DollarSign,
  Eye,
  HardDrive,
  Info,
  LineChart,
  Network,
  RefreshCw,
  Server,
  Settings,
  Shield,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react-native';

// Types
interface IntelligenceAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  confidenceScore: number;
  metrics: {
    accuracy?: number;
    modelsManaged?: number;
    insightsGenerated?: number;
    dashboardsManaged?: number;
    queriesProcessed?: number;
    eventsMonitored?: number;
    anomaliesDetected?: number;
  };
  workload: string;
  businessImpact: string;
  performanceTrend: 'up' | 'down' | 'stable';
  processingPower?: number;
  memoryUsage?: number;
  activeTasks?: number;
  efficiency?: number;
}

interface DataFlowNode {
  id: string;
  name: string;
  type: 'source' | 'transform' | 'destination' | 'storage';
  x: number;
  y: number;
  throughput: number;
  status: 'active' | 'idle' | 'error';
}

interface DataFlowConnection {
  from: string;
  to: string;
  flowRate: number;
  latency: number;
}

interface IntelligenceGraph {
  nodes: DataFlowNode[];
  connections: DataFlowConnection[];
}

interface IntelligenceKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
}

interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'warehouse' | 'api' | 'saas' | 'external' | 'iot';
  health: 'healthy' | 'degraded' | 'critical';
  dataVolume: string;
  freshness: string;
  reliability: number;
  lastSync: string;
}

interface BusinessMetric {
  id: string;
  category: string;
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  period: string;
}

interface Forecast {
  id: string;
  name: string;
  type: 'revenue' | 'demand' | 'churn' | 'growth' | 'risk';
  currentValue: number;
  predictedValue: number;
  confidence: number;
  period: string;
  scenarios: {
    best: number;
    expected: number;
    worst: number;
  };
}

interface Anomaly {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detectedAt: string;
  status: 'active' | 'investigating' | 'resolved';
  impact: string;
}

interface KPI {
  id: string;
  name: string;
  category: 'executive' | 'department' | 'team' | 'operational' | 'strategic';
  value: number;
  target: number;
  progress: number;
  trend: 'up' | 'down' | 'stable';
  owner: string;
}

interface DataQualityMetric {
  id: string;
  dimension: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  issues: number;
  lastAssessment: string;
}

interface StrategicRecommendation {
  id: string;
  type: 'opportunity' | 'risk' | 'growth' | 'optimization';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  actionItems: string[];
  priority: number;
}

interface MarketSignal {
  id: string;
  source: string;
  type: 'trend' | 'competitor' | 'market' | 'economic' | 'sentiment';
  title: string;
  description: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: string;
}

interface AIInsight {
  id: string;
  type: 'warning' | 'opportunity' | 'info' | 'success' | 'risk' | 'recommendation' | 'alert';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  confidence?: number;
  category: string;
}

interface IntelligenceActivity {
  id: string;
  type: 'insight' | 'forecast' | 'anomaly' | 'kpi' | 'opportunity' | 'source' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  impact: 'high' | 'medium' | 'low';
}

interface PlatformComponent {
  id: string;
  name: string;
  type: 'warehouse' | 'lake' | 'etl' | 'streaming' | 'bi' | 'ml' | 'agent';
  status: 'healthy' | 'degraded' | 'critical';
  uptime: number;
  latency: number;
  throughput: string;
  lastCheck: string;
}

// Animated Components
const AnimatedPulse = ({ children, color = '#3B82F6' }: { children: React.ReactNode; color?: string }) => {
  const scale = useSharedValue(1);
  
  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: 0.8 + (scale.value - 1) * 0.5,
  }));

  return (
    <Animated.View style={[animatedStyle, { shadowColor: color, shadowRadius: 10 * scale.value }]}>
      {children}
    </Animated.View>
  );
};

const AnimatedDataFlow = ({ active = true }: { active?: boolean }) => {
  const progress = useSharedValue(0);
  
  useEffect(() => {
    if (active) {
      progress.value = withRepeat(
        withTiming(1, { duration: 2000, easing: Easing.linear }),
        -1,
        false
      );
    }
  }, [active]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 100 }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#06B6D4' }} />
    </Animated.View>
  );
};

const GlowingCard = ({ children, glowColor = '#3B82F6', intensity = 0.3 }: { 
  children: React.ReactNode; 
  glowColor?: string; 
  intensity?: number;
}) => {
  const { theme } = useTheme();
  
  return (
    <View style={{
      backgroundColor: `rgba(${parseInt(glowColor.slice(1,3), 16)}, ${parseInt(glowColor.slice(3,5), 16)}, ${parseInt(glowColor.slice(5,7), 16)}, ${intensity})`,
      borderRadius: 16,
      padding: 2,
      shadowColor: glowColor,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
    }}>
      <View style={{
        backgroundColor: theme.colors.card,
        borderRadius: 14,
        overflow: 'hidden',
      }}>
        {children}
      </View>
    </View>
  );
};

const DataVisualizationBar = ({ 
  value, 
  max, 
  color = '#3B82F6', 
  label 
}: { 
  value: number; 
  max: number; 
  color?: string; 
  label?: string;
}) => {
  const percentage = (value / max) * 100;
  const animatedWidth = useSharedValue(0);
  
  useEffect(() => {
    animatedWidth.value = withTiming(percentage, { duration: 1000, easing: Easing.out(Easing.cubic) });
  }, [percentage]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value}%`,
  }));

  return (
    <View style={{ marginBottom: 12 }}>
      {label && (
        <Text style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 4 }}>{label}</Text>
      )}
      <View style={{ 
        height: 8, 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        borderRadius: 4, 
        overflow: 'hidden' 
      }}>
        <Animated.View style={[
          animatedStyle, 
          { 
            height: '100%', 
            backgroundColor: color,
            borderRadius: 4,
          }
        ]} />
      </View>
      <Text style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
        {value.toLocaleString()} / {max.toLocaleString()}
      </Text>
    </View>
  );
};

const RealTimeCounter = ({ value, label, color = '#10B981' }: { value: number; label: string; color?: string }) => {
  const animatedValue = useSharedValue(0);
  
  useEffect(() => {
    animatedValue.value = withTiming(value, { duration: 1500, easing: Easing.out(Easing.quart) });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: color,
  }));

  return (
    <View style={{ alignItems: 'center' }}>
      <Animated.Text style={animatedStyle}>
        {Math.round(animatedValue.value).toLocaleString()}
      </Animated.Text>
      <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{label}</Text>
    </View>
  );
};

export default function DataIntelligenceCommandCenter() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRealTime, setIsRealTime] = useState(true);

  useEffect(() => {
    if (isRealTime) {
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
    }
  }, [isRealTime]);

  // Enhanced Executive Intelligence KPIs
  const executiveKPIs: IntelligenceKPI[] = [
    {
      id: 'data-health-score',
      title: 'Data Health Score',
      value: '94.7',
      change: '+2.3%',
      trend: 'up',
      color: '#10B981',
      subtitle: 'Overall data quality'
    },
    {
      id: 'active-pipelines',
      title: 'Active Data Pipelines',
      value: '1,284',
      change: '+18%',
      trend: 'up',
      color: '#3B82F6',
      subtitle: 'Running pipelines'
    },
    {
      id: 'ai-insights',
      title: 'AI Insights Generated',
      value: '24,821',
      change: '+34.2%',
      trend: 'up',
      color: '#8B5CF6',
      subtitle: 'Today'
    },
    {
      id: 'prediction-accuracy',
      title: 'Prediction Accuracy',
      value: '96.2%',
      change: '+1.8%',
      trend: 'up',
      color: '#10B981',
      subtitle: 'ML models'
    },
    {
      id: 'bi-coverage',
      title: 'BI Coverage',
      value: '87.3%',
      change: '+5.2%',
      trend: 'up',
      color: '#22C55E',
      subtitle: 'Business intelligence'
    },
    {
      id: 'data-quality-index',
      title: 'Data Quality Index',
      value: '98.1',
      change: '+0.8%',
      trend: 'up',
      color: '#10B981',
      subtitle: 'Quality metrics'
    },
    {
      id: 'risk-alerts',
      title: 'Strategic Risk Alerts',
      value: '12',
      change: '-3',
      trend: 'down',
      color: '#F59E0B',
      subtitle: 'Active alerts'
    },
    {
      id: 'revenue-opportunities',
      title: 'Revenue Opportunities',
      value: '184',
      change: '+24',
      trend: 'up',
      color: '#22C55E',
      subtitle: 'Detected opportunities'
    },
    {
      id: 'events-processed',
      title: 'Real-Time Events',
      value: '128M',
      change: '+12.4%',
      trend: 'up',
      color: '#3B82F6',
      subtitle: 'Daily events'
    },
    {
      id: 'decision-score',
      title: 'Executive Decision Score',
      value: '92.4',
      change: '+3.2%',
      trend: 'up',
      color: '#10B981',
      subtitle: 'Decision support'
    },
  ];

  // Enhanced AI Intelligence Agents
  const intelligenceAgents: IntelligenceAgent[] = [
    {
      id: 'agent-oracle',
      name: 'Agent Oracle',
      role: 'Predictive Analytics Agent',
      avatar: '🔮',
      status: 'online',
      confidenceScore: 96,
      metrics: {
        accuracy: 96,
        modelsManaged: 284,
        insightsGenerated: 14281,
      },
      workload: 'High',
      businessImpact: 'Critical',
      performanceTrend: 'up',
      processingPower: 92,
      memoryUsage: 78,
      activeTasks: 24,
      efficiency: 94,
    },
    {
      id: 'agent-nexus',
      name: 'Agent Nexus',
      role: 'Business Intelligence Agent',
      avatar: '🧠',
      status: 'online',
      confidenceScore: 94,
      metrics: {
        dashboardsManaged: 182,
        queriesProcessed: 4800000,
        insightsGenerated: 2148,
      },
      workload: 'Medium',
      businessImpact: 'High',
      performanceTrend: 'up',
      processingPower: 88,
      memoryUsage: 65,
      activeTasks: 18,
      efficiency: 91,
    },
    {
      id: 'agent-sentinel',
      name: 'Agent Sentinel',
      role: 'Anomaly Detection Agent',
      avatar: '🛡️',
      status: 'online',
      confidenceScore: 98,
      metrics: {
        eventsMonitored: 82000000,
        anomaliesDetected: 1284,
        accuracy: 98,
      },
      workload: 'High',
      businessImpact: 'Critical',
      performanceTrend: 'stable',
      processingPower: 95,
      memoryUsage: 82,
      activeTasks: 31,
      efficiency: 96,
    },
    {
      id: 'agent-vanguard',
      name: 'Agent Vanguard',
      role: 'Data Quality Guardian',
      avatar: '✨',
      status: 'online',
      confidenceScore: 91,
      metrics: {
        accuracy: 91,
        insightsGenerated: 8934,
      },
      workload: 'Medium',
      businessImpact: 'High',
      performanceTrend: 'up',
      processingPower: 85,
      memoryUsage: 72,
      activeTasks: 15,
      efficiency: 89,
    },
    {
      id: 'agent-catalyst',
      name: 'Agent Catalyst',
      role: 'Forecasting Engine',
      avatar: '⚡',
      status: 'busy',
      confidenceScore: 93,
      metrics: {
        modelsManaged: 156,
        insightsGenerated: 5672,
        accuracy: 93,
      },
      workload: 'Very High',
      businessImpact: 'Critical',
      performanceTrend: 'up',
      processingPower: 97,
      memoryUsage: 89,
      activeTasks: 42,
      efficiency: 92,
    },
    {
      id: 'agent-horizon',
      name: 'Agent Horizon',
      role: 'Strategic Intelligence Agent',
      avatar: '🌅',
      status: 'online',
      confidenceScore: 89,
      metrics: {
        insightsGenerated: 3247,
        dashboardsManaged: 94,
      },
      workload: 'Low',
      businessImpact: 'High',
      performanceTrend: 'stable',
      processingPower: 82,
      memoryUsage: 58,
      activeTasks: 8,
      efficiency: 87,
    },
  ];

  // Data Flow Graph Visualization
  const dataFlowGraph: IntelligenceGraph = {
    nodes: [
      { id: 'source1', name: 'CRM Database', type: 'source', x: 50, y: 100, throughput: 1250, status: 'active' },
      { id: 'source2', name: 'Sales API', type: 'source', x: 50, y: 200, throughput: 890, status: 'active' },
      { id: 'source3', name: 'IoT Sensors', type: 'source', x: 50, y: 300, throughput: 3400, status: 'active' },
      { id: 'transform1', name: 'ETL Pipeline', type: 'transform', x: 200, y: 150, throughput: 2500, status: 'active' },
      { id: 'transform2', name: 'Data Cleaner', type: 'transform', x: 200, y: 250, throughput: 1800, status: 'active' },
      { id: 'storage1', name: 'Data Warehouse', type: 'storage', x: 350, y: 100, throughput: 3200, status: 'active' },
      { id: 'storage2', name: 'Data Lake', type: 'storage', x: 350, y: 200, throughput: 2800, status: 'active' },
      { id: 'dest1', name: 'BI Platform', type: 'destination', x: 500, y: 150, throughput: 1500, status: 'active' },
      { id: 'dest2', name: 'ML Engine', type: 'destination', x: 500, y: 250, throughput: 950, status: 'active' },
    ],
    connections: [
      { from: 'source1', to: 'transform1', flowRate: 1250, latency: 12 },
      { from: 'source2', to: 'transform1', flowRate: 890, latency: 8 },
      { from: 'source3', to: 'transform2', flowRate: 3400, latency: 15 },
      { from: 'transform1', to: 'storage1', flowRate: 2500, latency: 25 },
      { from: 'transform1', to: 'storage2', flowRate: 2500, latency: 28 },
      { from: 'transform2', to: 'storage2', flowRate: 1800, latency: 22 },
      { from: 'storage1', to: 'dest1', flowRate: 1500, latency: 18 },
      { from: 'storage2', to: 'dest1', flowRate: 1200, latency: 20 },
      { from: 'storage2', to: 'dest2', flowRate: 950, latency: 15 },
    ],
  };

  // Enterprise Data Ecosystem
  const dataSources: DataSource[] = [
    {
      id: 'source-1',
      name: 'Snowflake Data Warehouse',
      type: 'warehouse',
      health: 'healthy',
      dataVolume: '8.2 PB',
      freshness: '2 min',
      reliability: 99.9,
      lastSync: '2 min ago',
    },
    {
      id: 'source-2',
      name: 'Databricks Lakehouse',
      type: 'warehouse',
      health: 'healthy',
      dataVolume: '4.1 PB',
      freshness: '5 min',
      reliability: 99.8,
      lastSync: '5 min ago',
    },
    {
      id: 'source-3',
      name: 'PostgreSQL Cluster',
      type: 'database',
      health: 'healthy',
      dataVolume: '2.4 TB',
      freshness: '1 min',
      reliability: 99.9,
      lastSync: '1 min ago',
    },
    {
      id: 'source-4',
      name: 'Salesforce API',
      type: 'api',
      health: 'healthy',
      dataVolume: '840 GB',
      freshness: '15 min',
      reliability: 99.5,
      lastSync: '15 min ago',
    },
    {
      id: 'source-5',
      name: 'Market Data Feed',
      type: 'external',
      health: 'degraded',
      dataVolume: '120 GB/day',
      freshness: '30 min',
      reliability: 97.2,
      lastSync: '30 min ago',
    },
  ];

  // Business Intelligence Metrics
  const businessMetrics: BusinessMetric[] = [
    {
      id: 'metric-1',
      category: 'Revenue',
      name: 'Total Revenue',
      value: 124000000,
      target: 120000000,
      trend: 'up',
      period: 'Q4 2025',
    },
    {
      id: 'metric-2',
      category: 'Customer',
      name: 'Customer Acquisition Cost',
      value: 450,
      target: 500,
      trend: 'down',
      period: 'This month',
    },
    {
      id: 'metric-3',
      category: 'Product',
      name: 'Product Adoption Rate',
      value: 78,
      target: 75,
      trend: 'up',
      period: 'This quarter',
    },
    {
      id: 'metric-4',
      category: 'Marketing',
      name: 'Marketing ROI',
      value: 420,
      target: 350,
      trend: 'up',
      period: 'This quarter',
    },
    {
      id: 'metric-5',
      category: 'Operations',
      name: 'Operational Efficiency',
      value: 92,
      target: 90,
      trend: 'up',
      period: 'This month',
    },
  ];

  // Predictive Forecasts
  const forecasts: Forecast[] = [
    {
      id: 'forecast-1',
      name: 'Revenue Forecast',
      type: 'revenue',
      currentValue: 124000000,
      predictedValue: 142000000,
      confidence: 94,
      period: 'Q1 2026',
      scenarios: {
        best: 158000000,
        expected: 142000000,
        worst: 128000000,
      },
    },
    {
      id: 'forecast-2',
      name: 'Demand Forecast',
      type: 'demand',
      currentValue: 84000,
      predictedValue: 98000,
      confidence: 91,
      period: 'Next quarter',
      scenarios: {
        best: 112000,
        expected: 98000,
        worst: 84000,
      },
    },
    {
      id: 'forecast-3',
      name: 'Churn Prediction',
      type: 'churn',
      currentValue: 4.2,
      predictedValue: 3.8,
      confidence: 88,
      period: 'Next quarter',
      scenarios: {
        best: 3.2,
        expected: 3.8,
        worst: 4.8,
      },
    },
  ];

  // Anomalies
  const anomalies: Anomaly[] = [
    {
      id: 'anomaly-1',
      type: 'Revenue',
      severity: 'high',
      description: 'Unexpected revenue spike in APAC region',
      detectedAt: '2 hours ago',
      status: 'investigating',
      impact: '$2.4M variance',
    },
    {
      id: 'anomaly-2',
      type: 'Operational',
      severity: 'medium',
      description: 'Data quality degradation in customer records',
      detectedAt: '4 hours ago',
      status: 'active',
      impact: '12% affected records',
    },
    {
      id: 'anomaly-3',
      type: 'Security',
      severity: 'critical',
      description: 'Unusual data access pattern detected',
      detectedAt: '30 min ago',
      status: 'investigating',
      impact: 'Potential security breach',
    },
  ];

  // KPIs
  const kpis: KPI[] = [
    {
      id: 'kpi-1',
      name: 'Revenue Growth Rate',
      category: 'executive',
      value: 18.4,
      target: 15,
      progress: 122,
      trend: 'up',
      owner: 'CFO',
    },
    {
      id: 'kpi-2',
      name: 'Customer Satisfaction',
      category: 'executive',
      value: 92,
      target: 90,
      progress: 102,
      trend: 'up',
      owner: 'CCO',
    },
    {
      id: 'kpi-3',
      name: 'Data Literacy Score',
      category: 'department',
      value: 78,
      target: 80,
      progress: 97,
      trend: 'up',
      owner: 'CDO',
    },
    {
      id: 'kpi-4',
      name: 'Time-to-Insight',
      category: 'operational',
      value: 2.4,
      target: 3,
      progress: 125,
      trend: 'up',
      owner: 'Data Team',
    },
  ];

  // Data Quality Metrics
  const dataQualityMetrics: DataQualityMetric[] = [
    {
      id: 'dq-1',
      dimension: 'Completeness',
      score: 98.2,
      trend: 'up',
      issues: 142,
      lastAssessment: '2 hours ago',
    },
    {
      id: 'dq-2',
      dimension: 'Accuracy',
      score: 96.8,
      trend: 'stable',
      issues: 89,
      lastAssessment: '2 hours ago',
    },
    {
      id: 'dq-3',
      dimension: 'Consistency',
      score: 94.5,
      trend: 'up',
      issues: 234,
      lastAssessment: '2 hours ago',
    },
    {
      id: 'dq-4',
      dimension: 'Timeliness',
      score: 99.1,
      trend: 'up',
      issues: 28,
      lastAssessment: '2 hours ago',
    },
  ];

  // Strategic Recommendations
  const strategicRecommendations: StrategicRecommendation[] = [
    {
      id: 'rec-1',
      type: 'opportunity',
      title: 'Enterprise segment growth opportunity',
      description: 'Revenue growth opportunity detected in enterprise segment with 34% increase in demand',
      impact: 'high',
      confidence: 92,
      actionItems: ['Increase enterprise sales focus', 'Develop enterprise-specific features', 'Allocate additional resources'],
      priority: 1,
    },
    {
      id: 'rec-2',
      type: 'risk',
      title: 'Customer churn risk in APAC',
      description: 'Customer churn risk increased in APAC region due to competitive pressure',
      impact: 'high',
      confidence: 88,
      actionItems: ['Launch retention campaign', 'Review pricing strategy', 'Enhance customer support'],
      priority: 2,
    },
    {
      id: 'rec-3',
      type: 'optimization',
      title: 'Marketing ROI optimization',
      description: 'Marketing ROI forecast exceeds target by 18% - recommend reallocating budget',
      impact: 'medium',
      confidence: 85,
      actionItems: ['Reallocate marketing budget', 'Scale successful campaigns', 'A/B test new channels'],
      priority: 3,
    },
  ];

  // Market Signals
  const marketSignals: MarketSignal[] = [
    {
      id: 'signal-1',
      source: 'Industry Reports',
      type: 'trend',
      title: 'AI adoption accelerating in enterprise',
      description: 'Enterprise AI adoption expected to grow 45% in 2026',
      sentiment: 'positive',
      timestamp: '1 day ago',
    },
    {
      id: 'signal-2',
      source: 'Competitor Analysis',
      type: 'competitor',
      title: 'Competitor launching new product',
      description: 'Major competitor launching competing product in Q2',
      sentiment: 'negative',
      timestamp: '2 days ago',
    },
    {
      id: 'signal-3',
      source: 'Market Research',
      type: 'market',
      title: 'Market size expanding',
      description: 'Total addressable market increased by 22%',
      sentiment: 'positive',
      timestamp: '3 days ago',
    },
  ];

  // AI Insights
  const aiInsights: AIInsight[] = [
    {
      id: 'insight-1',
      type: 'opportunity',
      title: 'Revenue growth opportunity detected',
      description: 'Revenue growth opportunity detected in enterprise segment with 34% increase in demand',
      impact: 'high',
      actionable: true,
      confidence: 92,
      category: 'Revenue',
    },
    {
      id: 'insight-2',
      type: 'risk',
      title: 'Customer churn risk increased',
      description: 'Customer churn risk increased in APAC region due to competitive pressure',
      impact: 'high',
      actionable: true,
      confidence: 88,
      category: 'Customer',
    },
    {
      id: 'insight-3',
      type: 'recommendation',
      title: 'Marketing ROI forecast exceeds target',
      description: 'Marketing ROI forecast exceeds target by 18% - recommend reallocating budget',
      impact: 'medium',
      actionable: true,
      confidence: 85,
      category: 'Marketing',
    },
    {
      id: 'insight-4',
      type: 'warning',
      title: 'Data quality issue affecting reports',
      description: 'Data quality issue affecting executive reports - 12% records incomplete',
      impact: 'medium',
      actionable: true,
      confidence: 94,
      category: 'Data Quality',
    },
    {
      id: 'insight-5',
      type: 'opportunity',
      title: 'Demand forecast suggests inventory increase',
      description: 'Demand forecast suggests inventory increase next quarter - recommend stock adjustment',
      impact: 'medium',
      actionable: true,
      confidence: 91,
      category: 'Operations',
    },
  ];

  // Intelligence Activity Feed
  const intelligenceActivity: IntelligenceActivity[] = [
    {
      id: 'activity-1',
      type: 'insight',
      title: 'New insight generated',
      description: 'Revenue growth opportunity detected in enterprise segment',
      timestamp: '2 min ago',
      impact: 'high',
    },
    {
      id: 'activity-2',
      type: 'forecast',
      title: 'Forecast updated',
      description: 'Q1 2026 revenue forecast updated with new confidence intervals',
      timestamp: '5 min ago',
      impact: 'medium',
    },
    {
      id: 'activity-3',
      type: 'anomaly',
      title: 'Anomaly detected',
      description: 'Unusual revenue spike detected in APAC region',
      timestamp: '2 hours ago',
      impact: 'high',
    },
    {
      id: 'activity-4',
      type: 'kpi',
      title: 'KPI threshold exceeded',
      description: 'Revenue growth rate exceeded target by 3.4%',
      timestamp: '3 hours ago',
      impact: 'medium',
    },
    {
      id: 'activity-5',
      type: 'opportunity',
      title: 'Strategic opportunity identified',
      description: 'New market expansion opportunity detected in EMEA',
      timestamp: '4 hours ago',
      impact: 'high',
    },
    {
      id: 'activity-6',
      type: 'source',
      title: 'Data source updated',
      description: 'Salesforce API sync completed successfully',
      timestamp: '15 min ago',
      impact: 'low',
    },
    {
      id: 'activity-7',
      type: 'alert',
      title: 'Executive alert created',
      description: 'Critical data quality issue flagged for executive attention',
      timestamp: '1 hour ago',
      impact: 'high',
    },
  ];

  // Platform Health
  const platformComponents: PlatformComponent[] = [
    {
      id: 'platform-1',
      name: 'Snowflake Data Warehouse',
      type: 'warehouse',
      status: 'healthy',
      uptime: 99.9,
      latency: 23,
      throughput: '12.4 TB/hour',
      lastCheck: '1 min ago',
    },
    {
      id: 'platform-2',
      name: 'Databricks Lakehouse',
      type: 'lake',
      status: 'healthy',
      uptime: 99.8,
      latency: 45,
      throughput: '8.2 TB/hour',
      lastCheck: '1 min ago',
    },
    {
      id: 'platform-3',
      name: 'ETL Pipelines',
      type: 'etl',
      status: 'healthy',
      uptime: 99.5,
      latency: 120,
      throughput: '1.2M rows/hour',
      lastCheck: '2 min ago',
    },
    {
      id: 'platform-4',
      name: 'Streaming Services',
      type: 'streaming',
      status: 'degraded',
      uptime: 97.2,
      latency: 340,
      throughput: '840K events/hour',
      lastCheck: '5 min ago',
    },
    {
      id: 'platform-5',
      name: 'Tableau BI Platform',
      type: 'bi',
      status: 'healthy',
      uptime: 99.9,
      latency: 89,
      throughput: '24K queries/hour',
      lastCheck: '1 min ago',
    },
    {
      id: 'platform-6',
      name: 'ML Infrastructure',
      type: 'ml',
      status: 'healthy',
      uptime: 99.7,
      latency: 234,
      throughput: '1.2K inferences/hour',
      lastCheck: '2 min ago',
    },
    {
      id: 'platform-7',
      name: 'AI Agents',
      type: 'agent',
      status: 'healthy',
      uptime: 99.8,
      latency: 45,
      throughput: '8.4K tasks/hour',
      lastCheck: '1 min ago',
    },
  ];

  const renderAgentCard = (agent: IntelligenceAgent) => (
    <View key={agent.id} style={[
      styles.agentCard, 
      { 
        backgroundColor: theme.colors.card, 
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderRadius: 16,
        shadowColor: agent.status === 'online' ? '#10B981' : agent.status === 'busy' ? '#F59E0B' : '#6B7280',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
      }
    ]}>
      <View style={styles.agentHeader}>
        <View style={styles.agentAvatar}>
          <Text style={styles.agentAvatarText}>{agent.avatar}</Text>
          <View style={[
            styles.statusIndicator, 
            { 
              backgroundColor: agent.status === 'online' ? '#10B981' : agent.status === 'busy' ? '#F59E0B' : '#6B7280',
              shadowColor: agent.status === 'online' ? '#10B981' : agent.status === 'busy' ? '#F59E0B' : '#6B7280',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 6,
            }
          ]} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: theme.colors.text, fontWeight: '700' }]}>{agent.name}</Text>
          <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>{agent.role}</Text>
        </View>
        <View style={[styles.agentConfidenceBadge, { backgroundColor: '#8B5CF6' + '20', borderWidth: 1, borderColor: '#8B5CF6' + '40' }]}>
          <Text style={[styles.agentConfidenceText, { color: '#8B5CF6', fontWeight: '700' }]}>{agent.confidenceScore}%</Text>
        </View>
      </View>
      
      {/* Advanced Metrics Display */}
      <View style={styles.agentAdvancedSection}>
        <View style={styles.agentMetricRow}>
          <View style={styles.agentMetricItem}>
            <Cpu size={14} color="#3B82F6" />
            <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary, fontSize: 11 }]}>Processing</Text>
            <Text style={[styles.agentMetricValue, { color: '#3B82F6', fontWeight: '700', fontSize: 14 }]}>{agent.processingPower || 85}%</Text>
          </View>
          <View style={styles.agentMetricItem}>
            <Cpu size={14} color="#8B5CF6" />
            <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary, fontSize: 11 }]}>Memory</Text>
            <Text style={[styles.agentMetricValue, { color: '#8B5CF6', fontWeight: '700', fontSize: 14 }]}>{agent.memoryUsage || 70}%</Text>
          </View>
        </View>
        <View style={styles.agentMetricRow}>
          <View style={styles.agentMetricItem}>
            <Activity size={14} color="#10B981" />
            <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary, fontSize: 11 }]}>Active Tasks</Text>
            <Text style={[styles.agentMetricValue, { color: '#10B981', fontWeight: '700', fontSize: 14 }]}>{agent.activeTasks || 12}</Text>
          </View>
          <View style={styles.agentMetricItem}>
            <Zap size={14} color="#F59E0B" />
            <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary, fontSize: 11 }]}>Efficiency</Text>
            <Text style={[styles.agentMetricValue, { color: '#F59E0B', fontWeight: '700', fontSize: 14 }]}>{agent.efficiency || 90}%</Text>
          </View>
        </View>
      </View>
      
      <View style={[styles.agentMetrics, { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 12 }]}>
        <View style={styles.metricItem}>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary, fontSize: 11 }]}>Workload</Text>
          <Text style={[styles.metricValue, { color: agent.workload === 'High' || agent.workload === 'Very High' ? '#EF4444' : agent.workload === 'Medium' ? '#F59E0B' : '#10B981', fontWeight: '600' }]}>{agent.workload}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary, fontSize: 11 }]}>Impact</Text>
          <Text style={[styles.metricValue, { color: agent.businessImpact === 'Critical' ? '#EF4444' : agent.businessImpact === 'High' ? '#F59E0B' : '#10B981', fontWeight: '600' }]}>{agent.businessImpact}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary, fontSize: 11 }]}>Trend</Text>
          {agent.performanceTrend === 'up' && <TrendingUp size={16} color="#10B981" />}
          {agent.performanceTrend === 'down' && <TrendingDown size={16} color="#EF4444" />}
          {agent.performanceTrend === 'stable' && <Activity size={16} color="#6B7280" />}
        </View>
      </View>

      <View style={styles.agentDetailsGrid}>
        {agent.metrics.accuracy && (
          <View style={styles.agentDetail}>
            <Target size={14} color="#3B82F6" />
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Accuracy: {agent.metrics.accuracy}%</Text>
          </View>
        )}
        {agent.metrics.modelsManaged && (
          <View style={styles.agentDetail}>
            <Brain size={14} color="#8B5CF6" />
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Models: {agent.metrics.modelsManaged}</Text>
          </View>
        )}
        {agent.metrics.insightsGenerated && (
          <View style={styles.agentDetail}>
            <Sparkles size={14} color="#F59E0B" />
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Insights: {agent.metrics.insightsGenerated.toLocaleString()}</Text>
          </View>
        )}
        {agent.metrics.dashboardsManaged && (
          <View style={styles.agentDetail}>
            <BarChart3 size={14} color="#10B981" />
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Dashboards: {agent.metrics.dashboardsManaged}</Text>
          </View>
        )}
        {agent.metrics.queriesProcessed && (
          <View style={styles.agentDetail}>
            <Activity size={14} color="#EC4899" />
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Queries: {(agent.metrics.queriesProcessed / 1000000).toFixed(1)}M</Text>
          </View>
        )}
        {agent.metrics.eventsMonitored && (
          <View style={styles.agentDetail}>
            <Eye size={14} color="#06B6D4" />
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Events: {(agent.metrics.eventsMonitored / 1000000).toFixed(0)}M</Text>
          </View>
        )}
        {agent.metrics.anomaliesDetected && (
          <View style={styles.agentDetail}>
            <AlertTriangle size={14} color="#EF4444" />
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Anomalies: {agent.metrics.anomaliesDetected.toLocaleString()}</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderKPICard = (kpi: IntelligenceKPI) => (
    <View key={kpi.id} style={[
      styles.kpiCard, 
      { 
        backgroundColor: theme.colors.card, 
        borderColor: kpi.color + '40',
        borderWidth: 1,
        borderRadius: 12,
        shadowColor: kpi.color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
      }
    ]}>
      <View style={styles.kpiHeader}>
        <View style={[styles.kpiIcon, { backgroundColor: kpi.color + '20', borderWidth: 1, borderColor: kpi.color + '30' }]}>
          <Activity size={20} color={kpi.color} />
        </View>
        <View style={styles.kpiInfo}>
          <Text style={[styles.kpiTitle, { color: theme.colors.textSecondary, fontSize: 11 }]}>{kpi.title}</Text>
          <Text style={[styles.kpiValue, { color: theme.colors.text, fontSize: 24, fontWeight: '800' }]}>{kpi.value}</Text>
        </View>
      </View>
      <View style={styles.kpiFooter}>
        <View style={[
          styles.kpiChange, 
          { 
            backgroundColor: kpi.trend === 'up' ? '#10B981' + '20' : kpi.trend === 'down' ? '#EF4444' + '20' : '#6B7280' + '20',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
          }
        ]}>
          {kpi.trend === 'up' && <TrendingUp size={14} color="#10B981" />}
          {kpi.trend === 'down' && <TrendingDown size={14} color="#EF4444" />}
          {kpi.trend === 'stable' && <Activity size={14} color="#6B7280" />}
          <Text style={[styles.kpiChangeText, { color: kpi.trend === 'up' ? '#10B981' : kpi.trend === 'down' ? '#EF4444' : '#6B7280', fontWeight: '600', fontSize: 12 }]}>{kpi.change}</Text>
        </View>
        <Text style={[styles.kpiSubtitle, { color: theme.colors.textSecondary, fontSize: 10 }]}>{kpi.subtitle}</Text>
      </View>
    </View>
  );

  const renderDataSource = (source: DataSource) => (
    <View key={source.id} style={[styles.sourceCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.sourceHeader}>
        <View style={[styles.sourceHealth, { backgroundColor: source.health === 'healthy' ? '#10B981' : source.health === 'degraded' ? '#F59E0B' : '#EF4444' }]} />
        <Text style={[styles.sourceName, { color: theme.colors.text }]}>{source.name}</Text>
        <Text style={[styles.sourceType, { color: theme.colors.textSecondary }]}>{source.type}</Text>
      </View>
      <View style={styles.sourceMetrics}>
        <View style={styles.sourceMetric}>
          <Text style={[styles.sourceMetricLabel, { color: theme.colors.textSecondary }]}>Volume</Text>
          <Text style={[styles.sourceMetricValue, { color: theme.colors.text }]}>{source.dataVolume}</Text>
        </View>
        <View style={styles.sourceMetric}>
          <Text style={[styles.sourceMetricLabel, { color: theme.colors.textSecondary }]}>Freshness</Text>
          <Text style={[styles.sourceMetricValue, { color: theme.colors.text }]}>{source.freshness}</Text>
        </View>
        <View style={styles.sourceMetric}>
          <Text style={[styles.sourceMetricLabel, { color: theme.colors.textSecondary }]}>Reliability</Text>
          <Text style={[styles.sourceMetricValue, { color: source.reliability > 99 ? '#10B981' : source.reliability > 95 ? '#F59E0B' : '#EF4444' }]}>{source.reliability}%</Text>
        </View>
      </View>
      <Text style={[styles.sourceSync, { color: theme.colors.textSecondary }]}>Sync: {source.lastSync}</Text>
    </View>
  );

  const renderForecastCard = (forecast: Forecast) => (
    <View key={forecast.id} style={[styles.forecastCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.forecastHeader}>
        <Text style={[styles.forecastName, { color: theme.colors.text }]}>{forecast.name}</Text>
        <View style={[styles.forecastConfidence, { backgroundColor: '#8B5CF6' + '20' }]}>
          <Text style={[styles.forecastConfidenceText, { color: '#8B5CF6' }]}>{forecast.confidence}% confidence</Text>
        </View>
      </View>
      <View style={styles.forecastValues}>
        <View style={styles.forecastValue}>
          <Text style={[styles.forecastLabel, { color: theme.colors.textSecondary }]}>Current</Text>
          <Text style={[styles.forecastNumber, { color: theme.colors.text }]}>{(forecast.currentValue / 1000000).toFixed(1)}M</Text>
        </View>
        <View style={styles.forecastValue}>
          <Text style={[styles.forecastLabel, { color: theme.colors.textSecondary }]}>Predicted</Text>
          <Text style={[styles.forecastNumber, { color: '#10B981' }]}>{(forecast.predictedValue / 1000000).toFixed(1)}M</Text>
        </View>
      </View>
      <View style={styles.forecastScenarios}>
        <View style={styles.scenario}>
          <Text style={[styles.scenarioLabel, { color: theme.colors.textSecondary }]}>Best</Text>
          <Text style={[styles.scenarioValue, { color: '#10B981' }]}>{(forecast.scenarios.best / 1000000).toFixed(1)}M</Text>
        </View>
        <View style={styles.scenario}>
          <Text style={[styles.scenarioLabel, { color: theme.colors.textSecondary }]}>Expected</Text>
          <Text style={[styles.scenarioValue, { color: '#3B82F6' }]}>{(forecast.scenarios.expected / 1000000).toFixed(1)}M</Text>
        </View>
        <View style={styles.scenario}>
          <Text style={[styles.scenarioLabel, { color: theme.colors.textSecondary }]}>Worst</Text>
          <Text style={[styles.scenarioValue, { color: '#EF4444' }]}>{(forecast.scenarios.worst / 1000000).toFixed(1)}M</Text>
        </View>
      </View>
      <Text style={[styles.forecastPeriod, { color: theme.colors.textSecondary }]}>{forecast.period}</Text>
    </View>
  );

  const renderAnomalyCard = (anomaly: Anomaly) => (
    <View key={anomaly.id} style={[styles.anomalyCard, { backgroundColor: theme.colors.card, borderColor: anomaly.severity === 'critical' ? '#EF4444' : anomaly.severity === 'high' ? '#F59E0B' : anomaly.severity === 'medium' ? '#F59E0B' : '#6B7280' }]}>
      <View style={styles.anomalyHeader}>
        <AlertTriangle size={20} color={anomaly.severity === 'critical' ? '#EF4444' : anomaly.severity === 'high' ? '#F59E0B' : '#6B7280'} />
        <Text style={[styles.anomalyType, { color: theme.colors.text }]}>{anomaly.type}</Text>
        <View style={[styles.anomalyStatus, { backgroundColor: anomaly.status === 'active' ? '#EF4444' + '20' : anomaly.status === 'investigating' ? '#F59E0B' + '20' : '#10B981' + '20' }]}>
          <Text style={[styles.anomalyStatusText, { color: anomaly.status === 'active' ? '#EF4444' : anomaly.status === 'investigating' ? '#F59E0B' : '#10B981' }]}>{anomaly.status}</Text>
        </View>
      </View>
      <Text style={[styles.anomalyDescription, { color: theme.colors.text }]}>{anomaly.description}</Text>
      <View style={styles.anomalyFooter}>
        <Text style={[styles.anomalyImpact, { color: theme.colors.textSecondary }]}>{anomaly.impact}</Text>
        <Text style={[styles.anomalyTime, { color: theme.colors.textSecondary }]}>{anomaly.detectedAt}</Text>
      </View>
    </View>
  );

  const renderInsightCard = (insight: AIInsight) => (
    <View key={insight.id} style={[styles.insightCard, { backgroundColor: theme.colors.card, borderColor: insight.type === 'opportunity' ? '#10B981' : insight.type === 'risk' ? '#EF4444' : insight.type === 'warning' ? '#F59E0B' : insight.type === 'recommendation' ? '#8B5CF6' : '#3B82F6' }]}>
      <View style={styles.insightHeader}>
        {insight.type === 'opportunity' && <Target size={20} color="#10B981" />}
        {insight.type === 'risk' && <AlertTriangle size={20} color="#EF4444" />}
        {insight.type === 'warning' && <AlertTriangle size={20} color="#F59E0B" />}
        {insight.type === 'recommendation' && <Sparkles size={20} color="#8B5CF6" />}
        {insight.type === 'info' && <Info size={20} color="#3B82F6" />}
        {insight.type === 'success' && <CheckCircle size={20} color="#10B981" />}
        <Text style={[styles.insightTitle, { color: theme.colors.text }]}>{insight.title}</Text>
        {insight.confidence && (
          <View style={[styles.insightConfidence, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Text style={[styles.insightConfidenceText, { color: '#8B5CF6' }]}>{insight.confidence}%</Text>
          </View>
        )}
      </View>
      <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>{insight.description}</Text>
      <View style={styles.insightFooter}>
        <View style={[styles.insightCategory, { backgroundColor: '#3B82F6' + '20' }]}>
          <Text style={[styles.insightCategoryText, { color: '#3B82F6' }]}>{insight.category}</Text>
        </View>
        <View style={[styles.insightImpact, { backgroundColor: insight.impact === 'high' ? '#EF4444' + '20' : insight.impact === 'medium' ? '#F59E0B' + '20' : '#6B7280' + '20' }]}>
          <Text style={[styles.insightImpactText, { color: insight.impact === 'high' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#6B7280' }]}>{insight.impact}</Text>
        </View>
        {insight.actionable && (
          <View style={[styles.insightActionable, { backgroundColor: '#10B981' + '20' }]}>
            <Text style={[styles.insightActionableText, { color: '#10B981' }]}>Actionable</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderActivityItem = (activity: IntelligenceActivity) => (
    <View key={activity.id} style={styles.activityItem}>
      <View style={[styles.activityDot, { backgroundColor: activity.impact === 'high' ? '#EF4444' : activity.impact === 'medium' ? '#F59E0B' : '#6B7280' }]} />
      <View style={styles.activityContent}>
        <Text style={[styles.activityTitle, { color: theme.colors.text }]}>{activity.title}</Text>
        <Text style={[styles.activityDescription, { color: theme.colors.textSecondary }]}>{activity.description}</Text>
        <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{activity.timestamp}</Text>
      </View>
    </View>
  );

  const renderPlatformCard = (platform: PlatformComponent) => (
    <View key={platform.id} style={[styles.platformCard, { backgroundColor: theme.colors.card, borderColor: platform.status === 'healthy' ? '#10B981' : platform.status === 'degraded' ? '#F59E0B' : '#EF4444' }]}>
      <View style={styles.platformHeader}>
        <Text style={[styles.platformName, { color: theme.colors.text }]}>{platform.name}</Text>
        <View style={[styles.platformStatus, { backgroundColor: platform.status === 'healthy' ? '#10B981' + '20' : platform.status === 'degraded' ? '#F59E0B' + '20' : '#EF4444' + '20' }]}>
          <Text style={[styles.platformStatusText, { color: platform.status === 'healthy' ? '#10B981' : platform.status === 'degraded' ? '#F59E0B' : '#EF4444' }]}>{platform.status}</Text>
        </View>
      </View>
      <View style={styles.platformMetrics}>
        <View style={styles.platformMetric}>
          <Text style={[styles.platformMetricLabel, { color: theme.colors.textSecondary }]}>Uptime</Text>
          <Text style={[styles.platformMetricValue, { color: platform.uptime > 99 ? '#10B981' : platform.uptime > 95 ? '#F59E0B' : '#EF4444' }]}>{platform.uptime}%</Text>
        </View>
        <View style={styles.platformMetric}>
          <Text style={[styles.platformMetricLabel, { color: theme.colors.textSecondary }]}>Latency</Text>
          <Text style={[styles.platformMetricValue, { color: platform.latency < 100 ? '#10B981' : platform.latency < 300 ? '#F59E0B' : '#EF4444' }]}>{platform.latency}ms</Text>
        </View>
        <View style={styles.platformMetric}>
          <Text style={[styles.platformMetricLabel, { color: theme.colors.textSecondary }]}>Throughput</Text>
          <Text style={[styles.platformMetricValue, { color: theme.colors.text }]}>{platform.throughput}</Text>
        </View>
      </View>
      <Text style={[styles.platformCheck, { color: theme.colors.textSecondary }]}>Last check: {platform.lastCheck}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#0B0F14' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={[styles.headerIcon, { backgroundColor: 'rgba(0, 172, 193, 0.2)', borderWidth: 1, borderColor: 'rgba(0, 172, 193, 0.3)' }]}>
              <Database size={28} color="#00ACC1" />
            </View>
            <View style={styles.headerText}>
              <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>AI Data & Intelligence Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Enterprise Intelligence Operations</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <RefreshCw size={20} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <Settings size={20} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Executive KPI Bar */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Executive Intelligence KPIs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
          {executiveKPIs.map(renderKPICard)}
        </ScrollView>
      </View>

      {/* AI Intelligence Agents */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Intelligence Agents</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
          {intelligenceAgents.map(renderAgentCard)}
        </ScrollView>
      </View>

      {/* Chief Data Officer Command Center - Premium */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Brain size={24} color="#8B5CF6" />
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Chief Data Officer Command Center</Text>
            <View style={[styles.sectionBadge, { backgroundColor: '#8B5CF6' + '20', borderWidth: 1, borderColor: '#8B5CF6' + '40' }]}>
              <Text style={[styles.sectionBadgeText, { color: '#8B5CF6' }]}>LIVE</Text>
            </View>
          </View>
        </View>
        <View style={[
          styles.cdoCard, 
          { 
            backgroundColor: theme.colors.card, 
            borderColor: '#8B5CF6' + '30',
            borderWidth: 2,
            borderRadius: 16,
            shadowColor: '#8B5CF6',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 8,
          }
        ]}>
          <View style={styles.cdoStats}>
            <View style={[styles.cdoStat, { backgroundColor: '#00ACC1' + '10', borderWidth: 1, borderColor: '#00ACC1' + '20', borderRadius: 12 }]}>
              <Database size={24} color="#00ACC1" />
              <Text style={[styles.cdoStatValue, { color: '#00ACC1', fontSize: 28, fontWeight: '800' }]}>428</Text>
              <Text style={[styles.cdoStatLabel, { color: theme.colors.textSecondary, fontSize: 12 }]}>Data Sources</Text>
            </View>
            <View style={[styles.cdoStat, { backgroundColor: '#10B981' + '10', borderWidth: 1, borderColor: '#10B981' + '20', borderRadius: 12 }]}>
              <Activity size={24} color="#10B981" />
              <Text style={[styles.cdoStatValue, { color: '#10B981', fontSize: 28, fontWeight: '800' }]}>128M</Text>
              <Text style={[styles.cdoStatLabel, { color: theme.colors.textSecondary, fontSize: 12 }]}>Daily Events</Text>
            </View>
            <View style={[styles.cdoStat, { backgroundColor: '#8B5CF6' + '10', borderWidth: 1, borderColor: '#8B5CF6' + '20', borderRadius: 12 }]}>
              <Sparkles size={24} color="#8B5CF6" />
              <Text style={[styles.cdoStatValue, { color: '#8B5CF6', fontSize: 28, fontWeight: '800' }]}>24,821</Text>
              <Text style={[styles.cdoStatLabel, { color: theme.colors.textSecondary, fontSize: 12 }]}>AI Insights</Text>
            </View>
            <View style={[styles.cdoStat, { backgroundColor: '#3B82F6' + '10', borderWidth: 1, borderColor: '#3B82F6' + '20', borderRadius: 12 }]}>
              <Brain size={24} color="#3B82F6" />
              <Text style={[styles.cdoStatValue, { color: '#3B82F6', fontSize: 28, fontWeight: '800' }]}>342</Text>
              <Text style={[styles.cdoStatLabel, { color: theme.colors.textSecondary, fontSize: 12 }]}>Active Models</Text>
            </View>
            <View style={[styles.cdoStat, { backgroundColor: '#F59E0B' + '10', borderWidth: 1, borderColor: '#F59E0B' + '20', borderRadius: 12 }]}>
              <Target size={24} color="#F59E0B" />
              <Text style={[styles.cdoStatValue, { color: '#F59E0B', fontSize: 28, fontWeight: '800' }]}>184</Text>
              <Text style={[styles.cdoStatLabel, { color: theme.colors.textSecondary, fontSize: 12 }]}>Opportunities</Text>
            </View>
          </View>
          <View style={[styles.cdoSummary, { backgroundColor: 'rgba(139, 92, 246, 0.05)', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#8B5CF6' + '20' }]}>
            <View style={styles.cdoSummaryHeader}>
              <View style={[styles.cdoSummaryIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
                <Info size={20} color="#8B5CF6" />
              </View>
              <Text style={[styles.cdoSummaryTitle, { color: theme.colors.text, fontSize: 16, fontWeight: '700' }]}>Executive Intelligence Summary</Text>
            </View>
            <Text style={[styles.cdoSummaryText, { color: theme.colors.textSecondary, fontSize: 14, lineHeight: 20 }]}>
              Data ecosystem operating at <Text style={{ color: '#10B981', fontWeight: '700' }}>94.7% health</Text>. AI agents generating <Text style={{ color: '#8B5CF6', fontWeight: '700' }}>24,821 insights daily</Text> with <Text style={{ color: '#3B82F6', fontWeight: '700' }}>96.2% prediction accuracy</Text>. 
              <Text style={{ color: '#F59E0B', fontWeight: '700' }}>184 strategic opportunities</Text> identified, <Text style={{ color: '#EF4444', fontWeight: '700' }}>12 risk alerts</Text> active. Platform uptime <Text style={{ color: '#10B981', fontWeight: '700' }}>99.8%</Text>.
            </Text>
          </View>
        </View>
      </View>

      {/* Enterprise Data Ecosystem - Premium */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Network size={24} color="#06B6D4" />
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Enterprise Data Ecosystem</Text>
            <View style={[styles.sectionBadge, { backgroundColor: '#06B6D4' + '20', borderWidth: 1, borderColor: '#06B6D4' + '40' }]}>
              <Text style={[styles.sectionBadgeText, { color: '#06B6D4' }]}>{dataSources.length} Sources</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.sectionAction}>
            <Text style={styles.sectionActionText}>Data Lineage</Text>
            <ChevronRight size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sourcesScroll}>
          {dataSources.map((source) => (
            <View key={source.id} style={[
              styles.sourceCard, 
              { 
                backgroundColor: theme.colors.card, 
                borderColor: source.health === 'healthy' ? '#10B981' + '30' : source.health === 'degraded' ? '#F59E0B' + '30' : '#EF4444' + '30',
                borderWidth: 2,
                borderRadius: 16,
                shadowColor: source.health === 'healthy' ? '#10B981' : source.health === 'degraded' ? '#F59E0B' : '#EF4444',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 6,
              }
            ]}>
              <View style={styles.sourceHeader}>
                <View style={[
                  styles.sourceHealth, 
                  { 
                    backgroundColor: source.health === 'healthy' ? '#10B981' : source.health === 'degraded' ? '#F59E0B' : '#EF4444',
                    shadowColor: source.health === 'healthy' ? '#10B981' : source.health === 'degraded' ? '#F59E0B' : '#EF4444',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.8,
                    shadowRadius: 6,
                  }
                ]} />
                <Text style={[styles.sourceName, { color: theme.colors.text, fontWeight: '700' }]}>{source.name}</Text>
                <View style={[styles.sourceType, { backgroundColor: '#06B6D4' + '20', borderWidth: 1, borderColor: '#06B6D4' + '30' }]}>
                  <Text style={[styles.sourceTypeText, { color: '#06B6D4', fontSize: 10, fontWeight: '600' }]}>{source.type.toUpperCase()}</Text>
                </View>
              </View>
              
              <View style={styles.sourceMetrics}>
                <View style={styles.sourceMetric}>
                  <HardDrive size={14} color="#3B82F6" />
                  <Text style={[styles.sourceMetricLabel, { color: theme.colors.textSecondary, fontSize: 11 }]}>Volume</Text>
                  <Text style={[styles.sourceMetricValue, { color: theme.colors.text, fontWeight: '700', fontSize: 14 }]}>{source.dataVolume}</Text>
                </View>
                <View style={styles.sourceMetric}>
                  <Clock size={14} color="#8B5CF6" />
                  <Text style={[styles.sourceMetricLabel, { color: theme.colors.textSecondary, fontSize: 11 }]}>Freshness</Text>
                  <Text style={[styles.sourceMetricValue, { color: theme.colors.text, fontWeight: '700', fontSize: 14 }]}>{source.freshness}</Text>
                </View>
                <View style={styles.sourceMetric}>
                  <Shield size={14} color="#10B981" />
                  <Text style={[styles.sourceMetricLabel, { color: theme.colors.textSecondary, fontSize: 11 }]}>Reliability</Text>
                  <Text style={[styles.sourceMetricValue, { color: theme.colors.text, fontWeight: '700', fontSize: 14 }]}>{source.reliability}%</Text>
                </View>
              </View>
              
              <View style={[styles.sourceSync, { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 12 }]}>
                <RefreshCw size={12} color="#6B7280" />
                <Text style={[styles.sourceSyncText, { color: theme.colors.textSecondary, fontSize: 11 }]}>{source.lastSync}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Business Intelligence Hub - Premium */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <BarChart3 size={24} color="#10B981" />
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Business Intelligence Hub</Text>
            <View style={[styles.sectionBadge, { backgroundColor: '#10B981' + '20', borderWidth: 1, borderColor: '#10B981' + '40' }]}>
              <Text style={[styles.sectionBadgeText, { color: '#10B981' }]}>{businessMetrics.length} Metrics</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.sectionAction}>
            <Text style={styles.sectionActionText}>Analytics</Text>
            <ChevronRight size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <View style={[
          styles.biCard, 
          { 
            backgroundColor: theme.colors.card, 
            borderColor: '#10B981' + '20',
            borderWidth: 2,
            borderRadius: 16,
            shadowColor: '#10B981',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 6,
          }
        ]}>
          {businessMetrics.map((metric, index) => (
            <View key={metric.id} style={[
              styles.biMetric, 
              { 
                borderBottomWidth: index < businessMetrics.length - 1 ? 1 : 0,
                borderBottomColor: 'rgba(255,255,255,0.1)',
                backgroundColor: index % 2 === 0 ? 'rgba(16, 185, 129, 0.03)' : 'transparent',
              }
            ]}>
              <View style={[styles.biMetricCategory, { backgroundColor: '#3B82F6' + '20', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }]}>
                <Text style={[styles.biMetricCategoryText, { color: '#3B82F6', fontSize: 11, fontWeight: '700' }]}>{metric.category}</Text>
              </View>
              <Text style={[styles.biMetricName, { color: theme.colors.text, fontSize: 15, fontWeight: '600' }]}>{metric.name}</Text>
              <Text style={[
                styles.biMetricValue, 
                { 
                  color: metric.trend === 'up' ? '#10B981' : metric.trend === 'down' ? '#EF4444' : '#6B7280',
                  fontSize: 18,
                  fontWeight: '800',
                }
              ]}>
                {metric.value >= 1000000 ? `$${(metric.value / 1000000).toFixed(1)}M` : metric.value >= 1000 ? `$${(metric.value / 1000).toFixed(0)}K` : `$${metric.value}`}
              </Text>
              <View style={styles.biMetricTarget}>
                <Text style={[styles.biMetricTargetLabel, { color: theme.colors.textSecondary, fontSize: 11 }]}>Target:</Text>
                <Text style={[styles.biMetricTargetValue, { color: theme.colors.text, fontSize: 12, fontWeight: '600' }]}>
                  {metric.target >= 1000000 ? `$${(metric.target / 1000000).toFixed(1)}M` : metric.target >= 1000 ? `$${(metric.target / 1000).toFixed(0)}K` : `$${metric.target}`}
                </Text>
              </View>
              <View style={[
                styles.biMetricTrend, 
                { 
                  backgroundColor: metric.trend === 'up' ? '#10B981' + '20' : metric.trend === 'down' ? '#EF4444' + '20' : '#6B7280' + '20',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8,
                }
              ]}>
                {metric.trend === 'up' && <TrendingUp size={16} color="#10B981" />}
                {metric.trend === 'down' && <TrendingDown size={16} color="#EF4444" />}
                {metric.trend === 'stable' && <Activity size={16} color="#6B7280" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Predictive Analytics Center - Premium */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <LineChart size={24} color="#F59E0B" />
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Predictive Analytics Center</Text>
            <View style={[styles.sectionBadge, { backgroundColor: '#F59E0B' + '20', borderWidth: 1, borderColor: '#F59E0B' + '40' }]}>
              <Text style={[styles.sectionBadgeText, { color: '#F59E0B' }]}>{forecasts.length} Models</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.sectionAction}>
            <Text style={styles.sectionActionText}>Forecasting</Text>
            <ChevronRight size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.forecastsScroll}>
          {forecasts.map((forecast) => (
            <View key={forecast.id} style={[
              styles.forecastCard, 
              { 
                backgroundColor: theme.colors.card, 
                borderColor: '#F59E0B' + '30',
                borderWidth: 2,
                borderRadius: 16,
                shadowColor: '#F59E0B',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 6,
              }
            ]}>
              <View style={styles.forecastHeader}>
                <View style={[styles.forecastIcon, { backgroundColor: '#F59E0B' + '20', borderWidth: 1, borderColor: '#F59E0B' + '30' }]}>
                  <LineChart size={20} color="#F59E0B" />
                </View>
                <Text style={[styles.forecastName, { color: theme.colors.text, fontWeight: '700' }]}>{forecast.name}</Text>
                <View style={[
                  styles.forecastConfidence, 
                  { 
                    backgroundColor: forecast.confidence >= 90 ? '#10B981' + '20' : forecast.confidence >= 70 ? '#F59E0B' + '20' : '#EF4444' + '20',
                    borderWidth: 1,
                    borderColor: forecast.confidence >= 90 ? '#10B981' + '30' : forecast.confidence >= 70 ? '#F59E0B' + '30' : '#EF4444' + '30',
                  }
                ]}>
                  <Text style={[
                    styles.forecastConfidenceText, 
                    { 
                      color: forecast.confidence >= 90 ? '#10B981' : forecast.confidence >= 70 ? '#F59E0B' : '#EF4444',
                      fontWeight: '700',
                    }
                  ]}>{forecast.confidence}%</Text>
                </View>
              </View>
              
              <View style={styles.forecastValues}>
                <View style={styles.forecastValue}>
                  <Text style={[styles.forecastLabel, { color: theme.colors.textSecondary }]}>Current</Text>
                  <Text style={[styles.forecastNumber, { color: theme.colors.text, fontWeight: '700' }]}>
                    {forecast.currentValue >= 1000000 ? `$${(forecast.currentValue / 1000000).toFixed(0)}M` : forecast.currentValue >= 1000 ? `$${(forecast.currentValue / 1000).toFixed(0)}K` : `$${forecast.currentValue}`}
                  </Text>
                </View>
                <View style={styles.forecastValue}>
                  <Text style={[styles.forecastLabel, { color: theme.colors.textSecondary }]}>Predicted</Text>
                  <Text style={[styles.forecastNumber, { color: '#F59E0B', fontWeight: '800' }]}>
                    {forecast.predictedValue >= 1000000 ? `$${(forecast.predictedValue / 1000000).toFixed(0)}M` : forecast.predictedValue >= 1000 ? `$${(forecast.predictedValue / 1000).toFixed(0)}K` : `$${forecast.predictedValue}`}
                  </Text>
                </View>
              </View>
              
              <View style={[styles.forecastScenarios, { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 12 }]}>
                <View style={styles.scenario}>
                  <Text style={[styles.scenarioLabel, { color: '#10B981' }]}>Best Case</Text>
                  <Text style={[styles.scenarioValue, { color: '#10B981', fontWeight: '700' }]}>
                    {forecast.scenarios.best >= 1000000 ? `$${(forecast.scenarios.best / 1000000).toFixed(0)}M` : forecast.scenarios.best >= 1000 ? `$${(forecast.scenarios.best / 1000).toFixed(0)}K` : `$${forecast.scenarios.best}`}
                  </Text>
                </View>
                <View style={styles.scenario}>
                  <Text style={[styles.scenarioLabel, { color: '#F59E0B' }]}>Expected</Text>
                  <Text style={[styles.scenarioValue, { color: '#F59E0B', fontWeight: '700' }]}>
                    {forecast.scenarios.expected >= 1000000 ? `$${(forecast.scenarios.expected / 1000000).toFixed(0)}M` : forecast.scenarios.expected >= 1000 ? `$${(forecast.scenarios.expected / 1000).toFixed(0)}K` : `$${forecast.scenarios.expected}`}
                  </Text>
                </View>
                <View style={styles.scenario}>
                  <Text style={[styles.scenarioLabel, { color: '#EF4444' }]}>Worst Case</Text>
                  <Text style={[styles.scenarioValue, { color: '#EF4444', fontWeight: '700' }]}>
                    {forecast.scenarios.worst >= 1000000 ? `$${(forecast.scenarios.worst / 1000000).toFixed(0)}M` : forecast.scenarios.worst >= 1000 ? `$${(forecast.scenarios.worst / 1000).toFixed(0)}K` : `$${forecast.scenarios.worst}`}
                  </Text>
                </View>
              </View>
              
              <Text style={[styles.forecastPeriod, { color: theme.colors.textSecondary, fontSize: 11 }]}>Period: {forecast.period}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Anomaly Detection Command Center - Premium */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <AlertTriangle size={24} color="#EF4444" />
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Anomaly Detection Command Center</Text>
            <View style={[styles.sectionBadge, { backgroundColor: '#EF4444' + '20', borderWidth: 1, borderColor: '#EF4444' + '40' }]}>
              <Text style={[styles.sectionBadgeText, { color: '#EF4444' }]}>{anomalies.length} Active</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.sectionAction}>
            <Text style={styles.sectionActionText}>Alerts</Text>
            <ChevronRight size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.anomaliesScroll}>
          {anomalies.map((anomaly) => (
            <View key={anomaly.id} style={[
              styles.anomalyCard, 
              { 
                backgroundColor: theme.colors.card, 
                borderColor: anomaly.severity === 'critical' ? '#EF4444' + '50' : anomaly.severity === 'high' ? '#F59E0B' + '50' : '#6B7280' + '50',
                borderWidth: 2,
                borderRadius: 16,
                shadowColor: anomaly.severity === 'critical' ? '#EF4444' : anomaly.severity === 'high' ? '#F59E0B' : '#6B7280',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4,
                shadowRadius: 16,
                elevation: 8,
              }
            ]}>
              <View style={styles.anomalyHeader}>
                <View style={[
                  styles.anomalySeverity, 
                  { 
                    backgroundColor: anomaly.severity === 'critical' ? '#EF4444' : anomaly.severity === 'high' ? '#F59E0B' : '#6B7280',
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 8,
                  }
                ]}>
                  <AlertTriangle size={14} color="#FFFFFF" />
                  <Text style={[styles.anomalySeverityText, { color: '#FFFFFF', fontSize: 11, fontWeight: '700', marginLeft: 4 }]}>{anomaly.severity.toUpperCase()}</Text>
                </View>
                <View style={[
                  styles.anomalyStatus, 
                  { 
                    backgroundColor: anomaly.status === 'active' ? '#EF4444' + '20' : anomaly.status === 'investigating' ? '#F59E0B' + '20' : '#10B981' + '20',
                    borderWidth: 1,
                    borderColor: anomaly.status === 'active' ? '#EF4444' + '30' : anomaly.status === 'investigating' ? '#F59E0B' + '30' : '#10B981' + '30',
                  }
                ]}>
                  <Text style={[
                    styles.anomalyStatusText, 
                    { 
                      color: anomaly.status === 'active' ? '#EF4444' : anomaly.status === 'investigating' ? '#F59E0B' : '#10B981',
                      fontSize: 10,
                      fontWeight: '700',
                    }
                  ]}>{anomaly.status.toUpperCase()}</Text>
                </View>
              </View>
              
              <Text style={[styles.anomalyType, { color: theme.colors.text, fontSize: 14, fontWeight: '700', marginTop: 8 }]}>{anomaly.type}</Text>
              <Text style={[styles.anomalyDescription, { color: theme.colors.textSecondary, fontSize: 13, lineHeight: 18, marginTop: 4 }]}>{anomaly.description}</Text>
              
              <View style={[styles.anomalyFooter, { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 12, marginTop: 12 }]}>
                <View style={styles.anomalyImpact}>
                  <DollarSign size={12} color="#EF4444" />
                  <Text style={[styles.anomalyImpactText, { color: theme.colors.textSecondary, fontSize: 11, marginLeft: 4 }]}>{anomaly.impact}</Text>
                </View>
                <View style={styles.anomalyTime}>
                  <Clock size={12} color="#6B7280" />
                  <Text style={[styles.anomalyTimeText, { color: theme.colors.textSecondary, fontSize: 11, marginLeft: 4 }]}>{anomaly.detectedAt}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* KPI Intelligence Dashboard - Premium */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Target size={24} color="#3B82F6" />
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>KPI Intelligence Dashboard</Text>
            <View style={[styles.sectionBadge, { backgroundColor: '#3B82F6' + '20', borderWidth: 1, borderColor: '#3B82F6' + '40' }]}>
              <Text style={[styles.sectionBadgeText, { color: '#3B82F6' }]}>{kpis.length} KPIs</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.sectionAction}>
            <Text style={styles.sectionActionText}>Performance</Text>
            <ChevronRight size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <View style={[
          styles.kpiDashboard, 
          { 
            backgroundColor: theme.colors.card, 
            borderColor: '#3B82F6' + '20',
            borderWidth: 2,
            borderRadius: 16,
            shadowColor: '#3B82F6',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 6,
          }
        ]}>
          {kpis.map((kpi, index) => (
            <View key={kpi.id} style={[
              styles.kpiItem, 
              { 
                borderBottomWidth: index < kpis.length - 1 ? 1 : 0,
                borderBottomColor: 'rgba(255,255,255,0.1)',
                backgroundColor: index % 2 === 0 ? 'rgba(59, 130, 246, 0.03)' : 'transparent',
              }
            ]}>
              <View style={styles.kpiItemHeader}>
                <Text style={[styles.kpiItemName, { color: theme.colors.text, fontSize: 15, fontWeight: '700' }]}>{kpi.name}</Text>
                <View style={[styles.kpiItemCategory, { backgroundColor: '#3B82F6' + '20', borderWidth: 1, borderColor: '#3B82F6' + '30' }]}>
                  <Text style={[styles.kpiItemCategoryText, { color: '#3B82F6', fontSize: 10, fontWeight: '700' }]}>{kpi.category}</Text>
                </View>
              </View>
              <View style={styles.kpiItemProgress}>
                <View style={[styles.kpiItemProgressBar, { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 6 }]}>
                  <View style={[
                    styles.kpiItemProgressFill, 
                    { 
                      backgroundColor: kpi.progress >= 100 ? '#10B981' : kpi.progress >= 80 ? '#3B82F6' : '#F59E0B', 
                      width: `${Math.min(kpi.progress, 100)}%`,
                      borderRadius: 6,
                      shadowColor: kpi.progress >= 100 ? '#10B981' : kpi.progress >= 80 ? '#3B82F6' : '#F59E0B',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.5,
                      shadowRadius: 8,
                    }
                  ]} />
                </View>
                <Text style={[styles.kpiItemProgressText, { color: theme.colors.text, fontWeight: '700', fontSize: 14 }]}>{kpi.progress}%</Text>
              </View>
              <View style={styles.kpiItemDetails}>
                <Text style={[styles.kpiItemValue, { color: theme.colors.text, fontSize: 18, fontWeight: '800' }]}>{kpi.value}%</Text>
                <Text style={[styles.kpiItemTarget, { color: theme.colors.textSecondary, fontSize: 12 }]}>Target: {kpi.target}%</Text>
              </View>
              <View style={styles.kpiItemFooter}>
                <Text style={[styles.kpiItemOwner, { color: theme.colors.textSecondary, fontSize: 11 }]}>Owner: {kpi.owner}</Text>
                <View style={[
                  styles.kpiItemTrend,
                  { 
                    backgroundColor: kpi.trend === 'up' ? '#10B981' + '20' : kpi.trend === 'down' ? '#EF4444' + '20' : '#6B7280' + '20',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                  }
                ]}>
                  {kpi.trend === 'up' && <TrendingUp size={14} color="#10B981" />}
                  {kpi.trend === 'down' && <TrendingDown size={14} color="#EF4444" />}
                  {kpi.trend === 'stable' && <Activity size={14} color="#6B7280" />}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Data Quality & Governance - Premium */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Shield size={24} color="#8B5CF6" />
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Data Quality & Governance</Text>
            <View style={[styles.sectionBadge, { backgroundColor: '#8B5CF6' + '20', borderWidth: 1, borderColor: '#8B5CF6' + '40' }]}>
              <Text style={[styles.sectionBadgeText, { color: '#8B5CF6' }]}>{dataQualityMetrics.length} Metrics</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.sectionAction}>
            <Text style={styles.sectionActionText}>Governance</Text>
            <ChevronRight size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <View style={[
          styles.qualityCard, 
          { 
            backgroundColor: theme.colors.card, 
            borderColor: '#8B5CF6' + '20',
            borderWidth: 2,
            borderRadius: 16,
            shadowColor: '#8B5CF6',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 6,
          }
        ]}>
          {dataQualityMetrics.map((metric, index) => (
            <View key={metric.id} style={[
              styles.qualityMetric, 
              { 
                borderBottomWidth: index < dataQualityMetrics.length - 1 ? 1 : 0,
                borderBottomColor: 'rgba(255,255,255,0.1)',
                backgroundColor: index % 2 === 0 ? 'rgba(139, 92, 246, 0.03)' : 'transparent',
              }
            ]}>
              <View style={[styles.qualityDimension, { backgroundColor: '#8B5CF6' + '20', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }]}>
                <Text style={[styles.qualityDimensionText, { color: '#8B5CF6', fontSize: 12, fontWeight: '700' }]}>{metric.dimension}</Text>
              </View>
              <Text style={[
                styles.qualityScore, 
                { 
                  color: metric.score > 95 ? '#10B981' : metric.score > 90 ? '#3B82F6' : '#F59E0B',
                  fontSize: 20,
                  fontWeight: '800',
                }
              ]}>{metric.score}%</Text>
              <View style={styles.qualityIssues}>
                <AlertTriangle size={12} color={metric.issues > 0 ? '#EF4444' : '#10B981'} />
                <Text style={[styles.qualityIssuesText, { color: theme.colors.textSecondary, fontSize: 12, marginLeft: 4 }]}>Issues: {metric.issues}</Text>
              </View>
              <Text style={[styles.qualityAssessment, { color: theme.colors.textSecondary, fontSize: 11 }]}>Last: {metric.lastAssessment}</Text>
              <View style={[
                styles.qualityTrend,
                { 
                  backgroundColor: metric.trend === 'up' ? '#10B981' + '20' : metric.trend === 'down' ? '#EF4444' + '20' : '#6B7280' + '20',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8,
                }
              ]}>
                {metric.trend === 'up' && <TrendingUp size={14} color="#10B981" />}
                {metric.trend === 'down' && <TrendingDown size={14} color="#EF4444" />}
                {metric.trend === 'stable' && <Activity size={14} color="#6B7280" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Decision Intelligence Center - Premium */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Brain size={24} color="#EC4899" />
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Decision Intelligence Center</Text>
            <View style={[styles.sectionBadge, { backgroundColor: '#EC4899' + '20', borderWidth: 1, borderColor: '#EC4899' + '40' }]}>
              <Text style={[styles.sectionBadgeText, { color: '#EC4899' }]}>{strategicRecommendations.length} Recommendations</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.sectionAction}>
            <Text style={styles.sectionActionText}>Decisions</Text>
            <ChevronRight size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <View style={styles.decisionGrid}>
          {strategicRecommendations.map((rec) => (
            <View key={rec.id} style={[
              styles.decisionCard, 
              { 
                backgroundColor: theme.colors.card, 
                borderColor: rec.type === 'opportunity' ? '#10B981' + '40' : rec.type === 'risk' ? '#EF4444' + '40' : '#8B5CF6' + '40',
                borderWidth: 2,
                borderRadius: 16,
                shadowColor: rec.type === 'opportunity' ? '#10B981' : rec.type === 'risk' ? '#EF4444' : '#8B5CF6',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 6,
              }
            ]}>
              <View style={styles.decisionHeader}>
                <View style={[
                  styles.decisionIcon, 
                  { 
                    backgroundColor: rec.type === 'opportunity' ? '#10B981' + '20' : rec.type === 'risk' ? '#EF4444' + '20' : '#8B5CF6' + '20',
                    borderWidth: 1,
                    borderColor: rec.type === 'opportunity' ? '#10B981' + '30' : rec.type === 'risk' ? '#EF4444' + '30' : '#8B5CF6' + '30',
                  }
                ]}>
                  {rec.type === 'opportunity' && <Target size={20} color="#10B981" />}
                  {rec.type === 'risk' && <AlertTriangle size={20} color="#EF4444" />}
                  {rec.type === 'optimization' && <Sparkles size={20} color="#8B5CF6" />}
                </View>
                <Text style={[styles.decisionTitle, { color: theme.colors.text, fontWeight: '700', fontSize: 14 }]}>{rec.title}</Text>
                <View style={[
                  styles.decisionPriority, 
                  { 
                    backgroundColor: rec.priority === 1 ? '#EF4444' + '20' : rec.priority === 2 ? '#F59E0B' + '20' : '#6B7280' + '20',
                    borderWidth: 1,
                    borderColor: rec.priority === 1 ? '#EF4444' + '30' : rec.priority === 2 ? '#F59E0B' + '30' : '#6B7280' + '30',
                  }
                ]}>
                  <Text style={[styles.decisionPriorityText, { color: rec.priority === 1 ? '#EF4444' : rec.priority === 2 ? '#F59E0B' : '#6B7280', fontWeight: '700', fontSize: 11 }]}>P{rec.priority}</Text>
                </View>
              </View>
              <Text style={[styles.decisionDescription, { color: theme.colors.textSecondary, fontSize: 12, lineHeight: 16 }]}>{rec.description}</Text>
              <View style={styles.decisionMeta}>
                <View style={[styles.decisionConfidence, { backgroundColor: '#8B5CF6' + '20', borderWidth: 1, borderColor: '#8B5CF6' + '30' }]}>
                  <Text style={[styles.decisionConfidenceText, { color: '#8B5CF6', fontWeight: '700', fontSize: 11 }]}>Confidence: {rec.confidence}%</Text>
                </View>
                <View style={[
                  styles.decisionImpact, 
                  { 
                    backgroundColor: rec.impact === 'high' ? '#EF4444' + '20' : rec.impact === 'medium' ? '#F59E0B' + '20' : '#6B7280' + '20',
                    borderWidth: 1,
                    borderColor: rec.impact === 'high' ? '#EF4444' + '30' : rec.impact === 'medium' ? '#F59E0B' + '30' : '#6B7280' + '30',
                  }
                ]}>
                  <Text style={[styles.decisionImpactText, { color: rec.impact === 'high' ? '#EF4444' : rec.impact === 'medium' ? '#F59E0B' : '#6B7280', fontWeight: '700', fontSize: 11 }]}>{rec.impact}</Text>
                </View>
              </View>
              <View style={[styles.decisionActions, { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 8 }]}>
                <Text style={[styles.decisionActionsLabel, { color: theme.colors.textSecondary, fontSize: 11, fontWeight: '600' }]}>Actions:</Text>
                {rec.actionItems.slice(0, 2).map((action, index) => (
                  <Text key={index} style={[styles.decisionActionItem, { color: theme.colors.textSecondary, fontSize: 11 }]}>• {action}</Text>
                ))}
                {rec.actionItems.length > 2 && (
                  <Text style={[styles.decisionActionMore, { color: theme.colors.textSecondary, fontSize: 11 }]}>+{rec.actionItems.length - 2} more</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Market & External Intelligence */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Market & External Intelligence</Text>
        <View style={[styles.marketCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          {marketSignals.map((signal) => (
            <View key={signal.id} style={styles.marketSignal}>
              <View style={[styles.marketSentiment, { backgroundColor: signal.sentiment === 'positive' ? '#10B981' + '20' : signal.sentiment === 'negative' ? '#EF4444' + '20' : '#6B7280' + '20' }]}>
                {signal.sentiment === 'positive' && <TrendingUp size={16} color="#10B981" />}
                {signal.sentiment === 'negative' && <TrendingDown size={16} color="#EF4444" />}
                {signal.sentiment === 'neutral' && <Activity size={16} color="#6B7280" />}
              </View>
              <View style={styles.marketContent}>
                <Text style={[styles.marketTitle, { color: theme.colors.text }]}>{signal.title}</Text>
                <Text style={[styles.marketDescription, { color: theme.colors.textSecondary }]}>{signal.description}</Text>
                <View style={styles.marketMeta}>
                  <Text style={[styles.marketSource, { color: theme.colors.textSecondary }]}>{signal.source}</Text>
                  <Text style={[styles.marketType, { color: theme.colors.textSecondary }]}>{signal.type}</Text>
                  <Text style={[styles.marketTime, { color: theme.colors.textSecondary }]}>{signal.timestamp}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* AI Insights Engine */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Insights Engine</Text>
        <View style={styles.insightsGrid}>
          {aiInsights.map(renderInsightCard)}
        </View>
      </View>

      {/* Real-Time Intelligence Feed */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Real-Time Intelligence Feed</Text>
        <View style={[styles.feedCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          {intelligenceActivity.map(renderActivityItem)}
        </View>
      </View>

      {/* Data Platform Health */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Data Platform Health</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.platformScroll}>
          {platformComponents.map(renderPlatformCard)}
        </ScrollView>
      </View>

      {/* === PREMIUM SECTIONS === */}

      {/* Executive Intelligence Layer */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Crown size={24} color="#F59E0B" />
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Executive Intelligence Layer</Text>
          </View>
        </View>

        {/* Chief Data Officer Scorecard */}
        <View style={[styles.premiumCard, { backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.2)', borderWidth: 2, borderRadius: 16, padding: 20, marginBottom: 16 }]}>
          <View style={styles.premiumCardHeader}>
            <Text style={[styles.premiumCardTitle, { color: '#F59E0B', fontSize: 18, fontWeight: '700' }]}>Chief Data Officer Scorecard</Text>
            <View style={[styles.premiumBadge, { backgroundColor: '#F59E0B' + '20' }]}>
              <Text style={[styles.premiumBadgeText, { color: '#F59E0B' }]}>EXECUTIVE</Text>
            </View>
          </View>
          <View style={styles.premiumMetricsGrid}>
            <View style={styles.premiumMetric}>
              <Text style={[styles.premiumMetricLabel, { color: 'rgba(255,255,255,0.6)' }]}>Data Strategy</Text>
              <Text style={[styles.premiumMetricValue, { color: '#10B981', fontSize: 32, fontWeight: '800' }]}>94%</Text>
              <Text style={[styles.premiumMetricTrend, { color: '#10B981' }]}>+4.2% vs target</Text>
            </View>
            <View style={styles.premiumMetric}>
              <Text style={[styles.premiumMetricLabel, { color: 'rgba(255,255,255,0.6)' }]}>Governance</Text>
              <Text style={[styles.premiumMetricValue, { color: '#06B6D4', fontSize: 32, fontWeight: '800' }]}>91%</Text>
              <Text style={[styles.premiumMetricTrend, { color: '#06B6D4' }]}>On track</Text>
            </View>
            <View style={styles.premiumMetric}>
              <Text style={[styles.premiumMetricLabel, { color: 'rgba(255,255,255,0.6)' }]}>Innovation</Text>
              <Text style={[styles.premiumMetricValue, { color: '#8B5CF6', fontSize: 32, fontWeight: '800' }]}>87%</Text>
              <Text style={[styles.premiumMetricTrend, { color: '#8B5CF6' }]}>Accelerating</Text>
            </View>
          </View>
        </View>

        {/* Enterprise Intelligence Index */}
        <View style={[styles.premiumCard, { backgroundColor: 'rgba(139, 92, 246, 0.05)', borderColor: 'rgba(139, 92, 246, 0.2)', borderWidth: 2, borderRadius: 16, padding: 20, marginBottom: 16 }]}>
          <View style={styles.premiumCardHeader}>
            <Text style={[styles.premiumCardTitle, { color: '#8B5CF6', fontSize: 18, fontWeight: '700' }]}>Enterprise Intelligence Index</Text>
            <View style={[styles.premiumBadge, { backgroundColor: '#8B5CF6' + '20' }]}>
              <Text style={[styles.premiumBadgeText, { color: '#8B5CF6' }]}>REAL-TIME</Text>
            </View>
          </View>
          <View style={styles.intelligenceIndexContainer}>
            <View style={styles.intelligenceIndexMain}>
              <Text style={[styles.intelligenceIndexValue, { color: '#8B5CF6', fontSize: 56, fontWeight: '800' }]}>92.4</Text>
              <Text style={[styles.intelligenceIndexLabel, { color: 'rgba(255,255,255,0.6)' }]}>Overall Intelligence Score</Text>
            </View>
            <View style={styles.intelligenceIndexBreakdown}>
              <View style={styles.intelligenceIndexItem}>
                <View style={[styles.intelligenceIndexDot, { backgroundColor: '#10B981' }]} />
                <Text style={[styles.intelligenceIndexItemLabel, { color: 'rgba(255,255,255,0.8)' }]}>Data Quality</Text>
                <Text style={[styles.intelligenceIndexItemValue, { color: '#10B981' }]}>96%</Text>
              </View>
              <View style={styles.intelligenceIndexItem}>
                <View style={[styles.intelligenceIndexDot, { backgroundColor: '#06B6D4' }]} />
                <Text style={[styles.intelligenceIndexItemLabel, { color: 'rgba(255,255,255,0.8)' }]}>Analytics</Text>
                <Text style={[styles.intelligenceIndexItemValue, { color: '#06B6D4' }]}>91%</Text>
              </View>
              <View style={styles.intelligenceIndexItem}>
                <View style={[styles.intelligenceIndexDot, { backgroundColor: '#8B5CF6' }]} />
                <Text style={[styles.intelligenceIndexItemLabel, { color: 'rgba(255,255,255,0.8)' }]}>AI Performance</Text>
                <Text style={[styles.intelligenceIndexItemValue, { color: '#8B5CF6' }]}>89%</Text>
              </View>
              <View style={styles.intelligenceIndexItem}>
                <View style={[styles.intelligenceIndexDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={[styles.intelligenceIndexItemLabel, { color: 'rgba(255,255,255,0.8)' }]}>Strategic Impact</Text>
                <Text style={[styles.intelligenceIndexItemValue, { color: '#F59E0B' }]}>87%</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Data Operations Layer */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Server size={24} color="#06B6D4" />
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Data Operations Layer</Text>
          </View>
        </View>

        {/* Real-Time Data Pipeline Monitor */}
        <View style={[styles.premiumCard, { backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)', borderWidth: 2, borderRadius: 16, padding: 20, marginBottom: 16 }]}>
          <View style={styles.premiumCardHeader}>
            <Text style={[styles.premiumCardTitle, { color: '#06B6D4', fontSize: 18, fontWeight: '700' }]}>Real-Time Data Pipeline Monitor</Text>
            <View style={[styles.premiumBadge, { backgroundColor: '#10B981' + '20' }]}>
              <Text style={[styles.premiumBadgeText, { color: '#10B981' }]}>ALL SYSTEMS GO</Text>
            </View>
          </View>
          <View style={styles.pipelineGrid}>
            {[
              { name: 'Ingestion', status: 'healthy', throughput: '1.2M/sec', latency: '12ms' },
              { name: 'Processing', status: 'healthy', throughput: '840K/sec', latency: '45ms' },
              { name: 'Transformation', status: 'healthy', throughput: '620K/sec', latency: '28ms' },
              { name: 'Loading', status: 'degraded', throughput: '480K/sec', latency: '120ms' },
              { name: 'Quality Check', status: 'healthy', throughput: '580K/sec', latency: '35ms' },
              { name: 'Distribution', status: 'healthy', throughput: '720K/sec', latency: '18ms' },
            ].map((pipeline, index) => (
              <View key={index} style={[styles.pipelineCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: pipeline.status === 'healthy' ? '#10B981' + '30' : '#F59E0B' + '30', borderWidth: 1, borderRadius: 12, padding: 16 }]}>
                <View style={styles.pipelineHeader}>
                  <Text style={[styles.pipelineName, { color: '#FFFFFF', fontWeight: '600' }]}>{pipeline.name}</Text>
                  <View style={[styles.pipelineStatus, { backgroundColor: pipeline.status === 'healthy' ? '#10B981' + '20' : '#F59E0B' + '20' }]}>
                    <View style={[styles.pipelineStatusDot, { backgroundColor: pipeline.status === 'healthy' ? '#10B981' : '#F59E0B' }]} />
                    <Text style={[styles.pipelineStatusText, { color: pipeline.status === 'healthy' ? '#10B981' : '#F59E0B', fontSize: 10, fontWeight: '700' }]}>{pipeline.status.toUpperCase()}</Text>
                  </View>
                </View>
                <View style={styles.pipelineMetrics}>
                  <View style={styles.pipelineMetric}>
                    <Text style={[styles.pipelineMetricLabel, { color: 'rgba(255,255,255,0.5)', fontSize: 10 }]}>Throughput</Text>
                    <Text style={[styles.pipelineMetricValue, { color: '#FFFFFF', fontWeight: '700' }]}>{pipeline.throughput}</Text>
                  </View>
                  <View style={styles.pipelineMetric}>
                    <Text style={[styles.pipelineMetricLabel, { color: 'rgba(255,255,255,0.5)', fontSize: 10 }]}>Latency</Text>
                    <Text style={[styles.pipelineMetricValue, { color: '#FFFFFF', fontWeight: '700' }]}>{pipeline.latency}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Intelligence Layer */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Sparkles size={24} color="#EC4899" />
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Intelligence Layer</Text>
          </View>
        </View>

        {/* Predictive Forecasting Hub */}
        <View style={[styles.premiumCard, { backgroundColor: 'rgba(236, 72, 153, 0.05)', borderColor: 'rgba(236, 72, 153, 0.2)', borderWidth: 2, borderRadius: 16, padding: 20, marginBottom: 16 }]}>
          <View style={styles.premiumCardHeader}>
            <Text style={[styles.premiumCardTitle, { color: '#EC4899', fontSize: 18, fontWeight: '700' }]}>Predictive Forecasting Hub</Text>
            <View style={[styles.premiumBadge, { backgroundColor: '#EC4899' + '20' }]}>
              <Text style={[styles.premiumBadgeText, { color: '#EC4899' }]}>AI-POWERED</Text>
            </View>
          </View>
          <View style={styles.forecastHubGrid}>
            {[
              { metric: 'Revenue Forecast', current: '$12.8M', predicted: '$14.2M', confidence: 92, trend: 'up' },
              { metric: 'Demand Forecast', current: '84K units', predicted: '92K units', confidence: 88, trend: 'up' },
              { metric: 'Churn Prediction', current: '2.4%', predicted: '1.8%', confidence: 85, trend: 'down' },
              { metric: 'Growth Forecast', current: '18%', predicted: '24%', confidence: 90, trend: 'up' },
            ].map((forecast, index) => (
              <View key={index} style={[styles.forecastHubCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 16 }]}>
                <Text style={[styles.forecastHubMetric, { color: 'rgba(255,255,255,0.7)', fontSize: 12 }]}>{forecast.metric}</Text>
                <View style={styles.forecastHubValues}>
                  <Text style={[styles.forecastHubCurrent, { color: 'rgba(255,255,255,0.5)', fontSize: 14 }]}>{forecast.current}</Text>
                  <ArrowRight size={16} color="#EC4899" />
                  <Text style={[styles.forecastHubPredicted, { color: '#EC4899', fontSize: 16, fontWeight: '700' }]}>{forecast.predicted}</Text>
                </View>
                <View style={styles.forecastHubFooter}>
                  <View style={[styles.forecastHubConfidence, { backgroundColor: '#EC4899' + '20' }]}>
                    <Text style={[styles.forecastHubConfidenceText, { color: '#EC4899', fontSize: 10, fontWeight: '700' }]}>{forecast.confidence}% confidence</Text>
                  </View>
                  {forecast.trend === 'up' ? <TrendingUp size={14} color="#10B981" /> : <TrendingDown size={14} color="#10B981" />}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Decision Intelligence Engine */}
        <View style={[styles.premiumCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 2, borderRadius: 16, padding: 20 }]}>
          <View style={styles.premiumCardHeader}>
            <Text style={[styles.premiumCardTitle, { color: '#10B981', fontSize: 18, fontWeight: '700' }]}>Decision Intelligence Engine</Text>
            <View style={[styles.premiumBadge, { backgroundColor: '#10B981' + '20' }]}>
              <Text style={[styles.premiumBadgeText, { color: '#10B981' }]}>ACTIVE</Text>
            </View>
          </View>
          <View style={styles.decisionEngineGrid}>
            {strategicRecommendations.slice(0, 4).map((rec) => (
              <View key={rec.id} style={[styles.decisionEngineCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: rec.type === 'opportunity' ? '#10B981' + '30' : rec.type === 'risk' ? '#EF4444' + '30' : '#8B5CF6' + '30', borderWidth: 1, borderRadius: 12, padding: 16 }]}>
                <View style={styles.decisionEngineHeader}>
                  {rec.type === 'opportunity' && <Target size={16} color="#10B981" />}
                  {rec.type === 'risk' && <AlertTriangle size={16} color="#EF4444" />}
                  {rec.type === 'optimization' && <Sparkles size={16} color="#8B5CF6" />}
                  <Text style={[styles.decisionEngineTitle, { color: '#FFFFFF', fontWeight: '600', fontSize: 13, marginLeft: 8 }]}>{rec.title}</Text>
                </View>
                <Text style={[styles.decisionEngineDescription, { color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 8 }]}>{rec.description}</Text>
                <View style={styles.decisionEngineFooter}>
                  <Text style={[styles.decisionEngineConfidence, { color: '#8B5CF6', fontSize: 10 }]}>{rec.confidence}% confidence</Text>
                  <View style={[styles.decisionEnginePriority, { backgroundColor: rec.priority === 1 ? '#EF4444' + '20' : rec.priority === 2 ? '#F59E0B' + '20' : '#6B7280' + '20' }]}>
                    <Text style={[styles.decisionEnginePriorityText, { color: rec.priority === 1 ? '#EF4444' : rec.priority === 2 ? '#F59E0B' : '#6B7280', fontSize: 10, fontWeight: '700' }]}>P{rec.priority}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Visualization Layer */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <BarChart3 size={24} color="#3B82F6" />
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Visualization Layer</Text>
          </View>
        </View>

        {/* Enterprise KPI Universe */}
        <View style={[styles.premiumCard, { backgroundColor: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)', borderWidth: 2, borderRadius: 16, padding: 20 }]}>
          <View style={styles.premiumCardHeader}>
            <Text style={[styles.premiumCardTitle, { color: '#3B82F6', fontSize: 18, fontWeight: '700' }]}>Enterprise KPI Universe</Text>
            <View style={[styles.premiumBadge, { backgroundColor: '#3B82F6' + '20' }]}>
              <Text style={[styles.premiumBadgeText, { color: '#3B82F6' }]}>INTERACTIVE</Text>
            </View>
          </View>
          <View style={styles.kpiUniverseGrid}>
            {kpis.slice(0, 6).map((kpi) => (
              <View key={kpi.id} style={[styles.kpiUniverseCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 16 }]}>
                <View style={styles.kpiUniverseHeader}>
                  <Text style={[styles.kpiUniverseName, { color: '#FFFFFF', fontWeight: '600', fontSize: 13 }]}>{kpi.name}</Text>
                  <View style={[styles.kpiUniverseCategory, { backgroundColor: '#3B82F6' + '20' }]}>
                    <Text style={[styles.kpiUniverseCategoryText, { color: '#3B82F6', fontSize: 9, fontWeight: '700' }]}>{kpi.category}</Text>
                  </View>
                </View>
                <View style={styles.kpiUniverseProgress}>
                  <View style={[styles.kpiUniverseProgressBar, { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, height: 6 }]}>
                    <View style={[styles.kpiUniverseProgressFill, { backgroundColor: kpi.progress >= 100 ? '#10B981' : kpi.progress >= 80 ? '#3B82F6' : '#F59E0B', width: `${Math.min(kpi.progress, 100)}%`, borderRadius: 4 }]} />
                  </View>
                  <Text style={[styles.kpiUniverseProgressText, { color: '#FFFFFF', fontWeight: '700', fontSize: 12 }]}>{kpi.progress}%</Text>
                </View>
                <View style={styles.kpiUniverseFooter}>
                  <Text style={[styles.kpiUniverseValue, { color: '#FFFFFF', fontSize: 16, fontWeight: '800' }]}>{kpi.value}%</Text>
                  <Text style={[styles.kpiUniverseTarget, { color: 'rgba(255,255,255,0.5)', fontSize: 10 }]}>Target: {kpi.target}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* AI Layer */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Bot size={24} color="#8B5CF6" />
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Layer</Text>
          </View>
        </View>

        {/* Autonomous Intelligence Agent Grid */}
        <View style={[styles.premiumCard, { backgroundColor: 'rgba(139, 92, 246, 0.05)', borderColor: 'rgba(139, 92, 246, 0.2)', borderWidth: 2, borderRadius: 16, padding: 20, marginBottom: 16 }]}>
          <View style={styles.premiumCardHeader}>
            <Text style={[styles.premiumCardTitle, { color: '#8B5CF6', fontSize: 18, fontWeight: '700' }]}>Autonomous Intelligence Agent Grid</Text>
            <View style={[styles.premiumBadge, { backgroundColor: '#8B5CF6' + '20' }]}>
              <Text style={[styles.premiumBadgeText, { color: '#8B5CF6' }]}>3 AGENTS ACTIVE</Text>
            </View>
          </View>
          <View style={styles.aiAgentGrid}>
            {intelligenceAgents.map((agent) => (
              <View key={agent.id} style={[styles.aiAgentGridCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: agent.status === 'online' ? '#10B981' + '30' : agent.status === 'busy' ? '#F59E0B' + '30' : '#6B7280' + '30', borderWidth: 2, borderRadius: 16, padding: 20 }]}>
                <View style={styles.aiAgentGridHeader}>
                  <View style={[styles.aiAgentGridAvatar, { backgroundColor: '#0B0F14', borderRadius: 12, width: 56, height: 56, justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={styles.aiAgentGridAvatarText}>{agent.avatar}</Text>
                    <View style={[styles.aiAgentGridStatus, { backgroundColor: agent.status === 'online' ? '#10B981' : agent.status === 'busy' ? '#F59E0B' : '#6B7280', position: 'absolute', bottom: -2, right: -2, width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: '#0B0F14' }]} />
                  </View>
                  <View style={styles.aiAgentGridInfo}>
                    <Text style={[styles.aiAgentGridName, { color: '#FFFFFF', fontWeight: '700', fontSize: 15 }]}>{agent.name}</Text>
                    <Text style={[styles.aiAgentGridRole, { color: 'rgba(255,255,255,0.6)', fontSize: 11 }]}>{agent.role}</Text>
                  </View>
                  <View style={[styles.aiAgentGridConfidence, { backgroundColor: '#8B5CF6' + '20', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }]}>
                    <Text style={[styles.aiAgentGridConfidenceText, { color: '#8B5CF6', fontWeight: '700', fontSize: 11 }]}>{agent.confidenceScore}%</Text>
                  </View>
                </View>
                <View style={styles.aiAgentGridMetrics}>
                  <View style={styles.aiAgentGridMetric}>
                    <Text style={[styles.aiAgentGridMetricLabel, { color: 'rgba(255,255,255,0.5)', fontSize: 10 }]}>Workload</Text>
                    <Text style={[styles.aiAgentGridMetricValue, { color: agent.workload === 'High' || agent.workload === 'Very High' ? '#EF4444' : agent.workload === 'Medium' ? '#F59E0B' : '#10B981', fontWeight: '700', fontSize: 13 }]}>{agent.workload}</Text>
                  </View>
                  <View style={styles.aiAgentGridMetric}>
                    <Text style={[styles.aiAgentGridMetricLabel, { color: 'rgba(255,255,255,0.5)', fontSize: 10 }]}>Impact</Text>
                    <Text style={[styles.aiAgentGridMetricValue, { color: agent.businessImpact === 'Critical' ? '#EF4444' : agent.businessImpact === 'High' ? '#F59E0B' : '#10B981', fontWeight: '700', fontSize: 13 }]}>{agent.businessImpact}</Text>
                  </View>
                  <View style={styles.aiAgentGridMetric}>
                    <Text style={[styles.aiAgentGridMetricLabel, { color: 'rgba(255,255,255,0.5)', fontSize: 10 }]}>Trend</Text>
                    {agent.performanceTrend === 'up' && <TrendingUp size={14} color="#10B981" />}
                    {agent.performanceTrend === 'down' && <TrendingDown size={14} color="#EF4444" />}
                    {agent.performanceTrend === 'stable' && <Activity size={14} color="#6B7280" />}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* AI Recommendation Engine */}
        <View style={[styles.premiumCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 2, borderRadius: 16, padding: 20 }]}>
          <View style={styles.premiumCardHeader}>
            <Text style={[styles.premiumCardTitle, { color: '#10B981', fontSize: 18, fontWeight: '700' }]}>AI Recommendation Engine</Text>
            <View style={[styles.premiumBadge, { backgroundColor: '#10B981' + '20' }]}>
              <Text style={[styles.premiumBadgeText, { color: '#10B981' }]}>5 NEW INSIGHTS</Text>
            </View>
          </View>
          <View style={styles.recommendationGrid}>
            {aiInsights.slice(0, 5).map((insight) => (
              <View key={insight.id} style={[styles.recommendationCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderLeftWidth: 4, borderLeftColor: insight.type === 'opportunity' ? '#10B981' : insight.type === 'risk' ? '#EF4444' : insight.type === 'warning' ? '#F59E0B' : '#3B82F6', borderRadius: 12, padding: 16 }]}>
                <View style={styles.recommendationHeader}>
                  {insight.type === 'opportunity' && <Target size={16} color="#10B981" />}
                  {insight.type === 'risk' && <AlertTriangle size={16} color="#EF4444" />}
                  {insight.type === 'warning' && <AlertTriangle size={16} color="#F59E0B" />}
                  {insight.type === 'recommendation' && <Sparkles size={16} color="#8B5CF6" />}
                  {insight.type === 'info' && <Info size={16} color="#3B82F6" />}
                  <Text style={[styles.recommendationTitle, { color: '#FFFFFF', fontWeight: '600', fontSize: 13, marginLeft: 8 }]}>{insight.title}</Text>
                </View>
                <Text style={[styles.recommendationDescription, { color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 8 }]}>{insight.description}</Text>
                <View style={styles.recommendationFooter}>
                  {insight.confidence && (
                    <View style={[styles.recommendationConfidence, { backgroundColor: '#8B5CF6' + '20' }]}>
                      <Text style={[styles.recommendationConfidenceText, { color: '#8B5CF6', fontSize: 10, fontWeight: '700' }]}>{insight.confidence}%</Text>
                    </View>
                  )}
                  {insight.actionable && (
                    <View style={[styles.recommendationActionable, { backgroundColor: '#10B981' + '20' }]}>
                      <Text style={[styles.recommendationActionableText, { color: '#10B981', fontSize: 10, fontWeight: '700' }]}>Actionable</Text>
                    </View>
                  )}
                </View>
              </View>
        ))}
           </View>
         </View>
       </View>

      <View style={styles.spacing} />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  kpiScroll: {
    flexDirection: 'row',
  },
  kpiCard: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  kpiInfo: {
    flex: 1,
  },
  kpiTitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  kpiFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kpiChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kpiChangeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  kpiSubtitle: {
    fontSize: 11,
  },
  agentsScroll: {
    flexDirection: 'row',
  },
  agentCard: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0B0F14',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  agentAvatarText: {
    fontSize: 24,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  agentDetail: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 11,
  },
  agentTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trendText: {
    fontSize: 11,
  },
  cdoCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  cdoStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cdoStat: {
    alignItems: 'center',
  },
  cdoStatValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cdoStatLabel: {
    fontSize: 12,
  },
  cdoSummary: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  cdoSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cdoSummaryText: {
    fontSize: 14,
    lineHeight: 20,
  },
  sourcesScroll: {
    flexDirection: 'row',
  },
  sourceCard: {
    width: 240,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  sourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sourceHealth: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  sourceName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  sourceType: {
    fontSize: 11,
    textTransform: 'capitalize',
  },
  sourceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sourceMetric: {
    alignItems: 'center',
  },
  sourceMetricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  sourceMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  sourceSync: {
    fontSize: 11,
  },
  biCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  biMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  biMetricCategory: {
    fontSize: 11,
    width: 60,
  },
  biMetricName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  biMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
  biMetricTarget: {
    fontSize: 12,
    width: 80,
  },
  forecastsScroll: {
    flexDirection: 'row',
  },
  forecastCard: {
    width: 260,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  forecastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  forecastName: {
    fontSize: 14,
    fontWeight: '600',
  },
  forecastConfidence: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  forecastConfidenceText: {
    fontSize: 11,
    fontWeight: '600',
  },
  forecastValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  forecastValue: {
    alignItems: 'center',
  },
  forecastLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  forecastNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  forecastScenarios: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  scenario: {
    alignItems: 'center',
  },
  scenarioLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  scenarioValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  forecastPeriod: {
    fontSize: 11,
    textAlign: 'center',
  },
  anomaliesScroll: {
    flexDirection: 'row',
  },
  anomalyCard: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
  },
  anomalyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  anomalyType: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  anomalyStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  anomalyStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  anomalyDescription: {
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  anomalyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  anomalyImpact: {
    fontSize: 11,
  },
  anomalyTime: {
    fontSize: 11,
  },
  kpiDashboard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  kpiItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  kpiItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiItemName: {
    fontSize: 14,
    fontWeight: '600',
  },
  kpiItemCategory: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  kpiItemCategoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  kpiItemProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiItemProgressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  kpiItemProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  kpiItemProgressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  kpiItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  kpiItemValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  kpiItemTarget: {
    fontSize: 12,
  },
  kpiItemOwner: {
    fontSize: 11,
  },
  qualityCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  qualityMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  qualityDimension: {
    fontSize: 14,
    fontWeight: '600',
    width: 80,
  },
  qualityScore: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
  },
  qualityIssues: {
    fontSize: 12,
    flex: 1,
  },
  qualityAssessment: {
    fontSize: 11,
    width: 80,
  },
  decisionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  decisionCard: {
    width: '48%',
    marginHorizontal: 6,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  decisionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  decisionTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  decisionPriority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  decisionPriorityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  decisionDescription: {
    fontSize: 12,
    marginBottom: 12,
    lineHeight: 16,
  },
  decisionMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  decisionConfidence: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  decisionConfidenceText: {
    fontSize: 10,
    fontWeight: '600',
  },
  decisionImpact: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  decisionImpactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  decisionActions: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 8,
  },
  decisionActionsLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  decisionActionItem: {
    fontSize: 11,
    marginBottom: 2,
  },
  decisionActionMore: {
    fontSize: 11,
  },
  marketCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  marketSignal: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  marketSentiment: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  marketContent: {
    flex: 1,
  },
  marketTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  marketDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  marketMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  marketSource: {
    fontSize: 11,
  },
  marketType: {
    fontSize: 11,
    textTransform: 'capitalize',
  },
  marketTime: {
    fontSize: 11,
  },
  insightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  insightCard: {
    width: '48%',
    marginHorizontal: 6,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  insightConfidence: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insightConfidenceText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightDescription: {
    fontSize: 12,
    marginBottom: 12,
    lineHeight: 16,
  },
  insightFooter: {
    flexDirection: 'row',
    gap: 8,
  },
  insightCategory: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insightCategoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightImpact: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightActionable: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insightActionableText: {
    fontSize: 10,
    fontWeight: '600',
  },
  feedCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 6,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 12,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 11,
  },
  platformScroll: {
    flexDirection: 'row',
  },
  platformCard: {
    width: 260,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
  },
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  platformName: {
    fontSize: 14,
    fontWeight: '600',
  },
  platformStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  platformStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  platformMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  platformMetric: {
    alignItems: 'center',
  },
  platformMetricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  platformMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  platformCheck: {
    fontSize: 11,
  },
  spacing: {
    height: 24,
  },
  // Premium Section Styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sectionBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  sectionAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sectionActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  premiumCard: {
    marginBottom: 16,
  },
  premiumCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumCardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  premiumBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  premiumMetricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  premiumMetric: {
    flex: 1,
    alignItems: 'center',
  },
  premiumMetricLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  premiumMetricValue: {
    marginBottom: 4,
  },
  premiumMetricTrend: {
    fontSize: 12,
    fontWeight: '600',
  },
  intelligenceIndexContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  intelligenceIndexMain: {
    flex: 1,
    alignItems: 'center',
  },
  intelligenceIndexValue: {
    marginBottom: 8,
  },
  intelligenceIndexLabel: {
    fontSize: 14,
  },
  intelligenceIndexBreakdown: {
    flex: 1,
    gap: 12,
  },
  intelligenceIndexItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  intelligenceIndexDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  intelligenceIndexItemLabel: {
    fontSize: 12,
    flex: 1,
    marginLeft: 8,
  },
  intelligenceIndexItemValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  pipelineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pipelineCard: {
    width: '48%',
  },
  pipelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pipelineName: {
    fontSize: 14,
  },
  pipelineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pipelineStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pipelineStatusText: {
    fontSize: 10,
  },
  pipelineMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  pipelineMetric: {
    flex: 1,
  },
  pipelineMetricLabel: {
    marginBottom: 4,
  },
  pipelineMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  forecastHubGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  forecastHubCard: {
    width: '48%',
  },
  forecastHubMetric: {
    marginBottom: 8,
  },
  forecastHubValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  forecastHubCurrent: {
    fontSize: 14,
  },
  forecastHubPredicted: {
    fontSize: 16,
  },
  forecastHubFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forecastHubConfidence: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  forecastHubConfidenceText: {
    fontSize: 10,
  },
  decisionEngineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  decisionEngineCard: {
    width: '48%',
  },
  decisionEngineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  decisionEngineTitle: {
    fontSize: 13,
  },
  decisionEngineDescription: {
    fontSize: 11,
    marginBottom: 12,
  },
  decisionEngineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  decisionEngineConfidence: {
    fontSize: 10,
  },
  decisionEnginePriority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  decisionEnginePriorityText: {
    fontSize: 10,
  },
  kpiUniverseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiUniverseCard: {
    width: '48%',
  },
  kpiUniverseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiUniverseName: {
    fontSize: 13,
  },
  kpiUniverseCategory: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  kpiUniverseCategoryText: {
    fontSize: 9,
  },
  kpiUniverseProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiUniverseProgressBar: {
    flex: 1,
    marginRight: 12,
  },
  kpiUniverseProgressFill: {
    height: '100%',
  },
  kpiUniverseProgressText: {
    fontSize: 12,
  },
  kpiUniverseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kpiUniverseValue: {
    fontSize: 16,
  },
  kpiUniverseTarget: {
    fontSize: 10,
  },
  aiAgentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  aiAgentGridCard: {
    width: '48%',
  },
  aiAgentGridHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiAgentGridAvatar: {
    marginRight: 12,
  },
  aiAgentGridAvatarText: {
    fontSize: 24,
  },
  aiAgentGridStatus: {
    position: 'absolute',
  },
  aiAgentGridInfo: {
    flex: 1,
  },
  aiAgentGridName: {
    fontSize: 15,
    marginBottom: 2,
  },
  aiAgentGridRole: {
    fontSize: 11,
  },
  aiAgentGridConfidence: {
    marginLeft: 8,
  },
  aiAgentGridConfidenceText: {
    fontSize: 11,
  },
  aiAgentGridMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aiAgentGridMetric: {
    alignItems: 'center',
  },
  aiAgentGridMetricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  aiAgentGridMetricValue: {
    fontSize: 13,
  },
  recommendationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  recommendationCard: {
    width: '48%',
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 13,
  },
  recommendationDescription: {
    fontSize: 11,
    marginBottom: 12,
  },
  recommendationFooter: {
    flexDirection: 'row',
    gap: 8,
  },
  recommendationConfidence: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recommendationConfidenceText: {
    fontSize: 10,
  },
  recommendationActionable: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recommendationActionableText: {
    fontSize: 10,
  },
});