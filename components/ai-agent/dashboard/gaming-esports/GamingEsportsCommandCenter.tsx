import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Shield, 
  Zap, 
  Gamepad2, 
  Trophy, 
  Globe, 
  BarChart3, 
  Flame, 
  Crown,
  Sparkles,
  Clock,
  Award,
  Target,
  AlertTriangle,
  CheckCircle2,
  Eye,
  MessageSquare,
  Calendar,
  MapPin,
  Server,
  Cpu,
  Database,
  Radio,
  Play,
  Pause,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Sword,
  ShieldCheck,
  Tower,
  Coins,
  Mic,
  Video,
  Heart,
  Skull,
  Ghost,
  Bot,
  Cpu as Microchip,
  Network,
  Lock,
  Unlock,
  Zap as Lightning,
  Flame as Fire,
  Droplets,
  Gauge,
  Radio as Broadcast
} from 'lucide-react-native';

interface GamingEsportsCommandCenterProps {
  data?: any;
}

export default function GamingEsportsCommandCenter({ data }: GamingEsportsCommandCenterProps) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('executive');

  // Executive KPI Data
  const executiveKPIs = [
    { label: 'Monthly Active Players', value: '120M', change: '+8.5%', trend: 'up' as const, color: '#00D4FF', icon: Users },
    { label: 'Concurrent Players', value: '8.5M', change: '+12%', trend: 'up' as const, color: '#A855F7', icon: Activity },
    { label: 'Total Revenue', value: '$5.4B', change: '+15%', trend: 'up' as const, color: '#10B981', icon: DollarSign },
    { label: 'Live Viewers', value: '210M', change: '+22%', trend: 'up' as const, color: '#F59E0B', icon: Eye },
    { label: 'Retention Rate', value: '82%', change: '+3%', trend: 'up' as const, color: '#06B6D4', icon: Target },
    { label: 'AI Revenue Impact', value: '+$420M', change: '+18%', trend: 'up' as const, color: '#EC4899', icon: Brain },
  ];

  // AI Gaming Agents
  const gamingAgents = [
    {
      id: 'phoenix',
      name: 'Agent Phoenix',
      role: 'Player Intelligence Agent',
      status: 'active' as const,
      confidence: 96,
      color: '#00D4FF',
      icon: Flame,
      responsibilities: ['Player behavior analysis', 'Retention optimization', 'Churn prediction', 'Segmentation'],
      metrics: { playersAnalyzed: '95.2M', retentionImprovement: '+12%', churnReduction: '-8%' }
    },
    {
      id: 'titan',
      name: 'Agent Titan',
      role: 'Live Operations Agent',
      status: 'active' as const,
      confidence: 94,
      color: '#A855F7',
      icon: Tower,
      responsibilities: ['Event management', 'Game updates', 'Seasonal operations', 'Live balancing'],
      metrics: { eventsManaged: '1,247', uptimeSuccess: '99.8%', engagementLift: '+15%' }
    },
    {
      id: 'spectre',
      name: 'Agent Spectre',
      role: 'Anti-Cheat Agent',
      status: 'active' as const,
      confidence: 98,
      color: '#EF4444',
      icon: ShieldCheck,
      responsibilities: ['Cheat detection', 'Fraud prevention', 'Security monitoring', 'Toxicity detection'],
      metrics: { threatsBlocked: '2.4M', accuracyRate: '98.2%', accountsProtected: '45.8M' }
    },
    {
      id: 'arena',
      name: 'Agent Arena',
      role: 'Esports Operations Agent',
      status: 'active' as const,
      confidence: 92,
      color: '#F59E0B',
      icon: Trophy,
      responsibilities: ['Tournament management', 'Match scheduling', 'Team coordination', 'Competitive analytics'],
      metrics: { tournamentsManaged: '847', matchesProcessed: '156K', viewerGrowth: '+28%' }
    },
    {
      id: 'nexus',
      name: 'Agent Nexus',
      role: 'Monetization Agent',
      status: 'active' as const,
      confidence: 95,
      color: '#10B981',
      icon: Coins,
      responsibilities: ['Store optimization', 'Offer recommendations', 'Pricing intelligence', 'Revenue forecasting'],
      metrics: { revenueInfluenced: '$1.8B', purchaseConversion: '+18%', offerPerformance: '+24%' }
    }
  ];

  // AI Insights
  const aiInsights = [
    { id: 1, type: 'warning', title: 'Player retention for new users dropped 8% after recent update', impact: 'high', action: 'Review update impact' },
    { id: 2, type: 'opportunity', title: 'Battle Pass conversion opportunity identified worth $12M', impact: 'high', action: 'Launch targeted campaign' },
    { id: 3, type: 'opportunity', title: 'Esports finals projected to exceed 18M concurrent viewers', impact: 'medium', action: 'Scale infrastructure' },
    { id: 4, type: 'risk', title: 'Suspicious activity detected in ranked matchmaking', impact: 'high', action: 'Investigate immediately' },
    { id: 5, type: 'opportunity', title: 'Community sentiment improved 15% following latest event', impact: 'medium', action: 'Leverage positive momentum' }
  ];

  // Real-time Activity Feed
  const activityFeed = [
    { id: 1, event: 'Championship Finals started', time: '2m ago', impact: 'high', icon: Trophy },
    { id: 2, event: 'Player milestone reached: Level 100', time: '5m ago', impact: 'medium', icon: Award },
    { id: 3, event: 'Security threat blocked', time: '8m ago', impact: 'high', icon: ShieldCheck },
    { id: 4, event: 'Record viewership achieved: 2.1M', time: '12m ago', impact: 'high', icon: Eye },
    { id: 5, event: 'Tournament registration opened', time: '15m ago', impact: 'medium', icon: Calendar },
    { id: 6, event: 'Content creator went live', time: '18m ago', impact: 'low', icon: Broadcast },
    { id: 7, event: 'New season launched', time: '22m ago', impact: 'high', icon: Flame },
    { id: 8, event: 'Anti-cheat system updated', time: '25m ago', impact: 'medium', icon: Lock }
  ];

  const renderKPICard = (kpi: any, index: number) => {
    const Icon = kpi.icon;
    return (
      <View key={index} style={[styles.kpiCard, { backgroundColor: `${kpi.color}10`, borderColor: `${kpi.color}30` }]}>
        <View style={[styles.kpiIcon, { backgroundColor: `${kpi.color}20` }]}>
          <Icon size={24} color={kpi.color} />
        </View>
        <Text style={[styles.kpiValue, { color: '#FFFFFF' }]}>{kpi.value}</Text>
        <Text style={[styles.kpiLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>{kpi.label}</Text>
        <View style={styles.kpiTrend}>
          {kpi.trend === 'up' ? <ArrowUpRight size={14} color="#10B981" /> : <ArrowDownRight size={14} color="#EF4444" />}
          <Text style={[styles.kpiTrendText, { color: kpi.trend === 'up' ? '#10B981' : '#EF4444' }]}>{kpi.change}</Text>
        </View>
      </View>
    );
  };

  const renderAgentCard = (agent: any) => {
    const Icon = agent.icon;
    return (
      <View key={agent.id} style={[styles.agentCard, { backgroundColor: `${agent.color}10`, borderColor: `${agent.color}30` }]}>
        <View style={styles.agentHeader}>
          <View style={[styles.agentIcon, { backgroundColor: `${agent.color}20` }]}>
            <Icon size={28} color={agent.color} />
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: '#FFFFFF' }]}>{agent.name}</Text>
            <Text style={[styles.agentRole, { color: 'rgba(255, 255, 255, 0.6)' }]}>{agent.role}</Text>
          </View>
          <View style={[styles.agentStatus, { backgroundColor: agent.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
            <View style={[styles.statusDot, { backgroundColor: agent.status === 'active' ? '#10B981' : '#F59E0B' }]} />
            <Text style={[styles.statusText, { color: agent.status === 'active' ? '#10B981' : '#F59E0B' }]}>{agent.status}</Text>
          </View>
        </View>

        <View style={styles.agentConfidence}>
          <Text style={[styles.confidenceLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Confidence Score</Text>
          <View style={styles.confidenceBar}>
            <View style={[styles.confidenceFill, { width: `${agent.confidence}%`, backgroundColor: agent.color }]} />
          </View>
          <Text style={[styles.confidenceValue, { color: '#FFFFFF' }]}>{agent.confidence}%</Text>
        </View>

        <View style={styles.agentMetrics}>
          {Object.entries(agent.metrics).map(([key, value]) => (
            <View key={key} style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
              <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{value as string}</Text>
            </View>
          ))}
        </View>

        <View style={styles.agentResponsibilities}>
          <Text style={[styles.responsibilitiesTitle, { color: 'rgba(255, 255, 255, 0.7)' }]}>Responsibilities</Text>
          <View style={styles.responsibilitiesList}>
            {agent.responsibilities.map((resp: string, idx: number) => (
              <View key={idx} style={styles.responsibilityItem}>
                <CheckCircle2 size={12} color={agent.color} />
                <Text style={[styles.responsibilityText, { color: 'rgba(255, 255, 255, 0.8)' }]}>{resp}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderInsightCard = (insight: any) => {
    const colors = {
      warning: '#F59E0B',
      opportunity: '#10B981',
      risk: '#EF4444'
    };
    const icons = {
      warning: AlertTriangle,
      opportunity: Target,
      risk: ShieldCheck
    };
    const Icon = icons[insight.type as keyof typeof icons];
    const color = colors[insight.type as keyof typeof colors];

    return (
      <View key={insight.id} style={[styles.insightCard, { backgroundColor: `${color}10`, borderColor: `${color}30` }]}>
        <View style={[styles.insightIcon, { backgroundColor: `${color}20` }]}>
          <Icon size={20} color={color} />
        </View>
        <View style={styles.insightContent}>
          <Text style={[styles.insightTitle, { color: '#FFFFFF' }]}>{insight.title}</Text>
          <View style={styles.insightMeta}>
            <View style={[styles.impactBadge, { backgroundColor: `${color}20` }]}>
              <Text style={[styles.impactText, { color }]}>{insight.impact} impact</Text>
            </View>
            <Text style={[styles.actionText, { color: 'rgba(255, 255, 255, 0.6)' }]}>{insight.action}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderActivityItem = (activity: any) => {
    const Icon = activity.icon;
    const impactColors = {
      high: '#EF4444',
      medium: '#F59E0B',
      low: '#10B981'
    };

    return (
      <View key={activity.id} style={styles.activityItem}>
        <View style={[styles.activityIcon, { backgroundColor: `${impactColors[activity.impact as keyof typeof impactColors]}20` }]}>
          <Icon size={16} color={impactColors[activity.impact as keyof typeof impactColors]} />
        </View>
        <View style={styles.activityContent}>
          <Text style={[styles.activityText, { color: '#FFFFFF' }]}>{activity.event}</Text>
          <Text style={[styles.activityTime, { color: 'rgba(255, 255, 255, 0.5)' }]}>{activity.time}</Text>
        </View>
        <View style={[styles.activityIndicator, { backgroundColor: impactColors[activity.impact as keyof typeof impactColors] }]} />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: '#03050A' }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerBadge, { backgroundColor: 'rgba(0, 212, 255, 0.2)', borderColor: '#00D4FF' }]}>
            <Gamepad2 size={20} color="#00D4FF" />
            <Text style={styles.headerBadgeText}>GAMING & ESPORTS</Text>
          </View>
          <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>AI Command Center</Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10B981' }]}>
          <Sparkles size={12} color="#10B981" />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        {['executive', 'agents', 'insights', 'activity'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && { backgroundColor: 'rgba(0, 212, 255, 0.2)', borderColor: '#00D4FF' }]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && { color: '#00D4FF' }]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {activeTab === 'executive' && (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Executive KPIs</Text>
            <View style={styles.kpiGrid}>
              {executiveKPIs.map((kpi, index) => renderKPICard(kpi, index))}
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Chief Gaming Officer Command Center</Text>
              <View style={[styles.commandCenter, { backgroundColor: 'rgba(0, 212, 255, 0.05)', borderColor: 'rgba(0, 212, 255, 0.2)' }]}>
                <View style={styles.commandMetrics}>
                  <View style={styles.commandMetric}>
                    <Text style={[styles.commandMetricValue, { color: '#00D4FF' }]}>120M</Text>
                    <Text style={[styles.commandMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Monthly Active Players</Text>
                  </View>
                  <View style={styles.commandMetric}>
                    <Text style={[styles.commandMetricValue, { color: '#A855F7' }]}>8.5M</Text>
                    <Text style={[styles.commandMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Concurrent Players</Text>
                  </View>
                  <View style={styles.commandMetric}>
                    <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>$5.4B</Text>
                    <Text style={[styles.commandMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Revenue</Text>
                  </View>
                  <View style={styles.commandMetric}>
                    <Text style={[styles.commandMetricValue, { color: '#F59E0B' }]}>210M</Text>
                    <Text style={[styles.commandMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Live Viewers</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'agents' && (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Gaming Agents</Text>
            {gamingAgents.map((agent) => renderAgentCard(agent))}
          </View>
        )}

        {activeTab === 'insights' && (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Insights Center</Text>
            {aiInsights.map((insight) => renderInsightCard(insight))}
          </View>
        )}

        {activeTab === 'activity' && (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Real-Time Gaming Activity Feed</Text>
            <View style={[styles.activityFeed, { backgroundColor: 'rgba(0, 212, 255, 0.05)', borderColor: 'rgba(0, 212, 255, 0.2)' }]}>
              {activityFeed.map((activity) => renderActivityItem(activity))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  headerBadgeText: {
    color: '#00D4FF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  liveText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  section: {
    marginTop: 24,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  kpiIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  kpiLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  kpiTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kpiTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  commandCenter: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  commandMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commandMetric: {
    alignItems: 'center',
  },
  commandMetricValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  commandMetricLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  agentCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 13,
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  agentConfidence: {
    marginBottom: 16,
  },
  confidenceLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  confidenceBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginBottom: 8,
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 3,
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  agentResponsibilities: {
    marginTop: 8,
  },
  responsibilitiesTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  responsibilitiesList: {
    gap: 8,
  },
  responsibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  responsibilityText: {
    fontSize: 12,
  },
  insightCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  insightMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionText: {
    fontSize: 12,
  },
  activityFeed: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
  },
  activityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});