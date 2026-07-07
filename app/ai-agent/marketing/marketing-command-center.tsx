import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
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
  Bot,
  Sparkles,
  Map,
  Star,
  Award,
  Radio,
  Settings,
  Home,
  User,
  Phone,
  Mail,
  ChevronRight,
  Layers,
  Grid3x3,
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  XCircle,
  MoreHorizontal,
  Filter,
  Search,
  Bell,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Download,
  Share2,
  MoreVertical,
  Eye,
  EyeOff,
  Unlock,
  Copy,
  Trash2,
  Edit2,
  Save,
  X,
  Building2,
  CreditCard,
  Wallet,
  Receipt,
  Calculator,
  Percent,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Tv,
  Music,
  Image,
  File,
  Folder,
  FolderOpen,
  Archive,
  Trash,
  Recycle,
  Clipboard,
  ClipboardCopy,
  ClipboardCheck,
  Scissors,
  Move,
  Maximize2,
  Minimize2,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Sliders,
  Palette,
  Type,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Indent,
  Outdent,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link,
  Unlink,
  Quote,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  HelpCircle,
  Info,
  CheckCircle2,
  PlusCircle,
  MinusCircle,
  LogIn,
  LogOut,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  Key,
  Fingerprint,
  BellRing,
  BellOff,
  MessageSquareMore,
  Send,
  Paperclip,
  AtSign,
  Hash,
  Euro,
  PoundSterling,
  Yen,
  Bitcoin,
  Landmark,
  PiggyBank,
  Flame,
  Droplet,
  Wind,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Umbrella,
  Snowflake,
  Thermometer,
  ThermometerSun,
  ThermometerSnowflake,
  Compass,
  MapPin,
  Navigation,
  Navigation2,
  Earth,
  Satellite,
  Rocket,
  Airplane,
  Car,
  Train,
  Bus,
  Bike,
  Motorcycle,
  Ship,
  Anchor,
  Store,
  Warehouse
} from 'lucide-react-native';

// Types
interface MarketingAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  confidenceScore: number;
  revenueContribution: string;
  activeCampaigns: number;
  performanceTrend: 'up' | 'down' | 'stable';
  metrics: {
    blogsPublished?: number;
    organicTraffic?: number;
    seoScore?: number;
    adSpendManaged?: string;
    roas?: number;
    conversions?: number;
    engagementRate?: number;
    followersGained?: number;
    campaignReach?: string;
  };
}

interface Campaign {
  id: string;
  name: string;
  channel: string;
  budget: number;
  spend: number;
  leads: number;
  revenue: number;
  roi: number;
  status: 'active' | 'paused' | 'completed';
}

interface AIInsight {
  id: string;
  type: 'opportunity' | 'warning' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
}

interface MarketingActivity {
  id: string;
  type: string;
  description: string;
  time: string;
  impact: 'high' | 'medium' | 'low';
  agent?: string;
}

export default function MarketingCommandCenter() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock Data
  const marketingAgents: MarketingAgent[] = [
    {
      id: 'agent-atlas',
      name: 'Agent Atlas',
      role: 'Content Marketing Agent',
      avatar: '🤖',
      status: 'online',
      confidenceScore: 94,
      revenueContribution: '$1.2M',
      activeCampaigns: 8,
      performanceTrend: 'up',
      metrics: {
        blogsPublished: 124,
        organicTraffic: 420000,
        seoScore: 94,
      },
    },
    {
      id: 'agent-nova',
      name: 'Agent Nova',
      role: 'Paid Ads Agent',
      avatar: '🚀',
      status: 'online',
      confidenceScore: 88,
      revenueContribution: '$2.8M',
      activeCampaigns: 12,
      performanceTrend: 'up',
      metrics: {
        adSpendManaged: '$380K',
        roas: 6.2,
        conversions: 2840,
      },
    },
    {
      id: 'agent-pulse',
      name: 'Agent Pulse',
      role: 'Social Media Agent',
      avatar: '⚡',
      status: 'online',
      confidenceScore: 91,
      revenueContribution: '$890K',
      activeCampaigns: 6,
      performanceTrend: 'up',
      metrics: {
        engagementRate: 8.4,
        followersGained: 12500,
        campaignReach: '3.4M',
      },
    },
  ];

  const campaigns: Campaign[] = [
    {
      id: 'camp-1',
      name: 'Summer Sale 2024',
      channel: 'Google Ads',
      budget: 50000,
      spend: 32450,
      leads: 847,
      revenue: 189000,
      roi: 482,
      status: 'active',
    },
    {
      id: 'camp-2',
      name: 'Brand Awareness Q3',
      channel: 'Meta Ads',
      budget: 35000,
      spend: 28900,
      leads: 523,
      revenue: 145000,
      roi: 401,
      status: 'active',
    },
    {
      id: 'camp-3',
      name: 'LinkedIn Lead Gen',
      channel: 'LinkedIn Ads',
      budget: 25000,
      spend: 19800,
      leads: 312,
      revenue: 98000,
      roi: 395,
      status: 'active',
    },
    {
      id: 'camp-4',
      name: 'Email Nurture Series',
      channel: 'Email',
      budget: 8000,
      spend: 6200,
      leads: 234,
      revenue: 67000,
      roi: 980,
      status: 'active',
    },
  ];

  const aiInsights: AIInsight[] = [
    {
      id: 'insight-1',
      type: 'opportunity',
      title: 'Increase LinkedIn budget by 20%',
      description: 'LinkedIn campaign showing 45% higher conversion rate than average. Recommend increasing budget to capture more leads.',
      impact: 'high',
      confidence: 92,
    },
    {
      id: 'insight-2',
      type: 'opportunity',
      title: 'SEO opportunity worth 18K monthly visitors',
      description: 'Keyword analysis identified 15 high-intent keywords with low competition. Estimated traffic potential: 18K monthly visitors.',
      impact: 'high',
      confidence: 88,
    },
    {
      id: 'insight-3',
      type: 'warning',
      title: 'Email open rates dropped 12%',
      description: 'Email engagement declining across all segments. Recommend A/B testing subject lines and send times.',
      impact: 'medium',
      confidence: 85,
    },
    {
      id: 'insight-4',
      type: 'recommendation',
      title: 'Retargeting campaign can generate $140K revenue',
      description: 'Website visitors not converting show high intent. Launch retargeting campaign with estimated $140K revenue potential.',
      impact: 'high',
      confidence: 90,
    },
    {
      id: 'insight-5',
      type: 'opportunity',
      title: 'High-intent audience segment identified',
      description: 'New audience segment showing 3.2x conversion rate. Recommend creating dedicated campaign for this segment.',
      impact: 'high',
      confidence: 87,
    },
  ];

  const marketingActivities: MarketingActivity[] = [
    {
      id: 'act-1',
      type: 'lead',
      description: 'New lead generated from LinkedIn campaign',
      time: '2m ago',
      impact: 'high',
      agent: 'Agent Nova',
    },
    {
      id: 'act-2',
      type: 'campaign',
      description: 'Campaign "Summer Sale" budget optimized',
      time: '5m ago',
      impact: 'medium',
      agent: 'Agent Atlas',
    },
    {
      id: 'act-3',
      type: 'content',
      description: 'Blog post "AI Marketing Trends" published',
      time: '8m ago',
      impact: 'medium',
      agent: 'Agent Atlas',
    },
    {
      id: 'act-4',
      type: 'social',
      description: 'Viral post detected on Instagram',
      time: '12m ago',
      impact: 'high',
      agent: 'Agent Pulse',
    },
    {
      id: 'act-5',
      type: 'conversion',
      description: 'Conversion recorded from email campaign',
      time: '15m ago',
      impact: 'high',
      agent: 'Agent Nova',
    },
    {
      id: 'act-6',
      type: 'seo',
      description: 'Keyword ranking improved to position 3',
      time: '18m ago',
      impact: 'medium',
      agent: 'Agent Atlas',
    },
    {
      id: 'act-7',
      type: 'attribution',
      description: 'Revenue attributed to multi-touch journey',
      time: '22m ago',
      impact: 'high',
      agent: 'System',
    },
  ];

  const executiveKPIs = [
    {
      id: 'marketing-roi',
      title: 'Marketing ROI',
      value: '428%',
      change: '+18.5%',
      trend: 'up',
      icon: TrendingUp,
      color: '#22C55E',
    },
    {
      id: 'revenue-influenced',
      title: 'Revenue Influenced',
      value: '$8.4M',
      change: '+22.3%',
      trend: 'up',
      icon: DollarSign,
      color: '#22C55E',
    },
    {
      id: 'leads-generated',
      title: 'Leads Generated',
      value: '12,847',
      change: '+15.7%',
      trend: 'up',
      icon: Users,
      color: '#3B82F6',
    },
    {
      id: 'conversion-rate',
      title: 'Conversion Rate',
      value: '4.8%',
      change: '+0.7%',
      trend: 'up',
      icon: Target,
      color: '#22C55E',
    },
    {
      id: 'cac',
      title: 'Customer Acquisition Cost',
      value: '$142',
      change: '-8.2%',
      trend: 'down',
      icon: DollarSign,
      color: '#22C55E',
    },
    {
      id: 'roas',
      title: 'Return on Ad Spend',
      value: '6.2x',
      change: '+0.8%',
      trend: 'up',
      icon: Activity,
      color: '#22C55E',
    },
    {
      id: 'website-traffic',
      title: 'Website Traffic',
      value: '1.8M',
      change: '+12.4%',
      trend: 'up',
      icon: Globe,
      color: '#3B82F6',
    },
    {
      id: 'mqls',
      title: 'Marketing Qualified Leads',
      value: '3,247',
      change: '+14.2%',
      trend: 'up',
      icon: CheckCircle,
      color: '#22C55E',
    },
    {
      id: 'campaign-score',
      title: 'Campaign Performance Score',
      value: '87',
      change: '+5.1%',
      trend: 'up',
      icon: Star,
      color: '#F59E0B',
    },
    {
      id: 'active-campaigns',
      title: 'Active Campaigns',
      value: '48',
      change: '+4',
      trend: 'up',
      icon: Briefcase,
      color: '#8B5CF6',
    },
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Marketing Agents', icon: Bot },
    { id: 'campaigns', label: 'Campaigns', icon: Briefcase },
    { id: 'content', label: 'Content Studio', icon: FileText },
    { id: 'seo', label: 'SEO Intelligence', icon: Globe },
    { id: 'ads', label: 'Paid Advertising', icon: Target },
    { id: 'social', label: 'Social Media', icon: MessageCircle },
    { id: 'email', label: 'Email Marketing', icon: Mail },
    { id: 'audience', label: 'Audience Insights', icon: Users },
    { id: 'attribution', label: 'Attribution', icon: PieChart },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const audienceSegments = [
    { id: 'seg-1', name: 'Enterprise Decision Makers', size: 12400, engagement: 8.4, conversion: 4.2, characteristics: ['C-Suite', 'High Budget', 'Long Sales Cycle'] },
    { id: 'seg-2', name: 'SMB Owners', size: 28400, engagement: 6.8, conversion: 3.1, characteristics: ['Price Sensitive', 'Quick Decision', 'Feature Focused'] },
    { id: 'seg-3', name: 'Marketing Professionals', size: 15200, engagement: 9.2, conversion: 5.8, characteristics: ['Tech Savvy', 'Early Adopter', 'Influencer'] },
    { id: 'seg-4', name: 'Startup Founders', size: 8400, engagement: 7.6, conversion: 3.9, characteristics: ['Growth Focused', 'Budget Conscious', 'Scalable Solutions'] },
  ];

  const contentPerformance = [
    { id: 'content-1', type: 'Blog', title: 'AI Marketing Trends 2024', views: 45200, engagement: 8.4, shares: 1240, conversion: 4.2, revenue: 28400 },
    { id: 'content-2', type: 'Landing Page', title: 'Product Launch Page', views: 28400, engagement: 6.2, shares: 320, conversion: 8.8, revenue: 142000 },
    { id: 'content-3', type: 'Video', title: 'Product Demo Video', views: 68400, engagement: 9.1, shares: 2840, conversion: 5.4, revenue: 58000 },
    { id: 'content-4', type: 'Social', title: 'LinkedIn Thought Leadership', views: 124000, engagement: 7.8, shares: 5400, conversion: 3.2, revenue: 42000 },
    { id: 'content-5', type: 'Email', title: 'Newsletter Campaign', views: 18400, engagement: 5.6, shares: 120, conversion: 6.8, revenue: 38000 },
  ];

  const seoMetrics = [
    { id: 'seo-1', keyword: 'AI marketing automation', position: 3, volume: 12400, difficulty: 68, trend: 'up', change: '+2' },
    { id: 'seo-2', keyword: 'marketing AI tools', position: 5, volume: 8400, difficulty: 54, trend: 'up', change: '+3' },
    { id: 'seo-3', keyword: 'automated campaign management', position: 7, volume: 5200, difficulty: 42, trend: 'stable', change: '0' },
    { id: 'seo-4', keyword: 'AI content generation', position: 2, volume: 18200, difficulty: 72, trend: 'up', change: '+1' },
    { id: 'seo-5', keyword: 'marketing analytics platform', position: 8, volume: 6800, difficulty: 58, trend: 'down', change: '-1' },
  ];

  const paidAdsMetrics = [
    { id: 'ads-1', platform: 'Google Ads', spend: 125000, impressions: 2840000, ctr: 3.2, cpc: 2.4, cpa: 42, roas: 6.8, status: 'active' },
    { id: 'ads-2', platform: 'Meta Ads', spend: 84000, impressions: 1840000, ctr: 2.8, cpc: 1.8, cpa: 38, roas: 5.4, status: 'active' },
    { id: 'ads-3', platform: 'LinkedIn Ads', spend: 52000, impressions: 420000, ctr: 4.2, cpc: 5.2, cpa: 68, roas: 4.8, status: 'active' },
    { id: 'ads-4', platform: 'TikTok Ads', spend: 28000, impressions: 840000, ctr: 3.8, cpc: 0.8, cpa: 28, roas: 7.2, status: 'active' },
    { id: 'ads-5', platform: 'YouTube Ads', spend: 42000, impressions: 680000, ctr: 1.8, cpc: 0.6, cpa: 52, roas: 5.8, status: 'paused' },
  ];

  const socialMediaMetrics = [
    { id: 'social-1', platform: 'LinkedIn', followers: 48200, growth: 12.4, reach: 284000, engagement: 6.8, shares: 1240, sentiment: 'positive' },
    { id: 'social-2', platform: 'Instagram', followers: 28400, growth: 18.2, reach: 420000, engagement: 8.4, shares: 2840, sentiment: 'positive' },
    { id: 'social-3', platform: 'Facebook', followers: 38400, growth: 8.6, reach: 520000, engagement: 5.2, shares: 1840, sentiment: 'neutral' },
    { id: 'social-4', platform: 'X (Twitter)', followers: 24200, growth: 15.8, reach: 184000, engagement: 4.8, shares: 920, sentiment: 'mixed' },
    { id: 'social-5', platform: 'TikTok', followers: 18400, growth: 42.4, reach: 840000, engagement: 12.8, shares: 5400, sentiment: 'positive' },
    { id: 'social-6', platform: 'YouTube', followers: 12400, growth: 9.2, reach: 280000, engagement: 7.4, shares: 680, sentiment: 'positive' },
  ];

  const attributionFunnel = [
    { stage: 'Awareness', users: 100000, conversionRate: 100, dropOff: 0, revenue: 0 },
    { stage: 'Engagement', users: 68000, conversionRate: 68, dropOff: 32, revenue: 0 },
    { stage: 'Lead', users: 28400, conversionRate: 41.8, dropOff: 58.2, revenue: 0 },
    { stage: 'MQL', users: 12400, conversionRate: 43.7, dropOff: 56.3, revenue: 0 },
    { stage: 'SQL', users: 6800, conversionRate: 54.8, dropOff: 45.2, revenue: 0 },
    { stage: 'Customer', users: 2840, conversionRate: 41.8, dropOff: 58.2, revenue: 8400000 },
    { stage: 'Retention', users: 2240, conversionRate: 78.9, dropOff: 21.1, revenue: 12400000 },
  ];

  const renderKPICard = (kpi: any) => (
    <View key={kpi.id} style={[styles.kpiCard, { backgroundColor: theme.colors.card, borderColor: kpi.color + '30' }]}>
      <View style={styles.kpiHeader}>
        <View style={[styles.kpiIconContainer, { backgroundColor: kpi.color + '20' }]}>
          <kpi.icon size={20} color={kpi.color} />
        </View>
        <View style={[styles.kpiTrend, { backgroundColor: kpi.trend === 'up' ? '#22C55E' + '20' : '#EF4444' + '20' }]}>
          <Text style={[styles.kpiTrendText, { color: kpi.trend === 'up' ? '#22C55E' : '#EF4444' }]}>
            {kpi.change}
          </Text>
        </View>
      </View>
      <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
      <Text style={[styles.kpiTitle, { color: theme.colors.textSecondary }]}>{kpi.title}</Text>
    </View>
  );

  const renderAgentCard = (agent: MarketingAgent) => (
    <TouchableOpacity
      key={agent.id}
      style={[styles.agentCard, { backgroundColor: theme.colors.card, borderColor: selectedAgent === agent.id ? '#10B981' : 'transparent' }]}
      onPress={() => setSelectedAgent(agent.id)}
    >
      <View style={styles.agentHeader}>
        <View style={styles.agentAvatar}>
          <Text style={styles.agentAvatarText}>{agent.avatar}</Text>
          <View style={[styles.agentStatus, { backgroundColor: agent.status === 'online' ? '#22C55E' : '#6B7280' }]} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
          <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>{agent.role}</Text>
        </View>
        <View style={[styles.confidenceBadge, { backgroundColor: '#10B981' + '20' }]}>
          <Text style={[styles.confidenceText, { color: '#10B981' }]}>{agent.confidenceScore}%</Text>
        </View>
      </View>
      
      <View style={styles.agentMetrics}>
        {agent.metrics.blogsPublished && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.metrics.blogsPublished}</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Blogs</Text>
          </View>
        )}
        {agent.metrics.organicTraffic && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{(agent.metrics.organicTraffic / 1000).toFixed(0)}K</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Traffic</Text>
          </View>
        )}
        {agent.metrics.seoScore && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.metrics.seoScore}</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>SEO</Text>
          </View>
        )}
        {agent.metrics.adSpendManaged && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.metrics.adSpendManaged}</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Spend</Text>
          </View>
        )}
        {agent.metrics.roas && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.metrics.roas}x</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>ROAS</Text>
          </View>
        )}
        {agent.metrics.conversions && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.metrics.conversions}</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Conversions</Text>
          </View>
        )}
        {agent.metrics.engagementRate && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.metrics.engagementRate}%</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Engagement</Text>
          </View>
        )}
        {agent.metrics.followersGained && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{(agent.metrics.followersGained / 1000).toFixed(1)}K</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Followers</Text>
          </View>
        )}
      </View>

      <View style={styles.agentFooter}>
        <View style={styles.revenueTag}>
          <DollarSign size={12} color="#22C55E" />
          <Text style={[styles.revenueText, { color: '#22C55E' }]}>{agent.revenueContribution}</Text>
        </View>
        <View style={styles.campaignsTag}>
          <Briefcase size={12} color="#3B82F6" />
          <Text style={[styles.campaignsText, { color: '#3B82F6' }]}>{agent.activeCampaigns} campaigns</Text>
        </View>
        {agent.performanceTrend === 'up' && <TrendingUp size={16} color="#22C55E" />}
        {agent.performanceTrend === 'down' && <TrendingDown size={16} color="#EF4444" />}
      </View>
    </TouchableOpacity>
  );

  const renderCampaignRow = (campaign: Campaign) => (
    <View key={campaign.id} style={[styles.campaignRow, { borderBottomColor: theme.colors.border }]}>
      <View style={styles.campaignInfo}>
        <Text style={[styles.campaignName, { color: theme.colors.text }]}>{campaign.name}</Text>
        <Text style={[styles.campaignChannel, { color: theme.colors.textSecondary }]}>{campaign.channel}</Text>
      </View>
      <View style={styles.campaignMetrics}>
        <View style={styles.campaignMetric}>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Budget</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>${campaign.budget.toLocaleString()}</Text>
        </View>
        <View style={styles.campaignMetric}>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Spend</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>${campaign.spend.toLocaleString()}</Text>
        </View>
        <View style={styles.campaignMetric}>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Leads</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>{campaign.leads}</Text>
        </View>
        <View style={styles.campaignMetric}>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Revenue</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>${campaign.revenue.toLocaleString()}</Text>
        </View>
        <View style={styles.campaignMetric}>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>ROI</Text>
          <Text style={[styles.metricValue, { color: campaign.roi > 400 ? '#22C55E' : '#F59E0B' }]}>{campaign.roi}%</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: campaign.status === 'active' ? '#22C55E' + '20' : '#6B7280' + '20' }]}>
        <Text style={[styles.statusText, { color: campaign.status === 'active' ? '#22C55E' : '#6B7280' }]}>
          {campaign.status}
        </Text>
      </View>
    </View>
  );

  const renderInsightCard = (insight: AIInsight) => (
    <View key={insight.id} style={[styles.insightCard, { backgroundColor: theme.colors.card, borderLeftColor: insight.type === 'opportunity' ? '#22C55E' : insight.type === 'warning' ? '#F59E0B' : '#3B82F6' }]}>
      <View style={styles.insightHeader}>
        <View style={[styles.insightIcon, { backgroundColor: insight.type === 'opportunity' ? '#22C55E' + '20' : insight.type === 'warning' ? '#F59E0B' + '20' : '#3B82F6' + '20' }]}>
          {insight.type === 'opportunity' && <TrendingUp size={16} color="#22C55E" />}
          {insight.type === 'warning' && <AlertTriangle size={16} color="#F59E0B" />}
          {insight.type === 'recommendation' && <Lightbulb size={16} color="#3B82F6" />}
        </View>
        <View style={[styles.impactBadge, { backgroundColor: insight.impact === 'high' ? '#EF4444' + '20' : insight.impact === 'medium' ? '#F59E0B' + '20' : '#6B7280' + '20' }]}>
          <Text style={[styles.impactText, { color: insight.impact === 'high' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#6B7280' }]}>
            {insight.impact}
          </Text>
        </View>
      </View>
      <Text style={[styles.insightTitle, { color: theme.colors.text }]}>{insight.title}</Text>
      <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>{insight.description}</Text>
      <View style={styles.insightFooter}>
        <View style={styles.confidenceBar}>
          <Text style={[styles.confidenceLabel, { color: theme.colors.textSecondary }]}>Confidence</Text>
          <View style={styles.confidenceTrack}>
            <View style={[styles.confidenceFill, { width: `${insight.confidence}%`, backgroundColor: '#10B981' }]} />
          </View>
          <Text style={[styles.confidenceValue, { color: theme.colors.text }]}>{insight.confidence}%</Text>
        </View>
      </View>
    </View>
  );

  const renderActivityItem = (activity: MarketingActivity) => (
    <View key={activity.id} style={[styles.activityItem, { borderBottomColor: theme.colors.border }]}>
      <View style={[styles.activityDot, { backgroundColor: activity.impact === 'high' ? '#EF4444' : activity.impact === 'medium' ? '#F59E0B' : '#6B7280' }]} />
      <View style={styles.activityContent}>
        <Text style={[styles.activityDescription, { color: theme.colors.text }]}>{activity.description}</Text>
        <View style={styles.activityMeta}>
          <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{activity.time}</Text>
          {activity.agent && <Text style={[styles.activityAgent, { color: '#3B82F6' }]}>• {activity.agent}</Text>}
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Left Sidebar */}
      {!sidebarCollapsed && (
        <View style={[styles.sidebar, { backgroundColor: theme.colors.card, borderRightColor: theme.colors.border }]}>
          <View style={styles.sidebarHeader}>
            <View style={[styles.sidebarLogo, { backgroundColor: '#EC4899' + '20' }]}>
              <Sparkles size={24} color="#EC4899" />
            </View>
            <Text style={[styles.sidebarTitle, { color: theme.colors.text }]}>Marketing</Text>
          </View>
          <ScrollView style={styles.sidebarNav} showsVerticalScrollIndicator={false}>
            {navigationItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.navItem, selectedTab === item.id && styles.navItemActive, { backgroundColor: selectedTab === item.id ? '#EC4899' + '20' : 'transparent' }]}
                onPress={() => setSelectedTab(item.id)}
              >
                <item.icon size={20} color={selectedTab === item.id ? '#EC4899' : theme.colors.textSecondary} />
                <Text style={[styles.navItemText, { color: selectedTab === item.id ? '#EC4899' : theme.colors.textSecondary }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={[styles.sidebarCollapse, { backgroundColor: theme.colors.background }]} onPress={() => setSidebarCollapsed(true)}>
            <ChevronLeft size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      )}

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={[styles.headerIcon, { backgroundColor: '#EC4899' + '20' }]}>
              <Sparkles size={24} color="#EC4899" />
            </View>
            <View>
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>AI Marketing Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>Autonomous Marketing Operations</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.colors.background }]}>
              <Bell size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.colors.background }]}>
              <Settings size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          </View>
          {!sidebarCollapsed && (
            <TouchableOpacity style={[styles.sidebarExpand, { backgroundColor: theme.colors.background }]} onPress={() => setSidebarCollapsed(false)}>
              <ChevronRight size={20} color={theme.colors.text} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Executive KPI Bar */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Marketing KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            {executiveKPIs.map(renderKPICard)}
          </ScrollView>
        </View>

        {/* AI Marketing Agents */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Marketing Agents</Text>
            <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: '#EC4899' + '20' }]}>
              <Text style={[styles.viewAllText, { color: '#EC4899' }]}>View All</Text>
              <ChevronRight size={16} color="#EC4899" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {marketingAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* Marketing Command Center */}
        <View style={[styles.commandCenter, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.commandCenterTitle, { color: theme.colors.text }]}>Marketing Command Center</Text>
          
          <View style={styles.commandMetrics}>
            <View style={styles.commandMetric}>
              <Text style={[styles.commandMetricValue, { color: '#22C55E' }]}>$8.4M</Text>
              <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>Revenue Influenced</Text>
            </View>
            <View style={styles.commandMetric}>
              <Text style={[styles.commandMetricValue, { color: '#22C55E' }]}>428%</Text>
              <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>Marketing ROI</Text>
            </View>
            <View style={styles.commandMetric}>
              <Text style={[styles.commandMetricValue, { color: '#3B82F6' }]}>12,847</Text>
              <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>Leads Generated</Text>
            </View>
            <View style={styles.commandMetric}>
              <Text style={[styles.commandMetricValue, { color: '#8B5CF6' }]}>48</Text>
              <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>Active Campaigns</Text>
            </View>
            <View style={styles.commandMetric}>
              <Text style={[styles.commandMetricValue, { color: '#F59E0B' }]}>1.8M</Text>
              <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>Monthly Traffic</Text>
            </View>
          </View>
        </View>

        {/* Campaign Performance Hub */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Campaign Performance Hub</Text>
            <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: '#EC4899' + '20' }]}>
              <Text style={[styles.viewAllText, { color: '#EC4899' }]}>View All</Text>
              <ChevronRight size={16} color="#EC4899" />
            </TouchableOpacity>
          </View>
          <View style={[styles.campaignsContainer, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.campaignsHeader, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.campaignsHeaderText, { color: theme.colors.textSecondary }]}>Campaign</Text>
              <Text style={[styles.campaignsHeaderText, { color: theme.colors.textSecondary }]}>Metrics</Text>
              <Text style={[styles.campaignsHeaderText, { color: theme.colors.textSecondary }]}>Status</Text>
            </View>
            {campaigns.map(renderCampaignRow)}
          </View>
        </View>

        {/* AI Insights Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights Center</Text>
            <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: '#EC4899' + '20' }]}>
              <Text style={[styles.viewAllText, { color: '#EC4899' }]}>View All</Text>
              <ChevronRight size={16} color="#EC4899" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.insightsScroll}>
            {aiInsights.map(renderInsightCard)}
          </ScrollView>
        </View>

        {/* Real-time Marketing Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-time Marketing Activity</Text>
            <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: '#EC4899' + '20' }]}>
              <Text style={[styles.viewAllText, { color: '#EC4899' }]}>View All</Text>
              <ChevronRight size={16} color="#EC4899" />
            </TouchableOpacity>
          </View>
          <View style={[styles.activityContainer, { backgroundColor: theme.colors.card }]}>
            {marketingActivities.map(renderActivityItem)}
          </View>
        </View>

        {/* Audience Intelligence Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Audience Intelligence Center</Text>
            <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: '#EC4899' + '20' }]}>
              <Text style={[styles.viewAllText, { color: '#EC4899' }]}>View All</Text>
              <ChevronRight size={16} color="#EC4899" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.segmentsScroll}>
            {audienceSegments.map((segment) => (
              <View key={segment.id} style={[styles.segmentCard, { backgroundColor: theme.colors.card }]}>
                <View style={styles.segmentHeader}>
                  <Text style={[styles.segmentName, { color: theme.colors.text }]}>{segment.name}</Text>
                  <View style={[styles.segmentSize, { backgroundColor: '#3B82F6' + '20' }]}>
                    <Text style={[styles.segmentSizeText, { color: '#3B82F6' }]}>{segment.size.toLocaleString()}</Text>
                  </View>
                </View>
                <View style={styles.segmentMetrics}>
                  <View style={styles.segmentMetric}>
                    <Text style={[styles.segmentMetricValue, { color: '#22C55E' }]}>{segment.engagement}%</Text>
                    <Text style={[styles.segmentMetricLabel, { color: theme.colors.textSecondary }]}>Engagement</Text>
                  </View>
                  <View style={styles.segmentMetric}>
                    <Text style={[styles.segmentMetricValue, { color: '#8B5CF6' }]}>{segment.conversion}%</Text>
                    <Text style={[styles.segmentMetricLabel, { color: theme.colors.textSecondary }]}>Conversion</Text>
                  </View>
                </View>
                <View style={styles.characteristics}>
                  {segment.characteristics.map((char, idx) => (
                    <View key={idx} style={[styles.characteristicTag, { backgroundColor: '#F59E0B' + '20' }]}>
                      <Text style={[styles.characteristicText, { color: '#F59E0B' }]}>{char}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Content Performance Dashboard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Content Performance Dashboard</Text>
            <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: '#EC4899' + '20' }]}>
              <Text style={[styles.viewAllText, { color: '#EC4899' }]}>View All</Text>
              <ChevronRight size={16} color="#EC4899" />
            </TouchableOpacity>
          </View>
          <View style={[styles.contentContainer, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.contentHeader, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.contentHeaderText, { color: theme.colors.textSecondary }]}>Content</Text>
              <Text style={[styles.contentHeaderText, { color: theme.colors.textSecondary }]}>Views</Text>
              <Text style={[styles.contentHeaderText, { color: theme.colors.textSecondary }]}>Engagement</Text>
              <Text style={[styles.contentHeaderText, { color: theme.colors.textSecondary }]}>Shares</Text>
              <Text style={[styles.contentHeaderText, { color: theme.colors.textSecondary }]}>Conversion</Text>
              <Text style={[styles.contentHeaderText, { color: theme.colors.textSecondary }]}>Revenue</Text>
            </View>
            {contentPerformance.map((content) => (
              <View key={content.id} style={[styles.contentRow, { borderBottomColor: theme.colors.border }]}>
                <View style={styles.contentInfo}>
                  <View style={[styles.contentTypeBadge, { backgroundColor: '#EC4899' + '20' }]}>
                    <Text style={[styles.contentTypeText, { color: '#EC4899' }]}>{content.type}</Text>
                  </View>
                  <Text style={[styles.contentTitle, { color: theme.colors.text }]}>{content.title}</Text>
                </View>
                <Text style={[styles.contentMetric, { color: theme.colors.text }]}>{(content.views / 1000).toFixed(0)}K</Text>
                <Text style={[styles.contentMetric, { color: content.engagement > 7 ? '#22C55E' : '#F59E0B' }]}>{content.engagement}%</Text>
                <Text style={[styles.contentMetric, { color: theme.colors.text }]}>{content.shares}</Text>
                <Text style={[styles.contentMetric, { color: '#8B5CF6' }]}>{content.conversion}%</Text>
                <Text style={[styles.contentMetric, { color: '#22C55E' }]}>${(content.revenue / 1000).toFixed(0)}K</Text>
              </View>
            ))}
          </View>
        </View>

        {/* SEO Intelligence Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>SEO Intelligence Center</Text>
            <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: '#EC4899' + '20' }]}>
              <Text style={[styles.viewAllText, { color: '#EC4899' }]}>View All</Text>
              <ChevronRight size={16} color="#EC4899" />
            </TouchableOpacity>
          </View>
          <View style={[styles.seoContainer, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.seoHeader, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.seoHeaderText, { color: theme.colors.textSecondary }]}>Keyword</Text>
              <Text style={[styles.seoHeaderText, { color: theme.colors.textSecondary }]}>Position</Text>
              <Text style={[styles.seoHeaderText, { color: theme.colors.textSecondary }]}>Volume</Text>
              <Text style={[styles.seoHeaderText, { color: theme.colors.textSecondary }]}>Difficulty</Text>
              <Text style={[styles.seoHeaderText, { color: theme.colors.textSecondary }]}>Trend</Text>
            </View>
            {seoMetrics.map((seo) => (
              <View key={seo.id} style={[styles.seoRow, { borderBottomColor: theme.colors.border }]}>
                <Text style={[styles.seoKeyword, { color: theme.colors.text }]}>{seo.keyword}</Text>
                <View style={[styles.positionBadge, { backgroundColor: seo.position <= 3 ? '#22C55E' + '20' : seo.position <= 7 ? '#F59E0B' + '20' : '#6B7280' + '20' }]}>
                  <Text style={[styles.positionText, { color: seo.position <= 3 ? '#22C55E' : seo.position <= 7 ? '#F59E0B' : '#6B7280' }]}>{seo.position}</Text>
                </View>
                <Text style={[styles.seoMetric, { color: theme.colors.text }]}>{seo.volume.toLocaleString()}</Text>
                <Text style={[styles.seoMetric, { color: theme.colors.text }]}>{seo.difficulty}</Text>
                <View style={styles.trendContainer}>
                  {seo.trend === 'up' && <TrendingUp size={16} color="#22C55E" />}
                  {seo.trend === 'down' && <TrendingDown size={16} color="#EF4444" />}
                  {seo.trend === 'stable' && <Activity size={16} color="#6B7280" />}
                  <Text style={[styles.trendChange, { color: seo.trend === 'up' ? '#22C55E' : seo.trend === 'down' ? '#EF4444' : '#6B7280' }]}>{seo.change}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Paid Ads Command Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Paid Ads Command Center</Text>
            <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: '#EC4899' + '20' }]}>
              <Text style={[styles.viewAllText, { color: '#EC4899' }]}>View All</Text>
              <ChevronRight size={16} color="#EC4899" />
            </TouchableOpacity>
          </View>
          <View style={[styles.adsContainer, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.adsHeader, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.adsHeaderText, { color: theme.colors.textSecondary }]}>Platform</Text>
              <Text style={[styles.adsHeaderText, { color: theme.colors.textSecondary }]}>Spend</Text>
              <Text style={[styles.adsHeaderText, { color: theme.colors.textSecondary }]}>Impressions</Text>
              <Text style={[styles.adsHeaderText, { color: theme.colors.textSecondary }]}>CTR</Text>
              <Text style={[styles.adsHeaderText, { color: theme.colors.textSecondary }]}>CPC</Text>
              <Text style={[styles.adsHeaderText, { color: theme.colors.textSecondary }]}>CPA</Text>
              <Text style={[styles.adsHeaderText, { color: theme.colors.textSecondary }]}>ROAS</Text>
              <Text style={[styles.adsHeaderText, { color: theme.colors.textSecondary }]}>Status</Text>
            </View>
            {paidAdsMetrics.map((ad) => (
              <View key={ad.id} style={[styles.adsRow, { borderBottomColor: theme.colors.border }]}>
                <Text style={[ads.platform === 'Google Ads' ? styles.platformGoogle : ad.platform === 'Meta Ads' ? styles.platformMeta : ad.platform === 'LinkedIn Ads' ? styles.platformLinkedIn : ad.platform === 'TikTok Ads' ? styles.platformTikTok : styles.platformYouTube, { color: theme.colors.text }]}>{ad.platform}</Text>
                <Text style={[styles.adsMetric, { color: theme.colors.text }]}>${(ad.spend / 1000).toFixed(0)}K</Text>
                <Text style={[styles.adsMetric, { color: theme.colors.text }]}>{(ad.impressions / 1000000).toFixed(1)}M</Text>
                <Text style={[styles.adsMetric, { color: ad.ctr > 3 ? '#22C55E' : '#F59E0B' }]}>{ad.ctr}%</Text>
                <Text style={[styles.adsMetric, { color: theme.colors.text }]}>${ad.cpc}</Text>
                <Text style={[styles.adsMetric, { color: theme.colors.text }]}>${ad.cpa}</Text>
                <Text style={[styles.adsMetric, { color: ad.roas > 6 ? '#22C55E' : '#F59E0B' }]}>{ad.roas}x</Text>
                <View style={[styles.statusBadge, { backgroundColor: ad.status === 'active' ? '#22C55E' + '20' : '#6B7280' + '20' }]}>
                  <Text style={[styles.statusText, { color: ad.status === 'active' ? '#22C55E' : '#6B7280' }]}>{ad.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Social Media Operations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Social Media Operations</Text>
            <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: '#EC4899' + '20' }]}>
              <Text style={[styles.viewAllText, { color: '#EC4899' }]}>View All</Text>
              <ChevronRight size={16} color="#EC4899" />
            </TouchableOpacity>
          </View>
          <View style={[styles.socialContainer, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.socialHeader, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.socialHeaderText, { color: theme.colors.textSecondary }]}>Platform</Text>
              <Text style={[styles.socialHeaderText, { color: theme.colors.textSecondary }]}>Followers</Text>
              <Text style={[styles.socialHeaderText, { color: theme.colors.textSecondary }]}>Growth</Text>
              <Text style={[styles.socialHeaderText, { color: theme.colors.textSecondary }]}>Reach</Text>
              <Text style={[styles.socialHeaderText, { color: theme.colors.textSecondary }]}>Engagement</Text>
              <Text style={[styles.socialHeaderText, { color: theme.colors.textSecondary }]}>Shares</Text>
              <Text style={[styles.socialHeaderText, { color: theme.colors.textSecondary }]}>Sentiment</Text>
            </View>
            {socialMediaMetrics.map((social) => (
              <View key={social.id} style={[styles.socialRow, { borderBottomColor: theme.colors.border }]}>
                <Text style={[social.platform === 'LinkedIn' ? styles.platformLinkedIn : social.platform === 'Instagram' ? styles.platformInstagram : social.platform === 'Facebook' ? styles.platformFacebook : social.platform === 'X (Twitter)' ? styles.platformTwitter : social.platform === 'TikTok' ? styles.platformTikTok : styles.platformYouTube, { color: theme.colors.text }]}>{social.platform}</Text>
                <Text style={[styles.socialMetric, { color: theme.colors.text }]}>{(social.followers / 1000).toFixed(0)}K</Text>
                <Text style={[styles.socialMetric, { color: '#22C55E' }]}>+{social.growth}%</Text>
                <Text style={[styles.socialMetric, { color: theme.colors.text }]}>{(social.reach / 1000).toFixed(0)}K</Text>
                <Text style={[styles.socialMetric, { color: social.engagement > 7 ? '#22C55E' : '#F59E0B' }]}>{social.engagement}%</Text>
                <Text style={[styles.socialMetric, { color: theme.colors.text }]}>{social.shares}</Text>
                <View style={[styles.sentimentBadge, { backgroundColor: social.sentiment === 'positive' ? '#22C55E' + '20' : social.sentiment === 'negative' ? '#EF4444' + '20' : '#6B7280' + '20' }]}>
                  <Text style={[styles.sentimentText, { color: social.sentiment === 'positive' ? '#22C55E' : social.sentiment === 'negative' ? '#EF4444' : '#6B7280' }]}>{social.sentiment}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Attribution & Funnel Analytics */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Attribution & Funnel Analytics</Text>
            <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: '#EC4899' + '20' }]}>
              <Text style={[styles.viewAllText, { color: '#EC4899' }]}>View All</Text>
              <ChevronRight size={16} color="#EC4899" />
            </TouchableOpacity>
          </View>
          <View style={[styles.funnelContainer, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.funnelTitle, { color: theme.colors.text }]}>Customer Journey Funnel</Text>
            {attributionFunnel.map((stage, index) => (
              <View key={stage.stage} style={styles.funnelStage}>
                <View style={styles.funnelStageInfo}>
                  <Text style={[styles.funnelStageName, { color: theme.colors.text }]}>{stage.stage}</Text>
                  <Text style={[styles.funnelStageUsers, { color: theme.colors.textSecondary }]}>{stage.users.toLocaleString()} users</Text>
                </View>
                <View style={styles.funnelStageMetrics}>
                  <View style={styles.funnelMetric}>
                    <Text style={[styles.funnelMetricValue, { color: '#22C55E' }]}>{stage.conversionRate}%</Text>
                    <Text style={[styles.funnelMetricLabel, { color: theme.colors.textSecondary }]}>Conversion</Text>
                  </View>
                  <View style={styles.funnelMetric}>
                    <Text style={[styles.funnelMetricValue, { color: stage.dropOff > 50 ? '#EF4444' : '#F59E0B' }]}>{stage.dropOff}%</Text>
                    <Text style={[styles.funnelMetricLabel, { color: theme.colors.textSecondary }]}>Drop-off</Text>
                  </View>
                  {stage.revenue > 0 && (
                    <View style={styles.funnelMetric}>
                      <Text style={[styles.funnelMetricValue, { color: '#8B5CF6' }]}>${(stage.revenue / 1000000).toFixed(1)}M</Text>
                      <Text style={[styles.funnelMetricLabel, { color: theme.colors.textSecondary }]}>Revenue</Text>
                    </View>
                  )}
                </View>
                <View style={[styles.funnelProgressBar, { width: `${stage.conversionRate}%`, backgroundColor: '#EC4899' }]} />
              </View>
            ))}
          </View>
        </View>

        {/* Marketing Operations Health */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Marketing Operations Health</Text>
          <View style={[styles.healthGrid, { backgroundColor: theme.colors.card }]}>
            {[
              { label: 'CRM Integration', status: 'healthy', value: 98 },
              { label: 'Analytics Tracking', status: 'healthy', value: 95 },
              { label: 'Pixel Health', status: 'healthy', value: 100 },
              { label: 'Attribution Accuracy', status: 'warning', value: 87 },
              { label: 'Ad Platform Connectivity', status: 'healthy', value: 99 },
              { label: 'AI Agent Performance', status: 'healthy', value: 94 },
            ].map((health, index) => (
              <View key={index} style={[styles.healthItem, { borderRightColor: theme.colors.border }]}>
                <View style={[styles.healthIndicator, { backgroundColor: health.status === 'healthy' ? '#22C55E' : '#F59E0B' }]} />
                <Text style={[styles.healthLabel, { color: theme.colors.textSecondary }]}>{health.label}</Text>
                <Text style={[styles.healthValue, { color: theme.colors.text }]}>{health.value}%</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 240,
    borderRightWidth: 1,
    padding: 16,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  sidebarLogo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sidebarNav: {
    flex: 1,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  navItemActive: {
    borderLeftWidth: 3,
    borderLeftColor: '#EC4899',
  },
  navItemText: {
    fontSize: 14,
    marginLeft: 12,
  },
  sidebarCollapse: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  sidebarExpand: {
    position: 'absolute',
    left: 8,
    top: 16,
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  mainContent: {
    flex: 1,
  },
  scrollView: {
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
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
  kpiScroll: {
    flexDirection: 'row',
  },
  kpiCard: {
    width: 140,
    marginRight: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiTrend: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  kpiTrendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  kpiTitle: {
    fontSize: 11,
  },
  agentsScroll: {
    flexDirection: 'row',
  },
  agentCard: {
    width: 280,
    marginRight: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
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
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  agentAvatarText: {
    fontSize: 24,
  },
  agentStatus: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1F2937',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentRole: {
    fontSize: 12,
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: '600',
  },
  agentMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  metricItem: {
    width: '33%',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
  },
  agentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  revenueTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revenueText: {
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
  },
  campaignsTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  campaignsText: {
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
  },
  commandCenter: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 12,
  },
  commandCenterTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  commandMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  commandMetric: {
    width: '33%',
    marginBottom: 16,
  },
  commandMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commandMetricLabel: {
    fontSize: 12,
  },
  campaignsContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  campaignsHeader: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
  },
  campaignsHeaderText: {
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
  campaignRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  campaignInfo: {
    flex: 1,
  },
  campaignName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  campaignChannel: {
    fontSize: 11,
  },
  campaignMetrics: {
    flexDirection: 'row',
    flex: 2,
    gap: 12,
  },
  campaignMetric: {
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightsScroll: {
    flexDirection: 'row',
  },
  insightCard: {
    width: 300,
    marginRight: 12,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 12,
    marginBottom: 12,
    lineHeight: 16,
  },
  insightFooter: {
    marginTop: 8,
  },
  confidenceBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  confidenceLabel: {
    fontSize: 10,
  },
  confidenceTrack: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 2,
  },
  confidenceValue: {
    fontSize: 10,
    fontWeight: '600',
  },
  activityContainer: {
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    alignItems: 'flex-start',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 4,
  },
  activityContent: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 13,
    marginBottom: 4,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityTime: {
    fontSize: 11,
  },
  activityAgent: {
    fontSize: 11,
    marginLeft: 8,
  },
  segmentsScroll: {
    flexDirection: 'row',
  },
  segmentCard: {
    width: 280,
    marginRight: 12,
    padding: 16,
    borderRadius: 12,
  },
  segmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  segmentName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  segmentSize: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  segmentSizeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  segmentMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  segmentMetric: {
    flex: 1,
  },
  segmentMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  segmentMetricLabel: {
    fontSize: 11,
  },
  characteristics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  characteristicTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  characteristicText: {
    fontSize: 10,
    fontWeight: '500',
  },
  contentContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  contentHeader: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
  },
  contentHeaderText: {
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
  contentRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  contentInfo: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentTypeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  contentTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  contentTitle: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  contentMetric: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  seoContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  seoHeader: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
  },
  seoHeaderText: {
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
  seoRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  seoKeyword: {
    fontSize: 13,
    fontWeight: '500',
    flex: 2,
  },
  positionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  positionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  seoMetric: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  trendChange: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  adsContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  adsHeader: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
  },
  adsHeaderText: {
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
  adsRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  adsMetric: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  platformGoogle: {
    fontWeight: '600',
    color: '#4285F4',
  },
  platformMeta: {
    fontWeight: '600',
    color: '#1877F2',
  },
  platformLinkedIn: {
    fontWeight: '600',
    color: '#0A66C2',
  },
  platformTikTok: {
    fontWeight: '600',
    color: '#000000',
  },
  platformYouTube: {
    fontWeight: '600',
    color: '#FF0000',
  },
  platformInstagram: {
    fontWeight: '600',
    color: '#E4405F',
  },
  platformFacebook: {
    fontWeight: '600',
    color: '#1877F2',
  },
  platformTwitter: {
    fontWeight: '600',
    color: '#000000',
  },
  socialContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  socialHeader: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
  },
  socialHeaderText: {
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
  socialRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  socialMetric: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  sentimentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  sentimentText: {
    fontSize: 10,
    fontWeight: '600',
  },
  funnelContainer: {
    borderRadius: 12,
    padding: 16,
  },
  funnelTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  funnelStage: {
    marginBottom: 16,
    position: 'relative',
  },
  funnelStageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  funnelStageName: {
    fontSize: 14,
    fontWeight: '600',
  },
  funnelStageUsers: {
    fontSize: 12,
  },
  funnelStageMetrics: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  funnelMetric: {
    flex: 1,
  },
  funnelMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  funnelMetricLabel: {
    fontSize: 10,
  },
  funnelProgressBar: {
    height: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 12,
    padding: 16,
  },
  healthItem: {
    width: '33%',
    paddingRight: 12,
    marginBottom: 16,
    borderRightWidth: 1,
  },
  healthIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  healthLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  healthValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});