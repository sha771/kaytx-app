import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Switch,
} from 'react-native';
import {
  Headphones,
  CircleCheck,
  Lock,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Users,
  BarChart3,
  Settings,
  Zap,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Wrench,
  MessageSquare,
  Filter,
  Search,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Award,
  Activity,
  Globe,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AICustomerSupportScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-customer-support')!;

  const { data: analytics } = trpc.aiAgents.getAgentAnalytics.useQuery({
    agentId: agent.id,
    timeRange: '7d',
  });
  const { data: activityData } = trpc.aiAgents.getAgentActivity.useQuery({
    agentId: agent.id,
    limit: 30,
  });
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const isPremiumLocked = useMemo(() => {
    return (
      agent.isPremium &&
      (subscription?.plan === 'free' || subscription?.plan === 'starter')
    );
  }, [agent.isPremium, subscription]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPremiumLocked) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [isPremiumLocked, fadeAnim]);

  // Key Metrics
  const keyMetrics = {
    totalTickets: 1284,
    resolved: 1198,
    pending: 56,
    escalated: 30,
    avgResponseTime: '1m 42s',
    avgResolutionTime: '4m 18s',
    csat: '94.7%',
    firstContactResolution: '87.3%',
  };

  // Channel Distribution
  const channels = [
    { name: 'Live Chat', icon: MessageCircle, count: 542, pct: '42.2%', color: '#3B82F6' },
    { name: 'Email', icon: Mail, count: 389, pct: '30.3%', color: '#8B5CF6' },
    { name: 'Phone', icon: Phone, count: 241, pct: '18.8%', color: '#10B981' },
    { name: 'FAQ Bot', icon: HelpCircle, count: 112, pct: '8.7%', color: '#F59E0B' },
  ];

  // Active Sub-Agents
  const subAgents = [
    { id: 'ai-faq-responder', name: 'FAQ Responder', icon: HelpCircle, handled: 112, status: 'active', color: '#3B82F6' },
    { id: 'ai-troubleshooting-guide', name: 'Troubleshooting Guide', icon: Wrench, handled: 389, status: 'active', color: '#10B981' },
    { id: 'ai-live-chat-handler', name: 'Live Chat Handler', icon: MessageSquare, handled: 542, status: 'active', color: '#8B5CF6' },
  ];

  // Recent Tickets
  const recentTickets = [
    { id: '#TK-4821', subject: 'Login authentication error', channel: 'chat', priority: 'high', status: 'resolved', time: '2m ago' },
    { id: '#TK-4820', subject: 'Billing invoice discrepancy', channel: 'email', priority: 'medium', status: 'in-progress', time: '8m ago' },
    { id: '#TK-4819', subject: 'Feature request - API access', channel: 'chat', priority: 'low', status: 'resolved', time: '15m ago' },
    { id: '#TK-4818', subject: 'Account setup assistance', channel: 'phone', priority: 'medium', status: 'resolved', time: '22m ago' },
    { id: '#TK-4817', subject: 'Data export failure', channel: 'email', priority: 'high', status: 'escalated', time: '35m ago' },
  ];

  // AI Insights
  const aiInsights = [
    { type: 'trend', message: 'Chat volume up 23% this week — FAQ Bot handling 8.7% of load', color: '#3B82F6' },
    { type: 'alert', message: '3 tickets escalated in last hour — billing category spike', color: '#EF4444' },
    { type: 'success', message: 'First-contact resolution rate improved to 87.3%', color: '#10B981' },
  ];

  const getChannelIcon = (ch: string) => {
    switch (ch) {
      case 'chat': return MessageCircle;
      case 'email': return Mail;
      case 'phone': return Phone;
      default: return HelpCircle;
    }
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'resolved': return '#10B981';
      case 'in-progress': return '#3B82F6';
      case 'escalated': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <Headphones size={20} color="#fff" />
            <Text style={styles.metricValue}>{keyMetrics.totalTickets.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Total Tickets</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <CheckCircle size={20} color="#fff" />
            <Text style={styles.metricValue}>{keyMetrics.resolved.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Resolved</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Clock size={20} color="#fff" />
            <Text style={styles.metricValue}>{keyMetrics.avgResponseTime}</Text>
            <Text style={styles.metricLabel}>Avg Response</Text>
          </LinearGradient>

          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Star size={20} color="#fff" />
            <Text style={styles.metricValue}>{keyMetrics.csat}</Text>
            <Text style={styles.metricLabel}>CSAT Score</Text>
          </LinearGradient>
        </View>

        {/* Channel Distribution */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Globe size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Channel Distribution</Text>
            </View>
          </View>
          <View style={styles.channelList}>
            {channels.map((ch) => (
              <View key={ch.name} style={styles.channelItem}>
                <View style={styles.channelLeft}>
                  <View style={[styles.channelIcon, { backgroundColor: ch.color + '15' }]}>
                    <ch.icon size={18} color={ch.color} />
                  </View>
                  <Text style={[styles.channelName, { color: theme.colors.text }]}>{ch.name}</Text>
                </View>
                <View style={styles.channelRight}>
                  <Text style={[styles.channelCount, { color: theme.colors.text }]}>{ch.count}</Text>
                  <Text style={[styles.channelPct, { color: theme.colors.secondaryText }]}>{ch.pct}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Active Sub-Agents */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Zap size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Sub-Agents</Text>
            </View>
          </View>
          <View style={styles.subAgentList}>
            {subAgents.map((sa) => (
              <TouchableOpacity
                key={sa.id}
                style={styles.subAgentCard}
                onPress={() => router.push(`/ai-agent/${sa.id}`)}
              >
                <View style={styles.subAgentLeft}>
                  <View style={[styles.subAgentIcon, { backgroundColor: sa.color + '15' }]}>
                    <sa.icon size={20} color={sa.color} />
                  </View>
                  <View>
                    <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sa.name}</Text>
                    <Text style={[styles.subAgentStat, { color: theme.colors.secondaryText }]}>{sa.handled} tickets handled</Text>
                  </View>
                </View>
                <View style={styles.subAgentRight}>
                  <View style={[styles.activeDot, { backgroundColor: '#10B981' }]} />
                  <ChevronRight size={18} color={theme.colors.secondaryText} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Insights */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Sparkles size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text>
            </View>
          </View>
          <View style={styles.insightsList}>
            {aiInsights.map((insight, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: insight.color }]}>
                <Text style={[styles.insightMessage, { color: theme.colors.text }]}>{insight.message}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {isPremiumLocked && (
        <Animated.View
          style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}
        >
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}>
              <Lock size={32} color={theme.colors.primary} />
            </View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>
              The AI Customer Support Agent is part of our Enterprise suite. Upgrade your plan to activate this agent.
            </Text>
            <TouchableOpacity
              style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]}
              onPress={() => router.push('/enterprise/billing')}
            >
              <Text style={styles.upgradeBtnText}>Upgrade Plan</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const renderTicketsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Queue Stats */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <AlertCircle size={20} color="#fff" />
            <Text style={styles.metricValue}>{keyMetrics.pending}</Text>
            <Text style={styles.metricLabel}>Pending</Text>
          </LinearGradient>

          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}>
            <ArrowUpRight size={20} color="#fff" />
            <Text style={styles.metricValue}>{keyMetrics.escalated}</Text>
            <Text style={styles.metricLabel}>Escalated</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <Target size={20} color="#fff" />
            <Text style={styles.metricValue}>{keyMetrics.firstContactResolution}</Text>
            <Text style={styles.metricLabel}>FCR Rate</Text>
          </LinearGradient>

          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <Clock size={20} color="#fff" />
            <Text style={styles.metricValue}>{keyMetrics.avgResolutionTime}</Text>
            <Text style={styles.metricLabel}>Avg Resolve</Text>
          </LinearGradient>
        </View>

        {/* Recent Tickets */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <MessageCircle size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Tickets</Text>
            </View>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.colors.primary + '15' }]}>
              <Filter size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.ticketList}>
            {recentTickets.map((ticket) => {
              const ChIcon = getChannelIcon(ticket.channel);
              return (
                <View key={ticket.id} style={styles.ticketCard}>
                  <View style={styles.ticketHeader}>
                    <View style={styles.ticketLeft}>
                      <View style={[styles.ticketChannelIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                        <ChIcon size={14} color={theme.colors.primary} />
                      </View>
                      <View>
                        <Text style={[styles.ticketId, { color: theme.colors.secondaryText }]}>{ticket.id}</Text>
                        <Text style={[styles.ticketSubject, { color: theme.colors.text }]}>{ticket.subject}</Text>
                      </View>
                    </View>
                    <Text style={[styles.ticketTime, { color: theme.colors.secondaryText }]}>{ticket.time}</Text>
                  </View>
                  <View style={styles.ticketFooter}>
                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(ticket.priority) + '20' }]}>
                      <Text style={[styles.priorityText, { color: getPriorityColor(ticket.priority) }]}>{ticket.priority}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) + '20' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(ticket.status) }]}>{ticket.status}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const renderAnalyticsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Performance Overview */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <BarChart3 size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Overview</Text>
            </View>
          </View>
          <View style={styles.perfGrid}>
            <View style={styles.perfItem}>
              <Text style={[styles.perfLabel, { color: theme.colors.secondaryText }]}>Resolution Rate</Text>
              <Text style={[styles.perfValue, { color: '#10B981' }]}>93.3%</Text>
            </View>
            <View style={styles.perfItem}>
              <Text style={[styles.perfLabel, { color: theme.colors.secondaryText }]}>CSAT Score</Text>
              <Text style={[styles.perfValue, { color: '#3B82F6' }]}>{keyMetrics.csat}</Text>
            </View>
            <View style={styles.perfItem}>
              <Text style={[styles.perfLabel, { color: theme.colors.secondaryText }]}>FCR Rate</Text>
              <Text style={[styles.perfValue, { color: '#8B5CF6' }]}>{keyMetrics.firstContactResolution}</Text>
            </View>
            <View style={styles.perfItem}>
              <Text style={[styles.perfLabel, { color: theme.colors.secondaryText }]}>Avg Handle Time</Text>
              <Text style={[styles.perfValue, { color: '#F59E0B' }]}>{keyMetrics.avgResolutionTime}</Text>
            </View>
          </View>
        </View>

        {/* Weekly Trend */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <TrendingUp size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Weekly Trend</Text>
            </View>
          </View>
          <View style={styles.trendList}>
            {[
              { day: 'Mon', tickets: 184, resolved: 172 },
              { day: 'Tue', tickets: 201, resolved: 194 },
              { day: 'Wed', tickets: 178, resolved: 170 },
              { day: 'Thu', tickets: 223, resolved: 210 },
              { day: 'Fri', tickets: 196, resolved: 188 },
              { day: 'Sat', tickets: 87, resolved: 82 },
              { day: 'Sun', tickets: 65, resolved: 62 },
            ].map((d) => (
              <View key={d.day} style={styles.trendItem}>
                <Text style={[styles.trendDay, { color: theme.colors.text }]}>{d.day}</Text>
                <View style={styles.trendBarContainer}>
                  <View style={[styles.trendBar, { width: `${(d.tickets / 223) * 100}%`, backgroundColor: '#3B82F6' }]} />
                  <View style={[styles.trendBarResolved, { width: `${(d.resolved / 223) * 100}%`, backgroundColor: '#10B981' }]} />
                </View>
                <Text style={[styles.trendCount, { color: theme.colors.text }]}>{d.resolved}/{d.tickets}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Headphones, component: renderOverviewTab() },
    { id: 'tickets', label: 'Tickets', icon: MessageCircle, component: renderTicketsTab() },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: renderAnalyticsTab() },
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContent: { padding: 20 },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 25,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 20,
    gap: 8,
  },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
  },
  section: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  channelList: { gap: 16 },
  channelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  channelLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelName: { fontSize: 15, fontWeight: '600' },
  channelRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  channelCount: { fontSize: 16, fontWeight: '700' },
  channelPct: { fontSize: 13 },
  subAgentList: { gap: 12 },
  subAgentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 16,
    borderRadius: 16,
  },
  subAgentLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  subAgentIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subAgentName: { fontSize: 15, fontWeight: '700' },
  subAgentStat: { fontSize: 12, marginTop: 2 },
  subAgentRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  activeDot: { width: 8, height: 8, borderRadius: 4 },
  insightsList: { gap: 12 },
  insightCard: {
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  insightMessage: { fontSize: 14, lineHeight: 20 },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketList: { gap: 12 },
  ticketCard: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 16,
    borderRadius: 16,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ticketLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, flex: 1 },
  ticketChannelIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketId: { fontSize: 11, fontWeight: '700' },
  ticketSubject: { fontSize: 14, fontWeight: '600', marginTop: 2 },
  ticketTime: { fontSize: 12 },
  ticketFooter: { flexDirection: 'row', gap: 10 },
  priorityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  priorityText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  perfGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  perfItem: {
    width: '48%',
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 16,
    borderRadius: 16,
  },
  perfLabel: { fontSize: 12, marginBottom: 8 },
  perfValue: { fontSize: 24, fontWeight: '800' },
  trendList: { gap: 12 },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trendDay: { fontSize: 13, fontWeight: '600', width: 36 },
  trendBarContainer: {
    flex: 1,
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  trendBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 12,
    borderRadius: 6,
    opacity: 0.3,
  },
  trendBarResolved: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 12,
    borderRadius: 6,
    opacity: 0.6,
  },
  trendCount: { fontSize: 12, fontWeight: '600', width: 60, textAlign: 'right' },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 100,
  },
  lockCard: {
    width: '100%',
    padding: 30,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  lockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  upgradeBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
