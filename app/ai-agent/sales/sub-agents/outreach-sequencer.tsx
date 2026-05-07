import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Activity, TrendingUp, TrendingDown, Target, ArrowRight, Briefcase, Brain, BarChart3, Mail, MessageSquare, Send, Clock, CheckCircle, Users, Zap, Settings, Calendar } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'ai-sdr', name: 'AI Lead Development Rep (SDR)', route: '/ai-agent/sales/ai-sdr', icon: Users, color: '#007AFF' };

export default function OutreachSequencerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    { label: 'Sequences', value: '84', icon: Send, color: '#007AFF', change: '+12' },
    { label: 'Emails Sent', value: '28K', icon: Mail, color: '#34C759', change: '+4.2K' },
    { label: 'Reply Rate', value: '18.4%', icon: MessageSquare, color: '#FF9500', change: '+2.1%' },
    { label: 'Meetings Set', value: '342', icon: Calendar, color: '#AF52DE', change: '+48' },
  ];
  const kpis = [
    { label: 'Open Rate', value: '42%', trend: 'up' },
    { label: 'Click Rate', value: '12%', trend: 'up' },
    { label: 'Bounce Rate', value: '2.1%', trend: 'down' },
    { label: 'Opt-Out Rate', value: '0.8%', trend: 'down' },
  ];
  const capabilities = ['Sequence Builder','Multi-Channel Outreach','A/B Testing','Personalization Engine','Send Time Optimization','Follow-up Automation','Template Library','Engagement Tracking','Deliverability Monitoring','Recipient Segmentation','Cadence Management','Response Classification'];
  const responsibilities = [
    'Multi-step outreach sequence design and automated execution across channels',
    'Multi-channel orchestration coordinating email, LinkedIn, phone, and SMS touches',
    'A/B testing of subject lines, body copy, CTAs, and send times',
    'AI-powered personalization using prospect data and behavioral signals',
    'Send time optimization based on recipient engagement patterns and time zones',
    'Automated follow-up scheduling with conditional branching logic',
    'Template library management with dynamic variable insertion',
    'Engagement tracking for opens, clicks, replies, and forwarding detection',
    'Deliverability monitoring with spam score checking and domain warm-up',
    'Recipient segmentation for targeted sequence assignment and prioritization',
    'Cadence management with configurable intervals and touch limits',
    'Response classification auto-routing replies to appropriate workflows'
  ];
  const activities = [
    { time: '3 min ago', text: 'Sequence "Enterprise Q2" launched: 240 prospects', icon: Send, type: 'sequence' },
    { time: '12 min ago', text: 'Reply detected: 3 prospects responded to follow-up', icon: MessageSquare, type: 'reply' },
    { time: '28 min ago', text: 'A/B test result: Subject line B won by 14%', icon: BarChart3, type: 'test' },
    { time: '1 hour ago', text: 'Send time optimized: 8:32 AM peak for APAC segment', icon: Clock, type: 'optimize' },
    { time: '2 hours ago', text: 'Deliverability alert: 2 emails soft-bounced', icon: Mail, type: 'deliverability' },
    { time: '3 hours ago', text: 'Personalization engine: 180 dynamic fields inserted', icon: Zap, type: 'personalize' },
  ];
  const quickActions = [
    { label: 'New Sequence', icon: Send },{ label: 'Templates', icon: Mail },{ label: 'A/B Test', icon: BarChart3 },{ label: 'Schedule', icon: Clock },{ label: 'Segments', icon: Users },{ label: 'Replies', icon: MessageSquare },{ label: 'Reports', icon: CheckCircle },{ label: 'Settings', icon: Settings },
  ];
  const typeColors: Record<string, string> = { sequence: '#007AFF', reply: '#34C759', test: '#FF9500', optimize: '#AF52DE', deliverability: '#FF3B30', personalize: '#5856D6' };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#007AFF18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#007AFF25' }]}><Send size={48} color="#007AFF" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Outreach Sequencer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Outbound Automation • SDR Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Send size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>84 Sequences</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>); })}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance KPIs</Text>
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
          The AI Outreach Sequencer automates multi-step, multi-channel outreach campaigns with personalized messaging, smart timing, and A/B testing. It detects replies, manages follow-up logic, and optimizes deliverability to maximize SDR engagement and meeting conversion rates.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (<View key={index} style={[styles.tag, { backgroundColor: '#34C75918' }]}><Text style={[styles.tagText, { color: '#34C759' }]}>{cap}</Text></View>))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#34C759' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => { const ActIcon = act.icon; return (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '20' }]}>
              <ActIcon size={14} color={typeColors[act.type] || '#8E8E93'} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
            <View style={[styles.activityBadge, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '15' }]}>
              <Text style={[styles.activityBadgeText, { color: typeColors[act.type] || '#8E8E93' }]}>{act.type}</Text>
            </View>
          </View>
        )})}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => { const ActionIcon = action.icon; return (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#34C75912' }]}>
              <ActionIcon size={22} color="#34C759" />
              <Text style={[styles.actionText, { color: '#34C759' }]}>{action.label}</Text>
            </TouchableOpacity>
          )})}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push(PARENT_AGENT.route)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <PARENT_AGENT.icon size={24} color={PARENT_AGENT.color} />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{PARENT_AGENT.name}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>SDR Agent • Sales Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="outreach-sequencer" agentName="AI Outreach Sequencer" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statChange: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
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
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
