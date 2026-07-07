import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  User,
  Activity, 
  Target, 
  Clock,
  Briefcase,
  Shield,
  FileText,
  BarChart3,
  Zap,
  CheckCircle,
  AlertCircle,
  Building,
  ShoppingCart,
  Heart,
  Globe,
  Truck,
  Factory,
  GraduationCap,
  Utensils,
  Gamepad2,
  Film,
  Lightbulb,
  Database,
  Scale,
  Gavel,
  Lock,
  Cpu,
  Wrench,
  Calendar,
  MessageSquare,
  PieChart,
  LineChart,
  Brain,
  ArrowDown,
  Newspaper,
  MessageCircle,
  Server,
  Wifi,
  HardDrive,
  Star,
  Rocket,
  Sparkles,
  // Agriculture specific icons
  Sprout,
  Leaf,
  Wheat,
  Droplet,
  CloudRain,
  Tractor,
  Thermometer,
  Wind,
  TreePine,
  Factory2,
  Warehouse,
  Map,
  Satellite,
  Bug,
  ShieldCheck,
  Flame,
  Sun,
  Cloud,
  Gauge,
  Navigation,
  Radio,
  Microscope,
  Beaker,
  ThermometerSun,
  Waves,
  Mountain,
} from 'lucide-react-native';
import { DepartmentDashboardConfig } from '@/components/ai-agent/dashboard/types';

// Trading Department Configuration - Institutional Grade
export const tradingDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'trading-investment',
  departmentName: 'Trading & Investments',
  primaryColor: '#22C55E',
  metrics: [
    {
      id: 'realized-pnl',
      title: 'Realized P&L',
      value: '$124,567',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: '24h Performance'
    },
    {
      id: 'win-rate',
      title: 'Win Rate',
      value: '68.4%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: '#3B82F6',
      subtitle: 'Last 100 trades'
    },
    {
      id: 'trade-count',
      title: 'Trade Count',
      value: '1,247',
      change: '+45',
      trend: 'up',
      icon: Activity,
      color: '#F59E0B',
      subtitle: 'Today'
    },
    {
      id: 'win-streak',
      title: 'Win Streak',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: TrendingUp,
      color: '#22C55E',
      subtitle: 'Current streak'
    },
    {
      id: 'daily-avg',
      title: 'Daily Avg',
      value: '$2,450',
      change: '+8.3%',
      trend: 'up',
      icon: BarChart3,
      color: '#8B5CF6',
      subtitle: 'Average per day'
    },
    {
      id: 'active-positions',
      title: 'Active Positions',
      value: '23',
      change: '-2',
      trend: 'down',
      icon: Briefcase,
      color: '#EF4444',
      subtitle: 'Open trades'
    },
  ],
  pipeline: [
    {
      id: 'signal',
      name: 'Signal Generation',
      status: 'completed',
      duration: '0.2s',
      description: 'AI analysis complete',
      lastUpdate: '12:45:32'
    },
    {
      id: 'validation',
      name: 'Validation',
      status: 'completed',
      duration: '0.5s',
      description: 'Risk check passed',
      lastUpdate: '12:45:33'
    },
    {
      id: 'execution',
      name: 'Execution',
      status: 'active',
      duration: 'pending',
      description: 'Processing order',
      lastUpdate: '12:45:33'
    },
    {
      id: 'confirmation',
      name: 'Confirmation',
      status: 'pending',
      duration: 'pending',
      description: 'Awaiting fill',
    },
    {
      id: 'settlement',
      name: 'Settlement',
      status: 'pending',
      duration: 'pending',
      description: 'T+2 settlement',
    },
    {
      id: 'reconciliation',
      name: 'Reconciliation',
      status: 'pending',
      duration: 'pending',
      description: 'Ledger update',
    },
  ],
  activity: [
    {
      id: 'act-1',
      task: 'BTC/USD long position opened at $67,450',
      status: 'completed',
      time: '2m ago',
      impact: 'high',
      agent: 'Trading Bot Alpha'
    },
    {
      id: 'act-2',
      task: 'ETH/USD short position closed with +4.2% profit',
      status: 'completed',
      time: '5m ago',
      impact: 'medium',
      agent: 'Trading Bot Beta'
    },
    {
      id: 'act-3',
      task: 'Risk assessment for SOL position',
      status: 'processing',
      time: '8m ago',
      impact: 'high',
      agent: 'Risk Manager'
    },
    {
      id: 'act-4',
      task: 'Market data feed synchronization',
      status: 'completed',
      time: '12m ago',
      impact: 'low',
      agent: 'Data Feed'
    },
    {
      id: 'act-5',
      task: 'Portfolio rebalancing calculation',
      status: 'pending',
      time: '15m ago',
      impact: 'medium',
      agent: 'Portfolio Manager'
    },
  ],
  charts: {
    performance: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Daily P&L',
          data: [12000, -5000, 18000, 8000, 15000, 22000, 12467],
          color: '#22C55E',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Cumulative P&L',
          data: [45000, 52000, 68000, 89000],
          color: '#3B82F6'
        }
      ]
    }
  },
  // Institutional-grade sections
  aiDecisionMatrix: {
    signals: [
      { id: 'signal-1', type: 'buy', confidence: 92, label: 'BTC/USD' },
      { id: 'signal-2', type: 'sell', confidence: 78, label: 'ETH/USD' },
      { id: 'signal-3', type: 'buy', confidence: 85, label: 'SOL/USD' },
      { id: 'signal-4', type: 'hold', confidence: 65, label: 'SPY' },
      { id: 'signal-5', type: 'buy', confidence: 88, label: 'QQQ' },
    ],
    marketSentiment: 'bullish',
    macroSentiment: 'bullish',
    volatilityPrediction: 45.2,
  },
  riskEngine: {
    metrics: [
      { id: 'risk-1', label: 'Portfolio Risk', value: 72, max: 100, color: '#F59E0B', icon: Shield },
      { id: 'risk-2', label: 'VaR (95%)', value: 45000, max: 100000, color: '#10B981', icon: AlertCircle },
      { id: 'risk-3', label: 'Max Drawdown', value: 12.5, max: 50, color: '#10B981', icon: TrendingDown },
      { id: 'risk-4', label: 'Leverage', value: 2.4, max: 5, color: '#10B981', icon: Zap },
      { id: 'risk-5', label: 'Exposure', value: 85, max: 100, color: '#F59E0B', icon: Activity },
      { id: 'risk-6', label: 'Liquidity Risk', value: 23, max: 100, color: '#10B981', icon: DollarSign },
    ],
    overallRiskScore: 42,
  },
  executionPipeline: {
    steps: [
      { id: 'step-1', name: 'Market Scan', status: 'completed', duration: '0.1s', latency: '5ms', description: '847 opportunities scanned' },
      { id: 'step-2', name: 'Signal Generated', status: 'completed', duration: '0.2s', latency: '12ms', description: 'AI analysis complete' },
      { id: 'step-3', name: 'Risk Validation', status: 'completed', duration: '0.3s', latency: '8ms', description: 'Risk check passed' },
      { id: 'step-4', name: 'Position Sizing', status: 'completed', duration: '0.1s', latency: '3ms', description: 'Size: $125,000' },
      { id: 'step-5', name: 'Order Routing', status: 'active', duration: 'pending', latency: 'pending', description: 'Routing to exchange' },
      { id: 'step-6', name: 'Execution', status: 'pending', duration: 'pending', latency: 'pending', description: 'Awaiting fill' },
      { id: 'step-7', name: 'Monitoring', status: 'pending', duration: 'pending', latency: 'pending', description: 'Position tracking' },
    ],
    totalLatency: '45ms',
    fillRate: 99.2,
    slippage: 0.08,
  },
  marketIntelligence: {
    news: [
      { id: 'news-1', title: 'Fed signals potential rate cut in Q4', sentiment: 'positive', time: '2h ago', source: 'Reuters' },
      { id: 'news-2', title: 'Bitcoin ETF sees record inflows', sentiment: 'positive', time: '4h ago', source: 'Bloomberg' },
      { id: 'news-3', title: 'Tech sector faces regulatory scrutiny', sentiment: 'negative', time: '6h ago', source: 'WSJ' },
    ],
    socialSentiment: [
      { platform: 'Twitter', sentiment: 12, mentions: 45234 },
      { platform: 'Reddit', sentiment: 8, mentions: 12890 },
      { platform: 'Discord', sentiment: 15, mentions: 8765 },
    ],
    whaleAlerts: [
      { id: 'whale-1', asset: 'BTC', amount: '500 BTC', type: 'buy', time: '15m ago' },
      { id: 'whale-2', asset: 'ETH', amount: '10,000 ETH', type: 'sell', time: '1h ago' },
    ],
    fearGreedIndex: 72,
  },
  aiPredictionCenter: {
    forecast24h: [
      { period: '0h', predicted: 67450, confidence: 95 },
      { period: '4h', predicted: 67800, confidence: 92 },
      { period: '8h', predicted: 68200, confidence: 88 },
      { period: '12h', predicted: 67900, confidence: 85 },
      { period: '16h', predicted: 68500, confidence: 82 },
      { period: '20h', predicted: 68800, confidence: 78 },
      { period: '24h', predicted: 69200, confidence: 75 },
    ],
    forecast7d: [
      { period: 'Day 1', predicted: 69200, confidence: 75 },
      { period: 'Day 2', predicted: 69800, confidence: 72 },
      { period: 'Day 3', predicted: 70500, confidence: 68 },
      { period: 'Day 4', predicted: 70200, confidence: 65 },
      { period: 'Day 5', predicted: 71000, confidence: 62 },
      { period: 'Day 6', predicted: 71500, confidence: 58 },
      { period: 'Day 7', predicted: 72000, confidence: 55 },
    ],
    volatilityForecast: 42.5,
    probabilityDistribution: {
      bullish: 65,
      neutral: 25,
      bearish: 10,
    },
  },
  systemHealth: {
    metrics: [
      { id: 'health-1', label: 'CPU Usage', value: 45, max: 100, unit: '%', icon: Cpu, status: 'healthy' },
      { id: 'health-2', label: 'GPU Usage', value: 72, max: 100, unit: '%', icon: Activity, status: 'warning' },
      { id: 'health-3', label: 'Memory', value: 68, max: 100, unit: '%', icon: HardDrive, status: 'healthy' },
      { id: 'health-4', label: 'Disk', value: 34, max: 100, unit: '%', icon: HardDrive, status: 'healthy' },
    ],
    modelLatency: 85,
    apiHealth: 'operational',
    exchangeConnectivity: [
      { exchange: 'Binance', status: 'connected', latency: 12 },
      { exchange: 'Coinbase', status: 'connected', latency: 18 },
      { exchange: 'Kraken', status: 'connected', latency: 24 },
      { exchange: 'Bybit', status: 'disconnected', latency: 0 },
    ],
    dataFeedQuality: 98.5,
  },
};

// Finance Department Configuration
export const financeDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'finance',
  departmentName: 'Finance',
  primaryColor: '#3B82F6',
  metrics: [
    {
      id: 'cash-flow',
      title: 'Cash Flow',
      value: '$2.4M',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Monthly'
    },
    {
      id: 'budget-util',
      title: 'Budget Utilization',
      value: '78.5%',
      change: '-2.1%',
      trend: 'down',
      icon: PieChart,
      color: '#3B82F6',
      subtitle: 'Q3 2026'
    },
    {
      id: 'expenses',
      title: 'Total Expenses',
      value: '$1.8M',
      change: '+5.4%',
      trend: 'up',
      icon: ShoppingCart,
      color: '#EF4444',
      subtitle: 'This month'
    },
    {
      id: 'revenue-forecast',
      title: 'Revenue Forecast',
      value: '$4.2M',
      change: '+12.3%',
      trend: 'up',
      icon: TrendingUp,
      color: '#22C55E',
      subtitle: 'Q4 projection'
    },
    {
      id: 'risk-score',
      title: 'Risk Score',
      value: 'Low',
      change: 'Stable',
      trend: 'stable',
      icon: Shield,
      color: '#22C55E',
      subtitle: 'Overall risk'
    },
    {
      id: 'compliance',
      title: 'Compliance',
      value: '99.2%',
      change: '+0.3%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Audit score'
    },
  ],
  pipeline: [
    {
      id: 'invoice',
      name: 'Invoice Processing',
      status: 'completed',
      duration: '2.1s',
      description: '234 invoices processed'
    },
    {
      id: 'approval',
      name: 'Approval Workflow',
      status: 'active',
      duration: 'pending',
      description: '45 pending approvals'
    },
    {
      id: 'payment',
      name: 'Payment Execution',
      status: 'pending',
      duration: 'pending',
      description: 'Scheduled payments'
    },
    {
      id: 'reconciliation',
      name: 'Bank Reconciliation',
      status: 'pending',
      duration: 'pending',
      description: 'Daily reconciliation'
    },
  ],
  activity: [
    {
      id: 'f-act-1',
      task: 'Q3 financial report generated',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'Financial Analyst'
    },
    {
      id: 'f-act-2',
      task: 'Budget variance analysis complete',
      status: 'completed',
      time: '3h ago',
      impact: 'medium',
      agent: 'Budget Manager'
    },
    {
      id: 'f-act-3',
      task: 'Processing vendor payments',
      status: 'processing',
      time: '5h ago',
      impact: 'high',
      agent: 'AP Automation'
    },
  ]
};

// HR Department Configuration
export const hrDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'human-resources',
  departmentName: 'Human Resources',
  primaryColor: '#8B5CF6',
  metrics: [
    {
      id: 'employee-count',
      title: 'Total Employees',
      value: '2,847',
      change: '+23',
      trend: 'up',
      icon: Users,
      color: '#3B82F6',
      subtitle: 'Active headcount'
    },
    {
      id: 'engagement',
      title: 'Engagement Score',
      value: '87.3%',
      change: '+2.4%',
      trend: 'up',
      icon: Heart,
      color: '#22C55E',
      subtitle: 'Employee satisfaction'
    },
    {
      id: 'hiring-rate',
      title: 'Hiring Rate',
      value: '12.5%',
      change: '+1.8%',
      trend: 'up',
      icon: Briefcase,
      color: '#22C55E',
      subtitle: 'Monthly growth'
    },
    {
      id: 'retention',
      title: 'Retention Rate',
      value: '94.2%',
      change: '+0.5%',
      trend: 'up',
      icon: Shield,
      color: '#22C55E',
      subtitle: '12-month rate'
    },
    {
      id: 'training',
      title: 'Training Complete',
      value: '78.9%',
      change: '+5.2%',
      trend: 'up',
      icon: GraduationCap,
      color: '#8B5CF6',
      subtitle: 'Compliance training'
    },
    {
      id: 'open-positions',
      title: 'Open Positions',
      value: '47',
      change: '-12',
      trend: 'down',
      icon: Target,
      color: '#F59E0B',
      subtitle: 'Active job postings'
    },
  ],
  pipeline: [
    {
      id: 'sourcing',
      name: 'Candidate Sourcing',
      status: 'completed',
      duration: '1.2s',
      description: '234 candidates sourced'
    },
    {
      id: 'screening',
      name: 'Screening',
      status: 'active',
      duration: 'pending',
      description: '89 candidates in review'
    },
    {
      id: 'interview',
      name: 'Interview Scheduling',
      status: 'pending',
      duration: 'pending',
      description: '34 interviews scheduled'
    },
    {
      id: 'onboarding',
      name: 'Onboarding',
      status: 'pending',
      duration: 'pending',
      description: '12 new hires this week'
    },
  ],
  activity: [
    {
      id: 'hr-act-1',
      task: 'New employee onboarding completed',
      status: 'completed',
      time: '2h ago',
      impact: 'medium',
      agent: 'Onboarding Bot'
    },
    {
      id: 'hr-act-2',
      task: 'Performance review cycle initiated',
      status: 'processing',
      time: '4h ago',
      impact: 'high',
      agent: 'HR Manager'
    },
    {
      id: 'hr-act-3',
      task: 'Benefits enrollment reminder sent',
      status: 'completed',
      time: '6h ago',
      impact: 'medium',
      agent: 'Benefits Admin'
    },
  ]
};

// Marketing Department Configuration
export const marketingDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'marketing',
  departmentName: 'Marketing',
  primaryColor: '#EC4899',
  metrics: [
    {
      id: 'campaign-roi',
      title: 'Campaign ROI',
      value: '324%',
      change: '+18.5%',
      trend: 'up',
      icon: TrendingUp,
      color: '#22C55E',
      subtitle: 'Average across campaigns'
    },
    {
      id: 'conversion-rate',
      title: 'Conversion Rate',
      value: '4.8%',
      change: '+0.7%',
      trend: 'up',
      icon: Target,
      color: '#22C55E',
      subtitle: 'Website conversions'
    },
    {
      id: 'cac',
      title: 'Customer Acquisition Cost',
      value: '$142',
      change: '-8.2%',
      trend: 'down',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Per new customer'
    },
    {
      id: 'brand-sentiment',
      title: 'Brand Sentiment',
      value: 'Positive',
      change: '+5.4%',
      trend: 'up',
      icon: Heart,
      color: '#22C55E',
      subtitle: 'Social media score'
    },
    {
      id: 'ad-spend',
      title: 'Ad Spend',
      value: '$89K',
      change: '+12.3%',
      trend: 'up',
      icon: ShoppingCart,
      color: '#F59E0B',
      subtitle: 'This month'
    },
    {
      id: 'impressions',
      title: 'Impressions',
      value: '12.4M',
      change: '+22.1%',
      trend: 'up',
      icon: Activity,
      color: '#3B82F6',
      subtitle: 'Total reach'
    },
  ],
  pipeline: [
    {
      id: 'campaign',
      name: 'Campaign Creation',
      status: 'completed',
      duration: '2.5s',
      description: '12 campaigns active'
    },
    {
      id: 'targeting',
      name: 'Audience Targeting',
      status: 'active',
      duration: 'pending',
      description: 'AI segmentation running'
    },
    {
      id: 'delivery',
      name: 'Ad Delivery',
      status: 'pending',
      duration: 'pending',
      description: 'Platform distribution'
    },
    {
      id: 'optimization',
      name: 'Performance Optimization',
      status: 'pending',
      duration: 'pending',
      description: 'Real-time bidding'
    },
  ],
  activity: [
    {
      id: 'mkt-act-1',
      task: 'New campaign "Summer Sale" launched',
      status: 'completed',
      time: '30m ago',
      impact: 'high',
      agent: 'Campaign Manager'
    },
    {
      id: 'mkt-act-2',
      task: 'A/B test results analyzed',
      status: 'completed',
      time: '2h ago',
      impact: 'medium',
      agent: 'Analytics Bot'
    },
    {
      id: 'mkt-act-3',
      task: 'Social media content scheduled',
      status: 'processing',
      time: '3h ago',
      impact: 'medium',
      agent: 'Content Scheduler'
    },
  ]
};

// Sales Department Configuration - Revenue Command Center
export const salesDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'sales',
  departmentName: 'Sales & Revenue',
  primaryColor: '#F59E0B',
  metrics: [
    {
      id: 'pipeline-value',
      title: 'Pipeline Value',
      value: '$9.4M',
      change: '+15.2%',
      trend: 'up',
      icon: TrendingUp,
      color: '#22C55E',
      subtitle: 'Total opportunities'
    },
    {
      id: 'mrr',
      title: 'MRR',
      value: '$1.8M',
      change: '+8.7%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Monthly recurring revenue'
    },
    {
      id: 'arr',
      title: 'ARR',
      value: '$21.6M',
      change: '+12.4%',
      trend: 'up',
      icon: TrendingUp,
      color: '#22C55E',
      subtitle: 'Annual recurring revenue'
    },
    {
      id: 'win-rate',
      title: 'Win Rate',
      value: '42.8%',
      change: '+2.4%',
      trend: 'up',
      icon: Target,
      color: '#22C55E',
      subtitle: 'Closed won ratio'
    },
    {
      id: 'leads',
      title: 'New Leads',
      value: '1,240',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      color: '#3B82F6',
      subtitle: 'This week'
    },
    {
      id: 'quota-attainment',
      title: 'Quota Attainment',
      value: '112%',
      change: '+8.4%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Team average'
    },
  ],
  pipeline: [
    {
      id: 'lead',
      name: 'Lead Generation',
      status: 'completed',
      duration: '1.8s',
      description: '1,240 new leads'
    },
    {
      id: 'qualification',
      name: 'Lead Qualification',
      status: 'active',
      duration: 'pending',
      description: '234 leads in review'
    },
    {
      id: 'proposal',
      name: 'Proposal',
      status: 'pending',
      duration: 'pending',
      description: '89 proposals sent'
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      status: 'pending',
      duration: 'pending',
      description: '45 deals in negotiation'
    },
    {
      id: 'close',
      name: 'Closing',
      status: 'pending',
      duration: 'pending',
      description: '12 deals closing this week'
    },
  ],
  activity: [
    {
      id: 'sales-act-1',
      task: 'Enterprise deal closed - $450K',
      status: 'completed',
      time: '1h ago',
      impact: 'critical',
      agent: 'Sales Executive'
    },
    {
      id: 'sales-act-2',
      task: 'Proposal sent to Fortune 500 client',
      status: 'completed',
      time: '3h ago',
      impact: 'high',
      agent: 'Sales Manager'
    },
    {
      id: 'sales-act-3',
      task: 'Lead scoring updated',
      status: 'processing',
      time: '4h ago',
      impact: 'medium',
      agent: 'Lead Scorer'
    },
  ],
  // Sales & Revenue specific sections
  salesPipeline: {
    stages: [
      { name: 'Visitors', value: 45000, conversionRate: 100, revenue: 0 },
      { name: 'Leads', value: 12400, conversionRate: 27.6, revenue: 0 },
      { name: 'MQLs', value: 6200, conversionRate: 50.0, revenue: 0 },
      { name: 'SQLs', value: 3100, conversionRate: 50.0, revenue: 0 },
      { name: 'Opportunities', value: 870, conversionRate: 28.1, revenue: 9400000 },
      { name: 'Negotiation', value: 450, conversionRate: 51.7, revenue: 6200000 },
      { name: 'Closed Won', value: 184, conversionRate: 40.9, revenue: 2400000 },
    ],
    totalPipeline: 9400000,
    conversionRate: 1.5,
  },
  liveDeals: {
    deals: [
      { id: 'deal-1', company: 'Acme Corp', value: 450000, stage: 'Negotiation', probability: 85, owner: 'John Smith', aiRecommendation: 'Close this week', nextAction: 'Send contract' },
      { id: 'deal-2', company: 'TechStart Inc', value: 280000, stage: 'Proposal', probability: 65, owner: 'Sarah Jones', aiRecommendation: 'Follow up', nextAction: 'Schedule demo' },
      { id: 'deal-3', company: 'Global Solutions', value: 520000, stage: 'Discovery', probability: 45, owner: 'Mike Brown', aiRecommendation: 'Qualify further', nextAction: 'Research needs' },
      { id: 'deal-4', company: 'Innovate Labs', value: 180000, stage: 'Negotiation', probability: 90, owner: 'Emily Davis', aiRecommendation: 'High priority', nextAction: 'Final terms' },
      { id: 'deal-5', company: 'Enterprise Co', value: 750000, stage: 'Proposal', probability: 55, owner: 'John Smith', aiRecommendation: 'Add incentives', nextAction: 'Review pricing' },
    ],
  },
  leadIntelligence: {
    leads: [
      { id: 'lead-1', company: 'Fortune 500 Corp', source: 'LinkedIn', score: 92, intent: 'high', industry: 'Technology', companySize: '10,000+' },
      { id: 'lead-2', company: 'Startup XYZ', source: 'Website', score: 78, intent: 'high', industry: 'SaaS', companySize: '50-100' },
      { id: 'lead-3', company: 'Midsize Inc', source: 'Referral', score: 65, intent: 'medium', industry: 'Finance', companySize: '500-1000' },
      { id: 'lead-4', company: 'Global Enterprise', source: 'Trade Show', score: 88, intent: 'high', industry: 'Healthcare', companySize: '5000+' },
      { id: 'lead-5', company: 'Local Business', source: 'Cold Outreach', score: 45, intent: 'low', industry: 'Retail', companySize: '10-50' },
    ],
    totalLeads: 1240,
    avgScore: 73.6,
  },
  revenueForecast: {
    monthly: 186450,
    quarterly: 559350,
    annual: 6712200,
    bestCase: 7500000,
    expectedCase: 6712200,
    worstCase: 5800000,
    forecastAccuracy: 94.2,
    months: [
      { month: 'Jan', forecast: 180000, actual: 175000 },
      { month: 'Feb', forecast: 185000, actual: 192000 },
      { month: 'Mar', forecast: 190000, actual: 188000 },
      { month: 'Apr', forecast: 195000, actual: 198000 },
      { month: 'May', forecast: 200000, actual: 205000 },
      { month: 'Jun', forecast: 205000 },
      { month: 'Jul', forecast: 210000 },
      { month: 'Aug', forecast: 215000 },
      { month: 'Sep', forecast: 220000 },
      { month: 'Oct', forecast: 225000 },
      { month: 'Nov', forecast: 230000 },
      { month: 'Dec', forecast: 235000 },
    ],
  },
  salesPerformance: {
    performers: [
      { name: 'John Smith', role: 'Sales Executive', revenueClosed: 450000, conversionRate: 48.5, meetingsBooked: 45, dealsWon: 12, quotaAttainment: 125 },
      { name: 'Sarah Jones', role: 'Account Executive', revenueClosed: 380000, conversionRate: 45.2, meetingsBooked: 38, dealsWon: 10, quotaAttainment: 118 },
      { name: 'Mike Brown', role: 'Sales Manager', revenueClosed: 520000, conversionRate: 52.1, meetingsBooked: 52, dealsWon: 14, quotaAttainment: 142 },
      { name: 'Emily Davis', role: 'SDR Agent', revenueClosed: 180000, conversionRate: 38.7, meetingsBooked: 67, dealsWon: 8, quotaAttainment: 95 },
      { name: 'Alex Wilson', role: 'Sales Rep', revenueClosed: 290000, conversionRate: 42.3, meetingsBooked: 41, dealsWon: 9, quotaAttainment: 105 },
    ],
  },
  customerIntelligence: {
    expansionOpportunities: 234,
    renewalRisks: 18,
    upsellPotential: 620000,
    avgHealthScore: 87.5,
    buyingSignals: 156,
  },
  aiInsights: {
    insights: [
      { id: 'insight-1', type: 'opportunity', title: 'Enterprise segment growing 34%', description: 'Enterprise deals showing strong momentum with 23 new opportunities', impact: 'high', action: 'Prioritize enterprise outreach' },
      { id: 'insight-2', type: 'recommendation', title: '23 deals need follow-up', description: 'High-value deals stalled in negotiation stage require immediate attention', impact: 'high', action: 'Schedule follow-up calls' },
      { id: 'insight-3', type: 'opportunity', title: 'Upsell opportunity worth $620K', description: '14 accounts showing strong expansion signals and upsell potential', impact: 'medium', action: 'Create expansion proposals' },
      { id: 'insight-4', type: 'risk', title: 'Churn risk detected in 8 accounts', description: 'Customer health scores declining in key accounts requiring intervention', impact: 'high', action: 'Engage customer success team' },
      { id: 'insight-5', type: 'recommendation', title: 'Lead quality improving', description: 'AI lead scoring showing 15% improvement in lead-to-opportunity conversion', impact: 'medium', action: 'Increase lead generation budget' },
    ],
  },
};

// Operations Department Configuration
export const operationsDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'operations',
  departmentName: 'Operations',
  primaryColor: '#6366F1',
  metrics: [
    {
      id: 'efficiency',
      title: 'Operational Efficiency',
      value: '94.2%',
      change: '+3.1%',
      trend: 'up',
      icon: Zap,
      color: '#22C55E',
      subtitle: 'Process optimization'
    },
    {
      id: 'throughput',
      title: 'Daily Throughput',
      value: '12,847',
      change: '+8.4%',
      trend: 'up',
      icon: Activity,
      color: '#22C55E',
      subtitle: 'Units processed'
    },
    {
      id: 'uptime',
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: '30-day average'
    },
    {
      id: 'backlog',
      title: 'Backlog',
      value: '234',
      change: '-18.2%',
      trend: 'down',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Pending tasks'
    },
    {
      id: 'quality',
      title: 'Quality Score',
      value: '98.7%',
      change: '+0.5%',
      trend: 'up',
      icon: Shield,
      color: '#22C55E',
      subtitle: 'Defect rate'
    },
    {
      id: 'cost-per-unit',
      title: 'Cost Per Unit',
      value: '$12.45',
      change: '-4.2%',
      trend: 'down',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Production cost'
    },
  ],
  pipeline: [
    {
      id: 'request',
      name: 'Request Intake',
      status: 'completed',
      duration: '0.5s',
      description: '1,247 requests received'
    },
    {
      id: 'triage',
      name: 'Triage',
      status: 'active',
      duration: 'pending',
      description: 'AI categorization'
    },
    {
      id: 'assignment',
      name: 'Assignment',
      status: 'pending',
      duration: 'pending',
      description: 'Resource allocation'
    },
    {
      id: 'execution',
      name: 'Execution',
      status: 'pending',
      duration: 'pending',
      description: 'Task processing'
    },
    {
      id: 'review',
      name: 'Quality Review',
      status: 'pending',
      duration: 'pending',
      description: 'QC checkpoint'
    },
  ],
  activity: [
    {
      id: 'ops-act-1',
      task: 'Process optimization completed',
      status: 'completed',
      time: '2h ago',
      impact: 'high',
      agent: 'Process Optimizer'
    },
    {
      id: 'ops-act-2',
      task: 'Resource allocation updated',
      status: 'completed',
      time: '4h ago',
      impact: 'medium',
      agent: 'Resource Manager'
    },
    {
      id: 'ops-act-3',
      task: 'Quality audit in progress',
      status: 'processing',
      time: '6h ago',
      impact: 'high',
      agent: 'Quality Auditor'
    },
  ]
};

// Technology Department Configuration
export const technologyDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'ai-and-technology',
  departmentName: 'Technology',
  primaryColor: '#06B6D4',
  metrics: [
    {
      id: 'uptime',
      title: 'System Uptime',
      value: '99.97%',
      change: '+0.02%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: '30-day average'
    },
    {
      id: 'api-calls',
      title: 'API Calls',
      value: '12.4M',
      change: '+18.5%',
      trend: 'up',
      icon: Activity,
      color: '#3B82F6',
      subtitle: 'Daily volume'
    },
    {
      id: 'response-time',
      title: 'Avg Response',
      value: '45ms',
      change: '-12.3%',
      trend: 'down',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Latency'
    },
    {
      id: 'errors',
      title: 'Error Rate',
      value: '0.02%',
      change: '-0.01%',
      trend: 'down',
      icon: AlertCircle,
      color: '#22C55E',
      subtitle: 'Failed requests'
    },
    {
      id: 'deployments',
      title: 'Deployments',
      value: '234',
      change: '+45',
      trend: 'up',
      icon: Cpu,
      color: '#8B5CF6',
      subtitle: 'This month'
    },
    {
      id: 'coverage',
      title: 'Test Coverage',
      value: '94.5%',
      change: '+2.1%',
      trend: 'up',
      icon: Shield,
      color: '#22C55E',
      subtitle: 'Code coverage'
    },
  ],
  pipeline: [
    {
      id: 'build',
      name: 'Build',
      status: 'completed',
      duration: '2.3s',
      description: 'CI/CD pipeline'
    },
    {
      id: 'test',
      name: 'Testing',
      status: 'active',
      duration: 'pending',
      description: 'Automated tests'
    },
    {
      id: 'deploy',
      name: 'Deployment',
      status: 'pending',
      duration: 'pending',
      description: 'Production release'
    },
    {
      id: 'monitor',
      name: 'Monitoring',
      status: 'pending',
      duration: 'pending',
      description: 'Performance tracking'
    },
  ],
  activity: [
    {
      id: 'tech-act-1',
      task: 'New feature deployment completed',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'DevOps Bot'
    },
    {
      id: 'tech-act-2',
      task: 'Security patch applied',
      status: 'completed',
      time: '3h ago',
      impact: 'critical',
      agent: 'Security Team'
    },
    {
      id: 'tech-act-3',
      task: 'Performance optimization in progress',
      status: 'processing',
      time: '5h ago',
      impact: 'medium',
      agent: 'Performance Engineer'
    },
  ]
};

// Engineering Department Configuration
export const engineeringDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'engineering',
  departmentName: 'Engineering',
  primaryColor: '#F97316',
  metrics: [
    {
      id: 'projects',
      title: 'Active Projects',
      value: '47',
      change: '+3',
      trend: 'up',
      icon: Briefcase,
      color: '#3B82F6',
      subtitle: 'Ongoing work'
    },
    {
      id: 'sprints',
      title: 'Sprint Velocity',
      value: '234 pts',
      change: '+12.5%',
      trend: 'up',
      icon: Zap,
      color: '#22C55E',
      subtitle: 'Story points'
    },
    {
      id: 'bugs',
      title: 'Open Bugs',
      value: '23',
      change: '-8',
      trend: 'down',
      icon: AlertCircle,
      color: '#22C55E',
      subtitle: 'Critical issues'
    },
    {
      id: 'code-quality',
      title: 'Code Quality',
      value: 'A+',
      change: 'Stable',
      trend: 'stable',
      icon: Shield,
      color: '#22C55E',
      subtitle: 'SonarQube score'
    },
    {
      id: 'pr-rate',
      title: 'PR Merge Rate',
      value: '94.2%',
      change: '+2.3%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Pull requests'
    },
    {
      id: 'tech-debt',
      title: 'Tech Debt',
      value: 'Low',
      change: '-5.2%',
      trend: 'down',
      icon: Wrench,
      color: '#22C55E',
      subtitle: 'Debt ratio'
    },
  ],
  pipeline: [
    {
      id: 'design',
      name: 'Design',
      status: 'completed',
      duration: '1.5s',
      description: 'Architecture approved'
    },
    {
      id: 'dev',
      name: 'Development',
      status: 'active',
      duration: 'pending',
      description: 'Feature implementation'
    },
    {
      id: 'review',
      name: 'Code Review',
      status: 'pending',
      duration: 'pending',
      description: 'Peer review'
    },
    {
      id: 'qa',
      name: 'QA Testing',
      status: 'pending',
      duration: 'pending',
      description: 'Quality assurance'
    },
  ],
  activity: [
    {
      id: 'eng-act-1',
      task: 'Sprint planning completed',
      status: 'completed',
      time: '2h ago',
      impact: 'high',
      agent: 'Scrum Master'
    },
    {
      id: 'eng-act-2',
      task: 'Code review for feature X',
      status: 'processing',
      time: '4h ago',
      impact: 'medium',
      agent: 'Tech Lead'
    },
    {
      id: 'eng-act-3',
      task: 'Bug fix deployed to staging',
      status: 'completed',
      time: '6h ago',
      impact: 'high',
      agent: 'Developer'
    },
  ]
};

// Legal Department Configuration
export const legalDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'legal',
  departmentName: 'Legal',
  primaryColor: '#3F51B5',
  metrics: [
    {
      id: 'contracts',
      title: 'Active Contracts',
      value: '1,247',
      change: '+34',
      trend: 'up',
      icon: FileText,
      color: '#3B82F6',
      subtitle: 'Under management'
    },
    {
      id: 'compliance',
      title: 'Compliance Score',
      value: '98.5%',
      change: '+0.8%',
      trend: 'up',
      icon: Shield,
      color: '#22C55E',
      subtitle: 'Regulatory compliance'
    },
    {
      id: 'pending',
      title: 'Pending Reviews',
      value: '89',
      change: '-12',
      trend: 'down',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Awaiting review'
    },
    {
      id: 'ip-assets',
      title: 'IP Assets',
      value: '234',
      change: '+5',
      trend: 'up',
      icon: Lightbulb,
      color: '#8B5CF6',
      subtitle: 'Patents & trademarks'
    },
    {
      id: 'legal-spend',
      title: 'Legal Spend',
      value: '$847K',
      change: '-4.2%',
      trend: 'down',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Monthly spend'
    },
    {
      id: 'risk',
      title: 'Legal Risk',
      value: 'Low',
      change: 'Stable',
      trend: 'stable',
      icon: AlertCircle,
      color: '#22C55E',
      subtitle: 'Risk assessment'
    },
  ],
  pipeline: [
    {
      id: 'draft',
      name: 'Contract Draft',
      status: 'completed',
      duration: '2.1s',
      description: 'AI-assisted drafting'
    },
    {
      id: 'review',
      name: 'Legal Review',
      status: 'active',
      duration: 'pending',
      description: 'Attorney review'
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      status: 'pending',
      duration: 'pending',
      description: 'Counterparty terms'
    },
    {
      id: 'execution',
      name: 'Execution',
      status: 'pending',
      duration: 'pending',
      description: 'Signature & filing'
    },
  ],
  activity: [
    {
      id: 'legal-act-1',
      task: 'NDA reviewed and approved',
      status: 'completed',
      time: '1h ago',
      impact: 'medium',
      agent: 'Legal Counsel'
    },
    {
      id: 'legal-act-2',
      task: 'IP filing submitted',
      status: 'completed',
      time: '3h ago',
      impact: 'high',
      agent: 'IP Specialist'
    },
    {
      id: 'legal-act-3',
      task: 'Compliance audit in progress',
      status: 'processing',
      time: '5h ago',
      impact: 'critical',
      agent: 'Compliance Officer'
    },
  ]
};

// Security Department Configuration
export const securityDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'security',
  departmentName: 'Security',
  primaryColor: '#EF4444',
  metrics: [
    {
      id: 'threats-blocked',
      title: 'Threats Blocked',
      value: '12,847',
      change: '+23.5%',
      trend: 'up',
      icon: Shield,
      color: '#22C55E',
      subtitle: '24h period'
    },
    {
      id: 'security-score',
      title: 'Security Score',
      value: 'A',
      change: 'Stable',
      trend: 'stable',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Overall rating'
    },
    {
      id: 'incidents',
      title: 'Active Incidents',
      value: '3',
      change: '-2',
      trend: 'down',
      icon: AlertCircle,
      color: '#F59E0B',
      subtitle: 'Being investigated'
    },
    {
      id: 'vulnerabilities',
      title: 'Open Vulnerabilities',
      value: '12',
      change: '-5',
      trend: 'down',
      icon: Lock,
      color: '#22C55E',
      subtitle: 'Critical & high'
    },
    {
      id: 'compliance',
      title: 'Compliance',
      value: '99.8%',
      change: '+0.2%',
      trend: 'up',
      icon: Shield,
      color: '#22C55E',
      subtitle: 'Security standards'
    },
    {
      id: 'training',
      title: 'Training Complete',
      value: '94.2%',
      change: '+3.1%',
      trend: 'up',
      icon: GraduationCap,
      color: '#22C55E',
      subtitle: 'Security awareness'
    },
  ],
  pipeline: [
    {
      id: 'detect',
      name: 'Threat Detection',
      status: 'completed',
      duration: '0.1s',
      description: 'AI monitoring'
    },
    {
      id: 'analyze',
      name: 'Analysis',
      status: 'active',
      duration: 'pending',
      description: 'Threat assessment'
    },
    {
      id: 'contain',
      name: 'Containment',
      status: 'pending',
      duration: 'pending',
      description: 'Isolate threat'
    },
    {
      id: 'remediate',
      name: 'Remediation',
      status: 'pending',
      duration: 'pending',
      description: 'Fix & patch'
    },
  ],
  activity: [
    {
      id: 'sec-act-1',
      task: 'DDoS attack mitigated',
      status: 'completed',
      time: '30m ago',
      impact: 'critical',
      agent: 'Security Ops'
    },
    {
      id: 'sec-act-2',
      task: 'Vulnerability scan completed',
      status: 'completed',
      time: '2h ago',
      impact: 'high',
      agent: 'Vulnerability Scanner'
    },
    {
      id: 'sec-act-3',
      task: 'Security training reminder sent',
      status: 'processing',
      time: '4h ago',
      impact: 'medium',
      agent: 'Training Bot'
    },
  ]
};

// Data Department Configuration
export const dataDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'data',
  departmentName: 'Data & Intelligence',
  primaryColor: '#00ACC1',
  metrics: [
    {
      id: 'data-volume',
      title: 'Data Volume',
      value: '12.4 PB',
      change: '+18.2%',
      trend: 'up',
      icon: Database,
      color: '#3B82F6',
      subtitle: 'Total storage'
    },
    {
      id: 'queries',
      title: 'Daily Queries',
      value: '2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: Activity,
      color: '#22C55E',
      subtitle: 'API calls'
    },
    {
      id: 'accuracy',
      title: 'Model Accuracy',
      value: '94.7%',
      change: '+1.8%',
      trend: 'up',
      icon: Target,
      color: '#22C55E',
      subtitle: 'ML models'
    },
    {
      id: 'latency',
      title: 'Query Latency',
      value: '23ms',
      change: '-8.4%',
      trend: 'down',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Average response'
    },
    {
      id: 'data-quality',
      title: 'Data Quality',
      value: '98.2%',
      change: '+0.5%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Quality score'
    },
    {
      id: 'insights',
      title: 'Insights Generated',
      value: '1,247',
      change: '+23.5%',
      trend: 'up',
      icon: Lightbulb,
      color: '#8B5CF6',
      subtitle: 'Daily reports'
    },
  ],
  pipeline: [
    {
      id: 'ingest',
      name: 'Data Ingestion',
      status: 'completed',
      duration: '1.2s',
      description: '12.4 TB processed'
    },
    {
      id: 'process',
      name: 'Processing',
      status: 'active',
      duration: 'pending',
      description: 'ETL pipeline'
    },
    {
      id: 'analyze',
      name: 'Analysis',
      status: 'pending',
      duration: 'pending',
      description: 'ML inference'
    },
    {
      id: 'serve',
      name: 'Serving',
      status: 'pending',
      duration: 'pending',
      description: 'API delivery'
    },
  ],
  activity: [
    {
      id: 'data-act-1',
      task: 'New ML model deployed',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'ML Engineer'
    },
    {
      id: 'data-act-2',
      task: 'Data quality report generated',
      status: 'completed',
      time: '3h ago',
      impact: 'medium',
      agent: 'Data Quality Bot'
    },
    {
      id: 'data-act-3',
      task: 'ETL pipeline optimization',
      status: 'processing',
      time: '5h ago',
      impact: 'high',
      agent: 'Data Engineer'
    },
  ]
};

// Product Department Configuration
export const productDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'product-management',
  departmentName: 'Product Management',
  primaryColor: '#06B6D4',
  metrics: [
    {
      id: 'active-users',
      title: 'Active Users',
      value: '8.4M',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: '#06B6D4',
      subtitle: 'DAU/MAU'
    },
    {
      id: 'retention-rate',
      title: 'Retention Rate',
      value: '74%',
      change: '+3.2%',
      trend: 'up',
      icon: TrendingUp,
      color: '#10B981',
      subtitle: 'D30 retention'
    },
    {
      id: 'engagement-score',
      title: 'Engagement Score',
      value: '89',
      change: '+4.1%',
      trend: 'up',
      icon: Activity,
      color: '#8B5CF6',
      subtitle: 'Product health'
    },
    {
      id: 'feature-adoption',
      title: 'Feature Adoption',
      value: '63%',
      change: '+5.8%',
      trend: 'up',
      icon: Zap,
      color: '#F59E0B',
      subtitle: 'Average adoption'
    },
    {
      id: 'nps-score',
      title: 'NPS Score',
      value: '72',
      change: '+6.2%',
      trend: 'up',
      icon: Star,
      color: '#22C55E',
      subtitle: 'Net Promoter'
    },
    {
      id: 'churn-rate',
      title: 'Churn Rate',
      value: '2.4%',
      change: '-0.8%',
      trend: 'down',
      icon: TrendingDown,
      color: '#10B981',
      subtitle: 'Monthly churn'
    },
    {
      id: 'experiment-success',
      title: 'Experiment Success',
      value: '68%',
      change: '+8.4%',
      trend: 'up',
      icon: BarChart3,
      color: '#3B82F6',
      subtitle: 'Win rate'
    },
    {
      id: 'ttv',
      title: 'Time to Value',
      value: '4.2 days',
      change: '-15.3%',
      trend: 'down',
      icon: Clock,
      color: '#10B981',
      subtitle: 'Activation time'
    },
    {
      id: 'arpu',
      title: 'Revenue per User',
      value: '$142',
      change: '+12.1%',
      trend: 'up',
      icon: DollarSign,
      color: '#EC4899',
      subtitle: 'ARPU'
    },
    {
      id: 'pmf-score',
      title: 'Product-Market Fit',
      value: '87%',
      change: '+2.4%',
      trend: 'up',
      icon: Target,
      color: '#14B8A6',
      subtitle: 'PMF score'
    },
  ],
  pipeline: [
    {
      id: 'ideation',
      name: 'Ideation',
      status: 'completed',
      duration: '1.5s',
      description: '23 new ideas'
    },
    {
      id: 'validation',
      name: 'Validation',
      status: 'active',
      duration: 'pending',
      description: 'User research'
    },
    {
      id: 'development',
      name: 'Development',
      status: 'pending',
      duration: 'pending',
      description: 'Feature build'
    },
    {
      id: 'launch',
      name: 'Launch',
      status: 'pending',
      duration: 'pending',
      description: 'Go-to-market'
    },
  ],
  activity: [
    {
      id: 'prod-act-1',
      task: 'New feature "AI Recommendations" released',
      status: 'completed',
      time: '2h ago',
      impact: 'high',
      agent: 'Product Manager'
    },
    {
      id: 'prod-act-2',
      task: 'User feedback analysis complete',
      status: 'completed',
      time: '4h ago',
      impact: 'medium',
      agent: 'UX Researcher'
    },
    {
      id: 'prod-act-3',
      task: 'A/B test shows 15% conversion lift',
      status: 'processing',
      time: '6h ago',
      impact: 'high',
      agent: 'Experimentation Agent'
    },
  ]
};

// R&D Department Configuration
export const rdDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'research-development',
  departmentName: 'Research & Development',
  primaryColor: '#14B8A6',
  metrics: [
    {
      id: 'projects',
      title: 'Active Projects',
      value: '34',
      change: '+2',
      trend: 'up',
      icon: Briefcase,
      color: '#3B82F6',
      subtitle: 'R&D initiatives'
    },
    {
      id: 'patents',
      title: 'Patents Filed',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Lightbulb,
      color: '#22C55E',
      subtitle: 'This year'
    },
    {
      id: 'innovation-score',
      title: 'Innovation Score',
      value: '87.3%',
      change: '+5.2%',
      trend: 'up',
      icon: Zap,
      color: '#22C55E',
      subtitle: 'R&D efficiency'
    },
    {
      id: 'budget-util',
      title: 'Budget Utilization',
      value: '82.4%',
      change: '+3.1%',
      trend: 'up',
      icon: PieChart,
      color: '#8B5CF6',
      subtitle: 'R&D spend'
    },
    {
      id: 'time-to-market',
      title: 'Time to Market',
      value: '6 months',
      change: '-12.5%',
      trend: 'down',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Average cycle'
    },
    {
      id: 'collaborations',
      title: 'Collaborations',
      value: '23',
      change: '+4',
      trend: 'up',
      icon: Users,
      color: '#3B82F6',
      subtitle: 'External partners'
    },
  ],
  pipeline: [
    {
      id: 'research',
      name: 'Research',
      status: 'completed',
      duration: '2.1s',
      description: 'Market analysis'
    },
    {
      id: 'prototype',
      name: 'Prototyping',
      status: 'active',
      duration: 'pending',
      description: 'MVP development'
    },
    {
      id: 'testing',
      name: 'Testing',
      status: 'pending',
      duration: 'pending',
      description: 'Lab validation'
    },
    {
      id: 'scale',
      name: 'Scaling',
      status: 'pending',
      duration: 'pending',
      description: 'Production ready'
    },
  ],
  activity: [
    {
      id: 'rd-act-1',
      task: 'New AI algorithm prototype ready',
      status: 'completed',
      time: '3h ago',
      impact: 'critical',
      agent: 'Research Scientist'
    },
    {
      id: 'rd-act-2',
      task: 'Patent application submitted',
      status: 'completed',
      time: '6h ago',
      impact: 'high',
      agent: 'IP Team'
    },
    {
      id: 'rd-act-3',
      task: 'Lab experiment in progress',
      status: 'processing',
      time: '8h ago',
      impact: 'medium',
      agent: 'Lab Technician'
    },
  ]
};

// Administrative Department Configuration
export const adminDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'administrative',
  departmentName: 'Administrative',
  primaryColor: '#64748B',
  metrics: [
    {
      id: 'tasks',
      title: 'Pending Tasks',
      value: '234',
      change: '-45',
      trend: 'down',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Action items'
    },
    {
      id: 'efficiency',
      title: 'Process Efficiency',
      value: '92.3%',
      change: '+3.4%',
      trend: 'up',
      icon: Zap,
      color: '#22C55E',
      subtitle: 'Workflow optimization'
    },
    {
      id: 'documents',
      title: 'Documents Processed',
      value: '12,847',
      change: '+18.5%',
      trend: 'up',
      icon: FileText,
      color: '#3B82F6',
      subtitle: 'This month'
    },
    {
      id: 'response-time',
      title: 'Avg Response',
      value: '2.4h',
      change: '-15.2%',
      trend: 'down',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Request handling'
    },
    {
      id: 'satisfaction',
      title: 'Satisfaction',
      value: '94.5%',
      change: '+2.1%',
      trend: 'up',
      icon: Heart,
      color: '#22C55E',
      subtitle: 'Internal feedback'
    },
    {
      id: 'cost-savings',
      title: 'Cost Savings',
      value: '$45K',
      change: '+8.3%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Monthly savings'
    },
  ],
  pipeline: [
    {
      id: 'request',
      name: 'Request Intake',
      status: 'completed',
      duration: '0.5s',
      description: '89 new requests'
    },
    {
      id: 'triage',
      name: 'Triage',
      status: 'active',
      duration: 'pending',
      description: 'Priority sorting'
    },
    {
      id: 'process',
      name: 'Processing',
      status: 'pending',
      duration: 'pending',
      description: 'Task execution'
    },
    {
      id: 'review',
      name: 'Review',
      status: 'pending',
      duration: 'pending',
      description: 'Quality check'
    },
  ],
  activity: [
    {
      id: 'admin-act-1',
      task: 'Office supplies inventory updated',
      status: 'completed',
      time: '1h ago',
      impact: 'low',
      agent: 'Admin Assistant'
    },
    {
      id: 'admin-act-2',
      task: 'Meeting room booking processed',
      status: 'completed',
      time: '3h ago',
      impact: 'medium',
      agent: 'Facilities Manager'
    },
    {
      id: 'admin-act-3',
      task: 'Vendor contract review',
      status: 'processing',
      time: '5h ago',
      impact: 'high',
      agent: 'Procurement'
    },
  ]
};

// Real Estate Department Configuration
export const realestateDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'real-estate',
  departmentName: 'Real Estate',
  primaryColor: '#059669',
  metrics: [
    {
      id: 'properties',
      title: 'Active Listings',
      value: '234',
      change: '+12',
      trend: 'up',
      icon: Building,
      color: '#3B82F6',
      subtitle: 'Properties for sale'
    },
    {
      id: 'sales',
      title: 'Monthly Sales',
      value: '$12.4M',
      change: '+18.5%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Revenue'
    },
    {
      id: 'days-on-market',
      title: 'Days on Market',
      value: '45',
      change: '-8.2%',
      trend: 'down',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Average time'
    },
    {
      id: 'viewings',
      title: 'Property Viewings',
      value: '847',
      change: '+23.4%',
      trend: 'up',
      icon: Users,
      color: '#3B82F6',
      subtitle: 'This month'
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: '12.5%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: '#22C55E',
      subtitle: 'Viewing to sale'
    },
    {
      id: 'portfolio-value',
      title: 'Portfolio Value',
      value: '$234M',
      change: '+5.4%',
      trend: 'up',
      icon: TrendingUp,
      color: '#22C55E',
      subtitle: 'Total assets'
    },
  ],
  pipeline: [
    {
      id: 'listing',
      name: 'Property Listing',
      status: 'completed',
      duration: '1.2s',
      description: '23 new listings'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      status: 'active',
      duration: 'pending',
      description: 'Promotion campaign'
    },
    {
      id: 'viewing',
      name: 'Viewings',
      status: 'pending',
      duration: 'pending',
      description: 'Client tours'
    },
    {
      id: 'closing',
      name: 'Closing',
      status: 'pending',
      duration: 'pending',
      description: 'Transaction final'
    },
  ],
  activity: [
    {
      id: 're-act-1',
      task: 'New property listed in downtown',
      status: 'completed',
      time: '2h ago',
      impact: 'high',
      agent: 'Listing Agent'
    },
    {
      id: 're-act-2',
      task: 'Property valuation completed',
      status: 'completed',
      time: '4h ago',
      impact: 'medium',
      agent: 'Appraiser'
    },
    {
      id: 're-act-3',
      task: 'Client viewing scheduled',
      status: 'processing',
      time: '6h ago',
      impact: 'medium',
      agent: 'Sales Agent'
    },
  ]
};

// Insurance Department Configuration
export const insuranceDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'insurance',
  departmentName: 'Insurance',
  primaryColor: '#DC2626',
  metrics: [
    {
      id: 'policies',
      title: 'Active Policies',
      value: '12,847',
      change: '+234',
      trend: 'up',
      icon: Shield,
      color: '#3B82F6',
      subtitle: 'Under management'
    },
    {
      id: 'premiums',
      title: 'Monthly Premiums',
      value: '$2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Revenue'
    },
    {
      id: 'claims',
      title: 'Claims Processed',
      value: '847',
      change: '+45',
      trend: 'up',
      icon: FileText,
      color: '#8B5CF6',
      subtitle: 'This month'
    },
    {
      id: 'loss-ratio',
      title: 'Loss Ratio',
      value: '62.3%',
      change: '-2.1%',
      trend: 'down',
      icon: Scale,
      color: '#22C55E',
      subtitle: 'Claims vs premiums'
    },
    {
      id: 'retention',
      title: 'Retention Rate',
      value: '94.2%',
      change: '+1.8%',
      trend: 'up',
      icon: Users,
      color: '#22C55E',
      subtitle: 'Policy renewals'
    },
    {
      id: 'nps',
      title: 'NPS Score',
      value: '68',
      change: '+4.5%',
      trend: 'up',
      icon: Heart,
      color: '#22C55E',
      subtitle: 'Customer satisfaction'
    },
  ],
  pipeline: [
    {
      id: 'application',
      name: 'Application',
      status: 'completed',
      duration: '1.5s',
      description: '89 new applications'
    },
    {
      id: 'underwriting',
      name: 'Underwriting',
      status: 'active',
      duration: 'pending',
      description: 'Risk assessment'
    },
    {
      id: 'policy',
      name: 'Policy Issuance',
      status: 'pending',
      duration: 'pending',
      description: 'Document generation'
    },
    {
      id: 'payment',
      name: 'Payment',
      status: 'pending',
      duration: 'pending',
      description: 'Premium collection'
    },
  ],
  activity: [
    {
      id: 'ins-act-1',
      task: 'New policy issued for enterprise client',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'Underwriter'
    },
    {
      id: 'ins-act-2',
      task: 'Claim approved and processed',
      status: 'completed',
      time: '3h ago',
      impact: 'medium',
      agent: 'Claims Adjuster'
    },
    {
      id: 'ins-act-3',
      task: 'Risk assessment in progress',
      status: 'processing',
      time: '5h ago',
      impact: 'high',
      agent: 'Risk Analyst'
    },
  ]
};

// Healthcare Department Configuration
export const healthcareDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'healthcare-medical',
  departmentName: 'Healthcare',
  primaryColor: '#EC4899',
  metrics: [
    {
      id: 'patients',
      title: 'Active Patients',
      value: '12,847',
      change: '+234',
      trend: 'up',
      icon: Users,
      color: '#3B82F6',
      subtitle: 'Under care'
    },
    {
      id: 'satisfaction',
      title: 'Patient Satisfaction',
      value: '94.2%',
      change: '+2.3%',
      trend: 'up',
      icon: Heart,
      color: '#22C55E',
      subtitle: 'Survey score'
    },
    {
      id: 'appointments',
      title: 'Daily Appointments',
      value: '847',
      change: '+45',
      trend: 'up',
      icon: Calendar,
      color: '#8B5CF6',
      subtitle: 'Scheduled'
    },
    {
      id: 'wait-time',
      title: 'Avg Wait Time',
      value: '18 min',
      change: '-12.5%',
      trend: 'down',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Emergency'
    },
    {
      id: 'outcomes',
      title: 'Treatment Success',
      value: '97.8%',
      change: '+0.5%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Recovery rate'
    },
    {
      id: 'readmission',
      title: 'Readmission Rate',
      value: '3.2%',
      change: '-0.8%',
      trend: 'down',
      icon: AlertCircle,
      color: '#22C55E',
      subtitle: '30-day rate'
    },
  ],
  pipeline: [
    {
      id: 'triage',
      name: 'Triage',
      status: 'completed',
      duration: '0.5s',
      description: '234 patients assessed'
    },
    {
      id: 'examination',
      name: 'Examination',
      status: 'active',
      duration: 'pending',
      description: 'Doctor consultation'
    },
    {
      id: 'diagnosis',
      name: 'Diagnosis',
      status: 'pending',
      duration: 'pending',
      description: 'Lab results'
    },
    {
      id: 'treatment',
      name: 'Treatment',
      status: 'pending',
      duration: 'pending',
      description: 'Care plan'
    },
  ],
  activity: [
    {
      id: 'health-act-1',
      task: 'Emergency surgery completed successfully',
      status: 'completed',
      time: '1h ago',
      impact: 'critical',
      agent: 'Surgical Team'
    },
    {
      id: 'health-act-2',
      task: 'Patient discharge processed',
      status: 'completed',
      time: '3h ago',
      impact: 'medium',
      agent: 'Nursing Staff'
    },
    {
      id: 'health-act-3',
      task: 'Lab results analysis in progress',
      status: 'processing',
      time: '5h ago',
      impact: 'high',
      agent: 'Lab Technician'
    },
  ]
};

// Manufacturing Department Configuration
export const manufacturingDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'manufacturing',
  departmentName: 'Manufacturing',
  primaryColor: '#F97316',
  metrics: [
    {
      id: 'production',
      title: 'Daily Production',
      value: '12,847 units',
      change: '+18.5%',
      trend: 'up',
      icon: Factory,
      color: '#22C55E',
      subtitle: 'Output'
    },
    {
      id: 'efficiency',
      title: 'OEE Score',
      value: '87.3%',
      change: '+3.2%',
      trend: 'up',
      icon: Zap,
      color: '#22C55E',
      subtitle: 'Overall equipment'
    },
    {
      id: 'defects',
      title: 'Defect Rate',
      value: '0.8%',
      change: '-0.3%',
      trend: 'down',
      icon: AlertCircle,
      color: '#22C55E',
      subtitle: 'Quality control'
    },
    {
      id: 'downtime',
      title: 'Downtime',
      value: '2.4h',
      change: '-15.2%',
      trend: 'down',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Monthly total'
    },
    {
      id: 'inventory',
      title: 'Inventory Turn',
      value: '12.5x',
      change: '+1.8%',
      trend: 'up',
      icon: Box,
      color: '#3B82F6',
      subtitle: 'Annual rate'
    },
    {
      id: 'safety',
      title: 'Safety Incidents',
      value: '0',
      change: 'Stable',
      trend: 'stable',
      icon: Shield,
      color: '#22C55E',
      subtitle: '30 days'
    },
  ],
  pipeline: [
    {
      id: 'planning',
      name: 'Production Planning',
      status: 'completed',
      duration: '1.2s',
      description: 'Schedule optimized'
    },
    {
      id: 'setup',
      name: 'Machine Setup',
      status: 'active',
      duration: 'pending',
      description: 'Tooling changeover'
    },
    {
      id: 'production',
      name: 'Production',
      status: 'pending',
      duration: 'pending',
      description: 'Manufacturing run'
    },
    {
      id: 'qc',
      name: 'Quality Control',
      status: 'pending',
      duration: 'pending',
      description: 'Inspection'
    },
  ],
  activity: [
    {
      id: 'mfg-act-1',
      task: 'Production line B started',
      status: 'completed',
      time: '2h ago',
      impact: 'high',
      agent: 'Production Manager'
    },
    {
      id: 'mfg-act-2',
      task: 'Quality inspection passed',
      status: 'completed',
      time: '4h ago',
      impact: 'medium',
      agent: 'QC Inspector'
    },
    {
      id: 'mfg-act-3',
      task: 'Preventive maintenance scheduled',
      status: 'processing',
      time: '6h ago',
      impact: 'high',
      agent: 'Maintenance Team'
    },
  ]
};

// Transportation Department Configuration
export const transportationDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'transportation',
  departmentName: 'Transportation',
  primaryColor: '#7C3AED',
  metrics: [
    {
      id: 'shipments',
      title: 'Daily Shipments',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Truck,
      color: '#22C55E',
      subtitle: 'Delivered'
    },
    {
      id: 'on-time',
      title: 'On-Time Delivery',
      value: '96.8%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Delivery rate'
    },
    {
      id: 'fleet',
      title: 'Fleet Utilization',
      value: '87.3%',
      change: '+4.5%',
      trend: 'up',
      icon: Activity,
      color: '#22C55E',
      subtitle: 'Vehicle usage'
    },
    {
      id: 'cost-per-mile',
      title: 'Cost Per Mile',
      value: '$1.45',
      change: '-5.2%',
      trend: 'down',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Operating cost'
    },
    {
      id: 'incidents',
      title: 'Safety Incidents',
      value: '2',
      change: '-3',
      trend: 'down',
      icon: AlertCircle,
      color: '#22C55E',
      subtitle: 'This month'
    },
    {
      id: 'capacity',
      title: 'Capacity Utilization',
      value: '92.4%',
      change: '+3.8%',
      trend: 'up',
      icon: BarChart3,
      color: '#3B82F6',
      subtitle: 'Load factor'
    },
  ],
  pipeline: [
    {
      id: 'order',
      name: 'Order Intake',
      status: 'completed',
      duration: '0.8s',
      description: '847 new orders'
    },
    {
      id: 'route',
      name: 'Route Planning',
      status: 'active',
      duration: 'pending',
      description: 'AI optimization'
    },
    {
      id: 'pickup',
      name: 'Pickup',
      status: 'pending',
      duration: 'pending',
      description: 'Collection'
    },
    {
      id: 'delivery',
      name: 'Delivery',
      status: 'pending',
      duration: 'pending',
      description: 'Final destination'
    },
  ],
  activity: [
    {
      id: 'trans-act-1',
      task: 'Route optimization completed',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'Route Planner'
    },
    {
      id: 'trans-act-2',
      task: 'Fleet maintenance scheduled',
      status: 'completed',
      time: '3h ago',
      impact: 'medium',
      agent: 'Fleet Manager'
    },
    {
      id: 'trans-act-3',
      task: 'Shipment tracking update',
      status: 'processing',
      time: '5h ago',
      impact: 'medium',
      agent: 'Tracking System'
    },
  ]
};

// Supply Chain Department Configuration
export const supplychainDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'supply-chain',
  departmentName: 'Supply Chain',
  primaryColor: '#0891B2',
  metrics: [
    {
      id: 'suppliers',
      title: 'Active Suppliers',
      value: '1,247',
      change: '+34',
      trend: 'up',
      icon: Building,
      color: '#3B82F6',
      subtitle: 'In network'
    },
    {
      id: 'orders',
      title: 'Daily Orders',
      value: '8,847',
      change: '+18.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: '#22C55E',
      subtitle: 'Processed'
    },
    {
      id: 'lead-time',
      title: 'Avg Lead Time',
      value: '12 days',
      change: '-8.5%',
      trend: 'down',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Delivery time'
    },
    {
      id: 'inventory',
      title: 'Inventory Value',
      value: '$23.4M',
      change: '+5.4%',
      trend: 'up',
      icon: Box,
      color: '#8B5CF6',
      subtitle: 'Total stock'
    },
    {
      id: 'fill-rate',
      title: 'Order Fill Rate',
      value: '98.5%',
      change: '+1.2%',
      trend: 'up',
      icon: Target,
      color: '#22C55E',
      subtitle: 'Complete orders'
    },
    {
      id: 'cost-savings',
      title: 'Cost Savings',
      value: '$847K',
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Monthly savings'
    },
  ],
  pipeline: [
    {
      id: 'demand',
      name: 'Demand Planning',
      status: 'completed',
      duration: '1.5s',
      description: 'Forecast updated'
    },
    {
      id: 'sourcing',
      name: 'Sourcing',
      status: 'active',
      duration: 'pending',
      description: 'Supplier selection'
    },
    {
      id: 'procurement',
      name: 'Procurement',
      status: 'pending',
      duration: 'pending',
      description: 'Order placement'
    },
    {
      id: 'logistics',
      name: 'Logistics',
      status: 'pending',
      duration: 'pending',
      description: 'Transportation'
    },
  ],
  activity: [
    {
      id: 'sc-act-1',
      task: 'New supplier onboarded',
      status: 'completed',
      time: '2h ago',
      impact: 'high',
      agent: 'Procurement'
    },
    {
      id: 'sc-act-2',
      task: 'Demand forecast updated',
      status: 'completed',
      time: '4h ago',
      impact: 'high',
      agent: 'Demand Planner'
    },
    {
      id: 'sc-act-3',
      task: 'Inventory optimization in progress',
      status: 'processing',
      time: '6h ago',
      impact: 'medium',
      agent: 'Inventory Manager'
    },
  ]
};

// Government/Public Sector Department Configuration
export const governmentDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'public-sector',
  departmentName: 'Government',
  primaryColor: '#1E40AF',
  metrics: [
    {
      id: 'services',
      title: 'Services Delivered',
      value: '45,847',
      change: '+12.5%',
      trend: 'up',
      icon: Building,
      color: '#22C55E',
      subtitle: 'This month'
    },
    {
      id: 'citizens',
      title: 'Citizens Served',
      value: '234K',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: '#3B82F6',
      subtitle: 'Active users'
    },
    {
      id: 'response-time',
      title: 'Avg Response',
      value: '2.4 days',
      change: '-15.3%',
      trend: 'down',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Service requests'
    },
    {
      id: 'satisfaction',
      title: 'Citizen Satisfaction',
      value: '87.3%',
      change: '+3.4%',
      trend: 'up',
      icon: Heart,
      color: '#22C55E',
      subtitle: 'Survey score'
    },
    {
      id: 'budget-util',
      title: 'Budget Utilization',
      value: '78.5%',
      change: '+2.1%',
      trend: 'up',
      icon: PieChart,
      color: '#8B5CF6',
      subtitle: 'Fiscal year'
    },
    {
      id: 'compliance',
      title: 'Regulatory Compliance',
      value: '99.2%',
      change: '+0.5%',
      trend: 'up',
      icon: Shield,
      color: '#22C55E',
      subtitle: 'Audit score'
    },
  ],
  pipeline: [
    {
      id: 'request',
      name: 'Service Request',
      status: 'completed',
      duration: '0.5s',
      description: '1,247 requests'
    },
    {
      id: 'review',
      name: 'Review',
      status: 'active',
      duration: 'pending',
      description: 'Eligibility check'
    },
    {
      id: 'processing',
      name: 'Processing',
      status: 'pending',
      duration: 'pending',
      description: 'Service delivery'
    },
    {
      id: 'completion',
      name: 'Completion',
      status: 'pending',
      duration: 'pending',
      description: 'Case closure'
    },
  ],
  activity: [
    {
      id: 'gov-act-1',
      task: 'New public service launched',
      status: 'completed',
      time: '3h ago',
      impact: 'high',
      agent: 'Service Manager'
    },
    {
      id: 'gov-act-2',
      task: 'Citizen complaint resolved',
      status: 'completed',
      time: '5h ago',
      impact: 'medium',
      agent: 'Case Worker'
    },
    {
      id: 'gov-act-3',
      task: 'Policy review in progress',
      status: 'processing',
      time: '7h ago',
      impact: 'high',
      agent: 'Policy Analyst'
    },
  ]
};

// Executive Strategy Department Configuration
export const executiveDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'executive',
  departmentName: 'Executive Strategy',
  primaryColor: '#F59E0B',
  metrics: [
    {
      id: 'okr-progress',
      title: 'OKR Progress',
      value: '87.4%',
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      color: '#22C55E',
      subtitle: 'Q3 2026'
    },
    {
      id: 'board-decisions',
      title: 'Board Decisions',
      value: '42',
      change: '+8',
      trend: 'up',
      icon: Briefcase,
      color: '#3B82F6',
      subtitle: 'This quarter'
    },
    {
      id: 'capital-allocation',
      title: 'Capital Allocated',
      value: '$124.5M',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'YTD'
    },
    {
      id: 'risk-oversight',
      title: 'Risk Score',
      value: 'Low',
      change: 'Stable',
      trend: 'stable',
      icon: Shield,
      color: '#22C55E',
      subtitle: 'Overall risk'
    },
    {
      id: 'governance',
      title: 'Governance',
      value: '98.7%',
      change: '+1.2%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Compliance'
    },
    {
      id: 'strategy-score',
      title: 'Strategy Score',
      value: '96.4',
      change: '+2.8',
      trend: 'up',
      icon: TrendingUp,
      color: '#8B5CF6',
      subtitle: 'Overall rating'
    },
  ],
  pipeline: [
    {
      id: 'scan',
      name: 'Environment Scan',
      status: 'completed',
      duration: '1.2s',
      description: 'Market analysis complete',
      lastUpdate: '14:32:15'
    },
    {
      id: 'model',
      name: 'Strategic Modeling',
      status: 'completed',
      duration: '2.5s',
      description: 'Scenarios evaluated',
      lastUpdate: '14:32:18'
    },
    {
      id: 'align',
      name: 'Stakeholder Alignment',
      status: 'active',
      duration: 'pending',
      description: 'Building consensus',
      lastUpdate: '14:32:20'
    },
    {
      id: 'approve',
      name: 'Board Approval',
      status: 'pending',
      duration: 'pending',
      description: 'Scheduled review'
    },
    {
      id: 'execute',
      name: 'Execution',
      status: 'pending',
      duration: 'pending',
      description: 'Implementation phase'
    },
    {
      id: 'review',
      name: 'Performance Review',
      status: 'pending',
      duration: 'pending',
      description: 'KPI tracking'
    },
  ],
  activity: [
    {
      id: 'exec-act-1',
      task: 'Q3 strategic plan approved by board',
      status: 'completed',
      time: '2h ago',
      impact: 'high',
      agent: 'Strategy Lead'
    },
    {
      id: 'exec-act-2',
      task: 'Capital allocation for new initiatives',
      status: 'completed',
      time: '4h ago',
      impact: 'high',
      agent: 'CFO Office'
    },
    {
      id: 'exec-act-3',
      task: 'Risk assessment for emerging markets',
      status: 'processing',
      time: '6h ago',
      impact: 'high',
      agent: 'Risk Committee'
    },
  ],
  charts: {
    performance: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'OKR Achievement',
          data: [82, 85, 87, 90],
          color: '#F59E0B',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Strategic Initiatives',
          data: [12, 15, 18, 22, 25, 28],
          color: '#3B82F6'
        }
      ]
    }
  }
};

// Customer Experience Department Configuration
export const customerSupportDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'customer-support',
  departmentName: 'Customer Experience',
  primaryColor: '#22D3EE',
  metrics: [
    {
      id: 'csat',
      title: 'CSAT Score',
      value: '98.1',
      change: '+2.4%',
      trend: 'up',
      icon: Users,
      color: '#22C55E',
      subtitle: 'Customer satisfaction'
    },
    {
      id: 'tickets',
      title: 'Tickets Closed',
      value: '12,847',
      change: '+856',
      trend: 'up',
      icon: MessageSquare,
      color: '#3B82F6',
      subtitle: 'This month'
    },
    {
      id: 'response-time',
      title: 'Avg Response',
      value: '2.4m',
      change: '-0.3m',
      trend: 'up',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Response time'
    },
    {
      id: 'retention',
      title: 'Retention Rate',
      value: '94.2%',
      change: '+1.8%',
      trend: 'up',
      icon: TrendingUp,
      color: '#22C55E',
      subtitle: 'Customer retention'
    },
    {
      id: 'automation',
      title: 'Automation Rate',
      value: '82%',
      change: '+5.2%',
      trend: 'up',
      icon: Zap,
      color: '#8B5CF6',
      subtitle: 'AI-powered resolution'
    },
    {
      id: 'escalations',
      title: 'Escalations',
      value: '31',
      change: '-12',
      trend: 'up',
      icon: AlertCircle,
      color: '#EF4444',
      subtitle: 'Escalated cases'
    },
  ],
  pipeline: [
    {
      id: 'listen',
      name: 'Listen',
      status: 'completed',
      duration: '0.1s',
      description: 'Customer inquiry received',
      lastUpdate: '15:45:22'
    },
    {
      id: 'classify',
      name: 'Classify',
      status: 'completed',
      duration: '0.3s',
      description: 'Issue categorized',
      lastUpdate: '15:45:22'
    },
    {
      id: 'route',
      name: 'Route',
      status: 'active',
      duration: 'pending',
      description: 'Assigning to agent',
      lastUpdate: '15:45:23'
    },
    {
      id: 'resolve',
      name: 'Resolve',
      status: 'pending',
      duration: 'pending',
      description: 'Resolution in progress'
    },
    {
      id: 'survey',
      name: 'Survey',
      status: 'pending',
      duration: 'pending',
      description: 'Feedback collection'
    },
    {
      id: 'learn',
      name: 'Learn',
      status: 'pending',
      duration: 'pending',
      description: 'Pattern analysis'
    },
  ],
  activity: [
    {
      id: 'cx-act-1',
      task: 'VIP customer issue resolved in 15 minutes',
      status: 'completed',
      time: '5m ago',
      impact: 'high',
      agent: 'VIP Support Team'
    },
    {
      id: 'cx-act-2',
      task: 'AI chatbot handled 234 conversations',
      status: 'completed',
      time: '15m ago',
      impact: 'medium',
      agent: 'Chatbot AI'
    },
    {
      id: 'cx-act-3',
      task: 'Proactive outreach to at-risk customers',
      status: 'processing',
      time: '30m ago',
      impact: 'high',
      agent: 'Retention Team'
    },
  ],
  charts: {
    performance: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'CSAT Score',
          data: [97, 98, 97, 99, 98, 96, 98],
          color: '#22D3EE',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Tickets Closed',
          data: [2800, 3100, 3400, 3547],
          color: '#3B82F6'
        }
      ]
    }
  }
};

// AI Management & Governance Department Configuration
export const aiGovernanceDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'ai-management-governance',
  departmentName: 'AI Management & Governance',
  primaryColor: '#8B5CF6',
  metrics: [
    {
      id: 'models',
      title: 'Models Deployed',
      value: '156',
      change: '+12',
      trend: 'up',
      icon: Cpu,
      color: '#22C55E',
      subtitle: 'Active models'
    },
    {
      id: 'compliance',
      title: 'Compliance Rate',
      value: '99.4%',
      change: '+0.5%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Policy compliance'
    },
    {
      id: 'risk-score',
      title: 'Risk Score',
      value: 'Low',
      change: 'Stable',
      trend: 'stable',
      icon: Shield,
      color: '#22C55E',
      subtitle: 'Overall AI risk'
    },
    {
      id: 'audits',
      title: 'Audits Completed',
      value: '48',
      change: '+6',
      trend: 'up',
      icon: FileText,
      color: '#3B82F6',
      subtitle: 'This quarter'
    },
    {
      id: 'performance',
      title: 'Model Performance',
      value: '94.7%',
      change: '+2.1%',
      trend: 'up',
      icon: BarChart3,
      color: '#8B5CF6',
      subtitle: 'Avg accuracy'
    },
    {
      id: 'governance',
      title: 'Governance Score',
      value: '97.2',
      change: '+1.8',
      trend: 'up',
      icon: Scale,
      color: '#22C55E',
      subtitle: 'Governance rating'
    },
  ],
  pipeline: [
    {
      id: 'register',
      name: 'Register',
      status: 'completed',
      duration: '0.5s',
      description: 'Model registered',
      lastUpdate: '16:12:45'
    },
    {
      id: 'evaluate',
      name: 'Evaluate',
      status: 'completed',
      duration: '1.2s',
      description: 'Risk assessment done',
      lastUpdate: '16:12:47'
    },
    {
      id: 'approve',
      name: 'Approve',
      status: 'active',
      duration: 'pending',
      description: 'Governance review',
      lastUpdate: '16:12:48'
    },
    {
      id: 'monitor',
      name: 'Monitor',
      status: 'pending',
      duration: 'pending',
      description: 'Performance tracking'
    },
    {
      id: 'audit',
      name: 'Audit',
      status: 'pending',
      duration: 'pending',
      description: 'Compliance audit'
    },
    {
      id: 'retire',
      name: 'Retire',
      status: 'pending',
      duration: 'pending',
      description: 'Lifecycle end'
    },
  ],
  activity: [
    {
      id: 'ai-act-1',
      task: 'New language model approved for production',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'AI Governance Board'
    },
    {
      id: 'ai-act-2',
      task: 'Model drift detected in recommendation engine',
      status: 'processing',
      time: '3h ago',
      impact: 'high',
      agent: 'Model Monitor'
    },
    {
      id: 'ai-act-3',
      task: 'Policy review for generative AI usage',
      status: 'completed',
      time: '5h ago',
      impact: 'medium',
      agent: 'Policy Team'
    },
  ],
  charts: {
    performance: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Model Deployments',
          data: [120, 135, 145, 156],
          color: '#8B5CF6',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Compliance Rate',
          data: [98.5, 98.8, 99.1, 99.2, 99.3, 99.4],
          color: '#22C55E'
        }
      ]
    }
  }
};

// Banking & Finance Department Configuration - Institutional Grade AI Command Center
export const bankingFinanceDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'banking-finance',
  departmentName: 'Banking & Finance',
  primaryColor: '#10B981',
  metrics: [
    {
      id: 'aum',
      title: 'Total AUM',
      value: '$48.2B',
      change: '+12.4%',
      trend: 'up',
      icon: DollarSign,
      color: '#10B981',
      subtitle: 'Assets Under Management'
    },
    {
      id: 'daily-pnl',
      title: 'Daily PnL',
      value: '+$182M',
      change: '+8.7%',
      trend: 'up',
      icon: TrendingUp,
      color: '#10B981',
      subtitle: 'Net Profit/Loss'
    },
    {
      id: 'portfolio-value',
      title: 'Portfolio Value',
      value: '$48.2B',
      change: '+2.3%',
      trend: 'up',
      icon: BarChart3,
      color: '#10B981',
      subtitle: 'Total portfolio'
    },
    {
      id: 'liquidity-ratio',
      title: 'Liquidity Ratio',
      value: '142%',
      change: '+5.2%',
      trend: 'up',
      icon: Activity,
      color: '#3B82F6',
      subtitle: 'Current ratio'
    },
    {
      id: 'credit-exposure',
      title: 'Credit Exposure',
      value: '$12.4B',
      change: '-3.1%',
      trend: 'down',
      icon: Shield,
      color: '#F59E0B',
      subtitle: 'Total exposure'
    },
    {
      id: 'sharpe-ratio',
      title: 'Sharpe Ratio',
      value: '2.84',
      change: '+0.12',
      trend: 'up',
      icon: LineChart,
      color: '#10B981',
      subtitle: 'Risk-adjusted return'
    },
    {
      id: 'default-probability',
      title: 'Default Probability',
      value: '0.8%',
      change: '-0.2%',
      trend: 'down',
      icon: AlertCircle,
      color: '#10B981',
      subtitle: 'Probability index'
    },
    {
      id: 'fraud-prevented',
      title: 'Fraud Prevented',
      value: '$620M',
      change: '+$45M',
      trend: 'up',
      icon: Shield,
      color: '#10B981',
      subtitle: 'Loss prevented YTD'
    },
    {
      id: 'vix',
      title: 'VIX Index',
      value: '18.4',
      change: '+2.1',
      trend: 'up',
      icon: Zap,
      color: '#F59E0B',
      subtitle: 'Volatility index'
    },
    {
      id: 'ai-trading-accuracy',
      title: 'AI Trading Accuracy',
      value: '94.7%',
      change: '+1.2%',
      trend: 'up',
      icon: Brain,
      color: '#06B6D4',
      subtitle: 'Prediction accuracy'
    },
  ],
  pipeline: [
    {
      id: 'signal',
      name: 'Market Signal Detected',
      status: 'completed',
      duration: '0.1s',
      description: 'AI pattern recognition',
      lastUpdate: '14:32:15'
    },
    {
      id: 'analysis',
      name: 'AI Analysis',
      status: 'completed',
      duration: '0.3s',
      description: 'Strategy evaluation',
      lastUpdate: '14:32:15'
    },
    {
      id: 'strategy',
      name: 'Strategy Selection',
      status: 'completed',
      duration: '0.2s',
      description: 'Optimal strategy chosen',
      lastUpdate: '14:32:16'
    },
    {
      id: 'execution',
      name: 'Trade Execution',
      status: 'active',
      duration: 'pending',
      description: 'Order routing',
      lastUpdate: '14:32:16'
    },
    {
      id: 'risk',
      name: 'Risk Validation',
      status: 'pending',
      duration: 'pending',
      description: 'Compliance check'
    },
    {
      id: 'portfolio',
      name: 'Portfolio Update',
      status: 'pending',
      duration: 'pending',
      description: 'Position reconciliation'
    },
  ],
  activity: [
    {
      id: 'bank-act-1',
      task: 'Large transaction flagged for AML review - $12.5M transfer',
      status: 'processing',
      time: '2m ago',
      impact: 'critical',
      agent: 'Fraud Detection AI'
    },
    {
      id: 'bank-act-2',
      task: 'AI executed 847 trades with 94.2% accuracy',
      status: 'completed',
      time: '5m ago',
      impact: 'high',
      agent: 'Trading Bot Alpha'
    },
    {
      id: 'bank-act-3',
      task: 'Portfolio rebalancing completed - Tech sector reduced by 3%',
      status: 'completed',
      time: '12m ago',
      impact: 'high',
      agent: 'Portfolio Manager AI'
    },
    {
      id: 'bank-act-4',
      task: 'Risk alert triggered - Credit exposure approaching limit',
      status: 'processing',
      time: '18m ago',
      impact: 'high',
      agent: 'Risk Management AI'
    },
    {
      id: 'bank-act-5',
      task: 'KYC process automated for 1,247 new customers',
      status: 'completed',
      time: '1h ago',
      impact: 'medium',
      agent: 'Onboarding Bot'
    },
  ],
  charts: {
    performance: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Portfolio Value ($B)',
          data: [42.5, 44.2, 45.8, 46.2, 47.1, 48.2],
          color: '#10B981',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Daily PnL ($M)',
          data: [145, 162, 178, 182],
          color: '#10B981'
        }
      ]
    }
  },
  // SECTION 1: AI FINANCIAL AGENTS
  aiFinancialAgents: {
    agents: [
      {
        id: 'agent-alpha',
        name: 'Agent Alpha',
        role: 'Trading Intelligence Agent',
        tradesExecuted: '18.4M',
        winRate: '72%',
        pnlImpact: '+$4.2B',
        riskLevel: 'medium',
        confidenceScore: 94,
        marketContribution: '38%'
      },
      {
        id: 'agent-sigma',
        name: 'Agent Sigma',
        role: 'Risk Management Agent',
        exposureMonitored: '$84B',
        riskAlerts: '12,480',
        accuracy: '96%',
        riskLevel: 'low',
        confidenceScore: 96,
        marketContribution: '28%'
      },
      {
        id: 'agent-ledger',
        name: 'Agent Ledger',
        role: 'Fraud Detection Agent',
        transactionsMonitored: '2.8B',
        fraudPrevented: '$620M',
        detectionAccuracy: '98%',
        riskLevel: 'low',
        confidenceScore: 98,
        marketContribution: '22%'
      },
      {
        id: 'agent-omega',
        name: 'Agent Omega',
        role: 'Portfolio Optimization Agent',
        pnlImpact: '+$2.1B',
        accuracy: '91%',
        riskLevel: 'medium',
        confidenceScore: 91,
        marketContribution: '12%'
      }
    ]
  },
  // SECTION 2: CFO COMMAND CENTER
  cfoCommandCenter: {
    totalPortfolioValue: '$48.2B',
    dailyPnL: '+$182M',
    activePositions: '128,420',
    riskExposure: 'Medium (Amber Zone)',
    liquidityAvailable: '$6.8B',
    portfolioHealth: 87,
    marketExposureBreakdown: [
      { sector: 'Technology', allocation: 28, value: '$13.5B' },
      { sector: 'Financial Services', allocation: 22, value: '$10.6B' },
      { sector: 'Healthcare', allocation: 15, value: '$7.2B' },
      { sector: 'Energy', allocation: 12, value: '$5.8B' },
      { sector: 'Consumer', allocation: 10, value: '$4.8B' },
      { sector: 'Industrial', allocation: 8, value: '$3.9B' },
      { sector: 'Real Estate', allocation: 5, value: '$2.4B' }
    ]
  },
  // SECTION 3: REAL-TIME TRADING CONTROL CENTER
  realTimeTrading: {
    markets: [
      { id: 'equity', name: 'Equity Trading', type: 'equity', status: 'active', volume: '$8.4B', change: '+2.4%', trend: 'up' },
      { id: 'forex', name: 'Forex Markets', type: 'forex', status: 'active', volume: '$12.7B', change: '+1.8%', trend: 'up' },
      { id: 'crypto', name: 'Crypto Markets', type: 'crypto', status: 'active', volume: '$3.2B', change: '-1.2%', trend: 'down' },
      { id: 'derivatives', name: 'Derivatives', type: 'derivatives', status: 'active', volume: '$5.6B', change: '+3.1%', trend: 'up' },
      { id: 'bonds', name: 'Bonds & Fixed Income', type: 'bonds', status: 'active', volume: '$4.1B', change: '+0.8%', trend: 'up' }
    ],
    workflow: [
      { step: 'Market Signal Detected', status: 'completed', duration: '0.1s' },
      { step: 'AI Analysis', status: 'completed', duration: '0.3s' },
      { step: 'Strategy Selection', status: 'completed', duration: '0.2s' },
      { step: 'Trade Execution', status: 'active', duration: 'pending' },
      { step: 'Risk Validation', status: 'pending', duration: 'pending' },
      { step: 'Portfolio Update', status: 'pending', duration: 'pending' }
    ],
    heatmapData: [
      { region: 'North America', intensity: 85, volume: '$18.4B' },
      { region: 'Europe', intensity: 72, volume: '$12.6B' },
      { region: 'Asia Pacific', intensity: 68, volume: '$10.2B' },
      { region: 'Latin America', intensity: 45, volume: '$3.8B' },
      { region: 'Middle East', intensity: 38, volume: '$2.4B' },
      { region: 'Africa', intensity: 28, volume: '$1.2B' }
    ]
  },
  // SECTION 4: PORTFOLIO MANAGEMENT HUB
  portfolioManagement: {
    assetAllocation: [
      { asset: 'Equities', allocation: 42, value: '$20.2B', performance: '+12.4%' },
      { asset: 'Fixed Income', allocation: 28, value: '$13.5B', performance: '+5.8%' },
      { asset: 'Alternatives', allocation: 15, value: '$7.2B', performance: '+8.2%' },
      { asset: 'Cash & Equivalents', allocation: 10, value: '$4.8B', performance: '+2.1%' },
      { asset: 'Commodities', allocation: 5, value: '$2.4B', performance: '+15.6%' }
    ],
    sectorExposure: [
      { sector: 'Technology', exposure: 28, risk: 'high' },
      { sector: 'Financial Services', exposure: 22, risk: 'medium' },
      { sector: 'Healthcare', exposure: 15, risk: 'low' },
      { sector: 'Energy', exposure: 12, risk: 'medium' },
      { sector: 'Consumer', exposure: 10, risk: 'low' },
      { sector: 'Industrial', exposure: 8, risk: 'medium' },
      { sector: 'Real Estate', exposure: 5, risk: 'low' }
    ],
    rebalancingSuggestions: [
      { id: 'rb-1', asset: 'Technology', currentAllocation: 28, targetAllocation: 25, reason: 'Reduce overexposure risk' },
      { id: 'rb-2', asset: 'Fixed Income', currentAllocation: 28, targetAllocation: 30, reason: 'Increase defensive positioning' },
      { id: 'rb-3', asset: 'Cash', currentAllocation: 10, targetAllocation: 12, reason: 'Build liquidity buffer' }
    ]
  },
  // SECTION 5: RISK MANAGEMENT & COMPLIANCE CENTER
  riskCompliance: {
    riskCategories: [
      { category: 'Credit Risk', score: 68, max: 100, trend: 'down', alerts: 23 },
      { category: 'Market Risk', score: 72, max: 100, trend: 'up', alerts: 18 },
      { category: 'Operational Risk', score: 45, max: 100, trend: 'stable', alerts: 8 },
      { category: 'Liquidity Risk', score: 38, max: 100, trend: 'down', alerts: 5 },
      { category: 'Regulatory Risk', score: 52, max: 100, trend: 'stable', alerts: 12 }
    ],
    stressTestScenarios: [
      { scenario: 'Market Crash (-30%)', impact: '-$12.4B', probability: 15, mitigation: 'Reduce equity exposure' },
      { scenario: 'Interest Rate Hike (+2%)', impact: '-$4.8B', probability: 35, mitigation: 'Extend duration hedge' },
      { scenario: 'Credit Event', impact: '-$6.2B', probability: 20, mitigation: 'Increase credit reserves' },
      { scenario: 'Liquidity Crisis', impact: '-$2.1B', probability: 10, mitigation: 'Build cash buffer' }
    ],
    varMetrics: {
      var95: '$847M',
      var99: '$1.24B',
      timeHorizon: '1 day'
    }
  },
  // SECTION 6: CREDIT INTELLIGENCE ENGINE
  creditIntelligence: {
    loanApplications: {
      pending: 1247,
      approved: 8456,
      rejected: 892
    },
    creditScores: {
      average: 724,
      distribution: [
        { range: '800-850', count: 1245 },
        { range: '740-799', count: 3456 },
        { range: '670-739', count: 2890 },
        { range: '580-669', count: 987 },
        { range: '300-579', count: 312 }
      ]
    },
    defaultRisk: {
      probability: 0.8,
      highRiskLoans: 234,
      totalExposure: '$12.4B'
    },
    exposureLimits: [
      { category: 'Corporate', current: '$6.8B', limit: '$8.0B', utilization: 85 },
      { category: 'Retail', current: '$3.2B', limit: '$4.0B', utilization: 80 },
      { category: 'SME', current: '$1.8B', limit: '$2.5B', utilization: 72 },
      { category: 'Mortgage', current: '$0.6B', limit: '$1.0B', utilization: 60 }
    ]
  },
  // SECTION 7: FRAUD DETECTION & TRANSACTION SECURITY
  fraudDetection: {
    suspiciousTransactions: 1247,
    amlFlags: 456,
    identityVerificationRate: 98.7,
    fraudNetwork: [
      { id: 'fn-1', entity: 'Shell Company A', connections: 23, riskLevel: 'high' },
      { id: 'fn-2', entity: 'Offshore Account B', connections: 18, riskLevel: 'high' },
      { id: 'fn-3', entity: 'High-Risk Individual C', connections: 12, riskLevel: 'medium' },
      { id: 'fn-4', entity: 'Suspicious Merchant D', connections: 8, riskLevel: 'medium' }
    ],
    anomalyDetection: [
      { id: 'ad-1', type: 'Unusual Transaction Pattern', severity: 'high', timestamp: '14:32:15' },
      { id: 'ad-2', type: 'Geolocation Mismatch', severity: 'medium', timestamp: '14:28:42' },
      { id: 'ad-3', type: 'Velocity Breach', severity: 'high', timestamp: '14:15:33' },
      { id: 'ad-4', type: 'Account Behavior Anomaly', severity: 'low', timestamp: '13:58:21' }
    ]
  },
  // SECTION 8: TREASURY & LIQUIDITY MANAGEMENT
  treasuryLiquidity: {
    cashFlow: {
      inflow: '$2.4B',
      outflow: '$1.8B',
      net: '+$0.6B'
    },
    liquidityPosition: {
      available: '$6.8B',
      required: '$4.2B',
      buffer: '$2.6B'
    },
    capitalReserves: {
      tier1: '$4.2B',
      tier2: '$1.8B',
      total: '$6.0B'
    },
    fundingGap: [
      { period: '30 days', requirement: '$1.2B', available: '$1.8B', gap: '+$0.6B' },
      { period: '90 days', requirement: '$3.4B', available: '$4.2B', gap: '+$0.8B' },
      { period: '180 days', requirement: '$6.8B', available: '$7.2B', gap: '+$0.4B' },
      { period: '360 days', requirement: '$12.4B', available: '$13.8B', gap: '+$1.4B' }
    ]
  },
  // SECTION 9: MARKET INTELLIGENCE CENTER
  marketIntelligenceCenter: {
    globalIndices: [
      { index: 'S&P 500', value: 5234.56, change: '+1.24%', trend: 'up' },
      { index: 'Dow Jones', value: 39123.45, change: '+0.87%', trend: 'up' },
      { index: 'NASDAQ', value: 16456.78, change: '+1.56%', trend: 'up' },
      { index: 'FTSE 100', value: 8123.45, change: '-0.34%', trend: 'down' },
      { index: 'DAX', value: 18234.56, change: '+0.45%', trend: 'up' },
      { index: 'Nikkei 225', value: 38456.78, change: '+1.12%', trend: 'up' },
      { index: 'Shanghai', value: 3123.45, change: '-0.67%', trend: 'down' },
      { index: 'Hang Seng', value: 17845.67, change: '+0.23%', trend: 'up' }
    ],
    macroIndicators: [
      { indicator: 'Fed Funds Rate', value: '5.25-5.50%', change: '+0.25%', impact: 'positive' },
      { indicator: 'GDP Growth (US)', value: '2.4%', change: '+0.3%', impact: 'positive' },
      { indicator: 'Inflation (CPI)', value: '3.2%', change: '-0.2%', impact: 'positive' },
      { indicator: 'Unemployment', value: '3.9%', change: '-0.1%', impact: 'positive' },
      { indicator: 'Consumer Confidence', value: '104.2', change: '+2.4', impact: 'positive' }
    ],
    newsSentiment: [
      { title: 'Fed signals potential rate cut in Q4', sentiment: 'positive', time: '2h ago', source: 'Reuters' },
      { title: 'Tech sector faces regulatory scrutiny', sentiment: 'negative', time: '4h ago', source: 'WSJ' },
      { title: 'Global markets rally on economic data', sentiment: 'positive', time: '6h ago', source: 'Bloomberg' },
      { title: 'Energy prices surge amid supply concerns', sentiment: 'negative', time: '8h ago', source: 'FT' }
    ],
    geopoliticalEvents: [
      { event: 'US-China Trade Talks', impact: 'Medium', probability: 65, timeframe: 'Q3 2026' },
      { event: 'EU Energy Policy Changes', impact: 'High', probability: 72, timeframe: 'Q4 2026' },
      { event: 'Middle East Tensions', impact: 'Medium', probability: 45, timeframe: 'Ongoing' }
    ]
  },
  // SECTION 10: PAYMENT & SETTLEMENT NETWORK
  paymentSettlement: {
    transactionsProcessed: '2.8M',
    settlementTime: 'T+0.5',
    crossBorderPayments: '$847M',
    swiftMessages: 124567,
    paymentFailures: 0.02,
    successRate: 99.98,
    transactionFlow: [
      { source: 'North America', destination: 'Europe', volume: '$2.4B', status: 'processing' },
      { source: 'Europe', destination: 'Asia Pacific', volume: '$1.8B', status: 'completed' },
      { source: 'Asia Pacific', destination: 'North America', volume: '$1.2B', status: 'processing' },
      { source: 'Latin America', destination: 'North America', volume: '$0.6B', status: 'completed' }
    ]
  },
  // SECTION 11: AI FINANCE INSIGHTS
  aiInsights: {
    insights: [
      { id: 'insight-1', type: 'risk', title: 'Tech sector overexposure detected in portfolio', description: 'Technology allocation at 28% exceeds optimal range of 20-25%, increasing concentration risk', impact: 'high', action: 'Reduce tech exposure by 3-5%' },
      { id: 'insight-2', type: 'opportunity', title: 'Interest rate hike likely impacting bond positions', description: 'Fed signals potential rate cut, creating opportunity in fixed income sector', impact: 'high', action: 'Increase bond allocation by 2-3%' },
      { id: 'insight-3', type: 'risk', title: 'Unusual trading activity detected in derivatives market', description: 'Anomalous options volume detected in energy sector, potential manipulation', impact: 'high', action: 'Investigate and monitor closely' },
      { id: 'insight-4', type: 'recommendation', title: 'Liquidity buffer below optimal threshold', description: 'Current liquidity at 142% below target of 150%, consider building reserves', impact: 'medium', action: 'Increase cash position by $0.5B' },
      { id: 'insight-5', type: 'opportunity', title: 'Arbitrage opportunity identified in FX markets', description: 'EUR/USD mispricing detected, 12 basis point arbitrage window', impact: 'medium', action: 'Execute arbitrage strategy' }
    ]
  },
  // SECTION 12: REAL-TIME FINANCIAL OPERATIONS FEED
  financialOperationsFeed: {
    operations: [
      { id: 'op-1', type: 'trade', description: 'Trade executed: AAPL 50,000 shares @ $178.45', timestamp: '14:32:15', impact: 'high' },
      { id: 'op-2', type: 'position', description: 'Position opened: BTC long $125M', timestamp: '14:31:42', impact: 'high' },
      { id: 'op-3', type: 'risk', description: 'Risk alert triggered: Credit exposure at 85% of limit', timestamp: '14:30:18', impact: 'critical' },
      { id: 'op-4', type: 'fraud', description: 'Fraud detected: Suspicious transaction $12.5M flagged', timestamp: '14:28:33', impact: 'critical' },
      { id: 'op-5', type: 'portfolio', description: 'Portfolio rebalanced: Tech reduced by 3%', timestamp: '14:25:12', impact: 'high' },
      { id: 'op-6', type: 'market', description: 'Market signal updated: Bullish sentiment detected', timestamp: '14:22:45', impact: 'medium' },
      { id: 'op-7', type: 'settlement', description: 'Settlement completed: 1,247 transactions processed', timestamp: '14:18:21', impact: 'medium' }
    ]
  },
  // SECTION 13: SYSTEM HEALTH & FINTECH INFRASTRUCTURE
  systemHealth: {
    metrics: [
      { id: 'health-1', label: 'Trading API Latency', value: 12, max: 100, unit: 'ms', icon: Server, status: 'healthy' },
      { id: 'health-2', label: 'Banking Core Systems', value: 99.9, max: 100, unit: '%', icon: Server, status: 'healthy' },
      { id: 'health-3', label: 'Payment Gateway Uptime', value: 99.97, max: 100, unit: '%', icon: Wifi, status: 'healthy' },
      { id: 'health-4', label: 'Market Data Feed Quality', value: 99.8, max: 100, unit: '%', icon: Activity, status: 'healthy' },
      { id: 'health-5', label: 'AI Trading Engine Load', value: 68, max: 100, unit: '%', icon: Cpu, status: 'healthy' }
    ],
    modelLatency: 85,
    apiHealth: 'operational',
    exchangeConnectivity: [
      { exchange: 'NYSE', status: 'connected', latency: 8 },
      { exchange: 'NASDAQ', status: 'connected', latency: 10 },
      { exchange: 'LSE', status: 'connected', latency: 15 },
      { exchange: 'TSE', status: 'connected', latency: 22 },
      { exchange: 'HKEX', status: 'connected', latency: 28 }
    ],
    dataFeedQuality: 99.8
  }
};

// E-Commerce Department Configuration
export const ecommerceDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'e-commerce',
  departmentName: 'E-Commerce',
  primaryColor: '#38BDF8',
  metrics: [
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      value: '$4.2B',
      change: '+18.4%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Year to date'
    },
    {
      id: 'conversion-rate',
      title: 'Conversion Rate',
      value: '3.8%',
      change: '+0.6%',
      trend: 'up',
      icon: Target,
      color: '#22C55E',
      subtitle: 'Visitor to buyer'
    },
    {
      id: 'aov',
      title: 'Average Order Value',
      value: '$142',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: '#3B82F6',
      subtitle: 'Per order'
    },
    {
      id: 'cac',
      title: 'Customer Acquisition Cost',
      value: '$28',
      change: '-5.4%',
      trend: 'up',
      icon: Users,
      color: '#22C55E',
      subtitle: 'Per new customer'
    },
    {
      id: 'ltv',
      title: 'Customer Lifetime Value',
      value: '$892',
      change: '+12.8%',
      trend: 'up',
      icon: TrendingUp,
      color: '#22C55E',
      subtitle: 'Average LTV'
    },
    {
      id: 'cart-abandonment',
      title: 'Cart Abandonment Rate',
      value: '67.4%',
      change: '-4.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: '#EF4444',
      subtitle: 'Abandonment rate'
    },
    {
      id: 'roas',
      title: 'ROAS',
      value: '4.8x',
      change: '+0.6',
      trend: 'up',
      icon: BarChart3,
      color: '#22C55E',
      subtitle: 'Return on ad spend'
    },
    {
      id: 'gross-margin',
      title: 'Gross Margin',
      value: '42.3%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: '#22C55E',
      subtitle: 'Profit margin'
    },
    {
      id: 'inventory-turnover',
      title: 'Inventory Turnover',
      value: '8.4x',
      change: '+0.8',
      trend: 'up',
      icon: Activity,
      color: '#3B82F6',
      subtitle: 'Annual rate'
    },
    {
      id: 'ai-revenue-uplift',
      title: 'AI Revenue Uplift',
      value: '+$184M',
      change: '+22.4%',
      trend: 'up',
      icon: Brain,
      color: '#8B5CF6',
      subtitle: 'AI-generated revenue'
    },
  ],
  pipeline: [
    {
      id: 'visitor',
      name: 'Visitor',
      status: 'completed',
      duration: '0.1s',
      description: 'Traffic acquired',
      lastUpdate: '14:32:15'
    },
    {
      id: 'product-view',
      name: 'Product View',
      status: 'completed',
      duration: '0.3s',
      description: 'Product page viewed',
      lastUpdate: '14:32:18'
    },
    {
      id: 'add-to-cart',
      name: 'Add to Cart',
      status: 'completed',
      duration: '0.2s',
      description: 'Item added to cart',
      lastUpdate: '14:32:20'
    },
    {
      id: 'checkout',
      name: 'Checkout',
      status: 'active',
      duration: 'pending',
      description: 'Checkout process',
      lastUpdate: '14:32:22'
    },
    {
      id: 'payment',
      name: 'Payment',
      status: 'pending',
      duration: 'pending',
      description: 'Payment processing'
    },
    {
      id: 'purchase',
      name: 'Purchase',
      status: 'pending',
      duration: 'pending',
      description: 'Order confirmed'
    },
  ],
  activity: [
    {
      id: 'ecom-act-1',
      task: 'Order #12847 placed - $2,340 revenue',
      status: 'completed',
      time: '2m ago',
      impact: 'high',
      agent: 'Order System'
    },
    {
      id: 'ecom-act-2',
      task: 'Payment confirmed via Stripe - Order #12846',
      status: 'completed',
      time: '5m ago',
      impact: 'high',
      agent: 'Payment Gateway'
    },
    {
      id: 'ecom-act-3',
      task: 'Cart abandonment detected - Mobile user',
      status: 'processing',
      time: '8m ago',
      impact: 'medium',
      agent: 'Recovery AI'
    },
    {
      id: 'ecom-act-4',
      task: 'Ad campaign optimized - ROAS +15%',
      status: 'completed',
      time: '12m ago',
      impact: 'high',
      agent: 'Marketing AI'
    },
    {
      id: 'ecom-act-5',
      task: 'Dynamic price updated - SKU #4521',
      status: 'completed',
      time: '15m ago',
      impact: 'medium',
      agent: 'Pricing Engine'
    },
    {
      id: 'ecom-act-6',
      task: 'Product trending - Wireless Earbuds Pro',
      status: 'completed',
      time: '18m ago',
      impact: 'medium',
      agent: 'Trend Detector'
    },
    {
      id: 'ecom-act-7',
      task: 'Inventory alert - Warehouse EU low stock',
      status: 'processing',
      time: '22m ago',
      impact: 'high',
      agent: 'Inventory AI'
    },
  ],
  charts: {
    performance: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Daily Revenue',
          data: [580, 620, 590, 650, 720, 850, 690],
          color: '#22C55E',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Conversion Rate',
          data: [3.2, 3.5, 3.6, 3.8],
          color: '#22C55E'
        }
      ]
    }
  },
  // SECTION 1: AI E-COMMERCE AGENTS
  aiCommerceAgents: {
    agents: [
      {
        id: 'agent-nova',
        name: 'Agent Nova',
        role: 'Revenue Optimization Agent',
        avatar: '🚀',
        performanceScore: 94,
        revenueManaged: '$2.8B',
        conversionLift: '+18%',
        optimizationActions: '842K',
        status: 'active',
        lastActivity: '2m ago'
      },
      {
        id: 'agent-pulse',
        name: 'Agent Pulse',
        role: 'Customer Behavior Agent',
        avatar: '💓',
        performanceScore: 91,
        usersTracked: '48M',
        predictionsMade: '128M',
        accuracy: '96%',
        status: 'active',
        lastActivity: '5m ago'
      },
      {
        id: 'agent-prism',
        name: 'Agent Prism',
        role: 'Pricing Intelligence Agent',
        avatar: '💎',
        performanceScore: 89,
        pricesOptimized: '82M SKUs',
        marginImprovement: '+14%',
        demandSensitivity: 'High accuracy',
        status: 'active',
        lastActivity: '8m ago'
      },
      {
        id: 'agent-spectrum',
        name: 'Agent Spectrum',
        role: 'Marketing Intelligence Agent',
        avatar: '🌈',
        performanceScore: 87,
        campaignsOptimized: '12.4K',
        roasImprovement: '+22%',
        audienceSegments: '156',
        status: 'active',
        lastActivity: '12m ago'
      },
      {
        id: 'agent-orbit',
        name: 'Agent Orbit',
        role: 'Inventory Forecast Agent',
        avatar: '🌍',
        performanceScore: 92,
        stockoutPrediction: '94%',
        demandAccuracy: '89%',
        warehousesManaged: '24',
        status: 'active',
        lastActivity: '15m ago'
      }
    ]
  },
  // SECTION 2: CHIEF COMMERCE OFFICER DASHBOARD
  ccoCommandCenter: {
    totalRevenue: '$4.2B',
    conversionRate: '3.8%',
    activeCustomers: '28.4M',
    ordersToday: '1.8M',
    aiRevenueImpact: '+$184M',
    growthTrajectory: [
      { period: 'Q1', revenue: 0.85, target: 0.80 },
      { period: 'Q2', revenue: 1.02, target: 0.95 },
      { period: 'Q3', revenue: 1.18, target: 1.10 },
      { period: 'Q4', revenue: 1.15, target: 1.15 }
    ],
    revenueFunnel: {
      visitors: 15600000,
      productViews: 8200000,
      addToCart: 3400000,
      checkout: 1800000,
      purchase: 1200000
    },
    platformHealth: {
      uptime: '99.97%',
      apiLatency: '45ms',
      errorRate: '0.02%',
      satisfactionScore: '94.7%'
    }
  },
  // SECTION 3: REAL-TIME SALES & CONVERSION ENGINE
  salesConversionEngine: {
    trafficSources: [
      { source: 'Organic Search', visitors: 452000, conversion: 4.2 },
      { source: 'Paid Ads', visitors: 328000, conversion: 3.8 },
      { source: 'Social Media', visitors: 245000, conversion: 3.5 },
      { source: 'Email', visitors: 189000, conversion: 5.1 },
      { source: 'Direct', visitors: 156000, conversion: 4.8 }
    ],
    funnelDropoffs: [
      { stage: 'Product View', dropoff: 47.4, volume: 7400000 },
      { stage: 'Add to Cart', dropoff: 58.5, volume: 4800000 },
      { stage: 'Checkout', dropoff: 47.1, volume: 1600000 },
      { stage: 'Payment', dropoff: 33.3, volume: 600000 }
    ],
    checkoutPerformance: {
      completionRate: '66.7%',
      averageTime: '4m 32s',
      paymentSuccess: '98.4%',
      guestCheckout: '42.3%'
    },
    productPageViews: {
      topProducts: [
        { product: 'Wireless Earbuds Pro', views: 245000, conversion: 5.2 },
        { product: 'Smart Watch Series X', views: 198000, conversion: 4.8 },
        { product: 'Ultra HD Monitor', views: 167000, conversion: 4.1 },
        { product: 'Ergonomic Chair', views: 145000, conversion: 3.9 },
        { product: 'Mechanical Keyboard', views: 132000, conversion: 4.5 }
      ]
    },
    conversionEvents: [
      { event: 'Add to Cart', count: 3400000, rate: 21.8 },
      { event: 'Initiate Checkout', count: 1800000, rate: 11.5 },
      { event: 'Purchase', count: 1200000, rate: 7.7 },
      { event: 'Add to Wishlist', count: 890000, rate: 5.7 }
    ]
  },
  // SECTION 4: MARKETING & AD INTELLIGENCE CENTER
  marketingAdIntelligence: {
    paidAdsPerformance: [
      { channel: 'Google Ads', spend: 2840000, revenue: 12400000, roas: 4.4 },
      { channel: 'Facebook Ads', spend: 1920000, revenue: 8200000, roas: 4.3 },
      { channel: 'Instagram Ads', spend: 1680000, revenue: 7400000, roas: 4.4 },
      { channel: 'TikTok Ads', spend: 890000, revenue: 3800000, roas: 4.3 },
      { channel: 'YouTube Ads', spend: 720000, revenue: 3100000, roas: 4.3 }
    ],
    roasByChannel: [
      { channel: 'Email Marketing', roas: 42.1 },
      { channel: 'SEO', roas: 28.4 },
      { channel: 'Google Ads', roas: 4.4 },
      { channel: 'Facebook Ads', roas: 4.3 },
      { channel: 'Instagram Ads', roas: 4.4 }
    ],
    campaignOptimization: [
      { campaign: 'Summer Sale 2024', status: 'active', budget: 450000, spent: 312000, roas: 4.8 },
      { campaign: 'New Product Launch', status: 'active', budget: 380000, spent: 289000, roas: 4.2 },
      { campaign: 'Retargeting Q3', status: 'active', budget: 280000, spent: 198000, roas: 5.1 },
      { campaign: 'Brand Awareness', status: 'paused', budget: 250000, spent: 250000, roas: 3.8 }
    ],
    audienceSegments: [
      { segment: 'Gen Z Buyers', size: 8400000, conversion: 4.2, ltv: 485 },
      { segment: 'Millennial Shoppers', size: 12400000, conversion: 4.5, ltv: 520 },
      { segment: 'Premium Customers', size: 2800000, conversion: 5.8, ltv: 1200 },
      { segment: 'Deal Seekers', size: 4800000, conversion: 3.8, ltv: 285 }
    ],
    attributionModels: [
      { model: 'Last Click', attributed: 3200000, share: 42 },
      { model: 'First Click', attributed: 1800000, share: 24 },
      { model: 'Linear', attributed: 1400000, share: 18 },
      { model: 'Time Decay', attributed: 1200000, share: 16 }
    ]
  },
  // SECTION 5: PRODUCT & CATALOG INTELLIGENCE
  productCatalogIntelligence: {
    topProducts: [
      { product: 'Wireless Earbuds Pro', revenue: 12400000, units: 89000, margin: 42, trend: 'up' },
      { product: 'Smart Watch Series X', revenue: 9800000, units: 45000, margin: 38, trend: 'up' },
      { product: 'Ultra HD Monitor', revenue: 7200000, units: 28000, margin: 35, trend: 'stable' },
      { product: 'Ergonomic Chair', revenue: 5400000, units: 18000, margin: 45, trend: 'up' },
      { product: 'Mechanical Keyboard', revenue: 4800000, units: 32000, margin: 40, trend: 'up' }
    ],
    trendingItems: [
      { product: 'Wireless Earbuds Pro', trend: '+124%', velocity: 'very high' },
      { product: 'Smart Watch Series X', trend: '+89%', velocity: 'high' },
      { product: 'Portable Charger', trend: '+67%', velocity: 'high' },
      { product: 'Phone Stand', trend: '+45%', velocity: 'medium' }
    ],
    underperformingSkus: [
      { product: 'Legacy Mouse', revenue: 120000, target: 450000, gap: 73, action: 'discount' },
      { product: 'Basic Keyboard', revenue: 89000, target: 320000, gap: 72, action: 'bundle' },
      { product: 'Standard Monitor', revenue: 340000, target: 890000, gap: 62, action: 'promote' }
    ],
    productRecommendations: {
      accuracy: 94.2,
      clickThrough: 8.7,
      conversionLift: 22,
      revenueImpact: 48000000
    },
    demandForecasts: [
      { product: 'Wireless Earbuds Pro', current: 89000, forecast: 125000, confidence: 94 },
      { product: 'Smart Watch Series X', current: 45000, forecast: 62000, confidence: 89 },
      { product: 'Ultra HD Monitor', current: 28000, forecast: 34000, confidence: 82 }
    ]
  },
  // SECTION 6: DYNAMIC PRICING ENGINE
  dynamicPricingEngine: {
    priceElasticity: [
      { product: 'Wireless Earbuds Pro', elasticity: -1.8, optimalPrice: 149, currentPrice: 129 },
      { product: 'Smart Watch Series X', elasticity: -1.4, optimalPrice: 349, currentPrice: 299 },
      { product: 'Ultra HD Monitor', elasticity: -1.2, optimalPrice: 449, currentPrice: 399 }
    ],
    competitorPricing: [
      { product: 'Wireless Earbuds Pro', ourPrice: 129, competitor: 149, position: 'lower' },
      { product: 'Smart Watch Series X', ourPrice: 299, competitor: 329, position: 'lower' },
      { product: 'Ultra HD Monitor', ourPrice: 399, competitor: 449, position: 'lower' }
    ],
    discountPerformance: [
      { discount: '10%', lift: 12, margin: 38, roi: 2.8 },
      { discount: '15%', lift: 18, margin: 34, roi: 3.1 },
      { discount: '20%', lift: 25, margin: 30, roi: 3.4 },
      { discount: '25%', lift: 32, margin: 26, roi: 3.2 }
    ],
    marginOptimization: {
      currentMargin: 42.3,
      targetMargin: 45,
      potentialUplift: 28000000,
      recommendedActions: ['Dynamic pricing', 'Bundle optimization', 'Cost reduction']
    }
  },
  // SECTION 7: INVENTORY & FULFILLMENT HUB
  inventoryFulfillmentHub: {
    stockLevels: [
      { warehouse: 'North America', totalStock: 2450000, lowStock: 124, outOfStock: 8 },
      { warehouse: 'Europe', totalStock: 1820000, lowStock: 89, outOfStock: 12 },
      { warehouse: 'Asia Pacific', totalStock: 1680000, lowStock: 156, outOfStock: 18 },
      { warehouse: 'Latin America', totalStock: 890000, lowStock: 67, outOfStock: 5 }
    ],
    warehouseDistribution: [
      { warehouse: 'North America', utilization: 78, capacity: 3200000 },
      { warehouse: 'Europe', utilization: 82, capacity: 2200000 },
      { warehouse: 'Asia Pacific', utilization: 71, capacity: 2400000 },
      { warehouse: 'Latin America', utilization: 65, capacity: 1400000 }
    ],
    stockouts: [
      { product: 'Wireless Earbuds Pro', regions: ['EU', 'APAC'], estimatedLoss: 890000 },
      { product: 'Smart Watch Series X', regions: ['NA'], estimatedLoss: 450000 },
      { product: 'Ultra HD Monitor', regions: ['LATAM'], estimatedLoss: 280000 }
    ],
    reorderPoints: [
      { product: 'Wireless Earbuds Pro', currentStock: 4500, reorderPoint: 8000, urgency: 'high' },
      { product: 'Smart Watch Series X', currentStock: 6200, reorderPoint: 10000, urgency: 'medium' },
      { product: 'Ultra HD Monitor', currentStock: 3400, reorderPoint: 6000, urgency: 'medium' }
    ],
    fulfillmentSpeed: {
      sameDay: 68,
      nextDay: 24,
      twoDay: 6,
      standard: 2
    }
  },
  // SECTION 8: CUSTOMER INTELLIGENCE HUB
  customerIntelligenceHub: {
    customerSegments: [
      { segment: 'VIP Customers', count: 280000, revenue: 1240000000, ltv: 4428 },
      { segment: 'Regular Shoppers', count: 1400000, revenue: 1680000000, ltv: 1200 },
      { segment: 'Occasional Buyers', count: 4200000, revenue: 840000000, ltv: 200 },
      { segment: 'New Customers', count: 8400000, revenue: 420000000, ltv: 50 }
    ],
    repeatPurchaseRate: {
      overall: 42.3,
      thirtyDays: 28.4,
      ninetyDays: 52.1,
      oneYear: 68.7
    },
    behavioralProfiles: [
      { profile: 'Deal Seekers', count: 4800000, avgOrder: 85, frequency: 4.2 },
      { profile: 'Premium Buyers', count: 2800000, avgOrder: 285, frequency: 2.8 },
      { profile: 'Impulse Buyers', count: 3400000, avgOrder: 65, frequency: 6.1 },
      { profile: 'Researchers', count: 6200000, avgOrder: 145, frequency: 1.8 }
    ],
    churnRisk: [
      { segment: 'High Risk', count: 890000, probability: 78 },
      { segment: 'Medium Risk', count: 1680000, probability: 45 },
      { segment: 'Low Risk', count: 4200000, probability: 18 },
      { segment: 'Safe', count: 5600000, probability: 5 }
    ],
    lifetimeValue: {
      current: 892,
      target: 1050,
      growth: 18.4,
      drivers: ['Personalization', 'Loyalty Program', 'Cross-sell']
    }
  },
  // SECTION 9: PERSONALIZATION ENGINE
  personalizationEngine: {
    productRecommendations: {
      accuracy: 94.2,
      coverage: 89.4,
      diversity: 78.5,
      novelty: 65.2
    },
    homepagePersonalization: {
      conversionLift: 28,
      engagementIncrease: 42,
      timeOnSite: 245,
      bounceRateReduction: 35
    },
    emailPersonalization: {
      openRate: 42.8,
      clickRate: 18.4,
      conversionRate: 8.2,
      lift: 52
    },
    onSiteAISuggestions: {
      acceptanceRate: 34.2,
      averageOrderIncrease: 22,
      cartValueIncrease: 18,
      conversionIncrease: 15
    }
  },
  // SECTION 10: FRAUD & PAYMENT SECURITY
  fraudPaymentSecurity: {
    fraudTransactions: {
      totalAttempts: 12400,
      blocked: 11800,
      rate: 0.08,
      valueProtected: 2800000
    },
    chargebacks: {
      total: 890,
      rate: 0.07,
      won: 620,
      lost: 270,
      amount: 340000
    },
    paymentFailures: {
      total: 89000,
      rate: 4.2,
      reasons: ['Insufficient funds', 'Card declined', 'Technical error'],
      retrySuccess: 68
    },
    riskScores: {
      lowRisk: 94.2,
      mediumRisk: 4.8,
      highRisk: 0.8,
      criticalRisk: 0.2
    }
  },
  // SECTION 11: AI E-COMMERCE INSIGHTS
  aiEcommerceInsights: {
    insights: [
      { id: 'insight-1', type: 'alert', title: 'Cart abandonment increased by 12% in mobile users', description: 'Mobile checkout friction detected, consider simplified checkout flow', impact: 'high', action: 'Optimize mobile checkout' },
      { id: 'insight-2', type: 'opportunity', title: 'High ROI audience segment identified in Gen Z buyers', description: 'Gen Z segment showing 4.2x ROAS, recommend increased ad spend', impact: 'high', action: 'Increase Gen Z ad budget' },
      { id: 'insight-3', type: 'recommendation', title: 'Product pricing adjustment could increase revenue by 9%', description: 'Dynamic pricing analysis suggests 5-8% price increase on top products', impact: 'medium', action: 'Implement dynamic pricing' },
      { id: 'insight-4', type: 'risk', title: 'Inventory risk detected for top-selling SKU in EU region', description: 'Stockout risk for Wireless Earbuds Pro in EU within 7 days', impact: 'high', action: 'Expedite EU restocking' },
      { id: 'insight-5', type: 'optimization', title: 'Ad spend inefficiency detected in social campaigns', description: 'Facebook and Instagram ads showing declining ROAS, recommend reallocation', impact: 'medium', action: 'Reallocate ad spend' }
    ]
  },
  // SECTION 12: REAL-TIME COMMERCE ACTIVITY FEED
  commerceActivityFeed: {
    activities: [
      { id: 'feed-1', type: 'order', description: 'Order #12848 placed - $1,245', timestamp: '1m ago', impact: 'high' },
      { id: 'feed-2', type: 'payment', description: 'Payment confirmed - Order #12847', timestamp: '3m ago', impact: 'high' },
      { id: 'feed-3', type: 'cart', description: 'Cart abandoned - Mobile user', timestamp: '5m ago', impact: 'medium' },
      { id: 'feed-4', type: 'campaign', description: 'Ad campaign optimized - ROAS +15%', timestamp: '8m ago', impact: 'high' },
      { id: 'feed-5', type: 'pricing', description: 'Price updated - SKU #4521', timestamp: '12m ago', impact: 'medium' },
      { id: 'feed-6', type: 'trending', description: 'Product trending - Wireless Earbuds Pro', timestamp: '15m ago', impact: 'medium' },
      { id: 'feed-7', type: 'inventory', description: 'Inventory updated - Warehouse EU', timestamp: '18m ago', impact: 'high' },
      { id: 'feed-8', type: 'fraud', description: 'Fraud attempt blocked - $2,450', timestamp: '22m ago', impact: 'critical' }
    ]
  },
  // SECTION 13: SYSTEM HEALTH & PLATFORM INFRASTRUCTURE
  systemHealth: {
    metrics: [
      { id: 'health-1', label: 'API Latency', value: 45, max: 100, unit: 'ms', icon: Server, status: 'healthy' },
      { id: 'health-2', label: 'Payment Gateway Uptime', value: 99.97, max: 100, unit: '%', icon: Wifi, status: 'healthy' },
      { id: 'health-3', label: 'Checkout Systems', value: 99.95, max: 100, unit: '%', icon: ShoppingCart, status: 'healthy' },
      { id: 'health-4', label: 'Recommendation Engine', value: 99.92, max: 100, unit: '%', icon: Brain, status: 'healthy' },
      { id: 'health-5', label: 'AI Systems Load', value: 68, max: 100, unit: '%', icon: Cpu, status: 'healthy' }
    ],
    modelLatency: 85,
    apiHealth: 'operational',
    paymentGatewayConnectivity: [
      { gateway: 'Stripe', status: 'connected', latency: 45 },
      { gateway: 'PayPal', status: 'connected', latency: 52 },
      { gateway: 'Square', status: 'connected', latency: 48 }
    ],
    dataFeedQuality: 99.8
  }
};

// Professional Services Department Configuration
export const consultingDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'consulting-advisory',
  departmentName: 'Professional Services',
  primaryColor: '#0F766E',
  metrics: [
    {
      id: 'delivery-value',
      title: 'Delivery Value',
      value: '$12.1M',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Project value delivered'
    },
    {
      id: 'utilization',
      title: 'Utilization',
      value: '88%',
      change: '+3.4%',
      trend: 'up',
      icon: BarChart3,
      color: '#22C55E',
      subtitle: 'Resource utilization'
    },
    {
      id: 'projects',
      title: 'Active Projects',
      value: '156',
      change: '+12',
      trend: 'up',
      icon: Briefcase,
      color: '#3B82F6',
      subtitle: 'Current engagements'
    },
    {
      id: 'margin',
      title: 'Project Margin',
      value: '34.2%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: '#22C55E',
      subtitle: 'Average margin'
    },
    {
      id: 'satisfaction',
      title: 'Client Satisfaction',
      value: '94.7%',
      change: '+1.8%',
      trend: 'up',
      icon: Users,
      color: '#22C55E',
      subtitle: 'Client rating'
    },
    {
      id: 'resources',
      title: 'Resources',
      value: '360',
      change: '+24',
      trend: 'up',
      icon: Users,
      color: '#8B5CF6',
      subtitle: 'Consultants deployed'
    },
  ],
  pipeline: [
    {
      id: 'scope',
      name: 'Scope',
      status: 'completed',
      duration: '1.5s',
      description: 'Project scoped',
      lastUpdate: '19:12:34'
    },
    {
      id: 'staff',
      name: 'Staff',
      status: 'completed',
      duration: '2.3s',
      description: 'Team assigned',
      lastUpdate: '19:12:37'
    },
    {
      id: 'deliver',
      name: 'Deliver',
      status: 'active',
      duration: 'pending',
      description: 'Service delivery',
      lastUpdate: '19:12:39'
    },
    {
      id: 'review',
      name: 'Review',
      status: 'pending',
      duration: 'pending',
      description: 'Quality review'
    },
    {
      id: 'invoice',
      name: 'Invoice',
      status: 'pending',
      duration: 'pending',
      description: 'Billing process'
    },
    {
      id: 'expand',
      name: 'Expand',
      status: 'pending',
      duration: 'pending',
      description: 'Account expansion'
    },
  ],
  activity: [
    {
      id: 'consult-act-1',
      task: 'Digital transformation project delivered',
      status: 'completed',
      time: '2h ago',
      impact: 'high',
      agent: 'Delivery Team'
    },
    {
      id: 'consult-act-2',
      task: 'Resource optimization saved $450K',
      status: 'completed',
      time: '4h ago',
      impact: 'high',
      agent: 'Resource Manager'
    },
    {
      id: 'consult-act-3',
      task: 'Client health assessment in progress',
      status: 'processing',
      time: '6h ago',
      impact: 'medium',
      agent: 'Account Manager'
    },
  ],
  charts: {
    performance: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Delivery Value',
          data: [2.5, 3.2, 3.5, 2.9],
          color: '#0F766E',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Utilization Rate',
          data: [82, 84, 85, 86, 87, 88],
          color: '#22C55E'
        }
      ]
    }
  }
};

// Media & Entertainment Department Configuration
export const mediaDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'media-entertainment',
  departmentName: 'Media & Entertainment',
  primaryColor: '#F43F5E',
  metrics: [
    {
      id: 'audience',
      title: 'Audience Reach',
      value: '14.8M',
      change: '+18.4%',
      trend: 'up',
      icon: Users,
      color: '#22C55E',
      subtitle: 'Monthly reach'
    },
    {
      id: 'engagement',
      title: 'Engagement',
      value: '61%',
      change: '+4.2%',
      trend: 'up',
      icon: Activity,
      color: '#22C55E',
      subtitle: 'Engagement rate'
    },
    {
      id: 'content',
      title: 'Content Published',
      value: '2,345',
      change: '+234',
      trend: 'up',
      icon: FileText,
      color: '#3B82F6',
      subtitle: 'This month'
    },
    {
      id: 'rpv',
      title: 'Revenue Per View',
      value: '$0.12',
      change: '+8.7%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Monetization'
    },
    {
      id: 'rights',
      title: 'Rights Clearance',
      value: '98.2%',
      change: '+1.5%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Clearance rate'
    },
    {
      id: 'production',
      title: 'Production Pipeline',
      value: '156',
      change: '+12',
      trend: 'up',
      icon: Film,
      color: '#8B5CF6',
      subtitle: 'Active projects'
    },
  ],
  pipeline: [
    {
      id: 'ideate',
      name: 'Ideate',
      status: 'completed',
      duration: '1.2s',
      description: 'Concept developed',
      lastUpdate: '20:45:12'
    },
    {
      id: 'produce',
      name: 'Produce',
      status: 'completed',
      duration: '3.5s',
      description: 'Content created',
      lastUpdate: '20:45:16'
    },
    {
      id: 'edit',
      name: 'Edit',
      status: 'active',
      duration: 'pending',
      description: 'Post-production',
      lastUpdate: '20:45:19'
    },
    {
      id: 'publish',
      name: 'Publish',
      status: 'pending',
      duration: 'pending',
      description: 'Distribution'
    },
    {
      id: 'amplify',
      name: 'Amplify',
      status: 'pending',
      duration: 'pending',
      description: 'Marketing push'
    },
    {
      id: 'measure',
      name: 'Measure',
      status: 'pending',
      duration: 'pending',
      description: 'Performance analytics'
    },
  ],
  activity: [
    {
      id: 'media-act-1',
      task: 'Viral content reached 2M views',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'Content Team'
    },
    {
      id: 'media-act-2',
      task: 'Rights clearance for new series completed',
      status: 'completed',
      time: '3h ago',
      impact: 'high',
      agent: 'Legal Team'
    },
    {
      id: 'media-act-3',
      task: 'Audience engagement analysis in progress',
      status: 'processing',
      time: '5h ago',
      impact: 'medium',
      agent: 'Analytics AI'
    },
  ],
  charts: {
    performance: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Daily Views',
          data: [1.8, 2.1, 1.9, 2.4, 2.8, 3.2, 2.6],
          color: '#F43F5E',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Audience Growth',
          data: [12.5, 13.2, 14.0, 14.8],
          color: '#22C55E'
        }
      ]
    }
  }
};

// Gaming & Esports Department Configuration
export const gamingDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'gaming-esports',
  departmentName: 'Gaming & Esports',
  primaryColor: '#7C3AED',
  metrics: [
    {
      id: 'players',
      title: 'Active Players',
      value: '2.8M',
      change: '+22.4%',
      trend: 'up',
      icon: Users,
      color: '#22C55E',
      subtitle: 'Monthly active'
    },
    {
      id: 'session',
      title: 'Session Lift',
      value: '43%',
      change: '+5.8%',
      trend: 'up',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Session increase'
    },
    {
      id: 'monetization',
      title: 'Monetization',
      value: '$4.2M',
      change: '+18.7%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Monthly revenue'
    },
    {
      id: 'churn',
      title: 'Churn Rate',
      value: '3.2%',
      change: '-0.8%',
      trend: 'up',
      icon: TrendingDown,
      color: '#22C55E',
      subtitle: 'Player churn'
    },
    {
      id: 'tournaments',
      title: 'Tournaments',
      value: '45',
      change: '+8',
      trend: 'up',
      icon: Gamepad2,
      color: '#8B5CF6',
      subtitle: 'Active events'
    },
    {
      id: 'community',
      title: 'Community Health',
      value: '94.5%',
      change: '+2.3%',
      trend: 'up',
      icon: Heart,
      color: '#22C55E',
      subtitle: 'Community score'
    },
  ],
  pipeline: [
    {
      id: 'match',
      name: 'Match',
      status: 'completed',
      duration: '0.1s',
      description: 'Match started',
      lastUpdate: '21:23:45'
    },
    {
      id: 'moderate',
      name: 'Moderate',
      status: 'completed',
      duration: '0.3s',
      description: 'Content moderated',
      lastUpdate: '21:23:45'
    },
    {
      id: 'engage',
      name: 'Engage',
      status: 'active',
      duration: 'pending',
      description: 'Player engagement',
      lastUpdate: '21:23:46'
    },
    {
      id: 'monetize',
      name: 'Monetize',
      status: 'pending',
      duration: 'pending',
      description: 'In-game purchases'
    },
    {
      id: 'analyze',
      name: 'Analyze',
      status: 'pending',
      duration: 'pending',
      description: 'Player analytics'
    },
    {
      id: 'retain',
      name: 'Retain',
      status: 'pending',
      duration: 'pending',
      description: 'Retention tactics'
    },
  ],
  activity: [
    {
      id: 'game-act-1',
      task: 'New tournament attracted 500K players',
      status: 'completed',
      time: '2h ago',
      impact: 'high',
      agent: 'Esports Team'
    },
    {
      id: 'game-act-2',
      task: 'Toxicity detection system banned 234 accounts',
      status: 'completed',
      time: '4h ago',
      impact: 'medium',
      agent: 'Moderation AI'
    },
    {
      id: 'game-act-3',
      task: 'Live event preparation in progress',
      status: 'processing',
      time: '6h ago',
      impact: 'high',
      agent: 'Event Coordinator'
    },
  ],
  charts: {
    performance: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Daily Players',
          data: [2.4, 2.5, 2.6, 2.7, 2.9, 3.1, 2.8],
          color: '#7C3AED',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Revenue Growth',
          data: [3.5, 3.7, 4.0, 4.2],
          color: '#22C55E'
        }
      ]
    }
  }
};

// Education Department Configuration
export const educationDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'education',
  departmentName: 'Education',
  primaryColor: '#22C55E',
  metrics: [
    {
      id: 'learners',
      title: 'Learners Guided',
      value: '8,947',
      change: '+12.4%',
      trend: 'up',
      icon: GraduationCap,
      color: '#22C55E',
      subtitle: 'Active learners'
    },
    {
      id: 'completion',
      title: 'Completion Rate',
      value: '92.6%',
      change: '+3.2%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Course completion'
    },
    {
      id: 'engagement',
      title: 'Engagement Score',
      value: '87.4%',
      change: '+2.8%',
      trend: 'up',
      icon: Activity,
      color: '#22C55E',
      subtitle: 'Student engagement'
    },
    {
      id: 'certifications',
      title: 'Certifications',
      value: '1,234',
      change: '+156',
      trend: 'up',
      icon: CheckCircle,
      color: '#3B82F6',
      subtitle: 'This month'
    },
    {
      id: 'skill-gaps',
      title: 'Skill Gaps Identified',
      value: '456',
      change: '+89',
      trend: 'up',
      icon: Target,
      color: '#F59E0B',
      subtitle: 'Learning needs'
    },
    {
      id: 'satisfaction',
      title: 'Learner Satisfaction',
      value: '94.2%',
      change: '+1.5%',
      trend: 'up',
      icon: Heart,
      color: '#22C55E',
      subtitle: 'Student rating'
    },
  ],
  pipeline: [
    {
      id: 'assess',
      name: 'Assess',
      status: 'completed',
      duration: '0.5s',
      description: 'Skills assessed',
      lastUpdate: '22:12:34'
    },
    {
      id: 'plan',
      name: 'Plan',
      status: 'completed',
      duration: '1.2s',
      description: 'Learning path created',
      lastUpdate: '22:12:36'
    },
    {
      id: 'teach',
      name: 'Teach',
      status: 'active',
      duration: 'pending',
      description: 'Instruction delivery',
      lastUpdate: '22:12:37'
    },
    {
      id: 'coach',
      name: 'Coach',
      status: 'pending',
      duration: 'pending',
      description: 'Personalized coaching'
    },
    {
      id: 'test',
      name: 'Test',
      status: 'pending',
      duration: 'pending',
      description: 'Knowledge assessment'
    },
    {
      id: 'certify',
      name: 'Certify',
      status: 'pending',
      duration: 'pending',
      description: 'Certification issuance'
    },
  ],
  activity: [
    {
      id: 'edu-act-1',
      task: 'New learning program launched for 500 employees',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'Learning Team'
    },
    {
      id: 'edu-act-2',
      task: 'AI tutoring system completed 2,345 sessions',
      status: 'completed',
      time: '3h ago',
      impact: 'medium',
      agent: 'Tutor AI'
    },
    {
      id: 'edu-act-3',
      task: 'Skill gap analysis for Q4 planning',
      status: 'processing',
      time: '5h ago',
      impact: 'high',
      agent: 'Skills Analyst'
    },
  ],
  charts: {
    performance: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Learners',
          data: [7.2, 7.8, 8.4, 8.9],
          color: '#22C55E',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Completion Rate',
          data: [89, 90, 91, 91, 92, 92.6],
          color: '#22C55E'
        }
      ]
    }
  }
};

// Retail Stores Department Configuration
export const retailDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'retail-stores',
  departmentName: 'Retail Stores',
  primaryColor: '#F59E0B',
  metrics: [
    {
      id: 'revenue',
      title: 'Store Revenue',
      value: '$4.9M',
      change: '+8.7%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Monthly revenue'
    },
    {
      id: 'availability',
      title: 'Shelf Availability',
      value: '98%',
      change: '+1.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: '#22C55E',
      subtitle: 'Product availability'
    },
    {
      id: 'traffic',
      title: 'Foot Traffic',
      value: '234K',
      change: '+12.4%',
      trend: 'up',
      icon: Users,
      color: '#3B82F6',
      subtitle: 'Store visits'
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: '32.4%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: '#22C55E',
      subtitle: 'Visitor to buyer'
    },
    {
      id: 'inventory',
      title: 'Inventory Turnover',
      value: '4.7x',
      change: '+0.3',
      trend: 'up',
      icon: BarChart3,
      color: '#8B5CF6',
      subtitle: 'Turnover rate'
    },
    {
      id: 'satisfaction',
      title: 'Customer Satisfaction',
      value: '94.7%',
      change: '+1.8%',
      trend: 'up',
      icon: Heart,
      color: '#22C55E',
      subtitle: 'Store rating'
    },
  ],
  pipeline: [
    {
      id: 'forecast',
      name: 'Forecast',
      status: 'completed',
      duration: '0.8s',
      description: 'Demand forecasted',
      lastUpdate: '23:34:56'
    },
    {
      id: 'stock',
      name: 'Stock',
      status: 'completed',
      duration: '1.5s',
      description: 'Inventory replenished',
      lastUpdate: '23:34:58'
    },
    {
      id: 'price',
      name: 'Price',
      status: 'active',
      duration: 'pending',
      description: 'Pricing optimization',
      lastUpdate: '23:34:59'
    },
    {
      id: 'sell',
      name: 'Sell',
      status: 'pending',
      duration: 'pending',
      description: 'Customer purchase'
    },
    {
      id: 'serve',
      name: 'Serve',
      status: 'pending',
      duration: 'pending',
      description: 'Customer service'
    },
    {
      id: 'reorder',
      name: 'Reorder',
      status: 'pending',
      duration: 'pending',
      description: 'Restock process'
    },
  ],
  activity: [
    {
      id: 'retail-act-1',
      task: 'Promotional campaign increased sales by 23%',
      status: 'completed',
      time: '2h ago',
      impact: 'high',
      agent: 'Marketing AI'
    },
    {
      id: 'retail-act-2',
      task: 'Inventory optimization reduced stockouts by 45%',
      status: 'completed',
      time: '4h ago',
      impact: 'high',
      agent: 'Inventory Manager'
    },
    {
      id: 'retail-act-3',
      task: 'Staff scheduling optimization in progress',
      status: 'processing',
      time: '6h ago',
      impact: 'medium',
      agent: 'Workforce AI'
    },
  ],
  charts: {
    performance: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Daily Revenue',
          data: [0.6, 0.7, 0.65, 0.8, 0.9, 1.2, 0.85],
          color: '#F59E0B',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Foot Traffic',
          data: [210, 218, 226, 234],
          color: '#3B82F6'
        }
      ]
    }
  }
};

// Travel & Tourism Department Configuration
export const travelDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'travel-tourism',
  departmentName: 'Travel & Tourism',
  primaryColor: '#0EA5E9',
  metrics: [
    {
      id: 'bookings',
      title: 'Bookings',
      value: '31K',
      change: '+15.4%',
      trend: 'up',
      icon: Calendar,
      color: '#22C55E',
      subtitle: 'Monthly bookings'
    },
    {
      id: 'health',
      title: 'Booking Health',
      value: '94.1%',
      change: '+2.3%',
      trend: 'up',
      icon: Heart,
      color: '#22C55E',
      subtitle: 'Booking quality'
    },
    {
      id: 'satisfaction',
      title: 'Customer Satisfaction',
      value: '96.2%',
      change: '+1.8%',
      trend: 'up',
      icon: Users,
      color: '#22C55E',
      subtitle: 'Traveler rating'
    },
    {
      id: 'revenue',
      title: 'Revenue',
      value: '$8.7M',
      change: '+12.7%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Monthly revenue'
    },
    {
      id: 'cancellations',
      title: 'Cancellation Rate',
      value: '3.2%',
      change: '-0.5%',
      trend: 'up',
      icon: TrendingDown,
      color: '#22C55E',
      subtitle: 'Booking stability'
    },
    {
      id: 'partners',
      title: 'Partner Performance',
      value: '92.4%',
      change: '+1.2%',
      trend: 'up',
      icon: Building,
      color: '#22C55E',
      subtitle: 'Partner SLA'
    },
  ],
  pipeline: [
    {
      id: 'search',
      name: 'Search',
      status: 'completed',
      duration: '0.3s',
      description: 'Travel search initiated',
      lastUpdate: '00:45:23'
    },
    {
      id: 'package',
      name: 'Package',
      status: 'completed',
      duration: '0.8s',
      description: 'Package curated',
      lastUpdate: '00:45:24'
    },
    {
      id: 'book',
      name: 'Book',
      status: 'active',
      duration: 'pending',
      description: 'Reservation confirmed',
      lastUpdate: '00:45:25'
    },
    {
      id: 'service',
      name: 'Service',
      status: 'pending',
      duration: 'pending',
      description: 'Travel experience'
    },
    {
      id: 'recover',
      name: 'Recover',
      status: 'pending',
      duration: 'pending',
      description: 'Issue resolution'
    },
    {
      id: 'retain',
      name: 'Retain',
      status: 'pending',
      duration: 'pending',
      description: 'Loyalty building'
    },
  ],
  activity: [
    {
      id: 'travel-act-1',
      task: 'New destination package launched',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'Product Team'
    },
    {
      id: 'travel-act-2',
      task: 'Dynamic pricing increased revenue by 8%',
      status: 'completed',
      time: '3h ago',
      impact: 'medium',
      agent: 'Pricing AI'
    },
    {
      id: 'travel-act-3',
      task: 'Partner performance review in progress',
      status: 'processing',
      time: '5h ago',
      impact: 'medium',
      agent: 'Partner Manager'
    },
  ],
  charts: {
    performance: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Daily Bookings',
          data: [0.9, 1.1, 1.0, 1.2, 1.4, 1.8, 1.6],
          color: '#0EA5E9',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Revenue Growth',
          data: [7.5, 8.0, 8.4, 8.7],
          color: '#22C55E'
        }
      ]
    }
  }
};

// Energy & Utilities Department Configuration
export const energyDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'energy-utilities',
  departmentName: 'Energy & Utilities',
  primaryColor: '#84CC16',
  metrics: [
    {
      id: 'grid-health',
      title: 'Grid Health',
      value: '98.8%',
      change: '+0.3%',
      trend: 'up',
      icon: Zap,
      color: '#22C55E',
      subtitle: 'System reliability'
    },
    {
      id: 'load',
      title: 'Load Balanced',
      value: '12.2GW',
      change: '+5.4%',
      trend: 'up',
      icon: Activity,
      color: '#22C55E',
      subtitle: 'Daily load'
    },
    {
      id: 'renewable',
      title: 'Renewable Mix',
      value: '47.3%',
      change: '+2.8%',
      trend: 'up',
      icon: Globe,
      color: '#22C55E',
      subtitle: 'Clean energy'
    },
    {
      id: 'outages',
      title: 'Outage Prevention',
      value: '99.2%',
      change: '+0.5%',
      trend: 'up',
      icon: Shield,
      color: '#22C55E',
      subtitle: 'Prevention rate'
    },
    {
      id: 'efficiency',
      title: 'Grid Efficiency',
      value: '94.7%',
      change: '+1.2%',
      trend: 'up',
      icon: TrendingUp,
      color: '#8B5CF6',
      subtitle: 'Transmission efficiency'
    },
    {
      id: 'customers',
      title: 'Customers Served',
      value: '2.4M',
      change: '+12.3K',
      trend: 'up',
      icon: Users,
      color: '#3B82F6',
      subtitle: 'Service coverage'
    },
  ],
  pipeline: [
    {
      id: 'forecast',
      name: 'Forecast',
      status: 'completed',
      duration: '0.5s',
      description: 'Demand forecasted',
      lastUpdate: '01:23:45'
    },
    {
      id: 'generate',
      name: 'Generate',
      status: 'completed',
      duration: '1.2s',
      description: 'Power generated',
      lastUpdate: '01:23:47'
    },
    {
      id: 'route',
      name: 'Route',
      status: 'active',
      duration: 'pending',
      description: 'Grid distribution',
      lastUpdate: '01:23:48'
    },
    {
      id: 'monitor',
      name: 'Monitor',
      status: 'pending',
      duration: 'pending',
      description: 'System monitoring'
    },
    {
      id: 'repair',
      name: 'Repair',
      status: 'pending',
      duration: 'pending',
      description: 'Maintenance response'
    },
    {
      id: 'settle',
      name: 'Settle',
      status: 'pending',
      duration: 'pending',
      description: 'Billing settlement'
    },
  ],
  activity: [
    {
      id: 'energy-act-1',
      task: 'Predictive maintenance prevented 3 outages',
      status: 'completed',
      time: '2h ago',
      impact: 'high',
      agent: 'Maintenance AI'
    },
    {
      id: 'energy-act-2',
      task: 'Renewable integration increased by 5%',
      status: 'completed',
      time: '4h ago',
      impact: 'high',
      agent: 'Grid Manager'
    },
    {
      id: 'energy-act-3',
      task: 'Demand response program in progress',
      status: 'processing',
      time: '6h ago',
      impact: 'medium',
      agent: 'Demand Response AI'
    },
  ],
  charts: {
    performance: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Daily Load (GW)',
          data: [11.2, 11.8, 12.0, 12.4, 12.8, 11.5, 10.8],
          color: '#84CC16',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Renewable Mix',
          data: [44, 45, 46, 47.3],
          color: '#22C55E'
        }
      ]
    }
  }
};

// Event Management Department Configuration
export const eventManagementDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'event-management',
  departmentName: 'Event Management',
  primaryColor: '#22C55E',
  metrics: [
    {
      id: 'savings',
      title: 'Cost Savings',
      value: '$3.1M',
      change: '+18.4%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Annual savings'
    },
    {
      id: 'margin',
      title: 'Margin Visibility',
      value: '96%',
      change: '+2.3%',
      trend: 'up',
      icon: BarChart3,
      color: '#22C55E',
      subtitle: 'Profit tracking'
    },
    {
      id: 'events',
      title: 'Events Managed',
      value: '234',
      change: '+23',
      trend: 'up',
      icon: Calendar,
      color: '#3B82F6',
      subtitle: 'This year'
    },
    {
      id: 'attendees',
      title: 'Attendees',
      value: '45.6K',
      change: '+5.4K',
      trend: 'up',
      icon: Users,
      color: '#22C55E',
      subtitle: 'Total attendees'
    },
    {
      id: 'satisfaction',
      title: 'Attendee Satisfaction',
      value: '94.8%',
      change: '+1.5%',
      trend: 'up',
      icon: Heart,
      color: '#22C55E',
      subtitle: 'Event rating'
    },
    {
      id: 'budget',
      title: 'Budget Utilization',
      value: '87.4%',
      change: '-2.1%',
      trend: 'up',
      icon: PieChart,
      color: '#8B5CF6',
      subtitle: 'Spend efficiency'
    },
  ],
  pipeline: [
    {
      id: 'capture',
      name: 'Capture',
      status: 'completed',
      duration: '0.5s',
      description: 'Requirements captured',
      lastUpdate: '02:34:56'
    },
    {
      id: 'allocate',
      name: 'Allocate',
      status: 'completed',
      duration: '1.2s',
      description: 'Resources assigned',
      lastUpdate: '02:34:58'
    },
    {
      id: 'analyze',
      name: 'Analyze',
      status: 'active',
      duration: 'pending',
      description: 'Cost analysis',
      lastUpdate: '02:34:59'
    },
    {
      id: 'optimize',
      name: 'Optimize',
      status: 'pending',
      duration: 'pending',
      description: 'Budget optimization'
    },
    {
      id: 'approve',
      name: 'Approve',
      status: 'pending',
      duration: 'pending',
      description: 'Stakeholder approval'
    },
    {
      id: 'track',
      name: 'Track',
      status: 'pending',
      duration: 'pending',
      description: 'Event monitoring'
    },
  ],
  activity: [
    {
      id: 'event-act-1',
      task: 'Corporate conference saved $450K',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'Event Manager'
    },
    {
      id: 'event-act-2',
      task: 'Vendor negotiation reduced costs by 15%',
      status: 'completed',
      time: '3h ago',
      impact: 'high',
      agent: 'Procurement AI'
    },
    {
      id: 'event-act-3',
      task: 'Budget analysis for Q4 events',
      status: 'processing',
      time: '5h ago',
      impact: 'medium',
      agent: 'Budget Analyst'
    },
  ],
  charts: {
    performance: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Cost Savings',
          data: [0.6, 0.8, 0.9, 0.8],
          color: '#22C55E',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Events per Month',
          data: [18, 20, 22, 21, 24, 23],
          color: '#3B82F6'
        }
      ]
    }
  }
};

// Agriculture Department Configuration - Premium AI Command Center
export const agricultureDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'agriculture',
  departmentName: 'Agriculture & Smart Farming',
  primaryColor: '#22C55E',
  metrics: [
    // Farm KPIs
    {
      id: 'total-farms',
      title: 'Total Farms',
      value: '247',
      change: '+12',
      trend: 'up',
      icon: Factory2,
      color: '#22C55E',
      subtitle: 'Active operations'
    },
    {
      id: 'active-fields',
      title: 'Active Fields',
      value: '1,842',
      change: '+34',
      trend: 'up',
      icon: Map,
      color: '#22C55E',
      subtitle: 'Under cultivation'
    },
    {
      id: 'total-acres',
      title: 'Total Acres',
      value: '42.8K',
      change: '+2.1K',
      trend: 'up',
      icon: Globe,
      color: '#22C55E',
      subtitle: 'Land coverage'
    },
    {
      id: 'active-crops',
      title: 'Active Crops',
      value: '18',
      change: '+2',
      trend: 'up',
      icon: Sprout,
      color: '#22C55E',
      subtitle: 'Crop varieties'
    },
    {
      id: 'livestock-count',
      title: 'Livestock Count',
      value: '8,420',
      change: '+156',
      trend: 'up',
      icon: Wheat,
      color: '#22C55E',
      subtitle: 'Animals tracked'
    },
    // Production KPIs
    {
      id: 'yield-forecast',
      title: 'Yield Forecast',
      value: '94.2%',
      change: '+3.8%',
      trend: 'up',
      icon: BarChart3,
      color: '#22C55E',
      subtitle: 'Predicted yield'
    },
    {
      id: 'harvest-progress',
      title: 'Harvest Progress',
      value: '67.4%',
      change: '+12.2%',
      trend: 'up',
      icon: Wheat,
      color: '#22C55E',
      subtitle: 'Season completion'
    },
    {
      id: 'crop-health',
      title: 'Crop Health',
      value: '91.8%',
      change: '+2.4%',
      trend: 'up',
      icon: Leaf,
      color: '#22C55E',
      subtitle: 'Overall health score'
    },
    {
      id: 'irrigation-efficiency',
      title: 'Irrigation Efficiency',
      value: '87.6%',
      change: '+5.2%',
      trend: 'up',
      icon: Droplet,
      color: '#06B6D4',
      subtitle: 'Water optimization'
    },
    {
      id: 'fertilizer-usage',
      title: 'Fertilizer Usage',
      value: '23.4%',
      change: '-8.2%',
      trend: 'down',
      icon: Beaker,
      color: '#22C55E',
      subtitle: 'Reduction achieved'
    },
    // Financial KPIs
    {
      id: 'revenue',
      title: 'Revenue',
      value: '$12.4M',
      change: '+18.4%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Monthly revenue'
    },
    {
      id: 'operating-cost',
      title: 'Operating Cost',
      value: '$4.2M',
      change: '-5.8%',
      trend: 'down',
      icon: TrendingDown,
      color: '#22C55E',
      subtitle: 'Monthly expenses'
    },
    {
      id: 'profit-margin',
      title: 'Profit Margin',
      value: '66.1%',
      change: '+8.4%',
      trend: 'up',
      icon: Target,
      color: '#22C55E',
      subtitle: 'Net margin'
    },
    {
      id: 'equipment-utilization',
      title: 'Equipment Utilization',
      value: '89.4%',
      change: '+4.2%',
      trend: 'up',
      icon: Tractor,
      color: '#22C55E',
      subtitle: 'Fleet efficiency'
    },
    {
      id: 'roi',
      title: 'ROI',
      value: '295%',
      change: '+24.2%',
      trend: 'up',
      icon: TrendingUp,
      color: '#22C55E',
      subtitle: 'Return on investment'
    },
    // Sustainability KPIs
    {
      id: 'water-consumption',
      title: 'Water Consumption',
      value: '18.4M gal',
      change: '-12.4%',
      trend: 'down',
      icon: Droplet,
      color: '#06B6D4',
      subtitle: 'Monthly usage'
    },
    {
      id: 'carbon-reduction',
      title: 'Carbon Reduction',
      value: '34.2%',
      change: '+8.4%',
      trend: 'up',
      icon: Leaf,
      color: '#22C55E',
      subtitle: 'Emissions reduced'
    },
    {
      id: 'soil-health',
      title: 'Soil Health',
      value: '92.4%',
      change: '+3.2%',
      trend: 'up',
      icon: Mountain,
      color: '#8B5CF6',
      subtitle: 'Soil quality index'
    },
    {
      id: 'renewable-energy',
      title: 'Renewable Energy',
      value: '67.8%',
      change: '+12.4%',
      trend: 'up',
      icon: Sun,
      color: '#F59E0B',
      subtitle: 'Energy from renewables'
    },
    {
      id: 'sustainability-score',
      title: 'Sustainability Score',
      value: '94.2',
      change: '+4.8%',
      trend: 'up',
      icon: TreePine,
      color: '#22C55E',
      subtitle: 'ESG rating'
    },
    // AI KPIs
    {
      id: 'active-ai-agents',
      title: 'Active AI Agents',
      value: '142',
      change: '+18',
      trend: 'up',
      icon: Brain,
      color: '#8B5CF6',
      subtitle: 'Autonomous agents'
    },
    {
      id: 'autonomous-decisions',
      title: 'Autonomous Decisions',
      value: '2,847',
      change: '+342',
      trend: 'up',
      icon: Zap,
      color: '#8B5CF6',
      subtitle: 'Decisions today'
    },
    {
      id: 'disease-predictions',
      title: 'Disease Predictions',
      value: '156',
      change: '+24',
      trend: 'up',
      icon: ShieldCheck,
      color: '#EF4444',
      subtitle: 'Predictions made'
    },
    {
      id: 'yield-accuracy',
      title: 'Yield Accuracy',
      value: '96.8%',
      change: '+2.4%',
      trend: 'up',
      icon: Target,
      color: '#22C55E',
      subtitle: 'Prediction accuracy'
    },
    {
      id: 'automation-success',
      title: 'Automation Success',
      value: '98.4%',
      change: '+1.8%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Task completion rate'
    },
  ],
  pipeline: [
    {
      id: 'sense',
      name: 'Sense',
      status: 'completed',
      duration: '0.3s',
      description: 'IoT sensors read',
      lastUpdate: '03:45:12'
    },
    {
      id: 'analyze',
      name: 'Analyze',
      status: 'completed',
      duration: '0.8s',
      description: 'AI analysis complete',
      lastUpdate: '03:45:13'
    },
    {
      id: 'plan',
      name: 'Plan',
      status: 'completed',
      duration: '1.2s',
      description: 'Action planning done',
      lastUpdate: '03:45:14'
    },
    {
      id: 'execute',
      name: 'Execute',
      status: 'active',
      duration: 'pending',
      description: 'Autonomous execution',
      lastUpdate: '03:45:15'
    },
    {
      id: 'monitor',
      name: 'Monitor',
      status: 'pending',
      duration: 'pending',
      description: 'Real-time monitoring'
    },
    {
      id: 'optimize',
      name: 'Optimize',
      status: 'pending',
      duration: 'pending',
      description: 'Continuous optimization'
    },
  ],
  activity: [
    {
      id: 'agri-act-1',
      task: 'Drone mission completed - Field 17 surveyed',
      status: 'completed',
      time: '2m ago',
      impact: 'high',
      agent: 'Drone Command'
    },
    {
      id: 'agri-act-2',
      task: 'Disease outbreak predicted in Field 23',
      status: 'completed',
      time: '15m ago',
      impact: 'critical',
      agent: 'Disease Detector'
    },
    {
      id: 'agri-act-3',
      task: 'Autonomous tractor started harvest on Field 8',
      status: 'completed',
      time: '32m ago',
      impact: 'high',
      agent: 'Machinery AI'
    },
    {
      id: 'agri-act-4',
      task: 'Irrigation reduced by 21% based on moisture data',
      status: 'completed',
      time: '45m ago',
      impact: 'medium',
      agent: 'Irrigation AI'
    },
    {
      id: 'agri-act-5',
      task: 'Livestock health alert - Sector 4',
      status: 'processing',
      time: '1h ago',
      impact: 'high',
      agent: 'Livestock Monitor'
    },
    {
      id: 'agri-act-6',
      task: 'Weather warning - Storm approaching in 4 hours',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'Weather AI'
    },
    {
      id: 'agri-act-7',
      task: 'Yield forecast updated - Corn +9%',
      status: 'completed',
      time: '2h ago',
      impact: 'medium',
      agent: 'Yield Predictor'
    },
  ],
  charts: {
    performance: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Yield Index',
          data: [82, 84, 86, 87, 88, 94.2],
          color: '#22C55E',
          fill: true
        },
        {
          label: 'Crop Health',
          data: [85, 87, 88, 89, 90, 91.8],
          color: '#06B6D4',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Revenue',
          data: [8.2, 9.4, 10.8, 12.4],
          color: '#22C55E'
        },
        {
          label: 'Profit Margin',
          data: [58, 61, 64, 66.1],
          color: '#8B5CF6'
        }
      ]
    }
  },
  // SECTION 1 - AI Agriculture Agents
  aiAgricultureAgents: {
    agents: [
      {
        id: 'agent-harvest',
        name: 'Agent Harvest',
        role: 'Crop Intelligence Agent',
        fieldsMonitored: '842',
        cropAccuracy: '96.4%',
        yieldImprovement: '+18.2%',
        icon: Sprout,
        color: '#22C55E',
        confidenceScore: 94,
        status: 'online',
        efficiency: '94.2%'
      },
      {
        id: 'agent-rain',
        name: 'Agent Rain',
        role: 'Irrigation Agent',
        waterSaved: '2.4M gal',
        irrigationCycles: '1,847',
        efficiencyScore: '92.8%',
        icon: Droplet,
        color: '#06B6D4',
        confidenceScore: 91,
        status: 'online',
        efficiency: '87.6%'
      },
      {
        id: 'agent-soil',
        name: 'Agent Soil',
        role: 'Soil Intelligence Agent',
        soilSamples: '12,847',
        nutrientAccuracy: '94.2%',
        soilHealthScore: '92.4%',
        icon: Mountain,
        color: '#8B5CF6',
        confidenceScore: 89,
        status: 'online',
        efficiency: '91.8%'
      },
      {
        id: 'agent-guardian',
        name: 'Agent Guardian',
        role: 'Disease Detection Agent',
        diseasesDetected: '156',
        predictionAccuracy: '97.2%',
        cropLossPrevented: '$2.4M',
        icon: ShieldCheck,
        color: '#EF4444',
        confidenceScore: 96,
        status: 'online',
        efficiency: '96.8%'
      },
      {
        id: 'agent-tractor',
        name: 'Agent Tractor',
        role: 'Machinery Agent',
        equipmentManaged: '47',
        fuelSaved: '8,420 gal',
        machineUptime: '98.4%',
        icon: Tractor,
        color: '#F59E0B',
        confidenceScore: 92,
        status: 'online',
        efficiency: '89.4%'
      },
      {
        id: 'agent-market',
        name: 'Agent Market',
        role: 'Agricultural Market Agent',
        priceForecastAccuracy: '94.8%',
        revenueImpact: '+$1.2M',
        contractsManaged: '234',
        icon: DollarSign,
        color: '#22C55E',
        confidenceScore: 88,
        status: 'online',
        efficiency: '92.4%'
      },
    ]
  },
  // SECTION 2 - Agriculture Command Center
  agricultureCommandCenter: {
    totalFarms: 247,
    totalAcres: '42.8K',
    cropHealthIndex: 91.8,
    harvestForecast: '$18.4M',
    revenue: '$12.4M',
    aiDecisionsToday: 2847,
    farmOperations: [
      { farm: 'Green Valley Farm', acres: '2,400', crop: 'Corn', status: 'growing', health: 94 },
      { farm: 'Sunrise Acres', acres: '1,800', crop: 'Soybeans', status: 'harvesting', health: 91 },
      { farm: 'Mountain View', acres: '3,200', crop: 'Wheat', status: 'growing', health: 89 },
      { farm: 'River Bend', acres: '2,100', crop: 'Rice', status: 'growing', health: 96 },
      { farm: 'Prairie Fields', acres: '4,500', crop: 'Corn', status: 'fallow', health: 88 },
    ],
    productionIntelligence: [
      { metric: 'Total Yield', value: '124,500 tons', change: '+12.4%', trend: 'up' },
      { metric: 'Quality Grade', value: 'A+', change: '+4.2%', trend: 'up' },
      { metric: 'Harvest Efficiency', value: '94.2%', change: '+6.8%', trend: 'up' },
      { metric: 'Storage Capacity', value: '87.6%', change: '-2.4%', trend: 'down' },
    ]
  },
  // SECTION 3 - Crop Intelligence
  cropIntelligence: {
    cropGrowth: [
      { crop: 'Corn', growthStage: 'Reproductive', health: 94, ndviIndex: 0.82, harvestReadiness: 67 },
      { crop: 'Soybeans', growthStage: 'Maturity', health: 91, ndviIndex: 0.78, harvestReadiness: 89 },
      { crop: 'Wheat', growthStage: 'Vegetative', health: 89, ndviIndex: 0.74, harvestReadiness: 23 },
      { crop: 'Rice', growthStage: 'Reproductive', health: 96, ndviIndex: 0.86, harvestReadiness: 45 },
      { crop: 'Cotton', growthStage: 'Flowering', health: 92, ndviIndex: 0.80, harvestReadiness: 34 },
    ],
    plantHealth: {
      overallHealth: 92.4,
      stressLevel: 12,
      diseaseRisk: 8
    },
    satelliteHeatmap: [
      { field: 'Field 1', coordinates: { lat: 40.7128, lng: -74.0060 }, healthScore: 94, cropType: 'Corn' },
      { field: 'Field 2', coordinates: { lat: 40.7138, lng: -74.0070 }, healthScore: 91, cropType: 'Soybeans' },
      { field: 'Field 3', coordinates: { lat: 40.7148, lng: -74.0080 }, healthScore: 89, cropType: 'Wheat' },
      { field: 'Field 4', coordinates: { lat: 40.7158, lng: -74.0090 }, healthScore: 96, cropType: 'Rice' },
      { field: 'Field 5', coordinates: { lat: 40.7168, lng: -74.0100 }, healthScore: 88, cropType: 'Corn' },
    ],
    growthTimeline: [
      { stage: 'Planting', startDate: '2026-03-15', expectedDate: '2026-04-01', progress: 100 },
      { stage: 'Germination', startDate: '2026-04-01', expectedDate: '2026-04-15', progress: 100 },
      { stage: 'Vegetative', startDate: '2026-04-15', expectedDate: '2026-06-01', progress: 100 },
      { stage: 'Flowering', startDate: '2026-06-01', expectedDate: '2026-07-15', progress: 100 },
      { stage: 'Reproductive', startDate: '2026-07-15', expectedDate: '2026-08-30', progress: 67 },
      { stage: 'Harvest', startDate: '2026-08-30', expectedDate: '2026-09-30', progress: 0 },
    ]
  },
  // SECTION 4 - Livestock Intelligence
  livestockIntelligence: {
    livestock: [
      { type: 'Cattle', count: 4200, healthScore: 94, location: 'Pasture A', feedingSchedule: '06:00, 18:00' },
      { type: 'Pigs', count: 2800, healthScore: 91, location: 'Barn 1', feedingSchedule: '07:00, 19:00' },
      { type: 'Sheep', count: 1200, healthScore: 96, location: 'Pasture B', feedingSchedule: '08:00, 20:00' },
      { type: 'Chickens', count: 22000, healthScore: 89, location: 'Coop 1-4', feedingSchedule: '05:00, 17:00' },
    ],
    animalHealth: {
      overallHealth: 92.5,
      sickAnimals: 12,
      vaccinationsDue: 156
    },
    productionMetrics: {
      milkProduction: '124,500 L/day',
      eggProduction: '18,400 eggs/day',
      meatProduction: '2,400 kg/week'
    },
    gpsTracking: [
      { id: 'TAG-001', type: 'Cattle', location: { lat: 40.7128, lng: -74.0060 }, lastUpdate: '2m ago' },
      { id: 'TAG-002', type: 'Cattle', location: { lat: 40.7138, lng: -74.0070 }, lastUpdate: '5m ago' },
      { id: 'TAG-003', type: 'Sheep', location: { lat: 40.7148, lng: -74.0080 }, lastUpdate: '8m ago' },
    ]
  },
  // SECTION 5 - Precision Farming
  precisionFarming: {
    gpsEquipment: [
      { equipment: 'Tractor A1', status: 'active', location: { lat: 40.7128, lng: -74.0060 }, battery: 87 },
      { equipment: 'Tractor B2', status: 'idle', location: { lat: 40.7138, lng: -74.0070 }, battery: 94 },
      { equipment: 'Harvester C3', status: 'maintenance', location: { lat: 40.7148, lng: -74.0080 }, battery: 62 },
      { equipment: 'Seeder D4', status: 'active', location: { lat: 40.7158, lng: -74.0090 }, battery: 91 },
    ],
    droneMissions: [
      { missionId: 'DRN-001', type: 'Survey', status: 'completed', coverage: 'Field 1-5', duration: '2h 15m' },
      { missionId: 'DRN-002', type: 'Spray', status: 'active', coverage: 'Field 8', duration: '1h 30m' },
      { missionId: 'DRN-003', type: 'Survey', status: 'planned', coverage: 'Field 12-15', duration: '3h 00m' },
    ],
    satelliteMonitoring: {
      lastUpdate: '15m ago',
      coverage: '100%',
      resolution: '10m/pixel'
    },
    fieldMapping: [
      { field: 'Field 1', area: '240 acres', soilType: 'Loam', crop: 'Corn' },
      { field: 'Field 2', area: '180 acres', soilType: 'Clay', crop: 'Soybeans' },
      { field: 'Field 3', area: '320 acres', soilType: 'Sandy', crop: 'Wheat' },
      { field: 'Field 4', area: '210 acres', soilType: 'Loam', crop: 'Rice' },
    ]
  },
  // SECTION 6 - Irrigation Command Center
  irrigationCommandCenter: {
    waterUsage: {
      today: '842,000 gal',
      thisWeek: '5.2M gal',
      thisMonth: '18.4M gal'
    },
    pumpStatus: [
      { pumpId: 'PUMP-001', status: 'on', flowRate: '450 GPM', pressure: '45 PSI' },
      { pumpId: 'PUMP-002', status: 'on', flowRate: '380 GPM', pressure: '42 PSI' },
      { pumpId: 'PUMP-003', status: 'off', flowRate: '0 GPM', pressure: '0 PSI' },
      { pumpId: 'PUMP-004', status: 'maintenance', flowRate: '0 GPM', pressure: '0 PSI' },
    ],
    moistureLevels: [
      { field: 'Field 1', sensorId: 'MS-001', moisture: 68, threshold: 60 },
      { field: 'Field 2', sensorId: 'MS-002', moisture: 72, threshold: 65 },
      { field: 'Field 3', sensorId: 'MS-003', moisture: 58, threshold: 60 },
      { field: 'Field 4', sensorId: 'MS-004', moisture: 75, threshold: 70 },
    ],
    reservoirCapacity: {
      current: '2.4M gal',
      capacity: '3.0M gal',
      percentage: 80
    },
    rainForecast: {
      probability: 65,
      expectedAmount: '1.2 inches',
      timeframe: 'Next 24 hours'
    }
  },
  // SECTION 7 - Machinery Operations
  machineryOperations: {
    fleet: [
      { equipment: 'Tractor A1', type: 'Tractor', status: 'operating', location: 'Field 1', fuelLevel: 87 },
      { equipment: 'Harvester H1', type: 'Harvester', status: 'operating', location: 'Field 2', fuelLevel: 62 },
      { equipment: 'Seeder S1', type: 'Seeder', status: 'idle', location: 'Barn A', fuelLevel: 94 },
      { equipment: 'Sprayer SP1', type: 'Sprayer', status: 'maintenance', location: 'Shop', fuelLevel: 45 },
    ],
    fuelUsage: {
      today: '842 gal',
      thisWeek: '4,200 gal',
      efficiency: '94.2%'
    },
    maintenance: [
      { equipment: 'Sprayer SP1', dueDate: '2026-06-28', type: 'Routine', priority: 'high' },
      { equipment: 'Tractor B2', dueDate: '2026-07-05', type: 'Oil Change', priority: 'medium' },
      { equipment: 'Harvester H1', dueDate: '2026-07-15', type: 'Inspection', priority: 'low' },
    ],
    gpsRoutes: [
      { equipment: 'Tractor A1', route: 'Field 1 → Field 2', progress: 67, eta: '45 min' },
      { equipment: 'Harvester H1', route: 'Field 2 → Storage', progress: 34, eta: '1h 20m' },
    ]
  },
  // SECTION 8 - Supply Chain
  supplyChain: {
    warehouses: [
      { warehouse: 'Storage A', location: 'Main Site', capacity: '50,000 tons', utilization: 87 },
      { warehouse: 'Storage B', location: 'North Field', capacity: '30,000 tons', utilization: 72 },
      { warehouse: 'Storage C', location: 'East Field', capacity: '40,000 tons', utilization: 54 },
    ],
    grainStorage: {
      totalCapacity: '120,000 tons',
      currentStorage: '84,200 tons',
      utilization: 70.2
    },
    logistics: [
      { shipment: 'SHP-001', origin: 'Farm A', destination: 'Processing Plant', status: 'in-transit', eta: '4h' },
      { shipment: 'SHP-002', origin: 'Farm B', destination: 'Distribution Center', status: 'delivered', eta: 'Arrived' },
      { shipment: 'SHP-003', origin: 'Farm C', destination: 'Export Terminal', status: 'pending', eta: '24h' },
    ],
    deliveries: {
      today: 47,
      thisWeek: 284,
      onTimeRate: 96.4
    },
    distribution: [
      { region: 'North America', volume: '45,000 tons', demand: 'High' },
      { region: 'Europe', volume: '28,000 tons', demand: 'Medium' },
      { region: 'Asia', volume: '11,200 tons', demand: 'High' },
    ]
  },
  // SECTION 9 - Weather & Environment
  weatherEnvironment: {
    currentWeather: {
      temperature: '24°C',
      humidity: '68%',
      windSpeed: '12 km/h',
      rainfall: '0 mm'
    },
    rainfall: [
      { date: '2026-06-26', expected: '1.2 inches' },
      { date: '2026-06-27', expected: '0.5 inches' },
      { date: '2026-06-28', expected: '0.0 inches' },
      { date: '2026-06-29', expected: '0.0 inches' },
      { date: '2026-06-30', expected: '0.8 inches' },
    ],
    temperature: [
      { date: '2026-06-26', high: '26°C', low: '18°C' },
      { date: '2026-06-27', high: '25°C', low: '17°C' },
      { date: '2026-06-28', high: '28°C', low: '19°C' },
      { date: '2026-06-29', high: '30°C', low: '21°C' },
      { date: '2026-06-30', high: '27°C', low: '18°C' },
    ],
    wind: [
      { date: '2026-06-26', speed: '12 km/h', direction: 'NE' },
      { date: '2026-06-27', speed: '15 km/h', direction: 'E' },
      { date: '2026-06-28', speed: '8 km/h', direction: 'SE' },
      { date: '2026-06-29', speed: '18 km/h', direction: 'S' },
      { date: '2026-06-30', speed: '10 km/h', direction: 'SW' },
    ],
    climateForecast: [
      { period: 'Next 7 days', temperature: 'Average', rainfall: 'Above average', conditions: 'Mild' },
      { period: 'Next 14 days', temperature: 'Above average', rainfall: 'Average', conditions: 'Warm' },
      { period: 'Next 30 days', temperature: 'Average', rainfall: 'Below average', conditions: 'Dry' },
    ]
  },
  // SECTION 10 - Sustainability
  sustainability: {
    carbonFootprint: {
      current: '12,400 tons CO2',
      target: '10,000 tons CO2',
      reduction: '19.4%'
    },
    waterConservation: {
      saved: '2.4M gal',
      efficiency: '87.6%',
      target: '90%'
    },
    renewableEnergy: {
      usage: '67.8%',
      percentage: 67.8,
      source: 'Solar + Wind'
    },
    biodiversity: {
      score: 92,
      speciesCount: 156,
      protectedAreas: '1,200 acres'
    },
    esgMetrics: {
      overallScore: 94.2,
      environmental: 96,
      social: 92,
      governance: 94
    }
  },
  // SECTION 11 - AI Insights
  agricultureAIInsights: {
    insights: [
      { id: 'ins-1', type: 'warning', title: 'Disease outbreak predicted in Field 17', description: 'Early blight detected with 87% probability. Immediate treatment recommended.', impact: 'high', action: 'Apply fungicide treatment', field: 'Field 17' },
      { id: 'ins-2', type: 'recommendation', title: 'Harvest should begin three days earlier', description: 'Corn maturity ahead of schedule by 3 days. Optimal harvest window: June 28-30.', impact: 'high', action: 'Schedule harvest equipment', field: 'Field 1-5' },
      { id: 'ins-3', type: 'recommendation', title: 'Irrigation can be reduced by 21%', description: 'Soil moisture levels above optimal. Reduce irrigation to prevent waterlogging.', impact: 'medium', action: 'Adjust irrigation schedule', field: 'Field 3' },
      { id: 'ins-4', type: 'risk', title: 'Nitrogen deficiency detected', description: 'Leaf tissue analysis shows nitrogen levels 15% below optimal.', impact: 'medium', action: 'Apply nitrogen fertilizer', field: 'Field 8' },
      { id: 'ins-5', type: 'opportunity', title: 'Corn prices expected to rise 9%', description: 'Market analysis indicates corn price surge in Q3. Consider storage strategy.', impact: 'high', action: 'Review storage capacity', field: 'All fields' },
      { id: 'ins-6', type: 'recommendation', title: 'Autonomous tractors can save 18 operating hours', description: 'Route optimization available for harvest operations.', impact: 'medium', action: 'Enable autonomous mode', field: 'Field 1-3' },
    ]
  },
  // SECTION 12 - Live Activity Feed
  liveActivityFeed: {
    activities: [
      { id: 'act-1', event: 'Drone mission completed', type: 'drone', location: 'Field 17', time: '2m ago', impact: 'medium' },
      { id: 'act-2', event: 'Disease detected', type: 'disease', location: 'Field 23', time: '15m ago', impact: 'critical' },
      { id: 'act-3', event: 'Tractor started', type: 'tractor', location: 'Field 8', time: '32m ago', impact: 'high' },
      { id: 'act-4', event: 'Harvest completed', type: 'harvest', location: 'Field 2', time: '45m ago', impact: 'high' },
      { id: 'act-5', event: 'Irrigation activated', type: 'irrigation', location: 'Field 3', time: '1h ago', impact: 'medium' },
      { id: 'act-6', event: 'Livestock health alert', type: 'livestock', location: 'Sector 4', time: '1h ago', impact: 'high' },
      { id: 'act-7', event: 'Weather warning', type: 'weather', location: 'All farms', time: '1h ago', impact: 'high' },
      { id: 'act-8', event: 'Yield forecast updated', type: 'yield', location: 'All fields', time: '2h ago', impact: 'medium' },
    ]
  },
  // SECTION 13 - Global Operations
  globalOperations: {
    farms: [
      { farm: 'Green Valley Farm', location: { lat: 40.7128, lng: -74.0060 }, country: 'USA', acres: '2,400', primaryCrop: 'Corn' },
      { farm: 'Sunrise Acres', location: { lat: 51.5074, lng: -0.1278 }, country: 'UK', acres: '1,800', primaryCrop: 'Wheat' },
      { farm: 'Mountain View', location: { lat: 48.8566, lng: 2.3522 }, country: 'France', acres: '3,200', primaryCrop: 'Grapes' },
      { farm: 'River Bend', location: { lat: 35.6762, lng: 139.6503 }, country: 'Japan', acres: '2,100', primaryCrop: 'Rice' },
      { farm: 'Prairie Fields', location: { lat: -33.8688, lng: 151.2093 }, country: 'Australia', acres: '4,500', primaryCrop: 'Wheat' },
    ],
    weather: [
      { region: 'North America', condition: 'Partly Cloudy', temperature: '24°C', impact: 'Low' },
      { region: 'Europe', condition: 'Sunny', temperature: '22°C', impact: 'Low' },
      { region: 'Asia', condition: 'Rainy', temperature: '28°C', impact: 'Medium' },
      { region: 'Australia', condition: 'Sunny', temperature: '18°C', impact: 'Low' },
    ],
    satelliteImages: [
      { region: 'North America', lastUpdate: '15m ago', resolution: '10m', coverage: '100%' },
      { region: 'Europe', lastUpdate: '30m ago', resolution: '10m', coverage: '100%' },
      { region: 'Asia', lastUpdate: '45m ago', resolution: '15m', coverage: '95%' },
    ],
    distributionCenters: [
      { center: 'DC North America', location: { lat: 41.8781, lng: -87.6298 }, capacity: '50,000 tons' },
      { center: 'DC Europe', location: { lat: 52.5200, lng: 13.4050 }, capacity: '40,000 tons' },
      { center: 'DC Asia', location: { lat: 35.6762, lng: 139.6503 }, capacity: '35,000 tons' },
    ],
    cropPerformance: [
      { region: 'North America', crop: 'Corn', yield: '9.2 tons/acre', quality: 94 },
      { region: 'Europe', crop: 'Wheat', yield: '7.8 tons/acre', quality: 91 },
      { region: 'Asia', crop: 'Rice', yield: '6.4 tons/acre', quality: 89 },
      { region: 'Australia', crop: 'Wheat', yield: '8.1 tons/acre', quality: 92 },
    ]
  },
  // SECTION 14 - System Health
  agricultureSystemHealth: {
    iotSensors: {
      total: 2847,
      online: 2789,
      offline: 58,
      health: 97.9
    },
    drones: {
      total: 24,
      active: 18,
      maintenance: 6,
      health: 95.8
    },
    satellites: {
      connected: 3,
      dataQuality: 98.4,
      lastUpdate: '15m ago'
    },
    aiModels: {
      active: 142,
      accuracy: 96.8,
      latency: '0.8s'
    },
    gpsDevices: {
      total: 156,
      online: 152,
      accuracy: 99.2
    },
    farmEquipment: {
      total: 47,
      operating: 38,
      maintenance: 9,
      health: 94.6
    },
    apis: {
      weatherApi: 'operational',
      satelliteApi: 'operational',
      marketApi: 'operational'
    }
  }
};

// Fashion & Luxury Department Configuration
export const fashionDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'fashion-luxury',
  departmentName: 'Fashion & Luxury',
  primaryColor: '#D946EF',
  metrics: [
    {
      id: 'sell-through',
      title: 'Sell-Through',
      value: '71%',
      change: '+5.4%',
      trend: 'up',
      icon: TrendingUp,
      color: '#22C55E',
      subtitle: 'Sales rate'
    },
    {
      id: 'collection',
      title: 'Collection Value',
      value: '$2.2M',
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Current season'
    },
    {
      id: 'inventory',
      title: 'Inventory Freshness',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Briefcase,
      color: '#22C55E',
      subtitle: 'Stock age'
    },
    {
      id: 'vip',
      title: 'VIP Engagement',
      value: '87.4%',
      change: '+3.8%',
      trend: 'up',
      icon: Users,
      color: '#8B5CF6',
      subtitle: 'VIP activity'
    },
    {
      id: 'trend',
      title: 'Trend Adoption',
      value: '78.5%',
      change: '+4.2%',
      trend: 'up',
      icon: Activity,
      color: '#22C55E',
      subtitle: 'Fashion trends'
    },
    {
      id: 'margin',
      title: 'Gross Margin',
      value: '68.7%',
      change: '+1.5%',
      trend: 'up',
      icon: BarChart3,
      color: '#22C55E',
      subtitle: 'Profitability'
    },
  ],
  pipeline: [
    {
      id: 'trend',
      name: 'Trend',
      status: 'completed',
      duration: '1.2s',
      description: 'Trends identified',
      lastUpdate: '04:56:34'
    },
    {
      id: 'design',
      name: 'Design',
      status: 'completed',
      duration: '2.5s',
      description: 'Collection designed',
      lastUpdate: '04:56:37'
    },
    {
      id: 'source',
      name: 'Source',
      status: 'active',
      duration: 'pending',
      description: 'Materials sourced',
      lastUpdate: '04:56:39'
    },
    {
      id: 'launch',
      name: 'Launch',
      status: 'pending',
      duration: 'pending',
      description: 'Product launch'
    },
    {
      id: 'sell',
      name: 'Sell',
      status: 'pending',
      duration: 'pending',
      description: 'Sales operations'
    },
    {
      id: 'retain',
      name: 'Retain',
      status: 'pending',
      duration: 'pending',
      description: 'Customer loyalty'
    },
  ],
  activity: [
    {
      id: 'fashion-act-1',
      task: 'New collection launch exceeded projections',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'Product Team'
    },
    {
      id: 'fashion-act-2',
      task: 'VIP customer campaign generated $450K',
      status: 'completed',
      time: '3h ago',
      impact: 'high',
      agent: 'VIP Manager'
    },
    {
      id: 'fashion-act-3',
      task: 'Trend analysis for next season',
      status: 'processing',
      time: '5h ago',
      impact: 'medium',
      agent: 'Trend Analyst'
    },
  ],
  charts: {
    performance: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Sell-Through Rate',
          data: [65, 68, 70, 71],
          color: '#D946EF',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Collection Value',
          data: [1.8, 1.9, 2.0, 2.1, 2.15, 2.2],
          color: '#22C55E'
        }
      ]
    }
  }
};

// Restaurants Department Configuration
export const restaurantsDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'restaurants',
  departmentName: 'Restaurants',
  primaryColor: '#FB7185',
  metrics: [
    {
      id: 'guest-score',
      title: 'Guest Score',
      value: '92.3',
      change: '+2.4%',
      trend: 'up',
      icon: Heart,
      color: '#22C55E',
      subtitle: 'Customer rating'
    },
    {
      id: 'covers',
      title: 'Covers Optimized',
      value: '18.4K',
      change: '+8.7%',
      trend: 'up',
      icon: Users,
      color: '#22C55E',
      subtitle: 'Guests served'
    },
    {
      id: 'turnover',
      title: 'Table Turns',
      value: '3.2x',
      change: '+0.4',
      trend: 'up',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'Turnover rate'
    },
    {
      id: 'waste',
      title: 'Waste Reduction',
      value: '15.4%',
      change: '-3.2%',
      trend: 'up',
      icon: TrendingDown,
      color: '#22C55E',
      subtitle: 'Food waste'
    },
    {
      id: 'labor',
      title: 'Labor Efficiency',
      value: '87.6%',
      change: '+2.1%',
      trend: 'up',
      icon: Users,
      color: '#8B5CF6',
      subtitle: 'Staff productivity'
    },
    {
      id: 'revenue',
      title: 'Revenue Per Cover',
      value: '$42.50',
      change: '+3.8%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Average check'
    },
  ],
  pipeline: [
    {
      id: 'reserve',
      name: 'Reserve',
      status: 'completed',
      duration: '0.2s',
      description: 'Reservation made',
      lastUpdate: '05:23:45'
    },
    {
      id: 'prep',
      name: 'Prep',
      status: 'completed',
      duration: '1.5s',
      description: 'Kitchen prepared',
      lastUpdate: '05:23:47'
    },
    {
      id: 'serve',
      name: 'Serve',
      status: 'active',
      duration: 'pending',
      description: 'Guest service',
      lastUpdate: '05:23:48'
    },
    {
      id: 'upsell',
      name: 'Upsell',
      status: 'pending',
      duration: 'pending',
      description: 'Additional offers'
    },
    {
      id: 'recover',
      name: 'Recover',
      status: 'pending',
      duration: 'pending',
      description: 'Issue resolution'
    },
    {
      id: 'review',
      name: 'Review',
      status: 'pending',
      duration: 'pending',
      description: 'Feedback collection'
    },
  ],
  activity: [
    {
      id: 'rest-act-1',
      task: 'Menu optimization increased revenue by 12%',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'Menu AI'
    },
    {
      id: 'rest-act-2',
      task: 'Inventory management reduced waste by 20%',
      status: 'completed',
      time: '3h ago',
      impact: 'high',
      agent: 'Kitchen Manager'
    },
    {
      id: 'rest-act-3',
      task: 'Guest feedback analysis in progress',
      status: 'processing',
      time: '5h ago',
      impact: 'medium',
      agent: 'Feedback Analyzer'
    },
  ],
  charts: {
    performance: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Daily Covers',
          data: [2.4, 2.6, 2.5, 2.8, 3.2, 3.8, 3.1],
          color: '#FB7185',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Guest Score',
          data: [90, 91, 91.5, 92.3],
          color: '#22C55E'
        }
      ]
    }
  }
};

// Accounting Department Configuration
export const accountingDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'accounting',
  departmentName: 'Accounting',
  primaryColor: '#0F766E',
  metrics: [
    {
      id: 'accuracy',
      title: 'Filing Accuracy',
      value: '99.1%',
      change: '+0.3%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Error-free rate'
    },
    {
      id: 'tax-exposure',
      title: 'Tax Exposure',
      value: '$6.4M',
      change: '-8.4%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
      subtitle: 'Tax liability'
    },
    {
      id: 'audit-readiness',
      title: 'Audit Readiness',
      value: '96.8%',
      change: '+2.1%',
      trend: 'up',
      icon: Shield,
      color: '#22C55E',
      subtitle: 'Compliance score'
    },
    {
      id: 'clients',
      title: 'Clients Served',
      value: '187',
      change: '+12',
      trend: 'up',
      icon: Users,
      color: '#3B82F6',
      subtitle: 'Active clients'
    },
    {
      id: 'automation',
      title: 'Process Automation',
      value: '86%',
      change: '+4.2%',
      trend: 'up',
      icon: Zap,
      color: '#8B5CF6',
      subtitle: 'Digital processes'
    },
    {
      id: 'timeliness',
      title: 'Filing Timeliness',
      value: '98.4%',
      change: '+1.5%',
      trend: 'up',
      icon: Clock,
      color: '#22C55E',
      subtitle: 'On-time submissions'
    },
  ],
  pipeline: [
    {
      id: 'collect',
      name: 'Collect',
      status: 'completed',
      duration: '0.5s',
      description: 'Data collected',
      lastUpdate: '06:34:56'
    },
    {
      id: 'classify',
      name: 'Classify',
      status: 'completed',
      duration: '1.2s',
      description: 'Transactions categorized',
      lastUpdate: '06:34:58'
    },
    {
      id: 'calculate',
      name: 'Calculate',
      status: 'active',
      duration: 'pending',
      description: 'Tax calculations',
      lastUpdate: '06:34:59'
    },
    {
      id: 'review',
      name: 'Review',
      status: 'pending',
      duration: 'pending',
      description: 'Quality review'
    },
    {
      id: 'file',
      name: 'File',
      status: 'pending',
      duration: 'pending',
      description: 'Submission process'
    },
    {
      id: 'defend',
      name: 'Defend',
      status: 'pending',
      duration: 'pending',
      description: 'Audit support'
    },
  ],
  activity: [
    {
      id: 'acct-act-1',
      task: 'Tax optimization saved $450K for clients',
      status: 'completed',
      time: '1h ago',
      impact: 'high',
      agent: 'Tax Advisor AI'
    },
    {
      id: 'acct-act-2',
      task: 'Automated reconciliation reduced errors by 40%',
      status: 'completed',
      time: '3h ago',
      impact: 'high',
      agent: 'Reconciliation Bot'
    },
    {
      id: 'acct-act-3',
      task: 'Audit preparation for Q3 filings',
      status: 'processing',
      time: '5h ago',
      impact: 'medium',
      agent: 'Audit Team'
    },
  ],
  charts: {
    performance: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Filing Accuracy',
          data: [98.5, 98.8, 99.0, 99.1],
          color: '#0F766E',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Tax Exposure',
          data: [7.2, 7.0, 6.8, 6.6, 6.5, 6.4],
          color: '#22C55E'
        }
      ]
    }
  }
};

// Customer Support Department Configuration
export const customerSupportDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'customer-support',
  departmentName: 'Customer Support',
  primaryColor: '#10B981',
  metrics: [
    {
      id: 'total-conversations',
      title: 'Total Conversations',
      value: '2,847',
      change: '+324',
      trend: 'up',
      icon: MessageCircle,
      color: '#10B981',
      subtitle: 'Today'
    },
    {
      id: 'active-agents',
      title: 'Active AI Agents',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Users,
      color: '#3B82F6',
      subtitle: 'Online now'
    },
    {
      id: 'csat-score',
      title: 'CSAT Score',
      value: '4.7/5.0',
      change: '+0.2',
      trend: 'up',
      icon: Heart,
      color: '#22C55E',
      subtitle: 'Customer satisfaction'
    },
    {
      id: 'avg-resolution-time',
      title: 'Avg Resolution Time',
      value: '8m 32s',
      change: '-45s',
      trend: 'up',
      icon: Clock,
      color: '#F59E0B',
      subtitle: 'Target: 10m'
    },
    {
      id: 'first-response-time',
      title: 'First Response Time',
      value: '1m 15s',
      change: '-12s',
      trend: 'up',
      icon: Zap,
      color: '#8B5CF6',
      subtitle: 'Target: 2m'
    },
    {
      id: 'escalation-rate',
      title: 'Escalation Rate',
      value: '4.2%',
      change: '-0.8%',
      trend: 'up',
      icon: AlertCircle,
      color: '#EF4444',
      subtitle: 'Target: <5%'
    },
    {
      id: 'open-tickets',
      title: 'Open Tickets',
      value: '156',
      change: '-23',
      trend: 'up',
      icon: FileText,
      color: '#3B82F6',
      subtitle: 'Pending resolution'
    },
    {
      id: 'resolved-tickets',
      title: 'Resolved Tickets',
      value: '2,691',
      change: '+456',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Today'
    },
  ],
  pipeline: [
    {
      id: 'inquiry',
      name: 'Customer Inquiry',
      status: 'completed',
      duration: '0.5s',
      description: 'Message received',
      lastUpdate: '14:32:15'
    },
    {
      id: 'ai-analysis',
      name: 'AI Analysis',
      status: 'completed',
      duration: '1.2s',
      description: 'Intent classified',
      lastUpdate: '14:32:16'
    },
    {
      id: 'knowledge-retrieval',
      name: 'Knowledge Retrieval',
      status: 'completed',
      duration: '0.8s',
      description: 'Context found',
      lastUpdate: '14:32:17'
    },
    {
      id: 'response-generation',
      name: 'Response Generation',
      status: 'active',
      duration: 'pending',
      description: 'AI drafting response',
      lastUpdate: '14:32:18'
    },
    {
      id: 'customer-feedback',
      name: 'Customer Feedback',
      status: 'pending',
      duration: 'pending',
      description: 'Awaiting response'
    },
    {
      id: 'resolution',
      name: 'Resolution',
      status: 'pending',
      duration: 'pending',
      description: 'Ticket closure'
    },
  ],
  activity: [
    {
      id: 'cs-act-1',
      task: 'Billing inquiry resolved by Support Agent Alpha',
      status: 'completed',
      time: '2m ago',
      impact: 'medium',
      agent: 'Support Agent Alpha'
    },
    {
      id: 'cs-act-2',
      task: 'Technical issue escalated to human agent',
      status: 'processing',
      time: '5m ago',
      impact: 'high',
      agent: 'Support Agent Beta'
    },
    {
      id: 'cs-act-3',
      task: 'Product question answered by Support Agent Gamma',
      status: 'completed',
      time: '8m ago',
      impact: 'low',
      agent: 'Support Agent Gamma'
    },
    {
      id: 'cs-act-4',
      task: 'Password reset completed automatically',
      status: 'completed',
      time: '12m ago',
      impact: 'low',
      agent: 'System Automation'
    },
    {
      id: 'cs-act-5',
      task: 'Refund request processed successfully',
      status: 'completed',
      time: '15m ago',
      impact: 'high',
      agent: 'Support Agent Alpha'
    },
  ],
  charts: {
    performance: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Conversations',
          data: [2456, 2890, 3102, 2756, 3200, 1890, 2847],
          color: '#10B981',
          fill: true
        }
      ]
    },
    trend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'CSAT Score',
          data: [4.5, 4.6, 4.6, 4.7],
          color: '#22C55E'
        },
        {
          label: 'Resolution Rate',
          data: [88, 90, 91, 92],
          color: '#3B82F6'
        }
      ]
    }
  }
};

// Sales & Revenue Dashboard Configuration
export const salesRevenueDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'sales-revenue',
  departmentName: 'Sales & Revenue',
  primaryColor: '#10B981',
  metrics: [
    {
      id: 'monthly-revenue',
      title: 'Monthly Revenue',
      value: '$1.8M',
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: '#10B981',
      subtitle: 'This month'
    },
    {
      id: 'arr',
      title: 'ARR',
      value: '$21.6M',
      change: '+18%',
      trend: 'up',
      icon: TrendingUp,
      color: '#3B82F6',
      subtitle: 'Annual recurring'
    },
    {
      id: 'mrr',
      title: 'MRR',
      value: '$1.8M',
      change: '+8%',
      trend: 'up',
      icon: Activity,
      color: '#8B5CF6',
      subtitle: 'Monthly recurring'
    },
    {
      id: 'pipeline-value',
      title: 'Pipeline Value',
      value: '$9.4M',
      change: '+15%',
      trend: 'up',
      icon: BarChart3,
      color: '#F59E0B',
      subtitle: 'Total pipeline'
    },
    {
      id: 'closed-won',
      title: 'Closed Won',
      value: '$2.4M',
      change: '+22%',
      trend: 'up',
      icon: CheckCircle,
      color: '#10B981',
      subtitle: 'This month'
    },
    {
      id: 'forecast-accuracy',
      title: 'Forecast Accuracy',
      value: '94%',
      change: '+3%',
      trend: 'up',
      icon: Target,
      color: '#06B6D4',
      subtitle: 'Prediction quality'
    }
  ],
  salesPipeline: {
    stages: [
      { name: 'Visitors', value: 45000, conversionRate: 100, revenue: 0 },
      { name: 'Leads', value: 12400, conversionRate: 28, revenue: 0 },
      { name: 'MQLs', value: 6200, conversionRate: 50, revenue: 0 },
      { name: 'SQLs', value: 3100, conversionRate: 50, revenue: 0 },
      { name: 'Opportunities', value: 1240, conversionRate: 40, revenue: 1240000 },
      { name: 'Negotiation', value: 496, conversionRate: 60, revenue: 2400000 },
      { name: 'Closed Won', value: 298, conversionRate: 60, revenue: 4200000 }
    ],
    totalPipeline: 9400000,
    conversionRate: 0.66
  },
  liveDeals: {
    deals: [
      {
        id: 'deal-1',
        company: 'TechCorp Inc',
        value: 250000,
        stage: 'Negotiation',
        probability: 75,
        owner: 'Agent Beta',
        aiRecommendation: 'Schedule executive call',
        nextAction: 'Follow up in 2 days'
      },
      {
        id: 'deal-2',
        company: 'GlobalSoft Ltd',
        value: 180000,
        stage: 'Proposal',
        probability: 60,
        owner: 'Agent Alpha',
        aiRecommendation: 'Send case study',
        nextAction: 'Proposal review'
      },
      {
        id: 'deal-3',
        company: 'InnovateTech',
        value: 320000,
        stage: 'Discovery',
        probability: 45,
        owner: 'Agent Gamma',
        aiRecommendation: 'Identify decision makers',
        nextAction: 'Stakeholder mapping'
      }
    ]
  },
  leadIntelligence: {
    leads: [
      {
        id: 'lead-1',
        company: 'FutureScale',
        source: 'Website',
        score: 92,
        intent: 'high' as const,
        industry: 'Technology',
        companySize: '500-1000'
      },
      {
        id: 'lead-2',
        company: 'CloudFirst',
        source: 'LinkedIn',
        score: 88,
        intent: 'high' as const,
        industry: 'SaaS',
        companySize: '100-500'
      }
    ],
    totalLeads: 1240,
    avgScore: 78
  },
  revenueForecast: {
    monthly: 1800000,
    quarterly: 5400000,
    annual: 21600000,
    bestCase: 24300000,
    expectedCase: 21600000,
    worstCase: 18900000,
    forecastAccuracy: 94,
    months: [
      { month: 'Jan', forecast: 1500000, actual: 1480000 },
      { month: 'Feb', forecast: 1600000, actual: 1650000 },
      { month: 'Mar', forecast: 1700000, actual: 1720000 },
      { month: 'Apr', forecast: 1750000, actual: 1780000 },
      { month: 'May', forecast: 1800000, actual: 1845000 },
      { month: 'Jun', forecast: 1800000 }
    ]
  },
  salesPerformance: {
    performers: [
      {
        name: 'Agent Alpha',
        role: 'SDR Agent',
        revenueClosed: 1200000,
        conversionRate: 22,
        meetingsBooked: 184,
        dealsWon: 45,
        quotaAttainment: 112
      },
      {
        name: 'Agent Beta',
        role: 'Account Executive',
        revenueClosed: 2400000,
        conversionRate: 35,
        meetingsBooked: 87,
        dealsWon: 67,
        quotaAttainment: 134
      }
    ]
  },
  customerIntelligence: {
    expansionOpportunities: 234,
    renewalRisks: 45,
    upsellPotential: 890000,
    avgHealthScore: 87,
    buyingSignals: 156
  },
  aiInsights: {
    insights: [
      {
        id: 'insight-1',
        type: 'opportunity' as const,
        title: '23 deals need follow-up',
        description: 'High-value opportunities approaching deadline',
        impact: 'high' as const,
        action: 'Prioritize outreach'
      },
      {
        id: 'insight-2',
        type: 'opportunity' as const,
        title: 'Enterprise segment growing 34%',
        description: 'Increased demand from Fortune 500 companies',
        impact: 'high' as const,
        action: 'Adjust targeting'
      }
    ]
  },
  activity: [
    {
      id: 'act-1',
      task: 'New lead captured from TechCorp Inc',
      status: 'completed',
      time: '2m ago',
      impact: 'high',
      agent: 'Agent Alpha'
    },
    {
      id: 'act-2',
      task: 'Meeting booked with GlobalSoft Ltd',
      status: 'completed',
      time: '5m ago',
      impact: 'medium',
      agent: 'Agent Beta'
    },
    {
      id: 'act-3',
      task: 'Proposal sent to InnovateTech',
      status: 'processing',
      time: '12m ago',
      impact: 'high',
      agent: 'Agent Gamma'
    }
  ]
};

// Professional Services Dashboard Configuration - Enterprise Consulting Intelligence
export const professionalServicesDashboardConfig: DepartmentDashboardConfig = {
  departmentId: 'professional-services',
  departmentName: 'Professional Services',
  primaryColor: '#10B981',
  metrics: [
    // Financial KPIs
    {
      id: 'services-revenue',
      title: 'Services Revenue',
      value: '$2.4B',
      change: '+12.4%',
      trend: 'up',
      icon: DollarSign,
      color: '#10B981',
      subtitle: 'Annual revenue'
    },
    {
      id: 'gross-margin',
      title: 'Gross Margin',
      value: '38.2%',
      change: '+2.8%',
      trend: 'up',
      icon: BarChart3,
      color: '#10B981',
      subtitle: 'Profitability'
    },
    {
      id: 'pipeline-value',
      title: 'Pipeline Value',
      value: '$4.2B',
      change: '+15.2%',
      trend: 'up',
      icon: TrendingUp,
      color: '#8B5CF6',
      subtitle: 'Proposed engagements'
    },
    {
      id: 'forecast-revenue',
      title: 'Forecast Revenue',
      value: '$2.8B',
      change: '+8.7%',
      trend: 'up',
      icon: LineChart,
      color: '#8B5CF6',
      subtitle: 'Q4 projection'
    },
    {
      id: 'revenue-at-risk',
      title: 'Revenue at Risk',
      value: '$180M',
      change: '-12.3%',
      trend: 'down',
      icon: AlertCircle,
      color: '#F59E0B',
      subtitle: 'Churn risk'
    },
    // Delivery KPIs
    {
      id: 'active-projects',
      title: 'Active Projects',
      value: '12,450',
      change: '+8.4%',
      trend: 'up',
      icon: Briefcase,
      color: '#10B981',
      subtitle: 'Global engagements'
    },
    {
      id: 'on-time-delivery',
      title: 'On-Time Delivery',
      value: '94.2%',
      change: '+3.6%',
      trend: 'up',
      icon: CheckCircle,
      color: '#10B981',
      subtitle: 'Schedule adherence'
    },
    {
      id: 'project-success',
      title: 'Project Success',
      value: '91.8%',
      change: '+2.4%',
      trend: 'up',
      icon: Star,
      color: '#10B981',
      subtitle: 'Client acceptance'
    },
    {
      id: 'sla-compliance',
      title: 'SLA Compliance',
      value: '97.5%',
      change: '+1.2%',
      trend: 'up',
      icon: Shield,
      color: '#10B981',
      subtitle: 'Service levels'
    },
    {
      id: 'milestone-completion',
      title: 'Milestone Completion',
      value: '89.3%',
      change: '+4.1%',
      trend: 'up',
      icon: Target,
      color: '#10B981',
      subtitle: 'Delivery progress'
    },
    // Resource KPIs
    {
      id: 'utilization-rate',
      title: 'Utilization Rate',
      value: '86%',
      change: '+3.2%',
      trend: 'up',
      icon: Activity,
      color: '#3B82F6',
      subtitle: 'Billable capacity'
    },
    {
      id: 'billable-utilization',
      title: 'Billable Utilization',
      value: '82%',
      change: '+2.8%',
      trend: 'up',
      icon: Clock,
      color: '#3B82F6',
      subtitle: 'Revenue-generating'
    },
    {
      id: 'bench-capacity',
      title: 'Bench Capacity',
      value: '14%',
      change: '-5.4%',
      trend: 'down',
      icon: Users,
      color: '#10B981',
      subtitle: 'Available resources'
    },
    {
      id: 'resource-availability',
      title: 'Resource Availability',
      value: '847',
      change: '+12.8%',
      trend: 'up',
      icon: User,
      color: '#3B82F6',
      subtitle: 'Ready to deploy'
    },
    {
      id: 'staffing-accuracy',
      title: 'Staffing Accuracy',
      value: '94.6%',
      change: '+1.8%',
      trend: 'up',
      icon: Target,
      color: '#3B82F6',
      subtitle: 'Skill matching'
    },
    // Customer KPIs
    {
      id: 'csat-score',
      title: 'CSAT Score',
      value: '94%',
      change: '+2.4%',
      trend: 'up',
      icon: Heart,
      color: '#EC4899',
      subtitle: 'Satisfaction'
    },
    {
      id: 'nps-score',
      title: 'NPS Score',
      value: '72',
      change: '+5.2%',
      trend: 'up',
      icon: Star,
      color: '#EC4899',
      subtitle: 'Net promoter'
    },
    {
      id: 'client-health',
      title: 'Client Health',
      value: '87.5',
      change: '+3.1%',
      trend: 'up',
      icon: Activity,
      color: '#EC4899',
      subtitle: 'Health index'
    },
    {
      id: 'renewal-probability',
      title: 'Renewal Probability',
      value: '89.2%',
      change: '+4.8%',
      trend: 'up',
      icon: TrendingUp,
      color: '#10B981',
      subtitle: 'Contract renewal'
    },
    {
      id: 'expansion-value',
      title: 'Expansion Value',
      value: '$620M',
      change: '+18.4%',
      trend: 'up',
      icon: DollarSign,
      color: '#10B981',
      subtitle: 'Upsell potential'
    },
    // AI KPIs
    {
      id: 'ai-productivity',
      title: 'AI Productivity',
      value: '+$180M',
      change: '+22.4%',
      trend: 'up',
      icon: Brain,
      color: '#8B5CF6',
      subtitle: 'Efficiency impact'
    },
    {
      id: 'hours-automated',
      title: 'Hours Automated',
      value: '2.4M',
      change: '+34.2%',
      trend: 'up',
      icon: Zap,
      color: '#8B5CF6',
      subtitle: 'Time saved'
    },
    {
      id: 'cost-savings',
      title: 'Cost Savings',
      value: '$42.8M',
      change: '+28.6%',
      trend: 'up',
      icon: DollarSign,
      color: '#10B981',
      subtitle: 'AI optimization'
    },
    {
      id: 'delivery-acceleration',
      title: 'Delivery Acceleration',
      value: '+28%',
      change: '+8.4%',
      trend: 'up',
      icon: Rocket,
      color: '#8B5CF6',
      subtitle: 'Speed improvement'
    },
    {
      id: 'ai-recommendations',
      title: 'AI Recommendations',
      value: '847K',
      change: '+45.2%',
      trend: 'up',
      icon: Sparkles,
      color: '#8B5CF6',
      subtitle: 'Insights generated'
    },
  ],
  pipeline: [
    {
      id: 'proposal',
      name: 'Proposal Approved',
      status: 'completed',
      duration: '3 days',
      description: 'Client scope agreed',
      lastUpdate: '14:32:15'
    },
    {
      id: 'allocation',
      name: 'Team Allocation',
      status: 'completed',
      duration: '2 days',
      description: 'Resources assigned',
      lastUpdate: '14:35:22'
    },
    {
      id: 'kickoff',
      name: 'Project Kickoff',
      status: 'active',
      duration: '1 day',
      description: 'Client onboarding',
      lastUpdate: '14:45:10'
    },
    {
      id: 'execution',
      name: 'Execution',
      status: 'pending',
      duration: 'pending',
      description: 'Delivery phase'
    },
    {
      id: 'review',
      name: 'Client Review',
      status: 'pending',
      duration: 'pending',
      description: 'Milestone approval'
    },
    {
      id: 'completion',
      name: 'Delivery Completion',
      status: 'pending',
      duration: 'pending',
      description: 'Project sign-off'
    },
  ],
  activity: [
    {
      id: 'act-1',
      task: 'Project Alpha milestone completed with 98% client satisfaction',
      status: 'completed',
      time: '2m ago',
      impact: 'high',
      agent: 'Agent Nexus'
    },
    {
      id: 'act-2',
      task: 'Resource optimization: 12 consultants reallocated to high-margin engagement',
      status: 'completed',
      time: '5m ago',
      impact: 'medium',
      agent: 'Agent Vector'
    },
    {
      id: 'act-3',
      task: 'Client XYZ expansion opportunity identified: $2.3M potential',
      status: 'processing',
      time: '8m ago',
      impact: 'high',
      agent: 'Agent Oracle'
    },
    {
      id: 'act-4',
      task: 'Time leakage detected in Project Beta: 8% non-billable hours',
      status: 'processing',
      time: '12m ago',
      impact: 'medium',
      agent: 'Risk Monitor'
    },
    {
      id: 'act-5',
      task: 'Knowledge base updated with new delivery template',
      status: 'completed',
      time: '15m ago',
      impact: 'low',
      agent: 'Knowledge Curator'
    },
  ],
  charts: {
    performance: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [420, 450, 490, 520, 580, 620],
          color: '#10B981',
          fill: true
        },
        {
          label: 'Margin',
          data: [31, 32, 33, 33, 34, 34],
          color: '#8B5CF6',
          fill: false
        }
      ]
    },
    trend: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Billable Hours',
          data: [1.2, 1.4, 1.6, 1.8],
          color: '#3B82F6'
        }
      ]
    }
  },
  // Professional Services specific sections
  aiProfessionalServicesAgents: {
    agents: [
      {
        id: 'agent-atlas',
        name: 'Agent Atlas',
        role: 'Project Delivery Agent',
        avatar: '🗺️',
        projectsManaged: 12450,
        deliveryAccuracy: '94.2%',
        scheduleOptimization: '+28%',
        confidenceScore: 96,
        status: 'online',
        revenueContribution: '$42.8M',
        color: '#10B981'
      },
      {
        id: 'agent-forge',
        name: 'Agent Forge',
        role: 'Proposal & SOW Agent',
        avatar: '🔨',
        proposalsGenerated: '8,420',
        winRateImpact: '+18%',
        turnaroundTime: '48 hours',
        confidenceScore: 94,
        status: 'online',
        revenueContribution: '$28.4M',
        color: '#8B5CF6'
      },
      {
        id: 'agent-nexus',
        name: 'Agent Nexus',
        role: 'Client Success Agent',
        avatar: '🎯',
        accountsManaged: 2480,
        clientHealthScore: '87.5',
        renewalInfluence: '+34%',
        confidenceScore: 92,
        status: 'online',
        revenueContribution: '$36.2M',
        color: '#3B82F6'
      },
      {
        id: 'agent-vector',
        name: 'Agent Vector',
        role: 'Resource Allocation Agent',
        avatar: '⚡',
        resourcesAssigned: 48200,
        utilizationGain: '+22%',
        forecastAccuracy: '94.6%',
        confidenceScore: 89,
        status: 'online',
        revenueContribution: '$24.8M',
        color: '#F59E0B'
      },
      {
        id: 'agent-sentinel',
        name: 'Agent Sentinel',
        role: 'Risk Management Agent',
        avatar: '🛡️',
        risksPrevented: 847,
        budgetSavings: '$15.6M',
        predictionAccuracy: '91.2%',
        confidenceScore: 95,
        status: 'online',
        revenueContribution: '$18.4M',
        color: '#EF4444'
      }
    ]
  },
  chiefDeliveryOfficerDashboard: {
    activeEngagements: 2480,
    utilizationRate: 87,
    billableRevenue: '$1.8B',
    projectMargin: 34,
    clientSatisfaction: 91,
    deliveryOnTimeRate: 94,
    executiveSummary: {
      totalRevenue: '$1.8B',
      revenueGrowth: '+8.7%',
      marginExpansion: '+2.1%',
      clientRetention: '94%',
      talentUtilization: '87%'
    },
    engagementPerformance: [
      { region: 'North America', revenue: '$820M', margin: 36, satisfaction: 93 },
      { region: 'Europe', revenue: '$540M', margin: 32, satisfaction: 89 },
      { region: 'Asia Pacific', revenue: '$320M', margin: 34, satisfaction: 91 },
      { region: 'Latin America', revenue: '$120M', margin: 30, satisfaction: 88 }
    ]
  },
  projectDeliveryControlCenter: {
    projects: [
      {
        id: 'proj-1',
        name: 'Digital Transformation Initiative',
        client: 'Fortune 100 Tech Company',
        status: 'on-track',
        progress: 72,
        margin: 38,
        teamSize: 24,
        nextMilestone: 'Architecture Review',
        deadline: '2025-03-15',
        riskLevel: 'low'
      },
      {
        id: 'proj-2',
        name: 'Cloud Migration Program',
        client: 'Global Banking Group',
        status: 'at-risk',
        progress: 45,
        margin: 28,
        teamSize: 18,
        nextMilestone: 'Data Migration',
        deadline: '2025-02-28',
        riskLevel: 'high'
      },
      {
        id: 'proj-3',
        name: 'AI Implementation Project',
        client: 'Healthcare Network',
        status: 'on-track',
        progress: 58,
        margin: 42,
        teamSize: 12,
        nextMilestone: 'Model Training',
        deadline: '2025-04-30',
        riskLevel: 'medium'
      }
    ],
    workflowStages: [
      { stage: 'Proposal Approved', count: 245, value: '$1.2B' },
      { stage: 'Team Allocation', count: 189, value: '$890M' },
      { stage: 'Project Kickoff', count: 156, value: '$720M' },
      { stage: 'Execution', count: 1248, value: '$5.8B' },
      { stage: 'Client Review', count: 342, value: '$1.6B' },
      { stage: 'Delivery Completion', count: 89, value: '$420M' }
    ]
  },
  resourceManagementCenter: {
    consultantAvailability: {
      total: 4820,
      available: 847,
      onBench: 234,
      utilization: 87
    },
    skillsMatrix: [
      { skill: 'Cloud Architecture', demand: 89, supply: 67, gap: 22 },
      { skill: 'Data Engineering', demand: 78, supply: 56, gap: 22 },
      { skill: 'AI/ML', demand: 92, supply: 45, gap: 47 },
      { skill: 'DevOps', demand: 71, supply: 78, gap: -7 },
      { skill: 'Security', demand: 65, supply: 89, gap: -24 }
    ],
    utilizationRates: [
      { practice: 'Strategy', utilization: 82, target: 85 },
      { practice: 'Digital', utilization: 91, target: 85 },
      { practice: 'Technology', utilization: 89, target: 85 },
      { practice: 'Operations', utilization: 78, target: 85 },
      { practice: 'Risk', utilization: 94, target: 85 }
    ],
    staffingGaps: [
      { role: 'Senior Cloud Architect', gap: 12, priority: 'high' },
      { role: 'ML Engineer', gap: 8, priority: 'high' },
      { role: 'DevOps Engineer', gap: -5, priority: 'low' },
      { role: 'Security Consultant', gap: -15, priority: 'low' }
    ]
  },
  timeBillingIntelligence: {
    billableHours: {
      currentMonth: '2.4M',
      target: '2.6M',
      achievement: 92
    },
    nonBillableTime: {
      percentage: 13,
      target: 10,
      breakdown: [
        { category: 'Internal Meetings', hours: '120K', percentage: 35 },
        { category: 'Training', hours: '80K', percentage: 24 },
        { category: 'Business Development', hours: '60K', percentage: 18 },
        { category: 'Admin', hours: '76K', percentage: 23 }
      ]
    },
    billingAccuracy: {
      accuracy: 98.7,
      disputes: 23,
      disputedAmount: '$1.2M',
      resolutionRate: 94
    },
    revenueLeakage: {
      identified: '$4.2M',
      prevented: '$3.8M',
      ongoing: '$400K',
      sources: [
        { source: 'Unrecorded Time', amount: '$1.8M' },
        { source: 'Under-billing', amount: '$1.2M' },
        { source: 'Scope Not Captured', amount: '$800K' },
        { source: 'Late Billing', amount: '$400K' }
      ]
    }
  },
  clientIntelligenceHub: {
    clientHealthScore: {
      average: 87,
      distribution: [
        { score: 'Excellent', count: 234, percentage: 9 },
        { score: 'Good', count: 1567, percentage: 63 },
        { score: 'Fair', count: 523, percentage: 21 },
        { score: 'At Risk', count: 156, percentage: 7 }
      ]
    },
    expansionOpportunities: [
      { client: 'TechCorp Inc', potential: '$3.2M', probability: 78, timeline: 'Q2 2025' },
      { client: 'GlobalBank Ltd', potential: '$2.8M', probability: 65, timeline: 'Q3 2025' },
      { client: 'HealthNet LLC', potential: '$1.5M', probability: 89, timeline: 'Q1 2025' }
    ],
    churnRisk: [
      { client: 'LegacyCorp', risk: 'high', reason: 'Service Quality', value: '$890K' },
      { client: 'StartupXYZ', risk: 'medium', reason: 'Budget Cuts', value: '$450K' },
      { client: 'EnterpriseABC', risk: 'low', reason: 'Contract Renewal', value: '$2.1M' }
    ],
    contractValue: {
      totalPortfolio: '$8.9B',
      averageContract: '$3.6M',
      largestContract: '$45M',
      renewalPipeline: '$2.4B'
    }
  },
  proposalsSalesEngine: {
    rfps: {
      active: 67,
      submitted: 234,
      won: 156,
      lost: 45,
      pending: 33
    },
    winRate: {
      overall: 67,
      byPractice: [
        { practice: 'Strategy', winRate: 72 },
        { practice: 'Digital', winRate: 65 },
        { practice: 'Technology', winRate: 68 },
        { practice: 'Operations', winRate: 62 }
      ]
    },
    dealPipeline: {
      stages: [
        { stage: 'Qualification', value: '$1.2B', deals: 234 },
        { stage: 'Proposal', value: '$890M', deals: 156 },
        { stage: 'Negotiation', value: '$560M', deals: 89 },
        { stage: 'Closing', value: '$340M', deals: 45 }
      ],
      totalPipeline: '$2.99B',
      weightedPipeline: '$1.8B'
    },
    pricingModels: [
      { model: 'Fixed Price', usage: 34, avgMargin: 28 },
      { model: 'Time & Materials', usage: 45, avgMargin: 36 },
      { model: 'Outcome-Based', usage: 21, avgMargin: 42 }
    ]
  },
  knowledgeManagementSystem: {
    caseStudies: {
      total: 1247,
      accessed: '45K times',
      avgRating: 4.6,
      topCategories: [
        { category: 'Digital Transformation', count: 234 },
        { category: 'Cloud Migration', count: 189 },
        { category: 'AI Implementation', count: 156 }
      ]
    },
    bestPractices: {
      total: 892,
      adoptionRate: 78,
      impactScore: 87,
      recentUpdates: 45
    },
    deliveryTemplates: {
      total: 345,
      usageRate: 92,
      timeSaved: '23%',
      qualityImprovement: 18
    },
    internalKnowledgeBase: {
      articles: 15678,
      searchSuccess: 94,
      contributionRate: 67,
      expertAvailability: 89
    },
    aiGeneratedInsights: {
      dailyInsights: 234,
      accuracy: 87,
      adoptionRate: 72,
      impactOnDelivery: '+18%'
    }
  },
  deliveryRiskHealthCenter: {
    projectDelays: {
      atRisk: 45,
      delayed: 23,
      critical: 8,
      avgDelay: '12 days'
    },
    scopeCreep: {
      projectsAffected: 67,
      avgImpact: '+15% effort',
      revenueImpact: '$2.3M'
    },
    budgetOverruns: {
      overBudget: 34,
      avgOverrun: '+8%',
      totalImpact: '$4.5M'
    },
    resourceShortages: {
      critical: 12,
      moderate: 34,
      openReqs: 89,
      avgTimeToFill: '45 days'
    },
    clientEscalations: {
      active: 23,
      resolved: 156,
      resolutionTime: '5 days avg',
      satisfaction: 87
    }
  },
  profitabilityFinancialIntelligence: {
    revenuePerEngagement: {
      average: '$3.6M',
      median: '$2.8M',
      topQuartile: '$5.2M',
      bottomQuartile: '$1.8M'
    },
    costPerProject: {
      average: '$2.4M',
      laborCost: 67,
      travelCost: 12,
      technologyCost: 15,
      overhead: 6
    },
    marginByClient: {
      topTier: { clients: 234, avgMargin: 42, revenue: '$4.2B' },
      midTier: { clients: 567, avgMargin: 34, revenue: '$3.8B' },
      emerging: { clients: 678, avgMargin: 28, revenue: '$900M' }
    },
    resourceCostEfficiency: {
      utilizationImpact: '+18%',
      schedulingEfficiency: '+12%',
      skillMatching: '+15%',
      overallImprovement: '+14%'
    },
    profitLeakagePoints: [
      { point: 'Underutilization', impact: '$3.2M', remediation: 'Better resource allocation' },
      { point: 'Scope Creep', impact: '$2.3M', remediation: ' tighter change management' },
      { point: 'Discounting', impact: '$1.8M', remediation: 'Value-based pricing' },
      { point: 'Travel Costs', impact: '$1.2M', remediation: 'Virtual delivery' }
    ]
  },
  aiProfessionalServicesInsights: {
    insights: [
      {
        id: 'insight-1',
        type: 'risk',
        title: 'Project Alpha at risk of 12% margin erosion',
        description: 'Scope expansion detected without change order. Immediate action required.',
        impact: 'high',
        action: 'Initiate change order process'
      },
      {
        id: 'insight-2',
        type: 'opportunity',
        title: 'Resource shortage predicted in Data Engineering',
        description: 'Demand surge expected in Q2. Recommend hiring 12 senior engineers.',
        impact: 'high',
        action: 'Accelerate recruitment'
      },
      {
        id: 'insight-3',
        type: 'opportunity',
        title: 'Client X shows 34% upsell probability',
        description: 'Usage patterns indicate expansion opportunity in AI services.',
        impact: 'medium',
        action: 'Schedule executive briefing'
      },
      {
        id: 'insight-4',
        type: 'risk',
        title: 'Billable utilization below target in EU region',
        description: 'Current utilization at 78% vs 85% target. Impacting quarterly revenue.',
        impact: 'medium',
        action: 'Review resource allocation'
      },
      {
        id: 'insight-5',
        type: 'recommendation',
        title: 'Knowledge reuse could improve delivery efficiency by 18%',
        description: 'Similar projects show template reuse opportunities.',
        impact: 'medium',
        action: 'Implement knowledge sharing program'
      }
    ]
  },
  realTimeDeliveryOperationsFeed: {
    operations: [
      { event: 'Project milestone completed', project: 'Digital Transformation', time: '2m ago', impact: 'high' },
      { event: 'Client approval received', project: 'Cloud Migration', time: '5m ago', impact: 'high' },
      { event: 'Resource reallocated', project: 'AI Implementation', time: '8m ago', impact: 'medium' },
      { event: 'Risk detected', project: 'Data Platform', time: '12m ago', impact: 'high' },
      { event: 'Proposal submitted', project: 'Security Assessment', time: '15m ago', impact: 'medium' },
      { event: 'Invoice generated', project: 'Strategy Engagement', time: '18m ago', impact: 'low' },
      { event: 'Engagement escalated', project: 'Legacy Migration', time: '22m ago', impact: 'high' }
    ]
  },
  platformHealthDeliverySystems: {
    projectManagementTools: {
      system: 'Jira/Asana Integration',
      uptime: 99.9,
      latency: '45ms',
      status: 'operational'
    },
    timeTrackingSystems: {
      system: 'Harvest/Timesheet',
      uptime: 99.8,
      latency: '120ms',
      status: 'operational'
    },
    billingSystems: {
      system: 'SAP/Oracle',
      uptime: 99.7,
      latency: '200ms',
      status: 'operational'
    },
    crmSystems: {
      system: 'Salesforce',
      uptime: 99.9,
      latency: '85ms',
      status: 'operational'
    },
    knowledgeSystems: {
      system: 'Confluence/Notion',
      uptime: 99.6,
      latency: '150ms',
      status: 'operational'
    },
    aiAgents: {
      system: 'AI Agent Network',
      uptime: 99.8,
      latency: '35ms',
      status: 'operational'
    }
  },
  revenueForecastingEngine: {
    currentQuarter: {
      forecast: '$2.8B',
      actual: '$2.4B',
      variance: '+16.7%',
      confidence: 94
    },
    nextQuarter: {
      forecast: '$3.2B',
      growth: '+14.3%',
      keyDrivers: ['New engagements', 'Expansion deals', 'Rate increases']
    },
    annualForecast: {
      forecast: '$10.8B',
      growth: '+12.4%',
      byPractice: [
        { practice: 'Strategy', forecast: '$2.4B', growth: '+8%' },
        { practice: 'Digital', forecast: '$3.8B', growth: '+18%' },
        { practice: 'Technology', forecast: '$2.8B', growth: '+15%' },
        { practice: 'Operations', forecast: '$1.8B', growth: '+6%' }
      ]
    },
    forecastAccuracy: {
      overall: 94.2,
      byRegion: [
        { region: 'North America', accuracy: 96 },
        { region: 'Europe', accuracy: 92 },
        { region: 'Asia Pacific', accuracy: 94 },
        { region: 'Latin America', accuracy: 89 }
      ]
    }
  },
  pmoCommandCenter: {
    executiveInitiatives: [
      { id: 'init-1', name: 'Digital Transformation Acceleration', status: 'on-track', progress: 78, budget: '$450M', spent: '$340M' },
      { id: 'init-2', name: 'AI-First Consulting Strategy', status: 'on-track', progress: 65, budget: '$280M', spent: '$180M' },
      { id: 'init-3', name: 'Global Talent Expansion', status: 'at-risk', progress: 45, budget: '$120M', spent: '$85M' },
      { id: 'init-4', name: 'Sustainability Consulting Practice', status: 'on-track', progress: 82, budget: '$180M', spent: '$145M' }
    ],
    portfolioHealth: {
      totalPrograms: 34,
      healthy: 28,
      atRisk: 4,
      critical: 2,
      overallHealth: 87
    },
    strategicAlignment: {
      aligned: 89,
      partiallyAligned: 8,
      misaligned: 3,
      totalProjects: 12450
    },
    benefitsRealization: {
      projected: '$8.9B',
      realized: '$6.2B',
      percentage: 70,
      byInitiative: [
        { initiative: 'Digital Transformation', projected: '$3.2B', realized: '$2.4B', percentage: 75 },
        { initiative: 'AI Strategy', projected: '$2.8B', realized: '$1.8B', percentage: 64 },
        { initiative: 'Talent Expansion', projected: '$1.2B', realized: '$0.9B', percentage: 75 },
        { initiative: 'Sustainability', projected: '$1.7B', realized: '$1.1B', percentage: 65 }
      ]
    }
  },
  globalDeliveryOperations: {
    deliveryCenters: [
      { center: 'New York', region: 'North America', consultants: 1240, utilization: 92, revenue: '$420M' },
      { center: 'London', region: 'Europe', consultants: 890, utilization: 88, revenue: '$340M' },
      { center: 'Singapore', region: 'Asia Pacific', consultants: 670, utilization: 91, revenue: '$280M' },
      { center: 'São Paulo', region: 'Latin America', consultants: 340, utilization: 84, revenue: '$120M' },
      { center: 'Dubai', region: 'Middle East', consultants: 230, utilization: 86, revenue: '$89M' },
      { center: 'Mumbai', region: 'Asia Pacific', consultants: 560, utilization: 89, revenue: '$180M' }
    ],
    regionalPerformance: [
      { region: 'North America', revenue: '$820M', growth: '+12%', margin: 36, satisfaction: 93 },
      { region: 'Europe', revenue: '$540M', growth: '+8%', margin: 32, satisfaction: 89 },
      { region: 'Asia Pacific', revenue: '$560M', growth: '+18%', margin: 34, satisfaction: 91 },
      { region: 'Latin America', revenue: '$120M', growth: '+6%', margin: 30, satisfaction: 88 },
      { region: 'Middle East', revenue: '$89M', growth: '+14%', margin: 38, satisfaction: 90 }
    ],
    workforceDistribution: {
      totalConsultants: 48200,
      byRegion: [
        { region: 'North America', count: 18200, percentage: 38 },
        { region: 'Europe', count: 14200, percentage: 29 },
        { region: 'Asia Pacific', count: 11200, percentage: 23 },
        { region: 'Latin America', count: 3400, percentage: 7 },
        { region: 'Middle East', count: 1200, percentage: 3 }
      ]
    },
    activeEngagements: {
      total: 12450,
      byRegion: [
        { region: 'North America', count: 4820 },
        { region: 'Europe', count: 3450 },
        { region: 'Asia Pacific', count: 2890 },
        { region: 'Latin America', count: 890 },
        { region: 'Middle East', count: 400 }
      ]
    },
    deliveryCapacity: {
      currentCapacity: 12450,
      maxCapacity: 15600,
      utilization: 80,
      expansionCapacity: 3150
    }
  }
};

// Export all configurations
export const dashboardConfigs: Record<string, DepartmentDashboardConfig> = {
  'trading-investment': tradingDashboardConfig,
  'finance': financeDashboardConfig,
  'human-resources': hrDashboardConfig,
  'marketing': marketingDashboardConfig,
  'sales': salesDashboardConfig,
  'operations': operationsDashboardConfig,
  'ai-and-technology': technologyDashboardConfig,
  'engineering': engineeringDashboardConfig,
  'legal': legalDashboardConfig,
  'security': securityDashboardConfig,
  'data': dataDashboardConfig,
  'product-management': productDashboardConfig,
  'research-development': rdDashboardConfig,
  'administrative': adminDashboardConfig,
  'real-estate': realestateDashboardConfig,
  'insurance': insuranceDashboardConfig,
  'healthcare-medical': healthcareDashboardConfig,
  'manufacturing': manufacturingDashboardConfig,
  'transportation': transportationDashboardConfig,
  'supply-chain': supplychainDashboardConfig,
  'public-sector': governmentDashboardConfig,
  'executive': executiveDashboardConfig,
  'customer-support': customerSupportDashboardConfig,
  'ai-management-governance': aiGovernanceDashboardConfig,
  'banking-finance': bankingFinanceDashboardConfig,
  'e-commerce': ecommerceDashboardConfig,
  'consulting-advisory': consultingDashboardConfig,
  'media-entertainment': mediaDashboardConfig,
  'gaming-esports': gamingDashboardConfig,
  'education': educationDashboardConfig,
  'retail-stores': retailDashboardConfig,
  'travel-tourism': travelDashboardConfig,
  'energy-utilities': energyDashboardConfig,
  'event-management': eventManagementDashboardConfig,
  'agriculture': agricultureDashboardConfig,
  'fashion-luxury': fashionDashboardConfig,
  'restaurants': restaurantsDashboardConfig,
  'accounting': accountingDashboardConfig,
  'customer-support': customerSupportDashboardConfig,
  'sales-revenue': salesRevenueDashboardConfig,
  'professional-services': professionalServicesDashboardConfig,
};

