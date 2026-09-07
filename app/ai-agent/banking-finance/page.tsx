import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import {
  LayoutDashboard,
  Bot,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Users,
  Zap,
  DollarSign,
  Shield,
  Brain,
  Settings,
  Search,
  Bell,
  Filter,
  MoreVertical,
  RefreshCw,
  Download,
  Share2,
  Eye,
  Plus,
  Minus,
  X,
  Save,
  Edit2,
  Trash2,
  Copy,
  LineChart,
  PieChart,
  Calendar,
  Clock,
  Globe,
  FileText,
  Briefcase,
  Lightbulb,
  Rocket,
  GitBranch,
  Flame,
  Heart,
  Award,
  Flag,
  Code,
  Layers,
  Network,
  Sparkles,
  Info,
  Beaker,
  Route,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  User,
  CreditCard,
  Database,
  Server,
  Cpu,
  Wifi,
  Globe2,
  MapPin,
  Building2,
  Store,
  Receipt,
  Landmark,
  Scale,
  Gavel,
  Lock,
  Fingerprint,
  Percent,
  Gauge,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2
} from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Types
interface FinancialKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
  icon: any;
}

interface FinancialAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  financialImpact: string;
  metrics: {
    tradesExecuted?: string;
    winRate?: string;
    pnlImpact?: string;
    exposureMonitored?: string;
    riskAlerts?: string;
    accuracy?: string;
    transactionsMonitored?: string;
    fraudPrevented?: string;
    marketContribution?: string;
  };
  riskLevel: 'low' | 'medium' | 'high';
  activeInsights: number;
  trend: 'up' | 'down' | 'stable';
}

interface MarketData {
  id: string;
  name: string;
  type: 'equity' | 'forex' | 'crypto' | 'derivatives' | 'bonds';
  status: 'active' | 'closed';
  volume: string;
  change: string;
  trend: 'up' | 'down';
  price: string;
}

interface PortfolioAsset {
  id: string;
  asset: string;
  allocation: number;
  value: string;
  performance: string;
  trend: 'up' | 'down';
}

interface RiskCategory {
  id: string;
  category: string;
  score: number;
  max: number;
  trend: 'up' | 'down' | 'stable';
  alerts: number;
  color: string;
}

interface CreditMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

interface FraudAlert {
  id: string;
  type: string;
  severity: 'high' | 'medium' | 'low';
  amount: string;
  status: 'detected' | 'investigating' | 'resolved';
  timestamp: string;
}

interface TreasuryMetric {
  id: string;
  label: string;
  value: string;
  target: string;
  variance: string;
  color: string;
}

interface MarketIndex {
  id: string;
  index: string;
  value: number;
  change: string;
  trend: 'up' | 'down';
  region: string;
}

interface PaymentTransaction {
  id: string;
  source: string;
  destination: string;
  volume: string;
  status: 'processing' | 'completed' | 'failed';
  timestamp: string;
}

interface FinancialInsight {
  id: string;
  insight: string;
  category: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
  action: string;
}

interface FinancialOperation {
  id: string;
  event: string;
  type: 'trade' | 'position' | 'risk' | 'fraud' | 'portfolio' | 'market' | 'settlement';
  timestamp: string;
  details: string;
  impact: 'critical' | 'high' | 'medium' | 'low';
}

interface SystemHealth {
  id: string;
  system: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
  throughput: string;
}

const BankingFinanceCommandCenter = () => {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Trading Agents', icon: Bot },
    { id: 'portfolio', label: 'Portfolio Management', icon: BarChart3 },
    { id: 'risk', label: 'Risk & Compliance', icon: Shield },
    { id: 'credit', label: 'Credit Intelligence', icon: Scale },
    { id: 'fraud', label: 'Fraud Detection', icon: Fingerprint },
    { id: 'treasury', label: 'Treasury Operations', icon: Landmark },
    { id: 'liquidity', label: 'Liquidity Management', icon: DollarSign },
    { id: 'market', label: 'Market Intelligence', icon: Globe },
    { id: 'payments', label: 'Payments & Settlements', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Financial KPIs
  const financialKPIs: FinancialKPI[] = [
    { id: '1', title: 'Total AUM', value: '$48.2B', change: '+12.4%', trend: 'up', color: '#10B981', subtitle: 'Assets Under Management', icon: DollarSign },
    { id: '2', title: 'Daily PnL', value: '+$182M', change: '+8.2%', trend: 'up', color: '#10B981', subtitle: 'Net Profit/Loss', icon: TrendingUp },
    { id: '3', title: 'Portfolio Value', value: '$48.2B', change: '+2.1%', trend: 'up', color: '#06B6D4', subtitle: 'Total portfolio', icon: BarChart3 },
    { id: '4', title: 'Liquidity Ratio', value: '14.2%', change: '+0.8%', trend: 'up', color: '#8B5CF6', subtitle: 'Cash ratio', icon: Activity },
    { id: '5', title: 'Credit Exposure', value: '$12.4B', change: '-1.2%', trend: 'down', color: '#F59E0B', subtitle: 'Total exposure', icon: Shield },
    { id: '6', title: 'Sharpe Ratio', value: '2.84', change: '+0.12', trend: 'up', color: '#10B981', subtitle: 'Risk-adjusted return', icon: Target },
    { id: '7', title: 'Default Probability', value: '0.42%', change: '-0.08%', trend: 'down', color: '#10B981', subtitle: 'Portfolio risk', icon: AlertTriangle },
    { id: '8', title: 'Fraud Prevented', value: '$620M', change: '+18.4%', trend: 'up', color: '#10B981', subtitle: 'YTD prevented', icon: Shield },
    { id: '9', title: 'VIX Index', value: '18.42', change: '+2.1%', trend: 'up', color: '#F59E0B', subtitle: 'Market volatility', icon: Activity },
    { id: '10', title: 'AI Trading Accuracy', value: '94.2%', change: '+1.8%', trend: 'up', color: '#06B6D4', subtitle: 'Model accuracy', icon: Brain },
  ];

  // AI Financial Agents
  const financialAgents: FinancialAgent[] = [
    {
      id: '1',
      name: 'Agent Alpha',
      specialty: 'Trading Intelligence Agent',
      avatar: '📈',
      status: 'active',
      confidenceScore: 94,
      financialImpact: '+$4.2B',
      metrics: {
        tradesExecuted: '18.4M',
        winRate: '72%',
        pnlImpact: '+$4.2B',
        marketContribution: '+$2.8B',
      },
      riskLevel: 'medium',
      activeInsights: 156,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Agent Sigma',
      specialty: 'Risk Management Agent',
      avatar: '🛡️',
      status: 'active',
      confidenceScore: 96,
      financialImpact: '$84B',
      metrics: {
        exposureMonitored: '$84B',
        riskAlerts: '12,480',
        accuracy: '96%',
      },
      riskLevel: 'low',
      activeInsights: 234,
      trend: 'stable',
    },
    {
      id: '3',
      name: 'Agent Ledger',
      specialty: 'Fraud Detection Agent',
      avatar: '🔍',
      status: 'active',
      confidenceScore: 98,
      financialImpact: '$620M',
      metrics: {
        transactionsMonitored: '2.8B',
        fraudPrevented: '$620M',
        accuracy: '98%',
      },
      riskLevel: 'low',
      activeInsights: 89,
      trend: 'up',
    },
    {
      id: '4',
      name: 'Agent Vault',
      specialty: 'Treasury Management Agent',
      avatar: '🏦',
      status: 'active',
      confidenceScore: 92,
      financialImpact: '$6.8B',
      metrics: {
        marketContribution: '$6.8B',
        accuracy: '94%',
      },
      riskLevel: 'low',
      activeInsights: 67,
      trend: 'stable',
    },
  ];

  // Market Data
  const marketData: MarketData[] = [
    { id: '1', name: 'S&P 500', type: 'equity', status: 'active', volume: '$48.2B', change: '+1.24%', trend: 'up', price: '5,234.56' },
    { id: '2', name: 'EUR/USD', type: 'forex', status: 'active', volume: '$2.4B', change: '+0.12%', trend: 'up', price: '1.0842' },
    { id: '3', name: 'BTC/USD', type: 'crypto', status: 'active', volume: '$8.4B', change: '+2.84%', trend: 'up', price: '67,450' },
    { id: '4', name: 'US 10Y', type: 'bonds', status: 'active', volume: '$12.8B', change: '-0.08%', trend: 'down', price: '4.24%' },
    { id: '5', name: 'Gold Futures', type: 'derivatives', status: 'active', volume: '$4.2B', change: '+0.42%', trend: 'up', price: '2,342.50' },
  ];

  // Portfolio Assets
  const portfolioAssets: PortfolioAsset[] = [
    { id: '1', asset: 'US Equities', allocation: 35, value: '$16.9B', performance: '+12.4%', trend: 'up' },
    { id: '2', asset: 'International Equities', allocation: 25, value: '$12.1B', performance: '+8.2%', trend: 'up' },
    { id: '3', asset: 'Fixed Income', allocation: 20, value: '$9.6B', performance: '+4.8%', trend: 'up' },
    { id: '4', asset: 'Alternatives', allocation: 12, value: '$5.8B', performance: '+15.2%', trend: 'up' },
    { id: '5', asset: 'Cash & Equivalents', allocation: 8, value: '$3.8B', performance: '+2.1%', trend: 'stable' },
  ];

  // Risk Categories
  const riskCategories: RiskCategory[] = [
    { id: '1', category: 'Credit Risk', score: 42, max: 100, trend: 'down', alerts: 12, color: '#10B981' },
    { id: '2', category: 'Market Risk', score: 58, max: 100, trend: 'up', alerts: 24, color: '#F59E0B' },
    { id: '3', category: 'Operational Risk', score: 28, max: 100, trend: 'stable', alerts: 8, color: '#10B981' },
    { id: '4', category: 'Liquidity Risk', score: 35, max: 100, trend: 'down', alerts: 5, color: '#10B981' },
    { id: '5', category: 'Regulatory Risk', score: 22, max: 100, trend: 'stable', alerts: 3, color: '#10B981' },
  ];

  // Credit Metrics
  const creditMetrics: CreditMetric[] = [
    { id: '1', label: 'Loan Applications', value: '2,847', change: '+12.4%', trend: 'up', color: '#06B6D4' },
    { id: '2', label: 'Approved Loans', value: '1,842', change: '+8.2%', trend: 'up', color: '#10B981' },
    { id: '3', label: 'Average Credit Score', value: '724', change: '+4.2', trend: 'up', color: '#10B981' },
    { id: '4', label: 'Default Rate', value: '0.42%', change: '-0.08%', trend: 'down', color: '#10B981' },
    { id: '5', label: 'Total Exposure', value: '$12.4B', change: '-1.2%', trend: 'down', color: '#F59E0B' },
  ];

  // Fraud Alerts
  const fraudAlerts: FraudAlert[] = [
    { id: '1', type: 'Suspicious Wire Transfer', severity: 'high', amount: '$2.4M', status: 'investigating', timestamp: '5m ago' },
    { id: '2', type: 'AML Flag Triggered', severity: 'high', amount: '$840K', status: 'detected', timestamp: '12m ago' },
    { id: '3', type: 'Unusual Account Activity', severity: 'medium', amount: '$124K', status: 'resolved', timestamp: '28m ago' },
  ];

  // Treasury Metrics
  const treasuryMetrics: TreasuryMetric[] = [
    { id: '1', label: 'Cash Position', value: '$6.8B', target: '$6.0B', variance: '+13.3%', color: '#10B981' },
    { id: '2', label: 'Liquidity Buffer', value: '$2.4B', target: '$2.0B', variance: '+20.0%', color: '#10B981' },
    { id: '3', label: 'Capital Reserves', value: '$4.2B', target: '$4.0B', variance: '+5.0%', color: '#10B981' },
    { id: '4', label: 'Funding Gap', value: '$0.8B', target: '$1.0B', variance: '-20.0%', color: '#10B981' },
  ];

  // Market Indices
  const marketIndices: MarketIndex[] = [
    { id: '1', index: 'S&P 500', value: 5234.56, change: '+1.24%', trend: 'up', region: 'US' },
    { id: '2', index: 'NASDAQ', value: 16452.38, change: '+1.82%', trend: 'up', region: 'US' },
    { id: '3', index: 'FTSE 100', value: 8142.56, change: '+0.42%', trend: 'up', region: 'UK' },
    { id: '4', index: 'Nikkei 225', value: 38456.82, change: '-0.28%', trend: 'down', region: 'Japan' },
    { id: '5', index: 'DAX', value: 18452.36, change: '+0.68%', trend: 'up', region: 'Germany' },
  ];

  // Payment Transactions
  const paymentTransactions: PaymentTransaction[] = [
    { id: '1', source: 'JPMorgan Chase', destination: 'Bank of America', volume: '$124M', status: 'completed', timestamp: '1m ago' },
    { id: '2', source: 'Goldman Sachs', destination: 'Morgan Stanley', volume: '$84M', status: 'processing', timestamp: '2m ago' },
    { id: '3', source: 'Citibank', destination: 'Wells Fargo', volume: '$56M', status: 'completed', timestamp: '5m ago' },
  ];

  // Financial Insights
  const financialInsights: FinancialInsight[] = [
    { id: '1', insight: 'Tech sector overexposure detected in portfolio. Consider rebalancing to reduce concentration risk.', category: 'Portfolio', confidence: 94, impact: 'high', timestamp: '2h ago', action: 'Rebalance portfolio' },
    { id: '2', insight: 'Interest rate hike likely impacting bond positions. Duration adjustment recommended.', category: 'Market', confidence: 89, impact: 'high', timestamp: '4h ago', action: 'Adjust duration' },
    { id: '3', insight: 'Unusual trading activity detected in derivatives market. Enhanced monitoring advised.', category: 'Risk', confidence: 92, impact: 'high', timestamp: '6h ago', action: 'Increase monitoring' },
    { id: '4', insight: 'Liquidity buffer below optimal threshold. Consider increasing cash position.', category: 'Treasury', confidence: 87, impact: 'medium', timestamp: '8h ago', action: 'Increase liquidity' },
    { id: '5', insight: 'Arbitrage opportunity identified in FX markets. Potential for 12bps gain.', category: 'Trading', confidence: 78, impact: 'medium', timestamp: '12h ago', action: 'Execute arbitrage' },
  ];

  // Financial Operations
  const financialOperations: FinancialOperation[] = [
    { id: '1', event: 'Trade executed: AAPL 10,000 shares @ $178.42', type: 'trade', timestamp: '1m ago', details: 'Order ID: #842910', impact: 'high' },
    { id: '2', event: 'Position opened: BTC long @ $67,450', type: 'position', timestamp: '2m ago', details: 'Size: $2.4M', impact: 'high' },
    { id: '3', event: 'Risk alert triggered: Market volatility spike', type: 'risk', timestamp: '5m ago', details: 'VIX +2.4%', impact: 'critical' },
    { id: '4', event: 'Fraud detected: Suspicious wire transfer', type: 'fraud', timestamp: '8m ago', details: 'Amount: $2.4M', impact: 'critical' },
    { id: '5', event: 'Portfolio rebalanced: Tech sector reduced', type: 'portfolio', timestamp: '12m ago', details: 'Allocation: 35% → 32%', impact: 'medium' },
    { id: '6', event: 'Market signal updated: Bullish sentiment', type: 'market', timestamp: '15m ago', details: 'Confidence: 78%', impact: 'medium' },
    { id: '7', event: 'Settlement completed: Cross-border payment', type: 'settlement', timestamp: '18m ago', details: 'Amount: $124M', impact: 'medium' },
  ];

  // System Health
  const systemHealth: SystemHealth[] = [
    { id: '1', system: 'Trading APIs', status: 'healthy', uptime: '99.9%', latency: '12ms', throughput: '8.4K req/s' },
    { id: '2', system: 'Banking Core', status: 'healthy', uptime: '99.8%', latency: '28ms', throughput: '2.1K tx/s' },
    { id: '3', system: 'Payment Gateways', status: 'healthy', uptime: '99.9%', latency: '18ms', throughput: '4.2K tx/s' },
    { id: '4', system: 'Market Data Feeds', status: 'healthy', uptime: '99.7%', latency: '8ms', throughput: '128K msg/s' },
    { id: '5', system: 'AI Trading Engines', status: 'healthy', uptime: '99.9%', latency: '52ms', throughput: '64K req/s' },
  ];

  // Render Functions
  const renderKPICard = (kpi: FinancialKPI) => {
    const Icon = kpi.icon;
    return (
      <View key={kpi.id} style={[styles.kpiCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: kpi.color + '30' }]}>
        <View style={styles.kpiHeader}>
          <View style={styles.kpiIconContainer}>
            <Icon size={20} color={kpi.color} />
          </View>
          <Text style={[styles.kpiTitle, { color: 'rgba(255,255,255,0.7)' }]}>{kpi.title}</Text>
        </View>
        <View style={styles.kpiValueContainer}>
          <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
          <View style={[
            styles.kpiTrendBadge,
            { backgroundColor: kpi.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : kpi.trend === 'down' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)' }
          ]}>
            {kpi.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : 
             kpi.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> : 
             <Activity size={12} color="rgba(255,255,255,0.6)" />}
            <Text style={[
              styles.kpiTrendText,
              { color: kpi.trend === 'up' ? '#10B981' : kpi.trend === 'down' ? '#EF4444' : 'rgba(255,255,255,0.6)' }
            ]}>{kpi.change}</Text>
          </View>
        </View>
        <Text style={[styles.kpiSubtitle, { color: 'rgba(255,255,255,0.5)' }]}>{kpi.subtitle}</Text>
      </View>
    );
  };

  const renderAgentCard = (agent: FinancialAgent) => (
    <View key={agent.id} style={[styles.agentCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: agent.status === 'active' ? '#06B6D4' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.agentAvatar}>
        <Text style={styles.agentAvatarText}>{agent.avatar}</Text>
        <View style={[
          styles.agentStatusDot,
          { backgroundColor: agent.status === 'active' ? '#10B981' : agent.status === 'error' ? '#EF4444' : '#6B7280' }
        ]} />
      </View>
      <View style={styles.agentInfo}>
        <Text style={[styles.agentName, { color: '#FFFFFF' }]}>{agent.name}</Text>
        <Text style={[styles.agentSpecialty, { color: 'rgba(255,255,255,0.6)' }]}>{agent.specialty}</Text>
      </View>
      <View style={styles.agentMetrics}>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: '#06B6D4' }]}>{agent.confidenceScore}%</Text>
          <Text style={[styles.agentMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Confidence</Text>
        </View>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.financialImpact}</Text>
          <Text style={[styles.agentMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Impact</Text>
        </View>
      </View>
      <View style={[
        styles.agentRiskBadge,
        { backgroundColor: agent.riskLevel === 'low' ? 'rgba(16, 185, 129, 0.2)' : agent.riskLevel === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
      ]}>
        <Text style={[
          styles.agentRiskText,
          { color: agent.riskLevel === 'low' ? '#10B981' : agent.riskLevel === 'medium' ? '#F59E0B' : '#EF4444' }
        ]}>{agent.riskLevel.toUpperCase()}</Text>
      </View>
    </View>
  );

  const renderMarketData = (market: MarketData) => (
    <View key={market.id} style={[styles.marketCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: market.trend === 'up' ? '#10B981' + '30' : '#EF4444' + '30' }]}>
      <View style={styles.marketHeader}>
        <Text style={[styles.marketName, { color: '#FFFFFF' }]}>{market.name}</Text>
        <View style={[
          styles.marketTypeBadge,
          { backgroundColor: '#06B6D4' + '20' }
        ]}>
          <Text style={[styles.marketTypeText, { color: '#06B6D4' }]}>{market.type.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.marketMetrics}>
        <View style={styles.marketMetric}>
          <Text style={[styles.marketMetricValue, { color: '#FFFFFF' }]}>{market.price}</Text>
          <Text style={[styles.marketMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Price</Text>
        </View>
        <View style={styles.marketMetric}>
          <Text style={[styles.marketMetricValue, { color: market.trend === 'up' ? '#10B981' : '#EF4444' }]}>{market.change}</Text>
          <Text style={[styles.marketMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Change</Text>
        </View>
        <View style={styles.marketMetric}>
          <Text style={[styles.marketMetricValue, { color: '#8B5CF6' }]}>{market.volume}</Text>
          <Text style={[styles.marketMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Volume</Text>
        </View>
      </View>
      <View style={[
        styles.marketStatusBadge,
        { backgroundColor: market.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
      ]}>
        <View style={[
          styles.marketStatusDot,
          { backgroundColor: market.status === 'active' ? '#10B981' : '#6B7280' }
        ]} />
        <Text style={[
          styles.marketStatusText,
          { color: market.status === 'active' ? '#10B981' : '#6B7280' }
        ]}>{market.status.toUpperCase()}</Text>
      </View>
    </View>
  );

  const renderPortfolioAsset = (asset: PortfolioAsset) => (
    <View key={asset.id} style={[styles.portfolioCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: asset.trend === 'up' ? '#10B981' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.portfolioInfo}>
        <Text style={[styles.portfolioAsset, { color: '#FFFFFF' }]}>{asset.asset}</Text>
        <Text style={[styles.portfolioValue, { color: '#10B981' }]}>{asset.value}</Text>
      </View>
      <View style={styles.portfolioMetrics}>
        <View style={styles.portfolioMetric}>
          <Text style={[styles.portfolioMetricValue, { color: '#06B6D4' }]}>{asset.allocation}%</Text>
          <Text style={[styles.portfolioMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Allocation</Text>
        </View>
        <View style={styles.portfolioMetric}>
          <Text style={[styles.portfolioMetricValue, { color: asset.trend === 'up' ? '#10B981' : '#6B7280' }]}>{asset.performance}</Text>
          <Text style={[styles.portfolioMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Performance</Text>
        </View>
      </View>
      <View style={[
        styles.portfolioAllocationBar,
        { backgroundColor: '#1F2937' }
      ]}>
        <View style={[
          styles.portfolioAllocationFill,
          { width: `${asset.allocation}%`, backgroundColor: '#06B6D4' }
        ]} />
      </View>
    </View>
  );

  const renderRiskCategory = (category: RiskCategory) => (
    <View key={category.id} style={[styles.riskCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: category.color + '30' }]}>
      <View style={styles.riskHeader}>
        <View style={[styles.riskDot, { backgroundColor: category.color }]} />
        <Text style={[styles.riskCategory, { color: '#FFFFFF' }]}>{category.category}</Text>
        <View style={[
          styles.riskAlertBadge,
          { backgroundColor: category.alerts > 10 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)' }
        ]}>
          <AlertTriangle size={12} color={category.alerts > 10 ? '#EF4444' : '#F59E0B'} />
          <Text style={[
            styles.riskAlertText,
            { color: category.alerts > 10 ? '#EF4444' : '#F59E0B' }
          ]}>{category.alerts}</Text>
        </View>
      </View>
      <View style={styles.riskScoreContainer}>
        <Text style={[styles.riskScore, { color: category.color }]}>{category.score}</Text>
        <Text style={[styles.riskScoreLabel, { color: 'rgba(255,255,255,0.5)' }]}>/ {category.max}</Text>
      </View>
      <View style={[
        styles.riskBar,
        { backgroundColor: '#1F2937' }
      ]}>
        <View style={[
          styles.riskFill,
          { width: `${(category.score / category.max) * 100}%`, backgroundColor: category.color }
        ]} />
      </View>
      <View style={styles.riskTrend}>
        {category.trend === 'up' ? <TrendingUp size={12} color="#EF4444" /> : 
         category.trend === 'down' ? <TrendingDown size={12} color="#10B981" /> : 
         <Activity size={12} color="rgba(255,255,255,0.6)" />}
        <Text style={[styles.riskTrendText, { color: category.trend === 'up' ? '#EF4444' : category.trend === 'down' ? '#10B981' : 'rgba(255,255,255,0.6)' }]}>
          {category.trend === 'up' ? 'Increasing' : category.trend === 'down' ? 'Decreasing' : 'Stable'}
        </Text>
      </View>
    </View>
  );

  const renderCreditMetric = (metric: CreditMetric) => (
    <View key={metric.id} style={[styles.creditCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: metric.color + '30' }]}>
      <Text style={[styles.creditLabel, { color: 'rgba(255,255,255,0.7)' }]}>{metric.label}</Text>
      <View style={styles.creditValueContainer}>
        <Text style={[styles.creditValue, { color: metric.color }]}>{metric.value}</Text>
        <View style={[
          styles.creditTrendBadge,
          { backgroundColor: metric.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
        ]}>
          {metric.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : <TrendingDown size={12} color="#EF4444" />}
          <Text style={[
            styles.creditTrendText,
            { color: metric.trend === 'up' ? '#10B981' : '#EF4444' }
          ]}>{metric.change}</Text>
        </View>
      </View>
    </View>
  );

  const renderFraudAlert = (alert: FraudAlert) => (
    <View key={alert.id} style={[styles.fraudCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: alert.severity === 'high' ? '#EF4444' + '30' : alert.severity === 'medium' ? '#F59E0B' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.fraudHeader}>
        <Shield size={18} color={alert.severity === 'high' ? '#EF4444' : alert.severity === 'medium' ? '#F59E0B' : '#6B7280'} />
        <Text style={[styles.fraudType, { color: '#FFFFFF' }]}>{alert.type}</Text>
        <View style={[
          styles.fraudSeverityBadge,
          { backgroundColor: alert.severity === 'high' ? 'rgba(239, 68, 68, 0.2)' : alert.severity === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
        ]}>
          <Text style={[
            styles.fraudSeverityText,
            { color: alert.severity === 'high' ? '#EF4444' : alert.severity === 'medium' ? '#F59E0B' : '#6B7280' }
          ]}>{alert.severity}</Text>
        </View>
      </View>
      <View style={styles.fraudDetails}>
        <Text style={[styles.fraudAmount, { color: '#FFFFFF' }]}>{alert.amount}</Text>
        <Text style={[styles.fraudTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{alert.timestamp}</Text>
      </View>
      <View style={[
        styles.fraudStatusBadge,
        { backgroundColor: alert.status === 'detected' ? 'rgba(239, 68, 68, 0.2)' : alert.status === 'investigating' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)' }
      ]}>
        <Text style={[
          styles.fraudStatusText,
          { color: alert.status === 'detected' ? '#EF4444' : alert.status === 'investigating' ? '#F59E0B' : '#10B981' }
        ]}>{alert.status}</Text>
      </View>
    </View>
  );

  const renderTreasuryMetric = (metric: TreasuryMetric) => (
    <View key={metric.id} style={[styles.treasuryCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: metric.color + '30' }]}>
      <Text style={[styles.treasuryLabel, { color: 'rgba(255,255,255,0.7)' }]}>{metric.label}</Text>
      <View style={styles.treasuryValueContainer}>
        <Text style={[styles.treasuryValue, { color: metric.color }]}>{metric.value}</Text>
        <Text style={[styles.treasuryTarget, { color: 'rgba(255,255,255,0.5)' }]}>Target: {metric.target}</Text>
      </View>
      <View style={[
        styles.treasuryVarianceBadge,
        { backgroundColor: metric.variance.startsWith('+') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
      ]}>
        <Text style={[
          styles.treasuryVarianceText,
          { color: metric.variance.startsWith('+') ? '#10B981' : '#EF4444' }
        ]}>{metric.variance}</Text>
      </View>
    </View>
  );

  const renderMarketIndex = (index: MarketIndex) => (
    <View key={index.id} style={[styles.indexCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: index.trend === 'up' ? '#10B981' + '30' : '#EF4444' + '30' }]}>
      <View style={styles.indexHeader}>
        <Text style={[styles.indexName, { color: '#FFFFFF' }]}>{index.index}</Text>
        <Globe size={14} color="rgba(255,255,255,0.5)" />
        <Text style={[styles.indexRegion, { color: 'rgba(255,255,255,0.5)' }]}>{index.region}</Text>
      </View>
      <View style={styles.indexMetrics}>
        <Text style={[styles.indexValue, { color: '#FFFFFF' }]}>{index.value.toLocaleString()}</Text>
        <View style={[
          styles.indexChangeBadge,
          { backgroundColor: index.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
        ]}>
          {index.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : <TrendingDown size={12} color="#EF4444" />}
          <Text style={[
            styles.indexChangeText,
            { color: index.trend === 'up' ? '#10B981' : '#EF4444' }
          ]}>{index.change}</Text>
        </View>
      </View>
    </View>
  );

  const renderPaymentTransaction = (transaction: PaymentTransaction) => (
    <View key={transaction.id} style={[styles.paymentCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: transaction.status === 'completed' ? '#10B981' + '30' : transaction.status === 'processing' ? '#F59E0B' + '30' : '#EF4444' + '30' }]}>
      <View style={styles.paymentRoute}>
        <View style={styles.paymentEndpoint}>
          <Text style={[styles.paymentEndpointText, { color: '#FFFFFF' }]}>{transaction.source}</Text>
        </View>
        <ArrowRight size={16} color="#06B6D4" />
        <View style={styles.paymentEndpoint}>
          <Text style={[styles.paymentEndpointText, { color: '#FFFFFF' }]}>{transaction.destination}</Text>
        </View>
      </View>
      <View style={styles.paymentDetails}>
        <Text style={[styles.paymentVolume, { color: '#10B981' }]}>{transaction.volume}</Text>
        <Text style={[styles.paymentTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{transaction.timestamp}</Text>
      </View>
      <View style={[
        styles.paymentStatusBadge,
        { backgroundColor: transaction.status === 'completed' ? 'rgba(16, 185, 129, 0.2)' : transaction.status === 'processing' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
      ]}>
        <Text style={[
          styles.paymentStatusText,
          { color: transaction.status === 'completed' ? '#10B981' : transaction.status === 'processing' ? '#F59E0B' : '#EF4444' }
        ]}>{transaction.status}</Text>
      </View>
    </View>
  );

  const renderFinancialInsight = (insight: FinancialInsight) => (
    <View key={insight.id} style={[styles.insightCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: insight.impact === 'high' ? '#10B981' + '30' : insight.impact === 'medium' ? '#F59E0B' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.insightHeader}>
        <Brain size={18} color="#06B6D4" />
        <View style={styles.insightMeta}>
          <Text style={[styles.insightCategory, { color: '#06B6D4' }]}>{insight.category}</Text>
          <Text style={[styles.insightConfidence, { color: 'rgba(255,255,255,0.5)' }]}>Confidence: {insight.confidence}%</Text>
        </View>
        <View style={[
          styles.insightImpactBadge,
          { backgroundColor: insight.impact === 'high' ? 'rgba(16, 185, 129, 0.2)' : insight.impact === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
        ]}>
          <Text style={[
            styles.insightImpactText,
            { color: insight.impact === 'high' ? '#10B981' : insight.impact === 'medium' ? '#F59E0B' : '#6B7280' }
          ]}>{insight.impact}</Text>
        </View>
      </View>
      <Text style={[styles.insightText, { color: '#FFFFFF' }]}>{insight.insight}</Text>
      <View style={styles.insightFooter}>
        <Text style={[styles.insightTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{insight.timestamp}</Text>
        <View style={[styles.insightAction, { backgroundColor: 'rgba(6, 182, 212, 0.1)' }]}>
          <Lightbulb size={12} color="#06B6D4" />
          <Text style={[styles.insightActionText, { color: '#06B6D4' }]}>{insight.action}</Text>
        </View>
      </View>
    </View>
  );

  const renderFinancialOperation = (operation: FinancialOperation) => (
    <View key={operation.id} style={[styles.operationCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: operation.impact === 'critical' ? '#EF4444' + '30' : operation.impact === 'high' ? '#F59E0B' + '30' : '#6B7280' + '30' }]}>
      <View style={[
        styles.operationTypeDot,
        { backgroundColor: operation.type === 'trade' ? '#10B981' : operation.type === 'risk' ? '#EF4444' : operation.type === 'fraud' ? '#F59E0B' : '#06B6D4' }
      ]} />
      <View style={styles.operationContent}>
        <Text style={[styles.operationEvent, { color: '#FFFFFF' }]}>{operation.event}</Text>
        <Text style={[styles.operationDetails, { color: 'rgba(255,255,255,0.5)' }]}>{operation.details}</Text>
      </View>
      <View style={styles.operationMeta}>
        <Text style={[styles.operationTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{operation.timestamp}</Text>
        <View style={[
          styles.operationImpactBadge,
          { backgroundColor: operation.impact === 'critical' ? 'rgba(239, 68, 68, 0.2)' : operation.impact === 'high' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
        ]}>
          <Text style={[
            styles.operationImpactText,
            { color: operation.impact === 'critical' ? '#EF4444' : operation.impact === 'high' ? '#F59E0B' : '#6B7280' }
          ]}>{operation.impact}</Text>
        </View>
      </View>
    </View>
  );

  const renderSystemHealth = (health: SystemHealth) => (
    <View key={health.id} style={[styles.healthCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: health.status === 'healthy' ? '#10B981' + '30' : health.status === 'degraded' ? '#F59E0B' + '30' : '#EF4444' + '30' }]}>
      <View style={styles.healthHeader}>
        <View style={[
          styles.healthStatusDot,
          { backgroundColor: health.status === 'healthy' ? '#10B981' : health.status === 'degraded' ? '#F59E0B' : '#EF4444' }
        ]} />
        <Text style={[styles.healthSystem, { color: '#FFFFFF' }]}>{health.system}</Text>
      </View>
      <View style={styles.healthMetrics}>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricValue, { color: '#10B981' }]}>{health.uptime}</Text>
          <Text style={[styles.healthMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Uptime</Text>
        </View>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricValue, { color: '#06B6D4' }]}>{health.latency}</Text>
          <Text style={[styles.healthMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Latency</Text>
        </View>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricValue, { color: '#8B5CF6' }]}>{health.throughput}</Text>
          <Text style={[styles.healthMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Throughput</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      {/* Executive Bar */}
      <View style={[styles.executiveBar, { backgroundColor: 'rgba(255,255,255,0.05)', borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
        <View style={styles.executiveHeader}>
          <Landmark size={24} color="#10B981" />
          <Text style={[styles.executiveTitle, { color: '#FFFFFF' }]}>AI Banking & Finance Command Center</Text>
        </View>
        <View style={styles.executiveActions}>
          <TouchableOpacity style={[styles.executiveButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
            <RefreshCw size={18} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.executiveButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
            <Bell size={18} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.executiveButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
            <Settings size={18} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Sidebar */}
        <View style={[styles.sidebar, { backgroundColor: 'rgba(255,255,255,0.02)', borderRightColor: 'rgba(255,255,255,0.1)' }]}>
          {navigationItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.sidebarItem,
                activeTab === item.id && { backgroundColor: 'rgba(6, 182, 212, 0.1)' }
              ]}
              onPress={() => setActiveTab(item.id)}
            >
              <item.icon size={18} color={activeTab === item.id ? '#06B6D4' : 'rgba(255,255,255,0.6)'} />
              {!sidebarCollapsed && (
                <Text style={[
                  styles.sidebarItemText,
                  { color: activeTab === item.id ? '#06B6D4' : 'rgba(255,255,255,0.6)' }
                ]}>{item.label}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Dashboard Content */}
        <ScrollView style={styles.dashboardContent} showsVerticalScrollIndicator={false}>
          {/* Financial KPIs */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Financial KPIs</Text>
            <View style={styles.kpiGrid}>
              {financialKPIs.map(renderKPICard)}
            </View>
          </View>

          {/* AI Financial Agents */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Financial Agents</Text>
            <View style={styles.agentsGrid}>
              {financialAgents.map(renderAgentCard)}
            </View>
          </View>

          {/* CFO Command Center */}
          <View style={[styles.section, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.1)' }]}>
            <View style={styles.cfoHeader}>
              <DollarSign size={24} color="#10B981" />
              <Text style={[styles.cfoTitle, { color: '#FFFFFF' }]}>CFO Command Center</Text>
            </View>
            <View style={styles.cfoMetrics}>
              <View style={[styles.cfoMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <Text style={[styles.cfoMetricLabel, { color: 'rgba(255,255,255,0.6)' }]}>Total Portfolio Value</Text>
                <Text style={[styles.cfoMetricValue, { color: '#10B981' }]}>$48.2B</Text>
              </View>
              <View style={[styles.cfoMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <Text style={[styles.cfoMetricLabel, { color: 'rgba(255,255,255,0.6)' }]}>Daily PnL</Text>
                <Text style={[styles.cfoMetricValue, { color: '#10B981' }]}>+$182M</Text>
              </View>
              <View style={[styles.cfoMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <Text style={[styles.cfoMetricLabel, { color: 'rgba(255,255,255,0.6)' }]}>Active Positions</Text>
                <Text style={[styles.cfoMetricValue, { color: '#06B6D4' }]}>128,420</Text>
              </View>
              <View style={[styles.cfoMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <Text style={[styles.cfoMetricLabel, { color: 'rgba(255,255,255,0.6)' }]}>Risk Exposure</Text>
                <Text style={[styles.cfoMetricValue, { color: '#F59E0B' }]}>Medium</Text>
              </View>
              <View style={[styles.cfoMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <Text style={[styles.cfoMetricLabel, { color: 'rgba(255,255,255,0.6)' }]}>Liquidity Available</Text>
                <Text style={[styles.cfoMetricValue, { color: '#10B981' }]}>$6.8B</Text>
              </View>
            </View>
          </View>

          {/* Real-Time Trading Control Center */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Real-Time Trading Control Center</Text>
            <View style={styles.marketGrid}>
              {marketData.map(renderMarketData)}
            </View>
          </View>

          {/* Portfolio Management Hub */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Portfolio Management Hub</Text>
            <View style={styles.portfolioGrid}>
              {portfolioAssets.map(renderPortfolioAsset)}
            </View>
          </View>

          {/* Risk Management & Compliance Center */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Risk Management & Compliance Center</Text>
            <View style={styles.riskGrid}>
              {riskCategories.map(renderRiskCategory)}
            </View>
          </View>

          {/* Credit Intelligence Engine */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Credit Intelligence Engine</Text>
            <View style={styles.creditGrid}>
              {creditMetrics.map(renderCreditMetric)}
            </View>
          </View>

          {/* Fraud Detection & Transaction Security */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Fraud Detection & Transaction Security</Text>
            <View style={styles.fraudGrid}>
              {fraudAlerts.map(renderFraudAlert)}
            </View>
          </View>

          {/* Treasury & Liquidity Management */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Treasury & Liquidity Management</Text>
            <View style={styles.treasuryGrid}>
              {treasuryMetrics.map(renderTreasuryMetric)}
            </View>
          </View>

          {/* Market Intelligence Center */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Market Intelligence Center</Text>
            <View style={styles.indexGrid}>
              {marketIndices.map(renderMarketIndex)}
            </View>
          </View>

          {/* Payment & Settlement Network */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Payment & Settlement Network</Text>
            <View style={styles.paymentGrid}>
              {paymentTransactions.map(renderPaymentTransaction)}
            </View>
          </View>

          {/* AI Finance Insights */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Finance Insights</Text>
            <View style={styles.insightGrid}>
              {financialInsights.map(renderFinancialInsight)}
            </View>
          </View>

          {/* Real-Time Financial Operations Feed */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Real-Time Financial Operations Feed</Text>
            <View style={styles.operationList}>
              {financialOperations.map(renderFinancialOperation)}
            </View>
          </View>

          {/* System Health & Fintech Infrastructure */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>System Health & Fintech Infrastructure</Text>
            <View style={styles.healthGrid}>
              {systemHealth.map(renderSystemHealth)}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  executiveBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  executiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  executiveTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  executiveActions: {
    flexDirection: 'row',
    gap: 8,
  },
  executiveButton: {
    padding: 8,
    borderRadius: 8,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    borderRightWidth: 1,
    paddingVertical: 16,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  sidebarItemText: {
    fontSize: 14,
  },
  dashboardContent: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    width: 'calc(20% - 10px)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  kpiIconContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  kpiTitle: {
    fontSize: 12,
  },
  kpiValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  kpiTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  kpiTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  kpiSubtitle: {
    fontSize: 11,
  },
  agentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  agentCard: {
    width: 'calc(25% - 9px)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  agentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  agentAvatarText: {
    fontSize: 24,
  },
  agentStatusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#05070A',
  },
  agentInfo: {
    marginBottom: 12,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  agentSpecialty: {
    fontSize: 11,
  },
  agentMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  agentMetric: {
    flex: 1,
  },
  agentMetricValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  agentMetricLabel: {
    fontSize: 10,
  },
  agentRiskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  agentRiskText: {
    fontSize: 10,
    fontWeight: '700',
  },
  cfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cfoTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cfoMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  cfoMetricCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  cfoMetricLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  cfoMetricValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  marketGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  marketCard: {
    width: 'calc(20% - 10px)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  marketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  marketName: {
    fontSize: 14,
    fontWeight: '600',
  },
  marketTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  marketTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  marketMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  marketMetric: {
    alignItems: 'center',
  },
  marketMetricValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  marketMetricLabel: {
    fontSize: 10,
  },
  marketStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  marketStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  marketStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  portfolioCard: {
    width: 'calc(20% - 10px)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  portfolioInfo: {
    marginBottom: 12,
  },
  portfolioAsset: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  portfolioValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  portfolioMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  portfolioMetric: {
    flex: 1,
  },
  portfolioMetricValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  portfolioMetricLabel: {
    fontSize: 10,
  },
  portfolioAllocationBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  portfolioAllocationFill: {
    height: '100%',
    borderRadius: 3,
  },
  riskGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  riskCard: {
    width: 'calc(20% - 10px)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  riskDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  riskCategory: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  riskAlertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  riskAlertText: {
    fontSize: 10,
    fontWeight: '600',
  },
  riskScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  riskScore: {
    fontSize: 28,
    fontWeight: '700',
  },
  riskScoreLabel: {
    fontSize: 14,
  },
  riskBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  riskFill: {
    height: '100%',
    borderRadius: 3,
  },
  riskTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  riskTrendText: {
    fontSize: 10,
  },
  creditGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  creditCard: {
    width: 'calc(20% - 10px)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  creditLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  creditValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  creditValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  creditTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  creditTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  fraudGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  fraudCard: {
    width: 'calc(33.33% - 8px)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  fraudHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  fraudType: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  fraudSeverityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  fraudSeverityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  fraudDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  fraudAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  fraudTimestamp: {
    fontSize: 11,
  },
  fraudStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  fraudStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  treasuryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  treasuryCard: {
    width: 'calc(25% - 9px)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  treasuryLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  treasuryValueContainer: {
    marginBottom: 8,
  },
  treasuryValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  treasuryTarget: {
    fontSize: 11,
  },
  treasuryVarianceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  treasuryVarianceText: {
    fontSize: 11,
    fontWeight: '600',
  },
  indexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  indexCard: {
    width: 'calc(20% - 10px)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  indexHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  indexName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  indexRegion: {
    fontSize: 10,
  },
  indexMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indexValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  indexChangeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  indexChangeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  paymentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  paymentCard: {
    width: 'calc(33.33% - 8px)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  paymentRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  paymentEndpoint: {
    flex: 1,
  },
  paymentEndpointText: {
    fontSize: 12,
    fontWeight: '600',
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paymentVolume: {
    fontSize: 16,
    fontWeight: '700',
  },
  paymentTimestamp: {
    fontSize: 11,
  },
  paymentStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  paymentStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  insightCard: {
    width: 'calc(50% - 6px)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  insightMeta: {
    flex: 1,
  },
  insightCategory: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  insightConfidence: {
    fontSize: 10,
  },
  insightImpactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightTimestamp: {
    fontSize: 10,
  },
  insightAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insightActionText: {
    fontSize: 10,
    fontWeight: '600',
  },
  operationList: {
    gap: 8,
  },
  operationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  operationTypeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  operationContent: {
    flex: 1,
  },
  operationEvent: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  operationDetails: {
    fontSize: 11,
  },
  operationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  operationTimestamp: {
    fontSize: 10,
  },
  operationImpactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  operationImpactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  healthCard: {
    width: 'calc(20% - 10px)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  healthStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  healthSystem: {
    fontSize: 14,
    fontWeight: '600',
  },
  healthMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  healthMetric: {
    alignItems: 'center',
  },
  healthMetricValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  healthMetricLabel: {
    fontSize: 10,
  },
});

export default BankingFinanceCommandCenter;
