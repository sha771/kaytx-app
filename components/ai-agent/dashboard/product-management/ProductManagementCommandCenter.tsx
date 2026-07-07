import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import LeftSidebar from './LeftSidebar';
import TopCommandBar from './TopCommandBar';
import AIAgentOverview from './AIAgentOverview';
import ProductCommandCenterDashboard from './ProductCommandCenterDashboard';
import ProductRoadmapIntelligence from './ProductRoadmapIntelligence';
import UserBehaviorAnalytics from './UserBehaviorAnalytics';
import FeaturePrioritizationEngine from './FeaturePrioritizationEngine';
import ExperimentationLab from './ExperimentationLab';
import UserFeedbackIntelligence from './UserFeedbackIntelligence';
import ProductGrowthAnalytics from './ProductGrowthAnalytics';
import ReleaseManagementCenter from './ReleaseManagementCenter';
import ProductInsightsEngine from './ProductInsightsEngine';
import ProductActivityStream from './ProductActivityStream';
import ProductSystemHealth from './ProductSystemHealth';

// Mock Data
const mockProductAgents = [
  {
    id: 'atlas',
    name: 'Agent Atlas',
    role: 'Product Analytics Agent',
    avatar: '📊',
    status: 'online' as const,
    confidenceScore: 94,
    metrics: {
      sessionsAnalyzed: 4200000,
      insightsGenerated: 18420,
      retentionImprovements: 42,
    },
    productImpact: 'High',
  },
  {
    id: 'nova',
    name: 'Agent Nova',
    role: 'Experimentation Agent',
    avatar: '🧪',
    status: 'online' as const,
    confidenceScore: 91,
    metrics: {
      abTestsRunning: 128,
      winningVariants: 62,
      conversionLift: 14,
    },
    productImpact: 'High',
  },
  {
    id: 'pulse',
    name: 'Agent Pulse',
    role: 'User Feedback Agent',
    avatar: '💬',
    status: 'busy' as const,
    confidenceScore: 96,
    metrics: {
      feedbackProcessed: 84200,
      sentimentAccuracy: 96,
      featureRequestsClustered: 312,
    },
    productImpact: 'Medium',
  },
];

const mockProductKPIs = [
  {
    id: 'active-users',
    title: 'Active Users',
    value: '8.4M',
    change: '+12.5%',
    trend: 'up' as const,
    color: '#06B6D4',
    subtitle: 'DAU/MAU',
  },
  {
    id: 'retention-rate',
    title: 'Retention Rate',
    value: '74%',
    change: '+3.2%',
    trend: 'up' as const,
    color: '#10B981',
    subtitle: 'D30 retention',
  },
  {
    id: 'engagement-score',
    title: 'Engagement Score',
    value: '89',
    change: '+4.1%',
    trend: 'up' as const,
    color: '#8B5CF6',
    subtitle: 'Product health',
  },
  {
    id: 'feature-adoption',
    title: 'Feature Adoption',
    value: '63%',
    change: '+5.8%',
    trend: 'up' as const,
    color: '#F59E0B',
    subtitle: 'Average adoption',
  },
  {
    id: 'nps-score',
    title: 'NPS Score',
    value: '72',
    change: '+6.2%',
    trend: 'up' as const,
    color: '#22C55E',
    subtitle: 'Net Promoter',
  },
  {
    id: 'churn-rate',
    title: 'Churn Rate',
    value: '2.4%',
    change: '-0.8%',
    trend: 'down' as const,
    color: '#10B981',
    subtitle: 'Monthly churn',
  },
  {
    id: 'experiment-success',
    title: 'Experiment Success',
    value: '68%',
    change: '+8.4%',
    trend: 'up' as const,
    color: '#3B82F6',
    subtitle: 'Win rate',
  },
  {
    id: 'ttv',
    title: 'Time to Value',
    value: '4.2 days',
    change: '-15.3%',
    trend: 'down' as const,
    color: '#10B981',
    subtitle: 'Activation time',
  },
  {
    id: 'arpu',
    title: 'Revenue per User',
    value: '$142',
    change: '+12.1%',
    trend: 'up' as const,
    color: '#EC4899',
    subtitle: 'ARPU',
  },
];

const mockRoadmapItems = [
  {
    id: 'rm1',
    name: 'AI-Powered Feature Recommendations',
    timeframe: 'now' as const,
    priority: 'high' as const,
    progress: 78,
    team: 'Core Product',
    impact: 9,
    effort: 7,
  },
  {
    id: 'rm2',
    name: 'Real-time Collaboration Suite',
    timeframe: 'now' as const,
    priority: 'high' as const,
    progress: 45,
    team: 'Platform',
    impact: 8,
    effort: 8,
  },
  {
    id: 'rm3',
    name: 'Advanced Analytics Dashboard',
    timeframe: 'next' as const,
    priority: 'medium' as const,
    progress: 0,
    team: 'Data Science',
    impact: 7,
    effort: 6,
  },
  {
    id: 'rm4',
    name: 'Mobile App Redesign',
    timeframe: 'next' as const,
    priority: 'medium' as const,
    progress: 0,
    team: 'Mobile',
    impact: 6,
    effort: 5,
  },
  {
    id: 'rm5',
    name: 'API Marketplace',
    timeframe: 'later' as const,
    priority: 'low' as const,
    progress: 0,
    team: 'Platform',
    impact: 5,
    effort: 4,
  },
];

const mockUserJourneys = [
  {
    id: 'uj1',
    name: 'New User Onboarding',
    steps: ['Sign Up', 'Profile Setup', 'First Project', 'Team Invite', 'First Success'],
    completionRate: 68,
    avgDuration: '12 min',
    dropOffRate: 32,
    users: 125000,
  },
  {
    id: 'uj2',
    name: 'Feature Discovery Flow',
    steps: ['Dashboard Visit', 'Feature Browse', 'Feature Try', 'Success Metric'],
    completionRate: 45,
    avgDuration: '8 min',
    dropOffRate: 55,
    users: 89000,
  },
];

const mockFunnelStages = [
  { name: 'Awareness', users: 2400000, conversionRate: 100, dropOff: 0 },
  { name: 'Sign Up', users: 840000, conversionRate: 35, dropOff: 65 },
  { name: 'Activation', users: 504000, conversionRate: 60, dropOff: 40 },
  { name: 'First Value', users: 336000, conversionRate: 67, dropOff: 33 },
  { name: 'Retention', users: 252000, conversionRate: 75, dropOff: 25 },
];

const mockHeatmaps = [
  {
    page: '/dashboard',
    area: 'Main Navigation',
    interactionRate: 78,
    clicks: 45000,
    hoverTime: '2.3s',
  },
  {
    page: '/analytics',
    area: 'Export Button',
    interactionRate: 45,
    clicks: 12000,
    hoverTime: '1.8s',
  },
];

const mockFeatures = [
  {
    id: 'f1',
    title: 'AI-Powered Recommendations',
    demandScore: 8.5,
    revenueImpact: '$2.4M',
    engineeringEffort: 7,
    strategicAlignment: 85,
    votes: 4200,
    status: 'in-progress' as const,
  },
  {
    id: 'f2',
    title: 'Real-time Collaboration',
    demandScore: 7.8,
    revenueImpact: '$1.8M',
    engineeringEffort: 8,
    strategicAlignment: 78,
    votes: 3800,
    status: 'planned' as const,
  },
  {
    id: 'f3',
    title: 'Advanced Analytics',
    demandScore: 7.2,
    revenueImpact: '$1.2M',
    engineeringEffort: 6,
    strategicAlignment: 72,
    votes: 2900,
    status: 'backlog' as const,
  },
];

const mockExperiments = [
  {
    id: 'exp1',
    name: 'Onboarding Flow Optimization',
    status: 'running' as const,
    variantA: 'Current Flow',
    variantB: 'Simplified Flow',
    conversionRateA: 42,
    conversionRateB: 48,
    statisticalConfidence: 94,
    lift: 14.3,
    roi: '$340K',
  },
  {
    id: 'exp2',
    name: 'Pricing Page Redesign',
    status: 'running' as const,
    variantA: 'Current Design',
    variantB: 'Value-Focused Design',
    conversionRateA: 18,
    conversionRateB: 22,
    statisticalConfidence: 89,
    lift: 22.2,
    roi: '$180K',
  },
  {
    id: 'exp3',
    name: 'CTA Button Testing',
    status: 'completed' as const,
    variantA: 'Blue Button',
    variantB: 'Green Button',
    conversionRateA: 12,
    conversionRateB: 14,
    statisticalConfidence: 98,
    lift: 16.7,
    roi: '$95K',
  },
];

const mockFeedback = [
  {
    id: 'fb1',
    source: 'in-app',
    sentiment: 'positive' as const,
    category: 'Feature Request',
    description: 'Love the new AI recommendations! Would love to see them in more places.',
    timestamp: '2 hours ago',
    priority: 'medium' as const,
  },
  {
    id: 'fb2',
    source: 'support',
    sentiment: 'negative' as const,
    category: 'Bug Report',
    description: 'Experiencing lag when loading large datasets in analytics view.',
    timestamp: '4 hours ago',
    priority: 'high' as const,
  },
  {
    id: 'fb3',
    source: 'reviews',
    sentiment: 'positive' as const,
    category: 'General Feedback',
    description: 'Best product management tool we have used. Great job team!',
    timestamp: '1 day ago',
    priority: 'low' as const,
  },
];

const mockGrowthMetrics = [
  {
    id: 'gm1',
    name: 'Activation Rate',
    value: 68,
    change: '+5.2%',
    trend: 'up' as const,
    period: 'This month',
  },
  {
    id: 'gm2',
    name: 'Viral Coefficient',
    value: 1.2,
    change: '+0.3',
    trend: 'up' as const,
    period: 'This month',
  },
  {
    id: 'gm3',
    name: 'Growth Rate',
    value: 18,
    change: '+2.4%',
    trend: 'up' as const,
    period: 'MoM',
  },
];

const mockCohortData = [
  { cohort: 'Jan 2024', retention: [85, 72, 58, 45, 38, 32], size: 42000 },
  { cohort: 'Feb 2024', retention: [88, 75, 62, 50, 42, 35], size: 48000 },
  { cohort: 'Mar 2024', retention: [90, 78, 65, 54, 46, 40], size: 52000 },
];

const mockReleases = [
  {
    id: 'rel1',
    version: 'v2.4.0',
    name: 'AI Recommendations Feature',
    status: 'in-progress' as const,
    releaseDate: '2024-01-28',
    features: 12,
    impact: 'High',
    rollbackRisk: 'medium' as const,
  },
  {
    id: 'rel2',
    version: 'v2.5.0',
    name: 'Real-time Collaboration',
    status: 'scheduled' as const,
    releaseDate: '2024-02-15',
    features: 8,
    impact: 'High',
    rollbackRisk: 'low' as const,
  },
  {
    id: 'rel3',
    version: 'v2.3.0',
    name: 'Performance Improvements',
    status: 'completed' as const,
    releaseDate: '2024-01-10',
    features: 15,
    impact: 'Medium',
    rollbackRisk: 'low' as const,
  },
];

const mockInsights = [
  {
    id: 'ins1',
    type: 'opportunity' as const,
    title: 'Onboarding Drop-off Optimization',
    description: 'Users dropping off at step 2 of onboarding causing 18% loss in activation. Simplifying this step could improve activation by 12%.',
    impact: 'high' as const,
    actionable: true,
    confidence: 92,
  },
  {
    id: 'ins2',
    type: 'recommendation' as const,
    title: 'Feature X Retention Impact',
    description: 'Feature X drives 32% of retention improvement for power users. Consider promoting this feature to more user segments.',
    impact: 'medium' as const,
    actionable: true,
    confidence: 87,
  },
  {
    id: 'ins3',
    type: 'warning' as const,
    title: 'SMB Segment Upgrade Intent',
    description: 'Users in SMB segment showing highest upgrade intent but converting at lower rates. Pricing optimization needed.',
    impact: 'high' as const,
    actionable: true,
    confidence: 78,
  },
];

const mockActivities = [
  {
    id: 'act1',
    type: 'user' as const,
    title: 'New User Activated',
    description: 'User #45212 completed onboarding and achieved first success metric',
    timestamp: '5 minutes ago',
    user: 'john@example.com',
  },
  {
    id: 'act2',
    type: 'feature' as const,
    title: 'Feature Used',
    description: 'AI recommendations used 1,234 times in the last hour',
    timestamp: '15 minutes ago',
  },
  {
    id: 'act3',
    type: 'experiment' as const,
    title: 'Experiment Started',
    description: 'New A/B test "Pricing Page Colors" has begun',
    timestamp: '1 hour ago',
  },
  {
    id: 'act4',
    type: 'feedback' as const,
    title: 'Feedback Submitted',
    description: 'New feature request for "Dark Mode" received from 45 users',
    timestamp: '2 hours ago',
  },
  {
    id: 'act5',
    type: 'release' as const,
    title: 'Release Deployed',
    description: 'Version 2.3.2 successfully deployed to production',
    timestamp: '3 hours ago',
  },
  {
    id: 'act6',
    type: 'insight' as const,
    title: 'Insight Generated',
    description: 'AI identified new opportunity in user engagement patterns',
    timestamp: '4 hours ago',
  },
];

const mockSystemHealth = [
  {
    name: 'Analytics Pipeline',
    status: 'healthy' as const,
    uptime: 99.95,
    lastCheck: '2 min ago',
    metrics: {
      responseTime: 145,
      errorRate: 0.12,
    },
  },
  {
    name: 'Event Tracking System',
    status: 'healthy' as const,
    uptime: 99.98,
    lastCheck: '1 min ago',
    metrics: {
      responseTime: 89,
      errorRate: 0.05,
    },
  },
  {
    name: 'Experimentation Platform',
    status: 'degraded' as const,
    uptime: 99.2,
    lastCheck: '5 min ago',
    metrics: {
      responseTime: 320,
      errorRate: 1.8,
    },
  },
  {
    name: 'Feature Flag System',
    status: 'healthy' as const,
    uptime: 99.99,
    lastCheck: '1 min ago',
    metrics: {
      responseTime: 45,
      errorRate: 0.02,
    },
  },
  {
    name: 'Data Warehouse Sync',
    status: 'healthy' as const,
    uptime: 99.9,
    lastCheck: '3 min ago',
    metrics: {
      responseTime: 210,
      errorRate: 0.3,
    },
  },
  {
    name: 'AI Agents Health',
    status: 'healthy' as const,
    uptime: 99.97,
    lastCheck: '1 min ago',
    metrics: {
      responseTime: 178,
      errorRate: 0.08,
    },
  },
];

const mockTopBarMetrics = [
  { label: 'Active Users', value: '8.4M', change: '+12.5%', trend: 'up' as const, color: '#06B6D4', subtitle: 'DAU/MAU' },
  { label: 'Retention', value: '74%', change: '+3.2%', trend: 'up' as const, color: '#10B981', subtitle: 'D30 Retention' },
  { label: 'Engagement', value: '89', change: '+4.1%', trend: 'up' as const, color: '#8B5CF6', subtitle: 'Product Health' },
  { label: 'NPS Score', value: '72', change: '+6.2%', trend: 'up' as const, color: '#22C55E', subtitle: 'Net Promoter' },
  { label: 'Revenue', value: '$14.2M', change: '+18.4%', trend: 'up' as const, color: '#EC4899', subtitle: 'Monthly Impact' },
  { label: 'Experiment Success', value: '68%', change: '+8.4%', trend: 'up' as const, color: '#3B82F6', subtitle: 'Win Rate' },
  { label: 'Feature Adoption', value: '63%', change: '+5.8%', trend: 'up' as const, color: '#F59E0B', subtitle: 'Avg Adoption' },
  { label: 'Churn Rate', value: '2.4%', change: '-0.8%', trend: 'down' as const, color: '#10B981', subtitle: 'Monthly Churn' },
];

export default function ProductManagementCommandCenter() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <ScrollView style={styles.contentScroll}>
            <ProductCommandCenterDashboard kpis={mockProductKPIs} />
            <AIAgentOverview agents={mockProductAgents} />
            <ProductActivityStream activities={mockActivities} />
            <ProductInsightsEngine insights={mockInsights} />
          </ScrollView>
        );
      case 'agents':
        return <AIAgentOverview agents={mockProductAgents} />;
      case 'roadmap':
        return <ProductRoadmapIntelligence roadmapItems={mockRoadmapItems} />;
      case 'analytics':
        return (
          <ScrollView style={styles.contentScroll}>
            <UserBehaviorAnalytics 
              journeys={mockUserJourneys} 
              funnelStages={mockFunnelStages} 
              heatmaps={mockHeatmaps} 
            />
            <ProductGrowthAnalytics 
              growthMetrics={mockGrowthMetrics} 
              cohortData={mockCohortData} 
            />
          </ScrollView>
        );
      case 'feedback':
        return <UserFeedbackIntelligence feedback={mockFeedback} />;
      case 'features':
        return <FeaturePrioritizationEngine features={mockFeatures} />;
      case 'experiments':
        return <ExperimentationLab experiments={mockExperiments} />;
      case 'discovery':
        return <ProductInsightsEngine insights={mockInsights} />;
      case 'releases':
        return <ReleaseManagementCenter releases={mockReleases} />;
      case 'segments':
        return <ProductGrowthAnalytics growthMetrics={mockGrowthMetrics} cohortData={mockCohortData} />;
      case 'insights':
        return <ProductInsightsEngine insights={mockInsights} />;
      case 'settings':
        return <ProductSystemHealth systems={mockSystemHealth} />;
      default:
        return <ProductCommandCenterDashboard kpis={mockProductKPIs} />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Left Sidebar */}
      <LeftSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Top Command Bar */}
        <TopCommandBar metrics={mockTopBarMetrics} />

        {/* Content */}
        <ScrollView style={styles.contentContainer}>
          {renderContent()}
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
  mainContent: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  contentScroll: {
    padding: 16,
  },
});