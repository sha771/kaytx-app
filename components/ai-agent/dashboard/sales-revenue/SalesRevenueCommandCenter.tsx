import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import AIAgentOverview from './AIAgentOverview';
import RevenueCommandCenter from './RevenueCommandCenter';
import SalesPipelineVisualization from './SalesPipelineVisualization';
import LiveDealTracker from './LiveDealTracker';
import { LiveDealConfig } from '../../types';
import LeadIntelligenceCenter from './LeadIntelligenceCenter';
import RevenueForecastingEngine from './RevenueForecastingEngine';
import SalesPerformanceLeaderboard from './SalesPerformanceLeaderboard';
import CustomerIntelligence from './CustomerIntelligence';
import RevenueAnalytics from './RevenueAnalytics';
import AIInsightsCenter from './AIInsightsCenter';
import ActivityStream from './ActivityStream';
import SalesOperationsHealth from './SalesOperationsHealth';
import TopCommandBar from './TopCommandBar';
import LeftSidebar from './LeftSidebar';

// Mock data for the command center
const mockCommandBarMetrics = [
  { label: 'Monthly Revenue', value: '$1.8M', change: '+12%', trend: 'up' as const, color: '#10B981' },
  { label: 'ARR', value: '$21.6M', change: '+18%', trend: 'up' as const, color: '#10B981' },
  { label: 'MRR', value: '$1.8M', change: '+8%', trend: 'up' as const, color: '#3B82F6' },
  { label: 'Pipeline Value', value: '$9.4M', change: '+15%', trend: 'up' as const, color: '#8B5CF6' },
  { label: 'Closed Won', value: '$2.4M', change: '+22%', trend: 'up' as const, color: '#10B981' },
  { label: 'Closed Lost', value: '$340K', change: '-8%', trend: 'up' as const, color: '#EF4444' },
  { label: 'Forecast Accuracy', value: '94%', change: '+3%', trend: 'up' as const, color: '#06B6D4' },
  { label: 'Sales Target Progress', value: '87%', change: '+5%', trend: 'up' as const, color: '#F59E0B' },
  { label: 'Quarterly Revenue', value: '$5.4M', change: '+14%', trend: 'up' as const, color: '#10B981' },
  { label: 'Revenue Growth', value: '24%', change: '+4%', trend: 'up' as const, color: '#22C55E' }
];

const mockSalesAgents = [
  {
    id: 'agent-alpha',
    name: 'Agent Alpha',
    role: 'SDR Agent',
    avatar: '🤖',
    status: 'online' as const,
    confidenceScore: 94,
    revenueContribution: '$1.2M',
    dealsInfluenced: 234,
    performanceTrend: 'up' as const,
    metrics: {
      leadsGenerated: 1240,
      meetingsBooked: 184,
      conversionRate: 22
    }
  },
  {
    id: 'agent-beta',
    name: 'Agent Beta',
    role: 'Account Executive Agent',
    avatar: '🎯',
    status: 'online' as const,
    confidenceScore: 89,
    revenueContribution: '$2.4M',
    dealsInfluenced: 87,
    performanceTrend: 'up' as const,
    metrics: {
      opportunitiesManaged: 87,
      revenueClosed: '$2.4M'
    }
  },
  {
    id: 'agent-gamma',
    name: 'Agent Gamma',
    role: 'Revenue Expansion Agent',
    avatar: '📈',
    status: 'busy' as const,
    confidenceScore: 91,
    revenueContribution: '$840K',
    dealsInfluenced: 45,
    performanceTrend: 'stable' as const,
    metrics: {
      upsellRevenue: '$840K',
      renewalSuccess: 91
    }
  }
];

const mockRevenueMetrics = {
  revenueToday: '$186,450',
  mrr: '$1.8M',
  arr: '$21.6M',
  pipelineValue: '$9.4M',
  forecastedRevenue: '$24.3M',
  monthlyRevenue: '$1.8M',
  quarterlyRevenue: '$5.4M',
  annualRevenue: '$21.6M',
  revenueGrowth: 24,
  salesTargetProgress: 87
};

const mockPipelineStages = [
  { name: 'Visitors', value: 45000, conversionRate: 100, revenue: 0 },
  { name: 'Leads', value: 12400, conversionRate: 28, revenue: 0 },
  { name: 'MQLs', value: 6200, conversionRate: 50, revenue: 0 },
  { name: 'SQLs', value: 3100, conversionRate: 50, revenue: 0 },
  { name: 'Opportunities', value: 1240, conversionRate: 40, revenue: 1240000 },
  { name: 'Negotiation', value: 496, conversionRate: 60, revenue: 2400000 },
  { name: 'Closed Won', value: 298, conversionRate: 60, revenue: 4200000 }
];

const mockLiveDeals: LiveDealConfig = {
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
    },
    {
      id: 'deal-4',
      company: 'DataDriven Co',
      value: 450000,
      stage: 'Negotiation',
      probability: 85,
      owner: 'Agent Beta',
      aiRecommendation: 'Close this quarter',
      nextAction: 'Final terms discussion'
    }
  ]
};

const mockLeadIntelligence = {
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
    },
    {
      id: 'lead-3',
      company: 'DataFlow',
      source: 'Referral',
      score: 76,
      intent: 'medium' as const,
      industry: 'Analytics',
      companySize: '50-100'
    }
  ],
  totalLeads: 1240,
  avgScore: 78
};

const mockRevenueForecast = {
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
    { month: 'Jun', forecast: 1800000 },
    { month: 'Jul', forecast: 1850000 },
    { month: 'Aug', forecast: 1900000 },
    { month: 'Sep', forecast: 1850000 },
    { month: 'Oct', forecast: 1950000 },
    { month: 'Nov', forecast: 2000000 },
    { month: 'Dec', forecast: 2100000 }
  ]
};

const mockSalesPerformance = {
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
    },
    {
      name: 'Agent Gamma',
      role: 'Revenue Expansion',
      revenueClosed: 840000,
      conversionRate: 28,
      meetingsBooked: 56,
      dealsWon: 34,
      quotaAttainment: 98
    }
  ]
};

const mockCustomerIntelligence = {
  expansionOpportunities: 234,
  renewalRisks: 45,
  upsellPotential: 890000,
  avgHealthScore: 87,
  buyingSignals: 156
};

const mockAIInsights = {
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
    },
    {
      id: 'insight-3',
      type: 'opportunity' as const,
      title: '14 accounts show high buying intent',
      description: 'Recent engagement spike detected',
      impact: 'medium' as const,
      action: 'Schedule demos'
    },
    {
      id: 'insight-4',
      type: 'opportunity' as const,
      title: 'Upsell opportunity worth $620K',
      description: 'Existing customers ready for expansion',
      impact: 'high' as const,
      action: 'Initiate expansion'
    },
    {
      id: 'insight-5',
      type: 'risk' as const,
      title: 'Churn risk detected in 8 accounts',
      description: 'Declining engagement metrics',
      impact: 'high' as const,
      action: 'Intervention required'
    }
  ]
};

const mockActivities = [
  { id: 'act-1', event: 'New lead captured', entity: 'TechCorp Inc', time: '2m ago', type: 'lead' as const },
  { id: 'act-2', event: 'Meeting booked', entity: 'GlobalSoft Ltd', time: '5m ago', type: 'opportunity' as const },
  { id: 'act-3', event: 'Proposal sent', entity: 'InnovateTech', time: '12m ago', type: 'deal' as const },
  { id: 'act-4', event: 'Deal moved stage', entity: 'DataDriven Co', time: '15m ago', type: 'deal' as const },
  { id: 'act-5', event: 'Deal won', entity: 'CloudFirst', time: '1h ago', type: 'revenue' as const },
  { id: 'act-6', event: 'Renewal completed', entity: 'FutureScale', time: '2h ago', type: 'revenue' as const }
];

const mockOperationsHealth = {
  crmSync: { status: 'operational' as const, latency: '45ms', uptime: '99.9%' },
  emailDeliverability: { status: 'operational' as const, latency: '2.1s', uptime: '99.8%' },
  callSystem: { status: 'operational' as const, latency: '150ms', uptime: '99.7%' },
  aiAgentPerformance: { status: 'operational' as const, latency: '89ms', uptime: '99.9%' },
  workflowAutomation: { status: 'operational' as const, latency: '234ms', uptime: '99.6%' },
  apiIntegrations: { status: 'degraded' as const, latency: '1.2s', uptime: '98.5%' }
};

export default function SalesRevenueCommandCenter() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LeftSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <View style={styles.mainContent}>
        <TopCommandBar metrics={mockCommandBarMetrics} />
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* AI Sales Agents Overview */}
          <AIAgentOverview agents={mockSalesAgents} />
          
          {/* Revenue Command Center */}
          <RevenueCommandCenter metrics={mockRevenueMetrics} />
          
          {/* Sales Pipeline Visualization */}
          <SalesPipelineVisualization stages={mockPipelineStages} />
          
          {/* Live Deal Tracker */}
          <LiveDealTracker config={mockLiveDeals} />
          
          {/* Lead Intelligence Center */}
          <LeadIntelligenceCenter config={mockLeadIntelligence} />
          
          {/* Revenue Forecasting Engine */}
          <RevenueForecastingEngine config={mockRevenueForecast} />
          
          {/* Sales Performance Leaderboard */}
          <SalesPerformanceLeaderboard config={mockSalesPerformance} />
          
          {/* Customer Intelligence */}
          <CustomerIntelligence config={mockCustomerIntelligence} />
          
          {/* Revenue Analytics */}
          <RevenueAnalytics />
          
          {/* AI Insights Center */}
          <AIInsightsCenter config={mockAIInsights} />
          
          {/* Activity Stream */}
          <ActivityStream activities={mockActivities} />
          
          {/* Sales Operations Health */}
          <SalesOperationsHealth health={mockOperationsHealth} />
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
  content: {
    flex: 1,
    padding: 16,
  }
});