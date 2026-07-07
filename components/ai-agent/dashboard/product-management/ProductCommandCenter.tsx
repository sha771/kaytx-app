import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
} from 'lucide-react-native';

// Types
interface ProductAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  productImpactScore: number;
  metrics: {
    sessionsAnalyzed?: number;
    insightsGenerated?: number;
    retentionImprovements?: number;
    experimentsRunning?: number;
    winningVariants?: number;
    conversionLift?: string;
    feedbackProcessed?: number;
    sentimentAccuracy?: number;
    featureRequestsClustered?: number;
  };
  activeInsights: number;
  trend: 'up' | 'down' | 'stable';
}

interface ProductKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
}

interface RoadmapItem {
  id: string;
  name: string;
  timeframe: 'Now' | 'Next' | 'Later';
  status: string;
  progress: number;
  priority: string;
  impact: string;
  team: string;
}

interface FeatureRequest {
  id: string;
  name: string;
  status: 'planned' | 'in-progress' | 'shipped' | 'backlog';
  votes: number;
  revenueImpact: string;
  engineeringEffort: string;
  strategicAlignment: number;
}

interface Experiment {
  id: string;
  name: string;
  variantA: string;
  variantB: string;
  conversionA: string;
  conversionB: string;
  confidence: number;
  roi: string;
  status: 'running' | 'completed' | 'paused';
}

interface FeedbackItem {
  id: string;
  user: string;
  category: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'resolved';
}

interface GrowthMetric {
  id: string;
  metric: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

interface Release {
  id: string;
  version: string;
  status: 'planned' | 'deployed' | 'rolled-back';
  features: string;
  impact: string;
  deploymentDate: string;
}

interface ProductInsight {
  id: string;
  insight: string;
  category: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
}

interface ProductActivity {
  id: string;
  event: string;
  type: 'activation' | 'feature-use' | 'experiment' | 'feedback' | 'bug' | 'release' | 'insight';
  timestamp: string;
  user?: string;
}

interface ProductSystemHealth {
  id: string;
  system: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

const ProductCommandCenter = () => {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Product Agents', icon: Bot },
    { id: 'roadmap', label: 'Roadmap', icon: Route },
    { id: 'analytics', label: 'Product Analytics', icon: BarChart3 },
    { id: 'feedback', label: 'User Feedback', icon: MessageSquare },
    { id: 'features', label: 'Feature Requests', icon: Lightbulb },
    { id: 'experiments', label: 'Experimentation', icon: Beaker },
    { id: 'discovery', label: 'Product Discovery', icon: Sparkles },
    { id: 'releases', label: 'Releases', icon: Rocket },
    { id: 'segments', label: 'User Segments', icon: Users },
    { id: 'insights', label: 'Insights', icon: Brain },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Product KPIs
  const productKPIs: ProductKPI[] = [
    { id: '1', title: 'Active Users (DAU/MAU)', value: '8.4M', change: '+12.3%', trend: 'up', color: '#06B6D4', subtitle: 'Daily/Monthly Active' },
    { id: '2', title: 'Engagement Score', value: '89', change: '+4.2%', trend: 'up', color: '#10B981', subtitle: 'Product engagement' },
    { id: '3', title: 'Retention Rate', value: '74%', change: '+3.1%', trend: 'up', color: '#8B5CF6', subtitle: 'D1/D7/D30' },
    { id: '4', title: 'Feature Adoption', value: '63%', change: '+5.4%', trend: 'up', color: '#F59E0B', subtitle: 'Feature usage' },
    { id: '5', title: 'Churn Rate', value: '2.1%', change: '-0.8%', trend: 'down', color: '#EF4444', subtitle: 'Monthly churn' },
    { id: '6', title: 'Product-Market Fit', value: '72', change: '+2.3%', trend: 'up', color: '#06B6D4', subtitle: 'PMF Score' },
    { id: '7', title: 'NPS Score', value: '68', change: '+4.5%', trend: 'up', color: '#10B981', subtitle: 'Net Promoter' },
    { id: '8', title: 'Experiment Success', value: '62%', change: '+8.2%', trend: 'up', color: '#8B5CF6', subtitle: 'Win rate' },
    { id: '9', title: 'Time to Value', value: '4.2d', change: '-1.2d', trend: 'down', color: '#F59E0B', subtitle: 'TTV' },
    { id: '10', title: 'Revenue per User', value: '$142', change: '+6.8%', trend: 'up', color: '#EC4899', subtitle: 'ARPU' },
  ];

  // AI Product Agents
  const productAgents: ProductAgent[] = [
    {
      id: '1',
      name: 'Agent Atlas',
      specialty: 'Product Analytics Agent',
      avatar: '🔍',
      status: 'active',
      confidenceScore: 97,
      productImpactScore: 92,
      metrics: {
        sessionsAnalyzed: 4200000,
        insightsGenerated: 18420,
        retentionImprovements: 42,
      },
      activeInsights: 156,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Agent Nova',
      specialty: 'Experimentation Agent',
      avatar: '🧪',
      status: 'active',
      confidenceScore: 94,
      productImpactScore: 88,
      metrics: {
        experimentsRunning: 128,
        winningVariants: 62,
        conversionLift: '+14%',
      },
      activeInsights: 89,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Agent Pulse',
      specialty: 'User Feedback Agent',
      avatar: '💬',
      status: 'active',
      confidenceScore: 96,
      productImpactScore: 85,
      metrics: {
        feedbackProcessed: 84200,
        sentimentAccuracy: 96,
        featureRequestsClustered: 312,
      },
      activeInsights: 234,
      trend: 'stable',
    },
  ];

  // Roadmap Items
  const roadmapItems: RoadmapItem[] = [
    { id: '1', name: 'AI-Powered Analytics Dashboard', timeframe: 'Now', status: 'In Progress', progress: 78, priority: 'High', impact: 'High', team: 'Core' },
    { id: '2', name: 'Real-time Collaboration Tools', timeframe: 'Now', status: 'In Progress', progress: 65, priority: 'High', impact: 'High', team: 'Growth' },
    { id: '3', name: 'Advanced Reporting Engine', timeframe: 'Next', status: 'Planned', progress: 30, priority: 'Medium', impact: 'Medium', team: 'Core' },
    { id: '4', name: 'API Integration Hub', timeframe: 'Next', status: 'Planned', progress: 15, priority: 'Medium', impact: 'High', team: 'Platform' },
    { id: '5', name: 'Mobile App Redesign', timeframe: 'Later', status: 'Backlog', progress: 0, priority: 'Low', impact: 'Medium', team: 'Mobile' },
  ];

  // Feature Requests
  const featureRequests: FeatureRequest[] = [
    { id: '1', name: 'Custom Dashboard Builder', status: 'in-progress', votes: 1247, revenueImpact: 'High', engineeringEffort: 'Medium', strategicAlignment: 92 },
    { id: '2', name: 'Advanced Export Options', status: 'planned', votes: 892, revenueImpact: 'Medium', engineeringEffort: 'Low', strategicAlignment: 78 },
    { id: '3', name: 'Real-time Notifications', status: 'shipped', votes: 654, revenueImpact: 'High', engineeringEffort: 'High', strategicAlignment: 88 },
    { id: '4', name: 'Integration with Slack', status: 'planned', votes: 421, revenueImpact: 'Medium', engineeringEffort: 'Medium', strategicAlignment: 72 },
  ];

  // Experiments
  const experiments: Experiment[] = [
    { id: '1', name: 'Onboarding Flow Optimization', variantA: 'Current', variantB: 'Simplified', conversionA: '42%', conversionB: '48%', confidence: 98, roi: '+14%', status: 'completed' },
    { id: '2', name: 'Pricing Page Redesign', variantA: 'Original', variantB: 'New Design', conversionA: '18%', conversionB: '22%', confidence: 95, roi: '+22%', status: 'running' },
    { id: '3', name: 'Feature Discovery Tooltip', variantA: 'None', variantB: 'Guided Tour', conversionA: '35%', conversionB: '41%', confidence: 92, roi: '+17%', status: 'running' },
  ];

  // Feedback Items
  const feedbackItems: FeedbackItem[] = [
    { id: '1', user: 'John D.', category: 'Feature Request', sentiment: 'positive', priority: 'high', status: 'open' },
    { id: '2', user: 'Sarah M.', category: 'Bug Report', sentiment: 'negative', priority: 'high', status: 'in-progress' },
    { id: '3', user: 'Mike R.', category: 'UX Feedback', sentiment: 'neutral', priority: 'medium', status: 'resolved' },
  ];

  // Growth Metrics
  const growthMetrics: GrowthMetric[] = [
    { id: '1', metric: 'Activation Rate', value: '68%', change: '+5.2%', trend: 'up' },
    { id: '2', metric: 'Viral Coefficient', value: '1.4', change: '+0.3', trend: 'up' },
    { id: '3', metric: 'Growth Rate', value: '12%', change: '+2.1%', trend: 'up' },
  ];

  // Releases
  const releases: Release[] = [
    { id: '1', version: 'v2.4.0', status: 'deployed', features: 'AI Analytics, Custom Dashboards', impact: 'High', deploymentDate: '2024-01-15' },
    { id: '2', version: 'v2.3.5', status: 'deployed', features: 'Bug Fixes, Performance', impact: 'Medium', deploymentDate: '2024-01-08' },
    { id: '3', version: 'v2.4.1', status: 'planned', features: 'New Export Options', impact: 'Medium', deploymentDate: '2024-01-22' },
  ];

  // Product Insights
  const productInsights: ProductInsight[] = [
    { id: '1', insight: 'Onboarding drop-off at step 2 causing 18% loss in activation.', category: 'Retention', confidence: 94, impact: 'high', timestamp: '2h ago' },
    { id: '2', insight: 'Feature X drives 32% of retention improvement.', category: 'Analytics', confidence: 89, impact: 'high', timestamp: '4h ago' },
    { id: '3', insight: 'Users in SMB segment show highest upgrade intent.', category: 'Growth', confidence: 87, impact: 'medium', timestamp: '6h ago' },
  ];

  // Product Activities
  const productActivities: ProductActivity[] = [
    { id: '1', event: 'New user activated', type: 'activation', timestamp: '2m ago' },
    { id: '2', event: 'Feature "Analytics Dashboard" used', type: 'feature-use', timestamp: '5m ago' },
    { id: '3', event: 'Experiment #42 started', type: 'experiment', timestamp: '12m ago' },
    { id: '4', event: 'Feedback submitted', type: 'feedback', timestamp: '18m ago' },
    { id: '5', event: 'Bug detected in checkout', type: 'bug', timestamp: '25m ago' },
    { id: '6', event: 'Release v2.4.0 deployed', type: 'release', timestamp: '1h ago' },
  ];

  // Product System Health
  const productSystemHealth: ProductSystemHealth[] = [
    { id: '1', system: 'Analytics Pipeline', status: 'healthy', uptime: '99.9%', latency: '45ms' },
    { id: '2', system: 'Event Tracking', status: 'healthy', uptime: '99.8%', latency: '32ms' },
    { id: '3', system: 'Experimentation Platform', status: 'healthy', uptime: '99.7%', latency: '58ms' },
    { id: '4', system: 'Feature Flag System', status: 'healthy', uptime: '99.9%', latency: '12ms' },
  ];

  // Render Functions
  const renderKPICard = (kpi: ProductKPI) => (
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

  const renderAgentCard = (agent: ProductAgent) => (
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
          <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.productImpactScore}</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
        </View>
      </View>
      <View style={styles.agentInsights}>
        <Text style={[styles.agentInsightsCount, { color: '#8B5CF6' }]}>{agent.activeInsights}</Text>
        <Text style={[styles.agentInsightsLabel, { color: theme.colors.textSecondary }]}>Insights</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#0B0F14' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <LayoutDashboard size={32} color="#06B6D4" />
            <View style={styles.headerTitle}>
              <Text style={[styles.headerTitleText, { color: '#FFFFFF' }]}>AI Product Intelligence Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Autonomous Product Operations & Strategic Decision-Making</Text>
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
        <View style={[styles.sidebar, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderRightColor: 'rgba(255,255,255,0.1)' }]}>
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
        
        {/* Top Product Bar - Prominent KPI Display */}
        <View style={[styles.topProductBar, { backgroundColor: 'rgba(6, 182, 212, 0.08)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <View style={styles.topBarHeader}>
            <View style={styles.topBarTitle}>
              <TrendingUp size={20} color="#06B6D4" />
              <Text style={[styles.topBarTitleText, { color: '#FFFFFF' }]}>Product Performance Overview</Text>
            </View>
            <Text style={[styles.topBarPeriod, { color: 'rgba(255,255,255,0.6)' }]}>Last 24 hours</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topBarScroll}>
            <View style={styles.topBarKPIs}>
              {productKPIs.slice(0, 5).map((kpi) => (
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

        {/* Product KPIs */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Product KPIs</Text>
          <View style={styles.kpiGrid}>
            {productKPIs.map(renderKPICard)}
          </View>
        </View>

        {/* AI Product Agents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Product Agents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {productAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* Product Command Center - Large Centerpiece */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Product Command Center</Text>
          <View style={[styles.commandCenter, { backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)' }] }>
            
            {/* Command Center Header */}
            <View style={styles.commandCenterHeader}>
              <View style={styles.commandCenterTitle}>
                <Brain size={24} color="#06B6D4" />
                <View>
                  <Text style={[styles.commandCenterTitleText, { color: '#FFFFFF' }]}>Product Intelligence Hub</Text>
                  <Text style={[styles.commandCenterSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Real-time product performance monitoring</Text>
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
                  <TrendingUp size={20} color="#06B6D4" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Active Users</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#06B6D4' }]}>8.4M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+12.3%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>DAU/MAU</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Activity size={20} color="#10B981" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Retention Rate</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>74%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+3.1%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>D1/D7/D30</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Target size={20} color="#8B5CF6" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Engagement Score</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#8B5CF6' }]}>89</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+4.2%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>User engagement</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <AlertCircle size={20} color="#F59E0B" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Feature Adoption</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#F59E0B' }]}>63%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+5.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Feature usage</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(236, 72, 153, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Zap size={20} color="#EC4899" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Revenue Impact</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#EC4899' }]}>$14.2M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+8.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Monthly impact</Text>
                </View>
              </View>
            </View>

            {/* Product Health Overview */}
            <View style={styles.commandCenterHealth}>
              <View style={styles.healthOverview}>
                <Text style={[styles.healthOverviewTitle, { color: '#FFFFFF' }]}>Product Health Score</Text>
                <View style={styles.healthScoreContainer}>
                  <Text style={[styles.healthScore, { color: '#10B981' }]}>89%</Text>
                  <View style={styles.healthScoreIndicator}>
                    <View style={[styles.healthScoreBar, { width: '89%', backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <Text style={[styles.healthScoreDescription, { color: 'rgba(255,255,255,0.6)' }]}>Excellent - All product systems optimal</Text>
              </View>

              <View style={styles.healthBreakdown}>
                <Text style={[styles.healthBreakdownTitle, { color: '#FFFFFF' }]}>Health Breakdown</Text>
                <View style={styles.healthBreakdownItems}>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#06B6D4' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>User Engagement</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#06B6D4' }]}>92%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Feature Adoption</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#10B981' }]}>88%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Retention</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#8B5CF6' }]}>87%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Satisfaction</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#F59E0B' }]}>89%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Growth Trend Visualization */}
            <View style={styles.growthTrendSection}>
              <View style={styles.growthTrendHeader}>
                <LineChart size={16} color="#06B6D4" />
                <Text style={[styles.growthTrendTitle, { color: '#FFFFFF' }]}>Growth Trend Analytics</Text>
              </View>
              <View style={styles.growthTrendVisualization}>
                <View style={styles.growthTrendBars}>
                  {[
                    { month: 'Jan', value: 65 },
                    { month: 'Feb', value: 72 },
                    { month: 'Mar', value: 78 },
                    { month: 'Apr', value: 74 },
                    { month: 'May', value: 82 },
                    { month: 'Jun', value: 89 },
                  ].map((data, index) => (
                    <View key={index} style={styles.growthTrendBar}>
                      <View style={[
                        styles.growthTrendBarFill,
                        { 
                          height: `${data.value}%`,
                          backgroundColor: data.value >= 80 ? '#10B981' : data.value >= 70 ? '#06B6D4' : '#F59E0B'
                        }
                      ]} />
                      <Text style={[styles.growthTrendLabel, { color: 'rgba(255,255,255,0.6)' }]}>{data.month}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Revenue Attribution */}
            <View style={styles.revenueAttribution}>
              <View style={styles.revenueAttributionHeader}>
                <PieChart size={16} color="#EC4899" />
                <Text style={[styles.revenueAttributionTitle, { color: '#FFFFFF' }]}>Revenue Attribution by Feature</Text>
              </View>
              <View style={styles.revenueAttributionList}>
                {[
                  { feature: 'Analytics Dashboard', value: '$4.2M', percentage: 35, color: '#06B6D4' },
                  { feature: 'Collaboration Tools', value: '$3.1M', percentage: 25, color: '#10B981' },
                  { feature: 'Reporting Engine', value: '$1.8M', percentage: 15, color: '#8B5CF6' },
                  { feature: 'API Integration', value: '$1.8M', percentage: 15, color: '#F59E0B' },
                  { feature: 'Other Features', value: '$1.3M', percentage: 10, color: '#EC4899' },
                ].map((item, index) => (
                  <View key={index} style={styles.revenueAttributionItem}>
                    <View style={styles.revenueAttributionInfo}>
                      <View style={[styles.revenueAttributionDot, { backgroundColor: item.color }]} />
                      <Text style={[styles.revenueAttributionFeature, { color: 'rgba(255,255,255,0.8)' }]}>{item.feature}</Text>
                    </View>
                    <View style={styles.revenueAttributionMetrics}>
                      <Text style={[styles.revenueAttributionRevenue, { color: '#FFFFFF' }]}>{item.value}</Text>
                      <View style={[
                        styles.revenueAttributionBar,
                        { width: `${item.percentage}%`, backgroundColor: item.color }
                      ]} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Product Roadmap Intelligence */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Product Roadmap Intelligence</Text>
          <View style={[styles.roadmapContainer, { backgroundColor: theme.colors.card }]}>
            {roadmapItems.map((item) => (
              <View key={item.id} style={styles.roadmapItem}>
                <View style={styles.roadmapHeader}>
                  <Text style={[styles.roadmapName, { color: theme.colors.text }]}>{item.name}</Text>
                  <View style={[styles.roadmapTimeframe, { backgroundColor: item.timeframe === 'Now' ? '#06B6D4' + '20' : item.timeframe === 'Next' ? '#8B5CF6' + '20' : '#6B7280' + '20' }]}>
                    <Text style={[styles.roadmapTimeframeText, { color: item.timeframe === 'Now' ? '#06B6D4' : item.timeframe === 'Next' ? '#8B5CF6' : '#6B7280' }]}>{item.timeframe}</Text>
                  </View>
                </View>
                <View style={styles.roadmapProgress}>
                  <Text style={[styles.roadmapProgressText, { color: theme.colors.text }]}>{item.status}</Text>
                  <Text style={[styles.roadmapProgressText, { color: '#8B5CF6' }]}>{item.progress}%</Text>
                </View>
                <View style={styles.roadmapMetrics}>
                  <View style={styles.roadmapMetric}>
                    <Text style={[styles.roadmapMetricValue, { color: theme.colors.text }]}>{item.priority}</Text>
                    <Text style={[styles.roadmapMetricLabel, { color: theme.colors.textSecondary }]}>Priority</Text>
                  </View>
                  <View style={styles.roadmapMetric}>
                    <Text style={[styles.roadmapMetricValue, { color: theme.colors.text }]}>{item.impact}</Text>
                    <Text style={[styles.roadmapMetricLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
                  </View>
                  <View style={styles.roadmapMetric}>
                    <Text style={[styles.roadmapMetricValue, { color: theme.colors.text }]}>{item.team}</Text>
                    <Text style={[styles.roadmapMetricLabel, { color: theme.colors.textSecondary }]}>Team</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Feature Prioritization Engine */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Feature Prioritization Engine</Text>
          <View style={[styles.featuresContainer, { backgroundColor: theme.colors.card }]}>
            {featureRequests.map((feature) => (
              <View key={feature.id} style={styles.featureItem}>
                <View style={styles.featureHeader}>
                  <Text style={[styles.featureTitle, { color: theme.colors.text }]}>{feature.name}</Text>
                  <View style={[styles.featureStatus, { backgroundColor: feature.status === 'planned' ? '#06B6D4' + '20' : feature.status === 'in-progress' ? '#8B5CF6' + '20' : feature.status === 'shipped' ? '#10B981' + '20' : '#6B7280' + '20' }]}>
                    <Text style={[styles.featureStatusText, { color: feature.status === 'planned' ? '#06B6D4' : feature.status === 'in-progress' ? '#8B5CF6' : feature.status === 'shipped' ? '#10B981' : '#6B7280' }]}>{feature.status}</Text>
                  </View>
                </View>
                <View style={styles.featureMetrics}>
                  <View style={styles.featureMetric}>
                    <Text style={[styles.featureMetricValue, { color: '#06B6D4' }]}>{feature.votes}</Text>
                    <Text style={[styles.featureMetricLabel, { color: theme.colors.textSecondary }]}>Votes</Text>
                  </View>
                  <View style={styles.featureMetric}>
                    <Text style={[styles.featureMetricValue, { color: theme.colors.text }]}>{feature.revenueImpact}</Text>
                    <Text style={[styles.featureMetricLabel, { color: theme.colors.textSecondary }]}>Revenue</Text>
                  </View>
                  <View style={styles.featureMetric}>
                    <Text style={[styles.featureMetricValue, { color: theme.colors.text }]}>{feature.engineeringEffort}</Text>
                    <Text style={[styles.featureMetricLabel, { color: theme.colors.textSecondary }]}>Effort</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Experimentation & A/B Testing Lab */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Experimentation & A/B Testing Lab</Text>
          <View style={[styles.experimentsContainer, { backgroundColor: theme.colors.card }]}>
            {experiments.map((experiment) => (
              <View key={experiment.id} style={styles.experimentItem}>
                <View style={styles.experimentHeader}>
                  <Text style={[styles.experimentName, { color: theme.colors.text }]}>{experiment.name}</Text>
                  <View style={[styles.experimentStatus, { backgroundColor: experiment.status === 'running' ? '#10B981' + '20' : experiment.status === 'completed' ? '#06B6D4' + '20' : '#6B7280' + '20' }]}>
                    <Text style={[styles.experimentStatusText, { color: experiment.status === 'running' ? '#10B981' : experiment.status === 'completed' ? '#06B6D4' : '#6B7280' }]}>{experiment.status}</Text>
                  </View>
                </View>
                <View style={styles.experimentVariants}>
                  <View style={styles.experimentVariant}>
                    <Text style={[styles.experimentVariantLabel, { color: theme.colors.textSecondary }]}>Variant A</Text>
                    <Text style={[styles.experimentVariantValue, { color: theme.colors.text }]}>{experiment.variantA}</Text>
                    <Text style={[styles.experimentVariantConversion, { color: '#6B7280' }]}>{experiment.conversionA}</Text>
                  </View>
                  <View style={styles.experimentVariant}>
                    <Text style={[styles.experimentVariantLabel, { color: theme.colors.textSecondary }]}>Variant B</Text>
                    <Text style={[styles.experimentVariantValue, { color: theme.colors.text }]}>{experiment.variantB}</Text>
                    <Text style={[styles.experimentVariantConversion, { color: '#10B981' }]}>{experiment.conversionB}</Text>
                  </View>
                </View>
                <View style={styles.experimentResults}>
                  <View style={styles.experimentResult}>
                    <Text style={[styles.experimentResultLabel, { color: theme.colors.textSecondary }]}>Confidence</Text>
                    <Text style={[styles.experimentResultValue, { color: '#8B5CF6' }]}>{experiment.confidence}%</Text>
                  </View>
                  <View style={styles.experimentResult}>
                    <Text style={[styles.experimentResultLabel, { color: theme.colors.textSecondary }]}>ROI</Text>
                    <Text style={[styles.experimentResultValue, { color: '#10B981' }]}>{experiment.roi}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* User Feedback Intelligence Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>User Feedback Intelligence Center</Text>
          <View style={[styles.feedbackContainer, { backgroundColor: theme.colors.card }]}>
            {feedbackItems.map((feedback) => (
              <View key={feedback.id} style={styles.feedbackItem}>
                <View style={styles.feedbackHeader}>
                  <Text style={[styles.feedbackUser, { color: theme.colors.text }]}>{feedback.user}</Text>
                  <View style={[styles.feedbackCategory, { backgroundColor: '#06B6D4' + '20' }]}>
                    <Text style={[styles.feedbackCategoryText, { color: '#06B6D4' }]}>{feedback.category}</Text>
                  </View>
                </View>
                <View style={styles.feedbackSentiment}>
                  <View style={[
                    styles.feedbackSentimentDot,
                    { backgroundColor: feedback.sentiment === 'positive' ? '#10B981' : feedback.sentiment === 'negative' ? '#EF4444' : '#F59E0B' }
                  ]} />
                  <Text style={[styles.feedbackSentimentText, { color: theme.colors.text }]}>{feedback.sentiment}</Text>
                </View>
                <View style={styles.feedbackStatus}>
                  <Text style={[styles.feedbackStatusText, { color: theme.colors.textSecondary }]}>Priority: {feedback.priority}</Text>
                  <Text style={[styles.feedbackStatusText, { color: theme.colors.textSecondary }]}>Status: {feedback.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Product Growth Analytics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Product Growth Analytics</Text>
          <View style={[styles.growthContainer, { backgroundColor: theme.colors.card }]}>
            {growthMetrics.map((metric) => (
              <View key={metric.id} style={styles.growthItem}>
                <Text style={[styles.growthMetric, { color: theme.colors.text }]}>{metric.metric}</Text>
                <Text style={[styles.growthValue, { color: '#06B6D4' }]}>{metric.value}</Text>
                <View style={styles.growthTrend}>
                  {metric.trend === 'up' ? <TrendingUp size={14} color="#10B981" /> : <TrendingDown size={14} color="#EF4444" />}
                  <Text style={[styles.growthChange, { color: metric.trend === 'up' ? '#10B981' : '#EF4444' }]}>{metric.change}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Release Management Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Release Management Center</Text>
          <View style={[styles.releasesContainer, { backgroundColor: theme.colors.card }]}>
            {releases.map((release) => (
              <View key={release.id} style={styles.releaseItem}>
                <View style={styles.releaseHeader}>
                  <Text style={[styles.releaseVersion, { color: theme.colors.text }]}>{release.version}</Text>
                  <View style={[styles.releaseStatus, { backgroundColor: release.status === 'deployed' ? '#10B981' + '20' : release.status === 'planned' ? '#06B6D4' + '20' : '#EF4444' + '20' }]}>
                    <Text style={[styles.releaseStatusText, { color: release.status === 'deployed' ? '#10B981' : release.status === 'planned' ? '#06B6D4' : '#EF4444' }]}>{release.status}</Text>
                  </View>
                </View>
                <Text style={[styles.releaseFeatures, { color: theme.colors.textSecondary }]}>{release.features}</Text>
                <View style={styles.releaseMeta}>
                  <Text style={[styles.releaseImpact, { color: theme.colors.text }]}>{release.impact}</Text>
                  <Text style={[styles.releaseDate, { color: theme.colors.textSecondary }]}>{release.deploymentDate}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Product Insights Engine */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Product Insights Engine</Text>
          <View style={[styles.insightsContainer, { backgroundColor: theme.colors.card }]}>
            {productInsights.map((insight) => (
              <View key={insight.id} style={styles.insightItem}>
                <View style={styles.insightHeader}>
                  <Brain size={16} color="#8B5CF6" />
                  <View style={[styles.insightCategory, { backgroundColor: '#8B5CF6' + '20' }]}>
                    <Text style={[styles.insightCategoryText, { color: '#8B5CF6' }]}>{insight.category}</Text>
                  </View>
                </View>
                <Text style={[styles.insightText, { color: theme.colors.text }]}>{insight.insight}</Text>
                <View style={styles.insightMeta}>
                  <View style={styles.insightConfidence}>
                    <Text style={[styles.insightConfidenceLabel, { color: theme.colors.textSecondary }]}>Confidence</Text>
                    <Text style={[styles.insightConfidenceValue, { color: '#8B5CF6' }]}>{insight.confidence}%</Text>
                  </View>
                  <View style={styles.insightImpact}>
                    <Text style={[styles.insightImpactLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
                    <Text style={[styles.insightImpactValue, { color: insight.impact === 'high' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#10B981' }]}>{insight.impact}</Text>
                  </View>
                  <Text style={[styles.insightTimestamp, { color: theme.colors.textSecondary }]}>{insight.timestamp}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Real-time Product Activity Stream */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-time Product Activity Stream</Text>
          <View style={[styles.activityContainer, { backgroundColor: theme.colors.card }]}>
            {productActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[
                  styles.activityDot,
                  { backgroundColor: activity.type === 'activation' ? '#10B981' : activity.type === 'feature-use' ? '#06B6D4' : activity.type === 'experiment' ? '#8B5CF6' : activity.type === 'feedback' ? '#F59E0B' : activity.type === 'bug' ? '#EF4444' : '#EC4899' }
                ]} />
                <Text style={[styles.activityEvent, { color: theme.colors.text }]}>{activity.event}</Text>
                <Text style={[styles.activityTimestamp, { color: theme.colors.textSecondary }]}>{activity.timestamp}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Product System Health */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Product System Health</Text>
          <View style={[styles.systemHealthContainer, { backgroundColor: theme.colors.card }]}>
            {productSystemHealth.map((system) => (
              <View key={system.id} style={styles.systemHealthItem}>
                <Text style={[styles.systemHealthName, { color: theme.colors.text }]}>{system.system}</Text>
                <View style={[
                  styles.systemHealthStatus,
                  { backgroundColor: system.status === 'healthy' ? '#10B981' + '20' : system.status === 'degraded' ? '#F59E0B' + '20' : '#EF4444' + '20' }
                ]}>
                  <Text style={[styles.systemHealthStatusText, { color: system.status === 'healthy' ? '#10B981' : system.status === 'degraded' ? '#F59E0B' : '#EF4444' }]}>{system.status}</Text>
                </View>
                <View style={styles.systemHealthMetrics}>
                  <Text style={[styles.systemHealthMetric, { color: theme.colors.textSecondary }]}>Uptime: {system.uptime}</Text>
                  <Text style={[styles.systemHealthMetric, { color: theme.colors.textSecondary }]}>Latency: {system.latency}</Text>
                </View>
              </View>
            ))}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    gap: 2,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
  },
  headerActions: {
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
  mainContent: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: 240,
    borderRightWidth: 1,
    paddingVertical: 16,
  },
  sidebarToggle: {
    padding: 8,
    alignSelf: 'flex-end',
  },
  sidebarContent: {
    gap: 4,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sidebarItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  topProductBar: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  topBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  topBarTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topBarTitleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  topBarPeriod: {
    fontSize: 12,
  },
  topBarScroll: {
    marginBottom: 8,
  },
  topBarKPIs: {
    flexDirection: 'row',
    gap: 12,
  },
  topBarKPI: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    minWidth: 140,
  },
  topBarKPITitle: {
    fontSize: 11,
    marginBottom: 4,
  },
  topBarKPIValue: {
    fontSize: 18,
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
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  topBarKPITrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  topBarKPISubtitle: {
    fontSize: 10,
  },
  section: {
    marginBottom: 32,
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
    flex: 1,
    minWidth: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  kpiTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  kpiTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 24,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 280,
  },
  agentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  agentAvatarText: {
    fontSize: 24,
  },
  agentStatusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0B0F14',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentSpecialty: {
    fontSize: 12,
  },
  agentMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  agentMetric: {
    alignItems: 'center',
  },
  agentMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  agentMetricLabel: {
    fontSize: 10,
  },
  agentInsights: {
    alignItems: 'center',
  },
  agentInsightsCount: {
    fontSize: 16,
    fontWeight: '700',
  },
  agentInsightsLabel: {
    fontSize: 10,
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
  },
  commandCenterSubtitle: {
    fontSize: 12,
  },
  commandCenterActions: {
    flexDirection: 'row',
    gap: 8,
  },
  commandCenterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
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
    minWidth: 140,
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
  },
  commandMetricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  commandMetricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commandMetricTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  commandMetricPeriod: {
    fontSize: 10,
  },
  commandCenterHealth: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  healthOverview: {
    flex: 1,
  },
  healthOverviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  healthScoreContainer: {
    marginBottom: 8,
  },
  healthScore: {
    fontSize: 32,
    fontWeight: '700',
  },
  healthScoreIndicator: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginTop: 8,
  },
  healthScoreBar: {
    height: '100%',
    borderRadius: 3,
  },
  healthScoreDescription: {
    fontSize: 12,
  },
  healthBreakdown: {
    flex: 1,
  },
  healthBreakdownTitle: {
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 12,
    fontWeight: '600',
  },
  growthTrendSection: {
    marginBottom: 20,
  },
  growthTrendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  growthTrendTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  growthTrendVisualization: {
    height: 120,
  },
  growthTrendBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    paddingHorizontal: 8,
  },
  growthTrendBar: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  growthTrendBarFill: {
    width: '100%',
    borderRadius: 4,
    minHeight: 20,
  },
  growthTrendLabel: {
    fontSize: 11,
    marginTop: 8,
  },
  revenueAttribution: {
    marginBottom: 8,
  },
  revenueAttributionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  revenueAttributionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  revenueAttributionList: {
    gap: 8,
  },
  revenueAttributionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  revenueAttributionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  revenueAttributionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  revenueAttributionFeature: {
    fontSize: 12,
  },
  revenueAttributionMetrics: {
    alignItems: 'flex-end',
    width: 120,
  },
  revenueAttributionRevenue: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  revenueAttributionBar: {
    height: 4,
    borderRadius: 2,
  },
  roadmapContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  roadmapItem: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  roadmapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  roadmapName: {
    fontSize: 14,
    fontWeight: '600',
  },
  roadmapTimeframe: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  roadmapTimeframeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  roadmapProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  roadmapProgressText: {
    fontSize: 12,
  },
  roadmapMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  roadmapMetric: {
    alignItems: 'center',
  },
  roadmapMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  roadmapMetricLabel: {
    fontSize: 10,
  },
  featuresContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  featureItem: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  featureStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featureStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  featureMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  featureMetric: {
    alignItems: 'center',
  },
  featureMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  featureMetricLabel: {
    fontSize: 10,
  },
  experimentsContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  experimentItem: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  experimentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  experimentName: {
    fontSize: 14,
    fontWeight: '600',
  },
  experimentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  experimentStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  experimentVariants: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  experimentVariant: {
    flex: 1,
  },
  experimentVariantLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  experimentVariantValue: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  experimentVariantConversion: {
    fontSize: 12,
    fontWeight: '600',
  },
  experimentResults: {
    flexDirection: 'row',
    gap: 16,
  },
  experimentResult: {
    alignItems: 'center',
  },
  experimentResultLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  experimentResultValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  feedbackContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  feedbackItem: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  feedbackUser: {
    fontSize: 14,
    fontWeight: '600',
  },
  feedbackCategory: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  feedbackCategoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  feedbackSentiment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  feedbackSentimentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  feedbackSentimentText: {
    fontSize: 12,
  },
  feedbackStatus: {
    flexDirection: 'row',
    gap: 12,
  },
  feedbackStatusText: {
    fontSize: 11,
  },
  growthContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  growthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
  },
  growthMetric: {
    fontSize: 14,
    fontWeight: '600',
  },
  growthValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  growthTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  growthChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  releasesContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  releaseItem: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  releaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  releaseVersion: {
    fontSize: 14,
    fontWeight: '600',
  },
  releaseStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  releaseStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  releaseFeatures: {
    fontSize: 12,
    marginBottom: 8,
  },
  releaseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  releaseImpact: {
    fontSize: 12,
  },
  releaseDate: {
    fontSize: 11,
  },
  insightsContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  insightItem: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightCategory: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  insightCategoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightText: {
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  insightMeta: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  insightConfidence: {
    alignItems: 'center',
  },
  insightConfidenceLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  insightConfidenceValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightImpact: {
    alignItems: 'center',
  },
  insightImpactLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  insightImpactValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightTimestamp: {
    fontSize: 11,
  },
  activityContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 8,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activityEvent: {
    flex: 1,
    fontSize: 13,
  },
  activityTimestamp: {
    fontSize: 11,
  },
  systemHealthContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  systemHealthItem: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  systemHealthName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  systemHealthStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  systemHealthStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  systemHealthMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  systemHealthMetric: {
    fontSize: 11,
  },
});

export default ProductCommandCenter;
