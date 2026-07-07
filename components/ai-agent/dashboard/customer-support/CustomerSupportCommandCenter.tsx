import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import AIAgentOverview from './AIAgentOverview';
import LiveSupportOperations from './LiveSupportOperations';
import ConversationMonitor from './ConversationMonitor';
import CustomerSentimentCenter from './CustomerSentimentCenter';
import EscalationManagement from './EscalationManagement';
import KnowledgeBasePerformance from './KnowledgeBasePerformance';
import CustomerSatisfactionAnalytics from './CustomerSatisfactionAnalytics';
import ChannelPerformance from './ChannelPerformance';
import AIPerformanceObservability from './AIPerformanceObservability';
import CustomerInsights from './CustomerInsights';
import LiveConversationAnalytics from './LiveConversationAnalytics';
import SystemHealthMonitor from './SystemHealthMonitor';
import TopCommandBar from './TopCommandBar';
import LeftSidebar from './LeftSidebar';

// Mock data for the command center
const mockCommandBarMetrics = [
  { label: 'Total Conversations Today', value: '2,847', change: '+12%', trend: 'up' as const, color: '#22C55E' },
  { label: 'Active AI Agents', value: '12', change: '+2', trend: 'up' as const, color: '#3B82F6' },
  { label: 'Customer Satisfaction', value: '4.7/5.0', change: '+0.2', trend: 'up' as const, color: '#10B981' },
  { label: 'Avg Resolution Time', value: '6m 15s', change: '-45s', trend: 'up' as const, color: '#8B5CF6' },
  { label: 'First Response Time', value: '1m 30s', change: '-15s', trend: 'up' as const, color: '#06B6D4' },
  { label: 'Escalation Rate', value: '8.2%', change: '-1.2%', trend: 'up' as const, color: '#F59E0B' },
  { label: 'Open Tickets', value: '156', change: '-23', trend: 'up' as const, color: '#EF4444' },
  { label: 'Resolved Tickets', value: '2,691', change: '+342', trend: 'up' as const, color: '#22C55E' },
  { label: 'Human Agent Availability', value: '8/10', change: '+1', trend: 'up' as const, color: '#3B82F6' },
  { label: 'System Health', value: 'Healthy', change: 'Stable', trend: 'stable' as const, color: '#10B981' }
];

const mockSupportAgents = [
  {
    id: 'agent-alpha',
    name: 'Support Agent Alpha',
    status: 'active' as const,
    specialization: 'Billing',
    confidence: 96,
    conversationsToday: 412,
    resolutionRate: 92,
    satisfactionScore: 4.8,
    escalations: 8,
    avgHandlingTime: '6m 30s'
  },
  {
    id: 'agent-beta',
    name: 'Support Agent Beta',
    status: 'active' as const,
    specialization: 'Technical Support',
    confidence: 91,
    conversationsToday: 328,
    resolutionRate: 89,
    satisfactionScore: 4.6,
    escalations: 12,
    avgHandlingTime: '8m 15s'
  },
  {
    id: 'agent-gamma',
    name: 'Support Agent Gamma',
    status: 'learning' as const,
    specialization: 'Product Questions',
    confidence: 84,
    conversationsToday: 145,
    resolutionRate: 85,
    satisfactionScore: 4.4,
    escalations: 18,
    avgHandlingTime: '10m 45s'
  }
];

const mockLiveOperations = {
  activeConversations: 156,
  waitingCustomers: 23,
  queueLength: 8,
  aiResolutionRate: 78,
  humanInterventionRate: 22,
  avgWaitTime: '2m 15s'
};

const mockConversations = [
  {
    id: 'conv-1',
    customerName: 'John Smith',
    channel: 'chat',
    intent: 'Password Reset',
    sentiment: 'neutral' as const,
    assignedAgent: 'Support Agent Alpha',
    status: 'resolved' as const,
    duration: '3m 45s'
  },
  {
    id: 'conv-2',
    customerName: 'Sarah Johnson',
    channel: 'email',
    intent: 'Refund Request',
    sentiment: 'negative' as const,
    assignedAgent: 'Support Agent Beta',
    status: 'escalated' as const,
    duration: '12m 30s'
  },
  {
    id: 'conv-3',
    customerName: 'Mike Davis',
    channel: 'whatsapp',
    intent: 'Billing Question',
    sentiment: 'positive' as const,
    assignedAgent: 'Support Agent Alpha',
    status: 'in_progress' as const,
    duration: '5m 20s'
  },
  {
    id: 'conv-4',
    customerName: 'Emily Brown',
    channel: 'phone',
    intent: 'Technical Issue',
    sentiment: 'frustrated' as const,
    assignedAgent: 'Support Agent Beta',
    status: 'in_progress' as const,
    duration: '8m 10s'
  }
];

const mockSentimentData = {
  positive: 1250,
  neutral: 890,
  negative: 340,
  frustrated: 180,
  happy: 680,
  atRisk: 120
};

const mockSentimentTrend = [
  { period: 'Mon', score: 82 },
  { period: 'Tue', score: 84 },
  { period: 'Wed', score: 81 },
  { period: 'Thu', score: 85 },
  { period: 'Fri', score: 87 },
  { period: 'Sat', score: 83 },
  { period: 'Sun', score: 86 }
];

const mockEscalationPipeline = [
  { id: 'step-1', name: 'Customer Inquiry', status: 'completed' as const, count: 2847 },
  { id: 'step-2', name: 'AI Analysis', status: 'completed' as const, count: 2847 },
  { id: 'step-3', name: 'Knowledge Retrieval', status: 'completed' as const, count: 2691 },
  { id: 'step-4', name: 'Response Generation', status: 'active' as const, count: 156 },
  { id: 'step-5', name: 'Customer Feedback', status: 'pending' as const, count: 156 },
  { id: 'step-6', name: 'Resolution', status: 'pending' as const, count: 0 },
  { id: 'step-7', name: 'Escalated To Human', status: 'escalated' as const, count: 23 }
];

const mockEscalationReasons = [
  { reason: 'Complex technical issues', count: 45, percentage: 35 },
  { reason: 'Billing disputes', count: 32, percentage: 25 },
  { reason: 'Feature requests', count: 28, percentage: 22 },
  { reason: 'Account access', count: 23, percentage: 18 }
];

const mockKnowledgeArticles = [
  { title: 'How to reset your password', views: 1245, successRate: 94 },
  { title: 'Billing and payment guide', views: 987, successRate: 91 },
  { title: 'Troubleshooting login issues', views: 756, successRate: 88 },
  { title: 'Subscription management', views: 654, successRate: 85 },
  { title: 'API integration help', views: 543, successRate: 82 }
];

const mockKnowledgeGaps = [
  { topic: 'Advanced automation features', requestCount: 156, priority: 'high' as const },
  { topic: 'Enterprise security setup', requestCount: 98, priority: 'high' as const },
  { topic: 'Custom integrations', requestCount: 76, priority: 'medium' as const },
  { topic: 'Mobile app troubleshooting', requestCount: 54, priority: 'medium' as const }
];

const mockSatisfactionMetrics = [
  { label: 'CSAT Score', value: '4.7/5.0', change: '+0.2', trend: 'up' as const, color: '#22C55E' },
  { label: 'NPS Score', value: '72', change: '+5', trend: 'up' as const, color: '#3B82F6' },
  { label: 'Customer Effort', value: '1.8/5.0', change: '-0.3', trend: 'up' as const, color: '#8B5CF6' },
  { label: 'Resolution Quality', value: '92%', change: '+2%', trend: 'up' as const, color: '#10B981' }
];

const mockSatisfactionTrend = [
  { period: 'Jan', csat: 4.5, nps: 65, ces: 2.1 },
  { period: 'Feb', csat: 4.6, nps: 68, ces: 2.0 },
  { period: 'Mar', csat: 4.6, nps: 70, ces: 1.9 },
  { period: 'Apr', csat: 4.7, nps: 71, ces: 1.8 },
  { period: 'May', csat: 4.7, nps: 72, ces: 1.8 },
  { period: 'Jun', csat: 4.7, nps: 72, ces: 1.8 }
];

const mockChannels = [
  { name: 'Website Chat', icon: '💬', volume: 1234, responseTime: '1m 15s', resolutionRate: 91, satisfaction: 4.7 },
  { name: 'WhatsApp', icon: '📱', volume: 876, responseTime: '2m 30s', resolutionRate: 88, satisfaction: 4.5 },
  { name: 'Email', icon: '📧', volume: 543, responseTime: '4h 15m', resolutionRate: 85, satisfaction: 4.3 },
  { name: 'Phone', icon: '📞', volume: 234, responseTime: '3m 45s', resolutionRate: 92, satisfaction: 4.8 },
  { name: 'Facebook', icon: '📘', volume: 123, responseTime: '5m 20s', resolutionRate: 86, satisfaction: 4.4 },
  { name: 'Instagram', icon: '📷', volume: 87, responseTime: '6m 10s', resolutionRate: 84, satisfaction: 4.2 }
];

const mockPerformanceMetrics = [
  { label: 'Hallucination Rate', value: '0.8%', status: 'healthy' as const, threshold: '< 2%' },
  { label: 'Knowledge Accuracy', value: '94.2%', status: 'healthy' as const, threshold: '> 90%' },
  { label: 'Response Confidence', value: '91.5%', status: 'healthy' as const, threshold: '> 85%' },
  { label: 'Retrieval Success', value: '89.8%', status: 'warning' as const, threshold: '> 90%' }
];

const mockTopIssues = [
  { category: 'Login Issues', value: '234', trend: 'up' as const, color: '#EF4444' },
  { category: 'Billing Questions', value: '189', trend: 'down' as const, color: '#F59E0B' },
  { category: 'Feature Requests', value: '156', trend: 'up' as const, color: '#3B82F6' },
  { category: 'Technical Support', value: '143', trend: 'stable' as const, color: '#22C55E' }
];

const mockTrendingProblems = [
  { issue: 'Mobile app crashes on iOS 17', count: 45, change: '+12', severity: 'high' as const },
  { issue: 'Payment gateway timeout errors', count: 32, change: '+8', severity: 'high' as const },
  { issue: 'Email notifications not delivered', count: 28, change: '+5', severity: 'medium' as const },
  { issue: 'Profile photo upload failures', count: 23, change: '-3', severity: 'medium' as const }
];

const mockCustomerSegments = [
  { name: 'Enterprise', count: 234, satisfaction: 4.8, churnRisk: 8 },
  { name: 'Small Business', count: 567, satisfaction: 4.6, churnRisk: 12 },
  { name: 'Individual', count: 1245, satisfaction: 4.5, churnRisk: 18 },
  { name: 'Trial Users', count: 891, satisfaction: 4.3, churnRisk: 35 }
];

const mockAnalyticsMetrics = [
  { label: 'Messages/Min', value: '47', trend: 'up' as const, color: '#22C55E' },
  { label: 'Avg Length', value: '8m 30s', trend: 'down' as const, color: '#3B82F6' },
  { label: 'Resolution Time', value: '6m 15s', trend: 'down' as const, color: '#10B981' },
  { label: 'AI Response', value: '1.2s', trend: 'stable' as const, color: '#8B5CF6' }
];

const mockHourlyData = [
  { hour: '6AM', messages: 45, conversations: 12 },
  { hour: '8AM', messages: 89, conversations: 23 },
  { hour: '10AM', messages: 156, conversations: 45 },
  { hour: '12PM', messages: 234, conversations: 67 },
  { hour: '2PM', messages: 198, conversations: 56 },
  { hour: '4PM', messages: 167, conversations: 48 },
  { hour: '6PM', messages: 123, conversations: 34 },
  { hour: '8PM', messages: 87, conversations: 25 }
];

const mockSystemComponents = [
  { name: 'AI Models', status: 'healthy' as const, uptime: '99.9%', lastCheck: '2m ago' },
  { name: 'API Gateway', status: 'healthy' as const, uptime: '99.8%', lastCheck: '1m ago' },
  { name: 'Database', status: 'healthy' as const, uptime: '99.9%', lastCheck: '3m ago' },
  { name: 'Vector Database', status: 'healthy' as const, uptime: '99.7%', lastCheck: '2m ago' },
  { name: 'CRM Integration', status: 'healthy' as const, uptime: '99.5%', lastCheck: '5m ago' },
  { name: 'Helpdesk Integration', status: 'warning' as const, uptime: '98.2%', lastCheck: '1m ago' },
  { name: 'Messaging Providers', status: 'healthy' as const, uptime: '99.6%', lastCheck: '4m ago' },
  { name: 'Queue System', status: 'healthy' as const, uptime: '99.8%', lastCheck: '2m ago' }
];

export default function CustomerSupportCommandCenter() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'agents', label: 'AI Agents' },
    { id: 'conversations', label: 'Conversations' },
    { id: 'sentiment', label: 'Sentiment' },
    { id: 'escalations', label: 'Escalations' },
    { id: 'knowledge', label: 'Knowledge' },
    { id: 'satisfaction', label: 'Satisfaction' },
    { id: 'channels', label: 'Channels' },
    { id: 'performance', label: 'AI Performance' },
    { id: 'insights', label: 'Insights' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'health', label: 'System Health' }
  ];

  return (
    <View style={[styles.container, { backgroundColor: '#0B0F14' }]}>
      {/* Top Command Bar */}
      <TopCommandBar metrics={mockCommandBarMetrics} />

      {/* Tab Navigation */}
      <ScrollView 
        horizontal 
        style={styles.tabScroll} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={[
              styles.tab,
              activeTab === tab.id && { backgroundColor: '#10B981' },
              activeTab !== tab.id && { backgroundColor: 'rgba(16, 185, 129, 0.1)' }
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id ? { color: 'white' } : { color: '#10B981' }
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && (
          <>
            <LiveSupportOperations metrics={mockLiveOperations} />
            <ConversationMonitor conversations={mockConversations} />
            <CustomerSentimentCenter 
              sentimentData={mockSentimentData} 
              trendData={mockSentimentTrend} 
            />
          </>
        )}

        {activeTab === 'agents' && (
          <AIAgentOverview agents={mockSupportAgents} />
        )}

        {activeTab === 'conversations' && (
          <ConversationMonitor conversations={mockConversations} />
        )}

        {activeTab === 'sentiment' && (
          <CustomerSentimentCenter 
            sentimentData={mockSentimentData} 
            trendData={mockSentimentTrend} 
          />
        )}

        {activeTab === 'escalations' && (
          <EscalationManagement 
            pipeline={mockEscalationPipeline}
            reasons={mockEscalationReasons}
            pendingEscalations={23}
            avgEscalationTime='4m 30s'
          />
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeBasePerformance 
            topArticles={mockKnowledgeArticles}
            searchSuccessRate={94}
            retrievalAccuracy={89}
            gaps={mockKnowledgeGaps}
          />
        )}

        {activeTab === 'satisfaction' && (
          <CustomerSatisfactionAnalytics 
            metrics={mockSatisfactionMetrics}
            trendData={mockSatisfactionTrend}
          />
        )}

        {activeTab === 'channels' && (
          <ChannelPerformance channels={mockChannels} />
        )}

        {activeTab === 'performance' && (
          <AIPerformanceObservability 
            metrics={mockPerformanceMetrics}
            modelLatency={850}
            tokenUsage={45678}
            costPerConversation={0.023}
          />
        )}

        {activeTab === 'insights' && (
          <CustomerInsights 
            topIssues={mockTopIssues}
            trendingProblems={mockTrendingProblems}
            segments={mockCustomerSegments}
          />
        )}

        {activeTab === 'analytics' && (
          <LiveConversationAnalytics 
            metrics={mockAnalyticsMetrics}
            hourlyData={mockHourlyData}
            peakHours={['10AM - 12PM', '2PM - 4PM', '12PM - 2PM']}
          />
        )}

        {activeTab === 'health' && (
          <SystemHealthMonitor 
            components={mockSystemComponents}
            overallStatus='healthy'
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabScroll: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.2)',
  },
  tabContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});