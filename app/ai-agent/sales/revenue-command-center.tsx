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
  Briefcase,
  Shield,
  FileText,
  BarChart3,
  Zap,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  XCircle,
  Building,
  Calendar,
  MessageSquare,
  Brain,
  Bot,
  Sparkles,
  Star,
  Award,
  Settings,
  LayoutDashboard,
  Layers,
  RefreshCw,
  Eye,
  MoreVertical,
  Search,
  Bell,
  ChevronRight,
  Phone,
  Mail,
  Map,
  Globe,
  Percent,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  Monitor,
  Smartphone,
  Tablet,
  Tv,
  Image,
  File,
  Folder,
  Archive,
  Trash,
  Recycle,
  Clipboard,
  Copy,
  Save,
  X,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  Filter,
  Sliders,
  Bold,
  Italic,
  Code,
  List,
  Link,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  HelpCircle,
  Info,
  PlusCircle,
  MinusCircle,
  LogIn,
  LogOut,
  UserPlus,
  UserCheck,
  UserX,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  Key,
  Fingerprint,
  BellRing,
  BellOff,
  Send,
  Paperclip,
  AtSign,
  Hash,
  CreditCard,
  Wallet,
  Landmark,
  Flame,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Snowflake,
  Thermometer,
  Compass,
  MapPin,
  Navigation,
  Earth,
  Satellite,
  Rocket,
  Car,
  Train,
  Bus,
  Truck,
  Bike,
  Ship,
  Anchor,
  Store,
  Warehouse,
  Factory,
  Laptop,
  Music,
  Video,
  Scissors,
  Move,
  Maximize2,
  Minimize2,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Palette,
  Type,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  Indent,
  Outdent,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Unlink,
  Quote,
  Volume2,
  Mic,
  PhoneOff,
  VideoOff,
  MicOff,
  Radio,
  FolderOpen,
  Upload,
  Download,
  Share2,
  UploadCloud,
  DownloadCloud,
  Heart,
  GitBranch,
  GitMerge,
  GitCommit,
  GitPullRequest,
  GitFork,
  Code2,
  Terminal,
  Cpu,
  HardDrive,
  Database,
  Server,
  Wifi,
} from 'lucide-react-native';

// Types
interface SalesAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  confidenceScore: number;
  revenueContribution: string;
  dealsInfluenced: number;
  performanceTrend: 'up' | 'down' | 'stable';
  metrics: {
    leadsGenerated?: number;
    meetingsBooked?: number;
    conversionRate?: number;
    opportunitiesManaged?: number;
    revenueClosed?: string;
    upsellRevenue?: string;
    renewalSuccess?: number;
  };
}

interface RevenueMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  subtitle: string;
}

interface Deal {
  id: string;
  company: string;
  value: number;
  stage: string;
  probability: number;
  owner: string;
  aiRecommendation: string;
  nextAction: string;
  status: 'green' | 'yellow' | 'red';
}

interface Lead {
  id: string;
  company: string;
  source: string;
  score: number;
  intent: 'high' | 'medium' | 'low';
  industry: string;
  companySize: string;
  aiQualificationScore: number;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  route: string;
  badge?: number;
}

// Navigation Items
const navigationItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: '/dashboard' },
  { id: 'agents', label: 'AI Sales Agents', icon: Bot, route: '/agents', badge: 3 },
  { id: 'leads', label: 'Leads', icon: Users, route: '/leads', badge: 1240 },
  { id: 'opportunities', label: 'Opportunities', icon: Target, route: '/opportunities', badge: 87 },
  { id: 'pipeline', label: 'Pipeline', icon: Layers, route: '/pipeline' },
  { id: 'forecasting', label: 'Forecasting', icon: TrendingUp, route: '/forecasting' },
  { id: 'analytics', label: 'Revenue Analytics', icon: BarChart3, route: '/analytics' },
  { id: 'accounts', label: 'Accounts', icon: Building, route: '/accounts' },
  { id: 'intelligence', label: 'Customer Intelligence', icon: Brain, route: '/intelligence' },
  { id: 'automation', label: 'Sales Automation', icon: Zap, route: '/automation' },
  { id: 'performance', label: 'Performance', icon: Award, route: '/performance' },
  { id: 'settings', label: 'Settings', icon: Settings, route: '/settings' },
];

// Sales Agents Data
const salesAgents: SalesAgent[] = [
  {
    id: 'agent-alpha',
    name: 'Agent Alpha',
    role: 'SDR Agent',
    avatar: '🤖',
    status: 'online',
    confidenceScore: 94,
    revenueContribution: '$340K',
    dealsInfluenced: 45,
    performanceTrend: 'up',
    metrics: {
      leadsGenerated: 1240,
      meetingsBooked: 184,
      conversionRate: 22,
    },
  },
  {
    id: 'agent-beta',
    name: 'Agent Beta',
    role: 'Account Executive Agent',
    avatar: '🎯',
    status: 'online',
    confidenceScore: 89,
    revenueContribution: '$520K',
    dealsInfluenced: 32,
    performanceTrend: 'up',
    metrics: {
      opportunitiesManaged: 87,
      revenueClosed: '$2.4M',
    },
  },
  {
    id: 'agent-gamma',
    name: 'Agent Gamma',
    role: 'Revenue Expansion Agent',
    avatar: '📈',
    status: 'busy',
    confidenceScore: 91,
    revenueContribution: '$280K',
    dealsInfluenced: 28,
    performanceTrend: 'stable',
    metrics: {
      upsellRevenue: '$840K',
      renewalSuccess: 91,
    },
  },
];

// Revenue Metrics
const revenueMetrics: RevenueMetric[] = [
  {
    id: 'monthly-revenue',
    title: 'Monthly Revenue',
    value: '$186,450',
    change: '+12.4%',
    trend: 'up',
    icon: DollarSign,
    color: '#10B981',
    subtitle: 'Current month'
  },
  {
    id: 'arr',
    title: 'ARR',
    value: '$21.6M',
    change: '+12.4%',
    trend: 'up',
    icon: TrendingUp,
    color: '#10B981',
    subtitle: 'Annual recurring'
  },
  {
    id: 'mrr',
    title: 'MRR',
    value: '$1.8M',
    change: '+8.7%',
    trend: 'up',
    icon: DollarSign,
    color: '#10B981',
    subtitle: 'Monthly recurring'
  },
  {
    id: 'quarterly-revenue',
    title: 'Quarterly Revenue',
    value: '$559,350',
    change: '+15.2%',
    trend: 'up',
    icon: BarChart3,
    color: '#10B981',
    subtitle: 'This quarter'
  },
  {
    id: 'revenue-growth',
    title: 'Revenue Growth',
    value: '34.2%',
    change: '+5.8%',
    trend: 'up',
    icon: TrendingUp,
    color: '#3B82F6',
    subtitle: 'Year over year'
  },
  {
    id: 'pipeline-value',
    title: 'Pipeline Value',
    value: '$9.4M',
    change: '+15.2%',
    trend: 'up',
    icon: Activity,
    color: '#8B5CF6',
    subtitle: 'Total opportunities'
  },
  {
    id: 'closed-won',
    title: 'Closed Won',
    value: '184',
    change: '+23',
    trend: 'up',
    icon: CheckCircle,
    color: '#10B981',
    subtitle: 'Deals this month'
  },
  {
    id: 'closed-lost',
    title: 'Closed Lost',
    value: '12',
    change: '-3',
    trend: 'down',
    icon: XCircle,
    color: '#EF4444',
    subtitle: 'Deals this month'
  },
  {
    id: 'forecast-accuracy',
    title: 'Forecast Accuracy',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: Target,
    color: '#10B981',
    subtitle: 'Prediction accuracy'
  },
  {
    id: 'sales-target',
    title: 'Sales Target',
    value: '112%',
    change: '+8.4%',
    trend: 'up',
    icon: Award,
    color: '#10B981',
    subtitle: 'Quota attainment'
  },
];

// Live Deals
const liveDeals: Deal[] = [
  {
    id: 'deal-1',
    company: 'Acme Corp',
    value: 450000,
    stage: 'Negotiation',
    probability: 85,
    owner: 'John Smith',
    aiRecommendation: 'Close this week',
    nextAction: 'Send contract',
    status: 'green',
  },
  {
    id: 'deal-2',
    company: 'TechStart Inc',
    value: 280000,
    stage: 'Proposal',
    probability: 65,
    owner: 'Sarah Jones',
    aiRecommendation: 'Follow up',
    nextAction: 'Schedule demo',
    status: 'yellow',
  },
  {
    id: 'deal-3',
    company: 'Global Solutions',
    value: 520000,
    stage: 'Discovery',
    probability: 45,
    owner: 'Mike Brown',
    aiRecommendation: 'Qualify further',
    nextAction: 'Research needs',
    status: 'red',
  },
  {
    id: 'deal-4',
    company: 'Innovate Labs',
    value: 180000,
    stage: 'Negotiation',
    probability: 90,
    owner: 'Emily Davis',
    aiRecommendation: 'High priority',
    nextAction: 'Final terms',
    status: 'green',
  },
  {
    id: 'deal-5',
    company: 'Enterprise Co',
    value: 750000,
    stage: 'Proposal',
    probability: 55,
    owner: 'John Smith',
    aiRecommendation: 'Add incentives',
    nextAction: 'Review pricing',
    status: 'yellow',
  },
];

// Lead Intelligence
const leadIntelligence: Lead[] = [
  {
    id: 'lead-1',
    company: 'Fortune 500 Corp',
    source: 'LinkedIn',
    score: 92,
    intent: 'high',
    industry: 'Technology',
    companySize: '10,000+',
    aiQualificationScore: 94,
  },
  {
    id: 'lead-2',
    company: 'Startup XYZ',
    source: 'Website',
    score: 78,
    intent: 'high',
    industry: 'SaaS',
    companySize: '50-100',
    aiQualificationScore: 85,
  },
  {
    id: 'lead-3',
    company: 'Midsize Inc',
    source: 'Referral',
    score: 65,
    intent: 'medium',
    industry: 'Finance',
    companySize: '500-1000',
    aiQualificationScore: 72,
  },
  {
    id: 'lead-4',
    company: 'Global Enterprise',
    source: 'Trade Show',
    score: 88,
    intent: 'high',
    industry: 'Healthcare',
    companySize: '5000+',
    aiQualificationScore: 91,
  },
  {
    id: 'lead-5',
    company: 'Local Business',
    source: 'Cold Outreach',
    score: 45,
    intent: 'low',
    industry: 'Retail',
    companySize: '10-50',
    aiQualificationScore: 58,
  },
];

// Activity Stream
const activityStream = [
  { id: 'act-1', event: 'New lead captured', company: 'Fortune 500 Corp', time: '2m ago', type: 'lead' },
  { id: 'act-2', event: 'Meeting booked', company: 'TechStart Inc', time: '5m ago', type: 'meeting' },
  { id: 'act-3', event: 'Proposal sent', company: 'Global Solutions', time: '12m ago', type: 'proposal' },
  { id: 'act-4', event: 'Deal moved stage', company: 'Innovate Labs', time: '18m ago', type: 'deal' },
  { id: 'act-5', event: 'Deal won', company: 'Acme Corp', value: '$450K', time: '25m ago', type: 'won' },
  { id: 'act-6', event: 'Renewal completed', company: 'Enterprise Co', time: '32m ago', type: 'renewal' },
];

// AI Insights
const aiInsights = [
  { id: 'insight-1', type: 'opportunity', title: '23 deals need follow-up', description: 'High-value deals stalled in negotiation', impact: 'high' },
  { id: 'insight-2', type: 'growth', title: 'Enterprise segment growing 34%', description: 'Enterprise deals showing strong momentum', impact: 'high' },
  { id: 'insight-3', type: 'opportunity', title: '14 accounts show high buying intent', description: 'Upsell opportunity worth $620K identified', impact: 'medium' },
  { id: 'insight-4', type: 'risk', title: 'Churn risk detected in 8 accounts', description: 'Customer health scores declining', impact: 'high' },
  { id: 'insight-5', type: 'recommendation', title: 'Lead quality improving 15%', description: 'AI lead scoring showing better conversion', impact: 'medium' },
];

// Sales Operations Health
const operationsHealth = [
  { id: 'op-1', name: 'CRM Sync', status: 'operational', latency: '45ms' },
  { id: 'op-2', name: 'Email Deliverability', status: 'operational', latency: '98.5%' },
  { id: 'op-3', name: 'Call System', status: 'operational', latency: '12ms' },
  { id: 'op-4', name: 'AI Agent Performance', status: 'degraded', latency: '87%' },
  { id: 'op-5', name: 'Workflow Automation', status: 'operational', latency: '0.3s' },
  { id: 'op-6', name: 'API Integrations', status: 'operational', latency: '23ms' },
];

// Revenue Analytics Data
const revenueByProduct = [
  { product: 'Enterprise Plan', revenue: 8500000, growth: 15.2, color: '#10B981' },
  { product: 'Professional Plan', revenue: 6200000, growth: 12.8, color: '#3B82F6' },
  { product: 'Starter Plan', revenue: 2800000, growth: 8.4, color: '#8B5CF6' },
  { product: 'Add-ons', revenue: 1200000, growth: 22.1, color: '#06B6D4' },
];

const revenueByRegion = [
  { region: 'North America', revenue: 9200000, percentage: 42.6, color: '#10B981' },
  { region: 'Europe', revenue: 6800000, percentage: 31.5, color: '#3B82F6' },
  { region: 'Asia Pacific', revenue: 3800000, percentage: 17.6, color: '#8B5CF6' },
  { region: 'Latin America', revenue: 1200000, percentage: 5.6, color: '#F59E0B' },
  { region: 'Middle East', revenue: 600000, percentage: 2.7, color: '#EF4444' },
];

const revenueByIndustry = [
  { industry: 'Technology', revenue: 7200000, percentage: 33.3, color: '#10B981' },
  { industry: 'Finance', revenue: 5400000, percentage: 25.0, color: '#3B82F6' },
  { industry: 'Healthcare', revenue: 3200000, percentage: 14.8, color: '#8B5CF6' },
  { industry: 'Retail', revenue: 2800000, percentage: 13.0, color: '#06B6D4' },
  { industry: 'Manufacturing', revenue: 3000000, percentage: 13.9, color: '#F59E0B' },
];

const revenueByChannel = [
  { channel: 'Direct Sales', revenue: 9800000, percentage: 45.4, color: '#10B981' },
  { channel: 'Partner Channel', revenue: 6200000, percentage: 28.7, color: '#3B82F6' },
  { channel: 'Self-Service', revenue: 3800000, percentage: 17.6, color: '#8B5CF6' },
  { channel: 'Marketplace', revenue: 1800000, percentage: 8.3, color: '#06B6D4' },
];

// Components
function RevenueMetricCard({ metric }: { metric: RevenueMetric }) {
  const { theme } = useTheme();
  const Icon = metric.icon;

  return (
    <View style={[styles.metricCard, { backgroundColor: '#1E293B', borderColor: '#334155' }]}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIconContainer, { backgroundColor: metric.color + '20' }]}>
          <Icon size={20} color={metric.color} />
        </View>
        <View style={styles.metricTrend}>
          {metric.trend === 'up' && <TrendingUp size={16} color="#10B981" />}
          {metric.trend === 'down' && <TrendingDown size={16} color="#EF4444" />}
          {metric.trend === 'stable' && <Activity size={16} color="#6B7280" />}
        </View>
      </View>
      <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{metric.value}</Text>
      <Text style={[styles.metricTitle, { color: '#94A3B8' }]}>{metric.title}</Text>
      <Text style={[styles.metricChange, { color: metric.trend === 'up' ? '#10B981' : metric.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
        {metric.change}
      </Text>
      <Text style={[styles.metricSubtitle, { color: '#64748B' }]}>{metric.subtitle}</Text>
    </View>
  );
}

function SalesAgentCard({ agent }: { agent: SalesAgent }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.agentCard, { backgroundColor: '#1E293B', borderColor: '#334155' }]}>
      <View style={styles.agentHeader}>
        <View style={styles.agentAvatarContainer}>
          <Text style={styles.agentAvatar}>{agent.avatar}</Text>
          <View style={[
            styles.agentStatusIndicator,
            { backgroundColor: agent.status === 'online' ? '#10B981' : agent.status === 'busy' ? '#F59E0B' : '#6B7280' }
          ]} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: '#FFFFFF' }]}>{agent.name}</Text>
          <Text style={[styles.agentRole, { color: '#94A3B8' }]}>{agent.role}</Text>
        </View>
        <View style={styles.agentConfidence}>
          <Text style={[styles.confidenceScore, { color: '#10B981' }]}>{agent.confidenceScore}%</Text>
          <Text style={[styles.confidenceLabel, { color: '#64748B' }]}>Confidence</Text>
        </View>
      </View>
      
      <View style={styles.agentMetrics}>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>{agent.revenueContribution}</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Revenue</Text>
        </View>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>{agent.dealsInfluenced}</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Deals</Text>
        </View>
        <View style={styles.agentMetric}>
          {agent.performanceTrend === 'up' && <TrendingUp size={20} color="#10B981" />}
          {agent.performanceTrend === 'down' && <TrendingDown size={20} color="#EF4444" />}
          {agent.performanceTrend === 'stable' && <Activity size={20} color="#6B7280" />}
        </View>
      </View>

      {agent.metrics.leadsGenerated && (
        <View style={styles.agentDetailedMetrics}>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{agent.metrics.leadsGenerated}</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>Leads</Text>
          </View>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{agent.metrics.meetingsBooked}</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>Meetings</Text>
          </View>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{agent.metrics.conversionRate}%</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>Conv. Rate</Text>
          </View>
        </View>
      )}

      {agent.metrics.opportunitiesManaged && (
        <View style={styles.agentDetailedMetrics}>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{agent.metrics.opportunitiesManaged}</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>Opportunities</Text>
          </View>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{agent.metrics.revenueClosed}</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>Closed</Text>
          </View>
        </View>
      )}

      {agent.metrics.upsellRevenue && (
        <View style={styles.agentDetailedMetrics}>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{agent.metrics.upsellRevenue}</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>Upsell</Text>
          </View>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{agent.metrics.renewalSuccess}%</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>Renewal</Text>
          </View>
        </View>
      )}
    </View>
  );
}

function DealRow({ deal }: { deal: Deal }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.dealRow, { borderBottomColor: theme.colors.border }]}>
      <View style={styles.dealCompany}>
        <Text style={[styles.dealCompanyName, { color: theme.colors.text }]}>{deal.company}</Text>
        <Text style={[styles.dealValue, { color: '#10B981' }]}>${(deal.value / 1000).toFixed(0)}K</Text>
      </View>
      <View style={styles.dealStage}>
        <Text style={[styles.dealStageText, { color: theme.colors.textSecondary }]}>{deal.stage}</Text>
      </View>
      <View style={styles.dealProbability}>
        <View style={[styles.probabilityBar, { backgroundColor: theme.colors.card }]}>
          <View style={[
            styles.probabilityFill,
            { 
              backgroundColor: deal.probability >= 80 ? '#10B981' : deal.probability >= 50 ? '#F59E0B' : '#EF4444',
              width: `${deal.probability}%`
            }
          ]} />
        </View>
        <Text style={[styles.probabilityText, { color: theme.colors.textSecondary }]}>{deal.probability}%</Text>
      </View>
      <View style={styles.dealOwner}>
        <Text style={[styles.dealOwnerText, { color: theme.colors.text }]}>{deal.owner}</Text>
      </View>
      <View style={[styles.dealStatus, { backgroundColor: deal.status === 'green' ? '#10B981' + '20' : deal.status === 'yellow' ? '#F59E0B' + '20' : '#EF4444' + '20' }]}>
        <Text style={[styles.dealStatusText, { color: deal.status === 'green' ? '#10B981' : deal.status === 'yellow' ? '#F59E0B' : '#EF4444' }]}>
          {deal.aiRecommendation}
        </Text>
      </View>
    </View>
  );
}

function LeadCard({ lead }: { lead: Lead }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.leadCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.leadHeader}>
        <Text style={[styles.leadCompany, { color: theme.colors.text }]}>{lead.company}</Text>
        <View style={[styles.leadScore, { backgroundColor: lead.score >= 80 ? '#10B981' + '20' : lead.score >= 60 ? '#F59E0B' + '20' : '#EF4444' + '20' }]}>
          <Text style={[styles.leadScoreText, { color: lead.score >= 80 ? '#10B981' : lead.score >= 60 ? '#F59E0B' : '#EF4444' }]}>
            {lead.score}
          </Text>
        </View>
      </View>
      <View style={styles.leadDetails}>
        <View style={styles.leadDetail}>
          <Text style={[styles.leadDetailLabel, { color: theme.colors.textSecondary }]}>Source</Text>
          <Text style={[styles.leadDetailValue, { color: theme.colors.text }]}>{lead.source}</Text>
        </View>
        <View style={styles.leadDetail}>
          <Text style={[styles.leadDetailLabel, { color: theme.colors.textSecondary }]}>Intent</Text>
          <View style={[styles.leadIntent, { backgroundColor: lead.intent === 'high' ? '#10B981' + '20' : lead.intent === 'medium' ? '#F59E0B' + '20' : '#EF4444' + '20' }]}>
            <Text style={[styles.leadIntentText, { color: lead.intent === 'high' ? '#10B981' : lead.intent === 'medium' ? '#F59E0B' : '#EF4444' }]}>
              {lead.intent}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.leadDetails}>
        <View style={styles.leadDetail}>
          <Text style={[styles.leadDetailLabel, { color: theme.colors.textSecondary }]}>Industry</Text>
          <Text style={[styles.leadDetailValue, { color: theme.colors.text }]}>{lead.industry}</Text>
        </View>
        <View style={styles.leadDetail}>
          <Text style={[styles.leadDetailLabel, { color: theme.colors.textSecondary }]}>Size</Text>
          <Text style={[styles.leadDetailValue, { color: theme.colors.text }]}>{lead.companySize}</Text>
        </View>
      </View>
      <View style={styles.leadAIQualification}>
        <Text style={[styles.leadAIQualificationLabel, { color: theme.colors.textSecondary }]}>AI Qualification Score</Text>
        <View style={styles.leadAIQualificationBar}>
          <View style={[
            styles.leadAIQualificationFill,
            { 
              backgroundColor: lead.aiQualificationScore >= 80 ? '#10B981' : lead.aiQualificationScore >= 60 ? '#F59E0B' : '#EF4444',
              width: `${lead.aiQualificationScore}%`
            }
          ]} />
        </View>
        <Text style={[styles.leadAIQualificationValue, { color: theme.colors.text }]}>{lead.aiQualificationScore}%</Text>
      </View>
    </View>
  );
}

function ActivityItem({ activity }: { activity: any }) {
  const { theme } = useTheme();

  const getIcon = () => {
    switch (activity.type) {
      case 'lead': return <Users size={16} color="#3B82F6" />;
      case 'meeting': return <Calendar size={16} color="#10B981" />;
      case 'proposal': return <FileText size={16} color="#F59E0B" />;
      case 'deal': return <Briefcase size={16} color="#8B5CF6" />;
      case 'won': return <CheckCircle size={16} color="#10B981" />;
      case 'renewal': return <RefreshCw size={16} color="#06B6D4" />;
      default: return <Activity size={16} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.activityItem, { borderBottomColor: theme.colors.border }]}>
      <View style={styles.activityIcon}>
        {getIcon()}
      </View>
      <View style={styles.activityContent}>
        <Text style={[styles.activityEvent, { color: theme.colors.text }]}>{activity.event}</Text>
        <Text style={[styles.activityCompany, { color: theme.colors.textSecondary }]}>{activity.company}</Text>
        {activity.value && <Text style={[styles.activityValue, { color: '#10B981' }]}>{activity.value}</Text>}
      </View>
      <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{activity.time}</Text>
    </View>
  );
}

function InsightCard({ insight }: { insight: any }) {
  const { theme } = useTheme();

  const getIcon = () => {
    switch (insight.type) {
      case 'opportunity': return <Target size={20} color="#10B981" />;
      case 'risk': return <AlertTriangle size={20} color="#EF4444" />;
      case 'growth': return <TrendingUp size={20} color="#3B82F6" />;
      case 'recommendation': return <Sparkles size={20} color="#8B5CF6" />;
      default: return <Brain size={20} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.insightCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.insightIcon}>
        {getIcon()}
      </View>
      <View style={styles.insightContent}>
        <Text style={[styles.insightTitle, { color: theme.colors.text }]}>{insight.title}</Text>
        <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>{insight.description}</Text>
      </View>
      <View style={[styles.insightImpact, { backgroundColor: insight.impact === 'high' ? '#EF4444' + '20' : '#F59E0B' + '20' }]}>
        <Text style={[styles.insightImpactText, { color: insight.impact === 'high' ? '#EF4444' : '#F59E0B' }]}>
          {insight.impact}
        </Text>
      </View>
    </View>
  );
}

function HealthIndicator({ health }: { health: any }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.healthItem, { borderBottomColor: theme.colors.border }]}>
      <View style={styles.healthInfo}>
        <Text style={[styles.healthName, { color: theme.colors.text }]}>{health.name}</Text>
        <Text style={[styles.healthLatency, { color: theme.colors.textSecondary }]}>{health.latency}</Text>
      </View>
      <View style={[
        styles.healthStatus,
        { backgroundColor: health.status === 'operational' ? '#10B981' + '20' : '#F59E0B' + '20' }
      ]}>
        <View style={[
          styles.healthStatusDot,
          { backgroundColor: health.status === 'operational' ? '#10B981' : '#F59E0B' }
        ]} />
        <Text style={[
          styles.healthStatusText,
          { color: health.status === 'operational' ? '#10B981' : '#F59E0B' }
        ]}>
          {health.status}
        </Text>
      </View>
    </View>
  );
}

function RevenueAnalyticsCard({ title, data, type }: { title: string, data: any[], type: 'product' | 'region' | 'industry' | 'channel' }) {
  const { theme } = useTheme();
  const maxValue = Math.max(...data.map(item => item.revenue));

  const getLabel = (item: any) => {
    switch (type) {
      case 'product': return item.product;
      case 'region': return item.region;
      case 'industry': return item.industry;
      case 'channel': return item.channel;
      default: return item.name;
    }
  };

  return (
    <View style={[styles.revenueAnalyticsCard, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.revenueAnalyticsTitle, { color: theme.colors.text }]}>{title}</Text>
      <View style={styles.revenueAnalyticsContent}>
        {data.map((item, index) => (
          <View key={index} style={styles.revenueAnalyticsItem}>
            <View style={styles.revenueAnalyticsItemHeader}>
              <Text style={[styles.revenueAnalyticsItemLabel, { color: theme.colors.text }]}>
                {getLabel(item)}
              </Text>
              <View style={styles.revenueAnalyticsItemValues}>
                <Text style={[styles.revenueAnalyticsItemRevenue, { color: theme.colors.text }]}>
                  ${(item.revenue / 1000000).toFixed(1)}M
                </Text>
                {item.growth && (
                  <View style={styles.revenueAnalyticsGrowth}>
                    <TrendingUp size={12} color="#10B981" />
                    <Text style={[styles.revenueAnalyticsGrowthText, { color: '#10B981' }]}>
                      {item.growth}%
                    </Text>
                  </View>
                )}
                {item.percentage && (
                  <Text style={[styles.revenueAnalyticsPercentage, { color: theme.colors.textSecondary }]}>
                    {item.percentage}%
                  </Text>
                )}
              </View>
            </View>
            <View style={[styles.revenueAnalyticsBar, { backgroundColor: theme.colors.background }]}>
              <View 
                style={[
                  styles.revenueAnalyticsBarFill,
                  { 
                    backgroundColor: item.color,
                    width: `${(item.revenue / maxValue) * 100}%`
                  }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function NavItem({ item, isActive }: { item: NavItem, isActive: boolean }) {
  const { theme } = useTheme();
  const Icon = item.icon;

  return (
    <TouchableOpacity style={[styles.navItem, isActive && styles.navItemActive]}>
      <View style={styles.navItemContent}>
        <Icon size={18} color={isActive ? '#10B981' : theme.colors.textSecondary} />
        <Text style={[styles.navItemText, { color: isActive ? '#10B981' : theme.colors.textSecondary }]}>
          {item.label}
        </Text>
      </View>
      {item.badge && (
        <View style={styles.navBadge}>
          <Text style={styles.navBadgeText}>{item.badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function RevenueCommandCenter() {
  const { theme } = useTheme();
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <View style={[styles.container, { backgroundColor: '#0B0F14' }]}>
      {/* Left Sidebar */}
      <View style={[styles.sidebar, { backgroundColor: '#0F141A', borderRightColor: '#1E293B' }]}>
        <View style={styles.sidebarHeader}>
          <Text style={[styles.sidebarTitle, { color: '#FFFFFF' }]}>Revenue Command</Text>
          <Text style={[styles.sidebarSubtitle, { color: '#94A3B8' }]}>Sales & Operations</Text>
        </View>
        
        <ScrollView style={styles.navScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.navSection}>
            {navigationItems.map((item) => (
              <NavItem 
                key={item.id} 
                item={item} 
                isActive={activeNav === item.id}
              />
            ))}
          </View>
        </ScrollView>

        <View style={[styles.sidebarFooter, { borderTopColor: theme.colors.border }]}>
          <View style={styles.sidebarUser}>
            <View style={[styles.sidebarUserAvatar, { backgroundColor: '#10B981' + '20' }]}>
              <Text style={styles.sidebarUserAvatarText}>JD</Text>
            </View>
            <View style={styles.sidebarUserInfo}>
              <Text style={[styles.sidebarUserName, { color: theme.colors.text }]}>John Doe</Text>
              <Text style={[styles.sidebarUserRole, { color: theme.colors.textSecondary }]}>CRO</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Top Executive Bar */}
          <View style={[styles.executiveBar, { backgroundColor: '#0F141A', borderBottomColor: '#1E293B' }]}>
            <View style={styles.executiveBarHeader}>
              <Text style={[styles.executiveBarTitle, { color: '#FFFFFF' }]}>Revenue Command Center</Text>
              <Text style={[styles.executiveBarSubtitle, { color: '#94A3B8' }]}>Real-time sales operations & revenue intelligence</Text>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
              <View style={styles.metricsContainer}>
                {revenueMetrics.slice(0, 6).map((metric) => (
                  <View key={metric.id} style={styles.metricWrapper}>
                    <RevenueMetricCard metric={metric} />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* AI Sales Agent Overview */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Sales Agents</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Autonomous revenue generation team</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
              <View style={styles.agentsContainer}>
                {salesAgents.map((agent) => (
                  <View key={agent.id} style={styles.agentWrapper}>
                    <SalesAgentCard agent={agent} />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Revenue Command Center */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Revenue Command Center</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Real-time revenue performance</Text>
            </View>
            <View style={[styles.revenueCenter, { backgroundColor: theme.colors.card }]}>
              <View style={styles.revenueCenterMain}>
                <Text style={[styles.revenueTodayLabel, { color: theme.colors.textSecondary }]}>Revenue Today</Text>
                <Text style={[styles.revenueTodayValue, { color: '#10B981' }]}>$186,450</Text>
                <View style={styles.revenueTrend}>
                  <TrendingUp size={20} color="#10B981" />
                  <Text style={[styles.revenueTrendText, { color: '#10B981' }]}>+12.4%</Text>
                </View>
              </View>
              <View style={styles.revenueCenterGrid}>
                <View style={styles.revenueCenterItem}>
                  <Text style={[styles.revenueCenterItemLabel, { color: theme.colors.textSecondary }]}>MRR</Text>
                  <Text style={[styles.revenueCenterItemValue, { color: theme.colors.text }]}>$1.8M</Text>
                </View>
                <View style={styles.revenueCenterItem}>
                  <Text style={[styles.revenueCenterItemLabel, { color: theme.colors.textSecondary }]}>ARR</Text>
                  <Text style={[styles.revenueCenterItemValue, { color: theme.colors.text }]}>$21.6M</Text>
                </View>
                <View style={styles.revenueCenterItem}>
                  <Text style={[styles.revenueCenterItemLabel, { color: theme.colors.textSecondary }]}>Pipeline</Text>
                  <Text style={[styles.revenueCenterItemValue, { color: theme.colors.text }]}>$9.4M</Text>
                </View>
                <View style={styles.revenueCenterItem}>
                  <Text style={[styles.revenueCenterItemLabel, { color: theme.colors.textSecondary }]}>Forecast</Text>
                  <Text style={[styles.revenueCenterItemValue, { color: theme.colors.text }]}>$24.3M</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Additional Revenue Metrics */}
          <View style={styles.section}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.additionalMetricsContainer}>
                {revenueMetrics.slice(6).map((metric) => (
                  <View key={metric.id} style={styles.additionalMetricWrapper}>
                    <RevenueMetricCard metric={metric} />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Sales Pipeline Visualization */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sales Pipeline</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Conversion funnel analysis</Text>
            </View>
            <View style={[styles.pipelineContainer, { backgroundColor: theme.colors.card }]}>
              {[
                { stage: 'Visitors', value: 45000, conversion: 100 },
                { stage: 'Leads', value: 12400, conversion: 27.6 },
                { stage: 'MQLs', value: 6200, conversion: 50.0 },
                { stage: 'SQLs', value: 3100, conversion: 50.0 },
                { stage: 'Opportunities', value: 870, conversion: 28.1 },
                { stage: 'Negotiation', value: 450, conversion: 51.7 },
                { stage: 'Closed Won', value: 184, conversion: 40.9 },
              ].map((item, index) => (
                <View key={item.stage} style={styles.pipelineStage}>
                  <View style={styles.pipelineStageHeader}>
                    <Text style={[styles.pipelineStageName, { color: theme.colors.text }]}>{item.stage}</Text>
                    <Text style={[styles.pipelineStageConversion, { color: '#10B981' }]}>{item.conversion}%</Text>
                  </View>
                  <View style={[styles.pipelineBar, { backgroundColor: theme.colors.card }]}>
                    <View style={[
                      styles.pipelineFill,
                      { 
                        width: `${(item.value / 45000) * 100}%`,
                        backgroundColor: `hsl(${120 + (index * 20)}, 70%, 50%)`
                      }
                    ]} />
                  </View>
                  <Text style={[styles.pipelineStageValue, { color: theme.colors.textSecondary }]}>{item.value.toLocaleString()}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Live Deal Tracker */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Deal Tracker</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Active opportunities monitoring</Text>
            </View>
            <View style={[styles.dealTracker, { backgroundColor: theme.colors.card }]}>
              <View style={[styles.dealTrackerHeader, { borderBottomColor: theme.colors.border }]}>
                <Text style={[styles.dealTrackerHeaderText, { color: theme.colors.textSecondary }]}>Company</Text>
                <Text style={[styles.dealTrackerHeaderText, { color: theme.colors.textSecondary }]}>Stage</Text>
                <Text style={[styles.dealTrackerHeaderText, { color: theme.colors.textSecondary }]}>Probability</Text>
                <Text style={[styles.dealTrackerHeaderText, { color: theme.colors.textSecondary }]}>Owner</Text>
                <Text style={[styles.dealTrackerHeaderText, { color: theme.colors.textSecondary }]}>AI Recommendation</Text>
              </View>
              {liveDeals.map((deal) => (
                <DealRow key={deal.id} deal={deal} />
              ))}
            </View>
          </View>

          {/* Lead Intelligence Center */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Lead Intelligence Center</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>AI-qualified lead analysis</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.leadsScroll}>
              <View style={styles.leadsContainer}>
                {leadIntelligence.map((lead) => (
                  <View key={lead.id} style={styles.leadWrapper}>
                    <LeadCard lead={lead} />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Revenue Forecasting Engine */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Revenue Forecasting Engine</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>AI-powered revenue predictions</Text>
            </View>
            <View style={[styles.forecastContainer, { backgroundColor: theme.colors.card }]}>
              <View style={styles.forecastGrid}>
                <View style={styles.forecastItem}>
                  <Text style={[styles.forecastItemLabel, { color: theme.colors.textSecondary }]}>Monthly Forecast</Text>
                  <Text style={[styles.forecastItemValue, { color: theme.colors.text }]}>$186,450</Text>
                </View>
                <View style={styles.forecastItem}>
                  <Text style={[styles.forecastItemLabel, { color: theme.colors.textSecondary }]}>Quarterly Forecast</Text>
                  <Text style={[styles.forecastItemValue, { color: theme.colors.text }]}>$559,350</Text>
                </View>
                <View style={styles.forecastItem}>
                  <Text style={[styles.forecastItemLabel, { color: theme.colors.textSecondary }]}>Annual Forecast</Text>
                  <Text style={[styles.forecastItemValue, { color: theme.colors.text }]}>$6,712,200</Text>
                </View>
              </View>
              <View style={styles.forecastScenarios}>
                <View style={[styles.forecastScenario, { backgroundColor: '#10B981' + '20' }]}>
                  <Text style={[styles.forecastScenarioLabel, { color: theme.colors.textSecondary }]}>Best Case</Text>
                  <Text style={[styles.forecastScenarioValue, { color: '#10B981' }]}>$7.5M</Text>
                </View>
                <View style={[styles.forecastScenario, { backgroundColor: '#3B82F6' + '20' }]}>
                  <Text style={[styles.forecastScenarioLabel, { color: theme.colors.textSecondary }]}>Expected</Text>
                  <Text style={[styles.forecastScenarioValue, { color: '#3B82F6' }]}>$6.7M</Text>
                </View>
                <View style={[styles.forecastScenario, { backgroundColor: '#EF4444' + '20' }]}>
                  <Text style={[styles.forecastScenarioLabel, { color: theme.colors.textSecondary }]}>Worst Case</Text>
                  <Text style={[styles.forecastScenarioValue, { color: '#EF4444' }]}>$5.8M</Text>
                </View>
              </View>
              <View style={styles.forecastAccuracy}>
                <Text style={[styles.forecastAccuracyLabel, { color: theme.colors.textSecondary }]}>Forecast Accuracy</Text>
                <Text style={[styles.forecastAccuracyValue, { color: '#10B981' }]}>94.2%</Text>
              </View>
            </View>
          </View>

          {/* Sales Performance Leaderboard */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sales Performance Leaderboard</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Team rankings & achievements</Text>
            </View>
            <View style={[styles.leaderboard, { backgroundColor: theme.colors.card }]}>
              {[
                { rank: 1, name: 'Mike Brown', role: 'Sales Manager', revenue: '$520K', conversion: '52.1%', quota: '142%' },
                { rank: 2, name: 'John Smith', role: 'Sales Executive', revenue: '$450K', conversion: '48.5%', quota: '125%' },
                { rank: 3, name: 'Sarah Jones', role: 'Account Executive', revenue: '$380K', conversion: '45.2%', quota: '118%' },
                { rank: 4, name: 'Alex Wilson', role: 'Sales Rep', revenue: '$290K', conversion: '42.3%', quota: '105%' },
                { rank: 5, name: 'Emily Davis', role: 'SDR Agent', revenue: '$180K', conversion: '38.7%', quota: '95%' },
              ].map((performer) => (
                <View key={performer.rank} style={[styles.leaderboardItem, { borderBottomColor: theme.colors.border }]}>
                  <View style={[styles.leaderboardRank, { backgroundColor: performer.rank <= 3 ? '#10B981' + '20' : '#6B7280' + '20' }]}>
                    <Text style={[styles.leaderboardRankText, { color: performer.rank <= 3 ? '#10B981' : '#6B7280' }]}>
                      {performer.rank}
                    </Text>
                  </View>
                  <View style={styles.leaderboardInfo}>
                    <Text style={[styles.leaderboardName, { color: theme.colors.text }]}>{performer.name}</Text>
                    <Text style={[styles.leaderboardRole, { color: theme.colors.textSecondary }]}>{performer.role}</Text>
                  </View>
                  <View style={styles.leaderboardMetrics}>
                    <View style={styles.leaderboardMetric}>
                      <Text style={[styles.leaderboardMetricValue, { color: '#10B981' }]}>{performer.revenue}</Text>
                      <Text style={[styles.leaderboardMetricLabel, { color: theme.colors.textSecondary }]}>Revenue</Text>
                    </View>
                    <View style={styles.leaderboardMetric}>
                      <Text style={[styles.leaderboardMetricValue, { color: theme.colors.text }]}>{performer.conversion}</Text>
                      <Text style={[styles.leaderboardMetricLabel, { color: theme.colors.textSecondary }]}>Conv.</Text>
                    </View>
                    <View style={styles.leaderboardMetric}>
                      <Text style={[styles.leaderboardMetricValue, { color: '#10B981' }]}>{performer.quota}</Text>
                      <Text style={[styles.leaderboardMetricLabel, { color: theme.colors.textSecondary }]}>Quota</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Customer Intelligence */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Customer Intelligence</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Account health & expansion opportunities</Text>
            </View>
            <View style={[styles.customerIntelligence, { backgroundColor: theme.colors.card }]}>
              <View style={styles.customerIntelligenceGrid}>
                <View style={styles.customerIntelligenceItem}>
                  <Text style={[styles.customerIntelligenceItemLabel, { color: theme.colors.textSecondary }]}>Expansion Opportunities</Text>
                  <Text style={[styles.customerIntelligenceItemValue, { color: '#10B981' }]}>234</Text>
                </View>
                <View style={styles.customerIntelligenceItem}>
                  <Text style={[styles.customerIntelligenceItemLabel, { color: theme.colors.textSecondary }]}>Renewal Risks</Text>
                  <Text style={[styles.customerIntelligenceItemValue, { color: '#EF4444' }]}>18</Text>
                </View>
                <View style={styles.customerIntelligenceItem}>
                  <Text style={[styles.customerIntelligenceItemLabel, { color: theme.colors.textSecondary }]}>Upsell Potential</Text>
                  <Text style={[styles.customerIntelligenceItemValue, { color: '#10B981' }]}>$620K</Text>
                </View>
                <View style={styles.customerIntelligenceItem}>
                  <Text style={[styles.customerIntelligenceItemLabel, { color: theme.colors.textSecondary }]}>Avg Health Score</Text>
                  <Text style={[styles.customerIntelligenceItemValue, { color: theme.colors.text }]}>87.5%</Text>
                </View>
                <View style={styles.customerIntelligenceItem}>
                  <Text style={[styles.customerIntelligenceItemLabel, { color: theme.colors.textSecondary }]}>Buying Signals</Text>
                  <Text style={[styles.customerIntelligenceItemValue, { color: '#3B82F6' }]}>156</Text>
                </View>
              </View>
            </View>
          </View>

          {/* AI Insights Center */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights Center</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Intelligent recommendations & actions</Text>
            </View>
            <View style={styles.insightsContainer}>
              {aiInsights.map((insight) => (
                <View key={insight.id} style={styles.insightWrapper}>
                  <InsightCard insight={insight} />
                </View>
              ))}
            </View>
          </View>

          {/* Activity Stream */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Stream</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Real-time sales operations feed</Text>
            </View>
            <View style={[styles.activityStream, { backgroundColor: theme.colors.card }]}>
              {activityStream.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </View>
          </View>

          {/* Sales Operations Health */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sales Operations Health</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>System performance monitoring</Text>
            </View>
            <View style={[styles.operationsHealth, { backgroundColor: theme.colors.card }]}>
              {operationsHealth.map((health) => (
                <HealthIndicator key={health.id} health={health} />
              ))}
            </View>
          </View>

          {/* Revenue Analytics */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Revenue Analytics</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Revenue breakdown by dimensions</Text>
            </View>
            <View style={styles.revenueAnalyticsGrid}>
              <RevenueAnalyticsCard title="Revenue by Product" data={revenueByProduct} type="product" />
              <RevenueAnalyticsCard title="Revenue by Region" data={revenueByRegion} type="region" />
              <RevenueAnalyticsCard title="Revenue by Industry" data={revenueByIndustry} type="industry" />
              <RevenueAnalyticsCard title="Revenue by Channel" data={revenueByChannel} type="channel" />
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
  },
  sidebarHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sidebarSubtitle: {
    fontSize: 12,
  },
  navScroll: {
    flex: 1,
  },
  navSection: {
    padding: 12,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  navItemActive: {
    backgroundColor: '#10B981' + '10',
  },
  navItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  navBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  navBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  sidebarFooter: {
    padding: 16,
    borderTopWidth: 1,
  },
  sidebarUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sidebarUserAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarUserAvatarText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sidebarUserInfo: {
    flex: 1,
  },
  sidebarUserName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  sidebarUserRole: {
    fontSize: 12,
  },
  mainContent: {
    flex: 1,
  },
  executiveBar: {
    borderBottomWidth: 1,
    padding: 20,
  },
  executiveBarHeader: {
    marginBottom: 16,
  },
  executiveBarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  executiveBarSubtitle: {
    fontSize: 14,
  },
  metricsScroll: {
    marginBottom: 8,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  metricWrapper: {
    width: 180,
  },
  metricCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricTrend: {
    padding: 4,
    borderRadius: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricSubtitle: {
    fontSize: 10,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  agentsScroll: {
    marginBottom: 8,
  },
  agentsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  agentWrapper: {
    width: 200,
  },
  agentCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  agentAvatar: {
    fontSize: 32,
  },
  agentStatusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#111827',
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
  agentConfidence: {
    alignItems: 'flex-end',
  },
  confidenceScore: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  confidenceLabel: {
    fontSize: 10,
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  agentMetric: {
    alignItems: 'center',
  },
  agentMetricValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentMetricLabel: {
    fontSize: 10,
  },
  agentDetailedMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  detailedMetric: {
    alignItems: 'center',
  },
  detailedMetricValue: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  detailedMetricLabel: {
    fontSize: 10,
  },
  revenueCenter: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  revenueCenterMain: {
    alignItems: 'center',
    marginBottom: 20,
  },
  revenueTodayLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  revenueTodayValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  revenueTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  revenueTrendText: {
    fontSize: 14,
    fontWeight: '600',
  },
  revenueCenterGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  revenueCenterItem: {
    alignItems: 'center',
  },
  revenueCenterItemLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  revenueCenterItemValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  additionalMetricsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  additionalMetricWrapper: {
    width: 160,
  },
  pipelineContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  pipelineStage: {
    marginBottom: 16,
  },
  pipelineStageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pipelineStageName: {
    fontSize: 14,
    fontWeight: '500',
  },
  pipelineStageConversion: {
    fontSize: 12,
    fontWeight: '600',
  },
  pipelineBar: {
    height: 24,
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  pipelineFill: {
    height: '100%',
    borderRadius: 4,
  },
  pipelineStageValue: {
    fontSize: 12,
  },
  dealTracker: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    overflow: 'hidden',
  },
  dealTrackerHeader: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
  },
  dealTrackerHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  dealRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  dealCompany: {
    flex: 2,
  },
  dealCompanyName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  dealValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  dealStage: {
    flex: 1,
  },
  dealStageText: {
    fontSize: 12,
  },
  dealProbability: {
    flex: 1,
  },
  probabilityBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  probabilityFill: {
    height: '100%',
    borderRadius: 3,
  },
  probabilityText: {
    fontSize: 11,
  },
  dealOwner: {
    flex: 1,
  },
  dealOwnerText: {
    fontSize: 12,
  },
  dealStatus: {
    flex: 1,
    padding: 4,
    borderRadius: 4,
  },
  dealStatusText: {
    fontSize: 10,
    fontWeight: '500',
  },
  leadsScroll: {
    marginBottom: 8,
  },
  leadsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  leadWrapper: {
    width: 200,
  },
  leadCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leadCompany: {
    fontSize: 14,
    fontWeight: '600',
  },
  leadScore: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  leadScoreText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  leadDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  leadDetail: {
    flex: 1,
  },
  leadDetailLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  leadDetailValue: {
    fontSize: 11,
    fontWeight: '500',
  },
  leadIntent: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  leadIntentText: {
    fontSize: 10,
    fontWeight: '500',
  },
  leadAIQualification: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  leadAIQualificationLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  leadAIQualificationBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1F2937',
    marginBottom: 4,
    overflow: 'hidden',
  },
  leadAIQualificationFill: {
    height: '100%',
    borderRadius: 2,
  },
  leadAIQualificationValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  forecastContainer: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  forecastGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  forecastItem: {
    alignItems: 'center',
  },
  forecastItemLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  forecastItemValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  forecastScenarios: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  forecastScenario: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  forecastScenarioLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  forecastScenarioValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  forecastAccuracy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  forecastAccuracyLabel: {
    fontSize: 12,
  },
  forecastAccuracyValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  leaderboard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    overflow: 'hidden',
  },
  leaderboardItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  leaderboardRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  leaderboardRankText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  leaderboardRole: {
    fontSize: 12,
  },
  leaderboardMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  leaderboardMetric: {
    alignItems: 'center',
  },
  leaderboardMetricValue: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  leaderboardMetricLabel: {
    fontSize: 10,
  },
  customerIntelligence: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  customerIntelligenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  customerIntelligenceItem: {
    width: '48%',
    marginBottom: 16,
  },
  customerIntelligenceItemLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  customerIntelligenceItemValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  insightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  insightWrapper: {
    width: '48%',
  },
  insightCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1F2937',
    alignItems: 'center',
  },
  insightIcon: {
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  insightDescription: {
    fontSize: 10,
  },
  insightImpact: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  activityStream: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  activityIcon: {
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityEvent: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  activityCompany: {
    fontSize: 11,
    marginBottom: 2,
  },
  activityValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 11,
  },
  operationsHealth: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    overflow: 'hidden',
  },
  healthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  healthInfo: {
    flex: 1,
  },
  healthName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  healthLatency: {
    fontSize: 12,
  },
  healthStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  healthStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  healthStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  revenueAnalyticsGrid: {
    gap: 16,
  },
  revenueAnalyticsCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  revenueAnalyticsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  revenueAnalyticsContent: {
    gap: 12,
  },
  revenueAnalyticsItem: {
    gap: 8,
  },
  revenueAnalyticsItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  revenueAnalyticsItemLabel: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  revenueAnalyticsItemValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  revenueAnalyticsItemRevenue: {
    fontSize: 12,
    fontWeight: '600',
  },
  revenueAnalyticsGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  revenueAnalyticsGrowthText: {
    fontSize: 11,
    fontWeight: '600',
  },
  revenueAnalyticsPercentage: {
    fontSize: 11,
  },
  revenueAnalyticsBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  revenueAnalyticsBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});