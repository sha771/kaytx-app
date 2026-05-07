import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Target, Activity, Star, CircleCheckBig, ArrowRight, Zap,
  TrendingUp, TrendingDown, Users, Brain, FileText, BarChart3,
  Phone, Mail, Search, DollarSign, Briefcase, Settings, Clock, Award,
  Calendar
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  { id: 'prospect-researcher', name: 'AI Prospect Researcher', description: 'Deep prospect research & company intelligence gathering', icon: Search, color: '#007AFF' },
  { id: 'outreach-sequencer', name: 'AI Outreach Sequencer', description: 'Multi-channel outreach sequence design & execution', icon: Mail, color: '#34C759' },
  { id: 'lead-scorer', name: 'AI Lead Scorer', description: 'AI-powered lead scoring & qualification prioritization', icon: Target, color: '#FF9500' },
];

export default function SalesSDRPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Leads Contacted', value: '4,821', icon: Phone, color: '#34C759', change: '+342' },
    { label: 'Meetings Set', value: '312', icon: Calendar, color: '#007AFF', change: '+48' },
    { label: 'Conversion Rate', value: '6.5%', icon: Target, color: '#FF9500', change: '+0.8%' },
    { label: 'Pipeline Built', value: '$18.4M', icon: DollarSign, color: '#AF52DE', change: '+$2.1M' },
  ];

  const kpis = [
    { label: 'Response Rate', value: '28%', trend: 'up' },
    { label: 'Avg Touches', value: '7.2', trend: 'down' },
    { label: 'SQL Rate', value: '34%', trend: 'up' },
    { label: 'Activity Score', value: '94/100', trend: 'up' },
  ];

  const capabilities = ['Outbound Prospecting','Lead Qualification','Cold Outreach','Meeting Setting','CRM Updates','Pipeline Building','Multi-channel Sequences','Lead Scoring','Prospect Research','Email Personalization','Social Selling','Call Scripts','Objection Handling','Follow-up Automation','Data Enrichment','Territory Mapping'];

  const responsibilities = [
    'Outbound prospecting and targeted lead identification',
    'Lead qualification and scoring across all inbound channels',
    'Cold calling and personalized email outreach execution',
    'Meeting scheduling and handoff to Account Executives',
    'CRM data entry and pipeline activity tracking',
    'Pipeline building and weekly pipeline generation reporting',
    'Multi-channel outreach sequence design and optimization',
    'Prospect research and company intelligence gathering',
    'Social selling and LinkedIn engagement automation',
    'Follow-up automation and nurture sequence management',
    'Lead data enrichment and contact verification',
    'Territory mapping and account prioritization strategy'
  ];

  const activities = [
    { time: '2 min ago', text: 'Completed 80 outbound calls: 12 qualified connects', icon: Phone, type: 'calls' },
    { time: '15 min ago', text: 'Set 4 qualified meetings with enterprise prospects', icon: Calendar, type: 'meetings' },
    { time: '45 min ago', text: 'Launched outreach sequence: 200 prospects, 7-touch plan', icon: Mail, type: 'sequence' },
    { time: '1 hour ago', text: 'Lead scoring update: 18 leads promoted to SQL', icon: Target, type: 'scoring' },
    { time: '2 hours ago', text: 'Researched 12 target accounts: key contacts identified', icon: Search, type: 'research' },
    { time: '4 hours ago', text: 'Pipeline report: $18.4M sourced, +$2.1M this week', icon: DollarSign, type: 'pipeline' },
  ];

  const typeColors: Record<string, string> = { calls: '#34C759', meetings: '#007AFF', sequence: '#FF9500', scoring: '#AF52DE', research: '#5856D6', pipeline: '#E65100' };

  const quickActions = [
    { label: 'Prospect', icon: Search }, { label: 'Outreach', icon: Mail },
    { label: 'Calls', icon: Phone }, { label: 'Scoring', icon: Target },
    { label: 'Pipeline', icon: DollarSign }, { label: 'Reports', icon: BarChart3 },
    { label: 'Schedule', icon: Calendar }, { label: 'Settings', icon: Settings },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#E6510018' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E6510025' }]}>
          <Target size={48} color="#E65100" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Lead Development Rep (SDR)</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sales & Revenue Division — SDR Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#E6510022' }]}><Star size={12} color="#E65100" /><Text style={[styles.badgeText, { color: '#E65100' }]}>SDR</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Reports</Text></View>
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
          </View>
        )})}
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
          The AI Lead Development Rep (SDR) drives top-of-funnel pipeline generation through intelligent outbound prospecting, multi-channel outreach sequences, and AI-powered lead scoring. This SDR-level agent automates the entire lead development workflow from prospect research to qualified meeting handoff.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#E6510018' }]}>
              <Text style={[styles.tagText, { color: '#E65100' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#E65100' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Specialized Sub-Agents</Text>
          <View style={[styles.countBadge, { backgroundColor: '#E6510022' }]}>
            <Text style={[styles.countBadgeText, { color: '#E65100' }]}>{SUB_AGENTS.length}</Text>
          </View>
        </View>
        <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
          AI workers specializing in lead development functions, reporting to the SDR
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#E6510012' }]}>
              <ActionIcon size={22} color="#E65100" />
              <Text style={[styles.actionText, { color: '#E65100' }]}>{action.label}</Text>
            </TouchableOpacity>
          )})}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/sales/vp-sales' as any)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <TrendingUp size={24} color="#F59E0B" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Sales</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>VP Level • Sales & Revenue Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="sales-sdr" agentName="AI Lead Development Rep (SDR)" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
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
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
