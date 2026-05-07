import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Globe, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap,
  TrendingUp, Users, Brain, FileText, MapPin, Handshake, BarChart3,
  Building2, Rocket, Search, Briefcase, Settings, Bell, TrendingDown
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  { id: 'partnership-scout', name: 'AI Partnership Scout', description: 'Identifies & evaluates strategic partnership opportunities', icon: Search, color: '#007AFF' },
  { id: 'market-expander', name: 'AI Market Expander', description: 'Market entry strategy & expansion opportunity analysis', icon: MapPin, color: '#34C759' },
  { id: 'alliance-coordinator', name: 'AI Alliance Coordinator', description: 'Manages strategic alliance relationships & collaboration', icon: Handshake, color: '#FF9500' },
];

export default function VPBusinessDevelopmentPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Partnerships', value: '142', icon: Handshake, color: '#007AFF', change: '+18' },
    { label: 'New Markets', value: '23', icon: MapPin, color: '#34C759', change: '+5' },
    { label: 'Alliance Revenue', value: '$28M', icon: TrendingUp, color: '#FF9500', change: '+42%' },
    { label: 'BD Pipeline', value: '$156M', icon: BarChart3, color: '#AF52DE', change: '+24%' },
  ];

  const kpis = [
    { label: 'Partner ROI', value: '4.8x', trend: 'up' },
    { label: 'Time to Partner', value: '45 days', trend: 'down' },
    { label: 'Alliance NPS', value: '72', trend: 'up' },
    { label: 'Market Share', value: '18%', trend: 'up' },
  ];

  const capabilities = [
    'Partnership Strategy', 'Market Expansion', 'Alliance Management', 'Co-selling Programs',
    'Channel Development', 'Joint Ventures', 'Ecosystem Building', 'Strategic Planning',
    'Competitive Positioning', 'Revenue Diversification', 'Global Markets', 'Integration Planning'
  ];

  const responsibilities = [
    'Strategic partnership identification, evaluation, and negotiation',
    'New market entry strategy and expansion roadmap development',
    'Strategic alliance cultivation and relationship management',
    'Co-selling and co-marketing program orchestration',
    'Channel partner ecosystem development and enablement',
    'Joint venture evaluation and partnership structuring',
    'Market analysis and competitive positioning intelligence',
    'Revenue diversification through partnership channels',
    'Cross-functional alignment with Product and Marketing',
    'Global market expansion and localization strategy',
    'Partnership performance tracking and optimization',
    'M&A opportunity identification and preliminary assessment'
  ];

  const activities = [
    { time: '5 min ago', text: 'Signed strategic partnership: $12M co-sell potential', icon: Handshake, type: 'partnership' },
    { time: '20 min ago', text: 'Identified 8 new market opportunities in APAC', icon: MapPin, type: 'expansion' },
    { time: '1 hour ago', text: 'Launched joint GTM with TechCorp Industries', icon: Rocket, type: 'launch' },
    { time: '2 hours ago', text: 'Negotiated strategic alliance terms: 3-year agreement', icon: FileText, type: 'deal' },
    { time: '3 hours ago', text: 'Evaluated acquisition target: $50M strategic fit', icon: Building2, type: 'evaluation' },
    { time: '5 hours ago', text: 'Partner enablement training completed: 45 attendees', icon: Users, type: 'training' },
  ];

  const quickActions = [
    { label: 'Partner Pipeline', icon: BarChart3 },
    { label: 'Market Map', icon: MapPin },
    { label: 'Alliance Hub', icon: Handshake },
    { label: 'Deal Desk', icon: Briefcase },
    { label: 'Co-sell Tracker', icon: TrendingUp },
    { label: 'Ecosystem', icon: Globe },
    { label: 'Reports', icon: FileText },
    { label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = {
    partnership: '#007AFF',
    expansion: '#34C759',
    launch: '#AF52DE',
    deal: '#FF9500',
    evaluation: '#5856D6',
    training: '#FF2D55',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#5856D618' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#5856D625' }]}>
          <Globe size={48} color="#5856D6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Business Development</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Chief Partnership Officer • Strategic Growth Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#5856D622' }]}>
            <Star size={12} color="#5856D6" />
            <Text style={[styles.badgeText, { color: '#5856D6' }]}>Executive</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}>
            <Handshake size={12} color="#007AFF" />
            <Text style={[styles.badgeText, { color: '#007AFF' }]}>142 Partners</Text>
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Executive Dashboard</Text>
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
          The AI VP Business Development drives strategic growth through intelligent partnership identification, market expansion analysis, and alliance management. This executive AI agent leverages predictive analytics and relationship intelligence to build high-value partnerships, identify new market opportunities, and maximize revenue through strategic collaborations.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#5856D618' }]}>
              <Text style={[styles.tagText, { color: '#5856D6' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Strategic Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#5856D6' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Specialized Sub-Agents</Text>
          <View style={[styles.countBadge, { backgroundColor: '#5856D622' }]}>
            <Text style={[styles.countBadgeText, { color: '#5856D6' }]}>{SUB_AGENTS.length}</Text>
          </View>
        </View>
        <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
          AI workers specializing in business development functions, reporting to the VP Business Development
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Executive Activity Feed</Text>
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#5856D612' }]}>
              <action.icon size={22} color="#5856D6" />
              <Text style={[styles.actionText, { color: '#5856D6' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="vp-business-development" agentName="AI VP Business Development" />
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
