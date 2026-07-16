import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import {
  LayoutDashboard,
  Bot,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  DollarSign,
  Zap,
  Star,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
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
  BarChart3,
  Shield,
  AlertTriangle,
  Database,
  Cpu,
  Radio,
  Wifi,
  HardDrive,
  Server,
  Monitor,
  Gauge,
  Scale,
  Coins,
  Landmark,
  Building2,
  CandlestickChart,
  ArrowRight,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize2,
  Minimize2
} from 'lucide-react-native';

// Types
interface TradingAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  assetsManaged: string;
  profitContribution: string;
  riskAdjustedReturn: string;
  metrics: {
    tradesExecuted?: number;
    winRate?: number;
    alphaGenerated?: string;
    riskReduction?: number;
    allocationEfficiency?: number;
    risksIdentified?: number;
    drawdownReduction?: number;
    predictionAccuracy?: number;
  };
  activeSignals: number;
  trend: 'up' | 'down' | 'stable';
}

interface TradingKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
}

interface MarketData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  marketCap: string;
}

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  status: 'executed' | 'pending' | 'cancelled';
  timestamp: string;
  strategy: string;
}

interface RiskMetric {
  id: string;
  name: string;
  value: string;
  threshold: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface Strategy {
  id: string;
  name: string;
  type: string;
  performance: string;
  sharpeRatio: string;
  maxDrawdown: string;
  winRate: string;
  status: 'active' | 'paused' | 'testing';
}

interface NewsItem {
  id: string;
  headline: string;
  source: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: 'high' | 'medium' | 'low';
  relatedSymbols: string[];
}

interface Opportunity {
  id: string;
  symbol: string;
  type: string;
  conviction: number;
  entryPrice: string;
  targetPrice: string;
  stopLoss: string;
  timeframe: string;
  reasoning: string;
}

interface Insight {
  id: string;
  insight: string;
  category: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  action: string;
  timestamp: string;
}

interface TradingActivity {
  id: string;
  event: string;
  type: 'trade' | 'signal' | 'risk' | 'market' | 'strategy' | 'rebalance';
  timestamp: string;
  details?: string;
}

interface SystemHealth {
  id: string;
  system: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

const TradingCommandCenter = () => {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Trading Agents', icon: Bot },
    { id: 'portfolio', label: 'Portfolio Management', icon: Briefcase },
    { id: 'markets', label: 'Markets', icon: Globe },
    { id: 'trading', label: 'Trading Desk', icon: CandlestickChart },
    { id: 'risk', label: 'Risk Management', icon: Shield },
    { id: 'quant', label: 'Quant Strategies', icon: Brain },
    { id: 'allocation', label: 'Asset Allocation', icon: PieChart },
    { id: 'news', label: 'News & Sentiment', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Trading KPIs
  const tradingKPIs: TradingKPI[] = [
    { id: '1', title: 'Total AUM', value: '$8.4B', change: '+$420M', trend: 'up', color: '#10B981', subtitle: 'Assets Under Management' },
    { id: '2', title: 'Daily P&L', value: '+$18.4M', change: '+12.3%', trend: 'up', color: '#10B981', subtitle: 'Daily Profit & Loss' },
    { id: '3', title: 'Portfolio Return YTD', value: '+22.8%', change: '+2.4%', trend: 'up', color: '#10B981', subtitle: 'Year to Date' },
    { id: '4', title: 'Sharpe Ratio', value: '2.84', change: '+0.12', trend: 'up', color: '#06B6D4', subtitle: 'Risk-adjusted return' },
    { id: '5', title: 'Alpha Generated', value: '+14.2%', change: '+1.8%', trend: 'up', color: '#F59E0B', subtitle: 'Above benchmark' },
    { id: '6', title: 'Win Rate', value: '71%', change: '+3.2%', trend: 'up', color: '#10B981', subtitle: 'Trading accuracy' },
    { id: '7', title: 'Risk Exposure', value: 'Low', change: '-8.4%', trend: 'down', color: '#10B981', subtitle: 'Portfolio beta' },
    { id: '8', title: 'Cash Allocation', value: '12%', change: '+2.1%', trend: 'up', color: '#8B5CF6', subtitle: 'Available capital' },
    { id: '9', title: 'Open Positions', value: '142', change: '+8', trend: 'up', color: '#06B6D4', subtitle: 'Active trades' },
    { id: '10', title: 'AI Prediction Accuracy', value: '94%', change: '+1.2%', trend: 'up', color: '#10B981', subtitle: 'Model performance' },
  ];

  // AI Trading Agents
  const tradingAgents: TradingAgent[] = [
    {
      id: '1',
      name: 'Agent Alpha',
      specialty: 'Quantitative Trading Agent',
      avatar: '📊',
      status: 'active',
      confidenceScore: 97,
      assetsManaged: '$2.4B',
      profitContribution: '+$8.4M',
      riskAdjustedReturn: '+18.4%',
      metrics: {
        tradesExecuted: 82481,
        winRate: 71,
        alphaGenerated: '+14.2%',
      },
      activeSignals: 42,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Agent Orion',
      specialty: 'Portfolio Optimization Agent',
      avatar: '🎯',
      status: 'active',
      confidenceScore: 95,
      assetsManaged: '$2.8B',
      profitContribution: '+$6.2M',
      riskAdjustedReturn: '+15.8%',
      metrics: {
        riskReduction: 22,
        allocationEfficiency: 96,
      },
      activeSignals: 28,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Agent Sentinel',
      specialty: 'Risk Intelligence Agent',
      avatar: '🛡️',
      status: 'active',
      confidenceScore: 98,
      assetsManaged: '$8.4B',
      profitContribution: '+$3.8M',
      riskAdjustedReturn: '+12.4%',
      metrics: {
        risksIdentified: 4281,
        drawdownReduction: 18,
        predictionAccuracy: 95,
      },
      activeSignals: 156,
      trend: 'stable',
    },
    {
      id: '4',
      name: 'Agent Quantum',
      specialty: 'Market Microstructure Agent',
      avatar: '⚡',
      status: 'monitoring',
      confidenceScore: 94,
      assetsManaged: '$1.2B',
      profitContribution: '+$4.2M',
      riskAdjustedReturn: '+22.4%',
      metrics: {
        tradesExecuted: 124820,
        winRate: 68,
        alphaGenerated: '+18.4%',
      },
      activeSignals: 89,
      trend: 'up',
    },
  ];

  // Market Data
  const marketData: MarketData[] = [
    { symbol: 'SPY', name: 'S&P 500 ETF', price: '478.42', change: '+2.34', changePercent: '+0.49%', volume: '84.2M', marketCap: '$420B' },
    { symbol: 'QQQ', name: 'NASDAQ 100 ETF', price: '412.18', change: '+3.56', changePercent: '+0.87%', volume: '52.4M', marketCap: '$198B' },
    { symbol: 'IWM', name: 'Russell 2000 ETF', price: '198.45', change: '-1.23', changePercent: '-0.62%', volume: '32.1M', marketCap: '$72B' },
    { symbol: 'GLD', name: 'Gold ETF', price: '192.84', change: '+0.89', changePercent: '+0.46%', volume: '12.8M', marketCap: '$58B' },
    { symbol: 'TLT', name: '20+ Year Treasury', price: '98.42', change: '-0.45', changePercent: '-0.46%', volume: '18.4M', marketCap: '$42B' },
    { symbol: 'BTC', name: 'Bitcoin', price: '47,842.00', change: '+1,242.00', changePercent: '+2.67%', volume: '28.4B', marketCap: '$920B' },
  ];

  // Recent Trades
  const recentTrades: Trade[] = [
    { id: '1', symbol: 'AAPL', type: 'buy', quantity: 500, price: 178.42, status: 'executed', timestamp: '2m ago', strategy: 'Momentum Alpha' },
    { id: '2', symbol: 'MSFT', type: 'sell', quantity: 300, price: 378.92, status: 'executed', timestamp: '5m ago', strategy: 'Mean Reversion' },
    { id: '3', symbol: 'GOOGL', type: 'buy', quantity: 200, price: 141.28, status: 'pending', timestamp: '8m ago', strategy: 'Breakout' },
    { id: '4', symbol: 'AMZN', type: 'sell', quantity: 150, price: 178.45, status: 'executed', timestamp: '12m ago', strategy: 'Pairs Trading' },
    { id: '5', symbol: 'NVDA', type: 'buy', quantity: 100, price: 495.82, status: 'pending', timestamp: '15m ago', strategy: 'AI Thematic' },
  ];

  // Risk Metrics
  const riskMetrics: RiskMetric[] = [
    { id: '1', name: 'Value at Risk (VaR)', value: '$42.8M', threshold: '$50M', status: 'normal', trend: 'down' },
    { id: '2', name: 'Portfolio Beta', value: '1.12', threshold: '1.25', status: 'normal', trend: 'stable' },
    { id: '3', name: 'Maximum Drawdown', value: '-8.4%', threshold: '-15%', status: 'normal', trend: 'down' },
    { id: '4', name: 'Concentration Risk', value: '18%', threshold: '25%', status: 'normal', trend: 'down' },
    { id: '5', name: 'Leverage Ratio', value: '2.4x', threshold: '3.0x', status: 'warning', trend: 'up' },
  ];

  // Quant Strategies
  const strategies: Strategy[] = [
    { id: '1', name: 'Momentum Alpha', type: 'Trend Following', performance: '+18.4%', sharpeRatio: '2.84', maxDrawdown: '-8.4%', winRate: '71%', status: 'active' },
    { id: '2', name: 'Mean Reversion', type: 'Statistical Arb', performance: '+14.2%', sharpeRatio: '2.42', maxDrawdown: '-6.8%', winRate: '68%', status: 'active' },
    { id: '3', name: 'Breakout Scanner', type: 'Momentum', performance: '+22.8%', sharpeRatio: '3.12', maxDrawdown: '-12.4%', winRate: '64%', status: 'active' },
    { id: '4', name: 'Pairs Trading', type: 'Market Neutral', performance: '+8.4%', sharpeRatio: '1.84', maxDrawdown: '-4.2%', winRate: '74%', status: 'active' },
    { id: '5', name: 'AI Thematic', type: 'Machine Learning', performance: '+28.4%', sharpeRatio: '3.48', maxDrawdown: '-14.2%', winRate: '62%', status: 'testing' },
  ];

  // News Items
  const newsItems: NewsItem[] = [
    { 
      id: '1', 
      headline: 'Fed signals potential rate cuts in 2024 as inflation cools', 
      source: 'Reuters', 
      timestamp: '15m ago', 
      sentiment: 'positive', 
      impact: 'high',
      relatedSymbols: ['SPY', 'TLT', 'GLD']
    },
    { 
      id: '2', 
      headline: 'Tech sector rally continues on AI optimism', 
      source: 'Bloomberg', 
      timestamp: '32m ago', 
      sentiment: 'positive', 
      impact: 'high',
      relatedSymbols: ['QQQ', 'NVDA', 'MSFT']
    },
    { 
      id: '3', 
      headline: 'Oil prices surge amid Middle East tensions', 
      source: 'WSJ', 
      timestamp: '1h ago', 
      sentiment: 'negative', 
      impact: 'medium',
      relatedSymbols: ['USO', 'XLE']
    },
    { 
      id: '4', 
      headline: 'Bitcoin ETF approval expected by January', 
      source: 'CNBC', 
      timestamp: '2h ago', 
      sentiment: 'positive', 
      impact: 'high',
      relatedSymbols: ['BTC', 'GBTC']
    },
  ];

  // Investment Opportunities
  const opportunities: Opportunity[] = [
    { 
      id: '1', 
      symbol: 'NVDA', 
      type: 'Long', 
      conviction: 92, 
      entryPrice: '$495.82', 
      targetPrice: '$550.00', 
      stopLoss: '$470.00', 
      timeframe: '2-4 weeks',
      reasoning: 'AI demand surge, data center expansion, strong earnings momentum'
    },
    { 
      id: '2', 
      symbol: 'MSFT', 
      type: 'Long', 
      conviction: 88, 
      entryPrice: '$378.92', 
      targetPrice: '$420.00', 
      stopLoss: '$360.00', 
      timeframe: '4-8 weeks',
      reasoning: 'Cloud growth, AI integration, enterprise adoption accelerating'
    },
    { 
      id: '3', 
      symbol: 'TSLA', 
      type: 'Short', 
      conviction: 75, 
      entryPrice: '$248.42', 
      targetPrice: '$210.00', 
      stopLoss: '$265.00', 
      timeframe: '2-6 weeks',
      reasoning: 'Demand concerns, competition intensifying, margin pressure'
    },
  ];

  // AI Insights
  const insights: Insight[] = [
    { 
      id: '1', 
      insight: 'Technology sector momentum exceeds historical benchmark by 2.4 standard deviations.', 
      category: 'Sector Analysis', 
      confidence: 94, 
      impact: 'high', 
      action: 'Increase tech allocation to overweight',
      timestamp: '2h ago'
    },
    { 
      id: '2', 
      insight: 'Risk-adjusted return favors increased healthcare allocation based on defensive positioning indicators.', 
      category: 'Portfolio Optimization', 
      confidence: 89, 
      impact: 'medium', 
      action: 'Rebalance to increase healthcare exposure',
      timestamp: '4h ago'
    },
    { 
      id: '3', 
      insight: 'Macro indicators suggest defensive positioning as yield curve inversion persists.', 
      category: 'Macro Analysis', 
      confidence: 87, 
      impact: 'high', 
      action: 'Reduce cyclical exposure, increase quality',
      timestamp: '6h ago'
    },
    { 
      id: '4', 
      insight: 'Quant model identifies breakout opportunity in industrials sector with 78% conviction.', 
      category: 'Quant Signal', 
      confidence: 78, 
      impact: 'medium', 
      action: 'Monitor industrials for entry points',
      timestamp: '8h ago'
    },
    { 
      id: '5', 
      insight: 'Portfolio beta exceeds target threshold - consider hedging strategies.', 
      category: 'Risk Management', 
      confidence: 92, 
      impact: 'high', 
      action: 'Implement hedge overlay',
      timestamp: '12h ago'
    },
  ];

  // Trading Activities
  const tradingActivities: TradingActivity[] = [
    { id: '1', event: 'Trade executed: AAPL +500 @ $178.42', type: 'trade', timestamp: '2m ago', details: 'Momentum Alpha strategy' },
    { id: '2', event: 'Position opened: MSFT -300 @ $378.92', type: 'trade', timestamp: '5m ago', details: 'Mean Reversion strategy' },
    { id: '3', event: 'Risk alert: Portfolio beta approaching threshold', type: 'risk', timestamp: '8m ago', details: 'Current: 1.12, Threshold: 1.25' },
    { id: '4', event: 'Market anomaly detected: Unusual volume in TSLA', type: 'market', timestamp: '12m ago', details: 'Volume 3.2x average' },
    { id: '5', event: 'Strategy signal triggered: Breakout Scanner', type: 'signal', timestamp: '15m ago', details: 'GOOGL entry signal generated' },
    { id: '6', event: 'Rebalance completed: Tech sector +2.4%', type: 'rebalance', timestamp: '18m ago', details: 'Auto-rebalancing executed' },
    { id: '7', event: 'Strategy performance updated: Momentum Alpha +18.4%', type: 'strategy', timestamp: '25m ago', details: 'Monthly performance' },
    { id: '8', event: 'Position closed: AMZN -150 @ $178.45', type: 'trade', timestamp: '32m ago', details: 'Pairs Trading exit' },
  ];

  // System Health
  const systemHealth: SystemHealth[] = [
    { id: '1', system: 'Market Data Feeds', status: 'healthy', uptime: '99.9%', latency: '12ms' },
    { id: '2', system: 'Trading Systems', status: 'healthy', uptime: '99.8%', latency: '8ms' },
    { id: '3', system: 'OMS / EMS', status: 'healthy', uptime: '99.9%', latency: '15ms' },
    { id: '4', system: 'Broker Connections', status: 'healthy', uptime: '99.7%', latency: '45ms' },
    { id: '5', system: 'Risk Engines', status: 'healthy', uptime: '99.9%', latency: '5ms' },
    { id: '6', system: 'AI Agents', status: 'healthy', uptime: '99.9%', latency: '500ms' },
    { id: '7', system: 'Exchange Connectivity', status: 'degraded', uptime: '98.5%', latency: '120ms' },
  ];

  // Render Functions
  const renderKPICard = (kpi: TradingKPI) => (
    <View key={kpi.id} style={[styles.kpiCard, { backgroundColor: theme.colors.card, borderColor: kpi.color + '30' }]}>
      <View style={styles.kpiHeader}>
        <Text style={[styles.kpiTitle, { color: theme.colors.text }]}>{kpi.title}</Text>
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
      <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
      <Text style={[styles.kpiSubtitle, { color: theme.colors.textSecondary }]}>{kpi.subtitle}</Text>
    </View>
  );

  const renderAgentCard = (agent: TradingAgent) => (
    <View key={agent.id} style={[styles.agentCard, { backgroundColor: theme.colors.card, borderColor: agent.status === 'active' ? '#06B6D4' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.agentAvatar}>
        <Text style={styles.agentAvatarText}>{agent.avatar}</Text>
        <View style={[
          styles.agentStatusDot,
          { backgroundColor: agent.status === 'active' ? '#10B981' : agent.status === 'error' ? '#EF4444' : '#6B7280' }
        ]} />
      </View>
      <View style={styles.agentInfo}>
        <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
        <Text style={[styles.agentSpecialty, { color: theme.colors.textSecondary }]}>{agent.specialty}</Text>
      </View>
      <View style={styles.agentMetrics}>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: '#06B6D4' }]}>{agent.confidenceScore}%</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Confidence</Text>
        </View>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.assetsManaged}</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>AUM</Text>
        </View>
      </View>
      <View style={styles.agentInsights}>
        <Text style={[styles.agentInsightsCount, { color: '#8B5CF6' }]}>{agent.activeSignals}</Text>
        <Text style={[styles.agentInsightsLabel, { color: theme.colors.textSecondary }]}>Signals</Text>
      </View>
    </View>
  );

  const renderMarketCard = (market: MarketData) => (
    <View key={market.symbol} style={[styles.marketCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.marketHeader}>
        <Text style={[styles.marketSymbol, { color: '#FFFFFF' }]}>{market.symbol}</Text>
        <View style={[
          styles.marketChangeBadge,
          { backgroundColor: market.change.startsWith('+') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
        ]}>
          <Text style={[
            styles.marketChange,
            { color: market.change.startsWith('+') ? '#10B981' : '#EF4444' }
          ]}>{market.change}</Text>
        </View>
      </View>
      <Text style={[styles.marketPrice, { color: '#FFFFFF' }]}>{market.price}</Text>
      <Text style={[styles.marketName, { color: theme.colors.textSecondary }]}>{market.name}</Text>
      <View style={styles.marketFooter}>
        <Text style={[styles.marketVolume, { color: theme.colors.textSecondary }]}>Vol: {market.volume}</Text>
        <Text style={[styles.marketCap, { color: theme.colors.textSecondary }]}>{market.marketCap}</Text>
      </View>
    </View>
  );

  const renderTradeRow = (trade: Trade) => (
    <View key={trade.id} style={[styles.tradeRow, { backgroundColor: theme.colors.card }]}>
      <View style={[
        styles.tradeTypeBadge,
        { backgroundColor: trade.type === 'buy' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
      ]}>
        <Text style={[
          styles.tradeType,
          { color: trade.type === 'buy' ? '#10B981' : '#EF4444' }
        ]}>{trade.type.toUpperCase()}</Text>
      </View>
      <View style={styles.tradeInfo}>
        <Text style={[styles.tradeSymbol, { color: '#FFFFFF' }]}>{trade.symbol}</Text>
        <Text style={[styles.tradeQuantity, { color: theme.colors.textSecondary }]}>{trade.quantity} @ ${trade.price.toFixed(2)}</Text>
      </View>
      <View style={styles.tradeMeta}>
        <Text style={[styles.tradeStrategy, { color: theme.colors.textSecondary }]}>{trade.strategy}</Text>
        <Text style={[styles.tradeTimestamp, { color: theme.colors.textSecondary }]}>{trade.timestamp}</Text>
      </View>
      <View style={[
        styles.tradeStatusBadge,
        { backgroundColor: trade.status === 'executed' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }
      ]}>
        <Text style={[
          styles.tradeStatus,
          { color: trade.status === 'executed' ? '#10B981' : '#F59E0B' }
        ]}>{trade.status}</Text>
      </View>
    </View>
  );

  const renderRiskMetric = (metric: RiskMetric) => (
    <View key={metric.id} style={[styles.riskMetricCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.riskMetricHeader}>
        <Text style={[styles.riskMetricName, { color: theme.colors.text }]}>{metric.name}</Text>
        <View style={[
          styles.riskStatusDot,
          { backgroundColor: metric.status === 'normal' ? '#10B981' : metric.status === 'warning' ? '#F59E0B' : '#EF4444' }
        ]} />
      </View>
      <Text style={[styles.riskMetricValue, { color: metric.status === 'normal' ? '#10B981' : metric.status === 'warning' ? '#F59E0B' : '#EF4444' }]}>{metric.value}</Text>
      <Text style={[styles.riskMetricThreshold, { color: theme.colors.textSecondary }]}>Threshold: {metric.threshold}</Text>
    </View>
  );

  const renderStrategyCard = (strategy: Strategy) => (
    <View key={strategy.id} style={[styles.strategyCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.strategyHeader}>
        <Text style={[styles.strategyName, { color: '#FFFFFF' }]}>{strategy.name}</Text>
        <View style={[
          styles.strategyStatusBadge,
          { backgroundColor: strategy.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : strategy.status === 'testing' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
        ]}>
          <Text style={[
            styles.strategyStatus,
            { color: strategy.status === 'active' ? '#10B981' : strategy.status === 'testing' ? '#06B6D4' : '#6B7280' }
          ]}>{strategy.status}</Text>
        </View>
      </View>
      <Text style={[styles.strategyType, { color: theme.colors.textSecondary }]}>{strategy.type}</Text>
      <View style={styles.strategyMetrics}>
        <View style={styles.strategyMetric}>
          <Text style={[styles.strategyMetricValue, { color: '#10B981' }]}>{strategy.performance}</Text>
          <Text style={[styles.strategyMetricLabel, { color: theme.colors.textSecondary }]}>Performance</Text>
        </View>
        <View style={styles.strategyMetric}>
          <Text style={[styles.strategyMetricValue, { color: '#06B6D4' }]}>{strategy.sharpeRatio}</Text>
          <Text style={[styles.strategyMetricLabel, { color: theme.colors.textSecondary }]}>Sharpe</Text>
        </View>
        <View style={styles.strategyMetric}>
          <Text style={[styles.strategyMetricValue, { color: '#F59E0B' }]}>{strategy.maxDrawdown}</Text>
          <Text style={[styles.strategyMetricLabel, { color: theme.colors.textSecondary }]}>Max DD</Text>
        </View>
        <View style={styles.strategyMetric}>
          <Text style={[styles.strategyMetricValue, { color: '#8B5CF6' }]}>{strategy.winRate}</Text>
          <Text style={[styles.strategyMetricLabel, { color: theme.colors.textSecondary }]}>Win Rate</Text>
        </View>
      </View>
    </View>
  );

  const renderNewsCard = (news: NewsItem) => (
    <View key={news.id} style={[styles.newsCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.newsHeader}>
        <Text style={[styles.newsHeadline, { color: '#FFFFFF' }]}>{news.headline}</Text>
        <View style={[
          styles.newsImpactBadge,
          { backgroundColor: news.impact === 'high' ? 'rgba(239, 68, 68, 0.2)' : news.impact === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
        ]}>
          <Text style={[
            styles.newsImpact,
            { color: news.impact === 'high' ? '#EF4444' : news.impact === 'medium' ? '#F59E0B' : '#6B7280' }
          ]}>{news.impact.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.newsMeta}>
        <Text style={[styles.newsSource, { color: theme.colors.textSecondary }]}>{news.source}</Text>
        <Text style={[styles.newsTimestamp, { color: theme.colors.textSecondary }]}>{news.timestamp}</Text>
      </View>
      <View style={styles.newsSentiment}>
        <View style={[
          styles.newsSentimentDot,
          { backgroundColor: news.sentiment === 'positive' ? '#10B981' : news.sentiment === 'negative' ? '#EF4444' : '#6B7280' }
        ]} />
        <Text style={[styles.newsSentimentText, { color: theme.colors.textSecondary }]}>
          {news.sentiment.charAt(0).toUpperCase() + news.sentiment.slice(1)}
        </Text>
      </View>
      <View style={styles.newsSymbols}>
        {news.relatedSymbols.map((symbol, index) => (
          <View key={index} style={[styles.newsSymbolBadge, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <Text style={[styles.newsSymbol, { color: '#06B6D4' }]}>{symbol}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderOpportunityCard = (opportunity: Opportunity) => (
    <View key={opportunity.id} style={[styles.opportunityCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.opportunityHeader}>
        <Text style={[styles.opportunitySymbol, { color: '#FFFFFF' }]}>{opportunity.symbol}</Text>
        <View style={[
          styles.opportunityTypeBadge,
          { backgroundColor: opportunity.type === 'Long' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
        ]}>
          <Text style={[
            styles.opportunityType,
            { color: opportunity.type === 'Long' ? '#10B981' : '#EF4444' }
          ]}>{opportunity.type}</Text>
        </View>
      </View>
      <View style={styles.opportunityConviction}>
        <Text style={[styles.opportunityConvictionLabel, { color: theme.colors.textSecondary }]}>Conviction</Text>
        <View style={styles.opportunityConvictionBar}>
          <View style={[styles.opportunityConvictionFill, { width: `${opportunity.conviction}%`, backgroundColor: opportunity.conviction >= 90 ? '#10B981' : opportunity.conviction >= 75 ? '#06B6D4' : '#F59E0B' }]} />
        </View>
        <Text style={[styles.opportunityConvictionValue, { color: opportunity.conviction >= 90 ? '#10B981' : opportunity.conviction >= 75 ? '#06B6D4' : '#F59E0B' }]}>{opportunity.conviction}%</Text>
      </View>
      <View style={styles.opportunityPrices}>
        <View style={styles.opportunityPrice}>
          <Text style={[styles.opportunityPriceLabel, { color: theme.colors.textSecondary }]}>Entry</Text>
          <Text style={[styles.opportunityPriceValue, { color: '#FFFFFF' }]}>{opportunity.entryPrice}</Text>
        </View>
        <View style={styles.opportunityPrice}>
          <Text style={[styles.opportunityPriceLabel, { color: theme.colors.textSecondary }]}>Target</Text>
          <Text style={[styles.opportunityPriceValue, { color: '#10B981' }]}>{opportunity.targetPrice}</Text>
        </View>
        <View style={styles.opportunityPrice}>
          <Text style={[styles.opportunityPriceLabel, { color: theme.colors.textSecondary }]}>Stop</Text>
          <Text style={[styles.opportunityPriceValue, { color: '#EF4444' }]}>{opportunity.stopLoss}</Text>
        </View>
      </View>
      <Text style={[styles.opportunityReasoning, { color: theme.colors.textSecondary }]}>{opportunity.reasoning}</Text>
      <Text style={[styles.opportunityTimeframe, { color: '#8B5CF6' }]}>{opportunity.timeframe}</Text>
    </View>
  );

  const renderInsightCard = (insight: Insight) => (
    <View key={insight.id} style={[styles.insightCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.insightHeader}>
        <View style={[styles.insightCategoryBadge, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <Text style={[styles.insightCategory, { color: '#06B6D4' }]}>{insight.category}</Text>
        </View>
        <View style={[
          styles.insightImpactBadge,
          { backgroundColor: insight.impact === 'high' ? 'rgba(239, 68, 68, 0.2)' : insight.impact === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
        ]}>
          <Text style={[
            styles.insightImpact,
            { color: insight.impact === 'high' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#6B7280' }
          ]}>{insight.impact.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={[styles.insightText, { color: '#FFFFFF' }]}>{insight.insight}</Text>
      <View style={styles.insightFooter}>
        <View style={styles.insightConfidence}>
          <Text style={[styles.insightConfidenceLabel, { color: theme.colors.textSecondary }]}>Confidence</Text>
          <Text style={[styles.insightConfidenceValue, { color: '#06B6D4' }]}>{insight.confidence}%</Text>
        </View>
        <Text style={[styles.insightAction, { color: '#10B981' }]}>{insight.action}</Text>
        <Text style={[styles.insightTimestamp, { color: theme.colors.textSecondary }]}>{insight.timestamp}</Text>
      </View>
    </View>
  );

  const renderActivityItem = (activity: TradingActivity) => (
    <View key={activity.id} style={[styles.activityItem, { backgroundColor: theme.colors.card }]}>
      <View style={[
        styles.activityTypeDot,
        { backgroundColor: activity.type === 'trade' ? '#10B981' : activity.type === 'risk' ? '#EF4444' : activity.type === 'signal' ? '#06B6D4' : activity.type === 'market' ? '#F59E0B' : activity.type === 'strategy' ? '#8B5CF6' : '#EC4899' }
      ]} />
      <View style={styles.activityContent}>
        <Text style={[styles.activityEvent, { color: '#FFFFFF' }]}>{activity.event}</Text>
        {activity.details && <Text style={[styles.activityDetails, { color: theme.colors.textSecondary }]}>{activity.details}</Text>}
        <Text style={[styles.activityTimestamp, { color: theme.colors.textSecondary }]}>{activity.timestamp}</Text>
      </View>
    </View>
  );

  const renderSystemHealth = (system: SystemHealth) => (
    <View key={system.id} style={[styles.systemHealthCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.systemHealthHeader}>
        <Text style={[styles.systemHealthName, { color: theme.colors.text }]}>{system.system}</Text>
        <View style={[
          styles.systemHealthStatusDot,
          { backgroundColor: system.status === 'healthy' ? '#10B981' : system.status === 'degraded' ? '#F59E0B' : '#EF4444' }
        ]} />
      </View>
      <View style={styles.systemHealthMetrics}>
        <View style={styles.systemHealthMetric}>
          <Text style={[styles.systemHealthMetricValue, { color: '#10B981' }]}>{system.uptime}</Text>
          <Text style={[styles.systemHealthMetricLabel, { color: theme.colors.textSecondary }]}>Uptime</Text>
        </View>
        <View style={styles.systemHealthMetric}>
          <Text style={[styles.systemHealthMetricValue, { color: '#06B6D4' }]}>{system.latency}</Text>
          <Text style={[styles.systemHealthMetricLabel, { color: theme.colors.textSecondary }]}>Latency</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(5, 7, 10, 0.8)', borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <CandlestickChart size={32} color="#06B6D4" />
            <View style={styles.headerTitle}>
              <Text style={[styles.headerTitleText, { color: '#FFFFFF' }]}>AI Trading & Investments Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Autonomous Trading Operations & Portfolio Intelligence</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <Search size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <Bell size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <Settings size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.mainContent}>
        {/* Left Sidebar */}
        <View style={[styles.sidebar, { backgroundColor: 'rgba(5, 7, 10, 0.6)', borderRightColor: 'rgba(255,255,255,0.1)' }]}>
          <TouchableOpacity 
            style={styles.sidebarToggle}
            onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight size={20} color="rgba(255,255,255,0.6)" /> : <ChevronLeft size={20} color="rgba(255,255,255,0.6)" />}
          </TouchableOpacity>
          
          {!sidebarCollapsed && (
            <View style={styles.sidebarContent}>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.sidebarItem,
                      isActive && { backgroundColor: 'rgba(6, 182, 212, 0.15)' }
                    ]}
                    onPress={() => setActiveTab(item.id)}
                  >
                    <Icon 
                      size={18} 
                      color={isActive ? '#06B6D4' : 'rgba(255,255,255,0.6)'} 
                    />
                    <Text style={[
                      styles.sidebarItemText,
                      { color: isActive ? '#06B6D4' : 'rgba(255,255,255,0.6)' }
                    ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Main Content Area */}
        <ScrollView style={styles.content}>
        
        {/* Top Executive Bar - Trading KPIs */}
        <View style={[styles.topExecutiveBar, { backgroundColor: 'rgba(6, 182, 212, 0.08)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <View style={styles.topBarHeader}>
            <View style={styles.topBarTitle}>
              <TrendingUp size={20} color="#06B6D4" />
              <Text style={[styles.topBarTitleText, { color: '#FFFFFF' }]}>Trading & Investment KPIs</Text>
            </View>
            <View style={[styles.topBarLiveBadge, { backgroundColor: '#EF4444' + '20' }]}>
              <View style={[styles.topBarLiveDot, { backgroundColor: '#EF4444' }]} />
              <Text style={[styles.topBarLiveText, { color: '#EF4444' }]}>LIVE</Text>
            </View>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topBarScroll}>
            <View style={styles.topBarKPIs}>
              {tradingKPIs.map((kpi) => (
                <View key={kpi.id} style={[styles.topBarKPI, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: kpi.color + '40' }]}>
                  <Text style={[styles.topBarKPITitle, { color: 'rgba(255,255,255,0.7)' }]}>{kpi.title}</Text>
                  <Text style={[styles.topBarKPIValue, { color: kpi.color }]}>{kpi.value}</Text>
                  <View style={styles.topBarKPIMetrics}>
                    <View style={[
                      styles.topBarKPITrend,
                      { backgroundColor: kpi.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : kpi.trend === 'down' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)' }
                    ]}>
                      {kpi.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : 
                       kpi.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> : 
                       <Activity size={12} color="rgba(255,255,255,0.6)" />}
                      <Text style={[
                        styles.topBarKPITrendText,
                        { color: kpi.trend === 'up' ? '#10B981' : kpi.trend === 'down' ? '#EF4444' : 'rgba(255,255,255,0.6)' }
                      ]}>{kpi.change}</Text>
                    </View>
                    <Text style={[styles.topBarKPISubtitle, { color: 'rgba(255,255,255,0.5)' }]}>{kpi.subtitle}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* SECTION 1: AI TRADING AGENTS */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Trading Agents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {tradingAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* SECTION 2: CIO COMMAND CENTER */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>CIO Command Center</Text>
          <View style={[styles.commandCenter, { backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            
            {/* Command Center Header */}
            <View style={styles.commandCenterHeader}>
              <View style={styles.commandCenterTitle}>
                <Brain size={24} color="#06B6D4" />
                <View>
                  <Text style={[styles.commandCenterTitleText, { color: '#FFFFFF' }]}>Chief Investment Officer Dashboard</Text>
                  <Text style={[styles.commandCenterSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Real-time portfolio intelligence</Text>
                </View>
              </View>
              <View style={styles.commandCenterActions}>
                <TouchableOpacity style={[styles.commandCenterButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <RefreshCw size={16} color="#06B6D4" />
                  <Text style={[styles.commandCenterButtonText, { color: '#06B6D4' }]}>Refresh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.commandCenterButton, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <Download size={16} color="rgba(255,255,255,0.7)" />
                  <Text style={[styles.commandCenterButtonText, { color: 'rgba(255,255,255,0.7)' }]}>Export</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Primary Metrics Grid */}
            <View style={styles.commandCenterMetrics}>
              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(6, 182, 212, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <DollarSign size={20} color="#06B6D4" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Total AUM</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#06B6D4' }]}>$8.4B</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+$420M</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Assets Under Mgmt</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <TrendingUp size={20} color="#10B981" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Daily P&L</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>+$18.4M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+12.3%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Daily Profit/Loss</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Activity size={20} color="#8B5CF6" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Portfolio Return</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#8B5CF6' }]}>+22.8%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+2.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Year to Date</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Shield size={20} color="#F59E0B" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Risk Exposure</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#F59E0B' }]}>Low</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingDown size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>-8.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Portfolio Beta</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(236, 72, 153, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Brain size={20} color="#EC4899" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>AI Confidence</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#EC4899' }]}>94%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+1.2%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Prediction Accuracy</Text>
                </View>
              </View>
            </View>

            {/* Portfolio Health Overview */}
            <View style={styles.commandCenterHealth}>
              <View style={styles.healthOverview}>
                <Text style={[styles.healthOverviewTitle, { color: '#FFFFFF' }]}>Portfolio Health Score</Text>
                <View style={styles.healthScoreContainer}>
                  <Text style={[styles.healthScore, { color: '#10B981' }]}>94%</Text>
                  <View style={styles.healthScoreIndicator}>
                    <View style={[styles.healthScoreBar, { width: '94%', backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <Text style={[styles.healthScoreDescription, { color: 'rgba(255,255,255,0.6)' }]}>Excellent - All portfolio systems optimal</Text>
              </View>

              <View style={styles.healthBreakdown}>
                <Text style={[styles.healthBreakdownTitle, { color: '#FFFFFF' }]}>Performance Breakdown</Text>
                <View style={styles.healthBreakdownItems}>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#06B6D4' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Alpha Generation</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#06B6D4' }]}>+14.2%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Sharpe Ratio</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#10B981' }]}>2.84</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Win Rate</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#8B5CF6' }]}>71%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Risk Control</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#F59E0B' }]}>96%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 3: PORTFOLIO MANAGEMENT CENTER */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Portfolio Management Center</Text>
          <View style={[styles.portfolioCenter, { backgroundColor: theme.colors.card }]}>
            <View style={styles.portfolioHeader}>
              <Briefcase size={20} color="#06B6D4" />
              <Text style={[styles.portfolioHeaderTitle, { color: '#FFFFFF' }]}>Portfolio Overview</Text>
            </View>
            
            <View style={styles.portfolioMetrics}>
              <View style={styles.portfolioMetric}>
                <Text style={[styles.portfolioMetricLabel, { color: theme.colors.textSecondary }]}>Portfolio Value</Text>
                <Text style={[styles.portfolioMetricValue, { color: '#06B6D4' }]}>$8.4B</Text>
              </View>
              <View style={styles.portfolioMetric}>
                <Text style={[styles.portfolioMetricLabel, { color: theme.colors.textSecondary }]}>Asset Allocation</Text>
                <Text style={[styles.portfolioMetricValue, { color: '#10B981' }]}>88% Invested</Text>
              </View>
              <View style={styles.portfolioMetric}>
                <Text style={[styles.portfolioMetricLabel, { color: theme.colors.textSecondary }]}>Sector Exposure</Text>
                <Text style={[styles.portfolioMetricValue, { color: '#8B5CF6' }]}>12 Sectors</Text>
              </View>
              <View style={styles.portfolioMetric}>
                <Text style={[styles.portfolioMetricLabel, { color: theme.colors.textSecondary }]}>Geographic</Text>
                <Text style={[styles.portfolioMetricValue, { color: '#F59E0B' }]}>18 Countries</Text>
              </View>
            </View>

            {/* Asset Allocation Visualization */}
            <View style={styles.allocationSection}>
              <Text style={[styles.allocationTitle, { color: '#FFFFFF' }]}>Asset Allocation</Text>
              <View style={styles.allocationBars}>
                {[
                  { name: 'Equities', value: 45, color: '#06B6D4' },
                  { name: 'Fixed Income', value: 25, color: '#10B981' },
                  { name: 'Alternatives', value: 15, color: '#8B5CF6' },
                  { name: 'Commodities', value: 8, color: '#F59E0B' },
                  { name: 'Cash', value: 7, color: '#EC4899' },
                ].map((item, index) => (
                  <View key={index} style={styles.allocationBar}>
                    <View style={styles.allocationBarInfo}>
                      <View style={[styles.allocationBarDot, { backgroundColor: item.color }]} />
                      <Text style={[styles.allocationBarName, { color: 'rgba(255,255,255,0.8)' }]}>{item.name}</Text>
                    </View>
                    <View style={styles.allocationBarMetrics}>
                      <Text style={[styles.allocationBarValue, { color: '#FFFFFF' }]}>{item.value}%</Text>
                      <View style={[
                        styles.allocationBarFill,
                        { width: `${item.value}%`, backgroundColor: item.color }
                      ]} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 4: REAL-TIME MARKET INTELLIGENCE */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-Time Market Intelligence</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.marketScroll}>
            {marketData.map(renderMarketCard)}
          </ScrollView>
        </View>

        {/* SECTION 5: AI TRADING DESK */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Trading Desk</Text>
          <View style={[styles.tradingDesk, { backgroundColor: theme.colors.card }]}>
            <View style={styles.tradingDeskHeader}>
              <CandlestickChart size={20} color="#06B6D4" />
              <Text style={[styles.tradingDeskTitle, { color: '#FFFFFF' }]}>Active Trades</Text>
              <View style={[styles.tradingDeskBadge, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Text style={[styles.tradingDeskBadgeText, { color: '#06B6D4' }]}>{recentTrades.length} Active</Text>
              </View>
            </View>
            <View style={styles.tradesList}>
              {recentTrades.map(renderTradeRow)}
            </View>
          </View>
        </View>

        {/* SECTION 6: RISK MANAGEMENT WAR ROOM */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk Management War Room</Text>
          <View style={styles.riskGrid}>
            {riskMetrics.map(renderRiskMetric)}
          </View>
        </View>

        {/* SECTION 7: QUANTITATIVE STRATEGY CENTER */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quantitative Strategy Center</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.strategiesScroll}>
            {strategies.map(renderStrategyCard)}
          </ScrollView>
        </View>

        {/* SECTION 8: NEWS & SENTIMENT INTELLIGENCE */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>News & Sentiment Intelligence</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.newsScroll}>
            {newsItems.map(renderNewsCard)}
          </ScrollView>
        </View>

        {/* SECTION 9: ASSET ALLOCATION ENGINE */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Asset Allocation Engine</Text>
          <View style={[styles.allocationEngine, { backgroundColor: theme.colors.card }]}>
            <View style={styles.allocationEngineHeader}>
              <PieChart size={20} color="#06B6D4" />
              <Text style={[styles.allocationEngineTitle, { color: '#FFFFFF' }]}>Dynamic Allocation</Text>
            </View>
            <View style={styles.allocationEngineContent}>
              <Text style={[styles.allocationEngineText, { color: theme.colors.textSecondary }]}>
                AI-powered asset allocation optimization running. Next rebalance scheduled in 2 hours 34 minutes.
              </Text>
              <View style={[styles.allocationEngineButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Text style={[styles.allocationEngineButtonText, { color: '#06B6D4' }]}>View Optimization Engine</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 10: INVESTMENT OPPORTUNITY RADAR */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Investment Opportunity Radar</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.opportunitiesScroll}>
            {opportunities.map(renderOpportunityCard)}
          </ScrollView>
        </View>

        {/* SECTION 11: AI INVESTMENT INSIGHTS */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Investment Insights</Text>
          <View style={styles.insightsList}>
            {insights.map(renderInsightCard)}
          </View>
        </View>

        {/* SECTION 12: REAL-TIME TRADING FEED */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-Time Trading Feed</Text>
          <View style={[styles.tradingFeed, { backgroundColor: theme.colors.card }]}>
            <View style={styles.tradingFeedHeader}>
              <Radio size={20} color="#06B6D4" />
              <Text style={[styles.tradingFeedTitle, { color: '#FFFFFF' }]}>Live Market Activity</Text>
              <View style={[styles.tradingFeedLiveBadge, { backgroundColor: '#EF4444' + '20' }]}>
                <View style={[styles.tradingFeedLiveDot, { backgroundColor: '#EF4444' }]} />
                <Text style={[styles.tradingFeedLiveText, { color: '#EF4444' }]}>LIVE</Text>
              </View>
            </View>
            <View style={styles.activitiesList}>
              {tradingActivities.map(renderActivityItem)}
            </View>
          </View>
        </View>

        {/* SECTION 13: TRADING INFRASTRUCTURE HEALTH */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Trading Infrastructure Health</Text>
          <View style={styles.systemHealthGrid}>
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
    gap: 12,
  },
  headerTitle: {
    flex: 1,
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    color: 'rgba(255,255,255,0.6)',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  sidebarToggle: {
    padding: 8,
    alignItems: 'flex-end',
  },
  sidebarContent: {
    gap: 4,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  sidebarItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  topExecutiveBar: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  topBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  topBarTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topBarTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  topBarLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  topBarLiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  topBarLiveText: {
    fontSize: 12,
    fontWeight: '700',
  },
  topBarScroll: {
    marginBottom: 8,
  },
  topBarKPIs: {
    flexDirection: 'row',
    gap: 12,
  },
  topBarKPI: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  topBarKPITitle: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  topBarKPIValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  topBarKPIMetrics: {
    gap: 4,
  },
  topBarKPITrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  topBarKPITrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  topBarKPISubtitle: {
    fontSize: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  kpiCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiTitle: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
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
    fontSize: 12,
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  kpiSubtitle: {
    fontSize: 12,
  },
  agentsScroll: {
    marginBottom: 8,
  },
  agentCard: {
    width: 280,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginRight: 12,
  },
  agentAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentAvatarText: {
    fontSize: 32,
    marginRight: 8,
  },
  agentStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  agentInfo: {
    marginBottom: 12,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  agentSpecialty: {
    fontSize: 12,
  },
  agentMetrics: {
    flexDirection: 'row',
    gap: 16,
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
    textTransform: 'uppercase',
  },
  agentInsights: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  agentInsightsCount: {
    fontSize: 14,
    fontWeight: '700',
  },
  agentInsightsLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  commandCenter: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  commandCenterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  commandCenterTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  commandCenterTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  commandCenterSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  commandCenterActions: {
    flexDirection: 'row',
    gap: 8,
  },
  commandCenterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  commandCenterButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  commandCenterMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  commandMetricCard: {
    flex: 1,
    minWidth: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  commandMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  commandMetricLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  commandMetricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  commandMetricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commandMetricTrendText: {
    fontSize: 14,
    fontWeight: '600',
  },
  commandMetricPeriod: {
    fontSize: 10,
    marginLeft: 4,
  },
  commandCenterHealth: {
    flexDirection: 'row',
    gap: 20,
  },
  healthOverview: {
    flex: 1,
  },
  healthOverviewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  healthScoreContainer: {
    marginBottom: 8,
  },
  healthScore: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 8,
  },
  healthScoreIndicator: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  healthScoreBar: {
    height: '100%',
  },
  healthScoreDescription: {
    fontSize: 12,
  },
  healthBreakdown: {
    flex: 1,
  },
  healthBreakdownTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  healthBreakdownItems: {
    gap: 8,
  },
  healthBreakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  healthBreakdownDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  healthBreakdownLabel: {
    flex: 1,
    fontSize: 12,
  },
  healthBreakdownValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  portfolioCenter: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  portfolioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  portfolioHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  portfolioMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  portfolioMetric: {
    flex: 1,
  },
  portfolioMetricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  portfolioMetricValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  allocationSection: {
    marginTop: 16,
  },
  allocationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  allocationBars: {
    gap: 12,
  },
  allocationBar: {
    gap: 8,
  },
  allocationBarInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  allocationBarDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  allocationBarName: {
    fontSize: 12,
  },
  allocationBarMetrics: {
    gap: 4,
  },
  allocationBarValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  allocationBarFill: {
    height: 6,
    borderRadius: 3,
  },
  marketScroll: {
    marginBottom: 8,
  },
  marketCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
  },
  marketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  marketSymbol: {
    fontSize: 14,
    fontWeight: '700',
  },
  marketChangeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  marketChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  marketPrice: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  marketName: {
    fontSize: 10,
    marginBottom: 8,
  },
  marketFooter: {
    gap: 2,
  },
  marketVolume: {
    fontSize: 10,
  },
  marketCap: {
    fontSize: 10,
  },
  tradingDesk: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  tradingDeskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  tradingDeskTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  tradingDeskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tradingDeskBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  tradesList: {
    gap: 8,
  },
  tradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    padding: 12,
  },
  tradeTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tradeType: {
    fontSize: 10,
    fontWeight: '700',
  },
  tradeInfo: {
    flex: 1,
  },
  tradeSymbol: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  tradeQuantity: {
    fontSize: 12,
  },
  tradeMeta: {
    flex: 1,
  },
  tradeStrategy: {
    fontSize: 12,
    marginBottom: 2,
  },
  tradeTimestamp: {
    fontSize: 10,
  },
  tradeStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tradeStatus: {
    fontSize: 10,
    fontWeight: '700',
  },
  riskGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  riskMetricCard: {
    flex: 1,
    minWidth: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  riskMetricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  riskMetricName: {
    fontSize: 12,
    fontWeight: '500',
  },
  riskStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  riskMetricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  riskMetricThreshold: {
    fontSize: 12,
  },
  strategiesScroll: {
    marginBottom: 8,
  },
  strategyCard: {
    width: 240,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
  },
  strategyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  strategyName: {
    fontSize: 14,
    fontWeight: '700',
  },
  strategyStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  strategyStatus: {
    fontSize: 10,
    fontWeight: '700',
  },
  strategyType: {
    fontSize: 12,
    marginBottom: 12,
  },
  strategyMetrics: {
    flexDirection: 'row',
    gap: 8,
  },
  strategyMetric: {
    flex: 1,
  },
  strategyMetricValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  strategyMetricLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  newsScroll: {
    marginBottom: 8,
  },
  newsCard: {
    width: 280,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  newsHeadline: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  newsImpactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  newsImpact: {
    fontSize: 10,
    fontWeight: '700',
  },
  newsMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  newsSource: {
    fontSize: 12,
  },
  newsTimestamp: {
    fontSize: 12,
  },
  newsSentiment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  newsSentimentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  newsSentimentText: {
    fontSize: 12,
  },
  newsSymbols: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  newsSymbolBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  newsSymbol: {
    fontSize: 10,
    fontWeight: '700',
  },
  allocationEngine: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  allocationEngineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  allocationEngineTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  allocationEngineContent: {
    gap: 12,
  },
  allocationEngineText: {
    fontSize: 14,
    lineHeight: 20,
  },
  allocationEngineButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  allocationEngineButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  opportunitiesScroll: {
    marginBottom: 8,
  },
  opportunityCard: {
    width: 260,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
  },
  opportunityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  opportunitySymbol: {
    fontSize: 18,
    fontWeight: '700',
  },
  opportunityTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  opportunityType: {
    fontSize: 12,
    fontWeight: '700',
  },
  opportunityConviction: {
    marginBottom: 12,
  },
  opportunityConvictionLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  opportunityConvictionBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  opportunityConvictionFill: {
    height: '100%',
  },
  opportunityConvictionValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  opportunityPrices: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  opportunityPrice: {
    flex: 1,
  },
  opportunityPriceLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  opportunityPriceValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  opportunityReasoning: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 16,
  },
  opportunityTimeframe: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightsList: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightCategoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  insightCategory: {
    fontSize: 10,
    fontWeight: '700',
  },
  insightImpactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  insightImpact: {
    fontSize: 10,
    fontWeight: '700',
  },
  insightText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  insightFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  insightConfidence: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  insightConfidenceLabel: {
    fontSize: 10,
  },
  insightConfidenceValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  insightAction: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  insightTimestamp: {
    fontSize: 10,
  },
  tradingFeed: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  tradingFeedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  tradingFeedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  tradingFeedLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tradingFeedLiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tradingFeedLiveText: {
    fontSize: 12,
    fontWeight: '700',
  },
  activitiesList: {
    gap: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderRadius: 12,
    padding: 12,
  },
  activityTypeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  activityContent: {
    flex: 1,
  },
  activityEvent: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDetails: {
    fontSize: 12,
    marginBottom: 4,
  },
  activityTimestamp: {
    fontSize: 10,
  },
  systemHealthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  systemHealthCard: {
    flex: 1,
    minWidth: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  systemHealthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  systemHealthName: {
    fontSize: 12,
    fontWeight: '500',
  },
  systemHealthStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  systemHealthMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  systemHealthMetric: {
    flex: 1,
  },
  systemHealthMetricValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  systemHealthMetricLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
});

export default TradingCommandCenter;
