import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, Users, Clock, Target, Zap, ArrowRight, Briefcase,
  TrendingUp, Brain, FileText, BarChart3, Search, Mail, Award,
  Phone, MessageSquare, Settings, TrendingDown, CheckCircle, Sparkles
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  { id: 'prospect-researcher', name: 'AI Prospect Researcher', description: 'Deep prospect research & buying signal detection', icon: Search, color: '#007AFF' },
  { id: 'outreach-sequencer', name: 'AI Outreach Sequencer', description: 'Multi-channel cadence automation & personalization', icon: Mail, color: '#34C759' },
  { id: 'lead-scorer', name: 'AI Lead Scorer', description: 'Predictive lead scoring & qualification', icon: Target, color: '#FF9500' },
];

export default function AiSdrPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Prospects', value: '12.4K', icon: Users, color: '#007AFF', change: '+1.2K' },
    { label: 'Meetings Booked', value: '284', icon: CheckCircle, color: '#34C759', change: '+42' },
    { label: 'Conversion Rate', value: '23%', icon: TrendingUp, color: '#FF9500', change: '+3%' },
    { label: 'Response Rate', value: '18%', icon: MessageSquare, color: '#AF52DE', change: '+2%' },
  ];

  const kpis = [
    { label: 'SQLs Created', value: '156', trend: 'up' },
    { label: 'Avg Touchpoints', value: '4.2', trend: 'down' },
    { label: 'Talk Time', value: '12 min', trend: 'up' },
    { label: 'Pipeline Created', value: '$8.4M', trend: 'up' },
  ];

  const capabilities = [
    'Prospect Research', 'Outreach Automation', 'Lead Scoring', 'Multi-channel Cadence',
    'Personalization', 'Objection Handling', 'Meeting Booking', 'Pipeline Generation',
    'CRM Integration', 'Response Analysis', 'A/B Testing', 'Intent Detection'
  ];

  const responsibilities = [
    'Inbound lead qualification and outbound prospect research',
    'Multi-channel outreach orchestration (email, phone, LinkedIn, video)',
    'Predictive lead scoring and prioritization',
    'Personalized message crafting and cadence optimization',
    'Initial objection handling and value proposition delivery',
    'Meeting scheduling and discovery call coordination',
    'Sales qualified lead (SQL) creation and handoff to AEs',
    'CRM activity logging and pipeline opportunity creation',
    'Response pattern analysis and engagement optimization',
    'A/B testing of messaging and subject lines',
    'Buying intent signal detection and hot lead flagging',
    'SDR performance analytics and productivity insights'
  ];

  const activities = [
    { time: '1 min ago', text: 'Qualified enterprise prospect: $500K potential', icon: CheckCircle, type: 'qualification' },
    { time: '8 min ago', text: 'Booked 3 discovery calls for account executives', icon: Phone, type: 'meeting' },
    { time: '15 min ago', text: 'Completed deep research on 45 target accounts', icon: Search, type: 'research' },
    { time: '32 min ago', text: 'Launched personalized sequence: 200 prospects', icon: Mail, type: 'outreach' },
    { time: '45 min ago', text: 'Identified 12 high-intent leads from web activity', icon: Sparkles, type: 'intent' },
    { time: '1 hour ago', text: 'A/B test winner: 34% higher open rate variant', icon: BarChart3, type: 'test' },
  ];

  const quickActions = [
    { label: 'Prospect Queue', icon: Users },
    { label: 'Sequences', icon: Mail },
    { label: 'Research', icon: Search },
    { label: 'Dialer', icon: Phone },
    { label: 'Calendar', icon: CheckCircle },
    { label: 'Analytics', icon: BarChart3 },
    { label: 'Scripts', icon: FileText },
    { label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = {
    qualification: '#34C759',
    meeting: '#007AFF',
    research: '#5856D6',
    outreach: '#FF9500',
    intent: '#AF52DE',
    test: '#FF2D55',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#FF950018' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FF950025' }]}>
          <Briefcase size={48} color="#FF9500" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Lead Development Rep (SDR)</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sales Development • Pipeline Generation Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Award size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>SDR</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}>
            <Users size={12} color="#007AFF" />
            <Text style={[styles.badgeText, { color: '#007AFF' }]}>12.4K Prospects</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}>
            <Brain size={12} color="#AF52DE" />
            <Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Dashboard</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>{kpi.label}</Text>
              <View style={[styles.trendBadge, { backgroundColor: (kpi.trend === 'up' ? '#34C759' : '#FF3B30') + '22' }]}>
                {kpi.trend === 'up' ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Lead Development Rep (SDR) accelerates pipeline generation through intelligent prospect research, personalized multi-channel outreach, and predictive lead scoring. This specialist AI agent combines data enrichment, intent signal analysis, and automated sequencing to identify high-value opportunities and book qualified meetings that fuel the sales pipeline.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#FF950018' }]}>
              <Text style={[styles.tagText, { color: '#FF9500' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#FF9500' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Specialized Sub-Agents</Text>
          <View style={[styles.countBadge, { backgroundColor: '#FF950022' }]}>
            <Text style={[styles.countBadgeText, { color: '#FF9500' }]}>{SUB_AGENTS.length}</Text>
          </View>
        </View>
        <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
          AI workers specializing in SDR functions, supporting the Lead Development Rep
        </Text>
        {SUB_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={() => router.push(`/ai-agent/sales/sub-agents/${agent.id}`)} style={[styles.agentCard, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
              <agent.icon size={24} color={agent.color} />
            </View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.description}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '20' }]}>
              <act.icon size={14} color={typeColors[act.type] || '#8E8E93'} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
            <View style={[styles.activityBadge, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '15' }]}>
              <Text style={[styles.activityBadgeText, { color: typeColors[act.type] || '#8E8E93' }]}>{act.type}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#FF950012' }]}>
              <action.icon size={22} color="#FF9500" />
              <Text style={[styles.actionText, { color: '#FF9500' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="ai-sdr" agentName="AI Lead Development Rep (SDR)" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statChange: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  sectionDescription: { fontSize: 13, marginBottom: 16, lineHeight: 18 },
  description: { fontSize: 14, lineHeight: 22 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  kpiCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12, position: 'relative' },
  kpiValue: { fontSize: 20, fontWeight: 'bold' },
  kpiLabel: { fontSize: 12, marginTop: 4 },
  trendBadge: { position: 'absolute', top: 10, right: 10, padding: 4, borderRadius: 8 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  bulletPoint: { width: 6, height: 6, borderRadius: 3 },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  countBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  countBadgeText: { fontSize: 12, fontWeight: '700' },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10 },
  agentIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 15, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activityBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  actionText: { fontSize: 12, fontWeight: '600', marginTop: 8 },
});
