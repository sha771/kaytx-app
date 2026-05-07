import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, TrendingUp, TrendingDown, Target, ArrowRight, Briefcase,
  Brain, BarChart3, DollarSign, Search, Users, CheckCircle, MapPin,
  FileText, Settings, Network, Link
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'vp-business-development', name: 'AI VP Business Development', route: '/ai-agent/sales/vp-business-development', icon: TrendingUp, color: '#007AFF' };

export default function PartnershipScoutPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Prospects', value: '234', icon: Search, color: '#007AFF', change: '+18' },
    { label: 'Evaluated', value: '89', icon: CheckCircle, color: '#34C759', change: '+12' },
    { label: 'Fit Score Avg', value: '78%', icon: Target, color: '#FF9500', change: '+4%' },
    { label: 'Pipeline', value: '$8.4M', icon: DollarSign, color: '#AF52DE', change: '+$1.2M' },
  ];

  const kpis = [
    { label: 'Scout Rate', value: '42/mo', trend: 'up' },
    { label: 'Qualification Rate', value: '38%', trend: 'up' },
    { label: 'Avg Fit Score', value: '78%', trend: 'up' },
    { label: 'Time to Evaluate', value: '3 days', trend: 'down' },
  ];

  const capabilities = [
    'Partner Discovery', 'Fit Scoring', 'Market Mapping', 'Due Diligence',
    'Competitive Intel', 'Relationship Mapping', 'Opportunity Sizing', 'Strategic Alignment',
    'Ecosystem Analysis', 'Warm Intro Detection', 'Risk Assessment', 'Pipeline Building'
  ];

  const responsibilities = [
    'Strategic partner prospect discovery through market and ecosystem analysis',
    'Partnership fit scoring based on complementary capabilities and alignment',
    'Competitive landscape mapping to identify partnership white space',
    'Due diligence automation for partnership viability assessment',
    'Relationship mapping and warm introduction path identification',
    'Partnership opportunity sizing with revenue potential modeling',
    'Strategic alignment analysis between partner goals and company objectives',
    'Ecosystem analysis for platform and integration opportunities',
    'Risk assessment for partnership compatibility and cultural fit',
    'Partnership pipeline building with stage progression tracking',
    'Warm intro detection through mutual connection analysis',
    'Partnership prospect research brief preparation for BD team'
  ];

  const activities = [
    { time: '2 min ago', text: 'Identified 5 high-fit partnership prospects', icon: Search, type: 'discovery' },
    { time: '15 min ago', text: 'Completed due diligence on TechCorp Inc', icon: CheckCircle, type: 'evaluation' },
    { time: '30 min ago', text: 'Partnership fit score improved to 78% avg', icon: Target, type: 'scoring' },
    { time: '1 hour ago', text: 'Found 3 warm intro paths to DataFlow Corp', icon: Users, type: 'network' },
    { time: '2 hours ago', text: 'Mapped competitive landscape: 12 white spaces', icon: MapPin, type: 'mapping' },
    { time: '3 hours ago', text: 'Generated partnership prospect brief for BD team', icon: FileText, type: 'report' },
  ];

  const quickActions = [
    { label: 'Discover', icon: Search },
    { label: 'Score', icon: Target },
    { label: 'Due Diligence', icon: CheckCircle },
    { label: 'Map', icon: MapPin },
    { label: 'Network', icon: Users },
    { label: 'Pipeline', icon: DollarSign },
    { label: 'Reports', icon: FileText },
    { label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = {
    discovery: '#007AFF', evaluation: '#34C759', scoring: '#FF9500', network: '#5856D6', mapping: '#AF52DE', report: '#FF2D55',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#007AFF18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#007AFF25' }]}>
          <Search size={48} color="#007AFF" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Partnership Scout</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Partnership Intelligence • Business Development</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Search size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>234 Prospects</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <StatIcon size={22} color={stat.color} />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
            </View>
          );
        })}
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
          The AI Partnership Scout identifies and evaluates strategic partnership opportunities across markets and ecosystems. It discovers potential partners, scores strategic fit, maps relationships for warm introductions, and builds a qualified pipeline of partnership prospects ready for business development engagement.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#007AFF18' }]}>
              <Text style={[styles.tagText, { color: '#007AFF' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#007AFF' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => {
          const ActIcon = act.icon;
          return (
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
          );
        })}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#007AFF12' }]}>
                <ActionIcon size={22} color="#007AFF" />
                <Text style={[styles.actionText, { color: '#007AFF' }]}>{action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push(PARENT_AGENT.route)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <PARENT_AGENT.icon size={24} color={PARENT_AGENT.color} />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{PARENT_AGENT.name}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Executive Agent • Business Development</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="partnership-scout" agentName="AI Partnership Scout" />
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
